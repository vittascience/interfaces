Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /(A|D|)[0-9]{1,2}/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
	pin = pin.trim();
	const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
	return {
		name: pins.find(p => (p[1] == pin || p[0] == pin))[0],
		id: pin
	};
};

Simulator.Mosaic.externalLibraries = {
	init: function () {
		this.includes = LIBRARIES_H;
		this.includes["Arduino.h"] = ARDUINO_H;
		this.includes["Vittascience.h"] = VITTASCIENCE_H;
	},
	includes: {}
};

Simulator.Mosaic.groveRegex = {
	// digital readers
	"read-digital": /digitalRead\(((A|)[0-9]{1,2})\)/gi,
	// digital writers
	"write-digital": /digitalWrite\((?!13)([A]{0,1}[0-9]{1,2}),.*\)/gi,
	// analog readers
	"read-analog": /analogRead\((A[0-9]{1})\)/gi,
	// analog writers
	"write-analog": /analogWrite\(([0-9]{1,2}),.*\)/gi,
	// I2C modules
	"lcdGrove": /rgb_lcd.h/gi,
	"lcd": /LiquidCrystal_I2C.h/,
	"oled": /SeeedOLED.h/gi,
	"bmp280-temp": /Adafruit_BMP280_I2C.h/gi,
	"bmp280-press": /Adafruit_BMP280_I2C.h/gi,
	"bmp280-alt": /Adafruit_BMP280_I2C.h/gi,
	"sgp30": /Adafruit_SGP30.h/gi,
	"multichannel": /MutichannelGasSensor.h/gi,
	"hm330x": /Seeed_HM330X.h/g,
	"scd30-co2": /scd30_read\(0\)/gi,
	"scd30-temp": /scd30_read\(1\)/gi,
	"scd30-hum": /scd30_read\(2\)/gi,
	"th02-temp": /TH02_dev.h/gi,
	"th02-hum": /TH02_dev.h/gi,
	"sht31-temp": /SHT31.h/gi,
	"sht31-hum": /SHT31.h/gi,
	"si1145": /Adafruit_SI1145.h/gi,
	"colorSensor": /Adafruit_TCS34725.h/g,
	"gestureSensor": /paj7620.h/gi,
	"rtc": /DS1307.h/gi,
	// analog read
	"dioxygen": /PIN_DIOXYGEN_SENSOR_(A[0-9]{1,2})/gi,
	"groveSound": /PIN_SOUND_SENSOR_(A[0-9]{1,2})/g,
	"groveTemp": /PIN_TEMPERATURE_SENSOR_(A[0-9]{1,2})/g,
	"groveMoisture": /PIN_MOISTURE_SENSOR_(A[0-9]{1,2})/g,
	"mq135": /PIN_MQ135_(A[0-9]{1,2})/g,
	"airQuality": /PIN_AIR_QUALITY_SENSOR_(A[0-9]{1,2})/g,
	"highTemp-room": /PIN_HIGH_TEMPERATURE_ROOM_(A[0-9]{1,2})/g,
	"highTemp-thmc": /PIN_HIGH_TEMPERATURE_THMC_(A[0-9]{1,2})/g,
	"groveWater": /PIN_WATER_SENSOR_(A[0-9]{1,2})/g,
	"groveLight": /PIN_LIGHT_SENSOR_(A[0-9]{1,2})/g,
	"groveForce": /PIN_FORCE_SENSOR_(A[0-9]{1,2})/g,
	"grovePulse": /PIN_PULSE_SENSOR_(A[0-9]{1,2})/g,
	"potentiometer": /PIN_POTENTIOMETER_(A[0-9]{1,2})/g,
	"groveVoltageDivider": /PIN_VOLTAGE_DIVIDER_(A[0-9]{1,2})/g,
	// digital read
	"button": /PIN_SIMPLE_BUTTON_((A|D|)[0-9]{1,2})/g,
	"switchButton": /PIN_SWITCH_BUTTON_((A|D|)[0-9]{1,2})/g,
	"touchButton": /PIN_TOUCH_BUTTON_((A|D|)[0-9]{1,2})/g,
	"rainGauge": /PIN_RAIN_GAUGE_((A|D|)[0-9]{1,2})/g,
	"anemometer": /PIN_ANEMOMETER_((A|D|)[0-9]{1,2})/g,
	"groveFinder": /PIN_LINE_FINDER_((A|D|)[0-9]{1,2})/g,
	"groveTilt": /PIN_TILT_SENSOR_((A|D|)[0-9]{1,2})/g,
	"groveMotion": /PIN_MOTION_SENSOR_((A|D|)[0-9]{1,2})/g,
	"groveVibration": /PIN_VIBRATION_SENSOR_((A|D|)[0-9]{1,2})/g,
	"dht11-temp": /PIN_DHT11_SENSOR_((A|D|)[0-9]{1,2})/gi,
	"dht11-hum": /PIN_DHT11_SENSOR_((A|D|)[0-9]{1,2})/gi,
	"dht22-temp": /PIN_DHT22_SENSOR_((A|D|)[0-9]{1,2})/gi,
	"dht22-hum": /PIN_DHT22_SENSOR_((A|D|)[0-9]{1,2})/gi,
	"dustSensor": /PIN_DUST_SENSOR_((A|D|)[0-9]{1,2})/g,
	"ultrasonic": /PIN_ULTRASONIC_((A|D|)[0-9]{1,2})/gi,
	"hcsr04": /PIN_ULTRASONIC_TRIG_((A|D|)[0-9]{1,2})/gi,
	"ds18x20": /PIN_DS18X20_SENSOR_((A|D|)[0-9]{1,2})/g,
	// digital write
	"ledModule": /PIN_LED_MODULE_((A|D|)[0-9]{1,2})/gi,
	"neopixel": /Neopixel_((A|)[0-9]{1,2});/g,
	"tm1637": /PIN_4_DIGIT_DISPLAY_CLK_((A|D|)[0-9]{1,2})/gi,
	"ledBar": /PIN_LED_BAR_DI_((A|D|)[0-9]{1,2})/gi,
	"colorVariableLed": /PIN_VARIABLE_COLOR_LED_((A|D|)[0-9]{1,2})/g,
	"RGBLed": /CHAINABLE_LED_COUNT_((A|D|)[0-9]{1,2}) /gi,
	"relay": /PIN_GROVE_RELAY_((A|D|)[0-9]{1,2})/gi,
	"buzzer": /PIN_BUZZER_((A|D|)[0-9]{1,2})/gi,
	"atomizer": /PIN_WATER_ATOMIZER_((A|D|)[0-9]{1,2})/gi,
	"electromagnet": /PIN_ELECTROMAGNET_((A|D|)[0-9]{1,2})/gi,
	"vibrationMotor": /PIN_VIBRATION_MOTOR_((A|D|)[0-9]{1,2})/gi,
	"openlog": /OpenLog_((A|D|)[0-9]{1,2})/g,
	"hm10": /PIN_HM10_RX/g,
	"groveBT": /PIN_BT_RX/g,
	// pwm
	"servo": /PIN_SERVO_((A|D|)[0-9]{1,2})/g,
	"continuousServo": /PIN_CONTINUOUS_SERVO_((A|D|)[0-9]{1,2})/g,
	// pin functions
	"mhz19-co2": /mhz19_/gi,
	"mhz19-temp": /mhz19_/gi,
	"remote": /remoteNEC_getButton\(/gi,
	"mpx5700": /mpx5700_readPressure\((A[0-9]{1,2})/gi,
	"groveUV": /getUVindex\((A[0-9]{1,2})/g,
	"i2cMotor1": /motor_speed\(1/gi,
	"i2cMotor2": /motor_speed\(2/gi,
	"i2cMotorStepper": /motor_StepperRun\(/gi,
	"groveMP3": /PIN_MP3_PLAYER_(R|T)X/g
};

Simulator.Mosaic.addSpecificInitializations = async function () {
	await Simulator.waitBoardViewer();
	if (Simulator.board.name !== 'Shield Grove') {
		const board = document.getElementById("board-viewer").contentDocument;
		const up = 'translate(0px, 0px)',
			down = 'translate(0px, 7px)';
		var resetBtnId = "",
			resetBtnAnimId = "";
		if (Simulator.board.name === 'Arduino UNO') {
			// Arduino UNO Reset button
			resetBtnId = "reset_button";
			resetBtnAnimId = "ellipse-top";
		} else {
			// Arduino NANO Reset button
			resetBtnId = "reset";
			resetBtnAnimId = "reset_on";
		}
		if (board !== null) {
			const resetBtn = board.querySelector("#" + resetBtnId);
			resetBtn.addEventListener("mousedown", function () {
				const board = document.getElementById("board-viewer").contentDocument;
				board.querySelector("#" + resetBtnAnimId).style.transform = down;
			});
			resetBtn.addEventListener("mouseup", function () {
				const board = document.getElementById("board-viewer").contentDocument;
				board.querySelector("#" + resetBtnAnimId).style.transform = up;
				Simulator.replay();
			});
			resetBtn.addEventListener("touchstart", function () {
				const board = document.getElementById("board-viewer").contentDocument;
				board.querySelector("#" + resetBtnAnimId).style.transform = down;
			});
			resetBtn.addEventListener("touchend", function () {
				const board = document.getElementById("board-viewer").contentDocument;
				board.querySelector("#" + resetBtnAnimId).style.transform = up;
				Simulator.replay();
			});
		}
	}
};

Simulator.Mosaic.specific = {

	extractPin: {
		'read-digital': (str) => str.replace('digitalRead(', "").replace(')', ""),
		'write-digital': (str) => str.replace('digitalWrite(', "").split(',')[0],
		'read-analog': (str) => str.replace('analogRead(', "").replace(')', ""),
		'write-analog': (str) => str.replace('analogWrite(', "").split(',')[0]
	},

	calculs: {
		getServoSpeed: function (angle) {
			if (angle > 90 || angle < 90) {
				return (angle / 90 - 1) * 100;
			}
			return 0
		},
		getServoSpeed: function (angle) {
			if (angle > 90 || angle < 90) {
				return (angle / 90 - 1) * 100;
			}
			return 0
		}
	},

	setLed: function (state) {
		const board = document.getElementById("board-viewer").contentDocument;
		if ((Simulator.board.name == "Arduino UNO" || Simulator.board.name == "Arduino NANO") && board !== null) {
			const led = board.querySelector("#ar-led13");
			if (led !== null) {
				if (state) {
					led.style.fill = "red";
					led.style.filter = "blur(6px)";
				} else {
					led.style.fill = "";
				}
			}
		}
	},

	createSliders: function () {

		$('#gestureSensor_slider_r,' +
			'#gestureSensor_slider_l,' +
			'#gestureSensor_slider_u,' +
			'#gestureSensor_slider_d,' +
			'#gestureSensor_slider_f,' +
			'#gestureSensor_slider_b,' +
			'#gestureSensor_slider_c,' +
			'#gestureSensor_slider_ac,' +
			'#gestureSensor_slider_w').slider({
				min: 0,
				max: 1,
				value: 0
			});

		$('#colorSensor_slider_r,' +
			'#colorSensor_slider_g,' +
			'#colorSensor_slider_b').slider({
				min: 0,
				max: 255,
				value: 0
			});

		$('#mhz19-co2_slider').slider({
			min: 0,
			max: 2000,
			value: 100,
		});

		$('#mhz19-temp_slider').slider({
			min: 0,
			max: 50,
			value: 20,
		});

		$('.mod_dustSensor').slider({
			min: 0,
			max: 2507800,
			value: 383400
		});

		$('#multichannelV2_slider_GM102B').slider({
			min: 0,
			max: 10,
			value: 5,
			step: 0.1
		});

		$('#multichannelV2_slider_GM702B').slider({
			min: 0,
			max: 5000,
			value: 1000
		});

		$('#multichannelV2_slider_GM302B,' +
			'#multichannelV2_slider_GM502B').slider({
				min: 0,
				max: 500,
				value: 250
			});
	},

	definitions: [
		{
			id: "multichannelV2",
			regex: /multichannel_v2_getGM(702|102|302|502)B/gi,
			title: "Capteur de gas : ",
			pin: 'I2C',
			type: 'input',
			listeners: [{
				suffix: "_GM102B",
				unit: 'ppm',
				color: "#ff4d6a",
				title: "NO2"
			}, {
				suffix: "_GM702B",
				unit: 'ppm',
				color: "#f9d142",
				title: "CO"
			}, {
				suffix: "_GM302B",
				unit: 'ppm',
				color: "#1a6da8",
				title: "C2H5OH"
			}, {
				suffix: "_GM502B",
				unit: 'ppm',
				color: "#1a6da8",
				title: "VOC"
			}],
			class: "particles",
			picture: "CO2-COV.png",
			pictureAnimation: "particles-animation.png",
			animate: function (Animator) {
				const MULTICHANNEL_V2_GAS_MAX_VALUE = {
					"GM102B": 10, // NO2
					"GM702B": 5000, // CO
					"GM302B": 500,  // C2H5OH
					"GM502B": 500   // VOC
				};
				Animator.opacity(0, MULTICHANNEL_V2_GAS_MAX_VALUE[Animator.valueId.split('_')[2]]);
			}
		},
		{
			id: "arduino-led13",
			regex: /digitalWrite\(13,.*\)/gi,
			title: "LED intégrée",
			pin: 'pin n°',
			type: 'output',
			value: 0,
			picture: "LED.png",
			pictureAnimation: "LED-animation.png",
			animate: function (Animator) {
				Animator.led();
				Simulator.Mosaic.specific.setLed(Animator.value);
			}
		},
		{
			id: "groveMP3",
			title: "MP3 v3.0",
			pin: 'RX / TX',
			value: "",
			pins: 'digital',
			type: 'output',
			picture: "mp3_player.png"
		},
		{
			id: "lcd",
			title: "Ecran LCD",
			pin: 'I2C',
			type: 'output',
			value: "",
			picture: null
		},
		{
			id: "remote",
			title: "Lecture digitale",
			pin: 'pin n° ',
			type: "input",
			buttons: [{
				default: 0,
				unit: '',
				color: "#f9d142 ",
				suffix: "_1"
			}, {
				default: 0,
				unit: '',
				color: "#f9d142 ",
				suffix: "_2"
			}, {
				default: 0,
				unit: '',
				color: "#f9d142 ",
				suffix: "_3"
			}],
			class: "button",
			picture: "Bouton.png",
			pictureAnimation: "Bouton-animation.png",
			pictureInteraction: "buttonPush"
		},
		{
			id: "rtc",
			title: "Horloge",
			pin: 'I2C',
			type: 'output',
			value: "",
			picture: null
		},
		{
			id: "mhz19-co2",
			title: "Capteur MHZ19 - CO2",
			pin: 'RX / TX',
			type: "input",
			color: "#22b573",
			listeners: [{
				suffix: "",
				default: 100,
				unit: ' ppm',
				color: "#ff4d6a",
			}],
			class: "particles",
			picture: "CO2-COV.png",
			pictureAnimation: "particles-animation.png",
			animate: function (Animator) {
				Animator.opacity(0, 2000);
			}
		},
		{
			id: "mhz19-temp",
			title: "Capteur MHZ19 - Température",
			pin: 'RX / TX',
			type: "input",
			color: "#22b573",
			listeners: [{
				suffix: "",
				default: 20,
				unit: ' °C',
				color: "#f9d142",
			}],
			class: 'gauge',
			picture: "Temperature-Pression-Altitude.png",
			pictureAnimation: "Temperature-animation.png",
			animate: function (Animator) {
				const callbackAnim = (value) => Animator.gauge(value);
				const t = Animator.value;
				Animator.updateListeners({
					"": roundFloat(t, 1)
				}, callbackAnim);
			}
		},
		{
			id: "colorSensor",
			title: "Capteur de couleurs - ",
			pin: 'I2C',
			type: "input",
			color: "#22b573",
			listeners: [{
				suffix: "_r",
				default: 0,
				unit: '',
				color: "#dc3545",
				title: "R"
			},
			{
				suffix: "_g",
				default: 0,
				unit: '',
				color: "#22b573",
				title: "G"
			},
			{
				suffix: "_b",
				default: 0,
				unit: '',
				color: "#3fa9f5",
				title: "B"
			}
			],
			class: 'RGB-circle',
			pictureAnimation: "Transparent.png",
			animate: function (Animator) {
				const r = $(Animator.sliderId.replace(/_(g|b)/, '_r')).slider('option', 'value');
				const g = $(Animator.sliderId.replace(/_(b|r)/, '_g')).slider('option', 'value');
				const b = $(Animator.sliderId.replace(/_(r|g)/, '_b')).slider('option', 'value');
				$(Animator.animId).css('background-color', "rgb(" + r + "," + g + "," + b + ")");
				$(Animator.valueId).html(Animator.value);
			}
		},
		{
			id: "gestureSensor",
			title: "Geste : ",
			pin: 'I2C',
			type: "input",
			listeners: [{
				suffix: "_r",
				default: 0,
				unit: ' ',
				color: "#f9d142 ",
				title: "Droite"
			},
			{
				suffix: "_l",
				default: 0,
				unit: ' ',
				color: "#f9d142",
				title: "Gauche"
			},
			{
				suffix: "_u",
				default: 0,
				unit: ' ',
				color: "#f9d142",
				title: "Haut"
			},
			{
				suffix: "_d",
				default: 0,
				unit: ' ',
				color: "#f9d142",
				title: "Bas"
			},
			{
				suffix: "_f",
				default: 0,
				unit: ' ',
				color: "#f9d142",
				title: "En avant"
			},
			{
				suffix: "_b",
				default: 0,
				unit: ' ',
				color: "#f9d142",
				title: "En arrière"
			},
			{
				suffix: "_c",
				default: 0,
				unit: ' ',
				color: "#f9d142",
				title: "Sens horaire"
			},
			{
				suffix: "_ac",
				default: 0,
				unit: ' ',
				color: "#f9d142",
				title: "Sens anti-horaire"
			},
			{
				suffix: "_w",
				default: 0,
				unit: ' ',
				color: "#f9d142",
				title: "Vague"
			}
			],
			picture: "Capteur de gestes.png",
		},
		{
			id: "vibrationMotor",
			title: "Moteur de vibrations",
			pin: 'pin n° ',
			type: 'output',
			value: 0,
			picture: "LED.png",
			pictureAnimation: "LED-animation.png",
			animate: function (Animator) {
				Animator.led();
			}
		},
		{
			id: "i2cMotor1",
			title: "Shield - Moteur 1",
			pin: 'I2C',
			type: 'output',
			value: 0,
			picture: "Motor.png",
			pictureAnimation: "Motor-animation.png"
		},
		{
			id: "i2cMotor2",
			title: "Shield - Moteur 2",
			pin: 'I2C',
			type: 'output',
			value: 0,
			picture: "Motor.png",
			pictureAnimation: "Motor-animation.png"
		},
		{
			id: "i2cMotorStepper",
			title: "Shield - Moteur pas à pas",
			pin: 'I2C',
			type: 'output',
			value: 0,
			picture: "Motor.png",
			pictureAnimation: "Motor-animation.png"
		},
		{
			id: "atomizer",
			title: "Atomiseur d'eau",
			pin: 'pin n° ',
			type: 'output',
			value: 0,
			picture: "LED.png",
			pictureAnimation: "LED-animation.png",
			animate: function (Animator) {
				Animator.led();
			}
		},
		{
			id: "electromagnet",
			title: "Electro-aimant",
			pin: 'pin n° ',
			type: 'output',
			value: 0,
			picture: "LED.png",
			pictureAnimation: "LED-animation.png",
			animate: function (Animator) {
				Animator.led();
			}
		},
		{
			id: "hm10",
			title: "HM10 (Bluetooth)",
			pin: 'RX / TX',
			pins: 'digital',
			type: 'output',
			codeFlag: 'Bluetooth HM10',
			value: null,
			picture: "bluetooth.svg",
			animate: function (Animator) {
				Animator.bluetooth();
			}
		},
		{
			id: "groveBT",
			title: "Grove Serial Bluetooth",
			pin: 'RX / TX',
			pins: 'digital',
			type: 'output',
			codeFlag: 'Grove Serial Bluetooth',
			value: null,
			picture: "bluetooth.svg",
			animate: function (Animator) {
				Animator.bluetooth();
			}
		}
	]
};