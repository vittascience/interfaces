/**
 *  A Class to manipulate micro:bit hex files
 *
 *  (c) 2017 - 2024, Micro:bit Educational Foundation and contributors
 *
 *  SPDX-License-Identifier: MIT
 * 
 *  (c) 2024 - Translated from Java by Léo Meillier (Vittascience)
 *
 */

class HexApplicationParser {

    static MICROBIT_V1 = 1;
    static MICROBIT_V2 = 2;

    static hexBlock00 = 0x9900;
    static hexBlock01 = 0x9901;
    static hexBlock02 = 0x9902;
    static hexBlock03 = 0x9903;
    static hexBlock04 = 0x9904;

    static STATUS_PARSING_ERROR = -1;
    static STATUS_PARSING_DONE = 0;
    static STATUS_DFU_DATA_ERROR = 1;
    static STATUS_DFU_DATA_DONE = 2;

    constructor() {

        this.scanHexSize = 0;
        this.scanAddrMin = 0;
        this.scanAddrNext = 2147483647;
        this.lineNext = 0;
        this.lineHidx = 0;
        this.lineCount = 0;
        this.lineAddr = 0;
        this.lineType = 0;
        this.lineBlockType = 0;
        this.lastBaseAddr = 0;
        this.resultAddrMin = 9223372036854775807;
        this.resultAddrNext = 0;
        this.resultDataSize = 0;
        this.resultHexData = null;
        this.resultData = null;
        this.resultHex = '';
    }

    scanInit() {
        this.scanHexSize = 0;
        this.lineNext = 0;
        this.lineHidx = 0;
        this.scanAddrMin = 0;
        this.scanAddrNext = 2147483647;
        this.lineCount = 0;
        this.lineAddr = 0;
        this.lineType = 0;
        this.lineBlockType = 0;
        this.lastBaseAddr = 0;
        this.resultAddrMin = 9223372036854775807;
        this.resultAddrNext = 0;
    }

    parseLine(hex) {
        if (this.lineNext > this.scanHexSize - 3)
            return false;

        this.lineHidx = this.lineNext;

        if (hex[this.lineHidx] !== ':')
            return false;

        this.lineCount = HexUtils.hexToUint8(hex, this.lineHidx + 1);
        if (this.lineCount < 0)
            return false;

        const bytes = 5 + this.lineCount;
        const digits = bytes * 2;
        let next = digits + 1;  // +1 for colon

        while (this.lineHidx + next < this.scanHexSize) {
            const b = hex[this.lineHidx + next];
            if (b === '\r')
                next++;
            else if (b === '\n')
                next++;
            else if (b === ':')
                break;
            else
                return false;
        }

        this.lineNext += next; // bump lineNext to next line or eof
        this.lineType = HexUtils.hexToUint8(hex, this.lineHidx + 7);
        if (this.lineType < 0)
            return false;

        switch (this.lineType) {
            case 0:                 // Data
            case 0x0D:
                this.lineAddr = HexUtils.hexToUint16(hex, this.lineHidx + 3);
                if (this.lineAddr < 0)
                    return false;
                break;

            case 0x0A: {               // Extended Segment Address
                if (this.lineCount !== 4)
                    return false;
                const hi = HexUtils.hexToUint8(hex, this.lineHidx + 9);
                const lo = HexUtils.hexToUint8(hex, this.lineHidx + 11);
                this.lineBlockType = hi * 256 + lo;
                break;
            }
            case 2: {               // Extended Segment Address
                if (this.lineCount !== 2)
                    return false;
                const hi = HexUtils.hexToUint8(hex, this.lineHidx + 9);
                const lo = HexUtils.hexToUint8(hex, this.lineHidx + 11);
                this.lastBaseAddr = hi * 0x1000 + lo * 0x10;
                break;
            }
            case 3:                 // Start Segment Address
                break;

            case 4: {               // Extended Linear Address
                if (this.lineCount !== 2)
                    return false;
                const hi = HexUtils.hexToUint8(hex, this.lineHidx + 9);
                const lo = HexUtils.hexToUint8(hex, this.lineHidx + 11);
                this.lastBaseAddr = hi * 0x1000000 + lo * 0x10000;
                break;
            }
            case 5:                 // Start Linear Address
                break;
        }
        return true;
    }

    static calcSum(hex, hexIdx) {
        const count = HexUtils.hexToUint8(hex, hexIdx + 1);
        if (count < 0)
            return -1;
        const bytes = 5 + count - 1;

        let sum = 0;

        for (var i = 0; i < bytes; i++) {
            const b = HexUtils.hexToUint8(hex, hexIdx + 1 + i * 2);
            if (b < 0)
                return -1;
            sum += b;
        }

        const b = sum % 256;
        return b;
    }

    static lineCheck(hex, hexIdx) {
        const count = HexUtils.hexToUint8(hex, hexIdx + 1);
        if (count < 0)
            return -1;
        return HexUtils.hexToUint8(hex, hexIdx + 9 + count * 2);
    }

    static setCheck(hex, hexIdx) {
        const sum = HexApplicationParser.calcSum(hex, hexIdx);
        if (sum < 0) {
            return false;
        }
        const check = (sum === 0 ? 0 : (256 - sum));
        const count = HexUtils.hexToUint8(hex, hexIdx + 1);
        const checkIdx = hexIdx + 9 + count * 2;
        hex[checkIdx] = HexUtils.byteToHex(check / 16);
        hex[checkIdx + 1] = HexUtils.byteToHex(check % 16);

        const chk = HexApplicationParser.lineCheck(hex, hexIdx);
        if (chk < 0) {
            return false;
        }
        const sum2 = HexApplicationParser.calcSum(hex, hexIdx);
        const sum3 = (chk + sum2) % 256;
        if (sum3 !== 0) {
            return false;
        }
        return true;
    }

    lineData(hex, hexIdx, data, idx) {
        const count = HexUtils.hexToUint8(hex, hexIdx + 1);
        if (count < 0)
            return false;
        for (var i = 0; i < count; i++) {
            const d = HexUtils.hexToUint8(hex, hexIdx + 9 + 2 * i);
            if (d < 0)
                return false;
            data[idx + i] = d;
        }
        return true;
    }

    hexBlockIsV1(hexBlock) {
        switch (hexBlock) {
            case HexApplicationParser.hexBlock00:
            case HexApplicationParser.hexBlock01:
            case HexApplicationParser.hexBlock02:
                return true;

            case HexApplicationParser.hexBlock03:
            case HexApplicationParser.hexBlock04:
                break;

            default:
                break;
        }

        return false;
    }

    hexBlockIsV2(hexBlock) {
        switch (hexBlock) {
            case HexApplicationParser.hexBlock00:
            case HexApplicationParser.hexBlock01:
            case HexApplicationParser.hexBlock02:
                break;

            case HexApplicationParser.hexBlock03:
            case HexApplicationParser.hexBlock04:
                return true;

            default:
                break;
        }

        return false;
    }

    hexBlocksMatch(blockType, hexBlock) {
        if (this.hexBlockIsV1(blockType))
            return this.hexBlockIsV1(hexBlock);

        if (this.hexBlockIsV2(blockType))
            return this.hexBlockIsV2(hexBlock);

        return false;
    }

    hexBlockToAppRegion(hexBlock) {
        logi("hexBlockToAppRegion()")
        let min = 0;
        let next = 0;
        let page = 0;

        switch (hexBlock) {
            case HexApplicationParser.hexBlock00:
            case HexApplicationParser.hexBlock01:
            case HexApplicationParser.hexBlock02:
                min = 0x18000;  // min and max addresses allowed in FOTA file
                next = 0x3C000;
                page = 0x400;
                break;
            case HexApplicationParser.hexBlock03:
            case HexApplicationParser.hexBlock04:
                min = 0x1C000;
                next = 0x77000;
                page = 0x1000;
                break;
            default:
                break;
        }
        logi([min, next, page])
        return [min, next, page];
    }

    static bytesmatch(b0, i0, b1, i1, len) {
        for (var i = 0; i <= len; i++) {
            if (b0[i0 + i] !== b1[i1 + i]) {
                return false;
            }
        }
        return true;
    }

    scanForDataHexComplete(datahex, hexBlock, universalhex, universalsize) {
        logi("scanForDataHexComplete()")
        this.scanHexSize = universalsize;
        this.resultDataSize = 0;

        let lastType = -1;    // Type of last record added
        let lastSize = -1;    // index of last record added
        let hexSize = 0;
        let hidxELA0 = -1;     // last ELA stored
        let sizeELA0 = 0;

        let dataWanted = false;  // block type matches hexBlock
        let isUniversal = false;

        for (this.lineNext = 0; this.lineNext < this.scanHexSize; /*empty*/) {
            if (!this.parseLine(universalhex))
                return 0;

            const rlen = this.lineNext - this.lineHidx;
            if (rlen === 0)
                continue;
            switch (this.lineType) {
                case 0:                 // Data
                case 0x0D:
                    if (!isUniversal || dataWanted) {
                        const fullAddr = this.lastBaseAddr + this.lineAddr;
                        if (fullAddr + this.lineCount > this.scanAddrMin && fullAddr < this.scanAddrNext) {
                            if (this.resultAddrMin > fullAddr) {
                                this.resultAddrMin = fullAddr;
                            }
                            if (this.resultAddrNext < fullAddr + this.lineCount) {
                                this.resultAddrNext = fullAddr + this.lineCount;
                            }
                            if (datahex !== null) {

                                for (var i = 0; i < rlen; i++) {
                                    datahex[hexSize + i] = universalhex[this.lineHidx + i];
                                }
                                datahex[hexSize + 7] = '0';
                                datahex[hexSize + 8] = '0';
                                // TO DO: checksum
                                // if (!HexApplicationParser.setCheck(datahex, hexSize)) {
                                //     console.log("return 0")
                                //     return 0;
                                // }
                            }
                            lastSize = hexSize;
                            lastType = this.lineType;
                            hexSize += rlen;
                        }
                    }
                    break;

                case 1:                 //EOF
                case 2:                 // Extended Segment Address
                    if (datahex !== null) {
                        for (var i = 0; i < rlen; i++) {
                            datahex[hexSize + i] = universalhex[this.lineHidx + i];
                        }
                    }
                    lastSize = hexSize;
                    lastType = this.lineType;
                    hexSize += rlen;
                    break;

                case 3:                 // Start Segment Address
                    break;

                case 4:                 // Extended Linear Address record
                    // Add if the address has changed
                    // If the last record added is ELA, overwrite it
                    if (sizeELA0 !== rlen || !HexApplicationParser.bytesmatch(universalhex, hidxELA0, universalhex, this.lineHidx, rlen)) {
                        hidxELA0 = this.lineHidx;
                        sizeELA0 = rlen;
                        if (lastType === this.lineType)
                            hexSize = lastSize;
                        if (datahex !== null) {
                            for (var i = 0; i < sizeELA0; i++) {
                                datahex[hexSize + i] = universalhex[hidxELA0 + i];
                            }
                        }
                        lastSize = hexSize;
                        lastType = this.lineType;
                        hexSize += sizeELA0;
                    }
                    break;

                case 5:                 // Start Linear Address
                    break;

                case 0x0A:              // Start block record
                    {
                        if (this.lineCount < 2) {
                            return 0;
                        }

                        if (sizeELA0 === 0) {
                            console.error("must have been at least an ELA record")
                            // must have been at least an ELA record
                            return 0;
                        }

                        isUniversal = true;
                        dataWanted = this.hexBlocksMatch(this.lineBlockType, hexBlock);
                        break;
                    }

                case 0x0B:              // End block
                    break;

                case 0x0C:              // End block
                    break;

                default:
                    break;
            }
        }

        const range = this.resultAddrNext > this.resultAddrMin ? this.resultAddrNext - this.resultAddrMin : 0;
        this.resultDataSize = range;

        if (this.resultDataSize === 0)
            hexSize = 0;       // no data for specified hexBlock

        return hexSize;
    }

    // Scan for single target data hex from universal hex
    //
    // return false on failure
    scanForDataHex(universalHex, hexBlock) {
        this.resultHexData = null;

        try {
            let hexSize = this.scanForDataHexComplete(null, hexBlock, universalHex, universalHex.length);
            if (hexSize == 0)
                return false;

            if (hexSize > 0) {
                this.resultHexData = new Array(hexSize).fill(0);
                if (this.resultHexData == null)
                    return false;
                hexSize = this.scanForDataHexComplete(this.resultHexData, hexBlock, universalHex, universalHex.length);
                if (hexSize == 0)
                    return false;
            }
        } catch (e) {
            console.error(e)
            return false;
        }
        return true;
    }

    universalHexToApplicationHex(universalHex, hexBlock) {
        logi("universalHexToApplicationHex()")
        this.scanInit();
        const mnp = this.hexBlockToAppRegion(hexBlock);
        this.scanAddrMin = mnp[0];
        this.scanAddrNext = mnp[1];
        return this.scanForDataHex(universalHex, hexBlock);
    }

    static scanForData(data, hex, hexSize) {
        logi("scanForData()")
        this.scanHexSize = hexSize;

        for (this.lineNext = 0; this.lineNext < this.scanHexSize; /*empty*/) {
            if (!this.parseLine(hex))
                return 0;

            const rlen = this.lineNext - this.lineHidx;
            if (rlen === 0)
                continue;

            switch (this.lineType) {
                case 0:                 // Data
                case 0x0D:
                    const fullAddr = this.lastBaseAddr + this.lineAddr;
                    if (fullAddr + this.lineCount > this.scanAddrMin && fullAddr < this.scanAddrNext) {
                        const first = (this.scanAddrMin > fullAddr ? this.scanAddrMin - fullAddr : 0);
                        const next = (this.scanAddrNext < fullAddr + this.lineCount ? this.scanAddrNext - fullAddr : this.lineCount);
                        const length = next - first;
                        const dataOffset = fullAddr + first - this.scanAddrMin;
                        if (data !== null) {
                            for (var i = 0; i < length; i++) {
                                data[dataOffset + i] = hex[this.lineHidx + 9 + 2 * i];
                            }
                        }
                        if (this.resultAddrMin > fullAddr + first) {
                            this.resultAddrMin = fullAddr + first;
                        }
                        if (this.resultAddrNext < fullAddr + next) {
                            this.resultAddrNext = fullAddr + next;
                        }
                    }
                    break;
                default:
                    break;
            }
        }

        // calculate size of data from scanMin
        if (this.resultAddrNext > this.resultAddrMin) {
            this.resultDataSize = this.resultAddrNext - this.scanAddrMin;
        } else {
            this.resultDataSize = 0; // no data between
        }

        return this.resultDataSize;
    }

    // Extract data from records (0x00, 0x0D)
    scanForDataComplete(hex, hexSize) {
        logi("scanForDataComplete()")
        this.scanHexSize = hexSize;

        for (this.lineNext = 0; this.lineNext < this.scanHexSize; /*empty*/) {
            if (!this.parseLine(hex))
                return 0;

            let rlen = this.lineNext - this.lineHidx;
            if (rlen === 0)
                continue;
            switch (this.lineType) {
                case 0: // Data
                case 0x0D:
                    const fullAddr = this.lastBaseAddr + this.lineAddr;
                    if (fullAddr + this.lineCount > this.scanAddrMin && fullAddr < this.scanAddrNext) {
                        const first = this.scanAddrMin > fullAddr ? this.scanAddrMin - fullAddr : 0;
                        const next = this.scanAddrNext < fullAddr + this.lineCount ? this.scanAddrNext - fullAddr : this.lineCount;
                        const dataOffset = fullAddr + first - this.scanAddrMin;
                        if (this.resultData !== null) {
                            const lineBytes = new Array(this.lineCount).fill(0);
                            if (!this.lineData(hex, this.lineHidx, lineBytes, 0)) {
                                return 0;
                            }
                            for (var i = 0; i < (next - first); i++) {
                                this.resultData[dataOffset + i] = lineBytes[first + i];
                            }
                        }
                        if (this.resultAddrMin > fullAddr + first) {
                            this.resultAddrMin = fullAddr + first;
                        }
                        if (this.resultAddrNext < fullAddr + next) {
                            this.resultAddrNext = fullAddr + next;
                        }
                    }
                    break;
                default:
                    break;
            }
        }

        // calculate size of data from scanMin
        if (this.resultAddrNext > this.resultAddrMin) {
            this.resultDataSize = this.resultAddrNext - this.scanAddrMin;
        } else {
            this.resultDataSize = 0; // no data between
        }

        return this.resultDataSize;
    }

    scanForData(hex) {
        this.resultData = null;
        let dataSize = this.scanForDataComplete(hex, hex.length);
        if (dataSize === 0) {
            return false;
        }
        if (dataSize % 4 !== 0) {
            // Android DFU library will not proceed if data is not word aligned
            // iOS library doesn't seem to mind
            dataSize += 4 - dataSize % 4;
        }
        this.resultData = new Array(dataSize).fill(0xFF);
        dataSize = this.scanForDataComplete(hex, hex.length);
        if (dataSize === 0) {
            return false;
        }
        return true;
    }

    universalHexToDFU(inputHex, hardwareType) {
        logi('universalHexToDFU');
        const hexBlock = hardwareType === HexApplicationParser.MICROBIT_V1 ? HexApplicationParser.hexBlock01 : HexApplicationParser.hexBlock03;
        logi("hexBlock: 0x" + hexBlock.toString(16))
        if (!this.universalHexToApplicationHex(inputHex, hexBlock)) {
            this.status = HexApplicationParser.STATUS_PARSING_ERROR;
            return;
        }
        logi('universalHexToDFU - Finished parsing HEX');
        this.resultHex = this.resultHexData.join('');
        this.status = HexApplicationParser.STATUS_PARSING_DONE;
    }
    /**
     * Extract data from application hex
     * @param {string} hex 
     * @param {int} hexBlock 
     * @returns 
     */
    applicationHexToData(hex, hexBlock) {
        logi("applicationHexToData()")
        this.scanInit();
        const mnp = this.hexBlockToAppRegion(hexBlock);
        this.scanAddrMin = mnp[0];
        this.scanAddrNext = mnp[1];
        return this.scanForData(hex);
    }

    async prepareToDfu(hardwareType) {
        const hexBlock = hardwareType === HexApplicationParser.MICROBIT_V1 ? HexApplicationParser.hexBlock01 : HexApplicationParser.hexBlock03;
        if (!this.applicationHexToData(this.resultHex, hexBlock)) {
            this.status = HexApplicationParser.STATUS_DFU_DATA_ERROR;
            return;
        }
        this.dfuData = {
            firmware: this.resultData
        };
        if (hardwareType == HexApplicationParser.MICROBIT_V2) {
            this.dfuData.init = this.createAppDat(this.resultData.length);
        }
        this.status = HexApplicationParser.STATUS_DFU_DATA_DONE;
    }

    createAppDat(appSize) {
        logi(`createAppDat ${appSize}`);
        const version = 1
        const MAGIC_BYTES = "microbit_app".split("").map(c => c.charCodeAt(0));
        const appSizeBuffer = new Uint8Array(new Uint32Array([appSize]).buffer);
        const dat = new Uint8Array(56).fill(0);
        dat.set(MAGIC_BYTES, 0);
        dat[12] = version;
        dat.set(appSizeBuffer, 16);
        return dat;
    }
}
