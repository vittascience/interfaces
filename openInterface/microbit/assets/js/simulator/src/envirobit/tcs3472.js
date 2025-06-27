// Enviro:bit - tcs3472 module

var $builtinmodule = function () {

	var tcs3472 = {};

	tcs3472.TCS3472 = new Sk.misceval.buildClass(tcs3472, function ($gbl, $loc) {

		TCS3472__init__ = function (self, led_pin) {
			self.led_pin = led_pin;
			self.state = 0;
			$("#tcs3472").find(".subtitle-module").html('I2C (0x29)');
		};

		TCS3472__init__.co_varnames = ['self','led_pin'];
		TCS3472__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(TCS3472__init__);

		$loc.set_leds = new Sk.builtin.func(function (self,state) {
			self.state = Sk.ffi.remapToJs(state);
			$('.tcs3472-led').css("opacity",self.state);
			$('#tcs3472-led_value').html((self.state == 1 ? "ON" : "OFF"));
		});

		$loc.brightness = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(parseInt($("#tcs3472-light_value").html()));
		});

		$loc.rgb = new Sk.builtin.func(function (self) {
			const values = {
				"r": parseInt($("#tcs3472-rgb_slider_r").slider('option', 'value')),
				"g": parseInt($("#tcs3472-rgb_slider_g").slider('option', 'value')),
				"b": parseInt($("#tcs3472-rgb_slider_b").slider('option', 'value'))
			};
			return new Sk.builtin.list([new Sk.builtin.int_(values['r']),new Sk.builtin.int_(values['g']),new Sk.builtin.int_(values['b'])])
		});

	}, "TCS3472", []);

	return tcs3472;
};