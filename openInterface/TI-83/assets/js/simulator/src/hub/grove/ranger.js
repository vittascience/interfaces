// Innovator Hub - ranger module

var $builtinmodule = function (name) {
	
	let ranger = {};

    ranger.__name__ = new Sk.builtin.str('ranger');
	
	ranger.ranger = new Sk.misceval.buildClass(ranger, function($gbl, $loc) {

		ranger__init__ = function (self, pin) {
			if (pin !== undefined) {
				if (Sk.builtin.checkString(pin)) {
                    self.pin = pin.v;
                    const pins = Blockly.Constants.Pins.HUB_DIGITAL_INPUTS;
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
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'pin' à la fonction ranger()", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
		};

		ranger__init__.co_varnames = ['self', 'pin'];
		ranger__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(ranger__init__);

		$loc.measurement = new Sk.builtin.func(function (self) {
			self.measure = $("#ih-ultrasonic_" + self.pinId + "_slider_d").slider('option', 'value');
			return new Sk.builtin.int_(self.measure);
		});

	}, 'ranger', []);

	return ranger;
};


