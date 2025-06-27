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
    'src/lib/Winky_base.js': Simulator.PATH_LIB + 'Winky_base.js',
    'src/lib/Winky_interface.py': Simulator.PATH_LIB + 'Winky_interface.py',
    'src/lib/Winky_preset_list.py': Simulator.PATH_LIB + 'Winky_preset_list.py',
    'src/lib/Winky_return_list.py': Simulator.PATH_LIB + 'Winky_return_list.py',
    'src/lib/Winky_actuator.py': Simulator.PATH_LIB + 'Winky_actuator.py',
    'src/lib/interface_actuator.py': Simulator.PATH_LIB + 'interface_actuator.py',
    'src/lib/SimulatorActuator.js': Simulator.PATH_LIB + 'SimulatorActuator.js',
    'src/lib/interface_sensor.py': Simulator.PATH_LIB + 'interface_sensor.py',
    'src/lib/Winky_sensor.py': Simulator.PATH_LIB + 'Winky_sensor.py',
    'src/lib/SimulatorSensor.js': Simulator.PATH_LIB + 'SimulatorSensor.js',
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () { };

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
        $('#winky-blue-btn_slider,' +
            '#winky-red-btn_slider,' +
            '#winky-yellow-btn_slider,' +
            '#winky-purple-btn_slider').slider({
                min: 0,
                max: 1,
                value: 0
            });

        $('#winky-gyro-angle_slider_x,' +
            '#winky-gyro-angle_slider_y').slider({
                min: 0,
                max: 360,
                value: 90
            });


        $('#winky-gesture-detection_slider,' +
            '#winky-gyro-direction_slider_x,' +
            '#winky-gyro-direction_slider_y,' +
            '#winky-gyro-direction_slider_z').slider({
                min: 0,
                max: 2,
                value: 0
            });

        $('#winky-proximity-detection_slider').slider({
            min: 0,
            max: 3,
            value: 0
        });
    },

    btn: {
        'blue': 0,
        'red': 0,
        'yellow': 0,
        'purple': 0
    },

    soundPlaying: false,

    definitions: [
        {
            regex: /get_gesture_detection/gi,
            id: "winky-gesture-detection",
            title: "Détection de mouvements",
            pin: 'Winky',
            type: 'input',
            listeners: [{
                default: "Aucun",
                unit: '',
                color: "#2D82E1",
                title: "",
                suffix: ""
            }],
            picture: "hand_movement_nothing.png",
            animate: function (Animator) {
                const spanText = document.getElementById('winky-gesture-detection_value');
                const imgHtmlTag = document.querySelector('.winky-gesture-detection_base');
                switch (Animator.value) {
                    case 0:
                        spanText.innerText = 'Aucun';
                        imgHtmlTag.src = imgHtmlTag.src.replace(/(\/[^\/]+)$/, '/hand_movement_nothing.png');
                        break;
                    case 1:
                        spanText.innerText = 'Droite';
                        imgHtmlTag.src = imgHtmlTag.src.replace(/(\/[^\/]+)$/, `/hand_movement_right.png`);
                        break;
                    default:
                        spanText.innerText = 'Gauche';
                        imgHtmlTag.src = imgHtmlTag.src.replace(/(\/[^\/]+)$/, `/hand_movement_left.png`);
                }
            }
        },
        {
            regex: /get_touch_blue/gi,
            id: "winky-blue-btn",
            title: "Bouton bleu",
            pin: 'Winky',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#2D82E1",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Blue.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.btn["blue"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /get_touch_red/gi,
            id: "winky-red-btn",
            title: "Bouton rouge",
            pin: 'Winky',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#FF3C14",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.btn["red"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /get_touch_yellow/gi,
            id: "winky-yellow-btn",
            title: "Bouton jaune",
            pin: 'Winky',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Yellow.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.btn["yellow"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /get_touch_purple/gi,
            id: "winky-purple-btn",
            title: "Bouton violet",
            pin: 'Winky',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#A349A4",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Purple.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.btn["purple"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /get_gyro_(x|y|z)_angle/gi,
            id: "winky-gyro-angle",
            title: "Gyroscope",
            pin: 'Angle ',
            type: 'input',
            listeners: [{
                suffix: "_x",
                default: 90,
                unit: '°',
                color: "#ff4d6a",
                title: "x"
            }, {
                suffix: "_y",
                default: 90,
                unit: '°',
                color: "#f9d142",
                title: "y"
            }],
            picture: "Potentiometre.png",
            pictureAnimation: "Potentiometre-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, 360, text = Animator.value, angle = 270);
            }
        },
        {
            regex: /get_gyro_(x|y|z)_direction/gi,
            id: "winky-gyro-direction",
            title: "Gyroscope",
            pin: 'Direction',
            type: 'input',
            listeners: [{
                suffix: "_x",
                default: '',
                unit: '',
                color: "#ff4d6a",
                title: "x"
            }, {
                suffix: "_y",
                default: '',
                unit: '',
                color: "#f9d142",
                title: "y"
            }, {
                suffix: "_z",
                default: '',
                unit: '',
                color: "#1a6da8",
                title: "z"
            }],
            picture: "winky_gyro.png",
            animate: function (Animator) {
                const spanText = document.querySelector(Animator.valueId);
                switch (Animator.value) {
                    case 0:
                        spanText.innerText = '';
                        break;
                    case 1:
                        spanText.innerText = 'Droite';
                        break;
                    default:
                        spanText.innerText = 'Gauche';
                }
            }
        },
        {
            regex: /get_proximity_detection/gi,
            id: "winky-proximity-detection",
            title: "Détection d'obstacles",
            pin: 'Winky',
            type: 'input',
            listeners: [{
                default: "Aucun",
                unit: '',
                color: "#2D82E1",
                title: "",
                suffix: ""
            }],
            picture: "winky_proximity_detection.png",
            animate: function (Animator) {
                const spanText = document.getElementById('winky-proximity-detection_value');
                switch (Animator.value) {
                    case 2:
                        spanText.innerText = 'Loin';
                        break;
                    case 3:
                        spanText.innerText = 'Proche';
                        break;
                    default:
                        spanText.innerText = 'Aucun';
                }
            }
        },
    ]
}