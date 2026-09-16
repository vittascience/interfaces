// python/raspberry - rpi_ws281x module

var $builtinmodule = function (name) {
    var rpi_ws281x = {};

    rpi_ws281x.__name__ = new Sk.builtin.str("rpi_ws281x");

    function clamp8(v) {
        v = Number(v) || 0;
        return Math.max(0, Math.min(255, v));
    }

    function colorToRgb(color) {
        const c = Sk.ffi.remapToJs(color);

        // Cas Color(r, g, b) simulé sous forme d'objet
        if (typeof c === "object" && c !== null && "r" in c) {
            return [clamp8(c.r), clamp8(c.g), clamp8(c.b)];
        }

        // Cas entier packé 0x00RRGGBB
        if (typeof c === "number") {
            return [
                clamp8((c >> 16) & 0xff),
                clamp8((c >> 8) & 0xff),
                clamp8(c & 0xff)
            ];
        }

        return [0, 0, 0];
    }

    rpi_ws281x.Color = new Sk.builtin.func(function (r, g, b, w) {
        Sk.builtin.pyCheckArgsLen("Color", arguments.length, 3, 4);
        Sk.builtin.pyCheckType("r", "integer", Sk.builtin.checkInt(r));
        Sk.builtin.pyCheckType("g", "integer", Sk.builtin.checkInt(g));
        Sk.builtin.pyCheckType("b", "integer", Sk.builtin.checkInt(b));

        return Sk.ffi.remapToPy({
            r: clamp8(r.v),
            g: clamp8(g.v),
            b: clamp8(b.v),
            w: w !== undefined ? clamp8(w.v) : 0
        });
    });

    var PixelStrip = function ($gbl, $loc) {

        var PixelStrip__init__ = function (
            self,
            num,
            pin,
            freq_hz,
            dma,
            invert,
            brightness,
            channel,
            strip_type,
            gamma
        ) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 10);
            Sk.builtin.pyCheckType("num", "integer", Sk.builtin.checkInt(num));
            Sk.builtin.pyCheckType("pin", "integer", Sk.builtin.checkInt(pin));

            self.n = num.v;
            self.pin = pin.v;
            self.freq_hz = freq_hz ? freq_hz.v : 800000;
            self.dma = dma ? dma.v : 10;
            self.invert = invert ? Sk.ffi.remapToJs(invert) : false;
            self.brightness = brightness ? brightness.v : 255;
            self.channel = channel ? channel.v : 0;
            self.strip_type = strip_type ? strip_type.v : null;
            self.gamma = gamma ? Sk.ffi.remapToJs(gamma) : null;

            self.LEDS = [];

            let html = '<div class="row">';
            for (let i = 0; i < self.n; i++) {
                html += '<div class="neopixel-block neopixel-' + self.pin + '" style="background-color:#000000;"></div>';
                self.LEDS.push([0, 0, 0]);
            }
            html += "</div>";

            $("#neopixel_" + self.pin + "_value").html(html);
        };

        PixelStrip__init__.co_varnames = [
            "self",
            "num",
            "pin",
            "freq_hz",
            "dma",
            "invert",
            "brightness",
            "channel",
            "strip_type",
            "gamma"
        ];

        PixelStrip__init__.$defaults = [
            new Sk.builtin.int_(800000),
            new Sk.builtin.int_(10),
            Sk.builtin.bool.false$,
            new Sk.builtin.int_(255),
            new Sk.builtin.int_(0),
            Sk.builtin.none(),
            Sk.builtin.none()
        ];

        $loc.__init__ = new Sk.builtin.func(PixelStrip__init__);

        $loc.begin = new Sk.builtin.func(function (self) {
            return Sk.builtin.none();
        });

        $loc.numPixels = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(self.n);
        });

        $loc.setPixelColor = new Sk.builtin.func(function (self, index, color) {
            Sk.builtin.pyCheckArgsLen("setPixelColor", arguments.length, 3, 3);
            Sk.builtin.pyCheckType("index", "integer", Sk.builtin.checkInt(index));

            const i = index.v;

            if (i < 0 || i >= self.n) {
                return Sk.builtin.none();
            }

            self.LEDS[i] = colorToRgb(color);

            return Sk.builtin.none();
        });

        $loc.setPixelColorRGB = new Sk.builtin.func(function (self, index, r, g, b, w) {
            Sk.builtin.pyCheckArgsLen("setPixelColorRGB", arguments.length, 5, 6);
            Sk.builtin.pyCheckType("index", "integer", Sk.builtin.checkInt(index));

            const i = index.v;

            if (i < 0 || i >= self.n) {
                return Sk.builtin.none();
            }

            self.LEDS[i] = [clamp8(r.v), clamp8(g.v), clamp8(b.v)];

            return Sk.builtin.none();
        });

        $loc.getPixelColor = new Sk.builtin.func(function (self, index) {
            Sk.builtin.pyCheckArgsLen("getPixelColor", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("index", "integer", Sk.builtin.checkInt(index));

            const i = index.v;

            if (i < 0 || i >= self.n) {
                return new Sk.builtin.int_(0);
            }

            const color = self.LEDS[i];
            const value = (color[0] << 16) | (color[1] << 8) | color[2];

            return new Sk.builtin.int_(value);
        });

        $loc.setBrightness = new Sk.builtin.func(function (self, brightness) {
            Sk.builtin.pyCheckArgsLen("setBrightness", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("brightness", "integer", Sk.builtin.checkInt(brightness));

            self.brightness = clamp8(brightness.v);

            return Sk.builtin.none();
        });

        $loc.getBrightness = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(self.brightness);
        });

        $loc.show = new Sk.builtin.func(function (self) {
            const factor = self.brightness / 255;

            for (let i = 0; i < self.n; i++) {
                const color = self.LEDS[i];

                const r = Math.round(color[0] * factor);
                const g = Math.round(color[1] * factor);
                const b = Math.round(color[2] * factor);

                $(".neopixel-" + self.pin)
                    .eq(i)
                    .css("background-color", "rgb(" + r + "," + g + "," + b + ")");
            }

            return Sk.builtin.none();
        });
    };

    rpi_ws281x.PixelStrip = new Sk.misceval.buildClass(
        rpi_ws281x,
        PixelStrip,
        "PixelStrip",
        []
    );

    return rpi_ws281x;
};