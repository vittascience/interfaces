// Eliobot - busio module

const $builtinmodule = function () {

    const busio = {};

    busio.__name__ = new Sk.builtin.str('busio');

    busio.I2C = new Sk.misceval.buildClass(busio, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self, pin) {
            self.pin = Sk.ffi.remapToJs(pin);
        });
    }, 'I2C', []);

    return busio;
};