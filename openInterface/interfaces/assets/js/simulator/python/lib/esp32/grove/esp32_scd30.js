// ESP32 - esp32_scd30 module

var $builtinmodule = function () {

	var esp32_scd30 = {};

	esp32_scd30.SCD30_I2C_ADDR = new Sk.builtin.int_(0x61);

	esp32_scd30.SCD30 = new Sk.misceval.buildClass(esp32_scd30, function ($gbl, $loc) {

		SCD30__init__ = function (self, i2c, addr, pause) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 4);
			Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
			Sk.builtin.pyCheckType("pause", "float", Sk.builtin.checkNumber(pause));
			if (Sk.builtin.checkNone(i2c)) {
				throw new Sk.builtin.ValueError("I2C object 'SCD30' needed as argument!");
			} else {
				self.i2c = i2c;
				self.addr = addr.v;
				$("#scd30-co2").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
				$("#scd30-temp").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
				$("#scd30-hum").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
				self.pause = pause.v;
			}
		};

		SCD30__init__.co_varnames = ['self', 'i2c', 'addr', 'pause'];
		SCD30__init__.$defaults = [Sk.builtin.none(), esp32_scd30.SCD30_I2C_ADDR, new Sk.builtin.int_(1000)];

		$loc.__init__ = new Sk.builtin.func(SCD30__init__);

		$loc.read_measurement = new Sk.builtin.func(function (self) {
			const result = [
				$('#scd30-co2_slider').slider('option', 'value'),
				$('#scd30-temp_slider').slider('option', 'value'),
				$('#scd30-hum_slider').slider('option', 'value')
			];
			return new Sk.builtin.list(result);
		});

		$loc.set_forced_recalibration = new Sk.builtin.func(function (self, co2_ppm) {
			return Sk.builtin.none();
		});

	}, "SCD30");

	return esp32_scd30;
};