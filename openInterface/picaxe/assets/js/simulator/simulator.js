// Main Simulator object of the PICAXE interface: runs the BASIC code with picaxeMachine.js (loaded before, no interpreter library).
var Simulator = {
	TYPE: 'Picaxe',
	COMMENT_CHARACTER: "'",
	CodeFriendly: {},
	dropdownOptions: {},
	serialData: '',
	serialBuffer: '',
	currentDelays: {},
	IPS: 1400, // instructions per second, measured on an AutoProgX2: 2000 for/next in 1420 ms
	inputs: new Uint8Array(24), // pins set by the UI (In = C.0..C.7 = 8..15)
	analog: new Array(24).fill(512), // readadc values (An = A.0..A.3 = 16..19)
	program: null,
	vm: null,
	runId: 0,

	/**
	 * Shows the b/w variables named by symbol in the variables panel.
	 */
	updateVariablesPanel: function () {
		this.Debugger.emptyVariablesPanel();
		if (this.vm) {
			this.program.variables.forEach(({ name, register, slot }) => this.Debugger.addVarToPanel({ name, value: this.vm.get(slot), type: register }));
		}
		this.Debugger.refreshDisplayVars();
	},

	sleep_ms: function (delay_ms) {
		return new Promise(resolve => {
			const id = randHex();
			Simulator.currentDelays[id] = resolve;
			setTimeout(() => {
				delete Simulator.currentDelays[id];
				resolve();
			}, delay_ms);
		});
	},

	/**
	 * Compiles and runs the code. A new run (runId) or a stop ends the previous loop.
	 */
	runCode: async function () {
		const id = ++this.runId;
		const alive = () => id === this.runId && !this.stop_flag;
		this.serialBuffer = '';
		this.vm = null;
		try {
			this.program = PicaxeCompiler.program(this.code);
		} catch (e) {
			return this.handleError(e);
		}
		const { code } = this.program;
		const vm = this.vm = new PicaxeMachine(this.program, {
			inputs: this.inputs,
			analog: this.analog,
			sertxd: text => this.serial(text),
			sound: (pin, note, ms) => {
				this.beep(note, ms);
				this.Mosaic.specific.sound(pin, note, ms);
			}
		});
		this.Mosaic.specific.shown = {};
		this.Mosaic.specific.render(vm);
		let clock = performance.now();
		try {
			while (alive() && !vm.ended) {
				if (!this.isRunning && !this.isDebugging) {
					await waitFor(() => this.isRunning || !alive());
					clock = performance.now();
					continue;
				}
				if (this.isDebugging) {
					if (code[vm.pc]) {
						this.Debugger.eraseBreakpoint();
						this.Debugger.colorLineEditor(code[vm.pc].line - 1); // base 1 -> base 0
					}
					if (this.isRunning) {
						await this.sleep_ms(this.Debugger.timeoutDebug);
					} else {
						await waitFor(() => this.Debugger.nextStep || !alive() || this.isRunning);
						this.Debugger.nextStep = false;
					}
					if (!alive()) break;
					const ms = vm.step();
					this.Mosaic.specific.render(vm);
					if (ms) await this.sleep_ms(ms);
					clock = performance.now();
					continue;
				}
				// virtual clock: the instructions due since the last turn, then wait (pause, sound) or yield to the page
				const now = performance.now();
				clock = Math.max(clock, now - 100);
				for (let n = 0; clock <= now && n < 5000 && !vm.ended; n++) {
					clock += vm.step() + 1000 / this.IPS;
				}
				this.Mosaic.specific.render(vm);
				await this.sleep_ms(Math.max(4, clock - now));
			}
		} catch (e) {
			return this.handleError(e);
		}
		// an older run waking up must not draw its machine over the new one
		if (!alive()) return;
		this.Mosaic.specific.render(vm);
		if (vm.ended && this.serialBuffer) this.serial('\n');
	},

	/**
	 * Text of sertxd: shown in the console line by line.
	 */
	serial: function (text) {
		const lines = (this.serialBuffer + text).split('\n');
		this.serialBuffer = lines.pop();
		lines.forEach(line => InterfaceMonitor.writeConsole(line.replace(/\r/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')));
	},

	/**
	 * Sound of the program (note 0 = silence).
	 */
	beep: function (note, ms) {
		if (!note) return;
		this.picaxeAudio ??= new AudioContext();
		const osc = this.picaxeAudio.createOscillator();
		osc.frequency.value = 200 + note * 30; // ponytail: approximate pitch, calibrate on the board
		osc.connect(this.picaxeAudio.destination);
		osc.start();
		osc.stop(this.picaxeAudio.currentTime + ms / 1000);
		this.picaxeOsc = osc;
	},

	handleError: function (e) {
		let message;
		if (e instanceof PicaxeCompileError) {
			message = jsonPath(/not supported yet/.test(e.message) ? 'code.simulator.messages.picaxeSimulatorChip' : 'code.serialAPI.picaxeCompileError').replace('%1', e.message);
		} else if (e instanceof PicaxeRuntimeError) {
			message = jsonPath('code.simulator.messages.picaxeRuntimeError').replace('%1', e.message);
		} else {
			console.error(e);
			throw e;
		}
		UIManager.showErrorMessage('error-message', message);
		this.stop();
	}
};
