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

async function uploadPython() {
	const upload = async function () {
		if (Repl && Repl.hasFirmware) {
			Repl.Queue.reset();
			Repl.uploadUserCode();
			Repl.runFile();
			$('#repl-control').removeClass("activated");
			SerialAPI.isDownloading = true;
			if (!Repl.isOpen) {
				await Repl.open();
			} else {
				Repl.sendCommand(Repl.Queue.dequeue());
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
		} else {
			InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForDownload', 'warning');
		}
	}
};

/**
 * Download the firmware of the board.
 */
async function downloadFirmware(fileName) {
	await VittaInterface.fetchDir("/openInterface/" + Main.getInterface() + "/assets/firmware/" + fileName, true)
		.then(function (blob) {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		});
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
		await openRepl();
	} else {
		await connectBoard();
		if (SerialAPI.isConnected) {
			await openRepl();
		} else {
			InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedSerialWrite', 'warning');
		}
	}
};

function callbackError(error) {
	if (error.match(/(DOMException|ParityError|BufferOverrunError): A ((framing|parity) error|buffer overrun) has been detected\./)) {
		SerialAPI.dataReceived = SerialAPI._loop_reader(callbackError);
	} else if (error.match(/(DOMException|BreakError): A break condition has been detected\./)) {
		console.log('Please refresh page.')
	} else if (error.match(/(DOMException|NetworkError): The device has been lost\./)) {
		InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
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
	if (Repl && Repl.hasFirmware) {
		Repl.Queue.reset();
		if (Repl.isOpen) {
			Repl.resetBoard('machine');
			Repl.sendCommand(Repl.Queue.dequeue());
		} else {
			Repl.isLoopClosed = true;
		}
	}
	if (SerialAPI.port !== null) {
		SerialAPI.hasToClose = true;
		await waitClosure();
		await SerialAPI.close();
		$("#upload-python-opt").show();
		$("#download-python-opt").hide();
		$("#upload-python").hide();
		$("#download-python").show();
		$("#disconnect-opt").hide();
		$("#connected-icon").remove();
		InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
		InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success');
		if (Repl) {
			Repl.setRepl(false);
			Repl = null;
		}
	}
};

async function waitClosure() {
	await waitFor(_ => Repl.isLoopClosed === true);
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
