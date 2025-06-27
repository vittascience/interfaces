// Innovator Hub - potentio module

var $builtinmodule = function (name) {
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('loudness');
	
	mod.loudness = new Sk.misceval.buildClass(mod, function($gbl, $loc) {

		var js__init__ = function (self, pin) {
			if (pin !== undefined) {
				if (Sk.builtin.checkString(pin)) {
                    self.pin = pin.v;
                    const pins = Blockly.Constants.Pins.HUB_ANALOG_INPUTS;
                    const pinArray = pins[Object.keys(pins).find(key => pins[key][1] === self.pin)];
                    if (pinArray) {
                        self.pinId = Simulator.Mosaic.GETPINDEF_INNOVATOR_HUB(pinArray[0]).id;
                    } else {
                        Simulator.Mosaic.specific.ti.blinkRedLed();
                    }
				} else {
					Simulator.Mosaic.specific.ti.blinkRedLed();
				} 
			} else {
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'pin' à la fonction potentiometer()", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
		};

		js__init__.co_varnames = ['self', 'pin'];
		js__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none()];
		js__init__.co_numargs = 2;

		$loc.__init__ = new Sk.builtin.func(js__init__);

		$loc.measurement = new Sk.builtin.func(function (self) {
			self.measure = $("#loudness_" + self.pinId + "_value").html()
			return new Sk.builtin.int_(self.measure);
		});

	}, 'loudness', []);

	return mod;
};