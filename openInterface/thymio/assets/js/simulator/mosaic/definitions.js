Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
	const pins = Blockly.Constants.Pins[mod.pins][Blockly.Constants.getSelectedBoard()];
	const pinName = pins.find((p) => p[1] == 'p' + pin);
	return {
		name: pinName ? pinName[0] : null,
		id: pin,
	};
};

Simulator.Mosaic.externalLibraries = {
	'src/lib/thymio.js': Simulator.PATH_LIB + 'thymio.js',
	'src/lib/thymio_onevent.py': Simulator.PATH_LIB + 'onevent.py',
};

Simulator.Mosaic.addSpecificInitializations = async function () {
	await Simulator.waitBoardViewer();
	const board = document.getElementById('board-viewer').contentDocument;

	board.querySelectorAll('#button_center, #button_left, #button_right, #button_backward, #button_forward').forEach((button) => {
		button.style.cursor = 'pointer';
	});

	if (board !== null) {
		const touchButtons = ['button_center', 'button_left', 'button_right', 'button_backward', 'button_forward'];
		for (let i = 0; i < touchButtons.length; i++) {
			const touchButton = board.querySelector('#' + touchButtons[i]);
			if (touchButton !== null) {
				touchButton.addEventListener('mousedown', function () {
					this.classList.add('cls-5');
				});
				touchButton.addEventListener('mouseup', function () {
					this.classList.remove('cls-5');
				});
				touchButton.addEventListener('touchstart', function () {
					this.classList.add('cls-5');
				});
				touchButton.addEventListener('touchend', function () {
					this.classList.remove('cls-5');
				});
			}
		}
	}
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () {
	Sk.builtins.simulator_onEvent = new Sk.builtin.func(function (process) {
		Sk.builtin.pyCheckType('process', 'callable', Sk.builtin.checkCallable(process));
		const funcName = process.$qualname;
		if (funcName.match(/button_/g)) {
			const board = document.getElementById('board-viewer').contentDocument;
			const button = board.querySelector('#' + process.$qualname);
			button.addEventListener('click', function () {
				Sk.misceval
					.asyncToPromise(function () {
						return Sk.misceval.callsimOrSuspendArray(process, [], process.func_globals);
					})
					.then(function () {}, Simulator.handleError);
			});
		}

		if (funcName.match(/timer/g)) {
			Simulator.Mosaic.specific.onEvent.timer[funcName] = process;
			if (Simulator.Mosaic.specific.onEvent.timerInterval1 !== null) {
				Simulator.Mosaic.specific.onEvent.timerFunction('timer0', Simulator.Mosaic.specific.onEvent.timerInterval1);
			}
			if (Simulator.Mosaic.specific.onEvent.timerInterval2 !== null) {
				Simulator.Mosaic.specific.onEvent.timerFunction('timer1', Simulator.Mosaic.specific.onEvent.timerInterval2);
			}
		}
		if (funcName.match(/tap/g)) {
			Simulator.Mosaic.specific.onEvent.tap['tapEvent'] = process;
		}
		if (funcName.match(/rc5/g)) {
			Simulator.Mosaic.specific.onEvent.com['rc5Event'] = process;
			Simulator.Mosaic.specific.onEvent.initializeRC5Event();
		}
		if (funcName.match(/prox_com/g)) {
			Simulator.Mosaic.specific.onEvent.com['proxComEvent'] = process;
		}
		if (funcName.match(/(prox_event|buttons|temperature|acc_event|motor_event)/g)) {
			Simulator.Mosaic.specific.onEvent.eventInterval[funcName] = process;
			Simulator.Mosaic.specific.onEvent.eventIntervalFunction(funcName);
		}
		if (funcName.match(/mic/g)) {
			Simulator.Mosaic.specific.onEvent.mic['micEvent'] = process;
		}
		if (funcName.match(/sound_finished/g)) {
			Simulator.Mosaic.specific.onEvent.sound['soundFinishedEvent'] = process;
		}
	});
};

Simulator.Mosaic.groveRegex = {
	// digital readers
	'read-digital': /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.IN(?!, id=.*)/gi,
	// analog readers
	'read-analog': /(pinADC\(([0-9]{1,2})|(machine.|)ADC\((machine.|)Pin\(([0-9]{1,2})\),)( |)(id="read-analog"|)\)/g,
	// digital writers
	'write-digital': /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.OUT(?!, id=.*)/gi,
	// Pins on module - outputs
};

Simulator.Mosaic.specific = {
	buttons: {
		"center": 0,
		"left": 0,
		"right": 0,
		"forward": 0,
		"backward": 0,
	},
	onEvent: {
		button: {},
		prox: {},
		timerInterval1: null,
		timerInterval2: null,
		timer: {},
		tap: {},
		com: {},
		mic: {},
		sound: {},
		eventInterval:{},
		prox0Value: null,
		prox1Value: null,
		prox2Value: null,
		prox3Value: null,
		prox4Value: null,
		prox5Value: null,
		prox6Value: null,
		proxGround0Value: null,
		proxGround1Value: null,
		remoteButton:null,
		micThreshold: null,
		micIntensity: 20,

		soundPlaying: false,
		soundStop: null,

		micThresholdEvent: function () {
			const funcMicThreshold = Simulator.Mosaic.specific.onEvent.mic['micEvent'];
			if (funcMicThreshold && this.micThreshold !== null) {
				Sk.misceval
					.asyncToPromise(function () {
						return Sk.misceval.callsimOrSuspendArray(funcMicThreshold, []);
					})
					.then(function () {}, Simulator.handleError);
			} 
		},

		captureMovement: function () {
			const funcProx = Simulator.Mosaic.specific.onEvent.prox['proxEvent'];
			if (funcProx) {
				Sk.misceval
					.asyncToPromise(function () {
						return Sk.misceval.callsimOrSuspendArray(funcProx, []);
					})
					.then(function () {}, Simulator.handleError);
			}
		},
		timerFunction: function (name, interval) {
			const funcTimer = Simulator.Mosaic.specific.onEvent.timer[name];
			if (funcTimer) {
				this.clearTimer(name);
				Simulator.intervals[name] = setInterval(function () {
					if (Simulator.stop_flag || Sk.execLimit == 0) {
						clearInterval(Simulator.intervals[name]);
					}
					Sk.misceval
						.asyncToPromise(function () {
							return Sk.misceval.callsimOrSuspendArray(funcTimer, []);
						})
						.then(function () {}, Simulator.handleError);
				}, interval);
			}
		},
		clearTimer: function (indexInterval) {
			if (Simulator.intervals[indexInterval]) {
				clearInterval(Simulator.intervals[indexInterval]);
			}
		},

		collisionEvent: function () {
			const funcCollision = Simulator.Mosaic.specific.onEvent.tap['tapEvent'];
			if (funcCollision) {
				Sk.misceval
					.asyncToPromise(function () {
						return Sk.misceval.callsimOrSuspendArray(funcCollision, []);
					})
					.then(function () {}, Simulator.handleError);
			}
		},

		comEvent: function (value) {
			const funcCom = Simulator.Mosaic.specific.onEvent.com[value];
			if (funcCom) {
				Sk.misceval
					.asyncToPromise(function () {
						return Sk.misceval.callsimOrSuspendArray(funcCom, []);
					})
					.then(function () {}, Simulator.handleError);
			}
		},
		eventIntervalFunction: function (event) {
			const frequencies = {"prox": 10, "buttons": 50, "temperature": 1, "acc": 16, "motor": 100};
			const funcEvent = Simulator.Mosaic.specific.onEvent.eventInterval[event];
			const timer = 1000/frequencies[event];
			if (funcEvent) {
				Simulator.intervals[event] = setInterval(function () {
					if (Simulator.stop_flag || Sk.execLimit == 0) {
						clearInterval(Simulator.intervals[event]);
					}
					Sk.misceval
						.asyncToPromise(function () {
							return Sk.misceval.callsimOrSuspendArray(funcEvent, []);
						})
						.then(function () {}, Simulator.handleError);
				}
				, timer);
			}

		},

		initializeRC5Event: function () {
			const thymio_remote = document.querySelector('#thymio_remote');
			// maybe add check for thymio_remote svg loaded
			const buttonTab= ['more', 'less', 'go', 'stop', 'up', 'down', 'left', 'right', '_0', '_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9'];
			
			thymio_remote.querySelectorAll('#more, #less, #go, #stop, #up, #down, #left, #right, #_0, #_1, #_2, #_3, #_4, #_5, #_6, #_7, #_8, #_9').forEach((button) => {
				button.style.cursor = 'pointer';
			});
			const funcRC5 = Simulator.Mosaic.specific.onEvent.com['rc5Event'];
			for (let i = 0; i < buttonTab.length; i++) {
				const button = thymio_remote.querySelector('#' + buttonTab[i]);
				let buttonSelector = buttonTab[i];
				if (buttonSelector.includes('_')) {
					buttonSelector = buttonSelector.replace('_', '');
				}
				
				button.addEventListener('mousedown', function () {

					const buttonBellow = button.querySelector('#button_below_'+buttonSelector)
					buttonBellow.firstElementChild.classList.add('cls-4')
					Simulator.Mosaic.specific.onEvent.remoteButton = buttonTab[i];
					if (funcRC5) {
						Sk.misceval
							.asyncToPromise(function () {
								return Sk.misceval.callsimOrSuspendArray(funcRC5, [], funcRC5.func_globals);
							})
							.then(function () {}, Simulator.handleError);
					}
				});
				button.addEventListener('mouseup', function () {
					const buttonBellow = button.querySelector('#button_below_'+buttonSelector)
					buttonBellow.firstElementChild.classList.remove('cls-4')
				});
				
			}
		},
	},

	createSliders: function () {
		// Specific sliders
		$('#thymio-prox-com_slider,' + '#thymio-button-left_slider,' + '#thymio-button-right_slider,' + '#thymio-button-forward_slider,' + '#thymio-button-backward_slider,' + '#thymio-button-center_slider,' + '#thymio-finderLeft_slider_v,' + '#thymio-finderRight_slider_v').slider({
			min: 0,
			max: 1,
		});
		$('#thymio-temp_slider').slider({
			min: 0,
			max: 100,
			value: 30,
		});
		$('#thymio-sound-threshold_slider').slider({
			min: 0,
			max: 255,
			value: 40,
		});

		$('#thymio-accelerometre_slider_x,'+ '#thymio-accelerometre_slider_y,' + '#thymio-accelerometre_slider_z').slider({
			min: -32,
			max: 32,
			value: 0,
		});

		$('#thymio-ir-fl_slider,' + '#thymio-ir-flc_slider,' + '#thymio-ir-fc_slider,' + '#thymio-ir-frc_slider,' + '#thymio-ir-fr_slider,' + '#thymio-ir-bl_slider,' + '#thymio-ir-br_slider').slider({
			min: 0,
			max: 800,
			value: 0,
		});
		$('#thymio-timer-0_slider,' + '#thymio-timer-1_slider').slider({
			min: 0,
			max: 2000,
			value: 1000,
		});
	},

	definitions: [
		{
			regex: /acc_sensor\(/g,
			id: 'thymio-accelerometre',
			title: 'Accéléromètre',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 0,
					unit: '',
					color: '#1a6da8',
					suffix: '_x',
					title: "Axe X"
				},
				{
					default: 0,
					unit: '',
					color: '#1a6da8',
					suffix: '_y',
					title: "Axe Y"
				},
				{
					default: 0,
					unit: '',
					color: '#1a6da8',
					suffix: '_z',
					title: "Axe Z"
				},
			],
			picture: "Accélerateur.png",
			pictureAnimation: "Accelérateur-animation.png",
			animate: function (Animator) {
                Animator.rotate(-32, 32);
            }


		},
		{
			regex: /mic_threshold\(/g,
			id: 'thymio-sound-threshold',
			title: 'Seuil sonore',
			pin: 'thymio',
			type: 'input',
			listeners: [{
                default: "0 (NONE)",
                unit: '',
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
				const micThreshold = Simulator.Mosaic.specific.onEvent.micThreshold;
				if (micThreshold !== null && Animator.value !== micThreshold) {
					// micThreshold = Animator.value;
					if (Animator.value >= micThreshold){
						Simulator.Mosaic.specific.onEvent.micThresholdEvent();
					}
				}
                if (Animator.value >= 128) {
                    $(Animator.valueId).text(Animator.value + ' (LOUD)');
                    $(Animator.animId).css("filter", 'hue-rotate(310deg)')
                } else if (Animator.value <= 128) {
                    $(Animator.valueId).text(Animator.value + ' (QUIET)');
                    $(Animator.animId).css("filter", 'hue-rotate(15deg)')
                } else if (Animatior.value == 0) {
                    $(Animator.valueId).text(Animator.value + ' (NONE)');
                }
                $(Animator.animId).css('opacity', Animator.value / 255);
            }
		},
		{
			regex: /sound_system\(/g,
			id: 'thymio-sound-system',
			title: 'Sons',
			pin: 'thymio',
			type: 'output',
			listeners: [
				{
					default: '0',
					unit: '',
					color: '#1a6da8',
					title: 'Amicale',
					suffix: 'Amicale',
				},
			],
			value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }

		},
		{
			regex: /sound_freq\(/g,
			id: 'thymio-sound-freq',
			title: 'Fréquence',
			pin: 'thymio',
			type: 'output',
			value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
		},
		{
			regex: /rc5\(\)/g,
			id: 'thymio-rc5-com',
			title: 'Télécommande',
			pin: 'thymio',
			type: 'input',
			picture: 'remote_thymio.svg',
			
		},
		{
			regex: /prox_com\(\)/g,
			id: 'thymio-prox-com',
			title: 'COM. IR',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 'OFF',
					unit: '',
					color: '#1a6da8',
					title: '',
					suffix: '',
				},
			],
			class: 'button',
			picture: 'Bouton.png',
			pictureAnimation: 'Bouton-animation.png',
			pictureInteraction: 'buttonPush',
			animate: function (Animator) {
				Animator.button();
				if (Animator.value === 1) {
					Simulator.Mosaic.specific.onEvent.comEvent('proxComEvent');
				}
			},
		},
		{
			regex: /button(_|\.)center/,
			id: 'thymio-button-center',
			title: 'Bouton center',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 'OFF',
					unit: '',
					color: '#1a6da8',
					title: '',
					suffix: '',
				},
			],
			class: 'button',
			picture: 'Bouton.png',
			pictureAnimation: 'Bouton-animation.png',
			pictureInteraction: 'buttonPush',
			animate: function (Animator) {
				if (Animator.value === 1){
				    Simulator.Mosaic.specific.buttons["center"] = 1;
				}
				Animator.button();
			},
		},
		{
			regex: /button(_|\.)right/,
			id: 'thymio-button-right',
			title: 'Bouton Right',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 'OFF',
					unit: '',
					color: '#1a6da8',
					title: '',
					suffix: '',
				},
			],
			class: 'button',
			picture: 'Bouton.png',
			pictureAnimation: 'Bouton-animation.png',
			pictureInteraction: 'buttonPush',
			animate: function (Animator) {
				if (Animator.value === 1){
				    Simulator.Mosaic.specific.buttons["right"] = 1;
				}
				Animator.button();
			},
		},
		{
			regex: /button(_|\.)left/,
			id: 'thymio-button-left',
			title: 'Bouton Left',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 'OFF',
					unit: '',
					color: '#1a6da8',
					title: '',
					suffix: '',
				},
			],
			class: 'button',
			picture: 'Bouton.png',
			pictureAnimation: 'Bouton-animation.png',
			pictureInteraction: 'buttonPush',
			animate: function (Animator) {
				if (Animator.value === 1){
				    Simulator.Mosaic.specific.buttons["left"] = 1;
				}
				Animator.button();
			},
		},
		{
			regex: /button(_|\.)forward/,
			id: 'thymio-button-forward',
			title: 'Bouton Forward',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 'OFF',
					unit: '',
					color: '#1a6da8',
					title: '',
					suffix: '',
				},
			],
			class: 'button',
			picture: 'Bouton.png',
			pictureAnimation: 'Bouton-animation.png',
			pictureInteraction: 'buttonPush',
			animate: function (Animator) {
				if (Animator.value === 1){
				    Simulator.Mosaic.specific.buttons["forward"] = 1;
				}
				Animator.button();
			},
		},
		{
			regex: /button(_|\.)backward/,
			id: 'thymio-button-backward',
			title: 'Bouton Backward',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 'OFF',
					unit: '',
					color: '#1a6da8',
					title: '',
					suffix: '',
				},
			],
			class: 'button',
			picture: 'Bouton.png',
			pictureAnimation: 'Bouton-animation.png',
			pictureInteraction: 'buttonPush',
			animate: function (Animator) {
				if (Animator.value === 1){
				    Simulator.Mosaic.specific.buttons["backward"] = 1;
				}
				Animator.button();
			},
		},
		{
			regex: /timer0\(/g,
			id: 'thymio-timer-0',
			title: 'Timer 0',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 1000,
					unit: 'ms',
					color: '#1a6da8',
					suffix: '',
					title: 'Premier timer',
				},
			],
			class: 'gauge',
			picture: 'chronometer.png',
			// pictureAnimation: "chronometer-animation.png",
			animate: function (Animator) {
				Animator.gauge();
				Simulator.Mosaic.specific.onEvent.timer0Value = Animator.value;
				Simulator.Mosaic.specific.onEvent.timerFunction("timer0", Animator.value);
			},
		},
		{
			regex: /timer1\(/g,
			id: 'thymio-timer-1',
			title: 'Timer 1',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 1000,
					unit: 'ms',
					color: '#1a6da8',
					suffix: '',
					title: 'Premier timer',
				},
			],
			class: 'gauge',
			picture: 'chronometer.png',
			// pictureAnimation: "chronometer-animation.png",
			animate: function (Animator) {
				Animator.gauge();
				Simulator.Mosaic.specific.onEvent.timer0Value = Animator.value;
				Simulator.Mosaic.specific.onEvent.timerFunction("timer1", Animator.value);
				
			},
		},
		{
			regex: /temperature_sensor/g,
			id: 'thymio-temp',
			title: 'Capteur de température',
			pin: 'Thymio',
			type: 'input',
			listeners: [
				{
					default: 30,
					unit: '°C',
					color: '#f8a10f',
					suffix: '',
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
			regex: /DigitalInOut\(IO14\)/,
			id: 'mb-button',
			title: 'Bouton',
			pin: 'Thymio',
			type: 'input',
			listeners: [
				{
					default: 'OFF',
					unit: '',
					color: '#1a6da8',
					title: '',
					suffix: '',
				},
			],
			class: 'button',
			picture: 'Bouton.png',
			pictureAnimation: 'Bouton-animation.png',
			pictureInteraction: 'buttonPush',
			animate: function (Animator) {
				Animator.button();
			},
		},
		{
			regex: /motor.right/gi,
			id: 'mb-thymio-motorRight',
			title: 'Moteur Droit',
			pin: 'thymio',
			type: 'output',
			value: '',
			picture: 'Roue.png',
			pictureAnimation: 'Roue-animation.png',
		},
		{
			regex: /motor.left/gi,
			id: 'mb-thymio-motorLeft',
			title: 'Moteur Gauche',
			pin: 'thymio',
			type: 'output',
			value: '',
			picture: 'Roue.png',
			pictureAnimation: 'Roue-animation.png',
		},
		{
			regex: /prox.horizontal\(0/gi,
			id: 'thymio-ir-fl',
			title: 'Obstacle',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 0,
					unit: '',
					color: '#f9d142',
					suffix: '',
				},
			],
			class: 'ultrasonic',
			picture: 'Ultrason.png',
			pictureAnimation: 'Ultrason-animation.png',
			animate: function (Animator) {
				Animator.opacity(0, 800);
				if (Animator.value !== Simulator.Mosaic.specific.onEvent.prox0Value && !isNaN(Animator.value)) {
					Simulator.Mosaic.specific.onEvent.prox0Value = Animator.value;
					Simulator.Mosaic.specific.onEvent.captureMovement();
				}
			},
		},
		{
			regex: /prox.horizontal\(1/gi,
			id: 'thymio-ir-flc',
			title: 'Obstacle',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 0,
					unit: '',
					color: '#f9d142',
					suffix: '',
				},
			],
			class: 'ultrasonic',
			picture: 'Ultrason.png',
			pictureAnimation: 'Ultrason-animation.png',
			animate: function (Animator) {
				Animator.opacity(0, 800);
				if (Animator.value !== Simulator.Mosaic.specific.onEvent.prox1Value && !isNaN(Animator.value)) {
					Simulator.Mosaic.specific.onEvent.prox1Value = Animator.value;
					Simulator.Mosaic.specific.onEvent.captureMovement();
				}
			},
		},
		{
			regex: /prox.horizontal\(2/gi,
			id: 'thymio-ir-fc',
			title: 'Obstacle',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 0,
					unit: '',
					color: '#f9d142',
					suffix: '',
				},
			],
			class: 'ultrasonic',
			picture: 'Ultrason.png',
			pictureAnimation: 'Ultrason-animation.png',
			animate: function (Animator) {
				Animator.opacity(0, 800);
				if (Animator.value !== Simulator.Mosaic.specific.onEvent.prox2Value && !isNaN(Animator.value)) {
					Simulator.Mosaic.specific.onEvent.prox2Value = Animator.value;
					Simulator.Mosaic.specific.onEvent.captureMovement();
				}
			},
		},
		{
			regex: /prox.horizontal\(3/gi,
			id: 'thymio-ir-frc',
			title: 'Obstacle',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 0,
					unit: '',
					color: '#f9d142',
					suffix: '',
				},
			],
			class: 'ultrasonic',
			picture: 'Ultrason.png',
			pictureAnimation: 'Ultrason-animation.png',
			animate: function (Animator) {
				Animator.opacity(0, 800);
				if (Animator.value !== Simulator.Mosaic.specific.onEvent.prox3Value && !isNaN(Animator.value)) {
					Simulator.Mosaic.specific.onEvent.prox3Value = Animator.value;
					Simulator.Mosaic.specific.onEvent.captureMovement();
				}
			},
		},
		{
			regex: /prox.horizontal\(4/gi,
			id: 'thymio-ir-fr',
			title: 'Obstacle',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 0,
					unit: '',
					color: '#f9d142',
					suffix: '',
				},
			],
			class: 'ultrasonic',
			picture: 'Ultrason.png',
			pictureAnimation: 'Ultrason-animation.png',
			animate: function (Animator) {
				Animator.opacity(0, 800);
				if (Animator.value !== Simulator.Mosaic.specific.onEvent.prox4Value && !isNaN(Animator.value)) {
					Simulator.Mosaic.specific.onEvent.prox4Value = Animator.value;
					Simulator.Mosaic.specific.onEvent.captureMovement();
				}
			},
		},
		{
			regex: /prox.horizontal\(5/gi,
			id: 'thymio-ir-bl',
			title: 'Obstacle',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 0,
					unit: '',
					color: '#f9d142',
					suffix: '',
				},
			],
			class: 'ultrasonic',
			picture: 'Ultrason.png',
			pictureAnimation: 'Ultrason-animation.png',
			animate: function (Animator) {
				Animator.opacity(0, 800);
				if (Animator.value !== Simulator.Mosaic.specific.onEvent.prox5Value && !isNaN(Animator.value)) {
					Simulator.Mosaic.specific.onEvent.prox5Value = Animator.value;
					Simulator.Mosaic.specific.onEvent.captureMovement();
				}
			},
		},
		{
			regex: /prox.horizontal\(6/gi,
			id: 'thymio-ir-br',
			title: 'Obstacle',
			pin: 'thymio',
			type: 'input',
			listeners: [
				{
					default: 0,
					unit: '',
					color: '#f9d142',
					suffix: '',
				},
			],
			class: 'ultrasonic',
			picture: 'Ultrason.png',
			pictureAnimation: 'Ultrason-animation.png',
			animate: function (Animator) {
				Animator.opacity(0, 800);
				if (Animator.value !== Simulator.Mosaic.specific.onEvent.prox6Value && !isNaN(Animator.value)) {
					Simulator.Mosaic.specific.onEvent.prox6Value = Animator.value;
					Simulator.Mosaic.specific.onEvent.captureMovement();
				}
			},
		},
		{
			regex: /prox.ground_delta\(0/gi,
			id: 'thymio-finderLeft',
			title: 'cap. Ligne noire (Gauche)',
			pin: 'Thymio',
			type: 'input',
			class: 'finder',
			listeners: [
				{
					default: 'OFF',
					unit: '',
					color: '#000000',
					suffix: '_v',
				},
			],
			picture: 'Capteur-ligne-line.png',
			pictureAnimation: 'Capteur-ligne-anim.png',
			animate: function (Animator) {
				Animator.translation('digital');
				if (Animator.value !== Simulator.Mosaic.specific.onEvent.proxGround0Value && !isNaN(Animator.value)) {
					Simulator.Mosaic.specific.onEvent.proxGround0Value = Animator.value;
					Simulator.Mosaic.specific.onEvent.captureMovement();
				}
			},
		},
		{
			regex: /prox.ground_delta\(1/gi,
			id: 'thymio-finderRight',
			title: 'cap. Ligne noire (Droite)',
			pin: 'Thymio',
			type: 'input',
			class: 'finder',
			listeners: [
				{
					default: 'OFF',
					unit: '',
					color: '#000000',
					suffix: '_v',
				},
			],
			picture: 'Capteur-ligne-line.png',
			pictureAnimation: 'Capteur-ligne-anim.png',
			animate: function (Animator) {
				Animator.translation('digital');
				if (Animator.value !== Simulator.Mosaic.specific.onEvent.proxGround1Value && !isNaN(Animator.value)) {
					Simulator.Mosaic.specific.onEvent.proxGround1Value = Animator.value;
					Simulator.Mosaic.specific.onEvent.captureMovement();
				}
			},
		},

		{
			regex: /leds\.top\(/g,
			id: 'thymio-led-top',
			title: 'LEDs du haut',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
		{
			regex: /leds\.bottom_left\(/g,
			id: 'thymio-led-bottom-left',
			title: 'LEDs du bas gauche',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
		{
			regex: /leds\.bottom_right\(/g,
			id: 'thymio-led-bottom-right',
			title: 'LEDs du bas droite',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
		{
			regex: /leds\.circle\(/g,
			id: 'thymio-led-circle',
			title: 'LEDs du cercle',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
		{
			regex: /leds\.prox.h\(/g,
			id: 'thymio-led-prox-h',
			title: 'LEDs proximité h',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
		{
			regex: /leds\.prox_v\(/g,
			id: 'thymio-led-prox-v',
			title: 'LEDs proximité v',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
		{
			regex: /leds\.buttons\(/g,
			id: 'thymio-led-buttons',
			title: 'LEDs des boutons',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
		{
			regex: /leds\.temperature\(/g,
			id: 'thymio-led-temperature',
			title: 'LEDs de température',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
		{
			regex: /leds\.rc\(/g,
			id: 'thymio-led-rc',
			title: 'LEDs de télécommande',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
		{
			regex: /leds\.sound\(/g,
			id: 'thymio-led-sound',
			title: 'LEDs de son',
			pin: 'thymio',
			type: 'output',
			value: '',
		},
	],
};
