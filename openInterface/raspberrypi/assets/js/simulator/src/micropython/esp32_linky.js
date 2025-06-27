// esp32 - esp32_linky module

var $builtinmodule = function () {

    var esp32_linky = {};
    esp32_linky.Linky = new Sk.misceval.buildClass(esp32_linky, function ($gbl, $loc) {
        Linky__init__ = function (self, pin, unit = null) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 3);
            self.pin = pin.v;
            self.unit = unit;
        }
        Linky__init__.co_varnames = ['self', 'pin', 'unit'];
        Linky__init__.$defaults = [];

        $loc.__init__ = new Sk.builtin.func(Linky__init__);


        $loc.get_data = new Sk.builtin.func(function (self, value, unit = null) {
            const power = parseInt(Simulator.getSliderValue('linky_' + self.pin, '_' + value.v));
            return new Sk.builtin.int_(power);
        });
    }, "Linky", []);

    return esp32_linky;
}
