'use strict';

/**
 * SkyKick Evo (Byrobot) drone search & connection over Web Serial.
 * Protocol reconstructed from "skykick evo block coding" 1.0.10 (@semobae-ex/skykick-link 1.0.2-4):
 * frame = 0x0A 0x55 | dataType len from to | payload | CRC16-XMODEM (LE) over header+payload.
 * The drone is reached through its USB controller (CH340 1a86:7523, 57600 8N1).
 */

const SKYKICK = {
    FILTERS: [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }],
    BAUDRATE: 57600,
    SEARCH_TIMEOUT: 10000, // same as SCAN_TIMEOUT in the original app
    RETRY_INTERVAL: 1000, // same as connectInterval in the original app
    DATA_TYPE: { PING: 1, ACK: 2, REQUEST: 4, INFORMATION: 7 },
    DEVICE: { NONE: 0, DRONE: 16, CONTROLLER: 32 },
    MODEL_CONTROLLER_P5: 729093 // Drone_11_Controller_P5, the identity the original app expects
};

function skykickCrc16(bytes) {
    let crc = 0;
    for (const b of bytes) {
        crc ^= b << 8;
        for (let i = 0; i < 8; i++) {
            crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        }
        crc &= 0xffff;
    }
    return crc;
}

function skykickFrame(dataType, from, to, payload = []) {
    const body = [dataType, payload.length, from, to, ...payload];
    const crc = skykickCrc16(body);
    return new Uint8Array([0x0a, 0x55, ...body, crc & 0xff, crc >> 8]);
}

/**
 * Extract complete, CRC-valid frames from a byte buffer.
 * @returns {{frames: Array<{dataType, from, to, payload: Uint8Array}>, rest: Uint8Array}}
 */
function skykickParse(buffer) {
    const frames = [];
    let i = 0;
    while (i + 6 <= buffer.length) {
        if (buffer[i] !== 0x0a || buffer[i + 1] !== 0x55) {
            i++;
            continue;
        }
        const end = i + 6 + buffer[i + 3] + 2;
        if (end > buffer.length) break;
        const body = buffer.subarray(i + 2, end - 2);
        const crc = skykickCrc16(body);
        if (buffer[end - 2] === (crc & 0xff) && buffer[end - 1] === crc >> 8) {
            frames.push({ dataType: body[0], from: body[2], to: body[3], payload: body.slice(4) });
            i = end;
        } else {
            i++;
        }
    }
    return { frames, rest: buffer.slice(i) };
}

class SkykickLink {
    constructor() {
        this.serial = new Serial(SKYKICK.BAUDRATE, SKYKICK.FILTERS);
        this.listeners = new Set();
        this.information = null;
    }

    get isConnected() {
        return this.information !== null;
    }

    /**
     * Pick the controller port (auto-reused if already granted), then ask the controller
     * for its Information every second until it answers as a SkyKick controller.
     * @returns {Promise<object>} controller information {modelNumber, ...}
     */
    async search() {
        await this.serial.open();
        this._reading = this._readLoop();
        const request = skykickFrame(SKYKICK.DATA_TYPE.REQUEST, SKYKICK.DEVICE.NONE, SKYKICK.DEVICE.CONTROLLER, [SKYKICK.DATA_TYPE.INFORMATION]);
        const answer = this.waitFor(f => f.dataType === SKYKICK.DATA_TYPE.INFORMATION && f.from === SKYKICK.DEVICE.CONTROLLER, SKYKICK.SEARCH_TIMEOUT);
        const retry = setInterval(() => this._write(request), SKYKICK.RETRY_INTERVAL);
        this._write(request);
        try {
            const frame = await answer;
            const view = new DataView(frame.payload.buffer);
            const modelNumber = view.getUint32(1, true);
            if (modelNumber !== SKYKICK.MODEL_CONTROLLER_P5) {
                throw new Error('Unexpected SkyKick controller model ' + modelNumber);
            }
            this.information = { modelNumber, year: view.getUint16(9, true), month: view.getUint8(11), day: view.getUint8(12) };
            return this.information;
        } catch (e) {
            await this.disconnect();
            throw e;
        } finally {
            clearInterval(retry);
        }
    }

    /**
     * Ping the drone through the controller: resolves only when the drone itself acknowledges.
     */
    async pingDrone(timeout = 600) {
        const ping = new Uint8Array(8);
        new DataView(ping.buffer).setBigUint64(0, BigInt(Date.now()), true);
        const ack = this.waitFor(f => f.dataType === SKYKICK.DATA_TYPE.ACK, timeout);
        await this.send(SKYKICK.DATA_TYPE.PING, SKYKICK.DEVICE.DRONE, ping);
        return ack;
    }

    // Serial.write takes a writer lock on each call: serialize writes to avoid "WritableStream is locked"
    _write(frame) {
        return this._tx = (this._tx || Promise.resolve()).catch(() => { }).then(() => this.serial.write(frame));
    }

    send(dataType, to, payload) {
        return this._write(skykickFrame(dataType, SKYKICK.DEVICE.NONE, to, payload));
    }

    waitFor(match, timeout) {
        return new Promise((resolve, reject) => {
            const listener = frame => {
                if (!match(frame)) return;
                clearTimeout(timer);
                this.listeners.delete(listener);
                resolve(frame);
            };
            const timer = setTimeout(() => {
                this.listeners.delete(listener);
                reject(new Error('SkyKick not found'));
            }, timeout);
            this.listeners.add(listener);
        });
    }

    async disconnect() {
        this.information = null;
        if (!this.serial.port) return;
        await this.serial.reader?.cancel().catch(() => { });
        await this._reading;
        await this.serial.port.close().catch(() => { });
        this.serial.reset();
    }

    // Serial._loop_reader decodes text, the drone protocol is binary: read raw bytes here.
    async _readLoop() {
        let buffer = new Uint8Array(0);
        try {
            // A read error (framing, parity, overrun) is not fatal: the port gives a new readable, keep reading.
            // Unplugged: readable becomes null. disconnect(): the cancelled read is done.
            while (this.serial.port?.readable) {
                const reader = this.serial.port.readable.getReader();
                this.serial.reader = reader;
                try {
                    while (true) {
                        const { value, done } = await reader.read();
                        if (done) return;
                        const merged = new Uint8Array(buffer.length + value.length);
                        merged.set(buffer);
                        merged.set(value, buffer.length);
                        const { frames, rest } = skykickParse(merged);
                        buffer = rest;
                        frames.forEach(frame => this.listeners.forEach(listener => listener(frame)));
                    }
                } catch (e) {
                    console.warn('SkyKick read error', e);
                } finally {
                    reader.releaseLock();
                }
            }
        } finally {
            this.information = null; // USB unplugged or closed
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = { SKYKICK, skykickCrc16, skykickFrame, skykickParse };
}
