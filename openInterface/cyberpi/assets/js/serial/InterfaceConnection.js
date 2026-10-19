const InterfaceConnection = {
	serial: null,
	uploader: null,
	init: function (options, boardId = null) {
		this.options = Object.assign({}, options);
		if (!this.options.boardId) this.options.boardId = boardId;
		if (this.options.bauds) {
			document.querySelector('#baud option[value="' + this.options.bauds + '"]').selected = true;
		}
		const getBaudrate = () => parseInt($('#baud').find(":selected").text());
		if (this.options.boardsFilter && !Array.isArray(this.options.boardsFilter)) {
			this.options.boardsFilter = Object.values(this.options.boardsFilter);
		}
		this.serial = new Serial(getBaudrate, this.options.boardsFilter);
		this._uploader = new HalocodeUpload();
	},

	connectBoard: async function () {
		if ($("#simulator").is(":visible")) {
			toggleSimulator();
		}
		InterfaceMonitor.setup();
		if (navigator.serial && !this.serial.isConnected) {
			await this.doConnect();
		}
	},

	uploadPython: async function () {
		const mainCode = CodeManager.getSharedInstance().getCode();
		// Global progress is computed on the total size of every uploaded file
		let totalSize = 0;
		let sentSize = 0;
		const uploadFile = async (filename, code) => {
			this._uploader.setFile(code, filename);
			const payloads = this._uploader.generatePayloads();
			this.serial.percent = Math.round(sentSize / totalSize * 100);
			this.serial.filename = filename;
			this.serial._controller.online = false;
			await this.serial.write(new Uint8Array(payloads[0]));
			await waitForUpload(_ => this.serial._controller.online === true, 'upload mode ' + filename);
			for (var i = 1; i < payloads.length; i++) {
				this.serial._controller.payloadWritted = false;
				this.serial.percent = Math.round((sentSize + code.length * i / (payloads.length - 1)) / totalSize * 100);
				await this.serial.write(new Uint8Array(payloads[i]));
				await waitForUpload(_ => this.serial._controller.payloadWritted === true, 'payload ' + i + '/' + (payloads.length - 1) + ' ' + filename);
			}
			sentSize += code.length;
		};
		const config = async () => {
			this.serial._controller.restarted = false;
			const pack = HalocodePackData.goto_repl();
			await this.serial.write(new Uint8Array(pack.to_buffer()));
			await this.sendScriptCommand("try:\n    import config\nexcept:\n    pass", TYPE_RUN_WITH_CONFIG);
			await this.sendScriptCommand("try:\n    config.write_config('repl_enable', False)\nexcept:\n    pass", TYPE_RUN_WITH_CONFIG);
			await waitForUpload(_ => this.serial._controller.restarted === true, 'restart');
		};
		const upload = async () => {
			let files = "[";
			for (const i in VittaInterface.externalLibraries) {
				files += '\'' + i + '.py\','
			}
			// Boot file to remove unused files
			const bootCode = "import os, cyberpi, time\ncyberpi.console.print('Uploading...')\ntime.sleep(0.5)\nfiles = " + files + "]\nfor f in files:\n\tif f in os.listdir():os.remove('/flash/' + f)\nprint(os.listdir())\ntime.sleep(0.5)";
			// Dependencies requested in user main
			const libFiles = [];
			for (const lib of this._getRequestedLibraries(mainCode)) {
				libFiles.push(lib);
				if (lib.filename === 'vitta_server.py') {
					libFiles.push({ filename: 'vitta_script.js', code: Blockly.Python.convertObjectInLists(Blockly.Python.jsCodes_).join("\n") });
					libFiles.push({ filename: 'vitta_style.css', code: Blockly.Python.convertObjectInLists(Blockly.Python.cssStyles_).join("\n") });
				}
			}
			totalSize = bootCode.length + mainCode.length + libFiles.reduce((size, f) => size + f.code.length, 0);
			sentSize = 0;
			toggleUploadProgress(true);
			try {
				await uploadFile('main.py', bootCode);
				await config();
				await new Promise(resolve => setTimeout(resolve, 1000));
				for (const lib of libFiles) {
					await uploadFile(lib.filename, lib.code);
				}
				this.serial.isDownloading = true;
				// Write main file
				this.serial._controller.restarted = false;
				await uploadFile('main.py', mainCode);
				await config();
				toggleUploadProgress(false);
			} catch (e) {
				console.error(e);
				toggleUploadProgress(false);
				// No answer to the very first request: the USB adapter is detected but the robot is switched off
				const boardOff = sentSize === 0 && /\(upload mode /.test(e.message);
				InterfaceMonitor.writeConsole(boardOff ? 'code.serialAPI.boardNotResponding' : 'code.serialAPI.flashFailed', 'warning');
				return;
			}
			InterfaceMonitor.writeConsole('</br>' + jsonPath('code.serialAPI.fileDownloaded'), 'success', false, true);
		};
		InterfaceMonitor.setup();
		if (this.serial.isConnected) {
			await upload();
		} else {
			await this.connectBoard();
			if (this.serial.isConnected) {
				await upload();
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForDownload', 'warning');
			}
		}
	},

	connectCallbackError: function (error) {
		console.error(error);
		const err = String(error);
		const errorNotif = new VittaNotif(5);
		if (err.match(/No port selected by the user/)) {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.noPortSelected'), 'bg-danger');
			this.serial.reset();
			$("#connected-icon").remove();
		} else if (err.match(/Failed to open serial port/)) {
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning');
			this.serial.reset();
			$("#connected-icon").remove();
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	},

	readCallbackError: function (error) {
		if (error.match(/(DOMException|ParityError|BufferOverrunError): A ((framing|parity) error|buffer overrun) has been detected\./)) {
			// Recoverable: _loop_reader already reopens the new port.readable. Spawning a new generator here would see the stream locked, end at once and stop readingLoop
			return;
		} else if (error.match(/(DOMException|BreakError): A break condition has been detected\./)) {
			console.log('Please refresh page.')
		} else if (error.match(/(DOMException|NetworkError): The device has been lost\./)) {
			toggleUploadProgress(false);
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			this.serial.reset();
			$("#disconnect-opt").hide();
			$("#connected-icon").remove();
		}
	},

	doConnect: async function () {
		try {
			await this.serial.open(this.readCallbackError.bind(this));
			console.log(await this.serial.getInfo());
			console.log(await this.serial.getSignals());
			console.log(this.serial.port);
			this.serial._controller = new HalocodeController(this.serial);
			this.serial._controller.readingLoop();
			InterfaceMonitor.writeConsole('code.serialAPI.boardConnected', 'success', false, true);
			$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
			$("#disconnect-opt").show();
		} catch (e) {
			this.connectCallbackError(e);
		}
	},

	doDisconnect: async function () {
		if (this.serial.port !== null) {
			this.serial._controller.hasToClose = true;
			await this.sendScriptCommand('get_bri()');
			await this.serial.close();
			$("#disconnect-opt").hide();
			$("#connected-icon").remove();
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success', false, true);
			InterfaceMonitor.writeConsole(' \n');
			if (this.serial._controller) {
				this.serial._controller = null;
			}
		}
	},

	_getRequestedLibraries: function (code, libName) {
		const cutomLibraries = VittaInterface.externalLibraries;
		let requestedLibs = new Array();
		for (var lib in cutomLibraries) {
			if (libName !== lib) {
				const regExp1 = new RegExp('from ' + lib + ' import');
				const regExp2 = new RegExp('import ' + lib);
				if (regExp1.test(code) || regExp2.test(code)) {
					requestedLibs.push({
						filename: lib + ".py",
						code: cutomLibraries[lib]
					});
					const requestedDependencies = this._getRequestedLibraries(cutomLibraries[lib], lib);
					requestedLibs = requestedLibs.concat(requestedDependencies);
				}
			}
		}
		return requestedLibs;
	},

	sendScriptCommand: async function (cmd, mode = TYPE_RUN_WITH_RESPONSE) {
		const pack = new HalocodePackData();
		pack.type(TYPE_SCRIPT);
		pack.mode(mode);
		pack.script(cmd);
		this.serial._controller.waitingScript = true;
		await this.serial.write(new Uint8Array(pack.to_buffer()));
		InterfaceMonitor.writeConsole("</br>> " + cmd, 'default', false, true);
		await waitFor(_ => this.serial._controller.waitingScript === false, 20);
		return true;
	},

	sendSerialCommand: async function () {
		if (!Simulator.isOpen && !WebBLEAPI.isConnected) {
			if (!this.serial.isConnected) {
				await this.connectBoard();
			}
			if (this.serial.isConnected) {
				const command = $('#serial-input').val();
				if ((/(cyberpi.|)config.write_config/.test(command) && /repl_enable/.test(command)) || /(cyberpi.|)restart\(\)/.test(command)) {
					await this.sendScriptCommand(command, TYPE_RUN_WITHOUT_RESPONSE);
				} else {
					await this.sendScriptCommand(command);
				}
				InterfaceMonitor.history.push(command);
				$('#serial-input').val("");
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForDownload', 'warning');
			}
		}
	}
}
