// Innovator Hub - vibmotor module

var $builtinmodule = function (name) {

	const module = Simulator.getModuleByKey('vibrationMotor');
	
	var vibmotor = {};

    vibmotor.__name__ = new Sk.builtin.str('vibmotor');
	
	vibmotor.vibration_motor = new Sk.misceval.buildClass(vibmotor, function($gbl, $loc) {

		vibration_motor__init__ = function (self, pin) {
			if (pin !== undefined) {
				if (Sk.builtin.checkString(pin)) {
                    self.pin = pin.v;
                    const pins = Blockly.Constants.Pins.HUB_DIGITAL_OUTPUTS;
                    const pinArray = pins[Object.keys(pins).find(key => pins[key][1] === self.pin)];
                    if (pinArray) {
                        self.pinName = Simulator.Mosaic.GETPINDEF_INNOVATOR_HUB(pinArray[0]).id;
                    } else {
                        Simulator.Mosaic.specific.ti.blinkRedLed();
                    }
				} else {
					Simulator.Mosaic.specific.ti.blinkRedLed();
				} 
			} else {
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'pin' à la fonction vibration_motor()", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
		};

		vibration_motor__init__.co_varnames = ['self', 'pin'];
		vibration_motor__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(vibration_motor__init__);

		$loc.on = new Sk.builtin.func(function (self) {
			Simulator.setAnimator(module, module.id + '_' + self.pinName, 255);
			return Sk.builtin.none();
		});

        $loc.off = new Sk.builtin.func(function (self) {
			Simulator.setAnimator(module, module.id + '_' + self.pinName, 0);
			return Sk.builtin.none();
		});

        $loc.set = new Sk.builtin.func(function (self, value) {
            if (value !== undefined) {
                if (Sk.builtin.checkInt(value)) {
                    Simulator.setAnimator(module, module.id + '_' + self.pinName, value.v);
                } else if (Sk.builtin.checkString(value)){
                    Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction set() sur " + self.pin, "can't convert 'int' object to str implicity", 'TypeError');
                }
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'value' à la fonction set() sur " + self.pin, "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
			return Sk.builtin.none();
		});

	}, 'vibration_motor', []);

	return vibmotor;
};