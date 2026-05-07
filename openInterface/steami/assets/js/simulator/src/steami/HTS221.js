// STeaMi - HTS221 module

const $builtinmodule = function () {

    const HTS221 = {};

    HTS221.__name__ = new Sk.builtin.str("HTS221");;

    HTS221.HTS221 = new Sk.misceval.buildClass(HTS221, function ($gbl, $loc) {

        HTS221__init__ = function (self, i2c) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
            self.i2c = i2c;
        };

        HTS221__init__.co_varnames = ['self', 'i2c'];
        HTS221__init__.$defaults = [new Sk.builtin.none()];
        $loc.__init__ = new Sk.builtin.func(HTS221__init__);

        const temperature = function (self) {
            return new Sk.builtin.float_(Simulator.getSliderValue('hts221-temp', ''));
        };
        temperature.co_varnames = ['self'];
        temperature.$defaults = [new Sk.builtin.none()];
        $loc.temperature = new Sk.builtin.func(temperature);

        const humidity = function (self) {
            return new Sk.builtin.float_(Simulator.getSliderValue('hts221-hum', ''));
        };
        humidity.co_varnames = ['self'];
        humidity.$defaults = [new Sk.builtin.none()];
        $loc.humidity = new Sk.builtin.func(humidity);

    }, "HTS221", []);

    return HTS221;
};
