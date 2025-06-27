'use strict';

/**
 * Workspace Serial: Serial
 * Copyright 2020 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide a navigator serial API driver.
 */

/** 
 * @fileoverview WorkSpace Serial 
 * @author: leomlr (Léo Meillier)
 */

/**
 * @class Serial
 */
class Serial {
    /**
     * Creates an instance of Serial.
     * @private
     */
    constructor(baudRate, boardsFilter) {
        this.baudRate = baudRate || 115200;
        this.boardsFilter = boardsFilter || null;
        this.ports = [];
        this.port = null;
        this.reader = null;
        this.readableStreamClosed = null;
        this.writer = null;
        this.dataReceived = null;
        this.isConnected = false;
        this.hasToClose = false;
        this.hasFirmware = true;
        this.isDownloading = false;
        this._dtr = true;
        this._rts = true;
        this.buffer = "";
        this.type = 'serial';
        return this;
    };

    onSerialDisconnect = (event) => {
        const port = event.target;
        for (var i = 0; i < this.ports.length; i++) {
            if (this.ports[i] == port) {
                this.ports.splice(i, 1)
                break;
            }
        }
    };

    onSerialConnect = (event) => {
        this.ports.push(event.target);
    };

    async init() {
        try {
            const ports = await navigator.serial.getPorts();
            if (ports.length) {
                this.ports = ports;
                navigator.serial.addEventListener("connect", this.onSerialConnect);
                navigator.serial.addEventListener("disconnect", this.onSerialDisconnect);
            }
        } catch (e) {
            console.error(e)
        }
    };

    /**
     * Check if the current port detected is same as the registered.
     * @returns {boolean} same
     */
    checkInfos() {
        return this.boardsFilter !== null && this.infos && Object.keys(this.infos).length > 1 &&
            this.infos?.usbProductId == this.boardsFilter.usbProductId &&
            this.infos?.usbVendorId == this.boardsFilter.usbVendorId;
    };

    /**
     * Open serial port by serial API (navigator.serial).
     * @public
     * @return {void}
     */
    async open(callback) {
        await this.init();
        if (this.ports.length === 1 && this.checkInfos()) {
            this.port = this.ports[0];
        } else {
            if (this.boardsFilter !== null) {
                this.port = await navigator.serial.requestPort({
                    filters: this.boardsFilter
                });
            } else {
                this.port = await navigator.serial.requestPort();
            }
        }
        await this.port.open({
            baudRate: this._getBaudrate(),
            buffersize: 1024
        });
        this.isConnected = true;
        if (callback) {
            this.dataReceived = this._loop_reader(callback);
        }
    };
    /**
     * Close serial port from navigator.
     * @public
     * @return {void}
     */
    async close() {
        try { this.reader.cancel(); } catch (e) { };
        await this.readableStreamClosed.catch(() => { });
        await this.port.close();
        this.reset();
    };
    /**
     * Reset serial.
     * @public
     */
    reset() {
        this.reader = null;
        this.readableStreamClosed = null;
        this.writer = null;
        this.dataReceived = null;
        this.port = null;
        this.isConnected = false;
        this.hasToClose = false;
        this.isDownloading = false;
    };
    /**
     * Get the defined baudrate.
     * @returns {int|function}
     */
    _getBaudrate() {
        if (typeof this.baudRate === 'function') {
            return this.baudRate();
        } else {
            return this.baudRate;
        }
    };
    /**
     * Get REPL buffer.
     * @returns {int|function}
     */
    _getBuffer() {
        return this.buffer;
    };
    /**
     * Get informations about board.
     * @public
     * @return {object} {usbProductId, usbVendorId}
     */
    async getInfo() {
        this.infos = await this.port.getInfo();
        return this.infos;
    };
    /**
     * Get serial input signals.
     * @public
     * @return {object} {dataCarrierDetect, clearToSend, ringIndicator, dataSetReady}
     */
    async getSignals() {
        return await this.port.getSignals();
    };
    /**
     * Set output signal Data Terminal Ready (DTR).
     * @public
     * @param {boolean} state
     * @return {void}
     */
    async setDTR(state) {
        await this.port.setSignals({
            dataTerminalReady: state
        });
        this._dtr = state;
    };
    /**
     * Set output signal Request To Send (RTS).
     * @public
     * @param {boolean} state
     * @return {void}
     */
    async setRTS(state) {
        await this.port.setSignals({
            requestToSend: state
        });
        await this.port.setSignals({
            dataTerminalReady: this._dtr
        });
        this._rts = state;
    };
    /**
     * Write buffer to serial port.
     * @public
     * @param {Uint8Array} buffer
     * @return {void}
     */
    async write(buffer) {
        if (this.port !== null) {
            this.writer = this.port.writable.getWriter();
            await this.writer.write(buffer);
            this.writer.releaseLock();
        }
    };
    /**
     * Create generator for reading packet from serial port.
     * @private
     * @yield {string}
     * @return {void}
     */
    async* _loop_reader(callback) {
        while (this.port && this.port.readable !== null && !this.port.readable.locked && !this.hasToClose) {
            const decoder = new TextDecoderStream();
            this.readableStreamClosed = this.port.readable.pipeTo(decoder.writable);
            this.reader = decoder.readable.getReader();
            try {
                while (true) {
                    const { value, done } = await this.reader.read();
                    if (done || !value) {
                        break;
                    }
                    if (value) {
                        this.buffer = value;
                        yield value;
                    }
                }
            } catch (error) {
                error = String(error);
                console.error(error);
                callback(error);
            } finally {
                if (this.reader) {
                    this.reader.releaseLock();
                }
            }
        }
    };
    /**
     * Get next read packet from serial port.
     * @public
     * @return {string}
     * @memberof Serial
     */
    async read() {
        return await this.dataReceived.next();
    };
    /**
     * Waiting function in milliseconds.
     * @public
     * @param {int}
     * @return {Promise}
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    /**
     * Split large string in chunks.
     * @public
     * @param {string} str
     * @param {int} size
     * @return {Array<string>}
     */
    chunk(str, size) {
        const numChunks = Math.ceil(str.length / size);
        const chunks = new Array(numChunks);
        for (var i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substr(o, size);
        }
        return chunks;
    };
};