// Raspberry Pi - grove.grove_i2c_color_sensor_v2 module for Skulpt

var $builtinmodule = function (name) {
    var colorSensor = {};

    colorSensor.__name__ = new Sk.builtin.str("grove.grove_i2c_color_sensor_v2");

    const readRawTuple = function () {
        const red = $("#colorSensor_slider_r").slider("option", "value");
        const green = $("#colorSensor_slider_g").slider("option", "value");
        const blue = $("#colorSensor_slider_b").slider("option", "value");
        const clear = Math.max(red, green, blue)

        return new Sk.builtin.tuple([
            new Sk.builtin.int_(red),
            new Sk.builtin.int_(green),
            new Sk.builtin.int_(blue),
            new Sk.builtin.int_(clear)
        ]);
    };

    colorSensor.GroveI2cColorSensorV2 = new Sk.misceval.buildClass(
        colorSensor,
        function ($gbl, $loc) {

            const __init__ = function (self, address) {
                Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 2);

                self.address = address && !Sk.builtin.checkNone(address)
                    ? address.v
                    : 0x29;

                $("#colorSensorV2").find(".subtitle-module").html(
                    "I2C (0x" + self.address.toString(16) + ")"
                );

                return Sk.builtin.none();
            };

            __init__.co_varnames = ["self", "address"];
            __init__.$defaults = [Sk.builtin.none()];
            $loc.__init__ = new Sk.builtin.func(__init__);

            const __getattr__ = function (self, name) {
                const attr = name.v;

                if (attr === "raw") {
                    return readRawTuple();
                }

                throw new Sk.builtin.AttributeError(
                    "'GroveI2cColorSensorV2' object has no attribute '" + attr + "'"
                );
            };

            __getattr__.co_varnames = ["self", "name"];
            $loc.__getattr__ = new Sk.builtin.func(__getattr__);

            const get_rgb = function (self) {
                const raw = readRawTuple();

                return new Sk.builtin.tuple([
                    raw.v[0],
                    raw.v[1],
                    raw.v[2]
                ]);
            };

            get_rgb.co_varnames = ["self"];
            $loc.get_rgb = new Sk.builtin.func(get_rgb);

            const get_light = function (self) {
                const raw = readRawTuple();
                return raw.v[3];
            };

            get_light.co_varnames = ["self"];
            $loc.get_light = new Sk.builtin.func(get_light);
        },
        "GroveI2cColorSensorV2"
    );

    return colorSensor;
};