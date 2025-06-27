'use strict';

/**
 * Workspace WebBLE: WebBLE
 * Copyright 2024 Vittascience.
 * https://vittascience.com/web-ble
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide a Web BLE tool to communicate by bluetooth with peripherals.
 */

/** 
 * @fileoverview WorkSpace WebBLE 
 * @author: leomlr (Léo Meillier)
 */

/**
 * @class WebBLE
 */
class WebBLE {

    static STATUS_CONNECTION_ERROR = -1;
    static STATUS_NOTIFICATIONS_STARTED = 0;
    static STATUS_AUTHENTICATION_FAILED = 1;

    /**
     * Creates an instance of WebBLE.
     * @private
     */
    constructor(services, onConnect, onDisconnect, partial = true) {
        this.type = 'ble';
        // UUID
        this._requestedServices = services || [];
        this._writeUUID = null;
        this._readUUID = null;
        // gatt
        this._bluetoothAPIDetected = false;
        this._bleDevice = null;
        // services
        this._services = Object.create(null);
        this._characteristics = Object.create(null);
        // controller
        this._controller = null;
        this.events = {
            connect: onConnect,
            disconnect: onDisconnect
        };
        this.onGATTdisconnected = (event) => {
            this.events.disconnect();
            this._bleDevice.removeEventListener('gattserverdisconnected', this.onGATTdisconnected);
            this.reset();
        }
    }
    /**
     * Call external logger from InterfaceMonitor and write it.
     * @param {string} text 
     * @param {string} color 
     * @return {void}
     */
    log(text, color, pre, bold) {
        InterfaceMonitor.writeConsole(text, color, pre, bold);
    };
    /**
     * Reset Web BLE parameters.
     * @public
     * @return {void}
     */
    reset() {
        // UUID
        this._writeUUID = null;
        this._readUUID = null;
        // gatt
        this._bleDevice = null;
        // services
        this._services = Object.create(null);
        this._characteristics = Object.create(null);
        // controller
        this._controller = null;
    };
    /**
     * Set TX default characteristic.
     * @param {string} uuid 
     */
    setWriteCharacteristic(uuid) {
        this._writeUUID = uuid;
    };
    /**
     * Set RX default characteristic.
     * @param {string} uuid 
     */
    setReadCharacteristic(uuid) {
        this._readUUID = uuid;
    };
    /**
     * Check if gatt server is connected.
     * @public
     * @returns {boolean}
     */
    gattConnected() {
        return this._bleDevice?.gatt?.connected;
    };
    /**
     * Unpair connected device.
     * @public
     * @return {void}
     */
    unpair() {
        if (this._bleDevice) {
            if (this.gattConnected()) {
                this.log("Unpairing... 🚫");
                this._bleDevice.gatt.disconnect();
            }
            this.reset();
            this.buffer = null;
        }
    };
    /**
     * Start Web BLE tool.
     * @public
     * @return {void}
     */
    async requestDevice() {
        if (!this._bluetoothAPIDetected) {
            // on start, check if bluetooth is available
            if (navigator.bluetooth) {
                this.log("Web Bluetooth API is available. ✅");
                this._bluetoothAPIDetected = true;
            } else {
                this.log("Web Bluetooth API is not available. ❌");
                return;
            }
        }
        if (!this._bleDevice) {
            // Unpair if device already paired
            this.unpair();
            this.log("Requesting Bluetooth Device... 📲", 'neutral');
            const requestContents = {
                optionalServices: this._requestedServices,
                acceptAllDevices: true
            };
            this._bleDevice = await navigator.bluetooth.requestDevice(requestContents);
            if (this._bleDevice) {
                this._bleDevice.addEventListener('gattserverdisconnected', this.onGATTdisconnected);
                // Log device name and ID
                this.log("Device name: " + this._bleDevice.name);
                this.log("Device ID: " + this._bleDevice.id);
            }
        }
    };
    /**
     * Attempt connecting to GATT server.
     * @public
     * @returns {void}
     */
    async connectToGATT() {
        if (!this.gattConnected()) {
            let tries = 0;
            // Get GATT services
            const connectAsync = async () => {
                // Try 5 times to get services from GATT
                for (var i = 0; i < 5; i++) {
                    try {
                        this.log("Connecting to GATT server... 📡", 'neutral');
                        await this._bleDevice.gatt.connect();
                    } catch (e) {
                        console.error(e)
                        tries += 1
                        if (tries < 10) {
                            await connectAsync();
                        }
                    }
                }
            };
            await connectAsync();
            this.events.connect();
        }
    };
    /**
     * Get service and characteristics from defined UUID. 
     * @public
     * @param {string} [uuid=null] [OPTIONAL] By default, function use first uuid defined 
     * in WebBLE object declaration (this._requestedServices)
     * @returns {boolean} state
     */
    async getServiceCharacteristics(uuid = null) {
        if (uuid == null) {
            uuid = this._requestedServices[0];
        }
        if (uuid) {
            if (!this.gattConnected()) {
                await this.connectToGATT();
            }
            if (!this.gattConnected()) {
                return false;
            }
            this._services[uuid] = null;
            this._characteristics[uuid] = null;
            try {
                this._services[uuid] = await this._bleDevice.gatt.getPrimaryService(uuid);
                this._characteristics[uuid] = await this._services[uuid].getCharacteristics();
                this.log("Service: " + uuid + " ; found " + this._characteristics[uuid].length + " characteristic.s")
                return true;
            } catch (e) {
                console.error(e.message);
            }
        }
    };
    /**
     * Get characteristic from services by uuid.
     * @param {string} uuid 
     * @returns {BluetoothRemoteGATTCharacteristic} characteristic
     */
    getCharacteristic(uuid) {
        for (var i in this._characteristics) {
            const serviceCharac = this._characteristics[i];
            if (serviceCharac) {
                for (const characteristic of serviceCharac) {
                    if (characteristic.uuid === uuid) {
                        return characteristic;
                    }
                }
            }
        }
    };
    /**
     * Start reading events on read characteristic.
     * @public
     * @return {void}
     */
    async reading(property, uuid = null) {
        if (uuid === null) {
            uuid = this._readUUID;
        }
        if (uuid) {
            const characteristic = this.getCharacteristic(uuid);
            if (characteristic) {
                switch (property) {
                    case 'value':
                        characteristic.addEventListener('characteristicvaluechanged', (event) => {
                            let data;
                            try {
                                data = new Uint8Array(characteristic.readValue());
                                if (this._controller?._on_parse) {
                                    this._controller._on_parse(data);
                                } else {
                                    this.reader = new TextDecoder().decode(data);
                                    this.log("Received value: " + this.reader);
                                }           
                            } catch (e) {
                                this.log(e.message, 'warning', true, true);
                                if (/Authentication failed/.test(e.message)) {
                                    this.status = WebBLE.STATUS_AUTHENTICATION_FAILED;
                                }
                            }

                        });
                        break;
                    case 'notify':
                    default:
                        let readEvents;
                        try {
                            readEvents = await characteristic.startNotifications();
                            this.log("Notifications started. 📩");
                            this.status = WebBLE.STATUS_NOTIFICATIONS_STARTED;
                            readEvents.addEventListener('characteristicvaluechanged', (event) => {
                                if (this._controller?._on_parse) {
                                    this._controller.isLoopClosed = false;
                                    this._controller._on_parse(new Uint8Array(event.target.value.buffer));
                                } else {
                                    this.reader = new TextDecoder().decode(event.target.value).replace(/\n/g, ' ').replace(/\r/g, '');
                                    this.log("Received value: " + data);
                                }
                               
                            });
                        } catch (e) {
                            this.log(e.message, 'warning', true, true);
                            if (/Authentication failed/.test(e.message)) {
                                this.status = WebBLE.STATUS_AUTHENTICATION_FAILED;
                            }
                        }
                        break;
                }
            } else {
                console.error("[WebBLE] characteristic " + uuid + " not found.");
            }
        }
    };
    /**
     * Read value of characteristic.
     * @public
     * @param {string} [uuid=null] 
     * @returns 
     */
    async read(uuid = null) {
        if (uuid === null) {
            uuid = this._readUUID;
        }
        if (uuid) {
            const characteristic = this.getCharacteristic(uuid);
            if (characteristic) {
                try {
                    return await characteristic.readValue();
                } catch (e) {
                    this.log(e.message, 'warning', true, true);
                    if (/Authentication failed/.test(e.message)) {
                        return WebBLE.AUTHENTICATION_FAILED;
                    }
                }
            } else {
                console.error("[WebBLE] characteristic " + uuid + " not found.");
            }

        }
    };
    /**
     * Send data to write characteristic service.
     * @public
     * @param {Array<uint8_t>} data
     * @param {boolean} [withResponse=true] 
     * @param {null} [uuid=null] 
     * @return {void}
     */
    async write(data, withResponse = true, uuid = null) {
        if (uuid === null) {
            uuid = this._writeUUID;
        }
        if (uuid) {
            const characteristic = this.getCharacteristic(uuid);
            if (characteristic) {
                try {
                    if (withResponse) {
                        await characteristic.writeValue(new Uint8Array(data));
                    } else {
                        await characteristic.writeValueWithoutResponse(new Uint8Array(data));
                    }
                } catch (e) {
                    this.log(e.message, 'warning', true, true);
                    if (/Authentication failed/.test(e.message)) {
                        return WebBLE.AUTHENTICATION_FAILED;
                    }
                }
            } else {
                console.error("[WebBLE] characteristic " + uuid + " not found.");
            }
        }
    };
    /**
     * Split large string in chunks.
     * @public
     * @param {string} str
     * @param {int} size
     * @return {Array<string>}
     */
    static chunk(str, size) {
        const numChunks = Math.ceil([...str].length / size);
        const chunks = new Array(numChunks);
        for (var i = 0; i < numChunks; i++) {
            chunks[i] = [...str].slice(i * size, (i + 1) * size);
        }
        return chunks;
    };

}
