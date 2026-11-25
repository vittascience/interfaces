Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    const pins = Blockly.Constants.Pins[mod.pins][Blockly.Constants.getSelectedBoard()];
    const pinName = pins.find(p => p[1] == 'p' + pin);
    return {
        name: pinName ? pinName[0] : null,
        id: pin
    };
};

Simulator.Mosaic.externalLibraries = {
    // CircuitPython
    'src/lib/board.js': Simulator.PATH_LIB + 'circuitpython/board.js',
    'src/lib/neopixel.js': Simulator.PATH_LIB + 'circuitpython/neopixel.js',
    'src/lib/digitalio.js': Simulator.PATH_LIB + 'circuitpython/digitalio.js',
    'src/lib/pwmio.js': Simulator.PATH_LIB + 'circuitpython/pwmio.js',
    'src/lib/analogio.js': Simulator.PATH_LIB + 'circuitpython/analogio.js',
    'src/lib/pulseio.js': Simulator.PATH_LIB + 'circuitpython/pulseio.js',
    'src/lib/busio.js': Simulator.PATH_LIB + 'circuitpython/busio.js',
    // Eliobot
    'src/lib/elio.js': Simulator.PATH_LIB + 'elio.js',
    'src/lib/adafruit_ssd1306.js': Simulator.PATH_LIB + 'adafruit_ssd1306.js',
    'src/lib/adafruit_dht.js': Simulator.PATH_LIB + 'adafruit_dht.js',
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () { };

Simulator.Mosaic.groveRegex = {
    // // digital readers
    // "read-digital": /digitalio\.DigitalInOut\(board\.IO([0-9]{1,2})\)/gi,
    // // analog readers
    // "read-analog": /analogio\.AnalogIn(board\.IO([0-9]{1,2})\)/gi,
    // // digital writers
    // "write-digital": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.OUT(?!, id=.*)/gi,
    // I2C modules
    "oled": /SSD1306_I2C\(./gi
};

Simulator.Mosaic.specific = {

    createSliders: function () {
        // Specific sliders
        $('#elio-button-IO2_slider,' +
            '#elio-button-IO15_slider,' +
            '#elio-ir-remote-signal-up_slider,' +
            '#elio-ir-remote-signal-down_slider,' +
            '#elio-ir-remote-signal-left_slider,' +
            '#elio-ir-remote-signal-right_slider,' +
            '#elio-ir-remote-signal-ok_slider,' +
            '#elio-ir-remote-signal-1_slider,' +
            '#elio-ir-remote-signal-2_slider,' +
            '#elio-ir-remote-signal-3_slider,' +
            '#elio-ir-remote-signal-4_slider,' +
            '#elio-ir-remote-signal-5_slider,' +
            '#elio-ir-remote-signal-6_slider,' +
            '#elio-ir-remote-signal-7_slider,' +
            '#elio-ir-remote-signal-8_slider,' +
            '#elio-ir-remote-signal-9_slider,' +
            '#elio-ir-remote-signal-0_slider,' +
            '#elio-ir-remote-signal-ht_slider,' +
            '#elio-ir-remote-signal-st_slider'
        ).slider({
            min: 0,
            max: 1,
            value: 0
        });

        $('#eliobot-irFront_slider,' +
            '#eliobot-irBack_slider,' +
            '#eliobot-irLeft_slider,' +
            '#eliobot-irRight_slider').slider({
                min: 0,
                max: 1300,
                value: 0
            });

        $('#elio-finderLeft_slider,' +
            '#elio-finderMiddleLeft_slider,' +
            '#elio-finderMiddle_slider,' +
            '#elio-finderMiddleRight_slider,' +
            '#elio-finderRight_slider').slider({
                min: 0,
                max: READ_ANALOG_MAX_VALUE,
                value: READ_ANALOG_MAX_VALUE / 2,
            });

        $('#elio-potentiometer-IO2_slider,' +
            '#elio-potentiometer-IO15_slider,' +
            '#elio-light-sensor-IO2_slider,' +
            '#elio-light-sensor-IO15_slider').slider({
                min: 1,
                max: READ_ANALOG_MAX_VALUE,
                value: Math.round(READ_ANALOG_MAX_VALUE / 2)
            });

        $('#elio-dht11-temp_slider').slider({
            min: 0,
            max: 50,
            value: 20,
            step: 0.1
        });

        $('#elio-dht11-hum_slider').slider({
            min: 20,
            max: 80,
            value: 50,
            step: 0.1
        });
    },

    definitions: [
        {
            regex: /(neopixel\.|)NeoPixel/gi,
            id: "RGBLed",
            get title() { return i18next.t('code.simulator.modules.RGBLed') },
            pin: 'Eliobot',
            led: true,
            type: 'output',
            value: "",
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png"
        },
        {
            regex: /# Button on IO2/,
            id: "elio-button-IO2",
            get title() { return i18next.t('code.simulator.modules.button') },
            pin: 'IO2',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /# Button on IO15/,
            id: "elio-button-IO15",
            get title() { return i18next.t('code.simulator.modules.button') },
            pin: 'IO15',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /# Potentiometer on IO2/,
            id: "elio-potentiometer-IO2",
            get title() { return i18next.t('code.simulator.modules.potentiometer') },
            pin: 'IO2',
            type: 'input',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, READ_ANALOG_MAX_VALUE, text = Animator.value, angle = 270);
            }
        },
        {
            regex: /# Potentiometer on IO15/,
            id: "elio-potentiometer-IO15",
            get title() { return i18next.t('code.simulator.modules.potentiometer') },
            pin: 'IO15',
            type: 'input',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, READ_ANALOG_MAX_VALUE, text = Animator.value, angle = 270);
            }
        },
        {
            regex: /# Light Sensor on IO2/,
            id: "elio-light-sensor-IO2",
            get title() { return i18next.t('code.simulator.modules.groveLight') },
            pin: 'IO2',
            type: 'input',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            regex: /# Light Sensor on IO15/,
            id: "elio-light-sensor-IO15",
            get title() { return i18next.t('code.simulator.modules.groveLight') },
            pin: 'IO2',
            type: 'input',
            listeners: [{
                default: Math.round(READ_ANALOG_MAX_VALUE / 2),
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            regex: /dht_sensor\.temperature\(\)/gi,
            id: "elio-dht11-temp",
            get title() { return i18next.t('code.simulator.modules.dht11-temp') },
            pin: 'IO15',
            type: 'input',
            noCombine: true,
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#ff4d6a"
            }],
            multiple: ['dht11-hum'],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            regex: /dht_sensor\.humidity\(\)/gi,
            id: "elio-dht11-hum",
            get title() { return i18next.t('code.simulator.modules.dht11-hum') },
            pin: 'IO15',
            type: 'input',
            noCombine: true,
            listeners: [{
                suffix: "",
                default: 50,
                unit: '%',
                color: "#ff4d6a"
            }],
            multiple: ['dht11-temp'],
            class: 'cloud',
            picture: "CO2-COV.png",
            pictureAnimation: "cloud-animation.png",
            animate: function (Animator) {
                Animator.opacity(20, 80);
            }
        },
        {
            regex: /# Servo on IO2/,
            id: "elio-servo-IO2",
            get title() { return i18next.t('code.simulator.modules.servo') },
            pin: 'IO2',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                let angle = Animator.value;
                if (angle == null || angle == 25) {
                    angle = 0;
                }
                $(Animator.valueId).html(Math.round(angle) + " °");
                $(Animator.animId).css("transform", "rotate(" + angle + "deg)");
            }
        },
        {
            regex: /# Servo on IO15/,
            id: "elio-servo-IO15",
            get title() { return i18next.t('code.simulator.modules.servo') },
            pin: 'IO15',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                let angle = Animator.value;
                if (angle == null || angle == 25) {
                    angle = 0;
                }
                $(Animator.valueId).html(Math.round(angle) + " °");
                $(Animator.animId).css("transform", "rotate(" + angle + "deg)");
            }
        },
        {
            regex: /# Servo on IO16/,
            id: "elio-servo-IO16",
            get title() { return i18next.t('code.simulator.modules.servo') },
            pin: 'IO16',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                let angle = Animator.value;
                if (angle == null || angle == 25) {
                    angle = 0;
                }
                $(Animator.valueId).html(Math.round(angle) + " °");
                $(Animator.animId).css("transform", "rotate(" + angle + "deg)");
            }
        },
        {
            regex: /from elio/gi,
            id: "eliobot-motorLeft",
            get title() { return i18next.t('code.simulator.modules.motorLeft') },
            pin: 'Eliobot',
            type: 'output',
            value: "0",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /from elio/gi,
            id: "eliobot-motorRight",
            get title() { return i18next.t('code.simulator.modules.motorRight') },
            pin: 'Eliobot',
            type: 'output',
            value: "0",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /(.*)\.get_obstacle\(1\)/gi,
            id: "eliobot-irFront",
            get title() { return i18next.t('code.simulator.modules.obstacleFront') },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },
        {
            regex: /(.*)\.get_obstacle\(3\)/gi,
            id: "eliobot-irBack",
            get title() { return i18next.t('code.simulator.modules.obstacleBack') },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },
        {
            regex: /(.*)\.get_obstacle\(0\)/gi,
            id: "eliobot-irLeft",
            get title() { return i18next.t('code.simulator.modules.obstacleLeft') },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },
        {
            regex: /(.*)\.get_obstacle\(2\)/gi,
            id: "eliobot-irRight",
            get title() { return i18next.t('code.simulator.modules.obstacleRight') },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },
        {
            regex: /Buzzer\(/gi,
            id: "eliobot-buzzer",
            get title() { return i18next.t('code.simulator.modules.buzzer') },
            pin: 'Eliobot',
            type: 'output',
            codeFlag: 'Buzzer',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        {
            regex: /lineSensor\.get_line\(0\)/gi,
            id: "elio-finderLeft",
            get title() { return i18next.t('code.simulator.modules.lineLeft') },
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 5000,
                unit: '',
                color: "#000000",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);

            }
        },
        {
            regex: /lineSensor\.get_line\(1\)/gi,
            id: "elio-finderMiddleLeft",
            get title() { return i18next.t('code.simulator.modules.lineMiddleLeft') },
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 5000,
                unit: '',
                color: "#000000",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);

            }
        },
        {
            regex: /lineSensor\.get_line\(2\)/gi,
            id: "elio-finderMiddle",
            get title() { return i18next.t('code.simulator.modules.lineMiddle') },
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 5000,
                unit: '',
                color: "#000000",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);

            }
        },
        {
            regex: /lineSensor\.get_line\(3\)/gi,
            id: "elio-finderMiddleRight",
            get title() { return i18next.t('code.simulator.modules.lineMiddleRight') },
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 5000,
                unit: '',
                color: "#000000",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);

            }
        },
        {
            regex: /lineSensor\.get_line\(4\)/gi,
            id: "elio-finderRight",
            get title() { return i18next.t('code.simulator.modules.lineRight') },
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 5000,
                unit: '',
                color: "#000000",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },
        {
            regex: /EyesMatrix\(/gi,
            id: "left-eye",
            get title() { return i18next.t('code.simulator.modules.eyeLeft') },
            pin: 'Eliobot',
            type: 'output',
            value: "",
        },
        {
            regex: /EyesMatrix\(/gi,
            id: "right-eye",
            get title() { return i18next.t('code.simulator.modules.eyeRight') },
            pin: 'Eliobot',
            type: 'output',
            value: "",
        },
        {
            regex: /IRRemote\.signals\['signal_up'\]/gi,
            id: 'elio-ir-remote-signal-up',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '↑' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_down'\]/gi,
            id: 'elio-ir-remote-signal-down',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '↓' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_left'\]/gi,
            id: 'elio-ir-remote-signal-left',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '←' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_right'\]/gi,
            id: 'elio-ir-remote-signal-right',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '→' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_ok'\]/gi,
            id: 'elio-ir-remote-signal-ok',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: 'OK' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_1'\]/gi,
            id: 'elio-ir-remote-signal-1',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '1' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_2'\]/gi,
            id: 'elio-ir-remote-signal-2',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '2' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_3'\]/gi,
            id: 'elio-ir-remote-signal-3',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '3' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_4'\]/gi,
            id: 'elio-ir-remote-signal-4',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '4' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_5'\]/gi,
            id: 'elio-ir-remote-signal-5',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '5' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_6'\]/gi,
            id: 'elio-ir-remote-signal-6',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '6' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_7'\]/gi,
            id: 'elio-ir-remote-signal-7',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '7' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_8'\]/gi,
            id: 'elio-ir-remote-signal-8',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '8' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_9'\]/gi,
            id: 'elio-ir-remote-signal-9',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '9' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_0'\]/gi,
            id: 'elio-ir-remote-signal-0',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '0' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_ht'\]/gi,
            id: 'elio-ir-remote-signal-ht',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '#' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
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
            regex: /IRRemote.signals\['signal_st'\]/gi,
            id: 'elio-ir-remote-signal-st',
            get title() { return i18next.t('code.simulator.modules.remoteButton', { button: '*' }) },
            pin: 'Eliobot',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        }
    ]
}