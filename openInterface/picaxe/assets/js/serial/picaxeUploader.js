// Upload of a compiled PICAXE program over Web Serial (AXE027 USB cable).
// Protocol observed on the official compiler with a 28X2 (firmware B.3):
// 1. 4800 bauds, break on: the chip sends f0 bytes then its id (a5 = 28X2); break off: the chip sends its firmware byte
// 2. aa 00 NN (NN = 256-byte program blocks, not echoed), program blocks last to first, table (256), eeprom (256),
//    each byte echoed by the chip; then 69 (not echoed, the chip answers a status byte)
// obj: 4096 bytes (program 0..3839, table 3840..4095), eee: 256 bytes, as written by the compiler (-o)

const PICAXE_UPLOAD = {
    FILTERS: [{ usbVendorId: 0x0403, usbProductId: 0xbd90 }], // AXE027
    BAUD_RATE: 4800,
    // ponytail: only the 28X2 was captured, add the ids of the other chips once a download is observed on them
    CHIP_IDS: { 0xa5: '28X2' },
    TABLE_START: 3840,
    HEADER: 0xaa,
    END: 0x69,
    WAKE: 0xf0,
    READ_ERRORS: ['FramingError', 'BreakError', 'ParityError', 'BufferOverrunError']
};

class PicaxeUploader {
    constructor(port, { onProgress = () => { }, timeout = 1000, wakeTimeout = 10000 } = {}) {
        this.port = port;
        this.onProgress = onProgress;
        this.timeout = timeout;
        this.wakeTimeout = wakeTimeout;
        this._bytes = [];
        this._pending = null;
    }

    static requestPort() {
        return navigator.serial.requestPort({ filters: PICAXE_UPLOAD.FILTERS });
    }

    // the blocks sent after the header: program blocks last to first, table, eeprom
    static payload(obj, eee) {
        const program = obj.slice(0, PICAXE_UPLOAD.TABLE_START);
        let used = program.length;
        while (used > 0 && program[used - 1] === 0) used--;
        const blocks = Math.max(1, Math.ceil(used / 256));
        const data = new Uint8Array(blocks * 256 + 512);
        for (let k = 0; k < blocks; k++) data.set(program.slice(k * 256, (k + 1) * 256), (blocks - 1 - k) * 256);
        data.set(obj.slice(PICAXE_UPLOAD.TABLE_START, PICAXE_UPLOAD.TABLE_START + 256), blocks * 256);
        data.set(eee.slice(0, 256), blocks * 256 + 256);
        return { blocks, data };
    }

    async upload(obj, eee) {
        const { blocks, data } = PicaxeUploader.payload(obj, eee);
        await this.port.open({ baudRate: PICAXE_UPLOAD.BAUD_RATE });
        this._reader = this.port.readable.getReader();
        this._writer = this.port.writable.getWriter();
        try {
            await this.port.setSignals({ break: true });
            // the chip sends f0 bytes (and a 00 when the break starts) before its id
            const deadline = Date.now() + this.wakeTimeout;
            let chipId = null, other = null;
            while (!(chipId in PICAXE_UPLOAD.CHIP_IDS)) {
                const message = other === null ? 'no answer from the PICAXE: check the power and the cable'
                    : `PICAXE chip id 0x${other.toString(16)} not supported yet`;
                chipId = await this._read(deadline - Date.now(), message);
                if (chipId !== PICAXE_UPLOAD.WAKE && chipId !== 0) other = chipId;
            }
            await this.port.setSignals({ break: false });
            const firmware = await this._read(this.timeout, 'no firmware byte from the PICAXE');
            for (const byte of [PICAXE_UPLOAD.HEADER, 0x00, blocks]) {
                await this._writer.write(Uint8Array.of(byte));
                await new Promise(resolve => setTimeout(resolve, 2));
            }
            for (let i = 0; i < data.length; i++) {
                await this._writer.write(data.subarray(i, i + 1));
                const echo = await this._read(this.timeout, `no echo from the PICAXE at byte ${i}`);
                if (echo !== data[i]) throw new Error(`wrong echo from the PICAXE at byte ${i}`);
                this.onProgress((i + 1) / data.length);
            }
            await this._writer.write(Uint8Array.of(PICAXE_UPLOAD.END));
            const status = await this._read(this.timeout, 'no end status from the PICAXE').catch(() => null);
            return { chip: PICAXE_UPLOAD.CHIP_IDS[chipId], firmware, blocks, status };
        } finally {
            await this.port.setSignals({ break: false }).catch(() => { });
            await this._reader.cancel().catch(() => { });
            this._reader.releaseLock();
            this._writer.releaseLock();
            await this.port.close();
        }
    }

    // one received byte, or an error after `timeout` ms (the pending read is kept for the next call)
    async _read(timeout, message) {
        let timer;
        const deadline = Date.now() + timeout;
        while (!this._bytes.length) {
            this._pending = this._pending || this._reader.read();
            let result;
            try {
                result = await Promise.race([
                    this._pending,
                    new Promise(resolve => timer = setTimeout(resolve, Math.max(0, deadline - Date.now()), null))
                ]);
            } catch (e) {
                // the break makes framing errors: non-fatal, Web Serial replaces port.readable with a new stream
                if (!PICAXE_UPLOAD.READ_ERRORS.includes(e.name)) throw e;
                this._pending = null;
                this._reader.releaseLock();
                this._reader = this.port.readable.getReader();
                continue;
            } finally {
                clearTimeout(timer);
            }
            if (result === null) throw new Error(message);
            this._pending = null;
            if (result.done) throw new Error('PICAXE serial port closed');
            this._bytes.push(...result.value);
        }
        return this._bytes.shift();
    }
}

if (typeof module !== 'undefined') {
    module.exports = { PICAXE_UPLOAD, PicaxeUploader };
}
