'use strict';

/**
 * Ilo robot over Web Bluetooth.
 * The robot accepts on BLE the same "<...>" frames that ilo_micro.py writes on its UART,
 * so when connected the real ilo_micro.py runs in the simulator with machine.UART routed here.
 * Protocol taken from https://app.ilorobot.com (characteristics "c0de"/"fff2" are OTA update only).
 */
const ILO_SERVICE_UUID = '5f9b34fb-0000-1000-8000-00805f9b34fb';
const ILO_LIB_JS = 'src/lib/ilo_micro.js';
const ILO_LIB_PY = 'src/lib/ilo_micro.py';

const IloBLE = {
	ble: null,
	uuid: null,
	rx: [],

	get isConnected() {
		return !!(this.ble?.gattConnected() && this.uuid);
	},

	async connect() {
		this.ble = new WebBLE([ILO_SERVICE_UUID], () => { }, () => this._onDisconnect());
		await this.ble.requestDevice();
		if (!this.ble._bleDevice) return;
		await this.ble.getServiceCharacteristics();
		const characs = (this.ble._characteristics[ILO_SERVICE_UUID] || []).filter((c) => !/c0de/.test(c.uuid)); // c0de = OTA
		const props = (c) => Object.keys(Object.getPrototypeOf(c.properties)).filter((p) => c.properties[p]).join('/');
		characs.forEach((c) => this.ble.log("Characteristic " + c.uuid + " : " + props(c)));
		// write on the notify + write one like the ilo app does, else on any writable one
		const writable = characs.filter((c) => c.properties.write || c.properties.writeWithoutResponse);
		const charac = writable.find((c) => c.properties.notify) || writable[0];
		if (!charac) {
			this.ble.log("Ilo: characteristic not found ❌", 'interrupt');
			return this.disconnect();
		}
		this.uuid = charac.uuid;
		this.rx = [];
		this.ble._controller = { _on_parse: (bytes) => this._onNotify(bytes) };
		// answers may come on another characteristic than the written one: listen to all of them
		for (const c of characs.filter((c) => c.properties.notify || c.properties.indicate)) {
			await this.ble.reading('notify', c.uuid);
		}
		this._setSimulatorLibrary(true);
		this._swapUploadButtons(true);
		$("#disconnect-opt-ble").show();
		this.ble.log("Connected to " + this.ble._bleDevice?.name + " ✅");
	},

	_onNotify(bytes) {
		console.debug('[IloBLE]', Math.round(performance.now()), 'ms received', new TextDecoder().decode(bytes));
		this.rx.push(...bytes);
	},

	async disconnect() {
		if (this.isConnected) {
			await this.write('<>'); // stop the robot before losing it
		}
		this.ble?.unpair();
		this._onDisconnect();
	},

	_onDisconnect() {
		if (!this.uuid) return;
		this.uuid = null;
		Simulator.stop?.(); // the running program has no robot anymore
		this.ble?.log("Disconnected from ilo ✅");
		this._setSimulatorLibrary(false);
		this._swapUploadButtons(false);
		$("#disconnect-opt-ble").hide();
	},

	// While connected, the main upload button sends by bluetooth and the dropdown option uploads by serial.
	_swapUploadButtons(ble) {
		const main = $('#upload-python'), opt = $('#upload-ilo-ble-opt');
		if (!opt.length || (main.attr('onclick')?.includes('BLE') ?? ble) === ble) return;
		for (const attr of ['onclick', 'title', 'aria-label', 'data-bs-original-title']) {
			const value = main.attr(attr);
			main.attr(attr, opt.attr(attr) ?? null);
			opt.attr(attr, value ?? null);
		}
		for (const [selector, prop] of [['i', 'className'], ['.label-button', 'textContent']]) {
			const a = main.find(selector)[0], b = opt.find(selector)[0];
			if (a && b) [a[prop], b[prop]] = [b[prop], a[prop]];
		}
	},

	// Swap the 3D simulator module for the real micropython library (and back).
	_setSimulatorLibrary(useRobot) {
		const libs = Simulator.Mosaic.externalLibraries;
		if (useRobot) {
			this._simLib = this._simLib || libs[ILO_LIB_JS];
			delete libs[ILO_LIB_JS];
			libs[ILO_LIB_PY] = '/openInterface/esp32/assets/lib/ilo/ilo_micro.py';
		} else if (this._simLib) {
			libs[ILO_LIB_JS] = this._simLib;
			delete libs[ILO_LIB_PY];
		}
	},

	// Writes are chained: GATT rejects a write while another one is in progress.
	write(str) {
		this._tx = (this._tx || Promise.resolve()).then(() => {
			console.debug('[IloBLE]', Math.round(performance.now()), 'ms sent', str);
			return this.ble.write(new TextEncoder().encode(str), true, this.uuid);
		});
		return this._tx;
	},

	// Like UART.read(n): returns up to n bytes, waiting briefly if a frame is still in flight.
	async read(n = Infinity) {
		for (let i = 0; i < 10 && !this.rx.length && this.isConnected; i++) {
			await new Promise((r) => setTimeout(r, 10));
		}
		return this.rx.splice(0, n);
	}
};

async function uploadPythonBLE() {
	if (!IloBLE.isConnected) {
		try {
			await IloBLE.connect();
		} catch (e) {
			console.error(e);
			if (!/User cancelled/.test(String(e))) {
				new VittaNotif(5).displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
			}
		}
		if (!IloBLE.isConnected) return;
	}
	if ($("#simulator").is(":visible") === false) {
		toggleSimulator();
	} else {
		Simulator.replay();
	}
}
