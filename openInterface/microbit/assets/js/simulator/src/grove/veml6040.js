// Grove color sensor v3.0 - veml6040 module

var $builtinmodule = function () {

    var veml6040 = {};

    veml6040.PiicoDev_VEML6040 = new Sk.misceval.buildClass(veml6040, function ($gbl, $loc) {

        PiicoDev_VEML6040__init__ = function (self) {
            $("#veml6040").find(".subtitle-module").html('VEML6040 - I2C (0x10)');
        };

        PiicoDev_VEML6040__init__.co_varnames = ['self'];
        PiicoDev_VEML6040__init__.$defaults = [];

        $loc.__init__ = new Sk.builtin.func(PiicoDev_VEML6040__init__);

        $loc.readRGB = new Sk.builtin.func(function (self) {
            const values = {
                "r": parseInt($("#veml6040_slider_r").slider('option', 'value')),
                "g": parseInt($("#veml6040_slider_g").slider('option', 'value')),
                "b": parseInt($("#veml6040_slider_b").slider('option', 'value')),
                "white": parseInt($("#veml6040_slider_white").slider('option', 'value')),
                "cct": parseInt($("#veml6040_slider_temp").slider('option', 'value'))
            };
            return new Sk.ffi.remapToPy({
                'red': values['r'],
                'green': values['g'],
                'blue': values['b'],
                'white': values['white'],
                'cct': values['cct']
            });
        });

        $loc.readHSV = new Sk.builtin.func(function (self) {
            const values = {
                "hue": parseInt($("#veml6040_slider_hue").slider('option', 'value')),
                "sat": parseInt($("#veml6040_slider_saturation").slider('option', 'value')),
                "val": parseInt($("#veml6040_slider_value").slider('option', 'value'))
            };
            return new Sk.ffi.remapToPy({
                'hue': values['hue'],
                'saturation': values['saturation'],
                'value': values['value']
            });
        });

        $loc.classifyHue = new Sk.builtin.func(function (self) {
            const hues = {
                "red": 0,
                "yellow": 60,
                "green": 120,
                "cyan": 180,
                "blue": 240,
                "magenta": 300
            };

            const min_brightness = 0;

            const data = {
                "hue": parseInt($("#veml6040_slider_hue").slider('option', 'value')),
                "val": parseInt($("#veml6040_slider_value").slider('option', 'value'))
            };
            if (data["val"] > min_brightness) {
                let closestKey = null;
                let minDistance = Infinity;

                for (const [key, value] of Object.entries(hues)) {
                    const diff = Math.abs(data["hue"] - value);
                    const distance = Math.min(diff, 360 - diff); // wrap-around on color wheel

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestKey = key;
                    }
                }

                return new Sk.builtin.str(closestKey);
            } else {
                return new Sk.builtin.str("None");
            }
        });

    }, "PiicoDev_VEML6040", []);

    return veml6040;
};