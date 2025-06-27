// Enviro:bit - bme280 module

var $builtinmodule = function () {

	var bme280 = {};

	bme280.BME280_CASE_HANDHELD_DYN = new Sk.builtin.int_(1);

	bme280.BME280 = new Sk.misceval.buildClass(bme280, function ($gbl, $loc) {

		BME280__init__ = function (self, use_case) {
			self.addr = 0x76;
			$("#bme280").find(".subtitle-module").html('I2C (0x76)');
			self.use_case = use_case.v;
		};

		BME280__init__.co_varnames = ['self', 'use_case'];
		BME280__init__.$defaults = [ bme280.BME280_CASE_HANDHELD_DYN];

		$loc.__init__ = new Sk.builtin.func(BME280__init__);

		$loc.set_default_measure = new Sk.builtin.func(function () {
			return Sk.builtin.none();
		});

		$loc.temperature = new Sk.builtin.func(function () {
			const temperature = Simulator.getSliderValue('bme280-temp');
			return new Sk.builtin.float_(temperature);
		});

		$loc.humidity = new Sk.builtin.func(function () {
			const humidity = Simulator.getSliderValue('bme280-hum');
			return new Sk.builtin.int_(humidity);
		});

		$loc.pressure = new Sk.builtin.func(function () {
			const pressure = Simulator.getSliderValue('bme280-press');
			return new Sk.builtin.int_(pressure);
		});

		$loc.altitude = new Sk.builtin.func(function () {
			const press = Simulator.getSliderValue('bme280-press');
			return new Sk.builtin.int_(Simulator.Mosaic.grove.calculs.getAltitude(press));
		});

	}, "BME280", []);

	return bme280;
};