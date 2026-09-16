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
        this.set_app_yaml = (bricks) => `name: IA images vittascience\ndescription: Vittascience - Détection d'images.\nports: []\nbricks:\n${bricks}\nicon: 🟢`;

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

    async execute(cmd) {
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
            this.showOutput(`\n${ESC}[1m${ESC}[32m${productName}${ESC}[0m:/$ ${ESC}[1m${shownCmd}${ESC}[0m\n`);

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

                    this.showOutput(data);
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
            " arduino-app-cli app start \"/home/arduino/ArduinoApps/" + app + "\"'";

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

    async sudo(cmd) {
        while (true) {
            InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.passwordRequired'), 'neutral', true, true);
            const password = await this.askArduinoQPassword();

            if (password === null) {
                InterfaceMonitor.writeConsole(jsonPath('code.arduinoq.transfertAborted'), 'warning');
                return null;
            }

            const output = await this.execute(
                `shell:printf '%s\\n' ${JSON.stringify(password)} | sudo -S -p "" sh -lc ${JSON.stringify(cmd)}`
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
        let output = await this.execute("shell:arduino-app-cli app new \"vittascience-app\"");

        output = await this.sudo(
            "set -e; apt update; apt install -y python3-pip; python3 -m pip install --break-system-packages tensorflow tensorflowjs tf-keras h5py"
        );
        if (!output) return;

        const projectFiles = CodeManager.getSharedInstance().getCodeFiles();

        const sketchCode = projectFiles[this.SKETCH_INO];
        const pyCode = projectFiles[this.MAIN_PY];
        const htlmCode = projectFiles[this.INDEX_HTML];

        const dependencies = this.readLibrariesFromIno(sketchCode);

        let yamlCode = "";
        for (const i in dependencies) {
            const latest = await this.getLatestArduinoLibraryVersion(dependencies[i].name);
            if (latest) {
                yamlCode += `      - ${latest.name} (${latest.version})`;
            }
        }
        yamlCode = this.set_sketch_yaml(yamlCode);
        const yamlFile = new File([yamlCode], "sketch.yaml", { type: "text/plain" });
        await this.push_usb(this.APP_PATH + "/sketch/sketch.yaml", [yamlFile]);
        await sleep_ms(500)

        const inoFile = new File([sketchCode], this.SKETCH_INO, { type: "text/plain" });
        await this.push_usb(this.APP_PATH + "/sketch/" + this.SKETCH_INO, [inoFile]);
        await sleep_ms(500)

        let appYamlCode = "";
        const bricks = this.extractAppBricks();
        for (const i in bricks) {
            appYamlCode += `- arduino:${bricks[i]}: {}`
        }
        appYamlCode = this.set_app_yaml(appYamlCode);
        const appYamlFile = new File([appYamlCode], "app.yaml", { type: "text/plain" });
        await this.push_usb(this.APP_PATH + "/app.yaml", [appYamlFile]);
        await sleep_ms(500)

        const requirementsCode = "tensorflow\ntensorflowjs\ntf-keras\nh5py\n";
        const requirementsFile = new File([requirementsCode], "requirements.txt", { type: "text/plain" });
        await this.push_usb(this.APP_PATH + "/python/requirements.txt", [requirementsFile]);
        await sleep_ms(500)

        // python file
        const pyFile = new File([pyCode], this.MAIN_PY, { type: "text/plain" });
        await this.push_usb(this.APP_PATH + "/python/" + this.MAIN_PY, [pyFile]);
        await sleep_ms(500)

        if (/vitta_tf/.test(pyCode)) {
            const pyVittaTFFile = new File([VittaInterface.externalLibraries['vitta_tf']], 'vitta_tf.py', { type: "text/plain" });
            await this.push_usb(this.APP_PATH + "/python/vitta_tf.py", [pyVittaTFFile]);
            await sleep_ms(500)
        }

        // html file
        if (htlmCode && htlmCode.length > 0) {
            const htmlFile = new File([htlmCode], this.INDEX_HTML, { type: "text/plain" });
            await this.push_usb(this.APP_PATH + "/assets/" + this.INDEX_HTML, [htmlFile]);
            await sleep_ms(500)

            // // js file
            // const jsFile = new File([UNO_Q_JS], "app.js", { type: "text/plain" });
            // await this.push_usb(this.APP_PATH + "/assets/app.js", [jsFile]);
            // await sleep_ms(500)

            // // css file
            // const cssFile = new File([UNO_Q_CSS], "style.css", { type: "text/plain" });
            // await this.push_usb(this.APP_PATH + "/assets/style.css", [cssFile]);
            // await sleep_ms(500)

            const socketLibFile = new File([UNO_Q_SOCKET], "socket.io.min.js", { type: "text/plain" });
            await this.push_usb(this.APP_PATH + "/assets/libs/socket.io.min.js", [socketLibFile]);
            await sleep_ms(500)

            const faviconBlob = await VittaInterface.fetchDir("/public/content/img/favicon.png", "blob");
            const faviconFile = new File([faviconBlob], "favicon.png", { type: faviconBlob.type || "image/png" });
            await this.push_usb(this.APP_PATH + "/assets/img/favicon.png", [faviconFile]);
            await sleep_ms(500);
        }

        await this.stopApp("vittascience-app");

        // await this.execute(
        //     'shell:arduino-app-cli app clean-cache "/home/arduino/ArduinoApps/vittascience-app"'
        // );

        await this.startApp("vittascience-app", false);

        // // Puis affichage live normal.
        // this.logsPromise = this.getAppLogs("vittascience-app");
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

    async getLatestArduinoLibraryVersion(libraryName) {
        const url = "https://downloads.arduino.cc/libraries/library_index.json";
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} while fetching library index`);
        const index = await res.json();
        const libs = (index?.libraries ?? []).filter(l => l?.name === libraryName);
        if (libs.length === 0) return null;
        libs.sort((x, y) => this.cmpSemver(x.version, y.version));
        const latest = libs[libs.length - 1];
        return {
            name: latest.name,
            version: latest.version,
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
