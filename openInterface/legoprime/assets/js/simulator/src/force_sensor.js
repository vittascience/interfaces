// force_sensor module for LEGO® Education SPIKE™ Prime
// The force (0-100, decinewtons) comes from the slider of the simulator module of the port.

const $builtinmodule = function () {
    const force_sensor = {};
    force_sensor.__name__ = new Sk.builtin.str("force_sensor");
    const force = port => Simulator.getSliderValue('spike-force-port' + Sk.ffi.remapToJs(port));
    force_sensor.force = new Sk.builtin.func(function (port) { return new Sk.builtin.int_(force(port)); });
    force_sensor.pressed = new Sk.builtin.func(function (port) { return new Sk.builtin.bool(force(port) > 0); });
    return force_sensor;
};
