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
	'src/lib/nao.js': Simulator.PATH_LIB + 'nao.js',
	'src/lib/asr.js': Simulator.PATH_LIB + 'asr.js',
	'src/lib/leds_service.js': Simulator.PATH_LIB + 'leds_service.js',
	'src/lib/motion_service.js': Simulator.PATH_LIB + 'motion_service.js',
	'src/lib/game.js': Simulator.PATH_LIB + 'game.js',
	'src/lib/sensors_service.js': Simulator.PATH_LIB + 'sensors_service.js',
	'src/lib/sonar_service.js': Simulator.PATH_LIB + 'sonar_service.js',
	'src/lib/tts.js': Simulator.PATH_LIB + 'tts.js',
	'src/lib/game.js': Simulator.PATH_LIB + 'game.js',
};

Simulator.Mosaic.addSpecificInitializations = function () {
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () { };

Simulator.Mosaic.groveRegex = {};

Simulator.Mosaic.specific = {

	createSliders: function () { 
		$('#nao-sonar-right_slider,' +'#nao-sonar-left_slider').slider({
			min: 0,
			max: 100,
			value: 60,
		});
	},

	calculs: {},

	definitions: [
		{
			regex: /on_speech_recognized\(/,
			id: 'on_speech_recognized',
			title: 'ASR',
			pin: 'Speech Recognition',
			type: 'input',
			class: 'input',
		},
		{
			regex: /\.(Left|Right|)BumperPressed/,
			id: 'nao-bumper',
			title: 'Bumpers',
			picture: 'nao-feet-sensors.svg',
		},
		{
			regex: /\.(Front|Middle|Rear|)TactilTouched/,
			id: 'nao-tactil-head',
			title: 'Capteur tête',
			picture: 'nao-head-sensors.svg',
		},
		{
			regex: /\.HandLeft(Left|Right|Back|)Touched/,
			id: 'nao-tactil-left-hand',
			title: 'Capteurs Main Gauche',
			picture: 'nao-hand-left-sensors.svg',
		},

		{
			regex: /\.HandRight(Left|Right|Back)Touched/,
			id: 'nao-tactil-right-hand',
			title: 'Main Droite',
			picture: 'nao-hand-right-sensors.svg',
		},
		{
			regex: /\.SonarRight(NothingDetected|Detected)\(\)/,
			id: 'nao-sonar-right',
			title: 'Sonar Droit',
			pin: 'NAO',
			type: 'input',
			listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
			class: "ultrasonic",
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
		},
		{
			regex: /\.SonarLeft(NothingDetected|Detected)\(\)/,
			id: 'nao-sonar-left',
			title: 'Sonar Gauche',
			pin: 'NAO',
			type: 'input',
			listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
			class: "ultrasonic",
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
		}


	],
};
