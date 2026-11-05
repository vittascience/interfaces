// pinpong.extension.unihiker module of the simulator: buttons A and B (board image), sensors (sliders of the
// simulator) and buzzer (Web Audio) of the UNIHIKER M10.

var $builtinmodule = function () {
    const mod = {};
    mod.__name__ = new Sk.builtin.str('pinpong.extension.unihiker');
    const none = Sk.builtin.none.none$;
    const specific = Simulator.Mosaic.specific;
    const slider = (id) => Number($('#' + id).slider('option', 'value')) || 0;

    // Buttons A and B
    const Button = Sk.misceval.buildClass(mod, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self, name) {
            self.name = Sk.ffi.remapToJs(name);
            return none;
        });
        const pressed = (self) => new Sk.builtin.int_(specific.unihikerBoard.buttons[self.name] ? 1 : 0);
        $loc.is_pressed = new Sk.builtin.func(pressed);
        $loc.value = new Sk.builtin.func(pressed);
    }, 'Button', []);
    mod.button_a = Sk.misceval.callsimArray(Button, [new Sk.builtin.str('a')]);
    mod.button_b = Sk.misceval.callsimArray(Button, [new Sk.builtin.str('b')]);

    // Light sensor (0 to 4095)
    const Light = Sk.misceval.buildClass(mod, function ($gbl, $loc) {
        const read = () => new Sk.builtin.int_(Math.round(slider('unihiker-light_slider')));
        $loc.read = new Sk.builtin.func(read);
        $loc.read_and_average = new Sk.builtin.func(read);
    }, 'Light', []);
    mod.light = Sk.misceval.callsimArray(Light, []);

    // Accelerometer (g) and gyroscope: sliders _x, _y and _z of their module
    const axes = function (id, scale) {
        return Sk.misceval.buildClass(mod, function ($gbl, $loc) {
            const axis = (name) => slider(id + '_slider_' + name) / scale;
            for (const name of ['x', 'y', 'z']) {
                $loc['get_' + name] = new Sk.builtin.func(() => new Sk.builtin.float_(axis(name)));
            }
            $loc.get_strength = new Sk.builtin.func(() => new Sk.builtin.float_(Math.hypot(axis('x'), axis('y'), axis('z'))));
            $loc.get_alldata = new Sk.builtin.func(() => new Sk.builtin.list(['x', 'y', 'z'].map(name => new Sk.builtin.float_(axis(name)))));
        }, id, []);
    };
    mod.accelerometer = Sk.misceval.callsimArray(axes('unihiker-accelerometer', 1000), []);
    mod.gyroscope = Sk.misceval.callsimArray(axes('unihiker-gyroscope', 1), []);

    // Buzzer: the beats are ticks (BEAT_1 = 4 ticks = 0.5 s at 120 bpm)
    const TICK = 0.125;
    const MELODIES = ['DADADADUM', 'ENTERTAINER', 'PRELUDE', 'ODE', 'NYAN', 'RINGTONE', 'FUNK', 'BLUES', 'BIRTHDAY', 'WEDDING',
        'FUNERAL', 'PUNCHLINE', 'BADDY', 'CHASE', 'BA_DING', 'WAWAWAWAA', 'JUMP_UP', 'JUMP_DOWN', 'POWER_UP', 'POWER_DOWN'];
    const OPTIONS = { Once: 1, Forever: 2, OnceInBackground: 4, ForeverInBackground: 8 };
    const BEATS = { BEAT_1_4: 1, BEAT_1_2: 2, BEAT_3_4: 3, BEAT_1: 4, BEAT_3_2: 6, BEAT_2: 8, BEAT_3: 12, BEAT_4: 16 };
    // a short tune per melody (frequencies in Hz), not the original ones
    const tune = (index) => [262, 330, 392, 523, 392, 330].map((f, i) => f * Math.pow(2, ((index * (i + 1)) % 5) / 12));

    const Buzzer = Sk.misceval.buildClass(mod, function ($gbl, $loc) {
        MELODIES.forEach((name, index) => { $loc[name] = new Sk.builtin.int_(index); });
        Object.entries(OPTIONS).forEach(([name, value]) => { $loc[name] = new Sk.builtin.int_(value); });
        Object.entries(BEATS).forEach(([name, value]) => { $loc[name] = new Sk.builtin.int_(value); });

        $loc.pitch = new Sk.builtin.func(function (self, freq, beat) {
            // without a duration: 4 ticks in background, with one: waits for the end of the note
            const background = beat === undefined || beat === none;
            const duration = (background ? 4 : Sk.ffi.remapToJs(beat)) * TICK;
            specific.unihikerBuzzer.play([Sk.ffi.remapToJs(freq)], duration);
            return background ? none : Simulator.sleep_ms(duration * 1000);
        });
        $loc.play = new Sk.builtin.func(function (self, index, options) {
            const notes = tune(Sk.ffi.remapToJs(index));
            const option = Sk.ffi.remapToJs(options);
            const loop = option === OPTIONS.Forever || option === OPTIONS.ForeverInBackground;
            specific.unihikerBuzzer.play(notes, TICK * 2, loop);
            if (option === OPTIONS.Once) {
                return Simulator.sleep_ms(notes.length * TICK * 2000);
            }
            return none;
        });
        $loc.stop = new Sk.builtin.func(function () {
            specific.unihikerBuzzer.stop();
            return none;
        });
        $loc.set_tempo = new Sk.builtin.func(function () {
            return none;
        });
        $loc.redirect = new Sk.builtin.func(function () {
            return none;
        });
    }, 'Buzzer', []);
    mod.buzzer = Sk.misceval.callsimArray(Buzzer, []);

    return mod;
};
