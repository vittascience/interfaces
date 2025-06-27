Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" style="background-repeat: no-repeat; background-size: contain; background-position: center;" type="image/svg+xml"></object>`;

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    // js sphero library
    'src/lib/sphero.js': Simulator.PATH_LIB + 'sphero.js',
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
    createSliders: function () { },

    definitions: [
        {
            id: "sphero-mini-RGBLed",
            title: "LED RGB",
            regex: /setLEDColor/gi,
            pin: "Sphero Mini",
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            id: "sphero-mini-BackLed",
            title: "LED",
            regex: /setBackLEDIntensity/gi,
            pin: "Sphero Mini",
            type: 'output',
            value: [51, 204, 255],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(51, 204, 255, " + Animator.value + ")");
            }
        },
        {
            regex: /(raw_motor|roll)/,
            id: "sphero-mini-motorLeft",
            title: "Moteur Gauche",
            pin: "Sphero Mini",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /(raw_motor|roll)/,
            id: "sphero-mini-motorRight",
            title: "Moteur Droit",
            pin: "Sphero Mini",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        }
    ]
};