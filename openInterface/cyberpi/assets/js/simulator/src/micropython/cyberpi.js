// CyberPi - cyberpi module

const $builtinmodule = function (name) {

	const cyberpi = {};

	cyberpi.__name__ = new Sk.builtin.str('cyberpi');

	const led = new Sk.misceval.buildClass(cyberpi, function ($gbl, $loc) {

		const LED_COUNT = 5;

		$loc.__init__ = new Sk.builtin.func(function (self) {
			self.name = 'led';
			self.LEDS = [];
			self.brightness = 1;
			let html = '<div class="row cyberpi-builtin-led_module_rub">';
			for (var i = 0; i < LED_COUNT; i++) {
				html += '<div class="cyberpi-builtin-led-block cyberpi-rgb-leds" style="background-color:#000000;"></div>';
				self.LEDS.push([50, 50, 50]);
			}
			html += "</div>";
			$('#cyberpi-builtin-led_value').html(html);
		});

		const showLED = function (self) {
			for (var i = 0; i < LED_COUNT; i++) {
				if (typeof self.LEDS[i] === 'object') {
					const color = self.LEDS[i];
					$(".cyberpi-rgb-leds").eq(i).css("background-color", "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
					$(".cyberpi-rgb-leds").eq(i).css("opacity", self.brightness);
					// The board is an SVG document loaded in the #board-viewer object
					const viewer = document.getElementById('board-viewer');
					const boardLed = viewer && viewer.contentDocument ? viewer.contentDocument.getElementById('cyberpi-led' + i) : null;
					if (boardLed) {
						boardLed.style.fill = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
						boardLed.style.opacity = self.brightness;
					}
				}
			}
		};

		const on = function (self, r, g, b, id) {
			Sk.builtin.pyCheckArgsLen("on", arguments.length, 4, 5);
			Sk.builtin.pyCheckType("r", "int or float", Sk.builtin.checkNumber(r));
			Sk.builtin.pyCheckType("g", "int or float", Sk.builtin.checkNumber(g));
			Sk.builtin.pyCheckType("b", "int or float", Sk.builtin.checkNumber(b));
			if (id.v == "all") {
				for (var i = 0; i < LED_COUNT; i++) {
					self.LEDS[i] = [r.v, g.v, b.v];
				}
			} else {
				self.LEDS[id.v - 1] = [r.v, g.v, b.v];
			}
			showLED(self);
			return Sk.builtin.none();
		};
		on.co_varnames = ['self', 'r', 'g', 'b', 'id'];
		on.$defaults = [new Sk.builtin.str("all")];

		$loc.on = new Sk.builtin.func(on);

		const off = function (self, id) {
			if (id.v == "all") {
				for (var i = 0; i < LED_COUNT; i++) {
					self.LEDS[i] = [0, 0, 0];
				}
			} else {
				self.LEDS[id.v - 1] = [0, 0, 0];
			}
			showLED(self);
			return Sk.builtin.none();
		};
		off.co_varnames = ['self', 'id'];
		off.$defaults = [new Sk.builtin.str("all")];

		$loc.off = new Sk.builtin.func(off);

		const play = function (self, name) {
			Sk.builtin.pyCheckArgsLen("play", arguments.length, 1, 2);
			Sk.builtin.pyCheckType("name", "str", Sk.builtin.checkString(name));
			if (name.v == 'flash_red') {
				return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
					self.brightness = 1;
					on(self, new Sk.builtin.int_(255), new Sk.builtin.int_(0), new Sk.builtin.int_(0), new Sk.builtin.str("all"));
					await sleep_ms(150);
					self.brightness = 0.5;
					showLED(self);
					await sleep_ms(100);
					self.brightness = 0.1;
					showLED(self);
					await sleep_ms(150);
					self.brightness = 0.5;
					showLED(self);
					await sleep_ms(150);
					self.brightness = 1;
					showLED(self);
					await sleep_ms(100);
					self.brightness = 0.5;
					showLED(self);
					await sleep_ms(150);
					self.brightness = 1;
					showLED(self);
					resolve(Sk.builtin.none());
				}));
			}
			return Sk.builtin.none();
		};

		play.co_varnames = ['self', 'name'];
		play.$defaults = [Sk.builtin.none()];

		$loc.play = new Sk.builtin.func(play);

		const move = function (self, step) {
			Sk.builtin.pyCheckArgsLen("move", arguments.length, 1, 2);
			Sk.builtin.pyCheckType("step", "int", Sk.builtin.checkInt(step));
			for (var i = 0; i < Math.abs(step.v); i++) {
				if (step.v > 0) {
					self.LEDS = [self.LEDS.pop()].concat(self.LEDS);
				} else {
					self.LEDS.push(self.LEDS.shift());
				}
			}
			showLED(self);
			return Sk.builtin.none();
		};

		move.co_varnames = ['self', 'step'];
		move.$defaults = [new Sk.builtin.int_(1)];

		$loc.move = new Sk.builtin.func(move);

		const set_bri = function (self, brightness) {
			Sk.builtin.pyCheckArgsLen("set_bri", arguments.length, 2, 2);
			Sk.builtin.pyCheckType("brightness", "int or float", Sk.builtin.checkInt(brightness));
			self.brightness = brightness.v / 100;
			showLED(self);
			return Sk.builtin.none();
		};

		set_bri.co_varnames = ['self', 'brightness'];
		set_bri.$defaults = [];

		$loc.set_bri = new Sk.builtin.func(set_bri);

		const get_bri = function (self) {
			Sk.builtin.pyCheckArgsLen("get_bri", arguments.length, 1, 1);
			return new Sk.builtin.int_(self.brightness * 100);
		};

		get_bri.co_varnames = ['self'];
		get_bri.$defaults = [];

		$loc.get_bri = new Sk.builtin.func(get_bri);

	}, "_led_o", []);

	cyberpi.led = new led();
	cyberpi.led.tp$init([]);

	// State shared with the event module and kept across the objects of this module
	const sim = Simulator.Mosaic.specific.cyberpi = Simulator.Mosaic.specific.cyberpi || {};
	sim.events = { start: [], press: {}, receive: {} };

	const toJs = (value) => (value === undefined || Sk.builtin.checkNone(value)) ? null : Sk.ffi.remapToJs(value);

	/**
	 * Build a Python object whose methods are JS functions receiving converted arguments.
	 * @param {string} className
	 * @param {Object} methods {name: [function, argNames, defaults]}
	 */
	const makeObject = function (className, methods) {
		const cls = Sk.misceval.buildClass(cyberpi, function ($gbl, $loc) {
			for (const [name, [fn, argNames, defaults]] of Object.entries(methods)) {
				const method = function (self) {
					const result = fn.apply(null, Array.prototype.slice.call(arguments, 1).map(toJs));
					if (result instanceof Sk.misceval.Suspension) return result;
					return result === undefined || result === null ? Sk.builtin.none.none$ : Sk.ffi.remapToPy(result);
				};
				method.co_varnames = ['self', ...(argNames || [])];
				method.$defaults = (defaults || []).map((value) => value === null ? Sk.builtin.none.none$ : Sk.ffi.remapToPy(value));
				$loc[name] = new Sk.builtin.func(method);
			}
		}, className, []);
		const object = new cls();
		object.tp$init([]);
		return object;
	};

	const getBoard = function () {
		const viewer = document.getElementById('board-viewer');
		return viewer ? viewer.contentDocument : null;
	};

	// --- Screen (128 x 128 px) ---

	const SCREEN_SIZE = 128;
	const screen = {
		mode: null,
		brush: [255, 255, 255],
		fontSize: 16,
		consoleLines: [],
		labels: {},
		lineData: [],
		lineStep: 1,
		bars: [],
		table: {}
	};

	const getScreenContext = function () {
		const board = getBoard();
		if (!board) return null;
		let canvas = board.getElementById('cyberpi-screen-canvas');
		if (!canvas) {
			const area = board.getElementById('rectangle_white');
			if (!area) return null;
			const svgNS = 'http://www.w3.org/2000/svg';
			const foreignObject = board.createElementNS(svgNS, 'foreignObject');
			for (const attribute of ['x', 'y', 'width', 'height']) {
				foreignObject.setAttribute(attribute, area.getAttribute(attribute));
			}
			canvas = board.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
			canvas.id = 'cyberpi-screen-canvas';
			canvas.width = SCREEN_SIZE * 2;
			canvas.height = SCREEN_SIZE * 2;
			canvas.setAttribute('style', 'width:100%;height:100%;display:block;');
			foreignObject.appendChild(canvas);
			area.parentNode.appendChild(foreignObject);
		}
		const ctx = canvas.getContext('2d');
		ctx.setTransform(2, 0, 0, 2, 0, 0);
		return ctx;
	};

	const rgb = (color) => `rgb(${color[0]},${color[1]},${color[2]})`;

	const wrapText = function (ctx, text, width) {
		const lines = [];
		for (const paragraph of String(text).split('\n')) {
			let line = '';
			for (const char of paragraph) {
				if (line && ctx.measureText(line + char).width > width) {
					lines.push(line);
					line = '';
				}
				line += char;
			}
			lines.push(line);
		}
		return lines;
	};

	const renderScreen = function () {
		const ctx = getScreenContext();
		if (!ctx) return;
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);
		ctx.textBaseline = 'top';
		switch (screen.mode) {
			case 'console': {
				const rows = [];
				for (const line of screen.consoleLines) {
					ctx.font = line.size + 'px sans-serif';
					for (const text of wrapText(ctx, line.text, SCREEN_SIZE)) {
						rows.push({ text, size: line.size, color: line.color });
					}
				}
				// Keep the last rows which fit in the screen (scrolling)
				let height = 0;
				let first = rows.length;
				while (first > 0 && height + rows[first - 1].size <= SCREEN_SIZE) {
					height += rows[--first].size;
				}
				let y = 0;
				for (const row of rows.slice(first)) {
					ctx.font = row.size + 'px sans-serif';
					ctx.fillStyle = rgb(row.color);
					ctx.textAlign = 'left';
					ctx.fillText(row.text, 0, y);
					y += row.size;
				}
				break;
			}
			case 'label': {
				for (const label of Object.values(screen.labels)) {
					ctx.font = label.size + 'px sans-serif';
					ctx.fillStyle = rgb(label.color);
					ctx.textAlign = label.align;
					ctx.textBaseline = label.baseline;
					ctx.fillText(label.text, label.x, label.y);
				}
				break;
			}
			case 'linechart': {
				ctx.strokeStyle = rgb(screen.brush);
				ctx.lineWidth = 1.5;
				ctx.beginPath();
				const start = Math.max(0, screen.lineData.length - Math.floor(SCREEN_SIZE / screen.lineStep) - 1);
				screen.lineData.slice(start).forEach((point, i) => {
					const x = i * screen.lineStep;
					const y = SCREEN_SIZE - point.value / 100 * SCREEN_SIZE;
					if (i == 0) ctx.moveTo(x, y);
					else ctx.lineTo(x, y);
				});
				ctx.stroke();
				break;
			}
			case 'barchart': {
				const bars = screen.bars.slice(-8);
				const width = SCREEN_SIZE / Math.max(bars.length, 1);
				bars.forEach((bar, i) => {
					const height = bar.value / 100 * SCREEN_SIZE;
					ctx.fillStyle = rgb(bar.color);
					ctx.fillRect(i * width + 1, SCREEN_SIZE - height, width - 2, height);
				});
				break;
			}
			case 'table': {
				const cells = Object.values(screen.table);
				const rows = Math.max(1, ...cells.map((cell) => cell.row));
				const cols = Math.max(1, ...cells.map((cell) => cell.col));
				const cellWidth = SCREEN_SIZE / cols;
				const cellHeight = SCREEN_SIZE / rows;
				ctx.strokeStyle = '#888888';
				ctx.lineWidth = 0.5;
				for (let i = 0; i <= rows; i++) {
					ctx.beginPath(); ctx.moveTo(0, i * cellHeight); ctx.lineTo(SCREEN_SIZE, i * cellHeight); ctx.stroke();
				}
				for (let j = 0; j <= cols; j++) {
					ctx.beginPath(); ctx.moveTo(j * cellWidth, 0); ctx.lineTo(j * cellWidth, SCREEN_SIZE); ctx.stroke();
				}
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.font = Math.min(12, cellHeight * 0.6) + 'px sans-serif';
				for (const cell of cells) {
					ctx.fillStyle = rgb(cell.color);
					ctx.fillText(cell.text, (cell.col - 0.5) * cellWidth, (cell.row - 0.5) * cellHeight, cellWidth - 2);
				}
				break;
			}
		}
	};

	// Like on the CyberPi, the screen shows one page at a time: changing of page clears the screen
	const setScreenMode = function (mode) {
		if (screen.mode !== mode) {
			screen.mode = mode;
			screen.consoleLines = [];
			screen.labels = {};
			screen.lineData = [];
			screen.bars = [];
			screen.table = {};
		}
	};

	const addConsoleText = function (text, newline) {
		setScreenMode('console');
		const last = screen.consoleLines[screen.consoleLines.length - 1];
		if (last && !last.closed && last.size == screen.fontSize) {
			last.text += String(text);
		} else {
			screen.consoleLines.push({ text: String(text), size: screen.fontSize, color: screen.brush.slice() });
		}
		const current = screen.consoleLines[screen.consoleLines.length - 1];
		if (newline) current.closed = true;
		screen.consoleLines = screen.consoleLines.slice(-50);
		renderScreen();
	};

	cyberpi.console = makeObject('console', {
		print: [(text) => addConsoleText(text, false), ['message']],
		println: [(text) => addConsoleText(text, true), ['message']],
		set_font: [(size) => { screen.fontSize = size; }, ['size'], [16]],
		clear: [() => { screen.consoleLines = []; renderScreen(); }]
	});

	const LABEL_POSITIONS = {
		top_left: [0, 0, 'left', 'top'],
		top_mid: [64, 0, 'center', 'top'],
		top_right: [128, 0, 'right', 'top'],
		mid_left: [0, 64, 'left', 'middle'],
		center: [64, 64, 'center', 'middle'],
		mid_right: [128, 64, 'right', 'middle'],
		bottom_left: [0, 128, 'left', 'bottom'],
		bottom_mid: [64, 128, 'center', 'bottom'],
		bottom_right: [128, 128, 'right', 'bottom']
	};

	cyberpi.display = makeObject('display', {
		show_label: [(message, size, x, y, index) => {
			setScreenMode('label');
			const position = typeof x === 'string' ? (LABEL_POSITIONS[x] || LABEL_POSITIONS.center) : [x || 0, y || 0, 'left', 'top'];
			screen.labels[index || 0] = {
				text: String(message), size: size || 16, color: screen.brush.slice(),
				x: position[0], y: position[1], align: position[2], baseline: position[3]
			};
			renderScreen();
		}, ['message', 'size', 'x', 'y', 'index'], [16, 'center', null, 0]],
		clear: [() => { setScreenMode(null); renderScreen(); }],
		set_brush: [(r, g, b) => { screen.brush = [r, g, b]; }, ['r', 'g', 'b']]
	});

	cyberpi.linechart = makeObject('linechart', {
		add: [(data) => {
			setScreenMode('linechart');
			screen.lineData.push({ value: Math.max(0, Math.min(100, data)) });
			screen.lineData = screen.lineData.slice(-SCREEN_SIZE - 1);
			renderScreen();
		}, ['data']],
		set_step: [(step) => { screen.lineStep = Math.max(1, step); renderScreen(); }, ['step']],
		clear: [() => { screen.lineData = []; renderScreen(); }]
	});

	cyberpi.barchart = makeObject('barchart', {
		add: [(data) => {
			setScreenMode('barchart');
			screen.bars.push({ value: Math.max(0, Math.min(100, data)), color: screen.brush.slice() });
			screen.bars = screen.bars.slice(-8);
			renderScreen();
		}, ['data']],
		clear: [() => { screen.bars = []; renderScreen(); }]
	});

	cyberpi.table = makeObject('table', {
		add: [(row, col, data) => {
			setScreenMode('table');
			screen.table[row + '_' + col] = { row, col, text: String(data), color: screen.brush.slice() };
			renderScreen();
		}, ['row', 'col', 'data']],
		clear: [() => { screen.table = {}; renderScreen(); }]
	});

	// --- Buttons and joystick ---

	const BUTTONS = ['a', 'b', 'up', 'down', 'left', 'right', 'middle'];
	const controller = { pressed: {}, count: {} };
	BUTTONS.forEach((button) => controller.count[button] = 0);

	const isPressed = function (button) {
		switch (button) {
			case 'any_direction':
				return ['up', 'down', 'left', 'right', 'middle'].some((b) => controller.pressed[b]);
			case 'any_button':
				return ['a', 'b'].some((b) => controller.pressed[b]);
			case 'any':
				return BUTTONS.some((b) => controller.pressed[b]);
			default:
				return !!controller.pressed[button];
		}
	};

	const pressButton = function (button, element) {
		controller.pressed[button] = true;
		controller.count[button]++;
		if (element) element.style.opacity = 0.6;
		for (const [name, handlers] of Object.entries(sim.events.press)) {
			if (isPressed(name)) handlers.forEach((handler) => sim.runHandler(handler));
		}
	};

	const releaseButtons = function () {
		controller.pressed = {};
		const board = getBoard();
		if (board) board.querySelectorAll('#buton_square, #buton_play, #buton_circle').forEach((element) => element.style.opacity = '');
	};

	// Listeners of the board are attached once and dispatch to the module of the current run
	sim.onBoardPress = function (event) {
		const board = getBoard();
		const target = event.target;
		if (target.closest('#buton_square')) return pressButton('a', board.getElementById('buton_square'));
		if (target.closest('#buton_play')) return pressButton('b', board.getElementById('buton_play'));
		const joystick = target.closest('#buton_circle');
		if (joystick) {
			const svg = joystick.ownerSVGElement;
			const point = svg.createSVGPoint();
			point.x = event.clientX;
			point.y = event.clientY;
			const p = point.matrixTransform(svg.getScreenCTM().inverse());
			const dx = p.x - 177.33;
			const dy = p.y - 227.25;
			let button = 'middle';
			if (Math.hypot(dx, dy) > 35) {
				button = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
			}
			pressButton(button, board.getElementById('buton_circle'));
		}
	};
	sim.onBoardRelease = releaseButtons;
	const board = getBoard();
	if (board && !board.cyberpiListeners) {
		board.cyberpiListeners = true;
		board.addEventListener('mousedown', (event) => sim.onBoardPress(event));
		board.addEventListener('mouseup', () => sim.onBoardRelease());
		board.addEventListener('mouseleave', () => sim.onBoardRelease());
		board.querySelectorAll('#buton_square, #buton_play, #buton_circle').forEach((element) => element.style.cursor = 'pointer');
	}

	cyberpi.controller = makeObject('controller', {
		is_press: [(button) => isPressed(button), ['name']],
		get_count: [(button) => controller.count[button] || 0, ['name']],
		reset_count: [(button) => {
			if (controller.count[button] !== undefined) controller.count[button] = 0;
			else BUTTONS.forEach((b) => controller.count[b] = 0);
		}, ['name']]
	});

	// --- Events (handlers are registered by the event module) ---

	cyberpi.broadcast = new Sk.builtin.func(function (message) {
		const handlers = sim.events.receive[Sk.ffi.remapToJs(message)] || [];
		handlers.forEach((handler) => sim.runHandler(handler));
		return Sk.builtin.none.none$;
	});

	// --- Sensors ---

	cyberpi.get_bri = new Sk.builtin.func(function () {
		return new Sk.builtin.int_(Simulator.getSliderValue('cyberpi-lightsensor'));
	});

	const get_loudness = function (mode) {
		return new Sk.builtin.int_(Simulator.getSliderValue('cyberpi-loudness'));
	};
	get_loudness.co_varnames = ['mode'];
	get_loudness.$defaults = [new Sk.builtin.str('maximum')];
	cyberpi.get_loudness = new Sk.builtin.func(get_loudness);

	// --- Audio ---

	const audio = { volume: 50, tempo: 60, oscillator: null };

	const getAudioContext = function () {
		if (!Simulator.audioContext || Simulator.audioContext.state == 'closed') {
			Simulator.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		}
		if (Simulator.audioContext.state == 'suspended') Simulator.audioContext.resume();
		return Simulator.audioContext;
	};

	const stopTone = function () {
		if (audio.oscillator) {
			try { audio.oscillator.stop(); } catch (e) { }
			audio.oscillator = null;
		}
	};

	// Play a tone, for duration ms (or until audio.stop() without duration)
	const startTone = function (frequency, duration, type) {
		stopTone();
		if (!frequency || frequency <= 0) return;
		const ctx = getAudioContext();
		const gain = ctx.createGain();
		gain.gain.value = audio.volume / 100 * 0.2;
		gain.connect(ctx.destination);
		const oscillator = ctx.createOscillator();
		oscillator.type = type || 'square';
		oscillator.frequency.value = frequency;
		oscillator.connect(gain);
		oscillator.start();
		if (duration) oscillator.stop(ctx.currentTime + duration / 1000);
		audio.oscillator = oscillator;
	};

	const playAndWait = function (frequency, duration, type) {
		startTone(frequency, duration, type);
		return Simulator.sleep_ms(duration);
	};

	const beatToMs = (beat) => beat * 60000 / audio.tempo;

	// Short melodies standing for the preset sounds of the CyberPi
	const SOUNDS = {
		hi: [523, 784], bye: [784, 523], yeah: [659, 880], wow: [440, 880], laugh: [880, 784, 880, 784],
		hum: [330, 330], sad: [440, 392, 349], sigh: [392, 330], annoyed: [220, 196], angry: [196, 175],
		surprised: [523, 1047], yummy: [659, 784, 659], curious: [523, 659, 784], embarrassed: [392, 440, 392],
		ready: [523, 659, 784, 1047], sprint: [784, 880, 988, 1047]
	};

	cyberpi.audio = makeObject('audio', {
		play: [(sound) => {
			const notes = SOUNDS[sound] || [660];
			notes.forEach((frequency, i) => setTimeout(() => startTone(frequency, 120), i * 130));
		}, ['music_name']],
		play_until: [(sound) => {
			const notes = SOUNDS[sound] || [660];
			notes.forEach((frequency, i) => setTimeout(() => startTone(frequency, 120), i * 130));
			return Simulator.sleep_ms(notes.length * 130);
		}, ['music_name']],
		play_tone: [(frequency, t) => {
			if (t === null) {
				startTone(frequency);
				return;
			}
			return playAndWait(frequency, t * 1000);
		}, ['frequency', 't'], [null]],
		play_music: [(note, beat) => playAndWait(440 * Math.pow(2, (note - 69) / 12), beatToMs(beat)), ['note', 'beat']],
		play_drum: [(type, beat) => {
			// Short low or high hit, then wait for the whole beat
			startTone(type == 'bass-drum' ? 60 : 200, Math.min(80, beatToMs(beat)), 'triangle');
			return Simulator.sleep_ms(beatToMs(beat));
		}, ['type', 'beat']],
		record: [() => { }],
		stop_record: [() => { }],
		play_record: [() => { }],
		play_record_until: [() => { }],
		stop: [() => stopTone()],
		set_vol: [(volume) => { audio.volume = Math.max(0, Math.min(100, volume)); }, ['val']],
		add_vol: [(volume) => { audio.volume = Math.max(0, Math.min(100, audio.volume + volume)); }, ['val']],
		get_vol: [() => audio.volume],
		set_tempo: [(tempo) => { audio.tempo = Math.max(6, Math.min(600, tempo)); }, ['pct']],
		add_tempo: [(tempo) => { audio.tempo = Math.max(6, Math.min(600, audio.tempo + tempo)); }, ['pct']],
		get_tempo: [() => audio.tempo]
	});

	// --- WiFi ---

	const wifi = { connected: false, broadcast: {} };

	cyberpi.wifi = makeObject('wifi', {
		connect: [() => { wifi.connected = true; }, ['ssid', 'password']],
		is_connect: [() => wifi.connected],
		disconnect: [() => { wifi.connected = false; }],
		reconnect: [() => { wifi.connected = true; }]
	});

	cyberpi.wifi_broadcast = makeObject('wifi_broadcast', {
		set: [(name, value) => { wifi.broadcast[name] = value; }, ['message', 'val']],
		get: [(name) => wifi.broadcast[name] !== undefined ? wifi.broadcast[name] : '', ['message']]
	});

	renderScreen();

	return cyberpi;
};
