// Main Simulator object
var Simulator = {
	TYPE: "JSCPP",
	ERROR_TYPES: {
		PARSING: "ParsingError",
		LOADING_LIB: "LoadingLibraryError",
		UNKNOWN_LIB: "UnknownLibraryError"
	},
	COMMENT_CHARACTER: '//',
	loopStep: false,
	currentDelay: 0,
	outputMemory: '',
	serialData: '',
	initLength: { 'arduino': 3, 'letsstartcoding': 3, 'mBot': 1 },
	rt: null,
	variables: {},
	constants: ['RAND_MAX', 'NULL', 'HIGH', 'LOW', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'DEC', 'OCT', 'HEX', 'PI', 'HALF_PI', 'TWO_PI', 'DEG_TO_RAD', 'RAD_TO_DEG', 'M_PI', 'M_E', 'M_LOG2E', 'M_LOG10E', 'M_LN2', 'M_LN10', 'M_1_PI', 'M_2_PI', 'M_2_SQRTPI', 'M_SQRT2', 'M_SQRT1_2', 'INFINITY', 'PORT_1', 'PORT_2', 'PORT_3', 'PORT_4', 'M1', 'M2', 'LED_BUFFER_SIZE', 'BRIGHTNESS_0', 'BRIGHTNESS_1', 'BRIGHTNESS_2', 'BRIGHTNESS_3', 'BRIGHTNESS_4', 'BRIGHTNESS_5', 'BRIGHTNESS_6', 'BRIGHTNESS_7'],
	monitor: {
		write() { }
	},
	errorInfos: {},
	currentDelays: {},

	/**
	 * Parses variables from code and add them to variables panel.
	 */
	updateVariablesPanel: function () {
		this.Debugger.emptyVariablesPanel();
		if (this.rt) {
			const varPanel = this.rt.scope;
			for (const i in varPanel) {
				if (varPanel[i]) {
					const variables = varPanel[i].variables;
					for (const entryName in variables) {
						if (!this.constants.includes(entryName) && !(variables[entryName].t.type && variables[entryName].t.type == 'function') && !/(cin|cout|endl)/.test(entryName)) {
							let value = variables[entryName].v;
							if (typeof variables[entryName].v == 'object') {
								if (typeof variables[entryName].v.members == 'undefined') {
									value = Simulator.getStringArrayFromInterpretor(variables[entryName]);
								}
							}
							const variable = {
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
		const _this = this;
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
			const id = randHex();
			Simulator.currentDelays[id] = resolve;
			setTimeout(() => {
				delete Simulator.currentDelays[id];
				resolve();
			}, delay_ms);
		});
	},

	millis: function () {
		return Date.now();
	},

	/**
	 * Run arduino code in the simulator.
	 */
	runCode: async function () {
		this.startTime = Date.now();
		this.mainExecutionStarted = true;
		this.rt = null;
		this.Mosaic.interruptions = {};
		const default_includes = ["Arduino.h"];
		if ('Vittascience.h' in this.Mosaic.externalLibraries.includes) {
			default_includes.push('Vittascience.h');
		}
		await JSCPP.run(this.code, 4321, {
			'stdio': this.monitor,
			'includes': this.Mosaic.externalLibraries.includes,
			'default_includes': default_includes,
			'limits': SIMULATOR_CPP_LIMITS[this.board.mcu],
			'type_formats': SIMULATOR_TYPE_FORMATS[this.board.mcu],
			'board': this.board,
			'overflow': "warn",
			"warn_callback": function (warn_msg) {
				InterfaceMonitor.writeConsole(warn_msg, 'interrupt', true, true);
			},
			"error_types": this.ERROR_TYPES
		});
	},

	getMessageByError: function (error, previousError) {
		const boldName = (i) => `<b>'${i}'</b>`;
		let node = null;
		let showError = error.message;
		if (error.cause) {
			if (error.cause.node) {
				node = error.cause.node;
			}
			if (error.cause.type == this.ERROR_TYPES['PARSING']) {
				const line = error.cause.error.line - this.initLength[INTERFACE_NAME];
				const lineMessage = `<b>Line ${line}:</b> `;
				showError = lineMessage + 'Syntaxe incorrecte ou inconnue';
				const loc = error.cause.error.location;
				const lines = (loc.prolog + loc.token + loc.epilog).replaceAll('<', '&lt;').replaceAll('>', '&gt;');
				showError += '</br><b>' + lines.replaceAll('\\n', '</br>') + '</b>';
				return showError;
			}
		} else if (this.rt && this.rt.interp) {
			node = this.rt.interp.currentNode;
		}
		let lineMessage = "";
		let name = "";
		if (node) {
			name = node.Expression ? node.Expression.Identifier : node.name;
			lineMessage = `<b>Line ${node.sLine - this.initLength[INTERFACE_NAME]} : ${node.sColumn}</b>: `;
		}
		if (error.cause) {
			if (error.cause.name) name = error.cause.name;
			if (error.cause.type == this.ERROR_TYPES['LOADING_LIB']) {
				showError = lineMessage + 'Chargement impossible de ';
				showError += boldName(name);
			} else if (error.cause.type == this.ERROR_TYPES['UNKNOWN_LIB']) {
				showError = lineMessage + 'Librairie inconnue: ';
				showError += boldName(name);
				showError += '</br>' + jsonPath('code.simulator.messages.importError');
			} else {
				showError = lineMessage + showError;
			}
		} else {
			if (node) {
				const name = node.Expression ? node.Expression.Identifier : node.name;
				if (name) {
					const lineMessage = `<b>Line ${node.sLine - this.initLength[INTERFACE_NAME]} : ${node.sColumn}</b>: `;
					showError = lineMessage + 'Simulation non implémentée: ';
					showError += boldName(name);
					console.error(error)
				}
			}
		}
		if (!previousError) previousError = "";
		else previousError += '</br>';

		if (error.cause && error.cause.e) {
			return previousError + this.getMessageByError(error.cause.e, showError);
		}
		return previousError + showError;
	},

	/**
	 * Handle error and print it in 'error-message'.
	 * @param {Object} err 
	 */
	handleError: function (err) {
		UIManager.showErrorMessage('error-message', this.getMessageByError(err));
		this.stop();
	},

	getSerialInput: function () {
		if (this.isStopped || !this.isRunning) {
			InterfaceMonitor.writeConsole('code.simulator.messages.replaySimulator', "neutral", false, true)
		} else if (!this.isStopped && this.isRunning) {
			const data = $('#serial-input').val();
			if (data) {
				this.serialData += data;
				$('#serial-input').val('');
				InterfaceMonitor.writeConsole(jsonPath('code.simulator.messages.sentData') + " " + data + '\n');
				InterfaceMonitor.history.push(data);
			}
		} else if (!this.isOpen) {
			console.error("Function on #serial-send button is not for InterfaceConnection.")
		}
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
		if (this.rt.isStringClass(str)) {
			return this.getStringFromInterpretor(str.v.members._value);
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
	},

	async execInterpretedFunction(rt, _this, funcName, args, scope = "global") {
		async function runOnEvent(rt, event) {
			const startTime = Date.now();
			while (true) {
				const step = event.next();
				if (step.value && step.value.type === rt.SUSPEND_TOKEN) {
					await step.value.promise;
					continue;
				}
				if (step.done) {
					break;
				}
				if (rt.config.maxTimeout && ((Date.now() - startTime) > rt.config.maxTimeout)) {
					throw new Error("Time limit exceeded.");
				}
			}
		};

		const onEventFunc = rt.getFunc(scope, funcName, args)(rt, _this);
		await runOnEvent(rt, onEventFunc);
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