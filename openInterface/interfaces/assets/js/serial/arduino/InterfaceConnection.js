const InterfaceConnection = {
	serial: null,
	serialMonitorConnected: false,
	SDK_VERSION: 184,
	buffer: "",
	avrgirl: null,
	hasToClose: false,
	info: {},
	boardName: null,
	boardOptionsLoaded: false,
	hex: null,
	r4Uploader: null,
	minimaUp: null,
	localCompilation: {
		initialLoads: false,
		isCompiling: false,
		downloaded: false,
		eventList: ['cppFileCreated', 'objectFileCreated', 'elfFileCreated', 'hexFileCreated'],
		currentEvent: false,
		loaded: false
	},
	filePath: "/openInterface/interfaces/assets/js/serial/arduino/",
	progressBar: {

		_displayProgressBar: function () {
			document.querySelector('#progress-bar-arduino').style.width = '0%';
			document.querySelector('#global-overlay').style.display = 'flex';
			document.querySelector('#progress-bar-container').style.display = 'flex';
		},

		_hideProgressBar: function () {
			document.querySelector('#progress-bar-container').style.display = 'none';
			document.querySelector('#global-overlay').style.display = 'none';
			document.querySelector('#progress-bar-arduino').style.width = '0%';
		},

		_updateProgressBar: function (percentage) {
			const progressBarElt = document.querySelector('#progress-bar-arduino');
			progressBarElt.textContent = `${percentage}%`;
			getComputedStyle(progressBarElt).width;
			progressBarElt.style.width = `${percentage}%`;
		}
	},
	/**
	 * Initialize InterfaceConnection for Arduino by creating a new serial object and 
	 * adding all arduino boards in board setting option.
	 */
	init: function (options, boardId = null) {
		this.options = Object.assign({}, options) || {
			"boardSelection": true,
			"board": boardId,
			"boardsFilter": null,
			"bauds": null,
			"variant_ids": null
		};
		if (!this.options.boardId) this.options.boardId = boardId;
		if (navigator.serial) {
			$("#upload-arduino").show();
			$("#download-arduino").hide();
			$("#upload-arduino-opt").hide();
			$("#download-arduino-opt").show();
			this.resetUploaders();
			if (this.options.boardSelection) {
				const loadFirmwareOptions = () => {
					const board_select = document.querySelector('#firmware-options');
					if (board_select === null) {
						setTimeout(loadFirmwareOptions, 100);
					} else {
						if (!this.boardOptionsLoaded) {
							$(`input[name="boardChoice"][value="${this.options.boardId}"]`).prop('checked', true);
							this.addFirmwareOptions(this.options.boardId);
							this.options.firmware = $('#firmware-options option:selected').text();
							this.boardOptionsLoaded = true;
						}
					}
				};
				loadFirmwareOptions();
				const baudrate = SERIAL_OPTIONS.bauds[this.options.boardId];
				if (baudrate) {
					const baudOption = document.querySelector('#baud option[value="' + baudrate + '"]');
					baudOption.selected = true;
				}
			}
			const getBaudrate = () => parseInt($('#baud').find(":selected").text());
			this.serial = new Serial(getBaudrate, this.options.boardsFilter);
			if (!this.options.boardsFilter && this.options.boardSelection && this.options.variant_ids) {
				this.serial.forcedFilters = [];
				this.options.variant_ids[this.options.boardId].forEach(id => {
					const board = ARDUINO_BOARDS.find(item => item.id === id);
					if (board.productId) {
						for (const pid of board.productId) {
							this.serial.forcedFilters.push({ usbProductId: parseInt(pid, 16), usbVendorId: board.vid });
						}
					} else {
						this.serial.forcedFilters.push({ usbProductId: board.pid, usbVendorId: board.vid });
					}
				});
			}
		} else {
			$("#upload-arduino").hide();
			$("#download-arduino").show();
			$("#upload-arduino-opt").show();
			$("#download-arduino-opt").hide();
		}
	},
	/**
	 * Reset board parameters.
	 */
	reset: function () {
		this._setSerialMonitor(false);
		this.hasToClose = false;
		this.serial.reset();
		this.onClose();
	},
	resetUploaders: function () {
		this.hex = null;
		this.boardName = null;
		this.avrgirl = null;
		this.r4Uploader = null;
		this.minimaUp = null;
		this.onClose();
	},
	addFirmwareOptions: function (boardId) {
		const board_select = document.querySelector('#firmware-options');
		board_select.innerHTML = '';
		ARDUINO_BOARDS.forEach((board, index) => {
			if (board.vittaTest && this.options.variant_ids[boardId].includes(board.id)) {
				const option = document.createElement("option");
				option.text = board.name;
				option.value = index;
				if (option.text == this.options.firmware) {
					option.selected = true;
				}
				board_select.appendChild(option);
			}
		});
	},
	/**
	 * Connect board to interface.
	 */
	connectBoard: async function () {
		if ($("#simulator").is(":visible")) {
			await toggleSimulator();
		}
		InterfaceMonitor.setup();
		if (navigator.serial && !this.serialMonitorConnected) {
			await this.doConnect();
		}
	},
	/**
	 * Open serial connection on COM port.
	 */
	doConnect: async function () {
		try {
			await this.serial.open(this.readCallbackError.bind(this));
			this.info.lastConnection = {
				id: await this.serial.getInfo(),
				signals: await this.serial.getSignals(),
				port: this.serial.port
			};
			this._setSerialMonitor(true);
			this._readingLoop();
			InterfaceMonitor.writeConsole('code.serialAPI.boardConnected', 'success');
			this.onOpen();
		} catch (e) {
			this.connectCallbackError(e);
		}
	},

	connectCallbackError: function (error) {
		const err = String(error);
		const errorNotif = new VittaNotif(5);
		if (err.match(/No port selected by the user/)) {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.noPortSelected'), 'bg-danger');
		} else if (err.match(/Failed to open serial port/)) {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.serialPortOpeningFail'), 'bg-danger');
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning');
		} else if (err.match(/SecurityError: Failed to execute 'requestPort' on 'Serial'/)) {
			const successNotif = new VittaNotif(5)
			successNotif.displayNotification(null, jsonPath('code.serialAPI.clickSerialMonitor'), 'bg-success');
		} else {
			console.error(error);
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
		this.serial.reset();
	},

	readCallbackError: function (error) {
		if (error.match(/(DOMException|ParityError|BufferOverrunError): A ((framing|parity) error|buffer overrun) has been detected\./)) {
			this.serial.dataReceived = this.serial._loop_reader(this.readCallbackError.bind(this));
		} else if (error.match(/(DOMException|BreakError): A break condition has been detected\./)) {
			console.log('Please refresh page.')
		} else if (error.match(/(DOMException|NetworkError): The device has been lost\./)) {
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			this.serial.reset();
			this.onClose();
		}
	},

	/**
	 * [Button] Disconnect board from interface.
	 */
	doDisconnect: async function () {
		if (this.serialMonitorConnected && this.serial.port) {
			this.hasToClose = true;
			await this.serial.reader.cancel();
			await this.serial.close();
			this.reset();
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning', false, true);
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success');
		} else if (this.avrgirl && this.avrgirl.connection.serialPort.isOpen) {
			// => to activate TX on board after disconnect .. TO DO
			//await this.avrgirl.protocol.connection._setDTR(true, 200, () => {}); 
			await this.avrgirl.connection.serialPort.close();
			this.resetUploaders();
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning', false, true);
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success');
		}
	},

	/**
	 * [Button] Upload Arduino program using the VPS server compiling Arduino code.
	 */
	uploadArduino: async function () {
		if ($("#simulator").is(":visible")) {
			await toggleSimulator();
		}
		InterfaceMonitor.setup();
		this.hex = null;
		try {
			if (this.serialMonitorConnected) {
				await this.doDisconnect();
			}
			this._displayCompilingNotice();
			const compilingData = await this._getSettingsForCompiling(this._getSelectedFirmware());
			const compilationStartTime = Date.now();
			const hex = await this._compile(compilingData, false);
			if (hex) {
				const compilationDuration = Date.now() - compilationStartTime;
				if (compilationDuration > 4000 && $_GET('compiler') !== 'local') {
					await this._askForUserGesture();
				}
				$("#compiling-notice").hide()
				InterfaceMonitor.writeConsole('code.successMsg.uploading');
				this.hex = hex;
			}
		} catch (error) {
			console.error(error);
		}
		if (this.hex) {
			await this._flashArduinoCode(this.hex);
		}
	},

	/**
	 * Await the user gesture
	 * @private
	 * @returns {undefined}
	 */
	async _askForUserGesture() {
		const compilingButton = document.querySelector('#compiling-notice-upload-btn');
		if (compilingButton === null) return;
		compilingButton.style.visibility = 'visible';
		return await new Promise((resolve) => {
			compilingButton.addEventListener('click', function uploadToBoard() {
				compilingButton.removeEventListener('click', uploadToBoard);
				resolve();
			});
		});
	},

	/**
	 * Display (and create if necessary) the compiling notice
	 * @private
	 * @returns {undefined} in early return case
	 */
	_displayCompilingNotice() {
		if ($_GET('compiler') === 'local') return;
		let compilingNoticeElt = document.querySelector('#compiling-notice');
		if (compilingNoticeElt === null) {
			compilingNoticeElt = document.createElement('div');
			compilingNoticeElt.id = 'compiling-notice';
			Object.assign(compilingNoticeElt.style, {
				height: '100vh',
				width: '100vw',
				position: 'fixed',
				top: '0px',
				left: '0px',
				zIndex: '1001'
			});
			const compilingWrapperElt = document.createElement('div');
			Object.assign(compilingWrapperElt.style, {
				height: '100%',
				width: '100%',
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			});
			const compilingOverlayElt = document.createElement('div');
			Object.assign(compilingOverlayElt.style, {
				height: '100%',
				width: '100%',
				position: 'absolute',
				backgroundColor: 'black',
				opacity: '0.3'
			});
			const compilingNoticeAreaElt = document.createElement('div');
			Object.assign(compilingNoticeAreaElt.style, {
				padding: '2em',
				zIndex: '1002',
				backgroundColor: 'var(--bg-0)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '2em',
				filter: 'drop-shadow(0 0 3px var(--vitta-shadow-color))',
				borderRadius: '20px'
			});
			const compilingNoticeTextElt = document.createElement('div');
			compilingNoticeTextElt.textContent = i18next.t('code.serialAPI.compiling');
			const compilingNoticeButtonElt = document.createElement('button');
			Object.assign(compilingNoticeButtonElt.style, {
				zIndex: '1002',
				paddingRight: '2em',
				paddingLeft: '2em'
			});
			compilingNoticeButtonElt.textContent = i18next.t('code.topbar.label.upload');
			compilingNoticeButtonElt.id = 'compiling-notice-upload-btn';
			compilingNoticeButtonElt.classList.add('btn', 'v-btn');
			compilingWrapperElt.appendChild(compilingOverlayElt);
			compilingNoticeAreaElt.appendChild(compilingNoticeTextElt);
			compilingNoticeAreaElt.appendChild(compilingNoticeButtonElt);
			compilingWrapperElt.appendChild(compilingNoticeAreaElt);
			compilingNoticeElt.appendChild(compilingWrapperElt);
			document.querySelector('body').appendChild(compilingNoticeElt);
		}
		const compilingButton = document.querySelector('#compiling-notice-upload-btn');
		compilingButton.style.visibility = 'hidden';
		compilingNoticeElt.style.display = 'flex';
	},

	// Fonction pour flasher le code sur l'Arduino
	_flashArduinoCode: async function (hex) {
		const isR4wifi = (typeof BOARD_ARDUINO_UNO_R4_WIFI !== 'undefined' && this.options.boardId == BOARD_ARDUINO_UNO_R4_WIFI);
		const isR4minima = (typeof BOARD_ARDUINO_UNO_R4_MINIMA !== 'undefined' && this.options.boardId == BOARD_ARDUINO_UNO_R4_MINIMA);
		if (isR4wifi || isR4minima) {
			if (typeof BOARD_ARDUINO_UNO_R4_WIFI !== 'undefined' && this.options.boardId == BOARD_ARDUINO_UNO_R4_WIFI) {
				if (!this.r4Uploader) {
					this.r4Uploader = new SambaUploader({
						debug: false,
						callbackOptions: {
							onProgress: this.progressBar._updateProgressBar,
							onOpen: this.onOpen,
							onClose: this.onClose
						}
					});
				}
			} else if (typeof BOARD_ARDUINO_UNO_R4_MINIMA !== 'undefined' && this.options.boardId == BOARD_ARDUINO_UNO_R4_MINIMA) {
				if (!this.minimaUp) {
					this.minimaUp = new MinimaUploader({
						onLog: (m) => InterfaceMonitor.writeConsole('[Minima] ' + String(m), "neutral"),
						onProgress: this.progressBar._updateProgressBar,
						onOpen: this.onOpen,
						onClose: this.onClose
					});
				}
			}
			let flashedOk = false;
			try {
				//console.log(hex)
				switch (this.options.boardId) {
					case BOARD_ARDUINO_UNO_R4_WIFI:
						this.progressBar._displayProgressBar();
						await this.r4Uploader.flashHex(hex, {
							verify: true
						});
						break;
					case BOARD_ARDUINO_UNO_R4_MINIMA:
						await this._flashMinima(hex);
						break;
				}
				InterfaceMonitor.writeConsole('code.serialAPI.fileDownloadedArduino', 'success', false, true);
				flashedOk = true;
			} catch (e) {
				this.flashCallbackError(e);
			} finally {
				this.progressBar._hideProgressBar();
			}
			if (flashedOk && /Serial.(begin|print|println)/.test(this.code)) {
				if (this.options.boardId == BOARD_ARDUINO_UNO_R4_MINIMA) {
					await sleep_ms(500);
				}
				await this.connectBoard();
			}
		} else {
			if (this.avrgirl && this.avrgirl.connection.serialPort.isOpen) {
				this._flashAvrgirl(hex, false, false);
			} else {
				this._flashWithNewAvrgirl(hex);
			}
		}
	},

	_needClosingPort: function (boardId) {
		return /pro-mini|mega-2560/.test(boardId);
	},

	// Fonction pour créer une nouvelle instance d'AvrgirlArduino et flasher le code
	_flashWithNewAvrgirl: async function (hex) {
		const board = this._getSelectedFirmware();
		this.avrgirl = new AvrgirlArduino({
			board: board.id,
			port: /pro-mini/.test(board.id) ? '/dev/cu.usbserial-A50285BI' : null,
			debug: false,
			requestOptions: {
				filters: this.options.boardsFilter ? this.options.boardsFilter : []
			},
			progressBar: this.progressBar,
			onOpen: this.onOpen,
			onClose: this.onClose
		});
		this._flashAvrgirl(hex, true, this._needClosingPort(board.id));
	},

	_flashAvrgirl: function (hex, openingPort, closingPort) {
		const onFinish = async (error, info) => {
			this.progressBar._hideProgressBar();
			if (error) {
				this.flashCallbackError(error, info);
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.fileDownloadedArduino', 'success', false, true);
				if (/Serial.(begin|print|println)/.test(this.code)) {
					await this.toggleSerialConsole();
				}
			}
			if (closingPort) {
				this.doDisconnect();
			}
		};
		this.avrgirl.flash(hex, onFinish, true, openingPort, closingPort);
	},

	_flashMinima: async function (hex) {

		await this.minimaUp.enterBootloader();
		await this.minimaUp.requestDfuDevice();
		await this.minimaUp.openAndClaim();

		let st;
		try {
			st = await this.minimaUp.getStatus();
		} catch {
			throw new Error('Device in runtime (appIDLE), not in DFU bootloader');
		}
		if (st.bState === 0) { /* appIDLE */
			throw new Error('Device in runtime (appIDLE), not in DFU bootloader');
		}
		if (st.bStatus !== 0) {
			await this.minimaUp.clrStatus();
		}

		this.progressBar._displayProgressBar();
		await this.minimaUp.flashHex(hex);
		await this.minimaUp.tryDetachAndReboot(500);
		await this.minimaUp.close().catch(() => { });
	},

	flashCallbackError: async function (error, info) {
		if (error) {
			const err = String(error);
			if (err.match(/(DOMException|NotFoundError(:|))(.*No port selected by the user| Failed to execute 'requestDevice' on 'USB': No device selected.)/)) {
				InterfaceMonitor.writeConsole('code.serialAPI.noPortSelected', 'warning', false, true);
				this.resetUploaders();
			} else if (err.match(/(NetworkError|InvalidStateError): (Failed to execute 'open' on 'SerialPort': |)Failed to open serial port/)) {
				InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning', false, true);
				this.resetUploaders();
			} else if (err.match(/(DOMException|NetworkError): The device has been lost/)) {
				InterfaceMonitor.writeConsole('code.serialAPI.boardDisconnected', 'warning', false, true);
				this.resetUploaders();
			} else if (err.match(/Device in runtime \(appIDLE\), not in DFU bootloader/)) {
				InterfaceMonitor.writeConsole('code.serialAPI.minimaNotInDFU', 'warning', false, true);
				this.resetUploaders();
			} else if (err.match(/ACK \"(X|Y)\" non reçu/)) {
				await this.r4Uploader._closePort();
				InterfaceMonitor.writeConsole('code.serialAPI.flashFailed', 'warning', false, true);
				this.resetUploaders();
			} else if (err.match(/ProductError: connected board is not/)) {
				const detectedBordInfo = this._getDetectedBoard(info);
				// if (this.selectOptionByLabel(detectedBordInfo)) {
				// 	return this._flashWithNewAvrgirl(this.hex);
				// }
				InterfaceMonitor.writeConsole("Carte détectée: <b>" + detectedBordInfo + '</b>.');
				if (this.avrgirl) {
					const errorMsg = jsonPath('code.serialAPI.badBoard') + '<b>' + this.avrgirl.connection.board.name + '</b>. ' + jsonPath('code.serialAPI.checkBoardSettings');
					InterfaceMonitor.writeConsole(errorMsg, 'warning');
				}
				this.resetUploaders();
			} else if (err.match(/(DOMException|ParityError|BufferOverrunError)\: A ((framing|parity) error|buffer overrun|break condition) has been detected\./)) {
				InterfaceMonitor.writeConsole('code.serialAPI.flashFailed', 'warning', false, true);
				await this.doDisconnect();
			} else {
				console.error(error);
			}
		} else {
			if (this.avrgirl) {
				this.boardName = this.avrgirl.connection.board.name;
				if (this.boardName) {
					InterfaceMonitor.writeConsole("Carte détectée: <b>" + this.boardName + '</b>');
				}
				await this.doDisconnect();
			}
			InterfaceMonitor.writeConsole('code.serialAPI.fileDownloadedArduino', 'success', false, true);
		}
		if (info && typeof info === 'object') {
			this.info.lastConnection = info;
		}
	},

	onOpen: function () {
		$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
		$("#disconnect-opt").show();
	},

	onClose: function () {
		$("#connected-icon").remove();
		$("#disconnect-opt").hide();
	},

	/**
	 * [Button] Toggle serial monitor.
	 */
	toggleSerialConsole: async function () {
		if (this.serialMonitorConnected) {
			await this.doDisconnect();
		} else if (!this.serialMonitorConnected && this.avrgirl && this.avrgirl.connection.serialPort.isOpen) {
			await this.doDisconnect();
			this.reset();
			await this.connectBoard();
		} else {
			await this.connectBoard();
		}
	},
	/**
	 * [Button] Send serial command to the board.
	 */
	sendSerialCommand: function () {
		if (!Simulator.isOpen) {
			if (this.serialMonitorConnected) {
				const message = $("#serial-input").val();
				if (typeof message === 'string' && message && message.length > 0) {
					const truncated = message.slice(0, 15);
					const size = new Blob([message]).size;
					const infoMsg = jsonPath('code.serialAPI.serialMonitorSent').replace('%1', size).replace('%2', truncated).replace('%3', (size > 15 ? "[…]" : ""));
					InterfaceMonitor.writeConsole(infoMsg, "neutral");
					this.serial.write(new TextEncoder('utf-8').encode(message));
					InterfaceMonitor.history.push(message);
					$('#serial-input').val("");
				}
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForArduino', 'warning', false, true);
				InterfaceMonitor.writeConsole('code.serialAPI.clickSerialMonitor', 'neutral', false, true);
			}
		} else {
			console.error("Function on #serial-send button is not for simulator.")
		}
	},
	/**
	 * Check if the detected board is compatible with the interface
	 * @return {boolean}
	 */
	selectOptionByLabel(label) {
		const select = document.getElementById('firmware-options');
		for (let i = 0; i < select.options.length; i++) {
			if (select.options[i].text === label) {
				select.value = select.options[i].value;
				return true;
			}
		}
		return false;
	},
	/**
	 * Get the corresponding board object from serial/boards.js 
	 * @returns {Object} board
	 */
	_getSelectedFirmware() {
		let searchBy = 'id';
		if (this.options.boardSelection) {
			searchBy = 'name';
		}
		let board = ARDUINO_BOARDS.find((item, index) => item[searchBy] === this.options.firmware);
		if (!board) {
			board = ARDUINO_BOARDS.find((item, index) => item.id === this.options.boardId);
		}
		return board;
	},
	/**
	 * Get the board detected name with the id informations.
	 * @param {Object} info 
	 * @returns {string} boardName
	 */
	_getDetectedBoard(info) {
		if (info) {
			const board = ARDUINO_BOARDS.find(function (board, index) {
				if (board.vid === info.id.usbVendorId) {
					if (board.pid == info.id.usbProductId) {
						return true;
					}
					if (Array.isArray(board.productId)) {
						const pids = board.productId.map(id => typeof id === 'string' ? parseInt(id, 16) : id);
						if (pids.includes(info.id.usbProductId)) {
							return true;
						}
					}
				}
			});
			return board ? board.name : 'inconnue';
		} else {
			return 'inconnue';
		}
	},

	_checkInjectAiModel: async function (code) {
		return new Promise(async (resolve, reject) => {
			try {
				const checkAiModel = code.match(/#include "EdgeModel"/g);
				if (checkAiModel !== null) {
					code = code.replace(/#include "EdgeModel"/g, '');
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
						let fetchEdgeLib = await fetch(`${location.origin}/openInterface/arduino/assets/lib/EdgeModel.cpp`)
						edgeLib = await fetchEdgeLib.text();
						let inputStart = edgeLib.split('// AI_EDGE_MODEL_WEIGHTS_INPUT_START')[0];
						let inputEnd = edgeLib.split('// AI_EDGE_MODEL_WEIGHTS_INPUT_END')[1];
						edgeLib = `// AI_EDGE_MODEL_WEIGHTS_INPUT_START\n${modelWeights}\n// AI_EDGE_MODEL_WEIGHTS_INPUT_END${inputEnd}`;
						code = `${edgeLib}\n${code}`;
						return resolve(code);
					} else {
						const metadataFromLocalStorage = localStorage.getItem('modelEdgeMetadata');
						if (!metadataFromLocalStorage) {
							console.error('No metadata found in local storage');
							return resolve(null);
						}
						const parsedMetaData = JSON.parse(metadataFromLocalStorage);
						const modelWeights = JSON.parse(parsedMetaData.userMetaData.weightData)
						const fetchEdgeLib = await fetch(`${location.origin}/openInterface/arduino/assets/lib/EdgeModel.cpp`)
						edgeLib = await fetchEdgeLib.text();
						let inputStart = edgeLib.split('// AI_EDGE_MODEL_WEIGHTS_INPUT_START')[0];
						let inputEnd = edgeLib.split('// AI_EDGE_MODEL_WEIGHTS_INPUT_END')[1];
						edgeLib = `// AI_EDGE_MODEL_WEIGHTS_INPUT_START\n${modelWeights}\n// AI_EDGE_MODEL_WEIGHTS_INPUT_END\n${inputEnd}`;
						code = `${edgeLib}\n${code}`;
						return resolve(code);
					}
				} else {
					return resolve(null);
				}
			} catch (error) {
				console.error('Error in _checkInjectAiModel:', error);
				return resolve(null);
			}
		});
	},

	/**
	 * Prepare the compilation process.
	 * If "uploading" is set to true, then the compilation process will be followed
	 * by the upload process on success. Else, if "uploading" is false, just check syntaxcode.
	 * @param {boolean} uploading
	 * @returns {Object} compilingData
	 */
	_getSettingsForCompiling: async function (board, uploading = true) {
		//Get the code.
		let code = CodeManager.getSharedInstance().getCode();
		// CheckIA model
		const checkAiModel = await this._checkInjectAiModel(code);
		if (checkAiModel !== null) {
			code = checkAiModel;
		}

		if (code.length <= 0) {
			InterfaceMonitor.writeConsole('code.errorMsg.emptyCode', 'neutral');
		}

		const files = [{
			"filename": "test.ino",
			"content": code.replace(/rgb_lcd/g, "rgb_lcd_v2")
		}];

		if (typeof BOARD_ARDUINO_UNO_R4_WIFI !== 'undefined' && this.options.boardId == BOARD_ARDUINO_UNO_R4_WIFI && code.includes("WebPageScripts.h")) {
			files.push({
				"filename": "WebPageScripts.h",
				"content": Blockly.Arduino.unor4wifi.writeJavascriptConstant() + NEWLINE + Blockly.Arduino.unor4wifi.writeCssConstant()
			});
		}

		this.code = code;

		if (board) {
			// Setting up build options from the board object.
			const build = {
				"mcu": board.mcu,
				"fqbn": board.fqbn,
				"core": board.core,
				"variant": board.variant
			};
			if (board.exportType) {
				build.exportType = board.exportType;
			}
			if (board.vid && board.pid) {
				build.vid = board.vid;
				build.pid = board.pid;
			}
			// Grouping content into JSON.
			const compilingData = {
				"files": files,
				"libraries": [],
				"logging": true,
				"format": uploading ? 'hex' : 'syntax',
				"version": this.SDK_VERSION,
				"build": build
			};
			return compilingData;
		}
	},
	/**
	 * Start the compilation process.
	 * Basically, we're sending a request to the service URL which will
	 * handle the final compilation request to the compilation server.
	 * @param {Object} data 
	 * @param {boolean} skipUpload - Whether we need to skip the upload step after compilation
	 * @returns 
	 */
	_compile: function (data, skipUpload = false) {
		var _this = this;
		return new Promise(async (resolve, reject) => {
			const callback = function (response, uploadSkipped) {
				if (!response) {
					InterfaceMonitor.writeConsole('code.errorMsg.compilation', 'warning', false, true);
					reject("VPS backend error");
					//In "success" is false, that means compilation worked out.
				} else if (response.success) {
					if (!uploadSkipped) {
						const bufferArray = new Uint8Array(response.output.match(/[\da-f]{2}/gi).map(function (h) {
							return parseInt(h, 16);
						}));
						const maximum_size = _this._getSelectedFirmware().maximum_size;
						if (maximum_size) {
							const hexLengthPercent = Math.round(bufferArray.length / maximum_size * 100);
							InterfaceMonitor.writeConsole("Le programme utilise " + bufferArray.length + " octets d'espace de stockage. (" + hexLengthPercent + "%)");
						}
						InterfaceMonitor.writeConsole('code.successMsg.compilation', 'success', false, true);
						return resolve(response.output)
						// Else, it's just a syntax verification, and no error occurred.
					} else {
						pseudoModal.closeLatestModal();
						InterfaceMonitor.writeConsole('code.successMsg.syntax', 'success', false, true);
						resolve();
					}
				} else {
					//If "success" is false, that means compilation didn't work as excepted.
					InterfaceMonitor.writeConsole('code.errorMsg.syntax', 'warning', false, true);
					if (response.stderr) {
						InterfaceMonitor.writeConsole(response.stderr.replace(/\n/gi, '</br>'), 'neutral', false, true);
						InterfaceMonitor.writeConsole(response.message.replace(/\n/gi, '</br>'), 'warning', false, true);
					}
					pseudoModal.closeLatestModal();
					resolve();
				}
				$("#compiling-notice").hide()
			};

			if (!data) return reject("data is " + data);

			if ($_GET('compiler') === 'local') {
				this._manageLocalCompilation(data, callback, skipUpload);
				return;
			}
			this._displayCompilingNotice();
			const payload = new FormData();
			payload.append("json", JSON.stringify(data));
			const request = new XMLHttpRequest();
			request.onreadystatechange = function () {
				if (this.readyState === XMLHttpRequest.DONE) {
					const responseJson = JSON.parse(this.responseText);
					callback(responseJson, skipUpload);
				}
			};

			let dynamicUrl = '';
			if (typeof IS_CAPYTALE_CONTEXT !== 'undefined') dynamicUrl = 'https://fr.vittascience.com';
			request.open("POST", `${dynamicUrl}/services/post/postCompile.php`, true);
			request.send(payload);
		});
	},

	/**
	 * Start the compilation without uploading to the board
	 * @public
	 * @returns {string} The compiled code into hex file content
	 */
	async compile() {
		const compilingData = await this._getSettingsForCompiling(this._getSelectedFirmware());
		const hex = await this._compile(compilingData, true);
		return hex;
	},

	/**
	 * Manage the local compilation within the browser
	 * @private
	 * @param {object} data - The incoming data for the compilation
	 * @param {function} callback - The function to be cast after code compilation
	 * @param {boolean} skipUpload - Wether the upload process is triggered or not after compilation
	 * @returns {undefined} Early return cases
	 */
	async _manageLocalCompilation(data, callback, skipUpload) {
		const uploadButtonElt = document.querySelector('#local-compilation-upload-btn');
		const compilationDoneElt = document.querySelector('#local-compilation-compilation-done');
		if (!uploadButtonElt) return;
		this._manageLoadingProgress();
		pseudoModal.openModal('modal-local-compilation');
		if (this.localCompilation.isCompiling) return;
		compilationDoneElt.style.display = 'none';
		if (this.localCompilation.loaded) document.querySelector('#local-compilation-info').style.display = 'flex';
		uploadButtonElt.setAttribute('disabled', 'true');
		this.localCompilation.currentEvent = false;
		this._setCompilationProgressBar(this.localCompilation.currentEvent);
		this.localCompilation.isCompiling = true;
		this._createVittaCompilatorCompilationEvents();
		const compilationResponse = await vittaCompilator.compileCode(data.files[0].content, data.build);
		compilationDoneElt.style.display = 'block';
		this.localCompilation.isCompiling = false;
		if (!compilationResponse) return;
		if (skipUpload) {
			callback(compilationResponse, skipUpload);
		}
		uploadButtonElt.removeAttribute('disabled');
		uploadButtonElt.addEventListener('click', function uploadLocalHex() {
			uploadButtonElt.setAttribute('disabled', 'true');
			uploadButtonElt.removeEventListener('click', uploadLocalHex);
			callback(compilationResponse, skipUpload);
			pseudoModal.closeLatestModal();
		});
		document.querySelector('#local-compilation-info').style.display = 'none';
	},

	/**
	 * Manage the loading informations for the local compilator
	 * @private
	 * @returns {undefined} Early return cases
	 */
	_manageLoadingProgress() {
		if (this.localCompilation.initialLoads) return;
		const addLoadingInfo = () => { document.querySelector('#local-compilation-loading-area').innerHTML = `<img class="local-compilation-spinner" src="/public/content/img/spinning-loader.svg">${i18next.t('modals.standard.local-compilation.loadingDescription')}`; };
		const addLoadedInfo = () => { document.querySelector('#local-compilation-loading-area').innerHTML = `${i18next.t('modals.standard.local-compilation.emulatorLoaded')} &#x2705;`; };
		this.localCompilation.initialLoads = true;
		this._setLoadingProgressBar(vittaCompilator.downloadProgress);
		vittaCompilator.on('downloadProgress', 'downloadProgressSerialApi', (percentage) => {
			this._setLoadingProgressBar(percentage);
		});
		vittaCompilator.on('downloadComplete', 'downloadCompleteSerialApi', () => {
			addLoadingInfo();
		});
		vittaCompilator.on('emulatorLoaded', 'emulatorLoadedSerialApi', () => {
			addLoadedInfo();
			this.localCompilation.loaded = true;
			document.querySelector('#local-compilation-info').style.display = 'flex';
		});
		vittaCompilator.on('commandError', 'commandErrorSerialApi', (errorMessage) => {
			InterfaceMonitor.writeConsole('code.errorMsg.syntax', 'warning');
			InterfaceMonitor.writeConsole(errorMessage.replace(/\n/gi, '</br>'), 'warning');
			pseudoModal.closeLatestModal();
		});
		if (vittaCompilator.downloadProgress !== 100) return;
		if (vittaCompilator.compilatorLoaded) {
			return addLoadedInfo();
		}
		addLoadingInfo();
	},

	/**
	 * Display the percentage in the local compilation modal progress bar
	 * @private
	 * @param {number} percentage - The percentage to be displayed
	 */
	_setLoadingProgressBar(percentage) {
		percentage = Math.round(percentage);
		const downloadAreaElt = document.querySelector('#local-compilation-download-area'),
			progressBarWrapperElt = document.querySelector('#compilation-progress-bar-wrapper'),
			progressBarElt = document.querySelector('#compilation-progress-bar'),
			progressLabelElt = document.querySelector('#compilation-download-label');
		progressLabelElt.textContent = `${percentage}%`;
		progressBarElt.style.transform = `scaleX(${percentage / 100})`;
		if (percentage !== 100 || this.localCompilation.downloaded) return;
		this.localCompilation.downloaded = true;
		progressBarWrapperElt.style.display = 'none';
		const validatedEmojiElt = document.createElement('div');
		validatedEmojiElt.innerHTML = '	&#x2705;';
		downloadAreaElt.appendChild(validatedEmojiElt);
	},

	/**
	 * Add the various listeners for the local compilator
	 * @private
	 */
	_createVittaCompilatorCompilationEvents() {
		this.localCompilation.eventList.map((eventName) => {
			vittaCompilator.on(eventName, `${eventName}SerialApi`, () => {
				this._setCompilationProgressBar(eventName);
			});
		});
	},

	_setCompilationProgressBar(eventName) {
		if (!eventName) {
			document.querySelector('#compilation-steps-name').textContent = '';
			document.querySelector('#compilation-steps-progress-bar').style.transform = `scaleX(0)`;
			return;
		}
		this.localCompilation.currentEvent = eventName;
		const currentEventStep = i18next.t(`modals.standard.local-compilation.events.${eventName}`);
		const eventsLength = this.localCompilation.eventList.length;
		const currentEventIndex = this.localCompilation.eventList.indexOf(eventName);
		const percentage = ((currentEventIndex + 1) / eventsLength) * 100;
		document.querySelector('#compilation-steps-name').textContent = currentEventStep;
		document.querySelector('#compilation-steps-progress-bar').style.transform = `scaleX(${percentage / 100})`;
	},

	/**
	 * Update serial monitor state and the button style in console.
	 * @param {boolean} state 
	 */
	_setSerialMonitor(state) {
		if (this.serialMonitorConnected != state) {
			this.serialMonitorConnected = state;
			if (!this.serialMonitorConnected) {
				$('#serial-monitor').removeClass("activated");
			} else {
				$('#serial-monitor').addClass("activated");
			}
		}
	},
	/**
	 * Start the asynchronous reading loop.
	 */
	async _readingLoop() {
		const decoder = new TextDecoderStream();
		this.serial.readableStreamClosed = this.serial.port.readable.pipeTo(decoder.writable);
		this.serial.reader = decoder.readable.getReader();
		this.hasToClose = false;
		try {
			while (!this.hasToClose && this.serial.reader) {
				await this.sleep(50);
				if (this.serial.reader !== null) {
					const { value, done } = await this.serial.reader.read();
					if (done || !value) {
						break;
					} else {
						this.buffer += value;
						InterfaceMonitor.printReadings(value.replace(/\n/g, '<br>'));
						const parsedRep = this._parseResponse(this.buffer);
						const numberValue = parseFloat(parsedRep.textToPrint);
						let graph = null;
						if (!isNaN(numberValue)) {
							graph = '@Graph:Console:' + numberValue + '|';
						} else if (parsedRep.textToPrint.match(/^@Graph:/)) {
							graph = parsedRep.textToPrint;
						}
						if (graph !== null) {
							InterfaceMonitor.sendDataToChart(graph);
						}
						this.buffer = parsedRep.buffer;
					}
				} else {
					break;
				}
			}
		} catch (error) {
			const err = String(error);
			if (err.match(/(DOMException|NetworkError): The device has been lost/)) {
				InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning', false, true);
				this.reset();
			} else if (err.match(/(ParityError|FramingError|BreakError|BufferOverrunError): A ((framing|parity) error|buffer overrun|break condition) has been detected\./)) {
				InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.baudrateError'), 'warning', false, true);
				await this.serial.close();
				this.reset();
			} else {
				console.error(error);
			}
		} finally {
			this.hasToClose = true;
		}
	},
	/**
	 * Parse buffer received by serial to get some informations.
	 * @param {string} buffer
	 * @returns {object}
	 */
	_parseResponse(buffer) {
		let linesToPrint = new Array();
		while (true) {
			if (/\n/.test(buffer)) {
				const strSplitted = buffer.split('\n');
				buffer = "";
				// Check first item
				if (strSplitted[0] != "") {
					buffer += strSplitted[0];
				}
				const data = {
					'str': strSplitted[0],
					'buffer': strSplitted.join('\n'),
					'push': buffer,
					'resetBuf': true
				};
				const dataParsed = this._parseCase(data, buffer);
				buffer = dataParsed.buffer;
				if (dataParsed.line !== null) {
					linesToPrint.push(dataParsed.line);
				}
				// Loop 
				const lastIndex = strSplitted.length - 1;
				for (var s = 1; s < lastIndex; s++) {
					const data = {
						'str': strSplitted[s],
						'buffer': strSplitted.slice(s).join('\n'),
						'push': strSplitted[s]
					};
					const dataParsed = this._parseCase(data, buffer);
					buffer = dataParsed.buffer;
					if (dataParsed.line !== null) {
						linesToPrint.push(dataParsed.line);
					}
				}
				// Check last item
				if (strSplitted[lastIndex] == "") {
					if (buffer != "") {
						const data = {
							'str': "",
							'buffer': "",
							'push': buffer
						}
						const dataParsed = this._parseCase(data, buffer);
						buffer = dataParsed.buffer;
						if (dataParsed.line !== null) {
							linesToPrint.push(dataParsed.line);
						}
					}
					buffer = "";
				} else if (lastIndex) {
					buffer += strSplitted[lastIndex];
				}
			}
			break;
		}
		const textToPrint = linesToPrint.join('\n').replace(/\n/g, "<br>");
		return { textToPrint, buffer };
	},
	/**
	 * Parse switching case.
	 * @param {Object} data 
	 * @param {string} buffer 
	 * @returns 
	 */
	_parseCase: function (data, buffer) {
		let line = data.push;
		if (data.resetBuf) {
			buffer = "";
		}
		return { 'buffer': buffer, 'line': line };
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
	/**
	 * Open pop-up for saving file onto computer.
	 * @param {String} fileName
	 * @param {ArrayBuffer} hex
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
	/**
	 * [Developper side] Download compiled HEX program for the extension.
	 * The file has to be paste in adacraft project in the following path:
	 * @link ../scratch-gui/static/extensions/vittaarduino
	 */
	downloadHexFile: async function () {
		const compilingData = await this._getSettingsForCompiling(this._getSelectedFirmware());
		var _this = this;
		this._compile(compilingData)
			.then(
				// resolve
				async (hex) => {
					if (hex) {
						let fileName = 'vitta_arduino_extension_';
						const d = new Date();
						const date = ["_", d.getFullYear(), d.getMonth(), d.getDate(), "_", d.getHours(), d.getMinutes(), d.getSeconds()];
						for (var i in date) {
							fileName += date[i].toString();
						}
						_this.saveFile(fileName, hex, 'hex', 'application/octet-stream');
					}
				},
				// reject
				() => { }
			);
	}
};
