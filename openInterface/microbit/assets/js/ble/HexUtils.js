/**
 * Created by Sam Kent on 01/11/2017.
 *
 * A Class to manipulate micro:bit hex files
 * Focused towards stripping a file down to it's PXT section for use in Partial Flashing
 *
 *  (c) 2017 - 2021, Micro:bit Educational Foundation and contributors
 *
 *  SPDX-License-Identifier: MIT
 *
 *  (c) 2024 - Translated and updated from Java by Léo Meillier (Vittascience)
 */

class HexUtils {

    static INIT = 0;
    static INVALID_FILE = 1;
    static NO_PARTIAL_FLASH = 2;

    constructor() {
        this.filePath = null;
        this.status = HexUtils.INIT;
        this.reader = null;
        this.hexLines = [];
    }

    /**
     * Initialize hex tool with filepath.
     * @param {string} filePath 
     */
    async initWithFilePath(filePath) {
        try {
            this.filePath = filePath;
            this.status = HexUtils.INIT;
            const status = await this.openHexFile();
            if (!status) {
                this.status = HexUtils.INVALID_FILE;
            }
        } catch (e) {
            console.error("Error opening file: " + e);
        }
    };
    /**
     * Initialize hex tool with hex string.
     * @param {string} hex 
     */
    initWithHexStr(hex) {
        this.status = HexUtils.INIT;
        this.hexLines = hex.split(/\r?\n/);
    };
    /**
     * A function to open a hex file for reading
     * @returns {void}
     */
    openHexFile() {
        const _this = this;
        return new Promise(async resolve => {
            await VittaInterface.fetchDir(_this.filePath).then((hex) => {
                _this.hexLines = hex.split(/\r?\n/);
                resolve(true);
            });
        });
    };
    /**
     * A function to find the length of the hex file
     * @returns {int} length
     */
    numOfLines() {
        return this.hexLines.length;
    };
    /**
     * A function to search for data in a hex file
     * @param {RegExp} regexp 
     * @returns {int} line
     */
    searchForData(regexp) {
        for (var i = 0; i < this.hexLines.length; i++) {
            if (this.hexLines[i].match(regexp)) {
                return i;
            }
        }
        return -1;
    };
    /**
     * A function to search for data in a hex file
     * @param {RegExp} regexp 
     * @returns {int} line
     */
    searchForDataRegEx(regexp) {
        for (var i = 0; i < this.hexLines.length; i++) {
            if (this.hexLines[i].match(regexp)) {
                return i;
            }
        }
        return -1;
    };
    /**
     * A function to search for an address in a hex file
     * @param {int} address 
     * @returns {int}
     */
    searchForAddress(address) {
        let lastBaseAddr = 0;
        let data = "";
        // Iterate through

        for (var i = 0; i < this.hexLines.length; i++) {
            const recordType = this.getRecordType(this.hexLines[i]);
            switch (recordType) {
                case 2: // Extended Segment Address
                    data = this.getRecordData(this.hexLines[i]);
                    if (data.length != 4) {
                        return -1;
                    }
                    const hi = parseInt(data.substring(0, 1), 16);
                    const lo = parseInt(data.substring(1), 16);
                    lastBaseAddr = hi * 0x1000 + lo * 0x10;
                    if (lastBaseAddr > address) {
                        return -1;
                    }
                    break;
                case 4:
                    data = this.getRecordData(this.hexLines[i]);
                    if (data.length != 4) {
                        return -1;
                    }
                    lastBaseAddr = parseInt(data, 16);
                    lastBaseAddr *= 0x10000;
                    if (lastBaseAddr > address) {
                        return -1;
                    }
                    break;
                case 0:
                case 0x0D:
                    if (address - lastBaseAddr < 0x10000) {
                        const a = lastBaseAddr + this.getRecordAddress(this.hexLines[i]);
                        const n = this.getRecordDataLength(this.hexLines[i]) / 2; // bytes
                        if (a <= address && a + n > address) {
                            return i;
                        }
                    }
                    break;
            }
        }
        // Return -1 if no match
        this.status = HexUtils.NO_PARTIAL_FLASH;
        return -1;
    };
    /**
     * Returns data from an index
     * @param {int} index 
     * @returns {string} data
     */
    getDataFromIndex(index) {
        return this.getRecordData(this.hexLines[index]);
    };
    /**
     * Returns record type from an index.
     * @param {int} index 
     * @returns {int} type
     */
    getRecordTypeFromIndex(index) {
        return this.getRecordType(this.hexLines[index]);
    };
    /**
     * Returns record address from an index
     * Note: does not include segment address
     * @param {int} index 
     * @returns {int} address
     */
    getRecordAddressFromIndex(index) {
        return this.getRecordAddress(this.hexLines[index]);
    };
    /**
     * Returns segment address from an index
     * @param {int} index 
     * @returns {int} address
     */
    getSegmentAddress(index) {
        // Look backwards to find current segment address
        let segmentAddress = -1;
        let cur = index;
        while (segmentAddress == -1) {
            if (this.getRecordTypeFromIndex(cur) == 4)
                break;
            cur--;
        }
        // Return segment address
        return parseInt(this.getRecordData(this.hexLines[cur]), 16);
    };
    /**
     * Used to get the data address from a record
     * @param {string} record 
     * @returns {int} address
     */
    getRecordAddress(record) {
        const hexAddress = record.substring(3, 7);
        return parseInt(hexAddress, 16);
    };
    /**
     * Used to get the data length from a record
     * @param {string} record 
     * @returns {int} length
     */
    getRecordDataLength(record) {
        const hexLength = record.substring(1, 3);
        return 2 * parseInt(hexLength, 16); // Num Of Bytes. Each Byte is represented by 2 chars hence 2*
    };
    /**
     * Used to get the record type from a record
     * @param {string} record 
     * @returns {int} type
     */
    getRecordType(record) {
        try {
            const hexType = record.substring(7, 9);
            return parseInt(hexType, 16);
        } catch (e) {
            console.error("getRecordType " + e.toString());
            return 0;
        }
    };
    /**
     * Used to get the data from a record
     * @param {string} record 
     * @returns {string}
     */
    getRecordData(record) {
        try {
            const len = this.getRecordDataLength(record);
            return record.substring(9, 9 + len);
        } catch (e) {
            console.error("Get record data " + e.toString());
            return "";
        }
    };
    /**
     * Record to byte Array
     * @param {string} hexString 
     * @param {int} offset 
     * @param {int} packetNum 
     * @returns {Array<byte>} data
     */
    static recordToByteArray(hexString, offset, packetNum) {
        const len = hexString.length;
        let data = new Array(len / 2 + 4);
        for (var i = 0; i < len; i += 2) {
            data[i / 2 + 4] = (parseInt(hexString[i], 16) << 4) + parseInt(hexString[i + 1], 16);
        }
        // WRITE Command
        data[0] = 0x01;
        data[1] = (offset >> 8);
        data[2] = (offset & 0xFF);
        data[3] = (packetNum & 0xFF);
        return data;
    };
    /**
     * Get requested position from hex address.
     * @param {int} address 
     * @returns {Object} pos
     */
    hexAddressToPos(address) {
        let pos = {
            line: -1,
            part: -1,
            sizeBytes: 0
        }
        pos.line = this.searchForAddress(address);
        if (pos.line < 0) {
            return null;
        }
        const lineAddr = this.getRecordAddressFromIndex(pos.line);
        const addressLo = address % 0x10000;
        const offset = addressLo - lineAddr;
        pos.part = offset * 2;
        return pos;
    };
    /**
     * Get address from position
     * @param {Object} pos 
     * @returns {int} address
     */
    hexPosToAddress(pos) {
        const addrLo = this.getRecordAddressFromIndex(pos.line);
        const addrHi = this.getSegmentAddress(pos.line);
        const addr = addrLo + (addrHi << 16);
        const posAddr = addr + pos.part / 2;
        return posAddr;
    }
    /**
     * Get hex data from position.
     * @param {Object} pos 
     * @returns {string} data
     */
    hexGetData(pos) {
        let data = "";
        let line = pos.line;
        let part = pos.part;
        let size = pos.sizeBytes * 2; // 2 characters per byte
        while (size > 0) {
            const type = this.getRecordTypeFromIndex(line);
            if (type != 0 && type != 0x0D) {
                line++;
                part = 0;
            } else {
                const lineData = this.getDataFromIndex(line);
                const len = lineData.length;
                const chunk = Math.min(len - part, size);
                if (chunk > 0) {
                    data += lineData.substring(part, part + chunk);
                    part += chunk;
                    size -= chunk;
                }
                if (size > 0 && part >= len) {
                    line += 1;
                    part = 0;
                    if (line >= this.numOfLines()) {
                        break;
                    }
                }
            }
        }
        return data;
    };
    /**
     * Get 8-bit value from hex string at index idx.
     * @param {string} hex 
     * @param {int} idx 
     * @returns {int}
     */
    static hexToUint8(hex, idx) {
        const hi = parseInt(hex.charAt(idx), 16);
        const lo = parseInt(hex.charAt(idx + 1), 16);
        if (lo < 0 || hi < 0) {
            return -1;
        }
        return (hi << 4) + lo;
    };
    /**
     * Get 16-bit value from hex string at index idx.
     * @param {string} hex 
     * @param {int} idx 
     * @returns {int}
     */
    static hexToUint16(hex, idx) {
        const lo = HexUtils.hexToUint8(hex, idx);
        const hi = HexUtils.hexToUint8(hex, idx + 2);
        if (lo < 0 || hi < 0) {
            return -1;
        }
        return (hi << 8) + lo;
    };
    /**
     * Get 32-bit value from hex string at index idx.
     * @param {string} hex 
     * @param {int} idx 
     * @returns {int}
     */
    static hexToUint32(hex, idx) {
        const b0 = HexUtils.hexToUint8(hex, idx);
        const b1 = HexUtils.hexToUint8(hex, idx + 2);
        const b2 = HexUtils.hexToUint8(hex, idx + 4);
        const b3 = HexUtils.hexToUint8(hex, idx + 6);
        if (b0 < 0 || b1 < 0 || b2 < 0 || b3 < 0) {
            return -1;
        }
        return b0 + (b1 << 8) + (b2 << 16) + (b3 << 24);
    };
    /**
     * Convert a byte to hex character.
     * @param {int} byte 
     * @returns {string} hex
     */
    static byteToHex(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2)
    };
    /**
     * Convert an array of bytes to hex string.
     * @param {Array<byte>} bytes 
     * @returns {string} hex
     */
    static bytesToHex(bytes) {
        return Array.from(bytes, function (i) {
            return HexUtils.byteToHex(i);
        }).join('');
    };

}