// Innovator Hub - temperat module

var $builtinmodule = function (name) {
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('temperat');
	
	mod.temperature = new Sk.misceval.buildClass(mod, function($gbl, $loc) {

		temperature__init__ = function (self, pin) {
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
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'pin' à la fonction temperature()", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
		};

		temperature__init__.co_varnames = ['self', 'pin'];
		temperature__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(temperature__init__);

		$loc.measurement = new Sk.builtin.func(function (self) {
			self.measure = $("#ti-groveTemp_" + self.pinId + "_slider_cel").slider('option', 'value');
			return new Sk.builtin.int_(self.measure);
		});

	}, 'temperature', []);

	return mod;
};