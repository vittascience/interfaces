const RaspberryCommunication = {

	piHostname: null,
	connected: false,
	socket: null,
	readingStatus: {},
	buffer: "",
	MAIN_FLAG_START: "[Raspberry Pi] main process started !",

	POST_SEND_MAIN_CODE: 'send-main-code',
	GET_TERMINATE_PROCESS: 'terminate-process',
	GET_CURRENT_MAIN_PROCESS: 'current-main-process',

	init: function () {
		this.ansi_up = new AnsiUp;
	},

	downloadRaspberryPiAPI: async function () {
		const API_PATH = '/openInterface/raspberrypi/assets/raspberrypi-api/';
		const pyServer = await VittaInterface.fetchDir(API_PATH + 'vittascience_server.py');
		if (pyServer) {
			if (navigator.userAgent.includes("Windows")) {
				const pyServerLines = pyServer.split('\n');
				const pyServerWin = pyServerLines.map(line => '>> "%SERVERPY%" echo' + (/^\s*$/.test(line) ? '.' : ' ' + line.replaceAll(/\%/g, '%%'))).join('\n');
				await VittaInterface.downloadFile(API_PATH + 'vittascience_rpi.cmd', 'text', [/\$VITTASCIENCE_SERVER_PY\$/g, pyServerWin]);
			} else if (navigator.userAgent.includes("Mac OS")) {
				await VittaInterface.downloadFile(API_PATH + 'vittascience_rpi.sh', 'text', [/\$VITTASCIENCE_SERVER_PY\$/g, pyServer]);
			} else {
				InterfaceMonitor.writeConsole('Linux API is not available yet', 'warning', true, true)
			}
		}
	},

	/**
	 * Get the pi hostname from the block '[Serveur Raspberry Pi] nom d'hôte ...' from network category.
	 */
	getPiHostName: function () {
		let hostname = "";
		const code = CodeManager.getSharedInstance().getCode();
		const hostname_line = code.split('\n').find(line => /VITTA_API_HOSTNAME/.test(line));
		const match = hostname_line.match(/^\s*VITTA_API_HOSTNAME\s*=\s*["']([^"]*)["']\s*$/);
		if (match) {
			hostname = match[1];
		}

		if (!hostname) {
			hostname = 'raspberrypi';
			return InterfaceMonitor.writeConsole("[Raspberry Pi] Le nom d'hôte est invalide. Renseignez le nom d'hôte ou l'adresse IP de la Raspberry Pi dans le bloc <i>'[Serveur Raspberry Pi] nom d'hôte ...'</i>", 'warning');
		}
		if (hostname.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)) {
			hostname = hostname.replaceAll(/'/g, '');
		} else {
			//  multicast DNS
			hostname = hostname.replaceAll(/'/g, '') + '.local';
		}
		return hostname;
	},

	openPyServerTab: async function () {
		const url = `https://${this.piHostname}/`
		window.open(url, '_blank').focus();
		pseudoModal.closeModal('modal-insecureConnectionRaspberry');
	},

	/**
	 * Connect to the raspberry pi (called once, if raspberry is already connected, it will resolve the promise )
	 * @returns {Promise} - Promise object represents the connection status
	 **/
	socketIOConnect(hostname) {
		return new Promise((resolve, reject) => {
			if (this.connected) {
				resolve(true);
				return;
			}
			try {
				this.socket = io.connect(`https://${hostname}`, {
					reconnection: false,
					transports: ['websocket']
				});
			} catch (error) {
				console.error('Connection failed:', error);
				reject(error);
			}

			this.socket.on('disconnect', () => {
				this.connected = false;
				$('#connected-icon').remove();
			});

			this.socket.on('connect', () => {
				this.connected = true;
				console.log('Connected to the server');
			});

			this.socket.on('reconnect', function () {
				console.log('Reconnected to the server');
			});

			this.socket.on('connect_error', (error) => {
				pseudoModal.openModal('modal-insecureConnectionRaspberry');
				this.connected = false;
				reject(error); // reject the promise if connection fails
			});

			this.socket.emit('connection', { data: 'connection request' });

			// get response from server before getting further
			this.socket.on('connection', (data) => {
				if (data === 'connected') {
					this.connected = true;
					InterfaceMonitor.writeConsole(`[Raspberry Pi] Connexion établie avec l'hôte:  ${hostname}`, 'success', true, true);
					$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
					$('#disconnect-opt').show();
					resolve(true);
				} else {
					InterfaceMonitor.writeConsole(`[Raspberry Pi] La connexion avec l'hôte '${hostname}' n'a pas abouti.`, 'warning', true, true);
					this.connected = false;
					reject(false);
				}
			});

			this.socket.on('message', (data) => {
				InterfaceMonitor.writeConsole(data, 'neutral', true, true);
			});
		});
	},

	/**
	 * Method called from disconnect button (only available if connected).
	 **/
	socketIOdisconnect: async function () {
		if (this.socket) {
			this.socket.disconnect();
			this.socket.removeAllListeners();
		}
		this.connected = false;
		this.piHostname = null;
		this.socket = null;
		$('#disconnect-opt').hide();
		$('#connected-icon').remove();
		InterfaceMonitor.writeConsole('Raspberry Pi Disconnected', 'warning');
	},

	/**
	 * Methode called from upload button => need to find a way to proper handle piHostname (to do)
	 **/
	uploadPython: async function () {
		const hostname = this.getPiHostName();
		if (!this.connected || this.piHostname !== hostname) {
			this.piHostname = hostname;
			await this.socketIOConnect(hostname);
		}
		if (this.connected) {
			const response = await this.terminate_process();
			await sleep_ms(200);
			await this.send_main_code();
		}
	},

	send_main_code: async function () {
		const code = CodeManager.getSharedInstance().getCode() || '';
		return await this.fetchServerRoute(this.POST_SEND_MAIN_CODE, code);
	},

	terminate_process: async function () {
		return await this.fetchServerRoute(this.GET_TERMINATE_PROCESS);
	},

	// current_main_process: async function () {
	// 	const hostname = this.getPiHostName();
	// 	if (!this.connected || this.piHostname !== hostname) {
	// 		this.piHostname = hostname;
	// 		await this.socketIOConnect(hostname);
	// 	}
	// 	return await this.fetchServerRoute(this.GET_CURRENT_MAIN_PROCESS);
	// },

	/**
	 * Send command to Raspberry Pi server.
	 * @param {string} route - route to send command to. Can be 'raspberrypi.local of IP adress: =>  ex :"pi.local" for multicast DNS or "192.168.0.10"
	 * @param {string} content - code from getSharedInstance
	 */
	fetchServerRoute: async function (route, content = '') {

		if (!this.connected) {
			return false;
		}
		try {
			const data = {
				method: content ? 'POST' : 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			};
			if (content) {
				if (route == this.POST_SEND_MAIN_CODE) {
					content = 'print("' + this.MAIN_FLAG_START + '")\n' + content;
				}
				data.body = 'content=' + encodeURIComponent(content);
			}
			const response = await fetch(`https://${this.piHostname}/${route}`, data);
			console.log("Route: " + route)

			const textDecoder = new TextDecoder(); // Ajout du TextDecoder
			const reader = response.body.getReader();
			this.readingStatus = {
				isError: false
			};
			const processText = async ({ done, value }) => {
				const chunk = textDecoder.decode(value);
				if (done || !this.socket) {
					return;
				}
				if (route === this.GET_TERMINATE_PROCESS) {
					console.warn("/" + this.GET_TERMINATE_PROCESS + " => " + chunk)
					return reader.read().then(processText);
				}
				if (/main process started/.test(chunk)) {
					if (route == this.POST_SEND_MAIN_CODE) {
						InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.fileDownloaded'), 'success', true, true);
					}
					const followingData = chunk.replace(this.MAIN_FLAG_START, '');
					console.warn("/" + this.POST_SEND_MAIN_CODE + " => " + this.MAIN_FLAG_START);
					if (followingData) {
						this._printReceivedData(followingData);
					}
					return reader.read().then(processText);
				}
				this.buffer += chunk;
				if (this.buffer.includes('\n')) {
					const lines = this.buffer.split('\n');
					for (var i = 0; i < lines.length; i++) {
						let line = lines[i]
						if (line) {
							if (i == lines.length - 1) {
								this.buffer = '\n' + line;
								continue;
							}
							this._printReceivedData(line + '\n');
							// Graph mode
							this._manageGraphData(line);
							// Music mode
							if (line.match(/^@music:/) && $('#audio-switch').append("On")) {
								this._playNote(line);
							}
						} else {
							if (i == lines.length - 1) {
								this.buffer = '\n';
							}
						}
					}
				} else {
					this.buffer = "";
					InterfaceMonitor.writeConsole(this.ansi_up.ansi_to_html(this.buffer), 'default');
				}

				return reader.read().then(processText);
			};

			reader.read().then(processText)
				.catch((error) => {
					console.error(error);
				})
		} catch (error) {
			console.error(error);
		}
	},

	_printReceivedData: function (line) {
		// handle special cases (image and video)

		const stream = this._getStreamStyle(line);
		const monitor = document.getElementById('console');
		if (!this.readingStatus.isError) {
			const imgShow = line.match(/IMAGE_CAPTURED_SUCCESSFULLY/g);
			const vidShow = line.match(/VIDEO_CAPTURED_SUCCESSFULLY/g);
			if (imgShow || vidShow) {
				const path = line.split('vittascience-api/workspace')[1];
				if (path) {
					pseudoModal.openModal('modal-imagePiCamera');
					const modalContent = document.getElementById('modal-imagePiCamera-body');
					const url = `https://${this.piHostname}${path.trim()}`;
					if (imgShow) {
						modalContent.innerHTML = `<img src="${url}" alt="Pi Camera Image" />`;
					} else if (vidShow) {
						modalContent.innerHTML =
							`<video width="640" height="480" autoplay="true" controls>
								<source src="${url}" type="video/mp4">
									Your browser does not support the video tag.
							</video>`;
					}
				}
			}
		}

		if (!stream.color) {
			stream.color = 'default';
		}
		if (stream.color == 'interrupt' || stream.color == 'warning') {
			if (!$(monitor.lastChild).hasClass('error')) {
				InterfaceMonitor.writeConsole('</br>' + this.ansi_up.ansi_to_html(stream.data), stream.color, true, true);
				$(monitor.lastChild).addClass('error');
			} else {
				$(monitor.lastChild).css('color', InterfaceMonitor.TEXT_COLOR[stream.color]);
				$(monitor.lastChild).html($(monitor.lastChild).html() + this.ansi_up.ansi_to_html(stream.data));
			}
			InterfaceMonitor.scrollToBottom();
		} else {
			InterfaceMonitor.writeConsole(this.ansi_up.ansi_to_html(stream.data).replace(/>/g, "& gt;").replace(/</g, "& lt;"), stream.color, true, stream.bold);
		}
	},
	/**
	 * Get array of stream from response and its color for console.
	 * @private
	 * @param {string} response
	 * @returns {Array<Object>}
	 */
	_getStreamStyle: function (response) {
		const stream = {
			data: response
		};
		if (/Traceback/.test(response) || (/  File "/.test(response) && / line [0-9]{1,3}/.test(response))) {
			stream.color = 'warning';
			this.readingStatus.isError = true;
			this.readingStatus.color = 'warning';
		} else if (/KeyboardInterrupt/.test(response) && this.readingStatus.isError) {
			stream.color = 'interrupt';
			this.readingStatus.color = 'interrupt';
			this.readingStatus.isError = false;
		} else if (this.readingStatus.isError) {
			stream.color = this.readingStatus.color;
		}
		return stream;
	},
	/**
	 * Send graph data to chart. It works with the '@Graph' command. It works also without the command.  
	 * @param {string} line 
	 * @returns {void}
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
	},

}
