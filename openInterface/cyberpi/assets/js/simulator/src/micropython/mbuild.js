// mbuild - mbuild module

const $builtinmodule = function (name) {

	const mbuild = {};

	mbuild.__name__ = new Sk.builtin.str('mbuild');

	const ultrasonic2 = new Sk.misceval.buildClass(mbuild, function ($gbl, $loc) {

		const get = function (self, index) {
			const index_ = Sk.ffi.remapToJs(index);
			const t = Simulator.getSliderValue(`mbuild-ultrasonic_PORT${index_}`, '_d');
			return new Sk.builtin.float_(roundFloat(343 * t / 1e6 / 2 * 100, 1));
		};
		get.co_varnames = ['self', 'index'];
		get.$defaults = [new Sk.builtin.int_(1)];

		$loc.get = new Sk.builtin.func(get);

		// Brightness of the LEDs of the sensor, by sensor index then LED (1-8)
		const brightnesses = {};

		const set_bri = function (self, brightness, led, index) {
			const brightness_ = Sk.ffi.remapToJs(brightness);
			const led_ = Sk.ffi.remapToJs(led);
			const index_ = Sk.ffi.remapToJs(index);
			brightnesses[index_] = brightnesses[index_] || {};
			for (const l of led_ == 'all' ? [1, 2, 3, 4, 5, 6, 7, 8] : [led_]) {
				brightnesses[index_][l] = brightness_;
			}
			return Sk.builtin.none();
		};

		set_bri.co_varnames = ['self', 'brightness', 'led', 'index'];
		set_bri.$defaults = [new Sk.builtin.int_(100), new Sk.builtin.int_(1), new Sk.builtin.int_(1)];
		$loc.set_bri = new Sk.builtin.func(set_bri);

		const get_bri = function (self, led, index) {
			const led_ = Sk.ffi.remapToJs(led);
			const index_ = Sk.ffi.remapToJs(index);
			const brightness = brightnesses[index_] && brightnesses[index_][led_];
			return new Sk.builtin.int_(brightness !== undefined ? brightness : 100);
		};
		get_bri.co_varnames = ['self', 'led', 'index'];
		get_bri.$defaults = [new Sk.builtin.int_(1), new Sk.builtin.int_(1)];
		$loc.get_bri = new Sk.builtin.func(get_bri);

		const play = function (self, emotion, index) {
			const emotion_ = Sk.ffi.remapToJs(emotion);
			const index_ = Sk.ffi.remapToJs(index);
			return Sk.builtin.none();
		};
		play.co_varnames = ['self', 'emotion', 'index'];
		play.$defaults = [new Sk.builtin.str('happy'), new Sk.builtin.int_(1)];
		$loc.play = new Sk.builtin.func(play);

	}, "ultrasonic2", []);

	mbuild.ultrasonic2 = new ultrasonic2();

	const quad_rgb_sensor = new Sk.misceval.buildClass(mbuild, function ($gbl, $loc) {


		const is_line = function (self, sensor, index) {
			const index_ = Sk.ffi.remapToJs(index);
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const left1 = Simulator.getSliderValue(`mbuildFinder-left1_PORT${index_}`, '_v');
			const right1 = Simulator.getSliderValue(`mbuildFinder-right1_PORT${index_}`, '_v');
			const left2 = Simulator.getSliderValue(`mbuildFinder-left2_PORT${index_}`, '_v');
			const right2 = Simulator.getSliderValue(`mbuildFinder-right2_PORT${index_}`, '_v');
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
		is_line.co_varnames = ['self', 'sensor', 'index'];
		is_line.$defaults = [new Sk.builtin.str('L1'), new Sk.builtin.int_(1)];
		$loc.is_line = new Sk.builtin.func(is_line);

		const get_rgb_from_sensor = function (sensor, index, color) {
			const id = { L1: 'left1', R1: 'right1', L2: 'left2', R2: 'right2' }[sensor];
			const polygon = document.querySelector(`#mbuildFinder-${id}_PORT${index} > div.module-body.body-input > div.module-img-group > svg > polygon`);
			const fill = polygon ? polygon.style.fill.match(/\d+/g) : null;
			// The colour under the probe is only known on a track of the robot simulator:
			// otherwise it is black on the line and white on the background
			const rgb = fill ? fill.map(Number) : (Simulator.getSliderValue(`mbuildFinder-${id}_PORT${index}`, '_v') ? [0, 0, 0] : [255, 255, 255]);
			return rgb[{ r: 0, g: 1, b: 2 }[color]];
		};

		const get_red = function (self, sensor, index) {
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const index_ = Sk.ffi.remapToJs(index);
			return new Sk.builtin.int_(get_rgb_from_sensor(sensor_, index_, 'r'));
		};
		get_red.co_varnames = ['self', 'sensor', 'index'];
		get_red.$defaults = [new Sk.builtin.str('L1'), new Sk.builtin.int_(1)];
		$loc.get_red = new Sk.builtin.func(get_red);

		const get_green = function (self, sensor, index) {
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const index_ = Sk.ffi.remapToJs(index);
			return new Sk.builtin.int_(get_rgb_from_sensor(sensor_, index_, 'g'));
		};
		get_green.co_varnames = ['self', 'sensor', 'index'];
		get_green.$defaults = [new Sk.builtin.str('L1'), new Sk.builtin.int_(1)];
		$loc.get_green = new Sk.builtin.func(get_green);

		const get_blue = function (self, sensor, index) {
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const index_ = Sk.ffi.remapToJs(index);
			return new Sk.builtin.int_(get_rgb_from_sensor(sensor_, index_, 'b'));
		};
		get_blue.co_varnames = ['self', 'sensor', 'index'];
		get_blue.$defaults = [new Sk.builtin.str('L1'), new Sk.builtin.int_(1)];
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

		const is_color = function (self, color, sensor, index) {
			const color_ = Sk.ffi.remapToJs(color);
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const index_ = Sk.ffi.remapToJs(index);
			const r = get_rgb_from_sensor(sensor_, index_, 'r');
			const g = get_rgb_from_sensor(sensor_, index_, 'g');
			const b = get_rgb_from_sensor(sensor_, index_, 'b');
			const colorCode = getColorCode([r, g, b]);
			if (colorCode) {
				return new Sk.builtin.bool(colorCode === color_);
			} else {
				return new Sk.builtin.bool(false);
			}
		}
		is_color.co_varnames = ['self', 'color', 'sensor', 'index'];
		is_color.$defaults = [new Sk.builtin.str('red'), new Sk.builtin.str('left1'), new Sk.builtin.int_(1)];
		$loc.is_color = new Sk.builtin.func(is_color);

		const is_background = function (self, sensor, index) {
			const sensor_ = Sk.ffi.remapToJs(sensor);
			const index_ = Sk.ffi.remapToJs(index);
			const id = { L1: 'left1', R1: 'right1', L2: 'left2', R2: 'right2' }[sensor_];
			return new Sk.builtin.bool(!Simulator.getSliderValue(`mbuildFinder-${id}_PORT${index_}`, '_v'));
		};
		is_background.co_varnames = ['self', 'sensor', 'index'];
		is_background.$defaults = [new Sk.builtin.str('L1'), new Sk.builtin.int_(1)];
		$loc.is_background = new Sk.builtin.func(is_background);

		// Values computed from the colour seen under a probe
		const probeMethod = function (compute) {
			const method = function (self, sensor, index) {
				const sensor_ = Sk.ffi.remapToJs(sensor);
				const index_ = Sk.ffi.remapToJs(index);
				const rgb = ['r', 'g', 'b'].map((c) => get_rgb_from_sensor(sensor_, index_, c));
				return Sk.ffi.remapToPy(compute(rgb));
			};
			method.co_varnames = ['self', 'sensor', 'index'];
			method.$defaults = [new Sk.builtin.str('L1'), new Sk.builtin.int_(1)];
			return new Sk.builtin.func(method);
		};
		const brightness = (rgb) => Math.round((0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255 * 100);
		$loc.get_light = probeMethod(brightness);
		$loc.get_gray = probeMethod(brightness);
		$loc.get_color = probeMethod((rgb) => (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]);
		$loc.get_color_sta = probeMethod((rgb) => getColorCode(rgb) || 'black');

		// The fill lights of the sensor are not displayed in the simulator
		const fillLightMethod = function (argNames, defaults) {
			const method = function (self) {
				return Sk.builtin.none.none$;
			};
			method.co_varnames = ['self', ...argNames];
			method.$defaults = defaults;
			return new Sk.builtin.func(method);
		};
		$loc.set_led_color = fillLightMethod(['color', 'index'], [new Sk.builtin.str('red'), new Sk.builtin.int_(1)]);
		$loc.set_led = fillLightMethod(['color', 'index'], [new Sk.builtin.str('white'), new Sk.builtin.int_(1)]);
		$loc.off_led = fillLightMethod(['index'], [new Sk.builtin.int_(1)]);

		// Deviation of the sensor from the line (-100: sensor on the left of the line, +100: on the right)
		const get_offset_track = function (self, index) {
			const index_ = Sk.ffi.remapToJs(index);
			// On a track, the robot simulator measures a continuous deviation under the whole probe bar
			const robot = typeof RobotSimulator !== 'undefined' ? RobotSimulator.robot : null;
			if (robot && typeof robot.lineOffset === 'number' && Simulator.pinList.some((module) => module.pin == `PORT${index_}` && /mbuildFinder/.test(module.id))) {
				return new Sk.builtin.int_(robot.lineOffset);
			}
			const positions = { left2: 3, left1: 1, right1: -1, right2: -3 };
			const onLine = Object.keys(positions).filter((id) => Simulator.getSliderValue(`mbuildFinder-${id}_PORT${index_}`, '_v'));
			if (!onLine.length) return new Sk.builtin.int_(0);
			const mean = onLine.reduce((sum, id) => sum + positions[id], 0) / onLine.length;
			return new Sk.builtin.int_(Math.round(mean / 3 * 100));
		};
		get_offset_track.co_varnames = ['self', 'index'];
		get_offset_track.$defaults = [new Sk.builtin.int_(1)];
		$loc.get_offset_track = new Sk.builtin.func(get_offset_track);

		let custom_color = [0, 0, 0, 50];

		// Bit of a probe for get_<mode>_sta : line keeps the historical inverted slider value
		const probe_sta = function (mode, probe, index) {
			const id = { L1: 'left1', R1: 'right1', L2: 'left2', R2: 'right2' }[probe];
			const onLine = Simulator.getSliderValue(`mbuildFinder-${id}_PORT${index}`, '_v');
			if (mode == 'line') return 1 - onLine;
			if (mode == 'ground') return onLine ? 1 : 0;
			const rgb = ['r', 'g', 'b'].map((c) => get_rgb_from_sensor(probe, index, c));
			if (mode == 'custom') return colorDistance(rgb, custom_color.slice(0, 3)) <= custom_color[3] ? 1 : 0;
			return getColorCode(rgb) === mode ? 1 : 0;
		};

		for (const mode of ['line', 'ground', 'white', 'red', 'yellow', 'green', 'cyan', 'blue', 'purple', 'black', 'custom']) {
			const get_sta = function (self, type, index) {
				const index_ = Sk.ffi.remapToJs(index);
				const probes = Sk.ffi.remapToJs(type) == 'middle' ? ['L1', 'R1'] : ['L2', 'L1', 'R1', 'R2'];
				return new Sk.builtin.int_(probes.reduce((sta, probe, i) => sta + (probe_sta(mode, probe, index_) << i), 0));
			};
			get_sta.co_varnames = ['self', 'type', 'index'];
			get_sta.$defaults = [new Sk.builtin.str('all'), new Sk.builtin.int_(1)];
			$loc[`get_${mode}_sta`] = new Sk.builtin.func(get_sta);
		}

		const set_custom_color = function (self, r, g, b, tolerance, index) {
			custom_color = [r, g, b, tolerance].map((v) => Sk.ffi.remapToJs(v));
			return Sk.builtin.none();
		};
		set_custom_color.co_varnames = ['self', 'r', 'g', 'b', 'tolerance', 'index'];
		set_custom_color.$defaults = [new Sk.builtin.int_(50), new Sk.builtin.int_(1)];
		$loc.set_custom_color = new Sk.builtin.func(set_custom_color);

		// Calibration and color mode have no effect in the simulator
		const adjust = function (self, index) {
			return Sk.builtin.none();
		};
		adjust.co_varnames = ['self', 'index'];
		adjust.$defaults = [new Sk.builtin.int_(1)];
		$loc.adjust = new Sk.builtin.func(adjust);

		const color_mode = function (self, mode) {
			return Sk.builtin.none();
		};
		color_mode.co_varnames = ['self', 'mode'];
		color_mode.$defaults = [new Sk.builtin.str('standard')];
		$loc.color_mode = new Sk.builtin.func(color_mode);

	}, "quad_rgb_sensor", []);

	mbuild.quad_rgb_sensor = new quad_rgb_sensor();

	return mbuild;
};
