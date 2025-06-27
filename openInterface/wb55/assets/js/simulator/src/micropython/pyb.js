// STM32 - pyb module

var $builtinmodule = function () {

	var pyb = {};
	var Timers = {};

	pyb.__name__ = new Sk.builtin.str("pyb");

	pyb.fault_debug = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("pyb.fault_debug() is not yet implemented");
	});

	pyb.repl_info = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("pyb.repl_info() is not yet implemented");
	});

	pyb.wfi = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("pyb.wfi() is not yet implemented");
	});

	pyb.disable_irq = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("pyb.disable_irq() is not yet implemented");
	});

	pyb.main = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("pyb.main() is not yet implemented");
	});

	pyb.repl_uart = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("pyb.repl_uart() is not yet implemented");
	});

	pyb.country = new Sk.builtin.func(function () {
		return new Sk.builtin.str('US');
	});

	pyb.usb_mode = new Sk.builtin.func(function () {
		return new Sk.builtin.str('VCP+MSC');
	});


	pyb.Pin = new Sk.misceval.buildClass(pyb, function ($gbl, $loc) {

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
		$loc.AF12_TIM1 = new Sk.builtin.int_(12);
		$loc.AF14_TIM16 = new Sk.builtin.int_(14);
		$loc.AF14_TIM17 = new Sk.builtin.int_(14);
		$loc.AF14_TIM2 = new Sk.builtin.int_(14);
		$loc.AF1_TIM1 = new Sk.builtin.int_(1);
		$loc.AF1_TIM2 = new Sk.builtin.int_(1);
		$loc.AF2_TIM2 = new Sk.builtin.int_(2);
		$loc.AF3_SPI2 = new Sk.builtin.int_(3);
		$loc.AF3_TIM1 = new Sk.builtin.int_(3);
		$loc.AF4_I2C1 = new Sk.builtin.int_(4);
		$loc.AF4_I2C3 = new Sk.builtin.int_(4);
		$loc.AF5_SPI1 = new Sk.builtin.int_(5);
		$loc.AF5_SPI2 = new Sk.builtin.int_(5);
		$loc.AF7_USART1 = new Sk.builtin.int_(7);

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
				const component = Simulator.pinList.find((component) => component.pin == self.pin);
				if (component !== undefined) {
					self.id = component.id;
				}
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
					if (['SW1', 'SW2', 'SW3'].includes(self.pin)) {
						self.value = 0 + !$('#stm32-' + self.pin.toLowerCase() + '_slider').slider('option', 'value');
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

	pyb.Timer = new Sk.misceval.buildClass(pyb, function ($gbl, $loc) {

		// timer mode
		$loc.UP = new Sk.builtin.int_(0);
		$loc.DOWN = new Sk.builtin.int_(16);
		$loc.CENTER = new Sk.builtin.int_(32);
		// pwm
		$loc.PWM = new Sk.builtin.int_(0);
		$loc.PWM_INVERTED = new Sk.builtin.int_(1);
		$loc.OC_TIMING = new Sk.builtin.int_(2);
		$loc.OC_ACTIVE = new Sk.builtin.int_(3);
		$loc.OC_INACTIVE = new Sk.builtin.int_(4);
		$loc.OC_TOGGLE = new Sk.builtin.int_(5);
		$loc.OC_FORCED_ACTIVE = new Sk.builtin.int_(6);
		$loc.OC_FORCED_INACTIVE = new Sk.builtin.int_(7);
		$loc.IC = new Sk.builtin.int_(8);
		$loc.ENC_A = new Sk.builtin.int_(9);
		$loc.ENC_B = new Sk.builtin.int_(10);
		$loc.ENC_AB = new Sk.builtin.int_(11);
		// brk
		$loc.HIGH = new Sk.builtin.int_(0);
		$loc.LOW = new Sk.builtin.int_(2);
		$loc.RISING = new Sk.builtin.int_(0);
		$loc.FALLING = new Sk.builtin.int_(2);
		$loc.BOTH = new Sk.builtin.int_(10);
		$loc.BRK_OFF = new Sk.builtin.int_(0);
		$loc.BRK_LOW = new Sk.builtin.int_(1);
		$loc.BRK_HIGH = new Sk.builtin.int_(2);

		Timer__init__ = function (self, port, freq) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 3);
			Sk.builtin.pyCheckType("port", "integer", Sk.builtin.checkInt(port));
			Sk.builtin.pyCheckType("freq", "integer", Sk.builtin.checkNumber(freq));
			self.port = port.v;
			if (port.v === 1 || port.v === 2 || port.v === 16 || port.v === 17) {
				self.freq = Math.round(freq.v);
				if (self.freq === 64000000) {
					Timers['Timer_' + self.port] = {
						port: self.port,
						freq: 64000000,
						prescaler: 0,
						period: 0,
						mode: $loc.UP.v,
						div: 1,
						deadtime: 0,
						brk: $loc.BRK_OFF.v
					}
				} else {
					Timers['Timer_' + self.port] = {
						port: self.port,
						freq: self.freq,
						prescaler: 0,
						period: 1,
						mode: $loc.UP.v,
						div: 1,
						deadtime: 127,
						brk: $loc.BRK_HIGH.v
					}
				}
			} else {
				throw new Sk.builtin.ValueError("Timer(" + port.v + ") doesn't exist");
			}
		};

		Timer__init__.co_varnames = ['self', 'id', 'freq'];
		Timer__init__.$defaults = [new Sk.builtin.int_(64000000)];

		$loc.__init__ = new Sk.builtin.func(Timer__init__);

		$loc.init = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("'init' argument of 'Timer' is not yet implemented");
		});

		$loc.deinit = new Sk.builtin.func(function (self) {
			self.init = false;
			setTimeout(function () {
				$('#' + self.id + '_value').html("0");
				$('#' + self.id + '_anim').css('opacity', 0);
			}, 1000)
		});

		var TimmerChannel = new Sk.misceval.buildClass({}, function ($gbl, $loc1) {

			const startPWM = function (self) {
				const frequency = Timers['Timer_' + self.timer.port].freq;
				const module = Simulator.getModuleByKey(self.id.split('_')[0]);
				if (Simulator.intervals[self.id]) {
					clearInterval(Simulator.intervals[self.id]);
				}
				if (frequency < 50 && self.id != 'continuousServo') {
					if (frequency <= 20) {
						function start() {
							Simulator.intervals[self.id] = setInterval(function () {
								$('#' + self.id + '_value').html(frequency + " Hz");
								$('#' + self.id + '_anim').css('opacity', self.state ? 1 : 0);
								self.state = !self.state;
								if (!self.init && module !== undefined && module.animate !== undefined) {
									clearInterval(Simulator.intervals[self.id]);
									Simulator.setAnimator(module, self.id, 0);
								}
							}, 1 / frequency * 1000);
						};
						start();
					} else {
						if (module !== undefined && module.animate !== undefined) {
							Simulator.setAnimator(module, self.id, self.pulse_width);
						} else {
							$('#' + self.id + '_value').html(frequency + " Hz");
							$('#' + self.id + '_anim').css('opacity', "0.5");
						}
					}
				} else {
					if (module !== undefined && module.animate !== undefined) {
						Simulator.setAnimator(module, self.id, self.pulse_width);
					} else {
						$('#' + id + '_value').html(self.pulse_width == 0 ? "OFF" : self.pulse_width);
						$('#' + id + '_anim').css('opacity', self.pulse_width_percent);
					}
				}
			};

			TimmerChannel__init__ = function (self, channel, mode, Pin, pulse_width_percent) {
				Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 5);
				Sk.builtin.pyCheckType("mode", "integer", Sk.builtin.checkInt(mode));
				Sk.builtin.pyCheckType("channel", "integer", Sk.builtin.checkInt(channel));
				Sk.builtin.pyCheckType("pulse_width_percent", "integer or float", Sk.builtin.checkNumber(pulse_width_percent));
				self.channel = channel.v;
				self.mode = mode.v;
				self.init = true;
				self.state = true;
				self.pulse_width_percent = 0;
				self.pulse_width = 0;
				if ([1, 2, 3, 4, 5].includes(self.channel)) {
					self.pulse_width_percent = pulse_width_percent.v;
					self.pulse_width = self.pulse_width_percent / 100 * PWM_MAX_DUTY;
					if (!Sk.builtin.checkNone(Pin)) {
						self.pin = Pin.pin;
						const component = Simulator.pinList.find((component) => component.pin == self.pin);
						if (component !== undefined) {
							self.id = component.id;
						}
						if (self.mode == $loc.PWM.v && self.id !== undefined) {
							startPWM(self);
						}
					}
					return Sk.builtin.none();
				} else {
					throw new Sk.builtin.ValueError("invalid channel (" + self.channel + ")");
				}
			};

			TimmerChannel__init__.co_varnames = ['self', 'channel', 'mode', 'pin', 'pulse_width_percent'];
			TimmerChannel__init__.$defaults = [$loc.UP, Sk.builtin.none(), new Sk.builtin.float_(0)];
			$loc1.__init__ = new Sk.builtin.func(TimmerChannel__init__)

			$loc1.callback = new Sk.builtin.func(function (self) {
				throw new Sk.builtin.NotImplementedError("'callback' argument of 'TimerChannel' is not yet implemented");
			});

			$loc1.pulse_width = new Sk.builtin.func(function (self, pulse_width) {
				if (pulse_width !== undefined) {
					Sk.builtin.pyCheckType("pulse_width", "integer", Sk.builtin.checkInt(pulse_width));
					self.pulse_width = pulse_width.v;
					self.pulse_width_percent = self.pulse_width / PWM_MAX_DUTY * 100;
					startPWM(self);
				} else {
					return new Sk.builtin.float_(self.pulse_width);
				}
			});

			$loc1.pulse_width_percent = new Sk.builtin.func(function (self, pulse_width_percent) {
				if (pulse_width_percent !== undefined) {
					Sk.builtin.pyCheckType("pulse_width_percent", "integer or float", Sk.builtin.checkNumber(pulse_width_percent));
					self.pulse_width_percent = pulse_width_percent.v;
					self.pulse_width = self.pulse_width_percent / 100 * PWM_MAX_DUTY;
					startPWM(self);
				} else {
					return new Sk.builtin.float_(self.pulse_width_percent);
				}
			});

			$loc1.capture = new Sk.builtin.func(function (self) {
				throw new Sk.builtin.NotImplementedError("'capture' argument of 'TimerChannel' is not yet implemented");
			});

			$loc1.compare = new Sk.builtin.func(function (self) {
				throw new Sk.builtin.NotImplementedError("'compare' argument of 'TimerChannel' is not yet implemented");
			});
		}, "TimmerChannel", []);

		var channel = function (self, channelIndex, mode, Pin, pulse_width_percent) {
			var ch = new TimmerChannel();
			ch.timer = self;
			ch.tp$init([channelIndex, mode, Pin, pulse_width_percent])
			return ch;
		};

		channel.co_varnames = ['self', 'channel', 'mode', 'pin', 'pulse_width_percent'];
		channel.$defaults = [$loc.UP, Sk.builtin.none(), new Sk.builtin.float_(0)];

		$loc.channel = new Sk.builtin.func(channel);

		$loc.counter = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("'channel' argument of 'Timer' is not yet implemented");
		});

		$loc.source_freq = new Sk.builtin.func(function (self) {
			return new Sk.builtin.int_(64000000);
		});

		var freq = function (self, frequency) {
			if (Sk.builtin.checkNone(frequency)) {
				return new Sk.builtin.int_(self.freq);
			} else {
				Sk.builtin.pyCheckType("frequency", "integer or float", Sk.builtin.checkNumber(frequency));
				self.freq = frequency.v;
				Timers['Timer_' + self.port].freq = self.freq;
			}
		};
		freq.co_varnames = ['self', 'frequency'];
		freq.$defaults = [Sk.builtin.none()];
		$loc.freq = new Sk.builtin.func(freq);

		$loc.prescaler = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("'prescaler' argument of 'Timer' is not yet implemented");
		});

		$loc.period = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("'period' argument of 'Timer' is not yet implemented");
		});

		$loc.callback = new Sk.builtin.func(function (self) {
			throw new Sk.builtin.NotImplementedError("'callback' argument of 'Timer' is not yet implemented");
		});
	});

	pyb.ADC = new Sk.misceval.buildClass(pyb, function ($gbl, $loc) {

		ADC__init__ = function (self, pin) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			Sk.builtin.pyCheckType("pin", "string", Sk.builtin.checkString(pin));
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

		$loc.read = new Sk.builtin.func(function (self) {
			const mod = Simulator.getModuleByKey(self.id.split('_')[0]);
			const suffix = mod.listeners[0].suffix || "";
			const value = parseInt($("#" + self.id + "_slider" + suffix).slider('option', 'value'));
			return new Sk.builtin.int_(value);
		});

		$loc.read_timed = new Sk.builtin.func(function (self, var1, var2) {
			Sk.builtin.pyCheckArgsLen("read_timed", arguments.length, 3, 3);
			throw new Sk.builtin.NotImplementedError("pyb.ADC.read_timed() is not yet implemented");
		});

		$loc.read_timed_multi = new Sk.builtin.func(function (self, var1, var2, var3) {
			Sk.builtin.pyCheckArgsLen("read_timed_multi", arguments.length, 3, 4);
			Sk.builtin.pyCheckType("var1", "iterable", Sk.builtin.checkIterable(var1));
			throw new Sk.builtin.NotImplementedError("pyb.ADC.read_timed_multi() is not yet implemented");
		});

	});

	pyb.LED = new Sk.misceval.buildClass(pyb, function ($gbl, $loc) {

		const LED = ["3", "2", "1"]; // Temp inversion - waiting firmware

		LED__init__ = function (self, led) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 2);
			Sk.builtin.pyCheckType("led", "integer", Sk.builtin.checkInt(led));
			self.led = LED[led.v - 1];
			self.state = 0;
			self.intensity = 0;
		};

		LED__init__.co_varnames = ['self', 'led'];
		LED__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(LED__init__);

		$loc.on = new Sk.builtin.func(function (self) {
			self.state = 1;
			self.intensity = 255;
			const module = Simulator.getModuleByKey('stm32-led' + self.led);
			Simulator.setAnimator(module, module.id, self.state);

		});

		$loc.off = new Sk.builtin.func(function (self) {
			self.state = 0;
			self.intensity = 0;
			const module = Simulator.getModuleByKey('stm32-led' + self.led);
			Simulator.setAnimator(module, module.id, self.state);
		});

		$loc.toggle = new Sk.builtin.func(function (self) {
			if (!self.state) {
				self.state = 1;
				self.intensity = 255;
			} else {
				self.state = 0;
				self.intensity = 0;
			}
			const module = Simulator.getModuleByKey('stm32-led' + self.led);
			Simulator.setAnimator(module, module.id, self.state);
		});

		$loc.intensity = new Sk.builtin.func(function (self, value) {
			Sk.builtin.pyCheckArgsLen("intensity", arguments.length, 1, 2);
			if (value !== undefined) {
				Sk.builtin.pyCheckType("value", "integer", Sk.builtin.checkInt(value));
				if (value.v > 0) {
					self.intensity = 255;
					self.state = 1;
				} else {
					self.intensity = 0;
					self.state = 0;
				}
				const module = Simulator.getModuleByKey('stm32-led' + self.led);
				Simulator.setAnimator(module, module.id, self.state);
				return Sk.builtin.none();
			} else {
				return new Sk.builtin.int_(self.intensity);
			}
		});

	});

	return pyb;
};
