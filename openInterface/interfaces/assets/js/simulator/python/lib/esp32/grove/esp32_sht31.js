// Esp32 - esp32_sht31 module

var $builtinmodule = function () {

	var esp32_sht31 = {};

	esp32_sht31.SHT31_DEFAULT_I2C_ADDR = new Sk.builtin.int_(0x44);

	esp32_sht31.SHT31 = new Sk.misceval.buildClass(esp32_sht31, function ($gbl, $loc) {

		SHT31__init__ = function (self, i2c) {
			self.i2c = i2c;
			$("#sht31-temp").find(".subtitle-module").html('I2C (0x44)');
			$("#sht31-hum").find(".subtitle-module").html('I2C (0x44)');
		};

		SHT31__init__.co_varnames = ['self', 'i2c'];
		SHT31__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(SHT31__init__);

		$loc.get_temp_humi = new Sk.builtin.func(function (self) {
			return new Sk.builtin.list([
				new Sk.builtin.int_(parseInt($('#sht31-temp_value').text())),
				new Sk.builtin.int_(parseInt($('#sht31-hum_value').text()))
			]);
		});

	}, "SHT31", []);

	return esp32_sht31;
};
