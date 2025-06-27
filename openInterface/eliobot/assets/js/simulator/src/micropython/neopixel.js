// micro:bit - neopixel module

var $builtinmodule = function () {

	const SPECIFI_LED_MULTIPLIER = 3;

	var neopixel = {};

	neopixel.__name__ = new Sk.builtin.str("neopixel");
	neopixel.GRB = new Sk.builtin.str('GRB');

	var NeoPixel = function ($gbl, $loc) {

		NeoPixel__init__ = function (self, pin, n, brightness, auto_write, pixel_order) {
			self.pin = pin.v;
			self.n = Math.trunc(n.v / SPECIFI_LED_MULTIPLIER);
			self.brightness = brightness.v;
			self.auto_write = auto_write.v;
			self.pixel_order = pixel_order.v;
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
