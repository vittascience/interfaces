// Esp32 - esp32_rotary module

var $builtinmodule = function () {

    var esp32_rotary = {};

    esp32_rotary.RotaryIRQ = new Sk.misceval.buildClass(esp32_rotary, function ($gbl, $loc) {
        $loc.RANGE_WRAP = new Sk.builtin.int_(0);

        RotaryIRQ__init__ = function (self, pin_num_clk, pin_num_dt, min_val, max_val, reverse, range_mode) {

            self.pin_num_clk = pin_num_clk;
            self.pin_num_dt = pin_num_dt;
            self.min_val = min_val;
            self.max_val = max_val;
            self.reverse = reverse;
            self.range_mode = range_mode;
        };

        RotaryIRQ__init__.co_varnames = ['self', 'pin_num_clk', 'pin_num_dt', 'min_val', 'max_val', 'reverse', 'range_mode'];
        RotaryIRQ__init__.$defaults = [0, 0, 0, 0, false, 0, 0];

        $loc.__init__ = new Sk.builtin.func(RotaryIRQ__init__);

        $loc.value = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_($('.mod_rotaryEncoder').slider('option', 'value'));
        });
    }, "RotaryIRQ", []);

    return esp32_rotary;
};