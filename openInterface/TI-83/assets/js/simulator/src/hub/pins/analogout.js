// Innovator Hub - analogout module

var $builtinmodule = function (name) {
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('analogout');
	
	mod.analog_out = new Sk.misceval.buildClass(mod, function($gbl, $loc) {

		var js__init__ = function (self, pin) {
			if (pin !== undefined) {
				if (Sk.builtin.checkString(pin)) {
                    self.pin = pin.v;
                    const pins = Blockly.Constants.Pins.HUB_ANALOG_OUTPUTS;
                    const pinArray = pins[Object.keys(pins).find(key => pins[key][1] === self.pin)];
                    if (pinArray) {
                        self.pinName = pin.v.replace(" ", '').toLowerCase();
                    } else {
                        Simulator.Mosaic.specific.ti.blinkRedLed();
                    }
				} else {
					Simulator.Mosaic.specific.ti.blinkRedLed();
				} 
			} else {
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'pin' à la fonction analog_out()", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
		};

		js__init__.co_varnames = ['self', 'pin'];
		js__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none()];
		js__init__.co_numargs = 2;

		$loc.__init__ = new Sk.builtin.func(js__init__);

		$loc.on = new Sk.builtin.func(function (self) {
			$("#write-analog_" + self.pinName + "_value").html("255");
            $("#write-analog_" + self.pinName + "_anim").css('opacity', 1);
			return Sk.builtin.none();
		});

        $loc.off = new Sk.builtin.func(function (self) {
			$("#write-analog_" + self.pinName + "_value").html("0");
            $("#write-analog_" + self.pinName + "_anim").css('opacity', 1);
			return Sk.builtin.none();
		});

        $loc.set = new Sk.builtin.func(function (self, value) {
            if (value !== undefined) {
                if (Sk.builtin.checkNumber(value)) {
                    $("#write-analog_" + self.pinName + "_value").html(Math.round(value.v));
                    $("#write-analog_" + self.pinName + "_anim").css('opacity', value.v / 255);
                } else if (Sk.builtin.checkString(value)) {
					Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction set() sur " + self.pin, "can't convert 'int' object to str implicity", 'TypeError');
				}
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'value' à la fonction set() sur " + self.pin, "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
			return Sk.builtin.none();
		});

	}, 'analog_out', []);

	return mod;
};