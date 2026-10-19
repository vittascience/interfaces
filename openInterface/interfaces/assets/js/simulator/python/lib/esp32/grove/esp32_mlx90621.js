// ESP32 - esp32_mlx90621 module

var $builtinmodule = function () {

	var esp32_mlx90621 = {};

	esp32_mlx90621._MLX90621_REFRESH_RATE = new Sk.builtin.int_(8);

	const MLX_ROWS = 4;
	const MLX_COLS = 16;
	const SCREEN_W = 160;
	const SCREEN_H = 128;
	const START_Y = 32;

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

	function clamp(value, min, max) {
		return Math.min(max, Math.max(min, value));
	}

	function temperatureToColor(temp, localMin, localMax) {
		if (localMax <= localMin) {
			return "rgb(0, 0, 255)";
		}
		const n = clamp((temp - localMin) / (localMax - localMin), 0, 1);
		let r = 0;
		let g = 0;
		let b = 0;
		if (n < 0.5) {
			const k = n * 2;
			r = 0;
			g = Math.floor(k * 255);
			b = Math.floor((1 - k) * 255);
		} else {
			const k = (n - 0.5) * 2;
			r = Math.floor(k * 255);
			g = Math.floor((1 - k) * 255);
			b = 0;
		}
		return "rgb(" + r + ", " + g + ", " + b + ")";
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

	function randomTemperatureFrame() {
		const frame = emptyFrame(0.0);
		const ambient = 22 + Math.random() * 4;
		const hotCol = Math.random() * (MLX_COLS - 1);
		const hotRow = Math.random() * (MLX_ROWS - 1);
		const hotIntensity = 3 + Math.random() * 5;
		const sigmaX = 2.8 + Math.random() * 1.8;
		const sigmaY = 0.8 + Math.random() * 0.8;

		for (let row = 0; row < MLX_ROWS; row++) {
			for (let col = 0; col < MLX_COLS; col++) {
				let base;
				if (row === 0 && col === 0) {
					base = ambient + (Math.random() * 1.4 - 0.7);
				} else {
					const neighbors = [];
					if (col > 0) {
						neighbors.push(frame[row][col - 1]);
					}
					if (row > 0) {
						neighbors.push(frame[row - 1][col]);
					}
					if (row > 0 && col > 0) {
						neighbors.push(frame[row - 1][col - 1]);
					}
					const mean = neighbors.reduce((sum, value) => sum + value, 0) / neighbors.length;
					base = mean + (Math.random() * 1.2 - 0.6);
				}

				const dx = (col - hotCol) / sigmaX;
				const dy = (row - hotRow) / sigmaY;
				const hotspot = hotIntensity * Math.exp(-0.5 * (dx * dx + dy * dy));
				const temperature = clamp(base + hotspot, 18, 40);
				frame[row][col] = Math.round(temperature * 10) / 10;
			}
		}

		return frame;
	}

	function resolveDisplayContainer() {
		const selectors = [
			"#mlx90621_value",
			"#MLX90621_value",
			"#thermal_mlx90621_value"
		];
		for (let i = 0; i < selectors.length; i++) {
			const node = $(selectors[i]);
			if (node.length) {
				return node.first();
			}
		}
		if ($("#mlx90621").length) {
			const moduleNode = $("#mlx90621");
			let valueNode = moduleNode.find(".module-value").first();
			if (!valueNode.length) {
				moduleNode.append('<div class="module-value" id="mlx90621_value"></div>');
				valueNode = moduleNode.find("#mlx90621_value").first();
			}
			return valueNode;
		}
		return null;
	}

	function ensureHeatmapDom(self) {
		const container = resolveDisplayContainer();
		self.displayContainer = container;
		if (!container || !container.length) {
			return;
		}
		if (container.data("mlx90621-initialized")) {
			return;
		}

		let html = '<div class="mlx90621-screen">';
		html += '<div class="mlx90621-heatmap">';
		for (let i = 0; i < MLX_ROWS * MLX_COLS; i++) {
			html += '<div class="mlx90621-pixel"></div>';
		}
		html += "</div></div>";
		container.html(html);
		container.data("mlx90621-initialized", true);
	}

	function renderHeatmap(self, frame, localMin, localMax) {
		ensureHeatmapDom(self);
		if (!self.displayContainer || !self.displayContainer.length) {
			return;
		}
		const pixels = self.displayContainer.find(".mlx90621-pixel");
		let index = 0;
		for (let row = 0; row < MLX_ROWS; row++) {
			for (let col = 0; col < MLX_COLS; col++) {
				$(pixels[index]).css("background-color", temperatureToColor(frame[row][col], localMin, localMax));
				index++;
			}
		}
	}

	function makeReading(self) {
		const floatFrame = randomTemperatureFrame();
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

		renderHeatmap(self, floatFrame, self.lastMin, self.lastMax);
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
			self.displayContainer = null;

			ensureHeatmapDom(self);
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
