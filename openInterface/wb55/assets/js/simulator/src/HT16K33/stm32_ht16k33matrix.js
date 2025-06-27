function $builtinmodule(name) {
    const stm32_ht16k33matrix = {};
    var import_modules = Object.create(null);
    return Sk.misceval.chain(
        Sk.importModule("stm32_ht16k33", false, true),
        (stm32_ht16k33_mod) => {
            import_modules.stm32_ht16k33 = stm32_ht16k33_mod.$d;
        },
        () => stm32_ht16k33matrix_mod(stm32_ht16k33matrix, import_modules)
    );
};

function stm32_ht16k33matrix_mod(stm32_ht16k33matrix, import_modules)  {

    var HT16K33Matrix = function ($gbl, $loc) {

        HT16K33Matrix__init__ = function (self, i2c, addr, draw) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 4);
			Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
            self.i2c = i2c;
            self.addr = addr.v;
            self.x = 0;
            self.y = 0;
            self.draw = draw;
            
            let size = 64;
            self.matrix = new Array(size);
            let html = '<div class="led-grid">',
                row = '<div class="led-row">';
            row += '<div class="led"></div>';
            
            for (var led = 0; led < self.matrix.length; led++) {
                if ((led + 1) % 8 == 0) {
                    html += row + "</div>";
                    row = '<div class="led-row">';
                }
                row += '<div class="led"></div>';
            }
            html += "</div>";
            $('#LEDMatrix_value').html(html);
        };

        HT16K33Matrix__init__.co_varnames = ['self', 'i2c', 'addr', 'draw'];
        HT16K33Matrix__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.int_(0), Sk.builtin.none()];

        $loc.__init__ = new Sk.builtin.func(HT16K33Matrix__init__);

        $loc.set_icon = new Sk.builtin.func(function (self,draw) {
            self.draw = draw.v;
            return self;
        });
    }
    stm32_ht16k33matrix.HT16K33Matrix = new Sk.misceval.buildClass(stm32_ht16k33matrix, HT16K33Matrix, "HT16K33Matrix", [import_modules.stm32_ht16k33.HT16K33]);

    return stm32_ht16k33matrix;
};