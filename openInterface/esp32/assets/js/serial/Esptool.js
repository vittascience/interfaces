'use strict';

/**
 * Workspace Esptool: Esptool
 * Copyright 2020 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide a driver for controlling esp boards by serial transmission.
 */

/** 
 * @fileoverview WorkSpace Esptool 
 * @author: leomlr (Léo Meillier)
 */

const DEFAULT_CONNECT_ATTEMPTS = 7          // default number of times to try connection

/**
 * @class Esptool
 */
class Esptool {
    /**
     * Creates an instance of Esptool.
     * @private
     */
    constructor(serial) {
        this.serial = serial;
        this.dataInWaiting = null;
        this.firmwareData = null;
        this.firmwareMD5hex = null;
        this.hasFirmware = false;
        this.isDownloadingFirmware = false;
        this.Command = {
            ESP_FLASH_BEGIN: 0x02,
            ESP_FLASH_DATA: 0x03,
            ESP_FLASH_END: 0x04,
            ESP_SYNC: 0x08,
            ESP_READ_REG: 0x0a,
        };
        this.CHIP_NAME = "ESP32";
        this.CHIP_DETECT_MAGIC_REG_ADDR = 0x40001000;
        this.CHIP_DETECT_MAGIC_VALUE = 0x00f01d83;
        this.ESP_SPI_ATTACH = 0x0D;
        this.ESP_SPI_SET_PARAMS = 0x0B;
        this.ESP_SPI_FLASH_MD5 = 0x13;
        this.FLASH_WRITE_SIZE = 0x400;
        this.FLASH_SECTOR_SIZE = 0x1000;
        this.utf8Decoder = new TextDecoder('utf-8');
        return this;
    };

    async setFirmwareData (firmwareFile) {
        await this.readFile(firmwareFile);        
    };

    async connect (mode='default_reset', attempts=DEFAULT_CONNECT_ATTEMPTS) {
        InterfaceMonitor.writeConsole('Connecting ...')
        let last_error = null
        for (let i = 0; i<attempts; i++) {
            last_error = await this._connect_attempt(mode, false);
            if (!last_error) break;
            last_error = await this._connect_attempt(mode, true);
            if (!last_error) break;
        }
        if (last_error) {
            throw Error('Failed to connect to ' + this.CHIP_NAME + ': ' + last_error)
        }
    };

    async flash(file) {
        console.log('connecting...')
        await this.connect()
        InterfaceMonitor.writeConsole(await this.detect_chip())
        await this.flash_spi_attach(0);
        await this.flash_set_parameters();
        InterfaceMonitor.writeConsole('Flashing firmware ...');
        await this.flashImage(file.address, file.data);
        await this.hard_reset();
    };

    async flash_md5sum(addr, size) {
        return await this.command(this.ESP_SPI_FLASH_MD5, new Uint32Array([addr, size, 0, 0]));
    };

    async detect_chip () {
        InterfaceMonitor.writeConsole('Detecting chip type...')
        const chip_magic_value = await this._read_reg(this.CHIP_DETECT_MAGIC_REG_ADDR);
        if (chip_magic_value == this.CHIP_DETECT_MAGIC_VALUE) {
            return this.CHIP_NAME;
        } else {
            return 'Failed to detect chip board.';
        }
    };

    async _connect_attempt(mode='default_reset', esp32r0_delay=false) {
        if (mode != 'no_reset') {
            await this._reset(esp32r0_delay)
        }
        console.log('syncing...')
        for (let i = 0; i < 5; i++) {
            console.log(`${(i+1)}/5: connecting ***********************`)
            if (await this._sync() != null) {
                return null;
            }
        }
        return new Error("Failed to sync.");
    };

    async _sync() {
        const data = new Uint8Array([0x07, 0x07, 0x12, 0x20].concat(new Array(32).fill(0x55))).buffer;
        return await this.command(this.Command.ESP_SYNC, data, {timeout: 500})
    };

    async _read_reg(addr) {
        const data = new Uint32Array([addr]).buffer;
        return await this.command(this.Command.ESP_READ_REG, data);
    };

    async _reset(esp32r0_delay = false) {
        await this.serial.setDTR(false)  // IO0=HIGH
        await this.serial.setRTS(true)   // EN=LOW, chip in reset
        await sleep(0.1)
        if (esp32r0_delay) {
            await sleep(1.2)
        }
        await this.serial.setDTR(true)   // IO0=LOW
        await this.serial.setRTS(false)  // EN=HIGH, chip out of reset
        if (esp32r0_delay) {
            await sleep(0.4)
        }
        await sleep(0.05)
        await this.serial.setDTR(false)  // IO0=HIGH, done
        await sleep(0.1)
    };

    async flash_spi_attach (hspi_arg) {
        InterfaceMonitor.writeConsole('Enabling default SPI flash mode...');
        const hspi_arg_arr = new Uint32Array([hspi_arg])
        const is_legacy = 0;
        const uint8view = new Uint8Array([is_legacy, 0, 0, 0]);
        const data = _appendBuffer(hspi_arg_arr.buffer, uint8view.buffer)
        await this.command(this.ESP_SPI_ATTACH, data);
    };

    async flash_set_parameters(size) {
        const fl_id = 0
        const total_size = size
        const block_size = 64 * 1024
        const sector_size = 4 * 1024
        const page_size = 256
        const status_mask = 0xffff
        const data = new Uint8Array([fl_id, total_size, block_size, sector_size, page_size, status_mask]).buffer;
        await this.command(this.ESP_SPI_SET_PARAMS, data);
    };               

    async flashImage(address, data) {
        const blocks = await this.flashBegin(data.byteLength, address);
        var written = 0;
        let seq = 0;
        console.log(data.byteLength)
        console.log(address)
        let t = Date.now();
        while (data.byteLength > 0) {
            const percent = Math.floor(100*(seq + 1)/blocks);
            if (seq == 0) {
                InterfaceMonitor.writeConsole('>>> Writing at 0x' + address.toString(16) + ' (' + percent + ' %)');
            } else {
                const a = document.getElementById('console').innerText;
                document.getElementById('console').innerText = a.replace(/>>> Writing at 0x([0-9a-z]{3,6}) \(([0-9]{1,3}) %\)/, '>>> Writing at 0x' + address.toString(16) + ' (' + percent + ' %)')
            }
            const chunk = data.slice(0, this.FLASH_WRITE_SIZE);
            const padding = new ArrayBuffer(this.FLASH_WRITE_SIZE - chunk.byteLength);
            let paddingArray = new Uint8Array(padding);
            paddingArray.fill(0xff, 0, padding.byteLength);
            let block = _appendBuffer(chunk, padding);
            await this.flashBlock(seq, block);
            data = data.slice(this.FLASH_WRITE_SIZE);
            seq += 1;
            written += block.byteLength;
            address += this.FLASH_WRITE_SIZE;
        }
        t = Math.floor((Date.now() - t)/1000);
        InterfaceMonitor.writeConsole('Wrote ' + written + ' bytes at 0x1000 in ' + t + ' seconds...');
        const check = await this.flash_md5sum(address, data.byteLength);
        if (!check) {
            throw Error ('MD5 of file does not match data in flash!');
        }
        InterfaceMonitor.writeConsole('Hash of data verified.');
        InterfaceMonitor.writeConsole('Leaving...');
        await this.flashEnd();
    };

    async flashBegin(size, offset) {
        console.log('flashBegin()')
        console.log('FLASH_WRITE:' + this.FLASH_WRITE_SIZE)
        const num_blocks = Math.floor((size + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE)
        const data = new Uint32Array([size, num_blocks, this.FLASH_WRITE_SIZE, offset]).buffer;
        console.log(num_blocks)
        console.log(size)
        await this.command(this.Command.ESP_FLASH_BEGIN, data);
        return num_blocks;
    };

    async flashBlock(seq, chunk) {
        console.log('flashBlock()')
        const header = new Uint32Array([chunk.byteLength, seq, 0, 0]);
        const data = _appendBuffer(header.buffer, chunk);
        await this.command(this.Command.ESP_FLASH_DATA, data);
    };

    async flashEnd(reboot = false) {
        console.log('flashEnd()');
        const data = new Uint32Array([!reboot]).buffer;
        await this.command(this.Command.ESP_FLASH_END, data);
    };

    async command(command, data, options) {
        console.log(`command: type=0x${command.toString(16)}, length=${data.byteLength}`)
        return new Promise((resolve, reject) => {
            let timer;
            if (options) {
                timer = setTimeout(() => {
                    resolve(null);
                }, options.timeout)
            }
            this.doCommand(command, data).then(resp => {
                if (timer) {
                    clearTimeout(timer);
                }
                console.log(resp)
                resolve(resp);
            });
        });
    };

    async doCommand(command, data) {
        const header = this._getCommandHeader(command, data.byteLength)
        const buffer = _appendBuffer(header, data)
        await this._sendFrame(buffer);
        if (command == this.Command.ESP_FLASH_END) {
            return;
        }
        if (command == this.ESP_SPI_FLASH_MD5) {
            const {value, done} = await this.serial.read();
            if (this.utf8Decoder.decode(value).match(String(this.firmwareMD5hex))) {
                return true;
            }
        }
        for (let i = 0; i<10; i++) {
            const {value, done} = await this.serial.read();
            if (value) {
                const packets = this._readFrames(value);
                if (packets && packets.length > 0) {
                    for (let p = 0; p<packets.length; p++) {
                        const response = this._parseResponse(packets[p]);
                        console.log(response)
                        if (response && (response.cmd == command)) {
                            return response.dta;
                        }
                    }
                }
            } else {
                console.log('for loop 10 aborted.')
                break;
            }
        }
    };

    // Handle SLIP escape sequences.
    async _sendFrame(data) {
        data = replaceInBuffer(new Uint8Array(data), [0xdb], [0xdb, 0xdd])
        data = replaceInBuffer(new Uint8Array(data), [0xc0], [0xdb, 0xdc])
        let frame = _appendBuffer(new Uint8Array([0xc0]).buffer, _appendBuffer(data, new Uint8Array([0xc0]).buffer));
        return await this.serial.write(new Uint8Array(frame));
    }

    // Find a frame end of SLIP.
    _readFrames(value) {
        let partial_packet = null
        let in_escape = false
        if (this.dataInWaiting) {
            value = new Uint8Array(_appendBuffer(new Uint8Array(this.dataInWaiting).buffer, value.buffer))
        }
        let packets = new Array()
        for (let i = 0; i<value.length; i++) {
            if (!partial_packet) { // waiting for packet header
                if (value[i] == 0xc0) {
                    partial_packet = new Array();
                } else {
                    throw '';
                }
            } else if (in_escape) {  // part-way through escape sequence
                in_escape = false
                if (value[i] == 0xdc) {
                    partial_packet.push(0xc0)
                } else if (value[i] == 0xdd) {
                    partial_packet.push(0xdb)
                } else {
                    throw '';
                }
            } else if (value[i] == 0xdb) {  // start of escape sequence
                in_escape = true    
            } else if (value[i] == 0xc0) {  // end of packet
                packets.push(new Uint8Array(partial_packet))
                this.dataInWaiting = null;
                partial_packet = null;
            } else {  // normal byte in packet
                partial_packet.push(value[i])
            }
        }
        if (partial_packet) {
            console.log('data in waiting')
            partial_packet.unshift(0xc0)
            this.dataInWaiting = partial_packet;
        }
        return packets;
    };

    _parseResponse(frame) {
        if (frame.length < 8) {
            return null;
        }
        let type = frame[0];
        if (type != 0x01) {
            return null;
        }
        let command = frame[1];
        let size = frame[2] + (frame[3]<<8)
        let data = 0;
        for (let i = 0; i<4; i++) {
            data += frame[4+i]<<(8*i)
        }
        return {cmd: command, dta: data}
    };

    _getCommandHeader (command, size) {
        const header = new ArrayBuffer(8);
        let request = new Uint8Array(header);
        request[0] = 0x00;
        request[1] = command;
        let dataLen = new Uint16Array(header);
        dataLen[1] = size;
        let checksum = new Uint32Array(header);
        checksum[1] = 0;
        return header;
    };

    readFile(file) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "../esp32/assets/js/serial/" + file, true);
        oReq.responseType = "arraybuffer";
        let that = this;
        oReq.onload = async function() {
            that.firmwareData = oReq.response;
            console.log(that.firmwareData)
            const data = that.utf8Decoder.decode(that.firmwareData)
            await sleep(2);
            that.firmwareMD5hex = calcMD5(data);
            console.log(that.firmwareMD5hex)
        };
        oReq.send(null);
    };

    async hard_reset() {
        InterfaceMonitor.writeConsole('Hard reseting by RTS...');
        this.serial.setRTS(true)  // EN->LOW
        await sleep(0.1)
        this.serial.setRTS(false) // EN->HIGH
    };

}



/**
 * Creates a new ArrayBuffer replaced.
 *
 * @private
 * @param {Uint8Array} buf The buf to replace
 * @param {Uint8} from The buf 'from'
 * @param {Uint8Array} to The buf 'to'
 * @return {ArrayBuffer} The new ArrayBuffer created out.
 */
function replaceInBuffer(buf, from, to) {
    let index = 0;
    while (true) {
        index = buf.indexOf(from[0], index);
      	if (index === -1) {
          break;
        } else {
          if (from[1]) {
            let index2 = buf.indexOf(from[1], index+1);
            if (index2 === -1) {
              break;
            }
          }
        }
        let prevArr = buf.slice(0, index);
        let followArr = buf.slice(index + from.length);
        var mergedArray = new Uint8Array(prevArr.length + to.length + followArr.length);
        mergedArray.set(prevArr);
        mergedArray.set(to, prevArr.length);
        mergedArray.set(followArr, prevArr.length + to.length);
        buf = mergedArray;
        index += to.length;
    }
    return buf.buffer;
};

/**
 * Creates a new Uint8Array based on two different ArrayBuffers
 *
 * @private
 * @param {ArrayBuffers} buffer1 The first buffer.
 * @param {ArrayBuffers} buffer2 The second buffer.
 * @return {ArrayBuffers} The new ArrayBuffer created out of the two.
 */
var _appendBuffer = function(buffer1, buffer2) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp.buffer;
};

