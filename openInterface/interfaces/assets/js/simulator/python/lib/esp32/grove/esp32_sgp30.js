// ESP32 - esp32_sgp30 module

var $builtinmodule = function () {

	var esp32_sgp30 = {};

	esp32_sgp30._SGP30_I2C_ADDR = new Sk.builtin.int_(0x58);

	esp32_sgp30.SGP30 = new Sk.misceval.buildClass(esp32_sgp30, function ($gbl, $loc) {

		SGP30__init__ = function (self, i2c, addr) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);
        	Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
			if (Sk.builtin.checkNone(i2c)) {
				throw new Sk.builtin.ValueError("I2C object 'SGP30' needed as argument!");
			} else {
				self.i2c = i2c;
				self.addr = addr.v;
				$("#sgp30").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
			}
		};

		SGP30__init__.co_varnames = ['self', 'i2c', 'addr'];
		SGP30__init__.$defaults = [Sk.builtin.none(), esp32_sgp30._SGP30_I2C_ADDR];

		$loc.__init__ = new Sk.builtin.func(SGP30__init__);

		$loc.co2_equivalent = new Sk.builtin.func(function (self) {
			const co2 = $('#sgp30_slider_co2').slider('option', 'value');
			return new Sk.builtin.int_(co2);
		});

		$loc.total_organic_compound = new Sk.builtin.func(function (self) {
			const tvoc = $('#sgp30_slider_cov').slider('option', 'value');
			return new Sk.builtin.int_(tvoc);
		});

	}, "SGP30");

	return esp32_sgp30;
};
