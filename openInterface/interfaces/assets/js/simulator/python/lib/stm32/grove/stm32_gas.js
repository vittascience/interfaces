// STM32 - stm32_gas module

var $builtinmodule = function () {

    var stm32_gas = {};

    stm32_gas.MULTICHANNEL_GAS_I2C_ADDR = new Sk.builtin.int_(0x04);

    stm32_gas.GAS = new Sk.misceval.buildClass(stm32_gas, function ($gbl, $loc) {

        const GAS = ['co', 'no2', 'nh3', 'c3h10', 'c4h10', 'ch4', 'h2', 'c2h5oh'];

        $loc.CO = new Sk.builtin.int_(0);
        $loc.NO2 = new Sk.builtin.int_(1);
        $loc.NH3 = new Sk.builtin.int_(2);
        $loc.C3H8 = new Sk.builtin.int_(3);
        $loc.C4H10 = new Sk.builtin.int_(4);
        $loc.CH4 = new Sk.builtin.int_(5);
        $loc.H2 = new Sk.builtin.int_(6);
        $loc.C2H5OH = new Sk.builtin.int_(7);

        GAS__init__ = function (self, i2c, addr) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 4);
        	Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
			if (Sk.builtin.checkNone(i2c)) {
				throw new Sk.builtin.ValueError("I2C object 'GAS' needed as argument!");
			} else {
				self.i2c = i2c;
				self.addr = addr.v;
                $("#multichannel").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
			}
        };

        GAS__init__.co_varnames = ['self', 'i2c', 'addr'];
        GAS__init__.$defaults = [Sk.builtin.none(), stm32_gas.MULTICHANNEL_GAS_I2C_ADDR];

        $loc.__init__ = new Sk.builtin.func(GAS__init__);

        $loc.calc_gas = new Sk.builtin.func(function (self, gas) {
            return new Sk.builtin.int_(parseInt($('#multichannel_slider_' + GAS[gas.v]).slider('option', 'value')));
        });

    });

    return stm32_gas;
};
