// Pico - machine module

var $builtinmodule = function (name) {

	//Displays the board if there is no robot
	if ($('#simulator-board-toggler').hasClass('closed') && Simulator.Mosaic.getCurrentRobot() === null) {
		Simulator.toggleBoardDisplay();
	}

	var machine = {};

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
			} else if (self.pin === 25) {
				self.id = "pico-builtin-led";
			}
			switch (self.pull) {
				case $loc.PULL_UP.v:
					Simulator.Components.Button.setPull(self.id, 'up');
					break;
				case $loc.PULL_DOWN.v:
				default:
					Simulator.Components.Button.setPull(self.id, 'down');
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
					Simulator.Components.Button.setPull(self.id, 'up');
					break;
				case $loc.PULL_DOWN.v:
				default:
					Simulator.Components.Button.setPull(self.id, 'down');
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

		$loc.__str__ = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str(`Pin(${self.pin})`);
		});

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

		$loc.read_u16 = new Sk.builtin.func(function (self) {
			const mod = Simulator.getModuleByKey(self.id.split('_')[0]);
			if (mod && mod.id.includes('joystick')) {
				const value = Simulator.Components.Joystick.read(self.id, self.pin);
				return new Sk.builtin.int_(value);
			} else {
				const suffix = mod.listeners ? mod.listeners[0].suffix : "";
				const value = $("#" + self.id + "_slider" + suffix).slider('option', 'value');
				return new Sk.builtin.int_(value);
			}
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
							if (!self.init) {
								clearInterval(Simulator.intervals[self.id]);
								$('#' + self.id + '_value').html("0");
								$('#' + self.id + '_anim').css('opacity', 0);
							}
						}, 1 / self.freq * 1000);
					};
					start();
				} else {
					if (module !== undefined && module.animate !== undefined) {
						Simulator.setAnimator(module, self.id, self.duty_u16);
					} else {
						$('#' + self.id + '_value').html(self.freq + " Hz");
						$('#' + self.id + '_anim').css('opacity', "0.5");
					}
				}
			} else {
				if (module !== undefined && module.animate !== undefined) {
					Simulator.setAnimator(module, self.id, self.duty_u16);
				} else {
					$('#' + id + '_value').html(self.duty_u16 == 0 ? "OFF" : self.duty_u16);
					$('#' + id + '_anim').css('opacity', self.duty_u16 / PWM_MAX_DUTY);
				}
			}
		};

		PWM__init__ = function (self, Pin, freq, duty_u16) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 5);
			Sk.builtin.pyCheckType("freq", "integer", Sk.builtin.checkInt(freq));
			Sk.builtin.pyCheckType("duty_u16", "integer", Sk.builtin.checkInt(duty_u16));
			if (Pin !== undefined && Pin.pin !== undefined) {
				self.Pin = Pin;
				self.freq = freq.v;
				self.duty_u16 = duty_u16.v;
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

		PWM__init__.co_varnames = ['self', 'Pin', 'freq', 'duty_u16'];
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

		$loc.duty_u16 = new Sk.builtin.func(function (self, duty_u16) {
			if (duty_u16 !== undefined) {
				Sk.builtin.pyCheckType("duty_u16", "integer", Sk.builtin.checkInt(duty_u16));
				self.duty_u16 = duty_u16.v;
				startPWM(self);
			} else {
				return new Sk.builtin.int_(self.duty_u16);
			}
		});

	});

	machine.I2C = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		I2C__init__ = function (self, id, scl, sda, addr) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 5);
			// Sk.builtin.pyCheckType("freq", "integer", Sk.builtin.checkInt(freq));
			if (scl.pin && sda.pin) {
				self.id = id;
				self.scl = scl;
				self.sda = sda;
				// self.freq = freq.v;
				self.addr = addr;
			} else {
				// TODO: print error
			}
		};

		I2C__init__.co_varnames = ['self', 'id', 'scl', 'sda', 'addr'];
		I2C__init__.$defaults = [new Sk.builtin.int_(5000)];

		$loc.__init__ = new Sk.builtin.func(I2C__init__);

	});

	machine.SoftI2C = machine.I2C;

	machine.UART = new Sk.misceval.buildClass(machine, function ($gbl, $loc) {

		// pin
		$loc.INV_TX = new Sk.builtin.int_(32);
		$loc.INV_RX = new Sk.builtin.int_(4);
		$loc.INV_RTS = new Sk.builtin.int_(64);
		$loc.INV_CTS = new Sk.builtin.int_(8);
		$loc.RTS = new Sk.builtin.int_(1);
		$loc.CTS = new Sk.builtin.int_(2);
		// irq
		$loc.IRQ_RX = new Sk.builtin.int_(1);
		$loc.IRQ_RXIDLE = new Sk.builtin.int_(4096);
		$loc.IRQ_BREAK = new Sk.builtin.int_(2);

		UART__init__ = function (self, port, baudrate, bits, parity, stop, tx, rx, rts, cts, txbuf, rxbuf, timeout, timeout_char, irq) {

			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 2, 15);
			Sk.builtin.pyCheckType("port", "integer", Sk.builtin.checkInt(port));
			Sk.builtin.pyCheckType("baudrate", "integer", Sk.builtin.checkInt(baudrate));
			Sk.builtin.pyCheckType("bits", "integer", Sk.builtin.checkInt(bits));
			//Sk.builtin.pyCheckType("parity", "integer", Sk.builtin.checkInt(parity));
			Sk.builtin.pyCheckType("stop", "integer", Sk.builtin.checkInt(stop));
			Sk.builtin.pyCheckType("rts", "integer", Sk.builtin.checkInt(rts));
			Sk.builtin.pyCheckType("cts", "integer", Sk.builtin.checkInt(cts));
			Sk.builtin.pyCheckType("txbuf", "integer", Sk.builtin.checkInt(txbuf));
			Sk.builtin.pyCheckType("rxbuf", "integer", Sk.builtin.checkInt(rxbuf));
			Sk.builtin.pyCheckType("timeout", "integer", Sk.builtin.checkInt(timeout));
			Sk.builtin.pyCheckType("timeout_char", "integer", Sk.builtin.checkInt(timeout_char));
			Sk.builtin.pyCheckType("irq", "integer", Sk.builtin.checkInt(irq));
			if (![0, 1].includes(port.v)) {
				throw new Sk.builtin.ValueError("UART(" + port.v + ") does not exist");
			}
			if (Sk.builtin.checkInt(rx) || Sk.builtin.checkInt(tx)) {
				throw new Sk.builtin.ValueError("rx or tx must be Pin type");
			}
			if (Sk.builtin.checkNone(tx)) {
				if (port.v == 0) tx = Sk.misceval.callsim(machine.Pin, new Sk.builtin.int_(0));
				else if (port.v == 1) tx = Sk.misceval.callsim(machine.Pin, new Sk.builtin.int_(4));
			}
			if (Sk.builtin.checkNone(rx)) {
				if (port.v == 0) rx = Sk.misceval.callsim(machine.Pin, new Sk.builtin.int_(1));
				else if (port.v == 1) rx = Sk.misceval.callsim(machine.Pin, new Sk.builtin.int_(5));
			}
			self.module = Simulator.Mosaic.uart_updateTitle(port.v, rx.pin, tx.pin);
		};

		UART__init__.co_varnames = ['self', 'port', 'baudrate', 'bits', 'parity', 'stop', 'tx', 'rx', 'rts', 'cts', 'txbuf', 'rxbuf', 'timeout', 'timeout_char', 'irq'];
		UART__init__.$defaults = [new Sk.builtin.int_(115200), new Sk.builtin.int_(8), Sk.builtin.none(), new Sk.builtin.int_(1), Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.int_(-1), new Sk.builtin.int_(-1), new Sk.builtin.int_(256), new Sk.builtin.int_(256), new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.int_(0)];

		$loc.__init__ = new Sk.builtin.func(UART__init__);

		const component_write = function (self, buffer) {
			console.log(buffer)
			console.log(self.module)
			if (!buffer) return;
			if (['hc05', 'hm10', 'groveBT'].includes(self.module.mod.id)) {
				BluetoothSimulator.sendBluetoothData(buffer);
				const date = new Date();
				var s = '';
				if (date.getSeconds() < 10) {
					s = "0" + date.getSeconds();
				} else {
					s = date.getSeconds();
				}
				const strClock = date.getHours() + ":" + date.getMinutes() + ":" + s;
				InterfaceMonitor.writeConsole(strClock + " - Donnée envoyée par bluetooth : '" + buffer + "'\n");
				Simulator.setAnimator(self.module.mod, self.module.pin.id, 'write:' + buffer.length);
			}
			else if (self.module.mod.id == 'openlog') {
				Simulator.setAnimator(self.module.mod, self.module.pin.id);
			}
		};

		$loc.init = new Sk.builtin.func(function (self) {
			self.init = true;
			return new Sk.builtin.bool(true);
		});

		$loc.deinit = new Sk.builtin.func(function (self) {
			self.init = false;
			return new Sk.builtin.bool(true);
		});

		$loc.flush = new Sk.builtin.func(function (self) {
			if (['hc05', 'hm10', 'groveBT'].includes(self.module.mod.id)) {
				BluetoothSimulator.checkBluetoothData('flush', self.module.pin.id);
			}
			return new Sk.builtin.bool(true);
		});

		const _read = function (self, isForString) {
			if (['hc05', 'hm10', 'groveBT'].includes(self.module.mod.id)) {
				return BluetoothSimulator.checkBluetoothData('read', self.module.pin.id, isForString);
			}
			else if (self.module.mod.id == 'mhz19') {
				return self._rx_buffer.shift();
			}
			else if (self.module.mod.id == 'gps') {
				return self._rx_buffer;
			}
			return "";
		};

		$loc.read = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str(_read(self, true));
		});

		$loc.readline = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str(_read(self, true));
		});

		$loc.readinto = new Sk.builtin.func(function (self) {
		});

		$loc.write = new Sk.builtin.func(function (self, buffer) {
			component_write(self, buffer.v);
		});

		$loc.any = new Sk.builtin.func(function (self) {
			if (['hc05', 'hm10', 'groveBT'].includes(self.module.mod.id)) {
				const n = BluetoothSimulator.checkBluetoothData('available', self.module.pin.id);
				return new Sk.builtin.int_(n);
			} else if (self.module.mod.id == 'mhz19') {
				if (self._rx_buffer.length == 1) {
					self._rx_buffer = Simulator.Mosaic.grove.calculs.getMHZ19Data(Simulator.getSliderValue('mhz19-co2'), Simulator.getSliderValue('mhz19-temp'));
					return new Sk.builtin.int_(0);
				}
				return new Sk.builtin.int_(self._rx_buffer.length - 1);
			} else if (self.module.mod.id == 'gps') {
				self._rx_buffer = Simulator.Components.GPS.generateNMEAGGA(self.module.pin.id);
				return new Sk.builtin.int_(self._rx_buffer.length);
			}
			return new Sk.builtin.int_(0);
		});

		$loc.txdone = new Sk.builtin.func(function (self) {
		});

		$loc.irq = new Sk.builtin.func(function (self) {
		});

	});

	return machine;
};