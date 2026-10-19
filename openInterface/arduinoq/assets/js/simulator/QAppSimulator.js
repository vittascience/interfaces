/**
 * @fileoverview Arduino UNO Q app simulation: the Python part of the app (main.py) runs with Skulpt next to the
 * sketch (JSCPP), the Bridge links both, and the web page (index.html) is displayed with a simulated WebUI socket.
 * Skulpt is only loaded when main.py has code to run.
 */
const QAppSimulator = {
    SKULPT_PATH: '/openInterface/interfaces/assets/js/external/skulpt/',
    // Time given to the other side to provide a Bridge function (the sketch and the Python start together)
    PROVIDE_TIMEOUT: 3000,
    running: false,
    cppProvided: {},
    pyProvided: {},
    uiHandlers: {},
    // Console source ('Python' or 'Arduino') of the current unfinished line, null at the start of a line
    _lineSource: null,

    /**
     * Python modules of the App Lab, simulated on top of the "_qsim" module (QAppSimulator.pyModule)
     */
    PY_FILES: {
        'src/lib/_qsim.js': 'var $builtinmodule = function () { return QAppSimulator.pyModule(); };',
        'src/lib/arduino/__init__.py': '',
        'src/lib/arduino/app_bricks/__init__.py': '',
        'src/lib/arduino/app_utils.py':
`import _qsim
import time

class _Bridge:
    def provide(self, name, func):
        _qsim.provide(name, func)

    def call(self, name, *args, **kwargs):
        return _qsim.bridge_call(name, list(args))

    def notify(self, name, *args):
        _qsim.bridge_call(name, list(args))

Bridge = _Bridge()

class _App:
    def run(self, user_loop=None):
        while True:
            if user_loop is None:
                time.sleep(0.1)
            else:
                user_loop()

App = _App()
`,
        'src/lib/arduino/app_bricks/web_ui.py':
`import _qsim

class WebUI:
    def __init__(self, *args, **kwargs):
        pass

    def on_message(self, message_id, func):
        _qsim.ui_on(message_id, func)

    def send_message(self, message_id, message, room=None):
        _qsim.ui_send(message_id, message)
`
    },

    /**
     * Start the app simulation (called with the sketch simulation)
     */
    async start() {
        this.running = true;
        this.cppProvided = {};
        this.pyProvided = {};
        this.uiHandlers = {};
        this._lineSource = null;
        [1, 2, 3, 4].forEach(led => {
            this._rgbLeds[led] = [false, false, false];
            this._showRgbLed(led);
        });
        const files = CodeManager.getSharedInstance();
        this._showWebPage(files.getFile('index.html'));
        const pythonCode = files.getFile('main.py');
        // Nothing to run but the license comment
        if (!pythonCode.split('\n').some(line => line.trim() && !line.trim().startsWith('#'))) return;
        try {
            await this._loadSkulpt();
        } catch (e) {
            return this._showError('Skulpt: ' + e.message);
        }
        if (!this.running) return;
        this.runPython(() => Sk.importMainWithBody('<stdin>', false, pythonCode, true))
            .catch(error => this._showError(error));
    },

    stop() {
        this.running = false;
    },

    _loadSkulpt() {
        if (typeof Sk !== 'undefined' && Sk.builtinFiles) return Promise.resolve();
        const load = (src) => new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = this.SKULPT_PATH + src;
            script.onload = resolve;
            script.onerror = () => reject(new Error('loading ' + src));
            document.head.appendChild(script);
        });
        return load('skulpt.js').then(() => load('skulpt-stdlib.js'));
    },

    /**
     * Run Python code (main program, Bridge call or WebUI message handler) until its end
     * @param {Function} suspendable - Skulpt call that may suspend
     * @returns {Promise}
     */
    runPython(suspendable) {
        Sk.configure({
            output: text => this.print('Python', text),
            read: file => {
                const content = this.PY_FILES[file] ?? Sk.builtinFiles?.files[file];
                if (content === undefined) throw new Sk.builtin.ImportError("No module named " + file);
                return content;
            },
            __future__: Sk.python3,
            execLimit: Infinity,
            // Infinite loops ("while True", App.run) give back the hand to the page regularly
            yieldLimit: 20
        });
        this._simulateLinuxLeds();
        return Sk.misceval.asyncToPromise(suspendable, {
            '*': (suspension) => {
                if (!this.running) throw new Error('stopped');
                // Simulator paused: wait, then handle the same suspension again
                if (!Simulator.isRunning) {
                    return waitFor(() => Simulator.isRunning || !this.running).then(() => suspension);
                }
            }
        });
    },

    /**
     * "_qsim" Python module: link between the simulated App Lab modules and the simulator
     */
    pyModule() {
        const func = f => new Sk.builtin.func(f);
        const none = Sk.builtin.none.none$;
        return {
            __name__: new Sk.builtin.str('_qsim'),
            provide: func((name, pyFunc) => {
                this.pyProvided[Sk.ffi.remapToJs(name)] = pyFunc;
                return none;
            }),
            bridge_call: func((name, args) => Sk.misceval.promiseToSuspension(
                this.callCpp(Sk.ffi.remapToJs(name), Sk.ffi.remapToJs(args)).then(result => this._toPy(result))
            )),
            ui_on: func((id, pyFunc) => {
                this.uiHandlers[Sk.ffi.remapToJs(id)] = pyFunc;
                return none;
            }),
            ui_send: func((id, message) => {
                const page = document.querySelector('#hcjPreview');
                if (page && page.contentWindow) {
                    page.contentWindow.postMessage({ qWebUI: 'toPage', id: Sk.ffi.remapToJs(id), message: Sk.ffi.remapToJs(message) }, '*');
                }
                return none;
            })
        };
    },

    _toPy(value) {
        return value === null || value === undefined ? Sk.builtin.none.none$ : Sk.ffi.remapToPy(value);
    },

    /**
     * Wait for a function provided with Bridge.provide() by the sketch or the Python
     * @returns {Promise<*>} the provided function, undefined after PROVIDE_TIMEOUT
     */
    async _waitProvided(provided, name) {
        const startTime = Date.now();
        while (!(name in provided) && this.running && Date.now() - startTime < this.PROVIDE_TIMEOUT) {
            await Simulator.sleep_ms(50);
        }
        return provided[name];
    },

    /* --- Sketch side (Arduino_RouterBridge.h in Libraries_H.js) --- */

    provideCpp(name, rt, funcName) {
        this.cppProvided[name] = { rt, funcName };
    },

    /**
     * Bridge.call() from the Python: run the function provided by the sketch
     * @param {string} name
     * @param {Array} args - JS values
     * @returns {Promise<*>} JS value returned by the sketch function
     */
    async callCpp(name, args) {
        const provided = await this._waitProvided(this.cppProvided, name);
        if (!provided) throw new Sk.builtin.RuntimeError(`Bridge: le sketch ne fournit pas de fonction "${name}" (Bridge.provide)`);
        const rt = provided.rt;
        const cppArgs = args.map(arg => this._toCpp(rt, arg));
        const call = rt.getFunc('global', provided.funcName, cppArgs.map(arg => arg.t))(rt, null, ...cppArgs);
        let step;
        while (!(step = call.next()).done) {
            if (step.value && step.value.type === rt.SUSPEND_TOKEN) await step.value.promise;
        }
        return this._fromCpp(rt, step.value);
    },

    /**
     * Bridge.call() from the sketch: run the function provided by the Python
     * @param {Array} args - JSCPP values
     * @returns {Promise<*>} JS value returned by the Python function
     */
    async callPython(rt, name, args) {
        const jsName = Simulator.getStringFromInterpretor(name);
        const pyFunc = await this._waitProvided(this.pyProvided, jsName);
        if (!pyFunc) {
            this.print('Python', `Bridge: la partie Python ne fournit pas de fonction "${jsName}" (Bridge.provide)\n`);
            return null;
        }
        const pyArgs = args.map(arg => this._toPy(this._fromCpp(rt, arg)));
        try {
            return Sk.ffi.remapToJs(await this.runPython(() => Sk.misceval.callsimOrSuspendArray(pyFunc, pyArgs)));
        } catch (error) {
            this._showError(error);
            return null;
        }
    },

    _toCpp(rt, value) {
        if (typeof value === 'boolean') return rt.val(rt.boolTypeLiteral, value);
        if (typeof value === 'number') return rt.val(Number.isInteger(value) ? rt.intTypeLiteral : rt.doubleTypeLiteral, value);
        return rt.String_makeValueFromJSString(value === null || value === undefined ? '' : String(value));
    },

    _fromCpp(rt, value) {
        if (!value || !value.t) return null;
        if (rt.isStringClass(value)) return rt.String_getJSString(value);
        if (rt.isStringType(value)) return rt.charArray_getJSString(value);
        if (value.t.name === 'bool') return Boolean(value.v);
        return typeof value.v === 'number' ? value.v : null;
    },

    /* --- Web page (index.html) --- */

    /**
     * Display the app web page in the simulator, the socket.io connection to the WebUI brick is replaced by messages
     * @param {string} html
     */
    _showWebPage(html) {
        const hasPage = /<html/i.test(html);
        if (document.querySelector('#web-page-module') === null) {
            if (!hasPage) return;
            WifiSimulator.addWifiSimulatorToDom();
            document.querySelector('#url-network-info').style.display = 'none';
            document.querySelector('#server-url-field').readOnly = true;
            document.querySelector('#resfresh-preview-btn').addEventListener('click', () => this._showWebPage(CodeManager.getSharedInstance().getFile('index.html')));
            window.addEventListener('message', event => {
                const page = document.querySelector('#hcjPreview');
                const data = event.data;
                if (!page || event.source !== page.contentWindow || !data || data.qWebUI !== 'toApp') return;
                const handler = this.uiHandlers[data.id];
                if (!handler || !this.running) return;
                this.runPython(() => Sk.misceval.callsimOrSuspendArray(handler, [new Sk.builtin.str('simulator'), this._toPy(data.message)]))
                    .catch(error => this._showError(error));
            });
        }
        const moduleElt = document.querySelector('#web-page-module');
        moduleElt.style.display = hasPage ? '' : 'none';
        if (!hasPage) return;
        document.querySelector('#server-url-field').value = 'http://<ip-arduino-q>:7000';
        const shim = `<script>(function ${this._socketShim.toString()})();</script>`;
        html = html.replace(/<script src="libs\/socket\.io\.min\.js"><\/script>\s*/, '');
        document.querySelector('#hcjPreview').srcdoc = /<head>/i.test(html) ? html.replace(/<head>/i, '<head>\n' + shim) : shim + html;
        moduleElt.style.height = (moduleElt.offsetWidth * 9 / 16) + 'px';
    },

    /**
     * Runs in the page: io() of socket.io sending/receiving the WebUI messages to/from the simulator
     */
    _socketShim() {
        const handlers = {};
        window.addEventListener('message', event => {
            const data = event.data;
            if (data && data.qWebUI === 'toPage') (handlers[data.id] || []).forEach(handler => handler(data.message));
        });
        window.io = () => ({
            on: (id, handler) => (handlers[id] = handlers[id] || []).push(handler),
            emit: (id, message) => parent.postMessage({ qWebUI: 'toApp', id: id, message: message }, '*')
        });
    },

    /* --- RGB LEDs 3 and 4 of the board (sketch) --- */

    // Simulator pin numbers of the LED channels (LED_BUILTIN = LED3_R)
    RGB_LED_PINS: { LED3_R: 200, LED3_G: 201, LED3_B: 202, LED4_R: 203, LED4_G: 204, LED4_B: 205 },
    _rgbLeds: { 1: [false, false, false], 2: [false, false, false], 3: [false, false, false], 4: [false, false, false] },

    /**
     * digitalWrite() on an RGB LED channel: the LEDs are active low (LOW turns them on)
     * @returns {boolean} false if the pin is not an RGB LED one
     */
    writeRgbLed(pin, state) {
        const index = pin - this.RGB_LED_PINS.LED3_R;
        if (index < 0 || index > 5) return false;
        const led = index < 3 ? 3 : 4;
        this._rgbLeds[led][index % 3] = !state;
        this._showRgbLed(led);
        // Simulator module of the "built-in LED" block (digitalWrite(LED_BUILTIN, ...))
        const builtinLedModule = pin === this.RGB_LED_PINS.LED3_R && Simulator.getModuleByKey('arduino-led13');
        if (builtinLedModule) Simulator.setAnimator(builtinLedModule, 'arduino-led13', state ? 0 : 1);
        return true;
    },

    /**
     * Python: the RGB LEDs 1 and 2 are Linux LEDs, written in /sys/class/leds/<colour>:<function>/brightness
     * (LED 1: red:user, green:user, blue:user, LED 2: red:panic, green:wlan, blue:bt).
     * open() of these files gives a simulated file which lights the LED of the board picture.
     */
    _simulateLinuxLeds() {
        if (!this._fileOpen) this._fileOpen = Sk.builtins.open;
        const fileOpen = this._fileOpen;
        const none = Sk.builtin.none.none$;
        const LedFile = Sk.misceval.buildClass({}, ($gbl, $loc) => {
            $loc.__init__ = new Sk.builtin.func((self, path) => {
                self.ledPath = Sk.ffi.remapToJs(path);
                return none;
            });
            $loc.write = new Sk.builtin.func((self, value) => {
                const match = /^\/sys\/class\/leds\/(red|green|blue):(user|panic|wlan|bt)\/(brightness|trigger)$/.exec(self.ledPath);
                if (!match) throw new Sk.builtin.OSError(`[Errno 2] No such file or directory: '${self.ledPath}'`);
                if (match[3] === 'brightness') {
                    const led = match[2] === 'user' ? 1 : 2;
                    this._rgbLeds[led][['red', 'green', 'blue'].indexOf(match[1])] = String(Sk.ffi.remapToJs(value)).trim() !== '0';
                    this._showRgbLed(led);
                }
                return none;
            });
            $loc.close = new Sk.builtin.func(() => none);
            $loc.__enter__ = new Sk.builtin.func(self => self);
            $loc.__exit__ = new Sk.builtin.func(() => Sk.builtin.bool.false$);
        }, 'LedFile', []);
        Sk.builtins.open = new Sk.builtin.func(function (path) {
            if (/^\/sys\/class\/leds\//.test(Sk.ffi.remapToJs(path))) return Sk.misceval.callsimArray(LedFile, [path]);
            return Sk.misceval.callsimArray(fileOpen, Array.from(arguments));
        });
    },

    _showRgbLed(led) {
        const board = document.getElementById('board-viewer');
        const ledElt = board && board.contentDocument && board.contentDocument.getElementById(`led_${led}_color`);
        if (!ledElt) return;
        const [r, g, b] = this._rgbLeds[led];
        const color = `rgb(${r ? 255 : 0}, ${g ? 255 : 0}, ${b ? 255 : 0})`;
        ledElt.style.display = (r || g || b) ? 'block' : 'none';
        ledElt.style.fill = color;
        ledElt.style.filter = `drop-shadow(0 0 6px ${color})`;
    },

    /* --- Console --- */

    SOURCE_COLORS: { Python: '#3572A5', Arduino: '#00878F' },

    /**
     * Write in the simulator console with the source in front of each line (sketch and Python share the console)
     * @param {string} source - 'Python' or 'Arduino'
     * @param {string} text
     */
    print(source, text) {
        const cons = document.getElementById('console');
        if (!cons || !text) return;
        let html = '';
        // The other side has an unfinished line: go to the next line
        if (this._lineSource && this._lineSource !== source) {
            html += '</br>';
            this._lineSource = null;
        }
        for (const char of text) {
            if (char === '\r') continue;
            if (!this._lineSource && char !== '\n') {
                html += `<span style="color: ${this.SOURCE_COLORS[source]}; font-weight: bold;">[${source}] </span>`;
                this._lineSource = source;
            }
            if (char === '\n') {
                html += '</br>';
                this._lineSource = null;
            } else {
                html += char.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
            }
        }
        cons.innerHTML += html;
        cons.scrollTo(0, cons.scrollHeight);
    },

    _showError(error) {
        if (!this.running || String(error && error.message) === 'stopped') return;
        console.error(error);
        UIManager.showErrorMessage('error-message', '<b>[Python]</b> ' + String(error).replaceAll('<', '&lt;'));
    }
};

// The app runs with the sketch and stops with it
const runSketchSimulation = Simulator.runCode;
Simulator.runCode = function () {
    QAppSimulator.start();
    return runSketchSimulation.apply(this, arguments);
};
const stopSketchSimulation = Simulator.stop;
Simulator.stop = function () {
    QAppSimulator.stop();
    return stopSketchSimulation.apply(this, arguments);
};

// The "call with a return value" block generates a C++ lambda (not interpreted by JSCPP): use a typed call instead
const getSketchCode = Simulator.getProjectCode;
Simulator.getProjectCode = function () {
    return getSketchCode.apply(this, arguments).replace(
        /\(\[&\]\(\) \{ (\w+) bridgeResult\{\}; Bridge\.call\(([\s\S]*?)\)\.result\(bridgeResult\); return bridgeResult; \}\)\(\)/g,
        'Bridge.callResult_$1($2)');
};

// The simulator replays when the code changes: the Python and the web page are part of the app too
Simulator.getWatchedCode = function () {
    const files = CodeManager.getSharedInstance();
    return Simulator.getProjectCode() + files.getFile('main.py') + files.getFile('index.html');
};
