// micro:bit - neopixel module

const $builtinmodule = function () {

	const SPECIFI_LED_MULTIPLIER = 3;

	const neopixel = {};

	neopixel.__name__ = new Sk.builtin.str("neopixel");
	neopixel.GRB = new Sk.builtin.str('GRB');

	const NeoPixel = function ($gbl, $loc) {

		NeoPixel__init__ = function (self, pin, n, brightness, auto_write, pixel_order) {
			self.pin = Sk.ffi.remapToJs(pin);
			self.n = Math.trunc(n.v / SPECIFI_LED_MULTIPLIER);
			self.brightness = Sk.ffi.remapToJs(brightness);
			self.auto_write = Sk.ffi.remapToJs(auto_write);
			self.pixel_order = Sk.ffi.remapToJs(pixel_order);
		};

		NeoPixel__init__.co_varnames = ['self', 'pin', 'n', 'brightness', 'auto_write', 'pixel_order'];
		$loc.__init__ = new Sk.builtin.func(NeoPixel__init__);

		$loc.fill = new Sk.builtin.func(function (self, rgb) {
			const color = Sk.ffi.remapToJs(rgb);
			document.querySelector(".RGBLed").style.background = 'rgb(' + color.join(',') + ')';
			return Sk.builtin.none();
		});

		$loc.show = new Sk.builtin.func(function (self) {
			return Sk.builtin.none();
		});
	};

	neopixel.NeoPixel = new Sk.misceval.buildClass(neopixel, NeoPixel, "NeoPixel", []);

	return neopixel;
};
