Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    const pins = Blockly.Constants.Pins[mod.pins][Blockly.Constants.getSelectedBoard()];
    const pinName = pins.find(p => p[1] == 'p' + pin);
    const portName = pins.find(p => p[1] == 'S' + pin);
    return {
        name: pinName ? pinName[0] : (portName ? portName[0] : null),
        id: pin
    };
};

Simulator.Mosaic.externalLibraries = {
    // python common libraries
    'src/lib/framebuf.py': Simulator.PATH_LIB_COMMON + 'micropython/framebuf.py',
    // js common libraries
    'src/lib/os.js': Simulator.PATH_LIB_COMMON + 'micropython/os.js',
    'src/lib/uos.js': Simulator.PATH_LIB_COMMON + 'micropython/os.js',
    'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/ujson.js': Simulator.PATH_LIB_COMMON + 'micropython/json.js',
    'src/lib/json.js': Simulator.PATH_LIB_COMMON + 'micropython/json.js',
    'src/lib/gc.js': Simulator.PATH_LIB_COMMON + 'micropython/gc.js',
    // js common esp32 libraries
    'src/lib/urequests.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/requests.js',
    'src/lib/requests.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/requests.js',
    'src/lib/socket.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/socket.js',
    'src/lib/usocket.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/socket.js',
    'src/lib/network.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/network.js',
    // js specific libraries
    'src/lib/codey.js': Simulator.PATH_LIB + 'micropython/codey.js',
    'src/lib/rocky.js': Simulator.PATH_LIB + 'micropython/rocky.js',
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    if (!board) return;

    const leds = board.querySelectorAll('#pixel-on > circle');
    // Hide all LEDs by default
    leds.forEach(
        led => {
            led.style.display = 'none';
        }
    );
    board.querySelector('#pixel-on').style.display = 'unset';
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () {

    // pitch

    Sk.builtins.pitch = function (Pin, frequency, duration) {
        const module = Simulator.getModuleByKey('buzzer');
        const stopMusic = function (self) {
            if (self._data.osc) {
                self._data.osc.stop();
                delete self._data.osc;
            }
            Simulator.setAnimator(module, module.id + "_" + Pin.pin, 0);
        };
        const startOscillator = function (self, freq) {
            const volume = self._data.audioCtx.createGain();
            volume.connect(self._data.audioCtx.destination);
            volume.gain.value = self._data.volume;
            self._data.osc = self._data.audioCtx.createOscillator();
            self._data.osc.type = 'sine';
            self._data.osc.frequency.value = freq;
            self._data.osc.connect(volume);
            self._data.osc.start();
        };
        let self = {
            _data: {
                volume: 1,
                audioCtx: null
            }
        };

        if (duration === undefined) {
            duration = 1000;
        } else {
            duration = duration.v;
        }
        return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
            if (!self._data.audioCtx) {
                self._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                Simulator.audioContext = self._data.audioCtx;
            }
            if (self._data.osc) {
                stopMusic(self);
            }
            Simulator.setAnimator(module, module.id + "_" + Pin.pin, frequency.v);

            startOscillator(self, frequency.v);
            if (duration > 0) {
                await sleep_ms(duration + 50);
                stopMusic(self);
                resolve();
            }
            if (Simulator.stop_flag) {
                stopMusic(self);
                resolve();
            }
        }));
    };
};

Simulator.Mosaic.groveRegex = {};

Simulator.Mosaic.specific = {

    createSliders: function () { },

    definitions: [
        {
            regex: /rocky./,
            id: "rocky-motorLeft",
            title: "Moteur Gauche",
            pin: 'Rocky',
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /rocky./,
            id: "rocky-motorRight",
            title: "Moteur Droit",
            pin: 'Rocky',
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
    ]
}