
const CYBERPI_UART_SERVICE_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb';
const CYBERPI_UART_CHARACTERISTIC_RX = '0000ffe2-0000-1000-8000-00805f9b34fb';
const CYBERPI_UART_CHARACTERISTIC_TX = '0000ffe3-0000-1000-8000-00805f9b34fb';

function onGATTconnected() {
	InterfaceMonitor.writeConsole(jsonPath('code.WebBluetoothAPI.gattConnected'), 'success', false, true);
	$("#execution-buttons-panel").append('<i id="connected-icon-ble" class="fa-brands fa-bluetooth"></i>');
	$("#disconnect-opt-ble").show();
};

function onGATTdisconnected() {
	toggleUploadProgress(false);
	if (typeof window !== 'undefined' && !window.__vittaInterfaceSlug) {
		$("#disconnect-opt-ble").hide();
	}
	$("#connected-icon-ble").remove();
	InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
	InterfaceMonitor.writeConsole(jsonPath('code.WebBluetoothAPI.BLEclosed'), 'success', false, true);
	InterfaceMonitor.writeConsole(' \n');
};

const WebBLEAPI = new WebBLE([CYBERPI_UART_SERVICE_UUID], onGATTconnected, onGATTdisconnected);

document.getElementById('serial-send').addEventListener('click', function () {
	if (!Simulator.isOpen && !InterfaceConnection.serial.isConnected && WebBLEAPI.gattConnected()) {
		sendBLECommand();
	}
});

async function connectBoardBLE() {
	if ($("#simulator").is(":visible")) {
		toggleSimulator();
	}
	InterfaceMonitor.setup();
	await doConnectBLE();
};

async function doConnectBLE() {
	try {
		await WebBLEAPI.requestDevice();
		if (!WebBLEAPI._bluetoothAPIDetected) {
			return InterfaceMonitor.writeConsole(jsonPath('code.WebBluetoothAPI.noWebBluetoothAPI'), 'interrupt');
		}
		await WebBLEAPI.connectToGATT();
		if (!WebBLEAPI.gattConnected()) {
			return;
		}
		await WebBLEAPI.getServiceCharacteristics(CYBERPI_UART_SERVICE_UUID);
		if (WebBLEAPI._services[CYBERPI_UART_SERVICE_UUID]) {
			WebBLEAPI.setWriteCharacteristic(CYBERPI_UART_CHARACTERISTIC_TX);
			WebBLEAPI.setReadCharacteristic(CYBERPI_UART_CHARACTERISTIC_RX);
			WebBLEAPI._controller = new HalocodeController(WebBLEAPI);
			await WebBLEAPI.reading('notify');
		}
	} catch (e) {
		const err = String(e);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/User cancelled the requestDevice/)) {
			errorNotif.displayNotification(null, jsonPath('User cancelled the requestDevice()'), 'bg-danger');
			WebBLEAPI.reset();
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnectBLE() {
	if (WebBLEAPI.gattConnected()) {
		WebBLEAPI.hasToClose = true;
		await WebBLEAPI.unpair();
	}
};

async function uploadPythonBLE() {
	const mainCode = CodeManager.getSharedInstance().getCode();
	// Global progress is computed on the total size of every uploaded file
	let totalSize = 0;
	let sentSize = 0;
	const uploadFile = async function (filename, code) {
		const uploader = new HalocodeUpload();
		uploader.setFile(code, filename);
		const payloads = uploader.generatePayloads();
		WebBLEAPI.filename = filename;
		WebBLEAPI.percent = Math.round(sentSize / totalSize * 100);
		WebBLEAPI._controller.online = false;
		await WebBLEAPI.write(payloads[0]);
		await waitForUpload(_ => WebBLEAPI._controller.online === true);
		for (var i = 1; i < payloads.length; i++) {
			WebBLEAPI._controller.payloadWritted = false;
			const chunks = WebBLE.chunk(payloads[i], 40);
			if (chunks !== null) {
				for (var j = 0; j < chunks.length; j++) {
					await WebBLEAPI.write(chunks[j]);
				}
				WebBLEAPI.percent = Math.round((sentSize + code.length * i / (payloads.length - 1)) / totalSize * 100);
				await waitForUpload(_ => WebBLEAPI._controller.payloadWritted === true);
			}
		}
		sentSize += code.length;
	};
	const config = async function () {
		WebBLEAPI._controller.restarted = false;
		const pack = HalocodePackData.goto_repl();
		await WebBLEAPI.write(pack.to_buffer());
		await sendScriptCommandBLE("try:\n    import config\nexcept:\n    pass", TYPE_RUN_WITH_CONFIG, true);
		await sendScriptCommandBLE("try:\n    config.write_config(\"repl_enable\", False)\nexcept:\n    pass", TYPE_RUN_WITH_CONFIG);
		await waitForUpload(_ => WebBLEAPI._controller.restarted === true);
	};
	const upload = async function () {
		let files = "[";
		for (const i in VittaInterface.externalLibraries) {
			files += '\'' + i + '.py\','
		}
		// Boot file to remove unused files
		const bootCode = "import os, cyberpi, time\ncyberpi.console.print('Uploading...')\ntime.sleep(0.5)\nfiles = " + files + "]\nfor f in files:\n\tif f in os.listdir():os.remove('/flash/' + f)\nprint(os.listdir())\ntime.sleep(0.5)\n";
		// Dependencies requested in user main
		const libFiles = [];
		for (const lib of _getRequestedLibrariesBLE(mainCode)) {
			libFiles.push(lib);
			if (lib.filename === 'vitta_server.py') {
				libFiles.push({ filename: 'vitta_script.js', code: Blockly.Python.convertObjectInLists(Blockly.Python.jsCodes_).join("\n") });
				libFiles.push({ filename: 'vitta_style.css', code: Blockly.Python.convertObjectInLists(Blockly.Python.cssStyles_).join("\n") });
			}
		}
		totalSize = bootCode.length + mainCode.length + libFiles.reduce((size, f) => size + f.code.length, 0);
		sentSize = 0;
		WebBLEAPI._controller.restarted = false;
		toggleUploadProgress(true);
		try {
			await uploadFile('main.py', bootCode);
			await config();
			await new Promise(resolve => setTimeout(resolve, 1000));
			for (const lib of libFiles) {
				await uploadFile(lib.filename, lib.code);
			}
			await uploadFile('main.py', mainCode);
			await config();
			toggleUploadProgress(false);
		} catch (e) {
			console.error(e);
			toggleUploadProgress(false);
			InterfaceMonitor.writeConsole('code.WebBluetoothAPI.badResponse', 'warning');
			return;
		}
		WebBLEAPI.isDownloading = true;
	}
	if (WebBLEAPI.gattConnected()) {
		await upload();
	} else {
		await connectBoardBLE();
		if (WebBLEAPI.gattConnected()) {
			await upload();
		} else {
			InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForDownload', 'warning');
		}

	}
};

function _getRequestedLibrariesBLE(code, libName) {
	const cutomLibraries = VittaInterface.externalLibraries;
	let requestedLibs = new Array();
	for (var lib in cutomLibraries) {
		if (libName !== lib) {
			const regExp1 = new RegExp('from ' + lib + ' import');
			const regExp2 = new RegExp('import ' + lib);
			if (regExp1.test(code) || regExp2.test(code)) {
				requestedLibs.push({
					filename: lib + ".py",
					code: cutomLibraries[lib]
				});
				const requestedDependencies = _getRequestedLibrariesBLE(cutomLibraries[lib], lib);
				requestedLibs = requestedLibs.concat(requestedDependencies);
			}
		}
	}
	return requestedLibs;
};

async function sendScriptCommandBLE(cmd, mode = TYPE_RUN_WITH_RESPONSE, waiting = false) {
	if (WebBLEAPI.gattConnected()) {
		const pack = new HalocodePackData();
		pack.type(TYPE_SCRIPT);
		pack.mode(mode);
		pack.script(cmd);
		if (mode == TYPE_RUN_WITH_RESPONSE || waiting) {
			WebBLEAPI._controller.waitingScript = true;
		}
		const chunks = WebBLE.chunk(pack.to_buffer(), 20);
		if (chunks !== null) {
			for (var j = 0; j < chunks.length; j++) {
				await WebBLEAPI.write(chunks[j]);
			}
		}
		InterfaceMonitor.writeConsole("</br>> " + cmd, 'default', false, true);
		if (mode == TYPE_RUN_WITH_RESPONSE || waiting) {
			await waitFor(_ => WebBLEAPI._controller.waitingScript === false);
		}
	}
};

async function sendBLECommand() {
	const checkResponseAndSend = async function () {
		const command = $('#serial-input').val();
		if ((/(cyberpi.|)config.write_config/.test(command) && /repl_enable/.test(command)) || /(cyberpi.|)restart\(\)/.test(command) || (/exec\(/.test(command) && /main1/.test(command))) {
			await sendScriptCommandBLE(command, TYPE_RUN_WITHOUT_RESPONSE);
		} else {
			await sendScriptCommandBLE(command, TYPE_RUN_WITH_RESPONSE);
		}
		InterfaceMonitor.history.push(command);
		$('#serial-input').val("");
	};
	if (!WebBLEAPI.gattConnected()) {
		await doConnectBLE();
	}
	if (WebBLEAPI.gattConnected()) {
		await checkResponseAndSend();
	}
};
