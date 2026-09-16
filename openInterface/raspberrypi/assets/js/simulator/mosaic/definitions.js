Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
	const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
	const pinName = pins.find((p) => p[1] == pin);
	return {
		name: pinName ? pinName[0] : null,
		id: pin.replace('pin', ''),
	};
};

Simulator.Mosaic.externalLibraries = {
	// raspberry pi libraries
	'src/lib/adc.js': Simulator.PATH_LIB + 'grove/GroveADC.js',
	'src/lib/time.js': Simulator.PATH_LIB + 'time.js',
	'src/lib/board.js': Simulator.PATH_LIB + 'board.js',
	'src/lib/RPi/__init__.js': Simulator.PATH_LIB + 'RPi/__init__.js',
	'src/lib/RPi/GPIO/__init__.js': Simulator.PATH_LIB + 'RPi/GPIO/__init__.js',
	// external modules
	'src/lib/sense_hat.js': Simulator.PATH_LIB + 'sense_hat.js',
	'src/lib/rpi_ws281x.js': Simulator.PATH_LIB + 'rpi_ws281x.js',
	'src/lib/seeed_dht.js': Simulator.PATH_LIB + 'seeed_dht.js',
	'src/lib/w1thermsensor.js': Simulator.PATH_LIB + 'w1thermsensor.js',
	'src/lib/adafruit_bmp280.js': Simulator.PATH_LIB + 'adafruit_bmp280.js',
	// grove
	'src/lib/grove/__init__.js': Simulator.PATH_LIB + 'grove/__init__.js',
	'src/lib/grove/grove_i2c_color_sensor_v2/__init__.js': Simulator.PATH_LIB + 'grove/grove_i2c_color_sensor_v2/__init__.js',
	'src/lib/grove/grove_ultrasonic_ranger/__init__.js': Simulator.PATH_LIB + 'grove/grove_ultrasonic_ranger/__init__.js',
	// grove.display
	'src/lib/grove/display/__init__.js': Simulator.PATH_LIB + 'grove/display/__init__.js',
	'src/lib/grove/display/jhd1802/__init__.js': Simulator.PATH_LIB + 'grove/display/jhd1802/__init__.js',
	// grove.modules
	'src/lib/grove/modules/__init__.js': Simulator.PATH_LIB + 'grove/modules/__init__.js',
	'src/lib/grove/modules/sgp30/__init__.js': Simulator.PATH_LIB + 'grove/modules/sgp30/__init__.js',
};

// Specific to galaxia board buttons
Simulator.Mosaic.addSpecificInitializations = async function () {
	await Simulator.waitBoardViewer();
	if (Simulator.board.name === 'SenseHat') {
		const senseHat = Simulator.Mosaic.specific.senseHatEvent;
		senseHat.senseHat = true;

		// initialize joystick buttons
		const board = document.getElementById('board-viewer').contentDocument;
		const boardJoystickArray = ['_up', '_down', '_left', '_right'];
		for (let i = 0; i < boardJoystickArray.length; i++) {
			const element = board.getElementById("joystick" + boardJoystickArray[i]);
			const path = element.querySelector('path')
			const mouseDownListener = senseHat.joystickDownListener(path, 'cls-12');
			const mouseUpListener = senseHat.joystickUpListener(path, 'cls-12');

			path.addEventListener('mousedown', mouseDownListener);
			path.addEventListener('mouseup', mouseUpListener);

		}
	} else if (Simulator.board.name === "GrouvePi") {
		const GrouvePiHat = Simulator.Mosaic.specific.GrouvePiHat;
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
			$('#read-digital_' + echo.v).hide();
			Sk.builtin.pyCheckArgsLen('hcsr04_getUltrasonicData', arguments.length, 2, 4);
			Sk.builtin.pyCheckType('data', 'string', Sk.builtin.checkString(data));
			Sk.builtin.pyCheckType('timeout_us', 'integer', Sk.builtin.checkInt(timeout_us));
			const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
			const id = '#hcsr04_' + trig.v;
			if (trig.v == echo.v) {
				throw new Sk.builtin.AttributeError('[HCSR04] trig and echo cannot be on same pin (' + pins.find((p) => p[1] == trig.v)[0] + ')');
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
			throw new Sk.builtin.ValueError("Pin '" + trig.v + "' or '" + echo.v + "' is not valid");
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
	'read-digital': /(RPi.|)GPIO.input\((gpio|)([0-9]{1,2})\)/gi,
	'write-digital': /(RPi.|)GPIO.output\((gpio|)([0-9]{1,2}),( |)(RPi.|)GPIO.HIGH\)/gi,
	'pwm': /(RPi.|)GPIO.PWM\((gpio|)([0-9]{1,2}),/gi,

	// I2C modules
	"lcdGrove": /(.|)JHD1802\(/gi,
	"sgp30": /(.|)SGP30\(/gi,
	"scd30-co2": /SCD30\(/gi,
	"scd30-temp": /SCD30\(/gi,
	"scd30-hum": /SCD30\(/gi,
	'bmp280-temp': /(.|)Adafruit_BMP280_I2C\(/gi,
	'bmp280-press': /(.|)Adafruit_BMP280_I2C\(/gi,
	'bmp280-alt': /(.|)Adafruit_BMP280_I2C\(/gi,
	"si1145": /(.|)grove_si114x\(/gi,
	'sht31-hum': /(.|)SHT31\(/gi,
	'sht31-temp': /(.|)SHT31\(/gi,
	'colorSensor': /(.|)GroveI2cColorSensorV2\(/gi
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
				for (let i = 0; i < boardJoystickArray.length; i++) {
					const element = board.getElementById("joystick" + boardJoystickArray[i]);
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

	g1tank: {
		in1: 0,
		in2: 0,
		in3: 0,
		in4: 0,
		setMotorRPM: function (motor, rpm, direction) {
			const speed_cm_s = RobotSimulator.convertRPMtoSpeedMS(rpm) * 100; // to cm.s-1
			$('#g1tank-motor' + motor + '_value').html(Math.round(speed_cm_s * 10) / 10 + ' cm/s');
			if (direction != 'stop') {
				$('.g1tank-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / rpm) + 's infinite linear');
			} else {
				$('.g1tank-motor' + motor).css('animation', 'none');
			}
		},

		setMotorSpeedPercent: function (pin, speed) {
			const rpm = speed / 100 * RobotSimulator.robot.MAX_SPEED;
			if (pin == 16 && this.in1 && !this.in2) {
				this.setMotorRPM('Left', rpm, 'forward');
			} else if (pin == 16 && !this.in1 && this.in2) {
				this.setMotorRPM('Left', rpm, 'backward');
			} else if (pin == 13 && this.in3 && !this.in4) {
				this.setMotorRPM('Right', rpm, 'forward');
			} else if (pin == 13 && !this.in3 && this.in4) {
				this.setMotorRPM('Right', rpm, 'backward');
			} else {
				this.setMotorRPM(pin == 16 ? 'Left' : 'Right', 0, 'stop');
			}
		}
	},

	extract: (str, func) => str.split(func + '(')[1].split(',')[0].replace(')', '').replace('gpio', ''),
	extractPin: {
		'write-digital': (str) => Simulator.Mosaic.specific.extract(str, 'output'),
		'read-digital': (str) => Simulator.Mosaic.specific.extract(str, 'input'),
		pwm: (str) => Simulator.Mosaic.specific.extract(str, 'PWM'),
	},

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
		getDistance: function (round_trip_duration_us) {
			return 343 * round_trip_duration_us / 1e6 / 2 * 100;
		}
	},

	buttons: {
		up: 0,
		down: 0,
		left: 0,
		right: 0,
		middle: 0,
	},

	createSliders: function () {
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
		$('.mod_g1tank-buttonKey,' +
			'.mod_g1tank-lineFinder1,' +
			'.mod_g1tank-lineFinder2,' +
			'.mod_g1tank-lineFinder3,' +
			'.mod_g1tank-lineFinder4').slider({
				min: 0,
				max: 1
			});
	},

	definitions: [
		{
			regex: /sense.stick_wait_for_event/g,
			id: 'sense-hat-joystick',
			title: 'SenseHat - Joystick',
			pin: 'SenseHat',
			type: 'input',
			picture: 'sensehat_joystick_module.svg',
		},
		{
			regex: /senseHat_getPressure\(/g,
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
			regex: /senseHat_getPressure\(/g,
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
			regex: /sense.get_humidity\(/g,
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
			regex: /senseHat_getTemperature\(/g,
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
			id: "g1tank-led-red",
			title: "LED (rouge)",
			pin: 'pin n°',
			pins: 'PWM',
			type: 'output',
			noCombine: true,
			codeFlag: 'G1 Tank LED - red',
			value: [75, 75, 75],
			class: 'RGB-circle',
			pictureAnimation: "Transparent.png",
			animate: function (Animator) {
				const animEl = $("#g1tank-led-red_22_anim");
				const bg = animEl.css('background');
				const rgb = bg.match(/\d+/g).map(Number);
				rgb[0] = Animator.value * 255;
				const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
				animEl.css('background', color);
				$("#g1tank-led-green_27_anim").css('background', color);
				$("#g1tank-led-blue_24_anim").css('background', color);
			}
		},
		{
			id: "g1tank-led-green",
			title: "LED (verte)",
			pin: 'pin n°',
			pins: 'PWM',
			type: 'output',
			noCombine: true,
			codeFlag: 'G1 Tank LED - green',
			value: [75, 75, 75],
			class: 'RGB-circle',
			pictureAnimation: "Transparent.png",
			animate: function (Animator) {
				const animEl = $("#g1tank-led-green_27_anim");
				const bg = animEl.css('background');
				const rgb = bg.match(/\d+/g).map(Number);
				rgb[1] = Animator.value * 255;
				const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
				animEl.css('background', color);
				$("#g1tank-led-red_22_anim").css('background', color);
				$("#g1tank-led-blue_24_anim").css('background', color);
			}
		},
		{
			id: "g1tank-led-blue",
			title: "LED (bleue)",
			pin: 'pin n°',
			pins: 'PWM',
			type: 'output',
			noCombine: true,
			codeFlag: 'G1 Tank LED - blue',
			value: [75, 75, 75],
			class: 'RGB-circle',
			pictureAnimation: "Transparent.png",
			animate: function (Animator) {
				const animEl = $("#g1tank-led-blue_24_anim");
				const bg = animEl.css('background');
				const rgb = bg.match(/\d+/g).map(Number);
				rgb[2] = Animator.value * 255;
				const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
				animEl.css('background', color);
				$("#g1tank-led-red_22_anim").css('background', color);
				$("#g1tank-led-green_27_anim").css('background', color);
			}
		},
		{
			regex: /g1tank_control_motor/gi,
			id: "g1tank-motorLeft",
			title: "Moteur Gauche",
			pin: "G1 Tank",
			usedPins: ['19', '26', '13'],
			type: 'output',
			value: 0,
			picture: "Roue.png",
			pictureAnimation: "Roue-animation.png"
		},
		{
			regex: /g1tank_control_motor/,
			id: "g1tank-motorRight",
			title: "Moteur Droit",
			pin: "G1 Tank",
			usedPins: ['20', '21', '16'],
			type: 'output',
			value: 0,
			picture: "Roue.png",
			pictureAnimation: "Roue-animation.png"
		},
		{
			id: "g1tank-lineFinder1",
			title: "Capteur de ligne noire 1",
			pin: 'pin n°',
			pins: 'digital',
			type: 'input',
			noCombine: true,
			class: 'finder',
			codeFlag: 'Line Finder P1',
			listeners: [{
				default: 0,
				unit: '',
				color: "#f9d142",
				suffix: ""
			}],
			picture: "Capteur-ligne-line.png",
			pictureAnimation: "Capteur-ligne-anim.png",
			animate: function (Animator) {
				Animator.translation('digital');
			}
		},
		{
			id: "g1tank-lineFinder2",
			title: "Capteur de ligne noire 2",
			pin: 'pin n°',
			pins: 'digital',
			noCombine: true,
			type: 'input',
			class: 'finder',
			codeFlag: 'Line Finder P2',
			listeners: [{
				default: 0,
				unit: '',
				color: "#f9d142",
				suffix: ""
			}],
			picture: "Capteur-ligne-line.png",
			pictureAnimation: "Capteur-ligne-anim.png",
			animate: function (Animator) {
				Animator.translation('digital');
			}
		},
		{
			id: "g1tank-lineFinder3",
			title: "Capteur de ligne noire 3",
			pin: 'pin n°',
			pins: 'digital',
			noCombine: true,
			type: 'input',
			class: 'finder',
			codeFlag: 'Line Finder P3',
			listeners: [{
				default: 0,
				unit: '',
				color: "#f9d142",
				suffix: ""
			}],
			picture: "Capteur-ligne-line.png",
			pictureAnimation: "Capteur-ligne-anim.png",
			animate: function (Animator) {
				Animator.translation('digital');
			}
		},
		{
			id: "g1tank-lineFinder4",
			title: "Capteur de ligne noire 4",
			pin: 'pin n°',
			pins: 'digital',
			noCombine: true,
			type: 'input',
			class: 'finder',
			codeFlag: 'Line Finder P4',
			listeners: [{
				default: 0,
				unit: '',
				color: "#f9d142",
				suffix: ""
			}],
			picture: "Capteur-ligne-line.png",
			pictureAnimation: "Capteur-ligne-anim.png",
			animate: function (Animator) {
				Animator.translation('digital');
			}
		},
		{
			id: "g1tank-buttonKey",
			title: "Bouton KEY",
			pin: 'pin n°',
			pins: 'digital',
			type: 'input',
			codeFlag: 'G1 Tank KEY',
			releaser: true,
			listeners: [{
				default: "OFF",
				unit: '',
				color: "#f9d142",
				suffix: ""
			}],
			class: "button",
			picture: "Bouton.png",
			pictureAnimation: "Bouton-animation.png",
			animate: function (Animator) {
				const pull = Simulator.pinList.find((component) => component.id == Animator.id).pull;
				Animator.button(Animator.value, pull);
			}
		},
	],
};
