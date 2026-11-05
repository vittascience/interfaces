// ESP32 - esp32_mlx90621 module

var $builtinmodule = function () {

	var esp32_mlx90621 = {};

	esp32_mlx90621._MLX90621_REFRESH_RATE = new Sk.builtin.int_(8);

	const MLX_ROWS = 4;
	const MLX_COLS = 16;

	function emptyFrame(fillValue) {
		const frame = [];
		for (let row = 0; row < MLX_ROWS; row++) {
			const values = [];
			for (let col = 0; col < MLX_COLS; col++) {
				values.push(fillValue);
			}
			frame.push(values);
		}
		return frame;
	}

	function flatten(frame) {
		const values = [];
		for (let row = 0; row < MLX_ROWS; row++) {
			for (let col = 0; col < MLX_COLS; col++) {
				values.push(frame[row][col]);
			}
		}
		return values;
	}

	function makeReading(self) {
		const floatFrame = Simulator.Mosaic.grove.mlx90621.randomFrame();
		const intFrame = [];

		for (let row = 0; row < MLX_ROWS; row++) {
			intFrame.push([]);
			for (let col = 0; col < MLX_COLS; col++) {
				intFrame[row].push(Math.trunc(floatFrame[row][col]));
			}
		}

		self.temperatures_flt = floatFrame;
		self.temperatures_int = intFrame;

		const values = flatten(floatFrame);
		self.lastMin = Math.min.apply(null, values);
		self.lastMax = Math.max.apply(null, values);
		self.lastAvg = values.reduce((sum, value) => sum + value, 0) / values.length;
        self.lastFrameReady = true;

		Simulator.Mosaic.grove.mlx90621.render(floatFrame);
	}

	esp32_mlx90621.MLX90621 = new Sk.misceval.buildClass(esp32_mlx90621, function ($gbl, $loc) {

		MLX90621__init__ = function (self, i2c, refresh_rate) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);
			if (Sk.builtin.checkNone(i2c)) {
				throw new Sk.builtin.ValueError("I2C object 'MLX90621' needed as argument!");
			}

			self.i2c = i2c;
			self.rate = Sk.ffi.remapToJs(refresh_rate);
			self.initialized = false;
			self.temperatures_int = emptyFrame(0);
			self.temperatures_flt = emptyFrame(0.0);
			self.lastMin = 0;
			self.lastMax = 0;
			self.lastAvg = 0;
			self.lastFrameReady = false;

			Simulator.Mosaic.grove.mlx90621.render(emptyFrame(0));
			if ($("#mlx90621").length) {
				$("#mlx90621").find(".subtitle-module").html("I2C (0x60)");
			}
		};

		MLX90621__init__.co_varnames = ["self", "i2c", "refresh_rate"];
		MLX90621__init__.$defaults = [Sk.builtin.none(), esp32_mlx90621._MLX90621_REFRESH_RATE];

		$loc.__init__ = new Sk.builtin.func(MLX90621__init__);

		$loc.mlx90621_init = new Sk.builtin.func(function (self) {
			self.initialized = true;
			makeReading(self);
			return Sk.builtin.none();
		});

		$loc.mlx90621_read_ir = new Sk.builtin.func(function (self, unit) {
			if (!self.initialized) {
				self.initialized = true;
			}
			makeReading(self);
			const outUnit = Sk.ffi.remapToJs(unit);
			if (outUnit === "int") {
				return Sk.ffi.remapToPy(self.temperatures_int);
			}
			return Sk.ffi.remapToPy(self.temperatures_flt);
		});
		$loc.mlx90621_read_ir.co_varnames = ["self", "unit"];
		$loc.mlx90621_read_ir.$defaults = [new Sk.builtin.str("int")];

		$loc.get_min_temp = new Sk.builtin.func(function (self, unit) {
			const outUnit = Sk.ffi.remapToJs(unit);
			if (!self.lastFrameReady) {
				makeReading(self);
			}
			const frame = outUnit === "int" ? self.temperatures_int : self.temperatures_flt;
			const values = flatten(frame);
			const minTemp = Math.min.apply(null, values);
			if (outUnit === "int") {
				return new Sk.builtin.int_(Math.trunc(minTemp));
			}
			return new Sk.builtin.float_(minTemp);
		});
		$loc.get_min_temp.co_varnames = ["self", "unit"];
		$loc.get_min_temp.$defaults = [new Sk.builtin.str("float")];

		$loc.get_max_temp = new Sk.builtin.func(function (self, unit) {
			const outUnit = Sk.ffi.remapToJs(unit);
			if (!self.lastFrameReady) {
				makeReading(self);
			}
			const frame = outUnit === "int" ? self.temperatures_int : self.temperatures_flt;
			const values = flatten(frame);
			const maxTemp = Math.max.apply(null, values);
			if (outUnit === "int") {
				return new Sk.builtin.int_(Math.trunc(maxTemp));
			}
			return new Sk.builtin.float_(maxTemp);
		});
		$loc.get_max_temp.co_varnames = ["self", "unit"];
		$loc.get_max_temp.$defaults = [new Sk.builtin.str("float")];

		$loc.get_avg_temp = new Sk.builtin.func(function (self, unit) {
			const outUnit = Sk.ffi.remapToJs(unit);
			if (!self.lastFrameReady) {
				makeReading(self);
			}
			const frame = outUnit === "int" ? self.temperatures_int : self.temperatures_flt;
			const values = flatten(frame);
			const avgTemp = values.reduce((sum, value) => sum + value, 0) / values.length;
			if (outUnit === "int") {
				return new Sk.builtin.int_(Math.trunc(avgTemp));
			}
			return new Sk.builtin.float_(Math.round(avgTemp * 10) / 10);
		});
		$loc.get_avg_temp.co_varnames = ["self", "unit"];
		$loc.get_avg_temp.$defaults = [new Sk.builtin.str("float")];

	}, "MLX90621");

	return esp32_mlx90621;
};
