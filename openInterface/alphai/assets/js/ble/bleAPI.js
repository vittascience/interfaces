
async function uploadPythonBLE() {
	await doConnectBLE();
	if (AlphAiWebBLEAPI.isConnected()) {
		if ($("#simulator").is(":visible")) {
			toggleSimulator();
		}
		if ($('#monitor').hasClass('monitor-closed')) {
			InterfaceMonitor.toggle();
		}
		if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
			InterfaceMonitor.managePanel('console');
		}
		await AlphAiWebBLEAPI.sendScript(CodeManager.getSharedInstance().getCode());
	}
};

async function doConnectBLE() {
	try {
		if(AlphAiWebBLEAPI.isConnected()) return;
		await AlphAiWebBLEAPI.connect();
	} catch (e) {
		const err = String(e);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/User cancelled the requestDevice/)) {
			errorNotif.displayNotification(null, 'User cancelled the requestDevice()', 'bg-danger');
		} else {
			errorNotif.displayNotification(null, jsonPath('code.WebBluetoothAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnectBLE() {
	InterfaceMonitor.writeConsole("Unpairing... 🚫", "neutral");
	await AlphAiWebBLEAPI.disconnect();
	$("#disconnect-opt-ble").hide();
};

// ============================================================
// bleAPI.js — AlphAI Bluetooth Low Energy API
//
// Provides the AlphAIWebBLE class to connect, communicate and
// send Python scripts to an AlphAI robot over Web Bluetooth.
//
// ============================================================

class AlphAIWebBLE {

	// ============================================================
	// SECTION 1: CONSTANTS — BLE identifiers and protocol limits
	// ============================================================

	static SERVICE_UUID = '1234ab00-1234-1234-1234-123456789abc';
	static CMD_CHAR_UUID = '0000ab01-0000-1000-8000-00805f9b34fb';
	static REPLY_CHAR_UUID = '0000ab02-0000-1000-8000-00805f9b34fb';

	static MAX_PACKET_DATA = 168; // max payload bytes per BLE packet (182 total - 14 header)
	static PACKET_DELAY_MS = 50;  // mandatory delay between consecutive BLE writes (ms)

	// 32-byte disconnect sentinel sent by the robot on the reply characteristic
	static DISCONNECTED_MSG = new Uint8Array([
		0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x12, 0x00, 0x0c, 0x00,
		0x64, 0x69, 0x73, 0x63, 0x6f, 0x6e, 0x6e, 0x65,
		0x63, 0x74, 0x65, 0x64, 0x00, 0x00, 0x00, 0x00
	]);

	// ============================================================
	// SECTION 2: CONSTRUCTOR & STATE
	// ============================================================

	constructor() {
		// BLE connection state
		this._device = null;
		this._server = null;
		this._cmdChar = null;
		this._replyChar = null;
		this._connected = false;

		// Multi-packet reassembly buffer: commandId → { total, received: [Uint8Array] }
		this._pendingPackets = new Map();

		// Write queue state
		this._cmdQueue = [];
		this._queueProcessing = false;

		// Event listeners: eventName → [callback, ...]
		this._listeners = {};
	}

	// ============================================================
	// SECTION 3: EVENT EMITTER
	//
	// Simple pub/sub so consumers can react to events without
	// coupling to a specific UI framework.
	//
	// Events emitted:
	//   'log'          (message: string)
	//   'connected'    ()
	//   'disconnected' ()
	//   'reply'        ({ name: string, value: any })
	//   'print'        (message: string)   — robot print_message output
	// ============================================================

	/**
	 * Register a listener for an event.
	 * @param {string} event
	 * @param {Function} callback
	 */
	on(event, callback) {
		if (!this._listeners[event]) this._listeners[event] = [];
		this._listeners[event].push(callback);
		return this; // allow chaining
	}

	/**
	 * Remove a previously registered listener.
	 * @param {string} event
	 * @param {Function} callback
	 */
	off(event, callback) {
		if (!this._listeners[event]) return;
		this._listeners[event] = this._listeners[event].filter(fn => fn !== callback);
		return this;
	}

	_emit(event, ...args) {
		(this._listeners[event] || []).forEach(fn => fn(...args));
	}

	// ============================================================
	// SECTION 4: PUBLIC API — CONNECT / DISCONNECT / SEND
	// ============================================================

	/**
	 * Scan for an AlphAI robot and establish a BLE connection.
	 * Opens the browser's native device picker (requires user gesture).
	 * Emits 'connected' on success, 'log' with error message on failure.
	 */
	async connect() {
		InterfaceMonitor.writeConsole('Scanning for AlphAI robots...', 'neutral');
		try {
			this._device = await navigator.bluetooth.requestDevice({
				filters: [
					{ services: [AlphAIWebBLE.SERVICE_UUID] },
					{ namePrefix: 'ALPHAI' },
					{ namePrefix: 'BlueZ' },
				],
				optionalServices: [AlphAIWebBLE.SERVICE_UUID],
			});

			const name = this._device.name || 'unnamed device';
			InterfaceMonitor.writeConsole(`Selected: ${name}`, 'neutral');

			InterfaceMonitor.writeConsole('Connecting to GATT server...', 'neutral');
			this._server = await this._device.gatt.connect();

			const service = await this._server.getPrimaryService(AlphAIWebBLE.SERVICE_UUID);
			this._cmdChar = await service.getCharacteristic(AlphAIWebBLE.CMD_CHAR_UUID);
			this._replyChar = await service.getCharacteristic(AlphAIWebBLE.REPLY_CHAR_UUID);

			await this._replyChar.startNotifications();
			this._replyChar.addEventListener('characteristicvaluechanged', this._onReply.bind(this));
			this._device.addEventListener('gattserverdisconnected', this._onDisconnected.bind(this));

			this._connected = true;
			this._emit('connected', name);
			InterfaceMonitor.writeConsole('Connected!', 'success');
			$("#disconnect-opt-ble").show();
			$("#execution-buttons-panel").append('<i id="connected-icon-ble" class="fa-brands fa-bluetooth"></i>');
		} catch (err) {
			InterfaceMonitor.writeConsole(`Connection failed: ${err.message}`, 'interrupt');
			throw err;
		}
	}

	/**
	 * Gracefully disconnect from the robot.
	 * Sends the "disconnect" command before closing the BLE connection.
	 * Emits 'disconnected'.
	 */
	async disconnect() {
		if (!this._connected) return;
		try {
			if (this._cmdChar) {
				const cmd = this._encodeCommand('disconnect');
				await this._cmdChar.writeValue(cmd.buffer);
				await this._device.gatt.disconnect();
			}
		} catch (err) {
			InterfaceMonitor.writeConsole(`Error sending disconnect: ${err.message}`, 'interrupt');
		}
		this._cleanup();
	}

	/**
	 * Check if currently connected to a robot.
	 * @return {boolean}
	 */
	isConnected() {
		return this._connected;
	}

	/**
	 * Send a Python script to the robot and execute it.
	 *
	 * @param {Uint8Array|File|ArrayBuffer} script  — the .py file content
	 * @returns {Promise<void>}
	 */
	async sendScript(script) {
		let scriptBytes;
		if (typeof script === 'string') {
			scriptBytes = new TextEncoder().encode(script);
		} else if (script instanceof File) {
			const arrayBuf = await script.arrayBuffer();
			scriptBytes = new Uint8Array(arrayBuf);
		} else if (script instanceof ArrayBuffer) {
			scriptBytes = new Uint8Array(script);
		} else if (script instanceof Uint8Array) {
			scriptBytes = script;
		} else {
			throw new TypeError('sendScript: expected Uint8Array, ArrayBuffer, or File');
		}

		await this.sendCommand('run python', scriptBytes);
	}

	/**
	 * Stop the currently running Python script on the robot.
	 * Achieved by sending "run python" with an empty payload.
	 */
	async stopScript() {
		if(!this._connected) return;
		await this.sendCommand('run python', new Uint8Array(0));
	}

	/**
	 * Send any named command with optional binary payload.
	 * Handles encoding, packet splitting, and queued BLE writes.
	 *
	 * @param {string}     name       — command name (e.g. "run python")
	 * @param {Uint8Array} [valueData] — raw value bytes (optional)
	 */
	async sendCommand(name, valueData) {
		if (!this._connected || !this._cmdChar) {
			throw new Error('Not connected');
		}

		// Step 1: Encode into AlphAI binary message format
		const encoded = this._encodeCommand(name, valueData);

		// Step 2: Split into BLE packets
		const commandId = Date.now() % 0xFFFFFFFF;
		const packets = this._createPackets(encoded, commandId);

		InterfaceMonitor.writeConsole(`Sending "${name}": ${encoded.length} bytes in ${packets.length} packet(s)`, 'neutral');

		// Step 3: Write all packets sequentially through the queue
		await this._enqueueCommand(async () => {
			for (let i = 0; i < packets.length; i++) {
				await this._cmdChar.writeValue(packets[i].buffer);
				if (i < packets.length - 1) await this._sleep(AlphAIWebBLE.PACKET_DELAY_MS);
			}
		});

		InterfaceMonitor.writeConsole(`"${name}" sent successfully`, 'success');
	}

	// ============================================================
	// SECTION 5: GETTERS
	// ============================================================

	/** Whether the robot is currently connected. */
	get connected() { return this._connected; }

	/** The name of the connected BLE device, or null. */
	get deviceName() { return this._device?.name ?? null; }

	// ============================================================
	// SECTION 6: COMMAND ENCODING — AlphAI Binary Message Format
	//
	//   ┌──────────────┬────────────────────┬────────────────┬───────────────┐
	//   │ name_length  │ name               │ value_length   │ value_data    │
	//   │ 2 bytes      │ N bytes            │ 4 bytes        │ M bytes       │
	//   │ Uint16 LE    │ UTF-8 string       │ Uint32 LE      │               │
	//   └──────────────┴────────────────────┴────────────────┴───────────────┘
	// ============================================================

	_encodeCommand(name, valueData) {
		const nameBytes = new TextEncoder().encode(name);
		const valueLen = valueData ? valueData.length : 0;
		const total = 2 + nameBytes.length + 4 + valueLen;

		const buf = new ArrayBuffer(total);
		const dv = new DataView(buf);
		const u8 = new Uint8Array(buf);

		let off = 0;
		dv.setUint16(off, nameBytes.length, true); off += 2;
		u8.set(nameBytes, off); off += nameBytes.length;
		dv.setUint32(off, valueLen, true); off += 4;
		if (valueData) u8.set(valueData, off);

		return u8;
	}

	// ============================================================
	// SECTION 7: BLE PACKET CHUNKING
	//
	// Packet header (14 bytes, all little-endian):
	//   ┌─────────────┬───────────────┬────────────┬───────────┬──────────┐
	//   │ command_id  │ total_packets │ packet_id  │ data_size │ data     │
	//   │ 4 bytes     │ 4 bytes       │ 4 bytes    │ 2 bytes   │ ≤168 B   │
	//   └─────────────┴───────────────┴────────────┴───────────┴──────────┘
	// ============================================================

	_createPackets(data, commandId) {
		if (data.length <= AlphAIWebBLE.MAX_PACKET_DATA) {
			return [this._createPacket(commandId, 1, 0, data)];
		}
		const numPkts = Math.ceil(data.length / AlphAIWebBLE.MAX_PACKET_DATA);
		const packets = [];
		for (let i = 0; i < numPkts; i++) {
			const chunk = data.slice(i * AlphAIWebBLE.MAX_PACKET_DATA, (i + 1) * AlphAIWebBLE.MAX_PACKET_DATA);
			packets.push(this._createPacket(commandId, numPkts, i, chunk));
		}
		return packets;
	}

	_createPacket(cmdId, total, pktId, data) {
		const pkt = new Uint8Array(14 + data.length);
		const dv = new DataView(pkt.buffer);
		dv.setUint32(0, cmdId, true);
		dv.setUint32(4, total, true);
		dv.setUint32(8, pktId, true);
		dv.setUint16(12, data.length, true);
		pkt.set(data, 14);
		return pkt;
	}

	// ============================================================
	// SECTION 8: COMMAND QUEUE
	//
	// BLE GATT allows only ONE write at a time. This queue serializes
	// all BLE writes and inserts a 50ms delay between commands.
	// ============================================================

	_enqueueCommand(fn) {
		return new Promise((resolve, reject) => {
			this._cmdQueue.push(async () => {
				try { await fn(); resolve(); }
				catch (e) { reject(e); }
			});
			this._processQueue();
		});
	}

	async _processQueue() {
		if (this._queueProcessing) return;
		this._queueProcessing = true;
		while (this._cmdQueue.length) {
			const fn = this._cmdQueue.shift();
			await fn();
			if (this._cmdQueue.length) await this._sleep(AlphAIWebBLE.PACKET_DELAY_MS);
		}
		this._queueProcessing = false;
	}

	// ============================================================
	// SECTION 9: REPLY HANDLING & PACKET REASSEMBLY
	//
	// Reply packet header (14 bytes, little-endian):
	//   command_id (4), total_packets (4), packet_id (4), data_size (2)
	//
	// Reply message format (after reassembly):
	//   name_length (Uint16 LE), name (UTF-8), value_length (Uint32 LE), value_data
	// ============================================================

	_onReply(event) {
		const raw = new Uint8Array(event.target.value.buffer);

		// Check for robot-initiated disconnect sentinel
		if (
			raw.length === AlphAIWebBLE.DISCONNECTED_MSG.length &&
			raw.every((b, i) => b === AlphAIWebBLE.DISCONNECTED_MSG[i])
		) {
			this._onDisconnected();
			return;
		}

		if (raw.length < 14) {
			InterfaceMonitor.writeConsole('Received packet too small: ' + raw.length + ' bytes', 'interrupt');
			return;
		}

		const view = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
		const commandId = view.getUint32(0, true);
		const totalPackets = view.getUint32(4, true);
		const packetId = view.getUint32(8, true);
		const dataSize = view.getUint16(12, true);
		const data = raw.slice(14, 14 + dataSize);

		if (totalPackets === 1) {
			this._handleCompleteMessage(data);
			return;
		}

		if (!this._pendingPackets.has(commandId)) {
			this._pendingPackets.set(commandId, { total: totalPackets, received: [] });
		}
		const entry = this._pendingPackets.get(commandId);
		entry.received[packetId] = data;

		const receivedCount = entry.received.filter(Boolean).length;
		if (receivedCount === entry.total) {
			const full = this._concatArrays(entry.received);
			this._pendingPackets.delete(commandId);
			this._handleCompleteMessage(full);
		}
	}

	_handleCompleteMessage(data) {
		if (data.length < 6) return;

		const nameLen = data[0] | (data[1] << 8);
		const name = new TextDecoder().decode(data.slice(2, 2 + nameLen));

		const vlOff = 2 + nameLen;
		const valLen = data[vlOff] | (data[vlOff + 1] << 8) | (data[vlOff + 2] << 16) | (data[vlOff + 3] << 24);

		let value = null;
		if (valLen > 0) {
			const valBytes = data.slice(vlOff + 4, vlOff + 4 + valLen);
			try {
				value = JSON.parse(new TextDecoder().decode(valBytes));
			} catch {
				value = new TextDecoder().decode(valBytes);
			}
		}

		if (name === 'print message') {
			if (value.includes('ERROR')) {
				InterfaceMonitor.writeConsole(`⚠️ ${value}`, 'interrupt', false, true, true);
			} else {
				InterfaceMonitor.writeConsole(`🤖 ${value}`, 'neutral');
			}
			return;
		}

		InterfaceMonitor.writeConsole(`Robot reply: "${name}" → ${JSON.stringify(value)}`, 'neutral');
		this._emit('reply', { name, value });
	}

	// ============================================================
	// SECTION 10: DISCONNECT HANDLING & CLEANUP
	// ============================================================

	_onDisconnected() {
		InterfaceMonitor.writeConsole('Disconnected from robot', 'success');
		$("#connected-icon-ble").remove();
		this._cleanup();
	}

	_cleanup() {
		this._device = null;
		this._server = null;
		this._cmdChar = null;
		this._replyChar = null;
		this._connected = false;
		this._pendingPackets.clear();
		this._cmdQueue.length = 0;
		this._queueProcessing = false;
		this._emit('disconnected');
	}

	// ============================================================
	// SECTION 11: UTILITIES
	// ============================================================

	_concatArrays(arrays) {
		const total = arrays.reduce((s, a) => s + a.length, 0);
		const result = new Uint8Array(total);
		let off = 0;
		for (const a of arrays) { result.set(a, off); off += a.length; }
		return result;
	}

	_sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
}

const AlphAiWebBLEAPI = new AlphAIWebBLE();