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

/*
Download firmware button -- not ready

$("#downloadFirmwareButton").click(async function () {
	setupMonitor();
	if (SerialAPI.isConnected) {
		if (!Esp32.hasFirmware) {
			InterfaceMonitor.writeConsole('Setting firmware data...')
			Esp32.setFirmwareData('esp32-idf3-20200902-v1.13.bin');
			var delay = null;
			function finish() {
				clearInterval(delay);
				Esp32.isDownloadingFirmware = true;
				await Esp32.flash({ 
					address: 0x1000, 
					data: Esp32.firmwareData 
				})
				Esp32.isDownloadingFirmware = false;
				Repl.readingLoop();
			};
			function start() {
				delay = setInterval(function () {
					console.log('condition')
					console.log(condition())
					if (condition()) {
						finish();
					}
				}, 500);
			};
			start();
		} else {
			InterfaceMonitor.writeConsole('Micropython firmware is already flashed.', 'success');
		}
	} else {
		InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForDownload', 'warning');
	}
});
*/

async function uploadPython() {
	const upload = async function () {
		if (Repl && Repl.hasFirmware) {
			Repl.Queue.reset();
			const commands = [
				Repl._MPY_CMD.import_library('machine'),
				Repl._MPY_CMD.setPwm("2")
			];
			Repl.enqueueCommandList(commands);
			Repl.uploadUserCode();
			Repl.enqueueCommand(Repl._MPY_CMD.stopPwm("2"));
			Repl.resetBoard('machine');
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

function callbackError (error) {
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

/*
Raw REPL button -- not ready

$('#raw-repl').on('click', function () {
	if (Repl && Repl.isOpen) {
		if (!Repl.isRawOpen) {
			Repl.open_raw_repl();
		} else {
			Repl.close_raw_repl();
		}
	} else {
		InterfaceMonitor.writeConsole('code.serialAPI.boardReplMustBeOpened', 'warning');
	}
});
*/

async function doConnect() {
	try {
		await SerialAPI.open(callbackError);
		const board = await SerialAPI.getInfo();
		console.log(board);
		const ESP32_CAM = {usbVendorId: 0x1A86, usbProductId: 0x7523};
		if (board.usbVendorId == ESP32_CAM.usbVendorId && board.usbProductId == ESP32_CAM.usbProductId) {
			console.log("ESP32-CAM connected.")
			SerialAPI.setDTR(false);
			SerialAPI.setRTS(false);
		}
		console.log(await SerialAPI.getSignals());
		console.log(SerialAPI.port);
		const boardOptions = {
			"chunkSize": SerialAPI.CHUNK_SIZE,
			"libraries": VittaInterface.externalLibraries
		};
		Repl = new MicropythonRepl(SerialAPI, boardOptions)
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
			pseudoModal.openModal('modal-ch340-driver');
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

async function waitClosure () {
	await waitFor(_ => Repl.isLoopClosed === true);
}

function waitFor (conditionFunction) {
	const poll = resolve => {
		if (conditionFunction()) {
			resolve();
		} else {
			setTimeout(_ => poll(resolve), 5);
		}
	}
	return new Promise(poll);
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