// Eliobot - pwmio module

const $builtinmodule = function () {

    const pwmio = {};

    pwmio.__name__ = new Sk.builtin.str('pwmio');

    pwmio.PWMOut = new Sk.misceval.buildClass(pwmio, function ($gbl, $loc) {
        $loc.frequency = new Sk.builtin.int_('50');
        PWMOut__init__ = function (self, pin, variable_frequency, frequency) {
            self.pin = Sk.ffi.remapToJs(pin);
            self.variable_frequency = Sk.ffi.remapToJs(variable_frequency);
            $loc.frequency = frequency;
        };
        PWMOut__init__.co_varnames = ['self', 'pin', 'variable_frequency', 'frequency'];
        PWMOut__init__.$defaults = [new Sk.builtin.str('IO33'), new Sk.builtin.bool(false), new Sk.builtin.int_('50')];

        $loc.__init__ = new Sk.builtin.func(PWMOut__init__);

        const getServoAngle = function (duty, frequency) {
            const MIN_PULSE = 750;
            const MAX_PULSE = 2750;
            const PULSE_RANGE = MAX_PULSE - MIN_PULSE;
            const SCALE_FACTOR = 65535 / 1000000;
            const A = frequency * SCALE_FACTOR;
            let X = (duty / A - MIN_PULSE) * 180 / PULSE_RANGE;
            X = Math.round(X * 100) / 100;
            X = Math.max(0, Math.min(180, X));
            return Math.round(X);
        };

        $loc.duty_cycle = new Sk.builtin.func(function (self, type, value) {
            const value_ = Sk.ffi.remapToJs(value);
            const type_ = Sk.ffi.remapToJs(type);
            const frequency_ = Sk.ffi.remapToJs($loc.frequency);

            switch (type_) {
                case 'servo':
                    const module = Simulator.getModuleByKey('elio-servo-' + self.pin);
                    if (module) Simulator.setAnimator(module, module.id, getServoAngle(value_, frequency_));
                    break;
            }
        });

    }, 'PWMOut', []);

    return pwmio;
};