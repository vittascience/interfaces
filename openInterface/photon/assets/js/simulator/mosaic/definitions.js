Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" style="background-repeat: no-repeat; background-size: contain; background-position: center;" type="image/svg+xml"></object>`;

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    // js photonrobot library
    'src/lib/photonrobot.js': Simulator.PATH_LIB + 'photonrobot.js',
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () { };

Simulator.Mosaic.groveRegex = {};

Simulator.Mosaic.specific = {
    createSliders: function () {
        $('#photon-line-sensor1_slider_v,' +
            '#photon-line-sensor2_slider_v,' +
            '#photon-light_slider_v').slider({
                min: 0,
                max: 1,
                value: 0
            });
        $('#photon-battery_slider_v').slider({
            min: 0,
            max: 100,
            value: 50
        });
        $('#photon-distance_slider_t,' +
            '#photon-distance_slider_d').slider({
                min: 88,
                max: 14575,
                value: 1166
            });
    },

    definitions: [
        {
            regex: /photon\.((go_(forward|backward))|(rotate_(left|right)))(_infinity|)/,
            id: "photon-motorLeft",
            title: "Moteur Gauche",
            pin: "Photon",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /photon\.((go_(forward|backward))|(rotate_(left|right)))(_infinity|)/,
            id: "photon-motorRight",
            title: "Moteur Droit",
            pin: "Photon",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /photon\.get_line_sensors\(\)/gi,
            id: "photon-line-sensor1",
            title: "Capteur de ligne noire 1",
            pin: 'Photon',
            type: 'input',
            listeners: [{
                default: 'OFF',
                unit: '',
                color: "#f9d142",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /photon\.get_line_sensors\(\)/gi,
            id: "photon-line-sensor2",
            title: "Capteur de ligne noire 2",
            pin: 'Photon',
            type: 'input',
            listeners: [{
                default: 'OFF',
                unit: '',
                color: "#f9d142",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /photon\.get_light\(\)/g,
            id: "photon-light",
            title: "Capteur de luminosité",
            pin: 'Photon',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142 ",
                suffix: "_v"
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1);
            }
        },
        {
            regex: /photon\.get_battery\(\)/g,
            id: "photon-battery",
            title: "Niveau de la batterie",
            pin: 'Photon',
            type: 'input',
            listeners: [{
                default: 50,
                unit: '',
                color: "#f9d142 ",
                suffix: "_v"
            }],
            animate: function (Animator) {
                const batteryLevel = Animator.value;
                $('#batteryLevel').css('height', batteryLevel + '%');
                $('#photon-battery_value_v').text(batteryLevel + '%');
                if (batteryLevel <= 25) {
                    $('#batteryLevel').css('background-color', 'var(--vitta-red)');
                } else if (batteryLevel > 25 && batteryLevel <= 50) {
                    $('#batteryLevel').css('background-color', 'var(--vitta-orange)');
                } else {
                    $('#batteryLevel').css('background-color', 'var(--vitta-green)');
                }
            }
        },
        {
            regex: /photon\.get_distance_from_obstacle\(\)/gi,
            id: "photon-distance",
            title: "Télémètre: ",
            pin: 'Photon',
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
                    "_d": roundFloat(343 * t / 1e6 / 2 * 100, 1),
                    "_t": t
                }, callbackAnim);
            }
        },
    ]
};