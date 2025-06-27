/**
 * A class to communicate with and flash the micro:bit without having to transfer the entire HEX file
 * Created by samkent on 07/11/2017.
 *
 * (c) 2017 - 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 * 
 * 2024 - Translated and adapted from Java by Léo Meillier (Vittascience)
 */

function logi(message) {
    //console.log(message);
}

// A service that interacts with the BLE device via the Android BLE API.
class PartialFlashingBaseService {

    /*
        static PARTIAL_FLASH_CHARACTERISTIC = "e97d3b10-251d-470a-a062-fa1922dfa9a8";
        static PARTIAL_FLASHING_SERVICE = "e97dd91d-251d-470a-a062-fa1922dfa9a8";

        static MICROBIT_DFU_SERVICE = "e95d93b0-251d-470a-a062-fa1922dfa9a8";
        static MICROBIT_SECURE_DFU_SERVICE = "0000fe59-0000-1000-8000-00805f9b34fb";
        static MICROBIT_DFU_CHARACTERISTIC = "e95d93b1-251d-470a-a062-fa1922dfa9a8";
    */

    static PACKET_STATE_WAITING = 0;
    static PACKET_STATE_SENT = 0xFF;
    static PACKET_STATE_RETRANSMIT = 0xAA;
    static PACKET_STATE_COMPLETE_FLASH = 0xCF;

    // Regions
    static REGION_SD = 0;
    static REGION_DAL = 1;
    static REGION_MAKECODE = 2;

    // Partial Flashing Commands
    static REGION_INFO_COMMAND = 0x0;
    static FLASH_COMMAND = 0x1;

    // Partial Flashing Return Vals
    static PF_SUCCESS = 0x0;
    static PF_ATTEMPT_DFU = 0x1;
    static PF_FAILED = 0x2;

    // Micro:bit versions
    static MICROBIT_V1 = 1;
    static MICROBIT_V2 = 2;

    // findPythonData
    static PYTHON_HEADER_SIZE = 16;
    static PYTHON_REGION_SIZE = 16;
    static UPY_MAGIC = ".*FE307F59.{16}9DD7B1C1.*";
    static UPY_MAGIC1 = "FE307F59";
    static UPY_MAGIC2 = "9DD7B1C1";

    // findMakeCode
    static PXT_MAGIC = "708E3B92C615A841C49866C975EE5197";

    constructor(webBLE) {
        // ble device
        this._webBLE = webBLE;
        // reader
        this._readerReady = true;
        this._buffer = [];
        this._waitingResponse = false;
        this.packetState = PartialFlashingBaseService.PACKET_STATE_WAITING;
        // DAL Hash
        this.python = false;
        this.dalHash;
        this.fileHash;
        this.code_startAddress = 0;
        this.code_endAddress = 0;
    }

    async attemptPartialFlash(hexStr, progress) {

        try {

            logi("attemptPartialFlash()");
            const updateProgress = progress || (() => { });
            const hex = new HexUtils();
            hex.initWithHexStr(hexStr);

            // find magic marker in hex data
            this.python = false;
            let dataPos = this.findMakeCodeData(hex);
            if (dataPos == null) {
                dataPos = this.findPythonData(hex);
                if (dataPos != null) {
                    this.python = true;
                }
            }

            if (dataPos == null) {
                console.error("No partial flash data");
                return PartialFlashingBaseService.PF_ATTEMPT_DFU;
            }

            logi("Found partial flash data at " + dataPos.line + " at offset " + dataPos.part);

            // Get Memory Map from Microbit
            this.code_startAddress = this.code_endAddress = 0;
            if (!(await this.readMemoryMap())) {
                console.error("Failed to read memory map");
                return PartialFlashingBaseService.PF_ATTEMPT_DFU;
            }

            if (this.code_startAddress == 0 || this.code_endAddress <= this.code_startAddress) {
                console.error("Failed to read memory map code address");
                return PartialFlashingBaseService.PF_ATTEMPT_DFU;
            }

            // Compare DAL hash
            if (this.fileHash !== this.dalHash) {
                console.error("Hash " + this.fileHash + " != " + (this.dalHash));
                return PartialFlashingBaseService.PF_ATTEMPT_DFU;
            }

            let count = 0;
            let numOfLines = hex.numOfLines() - dataPos.line;
            logi("Total lines: " + numOfLines);

            let packetNum = 0;
            let lineCount = 0;
            let part = dataPos.part;
            let line0 = lineCount;
            let part0 = part;

            let addrLo = hex.getRecordAddressFromIndex(dataPos.line + lineCount);
            let addrHi = hex.getSegmentAddress(dataPos.line + lineCount);
            let addr = addrLo + addrHi * 256 * 256;

            let hexData = "";
            let partData = "";

            logi("Code start " + this.code_startAddress + " end " + this.code_endAddress);
            logi("First line " + addr);

            // Ready to flash!
            // Loop through data

            let addr0 = addr + part / 2;  // two hex digits per byte
            let addr0Lo = addr0 % (256 * 256);
            let addr0Hi = addr0 / (256 * 256);

            if (this.code_startAddress != addr0) {
                console.error("Code start address doesn't match");
                return PartialFlashingBaseService.PF_ATTEMPT_DFU;
            }

            // TODO - check size of code in file matches micro:bit

            let endOfFile = false;
            let startTime = Date.now();
            while (true) {
                // Timeout if total is > 30 seconds
                if (Date.now() - startTime > 60000) {
                    console.error("Partial flashing has timed out");
                    return PartialFlashingBaseService.PF_FAILED;
                }

                // Check if EOF
                if (endOfFile || hex.getRecordTypeFromIndex(dataPos.line + lineCount) != 0) {
                    if (count == 0) {
                        break;
                    }
                    endOfFile = true;
                }

                if (endOfFile) {
                    // complete the batch of 4 packets with FF
                    const c32 = new Array(32).fill('F');
                    hexData = c32.join('');
                    partData = hexData;
                } else {
                    addrLo = hex.getRecordAddressFromIndex(dataPos.line + lineCount);
                    addrHi = hex.getSegmentAddress(dataPos.line + lineCount);
                    addr = addrLo + addrHi * 256 * 256;

                    hexData = hex.getDataFromIndex(dataPos.line + lineCount);
                    if (part + 32 > hexData.length) {
                        partData = hexData.substring(part);
                    } else {
                        partData = hexData.substring(part, part + 32);
                    }
                }

                let offsetToSend = 0;
                if (count == 0) {
                    line0 = lineCount;
                    part0 = part;
                    addr0 = addr + part / 2;  // two hex digits per byte
                    addr0Lo = addr0 % (256 * 256);
                    addr0Hi = addr0 / (256 * 256);
                    offsetToSend = addr0Lo;
                } else if (count == 1) {
                    offsetToSend = addr0Hi;
                }

                logi(packetNum + " " + count + " addr0 " + addr0 + " offsetToSend " + offsetToSend + " line " + lineCount + " addr " + addr + " part " + part + " data " + partData + " endOfFile " + endOfFile);

                // recordToByteArray() builds a PF command block with the data
                const chunk = HexUtils.recordToByteArray(partData, offsetToSend, packetNum);

                // Sleep after 4 packets
                count++;
                if (count != 4) {
                    await WebBLEAPI.write(chunk, false);
                    await sleep(0.003);
                } else {
                    await WebBLEAPI.write(chunk, true);
                    count = 0;

                    // Wait for notification
                    logi("Wait for notification ...");

                    updateProgress(lineCount / numOfLines, true);
                    const percent = Math.round(100 * (lineCount / numOfLines));
                    logi("Download: " + percent + " %");

                    await waitFor(_ => this.packetState === PartialFlashingBaseService.PACKET_STATE_SENT)

                    this.packetState = PartialFlashingBaseService.PACKET_STATE_WAITING;

                }

                // If notification is retransmit -> retransmit last block.
                // Else set start of new block
                if (this.packetState == PartialFlashingBaseService.PACKET_STATE_RETRANSMIT) {
                    lineCount = line0;
                    part = part0;
                    endOfFile = false;
                } else {
                    if (!endOfFile) {
                        // Next part
                        part = part + partData.length;
                        if (part >= hexData.length) {
                            part = 0;
                            lineCount = lineCount + 1;
                        }
                    }
                }

                // Always increment packet #
                packetNum = packetNum + 1;
            }

            await sleep(0.100); // allow time for write to complete

            // Write End of Flash packet
            await this._webBLE.write([0x02], false);
            updateProgress(1, true);
            await sleep(0.100); // allow time for write to complete

            // Finished Writing
            logi("Flash Complete");
            this.packetState = PartialFlashingBaseService.PACKET_STATE_COMPLETE_FLASH;

            // Time execution
            const elapsedSeconds = (Date.now() - startTime) / 1000.0;
            logi("Flash Time: " + elapsedSeconds + " seconds");
        } catch (e) {
            console.error(e)
        }

        // Check complete before leaving intent
        if (this.packetState != PartialFlashingBaseService.PACKET_STATE_COMPLETE_FLASH) {
            return PartialFlashingBaseService.PF_FAILED;
        }

        return PartialFlashingBaseService.PF_SUCCESS;
    }

    /**
     * Parse data received from micro:bit Partial Flashing Service.
     * @public
     * @param {Uint8Array} bytes
     * @returns {void}
     */
    _on_parse(bytes) {
        this._readerReady = false;
        this._buffer = [...bytes];
        logi(this._buffer)

        switch (this._buffer[0]) {
            case PartialFlashingBaseService.REGION_INFO_COMMAND:
                // Get Hash + Start / End addresses
                const read = (index) => {
                    return this._buffer[index + 3] + (this._buffer[index + 2] << 8) + (this._buffer[index + 1] << 16) + (this._buffer[index] << 24);
                }
                if (this._buffer[1] == PartialFlashingBaseService.REGION_MAKECODE) {
                    this.code_startAddress = read(2);
                    this.code_endAddress = read(6);
                }

                const hash = PartialFlashingBaseService._copyOfRange(this._buffer, 10, 18);
                logi("Hash: " + HexUtils.bytesToHex(hash));

                // If Region is DAL get HASH
                if (this._buffer[1] == PartialFlashingBaseService.REGION_DAL && this.python == false)
                    this.dalHash = HexUtils.bytesToHex(hash);

                if (this._buffer[1] == PartialFlashingBaseService.REGION_DAL && this.python == true)
                    this.dalHash = HexUtils.bytesToHex(hash);

                this._waitingResponse = false;
                break;

            case PartialFlashingBaseService.FLASH_COMMAND:
                this.packetState = this._buffer[1];
                switch (this.packetState) {
                    case PartialFlashingBaseService.PACKET_STATE_SENT:
                        logi("Packet State: Sent!");
                        break;
                    case PartialFlashingBaseService.PACKET_STATE_RETRANSMIT:
                        logi("Packet State: Retransmit!");
                        break;
                    case PartialFlashingBaseService.PACKET_STATE_COMPLETE_FLASH:
                        logi("Packet State: Complete Flash!");
                        break;
                }
                break;
            default:
                console.log(this._buffer)

        }

        this._readerReady = true;
    };

    /**
     * Read Memory Map from the MB
     * @returns {boolean}
     */
    async readMemoryMap() {
        try {
            for (var i = 0; i < 3; i++) {
                // Get Start, End, and Hash of each Region
                this._waitingResponse = true;
                await this._webBLE.write([PartialFlashingBaseService.REGION_INFO_COMMAND, i]);
                await waitFor(_ => this._waitingResponse === false);
            }
        } catch (e) {
            console.error(String(e));
        }
        return true;
    }

    findMakeCodeData(hex) {
        let pos = {
            line: -1,
            part: -1,
            sizeBytes: 0
        }
        pos.line = hex.searchForData(PartialFlashingBaseService.PXT_MAGIC);
        if (pos.line < 0) {
            return null;
        }
        const magicData = hex.getDataFromIndex(pos.line);
        pos.part = magicData.indexOf(PartialFlashingBaseService.PXT_MAGIC);
        const hdrAddress = hex.hexPosToAddress(pos);
        const hashAddress = hdrAddress + PartialFlashingBaseService.PXT_MAGIC.length / 2;
        let hashPos = hex.hexAddressToPos(hashAddress);
        if (hashPos == null) {
            return null;
        }
        hashPos.sizeBytes = 8;
        this.fileHash = hex.hexGetData(hashPos);
        if (this.fileHash.length < 8 * 2) {  // 16 bytes
            return null;
        }
        // TODO - find end of data pos.sizeBytes
        return pos;
    }

    findPythonData(hex) {
        let pos = {
            line: -1,
            part: -1,
            sizeBytes: 0
        }
        pos.line = hex.searchForDataRegEx(PartialFlashingBaseService.UPY_MAGIC);
        if (pos.line < 0) {
            return null;
        }
        let header = hex.getDataFromIndex(pos.line);
        pos.part = header.indexOf(PartialFlashingBaseService.UPY_MAGIC1);
        pos.sizeBytes = PartialFlashingBaseService.PYTHON_HEADER_SIZE;
        header = hex.hexGetData(pos);
        if (header.length < PartialFlashingBaseService.PYTHON_HEADER_SIZE * 2) {
            return null;
        }
        const version = HexUtils.hexToUint16(header, 8);
        const table_len = HexUtils.hexToUint16(header, 12);
        const num_reg = HexUtils.hexToUint16(header, 16);
        const pageLog2 = HexUtils.hexToUint16(header, 20);
        const page = this._webBLE.hardwareType == PartialFlashingBaseService.MICROBIT_V1 ? 0x400 : 0x1000;

        if ((version != 1) || (table_len != num_reg * 16) || (1 << pageLog2 != page)) {
            return null;
        }

        let codeStart = -1;
        let codeLength = -1;

        const hdrAddress = hex.hexPosToAddress(pos);
        for (var ri = 0; ri < num_reg; ri++) {
            const regionAddress = hdrAddress - table_len + ri * PartialFlashingBaseService.PYTHON_REGION_SIZE;
            pos = hex.hexAddressToPos(regionAddress);
            if (pos == null) {
                return null;
            }
            pos.sizeBytes = PartialFlashingBaseService.PYTHON_REGION_SIZE;
            const region = hex.hexGetData(pos);
            if (region.length < PartialFlashingBaseService.PYTHON_REGION_SIZE * 2) {
                return null;
            }

            const hashType = HexUtils.hexToUint8(region, 2);
            const hash = region.substring(16, 32);
            const hashPtr = HexUtils.hexToUint32(region, 16);

            // Extract regionHash
            let regionHash = null;
            switch (hashType) {
                default:
                    // Unknown
                    return null;
                case 0:
                    //hash data is empty
                    break;
                case 1:
                    // hash data contains 8 bytes of verbatim data
                    regionHash = hash;
                    break;
                case 2: {
                    // hash data contains a 4-byte pointer to a string of up tp 100 chars
                    // hash is the crc32 of the string
                    let hashPos = hex.hexAddressToPos(hashPtr);
                    if (hashPos == null) {
                        return null;
                    }
                    hashPos.sizeBytes = 100;
                    const hashData = hex.hexGetData(hashPos);
                    if (!hashData) {
                        return null;
                    }
                    let strLen = 0;
                    while (strLen < hashData.length / 2) {
                        const chr = HexUtils.hexToUint8(hashData, strLen * 2);
                        if (chr == 0) {
                            break;
                        }
                        strLen++;
                    }
                    const strBytes = new Array(strLen);
                    for (var i = 0; i < strLen; i++) {
                        const chr = HexUtils.hexToUint8(hashData, i * 2);
                        strBytes[i] = chr;
                    }

                    const crc = CRC32.buf([...strBytes])
                    const hash = new Uint8Array(new Uint32Array([crc]).buffer);
                    const hashBytes = PartialFlashingBaseService._copyOfRange([...hash], 0, 8);
                    regionHash = HexUtils.bytesToHex(hashBytes);

                    break;
                }
            }

            const regionID = HexUtils.hexToUint8(region, 0);
            const startPage = HexUtils.hexToUint16(region, 4);
            const regionLength = HexUtils.hexToUint32(region, 8);

            // Use regionHash from app region and code start & end from file system
            switch (regionID) {
                case 1: // softdevice
                    break;
                case 2: // micropython app
                    this.fileHash = regionHash;
                    break;
                case 3: // file system
                    codeStart = startPage * page;
                    codeLength = regionLength;
                    break;
            }
        }

        if (codeStart < 0 || codeLength < 0) {
            return null;
        }
        const index = hex.searchForAddress(codeStart);
        pos = hex.hexAddressToPos(codeStart);
        if (pos == null) {
            return null;
        }
        pos.sizeBytes = codeLength;
        return pos;
    }

    static _copyOfRange(array, start, length) {
        if (start > length) {
            throw new Error("Illegal argument 'start' is greater than 'length': " + start + ' > ' + length);
        }
        let copy = array.slice(start, length);
        if (length > array.length) {
            copy = copy.concat(new Array(length - array.length).fill(0));
        }
        return copy;
    };

}
