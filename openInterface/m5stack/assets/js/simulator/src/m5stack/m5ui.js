// M5Stack - m5ui module

var $builtinmodule = function (name) {

    var m5ui = {};

    m5ui.__name__ = new Sk.builtin.str('m5ui');

    m5ui.setScreenColor = new Sk.builtin.func(function (color) {
        Simulator.Mosaic.specific.m5ui.backgroundColor = color.v;
        Simulator.Mosaic.specific.m5ui.update();
        return Sk.builtin.none();
    });

    const show = function (self) {
        self.state = true;
        Simulator.Mosaic.specific.m5ui.update();
        return Sk.builtin.none();
    };

    const hide = function (self) {
        self.state = false;
        Simulator.Mosaic.specific.m5ui.update();
        return Sk.builtin.none();
    };

    m5ui.M5Title = new Sk.misceval.buildClass(m5ui, function ($gbl, $loc) {

        M5Title__init__ = function (self, title, fgcolor, bgcolor, x) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 4, 5);
            Sk.builtin.pyCheckType("title", "string", Sk.builtin.checkString(title));
            Sk.builtin.pyCheckType("fgcolor", "integer", Sk.builtin.checkInt(fgcolor));
            Sk.builtin.pyCheckType("bgcolor", "integer", Sk.builtin.checkInt(bgcolor));
            Sk.builtin.pyCheckType("x", "integer", Sk.builtin.checkInt(x));
            self.type = 'M5Title';
            self.title = title.v;
            self.fgcolor = fgcolor.v;
            self.bgcolor = bgcolor.v;
            self.x = x.v;
            self.state = true;
            for (var i = 0; i < Simulator.Mosaic.specific.m5ui.screenObjects.length; i++) {
                if (Simulator.Mosaic.specific.m5ui.screenObjects[i].type === 'M5Title') {
                    Simulator.Mosaic.specific.m5ui.screenObjects[i].state = false;
                }
            }
            Simulator.Mosaic.specific.m5ui.screenObjects.push(self);
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        };

        M5Title__init__.co_varnames = ['self', 'title', 'fgcolor', 'bgcolor', 'x'];
        M5Title__init__.$defaults = [new Sk.builtin.int_(5)];

        $loc.__init__ = new Sk.builtin.func(M5Title__init__);

        $loc.setBgColor = new Sk.builtin.func(function (self, bgcolor) {
            Sk.builtin.pyCheckArgsLen("setBgColor", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("bgcolor", "integer", Sk.builtin.checkInt(bgcolor));
            self.bgcolor = bgcolor.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.setFgColor = new Sk.builtin.func(function (self, fgcolor) {
            Sk.builtin.pyCheckArgsLen("setFgColor", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("fgcolor", "integer", Sk.builtin.checkInt(fgcolor));
            self.fgcolor = fgcolor.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.setTitle = new Sk.builtin.func(function (self, title) {
            Sk.builtin.pyCheckArgsLen("setTitle", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("title", "string", Sk.builtin.checkString(title));
            self.title = title.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.show = new Sk.builtin.func(show);
        $loc.hide = new Sk.builtin.func(hide);

    }, "M5Title", []);

    m5ui.M5TextBox = new Sk.misceval.buildClass(m5ui, function ($gbl, $loc) {

        M5TextBox__init__ = function (self, x, y, text, font, color, rotate) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 4, 7);
            Sk.builtin.pyCheckType("x", "integer", Sk.builtin.checkInt(x));
            Sk.builtin.pyCheckType("y", "integer", Sk.builtin.checkInt(y));
            Sk.builtin.pyCheckType("text", "string", Sk.builtin.checkString(text));
            Sk.builtin.pyCheckType("font", "integer", Sk.builtin.checkInt(font));
            Sk.builtin.pyCheckType("color", "integer", Sk.builtin.checkInt(color));
            Sk.builtin.pyCheckType("rotate", "integer", Sk.builtin.checkInt(rotate));
            self.type = 'M5TextBox';
            self.x = x.v;
            self.y = y.v;
            self.text = text.v;
            self.font = font.v;
            self.color = color.v;
            self.rotate = rotate.v;
            self.state = true;
            Simulator.Mosaic.specific.m5ui.screenObjects.push(self);
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        };

        M5TextBox__init__.co_varnames = ['self', 'x', 'y', 'text', 'font', 'color', 'rotate'];
        M5TextBox__init__.$defaults = [new Sk.builtin.int_(0), new Sk.builtin.int_(0xffffff), new Sk.builtin.int_(0)];

        $loc.__init__ = new Sk.builtin.func(M5TextBox__init__);

        $loc.setColor = new Sk.builtin.func(function (self, color) {
            Sk.builtin.pyCheckArgsLen("setColor", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("color", "integer", Sk.builtin.checkInt(color));
            self.color = color.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.setPosition = new Sk.builtin.func(function (self, x, y) {
            Sk.builtin.pyCheckArgsLen("setPosition", arguments.length, 3, 3);
            Sk.builtin.pyCheckType("x", "integer", Sk.builtin.checkInt(x));
            Sk.builtin.pyCheckType("y", "integer", Sk.builtin.checkInt(y));
            self.x = x.v;
            self.y = y.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.setFont = new Sk.builtin.func(function (self, font) {
            Sk.builtin.pyCheckArgsLen("setFont", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("font", "integer", Sk.builtin.checkInt(font));
            self.font = font.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });
        
        $loc.setRotate = new Sk.builtin.func(function (self, rotate) {
            Sk.builtin.pyCheckArgsLen("setRotate", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("rotate", "integer", Sk.builtin.checkInt(rotate));
            self.rotate = rotate.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.setText = new Sk.builtin.func(function (self, text) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("text", "string", Sk.builtin.checkString(text));
            self.text = text.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.show = new Sk.builtin.func(show);
        $loc.hide = new Sk.builtin.func(hide);

    }, "M5TextBox", []);

    const setBgColor = function (self, fillcolor) {
        Sk.builtin.pyCheckArgsLen("setBgColor", arguments.length, 2, 2);
        Sk.builtin.pyCheckType("fillcolor", "integer", Sk.builtin.checkInt(fillcolor));
        self.fillcolor = fillcolor.v;
        Simulator.Mosaic.specific.m5ui.update();
        return Sk.builtin.none();
    };

    const setBorderColor = function (self, bordercolor) {
        Sk.builtin.pyCheckArgsLen("setBorderColor", arguments.length, 2, 2);
        Sk.builtin.pyCheckType("bordercolor", "integer", Sk.builtin.checkInt(bordercolor));
        self.bordercolor = bordercolor.v;
        Simulator.Mosaic.specific.m5ui.update();
        return Sk.builtin.none();
    };

    m5ui.M5Rect = new Sk.misceval.buildClass(m5ui, function ($gbl, $loc) {

        M5Rect__init__ = function (self, x, y, width, height, fillcolor, bordercolor) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 6, 7);
            Sk.builtin.pyCheckType("x", "integer", Sk.builtin.checkInt(x));
            Sk.builtin.pyCheckType("y", "integer", Sk.builtin.checkInt(y));
            Sk.builtin.pyCheckType("width", "integer", Sk.builtin.checkInt(width));
            Sk.builtin.pyCheckType("height", "integer", Sk.builtin.checkInt(height));
            Sk.builtin.pyCheckType("fillcolor", "integer", Sk.builtin.checkInt(fillcolor));
            if (Sk.builtin.checkNone(bordercolor)) {
                bordercolor = fillcolor;
            }
            self.type = 'M5Rect';
            self.x = x.v;
            self.y = y.v;
            self.width = width.v;
            self.height = height.v;
            self.fillcolor = fillcolor.v;
            self.bordercolor = bordercolor.v;
            self.state = true;
            Simulator.Mosaic.specific.m5ui.screenObjects.push(self);
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        };

        M5Rect__init__.co_varnames = ['self', 'x', 'y', 'width', 'height', 'fillcolor', 'bordercolor'];
        M5Rect__init__.$defaults = [new Sk.builtin.none()];

        $loc.__init__ = new Sk.builtin.func(M5Rect__init__);

        $loc.setSize = new Sk.builtin.func(function (self, width, height) {
            Sk.builtin.pyCheckArgsLen("setSize", arguments.length, 3, 3);
            Sk.builtin.pyCheckType("width", "integer", Sk.builtin.checkInt(width));
            Sk.builtin.pyCheckType("height", "integer", Sk.builtin.checkInt(height));
            self.width = width.v;
            self.height = height.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.setBgColor = new Sk.builtin.func(setBgColor);
        $loc.setBorderColor = new Sk.builtin.func(setBorderColor);

        $loc.setPosition = new Sk.builtin.func(function (self, x, y) {
            Sk.builtin.pyCheckArgsLen("setPosition", arguments.length, 3, 3);
            Sk.builtin.pyCheckType("x", "integer", Sk.builtin.checkInt(x));
            Sk.builtin.pyCheckType("y", "integer", Sk.builtin.checkInt(y));
            self.x = x.v;
            self.y = y.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.show = new Sk.builtin.func(show);
        $loc.hide = new Sk.builtin.func(hide);

    }, "M5Rect", []);

    m5ui.M5Circle = new Sk.misceval.buildClass(m5ui, function ($gbl, $loc) {

        M5Circle__init__ = function (self, x, y, radius, fillcolor, bordercolor) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 5, 6);
            Sk.builtin.pyCheckType("x", "integer", Sk.builtin.checkInt(x));
            Sk.builtin.pyCheckType("y", "integer", Sk.builtin.checkInt(y));
            Sk.builtin.pyCheckType("radius", "integer", Sk.builtin.checkInt(radius));
            Sk.builtin.pyCheckType("fillcolor", "integer", Sk.builtin.checkInt(fillcolor));
            if (Sk.builtin.checkNone(bordercolor)) {
                bordercolor = fillcolor;
            }
            self.type = 'M5Circle';
            self.x = x.v;
            self.y = y.v;
            self.radius = radius.v;
            self.fillcolor = fillcolor.v;
            self.bordercolor = bordercolor.v;
            self.state = true;
            Simulator.Mosaic.specific.m5ui.screenObjects.push(self);
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        };

        M5Circle__init__.co_varnames = ['self', 'x', 'y', 'radius', 'fillcolor', 'bordercolor'];
        M5Circle__init__.$defaults = [new Sk.builtin.none()];

        $loc.__init__ = new Sk.builtin.func(M5Circle__init__);

        $loc.setSize = new Sk.builtin.func(function (self, radius) {
            Sk.builtin.pyCheckArgsLen("setSize", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("radius", "integer", Sk.builtin.checkInt(radius));
            self.radius = radius.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.setBgColor = new Sk.builtin.func(setBgColor);
        $loc.setBorderColor = new Sk.builtin.func(setBorderColor);

        $loc.setPosition = new Sk.builtin.func(function (self, x, y) {
            Sk.builtin.pyCheckArgsLen("setPosition", arguments.length, 3, 3);
            Sk.builtin.pyCheckType("x", "integer", Sk.builtin.checkInt(x));
            Sk.builtin.pyCheckType("y", "integer", Sk.builtin.checkInt(y));
            self.x = x.v;
            self.y = y.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.show = new Sk.builtin.func(show);
        $loc.hide = new Sk.builtin.func(hide);

    }, "M5Circle", []);

    m5ui.M5Triangle = new Sk.misceval.buildClass(m5ui, function ($gbl, $loc) {

        M5Triangle__init__ = function (self, x1, y1, x2, y2, x3, y3, fillcolor, bordercolor) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 8, 9);
            Sk.builtin.pyCheckType("x1", "integer", Sk.builtin.checkInt(x1));
            Sk.builtin.pyCheckType("y1", "integer", Sk.builtin.checkInt(y1));
            Sk.builtin.pyCheckType("x2", "integer", Sk.builtin.checkInt(x2));
            Sk.builtin.pyCheckType("y2", "integer", Sk.builtin.checkInt(y2));
            Sk.builtin.pyCheckType("x3", "integer", Sk.builtin.checkInt(x3));
            Sk.builtin.pyCheckType("y3", "integer", Sk.builtin.checkInt(y3));
            Sk.builtin.pyCheckType("fillcolor", "integer", Sk.builtin.checkInt(fillcolor));
            if (Sk.builtin.checkNone(bordercolor)) {
                bordercolor = fillcolor;
            }
            self.type = 'M5Triangle';
            self.x1 = x1.v;
            self.y1 = y1.v;
            self.x2 = x2.v;
            self.y2 = y2.v;
            self.x3 = x3.v;
            self.y3 = y3.v;
            self.fillcolor = fillcolor.v;
            self.bordercolor = bordercolor.v;
            self.state = true;
            Simulator.Mosaic.specific.m5ui.screenObjects.push(self);
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        };

        M5Triangle__init__.co_varnames = ['self', 'x1', 'y1', 'x2', 'y2', 'x3', 'y3', 'fillcolor', 'bordercolor'];
        M5Triangle__init__.$defaults = [new Sk.builtin.none()];

        $loc.__init__ = new Sk.builtin.func(M5Triangle__init__);

        $loc.setSize = new Sk.builtin.func(function (self, x1, y1, x2, y2, x3, y3) {
            Sk.builtin.pyCheckArgsLen("setSize", arguments.length, 7, 7);
            Sk.builtin.pyCheckType("x1", "integer", Sk.builtin.checkInt(x1));
            Sk.builtin.pyCheckType("y1", "integer", Sk.builtin.checkInt(y1));
            Sk.builtin.pyCheckType("x2", "integer", Sk.builtin.checkInt(x2));
            Sk.builtin.pyCheckType("y2", "integer", Sk.builtin.checkInt(y2));
            Sk.builtin.pyCheckType("x3", "integer", Sk.builtin.checkInt(x3));
            Sk.builtin.pyCheckType("y3", "integer", Sk.builtin.checkInt(y3));
            self.x1 = x1.v;
            self.y1 = y1.v;
            self.x2 = x2.v;
            self.y2 = y2.v;
            self.x3 = x3.v;
            self.y3 = y3.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.setBgColor = new Sk.builtin.func(setBgColor);
        $loc.setBorderColor = new Sk.builtin.func(setBorderColor);

        $loc.show = new Sk.builtin.func(show);
        $loc.hide = new Sk.builtin.func(hide);

    }, "M5Triangle", []);

    m5ui.M5Line = new Sk.misceval.buildClass(m5ui, function ($gbl, $loc) {

        $loc.VLINE = new Sk.builtin.int_(1);
        $loc.HLINE = new Sk.builtin.int_(2);
        $loc.PLINE = new Sk.builtin.int_(3);

        M5Line__init__ = function (self, type, x1, y1, x2, y2, fillcolor) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 7, 7);
            Sk.builtin.pyCheckType("type", "integer", Sk.builtin.checkInt(type));
            Sk.builtin.pyCheckType("x1", "integer", Sk.builtin.checkInt(x1));
            Sk.builtin.pyCheckType("y1", "integer", Sk.builtin.checkInt(y1));
            Sk.builtin.pyCheckType("x2", "integer", Sk.builtin.checkInt(x2));
            Sk.builtin.pyCheckType("y2", "integer", Sk.builtin.checkInt(y2));
            Sk.builtin.pyCheckType("fillcolor", "integer", Sk.builtin.checkInt(fillcolor));
            self.type = 'M5Line';
            self.x1 = x1.v;
            self.y1 = y1.v;
            self.x2 = x2.v;
            self.y2 = y2.v;
            self.fillcolor = fillcolor.v;
            self.state = true;
            Simulator.Mosaic.specific.m5ui.screenObjects.push(self);
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        };

        M5Line__init__.co_varnames = ['self', 'type', 'x1', 'y1', 'x2', 'y2', 'fillcolor'];
        M5Line__init__.$defaults = [];

        $loc.__init__ = new Sk.builtin.func(M5Line__init__);

        $loc.setSize = new Sk.builtin.func(function (self, x1, y1, x2, y2) {
            Sk.builtin.pyCheckArgsLen("setSize", arguments.length, 5, 5);
            Sk.builtin.pyCheckType("x1", "integer", Sk.builtin.checkInt(x1));
            Sk.builtin.pyCheckType("y1", "integer", Sk.builtin.checkInt(y1));
            Sk.builtin.pyCheckType("x2", "integer", Sk.builtin.checkInt(x2));
            Sk.builtin.pyCheckType("y2", "integer", Sk.builtin.checkInt(y2));
            self.x1 = x1.v;
            self.y1 = y1.v;
            self.x2 = x2.v;
            self.y2 = y2.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.setColor = new Sk.builtin.func(function (self, fillcolor) {
            Sk.builtin.pyCheckArgsLen("setColor", arguments.length, 2, 2);
            Sk.builtin.pyCheckType("fillcolor", "integer", Sk.builtin.checkInt(fillcolor));
            self.fillcolor = fillcolor.v;
            Simulator.Mosaic.specific.m5ui.update();
            return Sk.builtin.none();
        });

        $loc.show = new Sk.builtin.func(show);
        $loc.hide = new Sk.builtin.func(hide);

    }, "M5Line", []);

    return m5ui;
};