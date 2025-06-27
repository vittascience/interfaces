Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /PORT_([0-9]{1,2})/gi;

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
    init: function () {
        this.includes = LIBRARIES_H;
        this.includes["Arduino.h"] = ARDUINO_H;
    },
    includes: {}
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    if (board != null) {

        const playButtonAnimation = function (id, animation) {
            var button = null;
            if (id === "button") {
                button = board.querySelector("#ellipse_top-2");
            } else {
                button = board.querySelector("#rectangle_top");
            }
            if (button !== null) {
                button.style.transform = animation;
            }
        };

        const getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        };

        // mCore switches
        const up = 'translate(0px, 0px)', // button css animation
            down = 'translate(0px, 7px)',
            up_reset = 'translate(0px, -7px)', // button css animation
            down_reset = 'translate(0px, 0px)';
        const button = board.querySelector("#button"),
            reset = board.querySelector("#reset");
        if (button !== null && reset !== null) {
            button.addEventListener("mousedown", function () {
                playButtonAnimation(this.id, down);
                if (document.getElementById("mCore-button_slider") !== null) {
                    $("#mCore-button_slider").slider('value', getRandomInt(10, 1024));
                }
            });
            button.addEventListener("mouseup", function () {
                playButtonAnimation(this.id, up);
                if (document.getElementById("mCore-button_slider") !== null) {
                    $("#mCore-button_slider").slider('value', getRandomInt(0, 10));
                }
            });
            button.addEventListener("touchstart", function () {
                playButtonAnimation(this.id, down);
            });
            button.addEventListener("touchend", function () {
                playButtonAnimation(this.id, up);
            });
            reset.addEventListener("mousedown", function () {
                playButtonAnimation(this.id, down_reset);
            });
            reset.addEventListener("mouseup", function () {
                playButtonAnimation(this.id, up_reset);
                Simulator.replay();
            });
            reset.addEventListener("touchstart", function () {
                playButtonAnimation(this.id, down_reset);
            });
            reset.addEventListener("touchend", function () {
                playButtonAnimation(this.id, up_reset);
                Simulator.replay();
            });

        }
    }
};

Simulator.Mosaic.groveRegex = {
    // digital readers
    "read-digital": /digitalRead\(((A|)[0-9]{1,2})\)/gi,
    // digital writers
    "write-digital": /digitalWrite\((?!13)([A]{0,1}[0-9]{1,2}),.*\)/gi,
    // analog readers
    "read-analog": /analogRead\((?!A7)(A[0-9]{1})\)/gi,
    // analog writers
    "write-analog": /analogWrite\(([0-9]{1,2}),.*\)/gi
};

Simulator.Mosaic.specific = {

    extractPin: {
        'read-digital': (str) => str.replace('digitalRead(', "").replace(')', ""),
        'write-digital': (str) => str.replace('digitalWrite(', "").split(',')[0],
        'read-analog': (str) => str.replace('analogRead(', "").replace(')', ""),
        'write-analog': (str) => str.replace('analogWrite(', "").split(',')[0]
    },

    setLed: function (state) {
        const board = document.getElementById("board-viewer").contentDocument;
        if (board !== null) {
            const led = board.querySelector("#integrated_led_off");
            if (led !== null) {
                if (state) {
                    led.style.fill = 'blue';
                } else {
                    led.style.fill = 'black';
                }
            }
        }
    },

    createSliders: function () {
        $('#mCoreLight_slider').slider({
            min: 0,
            max: 255,
            value: 55
        });
        $('#mCoreButton_slider').slider({
            min: 0,
            max: 1023,
            value: 512
        });
        $('.mod_ultrasonic_t,' +
            '.mod_ultrasonic_d').slider({
                min: 88,
                max: 14575,
                value: 1166,
                step: 0.1
            });
        $('.mod_makeblockFinder-left_v,' +
            '.mod_makeblockFinder-right_v,' +
            '.mod_makeblockPIR').slider({
                min: 0,
                max: 1,
            });
        $('#makeblockCompass-heading_x').slider({
            min: -66000,
            max: 33000,
            value: 3000
        });
        $('#makeblockCompass-heading_y').slider({
            min: -66000,
            max: 33000,
            value: 3000
        });
        $('#makeblockCompass-heading_z').slider({
            min: -93000,
            max: 5200,
            value: -8000
        });
        $('.mod_makeblockCompass-angle').slider({
            min: 0,
            max: 360,
            value: 90
        });
        $('.mod_makeblockColorSensor_r,' +
            '.mod_makeblockColorSensor_g,' +
            '.mod_makeblockColorSensor_b').slider({
                min: 0,
                max: 255,
                value: 55
            });

        $('.mod_makeblockDS18B20').slider({
            min: -55,
            max: 125,
            value: 20,
            step: 0.1
        });
        $('.mod_makeblockSoundSensor').slider({
            min: 0,
            max: READ_ANALOG_MAX_VALUE,
            value: READ_ANALOG_MAX_VALUE / 2
        });
        $('.mod_makeblockLight').slider({
            min: 1,
            max: 4095,
            value: 2048
        });
    },

    definitions: [
        //mCore modules
        {
            regex: /digitalWrite\(13,.*\)/gi,
            id: "mCoreBuiltinBlueLED",
            title: "LED intégrée",
            pin: 'mCore (D13)',
            pins: 'digital',
            type: 'output',
            value: "OFF",
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.led();
                Simulator.Mosaic.specific.setLed(Animator.value);
            }
        },
        {
            regex: /MeDCMotor/,
            id: "mBot-motorLeft",
            title: "Moteur Gauche",
            pin: 'mBot (D9)',
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /MeDCMotor/,
            id: "mBot-motorRight",
            title: "Moteur Droit",
            pin: 'mBot (D10)',
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /lightSensor_board;/g,
            id: "mCoreLight",
            title: "Capteur de luminosité",
            pin: 'mCore (D6)',
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
            regex: /MeRGBLed rgbled_board;/gi,
            id: "mCoreRGBLED-left",
            title: "LED RGB gauche",
            pin: 'mCore (D7)',
            pins: 'digital',
            type: 'output',
            value: "",
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png"
        },
        {
            regex: /MeRGBLed rgbled_board;/gi,
            id: "mCoreRGBLED-right",
            title: "LED RGB droite",
            pin: 'mCore (D7)',
            pins: 'digital',
            type: 'output',
            value: "",
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png"
        },
        {
            regex: /analogRead\(A7/gi,
            id: "mCoreButton",
            title: "Bouton",
            pin: 'mCore (A7)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            animate: function (Animator) {
                Animator.button(Animator.value > 10);
            }
        },
        {
            regex: /MeBuzzer/,
            id: "mCoreBuzzer",
            class: "buzzer",
            title: "Buzzer",
            type: 'output',
            pin: 'mCore',
            value: 'OFF',
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        // display modules
        {
            regex: /LED Matrix on PORT_([0-9])/gi,
            id: "makeblockMatrix",
            title: "Matrice de LED",
            codeFlag: "LED Matrix",
            pin: 'pin n° ',
            pins: 'digital',
            type: 'output',
            value: "",

        },
        {
            id: "neopixel",
            title: "Neopixel",
            codeFlag: "Neopixel",
            pin: 'pin n° ',
            pins: 'digital',
            slots: true,
            type: 'output',
            value: "",
        },
        {
            regex: /RGB LED on PORT_([0-9])/gi,
            id: "MeRGBLed",
            title: "LED RGB",
            codeFlag: "RGB LED",
            size: 4,
            pin: 'pin n° ',
            pins: 'digital',
            type: 'output',
            value: "",
        },
        {
            regex: /Me7SegmentDisplay on PORT_([0-9])/gi,
            id: "Me7SegmentDisplay",
            title: "Afficheurs 4 digits",
            codeFlag: "Me7SegmentDisplay",
            size: 4,
            pin: 'pin n° ',
            pins: 'digital',
            type: 'output',
            value: "0000",
        },
        // Sensors
        {
            id: "ultrasonic",
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
            id: "makeblockFinder-left",
            title: "cap. Ligne noire (Gauche)",
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
            multiple: ['makeblockFinder-right'],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            id: "makeblockFinder-right",
            title: "cap. Ligne noire (Droit)",
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
            multiple: ['makeblockFinder-left'],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            id: "makeblockPIR",
            title: "Capteur de mouvement",
            pin: 'pin n° ',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Motion Sensor',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            id: "makeblockCompass-heading",
            title: "Boussole - Axe: ",
            pin: 'pin n° ',
            type: 'input',
            codeFlag: 'Compass',
            listeners: [{
                suffix: "_x",
                default: 15000,
                unit: 'µT',
                color: "#ff4d6a",
                title: "x"
            }, {
                suffix: "_y",
                default: 3000,
                unit: 'µT',
                color: "#f9d142",
                title: "y"
            }, {
                suffix: "_z",
                default: -8000,
                unit: 'µT',
                color: "#1a6da8",
                title: "z"
            }
            ],
            multiple: ['makeblockCompass-angle'],
            picture: "Champ-magnetique.png",
            animate: function (Animator) {
                $(Animator.valueId).text(roundFloat(Animator.value / 1000, 1)); // convert nT in µT
            }
        },
        {
            id: "makeblockCompass-angle",
            title: "Boussole - angle",
            pin: 'pin n° ',
            type: 'input',
            codeFlag: 'Compass',
            listeners: [{
                suffix: "",
                default: 90,
                unit: '°',
                color: "#448ae5",
                title: "Direction"
            }],
            multiple: ['makeblockCompass-heading'],
            picture: "Boussole.png",
            pictureAnimation: "Boussole-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, 360, text = Animator.value, degree = 360);
            }
        },
        {
            id: "makeblockLight",
            title: "Capteur de luminosité",
            pin: 'pin n°',
            type: 'input',
            codeFlag: "Light Sensor",
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
                Animator.opacity(0, 4095);
            }
        },
        {
            id: "makeblockColorSensor",
            title: "Capteur de couleurs : ",
            pin: 'pin n° ',
            type: 'input',
            codeFlag: 'Color Sensor',
            listeners: [{
                suffix: "_r",
                default: 255,
                unit: '',
                color: "#dc3545",
                title: "R"
            }, {
                suffix: "_g",
                default: 0,
                unit: '',
                color: "#22b573",
                title: "G"
            }, {
                suffix: "_b",
                default: 0,
                unit: '',
                color: "#3fa9f5",
                title: "B"
            }
            ],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                const r = $(Animator.sliderId.replace(/_(g|b)/, '_r')).slider('option', 'value');
                const g = $(Animator.sliderId.replace(/_(b|r)/, '_g')).slider('option', 'value');
                const b = $(Animator.sliderId.replace(/_(r|g)/, '_b')).slider('option', 'value');
                $(Animator.animId).css('background-color', "rgb(" + r + "," + g + "," + b + ")");
                $(Animator.valueId).html(Animator.value);
            }
        },
        {
            id: "makeblockSoundSensor",
            title: "Capteur de son",
            pin: 'pin n° ',
            pins: 'analog_read',
            type: 'input',
            codeFlag: 'Sound Sensor',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            id: "makeblockMQ2",
            title: "MQ2 - Gas",
            pin: 'pin n° ',
            type: 'input',
            codeFlag: 'MQ2 Sensor',
            listeners: [{
                suffix: "",
                default: 5000,
                unit: 'ppm',
                color: "#ff4d6a",
            }],
            class: "particles",
            picture: "CO2-COV.png",
            pictureAnimation: "particles-animation.png",
            animate: function (Animator) {
                Animator.opacity(400, 10000);
            }
        },
        {
            id: "makeblockDS18B20",
            title: "DS18B20 - Température",
            pin: 'pin n° ',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Waterproof Sensor',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#ff4d6a"
            }],
            slots: true,
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        // actuators
        {
            id: "makeblockServo",
            title: "Servo",
            pin: 'pin n° ',
            pins: 'PWM',
            type: 'output',
            class: 'servo',
            codeFlag: 'Servo',
            slots: true,
            value: 0,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).text(Animator.value + ' °');
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        }
    ]
};