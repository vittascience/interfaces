// TTS module for Blue-bot

const $builtinmodule = function () {

    const tts = {};

    tts.bluebot = new Sk.misceval.buildClass(tts, function ($gbl, $loc) {

        $loc.__init__ = new Sk.builtin.func(function (self) {
            self.SPEED = 25; // %
            self.DISTANCE = 15; // cm
        });

        const delayAndPlay = function (timeout) {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await sleep_ms(timeout);
                Simulator.play();
                return resolve(Sk.builtin.none());
            }));
        };

        const setMotor = function (motor, speed, direction) {
            Simulator.Mosaic.specific.isRunning = true;
            $('#bluebot-motor' + motor + '_value').html(speed);
            if (direction !== 'stop') {
                $('.bluebot-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
            } else {
                $('.bluebot-motor' + motor).css('animation', 'none');
            }
        };

        const setMotors = function (speed_L, speed_R) {
            setMotor('Left', Math.abs(speed_L), speed_L > 0 ? 'forward' : 'backward');
            setMotor('Right', Math.abs(speed_R), speed_R > 0 ? 'forward' : 'backward');
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

        const moveForward = function (self) {
            if (BluebotWebBLEAPI.isConnected) {
                BluebotWebBLEAPI.moveForward();
                return delayAndPlay(3000);
            } else {
                return move(self.DISTANCE, self.SPEED);
            }
        };
        $loc.moveForward = new Sk.builtin.func(moveForward);

        const moveBackward = function (self) {
            if (BluebotWebBLEAPI.isConnected) {
                BluebotWebBLEAPI.moveBackward();
                return delayAndPlay(3000);
            } else {
                return move(-self.DISTANCE, self.SPEED);
            }
        };
        $loc.moveBackward = new Sk.builtin.func(moveBackward);

        const turn = function (angle, speed) {
            const rpm = speed / 100 * RobotSimulator.robot.MAX_SPEED;
            const angularDistance = RobotSimulator.robot.WHEELS_CENTER_RADIUS * 1e-2 * degToRad(Math.abs(angle));
            const movementDuration = angularDistance / RobotSimulator.convertRPMtoSpeedMS(rpm);
            const startAngle = RobotSimulator.robot.angle;
            return RobotSimulator.delayOnMovement(movementDuration * 1000, () => {
                RobotSimulator.robot.angle = startAngle + angle;
            }, true);
        };

        const turnLeft = function (self, angle) {
            const _angle = parseInt(angle.v);
            if (BluebotWebBLEAPI.isConnected) {
                switch (_angle) {
                    case 135:
                        BluebotWebBLEAPI.turnLeft135();
                        break;
                    case 45:
                        BluebotWebBLEAPI.turnLeft45();
                        break;
                    default:
                        BluebotWebBLEAPI.turnLeft90();
                }
                return delayAndPlay(_angle / 45 * 1000);
            } else {
                if (Simulator.Mosaic.specific.isRunning) return;
                setMotors(-self.SPEED, self.SPEED);
                return turn(-_angle, self.SPEED);
            }
        };
        $loc.turnLeft = new Sk.builtin.func(turnLeft);

        const turnRight = function (self, angle) {
            const _angle = parseInt(angle.v);
            if (BluebotWebBLEAPI.isConnected) {
                switch (angle.v) {
                    case 135:
                        BluebotWebBLEAPI.turnRight135();
                        break;
                    case 45:
                        BluebotWebBLEAPI.turnRight45();
                        break;
                    default:
                        BluebotWebBLEAPI.turnRight90();
                }
                return delayAndPlay(_angle / 45 * 1000);
            } else {
                if (Simulator.Mosaic.specific.isRunning) return;
                setMotors(self.SPEED, -self.SPEED);
                return turn(_angle, self.SPEED);
            }
        };
        $loc.turnRight = new Sk.builtin.func(turnRight);

        $loc.stop = new Sk.builtin.func(function (self) {
            setMotors(0, 0);
            Simulator.Mosaic.specific.isRunning = false;
        });
    });

    return tts;
};