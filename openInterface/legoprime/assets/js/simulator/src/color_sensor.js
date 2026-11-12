// color_sensor module for LEGO® Education SPIKE™ Prime
// The color is picked in the simulator module of the port (select), the reflection follows it.

const $builtinmodule = function () {

    const color_sensor = {};
    color_sensor.__name__ = new Sk.builtin.str("color_sensor");
    const NAMES = ["Black", "Magenta", "Purple", "Blue", "Azure", "Turquoise", "Green", "Yellow", "Orange", "Red", "White"];

    const initColorSensor = function (port) {
        const value = document.querySelector(`#spike-ColorSensor-port${port} .module-value`);
        if (!value) return;
        value.innerHTML = `<select id="colorPicker-port${port}"><option value="-1">-</option>` + NAMES.map((name, i) => `<option value="${i}">${name}</option>`).join('') + '</select>';
    };

    (function () {
        "ABCDEF".split('').forEach(initColorSensor);
    })();

    const picked = port => parseInt(document.getElementById(`colorPicker-port${Sk.ffi.remapToJs(port)}`)?.value ?? -1);

    color_sensor.color = new Sk.builtin.func(function (port) {
        return new Sk.builtin.int_(picked(port));
    });

    // ponytail: white 100, black or nothing 0, other colors 50
    color_sensor.reflection = new Sk.builtin.func(function (port) {
        const color = picked(port);
        return new Sk.builtin.int_(color === 10 ? 100 : color <= 0 ? 0 : 50);
    });

    return color_sensor;
};
