// micro:bit - si1145 module

var $builtinmodule = function () {

	var si1145 = {};

	si1145.SI1145 = new Sk.misceval.buildClass(si1145, function ($gbl, $loc) {

		SI1145__init__ = function (self) {
			$("#si1145").find(".subtitle-module").html('I2C (0x60)');
			return Sk.builtin.none();
		};

		SI1145__init__.co_varnames = ['self'];
		SI1145__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(SI1145__init__);

		$loc.readUV = new Sk.builtin.func(function () {
			const uv = $('#si1145_slider_uv').slider('option', 'value');
			return new Sk.builtin.float_(uv);
		});

		$loc.readVisible = new Sk.builtin.func(function () {
			const vis = $('#si1145_slider_vis').slider('option', 'value');
			return new Sk.builtin.float_(vis);
		});

		$loc.readIR = new Sk.builtin.func(function () {
			const ir = $('#si1145_slider_ir').slider('option', 'value');
			return new Sk.builtin.float_(ir);
		});

		$loc.readProx = new Sk.builtin.func(function () {
		});

	}, "SI1145");

	return si1145;
};
