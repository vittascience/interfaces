// distance_sensor module for LEGO® Education SPIKE™ Prime
// The distance (mm, -1 when nothing is seen) comes from the slider of the simulator module of the port.

const $builtinmodule = function () {
    const distance_sensor = {};
    distance_sensor.__name__ = new Sk.builtin.str("distance_sensor");
    distance_sensor.distance = new Sk.builtin.func(function (port) {
        return new Sk.builtin.int_(Simulator.getSliderValue('spike-distance-port' + Sk.ffi.remapToJs(port)));
    });
    return distance_sensor;
};
