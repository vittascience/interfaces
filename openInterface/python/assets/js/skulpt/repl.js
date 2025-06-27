/**
 * PythonREPL is the global object containing constants, methods, elements and history relative to the REPL
 */

/* Object REPL with his properties */
const PythonREPL = {
    state: false,
    terminal: INTERFACE_NAME === 'TI-83' ? document.getElementById('ti_screen-value') : document.getElementById('console'),
    history: [],
    historyCursor: 'no-cursor',
    forbiddenChars: ['Shift', 'CapsLock', 'Tab', 'Control', 'Alt', 'AltGraph', 'ControlAltGraph', 'Meta', 'ContextMenu', 'Backspace', 'Enter', 'NumLock', 'Insert', 'Delete', 'Home', 'End', 'PageUp', 'PageDown', 'Pause', 'ScrollLock', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape'],
    focusState: false,
    depth: 0,
    finalCode: '',
    promptLine: {},
    key: {
        esc: false,
        altGr: false,
        capsLock: false,
    },
    isStopped: true,
    regex: {
        //finds lines starting with "print"
        PRINT: /\s*print/,
        //finds import statements
        IMPORT: /\s*import/,
        //finds return statements
        RETURN: /\s*return/,
        DEF_CLASS: /def .*|class .*/,
        COMMENT: /^#.*/,
        //a regex to check if a line is an assignment
        //this regex checks whether or not a line starts with
        //an identifier followed with some whitspace and then an = and then some more white space.
        //it also checks if the identifier is a tuple.
        ASSIGMENT: /^((\s*\(\s*(\s*((\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*)|(\s*\(\s*(\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*,)*\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*\)\s*))\s*,)*\s*((\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*)|(\s*\(\s*(\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*,)*\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*\)\s*))\s*\)\s*)|(\s*\s*(\s*((\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*)|(\s*\(\s*(\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*,)*\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*\)\s*))\s*,)*\s*((\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*)|(\s*\(\s*(\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*,)*\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*\)\s*))\s*\s*))([+-/*%&\^\|]?|[/<>*]{2})=/,
        EMPTY: /^\s*$/,
        valid: function (line) {
            return !this.ASSIGMENT.test(line) && !this.RETURN.test(line) && !this.DEF_CLASS.test(line) && !this.IMPORT.test(line) && !this.COMMENT.test(line);
        }
    },

    /**
     * Initialization of the repl on first program run
     */
    init: function () {
        if (INTERFACE_NAME === 'TI-83') {
            const oldRepl = document.querySelectorAll('.repl-wrapper');
            if (oldRepl.length > 0) {
                for (let i = 0; i < oldRepl.length; i++) {
                    oldRepl[i].remove();
                }
            }
        }
        if (!this.state) {
            // Setup of the DOM elements
            let promptLine = {
                wrapElt: document.createElement('span'),
                shiftRightElt: document.createElement('span'),
                inputWrapElt: document.createElement('span'),
                preSpanElt: document.createElement('span'),
                caretSpanElt: document.createElement('span'),
                postSpanElt: document.createElement('span')
            };

            /* Line with input field */
            promptLine.wrapElt.classList.add('repl-wrapper');

            /* Start of input line */
            promptLine.shiftRightElt = document.createElement('span');
            promptLine.shiftRightElt.innerHTML = '>>>&nbsp;';

            /* Caret management  */
            promptLine.caretSpanElt.innerHTML = '&nbsp;'
            promptLine.caretSpanElt.classList.add('caret-span');
            promptLine.caretSpanElt.classList.add('inactive');

            /* Add all elements defined before */
            promptLine.inputWrapElt.appendChild(promptLine.preSpanElt);
            promptLine.inputWrapElt.appendChild(promptLine.caretSpanElt);
            promptLine.inputWrapElt.appendChild(promptLine.postSpanElt);
            /* For mobile support */
            promptLine.preSpanElt.id = "repl-input";
            promptLine.preSpanElt.style.outline = "none";
            promptLine.preSpanElt.style.touchAction = "none";
            promptLine.preSpanElt.style.userSelect = "none";

            /* Assemble design elem with input */
            promptLine.wrapElt.appendChild(promptLine.shiftRightElt);
            promptLine.wrapElt.appendChild(promptLine.inputWrapElt);

            /* Add all of this to the 'console' div */
            this.terminal.appendChild(promptLine.wrapElt);

            /* Properties only usefull for mobile may create graphical inconvenient on desktop */
            if (navigator.userAgent.match(/Mobile/gi)) {
                promptLine.preSpanElt.contentEditable = true;
                promptLine.preSpanElt.style.caretColor = 'transparent';
                $('#ti_screen').on('click touch', function () {
                    const input = document.getElementById('repl-input');

                    input.focus();

                    const selection = window.getSelection();
                    const range = document.createRange();

                    range.selectNodeContents(input);
                    range.collapse(false);

                    selection.removeAllRanges();
                    selection.addRange(range);
                    PythonREPL.focusState = true;
                });
            }

            /* Set up of the listeners */
            document.addEventListener('click', PythonREPL.click);
            document.addEventListener('keydown', PythonREPL.keydown);
            document.addEventListener('keyup', PythonREPL.keyup);

            /* Assing local variables to object variable */
            Object.assign(this.promptLine, promptLine);
        }
        // We need to "focus" on python repl if there is no prompt
        const isInputInCode = CodeManager.getSharedInstance().getCode().match('input\\(');
        if (!isInputInCode) {
            document.querySelector('#console').click();
        }

        localStorage.isReplTooltipClosed = false;
    },

    /**
     * Function that toggle the caret active/inactive classes
     */
    toggleCaret: function () {
        if (!PythonInput.focusState && this.promptLine && this.promptLine.caretSpanElt) {
            if (this.promptLine.caretSpanElt.classList.contains('active')) {
                this.promptLine.caretSpanElt.classList.remove('active');
                this.promptLine.caretSpanElt.classList.add('inactive');
            } else if (this.promptLine.caretSpanElt.classList.contains('inactive')) {
                if (Blockly && Blockly.selected) {
                    Blockly.selected.unselect();
                }
                this.promptLine.caretSpanElt.classList.remove('inactive');
                this.promptLine.caretSpanElt.classList.add('active');
            }
        }
    },

    /**
     * Remove the promptLine element from the DOM, and disable the repl focus (object property and css class)
     */
    clear: function () {
        if (this.promptLine && this.promptLine.wrapElt) {
            if (this.terminal.contains(this.promptLine.wrapElt)) {
                this.promptLine.wrapElt.remove();
            }
            this.focusState = false;
            this.promptLine.caretSpanElt.classList.remove('active');
            this.promptLine.caretSpanElt.classList.add('inactive');
        }
    },

    /**
     * Function that execute toggleCaret if necessary
     * @param {DOM} e The DOM element (document) where the listener is called
     */
    click: function (e) {
        // If the user is asked for a prompt (python input function, we don't trigger anything
        if (typeof PythonInput !== 'undefined' && PythonInput.isInput) {
            return;
        }
        let currentTarget = e.target;
        let isInputSpanWrapper = false;
        if (!PythonInput.focusState) {
            while (currentTarget) {
                if (currentTarget.id == "console" || currentTarget.id == "ti_screen") {
                    isInputSpanWrapper = true;
                }
                currentTarget = currentTarget.parentNode;
            }
            // change the state if necessary
            if (isInputSpanWrapper) {
                if (!PythonREPL.focusState) {
                    PythonREPL.focusState = true;
                    PythonREPL.toggleCaret();
                }
            } else {
                if (PythonREPL.focusState) {
                    PythonREPL.focusState = false;
                    PythonREPL.toggleCaret();
                }
            }
        }
    },

    writeConsole: function (text) {
        PythonREPL.terminal.innerHTML += text + "\n";
        setTimeout(function () {
            const cons = document.querySelector("#console-wrapper");
            cons.scrollTo(0, cons.scrollHeight);
        }, 50);
    },

    keyup: function (e) {
        if (PythonREPL.focusState) {
            e.preventDefault();
            switch (e.key) {
                case 'Escape':
                    PythonREPL.key.esc = false;
                    break;
                case "AltGraph":
                    PythonREPL.key.altGr = false;
                    break;
                default:
                    break;
            }
        }

        if(PythonREPL.key === "CapsLock"){
            PythonREPL.key.capsLock = false
        }
    },

    /**
     * Execute command in REPL when enter is pressed.
     * @returns {void}
     */
    executeCommand: function () {
        const lineCode = PythonREPL.promptLine.preSpanElt.textContent + PythonREPL.promptLine.postSpanElt.textContent;
        if (PythonREPL.terminal.contains(PythonREPL.promptLine.wrapElt)) {
            PythonREPL.terminal.removeChild(PythonREPL.promptLine.wrapElt);
        }
        if (PythonREPL.terminal.contains(PythonInput.inputSpanWrapperElt) && PythonInput.focusState && PythonRun.isStopped) {
            PythonREPL.promptLine.preSpanElt.textContent = PythonREPL.promptLine.postSpanElt.textContent = '';
            return;
        }
        if (INTERFACE_NAME === 'TI-83') {
            Simulator.Mosaic.specific.ti.addLinesToScreen(PythonREPL.promptLine.shiftRightElt.textContent + lineCode);
        } else {
            PythonREPL.writeConsole(PythonREPL.promptLine.shiftRightElt.textContent + lineCode);
        }

        // save the line prompt in history if not empty
        if (lineCode != '') {
            PythonREPL.history.push(lineCode);
            PythonREPL.historyCursor = 'no-cursor';
        }
        // if line set up block (loops, condition etc)
        if (lineCode.substr(lineCode.length - 1) === ":") {
            PythonREPL.promptLine.shiftRightElt.textContent = '... ';
            PythonREPL.depth = 1;
            PythonREPL.finalCode += lineCode + '\n';
            // if line is a simple instruction
        } else {
            //if it's a statement that should be printed (not containing an = or def or class or an empty line)
            if (lineCode.length > 0 && PythonREPL.regex.valid(lineCode)) {
                //if it doesn't contain print make sure it doesn't print None
                if (!PythonREPL.regex.PRINT.test(lineCode)) {
                    //remove the statement
                    //evaluate it if nessecary
                    PythonREPL.finalCode = "print(" + lineCode + ")";
                } else {
                    PythonREPL.finalCode += lineCode + '\n';
                }
            } else {
                PythonREPL.finalCode += lineCode + '\n';
            }
        }

        // if line is empty and depth in scope of "block" -> quit the scope
        if (lineCode == '' && PythonREPL.depth != 0) {
            PythonREPL.depth = 0;
            PythonREPL.promptLine.shiftRightElt.textContent = '>>> ';
        }
        // if not in block scope, send the code
        if (PythonREPL.depth == 0) {
            PythonREPL.send(PythonREPL.finalCode);
            if (INTERFACE_NAME === 'TI-83') {
                PythonREPL.promptLine.preSpanElt.textContent = '';
                PythonREPL.promptLine.postSpanElt.textContent = '';
            }
            PythonREPL.finalCode = '';
        } else {
            // clear the prompt elements and append them again
            PythonREPL.appendReplInput();
        }
    },

    /**
     * The `keydown` method is used to filter the action to achieve depending on the pressed key
     * @param {DOM} e The key press event
     * @returns {void}
     */
    keydown: function (e) {
        if (PythonREPL.focusState) {
            e.preventDefault();
            if (typeof e.key !== 'undefined' && PythonREPL.forbiddenChars.indexOf(e.key) == -1 && e.key != 'Unidentified' && e.key != 'Dead') {
                if (!e.ctrlKey || PythonREPL.key.altGr) {
                    PythonREPL.promptLine.preSpanElt.textContent += e.key;

                    const label = PythonREPL.getReadableChar(e.key) ?? e.key;
                    updateAriaLiveRegion(label);
                }
            }

            switch (e.key) {
                case 'Escape':
                    PythonREPL.key.esc = true;
                    if(PythonREPL.key.capsLock){
                        PythonREPL.clearFocus();
                    }
                    break;
                case 'CapsLock':
                    PythonREPL.key.capsLock = true;
                    break;
                case 'Backspace':
                    PythonREPL.handleBackspace(PythonREPL.promptLine.preSpanElt, PythonREPL.promptLine.postSpanElt);
                    break;
                case 'ArrowLeft':
                    PythonREPL.moveCursorLeft();
                    break;
                case 'ArrowRight':
                    PythonREPL.moveCursorRight();
                    break;
                case 'ArrowUp':
                    PythonREPL.navigateHistory('up');
                    break;
                case 'ArrowDown':
                    PythonREPL.navigateHistory('down');
                    break;
                case 'Delete':
                    PythonREPL.handleDelete(PythonREPL.promptLine.preSpanElt, PythonREPL.promptLine.postSpanElt);
                    break;
                case 'Tab':
                    if (PythonREPL.key.esc) {
                        $("#monitor-start-debugger").focus();
                        PythonREPL.focusState = false;
                    } else {
                        PythonREPL.promptLine.preSpanElt.innerHTML += '\t';
                    }
                    break;
                case 'Enter':
                    if (INTERFACE_NAME === 'python') PythonREPL.hideReplTooltip();
                    PythonREPL.executeCommand();
                    break;
                case 'v':
                case 'V':
                    if (e.ctrlKey) {
                        navigator.clipboard.readText().then(function (text) {
                            PythonREPL.promptLine.preSpanElt.textContent += text;
                        });
                    }
                    break;
                case "AltGraph":
                    PythonREPL.key.altGr = true;
                    break;
                default:
                    if (INTERFACE_NAME === 'python') PythonREPL.setReplTooltip();
                    break;
            }
        }
    },

    /**
     * The `navigateHistory` method is used to navigate trought the input history with the up and down arrow keys
     * @param {string} direction the pressed key -> 2 values : 'up' or 'down'
     * @returns {boolean} returns true if the action "worked" or false if nothing happened
     */
    navigateHistory: function (direction) {
        if (this.history.length < 1) {
            if (direction === 'down') {
                updateAriaLiveRegion(i18next.t("repl.commands.history.noNextCommand"));
            }else{
                updateAriaLiveRegion(i18next.t("repl.commands.history.noPreviousCommand"));
            }
            return false;
        }
        if (direction == 'up') {
            if (this.historyCursor == 'no-cursor') {
                this.historyCursor = this.history.length - 1;
            } else if (this.historyCursor - 1 >= 0) {
                this.historyCursor--;
            }
        } else if (direction == 'down' && this.historyCursor != 'no-cursor') {
            if (this.historyCursor + 1 < this.history.length) {
                this.historyCursor++;
            } else {
                updateAriaLiveRegion(i18next.t("repl.commands.history.noNextCommand"));
                this.historyCursor = 'no-cursor';
                this.promptLine.preSpanElt.textContent = "";
                return true;
            }
        }
        if (this.historyCursor != 'no-cursor') {
            const cmd = this.history[this.historyCursor];
            this.promptLine.preSpanElt.textContent = cmd;
            updateAriaLiveRegion(i18next.t("repl.commands.history.commandFound")+cmd);
            return true;
        }
    },

    moveCursorLeft: function() {
        const pre = PythonREPL.promptLine.preSpanElt.textContent;
        const lastChar = pre.slice(-1);
        if (!lastChar) return;

        PythonREPL.promptLine.preSpanElt.textContent = pre.slice(0, -1);
        PythonREPL.promptLine.postSpanElt.textContent = lastChar + PythonREPL.promptLine.postSpanElt.textContent;

        const label = i18next.exists("chars." + lastChar) ? i18next.t("chars." + lastChar) : lastChar;
        updateAriaLiveRegion(label);
    },

    moveCursorRight: function() {
        const post = PythonREPL.promptLine.postSpanElt.textContent;
        const nextChar = post.slice(0, 1);
        if (!nextChar) return;

        PythonREPL.promptLine.preSpanElt.textContent += nextChar;
        PythonREPL.promptLine.postSpanElt.textContent = post.slice(1);

        const label = i18next.exists("chars." + nextChar) ? i18next.t("chars." + nextChar) : nextChar;
        updateAriaLiveRegion(label);
    },

    appendReplInput: function () {
        PythonREPL.promptLine.preSpanElt.textContent = '';
        PythonREPL.promptLine.postSpanElt.textContent = '';
        PythonREPL.terminal.appendChild(PythonREPL.promptLine.wrapElt);
    },

    clearPrompt: function () {
        // clear the prompt elements and append them again
        if (PythonREPL.promptLine && PythonREPL.promptLine.wrapElt && PythonREPL.terminal.contains(PythonREPL.promptLine.wrapElt)) {
            PythonREPL.terminal.removeChild(PythonREPL.promptLine.wrapElt);
        }
        PythonREPL.appendReplInput();
    },

    clearFocus: function () {
        PythonREPL.focusState = false;
        PythonREPL.toggleCaret();

        const consoleElement = document.querySelector('#console');
        if(consoleElement)
            consoleElement.focus();
    },

    _initializeTurtleAndMatplotlib: function (code) {
        if (code.includes('import turtle') || code.includes('import matplotlib')) {
            // resize the canvas to fit to its generated content (svg)
            if (code.includes('import turtle')) {
                canvasTurtleElt = document.getElementById('canvas-turtle');
                canvasTurtleElt.style.display = 'block';
            }

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
        }
    },

    /**
     * The `send` method is used to send commands to Skulpt as REPL
     * @param {string} code The code (command line) to send to skulpt as REPL to be executed
     * @returns {boolean} returns true on success or false on error
     */
    send: function (code) {
        try {
            if (!code || PythonREPL.regex.EMPTY.test(code)) {
                PythonREPL.appendReplInput();
                return;
            } else {
                PythonREPL.isStopped = false;
                PythonREPL._initializeTurtleAndMatplotlib(code);
                Sk.misceval.asyncToPromise(function () {
                    PythonDebugger.start();
                    return Sk.importMainWithBody("repl", false, code, true);
                }, {
                    "*": PythonRun.interruptHandler
                })
                    .then(function (mod) {
                        PythonDebugger.reset();
                        PythonREPL.clearPrompt();
                        PythonREPL.isStopped = true;
                    })
                    .catch(function (err) {
                        console.error(err)
                        PythonREPL._handleError(err);
                        PythonREPL.appendReplInput();
                        PythonREPL.isStopped = true;
                    });

            }
        } catch (err) {
            console.error(err)
            return false;
        }
    },

    /**
     * Handle deletion of the character under the cursor and announce changes for screen readers.
     * @param {HTMLElement} preSpanElt - The element containing characters before the cursor.
     * @param {HTMLElement} postSpanElt - The element containing characters after the cursor.
     */
    handleDelete: function(preSpanElt, postSpanElt) {
        const post = postSpanElt.textContent;
        if (post.length === 0) return;

        const deletedChar = post.charAt(0);
        postSpanElt.textContent = post.slice(1);

        const deletedCharFeedback = i18next.t("code.repl.screenReaderHelpers.deletedChar")+PythonREPL.getReadableChar(deletedChar);
        const nextChar = postSpanElt.textContent.charAt(0);
        if (nextChar) {
            const nextCharFeedback = i18next.t("code.repl.screenReaderHelpers.charUnderCursor")+PythonREPL.getReadableChar(nextChar);
            updateAriaLiveRegion(`${deletedCharFeedback}. ${nextCharFeedback}`);
            // console.log(`${deletedCharFeedback}. ${nextCharFeedback}`)
        }else {
            updateAriaLiveRegion(deletedCharFeedback);
            // console.log(deletedCharFeedback)
        }
    },

    /**
     * Cleans a line from the calculator screen before announcing it in the screen reader history.
     * Removes the leading prompt (">>>") so it doesn’t get repeated unnecessarily when read aloud.
     *
     * @param {string} text - The raw line from the calculator screen (may include ">>>").
     * @returns {string} - Cleaned line without the prompt, ready for screen reader output.
     */
    cleanScreenLineForHistory: function(text) {
        // Decode HTML entities like &gt;
        const textArea = document.createElement("textarea");
        textArea.innerHTML = text;
        const decoded = textArea.value;

        // Remove the ">>> " prefix
        return decoded.replace(/^>>>[\s\u00A0]?/, '').trim();
    },

    updateScreenReaderHistory: function(text) {
        const historyContainer = document.getElementById("sr-ti-history");
        if (!historyContainer) return;

        const cleanText = this.cleanScreenLineForHistory(text.replace(/<[^>]*>?/gm, ''));
        if (!cleanText) return;

        const line = document.createElement("div");
        line.textContent = cleanText;
        historyContainer.appendChild(line);
    },

    /**
     * Handle backspace deletion and announce the removed character + new one before cursor.
     * @param {HTMLElement} preSpanElt - The element containing characters before the cursor.
     * @param {HTMLElement} postSpanElt - The element containing characters after the cursor.
     */
    handleBackspace: function(preSpanElt, postSpanElt) {
        const pre = preSpanElt.textContent;
        if (pre.length === 0) return;

        const deletedChar = pre.charAt(pre.length - 1);
        preSpanElt.textContent = pre.slice(0, -1);

        const deletedCharFeedback = i18next.t("code.repl.screenReaderHelpers.deletedChar") + PythonREPL.getReadableChar(deletedChar);
        const nextChar = preSpanElt.textContent.slice(-1);

        if (nextChar) {
            const nextCharFeedback = i18next.t("code.repl.screenReaderHelpers.charUnderCursor") + PythonREPL.getReadableChar(nextChar);
            updateAriaLiveRegion(`${deletedCharFeedback}. ${nextCharFeedback}`);
            // console.log(`${deletedCharFeedback}. ${nextCharFeedback}`);
        } else {
            updateAriaLiveRegion(deletedCharFeedback);
            // console.log(deletedCharFeedback);
        }
    },

    _handleError: function (err) {
        if (PythonREPL && PythonREPL.promptLine && PythonREPL.promptLine.wrapElt && PythonREPL.terminal.contains(PythonREPL.promptLine.wrapElt)) {
            PythonREPL.terminal.removeChild(PythonREPL.promptLine.wrapElt.textContent);
        }
        if (INTERFACE_NAME === 'TI-83' && !String(err).match('TimeLimitError: Program exceeded run time limit')) {
            Simulator.Mosaic.specific.ti.addLinesToScreen(err + '\n');
        } else {
            const error = "<b><pre style='color:red;margin-bottom:0rem;'>" + String(err) + "</pre></b>";
            PythonREPL.writeConsole(error);
        }
    },

    setReplTooltip: function () {
        if (localStorage.isReplTooltipClosed === 'false') {
            if (this._replTooltip) {
                this._replTooltip.style.display = 'block';
                return;
            }
            const monitor = document.querySelector('#monitor');
            const tooltipElt = document.createElement('div');
            tooltipElt.classList.add('repl-tooltip');
            let replTooltipTriangleClass = '';
            if (getParamValue('mode') === MODE_CONSOLE_ONLY) {
                tooltipElt.classList.add('repl-tooltip-consoleOnly');
                replTooltipTriangleClass = 'repl-tooltip-triangle-consoleOnly';
            }
            tooltipElt.innerHTML = `
            <div class="tooltip-inner-wrapper tooltip-inner-wrapper-repl">
                <div class="repl-tooltip-triangle ${replTooltipTriangleClass}"></div>
                <i class="fa-solid fa-circle-info"></i>
                <span>${jsonPath('code.topbar.tooltips.repl')}</span>
                <button id="closeReplTooltip" class="btn v-btn-grey">
                    <i class="fa-sharp fa-solid fa-xmark"></i></button>
            </div>`;
            monitor.appendChild(tooltipElt);
            this._replTooltip = tooltipElt;
            $("body").on('click', '#closeReplTooltip', () => {
                PythonREPL.hideReplTooltip();
            });
        }
    },

    hideReplTooltip: function () {
        if (typeof this._replTooltip === 'undefined') {
            return;
        }
        this._replTooltip.style.display = 'none';
        localStorage.isReplTooltipClosed = true;
    },

    /**
     * Symbols such as "+" "*" "/" are not pronounced by screen readers,
     * so we transpose these letters into their readable form (char).
     * @param {string} char The symbol: +, *, /, ^
     */
    getReadableChar: function(char) {
        if (!char || typeof char !== 'string') return '';
        const trimmed = char.trim();
        return i18next.exists("chars." + trimmed) ? i18next.t("chars." + trimmed) : trimmed;
    }
};