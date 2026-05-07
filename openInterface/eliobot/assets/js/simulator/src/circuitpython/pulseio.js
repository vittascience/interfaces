// Eliobot - pulseio module

const $builtinmodule = function () {

    const pulseio = {};

    pulseio.__name__ = new Sk.builtin.str('pulseio');

    pulseio.PulseIn = new Sk.misceval.buildClass(pulseio, function ($gbl, $loc) {
        PulseIn__init__ = function (self, pin, maxlen, idle_state) {
            self.pin = Sk.ffi.remapToJs(pin);
            self.maxlen = Sk.ffi.remapToJs(maxlen);
            self.idle_state = Sk.ffi.remapToJs(idle_state);
        };
        PulseIn__init__.co_varnames = ['self', 'pin', 'maxlen', 'idle_state'];
        PulseIn__init__.$defaults = [new Sk.builtin.str('IO33'), new Sk.builtin.int_(200), new Sk.builtin.bool(true)];
        $loc.__init__ = new Sk.builtin.func(PulseIn__init__);
    }, 'PulseIn', []);

    return pulseio;
};