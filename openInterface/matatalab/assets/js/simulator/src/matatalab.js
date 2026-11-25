// Matatalab module: drives the robot connected by bluetooth, otherwise the simulator

const $builtinmodule = function () {

    const P = MatatalabProtocol;
    const ble = MatatalabWebBLEAPI;
    const SPEED = 50; // rpm
    const matatalab = { __name__: new Sk.builtin.str("matatalab") };

    const define = (name, callback, defaults = []) => {
        const func = (...args) => {
            const result = callback(...args.map((arg) => Sk.ffi.remapToJs(arg)));
            if (result instanceof Promise) {
                return new Sk.misceval.promiseToSuspension(result.then((value) => Sk.ffi.remapToPy(value ?? null)));
            }
            // suspension of the robot simulator
            if (result instanceof Sk.misceval.Suspension) return result;
            return Sk.ffi.remapToPy(result ?? null);
        };
        if (defaults.length) func.$defaults = defaults.map((value) => Sk.ffi.remapToPy(value));
        func.co_varnames = callback.toString().match(/\(([^)]*)\)/)[1].split(',').map((arg) => arg.trim()).filter(Boolean);
        matatalab[name] = new Sk.builtin.func(func);
    };

    const choice = (value, choices, name) => {
        if (!choices.includes(value)) {
            throw new Sk.builtin.ValueError(`${name}: ${choices.join(', ')}`);
        }
        return value;
    };

    /* Robot */

    const showMotor = function (motor, rpm) {
        const direction = rpm > 0 ? 'forward' : 'backward';
        $('#matatalab-motor' + motor + '_value').html(Math.round(Math.abs(rpm)));
        $('.matatalab-motor' + motor).css('animation', rpm ? `rotation-${direction} ${60 / Math.abs(rpm)}s infinite linear` : 'none');
    };
    const setMotors = function (left, right) {
        showMotor('Left', left);
        showMotor('Right', right);
    };
    RobotSimulator.robot.setMotorsInModules = setMotors;

    const simulateMove = function (cm) {
        if (!cm) return;
        const duration = Math.abs(cm) * 1e-2 / RobotSimulator.convertRPMtoSpeedMS(SPEED);
        const start = Object.assign({}, RobotSimulator.robot.rotationCenter);
        setMotors(Math.sign(cm) * SPEED, Math.sign(cm) * SPEED);
        return RobotSimulator.delayOnMovement(duration * 1000, () => {
            RobotSimulator.robot.rotationCenter = RobotSimulator.getPositionByDistance(start, cm);
        }, true, 300);
    };
    const simulateTurn = function (degrees) {
        if (!degrees) return;
        const distance = RobotSimulator.robot.WHEELS_CENTER_RADIUS * 1e-2 * degToRad(Math.abs(degrees));
        const start = RobotSimulator.robot.angle;
        setMotors(Math.sign(degrees) * SPEED, -Math.sign(degrees) * SPEED);
        return RobotSimulator.delayOnMovement(distance / RobotSimulator.convertRPMtoSpeedMS(SPEED) * 1000, () => {
            RobotSimulator.robot.angle = start + degrees;
        }, true, 300);
    };

    // at most 10 m (100 steps), as the real robot
    const limit = (value, max) => Math.min(max, Math.max(-max, Number(value) || 0));
    const moveSteps = (steps) => ble.isConnected ? ble.moveSteps(steps) : simulateMove(limit(Math.round(steps), 100) * P.STEP_CM);
    const turn = (degrees) => ble.isConnected ? ble.turn(degrees) : simulateTurn(limit(Math.round(degrees), 3600));

    define('forward', (steps) => moveSteps(steps), [1]);
    define('backward', (steps) => moveSteps(-steps), [1]);
    define('move', (cm) => ble.isConnected ? ble.move(cm) : simulateMove(limit(cm, 1000)));
    define('turn_left', (angle) => turn(-angle), [90]);
    define('turn_right', (angle) => turn(angle), [90]);

    const wheels = { left: 0, right: 0 };
    const setWheels = (speeds) => {
        if (ble.isConnected) return ble.setWheels(speeds);
        Object.assign(wheels, speeds);
        const toRpm = (speed) => RobotSimulator.convertSpeedMStoRPM(speed / P.SPEED_PER_CM / 100);
        setMotors(toRpm(wheels.left), toRpm(wheels.right));
    };
    const selectWheels = (wheel, speed) => {
        choice(wheel, ['left', 'right', 'both'], 'wheel');
        return setWheels(wheel === 'both' ? { left: speed, right: speed } : { [wheel]: speed });
    };
    define('set_gear', (wheel, gear) => selectWheels(wheel, P.gearToSpeed(gear)));
    define('set_speed', (left, right) => setWheels({ left: P.cmToSpeed(left), right: P.cmToSpeed(right) }));
    define('stop', (wheel) => selectWheels(wheel, 0), ['both']);

    define('dance', (n) => ble.isConnected ? ble.dance(n) : simulateTurn(360));
    define('action', (n) => ble.isConnected ? ble.action(n) : simulateTurn(-360));

    /* Sound */

    const playTones = async function (frequencies, duration) {
        if (!Simulator.audioContext || Simulator.audioContext.state === 'closed') {
            Simulator.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const context = Simulator.audioContext;
        if (context.state === 'suspended') context.resume();
        for (const frequency of frequencies) {
            if (Simulator.stop_flag) return;
            const gain = context.createGain();
            gain.gain.value = 0.1;
            gain.connect(context.destination);
            const oscillator = context.createOscillator();
            oscillator.type = 'square';
            oscillator.frequency.value = frequency;
            oscillator.connect(gain);
            oscillator.start();
            oscillator.stop(context.currentTime + duration / 1000);
            await sleep_ms(duration);
        }
    };
    // the sounds of the robot are not in the simulator: short arpeggio, higher with the number
    const playSample = (n) => playTones([262, 330, 392, 523].map((frequency) => frequency * 2 ** ((P.clamp(n, 1, 12) - 1) / 12)), 200);

    define('play_note', (note, duration) => {
        choice(note, Object.keys(P.NOTES), 'note');
        return ble.isConnected ? ble.playNote(note, duration) : playTones([P.NOTES[note]], P.clamp(duration, 1, 10000));
    }, [500]);
    define('play_melody', (n) => ble.isConnected ? ble.playMelody(n) : playSample(n));
    define('play_music', (n) => ble.isConnected ? ble.playMusic(n) : playSample(n));

    /* Eyes of the robot and LED ring of the controller */

    const { setEye, setRingLed, ringLeds } = Simulator.Mosaic.specific;

    const setEyes = (eye, rgb) => {
        choice(eye, Object.keys(P.EYES), 'eye');
        if (ble.isConnected) return ble.setEyes(eye, rgb);
        for (const side of eye === 'both' ? ['left', 'right'] : [eye]) setEye(side, rgb);
    };
    define('set_eyes', (eye, color) => setEyes(eye, P.toRGB(color)));
    define('set_eyes_color', (eye, color, level) => {
        choice(color, Object.keys(P.COLORS), 'color');
        return setEyes(eye, P.toLevel(color, level));
    }, [6]);
    define('eyes_off', () => setEyes('both', [0, 0, 0]));

    const setRingAll = (rgb) => ble.isConnected ? ble.setRingAll(rgb) : ringLeds.forEach((led) => setRingLed(led, rgb));
    // LED 0: all the LEDs
    const setRing = (led, rgb) => {
        led = Math.trunc(Number(led) || 0);
        if (led === 0) return setRingAll(rgb);
        const index = ((led > 0 ? led - 1 : led) % 12 + 12) % 12;
        return ble.isConnected ? ble.setRingLed(index, rgb) : setRingLed(index + 1, rgb);
    };
    define('set_ring', (led, color) => setRing(led, P.toRGB(color)));
    define('set_ring_color', (led, color, level) => {
        choice(color, Object.keys(P.COLORS), 'color');
        return setRing(led, P.toLevel(color, level));
    }, [6]);
    define('set_ring_leds', (colors) => {
        const leds = Array.from({ length: 12 }, (_, i) => P.toRGB(colors[i]));
        if (ble.isConnected) return ble.setRing(leds);
        leds.forEach((rgb, i) => setRingLed(i + 1, rgb));
    });
    define('ring_animation', (name) => {
        choice(name, P.ANIMATIONS, 'animation');
        if (ble.isConnected) return ble.playRingAnimation(name);
        // simulator: rainbow for every animation
        ringLeds.forEach((led) => {
            const channel = (shift) => Math.round(127.5 * (1 + Math.cos(2 * Math.PI * ((led - 1) / 12 - shift / 3))));
            setRingLed(led, [channel(0), channel(1), channel(2)]);
        });
    });
    define('ring_off', () => setRingAll([0, 0, 0]));

    /* Messages */

    const simulatedMessage = () => Simulator.getSliderValue('matatalab-message', '_v');
    define('send_message', (n) => {
        if (ble.isConnected) return ble.sendMessage(n);
        $('#matatalab-sender_value').html(P.clamp(n, 1, 6));
    });
    const getMessage = () => ble.isConnected ? ble.getMessage() : simulatedMessage();
    define('get_message', () => getMessage());
    define('is_message', (n) => ble.isConnected ? ble.getMessage().then((message) => message === n) : simulatedMessage() === n);

    /* Sensors of the controller */

    const slider = (id, suffix = '_v') => Simulator.getSliderValue('matatalab-' + id, suffix);
    const simulatedColor = () => ['_r', '_g', '_b'].map((suffix) => slider('color', suffix));
    const TILT = 30; // °
    const simulatedGestures = {
        shake: () => slider('motion', '_shake') > 20,
        face_up: () => Math.abs(slider('motion', '_roll')) < TILT && Math.abs(slider('motion', '_pitch')) < TILT,
        face_down: () => Math.abs(slider('motion', '_roll')) > 180 - TILT,
        tilt_left: () => slider('motion', '_roll') < -TILT && slider('motion', '_roll') > TILT - 180,
        tilt_right: () => slider('motion', '_roll') > TILT && slider('motion', '_roll') < 180 - TILT,
        tilt_forward: () => slider('motion', '_pitch') < -TILT,
        tilt_backward: () => slider('motion', '_pitch') > TILT,
        fall: () => slider('fall') === 1
    };

    define('is_gesture', (name) => {
        choice(name, P.GESTURES, 'gesture');
        return ble.isConnected ? ble.isGesture(name) : simulatedGestures[name]();
    });
    define('is_color', (name) => {
        choice(name, Object.keys(P.COLORS), 'color');
        return ble.isConnected ? ble.isColor(name) : P.nearestColor(simulatedColor()) === name;
    });
    define('is_button', (name) => {
        choice(name, P.BUTTONS, 'button');
        return ble.isConnected ? ble.isButton(name) : slider('button-' + name) === 1;
    });
    define('is_sound', () => ble.isConnected ? ble.isSound() : slider('sound') === 1);
    define('is_obstacle', () => ble.isConnected ? ble.isObstacle() : slider('obstacle') === 1);
    define('is_light', (state) => {
        choice(state, ['bright', 'dark'], 'state');
        if (ble.isConnected) return ble.isLight(state);
        return state === 'bright' ? slider('light') > 170 : slider('light') < 85;
    });
    define('get_brightness', () => ble.isConnected ? ble.getBrightness() : slider('light'));
    define('get_color', (channel) => {
        choice(channel, Object.keys(P.CHANNELS), 'channel');
        return ble.isConnected ? ble.getColor(channel) : slider('color', '_' + channel[0]);
    });
    define('get_angle', (name) => {
        choice(name, Object.keys(P.ANGLES), 'angle');
        return ble.isConnected ? ble.getAngle(name) : slider('motion', '_' + name);
    });
    define('get_acceleration', (axis) => {
        choice(axis, Object.keys(P.AXES), 'axis');
        return ble.isConnected ? ble.getAcceleration(axis) : slider('acceleration', '_' + axis);
    });
    define('get_shaking', () => ble.isConnected ? ble.getShaking() : slider('motion', '_shake'));

    return matatalab;
};
