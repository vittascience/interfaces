// STM32 - stm32_hm330x module

var $builtinmodule = function () {

	const data = ['pm1', 'pm2_5', 'pm10'];

	var stm32_hm330x = {};

	stm32_hm330x.HM330_I2C_ADDR = new Sk.builtin.int_(0x40);

	stm32_hm330x.HM330X = new Sk.misceval.buildClass(stm32_hm330x, function ($gbl, $loc) {

		HM330X__init__ = function (self, i2c, addr) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);
        	Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
			if (Sk.builtin.checkNone(i2c)) {
				throw new Sk.builtin.ValueError("I2C object 'HM330X' needed as argument!");
			} else {
				self.i2c = i2c;
				self.addr = addr.v;
				$("#hm330x").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
			}
		};

		HM330X__init__.co_varnames = ['self', 'i2c', 'addr'];
		HM330X__init__.$defaults = [Sk.builtin.none(), stm32_hm330x.HM330_I2C_ADDR];

		$loc.__init__ = new Sk.builtin.func(HM330X__init__);

		$loc.getData = new Sk.builtin.func(function (self, select) {
            if (select === undefined) {
                select.v = 3;
            }
            if (select.v >= 0 && select.v <= 5) {
                const value = parseInt($('#hm330x_value_' + data[select.v - 3]).html());
                return new Sk.builtin.int_(value);
            } else {
                // print range error
            }
		});

	}, "HM330X");


	return stm32_hm330x;
};
