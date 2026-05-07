

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
	const code = CodeManager.getSharedInstance().getCode();
	if (code.match(/from edgeModel import Model/)) {
		await this.updateSpecificAiLibrariesGalaxia(code);
	}
	const upload = async function () {
		if (Repl && Repl.hasFirmware) {
			Repl.progressBar.displayProgressBar();
			Repl.Queue.reset();
			// await Repl.bootBoard(true); // TO BE FIXED FOR MICROPYTHON V2.0 AND ABOVE
			await loadImagesToFS(code);
			await Repl.uploadUserCode();
			if (Repl.hadRequestedLibraries) {
				await Repl.resetBoard('machine', true);
			} else {
				Repl.runFile();
			}
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

async function loadImagesToFS(code) {
	const images = Blockly.Constants.GALAXIA_DISPLAY_IMAGES.map(item => item[1]);
	if (/thingz/.test(code) && /print_bmp\(/.test(code)) {
		for (const f of images) {
			if (code.includes(f)) {
				const buffer = await VittaInterface.fetchDir("/openInterface/galaxia/assets/media/images/" + f, "buffer");
				if (buffer) {
					if (!Repl.isOpen) {
						await Repl.open();
						await waitFor(_ => Repl.isOpen === true);
					}
					await Repl.sendCommand("import os" + Repl.END_MPY_CMD);
					const hasImage = await Repl.sendCommand('"' + f + '" in os.listdir()' + Repl.END_MPY_CMD, true);
					if (hasImage.includes("False")) {
						const b64 = uint8ToBase64(new Uint8Array(buffer));
						const commands = [
							Repl._MPY_CMD.import_library('ubinascii'),
							Repl._MPY_CMD.fs.open(f, 'wb')
						];
						Repl.enqueueCommandList(commands);
						const CHUNK_LEN = 2000;
						for (let i = 0; i < b64.length; i += CHUNK_LEN) {
							const part = b64.slice(i, i + CHUNK_LEN);
							Repl.enqueueCommand(Repl._MPY_CMD.fs.write(`ubinascii.a2b_base64("${part}")`));
						}
						Repl.enqueueCommand(Repl._MPY_CMD.fs.close());
					}
				}
			}
		}
	}
};

function uint8ToBase64(u8) {
	let s = "";
	const chunk = 0x8000;
	for (let i = 0; i < u8.length; i += chunk) {
		const part = u8.subarray(i, i + chunk);
		s += String.fromCharCode(...part);
	}
	return btoa(s);
}

/**
 * Update specific AI libraries with model weights and labels.
 */
async function updateSpecificAiLibrariesGalaxia(code) {
	return new Promise(async (resolve, reject) => {
		const checkRegexCloud = /Model\s*\(\s*(["'])(https?:\/\/[^\/]+\/ia\/(?:model\/([a-zA-Z0-9]+)\/?|sensors(?:\.h)?\?link=([a-zA-Z0-9]+)(?:&[^"']*)?))\1\s*\)/;
		const cloudRegexResult = code.match(checkRegexCloud);
		let id = cloudRegexResult?.[3] ?? cloudRegexResult?.[4];
		let metadata;
		if (id) {
			const metadataContent = await fetch(`${location.origin}/ia/model/${id}/metadata.json`);
			metadata = await metadataContent.json();
		} else {
			const metadataFromLocalStorage = localStorage.getItem('modelEdgeMetadata');
			if (!metadataFromLocalStorage) {
				console.error('No metadata found in local storage');
				return reject('No metadata found in local storage');
			}
			metadata = JSON.parse(metadataFromLocalStorage);
		}
		const modelWeights = JSON.parse(metadata.userMetaData.weightData);
		const labels = JSON.stringify(metadata.labels);
		let sensorStrategy = "edgeModel";
		switch (metadata.settings.strategy.name) {
			case 'p19/p7':
				sensorStrategy = 'edgeModelP19-P7';
				break;
			case 'p19':
				sensorStrategy = 'edgeModelP19';
				break;
			case 'p7':
				sensorStrategy = 'edgeModelP7';
				break;
			case 'accelerometer':
			default:
				sensorStrategy = 'edgeModel';
				break;
		}
		let edgeLib = VittaInterface.externalLibraries[sensorStrategy];
		const inputStart = edgeLib.split('# AI_EDGE_MODEL_WEIGHTS_INPUT_START')[0];
		const inputEnd = edgeLib.split('# AI_EDGE_MODEL_WEIGHTS_INPUT_END')[1];
		edgeLib = `${inputStart}# AI_EDGE_MODEL_WEIGHTS_INPUT_START\n${modelWeights}\nlabels=${labels}\n# AI_EDGE_MODEL_WEIGHTS_INPUT_END${inputEnd}`;
		VittaInterface.externalLibraries["edgeModel"] = edgeLib;
		return resolve();
	});
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
			InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForREPL', 'warning');
		}
	}
};

function sendSerialCommand() {
	const data = $('#serial-input').val();
	if (SerialAPI?.isConnected) {
		if (Repl?.isOpen || Repl?.isRawOpen) {
			const response = Repl.sendCommand(data + Repl.END_MPY_CMD, true);
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
		InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForSerialWrite', 'warning');
	}
});
*/

async function doConnect() {
	try {
		await SerialAPI.open(callbackError);
		console.log(await SerialAPI.getInfo());
		console.log(await SerialAPI.getSignals());
		console.log(SerialAPI.port);
		const boardOptions = {
			"chunkSize": 1024,
			"libraries": VittaInterface.externalLibraries,
			"progressBar": true
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