// Esp32 - machine module

const uart = function () {

	const mod = {};

	mod.data = {
		baudrate: 9600,
		bits: 8,
		parity: null,
		stop: 1,
		tx: null,
		rx: null,
		gps: {
			longitude: 0,
			latitude: 0,
			altitude: 0,
		},
		isChanged: false
	};

	mod.write = new Sk.builtin.func(function () {
		for (let i = 0; i < Simulator.pinList.length; i++) {
			if ("openlog_" + Simulator.pinList[i].pin == Simulator.pinList[i].id && $("#" + Simulator.pinList[i].id + '_value').html() != "ON") {
				$("#" + Simulator.pinList[i].id + '_value').html("ON");
				$("#" + Simulator.pinList[i].id + '_anim').css("opacity", 1);
				setTimeout(function () {
					$("#" + Simulator.pinList[i].id + '_value').html("OFF");
					$("#" + Simulator.pinList[i].id + '_anim').css("opacity", 0);
				}, 500);
			}
			if ("gps_" + Simulator.pinList[i].pin == Simulator.pinList[i].id) {
				$("#" + Simulator.pinList[i].id + '_value').html("ON");
			}
			if ("bluetooth_" + Simulator.pinList[i].pin == Simulator.pinList[i].id) {
				$("#" + Simulator.pinList[i].pin + '_value').html("ON");
			}
		}
	});

	mod.read = new Sk.builtin.func(function () {
		let gps = false;
		let modules = Simulator.getMosaicModules();
		for (m in modules) {
			if (modules[m].id == "gps") {
				gps = true;
			}
		}
		if (gps) {
			let latitude = '';
			var nmea = '';
			mod.data.gps.latitude = parseFloat($("#gps_slider_lat").slider('value'));
			if (mod.data.gps.latitude > 0) {
				let degree = mod.data.gps.latitude;
				let format = Math.floor(degree) * 100 + (degree - Math.floor(degree)) * 60;
				if (degree < 10) latitude += '0';
				latitude += format.toFixed(4) + ",N";
			} else if (mod.data.gps.latitude < 0) {
				let degree = Math.abs(mod.data.gps.latitude);
				let format = Math.floor(degree) * 100 + (degree - Math.floor(degree)) * 60;
				if (degree < 10) latitude += '0';
				latitude += format.toFixed(4) + ",S";
			} else {
				latitude += "0000.0000,N";
			}
			let longitude = '';
			mod.data.gps.longitude = parseFloat($("#gps_slider_lon").slider('value'));
			if (mod.data.gps.longitude > 0) {
				let degree = mod.data.gps.longitude;
				let format = Math.floor(degree) * 100 + (degree - Math.floor(degree)) * 60;
				if (degree < 100) {
					longitude += '0';
					if (degree < 10) longitude += '0';
				}
				longitude += format.toFixed(4) + ",E";
			} else if (mod.data.gps.longitude < 0) {
				let degree = Math.abs(mod.data.gps.longitude);
				let format = Math.floor(degree) * 100 + (degree - Math.floor(degree)) * 60;
				if (degree < 100) {
					longitude += '0';
					if (degree < 10) longitude += '0';
				}
				longitude += format.toFixed(4) + ",W";
			} else {
				longitude += "00000.0000,E";
			}
			mod.data.gps.altitude = parseInt($("#gps_value_alt").html());
			let now = new Date();

			let time = now.getHours() * 10000 + now.getMinutes() * 100 + now.getSeconds();
			var letters = ['GP', 'GA', 'BD', 'GB', 'GL', 'GN'];
			var date = new Date().toISOString().slice(2, 10).replace("-", "").replace("-", "");

			if (Math.random() > 0.5) {
				var nmea = "$" + letters[Math.floor(Math.random() * letters.length)] + "GGA," + time + ".000," + latitude + "," + longitude + ",1,04,3.2," + mod.data.gps.altitude + ".0,M,,,,0000*0E"
			} else {
				var nmea = "$" + letters[Math.floor(Math.random() * letters.length)] + "RMC," + time + ".000,A," + latitude + "," + longitude + ",0,0," + date + ",0,W*68"
			}
			return new Sk.builtin.str(nmea);
		} else {
			return null;
		}
	});

	var init = function (baudrate, bits, parity, stop, tx, rx) {
		if (baudrate === undefined) {
			baudrate = new Sk.builtin.int_(9600);
		}
		if (bits === undefined) {
			bits = new Sk.builtin.int_(8);
		}
		if (parity === undefined) {
			parity = Sk.builtin.none;
		}
		if (stop === undefined) {
			stop = new Sk.builtin.int_(1);
		}
		if (tx === undefined) {
			tx = Sk.builtin.none;
		}
		if (rx === undefined) {
			rx = Sk.builtin.none;
		}
		mod.data.baudrate = baudrate;
		mod.data.bits = bits;
		mod.data.parity = parity;
		mod.data.stop = stop;
		mod.data.tx = tx;
		mod.data.rx = rx;
	}

	init.co_varnames = ['baudrate', 'bits', 'parity', 'stop', 'tx', 'rx'];
	init.$defaults = [new Sk.builtin.int_(9600), new Sk.builtin.int_(8), Sk.builtin.none(), new Sk.builtin.int_(1), Sk.builtin.none(), Sk.builtin.none];
	init.co_numargs = 6;
	mod.init = new Sk.builtin.func(init);

	mod.any = new Sk.builtin.func(function () {
		return new Sk.builtin.bool(true);
	});
	return mod;
};

const $builtinmodule = function (name) {

	const machine = {};

	machine.data = {
		freq: 160000000,
		last_sleep: 0
	};

	machine.__name__ = new Sk.builtin.str("machine");

	// reset constants
	machine.HARD_RESET = new Sk.builtin.int_(2);
	machine.PWRON_RESET = new Sk.builtin.int_(1);
	machine.WDT_RESET = new Sk.builtin.int_(3);
	machine.DEEPSLEEP_RESET = new Sk.builtin.int_(4);
	machine.SOFT_RESET = new Sk.builtin.int_(5);

	// wake constants
	machine.PIN_WAKE = new Sk.builtin.int_(2);
	machine.EXT0_WAKE = new Sk.builtin.int_(2);
	machine.EXT1_WAKE = new Sk.builtin.int_(3);
	machine.TIMER_WAKE = new Sk.builtin.int_(4);
	machine.TOUCHPAD_WAKE = new Sk.builtin.int_(5);
	machine.ULP_WAKE = new Sk.builtin.int_(6);

	// sleep constants
	machine.SLEEP = new Sk.builtin.int_(2);
	machine.DEEPSLEEP = new Sk.builtin.int_(4);

	machine.freq = new Sk.builtin.func(function (freq) {
		if (freq !== undefined) {
			Sk.builtin.pyCheckType("freq", "integer", Sk.builtin.checkInt(freq));
			mod.data.freq = freq.v;
		} else {
			return new Sk.builtin.int_(machine.data.freq);
		}
	});

	machine.reset = new Sk.builtin.func(function () {
		Simulator.replay();
	});

	machine.soft_reset = machine.reset;
	machine.hard_reset = machine.reset;

	machine.unique_id = new Sk.builtin.func(function () {
		return new Sk.builtin.bytes([158, 189, 245, 208]);
	});

	machine.sleep = new Sk.builtin.func(function (delay) {
		if (delay !== undefined) {
			Sk.builtin.pyCheckType("delay", "integer", Sk.builtin.checkInt(delay));
			machine.data.last_sleep = Sk.ffi.remapToJs(delay);
		}
		return Simulator.sleep_ms(machine.data.last_sleep);
	});

	machine.lightsleep = machine.sleep;

	machine.idle = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.idle() is not yet implemented");
	});

	machine.disable_irq = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.disable_irq() is not yet implemented");
	});

	machine.enable_irq = new Sk.builtin.func(function (state) {
		throw new Sk.builtin.NotImplementedError("machine.enable_irq() is not yet implemented");
	});

	machine.time_pulse_us = new Sk.builtin.func(function (Pin, pulse_level, timeout_us = 1000000) {
		throw new Sk.builtin.NotImplementedError("machine.time_pulse_us() is not yet implemented");
	});

	machine.Pin = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		// pin mode
		$loc.IN = new Sk.builtin.int_(1);
		$loc.OUT = new Sk.builtin.int_(3);
		$loc.OPEN_DRAIN = new Sk.builtin.int_(7);
		// pin pull resistor
		$loc.PULL_UP = new Sk.builtin.int_(2);
		$loc.PULL_DOWN = new Sk.builtin.int_(1);
		// irq
		$loc.IRQ_RISING = new Sk.builtin.int_(1);
		$loc.IRQ_FALLING = new Sk.builtin.int_(2);
		// wake
		$loc.WAKE_LOW = new Sk.builtin.int_(4);
		$loc.WAKE_HIGH = new Sk.builtin.int_(5);

		Pin__init__ = function (self, pin, mode, pull, value) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 5);
			Sk.builtin.pyCheckType("pin", "integer", Sk.builtin.checkInt(pin));
			Sk.builtin.pyCheckType("mode", "integer", Sk.builtin.checkInt(mode));
			Sk.builtin.pyCheckType("pull", "integer", Sk.builtin.checkInt(pull));
			Sk.builtin.pyCheckType("value", "integer", Sk.builtin.checkInt(value));
			self.pin = pin.v;
			self.mode = mode.v;
			self.pull = pull.v;
			const component = Simulator.pinList.find((component) => component.pin == self.pin);
			if (component !== undefined) {
				self.id = component.id;
			} else if (self.pin === 2) {
				self.id = "esp32-builtin-led";
			}
			switch (self.pull) {
				case $loc.PULL_UP.v:
					Simulator.setPullButton(self.id, 'up');
					break;
				case $loc.PULL_DOWN.v:
				default:
					Simulator.setPullButton(self.id, 'down');
			}
			self.value = value.v;
			if (self.mode == $loc.OUT.v && self.id !== undefined) {
				const module = Simulator.getModuleByKey(self.id.split('_')[0]);
				if (module.type !== 'input') {
					Simulator.setAnimator(module, self.id, self.value);
				}
			}
			return Sk.builtin.none();
		};

		Pin__init__.co_varnames = ['self', 'pin', 'mode', 'pull', 'value'];
		Pin__init__.$defaults = [$loc.OUT, $loc.PULL_DOWN, new Sk.builtin.int_(0)];

		$loc.__init__ = new Sk.builtin.func(Pin__init__);

		init = function (self, mode, pull, value) {
			Sk.builtin.pyCheckArgsLen("init", arguments.length, 2, 4);
			Sk.builtin.pyCheckType("mode", "integer", Sk.builtin.checkInt(mode));
			Sk.builtin.pyCheckType("pull", "integer", Sk.builtin.checkInt(pull));
			Sk.builtin.pyCheckType("value", "integer", Sk.builtin.checkInt(value));
			self.mode = mode.v;
			self.pull = pull.v;
			switch (self.pull) {
				case $loc.PULL_UP.v:
					Simulator.setPullButton(self.id, 'up');
					break;
				case $loc.PULL_DOWN.v:
				default:
					Simulator.setPullButton(self.id, 'down');
			}
			self.value = value.v;
			if (self.mode == $loc.OUT.v && self.id !== undefined) {
				const module = Simulator.getModuleByKey(self.id.split('_')[0]);
				Simulator.setAnimator(module, self.id, self.value);
			}
			return Sk.builtin.none();
		};

		init.co_varnames = ['self', 'mode', 'pull', 'value'];
		init.$defaults = [$loc.PULL_DOWN, new Sk.builtin.int_(0)];

		$loc.init = new Sk.builtin.func(init);

		$loc.value = new Sk.builtin.func(function (self, value) {
			if (value !== undefined) {
				if (self.mode == $loc.OUT.v && self.id !== undefined) {
					self.value = value.v;
					const module = Simulator.getModuleByKey(self.id.split('_')[0]);
					Simulator.setAnimator(module, self.id, self.value);
				}
				return Sk.builtin.none();
			} else {
				if (self.mode == $loc.IN.v) {
					self.value = parseInt($('#' + self.id + '_slider').slider('option', 'value'));
				} else {
					self.value = 0;
				}
				return new Sk.builtin.int_(self.value);
			}
		});

		$loc.off = new Sk.builtin.func(function (self) {
			if (self.mode == $loc.OUT.v && self.id !== undefined) {
				self.value = 0;
				const module = Simulator.getModuleByKey(self.id.split('_')[0]);
				Simulator.setAnimator(module, self.id, self.value);
			}
			return Sk.builtin.none();
		});

		$loc.on = new Sk.builtin.func(function (self) {
			if (self.mode == $loc.OUT.v && self.id !== undefined) {
				self.value = 1;
				const module = Simulator.getModuleByKey(self.id.split('_')[0]);
				Simulator.setAnimator(module, self.id, self.value);
			}
			return Sk.builtin.none();
		});

	});

	machine.ADC = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		// attenuation db
		$loc.ATTN_0DB = new Sk.builtin.int_(0);
		$loc.ATTN_2_5DB = new Sk.builtin.int_(1);
		$loc.ATTN_6DB = new Sk.builtin.int_(2);
		$loc.ATTN_11DB = new Sk.builtin.int_(3);
		// bits width
		$loc.WIDTH_9BIT = new Sk.builtin.int_(0);
		$loc.WIDTH_10BIT = new Sk.builtin.int_(1);
		$loc.WIDTH_11BIT = new Sk.builtin.int_(2);
		$loc.WIDTH_12BIT = new Sk.builtin.int_(3);

		ADC__init__ = function (self, Pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 2);
			self.pin = Pin.pin;
			const component = Simulator.pinList.find((component) => component.pin == self.pin);
			if (component !== undefined) {
				self.id = component.id;
			}
			self.atten = $loc.ATTN_0DB.v;
			self.width = $loc.WIDTH_12BIT.v;
		};

		ADC__init__.co_varnames = ['self', 'Pin'];
		ADC__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(ADC__init__);

		$loc.atten = new Sk.builtin.func(function (self, atten) {
			Sk.builtin.pyCheckArgsLen("atten", arguments.length, 2, 2);
			Sk.builtin.pyCheckType("atten", "integer", Sk.builtin.checkInt(atten));
			self.atten = atten.v;
			return Sk.builtin.none();
		});

		$loc.width = new Sk.builtin.func(function (self, width) {
			Sk.builtin.pyCheckArgsLen("width", arguments.length, 2, 2);
			Sk.builtin.pyCheckType("width", "integer", Sk.builtin.checkInt(width));
			self.width = width.v;
			return Sk.builtin.none();
		});

		$loc.read = new Sk.builtin.func(function (self) {
			const mod = Simulator.getModuleByKey(self.id.split('_')[0]);
			const suffix = mod.listeners ? mod.listeners[0].suffix : "";
			const value = $("#" + self.id + "_slider" + suffix).slider('option', 'value');
			return new Sk.builtin.int_(value);
		});

	});

	machine.PWM = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		const startPWM = function (self) {
			const module = Simulator.getModuleByKey(self.id.split('_')[0]);
			if (Simulator.intervals[self.id]) {
				clearInterval(Simulator.intervals[self.id]);
			}
			if (self.freq < 50 && self.id != 'continuousServo') {
				if (self.freq <= 20) {
					function start() {
						Simulator.intervals[self.id] = setInterval(function () {
							$('#' + self.id + '_value').html(self.freq + " Hz");
							$('#' + self.id + '_anim').css('opacity', self.state ? 1 : 0);
							self.state = !self.state;
							if (!self.init && module !== undefined && module.animate !== undefined) {
								clearInterval(Simulator.intervals[self.id]);
								Simulator.setAnimator(module, self.id, 0);
							}
						}, 1 / self.freq * 1000);
					};
					start();
				} else {
					if (module !== undefined && module.animate !== undefined) {
						Simulator.setAnimator(module, self.id, self.duty);
					} else {
						$('#' + self.id + '_value').html(self.freq + " Hz");
						$('#' + self.id + '_anim').css('opacity', "0.5");
					}
				}
			} else {
				if (module !== undefined && module.animate !== undefined) {
					Simulator.setAnimator(module, self.id, self.duty);
				} else {
					$('#' + id + '_value').html(self.duty == 0 ? "OFF" : self.duty);
					$('#' + id + '_anim').css('opacity', self.duty / PWM_MAX_DUTY);
				}
			}
		};

		PWM__init__ = function (self, Pin, freq, duty) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 5);
			Sk.builtin.pyCheckType("freq", "integer", Sk.builtin.checkInt(freq));
			Sk.builtin.pyCheckType("duty", "integer", Sk.builtin.checkInt(duty));
			if (Pin !== undefined && Pin.pin !== undefined) {
				self.Pin = Pin;
				self.freq = freq.v;
				self.duty = duty.v;
				const component = Simulator.pinList.find((component) => component.pin == self.Pin.pin);
				if (component !== undefined) {
					self.id = component.id;
				}
				self.init = true;
				self.state = true;
				startPWM(self);
			} else {
				// TODO: print error
			}
		};

		PWM__init__.co_varnames = ['self', 'Pin', 'freq', 'duty'];
		PWM__init__.$defaults = [new Sk.builtin.int_(5000), new Sk.builtin.int_(512)];

		$loc.__init__ = new Sk.builtin.func(PWM__init__);

		$loc.init = new Sk.builtin.func(function (self) {
			if (!self.init) {
				self.init = true;
				startPWM(self);
			}
		});

		$loc.deinit = new Sk.builtin.func(function (self) {
			self.init = false;
		});

		$loc.freq = new Sk.builtin.func(function (self, freq) {
			if (freq !== undefined) {
				Sk.builtin.pyCheckType("freq", "integer", Sk.builtin.checkInt(freq));
				self.freq = freq.v;
				if (self.init) {
					startPWM(self);
				}
			} else {
				return new Sk.builtin.int_(self.freq);
			}
		});

		$loc.duty = new Sk.builtin.func(function (self, duty) {
			if (duty !== undefined) {
				Sk.builtin.pyCheckType("duty", "integer", Sk.builtin.checkInt(duty));
				self.duty = duty.v;
				startPWM(self);
			} else {
				return new Sk.builtin.int_(self.duty);
			}
		});

	});

	machine.I2C = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		I2C__init__ = function (self, scl, sda, freq) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 4);
			Sk.builtin.pyCheckType("freq", "integer", Sk.builtin.checkInt(freq));
			if (scl.pin && sda.pin) {
				self.scl = scl;
				self.sda = sda;
				self.freq = freq.v;
			} else {
				// TODO: print error
			}
		};

		I2C__init__.co_varnames = ['self', 'scl', 'sda', 'freq'];
		I2C__init__.$defaults = [new Sk.builtin.int_(5000)];

		$loc.__init__ = new Sk.builtin.func(I2C__init__);

	});

	//uart Modules
	machine.uart = new Sk.builtin.module();
	machine.uart.$d = new uart();

	return machine;
};
