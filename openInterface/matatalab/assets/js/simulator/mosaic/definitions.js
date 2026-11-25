Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3 mb-3" type="image/svg+xml" role="img" aria-label="Board simulator view"></object>`;

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    // js matatalab library
    'src/lib/matatalab.js': Simulator.PATH_LIB + 'matatalab.js',
};

Simulator.Mosaic.groveRegex = {};

Simulator.Mosaic.specific = (() => {
    const YELLOW = "#f9d142";
    const module = (id, title, regex, options) => ({ regex, id: 'matatalab-' + id, get title() { return i18next.t('code.simulator.modules.' + title) }, pin: 'Matatalab', ...options });
    const listener = (suffix, value, unit = '', title = undefined, color = YELLOW) => ({ suffix, default: value, unit, color, title });
    const motion = (name, unit) => ({ suffix: '_' + name, default: 0, unit, color: YELLOW, get title() { return i18next.t('code.simulator.modules.' + name) } });

    const motor = { type: 'output', value: 0, picture: "Roue.png", pictureAnimation: "Roue-animation.png" };
    const MOTORS = /matatalab\.(forward|backward|move|turn_(left|right)|set_(gear|speed)|stop|dance|action)\(/;

    const state = {
        type: 'input',
        listeners: [listener('_v', 'OFF')],
        picture: "Bouton.png",
        pictureAnimation: "Bouton-animation.png",
        animate: (Animator) => Animator.button()
    };
    // the programs can give the name of the button, gesture... with a variable: all the modules are then displayed
    const call = (name, value) => new RegExp(`matatalab\\.${name}\\(\\s*(["']${value}["']|[^"'\\s])`);
    const buttons = {
        play: 'buttonPlay',
        delete: 'buttonDelete',
        forward: 'buttonForward',
        backward: 'buttonBackward',
        left: 'buttonLeft',
        right: 'buttonRight',
        music: 'buttonMusic'
    };

    const light = async (id, rgb) => {
        // the program can start before the picture of the board is loaded
        await Simulator.waitBoardViewer();
        const board = document.getElementById("board-viewer")?.contentDocument;
        const element = board?.getElementById(id);
        if (!element) return;
        element.style.fill = rgb.some((c) => c > 0) ? `rgb(${rgb.join(',')})` : '';
        if (id.startsWith('led-')) {
            // the MatataCon controller is an option of the robot: shown when its LED ring is used
            board.getElementById('controller').style.display = '';
            board.documentElement.setAttribute('viewBox', '0 0 490 300');
        }
    };

    return {
        ringLeds: Array.from({ length: 12 }, (_, i) => i + 1),
        setEye: (side, rgb) => light('eye-' + side, rgb),
        setRingLed: (led, rgb) => light('led-' + led, rgb),

        createSliders: function () {
            const set = (id, min, max, value) => $('#matatalab-' + id).slider({ min, max, value });
            for (const button of Object.keys(buttons)) set(`button-${button}_slider_v`, 0, 1, 0);
            for (const id of ['sound', 'obstacle', 'fall']) set(id + '_slider_v', 0, 1, 0);
            set('light_slider_v', 0, 255, 127);
            set('message_slider_v', 0, 6, 0);
            for (const channel of ['r', 'g', 'b']) set('color_slider_' + channel, 0, 255, 0);
            for (const angle of ['pitch', 'roll', 'yaw']) set('motion_slider_' + angle, -180, 180, 0);
            set('motion_slider_shake', 0, 100, 0);
            for (const axis of ['x', 'y', 'z']) set('acceleration_slider_' + axis, -20, 20, 0);
        },

        definitions: [
            module('motorLeft', 'motorLeft', MOTORS, motor),
            module('motorRight', 'motorRight', MOTORS, motor),
            ...Object.entries(buttons).map(([button, title]) => module('button-' + button, title, call('is_button', button), state)),
            module('sound', 'groveSound', /matatalab\.is_sound\(/, {
                ...state, picture: "Capteur de son-micro.png", pictureAnimation: "Capteur de son-animation.png",
                animate: (Animator) => {
                    $(Animator.valueId).text(Animator.value ? "ON" : "OFF");
                    $(Animator.animId).css('opacity', Animator.value);
                }
            }),
            module('obstacle', 'obstacleSensor', /matatalab\.is_obstacle\(/, {
                ...state, picture: "Capteur-ligne-line.png", pictureAnimation: "Capteur-ligne-anim.png",
                animate: (Animator) => Animator.translation('digital')
            }),
            module('fall', 'freeFall', call('is_gesture', 'fall'), {
                ...state, picture: "Accélerateur.png", pictureAnimation: "Accelérateur-animation.png",
                animate: (Animator) => Animator.rotate(0, 1, Animator.value ? "ON" : "OFF")
            }),
            module('light', 'groveLight', /matatalab\.(is_light|get_brightness)\(/, {
                type: 'input', listeners: [listener('_v', 127)], class: 'light',
                picture: "Luminosité.png", pictureAnimation: "Luminosité-animation.png",
                animate: (Animator) => Animator.opacity(0, 255)
            }),
            module('color', 'colorSensor', /matatalab\.(is_color|get_color)\(/, {
                type: 'input', class: 'RGB-circle', pictureAnimation: "Transparent.png",
                listeners: [listener('_r', 0, '', 'R', "#dc3545"), listener('_g', 0, '', 'G', "#22b573"), listener('_b', 0, '', 'B', "#3fa9f5")],
                animate: (Animator) => {
                    const value = (channel) => Simulator.getSliderValue('matatalab-color', '_' + channel);
                    $(Animator.animId).css('background-color', `rgb(${value('r')},${value('g')},${value('b')})`);
                    $(Animator.valueId).html(Animator.value);
                }
            }),
            module('motion', 'groveMotion', /matatalab\.(is_gesture|get_angle|get_shaking)\(/, {
                type: 'input', picture: "gyroscope.png",
                listeners: [motion('roll', '°'), motion('pitch', '°'), motion('yaw', '°'), motion('shake', '')],
                animate: (Animator) => $(Animator.valueId).text(Animator.value)
            }),
            module('acceleration', 'accelerometer', /matatalab\.get_acceleration\(/, {
                type: 'input', picture: "Accélerateur.png", pictureAnimation: "Accelérateur-animation.png",
                listeners: ['x', 'y', 'z'].map((axis) => listener('_' + axis, 0, 'm/s²', axis.toUpperCase())),
                animate: (Animator) => Animator.rotate(-20, 20)
            }),
            module('message', 'receivedMessage', /matatalab\.(get_message|is_message)\(/, {
                type: 'input', listeners: [listener('_v', 0)],
                animate: (Animator) => $(Animator.valueId).text(Animator.value)
            }),
            module('sender', 'sentMessage', /matatalab\.send_message\(/, { type: 'output', value: '-' })
        ]
    };
})();
