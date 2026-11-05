// pinpong.board module of the simulator: Board and Pin of the UNIHIKER M10. A pin reads or animates the module
// connected to it in the simulator (Simulator.pinList), P25 is the LED of the board.

var $builtinmodule = function () {
    const board = {};
    board.__name__ = new Sk.builtin.str('pinpong.board');
    const none = Sk.builtin.none.none$;
    const MODES = { OUT: 0, IN: 1, ANALOG: 2, PWM: 3 };

    board.Board = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        const init = function (self) {
            return none;
        };
        init.co_varnames = ['self', 'boardname', 'port'];
        init.$defaults = [none, none];
        $loc.__init__ = new Sk.builtin.func(init);
        $loc.begin = new Sk.builtin.func(function (self) {
            return self;
        });
    }, 'Board', []);

    board.Pin = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        for (let pin = 0; pin <= 32; pin++) {
            $loc['P' + pin] = new Sk.builtin.int_(pin);
        }
        for (const [name, value] of Object.entries(MODES)) {
            $loc[name] = new Sk.builtin.int_(value);
        }
        $loc.PULL_UP = new Sk.builtin.int_(4);
        $loc.PULL_DOWN = new Sk.builtin.int_(5);

        const module = (self) => self.id ? Simulator.getModuleByKey(self.id.split('_')[0]) : null;
        const sliderValue = function (self) {
            const mod = module(self);
            if (!mod) return 0;
            const suffix = mod.listeners ? mod.listeners[0].suffix : '';
            return $('#' + self.id + '_slider' + suffix).slider('option', 'value') || 0;
        };
        const write = function (self, value) {
            if (self.pin === 25) {
                Simulator.Mosaic.specific.unihikerBoard.setLed(value);
            }
            const mod = module(self);
            if (mod && mod.type !== 'input') {
                Simulator.setAnimator(mod, self.id, value);
            }
        };

        const init = function (self, pin, mode) {
            self.pin = Sk.ffi.remapToJs(pin);
            self.mode = mode === none ? MODES.IN : Sk.ffi.remapToJs(mode);
            const component = Simulator.pinList.find(component => component.pin == self.pin);
            self.id = component ? component.id : null;
            return none;
        };
        init.co_varnames = ['self', 'pin', 'mode'];
        init.$defaults = [none];
        $loc.__init__ = new Sk.builtin.func(init);

        $loc.write_digital = new Sk.builtin.func(function (self, value) {
            write(self, Sk.ffi.remapToJs(value) ? 1 : 0);
            return none;
        });
        $loc.on = new Sk.builtin.func(function (self) {
            write(self, 1);
            return none;
        });
        $loc.off = new Sk.builtin.func(function (self) {
            write(self, 0);
            return none;
        });
        $loc.read_digital = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(sliderValue(self) ? 1 : 0);
        });
        $loc.read_analog = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(sliderValue(self));
        });
        $loc.write_analog = new Sk.builtin.func(function (self, duty) {
            write(self, Sk.ffi.remapToJs(duty));
            return none;
        });
        const value = function (self, v) {
            if (v === undefined || v === none) {
                return new Sk.builtin.int_(sliderValue(self) ? 1 : 0);
            }
            write(self, Sk.ffi.remapToJs(v) ? 1 : 0);
            return none;
        };
        value.co_varnames = ['self', 'v'];
        value.$defaults = [none];
        $loc.value = new Sk.builtin.func(value);
    }, 'Pin', []);

    // Objects of the modules (no module in the simulator, except the buzzer of the board for Tone): they do nothing
    const anyArgs = (implementation) => {
        const func = (kwargs, ...args) => implementation(...args);
        func.co_kwargs = true;
        func.co_varargs = true;
        return new Sk.builtin.func(func);
    };
    const nothing = anyArgs(() => none);
    const zeros = (n) => new Sk.builtin.bytes(new Array(Number(Sk.ffi.remapToJs(n)) || 0).fill(0));

    board.I2C = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        $loc.__init__ = nothing;
        $loc.scan = new Sk.builtin.func(() => new Sk.builtin.list([]));
        $loc.readfrom = new Sk.builtin.func((self, addr, n) => new Sk.builtin.list(new Array(Number(Sk.ffi.remapToJs(n)) || 0).fill(new Sk.builtin.int_(0))));
        $loc.readfrom_mem = new Sk.builtin.func((self, addr, reg, n) => zeros(n));
        $loc.writeto = nothing;
        $loc.writeto_mem = nothing;
    }, 'I2C', []);

    board.UART = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        $loc.__init__ = nothing;
        $loc.init = nothing;
        $loc.write = nothing;
        $loc.any = new Sk.builtin.func(() => new Sk.builtin.int_(0));
        $loc.read = new Sk.builtin.func(() => new Sk.builtin.list([]));
        $loc.readline = new Sk.builtin.func(() => new Sk.builtin.list([]));
    }, 'UART', []);

    board.SPI = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        $loc.__init__ = nothing;
        $loc.write = nothing;
        $loc.read = new Sk.builtin.func(() => new Sk.builtin.list([new Sk.builtin.int_(0)]));
    }, 'SPI', []);

    // modules of a pin: slider or animation of their module in the mosaic (pin of the Pin object given)
    const pinOf = (pinObject) => pinObject && pinObject.pin !== undefined ? pinObject.pin : Sk.ffi.remapToJs(pinObject);
    const slider = (id) => Number($('#' + id).slider('option', 'value')) || 0;
    const animate = (ids, value) => {
        for (const id of ids) {
            const module = Simulator.getModuleByKey(id.split('_')[0]);
            if (module && document.getElementById(id)) Simulator.setAnimator(module, id, value);
        }
    };

    board.Servo = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func((self, pin) => { self.pinNumber = pinOf(pin); return none; });
        const angle = (self, value) => { animate(['servo_' + self.pinNumber, 'continuousServo_' + self.pinNumber], Sk.ffi.remapToJs(value)); return none; };
        $loc.write_angle = new Sk.builtin.func(angle);
        $loc.angle = new Sk.builtin.func(angle);
    }, 'Servo', []);

    // NeoPixel strip: LEDs drawn in the module of the pin (as the neopixel library of MicroPython)
    board.NeoPixel = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        const show = (self) => {
            const container = $('#neopixel_' + self.pinNumber + '_value');
            if (container.length && container.find('.neopixel-' + self.pinNumber).length !== self.leds.length) {
                container.html('<div class=row>' + self.leds.map(() => '<div class="neopixel-block neopixel-' + self.pinNumber + '" style="background-color:#000000;"></div>').join('') + '</div>');
            }
            self.leds.forEach((rgb, i) => $('.neopixel-' + self.pinNumber).eq(i).css('background-color', 'rgb(' + rgb.join(',') + ')'));
        };
        $loc.__init__ = new Sk.builtin.func((self, pin, count) => {
            self.pinNumber = pinOf(pin);
            self.leds = new Array(count === undefined ? 30 : Sk.ffi.remapToJs(count)).fill(0).map(() => [0, 0, 0]);
            show(self);
            return none;
        });
        $loc.__setitem__ = new Sk.builtin.func((self, index, rgb) => {
            self.leds[Sk.ffi.remapToJs(index)] = Sk.ffi.remapToJs(rgb).slice(0, 3);
            show(self);
            return none;
        });
        $loc.__getitem__ = new Sk.builtin.func((self, index) => new Sk.builtin.tuple(self.leds[Sk.ffi.remapToJs(index)].map(n => new Sk.builtin.int_(n))));
        $loc.range_color = new Sk.builtin.func((self, start, end, rgb) => {
            for (let i = Sk.ffi.remapToJs(start); i <= Sk.ffi.remapToJs(end) && i < self.leds.length; i++) self.leds[i] = Sk.ffi.remapToJs(rgb).slice(0, 3);
            show(self);
            return none;
        });
        $loc.rainbow = new Sk.builtin.func((self) => {
            const n = self.leds.length;
            self.leds = self.leds.map((_, i) => {
                const h = i / n * 6, x = Math.round(255 * (1 - Math.abs(h % 2 - 1)));
                return [[255, x, 0], [x, 255, 0], [0, 255, x], [0, x, 255], [x, 0, 255], [255, 0, x]][Math.floor(h) % 6];
            });
            show(self);
            return none;
        });
        $loc.clear = new Sk.builtin.func((self) => { self.leds = self.leds.map(() => [0, 0, 0]); show(self); return none; });
        for (const name of ['brightness', 'shift', 'rotate']) {
            $loc[name] = nothing;
        }
    }, 'NeoPixel', []);

    // buzzer on a pin: sound of the computer
    board.Tone = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func((self) => { self.frequency = 440; return none; });
        $loc.freq = new Sk.builtin.func((self, frequency) => { self.frequency = Sk.ffi.remapToJs(frequency); return none; });
        $loc.on = new Sk.builtin.func((self) => { Simulator.Mosaic.specific.unihikerBuzzer.play([self.frequency], 3600); return none; });
        $loc.off = new Sk.builtin.func(() => { Simulator.Mosaic.specific.unihikerBuzzer.stop(); return none; });
        $loc.tone = anyArgs((self, frequency) => { Simulator.Mosaic.specific.unihikerBuzzer.play([Sk.ffi.remapToJs(frequency)], 0.5); return none; });
    }, 'Tone', []);

    board.DHT11 = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func((self, pin) => { self.pinNumber = pinOf(pin); return none; });
        $loc.temp_c = new Sk.builtin.func((self) => new Sk.builtin.float_(slider('dht11-temp_' + self.pinNumber + '_slider')));
        $loc.humidity = new Sk.builtin.func((self) => new Sk.builtin.float_(slider('dht11-hum_' + self.pinNumber + '_slider')));
    }, 'DHT11', []);
    board.DHT22 = board.DHT11;

    board.SR04_URM10 = Sk.misceval.buildClass(board, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func((self, trig) => { self.pinNumber = pinOf(trig); return none; });
        $loc.distance_cm = new Sk.builtin.func((self) => new Sk.builtin.float_(slider('ultrasonic_' + self.pinNumber + '_slider_d')));
    }, 'SR04_URM10', []);

    return board;
};
