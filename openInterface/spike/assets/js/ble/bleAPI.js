function setupMonitor() {
	if ($('#monitor').hasClass('monitor-closed')) {
		InterfaceMonitor.toggle();
	}
	if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
		InterfaceMonitor.managePanel('console');
	}
};

async function uploadPythonBLE() {
	if (LegoSpikeWebBLEAPI.device === null || !LegoSpikeWebBLEAPI.gattConnected()) {
		await doConnectBLE();
	}
	if ($("#simulator").is(":visible") === false) {
		toggleSimulator();
	} else {
		Simulator.replay();
	}
	setupMonitor();
};

async function doConnectBLE() {
	try {
		await LegoSpikeWebBLEAPI.connect();
	} catch (e) {
		const err = String(e);
		console.error(err);
		if (err.match(/User cancelled the requestDevice/)) {
			LegoSpikeWebBLEAPI.notif.displayNotification(null, jsonPath('User cancelled the requestDevice()'), 'bg-danger');
			LegoSpikeWebBLEAPI.device = null;
		} else {
			LegoSpikeWebBLEAPI.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnectBLE() {
	if (LegoSpikeWebBLEAPI.gattConnected()) {
		await LegoSpikeWebBLEAPI.unpair();
	}
};

'use strict';
/**
 * @class LegoSpikeWebBLE
 */
class LegoSpikeWebBLE {
	constructor() {
		this.device = null;
		this.isConnected = false;
		this.server = null;
		this.serviceUuid = '00001623-1212-efde-1623-785feabcd123';  // Service UUID
		this.characteristicUuid = '00001624-1212-efde-1623-785feabcd123';  // Characteristic UUID
		this.characteristic = null;
		this.notif = new VittaNotif();
		// Certaines couleurs ont été renommés pour simplifier la compréhension des élèves (ex: "Violet" à la place de "Magenta")
		this.colors = {
			'0': 'Black',
			'1': 'Purple', 	// 'Magenta'
			'2': 'Purple',
			'3': 'Blue',
			'4': 'Blue',    // 'Azure'
			'5': 'Green',   // 'Turquoise'
			'6': 'Green',
			'7': 'Yellow',
			'8': 'Orange',
			'9': 'Red',
			'10': 'White',
			'-1': 'Unknown'
		};
		this.colorSensor = {
			'A': [false, 0],
			'B': [false, 0]
		};
	}

	onGATTconnected() {
		InterfaceMonitor.writeConsole(jsonPath('code.WebBluetoothAPI.gattConnected'), 'success', false, true);
		$("#execution-buttons-panel").append('<i id="connected-icon-ble" class="fa-brands fa-bluetooth"></i>');
		$("#disconnect-opt-ble").show();
	}

	onGATTdisconnected() {
		$("#disconnect-opt-ble").hide();
		$("#connected-icon-ble").remove();
		InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
		InterfaceMonitor.writeConsole(jsonPath('code.WebBluetoothAPI.BLEclosed'), 'success', false, true);
		InterfaceMonitor.writeConsole(' \n');
		this.isConnected = false;
		this.device = null;
		this.messagesIgnoredCount = 0;
	}

	gattConnected() {
		return this.device?.gatt?.connected;
	}


	//Unpair connected device.
	async unpair() {
		if (this.device) {
			console.log("Unpairing... 🚫", "secondary");
			await this.device.gatt.disconnect();
			this.device = null;
			this.isConnected = false;
		}
	}

	// Fonction utilitaire pour convertir un angle en Int32
	toInt32(value) {
		const buffer = new ArrayBuffer(4);
		new DataView(buffer).setInt32(0, value, true); // Little Endian
		return new Uint8Array(buffer);
	}

	// Convertir un nombre en Int16
	toInt16(value) {
		const buffer = new ArrayBuffer(2);
		new DataView(buffer).setInt16(0, value, true);
		return new Uint8Array(buffer);
	}

	// Helper function to convert a number to an 8-bit signed integer
	toInt8(value) {
		const buffer = new ArrayBuffer(1);
		new DataView(buffer).setInt8(0, value);
		return new Uint8Array(buffer);
	}

	uint8ArrayToHex(array) {
		return Array.from(array)
			.map(byte => '0x' + byte.toString(16).padStart(2, '0'))
			.join('-');
	}

	// Method to connect the robot
	async connect() {
		try {
			InterfaceMonitor.writeConsole('Requesting Bluetooth Device...');
			this.device = await navigator.bluetooth.requestDevice({
				filters: [
					{
						services: [this.serviceUuid]
					}
				]
			});

			if (this.device) {
				this.device.addEventListener('gattserverdisconnected', this.onGATTdisconnected.bind(this));
			}

			InterfaceMonitor.writeConsole('Connecting to GATT Server...');
			this.server = await this.device.gatt.connect();

			if (this.server) {
				this.onGATTconnected();
			}

			InterfaceMonitor.writeConsole('Getting Service...');
			const service = await this.server.getPrimaryService(this.serviceUuid);
			this.characteristic = await service.getCharacteristic(this.characteristicUuid);

			// Start notifications on the characteristic
			await this.characteristic.startNotifications();
			this.characteristic.addEventListener('characteristicvaluechanged', this.handleNotifications.bind(this));

			this.isConnected = true;

			InterfaceMonitor.writeConsole('Connected to Lego Spike');
		} catch (error) {
			console.error('Failed to connect', error);
			this.isConnected = false;
		}
	}

	handleNotifications(event) {
		const value = new Uint8Array(event.target.value.buffer);
		this.decodeNotification(value);
	}

	decodeNotification(value) {
		const length = value[0]; // Longueur du message
		const hubId = value[1]; // Hub ID
		const messageType = value[2]; // Type de message
		console.log(this.uint8ArrayToHex(value));
		switch (messageType) {
			case 0x04: // Hub Attached I/O
				this.decodeAttachedIO(value);
				break;
			case 0x45: // Port Value (Single)
				this.decodePortValue(value);
				break;
			case 0x46: // Port Value (Combined)
				this.decodePortCombinedValue(value);
				break;
			case 0x82:
				if (value.length === 5 && value[value.length - 1] == 0x0a) {
					Simulator.play();
				}
				break;
			default:
				console.log("Message non supporté", value);
		}
	}

	getDeviceName(ioTypeId) {
		const devices = {
			0x0001: 'Motor Simple',
			0x0002: 'Motor du Train LEGO System',
			0x0005: 'Bouton',
			0x0008: 'Lumière LED',
			0x0014: 'Capteur de Tension (Voltage)',
			0x0015: 'Capteur de Courant (Current)',
			0x0016: 'Haut-parleur Piezo (Sound)',
			0x0017: 'Lumière RGB',
			0x0022: 'Capteur d\'Inclinaison Externe (Tilt)',
			0x0023: 'Capteur de Mouvement (Motion Sensor)',
			0x0025: 'Capteur de Vision (Vision Sensor)',
			0x0026: 'Moteur Externe avec Tacho',
			0x0027: 'Moteur Interne avec Tacho',
			0x0028: 'Capteur d\'Inclinaison Interne',
			0x002A: 'Détecteur de Couleur (Color Sensor)',
			0x002B: 'Capteur de Distance (Ultrasonic)',
			0x0036: 'Moteur Large avec Tacho',
			0x0037: 'Moteur Moyen avec Tacho',
			0x0040: 'Matrice LED 3x3 (SPIKE Essential)',
			0x0041: 'Moteur (SPIKE Essential)',
			0x003d: 'Capteur de couleur'
		};

		return devices[ioTypeId] || `Appareil Inconnu ID: ${ioTypeId}`;
	}

	decodeAttachedIO(value) {
		let portId = value[3];
		if (portId !== 0 && portId !== 1) { // Hub IO
			return;
		} else {
			portId = (portId === 0 ? 'A' : 'B');
		}
		const eventType = value[4];

		if (eventType === 0x01) { // Device attached
			const ioTypeId = (value[5] | (value[6] << 8)); // Little-endian 16-bit
			const deviceName = this.getDeviceName(ioTypeId);
			this.notif.displayNotification(null, `Device attached to port ${portId}: ${deviceName}`, 'bg-success');
			switch (deviceName) {
				case 'Capteur de couleur':
					this.initColorSensor(portId);
					break;
			}
		} else if (eventType === 0x00) {
			this.notif.displayNotification(null, `Device detached from port ${portId}`, 'bg-success');
			switch (deviceName) {
				case 'Capteur de couleur':
					this.colorSensor[portId] = [false, 0];
					break;
			}
		}
	}

	decodePortValue(value) {
		const portId = value[3] == '0' ? 'A' : 'B';
		switch (value.length) {
			case 5:
				if (this.colorSensor[portId][0] === true) {
					this.colorSensor[portId][1] = value[value.length - 1];
				}
				break;
		}
		// const dataType = getDataTypeForPort(portId);
		// let portValue;

		// switch (dataType) {
		// 	case 0x00: // 8-bit
		// 		portValue = value[4];
		// 		break;
		// 	case 0x01: // 16-bit
		// 		portValue = (value[4] << 8) | value[5];
		// 		break;
		// 	case 0x02: // 32-bit
		// 		portValue = (value[4] << 24) | (value[5] << 16) | (value[6] << 8) | value[7];
		// 		break;
		// 	case 0x03: // Float
		// 		portValue = new DataView(value.buffer).getFloat32(4, true);
		// 		break;
		// 	default:
		// 		console.error("Type de donnée inconnu pour le port:", portId);
		// 		return;
		// }

		// console.log(`Port ${portId} Position:`, portValue);
	}

	// Method to send BLE command
	async sendCommand(characteristic, command) {
		if (!characteristic) {
			console.error('Characteristic not available');
			return;
		}

		try {
			console.log('Sending command:', command);
			Simulator.pause();
			await characteristic.writeValue(command);
			console.log('Command sent successfully');
		} catch (error) {
			console.error('Failed to send command', error);
		}
	}

	async initColorSensor(port) {
		if (!this.characteristic) {
			console.error('Characteristic not available');
			return;
		}

		const portId = port === 'A' ? 0x00 : 0x01;

		await this.setupPortInputFormatSingle(portId, 1);
		await this.setupPortInputFormatSingle(portId);

		this.colorSensor[port][0] = true;
	}

	async startMotorContinuous(port, speed) {
		if (!this.characteristic) {
			console.error('Characteristic not available');
			return;
		}

		const portId = port === 'A' ? 0x00 : 0x01;
		const command = new Uint8Array([
			0x09, 0x00, 0x81,  // Common Header
			portId,            // Port ID
			0x11,              // Startup & Completion Information
			0x07,              // Sub Command - StartSpeed
			...this.toInt8(speed),  // Speed level (-100 to 100)
			0x64,              // Max power (100%)
			0x00               // UseProfile flag (0 = don't use profile)
		]);

		await this.sendCommand(this.characteristic, command);
	}

	async startMotorForTime(port, speed, time) {
		if (!this.characteristic) {
			console.error('Characteristic not available');
			return;
		}
		const portId = port === 'A' ? 0x00 : 0x01;
		const command = new Uint8Array([
			0x0C, 0x00, 0x81,  // Common Header
			portId,            // Port ID
			0x11,              // Startup & Completion Information
			0x09,              // Sub Command - StartSpeedForTime
			...this.toInt16(time),  // Time in milliseconds
			...this.toInt8(speed),  // Speed level (-100 to 100)
			0x64,              // Max power (100%)
			0x00               // End state (0 = coast)
		]);
		await this.sendCommand(this.characteristic, command);
	}

	async moveMotorToPosition(port, angle, speed) {
		if (!this.characteristic) {
			console.error('Characteristic not available');
			return;
		}

		const portId = port === 'A' ? 0x00 : 0x01;
		const command = new Uint8Array([
			0x0E, 0x00, 0x81,        // Common Header
			portId,                  // Port ID
			0x11,                    // Startup & Completion Information
			0x0D,                    // Sub Command - GotoAbsolutePosition
			...this.toInt32(angle),       // Target angle in degrees
			...this.toInt8(speed),        // Speed level (-100 to 100)
			0x64,                    // Max power (100%)
			0x00,                    // End state (0 = coast, 127 = brake, 126 = hold)
			0x00                     // UseProfile flag (0 = don't use profile)
		]);

		await this.sendCommand(this.characteristic, command);
	}

	async stopMotor(port) {
		if (!this.characteristic) {
			console.error('Characteristic not available');
			return;
		}
		const portId = port === 'A' ? 0x00 : 0x01;
		const command = new Uint8Array([
			0x09, 0x00, 0x81,
			portId,
			0x11,
			0x07,
			0x00, // Speed level 0 (arrête le moteur)
			0x64, // Max power (100%)
			0x00  // UseProfile flag
		]);

		await this.sendCommand(this.characteristic, command);
	}

	async moveMotorByDegrees(port, degrees, speed) {
		if (!this.characteristic) {
			console.error('Characteristic not available');
			return;
		}
		const portId = port === 'A' ? 0x00 : 0x01;
		const command = new Uint8Array([
			0x0E, 0x00, 0x81,
			portId,
			0x11,
			0x0B,
			...this.toInt32(degrees), // Relative degrees to move
			...this.toInt8(speed),    // Speed level (-100 to 100)
			0x64,                // Max power (100%)
			0x00                 // End state (0 = coast, 127 = brake, 126 = hold)
		]);

		await this.sendCommand(this.characteristic, command);
	}

	async setLedMatrix3x3(port, pixelData) {
		if (!this.characteristic) {
			console.error('Characteristic not available');
			return;
		}

		// Construct the command to write data to the 3x3 LED matrix
		const commandLength = 7 + pixelData.length;  // Total length of the message (7 + number of pixels)
		const portId = port === 'A' ? 0x00 : 0x01;

		await this.sendCommand(this.characteristic, new Uint8Array([0x0a, 0x00, 0x41, portId, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00])); // single mode

		// Build the command array including data for each pixel
		const command = new Uint8Array([
			commandLength,          // Message length
			0x00,                   // Hub ID (0x00 by default)
			0x81,                   // Message Type (Port Output Command)
			portId,                 // Port ID
			0x11,  					// Immediate execution, no response expected, Startup and Completion Information
			0x51,             		// Sub Command (WriteDirectModeData) : "RGB Commands encoded as WriteDirectModeData (Cmd 0x81, Sub Cmd 0x51)"
			0x02,					// Mode              
			...pixelData           // Data for each pixel (each element in pixelData is one byte)
		]);

		// 0x10 0x00 0x81 0x00 0x11 0x51 0x02 0xa7 0xa7 0xa7 0xa7 0xa7 0xa7 0xa7 0xa7 0xa7
		try {
			// InterfaceMonitor.writeConsole(`Sending LED matrix 3x3 command: ${this.uint8ArrayToHex(command)}`);
			await this.sendCommand(this.characteristic, command);
			// InterfaceMonitor.writeConsole('Command sent successfully to LED matrix.');
		} catch (error) {
			console.error('Failed to send command to LED matrix', error);
		}
	}

	// Méthode pour configurer le format d'entrée du port en mode simple
	async setupPortInputFormatSingle(port, mode, deltaInterval = 0, notificationEnabled = 1) {
		if (!this.characteristic) {
			console.error('Characteristic not available');
			return;
		}

		// Commande pour configurer le format d'entrée du port (Single)
		const command = new Uint8Array([
			0x0A,               // Longueur totale de la commande (10 octets)
			0x00,               // Hub ID (0x00 par défaut)
			0x41,               // Message Type (Port Input Format Setup - Single)
			port,               // Port ID
			mode,               // Mode à configurer pour le port
			...this.toInt32(deltaInterval), // Intervalle de delta (Uint32)
			notificationEnabled // Notifications activées (0 = Désactivé, 1 = Activé)
		]);

		try {
			await this.sendCommand(this.characteristic, command);
			console.log('Port Input Format Setup (Single) command sent successfully.');
		} catch (error) {
			console.error('Failed to send Port Input Format Setup (Single) command', error);
		}
	}

	getColor(port) {
		return this.colorSensor[port][1];
	}
}

const LegoSpikeWebBLEAPI = new LegoSpikeWebBLE();