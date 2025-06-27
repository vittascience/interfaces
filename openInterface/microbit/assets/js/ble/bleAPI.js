
/* Services MICROBIT */
// https://github.com/sumitgouthaman/microbit-ble-mobile - 2016

const getServiceUUID_data = (id) => 'e95d' + id + '-251d-470a-a062-fa1922dfa9a8';
// characteristics
const TemperatureServiceId = getServiceUUID_data('6100'); // #not a service
const AccelerometerServiceId = getServiceUUID_data('0753');
const ButtonServiceId = getServiceUUID_data('9882');
const MagnetometerServiceId = getServiceUUID_data('f2d8'); // #not a service
const LED_MATRIX_SERVICE_UUID = getServiceUUID_data('d91d');
const LED_MATRIX_STATE_CHARACTERISTIC = getServiceUUID_data('7b77');

// -> FOR V1
const MICROBIT_DFU_SERVICE = getServiceUUID_data('93b0');
const MICROBIT_DFU_CHARACTERISTIC = getServiceUUID_data('93b1');

// No services as flash
const MICROBIT_FLASH_SERVICE_UUID = getServiceUUID_data('93b0'); // #not a service
const MICROBIT_FLASH_SERVICE_CONTROL_CHARACTERISTIC_UUID = getServiceUUID_data('93b1');

/* Services BT */
// https://github.com/Samsung/microbit - 2019

const microbit_service = (id) => '0000' + id + '-0000-1000-8000-00805f9b34fb'
const getServiceUUID = (id) => microbit_service('180' + id);
const getCharacUUID = (id) => microbit_service('2a' + id);
// info
const DEVICE_INFORMATION_SERVICE_UUID = getServiceUUID('a');  // service [GATT]
const DEVICE_NAME = getCharacUUID('24');  // "BBC micro:bit V2.X" 						[characteristic.readValue()]
const FIRMWARE_REVISION_UUID = getCharacUUID('26');  // "unknown" 						[characteristic.readValue()]
// bt infos
const DEVICE_SERVICE_BLUETOOTH_UUID = getServiceUUID('0');  // service [GATT]
const BLUETOOTH_NAME_CHARAC_00 = getCharacUUID('00');  // "BBC micro:bit [gozep]" 			    [characteristic.readValue()]
const BLUETOOTH_CHARAC_01 = getCharacUUID('01');  // "\u0000\u0000" 							[characteristic.readValue()]
const BLUETOOTH_CHARAC_04 = getCharacUUID('04');  // "\b\u0000\u0010\u0000\u0000\u0000�\u0001" [characteristic.readValue()]
const BLUETOOTH_CHARAC_a6 = getCharacUUID('a6');  // "\u0001" 								    [characteristic.readValue()]
// ?? 
const GENERIC_ATTRIBUTE_SERVICE_UUID = getServiceUUID('1');  // service [GATT]
const SERVICE_CHANGED_UUID = getCharacUUID('05');  // ?? [characteristic]
// config
const CLIENT_CHARACTERISTIC_CONFIG = microbit_service('2902');  // ?? [characteristic]
// mb -> FOR V2
const MICROBIT_SECURE_DFU_SERVICE = microbit_service('fe59');  // ?? [characteristic]
const MICROBIT_DFU_CTRL_POINT_UUID_V2 = "8ec90004-f315-4f60-9fb8-838830daea50";

/* Services DFU */ // -> FOR V1
// https://github.com/Samsung/microbit - 2019

const getUUID_dfu = (id) => '0000153' + id + '-1212-efde-1523-785feabcd123';
// dfu infos
const NORDIC_DFU_SERVICE_UUID = getUUID_dfu('0'); // service [GATT] -> SecurityError*
const NORDIC_DFU_CONTROL_POINT_UUID = getUUID_dfu('1'); // ?? [characteristic]
const NORDIC_DFU_PACKET_UUID = getUUID_dfu('2'); // ?? [characteristic]
const NORDIC_DFU_VERSION = getUUID_dfu('4'); // ?? [characteristic]
// *SecurityError: Origin is not allowed to access the service. 
// Tip: Add the service UUID to 'optionalServices' in requestDevice() options. 
// https://goo.gl/HxfxSQ


/* Services PXT */
// https://github.com/microsoft/pxt/blob/master/pxtlib/webble.ts - 2021

// Nordic UART BLE
const getUUID_uart = (id) => '6e40000' + id + '-b5a3-f393-e0a9-e50e24dcca9e';
const NORDIC_UART_SERVICE_UUID = getUUID_uart('1');  // service [GATT]
const NORDIC_UART_CHARACTERISTIC_TX_UUID = getUUID_uart('2');
// notify & write [characteristic.startNotifications()] -> Authentication failed.
const NORDIC_UART_CHARACTERISTIC_RX_UUID = getUUID_uart('3');
// notify & read [characteristic.startNotifications()] -> Authentication failed.

// Partial Flashing
const getUUID_partialfFlash = (id) => 'e97d' + id + '-251d-470a-a062-fa1922dfa9a8'
const PARTIAL_FLASHING_SERVICE_UUID = getUUID_partialfFlash('d91d');  // service [GATT]
const PARTIAL_FLASHING_CHARACTERISTIC_UUID = getUUID_partialfFlash('3b10');
// ?? [characteristic .startNotifications()] -> Authentication failed. (on computer)

function BLE_writeMessage(message, type, path = 'WebBluetoothAPI') {
	InterfaceMonitor.writeConsole(jsonPath('code.' + path + '.' + message), type, false, true);
};

function setupMonitor() {
	if ($('#monitor').hasClass('monitor-closed')) {
		InterfaceMonitor.toggle();
	}
	if ($('#monitor-btn-console').length > 0 && !$('#monitor-btn-console').hasClass('activated')) {
		InterfaceMonitor.managePanel('console');
	}
};

async function connectBoardBLE() {
	if ($("#simulator").is(":visible")) {
		toggleSimulator();
	}
	setupMonitor();
	await doConnectBLE();
};

function onGATTconnected() {
	BLE_writeMessage('gattConnected', 'success');
	$("#execution-buttons-panel").append('<i id="connected-icon-ble" class="fa-brands fa-bluetooth"></i>');
	$("#disconnect-opt-ble").show();
};

function onGATTdisconnected() {
	$("#disconnect-opt-ble").hide();
	$("#connected-icon-ble").remove();
	BLE_writeMessage('boardDisconnected', 'warning', 'serialAPI');
	BLE_writeMessage('BLEclosed', 'success');
	InterfaceMonitor.writeConsole(' \n');
};

const WebBLEAPI = new WebBLE([PARTIAL_FLASHING_SERVICE_UUID, MICROBIT_SECURE_DFU_SERVICE], onGATTconnected, onGATTdisconnected, false);

async function getHardwareType() {
	if (!WebBLEAPI.gattConnected()) {
		await WebBLEAPI.connectToGATT();
	}
	if (WebBLEAPI.gattConnected()) {
		const status = await WebBLEAPI.getServiceCharacteristics(MICROBIT_SECURE_DFU_SERVICE);
		if (status) {
			WebBLEAPI.hardwareType = PartialFlashingBaseService.MICROBIT_V2;
		} else {
			WebBLEAPI.hardwareType = PartialFlashingBaseService.MICROBIT_V1;
		}
	}
};

async function doConnectBLE() {
	try {
		WebBLEAPI.hardwareType = PartialFlashingBaseService.MICROBIT_V2;
		await WebBLEAPI.requestDevice();
		if (!WebBLEAPI._bluetoothAPIDetected) {
			return BLE_writeMessage('noWebBluetoothAPI', 'interrupt');
		}
		if (!WebBLEAPI.gattConnected()) {
			await WebBLEAPI.connectToGATT();
		}
		if (WebBLEAPI.gattConnected()) {
			closeMicrobitBluetoothPairingModal();
			await getHardwareType();
			await WebBLEAPI.getServiceCharacteristics(PARTIAL_FLASHING_SERVICE_UUID);
			if (WebBLEAPI._services[PARTIAL_FLASHING_SERVICE_UUID]) {
				console.log(WebBLEAPI._services[PARTIAL_FLASHING_SERVICE_UUID])
				WebBLEAPI.setWriteCharacteristic(PARTIAL_FLASHING_CHARACTERISTIC_UUID);
				WebBLEAPI.setReadCharacteristic(PARTIAL_FLASHING_CHARACTERISTIC_UUID);
			}
		}
	} catch (e) {
		WebBLEAPI.status = WebBLE.STATUS_CONNECTION_ERROR;
		console.error(e)
		InterfaceMonitor.writeConsole(e.message, 'warning');
		const err = String(e);
		const errorNotif = new VittaNotif(5);
		if (err.match(/User cancelled the requestDevice/)) {
			BLE_writeMessage('noDeviceSelected', 'interrupt');
			WebBLEAPI.reset();
		} else {
			errorNotif.displayNotification(null, jsonPath('code.WebBluetoothAPI.badResponse'), 'bg-danger');
		}
	}
};

async function doDisconnectBLE() {
	if (WebBLEAPI.gattConnected()) {
		WebBLEAPI.hasToClose = true;
		await WebBLEAPI.unpair();
	}
};

const BLE_progressBar = {

	_displayProgressBar: function () {
		document.querySelector('#progress-bar-mb').style.width = '0%';
		document.querySelector('#global-overlay').style.display = 'flex';
		document.querySelector('#progress-bar-container').style.display = 'flex';
	},

	_hideProgressBar: function () {
		document.querySelector('#progress-bar-container').style.display = 'none';
		document.querySelector('#global-overlay').style.display = 'none';
		document.querySelector('#progress-bar-mb').style.width = '0%';
	},

	_updateProgressBar: function (percentage) {
		const progressBarElt = document.querySelector('#progress-bar-mb');
		progressBarElt.textContent = `${percentage}%`;
		getComputedStyle(progressBarElt).width;
		progressBarElt.style.width = `${percentage}%`;
	}
};

async function uploadPythonBLE() {
	const upload = async function () {
		WebBLEAPI.filename = InterfaceConnection.fsWrapper.filename;
		WebBLEAPI.percent = 0;
		try {
			// define progress bar
			BLE_progressBar._displayProgressBar();
			const progress = (value, partial) => {
				if (value) {
					return BLE_progressBar._updateProgressBar(Math.trunc(value * 100));
				}
			};
			// get universal hex
			await InterfaceConnection.fsWrapper.setFilesystemProgram();
			const universalHex = InterfaceConnection.fsWrapper.fs.getUniversalHex();

			// parse universal hex
			WebBLEAPI.hexParser = new HexApplicationParser();
			await WebBLEAPI.hexParser.universalHexToDFU(universalHex, WebBLEAPI.hardwareType);

			// start partial flashing
			if (WebBLEAPI.hexParser.status == HexApplicationParser.STATUS_PARSING_DONE) {
				const status = await WebBLEAPI._controller.attemptPartialFlash(WebBLEAPI.hexParser.resultHex, progress);
				//const status = PartialFlashingBaseService.PF_ATTEMPT_DFU
				if (status === PartialFlashingBaseService.PF_ATTEMPT_DFU) {
					// attempt DFU flash
					BLE_writeMessage('uploadFailed', 'warning');
					
					// TODO: Secure DFU Flashing (05/24) Léo M.

					/*
					console.log("Attempt DFU flash !")
					WebBLEAPI.hexParser.prepareToDfu(WebBLEAPI.hardwareType);
					console.log("status:" + WebBLEAPI.hexParser.status)
					console.log(WebBLEAPI.hexParser)
					if (WebBLEAPI.hexParser.status = HexApplicationParser.STATUS_DFU_DATA_DONE) {
						const data = WebBLEAPI.hexParser.dfuData;
						await WebBLEAPI.getServiceCharacteristics(MICROBIT_SECURE_DFU_SERVICE);
						if (WebBLEAPI._services[MICROBIT_SECURE_DFU_SERVICE]) {
							console.log(WebBLEAPI._services[MICROBIT_SECURE_DFU_SERVICE])
							WebBLEAPI.setWriteCharacteristic(MICROBIT_DFU_CTRL_POINT_UUID_V2);
							WebBLEAPI.setReadCharacteristic(MICROBIT_DFU_CTRL_POINT_UUID_V2);
	
							WebBLEAPI._controller = new SecureDfuService(WebBLEAPI);
							console.log(WebBLEAPI._controller)
							await WebBLEAPI.reading('notify');
	
							await WebBLEAPI._controller.attemptflashDfu(data.init, data.firmware);
						} else {
							BLE_writeMessage('badResponse', 'warning');
						}
					}
					*/
				} else if (status === PartialFlashingBaseService.PF_SUCCESS) {
					BLE_writeMessage('fileDownloaded', 'success', 'serialAPI');
				} else {
					BLE_writeMessage('badResponse', 'warning');
				}
			}
			await InterfaceConnection.sleep(0.2);
			BLE_progressBar._hideProgressBar();
		} catch (e) {
			console.error(e);
			BLE_writeMessage('uploadFailed', 'warning');
			BLE_progressBar._hideProgressBar();
		}
	};
	if (!WebBLEAPI.gattConnected()) {
		await connectBoardBLE();
	}
	if (WebBLEAPI.gattConnected()) {
		WebBLEAPI._controller = new PartialFlashingBaseService(WebBLEAPI);
		await WebBLEAPI.reading('notify');
		if (WebBLEAPI.status === WebBLE.STATUS_NOTIFICATIONS_STARTED) {
			await upload();
		}
	}
	if (WebBLEAPI.status === WebBLE.STATUS_AUTHENTICATION_FAILED) {
		BLE_writeMessage('usePhone', 'interrupt');
	}
};

/*
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
	const checkResponseAndSend = async function (cmd) {
		if ((/(cyberpi.|)config.write_config/.test(cmd) && /repl_enable/.test(cmd)) || /(cyberpi.|)restart\(\)/.test(cmd) || (/exec\(/.test(cmd) && /main1/.test(cmd))) {
			await sendScriptCommandBLE(cmd, TYPE_RUN_WITHOUT_RESPONSE);
		} else {
			await sendScriptCommandBLE(cmd, TYPE_RUN_WITH_RESPONSE);
		}
		document.getElementById("serial-input").value = "";
	};
	if (WebBLEAPI.gattConnected()) {
		await checkResponseAndSend($('#serial-input').val());
	} else {
		await doConnectBLE();
		await checkResponseAndSend($('#serial-input').val());
	}
};
*/


function closeMicrobitBluetoothPairingModal() {
	pseudoModal.closeModal('modal-microbit-bluetooth-pairing');
	const button = document.querySelector('#upload-python-ble-opt');
	if (button !== null) {
		button.setAttribute('onclick', 'uploadPythonBLE()');
	}
};

const MicrobitBLEAuthModal = {

	id: "#popup_bt_auth",
	confirmBtn: null,
	cancelBtn: null,
	crossBtn: null,

	init: function () {
		$("#mb_matrix").html("");
		this.createMatrix(5, 5, 52);
		$('#auth_led_matrix svg rect').click(this.toggleLEDcolor);
		this.confirmBtn = document.querySelector(this.id + " #bt_auth_confirm");
		this.cancelBtn = document.querySelector(this.id + " #bt_auth_cancel");
		this.crossBtn = document.querySelector(this.id + " .vitta-modal-exit-btn");
	},
	confirm: function () {
		const leds = $('#auth_led_matrix svg rect');
		let screen_code = [];
		let row = '';
		for (var i = 0; i < leds.length; i++) {
			const color = leds[i].attributes['fill']['value'];
			row += (color == "#f5f5f5") ? 0 : 1;
			if (row.length == 5) {
				screen_code.push(parseInt(row, 2));
				row = '';
			}
		}
		$(this.id + ',.overlay').css('display', 'none');
		return screen_code;
	},
	cancel: function () {
		$(this.id + ',.overlay').css('display', 'none');
	},
	toggleLEDcolor: function () {
		const color = $(this)[0].attributes['fill']['value'];
		$(this)[0].attributes['fill']['value'] = (color == "#f5f5f5") ? "#ff0a0a" : "#f5f5f5";
	},
	createLEDRect: function (parameters) {
		const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
		for (var p in parameters) {
			rect.setAttributeNS(null, p.replace(/[A-Z]/g, function (m, p, o, s) { return "-" + m.toLowerCase(); }), parameters[p]);
		}
		return rect;
	},
	createMatrix: function (columns, lines, size) {
		// parameters for the svg rect
		const X = 16;
		const parameters = {
			fill: '#f5f5f5',
			strokeWidth: '1',
			stroke: '#565656',
			cursor: 'pointer',
			x: X,
			y: 12,
			rx: 27,
			ry: 20,
			width: 26,
			height: 38
		}
		for (var i = 0; i < lines; i++) {
			if (i == 4) {
				parameters.fill = '#ff0a0a';
			}
			for (var j = 0; j < columns; j++) {
				document.getElementById('mb_matrix').appendChild(this.createLEDRect(parameters));
				parameters['x'] += size;
			}
			parameters['x'] = X;
			parameters['y'] += size;
		}
	},
	display: function () {
		this.init();
		const id = this.id;
		const _this = this;
		let onConfirm, onCancel, onCross;
		const buttonPromise = function () {
			return new Promise(resolve => {
				//_this.dark_mode_examples_imgs();
				$(".overlay").css("display", "block");
				$(id).css("display", "block");
				onConfirm = (e) => {
					const matrix = MicrobitBLEAuthModal.confirm();
					resolve(matrix);
				};
				_this.confirmBtn.addEventListener('click', onConfirm);
				onCancel = (e) => resolve();
				_this.cancelBtn.addEventListener('click', onCancel);
				onCross = (e) => resolve();
				_this.crossBtn.addEventListener('click', onCross);
			})
		};
		return new Promise(async resolve => {
			const result = await buttonPromise();
			_this.confirmBtn.removeEventListener('click', onConfirm);
			_this.cancelBtn.removeEventListener('click', onCancel);
			_this.crossBtn.removeEventListener('click', onCross);
			resolve(result);
		});
	},
	componentToHex: function (c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	},
	// dark_mode_examples_imgs: function () {
	// 	let rgb = $(this.id).css("background-color").match(/\d+/g);
	// 	let r = parseInt(rgb[0]),
	// 		g = parseInt(rgb[1]),
	// 		b = parseInt(rgb[2]);
	// 	let color = "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);

	// 	if (color == "#f5f5f5" && $(".img-selected").attr("src").includes("dark_mode_")) {
	// 		$(".suggestion-img").each(function () {
	// 			let new_src = $(this).attr('src').replace('dark_mode_', '');
	// 			$(this).attr('src', new_src);
	// 		});
	// 	} else if (color != "#f5f5f5" && !$(".img-selected").attr("src").includes("dark_mode_")) {
	// 		$(".suggestion-img").each(function () {
	// 			if (!$(this).attr('src').includes("dark_mode_")) {
	// 				let new_src = $(this).attr('src').split('/');
	// 				new_src[new_src.length - 1] = 'dark_mode_' + new_src[new_src.length - 1];
	// 				$(this).attr('src', new_src.join('/'));
	// 			}
	// 		});
	// 	}
	// }
}