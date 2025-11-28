'use strict';

class SerialUploader {
    constructor() {
        this.FRAME_HEADER = 0xF3;
        this.FRAME_END = 0xF4;
        this.PROTOCOL_ID = 0x01;
        this.DEV_ID = 0x00;
        this.SRV_ID = 0x5E;
        this.HEADER_CMD_ID = 0x01;
        this.FILE_BLOCK_CMD_ID = 0x02;
        this.FILE_TYPE = 0x00;
        this.FILE_BLOCK_SIZE = 240;

        this.MAX_RETRIES_HEADER = 5;
        this.MAX_RETRIES_BLOCK = 3;
        this.ACK_TIMEOUT_MS = 20000;

        this.TARGET_FILE_NAME = "/flash/main.py";

        this.port = null;
        this.hasToClose = false;
        this.readBuffer = [];
    }

    // ------------------------------------------------------------
    // Fonctions utilitaires
    // ------------------------------------------------------------

    intToLittleEndianHex(num, nbBytes) {
        const arr = new Uint8Array(nbBytes);
        for (let i = 0; i < nbBytes; i++) {
            arr[i] = num & 0xff;
            num = num >> 8;
        }
        return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    hexToUint8Array(hexStr) {
        const cleanHex = hexStr.replace(/\s+/g, '');
        const arr = new Uint8Array(cleanHex.length / 2);
        for (let i = 0; i < cleanHex.length; i += 2) {
            arr[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
        }
        return arr;
    }

    uint8ArrayToHex(arr) {
        return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    calcAddChecksum(hexStr) {
        let sum = 0;
        for (let i = 0; i < hexStr.length; i += 2) {
            sum += parseInt(hexStr.substr(i, 2), 16);
        }
        return sum & 0xff;
    }

    calc32BitXor(data) {
        const xor = new Uint8Array(4);
        xor[0] = xor[1] = xor[2] = xor[3] = 0;
        for (let i = 0; i < data.length; i++) {
            xor[i % 4] ^= data[i];
        }
        return xor;
    }

    // ------------------------------------------------------------
    // Lecture / Parsing trames
    // ------------------------------------------------------------

    tryParseFrame() {
        if (this.readBuffer.length < 6) return null;
        const startIndex = this.readBuffer.indexOf(this.FRAME_HEADER);
        if (startIndex === -1) {
            this.readBuffer = [];
            return null;
        }
        if (this.readBuffer.length - startIndex < 6) return null;

        const headChecksum = this.readBuffer[startIndex + 1];
        const lenLow = this.readBuffer[startIndex + 2];
        const lenHigh = this.readBuffer[startIndex + 3];
        const dataLen = lenLow + (lenHigh << 8);
        const frameTotalLen = dataLen + 6;
        if (this.readBuffer.length - startIndex < frameTotalLen) return null;

        if (((this.FRAME_HEADER + lenLow + lenHigh) & 0xff) !== headChecksum) {
            this.readBuffer.splice(0, startIndex + 1);
            return null;
        }

        const dataStart = startIndex + 4;
        const dataEnd = dataStart + dataLen;
        const dataBytes = this.readBuffer.slice(dataStart, dataEnd);
        const dataChecksum = this.readBuffer[dataEnd];
        const computedDataChecksum = dataBytes.reduce((sum, b) => (sum + b) & 0xff, 0);

        if (computedDataChecksum !== dataChecksum || this.readBuffer[dataEnd + 1] !== this.FRAME_END) {
            this.readBuffer.splice(0, startIndex + 1);
            return null;
        }

        const frame = dataBytes;
        this.readBuffer.splice(0, startIndex + frameTotalLen);
        return frame;
    }

    async readFrame(timeoutMs) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error("Timeout réception trame")), timeoutMs);
            const reader = SerialAPI.port.readable.getReader();
            (async () => {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    if (value) {
                        for (const b of value) {
                            this.readBuffer.push(b);
                        }
                        const frame = this.tryParseFrame();
                        if (frame !== null) {
                            clearTimeout(timeout);
                            resolve(new Uint8Array(frame));
                            reader.releaseLock();
                            return;
                        }
                    }
                }
            })();
        });
    }

    async sendFrameWithAck(frame, maxRetries, frameType) {
        const writer = SerialAPI.port.writable.getWriter();
        try {
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                console.log(`Envoi ${frameType} tentative ${attempt}`);
                await writer.write(frame);
                try {
                    await this.readFrame(this.ACK_TIMEOUT_MS);
                    console.log(`ACK ${frameType} reçu`);
                    return true;
                } catch {
                    console.warn(`Pas d'ACK pour ${frameType} tentative ${attempt}`);
                }
            }
            return false;
        } finally {
            writer.releaseLock();
        }
    }

    async sendCtrlC() {
        if (!this.port) return;
        const writer = this.port.writable.getWriter();
        try {
            const ctrlC = new Uint8Array([0x03]);
            await writer.write(ctrlC);
            console.log("CTRL+C envoyé pour interrompre le programme Python.");
        } finally {
            writer.releaseLock();
        }
    }

    async close() {
        await SerialAPI.port.close();
        SerialAPI.reset();
    }

    renderProgressBar(current, total, width = 30) {
        const percent = Math.floor((current / total) * 100);
        const filled = Math.floor((percent / 100) * width);
        const empty = width - filled;

        const bar = `[${'='.repeat(filled)}${filled < width ? '⯈' : ''}${' '.repeat(Math.max(0, empty - 1))}]`;
        return `${current}/${total} ${bar} ${percent}%`;
    }
}