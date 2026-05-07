// Eliobot - adafruit_ssd1306 module

const $builtinmodule = function () {

    const adafruit_ssd1306 = {};

    adafruit_ssd1306.__name__ = new Sk.builtin.str('adafruit_ssd1306');

    adafruit_ssd1306.SSD1306_I2C = new Sk.misceval.buildClass(adafruit_ssd1306, function ($gbl, $loc) {

        const XPIXELS = 128;
        const YPIXELS = 64;

        const BLACK = "rgb(5, 5, 5)";
        const BLUE = "#6bc4ff";

        const setCursor = function (self, x, y) {
            self.x = x.v;
            self.y = y.v;
        };

        const convertToChar = function (c) {
            let charArray = []
            for (let i = 0; i < 8; i++) {
                const bin = c[i].toString(2).substr(-8);
                charArray.push('0'.repeat(8 - bin.length) + bin);
            }
            for (let i = 0; i < 2; i++) {
                charArray = charArray.map((val, index) => charArray.map(row => row[index]).reverse());
            }
            return charArray.reverse();
        };

        const setChar = function (self, col, row, char) {
            for (let i = 0; i < 8; i++) {
                const line = convertToChar(char)[i];
                for (let j = 0; j < 8; j++) {
                    fillPixel(self, i + col, j + row, parseInt(line[j]) == 1);
                }
            }
        };

        $loc.__init__ = new Sk.builtin.func(function (self, width, height, i2c) {
            self.width = Sk.ffi.remapToJs(width);
            self.height = Sk.ffi.remapToJs(height);
            self.i2c = Sk.ffi.remapToJs(i2c);
            self.temp = new Array(2);
            self.write_list = [[0x40], null]
            self.ctx = document.querySelector('.oled_canvas').getContext('2d');
            self.image = new Array();
            self.inverted = false;
            fill(self, 0);
            show(self);
        });

        $loc.fill_rect = new Sk.builtin.func(function (self, x, y, width, a, b) { });

        const setText = function (self, str, l, c, id = 1) {
            setCursor(self, c, l);
            const myString = str.v;
            for (let i = 0; i < myString.length; i++) {
                const col = 8 * (self.y + i) + 1;
                const row = self.x + 1;
                if (ALPHABET_8X8[myString[i]] && col < XPIXELS && row < YPIXELS) {
                    setChar(self, col, row, ALPHABET_8X8[myString[i]]);
                }
            }
        };
        setText.co_varnames = ['self', 'str', 'l', 'c', 'id'];
        setText.$defaults = [];
        $loc.text = new Sk.builtin.func(setText);

        const show = function (self) {
            for (let i = 0; i <= XPIXELS; i++) {
                for (let j = 0; j <= YPIXELS; j++) {
                    self.ctx.fillStyle = self.image[i][j].color;
                    if (self.inverted) {
                        self.ctx.fillStyle = self.ctx.fillStyle == BLUE ? BLACK : BLUE;
                    }
                    self.ctx.fillRect(i * 2, j * 2, 2, 2);
                }
            }
        };

        $loc.show = new Sk.builtin.func(show);

        const fill = function (self, state) {
            const state_ = Sk.ffi.remapToJs(state);
            const color = state_ ? BLUE : BLACK;
            self.image = new Array();
            for (let i = 0; i <= XPIXELS; i++) {
                self.image.push(sub_pixels = []);
                for (let j = 0; j <= YPIXELS; j++) {
                    self.image[i].push({ "color": color });
                }
            }
        };

        $loc.fill = new Sk.builtin.func(fill);

        const fillPixel = function (self, x, y, condition) {
            self.image[x][y] = { "color": condition ? BLUE : BLACK };
        };

        $loc.pixel = new Sk.builtin.func(fillPixel);

        const invert = function (self, state) {
            self.inverted = state.v;
            show(self);
        };

        $loc.invert = new Sk.builtin.func(invert);

    }, 'SSD1306_I2C', []);

    return adafruit_ssd1306;
};