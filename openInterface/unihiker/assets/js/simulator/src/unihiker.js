// unihiker module of the simulator: GUI drawn on the screen of the board (canvas 240 x 320, see
// Simulator.Mosaic.specific.unihikerScreen) and Audio (sound level slider).

var $builtinmodule = function () {
    const unihiker = {};
    unihiker.__name__ = new Sk.builtin.str('unihiker');
    const none = Sk.builtin.none.none$;
    const screen = Simulator.Mosaic.specific.unihikerScreen;

    // Python keyword arguments (x=..., color=...) of the GUI methods: object of the given values
    const OPTIONS = ['x', 'y', 'w', 'h', 'r', 'x0', 'y0', 'x1', 'y1', 'text', 'color', 'fill', 'width', 'origin', 'font_size',
        'font_family', 'onclick', 'image', 'emoji', 'list', 'callback', 'style'];
    const toJs = (value) => {
        if (value instanceof Sk.builtin.tuple || value instanceof Sk.builtin.list) {
            return Sk.misceval.arrayFromIterable(value).map(item => Sk.ffi.remapToJs(item));
        }
        return value instanceof Sk.builtin.func || value instanceof Sk.builtin.method ? value : Sk.ffi.remapToJs(value);
    };
    const options = function (kwargs) {
        const values = {};
        for (let i = 0; i < kwargs.length; i += 2) {
            values[kwargs[i]] = toJs(kwargs[i + 1]);
        }
        return values;
    };
    // method(self, **kwargs): Skulpt gives the keyword arguments first (co_kwargs)
    const withOptions = function (implementation) {
        const method = function (kwargs, self) {
            return implementation(self, options(kwargs || []));
        };
        method.co_varnames = ['self'];
        method.co_kwargs = true;
        return new Sk.builtin.func(method);
    };

    // Object drawn on the screen: config() changes it, the screen is drawn again
    const CanvasObject = Sk.misceval.buildClass(unihiker, function ($gbl, $loc) {
        $loc.config = withOptions(function (self, values) {
            Object.assign(self.shape, values);
            screen.draw();
            return none;
        });
        $loc.remove = new Sk.builtin.func(function (self) {
            screen.remove(self.shape);
            return none;
        });
    }, 'CanvasObject', []);
    const add = function (type, values) {
        const object = Sk.misceval.callsimArray(CanvasObject, []);
        object.shape = screen.add(Object.assign({ type }, values));
        return object;
    };

    unihiker.GUI = Sk.misceval.buildClass(unihiker, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self) {
            screen.start();
            return none;
        });
        for (const type of ['draw_text', 'draw_digit', 'draw_rect', 'fill_rect', 'draw_round_rect', 'fill_round_rect', 'draw_circle',
            'fill_circle', 'draw_line', 'draw_point', 'draw_qr_code', 'draw_image', 'draw_emoji', 'add_button']) {
            $loc[type] = withOptions((self, values) => add(type, values));
        }
        $loc.clear = new Sk.builtin.func(function () {
            screen.clear();
            return none;
        });
        $loc.remove = new Sk.builtin.func(function (self, object) {
            if (object && object.shape) screen.remove(object.shape);
            return none;
        });
        $loc.on_a_click = new Sk.builtin.func(function (self, callback) {
            Simulator.Mosaic.specific.unihikerBoard.onClick.a = callback;
            return none;
        });
        $loc.on_b_click = new Sk.builtin.func(function (self, callback) {
            Simulator.Mosaic.specific.unihikerBoard.onClick.b = callback;
            return none;
        });
        $loc.update = new Sk.builtin.func(() => none);
    }, 'GUI', []);

    unihiker.Audio = Sk.misceval.buildClass(unihiker, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(() => none);
        $loc.sound_level = new Sk.builtin.func(function () {
            return new Sk.builtin.float_(Number($('#unihiker-sound_slider').slider('option', 'value')) || 0);
        });
        for (const name of ['play', 'start_play', 'stop_play', 'pause_play', 'resume_play', 'record', 'start_record', 'stop_record']) {
            $loc[name] = new Sk.builtin.func(() => none);
        }
    }, 'Audio', []);

    return unihiker;
};
