
const InterfaceConnection = {
	serial: null,
	repl: null,

	init: function (options, boardId = null) {
		this.options = Object.assign({}, options) || {
			"boardSelection": true,
			"boardName": null,
			"boardsFilter": null,
			"bauds": null,
			"variant_ids": null,
			"chunkSizes": { 'default': 1024 }
		};
		if (!this.options.boardId) this.options.boardId = boardId;
		if (this.options.bauds) {
			document.querySelector('#baud option[value="' + this.options.bauds + '"]').selected = true;
		}
		const getBaudrate = () => parseInt($('#baud').find(":selected").text());
		if (this.options.boardsFilter && !Array.isArray(this.options.boardsFilter)) {
			this.options.boardsFilter = Object.values(this.options.boardsFilter);
		}
		this.serial = new Serial(getBaudrate, this.options.boardsFilter);
		const chunSize = this.options.chunkSizes[this.options.boardId];
		this.serial.CHUNK_SIZE = chunSize ? chunSize : this.options.chunkSizes['default'];
	},

	connectBoard: async function () {
		if ($("#simulator").is(":visible")) {
			toggleSimulator();
		}
		InterfaceMonitor.setup();
		if (navigator.serial && !this.serial.isConnected) {
			await this.doConnect();
		}
	},

	uploadPython: async function () {
		const upload = async () => {
			if (this.repl && this.repl.hasFirmware) {
				this.repl.progressBar.displayProgressBar();
				this.repl.Queue.reset();
				const pin = this.options.boardId == BOARD_NANO_ESP32 ? "48" : "2";
				const commands = [
					this.repl._MPY_CMD.import_library('machine'),
					this.repl._MPY_CMD.setPwm(pin)
				];
				this.repl.enqueueCommandList(commands);
				this.repl.uploadUserCode();
				this.repl.enqueueCommand(this.repl._MPY_CMD.stopPwm(pin));
				if (this.options.boardId == BOARD_NANO_ESP32) {
					this.repl.runFile();
				} else {
					this.repl.resetBoard('machine');
				}
				$('#repl-control').removeClass("activated");
				this.serial.isDownloading = true;
				if (!this.repl.isOpen) {
					await this.repl.open();
				} else {
					this.repl.sendCommand(this.repl.Queue.dequeue());
				}
			} else {
				InterfaceMonitor.writeConsole('Micropython firmware has to be flashed before downloading Python code. <b><a href=\"https://fr.vittascience.com/learn/tutorial.php?id=341/flasher-le-firmware-micropython-dans-la-carte-esp32\" style="color:var(--vitta-blue-dark);" target=\"_blank\" rel=\"noopener noreferrer\">Flashing Esp32 firmware</a></b>', 'warning');
			}
		};
		InterfaceMonitor.setup();
		if (this.serial.isConnected) {
			await upload();
		} else {
			await this.connectBoard();
			if (this.serial.isConnected) {
				await upload();
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForDownload', 'warning');
			}
		}
	},

	connectCallbackError: function (error) {
		console.error(error);
		const err = String(error);
		const errorNotif = new VittaNotif(5);
		if (err.match(/No port selected by the user/)) {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.noPortSelected'), 'bg-danger');
			this.serial.reset();
			$("#connected-icon").remove();
		} else if (err.match(/Failed to open serial port/)) {
			pseudoModal.openModal('modal-ch340-driver');
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning');
			this.serial.reset();
			$("#connected-icon").remove();
		} else {
			errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
		}
	},

	readCallbackError: function (error) {
		if (error.match(/(DOMException|ParityError|BufferOverrunError): A ((framing|parity) error|buffer overrun) has been detected\./)) {
			InterfaceConnection.serial.dataReceived = InterfaceConnection.serial._loop_reader(InterfaceConnection.readCallbackError);
		} else if (error.match(/(DOMException|BreakError): A break condition has been detected\./)) {
			console.log('Please refresh page.')
		} else if (error.match(/(DOMException|NetworkError): The device has been lost\./)) {
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			InterfaceConnection.serial.reset();
			$('#repl-control').removeClass("activated");
			$("#disconnect-opt").hide();
			$("#connected-icon").remove();
			InterfaceConnection.repl.progressBar.hideProgressBar();
		}
	},

	toggleReplOverture: async function () {
		const openRepl = async () => {
			if (this.repl && this.repl.hasFirmware) {
				if (!this.repl.isRawOpen) {
					if (!this.repl.isOpen) {
						await this.repl.open();
					} else {
						this.repl.runFile();
						this.repl.sendCommand(this.repl.Queue.dequeue());
					}
				} else {
					this.repl.close_raw_repl();
				}
			} else {
				InterfaceMonitor.writeConsole('Micropython firmware has to be flashed before opening REPL. <b><a href=\"https://fr.vittascience.com/learn/tutorial.php?id=341/flasher-le-firmware-micropython-dans-la-carte-esp32\" style="color:var(--vitta-blue-dark);" target=\"_blank\" rel=\"noopener noreferrer\">Flashing Esp32 firmware</a></b>', 'warning');
			}
		};
		if (this.serial.isConnected) {
			openRepl();
		} else {
			await this.connectBoard();
			if (this.serial.isConnected) {
				openRepl();
			} else {
				InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForREPL', 'warning');
			}
		}
	},

	sendSerialCommand: function () {
		if (this.serial?.isConnected) {
			const data = $('#serial-input').val();
			if (this.repl?.isOpen || this.repl?.isRawOpen) {
				this.repl.sendCommand(data + this.repl.END_MPY_CMD);
				InterfaceMonitor.history.push(data);
				$('#serial-input').val("");
			} else {
				this.serial.write(new TextEncoder('utf-8').encode(data));
				$('#serial-input').val("");
			}
		} else {
			InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForSerialWrite', 'warning', false, true);
		}
	},

	doConnect: async function () {
		try {
			const board = await this.serial.open(this.readCallbackError.bind(this));
			if (Blockly.Constants.getSelectedBoard() == 'esp32-cam') {
				this.serial.setDTR(false);
				this.serial.setRTS(false);
			}
			const boardOptions = {
				"chunkSize": this.serial.CHUNK_SIZE,
				"libraries": VittaInterface.externalLibraries,
				"progressBar": true
			};
			this.repl = new MicropythonRepl(this.serial, boardOptions);
			this.repl.readingLoop();
			InterfaceMonitor.writeConsole('code.serialAPI.boardConnected', 'success');
			$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
			$("#disconnect-opt").show();
		} catch (e) {
			this.connectCallbackError(e);
		}
	},

	doDisconnect: async function () {
		if (this.repl && this.repl.hasFirmware) {
			this.repl.progressBar.hideProgressBar();
			this.repl.Queue.reset();
			if (this.repl.isOpen) {
				this.repl.resetBoard('machine');
				this.repl.sendCommand(this.repl.Queue.dequeue());
			} else {
				this.repl.isLoopClosed = true;
			}
		}
		if (this.serial.port !== null) {
			this.serial.hasToClose = true;
			await this.waitClosure();
			await this.serial.close();
			$("#disconnect-opt").hide();
			$("#connected-icon").remove();
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			InterfaceMonitor.writeConsole('code.serialAPI.serialPortClosed', 'success');
			if (this.repl) {
				this.repl.setRepl(false);
				this.repl = null;
			}
		}
	},

	waitClosure: async function () {
		await waitFor(_ => this.repl.isLoopClosed === true);
	}

}

/*
Raw REPL button -- not ready

$('#raw-repl').on('click', function () {
	if (Repl && this.repl.isOpen) {
		if (!this.repl.isRawOpen) {
			this.repl.open_raw_repl();
		} else {
			this.repl.close_raw_repl();
		}
	} else {
		InterfaceMonitor.writeConsole('code.serialAPI.boardMustBeConnectedForSerialWrite', 'warning');
	}
});
*/