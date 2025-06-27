// Esp32 - gas_gmxxx module

var $builtinmodule = function () {

	var gas_gmxxx = {};

	gas_gmxxx.GAS_GMXXX_DEFAULT_I2C_ADDR = new Sk.builtin.int_(0x08);

	gas_gmxxx.GAS_GMXXX = new Sk.misceval.buildClass(gas_gmxxx, function ($gbl, $loc) {

		GAS_GMXXX__init__ = function (self, i2c) {
			self.i2c = i2c;
		};

		GAS_GMXXX__init__.co_varnames = ['self', 'i2c'];
		GAS_GMXXX__init__.$defaults = [gas_gmxxx.GAS_GMXXX_DEFAULT_I2C_ADDR];

		$loc.__init__ = new Sk.builtin.func(GAS_GMXXX__init__);

		$loc.calcVol = new Sk.builtin.func(function (self, adc) {
			return new Sk.builtin.float_((adc.v * 3.3) / 1023);
		});

		$loc.measure_NO2 = new Sk.builtin.func(function (self) {
			const NO2 = $('#multichannelV2_slider_no2').slider('option', 'value');
			return new Sk.builtin.float_(Number(NO2));
		});

		$loc.measure_C2H5OH = new Sk.builtin.func(function (self) {
			const C2H5OH = $('#multichannelV2_slider_c2h5oh').slider('option', 'value');
			return new Sk.builtin.float_(Number(C2H5OH));
		});

		$loc.measure_VOC = new Sk.builtin.func(function (self) {
			const VOC = $('#multichannelV2_slider_voc').slider('option', 'value');
			return new Sk.builtin.float_(Number(VOC));
		});

		$loc.measure_CO = new Sk.builtin.func(function (self) {
			const CO = $('#multichannelV2_slider_co').slider('option', 'value');
			return new Sk.builtin.float_(Number(CO));
		});

	}, "GAS_GMXXX", []);

	return gas_gmxxx;
};
