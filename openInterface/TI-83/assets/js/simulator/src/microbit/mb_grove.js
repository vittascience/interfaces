// TI-83 & micro:bit - mb_grove module

var $builtinmodule = function(name)
{
    var mb_grove = {};

    var grove = new Sk.misceval.buildClass(mb_grove, function ($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function (self) {
		});

        /** Inputs */

        $loc.read_temperature = new Sk.builtin.func(function (self, pin) {
            const t = $('#ti-groveTemp_' + pin.name + '_slider_cel').slider("option", "value");
            return new Sk.builtin.float_(t);
        });

        $loc.read_lightlevel = new Sk.builtin.func(function (self, pin) {
            const ll = $('#groveLight_' + pin.name + '_slider').slider("option", "value");
            return new Sk.builtin.int_(ll);
        });

        $loc.read_moisture = new Sk.builtin.func(function (self, pin) {
            const h = $('#groveMoisture_' + pin.name + '_slider').slider("option", "value");
            return new Sk.builtin.int_(h);
        });

        $loc.read_pressure = new Sk.builtin.func(function (self, pin) {
            const p = $('#mpx5700_' + pin.name + '_slider').slider("option", "value");
            return new Sk.builtin.int_(p);
        });

        $loc.calibrate_pressure = new Sk.builtin.func(function (self, pin) {
            return new Sk.builtin.bool(true);
        });

        $loc.read_sht = new Sk.builtin.func(function (self) {
            const t = $("#sht31-temp_slider").slider('value');
            const h = $("#sht31-hum_slider").slider('value');
            return new Sk.builtin.tuple([t, h]);
        });

        $loc.read_ranger_cm = new Sk.builtin.func(function (self, pin) {
            const t = $("#ultrasonic_" + pin.name + "_slider_t").slider('value');
            return new Sk.builtin.float_(roundFloat(343 * t/1e6/2 * 100, 1));
        });

        $loc.read_ranger_time = new Sk.builtin.func(function (self, pin) {
            const t = $("#ultrasonic_" + pin.name + "_slider_t").slider('value');
            return new Sk.builtin.float_(t);
        });

        $loc.read_bme280 = new Sk.builtin.func(function (self) {
            const t = $("#bme280-temp_slider").slider('value');
            const p = $("#bme280-press_slider").slider('value');
            const h = $("#bme280-hum_slider").slider('value');
            return new Sk.builtin.tuple([t, p, h]);
        });

        /** Outputs */

        $loc.set_servo = new Sk.builtin.func(function (self, pin, deg, min, max) {
            const module = Simulator.getModuleByKey('servo');
            Simulator.setAnimator(module, module.id + '_' + pin.name, deg.v);
            return Sk.builtin.none();
        });

        $loc.power = new Sk.builtin.func(function (self, pin, value) {
            const module = Simulator.getModuleByKey('motor');
            Simulator.setAnimator(module, module.id + '_' + pin.name, value.v / 100 * PWM_MAX_DUTY);
            return Sk.builtin.none();
        });

        $loc.relay = new Sk.builtin.func(function (self, pin, state) {
            const module = Simulator.getModuleByKey('relay');
            Simulator.setAnimator(module, module.id + '_' + pin.name, state.v);
            return Sk.builtin.none();
        });

    }, "GroveObject", []);

    mb_grove.grove = new grove(); 

    return mb_grove;
};