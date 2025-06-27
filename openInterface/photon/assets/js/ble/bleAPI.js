function setupMonitor() {
	if ($('#monitor').hasClass('monitor-closed')) {
		InterfaceMonitor.toggle();
	}
	if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
		InterfaceMonitor.managePanel('console');
	}
};

async function uploadPythonBLE() {
	if (PhotonWebBLEAPI.device === null) {
		await doConnectBLE();
	}
	if ($("#simulator").is(":visible") === false) {
		toggleSimulator();
	} else {
		PhotonWebBLEAPI.ACK = [];
		Simulator.replay();
	}
	setupMonitor();
};

async function doConnectBLE() {
	try {
		await PhotonWebBLEAPI.connect();
	} catch (e) {
		const err = String(e);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/User cancelled the requestDevice/)) {
			errorNotif.displayNotification(null, jsonPath('User cancelled the requestDevice()'), 'bg-danger');
			PhotonWebBLEAPI.device = null;
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnectBLE() {
	if (PhotonWebBLEAPI.gattConnected()) {
		await PhotonWebBLEAPI.unpair();
	}
};

'use strict';
/**
 * @class PhotonWebBLE
 */
class PhotonWebBLE {
	constructor() {
		this.device = null;
		this.isConnected = false;
		this.server = null;

		this.serviceUuid = '4880c12c-fdcb-4077-8920-a450d7f9b907';
		this.characteristicUuid = 'fec26ec4-6d71-4442-9f81-55bc21d658d6';
		this.characteristic = null;

		this.ACK = [];
		this.requestSensorsData = null;
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
	}

	gattConnected() {
		return this.device?.gatt?.connected;
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
			this.characteristic.addEventListener('characteristicvaluechanged', this.handleSensorData.bind(this));

			this.requestSensorData();

			await sleep_ms(2000);

			this.isConnected = true;

			InterfaceMonitor.writeConsole('Connected to Photon');
		} catch (error) {
			console.error('Failed to connect', error);
			this.unpair();
		}
	}

	//Unpair connected device.
	async unpair() {
		if (this.device) {
			InterfaceMonitor.writeConsole("Unpairing... 🚫", "secondary");
			await this.device.gatt.disconnect();
			this.device = null;
			this.isConnected = false;
		}
	}

	checkACK(ACK) {
		return '827d04dbdb00b9' === ACK.join('');
	}

	uint8ArrayToHexString(uint8Array) {
		return Array.prototype.map.call(uint8Array, function (byte) {
			return ('00' + byte.toString(16)).slice(-2);
		}).join('');
	}

	hexArrayToUint8Array(hexArray) {
		// Convertir chaque valeur hexadécimale en entier décimal et créer un Uint8Array
		return new Uint8Array(hexArray.map(hex => parseInt(hex, 16)));
	}

	hexToBinary(hexString) {
		return hexString.split('').map(hexChar => {
			return parseInt(hexChar, 16).toString(2).padStart(4, '0');
		}).join('');
	}

	decodeSensorsData(data) {
		console.log(data);
		const heading = [data[0], data[1]]; // 80 - 7f
		const lengthAndCS = data[2]; // 07

		// Decode sensor byte
		const sensorsValue = this.hexToBinary(data[3]);
		const sensors = {
			'lineFR': sensorsValue[0],
			'lineFC': sensorsValue[1],
			'lineFL': sensorsValue[2],
			'lineR': sensorsValue[3],
			'light': sensorsValue[4],
			'sound': sensorsValue[5],
			'reserved': sensorsValue[6],
			'stroking': sensorsValue[7]
		};
		console.log(data[4]);
		const distance = parseInt(data[4], 16);

		// Distance traveled high and low byte
		const distanceTraveledHigh = parseInt(data[5], 16);
		const distanceTraveledLow = parseInt(data[6], 16);
		const distanceTraveled = (distanceTraveledHigh << 8) + distanceTraveledLow;

		// Battery status
		const batteryStatus = parseInt(data[7], 16); // 0-100 scale

		// ID
		const id = data[8];

		// Checksum (CS)
		const checksum = data[9];

		// Return decoded data
		return {
			heading,
			lengthAndCS,
			sensors,
			distance,
			distanceTraveled,
			batteryStatus,
			id,
			checksum
		};
	}

	// Fonction pour gérer les notifications des données des capteurs
	handleSensorData(event) {
		const value = event.target.value;
		const hex_data = this.uint8ArrayToHexString(new Uint8Array(value.buffer));
		this.ACK.push(hex_data);
		if (this.ACK.length === 7 && this.checkACK(this.ACK)) {
			this.ACK = [];
			Simulator.play();
		} else if (this.ACK.length === 10) {
			this.requestSensorsData = this.decodeSensorsData(this.ACK);
			this.ACK = [];
			Simulator.play();
		} else if (this.ACK.length > 10) {
			this.ACK = [];
			Simulator.play();
		}
	}

	// Fonction pour calculer le checksum
	calculateChecksum(data) {
		let sum = data.reduce((acc, val) => acc + val, 0);
		return sum & 0xFF;
	}

	// Method to send BLE command
	async sendCommand(characteristic, frame) {
		if (!characteristic) {
			console.error('Characteristic not available');
			return;
		}

		// Construire la trame de données
		const checksum = this.calculateChecksum(frame);
		frame.push(checksum);

		try {
			Simulator.pause();
			console.log('Sending command:', this.uint8ArrayToHexString(new Uint8Array(frame)));
			await characteristic.writeValue(new Uint8Array(frame));
			console.log('Command sent successfully');
		} catch (error) {
			console.error('Failed to send command', error);
		}
	}

	// Fonction pour changer la couleur des yeux
	setEyesColor(r, g, b, confirmationMode = 1, id = 0) {
		this.sendCommand(this.characteristic, [0x50, 0xAF, 0x06, r, g, b, confirmationMode, id]);
	}

	// Fonction pour changer la couleur des antennes
	setEarsColor(r, g, b, confirmationMode = 1, id = 0) {
		this.sendCommand(this.characteristic, [0x51, 0xAE, 0x06, r, g, b, confirmationMode, id]);
	}

	// Fonction pour changer la couleur des yeux et des antennes
	setEyesAndEarsColor(r, g, b, confirmationMode = 1, id = 0) {
		this.sendCommand(this.characteristic, [0x52, 0xAD, 0x06, r, g, b, confirmationMode, id]);
	}

	// Fonction pour jouer un son spécifique
	playSound(soundNumber, confirmationMode = 1, id = 0) {
		this.sendCommand(this.characteristic, [0x53, 0xAC, 0x04, soundNumber, confirmationMode, id]);
	}

	// Fonction pour déclencher un comportement spécial
	triggerSpecialBehavior(behaviorNumber, confirmationMode = 1, id = 0) {
		this.sendCommand(this.characteristic, [0x6B, 0x94, 0x04, behaviorNumber, confirmationMode, id]);
	}

	// Fonction pour arrêter la lecture de son
	stopSound(id = 0) {
		this.sendCommand(this.characteristic, [0x55, 0xAA, 0x04, 0xAC, 0xBC, id]);
	}

	// Fonction pour faire tourner le robot à un angle spécifié
	rotateToAngle(speed, angle, id = 0) {
		const highByte = angle >> 8;
		const lowByte = angle & 0xFF;
		this.sendCommand(this.characteristic, [0x62, 0x9D, 0x05, speed, highByte, lowByte, id]);
	}

	// Fonction pour faire avancer le robot sur une distance spécifiée
	go(distanceCm, speed, id = 0) {
		const highByte = distanceCm >> 8;
		const lowByte = distanceCm & 0xFF;
		this.sendCommand(this.characteristic, [0x61, 0x9E, 0x05, speed, highByte, lowByte, id]);
	}

	// Fonction pour arrêter le robot
	stopRobot(id = 0) {
		this.sendCommand(this.characteristic, [0x63, 0x9C, 0x05, 0xAA, 0xBA, 0xCA, id]);
	}

	// Fonction pour démarrer le mode suiveur de ligne
	startLineFollower(mode = 0xBC, id = 0) {
		this.sendCommand(this.characteristic, [0x65, 0x9A, 0x05, 0xAC, mode, id]);
	}

	// Fonction pour faire avancer le robot indéfiniment
	driveForever(speed, direction = 0xDA, id = 0) {
		this.sendCommand(this.characteristic, [0x69, 0x96, 0x04, speed, direction, id]);
	}

	// Fonction pour définir la vitesse des roues
	setWheelSpeed(leftSpeed, rightSpeed, id = 0) {
		this.sendCommand(this.characteristic, [0x6E, 0x91, 0x04, leftSpeed, rightSpeed, id]);
	}

	// Fonction pour demander les données des capteurs
	async requestSensorData(sensorType = 0xDE, id = 0) {
		await this.sendCommand(this.characteristic, [0x70, 0x8F, 0x04, sensorType, 0xCE, id]);
	}
}

const PhotonWebBLEAPI = new PhotonWebBLE();