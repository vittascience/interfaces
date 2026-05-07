const InterfaceConnection = {
	serial: null,
	uploader: null,
	init: function (options, boardId = null) {
		this.options = Object.assign({}, options) || {
			"boardSelection": false,
			"boardsFilter": null,
			"bauds": 115200,
			"chunkSizes": { 'default': 1024 }
		};
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
		const uploadFile = async (filename, code) => {
			this._uploader.setFile(code, filename);
			const payloads = this._uploader.generatePayloads();
			this.serial.percent = 0;
			this.serial.filename = filename;
			this.serial._controller.online = false;
			await this.serial.write(new Uint8Array(payloads[0]));
			await waitFor(_ => this.serial._controller.online === true);
			for (var i = 1; i < payloads.length; i++) {
				this.serial._controller.payloadWritted = false;
				this.serial.percent = Math.round(i / (payloads.length - 1) * 100);
				await this.serial.write(new Uint8Array(payloads[i]));
				await waitFor(_ => this.serial._controller.payloadWritted === true);
			}
		};
		const config = async () => {
			this.serial._controller.restarted = false;
			const pack = HalocodePackData.goto_repl();
			await this.serial.write(new Uint8Array(pack.to_buffer()));
			await this.sendScriptCommand("try:\n    import config\nexcept:\n    pass", TYPE_RUN_WITH_CONFIG);
			await this.sendScriptCommand("try:\n    config.write_config('repl_enable', False)\nexcept:\n    pass", TYPE_RUN_WITH_CONFIG);
			await waitFor(_ => this.serial._controller.restarted === true);
		};
		const upload = async () => {
			// get requested libraries in user main
			const requestedLib = this._getRequestedLibraries(mainCode);
			let files = "[";
			for (const i in VittaInterface.externalLibraries) {
				files += '\'' + i + '.py\','
			}
			// Write boot file to remove unused files
			await uploadFile('main.py', "import os, cyberpi, time\ncyberpi.console.print('Uploading...')\ntime.sleep(0.5)\nfiles = " + files + "\nfor f in files:\n\tif f in os.listdir():os.remove('/flash/' + f)\nprint(os.listdir())\ntime.sleep(0.5)");
			await config();
			setTimeout(async () => {
				// Write dependencies
				for (var i = 0; i < requestedLib.length; i++) {
					await uploadFile(requestedLib[i].filename, requestedLib[i].code);
					if (requestedLib[i].filename === 'vitta_server.py') {
						await uploadFile('vitta_script.js', Blockly.Python.convertObjectInLists(Blockly.Python.jsCodes_).join("\n"));
						await uploadFile('vitta_style.css', Blockly.Python.convertObjectInLists(Blockly.Python.cssStyles_).join("\n"));
					}
				}
				this.serial.isDownloading = true;
				// Write main file
				this.serial._controller.restarted = false;
				await uploadFile('main.py', mainCode);
				await config();
				InterfaceMonitor.writeConsole('</br>' + jsonPath('code.serialAPI.fileDownloaded'), 'success', false, true);
				//} else if (/\@event.start/.test(mainCode)) {
				// 	await this.sendScriptCommand("config.write_config(\"repl_enable\", False)", false);
				// }
			}, 1000);
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
			this.serial.dataReceived = this.serial._loop_reader(this.readCallbackError.bind(this));
		} else if (error.match(/(DOMException|BreakError): A break condition has been detected\./)) {
			console.log('Please refresh page.')
		} else if (error.match(/(DOMException|NetworkError): The device has been lost\./)) {
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			this.serial.reset();
			$("#disconnect-opt").hide();
			$("#connected-icon").remove();
		}
	},

	doConnect: async function () {
		try {
			await this.serial.open(this.connectCallbackError.bind(this));
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
		await waitFor(_ => this.serial._controller.waitingScript === false);
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
