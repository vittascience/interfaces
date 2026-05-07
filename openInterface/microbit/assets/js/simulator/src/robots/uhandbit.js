// micro:bit - uHandbit module

const $builtinmodule = function (name) {

    const uhandbit = {};
    uhandbit.__name__ = new Sk.builtin.str("uhandbit");

    uhandbit.UhandbitServo = new Sk.misceval.buildClass(uhandbit, function ($gbl, $loc) {

        $loc.set_servo = new Sk.builtin.func(function (self, port, angle, duration) {
            const mod = Simulator.getModuleByKey('uhandbit-servo' + port.v);
            Simulator.setAnimator(mod, mod.id, angle.v);
            return new Sk.builtin.none();
        });

    });

    uhandbit.UhandbitColorSensor = new Sk.misceval.buildClass(uhandbit, function ($gbl, $loc) {

        const getColorName = function (rgb) {
            const [r, g, b] = rgb;
            if (r > 200 && g < 50 && b < 50) {
                return "RED";
            } else if (r < 50 && g > 200 && b < 50) {
                return "GREEN";
            } else if (r < 50 && g < 50 && b > 200) {
                return "BLUE";
            } else if (r < 50 && g < 50 && b < 50) {
                return "BLACK";
            } else if (r > 200 && g > 200 && b > 200) {
                return "WHITE";
            } else {
                return "NONE";
            }
        };

        $loc.read_rgb = new Sk.builtin.func(function (self) {
            const values = {
                "r": parseInt($("#uhandbit-color_slider_r").slider('option', 'value')),
                "g": parseInt($("#uhandbit-color_slider_g").slider('option', 'value')),
                "b": parseInt($("#uhandbit-color_slider_b").slider('option', 'value')),
            };
            return new Sk.ffi.remapToPy([values['r'], values['g'], values['b']]);
        });

        $loc.get_color = new Sk.builtin.func(function (self) {
            const values = {
                "r": parseInt($("#uhandbit-color_slider_r").slider('option', 'value')),
                "g": parseInt($("#uhandbit-color_slider_g").slider('option', 'value')),
                "b": parseInt($("#uhandbit-color_slider_b").slider('option', 'value')),
            };
            const color = getColorName([values['r'], values['g'], values['b']]);
            return new Sk.builtin.str(color);
        });

    });

    return uhandbit;
};