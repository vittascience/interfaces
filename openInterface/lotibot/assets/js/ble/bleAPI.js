function setupMonitor() {
	if ($('#monitor').hasClass('monitor-closed')) {
		InterfaceMonitor.toggle();
	}
	if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
		InterfaceMonitor.managePanel('console');
	}
};

async function uploadPythonBLE() {
	if (LotibotWebBLEAPI.device === null) {
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
		await LotibotWebBLEAPI.connect();
	} catch (e) {
		const err = String(e);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/User cancelled the requestDevice/)) {
			errorNotif.displayNotification(null, jsonPath('User cancelled the requestDevice()'), 'bg-danger');
			LotibotWebBLEAPI.device = null;
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnectBLE() {
	if (LotibotWebBLEAPI.gattConnected()) {
		await LotibotWebBLEAPI.unpair();
	}
};

'use strict';
/**
 * @class LotibotWebBLE
 */
class LotibotWebBLE {
	constructor() {
		this.device = null;
		this.isConnected = false;
		this.server = null;

		this.serviceUuid = '7626702d-79a8-4f30-0000-6e8aea14e800';  // Service UUID for speaker
		this.txCharacteristicUuid = '7626702d-79a8-4f30-0002-6e8aea14e800';  // Characteristic UUID for Rx (inverted)
		this.rxCharacteristicUuid = '7626702d-79a8-4f30-0001-6e8aea14e800';  // Characteristic UUID for Tx (inverted)
		this.txCharacteristic = null;
		this.rxCharacteristic = null;

		this.motorServiceUuid = '7626702d-79a8-4f30-0000-6e8aea14e801';  // Service UUID for motors
		this.motorRxCharacteristicUuid = '7626702d-79a8-4f30-0001-6e8aea14e801';  // Characteristic UUID for motor Tx
		this.motorTxCharacteristicUuid = '7626702d-79a8-4f30-0002-6e8aea14e801';  // Characteristic UUID for motor Tx
		this.motorRxCharacteristic = null;
		this.motorTxCharacteristic = null;

		this.ledServiceUuid = '7626702d-79a8-4f30-0000-6e8aea14e803';  // Service UUID for LEDs
		this.ledTxCharacteristicUuid = '7626702d-79a8-4f30-0002-6e8aea14e803';  // Characteristic UUID for LED Tx
		this.ledTxCharacteristic = null;

		this.sensorServiceUuid = '7626702d-79a8-4f30-0000-6e8aea14e802';  // Service UUID for sensors
		this.sensorRxCharacteristicUuid = '7626702d-79a8-4f30-0001-6e8aea14e802';  // Characteristic UUID for sensor Rx
		this.sensorTxCharacteristicUuid = '7626702d-79a8-4f30-0002-6e8aea14e802';  // Characteristic UUID for sensor Tx
		this.sensorRxCharacteristic = null;
		this.sensorTxCharacteristic = null;

		this.batteryServiceUuid = '7626702d-79a8-4f30-0000-6e8aea14e804';  // Service UUID for battery
		this.batteryRxCharacteristicUuid = '7626702d-79a8-4f30-0001-6e8aea14e804';  // Characteristic UUID for battery Rx
		this.batteryTxCharacteristicUuid = '7626702d-79a8-4f30-0002-6e8aea14e804';  // Characteristic UUID for battery Tx
		this.batteryRxCharacteristic = null;
		this.batteryTxCharacteristic = null;

		this.isStopped = true;
		this.isFallDetected = false;
		this.isCollisionDetected = false;
		this.compassHeading = 0;
		this.distance = 0;
		this.soundLevel = 0;
		this.lightLevel = 0;
		this.temperature = 0;
		this.batteryLevel = 0;
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

	//Unpair connected device.
	async unpair() {
		if (this.device) {
			InterfaceMonitor.writeConsole("Unpairing... 🚫", "secondary");
			await this.device.gatt.disconnect();
			this.device = null;
			this.isConnected = false;
		}
	}

	handleMotorNotifications(event) {
		const value = event.target.value;
		const status = value.getUint8(0);
		const travelHigh = value.getUint8(1);
		const travelLow = value.getUint8(2);
		const angleHigh = value.getUint8(3);
		const angleLow = value.getUint8(4);
		const stopReason = value.getUint8(5);

		const travel = (travelHigh << 8) + travelLow;
		const angle = (angleHigh << 8) + angleLow;

		if (status === 1) {
			console.log(`Motor Notification - Status: Moving, Travel: ${travel} mm, Angle: ${angle}°`);
			this.isStopped = false;
		} else if (status === 0) {
			console.log(`Motor Notification - Status: Stopped, Travel: ${travel} mm, Angle: ${angle}°, Stop Reason: ${stopReason}`);
			this.isStopped = true;
		}

		//stop_reason, 0 = completed normal run, 1 = stopped due to bumper, 2 = stopped due to floor sensor, 3 = error condition
		switch (stopReason) {
			case 0:
			case 3:
				break;
			case 1:
				this.isCollisionDetected = true;
				// Reset after 500ms
				setTimeout(() => {
					this.isCollisionDetected = false;
				}, 500);
				break;
			case 2:
				this.isFallDetected = true;
				// Reset after 500ms
				setTimeout(() => {
					this.isFallDetected = false;
				}, 500);
				break;
		}
		Simulator.play();
	}

	handleSensorNotifications(event) {
		const value = event.target.value;
		const index = value.getUint8(0);
		const type = value.getUint8(1);
		const valHigh = value.getUint8(2);
		const valLow = value.getUint8(3);
		const bitStatus = value.getUint8(4);

		console.log(`Index: ${index}, Type: ${type}, valHigh: ${valHigh}, valLow: ${valLow}, bitStatus: ${bitStatus}`);
		let sensorValue;
		sensorValue = (valHigh << 8) + valLow;

		switch (type) {
			case 1:  // Compass heading
				console.log(`Compass Heading: ${sensorValue}°, Bit Status: ${bitStatus}`);
				this.compassHeading = sensorValue;
				break;
			case 2:  // Ultrasonic distance
				console.log(`Ultrasonic Distance: ${sensorValue} mm, Bit Status: ${bitStatus}`);
				this.distance = sensorValue;// Distance is given directly in mm
				break;
			case 3:  // Sound level
				sensorValue = (valHigh << 8) + valLow;  // Sound level : ranges from 2 = typical Background Noise to 9 = Very Loud
				console.log(`Sound Level: ${sensorValue}, Bit Status: ${bitStatus}`);
				this.soundLevel = sensorValue;
				break;
			case 4:  // Light level
				console.log(`Light Level: ${sensorValue} lux, Bit Status: ${bitStatus}`);
				this.lightLevel = sensorValue;
				break;
			case 5:  // Temperature
				sensorValue = sensorValue / 10;
				console.log(`Temperature: ${sensorValue} °C, Bit Status: ${bitStatus}`);
				this.temperature = sensorValue;
				break;
			default:
				console.log(`${index} - Unknown sensor type: ${type}`);
		}
		Simulator.play();
	}

	// Method to connect the robot
	async connect() {
		try {
			InterfaceMonitor.writeConsole('Requesting Bluetooth Device...');
			this.device = await navigator.bluetooth.requestDevice({
				acceptAllDevices: true,
				optionalServices: [
					this.serviceUuid,
					this.motorServiceUuid,
					this.ledServiceUuid,
					this.sensorServiceUuid,
					this.batteryServiceUuid
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

			InterfaceMonitor.writeConsole('Getting Speaker Service...');
			const service = await this.server.getPrimaryService(this.serviceUuid);
			this.txCharacteristic = await service.getCharacteristic(this.txCharacteristicUuid);
			this.rxCharacteristic = await service.getCharacteristic(this.rxCharacteristicUuid);

			InterfaceMonitor.writeConsole('Getting Motor Service...');
			const motorService = await this.server.getPrimaryService(this.motorServiceUuid);
			this.motorTxCharacteristic = await motorService.getCharacteristic(this.motorTxCharacteristicUuid);
			this.motorRxCharacteristic = await motorService.getCharacteristic(this.motorRxCharacteristicUuid);

			InterfaceMonitor.writeConsole('Getting LED Service...');
			const ledService = await this.server.getPrimaryService(this.ledServiceUuid);
			this.ledTxCharacteristic = await ledService.getCharacteristic(this.ledTxCharacteristicUuid);

			InterfaceMonitor.writeConsole('Getting Sensor Service...');
			const sensorService = await this.server.getPrimaryService(this.sensorServiceUuid);
			this.sensorTxCharacteristic = await sensorService.getCharacteristic(this.sensorTxCharacteristicUuid);
			this.sensorRxCharacteristic = await sensorService.getCharacteristic(this.sensorRxCharacteristicUuid);

			InterfaceMonitor.writeConsole('Getting Battery Service...');
			const batteryService = await this.server.getPrimaryService(this.batteryServiceUuid);
			this.batteryRxCharacteristic = await batteryService.getCharacteristic(this.batteryRxCharacteristicUuid);
			this.batteryTxCharacteristic = await batteryService.getCharacteristic(this.batteryTxCharacteristicUuid);

			// Start notifications on the motor Rx characteristic
			await this.motorRxCharacteristic.startNotifications();
			this.motorRxCharacteristic.addEventListener('characteristicvaluechanged', this.handleMotorNotifications.bind(this));

			// Start notifications on the sensor Rx characteristic
			await this.sensorRxCharacteristic.startNotifications();
			this.sensorRxCharacteristic.addEventListener('characteristicvaluechanged', this.handleSensorNotifications.bind(this));

			this.isConnected = true;

			InterfaceMonitor.writeConsole('Connected to LotiBot');
		} catch (error) {
			console.error('Failed to connect', error);
			this.isConnected = false;
		}
	}

	// Method to send BLE command
	async sendCommand(characteristic, command) {
		if (!characteristic) {
			console.error('Characteristic not available');
			return;
		}

		try {
			Simulator.pause();
			console.log('Sending command:', command);
			await characteristic.writeValue(command);
			console.log('Command sent successfully');
		} catch (error) {
			console.error('Failed to send command', error);
		}
	}

	// Method to play a sound
	async playSound(soundId) {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0x01, soundId]);
		await this.sendCommand(this.txCharacteristic, command);
		Simulator.play();
	}

	async setIdle(muteStatus) {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0x02, muteStatus]);
		await this.sendCommand(this.txCharacteristic, command);
		Simulator.play();
	}

	// Method to move forward
	async moveForward(distanceMm, speedRpm) {
		if (!this.motorTxCharacteristic) {
			console.error('Motor TX Characteristic not available');
			return;
		}

		const distanceHigh = (distanceMm >> 8) & 0xFF;
		const distanceLow = distanceMm & 0xFF;
		const speedHigh = (speedRpm >> 8) & 0xFF;
		const speedLow = speedRpm & 0xFF;

		const command = new Uint8Array([0x01, distanceHigh, distanceLow, speedHigh, speedLow]);

		await this.sendCommand(this.motorTxCharacteristic, command);
	}

	// Method to move backward
	async moveBackward(distanceMm, speedRpm) {
		if (!this.motorTxCharacteristic) {
			console.error('Motor TX Characteristic not available');
			return;
		}

		const distanceHigh = (distanceMm >> 8) & 0xFF;
		const distanceLow = distanceMm & 0xFF;
		const speedHigh = (speedRpm >> 8) & 0xFF;
		const speedLow = speedRpm & 0xFF;

		const command = new Uint8Array([0x04, distanceHigh, distanceLow, speedHigh, speedLow]);

		await this.sendCommand(this.motorTxCharacteristic, command);
	}

	// Method to turn left
	async turnLeft(degrees, speedRpm) {
		if (!this.motorTxCharacteristic) {
			console.error('Motor TX Characteristic not available');
			return;
		}

		const degreesHigh = (degrees >> 8) & 0xFF;
		const degreesLow = degrees & 0xFF;
		const speedHigh = (speedRpm >> 8) & 0xFF;
		const speedLow = speedRpm & 0xFF;

		const command = new Uint8Array([0x02, degreesHigh, degreesLow, speedHigh, speedLow]);

		await this.sendCommand(this.motorTxCharacteristic, command);
	}

	// Method to turn right
	async turnRight(degrees, speedRpm) {
		if (!this.motorTxCharacteristic) {
			console.error('Motor TX Characteristic not available');
			return;
		}

		const degreesHigh = (degrees >> 8) & 0xFF;
		const degreesLow = degrees & 0xFF;
		const speedHigh = (speedRpm >> 8) & 0xFF;
		const speedLow = speedRpm & 0xFF;

		const command = new Uint8Array([0x03, degreesHigh, degreesLow, speedHigh, speedLow]);

		await this.sendCommand(this.motorTxCharacteristic, command);
	}

	// Method to turn right
	async drawSquare(distance) {
		if (!this.motorTxCharacteristic) {
			console.error('Motor TX Characteristic not available');
			return;
		}

		const distanceHigh = (distance >> 8) & 0xFF;
		const distanceLow = distance & 0xFF;

		const command = new Uint8Array([0x08, distanceHigh, distanceLow]);

		await this.sendCommand(this.motorTxCharacteristic, command);
	}

	// Method to stop motors
	async stop() {
		if (!this.motorTxCharacteristic) {
			console.error('Motor TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0x05]);
		await this.sendCommand(this.motorTxCharacteristic, command);
	}

	// Method to set LED color
	async setLedColor(leftRed, leftGreen, leftBlue, rightRed, rightGreen, rightBlue) {
		if (!this.ledTxCharacteristic) {
			console.error('LED TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x01, leftRed, leftGreen, leftBlue, rightRed, rightGreen, rightBlue]);
		await this.sendCommand(this.ledTxCharacteristic, command);
		Simulator.play();
	}

	// Method to set headlight value
	async setHeadlightValue(leftPwm, rightPwm) {
		if (!this.ledTxCharacteristic) {
			console.error('LED TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x02, leftPwm, rightPwm]);
		await this.sendCommand(this.ledTxCharacteristic, command);
		Simulator.play();
	}

	// Method to set headlight auto mode
	async setHeadlightAutoMode(enabled) {
		if (!this.ledTxCharacteristic) {
			console.error('LED TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x03, enabled ? 0x01 : 0x00]);
		await this.sendCommand(this.ledTxCharacteristic, command);
		Simulator.play();
	}

	// Sensor methods
	async getCompassHeading() {
		if (!this.sensorTxCharacteristic) {
			console.error('Sensor TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x01]);
		await this.sendCommand(this.sensorTxCharacteristic, command);
	}

	async getUltrasonicDistance() {
		if (!this.sensorTxCharacteristic) {
			console.error('Sensor TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x02]);
		await this.sendCommand(this.sensorTxCharacteristic, command);
	}

	async getSoundLevel() {
		if (!this.sensorTxCharacteristic) {
			console.error('Sensor TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x03]);
		await this.sendCommand(this.sensorTxCharacteristic, command);
	}

	async getLightLevel() {
		if (!this.sensorTxCharacteristic) {
			console.error('Sensor TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x04]);
		await this.sendCommand(this.sensorTxCharacteristic, command);
	}

	async getTemperature() {
		if (!this.sensorTxCharacteristic) {
			console.error('Sensor TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x05]);
		await this.sendCommand(this.sensorTxCharacteristic, command);
	}

	async getBatteryLvl() {
		if (!this.batteryTxCharacteristic) {
			console.error('Battery TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x01]);
		await this.sendCommand(this.batteryTxCharacteristic, command);

		try {
			const value = await this.batteryRxCharacteristic.readValue();
			console.log(value);
			const battery_low = value.getUint8(0);
			const battery_high = value.getUint8(1);
			this.batteryLevel = (battery_low << 8) + battery_high;
			console.log(this.batteryLevel);
			function dataViewToHexString(dataView) {
				let hexString = '';
				for (let i = 0; i < dataView.byteLength; i++) {
					const byte = dataView.getUint8(i);
					const hex = byte.toString(16).padStart(2, '0'); // Convertit en hexadécimal, ajout de '0' si nécessaire
					hexString += hex;
				}
				return hexString;
			}
			
			console.log(dataViewToHexString(value))
		} catch (error) {
			console.error(error);
		}
	}

	async requestBitStatus() {
		if (!this.sensorTxCharacteristic) {
			console.error('Sensor TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x06]);
		await this.sendCommand(this.sensorTxCharacteristic, command);
	}

	async setIrLedControl(enabled) {
		if (!this.sensorTxCharacteristic) {
			console.error('Sensor TX Characteristic not available');
			return;
		}

		const command = new Uint8Array([0x07, enabled ? 0x01 : 0x00]);
		await this.sendCommand(this.sensorTxCharacteristic, command);
	}
}

const LotibotWebBLEAPI = new LotibotWebBLE();