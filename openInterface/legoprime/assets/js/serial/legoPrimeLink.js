'use strict';

/**
 * LEGO SPIKE Prime (SPIKE 3) RPC over Web Serial (USB 115200 8N1) or Web Bluetooth.
 * Protocol: https://lego.github.io/spike-prime-docs/ (COBS framing, same messages as the BLE service).
 * Never goes through the MicroPython REPL: the program is stored in a slot, main.py is not touched.
 */

const LEGO_PRIME = {
    FILTERS: [{ usbVendorId: 0x0694, usbProductId: 0x0009 }],
    BAUDRATE: 115200,
    BLE: { SERVICE: '0000fd02-0000-1000-8000-00805f9b34fb', RX: '0000fd02-0001-1000-8000-00805f9b34fb', TX: '0000fd02-0002-1000-8000-00805f9b34fb' },
    INFO_TIMEOUT: 3000, // no answer = firmware is not SPIKE 3
    INFO_RETRY: 300, // the hub drops what is sent right after the port opens: resend until it answers
    REQUEST_TIMEOUT: 5000,
    STOP_TIMEOUT: 1000, // wait for the stop notification of the previous program
    PACKET_DELAY: 25, // ms between the packets of a message, as the LEGO app does over USB
    ID: { INFO_REQ: 0x00, INFO_RES: 0x01, START_UPLOAD: 0x0C, UPLOAD_RES: 0x0D, CHUNK: 0x10, CHUNK_RES: 0x11, FLOW: 0x1E, FLOW_RES: 0x1F, FLOW_NOTIF: 0x20, CONSOLE: 0x21, CLEAR: 0x46, CLEAR_RES: 0x47 }
};

const LEGO_DELIMITER = 0x02, LEGO_NO_DELIMITER = 0xff, LEGO_MAX_BLOCK = 84, LEGO_XOR = 3;

function legoCobsEncode(data) {
    const out = [];
    let codeIndex = 0, block = 0;
    const begin = () => { codeIndex = out.length; out.push(LEGO_NO_DELIMITER); block = 1; };
    begin();
    for (const byte of data) {
        if (byte > LEGO_DELIMITER) {
            out.push(byte);
            block++;
        }
        if (byte <= LEGO_DELIMITER || block > LEGO_MAX_BLOCK) {
            if (byte <= LEGO_DELIMITER) out[codeIndex] = byte * LEGO_MAX_BLOCK + block + LEGO_DELIMITER;
            begin();
        }
    }
    out[codeIndex] = block + LEGO_DELIMITER;
    return out;
}

function legoCobsDecode(data) {
    const out = [];
    const unescape = code => {
        if (code === 0xff) return [null, LEGO_MAX_BLOCK + 1];
        let value = Math.floor((code - LEGO_DELIMITER) / LEGO_MAX_BLOCK);
        let block = (code - LEGO_DELIMITER) % LEGO_MAX_BLOCK;
        if (block === 0) { block = LEGO_MAX_BLOCK; value--; }
        return [value, block];
    };
    let [value, block] = unescape(data[0]);
    for (let i = 1; i < data.length; i++) {
        block--;
        if (block > 0) { out.push(data[i]); continue; }
        if (value !== null) out.push(value);
        [value, block] = unescape(data[i]);
    }
    return Uint8Array.from(out);
}

function legoPack(data) {
    return Uint8Array.from([...legoCobsEncode(data).map(b => b ^ LEGO_XOR), LEGO_DELIMITER]);
}

// frame: optional 0x01 priority byte, XORed COBS, final 0x02
function legoUnpack(frame) {
    const start = frame[0] === 0x01 ? 1 : 0;
    return legoCobsDecode(Array.from(frame.subarray(start, frame.length - 1), b => b ^ LEGO_XOR));
}

let legoCrcTable = null;

/** CRC32 (zlib) of data zero-padded to a multiple of 4, continuing from seed. */
function legoCrc32(bytes, seed = 0) {
    if (!legoCrcTable) {
        legoCrcTable = Array.from({ length: 256 }, (_, n) => {
            for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
            return n >>> 0;
        });
    }
    const padded = new Uint8Array(Math.ceil(bytes.length / 4) * 4);
    padded.set(bytes);
    let crc = ~seed;
    for (const b of padded) crc = legoCrcTable[(crc ^ b) & 0xff] ^ (crc >>> 8);
    return ~crc >>> 0;
}

/**
 * Extract complete frames from a byte buffer (decoded payloads).
 * A 0x01 inside a frame opens a priority message that interrupts a normal one: the bytes already received
 * are kept and put back in front of the stream, so the normal message resumes after the priority one.
 * @returns {{frames: Uint8Array[], rest: Uint8Array}}
 */
function legoParse(buffer) {
    const frames = [];
    let pending = []; // prefix of a normal message interrupted by a priority one
    let start = 0;
    for (let i = 0; i < buffer.length; i++) {
        if (buffer[i] !== LEGO_DELIMITER) continue;
        const segment = buffer.subarray(start, i + 1);
        const priority = segment.lastIndexOf(0x01);
        if (priority >= 0) {
            pending = [...pending, ...segment.subarray(0, priority)];
            frames.push(legoUnpack(segment.subarray(priority)));
        } else {
            frames.push(legoUnpack(Uint8Array.from([...pending, ...segment])));
            pending = [];
        }
        start = i + 1;
    }
    return { frames, rest: Uint8Array.from([...pending, ...buffer.subarray(start)]) };
}

// the name is not padded: name + NUL (31 bytes max), then slot and CRC
function legoStartUpload(fileName, slot, crc) {
    const name = [...new TextEncoder().encode(fileName).slice(0, 31), 0];
    const message = new Uint8Array(name.length + 6);
    message[0] = LEGO_PRIME.ID.START_UPLOAD;
    message.set(name, 1);
    message[1 + name.length] = slot;
    new DataView(message.buffer).setUint32(2 + name.length, crc, true);
    return message;
}

function legoMessage(id, ...bytes) {
    return legoPack(Uint8Array.from([id, ...bytes]));
}

/**
 * Console text of the hub: print() arrives in several 0x21 messages (text, separator, newline), each ended by NUL,
 * and a UTF-8 character can be cut between two messages. Gives back the complete lines only.
 */
class LegoConsoleBuffer {
    constructor() {
        this.reset();
    }

    reset() {
        this.decoder = new TextDecoder();
        this.pending = '';
    }

    /** @param {Uint8Array} bytes payload of a 0x21 message (without the id) */
    push(bytes) {
        let end = bytes.length;
        while (end > 0 && bytes[end - 1] === 0) end--;
        this.pending += this.decoder.decode(bytes.subarray(0, end), { stream: true });
        const lines = this.pending.split(/\r?\n/);
        this.pending = lines.pop();
        return lines;
    }

    /** What is left (print(..., end="")), at the end of the program. */
    flush() {
        const rest = this.pending + this.decoder.decode();
        this.reset();
        return rest;
    }
}

/**
 * Start of a program: the hub sends [0x20, 0] when it runs it and [0x20, 1] when it ends. A stop without start
 * after our start request means the program did not run; a stop while nothing was requested comes from a previous program.
 */
class LegoRunState {
    constructor() {
        this.starting = false;
        this.running = false;
    }

    /** the start request is about to be sent */
    begin() {
        this.starting = true;
        this.running = false;
    }

    cancel() {
        this.starting = this.running = false;
    }

    /** @returns {'ended'|'notStarted'|null} what a ProgramFlowNotification means */
    onFlow(stop) {
        if (!stop) {
            this.running = this.starting;
            return null;
        }
        const result = this.running ? 'ended' : this.starting ? 'notStarted' : null;
        this.cancel();
        return result;
    }
}

class LegoPrimeLink {
    constructor() {
        this.serial = new Serial(LEGO_PRIME.BAUDRATE, LEGO_PRIME.FILTERS);
        this.listeners = new Set();
        this.info = null;
        this.run = new LegoRunState();
        this.buffer = new Uint8Array(0);
        this.ble = null; // {device, rx} when connected by Bluetooth
    }

    get isConnected() {
        return this.info !== null;
    }

    /**
     * Pick the hub (USB port or Bluetooth device), then send InfoRequest. No answer within INFO_TIMEOUT: not a SPIKE 3 firmware.
     * @param {boolean} bluetooth
     * @returns {Promise<object>} versions and max sizes
     */
    async connect(bluetooth = false) {
        this.listeners.clear(); // subscriptions of a previous connection
        this.buffer = new Uint8Array(0);
        if (bluetooth) {
            await this._openBluetooth();
        } else {
            await this.serial.open();
            await this.serial.setDTR?.(true).catch(() => { });
            this._reading = this._readLoop();
        }
        const answer = this.waitFor(m => m[0] === LEGO_PRIME.ID.INFO_RES, LEGO_PRIME.INFO_TIMEOUT);
        const request = legoMessage(LEGO_PRIME.ID.INFO_REQ);
        const retry = setInterval(() => this._write(request), LEGO_PRIME.INFO_RETRY);
        this._write(request);
        try {
            const m = await answer;
            const v = new DataView(m.buffer, m.byteOffset, m.byteLength);
            this.info = {
                rpc: [m[1], m[2], v.getUint16(3, true)], firmware: [m[5], m[6], v.getUint16(7, true)],
                maxPacketSize: v.getUint16(9, true), maxMessageSize: v.getUint16(11, true), maxChunkSize: v.getUint16(13, true), productGroupDevice: v.getUint16(15, true)
            };
            return this.info;
        } catch (e) {
            await this.disconnect();
            throw e;
        } finally {
            clearInterval(retry);
        }
    }

    /** Clear the slot, upload the program in chunks, start it. ClearSlot NACK is fine: the slot was empty. */
    async upload(code, slot) {
        const program = new TextEncoder().encode(code);
        // stop the previous program, and wait for its stop notification so that it is not taken for the end of the new one
        this.run.cancel();
        const ended = this.waitFor(m => m[0] === LEGO_PRIME.ID.FLOW_NOTIF && m[1] === 1, LEGO_PRIME.STOP_TIMEOUT).catch(() => { });
        const stopped = await this.stop(slot).then(m => m[1] === 0, () => false);
        if (stopped) await ended;
        await this._request(legoMessage(LEGO_PRIME.ID.CLEAR, slot), LEGO_PRIME.ID.CLEAR_RES).catch(() => { });
        const start = legoStartUpload('program.py', slot, legoCrc32(program));
        await this._expectOk(this._request(legoPack(start), LEGO_PRIME.ID.UPLOAD_RES), 'start upload');
        let running = 0;
        for (let i = 0; i < program.length; i += this.info.maxChunkSize) {
            const chunk = program.subarray(i, i + this.info.maxChunkSize);
            running = legoCrc32(chunk, running);
            const msg = new Uint8Array(7 + chunk.length);
            msg[0] = LEGO_PRIME.ID.CHUNK;
            new DataView(msg.buffer).setUint32(1, running, true);
            new DataView(msg.buffer).setUint16(5, chunk.length, true);
            msg.set(chunk, 7);
            await this._expectOk(this._request(legoPack(msg), LEGO_PRIME.ID.CHUNK_RES), 'chunk');
        }
        this.run.begin(); // before the request: the notifications follow the response
        await this._expectOk(this._request(legoMessage(LEGO_PRIME.ID.FLOW, 0, slot), LEGO_PRIME.ID.FLOW_RES), 'start');
    }

    stop(slot) {
        this.run.cancel();
        return this._request(legoMessage(LEGO_PRIME.ID.FLOW, 1, slot), LEGO_PRIME.ID.FLOW_RES);
    }

    _request(frame, responseId) {
        const answer = this.waitFor(m => m[0] === responseId, LEGO_PRIME.REQUEST_TIMEOUT);
        this._write(frame);
        return answer;
    }

    async _expectOk(request, what) {
        const m = await request;
        if (m[1] !== 0) throw new Error('LEGO ' + what + ' refused');
    }

    async _openBluetooth() {
        const { SERVICE, RX, TX } = LEGO_PRIME.BLE;
        const device = await navigator.bluetooth.requestDevice({ filters: [{ services: [SERVICE] }] });
        device.addEventListener('gattserverdisconnected', () => this._closed());
        const service = await (await device.gatt.connect()).getPrimaryService(SERVICE);
        const rx = await service.getCharacteristic(RX);
        const tx = await service.getCharacteristic(TX);
        tx.addEventListener('characteristicvaluechanged', event => {
            const { buffer, byteOffset, byteLength } = event.target.value;
            this._receive(new Uint8Array(buffer, byteOffset, byteLength));
        });
        await tx.startNotifications();
        this.ble = { device, rx };
    }

    // Serial.write takes a writer lock on each call: serialize writes to avoid "WritableStream is locked"
    _write(frame) {
        return this._tx = (this._tx || Promise.resolve()).catch(() => { }).then(async () => {
            // before InfoResponse the packet size is unknown: the frame is small
            const size = this.info?.maxPacketSize || frame.length;
            for (let i = 0; i < frame.length; i += size) {
                const packet = frame.subarray(i, i + size);
                if (this.ble) {
                    await this.ble.rx.writeValueWithoutResponse(packet);
                    continue;
                }
                if (i > 0) await new Promise(resolve => setTimeout(resolve, LEGO_PRIME.PACKET_DELAY));
                await this.serial.write(packet);
            }
        });
    }

    waitFor(match, timeout) {
        return new Promise((resolve, reject) => {
            const listener = message => {
                if (!match(message)) return;
                clearTimeout(timer);
                this.listeners.delete(listener);
                resolve(message);
            };
            const timer = setTimeout(() => {
                this.listeners.delete(listener);
                reject(new Error('LEGO hub not responding'));
            }, timeout);
            this.listeners.add(listener);
        });
    }

    /** Subscribe to every message (console, program flow). Returns the unsubscribe function. */
    onMessage(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    async disconnect() {
        this.info = null;
        if (this.ble) {
            this.ble.device.gatt.disconnect(); // fires gattserverdisconnected
            return;
        }
        if (!this.serial.port) return;
        await this.serial.reader?.cancel().catch(() => { });
        await this._reading;
        await this.serial.port.close().catch(() => { });
        this.serial.reset();
    }

    _closed() {
        this.ble = null;
        this.info = null; // USB unplugged, hub out of range or closed
        this.onClose?.();
    }

    // a message can be split over several reads or notifications
    _receive(bytes) {
        const merged = new Uint8Array(this.buffer.length + bytes.length);
        merged.set(this.buffer);
        merged.set(bytes, this.buffer.length);
        const { frames, rest } = legoParse(merged);
        this.buffer = rest;
        frames.forEach(frame => [...this.listeners].forEach(listener => listener(frame)));
    }

    // Serial._loop_reader decodes text, the RPC protocol is binary: read raw bytes here.
    async _readLoop() {
        try {
            while (this.serial.port?.readable) {
                const reader = this.serial.port.readable.getReader();
                this.serial.reader = reader;
                try {
                    while (true) {
                        const { value, done } = await reader.read();
                        if (done) return;
                        this._receive(value);
                    }
                } catch (e) {
                    console.warn('LEGO read error', e);
                } finally {
                    reader.releaseLock();
                }
            }
        } finally {
            this._closed();
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = { LEGO_PRIME, legoCobsEncode, legoCobsDecode, legoPack, legoUnpack, legoCrc32, legoParse, legoMessage, legoStartUpload, LegoConsoleBuffer, LegoRunState, LegoPrimeLink };
}
