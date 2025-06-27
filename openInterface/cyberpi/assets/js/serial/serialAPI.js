document.getElementById('serial-send').addEventListener('click', async function () {
	if (!Simulator.isOpen && !WebBLEAPI.isConnected) {
		if (SerialAPI.isConnected) {
			await sendSerialCommand();
		} else {
			await connectBoard();
			await sendSerialCommand();
		}
	}
});

function setupMonitor() {
	if ($('#monitor').hasClass('monitor-closed')) {
		InterfaceMonitor.toggle();
	}
	if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
		InterfaceMonitor.managePanel('console');
	}
};

async function connectBoard() {
	if ($("#simulator").is(":visible")) {
		toggleSimulator();
	}
	setupMonitor();
	if (navigator.serial && !SerialAPI.isConnected) {
		await doConnect();
	}
};

async function doConnect() {
	try {
		await SerialAPI.open(callbackError);
		console.log(await SerialAPI.getInfo());
		console.log(await SerialAPI.getSignals());
		console.log(SerialAPI.port);
		SerialAPI._controller = new HalocodeController(SerialAPI);
		SerialAPI._controller.readingLoop();
		InterfaceMonitor.writeConsole('code.serialAPI.boardConnected', 'success', false, true);
		$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
		$("#disconnect-opt").show();
	} catch (e) {
		const err = String(e);
		console.error(err);
		const errorNotif = new VittaNotif(5);
		if (err.match(/No port selected by the user/)) {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.noPortSelected'), 'bg-danger');
			SerialAPI.reset();
			$("#connected-icon").remove();
		} else if (err.match(/Failed to open serial port/)) {
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning');
			SerialAPI.reset();
			$("#connected-icon").remove();
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnect() {
	if (SerialAPI.port !== null) {
		SerialAPI._controller.hasToClose = true;
		await sendScriptCommand('get_bri()');
		await SerialAPI.close();
		$("#disconnect-opt").hide();
		$("#connected-icon").remove();
		InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
		InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success', false, true);
		InterfaceMonitor.writeConsole(' \n');
		if (SerialAPI._controller) {
			SerialAPI._controller = null;
		}
	}
};

async function uploadPython() {
	const mainCode = CodeManager.getSharedInstance().getCode();
	const uploadFile = async function (filename, code) {
		const uploader = new HalocodeUpload();
		uploader.setFile(code, filename);
		const payloads = uploader.generatePayloads();
		SerialAPI.percent = 0;
		SerialAPI.filename = filename;
		SerialAPI._controller.online = false;
		await SerialAPI.write(new Uint8Array(payloads[0]));
		await waitFor(_ => SerialAPI._controller.online === true);
		for (var i = 1; i < payloads.length; i++) {
			SerialAPI._controller.payloadWritted = false;
			SerialAPI.percent = Math.round(i / (payloads.length - 1) * 100);
			await SerialAPI.write(new Uint8Array(payloads[i]));
			await waitFor(_ => SerialAPI._controller.payloadWritted === true);
		}
	};
	const config = async function () {
		SerialAPI._controller.restarted = false;
		const pack = HalocodePackData.goto_repl();
		await SerialAPI.write(new Uint8Array(pack.to_buffer()));
		await sendScriptCommand("try:\n    import config\nexcept:\n    pass", TYPE_RUN_WITH_CONFIG);
		await sendScriptCommand("try:\n    config.write_config(\"repl_enable\", False)\nexcept:\n    pass", TYPE_RUN_WITH_CONFIG);
		await waitFor(_ => SerialAPI._controller.restarted === true);
	};
	const upload = async function () { 
		// get requested libraries in user main
		const requestedLib = this._getRequestedLibraries(mainCode);
		let files = "[";
		for (const i in VittaInterface.externalLibraries) {
			files += '\'' + i + '.py\','
		}
		// Write boot file to remove unused files
		await uploadFile('main.py', "import os, cyberpi, time\ncyberpi.console.print('Uploading...')\ntime.sleep(0.5)\nfiles = " + files + "\nfor f in files:\n\tif f in os.listdir():os.remove('/flash/' + f)\nprint(os.listdir())\ntime.sleep(0.5)");
		await config();
		setTimeout(async function () {
			// Write dependencies
			for (var i = 0; i < requestedLib.length; i++) {
				await uploadFile(requestedLib[i].filename, requestedLib[i].code);
				if (requestedLib[i].filename === 'vitta_server.py') {
					await uploadFile('vitta_script.js', Blockly.Python.convertObjectInLists(Blockly.Python.jsCodes_).join("\n"));
					await uploadFile('vitta_style.css', Blockly.Python.convertObjectInLists(Blockly.Python.cssStyles_).join("\n"));
				}
			}
			SerialAPI.isDownloading = true;
			// Write main file
			SerialAPI._controller.restarted = false;
			await uploadFile('main.py', mainCode);
			await config();
			InterfaceMonitor.writeConsole('</br>' + jsonPath('code.serialAPI.fileDownloaded'), 'success', false, true);
			//} else if (/\@event.start/.test(mainCode)) {
			// 	await sendScriptCommand("config.write_config(\"repl_enable\", False)", false);
			// }
		}, 1000);
	};
	setupMonitor();
	if (SerialAPI.isConnected) {
		await upload();
	} else {
		await connectBoard();
		if (SerialAPI.isConnected) {
			await upload();
		} else {
			InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForDownload', 'warning');
		}
	}
};

function _getRequestedLibraries(code, libName) {
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
				const requestedDependencies = this._getRequestedLibraries(cutomLibraries[lib], lib);
				requestedLibs = requestedLibs.concat(requestedDependencies);
			}
		}
	}
	return requestedLibs;
};

async function sendScriptCommand(cmd, mode = TYPE_RUN_WITH_RESPONSE) {
	const pack = new HalocodePackData();
	pack.type(TYPE_SCRIPT);
	pack.mode(mode);
	pack.script(cmd);
	SerialAPI._controller.waitingScript = true;
	await SerialAPI.write(new Uint8Array(pack.to_buffer()));
	InterfaceMonitor.writeConsole("</br>> " + cmd, 'default', false, true);
	await waitFor(_ => SerialAPI._controller.waitingScript === false);
};

function callbackError(error) {
	if (error.match(/(DOMException|ParityError|BufferOverrunError): A ((framing|parity) error|buffer overrun) has been detected\./)) {
		SerialAPI.dataReceived = SerialAPI._loop_reader(callbackError);
	} else if (error.match(/(DOMException|BreakError): A break condition has been detected\./)) {
		console.log('Please refresh page.')
	} else if (error.match(/(DOMException|NetworkError): The device has been lost\./)) {
		InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
		SerialAPI.reset();
		$("#disconnect-opt").hide();
		$("#connected-icon").remove();
	}
};

async function sendSerialCommand() {
	if (SerialAPI.isConnected) {
		const command = $('#serial-input').val();
		if ((/(cyberpi.|)config.write_config/.test(command) && /repl_enable/.test(command)) || /(cyberpi.|)restart\(\)/.test(command)) {
			await sendScriptCommand(command, TYPE_RUN_WITHOUT_RESPONSE);
		} else {
			await sendScriptCommand(command);
		}		
		InterfaceMonitor.history.push(command);
		$('#serial-input').val("");
	} else {
		InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForDownload', 'warning');
	}
};


/**
 * This function records all the pressed keys in the array `pressedKeys`
 * @param {DOM} e the DOM keypress element (document in this case)
 */
function multipleKeyPress(e) {
	if (!SerialAPI.pressedKeys.includes(e.key)) {
		SerialAPI.pressedKeys.push(e.key);
	}
};