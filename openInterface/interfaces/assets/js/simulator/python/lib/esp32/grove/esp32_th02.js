// ESP32 - esp32_th02 module

var $builtinmodule = function () {

    var esp32_th02 = {};

    esp32_th02.TH02_I2C_ADDR = new Sk.builtin.int_(0x40);

    esp32_th02.TH02 = new Sk.misceval.buildClass(esp32_th02, function ($gbl, $loc) {

        TH02__init__ = function (self, i2c, addr) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 4);
            Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
            if (Sk.builtin.checkNone(i2c)) {
                throw new Sk.builtin.ValueError("I2C object 'TH02' needed as argument!");
            } else {
                self.i2c = i2c;
                self.addr = addr.v;
                $("#th02").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
            }
        };

        TH02__init__.co_varnames = ['self', 'i2c', 'addr'];
        TH02__init__.$defaults = [Sk.builtin.none(), esp32_th02.TH02_I2C_ADDR];

        $loc.__init__ = new Sk.builtin.func(TH02__init__);

        $loc.get_temperature = new Sk.builtin.func(function (self) {
            const t = parseFloat($('#th02-temp_slider').slider('option', 'value'));
            return new Sk.builtin.float_(t);

        });

        $loc.get_humidity = new Sk.builtin.func(function (self) {
            const h = parseFloat($('#th02-hum_slider').slider('option', 'value'));
            return new Sk.builtin.float_(h);
        });

    }, 'TH02');

    return esp32_th02;
};