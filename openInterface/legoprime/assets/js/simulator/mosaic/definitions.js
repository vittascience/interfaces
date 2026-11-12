Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" style="background-repeat: no-repeat; background-size: contain; background-position: center;" type="image/svg+xml" role="img" aria-labelledby="title-board"></object>`;

Simulator.Mosaic.externalLibraries = {
    // js specific library
    'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/runloop.js': Simulator.PATH_LIB + 'runloop.js',
    'src/lib/hub.js': Simulator.PATH_LIB + 'hub.js',
    'src/lib/motor.js': Simulator.PATH_LIB + 'motor.js',
    'src/lib/motor_pair.js': Simulator.PATH_LIB + 'motor_pair.js',
    'src/lib/color.js': Simulator.PATH_LIB + 'color.js',
    'src/lib/color_sensor.js': Simulator.PATH_LIB + 'color_sensor.js',
    'src/lib/distance_sensor.js': Simulator.PATH_LIB + 'distance_sensor.js',
    'src/lib/force_sensor.js': Simulator.PATH_LIB + 'force_sensor.js'
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () { };

Simulator.Mosaic.groveRegex = {};

const LEGO_PRIME_SENSOR = { pictureAnimation: "Transparent.png", animate: Animator => $(Animator.valueId).html(Animator.value) };

// modules of each port and of the hub, shown when the program uses them
Simulator.Mosaic.specific = {
    createSliders: function () {
        const sliders = (selector, min, max, value) => $(selector).slider({ min, max, value });
        for (const port of "ABCDEF") {
            sliders(`#spike-distance-port${port}_slider`, -1, 2000, -1);
            sliders(`#spike-force-port${port}_slider`, 0, 100, 0);
        }
        sliders('#spike-motion_slider_yaw, #spike-motion_slider_pitch, #spike-motion_slider_roll', -180, 180, 0);
    },

    // shows the speed of a motor and turns it (used by the motor and motor_pair modules)
    setMotor: function (port, speed = 0, direction = null) {
        $('#spike-motor-port' + port + '_value').html(Math.round(speed));
        const motorElement = document.querySelector(`#spike-motor-port${port} #spike-motor`);
        if (!motorElement) return;
        motorElement.style.animation = direction !== null && speed > 0 ? `rotation-${direction} ${360 / speed}s linear infinite` : 'none';
    },

    definitions: [
        {
            regex: /motion_sensor\.tilt_angles/,
            id: 'spike-motion',
            title: "Inclinaison",
            pin: 'Hub',
            type: 'input',
            listeners: ['yaw', 'pitch', 'roll'].map(axis => ({ default: 0, unit: '°', color: "#2D82E1", title: axis, suffix: '_' + axis })),
            ...LEGO_PRIME_SENSOR
        },
        ...[..."ABCDEF"].flatMap(port => [
        {
            regex: new RegExp(`motor\\.\\w+\\(port\\.${port}\\b|motor_pair\\.pair\\([^)]*port\\.${port}\\b`),
            id: `spike-motor-port${port}`,
            title: "Moteur",
            pin: `Port ${port}`,
            type: 'output',
            value: 0,
            picture: "lego_motor.svg"
        },
        {
            regex: new RegExp(`color_sensor\\.\\w+\\(port\\.${port}\\b`),
            id: `spike-ColorSensor-port${port}`,
            title: "Capteur de couleurs",
            pin: `Port ${port}`,
            type: 'input',
            class: 'RGB-circle',
            ...LEGO_PRIME_SENSOR
        },
        {
            regex: new RegExp(`distance_sensor\\.\\w+\\(port\\.${port}\\b`),
            id: `spike-distance-port${port}`,
            title: "Capteur de distance",
            pin: `Port ${port}`,
            type: 'input',
            listeners: [{ default: -1, unit: 'mm', color: "#2D82E1", title: "", suffix: "" }],
            ...LEGO_PRIME_SENSOR
        },
        {
            regex: new RegExp(`force_sensor\\.\\w+\\(port\\.${port}\\b`),
            id: `spike-force-port${port}`,
            title: "Capteur de force",
            pin: `Port ${port}`,
            type: 'input',
            listeners: [{ default: 0, unit: 'dN', color: "#2D82E1", title: "", suffix: "" }],
            ...LEGO_PRIME_SENSOR
        }
        ])
    ]
};
