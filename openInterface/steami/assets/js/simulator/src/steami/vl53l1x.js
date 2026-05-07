// STeaMi - HTS221 module

const $builtinmodule = function () {

    const vl53l1x = {};

    vl53l1x.__name__ = new Sk.builtin.str("vl53l1x");;

    vl53l1x.VL53L1X = new Sk.misceval.buildClass(vl53l1x, function ($gbl, $loc) {

        VL53L1X__init__ = function (self, i2c) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
            self.i2c = i2c;
        };

        VL53L1X__init__.co_varnames = ['self', 'i2c'];
        VL53L1X__init__.$defaults = [new Sk.builtin.none()];
        $loc.__init__ = new Sk.builtin.func(VL53L1X__init__);

        const read = function (self) {
            return new Sk.builtin.float_(Simulator.getSliderValue('vl53l1x', ''));
        };
        read.co_varnames = ['self'];
        read.$defaults = [new Sk.builtin.none()];
        $loc.read = new Sk.builtin.func(read);

    }, "VL53L1X", []);
    return vl53l1x;
};
