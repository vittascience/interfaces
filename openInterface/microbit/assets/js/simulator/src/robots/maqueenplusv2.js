// micro:bit - maqueenplusv2 module

var $builtinmodule = function (name) {

    var maqueenplusv2 = {};
    maqueenplusv2.__name__ = new Sk.builtin.str("maqueenplusv2");

    maqueenplusv2.SERVO_1 = 1;
    maqueenplusv2.SERVO_2 = 2;
    maqueenplusv2.SERVO_3 = 3;

    const setMotor = function (motorSide, speed, direction) {
        if (speed > 255 || speed < 0) return;
        $('#mb-maqueenplus-motor' + motorSide + '_value').html(speed);
        if (direction != 'stop') {
            $('.mb-maqueenplus-motor' + motorSide).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 255 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
        } else {
            $('.mb-maqueenplus-motor' + motorSide).css('animation', 'none');
        }
    };

    maqueenplusv2.init_maqueen = new Sk.builtin.func(() => {
        drive(0); 
        return new Sk.builtin.none(); 
    });

    maqueenplusv2.stop = new Sk.builtin.func(() => {
        setMotor('Left', 0, 'stop');
        setMotor('Right', 0, 'stop');
        return new Sk.builtin.none();
    });

    const drive = function (speed_left, speed_right) {
        const speedLeft = Sk.ffi.remapToJs(speed_left);
        let speedRight = Sk.ffi.remapToJs(speed_right);
        if (typeof speedRight === 'undefined') {
            speedRight = speedLeft;
        }
        setMotor('Left', speedLeft, 'forward');
        setMotor('Right', speedRight, 'forward');
    };
    maqueenplusv2.drive = new Sk.builtin.func(drive);

    const backup = function (speed_left, speed_right) {
        const speedLeft = Sk.ffi.remapToJs(speed_left);
        let speedRight = Sk.ffi.remapToJs(speed_right);
        if (typeof speedRight === 'undefined') {
            speedRight = speedLeft;
        }
        setMotor('Left', speedLeft, 'backward');
        setMotor('Right', speedRight, 'backward');
    };

    maqueenplusv2.backup = new Sk.builtin.func(backup);

    const spinLeft = function (speed_left, speed_right) {
        const speedLeft = Sk.ffi.remapToJs(speed_left);
        let speedRight = Sk.ffi.remapToJs(speed_right);
        if (typeof speedRight === 'undefined') {
            speedRight = speedLeft;
        }
        setMotor('Left', speedLeft, 'backward');
        setMotor('Right', speedRight, 'forward');
    };
    maqueenplusv2.spin_left = new Sk.builtin.func(spinLeft);

    const spinRight = function (speed_left, speed_right) {
        const speedLeft = Sk.ffi.remapToJs(speed_left);
        let speedRight = Sk.ffi.remapToJs(speed_right);
        if (typeof speedRight === 'undefined') {
            speedRight = speedLeft;
        }
        setMotor('Left', speedLeft, 'forward');
        setMotor('Right', speedRight, 'backward');
    };
    maqueenplusv2.spin_right = new Sk.builtin.func(spinRight);

    const motorControlLeft = function (speed, direction) {
        const speedArg = Sk.ffi.remapToJs(speed);
        const directionArg = Sk.ffi.remapToJs(direction);
        setMotor('Left', speedArg, (directionArg === 0 ? 'forward' : 'backward'));
    };
    maqueenplusv2.motorControlLeft = new Sk.builtin.func(motorControlLeft);

    const motorControlRight = function (speed, direction) {
        const speedArg = Sk.ffi.remapToJs(speed);
        const directionArg = Sk.ffi.remapToJs(direction);
        setMotor('Right', speedArg, (directionArg === 0 ? 'forward' : 'backward'));
    };
    maqueenplusv2.motorControlRight = new Sk.builtin.func(motorControlRight);

    maqueenplusv2.set_servo_angle = new Sk.builtin.func(function (servo, angle) {
        const mod = Simulator.getModuleByKey(`mb-maqueenplus-v2-servo-p${servo.name}`);
        Simulator.setAnimator(mod, mod.id, angle.v);
        return new Sk.builtin.none();
    });

    maqueenplusv2.sensor_on_line = new Sk.builtin.func((sensor) => {
        switch (Sk.ffi.remapToJs(sensor)) {
            case 0:
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderLeftRear", "_v"));
            case 1:
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderLeft", "_v"));
            case 2:
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderMiddle", "_v"));
            case 3:
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderRight", "_v"));
            case 4:
                return new Sk.builtin.bool(Simulator.getSliderValue("mb-maqueenplus-finderRightRear", "_v"));
        }
    });

    maqueenplusv2.headlights = new Sk.builtin.func(function (select, state) {
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

    return maqueenplusv2;
};