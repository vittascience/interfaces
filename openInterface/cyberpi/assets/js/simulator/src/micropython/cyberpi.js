// CyberPi - cyberpi module

const $builtinmodule = function (name) {

	const cyberpi = {};

	cyberpi.__name__ = new Sk.builtin.str('cyberpi');

	const led = new Sk.misceval.buildClass(cyberpi, function ($gbl, $loc) {

		const LED_COUNT = 5;

		$loc.__init__ = new Sk.builtin.func(function (self) {
			self.name = 'led';
			self.LEDS = [];
			self.brightness = 1;
			let html = '<div class="row cyberpi-builtin-led_module_rub">';
			for (var i = 0; i < LED_COUNT; i++) {
				html += '<div class="cyberpi-builtin-led-block cyberpi-rgb-leds" style="background-color:#000000;"></div>';
				self.LEDS.push([50, 50, 50]);
			}
			html += "</div>";
			$('#cyberpi-builtin-led_value').html(html);
		});

		const showLED = function (self) {
			for (var i = 0; i < LED_COUNT; i++) {
				if (typeof self.LEDS[i] === 'object') {
					const color = self.LEDS[i];
					$(".cyberpi-rgb-leds").eq(i).css("background-color", "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
					$(".cyberpi-rgb-leds").eq(i).css("opacity", self.brightness);
					$("#board-container, #cyberpi-led" + i).attr("fill", "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
					$("#board-container, #cyberpi-led" + i).attr("opacity", self.brightness);
				}
			}
		};

		const on = function (self, r, g, b, id) {
			Sk.builtin.pyCheckArgsLen("on", arguments.length, 4, 5);
			Sk.builtin.pyCheckType("r", "int or float", Sk.builtin.checkNumber(r));
			Sk.builtin.pyCheckType("g", "int or float", Sk.builtin.checkNumber(g));
			Sk.builtin.pyCheckType("b", "int or float", Sk.builtin.checkNumber(b));
			if (id.v == "all") {
				for (var i = 0; i < LED_COUNT; i++) {
					self.LEDS[i] = [r.v, g.v, b.v];
				}
			} else {
				self.LEDS[id.v - 1] = [r.v, g.v, b.v];
			}
			showLED(self);
			return Sk.builtin.none();
		};
		on.co_varnames = ['self', 'r', 'g', 'b', 'id'];
		on.$defaults = [new Sk.builtin.str("all")];

		$loc.on = new Sk.builtin.func(on);

		const play = function (self, name) {
			Sk.builtin.pyCheckArgsLen("play", arguments.length, 1, 2);
			Sk.builtin.pyCheckType("name", "str", Sk.builtin.checkString(name));
			if (name.v == 'flash_red') {
				return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
					self.brightness = 1;
					on(self, new Sk.builtin.int_(255), new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.str("all"));
					await sleep_ms(150);
					self.brightness = 0.5;
					showLED(self);
					await sleep_ms(100);
					self.brightness = 0.1;
					showLED(self);
					await sleep_ms(150);
					self.brightness = 0.5;
					showLED(self);
					await sleep_ms(150);
					self.brightness = 1;
					showLED(self);
					await sleep_ms(100);
					self.brightness = 0.5;
					showLED(self);
					await sleep_ms(150);
					self.brightness = 1;
					showLED(self);
					resolve(Sk.builtin.none());
				}));
			}
			return Sk.builtin.none();
		};

		play.co_varnames = ['self', 'name'];
		play.$defaults = [Sk.builtin.none()];

		$loc.play = new Sk.builtin.func(play);

		const move = function (self, step) {
			Sk.builtin.pyCheckArgsLen("move", arguments.length, 1, 2);
			Sk.builtin.pyCheckType("step", "int", Sk.builtin.checkInt(step));
			for (var i = 0; i < Math.abs(step.v); i++) {
				if (step.v > 0) {
					self.LEDS = [self.LEDS.pop()].concat(self.LEDS);
				} else {
					self.LEDS.push(self.LEDS.shift());
				}
			}
			showLED(self);
			return Sk.builtin.none();
		};

		move.co_varnames = ['self', 'step'];
		move.$defaults = [new Sk.builtin.int_(1)];

		$loc.move = new Sk.builtin.func(move);

		const set_bri = function (self, brightness) {
			Sk.builtin.pyCheckArgsLen("set_bri", arguments.length, 2, 2);
			Sk.builtin.pyCheckType("brightness", "int or float", Sk.builtin.checkInt(brightness));
			self.brightness = brightness.v / 100;
			showLED(self);
			return Sk.builtin.none();
		};

		set_bri.co_varnames = ['self', 'brightness'];
		set_bri.$defaults = [];

		$loc.set_bri = new Sk.builtin.func(set_bri);

		const get_bri = function (self) {
			Sk.builtin.pyCheckArgsLen("get_bri", arguments.length, 1, 1);
			return new Sk.builtin.int_(self.brightness * 100);
		};

		get_bri.co_varnames = ['self'];
		get_bri.$defaults = [];

		$loc.get_bri = new Sk.builtin.func(get_bri);

	}, "_led_o", []);

	cyberpi.led = new led();
	cyberpi.led.tp$init([]);

	return cyberpi;
};
