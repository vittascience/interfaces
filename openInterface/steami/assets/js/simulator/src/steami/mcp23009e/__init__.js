// STeaMi - mcp23009e module

const $builtinmodule = function () {

    const mcp23009e = {};

    mcp23009e.__name__ = new Sk.builtin.str("mcp23009e");

    mcp23009e.MCP23009E = new Sk.misceval.buildClass(mcp23009e, function ($gbl, $loc) {

        MCP23009E__init__ = function (self, i2c, address, reset_pin) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 4, 4);
            self.i2c = i2c;
            self.i2c_addr = address;
            self.reset_pin = reset_pin;
        };

        MCP23009E__init__.co_varnames = ['self', 'i2c', 'address', 'reset_pin'];
        MCP23009E__init__.$defaults = [new Sk.builtin.none(), new Sk.builtin.none(), new Sk.builtin.none()];
        $loc.__init__ = new Sk.builtin.func(MCP23009E__init__);

        const setup = function (self, btn_pin, direction, pullup) {
            return new Sk.builtin.none();
        };
        setup.co_varnames = ['self', 'btn_pin', 'direction', 'pullup'];
        setup.$defaults = [new Sk.builtin.none(), new Sk.builtin.none(), new Sk.builtin.none()];
        $loc.setup = new Sk.builtin.func(setup);

        const get_level = function (self, btn_pin) {
            const btn_mapping = {
                7: 'up',
                6: 'left',
                5: 'down',
                4: 'right'
            };
            return new Sk.builtin.bool(!Simulator.getSliderValue(`steami-${btn_mapping[Sk.ffi.remapToJs(btn_pin)]}-button`));
        };
        $loc.get_level = new Sk.builtin.func(get_level);


    }, "MCP23009E", []);

    return mcp23009e;
};
