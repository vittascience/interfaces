'use strict';

/**
 * Matatalab robots over Web Bluetooth (Nordic UART service).
 * The MatataBot is driven directly, or through the MatataCon controller (sensors, LED ring) it is paired with.
 *
 * Frame: 0xFE, then escaped [length, data..., crc16 (big endian)]; length = data + crc, crc computed on length + data.
 * Escaping: 0xFE -> 0xFD 0xDE, 0xFD -> 0xFD 0xDD.
 *
 * Two sets of commands exist: the "new protocol" (the one of the MatataCode app, selected at the connection) and the
 * former one (Matatabot_BLE_CMD_Protocol document), used when the robot does not accept the new one (no sensors).
 */

const MATATALAB_UUID = {
	SERVICE: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
	WRITE: '6e400002-b5a3-f393-e0a9-e50e24dcca9e',
	NOTIFY: '6e400003-b5a3-f393-e0a9-e50e24dcca9e'
};

const MatatalabProtocol = {
	ACK: 0x88,
	NEW_PROTOCOL: 0x7E,

	COLORS: {
		white: [255, 255, 255],
		red: [255, 0, 0],
		yellow: [255, 255, 0],
		green: [0, 255, 0],
		blue: [0, 0, 255],
		purple: [255, 0, 255],
		black: [0, 0, 0]
	},
	NOTES: {
		C3: 131, D3: 147, E3: 165, F3: 175, G3: 196, A3: 220, B3: 247,
		C4: 262, D4: 294, E4: 330, F4: 349, G4: 392, A4: 440, B4: 494, C5: 523
	},
	EYES: { left: 1, right: 2, both: 3 },
	ANIMATIONS: ['spoondrift', 'meteor', 'rainbow', 'firefly', 'colorwipe', 'breathe'],
	GESTURES: ['shake', 'face_up', 'face_down', 'tilt_left', 'tilt_right', 'tilt_forward', 'tilt_backward', 'fall'],
	BUTTONS: ['play', 'delete', 'right', 'forward', 'left', 'music', 'backward'],
	ANGLES: { roll: 4, pitch: 5, yaw: 6 },
	AXES: { x: 1, y: 2, z: 3 },
	CHANNELS: { red: 1, green: 2, blue: 3 },

	STEP_CM: 10,
	MAX_CM: 100,
	// wheel speed unit: 144 for 9.7 cm/s, 245 for the gear 6
	SPEED_PER_CM: 144 / 9.7,
	MAX_SPEED: 245,
	GEARS: 6,

	crc16(bytes) {
		let crc = 0xFFFF;
		for (const byte of bytes) {
			crc ^= byte << 8;
			for (let i = 0; i < 8; i++) {
				crc = (crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1) & 0xFFFF;
			}
		}
		return crc;
	},

	encode(data) {
		const body = [data.length + 2, ...data];
		const crc = this.crc16(body);
		body.push(crc >> 8, crc & 0xFF);
		return [0xFE, ...body.flatMap((b) => b === 0xFE ? [0xFD, 0xDE] : b === 0xFD ? [0xFD, 0xDD] : [b])];
	},

	/**
	 * Decoder of the notifications: the frames can be split or grouped.
	 * @param {function(Array<number>)} onFrame - called with [command, ...data] of each valid frame
	 */
	createDecoder(onFrame) {
		let buffer = null, escaped = false;
		return (bytes) => {
			for (const byte of bytes) {
				if (byte === 0xFE) {
					buffer = [];
					escaped = false;
					continue;
				}
				if (!buffer) continue;
				if (byte === 0xFD) {
					escaped = true;
					continue;
				}
				buffer.push(escaped ? (byte === 0xDE ? 0xFE : 0xFD) : byte);
				escaped = false;
				if (buffer.length === buffer[0] + 1) {
					const body = buffer.slice(0, -2);
					const crc = (buffer[buffer.length - 2] << 8) | buffer[buffer.length - 1];
					buffer = null;
					if (this.crc16(body) === crc) onFrame(body.slice(1));
				}
			}
		};
	},

	clamp: (value, min, max) => Math.min(max, Math.max(min, Math.round(Number(value) || 0))),
	// parts of a distance or an angle longer than the maximum of a command
	split(total, max) {
		const parts = [];
		for (let left = this.clamp(Math.abs(total), 0, max * 10); left > 0; left -= max) parts.push(Math.min(left, max));
		return parts;
	},
	uint16: (value) => [value >> 8, value & 0xFF],

	// "#rrggbb" or [r, g, b]
	toRGB(color) {
		if (typeof color === 'string') {
			const match = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
			return match ? match.slice(1).map((hex) => parseInt(hex, 16)) : (this.COLORS[color] || this.COLORS.black);
		}
		return [0, 1, 2].map((i) => this.clamp(color?.[i], 0, 255));
	},

	// brightness of a named colour: cubic from 0 to 6, as in the MatataCode app
	toLevel(name, level) {
		const ratio = (this.clamp(level, 0, 6) / 6) ** 3;
		return this.toRGB(name).map((c) => Math.round(c * ratio));
	},

	// name of the closest colour
	nearestColor(rgb) {
		const distance = (name) => this.COLORS[name].reduce((sum, c, i) => sum + (c - rgb[i]) ** 2, 0);
		return Object.keys(this.COLORS).reduce((best, name) => distance(name) < distance(best) ? name : best);
	},

	gearToSpeed(gear) {
		gear = this.clamp(gear, -this.GEARS, this.GEARS);
		return gear === 0 ? 0 : Math.sign(gear) * (35 + 35 * Math.abs(gear));
	},
	cmToSpeed(cm) {
		return this.clamp(cm * this.SPEED_PER_CM, -this.MAX_SPEED, this.MAX_SPEED);
	},

	/* Commands of the new protocol: each function returns the list of the frames data to send */
	current: {
		move: (cm) => MatatalabProtocol.split(cm * 10, MatatalabProtocol.MAX_CM * 10)
			.map((mm) => [0x10, cm < 0 ? 0x02 : 0x01, ...MatatalabProtocol.uint16(mm)]),
		// degrees > 0: clockwise
		turn: (degrees) => MatatalabProtocol.split(degrees, 360)
			.map((angle) => [0x10, degrees < 0 ? 0x03 : 0x04, ...MatatalabProtocol.uint16(angle)]),
		// speeds in the robot unit (gearToSpeed, cmToSpeed)
		wheels: (left, right) => {
			const wheel = (speed) => [speed < 0 ? 0x02 : 0x01, ...MatatalabProtocol.uint16(Math.abs(speed))];
			return [[0x11, 0x03, ...wheel(left), ...wheel(right)]];
		},
		dance: (n) => [[0x12, n]],
		action: (n) => [[0x13, n]],
		note: (note, ms) => [[0x15, ...MatatalabProtocol.uint16(MatatalabProtocol.NOTES[note]), ...MatatalabProtocol.uint16(ms)]],
		melody: (n) => [[0x16, 0x01, n]],
		music: (n) => [[0x16, 0x01, 0x10 + n]],
		eyes: (eye, rgb) => [[0x17, MatatalabProtocol.EYES[eye], ...rgb]],
		cancel: () => [[0x84]]
	},

	/* Commands of the former protocol */
	former: {
		move: (cm) => {
			const steps = MatatalabProtocol.clamp(Math.abs(cm) / MatatalabProtocol.STEP_CM, 0, 0xFF);
			return steps ? [[cm < 0 ? 0x23 : 0x20, steps]] : [];
		},
		// one byte per turn, and 1 means 90°
		turn: (degrees) => MatatalabProtocol.split(degrees, 180).filter((angle) => angle > 1)
			.map((angle) => [degrees < 0 ? 0x21 : 0x22, angle]),
		wheels: (left, right) => {
			const level = (speed) => MatatalabProtocol.clamp(6 + speed / MatatalabProtocol.MAX_SPEED * 6, 0, 12);
			return [[0x64, (level(left) << 4) | level(right), 0x01]];
		},
		dance: (n) => [[0x3A, n]],
		action: (n) => [[0x3B, n]],
		note: (note, ms) => {
			const command = note[1] === '3' ? 0x70 : 0x71;
			return [[command, 'CDEFGAB'.indexOf(note[0]) + 1, MatatalabProtocol.clamp(ms / 500, 1, 6)]];
		},
		melody: (n) => [[0x54, n]],
		music: (n) => [[0x39, n]],
		eyes: (eye, rgb) => {
			const level = Math.max(...rgb);
			const color = MatatalabProtocol.nearestColor(level ? rgb.map((c) => c * 255 / level) : rgb);
			const byte = (Object.keys(MatatalabProtocol.COLORS).indexOf(color) << 4) | (level ? Math.max(1, Math.round(6 * Math.cbrt(level / 255))) : 0);
			return [[0x64, byte, { left: 0x05, right: 0x06, both: 0x0B }[eye]]];
		},
		cancel: () => [[0x84]]
	}
};

class MatatalabWebBLE {
	constructor() {
		this.device = null;
		this.writeCharacteristic = null;
		this.isConnected = false;
		this.isFormer = false;
		this.wheels = { left: 0, right: 0 };
		this.queue = Promise.resolve();
		this.waiter = null;
		this.run = 0; // incremented when the program is stopped: its pending commands are dropped
		// Time allowed to the robot to answer before going on (ms)
		this.TIMEOUT = { short: 1000, perStep: 2000, perTurn: 4000, sound: 20000, margin: 3000 };
	}

	gattConnected() {
		return this.device?.gatt?.connected;
	}

	async connect() {
		InterfaceMonitor.writeConsole('Requesting Bluetooth Device...');
		this.device = await navigator.bluetooth.requestDevice({
			filters: [{ namePrefix: 'MatataBot' }, { namePrefix: 'MatataCon' }, { namePrefix: 'Matalab' }],
			optionalServices: [MATATALAB_UUID.SERVICE]
		});
		this.device.addEventListener('gattserverdisconnected', () => this.onGATTdisconnected(), { once: true });
		InterfaceMonitor.writeConsole('Connecting to GATT Server...');
		const server = await this.device.gatt.connect();
		const service = await server.getPrimaryService(MATATALAB_UUID.SERVICE);
		this.writeCharacteristic = await service.getCharacteristic(MATATALAB_UUID.WRITE);
		const notify = await service.getCharacteristic(MATATALAB_UUID.NOTIFY);
		const decode = MatatalabProtocol.createDecoder((frame) => this.onFrame(frame));
		notify.addEventListener('characteristicvaluechanged', ({ target: { value } }) => {
			decode(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
		});
		await notify.startNotifications();

		// Selection of the new protocol: [0x7E, device, robot not supported, device not supported, ...]
		const answer = await this.request([0x7E, 0x02, 0x02, 0x00, 0x00], [MatatalabProtocol.NEW_PROTOCOL, MatatalabProtocol.ACK], this.TIMEOUT.margin);
		this.isFormer = !(answer?.[0] === MatatalabProtocol.NEW_PROTOCOL && !answer[2] && !answer[3]);
		this.wheels = { left: 0, right: 0 };
		this.isConnected = true;
		this.onGATTconnected();
		if (this.isFormer) {
			const isController = /^MatataCon/.test(this.device.name);
			InterfaceMonitor.writeConsole(jsonPath('code.matatalab.' + (isController ? 'controllerMode' : 'formerFirmware')), 'warning', false, true);
		}
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
		this.writeCharacteristic = null;
		// do not keep the program waiting for the answer of a lost robot
		this.waiter?.resolve(null);
	}

	async unpair() {
		if (!this.device) return;
		InterfaceMonitor.writeConsole("Unpairing... 🚫", "secondary");
		this.device.gatt.disconnect();
	}

	onFrame(frame) {
		if (this.waiter?.expected.includes(frame[0])) this.waiter.resolve(frame);
	}

	async write(data) {
		const bytes = Uint8Array.from(MatatalabProtocol.encode(data));
		for (let i = 0; i < bytes.length; i += 20) {
			const chunk = bytes.slice(i, i + 20);
			if (this.writeCharacteristic?.properties.write) {
				await this.writeCharacteristic.writeValueWithResponse(chunk);
			} else {
				await this.writeCharacteristic?.writeValueWithoutResponse(chunk);
			}
		}
	}

	/**
	 * Send a command and wait for its answer. The commands are sent one after the other.
	 * @param {Array<number>} data
	 * @param {Array<number>} expected - first byte of the answer
	 * @param {number} timeout - ms
	 * @returns {Promise<Array<number>|null>} answer, null without answer in time
	 */
	request(data, expected, timeout) {
		const answer = this.queue.then(() => new Promise((resolve) => {
			const timer = setTimeout(() => this.waiter?.resolve(null), timeout);
			this.waiter = {
				expected,
				resolve: (frame) => {
					clearTimeout(timer);
					this.waiter = null;
					resolve(frame);
				}
			};
			this.write(data).catch((error) => {
				console.error('[Matatalab]', error);
				this.waiter?.resolve(null);
			});
		}));
		this.queue = answer;
		return answer;
	}

	// Never resolved once the program is stopped: the stopped script must not go on
	async inRun(callback) {
		const run = this.run;
		const result = await callback(() => run === this.run);
		return run === this.run ? result : new Promise(() => { });
	}

	command(name, args, timeout = this.TIMEOUT.short) {
		const frames = MatatalabProtocol[this.isFormer ? 'former' : 'current'][name](...args);
		return this.inRun(async (isRunning) => {
			for (const frame of frames) {
				if (isRunning()) await this.request(frame, [MatatalabProtocol.ACK], timeout);
			}
		});
	}

	/* Robot */

	// cm < 0: backward
	move(cm) {
		return this.command('move', [cm], Math.abs(cm) / MatatalabProtocol.STEP_CM * this.TIMEOUT.perStep + this.TIMEOUT.margin);
	}
	moveSteps(steps) {
		const count = MatatalabProtocol.clamp(Math.abs(steps), 0, 100);
		const cm = Math.sign(steps) * MatatalabProtocol.STEP_CM;
		return this.inRun(async (isRunning) => {
			for (let i = 0; i < count && isRunning() && this.isConnected; i++) await this.move(cm);
		});
	}
	turn(degrees) {
		return this.command('turn', [degrees], Math.abs(degrees) / 90 * this.TIMEOUT.perTurn + this.TIMEOUT.margin);
	}
	// Both wheels are always sent: a wheel left undefined keeps its speed
	setWheels({ left = this.wheels.left, right = this.wheels.right }) {
		this.wheels = { left, right };
		return this.command('wheels', [left, right], 300);
	}
	dance(n) {
		return this.command('dance', [MatatalabProtocol.clamp(n, 1, 6)], this.TIMEOUT.sound);
	}
	action(n) {
		return this.command('action', [MatatalabProtocol.clamp(n, 1, 6)], this.TIMEOUT.sound);
	}
	playNote(note, ms) {
		const duration = MatatalabProtocol.clamp(ms, 1, 10000);
		return this.command('note', [note, duration], duration + this.TIMEOUT.margin);
	}
	playMelody(n) {
		return this.command('melody', [MatatalabProtocol.clamp(n, 1, 10)], this.TIMEOUT.sound);
	}
	playMusic(n) {
		return this.command('music', [MatatalabProtocol.clamp(n, 1, 6)], this.TIMEOUT.sound);
	}
	setEyes(eye, rgb) {
		return this.command('eyes', [eye, rgb]);
	}

	// Program stopped: the robot too
	abort() {
		if (!this.isConnected) return;
		this.run++;
		this.waiter?.resolve(null);
		const commands = MatatalabProtocol[this.isFormer ? 'former' : 'current'];
		this.wheels = { left: 0, right: 0 };
		for (const frame of [...commands.cancel(), ...commands.wheels(0, 0)]) this.request(frame, [MatatalabProtocol.ACK], 300);
	}

	/* Controller (new protocol only) */

	controller(data) {
		return this.inRun(() => this.isFormer ? null : this.request(data, [MatatalabProtocol.ACK], this.TIMEOUT.short));
	}
	// leds: 12 colours [r, g, b]
	setRing(leds) {
		return this.controller([0x18, 0x07, ...leds.flat()]);
	}
	setRingAll(rgb) {
		return this.controller([0x18, 0x03, ...rgb]);
	}
	setRingLed(index, rgb) {
		return this.controller([0x18, 0x08, index, ...rgb]);
	}
	playRingAnimation(name) {
		return this.controller([0x18, 0x06, MatatalabProtocol.ANIMATIONS.indexOf(name) + 1]);
	}
	sendMessage(n) {
		return this.controller([0x20, 0x06, 0x01, MatatalabProtocol.clamp(n, 1, 6)]);
	}

	// Answer: [command, type, parameter, value...]
	read(data) {
		return this.inRun(() => this.isFormer ? null : this.request(data, [data[0]], this.TIMEOUT.short));
	}
	async check(...data) {
		return ((await this.read([0x20, ...data]))?.[3] ?? 0) > 0;
	}
	async byte(...data) {
		return (await this.read([0x28, ...data]))?.[3] ?? 0;
	}
	async float(...data) {
		const answer = await this.read([0x28, ...data]);
		if (!answer || answer.length < 7) return 0;
		return new DataView(Uint8Array.from(answer.slice(3, 7)).buffer).getFloat32(0);
	}

	isColor(name) {
		return this.check(0x01, Object.keys(MatatalabProtocol.COLORS).indexOf(name) + 1);
	}
	isGesture(name) {
		return this.check(0x02, MatatalabProtocol.GESTURES.indexOf(name) + 1);
	}
	isSound() {
		return this.check(0x03);
	}
	isObstacle() {
		return this.check(0x04);
	}
	isLight(state) {
		return this.check(0x05, state === 'bright' ? 0x01 : 0x02);
	}
	isButton(name) {
		return this.check(0x07, MatatalabProtocol.BUTTONS.indexOf(name) + 1);
	}
	async getMessage() {
		const message = (await this.read([0x20, 0x06, 0x02]))?.[3] ?? 0xFF;
		return message === 0xFF ? 0 : message;
	}
	getAngle(name) {
		return this.float(0x01, MatatalabProtocol.ANGLES[name]);
	}
	getAcceleration(axis) {
		return this.float(0x01, MatatalabProtocol.AXES[axis]);
	}
	getShaking() {
		return this.float(0x01, 0x07);
	}
	getColor(channel) {
		return this.byte(0x02, MatatalabProtocol.CHANNELS[channel]);
	}
	getBrightness() {
		return this.byte(0x02, 0x04);
	}
}

const MatatalabWebBLEAPI = new MatatalabWebBLE();

async function uploadPythonBLE() {
	if (!MatatalabWebBLEAPI.isConnected) {
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
}

async function doConnectBLE() {
	try {
		await MatatalabWebBLEAPI.connect();
	} catch (e) {
		const err = String(e);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/User cancelled the requestDevice/)) {
			errorNotif.displayNotification(null, jsonPath('User cancelled the requestDevice()'), 'bg-danger');
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
			MatatalabWebBLEAPI.device?.gatt?.disconnect();
		}
		MatatalabWebBLEAPI.device = null;
	}
}

async function doDisconnectBLE() {
	if (MatatalabWebBLEAPI.gattConnected()) {
		await MatatalabWebBLEAPI.unpair();
	}
}

if (typeof module !== 'undefined') module.exports = { MatatalabProtocol, MatatalabWebBLE };
