// STM32 - stm32_ssd1306 module

var $builtinmodule = function () {

    const XPIXELS = 128;
    const YPIXELS = 64;

    const BLACK = "rgb(5,5,5)";
    const BLUE = "#6bc4ff";

    var stm32_ssd1306 = {};

    stm32_ssd1306.SSD1306_I2C_ADDR = new Sk.builtin.int_(0x3c);
    stm32_ssd1306.__name__ = new Sk.builtin.str("stm32_ssd1306");

    stm32_ssd1306.SSD1306 = new Sk.misceval.buildClass(stm32_ssd1306, function ($gbl, $loc) {

        SSD1306__init__ = function (self, width, height, external_vcc) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 5, 5);
            Sk.builtin.pyCheckType("width", "integer", Sk.builtin.checkInt(width));
            Sk.builtin.pyCheckType("height", "integer", Sk.builtin.checkInt(height));
            Sk.builtin.pyCheckType("external_vcc", "boolean", Sk.builtin.checkBool(external_vcc));
            self.width = width.v;
            self.height = height.v;
            self.external_vcc = external_vcc.v;
            self.pages = self.height;
            self.buffer = new Array(self.pages * self.width);
        };

        SSD1306__init__.co_varnames = ['self', 'width', 'height', 'external_vcc'];
        SSD1306__init__.$defaults = [];
        $loc.__init__ = new Sk.builtin.func(SSD1306__init__);

        $loc.init_display = new Sk.builtin.func(function (self) {
        });

    }, "SSD1306", []);

    const fill = function (self, state) {
        self.image = new Array();
        for (var i = 0; i <= XPIXELS; i++) {
            self.image.push(sub_pixels = []);
            for (var j = 0; j <= YPIXELS; j++) {
                self.image[i].push({ "color": state.v ? BLUE : BLACK });
            }
        }
    };

    const fillPixel = function (self, x, y, condition) {
        self.image[x][y] = { "color": condition ? BLUE : BLACK };
    };

    const show = function (self) {
        for (var i = 0; i <= XPIXELS; i++) {
            for (var j = 0; j <= YPIXELS; j++) {
                self.ctx.fillStyle = self.image[i][j].color;
                if (self.inverted) {
                    self.ctx.fillStyle = self.ctx.fillStyle == BLUE ? BLACK : BLUE;
                }
                self.ctx.fillRect(i * 2, j * 2, 2, 2);
            }
        }
    };

    const setCursor = function (self, x, y) {
        self.x = x.v;
        self.y = y.v;
    };

    const convertToChar = function (c) {
        let charArray = [];
        for (var i = 0; i < 8; i++) {
            const bin = c[i].toString(2).substr(-8);
            charArray.push('0'.repeat(8 - bin.length) + bin);
        }
        for (var i = 0; i < 2; i++) {
            charArray = charArray.map((val, index) => charArray.map(row => row[index]).reverse());
        }
        return charArray.reverse();
    };

    const setChar = function (self, col, row, char) {
        for (var i = 0; i < 8; i++) {
            const line = convertToChar(char)[i];
            for (var j = 0; j < 8; j++) {
                fillPixel(self, i + col, j + row, parseInt(line[j]) == 1);
            }
        }
    };

    const setText = function (self, str, l, c) {
        setCursor(self, c, l);
        const myString = str.v;
        for (var i = 0; i < myString.length; i++) {
            const col = 8 * (self.y + i) + 1;
            const row = self.x + 1;
            if (ALPHABET_8X8[myString[i]] && col < XPIXELS && row < YPIXELS) {
                setChar(self, col, row, ALPHABET_8X8[myString[i]]);
            }
        }
    };

    const invert = function (self, state) {
        self.inverted = state.v;
        show(self);
    };

    const line = function (self, x1, y1, x2, y2, state) {
        Sk.builtin.pyCheckArgsLen("line", arguments.length, 5, 6);
        Sk.builtin.pyCheckType("x1", "integer", Sk.builtin.checkInt(x1));
        Sk.builtin.pyCheckType("y1", "integer", Sk.builtin.checkInt(y1));
        Sk.builtin.pyCheckType("x2", "integer", Sk.builtin.checkInt(x2));
        Sk.builtin.pyCheckType("y2", "integer", Sk.builtin.checkInt(y2));
        Sk.builtin.pyCheckType("state", "boolean", Sk.builtin.checkBool(state) || Sk.builtin.checkInt(state));
        let x, y;
        x1 = x1.v; x2 = x2.v; y1 = y1.v; y2 = y2.v;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dx1 = Math.abs(dx);
        const dy1 = Math.abs(dy);
        const positiveWay = (dx < 0 && dy < 0) || (dx > 0 && dy > 0);
        const init = function (d, min, max) {
            if (d >= 0) {
                x = x1; y = y1;
                return max;
            } else {
                x = x2; y = y2;
                return min;
            }
        };
        const next = function (val) {
            return positiveWay ? val += 1 : val -= 1;
        };
        if (dy1 <= dx1) {
            lim = init(dx, x1, x2);
            fillPixel(self, x, y, state.v);
            let p = 2 * dy1 - dx1;
            for (var i = 0; x < lim; i++) {
                x += 1;
                if (p < 0) {
                    p += 2 * dy1;
                } else {
                    y = next(y);
                    p += 2 * (dy1 - dx1);
                }
                fillPixel(self, x, y, state.v);
            }
        } else {
            lim = init(dy, y1, y2);
            fillPixel(self, x, y, state.v);
            let p = 2 * dx1 - dy1;
            for (var i = 0; y < lim; i++) {
                y += 1;
                if (p <= 0) {
                    p += 2 * dx1;
                } else {
                    x = next(x);
                    p += 2 * (dx1 - dy1);
                }
                fillPixel(self, x, y, state.v);
            }
        }
    };

    stm32_ssd1306.SSD1306_I2C = new Sk.misceval.buildClass(stm32_ssd1306, function ($gbl, $loc) {

        SSD1306_I2C__init__ = function (self, width, height, i2c, addr, external_vcc) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 6);
            Sk.builtin.pyCheckType("width", "integer", Sk.builtin.checkInt(width));
            Sk.builtin.pyCheckType("height", "integer", Sk.builtin.checkInt(height));
            Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
            Sk.builtin.pyCheckType("external_vcc", "boolean", Sk.builtin.checkBool(external_vcc));
            if (Sk.builtin.checkNone(i2c)) {
                throw new Sk.builtin.ValueError("I2C object 'SSD1306_I2C' needed as argument!");
            } else {
                self.i2c = i2c;
                self.addr = addr.v;
                $("#oled").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
                self.width = width.v;
                self.height = height.v;
                self.external_vcc = external_vcc.v;
                self.temp = new Array(2);
                self.write_list = [[0x40], null]
                self.ctx = document.querySelector('.oled_canvas').getContext('2d');
                self.image = new Array();
                self.inverted = false;
                fill(self, new Sk.builtin.int_(0));
                show(self);
            }
        };

        SSD1306_I2C__init__.co_varnames = ['self', 'width', 'height', 'i2c', 'addr', 'external_vcc'];
        SSD1306_I2C__init__.$defaults = [Sk.builtin.none(), stm32_ssd1306.SSD1306_I2C_ADDR, new Sk.builtin.bool(false)];
        $loc.__init__ = new Sk.builtin.func(SSD1306_I2C__init__);

        $loc.text = new Sk.builtin.func(setText);

        $loc.show = new Sk.builtin.func(show);

        $loc.fill = new Sk.builtin.func(fill);

        $loc.invert = new Sk.builtin.func(invert);

        line.co_varnames = ['self', 'x1', 'y1', 'x2', 'y2', 'state'];
        line.$defaults = [new Sk.builtin.bool(true)];
        $loc.line = new Sk.builtin.func(line);

    }, "SSD1306_I2C", [stm32_ssd1306.SSD1306]);

    return stm32_ssd1306;
};