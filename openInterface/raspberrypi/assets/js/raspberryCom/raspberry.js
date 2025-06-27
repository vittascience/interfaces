/**
 * Class Raspberry
 * @class
 * @property {string} piName - name of the raspberry pi
 **/
class Raspberry {
	static instance = null; // Singleton instance
	constructor(piName) {
		if (Raspberry.instance) {
			return Raspberry.instance;
		}
		this.piName = piName;
		this.connected = false;
		this.socket = null;

		Raspberry.instance = this;
	}
	getConnectionStatus() {
		return this.connected;
	}

	/**
	 * Connect to the raspberry pi (called once, if raspberry is already connected, it will resolve the promise )
	 * @returns {Promise} - Promise object represents the connection status
	 **/

	socketIOConnect() {
		return new Promise((resolve, reject) => {
			if (this.connected) {
				resolve(true);
				return;
			}
			try {
				this.socket = io.connect(`https://${this.piName}:5000`, {
					reconnection: false,
				});
			} catch (error) {
				console.error('Connection failed:', error);
				reject(error);
			}

			// Handle socket.io events (disconnect)
			this.socket.on('disconnect', () => {
				this.connected = false;
				console.log('Disconnected from server');
			});

			this.socket.on('connect_error', (error) => {
				pseudoModal.openModal('modal-insecureConnectionRaspberry');
				this.connected = false;
				reject(error); // reject the promise if connection fails
			});

			this.socket.emit('message', { data: 'connection request' });

			// get response from server before getting further
			this.socket.on('message', (data) => {
				if (data === 'connected') {
					this.connected = true;
					Simulator.pause();
					InterfaceMonitor.writeConsole(`[Raspberry Pi] connected. Name: ${this.piName}`, 'success');
					const connectedIcon = document.getElementById('connected-icon');
					if (!connectedIcon) {
						$('#execution-buttons-panel').append('<i id="connected-icon" class="fab fa-usb"></i>');
					}
					$('#disconnect-opt').show();
					resolve(true);
				} else {
					InterfaceMonitor.writeConsole(`[Raspberry Pi] connection failed. Name: ${this.piName.split('.')[0]}`, 'warning');
					this.connected = false;
					reject(false);
				}
			});
		});
	}

	/** 
		* send command to raspberry pi
		* @param {command} string - code from getSharedInstance
		* @param {route} string - route to send command to. Can be 'raspiname.local of IP adress: =>  ex :"pi.local" for multicast DNS or "192.168.0.10"

	**/
	async sendCommand(command, route) {
		const textDecoder = new TextDecoder(); // Ajout du TextDecoder
		if (!this.connected) {
			return false;
		}
		// loader
		const spinningLoaderLink = `${CDN_PATH}/public/content/img/spinning-loader.svg`;
		$('#execution-buttons-panel').append(`<img id='rapsberry-connection-loader' style='width: 45px;' src='${spinningLoaderLink}'/>`);

		try {
			const response = await fetch(`https://${this.piName}:5000/${route}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: 'command=' + encodeURIComponent(command),
			});
			const reader = response.body.getReader();
			const processText = async ({ done, value }) => {
				const chunk = textDecoder.decode(value);
				if (chunk.match(/Process terminated/g)) {
					$('#connected-icon').remove();
				}
				if (done) {
					$('#rapsberry-connection-loader').remove();
					return;
				}
				// handle special cases (image and video)
				if (chunk.match(/IMAGE_CAPTURED_SUCCESSFULLY/g)) {
					pseudoModal.openModal('modal-imagePiCamera');
					const modalContent = document.getElementById('modal-imagePiCamera-body');
					modalContent.innerHTML = `<img src="http://${this.piName}:5000/static/images/image.jpg" alt="Pi Camera Image" />`;
				} else if (chunk.match(/VIDEO_CAPTURED_SUCCESSFULLY/g)) {
					pseudoModal.openModal('modal-imagePiCamera');
					const modalContent = document.getElementById('modal-imagePiCamera-body');
					modalContent.innerHTML = `<video width="640" height="480" autoplay="true" controls>
					<source src="http://${this.piName}:5000/static/videos/video.mp4" type="video/mp4">
					Your browser does not support the video tag.
					</video>`;
				}

				// write stdout to console
				InterfaceMonitor.writeConsole(chunk);

				return reader.read().then(processText);
			};
			reader
				.read()
				.then(processText)
				.catch((error) => {
					console.error('Error:', error);
				});
		} catch (error) {
			console.error('Error:', error);
		}
	}
}

/**
 * get the piName from the block [raspberry] nom d'hôte in network category
 * @returns {string} piName - name of the raspberry pi
 */

const getPiName = () => {
	const blockType = 'network_get_pi_name';
	var workspace = Blockly.getMainWorkspace();
	var allBlocks = workspace.getAllBlocks(false);
	const blocks = allBlocks.filter((block) => block.type === blockType);
	let piName = Blockly.Python.valueToCode(blocks[0], 'PINAME', Blockly.Python.ORDER_NONE) || "''";

	if (piName === "''") {
		piName = 'pi';
		return InterfaceMonitor.writeConsole(`[Raspberry Pi] vous devez spécifier un nom d'hôte. Selectionner le block [raspberry] nom d'hôte dans 'Réseau'`, 'warning');
	}
	if (piName.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)) {
		
		piName = piName.replace(/'/g, '');
	} else {
		//  multicast DNS
		piName = piName.replace(/'/g, '') + '.local';
	}
	return piName;
};

/**
 * Methode called from upload button => need to find a way to proper handle piName (to do)
 * @returns {string} stdout - output of the command from flask server
 **/

const sendRaspberryCommand = async () => {
	const piName = getPiName();
	const raspberry = new Raspberry(piName); // use singleton instance or create a new one

	const sendCommandAfterConnection = (command) => {
		raspberry.sendCommand(command, 'send-command');
	};

	if (!raspberry.getConnectionStatus()) {
		try {
			const socketConnection = await raspberry.socketIOConnect();
			if (socketConnection) {
				const command = CodeManager.getSharedInstance().getCode() || '';
				const route = 'send-command';
				sendCommandAfterConnection(command, route);
			} else {
				if (!raspberry.socket.connected) {
					console.warn('Connection failed');
					InterfaceMonitor.writeConsole(`[Raspberry Pi] connection failed. Name: ${piName.split('.')[0]}`, 'warning');
				}
			}
		} catch (error) {
			console.error('Connection failed:', error);
			Raspberry.instance = null;
			InterfaceMonitor.writeConsole(`[Raspberry Pi] connection failed. Raspberry Name: ${piName}`, 'warning');
		}
	} else {
		const command = CodeManager.getSharedInstance().getCode() || '';
		const route = 'send-command';
		sendCommandAfterConnection(command, route);
	}
};

/**
 * Methode called from disconnect button (only available if connected)
 **/

const disconnectRaspberry = async () => {
	const raspberry = Raspberry.instance; // Utilisez l'instance singleton

	if (!raspberry) {
		return;
	}

	raspberry.sendCommand('', 'terminate');

	if (raspberry.socket) {
		raspberry.socket.removeAllListeners();
		raspberry.socket.disconnect();
	}

	raspberry.connected = false;
	raspberry.piName = '';
	raspberry.socket = null;

	Raspberry.instance = null;

	Simulator.play();
	$('#disconnect-opt').hide();
	$('#connected-icon').remove();

	InterfaceMonitor.writeConsole('Raspberry Pi Disconnected', 'warning');
};


const proceedToRaspberryConnection = async () => {
	const piName = getPiName();

	const url = `https://${piName}:5000/`
	window.open(url, '_blank').focus();
	pseudoModal.closeModal('modal-insecureConnectionRaspberry');
};