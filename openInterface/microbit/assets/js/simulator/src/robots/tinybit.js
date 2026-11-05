// micro:bit - Yahboom Tiny:bit module (block extension), simulation of lib/robot/tinybit.py

const $builtinmodule = function (name) {

    const tinybit = {};
    tinybit.__name__ = new Sk.builtin.str("tinybit");

    const FOLLOW_LINE_KP = 20;
    const FOLLOW_LINE_MAX_SPEED = 100;
    // The simulated music module plays on the buzzer of the robot, whatever the pin (see getBuzzer).
    tinybit.BUZZER = new Sk.builtin.str("pin0");
    let neopixelColors = [[0, 0, 0], [0, 0, 0]];

    const clamp = (value, limit) => Math.max(-limit, Math.min(limit, Math.trunc(value)));
    const speed = (value) => Math.max(0, clamp(value.v, 255));
    const colour = (value) => Sk.ffi.remapToJs(value).map(channel => Math.max(0, clamp(channel, 255)));

    // The robot simulator reads the PWM of the motors (Robots.Tinybit.getMotorSpeed).
    const setMotors = function (left, right, limit = 255) {
        const robot = Robots.Tinybit;
        robot.motorLeft.pwm = clamp(left, limit);
        robot.motorRight.pwm = clamp(right, limit);
        for (const motor of ['motorLeft', 'motorRight']) {
            const mod = Simulator.getModuleByKey('mb-tinybit-' + motor);
            Simulator.setAnimator(mod, mod.id, robot[motor].pwm);
        }
        return new Sk.builtin.none();
    };

    const isOnLine = (side) => Simulator.getSliderValue('mb-tinybit-finder' + side, '_v') === 1 ? 1 : 0;
    const getTrackingState = () => isOnLine('Left') + 2 * isOnLine('Right');

    tinybit.set_motors_speed = new Sk.builtin.func((left, right) => setMotors(left.v, right.v));
    tinybit.set_motor = new Sk.builtin.func(function (motor, direction, value) {
        const pwm = direction.v === 1 ? speed(value) : -speed(value);
        return setMotors(motor.v === 2 ? Robots.Tinybit.motorLeft.pwm : pwm, motor.v === 1 ? Robots.Tinybit.motorRight.pwm : pwm);
    });
    tinybit.go_forward = new Sk.builtin.func((value) => setMotors(speed(value), speed(value)));
    tinybit.go_backward = new Sk.builtin.func((value) => setMotors(-speed(value), -speed(value)));
    tinybit.turn_left = new Sk.builtin.func((value) => setMotors(0, speed(value)));
    tinybit.turn_right = new Sk.builtin.func((value) => setMotors(speed(value), 0));
    tinybit.spin_left = new Sk.builtin.func((value) => setMotors(-speed(value), speed(value)));
    tinybit.spin_right = new Sk.builtin.func((value) => setMotors(speed(value), -speed(value)));
    tinybit.stop = new Sk.builtin.func(() => setMotors(0, 0));

    // The 5% left motor compensation of the physical robot is not simulated.
    tinybit.follow_line = new Sk.builtin.func(function (value) {
        const base = Math.min(FOLLOW_LINE_MAX_SPEED, Math.trunc(value.v));
        if (base <= 0) return setMotors(0, 0);
        const state = getTrackingState();
        if (state === 1) return setMotors(-70, base + FOLLOW_LINE_KP, FOLLOW_LINE_MAX_SPEED);
        if (state === 2) return setMotors(base + FOLLOW_LINE_KP, -70, FOLLOW_LINE_MAX_SPEED);
        return setMotors(base, base, FOLLOW_LINE_MAX_SPEED);
    });

    tinybit.set_headlights = new Sk.builtin.func(function (color) {
        const mod = Simulator.getModuleByKey('mb-tinybit-headlights');
        Simulator.setAnimator(mod, mod.id, colour(color));
        return new Sk.builtin.none();
    });

    tinybit.set_neopixel = new Sk.builtin.func(function (led, color) {
        if (led.v !== 1) neopixelColors[0] = colour(color);
        if (led.v !== 0) neopixelColors[1] = colour(color);
        const mod = Simulator.getModuleByKey('mb-tinybit-neopixel');
        Simulator.setAnimator(mod, mod.id, neopixelColors.map(rgb => [...rgb]));
        return new Sk.builtin.none();
    });

    tinybit.track = new Sk.builtin.func((side) => new Sk.builtin.int_(isOnLine(side.v ? 'Right' : 'Left')));
    tinybit.get_tracking_state = new Sk.builtin.func(() => new Sk.builtin.int_(getTrackingState()));

    tinybit.get_distance = new Sk.builtin.func(function () {
        const duration = Simulator.getSliderValue('mb-tinybit-ultrasonic', '_t');
        return new Sk.builtin.int_(duration > 0 ? Math.round(duration / 58) : -1);
    });

    tinybit.get_sound = new Sk.builtin.func(() => new Sk.builtin.int_(Simulator.getSliderValue('mb-tinybit-sound', '_v')));

    // The key comes from the slider of the module: nothing to wait for.
    tinybit.ir_read = new Sk.builtin.func(() => new Sk.builtin.none());
    tinybit.ir_code = new Sk.builtin.func(() => new Sk.builtin.int_(Simulator.getSliderValue('mb-tinybit-ir', '_v')));

    return tinybit;
};
