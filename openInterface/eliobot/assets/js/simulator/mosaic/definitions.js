Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

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
    'src/lib/board.js': Simulator.PATH_LIB + 'micropython/board.js',
    'src/lib/neopixel.js': Simulator.PATH_LIB + 'micropython/neopixel.js',
    'src/lib/digitalio.js': Simulator.PATH_LIB + 'micropython/digitalio.js',
    'src/lib/elio.js': Simulator.PATH_LIB + 'elio.js',

};

Simulator.Mosaic.addSpecificSkulptFunctions = function () {
    // const DEFAULT_SPEED = 125;
    // const eliobot = Object.create(null);
    // eliobot.motors = {
    //     motorLeft: ['forward', 0],
    //     motorRight: ['forward', 0],
    // };

    // const setMotors = function (direction, speed) {
    //     switch (direction) {
    //         case 'right':
    //             eliobot.motors.motorLeft[0] = 'forward';
    //             eliobot.motors.motorRight[0] = 'backward';
    //             break;
    //         case 'left':
    //             eliobot.motors.motorLeft[0] = 'backward';
    //             eliobot.motors.motorRight[0] = 'forward';
    //             break;
    //         default:
    //             eliobot.motors.motorLeft[0] = direction;
    //             eliobot.motors.motorRight[0] = direction;
    //             break;
    //     }
    //     eliobot.motors.motorLeft[1] = speed;
    //     eliobot.motors.motorRight[1] = speed;
    //     $('#mb-eliobot-motorLeft_value').html(eliobot.motors.motorLeft[1]);
    //     $('#mb-eliobot-motorRight_value').html(eliobot.motors.motorRight[1]);
    //     if (speed !== 0) {
    //         $('.mb-eliobot-motorLeft').css('animation', 'rotation-' + eliobot.motors.motorLeft[0] + ' ' + (60 / (Math.abs(eliobot.motors.motorLeft[1]) / 255 * 133)) + 's infinite linear');
    //         $('.mb-eliobot-motorRight').css('animation', 'rotation-' + eliobot.motors.motorRight[0] + ' ' + (60 / (Math.abs(eliobot.motors.motorRight[1]) / 255 * 133)) + 's infinite linear');
    //     } else {
    //         $('.mb-eliobot-motorLeft').css('animation', 'none');
    //         $('.mb-eliobot-motorRight').css('animation', 'none');
    //     }
    // };

    // Sk.builtins.move_robot = (direction) => setMotors(Sk.ffi.remapToJs(direction), DEFAULT_SPEED);
    // Sk.builtins.move_robot.co_varnames = ['direction'];
    // Sk.builtins.move_robot.$defaults = [new Sk.builtin.str('forward')];

    // Sk.builtins.stop_robot = () => setMotors('stop', 0);
};

Simulator.Mosaic.groveRegex = {
    // digital readers
    "read-digital": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.IN(?!, id=.*)/gi,
    // analog readers
    "read-analog": /(pinADC\(([0-9]{1,2})|(machine.|)ADC\((machine.|)Pin\(([0-9]{1,2})\),)( |)(id="read-analog"|)\)/g,
    // digital writers
    "write-digital": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.OUT(?!, id=.*)/gi,
    // Pins on module - outputs
};

Simulator.Mosaic.specific = {

    createSliders: function () {
        // Specific sliders
        $('#mb-button_slider').slider({
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
        $('#elio-finderLeft_slider_v,' +
            '#elio-finderMiddleLeft_slider_v,' +
            '#elio-finderMiddle_slider_v,' +
            '#elio-finderMiddleRight_slider_v,' +
            '#elio-finderRight_slider_v').slider({
                min: 0,
                max: 1,
                value: 0
            });
    },

    definitions: [
        {
            regex: /(neopixel\.|)NeoPixel/gi,
            id: "RGBLed",
            title: "LED RGB",
            pin: 'Eliobot',
            led: true,
            type: 'output',
            value: "",
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png"
        },
        {
            regex: /DigitalInOut\(IO14\)/,
            id: "mb-button",
            title: "Bouton",
            pin: 'Eliobot',
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
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /elio\.(move(Forward|Backward|OneStep)|turn(Left|Right)|motorStop|(spin(Left|Right)Wheel(Forward|Backward)))/gi,
            id: "mb-eliobot-motorLeft",
            title: "Moteur Gauche",
            pin: 'Eliobot',
            type: 'output',
            value: "0",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /elio\.(move(Forward|Backward|OneStep)|turn(Left|Right)|motorStop|(spin(Left|Right)Wheel(Forward|Backward)))/gi,
            id: "mb-eliobot-motorRight",
            title: "Moteur Droit",
            pin: 'Eliobot',
            type: 'output',
            value: "0",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /(.*)\.getObstacle\(1\)/gi,
            id: "eliobot-irFront",
            title: "Obstacle devant",
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
            regex: /(.*)\.getObstacle\(3\)/gi,
            id: "eliobot-irBack",
            title: "Obstacle derrière",
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
            regex: /(.*)\.getObstacle\(0\)/gi,
            id: "eliobot-irLeft",
            title: "Obstacle à gauche",
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
            regex: /(.*)\.getObstacle\(2\)/gi,
            id: "eliobot-irRight",
            title: "Obstacle à droite",
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
            regex: /elio\.play(Frequency|Note|Music)/gi,
            id: "eliobot-buzzer",
            title: "Buzzer",
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
            regex: /elio\.getLineSensor\(0\)/gi,
            id: "elio-finderLeft",
            title: "cap. Ligne noire (Gauche)",
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /elio\.getLineSensor\(1\)/gi,
            id: "elio-finderMiddleLeft",
            title: "cap. Ligne noire (Milieu gauche)",
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /elio\.getLineSensor\(2\)/gi,
            id: "elio-finderMiddle",
            title: "cap. Ligne noire (Milieu)",
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /elio\.getLineSensor\(3\)/gi,
            id: "elio-finderMiddleRight",
            title: "cap. Ligne noire (Milieu droite)",
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        }, {
            regex: /elio\.getLineSensor\(4\)/gi,
            id: "elio-finderRight",
            title: "cap. Ligne noire (Droite)",
            pin: 'Eliobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
    ]
}