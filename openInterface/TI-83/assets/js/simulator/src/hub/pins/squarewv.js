// Innovator Hub - squarewv module

var $builtinmodule = function (name) {
	
	var mod = {};

    mod.__name__ = new Sk.builtin.str('squarewv');
	
	mod.squarewave = new Sk.misceval.buildClass(mod, function($gbl, $loc) {

		const startPWM = function (self) {
			if (self.frequency <= 100) {
				if (self.frequency <= 30) {
					function start() {
						Simulator.intervals[self.pin] = setInterval(function () {
							$('#pwm_' + self.pinName + '_value').html(self.frequency + " Hz");
							$('#pwm_' + self.pinName + '_anim').css('opacity', self.state ? 1 : 0);
							self.state = !self.state;
							if (!self.init) {
								clearInterval(Simulator.intervals[self.pin]);
								$('#' + self.id + '_value').html("0");
								$('#' + self.id + '_anim').css('opacity', 0);
							}
						}, 1 / self.frequency * 1000);
					};
					start();
				} else {
					$('#pwm_' + self.pinName + '_value').html(self.frequency + " Hz");
					$('#pwm_' + self.pinName + '_anim').css('opacity', self.percent/100);
				}
			} else {
				$('#pwm_' + self.pinName + '_value').html(self.percent + " %");
				$('#pwm_' + self.pinName + '_anim').css('opacity', self.percent / 100);
			}
		};

		var js__init__ = function (self, pin) {
			if (pin !== undefined) {
				if (Sk.builtin.checkString(pin)) {
                    self.pin = pin.v;
                    const pins = Blockly.Constants.Pins.HUB_PWM_PINS;
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

        $loc.set = new Sk.builtin.func(function (self, freq, percent, duration) {
            if (percent !== undefined) {
                if (Sk.builtin.checkInt(percent) || Sk.builtin.checkNumber(percent) || Sk.builtin.checkBool(percent)) {
                    self.percent = percent.v;
                    if (Sk.builtin.checkInt(freq) || Sk.builtin.checkNumber(freq) || Sk.builtin.checkBool(freq)) {
						if (Sk.builtin.checkBool(freq)) {
							self.frequency = freq.v ? 1 : 0;
						} else {
							self.frequency = freq.v;
						}
						if (self.frequency >= 1 && self.frequency <= 500) {
							self.init = true;
							self.state = false;
							startPWM(self);
						} else {
							Simulator.Mosaic.specific.ti.showError("La frequence PWM doit être comprise entre 1 et 500 Hz sur " + self.pin, "Frequency out of range.", 'tihubException');
						}
                    } else if (Sk.builtin.checkString(pin)) {
                        Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction set() sur " + self.pin, "can't convert 'int' object to str implicity", 'TypeError');
                    }
                } else if (Sk.builtin.checkString(percent)){
                    Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction set() sur " + self.pin, "can't convert 'int' object to str implicity", 'TypeError');
                }
            } else {
                if (freq !== undefined) {
                    if (Sk.builtin.checkInt(freq) || Sk.builtin.checkNumber(freq) || Sk.builtin.checkBool(freq)) {
                        self.percent = 50;
                        self.frequency = freq.v ? 1 : 0;
                        self.init = true;
                        self.state = false;
                        startPWM(self);
                    } else if (Sk.builtin.checkString(freq)) {
                        Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction set() sur " + self.pin, "can't convert 'int' object to str implicity", 'TypeError');
                    }
                } else {
                    Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'fréquence' à la fonction set() sur " + self.pin, "function takes 2 positional arguments but 1 were given.", 'TypeError');
                }
            }
			return Sk.builtin.none();
		});

        $loc.off = new Sk.builtin.func(function (self) {
			self.init = false;
			setTimeout(function () {
				$('#pwm_' + self.pinName + '_value').html("0");
				$('#pwm_' + self.pinName + '_anim').css('opacity', 0);
			}, 1000)
		});

	}, 'squarewave', []);

	return mod;
};