Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /PORT_([1-8])/gi;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    if (!/PORT/.test(pin)) {
        pin = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()].find(p => (p[1] == pin || p[0] == pin))[0]
    }
    return {
        name: pin.replace('_', ' '),
        id: pin.trim().replace('_', '')
    };
};

Simulator.Mosaic.externalLibraries = {
    'src/lib/cyberpi.js': Simulator.PATH_LIB + 'micropython/cyberpi.js',
    'src/lib/mbot2.js': Simulator.PATH_LIB + 'micropython/mbot2.js',
    'src/lib/mbuild.js': Simulator.PATH_LIB + 'micropython/mbuild.js',

    // js libraries
    'src/lib/machine.js': Simulator.PATH_LIB + 'micropython/machine.js',
    // js common libraries
    'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/ujson.js': Simulator.PATH_LIB_COMMON + 'micropython/json.js',
    'src/lib/json.js': Simulator.PATH_LIB_COMMON + 'micropython/json.js',
    'src/lib/gc.js': Simulator.PATH_LIB_COMMON + 'micropython/gc.js',
    // js common esp32 libraries
    'src/lib/esp32.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/esp32.js',
    'src/lib/esp.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/esp.js',
    'src/lib/urequests.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/requests.js',
    'src/lib/requests.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/requests.js',
    'src/lib/socket.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/socket.js',
    'src/lib/usocket.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/socket.js',
    'src/lib/network.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/network.js'
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

Simulator.Mosaic.groveRegex = {
    // digital readers
    "read-digital": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.IN(?!, id=.*)(,|\))/gi,
    // analog readers
    "read-analog": /(pinADC\(([0-9]{1,2})|(machine.|)ADC\((machine.|)Pin\(([0-9]{1,2})\),)( |)(id="read-analog"|)\)/g,
    // digital writers
    "write-digital": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.OUT(?!, id=.*)/gi,
    // analog writers
    "write-analog": /(machine.|)DAC\((machine.|)Pin\(([0-9]{1,2})(?!, bits=.*)\)/gi,
    // pwm
    "pwm": /(machine.|)PWM\((machine.|)Pin\([0-9]{1,2}/gi,
};

Simulator.Mosaic.specific = {

    SERVER_REGEXP: /(import vitta_server|from vitta_server import (\*|SERVER))/,

    extract: (str, func) => str.split(func + '(')[1].split(',')[0].replace(')', ''),
    extractPin: {
        'write-digital': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
        'read-digital': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
        'write-analog': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
        'read-analog': (str) => str.includes('pinADC') ? Simulator.Mosaic.specific.extract(str, 'pinADC') : Simulator.Mosaic.specific.extract(str, 'Pin'),
        'pwm': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
    },

    createSliders: function () {
        // Esp32 sliders
        // !Slider base : Fahreinheit value
        $('#esp32-rawTemp_slider_cel,' +
            '#esp32-rawTemp_slider_fah,' +
            '#esp32-rawTemp_slider_kel').slider({
                min: 0,
                max: 150,
                value: 150 / 2,
                step: 1
            });
        $('#esp32-hallMag_slider').slider({
            min: -READ_ANALOG_MAX_VALUE,
            max: READ_ANALOG_MAX_VALUE,
            value: 0
        });
        $('#cyberpi-lightsensor_slider').slider({
            min: 0,
            max: 100,
            value: 50,
            step: 1
        });
        $('#cyberpi-loudness_slider').slider({
            min: 0,
            max: 100,
            value: 50,
            step: 1
        });
        $('.mod_mbuild-ultrasonic_t,' +
            '.mod_mbuild-ultrasonic_d').slider({
                min: 88,
                max: 14575,
                value: 1166,
                step: 0.1
            });
        $('.mod_mbuildFinder-left1_v,' +
            '.mod_mbuildFinder-right1_v,' +
            '.mod_mbuildFinder-left2_v,' +
            '.mod_mbuildFinder-right2_v').slider({
                min: 0,
                max: 1,
                value: 0
            });
    },

    definitions: [
        /* Esp32 modules */
        {
            regex: /(cyberpi\.|)led\.(on|off|play|move|set_bri|get_bri|clear|breathe)/,
            id: "cyberpi-builtin-led",
            title: "LED RGB",
            pin: 'CyberPi',
            type: 'output',
            value: ""
        },
        {
            regex: /(esp32\.|)hall_sensor\(\)/,
            id: "esp32-hallMag",
            title: "Capteur à effet Hall ",
            pin: 'ESP32',
            listeners: [{
                suffix: "",
                unit: 'µT',
                color: "#ff4d6a",
                title: "Champ magnétique"
            }],
            type: 'input',
            picture: "Champ-magnetique.png",
            animate: function (Animator) {
                Animator.rotate(-READ_ANALOG_MAX_VALUE, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            regex: /(esp32\.|)raw_temperature\(\)/,
            id: "esp32-rawTemp",
            title: "Temp. du processeur ",
            pin: 'ESP32',
            listeners: [{
                suffix: "_cel",
                unit: '°C',
                color: "#f8a10f",
                title: "(°C)"
            }, {
                suffix: "_fah",
                unit: '°F',
                color: "#ff4d6a",
                title: "(°F)"
            }, {
                suffix: "_kel",
                unit: 'K',
                color: "#ff4d6a",
                title: "(K)"
            }],
            type: 'input',
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.gauge(value);
                const t_fah = Animator.value;
                Animator.updateListeners({
                    "_cel": roundFloat((t_fah - 32) * 5 / 9, 1),
                    "_kel": roundFloat((t_fah - 32) * 5 / 9 + 273.15, 1),
                    "_fah": roundFloat(t_fah, 1)
                }, callbackAnim);
            }
        },
        {
            regex: /cyberpi\.get_bri\(\)/,
            id: "cyberpi-lightsensor",
            title: "Capteur de luminosité",
            pin: 'CyberPi',
            type: 'input',
            listeners: [{
                default: 50,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            regex: /(cyberpi\.|)get_loudness\(/,
            id: "cyberpi-loudness",
            title: "Capteur de son",
            pin: 'CyberPi',
            type: 'input',
            listeners: [{
                default: 50,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            regex: /mbot2./,
            id: "mBot2-motorLeft",
            title: "Moteur Gauche",
            pin: 'mBot2',
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /mbot2./,
            id: "mBot2-motorRight",
            title: "Moteur Droit",
            pin: 'mBot2',
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /Servo on S([0-4]{1,1})/,
            id: "servo",
            title: "Servo",
            pin: 'pin n° ',
            pins: 'mbot2',
            type: 'output',
            class: 'servo',
            codeFlag: 'Servo',
            value: 0,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            id: "mbuild-ultrasonic",
            title: "Télémètre: ",
            pin: 'pin n° ',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Ultrasonic',
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
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.opacity(14575, 0, text = value);
                const t = Animator.value;
                Animator.updateListeners({
                    "_d": roundFloat(343 * t / 1e6 / 2 * 100, 1),
                    "_t": t
                }, callbackAnim);
            }
        },
        {
            id: "mbuildFinder-left2",
            title: "cap. Ligne noire (L2)",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Line Finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            multiple: ['mbuildFinder-right1', 'mbuildFinder-right2', 'mbuildFinder-left1'],
            picture: "Capteur-ligne-line.svg",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            id: "mbuildFinder-right2",
            title: "cap. Ligne noire (R2)",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Line Finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            multiple: ['mbuildFinder-left1', 'mbuildFinder-left2', 'mbuildFinder-right1'],
            picture: "Capteur-ligne-line.svg",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            id: "mbuildFinder-left1",
            title: "cap. Ligne noire (L1)",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Line Finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            multiple: ['mbuildFinder-right1', 'mbuildFinder-right2', 'mbuildFinder-left2'],
            picture: "Capteur-ligne-line.svg",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            id: "mbuildFinder-right1",
            title: "cap. Ligne noire (R1)",
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Line Finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            multiple: ['mbuildFinder-left1', 'mbuildFinder-left2', 'mbuildFinder-right2'],
            picture: "Capteur-ligne-line.svg",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
    ]
}