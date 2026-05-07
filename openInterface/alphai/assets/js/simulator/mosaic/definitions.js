Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3 mb-3" type="image/svg+xml" role="img" aria-label="Board simulator view"></object>`;

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    // js specific libraries
    'src/lib/alphai_robot.js': Simulator.PATH_LIB + 'alphai_robot.js'
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () { };

Simulator.Mosaic.groveRegex = {};

Simulator.Mosaic.specific = {

    calculs: {
        getDistance: function (round_trip_duration_us) {
            return 343 * round_trip_duration_us / 1e6 / 2 * 100;
        }
    },

    createSliders: function () {
        $('#alphai-ultrasonic_slider_t,' +
            '#alphai-ultrasonic_slider_d').slider({
                min: 88,
                max: 14575,
                value: 1166
            });
        $('#alphai-trsensor1_slider,' +
            '#alphai-trsensor2_slider,' +
            '#alphai-trsensor3_slider,' +
            '#alphai-trsensor4_slider,' +
            '#alphai-trsensor5_slider').slider({
                min: 30,
                max: 1000,
                value: 500,
                step: 0.1
            });
    },

    definitions: [
        {
            regex: /set_motor\(/gi,
            id: "alphai-motorLeft",
            title: "Moteur Gauche",
            pin: 'AlphAI',
            type: 'output',
            value: "0",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /set_motor\(/,
            id: "alphai-motorRight",
            title: "Moteur Droit",
            pin: 'AlphAI',
            type: 'output',
            value: "0",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /get_distance\(\)/gi,
            id: "alphai-ultrasonic",
            title: "Télémètre: ",
            pin: 'AlphAI',
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
        {
            regex: /get_infra_red\(\)/gi,
            id: "alphai-trsensor1",
            title: "Capteur de ligne noire 1",
            pin: 'AlphAI',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },
        {
            regex: /get_infra_red\(\)/gi,
            id: "alphai-trsensor2",
            title: "Capteur de ligne noire 2",
            pin: 'AlphAI',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },
        {
            regex: /get_infra_red\(\)/gi,
            id: "alphai-trsensor3",
            title: "Capteur de ligne noire 3",
            pin: 'AlphAI',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },
        {
            regex: /get_infra_red\(\)/gi,
            id: "alphai-trsensor4",
            title: "Capteur de ligne noire 4",
            pin: 'AlphAI',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },
        {
            regex: /get_infra_red\(\)/gi,
            id: "alphai-trsensor5",
            title: "Capteur de ligne noire 5",
            pin: 'AlphAI',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },

        {
            regex: /set_camera\(.+\)/gi,
            id: "alphai-camera",
            title: "Caméra",
            pin: 'AlphAI',
            type: 'output',
            value: "",
            picture: "camera-solid-full.svg",
        },

        {
            regex: /set_leds\(/,
            id: "alphai-leds",
            title: "Leds RGB",
            pin: 'AlphAI',
            type: 'output',
            picture: "RGB-LED.svg",
            value: "R: 255<br>G: 255<br>B: 255"
        },

        {
            regex: /set_buzzer\(/gi,
            id: "alphai-buzzer",
            title: "Buzzer",
            pin: 'AlphAI',
            type: 'output',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
    ]
};