// Eliobot - analogio module

const $builtinmodule = function () {

    const analogio = {};

    analogio.__name__ = new Sk.builtin.str('analogio');

    analogio.AnalogIn = new Sk.misceval.buildClass(analogio, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self, pin) {
            self.pin = Sk.ffi.remapToJs(pin);
        });

        $loc.value = new Sk.builtin.func(function (self, type) {
			return new Sk.builtin.int_($(`#elio-${Sk.ffi.remapToJs(type)}-${self.pin}_slider`).slider('option', 'value'));
		});
    }, 'AnalogIn', []);

    return analogio;
};