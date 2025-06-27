class NiryoNed {
	static instance = null; // Singleton instance
	constructor(ipAdress) {
		if (NiryoNed.instance) {
			return NiryoNed.instance;
		}
		this.niryoAddress = ipAdress;
		this.connected = false;
		this.socket = null;
		this.calibrationNeeded = false;

		NiryoNed.instance = this;
	}

	getConnectionStatus() {
		return this.connected;
	}

	/**
	 * Connect to the raspberry pi (called once, if raspberry is already connected, it will resolve the promise )
	 * @returns {Promise} - Promise object represents the connection status
	 **/

	socketIOConnect(simu) {
		return new Promise((resolve, reject) => {
			if (this.connected) {
				resolve(true);
				// return;
			}
			try {
				this.socket = io.connect(`ws://localhost:8887`, {
					reconnection: false,
					reconnectionDelay: 1000,
					reconnectionDelayMax: 5000,
					reconnectionAttempts: 3,
					timeout: 2000,
					autoConnect: true,
					transports: ['websocket'],
				});

				// // Handle socket.io events (disconnect)
				this.socket.on('disconnect', () => {
					const robotStatusDiv = document.getElementById('robot-status');
					const robotStatusContainer = document.getElementById('robot-status-container');
					robotStatusDiv.innerHTML = 'Simulation';
					robotStatusContainer.style.backgroundColor = '#e74c3c';
					this.connected = false;
					console.log('Disconnected from server');
					this.socket.removeAllListeners();
					this.instance = null;
					$('#disconnect-opt').hide();
					$('#connected-icon').remove();
				});

				this.socket.on('connect_error', (error) => {
					pseudoModal.openModal('model-connection-vitta-companion');
					this.connected = false;
					reject(error); // reject the promise if connection fails
				});

				this.socket.on('need_calibration', (value) => {
					const overlayCalibration = document.getElementById('overlay-calibration');
					if (value === 'true') {
						overlayCalibration.style.display = 'block';
						this.calibrationNeeded = true;
						console.log('calibration needed');
						InterfaceMonitor.writeConsole(`[Niryo Ned2] Calibration needed`, 'warning');
					} else if (value === 'false') {
						overlayCalibration.style.display = 'none';
						this.calibrationNeeded = false;
					}
					// pseudoModal.openModal('model-connection-vitta-companion');
				});

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
				this.socket.emit('ros_connect', 'connection request');
				// this.socket.emit('message', { data: 'connection request' });
				this.socket.on('program_ended', async (msg) => {
					if (msg === 'programme_ended') {
						await simu.led_ring_pulse("#00ff00", true)
						InterfaceMonitor.writeConsole(`[Niryo Ned2] Programme ended successfully`, 'success');
					} else if (msg === 'Stop program success') {
						await simu.led_ring_pulse("#00ff00", true)
						InterfaceMonitor.writeConsole(`[Niryo Ned2] Program interrupted by the user`, 'warning');
					} else {
						await simu.led_ring_pulse("#00ff00", true)
						InterfaceMonitor.writeConsole(`[Niryo Ned2] ${msg}`, 'warning');
					}
				});

				this.socket.on('message', (data) => {
					if (data === 'connected') {
						this.connected = true;
						const robotStatusDiv = document.getElementById('robot-status');
						const robotStatusContainer = document.getElementById('robot-status-container');
						robotStatusDiv.innerHTML = 'Robot Connecté';
						robotStatusContainer.style.backgroundColor = '#22b573';
						simu.initConnectionMiddleware(this.socket);
						// Simulator.pause();
						InterfaceMonitor.writeConsole(`[Niryo Ned2] connected to Ned2: @${this.niryoAddress}`, 'success');
						const connectedIcon = document.getElementById('connected-icon');
						if (!connectedIcon) {
							$('#execution-buttons-panel').append('<i id="connected-icon" class="fab fa-usb"></i>');
						}
						$('#disconnect-opt').show();
						$('#download-firmware-opt-mac').hide();
						$('#download-firmware-opt-windows').hide();
						resolve(true);
					} else {
						InterfaceMonitor.writeConsole(`[Niryo Ned2] connection to Ned2 failed: @${this.niryoAddress}`, 'warning');
						this.connected = false;
						reject(false);
					}
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
			InterfaceMonitor.writeConsole(`[Niryo Ned2] sending program to Ned2: @${this.niryoAddress}`, 'success');
			if (!this.calibrationNeeded || code.math(/\.calibrate_auto\(\)/g)) {
				this.socket.emit(route, { data: command });
			}
		} catch (error) {
			console.error('Error sending command:', error);
		}
	}
}

/**
 * get the piName from the block [raspberry] nom d'hôte in network category
 * @returns {string} piName - name of the raspberry pi
 */

const getIpAddress = () => {
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

const connectVittaCompanion = async () => {
	const piName = 'localhost';
	const niryo = new NiryoNed(piName);
	const simu = window.Simulator3D;
	const socketConnection = await niryo.socketIOConnect(simu);
	return socketConnection;
};



const sendNiryoCommand = async (requiredStop = false) => {
	const simu = window.Simulator3D;
	console.log(requiredStop);
	const piName = 'localhost';
	const niryo = new NiryoNed(piName); // use singleton instance or create a new one

	const sendCommandAfterConnection = (command, route) => {
		niryo.sendCommand(command, route);
	};

	if (!niryo.getConnectionStatus()) {
		try {
			// connectVittaCompanion()
			// const socketConnection = await niryo.socketIOConnect(simu);
			const socketConnection = connectVittaCompanion();
			if (socketConnection) {
				let command = CodeManager.getSharedInstance().getCode() || '';
				command += `\n\nprint('END_OFF_PROGRAMME') \n`;
				let route = 'launch_movement';
				if (requiredStop) {
					route = 'stop_movement';
				}
				sendCommandAfterConnection(command, route);
			} else {
				if (!niryo.socket.connected) {
					console.warn('Connection failed');
					InterfaceMonitor.writeConsole(`[niryo Ned2] connection failed. IP: ${piName}`, 'warning');
				}
			}
		} catch (error) {
			console.error('Connection failed:', error);
			NiryoNed.instance = null;
			InterfaceMonitor.writeConsole(`[Niryo Ned] connection failed. IP adresse: ${piName}`, 'warning');
		}
	} else {
		let command = CodeManager.getSharedInstance().getCode() || '';
		command += `\n\nprint('END_OFF_PROGRAMME') \n`;
		let route = 'launch_movement';
		if (requiredStop) {
			route = 'stop_movement';
		}
		sendCommandAfterConnection(command, route);
	}
};


/**
 * Methode called from disconnect button (only available if connected)
 **/

const disconnectRaspberry = async () => {
	const niryo = NiryoNed.instance; // Utilisez l'instance singleton

	if (!niryo) {
		return;
	}

	niryo.sendCommand('terminate', 'disconnect_request');

	niryo.socket.disconnect();


	niryo.instance = null;

	Simulator.play();
	$('#disconnect-opt').hide();
	if (navigator.userAgent.toLowerCase().indexOf('win') === -1) {
		document.querySelector('#download-firmware-opt-mac').style.display = 'block';
	} else {
		document.querySelector('#download-firmware-opt-windows').style.display = 'block';
	}
	$('#connected-icon').remove();

	InterfaceMonitor.writeConsole('Niryo Ned2 Disconnected', 'warning');
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

/**
 * @return {void} activate the pen drawing mode or remove line2 object3D if already activated
 */
const drawLineButton = () => {
	const robotStatusContainer = document.getElementById('robot-status-container');
	const simu = window.Simulator3D;
	simu.requestLineTrajectory = !simu.requestLineTrajectory;
	const button = document.getElementById('button-pen-drawing');

	if (simu.requestLineTrajectory) {
		button.classList.add('active-pen');
		simu.drawLineTrajectory('trajectoryLineSimulation');
		simu.drawLineTrajectory('trajectoryLine');
	} else {
		button.classList.remove('active-pen');
		simu.destroyLineTrajectory('trajectoryLineSimulation');
		simu.destroyLineTrajectory('trajectoryLine');
	}
};

// Greatly helped by chatGPT :-)
/**
 *
 * @param {array} position
 * @returns {void} // add a block to the workspace with the position of the robot in the on_start block
 */
const addNiryoNedBlocks = (position) => {
	const sign = [1, -1, -1, 1, -1, 1];

	position = position.map((value, index) => {
		return value * sign[index];
	});

	const workspace = Main.getWorkSpace();
	const allBlocks = workspace.getAllBlocks();
	let targetBlock = null;

	for (let i = 0; i < allBlocks.length; i++) {
		if (allBlocks[i].type === 'on_start' || allBlocks[i].type === 'scratch_on_start') {
			targetBlock = allBlocks[i];
			break; // Sortir de la boucle une fois trouvé
		}
	}

	// Créer le nouveau bloc en xml
	const xmlText = `
	<block type="niryo_move_joints">
        <value name="JOINTS">
            <block type="niryo_joints">
                <value name="JOINT_1">
                    <shadow type="math_number">
                        <field name="NUM">${position[0].toFixed(3)}</field>
                    </shadow>
                </value>
                <value name="JOINT_2">
                    <shadow type="math_number">
                        <field name="NUM">${position[1].toFixed(3)}</field>
                    </shadow>
                </value>
                <value name="JOINT_3">
                    <shadow type="math_number">
                        <field name="NUM">${position[2].toFixed(3)}</field>
                    </shadow>
                </value>
                <value name="JOINT_4">
                    <shadow type="math_number">
                        <field name="NUM">${position[3].toFixed(3)}</field>
                    </shadow>
                </value>
                <value name="JOINT_5">
                    <shadow type="math_number">
                        <field name="NUM">${position[4].toFixed(3)}</field>
                    </shadow>
                </value>
                <value name="JOINT_6">
                    <shadow type="math_number">
                        <field name="NUM">${position[5].toFixed(3)}</field>
                    </shadow>
                </value>
            </block>
        </value>
    </block>`;
	const xml = Blockly.Xml.textToDom(xmlText);
	const newBlock = Blockly.Xml.domToBlock(xml, workspace);

	// Si le targetBlock est vide (n'a pas de child blocks)
	const statementInput = targetBlock.getInput("DO");
	if (targetBlock.childBlocks_.length === 0) {
		if (statementInput && statementInput.connection) {
			statementInput.connection.connect(newBlock.previousConnection);
		} else {
			console.error("No valid input found on target block to connect to.");
		}
	} else {
		 // // Si le targetBlock a des enfants, connecte après le dernier
		 const statementConnection = statementInput.connection;
		 let lastBlock = statementConnection.targetBlock();
		 while (lastBlock && lastBlock.getNextBlock()) {
			 lastBlock = lastBlock.getNextBlock();
		 }
		 let currentBlock = lastBlock;
	 
		 // Parcourir jusqu'au dernier bloc
		 while (currentBlock.getNextBlock()) {
			 currentBlock = currentBlock.getNextBlock();
		 }
		 lastBlock.nextConnection.connect(newBlock.previousConnection);
	}

	setTimeout(() => {
		const simu = window.Simulator3D;
		simu.waitingAddBlock = false;
	}, 1000);
};

window.addNiryoNedBlocks = addNiryoNedBlocks; // to access it from 3D simulator experience
