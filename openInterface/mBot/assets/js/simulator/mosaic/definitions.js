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
        Object.assign(this.includes, { ...ARDUINO_H });
		Object.assign(this.includes, { ...LIBRARIES_H });
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
                if (document.getElementById("mCoreButton_slider") !== null) {
                    $("#mCoreButton_slider").slider('value', 1023);
                }
            });
            button.addEventListener("mouseup", function () {
                playButtonAnimation(this.id, up);
                if (document.getElementById("mCoreButton_slider") !== null) {
                    $("#mCoreButton_slider").slider('value', 0);
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
            value: 0,
            step: 1023
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
            get title() { return i18next.t('code.simulator.modules.builtinLed') },
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
            get title() { return i18next.t('code.simulator.modules.motorLeft') },
            pin: 'mBot (D9)',
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /MeDCMotor/,
            id: "mBot-motorRight",
            get title() { return i18next.t('code.simulator.modules.motorRight') },
            pin: 'mBot (D10)',
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /lightSensor_board;/g,
            id: "mCoreLight",
            get title() { return i18next.t('code.simulator.modules.groveLight') },
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
            get title() { return i18next.t('code.simulator.modules.rgbLedLeft') },
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
            get title() { return i18next.t('code.simulator.modules.rgbLedRight') },
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
            get title() { return i18next.t('code.simulator.modules.button') },
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
            get title() { return i18next.t('code.simulator.modules.buzzer') },
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
            get title() { return i18next.t('code.simulator.modules.LEDMatrix') },
            codeFlag: "LED Matrix",
            pin: 'pin n°',
            pins: 'digital',
            type: 'output',
            value: "",

        },
        {
            id: "neopixel",
            get title() { return i18next.t('code.simulator.modules.neopixel') },
            codeFlag: "Neopixel",
            pin: 'pin n°',
            pins: 'digital',
            slots: true,
            type: 'output',
            value: "",
        },
        {
            regex: /RGB LED on PORT_([0-9])/gi,
            id: "MeRGBLed",
            get title() { return i18next.t('code.simulator.modules.RGBLed') },
            codeFlag: "RGB LED",
            size: 4,
            pin: 'pin n°',
            pins: 'digital',
            type: 'output',
            value: "",
        },
        {
            regex: /Me7SegmentDisplay on PORT_([0-9])/gi,
            id: "Me7SegmentDisplay",
            get title() { return i18next.t('code.simulator.modules.tm1637') },
            codeFlag: "Me7SegmentDisplay",
            size: 4,
            pin: 'pin n°',
            pins: 'digital',
            type: 'output',
            value: "0000",
        },
        // Sensors
        {
            id: "ultrasonic",
            get title() { return i18next.t('code.simulator.modules.ultrasonic') },
            pin: 'pin n°',
            pins: 'digital',
            type: 'input',
            codeFlag: 'Ultrasonic',
            listeners: [{
                default: 20,
                unit: 'cm',
                color: "#f9d142 ",
                suffix: "_d",
                get title() { return i18next.t('code.simulator.modules.distance') }
            }, {
                suffix: "_t",
                default: 1166,
                unit: 'μs',
                color: "#f9d142",
                get title() { return i18next.t('code.simulator.modules.duration') }
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
            get title() { return i18next.t('code.simulator.modules.lineLeft') },
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
            get title() { return i18next.t('code.simulator.modules.lineRight') },
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
            get title() { return i18next.t('code.simulator.modules.groveMotion') },
            pin: 'pin n°',
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
            get title() { return i18next.t('code.simulator.modules.compassAxis') },
            pin: 'pin n°',
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
            get title() { return i18next.t('code.simulator.modules.compassAngle') },
            pin: 'pin n°',
            type: 'input',
            codeFlag: 'Compass',
            listeners: [{
                suffix: "",
                default: 90,
                unit: '°',
                color: "#448ae5",
                get title() { return i18next.t('code.simulator.modules.direction') }
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
            get title() { return i18next.t('code.simulator.modules.groveLight') },
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
            get title() { return i18next.t('code.simulator.modules.colorSensor') },
            pin: 'pin n°',
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
            get title() { return i18next.t('code.simulator.modules.groveSound') },
            pin: 'pin n°',
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
            get title() { return i18next.t('code.simulator.modules.mq2') },
            pin: 'pin n°',
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
            get title() { return i18next.t('code.simulator.modules.ds18b20') },
            pin: 'pin n°',
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
            get title() { return i18next.t('code.simulator.modules.servo') },
            pin: 'pin n°',
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