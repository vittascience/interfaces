async function uploadPythonBLE() {
	if (BluebotWebBLEAPI.device === null) {
		await doConnectBLE();
	}
	if ($("#simulator").is(":visible") === false) {
		toggleSimulator();
	} else {
		Simulator.replay();
	}
	if ($('#monitor').hasClass('monitor-closed')) {
		InterfaceMonitor.toggle();
	}
	if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
		InterfaceMonitor.managePanel('console');
	}
};

async function doConnectBLE() {
	try {
		await BluebotWebBLEAPI.connect();
	} catch (e) {
		const err = String(e);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/User cancelled the requestDevice/)) {
			errorNotif.displayNotification(null, jsonPath('User cancelled the requestDevice()'), 'bg-danger');
			BluebotWebBLEAPI.device = null;
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnectBLE() {
	if (BluebotWebBLEAPI.gattConnected()) {
		await BluebotWebBLEAPI.unpair();
	}
};

'use strict';
/**
 * @class BluebotWebBLE
 */
class BluebotWebBLE {
	constructor() {
		this.device = null;
		this.isConnected = false;
		this.server = null;

		this.serviceUuid = '0000fff0-0000-1000-8000-00805f9b34fb';  // Service UUID for speaker
		this.rxCharacteristicUuid = '0000fff1-0000-1000-8000-00805f9b34fb';  // Characteristic UUID for Rx 
		this.txCharacteristicUuid = '0000fff2-0000-1000-8000-00805f9b34fb';  // Characteristic UUID for Tx 
		this.txCharacteristic = null;
		this.rxCharacteristic = null;
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

	handleNotifications(event) {
		const value = event.target.value;
		console.log(value);
	}

	// Method to connect the robot
	async connect() {
		try {
			InterfaceMonitor.writeConsole('Requesting Bluetooth Device...');
			this.device = await navigator.bluetooth.requestDevice({
				filters: [{ namePrefix: "BlueBot" }],
				optionalServices: [this.serviceUuid] // UUID du service complet
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
			this.txCharacteristic = await service.getCharacteristic(this.txCharacteristicUuid);
			this.rxCharacteristic = await service.getCharacteristic(this.rxCharacteristicUuid);

			// Start notifications on the Rx characteristic
			await this.rxCharacteristic.startNotifications();
			this.rxCharacteristic.addEventListener('characteristicvaluechanged', this.handleNotifications.bind(this));

			this.isConnected = true;

			InterfaceMonitor.writeConsole('Connected to Bluebot');
		} catch (error) {
			console.error('Failed to connect', error);
			this.isConnected = false;
		}
	}

	// Method to send BLE command
	async sendCommand(characteristic, command) {
		Simulator.pause();
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

	async moveForward() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x04, 0x67]);
		await this.sendCommand(this.txCharacteristic, command);
	}

	async go() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x01, 0x6A]);
		await this.sendCommand(this.txCharacteristic, command);
	}
	
	async clear() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x02, 0x69]);
		await this.sendCommand(this.txCharacteristic, command);
	}
	
	async pause() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x03, 0x68]);
		await this.sendCommand(this.txCharacteristic, command);
	}
	
	async moveBackward() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x05, 0x66]);
		await this.sendCommand(this.txCharacteristic, command);
	}
	
	async turnLeft90() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x06, 0x65]);
		await this.sendCommand(this.txCharacteristic, command);
	}
	
	async turnRight90() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x07, 0x64]);
		await this.sendCommand(this.txCharacteristic, command);
	}
	
	async turnLeft45() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x08, 0x63]);
		await this.sendCommand(this.txCharacteristic, command);
	}
	
	async turnRight45() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x09, 0x62]);
		await this.sendCommand(this.txCharacteristic, command);
	}
	
	async turnLeft135() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x0A, 0x61]);
		await this.sendCommand(this.txCharacteristic, command);
	}
	
	async turnRight135() {
		if (!this.txCharacteristic) {
			console.error('TX Characteristic not available');
			return;
		}
		const command = new Uint8Array([0xAA, 0x03, 0x81, 0x11, 0x0B, 0x60]);
		await this.sendCommand(this.txCharacteristic, command);
	}
}

const BluebotWebBLEAPI = new BluebotWebBLE();