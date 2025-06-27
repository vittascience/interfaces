/**
 * Object that contain all the DOM elements associated to the input
 */
const PythonInput = {
    forbiddenChars: ['Shift', 'CapsLock', 'Tab', 'Control', 'Alt', 'ControlAltGraph', 'Meta', 'ContextMenu', 'Backspace', 'Enter', 'NumLock', 'Insert', 'Delete', 'Home', 'End', 'PageUp', 'PageDown', 'Pause', 'ScrollLock', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
    focusState: false,
    eventListener: false,
    isInput: false,

    /**
     * Function that toggle the caret active/inactive classes
     */
    toggleCaret: function () {
        const caretId = "#" + PythonRun.monitor.id + " #caretSpanId";
        if ($(caretId)[0]) {
            if ($(caretId).hasClass('active')) {
                $(caretId).removeClass('active');
                $(caretId).addClass('inactive');
            } else {
                $(caretId).removeClass('inactive');
                $(caretId).addClass('active');
            }
        }
    },

    /**
     * Do action switching key.
     * @param {string} key 
     * @returns {boolean}
     */
    keyPressAction: function (key) {
        if (PythonInput.forbiddenChars.indexOf(key) == -1 && key != 'Unidentified') {
            if (key == 'Dead') {
                PythonInput.preSpanElt.textContent += "^";
            } else {
                PythonInput.preSpanElt.textContent += key;
            }
        }
        switch (key) {
            case 'Backspace':
                PythonInput.preSpanElt.textContent = PythonInput.preSpanElt.textContent.substr(0, PythonInput.preSpanElt.textContent.length - 1);
                break;
            case 'ArrowLeft':
                PythonInput.postSpanElt.textContent = PythonInput.preSpanElt.textContent.substr(PythonInput.preSpanElt.textContent.length - 1, PythonInput.preSpanElt.textContent.length) + PythonInput.postSpanElt.textContent;
                PythonInput.preSpanElt.textContent = PythonInput.preSpanElt.textContent.substr(0, PythonInput.preSpanElt.textContent.length - 1);
                break;
            case 'ArrowRight':
                PythonInput.preSpanElt.textContent = PythonInput.preSpanElt.textContent + PythonInput.postSpanElt.textContent.substr(0, 1);
                PythonInput.postSpanElt.textContent = PythonInput.postSpanElt.textContent.substr(1, PythonInput.postSpanElt.textContent.length);
                break;
            case 'Delete':
                PythonInput.postSpanElt.textContent = PythonInput.postSpanElt.textContent.substr(1, PythonInput.postSpanElt.textContent.length);
                break;
            case 'Enter':
                return true;
            default:
                return false;
        }
    },

    /**
     * Do action switching key.
     * @param {Dom} target 
     * @returns {boolean}
     */
    clickAction: function (target) {
        // verify if the target is the input-span-wrapper
        let currentTarget = target;
        let clickFromMonitor = false;
        let clickFromStop = false;
        while (currentTarget && currentTarget instanceof HTMLElement && currentTarget !== currentTarget.parentNode) {
            if (currentTarget.id == 'console') {
                clickFromMonitor = true;
                break;
            } else if (currentTarget.id == 'stopRunButtonPython') {
                clickFromStop = true;
                break;
            }
            currentTarget = currentTarget.parentNode;
        }
        // change the state if necessary
        if (clickFromMonitor) {
            if (!PythonInput.focusState) {
                PythonInput.focusState = true;
                PythonInput.toggleCaret();
            }
        } else {
            if (PythonInput.focusState) {
                PythonInput.focusState = false;
                PythonInput.toggleCaret();
            }
            if (clickFromStop) {
                return true;
            }
        }
    },

    /**
     * Initialize input element on Python REPL and add user prompt text.
     * @param {string} prompt 
     */
    initialize: function (prompt) {
        // Creation and setup of the span containing the prompt message
        PythonInput.promptElt = document.createElement('span');
        PythonInput.promptElt.textContent = prompt + ' ';
        // Creation and setup of span containing all the text input
        PythonInput.inputSpanWrapperElt = document.createElement('span');
        PythonInput.inputSpanWrapperElt.classList.add('input-span-wrapper');
        // Creation and setup of span containing the text input before caret
        PythonInput.preSpanElt = document.createElement('span');
        PythonInput.preSpanElt.classList.add('pre-span');
        // Creation and setup of span containing the caret
        PythonInput.caretSpanElt = document.createElement('span');
        PythonInput.caretSpanElt.id = 'caretSpanId';
        PythonInput.caretSpanElt.classList.add('caret-span');
        PythonInput.caretSpanElt.classList.add('active');
        PythonInput.caretSpanElt.innerHTML = '&nbsp;';
        // Creation and setup of span containing the caret and the text after it
        PythonInput.postSpanElt = document.createElement('span');
        PythonInput.postSpanElt.classList.add('post-span');

        // Append all the elements in the DOM
        PythonInput.inputSpanWrapperElt.appendChild(PythonInput.promptElt);
        PythonInput.inputSpanWrapperElt.appendChild(PythonInput.preSpanElt);
        PythonInput.inputSpanWrapperElt.appendChild(PythonInput.caretSpanElt);
        PythonInput.inputSpanWrapperElt.appendChild(PythonInput.postSpanElt);
        PythonREPL.terminal.appendChild(PythonInput.inputSpanWrapperElt);
    },

    /**
     * Function that replace the Skulpt's default input function
     * @param {string} prompt 
     */
    promiseFunction: function (prompt) {
        return new Promise((resolve, reject) => {
            PythonInput.isInput = true;
            let blockUIElts = document.getElementsByClassName('blockUI');
            for (let i = 0; i < blockUIElts.length; i++) {
                blockUIElts[i].style.display = 'none';
            }

            PythonInput.initialize(prompt);

            /* Properties only usefull for mobile may create graphical inconvenient on desktop */
            if ($.browser.mobile) {
                PythonInput.preSpanElt.contentEditable = true;
                $('#console').on('click touch', function () {
                    $(PythonInput.preSpanElt).focus();
                    PythonInput.focusState = true;
                });
            }

            PythonInput.focusState = true;

            /**
             * @param {DOM} e DOM element where the click happened
             */
            const clickEvent = function (e) {
                const isStopButton = PythonInput.clickAction(e.target);
                if (isStopButton) {
                    _finish();
                    reject();
                }
            };

            /**
             * @param {Event} e event when key is pressed
             */
            const keypressEvent = function (e) {
                const isEnterKey = PythonInput.keyPressAction(e.key);
                if (PythonInput.focusState && isEnterKey) {
                    const final = _finish();
                    resolve(final);
                }
            };

            const _finish = function () {
                document.removeEventListener('click', clickEvent);
                document.removeEventListener('keydown', keypressEvent);
                PythonInput.eventListener = false;
                PythonInput.inputSpanWrapperElt.removeChild(PythonInput.caretSpanElt);
                const final = PythonInput.preSpanElt.textContent + PythonInput.postSpanElt.textContent;
                PythonInput.preSpanElt.textContent += '\n';
                PythonInput.focusState = false;
                PythonInput.isInput = false;
                return final;
            };

            // Setup of the listeners
            if (!PythonInput.eventListener) {
                document.addEventListener('click', clickEvent);
                document.addEventListener('keydown', keypressEvent);
                PythonInput.eventListener = true;
            }

            // This instruction has been set to unfocus from the "Run" button (which was fired on Enter press)
            document.activeElement.blur();
        });
    }
};
