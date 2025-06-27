// ESP32 - esp32_tm1637 module

var $builtinmodule = function (name) {

    var esp32_tm1637 = {};

    esp32_tm1637.__name__ = new Sk.builtin.str('esp32_tm1637');

    const displayDigits = function (self) {
        let str = '';
        for (var i = 0; i < 4; i++) {
            str += self.display[i];
            if (i == 1 && self.points) str += ':';
        }
        const mod = Simulator.getModuleByKey('tm1637');
        Simulator.setAnimator(mod, mod.id + '_' + self.clk, str);
    };

    esp32_tm1637.TM1637 = new Sk.misceval.buildClass(esp32_tm1637, function ($gbl, $loc) {

        TM1637__init__ = function (self, clk, dio, bright) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 4);
            Sk.builtin.pyCheckType("bright", "integer or float", Sk.builtin.checkNumber(bright));
            self.display = ['0', '0', '0', '0'];
            self.points = false;
            self.clk = clk.pin;
            self.dio = dio.pin;
            $("#write-digital_" + self.dio).hide();
            const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
            $("#tm1637_" + self.clk).find(".subtitle-module").html(pins.find(p => p[1] == 'p' + self.clk)[0] + ' / ' + pins.find(p => p[1] == 'p' + self.dio)[0]);
        };

        TM1637__init__.co_varnames = ['self', 'clk', 'dio', 'bright'];
        TM1637__init__.$defaults = [new Sk.builtin.float_(7)];

        $loc.__init__ = new Sk.builtin.func(TM1637__init__);

        $loc.number = new Sk.builtin.func(function (self, number) {
            self.points = false;
            let n = number.v
            if (n > 9999) {
                n = 9999;
                UIManager.showErrorMessage("error-message", 'Le nombre à afficher est supérieur à 9999.');
            }
            if (n < -999) {
                UIManager.showErrorMessage("error-message", 'Le nombre à afficher est inférieur à -999.');
                n = -999;
            }
            if (n < 9999 & n > -999) {
                UIManager.resetMessage("error-message");
            }
            const mil = Math.trunc(n / 1000);
            const cent = Math.trunc((n - mil * 1000) / 100);
            const dix = Math.trunc((n - mil * 1000 - cent * 100) / 10);
            const unite = Math.trunc(n - mil * 1000 - cent * 100 - dix * 10);
            self.display[0] = String(mil);
            self.display[1] = String(cent);
            self.display[2] = String(dix);
            self.display[3] = String(unite);
            if (n < 999) {
                self.display[0] = '0';
                if (n < 99) {
                    self.display[1] = '0';
                    if (n < 9) {
                        self.display[2] = '0';
                    }
                }
            }
            displayDigits(self);
        });

        $loc.temperature = new Sk.builtin.func(function (self, temp) {
            self.points = false;
            let t = temp.v
            if (t > 99) {
                UIManager.showErrorMessage("error-message", 'La température à afficher est supérieure à 99°C.');
                t = 99;
            }
            if (t < -9) {
                UIManager.showErrorMessage("error-message", 'La température à afficher est inférieure à -9°C.');
                t = -9;
            }
            if (t < 99 & t > -9) {
                UIManager.resetMessage("error-message");
            }
            if (t < 0) {
                self.display[0] = "-";
            } else {
                self.display[0] = String(Math.trunc(Math.abs(t) / 10));
            }
            self.display[1] = String(Math.abs(t) - Math.trunc(Math.abs(t) / 10) * 10);
            self.display[2] = '°';
            self.display[3] = 'C';
            displayDigits(self);
        });

        $loc.clock = new Sk.builtin.func(function (self, time) {
            const t = time.v;
            self.points = true;
            self.display[0] = String(Math.trunc(t[0].v / 10));
            self.display[1] = String(t[0].v - Math.trunc(t[0].v / 10) * 10);
            self.display[2] = String(Math.trunc(t[1].v / 10));
            self.display[3] = String(t[1].v - Math.trunc(t[1].v / 10) * 10);
            displayDigits(self);
        });

    }, 'TM1637', []);

    return esp32_tm1637;
};