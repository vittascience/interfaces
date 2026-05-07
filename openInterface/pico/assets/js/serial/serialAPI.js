

async function connectBoard() {
	if ($("#simulator").is(":visible")) {
		toggleSimulator();
	}
	InterfaceMonitor.setup();
	if (navigator.serial && !SerialAPI.isConnected) {
		await doConnect();
	}
};

async function uploadPython() {
	const upload = async function () {
		if (Repl && Repl.hasFirmware) {
			Repl.progressBar.displayProgressBar();
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
		} else {
			InterfaceMonitor.writeConsole('Micropython firmware has to be flashed before downloading Python code. <b><a href=\"https://fr.vittascience.com/learn/tutorial.php?id=341/flasher-le-firmware-micropython-dans-la-carte-esp32\" style="color:var(--vitta-blue-dark);" target=\"_blank\" rel=\"noopener noreferrer\">Flashing Esp32 firmware</a></b>', 'warning');
		}
	};
	InterfaceMonitor.setup();
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
		} else {
			InterfaceMonitor.writeConsole('Micropython firmware has to be flashed before opening REPL. <b><a href=\"https://fr.vittascience.com/learn/tutorial.php?id=341/flasher-le-firmware-micropython-dans-la-carte-esp32\" style="color:var(--vitta-blue-dark);" target=\"_blank\" rel=\"noopener noreferrer\">Flashing Esp32 firmware</a></b>', 'warning');
		}
	};
	if (SerialAPI.isConnected) {
		await openRepl();
	} else {
		await connectBoard();
		if (SerialAPI.isConnected) {
			await openRepl();
		} else {
			InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForREPL', 'warning');
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
		$("#disconnect-opt").hide();
		$("#connected-icon").remove();
		Repl.progressBar.hideProgressBar();
	}
};

function sendSerialCommand() {
	const data = $('#serial-input').val();
	if (SerialAPI?.isConnected) {
		if (Repl?.isOpen || Repl?.isRawOpen) {
			Repl.sendCommand(data + Repl.END_MPY_CMD);
			InterfaceMonitor.history.push(data);
			$('#serial-input').val("");
		} else {
			SerialAPI.write(new TextEncoder('utf-8').encode(data));
			$('#serial-input').val("");
		}
	} else {
		InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForSerialWrite', 'warning', false, true);
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
			"libraries": VittaInterface.externalLibraries,
			"progressBar": true
		};
		Repl = new MicropythonRepl(SerialAPI, boardOptions);
		Repl.readingLoop();
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
		Repl.progressBar.hideProgressBar();
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
