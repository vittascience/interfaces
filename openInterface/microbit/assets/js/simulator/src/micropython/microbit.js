function $builtinmodule(name) {
	const microbit = {};
	var import_modules = Object.create(null);
	return Sk.misceval.chain(
		Sk.importModule("microbit_run_every", false, true),
		(microbit_run_every_mod) => {
			import_modules.microbit_run_every = microbit_run_every_mod.$d;
		},
		() => microbit_mod(microbit, import_modules)
	);
};

function microbit_mod(microbit, import_modules) {

	const Image = function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function (self, str, y) {
			let image = '';
			if (str === undefined | y !== undefined) image = "00000:00000:00000:00000:00000";
			image = Sk.ffi.remapToJs(str);
			if (image.match(/^\d{5}:\d{5}:\d{5}:\d{5}:\d{5}(?::\d*)?$/gi)) {
				image = image.substring(0, 29);
			} else {
				image = "00000:00000:00000:00000:00000";
			}
			self.lines = image.split(/[:\n]/);
		});

		$loc.width = new Sk.builtin.func(function (self) {
			return self.lines[0].length;
		});

		$loc.height = new Sk.builtin.func(function (self) {
			return self.lines.length;
		});

		$loc.set_pixel = new Sk.builtin.func(function (self, x, y, value) {
			var row = self.lines[y.v].split("");
			row[x.v] = value.v;
			self.lines[y.v] = row.join("");
		});

		$loc.get_pixel = new Sk.builtin.func(function (self, x, y) {
			return new Sk.builtin.int_(self.lines[y.v][x.v]);
		});

		$loc.__repr__ = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str('Image("' + self.lines.join(":") + '")');
		});

		$loc.__str__ = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str('Image("' + self.lines.join(":") + '")');
		});

		$loc.shift_left = new Sk.builtin.func(function (self, n) {
			if (n == undefined) {
				throw new Sk.builtin.TypeError("parameter n not defined");
			}
			var copy = self.lines.slice(0);
			for (var j = 0; j < n.v; j++) {
				var width = copy[0].length;
				for (var i = 0; i < copy.length; i++) {
					copy[i] = copy[i].slice(1, width) + "0";
				}
			}

			var newImage = new Sk.builtin.str(copy.join(":"));
			return newImage;
		});

		$loc.shift_right = new Sk.builtin.func(function (self, n) {
			if (n == undefined) {
				throw new Sk.builtin.TypeError("parameter n not defined");
			}
			var copy = self.lines.slice(0);
			for (var j = 0; j < n.v; j++) {
				var width = copy[0].length;
				for (var i = 0; i < copy.length; i++) {
					copy[i] = "0" + copy[i].slice(0, width - 1);
				}
			}
			var newImage = new Sk.builtin.str(copy.join(":"));
			return newImage;
		});

		$loc.shift_up = new Sk.builtin.func(function (self, n) {
			if (n == undefined) {
				throw new Sk.builtin.TypeError("parameter n not defined");
			}
			var height = self.lines.length;
			var copy = self.lines.slice(n.v, height);
			var s = "";
			for (var j = 0; j < n.v; j++) {
				for (var i = 0; i < self.lines[0].length; i++) {
					s += "0";
				}
				copy.push(s);
			}
			var newImage = new Sk.builtin.str(copy.join(":"));
			return newImage;
		});

		$loc.shift_down = new Sk.builtin.func(function (self, n) {
			if (n == undefined) {
				throw new Sk.builtin.TypeError("parameter n not defined");
			}
			var height = self.lines.length;
			var copy = [];

			var s = "";
			for (var j = 0; j < n.v; j++) {
				for (var i = 0; i < self.lines[0].length; i++) {
					s += "0";
				}
				copy.push(s);
			}
			copy.push.apply(copy, self.lines.slice(0, height - 1));
			var newImage = new Sk.builtin.str(copy.join(":"));
			return newImage;
		});

		$loc.__add__ = new Sk.builtin.func(function (self, other) {
			var x, y, val;
			var copy = self.lines.slice(0);
			for (y = 0; y < copy.length; y++) {
				copy[y] = copy[y].split("");
				for (x = 0; x < copy[y].length; x++) {
					val = parseInt(copy[y][x]) + parseInt(other.lines[y][x]);

					if (val > 9) val = 9;
					copy[y][x] = val;
				}
				copy[y] = copy[y].join("");
			}
			var newImage = new Sk.builtin.str(copy.join(":"));
			return newImage;
		});

		$loc.__mul__ = new Sk.builtin.func(function (self, n) {
			var copy = self.lines.slice(0);
			for (y = 0; y < copy.length; y++) {
				copy[y] = copy[y].split("");
				for (x = 0; x < copy[y].length; x++) {
					val = Math.round(parseInt(copy[y][x]) * n.v);
					if (val < 0) val = 0;
					if (val > 9) val = 9;
					copy[y][x] = val;
				}
				copy[y] = copy[y].join("");
			}
			var newImage = new Sk.builtin.str(copy.join(":"));
			return newImage;
		});

		$loc.invert = new Sk.builtin.func(function (self) {
			var copy = self.lines.slice(0);
			for (y = 0; y < copy.length; y++) {
				copy[y] = copy[y].split("");
				for (x = 0; x < copy[y].length; x++) {
					val = parseInt(copy[y][x]);
					copy[y][x] = 9 - val;
				}
				copy[y] = copy[y].join("");
			}
			var newImage = new Sk.builtin.str(copy.join(":"));
			return newImage;
		});

		$loc.HEART = new Sk.builtin.str("09090:99999:99999:09990:00900");
		$loc.HEART_SMALL = new Sk.builtin.str("00000:09090:09990:00900:00000");
		$loc.HAPPY = new Sk.builtin.str("00000:09090:00000:90009:09990");
		$loc.SMILE = new Sk.builtin.str("00000:00000:00000:90009:09990");
		$loc.SAD = new Sk.builtin.str("00000:09090:00000:09990:90009");
		$loc.CONFUSED = new Sk.builtin.str("00000:09090:00000:09090:90909");
		$loc.ANGRY = new Sk.builtin.str("90009:09090:00000:99999:90909");
		$loc.ASLEEP = new Sk.builtin.str("00000:99099:00000:09990:00000");
		$loc.SURPRISED = new Sk.builtin.str("09090:00000:00900:09090:00900");
		$loc.SILLY = new Sk.builtin.str("90009:00000:99999:00909:00999");
		$loc.FABULOUS = new Sk.builtin.str("99999:99099:00000:09090:09990");
		$loc.MEH = new Sk.builtin.str("09090:00000:00090:00900:09000");
		$loc.YES = new Sk.builtin.str("00000:00009:00090:90900:09000");
		$loc.NO = new Sk.builtin.str("90009:09090:00900:09090:90009");
		$loc.CLOCK12 = new Sk.builtin.str("00900:00900:00900:00000:00000");
		$loc.CLOCK1 = new Sk.builtin.str("00090:00090:00900:00000:00000");
		$loc.CLOCK2 = new Sk.builtin.str("00000:00099:00900:00000:00000");
		$loc.CLOCK3 = new Sk.builtin.str("00000:00000:00999:00000:00000");
		$loc.CLOCK4 = new Sk.builtin.str("00000:00000:00900:00099:00000");
		$loc.CLOCK5 = new Sk.builtin.str("00000:00000:00900:00090:00090");
		$loc.CLOCK6 = new Sk.builtin.str("00000:00000:00900:00900:00900");
		$loc.CLOCK7 = new Sk.builtin.str("00000:00000:00900:09000:09000");
		$loc.CLOCK8 = new Sk.builtin.str("00000:00000:00900:99000:00000");
		$loc.CLOCK9 = new Sk.builtin.str("00000:00000:99900:00000:00000");
		$loc.CLOCK10 = new Sk.builtin.str("00000:99000:00900:00000:00000");
		$loc.CLOCK11 = new Sk.builtin.str("09000:09000:00900:00000:00000");
		$loc.ARROW_N = new Sk.builtin.str("00900:09990:90909:00900:00900");
		$loc.ARROW_NE = new Sk.builtin.str("00999:00099:00909:09000:90000");
		$loc.ARROW_E = new Sk.builtin.str("00900:00090:99999:00090:00900");
		$loc.ARROW_SE = new Sk.builtin.str("90000:09000:00909:00099:00999");
		$loc.ARROW_S = new Sk.builtin.str("00900:00900:90909:09990:00900");
		$loc.ARROW_SW = new Sk.builtin.str("00009:00090:90900:99000:99900");
		$loc.ARROW_W = new Sk.builtin.str("00900:09000:99999:09000:00900");
		$loc.ARROW_NW = new Sk.builtin.str("99900:99000:90900:00090:00009");
		$loc.TRIANGLE = new Sk.builtin.str("00000:00900:09090:99999:00000");
		$loc.TRIANGLE_LEFT = new Sk.builtin.str("90000:99000:90900:90090:99999");
		$loc.CHESSBOARD = new Sk.builtin.str("09090:90909:09090:90909:09090");
		$loc.DIAMOND = new Sk.builtin.str("00900:09090:90009:09090:00900");
		$loc.DIAMOND_SMALL = new Sk.builtin.str("00000:00900:09090:00900:00000");
		$loc.SQUARE = new Sk.builtin.str("99999:90009:90009:90009:99999");
		$loc.SQUARE_SMALL = new Sk.builtin.str("00000:09990:09090:09990:00000");
		$loc.RABBIT = new Sk.builtin.str("90900:90900:99990:99090:99990");
		$loc.COW = new Sk.builtin.str("90009:90009:99999:09990:00900");
		$loc.MUSIC_CROTCHET = new Sk.builtin.str("00900:00900:00900:99900:99900");
		$loc.MUSIC_QUAVER = new Sk.builtin.str("00900:00990:00909:99900:99900");
		$loc.MUSIC_QUAVERS = new Sk.builtin.str("09999:09009:09009:99099:99099");
		$loc.PITCHFORK = new Sk.builtin.str("90909:90909:99999:00900:00900");
		$loc.XMAS = new Sk.builtin.str("00900:09990:00900:09990:99999");
		$loc.PACMAN = new Sk.builtin.str("09999:99090:99900:99990:09999");
		$loc.TARGET = new Sk.builtin.str("00900:09990:99099:09990:00900");
		$loc.TSHIRT = new Sk.builtin.str("99099:99999:09990:09990:09990");
		$loc.ROLLERSKATE = new Sk.builtin.str("00099:00099:99999:99999:09090");
		$loc.DUCK = new Sk.builtin.str("09900:99900:09999:09990:00000");
		$loc.HOUSE = new Sk.builtin.str("00900:09990:99999:09990:09090");
		$loc.TORTOISE = new Sk.builtin.str("00000:09990:99999:09090:00000");
		$loc.BUTTERFLY = new Sk.builtin.str("99099:99999:00900:99999:99099");
		$loc.STICKFIGURE = new Sk.builtin.str("00900:99999:00900:09090:90009");
		$loc.GHOST = new Sk.builtin.str("99999:90909:99999:99999:90909");
		$loc.SWORD = new Sk.builtin.str("00900:00900:00900:09990:00900");
		$loc.GIRAFFE = new Sk.builtin.str("99000:09000:09000:09990:09090");
		$loc.SKULL = new Sk.builtin.str("09990:90909:99999:09990:09990");
		$loc.UMBRELLA = new Sk.builtin.str("09990:99999:00900:90900:09900");
		$loc.SNAKE = new Sk.builtin.str("99000:99099:09090:09990:00000");

		$loc.ALL_CLOCKS = new Sk.builtin.list([$loc.CLOCK1, $loc.CLOCK2, $loc.CLOCK3, $loc.CLOCK4, $loc.CLOCK5, $loc.CLOCK6, $loc.CLOCK7, $loc.CLOCK8, $loc.CLOCK9, $loc.CLOCK10, $loc.CLOCK11, $loc.CLOCK12]);
		$loc.ALL_ARROWS = new Sk.builtin.list([$loc.ARROW_N, $loc.ARROW_NE, $loc.ARROW_E, $loc.ARROW_SE, $loc.ARROW_S, $loc.ARROW_SW, $loc.ARROW_W, $loc.ARROW_NW]);
	};

	microbit.Image = new Sk.misceval.buildClass(microbit, Image, 'MicroBitImage', []);

	const MicroBitSound = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self, name) {
			self.name = name.v
		});

		$loc.GIGGLE = new Sk.builtin.str("giggle");
		$loc.HAPPY = new Sk.builtin.str("happy");
		$loc.HELLO = new Sk.builtin.str("hello");
		$loc.MYSTERIOUS = new Sk.builtin.str("mysterious");
		$loc.SAD = new Sk.builtin.str("sad");
		$loc.SLIDE = new Sk.builtin.str("slide");
		$loc.SOARING = new Sk.builtin.str("soaring");
		$loc.SPRING = new Sk.builtin.str("spring");
		$loc.TWINKLE = new Sk.builtin.str("twinkle");
		$loc.YAWN = new Sk.builtin.str("yawn");

	}, 'MicroBitSound', []);

	microbit.Sound = new MicroBitSound();

	const MicroBitSoundEvent = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		$loc.LOUD = new Sk.builtin.str("SoundEvent('loud')");
		$loc.QUIET = new Sk.builtin.str("SoundEvent('quiet')");

	}, "MicroBitSoundEvent", []);

	microbit.SoundEvent = new MicroBitSoundEvent();

	const MicroBitDisplay = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self) {
			self.display = true;
			self.leds = [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			];
			self.alphabet = SIMULATOR_DISPLAY_ALPHABET;
			self.brightness = ["#333", "#300", "#500", "#700", "#900", "#a00", "#b00", "#c00", "#d00", "#ff0a0a"];
		});

		function setLED(self, x, y, brightness) {
			const board = document.getElementById("board-viewer").contentDocument;
			if (board !== null) {
				const led = board.getElementById("_" + (x + 1) + "_" + (y + 1) + "-2");
				if (led !== null) {
					for (const child of led.children) {
						child.style.fill = self.brightness[brightness];
					}
				}
			}
			self.leds[y][x] = brightness;
		};

		function clearScreen(self) {
			for (var x = 0; x < 5; x++) {
				for (var y = 0; y < 5; y++) {
					setLED(self, x, y, 0);
				}
			}
		};

		function showCharacter(self, c) {
			var letter = self.alphabet[" "];
			if (self.alphabet.hasOwnProperty(c)) {
				letter = self.alphabet[c];
			}
			for (let y = 0; y < 5; y++) {
				for (let x = 0; x < 5; x++) {
					setLED(self, x, y, letter[y][x]);
				}
			}
		};

		$loc.read_light_level = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_($("#mb-light_slider").slider('option', 'value'));
		});

		$loc.get_pixel = new Sk.builtin.func(function (self, x, y) {
			return new Sk.builtin.int_(self.leds[y.v][x.v]);
		});

		$loc.set_pixel = new Sk.builtin.func(function (self, x, y, brightness) {
			const x_i = parseInt(x.v);
			const y_i = parseInt(y.v);
			if (x_i > 4 || x_i < 0 || y_i > 4 || x_i < 0) {
				UIManager.showErrorMessage("error-message", "ValueError: L'indice est en dehors de l'écran.");
			} else {
				setLED(self, x_i, y_i, parseInt(brightness.v));
			}
		});

		$loc.clear = new Sk.builtin.func(function (self) {
			clearScreen(self);
		});

		show = function (self, image, delay, wait, loop, clear) {
			Sk.builtin.pyCheckArgsLen("show", arguments.length, 2, 6);
			Sk.builtin.pyCheckType("delay", "float", Sk.builtin.checkNumber(delay));
			Sk.builtin.pyCheckType("wait", "boolean", Sk.builtin.checkBool(wait));
			Sk.builtin.pyCheckType("loop", "boolean", Sk.builtin.checkBool(loop));
			Sk.builtin.pyCheckType("clear", "boolean", Sk.builtin.checkBool(clear));
			if (Sk.builtin.checkBool(image)) {
				if (image.v) {
					image = new Sk.builtin.str("True")
				} else {
					image = new Sk.builtin.str("False")
				}
			}
			if (Sk.builtin.checkNumber(image)) {
				image = new Sk.builtin.str(image.v)
			}
			if (image.lines && image.lines.length == 5) {
				image = new Sk.builtin.str(image.lines.join(":"));
			}
			return Simulator.runAsync(function (resolve, reject) {
				const isFormattedImage = Sk.builtin.checkString(image) && image.v.length === 29 && image.v.includes(':');
				if (image && image.v) {
					var i = 0;
					function showNextFrame() {
						if (Simulator.stop_flag == true) {
							image = Sk.builtin.none();
							clearScreen(self);
							resolve();
						}
						if (image.v && (i >= image.v.length || isFormattedImage) && i > 0) {
							if (loop.v) {
								i = 0;
							} else {
								if (clear.v) {
									clearScreen(self);
								}
								if (wait.v) {
									resolve();
								}
								return;
							}
						}
						if (isFormattedImage) {
							const pixels = image.v.split(':');
							for (y = 0; y < 5; y++) {
								for (x = 0; x < 5; x++) {
									setLED(self, x, y, pixels[y][x]);
								}
							}
						} else if (Sk.builtin.checkString(image)) {
							clearScreen(self);
							showCharacter(self, image.v[i]);
						} else if (image.v && Sk.builtin.checkString(image)) {
							clearScreen(self);
							showCharacter(self, image.v[i].v[0]);
						}
						i++;
						setTimeout(showNextFrame, delay.v);
					};
					showNextFrame();
					if (!wait.v) {
						resolve();
					}
				}
			});

		};

		show.co_varnames = ['self', 'image', 'delay', 'wait', 'loop', 'clear'];
		show.$defaults = [new Sk.builtin.int_(400), new Sk.builtin.bool(true), new Sk.builtin.bool(false), new Sk.builtin.bool(false)];

		$loc.show = new Sk.builtin.func(show);

		scroll = function (self, text, delay, wait) {
			Sk.builtin.pyCheckArgsLen("show", arguments.length, 2, 4);
			Sk.builtin.pyCheckType("delay", "float", Sk.builtin.checkNumber(delay));
			Sk.builtin.pyCheckType("wait", "boolean", Sk.builtin.checkBool(wait));
			if (Sk.builtin.checkNumber(text)) {
				text = new Sk.builtin.str(text.v)
			}
			const delay_ms = delay.v;
			const show = " " + text.v + " ";
			return Simulator.runAsync(function (resolve, reject) {
				var rows = ['', '', '', '', ''];
				for (let i = 0; i < show.length; i++) {
					var currentLetter = show[i];
					var letter = self.alphabet[" "];
					if (self.alphabet.hasOwnProperty(currentLetter)) {
						letter = self.alphabet[currentLetter];
					}
					for (let y = 0; y < 5; y++) {
						rows[y] += letter[y] + " ";
					}
				}
				var width = rows[0].length;
				var offset = 0;

				function showScroll() {
					if (Simulator.stop_flag == true) {
						clearScreen(self);
						resolve();
					} else {
						clearScreen(self);
						for (let y = 0; y < 5; y++) {
							for (let x = offset; x < offset + 5; x++) {
								setLED(self, x - offset, y, rows[y][x]);
							}
						}
						if (offset < width - 5) {
							offset++;
							setTimeout(showScroll, delay_ms);
						} else {
							resolve();
						}
					}
				};
				showScroll();
			});
		};


		scroll.co_varnames = ['self', 'text', 'delay', 'wait'];
		scroll.$defaults = [new Sk.builtin.int_(800), new Sk.builtin.bool(true)];

		$loc.scroll = new Sk.builtin.func(scroll);

		$loc.on = new Sk.builtin.func(function (self) {
			self.display = true;
		});

		$loc.off = new Sk.builtin.func(function (self) {
			self.display = false;
		});

		$loc.is_on = new Sk.builtin.func(function (self) {
			return new Sk.builtin.bool(self.display)
		});

	}, "MicroBitDisplay", []);

	microbit.display = new MicroBitDisplay();
	microbit.display.tp$init();

	const MicroBitButton = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		MicroBitButton__init__ = function (self, btn) {
			self.presses = 0;
			self.btn = btn.v;

			// Move the slider if a button is pressed
			const buttons = ['a_button', 'b_button'];
			const events = ['mouseup', 'mousedown'];
			const board = document.getElementById("board-viewer").contentDocument;
			if (board !== null) {
				for (var i = 0; i < buttons.length; i++) {
					var button = board.querySelector("#" + buttons[i]);
					if (button != null) {
						for (var j = 0; j < events.length; j++) {
							button.addEventListener(events[j], function (e) {
								const btn = this.id.replace('_button', '');
								switch (e.type) {
									case 'mousedown':
										Simulator.setSliderValue('mb-button-' + btn, 1);
										break;
									case 'mouseup':
										Simulator.setSliderValue('mb-button-' + btn, 0);
										self.presses++;
										break;
								}
							});
						}
					}
				}
			}
		};

		MicroBitButton__init__.co_varnames = ['self', 'btn'];
		MicroBitButton__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(MicroBitButton__init__);

		$loc.is_pressed = new Sk.builtin.func(function (self) {
			const state = Simulator.getSliderValue('mb-button-' + self.btn);
			return new Sk.builtin.bool(state);
		});

		$loc.was_pressed = new Sk.builtin.func(function (self) {
			if (Simulator.getSliderValue('mb-button-' + self.btn) === 0 && Simulator.Mosaic.specific.buttons[self.btn] === 1) {
				Simulator.Mosaic.specific.buttons[self.btn] = 0;
				return new Sk.builtin.bool(true);
			}
			return new Sk.builtin.bool(false);
		});

		$loc.get_presses = new Sk.builtin.func(function (self) {
			const presses = self.presses;
			self.presses = 0;
			return new Sk.builtin.int_(presses);
		});

	}, 'MicroBitButton', []);

	microbit.button_a = new MicroBitButton();
	microbit.button_a.tp$init([new Sk.builtin.str('a')]);

	microbit.button_b = new MicroBitButton();
	microbit.button_b.tp$init([new Sk.builtin.str('b')]);

	const MicroBitAccelerometer = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		const getValue = function (data) {
			return $("#mb-accelerometer_slider_" + data).slider('option', 'value');
		};

		$loc.__init__ = new Sk.builtin.func(function (self) {
			Simulator.Mosaic.specific.gesture.init();
		});

		$loc.get_x = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(getValue("x"));
		});

		$loc.get_y = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(getValue("y"));
		});

		$loc.get_z = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(getValue("z"));
		});

		$loc.get_pitch = new Sk.builtin.func(function (self) {
			const pitch = parseInt($("#mb-accelerometer-pitch_slider").slider('option', 'value'));
			return new Sk.builtin.int_(pitch);
		});

		$loc.get_roll = new Sk.builtin.func(function (self) {
			const roll = parseInt($("#mb-accelerometer-roll_slider").slider('option', 'value'));
			return new Sk.builtin.int_(roll);
		});

		$loc.get_values = new Sk.builtin.func(function (self) {
			return new Sk.builtin.tuple([getValue("x"), getValue("y"), getValue("z")]);
		});

		$loc.current_gesture = new Sk.builtin.func(function (self) {
			const currentGesture = Simulator.Mosaic.specific.gesture.getCurrentGesture();
			if (currentGesture !== null) {
				return new Sk.builtin.str(currentGesture);
			}
			return Sk.builtin.none();
		});

		$loc.is_gesture = new Sk.builtin.func(function (self, gesture) {
			const currentGesture = Simulator.Mosaic.specific.gesture.getCurrentGesture();
			if (currentGesture !== null && currentGesture === gesture.v) {
				return new Sk.builtin.bool(true);
			}
			return new Sk.builtin.bool(false);
		});

		$loc.was_gesture = new Sk.builtin.func(function (self, gesture) {
			for (var i = 0; i < Simulator.Mosaic.specific.gesture.history.length; i++) {
				if (Simulator.Mosaic.specific.gesture.history[i] === gesture.v) {
					Simulator.Mosaic.specific.gesture.history.splice(i, 1);
					return new Sk.builtin.bool(true);
				}
			}
			return new Sk.builtin.bool(false);
		});

		$loc.get_gestures = new Sk.builtin.func(function (self) {
			const gestures = Simulator.Mosaic.specific.gesture.history;
			Simulator.Mosaic.specific.gesture.init();
			return Sk.ffi.remapToPy(gestures);
		});

	}, "MicroBitAccelerometer", []);

	microbit.accelerometer = new MicroBitAccelerometer();
	microbit.accelerometer.tp$init();

	const MicroBitCompass = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		const getValue = function (axis) {
			return $("mb-compassMag_slider_" + axis).slider('option', 'value');
		};

		$loc.__init__ = new Sk.builtin.func(function (self) {
			self.calibrated = false;
		});

		$loc.calibrate = new Sk.builtin.func(function (self) {
			self.calibrated = true;
		});

		$loc.is_calibrated = new Sk.builtin.func(function (self) {
			return new Sk.builtin.bool(self.calibrated);
		});

		$loc.clear_calibration = new Sk.builtin.func(function (self) {
			self.calibrated = false;
		});

		$loc.get_x = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(getValue('x'));
		});

		$loc.get_y = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(getValue('y'));
		});

		$loc.get_z = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(getValue('z'));
		});

		$loc.get_field_strength = new Sk.builtin.func(function (self) {
			// TO DO
			return new Sk.builtin.int_(0);
		});

		$loc.heading = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_($("#mb-compassDir_slider").slider('option', 'value'));
		});

	}, "MicroBitCompass", []);

	microbit.compass = new MicroBitCompass();
	microbit.compass.tp$init();

	const MicroBitMicrophone = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self) {
			self.sound_level = 0;
			self.wasLoud = false;
			self.wasQuiet = false;
			self.loudThresh = 128;
			self.quietThresh = 0;
		});

		$loc.set_threshold = new Sk.builtin.func(function (self, state, threshold) {
			self.loudThresh = state.v == $loc.LOUD.v ? threshold.v : self.loudThresh;
			self.quietThresh = state.v == $loc.QUIET.v ? threshold.v : self.quietThresh;
		});

		$loc.sound_level = new Sk.builtin.func(function (self) {
			self.sound_level = $('#mb-micro_slider').slider('option', 'value');
			return new Sk.builtin.int_(self.sound_level);
		});

		$loc.current_event = new Sk.builtin.func(function (self) {
			self.sound_level = $('#mb-micro_slider').slider('option', 'value');
			if (self.sound_level >= self.loudThresh) {
				return microbit.SoundEvent.LOUD;
			} else if (self.sound_level >= self.quietThresh) {
				return microbit.SoundEvent.QUIET;
			} else {
				// TODO: test micro:bit microphone to define this condition.
				return Sk.builtin.none();
			}
		});

		$loc.is_event = new Sk.builtin.func(function (self) {
		});

		$loc.was_event = new Sk.builtin.func(function (self, state) {
			self.sound_level = $('#mb-micro_slider').slider('option', 'value');
			const was = state.v == "loud" ? self.wasLoud : self.wasQuiet;
			self.wasLoud = false;
			self.wasQuiet = false;
			return new Sk.builtin.bool(was);
		});

	}, "MicroBitMicrophone", []);

	microbit.microphone = new MicroBitMicrophone();
	microbit.microphone.tp$init();

	const audio = function () {

		var mod = {};
		return mod;
	};

	microbit.audio = new Sk.builtin.module();
	microbit.audio.$d = new audio();

	const i2c = function () {

		var mod = {};

		read = function (addr, n, repeat) {
			if (repeat === undefined) {
				repeat = new Sk.builtin.bool(false);
			}
		};
		read.co_varnames = ['addr', 'n', 'repeat'];
		read.$defaults = [Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.bool(false)];
		read.co_numargs = 3;

		mod.read = new Sk.builtin.func(read);

		write = function (addr, buf, repeat) {
			if (repeat === undefined) {
				repeat = new Sk.builtin.bool(false);
			}
		};
		write.co_varnames = ['addr', 'buf', 'repeat'];
		write.$defaults = [Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.bool(false)];
		write.co_numargs = 3;

		mod.write = new Sk.builtin.func(write);

		return mod;
	};

	microbit.i2c = new Sk.builtin.module();
	microbit.i2c.$d = new i2c();

	const uart = function () {

		var mod = {};

		mod.data = {
			baudrate: 9600,
			bits: 8,
			parity: null,
			stop: 1,
			tx: null,
			rx: null,
			gps: {
				longitude: 0,
				latitude: 0,
				altitude: 0,
			},
			isChanged: false
		};

		mod.write = new Sk.builtin.func(function () {
			for (let i = 0; i < Simulator.pinList.length; i++) {
				const pin = Simulator.pinList[i].pin;
				const id = Simulator.pinList[i].id;
				if ("openlog_" + pin == id && $('#' + id + '_value').html() != "ON") {
					$('#' + id + '_value').html("ON");
					$('#' + id + '_anim').css("opacity", 1);
					setTimeout(function () {
						$('#' + id + '_value').html("OFF");
						$('#' + id + '_anim').css("opacity", 0);
					}, 500);
				}
				if ("gps_" + pin == id) {
					$('#' + id + '_value').html("ON");
				}
			}
		});

		mod.read = new Sk.builtin.func(function () {
			let gps = false;
			let modules = Simulator.getMosaicModules();
			for (m in modules) {
				if (modules[m].id == "gps") {
					gps = true;
				}
			}
			if (gps) {
				let latitude = '';
				var nmea = '';
				mod.data.gps.latitude = parseFloat($("#gps_slider_lat").slider('value'));
				if (mod.data.gps.latitude > 0) {
					let degree = mod.data.gps.latitude;
					let format = Math.floor(degree) * 100 + (degree - Math.floor(degree)) * 60;
					if (degree < 10) latitude += '0';
					latitude += format.toFixed(4) + ",N";
				} else if (mod.data.gps.latitude < 0) {
					let degree = Math.abs(mod.data.gps.latitude);
					let format = Math.floor(degree) * 100 + (degree - Math.floor(degree)) * 60;
					if (degree < 10) latitude += '0';
					latitude += format.toFixed(4) + ",S";
				} else {
					latitude += "0000.0000,N";
				}
				let longitude = '';
				mod.data.gps.longitude = parseFloat($("#gps_slider_lon").slider('value'));
				if (mod.data.gps.longitude > 0) {
					let degree = mod.data.gps.longitude;
					let format = Math.floor(degree) * 100 + (degree - Math.floor(degree)) * 60;
					if (degree < 100) {
						longitude += '0';
						if (degree < 10) longitude += '0';
					}
					longitude += format.toFixed(4) + ",E";
				} else if (mod.data.gps.longitude < 0) {
					let degree = Math.abs(mod.data.gps.longitude);
					let format = Math.floor(degree) * 100 + (degree - Math.floor(degree)) * 60;
					if (degree < 100) {
						longitude += '0';
						if (degree < 10) longitude += '0';
					}
					longitude += format.toFixed(4) + ",W";
				} else {
					longitude += "00000.0000,E";
				}
				mod.data.gps.altitude = parseInt($("#gps_value_alt").html());
				let now = new Date();

				let time = now.getHours() * 10000 + now.getMinutes() * 100 + now.getSeconds();
				var letters = ['GP', 'GA', 'BD', 'GB', 'GL', 'GN'];
				var date = new Date().toISOString().slice(2, 10).replace("-", "").replace("-", "");

				if (Math.random() > 0.5) {
					var nmea = "b'$" + letters[Math.floor(Math.random() * letters.length)] + "GGA," + time + ".000," + latitude + "," + longitude + ",1,04,3.2," + mod.data.gps.altitude + ".0,M,,,,0000*0E\\r\\n'"
				} else {
					var nmea = "b'$" + letters[Math.floor(Math.random() * letters.length)] + "RMC," + time + ".000,A," + latitude + "," + longitude + ",0,0," + date + ",0,W*68\\r\\n'"
				}
				return new Sk.builtin.str(nmea);
			} else {
				return Sk.builtin.none();
			}
		});

		mod.readline = mod.read;

		var init = function (baudrate, bits, parity, stop, tx, rx) {
			if (baudrate === undefined) {
				baudrate = new Sk.builtin.int_(9600);
			}
			if (bits === undefined) {
				bits = new Sk.builtin.int_(8);
			}
			if (parity === undefined) {
				parity = Sk.builtin.none;
			}
			if (stop === undefined) {
				stop = new Sk.builtin.int_(1);
			}
			if (tx === undefined) {
				tx = Sk.builtin.none;
			}
			if (rx === undefined) {
				rx = Sk.builtin.none;
			}
			mod.data.baudrate = baudrate;
			mod.data.bits = bits;
			mod.data.parity = parity;
			mod.data.stop = stop;
			mod.data.tx = tx;
			mod.data.rx = rx;
		}

		init.co_varnames = ['baudrate', 'bits', 'parity', 'stop', 'tx', 'rx'];
		init.$defaults = [new Sk.builtin.int_(9600), new Sk.builtin.int_(8), Sk.builtin.none(), new Sk.builtin.int_(1), Sk.builtin.none(), Sk.builtin.none];
		init.co_numargs = 6;

		mod.init = new Sk.builtin.func(init);

		mod.any = new Sk.builtin.func(function () {
			return new Sk.builtin.bool(true);
		});

		return mod;
	};

	microbit.uart = new Sk.builtin.module();
	microbit.uart.$d = new uart();

	const spi = function () {

		var mod = {};
		return mod;
	};

	microbit.spi = new Sk.builtin.module();
	microbit.spi.$d = new spi();

	microbit.reset = new Sk.builtin.func(function () {
		Simulator.startTime = Date.now();
	});

	microbit.sleep = new Sk.builtin.func(function (delay) {
		Sk.builtin.pyCheckArgsLen("sleep", arguments.length, 1, 1);
		Sk.builtin.pyCheckType("delay", "float", Sk.builtin.checkNumber(delay));
		return Simulator.sleep_ms(Sk.ffi.remapToJs(delay));
	});

	microbit.running_time = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(Date.now() - Simulator.startTime);
	});

	microbit.panic = new Sk.builtin.func(function (n) {
		Simulator.monitor.output("Panic mode: " + n.v);
	});

	microbit.temperature = new Sk.builtin.func(function () {
		return new Sk.builtin.int_($("#mb-thermometer_slider").slider('option', 'value'));
	});

	microbit.set_volume = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("microbit.set_volume() is not yet implemented");
	});

	microbit.ws2812_write = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("microbit.ws2812_write() is not yet implemented");
	});

	microbit.run_every = import_modules.microbit_run_every.run_every;

	microbit.ws2812_write = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("microbit.ws2812_write() is not yet implemented");
	});

	const read_digital = function (self) {
		self.mode = 'read_digital';
		return new Sk.builtin.int_(Simulator.getPinSliderValue(self.name));
	};

	const read_analog = function (self) {
		self.mode = 'unused';
		return new Sk.builtin.int_(Simulator.getPinSliderValue(self.name));
	};

	const write_digital = function (self, state) {
		const component = Simulator.pinList.find((component) => component.pin == self.name);
		if (component !== undefined) {
			self.mode = 'write_digital';
			const mod = Simulator.getModuleByKey(component.id.split('_')[0]);
			Simulator.setAnimator(mod, component.id, state.v);
		}
	};

	const write_analog = function (self, value) {
		const component = Simulator.pinList.find((component) => component.pin == self.name);
		if (component !== undefined) {
			self.mode = 'write_analog';
			const mod = Simulator.getModuleByKey(component.id.split('_')[0]);
			Simulator.setAnimator(mod, component.id, value.v);
		}
	};

	const set_pull = function (self, pull) {
		self.pull = pull.v;
		const component = Simulator.pinList.find((component) => component.pin == self.name);
		if (component !== undefined) {
			switch (self.pull) {
				case 2:
					Simulator.setPullButton(component.id, 'no_pull');
					break;
				case 0:
					Simulator.setPullButton(component.id, 'up');
					break;
				case 1:
				default:
					Simulator.setPullButton(component.id, 'down');
			}
		}
	};

	const get_pull = function (self) {
		if (self.mode === 'read_digital') {
			return new Sk.builtin.int_(self.pull);
		}
		throw new Sk.builtin.ValueError("Pin " + self.name + ' in ' + self.mode + ' mode');
	};

	const MicroBitDigitalPin = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self, pin) {
			self.name = pin.v;
			self.value = 0;
			self.pull = 2;
			self.mode = 'unused';
		});

		$loc.PULL_UP = new Sk.builtin.int_(0);
		$loc.PULL_DOWN = new Sk.builtin.int_(1);
		$loc.NO_PULL = new Sk.builtin.int_(2);

		$loc.write_digital = new Sk.builtin.func(write_digital);

		$loc.read_digital = new Sk.builtin.func(read_digital);

		$loc.write_analog = new Sk.builtin.func(write_analog);

		$loc.set_analog_period = new Sk.builtin.func(function (self, period) {
			self.period_us = period.v * 1000;
		});

		$loc.set_analog_period_microseconds = new Sk.builtin.func(function (self, period) {
			self.period_us = period.v;
		});

		$loc.get_analog_period_microseconds = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(self.period_us);
		});

		$loc.get_pull = new Sk.builtin.func(get_pull);

		$loc.set_pull = new Sk.builtin.func(set_pull);

		$loc.get_mode = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str(self.mode);
		});

	}, "MicroBitDigitalPin", []);

	const digitalPins = [5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 19, 20];
	for (var i = 0; i < digitalPins.length; i++) {
		const pin = digitalPins[i];
		microbit['pin' + pin] = new MicroBitDigitalPin(new Sk.builtin.int_(pin));
		microbit['pin' + pin].name = pin;
	}

	var MicroBitAnalogDigitalPin = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self, pin) {
			self.name = pin.v;
			self.value = 0;
			self.period_us = 35;
			self.pull = 2;
			self.mode = 'unused';
		});

		$loc.PULL_UP = new Sk.builtin.int_(0);
		$loc.PULL_DOWN = new Sk.builtin.int_(1);
		$loc.NO_PULL = new Sk.builtin.int_(2);

		$loc.write_digital = new Sk.builtin.func(write_digital);

		$loc.read_digital = new Sk.builtin.func(read_digital);

		$loc.write_analog = new Sk.builtin.func(write_analog);

		$loc.read_analog = new Sk.builtin.func(read_analog);

		$loc.set_analog_period = new Sk.builtin.func(function (self, period) {
			self.period_us = period.v * 1000;
		});

		$loc.set_analog_period_microseconds = new Sk.builtin.func(function (self, period) {
			self.period_us = period.v;
		});

		$loc.get_analog_period_microseconds = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(self.period_us);
		});

		$loc.get_pull = new Sk.builtin.func(get_pull);

		$loc.set_pull = new Sk.builtin.func(set_pull);

		$loc.get_mode = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str(self.mode);
		});

	}, "MicroBitAnalogDigitalPin", []);

	const analogPins = [3, 4, 10];
	for (var i = 0; i < analogPins.length; i++) {
		const pin = analogPins[i];
		microbit['pin' + pin] = new MicroBitAnalogDigitalPin(new Sk.builtin.int_(pin));
		microbit['pin' + pin].name = pin;
	}

	const MicroBitTouchPin = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self, pin) {
			self.name = pin.v;
			self.value = 0;
			self.period_us = 0;
			self.pull = 2;
			self.mode = 'unused';
		});

		$loc.PULL_UP = new Sk.builtin.int_(0);
		$loc.PULL_DOWN = new Sk.builtin.int_(1);
		$loc.NO_PULL = new Sk.builtin.int_(2);
		$loc.RESISTIVE = new Sk.builtin.int_(0);
		$loc.CAPACITIVE = new Sk.builtin.int_(1);

		$loc.write_digital = new Sk.builtin.func(write_digital);

		$loc.read_digital = new Sk.builtin.func(read_digital);

		$loc.write_analog = new Sk.builtin.func(write_analog);

		$loc.read_analog = new Sk.builtin.func(read_analog);

		$loc.set_analog_period = new Sk.builtin.func(function (self, period) {
			self.period_us = period.v * 1000;
		});

		$loc.set_analog_period_microseconds = new Sk.builtin.func(function (self, period) {
			self.period_us = period.v;
		});

		$loc.get_analog_period_microseconds = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(self.period_us);
		});

		$loc.get_pull = new Sk.builtin.func(get_pull);

		$loc.set_pull = new Sk.builtin.func(set_pull);

		$loc.get_mode = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str(self.mode);
		});

		$loc.is_touched = new Sk.builtin.func(function (self) {
			self.mode = 'touched';
			return new Sk.builtin.bool(Simulator.getSliderValue('mb-pin-' + self.name));
		});

		$loc.set_touch_mode = new Sk.builtin.func(function (self, touch_mode) {
			self.touch_mode = touch_mode.v;
			switch (self.touch_mode) {
				case $loc.RESISTIVE.v:
					// TO DO
					break;
				default:
				case $loc.CAPACITIVE.v:
					// TO DO
			}
		});

	}, "MicroBitTouchPin", []);

	const touchPins = [0, 1, 2];
	for (var i = 0; i < touchPins.length; i++) {
		const pin = touchPins[i];
		microbit['pin' + pin] = new MicroBitTouchPin(new Sk.builtin.int_(pin));
		microbit['pin' + pin].name = pin;
	}

	var MicroBitTouchOnlyPin = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self) {
			self.name = 'logo';
		});

		$loc.RESISTIVE = new Sk.builtin.int_(0);
		$loc.CAPACITIVE = new Sk.builtin.int_(1);

		$loc.is_touched = new Sk.builtin.func(function (self) {
			return new Sk.builtin.bool(Simulator.getSliderValue('mb-pin-' + self.name));
		});

		$loc.set_touch_mode = new Sk.builtin.func(function (self, touch_mode) {
			self.touch_mode = touch_mode.v;
			switch (self.touch_mode) {
				case $loc.RESISTIVE.v:
					// TO DO
					break;
				default:
				case $loc.CAPACITIVE.v:
					// TO DO
			}
		});

	}, "MicroBitTouchOnlyPin", []);

	microbit.pin_logo = new MicroBitTouchOnlyPin();
	microbit.pin_logo.name = 'logo';

	var ioPinSpeaker = new Sk.misceval.buildClass(microbit, function ($gbl, $loc) {

		$loc.buzzer = new Sk.builtin.module();
		$loc.buzzer.$d = new Simulator.Behaviours.output.buzzer('buzzer');

	}, "MicroBitSpeakerPin", []);

	microbit.pin_speaker = new ioPinSpeaker();
	microbit.pin_speaker.name = 'speaker';

	microbit.serialInput = new Sk.builtin.module();
	microbit.serialInput.$d = new Simulator.Behaviours.input.serialInput();

	microbit.multichannel_v2 = new Sk.builtin.module();
	microbit.multichannel_v2.$d = new Simulator.Behaviours.input.multichannelV2();

	microbit.gamepad_in = new Sk.builtin.module();
	microbit.gamepad_in.$d = new Simulator.Behaviours.input.gamepad_in();

	microbit.gamepad_out = new Sk.builtin.module();
	microbit.gamepad_out.$d = new Simulator.Behaviours.output.gamepad_out();
	
	microbit.gamepad_v4_in = new Sk.builtin.module();
	microbit.gamepad_v4_in.$d = new Simulator.Behaviours.input.gamepad_v4_in();

	microbit.gamepad_v4_out = new Sk.builtin.module();
	microbit.gamepad_v4_out.$d = new Simulator.Behaviours.output.gamepad_v4_out();

	microbit.bitplayer_in = new Sk.builtin.module();
	microbit.bitplayer_in.$d = new Simulator.Behaviours.input.bitplayer_in();

	microbit.traffic_light = new Sk.builtin.module();
	microbit.traffic_light.$d = new Simulator.Behaviours.output.traffic_light();

	microbit.oled = new Sk.builtin.module();
	microbit.oled.$d = new Simulator.Behaviours.output.oled();

	microbit.maqueen = new Sk.builtin.module();
	microbit.maqueen.$d = new Simulator.Behaviours.output.maqueen();

	microbit.kitrobot = new Sk.builtin.module();
	microbit.kitrobot.$d = new Simulator.Behaviours.output.kitrobot();

	microbit.codo = new Sk.builtin.module();
	microbit.codo.$d = new Simulator.Behaviours.output.codo();

	microbit.oobybot = new Sk.builtin.module();
	microbit.oobybot.$d = new Simulator.Behaviours.output.oobybot();

	microbit.buggy = new Sk.builtin.module();
	microbit.buggy.$d = new Simulator.Behaviours.output.buggy();

	microbit.bitbot = new Sk.builtin.module();
	microbit.bitbot.$d = new Simulator.Behaviours.output.bitbot();

	microbit.bitcar = new Sk.builtin.module();
	microbit.bitcar.$d = new Simulator.Behaviours.output.bitcar();

	return microbit;
};