// unihiker_k10 module of the simulator (UNIHIKER K10): screen drawn on the canvas of the board (240 x 320, drawn at
// once: show_draw does nothing), RGB LEDs of the board image, buttons A and B, sensors (sliders) and speaker (Web Audio).
// The drivers of modules (servo, dht, ultrasonic, neopixel) do nothing.

var $builtinmodule = function () {
    const mod = {};
    mod.__name__ = new Sk.builtin.str('unihiker_k10');
    const none = Sk.builtin.none.none$;
    const specific = Simulator.Mosaic.specific;
    const slider = (id) => Number($('#' + id).slider('option', 'value')) || 0;
    const colour = (value) => '#' + (Number(value) || 0).toString(16).padStart(6, '0');

    // method(self, **kwargs) with the positional arguments in the order of the names (Skulpt: keyword arguments first)
    const method = function (names, implementation) {
        const func = function (kwargs, self, rest) {
            // positional arguments after self: tuple of *args
            const args = rest instanceof Sk.builtin.tuple ? rest.v : [];
            const values = {};
            names.forEach((name, i) => { if (args[i] !== undefined) values[name] = Sk.ffi.remapToJs(args[i]); });
            for (let i = 0; i < (kwargs || []).length; i += 2) values[kwargs[i]] = Sk.ffi.remapToJs(kwargs[i + 1]);
            const result = implementation(self, values);
            return result === undefined ? none : result;
        };
        func.co_varnames = ['self'];
        func.co_kwargs = true;
        func.co_varargs = true;
        return new Sk.builtin.func(func);
    };
    const object = (name, build) => Sk.misceval.callsimArray(Sk.misceval.buildClass(mod, build, name, []), []);

    // Screen: shapes of the M10 screen drawn at once
    const context = () => {
        const canvas = document.querySelector('.canvas-unihiker-screen');
        if (!canvas) return null;
        canvas.style.display = 'block';
        return canvas.getContext('2d');
    };
    const paint = (shape) => {
        const ctx = context();
        if (!ctx) return;
        ctx.save();
        specific.unihikerScreen.drawShape(ctx, shape);
        ctx.restore();
    };
    const background = (value) => {
        const ctx = context();
        if (!ctx) return;
        ctx.fillStyle = colour(value);
        ctx.fillRect(0, 0, 240, 320);
    };
    let lineWidth = 1;
    mod.screen = object('Screen', function ($gbl, $loc) {
        $loc.init = method(['dir'], () => background(0xFFFFFF));
        $loc.show_bg = method(['color'], (self, v) => background(v.color));
        $loc.clear = method([], () => background(0x000000));
        $loc.show_draw = method([], () => none);
        // no camera in the simulator: grey image
        $loc.show_camera_img = method(['image'], () => background(0x808080));
        $loc.set_width = method(['width'], (self, v) => { lineWidth = v.width || 1; });
        $loc.draw_text = method(['text', 'x', 'y', 'font_size', 'color'], (self, v) => paint({ type: 'draw_text', text: v.text, x: v.x, y: v.y,
            font_size: v.font_size || 16, color: colour(v.color) }));
        $loc.draw_point = method(['x', 'y', 'color'], (self, v) => paint({ type: 'draw_point', x: v.x, y: v.y, color: colour(v.color) }));
        $loc.draw_line = method(['x0', 'y0', 'x1', 'y1', 'color'], (self, v) => paint({ type: 'draw_line', x0: v.x0, y0: v.y0, x1: v.x1, y1: v.y1,
            color: colour(v.color), width: lineWidth }));
        // border colour (bcolor), filled with fcolor when it is given
        const shape = (type, v) => {
            if (v.fcolor !== undefined) paint(Object.assign({}, v, { type: 'fill_' + type, color: colour(v.fcolor) }));
            paint(Object.assign({}, v, { type: 'draw_' + type, color: colour(v.bcolor), width: lineWidth }));
        };
        $loc.draw_rect = method(['x', 'y', 'w', 'h', 'bcolor', 'fcolor'], (self, v) => shape('rect', v));
        $loc.draw_circle = method(['x', 'y', 'r', 'bcolor', 'fcolor'], (self, v) => shape('circle', v));
    });

    // RGB LEDs 0, 1 and 2 of the board image (-1 or no number: all of them)
    const leds = ['#000000', '#000000', '#000000'];
    const showLeds = () => {
        const board = document.getElementById('board-viewer')?.contentDocument;
        leds.forEach((value, i) => {
            const led = board && board.getElementById('rgb_' + i);
            if (!led) return;
            const on = value !== '#000000';
            led.style.fill = on ? value : '';
            led.style.filter = on ? 'drop-shadow(0 0 6px ' + value + ')' : '';
        });
    };
    specific.k10Leds = { clear: () => { leds.fill('#000000'); showLeds(); } };
    mod.rgb = object('rgb_board', function ($gbl, $loc) {
        $loc.write = method(['num', 'R', 'G', 'B', 'color'], (self, v) => {
            const value = v.color !== undefined ? colour(v.color) : 'rgb(' + [v.R || 0, v.G || 0, v.B || 0].join(',') + ')';
            const black = v.color !== undefined ? v.color === 0 : !(v.R || v.G || v.B);
            const numbers = v.num === undefined || v.num < 0 ? [0, 1, 2] : [v.num];
            numbers.forEach(i => { leds[i] = black ? '#000000' : value; });
            showLeds();
        });
        $loc.clear = method([], () => specific.k10Leds.clear());
        $loc.brightness = method(['value'], () => none);
    });

    // Buttons A and B: status, event_pressed called at each press (board image)
    mod.button = Sk.misceval.buildClass(mod, function ($gbl, $loc) {
        $loc.a = new Sk.builtin.str('a');
        $loc.b = new Sk.builtin.str('b');
        $loc.__init__ = new Sk.builtin.func(function (self, name) {
            self.name = Sk.ffi.remapToJs(name);
            return none;
        });
        $loc.status = new Sk.builtin.func((self) => new Sk.builtin.int_(specific.unihikerBoard.buttons[self.name] ? 1 : 0));
        $loc.__setattr__ = new Sk.builtin.func(function (self, name, value) {
            if (Sk.ffi.remapToJs(name) === 'event_pressed') specific.unihikerBoard.onClick[self.name] = value;
            return Sk.generic.setAttr.call(self, name, value);
        });
    }, 'button', []);

    // Sensors of the board (sliders of the simulator)
    mod.light = object('Light', function ($gbl, $loc) {
        $loc.read = new Sk.builtin.func(() => new Sk.builtin.float_(slider('unihiker-light_slider')));
    });
    mod.acce = object('accelerometer', function ($gbl, $loc) {
        const axis = (name) => slider('unihiker-accelerometer_slider_' + name);
        for (const name of ['x', 'y', 'z']) {
            $loc['read_' + name] = new Sk.builtin.func(() => new Sk.builtin.int_(Math.round(axis(name))));
        }
        $loc.read_strength = new Sk.builtin.func(() => new Sk.builtin.float_(Math.hypot(axis('x'), axis('y'), axis('z'))));
    });
    mod.temp_humi = object('aht20', function ($gbl, $loc) {
        $loc.read_temp = new Sk.builtin.func(() => new Sk.builtin.float_(slider('unihiker-climate_slider_temp')));
        $loc.read_temp_f = new Sk.builtin.func(() => new Sk.builtin.float_(slider('unihiker-climate_slider_temp') * 9 / 5 + 32));
        $loc.read_humi = new Sk.builtin.func(() => new Sk.builtin.float_(slider('unihiker-climate_slider_hum')));
    });

    // Speaker: notes of a duration in eighths of a beat (0.5 s), tunes of a few notes
    mod.speaker = object('Speaker', function ($gbl, $loc) {
        $loc.reinit = new Sk.builtin.func(() => none);
        $loc.play_tone = method(['freq', 'beat'], (self, v) => specific.unihikerBuzzer.play([v.freq], (v.beat || 8) / 16));
        $loc.play_tone_music = method(['name'], () => {
            const notes = [262, 330, 392, 523, 392, 330];
            specific.unihikerBuzzer.play(notes, 0.125);
            return Simulator.sleep_ms(notes.length * 125);
        });
        $loc.stop_music = new Sk.builtin.func(() => { specific.unihikerBuzzer.stop(); return none; });
    });

    // Pins and modules: no module in the simulator
    const nothing = (name) => Sk.misceval.buildClass(mod, function ($gbl, $loc) {
        $loc.__init__ = method([], () => none);
        $loc.__getattr__ = new Sk.builtin.func(() => new Sk.builtin.func(() => new Sk.builtin.int_(0)));
    }, name, []);
    // Pins of the edge connector: module of the simulator connected to the pin (slider of an input, animation of an
    // output), as the pins of PinPong on the M10
    mod.pin = Sk.misceval.buildClass(mod, function ($gbl, $loc) {
        const module = (self) => self.id ? Simulator.getModuleByKey(self.id.split('_')[0]) : null;
        const sliderValue = (self) => {
            const m = module(self);
            if (!m) return 0;
            return $('#' + self.id + '_slider' + (m.listeners ? m.listeners[0].suffix : '')).slider('option', 'value') || 0;
        };
        const write = (self, value) => {
            const m = module(self);
            if (m && m.type !== 'input') Simulator.setAnimator(m, self.id, value);
        };
        $loc.__init__ = new Sk.builtin.func((self, number) => {
            self.number = Sk.ffi.remapToJs(number);
            const component = Simulator.pinList.find(component => component.pin == self.number);
            self.id = component ? component.id : null;
            return none;
        });
        $loc.read_digital = new Sk.builtin.func((self) => new Sk.builtin.int_(sliderValue(self) ? 1 : 0));
        $loc.read_analog = new Sk.builtin.func((self) => new Sk.builtin.int_(sliderValue(self)));
        $loc.write_digital = method(['value'], (self, v) => write(self, v.value ? 1 : 0));
        $loc.write_analog = method(['value', 'freq'], (self, v) => write(self, v.value || 0));
    }, 'pin', []);
    // DHT and ultrasonic sensor of a pin: sliders of their module in the mosaic
    mod.dht = Sk.misceval.buildClass(mod, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func((self, number) => { self.number = Sk.ffi.remapToJs(number); return none; });
        $loc.read = new Sk.builtin.func((self) => new Sk.builtin.tuple([new Sk.builtin.float_(slider('dht11-temp_' + self.number + '_slider')),
            new Sk.builtin.float_(slider('dht11-hum_' + self.number + '_slider'))]));
    }, 'dht', []);
    mod.ultrasonic = Sk.misceval.buildClass(mod, function ($gbl, $loc) {
        $loc.__init__ = method(['trig', 'echo'], (self, v) => { self.number = v.trig; });
        $loc.distance = new Sk.builtin.func((self) => new Sk.builtin.float_(slider('ultrasonic_' + self.number + '_slider_d')));
    }, 'ultrasonic', []);
    // I2C bus of the board: no module in the simulator
    mod.k10_i2c = object('I2C', function ($gbl, $loc) {
        $loc.scan = new Sk.builtin.func(() => new Sk.builtin.list([]));
        const zeros = (n) => new Sk.builtin.bytes(new Array(Number(Sk.ffi.remapToJs(n)) || 0).fill(0));
        $loc.readfrom = new Sk.builtin.func((self, addr, n) => zeros(n));
        $loc.readfrom_mem = new Sk.builtin.func((self, addr, reg, n) => zeros(n));
        for (const name of ['writeto', 'writeto_mem', 'readfrom_into', 'readfrom_mem_into']) {
            $loc[name] = method([], () => none);
        }
    });
    mod.servo = nothing('servo');
    mod.pins_remap_k10 = new Sk.builtin.tuple([1, 2, 57, 66, 65, 64, 63, -1, 60, 61, 62, 52, 53, 54, 55, 56, -1, -1, -1, 48, 47].map(n => new Sk.builtin.int_(n)));

    return mod;
};
