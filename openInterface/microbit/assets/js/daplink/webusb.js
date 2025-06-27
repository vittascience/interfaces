/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
class NullLogging {
    event(event) { }
    error(e) { }
    log(e) { }
}

/**
 * Utility to time out an action after a delay.
 *
 * The action cannot be cancelled; it may still proceed after the timeout.
 */
async function withTimeout(actionPromise, timeout) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error());
        }, timeout);
    });
    // timeoutPromise never resolves so result must be from action
    return Promise.race([actionPromise, timeoutPromise]);
}

const ConnectionStatus = {
    /**
     * Not supported.
     */
    NOT_SUPPORTED: "NOT_SUPPORTED",
    /**
     * Supported but no device available.
     *
     * This will be the case even when a device is physically connected
     * but has not been connected via the browser security UI.
     */
    NO_AUTHORIZED_DEVICE: "NO_DEVICE",
    /**
     * Authorized device available but we haven't connected to it.
     */
    NOT_CONNECTED: "NOT_CONNECTED",
    /**
     * Connected.
     */
    CONNECTED: "CONNECTED"
};

/**
 * Tracks user connection action.
 */
const ConnectionAction = {
    FLASH: "FLASH",
    CONNECT: "CONNECT",
    DISCONNECT: "DISCONNECT"
};

const EVENT_STATUS = "status";
const EVENT_SERIAL_DATA = "serial_data";
const EVENT_SERIAL_RESET = "serial_reset";
const EVENT_SERIAL_ERROR = "serial_error";
const EVENT_FLASH = "flash";
const EVENT_START_USB_SELECT = "start_usb_select";
const EVENT_END_USB_SELECT = "end_usb_select";

class WebUSBError extends Error {
    constructor(code, message) {
      super(message);
      this.code = code;
    }
}

// Temporary workaround for ChromeOS 105 bug.
// See https://bugs.chromium.org/p/chromium/issues/detail?id=1363712&q=usb&can=2
const isChromeOS105 = () => {
    const userAgent = navigator.userAgent;
    return /CrOS/.test(userAgent) && /Chrome\/105\b/.test(userAgent);
};

/**
 * A WebUSB connection to a micro:bit device.
 */

class MicrobitWebUSBConnection {
    //  extends EventEmitter
    constructor(options) {
        this.status = navigator.usb && !isChromeOS105() ? ConnectionStatus.NO_AUTHORIZED_DEVICE : ConnectionStatus.NOT_SUPPORTED;
        this.device = null;
        this.connection = null;
        this.serialReadInProgress = null;
        this.flashing = false;
        this.disconnectAfterFlash = true;
        this.visibilityReconnect = false;
        this.unloading = false;
        options = options ? options : { logging: new NullLogging() }
        this.logging = options.logging;
    }

    log(v) {
        //console.log(v);
    }

    emit(event, data) {
        //console.log(event);
        //console.log(data);
    }

    serialListener(data) {
        this.emit(EVENT_SERIAL_DATA, data);
    }

    visibilityChangeListener() {
        if (document.visibilityState === "visible") {
            if (this.visibilityReconnect && this.status !== ConnectionStatus.CONNECTED) {
                this.disconnectAfterFlash = false;
                this.visibilityReconnect = false;
                if (!this.flashing) {
                    this.log("Reconnecting visible tab");
                    this.connect();
                }
            }
        } else {
            if (!this.unloading && this.status === ConnectionStatus.CONNECTED) {
                if (!this.flashing) {
                    this.log("Disconnecting hidden tab");
                    this.disconnect().then(() => {
                        this.visibilityReconnect = true;
                    });
                } else {
                    this.log("Scheduling disconnect of hidden tab for after flash");
                    this.disconnectAfterFlash = true;
                }
            }
        }
    }

    beforeUnloadListener() {
        // If serial is in progress when the page unloads with V1 DAPLink 0254 or V2 0255
        // then it'll fail to reconnect with mismatched command/response errors.
        // Try hard to disconnect as a workaround.
        // https://github.com/microbit-foundation/python-editor-v3/issues/89
        this.unloading = true;
        this.stopSerialInternal();
        // The user might stay on the page if they have unsaved changes and there's another beforeunload listener.
        window.addEventListener(
            "focus", () => {
                const assumePageIsStayingOpenDelay = 1000;
                setTimeout(() => {
                    if (this.status === ConnectionStatus.CONNECTED) {
                        this.unloading = false;
                        this.startSerialInternal();
                    }
                }, assumePageIsStayingOpenDelay);
            },
            { once: true }
        );
    }

    async initialize() {
        if (navigator.usb) {
            navigator.usb.addEventListener("disconnect", this.handleDisconnect);
        }
        if (typeof window !== "undefined") {
            window.addEventListener("beforeunload", this.beforeUnloadListener);
            if (window.document) {
                window.document.addEventListener(
                    "visibilitychange",
                    this.visibilityChangeListener
                );
            }
        }
    }

    dispose() {
        this.removeAllListeners();
        if (navigator.usb) {
            navigator.usb.removeEventListener("disconnect", this.handleDisconnect);
        }
        if (typeof window !== "undefined") {
            window.removeEventListener("beforeunload", this.beforeUnloadListener);
            if (window.document) {
                window.document.removeEventListener(
                    "visibilitychange",
                    this.visibilityChangeListener
                );
            }
        }
    }

    async connect(options = {}) {
        return this.withEnrichedErrors(async () => {
            await this.connectInternal(options);
            return this.status;
        });
    }

    async flash(fs, options) {
        this.flashing = true;
        try {
            const startTime = new Date().getTime();
            await this.withEnrichedErrors(() =>
                this.flashInternal(fs, options)
            );
            this.emit(EVENT_FLASH);

            const flashTime = new Date().getTime() - startTime;
            this.logging.event({
                type: "WebUSB-time",
                detail: {
                    flashTime,
                },
            });
            this.log("Flash complete");
        } finally {
            this.flashing = false;
        }
    }


    async flashInternal(fs, options) {
        this.log("Stopping serial before flash");
        await this.stopSerialInternal();
        this.log("Reconnecting before flash");
        const reading = false;
        await this.connectInternal({
            serial: reading,
        });
        if (!this.connection) {
            throw new Error("Must be connected now");
        }

        const partial = options.partial;
        const progress = options.progress || (() => { });

        const boardId = this.connection.boardSerialInfo().id;
        const flashing = new PartialFlashing(this.connection, this.logging);
        let wasPartial = false;
        try {
            if (partial) {
                wasPartial = await flashing.flashAsync(boardId, fs, progress);
            } else {
                await flashing.fullFlashAsync(boardId, fs, progress);
            }
        } finally {
            progress(undefined, wasPartial);
            if (this.disconnectAfterFlash) {
                this.log("Disconnecting after flash due to tab visibility");
                //this.disconnectAfterFlash = false;
                await this.disconnect();
                this.visibilityReconnect = true;
            } else {
                // This might not strictly be "reinstating". We should make this
                // behaviour configurable when pulling out a library.
                this.log("Reinstating serial after flash");
                if (this.connection.daplink) {
                    await this.connection.daplink.connect();
                    if (reading) {
                        await this.startSerialInternal();
                    }
                }
            }
        }
    }

    async startSerialInternal() {
        if (!this.connection) {
            // As connecting then starting serial are async we could disconnect between them,
            // so handle this gracefully.
            return;
        }
        if (this.serialReadInProgress) {
            await this.stopSerialInternal();
        }
        // This is async but won't return until we stop serial so we error handle with an event.
        this.serialReadInProgress = this.connection
            .startSerial(this.serialListener)
            .then(() => this.log("Finished listening for serial data"))
            .catch((e) => {
                this.emit(EVENT_SERIAL_ERROR, e);
            });
    }

    async stopSerialInternal() {
        if (this.connection && this.serialReadInProgress) {
            this.connection.stopSerial(this.serialListener);
            await this.serialReadInProgress;
            this.serialReadInProgress = undefined;
            this.emit(EVENT_SERIAL_RESET, {});
        }
    }

    async disconnect() {
        try {
            if (this.connection) {
                await this.stopSerialInternal();
                await this.connection.disconnectAsync();
            }
        } catch (e) {
            this.log("Error during disconnection:\r\n" + e);
            this.logging.event({
                type: "WebUSB-error",
                message: "error-disconnecting",
            });
        } finally {
            this.connection = undefined;
            this.setStatus(ConnectionStatus.NOT_CONNECTED);

            this.log("Disconnection complete");
            this.logging.event({
                type: "WebUSB-info",
                message: "disconnected",
            });
        }
    }

    setStatus(newStatus) {
        this.status = newStatus;
        this.visibilityReconnect = false;
        this.log("Device status " + newStatus);
        this.emit(EVENT_STATUS, this.status);
    }

    async withEnrichedErrors(f) {
        try {
            return await f()
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            }

            // Log error to console for feedback
            this.log("An error occurred whilst attempting to use WebUSB.");
            this.log("Details of the error can be found below, and may be useful when trying to replicate and debug the error.");
            this.log(e);

            // Disconnect from the microbit.
            // Any new connection reallocates all the internals.
            // Use the top-level API so any listeners reflect that we're disconnected.
            await this.disconnect();

            const enriched = enrichedError(e);
            // Sanitise error message, replace all special chars with '-', if last char is '-' remove it
            const errorMessage = e.message ? e.message.replace(/\W+/g, "-").replace(/\W$/, "").toLowerCase() : "";

            this.logging.event({
                type: "WebUSB-error",
                message: e.code + "/" + errorMessage,
            });
            throw enriched;
        }
    }

    serialWrite(data) {
        return this.withEnrichedErrors(async () => {
            if (this.connection) {
                // Using WebUSB/DAPJs we're limited to 64 byte packet size with a two byte header.
                // https://github.com/microbit-foundation/python-editor-v3/issues/215
                const maxSerialWrite = 62;
                let start = 0;
                while (start < data.length) {
                    const end = Math.min(start + maxSerialWrite, data.length);
                    const chunkData = data.slice(start, end);
                    await this.connection.daplink.serialWrite(chunkData);
                    start = end;
                }
            }
        });
    }

    handleDisconnect = (event) => {
        if (event.device === this.device) {
            this.connection = undefined;
            this.device = undefined;
            this.setStatus(ConnectionStatus.NO_AUTHORIZED_DEVICE);
        }
    }

    async clearDevice() {
        await this.disconnect();
        this.device = undefined;
        this.setStatus(ConnectionStatus.NO_AUTHORIZED_DEVICE);
    }

    async connectInternal(options) {
        if (!this.connection) {
            const device = await this.chooseDevice();
            this.connection = new DAPWrapper(device, this.logging);
        }
        await withTimeout(this.connection.reconnectAsync(), 10_000);
        if (options.serial === undefined || options.serial) {
            this.startSerialInternal();
        }
        this.setStatus(ConnectionStatus.CONNECTED);
    }

    async chooseDevice() {
        if (this.device) {
            return this.device;
        }
        this.emit(EVENT_START_USB_SELECT);
        this.device = await navigator.usb.requestDevice({
            filters: [{ vendorId: 0x0d28, productId: 0x0204 }],
        });
        this.emit(EVENT_END_USB_SELECT);
        return this.device;
    }
}

const genericErrorSuggestingReconnect = (e) => {
    return new WebUSBError({
        code: "reconnect-microbit",
        message: e.message,
    });
};

// tslint:disable-next-line: no-any
const enrichedError = function (err) {
    if (err instanceof WebUSBError) {
        return err;
    }
    if (err instanceof TimeoutError) {
        return new WebUSBError({
            code: "timeout-error",
            message: err.message,
        });
    }

    switch (typeof err) {
        case "object":
            // We might get Error objects as Promise rejection arguments
            if (!err.message && err.promise && err.reason) {
                err = err.reason;
            }
            // This comes from DAPjs's WebUSB open.
            if (err.message === "No valid interfaces found.") {
                return new WebUSBError({
                    code: "update-req",
                    message: err.message,
                });
            } else if (err.message === "No device selected.") {
                return new WebUSBError({
                    code: "no-device-selected",
                    message: err.message,
                });
            } else if (err.message === "Unable to claim interface.") {
                return new WebUSBError({
                    code: "clear-connect",
                    message: err.message,
                });
            } else if (err.name === "device-disconnected") {
                return new WebUSBError({
                    code: "device-disconnected",
                    message: err.message,
                });
            } else {
                // Unhandled error. User will need to reconnect their micro:bit
                return genericErrorSuggestingReconnect(err);
            }
        case "string": {
            // Caught a string. Example case: "Flash error" from DAPjs
            return genericErrorSuggestingReconnect(err);
        }
        default: {
            return genericErrorSuggestingReconnect(err);
        }
    }
};
