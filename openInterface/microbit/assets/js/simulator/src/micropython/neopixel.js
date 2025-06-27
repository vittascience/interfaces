// micro:bit - neopixel module

var $builtinmodule = function (name) {

	var neopixel = {};

	neopixel.__name__ = new Sk.builtin.str("neopixel");

	var NeoPixel = function ($gbl, $loc) {

		NeoPixel__init__ = function (self, pin, n, bpp, timing) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 5);
			Sk.builtin.pyCheckType("n", "integer", Sk.builtin.checkInt(n));
			Sk.builtin.pyCheckType("bpp", "float", Sk.builtin.checkInt(bpp));
			Sk.builtin.pyCheckType("timing", "float", Sk.builtin.checkInt(timing));
			self.n = n.v;
			self.bpp = bpp.v;
			self.timing = timing.v;
			if (pin !== undefined && pin.name !== undefined) {
				self.pin = pin.name;
				self.LEDS = [];
				let html = '<div class=row>';
				for (var i = 0; i < self.n; i++) {
					html += '<div class="neopixel-block neopixel-' + self.pin + '" style="background-color:#000000;"></div>';
					self.LEDS.push([50, 50, 50]);
				}
				html += "</div>";
				$('#neopixel_' + self.pin + '_value').html(html);
			} else {
				// TODO: print error
			}
		};

		NeoPixel__init__.co_varnames = ['self', 'pin', 'n', 'bbp', 'timing'];
		NeoPixel__init__.$defaults = [new Sk.builtin.int_(30), new Sk.builtin.int_(1), new Sk.builtin.int_(3)];

		$loc.__init__ = new Sk.builtin.func(NeoPixel__init__);

		$loc.__setitem__ = new Sk.builtin.func(function (self, index, rgb) {
			Sk.builtin.pyCheckArgsLen("__setitem__", arguments.length, 3, 3);
			Sk.builtin.pyCheckType("index", "integer", Sk.builtin.checkInt(index));
			Sk.builtin.pyCheckType("rgb", "iterable", Sk.builtin.checkIterable(rgb));
			self.LEDS[index.v] = Sk.ffi.remapToJs(rgb);
		});

		$loc.__getitem__ = new Sk.builtin.func(function (self, index) {
			Sk.builtin.pyCheckArgsLen("__getitem__", arguments.length, 2, 2);
			Sk.builtin.pyCheckType("index", "integer", Sk.builtin.checkInt(index));
			return new Sk.builtin.tuple(self.LEDS[index.v]);
		});

		$loc.show = new Sk.builtin.func(function (self) {
			for (var i = 0; i < self.n; i++) {
				if (typeof self.LEDS[i] === 'object') {
					const color = self.LEDS[i];
					$(".neopixel-" + self.pin).eq(i).css("background-color", "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
				}
			}
			return Sk.builtin.none();
		});
	};

	neopixel.NeoPixel = new Sk.misceval.buildClass(neopixel, NeoPixel, "NeoPixel", []);

	return neopixel;
};
