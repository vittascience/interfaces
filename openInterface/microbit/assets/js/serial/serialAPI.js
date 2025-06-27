const InterfaceConnection = {
	serial: null,
	repl: null,
	varPanel: null,
	vittaNotif: new VittaNotif(10),
	initialized: false,

	init: async function () {
		this.fsWrapper = new microbitFsWrapper();
		await this.fsWrapper.initialize();
		await this.webusb.init(this.fsWrapper);

		const MICROBIT = {
			usbProductId: 0x0204,
			usbVendorId: 0x0d28
		};
		this.serial = new Serial(115200, [MICROBIT]);
		this.serial.CHUNK_SIZE = 128;

		if (!navigator.serial) this.reorganizeButtons();

		this.initialized = true;
	},

	reset: function () {
		var _this = InterfaceConnection;
		_this.serial.reset();
		_this.webusb.init(_this.fsWrapper);
		_this.varPanel = null;
		$('#repl-control').removeClass("activated");
		$("#repl-variables").removeClass('activated');
		$("#disconnect-opt").hide();
		$("#connected-icon").remove();
	},

	setupMonitor: function () {
		if ($('#monitor').hasClass('monitor-closed')) {
			InterfaceMonitor.toggle();
		}
		if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
			InterfaceMonitor.managePanel('console');
		}
	},

	connectBoard: async function () {
		if ($("#simulator").is(":visible")) {
			toggleSimulator();
		}
		this.setupMonitor();
		if (navigator.serial && !this.serial.isConnected) {
			await this.doConnect();
		}
	},

	/*

	uploadPython: async function () {
		this.setupMonitor();
		if (this.serial.isConnected) {
			await this.upload();
		} else {
			await connectBoard();
			if (this.serial.isConnected) {
				await this.upload();
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForDownload', 'warning');
			}
		}
	},

	upload: async function () {
		if (this.repl && this.repl.hasFirmware) {
			this.repl.Queue.reset();
			this.repl.uploadUserCode();
			this.repl.resetBoard('machine');
			$('#repl-control').removeClass("activated");
			this.serial.isDownloading = true;
			if (!this.repl.isOpen) {
				await this.open();
			} else {
				this.repl.sendCommand(this.repl.Queue.dequeue());
			}
		}
	},

	*/

	activeSerialMonitor: async function () {
		if (!this.serial.isConnected) {
			await this.connectBoard();
		}
		if (this.serial.isConnected) {
			if (this.repl) {
				this.repl.isCommand = false;
			}
			this.serial.isDownloading = false;
		}
	},

	downloadHexButton: async function () {
		await this.fsWrapper.setFilesystemProgram(CodeManager.getSharedInstance().getCode());
		const universalHex = this.fsWrapper.fs.getUniversalHex();
		this.saveFile('microbit_' + Date.now(), universalHex, 'hex', 'application/octet-stream');
		InterfaceMonitor.writeConsole(jsonPath('code.downloadHex.success'), 'success', false, true);
		this.setupMonitor();
	},

	/**
	 * Réorganise les boutons dans le DOM et échange leurs classes.
	 */
	reorganizeButtons: function () {
		this.vittaNotif.displayNotification(null, i18next.t('code.serialAPI.noSerialAPI'), 'bg-warning');

		// Récupérer les éléments nécessaires
		const uploadPythonButton = document.getElementById('upload-python');
		const downloadFirmwareOptButton = document.getElementById('download-firmware-opt');
		const uploadPythonBLEOptButton = document.getElementById('upload-python-ble-opt');

		// Vérifier que tous les boutons existent
		if (uploadPythonButton && downloadFirmwareOptButton && uploadPythonBLEOptButton) {
			// 1. Insérer downloadFirmwareOpt avant uploadPython
			uploadPythonButton.parentNode.insertBefore(downloadFirmwareOptButton, uploadPythonButton);

			// 2. Échanger les classes entre uploadPython et downloadFirmwareOpt
			[uploadPythonButton.className, downloadFirmwareOptButton.className] =
				[downloadFirmwareOptButton.className, uploadPythonButton.className];

			// 3. Déplacer uploadPython sous uploadPythonBLEOpt
			uploadPythonBLEOptButton.parentNode.insertBefore(uploadPythonButton, uploadPythonBLEOptButton.nextSibling);
		} else {
			console.warn('Un ou plusieurs boutons sont introuvables dans le DOM.');
		}
	},

	callbackError: function (error) {
		if (error.match(/(DOMException|ParityError|BufferOverrunError): A ((framing|parity) error|buffer overrun) has been detected\./)) {
			InterfaceConnection.serial.dataReceived = InterfaceConnection.serial._loop_reader(InterfaceConnection.callbackError);
		} else if (error.match(/(DOMException|BreakError): A break condition has been detected\./)) {
			console.log('Please refresh page.')
		} else if (error.match(/(DOMException|NetworkError): The device has been lost\./)) {
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning', false, true);
			InterfaceConnection.reset();
		}
	},

	toggleReplOverture: async function () {
		if (!this.webusb.isUploading) {
			if (this.serial.isConnected) {
				this.openRepl();
			} else {
				await this.connectBoard();
				if (this.serial.isConnected) {
					this.openRepl();
				} else {
					InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedSerialWrite', 'warning', false, true);
				}
			}
		}
	},

	openRepl: async function (forceOpening = false) {
		if (this.repl && this.repl.hasFirmware) {
			if (!this.repl.isRawOpen) {
				if (!this.repl.isOpen) {
					await this.repl.open();
				} else if (!forceOpening) {
					this.repl.runFile();
					this.repl.sendCommand(this.repl.Queue.dequeue());
				}
			} else {
				this.repl.close_raw_repl();
			}
		}
	},

	toggleVariablesPanel: async function () {
		if (!this.webusb.isUploading) {
			const commands = [
				"def runVariablesGetter():",
				"  global variablesGetter",
				"  variablesGetter = True",
				"  @run_every(ms=400)",
				"  def every_function_vars():",
				"    print('@GlobalVars: refresh.')",
				"    variables = globals()",
				"    for i in variables:",
				`      if not "'function'" in str(type(variables[i])) and not 'MicroBit' in str(variables[i]) and not 'module ' in str(variables[i]):`,
				`        print('@GlobalVars:' + str(i) +  " | " + str(variables[i]) + " | " + str(type(variables[i])))`,
				"    if not variablesGetter:",
				"      import utime",
				"      utime.sleep_ms(100)",
				`      raise NameError("Stop global variables getter.")`,
				"try:",
				"  if not variablesGetter:",
				"    runVariablesGetter()",
				"except:",
				"  runVariablesGetter()"
			];
			if (this.serial.isConnected && this.varPanel) {
				if (this.varPanel.isOpen) {
					this.varPanel.setVariablesPanel(false);
				} else {
					this.varPanel.setVariablesPanel(true);
					if (!this.varPanel.getterActive) {
						await this.varPanel.toggleGetter(commands);
					}
				}
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedVariables', 'warning', false, true);
			}
		}
	},

	sendSerialCommand: function () {
		if (this.repl?.isOpen || this.repl?.isRawOpen) {
			const command = $('#serial-input').val();
			this.repl.sendCommand(command + this.repl.END_MPY_CMD);
			InterfaceMonitor.history.push(command);
			$('#serial-input').val("");
		} else {
			InterfaceMonitor.writeConsole('code.serialAPI.boardReplMustBeOpened', 'warning', false, true);
		}
	},

	doConnect: async function () {
		try {
			await this.serial.open(this.callbackError);
			console.log(await this.serial.getInfo());
			console.log(await this.serial.getSignals());
			console.log(this.serial.port);
			const boardOptions = {
				"chunkSize": this.serial.CHUNK_SIZE,
				"libraries": VittaInterface.externalLibraries
			};
			this.repl = new MicropythonRepl(this.serial, boardOptions);
			this.varPanel = new VariablesPanel(this.repl);
			this.repl.readingLoop();
			InterfaceMonitor.writeConsole('code.serialAPI.boardConnected', 'success', false, true);
			if (!$("#connected-icon")[0]) {
				$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
			}
			$("#disconnect-opt").show();
		} catch (e) {
			const err = String(e);
			console.error(err)
			this.serial.reset();
			if (err.match(/(DOMException|NotFoundError): No port selected by the user/)) {
				$("#connected-icon").remove();
			} else if (err.match(/NetworkError: Failed to open serial port/) || err.match(/Failed to execute 'open' on 'SerialPort':/)) {
				InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning', false, true);
				$("#connected-icon").remove();
				const errorNotif = new VittaNotif(12);
				errorNotif.displayNotification(null, "Impossible d'accéder à la carte BBC micro:bit. Un autre logiciel est déjà connecté à la carte.\n\n Fermez les autres onglets susceptibles d'utiliser WebUSB (exemple, MakeCode, Python Editor), ou débranchez et rebranchez la carte micro:bit avant de réessayer.", 'bg-danger');
			} else if (err.match(/SecurityError: Failed to execute \'requestPort\' on \'Serial\'/)) {
				$("#connected-icon").remove();
			}
		}
	},

	doDisconnect: async function () {
		if (this.repl?.hasFirmware) {
			this.repl.Queue.reset();
			if (this.serial?.isConnected && this.varPanel) {
				await this.varPanel.close();
			}
			if (this.repl.isOpen) {
				this.repl.resetBoard('machine');
				this.repl.sendCommand(this.repl.Queue.dequeue());
			} else {
				this.repl.isLoopClosed = true;
			}
		}
		if (this.serial?.port) {
			this.serial.hasToClose = true;
			await this.waitClosure();
			await this.serial.close();
			$("#disconnect-opt").hide();
			$("#connected-icon").remove();
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning', false, true);
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success', false, true);
			if (this.repl) {
				this.repl.setRepl(false);
				this.repl = null;
			}
			this.webusb.disconnect();
		}
	},

	/**
	 * Open pop-up for saving file into micro:bit.
	 * @param {String} fileName
	 * @param {} hex
	 * @param {String} ext
	 * @param {String} type
	 */
	saveFile: function (fileName, hex, ext, type) {
		if (!fileName) {
			return Promise.resolve(void 0);
		}
		if (ext && fileName.slice(-4) !== `.${ext}`) {
			fileName = `${fileName}.${ext}`;
		}
		const a = window.document.createElement('a');
		const blob = new Blob([hex], { type });
		a.href = window.URL.createObjectURL(blob);
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		return Promise.resolve(void 0);
	},

	waitClosure: async function () {
		await waitFor(_ => this.repl.isLoopClosed === true);
	},

	/**
	 * Waiting function in milliseconds.
	 * @public
	 * @param {int}
	 * @return {Promise}
	 */
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	webusb: {

		device: null,
		fs: null,
		isUploading: false,

		/**
		 * Initialize BBC micro:bit WebUSB connection.
		 * @public
		 * @param {microbitFsWrapper} fsWrapper
		 */
		init: async function (fsWrapper) {
			this.fs = fsWrapper;
			this.device = new MicrobitWebUSBConnection({
				logging: new NullLogging(),
			});
			this.device.initialize();
		},

		/**
		 * Connect micro:bit with DAP link.
		 * @param {boolean} forceConnectHelp
		 * @param {string} action
		 */
		connect: async function (forceConnectHelp, action) {
			if (this.device.status === ConnectionStatus.NOT_SUPPORTED) {
				console.error('Error: webusbNotSupportedError')
			} else {
				if (forceConnectHelp) {
					return this.connectInternal(
						{ serial: action !== ConnectionAction.FLASH },
						action
					);
				}
			}
		},

		/**
		 * Setup filesystem and flash python program.
		 */
		flashProgram: async function () {
			await new Promise(function awaitInterfaceConnection(resolve, reject) {
				if (InterfaceConnection.initialized) {
					return resolve();
				}
				setTimeout(() => {
					awaitInterfaceConnection(resolve, reject);
				}, 100);
			});
			if (!this.isUploading) {
				InterfaceConnection.setupMonitor();
				this.isUploading = true;
				if (InterfaceConnection.serial?.isConnected) {
					InterfaceConnection.varPanel.close();
				}
				const code = CodeManager.getSharedInstance().getCode();
				if (code.match(/from edgeModel import Model/)) {
					await this.updateSpecificAiLibraries(code);
				}
				await this.fs.setFilesystemProgram(code);
				InterfaceMonitor.writeConsole('</br>' + jsonPath('code.serialAPI.uploadingProgram'), 'neutral');
				const flashed = await this.flash(true);
				this.isUploading = false;
				if (flashed) {
					InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.fileDownloaded'), 'success', false, true);
					if (code && /@Graph:/.test(code)) {
						InterfaceMonitor.writeConsole('Le programme envoie des données graphiques dans la console.', 'neutral', true);
					}
					await InterfaceConnection.activeSerialMonitor();
				}
			}
		},

		/**
		 * Update specific AI libraries with model weights and labels.
		 */
		updateSpecificAiLibraries(code) {
			return new Promise(async (resolve, reject) => {
				const checkRegexCloud = /Model\s*\(\s*(["'])(https?:\/\/[^\/]+\/(?:ai|ia)\/model\/([a-zA-Z0-9]+)\/?)\1\s*\)/;
		
				const cloudRegexResult = checkRegexCloud.exec(code);
				let id = null;
				if (cloudRegexResult) {
					const url = cloudRegexResult[2];
					const idFound = cloudRegexResult[3];
					if (idFound) {
						id = idFound;
					}
				}
				if (id !== null) {
					const metadataContent = await fetch(`${location.origin}/ia/model/${id}/metadata.json`);
					const metadata = await metadataContent.json();
					const modelWeights = JSON.parse(metadata.userMetaData.weightData);
					const labels = JSON.stringify(metadata.labels);
					let sensorStrategy = "edgeModel";
					switch (metadata.settings.strategy.name){
						case 'accelerometer':
							sensorStrategy = 'edgeModel';
							break;
						case 'p0/p1':
							sensorStrategy = 'edgeModelP0-P1';
							break;
						case 'p0':
							sensorStrategy = 'edgeModelP0';
							break;
						case 'p1':
							sensorStrategy = 'edgeModelP1';
							break;
						default:
							sensorStrategy = 'edgeModel';
							break;
					}
					let edgeLib = VittaInterface.externalLibraries[sensorStrategy];
					let inputStart = edgeLib.split('# AI_EDGE_MODEL_WEIGHTS_INPUT_START')[0];
					let inputEnd = edgeLib.split('# AI_EDGE_MODEL_WEIGHTS_INPUT_END')[1];
					edgeLib = `${inputStart}# AI_EDGE_MODEL_WEIGHTS_INPUT_START\n${modelWeights}\nlabels=${labels}\n# AI_EDGE_MODEL_WEIGHTS_INPUT_END${inputEnd}`;
					VittaInterface.externalLibraries["edgeModel"] = edgeLib;
					return resolve();
				} else {
					const metadataFromLocalStorage = localStorage.getItem('modelEdgeMetadata');
					if (!metadataFromLocalStorage) {
						console.error('No metadata found in local storage');
						return reject('No metadata found in local storage');
					}
					const parsedMetaData = JSON.parse(metadataFromLocalStorage);
					const modelWeights = JSON.parse(parsedMetaData.userMetaData.weightData)
					const labels = JSON.stringify(parsedMetaData.labels);
					let sensorStrategy = "edgeModel";
					switch (parsedMetaData.settings.strategy.name){
						case 'accelerometer':
							sensorStrategy = 'edgeModel';
							break;
						case 'p0/p1':
							sensorStrategy = 'edgeModelP0-P1';
							break;
						case 'p0':
							sensorStrategy = 'edgeModelP0';
							break;
						case 'p1':
							sensorStrategy = 'edgeModelP1';
							break;
						default:
							sensorStrategy = 'edgeModel';
							break;
					}
					let edgeLib = VittaInterface.externalLibraries[sensorStrategy];
					let inputStart = edgeLib.split('# AI_EDGE_MODEL_WEIGHTS_INPUT_START')[0];
					let inputEnd = edgeLib.split('# AI_EDGE_MODEL_WEIGHTS_INPUT_END')[1];
					edgeLib = `${inputStart}# AI_EDGE_MODEL_WEIGHTS_INPUT_START\n${modelWeights}\nlabels=${labels}\n# AI_EDGE_MODEL_WEIGHTS_INPUT_END${inputEnd}`;
					VittaInterface.externalLibraries["edgeModel"] = edgeLib;
					return resolve();
				}
			});
		},

		/**
		 * Flash program into micro:bit.
		 * @param {boolean} tryAgain 
		 */
		flash: async function (tryAgain) {
			if (this.device.status === ConnectionStatus.NOT_SUPPORTED) {
				console.error('Error: webusbNotSupportedError')
				return;
			}
			if (this.device.status === ConnectionStatus.NO_AUTHORIZED_DEVICE || this.device.status === ConnectionStatus.NOT_CONNECTED) {
				const connected = await this.connect(tryAgain || false, ConnectionAction.FLASH);
				if (!connected) {
					return;
				}
			}
			try {
				this.progressBar._displayProgressBar();
				const progress = (value, partial) => {
					if (value) {
						return this.progressBar._updateProgressBar(Math.trunc(value * 100));
					}
				};
				await this.device.flash(this.fs, { partial: true, progress: progress });
				await InterfaceConnection.sleep(200);
				this.progressBar._hideProgressBar();
				return true;
			} catch (e) {
				console.error(e)
				this.progressBar._hideProgressBar();
				if (String(e).match(/DOMException: Failed to execute \'transferOut\' on \'USBDevice\'/)) {
					await this.disconnect();
				}
			}
		},

		/**
		 * Connect to the device if possible, otherwise show feedback.
		 * @param {Object} options
		 * @param {string} action
		 */
		connectInternal: async function (options, action) {
			try {
				await this.device.connect(options);
				return true;
			} catch (e) {
				console.error(e)
				const errorNotif = new VittaNotif(5);
				if (action == ConnectionAction.FLASH && String(e).match("Error: Bad response for ")) {
					InterfaceMonitor.writeConsole('code.serialAPI.badResponse', 'warning', false, true);
					errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
				} else if (String(e).match("Unable to claim interface")) {
					errorNotif.displayNotification(null, jsonPath('code.serialAPI.serialPortOpeningFail'), 'bg-danger');
					InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning', false, true);
				} else if (String(e).match("DOMException: Failed to execute 'open' on 'USBDevice':")) {
					errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
					InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning', false, true);
				} else if (String(e).match("Failed to execute 'open' on 'USBDevice': The device was disconnected.")) {
					errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
					InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning', false, true);
				} else if (String(e).match("Failed to execute 'requestDevice' on 'USB': No device selected.")) {
					errorNotif.displayNotification(null, jsonPath('code.serialAPI.noPortSelected'), 'bg-danger');
					InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning', false, true);
				}
				await InterfaceConnection.init();
				return false;
			}
		},

		/**
		 * Disconnect from the device.
		 */
		disconnect: async function () {
			if (this.device.status == ConnectionStatus.CONNECTED) {
				try {
					await this.device.disconnect();
				} catch (e) {
					console.error(e)
					//console.log(ConnectionAction.DISCONNECT)
				}
			}
		},

		progressBar: {

			_displayProgressBar: function () {
				document.querySelector('#progress-bar-mb').style.width = '0%';
				document.querySelector('#global-overlay').style.display = 'flex';
				document.querySelector('#progress-bar-container').style.display = 'flex';
			},

			_hideProgressBar: function () {
				document.querySelector('#progress-bar-container').style.display = 'none';
				document.querySelector('#global-overlay').style.display = 'none';
				document.querySelector('#progress-bar-mb').style.width = '0%';
			},

			_updateProgressBar: function (percentage) {
				const progressBarElt = document.querySelector('#progress-bar-mb');
				progressBarElt.textContent = `${percentage}%`;
				getComputedStyle(progressBarElt).width;
				progressBarElt.style.width = `${percentage}%`;
			}
		}
	}
}


/**
 * This function records all the pressed keys in the array `pressedKeys`
 * @param {DOM} e the DOM keypress element (document in this case)
 */
function multipleKeyPress(e) {
	if (!SerialAPI.pressedKeys.includes(e.key)) {
		SerialAPI.pressedKeys.push(e.key);
	}
	// Ctrl+B management for Keyboard Interrupt
	if (SerialAPI.pressedKeys.includes('Control') && SerialAPI.pressedKeys.includes('b')) {
		InterfaceConnection.repl.open();
	}
};
