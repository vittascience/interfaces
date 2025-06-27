function $builtinmodule(name) {
	const thymio = {};
	var import_modules = Object.create(null);
	return Sk.misceval.chain(
		Sk.importModule('thymio_onevent', false, true),
		(thymio_onevent_mod) => {
			import_modules.thymio_onevent = thymio_onevent_mod.$d;
		},
		() => thymio_mod(thymio, import_modules)
	);
}

function thymio_mod(thymio, import_modules) {
	thymio.__name__ = new Sk.builtin.str('thymio');
	this.TIMER_0 = null;
	this.TIMER_1 = null;

	Simulator.Mosaic.specific.onEvent.clearTimer('timer0');
	Simulator.Mosaic.specific.onEvent.clearTimer('timer1');
	Simulator.Mosaic.specific.onEvent.timer = {};
	Simulator.Mosaic.specific.onEvent.timerInterval1 = null;
	Simulator.Mosaic.specific.onEvent.timerInterval2 = null;

	this.remoteObjNumber = {
		stop: 87,
		go: 53,
		up: 80,
		down: 81,
		left: 85,
		right: 86,
		more: 16,
		less: 17,
		_0: 0,
		_1: 1,
		_2: 2,
		_3: 3,
		_4: 4,
		_5: 5,
		_6: 6,
		_7: 7,
		_8: 8,
		_9: 9,
	};

	const intV = (v) => {
		return (v * 255) / 32;
	};

	thymio.temperature_sensor = new Sk.builtin.func(function () {
		const t = Simulator.getSliderValue('thymio-temp');
		return new Sk.builtin.int_(t);
	});

	thymio.timer_period = new Sk.builtin.func(function (timer, period) {
		if (timer.v === 0) {
			Simulator.setSliderValue('thymio-timer-0', period.v, false);
			Simulator.Mosaic.specific.onEvent.timerInterval1 = period.v;
			Simulator.Mosaic.specific.onEvent.timerFunction('timer0', period.v);
		} else if (timer.v === 1) {
			Simulator.setSliderValue('thymio-timer-1', period.v, false);
			Simulator.Mosaic.specific.onEvent.timerInterval2 = period.v;
			Simulator.Mosaic.specific.onEvent.timerFunction('timer1', period.v);
		}
	});

	thymio.get_timer_period = new Sk.builtin.func(function (index) {
		if (this.TIMER_0 !== null && index.v === 0) {
			const t = Simulator.getSliderValue('thymio-timer', '_1');
			return Simulator.sleep_ms(t);
		} else if (this.TIMER_1 !== null && index.v === 1) {
			const t = Simulator.getSliderValue('thymio-timer', '_2');

			return Simulator.sleep_ms(t);
		} else {
			Simulator.pause();
		}
	});

	thymio.set_thymio_color = new Sk.builtin.func(function (color) {
		let value;
		switch (color.v) {
			case 'BLACK':
				value = [0, 0, 0];
				break;
			case 'GREEN':
				value = [0, 32, 0];
				break;
			case 'BLUE':
				value = [0, 0, 32];
				break;
			case 'CYAN':
				value = [0, 32, 32];
				break;
			case 'MAGENTA':
				value = [32, 0, 32];
				break;
			case 'RED':
				value = [32, 0, 0];
				break;
			case 'WHITE':
				value = [32, 32, 32];
				break;
			case 'YELLOW':
				value = [32, 32, 0];
				break;
			default:
				value = [0, 0, 0];
		}
		return new Sk.builtin.tuple(value);
	});

	// only was_pressed for now
	var Button = new Sk.misceval.buildClass(
		thymio,
		function ($gbl, $loc) {
			Button__init__ = function (self, btn) {
				self.presses = 0;
				self.btn = btn;
				const buttons = ['button_center', 'button_right', 'button_left', 'button_forward', 'button_backward'],
					events = ['mouseup', 'mousedown', 'click'];
				const board = document.getElementById('board-viewer').contentDocument;
				if (board !== null) {
					for (let i = 0; i < buttons.length; i++) {
						const button = board.querySelector('#' + buttons[i]);
						if (button !== null) {
							for (let j = 0; j < events.length; j++) {
								button.addEventListener(events[j], function (e) {
									const btn = this.id.replace('_', '-');
									switch (e.type) {
										case 'mousedown':
											$('#thymio-' + btn + '_slider').slider('value', 1);
											self.presses++;
											break;
										case 'mouseup':
											$('#thymio-' + btn + '_slider').slider('value', 0);
											self.presses = 0;
											break;
									}
								});
							}
						}
					}
				}
			};
			Button__init__.co_varnames = ['self', 'button_center'];
			Button__init__.$defaults = [Sk.builtin.none()];

			$loc.__init__ = new Sk.builtin.func(Button__init__);

			$loc.forward = new Sk.builtin.func(function (self) {
				const state = $('#thymio-button-forward_slider').slider('option', 'value');
				if (state === 1 && (self.presses > 0 || Simulator.Mosaic.specific.buttons["forward"] === 1)) {
					self.presses = 0;
					Simulator.Mosaic.specific.buttons["forward"] = 0;
					return Sk.builtin.bool(state);
				} else {
					return Sk.builtin.none();
				}
			});

			$loc.center = new Sk.builtin.func(function (self) {
				const state = $('#thymio-button-center_slider').slider('option', 'value');
				if (state === 1 && (self.presses > 0 || Simulator.Mosaic.specific.buttons["center"] ===1)) {
					self.presses = 0;
					Simulator.Mosaic.specific.buttons["center"] = 0;
					return Sk.builtin.bool(state);
				} else {
					return Sk.builtin.none();
				}
			});
			$loc.backward = new Sk.builtin.func(function (self) {
				const state = $('#thymio-button-backward_slider').slider('option', 'value');
				if (state === 1 && (self.presses > 0 || Simulator.Mosaic.specific.buttons["backward"] ===1)) {
					self.presses = 0;
					Simulator.Mosaic.specific.buttons["backward"] = 0;
					return Sk.builtin.bool(state);
				} else {
					return Sk.builtin.none();
				}
			});

			$loc.left = new Sk.builtin.func(function (self) {
				const state = $('#thymio-button-left_slider').slider('option', 'value');
				if (state === 1 && (self.presses > 0 || Simulator.Mosaic.specific.buttons["left"] === 1)) {
					self.presses = 0;
					Simulator.Mosaic.specific.buttons["left"] = 0;
					return Sk.builtin.bool(state);
				} else {
					return Sk.builtin.none();
				}
			});

			$loc.right = new Sk.builtin.func(function (self) {
				const state = $('#thymio-button-right_slider').slider('option', 'value');
				if (state === 1 && (self.presses > 0 || Simulator.Mosaic.specific.buttons["right"] === 1)) {
					self.presses = 0;
					Simulator.Mosaic.specific.buttons["right"] = 0;
					return Sk.builtin.bool(state);
				} else {
					return Sk.builtin.none();
				}
			});
		},
		'Button',
		[]
	);

	thymio.button = new Button();
	thymio.button.tp$init([]);

	var Leds = new Sk.misceval.buildClass(
		thymio,
		function ($gbl, $loc) {
			Leds__init__ = function (self) {
				self.board = document.getElementById('board-viewer').contentDocument;
				//Thymio LEDs Object => svg selector (id), led number (intensity) or rgb values and mosaic module name
				self.id = [
					{ id: '#leds_top_right', intensity: [0, 0, 0], rgb: true, suffix: ['out', 'body', 'in', 'none'], module: 'thymio-led-top' },
					{ id: '#leds_top_left', intensity: [0, 0, 0], rgb: true, suffix: ['out', 'body', 'in', 'none'], module: 'thymio-led-top' },
					{ id: '#leds_bottom_right', intensity: [0, 0, 0], rgb: true, module: 'thymio-led-bottom-right' },
					{ id: '#leds_bottom_left', intensity: [0, 0, 0], rgb: true, module: 'thymio-led-bottom-left' },
					{ id: '#leds_circle', intensity: [0, 0, 0, 0, 0, 0, 0, 0], rgb: false, suffix: ['', '-1', '-2'], module: 'thymio-led-circle' },
					{ id: '#leds_buttons', intensity: [0, 0, 0, 0], rgb: false, suffix: ['', '-1', '-2'], module: 'thymio-led-buttons' },
					{ id: '#leds_prox_h', intensity: [0, 0, 0, 0, 0, 0, 0, 0], rgb: false, suffix: ['', '-1', '-2'], module: 'thymio-led-prox-h' },
					//not in SVG_BOARD_VIEWER (hidden => either on side or underneath Thymio)
					{ intensity: [0, 0], rgb: false, module: 'thymio-led-temperature' },
					{ intensity: [0], rgb: false, module: 'thymio-led-sound' },
					{ intensity: [0], rgb: false, module: 'thymio-led-rc' },
					{ intensity: [0, 0], rgb: false, module: 'thymio-led-prox-v' },
				];
				// init number of leds in mosaic based on module name, similarly to neopixel leds except for rgb leds (top leds)
				for (let i = 0; i < self.id.length; i++) {
					const mod = self.id[i].module;
					self.LEDS = [];
					let html = '<div class=thymio-leds-container>';
					if (self.id[i].rgb) {
						html += '<div class="thymio-led-block-rgb ' + mod + '" style="background-color:rgb(0,0,0);"></div>';
						html += '</div>';
					} else {
						for (let j = 0; j < self.id[i].intensity.length; j++) {
							html += '<div class="thymio-led-block ' + mod + j + '" style="background-color:rgb(0,0,0);"></div>';
						}
						html += '</div>';
					}
					$('#' + mod + '_value').html(html);
				}
			};
			Leds__init__.co_varnames = ['self'];
			Leds__init__.$defaults = [Sk.builtin.none()];
			$loc.__init__ = new Sk.builtin.func(Leds__init__);

			$loc.top = new Sk.builtin.func(function (self, red, green, blue) {
				const r = red.v;
				const g = green.v;
				const b = blue.v;

				const rgb = 'rgb(' + intV(r) + ',' + intV(g) + ',' + intV(b) + ')';
				const opacityValue = [intV(r), intV(g), intV(b)].sort((a, b) => a - b);
				/*
                out => full opacity * opacityValue[2] / 255*0.9
                body => full opacity * opacityValue[1] / 255*0.9
                in => fade opacity 20% * opacityValue[0] / 255*0.3
            */
				for (let i = 0; i < self.id[0].suffix.length; i++) {
					const index = self.id[0];
					if (index.suffix[i] === 'none') {
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.fill = 'white';
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.opacity = 0.9;
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.stroke = rgb;
					} else {
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.fill = rgb;
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.opacity = (opacityValue[2] / 255) * 0.9;
					}
				}
				for (let i = 0; i < self.id[1].suffix.length; i++) {
					const index = self.id[1];
					if (index.suffix[i] === 'none') {
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.fill = 'white';
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.opacity = 0.9;
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.stroke = rgb;
					} else {
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.fill = rgb;
						self.board.querySelector(index.id + '-' + index.suffix[i]).style.opacity = (opacityValue[2] / 255) * 0.9;
					}
				}
				$('.thymio-led-top').css('background-color', rgb);

				return Sk.builtin.none();
			});

			// rgb leds on side of Thymio
			$loc.bottom_right = new Sk.builtin.func(function (self, r, g, b) {
				const red = r.v;
				const green = g.v;
				const blue = b.v;
				const rgb = 'rgb(' + intV(red) + ',' + intV(green) + ',' + intV(blue) + ')';
				const opacityValue = [intV(r), intV(g), intV(b)].sort((a, b) => a - b);
				self.board.querySelector('#leds_bottom_right').style.fill = rgb;
				self.board.querySelector('#leds_bottom_right').style.opacity = (opacityValue[2] / 255) * 0.9;
				$('.thymio-led-bottom-right').css('background-color', rgb);
				return Sk.builtin.none();
			});
			// rgb leds on side of Thymio
			$loc.bottom_left = new Sk.builtin.func(function (self, r, g, b) {
				const red = r.v;
				const green = g.v;
				const blue = b.v;
				const rgb = 'rgb(' + intV(red) + ',' + intV(green) + ',' + intV(blue) + ')';
				const opacityValue = [intV(red), intV(green), intV(blue)].sort((a, b) => a - b);
				self.board.querySelector('#leds_bottom_left').style.fill = rgb;
				self.board.querySelector('#leds_bottom_left').style.opacity = (opacityValue[2] / 255) * 0.9;
				$('.thymio-led-bottom-left').css('background-color', rgb);
				return Sk.builtin.none();
			});
			// 8 leds red/orange
			$loc.circle = new Sk.builtin.func(function (self, c1, c2, c3, c4, c5, c6, c7, c8) {
				const leds = [c1.v, c2.v, c3.v, c4.v, c5.v, c6.v, c7.v, c8.v];
				for (let i = 0; i < leds.length; i++) {
					const opacityValue = intV(leds[i]);
					for (let j = 0; j < self.id[4].suffix.length; j++) {
						self.board.querySelector('#leds_circle' + i + self.id[4].suffix[j]).style.opacity = (opacityValue / 255) * 0.9;
					}
					$('.' + self.id[4].module + i).css({ 'background-color': '#ffc559', opacity: (opacityValue / 255) * 0.9 });
				}
				return Sk.builtin.none();
			});

			// all buttons leds are red
			$loc.buttons = new Sk.builtin.func(function (self, b1, b2, b3, b4) {
				const leds = [b1.v, b2.v, b3.v, b4.v]
				for (let i = 0; i < leds.length; i++) {
					const opacityValue = intV(leds[i]);
					for (let j = 0; j < self.id[5].suffix.length; j++) {
						self.board.querySelector('#leds_buttons' + i + self.id[5].suffix[j]).style.opacity = (opacityValue / 255) * 0.9;
					}
					$('.' + self.id[5].module + i).css({ 'background-color': '#ec1c24', opacity: (opacityValue / 255) * 0.9 });
				}
				return Sk.builtin.none();
			});

			// all proximity sensor leds are red
			$loc.prox_h = new Sk.builtin.func(function (self, led) {
				const leds = Sk.ffi.remapToJs(led);
				for (let i = 0; i < leds.length; i++) {
					const opacityValue = intV(leds[i]);
					for (let j = 0; j < self.id[6].suffix.length; j++) {
						self.board.querySelector('#leds_prox_h' + i + self.id[6].suffix[j]).style.opacity = (opacityValue / 255) * 0.9;
					}
					$('.' + self.id[6].module + i).css({ 'background-color': '#ec1c24', opacity: (opacityValue / 255) * 0.9 });
				}
				return Sk.builtin.none();
			});

			// 2 LEDs for temperature one is red and one is blue
			$loc.temperature = new Sk.builtin.func(function (self, r, b) {
				const red = r.v;
				const blue = b.v;
				//redLed
				const opacityValueRed = intV(red);
				$('.' + self.id[7].module + '0').css({ 'background-color': '#ec1c24', opacity: (opacityValueRed / 255) * 0.9 });
				//blueLed
				const opacityValueBlue = intV(blue);
				$('.' + self.id[7].module + '1').css({ 'background-color': '#00a2e8', opacity: (opacityValueBlue / 255) * 0.9 });
				return Sk.builtin.none();
			});

			$loc.sound = new Sk.builtin.func(function (self, led) {
				const value = led.v;
				const opacityValue = intV(value);
				$('.' + self.id[8].module + '0').css({ 'background-color': '#ec1c24', opacity: (opacityValue / 255) * 0.9 });
				return Sk.builtin.none();
			});

			$loc.rc = new Sk.builtin.func(function (self, led) {
				const value = led.v;
				const opacityValue = intV(value);
				$('.' + self.id[9].module + '0').css({ 'background-color': '#ec1c24', opacity: (opacityValue / 255) * 0.9 });
				return Sk.builtin.none();
			});

			$loc.prox_v = new Sk.builtin.func(function (self, led) {
				const leds = Sk.ffi.remapToJs(led);
				const opacityValueLeft = intV(leds[0]);
				$('.' + self.id[10].module + '0').css({ 'background-color': '#ec1c24', opacity: (opacityValueLeft / 255) * 0.9 });
				const opacityValueRight = intV(leds[1]);
				$('.' + self.id[10].module + '1').css({ 'background-color': '#ec1c24', opacity: (opacityValueRight / 255) * 0.9 });
				return Sk.builtin.none();
			});
		},
		'Leds',
		[]
	);

	thymio.leds = new Leds();
	thymio.leds.tp$init([]);

	var Motors = Sk.misceval.buildClass(
		thymio,
		function ($gbl, $loc) {
			Motors__init__ = function (self, speed) {
				self.speed = speed;
			};
			Motors__init__.co_varnames = ['self', 'speed'];
			Motors__init__.$defaults = [Sk.builtin.none()];
			$loc.__init__ = new Sk.builtin.func(Motors__init__);

			$loc.left = new Sk.builtin.func(function (self, speed) {
				const speedValue = speed.v;
				const direction = speedValue > 0 ? 'forward' : 'backward';
				Simulator.Mosaic.specific.onEvent.micIntensity = speedValue === 0 ? 20 : 45;
				$('#mb-thymio-motorLeft_value').html(Math.abs(speedValue));
				if (speedValue !== 0) {
					$('.mb-thymio-motorLeft').css('animation', 'rotation-' + direction + ' ' + 60 / ((Math.abs(speedValue) / 255) * 133) + 's infinite linear');
				} else {
					$('.mb-thymio-motorLeft').css('animation', 'none');
				}
			});

			$loc.right = new Sk.builtin.func(function (self, speed) {
				const speedValue = speed.v;
				const direction = speedValue > 0 ? 'forward' : 'backward';
				Simulator.Mosaic.specific.onEvent.micIntensity = speedValue === 0 ? 20 : 45;
				$('#mb-thymio-motorRight_value').html(Math.abs(speedValue));
				if (speedValue !== 0) {
					$('.mb-thymio-motorRight').css('animation', 'rotation-' + direction + ' ' + 60 / ((Math.abs(speedValue) / 255) * 133) + 's infinite linear');
				} else {
					$('.mb-thymio-motorRight').css('animation', 'none');
				}
			});

			$loc.left_speed = new Sk.builtin.func(function (self) {
				if ($('#mb-thymio-motorLeft_value').html()) {
					return new Sk.builtin.int_(parseInt($('#mb-thymio-motorLeft_value').html()));
				} else {
					return new Sk.builtin.int_(0);
				}
			});

			$loc.right_speed = new Sk.builtin.func(function (self) {
				if ($('#mb-thymio-motorRight_value').html()) {
					return new Sk.builtin.int_(parseInt($('#mb-thymio-motorRight_value').html()));
				} else {
					return new Sk.builtin.int_(0);
				}
			});
		},
		'Motors',
		[]
	);

	thymio.motor = new Motors();
	thymio.motor.tp$init([]);

	const distanceToIR = (distance) => {
		if (distance < 1) return 4885;
		if (distance > 13) return 0;

		// Linear Regression: Y = -30.02722832722833*X + 4970.0661375661375 => calculated with empirical values from Joël Rivet
		// Quadratic Regression: Y = 0.05254599806323353*X^2 + -36.85820807544984*X + 5112.3782156541365 => calculated with empirical values from Joël Rivet
		
		// linear IR regression
		// const irValue = Math.round(-30.02722832722833 * distance*10 + 4970.0661375661375);
		
		// quadratic IR regression (more realistic)
		const irValue = Math.round(0.05254599806323353 * Math.pow(distance*10, 2) + -36.85820807544984 * distance*10 + 5112.3782156541365);
		return irValue;
	};

	var Prox = Sk.misceval.buildClass(
		thymio,
		function ($gbl, $loc) {
			Prox__init__ = function (self, direction) {
				self.proxSensor = {
					0: 'fl',
					1: 'flc',
					2: 'fc',
					3: 'frc',
					4: 'fr',
					5: 'bl',
					6: 'br',
				};
				self.proxDelta = {
					0: 'finderLeft',
					1: 'finderRight',
				};
			};
			Prox__init__.co_varnames = ['self', 'direction'];
			Prox__init__.$defaults = [Sk.builtin.none()];
			$loc.__init__ = new Sk.builtin.func(Prox__init__);

			$loc.horizontal = new Sk.builtin.func(function (self, direction, sign, detection) {
				const directionValue = direction.v;
				const signValue = sign.v;
				const detectionValue = detection.v;
				let obstacle = Simulator.getSliderValue('thymio-ir-' + self.proxSensor[directionValue]);
				// prevent obstacle to be NaN
				if ( isNaN(obstacle)){
					obstacle = 0;
				}
				if (signValue === '>' && detectionValue > 1500 && obstacle < 10) {
					return new Sk.builtin.bool(true);
				} else if (signValue === '<' && detectionValue < 1500 && obstacle > 10) {
					return new Sk.builtin.bool(true);
				} else if (!signValue) {
					return new Sk.builtin.int_(distanceToIR(obstacle));
				} else {
					return new Sk.builtin.bool(false);
				}
			});

			$loc.ground_delta = new Sk.builtin.func(function (self, direction, sign, detection) {
				const directionValue = direction.v;
				const signValue = sign.v;
				const detectionValue = detection.v;
				const obstacle = Simulator.getSliderValue('thymio-' + self.proxDelta[directionValue], '_v');
				if (signValue === '>' && detectionValue > 400 && obstacle === 0) {
					return new Sk.builtin.bool(true);
				} else if (signValue === '<' && detectionValue < 450 && obstacle === 1) {
					return new Sk.builtin.bool(true);
				} else {
					// code to be executed if condition1 is false and condition2 is false ie: get the value of the sensor
				}
			});
		},
		'Prox',
		[]
	);

	thymio.rc5_command = new Sk.builtin.func(function () {
		let buttonObj = Simulator.Mosaic.specific.onEvent.remoteButton;
		let number = this.remoteObjNumber[buttonObj];
		return new Sk.builtin.int_(number ? number : 0);
	});

	thymio.rc5_address = new Sk.builtin.func(function () {
		return new Sk.builtin.none();
	});

	thymio.prox = new Prox();
	thymio.prox.tp$init([]);

	thymio.acc_sensor = new Sk.builtin.func(function (axis) {
		const axisValue = axis.v;
		switch (axisValue) {
			case 0:
				return new Sk.builtin.int_(Simulator.getSliderValue('thymio-accelerometre', '_x'));
			case 1:
				return new Sk.builtin.int_(Simulator.getSliderValue('thymio-accelerometre', '_y'));
			case 2:
				return new Sk.builtin.int_(Simulator.getSliderValue('thymio-accelerometre', '_z'));
		}
	});

	// Sound
	thymio.nf_sound_system = new Sk.builtin.func(function (sound) {
		const soundValue = sound.v;
		const soundPATH = `/openInterface/thymio/assets/media/simulator/sounds/sound_system_${soundValue}.wav`;
		if (sound && !Simulator.Mosaic.specific.onEvent.soundPlaying) {
			let audio = new Audio(soundPATH);
			audio.addEventListener('ended', function () {
				// avoid playing sound too often in onEvent loop for example
				setTimeout(() => {
					Simulator.Mosaic.specific.onEvent.soundPlaying = false;
				}, 1000);
			});
			Simulator.Mosaic.specific.onEvent.soundPlaying = true;
			audio.play();
		}
	});

	thymio.nf_sound_freq = new Sk.builtin.func(function (frequency, duration) {
		const module = Simulator.getModuleByKey('thymio-sound-freq');

		const stopMusic = function (self) {
			if (self._data.osc) {
				self._data.osc.stop();
				delete self._data.osc;
				Simulator.setAnimator(module, module.id, 0);
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

		if (duration !== undefined) {
			duration = duration.v;
		}

		// Stop previous sound
		stopMusic(self);

		return new Sk.misceval.promiseToSuspension(
			new Promise(async function (resolve) {
				if (!self._data.audioCtx) {
					self._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
					Simulator.audioContext = self._data.audioCtx;
				}

				Simulator.setAnimator(module, module.id, frequency.v);
				startOscillator(self, frequency.v);

				if (duration && duration > 0) {
					await sleep_ms(duration + 5);
					stopMusic(self);
					resolve();
				} else {
					if (Simulator.stop_flag) {
						stopMusic(self);
						resolve();
					}
				}
			})
		);
	});

	thymio.mic_threshold = new Sk.builtin.func(function (threshold) {
		const thresholdValue = threshold.v;
		Simulator.setSliderValue('thymio-mic-threshold', thresholdValue);
		Simulator.Mosaic.specific.onEvent.micThreshold = thresholdValue;
	});

	thymio.mic_intensity = new Sk.builtin.func(function () {
		const dbValue = Simulator.Mosaic.specific.onEvent.micIntensity
		return new Sk.builtin.int_(dbValue)

	});

	thymio.onevent = import_modules.thymio_onevent.onevent;

	// native functions
	const checkMathArgs = function (args , func, length) {
		if (args.length !== length) {
			throw new Sk.builtin.TypeError('nf_math_' + func + '() takes exactly ' + length + ' arguments (' + args.length + ' given)');
		}

		for (let i = 1; i < args.length; i++) {
			if (!Sk.builtin.checkNumber(args[i])) {
				throw new Sk.builtin.TypeError('nf_math_' + func + '() expects an integer');
			}
		}
	};

	var NF_Math = Sk.misceval.buildClass(
		thymio,
		function ($gbl, $loc) {
			$loc.sub = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'sub', 3);
				const R = args[0];
				const A = args[1];
				const B = args[2];
				return new Sk.builtin.int_(A.v - B.v);
			});
			$loc.add = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'add', 3);
				const R = args[0];
				const A = args[1];
				const B = args[2];
    			return new Sk.builtin.int_(A.v + B.v);
			});
			$loc.mul = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'mul', 3);
				const R = args[0];
				const A = args[1];
				const B = args[2];
				return new Sk.builtin.int_(A.v * B.v);
			});
			$loc.div = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'div', 3);
				const R = args[0];
				const A = args[1];
				const B = args[2];
				return new Sk.builtin.int_(Math.floor(A.v / B.v));
			});
			$loc.sin = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'sin', 2);
				const R = args[0];
				const A = args[1];
				return new Sk.builtin.int_(Math.sin(A.v));
			});
			$loc.cos = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'cos', 2);
				const R = args[0];
				const A = args[1];
				return new Sk.builtin.int_(Math.cos(A.v));
			});
			$loc.min = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'min', 3);
				const R = args[0];
				const A = args[1];
				const B = args[2];
				return new Sk.builtin.int_(Math.min(A.v, B.v));
			});
			$loc.max = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'max', 3);
				const R = args[0];
				const A = args[1];
				const B = args[2];
				return new Sk.builtin.int_(Math.max(A.v, B.v));
			});
			$loc.sqrt = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'sqrt', 2);
				const R = args[0];
				const A = args[1];
				return new Sk.builtin.int_(Math.sqrt(A.v));
			});

			// check with real thymio if it's the same
			$loc.rand = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'rand', 1);
				const R = Math.random();
				return new Sk.builtin.int_(Math.random() * R);
			});
			$loc.copy = new Sk.builtin.func(function (self){
				const args = Array.prototype.slice.call(arguments, 1);
				checkMathArgs(args, 'copy', 2);
				const R = args[0];
				const A = args[1];
				return new Sk.builtin.int_(A.v);
			});
		},
		'Math',
		[]
	);

	thymio.nf_math = new NF_Math();
	thymio.nf_math.tp$init([]);

	return thymio;
}
