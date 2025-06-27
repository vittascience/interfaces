// mbuild - mbuild module

const $builtinmodule = function (name) {

	const mbuild = {};

	mbuild.__name__ = new Sk.builtin.str('mbuild');

	const ultrasonic2 = new Sk.misceval.buildClass(mbuild, function ($gbl, $loc) {

		const get = function (self, port) {
			const port_ = Sk.ffi.remapToJs(port);
			const t = Simulator.getSliderValue(`mbuild-ultrasonic_PORT${port_}`, '_d');
			return new Sk.builtin.float_(roundFloat(343 * t / 1e6 / 2 * 100, 1));
		};
		get.co_varnames = ['self', 'port'];
		get.$defaults = [new Sk.builtin.int_(1)];

		$loc.get = new Sk.builtin.func(get);

		const set_bri = function (self, brightness, led, port) {
			const brightness_ = Sk.ffi.remapToJs(brightness);
			const led_ = Sk.ffi.remapToJs(led);
			const port_ = Sk.ffi.remapToJs(port);
			return Sk.builtin.none();
		};

		set_bri.co_varnames = ['self', 'brightness', 'led', 'port'];
		set_bri.$defaults = [new Sk.builtin.int_(100), new Sk.builtin.int_(1), new Sk.builtin.int_(1)];
		$loc.set_bri = new Sk.builtin.func(set_bri);

		const get_bri = function (self, led, port) {
			const led_ = Sk.ffi.remapToJs(led);
			const port_ = Sk.ffi.remapToJs(port);
			return new Sk.builtin.int_(100);
		};
		get_bri.co_varnames = ['self', 'led', 'port'];
		get_bri.$defaults = [new Sk.builtin.int_(1), new Sk.builtin.int_(1)];
		$loc.get_bri = new Sk.builtin.func(get_bri);

		const play = function(self, emotion, port) {
			const emotion_ = Sk.ffi.remapToJs(emotion);
			const port_ = Sk.ffi.remapToJs(port);
			return Sk.builtin.none();
		};
		play.co_varnames = ['self', 'emotion', 'port'];
		play.$defaults = [new Sk.builtin.str('happy'), new Sk.builtin.int_(1)];
		$loc.play = new Sk.builtin.func(play);

	}, "ultrasonic2", []);

	mbuild.ultrasonic2 = new ultrasonic2();

	const quad_rgb_sensor = new Sk.misceval.buildClass(mbuild, function ($gbl, $loc) {

		const get_line_sta = function (self, mode, port) {
			const port_ = Sk.ffi.remapToJs(port);
			const mode_ = Sk.ffi.remapToJs(mode);
			const left1 = Simulator.getSliderValue(`mbuildFinder-left1_PORT${port_}`, '_v');
			const right1 = Simulator.getSliderValue(`mbuildFinder-right1_PORT${port_}`, '_v');
			const left2 = Simulator.getSliderValue(`mbuildFinder-left2_PORT${port_}`, '_v');
			const right2 = Simulator.getSliderValue(`mbuildFinder-right2_PORT${port_}`, '_v');
			switch (mode_) {
				case 'middle':
					if (left1 == 0 && right1 == 0) {
						return new Sk.builtin.int_(0);
					}
					if (left1 == 0 && right1 == 1) {
						return new Sk.builtin.int_(1);
					}
					if (left1 == 1 && right1 == 0) {
						return new Sk.builtin.int_(2);
					}
					if (left1 == 1 && right1 == 1) {
						return new Sk.builtin.int_(3);
					}
				case 'all':
					if (right2 == 0 && right1 == 0 && left1 == 0 && left2 == 0) {
						return new Sk.builtin.int_(0);
					}
					if (right2 == 0 && right1 == 0 && left1 == 0 && left2 == 1) {
						return new Sk.builtin.int_(1);
					}
					if (right2 == 0 && right1 == 0 && left1 == 1 && left2 == 0) {
						return new Sk.builtin.int_(2);
					}
					if (right2 == 0 && right1 == 0 && left1 == 1 && left2 == 1) {
						return new Sk.builtin.int_(3);
					}
					if (right2 == 0 && right1 == 1 && left1 == 0 && left2 == 0) {
						return new Sk.builtin.int_(4);
					}
					if (right2 == 0 && right1 == 1 && left1 == 0 && left2 == 1) {
						return new Sk.builtin.int_(5);
					}
					if (right2 == 0 && right1 == 1 && left1 == 1 && left2 == 0) {
						return new Sk.builtin.int_(6);
					}
					if (right2 == 0 && right1 == 1 && left1 == 1 && left2 == 1) {
						return new Sk.builtin.int_(7);
					}
					if (right2 == 1 && right1 == 0 && left1 == 0 && left2 == 0) {
						return new Sk.builtin.int_(8);
					}
					if (right2 == 1 && right1 == 0 && left1 == 0 && left2 == 1) {
						return new Sk.builtin.int_(9);
					}
					if (right2 == 1 && right1 == 0 && left1 == 1 && left2 == 0) {
						return new Sk.builtin.int_(10);
					}
					if (right2 == 1 && right1 == 0 && left1 == 1 && left2 == 1) {
						return new Sk.builtin.int_(11);
					}
					if (right2 == 1 && right1 == 1 && left1 == 0 && left2 == 0) {
						return new Sk.builtin.int_(12);
					}
					if (right2 == 1 && right1 == 1 && left1 == 0 && left2 == 1) {
						return new Sk.builtin.int_(13);
					}
					if (right2 == 1 && right1 == 1 && left1 == 1 && left2 == 0) {
						return new Sk.builtin.int_(14);
					}
					if (right2 == 1 && right1 == 1 && left1 == 1 && left2 == 1) {
						return new Sk.builtin.int_(15);
					}

			}
		};
		get_line_sta.co_varnames = ['self', 'mode', 'port'];
		get_line_sta.$defaults = [new Sk.builtin.str('middle'), new Sk.builtin.int_(1)];

		$loc.get_line_sta = new Sk.builtin.func(get_line_sta);

		const is_line = function (self, sensor, port) {
			const port_ = Sk.ffi.remapToJs(port);
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const left1 = Simulator.getSliderValue(`mbuildFinder-left1_PORT${port_}`, '_v');
			const right1 = Simulator.getSliderValue(`mbuildFinder-right1_PORT${port_}`, '_v');
			const left2 = Simulator.getSliderValue(`mbuildFinder-left2_PORT${port_}`, '_v');
			const right2 = Simulator.getSliderValue(`mbuildFinder-right2_PORT${port_}`, '_v');
			if (sensor_ == 'L1') {
				return new Sk.builtin.bool(left1);
			}
			if (sensor_ == 'R1') {
				return new Sk.builtin.bool(right1);
			}
			if (sensor_ == 'L2') {
				return new Sk.builtin.bool(left2);
			}
			if (sensor_ == 'R2') {
				return new Sk.builtin.bool(right2);
			}
		}
		is_line.co_varnames = ['self', 'sensor', 'port'];
		is_line.$defaults = [new Sk.builtin.str('left1'), new Sk.builtin.int_(1)];
		$loc.is_line = new Sk.builtin.func(is_line);

		const get_color_intensity = function (rgb, color) {
			const rgb_array = rgb.match(/\d+/g).map(Number);
			switch (color) {
				case 'r':
					return rgb_array[0];
				case 'g':
					return rgb_array[1];
				case 'b':
					return rgb_array[2];
			}
		};

		const get_rgb_from_sensor = function (sensor, port, color) {
			const rgb_l1 = document.querySelector(`#mbuildFinder-left1_PORT${port} > div.module-body.body-input > div.module-img-group > svg > polygon`).style.fill;
			const rgb_r1 = document.querySelector(`#mbuildFinder-right1_PORT${port} > div.module-body.body-input > div.module-img-group > svg > polygon`).style.fill;
			const rgb_l2 = document.querySelector(`#mbuildFinder-left2_PORT${port} > div.module-body.body-input > div.module-img-group > svg > polygon`).style.fill;
			const rgb_r2 = document.querySelector(`#mbuildFinder-right2_PORT${port} > div.module-body.body-input > div.module-img-group > svg > polygon`).style.fill;
			switch (sensor) {
				case 'L1':
					return get_color_intensity(rgb_l1, color);
				case 'R1':
					return get_color_intensity(rgb_r1, color);
				case 'L2':
					return get_color_intensity(rgb_l2, color);
				case 'R2':
					return get_color_intensity(rgb_r2, color);
			}
		};

		const get_red = function (self, sensor, port) {
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const port_ = Sk.ffi.remapToJs(port);
			return new Sk.builtin.int_(get_rgb_from_sensor(sensor_, port_, 'r'));
		};
		get_red.co_varnames = ['self', 'sensor', 'port'];
		get_red.$defaults = [new Sk.builtin.str('left1'), new Sk.builtin.int_(1)];
		$loc.get_red = new Sk.builtin.func(get_red);

		const get_green = function (self, sensor, port) {
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const port_ = Sk.ffi.remapToJs(port);
			return new Sk.builtin.int_(get_rgb_from_sensor(sensor_, port_, 'g'));
		};
		get_green.co_varnames = ['self', 'sensor', 'port'];
		get_green.$defaults = [new Sk.builtin.str('left1'), new Sk.builtin.int_(1)];
		$loc.get_green = new Sk.builtin.func(get_green);

		const get_blue = function (self, sensor, port) {
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const port_ = Sk.ffi.remapToJs(port);
			return new Sk.builtin.int_(get_rgb_from_sensor(sensor_, port_, 'b'));
		};
		get_blue.co_varnames = ['self', 'sensor', 'port'];
		get_blue.$defaults = [new Sk.builtin.str('left1'), new Sk.builtin.int_(1)];
		$loc.get_blue = new Sk.builtin.func(get_blue);

		const colorDistance = function ([r1, g1, b1], [r2, g2, b2]) {
			return Math.sqrt(
				(r1 - r2) ** 2 +
				(g1 - g2) ** 2 +
				(b1 - b2) ** 2
			);
		};

		const getColorCode = function (inputRGB, threshold = 200) {
			// Mapping lettre ↔ RGB
			const COLORS = {
				red: [255, 0, 0], // red
				yellow: [255, 255, 0], // yellow
				green: [0, 255, 0], // green
				cyan: [0, 255, 255], // cyan
				blue: [0, 0, 255], // blue
				purple: [128, 0, 128], // purple
				white: [255, 255, 255], // white
				black: [0, 0, 0]  // black
			};
			let closest = { code: null, dist: Infinity };
			for (const [code, refRGB] of Object.entries(COLORS)) {
				const d = colorDistance(inputRGB, refRGB);
				if (d < closest.dist) {
					closest = { code, dist: d };
				}
			}
			return closest.dist <= threshold ? closest.code : null;
		};

		const is_color = function (self, color, sensor, port) {
			const color_ = Sk.ffi.remapToJs(color);
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const port_ = Sk.ffi.remapToJs(port);
			const r = get_rgb_from_sensor(sensor_, port_, 'r');
			const g = get_rgb_from_sensor(sensor_, port_, 'g');
			const b = get_rgb_from_sensor(sensor_, port_, 'b');
			const colorCode = getColorCode([r, g, b]);
			if (colorCode) {
				return new Sk.builtin.bool(colorCode === color_);
			} else {
				return new Sk.builtin.bool(false);
			}
		}
		is_color.co_varnames = ['self', 'color', 'sensor', 'port'];
		is_color.$defaults = [new Sk.builtin.str('red'), new Sk.builtin.str('left1'), new Sk.builtin.int_(1)];
		$loc.is_color = new Sk.builtin.func(is_color);

	}, "quad_rgb_sensor", []);

	mbuild.quad_rgb_sensor = new quad_rgb_sensor();

	return mbuild;
};
