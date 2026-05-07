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

        const enableLightSensor = function (self) {
            return new Sk.builtin.none();
        };
        enableLightSensor.co_varnames = ['self'];
        enableLightSensor.$defaults = [new Sk.builtin.none()];
        $loc.enableLightSensor = new Sk.builtin.func(enableLightSensor);

        const readAmbientLight = function (self) {
            return new Sk.builtin.int_(Simulator.getSliderValue('steami-ambient-light-sensor'));
        };
        $loc.readAmbientLight = new Sk.builtin.func(readAmbientLight);

        const setProximityIntLowThreshold = function (self, threshold) {
            self.threshold = Sk.ffi.remapToJs(threshold);
            return new Sk.builtin.none();
        };
        $loc.setProximityIntLowThreshold = new Sk.builtin.func(setProximityIntLowThreshold);

        const enableGestureSensor = function (self) {
            return new Sk.builtin.none();
        };
        $loc.enableGestureSensor = new Sk.builtin.func(enableGestureSensor);

        const readGesture = function (self) {
            return apds9960.APDS9960_DIR_NONE;
        };
        $loc.readGesture = new Sk.builtin.func(readGesture);

        const enableProximitySensor = function (self) {
            return new Sk.builtin.none();
        };
        $loc.enableProximitySensor = new Sk.builtin.func(enableProximitySensor);

        const readProximity = function (self) {
            return new Sk.builtin.none();
        };
        $loc.readProximity = new Sk.builtin.func(readProximity);

    }, "uPADS9960", []);

    return apds9960;
};
