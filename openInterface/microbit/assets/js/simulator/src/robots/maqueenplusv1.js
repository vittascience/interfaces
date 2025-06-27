// micro:bit - maqueenplusv1 module

var $builtinmodule = function (name) {

    var maqueenplusv1 = {};
    maqueenplusv1.__name__ = new Sk.builtin.str("maqueenplusv1");

    maqueenplusv1.S1 = 1;
    maqueenplusv1.S2 = 2;
    maqueenplusv1.S3 = 3;

    maqueenplusv1.MT_R = 'Right';
    maqueenplusv1.MT_L = 'Left';

    const setMotor = function (motorSide, speed, direction) {
        if (speed > 255 || speed < 0) return;
        $('#mb-maqueenplus-motor' + motorSide + '_value').html(speed);
        if (direction != 'stop') {
            $('.mb-maqueenplus-motor' + motorSide).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 255 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
        } else {
            $('.mb-maqueenplus-motor' + motorSide).css('animation', 'none');
        }
    };

    maqueenplusv1.sensor_on_line = new Sk.builtin.func((sensor) => {
        switch (Sk.ffi.remapToJs(sensor)) {
            case "L1":
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderLeftRear", "_v"));
            case "L2":
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderLeft", "_v"));
            case "L3":
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderMiddleLeft", "_v"));
            case "R1":
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderRightRear", "_v"));
            case "R2":
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderRight", "_v"));
            case "R3":
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderMiddleRight", "_v"));
        }
    });

    maqueenplusv1.stop = new Sk.builtin.func(() => {
        setMotor('Left', 0, 'stop');
        setMotor('Right', 0, 'stop');
        return new Sk.builtin.none();
    });

    const move = function (direction, speed) {
        const motor_speed = Sk.ffi.remapToJs(speed);
        switch (Sk.ffi.remapToJs(direction)) {
            case "F":
                setMotor('Left', motor_speed, 'forward');
                setMotor('Right', motor_speed, 'forward');
                break;
            case "B":
                setMotor('Left', motor_speed, 'backward');
                setMotor('Right', motor_speed, 'backward');
                break;
            case "L":
                setMotor('Left', motor_speed, 'forward');
                break;
            case "R":
                setMotor('Right', motor_speed, 'forward');
                break;
            case "RR":
                setMotor('Right', motor_speed, 'backward');
                setMotor('Left', motor_speed, 'forward');
                break;
            case "RL":
                setMotor('Left', motor_speed, 'backward');
                setMotor('Right', motor_speed, 'forward');
                break;
        }
    };
    maqueenplusv1.move = new Sk.builtin.func(move);

    const motorControl = function (motor, direction, speed) {
        const motorArg = Sk.ffi.remapToJs(motor);
        const speedArg = Sk.ffi.remapToJs(speed);
        const directionArg = Sk.ffi.remapToJs(direction);
        setMotor(motorArg, speedArg, (directionArg === 1 ? 'forward' : 'backward'));
    };
    maqueenplusv1.motorControl = new Sk.builtin.func(motorControl);

    maqueenplusv1.set_servo_angle = new Sk.builtin.func(function (servo, angle) {
        const mod = Simulator.getModuleByKey(`mb-maqueenplus-v1-servo${Sk.ffi.remapToJs(servo)}`);
        Simulator.setAnimator(mod, mod.id, angle.v);
        return new Sk.builtin.none();
    });

    maqueenplusv1.headlights = new Sk.builtin.func(function (select, state) {
        const ledOption = Sk.ffi.remapToJs(select);
        let mod = Simulator.getModuleByKey("mb-maqueenplus-rightLed");
        let modules = null;
        if (ledOption === 0) {
            mod = Simulator.getModuleByKey("mb-maqueenplus-leftLed");
        } else if (ledOption === -1) {
            modules = [Simulator.getModuleByKey("mb-maqueenplus-rightLed"), Simulator.getModuleByKey("mb-maqueenplus-leftLed")];
        }
        if (Sk.ffi.remapToJs(state)) {
            if (modules !== null) {
                Simulator.setAnimator(modules[0], modules[0].id, [255, 0, 0]);
                Simulator.setAnimator(modules[1], modules[1].id, [255, 0, 0]);
            } else {
                Simulator.setAnimator(mod, mod.id, [255, 0, 0]);
            }
        } else {
            if (modules !== null) {
                Simulator.setAnimator(modules[0], modules[0].id, [75, 75, 75]);
                Simulator.setAnimator(modules[1], modules[1].id, [75, 75, 75]);
            } else {
                Simulator.setAnimator(mod, mod.id, [75, 75, 75]);
            }
        }
        return new Sk.builtin.none();
    });

    return maqueenplusv1;
};