// micro:bit - maqueenplusv3 module

function $builtinmodule(name) {
    const maqueenplusv3 = {};
    var modules = Object.create(null);
    return Sk.misceval.chain(
        Sk.importModule("maqueenplusv2", false, true),
        (maqueenplusv2) => {
            modules.maqueenplusv2 = maqueenplusv2.$d;
        },
        () => maqueenplusv3_mod(maqueenplusv3, modules)
    );
};

function maqueenplusv3_mod(maqueenplusv3, modules) {

    const maqueenplusv2 = modules.maqueenplusv2;
    maqueenplusv3.__name__ = new Sk.builtin.str("maqueenplusv3");

    maqueenplusv3.I2C_ADDR = maqueenplusv2.I2C_ADDR;

    maqueenplusv3.FORWARD = maqueenplusv2.FORWARD;
    maqueenplusv3.BACKWARD = maqueenplusv2.BACKWARD;

    maqueenplusv3.LEFT = new Sk.builtin.int_(1);
    maqueenplusv3.RIGHT = new Sk.builtin.int_(2);
    maqueenplusv3.BOTH = new Sk.builtin.int_(3);

    maqueenplusv3.COLOR = new Sk.builtin.dict([
        'RED', 1,
        'GREEN', 2,
        'YELLOW', 3,
        'BLUE', 4,
        'PURPLE', 5,
        'CYAN', 6,
        'WHITE', 7,
        'BLACK', 0
    ].map(value => Sk.ffi.remapToPy(value)));

    maqueenplusv3.RUN = new Sk.builtin.dict([
        'LEFT', 1,
        'RIGHT', 2,
        'STRAIGHT', 3,
        'STOP', 4
    ].map(value => Sk.ffi.remapToPy(value)));

    maqueenplusv3.INTERSECTION = new Sk.builtin.dict([
        'CROSSROADS', 1,
        'T_JUNCTION', 2,
        'LEFT', 3,
        'RIGHT', 4
    ].map(value => Sk.ffi.remapToPy(value)));

    maqueenplusv3.PID_DIR = new Sk.builtin.dict([
        'FORWARD', 1,
        'BACKWARD', 2,
        'RIGHT', 1,
        'LEFT', 2
    ].map(value => Sk.ffi.remapToPy(value)));

    maqueenplusv3.CM_PER_SEC = new Sk.builtin.str('cm_s');
    maqueenplusv3.INCH_PER_SEC = new Sk.builtin.str('inch_s');

    maqueenplusv3.initRobot = new Sk.builtin.func(function () {
        return maqueenplusv2.initRobot.func_code();
    });

    maqueenplusv3.readVersion = new Sk.builtin.func(function () {
        return maqueenplusv2.readVersion.func_code();
    });

    maqueenplusv3.motorControlLeft = new Sk.builtin.func(function (dir, spd) {
        return maqueenplusv2.motorControlLeft.tp$call([dir, spd]);
    });

    maqueenplusv3.motorControlRight = new Sk.builtin.func(function (dir, spd) {
        return maqueenplusv2.motorControlRight.tp$call([dir, spd]);
    });

    maqueenplusv3.stop = new Sk.builtin.func(function () {
        return maqueenplusv2.stop.func_code();
    });

    drive = function (speed_left, speed_right) {
        return maqueenplusv2.drive.tp$call([speed_left, speed_right]);
    };
    drive.co_varnames = ['speed_left', 'speed_right'];
    drive.$defaults = [Sk.builtin.none()];
    maqueenplusv3.drive = new Sk.builtin.func(drive);

    backup = function (speed_left, speed_right) {
        return maqueenplusv2.backup.tp$call([speed_left, speed_right]);
    };
    backup.co_varnames = ['speed_left', 'speed_right'];
    backup.$defaults = [Sk.builtin.none()];
    maqueenplusv3.backup = new Sk.builtin.func(backup);

    spin_left = function (speed_left, speed_right) {
        return maqueenplusv2.spin_left.tp$call([speed_left, speed_right]);
    };
    spin_left.co_varnames = ['speed_left', 'speed_right'];
    spin_left.$defaults = [Sk.builtin.none()];
    maqueenplusv3.spin_left = new Sk.builtin.func(spin_left);

    spin_right = function (speed_left, speed_right) {
        return maqueenplusv2.spin_right.tp$call([speed_left, speed_right]);
    };
    spin_right.co_varnames = ['speed_left', 'speed_right'];
    spin_right.$defaults = [Sk.builtin.none()];
    maqueenplusv3.spin_right = new Sk.builtin.func(spin_right);

    maqueenplusv3.read_all_line_sensors = new Sk.builtin.func(function () {
        return maqueenplusv2.read_all_line_sensors.func_code();
    });

    maqueenplusv3.read_line_sensor = new Sk.builtin.func(function (sensor) {
        return maqueenplusv2.read_line_sensor.tp$call([sensor]);
    });

    maqueenplusv3.sensor_on_line = new Sk.builtin.func(function (sensor) {
        return maqueenplusv2.sensor_on_line.tp$call([sensor]);
    });

    maqueenplusv3.set_servo_angle = new Sk.builtin.func(function (pin, angle) {
        return maqueenplusv2.set_servo_angle.tp$call([pin, angle]);
    });

    maqueenplusv3.setPatrolSpeed = new Sk.builtin.func(function (speed) {
        RobotSimulator.robot.patrolSpeed = speed.v;
        return Sk.builtin.none();
    });

    maqueenplusv3.setIntersectionRunMode = new Sk.builtin.func(function (mode) {
        RobotSimulator.robot.runMode['CROSSROADS'] = mode.v;
        return Sk.builtin.none();
    });

    maqueenplusv3.setTjunctionRunMode = new Sk.builtin.func(function (mode) {
        RobotSimulator.robot.runMode['T_JUNCTION'] = mode.v;
        return Sk.builtin.none();
    });

    maqueenplusv3.setLeftOrStraightRunMode = new Sk.builtin.func(function (mode) {
        RobotSimulator.robot.runMode['LEFT'] = mode.v;
        return Sk.builtin.none();
    });

    maqueenplusv3.setRightOrStraightRunMode = new Sk.builtin.func(function (mode) {
        RobotSimulator.robot.runMode['RIGHT'] = mode.v;
        return Sk.builtin.none();
    });

    runDistance = function (direction, distance, unit, wait) {
        maqueenplusv3.drive.func_code(0);
        if (unit.v == 'inch') {
            distance.v *= 2.54;
        }
        const speed_m_s = 0.14; // speed = 2 in library ≈ 14 cm/s
        const movementDuration = (distance.v * 1e-2) / speed_m_s;
        const startPosition = Object.assign({}, RobotSimulator.robot.rotationCenter);
        const pwm = parseInt(RobotSimulator.convertSpeedMStoRPM(speed_m_s) / RobotSimulator.robot.MAX_SPEED * 255);
        if (direction == maqueenplusv3.PID_DIR.entries.FORWARD[1]) {
            maqueenplusv3.drive.func_code(pwm);
        } else if (direction == maqueenplusv3.PID_DIR.entries.BACKWARD[1]) {
            maqueenplusv3.backup.func_code(pwm);
        }
        return RobotSimulator.delayOnMovement(Math.abs(movementDuration * 1000), () => {
            RobotSimulator.robot.rotationCenter = RobotSimulator.getPositionByDistance(startPosition, distance.v);
        }, wait.v);
    };

    runDistance.co_varnames = ['direction', 'distance', 'unit', 'wait'];
    runDistance.$defaults = [new Sk.builtin.str('cm'), new Sk.builtin.bool(true)];

    CBP_turnWithAngle = function (direction, angle, wait) {
        const dirLeft = maqueenplusv3.PID_DIR.entries.LEFT[1];
        const dirRight = maqueenplusv3.PID_DIR.entries.RIGHT[1]
        angle = angle.v;
        if (direction == dirRight) {
            if (angle < 0) {
                direction = dirLeft;
                angle = -angle;
            }
        } else if (direction == dirLeft) {
            if (angle < 0) {
                direction = dirRight;
                angle = -angle
            }
        }
        const speed_m_s = 0.14; // speed = 2 in library ≈ 14 cm/s
        const pwm = parseInt(RobotSimulator.convertSpeedMStoRPM(speed_m_s) / RobotSimulator.robot.MAX_SPEED * 255);
        if (direction == dirLeft) {
            maqueenplusv3.motorControlLeft.tp$call([maqueenplusv3.BACKWARD, new Sk.builtin.int_(pwm)]);
            maqueenplusv3.motorControlRight.tp$call([maqueenplusv3.FORWARD, new Sk.builtin.int_(pwm)]);
        } else if (direction == dirRight) {
            maqueenplusv3.motorControlLeft.tp$call([maqueenplusv3.FORWARD, new Sk.builtin.int_(pwm)]);
            maqueenplusv3.motorControlRight.tp$call([maqueenplusv3.BACKWARD, new Sk.builtin.int_(pwm)]);
        }
        const rotationCenterDistance = RobotSimulator.robot.WHEELS_CENTER_RADIUS;
        const movementDuration = rotationCenterDistance * 1e-2 * degToRad(Math.abs(angle)) / speed_m_s;
        const startAngle = RobotSimulator.robot.angle;
        const endAngle = startAngle + (direction == dirLeft ? -angle : angle);
        return RobotSimulator.delayOnMovement(Math.abs(movementDuration * 1000), () => {
            RobotSimulator.robot.angle = endAngle;
        }, wait.v);
    };

    CBP_turnWithAngle.co_varnames = ['direction', 'angle', 'wait'];
    CBP_turnWithAngle.$defaults = [new Sk.builtin.bool(true)];

    maqueenplusv3.turnWithAngle = new Sk.builtin.func(CBP_turnWithAngle);

    maqueenplusv3.runDistance = new Sk.builtin.func(runDistance);

    readRealTimeSpeed = function (motor, unit) {
        let speed = 0;
        if (motor.v == 'LEFT' || motor == maqueenplusv3.LEFT) {
            speed = parseInt(($("#mb-maqueenplus-motorLeft_value").html() || "0"));
        } else if (motor.v == 'RIGHT' || motor == maqueenplusv3.RIGHT) {
            speed = parseInt(($("#mb-maqueenplus-motorRight_value").html() || "0"));
        }
        const rpm = speed / 255 * RobotSimulator.robot.MAX_SPEED;
        speed = RobotSimulator.convertRPMtoSpeedMS(rpm) * 100; // cm.s-1
        if (unit.v == maqueenplusv3.INCH_PER_SEC.v) {
            speed /= 2.54;
        }
        return new Sk.builtin.float_(roundFloat(speed, 1));
    };
    readRealTimeSpeed.co_varnames = ['type', 'unit'];
    readRealTimeSpeed.$defaults = [maqueenplusv3.CM_PER_SEC];
    maqueenplusv3.readRealTimeSpeed = new Sk.builtin.func(readRealTimeSpeed);

    const setColorRGB = (i, index) => {
        const colors = maqueenplusv3.COLOR.entries;
        let color = [0, 0, 0];
        switch (index) {
            case colors.RED[1]:
                color = [255, 0, 0];
                break;
            case colors.GREEN[1]:
                color = [0, 255, 0];
                break;
            case colors.YELLOW[1]:
                color = [255, 255, 0];
                break;
            case colors.BLUE[1]:
                color = [0, 0, 255];
                break;
            case colors.PURPLE[1]:
                color = [128, 0, 128];
                break;
            case colors.CYAN[1]:
                color = [0, 255, 255];
                break;
            case colors.WHITE[1]:
                color = [225, 225, 225];
                break;
            case maqueenplusv3.COLOR['BLACK']:
            default:
                color = [0, 0, 0];
        }
        const mod = Simulator.getModuleByKey("mb-maqueenplus-v3-rgbled-" + i);
        Simulator.setAnimator(mod, mod.id, color);
    };

    maqueenplusv3.setRGBLed = new Sk.builtin.func(function (led, rgb) {
        if (led.v == 'LEFT' || led == maqueenplusv3.LEFT) {
            setColorRGB('left', rgb);
        } else if (led.v == 'RIGHT' || led == maqueenplusv3.RIGHT) {
            setColorRGB('right', rgb);
        } else if (led.v == 'BOTH' || led == maqueenplusv3.BOTH) {
            setColorRGB('left', rgb);
            setColorRGB('right', rgb);
        }
        return new Sk.builtin.none();
    });

    console.log(maqueenplusv3)
    return maqueenplusv3;
}