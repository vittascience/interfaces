// machine module of the simulator for the UNIHIKER K10: Pin and PWM of the servo and NeoPixel blocks (no module in
// the simulator: they do nothing)

var $builtinmodule = function () {
    const machine = {};
    machine.__name__ = new Sk.builtin.str('machine');
    const none = Sk.builtin.none.none$;
    const ignored = function () {
        const func = () => none;
        func.co_kwargs = true;
        func.co_varargs = true;
        return new Sk.builtin.func(func);
    };

    // GPIO of the ESP32-S3 (pins_remap_k10) -> pin of the edge connector (P0 on GPIO 1, P1 on GPIO 2...)
    const PINS_REMAP_K10 = [1, 2, 57, 66, 65, 64, 63, -1, 60, 61, 62, 52, 53, 54, 55, 56, -1, -1, -1, 48, 47];
    machine.Pin = Sk.misceval.buildClass(machine, function ($gbl, $loc) {
        const init = function (kwargs, self, number) {
            const gpio = Sk.ffi.remapToJs(number);
            self.pin = PINS_REMAP_K10.includes(gpio) ? PINS_REMAP_K10.indexOf(gpio) : gpio;
            return none;
        };
        init.co_varnames = ['self', 'id'];
        init.co_kwargs = true;
        $loc.__init__ = new Sk.builtin.func(init);
        $loc.value = ignored();
    }, 'Pin', []);

    machine.UART = Sk.misceval.buildClass(machine, function ($gbl, $loc) {
        $loc.__init__ = ignored();
        for (const name of ['init', 'write', 'deinit']) {
            $loc[name] = ignored();
        }
        $loc.any = new Sk.builtin.func(() => new Sk.builtin.int_(0));
        $loc.read = ignored();
        $loc.readline = ignored();
    }, 'UART', []);

    // PWM of a pin: servomotor of the pin in the mosaic (pulse of 0.5 to 2.5 ms at 50 Hz: 0 to 180 degrees)
    machine.PWM = Sk.misceval.buildClass(machine, function ($gbl, $loc) {
        const init = function (kwargs, self, pin) {
            self.pinNumber = pin && pin.pin !== undefined ? pin.pin : null;
            return none;
        };
        init.co_varnames = ['self', 'pin'];
        init.co_kwargs = true;
        $loc.__init__ = new Sk.builtin.func(init);
        $loc.duty_u16 = new Sk.builtin.func(function (self, duty) {
            if (duty === undefined) return new Sk.builtin.int_(0);
            const angle = Math.round((Sk.ffi.remapToJs(duty) * 20000 / 65535 - 500) / 2000 * 180);
            for (const id of ['servo_' + self.pinNumber, 'continuousServo_' + self.pinNumber]) {
                const module = Simulator.getModuleByKey(id.split('_')[0]);
                if (module && document.getElementById(id)) Simulator.setAnimator(module, id, angle);
            }
            return none;
        });
        for (const name of ['freq', 'duty', 'deinit']) {
            $loc[name] = ignored();
        }
    }, 'PWM', []);

    return machine;
};
