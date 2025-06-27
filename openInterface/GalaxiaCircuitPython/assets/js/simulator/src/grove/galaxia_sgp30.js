// Galaxia - galaxia_sgp30 module

var $builtinmodule = function () {

	var sgp30 = {};

	sgp30.__name__ = new Sk.builtin.str('sgp30');

	sgp30.SGP30 = new Sk.misceval.buildClass(sgp30, function ($gbl, $loc) {

		SGP30__init__ = function (self) {
			iaq_init();
			return Sk.builtin.none();
		};

		SGP30__init__.co_varnames = ['self'];
		SGP30__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(SGP30__init__);

		$loc.eCO2 = new Sk.builtin.func(function (self) {
			const co2 = $('#sgp30_slider_co2').slider('option', 'value');
			return new Sk.builtin.int_(co2);
		});

		$loc.TVOC = new Sk.builtin.func(function (self) {
			const tvoc = $('#sgp30_slider_cov').slider('option', 'value');
			return new Sk.builtin.int_(tvoc);
		});

		var iaq_init = function (self) {
			return new Sk.builtin.bool(true);
		};

		$loc.iaq_init = new Sk.builtin.func(iaq_init);

	}, "SGP30");


	return sgp30;
};
