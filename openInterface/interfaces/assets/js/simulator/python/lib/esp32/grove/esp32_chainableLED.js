// ESP32 - esp32_chainableLED module

var $builtinmodule = function () {

    var esp32_chainableLED = {};

    esp32_chainableLED.__name__ = new Sk.builtin.str("esp32_chainableLED");

    var P9813 = function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self, cin, din, num_leds) {
            self.LEDS = [];
            self.num_leds = num_leds.v;
            self.cin = cin.pin;
            self.din = din.pin;
            for (var i = 0; i < self.num_leds; i++) {
                self.LEDS[i] = [50, 50, 50];
            }
            $('#' + cin.id).hide();
            $('#' + din.id).hide();
        });

        $loc.__setitem__ = new Sk.builtin.func(function (self, index, val) {
            self.LEDS[index.v] = Sk.ffi.remapToJs(val);
        });

        $loc.__getitem__ = new Sk.builtin.func(function (self, index) {
            return new Sk.builtin.tuple(self.LEDS[index.v]);
        });

        $loc.write = new Sk.builtin.func(function (self) {
            const mod = Simulator.getModuleByKey("RGBLed");
            for (var i = 0; i < self.num_leds; i++) {
                const color = self.LEDS[i];
                if (typeof self.LEDS[i] === 'object') {
                    Simulator.setAnimator(mod, mod.id + '_' + self.cin + '-' + i, color);
                }
            }
            return Sk.builtin.none();
        });

        $loc.fill = new Sk.builtin.func(function (self, color) {
            for (var i = 0; i < self.num_leds; i++) {
                self.LEDS[i] = Sk.ffi.remapToJs(color);
            }
            return Sk.builtin.none();
        });

        $loc.reset = new Sk.builtin.func(function (self) {
            const mod = Simulator.getModuleByKey("RGBLed");
            for (var i = 0; i < self.num_leds; i++) {
                if (typeof self.LEDS[i] === 'object') {
                    Simulator.setAnimator(mod, mod.id + '_' + self.cin + '-' + i, [0, 0, 0]);
                }
            }
            return Sk.builtin.none();
        });
    };

    esp32_chainableLED.P9813 = new Sk.misceval.buildClass(esp32_chainableLED, P9813, "P9813", []);

    return esp32_chainableLED;
};
