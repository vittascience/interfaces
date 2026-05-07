// STM32 - stm32_vl53l0x module

var $builtinmodule = function () {
	
	var stm32_vl53l0x = {};

    stm32_vl53l0x.__name__ = new Sk.builtin.str("stm32_vl53l0x");

    stm32_vl53l0x.VL53L0X = new Sk.misceval.buildClass(stm32_vl53l0x, function($gbl, $loc) {

        VL53L0X__init__ = function (self, i2c, addr) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);
        	Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
			if (Sk.builtin.checkNone(i2c)) {
				throw new Sk.builtin.ValueError("I2C object 'VL53L0X' needed as argument!");
			} else {
				self.i2c = i2c;
				self.addr = addr.v;
				$("#vl53l0x").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
			}
		};

        VL53L0X__init__.co_varnames = ['self', 'i2c', 'addr'];
		VL53L0X__init__.$defaults = [Sk.builtin.none(), new Sk.builtin.int_(0x29)];

		$loc.__init__ = new Sk.builtin.func(VL53L0X__init__);

        $loc.getRangeMillimeters = new Sk.builtin.func(function (self) {
            const distance = $('#vl53l0x_slider').slider('option', 'value');
		    return new Sk.builtin.int_(distance);
        });

    });

	return stm32_vl53l0x;
};
