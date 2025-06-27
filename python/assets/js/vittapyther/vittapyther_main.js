import VittapytherSocket from './vittapyther_socket.js';
import VittapytherVnc from './vittapyther_vnc.js';

/**
 * Vittapyther button management
 */

class VittapytherButton {

	constructor() {
		this.monitorElt = false;
		this.screenElt = false;
		this.buttonElt = false;
		this.vittapytherSocket = false;
		this.vittapytherVnc = false;
		this.clickOnResizeBar = false;
		this.nodeCertificate = false;
		this.vncCertificate = false;
		this.host = "localhost";
		this.isLocal = true;
		this.requestParameter = false;
		this.checkContainerInterval = null;
		this.getFreeContainerResponse = null;
		this.resized = false;
	}

	_setLangDomains() {
		const lang = ['ar', 'en', 'es', 'fr', 'it'];
		const currentDomain = location.host;
		for (let l of lang) {
			const rewritedDomain = `${l}.vittascience.com`;
			if (rewritedDomain === currentDomain) {
				this.isLocal = false;
				this.host = "loadbalancer.vittascience-backend.com";
				break;
			}
		}
	}

	/**
	 * Run all the methods and listeners needed at startup
	 */
	async init() {
		this.storeTheKeyForVm();
		await awaitJsonPath();
		if (INTERFACE_NAME === 'python') $("#console").html(`${jsonPath('code.welcome.python')}\n>>>`);
		document.addEventListener('click', (e) => {
			switch (e.target.id) {
				case 'modal-warning-login-login':
					pseudoModal.closeLatestModal();
					displayLogin();
					break;
				case 'modal-warning-login-cancel':
					pseudoModal.closeLatestModal();
					break;
				case 'modal-warning-credentials-continue':
					displayLogin();
					pseudoModal.closeLatestModal();
					break;
				case 'modal-warning-credentials-cancel':
					pseudoModal.closeLatestModal();
					break;
				case 'modal-warning-premium-cancel':
					pseudoModal.closeLatestModal();
					break;
				case 'runButtonPython':
					vittapytherButton.runEvalPython();
					break;
				case 'modal-warning-premium-copy':
					this.copyToClipboard();
					break;
				case 'console':
					if (INTERFACE_NAME === 'python') PythonRun.initRepl();
					break;
				default:
					break;
			}

			if (e.target.classList.contains('canvas-ti-turtle')) {
				if (!PythonRun.replInitialized) {
					PythonRun.initRepl("ti_screen-value");
				} else if (!PythonREPL.focusState) {
					PythonREPL.toggleCaret();
					PythonREPL.init();
				}
			}

			// case for the icon and text in the button
			if (e.target.parentNode && e.target.parentNode.id == 'runButtonPython') {
				vittapytherButton.runEvalPython();
			}

			// binding key for script execution
			document.addEventListener('keydown', function(event) {
				if (event.ctrlKey && event.key === 'Enter') {
					vittapytherButton.runEvalPython();
				}
			});


			if (e.target.id == 'resize-manager') {
				let width = document.getElementById('resize-manager').getAttribute("data-width");
				let height = document.getElementById('resize-manager').getAttribute("data-height");
				vittapytherButton.sendResizeRequest(width, height);
			}

		}, false);
		document.addEventListener('keyup', (e) => {
			if (e.target.id === 'console')
				if (!PythonREPL.focusState) {
					if (e.code === "Enter") {
						PythonRun.initRepl();
						document.querySelector('#console').click();
					}
				}
		});
		this._setLangDomains();
	}

	sendResizeRequest(width, height) {
		this.vittapytherSocket.sendResize({ width: width, height: height });
	}

	storeTheKeyForVm() {
		if (localStorage.getItem("accessKey") === null) {
			let key = this.createKey();
			localStorage.setItem('accessKey', key);
		}
	}

	createKey(length = 6) {
		let key = "";
		for (let i = 0; i < length; i++) {
			key += (Math.random() + 1).toString(36).substring(5);
		}
		return key;
	}

	/**  
	 * Instantiate the socket that handle communication with the node server
	 */
	runNodeSocket() {
		this.vittapytherSocket = new VittapytherSocket({
			serverAddress: `wss://${this.host}?c=${this.requestParameter}n`,
			pythonOutputElt: document.getElementById('console'),
			promptArrows: false
		});
	}
	/**
	 * Instantiate the canvas and socket that enable the vnc client and connect it to the vnc server
	 */
	runVnc() {
		this.vittapytherVnc = new VittapytherVnc({
			serverAddress: `wss://${this.host}?c=${this.requestParameter}v`,
			screenElt: document.getElementById('screen')
		});
	}

	/**
	 * Management of VM creation from code
	 */
	runEvalPython() {
		if (this.isLocal) {
			this.replManager();
			this.tryOnSkulpt();
		} else {
			checkIfExerciceIsOnlyServerSide().then(response => {
				this.replManager();
				if (response.success == true && response.message == "serverOnly") {
					this.containerRequest();
				} else {
					this.tryOnSkulpt();
				}
			})
		}
	}

	async tryOnSkulpt() {
		PythonRun.clearMonitor();
		$('#canvas-matplotlib, #canvas-turtle').hide();
		await PythonRun.start(Main.hasPyToBlocks() ? CodeManager.getSharedInstance().getTextCode() : CodeManager.getSharedInstance().getCode(), "console");
		if (PythonRun.canRun[0] == false && typeof IS_CAPYTALE_CONTEXT == 'undefined') {
			this.isLocal ? this.connectToAndRunPythonLocal() : this.containerRequest();
		}
		PythonREPL.init();
		PythonRun.monitor.click();
	}

	replManager() {
		if ($('#monitor').hasClass('monitor-closed') || $('#monitor').width() == '0') {
			InterfaceMonitor.toggle();
		}

		PythonREPL.clear();

		setTimeout(() => {
			var consolePython = document.getElementById('console');
			consolePython.scrollTop = consolePython.scrollHeight;
			if ($('#cursor').length) {
				$("#cursor").html("");
				$('#cursor').removeAttr('id');
			}
		}, 50);
	}

	/**
	 * 
	 */
	containerRequest = () => {
		getFreeContainer().then((response) => {
			this.getFreeContainerResponse = response;

			let noContainer = i18next.t('pythonServer.messages.noContainer'),
				awaitTime = i18next.t('pythonServer.messages.awaitTime'),
				awaitContainer = i18next.t('pythonServer.messages.awaitContainer'),
				connectionStarted = i18next.t('pythonServer.messages.connectionStarted');


			if (response.hasOwnProperty('message')) {
				if (response.message == "noContainer") {
					PythonREPL.terminal.innerText += "\n " + noContainer;
					PythonREPL.terminal.innerText += "\n " + awaitTime;
				} else if (response.message == "waitingContainer") {
					PythonREPL.terminal.innerText += "\n " + awaitContainer;
				}
				if (this.checkContainerInterval == null) {
					this.checkContainerInterval = setInterval(() => {
						this.containerRequest();
					}, 15000);
				}
			} else if (response.hasOwnProperty('auth')) {
				if (response.auth == false && response.response == "notLogged") {
					pseudoModal.openModal('python-server-warning-login');
				} else if (response.auth == false && response.response == "noCredentials") {
					pseudoModal.openModal('python-server-warning-credentials');
				}
			} else {
				clearInterval(this.checkContainerInterval);
				this.requestParameter = response;
				this.checkContainerInterval = null;
				this.connectToAndRunPython();
				// PythonREPL.terminal.innerText = connectionStarted + " \n";
			}
		})
	}

	connectToAndRunPython = () => {
		this.monitorElt = document.getElementById('monitor');
		this.createAndAppendElts();

		if (!this.vittapytherSocket) {
			this.runNodeSocket();
		}

		if (!this.vittapytherVnc) {
			this.runVnc();
		}

		// return from sleep mode
		if (document.getElementById('screen')) {
			if (document.getElementById('screen').innerHTML == '' && this.vittapytherVnc) {
				this.vittapytherVnc.startConnection();
			}
		}

		this.runPython();

		if (!this.resized) {
			this.resized = true;
			setTimeout(() => {
				this.setUserDimension();
			}, 1000);
		}
	}

	/**  
	 * Local management
	 */
	runNodeSocketLocal() {
		this.vittapytherSocket = new VittapytherSocket({
			serverAddress: `ws://${this.host}:3960`,
			pythonOutputElt: document.getElementById('console'),
			promptArrows: false
		});
	}

	runVncLocal() {
		this.vittapytherVnc = new VittapytherVnc({
			serverAddress: `ws://${this.host}:6080`,
			screenElt: document.getElementById('screen')
		});
	}

	connectToAndRunPythonLocal = () => {
		this.monitorElt = document.getElementById('monitor');
		this.createAndAppendElts();
		if (!this.vittapytherSocket) {
			this.isAllowedNodeCertificate().then(() => {
				this.runNodeSocketLocal();
				if (!this.vittapytherVnc) {
					this.isAllowedVncCertificate().then(() => {
						this.runVncLocal();
						// return from sleep mode
						if (document.getElementById('screen')) {
							if (document.getElementById('screen').innerHTML == '' && this.vittapytherVnc) {
								this.vittapytherVnc.startConnection();
							}
						}
						this.runPython();
						if (!this.resized) {
							this.resized = true;
							setTimeout(() => {
								this.setUserDimension();
							}, 1500);
						}
					});
				}
			});
		}
	}

	/**
	 * SELF SIGNED SSL CERTIFICATE FOR LOCAL SETUP
	 */
	isAllowedNodeCertificate = async () => {
		return new Promise((resolve, reject) => {
			let socket;
			socket = io(`ws://${this.host}:3960`, {
				reconnection: false,
				transports: ['websocket']
			});
			socket.on('connect_error', (err) => {
				window.open(`https://${this.host}:3960`);
				return reject();
			})
			socket.on('connect', function () {
				socket.close();
				return resolve(true);
			})
		});
	}

	isAllowedVncCertificate = async () => {
		return new Promise((resolve, reject) => {
			let socket;
			socket = new WebSocket(`ws://${this.host}:6080`);
			socket.onerror = (err) => {
				window.open(`https://${this.host}:6080`);
				reject();
			};
			socket.onopen = () => {
				socket.close();
				resolve(true);
			}
		});
	}

	setUserDimension() {
		let width = document.getElementById('screen').offsetWidth,
			height = document.getElementById('screen').offsetWidth,
			storageConsole = false;

		if (width < 1 || height < 1) {
			return false;
		}

		if (JSON.parse(localStorage.getItem('console')) !== null && JSON.parse(localStorage.getItem('console')) !== undefined) {
			storageConsole = JSON.parse(localStorage.getItem('console'));
		}

		if (storageConsole) {
			if (storageConsole["python"] == undefined || storageConsole["python"] == 'bottom') {
				this.sendResizeRequest(Math.ceil((Math.floor(height) * 16) / 9), Math.ceil(height) - 2);
			} else {
				this.sendResizeRequest(Math.ceil(width), Math.ceil((Math.floor(width) * 9) / 16));
			}
		} else {
			this.sendResizeRequest(Math.ceil((Math.floor(height) * 16) / 9), Math.ceil(height) - 2);
		}
	}

	/**
	 * 
	 */
	runPython() {
		// If this is the first time that the run Python method is executed we have to setup things first
		if (!this.vittapytherSocket.socket) {
			PythonREPL.vittapytherState = true;
			// Initialize the socket that communicate with node server (connection and listeners)
			this.vittapytherSocket.init();
			// Replacing the send method of the repl
			PythonREPL.send = (code) => {
				try {
					if (!code || /^\s*$/.test(code)) {
						return;
					} else {
						// Show the console if it's hidden
						if ($('#monitor').hasClass('monitor-closed')) {
							InterfaceMonitor.toggle();
						}
						// resize the different workspaces in the IDE
						$(function () {
							return new Promise((resolve, reject) => {
								$('.ide-editor').animate({
									height: "100%"
								}, "fast", "swing", function () {
									resolve();
								}, {
									queue: false
								});
								$('#content_blocks').animate({
									height: "100%"
								}, "fast", "swing", {
									queue: false
								});
								$('#generator').animate({
									height: "100%"
								}, "fast", "swing", {
									queue: false
								});
								$('#monitor').animate({
									height: "100%"
								}, "fast", "swing", {
									queue: false
								});
							})
								.then(function () {
									Blockly.svgResize(Blockly.getMainWorkspace());
								});
						});

						this.vittapytherSocket.runReplPython(code, () => {
							PythonREPL.promptLine.preSpanElt.textContent = '';
							PythonREPL.promptLine.postSpanElt.textContent = '';
							if (PythonREPL && PythonREPL.promptLine && PythonREPL.promptLine.wrapElt && PythonREPL.terminal.contains(PythonREPL.promptLine.wrapElt)) {
								PythonREPL.terminal.removeChild(PythonREPL.promptLine.wrapElt);
							}
							PythonREPL.terminal.appendChild(PythonREPL.promptLine.wrapElt);
						});
					}
				} catch (err) {
					PythonREPL.terminal.innerHTML += err + '\n';
					return false;
				}
			}

			// add the resize listener to the socket
			this.vittapytherSocket.socket.on('resized', () => {
				setTimeout(() => {
					this.vittapytherVnc.startConnection();
				}, 100);
			});
		}

		// Hiding the skulpt graphic interfaces
		$('#canvas-matplotlib, #canvas-turtle').hide();
		if ($('#monitor').hasClass('monitor-closed') || $('#monitor').width() == '0') {
			InterfaceMonitor.toggle();
		}

		// Execute the python code only if the python code is not the same as the last one
		$("#console").html('');
		// Send the python code to the server to be evaluated and then run a callback when the evaluation ends
		this.vittapytherSocket.runPython(CodeManager.getSharedInstance().getCode(), () => {
			PythonREPL.clear();
			PythonREPL.init();
			const consolePython = document.getElementById('console');
			consolePython.scrollTop = consolePython.scrollHeight;
			if ($('#cursor').length) {
				$("#cursor").html("");
				$('#cursor').removeAttr('id');
			}
			if (!PythonREPL.focusState) {
				PythonREPL.focusState = true;
				PythonREPL.toggleCaret();
			}
		});
	}

	/**
	 * Creates and adds the VNC elements in the DOM
	 */
	createAndAppendElts() {
		this.screenOpt = document.createElement('div');
		this.screenElt = document.createElement('div');
		this.buttonSize = document.createElement('button');
		this.buttonSize.id = "vnc-full-screen";
		this.buttonSize.innerHTML = "<i class='fas fa-expand'></i> Passer en plein écran";
		this.buttonSize.className = "btn-sizable-screen";
		this.screenElt.id = 'screen';
		this.screenOpt.id = 'size';
		if (!document.querySelector('#size')) {
			document.getElementById('monitor-content').append(this.screenOpt);
			document.getElementById('size').append(this.buttonSize);
		}
		if (!document.querySelector('#screen')) {
			document.getElementById('monitor-content').append(this.screenElt);
		}
	}

	/**
	 * Event with modals
	 * Modal management - Work in progress
	 */

	popModalLogin() {
		pseudoModal.openModal('python-server-warning-login');
	}

	popModalCredentials() {
		pseudoModal.openModal('python-server-warning-credentials');
	}

	copyToClipboard() {
		// Create new element
		const el = document.createElement('textarea');
		// Set value (string to be copied)
		el.value = CodeManager.getSharedInstance().getCode();
		// Set non-editable to avoid focus and move outside of view
		el.setAttribute('readonly', '');
		el.style = { position: 'absolute', left: '-9999px' };
		document.body.appendChild(el);
		// Select text inside element
		el.select();
		// Copy text to clipboard
		document.execCommand('copy');
		// Remove temporary element
		document.body.removeChild(el);
	}

	async setRunningCodeTooltip() {
		if (this._runningCodeTooltip) {
			this._runningCodeTooltip.style.display = 'block';
			return;
		}
		const runButtonPanelElt = document.querySelector('#execution-buttons-panel');
		const tooltipElt = document.createElement('div');
		tooltipElt.classList.add('running-code-tooltip');
		tooltipElt.innerHTML = `
		<div class="tooltip-inner-wrapper">
			<div class="running-code-tooltip-triangle"></div>
			<i class="fa-sharp fa-solid fa-gears"></i>
			<span>${jsonPath('code.topbar.tooltips.runningCode')}</span>
			<button id="stopRunButtonPython" class="btn v-btn-grey">
				${jsonPath('code.topbar.tooltips.runningCodeStopButton')}
				<i class="fa-sharp fa-solid fa-xmark ms-2"></i></button>
		</div>`;
		runButtonPanelElt.appendChild(tooltipElt);
		this._runningCodeTooltip = tooltipElt;
	}

	hideRunningCodeTooltip() {
		if (typeof this._runningCodeTooltip === 'undefined') {
			return;
		}
		this._runningCodeTooltip.style.display = 'none';
	}
}

window.vittapytherButton = new VittapytherButton();
vittapytherButton.init();
