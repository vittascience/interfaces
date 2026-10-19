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

        this.connected = false;
        this.commandRunning = false;
        this.readingLogs = false;
        this._isPythonWarningBlock = false;
        this._consoleOutputBuffer = "";

        this.APP_PATH = "/home/arduino/ArduinoApps/vittascience-app";
        this.SKETCH_INO = 'sketch.ino';
        this.MAIN_PY = 'main.py';
        this.INDEX_HTML = 'index.html';

        this.state("ready");
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
            appStartingPattern: /^\[main\]\s*======== App is starting/,
            tracebackStartPattern: /^\[main\]\s*Traceback \(most recent call last\):/,
            pythonFileLinePattern: /^\[main\]\s*File\s+"[^"]+",\s+line\s+\d+/,
            pythonIndentedFileLinePattern: /^\[main\]\s+File\s+"[^"]+",\s+line\s+\d+/,
            pythonExceptionPattern: /^\[main\]\s*(?:[A-Za-z_][A-Za-z0-9_]*(?:Error|Exception)|KeyboardInterrupt|SystemExit):/,
            pythonSourceLinePattern: /^\[main\]\s{2,}\S/
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
            if (monitor && this._appLogsConsoleStart !== null) {
                while (monitor.childElementCount > this._appLogsConsoleStart) {
                    monitor.lastElementChild.remove();
                }
            }
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

        this.options.onOpen();

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
                this.adb = await this.webusb.connectAdb("host::", () =>
                    this.showErrorMessage("Please check the screen of your " + this.webusb.device.productName + "."));

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
    };

    // silent: run an internal command without echoing it and its output to the console
    async execute(cmd, silent = false) {
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
            // Console position after the command line, to remove the logs of the previous app runs
            const monitor = InterfaceMonitor.monitor || document.querySelector("#console");
            this._appLogsConsoleStart = / app logs /.test(safeCmd) && monitor ? monitor.childElementCount : null;

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

                    const appStarter = "[main] ======== App is starting";
                    const lastStartIndex = data.lastIndexOf(appStarter);
                    if (lastStartIndex !== -1) {
                        data = data.slice(lastStartIndex);
                    }

                    if (!silent) this.showOutput(data);
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

    async startApp(app, followLogs = true) {
        //console.log("[UNOQ] startApp()");
        if (!this.webusb || !this.adb) {
            await this.connect();
        }

        const execApp = "sh -lc 'export TMPDIR=/tmp; export HOME=/home/arduino;" +
            " export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH;" +
            // Drop the compiled sketch objects: files are pushed with the computer's time, so if the board clock
            // is ahead, arduino-cli thinks the old objects are up to date and links a stale sketch
            " rm -rf \"/home/arduino/ArduinoApps/" + app + "/.cache/sketch/sketch\";" +
            " arduino-app-cli app start \"/home/arduino/ArduinoApps/" + app + "\"" +
            // Make the app start on boot, so it runs when the board is unplugged from the computer
            " && arduino-app-cli properties set default \"/home/arduino/ArduinoApps/" + app + "\"'";

        const output = await this.execute("shell:" + execApp);

        const errors = this.parseArduinoCompileErrors(output);

        if (errors.length > 0) {
            InterfaceMonitor.writeConsole("\n" + errors.join("\n"), "warning", true, true);
            return false;
        }

        if (followLogs) {
            this.logsPromise = this.getAppLogs(app);
        }

        return true;
    }

    async getAppLogs(app) {
        //console.log("[UNOQ] getAppLogs()");
        if (!this.webusb || !this.adb) {
            await this.connect();
        }
        const cmd =
            `sh -lc 'export HOME=/home/arduino; ` +
            "arduino-app-cli app logs --follow \"/home/arduino/ArduinoApps/" + app + "\"'";

        const output = await this.execute("shell:" + cmd);
        //console.warn(output);
        return output;
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
        for (const [path, file] of appFiles) {
            await this.push_usb(this.APP_PATH + "/" + path, [file]);
            await sleep_ms(500);
        }

        await this.stopApp("vittascience-app");

        // await this.execute(
        //     'shell:arduino-app-cli app clean-cache "/home/arduino/ArduinoApps/vittascience-app"'
        // );

        const started = await this.startApp("vittascience-app", false);

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
                InterfaceMonitor.writeConsole(`${jsonPath('code.arduinoq.webAppUrl')} <a href="${url}" target="_blank" rel="noopener">${url}</a>`, 'success', false, true);
            }
        }

        // Show the sketch console live when the sketch writes to it (Serial is renamed to Monitor on the UNO Q).
        // Sending a command from the console input stops this stream.
        if (started && /\bMonitor\./.test(sketchCode)) {
            this.logsPromise = this.execute("shell:sh -lc 'export HOME=/home/arduino; arduino-app-cli monitor'");
        } else if (started && /\bprint\(/.test(pyCode)) {
            // Else the Python output (print, errors) of the app logs.
            // ponytail: one stream at a time, the sketch console wins when both write
            this.logsPromise = this.getAppLogs("vittascience-app");
        }
    };

    /**
     * Files of the Arduino App Lab app (paths relative to the app folder), pushed to the board on upload and
     * zipped by the "Download" button.
     * @param {Object} projectFiles generated files: sketch.ino, main.py, index.html
     * @returns {Promise<Array<[string, File]>>}
     */
    async buildAppFiles(projectFiles) {
        const sketchCode = projectFiles[this.SKETCH_INO] || "";
        const pyCode = projectFiles[this.MAIN_PY] || "";
        const htlmCode = projectFiles[this.INDEX_HTML] || "";
        const text = (content, name) => new File([content], name, { type: "text/plain" });
        const files = [];

        let yamlCode = "";
        // The sketch profile only installs the listed libraries: the dependencies of the libraries are listed too
        const dependencies = this.readLibrariesFromIno(sketchCode);
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
        for (const brick of this.extractAppBricks(pyCode)) {
            appYamlCode += `- arduino:${brick}: {}\n`;
        }
        files.push(["app.yaml", text(this.set_app_yaml(appYamlCode), "app.yaml")]);

        files.push(["python/requirements.txt", text("tensorflow\ntensorflowjs\ntf-keras\nh5py\n", "requirements.txt")]);
        files.push(["python/" + this.MAIN_PY, text(pyCode, this.MAIN_PY)]);
        if (/vitta_tf/.test(pyCode)) {
            files.push(["python/vitta_tf.py", text(VittaInterface.externalLibraries['vitta_tf'], "vitta_tf.py")]);
        }
        if (/load_local_model\(/.test(pyCode)) {
            for (const [name, content] of await this.readLocalImageModel()) {
                files.push(["python/local_model/" + name, new File([content], name)]);
            }
        }

        if (htlmCode.length > 0) {
            files.push(["assets/" + this.INDEX_HTML, text(htlmCode, this.INDEX_HTML)]);
            files.push(["assets/libs/socket.io.min.js", text(UNO_Q_SOCKET, "socket.io.min.js")]);
            const faviconBlob = await VittaInterface.fetchDir("/public/content/img/favicon.png", "blob");
            files.push(["assets/img/favicon.png", new File([faviconBlob], "favicon.png", { type: faviconBlob.type || "image/png" })]);
        }
        return files;
    };

    /**
     * Image model trained in the Vittascience AI tool of this browser, as the files of a model downloaded from
     * Vittascience (read by VittaTF.load_local_model on the board). The tool saves it with TensorFlow.js in IndexedDB
     * ('indexeddb://vittascience-image-model') and its metadata (class labels) in localStorage.
     * @returns {Promise<Array<[string, (string|Blob)]>>} model.json, model.weights.bin and metadata.json
     */
    async readLocalImageModel() {
        const metadata = localStorage.getItem('modelMetadata');
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
                const get = db.transaction('models_store', 'readonly').objectStore('models_store').get('vittascience-image-model');
                get.onerror = () => reject(get.error);
                get.onsuccess = () => {
                    db.close();
                    resolve(get.result ? get.result.modelArtifacts : null);
                };
            };
        });
        if (!artifacts || !metadata) {
            throw new Error(jsonPath('code.arduinoq.localModelMissing'));
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

    async getLatestArduinoLibraryVersion(dependency) {
        // Bundled with the arduino:zephyr platform, must not be listed in sketch.yaml
        if (dependency.header === "Arduino_RouterBridge.h") return null;
        // Library names that differ from their header (Grove/Seeed libraries used by the blocks)
        const HEADER_LIBRARIES = {
            "rgb_lcd.h": "Grove - LCD RGB Backlight",
            "SeeedOLED.h": "Grove - OLED Display 0.96",
            "ChainableLED.h": "Grove - Chainable RGB LED",
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
            "Modulino.h": "Arduino_Modulino"
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
