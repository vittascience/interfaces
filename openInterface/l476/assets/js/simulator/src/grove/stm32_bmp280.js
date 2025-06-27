// Esp32 - stm32_bmp280 module

var $builtinmodule = function () {

	var stm32_bmp280 = {};

	stm32_bmp280.BMP280_DEFAULT_I2C_ADDR = new Sk.builtin.int_(0x76);
	stm32_bmp280.BMP280_CASE_HANDHELD_DYN = new Sk.builtin.int_(1);

	stm32_bmp280.BMP280 = new Sk.misceval.buildClass(stm32_bmp280, function ($gbl, $loc) {

		BMP280__init__ = function (self, i2c, addr, use_case) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 4);
			Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
			Sk.builtin.pyCheckType("use_case", "integer", Sk.builtin.checkInt(use_case));
			self.i2c = i2c;
			self.addr = addr.v;
			$("#bmp280-temp").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
			$("#bmp280-press").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
			$("#bmp280-alt").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
			self.use_case = use_case.v;
		};

		BMP280__init__.co_varnames = ['self', 'i2c', 'addr', 'use_case'];
		BMP280__init__.$defaults = [stm32_bmp280.BMP280_DEFAULT_I2C_ADDR, stm32_bmp280.BMP280_CASE_HANDHELD_DYN];

		$loc.__init__ = new Sk.builtin.func(BMP280__init__);

		$loc.set_default_measure = new Sk.builtin.func(function () {
			return Sk.builtin.none();
		});

		$loc.temperature = new Sk.builtin.func(function () {
			const temperature = $("#bmp280-temp_slider").slider('option', 'value');
			return new Sk.builtin.float_(temperature);
		});

		$loc.pressure = new Sk.builtin.func(function () {
			const pressure = $("#bmp280-press_slider").slider('option', 'value');
			return new Sk.builtin.int_(pressure);
		});

		$loc.altitude = new Sk.builtin.func(function () {
			const press = $("#bmp280-press_slider").slider('option', 'value');
			const altitude = 44330*(1-(press/101325)**(1/5.255));
			return new Sk.builtin.int_(Math.round(altitude));
		});

	}, "BMP280");

	return stm32_bmp280;
};
