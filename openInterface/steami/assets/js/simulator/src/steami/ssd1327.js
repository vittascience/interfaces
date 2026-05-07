// STeaMi - ssd1327 module

function $builtinmodule(name) {
    const module = {};
    var import_modules = Object.create(null);
    return Sk.misceval.chain(
        Sk.importModule("framebuf", false, true),
        (framebuf_mod) => {
            import_modules.framebuf = framebuf_mod.$d;
        },
        () => ssd1327_mod(module, import_modules)
    );
};

function ssd1327_mod(module, import_modules) {

    const XPIXELS = 128;
    const YPIXELS = 128;

    const BLACK = "#1a1a1a";
    const BLUE = "#e3f6ffff";

    module.__name__ = new Sk.builtin.str("ssd1327");

    // commands
    module.SET_COL_ADDR = new Sk.builtin.int_(0x15)
    module.SET_SCROLL_DEACTIVATE = new Sk.builtin.int_(0x2E)
    module.SET_ROW_ADDR = new Sk.builtin.int_(0x75)
    module.SET_CONTRAST = new Sk.builtin.int_(0x81)
    module.SET_SEG_REMAP = new Sk.builtin.int_(0xA0)
    module.SET_DISP_START_LINE = new Sk.builtin.int_(0xA1)
    module.SET_DISP_OFFSET = new Sk.builtin.int_(0xA2)
    module.SET_DISP_MODE = new Sk.builtin.int_(0xA4)  // 0xA4 normal, 0xA5 all on, 0xA6 all off, 0xA7 when inverted
    module.SET_MUX_RATIO = new Sk.builtin.int_(0xA8)
    module.SET_FN_SELECT_A = new Sk.builtin.int_(0xAB)
    module.SET_DISP = new Sk.builtin.int_(0xAE)  // 0xAE power off, 0xAF power on
    module.SET_PHASE_LEN = new Sk.builtin.int_(0xB1)
    module.SET_DISP_CLK_DIV = new Sk.builtin.int_(0xB3)
    module.SET_SECOND_PRECHARGE = new Sk.builtin.int_(0xB6)
    module.SET_GRAYSCALE_TABLE = new Sk.builtin.int_(0xB8)
    module.SET_GRAYSCALE_LINEAR = new Sk.builtin.int_(0xB9)
    module.SET_PRECHARGE = new Sk.builtin.int_(0xBC)
    module.SET_VCOM_DESEL = new Sk.builtin.int_(0xBE)
    module.SET_FN_SELECT_B = new Sk.builtin.int_(0xD5)
    module.SET_COMMAND_LOCK = new Sk.builtin.int_(0xFD)

    // registers
    module.REG_CMD = new Sk.builtin.int_(0x80)
    module.REG_DATA = new Sk.builtin.int_(0x40)

    const framebuf = import_modules.framebuf;

    module.SSD1327 = new Sk.misceval.buildClass(module, function ($gbl, $loc) {

        SSD1327__init__ = function (self, width, height) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);
            Sk.builtin.pyCheckType("width", "integer", Sk.builtin.checkInt(width));
            Sk.builtin.pyCheckType("height", "integer", Sk.builtin.checkInt(height));

            Sk.setClassAttribute(self, "width", width);
            Sk.setClassAttribute(self, "height", height);

            const bufList = new Sk.builtin.list(new Array(width.v * Math.floor(height.v / 2)).fill(0));
            const buffer = Sk.misceval.callsim(Sk.builtins.bytearray, bufList);
            Sk.setClassAttribute(self, "buffer", buffer);
            const fb = Sk.misceval.callsim(framebuf.FrameBuffer, buffer, width, height, framebuf.GS4_HMSB);
            Sk.setClassAttribute(self, "framebuf", fb);

            const col_addr = [(Math.floor((128 - width.v) / 4), Math.floor(63 - ((128 - width.v) / 4)))]
            Sk.setClassAttribute(self, "col_addr", new Sk.builtin.tuple(col_addr));
            Sk.setClassAttribute(self, "row_addr", new Sk.builtin.tuple([0, height.v - 1]));
            Sk.setClassAttribute(self, "offset", new Sk.builtin.int_(128 - height.v));

            self.inverted = false;
            self.ctx = document.querySelector('.canvas-steami-screen').getContext('2d');
            console.log(self.ctx)

            $loc.poweron.tp$call([self]);
            $loc.init_display.tp$call([self]);

        };

        SSD1327__init__.co_varnames = ['self', 'width', 'height'];
        SSD1327__init__.$defaults = [new Sk.builtin.int_(XPIXELS), new Sk.builtin.int_(YPIXELS)];
        $loc.__init__ = new Sk.builtin.func(SSD1327__init__);

        $loc.init_display = new Sk.builtin.func(function (self) {
            // TO DO
            Sk.builtin.pyCheckArgsLen("init_display", arguments.length, 1, 1);
        });

        $loc.poweron = new Sk.builtin.func(function (self) {
            // TO DO
            Sk.builtin.pyCheckArgsLen("poweron", arguments.length, 1, 1);
        });

        $loc.poweroff = new Sk.builtin.func(function (self) {
            // TO DO
            Sk.builtin.pyCheckArgsLen("poweroff", arguments.length, 1, 1);
        });

        $loc.contrast = new Sk.builtin.func(function (self, contrast) {
            // TO DO
            Sk.builtin.pyCheckArgsLen("contrast", arguments.length, 2, 2);
        });

        $loc.rotate = new Sk.builtin.func(function (self, rotate) {
            // TO DO
            Sk.builtin.pyCheckArgsLen("rotate", arguments.length, 2, 2);
            self.rotated = rotate.v;
            show(self);
        });

        $loc.invert = new Sk.builtin.func(function (self, invert) {
            Sk.builtin.pyCheckArgsLen("invert", arguments.length, 2, 2);
            self.inverted = invert.v;
            show(self);
        });

        $loc.show = new Sk.builtin.func(function (self) {
            Sk.builtin.pyCheckArgsLen("show", arguments.length, 1, 1);
            show(self);
        });

        $loc.lookup = new Sk.builtin.func(function (self, data) {
            // TO DO
            Sk.builtin.pyCheckArgsLen("lookup", arguments.length, 2, 2);
        });

        $loc.fill = new Sk.builtin.func(function (self, col) {
            Sk.builtin.pyCheckArgsLen("fill", arguments.length, 2, 2);
            const fb = Sk.getClassAttribute(self, "framebuf");
            Sk.callClassFunction(fb, "fill", [col]);
        });

        $loc.pixel = new Sk.builtin.func(function (self, x, y, col) {
            Sk.builtin.pyCheckArgsLen("pixel", arguments.length, 4, 4);
            const fb = Sk.getClassAttribute(self, "framebuf");
            Sk.callClassFunction(fb, "pixel", [x, y, col]);
        });

        $loc.line = new Sk.builtin.func(function (self, x1, y1, x2, y2, col) {
            Sk.builtin.pyCheckArgsLen("line", arguments.length, 6, 6);
            const fb = Sk.getClassAttribute(self, "framebuf");
            Sk.callClassFunction(fb, "line", [x1, y1, x2, y2, col]);
        });

        $loc.scroll = new Sk.builtin.func(function (self, dx, dy) {
            Sk.builtin.pyCheckArgsLen("scroll", arguments.length, 3, 3);
            const fb = Sk.getClassAttribute(self, "framebuf");
            Sk.callClassFunction(fb, "scroll", [dx, dy]);
        });

        const text = function (self, string, x, y, col) {
            Sk.builtin.pyCheckArgsLen("text", arguments.length, 4, 5);
            const fb = Sk.getClassAttribute(self, "framebuf");
            Sk.callClassFunction(fb, "text", [string, x, y, col]);
        }
        text.co_varnames = ['self', 'string', 'x', 'y', 'col'];
        text.$defaults = [new Sk.builtin.int_(15)];

        $loc.text = new Sk.builtin.func(text);

        $loc.write_cmd = new Sk.builtin.func(function (self) {
            throw new Sk.builtin.NotImplementedError("machine.SPI.write_cmd() is not yet implemented");
        });

        $loc.write_data = new Sk.builtin.func(function (self) {
            throw new Sk.builtin.NotImplementedError("machine.SPI.write_data() is not yet implemented");
        });

    }, "SSD1327", []);

    const show = function (self) {

        const width = Sk.getClassAttribute(self, "width").v;
        const height = Sk.getClassAttribute(self, "height").v;

        const fb = Sk.getClassAttribute(self, "framebuf");
        const buf = Sk.getClassAttribute(fb, "buf");
        const bytearray = Sk.getClassAttribute(buf, "!_data").v;

        const cx = width / 2;
        const cy = height / 2;
        const r2 = cx * cx;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const dx = (x + 0.5) - cx;
                const dy = (y + 0.5) - cy;
                if (dx * dx + dy * dy > r2) {
                    continue;
                }
                const b = bytearray[y * (width >> 1) + (x >> 1)];
                const gray = (x & 1) === 0 ? (b >> 4) & 0x0F : b & 0x0F;
                let color = gray > 0 ? BLUE : BLACK;
                if (self.inverted) {
                    color = (color === BLUE) ? BLACK : BLUE;
                }
                self.ctx.fillStyle = color;
                self.ctx.fillRect(x, y, 2, 2);
            }
        }
    };

    module.SSD1327_SPI = new Sk.misceval.buildClass(module, function ($gbl, $loc) {

        SSD1327_SPI__init__ = function (self, width, height, spi, dc, res, cs) {
            Sk.setClassAttribute(self, "rate", new Sk.builtin.int_(10000000));

            Sk.callClassFunction(dc, "init", [Object.getPrototypeOf(dc).OUT, new Sk.builtin.int_(0)]);
            Sk.callClassFunction(res, "init", [Object.getPrototypeOf(res).OUT, new Sk.builtin.int_(1)]);
            Sk.callClassFunction(cs, "init", [Object.getPrototypeOf(cs).OUT, new Sk.builtin.int_(1)]);

            Sk.setClassAttribute(self, "spi", spi);
            Sk.setClassAttribute(self, "dc", dc);
            Sk.setClassAttribute(self, "res", res);
            Sk.setClassAttribute(self, "cs", cs);
            Sk.misceval.callsim($loc.reset, self);

            Sk.misceval.callsim(module.SSD1327.prototype.__init__,
                self, width, height,
            );
        };

        SSD1327_SPI__init__.co_varnames = ['self', 'width', 'height', 'spi', 'dc', 'res', 'cs'];
        SSD1327_SPI__init__.$defaults = [];
        $loc.__init__ = new Sk.builtin.func(SSD1327_SPI__init__);

        $loc.reset = new Sk.builtin.func(function (self) {
        });

        $loc.write_cmd = new Sk.builtin.func(function (self, cmd) {
            // TO DO
            Sk.builtin.pyCheckArgsLen("write_cmd", arguments.length, 2, 2);
            throw new Sk.builtin.NotImplementedError("<b>[ssd1327_spi].write_cmd()</b> is not yet implemented");
        });

        $loc.write_data = new Sk.builtin.func(function (self, buf) {
            // TO DO
            Sk.builtin.pyCheckArgsLen("write_data", arguments.length, 2, 2);
            throw new Sk.builtin.NotImplementedError("<b>[ssd1327_spi].write_data()</b> is not yet implemented");
        });

    }, "SSD1327_SPI", [module.SSD1327]);

    module.WS_OLED_128X128_SPI = new Sk.misceval.buildClass(module, function ($gbl, $loc) {

        WS_OLED_128X128_SPI__init__ = function (self, spi, dc, res, cs) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 5, 5);

            Sk.misceval.callsim(module.SSD1327_SPI.prototype.__init__,
                self, new Sk.builtin.int_(128), new Sk.builtin.int_(128), spi, dc, res, cs
            );
        };

        WS_OLED_128X128_SPI__init__.co_varnames = ['self', 'spi', 'dc', 'res', 'cs'];
        WS_OLED_128X128_SPI__init__.$defaults = [];
        $loc.__init__ = new Sk.builtin.func(WS_OLED_128X128_SPI__init__);

    }, "WS_OLED_128X128_SPI", [module.SSD1327_SPI]);

    return module;
};