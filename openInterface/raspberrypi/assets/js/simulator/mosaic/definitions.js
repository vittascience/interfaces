Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
	const pins = Blockly.Constants.Pins[mod.pins];
	const pinName = pins.find((p) => p[1] == pin);
	return {
		name: pinName ? pinName[0] : null,
		id: pin.replace('pin', ''),
	};
};

Simulator.Mosaic.externalLibraries = {
	// js libraries
	// 'src/lib/machine.js': Simulator.PATH_LIB + 'micropython/machine.js',
	// js common libraries
	// 'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
	// 'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
	'src/lib/ujson.js': Simulator.PATH_LIB_COMMON + 'micropython/json.js',
	'src/lib/json.js': Simulator.PATH_LIB_COMMON + 'micropython/json.js',
	'src/lib/gc.js': Simulator.PATH_LIB_COMMON + 'micropython/gc.js',
	// js common esp32 libraries
	// 'src/lib/esp32.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/esp32.js',
	'src/lib/esp.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/esp.js',
	'src/lib/urequests.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/requests.js',
	'src/lib/requests.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/requests.js',
	'src/lib/socket.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/socket.js',
	'src/lib/usocket.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/socket.js',
	'src/lib/network.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/network.js',

	// raspberry pi libraries
	// lcd1602
	'src/lib/sense_hat.js': Simulator.PATH_LIB + 'python/sense_hat.js',
	'src/lib/lcd1602.js': Simulator.PATH_LIB + 'grove/lcd1602.js',
	'src/lib/neopixel.js': Simulator.PATH_LIB + 'python/neopixel.js',
	'src/lib/buzzer.js': Simulator.PATH_LIB + 'grove/buzzer.js',
	'src/lib/ultrasonic_ranger.js': Simulator.PATH_LIB + 'grove/ultrasonic.js',
	'src/lib/dht.js': Simulator.PATH_LIB + 'grove/dht.js',
	'src/lib/adc.js': Simulator.PATH_LIB + 'grove/GroveADC.js',
	// sensehat
};

// Specific to galaxia board buttons
Simulator.Mosaic.addSpecificInitializations = async function () {
	await Simulator.waitBoardViewer();
	if (Simulator.board.name === 'SenseHat') {
		const senseHat = Simulator.Mosaic.specific.senseHatEvent
		senseHat.senseHat = true;

		// initialize joystick buttons
		const board = document.getElementById('board-viewer').contentDocument;
		const boardJoystickArray = ['_up', '_down', '_left', '_right'];
		for (let i=0; i<boardJoystickArray.length; i++) {
			const element = board.getElementById("joystick"+boardJoystickArray[i]);
			const path = element.querySelector('path')
			const mouseDownListener = senseHat.joystickDownListener(path, 'cls-12' );
            const mouseUpListener = senseHat.joystickUpListener(path, 'cls-12');

			path.addEventListener('mousedown', mouseDownListener);
			path.addEventListener('mouseup', mouseUpListener);
					
		}
	} else if (Simulator.board.name === "GrouvePi"){
		const GrouvePiHat = Simulator.Mosaic.specific.GrouvePiHat
		GrouvePiHat.GrouvePi = true;
	}

	
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () {
	// ultrasonic

	Sk.builtins.grove_getUltrasonicData = function (pinNumber, data, timeout_us) {
		Sk.builtin.pyCheckArgsLen('grove_getUltrasonicData', arguments.length, 1, 3);
		Sk.builtin.pyCheckType('data', 'string', Sk.builtin.checkString(data));
		Sk.builtin.pyCheckType('timeout_us', 'integer', Sk.builtin.checkInt(timeout_us));
		const duration = $('#ultrasonic_' + pinNumber.v + '_slider_d').slider('option', 'value');
		if (data.v == 'distance') {
			return new Sk.builtin.float_(roundFloat(((343 * duration * 1e-6) / 2) * 100, 2));
		} else if (data.v == 'duration') {
			return new Sk.builtin.float_(duration);
		} else {
			throw new Sk.builtin.ValueError("Data option '" + data.v + "' is not valid");
		}
	};
	Sk.builtins.grove_getUltrasonicData.co_varnames = ['pinNumber', 'data', 'timeout_us'];
	Sk.builtins.grove_getUltrasonicData.$defaults = [new Sk.builtin.str('distance'), new Sk.builtin.int_(30000)];

	Sk.builtins.hcsr04_getUltrasonicData = function (trig, echo, data, timeout_us) {
		if (trig !== undefined && echo !== undefined) {
			$('#read-digital_' + echo.pin).hide();
			Sk.builtin.pyCheckArgsLen('hcsr04_getUltrasonicData', arguments.length, 2, 4);
			Sk.builtin.pyCheckType('data', 'string', Sk.builtin.checkString(data));
			Sk.builtin.pyCheckType('timeout_us', 'integer', Sk.builtin.checkInt(timeout_us));
			const pins = Blockly.Constants.Pins.GALAXIA_PINS;
			const id = '#hcsr04_' + trig.pin;
			if (trig.pin !== echo.pin) {
				$(id)
					.find('.subtitle-module')
					.html(pins.find((p) => p[1] == 'p' + trig.pin)[0] + ' / ' + pins.find((p) => p[1] == 'p' + echo.pin)[0]);
			} else {
				throw new Sk.builtin.AttributeError('[HCSR04] trig and echo cannot be on same pin (' + pins.find((p) => p[1] == 'p' + trig.pin)[0] + ')');
			}
			const duration = $(id + '_slider_d').slider('option', 'value');
			if (data.v == 'distance') {
				return new Sk.builtin.float_(roundFloat(((343 * duration * 1e-6) / 2) * 100, 2));
			} else if (data.v == 'duration') {
				return new Sk.builtin.float_(roundFloat(duration, 1));
			} else {
				throw new Sk.builtin.ValueError("Data option '" + data.v + "' is not valid");
			}
		} else {
			throw new Sk.builtin.ValueError("Pin '" + trig.pin + "' or '" + echo.pin + "' is not valid");
		}
	};
	Sk.builtins.hcsr04_getUltrasonicData.co_varnames = ['trig', 'echo', 'data', 'timeout_us'];
	Sk.builtins.hcsr04_getUltrasonicData.$defaults = [new Sk.builtin.str('distance'), new Sk.builtin.int_(30000)];

	// pitch

	Sk.builtins.pitch = function (Pin, frequency, duration) {
		const module = Simulator.getModuleByKey('buzzer');
		const stopMusic = function (self) {
			if (self._data.osc) {
				self._data.osc.stop();
				delete self._data.osc;
				Simulator.setAnimator(module, module.id + '_' + Pin.pin, 0);
			}
		};
		const startOscillator = function (self, freq) {
			const volume = self._data.audioCtx.createGain();
			volume.connect(self._data.audioCtx.destination);
			volume.gain.value = self._data.volume;
			self._data.osc = self._data.audioCtx.createOscillator();
			self._data.osc.type = 'sine';
			self._data.osc.frequency.value = freq;
			self._data.osc.connect(volume);
			self._data.osc.start();
		};
		let self = {
			_data: {
				volume: 1,
				audioCtx: null,
			},
		};

		if (duration === undefined) {
			duration = 1000;
		} else {
			duration = duration.v;
		}
		return new Sk.misceval.promiseToSuspension(
			new Promise(async function (resolve) {
				if (!self._data.audioCtx) {
					self._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
					Simulator.audioContext = self._data.audioCtx;
				}
				if (self._data.osc) {
					stopMusic(self);
				}
				Simulator.setAnimator(module, module.id + '_' + Pin.pin, frequency.v);

				startOscillator(self, frequency.v);
				if (duration > 0) {
					await sleep_ms(duration + 50);
					stopMusic(self);
					resolve();
				}
				if (Simulator.stop_flag) {
					stopMusic(self);
					resolve();
				}
			})
		);
	};
};

Simulator.Mosaic.groveRegex = {
	// digital readers
	'read-digital': /(^(?!.*ADC\()| )(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.IN(?!, id=.*)(,|\))/gi,
	// analog readers
	'read-analog': /(pinADC\(([0-9]{1,2})|(machine.|)ADC\((machine.|)Pin\(([0-9]{1,2})\),)\)/g,
	// digital writers
	'write-digital': /(^(?!.*ADC\()| )(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.OUT(?!, id=.*)/gi,
	// analog writers
	'write-analog': /(machine.|)DAC\((machine.|)Pin\(([0-9]{1,2})(?!, bits=.*)\)/gi,
	// pwm
	"pwm": /(machine.|)PWM\((machine.|)Pin\([0-9]{1,2}/gi,

	// I2C modules
	"lcdGrove": /(.|)LCD1602\(/gi,
	"oled": /SSD1306_I2C\(./gi,
	"sgp30": /(.|)SGP30\(/gi,
	"multichannel": /(.|)GAS\(/gi,
	"scd30-co2": /scd30_read\(0\)/gi,
    "scd30-temp": /scd30_read\(1\)/gi,
    "scd30-hum": /scd30_read\(2\)/gi,
	"hm330x": /(.|)HM330X\(/g,
	'bmp280-temp': /(.|)BMP280\(/gi,
	'bmp280-press': /(.|)BMP280\(/gi,
	'bmp280-alt': /(.|)BMP280\(/gi,
	"si1145": /(.|)SI1145\(/gi,
	"vl53l0x": /(.|)VL53L0X\(/gi,
	'th02-hum': /(.|)TH02\(/gi,
	'th02-temp': /(.|)TH02\(/gi,
	'sht31-hum': /(.|)SHT31\(/gi,
	'sht31-temp': /(.|)SHT31\(/gi,

	// Pins on module - inputs
	"gps": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.IN, id="gps"/gi,
	// Pins on module - outputs
	"openlog": /Lecteur SD TX on p([0-9]{1,2})/gi,
	"RGBLed": /CHAINABLE_LED_COUNT_((A|D|)[0-9]{1,2})( |)=/gi,
	// "Buzzer": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.OUT, id="buzzer"/gi
};

Simulator.Mosaic.specific = {
	senseHatEvent: {
		senseHat: null,

        joystickInitiated: false,

		joystickEvent: {},
		joystickEventTriggered: false,

		joystickDownListener: function (arrow, cls) {
			return function () {
				arrow.classList.add(cls);
                Simulator.Mosaic.specific.senseHatEvent.joystickEvent = {
                    direction: arrow.id,
                    action: 'pressed'
                };
				// console.log(Simulator.Mosaic.specific.senseHatEvent.joystickEvent);
                Simulator.Mosaic.specific.senseHatEvent.joystickEventTriggered = true;
            };
		},
		
		joystickUpListener: function (arrow, cls) {
			return function () {
				arrow.classList.remove(cls);
				Simulator.Mosaic.specific.senseHatEvent.joystickEvent = {
                    direction: arrow.id,
                    action: 'released'
                };
				// console.log(Simulator.Mosaic.specific.senseHatEvent.joystickEvent);
				Simulator.Mosaic.specific.senseHatEvent.joystickEventTriggered = true;
			};
		},

		resetJoystickListener: function () {
			Simulator.Mosaic.specific.senseHatEvent.joystickEventTriggered = false;
			if (this.senseHat !== null) {
				const joystick_arrows = document.getElementById('joystick_arrows');
				const arrows = joystick_arrows.querySelectorAll('polygon');
				arrows.forEach((arrow) => {
					const mouseDownListener = this.joystickDownListener(arrow, 'cls-2');
            		const mouseUpListener = this.joystickUpListener(arrow, 'cls-2');
					
					arrow.removeEventListener('mousedown', mouseDownListener);
            		arrow.removeEventListener('mouseup', mouseUpListener);
				});
				const board = document.getElementById('board-viewer').contentDocument;
				const boardJoystickArray = ['_up', '_down', '_left', '_right'];
				for (let i=0; i<boardJoystickArray.length; i++) {
					const element = board.getElementById("joystick"+boardJoystickArray[i]);
					const path = element.querySelector('path')
					const mouseDownListener = senseHat.joystickDownListener(path);
					const mouseUpListener = senseHat.joystickUpListener(path);

					path.removeEventListener('mousedown', mouseDownListener);
					path.removeEventListener('mouseup', mouseUpListener);
					
				}

			}

		},

		joystickModuleInit: function () {
			if (this.senseHat !== null) {
				const joystick_arrows = document.getElementById('joystick_arrows');
				const arrows = joystick_arrows.querySelectorAll('polygon');
				arrows.forEach((arrow) => {
					const mouseDownListener = this.joystickDownListener(arrow, 'cls-2');
            		const mouseUpListener = this.joystickUpListener(arrow, 'cls-2');
					
					arrow.addEventListener('mousedown', mouseDownListener);
            		arrow.addEventListener('mouseup', mouseUpListener);
				});
			}
		},
	},

	GrouvePiHat: {
		grouvePi: null,
	},

	extract: (str, func) =>
		str
			.split(func + '(')[1]
			.split(',')[0]
			.replace(')', ''),
	extractPin: {
		'write-digital': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
		'read-digital': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
		'write-analog': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
		'read-analog': (str) => (str.includes('pinADC') ? str.split('pinADC(')[1].replace(')', '') : Simulator.Mosaic.specific.extract(str, 'Pin')),
		pwm: (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
	},

	SERVER_REGEXP: /(import vitta_server|from vitta_server import (\*|SERVER))/,
	gesture: {
		ACCELEROMETER_GESTURES: ['shake', 'up', 'down', 'left', 'right', 'face up', 'face down', 'freefall', '3g', '6g', '8g'],
		history: null,
		init: function () {
			this.history = new Array();
		},
		resetOtherGestures: function (gesture) {
			this.history.push(gesture);
			for (var i = 0; i < this.ACCELEROMETER_GESTURES.length; i++) {
				const g = this.ACCELEROMETER_GESTURES[i];
				if (gesture !== g) {
					$('#galaxia-gesture-' + g.replace(/ /g, '') + '_slider').slider('value', 0);
				}
			}
		},
		getCurrentGesture: function () {
			for (var i = 0; i < this.ACCELEROMETER_GESTURES.length; i++) {
				const g = this.ACCELEROMETER_GESTURES[i];
				const state = $('#galaxia-gesture-' + g.replace(/ /g, '') + '_slider').slider('option', 'value');
				if (state == 1) {
					return g;
				}
			}
			return null;
		},
	},

	calculs: {
		getServoAngle(duty) {
			return (((duty / PWM_MAX_DUTY) * 100 - 2.5) * 180) / (12.5 - 2.5);
		},
		getServoSpeed(duty) {
			const GAP = 14;
			if (duty >= 90 - GAP) {
				return ((duty + GAP) / 90 - 1) * 100;
			} else if (duty < 90 - GAP) {
				return -((duty + GAP) / 90 - 1) * 100;
			}
		},
	},

	buttons: {
		up: 0,
		down: 0,
		left: 0,
		right: 0,
		middle: 0,
	},

	createSliders: function () {
		$('.mod_dht11-temp').slider({
			min: 0,
			max: 50,
			value: 20,
			step: 0.1,
		});
		$('.mod_dht11-hum').slider({
			min: 20,
			max: 80,
			value: 50,
			step: 0.1,
		});
		$('#sense-hat-temp_slider,' + '#sense-hat-temp-hum_slider').slider({
			min: 0,
			max: 100,
			value: 30,
		});
		$('#sense-hat-hum_slider').slider({
			min: 20,
			max: 100,
			value: 50,
			step: 0.1,
		});

		$('#sense-hat-pressure_slider').slider({
			min: 20,
			max: 100,
			value: 50,
			step: 0.1,
		});
		$('#sense-hat-pressure_slider').slider({
			min: 30000,
			max: 110000,
			value: 101300,
		});
		$('#sense-hat-alt_slider').slider({
			min: 30000,
			max: 110000,
			value: 38700,
		});
		$('.mod_ultrasonic_t,' +
            '.mod_ultrasonic_d').slider({
                min: 88,
                max: 14575,
                value: 1166,
                step: 0.1
            });
	},

	calculs: {
		getServoAngle(duty) {
			return (((duty / PWM_MAX_DUTY) * 100 - 2.5) * 180) / (12.5 - 2.5);
		},
		getServoSpeed(duty) {
			const GAP = 14;
			if (duty >= 90 - GAP) {
				return ((duty + GAP) / 90 - 1) * 100;
			} else if (duty < 90 - GAP) {
				return -((duty + GAP) / 90 - 1) * 100;
			}
		},
	},

	definitions: [
		{
            id: "ultrasonic",
            title: "Télémètre: ",
            pin: 'pin n° ',
            pins: 'digital',
            type: 'input',
            noCombine: true,
            codeFlag: 'Ultrasonic',
            listeners: [{
                default: 20,
                unit: 'cm',
                color: "#f9d142 ",
                suffix: "_d",
                title: "Distance"
            }, {
                suffix: "_t",
                default: 1166,
                unit: 'μs',
                color: "#f9d142",
                title: "Durée"
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.opacity(14575, 0, text = value);
                const t = Animator.value;
                Animator.updateListeners({
                    "_d": roundFloat(Simulator.Mosaic.grove.calculs.getDistance(t), 1),
                    "_t": t
                }, callbackAnim);
            }
        },
		{
			regex: /sense.stick_wait_for_event/g,
			id: 'sense-hat-joystick',
			title: 'SenseHat - Joystick',
			pin: 'SenseHat',
			type: 'input',
			picture: 'sensehat_joystick_module.svg',
		},
		{
			regex: /get_pressure/g,
			id: 'sense-hat-pressure',
			title: 'SenseHat - Pression',
			pin: 'SenseHat',
			type: 'input',
			listeners: [
				{
					suffix: '',
					default: 995,
					unit: 'mbar',
					color: '#f9d142',
				},
			],
			multiple: ['bmp280-temp', 'bmp280-alt'],
			picture: 'Accélerateur.png',
			pictureAnimation: 'Accelérateur-animation.png',
			animate: function (Animator) {
				const textPress = (press) => {
					return roundFloat(press / 100, 1);
				};
				const textAlt = (press) => {
					return Simulator.Mosaic.grove.calculs.getAltitude(press);
				};
				Animator.updateInvertedCouple(['-pressure', '-alt'], [110000, 30000], [textPress, textAlt], false);
			},
		},
		{
			regex: /get_pressure/g,
			id: 'sense-hat-alt',
			title: 'SenseHat - Altitude',
			pin: 'Altitude (pression)',
			type: 'input',
			listeners: [
				{
					suffix: '',
					default: 2000,
					unit: 'm',
					color: '#1a6da8',
				},
			],
			multiple: ['sense-hat-pressure', 'sense-hat-alt'],
			picture: 'Accélerateur.png',
			pictureAnimation: 'Accelérateur-animation.png',
			animate: function (Animator) {
				const textPress = (press) => {
					return roundFloat(press / 100, 1);
				};
				const textAlt = (press) => {
					return Simulator.Mosaic.grove.calculs.getAltitude(press);
				};
				Animator.updateInvertedCouple(['-alt', '-pressure'], [30000, 110000], [textPress, textAlt], true);
			},
		},

		{
			regex: /get_humidity/g,
			id: 'sense-hat-hum',
			title: 'Humidité',
			pin: 'SenseHat',
			type: 'input',
			listeners: [
				{
					suffix: '',
					default: 50,
					unit: '%',
					color: '#ff4d6a',
				},
			],
			class: 'cloud',
			picture: 'CO2-COV.png',
			pictureAnimation: 'cloud-animation.png',
			animate: function (Animator) {
				Animator.opacity(20, 80);
			},
		},
		{
			regex: /get_temperature\(/g,
			id: 'sense-hat-temp',
			title: 'Temperature',
			pin: 'SenseHat',
			type: 'input',
			listeners: [
				{
					suffix: '',
					default: 20,
					unit: '°C',
					color: '#ff4d6a',
				},
			],
			class: 'gauge',
			picture: 'Temperature_pression_altitude.png',
			pictureAnimation: 'Temperature-animation.png',
			animate: function (Animator) {
				Animator.gauge();
			},
		},
		{
			regex: /temperature_from_humidity\(/g,
			id: 'sense-hat-temp-hum',
			title: "Temperature (capteur d'humidité)",
			pin: 'SenseHat',
			type: 'input',
			listeners: [
				{
					suffix: '',
					default: 20,
					unit: '°C',
					color: '#ff4d6a',
				},
			],
			class: 'gauge',
			picture: 'Temperature_pression_altitude.png',
			pictureAnimation: 'Temperature-animation.png',
			animate: function (Animator) {
				Animator.gauge();
			},
		},
		{
			regex: /DHT\(/g,
			id: 'dht11-temp',
			title: 'DHT11 - Température',
			pin: 'pin n° ',
			pins: 'PWM',
			type: 'input',
			// codeFlag: 'DHT11',
			noCombine: true,
			listeners: [
				{
					suffix: '',
					default: 20,
					unit: '°C',
					color: '#ff4d6a',
				},
			],
			multiple: ['dht11-hum'],
			class: 'gauge',
			picture: 'Temperature_pression_altitude.png',
			pictureAnimation: 'Temperature-animation.png',
			animate: function (Animator) {
				Animator.gauge();
			},
		},
		{
			regex: /DHT\(/g,
			id: 'dht11-hum',
			title: 'DHT11 - Humidité',
			pin: 'pin n° ',
			pins: 'PWM',
			type: 'input',
			// codeFlag: 'DHT11',
			noCombine: true,
			listeners: [
				{
					suffix: '',
					default: 50,
					unit: '%',
					color: '#ff4d6a',
				},
			],
			multiple: ['dht11-temp'],
			class: 'cloud',
			picture: 'CO2-COV.png',
			pictureAnimation: 'cloud-animation.png',
			animate: function (Animator) {
				Animator.opacity(20, 80);
			},
		},
		{
			regex: /NeoPixel\(/g,
			id: 'neopixel',
			title: 'Neopixel',
			// codeFlag: "Neopixel",
			pin: 'pin n° ',
			pins: 'PWM',
			type: 'output',
			value: '',
		},

		{
			// regex: /linky\.get_data\(/,
			id: 'linky',
			title: 'Capteur linky',
			pin: 'pin n°',
			pins: 'analog',
			type: 'input',
			codeFlag: 'Linky',
			listeners: [
				{
					default: 500,
					unit: 'Wh',
					color: '#f8a10f',
					suffix: '_PAPP',
					title: 'PAPP',
				},
				{
					default: 500,
					unit: 'Wh',
					color: '#f8a10f',
					suffix: '_HCHC',
					title: 'HCHC',
				},
				{
					default: 500,
					unit: 'Wh',
					color: '#f8a10f',
					suffix: '_HCHP',
					title: 'HCHP',
				},
			],
			class: 'gauge',
			picture: 'Relais.png',
			pictureAnimation: 'Relais-animation.png',
			animate: function (Animator) {
				Animator.gauge();
				$(Animator.animId).css({ 'z-index': 100, height: '27px', width: '13px', 'margin-top': '11px', 'margin-left': '2px' });
			},
		},

		{
			regex: /Pin\(([0-9]{1,2}),( |)(mode=|)Pin.IN, id="bluetooth"/gi,
			id: 'bluetooth',
			title: 'Bluetooth',
			pin: 'UART',
			codeFlag: 'Bluetooth',
			type: 'output',
			value: '',
			picture: '',
		},
	],
};
