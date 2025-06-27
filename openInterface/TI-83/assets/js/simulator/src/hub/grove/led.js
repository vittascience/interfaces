// Innovator Hub - led module

var $builtinmodule = function (name) {
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('led');
	
	mod.led = new Sk.misceval.buildClass(mod, function($gbl, $loc) {

		led__init__ = function (self, pin) {
			if (pin !== undefined) {
				if (Sk.builtin.checkString(pin)) {
                    self.pin = pin.v;
                    const pins = Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS;
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
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'pin' à la fonction led()", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
		};

		led__init__.co_varnames = ['self', 'pin'];
		led__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(led__init__);

		$loc.on = new Sk.builtin.func(function (self) {
			Simulator.setAnimator(Simulator.getModuleByKey('ledModule'), 'ledModule_' + self.pinId, 1);
			return Sk.builtin.none();
		});

        $loc.off = new Sk.builtin.func(function (self) {
			Simulator.setAnimator(Simulator.getModuleByKey('ledModule'), 'ledModule_' + self.pinId, 0);
			return Sk.builtin.none();
		});

        $loc.blink = new Sk.builtin.func(function (self) {
			throw Error('led.blink() is not implemented yet')
		});

	}, 'led', []);

	return mod;
};