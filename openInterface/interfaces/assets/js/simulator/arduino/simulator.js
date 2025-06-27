// Main Simulator object
var Simulator = {
	TYPE: "JSCPP",
	COMMENT_CHARACTER: '//',
	is_changing_slider: false,
	loopStep: false,
	currentDelay: 0,
	cpp: {},
	//to easier the variables search
	step: {
		v: {
			target: []
		}
	},
	outputMemory: '',
	serialData: '',
	initLength: { 'arduino': 2, 'letsstartcoding': 2, 'mBot': 1 },
	Arduino: Object.create(null),
	rt: null,
	variables: {},
	constants: ['RAND_MAX', 'NULL', 'HIGH', 'LOW', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'DEC', 'OCT', 'HEX', 'PI', 'HALF_PI', 'TWO_PI', 'DEG_TO_RAD', 'RAD_TO_DEG', 'M_PI', 'M_E', 'M_LOG2E', 'M_LOG10E', 'M_LN2', 'M_LN10', 'M_1_PI', 'M_2_PI', 'M_2_SQRTPI', 'M_SQRT2', 'M_SQRT1_2', 'INFINITY', 'PORT_1', 'PORT_2', 'PORT_3', 'PORT_4', 'M1', 'M2', 'LED_BUFFER_SIZE', 'BRIGHTNESS_0', 'BRIGHTNESS_1', 'BRIGHTNESS_2', 'BRIGHTNESS_3', 'BRIGHTNESS_4', 'BRIGHTNESS_5', 'BRIGHTNESS_6', 'BRIGHTNESS_7'],
	monitor: {
		write() { }
	},

	/**
	 * Parses variables from code and add them to variables panel.
	 */
	updateVariablesPanel: function () {
		this.Debugger.emptyVariablesPanel();
		if (this.rt) {
			const varPanel = this.rt.scope;
			for (i in varPanel) {
				if (varPanel[i]) {
					const variables = varPanel[i].variables;
					for (var entryName in variables) {
						if (!this.constants.includes(entryName) && !(variables[entryName].t.type && variables[entryName].t.type == 'function') && !/(cin|cout|endl)/.test(entryName)) {
							let value = variables[entryName].v;
							if (typeof variables[entryName].v == 'object') {
								if (typeof variables[entryName].v.members == 'undefined') {
									value = Simulator.getStringArrayFromInterpretor(variables[entryName]);
								}
							}
							let variable = {
								"name": entryName,
								"value": value,
								"type": variables[entryName].t.name
							};
							this.Debugger.addVarToPanel(variable);
						}
					}
				}
			}
		}
		this.Debugger.refreshDisplayVars();
	},

	doStep: function (step, rt, init) {
		const currentNode = rt.interp.currentNode;
		this.Debugger.current = {
			node: currentNode,
			step: step
		};
		this.rt = rt;
		var _this = this;
		return new Promise(async function (resolve, reject) {
			let lineToDraw;
			if (Simulator.loopStep) {
				Simulator.loopStep = false;
				await _this.sleep_ms(50);
				if (Simulator.stop_flag) {
					reject("Simulator stopped.");
				}
			}
			if (currentNode) {
				if (currentNode.type == "IdentifierExpression" && ['setup', 'loop'].includes(currentNode.Identifier)) {
					if (currentNode.Identifier == "loop") {
						await _this.sleep_ms(50);
						if (Simulator.stop_flag) {
							reject("Simulator stopped.");
						}
					}
					resolve();
				}
			}
			if (currentNode) {
				lineToDraw = currentNode.sLine - Simulator.initLength[INTERFACE_NAME] - (init ? 1 : 0);
			}
			if (_this.isRunning) {
				if (_this.isDebugging && !_this.stop_flag) {
					_this.Debugger.eraseBreakpoint();
					_this.Debugger.colorLineEditor(lineToDraw);
					if (_this.Debugger.lastLine != lineToDraw) {
						await _this.sleep_ms(_this.Debugger.timeoutDebug);
						if (Simulator.stop_flag) {
							reject("Simulator stopped.");
						}
						_this.Debugger.lastLine = lineToDraw;
					}
				}
				if (_this.currentDelay > 0) {
					await _this.sleep_ms(_this.currentDelay);
					_this.currentDelay = 0;
					if (Simulator.stop_flag) {
						reject("Simulator stopped.");
					}
				}
			} else {
				if (_this.isDebugging && !_this.stop_flag) {
					_this.Debugger.eraseBreakpoint();
					_this.Debugger.colorLineEditor(lineToDraw);
					if (_this.Debugger.lastLine != lineToDraw) {
						await waitFor(_ => (_this.Debugger.nextStep || _this.stop_flag || _this.isRunning));
						_this.Debugger.nextStep = false;
						if (Simulator.stop_flag) {
							reject("Simulator stopped.");
						}
						_this.Debugger.lastLine = lineToDraw;
					}
				} else {
					await waitFor(_ => (_this.isRunning || _this.stop_flag));
				}
			}
			if (Simulator.stop_flag) {
				reject("Simulator stopped.");
			}
			resolve();
		});
	},

	sleep_ms: function (delay_ms) {
		return new Promise(resolve => {
			Simulator.clearCurrentDelay = resolve;
			setTimeout(resolve, delay_ms);
		});
	},

	millis: function () {
		return Date.now();
	},

	/**
	 * Run arduino code in the simulator.
	 */
	runCode: async function () {
		try {
			this.startTime = Date.now();
			this.mainExecutionStarted = true;
			await JSCPP.run(this.code, 4321, {
				'stdio': Simulator.monitor,
				'includes': Simulator.Mosaic.externalLibraries.includes
			});
		} catch (error) {
			this.handleError(error);
		}
	},

	/**
	 * Handle error and print it in 'error-message'.
	 * @param {Object} err 
	 */
	handleError: function (err) {
		console.error(err)
		if (!/Simulator stopped./.test(err)) {
			let error = String(err);
			if (/ERROR: Parsing Failure:/.test(error)) {
				const errorObj = JSON.parse(error.split("Parsing Failure:\n")[1]);
				error = "Line " + (errorObj.line - Simulator.initLength[INTERFACE_NAME] - 1) + ": " + "Parsing Failure: </br><b>" + errorObj.location.prolog + "</b>";
			} else if (/Error: [0-9]{1,2}:[0-9]{1,2}/.test(error)) {
				const line = error.match(/Error: ([0-9]{1,2}):([0-9]{1,2})/)[1];
				error = "Line " + (line - Simulator.initLength[INTERFACE_NAME]) + ": " + error.split(/Error: [0-9]{1,2}:[0-9]{1,2}/)[1];
				const includeError = error.match(/cannot find library/);
				if (includeError && includeError.length > 0) {
					error = error.replace(
						/ cannot find library: ([a-zA-Z0-9_]{1,50}).h/,
						jsonPath('code.simulator.messages.module') + " <b>$1.h</b> " + jsonPath('code.simulator.messages.importError')
					);
				} else if (/type Me(.*) is not defined/.test(error) && INTERFACE_NAME == "mBot") {
					error = error.replace(
						/type (Me(.*)) is not defined/,
						jsonPath('code.simulator.messages.module') + " <b>$1.h</b> " + jsonPath('code.simulator.messages.importError')
					);
				}
			} else if (/TypeError: Cannot read properties of undefined \(reading 'type'\)/.test(error)) {
				error = "[Argument types] Function does not matching arguments definition";
			} else if (/TypeError: Cannot read properties of undefined \(reading 'v'\)/.test(error)) {
				error = "[Function] Function not found";
			}
			UIManager.showErrorMessage('error-message', error.replace(/Line ([0-9]{1,3}):/, "<b>Line $1:</b>"));
			this.stop();
		}
	},

	initSerialInput: function () {
		document.getElementById('serial-send').addEventListener('click', function () {
			if (!Simulator.isStopped) {
				const data = $('#serial-input').val();
				if (data != '') {
					Simulator.serialData += data;
					$('#serial-input').val('');
					InterfaceMonitor.writeConsole('Donnée envoyée: ' + data + '\n');
					InterfaceMonitor.history.push(data);
				}
			}
		});
	},

	/**
	 * Return String from array of character codes generated by
	 * JSCPP interpretor.
	 * @param {[object]} str
	 * @param {bool} lastChar
	 * @return {string} myString
	 */
	getStringFromInterpretor: function (str, lastChar = false) {
		if (str.v && typeof str.v.v == 'number') {
			return String(str.v.v);
		}
		if (typeof str.v == 'string') {
			return str.v;
		}
		let myString = '';
		if (str.v && str.v.target) {
			var targett = str.v.target;
		} else if (str.v.v) {
			var targett = str.v.v.target;
		}
		if (targett) {
			let n = targett.length - 1;
			if (lastChar) {
				n = targett.length;
			}
			for (var i = 0; i < n; i++) {
				if (lastChar && (targett[i].v < 10) && (targett[i].v >= 0)) {
					targett[i].v += 48;
				}
				if (targett[i].v != 0) {
					myString += String.fromCharCode(targett[i].v);
				}
			}
		}
		return myString;
	},

	getStringArrayFromInterpretor: function (array) {
		let stringArray = "{";
		if (array.v && array.v.target) {
			var targett = array.v.target;
		} else if (array.value) {
			var targett = array.value.v.target;
		}
		if (targett) {
			for (var i = 0; i < targett.length - 1; i++) {
				stringArray += targett[i].v + ',';
			}
		}
		return stringArray + "}";
	},

	getPinString: function (pin, subtitle = false) {
		if (INTERFACE_NAME === 'mBot') {
			subtitle = true;
		}
		return pin >= 14 ? 'A' + (pin - 14) : (subtitle ? 'D' : '') + pin;
	},

	setVariable: function (rt, arg, value) {
		for (var i = rt.scope.length - 1; i > -1; i--) {
			const vars = rt.scope[i].variables;
			if (vars) {
				if (arg.Identifier && vars[arg.Identifier]) {
					vars[arg.Identifier] = value;
					break;
				} else if (arg.Expression && arg.Expression.Identifier && vars[arg.Expression.Identifier]) {
					vars[arg.Expression.Identifier] = value;
				}
			}
		}
	},

	getVariable(name) {
		if (name) {
			const v = this.rt.readVar(name);
			return {
				type: this.rt.makeTypeString(v.t),
				value: v.v
			};
		}
		else {
			const usedName = new Set();
			const ret = [];
			for (var scopeIndex = this.rt.scope.length - 1; scopeIndex >= 0; scopeIndex--) {
				for (name of Object.keys(this.rt.scope[scopeIndex].variables)) {
					const val = this.rt.scope[scopeIndex].variables[name];
					if ((typeof val === "object") && "t" in val && "v" in val) {
						if (!usedName.has(name)) {
							usedName.add(name);
							ret.push({
								name,
								type: this.rt.makeTypeString(val.t),
								value: this.rt.makeValueString(val)
							});
						}
					}
				}
			}
			return ret;
		}
	}

};


/* IMAGE INTERACT FUNCTIONS */

Simulator.music = {
	audioContext: null,
	sinusoide: null,
	started: false,
	startAudio: function () {
		if (!Simulator.music.started) {
			Simulator.audioContext = new (window.AudioContext || window.webkitAudioContext)();
			Simulator.music.sinusoide = Simulator.audioContext.createOscillator();
			Simulator.music.volume = Simulator.audioContext.createGain();
			Simulator.music.sinusoide.start(0);
			Simulator.music.sinusoide.connect(Simulator.music.volume);
			Simulator.music.sinusoide.type = 'sine';
			Simulator.music.started = true;
		}
	},
	pitch: async function (frequency, duration) {
		Simulator.music.sinusoide.frequency.value = frequency;
		Simulator.music.volume.connect(Simulator.audioContext.destination);
		if (typeof duration != undefined) {
			await Simulator.sleep_ms(duration);
			Simulator.music.stop();
		}
	},
	stop: function () {
		if (Simulator.music.started) {
			Simulator.music.volume.disconnect(Simulator.audioContext.destination);
			Simulator.music.sinusoide = null;
			Simulator.audioContext = null;
			Simulator.music.started = false;
		}
	}
};