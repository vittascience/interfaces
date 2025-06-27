var $builtinmodule = function () {

    var ht16k33 = {};

    var HT16K33 = function ($gbl, $loc) {

        $loc.draw = new Sk.builtin.func(function (self) {
            let icon = self.draw,
                binary_icon = [],
                led_rows = $('#LEDMatrix_value .led-grid .led-row');
            for (var i = 0; i < icon.length; i++) {
                let binary = icon[i].toString(2),
                    length = binary.length;
                binary_icon.push(((length < 8) ? '0'.repeat(8 - length) : '') + binary);
            }
            for (var i = 0; i < binary_icon.length; i++) {
                for (var j = 0; j < binary_icon[i].length; j++) {
                    let row = $(led_rows[i]).children();
                    if (binary_icon[i][j] == 1)
                        $(row[j]).css('background-color', '#e63737');
                    else
                        $(row[j]).css('background-color', '#f5f5f5');
                }
            }
        });

        $loc.clear = new Sk.builtin.func(function (self) {
            const led_rows = $('#LEDMatrix_value .led-grid .led-row');
            for (let i = 0; i < led_rows.length; i++) {
                let row = $(led_rows[i]).children();
                for (let j = 0; j < row.length; j++)
                    $(row[j]).css('background-color', '#f5f5f5');
            }
        });
    };

    ht16k33.HT16K33 = new Sk.misceval.buildClass(ht16k33, HT16K33, "ht16k33", []);

    return ht16k33;
};