// unihiker_sim module of the simulator (M10 and K10): values of the modules of the mosaic for the simulated
// libraries of the modules (src/modules/*.py) and animation of the output modules

var $builtinmodule = function () {
    const mod = {};
    mod.__name__ = new Sk.builtin.str('unihiker_sim');
    const none = Sk.builtin.none.none$;
    const js = (value) => Sk.ffi.remapToJs(value);

    // value of a module: id of the module (with its pin for the modules of a pin) and suffix of the value (_r, _d...).
    // Value shown by the module (as the simulated libraries of the ESP32), else its slider, 0 without module.
    mod.slider = new Sk.builtin.func(function (id, suffix) {
        suffix = suffix === undefined ? '' : js(suffix);
        const text = parseFloat($('#' + js(id) + '_value' + suffix).first().text());
        if (!isNaN(text)) return new Sk.builtin.float_(text);
        const element = $('#' + js(id) + '_slider' + suffix);
        const value = element.length ? Number(element.slider('option', 'value')) : 0;
        return new Sk.builtin.float_(isNaN(value) ? 0 : value);
    });

    // pin of the edge connector for the simulated libraries of the ESP32 (self.pin of their Pin objects)
    const Pin = Sk.misceval.buildClass(mod, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func((self, number) => { self.pin = js(number); return none; });
    }, 'Pin', []);
    mod.pin = new Sk.builtin.func((number) => Sk.misceval.callsimArray(Pin, [number]));

    // output module of a pin: servo angle, motor speed...
    mod.animate = new Sk.builtin.func(function (id, value) {
        const module = Simulator.getModuleByKey(js(id).split('_')[0]);
        if (module) Simulator.setAnimator(module, js(id), js(value));
        return none;
    });

    // NeoPixel strip of a pin: colours of its LEDs ([(r, g, b), ...])
    mod.neopixel = new Sk.builtin.func(function (pin, colours) {
        js(colours).forEach((rgb, i) => {
            $('#neopixel_' + js(pin) + '-' + i).find('.neopixel-led, .led, svg circle, svg ellipse').first()
                .css({ fill: 'rgb(' + rgb.join(',') + ')', 'background-color': 'rgb(' + rgb.join(',') + ')' });
            $(".neopixel-" + js(pin)).eq(i).css("background-color", "rgb(" + rgb.join(',') + ")");
        });
        return none;
    });

    return mod;
};
