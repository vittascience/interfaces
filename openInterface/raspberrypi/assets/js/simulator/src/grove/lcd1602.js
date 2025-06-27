// ESP32 - esp32_lcd_i2c module

var $builtinmodule = function () {

    var esp32_lcd_i2c = {};

    esp32_lcd_i2c.LCD_I2C_ADDR = new Sk.builtin.int_(0x3e);

    esp32_lcd_i2c.LCD1602 = new Sk.misceval.buildClass(esp32_lcd_i2c, function ($gbl, $loc) {

        LCD1602__init__ = function (self, i2c, addr) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 3);
            Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
            self.i2c = i2c;
            self.addr = addr.v;
            $("#lcdGrove").find(".subtitle-module").html('I2C (0x' + self.addr.toString(16) + ')');
            self.l0 = Array(16).fill('&nbsp;');
            self.l1 = Array(16).fill('&nbsp;');
            self.x = 0;
            self.y = 0;
            self.display = true;
            self.cursor = true;
            self.printText = function () {
                $('#lcdGrove_value').html(self.l0.join('') + "<br/>" + self.l1.join(''));
            };
            self.fillLine = function (line, text) {
                for (var i = self.x; i < self.x + text.length; i++) {
                    self[line][i] = text[i - self.x];
                }
            };
        };

        LCD1602__init__.co_varnames = ['self', 'i2c', 'addr'];
        LCD1602__init__.$defaults = [Sk.builtin.none(), esp32_lcd_i2c.LCD_I2C_ADDR];

        $loc.__init__ = new Sk.builtin.func(LCD1602__init__);

        $loc.writeTxt = new Sk.builtin.func(function (self, text) {
            text = text.v.substr(0, 16 - self.x);
            if (self.y == 0) {
                self.fillLine('l0', text);
            } else {
                self.fillLine('l1', text);
            }
            self.printText();
        });

        $loc.write_char = new Sk.builtin.func(function (self, char) {
            throw new Sk.builtin.NotImplementedError("write_char() from esp32_lcd_i2c is not yet implemented");
        });

        $loc.setCursor = new Sk.builtin.func(function (self, y, x) {
            Sk.builtin.pyCheckArgsLen("setCursor", arguments.length, 3, 3);
            Sk.builtin.pyCheckType("x", "integer", Sk.builtin.checkInt(x));
            Sk.builtin.pyCheckType("y", "integer", Sk.builtin.checkInt(y));
            self.x = x.v;
            self.y = y.v;
        });

        $loc.display = new Sk.builtin.func(function (self, display) {
            Sk.builtin.pyCheckArgsLen("display", arguments.length, 1, 2);
            if (display && display.v) {
                self.display = true;
            } else {
                self.display = false;
            }
        });

        $loc.cursor = new Sk.builtin.func(function (self, cursor) {
            Sk.builtin.pyCheckArgsLen("setCursor", arguments.length, 1, 2);
            if (cursor && cursor.v) {
                self.cursor = true;
            } else {
                self.cursor = false;
            }
        });

        $loc.home = new Sk.builtin.func(function () {
            $loc.setCursor.func_code(0, 0);
        });

        $loc.clear = new Sk.builtin.func(function (self) {
            self.l0 = Array(16).fill('&nbsp;');
            self.l1 = Array(16).fill('&nbsp;');
            self.printText();
        });

        $loc._write = new Sk.builtin.func(function () {
            throw new Sk.builtin.NotImplementedError("_write() from esp32_lcd_i2c is not yet implemented");
        });

        $loc._command = new Sk.builtin.func(function () {
            throw new Sk.builtin.NotImplementedError("_command() from esp32_lcd_i2c is not yet implemented");
        });

    });

    return esp32_lcd_i2c;
};
