// Raspberry Pi - seeed_dht module for Skulpt

var $builtinmodule = function (name) {
    var seeed_dht = {};

    seeed_dht.__name__ = new Sk.builtin.str("seeed_dht");

    const pyNone = () => Sk.builtin.none();

    const toJs = (value) => Sk.ffi.remapToJs(value);

    const toInt = function (value, name) {
        Sk.builtin.pyCheckType(name, "integer", Sk.builtin.checkInt(value));
        return value.v;
    };

    const toStr = function (value, name) {
        Sk.builtin.pyCheckType(name, "string", Sk.builtin.checkString(value));
        return value.v;
    };

    const getSliderValue = function (selectors, fallback) {
        for (const selector of selectors) {
            const el = $(selector);
            if (el.length && el.slider) {
                return el.slider("option", "value");
            }
        }
        return fallback;
    };

    seeed_dht.DHT = new Sk.misceval.buildClass(seeed_dht, function ($gbl, $loc) {

        const DHT__init__ = function (self, sensor_type, pin) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 3);

            const type = toStr(sensor_type, "sensor_type");
            const gpio = toInt(pin, "pin");

            if (!["11", "22"].includes(type)) {
                throw new Sk.builtin.ValueError("sensor_type must be '11' or '22'");
            }

            self.sensor_type = type;
            self.pin = gpio;
            self.id = "dht" + type + "_" + gpio;

            return pyNone();
        };

        DHT__init__.co_varnames = ["self", "sensor_type", "pin"];
        $loc.__init__ = new Sk.builtin.func(DHT__init__);

        const read = function (self) {
            Sk.builtin.pyCheckArgsLen("read", arguments.length, 1, 1);

            const type = self.sensor_type;
            const temp = Simulator.getSliderValue("dht" + type + "-temp_" + self.pin);
            const hum = Simulator.getSliderValue("dht" + type + "-hum_" + self.pin);

            return new Sk.builtin.tuple([
                new Sk.builtin.float_(hum),
                new Sk.builtin.float_(temp)
            ]);
        };

        read.co_varnames = ["self"];
        $loc.read = new Sk.builtin.func(read);

        $loc.__str__ = new Sk.builtin.func(function (self) {
            return new Sk.builtin.str("DHT" + self.sensor_type + "(pin=" + self.pin + ")");
        });

    }, "DHT");

    return seeed_dht;
};