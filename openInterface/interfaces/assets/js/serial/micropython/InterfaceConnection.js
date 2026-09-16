
const InterfaceConnection = {
	serial: null,
	repl: null,
	varPanel: null,
	initialized: false,

	init: function (options, boardId = null) {
		this.options = Object.assign({}, options);
		this.options.boardId = boardId || BOARD_DEFAULT;
		this.options.baud = this.options.baud || 115200;
		document.querySelector('#baud option[value="' + this.options.baud + '"]').selected = true;
		const getBaudrate = () => parseInt($('#baud').find(":selected").text());
		if (this.options.boardsFilter && !Array.isArray(this.options.boardsFilter)) {
			this.options.boardsFilter = Object.values(this.options.boardsFilter);
		}
		this.serial = new Serial(getBaudrate, this.options.boardsFilter);
		this.DEFAULT_RCS = 4; // KiB
		if (['l476', 'wb55', 'steami'].includes(INTERFACE_NAME)) { // default for STM32 if not defined
			this.DEFAULT_WCS = 0.25; // KiB
			this.DEFAULT_DPC = 100; // ms (delay per kib)
			this.DEFAULT_FS_PATH = '';
		} else {
			this.DEFAULT_WCS = 4; // KiB
			this.DEFAULT_DPC = 60; // ms (delay per kib)
			this.DEFAULT_FS_PATH = '/';
		}
		this.DEFAULT_READER_TYPE = "chunk";
		this.DEFAULT_VG_TIMEOUT = 1000;
		const getOption = (map, fallback) => (map && (map[this.options.boardId] ?? map.default)) ?? fallback;
		this.replOptions = {
			"writeChunkSize": getOption(this.options.chunkSizes?.write, this.DEFAULT_WCS),
			"readChunkSize": getOption(this.options.chunkSizes?.read, this.DEFAULT_RCS),
			"readingDelayPerKiB": getOption(this.options.chunkSizes?.readingDelayPerKiB, this.DEFAULT_DPC),
			"libReaderType": getOption(this.options.readerType, this.DEFAULT_READER_TYPE),
			"variablesGetterTimeout": getOption(this.options.variablesGetterTimeout, this.DEFAULT_VG_TIMEOUT),
			"defaultFsPath": getOption(this.options.defaultFsPath, this.DEFAULT_FS_PATH),
			"boardName": INTERFACE_BOARDS[this.options.boardId]?.name,
			"libraries": VittaInterface.externalLibraries,
			"progressBar": true
		};
		window.addEventListener('pagehide', () => {
			this.doDisconnect();
		});
		window.addEventListener('beforeunload', () => {
			this.doDisconnect();
		});
		this.initialized = true;
	},

	waitInitialization: async function () {
		await new Promise(function awaitInterfaceConnection(resolve, reject) {
			if (InterfaceConnection.initialized) {
				return resolve();
			}
			setTimeout(() => {
				awaitInterfaceConnection(resolve, reject);
			}, 100);
		});
	},

	reset: function () {
		if (this.varPanel?.getterActive) {
			this.varPanel.reset();
			this.varPanel = null;
		}
		if (this.FileSystem) {
			this.FileSystem.reset();
			this.FileSystem = null;
		}
		this.serial.reset();
		this.repl.internalLibraries = {};
		this.repl.libDownloaderReady = false;
		$('#repl-control').removeClass("activated");
		$("#repl-variables").removeClass('activated');
		$("#disconnect-opt").hide();
		$("#connected-icon").remove();
		this.repl.progressBar.hideProgressBar();
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
		await this.waitInitialization();
		if (!this.serial?.isDownloading) {
			const code = CodeManager.getSharedInstance().getCode();
			if (INTERFACE_NAME == 'galaxia') {
				if (code.match(/from edgeModel import Model/)) {
					await this.updateSpecificAiLibrariesGalaxia(code);
				}
			}
			const upload = async () => {
				if (this.repl && this.repl.hasFirmware) {
					if (this.FileSystem.isOpen) {
						await this.toggleFileSystem();
					}
					let varPanelWasActive = false;
					if (this.serial?.isConnected && this.varPanel.getterActive) {
						await this.varPanel.close(true);
						varPanelWasActive = true;
					}
					if (!this.repl.isOpen) {
						await this.repl.open();
						await waitFor(_ => this.repl.isOpen == true, 50);
					}
					this.serial.isDownloading = true;
					this.repl.upload_t0 = Date.now();
					this.repl.Queue.reset();
					if (INTERFACE_NAME == 'galaxia') {
						await this.loadImagesToFS(code);
					}
					this.repl.progressBar.displayProgressBar();
					let pin = "2";
					if (INTERFACE_NAME == 'esp32') {
						if (this.options.boardId == BOARD_NANO_ESP32) {
							pin = "48";
						}
						this.repl.enqueueCommandList([
							this.repl._MPY_CMD.import_library('machine'),
							this.repl._MPY_CMD.setPwm(pin)
						]);
					}
					this.repl.readingDelay = 20;
					await this.repl.uploadUserCode(code);
					if (INTERFACE_NAME == 'esp32') {
						this.repl.enqueueCommand(this.repl._MPY_CMD.stopPwm(pin));
					}
					if (INTERFACE_NAME == 'eliobot') {
						this.repl.resetBoard('microcontroller');
					} else {
						if (this.repl.gotNewLibraries) {
							await this.repl.resetBoard('machine', true);
						} else {
							if (varPanelWasActive) {
								this.varPanel.launchGetterCommands();
							}
							this.repl.runFile();
						}
					}
					$('#repl-control').removeClass("activated");
					if (this.repl.isOpen) {
						await this.repl.sendCommand(this.repl.Queue.dequeue());
					}
				} else {
					if (INTERFACE_NAME == 'esp32') {
						InterfaceMonitor.writeConsole(jsonPath('code.repl.flashPython') + ' ' + setClickableLink("https://vittascience.com/learn/tutorial.php?id=341", 'Flashing Esp32 firmware'), 'warning');
					}
				}
			};
			InterfaceMonitor.setup();
			if (this.serial.isConnected) {
				await upload();
			} else {
				await this.connectBoard();
				if (this.serial.isConnected) {
					await upload();
				} else {
					InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardMustBeConnectedForDownload'), 'warning');
				}
			}
		}
	},

	sendSerialCommand: async function () {
		if (this.serial?.isConnected) {
			const data = $('#serial-input').val();
			if (this.repl?.isOpen || this.repl?.isRawOpen) {
				await this.repl.sendCommand(data + this.repl.END_MPY_CMD);
				InterfaceMonitor.history.push(data);
				$('#serial-input').val("");
			} else {
				this.serial.write(new TextEncoder('utf-8').encode(data));
				$('#serial-input').val("");
			}
		} else {
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardMustBeConnectedForSerialWrite'), 'warning', false, true);
		}
	},

	openRepl: async function (runningMain = true) {
		if (this.repl && this.repl.hasFirmware) {
			if (!this.repl.isRawOpen) {
				if (!this.repl.isOpen) {
					await this.repl.open();
				} else if (runningMain) {
					this.repl.runFile();
					await this.repl.sendCommand(this.repl.Queue.dequeue());
				}
			} else {
				this.repl.close_raw_repl();
			}
		} else {
			InterfaceMonitor.writeConsole(jsonPath('code.repl.flashRepl') + ' ' + setClickableLink("https://vittascience.com/learn/tutorial.php?id=341", 'Flashing Esp32 firmware'), 'warning');
		}
	},

	toggleReplOverture: async function () {
		await this.waitInitialization();
		if (this.serial.isConnected) {
			await this.openRepl();
		} else {
			await this.connectBoard();
			if (this.serial.isConnected) {
				await this.openRepl();
			} else {
				InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardMustBeConnectedForREPL'), 'warning');
			}
		}
	},

	toggleVariablesPanel: async function () {
		await this.waitInitialization();
		if (!this.serial.isDownloading) {
			const openVarPanel = async () => {
				if (this.varPanel.isOpen) {
					this.varPanel.setVariablesPanel(false);
					if (this.repl.isOpen && this.varPanel.getterActive) {
						await this.varPanel.toggleGetter();
					}
				} else {
					this.varPanel.setVariablesPanel(true);
					if (!this.varPanel.getterActive) {
						await this.varPanel.toggleGetter();
					}
				}
			}
			if (this.serial.isConnected && this.varPanel) {
				await openVarPanel();
			} else {
				await this.connectBoard();
				if (this.serial.isConnected && this.varPanel) {
					await openVarPanel();
				} else {
					InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardMustBeConnectedVariables'), 'warning', false, true);
				}
			}
		}
	},

	toggleFileSystem: async function () {
		await this.waitInitialization();
		const toggleFS = async () => {
			if (!this.serial.isDownloading) {
				if (!this.FileSystem.isOpen) {
					pseudoModal.openModal('modal-micropython-fs');
					await this.openRepl(false);
					this.FileSystem.openDirs?.clear();
					this.repl.readingDelay = 20;
					await this.FileSystem.refresh();
					this.FileSystem.isOpen = true;
				} else {
					pseudoModal.closeModal('modal-micropython-fs');
					this.FileSystem.isOpen = false;
					this.repl.readingDelay = 50;
				}
			}
		}
		if (this.serial.isConnected) {
			await toggleFS();
		} else {
			await this.connectBoard();
			if (this.serial.isConnected) {
				await toggleFS();
			} else {
				InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardMustBeConnectedForDownload'), 'warning');
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
			if (INTERFACE_NAME == 'esp32' && this.options.boardId != BOARD_NANO_ESP32) {
				pseudoModal.openModal('modal-ch340-driver');
			}
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.serialPortOpeningFail'), 'warning');
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
			this.reset();
		} else {
			console.error(error);
		}
	},

	doConnect: async function () {
		try {
			await this.serial.open(this.readCallbackError.bind(this));
			if (INTERFACE_NAME == 'esp32' && this.options.boardId == BOARD_ESP32_CAM) {
				this.serial.setDTR(false);
				this.serial.setRTS(false);
			}
			console.log(await this.serial.getInfo());
			console.log(await this.serial.getSignals());
			console.log(this.serial.port);

			this.repl = new MicropythonRepl(this.serial, this.replOptions);
			this.varPanel = new VariablesPanel(this.repl);
			this.FileSystem = new MicropythonFS(this.repl);
			this.FileSystem.init();
			this.repl.readingLoop();
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardConnected'), 'success');
			$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
			$("#disconnect-opt").show();
		} catch (e) {
			this.connectCallbackError(e);
		}
	},

	doDisconnect: async function () {
		if (this.repl?.hasFirmware) {
			this.repl.progressBar.hideProgressBar();
			this.repl.Queue.reset();
			if (this.serial?.isConnected && this.varPanel) {
				await this.varPanel.close();
			}
			if (this.repl.isOpen) {
				if (INTERFACE_NAME == 'eliobot') {
					this.repl.resetBoard('microcontroller');
				} else {
					this.repl.resetBoard('machine');
				}
				await this.repl.sendCommand(this.repl.Queue.dequeue());
			} else {
				this.repl.isLoopClosed = true;
			}
		}
		if (this.serial.port !== null) {
			this.serial.hasToClose = true;
			await this.waitClosure();
			await this.serial.close();
			$("#disconnect-opt").hide();
			$("#connected-icon").remove();
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.serialPortClosed'), 'success');
			if (this.repl) {
				this.repl.setRepl(false);
				this.repl = null;
				if (this.FileSystem) {
					this.FileSystem.reset();
					this.FileSystem = null;
				}
			}
			if (this.varPanel) {
				this.varPanel = null;
			}
		}
	},

	waitClosure: async function () {
		await waitFor(_ => this.repl.isLoopClosed === true, 50);
	},

	writeJavascriptFile: function (data) {
		data.pop();
		return [
			"def mpy_uploadJSFile():",
			"  try:",
			"    f = open('vitta_script.js', 'w')",
			`    javascript_code = """${data.join("\\n")}"""`,
			"    f.write(javascript_code)",
			"    f.close()",
			"    javascript_code = None",
			"  except Exception as e:",
			`    print('${this.repl.CMDS.JS_UPLOAD_ERROR} ' + str(e))`,
			"mpy_uploadJSFile()"
		];
	},

	writeCssFile: function (data) {
		data.pop();
		return [
			"def mpy_uploadCssFile():",
			"  try:",
			"    f = open('vitta_style.css', 'w')",
			`    css_style_code = """${data.join("\\n")}"""`,
			"    f.write(css_style_code)",
			"    f.close()",
			"    css_style_code = None",
			"  except Exception as e:",
			`    print('${this.repl.CMDS.CMD_CSS_UPLOAD_ERROR} ' + str(e))`,
			"mpy_uploadCssFile()"
		];
	},

	loadImagesToFS: async function (code) {
		const images = Blockly.Constants.GALAXIA_DISPLAY_IMAGES.map(item => item[1]);
		if (/thingz/.test(code) && /print_bmp\(/.test(code)) {
			for (const f of images) {
				if (code.includes(f)) {
					const buffer = await VittaInterface.fetchDir("/openInterface/galaxia/assets/media/images/" + f, "buffer");
					if (buffer) {
						await this.repl.sendCommand("import os" + this.repl.END_MPY_CMD);
						const hasImage = await this.repl.sendCommand('"' + f + '" in os.listdir()' + this.repl.END_MPY_CMD, true);
						if (hasImage.includes("False")) {
							const commands = this.repl._binaryUploaderCommands(f, new Uint8Array(buffer));
							this.repl.enqueueCommandList(commands);
						}
					}
				}
			}
		}
	},

	/**
	 * Update specific AI libraries with model weights and labels.
	 */
	updateSpecificAiLibrariesGalaxia: async function (code) {
		return new Promise(async (resolve, reject) => {
			const checkRegexCloud = /Model\s*\(\s*(["'])(https?:\/\/[^\/]+\/ia\/(?:model\/([a-zA-Z0-9]+)\/?|sensors(?:\.h)?\?link=([a-zA-Z0-9]+)(?:&[^"']*)?))\1\s*\)/;
			const cloudRegexResult = code.match(checkRegexCloud);
			let id = cloudRegexResult?.[3] ?? cloudRegexResult?.[4];
			let metadata;
			if (id) {
				const metadataContent = await fetch(`${location.origin}/ia/model/${id}/metadata.json`);
				metadata = await metadataContent.json();
			} else {
				const metadataFromLocalStorage = localStorage.getItem('modelEdgeMetadata');
				if (!metadataFromLocalStorage) {
					console.error('No metadata found in local storage');
					return reject('No metadata found in local storage');
				}
				metadata = JSON.parse(metadataFromLocalStorage);
			}
			const modelWeights = JSON.parse(metadata.userMetaData.weightData);
			const labels = JSON.stringify(metadata.labels);
			let sensorStrategy = "edgeModel";
			switch (metadata.settings.strategy.name) {
				case 'p19/p7':
					sensorStrategy = 'edgeModelP19-P7';
					break;
				case 'p19':
					sensorStrategy = 'edgeModelP19';
					break;
				case 'p7':
					sensorStrategy = 'edgeModelP7';
					break;
				case 'accelerometer':
				default:
					sensorStrategy = 'edgeModel';
					break;
			}
			let edgeLib = VittaInterface.externalLibraries[sensorStrategy];
			const inputStart = edgeLib.split('# AI_EDGE_MODEL_WEIGHTS_INPUT_START')[0];
			const inputEnd = edgeLib.split('# AI_EDGE_MODEL_WEIGHTS_INPUT_END')[1];
			edgeLib = `${inputStart}# AI_EDGE_MODEL_WEIGHTS_INPUT_START\n${modelWeights}\nlabels=${labels}\n# AI_EDGE_MODEL_WEIGHTS_INPUT_END${inputEnd}`;
			VittaInterface.externalLibraries["edgeModel"] = edgeLib;
			return resolve();
		});
	},

}

/*
Raw REPL button -- not ready

$('#raw-repl').on('click', function () {
	if (this.repl && this.repl.isOpen) {
		if (!this.repl.isRawOpen) {
			this.repl.open_raw_repl();
		} else {
			this.repl.close_raw_repl();
		}
	} else {
		InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardMustBeConnectedForSerialWrite'), 'warning');
	}
});
*/