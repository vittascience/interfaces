// STeaMi - apds9960 module

const $builtinmodule = function () {

    const apds9960 = {};

    apds9960.__name__ = new Sk.builtin.str("apds9960");

    apds9960.APDS9960_DIR_NONE = new Sk.builtin.int_(0);
    apds9960.APDS9960_DIR_LEFT = new Sk.builtin.int_(1);
    apds9960.APDS9960_DIR_RIGHT = new Sk.builtin.int_(2);
    apds9960.APDS9960_DIR_UP = new Sk.builtin.int_(3);
    apds9960.APDS9960_DIR_DOWN = new Sk.builtin.int_(4);
    apds9960.APDS9960_DIR_NEAR = new Sk.builtin.int_(5);
    apds9960.APDS9960_DIR_FAR = new Sk.builtin.int_(6);
    apds9960.APDS9960_DIR_ALL = new Sk.builtin.int_(7);

    apds9960.uAPDS9960 = new Sk.misceval.buildClass(apds9960, function ($gbl, $loc) {

        uAPDS9960__init__ = function (self, i2c) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
            self.i2c = i2c;
            self.threshold = 50;
        };

        uAPDS9960__init__.co_varnames = ['self', 'i2c'];
        uAPDS9960__init__.$defaults = [new Sk.builtin.none()];
        $loc.__init__ = new Sk.builtin.func(uAPDS9960__init__);

        const enable_light_sensor = function (self) {
            return new Sk.builtin.none();
        };
        enable_light_sensor.co_varnames = ['self'];
        enable_light_sensor.$defaults = [new Sk.builtin.none()];
        $loc.enable_light_sensor = new Sk.builtin.func(enable_light_sensor);

        const ambient_light = function (self) {
            return new Sk.builtin.int_(Simulator.getSliderValue('steami-ambient-light-sensor'));
        };
        $loc.ambient_light = new Sk.builtin.func(ambient_light);

        const set_proximity_int_low_threshold = function (self, threshold) {
            self.threshold = Sk.ffi.remapToJs(threshold);
            return new Sk.builtin.none();
        };
        $loc.set_proximity_int_low_threshold = new Sk.builtin.func(set_proximity_int_low_threshold);

        const enable_gesture_sensor = function (self) {
            return new Sk.builtin.none();
        };
        $loc.enable_gesture_sensor = new Sk.builtin.func(enable_gesture_sensor);

        const gesture = function (self) {
            return apds9960.APDS9960_DIR_NONE;
        };
        $loc.gesture = new Sk.builtin.func(gesture);

        const enable_proximity_sensor = function (self) {
            return new Sk.builtin.none();
        };
        $loc.enable_proximity_sensor = new Sk.builtin.func(enable_proximity_sensor);

        const proximity = function (self) {
            return new Sk.builtin.none();
        };
        $loc.proximity = new Sk.builtin.func(proximity);

    }, "uPADS9960", []);

    return apds9960;
};
