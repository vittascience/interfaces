// BBC micro:bit - lcd_i2c module

var $builtinmodule = function () {

    var lcd_i2c = {};

    lcd_i2c.LCD1602 = new Sk.misceval.buildClass(lcd_i2c, function ($gbl, $loc) {

        $loc.__init__ = new Sk.builtin.func(function (self) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 1);
            $("#lcdGrove").find(".subtitle-module").html('I2C (0x3e)');
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
                for (var i = self.x; i < self.x + text.length ; i++) {
                    self[line][i] = text[i-self.x];
                }
            };
        });

        $loc.writeTxt = new Sk.builtin.func(function (self, text) {
            text = text.v.substr(0, 16-self.x);
            if (self.y == 0) {
                self.fillLine('l0', text);
            } else {
                self.fillLine('l1', text);
            }
            self.printText();
        });

        $loc.write_char = new Sk.builtin.func(function (self, char) {
            throw new Sk.builtin.NotImplementedError("write_char() from lcd_i2c is not yet implemented");
        });

        $loc.setCursor = new Sk.builtin.func(function (self, x, y) {
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

    });

    return lcd_i2c;
};
