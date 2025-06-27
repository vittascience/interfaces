// Innovator Hub - digital module

var $builtinmodule = function (name) {
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('digital');
	
	mod.digital = new Sk.misceval.buildClass(mod, function($gbl, $loc) {

		var js__init__ = function (self, pin) {
			if (pin !== undefined) {
				if (Sk.builtin.checkString(pin)) {
                    self.pin = pin.v;
                    const pins = Blockly.Constants.Pins.HUB_DIGITAL_INPUTS.concat(Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS);
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
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'pin' à la fonction squarewave()", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
		};

		js__init__.co_varnames = ['self', 'pin'];
		js__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none()];
		js__init__.co_numargs = 2;

		$loc.__init__ = new Sk.builtin.func(js__init__);

        $loc.measurement = new Sk.builtin.func(function (self) {
			const textState = $("#read-digital_" + self.pinName + "_value").html();
            self.measure = (textState == "ON" || textState == "1") ? 1 : 0;
			return new Sk.builtin.int_(self.measure);
		});

        $loc.set = new Sk.builtin.func(function (self, value) {
            if (value !== undefined) {
                if (Sk.builtin.checkInt(value)) {
                    self.value = value.v > 0 ? 1 : 0;
                    $("#write-digital_" + self.pinName + "_value").html(self.value ? "ON" : "OFF");
                    $("#write-digital_" + self.pinName + "_anim").css('opacity', self.value);
                } else if (Sk.builtin.checkString(angle)){
                    Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction set() sur " + self.pin, "can't convert 'int' object to str implicity", 'TypeError');
                }
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'value' à la fonction set() sur " + self.pin, "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
			return Sk.builtin.none();
		});

		$loc.on = new Sk.builtin.func(function (self) {
			$("#write-digital_" + self.pinName + "_value").html("ON");
            $("#write-digital_" + self.pinName + "_anim").css('opacity', 1);
			return Sk.builtin.none();
		});

        $loc.off = new Sk.builtin.func(function (self) {
			$("#write-digital_" + self.pinName + "_value").html("OFF");
            $("#write-digital_" + self.pinName + "_anim").css('opacity', 0);
			return Sk.builtin.none();
		});

	}, 'digital', []);

	return mod;
};