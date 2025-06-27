function setupMonitor() {
	if ($('#monitor').hasClass('monitor-closed')) {
		InterfaceMonitor.toggle();
	}
	if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
		InterfaceMonitor.managePanel('console');
	}
};

async function connectBoard() {
	if (Simulator.isOpen) {
		toggleSimulator();
	}
	setupMonitor();
	if (navigator.serial && !SerialAPI.isConnected) {
		await doConnect();
	}
};

function setMainToExecute() {
	if (Repl !== null && Repl.hasFirmware) {
		const runCmds = [
			Repl._MPY_CMD.import_library('microcontroller'),
			"microcontroller.set_file_to_execute('main.py')"
		];
		Repl.enqueueCommandList(runCmds);
	}
};

function enableFlash() {
	if (Repl !== null && Repl.hasFirmware) {
		const runCmds = [
			Repl._MPY_CMD.import_library('microcontroller'),
			'microcontroller.enable_repl_flash()'
		];
		Repl.enqueueCommandList(runCmds);
	}
};

async function restartBoard() {
	await waitFor(_ => SerialAPI.isConnected === false);
	InterfaceMonitor.writeConsole('code.serialAPI.boardRestart', 'neutral');
	await sleep_ms(3800);
	await connectBoard();
};

async function uploadPython() {
	const upload = async function () {
		if (Repl && Repl.hasFirmware) {
			$('#repl-control').removeClass("activated");
			SerialAPI.isDownloading = true;
			Repl.Queue.reset();
			enableFlash();
			await Repl.open();
			await restartBoard();
			if (SerialAPI.isConnected) {
				await Repl.open();
				await waitFor(_ => Repl.isOpen === true);
				Repl.uploadUserCode();
				Repl.sendCommand(Repl.Queue.dequeue());
				setMainToExecute();
				Repl.resetBoard('microcontroller');
				await restartBoard();
			}
		}
	};
	setupMonitor();
	if (SerialAPI.isConnected) {
		await upload();
	} else {
		await connectBoard();
		if (SerialAPI.isConnected) {
			await upload();
		}
	}
};

function callbackError(error) {
	if (error.match(/(DOMException|ParityError|BufferOverrunError): A ((framing|parity) error|buffer overrun) has been detected\./)) {
		SerialAPI.dataReceived = SerialAPI._loop_reader(callbackError);
	} else if (error.match(/(DOMException|BreakError): A break condition has been detected\./)) {
		console.log('Please refresh page.')
	} else if (error.match(/(DOMException|NetworkError): The device has been lost\./)) {
		InterfaceMonitor.writeConsole('code.serialAPI.boardDisconnected', 'warning');
		SerialAPI.reset();
		$('#repl-control').removeClass("activated");
		$("#upload-python-opt").show();
		$("#upload-python").hide();
		$("#download-python-opt").hide();
		$("#download-python").show();
		$("#disconnect-opt").hide();
		$("#connected-icon").remove();
	}
};

async function toggleReplOverture() {
	const openRepl = async function () {
		if (Repl && Repl.hasFirmware) {
			if (!Repl.isRawOpen) {
				if (!Repl.isOpen) {
					await Repl.open();
				} else {
					Repl.runFile();
					Repl.sendCommand(Repl.Queue.dequeue());
				}
			} else {
				Repl.close_raw_repl();
			}
		}
	};
	if (SerialAPI.isConnected) {
		openRepl();
	} else {
		await connectBoard();
		if (SerialAPI.isConnected) {
			openRepl();
		} else {
			InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedSerialWrite', 'warning');
		}
	}
};

function sendSerialCommand() {
	if (Repl && (Repl.isOpen || Repl.isRawOpen)) {
		const command = $('#serial-input').val();
		Repl.sendCommand(command + Repl.END_MPY_CMD);
		InterfaceMonitor.history.push(command);
		$('#serial-input').val("");
	} else {
		InterfaceMonitor.writeConsole('code.serialAPI.boardReplMustBeOpened', 'warning');
	}
};

async function doConnect() {
	try {
		await SerialAPI.open(callbackError);
		console.log(await SerialAPI.getInfo());
		console.log(await SerialAPI.getSignals());
		console.log(SerialAPI.port);
		const boardOptions = {
			"chunkSize": SerialAPI.CHUNK_SIZE,
			"libraries": VittaInterface.externalLibraries
		};
		Repl = new MicropythonRepl(SerialAPI, boardOptions);
		Repl.readingLoop();
		$("#upload-python-opt").hide();
		$("#download-python-opt").show();
		$("#upload-python").show();
		$("#download-python").hide();
		InterfaceMonitor.writeConsole('code.serialAPI.boardConnected', 'success');
		$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
		$("#disconnect-opt").show();
	} catch (e) {
		let err = String(e);
		console.log(err)
		if (err.match(/(DOMException|NotFoundError): No port selected by the user/)) {
			SerialAPI.reset();
			$("#connected-icon").remove();
		}
		if (err.match(/NetworkError: Failed to open serial port/)) {
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning');
			SerialAPI.reset();
			$("#connected-icon").remove();
		}
	}
};

async function doDisconnect() {
	if (Repl && Repl.hasFirmware) {
		Repl.Queue.reset();
		if (Repl.isOpen) {
			Repl.resetBoard('microcontroller');
			Repl.sendCommand(Repl.Queue.dequeue());
		} else {
			Repl.isLoopClosed = true;
		}
	}
	if (SerialAPI.port !== null) {
		SerialAPI.hasToClose = true;
		await waitFor(_ => Repl.isLoopClosed === true);
		await SerialAPI.close();
		$("#upload-python-opt").show();
		$("#download-python-opt").hide();
		$("#upload-python").hide();
		$("#download-python").show();
		$("#disconnect-opt").hide();
		$("#connected-icon").remove();
		InterfaceMonitor.writeConsole('code.serialAPI.boardDisconnected', 'warning');
		InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success');
		if (Repl) {
			Repl.setRepl(false);
			Repl = null;
		}
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
	// Ctrl+B management for Keyboard Interrupt
	if (SerialAPI.pressedKeys.includes('Control') && SerialAPI.pressedKeys.includes('b')) {
		Repl.open();
	}
};

/**
 * Promise for waiting (in milliseconds).
 * @param {int} ms
 * @return {Promise}
 */
function sleep_ms(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
};
