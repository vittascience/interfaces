const $builtinmodule = function () {

    const SimulatorSensor = {};

    SimulatorSensor.SimulatorSensor = new Sk.misceval.buildClass(SimulatorSensor, function ($gbl, $loc) {

        SimulatorSensor__init__ = function (self) {
            console.log('SimulatorSensor init');
        };

        $loc.__init__ = new Sk.builtin.func(SimulatorSensor__init__);

        $loc._SIM_get_gyro_x_direction = new Sk.builtin.func((self) => {
            return new Sk.builtin.int_(Simulator.getSliderValue('winky-gyro-direction', '_x'));
        });

        $loc._SIM_get_gyro_y_direction = new Sk.builtin.func((self) => {
            return new Sk.builtin.int_(Simulator.getSliderValue('winky-gyro-direction', '_y'));
        });

        $loc._SIM_get_gyro_z_direction = new Sk.builtin.func((self) => {
            return new Sk.builtin.int_(Simulator.getSliderValue('winky-gyro-direction', '_z'));
        });

        $loc._SIM_get_gyro_y_angle = new Sk.builtin.func((self) => {
            return new Sk.builtin.int_(Simulator.getSliderValue('winky-gyro-angle', '_y'));
        });

        $loc._SIM_get_gyro_x_angle = new Sk.builtin.func((self) => {
            return new Sk.builtin.int_(Simulator.getSliderValue('winky-gyro-angle', '_x'));
        });

        $loc._SIM_get_touch_blue = new Sk.builtin.func((self) => {
            Simulator.Mosaic.specific.btn['blue'] = Simulator.getSliderValue('winky-blue-btn');
            return new Sk.builtin.bool(Simulator.Mosaic.specific.btn['blue']);
        });

        $loc._SIM_get_touch_red = new Sk.builtin.func((self) => {
            Simulator.Mosaic.specific.btn['red'] = Simulator.getSliderValue('winky-red-btn');
            return new Sk.builtin.bool(Simulator.Mosaic.specific.btn['red']);
        });

        $loc._SIM_get_touch_yellow = new Sk.builtin.func((self) => {
            Simulator.Mosaic.specific.btn['yellow'] = Simulator.getSliderValue('winky-yellow-btn');
            return new Sk.builtin.bool(Simulator.Mosaic.specific.btn['yellow']);
        });

        $loc._SIM_get_touch_purple = new Sk.builtin.func((self) => {
            Simulator.Mosaic.specific.btn['purple'] = Simulator.getSliderValue('winky-purple-btn');
            return new Sk.builtin.bool(Simulator.Mosaic.specific.btn['purple']);
        });

        $loc._SIM_get_touch_blue_onrelease = new Sk.builtin.func((self) => {
            if (Simulator.Mosaic.specific.btn['blue'] == 1 && Simulator.getSliderValue('winky-blue-btn') == 0) {
                Simulator.Mosaic.specific.btn['blue'] = 0;
                return new Sk.builtin.bool(true);
            }
            return new Sk.builtin.bool(false);
        });

        $loc._SIM_get_touch_red_onrelease = new Sk.builtin.func((self) => {
            if (Simulator.Mosaic.specific.btn['red'] == 1 && Simulator.getSliderValue('winky-red-btn') == 0) {
                Simulator.Mosaic.specific.btn['red'] = 0;
                return new Sk.builtin.bool(true);
            }
            return new Sk.builtin.bool(false);
        });

        $loc._SIM_get_touch_yellow_onrelease = new Sk.builtin.func((self) => {
            if (Simulator.Mosaic.specific.btn['yellow'] == 1 && Simulator.getSliderValue('winky-yellow-btn') == 0) {
                Simulator.Mosaic.specific.btn['yellow'] = 0;
                return new Sk.builtin.bool(true);
            }
            return new Sk.builtin.bool(false);
        });

        $loc._SIM_get_touch_purple_onrelease = new Sk.builtin.func((self) => {
            if (Simulator.Mosaic.specific.btn['purple'] == 1 && Simulator.getSliderValue('winky-purple-btn') == 0) {
                Simulator.Mosaic.specific.btn['purple'] = 0;
                return new Sk.builtin.bool(true);
            }
            return new Sk.builtin.bool(false);
        });

        $loc._SIM_get_touch_blue_onpress = new Sk.builtin.func((self) => {
            return new Sk.builtin.bool(Simulator.getSliderValue('winky-blue-btn'));
        });

        $loc._SIM_get_touch_red_onpress = new Sk.builtin.func((self) => {
            return new Sk.builtin.bool(Simulator.getSliderValue('winky-red-btn'));
        });

        $loc._SIM_get_touch_yellow_onpress = new Sk.builtin.func((self) => {
            return new Sk.builtin.bool(Simulator.getSliderValue('winky-yellow-btn'));
        });

        $loc._SIM_get_touch_purple_onpress = new Sk.builtin.func((self) => {
            return new Sk.builtin.bool(Simulator.getSliderValue('winky-purple-btn'));
        });

        $loc._SIM_get_gesture_detection = new Sk.builtin.func((self) => {
            return new Sk.builtin.int_(Simulator.getSliderValue('winky-gesture-detection'));
        });

        $loc._SIM_get_proximity_detection = new Sk.builtin.func((self) => {
            return new Sk.builtin.int_(Simulator.getSliderValue('winky-proximity-detection'));
        });

    }, "SimulatorSensor");

    return SimulatorSensor;
};