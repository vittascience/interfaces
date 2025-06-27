Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" style="background-repeat: no-repeat; background-size: contain; background-position: center;" type="image/svg+xml"></object>`;

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    // js tts library
    'src/lib/tts.js': Simulator.PATH_LIB + 'tts.js',
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
    
    isRunning: false,

    createSliders: function () {
        $('#lotibot-light_slider,' +
            '#lotibot-sound-level_slider').slider({
                min: 0,
                max: 255,
                value: 55
            });
        $('#lotibot-thermometer_slider').slider({
            min: 0,
            max: 100,
            value: 20
        });
        $('#lotibot-ultrasonic_slider_t,' +
            '#lotibot-ultrasonic_slider_d').slider({
                min: 88,
                max: 14575,
                value: 1166
            });
    },

    calculs: {
        getDistance: function (round_trip_duration_us) {
            return 343 * round_trip_duration_us / 1e6 / 2 * 100;
        }
    },

    definitions: [
        {
            id: "lotibot-led-left",
            title: "LED Gauche",
            regex: /setLEDColor/gi,
            pin: "Loti-bot",
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            id: "lotibot-led-right",
            title: "LED Droite",
            regex: /setLEDColor/gi,
            pin: "Loti-bot",
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            id: "lotibot-headlight-right",
            title: "Phare Droite",
            regex: /setHeadlightValue/gi,
            pin: "Loti-bot",
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(75, 75, 75, " + Animator.value + ")");
            }
        },
        {
            id: "lotibot-headlight-left",
            title: "Phare Gauche",
            regex: /setHeadlightValue/gi,
            pin: "Loti-bot",
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(75, 75, 75, " + Animator.value + ")");
            }
        },
        {
            regex: /(move(Forward|Backward)|turn(Left|Right)|drawSquare)/,
            id: "lotibot-motorLeft",
            title: "Moteur Gauche",
            pin: "Loti-bot",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /(move(Forward|Backward)|turn(Left|Right)|drawSquare)/,
            id: "lotibot-motorRight",
            title: "Moteur Droit",
            pin: "Loti-bot",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /getSoundLevel/gi,
            id: "lotibot-sound-level",
            title: "Microphone",
            pin: 'Loti-bot',
            type: 'input',
            listeners: [{
                default: "0 (NONE)",
                unit: '',
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                if (Animator.value >= 128) {
                    $(Animator.valueId).text(Animator.value + ' (LOUD)');
                    $(Animator.animId).css("filter", 'hue-rotate(310deg)')
                } else if (Animator.value <= 128) {
                    $(Animator.valueId).text(Animator.value + ' (QUIET)');
                    $(Animator.animId).css("filter", 'hue-rotate(15deg)')
                } else if (Animatior.value == 0) {
                    $(Animator.valueId).text(Animator.value + ' (NONE)');
                }
                $(Animator.animId).css('opacity', Animator.value / 255);
            }
        },
        {
            regex: /getLightLevel/g,
            id: "lotibot-light",
            title: "Capteur de luminosité",
            pin: 'Loti-bot',
            type: 'input',
            listeners: [{
                default: 55,
                unit: '',
                color: "#f9d142 ",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 255);
            }
        },
        {
            regex: /getTemperature/,
            id: "lotibot-thermometer",
            title: "Capteur de température",
            pin: 'Loti-bot',
            type: 'input',
            listeners: [{
                default: 20,
                unit: '°C',
                color: "#f8a10f",
                suffix: "",
            }],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            regex: /getDistance/gi,
            id: "lotibot-ultrasonic",
            title: "Télémètre: ",
            pin: 'Loti-bot',
            type: 'input',
            listeners: [{
                default: 20,
                unit: 'cm',
                color: "#f9d142 ",
                suffix: "_d",
                title: "Distance"
            }, {
                suffix: "_t",
                default: 1166,
                unit: 'μs',
                color: "#f9d142",
                title: "Durée"
            }],
            class: "ultrasonic",
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.opacity(14575, 0, text = value);
                const t = Animator.value;
                Animator.updateListeners({
                    "_d": roundFloat(Simulator.Mosaic.specific.calculs.getDistance(t), 1),
                    "_t": t
                }, callbackAnim);
            }
        },
    ]
};