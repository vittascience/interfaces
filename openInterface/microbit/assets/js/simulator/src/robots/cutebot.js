// micro:bit - cutebot module

var $builtinmodule = function (name) {

    var cutebot = {};
    cutebot.__name__ = new Sk.builtin.str("cutebot");

    // SONAR UNITS
    cutebot.SONAR_CM = "cm";
    cutebot.SONAR_IN = "inch";

    // MOTOR POSITION
    cutebot.MOTOR_RIGHT = "Right";
    cutebot.MOTOR_LEFT = "Left";

    const setMotor = function (motorSide, speed, direction) {
        $('#mb-cutebot-motor' + motorSide + '_value').html(speed + '%');
        if (direction != 'stop') {
            $('.mb-cutebot-motor' + motorSide).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
        } else {
            $('.mb-cutebot-motor' + motorSide).css('animation', 'none');
        }
    };

    cutebot.set_servo_1_angle = new Sk.builtin.func(function (angle) {
        const mod = Simulator.getModuleByKey('mb-cutebot-servo1');
        Simulator.setAnimator(mod, mod.id, angle.v);
        return new Sk.builtin.none();
    });

    cutebot.set_servo_2_angle = new Sk.builtin.func(function (angle) {
        const mod = Simulator.getModuleByKey('mb-cutebot-servo2');
        Simulator.setAnimator(mod, mod.id, angle.v);
        return new Sk.builtin.none();
    });

    cutebot._set_motor_speed = new Sk.builtin.func(function (motorSide, speed) {
        let direction = (speed.v > 0 ? "forward" : "backward");
        setMotor(motorSide, Math.abs(speed.v), direction);
        return new Sk.builtin.none();
    });

    cutebot.set_motors_speed = new Sk.builtin.func(function (speed_m1, speed_m2) {
        let direction_m1 = (speed_m1.v > 0 ? "forward" : "backward");
        let direction_m2 = (speed_m2.v > 0 ? "forward" : "backward");
        setMotor('Left', Math.abs(speed_m1.v), direction_m1);
        setMotor('Right', Math.abs(speed_m2.v), direction_m2);
        return new Sk.builtin.none();
    });

    cutebot.stop = new Sk.builtin.func(function () {
        setMotor('Left', 0, 'stop');
        setMotor('Right', 0, 'stop');
        return new Sk.builtin.none();
    });

    cutebot.has_right_track = new Sk.builtin.func(function () {
        return new Sk.builtin.bool(Simulator.getSliderValue("mb-cutebot-finderRight", "_v"));
    });

    cutebot.has_left_track = new Sk.builtin.func(function () {
        return new Sk.builtin.bool(Simulator.getSliderValue("mb-cutebot-finderLeft", "_v"));
    });

    cutebot.set_right_rgb_led = new Sk.builtin.func(function (r, g, b) {
        const mod = Simulator.getModuleByKey("mb-cutebot-RightRGBLed");
        Simulator.setAnimator(mod, mod.id, [r.v, g.v, b.v]);
        return new Sk.builtin.none();
    });

    cutebot.set_left_rgb_led = new Sk.builtin.func(function (r, g, b) {
        const mod = Simulator.getModuleByKey("mb-cutebot-LeftRGBLed");
        Simulator.setAnimator(mod, mod.id, [r.v, g.v, b.v]);
        return new Sk.builtin.none();
    });

    return cutebot;
};