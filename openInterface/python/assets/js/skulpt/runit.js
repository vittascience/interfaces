// Main Python Run object
const PythonRun = {

    canRun: [],
    externalLibraries: {},
    TIME_LIMIT: 180, // 180 s (3 min)
    PATH_LIB: _PATH + '/' + INTERFACE_NAME + '/assets/js/skulpt/src/',
    monitor: null,

    firstExecution: true,
    replInitialized: false,
    isStopped: true,
    isTest: false,
    extract_mod: null,

    /**
     * Initialize Python runner.
     * @public
     */
    init: function () {
        this.monitor = document.getElementById('console');
        this.canRun = [true, 'noError'];
        // check if external externalLibraries are needed from TI-83 else use default python interface externalLibraries
        if (INTERFACE_NAME === 'TI-83') {
            this.externalLibraries = Simulator.Mosaic.externalLibraries;
        } else {
            this.externalLibraries = {
                'src/lib/numpy/__init__.js': this.PATH_LIB + 'numpy/__init__.js',
                'src/lib/numpy/random/__init__.js': this.PATH_LIB + 'numpy/random/__init__.js',
                'src/lib/matplotlib/__init__.js': this.PATH_LIB + 'matplotlib/__init__.js',
                'src/lib/matplotlib/pyplot/__init__.js': this.PATH_LIB + 'matplotlib/pyplot/__init__.js',
                'src/lib/matplotlib/cmath/__init__.js': this.PATH_LIB + 'matplotlib/cmath/__init__.js',
                'src/lib/vittaia/__init__.js': this.PATH_LIB + 'vittaia/__init__.js'
            };
        }
        /**
         * Is thrown when the execution has been stopped by Ctrl+C or Del. The compiler
         * checks for an Sk.keyboardinterrupt flag, if set the exception is thrown.
         * @constructor
         * @extends Sk.builtin.BaseException
         * @param {...*} args
         */
        Sk.builtin.KeyboardInterrupt = function (args) {
            var o;
            if (!(this instanceof Sk.builtin.KeyboardInterrupt)) {
                o = Object.create(Sk.builtin.KeyboardInterrupt.prototype);
                o.constructor.apply(o, arguments);
                return o;
            }
            Sk.builtin.BaseException.apply(this, arguments);
        };
        Sk.abstr.setUpInheritance("KeyboardInterrupt", Sk.builtin.KeyboardInterrupt, Sk.builtin.BaseException);
        const _this = this;
        $("body").on('click', '#stopRunButtonPython', async function () {
            return await _this.stop();
        });
        Sk.hardInterrupt = false;
    },

    /**
     * Start standard python skulpt running.
     * @public
     * @param {string} code
     * @param {string} outputDivId
     */
    start: async function (code, outputDivId) {
        this.replInitialized = true;
        this.monitor = document.getElementById(outputDivId);
        if (this.firstExecution) {
            if (INTERFACE_NAME !== 'TI-83') {
                $(this.monitor).css('color', "var(--text-1)");
                $(this.monitor).html('');
            } else {
                $(this.monitor).css('color', "black");
            }
            this.firstExecution = false;
        }
        this.isTest = false;
        await this._runCode(code, true);
        return true;
    },

    /**
     * Execute unit tests of python.
     * @public
     * @param {string} code
     * @param {string} outputDivId
     * @param {Array<Object>} test
     * @param {Object} exercice
     */
    startTest: async function (code, outputDivId, test, exercise) {
        code = code.replace(/input\(["'].+["']\)/, "1");
        let input = 'print("@vittatest"';
        for (var unit in test) {
            input += ',"@unitest",';
            if (test[unit].inputs == false) {
                input += exercise.functionName + '()';
            } else {
                input += exercise.functionName + '(';
                for (let l = 0; l < test[unit].inputs.length; l++) {
                    input += test[unit].inputs[l];
                    if (l != test[unit].inputs.length - 1) input += ",";
                }
                input += ')';
            }
        }
        input += ')';
        const codeBis = code + "\n" + input;
        this.monitor = document.getElementById(outputDivId);
        this.isTest = true;
        await this._runCode(codeBis);
        return true;
    },

    /**
     * Stop python running.
     * @public
     * @returns {Promise}
     */
    stop: function () {
        return new Promise((resolve, reject) => {
            Sk.hardInterrupt = true;
            const _this = this;
            const stop = function () {
                setTimeout(function () {
                    if (_this.isStopped) {
                        _this.firstExecution = true;
                        PythonDebugger.lastLine = 0;
                        Sk.hardInterrupt = false;
                        resolve();
                    } else {
                        stop();
                    }
                }, 100);
            };
            stop();
        });
    },

    /**
     * Reset python running.
     * @public
     */
    reset: async function () {
        if (!this.isStopped) await this.stop();
        this.clearMonitor();
        Sk.globals = null;
        PythonDebugger.reset();
        this.firstExecution = true;
        this.isTest = false;
        this.extract_mod = null;
    },

    /**
     * Reset python unit tests and manage the relevant buttons
     * @public
     */
    resetUnitTests: function () {
        window.localStorage.PythonUnitTests = "";
        $(".ide-btn-pythtest").hide();
        document.querySelector('#runButtonPython').style.borderRadius = '15px';
    },

    /**
     * Clear monitor.
     * @public
     */
    clearMonitor: function () {
        if (INTERFACE_NAME === 'python') {
            updateAriaLiveRegion(i18next.t('code.console.feedback.cleared'));
            $("#console").html(`${jsonPath('code.welcome.python')}\n>>>\n`);
        }
        this.firstExecution = true;
        $('#canvas-matplotlib, #canvas-turtle').css({
            'display': 'none'
        }).html('');
    },

    /**
     * Initialize python REPL.
     * @public
     */
    initRepl: async function (id = "console") {
        if (!this.replInitialized) {
            vittapytherButton.replManager();
            await this.start('', id);
            PythonREPL.init();
            PythonRun.monitor.click();
        }
    },

    /**
     * Clear screen and reset REPL.
     * @public
     */
    clearScreenAndResetRepl: function () {
        this.clearMonitor();
        this.replInitialized = false;
    },

    /**
     * Start running skulpt.
     * @private
     * @param {string} code
     * @param {boolean} tooltip
     * @returns {Promise}
     */
    _runCode: async function (code, tooltip = false) {
        await this.reset();
        if (tooltip) {
            vittapytherButton.setRunningCodeTooltip();
        }
        this.isStopped = false;
        return new Promise((resolve, reject) => {
            code = this._getAdaptedCode(code);
            if (code.match(/input\(.*\)/gi)) {
                this.TIME_LIMIT = Infinity;
            }
            const _this = this;
            Sk.configure({
                breakpoints: function (filename, currentLine, offset) {
                    const lineToDraw = currentLine - 1;
                    if (PythonDebugger.isDebugging) {
                        PythonDebugger.eraseBreakpoint();
                        PythonDebugger.colorLineEditor(lineToDraw);
                    }
                    PythonDebugger.lastLine = lineToDraw;
                    return true;
                },
                debugging: true,
                output: INTERFACE_NAME === 'TI-83' ? Simulator.monitor.output : _this._output,
                read: _this.builtinRead,
                execLimit: _this.TIME_LIMIT * 1000,
                yieldLimit: 500, // Pause the execution of Skulpt every 500 ms to allow other actions like Ctrl+C or interface click
                __future__: Sk.python3,
                retainglobals: true,
                // inputfun allow us to define our own input function (instead of having an alert prompt)
                inputfun: PythonInput.promiseFunction,
                inputfunTakesPrompt: true /* then you need to output the prompt yourself */
            });
            (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'canvas-turtle';
            Sk.canvas = 'canvas-matplotlib';
            _this._initializeTurtle(/.*turtle.*import.*/.test(code) || /.*import.*turtle.*/.test(code));

            Sk.misceval.callsimAsync({
                "*": _this.interruptHandler, // interruptHandler has been added to allow keyboardInterrupt -> see "interruptHandler" and "Sk.builtin.KeyboardInterrupt" upward in this file
                "Sk.debug": PythonDebugger.doStep
            }, function () {
                PythonDebugger.start();
                $("#stopRunButtonPython").show();
                return Sk.importMainWithBody("<stdin>", false, code, true);
            })
                .then(function (mod) {
                    PythonDebugger.reset();
                    _this._showMatplotLib(/.*matplotlib.*import.*/.test(code) || /.*import.*matplotlib.*/.test(code));
                    _this.canRun = [true, 'noError'];
                    _this.extract_mod = mod;
                    _this.isStopped = true;
                    vittapytherButton.hideRunningCodeTooltip();
                    resolve();
                }, async function (err) {
                    await _this._handleError(err);
                    _this.isStopped = true;
                    vittapytherButton.hideRunningCodeTooltip();
                    resolve();
                });
        });
    },

    /**
     * Throw the Keyboard Interruption when Sk.hardInterrupt is activated.
     * @public
     * @param {Suspension} susp
     */
    interruptHandler: function (susp) {
        if (Sk.hardInterrupt === true) {
            PythonDebugger.reset();
            throw new Sk.builtin.KeyboardInterrupt('Traceback (most recent call last):\n File \<main.py\>, line ' + susp.child.$lineno + '\nKeyboardInterrupt');
        } else {
            return null; // should perform default action
        }
    },

    /**
     * Adapt user code to skulpt friendly code.
     * @private
     * @param {string} code
     * @returns {string} code
     */
    _getAdaptedCode: function (code) {
        // replace all indent '    ' by '\t' 
        if (/\n(while|for|if) (.{2,100})( |):\n(    |\t)(.{2,100})/.test(code)) {
            code = code.replace(/    /g, '\t');
        }
        // replace function names with special characters by charCode
        const functions = code.match(/def [a-z0-9àäâéèêëïîöôùüûœ_]{1,30}\(/gi);
        if (functions) {
            for (let i = 0; i < functions.length; i++) {
                let newDef = functions[i].replace(/[àäâéèêëïîöôùüûœ]/gi, function (c) {
                    return functions[i].charCodeAt(functions[i].indexOf(c));
                })
                code = code.replace(functions[i], newDef)
                code = code.replace(RegExp(functions[i].replace('def ', '').replace('(', ''), 'g'), newDef.replace('def ', '').replace('(', ''));
            }
        }
        return code;
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
        if (PythonRun.externalLibraries[file] !== undefined) {
            // Use skulpt Provided promiseToSuspension, Wait for the asynchronous task to complete before continuing 
            return Sk.misceval.promiseToSuspension(
                fetch(PythonRun.externalLibraries[file]).then((resp) => resp.text())
            );
        }
        if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[file] === undefined) {
            throw "File not found: '" + file + "'";
        }
        // If the external module cannot be matched, find it from the built-in module 
        return Sk.builtinFiles.files[file];
    },

    /**
     * Write outputs of skulpt in monitor.
     * @private
     * @param {string} text
     * @param {string} color 
     * @param {boolean} error
     */
    _output(text, color, isError = false) {
        text = text.replace(/<([^>]+)>/g, '&lt;$1&gt;');
        if (isError) {
            text = "<b><pre style='color:" + color + ";margin-bottom:0rem;font-family: var(--monospace-font), monospace;font-size: 14px;font-weight: 400;'>" + text + "</pre></b>";
            PythonRun.monitor.insertAdjacentHTML('beforeend', text);
        } else {
            const event = new CustomEvent('python_evaluation_success', {
                detail: {
                    message: text
                }
            });
            window.dispatchEvent(event);
            
            const lastChild = PythonRun.monitor.lastChild;
            if (lastChild && lastChild.tagName == 'P' && text) {
                $(lastChild).html($(lastChild).html() + text);
            } else if (lastChild) {
                text = "<p style='color:" + (color ? color : 'var(--text-1)') + ";margin-bottom:0rem;'>" + text + "</p>";
                PythonRun.monitor.insertAdjacentHTML('beforeend', text);
            } else {
                PythonRun.monitor.insertAdjacentHTML('beforeend', text);
            }
        }
        setTimeout(function () {
            const cons = document.querySelector("#console-wrapper");
            cons.scrollTo(0, cons.scrollHeight);
        }, 50);
    },

    /**
     * Error handling at the end of Skulpt execution.
     * @private
     * @param {Object} err
     */
    _handleError: async function (err) {
        //console.error(err); //for debug
        let error = err.toString();
        PythonDebugger.reset();
        if (/ImportError/.test(error)) {
            PythonRun.canRun = [false, error];
        } else {
            if (/NameError: name '(_{1,10})'/.test(error)) {
                error = error.replace(/NameError: name '(_{1,10})' is not defined on line ([0-9]{1,3})/, jsonPath('code.placeholderError'))
                error += '<br>' + jsonPath('code.nameError')
            } else if (/SyntaxError: bad token T_OP/.test(error)) {
                error = error.replace(/SyntaxError: bad token T_OP on line ([0-9]{1,3})/, jsonPath('code.rewriteSpecialChar') + '$1')
                error += '<br>' + jsonPath('code.rewriteSpecialChar')
            }
            let color = 'red';
            if (/KeyboardInterrupt/.test(error)) {
                error = error.replace('KeyboardInterrupt: ', '').split(' at')[0];
                color = 'orange';
            }
            PythonRun._output(error, color, true);
        }
    },

    /**
     * Manage turtle panel if import turtle detected in code.
     * @private
     * @param {boolean} hasToInit
     */
    _initializeTurtle: function (hasToInit) {
        if (hasToInit) {
            // resize the canvas to fit to its generated content (svg)
            canvasTurtleElt = document.getElementById('canvas-turtle');
            canvasTurtleElt.style.display = 'block';
            canvasTurtleElt.style.zIndex = '11';
            canvasTurtleElt.style.backgroundColor = 'white';
            $('#canvas-matplotlib').css('zIndex', '0');

            // Show the console if it's hidden
            if ($('#monitor').hasClass('monitor-closed')) {
                InterfaceMonitor.toggle();
            }
            // resize the different workspaces in the IDE
            $(function () {
                return new Promise((resolve, reject) => {
                    $('.ide-editor').animate({
                        height: "100%"
                    }, "fast", "swing", function () {
                        resolve();
                    }, {
                        queue: false
                    });
                    $('#content_blocks').animate({
                        height: "100%"
                    }, "fast", "swing", {
                        queue: false
                    });
                    $('#generator').animate({
                        height: "100%"
                    }, "fast", "swing", {
                        queue: false
                    });
                    $('#monitor').animate({
                        height: "100%"
                    }, "fast", "swing", {
                        queue: false
                    });
                })
                    .then(function () {
                        Blockly.svgResize(Blockly.getMainWorkspace());
                    });
            });
        } else {
            $('#canvas-turtle').css({
                'zIndex': '0',
                'display': 'none'
            });
        }
    },

    /**
     * Show matplotlib panel if import matplotlib detected in code.
     * @private
     * @param {boolean} show
     */
    _showMatplotLib: function (show) {
        // modify the attribute writing-mode from vertical-rl to vertical
        let writingModeElt = document.getElementsByTagName('tspan');
        for (var i = 0; i < writingModeElt.length; i++) {
            if (writingModeElt[i].getAttribute('writing-mode') == 'vertical-rl') {
                writingModeElt[i].setAttribute('writing-mode', 'vertical');
            }
        }
        if (show) {
            $('#canvas-turtle').css('zIndex', '0');

            // Show the console if it's hidden
            if ($('#monitor').hasClass('monitor-closed')) {
                InterfaceMonitor.toggle();
            }
            // resize the different workspaces in the IDE
            $(function () {
                return new Promise((resolve, reject) => {
                    $('.ide-editor').animate({
                        height: "100%"
                    }, "fast", "swing", function () {
                        resolve();
                    }, {
                        queue: false
                    });
                    $('#content_blocks').animate({
                        height: "100%"
                    }, "fast", "swing", {
                        queue: false
                    });
                    $('#generator').animate({
                        height: "100%"
                    }, "fast", "swing", {
                        queue: false
                    });
                    $('#monitor').animate({
                        height: "100%"
                    }, "fast", "swing", {
                        queue: false
                    });
                    if (this.isTest) {
                        this.firstExecution = true;
                    }
                })
                    .then(function () {
                        Blockly.svgResize(Blockly.getMainWorkspace());
                    });
            });
        } else {
            $('#canvas-matplotlib').css({
                'zIndex': '0',
                'display': 'none'
            });
        }
    }
}

/**
 * Debugger tool.
 */
const PythonDebugger = {

    TIMEOUT_QUICK_UPDATE: 350,
    variable_panel: [],
    debugMarker: null,
    timeoutDebug: 1000,
    lastLine: 0,
    nextStep: false,
    isOpen: false,
    isPythonRunning: false,
    isDebugging: false,
    timeoutDebugStarted: false,
    timeoutInCodeExecution: 0,
    timeoutInCodeExecutionStarted: false,
    codeExecutionDelay: null,
    debugDelay: null,
    variablesUpdateInterval: null,

    /**
     * Toggle debugger window of monitor.
     */
    toggleDiv: function () {
        let storageConsole = {
            [Main.getInterface()]: 'bottom' /* Default value */
        };
        const consoleMode = localStorage.getItem('console');
        if (consoleMode && JSON.parse(consoleMode)) {
            storageConsole = JSON.parse(consoleMode);
        }
        const divID = '#monitor-view';
        if (storageConsole[Main.getInterface()] === 'right') {
            if (this.isOpen) {
                $(divID).removeClass('monitor-view-split-bottom-debug');
                $(divID).removeClass('monitor-view-split-right-debug');
                $("#monitor-debugger").hide();
                this.isOpen = false;
            } else {
                $(divID).removeClass('monitor-view-split-bottom-debug');
                $(divID).addClass('monitor-view-split-right-debug');
                $("#monitor-debugger").show();
                this.isOpen = true;
            }
        } else {
            if (this.isOpen) {
                $(divID).removeClass('monitor-view-split-bottom-debug');
                $(divID).removeClass('monitor-view-split-right-debug');
                $("#monitor-debugger").hide();
                this.isOpen = false;
            } else {
                $(divID).removeClass('monitor-view-split-right-debug');
                $(divID).addClass('monitor-view-split-bottom-debug');
                $("#monitor-debugger").show();
                this.isOpen = true;
            }
        }
        $(divID).removeAttr('style');
    },

    /**
     * Start debugging.
     */
    start: function () {
        this.reset();
        this.isPythonRunning = true;
        this.variablesUpdateInterval = setInterval(() => {
            this.updateVariablesPanel();
        }, this.TIMEOUT_QUICK_UPDATE);
    },

    /**
     * Reset debugging.
     */
    reset: function () {
        this.updateVariablesPanel();
        this.isPythonRunning = false;
        this.debugDelay = null;
        this.codeExecutionDelay = null;
        clearInterval(this.variablesUpdateInterval);
        this.variablesUpdateInterval = null;
        this.resetStep();
    },

    /**
     * Speed up or slow down execution based on button events.
     * @param {string} event
     */
    changeExecSpeed: function (event) {
        if (event == 'slow' && this.timeoutDebug < 500) {
            this.timeoutDebug += 250;
        } else if (event == 'slow' && this.timeoutDebug < 4000) {
            this.timeoutDebug += 500;
        } else if (event == 'fast' && this.timeoutDebug >= 1000) {
            this.timeoutDebug -= 500;
        } else if (event == 'fast' && this.timeoutDebug >= 500) {
            this.timeoutDebug -= 250;
        }
        $("#debugger-timeout").text(this.timeoutDebug / 1000 + ' s');
    },

    /**
     * Append tuple to table of variables panel.
     * @param {Object} variable 
     */
    addVarToPanel: function (variable) {
        let flagUnique = true;
        for (var index in this.variable_panel) {
            if (this.variable_panel[index].name == variable.name) {
                flagUnique = false;
                if (this.variable_panel[index].value != variable.value) {
                    this.variable_panel[index].value = variable.value;
                } else continue;
            }
        }
        if (flagUnique) {
            this.variable_panel.push(variable);
        }
    },

    /**
     * Empty variables panel.
     */
    emptyVariablesPanel: function () {
        this.variable_panel = [];
        this.refreshDisplayVars();
    },

    /**
     * Refresh entries in variables panel.
     */
    refreshDisplayVars: function () {
        const tableBody = document.getElementById("variables-table-body");
        tableBody.innerHTML = ''; // clear table before fill it

        if (this.variable_panel.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3">Aucune variable</td></tr>';
        } else {
            for (let v in this.variable_panel) {
                const variable = this.variable_panel[v];
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${variable.name}</td>
                    <td>${String(variable.value).slice(0, 17)}</td>
                    <td>${variable.type}</td>
                `;

                tableBody.appendChild(row);
            }
        }

        this.enableTableNavigation();
    },

    enableTableNavigation: function () {
        const cells = document.querySelectorAll("#variables-table-body td");

        if (cells.length === 0) return;

        cells[0].setAttribute("tabindex", "0");
        cells[0].focus();

        cells.forEach(cell => {
            cell.addEventListener("keydown", (event) => {
                let current = document.activeElement;
                if (!current || current.tagName !== "TD") return;

                let row = current.parentElement;
                let table = row.parentElement;
                let cellIndex = Array.from(row.children).indexOf(current);
                let rowIndex = Array.from(table.children).indexOf(row);

                switch (event.key) {
                    case "ArrowRight":
                        this.moveFocus(table, rowIndex, cellIndex + 1);
                        break;
                    case "ArrowLeft":
                        this.moveFocus(table, rowIndex, cellIndex - 1);
                        break;
                    case "ArrowDown":
                        this.moveFocus(table, rowIndex + 1, cellIndex, "down");
                        break;
                    case "ArrowUp":
                        this.moveFocus(table, rowIndex - 1, cellIndex, "up");
                        break;
                }
            });
        });
    },

    moveFocus: function(table, rowIndex, cellIndex, direction) {
      let rows = table.children;
      if (rowIndex < 0 || rowIndex >= rows.length) return;
  
      let cells = rows[rowIndex].children;
  
      if (direction === "down" || direction === "up")
          cellIndex = 0;
  
      if (cellIndex < 0 || cellIndex >= cells.length) return;
  
      let nextCell = cells[cellIndex];
      nextCell.setAttribute("tabindex", "0");
      nextCell.focus();
  },  

    /**
     * Parses variables from code and add them to variables panel.
     */
    updateVariablesPanel: function () {
        if (this.isPythonRunning && $('#monitor-show-vars').hasClass('activated')) {
            this.emptyVariablesPanel();
            for (let entryName in Sk.globals) {
                const entry = Sk.globals[entryName];
                const removing = (entryName !== "__name__" && entryName !== "__file__" && entryName !== "__doc__" && entryName !== "__package__");
                if (entry.v !== undefined && removing) {
                    const variable = {
                        "name": entryName,
                        "value": entry.v === null ? "None" : entry.v,
                        "type": Sk.abstr.typeName(entry)
                    };
                    this.addVarToPanel(variable);
                }
            }
            this.refreshDisplayVars();
        }
    },

    /**
     * Toggle variables panel of python debugger .
     */
    toggleVariablesPanel: function () {
        if (!this.isOpen) {
            this.toggleDiv();
        }
        if (!$("#monitor-show-vars").hasClass('activated')) {
            $("#monitor-show-vars").addClass('activated');
            $(".variable-btn-icon").css("filter", "invert(0%)");
            $("#variables-panel").css('display', 'block');
        } else {
            $("#monitor-show-vars").removeClass('activated');
            $("#variables-panel").css('display', 'none');
            $(".variable-btn-icon").css("filter", "invert(100%)");
            if (!$("#monitor-start-debugger").hasClass('activated')) {
                this.toggleDiv();
            }
        }
    },

    /**
     * Toggle debug mode.
     */
    toggleDebugMode: function () {
        if (!this.isOpen) {
            this.toggleDiv();
        }
        if (!$("#monitor-start-debugger").hasClass('activated')) {
            $("#monitor-start-debugger").addClass('activated');
            $(".bug-btn-icon").css("filter", "invert(0%)");
            $("#debugger-container").show();
            this.isDebugging = true;
            if (!this.isPythonRunning) {
                this.colorLineEditor(this.lastLine);
            }
        } else {
            $("#monitor-start-debugger").removeClass('activated');
            $(".bug-btn-icon").css("filter", "invert(100%)");
            $("#debugger-container").hide();
            this.eraseBreakpoint();
            Main.updateCodeEditor();
            this.isDebugging = false;
            if (!$("#monitor-show-vars").hasClass('activated')) {
                this.toggleDiv();
            }
        }
    },

    resetStep: function () {
        this.nextStep = false;
        clearTimeout(this.debugDelay);
        this.timeoutDebugStarted = false;
        clearTimeout(this.codeExecutionDelay);
        this.timeoutInCodeExecutionStarted = false;
    },

    /**
     * Do a debug step of Skulpt.
     * @param {Promise} susp 
     * @returns {Promise}
     */
    doStep: async function (susp) {
        try {
            var _this = PythonDebugger;
            if (Sk.execLimit == 0) {
                _this.resetStep();
                return await Promise.resolve("Python Run stopped.");
            } else if (
                (!_this.isDebugging && !_this.isPythonRunning) ||
                (_this.isDebugging && !_this.nextStep) ||
                (_this.timeoutInCodeExecution > 0 && _this.isPythonRunning)) {
                
                if (_this.isDebugging && _this.isPythonRunning && !_this.timeoutDebugStarted) {
                    _this.timeoutDebugStarted = true;
                    _this.debugDelay = setTimeout(() => {
                        _this.timeoutDebugStarted = false;
                        _this.nextStep = true;
                    }, _this.timeoutDebug);
                } else if (_this.timeoutInCodeExecution > 0 && !_this.timeoutInCodeExecutionStarted) {
                    _this.timeoutInCodeExecutionStarted = true;
                    _this.codeExecutionDelay = setTimeout(() => {
                        _this.timeoutInCodeExecutionStarted = false;
                        _this.timeoutInCodeExecution = 0;
                    }, _this.timeoutInCodeExecution);
                }
                return new Promise((resolve, reject) => {
                    setTimeout(function () {
                        return resolve(PythonDebugger.doStep(susp));
                    }, 100);
                });
            } else {
                _this.resetStep();
                return Promise.resolve(susp.resume());
            }
        } catch (e) {
            if(typeof IS_CAPYTALE_CONTEXT !== 'undefined') {
                InterfaceMonitor.writeConsole(e, 'warning');
            }
            console.error(e)

            if (e && typeof e.tp$str === "function") {
                const errorMessage = e.tp$str().v;
                const event = new CustomEvent('python_evaluation_error', {
                    detail: {
                        message: errorMessage
                    }
                });
                window.dispatchEvent(event);
                PythonREPL.terminal.innerHTML += `Erreur Python : ${errorMessage}\n`;
            } else {
                const event = new CustomEvent('python_evaluation_error', {
                    detail: {
                        message: errorMessage
                    }
                });
                window.dispatchEvent(event);
                PythonREPL.terminal.innerHTML += `Erreur JavaScript : ${e.message || e}\n`;
            }

            if (!Sk.hardInterrupt) {
                return Promise.reject(e);
            } else {
                return Promise.resolve();
            }
        }
    },

    /**
     * Color line by a yellow mark.
     * @param {int} line 
     */
    colorLineEditor: function (line) {
        const Range = ace.require('ace/range').Range;
        this.debugMarker = Main.getCodeEditor().container.session.addMarker(new Range(line, 0, line, 1), "ace-debug-marker", "fullLine");
    },

    /**
     * Clean code editor from breakpoint lines.
     */
    eraseBreakpoint: function () {
        Main.getCodeEditor().container.session.removeMarker(this.debugMarker);
    },

    stepForward: function () {
        this.nextStep = true;
    }
};