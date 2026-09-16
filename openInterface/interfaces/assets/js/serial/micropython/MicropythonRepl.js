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
        this.EXECUTION_MSG = jsonPath('code.repl.codeExecution');
        this.FILE_DOWNLOADED = jsonPath('code.serialAPI.fileDownloaded');
        this.BLOCK_BYTE = 1024;

        this.serial = serial;
        this.isOpen = false;
        this.wasOpen = false;
        this.isRawOpen = false;
        this.isPasteMode = false;
        this.hasFirmware = true;
        this.isCommand = false;
        this.isLoopClosed = true;
        this.rawEmptyCount = 0;
        this.readingLastResponse = false;
        this.commandResponse = null;
        this.requestCmd = null;
        this.buffer = "";
        this._code = "";
        this.readingStatus = {};
        this.internalLibraries = {};
        this.libDownloaderReady = false;
        this._FSlibrariesCollectedResolve = null;
        this._FSlibrariesRemovedResolve = null;
        this._FSwebFilesUploadedResolve = null;
        this._FSlibrarySingleDownloadResolve = null;
        this._FileUploadedResolve = null;
        this._progressHideTimeout = null;
        this.upload_t0 = null;
        this.readingDelay = 50;
        this.libAlreadyInFs = [];
        this.variablesGetterRequested = false;
        this.ansi_up = new AnsiUp;
        if (options.progressBar !== null || options.progressBar) {
            this.progressBar = new ProgressBar();
            this.progressBar.addProgressBarToDom();
        }

        this.boardName = options.boardName || 'Unknown';
        this.writeChunkSize = options.writeChunkSize || 0.25; // KiB
        this.readChunkSize = options.readChunkSize || 1; // KiB
        this.readingDelayPerKiB = options.readingDelayPerKiB || 100; // ms
        this.libReaderType = options.libReaderType || "chunk";
        this.variablesGetterTimeout = options.variablesGetterTimeout || 1000; // ms
        this.defaultFsPath = options.defaultFsPath ?? '/';
        this.CMDS = {
            LIB_GETTER_START: "[CMD_LIB_GETTER_START]",
            FS_LIB_REMOVED: "[CMD_FS_LIB_REMOVED]",
            LIB_LINE: "[CMD_LIB_LINE]",
            LIB_CHUNK: "[CMD_LIB_CHUNK]",
            LIB_START: "[CMD_LIB_START]",
            LIB_ERROR: "[CMD_LIB_ERROR]",
            LIB_END: "[CMD_LIB_END]",
            LIB_GETTER_END: "[CMD_LIB_GETTER_END]",
            FS_JS_CSS_FILES_UPLOADED: "[CMD_FS_JS_CSS_FILES_UPLOADED]",
            JS_UPLOAD_ERROR: "[CMD_JS_UPLOAD_ERROR]",
            CSS_UPLOAD_ERROR: "[CMD_CSS_UPLOAD_ERROR]",
            FILE_WRITING_START: "[CMD_FILE_WRITING_START]",
            FILE_UPLOADED: "[CMD_FILE_UPLOADED]"
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
        this.VG_FILENAME = 'variables_getter.py';
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
    async sendCommand(cmd, waitingResponse = false) {
        if (waitingResponse) {
            this.requestCmd = cmd;
        }
        await this.write(cmd);
        if (this.requestCmd !== null) {
            await waitFor(_ => this.commandResponse != null, 20);
            return this.commandResponse;
        }
    };
    /**
     * Open micropython paste mode and send commands list.
     * @public
     * @param {Array<string>} commands
     * @return {void}
     * @memberof MicropythonRepl
     */
    async sendPasteCommand(commands) {
        if (!this.isOpen) {
            await this.open();
            await sleep_ms(100);
        }
        this.enqueueCommand(this.OPEN_PASTE_MODE, false);
        this.enqueueCommandList(commands);
        this.enqueueCommand(this.CLOSE_PASTE_MODE, false);
        await this.sendCommand(this.Queue.dequeue());
    };
    /**
     * Add Micropython command in Queue.
     * @public
     * @param {string} cmd
     * @param {boolean} ender [OPTIONAL]
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
     * Download python user code.
     * @public
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async uploadUserCode(code) {
        this._code = code;
        const requestedLibs = this._getRequestedLibraries(this._code);
        // Download libs from board FS
        await this.downloadLibrariesFromFS(requestedLibs);
        // Remove unused libs in board FS
        await this._removeLibrariesFromFS(requestedLibs);
        // Upload script.js & style.css in FS
        if (["esp32", "m5stack", "galaxia", "pico"].includes(Main.getInterface())) {
            await this._upload_JS_CSS_files();
        }
        // Upload new requested libs
        this.gotNewLibraries = false;
        this._uploadExternalLibraries(requestedLibs);
        // Upload main.py
        const commands = this._scriptUploaderCommands(this.MAIN_FILENAME, this._code);
        this.enqueueCommandList(commands);
        const memoryCmds = [
            this._MPY_CMD.import_library('gc') + '; ' + this._MPY_CMD.getFreeMemory(),
            this._MPY_CMD.import_library('os') + `; s = os.statvfs('${this.defaultFsPath}'); total_bytes = s[1] * s[2]; used_bytes = total_bytes - s[1] * s[3]; print("[HELP] Contenu du stockage de fichiers: " + str(os.listdir())); print("[HELP] L'espace de stockage est utilisé à {} % (soit {} KiB). La carte ${this.boardName} a un total de {} KiB.".format(round(100*used_bytes / total_bytes), round(used_bytes/1024), round(total_bytes/1024)))`
        ];
        this.enqueueCommandList(memoryCmds);
    };
    /**
     * Download python external libraries requested in code.
     * @private
     * @param {Object} requestedLibs
     * @returns {void}
     * @memberof MicropythonRepl
     */
    _uploadExternalLibraries(requestedLibs) {
        for (var i = 0; i < requestedLibs.length; i++) {
            if (!this.libAlreadyInFs.includes(requestedLibs[i].filename)) {
                delete this.internalLibraries[requestedLibs[i].filename];
                this.gotNewLibraries = true;
                const commands = this._scriptUploaderCommands(requestedLibs[i].filename, requestedLibs[i].code);
                this.enqueueCommandList(commands);
            }
        }
    };
    /**
     * Get libraries from board FS.
     * @private
     * @param {Object} requestedLibs
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async _removeLibrariesFromFS(requestedLibs) {
        let commands = [
            "import os",
            "def mpy_removeLibrariesFromFS():",
            "  print(os.uname())"
        ];
        let scripts = "  scripts = ['main.py'";
        if (["esp32", "m5stack", "galaxia", "pico"].includes(Main.getInterface())) {
            scripts += ",'vitta_script.js','vitta_style.css','client.js'";
        }
        this.libAlreadyInFs = [];
        const FSlibraries = Object.keys(this.internalLibraries);
        for (const libName of FSlibraries) {
            if (!VittaInterface.externalLibraries[libName.replace('.py', '')]) {
                continue;
            }
            const requestedLibOnline = requestedLibs.find(l => l.filename === libName);
            if (requestedLibOnline && this.internalLibraries[libName]) {
                const onlineLib = this._normalizePythonSource(requestedLibOnline.code);
                const fsLib = this._normalizePythonSource(this.internalLibraries[libName]);
                if (fsLib === onlineLib) {
                    this.libAlreadyInFs.push(libName);
                }
            }
            if (!this.libAlreadyInFs.includes(libName)) {
                scripts += ",'" + libName + "'";
                delete this.internalLibraries[libName];
            }
        }
        const filteredUnusedLib = Object.keys(VittaInterface.externalLibraries).map(lib => lib + '.py')
            .filter(lib => !requestedLibs.map(lib => lib.filename).includes(lib))
            .filter(lib => lib !== this.VG_FILENAME);
        const filteredUnusedLibArr = "['" + filteredUnusedLib.join('\',\'') + "']";
        scripts += "]";
        commands.push(scripts)
        commands = commands.concat([
            "  for i in os.listdir():",
            "    if i in scripts or i in " + filteredUnusedLibArr + ":",
            "      print('Removing ' + i)",
            "      os.remove(i)",
            "  print(os.listdir())"
        ]);

        commands.push("mpy_removeLibrariesFromFS()");
        commands.push(`print('${this.CMDS.FS_LIB_REMOVED}')`);
        await this.sendPasteCommand(commands);
        await new Promise(resolve => { this._FSlibrariesRemovedResolve = resolve; });
    };
    /**
     * Get library downloader commands.
     * @private
     * @returns {Array<string>} commands
     * @memberof MicropythonRepl
     */
    _libraryDownloaderCommands() {
        const readChunkSizeBytes = Math.round(this.readChunkSize * this.BLOCK_BYTE);
        const readingDelay = Math.max(20, Math.ceil(this.readChunkSize * this.readingDelayPerKiB));
        const reader = {
            "full": [
                "    file = open(filename, 'r')",
                "    print(file.read())",
            ],
            "line": [
                "    file = open(filename, 'r')",
                "    for line in file:",
                `      print('${this.CMDS.LIB_LINE}' + line.rstrip('\\r\\n'))`,
                "      time.sleep(" + readingDelay / 1000 + ")"
            ],
            "chunk": [
                "    import binascii",
                "    file = open(filename, 'rb')",
                "    while True:",
                "      chunk = file.read(" + readChunkSizeBytes + ")",
                "      if not chunk: break",
                `      print('${this.CMDS.LIB_CHUNK}' + binascii.hexlify(chunk).decode())`,
                "      time.sleep(" + readingDelay / 1000 + ")"
            ]
        };

        if (INTERFACE_NAME === 'microbit') {
            reader.chunk = [
                "    def _to_hex(data):",
                "      hex_chars = '0123456789abcdef'",
                "      out = ''",
                "      for b in data:",
                "        out += hex_chars[(b >> 4) & 15]",
                "        out += hex_chars[b & 15]",
                "      return out",
                "    file = open(filename, 'rb')",
                "    while True:",
                "      chunk = file.read(" + readChunkSizeBytes + ")",
                "      if not chunk: break",
                `      print('${this.CMDS.LIB_CHUNK}' + _to_hex(chunk))`,
                "      time.sleep(" + readingDelay / 1000 + ")"
            ];
        }

        let commands = [
            "import os",
            "def _readFileFromFS(filename):",
            "  try:",
            "    import time",
            `    print('${this.CMDS.LIB_START}' + filename + ':' + str(os.stat(filename)[6]) + '\\n')`,
        ];
        commands = commands.concat(reader[this.libReaderType]);
        commands = commands.concat([
            "    file.close()",
            "  except Exception as e:",
            `    print('${this.CMDS.LIB_ERROR}%s:%r' % (filename, e))`,
            `  print('${this.CMDS.LIB_END}' + filename)`
        ]);
        return commands;
    };
    /**
     * Get library from board FS.
     * @public
     * @param {string} filename
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async downloadLibraryFromFS(path, showProgress = true) {
        this._singleLibCollecting = true;
        this._singleLibContent = '';
        this._chunkBuffer = '';
        this._singleLibBytes = [];

        if (showProgress) {
            this.serial.isDownloading = true;
            this.progressBar.displayProgressBar(jsonPath('code.repl.progressBar.fileReading') + ` <b>${path}</b> ...`);
            this.progressBar.updateProgressBar(0);
        }

        let commands = [`_readFileFromFS('${path}')`];
        if (!this.libDownloaderReady) {
            commands = this._libraryDownloaderCommands().concat(commands);
        }

        try {
            await this.sendPasteCommand(commands);
            return await new Promise(resolve => {
                this._FSlibrarySingleDownloadResolve = resolve;
            });
        } finally {
            if (showProgress) {
                this.serial.isDownloading = false;
                this.progressBar.updateProgressBar(100);
                this.progressBar.hideProgressBar(50);
            }
        }
    };
    /**
     * Get libraries from board FS.
     * @public
     * @param {Object} requestedLibs
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async downloadLibrariesFromFS(requestedLibs) {
        const requestLibsArr = "['" + this.VG_FILENAME + "', '" + requestedLibs.map(lib => lib.filename).join('\',\'') + "']";
        const FSlibrariesArr = "['" + Object.keys(this.internalLibraries).join('\',\'') + "']";
        let commands = [
            "def runLibrariesGetter():",
            `  print('${this.CMDS.LIB_GETTER_START}')`,
            "  for f in os.listdir():",
            "    if f.endswith('.py') and f not in " + FSlibrariesArr + " and f in " + requestLibsArr + ":",
            "      _readFileFromFS(f)",
            "runLibrariesGetter()",
            `print('${this.CMDS.LIB_GETTER_END}')`,
        ];
        if (this.libDownloaderReady) {
            await this.sendPasteCommand(commands);
        } else {
            const libCommands = this._libraryDownloaderCommands();
            await this.sendPasteCommand(libCommands.concat(commands));
        }
        await new Promise(resolve => { this._FSlibrariesCollectedResolve = resolve; });
    };
    /**
     * Upload script.js and style.css files, generated by blocks, into FS board.
     * @private
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async _upload_JS_CSS_files() {
        let commands = [];
        const isServerMode = Blockly.Python.esp32.getProgrammingMode().mode == Blockly.Python.esp32.MODE_SERVER;
        if (isServerMode) {
            const jsCodes = Blockly.Python.convertObjectInLists(Blockly.Python.jsCodes_);
            const cssStyles = Blockly.Python.convertObjectInLists(Blockly.Python.cssStyles_);
            if (jsCodes.length) {
                commands = commands.concat(InterfaceConnection.writeJavascriptFile(jsCodes));
            }
            if (cssStyles.length) {
                commands = commands.concat(InterfaceConnection.writeCssFile(cssStyles));
            }
            if (commands.length) {
                commands = commands.concat(`print('${this.CMDS.FS_JS_CSS_FILES_UPLOADED}')`);
                await this.sendPasteCommand(commands);
                await new Promise(resolve => { this._FSwebFilesUploadedResolve = resolve; });
            }
        }
    };
    /**
     * Get commands for uploading a script into board FS.
     * @private
     * @param {string} filename
     * @param {string} code
     * @returns {Array<string>} commands
     * @memberof MicropythonRepl
     */
    _scriptUploaderCommands(filename, code) {
        const chunkLength = Math.round(this.writeChunkSize * this.BLOCK_BYTE);
        const commands = [];
        commands.push(`f = open(${JSON.stringify(filename)}, "w")`);
        if (code && code.length > 0) {
            const chunks = this._chunk(code, chunkLength);
            if (chunks && chunks.length > 0) {
                for (let i = 0; i < chunks.length; i++) {
                    commands.push(`f.write(${JSON.stringify(chunks[i])})`);
                }
            }
        }
        commands.push("f.close()");
        return commands;
    };
    /**
     * Upload a script into board filesystem.
     * @public
     * @param {string} filename
     * @param {string} code
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async uploadScriptToFS(filename, code) {
        const commands = this._scriptUploaderCommands(filename, code);
        this.enqueueCommandList(commands.concat(`print('${this.CMDS.FILE_UPLOADED}')`));
        this.serial.isDownloading = true;
        this.progressBar.displayProgressBar(jsonPath('code.repl.progressBar.uploadFile') + ' <b>' + filename + '</b> ...');
        if (this.isOpen) {
            await this.sendCommand(this.Queue.dequeue());
        } else {
            await this.open();
        }
        await new Promise(resolve => { this._FileUploadedResolve = resolve; });
        this.serial.isDownloading = false;
        this.progressBar.hideProgressBar(50);
    };
    /**
     * Get binary file uploader commands for default boards.
     * @public
     * @param {string} filename
     * @param {Uint8Array} uint8Array
     * @returns {Array<string>}
     * @memberof MicropythonRepl
     */
    _binaryUploaderCommands(filename, uint8Array) {
        const b64 = uint8ToBase64(uint8Array);
        const chunkLength = Math.round(this.writeChunkSize * this.BLOCK_BYTE);

        const commands = [
            this._MPY_CMD.import_library('binascii'),
            this._MPY_CMD.fs.open(filename, 'wb')
        ];

        for (let i = 0; i < b64.length; i += chunkLength) {
            const part = b64.slice(i, i + chunkLength);
            commands.push(`_ = ${this._MPY_CMD.fs.write(`binascii.a2b_base64("${part}")`)}`);
        }
        commands.push(this._MPY_CMD.fs.close());
        return commands;
    };
    /**
     * Upload binary file into board filesystem for microbit.
     * @public
     * @param {string} filename
     * @param {Uint8Array} uint8Array
     * @returns {Array<string>}
     * @memberof MicropythonRepl
     */
    async mb_binaryUploaderCommands(filename, uint8Array) {
        const b64decoder = `
def base64_decode(data):
  base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  data = data.replace(" ", "").replace("\\n", "")
  padding = '=' * ((4 - len(data) % 4) % 4)
  data += padding
  for char in data:
    if char not in base64_chars and char != '=':raise ValueError("Invalid character found in Base64 string: " + str(char))
  decoded_data = bytearray()
  for i in range(0, len(data), 4):
    block = data[i:i+4]
    num = 0
    padding_count = block.count('=')
    for char in block:
      if char == '=':num = num << 6
      else:num = (num << 6) | base64_chars.index(char)
    decoded_data.append((num >> 16) & 0xFF)
    if padding_count < 2:decoded_data.append((num >> 8) & 0xFF)
    if padding_count < 1:decoded_data.append(num & 0xFF)
  return decoded_data`;
        await this.sendCommand(`exec(${JSON.stringify(b64decoder)})` + this.END_MPY_CMD);
        const b64 = uint8ToBase64(uint8Array);
        const chunkLength = Math.round(this.writeChunkSize / 4 * this.BLOCK_BYTE);
        const commands = [];
        commands.push(this._MPY_CMD.fs.open(filename, 'wb'));
        for (let i = 0; i < b64.length; i += chunkLength) {
            const part = b64.slice(i, i + chunkLength);
            commands.push(`_ = ${this._MPY_CMD.fs.write(`base64_decode("${part}")`)}`);
        }
        commands.push(this._MPY_CMD.fs.close());
        return commands;
    };
    /**
     * Upload binary file into board filesystem.
     * @public
     * @param {string} filename
     * @param {Uint8Array} uint8Array
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async uploadBinaryToFS(filename, uint8Array, retries = 2) {
        if (!this.isOpen) {
            await this.open();
            await waitFor(_ => this.isOpen === true, 50);
        }
        //this.isUploadingBinary = true;

        let commands;
        if (INTERFACE_NAME == 'microbit') {
            commands = await this.mb_binaryUploaderCommands(filename, uint8Array);
        } else {
            commands = this._binaryUploaderCommands(filename, uint8Array);
        }
        commands.push(`print('${this.CMDS.FILE_UPLOADED}')`);

        this.Queue.reset();
        this.enqueueCommandList(commands);

        this.serial.isDownloading = true;
        this.progressBar.displayProgressBar(jsonPath('code.repl.progressBar.uploadFile') + ' ' + filename + ' ...');
        await this.sendCommand(this.Queue.dequeue());
        await new Promise(resolve => { this._FileUploadedResolve = resolve; });

        this.serial.isDownloading = false;
        this.progressBar.hideProgressBar(50);
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
        const vg_lib = this._CUSTOM_LIB['variables_getter'];
        if (this.variablesGetterRequested && vg_lib) {
            requestedLibs.push({
                filename: this.VG_FILENAME,
                code: vg_lib
            });
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
    resetBoard(lib, soft = false) {
        const runCmds = [
            this._MPY_CMD.import_library(lib),
            lib + '.' + (soft ? 'soft_' : '') + 'reset()'
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
            await this.serial.sleep(this.readingDelay);
            if (!this.isLoopClosed) {
                const { value, done } = await this.serial.read();
                if (done || !value) {
                    if (this.serial.hasToClose) {
                        break;
                    }
                    continue;
                } else {
                    this.buffer += value;
                    //console.log(value)
                    if (this.buffer.indexOf('\r') < 0) {
                        continue;
                    }
                    if (this.buffer.includes(this.END_MPY_CMD)) {
                        const lines = this.buffer.split(this.END_MPY_CMD);
                        for (var i = 0; i < lines.length; i++) {
                            let line = lines[i];
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
                                    if (!line && this.isCommand) {
                                        break;
                                    }
                                }
                                if (!this.isCommand) {
                                    if (line.includes(this.CMDS.FILE_UPLOADED)) {
                                        this._FileUploadedResolve?.();
                                        this._FileUploadedResolve = null;
                                        continue;
                                    }
                                }
                                // raw REPL
                                if (line.indexOf('... ') === 0) {
                                    await this._manageRawRepl(line);
                                    break;
                                }
                                // Paste mode
                                if (this._isEndOf(line, '=== ', 1) || this._isEndOf(line, '=== ', 2)) {
                                    await this._managePasteMode(line);
                                    break;
                                }
                                if (i == lines.length - 1) {
                                    this.buffer = this.END_MPY_CMD + line;
                                    continue;
                                }
                                // Global variables panel
                                if (!/print\(/.test(line)) {
                                    if (/@GlobalVarsRefresh/.test(line) || /@GlobalVarsHex:/.test(line) || /@GlobalVarsStop./.test(line)) {
                                        this._manageGlobalVars(line);
                                        continue;
                                    }
                                }
                                if (!this.isPasteMode) {
                                    // Collecting libs
                                    this._manageLibrariesCollector(line);
                                    if (this._collectingLibs) {
                                        continue;
                                    };
                                    if (line.includes(this.CMDS.FS_LIB_REMOVED)) {
                                        this._FSlibrariesRemovedResolve?.();
                                        this._FSlibrariesRemovedResolve = null;
                                        continue;
                                    }
                                    // uploading web files
                                    if (this.serial.isDownloading) {
                                        if (line.includes(this.CMDS.FS_JS_CSS_FILES_UPLOADED)) {
                                            this._FSwebFilesUploadedResolve?.();
                                            this._FSwebFilesUploadedResolve = null;
                                            continue;
                                        } else if (line.includes(this.CMDS.JS_UPLOAD_ERROR)) {
                                            InterfaceMonitor.writeConsole(jsonPath('code.repl.help.jsFileError'), 'interrupt', true, true);
                                        } else if (line.includes(this.CMDS.CSS_UPLOAD_ERROR)) {
                                            InterfaceMonitor.writeConsole(jsonPath('code.repl.help.cssFileError'), 'interrupt', true, true);
                                        }
                                    }
                                } else {
                                    if (/def _readFileFromFS\(/.test(line)) {
                                        this.libDownloaderReady = true;
                                    }
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
                                this._printResponseOnConsole(line + this.END_MPY_CMD);
                                // Graph mode
                                this._manageGraphData(line);
                                // Music mode
                                if (line.match(/^@music:/) && $('#audio-switch').append("On")) {
                                    this._playNote(line);
                                }
                            } else {
                                if (i == lines.length - 1 && !this.isOpen && !this.isRawOpen) {
                                    this.buffer = this.END_MPY_CMD;
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
            InterfaceMonitor.writeConsole('</br>' + jsonPath('code.repl.help.flashFirmware') + ' ' + setClickableLink("https://vittascience.com/learn/tutorial.php?id=341", 'Flashing Esp32 firmware'), 'interrupt', true);
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
            this._printResponseOnConsole(this.END_MPY_CMD);
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
        if (!this.Queue.isEmpty()) {
            await this.sendCommand(this.Queue.dequeue());
        } else {
            this.Queue.reset();
        }
        if (this.serial.isDownloading) {
            const percent = (1 - this.Queue.length() / this.Queue.maxLength) * 100;
            if (!isNaN(percent)) {
                this.progressBar.updateProgressBar(Math.round(percent));
            }
        }
    }
    /**
     * Manage micropython Raw REPL.
     * @private
     * @param {string} line 
     * @returns {void}
     * @memberof MicropythonRepl
     */
    async _manageRawRepl(line) {
        if (this.isRawOpen) {
            this._printResponseOnConsole(this.END_MPY_CMD);
        }
        this.isRawOpen = true;
        this.rawEmptyCount += 1;
        this._printResponseOnConsole(line);
        if (this.rawEmptyCount < 3) {
            this.isCommand = true;
        } else {
            this.isCommand = false;
        }
        if (!this.Queue.isEmpty()) {
            await this.sendCommand(this.Queue.dequeue());
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
                const cmd = this.Queue.dequeue();
                if (cmd == this.CLOSE_PASTE_MODE) {
                    this.isPasteMode = false;
                }
                const chunkLength = Math.round(this.writeChunkSize * this.BLOCK_BYTE);
                if (cmd.length > chunkLength) {
                    const chunks = this._chunk(cmd, chunkLength);
                    if (!chunks || !chunks.length) {
                        InterfaceMonitor.writeConsole(jsonPath('code.repl.commandError'), 'warning', true, true);
                        return;
                    }
                    for (let i = 0; i < chunks.length; i++) {
                        await this.sendCommand(chunks[i]);
                        await sleep_ms(50);
                    }
                } else {
                    await this.sendCommand(cmd);
                }
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
                InterfaceConnection.varPanel.getterExists = true;
            }
        }
        if (line.trim() === '@GlobalVarsStop.') {
            InterfaceConnection.varPanel.getterActive = false;
            return;
        }
        if (InterfaceConnection.varPanel.isOpen) {
            if (line.trim() === '@GlobalVarsRefresh') {
                return;
            }
            if (line.startsWith('@GlobalVarsDeleted:')) {
                const name = line.slice('@GlobalVarsDeleted:'.length).trim();
                InterfaceConnection.varPanel.variables =
                    InterfaceConnection.varPanel.variables.filter(v => v.name !== name);
                InterfaceConnection.varPanel.updateDOM();
                return;
            }
            if (line.startsWith('@GlobalVarsHex:')) {
                const hex = line.slice('@GlobalVarsHex:'.length).trim();
                let payload = '';
                try {
                    payload = this._decodeHexChunk(hex);
                } catch (e) {
                    console.warn('Invalid hex payload:', line, e);
                    return;
                }
                const variable = payload.split('|');
                if (variable.length < 3) {
                    console.warn('Malformed decoded global var line:', payload);
                    return;
                }
                const name = variable[0].trim();
                const value = variable[1];
                const type = variable.slice(2).join('|').trim();

                if (name !== 'getterActive') {
                    InterfaceConnection.varPanel.addVarToPanel({
                        name, value, type
                    });
                    InterfaceConnection.varPanel.updateDOM();
                }

                if (name === 'getterActive' && value == 'True') {
                    InterfaceConnection.varPanel.getterActive = true;
                }
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
        this._printResponseOnConsole(line + this.END_MPY_CMD);
        if (line.length < 63 && (/machine.(soft_|)reset\(\)/.test(line) || /exec\(open\(\'main\.py\'\).read\(\),( |)globals\(\)/.test(line))) {
            if (/machine.(soft_|)reset\(\)/.test(line) && InterfaceConnection.varPanel.isOpen) {
                InterfaceConnection.varPanel.reset();
            }
            this.libDownloaderReady = false;
            if (this.serial.hasToClose) {
                InterfaceMonitor.writeConsole(this.EXECUTION_MSG, 'success', true, true);
                this.isLoopClosed = true;
                this.buffer = "";
                return true;
            }
            this._finishUploading();
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
    _updateLibProgress() {
        if (!this.serial.isDownloading || !this._currentLibLength) {
            return;
        }
        const percent = Math.min(100, Math.round((this._currentLibRead / this._currentLibLength) * 100));
        if (!isNaN(percent)) {
            this.progressBar.updateProgressBar(percent);
        }
    };
    /**
     * Collect internal libraries from FS.
     * @param {string} line 
     * @returns {void}
     * @memberof MicropythonRepl
     */
    _manageLibrariesCollector(line) {
        line = line.replace(/\r$/, '');

        // === global collecting mode : start ===
        if (line.includes(this.CMDS.LIB_GETTER_START)) {
            this._collectingLibs = true;
            this._currentLibName = null;
            this._currentLibLength = 0;
            this._currentLibRead = 0;
            return;
        }

        if (!this._collectingLibs && !this._singleLibCollecting) return;

        // === global colelcting mode : end ===
        if (line.includes(this.CMDS.LIB_GETTER_END)) {
            this._collectingLibs = false;
            this._currentLibName = null;
            this._currentLibLength = 0;
            this._currentLibRead = 0;
            InterfaceMonitor.writeConsole(jsonPath('code.repl.libCollectingEnd'), 'neutral', true, true);
            this._FSlibrariesCollectedResolve?.();
            this._FSlibrariesCollectedResolve = null;
            return;
        }

        // === file start ===
        if (line.startsWith(this.CMDS.LIB_START)) {
            const currentLib = line.replace(this.CMDS.LIB_START, '').split(':');
            this._currentLibName = currentLib[0];
            this._currentLibLength = parseInt(currentLib[1], 10) || 0;
            this._currentLibRead = 0;

            if (this._singleLibCollecting) {
                this._singleLibContent = '';
            } else {
                this.internalLibraries[this._currentLibName] = '';
                InterfaceMonitor.writeConsole("Collecting '" + this._currentLibName + "' : " + (this._currentLibLength / this.BLOCK_BYTE).toFixed(1) + ' KiB', 'neutral');
            }
            return;
        }

        // === End of file ===
        if (line.startsWith(this.CMDS.LIB_END)) {
            if (this._singleLibCollecting) {
                this._singleLibCollecting = false;

                if (this._singleLibBytes?.length) {
                    if (this._currentLibLength && this._singleLibBytes.length !== this._currentLibLength) {
                        console.warn(`Lecture incomplète: ${this._singleLibBytes.length}/${this._currentLibLength}`);
                        this._FSlibrarySingleDownloadResolve?.(null);
                    } else {
                        this._FSlibrarySingleDownloadResolve?.(new Uint8Array(this._singleLibBytes));
                    }
                } else {
                    this._FSlibrarySingleDownloadResolve?.(this._singleLibContent);
                }

                this._FSlibrarySingleDownloadResolve = null;
                this._singleLibContent = '';
                this._singleLibBytes = [];
            }
            this._currentLibName = null;
            this._currentLibLength = 0;
            this._currentLibRead = 0;
            return;
        }

        // === Line ===
        if (this._currentLibName && line.startsWith(this.CMDS.LIB_LINE)) {
            const content = line.replace(this.CMDS.LIB_LINE, '') + '\n';
            this._currentLibRead += content.length;
            this._updateLibProgress();

            if (this._singleLibCollecting) {
                this._singleLibContent += content;
            } else {
                this.internalLibraries[this._currentLibName] += content;
            }
            return;
        }

        this._chunkBuffer = this._chunkBuffer || '';

        // === Chunk hex ===
        if (this._currentLibName && line.startsWith(this.CMDS.LIB_CHUNK)) {
            const chunkHex = line.replace(this.CMDS.LIB_CHUNK, '');
            this._chunkBuffer += chunkHex;

            if (this._chunkBuffer.length % 2 !== 0) {
                return;
            }

            const fullHex = this._chunkBuffer;
            this._chunkBuffer = '';

            if (this._singleLibCollecting) {
                for (let i = 0; i < fullHex.length; i += 2) {
                    this._singleLibBytes.push(parseInt(fullHex.slice(i, i + 2), 16));
                }
                this._currentLibRead += fullHex.length / 2;
            } else {
                const content = this._decodeHexChunk(fullHex);
                this.internalLibraries[this._currentLibName] += content;
                this._currentLibRead += content.length;
            }

            this._updateLibProgress();
            return;
        }

        // === Error ===
        if (this._currentLibName && line.startsWith(this.CMDS.LIB_ERROR)) {
            console.error(line);
            if (this._singleLibCollecting) {
                this._singleLibCollecting = false;
                this._singleLibReject?.(new Error(line.replace(this.CMDS.LIB_ERROR, '')));
                this._singleLibContent = '';
            } else {
                this._printResponseOnConsole(line);
                InterfaceMonitor.writeConsole(line, 'warning', true, true);
            }
            return;
        }
    };
    /**
     * Show main.py execution start message.
     */
    _finishUploading() {
        if (this.serial.isDownloading) {
            let message = this.FILE_DOWNLOADED;
            if (this.upload_t0 !== null) {
                const duration = (Date.now() - this.upload_t0) / 1000;
                const duration_info = ' (' + duration.toFixed(2) + ' s)';
                this.upload_t0 = null;
                message += duration_info;
            }
            InterfaceMonitor.writeConsole(message, 'success', true, true);
            if (this._code && /@Graph:/.test(this._code)) {
                InterfaceMonitor.writeConsole(jsonPath('code.repl.consoleGraphData'), 'neutral', true, true);
            }
            this.readingDelay = 50;
            this.serial.isDownloading = false;
            this.progressBar.hideProgressBar(50);
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
                    if (InterfaceConnection.FileSystem?.pythonRunning) {
                        InterfaceConnection.FileSystem.pythonRunning = false;
                        InterfaceConnection.FileSystem.updatePlayButtonState();
                    }
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
        const monitor = document.getElementById('console');
        if (this.serial?.isDownloading) {
            if (response.startsWith('[CMD_LIB_CHUNK]')) return;
            // if (response.startsWith('_ = f.write(base64_decode') || response.startsWith('_ = f.write(binascii.a2b_base64')) {
            //     return;
            // }
        }
        response = this._decodeConsoleEscapes(response);
        const stream = this._getStreamStyle(response);
        if (this.isCommand && !this.isPasteMode && !this.isRawOpen && !this.readingStatus.isError) {
            let html = this.ansi_up.ansi_to_html(stream.data);
            if (!this.serial.isDownloading) {
                html = '<b>' + html + '</b>';
            }
            let child = monitor.lastChild;
            if ($(monitor.lastChild).hasClass('error')) {
                child = $(monitor.lastChild).prev();
            }
            $(child).html($(child).html() + html);
            this.rawEmptyCount = 0;
            if (this.requestCmd) {
                if (('<b>' + this.requestCmd + '</b>' == html) || (this.requestCmd == html)) {
                    this.readingLastResponse = true;
                    this.requestCmd = null;
                }
            }
            this.isCommand = false;
            if (/exec\(open\(\'main\.py\'\).read\(\),( |)globals\(\)/.test(stream.data)) {
                InterfaceMonitor.writeConsole(this.EXECUTION_MSG, 'success', true, true);
                this._finishUploading();
            }
            InterfaceMonitor.scrollToBottom();
            return;
        }
        if (this.readingLastResponse && response !== ">>> ") {
            this.commandResponse = response.replace(/>>> /, "");
            this.readingLastResponse = false;
        }
        const $lastChild = $(monitor.lastChild);
        let htmlData = this.ansi_up.ansi_to_html(stream.data);
        if ((this.isPasteMode || this.isRawOpen) && !this.readingStatus.isError) {
            $lastChild.append(htmlData);
            $lastChild.css("color", InterfaceMonitor.TEXT_COLOR.pasting);
            InterfaceMonitor.scrollToBottom();
            return;
        }
        if (!stream.color) {
            stream.color = 'default';
        }
        if (stream.color === 'interrupt' || stream.color === 'warning') {
            if (!$lastChild.hasClass('error')) {
                InterfaceMonitor.writeConsole('</br>' + htmlData, stream.color, true, true);
                $(monitor.lastChild).addClass('error');
            } else {
                $lastChild.css('color', InterfaceMonitor.TEXT_COLOR[stream.color]);
                $lastChild.append(htmlData);
            }
            if (/Stop global variables getter./.test(stream.data)) {
                if (this.wasOpen) {
                    const $prev = $lastChild.prev();
                    $prev.remove();
                    $(monitor).append($prev);
                    this.setRepl(true);
                }
            }
            InterfaceMonitor.scrollToBottom();
            if (/OSError: -202/.test(stream.data)) {
                InterfaceMonitor.writeConsole(jsonPath('code.repl.help.internetAccess'), 'interrupt', true);
                InterfaceMonitor.writeConsole(jsonPath('code.repl.help.gatewayFind'), 'interrupt', true);
            }
            if (/AssertionError: auth error /.test(stream.data)) {
                InterfaceMonitor.writeConsole(jsonPath('code.repl.help.mail') + ' ' + setClickableLink("https://vittascience.com/learn/tutorial.php?id=1030", 'Send E-mail with ESP32'), 'interrupt', true);
            }
            if (/OSError:/.test(stream.data) && /ENODEV/.test(stream.data)) {
                InterfaceMonitor.writeConsole(jsonPath('code.repl.help.i2cError'), 'interrupt', true);
                stream.color = 'default';
            }
            if (new RegExp(this.VG_FILENAME).test(stream.data)) {
                if (/_scan_global_vars/.test(stream.data)) {
                    console.warn(">_REPL button closed the _scan_global_vars tool. Retry opening REPL.");
                    InterfaceConnection.varPanel.reset();
                    InterfaceConnection.varPanel.getterActive = false;
                    this.enqueueCommand("variables_getter.variablesGetter = False");
                    this.open();
                }
                if (/_schedule_global_vars/.test(stream.data)) {
                    console.warn(">_REPL button closed the _schedule_global_vars tool. Retry opening REPL.");
                    this.enqueueCommand("variables_getter.stopVariablesGetter()");
                    this.open();
                }
            }
        } else {
            htmlData = htmlData.replace(/>/g, "&gt;").replace(/</g, "&lt;")
            htmlData = htmlData.replace(/(http(s)?:\/\/[^\s]+)/g, function (url) {
                return setClickableLink(url, url);
            });
            InterfaceMonitor.writeConsole(htmlData, stream.color, true, stream.bold);
            if (/Brownout detector was triggered/.test(stream.data)) {
                InterfaceMonitor.writeConsole(jsonPath('code.repl.help.powerSupply'), 'interrupt', true, true);
            }
        }
        if (!this.isOpen && stream.data && (stream.data.includes('Utilisez CTRL-D pour relancer.') || stream.data.includes('Use CTRL-D to reload.'))) {
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
        } else if ((!this.serial.isDownloading && /Warning: (I2C|LCD|SPI)/.test(response))) {
            stream.data += '\n';
            stream.color = 'interrupt';
        } else if (this.serial.isDownloading && this.isPasteMode) {
            stream.color = 'pasting';
        } else if (stream.data.startsWith('[HELP] ')) {
            stream.color = 'success';
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
    /**
     * Normalize python code for comparing different sources (online or board FS)
     * @private
     * @param {string} source
     * @returns {string} python
     * @memberof MicropythonRepl
     */
    _normalizePythonSource(source) {
        return this._decodeConsoleEscapes(source)
            .replace(/\r\n?/g, '\n')
            .replace(/^[ \t]+$/gm, '')      // lignes "vides" avec espaces -> vide
            .replace(/[ \t]+$/gm, '')       // espaces en fin de ligne
            .replace(/\n{3,}/g, '\n\n')     // compacte les gros blocs vides
            .trim();
    };
    /**
    * Split large string in chunks.
    * @private
    * @param {string} str
    * @param {int} size
    * @return {Array<string>}
    * @memberof MicropythonRepl
    */
    _chunk(str, size) {
        const numChunks = Math.ceil(str.length / size);
        const chunks = new Array(numChunks);
        for (var i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substr(o, size);
        }
        return chunks;
    };
    /**
    * Decode hex string in base64 from serial port.
    * @private
    * @param {string} value (base64)
    * @return {string} result
    * @memberof MicropythonRepl
    */
    _decodeHexChunk(value) {
        let result = '';
        for (let i = 0; i < value.length; i += 2) {
            result += String.fromCharCode(parseInt(value.substr(i, 2), 16));
        }
        return result;
    };
    /**
    * Decode encoded characters from serial port.
    * @private
    * @param {string} value
    * @return {string} result
    * @memberof MicropythonRepl
    */
    _decodeConsoleEscapes(value) {
        if (typeof value !== 'string') {
            return value;
        }
        return value.replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) =>
            String.fromCharCode(parseInt(hex, 16))
        );
    };
}

class Queue {
    constructor() {
        this.data = [];
        this.rear = 0;
        this.maxLength = 0;
    }
    enqueue(element) {
        this.data[this.rear] = element;
        this.rear = this.rear + 1;
        this.maxLength = this.rear;
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
        this.maxLength = 0;
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
        this.getterActive = false
        this.varPanelDom = $("#variables-table-body-repl")
    }
    /**
     * Empty the variables panel table.
     */
    empty() {
        this.variables = [];
        this.updateDOM();
    };
    /**
     * Stop and close the variables panel.
     */
    async close(keepOpen = false) {
        if (this.getterActive) {
            await this.toggleGetter();
            await waitFor(_ => this.getterActive === false, 500);
        }
        if (!keepOpen) {
            this.reset();
        }
    };
    /**
     * Close the variables panel.
     */
    reset() {
        if (this.isOpen) {
            this.setVariablesPanel(false);
        }
        this.empty();
    };
    /**
     * Append tuple to table of variables panel.
     * @param {Object} variable 
     */
    addVarToPanel(variable) {
        const index = this.variables.findIndex(v => v.name === variable.name);
        if (index !== -1) {
            const current = this.variables[index];
            if (current.value != variable.value || current.type != variable.type) {
                current.value = variable.value;
                current.type = variable.type;
                if (!current.unshifted) {
                    this.variables.splice(index, 1);
                    this.variables.unshift(current);
                    current.unshifted = true;
                }
            }
            return;
        }
        variable.firstChange = true;
        this.variables.unshift(variable);
    };
    /**
     * Update variables panel DOM.
     */
    updateDOM() {
        if (this.variables.length === 0) {
            const emptyMessage = jsonPath('code.simulator.messages.variables-panel-msg');
            this.varPanelDom.html('<tr><td colspan="3">' + emptyMessage + '</td></tr>');
            return;
        }
        const rows = [];
        for (const variable of this.variables) {
            if (!variable || variable.value === undefined) {
                continue;
            }
            const name = variable.name !== undefined ? String(variable.name) : '';
            const value = String(variable.value).slice(0, 20);
            const type = variable.type !== undefined ? String(variable.type) : '';
            rows.push('<tr><td>' + name + '</td><td>' + value + '</td><td>' + type + '</td></tr>');
        }
        this.varPanelDom.html(rows.join(''));
    };
    /**
     * Launch variables getter commands.
     * @public
     */
    launchGetterCommands() {
        this.repl.enqueueCommandList([
            "import variables_getter",
            "getterActive = True",
            "variables_getter.runVariablesGetter(scope=globals(), period_ms=" + this.repl.variablesGetterTimeout + ")"
        ]);
    };
    /**
     * Start variables getter by opening REPL.
     * @public
     * @return {void}
     */
    async toggleGetter() {
        const toActivate = !this.getterActive;
        this.wasREPLOpen = false;
        if (this.repl.isOpen) {
            this.wasREPLOpen = true;
        } else {
            await InterfaceConnection.openRepl(false);
            await waitFor(_ => this.repl.isOpen == true, 50);
        }
        if (toActivate && !this.getterActive) {
            this.repl.variablesGetterRequested = true;
            if (!this.repl.libAlreadyInFs.includes(this.repl.VG_FILENAME)) {
                delete this.repl.internalLibraries[this.repl.VG_FILENAME];
                this.repl.gotNewLibraries = true;
                const commands = this.repl._scriptUploaderCommands(this.repl.VG_FILENAME, this.repl._CUSTOM_LIB['variables_getter']);
                this.repl.enqueueCommandList(commands);
            }
            this.launchGetterCommands();
            if (!this.wasREPLOpen) {
                this.repl.runFile();
            }
            this.repl.readingDelay = 20;
            await this.repl.sendCommand(this.repl.Queue.dequeue());
        } else if (!toActivate && this.getterActive) {
            this.repl.enqueueCommand("variables_getter.stopVariablesGetter()")
            await this.repl.sendCommand(this.repl.Queue.dequeue());
            await waitFor(_ => this.getterActive === false, 500);
        }
    };
    /**
     * Enable/Disable global variables panel on monitor.
     * @param {boolean} state 
     */
    setVariablesPanel(state) {
        this.isOpen = state;
        const interfaceName = Main.getInterface();
        const divID = '#monitor-debugger';
        const $debugger = $(divID);
        const $monitor = $('#monitor-view');
        const $monitorContent = $('#monitor-content');
        const $replVariables = $('#repl-variables');
        let consolePosition = 'bottom';
        const consoleMode = localStorage.getItem('console');
        if (consoleMode) {
            const parsed = JSON.parse(consoleMode);
            if (parsed && parsed[interfaceName]) {
                consolePosition = parsed[interfaceName];
            }
        }
        monitorWindowTransition(divID, consolePosition === 'right' ? 'height' : 'width');
        if (this.isOpen) {
            $replVariables.addClass('activated');
            $debugger.show();
            if ($monitorContent.hasClass('monitor-grid-right')) {
                $monitor.removeClass('monitor-view-split-bottom-debug monitor-view-split-right')
                    .addClass('monitor-view-split-right-debug');
            } else {
                $monitor.removeClass('monitor-view-split-right-debug monitor-view-split-bottom')
                    .addClass('monitor-view-split-bottom-debug');
            }
        } else {
            $replVariables.removeClass('activated');
            $debugger.hide();
            if ($monitor.hasClass('monitor-view-split-bottom-debug')) {
                $monitor.removeClass('monitor-view-split-bottom-debug')
                    .addClass('monitor-view-split-bottom');
            } else {
                $monitor.removeClass('monitor-view-split-right-debug')
                    .addClass('monitor-view-split-right');
            }
        }
    }
}

class ProgressBar {
    constructor() {
        this.DEFAULT_DESCRIPTION = jsonPath('code.repl.progressBar.default');
        this.hideTimeout = null;
    }

    addProgressBarToDom() {
        if (document.querySelector("#progress-bar-container") === null) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '../openInterface/interfaces/assets/css/progress_bar.css';
            link.type = 'text/css';
            document.head.appendChild(link);

            const progressBarInnerHtml = `
            <div class="progress-bar-container" id="progress-bar-container">
                <div class="progress-bar-area">
                    <div class="progress-bar-description" id="progress-bar-description">${this.DEFAULT_DESCRIPTION}</div>
                    <div class="progress-bar-wrapper">
                        <div class="progress-bar-value" id="progress-bar-serial">0%</div>
                    </div>
                </div>
            </div>`;
            document.querySelector("#ide-content").insertAdjacentHTML('afterend', progressBarInnerHtml);
        }
    }

    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    displayProgressBar(description = '') {
        this.clearHideTimeout();

        const progressBar = document.querySelector('#progress-bar-serial');
        const container = document.querySelector('#progress-bar-container');
        const descriptionElt = document.querySelector('#progress-bar-description');

        if (!description) description = this.DEFAULT_DESCRIPTION;

        if (descriptionElt) {
            descriptionElt.innerHTML = description;
        }

        progressBar.style.width = '0%';
        progressBar.textContent = '0%';
        container.style.display = 'flex';
    }

    hideProgressBar(delay = 0) {
        this.clearHideTimeout();

        const hide = () => {
            document.querySelector('#progress-bar-container').style.display = 'none';
            document.querySelector('#progress-bar-serial').style.width = '0%';
            this.hideTimeout = null;
        };

        if (delay > 0) {
            this.hideTimeout = setTimeout(hide, delay);
        } else {
            hide();
        }
    }

    updateProgressBar(percentage) {
        const progressBarElt = document.querySelector('#progress-bar-serial');
        progressBarElt.textContent = `${percentage}%`;
        getComputedStyle(progressBarElt).width;
        progressBarElt.style.width = `${percentage}%`;
    }
};