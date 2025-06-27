const url = 'https://vrobots.vittascience.com';
const urlWs = 'wss://vrobots.vittascience.com';

// to keep for local testing
// const url = 'http://localhost:4004';
// const urlWs = 'ws://localhost:4004';


class NiryoNedRemote {
	static instance = null; // Singleton instance
	constructor(ipAdress) {
		if (NiryoNed.instance) {
			return NiryoNed.instance;
		}
		this.niryoAddress = ipAdress;
		this.connected = false;
		this.socket = null;
		this.calibrationNeeded = false;
		this.spinningLoaderLink = `${CDN_PATH}/public/content/img/spinning-loader.svg`;

		NiryoNed.instance = this;
	}

	getConnectionStatus() {
		return this.connected;
	}

	/**
	 * Connect to the remote server (called once, the server is already connected, it will resolve the promise)
	 * @returns {Promise} - Promise object represents the connection status
	 **/

	socketIOConnect(simu) {
		return new Promise((resolve, reject) => {
			if (this.connected) {
				resolve(true);
				// return;
			}
			try {
				this.socket = io.connect(urlWs, {
					reconnection: true,
					reconnectionDelay: 200,
					reconnectionDelayMax: 5000,
					reconnectionAttempts: 3,
					autoConnect: true,
					transports: ['websocket'],
				});

				// // Handle socket.io events (disconnect)
				this.socket.on('disconnect', () => {
					this.connected = false;
				});

				// add logic to handle the remote robot status (if someone else is using the robot, the user should be notified)

				this.socket.on('robot_action_result', (value) => {
					if (value.match(/MoveIt failed/g)) {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] ${value}`, 'warning');
					} else if (value.match(/not in range/g)) {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] ${value}`, 'warning');
					} else if (value.match(/The goal cannot be reached with a linear trajectory/g)) {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] ${value}`, 'warning');
					} else {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] ${value}`, 'success');
					}
				});

				this.socket.on('connect_error', (error) => {
					console.log('Connection Error:', error);
				});
				// this.socket.emit('ros_connect', 'connection request');
				// this.socket.emit('message', { data: 'connection request' });
				this.socket.on('program_ended', async (msg) => {
					if (msg === 'programme_ended') {
						// await simu.led_ring_pulse('#00ff00', true);
						InterfaceMonitor.writeConsole(`[Niryo Ned2] Programme ended successfully`, 'success');
					} else {
						console.log(msg);
					}
				});

				// get robot status from remote server
				this.socket.on('robotStatus', (msg) => {
					const statusContainer = document.getElementById('niryo-remote-status-container');
					if (msg === 'Running autonomous') {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] Running autonomous`, 'success');

						const buttonSendCode = document.getElementById('send-code-button');
						if (buttonSendCode) {
							buttonSendCode.disabled = true;
							buttonSendCode.innerHTML = "En cours d'exécution";
						}
						const getLoader = document.getElementById('program-started-loader');
						if (getLoader) {
							return;
						}
						const loader = document.createElement('img');
						loader.id = 'program-started-loader';
						loader.style.width = '45px';
						loader.src = this.spinningLoaderLink;
						statusContainer.appendChild(loader);
					} else if (msg === 'Standby') {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] Standby`, 'success');
						const buttonSendCode = document.getElementById('send-code-button');
						if (buttonSendCode) {
							const loader = document.getElementById('program-started-loader');
							if (loader) {
								loader.remove();
							}
							buttonSendCode.disabled = false;
							buttonSendCode.innerHTML = 'Envoyer le code au robot';
						}
					} else if (msg.match(/MoveIt failed/g)) {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] ${msg}`, 'warning');
					} else if (msg.match(/not in range/g)) {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] ${msg}`, 'warning');
					} else if (msg.match(/The goal cannot be reached with a linear trajectory/g)) {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] ${msg}`, 'warning');
					} else if (msg === 'No program is running') {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] No program is running`, 'warning');
					} else if (msg === 'Command has been successfully stopped') {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] Command has been successfully stopped`, 'warning');
					}
				});

				this.socket.on('message', (data) => {
					if (data === 'connected') {
						console.log('connected');
						this.connected = true;
						resolve(true);
					} else {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] connection to Ned2 failed: @${this.niryoAddress}`, 'warning');
						this.connected = false;
						reject(false);
					}
				});

				this.socket.on('sendToClient', (data) => {
					console.log('sendToClient', data);
				});
			} catch (error) {
				console.error('Connection failed:', error);
				reject(error);
			}
		});
	}

	/**
	 *
	 * @param {string} command
	 * @param {string} route
	 */
	sendCommand(command, route) {
		try {
		} catch (error) {
			console.error('Error sending command:', error);
		}
	}
}

const getUserToken = async () => {
	const getTokenUrl = '/routing/Routing.php?controller=robot_booking&action=get_my_token';
	let response;
	try {
		response = await fetch(getTokenUrl, {
			method: 'POST',
		});
	} catch (error) {
		console.error('Error verifying user:', error);
	}
	
	const data = await response.json();
	
	if (!data.success){
		console.error('Error verifying user:', data);
		return;
	}

	return data.token;
};


/**
 * Send the code to the remote robot
 * @description - Check if the user is connected to vittascience first, then send the code to the remote robot
 * @returns {Promise} - Promise object
 * */
const sendRemoteCommand = async () => {
	const host = window.location.host
	const subdomain = host.split('.')[0]
	const token = await getUserToken();
	const code = CodeManager.getSharedInstance().getCode() + "\n\nprint('END_OFF_PROGRAMME') \n";
	const body = {
		code: code,
		robotId: window.remoteRobotId,
		token: token,
		subdomain: subdomain,
	};
	try {
		const response = await fetch(`${url}/send-code`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	} catch (error) {
		console.error('Error sending command:', error);
	}
};

/**
 * Stop the program running on the remote robot
 * @description - Stop the program running on the remote robot (need to add checks to see if the user is connected to vittascience first in order to avoid other users stopping the program)
 * @returns {Promise} - Promise object
 * */
const stopProgram = async () => {
	const host = window.location.host
	const subdomain = host.split('.')[0]
	const token = await getUserToken();
	const body = {
		robotId: window.remoteRobotId,
		token: token,
		subdomain: subdomain,
	};
	try {
		const response = await fetch(`${url}/stop-program`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

	} catch (error) {
		console.error('Error sending command:', error);
	}
};

/**
 * Connect to the remote robot
 * @description - Connect to the remote robot and display the video stream
 * @returns {Promise} - Promise object
 * */
const connectRemoteNiryo = async () => {
	const experienceElement = document.getElementById('experience-3d-container');
	const simulatorRemote = document.getElementById('niryo-remote');
	const statusContainer = document.getElementById('niryo-remote-status-container');
	const cameraRemote = document.getElementById('video-remote');
	const connectedIcon = document.getElementById('connected-icon');
	if (!connectedIcon) {
		$('#execution-buttons-panel').append('<i id="connected-icon" class="fab fa-usb"></i>');
	}
	$('#disconnect-opt').show();
	$('#download-firmware-opt-mac').hide();
	$('#download-firmware-opt-windows').hide();
	if (!cameraRemote) {
		experienceElement.style.display = 'none';
		const sendCodeButton = document.createElement('button');
		sendCodeButton.id = 'send-code-button';
		sendCodeButton.innerHTML = 'Envoyer au robot';
		sendCodeButton.onclick = sendRemoteCommand;
		sendCodeButton.classList.add('btn', 'btn-primary', 'ide-btn-right');
		sendCodeButton.style.marginTop = '10px';
		sendCodeButton.style.marginBottom = '10px';
		statusContainer.appendChild(sendCodeButton);

		const stopProgramButton = document.createElement('button');
		stopProgramButton.id = 'stop-program-button';
		stopProgramButton.innerHTML = 'Stop';
		stopProgramButton.onclick = stopProgram;
		stopProgramButton.classList.add('btn', 'btn-danger', 'ide-btn-left');
		stopProgramButton.style.marginTop = '10px';
		stopProgramButton.style.marginBottom = '10px';
		statusContainer.appendChild(stopProgramButton);

		const lostConnectionOverlay = document.createElement('div');
		lostConnectionOverlay.id = 'lost-connection-overlay';
		lostConnectionOverlay.innerHTML = //html
		`<img src="/public/content/img/programming/ned2.webp" alt="logo Niryo Ned 2" class="">`

		const video = document.createElement('video');
		video.id = 'video-remote';
		video.autoplay = true;
		video.controls = false;
		video.style.width = '100%';
		video.style.height = '100%';
		const config = {
			maxBufferLength: 10,
			liveSyncDuration: 0,
			backBufferLength: 8,
			frontBufferFlushThreshold: 0,
		};
		
		// check robot number to get the right stream robot 1, 2 or 3 => 1 and 2 are for Futuroscope and 3 is for Tour Montparnasse POC
		let robotNumber = 1;
		switch (window.remoteRobotId) {
			case '1c6d77d3-7ff8-42ed-b797-a0e3724e8579':
				robotNumber = 1;
				break;
			case '387c50de-686f-4940-9a71-9d6034051fee':
				robotNumber = 2;
				break;
			case 'e0f45649-3058-492d-9812-281c666acaef':
				robotNumber = 3;
				break;
		}
		const videoSrc = `${url}/robot_${robotNumber}/stream_robot_${robotNumber}_.m3u8`;
		let reconnectAttempts = 0;
		const maxReconnectAttempts = 5;
		const reconnectDelay = 3000;
		let hls = null;


		const startHls = () => {
			lostConnectionOverlay.style.display = 'none';
			const hls = new Hls(config);
			hls.loadSource(videoSrc);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED, function () {
				video.play();
			});
			hls.on(Hls.Events.ERROR, function (event, data) {
				if (data.fatal) {
					switch (data.type) {
						case Hls.ErrorTypes.NETWORK_ERROR:
							console.log('Network error encountered, trying to recover...');
							if (reconnectAttempts < maxReconnectAttempts) {
								reconnectAttempts++;
								hls.destroy();
								lostConnectionOverlay.style.display = 'flex';
								setTimeout(startHls, reconnectDelay);
							} else {
								console.error('Maximum reconnect attempts reached. Could not recover from network error.');
							}
							break;
						case Hls.ErrorTypes.MEDIA_ERROR:
							console.log('Media error encountered, trying to recover...');
							hls.recoverMediaError();
							break;
						default:
							// Impossible de récupérer, détruire l'instance de Hls et peut-être relancer une nouvelle instance
							console.error('Error encountered, destroying Hls instance and attempting to recover...');
							hls.destroy();
							console.log('Attempting to recover...');
							lostConnectionOverlay.style.display = 'flex';
							// Reattempt to load the source after a delay
							setTimeout(startHls, reconnectDelay);
							break;
					}
				}
			});
			hls.on(Hls.Events.LEVEL_LOADED, function () {
				// Reset reconnect attempts on successful load
				reconnectAttempts = 0;
			});
		};

		if (Hls.isSupported()) {
			startHls();
		}
		// HLS n'est pas supporté sur Safari pour iOS, Safari pour Mac et Microsoft Edge où il peut être joué nativement
		else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = videoSrc;
			video.addEventListener('canplay', function () {
				video.play();
			});
			video.addEventListener('error', function () {
				// Try to reload the source after an error
				setTimeout(() => {
					video.load();
					video.play();
				}, 5000);
			});
		}


		// Page visibility change handling (if page is not focused the stream will be paused to save bandwidth, but lost because of the buffer length)
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'visible') {
				console.log('Page is visible, checking stream status...');
				if (video.paused || video.readyState !== 4) {
					if (hls) {
						hls.destroy();
					}
					startHls();
				}
			}
		});
		const niryoRemote = new NiryoNedRemote();
		if (!niryoRemote.getConnectionStatus()) {
			niryoRemote.socketIOConnect();
		}
		simulatorRemote.appendChild(video);
		simulatorRemote.appendChild(lostConnectionOverlay);
	}
};

/**
 * Disconnect from the remote robot
 * @description - Disconnect from the remote robot and display the 3D experience back
 * @returns {Promise} - Promise object
 * */
const disconnectRemoteNiryo = async () => {
	const experienceElement = document.getElementById('experience-3d-container');

	experienceElement.style.display = 'block';

	const cameraRemote = document.getElementById('video-remote');
	const connectedIcon = document.getElementById('connected-icon');
	if (connectedIcon) {
		connectedIcon.remove();
		const loader = document.getElementById('program-started-loader');
		if (loader) {
			loader.remove();
		}
	}
	if (cameraRemote) {
		const sendCodeButton = document.getElementById('send-code-button');
		sendCodeButton.remove();

		const stopProgramButton = document.getElementById('stop-program-button');
		stopProgramButton.remove();
		
		cameraRemote.src = '';
		cameraRemote.remove();
	}
	$('#disconnect-opt').hide();
	$('#download-firmware-opt-mac').show();
	$('#download-firmware-opt-windows').show();
	experienceElement.style.display = 'block';
};
