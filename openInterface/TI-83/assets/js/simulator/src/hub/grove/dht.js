// Innovator Hub - dht module

var $builtinmodule = function (name) {
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('dht');
	
	mod.dht = new Sk.misceval.buildClass(mod, function($gbl, $loc) {

		dht__init__ = function (self, pin) {
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
                Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'pin' à la fonction dht()", "function takes 2 positional arguments but 1 were given.", 'TypeError');
			}
		};

		dht__init__.co_varnames = ['self', 'pin'];
		dht__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(dht__init__);

		$loc.temp_measurement = new Sk.builtin.func(function (self) {
            self.measure_temp = $("#dht11-temp_" + self.pinId + "_slider").slider('option', 'value');
			return new Sk.builtin.float_(self.measure_temp);
		});

        $loc.humidity_measurement = new Sk.builtin.func(function (self) {
			self.measure_hum = $("#dht11-hum_" + self.pinId + "_slider").slider('option', 'value')
			return new Sk.builtin.float_(self.measure_hum);
		});

	}, 'dht', []);

	return mod;
};