'use strict';

/**
 * Workspace HalocodeProtocols: HalocodePackData / HalocodeUpload / HalocodeController
 * Copyright 2020 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide the Halocode protocols for controlling CyberPi board.
 */

/** 
 * @fileoverview WorkSpace HalocodeProtocols 
 * @author: leomlr (Léo Meillier)
 */

const TYPE_RUN_WITHOUT_RESPONSE = 0x0;
const TYPE_RUN_WITH_RESPONSE = 0x1;
const TYPE_RUN_WITH_CONFIG = 0x4;

const TYPE_RESET = 0x2;
const TYPE_RUN_IMDT_WITE_RESPONSE = 0x3;
const TYPE_SUBSCRIBE = 0x29;
const TYPE_SCRIPT = 0x28;
const TYPE_ONLINE = 0x0d;
const TYPE_RESTART = 0x08;
const TYPE_UPLOAD = 0x01;

const HEADER_BYTE = 0xf3;
const FOOTER_BYTE = 0xf4;

/**
 * @class HalocodePackData
 */
class HalocodePackData {
    constructor(buf = []) {
        this._mode = TYPE_RUN_WITHOUT_RESPONSE
        this._value_name = ""
        this._header = HEADER_BYTE
        this._datalen = 0x0
        this._idx = 0
        this._type = 0x0
        this._data = []
        this._checksum = 0x0
        this._footer = FOOTER_BYTE
        this._event_cb = null
        this._subscribe_key = 0
        this._subscribe_value = 0
        this._subscribe_id = 0
        this._script = ""
        let end = buf.length
        if (end > 7) {
            this._header = buf[0]
            this._datalen = buf[2] + buf[3] * 256
            this._type = buf[4]
            this._mode = buf[5]
            if (this._type == TYPE_SCRIPT) {
                this._idx = buf[6] + (buf[7] << 8)
                this._data = buf.slice(7, end - 2);
            } else if (this._type == TYPE_SUBSCRIBE) {
                this._data = buf.slice(5, end - 2)
            } else if (this._type == TYPE_ONLINE) {
                this._idx = buf[5] + (buf[6] << 8)
            }
            if (buf[end - 2] > 0) {
                this._checksum = buf[end - 2]
            } else {
                this._checksum = this.checksum
            }
            this._footer = buf[end - 1]
        }
    }

    to_buffer() {
        let bytes = []
        bytes.push(this._header)
        let datalen = this._data.length + 4
        if (this._type == TYPE_ONLINE) {
            datalen -= 1
        }
        bytes.push((((datalen >> 8) & 0xff) + (datalen & 0xff) + HEADER_BYTE) & 0xff)
        bytes.push(datalen & 0xff)
        bytes.push((datalen >> 8) & 0xff)
        bytes.push(this._type)
        if (this._type != TYPE_ONLINE) {
            bytes.push(this._mode)
        }
        bytes.push(this._idx & 0xff)
        bytes.push((this._idx >> 8) & 0xff)
        for (var i = 0; i < this._data.length; i++) {
            bytes.push(this._data[i])
        }
        bytes.push(this.checksum())
        bytes.push(this._footer)
        return bytes;
    };

    checksum() {
        let sum = this._type + this._mode + ((this._idx >> 8) & 0xff) + (this._idx & 0xff)
        for (var i = 0; i < this._data.length; i++) {
            sum += this._data[i]
        }
        return sum & 0xff
    };

    //@script.setter
    script(value) {
        this._script = value;
        const script_data = new TextEncoder("utf8").encode(value);
        const datalen = script_data.length;
        this._data = new Uint8Array([datalen & 0xff, (datalen >> 8) & 0xff]);
        this._data = HalocodeController.concatTypedArrays(this._data, script_data);
    };

    //@subscribe_key.setter
    subscribe_key(value) {
        this.script = this.script.format(value);
        this._subscribe_key = value;
    };

    //@subscribe_value.setter
    subscribe_value(value) {
        this._subscribe_value = value;
    };

    //@value_name.setter
    value_name(value) {
        this._value_name = value;
    };

    //@subscribe_id.setter
    subscribe_id(value) {
        this._subscribe_id = value;
    };

    //@type.setter
    type(value) {
        this._type = value;
    };

    //@mode.setter
    mode(value) {
        this._mode = value;
    };

    //@datalen.setter
    datalen(value) {
        this._datalen = value;
    };

    //@idx.setter
    idx(value) {
        this._idx = value;
    };

    //@data.setter
    data(value) {
        this._data = value;
    };

    static goto_online_mode() {
        return new HalocodePackData([HEADER_BYTE, 0xf6, 0x03, 0, 0x0d, 0, 0x01, 0x0e, FOOTER_BYTE]);
    };

    static goto_offline_mode() {
        return new HalocodePackData([HEADER_BYTE, 0xf6, 0x03, 0, 0x0d, 0, 0x00, 0x0e, FOOTER_BYTE]);
    };

    static goto_repl() {
        return new HalocodePackData([HEADER_BYTE, 0xf6, 0x03, 0, 0x0d, 0, 0x00, 0x0d, FOOTER_BYTE]);
    };

    static repl_mode() {
        const pack = new HalocodePackData()
        pack.type(TYPE_SCRIPT);
        pack.mode(TYPE_RUN_WITH_RESPONSE);
        pack.script("global_dataObj.rests.communication_o.enable_protocol(global_dataObj.rests.communication_o.REPL_PROTOCOL_GROUP_ID)");
        return pack
    }
}

/**
 * @class HalocodeUpload
 */
class HalocodeUpload {
    /**
     * Creates an instance of HalocodeUpload.
     * @private
     */
    constructor() {
        this._fileContent = null
        this._filename = "";
    }
    /**
     * Update current file to upload.
     * @param {string} code
     * @param {string} filename
     * @returns {void}
     */
    setFile(code, filename) {
        this._fileContent = new Uint8Array(new TextEncoder('utf-8').encode(code));
        this._filename = "/flash/" + filename;
    }
    /**
     * Generate payloads from code to upload.
     * @public
     * @returns {Array<Array<byte>>} payloads
     */
    generatePayloads() {
        const modeUpload = [HEADER_BYTE, 0xf6, 0x03, 0, 0x0d, 0, 0, 0x0d, FOOTER_BYTE];
        const frameFooter = FOOTER_BYTE;
        const protocolId = 0x01;
        const deviceId = 0;
        const serviceId = 0x5e;
        let payloads = [modeUpload];
        const fileDataFrame = [this._generateHeader()].concat(this._generateBody());
        for (var i = 0; i < fileDataFrame.length; i++) {
            const uploadFrame = [protocolId, deviceId, serviceId].concat(fileDataFrame[i]);
            const frameSize = uploadFrame.length;
            const len1 = frameSize % 256;
            const len2 = Math.floor(frameSize / 256);
            const headerChecksum = HEADER_BYTE + len1 + len2;
            const fileDataChecksum = HalocodeUpload._calculateChecksum(uploadFrame);
            let dataFrame = [HEADER_BYTE, headerChecksum, len1, len2];
            dataFrame = dataFrame.concat(uploadFrame)
            dataFrame.push(fileDataChecksum);
            dataFrame.push(frameFooter);
            payloads.push(new Uint8Array(dataFrame));
        }
        console.log("Generated " + payloads.length + " payloads to transfer to cyberpi");
        return payloads;
    };
    /**
     * Generate header of payloads to upload.
     * @private
     * @returns {Array<byte>} header
     */
    _generateHeader() {
        const instructionId = 0x01;
        const fileType = 0x00;
        const fileSize = this._fileContent.length;
        const sizeBytes = [fileSize & 0xff, (fileSize >> 8) & 0xff, (fileSize >> 16) & 0xff, (fileSize >> 24) & 0xff];
        let data = [fileType].concat(sizeBytes).concat(HalocodeUpload._xor32BitChecksum(this._fileContent));
        const fileNameBytes = new TextEncoder('utf-8').encode(this._filename);
        for (var i = 0; i < fileNameBytes.length; i++) {
            data.push(fileNameBytes[i]);
        }
        return [instructionId, data.length, 0x00].concat(data);
    };
    /**
     * Generate body of payloads to upload.
     * @private
     * @returns {Array<Array<byte>>} bodyFrames
     */
    _generateBody() {
        let bodyFrames = [];
        let dataSizeToSend;
        const instructionID = 0x02;
        const maxSize = 0x50;
        const fileSize = this._fileContent.length;
        if (fileSize > maxSize) {
            dataSizeToSend = maxSize;
        } else {
            dataSizeToSend = fileSize;
        }
        for (var sentData = 0x00; sentData < fileSize; sentData += dataSizeToSend) {
            dataSizeToSend = Math.min(maxSize, fileSize - sentData);
            let data = [sentData & 0xff, (sentData >> 8) & 0xff, (sentData >> 16) & 0xff, (sentData >> 24) & 0xff];
            for (var i = sentData; i < dataSizeToSend + sentData; i++) {
                data.push(this._fileContent[i])
            }
            let frame = [instructionID, data.length, 0x00].concat(data);
            bodyFrames.push(frame);
        }
        return bodyFrames;
    };
    /**
     * Calculate XOR 32bit cheksum of file name.
     * @private
     * @returns {Array<byte>} checksum
     */
    static _xor32BitChecksum(content) {
        const fileSize = content.length;
        let checksum = [0x00, 0x00, 0x00, 0x00];
        const padding = fileSize % 4;
        for (var i = 0; i < fileSize / 4; i++) {
            for (var j = 0; j < 4; j++) {
                checksum[j] ^= content[i * 4 + j];
            }
        }
        if (padding != 0) {
            for (var i = 0; i < padding; i++) {
                checksum[i] ^= content[4 * (fileSize / 4) + i]
            }
        }
        return checksum;
    };
    /**
     * Calculate cheksum of file data.
     * @private
     * @param {Array<byte>} data
     * @returns {byte} sum
     */
    static _calculateChecksum(data) {
        return data.reduce((a, b) => a + b, 0) & 0xff;
    };
};

/**
 * @class HalocodeController
 */
class HalocodeController {
    /**
     * Creates an instance of HalocodeController.
     * @private
     */
    constructor(webBLE) {
        this.READING_HEADER_BYTES = [0xef, 0xbf, 0xbd];
        this._webBLE = webBLE
        this._buffer = []
        this._textData = ""
        this._isInError = false
        this._readerReady = true
        this._ansi_up = new AnsiUp
        this.waitingScript = false
        this.isLoopClosed = true
        this.payloadWritted = true
        this.online = false
        this.response = null
        this.receiving_command = false
        this.tempPack = []
        this.hasToClose = false
    };
    /**
     * Call external logger from InterfaceMonitor and write it.
     * @param {string} text 
     * @param {string} color 
     */
    log(text, color) {
        InterfaceMonitor.writeConsole(text, color);
    };
    /**
     * Reading loop for printing data read by device 'dataReceived' yield on console.
     * @public
     * @returns {void}
     */
    async readingLoop() {
        this.isLoopClosed = false;
        while (true) {
            if (!this._webBLE.isConnected) {
                break;
            }
            await waitFor(_ => this._readerReady);
            const { value, done } = await this._webBLE.read();
            if (done || !value) {
                if (this.hasToClose) {
                    this.isLoopClosed = true;
                    break;
                }
                continue;
            } else {
                this._on_parse(this._encodeData(value));
                if (this.hasToClose) {
                    this.isLoopClosed = true;
                    break;
                }
            }
        }
    };
    /**
    * Logging pack into console switching by package type.
    * @param {int} type
    * @param {int} len
    * @returns {void}
    */
    logPack(type, len) {
        this.receiving_command = false;
        switch (type) {
            case TYPE_SCRIPT:
                //this.log("Packet: (" + len + ") -> TYPE_SCRIPT");
                this.waitingScript = false;
                break;
            case TYPE_SUBSCRIBE:
                //this.log("Packet: (" + len + ") -> TYPE_SUBSCRIBE");
                break;
            case TYPE_ONLINE:
                //this.log("Packet: (" + len + ") -> TYPE_ONLINE");
                this.online = true;
                break;
            case TYPE_RESTART:
                //this.log("Packet: (" + len + ") -> TYPE_RESTART");
                this.restarted = true;
                break;
            case TYPE_UPLOAD:
                const log = "Transfert" + (this._webBLE.filename ? (" de " + this._webBLE.filename) : "") + " en cours ... " + this._webBLE.percent + ' %';
                const lines = document.getElementById('console').innerHTML.split('</p>');
                const regexp = /Transfert( de (.*).py|) en cours ... [0-9]{1,2} %/;
                if (regexp.test(lines[lines.length - 2])) {
                    lines[lines.length - 2] = lines[lines.length - 2].replace(regexp, log);
                    document.getElementById('console').innerHTML = lines.join('</p>')
                } else {
                    this.log(log, 'default');
                }
                this.payloadWritted = true;
                break;
            default:
                if (type != 0) {
                    this.log("Packet: (" + len + ") -> " + type);
                }
        }
    }
    /**
     * Parse data received from CyberPi as Halocode protocols.
     * @private
     * @param {Uint8Array} bytes
     * @returns {void}
     */
    _on_parse(bytes) {
        this._readerReady = false;
        const UPLOAD_MODE_RESPONSE = this.READING_HEADER_BYTES.concat([0x03, 0, 0x0d, 0, 0, 0x0d]);
        const TYPE_UPLOAD_RESP = this.READING_HEADER_BYTES.concat([0x07, 0, 0x01, 0, 0x5e]);
        const END_WRITING = this.READING_HEADER_BYTES.concat([0x01, 0, 0, 0x50]);
        const RESTARTED_BOARD = this.READING_HEADER_BYTES.concat([0x02, 0, 0x08]);
        this._buffer = [...bytes];
        for (var i = 0; i < this._buffer.length; i++) {
            if (this.READING_HEADER_BYTES.includes(this._buffer[i])) {
                if (this._buffer[i] == this.READING_HEADER_BYTES[0]) {
                    if (this.receiving_command && this.tempPack.length == 3) {
                        //this.log("Packet: (" + this.tempPack.length + ") -> 0");
                        this.tempPack = new Array();
                    }
                    this.receiving_command = false;
                } else if (this._buffer[i] == this.READING_HEADER_BYTES[2]) {
                    this.receiving_command = true;
                    this.printing = true;
                }
                this.tempPack.push(this._buffer[i]);
            } else if (this._buffer[i] == HEADER_BYTE) {
                this.receiving_command = true;
                this.tempPack = [];
                this.tempPack.push(this._buffer[i]);
            } else if ([0x05, 0x0c, 0xf5, 0xf6, 0xfa, 0x01, 0x02, 0x03, 0x07].includes(this._buffer[i])) {
                if (this.receiving_command) {
                    this.tempPack.push(this._buffer[i]);
                    this.printing = false;
                } else {
                    this.receiving_command = false;
                    this._textData += this._decodeData([this._buffer[i]]);
                }
            } else if (this._buffer[i] == FOOTER_BYTE) {
                if (this.receiving_command) {
                    this.tempPack.push(this._buffer[i]);
                    const pack = new HalocodePackData(this.tempPack);
                    this.logPack(pack._type, pack._datalen);
                    if (pack._data.length) {
                        const string = this._decodeData(pack._data);
                        const jsonResponse = string.slice(string.indexOf('{'), string.indexOf("}") + 1);
                        this.response = JSON.parse(jsonResponse.replace(/None/g, 'null').replace(/True/g, 'true').replace(/False/g, 'false').replace(/\</g, '\"<').replace(/\>/g, '>\"').replace(/'/g, "\""));
                        this.log(this._ansi_up.ansi_to_html(string));
                    }
                }
                this.tempPack = [];
            } else {
                if (this.receiving_command && !this.printing) {
                    this.tempPack.push(this._buffer[i]);
                    const checkCommand = () => {
                        this.tempPack = [];
                        this.printing = true;
                    };
                    if (arrayEquals(this.tempPack, UPLOAD_MODE_RESPONSE)) {
                        this.logPack(this.tempPack[5], this.tempPack.length);
                        checkCommand();
                    } else if (arrayEquals(this.tempPack, TYPE_UPLOAD_RESP)) {
                        this.logPack(this.tempPack[5], this.tempPack.length);
                        checkCommand();
                    } else if (arrayEquals(this.tempPack, END_WRITING)) {
                        this.logPack(this.tempPack[5], this.tempPack.length);
                        checkCommand();
                    } else if (arrayEquals(this.tempPack, RESTARTED_BOARD)) {
                        this.logPack(this.tempPack[5], this.tempPack.length);
                        checkCommand();
                    } else {
                        if (this._webBLE.type == 'serial') {
                            const newPack = [HEADER_BYTE].concat(this.tempPack.slice(3));
                            newPack.push(FOOTER_BYTE);
                            const pack = new HalocodePackData(newPack);
                            const _checksum = HalocodeUpload._calculateChecksum(this.tempPack.slice(5, -1));
                            let data = pack._data;
                            if ((_checksum == pack._checksum && _checksum > 0) || this.tempPack.slice(-1)[0] == 125) {
                                if (this.tempPack.slice(-1)[0] == 125 && _checksum !== pack._checksum) {
                                    data = this.tempPack.slice(7);
                                }
                                if (data.length) {
                                    const string = this._decodeData(data);
                                    const jsonResponse = string.slice(string.indexOf('{'), string.indexOf("}") + 1);
                                    try {
                                        this.response = JSON.parse(jsonResponse.replace(/None/g, 'null').replace(/True/g, 'true').replace(/False/g, 'false').replace(/\</g, '\"<').replace(/\>/g, '>\"').replace(/'/g, "\""));
                                        this.logPack(TYPE_SCRIPT, this.tempPack.length);
                                        checkCommand();
                                        this.log(this._ansi_up.ansi_to_html(string));
                                    } catch (e) {
                                        console.error(e)
                                    }
                                }
                            }
                        }
                    }
                } else {
                    this._textData += this._decodeData([this._buffer[i]]);
                    this.receiving_command = false;
                }
            }
        }
        if (this._textData) {
            this._printResponseOnConsole();
            this.tempPack = [];
        }
        this._readerReady = true;
    };
    /**
     * Print received data on console.
     * @private
     * @param {Array<byte>} data
     * @returns {void}
     */
    _printResponseOnConsole() {
        //this._textData += this._decodeData(data);
        const lines = this._textData.split('\n');
        for (var i = 0; i < lines.length - 1; i++) {
            const line = this._ansi_up.ansi_to_html(lines[i]);
            if (/exec error/.test(lines[i])) {
                this.log(line, 'warning');
            } else if (/Traceback/.test(lines[i])) {
                this._isInError = true;
                this.log('\n' + line, 'warning');
            } else if (/Error: /.test(lines[i]) && this._isInError) {
                this.log(line, 'warning', false, true);
                this._isInError = false;
            } else if (/WARNING:/.test(lines[i])) {
                this.log(line, 'interrupt');
            } else if (this._isInError) {
                this.log(line, 'warning', true);
            } else {
                this.log(line.replace(/\n/g, '</br>'));
            }
            if (!InterfaceMonitor.PARSING_MESSAGE) {
                const value = parseFloat(lines[i]);
                let graph = null;
                if (!isNaN(value)) {
                    graph = '@Graph:Console:' + value + '|';
                } else if (lines[i].match(/^@Graph:/)) {
                    graph = lines[i];
                }
                if (graph !== null) {
                    InterfaceMonitor.sendDataToChart(graph);
                }
                if (lines[i].match(/^@music:/) && $('#audio-switch').append("On")) {
                    this._playNote(lines[i]);
                }
            }
        }
        const lastLine = lines[lines.length - 1];
        if (lastLine == '>>> ') {
            this._textData = "";
            this.log(lastLine + "\n");
        } else {
            this._textData = lastLine;
        }
    };
    /**
     * Play note from response on navigator.
     * @private
     * @param {string} response
     * @returns {void}
     */
    _playNote(response) {
        playMusic(response.replace("@music:", "").replace("|", ""));
    };
    /**
     * Decode data from array of byte.
     * @param {Array<byte>} arr 
     * @returns {string} 
     */
    _decodeData(arr) {
        return new TextDecoder('utf-8').decode(new Uint8Array(arr));
    };
    /**
     * Encode data from string.
     * @param {string} str 
     * @returns {Uint8Array} 
     */
    _encodeData(str) {
        return new TextEncoder('utf-8').encode(str);
    };
    /**
     * Concatenate two Uint8Array
     * @static
     * @param {Uint8Array} a 
     * @param {Uint8Array} b
     * @returns {Uint8Array} c
     */
    static concatTypedArrays(a, b) {
        var c = new (a.constructor)(a.length + b.length);
        c.set(a, 0);
        c.set(b, a.length);
        return c;
    };
}