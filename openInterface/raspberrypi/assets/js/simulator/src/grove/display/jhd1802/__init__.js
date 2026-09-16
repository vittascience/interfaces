// Raspberry Pi / Grove - jhd1802 module for Skulpt
// Compatible import examples:
//   from grove.display.jhd1802 import JHD1802
//   lcd = JHD1802()
//   lcd.setCursor(0, 0)
//   lcd.write('Hello')
//
// Also supports common aliases:
//   lcd.set_cursor(0, 0)
//   lcd.print('Hello')
//   lcd.display(True)
//   lcd.cursor(False)

var $builtinmodule = function (name) {

    var jhd1802 = {};

    jhd1802.__name__ = new Sk.builtin.str("grove.display.jhd1802");

    jhd1802.LCD_I2C_ADDR = new Sk.builtin.int_(0x3e);
    jhd1802.RGB_I2C_ADDR = new Sk.builtin.int_(0x62);

    const LCD_COLUMNS = 16;
    const LCD_ROWS = 2;

    const pyNone = function () {
        return Sk.builtin.none();
    };

    const isNone = function (value) {
        return value === undefined || Sk.builtin.checkNone(value);
    };

    const pyToJs = function (value) {
        return Sk.ffi.remapToJs(value);
    };

    const toInt = function (value, name) {
        Sk.builtin.pyCheckType(name, "integer", Sk.builtin.checkInt(value));
        return value.v;
    };

    const toBool = function (value) {
        if (isNone(value)) return true;
        if (Sk.builtin.checkBool(value)) return value.v;
        if (Sk.builtin.checkInt(value)) return value.v !== 0;
        return !!pyToJs(value);
    };

    const toText = function (value) {
        if (value === undefined) return "";
        if (value instanceof Sk.builtin.str) return value.v;
        return String(pyToJs(value));
    };

    const escapeHtml = function (text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const charToHtml = function (char) {
        if (char === " ") return "&nbsp;";
        return escapeHtml(char);
    };

    const clamp = function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    };

    const updateSubtitle = function (self) {
        const lcd = $("#lcdGrove");
        if (lcd.length) {
            lcd.find(".subtitle-module").html("I2C (0x" + self.addr.toString(16) + ")");
        }
    };

    const render = function (self) {
        const target = $("#lcdGrove_value");
        if (!target.length) return;

        if (!self.displayEnabled) {
            target.html("&nbsp;".repeat(LCD_COLUMNS) + "<br/>" + "&nbsp;".repeat(LCD_COLUMNS));
            return;
        }

        const line0 = self.lines[0].map(charToHtml).join("");
        const line1 = self.lines[1].map(charToHtml).join("");
        target.html(line0 + "<br/>" + line1);
    };

    const resetLines = function (self) {
        self.lines = [];
        for (let y = 0; y < LCD_ROWS; y++) {
            self.lines[y] = Array(LCD_COLUMNS).fill(" ");
        }
    };

    const setCursorPosition = function (self, row, col) {
        self.y = clamp(row, 0, LCD_ROWS - 1);
        self.x = clamp(col, 0, LCD_COLUMNS - 1);
    };

    const putChar = function (self, char) {
        if (char === "\r") return;

        if (char === "\n") {
            self.y = clamp(self.y + 1, 0, LCD_ROWS - 1);
            self.x = 0;
            return;
        }

        if (self.y < 0 || self.y >= LCD_ROWS) return;
        if (self.x < 0 || self.x >= LCD_COLUMNS) return;

        self.lines[self.y][self.x] = char;
        self.x++;

        if (self.x >= LCD_COLUMNS) {
            self.x = LCD_COLUMNS - 1;
        }
    };

    const writeText = function (self, text) {
        text = String(text);
        for (let i = 0; i < text.length; i++) {
            putChar(self, text[i]);
        }
        render(self);
    };

    const clearDisplay = function (self) {
        resetLines(self);
        self.x = 0;
        self.y = 0;
        render(self);
    };

    const JHD1802Class = function ($gbl, $loc) {

        const JHD1802__init__ = function (self, i2c, addr) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);

            self.i2c = isNone(i2c) ? null : i2c;
            self.addr = isNone(addr) ? jhd1802.LCD_I2C_ADDR.v : toInt(addr, "addr");

            self.x = 0;
            self.y = 0;
            self.displayEnabled = true;
            self.cursorEnabled = false;
            self.blinkEnabled = false;
            self.backlight = true;
            self.textDirection = "left_to_right";

            resetLines(self);
            updateSubtitle(self);
            render(self);

            return pyNone();
        };

        JHD1802__init__.co_varnames = ["self", "i2c", "addr"];
        JHD1802__init__.$defaults = [Sk.builtin.none(), jhd1802.LCD_I2C_ADDR];
        $loc.__init__ = new Sk.builtin.func(JHD1802__init__);

        const write = function (self, text) {
            Sk.builtin.pyCheckArgsLen("write", arguments.length, 2, 2);
            writeText(self, toText(text));
            return pyNone();
        };
        write.co_varnames = ["self", "text"];
        $loc.write = new Sk.builtin.func(write);

        $loc.print = new Sk.builtin.func(write);

        const write_char = function (self, char) {
            Sk.builtin.pyCheckArgsLen("write_char", arguments.length, 2, 2);
            const text = toText(char);
            if (text.length > 0) {
                writeText(self, text[0]);
            }
            return pyNone();
        };
        write_char.co_varnames = ["self", "char"];
        $loc.write_char = new Sk.builtin.func(write_char);

        const setCursor = function (self, row, col) {
            Sk.builtin.pyCheckArgsLen("setCursor", arguments.length, 3, 3);
            setCursorPosition(self, toInt(row, "row"), toInt(col, "col"));
            return pyNone();
        };
        setCursor.co_varnames = ["self", "row", "col"];
        $loc.setCursor = new Sk.builtin.func(setCursor);
        $loc.set_cursor = new Sk.builtin.func(setCursor);

        const home = function (self) {
            Sk.builtin.pyCheckArgsLen("home", arguments.length, 1, 1);
            setCursorPosition(self, 0, 0);
            return pyNone();
        };
        home.co_varnames = ["self"];
        $loc.home = new Sk.builtin.func(home);

        const clear = function (self) {
            Sk.builtin.pyCheckArgsLen("clear", arguments.length, 1, 1);
            clearDisplay(self);
            return pyNone();
        };
        clear.co_varnames = ["self"];
        $loc.clear = new Sk.builtin.func(clear);

        const display = function (self, state) {
            Sk.builtin.pyCheckArgsLen("display", arguments.length, 1, 2);
            self.displayEnabled = toBool(state);
            render(self);
            return pyNone();
        };
        display.co_varnames = ["self", "state"];
        display.$defaults = [new Sk.builtin.bool(true)];
        $loc.display = new Sk.builtin.func(display);

        const no_display = function (self) {
            Sk.builtin.pyCheckArgsLen("no_display", arguments.length, 1, 1);
            self.displayEnabled = false;
            render(self);
            return pyNone();
        };
        no_display.co_varnames = ["self"];
        $loc.no_display = new Sk.builtin.func(no_display);

        const cursor = function (self, state) {
            Sk.builtin.pyCheckArgsLen("cursor", arguments.length, 1, 2);
            self.cursorEnabled = toBool(state);
            return pyNone();
        };
        cursor.co_varnames = ["self", "state"];
        cursor.$defaults = [new Sk.builtin.bool(true)];
        $loc.cursor = new Sk.builtin.func(cursor);

        const no_cursor = function (self) {
            Sk.builtin.pyCheckArgsLen("no_cursor", arguments.length, 1, 1);
            self.cursorEnabled = false;
            return pyNone();
        };
        no_cursor.co_varnames = ["self"];
        $loc.no_cursor = new Sk.builtin.func(no_cursor);

        const blink = function (self, state) {
            Sk.builtin.pyCheckArgsLen("blink", arguments.length, 1, 2);
            self.blinkEnabled = toBool(state);
            return pyNone();
        };
        blink.co_varnames = ["self", "state"];
        blink.$defaults = [new Sk.builtin.bool(true)];
        $loc.blink = new Sk.builtin.func(blink);

        const no_blink = function (self) {
            Sk.builtin.pyCheckArgsLen("no_blink", arguments.length, 1, 1);
            self.blinkEnabled = false;
            return pyNone();
        };
        no_blink.co_varnames = ["self"];
        $loc.no_blink = new Sk.builtin.func(no_blink);

        const scrollDisplayLeft = function (self) {
            Sk.builtin.pyCheckArgsLen("scrollDisplayLeft", arguments.length, 1, 1);
            for (let y = 0; y < LCD_ROWS; y++) {
                self.lines[y].shift();
                self.lines[y].push(" ");
            }
            render(self);
            return pyNone();
        };
        scrollDisplayLeft.co_varnames = ["self"];
        $loc.scrollDisplayLeft = new Sk.builtin.func(scrollDisplayLeft);
        $loc.scroll_display_left = new Sk.builtin.func(scrollDisplayLeft);

        const scrollDisplayRight = function (self) {
            Sk.builtin.pyCheckArgsLen("scrollDisplayRight", arguments.length, 1, 1);
            for (let y = 0; y < LCD_ROWS; y++) {
                self.lines[y].pop();
                self.lines[y].unshift(" ");
            }
            render(self);
            return pyNone();
        };
        scrollDisplayRight.co_varnames = ["self"];
        $loc.scrollDisplayRight = new Sk.builtin.func(scrollDisplayRight);
        $loc.scroll_display_right = new Sk.builtin.func(scrollDisplayRight);

        const leftToRight = function (self) {
            Sk.builtin.pyCheckArgsLen("leftToRight", arguments.length, 1, 1);
            self.textDirection = "left_to_right";
            return pyNone();
        };
        leftToRight.co_varnames = ["self"];
        $loc.leftToRight = new Sk.builtin.func(leftToRight);
        $loc.left_to_right = new Sk.builtin.func(leftToRight);

        const rightToLeft = function (self) {
            Sk.builtin.pyCheckArgsLen("rightToLeft", arguments.length, 1, 1);
            self.textDirection = "right_to_left";
            return pyNone();
        };
        rightToLeft.co_varnames = ["self"];
        $loc.rightToLeft = new Sk.builtin.func(rightToLeft);
        $loc.right_to_left = new Sk.builtin.func(rightToLeft);

        const autoscroll = function (self) {
            Sk.builtin.pyCheckArgsLen("autoscroll", arguments.length, 1, 1);
            self.autoscrollEnabled = true;
            return pyNone();
        };
        autoscroll.co_varnames = ["self"];
        $loc.autoscroll = new Sk.builtin.func(autoscroll);

        const noAutoscroll = function (self) {
            Sk.builtin.pyCheckArgsLen("noAutoscroll", arguments.length, 1, 1);
            self.autoscrollEnabled = false;
            return pyNone();
        };
        noAutoscroll.co_varnames = ["self"];
        $loc.noAutoscroll = new Sk.builtin.func(noAutoscroll);
        $loc.no_autoscroll = new Sk.builtin.func(noAutoscroll);

        const setColor = function (self, r, g, b) {
            Sk.builtin.pyCheckArgsLen("setColor", arguments.length, 4, 4);
            self.color = {
                r: clamp(toInt(r, "r"), 0, 255),
                g: clamp(toInt(g, "g"), 0, 255),
                b: clamp(toInt(b, "b"), 0, 255)
            };

            const module = $("#lcdGrove");
            if (module.length) {
                module.find(".module-body, .module-value").css("background-color", "rgb(" + self.color.r + "," + self.color.g + "," + self.color.b + ")");
            }

            return pyNone();
        };
        setColor.co_varnames = ["self", "r", "g", "b"];
        $loc.setColor = new Sk.builtin.func(setColor);
        $loc.set_color = new Sk.builtin.func(setColor);

        const command = function (self, value) {
            Sk.builtin.pyCheckArgsLen("_command", arguments.length, 2, 2);
            self.lastCommand = toInt(value, "value");
            return pyNone();
        };
        command.co_varnames = ["self", "value"];
        $loc._command = new Sk.builtin.func(command);

        const writeLowLevel = function (self, value) {
            Sk.builtin.pyCheckArgsLen("_write", arguments.length, 2, 2);
            self.lastWrite = toInt(value, "value");
            return pyNone();
        };
        writeLowLevel.co_varnames = ["self", "value"];
        $loc._write = new Sk.builtin.func(writeLowLevel);

        $loc.__str__ = new Sk.builtin.func(function (self) {
            return new Sk.builtin.str("JHD1802(addr=0x" + self.addr.toString(16) + ")");
        });
    };

    jhd1802.JHD1802 = new Sk.misceval.buildClass(jhd1802, JHD1802Class, "JHD1802", []);

    return jhd1802;
};