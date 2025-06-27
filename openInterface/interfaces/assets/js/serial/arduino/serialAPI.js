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
	closingPort: null,
	hex: null,
	localCompilation: {
		initialLoads: false,
		isCompiling: false,
		downloaded: false,
		eventList: ['cppFileCreated', 'objectFileCreated', 'elfFileCreated', 'hexFileCreated'],
		currentEvent: false,
		loaded: false
	},
	/**
	 * Initialize InterfaceConnection for Arduino by creating a new serial object and 
	 * adding all arduino boards in board setting option.
	 */
	init: function (options) {
		this.options = options || {
			"boardSelection": true,
			"board": null,
			"boardName": null,
			"boardsFilter": null
		};
		if (navigator.serial) {
			$("#upload-arduino").show();
			$("#download-arduino").hide();
			$("#upload-arduino-opt").hide();
			$("#download-arduino-opt").show();
			const getBaudrate = () => parseInt($('#baud').find(":selected").text());
			this.serial = new Serial(getBaudrate, this.options.boardsFilter);
			if (this.options.boardSelection) {
				const addBoardOptions = () => {
					const board_select = document.querySelector('#board-select')
					if (board_select === null) {
						setTimeout(addBoardOptions, 100);
					} else {
						if (!this.boardOptionsLoaded) {
							board_select.innerHTML = '';
							ARDUINO_BOARDS.forEach((board, i) => {
								if (board.vittaTest && board.protocol !== 'avr109' && board.file) {
									const option = document.createElement("option");
									option.text = board.name;
									option.value = i;
									board_select.appendChild(option);
								}
							});
							this.boardOptionsLoaded = true;
						}
					}
				};
				addBoardOptions();
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
		this.avrgirl = null;
		this.closingPort = null;
		this.hex = null;
		this.boardName = null;
		$("#connected-icon").remove();
		$("#disconnect-opt").hide();
	},
	setupMonitor: function () {
		if ($('#monitor').hasClass('monitor-closed')) {
			InterfaceMonitor.toggle();
		}
		if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
			InterfaceMonitor.managePanel('console');
		}
	},
	/**
	 * Connect board to interface.
	 */
	connectBoard: async function () {
		if ($("#simulator").is(":visible")) {
			toggleSimulator();
		}
		this.setupMonitor();
		if (navigator.serial && !this.serialMonitorConnected) {
			await this.doConnect();
		}
	},
	/**
	 * Open serial connection on COM port.
	 */
	doConnect: async function () {
		await this.serial.open(this.callbackError.bind(this));
		this.info.lastConnection = {
			id: await this.serial.getInfo(),
			signals: await this.serial.getSignals(),
			port: this.serial.port
		};
		this._setSerialMonitor(true);
		this._readingLoop();
		InterfaceMonitor.writeConsole('code.serialAPI.boardConnected', 'success');
		$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
		$("#disconnect-opt").show();
	},

	callbackError: function (error) {
		const err = String(error);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/No port selected by the user/)) {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.noPortSelected'), 'bg-danger');
		} else if (err.match(/Failed to open serial port/)) {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.serialPortOpeningFail'), 'bg-danger');
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning');
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
		this.serial.reset();
	},
	/**
	 * [Button] Disconnect board from interface.
	 */
	doDisconnect: async function () {
		if (this.serialMonitorConnected && this.serial.port) {
			this.hasToClose = true;
			await this.serial.reader.cancel();
			await this.serial.close()
			this.reset();
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success');
		} else if (this.avrgirl && this.avrgirl.connection.serialPort.isOpen) {
			await this.avrgirl.connection.serialPort.close();
			this.reset();
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success');
		}
	},
	
	/**
	 * [Button] Upload Arduino program using the VPS server compiling Arduino code.
	 */
	uploadArduino: async function () {
		try {
			this._prepareForUpload(); // Préparation de l'interface et déconnexion si nécessaire
			await this._disconnectIfConnected();
			this._displayCompilingNotice();
			const compilingData = await this._getSettingsForCompiling(this._getSelectedBoard());
			const compilationStartTime = Date.now();
			const hex = await this._compileCode(compilingData);
			if (hex) {
				const compilationEndTime = Date.now();
				const compilationDuration = compilationEndTime - compilationStartTime
				if (compilationDuration > 4000 && $_GET('compiler') !== 'local') {
					await this._askForUserGesture();
				}
				this._hideCompilingNotice();
				InterfaceMonitor.writeConsole('code.successMsg.uploading');
				this.hex = hex;
				await this._flashArduinoCode(hex);
			}
		} catch (error) {
			console.error(error);
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

	/**
	 * Hide the compiling notice
	 * @private
	 * @returns  {undefined} In early return case
	 */
	_hideCompilingNotice() {
		const compilingNoticeElt = document.querySelector('#compiling-notice');
		if (compilingNoticeElt === null) return;
		compilingNoticeElt.style.display = 'none';
	},

	// Fonction pour préparer l'interface avant l'upload
	_prepareForUpload: function () {
		if ($("#simulator").is(":visible")) {
			toggleSimulator();
		}

		if ($('#monitor').height() === 0) {
			InterfaceMonitor.toggle();
		}
	},

	// Fonction pour déconnecter si le moniteur série est connecté
	_disconnectIfConnected: async function () {
		if (this.serialMonitorConnected) {
			await this.doDisconnect();
		}
	},

	// Fonction pour compiler le code
	_compileCode: async function (compilingData, skipUpload = false) {
		try {
			return await this._compile(compilingData, skipUpload);
		} catch (error) {
			console.error('Compilation error:', error);
			throw error; // Propager l'erreur pour que `uploadArduino` puisse la traiter
		}
	},

	// Fonction pour flasher le code sur l'Arduino
	_flashArduinoCode: async function (hex) {
		try {
			if (this.avrgirl && this.avrgirl.connection.serialPort.isOpen) {
				await this._flashWithOpenPort(hex);
			} else {
				await this._flashWithNewAvrgirl(hex);
			}
		} catch (error) {
			console.error('Flashing error:', error);
		}
	},

	// Fonction pour flasher le code lorsque le port série est déjà ouvert
	_flashWithOpenPort: async function (hex) {
		await this.avrgirl.flash(hex, (error) => {
			if (error) {
				console.error(String(error));
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.fileDownloadedArduino', 'success');
			}
		}, isHexString = true, openingPort = false, closingPort = false);
	},

	// Fonction pour créer une nouvelle instance d'AvrgirlArduino et flasher le code
	_flashWithNewAvrgirl: async function (hex) {
		const board = this._getSelectedBoard();

		this.avrgirl = new AvrgirlArduino({
			board: board.id,
			port: board.id === 'pro-mini' ? '/dev/cu.usbserial-A50285BI' : null,
			debug: false,
			requestOptions: {
				filters: this.options.boardsFilter ? this.options.boardsFilter : []
			}
		});

		this.closingPort = (board.id === 'pro-mini');
		await this.avrgirl.flash(hex, this.avrgirlFlashCallback.bind(this), isHexString = true, openingPort = true, closingPort = this.closingPort);
	},

	avrgirlFlashCallback: async function (error, info) {
		if (error) {
			const err = String(error);
			if (err.match(/(DOMException|NotFoundError).*No port selected by the user/)) {
				InterfaceMonitor.writeConsole('code.serialAPI.noPortSelected', 'warning');
				this.reset();
			} else if (err.match(/NetworkError: Failed to open serial port/)) {
				InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning');
				this.reset();
			} else if (err.match(/(DOMException|NetworkError): The device has been lost/)) {
				InterfaceMonitor.writeConsole('code.serialAPI.boardDisconnected', 'warning');
				this.reset();
			} else if (err.match(/ProductError: connected board is not/)) {
				const detectedBordInfo = this._getDetectedBoard(info);
				if (this.selectOptionByLabel(detectedBordInfo)) {
					return await this._flashWithNewAvrgirl(this.hex);
				}
				InterfaceMonitor.writeConsole("Carte détectée: <b>" + detectedBordInfo + '</b>.');
				if (this.avrgirl) {
					const errorMsg = jsonPath('code.serialAPI.badBoard') + '<b>' + this.avrgirl.connection.board.name + '</b>. ' + jsonPath('code.serialAPI.checkBoardSettings');
					InterfaceMonitor.writeConsole(errorMsg, 'warning');
				}
				this.reset();
			} else if (err.match(/(DOMException|ParityError|BufferOverrunError)\: A ((framing|parity) error|buffer overrun|break condition) has been detected\./)) {
				InterfaceMonitor.writeConsole('code.serialAPI.flashFailed', 'warning');
				this.doDisconnect();
			}
		} else {
			if (this.avrgirl) {
				this.boardName = this.avrgirl.connection.board.name;
				if (this.boardName) {
					InterfaceMonitor.writeConsole("Carte détectée: <b>" + this.boardName + '</b>');
				}
				this.doDisconnect();
			}
			InterfaceMonitor.writeConsole('code.serialAPI.fileDownloadedArduino', 'success');
			$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
			$("#disconnect-opt").show();
		}
		if (info && typeof info === 'object') {
			this.info.lastConnection = info;
		}
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
			const message = $("#serial-input").val();
			if (this.serialMonitorConnected && message && typeof message === 'string') {
				InterfaceMonitor.writeConsole("Sending '" + message + "' (" + new Blob([message]).size + " bytes) to serial port.", "neutral");
				this.serial.write(new TextEncoder('utf-8').encode(message));
				InterfaceMonitor.history.push(message);
				$('#serial-input').val("");
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForArduino', 'warning');
			}
		}
	},
	/**
	 * Check if the detected board is compatible with the interface
	 * @return {boolean}
	 */
	selectOptionByLabel(label) {
		const select = document.getElementById('board-select');
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
	_getSelectedBoard() {
		const selectedBoard = this.options.boardSelection ? $('#board-select').find(":selected").text() : this.options.boardName;
		if (this.options.boardSelection) {
			return ARDUINO_BOARDS.find((item, index) => item.name === selectedBoard)
		} else {
			return ARDUINO_BOARDS.find((item, index) => item.id === this.options.board)
		}
	},
	/**
	 * Get the board detected name with the id informations.
	 * @param {Object} info 
	 * @returns {string} boardName
	 */
	_getDetectedBoard(info) {
		if (info) {
			const condition = (e, index) => (e.vid == info.id.usbVendorId && (e.pid == info.id.usbProductId || e.productId.includes('0x' + info.id.usbProductId.toString(16).padStart(4, '0'))));
			const board = ARDUINO_BOARDS.find(condition);
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
		if (board) {
			// Setting up build options from the board object.
			const build = {
				"mcu": board.mcu,
				"f_cpu": board.f_cpu,
				"core": board.core,
				"variant": board.variant
			};
			if (board.vid && board.pid) {
				build.vid = board.vid;
				build.pid = board.pid;
			}
			// Grouping content into JSON.
			const compilingData = {
				"files": [{
					"filename": "test.ino",
					"content": code.replace(/rgb_lcd/g, "rgb_lcd_v2")
				}],
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
					InterfaceMonitor.writeConsole('code.errorMsg.compilation', 'warning');
					reject("VPS backend error");
					//In "success" is false, that means compilation worked out.
				} else if (response.success) {
					if (!uploadSkipped) {
						const bufferArray = new Uint8Array(response.output.match(/[\da-f]{2}/gi).map(function (h) {
							return parseInt(h, 16)
						}));
						const maximum_size = _this._getSelectedBoard().maximum_size;
						if (maximum_size) {
							const hexLengthPercent = Math.round(bufferArray.length / maximum_size * 100);
							InterfaceMonitor.writeConsole("Le programme utilise " + bufferArray.length + " octets d'espace de stockage. (" + hexLengthPercent + "%)");
						}
						InterfaceMonitor.writeConsole('code.successMsg.compilation', 'success');
						return resolve(response.output)
						// Else, it's just a syntax verification, and no error occurred.
					} else {
						pseudoModal.closeLatestModal();
						InterfaceMonitor.writeConsole('code.successMsg.syntax', 'success');
						resolve();
					}
				} else {
					//If "success" is false, that means compilation didn't work as excepted.
					InterfaceMonitor.writeConsole('code.errorMsg.syntax', 'warning');
					InterfaceMonitor.writeConsole(response.message.replace(/\n/gi, '</br>'), 'warning');
					pseudoModal.closeLatestModal();
					resolve();
				}
				_this._hideCompilingNotice();
			};
			
			if (!data) return reject();
			
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
		const compilingData = await this._getSettingsForCompiling(this._getSelectedBoard());
		const hex = await this._compileCode(compilingData, true);
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
		const addLoadingInfo = () => {document.querySelector('#local-compilation-loading-area').innerHTML = `<img class="local-compilation-spinner" src="/public/content/img/spinning-loader.svg">${i18next.t('modals.standard.local-compilation.loadingDescription')}`;};
		const addLoadedInfo = () => {document.querySelector('#local-compilation-loading-area').innerHTML = `${i18next.t('modals.standard.local-compilation.emulatorLoaded')} &#x2705;`;};
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
		progressBarElt.style.transform = `scaleX(${percentage/100})`;
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
		document.querySelector('#compilation-steps-progress-bar').style.transform = `scaleX(${percentage/100})`;
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
			console.error(err);
			if (err.match(/(DOMException|NetworkError): The device has been lost/)) {
				InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
				this.reset();
			} else if (err.match(/(ParityError|FramingError|BreakError|BufferOverrunError): A ((framing|parity) error|buffer overrun|break condition) has been detected\./)) {
				InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.baudrateError'), 'warning');
				await this.serial.close();
				this.reset();
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
		const compilingData = await this._getSettingsForCompiling(this._getSelectedBoard());
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

/**
 * This function records all the pressed keys in the array `pressedKeys`
 * @param {DOM} e the DOM keypress element (document in this case)
 */
function multipleKeyPress(e) {
	if (!this.serial.pressedKeys.includes(e.key)) {
		this.serial.pressedKeys.push(e.key);
	}
	// Ctrl+B management for Keyboard Interrupt
	if (this.serial.pressedKeys.includes('Control') && this.serial.pressedKeys.includes('b')) {
		this.repl.open();
	}
};
