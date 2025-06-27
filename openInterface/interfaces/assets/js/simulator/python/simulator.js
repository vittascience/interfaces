// Main Simulator object
const Simulator = {
	TYPE: "Skulpt",
	extract_mod: null, // can be usefull to extrat functions and variable from the code, for skultp misceval.asyncToPromise
	COMMENT_CHARACTER: '#',
	timeoutDebugStarted: false,
	timeoutInCodeExecution: 0,
	timeoutInCodeExecutionStarted: false,
	mainExecutionStarted: false,
	startTime: 0,
	serialData: '',
	dropdownOptions: {},
	intervals: {},
	Behaviours: {},
	CodeFriendly: {},
	PATH_LIB: _PATH + '/' + INTERFACE_NAME + '/assets/js/simulator/src/',
	PATH_LIB_PY: _PATH + '/' + INTERFACE_NAME + '/assets/lib/',
	PATH_LIB_COMMON: _PATH + '/interfaces/assets/js/simulator/python/lib/',
	monitor: {
		output: function (text, html = false) {
			try {
				if (Simulator._hasAutoCorrector() && (AutoCorrector.isValidating || AutoCorrector.isRecording)) {
					return;
				}
				if (!html) {
					text = text.replace('>', "&#62;").replace('<', "&#60;");
					if (!Simulator._hasTIsimulator()) {
						const value = parseFloat(text);
						let graph = null;
						if (!isNaN(value)) {
							graph = '@Graph:Console:' + value + '|';
						} else if (text.match(/^@Graph:/)) {
							graph = text;
						}
						if (graph !== null) {
							InterfaceMonitor.sendDataToChart(graph);
						}
					}
				}
				const monitor = document.getElementById('console');
				if (text.length >= 1 && !html) {
					if (Simulator._hasTIsimulator()) {
						if (text.includes('AVOID_NONE_RETURN')) {
							text = '';
						}
						Simulator.Mosaic.specific.ti.addLinesToScreen(text);
					}
					if (Simulator._hasGalaxiaSimulator()) {
						if (!text.match(/^@Graph:/)) {
							Simulator.Mosaic.specific.galaxiaUi.addLinesToScreen(text);
						} else {
							//remove @Graph: from the message to print value to screen
							const parsedMessage = text.split(':')
							Simulator.Mosaic.specific.galaxiaUi.addLinesToScreen(parsedMessage[parsedMessage.length - 2] + ':' + Number(parsedMessage[parsedMessage.length - 1].replace('|', '')).toFixed(2));
						}
					}
					text = text.replace(/\n/g, '<br>');
				}
				monitor.insertAdjacentHTML('beforeend', '<p>' + text + '</p>');
				monitor.scrollTo(0, monitor.scrollHeight);
			} catch (e) {
				console.error(e)
			}
		}
	},

	builtinRead: function (file) {
		/**
		* file The parameter represents the path of the currently loaded module , A module name will be as follows 6 Path and priority lookup , Suppose the module name is mod：
		* src/builtin/mod.js
		* src/builtin/mod/__init__.js
		* src/lib/mod.js
		* src/lib/mod/__init__.js
		* ./mod.js
		* ./mod/__init__.js
		* One of the first four paths is skulpt Matching with the built-in module .
		* */
		// console.log("Attempting file: " + Sk.ffi.remapToJs(file));
		// Match external modules 
		if (Simulator.Mosaic.externalLibraries[file] !== undefined) {
			// Use skulpt Provided promiseToSuspension, Wait for the asynchronous task to complete before continuing 
			return Sk.misceval.promiseToSuspension(
				fetch(Simulator.Mosaic.externalLibraries[file]).then((resp) => resp.text())
			);
		}
		if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[file] === undefined) {
			throw "File not found: '" + file + "'";
		}
		// If the external module cannot be matched, find it from the built-in module 
		return Sk.builtinFiles.files[file];
	},

	initSkulpt: function () {
		const _this = this;
		Sk.inputfun = function (prompt) {
			return new Promise(function (resolve, reject) {
				$('#console_raw_input_holder').remove();
				_this.monitor.output(prompt);
				_this.monitor.output(
					`<div id="console_raw_input_holder">
						<input type="text" name="raw_input" id="raw_input" class="raw_input_form" value=""/>
						<button id="raw_input_accept" class="v-btn" type="submit">OK</button>
					</div>`, true);
				$('#raw_input').focus();
				$('#raw_input_accept').on('click', function () {
					const value = $("#raw_input").val();
					$('#console_raw_input_holder').remove();
					_this.monitor.output(' ' + value + NEWLINE);
					resolve(value)
				});
			});
		};

		Sk.configure({
			breakpoints: function (filename, currentLine, offset) {
				const lineToDraw = currentLine - 1;
				if (_this.isDebugging) {
					_this.Debugger.eraseBreakpoint();
					_this.Debugger.colorLineEditor(lineToDraw);
				}
				_this.Debugger.lastLine = lineToDraw;
				return true;
			},
			debugging: true,
			output: _this.monitor.output,
			__future__: Sk.python3,
			read: _this.builtinRead
		});

		Sk.builtins.bytearray = function (value) {
			return new Sk.builtin.bytes(value);
		};
	},

	/**
	 * Convenience function that allows modules to run syncronous code asyncrounously.
	 * For example time.sleep needs to pause the python program but shouldn't make the browser unresponsive
	 * @param {Function} asyncFunc
	 * @return {Object} susp
	 */
	runAsync: function (asyncFunc) {
		var p = new Promise(asyncFunc);
		var result;
		var susp = new Sk.misceval.Suspension();
		susp.resume = function () {
			return result;
		};
		susp.data = {
			type: "Sk.promise",
			promise: p.then(function (value) {
				result = value;
				return value;
			}, function (err) {
				result = "";
				Simulator.handleError(err);
				return new Promise(function (resolve, reject) { });
			})
		};
		return susp;
	},

	sleep_ms: function (delay_ms, result = null) {
		return new Sk.misceval.promiseToSuspension(new Promise(function (resolve) {
			Simulator.clearCurrentDelay = resolve;
			setTimeout(() => {
				Simulator.clearCurrentDelay = null;
				resolve(Sk.ffi.remapToPy(result));
			}, delay_ms);
		}));
	},

	/**
	 * Run python code in the simulator.
	 */
	runCode: function () {
		var _this = this;
		Simulator.debugDelay = null;
		Simulator.codeExecutionDelay = null;

		Sk.python3 = INTERFACE_NAME === 'TI-83' ? Sk.python3 : true;
		Sk.execLimit = Infinity;

		Sk.misceval.callsimAsync({
			"Sk.debug": _this.doStep
		}, function () {
			_this.mainExecutionStarted = true;
			_this.startTime = Date.now();
			return Sk.importMainWithBody("<stdin>", false, _this.code, true);
		})
			.then(function (mod) {
				$("#simulator_play").prop('disabled', true);
				$("#simulator_pause").prop('disabled', false);
				_this.extract_mod = mod;
				if (_this._hasTIsimulator() && !_this.wasPaused) {
					_this.Mosaic.specific.ti.clearScreen(true);
					_this.Mosaic.specific.ti.addEndOfExecution();
				}
			}, _this.handleError);
	},

	/**
	 * Handle error and print it in console simulator.
	 * @param {Object} err 
	 */
	handleError: function (err) {
		const stopProgram = err.toString().match(/TimeLimitError/);
		const stopDebug = err.toString().match(/waiting next step/);
		const importError = err.toString().match(/ImportError/);
		if (importError && importError.length > 0) {
			const message = err.toString().replace(
				/ImportError: No module named ([a-zA-Z0-9_]{1,50}) on line ([0-9]{1,5})/,
				jsonPath('code.simulator.messages.module') + "<b> $1 </b>" + jsonPath('code.simulator.messages.importError')
			);
			UIManager.showErrorMessage("error-message", message);
		} else if (stopProgram == null) {
			UIManager.showErrorMessage("error-message", err.toString());
			if (/Assertion failure: bad argument/.test(String(err))) {
				UIManager.resetMessage("error-message");
				UIManager.showWarningMessage("warning-message", "Une erreur est survenue, relancer le simulateur");
			}
		}
		// console.error(err); for debug
		if (stopProgram == null && stopDebug == null) {
			Simulator.stop();
		}
	},

	/**
	 * Parses variables from code and add them to variables panel.
	 */
	updateVariablesPanel: function () {
		this.Debugger.emptyVariablesPanel();
		for (let entryName in Sk.globals) {
			const entry = Sk.globals[entryName];
			const removing = (entryName !== "__name__" && entryName !== "__file__" && entryName !== "__doc__" && entryName !== "__package__")
			if (entry.v !== undefined && removing) {
				const variable = {
					"name": entryName,
					"value": entry.v === null ? "None" : entry.v,
					"type": Sk.abstr.typeName(entry)
				};
				this.Debugger.addVarToPanel(variable);
			}
		}
		this.Debugger.refreshDisplayVars();
	},

	doStep: async function (susp) {
		const resetStep = function () {
			Simulator.Debugger.nextStep = false;
			clearTimeout(Simulator.debugDelay);
			Simulator.timeoutDebugStarted = false;
			clearTimeout(Simulator.codeExecutionDelay);
			Simulator.timeoutInCodeExecutionStarted = false;
		};
		try {
			if (Simulator.stop_flag || Sk.execLimit == 0) {
				resetStep();
				return await Promise.resolve("Simulator stopped.")
			} else if (
				(!Simulator.isDebugging && !Simulator.isRunning) ||
				(Simulator.isDebugging && !Simulator.Debugger.nextStep) ||
				(Simulator.timeoutInCodeExecution > 0 && Simulator.isRunning)) {

				if (Simulator.isDebugging && Simulator.isRunning && !Simulator.timeoutDebugStarted) {
					Simulator.timeoutDebugStarted = true;
					Simulator.debugDelay = setTimeout(function () {
						Simulator.timeoutDebugStarted = false;
						Simulator.Debugger.nextStep = true;
					}, Simulator.Debugger.timeoutDebug);
				} else if (Simulator.timeoutInCodeExecution > 0 && !Simulator.timeoutInCodeExecutionStarted) {
					Simulator.timeoutInCodeExecutionStarted = true;
					Simulator.codeExecutionDelay = setTimeout(function () {
						Simulator.timeoutInCodeExecutionStarted = false;
						Simulator.timeoutInCodeExecution = 0;
					}, Simulator.timeoutInCodeExecution);
				}
				return new Promise((resolve, reject) => {
					setTimeout(function () {
						return resolve(Simulator.doStep(susp));
					}, 100);
				});
			} else {
				resetStep();
				if (Simulator._hasTIsimulator() && Simulator.Mosaic.specific.ti.turtleMoving) {
					return new Promise((resolve, reject) => {
						setTimeout(function () {
							return resolve(Simulator.doStep(susp));
						}, 50);
					});
				}
				await new Promise((r) => setTimeout(r, 5)); // Allow a short pause to avoid overloading the cpu (to adjust if needed) 
				return Promise.resolve(susp.resume());
			}
		} catch (e) {
			if (!Simulator.stop_flag) {
				return Promise.reject(e);
			} else {
				return Promise.resolve();
			}
		}
	},

	getSerialInput: function () {
		if (Simulator.isOpen) {
			if ($("#serial-input").val() != "") {
				Simulator.serialData = $("#serial-input").val();
				$("#serial-input").val("");
				Simulator.monitor.output(jsonPath(code.simulator.messages.radioData) + " " + Simulator.serialData + "\n");
			} else {
				Simulator.serialData = "";
			}
		}
	},

	/**
	 * Initialize module by id giving a new value. Update the animation.
	 * @param {string} id 
	 * @param {string} value 
	 */
	initializeModule: function (id, value) {
		const mod = this.getModuleByKey(id.split('_')[0]);
		if (mod.type == 'output') {
			if (mod.animate) {
				if (!isNaN(parseFloat(value)) && mod.id !== 'oled' && mod.id !== 'lcdGrove') {
					this.setAnimator(mod, id, parseFloat(value));
				} else {
					this.setAnimator(mod, id, value);
				}
			} else {
				console.error("[Info] Simulator - no output animator for module '" + id + "'");
			}
		} else if (mod.type == 'input') {
			$("#" + id + "_slider").slider('value', value);
		} else {
			console.error("[Info] Simulator - no I/O type for module '" + id + "'");
		}
	},

	/**
	 * Update Exercise panel.
	 */
	updateExercisePanel: function () {
		AutoCorrector.checkModulesInExercise();
		if ($("#simulator-modules").hasClass('visualizer-mode')) {
			AutoCorrector.sortRightModules();
			this.initMosaicSliders();
			this.Mosaic.specific.createSliders();
			if (this.Mosaic.groveRegex) {
				this.Mosaic.grove.createSliders();
			}
		}
	},

	generateEmptyModuleDiv: function () {
		return '<div class="simulator-module empty-module"></div>';
	},

	getExerciseModuleDiv: function (simuId) {
		const splittedId = simuId.split('_');
		const coreId = splittedId[0];
		const mod = this.getModuleByKey(coreId);
		if (/(pin|led) n°/.test(mod.pin) && splittedId[1] !== undefined) {
			const pinName = splittedId[1];
			return this.generateModuleDiv(mod, simuId, pinName, true);

			// TO DO : update multiplte div with same id (options)
			/*
			// case module has to be added with an other option with same pin
			const simulatedModules = Simulator.getMosaicModules();
			for (var j = 0; j < simulatedModules.length; j++) {
				let simuModuleId = simulatedModules[j].id.replace('ex-', '');
				if (simuModuleId && simuModuleId.match('-')) {
					simuModuleId = simuModuleId.split('-');
					if (simuModuleId[0] == mod.id.split('-')[0] && simuModuleId[1].split('_')[1] == pin.name && !$("#" + simuId).length) {
						html = this.generateModuleDiv(mod, id, pin.name, true);
						
					}
				}
			}
			*/
		} else {
			if (!mod.large) {
				return this.generateModuleDiv(mod, simuId, mod.pin, true);
			}
		}
	},

	_stopIntervals: function () {
		for (var i in this.intervals) {
			clearInterval(this.intervals[i]);
		}
	}

};

/**
 * Music played by browser for the simulator.
 */

Simulator.music = {
	audioContext: null,
	sinusoide: null,
	volume: null,
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
	wait: async function (duration) {
		await sleep_ms(duration);
	},
	pitch: async function (frequency, duration) {
		Simulator.music.sinusoide.frequency.value = frequency;
		Simulator.music.volume.connect(Simulator.audioContext.destination);
		await Simulator.music.wait(duration);
		Simulator.music.stop();
	},
	stop: function () {
		if (Simulator.music.started) {
			Simulator.music.volume.disconnect(Simulator.audioContext.destination);
			Simulator.audioContext = null;
			Simulator.music.started = false;
		}
	}
};