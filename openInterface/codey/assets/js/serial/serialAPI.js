
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
		SerialAPI._controller = new SerialUploader();
		console.log(SerialAPI._controller);
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
		SerialAPI.hasToClose = true;
		await SerialAPI._controller.close();
		$("#disconnect-opt").hide();
		$("#connected-icon").remove();
		InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
		InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success');
	}
};

async function uploadPython() {
	const mainCode = CodeManager.getSharedInstance().getCode();
	const upload = async () => {
		// Préparation des données
		const encoder = new TextEncoder();
		const codeBytes = encoder.encode(mainCode); // Ton code Python
		const fileName = SerialAPI._controller.TARGET_FILE_NAME; // "/flash/main.py"
		try {
			// Construction de l'entête
			const fileSize = codeBytes.length;
			const fileNameBytes = encoder.encode(fileName);
			const xorChecksum = SerialAPI._controller.calc32BitXor(codeBytes);
			const cmdLen = 0x09 + fileNameBytes.length;

			let frameDataHeader = [
				SerialAPI._controller.PROTOCOL_ID,
				SerialAPI._controller.DEV_ID,
				SerialAPI._controller.SRV_ID,
				SerialAPI._controller.HEADER_CMD_ID,
				...SerialAPI._controller.hexToUint8Array(SerialAPI._controller.intToLittleEndianHex(cmdLen, 2)),
				SerialAPI._controller.FILE_TYPE,
				...SerialAPI._controller.hexToUint8Array(SerialAPI._controller.intToLittleEndianHex(fileSize, 4)),
				...xorChecksum,
				...fileNameBytes
			];

			const frameDataHeaderLength = frameDataHeader.length;
			const headChecksum = (SerialAPI._controller.FRAME_HEADER + (frameDataHeaderLength & 0xff) + ((frameDataHeaderLength >> 8) & 0xff)) & 0xff;
			const dataChecksum = frameDataHeader.reduce((sum, b) => (sum + b) & 0xff, 0);

			const headerFrame = new Uint8Array([
				SerialAPI._controller.FRAME_HEADER,
				headChecksum,
				frameDataHeaderLength & 0xff,
				(frameDataHeaderLength >> 8) & 0xff,
				...frameDataHeader,
				dataChecksum,
				SerialAPI._controller.FRAME_END
			]);

			console.log("Envoi de la trame d'en-tête...");
			const headerAck = await SerialAPI._controller.sendFrameWithAck(headerFrame, SerialAPI._controller.MAX_RETRIES_HEADER, "HEADER");

			if (!headerAck) {
				console.error("Échec à l'envoi de l'en-tête.");
				return;
			}

			// Téléversement des blocs
			InterfaceMonitor.writeConsole("Upload ...");
			let offset = 0;
			let blockIndex = 0;
			const blockTotal = Math.ceil(fileSize / SerialAPI._controller.FILE_BLOCK_SIZE);
			while (offset < fileSize) {
				const block = codeBytes.slice(offset, offset + SerialAPI._controller.FILE_BLOCK_SIZE);
				const blockCmdLen = 0x04 + block.length;

				let frameDataBlock = [
					SerialAPI._controller.PROTOCOL_ID,
					SerialAPI._controller.DEV_ID,
					SerialAPI._controller.SRV_ID,
					SerialAPI._controller.FILE_BLOCK_CMD_ID,
					...SerialAPI._controller.hexToUint8Array(SerialAPI._controller.intToLittleEndianHex(blockCmdLen, 2)),
					...SerialAPI._controller.hexToUint8Array(SerialAPI._controller.intToLittleEndianHex(offset, 4)),
					...block
				];

				const frameDataBlockLength = frameDataBlock.length;
				const blockHeadChecksum = (SerialAPI._controller.FRAME_HEADER + (frameDataBlockLength & 0xff) + ((frameDataBlockLength >> 8) & 0xff)) & 0xff;
				const blockDataChecksum = frameDataBlock.reduce((sum, b) => (sum + b) & 0xff, 0);

				const blockFrame = new Uint8Array([
					SerialAPI._controller.FRAME_HEADER,
					blockHeadChecksum,
					frameDataBlockLength & 0xff,
					(frameDataBlockLength >> 8) & 0xff,
					...frameDataBlock,
					blockDataChecksum,
					SerialAPI._controller.FRAME_END
				]);

				console.log(`Envoi du bloc ${blockIndex + 1}...`);
				await SerialAPI._controller.sendFrameWithAck(blockFrame, SerialAPI._controller.MAX_RETRIES_BLOCK, "BLOCK");

				offset += SerialAPI._controller.FILE_BLOCK_SIZE;
				blockIndex++;
				console.log(`Bloc ${blockIndex} envoyé (${offset}/${fileSize} octets).`);
				// InterfaceMonitor.writeConsole(`${(offset / fileSize * 100) > 100 ? 100 : Math.round(offset / fileSize * 100)}%`);
				const progressLine = SerialAPI._controller.renderProgressBar(blockIndex, blockTotal);
				InterfaceMonitor.writeConsole(progressLine);
			}
			console.log("Téléversement terminé avec succès !");
			doDisconnect();
		} catch (error) {
			console.error("Erreur pendant l'upload :", error);
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

/**
 * This function records all the pressed keys in the array `pressedKeys`
 * @param {DOM} e the DOM keypress element (document in this case)
 */
function multipleKeyPress(e) {
	if (!SerialAPI.pressedKeys.includes(e.key)) {
		SerialAPI.pressedKeys.push(e.key);
	}
};