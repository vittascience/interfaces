// Innovator Hub - temperat module

var $builtinmodule = function (name) {

    const module = Simulator.getModuleByKey('servo');
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('servo');
	
	mod.servo = new Sk.misceval.buildClass(mod, function($gbl, $loc) {

		var js__init__ = function (self, pin) {
			if (pin !== undefined) {
				if (Sk.builtin.checkString(pin)) {
                    self.pin = pin.v;
                    const pins = Blockly.Constants.Pins.HUB_PWM_PINS_5V;
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
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'pin' à la fonction servo()", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
		};

		js__init__.co_varnames = ['self', 'pin'];
		js__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none()];
		js__init__.co_numargs = 2;

		$loc.__init__ = new Sk.builtin.func(js__init__);

        $loc.set_position = new Sk.builtin.func(function (self, angle) {
            if (angle !== undefined) {
                if (Sk.builtin.checkNumber(angle)) {
                    self.angle = Math.round(angle.v);
                    Simulator.setAnimator(module, module.id + '_' + self.pinId, self.angle);
                } else if (Sk.builtin.checkString(angle)) {
                    Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction set_position() sur " + self.pin, "can't convert 'int' object to str implicity", 'TypeError');
                }
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'angle' à la fonction set_position() sur " + self.pin, "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });

        $loc.zero = new Sk.builtin.func(function (self) {
            self.angle = 0;
            Simulator.setAnimator(module, module.id + '_' + self.pinId, 0);
        });

	}, 'servo', []);

	return mod;
};

