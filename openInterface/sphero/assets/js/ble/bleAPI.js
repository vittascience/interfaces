function setupMonitor() {
	if ($('#monitor').hasClass('monitor-closed')) {
		InterfaceMonitor.toggle();
	}
	if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
		InterfaceMonitor.managePanel('console');
	}
};

async function uploadPythonBLE() {
	if (SpheroWebBLEAPI._device === null || !SpheroWebBLEAPI.isConnected) {
		await connectBoardBLE();
	} else {
		SpheroWebBLEAPI.log("Sphero device already connected !");
		SpheroWebBLEAPI.logDevice();
	}
	if ($("#simulator").is(":visible") === false) {
		toggleSimulator();
	} else {
		Simulator.replay();
	}
	setupMonitor();
};

async function connectBoardBLE() {
	await doConnectBLE();
};

async function doConnectBLE() {
	try {
		await SpheroWebBLEAPI.requestDevice();
		if (!SpheroWebBLEAPI._bluetoothAPIDetected) {
			return InterfaceMonitor.writeConsole(jsonPath('code.WebBluetoothAPI.noWebBluetoothAPI'), 'interrupt');
		}
		await SpheroWebBLEAPI.initSpheroBLE();
	} catch (e) {
		const err = String(e);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/User cancelled the requestDevice/)) {
			errorNotif.displayNotification(null, jsonPath('User cancelled the requestDevice()'), 'bg-danger');
			SpheroWebBLEAPI._device = null;
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnectBLE() {
	if (SpheroWebBLEAPI.gattConnected()) {
		await SpheroWebBLEAPI.unpair();
	}
};

'use strict';

/**
 * https://github.com/trflorian/sphero_mini_win
 * 
 * https://github.com/MProx/Sphero_mini
 */

/**
 * @class SpheroWebBLE
 */
class SpheroWebBLE {
	/**
	 * Creates an instance of SpheroWebBLE.
	 * @private
	 */
	constructor() {
		this._SERVICE_UUID_1 = '00010001-574f-4f20-5370-6865726f2121';
		this._SERVICE_UUID_2 = '00020001-574f-4f20-5370-6865726f2121';
		this.isConnected = false;
		this._device = null;
		this._bluetoothAPIDetected = false;
		this.sequence = 0;
		this.notification_ack = "DEFAULT ACK";
		this.notification_seq = -1;
		this.notificationPacket = [];
		this.configured_sensors = [];
		this.collision = false;
		this.leftMotor = {
			'speed': 0,
			'direction': 0x01
		};
		this.rightMotor = {
			'speed': 0,
			'direction': 0x01
		};

		this.deviceID = {
			"apiProcessor": 0x10,                   // 16
			"systemInfo": 0x11,                     // 17
			"powerInfo": 0x13,                      // 19
			"driving": 0x16,                        // 22
			"animatronics": 0x17,                   // 23
			"sensor": 0x18,                         // 24
			"something": 0x19,                      // 25
			"userIO": 0x1a,                         // 26
			"somethingAPI": 0x1f                    // 31
		};

		this.SystemInfoCommands = {
			"mainApplicationVersion": 0x00,         // 00
			"bootloaderVersion": 0x01,              // 01
			"something": 0x06,                      // 06
			"something2": 0x13,                     // 19
			"something6": 0x12,                     // 18    
			"something7": 0x28                      // 40
		};

		//special values, to be escaped in packet data encoding:
		this._sendPacketConstants = {
			"StartOfPacket": 0x8d,                   // 141
			"EndOfPacket": 0xd8,                     // 216
			"ESC": 0xab                              // 171
		};

		this.userIOCommandIDs = {
			"allLEDs": 0x0e                          // 14
		};

		this.flags = {
			"isResponse": 0x01,                       // 0x01
			"requestsResponse": 0x02,                 // 0x02
			"requestsOnlyErrorResponse": 0x04,        // 0x04
			"resetsInactivityTimeout": 0x08           // 0x08
		};

		this.powerCommandIDs = {
			"deepSleep": 0x00,                  // 0
			"sleep": 0x01,                      // 01
			"batteryVoltage": 0x03,             // 03
			"wake": 0x0D,                       // 13
			"something": 0x05,                  // 05 
			"something2": 0x10,                 // 16         
			"something3": 0x04,                 // 04
			"something4": 0x1E                  // 30
		};

		this.drivingCommands = {
			"rawMotor": 0x01,                  // 1
			"resetHeading": 0x06,              // 6    
			"driveAsSphero": 0x04,             // 4
			"driveAsRc": 0x02,                 // 2
			"driveWithHeading": 0x07,          // 7
			"stabilization": 0x0C              // 12
		};

		this.sensorCommands = {
			'sensorMask': 0x00,                 // 00
			'sensorResponse': 0x02,             // 02
			'configureCollision': 0x11,         // 17
			'collisionDetectedAsync': 0x12,     // 18
			'resetLocator': 0x13,               // 19
			'enableCollisionAsync': 0x14,       // 20
			'sensor1': 0x0F,                    // 15
			'sensor2': 0x17,                    // 23
			'configureSensorStream': 0x0C       // 12
		};
	}

	/**
	 * Request Sphero device.
	 * @public
	 * @return {void}
	 */
	async requestDevice() {
		if (!this._bluetoothAPIDetected) {
			// on start, check if bluetooth is available
			if (navigator.bluetooth) {
				this.log("Web Bluetooth API is available. ✅");
				this._bluetoothAPIDetected = true;
			} else {
				this.log("Web Bluetooth API is not available. ❌");
				return;
			}
		}
		// Unpair if device already paired
		if (this.isConnected) this.unpair();
		this.log("Requesting Bluetooth Device... 📲", "secondary");
		const requestContents = {
			filters: [{
				services: [this._SERVICE_UUID_1]
			},
			{
				services: [this._SERVICE_UUID_2]
			}]
		};
		this._device = await navigator.bluetooth.requestDevice(requestContents);
		if (this._device) {
			this._device.addEventListener('gattserverdisconnected', this.onGATTdisconnected.bind(this));
			this.logDevice();
		}
	}

	logDevice() {
		// Log device name and ID
		this.log("Device name: " + this._device.name, "secondary");
		this.log("Device ID: " + this._device.id, "secondary");
	}

	async connectToGATT() {
		// Get GATT services
		try {
			this.log("Connecting to GATT server... 📡", "secondary");
			const server = await this._device.gatt.connect();
			if (server) {
				console.log(server);
				this.onGATTconnected();
			}
			const services = await server.getPrimaryServices();
			console.log(services);
			const API_V2_SERVICE = services.filter((service) => service.uuid === this._SERVICE_UUID_1)[0];
			console.log(API_V2_SERVICE);
			const OTHER_SERVICE = services.filter((service) => service.uuid === this._SERVICE_UUID_2)[0];
			console.log(OTHER_SERVICE);

			this.log("Getting characteristics... 🔍", "secondary");
			this.API_V2_characteristics = await API_V2_SERVICE.getCharacteristics();
			this.OTHER_SERVICE_characteristics = await OTHER_SERVICE.getCharacteristics();
			this.log("Got a list of of the characteristics. 📃", "secondary");
			console.log(this.API_V2_characteristics);
			console.log(this.OTHER_SERVICE_characteristics);
			this.isConnected = true;
		} catch (error) {
			this.isConnected = false;
			console.error(error);
		}
	}

	log(message, type = "success") {
		InterfaceMonitor.writeConsole(message, type, false, true);
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
		this._device = null;
	}

	/**
	 * Check if gatt server is connected.
	 * @public
	 * @returns {boolean}
	 */
	gattConnected() {
		return this._device?.gatt?.connected;
	};

	/**
	 * Unpair connected device.
	 * @public
	 * @return {void}
	 */
	unpair() {
		if (this._device) {
			this.log("Unpairing... 🚫", "secondary");
			this._device.gatt.disconnect();
			this._device = null;
			this.isConnected = false;
			this.clearNotification();
		}
	}

	async initSpheroBLE() {
		await this.connectToGATT();

		const API_V2_characteristic_uuid = "00010002-574f-4f20-5370-6865726f2121";
		this.API_V2_characteristic = this.API_V2_characteristics.filter((API_V2_characteristic) => API_V2_characteristic.uuid === API_V2_characteristic_uuid)[0];

		const AntiDOS_characteristic_uuid = "00020005-574f-4f20-5370-6865726f2121";
		this.AntiDOS_characteristic = this.OTHER_SERVICE_characteristics.filter((OTHER_SERVICE_characteristic) => OTHER_SERVICE_characteristic.uuid === AntiDOS_characteristic_uuid)[0];

		const DFU_characteristic_uuid = "00020002-574f-4f20-5370-6865726f2121";
		this.DFU_characteristic = this.OTHER_SERVICE_characteristics.filter((OTHER_SERVICE_characteristic) => OTHER_SERVICE_characteristic.uuid === DFU_characteristic_uuid)[0];

		const DFU2_characteristic_uuid = "00020004-574f-4f20-5370-6865726f2121";
		this.DFU2_characteristic = this.OTHER_SERVICE_characteristics.filter((OTHER_SERVICE_characteristic) => OTHER_SERVICE_characteristic.uuid === DFU2_characteristic_uuid)[0];

		// Unlock code: prevent the sphero mini from going to sleep again after 10 seconds
		this.log("[INIT] Writing AntiDOS characteristic unlock code");
		await this.AntiDOS_characteristic.writeValue(new TextEncoder().encode("usetheforce...band"));

		// Enable DFU notifications:
		this.log("[INIT] Enabling DFU notifications")
		const DFU_characteristic_notifications = await this.DFU_characteristic.startNotifications();
		this.log("Notifications started. 📩", "secondary");
		DFU_characteristic_notifications.addEventListener('characteristicvaluechanged', (event) => {
			console.log(event);
			const data = new TextDecoder().decode(event.target.value).replace(/\n/g, ' ').replace(/\r/g, '');
			console.log("Received value: " + data);
		});

		// No idea what this is for. Possibly a device ID of sorts ?
		this.log("[INIT] Reading DFU2 characteristic");
		const DFU2_characteristic_value = await this.DFU2_characteristic.readValue();
		console.log(DFU2_characteristic_value.buffer);

		// Enable API notifications:
		this.log("[INIT] Enabling API_v2 notifications");
		// enable notifications on api characteristic
		const API_V2_characteristic_notifications = await this.API_V2_characteristic.startNotifications();
		API_V2_characteristic_notifications.addEventListener('characteristicvaluechanged', (event) => {
			this.handleNotification(event);
		});
		this.log("Notifications started. 📩", "secondary");

		await this.wake();
		await this.configureSensorMask();
		await this.configureSensorStream();
		await this.configureCollisionDetection(50, 50, 50, 50, 50, 0x01, this.collisionCallback);

		this.log("[INIT] Initialization complete");

		return true;
	}

	collisionCallback() {
		this.collision = true;
		console.log(this.collision);
		setTimeout(() => {
			this.collision = false;
			console.log(this.collision);

		}, 500);
	}

	async _send(characteristic, devID, commID, payload = []) {
		/**
		 * Packet structure:
			---------------------------------
			- start      [1 byte]
			- flags      [1 byte]
			- source_id  [1 byte] (optional)
			- target_id  [1 byte] (optional)
			- device_id  [1 byte]
			- command_id [1 byte]
			- data       [n byte]
			- checksum   [1 byte]
			- end        [1 byte]
			---------------------------------
			Usually the first data byte is the api_v2 response code
		 */
		Simulator.pause();
		let sendBytes = [
			this._sendPacketConstants["StartOfPacket"],
			this.flags["resetsInactivityTimeout"] + this.flags["requestsResponse"],
			devID,
			commID,
			this.sequence
		].concat(payload);

		// console.log(sendBytes);

		// Increment sequence
		this.sequence = (this.sequence + 1) % 256;

		// Calculate checksum
		let checksum = 0;
		for (let i = 1; i < sendBytes.length; i++) {
			checksum = (checksum + sendBytes[i]) & 0xFF; // bitwise "and" to get modulo 256 sum of appropriate bytes
		}
		checksum = 0xFF - checksum; // bitwise 'not' to invert checksum bits

		sendBytes = sendBytes.concat([checksum, this._sendPacketConstants["EndOfPacket"]]);

		// Encode with escape sequence
		const escIndices = [];
		for (let i = sendBytes.length - 2; i > 0; i--) { // loop backwards from EOP to SOP
			if (Object.values(this._sendPacketConstants).includes(sendBytes[i])) {
				escIndices.push(i);
			}
		}

		for (let i = escIndices.length - 1; i >= 0; i--) { // from end to start, because length can change in loop!
			const index = escIndices[i];
			sendBytes.splice(index, 1, this._sendPacketConstants["ESC"], sendBytes[index] ^ 0x88);
		}

		// Convert numbers to bytes
		const output = new Uint8Array(sendBytes);
		// console.log(output);

		// Send the command over BLE
		try {
			await characteristic.writeValue(output);
			this.log('Command sent successfully');
		} catch (error) {
			this.log('Failed to send command: ' + error, 'danger');
		}
	}

	/*
	* Bring device out of sleep mode (can only be done if device was in sleep, not deep sleep).
	* If in deep sleep, the device should be connected to USB power to wake.
	*/
	async wake() {
		console.log(`[SEND ${this.sequence}] Waking`);
		await this._send(
			this.API_V2_characteristic,
			this.deviceID['powerInfo'],
			this.powerCommandIDs["wake"]);
		await this.getAcknowledgement("Wake");
	}

	/*
	* Put device to sleep or deep sleep (deep sleep needs USB power connected to wake up)
	*/
	async sleep(deepSleep = false) {
		let sleepCommID = null;
		if (deepSleep) {
			console.log("[INFO] Going into deep sleep. Connect USB power to wake.");
			sleepCommID = this.powerCommandIDs["deepSleep"];
		} else {
			sleepCommID = this.powerCommandIDs["sleep"];
		}
		await this._send(this.API_V2_characteristic,
			this.deviceID['powerInfo'],
			sleepCommID);
	}

	/*
	* Start to move the Sphero at a given direction and speed.
	* heading: integer from 0 - 360 (degrees)
	* speed: Integer from 0 - 255
	* Note: the zero heading should be set at startup with the resetHeading method. Otherwise, it may
	* seem that the sphero doesn't honor the heading argument
	*/
	async roll(speed = null, heading = null) {
		console.log(`[SEND ${this.sequence}] set speed ${speed} and heading ${heading}`);
		if (Math.abs(speed) > 255) {
			console.log("WARNING: roll speed parameter outside of allowed range (-255 to +255)")
		}
		if (speed < 0) {
			speed = -1 * speed + 256; //speed values > 256 in the send packet make the spero go in reverse
		}
		let speedH = (speed & 0xFF00) >> 8;
		let speedL = speed & 0xFF;
		let headingH = (heading & 0xFF00) >> 8;
		let headingL = heading & 0xFF;
		await this._send(this.API_V2_characteristic,
			this.deviceID['driving'],
			this.drivingCommands["driveWithHeading"],
			[speedL, headingH, headingL, speedH]);
		await this.getAcknowledgement("Roll");
	}

	async setHeading(heading) {
		await this.roll(10, heading);
	}

	/*
	* Control of each motor separately
	*
	* note: it works strange :) after wake up need sleeps
	*
	* :param int left_speed: speed of left motor from 0 to 255
	* :param DirectionRawMotor left_direction:
	* :param int right_speed: speed of right motor from 0 to 255
	* :param DirectionRawMotor right_direction:
	* :return:
	*
	*/
	async raw_motor(left_speed = 0x00, left_direction = 0x01, right_speed = 0x00, right_direction = 0x01) {
		/* Motors direction :
		* disable = 0x00
		* forward = 0x01
		* reverse = 0x02
		*/
		console.log(`[SEND ${this.sequence}] set left motor speed/direction [${left_speed}, ${left_direction}], set right motor speed/direction [${right_speed}, ${right_direction}]`);
		if (left_speed !== null) {
			this.leftMotor['speed'] = left_speed;
			this.leftMotor['direction'] = left_direction;
		} else {
			left_speed = this.leftMotor['speed'];
			left_direction = this.leftMotor['direction'];
		}
		if (right_speed !== null) {
			this.rightMotor['speed'] = right_speed;
			this.rightMotor['direction'] = right_direction;
		} else {
			right_speed = this.rightMotor['speed'];
			right_direction = this.rightMotor['direction'];
		}
		await this._send(this.API_V2_characteristic,
			this.deviceID['driving'],
			this.drivingCommands["rawMotor"],
			[
				left_direction, left_speed & 0xff,
				right_direction, right_speed & 0xff,
			],
		);
		await this.getAcknowledgement("RawMotor");
	};

	/*
	* Set device LED color based on RGB vales (each can  range between 0 and 0xFF)
	*/
	async setLEDColor(red = null, green = null, blue = null) {
		console.log(`[SEND ${this.sequence}] Setting main LED colour to [${red}, ${green}, ${blue}]`);
		await this._send(this.API_V2_characteristic,
			this.deviceID['userIO'], // 0x1a
			this.userIOCommandIDs["allLEDs"], // 0x0e
			[0x00, 0x0e, red, green, blue]);
		await this.getAcknowledgement("LED/backlight");
	}

	/*
	* Set device LED backlight intensity based on 0-255 values
	*
	* NOTE: this is not the same as aiming - it only turns on the LED
	*/
	async setBackLEDIntensity(brightness = null) {
		console.log(`[SEND ${this.sequence}] Setting backlight intensity to ${brightness}`);
		await this._send(
			this.API_V2_characteristic,
			this.deviceID['userIO'],
			this.userIOCommandIDs["allLEDs"],
			[0x00, 0x01, brightness]);
		await this.getAcknowledgement("LED/backlight");
	}
	/*
	* Get battery voltage
	*/
	async getVoltage() {
		console.log(`[SEND ${this.sequence}] Getting battery voltage`);
		await this._send(
			this.API_V2_characteristic,
			this.deviceID['powerInfo'],  // 0x13
			this.powerCommandIDs["batteryVoltage"]);  // 0x03
		await this.getAcknowledgement("Battery");
	}

	/*
	* Reset the heading zero angle to the current heading (useful during aiming)
	* Note: in order to manually rotate the sphero, you need to call stabilization(False).
	* Once the heading has been set, call stabilization(True).
	*/
	async resetHeading() {
		console.log(`[SEND ${this.sequence}] Resetting heading`);
		await this._send(
			this.API_V2_characteristic,
			this.deviceID['driving'],
			this.drivingCommands["resetHeading"]);
		await this.getAcknowledgement("Heading");
	}

	/*
	Unknown function. Observed in bluetooth sniffing. 
	*/
	async sensor1() {
		await this._send(
			this.API_V2_characteristic,
			this.deviceID['sensor'],
			this.sensorCommands['sensor1'],
			[0x01])
		await this.getAcknowledgement("Sensor1");
	}

	/*
	Unknown function. Observed in bluetooth sniffing. 
	*/
	async sensor2() {
		await this._send(
			this.API_V2_characteristic,
			this.deviceID['sensor'],
			this.sensorCommands['sensor2'],
			[0x00]);
		await this.getAcknowledgement("Sensor2");
	}

	/*
	* Send command to configure sensor stream using default values as found during bluetooth 
	* sniffing of the Sphero Edu app.
	*
	* Must be called after calling configureSensorMask()
	*/
	async configureSensorStream() { // Use default values
		const bitfield1 = 0b00000000; // Unknown function - needs experimenting
		const bitfield2 = 0b00000000; // Unknown function - needs experimenting
		const bitfield3 = 0b00000000; // Unknown function - needs experimenting
		const bitfield4 = 0b00000000; // Unknown function - needs experimenting
		console.log(`[SEND ${this.sequence}] Configuring sensor stream`);
		await this._send(
			this.API_V2_characteristic,
			this.deviceID['sensor'],
			this.sensorCommands['configureSensorStream'],
			[bitfield1, bitfield2, bitfield3, bitfield4]);
		await this.getAcknowledgement("Sensor");
	}


	/*
	*	Send command to configure sensor mask using default values as found during bluetooth 
	*	sniffing of the Sphero Edu app. From experimentation, it seems that these are he functions of each:
	*	
	*	Sampling_rate_divisor. Slow data EG: Set to 0x32 to the divide data rate by 50. Setting below 25 (0x19) causes 
	*	bluetooth errors        
	*		
	*	Packet_count: Select the number of packets to transmit before ending the stream. Set to zero to stream infinitely
	*		
	*	All IMU bool parameters: Toggle transmission of that value on or off (e.g. set IMU_acc_x = True to include the 
	*	X-axis accelerometer readings in the sensor stream)
	*/
	async configureSensorMask(sample_rate_divisor = 0x25, // Must be > 0
		packet_count = 0,
		IMU_pitch = true,
		IMU_roll = true,
		IMU_yaw = true,
		IMU_acc_x = true,
		IMU_acc_y = true,
		IMU_acc_z = true,
		IMU_gyro_x = true,
		IMU_gyro_y = true,
		IMU_gyro_z = true) {

		// Construct bitfields based on function parameters:
		const IMU_bitfield1 = (IMU_pitch << 2) + (IMU_roll << 1) + IMU_yaw;
		const IMU_bitfield2 = ((IMU_acc_y << 7) + (IMU_acc_z << 6) + (IMU_acc_x << 5) + (IMU_gyro_y << 4) + (IMU_gyro_x << 3) + (IMU_gyro_z << 2));

		console.log(`[SEND ${this.sequence}] Configuring sensor mask`);
		await this._send(
			this.API_V2_characteristic,
			this.deviceID['sensor'],
			this.sensorCommands['sensorMask'],
			[
				0x00,               // Unknown param - altering it seems to slow data rate. Possibly averages multiple readings?
				sample_rate_divisor,
				packet_count,       // Packet count: select the number of packets to stop streaming after (zero = infinite)
				0b00,               // Unknown param: seems to be another accelerometer bitfield? Z-acc, Y-acc
				IMU_bitfield1,
				IMU_bitfield2,
				0b00                // reserved, Position?, Position?, velocity?, velocity?, Y-gyro, timer, reserved
			]
		);
		await this.getAcknowledgement("Mask");

		/*
		* Since the sensor values arrive as unlabelled lists in the order that they appear in the bitfields above, we need 
		* to create a list of sensors that have been configured. Once we have this list, then in the default_delegate class, 
		* we can get sensor values as attributes of the sphero_mini class.
		* e.g. console.log(sphero.IMU_yaw); // displays the current yaw angle
		*/

		// Initialize dictionary with sensor names as keys and their bool values (set by the user) as values:
		const availableSensors = {
			"IMU_pitch": IMU_pitch,
			"IMU_roll": IMU_roll,
			"IMU_yaw": IMU_yaw,
			"IMU_acc_y": IMU_acc_y,
			"IMU_acc_z": IMU_acc_z,
			"IMU_acc_x": IMU_acc_x,
			"IMU_gyro_y": IMU_gyro_y,
			"IMU_gyro_x": IMU_gyro_x,
			"IMU_gyro_z": IMU_gyro_z
		};

		// Create list of only sensors that have been "activated" (set as true in the method arguments):
		this.configured_sensors = Object.entries(availableSensors)
			.filter(([key, value]) => value)
			.reduce((obj, [key, value]) => {
				obj[key] = value;
				return obj;
			}, {});
	}

	/*
	* Appears to function the same as other Sphero models, however speed settings seem to have no effect. 
	* NOTE: Setting to zero seems to cause bluetooth errors with the Sphero Mini/bluepy library - set to 
	* 255 to make it effectively disabled.
	*
	* deadTime disables future collisions for a short period of time to avoid repeat triggering by the same
	* event. Set in 10ms increments. So if deadTime = 50, that means the delay will be 500ms, or half a second.
	*
	* From Sphero docs:
	*
	* xThreshold/yThreshold: An 8-bit settable threshold for the X (left/right) and Y (front/back) axes 
	* of Sphero.
	*
	* xSpeed/ySpeed: An 8-bit settable speed value for the X and Y axes. This setting is ranged by the 
	* speed, then added to xThreshold, yThreshold to generate the final threshold value.
	*/
	async configureCollisionDetection(xThreshold = 50,
		yThreshold = 50,
		xSpeed = 50,
		ySpeed = 50,
		deadTime = 50, // in 10 millisecond increments
		method = 0x01, // Must be 0x01        
		callback = null) {

		console.log(`[SEND ${this.sequence}] Configuring collision detection`);
		this._send(
			this.API_V2_characteristic,
			this.deviceID['sensor'],
			this.sensorCommands['configureCollision'],
			[method, xThreshold, xSpeed, yThreshold, ySpeed, deadTime]
		);
		this.collision_detection_callback = callback;
		await this.getAcknowledgement("Collision");
	}

	/*
	* Sends command to return application data in a notification
	*/
	async returnMainApplicationVersion() {
		console.log(`[SEND ${this.sequence}] Requesting firmware version`);
		await this._send(
			this.API_V2_characteristic,
			this.deviceID['systemInfo'],
			this.SystemInfoCommands['mainApplicationVersion']);
		await this.getAcknowledgement("Firmware");
	}

	getConfiguredSensors() {
		return this.configured_sensors;
	}

	get_pitch() {
		return this.configured_sensors["IMU_pitch"];
	}

	get_roll() {
		return this.configured_sensors["IMU_roll"];
	}

	get_yaw() {
		return this.configured_sensors["IMU_yaw"];
	}

	get_accelerometer_x() {
		return this.configured_sensors["IMU_acc_x"];
	}

	get_accelerometer_y() {
		return this.configured_sensors["IMU_acc_y"];
	}

	get_accelerometer_z() {
		return this.configured_sensors["IMU_acc_z"];
	}

	get_gyroscope_x() {
		return this.configured_sensors["IMU_gyro_x"];
	}

	get_gyroscope_y() {
		return this.configured_sensors["IMU_gyro_y"];
	}

	get_gyroscope_z() {
		return this.configured_sensors["IMU_gyro_z"];
	}

	// Method to clear notifications
	clearNotification() {
		this.notification_ack = "DEFAULT ACK";
		this.notification_seq = -1;
	}

	bits_to_num(bits) {
		// Convert bits to integer
		const num = parseInt(bits, 2);

		// Create a buffer and a DataView for the bytes
		const buffer = new ArrayBuffer(4); // 4 bytes for a float
		const view = new DataView(buffer);

		// Set the bytes in little-endian order
		view.setUint32(0, num, true); // true for little-endian

		// Read the float from the buffer
		const floatNum = view.getFloat32(0, true); // true for little-endian

		return floatNum;
	}

	// Wait up to 10 seconds for the correct acknowledgement to come in, including sequence number!
	async getAcknowledgement(ack) {
		const start = Date.now();
		while (true) {
			await new Promise(resolve => setTimeout(resolve, 10)); // Sleep for 10ms

			if (this.notification_seq === (this.sequence - 1) % 256) { // Use one less than sequence, because send function increments it for next send.
				console.log(`[RESP ${this.sequence - 1}] ${this.notification_ack}`);
				this.clearNotification();
				Simulator.play();
				return;
			} else if (this.notification_seq >= 0) {
				console.error(`Unexpected ACK. Expected: ${ack}/${this.sequence}, received: ${this.notification_ack.split(' ')[0]}/${this.notification_seq}`);
			}

			if (Date.now() > start + 2000) { // 2 seconds timeout
				console.error(`Timeout waiting for acknowledgement: ${ack}/${this.sequence}`);
				Simulator.play();
				return;
			}
		}
	}

	/*
	* This method acts as an interrupt service routine. When a notification comes in, this
	* method is invoked, with the variable 'sender' being the handle of the characteristic that
	* sent the notification, and 'data' being the payload (sent one byte at a time, so the packet
	* needs to be reconstructed).
	* The method keeps appending bytes to the payload packet byte list until end-of-packet byte is
	* encountered. Data encoding/decoding prevents any payload or frame data to be mis-interpreted as end-of-packet.
	*/
	handleNotification(event) {
		// collect until end of packet:
		const data = new Uint8Array(event.target.value.buffer);
		this.notificationPacket.push(...data);  // add new single or multiple bytes to packet list
		// discard if first byte not start-of-packet
		if (this.notificationPacket[0] !== this._sendPacketConstants.StartOfPacket) {
			console.error("Warning: discarding unexpected data before SOP:", this.notificationPacket);
			this.notificationPacket = [];
		}

		// parse on EndOfPacket received structure similar to send packets
		else if (this.notificationPacket[this.notificationPacket.length - 1] === this._sendPacketConstants.EndOfPacket) {
			// decode
			const escIndices = [];
			for (let i = this.notificationPacket.length - 2; i > 0; i--) { // descending index between EOP and SOP
				if (Object.values(this._sendPacketConstants).includes(this.notificationPacket[i])) {
					escIndices.push(i);
				}
			}

			for (let i = escIndices.length - 1; i >= 0; i--) { // from end to start, because length can change in loop!
				const index = escIndices[i];
				this.notificationPacket.splice(index, 1, this._sendPacketConstants["ESC"], this.notificationPacket[index] ^ 0x88);
			}

			// Attempt to unpack. Might fail if packet is too badly corrupted
			try {
				const [start, flagsBits, devid, commcode, seq, ...notificationPayload] = this.notificationPacket;
				const end = notificationPayload.pop();
				const chsum = notificationPayload.pop();

				// Compute and append checksum and add EOP byte:
				// From Sphero docs: "The [checksum is the] modulo 256 sum of all the bytes
				//                   from the device ID through the end of the data payload,
				//                   bit inverted (1's complement)"
				// For the sphero mini, the flag bits must be included too:
				const checksumBytes = [start, flagsBits, devid, commcode, seq, ...notificationPayload];
				let checksum = 0; // init
				for (let i = 1; i < checksumBytes.length; i++) {
					checksum = (checksum + checksumBytes[i]) & 0xFF; // bitwise "and" to get modulo 256 sum of appropriate bytes
				}
				checksum = 0xFF - checksum; // bitwise 'not' to invert checksum bits
				if (checksum !== chsum) { // check computed checksum against that received in the packet
					// console.warn("Warning: notification packet checksum failed", this.notificationPacket);
					this.notificationPacket = []; // Discard this packet
					return;  // exit
				}

				// Check if response packet:
				if (flagsBits & this.flags.isResponse) {  // it is a response
					// Use device ID and command code to determine which command is being acknowledged:
					if (devid === this.deviceID.powerInfo && commcode === this.powerCommandIDs.wake) {
						this.notification_ack = "Wake acknowledged"; // Acknowledgement after wake command
					} else if (devid === this.deviceID.driving && commcode === this.drivingCommands.driveWithHeading) {
						this.notification_ack = "Roll command acknowledged";
					} else if (devid === this.deviceID.driving && commcode === this.drivingCommands.rawMotor) {
						this.notification_ack = "RawMotor command acknowledged";
					} else if (devid === this.deviceID.driving && commcode === this.drivingCommands.stabilization) {
						this.notification_ack = "Stabilization command acknowledged";
					} else if (devid === this.deviceID.userIO && commcode === this.userIOCommandIDs.allLEDs) {
						this.notification_ack = "LED/backlight color command acknowledged";
					} else if (devid === this.deviceID.driving && commcode === this.drivingCommands.resetHeading) {
						this.notification_ack = "Heading reset command acknowledged";
					} else if (devid === this.deviceID.sensor && commcode === this.sensorCommands.configureCollision) {
						this.notification_ack = "Collision detection configuration acknowledged";
					} else if (devid === this.deviceID.sensor && commcode === this.sensorCommands.configureSensorStream) {
						this.notification_ack = "Sensor stream configuration acknowledged";
					} else if (devid === this.deviceID.sensor && commcode === this.sensorCommands.sensorMask) {
						this.notification_ack = "Mask configuration acknowledged";
					} else if (devid === this.deviceID.sensor && commcode === this.sensorCommands.sensor1) {
						this.notification_ack = "Sensor1 acknowledged";
					} else if (devid === this.deviceID.sensor && commcode === this.sensorCommands.sensor2) {
						this.notification_ack = "Sensor2 acknowledged";
					} else if (devid === this.deviceID.powerInfo && commcode === this.powerCommandIDs.batteryVoltage) {
						let V_batt = notificationPayload[2] + notificationPayload[1] * 256 + notificationPayload[0] * 65536;
						V_batt /= 100; // Notification gives V_batt in 10mV increments. Divide by 100 to get to volts.
						this.notification_ack = "Battery voltage:" + V_batt + "v";
						this.v_batt = V_batt;
					} else if (devid === this.deviceID.systemInfo && commcode === this.SystemInfoCommands.mainApplicationVersion) {
						const version = notificationPayload.join('.');
						this.notification_ack = "Firmware version: " + version;
						this.firmware_version = notificationPayload;
					} else {
						this.notification_ack = "Unknown acknowledgement";
						console.log(this.notificationPacket, "===================> Unknown ack packet");
					}
					this.notification_seq = seq;
				} else { // Not a response packet - therefore, asynchronous notification (e.g. collision detection, etc):
					// Collision detection:
					if (devid === this.deviceID.sensor && commcode === this.sensorCommands.collisionDetectedAsync) {
						// The first four bytes are data that is still un-parsed. the remaining unsaved bytes are always zeros
						const [_, __, ___, ____, _____, ______, axis, _______, Y_mag, ________, X_mag, ...rest] = notificationPayload;
						const dir = axis === 1 ? "Left/right" : "Forward/back";
						console.log("Collision detected:");
						console.log("\tAxis:", dir);
						console.log("\tX_mag:", X_mag);
						console.log("\tY_mag:", Y_mag);

						if (typeof this.collision_detection_callback !== "undefined" && this.collision_detection_callback !== null) {
							this.notificationPacket = []; // need to clear packet, in case new notification comes in during callback
							this.collision_detection_callback();
						}
					}

					// Sensor response:
					else if (devid === this.deviceID.sensor && commcode === this.sensorCommands.sensorResponse) {
						// Convert to binary, pad bytes with leading zeros:
						let val = '';
						for (let byte of notificationPayload) {
							val += byte.toString(2).padStart(8, '0');
						}

						// Break into 32-bit chunks
						const nums = [];
						while (val.length > 0) {
							const num = val.slice(0, 32);
							val = val.slice(32);
							nums.push(num);
						}

						// convert from raw bits to float:
						const sensorValues = nums.map(num => this.bits_to_num(num));

						// Set sensor values as class attributes:
						// for (let i = 0; i < this.configured_sensors.length; i++) {
						// 	this.configured_sensors[i] = sensorValues[i];
						// }
						let i = 0;
						Object.keys(this.configured_sensors).forEach(key => {
							this.configured_sensors[key] = sensorValues[i];
							i++;
						});
					}
					// Unrecognized packet structure:
					else {
						this.notification_ack = "Unknown asynchronous notification"; // print(this.notificationPacket)
						console.log(this.notificationPacket, "===================> Unknown async packet");
					}
				}
				this.notificationPacket = [];  // Start new packet after this byte
				// packet parsing done
			} catch (error) {
				console.error(error);
			}
		}
	}
}

const SpheroWebBLEAPI = new SpheroWebBLE();