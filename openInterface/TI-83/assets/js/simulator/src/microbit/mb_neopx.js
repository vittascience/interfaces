// TI-83 & micro:bit - mb_neopx module

var $builtinmodule = function (name) {
	return Sk.misceval.chain(
		Sk.importModule('mb_pins', false, true), // Import mb_pins module
		function (mb_pins) {
			var mb_neopx = {};
			mb_neopx.__name__ = new Sk.builtin.str('mb_neopx');
			mb_neopx.pin0 = mb_pins.$d.pin0;
			mb_neopx.pin1 = mb_pins.$d.pin1;
			mb_neopx.pin2 = mb_pins.$d.pin2;
			mb_neopx.pin8 = mb_pins.$d.pin8;
			mb_neopx.pin13 = mb_pins.$d.pin13;
			mb_neopx.pin14 = mb_pins.$d.pin14;
			mb_neopx.pin15 = mb_pins.$d.pin15;
			mb_neopx.pin16 = mb_pins.$d.pin16;
			mb_neopx.pin_speaker = mb_pins.$d.pin_speaker;

			var NeoPixel = function ($gbl, $loc) {
				NeoPixel__init__ = function (self, pin, n, bpp, timing) {
					Sk.builtin.pyCheckArgsLen('__init__', arguments.length, 2, 5);
					Sk.builtin.pyCheckType('n', 'integer', Sk.builtin.checkInt(n));
					Sk.builtin.pyCheckType('bpp', 'float', Sk.builtin.checkInt(bpp));
					Sk.builtin.pyCheckType('timing', 'float', Sk.builtin.checkInt(timing));
					self.n = n.v;
					self.bpp = bpp.v;
					self.timing = timing.v;
					if (pin !== undefined && pin.name) {
						self.pin = pin.name;
						self.LEDS = [];
						let html = '<div class=row>';
						for (var i = 0; i < self.n; i++) {
							html += '<div class="neopixel-block neopixel-' + self.pin + '" style="background-color:#000000;"></div>';
							self.LEDS.push([50, 50, 50]);
						}
						html += '</div>';
						$('#neopixel_' + self.pin + '_value').html(html);
					} else {
						// TODO: print error
					}
				};

				NeoPixel__init__.co_varnames = ['self', 'pin', 'n', 'bbp', 'timing'];
				NeoPixel__init__.$defaults = [new Sk.builtin.int_(30), new Sk.builtin.int_(1), new Sk.builtin.int_(3)];

				$loc.__init__ = new Sk.builtin.func(NeoPixel__init__);

				$loc.__setitem__ = new Sk.builtin.func(function (self, index, rgb) {
					Sk.builtin.pyCheckArgsLen('__setitem__', arguments.length, 3, 3);
					Sk.builtin.pyCheckType('index', 'integer', Sk.builtin.checkInt(index));
					Sk.builtin.pyCheckType('rgb', 'iterable', Sk.builtin.checkIterable(rgb));
					self.LEDS[index.v] = Sk.ffi.remapToJs(rgb);
				});

				$loc.__getitem__ = new Sk.builtin.func(function (self, index) {
					Sk.builtin.pyCheckArgsLen('__getitem__', arguments.length, 2, 2);
					Sk.builtin.pyCheckType('index', 'integer', Sk.builtin.checkInt(index));
					return new Sk.builtin.tuple(self.LEDS[index.v]);
				});

				$loc.show = new Sk.builtin.func(function (self) {
					for (var i = 0; i < self.n; i++) {
						if (typeof self.LEDS[i] === 'object') {
							const color = self.LEDS[i];
							$('.neopixel-' + self.pin)
								.eq(i)
								.css('background-color', 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
						}
					}
					return Sk.builtin.none();
				});

				$loc.clear = new Sk.builtin.func(function (self) {
					for (var i = 0; i < self.n; i++) {
						self.LEDS[i] = [50, 50, 50];
					}
					$loc.show.func_code(self);
					return Sk.builtin.none();
				});
			};

			mb_neopx.NeoPixel = new Sk.misceval.buildClass(mb_neopx, NeoPixel, 'NeoPixel', []);

			
			var Color = function ($gbl, $loc) {
				Color__init__ = function (self, pin) {
					Sk.builtin.pyCheckArgsLen('__init__', arguments.length, 2, 2);
					self.n = 1; // need to check if Color can be used with more than 1 LED and remove for loop
					if (pin !== undefined && pin.name) {
						self.pin = pin.name;
						self.LEDS = [];
						let html = '<div class=row>';
						for (var i = 0; i < self.n; i++) {
							html += '<div class="neopixel-block neopixel-' + self.pin + '" style="background-color:#000000;"></div>';
							self.LEDS.push([50, 50, 50]);
						}
						html += '</div>';
						$('#neopixel-color_' + self.pin + '_value').html(html);
					} else {
					}
				};

				Color__init__.co_varnames = ['self', 'pin'];
				
				$loc.__init__ = new Sk.builtin.func(Color__init__);

				$loc.rgb = new Sk.builtin.func(function (self, r, g, b) {
					console.log(self.LEDS)
					for (var i = 0; i < self.n; i++) {
						self.LEDS[i] = [r.v, g.v, b.v];
						const color = self.LEDS[i];
						$('.neopixel-' + self.pin)
							.eq(i)
							.css('background-color', 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
					}
				});

				$loc.show = new Sk.builtin.func(function (self) {
					for (var i = 0; i < self.n; i++) {
						if (typeof self.LEDS[i] === 'object') {
							const color = self.LEDS[i];
							$('.neopixel-' + self.pin)
								.eq(i)
								.css('background-color', 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
						}
					}
					return Sk.builtin.none();
				});
			};

			mb_neopx.Color = new Sk.misceval.buildClass(mb_neopx, Color, 'Color', []);

			return mb_neopx;
		}
	);
};
