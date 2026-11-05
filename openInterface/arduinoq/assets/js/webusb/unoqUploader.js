/**
 * Workspace MicropythonRepl: UnoQuploader
 * Copyright 2026 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * The class provides an uploader to transfer a complete project to the Arduino UNO Q board, 
 * notably using Linux commands and webadb.js.
 */

/** 
 * @fileoverview WorkSpace UnoQuploader 
 * @author: leomlr (Léo Meillier)
 */

/**
 * @class UnoQuploader
 */

var fastboot = null;

var xfer_stats_done = 0;
var xfer_stats_time = 0;
const ansi_up = new AnsiUp;

/**
 * 16-bit mono WAV file of the samples (-1 to 1), read by the app with the Python wave module.
 * @param {Float32Array} samples
 * @param {number} rate sample rate in Hz
 * @returns {Blob}
 */
function wavFile(samples, rate) {
    const view = new DataView(new ArrayBuffer(44 + samples.length * 2));
    const text = (offset, string) => [...string].forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0)));
    text(0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    text(8, "WAVEfmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // mono
    view.setUint32(24, rate, true);
    view.setUint32(28, rate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    text(36, "data");
    view.setUint32(40, samples.length * 2, true);
    samples.forEach((sample, i) => view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, sample)) * 0x7FFF, true));
    return new Blob([view.buffer], { type: "audio/wav" });
}
class UnoQuploader {

    constructor(opts) {
        this.options = {
            debug: opts.debug || false,
            onOpen: opts.onOpen || null,
            onClose: opts.onClose || null
        };
        this.is_webapp = false;
        const params = location.search.substring(1).split("&");
        for (const p in params) {
            const pair = params[p].split("=");
            if (pair[0] == "debug" && pair[1] == "yes")
                Adb.Opt.debug = this.options.debug;
            if (pair[0] == "dump" && pair[1] == "yes")
                Adb.Opt.dump = true;
            if (pair[0] == "reuse_key")
                Adb.Opt.reuse_key = (pair[1] == "yes") ? true : (pair[1] == "no") ? false : parseInt(pair[1]);
            if (pair[0] == "webapp")
                this.is_webapp = (pair[1] == "yes");
        }
        this.set_sketch_yaml = (libraries) => `profiles:\n  default:\n    platforms:\n      - platform: arduino:zephyr\n    libraries:\n${libraries}\ndefault_profile: default`;
        this.set_app_yaml = (bricks) => `name: Vittascience\ndescription: Application créée avec Vittascience.\nports: []\nbricks:\n${bricks}\nicon: 🟢`;

        this.adb = null;
        this.webusb = null;
        this.shell = null;
        // Streams showing the app output in the console (followAppOutput)
        this.appOutputShells = new Set();

        this.connected = false;
        this.commandRunning = false;
        this.readingLogs = false;
        this._isPythonWarningBlock = false;
        this._consoleOutputBuffer = "";

        this.APP_PATH = "/home/arduino/ArduinoApps/vittascience-app";
        // Libraries modified by Vittascience (the blocks use their changes): taken from the compilation server, even if in the Arduino index
        this.SERVER_LIBRARIES = ["ChainableLED.h"];
        // Headers of the core and the C library: never asked to the compilation server (some of its libraries embed AVR copies of them)
        this.CORE_HEADERS = /^(Arduino|Arduino_RouterBridge|Wire|SPI|Print|Stream|HardwareSerial|std\w*|string|stdlib|math|ctype|limits|inttypes)\.h$/;
        this.SKETCH_INO = 'sketch.ino';
        this.MAIN_PY = 'main.py';
        this.INDEX_HTML = 'index.html';

        this.state("ready");

        // Board unplugged (or restarted) while connected: shown at once, even when nothing was running
        if (navigator.usb) {
            navigator.usb.addEventListener('disconnect', event => {
                // During the connection the board may restart its USB on purpose (see reopenWebusb)
                if (this.webusb && event.device === this.webusb.device && this.status !== "connecting") {
                    this.unplugged();
                }
            });
        }
    }

    /**
     * The board was unplugged: stop what used it (webcam, microphone, app output) and show the disconnection.
     */
    unplugged() {
        this.stopPcWebcam();
        this.stopPcMicrophone();
        this.appOutputShells.clear();
        this.resetConnectionState();
        this.options.onClose();
        InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.boardUnplugged'), 'warning', false, true);
    }

    // State
    state(status) {
        this.status = status;
    };

    showErrorMessage(msg) {
        InterfaceMonitor.writeConsole(msg, 'warning', true, true);
    };

    checkAppInterface(log) {
        const match = log.match(/Network URL:\s*(http:\/\/[^\s]+)/i);
        if (match) {
            window.open(match[1], '_blank');
        }
    }

    showOutput(output) {
        this.checkAppInterface(output);
        const text = String(output ?? "")
            .replace(/\0/g, "")
            .replace(/\r\n/g, "\n");

        for (const char of text) {
            if (char === "\r") {
                this._flushConsoleOutputBuffer(true);
            } else if (char === "\n") {
                this._flushConsoleOutputBuffer(false);
            } else {
                this._consoleOutputBuffer += char;
            }
        }
    }

    _getConsolePatterns() {
        return {
            appStartingPattern: /^\[Python\]\s*======== App is starting/,
            tracebackStartPattern: /^\[Python\]\s*Traceback \(most recent call last\):/,
            pythonFileLinePattern: /^\[Python\]\s*File\s+"[^"]+",\s+line\s+\d+/,
            pythonIndentedFileLinePattern: /^\[Python\]\s+File\s+"[^"]+",\s+line\s+\d+/,
            pythonExceptionPattern: /^\[Python\]\s*(?:[A-Za-z_][A-Za-z0-9_]*(?:Error|Exception)|KeyboardInterrupt|SystemExit):/,
            pythonSourceLinePattern: /^\[Python\]\s{2,}\S/
        };
    }

    _flushConsoleOutputBuffer(replaceLastLine = false) {

        const {
            appStartingPattern,
            tracebackStartPattern,
            pythonFileLinePattern,
            pythonExceptionPattern,
            pythonSourceLinePattern
        } = this._getConsolePatterns();

        const rawLine = this._consoleOutputBuffer.replace(/\s+$/g, "");
        this._consoleOutputBuffer = "";

        if (!rawLine) {
            return;
        }

        const isAppStarting = appStartingPattern.test(rawLine);
        const isTracebackStart = tracebackStartPattern.test(rawLine);
        const isPythonFileLine = pythonFileLinePattern.test(rawLine);
        const isPythonException = pythonExceptionPattern.test(rawLine);
        const isPythonSourceLine = this._isPythonWarningBlock && pythonSourceLinePattern.test(rawLine);

        if (isAppStarting) {
            this._isPythonWarningBlock = false;
            // "app logs" first gives the logs of the previous runs: only keep the last run
            const monitor = InterfaceMonitor.monitor || document.querySelector("#console");
            monitor?.querySelectorAll('[data-unoq-app-log="true"]').forEach(el => el.remove());
        }

        if (isTracebackStart || isPythonFileLine) {
            this._isPythonWarningBlock = true;
        }

        const type = isAppStarting
            ? "success"
            : this._isPythonWarningBlock || isPythonException || isPythonSourceLine
                ? "warning"
                : "neutral";

        const isBold = isAppStarting || isPythonException;
        const html = ansi_up.ansi_to_html(rawLine);

        if (replaceLastLine) {
            this._replaceLastConsoleLine(html, type, isBold);
        } else {
            this._writeConsoleLine(html, type, isBold);
        }

        if (isPythonException) {
            this._isPythonWarningBlock = false;
        }
    }

    _writeConsoleLine(html, type = "neutral", isBold = false) {
        InterfaceMonitor.writeConsole(html, type, true, isBold);
        if (this._writingAppLog) {
            const monitor = InterfaceMonitor.monitor || document.querySelector("#console");
            if (monitor?.lastElementChild) monitor.lastElementChild.dataset.unoqAppLog = "true";
        }
    }

    _replaceLastConsoleLine(html, type = "neutral", isBold = false) {
        const monitor = InterfaceMonitor.monitor || document.querySelector("#console");

        if (!monitor) {
            this._writeConsoleLine(html, type, isBold);
            return;
        }

        let el = monitor.lastElementChild;

        if (!el || el.dataset.unoqReplaceableLine !== "true") {
            this._writeConsoleLine(html, type, isBold);

            el = monitor.lastElementChild;

            if (el) {
                el.dataset.unoqReplaceableLine = "true";
            }

            return;
        }

        if (el.tagName.toLowerCase() !== "pre") {
            const pre = document.createElement("pre");
            pre.dataset.unoqReplaceableLine = "true";
            monitor.replaceChild(pre, el);
            el = pre;
        }

        const color = InterfaceMonitor.TEXT_COLOR?.[type] || InterfaceMonitor.TEXT_COLOR?.default || "inherit";

        el.style.color = color;
        el.style.fontWeight = isBold ? "bold" : "";
        el.innerHTML = html;

        InterfaceMonitor.scrollToBottom();
    }

    xfer_stats(start_time, done, total) {
        const now = Date.now();

        if (now - xfer_stats_time < 500)
            return;

        if (xfer_stats_done > done)
            xfer_stats_done = 0;
        if (xfer_stats_time < start_time)
            xfer_stats_time = start_time;

        const delta = Math.round((now - start_time) / 1000);
        const instant = Math.round(((done - xfer_stats_done) * 1000) / ((now - xfer_stats_time) * 1024));
        const average = Math.round(done * 1000 / ((now - start_time) * 1024));

        xfer_stats_done = done;
        xfer_stats_time = now;

        let out = "";
        out += Math.round(100 * done / total) + "% (";
        out += Math.round(done / 1024) + " KiB in ~" + delta + " secs at avg " + average + " KiB/s, cur " + instant + " KiB/s)";

        this.showOutput("\r" + out);
    };

    // Actions (same functions as before)
    async disconnect() {
        //console.log("[unoq] disconnect()")
        await this.reset();
        if (this.webusb !== null) {
            try {
                await this.webusb.close();
            } catch (e) {
                console.warn(e)
            }
            this.webusb = null;
        }
        this.options.onClose();
    };

    async reset() {
        //console.log("[unoq] reset()")
        this.stopPcWebcam();
        this.stopPcMicrophone();
        await this.stopAppOutput();
        if (this.shell != null) {
            await this.stopCurrentShell();
        }
        if (this.sync != null)
            try {
                await this.sync.abort();
            } catch (e) {
                console.warn(e);
            }
        this.state("ready");
    };

    async connect() {
        //console.log("[unoq] connect()")
        try {
            if (this.webusb != null) {
                this.state("disconnecting");
                this.disconnect();
                this.state("ready");
                return;
            } else {
                this.state("connecting");
                this.webusb = await Adb.open("WebUSB");
            }

            if (!this.webusb || !(this.webusb.isAdb() || this.webusb.isFastboot())) {
                throw new Error("Could not open either ADB or Fastboot");
            }
        } catch (error) {
            console.error(error);
            this.showErrorMessage(error.message);
            this.state("ready");
            this.webusb = null;
            return;
        }

        if (this.webusb.isFastboot()) {
            try {
                fastboot = null;
                fastboot = await this.webusb.connectFastboot();
                if (fastboot != null) {
                    console.log("FASTBOOT mode");
                    this.state("connected");
                    //this.execute_cmd("getvar:all");
                }
            }
            catch (error) {
                console.error(error);
                this.showErrorMessage(error.message + " " + jsonPath('code.arduinoq.arduinoClaiming'));
                this.state("ready");
                fastboot = null;
                this.webusb.device.close().catch(() => {});
                this.webusb = null;
                return;
            }
        }

        if (this.webusb.isAdb()) {
            try {
                this.adb = null;
                try {
                    this.adb = await this.webusb.connectAdb("host::", () =>
                        this.showErrorMessage("Please check the screen of your " + this.webusb.device.productName + "."));
                } catch (error) {
                    // The USB reset of connectAdb can make the board restart its USB (it disconnects and comes back
                    // at once): the opened device is no longer valid, connect again once to the board that came back
                    if (!/transfer|disconnected/i.test(String(error))) throw error;
                    console.warn("[UNOQ] USB restarted during the connection, new try", error);
                    this.webusb = await this.reopenWebusb(this.webusb.device);
                    this.adb = await this.webusb.connectAdb("host::", () =>
                        this.showErrorMessage("Please check the screen of your " + this.webusb.device.productName + "."));
                }

                if (this.adb != null) {
                    console.log("ADB mode");
                    this.state("connected");
                }
            }
            catch (error) {
                this.showErrorMessage(error.message + " Ensure that the USB port is not in use (i.e. adb server is running). Please, close Arduino App Lab if opened and try the command in command line: adb kill-server");
                this.state("ready");
                this.adb = null;
                this.webusb.device.close().catch(() => {});
                this.webusb = null;
                return;
            }
        }

        let message = "";

        if (this.webusb.isAdb())
            message = "ADB: ";
        if (this.webusb.isFastboot())
            message = "FASTBOOT: ";

        message += this.webusb.device.productName + " (" + this.webusb.device.manufacturerName + ")";
        this.showOutput(message);
        // Only once really connected (connected icon, success message)
        this.options.onOpen();
    };

    /**
     * Open again the board after its USB restarted, without asking the user to choose it (already allowed).
     * @param {USBDevice} previous the device opened before the restart
     * @returns {Promise<Object>} WebUSB transport of the board
     */
    async reopenWebusb(previous) {
        // Closed first: when the board did not really restart, getDevices() gives this same device back
        await previous.close().catch(() => { });
        let lastError = new Error("UNO Q not found after its USB restart");
        // ponytail: polls for ~10 s, the board comes back in about a second
        for (let i = 0; i < 20; i++) {
            await sleep_ms(500);
            const device = (await navigator.usb.getDevices()).find(d =>
                d.vendorId === previous.vendorId && d.productId === previous.productId && d.serialNumber === previous.serialNumber);
            if (!device) continue;
            try {
                if (!device.opened) await device.open();
                return new Adb.WebUSB.Transport(device);
            } catch (error) {
                lastError = error;
            }
        }
        throw lastError;
    }

    // silent: run an internal command without echoing it and its output to the console
    // onData: called with each piece of output received
    async execute(cmd, silent = false, onData = null) {
        //console.log("[unoq] execute()")
        if (!this.webusb || !this.adb) {
            throw new Error("UNO Q is not connected.");
        }

        const decoder = new TextDecoder();
        let output = "";
        let shell = null;

        try {
            const ESC = "\u001b";
            const productName = this.webusb?.device?.productName || "UNO Q";
            let safeCmd = cmd.replace(/^shell:/, "");
            if (/sudo/.test(safeCmd)) {
                safeCmd = safeCmd.replace(/(printf\s+['"]%s\\n['"]\s+["'])(.*?)(["']\s*\|\s*sudo\s+-S)/, '$1********$3');
            }
            const shownCmd = safeCmd
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll("\n", "\\n");
            if (!silent) this.showOutput(`\n${ESC}[1m${ESC}[32m${productName}${ESC}[0m:/$ ${ESC}[1m${shownCmd}${ESC}[0m\n`);

            this.state("running");

            try {
                shell = await this.adb.open(cmd);
            } catch (e) {
                console.error(e)
                if (/(The device was disconnected|A transfer error has occurred)/.test(String(e))) {
                    return await this.disconnect();
                }
            }

            this.shell = shell;

            let r = await shell.receive();

            while (r.cmd === "WRTE" && !this.shouldStopReading && this.shell === shell) {
                if (r.data != null) {
                    let data = decoder.decode(r.data);

                    if (/started successfully/.test(data) && /App/.test(data)) {
                        await sleep_ms(200);
                    }

                    if (!silent) this.showOutput(data);
                    if (onData) onData(data);
                    output += data;
                }



                if (this.shouldStopReading || this.shell !== shell) {
                    break;
                }

                await shell.send("OKAY");

                if (this.shouldStopReading || this.shell !== shell) {
                    break;
                }

                r = await shell.receive();
            }

            if (this.shell === shell) {
                try {
                    await shell.close();
                } catch (e) {
                    console.warn("[UNOQ] shell close ignored", e);
                }

                this.shell = null;
            }

            this.shouldStopReading = false;

            if (this.webusb && this.adb) {
                this.state("connected");
            }

            return output;
        } catch (error) {
            console.error(error)
            const isExpectedStop =
                this.shouldStopReading ||
                error.name === "AbortError" ||
                /cancelled|The transfer was cancelled/i.test(error.message);

            const isUsbTransferError =
                error.name === "NetworkError" ||
                error.name === "NotFoundError" ||
                /transferIn|transferOut|transfer error|device was disconnected|Unable to reset the device/i.test(error.message);

            if (isExpectedStop) {
                console.warn("[UNOQ] shell reading stopped", error);

                if (this.shell === shell) {
                    this.shell = null;
                }

                this.shouldStopReading = false;

                if (this.webusb && this.adb) {
                    this.state("connected");
                } else {
                    this.state("ready");
                }

                return output;
            }

            if (isUsbTransferError) {
                this.resetConnectionState(error);
                this.showErrorMessage("Connexion avec l’Arduino Q interrompue. Reconnecte la carte puis relance l’envoi.");
                this.disconnect();
            }

            this.showErrorMessage(error.message);

            if (this.shell === shell) {
                this.shell = null;
            }

            this.shouldStopReading = false;
            this.state(this.webusb && this.adb ? "connected" : "ready");

            throw error;
        }
    }

    resetConnectionState(error = null) {
        //console.log("[UNOQ] resetConnectionState", error);

        this.shell = null;
        this.sync = null;
        this.adb = null;
        this.webusb = null;
        fastboot = null;

        this.shouldStopReading = false;
        this.state("ready");
    }

    async stopCurrentShell() {
        //console.log("[UNOQ] stopCurrentShell()");
        this.shouldStopReading = true;

        const shell = this.shell;

        if (shell != null) {
            try {
                await shell.close();
            } catch (e) {
                console.warn("[UNOQ] shell close ignored", e);
            }
        }

        await sleep_ms(300);

        if (this.shell === shell) {
            this.shell = null;
        }

        if (this.webusb && this.adb) {
            this.state("connected");
        } else {
            this.state("ready");
        }
    }

    async stat_usb(stat_filename) {
        //console.log("[UNOQ] stat_usb()");
        try {
            if (this.adb != null) {
                this.state("running");

                this.sync = await this.adb.sync();
                let stat = await this.sync.stat(stat_filename);
                this.showOutput(JSON.stringify(stat));

                await this.sync.quit();
                this.sync = null;
                this.state("connected");
            }
        }
        catch (error) {
            this.showErrorMessage(error.message);
            this.state("ready");
            this.webusb = null;
            throw (error);
        }
    };

    async pull_usb(pull_filename) {
        //console.log("[UNOQ] pull_usb()");
        try {
            if (this.adb != null) {
                this.state("running");

                this.sync = await this.adb.sync();
                let content = await this.sync.pull(pull_filename);

                await this.sync.quit();
                this.sync = null;
                this.state("connected");

                let a = document.createElement("a")
                a.href = URL.createObjectURL(new Blob([content]));
                a.download = pull_filename.split("/").pop();
                a.click();
            }
        }
        catch (error) {
            this.showOutput(error.message);
            this.state("connected");
            throw (error);
        }
    };

    async push_usb(push_dest, push_files, push_mode = "0644") {
        //console.log("[UNOQ] push_usb()");
        try {
            if (this.adb != null) {
                this.state("running");
                this.showOutput("\nLoading " + push_files[0].name + "...");

                this.sync = await this.adb.sync();
                let start_time = Date.now();
                await this.sync.push(push_files[0], push_dest, push_mode,
                    (done, total) => this.xfer_stats(start_time, done, total));

                await this.sync.quit();
                this.sync = null;
                this.state("connected");
            }
        }
        catch (error) {
            this.showOutput(error.message);
            this.state("connected");
            throw (error);
        }
    };

    // cleanSketch: compile the sketch again (needed after an upload, see below)
    async startApp(app, followLogs = true, onData = null, cleanSketch = true) {
        //console.log("[UNOQ] startApp()");
        if (!this.webusb || !this.adb) {
            await this.connect();
        }

        const execApp = "sh -lc 'export TMPDIR=/tmp; export HOME=/home/arduino;" +
            " export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH;" +
            // Drop the compiled sketch objects: files are pushed with the computer's time, so if the board clock
            // is ahead, arduino-cli thinks the old objects are up to date and links a stale sketch
            (cleanSketch ? " rm -rf \"/home/arduino/ArduinoApps/" + app + "/.cache/sketch/sketch\";" : "") +
            " arduino-app-cli app start \"/home/arduino/ArduinoApps/" + app + "\"" +
            // Make the app start on boot, so it runs when the board is unplugged from the computer. Also when the start
            // failed: a camera, microphone or speaker is only plugged (USB hub) once the computer is unplugged
            "; arduino-app-cli properties set default \"/home/arduino/ArduinoApps/" + app + "\"'";

        let output = await this.execute("shell:" + execApp, false, onData);
        // Docker sometimes fails to recreate the container of the previous start ("No such container"): a second
        // start works
        if (/No such container/.test(output)) {
            output = await this.execute("shell:" + execApp, false, onData);
        }
        // Started again behind our back between the stop and the start (it would keep running the previous files):
        // stopped and started again once
        if (/App .* Is Running/i.test(output)) {
            await this.execute("shell:arduino-app-cli app stop \"/home/arduino/ArduinoApps/" + app + "\"", true);
            output = await this.execute("shell:" + execApp, false, onData);
        }
        // AI model of a brick not on the board yet (local LLM...): downloaded, then the app started again
        if (/Is Not Installed/i.test(output) && await this.installBrickModel(output)) {
            output = await this.execute("shell:" + execApp, false, onData);
        }

        const errors = this.parseArduinoCompileErrors(output);

        if (errors.length > 0) {
            InterfaceMonitor.writeConsole("\n" + errors.join("\n"), "warning", true, true);
            return false;
        }
        // Other start errors (brick device missing: "[ERROR] No Camera Device Found"...): the app is not running
        // (already shown in the console with the command output)
        if (/^\[ERROR\]/m.test(String(output || ""))) {
            String(output).split(/\r?\n/).filter(line => /^\[ERROR\]/.test(line)).forEach(line => this.explainError(line));
            return false;
        }

        if (followLogs) {
            this.logsPromise = this.getAppLogs(app);
        }

        return true;
    }

    /**
     * Download the AI model of a brick missing on the board ("[ERROR] Model "..." For Brick "..." Is Not Installed"),
     * like App Lab: the CLI of the board (0.13) has no model install command, its daemon does (port 8800).
     * @param {string} output output of the app start
     * @returns {Promise<boolean>} model installed
     */
    async installBrickModel(output) {
        // The CLI changes the case of its messages ("Llamacpp:qwen3.5-0.8B-Q4_0"): the id is found in the model list
        const missing = (String(output).match(/Model "([^"]+)" For Brick/i) || [])[1];
        if (!missing) return false;
        const list = String(await this.execute("shell:curl -s http://127.0.0.1:8800/v1/models", true) || "");
        let id;
        try {
            const models = JSON.parse(list.slice(list.indexOf("{"), list.lastIndexOf("}") + 1)).models || [];
            id = (models.find(model => model.id.toLowerCase() === missing.toLowerCase()) || {}).id;
        } catch (error) {
            console.warn("[UNOQ] model list not read:", list, error);
        }
        if (!id) return false;
        InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.modelDownload') + " " + id, 'warning', false, true);
        // Server-sent events: "progress" with the percentage, "error", then "done"
        let shown = -1;
        const result = String(await this.execute("shell:curl -sN -X PUT http://127.0.0.1:8800/v1/models/" + id, true, data => {
            const values = [...String(data).matchAll(/"progress":\s*([\d.]+)/g)].map(match => Number(match[1]));
            const progress = values.length ? Math.floor(values.pop() / 10) * 10 : -1;
            if (progress > shown) {
                shown = progress;
                InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.modelDownloadProgress') + " " + progress + " %", 'default', false, false);
            }
        }) || "");
        if (/event: ?error/.test(result) || !/event: ?done/.test(result)) {
            console.warn("[UNOQ] model not installed:", result);
            return false;
        }
        return true;
    }

    async getAppLogs(app, repairLogs = true) {
        //console.log("[UNOQ] getAppLogs()");
        if (!this.webusb || !this.adb) {
            await this.connect();
        }
        const cmd =
            `sh -lc 'export HOME=/home/arduino; ` +
            "arduino-app-cli app logs --follow \"/home/arduino/ArduinoApps/" + app + "\"'";

        // Python lines are "[main] ..." in the App Lab logs
        const output = await this.followAppOutput(cmd, line => this.appLogLine(line.replace(/^\[main\] ?/, "[Python] ")), true);

        // Board unplugged while the app ran: Docker left NUL bytes in the container log files and can't read them
        // anymore ("Error grabbing logs: invalid character '\x00'"). Empty them (root) with the app stopped (the
        // running container keeps its log file open: emptied under it, nothing more was shown), then start the app
        // again and follow its logs.
        if (repairLogs && /Error grabbing logs: invalid character/.test(output)) {
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.corruptedLogs'), 'warning', true, true);
            await this.execute("shell:arduino-app-cli app stop \"/home/arduino/ArduinoApps/" + app + "\"", true);
            const repaired = await this.sudo('for c in $(docker ps -aq); do truncate -s 0 "$(docker inspect --format "{{.LogPath}}" $c)"; done');
            // Started again even without the password: the app must not stay stopped
            const started = await this.startApp(app, false, null, false);
            if (repaired !== null && started) {
                return this.getAppLogs(app, false);
            }
        }
        return output;
    }

    /**
     * Explain a frequent error in simple words, under the error in the console (Python errors, missing devices).
     * @param {string} line error line
     */
    explainError(line) {
        // [pattern, translation key]: the first group of the pattern replaces {x} in the explanation
        const HINTS = [
            [/No Camera Device Found/i, 'camera'],
            [/No Microphone Device Found/i, 'microphone'],
            [/No Speaker Device Found/i, 'speaker'],
            [/ModuleNotFoundError: No module named '([^']+)'/, 'module'],
            [/NameError: name '([^']+)' is not defined/, 'name'],
            [/TypeError: (can only concatenate str|unsupported operand type\(s\) for \+: '(int|float)' and 'str'|must be str, not)/, 'textNumber'],
            [/ValueError: (invalid literal for int|could not convert string to float)/, 'convert'],
            [/ZeroDivisionError/, 'zeroDivision'],
            [/IndexError: list index out of range/, 'index'],
            [/KeyError: (.+)$/, 'key'],
            [/Temporary failure in name resolution|Name or service not known|Network is unreachable|No route to host|ConnectionRefusedError|Max retries exceeded/, 'network'],
            [/TimeoutError|timed out/i, 'timeout'],
            [/RecursionError/, 'recursion'],
            [/PermissionError/, 'permission'],
            [/FileNotFoundError: .*'([^']+)'/, 'file'],
        ];
        const hint = HINTS.find(([pattern]) => pattern.test(line));
        // Once per error kind every 30 s: an error repeated in a loop does not fill the console
        if (!hint || (this.lastHint === hint[1] && Date.now() - this.lastHintTime < 30000)) return;
        this.lastHint = hint[1];
        this.lastHintTime = Date.now();
        const text = jsonPath('code.arduinoq.hints.' + hint[1]);
        if (!text) return;
        const value = (line.match(hint[0])[1] || "").replace(/[<>&]/g, "");
        InterfaceMonitor.writeConsole("💡 " + text.replace("{x}", value), 'warning', false, false);
    }

    /**
     * QR code of the web page of the app under its address, to open it on a phone (jquery-qrcode of the site, loaded
     * the first time).
     * @param {string} url
     */
    async showQrCode(url) {
        try {
            if (!$.fn.qrcode) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src = "/public/js/lib/jquery-qrcode-master/jquery.qrcode.min.js";
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
            const id = "unoq-qrcode-" + Date.now();
            // White margin around the code: readable by the phones on a dark console
            InterfaceMonitor.writeConsole(`<div id="${id}" style="display:inline-block;padding:8px;background:#fff;line-height:0"></div>`, 'default', false, false, true);
            $("#" + id).qrcode({ width: 140, height: 140, text: url });
        } catch (error) {
            console.warn("[UNOQ] QR code not shown", error);
        }
    }

    /**
     * Line of the Python output. The sound blocks of the computer print "[vitta:say] text" and
     * "[vitta:tone] frequency duration" (FUNCTIONS_ARDUINO_Q.py.DEF_SAY_ON_COMPUTER...): the browser speaks or plays
     * them, and the console shows them shortly.
     * @param {string} line
     * @returns {string} line to show
     */
    appLogLine(line) {
        // Explanation for the pupils under the frequent errors (shown after the error line itself)
        // (also the network errors printed by the blocks: "[météo] ... <urlopen error ...>")
        if (/^\[Python\] [\w.]*(Error|Exception)\b|urlopen error|Temporary failure in name resolution/.test(line)) {
            Promise.resolve().then(() => this.explainError(line));
        }
        // Information logs of the bricks ("2026-10-29 11:49:17.636 INFO - [MainThread] LargeLanguageModel: ...") and
        // the model configuration printed by App Lab (arduino/app_internal/core/module.py): hidden, errors are kept.
        // ponytail: texts of App Lab, to update if Arduino changes them
        if (/^\[Python\] \d{4}-\d\d-\d\d \d\d:\d\d:\d\d[.,]\d+ (INFO|DEBUG) /.test(line) ||
            /^\[Python\] (Found brick entry for|Found 'model_by_boards' in|Looking for model configuration for|Found matching board entry for|Found model configuration in) /.test(line)) {
            return "";
        }
        const sound = line.match(/^\[Python\] \[vitta:(say|tone)\] (.*)$/);
        if (!sound) return line;
        if (sound[1] === 'say') {
            const utterance = new SpeechSynthesisUtterance(sound[2]);
            utterance.lang = document.documentElement.lang || navigator.language;
            speechSynthesis.speak(utterance);
            return "[Python] 🔊 " + sound[2];
        }
        const [frequency, duration] = sound[2].split(' ').map(Number);
        this.toneContext = this.toneContext || new AudioContext();
        this.toneContext.resume().catch(() => { });
        const oscillator = this.toneContext.createOscillator();
        oscillator.frequency.value = frequency;
        // A full scale sine is loud in headphones
        const volume = this.toneContext.createGain();
        volume.gain.value = 0.3;
        oscillator.connect(volume).connect(this.toneContext.destination);
        oscillator.start();
        oscillator.stop(this.toneContext.currentTime + duration);
        return "";
    }

    /**
     * Show the output of a board command in the console line by line, next to the other board accesses (own ADB
     * stream), until the command ends or stopAppOutput() is called.
     * @param {string} cmd
     * @param {function(string): string} formatLine adds the source of the line ([Arduino], [Python])
     * @param {boolean} isAppLog lines of "app logs", removed when it gives the start of a new run
     * @returns {Promise<string>} whole output
     */
    async followAppOutput(cmd, formatLine, isAppLog = false) {
        const decoder = new TextDecoder();
        let output = "";
        let line = "";
        const show = text => {
            text = formatLine(text.replace(/\r$/, ""));
            // Skip the empty lines (e.g. "[Python]" alone)
            if (!text.replace(/^\[\w+\]/, "").trim()) return;
            this._writingAppLog = isAppLog;
            this.showOutput(text + "\n");
            this._writingAppLog = false;
        };

        let shell;
        try {
            shell = await this.adb.open("shell:" + cmd);
        } catch (error) {
            console.warn("[UNOQ] app output not available", error);
            return output;
        }
        this.appOutputShells.add(shell);
        try {
            let r = await shell.receive();
            while (r.cmd === "WRTE") {
                const data = decoder.decode(r.data, { stream: true });
                output += data;
                const lines = (line + data).split("\n");
                line = lines.pop();
                lines.forEach(show);
                await shell.send("OKAY");
                r = await shell.receive();
            }
            show(line);
        } catch (error) {
            console.warn("[UNOQ] app output stopped", error);
        } finally {
            this.appOutputShells.delete(shell);
            try {
                await shell.close();
            } catch (e) { }
        }
        return output;
    }

    /**
     * Stop showing the app output in the console.
     */
    async stopAppOutput() {
        for (const shell of this.appOutputShells) {
            try {
                await shell.close();
            } catch (e) { }
        }
        this.appOutputShells.clear();
    }

    /**
     * Quote a value for the board shell (single quotes: no $, ` or \ expansion)
     * @param {string} value
     * @returns {string}
     */
    static shellQuote(value) {
        return "'" + String(value).replace(/'/g, "'\\''") + "'";
    }

    /**
     * Run a command as root, the board password is asked to the user
     * @param {string} cmd
     * @param {boolean} silent - don't show the command (e.g. it contains a secret) and its output in the console
     * @returns {Promise<string|null>} output, null if the user cancelled
     */
    async sudo(cmd, silent = false) {
        while (true) {
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.passwordRequired'), 'neutral', true, true);
            const password = await this.askArduinoQPassword();

            if (password === null) {
                InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.transfertAborted'), 'warning');
                return null;
            }

            const output = await this.execute(
                `shell:printf '%s\\n' ${UnoQuploader.shellQuote(password)} | sudo -S -p "" sh -lc ${UnoQuploader.shellQuote(cmd)}`,
                silent
            );

            if (/incorrect password attempt/i.test(output)) {
                InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.incorrectPassword'), 'warning', true, true);
                continue;
            }

            return output;
        }
    }

    async loadCaddy() {
        if (!this.webusb || !this.adb) {
            await this.connect();
        }
        await this.sudo("apt update");
        await this.sudo("apt install -y caddy");

        // Récupérer IP et nettoyer
        let ip = await this.execute(`shell:ip -4 addr show wlan0 | awk '/inet /{print $2}' | cut -d/ -f1 | head -n1`);
        ip = String(ip).trim();

        console.log("Detected IP:", ip);

        const ipRe = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
        if (!ipRe.test(ip)) return;

        // Écrire le Caddyfile sans surprises
        const caddyfile = `https://${ip} {\n    tls internal\n    reverse_proxy 127.0.0.1:7000\n}`;

        await this.sudo(`cat > /etc/caddy/Caddyfile <<'EOF'\n${caddyfile}\nEOF`);
        await this.sudo("systemctl restart caddy");
    }

    askArduinoQPassword() {
        return new Promise(resolve => {
            pseudoModal.openModal('modal-arduino-q-password');

            setTimeout(() => {
                const input = document.getElementById('arduino-q-password-input');
                const confirmButton = document.getElementById('arduino-q-password-confirm');
                const closeButton = document.getElementById('arduino-q-password-close');

                if (!input || !confirmButton || !closeButton) {
                    resolve(null);
                    return;
                }

                input.value = '';
                // The modal is reused: always reopen with the password hidden
                input.type = 'password';
                const toggleButton = document.getElementById('arduino-q-password-toggle');
                if (toggleButton) {
                    toggleButton.setAttribute('aria-pressed', 'false');
                    toggleButton.firstElementChild.className = 'fa fa-fw fa-eye';
                }
                input.focus();

                const close = value => {
                    confirmButton.removeEventListener('click', onConfirm);
                    closeButton.removeEventListener('click', onClose);
                    input.removeEventListener('keydown', onKeydown);
                    pseudoModal.closeModal('modal-arduino-q-password');
                    resolve(value);
                };

                const onConfirm = () => close(input.value);
                const onClose = () => close(null);

                const onKeydown = event => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        close(input.value);
                    } else if (event.key === 'Escape') {
                        event.preventDefault();
                        close(null);
                    }
                };

                confirmButton.addEventListener('click', onConfirm);
                closeButton.addEventListener('click', onClose);
                input.addEventListener('keydown', onKeydown);
            }, 0);
        });
    };

    async sendUnoQ() {
        this.stopPcWebcam();
        this.stopPcMicrophone();
        await this.stopAppOutput();
        this._isPythonWarningBlock = false;
        this._consoleOutputBuffer = "";
        if (this.shell != null) {
            await this.stopCurrentShell();
        }
        if (!this.webusb || !this.adb) {
            await this.connect();
        }
        if (this.status !== "connected") {
            InterfaceMonitor.writeConsole("Unable to send Arduino Q App.");
            this.disconnect();
            return;
        }
        InterfaceConnection.progressBar._displayProgressBar();
        await this.execute("shell:arduino-app-cli app new \"vittascience-app\"");

        // The Python packages of the app (tensorflow...) are installed by App Lab in the app container from
        // python/requirements.txt (buildAppFiles): nothing to install on the board system, no sudo password

        const projectFiles = CodeManager.getSharedInstance().getCodeFiles();

        const sketchCode = projectFiles[this.SKETCH_INO];
        const pyCode = projectFiles[this.MAIN_PY];
        const htlmCode = projectFiles[this.INDEX_HTML];

        // Same files as the downloaded project zip (buildAppFiles)
        let appFiles;
        try {
            appFiles = await this.buildAppFiles(projectFiles);
        } catch (error) {
            InterfaceMonitor.writeConsole(error.message, 'warning', false, true);
            return;
        }
        const progress = InterfaceConnection.progressBar._updateProgressBar;
        // Everything in sketch/src is compiled: libraries of a previous upload are removed
        await this.execute("shell:rm -rf \"" + this.APP_PATH + "/sketch/src\"", true);
        for (const [i, [path, file]] of appFiles.entries()) {
            await this.push_usb(this.APP_PATH + "/" + path, [file]);
            await sleep_ms(500);
            progress(Math.round((i + 1) / appFiles.length * 60));
        }
        // Files found empty on the board after some uploads: check the sizes, send the wrong files again once
        for (let attempt = 0; ; attempt++) {
            const wrong = await this.wrongSizeFiles(appFiles);
            if (wrong.length === 0) break;
            console.warn("[UNOQ] files with a wrong size on the board:", wrong.map(([path]) => path));
            if (attempt === 1) {
                InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.uploadIncomplete') + wrong.map(([path]) => path).join(", "), 'warning', true, true);
                return;
            }
            for (const [path, file] of wrong) {
                await this.push_usb(this.APP_PATH + "/" + path, [file]);
            }
        }
        // Pushed files keep the computer's time: with the board time, they are always newer than the compiled objects,
        // so any app start (by hand, App Lab) compiles the new sketch
        await this.execute("shell:find \"" + this.APP_PATH + "/sketch\" -type f -exec touch {} +", true);
        // Written to the flash memory now: the board is often unplugged right after the upload (to plug a USB hub
        // and a camera...), and files not written yet are found empty after the restart
        await this.execute("shell:sync", true);

        await this.restartApp(sketchCode, pyCode, htlmCode);
    };

    /**
     * Files whose size on the board differs from the one sent.
     * @param {Array<[string, File]>} appFiles
     * @returns {Promise<Array<[string, File]>>}
     */
    async wrongSizeFiles(appFiles) {
        const paths = appFiles.map(([path]) => '"' + this.APP_PATH + "/" + path + '"').join(" ");
        const output = String(await this.execute("shell:stat -c '%s %n' " + paths + " 2>&1", true) || "");
        const sizes = {};
        for (const match of output.matchAll(/^(\d+) (.+)$/gm)) {
            sizes[match[2].trim()] = Number(match[1]);
        }
        return appFiles.filter(([path, file]) => sizes[this.APP_PATH + "/" + path] !== file.size);
    }

    /**
     * [Button] Start again the app already on the board (last upload), without sending the project.
     */
    async launchApp() {
        if (this.shell != null) {
            await this.stopCurrentShell();
        }
        if (!this.webusb || !this.adb) {
            await this.connect();
        }
        if (this.status !== "connected") {
            return;
        }
        // Already running (its container is up): nothing to do, its console output and webcam keep going
        const running = await this.execute("shell:docker ps -q --filter name=vittascience-app-main", true);
        if (String(running ?? "").trim()) {
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.appAlreadyRunning'), 'success', false, true);
            return;
        }
        this.stopPcWebcam();
        this.stopPcMicrophone();
        await this.stopAppOutput();
        this._isPythonWarningBlock = false;
        this._consoleOutputBuffer = "";
        // Code of the app on the board, it may differ from the project in the editor
        const read = async path => String(await this.execute(`shell:cat "${this.APP_PATH}/${path}" 2>/dev/null`, true) ?? "");
        const sketchCode = await read("sketch/" + this.SKETCH_INO);
        const pyCode = await read("python/" + this.MAIN_PY);
        const htlmCode = await read("assets/" + this.INDEX_HTML);
        if (!sketchCode.trim() && !pyCode.trim()) {
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.noAppOnBoard'), 'warning', false, true);
            return;
        }
        // No progress bar, the console shows the start
        await this.restartApp(sketchCode, pyCode, htlmCode, false);
    }

    /**
     * Start the app of the board, then show its output in the console.
     * @param {string} sketchCode @param {string} pyCode @param {string} htlmCode code of the app, to know what to show
     * @param {boolean} afterUpload new files sent: stop the previous app and compile the sketch again
     */
    async restartApp(sketchCode, pyCode, htlmCode, afterUpload = true) {
        const progress = InterfaceConnection.progressBar._updateProgressBar;
        if (afterUpload) {
            await this.stopApp("vittascience-app");
        }
        progress(70);
        // AI apps: the first start installs the Python packages (tensorflow...) and converts the model
        if (afterUpload && /vitta_tf/.test(pyCode)) {
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.aiAppStartMayTakeTime'), 'warning', false, true);
        }

        // await this.execute(
        //     'shell:arduino-app-cli app clean-cache "/home/arduino/ArduinoApps/vittascience-app"'
        // );

        // ponytail: the compile and app start give no percentage, so the bar moves on with each output received,
        // slower and slower towards 99% (never reached before the app has started)
        let startProgress = 80;
        progress(startProgress);
        const started = await this.startApp("vittascience-app", false, () => {
            startProgress += (99 - startProgress) * 0.05;
            progress(Math.floor(startProgress));
        }, afterUpload);
        progress(100);

        // Give the address of the app web page served by the WebUI brick (port 7000).
        // The source address of the default route is the board LAN IP (not the containers' bridge one).
        if (started && (htlmCode || /WebUI\(\)/.test(pyCode))) {
            const routeOutput = await this.execute("shell:ip -4 route get 1.1.1.1", true);
            // `ip` colors its output with ANSI codes (e.g. "src \x1b[35m192.168..."): strip them first
            const ip = (String(routeOutput).replace(/\x1b\[[0-9;]*m/g, '').match(/\bsrc (\d+\.\d+\.\d+\.\d+)/) || [])[1];
            if (!ip) {
                console.warn("[UNOQ] board IP not found in:", routeOutput);
            } else {
                const url = `http://${ip}:7000`;
                // Program with only the web console (bricks_webui_console): its index.html just leads to the console
                if (htlmCode) {
                    InterfaceMonitor.writeConsole(`${jsonPath('code.arduinoq.webAppUrl')} <a href="${url}" target="_blank" rel="noopener">${url}</a>`, 'success', false, true);
                    await this.showQrCode(url);
                }
                if (/def web_terminal_start\(/.test(pyCode)) {
                    const consoleUrl = url + "/console";
                    InterfaceMonitor.writeConsole(`${jsonPath('code.arduinoq.webConsoleUrl')} <a href="${consoleUrl}" target="_blank" rel="noopener">${consoleUrl}</a>`, 'success', false, true);
                    await this.showQrCode(consoleUrl);
                } else if (!htlmCode) {
                    InterfaceMonitor.writeConsole(`${jsonPath('code.arduinoq.webAppUrl')} <a href="${url}" target="_blank" rel="noopener">${url}</a>`, 'success', false, true);
                    await this.showQrCode(url);
                }
            }
        }

        // Show the sketch console (Serial is renamed to Monitor on the UNO Q) and the Python output (print, errors)
        // live, side by side
        if (started && /\bMonitor\./.test(sketchCode)) {
            this.followAppOutput("sh -lc 'export HOME=/home/arduino; arduino-app-cli monitor'", line => "[Arduino] " + line);
        }
        if (started && pyCode.trim()) {
            this.logsPromise = this.getAppLogs("vittascience-app");
        }

        if (started && /capture_pc_webcam_image\(/.test(pyCode)) {
            this.startPcWebcam();
        }
        if (started && /capture_pc_microphone_sound\(/.test(pyCode)) {
            this.startPcMicrophone();
        }
    };

    /**
     * Send the computer webcam image to the running app (python/pc_webcam.jpg, read by capture_pc_webcam_image)
     * until the app is stopped or the board unplugged. The images go through their own ADB stream, next to the
     * console one.
     */
    async startPcWebcam() {
        this.stopPcWebcam();
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
        } catch (error) {
            console.warn("[UNOQ] computer webcam not available", error);
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.pcWebcamDenied'), 'warning', false, true);
            return;
        }
        const webcam = { stream };
        this.pcWebcam = webcam;
        InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.pcWebcamStarted'), 'success', false, true);

        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.srcObject = stream;
        // A webcam already used by another tab (e.g. the AI tool preview) may never give a frame, without error
        const playing = await Promise.race([video.play().then(() => true, () => false), sleep_ms(10000).then(() => false)]);
        if (!playing || !video.videoWidth) {
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.pcWebcamBusy'), 'warning', false, true);
            this.stopPcWebcam(webcam);
            return;
        }
        const canvas = document.createElement('canvas');

        // One ADB sync session for all the images: a session per image (3 per second) made adbd fail after a while
        // ponytail: one image after the other (about 3 per second over ADB), enough for a classification
        let sync = null;
        try {
            sync = await this.adb.sync();
            while (this.pcWebcam === webcam && this.isConnected()) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                const image = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8));
                await sync.push(image, this.APP_PATH + "/python/pc_webcam.jpg", "0644");
                await sleep_ms(100);
            }
        } catch (error) {
            console.warn("[UNOQ] computer webcam image not sent", error);
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.pcWebcamStopped'), 'warning', false, true);
        } finally {
            if (sync && this.isConnected()) {
                await sync.quit().catch(() => sync.close()).catch(() => { });
            }
        }
        this.stopPcWebcam(webcam);
    }

    /**
     * Stop sending the computer webcam image and release the camera.
     * @param {Object} [webcam] only stop this capture (it may already have been replaced by a new one)
     */
    stopPcWebcam(webcam = this.pcWebcam) {
        if (!webcam) return;
        webcam.stream.getTracks().forEach(track => track.stop());
        if (this.pcWebcam === webcam) {
            this.pcWebcam = null;
        }
    }

    /**
     * Send the computer microphone sound to the running app (python/pc_microphone.wav, its last second, read by
     * capture_pc_microphone_sound) until the app is stopped or the board unplugged, like the webcam image.
     */
    async startPcMicrophone() {
        this.stopPcMicrophone();
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        } catch (error) {
            console.warn("[UNOQ] computer microphone not available", error);
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.pcMicrophoneDenied'), 'warning', false, true);
            return;
        }
        const audioContext = new AudioContext();
        const microphone = { stream, audioContext };
        this.pcMicrophone = microphone;
        InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.pcMicrophoneStarted'), 'success', false, true);

        // Last second of sound, at the rate of the computer (resampled to 44.1 kHz by the board): the spectrogram
        // of the AI tool sound models takes 44 x 1024 samples at 44.1 kHz
        const samples = new Float32Array(Math.ceil(audioContext.sampleRate * 1.05));
        // ponytail: ScriptProcessorNode is deprecated but needs no worklet file, move to an AudioWorklet if browsers drop it
        const processor = audioContext.createScriptProcessor(4096, 1, 1);
        processor.onaudioprocess = event => {
            const input = event.inputBuffer.getChannelData(0);
            samples.copyWithin(0, input.length);
            samples.set(input, samples.length - input.length);
        };
        audioContext.createMediaStreamSource(stream).connect(processor);
        processor.connect(audioContext.destination);
        await audioContext.resume().catch(() => { });

        // One ADB sync session for all the sounds, like the webcam images
        let sync = null;
        try {
            sync = await this.adb.sync();
            while (this.pcMicrophone === microphone && this.isConnected()) {
                await sync.push(wavFile(samples, audioContext.sampleRate), this.APP_PATH + "/python/pc_microphone.wav", "0644");
                await sleep_ms(250);
            }
        } catch (error) {
            console.warn("[UNOQ] computer microphone sound not sent", error);
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.pcMicrophoneStopped'), 'warning', false, true);
        } finally {
            if (sync && this.isConnected()) {
                await sync.quit().catch(() => sync.close()).catch(() => { });
            }
        }
        this.stopPcMicrophone(microphone);
    }

    /**
     * Stop sending the computer microphone sound and release the microphone.
     * @param {Object} [microphone] only stop this capture (it may already have been replaced by a new one)
     */
    stopPcMicrophone(microphone = this.pcMicrophone) {
        if (!microphone) return;
        microphone.stream.getTracks().forEach(track => track.stop());
        microphone.audioContext.close().catch(() => { });
        if (this.pcMicrophone === microphone) {
            this.pcMicrophone = null;
        }
    }

    /**
     * Files of the Arduino App Lab app (paths relative to the app folder), pushed to the board on upload and
     * zipped by the "Download" button.
     * @param {Object} projectFiles generated files: sketch.ino, main.py, index.html
     * @returns {Promise<Array<[string, File]>>}
     */
    async buildAppFiles(projectFiles) {
        let sketchCode = projectFiles[this.SKETCH_INO] || "";
        const pyCode = projectFiles[this.MAIN_PY] || "";
        const htlmCode = projectFiles[this.INDEX_HTML] || "";
        const text = (content, name) => new File([content], name, { type: "text/plain" });
        const files = [];

        // Same LCD library as the R3/R4 compilation
        sketchCode = sketchCode.replace(/rgb_lcd(?!_v2)/g, "rgb_lcd_v2");
        // Program without Arduino blocks (Python only): the sketch is still compiled, and without setup() and loop()
        // the link fails ("undefined reference to `setup'")
        if (!/\bvoid\s+setup\s*\(/.test(sketchCode)) sketchCode = sketchCode.trimEnd() + "\n\nvoid setup() {\n}\n";
        if (!/\bvoid\s+loop\s*\(/.test(sketchCode)) sketchCode = sketchCode.trimEnd() + "\n\nvoid loop() {\n}\n";
        // Libraries the board can't install from the Arduino index: their sources come from the compilation server,
        // sent in sketch/src and compiled with the sketch
        const serverHeaders = [];
        for (const dependency of this.readLibrariesFromIno(sketchCode)) {
            if (this.CORE_HEADERS.test(dependency.header)) continue;
            const inIndex = await this.getLatestArduinoLibraryVersion(dependency).catch(() => null);
            if (!inIndex || this.SERVER_LIBRARIES.includes(dependency.header)) serverHeaders.push(dependency.header);
        }
        let server = { libraries: [], indexLibraries: [] };
        if (serverHeaders.length) {
            try {
                server = await this.getServerLibraries(serverHeaders);
            } catch (e) {
                // Not blocking: the compilation on the board tells which header is missing
                console.warn("[UNOQ] libraries not received from the compilation server:", serverHeaders, e);
            }
        }
        // Header (path in its library) -> path in the sketch folder
        const served = {};
        const servedPaths = new Set();
        for (const library of server.libraries) {
            for (const { path } of library.files) {
                servedPaths.add(`src/${library.folder}/${path}`);
                if (/\.(h|hh|hpp)$/.test(path) && !this.CORE_HEADERS.test(path)) served[path] ??= `src/${library.folder}/${path}`;
            }
        }
        const relative = (dir, to) => {
            const a = dir.split("/").filter(Boolean), b = to.split("/");
            while (a.length && a[0] === b[0]) { a.shift(); b.shift(); }
            return "../".repeat(a.length) + b.join("/");
        };
        // Includes of the served libraries (between <>, or from another library) -> path relative to the file
        const rewriteIncludes = (code, dir) => code.replace(/^(\s*#\s*include\s*)([<"])([^>"]+)[>"]/gm, (line, start, quote, header) =>
            served[header] && !(quote === '"' && servedPaths.has(dir + "/" + header)) ? `${start}"${relative(dir, served[header])}"` : line);
        let librariesCode = "";
        for (const library of server.libraries) {
            for (const { path, content, encoding } of library.files) {
                const name = path.split("/").pop();
                const dir = `src/${library.folder}/${path}`.split("/").slice(0, -1).join("/");
                if (encoding === "base64") {
                    files.push([`sketch/src/${library.folder}/${path}`, new File([Uint8Array.from(atob(content), c => c.charCodeAt(0))], name)]);
                    continue;
                }
                const code = rewriteIncludes(content, dir);
                files.push([`sketch/src/${library.folder}/${path}`, text(code, name)]);
                librariesCode += code + "\n";
            }
        }
        sketchCode = rewriteIncludes(sketchCode, "");

        let yamlCode = "";
        // The sketch profile only installs the listed libraries: the dependencies of the libraries are listed too
        const dependencies = this.readLibrariesFromIno(sketchCode + "\n" + librariesCode)
            .filter(({ header }) => !header.startsWith("src/") && !header.startsWith("../") && !served[header])
            .concat(server.indexLibraries || []);
        const listed = new Set();
        for (let i = 0; i < dependencies.length; i++) {
            const dependency = dependencies[i];
            try {
                const latest = await this.getLatestArduinoLibraryVersion(dependency);
                if (latest && !listed.has(latest.name)) {
                    listed.add(latest.name);
                    yamlCode += `      - ${latest.name} (${latest.version})\n`;
                    dependencies.push(...latest.dependencies.map(name => ({ header: "", name })));
                }
            } catch (e) {
                console.warn("[UNOQ] library not added to sketch.yaml:", dependency.header || dependency.name, e);
            }
        }
        files.push(["sketch/sketch.yaml", text(this.set_sketch_yaml(yamlCode), "sketch.yaml")]);
        files.push(["sketch/" + this.SKETCH_INO, text(sketchCode, this.SKETCH_INO)]);

        let appYamlCode = "";
        // Python module of the brick -> its App Lab id, when they differ
        const BRICK_IDS = { video_objectdetection: "video_object_detection" };
        // MQTT: client only, hidden brick of App Lab (not in app.yaml, paho-mqtt in requirements.txt)
        for (const brick of this.extractAppBricks(pyCode).filter(brick => brick !== "mqtt")) {
            const id = BRICK_IDS[brick] || brick;
            // The Telegram bot token (bloc "start the Telegram bot") is also the variable of the brick
            const token = brick === "telegram_bot" ? (pyCode.match(/telegram_start\((["'])([\w:-]*)\1\)/) || [])[2] : null;
            // Model of the local LLM chosen by the block "local AI model" (else the default model of the board)
            const model = brick === "llm" ? (pyCode.match(/local_llm_set\(model='([\w:.-]+)'\)/) || [])[1] : null;
            appYamlCode += token ? `- arduino:${id}:\n    variables:\n      TELEGRAM_BOT_TOKEN: "${token}"\n` :
                model ? `- arduino:${id}:\n    model: ${model}\n` : `- arduino:${id}: {}\n`;
        }
        files.push(["app.yaml", text(this.set_app_yaml(appYamlCode), "app.yaml")]);

        // tensorflow for the model conversions (first start), ai-edge-litert for the predictions (fast to load): only
        // for the AI blocks of Vittascience (vitta_tf), they take minutes to install
        const requirements = (/vitta_tf|import tensorflow/.test(pyCode) ? "tensorflow\ntensorflowjs\ntf-keras\nh5py\nai-edge-litert\n" : "") +
            (/app_bricks\.mqtt/.test(pyCode) ? "paho-mqtt\n" : "") +
            (/def say_on_board\(/.test(pyCode) ? "piper-tts\n" : "") +
            (/def listen_on_board\(/.test(pyCode) ? "vosk\n" : "") +
            (/def web_terminal_start\(/.test(pyCode) ? "paramiko\n" : "") +
            (/make_stopmotion\(.*'mp4'\)/.test(pyCode) ? "av\n" : "");
        files.push(["python/requirements.txt", text(requirements, "requirements.txt")]);
        files.push(["python/" + this.MAIN_PY, text(pyCode, this.MAIN_PY)]);
        if (/vitta_tf/.test(pyCode)) {
            await VittaInterface.loadExternalLibraries();
            files.push(["python/vitta_tf.py", text(VittaInterface.externalLibraries['vitta_tf'], "vitta_tf.py")]);
        }
        if (/load_local_model\(/.test(pyCode)) {
            for (const [name, content] of await this.readLocalModel('vittascience-image-model', 'modelMetadata', 'code.arduinoq.localModelMissing')) {
                files.push(["python/local_model/" + name, new File([content], name)]);
            }
        }
        if (/load_local_posture_model\(/.test(pyCode)) {
            for (const [name, content] of await this.readLocalModel('vittascience-ai-pose-model', 'modelPoseMetadata', 'code.arduinoq.localPostureModelMissing')) {
                files.push(["python/local_posture_model/" + name, new File([content], name)]);
            }
        }
        if (/load_local_sound_model\(/.test(pyCode)) {
            for (const [name, content] of await this.readLocalModel('vittascience-sound-model', 'modelSoundMetadata', 'code.arduinoq.localSoundModelMissing')) {
                files.push(["python/local_sound_model/" + name, new File([content], name)]);
            }
        }
        if (/load_local_sensor_model\(/.test(pyCode)) {
            for (const [name, content] of await this.readLocalModel('vittascience-ai-edge-model', 'modelEdgeMetadata', 'code.arduinoq.localSensorModelMissing')) {
                files.push(["python/local_sensor_model/" + name, new File([content], name)]);
            }
        }
        if (/load_local_hand_model\(/.test(pyCode)) {
            for (const [name, content] of await this.readLocalModel('vittascience-ai-hand-model', 'modelHandMetadata', 'code.arduinoq.localHandModelMissing')) {
                files.push(["python/local_hand_model/" + name, new File([content], name)]);
            }
        }
        // MediaPipe hand models (VittaTF.predict_hands_on_image, run with TensorFlow Lite), about 8 MB, like PoseNet below
        if (/predict_hands_on_image\(/.test(pyCode)) {
            const response = await fetch("https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task");
            if (!response.ok) throw new Error(`MediaPipe hand_landmarker.task: ${response.status}`);
            files.push(["python/mediapipe/hand_landmarker.task", new File([await response.blob()], "hand_landmarker.task")]);
        }
        // PoseNet of the posture models (VittaTF.predict_posture_on_image): sent with the app, so the board doesn't
        // need Internet to get it. ponytail: about 5 MB pushed on each upload, check the board copy if it gets slow
        if (/predict_posture_on_image\(/.test(pyCode)) {
            files.push(...await this.fetchPosenetFiles());
        }

        // Web terminal (bricks_webui_console) without a page of the program: the WebUI brick needs an index.html, which
        // leads to the console
        const consoleOnly = htlmCode.length === 0 && /def web_terminal_start\(/.test(pyCode);
        if (htlmCode.length > 0 || consoleOnly) {
            files.push(["assets/" + this.INDEX_HTML, text(consoleOnly ? '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=/console">' : htlmCode, this.INDEX_HTML)]);
            files.push(["assets/libs/socket.io.min.js", text(UNO_Q_SOCKET, "socket.io.min.js")]);
            const faviconBlob = await VittaInterface.fetchDir("/public/content/img/favicon.png", "blob");
            files.push(["assets/img/favicon.png", new File([faviconBlob], "favicon.png", { type: faviconBlob.type || "image/png" })]);
        }
        return files;
    };

    /**
     * PoseNet files used by tmPose (MobileNetV1 0.75, stride 16), as python/posenet/ files of the app.
     * @returns {Promise<Array<[string, File]>>}
     */
    async fetchPosenetFiles() {
        const url = "https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet/float/075/";
        const fetchFile = async name => {
            const response = await fetch(url + name);
            if (!response.ok) throw new Error(`PoseNet ${name}: ${response.status}`);
            return new File([await response.blob()], name);
        };
        const modelJson = await fetchFile("model-stride16.json");
        const paths = JSON.parse(await modelJson.text()).weightsManifest.flatMap(group => group.paths);
        const files = [modelJson, ...await Promise.all(paths.map(fetchFile))];
        return files.map(file => ["python/posenet/" + file.name, file]);
    }

    /**
     * Model trained in the Vittascience AI tool of this browser, as the files of a model downloaded from
     * Vittascience (read by VittaTF.load_local_model / load_local_posture_model on the board). The tool saves it with
     * TensorFlow.js in IndexedDB and its metadata (class labels) in localStorage.
     * @param {string} storeKey model name in IndexedDB ('vittascience-image-model', 'vittascience-ai-pose-model')
     * @param {string} metadataKey localStorage key of its metadata ('modelMetadata', 'modelPoseMetadata')
     * @param {string} missingMessage i18n key of the error when there is no such model
     * @returns {Promise<Array<[string, (string|Blob)]>>} model.json, model.weights.bin and metadata.json
     */
    async readLocalModel(storeKey, metadataKey, missingMessage) {
        const metadata = localStorage.getItem(metadataKey);
        const artifacts = await new Promise((resolve, reject) => {
            const request = indexedDB.open('tensorflowjs');
            // No model saved yet: don't create an empty database, TensorFlow.js creates its stores on creation only
            request.onupgradeneeded = () => request.transaction.abort();
            request.onerror = () => request.error && request.error.name === 'AbortError' ? resolve(null) : reject(request.error);
            request.onsuccess = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains('models_store')) {
                    db.close();
                    return resolve(null);
                }
                const get = db.transaction('models_store', 'readonly').objectStore('models_store').get(storeKey);
                get.onerror = () => reject(get.error);
                get.onsuccess = () => {
                    db.close();
                    resolve(get.result ? get.result.modelArtifacts : null);
                };
            };
        });
        if (!artifacts || !metadata) {
            throw new Error(jsonPath(missingMessage));
        }
        const modelJson = {
            modelTopology: artifacts.modelTopology,
            format: artifacts.format,
            generatedBy: artifacts.generatedBy,
            convertedBy: artifacts.convertedBy,
            weightsManifest: [{ paths: ['model.weights.bin'], weights: artifacts.weightSpecs }]
        };
        // Recent TensorFlow.js versions may store the weights as several buffers
        const weights = new Blob([].concat(artifacts.weightData));
        return [
            ['model.json', JSON.stringify(modelJson)],
            ['model.weights.bin', weights],
            ['metadata.json', metadata]
        ];
    };

    extractAppBricks(code) {
        const bricks = new Set();
        const fromPattern = /from\s+arduino\.app_bricks\.([a-zA-Z0-9_]+)\s+import/g;
        let match;
        while ((match = fromPattern.exec(code)) !== null) {
            bricks.add(match[1]);
        }
        const importPattern = /import\s+arduino\.app_bricks\.([a-zA-Z0-9_]+)/g;
        while ((match = importPattern.exec(code)) !== null) {
            bricks.add(match[1]);
        }
        return Array.from(bricks);
    };

    selectLocalFile(accept = "*") {
        return new Promise((resolve, reject) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = accept;
            input.style.display = "none";

            input.addEventListener("change", () => {
                const file = input.files?.[0] || null;
                input.remove();
                resolve(file);
            }, { once: true });

            input.addEventListener("cancel", () => {
                input.remove();
                resolve(null);
            }, { once: true });

            document.body.appendChild(input);
            input.click();
        });
    }

    isConnected() {
        return this.webusb != null && this.adb != null;
    }

    async stopApp(app) {
        this.stopPcWebcam();
        this.stopPcMicrophone();
        await this.stopAppOutput();
        if (this.shell != null) {
            await this.stopCurrentShell();
        }
        if (!this.webusb || !this.adb) {
            await this.connect();
        }

        if (!this.webusb || !this.adb) {
            throw new Error("UNO Q is not connected.");
        }

        const cmd = "arduino-app-cli app stop \"/home/arduino/ArduinoApps/" + app + "\"";
        const output = await this.execute("shell:" + cmd);

        await sleep_ms(5000);
        console.warn(output);
    };

    async waitForAppLog(app, expected, timeoutMs = 180000) {
        if (!this.webusb || !this.adb) {
            await this.connect();
        }

        const matcher = expected instanceof RegExp
            ? expected
            : new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

        const decoder = new TextDecoder();
        const cmd =
            `shell:sh -lc 'export HOME=/home/arduino; ` +
            `arduino-app-cli app logs --follow "/home/arduino/ArduinoApps/${app}"'`;

        let shell = null;
        let output = "";
        let buffer = "";
        const start = Date.now();

        try {
            this.state("running");
            shell = await this.adb.open(cmd);
            this.shell = shell;

            let r = await shell.receive();

            while (r.cmd === "WRTE" && this.shell === shell) {
                if (Date.now() - start > timeoutMs) {
                    throw new Error(`Timeout: message non reçu dans les logs: ${matcher}`);
                }

                if (r.data != null) {
                    const data = decoder.decode(r.data);
                    output += data;
                    buffer += data;

                    this.showOutput(data);

                    if (matcher.test(buffer)) {
                        await shell.send("OKAY");
                        await shell.close();

                        if (this.shell === shell) {
                            this.shell = null;
                        }

                        this.state("connected");
                        return output;
                    }

                    if (buffer.length > 50000) {
                        buffer = buffer.slice(-25000);
                    }
                }

                await shell.send("OKAY");
                r = await shell.receive();
            }

            return output;
        } catch (error) {
            if (shell) {
                try {
                    await shell.close();
                } catch (e) {
                    console.warn("[UNOQ] shell close ignored", e);
                }
            }

            if (this.shell === shell) {
                this.shell = null;
            }

            this.state(this.webusb && this.adb ? "connected" : "ready");
            throw error;
        }
    }

    readLibrariesFromIno(inoSource) {
        if (typeof inoSource !== "string") throw new TypeError("inoSource must be a string");
        const withoutBlockComments = inoSource.replace(/\/\*[\s\S]*?\*\//g, "");
        const withoutLineComments = withoutBlockComments.replace(/\/\/[^\n\r]*/g, "");
        const includeRe = /^\s*#\s*include\s*([<"])\s*([^>"]+)\s*[>"]\s*$/gm;
        const libs = [];
        const seen = new Set();
        let m;
        while ((m = includeRe.exec(withoutLineComments)) !== null) {
            const raw = m[2].trim();              // ex: "Wire.h" ou "ArduinoJson.h" ou "SomeLib/Some.h"
            const header = raw.replace(/\\/g, "/");
            const baseName = header.split("/")[0].replace(/\.(h|hpp|hh)$/i, "");
            const key = header.toLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                libs.push({ header, name: baseName });
            }
        }
        return libs;
    };

    parseArduinoCompileErrors(output) {
        const lines = String(output || "").split(/\r?\n/);
        const errors = [];
        let currentError = null;

        const errorLineRe = /^\[INFO\]\s+(.+?):(\d+):(\d+):\s+error:\s+(.+)$/;
        const exitStatusRe = /^\[ERROR\]\s+Exit Status\s+(\d+)/i;

        for (const line of lines) {
            const errorMatch = line.match(errorLineRe);

            if (errorMatch) {
                currentError = {
                    file: errorMatch[1],
                    line: Number(errorMatch[2]),
                    column: Number(errorMatch[3]),
                    message: errorMatch[4],
                    raw: [line]
                };

                errors.push(currentError);
                continue;
            }

            if (currentError && /^\[INFO\]\s+/.test(line)) {
                const content = line.replace(/^\[INFO\]\s+/, "");

                if (
                    /^\s*\d+\s+\|/.test(content) ||
                    /^\s*\|/.test(content)
                ) {
                    currentError.raw.push(line);
                    continue;
                }
            }

            if (exitStatusRe.test(line)) {
                if (currentError) {
                    currentError.raw.push(line);
                }
            }
        }

        return errors;
    };

    // Sources of the libraries providing these headers, from the Vittascience compilation server (services/post/postCompile.php)
    async getServerLibraries(headers) {
        const payload = new FormData();
        payload.append("json", JSON.stringify({ type: "library", headers }));
        const host = typeof IS_CAPYTALE_CONTEXT !== 'undefined' ? 'https://fr.vittascience.com' : '';
        const res = await fetch(`${host}/services/post/postCompile.php`, { method: "POST", body: payload });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || `HTTP ${res.status}`);
        return json;
    };

    async getLatestArduinoLibraryVersion(dependency) {
        // Bundled with the arduino:zephyr platform, must not be listed in sketch.yaml
        if (dependency.header === "Arduino_RouterBridge.h") return null;
        // Library names that differ from their header (Grove/Seeed libraries used by the blocks)
        const HEADER_LIBRARIES = {
            "SeeedOLED.h": "Grove - OLED Display 0.96",
            "Grove_LED_Bar.h": "Grove LED Bar",
            "TM1637.h": "Grove 4-Digit Display",
            "Ultrasonic.h": "Grove Ultrasonic Ranger",
            "DHT.h": "Grove Temperature And Humidity Sensor",
            "Seeed_BME280.h": "Grove - Barometer Sensor BME280",
            "Seeed_HM330X.h": "Grove - Laser PM2.5 Sensor HM3301",
            "Air_Quality_Sensor.h": "Grove - Air quality sensor",
            "High_Temp.h": "Grove - High Temperature Sensor",
            "DS1307.h": "Grove - RTC DS1307",
            "PCF85063TP.h": "Grove - High Precision RTC",
            "MutichannelGasSensor.h": "Grove - Multichannel Gas Sensor",
            "Grove_Motor_Driver_TB6612FNG.h": "Grove - Motor Driver TB6612FNG",
            "paj7620.h": "Gesture PAJ7620",
            "LiquidCrystal_I2C.h": "LiquidCrystal I2C",
            "Adafruit_NeoPixel.h": "Adafruit NeoPixel",
            "Modulino.h": "Arduino_Modulino",
            "Adafruit_INA219.h": "Adafruit INA219",
            "Adafruit_MLX90614.h": "Adafruit MLX90614 Library",
            "Adafruit_SGP30.h": "Adafruit SGP30 Sensor",
            "Adafruit_SI1145.h": "Adafruit SI1145 Library",
            "Adafruit_TCS34725.h": "Adafruit TCS34725",
            "Adafruit_VC0706.h": "Adafruit VC0706 Serial Camera Library",
            "Grove_I2C_Motor_Driver.h": "Grove I2C Motor Driver v1.3",
            "SparkFunMiniMoto.h": "SparkFun MiniMoto",
            "TH02_dev.h": "Grove Temper Humidity TH02",
            "U8g2lib.h": "U8g2",
            "max6675.h": "MAX6675 library"
        };
        const libraryName = HEADER_LIBRARIES[dependency.header] || dependency.name;
        // The index is ~60 MB: download it once per page
        if (!this.libraryIndex) {
            const url = "https://downloads.arduino.cc/libraries/library_index.json";
            const res = await fetch(url, { cache: "no-store" });
            if (!res.ok) throw new Error(`HTTP ${res.status} while fetching library index`);
            this.libraryIndex = await res.json();
        }
        const index = this.libraryIndex;
        const libs = (index?.libraries ?? []).filter(l => l?.name === libraryName);
        if (libs.length === 0) return null;
        libs.sort((x, y) => this.cmpSemver(x.version, y.version));
        const latest = libs[libs.length - 1];
        return {
            name: latest.name,
            version: latest.version,
            dependencies: (latest.dependencies ?? []).map(d => d.name),
            // souvent dispo dans l’index (selon époque/entrée)
            // url: latest.url,
            // archiveFileName: latest.archiveFileName,
            // checksum: latest.checksum,
        };
    };

    // Compare deux versions SemVer "x.y.z" (tolère "1.2" => "1.2.0")
    cmpSemver(a, b) {
        const pa = String(a).split(".").map(n => parseInt(n, 10) || 0);
        const pb = String(b).split(".").map(n => parseInt(n, 10) || 0);
        for (let i = 0; i < 3; i++) {
            const da = pa[i] ?? 0;
            const db = pb[i] ?? 0;
            if (da !== db) return da - db;
        }
        return 0;
    };

}

// modele chats chiens

// https://fr.vittascience.com/ia/model/644237cc1072c/metadata.json
// https://fr.vittascience.com/ia/model/644237cc1072c/model.json
// https://fr.vittascience.com/ia/model/644237cc1072c/model.weights.bin 
