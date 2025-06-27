// STM32 umachine module

var $builtinmodule = function () {

	var machine = {};

	machine.data = {
		freq: 64000000,
		last_sleep: 0
	};

	machine.__name__ = new Sk.builtin.str("umachine");

	// reset constants
	machine.PWRON_RESET = new Sk.builtin.int_(1);
	machine.HARD_RESET = new Sk.builtin.int_(2);
	machine.WDT_RESET = new Sk.builtin.int_(3);
	machine.DEEPSLEEP_RESET = new Sk.builtin.int_(4);
	machine.SOFT_RESET = new Sk.builtin.int_(0);

	machine.info = new Sk.builtin.func(function () {
		return new Sk.builtin.str(Board.STM32_MACHINE_INFO);
	});

	machine.unique_id = new Sk.builtin.func(function () {
		return new Sk.builtin.bytes([67, 0, 61, 0, 18, 80, 78, 84, 87, 50, 50, 32]);
	});

	machine.reset = new Sk.builtin.func(function () {
		Simulator.replay();
	});

	machine.bootloader = new Sk.builtin.func(function () {
		new Sk.builtin.func(function () {
			if (!Simulator.isStopped) {
				Simulator.stop();
			}
		});
	});

	machine.freq = new Sk.builtin.func(function (freq) {
		if (freq !== undefined) {
			Sk.builtin.pyCheckType("freq", "integer", Sk.builtin.checkInt(freq));
			machine.data.freq = freq.v;
		} else {
			new Sk.builtin.tuple([machine.data.freq, machine.data.freq, machine.data.freq, machine.data.freq]);
		}
	});

	machine.sleep = new Sk.builtin.func(function (delay) {
		if (delay !== undefined) {
			Sk.builtin.pyCheckType("delay", "integer", Sk.builtin.checkInt(delay));
			machine.data.last_sleep = Sk.ffi.remapToJs(delay);
		}
		return Simulator.sleep_ms(machine.data.last_sleep);
	});

	machine.lightsleep = machine.sleep;

	machine.bootloader = new Sk.builtin.func(function () {
		new Sk.builtin.func(function () {
			if (!Simulator.isStopped) {
				Simulator.stop();
			}
		});
	});

	machine.idle = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.idle() is not yet implemented");
	});

	machine.rng = new Sk.builtin.func(function () {
		throw new Sk.builtin.int_(Math.floor(Math.random() * 2 ** 30));
	});

	machine.reset_cause = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.reset_cause() is not yet implemented");
	});

	machine.disable_irq = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.disable_irq() is not yet implemented");
	});

	machine.enable_irq = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.enable_irq() is not yet implemented");
	});

	machine.time_pulse_us = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.time_pulse_us() is not yet implemented");
	});

	machine.mem8 = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.mem8() is not yet implemented");
	});

	machine.mem16 = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.mem16() is not yet implemented");
	});

	machine.mem32 = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("machine.mem32() is not yet implemented");
	});

	machine.Pin = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		// pin mode
		$loc.IN = new Sk.builtin.int_(0);
		$loc.OUT = new Sk.builtin.int_(1);
		$loc.OPEN_DRAIN = new Sk.builtin.int_(17);
		// alt
		$loc.ALT = new Sk.builtin.int_(2);
		$loc.ALT_OPEN_DRAIN = new Sk.builtin.int_(18);
		$loc.ANALOG = new Sk.builtin.int_(3);
		// pin pull resistor
		$loc.PULL_NONE = new Sk.builtin.int_(0);
		$loc.PULL_UP = new Sk.builtin.int_(1);
		$loc.PULL_DOWN = new Sk.builtin.int_(2);
		// irq
		$loc.IRQ_RISING = new Sk.builtin.int_(269549568);
		$loc.IRQ_FALLING = new Sk.builtin.int_(270598144);
		// out
		$loc.OUT_PP = new Sk.builtin.int_(1);
		$loc.OUT_OD = new Sk.builtin.int_(17);
		// af
		$loc.AF_PP = new Sk.builtin.int_(2);
		$loc.AF_OD = new Sk.builtin.int_(18);
		$loc.AF12_SDMMC1 = new Sk.builtin.int_(12);
		$loc.AF14_TIM15 = new Sk.builtin.int_(14);
		$loc.AF14_TIM16 = new Sk.builtin.int_(14);
		$loc.AF14_TIM17 = new Sk.builtin.int_(14);
		$loc.AF14_TIM2 = new Sk.builtin.int_(14);
		$loc.AF1_TIM1 = new Sk.builtin.int_(1);
		$loc.AF1_TIM2 = new Sk.builtin.int_(1);
		$loc.AF2_TIM2 = new Sk.builtin.int_(2);
		$loc.AF2_TIM3 = new Sk.builtin.int_(2);
		$loc.AF2_TIM4 = new Sk.builtin.int_(2);
		$loc.AF2_TIM5 = new Sk.builtin.int_(2);
		$loc.AF3_TIM8 = new Sk.builtin.int_(3);
		$loc.AF4_I2C1 = new Sk.builtin.int_(4);
		$loc.AF4_I2C2 = new Sk.builtin.int_(4);
		$loc.AF4_I2C3 = new Sk.builtin.int_(4);
		$loc.AF5_SPI1 = new Sk.builtin.int_(5);
		$loc.AF5_SPI2 = new Sk.builtin.int_(5);
		$loc.AF7_USART1 = new Sk.builtin.int_(7);
		$loc.AF7_USART2 = new Sk.builtin.int_(7);
		$loc.AF7_USART3 = new Sk.builtin.int_(7);
		$loc.AF8_LPUART1 = new Sk.builtin.int_(8);
		$loc.AF8_UART4 = new Sk.builtin.int_(8);
		$loc.AF8_UART5 = new Sk.builtin.int_(8);
		$loc.AF9_CAN1 = new Sk.builtin.int_(9);


		Pin__init__ = function (self, pin, mode, pull, value, af) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 6);
			Sk.builtin.pyCheckType("pin", "string", Sk.builtin.checkString(pin));
			Sk.builtin.pyCheckType("mode", "integer", Sk.builtin.checkInt(mode));
			Sk.builtin.pyCheckType("pull", "integer", Sk.builtin.checkInt(pull));
			Sk.builtin.pyCheckType("value", "integer", Sk.builtin.checkInt(value));
			Sk.builtin.pyCheckType("af", "integer", Sk.builtin.checkInt(af));
			self.pin = pin.v;
			if (Board.Pins.STM32_PINS.includes(self.pin)) {
				self.mode = mode.v;
				self.pull = pull.v;
				const component = Simulator.pinList.find((component) => component.pin == self.pin);
				if (component !== undefined) {
					self.id = component.id;
					switch (self.pull) {
						case $loc.PULL_NONE.v:
							Simulator.setPullButton(self.id, 'no_pull');
							break;
						case $loc.PULL_UP.v:
							Simulator.setPullButton(self.id, 'up');
							break;
						case $loc.PULL_DOWN.v:
						default:
							Simulator.setPullButton(self.id, 'down');
					}
				}
				self.value = value.v;
				self.af = af.v;
				if (self.mode == $loc.OUT.v && self.id !== undefined) {
					const module = Simulator.getModuleByKey(self.id.split('_')[0]);
					Simulator.setAnimator(module, self.id, self.value);
				}
				return Sk.builtin.none();
			} else {
				throw new Sk.builtin.ValueError("Pin(" + self.pin + ") doesn't exist");
			}
		};

		Pin__init__.co_varnames = ['self', 'pin', 'mode', 'pull', 'value', 'af'];
		Pin__init__.$defaults = [$loc.ANALOG, $loc.PULL_NONE, new Sk.builtin.int_(0), new Sk.builtin.int_(0)];

		$loc.__init__ = new Sk.builtin.func(Pin__init__);

		init = function (self, mode, pull, value, af) {
			Sk.builtin.pyCheckArgsLen("init", arguments.length, 2, 5);
			Sk.builtin.pyCheckType("mode", "integer", Sk.builtin.checkInt(mode));
			Sk.builtin.pyCheckType("pull", "integer", Sk.builtin.checkInt(pull));
			Sk.builtin.pyCheckType("value", "integer", Sk.builtin.checkInt(value));
			Sk.builtin.pyCheckType("af", "integer", Sk.builtin.checkInt(af));
			self.mode = mode.v;
			self.pull = pull.v;
			switch (self.pull) {
				case $loc.PULL_NONE.v:
					Simulator.setPullButton(self.id, 'no_pull');
					break;
				case $loc.PULL_UP.v:
					Simulator.setPullButton(self.id, 'up');
					break;
				case $loc.PULL_DOWN.v:
				default:
					Simulator.setPullButton(self.id, 'down');
			}
			self.value = value.v;
			self.af = af.v;
			if (self.mode == $loc.OUT.v && self.id !== undefined) {
				const module = Simulator.getModuleByKey(self.id.split('_')[0]);
				Simulator.setAnimator(module, self.id, self.value);
			}
			return Sk.builtin.none();
		};

		init.co_varnames = ['self', 'mode', 'pull', 'value', 'af'];
		init.$defaults = [$loc.PULL_NONE, new Sk.builtin.int_(0), new Sk.builtin.int_(0)];

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
					if (self.pin == "PC13") {
						self.value = 0 + !$('#stm32-button1_slider').slider('option', 'value');
					} else {
						self.value = $('#' + self.id + '_slider').slider('option', 'value');
					}
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

		$loc.irq = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError(self.pin.toLowerCase() + ".irq() is not yet implemented");
		});

		$loc.low = new Sk.builtin.func(function (self) {
			if (self.mode == $loc.OUT.v && self.id !== undefined) {
				self.value = 0;
				const module = Simulator.getModuleByKey(self.id.split('_')[0]);
				Simulator.setAnimator(module, self.id, self.value);
			}
			return Sk.builtin.none();
		});

		$loc.high = new Sk.builtin.func(function (self) {
			if (self.mode == $loc.OUT.v && self.id !== undefined) {
				self.value = 1;
				const module = Simulator.getModuleByKey(self.id.split('_')[0]);
				Simulator.setAnimator(module, self.id, self.value);
			}
			return Sk.builtin.none();
		});

		$loc.name = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("attribute 'name' of 'Pin' object is not yet implemented");
		});

		$loc.names = new Sk.builtin.func(function (self) {
			return new Sk.builtin.list([Sk.builtin.none(), new Sk.builtin.str(self.pin)]);
		});

		$loc.af_list = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("attribute 'af_list' of 'Pin' object is not yet implemented");
		});

		$loc.port = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("attribute 'port' of 'Pin' object is not yet implemented");
		});

		$loc.pin = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("attribute 'pin' of 'Pin' object is not yet implemented");
		});

		$loc.gpio = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("attribute 'gpio' of 'Pin' object is not yet implemented");
		});

		$loc.mode = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(self.mode);
		});

		$loc.pull = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(self.pull);
		});

		$loc.af = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(self.af);
		});

		$loc.mapper = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("attribute 'mapper' of 'Pin' object is not yet implemented");
		});

	});

	machine.RTC = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		/**
		 * Note: datetime = (year, month, day, dayOfWeek, hour, minutes, seconds, us)
		 */
		const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
		const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Atoût", "Septembre", "Octobre", "Novembre", "Décembre"]
		const setTime = function (self) {
			const hour = self.now[4] < 10 ? '0' + self.now[4] : self.now[4];
			const minute = self.now[5] < 10 ? '0' + self.now[5] : self.now[5];
			const second = self.now[6] < 10 ? '0' + self.now[6] : self.now[6];
			$('#rtc_value').html(days[self.now[3] - 1] + " " + self.now[2] + " " + months[self.now[1] - 1] + " " + self.now[0] + "<br/>" + hour + ":" + minute + ":" + second);
		};

		RTC__init__ = function (self) {
			self.now = [2015, 1, 1, 4, 0, 0, 0, 0];
			self.t0 = Date.now();
			setTime(self);
		};

		RTC__init__.co_varnames = ['self'];
		RTC__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(RTC__init__);

		$loc.init = new Sk.builtin.func(function (self, datetime) {
			self.now = [2015, 1, 1, 4, 0, 0, 0, 0];
			self.t0 = Date.now();
			setTime(self);
			return Sk.builtin.none();
		});

		$loc.datetime = new Sk.builtin.func(function (self, datetime) {
			if (datetime !== undefined) {
				Sk.builtin.pyCheckType("datetime", "iterable", Sk.builtin.checkIterable(datetime));
				if (datetime.v.length == 8) {
					self.now = datetime.v.map(x => x.v);
					self.t0 = Date.now();
					setTime(self);
				} else {
					throw new Sk.builtin.ValueError("requested length 8 but object has length " + datetime.v.length);
				}
			} else {
				const convert = [24, 60, 60, 1000000]
				self.now[7] += (Date.now() - self.t0) * 1000; // us
				for (let i = 7; i > 3; i--) {
					if (self.now[i] > convert[i - 4] - 1) {
						if (i > 4) {
							self.now[i - 1] += Math.trunc(self.now[i] / convert[i - 4]); // s
						}
						if (i > 3) {
							self.now[i] %= convert[i - 4];
						}
						if (i == 4) {
							self.now[3] += 1;
							if (self.now[3] == 8) {
								self.now[3] = 1;
							}
							self.now[2] += 1;
							if (self.now[2] == 31) {
								self.now[2] = 1;
								self.now[1] += 1;
								if (self.now[1] == 13) {
									self.now[1] = 1;
									self.now[0] += 1;
								}
							}
						}
					} else {
						break;
					}
				}
				self.t0 = Date.now();
				setTime(self);
				return new Sk.builtin.tuple(self.now);
			}
		});

		$loc.info = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(805306368);
		});

	});

	machine.ADC = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		$loc.VREF = new Sk.builtin.int_(65535);
		$loc.CORE_VREF = new Sk.builtin.int_(1);
		$loc.CORE_TEMP = new Sk.builtin.int_(-950927360);
		$loc.CORE_VBAT = new Sk.builtin.int_(-880541696);

		ADC__init__ = function (self, pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 3);
			Sk.builtin.pyCheckType("pin", "integer", Sk.builtin.checkInt(pin));
			self.pin = pin.v;
			const ADCpins = Board.Pins.STM32_ADC_PINS;
			if (ADCpins[Object.keys(ADCpins).find(key => ADCpins[key][0] === self.pin)]) {
				const component = Simulator.pinList.find((component) => component.pin == self.pin);
				if (component !== undefined) {
					self.id = component.id;
				}
			} else {
				throw new Sk.builtin.ValueError("Pin(" + self.pin + ") does not have ADC capabilities");
			}
		};

		ADC__init__.co_varnames = ['self', 'pin'];
		ADC__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(ADC__init__);

		$loc.read_u16 = new Sk.builtin.func(function (self) {
			// read 16 bit value (from 0 to 65535)
			const mod = Simulator.getModuleByKey(self.id.split('_')[0]);
			const suffix = mod.listeners[0].suffix || "";
			const value = parseInt($("#" + self.id + "_slider" + suffix).slider('option', 'value'));
			return new Sk.builtin.int_(Math.round(value * 65535 / 4096));
		});

	});

	machine.I2C = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		I2C__init__ = function (self, port) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			Sk.builtin.pyCheckType("port", "integer", Sk.builtin.checkInt(port));
			if (port.v === 1 || port.v === 3) {
				self.port = port.v;
			} else {
				throw new Sk.builtin.ValueError("I2C(" + port.v + ") doesn't exist");
			}
		};

		I2C__init__.co_varnames = ['self', 'port'];
		I2C__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(I2C__init__);

	});

	return machine;
};
