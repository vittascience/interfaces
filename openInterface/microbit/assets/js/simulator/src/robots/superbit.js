// micro:bit - superbit module

var $builtinmodule = function (name) {

    var superbit = {};
    superbit.__name__ = new Sk.builtin.str("superbit");

    superbit.S1 = new Sk.builtin.int_(1);
    superbit.S2 = new Sk.builtin.int_(2);
    superbit.S3 = new Sk.builtin.int_(3);
    superbit.S4 = new Sk.builtin.int_(4);
    superbit.S5 = new Sk.builtin.int_(5);
    superbit.S6 = new Sk.builtin.int_(6);
    superbit.S7 = new Sk.builtin.int_(7);
    superbit.S8 = new Sk.builtin.int_(8);

    superbit.M1 = new Sk.builtin.int_(1);
    superbit.M2 = new Sk.builtin.int_(2);
    superbit.M3 = new Sk.builtin.int_(3);
    superbit.M4 = new Sk.builtin.int_(4);

    superbit.B1 = new Sk.builtin.int_(1);
    superbit.B2 = new Sk.builtin.int_(2);

    function map_value(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    };

    const setServoAngle = function (servo, angle, servoType) {
        const mod = Simulator.getModuleByKey('mb-superbit-servo' + servo);
        $('#mb-superbit-servo' + servo + '_anim').css('animation', 'rotation-forward 0s');
        Simulator.setAnimator(mod, mod.id, Math.round(angle));
    };

    superbit.servo180 = new Sk.builtin.func(function (servo, angle) {
        setServoAngle(servo.v, angle.v, "180");
        return new Sk.builtin.none();
    });

    superbit.servo270 = new Sk.builtin.func(function (servo, angle) {
        setServoAngle(servo.v, angle.v, "270");
        return new Sk.builtin.none();
    });

    superbit.servo360 = new Sk.builtin.func(function (servo, angle) {
        setServoAngle(servo.v, angle.v, "360");
        return new Sk.builtin.none();
    });

    const setMotor = function (motor, speed, direction) {
        const RPM = 100;
        $('#mb-superbit-motor' + motor + '_value').html(speed);
        if (speed != 0) {
            $('.mb-superbit-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RPM)) + 's infinite linear');
        } else {
            $('.mb-superbit-motor' + motor).css('animation', 'none');
        }
    };

    superbit.motor_control = new Sk.builtin.func(function (motor, speed, value) {
        const direction = (speed.v > 0 ? "forward" : "backward");
        setMotor(motor.v, Math.abs(speed.v), direction);
        return new Sk.builtin.none();
    });

    const setStepperMotor = function (motor, position) {
        $('#mb-superbit-stepper-motor' + motor + '_value').html(position);
        // if (direction != 'stop') {
        //     $('.mb-superbit-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
        // } else {
        //     $('.mb-superbit-motor' + motor).css('animation', 'none');
        // }
    };

    superbit.stepper_control = new Sk.builtin.func(function (motor, position) {
        setStepperMotor(motor.v, Math.round(position.v));
        return new Sk.builtin.none();
    });

    return superbit;
}