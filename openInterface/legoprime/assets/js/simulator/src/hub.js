// Hub module for LEGO® Education SPIKE™ Prime: ports, 5x5 light matrix, light, sound, buttons, motion sensor

const $builtinmodule = function () {

    const hub = {};

    const object = function (name, fill) {
        const Cls = new Sk.misceval.buildClass(hub, function ($gbl, $loc) {
            $loc.__init__ = new Sk.builtin.func(function (self) { });
            fill($gbl, $loc);
        }, name, []);
        const instance = new Cls();
        instance.tp$init();
        return instance;
    };
    const fn = function (name, f, varnames = [], defaults = []) {
        f.co_varnames = ['self', ...varnames];
        f.$defaults = defaults.map(d => Sk.ffi.remapToPy(d));
        return new Sk.builtin.func(f);
    };
    const js = Sk.ffi.remapToJs;

    hub.port = object("port", function ($gbl, $loc) {
        "ABCDEF".split('').forEach(letter => { $loc[letter] = new Sk.builtin.str(letter); });
    });

    // light matrix: the 25 LEDs of the board SVG are the rects "led-<row>-<column>"
    const setLed = function (x, y, intensity) {
        const led = document.querySelector('#board-viewer')?.contentDocument?.getElementById('led-' + y + '-' + x);
        if (!led) return;
        led.style.fill = intensity > 0 ? '#ffa94d' : '#e3e3e3';
        led.style.opacity = intensity > 0 ? 0.4 + 0.6 * Math.min(intensity, 100) / 100 : 1;
    };
    const showPixels = pixels => pixels.forEach((intensity, i) => setLed(i % 5, Math.floor(i / 5), intensity));

    // read on a real hub with light_matrix.get_pixel
    const PATTERNS = {
        HEART: "0101011111111110111000100", HEART_SMALL: "0000001010011100010000000", HAPPY: "0000001010000001000101110",
        SMILE: "0000000000000001000101110", SAD: "0000001010000000111010001", CONFUSED: "0000001010000000101010101",
        ANGRY: "1000101010000001111110101", ASLEEP: "0000011011000000111000000", SURPRISED: "0101000000001000101000100",
        SILLY: "1000100000111110010100111", FABULOUS: "1111111011000000101001110", MEH: "0101000000000100010001000",
        YES: "0000000001000101010001000", NO: "1000101010001000101010001", ARROW_N: "0010001110101010010000100",
        ARROW_NE: "0011100011001010100010000", ARROW_E: "0010000010111110001000100", ARROW_SE: "1000001000001010001100111",
        ARROW_S: "0010000100101010111000100", ARROW_SW: "0000100010101001100011100", ARROW_W: "0010001000111110100000100",
        ARROW_NW: "1110011000101000001000001", DIAMOND: "0010001010100010101000100", SQUARE: "1111110001100011000111111",
        TRIANGLE: "0000000100010101111100000", TARGET: "0010001110110110111000100", GHOST: "1111110101111111111110101",
        SKULL: "0111010101111110111001110", DUCK: "0110011100011110111000000", BUTTERFLY: "1101111111001001111111011",
        MUSIC_CROTCHET: "0010000100001001110011100"
    };
    const IMAGES = Object.keys(PATTERNS);

    // characters 32 to 126, read on a real hub: other characters are blank on the hub too
    const FONT = [
        "0000000000000000000000000", "0010000100001000000000100", "0101001010000000000000000", "0101011111010101111101010",
        "0111110100011100010111110", "1100110010001000100110011", "0110010010011001001001101", "0100001000000000000000000",
        "0010001000010000100000100", "0100000100001000010001000", "0000001010001000101000000", "0000000100011100010000000",
        "0000000000000000010001000", "0000000000011100000000000", "0000000000000000100000000", "0000100010001000100010000",
        "0111001010010100101001110", "0010001100001000010001110", "0111000010011100100001110", "0111000010011100001001110",
        "0101001010011100001000010", "0111001000011100001001110", "0111001000011100101001110", "0111000010001000100001000",
        "0111001010011100101001110", "0111001010011100001001110", "0000000100000000010000000", "0000000100000000010001000",
        "0001000100010000010000010", "0000001110000000111000000", "0100000100000100010001000", "0111010001001100000000100",
        "0111010001101011001101100", "0110010010111101001010010", "1110010010111001001011100", "0111010000100001000001110",
        "1110010010100101001011100", "1111010000111001000011110", "1111010000111001000010000", "0111010000100111000101110",
        "1001010010111101001010010", "1110001000010000100011100", "1111100010000101001001100", "1001010100110001010010010",
        "1000010000100001000011110", "1000111011101011000110001", "1000111001101011001110001", "0110010010100101001001100",
        "1110010010111001000010000", "0110010010100100110000110", "1110010010111001001010001", "0111010000011000001011100",
        "1111100100001000010000100", "1001010010100101001001100", "1000110001100010101000100", "1000110001101011101110001",
        "1001010010011001001010010", "1000101010001000010000100", "1111000100010001000011110", "0111001000010000100001110",
        "1000001000001000001000001", "0111000010000100001001110", "0010001010000000000000000", "0000000000000000000011111",
        "0100000100000000000000000", "0000001110100101001001111", "1000010000111001001011100", "0000001110100001000001110",
        "0001000010011101001001110", "0110010010111001000001110", "0011001000111000100001000", "0111010010011100001001100",
        "1000010000111001001010010", "0100000000010000100001000", "0001000000000100001001100", "1000010100110001010010010",
        "0100001000010000100000110", "0000011011101011000110001", "0000011100100101001010010", "0000001100100101001001100",
        "0000011100100101110010000", "0000001110100100111000010", "0000001110100001000010000", "0000000110010000010011000",
        "0100001000011100100000111", "0000010010100101001001111", "0000010001100010101000100", "0000010001100011010111011",
        "0000010010011000110010010", "0000001010010100010011000", "0000011110001000100011110", "0011000100011000010000110",
        "0100001000010000100001000", "1100001000011000100011000", "0000000000011000001100000"
    ];
    const BLANK = "0".repeat(25);
    const glyph = char => FONT[char.charCodeAt(0) - 32] || BLANK;
    const columns = pattern => [0, 1, 2, 3, 4].map(column => [0, 1, 2, 3, 4].map(row => pattern[row * 5 + column] === '1' ? 100 : 0));
    const EMPTY_COLUMN = [0, 0, 0, 0, 0];

    hub.light_matrix = object("light_matrix", function ($gbl, $loc) {
        IMAGES.forEach((name, i) => { $loc["IMAGE_" + name] = new Sk.builtin.int_(i); });
        $loc.show_image = fn("show_image", function (self, image) {
            const pattern = PATTERNS[IMAGES[js(image)]];
            showPixels(pattern.split('').map(c => c === '1' ? 100 : 0));
            return Sk.builtin.none();
        }, ['image']);
        $loc.show = fn("show", function (self, pixels) {
            showPixels(js(pixels));
            return Sk.builtin.none();
        }, ['pixels']);
        $loc.set_pixel = fn("set_pixel", function (self, x, y, intensity) {
            setLed(js(x), js(y), js(intensity));
            return Sk.builtin.none();
        }, ['x', 'y', 'intensity'], [0, 0, 100]);
        $loc.clear = fn("clear", function (self) {
            showPixels(new Array(25).fill(0));
            return Sk.builtin.none();
        });
        $loc.write = fn("write", function (self, text, intensity, time_per_character) {
            const chars = [...String(js(text))];
            const duration = chars.length * js(time_per_character);
            // a single character stays on the matrix, a text scrolls: 5 columns per character, 2 for a space
            if (chars.length < 2) {
                if (chars.length) showPixels(glyph(chars[0]).split('').map(c => c === '1' ? 100 : 0));
                return Simulator.sleep_ms(duration);
            }
            const blank = new Array(5).fill(EMPTY_COLUMN);
            const strip = [...blank, ...chars.flatMap(char => char === ' ' ? blank.slice(0, 2) : columns(glyph(char))), ...blank];
            const frames = strip.length - 4;
            return Simulator.runAsync(async function (resolve) {
                for (let frame = 0; frame < frames && !Simulator.stop_flag; frame++) {
                    const window = strip.slice(frame, frame + 5);
                    showPixels(new Array(25).fill(0).map((_, i) => window[i % 5][Math.floor(i / 5)]));
                    await sleep_ms(duration / frames);
                }
                resolve(Sk.builtin.none());
            });
        }, ['text', 'intensity', 'time_per_character'], ['', 100, 500]);
    });

    hub.light = object("light", function ($gbl, $loc) {
        $loc.POWER = new Sk.builtin.int_(0);
        $loc.color = fn("color", function (self, light, color) {
            const rgb = ["0,0,0", "238,130,238", "128,0,128", "0,0,255", "0,127,255", "64,224,208", "0,128,0", "255,255,0", "255,165,0", "255,0,0", "255,255,255"][js(color)];
            const el = document.querySelector('#board-viewer')?.contentDocument?.getElementById('power-light');
            if (el) el.style.fill = 'rgb(' + rgb + ')';
            return Sk.builtin.none();
        }, ['light', 'color'], [0, 10]);
    });

    let oscillator = null, masterVolume = 100;

    hub.sound = object("sound", function ($gbl, $loc) {
        $loc.beep = fn("beep", function (self, freq, duration, volume) {
            Simulator.audioContext = Simulator.audioContext || new (window.AudioContext || window.webkitAudioContext)();
            const context = Simulator.audioContext;
            const gain = context.createGain();
            gain.gain.value = 0.3 * js(volume) / 100 * masterVolume / 100; // full volume is too loud in a browser
            gain.connect(context.destination);
            oscillator?.stop();
            oscillator = context.createOscillator();
            oscillator.frequency.value = js(freq);
            oscillator.connect(gain);
            oscillator.start();
            oscillator.stop(context.currentTime + js(duration) / 1000); // ends by itself even if the simulator is stopped
            return Simulator.sleep_ms(js(duration));
        }, ['freq', 'duration', 'volume'], [440, 500, 100]);
        $loc.stop = fn("stop", function (self) {
            oscillator?.stop();
            oscillator = null;
            return Sk.builtin.none();
        });
        $loc.volume = fn("volume", function (self, volume) {
            masterVolume = js(volume);
            return Sk.builtin.none();
        }, ['volume'], [100]);
    });

    // the left and right buttons of the board SVG: pressed() gives the time they are held, in ms
    const pressedSince = {};
    const bindButton = function (id, button) {
        const element = document.querySelector('#board-viewer')?.contentDocument?.getElementById(id);
        if (!element) return;
        const release = () => {
            delete pressedSince[button];
            element.style.opacity = 1;
        };
        element.style.cursor = 'pointer';
        element.onpointerdown = () => {
            pressedSince[button] = Date.now();
            element.style.opacity = 0.6;
        };
        element.onpointerup = release;
        element.onpointerleave = release;
    };

    hub.button = object("button", function ($gbl, $loc) {
        $loc.LEFT = new Sk.builtin.int_(0);
        $loc.RIGHT = new Sk.builtin.int_(2);
        $loc.pressed = fn("pressed", function (self, button) {
            bindButton('button-left', 0);
            bindButton('button-right', 2);
            const since = pressedSince[js(button)];
            return new Sk.builtin.int_(since ? Math.max(1, Date.now() - since) : 0);
        }, ['button'], [0]);
    });

    hub.motion_sensor = object("motion_sensor", function ($gbl, $loc) {
        $loc.tilt_angles = fn("tilt_angles", function (self) {
            // the sliders are in degrees, the hub gives decidegrees
            return new Sk.builtin.tuple(['_yaw', '_pitch', '_roll'].map(axis => new Sk.builtin.int_(Simulator.getSliderValue('spike-motion', axis) * 10)));
        });
    });

    return hub;
};
