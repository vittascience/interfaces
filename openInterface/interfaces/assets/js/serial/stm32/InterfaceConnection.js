const InterfaceConnection = {
	serial: null,
	repl: null,

	init: function (options, board = null) {
		this.options = Object.assign({}, options) || {
			"boardSelection": true,
			"board": null,
			"boardName": null,
			"boardsFilter": null,
			"bauds": null,
			"variant_ids": null,
			"chunkSizes": { 'default': 255 }
		};
		if (!this.options.boardId) this.options.boardId = board;
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
				this.repl.uploadUserCode();
				this.repl.runFile();
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

	callbackError: function (error) {
		if (error.match(/(DOMException|ParityError|BufferOverrunError): A ((framing|parity) error|buffer overrun) has been detected\./)) {
			InterfaceConnection.serial.dataReceived = InterfaceConnection.serial._loop_reader(InterfaceConnection.callbackError);
		} else if (error.match(/(DOMException|BreakError): A break condition has been detected\./)) {
			console.log('Please refresh page.')
		} else if (error.match(/(DOMException|NetworkError): The device has been lost\./)) {
			InterfaceMonitor.writeConsole(jsonPath('code.serialAPI.boardDisconnected'), 'warning');
			InterfaceConnection.serial.reset();
			$('#repl-control').removeClass("activated");
			$("#upload-python-opt").show();
			$("#upload-python").hide();
			$("#download-python-opt").hide();
			$("#download-python").show();
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
		const data = $('#serial-input').val();
		if (this.serial?.isConnected) {
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
			await this.serial.open(this.callbackError);
			console.log(await this.serial.getInfo());
			console.log(await this.serial.getSignals());
			console.log(this.serial.port);
			const boardOptions = {
				"chunkSize": this.serial.CHUNK_SIZE,
				"libraries": VittaInterface.externalLibraries,
				"progressBar": true
			};
			this.repl = new MicropythonRepl(this.serial, boardOptions);
			this.repl.readingLoop();
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
				this.serial.reset();
				$("#connected-icon").remove();
			} else if (err.match(/Failed to open serial port/)) {
				InterfaceMonitor.writeConsole('code.serialAPI.serialPortOpeningFail', 'warning');
				this.serial.reset();
				$("#connected-icon").remove();
			} else {
				errorNotif.displayNotification(null, jsonPath('code.serialAPI.badResponse'), 'bg-danger');
			}
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
			$("#upload-python-opt").show();
			$("#download-python-opt").hide();
			$("#upload-python").hide();
			$("#download-python").show();
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
