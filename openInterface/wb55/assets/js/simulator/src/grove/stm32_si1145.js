// STM32 - stm32_si1145 module

var $builtinmodule = function () {

	var stm32_si1145 = {};

	stm32_si1145.SI1145_I2C_ADDR = new Sk.builtin.int_(0x60);

	stm32_si1145.SI1145 = new Sk.misceval.buildClass(stm32_si1145, function ($gbl, $loc) {

		SI1145__init__ = function (self, i2c, addr) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);
        	Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
			if (Sk.builtin.checkNone(i2c)) {
				throw new Sk.builtin.ValueError("I2C object 'SI1145' needed as argument!");
			} else {
				self.i2c = i2c;
				self.addr = addr.v;
				$("#si1145").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
			}
		};

		SI1145__init__.co_varnames = ['self', 'i2c', 'addr'];
		SI1145__init__.$defaults = [Sk.builtin.none(), stm32_si1145.SI1145_I2C_ADDR];

		$loc.__init__ = new Sk.builtin.func(SI1145__init__);

		$loc.read_uv = new Sk.builtin.func(function () {
			const uv = $('#si1145_slider_uv').slider('option', 'value');
			return new Sk.builtin.float_(uv);
		});

		$loc.read_visible = new Sk.builtin.func(function () {
			const vis = $('#si1145_slider_vis').slider('option', 'value');
			return new Sk.builtin.float_(vis);
		});

		$loc.read_ir = new Sk.builtin.func(function () {
			const ir = $('#si1145_slider_ir').slider('option', 'value');
			return new Sk.builtin.float_(ir);
		});

	}, "SI1145");


	return stm32_si1145;
};
