/*
* Web Bluetooth DFU
* Copyright (c) 2018 Rob Moran
*
* The MIT License (MIT)
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* 2024 - Translated and adapted from Java by Léo Meillier (Vittascience)
*/

const CONTROL_UUID = "8ec90001-f315-4f60-9fb8-838830daea50";
const PACKET_UUID = "8ec90002-f315-4f60-9fb8-838830daea50";
const BUTTON_UUID = "8ec90003-f315-4f60-9fb8-838830daea50";

const LITTLE_ENDIAN = true;
const PACKET_SIZE = 20;

const OPERATIONS = {
    BUTTON_COMMAND: [0x01],
    CREATE_COMMAND: [0x01, 0x01],
    CREATE_DATA: [0x01, 0x02],
    RECEIPT_NOTIFICATIONS: [0x02],
    CACULATE_CHECKSUM: [0x03],
    EXECUTE: [0x04],
    SELECT_COMMAND: [0x06, 0x01],
    SELECT_DATA: [0x06, 0x02],
    RESPONSE: [0x60, 0x20]
};

const RESPONSE = {
    // Invalid code
    0x00: "Invalid opcode",
    // Success
    0x01: "Operation successful",
    // Opcode not supported
    0x02: "Opcode not supported",
    // Invalid parameter
    0x03: "Missing or invalid parameter value",
    // Insufficient resources
    0x04: "Not enough memory for the data object",
    // Invalid object
    0x05: "Data object does not match the firmware and hardware requirements, the signature is wrong, or parsing the command failed",
    // Unsupported type
    0x07: "Not a valid object type for a Create request",
    // Operation not permitted
    0x08: "The state of the DFU process does not allow this operation",
    // Operation failed
    0x0A: "Operation failed",
    // Extended error
    0x0B: "Extended error"
};

const EXTENDED_ERROR = {
    // No error
    0x00: "No extended error code has been set. This error indicates an implementation problem",
    // Invalid error code
    0x01: "Invalid error code. This error code should never be used outside of development",
    // Wrong command format
    0x02: "The format of the command was incorrect",
    // Unknown command
    0x03: "The command was successfully parsed, but it is not supported or unknown",
    // Init command invalid
    0x04: "The init command is invalid. The init packet either has an invalid update type or it is missing required fields for the update type",
    // Firmware version failure
    0x05: "The firmware version is too low. For an application, the version must be greater than the current application. For a bootloader, it must be greater than or equal to the current version",
    // Hardware version failure
    0x06: "The hardware version of the device does not match the required hardware version for the update",
    // Softdevice version failure
    0x07: "The array of supported SoftDevices for the update does not contain the FWID of the current SoftDevice",
    // Signature missing
    0x08: "The init packet does not contain a signature",
    // Wrong hash type
    0x09: "The hash type that is specified by the init packet is not supported by the DFU bootloader",
    // Hash failed
    0x0A: "The hash of the firmware image cannot be calculated",
    // Wrong signature type
    0x0B: "The type of the signature is unknown or not supported by the DFU bootloader",
    // Verification failed
    0x0C: "The hash of the received firmware image does not match the hash in the init packet",
    // Insufficient space
    0x0D: "The available space on the device is insufficient to hold the firmware"
};

// /**
//  * BluetoothLE Scan Filter Init interface
//  */
// interface BluetoothLEScanFilterInit {
//     /**
//      * An array of service UUIDs to filter on
//      */
//     services;

//     /**
//      * The device name to filter on
//      */
//     name;

//     /**
//      * The device name prefix to filter on
//      */
//     namePrefix;
// }

// interface UuidOptions {
//     service;
//     button;
//     control;
//     packet;
// }

/**
 * Secure Device Firmware Update class
 */
class SecureDfuService {

    /**
     * DFU Service unique identifier
     */
    static SERVICE_UUID = 0xFE59;

    /**
     * Log event
     * @event
     */
    static EVENT_LOG = "log";

    /**
     * Progress event
     * @event
     */
    static EVENT_PROGRESS = "progress";

    // static DEFAULT_UUIDS = {
    //     service: SecureDfuService.SERVICE_UUID,
    //     button: BUTTON_UUID,
    //     control: CONTROL_UUID,
    //     packet: PACKET_UUID
    // };

    // notifyFns = {};

    /**
     * Characteristic constructor
     * @param bluetooth A bluetooth instance
     * @param crc32 A CRC32 function
     * @param delay Milliseconds of delay between packets
     */
    constructor(webBLE) {
        this._webBLE = webBLE;
        this._buffer = null;
        this.response = null;
        this._waitingResponse = false;
    }

    log(message) {
        console.log(SecureDfuService.EVENT_LOG, message)
    }

    // progress(bytes) {
    //     console.log(SecureDfuService.EVENT_PROGRESS, bytes)
    // }

    /**
     * Parse data received from micro:bit DFU flash.
     * @public
     * @param {Uint8Array} bytes
     * @returns {void}
     */
    _on_parse(bytes) {
        console.log(bytes)
        this._readerReady = false;
        this._buffer = [...bytes];
        this.log(this._buffer)

        if (OPERATIONS.RESPONSE.indexOf(this._buffer[0]) < 0) {
            throw new Error("Unrecognised control characteristic response notification");
        }

        const operation = this._buffer[1];
        const result = this._buffer[2];
        console.log(operation, result);
        let error = null;

        if (result === 0x01) {
            const data = new DataView(view.buffer, 3);
            //this.notifyFns[operation].resolve(data);
        } else if (result === 0x0B) {
            const code = view.getUint8(3);
            error = `Error: ${EXTENDED_ERROR[code]}`;
        } else {
            error = `Error: ${RESPONSE[result]}`;
        }

        if (error) {
            this.log(`notify: ${error}`);
            //this.notifyFns[operation].reject(error);
        }

        this.response = this._buffer;
        this._waitingResponse = false;
    }

    async sendControl(operation, buffer) {
        let size = operation.length;
        if (buffer) size += buffer.byteLength;

        const value = new Uint8Array(size);
        value.set(operation);

        if (buffer) {
            const data = new Uint8Array(buffer);
            value.set(data, operation.length);
        }
        console.log(value)
        this._waitingResponse = true;
        await this._webBLE.write([...value]);
        console.log("waiting reponse ...")
        await waitFor(_ => this._waitingResponse === false);
        return this.response;
    }

    async transfer(buffer, type, selectType, createType) {

        console.log("buffer: " + buffer)
        console.log("type: " + type + ' | selectType: ' + selectType + ' | createType: ' + createType)
        console.log("transfer()")
        const response = await this.sendControl(selectType);
        console.log(response)
        const maxSize = response.getUint32(0, LITTLE_ENDIAN);
        const offset = response.getUint32(4, LITTLE_ENDIAN);
        const crc = response.getInt32(8, LITTLE_ENDIAN);
        console.log(maxSize, offset, crc)
        if (type === "init" && offset === buffer.byteLength && this.checkCrc(buffer, crc)) {
            this.log("init packet already available, skipping transfer");
            return;
        }

        // this.progress = bytes => {
        //     console.log(SecureDfuService.EVENT_PROGRESS, type, buffer.byteLength, bytes)
        // };
        // this.progress(0);

        return await this.transferObject(buffer, createType, maxSize, offset);
    }

    async transferObject(buffer, createType, maxSize, offset) {
        console.log("transferObject()")
        const start = offset - offset % maxSize;
        const end = Math.min(start + maxSize, buffer.byteLength);

        const view = new DataView(new ArrayBuffer(4));
        view.setUint32(0, end - start, LITTLE_ENDIAN);

        await this.sendControl(createType, view.buffer)
        const data = buffer.slice(start, end);
        await this.transferData(data, start);

        const response = await this.sendControl(OPERATIONS.CACULATE_CHECKSUM);

        const crc = response.getInt32(4, LITTLE_ENDIAN);
        const transferred = response.getUint32(0, LITTLE_ENDIAN);
        const buf = buffer.slice(0, transferred);

        if (this.checkCrc(buf, crc)) {
            this.log(`written ${transferred} bytes`);
            offset = transferred;
            await this.sendControl(OPERATIONS.EXECUTE);
        } else {
            this.log("object failed to validate");
        }
        if (end < buffer.byteLength) {
            return this.transferObject(buffer, createType, maxSize, offset);
        } else {
            this.log("transfer complete");
        }
    }

    async transferData(data, offset, start) {
        console.log("transferData()")
        start = start || 0;
        const end = Math.min(start + PACKET_SIZE, data.byteLength);
        const packet = data.slice(start, end);

        await this._webBLE.write(packet);

        //this.progress(offset + end);

        if (end < data.byteLength) {
            this.transferData(data, offset, end);
        }
    }

    checkCrc(buffer, crc) {
        console.log("checkCrc()")
        if (!this.crc32) {
            this.log("crc32 not found, skipping CRC check");
            return true;
        }

        return crc === this.crc32(new Uint8Array(buffer));
    }

    async transferInit(buffer) {
        console.log("transferInit()")
        return await this.transfer(buffer, "init", OPERATIONS.SELECT_COMMAND, OPERATIONS.CREATE_COMMAND);
    }

    async transferFirmware(buffer) {
        console.log("transferFirmware()")
        return await this.transfer(buffer, "firmware", OPERATIONS.SELECT_DATA, OPERATIONS.CREATE_DATA);
    }

    /**
     * Updates a device
     * @param device The device to switch mode
     * @param init The initialisation packet to send
     * @param firmware The firmware to update
     * @returns Promise containing the device
     */
    async attemptflashDfu(init, firmware) {
        console.log("attemptflashDfu()")
        if (!init || !firmware) {
            return SecureDfuService.STATUS_FLASH_DFU_ERROR;
        }
        try {
            await this.transferInit(init);
            await this.transferFirmware(firmware);
            return SecureDfuService.STATUS_FLASH_DFU_DONE;
        } catch (e) {
            console.error(e);
            return SecureDfuService.STATUS_FLASH_DFU_ERROR;
        }
    }
}


