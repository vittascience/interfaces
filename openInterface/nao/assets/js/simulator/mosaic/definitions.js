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
			get title() { return i18next.t('code.simulator.modules.speechRecognition') },
			pin: 'Speech Recognition',
			type: 'input',
			class: 'input',
		},
		{
			regex: /\.(Left|Right|)BumperPressed/,
			id: 'nao-bumper',
			get title() { return i18next.t('code.simulator.modules.bumpers') },
			picture: 'nao-feet-sensors.svg',
		},
		{
			regex: /\.(Front|Middle|Rear|)TactilTouched/,
			id: 'nao-tactil-head',
			get title() { return i18next.t('code.simulator.modules.headSensor') },
			picture: 'nao-head-sensors.svg',
		},
		{
			regex: /\.HandLeft(Left|Right|Back|)Touched/,
			id: 'nao-tactil-left-hand',
			get title() { return i18next.t('code.simulator.modules.handLeftSensors') },
			picture: 'nao-hand-left-sensors.svg',
		},

		{
			regex: /\.HandRight(Left|Right|Back)Touched/,
			id: 'nao-tactil-right-hand',
			get title() { return i18next.t('code.simulator.modules.handRightSensors') },
			picture: 'nao-hand-right-sensors.svg',
		},
		{
			regex: /\.SonarRight(NothingDetected|Detected)\(\)/,
			id: 'nao-sonar-right',
			get title() { return i18next.t('code.simulator.modules.sonarRight') },
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
			get title() { return i18next.t('code.simulator.modules.sonarLeft') },
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
