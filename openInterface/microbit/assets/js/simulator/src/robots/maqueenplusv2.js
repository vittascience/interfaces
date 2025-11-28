// micro:bit - maqueenplusv2 module

var $builtinmodule = function (name) {

    var maqueenplusv2 = {};
    maqueenplusv2.__name__ = new Sk.builtin.str("maqueenplusv2");

    maqueenplusv2.I2C_ADDR = new Sk.builtin.int_(0X10);

    maqueenplusv2.VERSION_COUNT_I2C_ADDR = new Sk.builtin.int_(0x32);
    maqueenplusv2.VERSION_DATA_I2C_ADDR = new Sk.builtin.int_(0x33);

    maqueenplusv2.LEFT_MOTOR_I2C_ADDR = new Sk.builtin.int_(0x00);
    maqueenplusv2.RIGHT_MOTOR_I2C_ADDR = new Sk.builtin.int_(0x02);

    maqueenplusv2.FORWARD = new Sk.builtin.int_(0);
    maqueenplusv2.BACKWARD = new Sk.builtin.int_(1);

    maqueenplusv2.LINE_SENSOR_I2C_ADDR = new Sk.builtin.int_(0x1D)
    maqueenplusv2.ANALOG_L2_I2C_ADDR = new Sk.builtin.int_(0x26)
    maqueenplusv2.ANALOG_L1_I2C_ADDR = new Sk.builtin.int_(0x24)
    maqueenplusv2.ANALOG_M_I2C_ADDR = new Sk.builtin.int_(0x22)
    maqueenplusv2.ANALOG_R1_I2C_ADDR = new Sk.builtin.int_(0x20)
    maqueenplusv2.ANALOG_R2_I2C_ADDR = new Sk.builtin.int_(0x1E)

    const setMotor = function (motorSide, speed, direction) {
        if (speed > 255 || speed < 0) return;
        $('#mb-maqueenplus-motor' + motorSide + '_value').html(speed);
        if (direction != 'stop') {
            const rps = 60 / (speed / 255 * RobotSimulator.robot.MAX_SPEED);
            $('.mb-maqueenplus-motor' + motorSide).css('animation', 'rotation-' + direction + ' ' + rps + 's infinite linear');
        } else {
            $('.mb-maqueenplus-motor' + motorSide).css('animation', 'none');
        }
    };

    RobotSimulator.robot.setMotorsInModules = function (speedL, speedR) {
        const dir = (speed) => speed == 0 ? 'stop' : (speed > 0 ? 'forward' : 'backward');
        setMotor('Left', Math.abs(speedL), dir(speedL));
        setMotor('Right', Math.abs(speedR), dir(speedR));
    };

    maqueenplusv2.initRobot = new Sk.builtin.func(() => {
        maqueenplusv2.stop.func_code();
        const version = maqueenplusv2.readVersion.func_code().v;
        Sk.builtins.print.tp$call(["Maqueen Plus version: " + version]);
        return new Sk.builtin.none();
    });

    maqueenplusv2.stop = new Sk.builtin.func(() => {
        setMotor('Left', 0, 'stop');
        setMotor('Right', 0, 'stop');
        return new Sk.builtin.none();
    });

    drive = function (speed_left, speed_right) {
        const speedLeft = Sk.ffi.remapToJs(speed_left);
        let speedRight = Sk.ffi.remapToJs(speed_right);
        if (speedRight == null) {
            speedRight = speedLeft;
        }
        setMotor('Left', speedLeft, 'forward');
        setMotor('Right', speedRight, 'forward');
        return Sk.builtin.none();
    };
    drive.co_varnames = ['speed_left', 'speed_right'];
    drive.$defaults = [Sk.builtin.none()];
    maqueenplusv2.drive = new Sk.builtin.func(drive);

    backup = function (speed_left, speed_right) {
        const speedLeft = Sk.ffi.remapToJs(speed_left);
        let speedRight = Sk.ffi.remapToJs(speed_right);
        if (speedRight == null) {
            speedRight = speedLeft;
        }
        setMotor('Left', speedLeft, 'backward');
        setMotor('Right', speedRight, 'backward');
        return Sk.builtin.none();
    };
    backup.co_varnames = ['speed_left', 'speed_right'];
    backup.$defaults = [Sk.builtin.none()];
    maqueenplusv2.backup = new Sk.builtin.func(backup);

    spin_left = function (speed_left, speed_right) {
        const speedLeft = Sk.ffi.remapToJs(speed_left);
        let speedRight = Sk.ffi.remapToJs(speed_right);
        if (speedRight == null) {
            speedRight = speedLeft;
        }
        setMotor('Left', speedLeft, 'backward');
        setMotor('Right', speedRight, 'forward');
    };
    spin_left.co_varnames = ['speed_left', 'speed_right'];
    spin_left.$defaults = [Sk.builtin.none()];
    maqueenplusv2.spin_left = new Sk.builtin.func(spin_left);

    spin_right = function (speed_left, speed_right) {
        const speedLeft = Sk.ffi.remapToJs(speed_left);
        let speedRight = Sk.ffi.remapToJs(speed_right);
        if (speedRight === null) {
            speedRight = speedLeft;
        }
        setMotor('Left', speedLeft, 'forward');
        setMotor('Right', speedRight, 'backward');
    };
    spin_right.co_varnames = ['speed_left', 'speed_right'];
    spin_right.$defaults = [Sk.builtin.none()];
    maqueenplusv2.spin_right = new Sk.builtin.func(spin_right);

    maqueenplusv2.motorControlLeft = new Sk.builtin.func(function (dir, spd) {
        setMotor('Left', spd.v, (dir === maqueenplusv2.FORWARD ? 'forward' : 'backward'));
    });

    maqueenplusv2.motorControlRight = new Sk.builtin.func(function (dir, spd) {
        setMotor('Right', spd.v, (dir === maqueenplusv2.FORWARD ? 'forward' : 'backward'));
    });

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

    maqueenplusv2.readVersion = new Sk.builtin.func(function () {
        return new Sk.builtin.str(RobotSimulator.robot.VERSION);
    });

    return maqueenplusv2;
};