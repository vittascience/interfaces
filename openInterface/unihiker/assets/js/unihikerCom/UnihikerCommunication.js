/**
 * Communication with the UNIHIKER M10: the programs are run by the Vittascience server of the board
 * (assets/unihiker-api/vittascience_server.py, port 8765), installed once from the Home menu of the board after its
 * upload with the file upload route of the board (port 80). The board is at 10.1.2.3 through USB, else at its Wi-Fi
 * address. The requests to the local network need the permission of the browser (Chrome: local network access).
 */
const UnihikerCommunication = {
	DEFAULT_HOST: '10.1.2.3',
	SERVER_PORT: 8765,
	// version of assets/unihiker-api/vittascience_server.py: an older server is installed again
	SERVER_VERSION: 3,
	API_PATH: '/openInterface/unihiker/assets/unihiker-api/',
	// Python libraries sent with the programs that import them (in assets/lib): Vittascience AI, drivers of the modules
	// without PinPong driver on the board
	LIB_PATH: '/openInterface/unihiker/assets/lib/',
	LIBRARIES: ['vitta_ai', 'unihiker_sgp30', 'unihiker_scd30', 'unihiker_hm330x', 'unihiker_hp206c', 'unihiker_gas', 'unihiker_gas_gmxxx',
		'unihiker_si1145', 'unihiker_si1151', 'unihiker_th02', 'unihiker_tm1637', 'unihiker_my9221', 'unihiker_water_level',
		'unihiker_pcf85063tp', 'unihiker_ht16k33', 'unihiker_ht16k33matrix', 'unihiker_mfrc522', 'unihiker_lcd_i2c',
		'unihiker_rgb_led_matrix', 'unihiker_veml6040', 'unihiker_fingerprint', 'unihiker_rfid_reader', 'unihiker_rekabit',
		'unihiker_stepper', 'unihiker_dfr0548'],
	INSTALL_FOLDER: 'vittascience-install',
	// Update of an installed server (older version): run by the server itself (as root), it writes the new server and
	// restarts the service (--no-block: the restart stops this program too)
	UPDATER: `import subprocess
with open("/opt/vittascience/vittascience_server.py", "w") as f:
  f.write(SERVER_CODE)
print("Vittascience server updated")
subprocess.Popen(["systemctl", "restart", "--no-block", "vittascience"])
`,
	UPDATE_TIMEOUT: 30000,
	POLL_PERIOD: 300,
	_pollTimer: null,
	// time left to the user to run install.py on the board
	INSTALL_TIMEOUT: 10 * 60 * 1000,
	_installTimer: null,
	_nextLine: 0,

	init: function () {
		this.host = this.getHost();
		if (!IS_UNIHIKER_K10) {
			// M10: no serial port (no baud rate), the messages of the console go to the program through the server
			$('#baud').closest('.dropdown-item').hide();
			// (Enter clicks the send button: InterfaceMonitor)
			$('#serial-send').off('click').on('click', () => this.sendInput());
		}
	},

	/**
	 * Address of the board, kept in the browser.
	 * @returns {string}
	 */
	getHost: function () {
		try {
			return localStorage.getItem('unihikerHost') || this.DEFAULT_HOST;
		} catch (e) {
			return this.DEFAULT_HOST;
		}
	},

	/**
	 * Ask the address of the board (10.1.2.3 through USB, its Wi-Fi address otherwise).
	 */
	changeHost: function () {
		const host = prompt(i18next.t('code.unihiker.hostPrompt'), this.getHost());
		if (host === null) return;
		this.host = host.trim() || this.DEFAULT_HOST;
		try {
			localStorage.setItem('unihikerHost', this.host);
		} catch (e) { }
		this.write(i18next.t('code.unihiker.hostSaved', { host: this.host }), 'success');
	},

	write: function (message, color = 'neutral') {
		InterfaceMonitor.writeConsole('[UNIHIKER] ' + message, color, true, true);
	},

	// Requests to the local network: Chrome asks the permission of the user, no mixed content block
	request: function (url, options = {}) {
		return fetch(url, { ...options, targetAddressSpace: 'local' });
	},

	serverRequest: async function (route, data) {
		const options = data === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
		const response = await this.request(`http://${this.host}:${this.SERVER_PORT}/${route}`, options);
		if (!response.ok) throw new Error('HTTP ' + response.status);
		return response.json();
	},

	/**
	 * Run the program of the interface on the board, its output goes to the console.
	 */
	uploadPython: async function () {
		// UNIHIKER K10: main.py written on the board through the serial port (MicroPython)
		if (IS_UNIHIKER_K10) return InterfaceConnection.uploadPython();
		clearInterval(this._installTimer);
		this.host = this.getHost();
		const code = CodeManager.getSharedInstance().getCode();
		let files;
		try {
			files = await this.programFiles(code);
		} catch (error) {
			return this.write(error.message, 'warning');
		}
		this.write(i18next.t('code.unihiker.sending', { host: this.host }));
		try {
			const status = await this.serverRequest('status');
			if (!(status.version >= this.SERVER_VERSION)) {
				this.write(i18next.t('code.unihiker.outdated'), 'warning');
				return this.updateServer();
			}
			await this.serverRequest('run', { code, files });
		} catch (error) {
			return this.serverUnreachable();
		}
		this.write(i18next.t('code.unihiker.started'), 'success');
		this.followOutput();
	},

	/**
	 * Files sent with the program (base64 by name): the libraries it imports (LIBRARIES, with the ones they import) and
	 * the files of the image model of ImageModel("local") (model of the AI tool of this browser) or
	 * ImageModel("<link of a Vittascience model>").
	 * @param {string} code
	 * @returns {Promise<Object>}
	 */
	programFiles: async function (code) {
		const files = {};
		const base64 = async (blob) => {
			const bytes = new Uint8Array(await blob.arrayBuffer());
			let binary = '';
			for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
			return btoa(binary);
		};
		const sources = [code];
		while (sources.length) {
			for (const [, from, imported] of sources.pop().matchAll(/^\s*(?:from\s+(\w+)|import\s+(\w+))/gm)) {
				const name = from || imported;
				if (!this.LIBRARIES.includes(name) || files[name + '.py']) continue;
				const library = await (await fetch(this.LIB_PATH + name + '.py', { cache: 'no-store' })).text();
				files[name + '.py'] = await base64(new Blob([library]));
				sources.push(library);
			}
		}
		const model = code.match(/ImageModel\(\s*["']([^"']*)["']\s*\)/);
		if (model) {
			const [modelJson, weights, metadata] = model[1] === 'local' ? await this.readLocalImageModel() : await this.readLinkImageModel(model[1]);
			files['image_model.json'] = await base64(new Blob([modelJson]));
			files['image_model.weights.bin'] = await base64(weights);
			files['image_metadata.json'] = await base64(new Blob([metadata]));
		}
		return files;
	},

	/**
	 * Image model trained in the Vittascience AI tool of this browser: TensorFlow.js saves it in IndexedDB and its
	 * metadata (labels) in localStorage.
	 * @returns {Promise<Array>} model.json (text), weights (Blob), metadata.json (text)
	 */
	readLocalImageModel: async function () {
		const metadata = localStorage.getItem('modelMetadata');
		const artifacts = await new Promise((resolve, reject) => {
			const request = indexedDB.open('tensorflowjs');
			// No model saved yet: don't create an empty database, TensorFlow.js creates its stores on creation only
			request.onupgradeneeded = () => request.transaction.abort();
			request.onerror = () => request.error && request.error.name === 'AbortError' ? resolve(null) : reject(request.error);
			request.onsuccess = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains('models_store')) {
					db.close();
					return resolve(null);
				}
				const get = db.transaction('models_store', 'readonly').objectStore('models_store').get('vittascience-image-model');
				get.onerror = () => reject(get.error);
				get.onsuccess = () => {
					db.close();
					resolve(get.result ? get.result.modelArtifacts : null);
				};
			};
		});
		if (!artifacts || !metadata) {
			throw new Error(i18next.t('code.unihiker.localModelMissing'));
		}
		const modelJson = {
			modelTopology: artifacts.modelTopology,
			format: artifacts.format,
			weightsManifest: [{ paths: ['model.weights.bin'], weights: artifacts.weightSpecs }]
		};
		// Recent TensorFlow.js versions may store the weights as several buffers
		return [JSON.stringify(modelJson), new Blob([].concat(artifacts.weightData)), metadata];
	},

	/**
	 * Image model shared by a link of the Vittascience AI tool (.../ia/model/<id>/), read from this site.
	 * @param {string} link
	 * @returns {Promise<Array>} model.json (text), weights (Blob), metadata.json (text)
	 */
	readLinkImageModel: async function (link) {
		const id = (link.match(/\/ia\/model\/([a-zA-Z0-9]+)/) || link.match(/[?&]link=([a-zA-Z0-9]+)/) || [])[1];
		if (!id) {
			throw new Error(i18next.t('code.unihiker.modelLinkInvalid', { link }));
		}
		const base = `${location.origin}/ia/model/${id}/`;
		try {
			const modelJson = await (await fetch(base + 'model.json')).text();
			const weightsPath = JSON.parse(modelJson).weightsManifest[0].paths[0].replace(/^\.\//, '');
			const weights = await (await fetch(base + weightsPath)).blob();
			const metadata = await (await fetch(base + 'metadata.json')).text();
			JSON.parse(metadata);
			return [modelJson, weights, metadata];
		} catch (error) {
			throw new Error(i18next.t('code.unihiker.modelLinkInvalid', { link }));
		}
	},

	/**
	 * Send the text of the console input to the program running on the board (its standard input).
	 */
	sendInput: async function () {
		const text = $('#serial-input').val();
		if (!text) return;
		$('#serial-input').val('');
		InterfaceMonitor.history?.push(text);
		try {
			if (!(await this.serverRequest('input', { text })).sent) {
				this.write(i18next.t('code.unihiker.noProgram'), 'warning');
			}
		} catch (error) {
			this.serverUnreachable();
		}
	},

	/**
	 * Stop the program running on the board.
	 */
	stopProgram: async function () {
		try {
			await this.serverRequest('stop', {});
			this.write(i18next.t('code.unihiker.stopped'), 'warning');
		} catch (error) {
			this.serverUnreachable();
		}
	},

	/**
	 * Show the output of the program (new lines every POLL_PERIOD ms) until it ends.
	 */
	followOutput: function () {
		clearTimeout(this._pollTimer);
		this._nextLine = null;
		const poll = async () => {
			let data;
			try {
				data = await this.serverRequest('output?from=' + (this._nextLine ?? 0));
			} catch (error) {
				return;
			}
			// the first request gives the start of the new program
			if (this._nextLine === null) {
				this._nextLine = data.next - data.lines.length;
			}
			for (const line of data.lines) {
				InterfaceMonitor.writeConsole(this.escape(line), /Error|Traceback/.test(line) ? 'warning' : 'default', true);
				// graph and music modes of the console, as with a serial port
				const value = parseFloat(line);
				const graph = !isNaN(value) ? '@Graph:Console:' + value + '|' : /^@Graph:/.test(line) ? line : null;
				if (graph !== null) InterfaceMonitor.sendDataToChart(graph);
				InterfaceMonitor.playMusicMessage(line);
			}
			this._nextLine = data.next;
			if (data.running) {
				this._pollTimer = setTimeout(poll, this.POLL_PERIOD);
			} else if (data.exitCode !== null) {
				this.write(i18next.t('code.unihiker.finished', { code: data.exitCode }), data.exitCode === 0 ? 'success' : 'warning');
			}
		};
		poll();
	},

	escape: function (text) {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	},

	/**
	 * The Vittascience server doesn't answer: if the board answers, the server is installed on it, else the user
	 * checks the connection.
	 */
	serverUnreachable: async function () {
		let boardAnswers = false;
		try {
			boardAnswers = (await this.request(`http://${this.host}/wifi/status`)).ok;
		} catch (e) { }
		if (!boardAnswers) {
			return this.write(i18next.t('code.unihiker.unreachable', { host: this.host }), 'warning');
		}
		this.write(i18next.t('code.unihiker.notInstalled'), 'warning');
		await this.installServer();
	},

	/**
	 * Upload the installer and the server to /root/vittascience-install with the file upload route of the board:
	 * the user runs install.py once from the Home menu of the board.
	 */
	installServer: async function () {
		this.host = this.getHost();
		try {
			for (const name of ['install.py', 'vittascience_server.py']) {
				const content = await (await fetch(this.API_PATH + name, { cache: 'no-store' })).blob();
				const form = new FormData();
				form.append('file', new File([content], name));
				form.append('folder', this.INSTALL_FOLDER);
				const response = await this.request(`http://${this.host}/uploadLabel`, { method: 'POST', body: form });
				if ((await response.json()).status !== 'uploaded') throw new Error('upload ' + name);
			}
		} catch (error) {
			console.error(error);
			return this.write(i18next.t('code.unihiker.installFailed', { host: this.host }), 'warning');
		}
		this.write(i18next.t('code.unihiker.installUploaded', { folder: this.INSTALL_FOLDER }), 'success');
		this.waitInstall();
	},

	/**
	 * Wait for the user to run install.py on the board, then upload the program again.
	 */
	updateServer: async function () {
		try {
			const server = await (await fetch(this.API_PATH + 'vittascience_server.py', { cache: 'no-store' })).text();
			await this.serverRequest('run', { code: this.UPDATER.replace('SERVER_CODE', JSON.stringify(server)), files: {} });
		} catch (error) {
			return this.installServer();
		}
		this.waitInstall();
		// not updated (server without systemd service...): installer run from the Home menu of the board
		setTimeout(async () => {
			try {
				if ((await this.serverRequest('status')).version >= this.SERVER_VERSION) return;
			} catch (e) { }
			this.installServer();
		}, this.UPDATE_TIMEOUT);
	},

	/**
	 * UNIHIKER K10 just flashed: the firmware image of DFRobot leaves data in the "vfs" partition, MicroPython loops
	 * at its start ("The filesystem appears to be corrupted"). After the agreement of the user, the partition is
	 * formatted (LittleFS, as MicroPython does on a blank flash) and the board starts again.
	 * @param {MicropythonRepl} repl
	 */
	formatK10: async function (repl) {
		if (this._formatAsked) return;
		this._formatAsked = true;
		if (!confirm(i18next.t('code.unihiker.k10FormatConfirm'))) {
			this._formatAsked = false;
			return;
		}
		// stop the loop of the start, then format in the REPL
		await repl.write('\r\x03\x03');
		await new Promise(resolve => setTimeout(resolve, 800));
		await repl.write("import vfs, flashbdev, machine; vfs.VfsLfs2.mkfs(flashbdev.bdev); vfs.mount(vfs.VfsLfs2(flashbdev.bdev), '/'); "
			+ "open('/boot.py', 'w').write('# This file is executed on every boot (including wake-boot from deepsleep)\\n'); machine.reset()\r");
		this.write(i18next.t('code.unihiker.k10Formatted'), 'success');
		setTimeout(() => { this._formatAsked = false; }, 10000);
	},

	waitInstall: function () {
		clearInterval(this._installTimer);
		const end = Date.now() + this.INSTALL_TIMEOUT;
		this._installTimer = setInterval(async () => {
			if (Date.now() > end) return clearInterval(this._installTimer);
			try {
				if (!((await this.serverRequest('status')).version >= this.SERVER_VERSION)) return;
			} catch (e) {
				return;
			}
			clearInterval(this._installTimer);
			this.write(i18next.t('code.unihiker.installDone'), 'success');
			this.uploadPython();
		}, 2000);
	}
};
