// TI-83 & micro:bit

var Keymap = {}; // You could also use an array
var uart = function (name) {
	var mod = {};
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
	})
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

var i2c = function (name) {
	var mod = {};

	var read = function (addr, n, repeat) {
		if (repeat === undefined) {
			repeat = new Sk.builtin.bool(false);
		}
	};
	read.co_varnames = ['addr', 'n', 'repeat'];
	read.$defaults = [Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.bool(false)];
	read.co_numargs = 3;
	mod.read = new Sk.builtin.func(read);

	var write = function (addr, buf, repeat) {
		if (repeat === undefined) {
			repeat = new Sk.builtin.bool(false);
		}
	};
	write.co_varnames = ['addr', 'buf', 'repeat'];
	write.$defaults = [Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.bool(false)];
	write.co_numargs = 3;
	mod.write = new Sk.builtin.func(write);

	return mod;
};

var $builtinmodule = function (name) {
	// microbit module
	var mod = {};

	mod.panic = new Sk.builtin.func(function (n) {
		Simulator.monitor.output("Panic mode: " + n.v);
	});

	mod.reset = new Sk.builtin.func(function () {
		Simulator.startTime = Date.now();
	});

	mod.running_time = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(Date.now() - Simulator.startTime);
	});

	mod.sleep = new Sk.builtin.func(function (delay) {
		if (delay !== undefined) {
			if (Sk.builtin.checkNumber(delay)) {
				return Simulator.sleep_ms(Sk.ffi.remapToJs(delay));
			} else {
				Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction sleep()", "can't convert 'int' object to str implicity", 'TypeError');
			}
		} else {
			Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'duration' à la fonction sleep() ", "function takes 1 positional arguments but 0 were given.", 'TypeError');
		}
	});

	mod.escape = new Sk.builtin.func(function () {
		if (Simulator.Mosaic.specific.ti.annulClicked) {
			Simulator.Mosaic.specific.ti.annulClicked = false;
			return new Sk.builtin.bool(true);
		}
		return new Sk.builtin.bool(false);
	});

	// var ioPinTouch = new Sk.misceval.buildClass(mod, function ($gbl, $loc) {
	// 	$loc.__init__ = new Sk.builtin.func(function (self) {
	// 		self.touched = false;
	// 		self.value = 0;
	// 	});

	// 	/**
	// 	 * Input modules initialization (#TOUCH_PIN)
	// 	 */

	// 	$loc.read_digital = new Sk.builtin.func(function (self) {
	// 		return new Sk.builtin.int_($('#read-digital_' + self.name + '_slider').slider('value'));
	// 	});
	// 	$loc.read_analog = new Sk.builtin.func(function (self) {
	// 		let value = parseInt($('#read-analog_' + self.name + '_value').html());
	// 		return new Sk.builtin.int_(value);
	// 	});
	// 	$loc.is_touched = new Sk.builtin.func(function (self) {
	// 		return new Sk.builtin.bool(self.touched);
	// 	});

	// 	/**
	// 	 * Output modules initialization (#TOUCH_PIN)
	// 	 */

	// 	$loc.write_digital = new Sk.builtin.func(function (self, state) {
	// 		self.value = state.v == 1 ? 1 : 0;
	// 		$('#write-digital_' + self.name + '_anim').css('opacity', self.value);
	// 		Simulator.updatePinValues(self.name, self.value == 1 ? "ON" : "OFF");
	// 	});
	// 	$loc.write_analog = new Sk.builtin.func(function (self, value) {
	// 		self.value = value.v;
	// 		$('#write-analog_' + self.name + '_anim').css('opacity', (self.value / 1023));
	// 		Simulator.updatePinValues(self.name, self.value);
	// 	});
	// 	$loc.set_analog_period = new Sk.builtin.func(function (self, period) {
	// 		self.period_us = period.v * 1000;
	// 	});
	// 	$loc.set_analog_period_microseconds = new Sk.builtin.func(function (self, period) {
	// 		self.period_us = period.v;
	// 	});

	// }, "MicroBitTouchPin", []);

	// mod.pin0 = new ioPinTouch();
	// mod.pin0.name = 'P0'
	// mod.pin1 = new ioPinTouch();
	// mod.pin1.name = 'P1'
	// mod.pin2 = new ioPinTouch();
	// mod.pin2.name = 'P2'
	// mod.pin_logo = new ioPinTouch();
	// mod.pin_logo.name = 'pin_logo'

	// var ioPinSpeaker = new Sk.misceval.buildClass(mod, function ($gbl, $loc) {

	// }, "MicroBitSpeakerPin", []);

	// mod.pin_speaker = new ioPinSpeaker();
	// mod.pin_speaker.name = 'speaker'

	var Image = function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function (self, str, y) {
			if (str === undefined | y !== undefined) str = new Sk.builtin.str("00000:00000:00000:00000:00000");
			self.lines = str.v.split(/[:\n]/);
		});

		$loc.width = new Sk.builtin.func(function (self) {
			return self.lines[0].length;
		});

		$loc.height = new Sk.builtin.func(function (self) {
			return self.lines.length;
		});

		$loc.set_pixel = new Sk.builtin.func(function (self, x, y, value) {
			var row = self.lines[y.v].split("");
			row[x.v] = value.v;
			self.lines[y.v] = row.join("");
		});

		$loc.get_pixel = new Sk.builtin.func(function (self, x, y) {
			return new Sk.builtin.int_(self.lines[y.v][x.v]);
		});

		$loc.__repr__ = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str('Image("' + self.lines.join(":") + '")');
		});

		$loc.__str__ = new Sk.builtin.func(function (self) {
			return new Sk.builtin.str('Image("' + self.lines.join(":") + '")');
		});

		$loc.shift_left = new Sk.builtin.func(function (self, n) {
			if (n == undefined) {
				throw new Sk.builtin.TypeError("parameter n not defined");
			}
			var copy = self.lines.slice(0);
			for (var j = 0; j < n.v; j++) {
				var width = copy[0].length;
				for (var i = 0; i < copy.length; i++) {
					copy[i] = copy[i].slice(1, width) + "0";
				}
			}

			var newImage = Sk.misceval.callsim(mod.Image, new Sk.builtin.str(copy.join(":")));
			return newImage;
		});

		$loc.shift_right = new Sk.builtin.func(function (self, n) {
			if (n == undefined) {
				throw new Sk.builtin.TypeError("parameter n not defined");
			}
			var copy = self.lines.slice(0);
			for (var j = 0; j < n.v; j++) {
				var width = copy[0].length;
				for (var i = 0; i < copy.length; i++) {
					copy[i] = "0" + copy[i].slice(0, width - 1);
				}
			}
			var newImage = Sk.misceval.callsim(mod.Image, new Sk.builtin.str(copy.join(":")));
			return newImage;
		});

		$loc.shift_up = new Sk.builtin.func(function (self, n) {
			if (n == undefined) {
				throw new Sk.builtin.TypeError("parameter n not defined");
			}
			var height = self.lines.length;
			var copy = self.lines.slice(n.v, height);
			var s = "";
			for (var j = 0; j < n.v; j++) {
				for (var i = 0; i < self.lines[0].length; i++) {
					s += "0";
				}
				copy.push(s);
			}
			var newImage = Sk.misceval.callsim(mod.Image, new Sk.builtin.str(copy.join(":")));
			return newImage;
		});

		$loc.shift_down = new Sk.builtin.func(function (self, n) {
			if (n == undefined) {
				throw new Sk.builtin.TypeError("parameter n not defined");
			}
			var height = self.lines.length;
			var copy = [];

			var s = "";
			for (var j = 0; j < n.v; j++) {
				for (var i = 0; i < self.lines[0].length; i++) {
					s += "0";
				}
				copy.push(s);

			}
			copy.push.apply(copy, self.lines.slice(0, height - 1));
			var newImage = Sk.misceval.callsim(mod.Image, new Sk.builtin.str(copy.join(":")));
			return newImage;
		});

		$loc.__add__ = new Sk.builtin.func(function (self, other) {
			var x, y, val;
			var copy = self.lines.slice(0);
			for (y = 0; y < copy.length; y++) {
				copy[y] = copy[y].split("");
				for (x = 0; x < copy[y].length; x++) {
					val = parseInt(copy[y][x]) + parseInt(other.lines[y][x]);

					if (val > 9) val = 9;
					copy[y][x] = val;
				}
				copy[y] = copy[y].join("");
			}
			var newImage = Sk.misceval.callsim(mod.Image, new Sk.builtin.str(copy.join(":")));
			return newImage;
		});

		$loc.__mul__ = new Sk.builtin.func(function (self, n) {
			var copy = self.lines.slice(0);
			for (y = 0; y < copy.length; y++) {
				copy[y] = copy[y].split("");
				for (x = 0; x < copy[y].length; x++) {
					val = Math.round(parseInt(copy[y][x]) * n.v);
					if (val < 0) val = 0;
					if (val > 9) val = 9;
					copy[y][x] = val;
				}
				copy[y] = copy[y].join("");
			}
			var newImage = Sk.misceval.callsim(mod.Image, new Sk.builtin.str(copy.join(":")));
			return newImage;
		});

		$loc.invert = new Sk.builtin.func(function (self) {
			var copy = self.lines.slice(0);
			for (y = 0; y < copy.length; y++) {
				copy[y] = copy[y].split("");
				for (x = 0; x < copy[y].length; x++) {
					val = parseInt(copy[y][x]);
					copy[y][x] = 9 - val;
				}
				copy[y] = copy[y].join("");
			}
			var newImage = Sk.misceval.callsim(mod.Image, new Sk.builtin.str(copy.join(":")));
			return newImage;
		});

		$loc.HEART = new Sk.builtin.str("09090:99999:99999:09990:00900");
		$loc.HEART_SMALL = new Sk.builtin.str("00000:09090:09990:00900:00000");
		$loc.HAPPY = new Sk.builtin.str("00000:09090:00000:90009:09990");
		$loc.SMILE = new Sk.builtin.str("00000:00000:00000:90009:09990");
		$loc.SAD = new Sk.builtin.str("00000:09090:00000:09990:90009");
		$loc.CONFUSED = new Sk.builtin.str("00000:09090:00000:09090:90909");
		$loc.ANGRY = new Sk.builtin.str("90009:09090:00000:99999:90909");
		$loc.ASLEEP = new Sk.builtin.str("00000:99099:00000:09990:00000");
		$loc.SURPRISED = new Sk.builtin.str("09090:00000:00900:09090:00900");
		$loc.SILLY = new Sk.builtin.str("90009:00000:99999:00909:00999");
		$loc.FABULOUS = new Sk.builtin.str("99999:99099:00000:09090:09990");
		$loc.MEH = new Sk.builtin.str("09090:00000:00090:00900:09000");
		$loc.YES = new Sk.builtin.str("00000:00009:00090:90900:09000");
		$loc.NO = new Sk.builtin.str("90009:09090:00900:09090:90009");
		$loc.CLOCK12 = new Sk.builtin.str("00900:00900:00900:00000:00000");
		$loc.CLOCK1 = new Sk.builtin.str("00090:00090:00900:00000:00000");
		$loc.CLOCK2 = new Sk.builtin.str("00000:00099:00900:00000:00000");
		$loc.CLOCK3 = new Sk.builtin.str("00000:00000:00999:00000:00000");
		$loc.CLOCK4 = new Sk.builtin.str("00000:00000:00900:00099:00000");
		$loc.CLOCK5 = new Sk.builtin.str("00000:00000:00900:00090:00090");
		$loc.CLOCK6 = new Sk.builtin.str("00000:00000:00900:00900:00900");
		$loc.CLOCK7 = new Sk.builtin.str("00000:00000:00900:09000:09000");
		$loc.CLOCK8 = new Sk.builtin.str("00000:00000:00900:99000:00000");
		$loc.CLOCK9 = new Sk.builtin.str("00000:00000:99900:00000:00000");
		$loc.CLOCK10 = new Sk.builtin.str("00000:99000:00900:00000:00000");
		$loc.CLOCK11 = new Sk.builtin.str("09000:09000:00900:00000:00000");
		$loc.ARROW_N = new Sk.builtin.str("00900:09990:90909:00900:00900");
		$loc.ARROW_NE = new Sk.builtin.str("00999:00099:00909:09000:90000");
		$loc.ARROW_E = new Sk.builtin.str("00900:00090:99999:00090:00900");
		$loc.ARROW_SE = new Sk.builtin.str("90000:09000:00909:00099:00999");
		$loc.ARROW_S = new Sk.builtin.str("00900:00900:90909:09990:00900");
		$loc.ARROW_SW = new Sk.builtin.str("00009:00090:90900:99000:99900");
		$loc.ARROW_W = new Sk.builtin.str("00900:09000:99999:09000:00900");
		$loc.ARROW_NW = new Sk.builtin.str("99900:99000:90900:00090:00009");
		$loc.TRIANGLE = new Sk.builtin.str("00000:00900:09090:99999:00000");
		$loc.TRIANGLE_LEFT = new Sk.builtin.str("90000:99000:90900:90090:99999");
		$loc.CHESSBOARD = new Sk.builtin.str("09090:90909:09090:90909:09090");
		$loc.DIAMOND = new Sk.builtin.str("00900:09090:90009:09090:00900");
		$loc.DIAMOND_SMALL = new Sk.builtin.str("00000:00900:09090:00900:00000");
		$loc.SQUARE = new Sk.builtin.str("99999:90009:90009:90009:99999");
		$loc.SQUARE_SMALL = new Sk.builtin.str("00000:09990:09090:09990:00000");
		$loc.RABBIT = new Sk.builtin.str("90900:90900:99990:99090:99990");
		$loc.COW = new Sk.builtin.str("90009:90009:99999:09990:00900");
		$loc.MUSIC_CROTCHET = new Sk.builtin.str("00900:00900:00900:99900:99900");
		$loc.MUSIC_QUAVER = new Sk.builtin.str("00900:00990:00909:99900:99900");
		$loc.MUSIC_QUAVERS = new Sk.builtin.str("09999:09009:09009:99099:99099");
		$loc.PITCHFORK = new Sk.builtin.str("90909:90909:99999:00900:00900");
		$loc.XMAS = new Sk.builtin.str("00900:09990:00900:09990:99999");
		$loc.PACMAN = new Sk.builtin.str("09999:99090:99900:99990:09999");
		$loc.TARGET = new Sk.builtin.str("00900:09990:99099:09990:00900");
		$loc.TSHIRT = new Sk.builtin.str("99099:99999:09990:09990:09990");
		$loc.ROLLERSKATE = new Sk.builtin.str("00099:00099:99999:99999:09090");
		$loc.DUCK = new Sk.builtin.str("09900:99900:09999:09990:00000");
		$loc.HOUSE = new Sk.builtin.str("00900:09990:99999:09990:09090");
		$loc.TORTOISE = new Sk.builtin.str("00000:09990:99999:09090:00000");
		$loc.BUTTERFLY = new Sk.builtin.str("99099:99999:00900:99999:99099");
		$loc.STICKFIGURE = new Sk.builtin.str("00900:99999:00900:09090:90009");
		$loc.GHOST = new Sk.builtin.str("99999:90909:99999:99999:90909");
		$loc.SWORD = new Sk.builtin.str("00900:00900:00900:09990:00900");
		$loc.GIRAFFE = new Sk.builtin.str("99000:09000:09000:09990:09090");
		$loc.SKULL = new Sk.builtin.str("09990:90909:99999:09990:09990");
		$loc.UMBRELLA = new Sk.builtin.str("09990:99999:00900:90900:09900");
		$loc.SNAKE = new Sk.builtin.str("99000:99099:09090:09990:00000");

		$loc.ALL_CLOCKS = new Sk.builtin.list([$loc.CLOCK1, $loc.CLOCK2, $loc.CLOCK3, $loc.CLOCK4, $loc.CLOCK5, $loc.CLOCK6, $loc.CLOCK7, $loc.CLOCK8, $loc.CLOCK9, $loc.CLOCK10, $loc.CLOCK11, $loc.CLOCK12]);
		$loc.ALL_ARROWS = new Sk.builtin.list([$loc.ARROW_N, $loc.ARROW_NE, $loc.ARROW_E, $loc.ARROW_SE, $loc.ARROW_S, $loc.ARROW_SW, $loc.ARROW_W, $loc.ARROW_NW]);

	};

	mod.Image = new Sk.misceval.buildClass(mod, Image, 'Image', []);

	// Microbit modules initialization
	mod.i2c = new Sk.builtin.module();
	mod.i2c.$d = new i2c("microbit.i2c");

	mod.uart = new Sk.builtin.module();
	mod.uart.$d = new uart("microbit.uart");

	// Input modules

	mod.microphone = new Sk.builtin.module();
	mod.microphone.$d = new Simulator.Behaviours.input.microphone();

	mod.serialInput = new Sk.builtin.module();
	mod.serialInput.$d = new Simulator.Behaviours.input.serialInput();

	mod.light = new Sk.builtin.module();
	mod.light.$d = new Simulator.Behaviours.input.light();

	mod.thermometer = new Sk.builtin.module();
	mod.thermometer.$d = new Simulator.Behaviours.input.thermometer();

	mod.compass = new Sk.builtin.module();
	mod.compass.$d = new Simulator.Behaviours.input.compass();

	// Output modules

	mod.display = new Sk.builtin.module();
	mod.display.$d = new Simulator.Behaviours.output.display();

	mod.disp_clr = new Sk.builtin.func(function () {
		Simulator.Mosaic.specific.ti.shell = "";
		$("#ti_screen-value").html(Simulator.Mosaic.specific.ti.shell);
		Simulator.Mosaic.specific.ti.clearScreen(true);
	});

	var MicrobitButton = new Sk.misceval.buildClass(mod, function ($gbl, $loc) {

		MicrobitButton__init__ = function (self, btn) {
			self.state = false;
			self.presses = 0;
			self.last_check = 0;
			self.btn = btn.v;
			$(`#mb_btn_${(self.btn).toUpperCase()}`).on("mousedown mouseup click", function (e) {
				const btn = $(this).attr('id').replace('mb_btn', '').toLowerCase();
				switch (e.type) {
					case 'mousedown':
						$("#mb-button-" + btn + '_slider').slider('value', 1);
						break;
					case 'mouseup':
						$("#mb-button-" + btn + '_slider').slider('value', 0);
						break;
					case 'click':
						self.presses++;
						break;
				}
			});
		};

		MicrobitButton__init__.co_varnames = ['self', 'btn'];
		MicrobitButton__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(MicrobitButton__init__);

		$loc.is_pressed = new Sk.builtin.func(function (self) {
			const state = $("#mb-button-" + self.btn + '_slider').slider('option', 'value');
			// console.log(state)
			return new Sk.builtin.bool(state);
		});

		$loc.was_pressed = new Sk.builtin.func(function (self) {
			const check = self.presses > self.last_check;
			self.last_check = self.presses;
			return new Sk.builtin.bool(check);
		});

		$loc.get_presses = new Sk.builtin.func(function (self) {
			const presses = self.presses;
			self.presses = 0;
			return new Sk.builtin.int_(presses);
		});

	}, 'MicrobitButton', []);

	mod.button_a = new MicrobitButton();
	mod.button_a.tp$init([new Sk.builtin.str('a')]);

	mod.button_b = new MicrobitButton();
	mod.button_b.tp$init([new Sk.builtin.str('b')]);

	var mb = {

		init: function () {

			$('.broche').mousedown(function () {
				let name = parseInt($(this).attr('id').substr(-1, 1))
				pin = mod['pin' + name];
				pin.touched = true;
			}).mouseup(function () {
				let name = parseInt($(this).attr('id').substr(-1, 1))
				pin = mod['pin' + name];
				pin.touched = false;
			});

			$('.logo').mousedown(function () {
				mod.pin_logo.touched = true;
			}).mouseup(function () {
				mod.pin_logo.touched = false;
			});

			//by clicking on the button
			$('.mb_btn').on("mousedown mouseup click", function (e) {
				var btn = 'a';
				if (e.currentTarget.id == "mb_btn_B") {
					btn = 'b';
				}
				switch (e.type) {
					case 'mousedown':
						mod.buttons.$d.data[btn + '_state'] = true;
						break;
					case 'mouseup':
						mod.buttons.$d.data[btn + '_state'] = false;
						break;
					case 'click':
						mod.buttons.$d.data[btn + '_presses']++;
						break;
				}
			});
			
			//by tapping a or b keyboard
			$("#output").on("click", function () {
				$("#output").attr("tabindex", 1);

				function simulateTabPress() {
					jQuery.event.trigger({
						type: 'keypress',
						which: 9
					});
				}
				simulateTabPress();
			});

			$("body").on("keydown keyup keypress", function (e) {
				if (e.keyCode === 66 || e.keyCode === 65) {

					Keymap[e.keyCode] = e.type == 'keydown';

					var btn = ''
					if (Keymap[66] && Keymap[65]) { // a+b
						btn = 'ab';
						delete Keymap[66]
						delete Keymap[65]

					} else if (e.keyCode === 65) { // a
						btn = 'a';

					} else if (e.keyCode === 66) { // b
						btn = 'b';

					}

					switch (e.type) {
						case 'keydown':
							mod.buttons.$d.data[btn + '_state'] = true;
							break;
						case 'keyup':
							mod.buttons.$d.data[btn + '_state'] = false;
							break;
						case 'keypress':
							mod.buttons.$d.data[btn + '_presses']++;
							break;
					}
				}
			});
		}
	};
	mb.init();
	return mod;
};