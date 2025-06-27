class NaoCom {
	static instance = null; // Singleton instance
	constructor() {
		if (NaoCom.instance) {
			return NaoCom.instance;
		}
		this.naoAdress = null;
		this.connected = false;
		this.naoConnected = false;
		this.socket = null;
		this.spinningLoaderLink = `${CDN_PATH}/public/content/img/spinning-loader.svg`;
		this.isWakeUp = false;

		NaoCom.instance = this;
	}

	/**
	 * Get the connection status
	 * @returns {boolean} - connection status
	 * **/
	getConnectionStatus() {
		return this.connected;
	}

	/**
	 * Connect to NAO (called once, if raspberry is already connected, it will resolve the promise )
	 * @param {Simulator3D} simu - Simulator3D instance
	 * @returns {Promise} - Promise object represents the connection status
	 **/

	socketIOConnect(simu) {
		this.simu = simu;
		return new Promise((resolve, reject) => {
			if (this.connected) {
				resolve(true);
			}
			try {
				this.socket = io.connect(`ws://localhost:8889`, {
					reconnection: false,
					reconnectionDelay: 1000,
					reconnectionDelayMax: 5000,
					reconnectionAttempts: 3,
					timeout: 2000,
					autoConnect: true,
					transports: ['websocket'],
					query: { ip: this.naoAdress },
				});

				this.socket.on('pending-nao-connection', () => {
					this.pendingConnection = true;
					const inputDiv = document.getElementById('nao-ip-inputs');
					inputDiv.style.display = 'none';
					const loaderDiv = document.getElementById('nao-loading-connection');

					const loader = document.createElement('img');
					loader.style.marginBottom = '20px';
					loader.style.width = '45px';
					loader.id = 'program-started-loader';
					loader.src = this.spinningLoaderLink;
					loaderDiv.appendChild(loader);
					this.loadingNaoConnection();
				});

				this.socket.on('diagnosis', (data) => {
					console.log('Diagnosis:', data);
				});

				this.socket.on('disconnect', () => {
					console.log('Disconnected from server');
					simu.naoConnected = false;
					simu.socket = null;
					simu.realtimeMovement = false;
					this.socket.removeAllListeners();
					this.instance = null;
					this.naoAdress = null;
					$('#disconnect-opt').hide();
					$('#connected-icon').remove();
					const canvasCamera = document.getElementById('cameraCanvas');
					if (canvasCamera) {
						canvasCamera.remove();
					}

					this.updateConnectionUI(false);
				});

				this.socket.on('connect_error', (error) => {
					pseudoModal.openModal('model-connection-vitta-companion');
					this.connected = false;
					this.naoAdress = null;
					reject(error); // reject the promise if connection fails
				});

				this.socket.on('connect_error', (error) => {
					console.log('Connection Error:', error);
				});

				this.socket.on('nao-connection-instanciated', () => {
					simu.reset();
					console.log('NAO connected');
					simu.socket = this.socket;
					const loaderDiv = document.getElementById('nao-loading-connection');
					const loader = document.getElementById('program-started-loader');
					loaderDiv.removeChild(loader);

					this.pendingConnection = false;

					this.socket.emit('subscribe_joints_states', 'get_joint_status');
					this.socket.emit('subscribe_robot_position', 'get_robot_position');

					// to keep for future development
					// this.socket.emit('get_com', 'get_com');
					// this.socket.emit('get_support_polygon', 'get_support_polygon');

					InterfaceMonitor.writeConsole(`[NAO V6] connected to NAOV6: @${this.naoAdress}`, 'success');
					const connectedIcon = document.getElementById('connected-icon');
					if (!connectedIcon) {
						$('#execution-buttons-panel').append('<i id="connected-icon" class="fab fa-usb"></i>');
					}
					$('#disconnect-opt').show();
					$('#download-firmware-opt-mac').hide();
					$('#download-firmware-opt-windows').hide();
					$('#download-firmware-opt-linux').hide();

					const checkedIcon = document.createElement('i');
					checkedIcon.classList.add('fa-solid', 'fa-check');
					checkedIcon.style.color = '#22b573';
					checkedIcon.style.fontSize = '1.5rem';
					loaderDiv.appendChild(checkedIcon);

					this.updateConnectionUI(true);
					setTimeout(() => {
						pseudoModal.closeModal('modal-connection-nao');
						loaderDiv.removeChild(checkedIcon);
						const errorMessage = document.getElementById('nao-connection-error');
						const ipFieldError = document.getElementById('user-ip-adress-nao');
						errorMessage.style.display = 'none';
						ipFieldError.innerHTML = '';
						const inputDiv = document.getElementById('nao-ip-inputs');
						inputDiv.style.display = 'flex';
					}, 1500);

					resolve(true);
				});

				this.socket.on('touch_changed', (data) => {
					simu.touchChanged(data);
				});

				this.socket.on('sonar_value', (data) => {
					simu.updateSonar(data);
				});

				this.socket.on('event', (data) => {
					if (data === 'program_running') {
						this.programRunning = true;
						const uploadButton = document.getElementById('upload-python');
						if (uploadButton) {
							uploadButton.disabled = true;
							uploadButton.style.cursor = 'not-allowed';
						}
						const loader = document.createElement('img');
						loader.style.width = '45px';
						loader.id = 'program-running-loader';
						loader.src = this.spinningLoaderLink;
						$('#execution-buttons-panel').append(loader);
					} else if (data === 'program_ended') {
						const loader = document.getElementById('program-running-loader');
						if (loader) {
							loader.remove();
						}
						const uploadButton = document.getElementById('upload-python');
						if (uploadButton) {
							uploadButton.disabled = false;
							uploadButton.style.cursor = 'pointer';
						}
						this.programRunning = false;
						InterfaceMonitor.writeConsole('[NAO V6] Program ended', 'success');
					} else if (data === 'Kill_command_sent') {
						InterfaceMonitor.writeConsole('[NAO V6] Interrupting program...', 'warning');
					} else if (data === 'nao_shutdown') {
						InterfaceMonitor.writeConsole('[NAO V6] NAO is shutting down...', 'warning');
					}
				});

				this.socket.on('error', (error) => {
					console.error('Error:', error);
					const splitError = error.split('\n');
					const userCode = CodeManager.getSharedInstance().getCode().split('\n');
					const getLine = (error) => {
						let line = null;
						const valueMatch = error.match(/'(.*?)'/);
						for (let lines = 0; lines < userCode.length; lines++) {
							if (userCode[lines].match(valueMatch[1])) {
								line = lines;
							}
						}
						if (line !== null) {
							InterfaceMonitor.writeConsole(`[NAO V6] Error at line ${line + 1}`, 'warning');
						} else {
							InterfaceMonitor.writeConsole(`[NAO V6] Error: ${error}`, 'warning');
						}
					};
					for (let i = 0; i < splitError.length; i++) {
						if (splitError[i].match(/ValueError: /)) {
							InterfaceMonitor.writeConsole(`[NAO V6] Error: ${splitError[i]}`, 'warning');
						} else if (splitError[i].match('NameError: name')) {
							getLine(splitError[i]);
						} else if (splitError[i].match('SyntaxError')) {
							InterfaceMonitor.writeConsole(`[NAO V6] Error: ${error}`, 'warning');
						} else if (splitError[i].match('RuntimeError:')) {
							InterfaceMonitor.writeConsole(`[NAO V6] Error: ${error}`, 'warning');
						}
					}
				});

				this.socket.on('robot_position', (data) => {
					simu.angleConversion.update3DPosition(data);
				});

				this.socket.on('joints_states', (data) => {
					simu.angleConversion.updatePose(data);
				});

				this.socket.on('single_joint_state_value', (data) => {
					console.log('Single joint state:', data);
				});

				this.socket.on('com_value', (data) => {
					simu.angleConversion.addCenterOfMass(data);
				});

				this.socket.on('camera_frame', (data) => {
					updateCameraFrame(data);
				});

				this.socket.on('support_polygon_value', (data) => {
					simu.angleConversion.drawSupportPolygon(data);
				});

				this.socket.on('message', (data) => {});

				this.socket.on('current_sentence', (data) => {
					simu.textGenerator.updateText(data, false);
				});

				this.socket.on('behavior_running', (data) => {
					console.log('Behavior list:', data);
				});

				this.socket.on('wake_up_status', (data) => {
					const restButton = document.getElementById('button-rest');
					if (data) {
						restButton.classList.remove('active-rest');
					} else {
						restButton.classList.add('active-rest');
					}
					this.isWakeUp = data;
					simu.isWakeUp = data;
				});
			} catch (error) {
				console.error('Connection failed:', error);
				reject(error);
			}
		});
	}

	loadingNaoConnection() {
		setTimeout(() => {
			if (this.pendingConnection) {
				const inputDiv = document.getElementById('nao-ip-inputs');
				inputDiv.style.display = 'flex';
				const loaderDiv = document.getElementById('nao-loading-connection');
				const loader = document.getElementById('program-started-loader');
				loaderDiv.removeChild(loader);
				this.pendingConnection = false;
				if (this.socket.connected) {
					this.socket.removeAllListeners();
					this.socket.disconnect();
					console.log('WebSocket disconnected.');
				}

				const errorMessage = document.getElementById('nao-connection-error');
				const ipFieldError = document.getElementById('user-ip-adress-nao');
				errorMessage.style.display = 'block';
				ipFieldError.innerHTML = 'IP: ' + this.naoAdress;

				return;
			}
		}, 10000);
	}
	sendRealTimeCommand(joint, value) {
		const realtimeMovementButton = document.getElementById('realtime-radio-button');
		if (this.isWakeUp && realtimeMovementButton.checked) {
			this.socket.emit('realtime_command', { joint, value: parseFloat(value) });
		}
	}

	updateConnectionUI(status) {
		this.connected = status;
		this.naoConnected = status;
		const uploadButton = document.getElementById('upload-python');
		uploadButton.style.display = status ? 'block' : 'none';

		const connectButton = document.getElementById('connect-robot');
		connectButton.style.display = status ? 'none' : 'block';

		const stopPythonButton = document.getElementById('stop-python');
		stopPythonButton.style.display = status ? 'block' : 'none';

		const connectedButtonGroup = document.getElementById('connected-buttons-group');
		connectedButtonGroup.style.display = status ? 'block' : 'none';

		this.simu.naoConnected = status;
		const realtimeMovementButton = document.getElementById('realtime-radio-button');
		realtimeMovementButton.disabled = !status;

		const robotStatusDiv = document.getElementById('robot-status');
		const robotStatusContainer = document.getElementById('robot-status-container');
		robotStatusDiv.innerHTML = status ? 'Robot Connecté' : 'Simulation';
		robotStatusContainer.style.backgroundColor = status ? '#22b573' : '#aeaeae';

		if (!status) {
			const realtimeMovementButton = document.getElementById('realtime-radio-button');
			realtimeMovementButton.disabled = true;
			const nonRealtimeMovementButton = document.getElementById('non-realtime-radio-button');
			nonRealtimeMovementButton.checked = true;
			const targetCursors = document.querySelectorAll('.target-marker-cursor');
			targetCursors.forEach((targetCursor) => {
				targetCursor.classList.remove('active');
			});
			this.simu.reset();
		}
	}
}

const shutdownCommand = () => {
	const nao = NaoCom.instance;
	if (!nao) {
		return;
	}
	nao.socket.emit('shutdown_command', 'shutdown');
};

/**
 * Parse the code from the code editor to remove dummy import statements and add proper indentation
 * @param {string} code - code from the code editor
 * @returns {string} - the final function to be executed on the NAO robot
 * **/
const parseCode = () => {
	const tsParsedCode = Python2Blocks.parseCode();
	const functions = [];
	const imports = [];
	const mainBody = [];
	const indent = 4;

	for (const child of tsParsedCode.children) {
		if (child.type === 'function_definition' || child.type === 'decorated_definition') {
			functions.push(child.text);
		} else if (child.type !== 'import_statement' && child.type !== 'import_from_statement') {
			const indentedLines = child.text
				.split('\n')
				.map((line) => ' '.repeat(indent) + line)
				.join('\n');
			mainBody.push(indentedLines);
		} else {
			imports.push(child.text);
		}
	}
	return { functions, mainBody, imports };
};

getExtraCode = (imports) => {
	const nao = NaoCom.instance;
	let finalExtraCode = '';
	let needSonar = false;
	for (const imp of imports) {
		if (imp.includes('game')) {
			const value = imp.split(' ');
			if (value.includes('game') && value.includes('countries')) {
				finalExtraCode = game_countries + '\n';
			} else if (value.includes('game') && value.includes('dynamic_story1')) {
				finalExtraCode = dynamic_story1 + '\n';
			} else if (value.includes('game') && value.includes('dynamic_story2')) {
				finalExtraCode = dynamic_story2 + '\n';
			} else if (value.includes('game') && value.includes('mental_math_numbers')) {
				finalExtraCode = mental_math_numbers + '\n';
			}
		} else if (imp.includes('sonar_service')) {
			needSonar = true;
		}
	}
	if (needSonar && nao) {
		nao.socket.emit('subscribe_sonar', 'get_sonar');
	} else if (!needSonar && nao) {
		nao.socket.emit('unsubscribe_sonar', 'unsubscribe_sonar');
	}
	return finalExtraCode;
};

/**
 * fetch the the base code (/openInterface/nao/assets/lib/robot_wrapper.py) && extract the code from the code editor and append it to the base code in __main__ function
 * @returns {string} the final code to be executed on the NAO robot
 * **/
const extractCode = async () => {
	const codeBasePath = '/openInterface/nao/assets/lib/robot_wrapper.py';

	try {
		const response = await fetch(codeBasePath);

		if (!response.ok) {
			throw new Error(`Erreur lors du chargement du fichier: ${response.statusText}`);
		}

		const baseCode = await response.text();
		const code = CodeManager.getSharedInstance().getCode();

		const { functions, mainBody, imports } = parseCode(code);
		const extra = getExtraCode(imports);
		const finalCode = `${baseCode}\n
${extra}\n
${functions.join('\n')}\n

if __name__ == "__main__":
    robotWrapper = RobotWrapper()
    
    motion_service = robotWrapper.motion
    leds_service = robotWrapper.leds
    tts = robotWrapper.tts
    asr = robotWrapper.asr
    sensors_service = robotWrapper.sensors
    sonar_service = robotWrapper.sonar
    
    isWakeUp = motion_service.robotIsWakeUp()
    
    if not isWakeUp:
        motion_service.wakeUp()\n
${mainBody.join('\n\n')}
    if robotWrapper is not None:
        robotWrapper.cleanUp()
`;

		return finalCode;
	} catch (err) {
		console.error('Erreur :', err);
	}
};

/**
 * Execute the code on the NAO robot
 * @returns {Promise} - Promise object represents the execution status
 * **/
const execSSHCommand = async () => {
	const nao = NaoCom.instance;
	if (!nao) {
		return;
	}
	const code = await extractCode();
	return new Promise((resolve, reject) => {
		nao.socket.emit('exec_command', code, (response) => {
			if (response === 'action_done') {
				resolve(true);
			} else {
				reject(false);
			}
		});
	});
};

const getDiagnosis = () => {
	const nao = NaoCom.instance;
	if (!nao) {
		return;
	}
	nao.socket.emit('get_diagnosis', 'get_diagnosis');
};

// exemple of a simple socket ping pong test
// create socket ping pong test with callback from server
// const sayText = async (text) => {
//  const nao = NaoCom.instance;
//  if (!nao) {
//      return;
//  }
//  return new Promise((resolve, reject) => {
//      nao.socket.emit('say_text', text, (response) => {
//          if (response === 'action_done') {
//              console.log('action_successfully_done');
//              resolve(true);
//          } else {
//              reject(false);
//          }
//      });
//  });
// };

/**
 * Decode the base64 image data and update the camera frame (on each frame)
 * @param {array} data base64 encoded image data
 * @returns
 */
const updateCameraFrame = (data) => {
	const decodedData = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));

	let canvas = document.getElementById('cameraCanvas');
	if (!canvas) {
		const experience3DContainer = document.getElementById('experience-3d-container');
		const canvas = document.createElement('canvas');
		experience3DContainer.appendChild(canvas);
		canvas.width = 160;
		canvas.height = 120;
		canvas.id = 'cameraCanvas';
	}

	const ctx = canvas.getContext('2d');

	const width = 160;
	const height = 120;

	if (decodedData.length !== width * height * 3) {
		console.error(`Les dimensions des données ne correspondent pas: ` + `données reçues=${decodedData.length}, ` + `attendu=${width * height * 3}`);
		return;
	}

	// create a new ImageData object
	const imageData = ctx.createImageData(width, height);
	const rgbData = imageData.data;

	for (let i = 0, j = 0; i < decodedData.length; i += 3, j += 4) {
		// get the red, green, blue values
		rgbData[j] = decodedData[i]; // R
		rgbData[j + 1] = decodedData[i + 1]; // G
		rgbData[j + 2] = decodedData[i + 2]; // B
		rgbData[j + 3] = 255; // Alpha
	}

	ctx.putImageData(imageData, 0, 0);
};

/**
 * Start the NAO streaming, and create the canvas
 * @returns {void}
 * **/
const startNaotStreaming = () => {
	const nao = NaoCom.instance;
	if (!nao) {
		return;
	}
	nao.socket.emit('start_streaming', 'start_streaming');
};

/**
 * Stop the NAO streaming, and remove the canvas
 * @returns {void}
 * **/
const stopNaoStreaming = () => {
	const canvasCamera = document.getElementById('cameraCanvas');
	if (canvasCamera) {
		canvasCamera.remove();
	}
	const nao = NaoCom.instance;
	if (!nao) {
		return;
	}
	nao.socket.emit('stop_streaming', 'stop_streaming');
};

/**
 * Send a rest command to the NAO robot
 * @returns {void}
 * **/
const sendRestCommand = () => {
	const nao = NaoCom.instance;
	if (!nao) {
		return;
	}
	nao.socket.emit('rest_command', 'rest');
};

// const getIntertialData = () => {
//  const nao = NaoCom.instance;
//  if (!nao) {
//      return;
//  }
//  nao.socket.emit('get_com', 'get_com');
//  nao.socket.emit('get_support_polygon', 'get_support_polygon');
// };


/**
 * Methode called from connection button in connection modal
 * @returns {void}
 * **/
const storeNAOIPAdress = () => {
	const nao = new NaoCom();
	if (nao.pendingConnection) return;
	const errorMessage = document.getElementById('nao-connection-error');
	const ipFieldError = document.getElementById('user-ip-adress-nao');
	ipFieldError.innerHTML = '';
	errorMessage.style.display = 'none';
	const modal = document.getElementById('modal-connection-nao');
	const part1 = document.getElementById('nao-ip-1');
	const part2 = document.getElementById('nao-ip-2');
	const part3 = document.getElementById('nao-ip-3');
	const part4 = document.getElementById('nao-ip-4');
	const ipAdress = `${part1.value}.${part2.value}.${part3.value}.${part4.value}`;

	if (part1.value === '' || part2.value === '' || part3.value === '' || part4.value === '') {
		errorMessage.style.display = 'block';
		ipFieldError.innerHTML = 'IP: ' + ipAdress;
		return;
	}
	// check ip adress format
	const ipAdressRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
	if (!ipAdress.match(ipAdressRegex)) {
		errorMessage.style.display = 'block';
		ipFieldError.innerHTML = 'IP: ' + ipAdress;
		return;
	}
	nao.naoAdress = ipAdress;
	const simu = window.Simulator3D;
	const socketConnection = nao.socketIOConnect(simu, ipAdress);
	socketConnection.then(() => {
		pseudoModal.closeModal(modal);
	});
};

/**
 * Methode called from cancel button in connection modal
 * @returns {void}
 * **/
cancelNaoConnection = () => {
	pseudoModal.closeModal('modal-connection-nao');
	const nao = new NaoCom();

	if (nao.socket) {
		nao.socket.removeAllListeners();

		if (nao.socket.connected) {
			nao.socket.disconnect();
		}
	}

	nao.naoAdress = null;
	nao.connected = false;
	nao.naoConnected = false;
	const errorMessage = document.getElementById('nao-connection-error');
	const ipFieldError = document.getElementById('user-ip-adress-nao');
	errorMessage.style.display = 'none';
	ipFieldError.innerHTML = '';

	const connectedButtonGroup = document.getElementById('connected-buttons-group');
	connectedButtonGroup.style.display = 'none';
	const uploadButton = document.getElementById('upload-python');
	uploadButton.style.display = 'none';

	const connectButton = document.getElementById('connect-robot');
	connectButton.style.display = 'block';
};

/**
 * get the ip from the modal input
 * @returns {string} piName - name of the raspberry pi
 */

const checkIpAdress = () => {
	const nao = new NaoCom(); // use singleton instance or create a new one
	if (nao.naoAdress === null) {
		pseudoModal.openModal('modal-connection-nao');
		return null;
	} else {
		return nao.naoAdress;
	}
};

/**
 * Methode called from upload button => need to find a way to proper handle piName (to do)
 * @returns {string} stdout - output of the command from flask server
 **/

const connectVittaCompanion = async (ipAdress) => {
	const Nao = new NaoCom();
	return socketConnection;
};

/**
 * Methode called from upload button
 * @returns {void}
 * **/
const sendNAOCommand = async (requiredStop = false) => {
	const piName = 'localhost';
	const getIP = checkIpAdress();
	if (!getIP) {
		return;
	}
	const nao = NaoCom.instance;
	if (!nao) {
		return;
	}

	if (nao.programRunning) {
		console.error('Program is already running');
		return;
	}
	// send the command to the NAO robot and executed via ssh command in App Companion
	execSSHCommand();
};

/**
 * Methode called from stop button => kill the program running on the NAO robot, with ssh comman in App Companion ('pkill -f "/home/nao/nao_temp_code.py")
 * @returns {void}
 * **/
const stopNAOCommand = async () => {
	const nao = NaoCom.instance;
	if (!nao) {
		return;
	}
	if (nao.programRunning) {
		nao.socket.emit('kill_program', 'kill_program');
	}
};

/**
 * Methode called from disconnect button (only available if connected)
 **/

const disconnectNAO = async () => {
	const nao = NaoCom.instance; // Utilisez l'instance singleton
	nao.naoAdress = null;

	if (!nao) {
		return;
	}

	// nao.sendCommand('terminate', 'disconnect_request');
	if (nao.socket.connected) {
		nao.socket.disconnect();
	}

	nao.instance = null;

	const canvasCamera = document.getElementById('cameraCanvas');
	if (canvasCamera) {
		canvasCamera.remove();
	}

	Simulator.replay();
	$('#disconnect-opt').hide();
	if (navigator.userAgent.toLowerCase().indexOf('win') !== -1) {
		document.querySelector('#download-firmware-opt-windows').style.display = 'block';
	} else if (navigator.userAgent.toLowerCase().indexOf('mac') !== -1) {
		document.querySelector('#download-firmware-opt-mac').style.display = 'block';
	} else if (navigator.userAgent.toLowerCase().indexOf('linux') !== -1) {
		document.querySelector('#download-firmware-opt-linux').style.display;
	}
	$('#connected-icon').remove();

	InterfaceMonitor.writeConsole('NAOV6 Disconnected', 'warning');
};

/**
 *
 * @param {string} os
 * @returns {void} // download the vittacompanion program from github release (@Nixoals, from @latest release)
 */
const downloadNiryoFirmware = async (os) => {
	let version = '';

	const url = 'https://api.github.com/repos/vittascience/vitta-companion/releases/latest'; // update with the new repo when available on vittascience github

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		version = data.tag_name; // get the tag name of the latest release
		console.log(version);
	} catch (error) {
		console.error('There was a problem fetching the latest release version: ', error);
	}

	const link = document.createElement('a');
	if (os === 'macOS') {
		link.href = `https://github.com/vittascience/vitta-companion/releases/download/${version}/VittaCompanion_${version.replace('v', '')}_arm64.dmg`;
	} else if (os === 'windows') {
		link.href = `https://github.com/vittascience/vitta-companion/releases/download/${version}/VittaCompanion_Setup_${version.replace('v', '')}.exe`;
	} else if (os === 'linux') {
		link.href = `https://github.com/vittascience/vitta-companion/releases/download/${version}/VittaCompanion_${version.replace('v', '')}_amd64.deb`;
	}
	link.download = 'Vitta Companion';
	link.click();
};

// extra code to be added to the python code

const game_countries = `
countries = {
    "france": {
        "capital": "Paris",
        "pronounced": "de la France",
        "continent": "Europe",
        "hint": "C'est aussi appelée la Ville Lumière",
        "population": "67 millions",
    },
    "italy": {
        "capital": "Rome",
        "pronounced": "de l'Italie",
        "continent": "Europe",
        "hint": "C'est la ville des gladiateurs",
        "population": "60 millions",
    },
    "spain": {
        "capital": "Madrid",
        "pronounced": "de l'Espagne",
        "continent": "Europe",
        "hint": "C'est la ville des toréadors",
        "population": "47 millions",
    },
    "portugal": {
        "capital": "Lisbonne",
        "pronounced": "du Portugal",
        "continent": "Europe",
        "hint": "C'est la ville des explorateurs",
        "population": "10 millions",
    },
    "germany": {
        "capital": "Berlin",
        "pronounced": "de l'Allemagne",
        "continent": "Europe",
        "hint": "C'est une ville divisée en deux jusqu'en 1989",
        "population": "83 millions",
    },
    "united_kingdom": {
        "capital": "Londres",
        "pronounced": "du Royaume-Uni",
        "continent": "Europe",
        "hint": "C'est la ville du Big Ben",
        "population": "67 millions",
    },
    "japan": {
        "capital": "Tokyo",
        "pronounced": "du Japon",
        "continent": "Asie",
        "hint": "C'est la plus grande mégapole du monde",
        "population": "126 millions",
    },
    "china": {
        "capital": "Pékin",
        "pronounced": "de la Chine",
        "continent": "Asie",
        "hint": "C'est la ville de la Cité Interdite",
        "population": "1,4 milliard",
    },
    "usa": {
        "capital": "Washington",
        "pronounced": "des États-Unis",
        "continent": "Amérique du Nord",
        "hint": "C'est la ville où se trouve la Maison Blanche",
        "population": "331 millions",
    },
    "canada": {
        "capital": "Ottawa",
        "pronounced": "du Canada",
        "continent": "Amérique du Nord",
        "hint": "C'est la ville où se trouve le Parlement canadien",
        "population": "38 millions",
    },
    "brazil": {
        "capital": "Brasilia",
        "pronounced": "du Brésil",
        "continent": "Amérique du Sud",
        "hint": "C'est une capitale planifiée construite dans les années 1960",
        "population": "213 millions",
    },
    "australia": {
        "capital": "Canberra",
        "pronounced": "de l'Australie",
        "continent": "Océanie",
        "hint": "Ce n'est pas Sydney mais une ville planifiée",
        "population": "26 millions",
    },
    "india": {
        "capital": "New Delhi",
        "pronounced": "de l'Inde",
        "continent": "Asie",
        "hint": "C'est la ville du Fort Rouge",
        "population": "1,4 milliard",
    },
    "russia": {
        "capital": "Moscou",
        "pronounced": "de la Russie",
        "continent": "Europe/Asie",
        "hint": "C'est la ville du Kremlin",
        "population": "145 millions",
    },
    "south_africa": {
        "capital": "Pretoria",
        "pronounced": "de l'Afrique du Sud",
        "continent": "Afrique",
        "hint": "Une des trois capitales de ce pays",
        "population": "60 millions",
    },
}`;

const dynamic_story1 = `
dynamic_story1 = {
    "start": {
        "text": "Tu es dans une forêt sombre, il y a deux chemins devant toi. L'un mène vers une rivière, l'autre vers une grotte. Veux-tu aller à gauche ou à droite ?",
        "choices": ["river", "cave"]
    },
    "river": {
        "text": "Tu arrives à une rivière agitée. Sur la rive, tu vois une vieille barque et un pont suspendu qui semble fragile. Veux-tu utiliser la barque ou traverser le pont ?",
        "choices": ["boat", "bridge"]
    },
    "cave": {
        "text": "Tu entres dans une grotte sombre et froide. Un ours bloque ton chemin. Veux-tu reculer ou essayer de lui donner à manger ?",
        "choices": ["start", "feed_bear"]
    },
    "boat": {
        "text": "Tu montes dans la vieille barque. Au milieu de la rivière, tu aperçois une île avec un coffre. Veux-tu ramer vers l'île ou continuer de traverser la rivière ?",
        "choices": ["island", "other_side"]
    },
    "bridge": {
        "text": "Tu t'engages sur le pont. Il grince sous ton poids, mais tu avances courageusement. En plein milieu, le pont commence à céder. Veux-tu courir pour traverser ou reculer rapidement ?",
        "choices": ["treasure", "start"]
    },
    "feed_bear": {
        "text": "Tu trouves des baies à proximité et les donnes à l'ours. Il se calme et te laisse passer. Derrière lui, tu découvres un tunnel lumineux. Veux-tu l'explorer ou retourner sur tes pas ?",
        "choices": ["secret_tunnel", "start"]
    },
    "island": {
        "text": "Tu arrives sur l'île et ouvres le coffre. Il contient un trésor étincelant. Félicitations, tu as gagné !",
        "choices": []
    },
    "other_side": {
        "text": "Tu arrives sur l'autre rive et découvres un sentier qui mène à un petit village. Veux-tu explorer le village ou revenir sur tes pas ?",
        "choices": ["village", "start"]
    },
    "treasure": {
        "text": "Tu réussis à traverser le pont juste à temps. De l'autre côté, tu trouves un trésor caché dans un vieux tronc d'arbre. Félicitations, tu as gagné !",
        "choices": []
    },
    "secret_tunnel": {
        "text": "Tu entres dans le tunnel lumineux. Il te conduit à une clairière magique remplie de créatures étranges et amicales. Félicitations, tu as découvert un monde secret !",
        "choices": []
    },
    "village": {
        "text": "Le village est animé. Les habitants t'accueillent chaleureusement et te montrent un artefact ancien qu'ils protègent depuis des générations. Tu te sens chanceux d'avoir découvert cet endroit.",
        "choices": []
    }
}
`;

const dynamic_story2 = `
dynamic_story2 = {
    "start": {
        "text": "Tu te réveilles dans un village étrange. Une vieille femme te dit qu'une amulette magique a été volée. Elle te demande ton aide pour la retrouver. Veux-tu l'aider ou partir explorer seul ?",
        "choices": ["help_woman", "explore_alone"]
    },
    "help_woman": {
        "text": "La vieille femme te remercie et te dit que l'amulette a été vue pour la dernière fois près de la tour abandonnée. Veux-tu aller à la tour ou demander des informations au forgeron ?",
        "choices": ["tower", "blacksmith"]
    },
    "explore_alone": {
        "text": "Tu décides d'explorer seul. Sur le chemin, tu rencontres un marchand itinérant. Il te propose de te vendre une carte de la région. Veux-tu acheter la carte ou continuer ton chemin ?",
        "choices": ["buy_map", "continue_path"]
    },
    "tower": {
        "text": "Tu arrives à la tour abandonnée. À l'intérieur, tu trouves un coffre verrouillé et une note disant : 'La clé est entre les mains du forgeron.' Veux-tu retourner voir le forgeron ou essayer d'ouvrir le coffre par toi-même ?",
        "choices": ["blacksmith", "force_chest"]
    },
    "blacksmith": {
        "text": "Le forgeron te donne la clé en échange de ton aide pour réparer une arme. Tu retournes à la tour et ouvres le coffre. À l'intérieur, tu trouves l'amulette magique. Félicitations, tu as gagné !",
        "choices": []
    },
    "force_chest": {
        "text": "Tu forces le coffre, mais une alarme magique se déclenche et t'envoie dans une dimension inconnue. L'histoire se termine ici.",
        "choices": []
    },
    "buy_map": {
        "text": "Tu achètes la carte et découvres l'emplacement de la tour abandonnée. Tu y trouves un coffre verrouillé et une note disant : 'La clé est entre les mains du forgeron.' Veux-tu aller voir le forgeron ou essayer d'ouvrir le coffre par toi-même ?",
        "choices": ["blacksmith", "force_chest"]
    },
    "continue_path": {
        "text": "Tu continues ton chemin et te perds dans une forêt dense. Tu finis par retrouver le village, mais sans amulette. L'histoire se termine ici.",
        "choices": []
    }
}
`;

const mental_math_numbers = `
mental_math_numbers = [
    "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
    "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept",
    "dix-huit", "dix-neuf", "vingt", "vingt et un", "vingt-deux", "vingt-trois",
    "vingt-quatre", "vingt-cinq", "vingt-six", "vingt-sept", "vingt-huit",
    "vingt-neuf", "trente", "trente et un", "trente-deux", "trente-trois",
    "trente-quatre", "trente-cinq", "trente-six", "trente-sept", "trente-huit",
    "trente-neuf", "quarante", "quarante et un", "quarante-deux", "quarante-trois",
    "quarante-quatre", "quarante-cinq", "quarante-six", "quarante-sept",
    "quarante-huit", "quarante-neuf", "cinquante"
]`;
