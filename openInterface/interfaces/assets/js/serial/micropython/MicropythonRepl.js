'use strict';

/**
 * Workspace MicropythonRepl: MicropythonRepl
 * Copyright 2020 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide Micropython REPL for controlling py board.
 */

/** 
 * @fileoverview WorkSpace MicropythonRepl 
 * @author: leomlr (Léo Meillier)
 */

/**
 * @class MicropythonRepl
 */
class MicropythonRepl {
    /**
     * Creates an instance of MicropythonRepl.
     * @private
     */
    constructor(serial, options) {
        this.OPEN_RAW_REPL = '\x01'; // [CTRL-A]
        this.CLOSE_RAW_REPL = '\x02'; // [CTRL-B]
        this.OPEN_REPL = '\x03'; // [CTRL-C]
        this.CLOSE_PASTE_MODE = '\x04'; // [CTRL-D]
        this.OPEN_PASTE_MODE = '\x05'; // [CTRL-E]
        this.END_MPY_CMD = '\r\n';
        this.EXECUTION_MSG = jsonPath('code.serialAPI.codeExecution');
        this.FILE_DOWNLOADED = jsonPath('code.serialAPI.fileDownloaded');
        this.serial = serial;
        this.isOpen = false;
        this.wasOpen = false;
        this.isRawOpen = false;
        this.isPasteMode = false;
        this.hasFirmware = true;
        this.isCommand = false;
        this.isLoopClosed = true;
        this.rawEmptyCount = 0;
        this.hadRequestedLibraries = false;
        this.buffer = "";
        this._code = "";
        this.readingStatus = {};
        if (options.chunkSize !== null || options.chunkSize !== undefined) {
            this.chunkSize = options.chunkSize;
        } else {
            this.chunkSize = 1024;
        }
        if (options.libraries !== null || options.libraries !== undefined) {
            this._CUSTOM_LIB = options.libraries;
        } else {
            this.libraries = Object.create(null);
        }
        this.Queue = new Queue();
        this._MPY_CMD = {
            fs: {
                execute: (filename) => {
                    return "exec(open('" + filename + "').read(),globals())"
                },
                open: (filename, mode) => {
                    return "f = open('" + filename + "', '" + mode + "')"
                },
                close: () => {
                    return "f.close()"
                },
                read: () => {
                    return "f.read()"
                },
                write: (code) => {
                    return "f.write(" + code + ")"
                },
                remove: (filename) => {
                    return "os.remove('" + filename + "')"
                },
                os_list_files: () => {
                    return "os.listdir()"
                },
                os_uname: () => {
                    return "os.uname()"
                }
            },
            import_library: (lib) => {
                return "import " + lib
            },
            setPwm: (pin) => {
                return "pwm_p" + pin + " = machine.PWM(machine.Pin(" + pin + "), freq=10, duty=512)"
            },
            stopPwm: (pin) => {
                return "pwm_p" + pin + ".deinit()"
            },
            getFreeMemory: () => {
                return "gc.mem_free()"
            },
            sleep_ms: (millis) => {
                return "utime.sleep_ms(" + millis + ")"
            }
        };
        this.MAIN_FILENAME = 'main.py';
        return this;
    };
    /**
     * Open REPL by sending [0x03] to serial port.
     * @public
     * @return
     * @memberof MicropythonRepl
     */
    async open() {
        return await this.write(this.OPEN_REPL);
    };
    /**
     * Open Raw REPL by sending [0x01] to serial port.
     * @public
     * @return
     * @memberof MicropythonRepl
     */
    async open_raw_repl() {
        return await this.write(this.OPEN_RAW_REPL);
    };
    /**
     * Open Paste Mode by sending [0x05] to serial port.
     * @public
     * @return
     * @memberof MicropythonRepl
     */
    async open_paste_mode() {
        return await this.write(this.OPEN_PASTE_MODE);
    };
    /**
     * Close Raw REPL by sending [0x01] to serial port.
     * @public
     * @return
     * @memberof MicropythonRepl
     */
    async close_raw_repl() {
        return await this.write(this.CLOSE_RAW_REPL);
    };
    /**
     * Write buffer to serial port after encoding command.
     * @public
     * @param {string} cmd
     * @return
     * @memberof MicropythonRepl
     */
    async write(cmd) {
        for (var i = 128; i < 256; i++) {
            const hex = '\\\\x' + i.toString(16);
            cmd = cmd.replace(new RegExp(String.fromCharCode(i), 'g'), hex);
        }
        return await this.serial.write(new TextEncoder('utf-8').encode(cmd));
    };
    /**
     * Send micropython command to serial port.
     * @public
     * @param {string} cmd
     * @return
     * @memberof MicropythonRepl
     */
    async sendCommand(cmd) {
        return await this.write(cmd);
    };
    /**
     * Add Micropython command in Queue.
     * @public
     * @param {string} cmd
     * @param {boolean} ender
     * @memberof MicropythonRepl
     */
    enqueueCommand(cmd, ender = true) {
        this.Queue.enqueue(cmd + (ender ? this.END_MPY_CMD : ''));
    };
    /**
     * Send list of Micropython command to this.
     * @public
     * @param {Array<string>} commands
     * @memberof MicropythonRepl
     */
    enqueueCommandList(commands) {
        for (let i = 0; i < commands.length; i++) {
            this.enqueueCommand(commands[i]);
        }
    };
    /**
     * Run python file from filesystem.
     * @param {string} file [OPTIONAL]
     * @public
     * @memberof MicropythonRepl
     */
    runFile(file = this.MAIN_FILENAME) {
        this.enqueueCommand(this._MPY_CMD.fs.execute(file));
    };
    /**
     * Run vitta_boot.py before downloading main script.
     * It removes main.py & library dependecies contained in board FS memory.
     * @private
     * @memberof MicropythonRepl
     */
    _removeFileSystem(removeExternalLibs = true) {
        const bootFile = 'vitta_boot.py';
        let bootCode = "import os" + NEWLINE
            + "print(os.uname())" + NEWLINE
            + "scripts = ['main.py',";

        if (["esp32", "m5stack", "galaxia", "pico"].includes(Main.getInterface())) {
            bootCode += "'vitta_script.js','vitta_style.css','client.js',";
        }

        if (removeExternalLibs) {
            for (const libName in VittaInterface.externalLibraries) {
                bootCode += "'" + libName + ".py',";
            }
        }

        bootCode = bootCode.slice(0, -1);
        bootCode += "]" + NEWLINE
            + "for i in scripts:" + NEWLINE
            + "  if i in os.listdir():" + NEWLINE
            + "    print('Removing ' + i)" + NEWLINE
            + "    os.remove(i)" + NEWLINE;
        if (["esp32", "m5stack", "galaxia", "pico"].includes(Main.getInterface()) && Blockly.Python.esp32.getProgrammingMode().mode == Blockly.Python.esp32.MODE_SERVER) {
            bootCode += Blockly.Python.esp32.writeJavascriptFile(Blockly.Python.convertObjectInLists(Blockly.Python.jsCodes_)) + NEWLINE
                + Blockly.Python.esp32.writeCssFile(Blockly.Python.convertObjectInLists(Blockly.Python.cssStyles_)) + NEWLINE
        }
        bootCode += "print(os.listdir())" + NEWLINE;
        this._downloadScript(bootFile, bootCode);
        const bootCmds = [
            this._MPY_CMD.fs.execute(bootFile),
            this._MPY_CMD.import_library('os'),
            this._MPY_CMD.fs.remove(bootFile)
        ];
        this.enqueueCommandList(bootCmds);
    };
    /**
     * Append execution of main.py in boot.py file of board. Add debug messages for ESP32 boards.
     * @public
     * @param {Boolean} deubg [OPTIONAL]
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async bootBoard(debug = false) {
        const adaptedCode = this._getAdaptedCode("# Generated by Vittascience\n"
            + (debug ? "import esp\nesp.osdebug(0)\n" : "")
            + "try:\n"
            + "  exec(open('main.py').read(),globals())\n")
            + "except OSError as e:\n"
            + "  print('[INFOS] Unable to run main.py\\\\n')"
        const commands = [
            "f = None",
            "buffer = \"\"\"" + adaptedCode + "\"\"\"",
            "try:",
            "  " + this._MPY_CMD.fs.open('boot.py', 'a'),
            "  if not 'Vittascience' in f.readlines():",
            "    " + this._MPY_CMD.fs.write("buffer"),
            "  " + this._MPY_CMD.fs.close(),
            "except OSError:",
            "  " + this._MPY_CMD.fs.open('boot.py', 'w'),
            "  " + this._MPY_CMD.fs.write("buffer"),
            "  " + this._MPY_CMD.fs.close(),
        ];
        await this.open_paste_mode();
        this.enqueueCommandList(commands);
        this.enqueueCommand(this.CLOSE_PASTE_MODE, false);
    };
    /**
     * Download python user code.
     * @public
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async uploadUserCode() {
        const areArraysEqual = (arr1, arr2) => {
            if (arr1.length !== arr2.length) return false;

            let countMap1 = arr1.reduce((acc, val) => (acc[val] = (acc[val] || 0) + 1, acc), {});
            let countMap2 = arr2.reduce((acc, val) => (acc[val] = (acc[val] || 0) + 1, acc), {});

            return Object.keys(countMap1).every(key => countMap1[key] === countMap2[key]);
        }
        // Load python code from workspace.
        this._code = CodeManager.getSharedInstance().getCode();
        if (this._getRequestedLibraries(this._code).length > 0) {
            if (typeof localStorage['currentUploadedLibrairies'] !== 'undefined' && areArraysEqual(localStorage['currentUploadedLibrairies'].split(','), this._getRequestedLibraries(this._code).map(file => file.filename))) {
                this._removeFileSystem(false);
            } else {
                this._removeFileSystem();
                this._downloadExternalLibraries(this._code);
            }
            // localStorage['currentUploadedLibrairies'] = this._getRequestedLibraries(this._code).map(file => file.filename);
        } else {
            this._removeFileSystem();
        }

        this._downloadMainCode(CodeManager.getSharedInstance().getCode());
        const memoryCmds = [
            this._MPY_CMD.import_library('gc'),
            this._MPY_CMD.getFreeMemory()
        ];
        this.enqueueCommandList(memoryCmds);
    };
    /**
     * Send Micropython command for resetting board.
     */
    resetBoard(lib, soft = false) {
        // console.log("[REPL] resetBoard()")
        const runCmds = [
            this._MPY_CMD.import_library(lib),
            lib + '.' + (soft ? 'soft_' : '') + 'reset()'
        ];
        this.enqueueCommandList(runCmds);
    };
    /**
     * Set REPL state and update its button style.
     * @public
     * @param {boolean} state
     * @returns {void}
     */
    setRepl(state) {
        if (this.isOpen != state) {
            this.isOpen = state;
            if (!this.serial.isDownloading) {
                if (!this.isOpen) {
                    $('#repl-control').removeClass("activated");
                } else {
                    $('#repl-control').addClass("activated");
                }
            }
        }
    };
    /**
     * Reading loop for printing data read by serial 'dataReceived' yield on console.
     * @public
     * @returns {void}
     */
    async readingLoop() {
        this.isLoopClosed = false;
        let isError = false;
        let isFirmware13 = false;
        while (true) {
            if (!this.serial.isConnected) {
                break;
            }
            await this.serial.sleep(50);
            const { value, done } = await this.serial.read();
            if (done || !value) {
                if (this.serial.hasToClose) {
                    break;
                }
                continue;
            } else {
                this.buffer += value;
                if (this.buffer.match(/MicroPython v1.13/)) {
                    isFirmware13 = true;
                }
                if (this._isEndOf(this.buffer, '>>> ', 1)) {
                    this.isRawOpen = false;
                    this._printResponseOnConsole(this.buffer);
                    this.setRepl(true);
                    this.isCommand = true;
                    if (isFirmware13) {
                        InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.firmwareWarning'), 'interrupt');
                        InterfaceMonitor.writeConsole(">>> ");
                        isFirmware13 = false;
                    }
                    if (!isError || this.buffer.match(/KeyboardInterrupt/)) {
                        if (!this.Queue.isEmpty()) {
                            this.sendCommand(this.Queue.dequeue());
                        } else {
                            this.Queue.reset();
                        }
                    } else {
                        this.Queue.reset();
                    }
                    isError = false;
                    this.buffer = "";
                } else {
                    this.setRepl(false);
                }
                if (this.buffer.match(/esp\_image\: Checksum failed\./)) {
                    this.hasFirmware = false;
                }
                if ((this.buffer.match(/ets [A-Za-z]{0,3} ( |)[0-9]{1,2} [0-9]{4} [0-9]{2}\:[0-9]{2}\:[0-9]{2}/) && !this.hasFirmware)
                    || this.buffer.match(/perform factory reprogramming of MicroPython firmware \(completely erase flash, followed by firmware programming\)./)
                    || this.buffer.match(/OSError: \[Errno 1\] EPERM/)) {
                    this.serial.hasFirmware = false;
                    this.hasFirmware = false;
                    const parsedRep = this._parseResponse(this.buffer);
                    this._printResponseOnConsole(parsedRep.textToPrint);
                    InterfaceMonitor.writeConsole('</br>' + jsonPath('code.serialAPI.firmwareNotFound'), 'interrupt');
                    break;
                }
                if (!this.isOpen && !isError) {
                    const parsedRep = this._parseResponse(this.buffer);
                    if (parsedRep.textToPrint != "") {
                        if (parsedRep.textToPrint.indexOf('Brownout detector was triggered') != -1) {
                            InterfaceMonitor.writeConsole('</br>Brownout detector was triggered', 'default');
                            InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.powerSupply') + '</br>', 'warning');
                        } else {
                            if (/exec\(open\(\'main\.py\'\).read\(\),( |)globals\(\)/.test(parsedRep.textToPrint)) {
                                InterfaceMonitor.writeConsole(this.EXECUTION_MSG + '>>>\n', 'success');
                                this.serial.isDownloading = false;
                            }
                            if ((this.serial.hasToClose || this.serial.isDownloading) && (/machine.reset\(\)/.test(parsedRep.textToPrint) || /exec\(open\(\'main\.py\'\).read\(\),( |)globals\(\)/.test(parsedRep.textToPrint))) {
                                try {
                                    if (/machine.reset\(\)/.test(parsedRep.textToPrint)) {
                                        this._printResponseOnConsole(parsedRep.textToPrint.split("machine.reset()")[0] + "machine.reset()");
                                    } else {
                                        this._printResponseOnConsole(parsedRep.textToPrint.split("exec(open('main.py').read(),globals()")[0] + "exec(open('main.py').read(), globals()");
                                    }
                                } catch (e) {
                                    console.error(e)
                                }
                                InterfaceMonitor.writeConsole(this.EXECUTION_MSG, 'success');
                                if (this.serial.hasToClose) {
                                    this.isLoopClosed = true;
                                    this.buffer = "";
                                    break;
                                }
                            } else {
                                this._printResponseOnConsole(parsedRep.textToPrint);
                                if (!InterfaceMonitor.PARSING_MESSAGE) {
                                    const value = parseFloat(parsedRep.textToPrint);
                                    let graph = null;
                                    if (!isNaN(value)) {
                                        graph = '@Graph:Console:' + value + '|';
                                    } else if (parsedRep.textToPrint.match(/^@Graph:/)) {
                                        graph = parsedRep.textToPrint;
                                    }
                                    if (graph !== null) {
                                        InterfaceMonitor.sendDataToChart(graph);
                                    }
                                    if (parsedRep.textToPrint.match(/^@music:/) && $('#audio-switch').append("On")) {
                                        this._playNote(parsedRep.textToPrint);
                                    }
                                }
                                if (/[. ]/.test(parsedRep.buffer) && parsedRep.buffer.indexOf('... ') === 0) {
                                    this.isRawOpen = true;
                                    this._printResponseOnConsole(parsedRep.buffer);
                                    parsedRep.buffer = "";
                                }
                            }
                        }
                    }
                    this.buffer = parsedRep.buffer;
                    isError = parsedRep.isError;
                }
            }
        }
    };
    /**
     * Download code in 'main.py' file.
     * @private
     * @param {string} code
     * @memberof MicropythonRepl
     */
    _downloadMainCode(code) {
        return this._downloadScript(this.MAIN_FILENAME, code);
    };
    /**
     * Download python external libraries requested in code.
     * @private
     * @param {string} code
     * @returns {void}
     * @memberof MicropythonRepl
     */
    _downloadExternalLibraries(code) {
        this.hadRequestedLibraries = false;
        const requestedLib = this._getRequestedLibraries(code);
        for (var i = 0; i < requestedLib.length; i++) {
            this.hadRequestedLibraries = true;
            this._downloadScript(requestedLib[i].filename, requestedLib[i].code);
        }
    };
    /**
     * Download a script into board filesystem.
     * @private
     * @param {string} filename
     * @param {string} code
     * @returns {void}
     * @memberof MicropythonRepl
     */
    _downloadScript(filename, code) {
        const chunks = this.serial.chunk(code, this.chunkSize);
        let commands = new Array();
        if (chunks !== null) {
            commands.push(this._MPY_CMD.fs.open(filename, 'w'));
            for (var i = 0; i < chunks.length; i++) {
                let adaptedCode = this._getAdaptedCode(chunks[i]);
                if (adaptedCode[adaptedCode.length - 1] == "\\") {
                    adaptedCode += "\\";
                }
                commands.push("buffer = \"\"\"" + adaptedCode + "\"\"\"");
                commands.push(this._MPY_CMD.fs.write("buffer"));
            }
            commands.push(this._MPY_CMD.fs.close());
            this.enqueueCommandList(commands);
        }
    };
    /**
     * Get adapted code for Micropython this.
     * @private
     * @param {string} code
     * @returns {string} code
     * @memberof MicropythonRepl
     */
    _getAdaptedCode(code) {
        const temp = {
            'r': randHex(),
            'n': randHex(),
            't': randHex()
        };
        // Save \r \n & \t contained in strings
        code = code.replace(/\\r/g, temp['r']).replace(/\\n/g, temp['n']).replace(/\\t/g, temp['t']);
        // Manage accents from strings
        code = code.replace(/\\"/g, '\\\\"').replace(/"/g, '\\"').replace(/\\'/g, "\\\\'").replace(/'/g, "\\'");
        // Manage python lines of code
        code = code.replace(/\r\n/g, "\\r").replace(/\n/g, "\\r").replace(/\\n/g, '\\\\n');
        // Set tabs \t to two spaces | Manage hex strings
        code = code.replace(/\t/g, '  ').replace(/\\x/g, "\\\\x");
        // Restore \r & \n contained in strings
        code = code.replace(new RegExp(temp['r'], 'g'), "\\\\r").replace(new RegExp(temp['n'], 'g'), "\\\\n").replace(new RegExp(temp['t'], 'g'), "\\\\t");
        return code;
    };
    /**
     * Get list of libraries requested by code.
     * @private
     * @param {string} code
     * @returns {Array<Object>} requestedLibs
     * @memberof MicropythonRepl
     */
    _getRequestedLibraries(code, libName) {
        let requestedLibs = new Array();
        for (const lib in this._CUSTOM_LIB) {
            if (libName !== lib) {
                const regExp1 = new RegExp('from ' + lib + ' import');
                const regExp2 = new RegExp('import ' + lib);
                if (regExp1.test(code) || regExp2.test(code)) {
                    requestedLibs.push({
                        filename: lib + ".py",
                        code: this._CUSTOM_LIB[lib]
                    });
                    const requestedDependencies = this._getRequestedLibraries(this._CUSTOM_LIB[lib], lib);
                    requestedLibs = requestedLibs.concat(requestedDependencies);
                }
            }
        }
        return requestedLibs;
    };
    /**
     * Send Micropython command for resetting board.
     * @public
     * @param {string} lib
     * @returns {void}
     * @memberof MicropythonRepl
     */
    resetBoard(lib) {
        const runCmds = [
            this._MPY_CMD.import_library(lib),
            lib + '.reset()'
        ];
        this.enqueueCommandList(runCmds);
    };
    /**
     * Reading loop for printing data read by serial 'dataReceived' yield on console.
     * @public
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async readingLoop() {
        const REPL = '>>> ';
        this.isLoopClosed = false;
        this.readingStatus = {
            isError: false,
            isFirmware13: false
        };
        while (true) {
            if (!this.serial.isConnected) {
                break;
            }
            await this.serial.sleep(50);
            if (!this.isLoopClosed) {
                const { value, done } = await this.serial.read();
                if (done || !value) {
                    if (this.serial.hasToClose) {
                        break;
                    }
                    continue;
                } else {
                    this.buffer += value;
                    if (this.buffer.indexOf('\r') < 0) {
                        continue;
                    }
                    if (this.buffer.includes('\r\n')) {
                        const lines = this.buffer.split('\r\n');
                        for (var i = 0; i < lines.length; i++) {
                            let line = lines[i]
                            if (line) {
                                if (this._checkFirmwarePresence(line)) {
                                    break;
                                }
                                // REPL
                                if (this._isEndOf(line, REPL, 1) && (i == lines.length - 1)) {
                                    await this._manageREPL(line);
                                    break;
                                } else if (new RegExp(REPL).test(line)) {
                                    await this._manageREPL(line.split(REPL)[0] + REPL);
                                    line = line.split(REPL)[1];
                                    if (!line) {
                                        break;
                                    }
                                }
                                // raw REPL
                                if (line.indexOf('... ') === 0) {
                                    this._manageRawRepl(line);
                                    break;
                                }
                                // Paste mode
                                if (this._isEndOf(line, '=== ', 1) || this._isEndOf(line, '=== ', 2)) {
                                    await this._managePasteMode(line);
                                    break;
                                }
                                if (i == lines.length - 1) {
                                    this.buffer = '\r\n' + line;
                                    continue;
                                }
                                // Global variables panel
                                if (/@GlobalVars:/.test(line) && !/print\(/.test(line)) {
                                    this._manageGlobalVars(line);
                                    continue;
                                }
                                // REPL command
                                if (this.isOpen && !/Traceback/.test(line)) {
                                    if (this._manageReplCommand(line)) {
                                        break;
                                    }
                                    continue;
                                }
                                if (/Traceback/.test(line)) {
                                    this.wasOpen = this.isOpen;
                                }
                                this.setRepl(false);
                                this.isRawOpen = false;
                                this._printResponseOnConsole(line + '\r\n');
                                // Graph mode
                                this._manageGraphData(line);
                                // Music mode
                                if (line.match(/^@music:/) && $('#audio-switch').append("On")) {
                                    this._playNote(line);
                                }
                            } else {
                                if (i == lines.length - 1 && !this.isOpen && !this.isRawOpen) {
                                    this.buffer = '\r\n';
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
    * Check if ESP32 boards have micropython firmware.
    * @private
    * @param {string} line
    * @return {boolean} broker
    * @memberof MicropythonRepl
    */
    _checkFirmwarePresence(line) {
        if (/esp\_image\: (C|c)hecksum failed\./.test(line) || /rst\:0x3 \(SW\_RESET\)/.test(line) || /rst\:0x10 \(RTCWDT\_RTC\_RESET\)/.test(line)) {
            this.hasFirmware = false;
        }
        if ((line.match(/ets [A-Za-z]{0,3} ( |)[0-9]{1,2} [0-9]{4} [0-9]{2}\:[0-9]{2}\:[0-9]{2}/) && !this.hasFirmware)
            || line.match(/perform factory reprogramming of MicroPython firmware \(completely erase flash, followed by firmware programming\)./)
            || line.match(/OSError: \[Errno 1\] EPERM/)) {
            this.serial.hasFirmware = false;
            this.hasFirmware = false;
            this._printResponseOnConsole(line);
            InterfaceMonitor.writeConsole('</br>[HELP] Micropython firmware has to be flashed to board. <a href=\"https://vittascience.com/learn/tutorial.php?id=341\" style="color:var(--vitta-blue-dark);" target=\"_blank\" rel=\"noopener noreferrer\">Flashing Esp32 firmware</a>', 'interrupt');
            return true;
        }
    };
    /**
     * Manage REPL mode if serial buffer contains REPL starter.
     * @private
     * @param {string} line
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async _manageREPL(line) {
        if (this.isOpen) {
            this._printResponseOnConsole('\r\n');
        }
        this.isRawOpen = false;
        this.isPasteMode = false;
        this.setRepl(true);
        this._printResponseOnConsole(line);
        if (this.readingStatus.isFirmware13) {
            InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.firmwareWarning'), 'interrupt');
            InterfaceMonitor.writeConsole(">>> ", 'default', true);
            this.readingStatus.isFirmware13 = false;
        }
        this.readingStatus.isError = false;
        this.buffer = "";
        if (!this.readingStatus.isError || this.buffer.match(/KeyboardInterrupt/)) {
            if (!this.Queue.isEmpty()) {
                await this.sendCommand(this.Queue.dequeue());
            } else {
                this.Queue.reset();
            }
        } else {
            this.Queue.reset();
        }
    }
    /**
     * Manage micropython Raw REPL.
     * @private
     * @param {string} line 
     * @returns {void}
     * @memberof MicropythonRepl
     */
    _manageRawRepl(line) {
        if (this.isRawOpen) {
            this._printResponseOnConsole('\r\n');
        }
        this.isRawOpen = true;
        this.rawEmptyCount += 1;
        this._printResponseOnConsole(line);
        if (this.rawEmptyCount < 3) {
            this.isCommand = true;
        }
        if (!this.Queue.isEmpty()) {
            this.sendCommand(this.Queue.dequeue());
        } else {
            this.Queue.reset();
        }
        this.buffer = "";
    };
    /**
     * Manage micropython Paste mode.
     * @private
     * @param {string} line 
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async _managePasteMode(line) {
        this.isPasteMode = true;
        this._printResponseOnConsole(line.replace(/=== \n/g, "=== "));
        if (!this.readingStatus.isError || line.match(/KeyboardInterrupt/)) {
            if (!this.Queue.isEmpty()) {
                await this.sendCommand(this.Queue.dequeue());
            } else {
                this.Queue.reset();
            }
        } else {
            this.Queue.reset();
        }
        this.readingStatus.isError = false;
        this.buffer = "";
    };
    /**
     * Parse global variables from serial data by using '@GlobalVars' command.
     * @private
     * @param {string} line 
     * @returns {void}
     * @memberof MicropythonRepl
     */
    _manageGlobalVars(line) {
        if (Main.getInterface() === "microbit") {
            if (!InterfaceConnection.webusb.isUploading) {
                InterfaceConnection.varPanel.getterExists = true;
            }
        } else {
            if (!this.serial.isDownloading) {
                // TO DO: Global vars for other boards
                //InterfaceConnection.varPanel.getterExists = true;
            }
        }
        if (/refresh/.test(line)) {
            //InterfaceConnection.varPanel.empty(); // TO DO: after css of monitor
        } else {
            const variable = line.replace('@GlobalVars:', "").replace('\r', "").split(" | ");
            if (variable[0] !== 'variablesGetter') {
                InterfaceConnection.varPanel.addVarToPanel({
                    'name': variable[0],
                    'value': variable[1],
                    'type': variable[2]
                });
                InterfaceConnection.varPanel.updateDOM();
            }
            if (variable[0] === 'variablesGetter' && variable[1] == 'True') {
                InterfaceConnection.varPanel.getterActive = true;
            } else if (variable[0] === 'variablesGetter' && variable[1] == 'False') {
                InterfaceConnection.varPanel.getterActive = false;
            }
        }
    };
    /**
     * Manage MicroPython command in REPL.
     * @private
     * @param {string} line 
     * @returns {boolean} hasToClose
     * @memberof MicropythonRepl
     */
    _manageReplCommand(line) {
        this.isCommand = true;
        this._printResponseOnConsole(line + '\r\n');
        if ((/machine.reset\(\)/.test(line) || /exec\(open\(\'main\.py\'\).read\(\),( |)globals\(\)/.test(line))) {
            if (this.serial.hasToClose) {
                InterfaceMonitor.writeConsole(this.EXECUTION_MSG, 'success', true, true);
                this.isLoopClosed = true;
                this.buffer = "";
                return true;
            }
            if (this.serial.isDownloading) {
                InterfaceMonitor.writeConsole(this.FILE_DOWNLOADED, 'success', true, true);
                this.serial.isDownloading = false;
            }
        }
        this.setRepl(false);
    };
    /**
     * Send graph data to chart. It works with the '@Graph' command. It works also without the command.  
     * @param {string} line 
     * @returns {void}
     * @memberof MicropythonRepl
     */
    _manageGraphData(line) {
        const value = parseFloat(line);
        let graph = null;
        if (!isNaN(value)) {
            graph = '@Graph:Console:' + value + '|';
        } else if (line.match(/^@Graph:/)) {
            graph = line;
        }
        if (graph !== null) {
            InterfaceMonitor.sendDataToChart(graph);
        }
    };
    /**
     * Set REPL state and update its button style.
     * @public
     * @param {boolean} state
     * @returns {void}
     * @memberof MicropythonRepl
     */
    setRepl(state) {
        if (this.isOpen != state) {
            this.isOpen = state;
            if (!this.serial.isDownloading) {
                if (!this.isOpen) {
                    $('#repl-control').removeClass("activated");
                } else {
                    $('#repl-control').addClass("activated");
                }
            }
        }
    };
    /**
     * Print received data on console.
     * @private
     * @param {string} response
     * @returns {void}
     * @memberof MicropythonRepl
     */
    _printResponseOnConsole(response) {
        const ansi_up = new AnsiUp;
        const stream = this._getStreamStyle(response);
        const monitor = document.getElementById('console');
        if (this.isCommand && !this.isPasteMode && !this.isRawOpen && !this.readingStatus.isError) {
            let html = ansi_up.ansi_to_html(stream.data);
            if (!this.serial.isDownloading) {
                html = '<b>' + html + '</b>';
            }
            let child = monitor.lastChild;
            if ($(monitor.lastChild).hasClass('error')) {
                child = $(monitor.lastChild).prev();
            }
            $(child).html($(child).html() + html);
            this.rawEmptyCount = 0;
            this.isCommand = false;
            if (/exec\(open\(\'main\.py\'\).read\(\),( |)globals\(\)/.test(stream.data)) {
                InterfaceMonitor.writeConsole(this.EXECUTION_MSG, 'success', true, true);
                if (this.serial.isDownloading) {
                    InterfaceMonitor.writeConsole(this.FILE_DOWNLOADED, 'success', true, true);
                    if (this._code && /@Graph:/.test(this._code)) {
                        InterfaceMonitor.writeConsole('Le programme envoie des données graphiques dans la console.', 'neutral', true);
                    }
                    this.serial.isDownloading = false;
                }
            }
            InterfaceMonitor.scrollToBottom();
            return;
        }
        if ((this.isPasteMode || this.isRawOpen) && !this.readingStatus.isError) {
            $(monitor.lastChild).html($(monitor.lastChild).html() + ansi_up.ansi_to_html(stream.data));
            InterfaceMonitor.scrollToBottom();
            return;
        }
        if (!stream.color) {
            stream.color = 'default';
        }
        if (stream.color == 'interrupt' || stream.color == 'warning') {
            if (!$(monitor.lastChild).hasClass('error')) {
                InterfaceMonitor.writeConsole('</br>' + ansi_up.ansi_to_html(stream.data), stream.color, true, true);
                $(monitor.lastChild).addClass('error');
            } else {
                $(monitor.lastChild).css('color', InterfaceMonitor.TEXT_COLOR[stream.color]);
                $(monitor.lastChild).html($(monitor.lastChild).html() + ansi_up.ansi_to_html(stream.data));
            }
            if (/Stop global variables getter./.test(stream.data)) {
                if (this.wasOpen) {
                    const lastReplPre = $(monitor.lastChild).prev();
                    $(monitor.lastChild).prev().remove();
                    $(monitor).append(lastReplPre);
                    this.setRepl(true);
                }
            }
            InterfaceMonitor.scrollToBottom();
            if (/OSError: -202/.test(stream.data)) {
                InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.internetAccess'), 'interrupt', true);
                InterfaceMonitor.writeConsole('[HELP] To find the gateway of network on Windows, use <b>ipconfig</b> command in a prompt.</br>', 'interrupt', true);
            }
            if (/AssertionError: auth error /.test(stream.data)) {
                InterfaceMonitor.writeConsole('[HELP] Unable to connect to your mailbox. Let\'s see tutorial for more informations: <a href=\"https://vittascience.com/learn/tutorial.php?id=1030\" style="color:var(--vitta-blue-dark);" target=\"_blank\" rel=\"noopener noreferrer\">Send E-mail with ESP32</a> ', 'interrupt', true);
            }
        } else {
            InterfaceMonitor.writeConsole(ansi_up.ansi_to_html(stream.data).replace(/>/g, "& gt;").replace(/</g, "& lt;"), stream.color, true, stream.bold);
            if (/Brownout detector was triggered/.test(stream.data)) {
                InterfaceMonitor.writeConsole('The power supply of your Esp32 by USB port is insufficient. Connect an external power supply.</br>', 'warning');
            }
        }
        if (!this.isOpen && stream.data && stream.data.includes('Utilisez CTRL-D pour relancer.')) {
            this.open();
        }
    };
    /**
     * Play note from response on navigator.
     * @private
     * @param {string} response
     * @returns {void}
     * @memberof MicropythonRepl
     */
    _playNote(response) {
        playMusic(response.replace("@music:", "").replace("|", ""));
    };
    /**
     * Get array of stream from response and its color for console.
     * @private
     * @param {string} response
     * @returns {Array<Object>}
     * @memberof MicropythonRepl
     */
    _getStreamStyle(response) {
        const stream = {
            data: response
        };
        if (/Traceback/.test(response)) {
            stream.color = 'warning';
            this.readingStatus.isError = true;
            this.readingStatus.color = 'warning';
        } else if (/(KeyboardInterrupt|Stop global variables getter.)/.test(response) && this.readingStatus.isError) {
            stream.color = 'interrupt';
            this.readingStatus.color = 'interrupt';
            this.readingStatus.isError = false;
        } else if (this.readingStatus.isError) {
            if (this.isOpen) {
                this.readingStatus.isError = false;
            } else {
                stream.color = this.readingStatus.color;
            }
        } else if (!this.serial.isDownloading && /Warning: (I2C|LCD)/.test(response)) {
            stream.color = 'interrupt';
        }
        return stream;
    };
    /**
     * Check if line found at the end of serial buffer.
     * @private
     * @param {string} buffer
     * @param {string} line
     * @param {int} index
     * @returns {boolean}
     * @memberof MicropythonRepl
     */
    _isEndOf(buffer, line, index) {
        const strSplitted = buffer.split('\n');
        if (strSplitted[strSplitted.length - index] === line) {
            return true;
        } else {
            return false;
        }
    };

}

class Queue {
    constructor() {
        this.data = [];
        this.rear = 0;
    }
    enqueue(element) {
        this.data[this.rear] = element;
        this.rear = this.rear + 1;
    };
    length() {
        return this.rear;
    }
    isEmpty() {
        return this.rear === 0;
    }
    dequeue() {
        if (this.isEmpty() === false) {
            this.rear = this.rear - 1;
            return this.data.shift();
        }
    };
    reset() {
        this.data = [];
        this.rear = 0;
    };
}

/**
 * @class VariablesPanel
 */
class VariablesPanel {
    /**
     * Creates an instance of VariablesPanel.
     * @private
     */
    constructor(repl) {
        this.repl = repl
        this.variables = []
        this.isOpen = false
        this.wasREPLOpen = false
        this.getterExists = false
        this.getterActive = false
    }
    /**
     * Empty the variables panel table.
     */
    empty() {
        this.variables = [];
        this.updateDOM();
    };
    /**
     * Close the variables panel.
     */
    async close() {
        if (this.getterActive) {
            await this.toggleGetter();
            await waitFor(_ => this.getterActive === false);
        }
        if (this.isOpen) {
            this.setVariablesPanel(false);
        }
        this.getterExists = false;
        this.empty();
    };
    /**
     * Append tuple to table of variables panel.
     * @param {Object} variable 
     */
    addVarToPanel(variable) {
        let flagUnique = true;
        for (var index in this.variables) {
            if (this.variables[index].name == variable.name) {
                flagUnique = false;
                if (this.variables[index].value != variable.value) {
                    this.variables[index].value = variable.value;
                } else continue;
            }
        }
        if (flagUnique) {
            this.variables.push(variable);
        }
    }
    /**
     * Update variables panel DOM.
     */
    updateDOM() {
        $("#variables-table-body-repl").html('');
        if (this.variables.length === 0) {
            const emptyMessage = jsonPath('code.simulator.messages.variables-panel-msg')
            $("#variables-table-body-repl").append('<tr><td colspan="3">' + emptyMessage + '</td></tr>');
        } else {
            for (var v in this.variables) {
                if (this.variables[v].value !== undefined) {
                    const varHtml = '<tr><td>' + this.variables[v].name + '</td>'
                        + '<td>' + String(this.variables[v].value).slice(0, 17) + '</td>'
                        + '<td>' + this.variables[v].type.split('\'')[1].split('\'')[0] + '</td></tr>';
                    $("#variables-table-body-repl").append(varHtml);
                }
            }
        }
    }
    /**
     * Start variables getter by opening REPL.
     * @param {Array<String>} commands 
     */
    async toggleGetter(commands) {
        this.wasREPLOpen = false;
        if (this.repl.isOpen) {
            this.wasREPLOpen = true;
        }
        await InterfaceConnection.openRepl(true);
        if (!this.getterActive) {
            if (this.getterExists) {
                this.repl.enqueueCommand("runVariablesGetter()");
            } else {
                await this.repl.open_paste_mode();
                this.repl.enqueueCommandList(commands);
                this.repl.enqueueCommand(this.repl.CLOSE_PASTE_MODE, false);
            }
            if (!this.wasREPLOpen) {
                this.repl.runFile();
            } else {
                await this.repl.sendCommand(this.repl.Queue.dequeue());
            }
        } else {
            this.repl.enqueueCommand("variablesGetter = False");
            await this.repl.sendCommand(this.repl.Queue.dequeue());
        }
    };
    /**
     * Enable/Disable global variables panel on monitor.
     * @param {boolean} state 
     */
    setVariablesPanel(state) {
        this.isOpen = state;
        let storageConsole = {
            [Main.getInterface()]: 'bottom' /* Default value */
        };
        const consoleMode = localStorage.getItem('console');
        if (consoleMode && JSON.parse(consoleMode)) {
            storageConsole = JSON.parse(consoleMode);
        }
        const divID = '#monitor-debugger';
        if (storageConsole[Main.getInterface()] === 'right') {
            monitorWindowTransition(divID, 'height');
        } else {
            monitorWindowTransition(divID, 'width');
        }
        if (this.isOpen) {
            $('#repl-variables').addClass("activated");
            $(divID).show();
            if ($('#monitor-content').hasClass('monitor-grid-right')) {
                $('#monitor-view').removeClass('monitor-view-split-bottom-debug');
                $('#monitor-view').removeClass('monitor-view-split-right');
                $('#monitor-view').addClass('monitor-view-split-right-debug');
            } else {
                $('#monitor-view').removeClass('monitor-view-split-right-debug');
                $('#monitor-view').removeClass('monitor-view-split-bottom');
                $('#monitor-view').addClass('monitor-view-split-bottom-debug');
            }
        } else {
            $('#repl-variables').removeClass("activated");
            $(divID).hide();
            if ($('#monitor-view').hasClass('monitor-view-split-bottom-debug')) {
                $('#monitor-view').addClass('monitor-view-split-bottom');
                $('#monitor-view').removeClass('monitor-view-split-bottom-debug');
            } else {
                $('#monitor-view').addClass('monitor-view-split-right');
                $('#monitor-view').removeClass('monitor-view-split-right-debug');
            }
        }
    }
}