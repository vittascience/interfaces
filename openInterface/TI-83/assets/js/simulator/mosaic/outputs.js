Simulator.Behaviours.output = Object.create(null);

/**
 * Display
 */

Simulator.Behaviours.output.display = function () {
	for (var x = 0; x < 5; x++) {
		for (var y = 0; y < 5; y++) {
			$("#board-viewer").append('<div class="mb_led mb_led_row_' + y + ' mb_led_col_' + x + '"></div>');
		}
	}
	var mod = Object.create(null);
	mod.data = {
		leds: [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		],
		letters: SIMULATOR_DISPLAY_ALPHABET,
		TRUE: "True",
		FALSE: "False"
	};
	mod['get_pixel'] = new Sk.builtin.func(function (x, y) {
		return new Sk.builtin.int_(mod.data.leds[y.v][x.v]);
	});
	mod['set_pixel'] = new Sk.builtin.func(function (x, y, brightness) {
		const x_i = parseInt(x.v);
		const y_i = parseInt(y.v);
		if (x_i > 4 || x_i < 0 || y_i > 4 || x_i < 0) {
			UIManager.showErrorMessage("error-message", "ValueError: L'indice est en dehors de l'écran.");
		} else {
			setLED(x_i, y_i, parseInt(brightness.v));
		}
	});
	mod['clear'] = new Sk.builtin.func(function () {
		clearScreen();
	});

	function setLED(x, y, brightness) {
		$('.mb_led.mb_led_row_' + y + '.mb_led_col_' + x).removeClass('mb_led_brightness_1 mb_led_brightness_2 mb_led_brightness_3 mb_led_brightness_4 mb_led_brightness_5 mb_led_brightness_6 mb_led_brightness_7 mb_led_brightness_8 mb_led_brightness_9').addClass('mb_led_brightness_' + brightness);
		mod.data.leds[y][x] = brightness;
	};

	function clearScreen() {
		for (var x = 0; x < 5; x++) {
			for (var y = 0; y < 5; y++) {
				setLED(x, y, 0);
			}
		}
	};

	show = function (image, delay, wait, loop, clear) {
		Sk.builtin.pyCheckArgsLen("show", arguments.length, 1, 5);
		Sk.builtin.pyCheckType("delay", "float", Sk.builtin.checkNumber(delay));
		Sk.builtin.pyCheckType("wait", "boolean", Sk.builtin.checkBool(wait));
		Sk.builtin.pyCheckType("loop", "boolean", Sk.builtin.checkBool(loop));
		Sk.builtin.pyCheckType("clear", "boolean", Sk.builtin.checkBool(clear));
		if (Sk.builtin.checkBool(image)) {
			if (image.v) {
				image = new Sk.builtin.str(mod.data.TRUE)
			} else {
				image = new Sk.builtin.str(mod.data.FALSE)
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
						image = Sk.builtin.none()
						clearScreen();
						resolve();}
					if (image.v && (i >= image.v.length || isFormattedImage) && i > 0) {
						if (loop.v) {
							i = 0;
						} else {
							if (clear.v) {
								clearScreen();
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
								setLED(x, y, pixels[y][x]);
							}
						}
					} else if (Sk.builtin.checkString(image)) {
						showCharacter(image.v[i]);
					} else if (image.v && Sk.builtin.checkString(image)) {
						showCharacter(image.v[i].v[0]);
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

	show.co_varnames = ['image', 'delay', 'wait', 'loop', 'clear'];
	show.$defaults = [new Sk.builtin.int_(400), new Sk.builtin.bool(true), new Sk.builtin.bool(false), new Sk.builtin.bool(false)];
	mod.show = new Sk.builtin.func(show);

	function showCharacter(c) {
		var x, y;
		var rows = ['', '', '', '', ''];
		var letter = mod.data.letters[" "];
		if (mod.data.letters.hasOwnProperty(c)) {
			letter = mod.data.letters[c];
		}
		for (y = 0; y < 5; y++) {
			for (x = 0; x < 5; x++) {
				setLED(x, y, letter[y][x]);
			}
		}
	};

	scroll = function (text, delay, wait) {
		Sk.builtin.pyCheckArgsLen("show", arguments.length, 1, 3);
		Sk.builtin.pyCheckType("delay", "float", Sk.builtin.checkNumber(delay));
		Sk.builtin.pyCheckType("wait", "boolean", Sk.builtin.checkBool(wait));
		if (Sk.builtin.checkNumber(text)) {
			text = new Sk.builtin.str(text.v)
		}
		const delay_ms = delay.v;
		const show = " " + text.v + " ";
		return Simulator.runAsync(function (resolve, reject) {
			var i, x, y;
			var rows = ['', '', '', '', ''];
			for (i = 0; i < show.length; i++) {
				var currentLetter = show[i];
				var letter = mod.data.letters[" "];
				if (mod.data.letters.hasOwnProperty(currentLetter)) {
					letter = mod.data.letters[currentLetter];
				}
				for (y = 0; y < 5; y++) {
					rows[y] += letter[y] + " ";
				}
			}
			var width = rows[0].length;
			var offset = 0;

			function showScroll() {
				if (Simulator.stop_flag == true) {
					clearScreen();
					resolve();
				} else {
					for (y = 0; y < 5; y++) {
						for (x = offset; x < offset + 5; x++) {
							setLED(x - offset, y, rows[y][x]);
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

	scroll.co_varnames = ['text', 'delay', 'wait'];
	scroll.$defaults = [new Sk.builtin.int_(800), new Sk.builtin.bool(true)];
	mod.scroll = new Sk.builtin.func(scroll);

	return mod;
};