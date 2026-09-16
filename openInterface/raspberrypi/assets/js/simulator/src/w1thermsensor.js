// Raspberry Pi - w1thermsensor module for Skulpt

var $builtinmodule = function (name) {
    var w1thermsensor = {};

    w1thermsensor.__name__ = new Sk.builtin.str("w1thermsensor");

    w1thermsensor.Unit = {
        DEGREES_C: new Sk.builtin.str("celsius"),
        DEGREES_F: new Sk.builtin.str("fahrenheit"),
        KELVIN: new Sk.builtin.str("kelvin")
    };

    const toJs = value => Sk.ffi.remapToJs(value);

    w1thermsensor.W1ThermSensor = new Sk.misceval.buildClass(
        w1thermsensor,
        function ($gbl, $loc) {

            const W1ThermSensor__init__ = function (self, sensor_type, sensor_id, offset) {
                Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 4);

                self.sensor_type = sensor_type;
                self.sensor_id = sensor_id;
                self.offset = Sk.builtin.checkNone(offset) ? 0 : toJs(offset);

                return Sk.builtin.none();
            };

            W1ThermSensor__init__.co_varnames = ["self", "sensor_type", "sensor_id", "offset"];
            W1ThermSensor__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.float_(0)];

            $loc.__init__ = new Sk.builtin.func(W1ThermSensor__init__);

            const get_temperature = function (self, unit) {
                Sk.builtin.pyCheckArgsLen("get_temperature", arguments.length, 1, 2);

                let tempC = $("#ds18x20_4_slider").slider("option", "value");

                tempC += self.offset || 0;

                const unitValue = unit === undefined || Sk.builtin.checkNone(unit) ? "celsius" : toJs(unit);

                if (unitValue === "fahrenheit") {
                    return new Sk.builtin.float_(tempC * 9 / 5 + 32);
                }

                if (unitValue === "kelvin") {
                    return new Sk.builtin.float_(tempC + 273.15);
                }
                return new Sk.builtin.float_(tempC);
            };

            get_temperature.co_varnames = ["self", "unit"];
            get_temperature.$defaults = [w1thermsensor.Unit.DEGREES_C];

            $loc.get_temperature = new Sk.builtin.func(get_temperature);

            $loc.__str__ = new Sk.builtin.func(function (self) {
                return new Sk.builtin.str("W1ThermSensor()");
            });

        },
        "W1ThermSensor");

    return w1thermsensor;
};