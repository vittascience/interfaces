// PrimaSTEM module

const $builtinmodule = function () {

    const primastem = {};
    primastem.__name__ = new Sk.builtin.str("primastem");

    var SPEED = 25; // %

    // Attend une durée fixe puis relance le script — utilisé uniquement en mode SIMULATEUR
    // (là où il n'y a pas de robot réel pour renvoyer un ack).
    const delayAndPlay = function (timeout) {
        return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
            await sleep_ms(timeout);
            Simulator.play();
            return resolve(Sk.builtin.none());
        }));
    };

    // Attend le VRAI ack du robot (la Promise renvoyée par PrimaStemWebBLEAPI ne se
    // résout que lorsque le robot repasse à l'état "free", avec un watchdog de sécurité
    // côté bleAPI.js en cas de perte de notification) avant de relancer le script.
    const waitBleAckAndPlay = function (blePromise) {
        return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
            await blePromise;
            Simulator.play();
            return resolve(Sk.builtin.none());
        }));
    };

    const setMotor = function (motor, speed, direction) {
        Simulator.Mosaic.specific.isRunning = true;
        $('#primastem-motor' + motor + '_value').html(speed);
        if (direction !== 'stop') {
            $('.primastem-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
        } else {
            $('.primastem-motor' + motor).css('animation', 'none');
        }
    };

    const getDirection = (speed) =>
        speed > 0 ? 'forward' :
            speed < 0 ? 'backward' :
                'stop';

    const setMotors = function (speed_L, speed_R) {
        setMotor('Left', Math.abs(speed_L), getDirection(speed_L));
        setMotor('Right', Math.abs(speed_R), getDirection(speed_R));
        if (speed_L == 0 && speed_R == 0) {
            Simulator.Mosaic.specific.isRunning = false;
        }
    };
    RobotSimulator.robot.setMotorsInModules = setMotors;

    const move = function (distance, speed) {
        const rpm = speed / 100 * RobotSimulator.robot.MAX_SPEED;
        const movementDuration = (Math.abs(distance) * 1e-2) / RobotSimulator.convertRPMtoSpeedMS(rpm);
        const startPosition = Object.assign({}, RobotSimulator.robot.rotationCenter);
        speed = distance > 0 ? speed : -speed;
        setMotors(speed, speed);
        return RobotSimulator.delayOnMovement(movementDuration * 1000, () => {
            RobotSimulator.robot.rotationCenter = RobotSimulator.getPositionByDistance(startPosition, distance);
        }, true, 1000);
    };

    const moveForward = function (distance = 150) {
        const _distance = Sk.ffi.remapToJs(distance);
        if (PrimaStemWebBLEAPI.isConnected) {
            return waitBleAckAndPlay(PrimaStemWebBLEAPI.forward(_distance));
        } else {
            return move(_distance / 10, SPEED);
        }
    };
    primastem.moveForward = new Sk.builtin.func(moveForward);

    const moveBackward = function (distance = 150) {
        const _distance = Sk.ffi.remapToJs(distance);
        if (PrimaStemWebBLEAPI.isConnected) {
            return waitBleAckAndPlay(PrimaStemWebBLEAPI.backward(_distance));
        } else {
            return move(-_distance / 10, SPEED);
        }
    };
    primastem.moveBackward = new Sk.builtin.func(moveBackward);

    const turn = function (angle, speed) {
        const rpm = speed / 100 * RobotSimulator.robot.MAX_SPEED;
        const angularDistance = RobotSimulator.robot.WHEELS_CENTER_RADIUS * 1e-2 * degToRad(Math.abs(angle));
        const movementDuration = angularDistance / RobotSimulator.convertRPMtoSpeedMS(rpm);
        const startAngle = RobotSimulator.robot.angle;
        return RobotSimulator.delayOnMovement(movementDuration * 1000, () => {
            RobotSimulator.robot.angle = startAngle + angle;
        }, true);
    };

    const turnLeft = function (angle = 90) {
        const _angle = parseInt(Sk.ffi.remapToJs(angle), 10);
        if (PrimaStemWebBLEAPI.isConnected) {
            return waitBleAckAndPlay(PrimaStemWebBLEAPI.turnLeft(_angle));
        } else {
            if (Simulator.Mosaic.specific.isRunning) return;
            setMotors(-SPEED, SPEED);
            return turn(-_angle, SPEED);
        }
    };
    primastem.turnLeft = new Sk.builtin.func(turnLeft);

    const turnRight = function (angle = 90) {
        const _angle = parseInt(Sk.ffi.remapToJs(angle), 10);
        if (PrimaStemWebBLEAPI.isConnected) {
            return waitBleAckAndPlay(PrimaStemWebBLEAPI.turnRight(_angle));
        } else {
            if (Simulator.Mosaic.specific.isRunning) return;
            setMotors(SPEED, -SPEED);
            return turn(_angle, SPEED);
        }
    };
    primastem.turnRight = new Sk.builtin.func(turnRight);

    primastem.stop = new Sk.builtin.func(function () {
        if (PrimaStemWebBLEAPI.isConnected) {
            PrimaStemWebBLEAPI.stop();
        }
        setMotors(0, 0);
        Simulator.Mosaic.specific.isRunning = false;
    });

    primastem.setLed = new Sk.builtin.func(function (led, color) {
        const _led = Sk.ffi.remapToJs(led);
        const _color = Sk.ffi.remapToJs(color);
        const colors = {
            'red': [255, 0, 0],
            'green': [0, 255, 0],
            'blue': [0, 0, 255]
        };
        if (PrimaStemWebBLEAPI.isConnected) {
            return waitBleAckAndPlay(PrimaStemWebBLEAPI.setLed(_led, _color));
        } else {
            switch (_led) {
                case 'l':
                    const modL = Simulator.getModuleByKey("primastem-left-led");
                    Simulator.setAnimator(modL, modL.id, colors[_color]);
                    break;
                case 'r':
                    const modR = Simulator.getModuleByKey("primastem-right-led");
                    Simulator.setAnimator(modR, modR.id, colors[_color]);
                    break;
                case 'b':
                    const modL2 = Simulator.getModuleByKey("primastem-left-led");
                    Simulator.setAnimator(modL2, modL2.id, colors[_color]);
                    const modR2 = Simulator.getModuleByKey("primastem-right-led");
                    Simulator.setAnimator(modR2, modR2.id, colors[_color]);
                    break;
            }
            return Sk.builtin.none();
        }
    });

    primastem.playSound = new Sk.builtin.func(function (sound) {
        const _sound = Sk.ffi.remapToJs(sound);
        if (PrimaStemWebBLEAPI.isConnected) {
            return waitBleAckAndPlay(PrimaStemWebBLEAPI.playSound(_sound));
        } else {
            return Sk.builtin.none();
        }
    });

    return primastem;
};