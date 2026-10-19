async function uploadPythonBLE() {
	if (PrimaStemWebBLEAPI.device === null) {
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
		await PrimaStemWebBLEAPI.connect();
	} catch (e) {
		const err = String(e);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/User cancelled the requestDevice/)) {
			errorNotif.displayNotification(null, jsonPath('User cancelled the requestDevice()'), 'bg-danger');
			PrimaStemWebBLEAPI.device = null;
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnectBLE() {
	if (PrimaStemWebBLEAPI.gattConnected()) {
		await PrimaStemWebBLEAPI.unpair();
	}
};

'use strict';
/**
 * @class PrimaStemWebBLE
 * Pilote le robot PrimaSTEM en Web Bluetooth.
 * Protocole firmware réel : paquet de 9 octets = type(1 octet) + main(uint32 little-endian) + second(uint32 little-endian).
 * Les commandes de déplacement, LED et son sont "bloquantes" côté robot : il notifie
 * "busy" (0x01) puis "free" (0x00) sur la caractéristique d'état. On attend ce cycle
 * (avec un watchdog de sécurité) avant de considérer la commande terminée.
 */
class PrimaStemWebBLE {
	constructor() {
		this.device = null;
		this.server = null;
		this.isConnected = false;

		// UUID réels du firmware PrimaSTEM (voir docs.primastem.com)
		this.serviceUuid = 'bd9e1632-0100-4d63-ad5f-27f115379843';
		this.cmdCharacteristicUuid = 'bd9e1632-0101-4d63-ad5f-27f115379843';   // écriture des commandes
		this.stateCharacteristicUuid = 'bd9e1632-0102-4d63-ad5f-27f115379843'; // notifications busy/free

		this.cmdCharacteristic = null;
		this.stateCharacteristic = null;

		// Codes de commande (cmd.type)
		this.CMD = { MOVE: 0x02, LED: 0x03, SOUND: 0x04, BREAK: 0xFF };

		this.robotBusy = false;
		this.watchdogTimer = null;
		this.WATCHDOG_MS = 15000;    // délai max d'attente du "free" quand on a la notification d'état
		this.NO_FEEDBACK_MS = 3000;  // estimation utilisée si la caractéristique d'état est indisponible

		// Attente interne pour les commandes bloquantes
		this._stepWaiter = null;
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
		// Débloque immédiatement toute commande en attente d'ack plutôt que de laisser
		// le script Python bloqué jusqu'au watchdog (perte de connexion en plein mouvement).
		this._resolveWaiter();
		this.isConnected = false;
		this.robotBusy = false;
		this.device = null;
		this.cmdCharacteristic = null;
		this.stateCharacteristic = null;
	}

	gattConnected() {
		return this.device?.gatt?.connected;
	}

	// Déconnecte le robot connecté
	async unpair() {
		if (this.device) {
			InterfaceMonitor.writeConsole("Unpairing... 🚫", "secondary");
			await this.device.gatt.disconnect();
			this.device = null;
			this.isConnected = false;
		}
	}

	// Notification d'état du robot : 0x00 = free, 0x01 = busy
	handleNotifications(event) {
		const value = event.target.value.getUint8(0);
		this.robotBusy = (value === 0x01);

		if (this._stepWaiter) {
			if (this.robotBusy) {
				this._stepWaiter.sawBusy = true;
			} else if (this._stepWaiter.sawBusy) {
				this._resolveWaiter();
			}
		}
	}

	_armWatchdog() {
		this._clearWatchdog();
		// Si le firmware ne notifie pas son état, on ne peut pas attendre 15s à chaque
		// commande : on retombe sur un délai estimé, comme dans index.html (NO_FB_MS).
		const timeout = this.stateCharacteristic ? this.WATCHDOG_MS : this.NO_FEEDBACK_MS;
		this.watchdogTimer = setTimeout(() => {
			this.watchdogTimer = null;
			this.robotBusy = false;
			if (this.stateCharacteristic) {
				console.warn('Watchdog BLE : aucun statut "free" reçu, déblocage forcé.');
			}
			this._resolveWaiter();
		}, timeout);
	}

	_clearWatchdog() {
		if (this.watchdogTimer) {
			clearTimeout(this.watchdogTimer);
			this.watchdogTimer = null;
		}
	}

	_resolveWaiter() {
		if (!this._stepWaiter) return;
		const w = this._stepWaiter;
		this._stepWaiter = null;
		this._clearWatchdog();
		w.resolve();
	}

	// Connexion au robot (nom BLE préfixé "ROBOT")
	async connect() {
		try {
			InterfaceMonitor.writeConsole('Requesting Bluetooth Device...');
			this.device = await navigator.bluetooth.requestDevice({
				filters: [{ namePrefix: "ROBOT" }],
				optionalServices: [this.serviceUuid]
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

			this.cmdCharacteristic = await service.getCharacteristic(this.cmdCharacteristicUuid);

			try {
				this.stateCharacteristic = await service.getCharacteristic(this.stateCharacteristicUuid);
				await this.stateCharacteristic.startNotifications();
				this.stateCharacteristic.addEventListener('characteristicvaluechanged', this.handleNotifications.bind(this));
			} catch (e) {
				console.warn('Caractéristique d\'état introuvable — pas de retour busy/free.');
				this.stateCharacteristic = null;
			}

			this.isConnected = true;
			InterfaceMonitor.writeConsole('Connected to PrimaSTEM robot');
		} catch (error) {
			console.error('Failed to connect', error);
			this.isConnected = false;
			throw error;
		}
	}

	// Construit un paquet de 9 octets : type(1) + main(uint32 LE) + second(uint32 LE)
	_buildPacket(type, main, second) {
		const buf = new ArrayBuffer(9);
		const dv = new DataView(buf);
		dv.setUint8(0, type);
		dv.setUint32(1, main >>> 0, true);
		dv.setUint32(5, second >>> 0, true);
		return buf;
	}

	async _write(buf) {
		if (!this.cmdCharacteristic) {
			console.error('Command characteristic not available');
			return false;
		}
		try {
			if (this.cmdCharacteristic.writeValueWithResponse) {
				await this.cmdCharacteristic.writeValueWithResponse(buf);
			} else {
				await this.cmdCharacteristic.writeValue(buf);
			}
			return true;
		} catch (error) {
			console.error('Failed to send command', error);
			return false;
		}
	}

	// Envoie une commande bloquante et attend la fin d'exécution du robot (busy -> free, ou watchdog)
	_sendBlocking(type, main, second) {
		return new Promise(async (resolve) => {
			const w = { sawBusy: false, resolve };
			this._stepWaiter = w;
			this._armWatchdog();
			// Seules les commandes bloquantes suspendent le script : waitBleAckAndPlay le relance à l'ack
			Simulator.pause();

			const ok = await this._write(this._buildPacket(type, main, second));
			if (!ok && this._stepWaiter === w) {
				this._resolveWaiter();
			}
		});
	}

	_clampU32(n) {
		n = Math.floor(Number(n));
		if (!isFinite(n) || n < 0) n = 0;
		if (n > 4294967295) n = 4294967295;
		return n;
	}

	/* ===================== Déplacement ===================== */

	// Avance de `distanceMm` millimètres
	async forward(distanceMm) {
		return this._sendBlocking(this.CMD.MOVE, 'f'.charCodeAt(0), this._clampU32(distanceMm));
	}

	// Recule de `distanceMm` millimètres
	async backward(distanceMm) {
		return this._sendBlocking(this.CMD.MOVE, 'b'.charCodeAt(0), this._clampU32(distanceMm));
	}

	// Pivote à gauche de `angleDeg` degrés
	async turnLeft(angleDeg) {
		return this._sendBlocking(this.CMD.MOVE, 'l'.charCodeAt(0), this._clampU32(angleDeg));
	}

	// Pivote à droite de `angleDeg` degrés
	async turnRight(angleDeg) {
		return this._sendBlocking(this.CMD.MOVE, 'r'.charCodeAt(0), this._clampU32(angleDeg));
	}

	// Arrêt immédiat (non bloquant, débloque aussi toute commande en attente)
	async stop() {
		this._resolveWaiter();
		return this._write(this._buildPacket(this.CMD.BREAK, 0, 0));
	}

	// Arrêt du programme côté simulateur (stop/replay) : stoppe le robot et abandonne
	// l'ack en attente SANS le résoudre, sinon waitBleAckAndPlay relancerait l'ancien script.
	abort() {
		if (!this.isConnected) return;
		this._stepWaiter = null;
		this._clearWatchdog();
		this._write(this._buildPacket(this.CMD.BREAK, 0, 0));
	}

	/* ===================== LEDs ===================== */

	/**
	 * Allume une ou deux LED dans une couleur donnée.
	 * @param {'l'|'r'|'b'} diode gauche | droite | les deux
	 * @param {'r'|'g'|'b'} color rouge | vert | bleu
	 */
	async setLed(diode, color) {
		const d = String(diode).toLowerCase().charAt(0);
		const c = String(color).toLowerCase().charAt(0);
		return this._sendBlocking(this.CMD.LED, d.charCodeAt(0), c.charCodeAt(0));
	}

	/* ===================== Son ===================== */

	// Joue /spiffs/x{NNN}.mp3 — index entre 0 et 998
	async playSound(index) {
		const idx = Math.max(0, Math.min(998, Math.floor(Number(index) || 0)));
		return this._sendBlocking(this.CMD.SOUND, idx, 0);
	}
}

const PrimaStemWebBLEAPI = new PrimaStemWebBLE();