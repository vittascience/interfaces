Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" style="background-repeat: no-repeat; background-size: contain; background-position: center;" type="image/svg+xml"></object>`;

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    // js hub library
    'src/lib/hub.js': Simulator.PATH_LIB + 'hub.js',
    // js motor library
    'src/lib/motor.js': Simulator.PATH_LIB + 'motor.js',
    // js color library
    'src/lib/color.js': Simulator.PATH_LIB + 'color.js',
    // js color_matrix library
    'src/lib/color_matrix.js': Simulator.PATH_LIB + 'color_matrix.js',
    // js color_sensor library
    'src/lib/color_sensor.js': Simulator.PATH_LIB + 'color_sensor.js',
    // js speech_synthesis library
    'src/lib/speech_synthesis.js': Simulator.PATH_LIB + 'speech_synthesis.js'
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
        const self = {
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
    createSliders: function () {},

    definitions: [
        {
            regex: /color_matrix\.(show|set_pixel)\(port\.A/,
            id: "spike-LEDMatrix-portA",
            title: "Matrice LED 3x3",
            pin: 'Port A',
            type: 'output',
            value: "",
        },
        {
            regex: /color_matrix\.(show|set_pixel)\(port\.B/,
            id: "spike-LEDMatrix-portB",
            title: "Matrice LED 3x3",
            pin: 'Port B',
            type: 'output',
            value: "",
        },
        {
            regex: /motor\.(run(|_for_time|_to_relative_position|_to_absolute_position|stop))\(port\.A/,
            id: "spike-motor-portA",
            title: "Moteur",
            pin: "Port A",
            type: 'output',
            value: 0,
            picture: "lego_motor.svg"
        },
        {
            regex: /motor\.(run(|_for_time|_to_relative_position|_to_absolute_position|stop))\(port\.B/,
            id: "spike-motor-portB",
            title: "Moteur",
            pin: "Port B",
            type: 'output',
            value: 0,
            picture: "lego_motor.svg"
        },
        {
            regex: /color_sensor\.color\(port\.A\)/gi,
            id: "spike-colorSensor-portA",
            title: "Capteur de couleurs",
            pin: "Port A",
            type: 'input',            
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {

            }
        }
    ]
};