// Raspberry Pi / Grove - sgp30 module for Skulpt

var $builtinmodule = function (name) {

    var sgp30 = {};

    sgp30.__name__ = new Sk.builtin.str("grove.modules.sgp30");

    sgp30._SGP30_I2C_ADDR = new Sk.builtin.int_(0x58);

    const pyNone = () => Sk.builtin.none();

    const setAttr = function (self, name, value) {
        self.tp$setattr(new Sk.builtin.str(name), value);
    };

    const getSliderValue = function (selector, fallback) {
        const el = $(selector);
        if (el.length && el.slider) {
            return el.slider("option", "value");
        }
        return fallback;
    };

    const readCO2 = function () {
        return getSliderValue("#sgp30_slider_co2", 400);
    };

    const readTVOC = function () {
        return getSliderValue("#sgp30_slider_cov", 0);
    };

    const updateValues = function (self) {
        setAttr(self, "CO2eq", new Sk.builtin.int_(readCO2()));
        setAttr(self, "TVOC", new Sk.builtin.int_(readTVOC()));
    };

    sgp30.SGP30 = new Sk.misceval.buildClass(sgp30, function ($gbl, $loc) {

        const SGP30__init__ = function (self, i2c, addr) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);

            self.i2c = Sk.builtin.checkNone(i2c) ? null : i2c;
            self.addr = addr.v;
            self.initialized = false;

            updateValues(self);

            $("#sgp30").find(".subtitle-module").html(
                "I2C (0x" + self.addr.toString(16) + ")"
            );

            return pyNone();
        };

        SGP30__init__.co_varnames = ["self", "i2c", "addr"];
        SGP30__init__.$defaults = [Sk.builtin.none(), sgp30._SGP30_I2C_ADDR];
        $loc.__init__ = new Sk.builtin.func(SGP30__init__);

        const init_air_quality = function (self) {
            self.initialized = true;
            updateValues(self);
            return pyNone();
        };

        init_air_quality.co_varnames = ["self"];
        $loc.init_air_quality = new Sk.builtin.func(init_air_quality);

        const measure_air_quality = function (self) {
            self.initialized = true;
            updateValues(self);
            return new Sk.builtin.bool(true);
        };

        measure_air_quality.co_varnames = ["self"];
        $loc.measure_air_quality = new Sk.builtin.func(measure_air_quality);

        const co2_equivalent = function (self) {
            measure_air_quality(self);
            return self.tp$getattr(new Sk.builtin.str("CO2eq"));
        };

        co2_equivalent.co_varnames = ["self"];
        $loc.co2_equivalent = new Sk.builtin.func(co2_equivalent);

        const total_organic_compound = function (self) {
            measure_air_quality(self);
            return self.tp$getattr(new Sk.builtin.str("TVOC"));
        };

        total_organic_compound.co_varnames = ["self"];
        $loc.total_organic_compound = new Sk.builtin.func(total_organic_compound);

        $loc.__str__ = new Sk.builtin.func(function (self) {
            return new Sk.builtin.str("SGP30(addr=0x" + self.addr.toString(16) + ")");
        });

    }, "SGP30");

    return sgp30;
};