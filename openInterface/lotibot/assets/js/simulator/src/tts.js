// TTS module for Loti-bot

const $builtinmodule = function () {

    const tts = {};

    tts.lotibot = new Sk.misceval.buildClass(tts, function ($gbl, $loc) {

        $loc.__init__ = new Sk.builtin.func(function (self) {
            self.speed = {
                'SLOW': 25,
                'MEDIUM': 50,
                'FAST': 100
            };
            self.heading = 0;
        });

        const setMotor = function (motorSide, speed, direction) {
            Simulator.Mosaic.specific.isRunning = true;
            $('#lotibot-motor' + motorSide + '_value').html(speed);
            if (speed !== 0) {
                $('.lotibot-motor' + motorSide).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
            } else {
                $('.lotibot-motor' + motorSide).css('animation', 'none');
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

        $loc.moveForward = new Sk.builtin.func(function (self, distance_mm, speed) {
            const _speed = self.speed[speed.v];
            if (LotibotWebBLEAPI.isConnected) {
                LotibotWebBLEAPI.moveForward(distance_mm.v, _speed);
            } else {
                setMotors(_speed, _speed);
                return move(distance_mm.v / 10, _speed);
            }
        });


        $loc.moveBackward = new Sk.builtin.func(function (self, distance_mm, speed) {
            const _speed = self.speed[speed.v];
            if (LotibotWebBLEAPI.isConnected) {
                LotibotWebBLEAPI.moveBackward(distance_mm.v, _speed);
            } else {
                setMotors(-_speed, -_speed);
                return move(-distance_mm.v / 10, _speed);
            }
        });

        const turn = function (angle, speed) {
            const rpm = speed / 100 * RobotSimulator.robot.MAX_SPEED;
            const angularDistance = RobotSimulator.robot.WHEELS_CENTER_RADIUS * 1e-2 * degToRad(Math.abs(angle));
            const movementDuration = angularDistance / RobotSimulator.convertRPMtoSpeedMS(rpm);
            const startAngle = RobotSimulator.robot.angle;
            return RobotSimulator.delayOnMovement(movementDuration * 1000, () => {
                RobotSimulator.robot.angle = startAngle + angle;
            }, true);
        };

        $loc.turnLeft = new Sk.builtin.func(function (self, angle, speed) {
            const _speed = self.speed[speed.v];
            if (LotibotWebBLEAPI.isConnected) {
                LotibotWebBLEAPI.turnLeft(angle.v, _speed);
            } else {
                if (Simulator.Mosaic.specific.isRunning) return;
                setMotors(-_speed, _speed);
                return turn(-angle.v, _speed);
            }
        });

        $loc.turnRight = new Sk.builtin.func(function (self, angle, speed) {
            const _speed = self.speed[speed.v];
            if (LotibotWebBLEAPI.isConnected) {
                LotibotWebBLEAPI.turnRight(angle.v, _speed);
            } else {
                if (Simulator.Mosaic.specific.isRunning) return;
                setMotors(_speed, -_speed);
                return turn(angle.v, _speed);
            }
        });

        $loc.drawSquare = new Sk.builtin.func(function (self, distance_mm) {
            if (LotibotWebBLEAPI.isConnected) {
                LotibotWebBLEAPI.drawSquare(distance_mm.v);
            } else {
                const speed = new Sk.builtin.str('SLOW');
                const distance = new Sk.builtin.float_(distance_mm.v);
                const angle = new Sk.builtin.int_(90);
                const move = () => $loc.moveForward.tp$call([self, distance, speed]);
                const turn = () => $loc.turnLeft.tp$call([self, angle, speed])
                const pTS = Sk.misceval.promiseToSuspension;
                return new pTS(
                    Sk.misceval.asyncToPromise(move).then(() => new pTS(
                        Sk.misceval.asyncToPromise(turn).then(() => new pTS(
                            Sk.misceval.asyncToPromise(move).then(() => new pTS(
                                Sk.misceval.asyncToPromise(turn).then(() => new pTS(
                                    Sk.misceval.asyncToPromise(move).then(() => new pTS(
                                        Sk.misceval.asyncToPromise(turn).then(() => pTS(
                                            Sk.misceval.asyncToPromise(move)
                                        ))
                                    ))
                                ))
                            ))
                        ))
                    ))
                );
            }
        });

        $loc.stop = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                LotibotWebBLEAPI.stop();
            } else {
                setMotors(0, 0);
            }
        });

        //TO DO
        $loc.playSound = new Sk.builtin.func(function (self, index) {
            const _index = Sk.ffi.remapToJs(index);
            if (LotibotWebBLEAPI.isConnected) {
                LotibotWebBLEAPI.playSound(_index);
            } else {
                throw new Sk.builtin.NotImplementedError("tts.lotibot.playSound is not yet implemented");
            }
        });

        const setLED = function (id, value) {
            const module_left = Simulator.getModuleByKey('lotibot-' + id);
            Simulator.setAnimator(module_left, 'lotibot-' + id, value);
        };


        $loc.setLedColor = new Sk.builtin.func(function (self, left_r, left_g, left_b, right_r, right_g, right_b) {
            if (LotibotWebBLEAPI.isConnected) {
                LotibotWebBLEAPI.setLedColor(left_r.v, left_g.v, left_b.v, right_r.v, right_g.v, right_b.v);
            } else {
                setLED('led-left', [left_r.v, left_g.v, left_b.v]);
                setLED('led-right', [right_r.v, right_g.v, right_b.v]);
            }
        });

        $loc.setHeadlightValue = new Sk.builtin.func(function (self, pwm_left, pwm_right) {
            if (LotibotWebBLEAPI.isConnected) {
                LotibotWebBLEAPI.setHeadlightValue(pwm_left.v, pwm_right.v);
            } else {
                setLED('led-left', pwm_left.v / 255);
                setLED('led-right', pwm_right.v / 255);
            }
        });

        $loc.isStopped = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.builtin.bool(LotibotWebBLEAPI.isStopped);
            } else {
                return new Sk.builtin.bool(!Simulator.Mosaic.specific.isRunning);
            }
        });

        $loc.isCollisionDetected = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.builtin.bool(LotibotWebBLEAPI.isCollisionDetected);
            } else {
                return new Sk.builtin.bool(RobotSimulator.checkingCanvasRobotCollisions() || RobotSimulator.checkObstacleCollisions());
            }
        });

        $loc.isFallDetected = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.builtin.bool(LotibotWebBLEAPI.isFallDetected);
            } else {
                return new Sk.builtin.bool(false);
            }
        });

        //TO DO
        $loc.isSpeakerWorking = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.builtin.bool(LotibotWebBLEAPI.isSpeakerWorking);
            } else {
                throw new Sk.builtin.NotImplementedError("isSpeakerWorking function is not yet implemented");
            }
        });

        //TO DO
        $loc.isHeadlightsWorking = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.builtin.bool(LotibotWebBLEAPI.isHeadlightsWorking);
            } else {
                throw new Sk.builtin.NotImplementedError("isHeadlightsWorking function is not yet implemented");
            }
        });

        $loc.getHeading = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                    LotibotWebBLEAPI.getCompassHeading();
                    await sleep_ms(1500);
                    resolve(new Sk.builtin.int_(LotibotWebBLEAPI.compassHeading));
                }));
            } else {
                throw new Sk.builtin.NotImplementedError("getHeading function is not yet implemented");
            }
        });

        $loc.getDistance = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                    LotibotWebBLEAPI.getUltrasonicDistance();
                    await sleep_ms(1500);
                    resolve(new Sk.builtin.float_(LotibotWebBLEAPI.distance));
                }));
            } else {
                const t = Simulator.getSliderValue('lotibot-ultrasonic', '_t');
                return new Sk.builtin.float_(roundFloat(Simulator.Mosaic.specific.calculs.getDistance(t), 1));
            }
        });

        $loc.getLightLevel = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                    LotibotWebBLEAPI.getLightLevel();
                    await sleep_ms(1500);
                    resolve(new Sk.builtin.int_(LotibotWebBLEAPI.lightLevel));
                }));
            } else {
                return new Sk.builtin.int_(Simulator.getSliderValue('lotibot-light'));
            }
        });

        $loc.getSoundLevel = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                    LotibotWebBLEAPI.getSoundLevel();
                    await sleep_ms(1500);
                    resolve(new Sk.builtin.int_(LotibotWebBLEAPI.soundLevel));
                }));
            } else {
                return new Sk.builtin.int_(Simulator.getSliderValue('lotibot-light'));
            }
        });

        $loc.getTemperature = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                    LotibotWebBLEAPI.getTemperature();
                    await sleep_ms(1500);
                    resolve(new Sk.builtin.float_(LotibotWebBLEAPI.temperature));
                }));
            } else {
                return new Sk.builtin.float_(Simulator.getSliderValue('lotibot-temperature'));
            }
        });

        //TO DO
        $loc.getBatteryLevel = new Sk.builtin.func(function (self) {
            if (LotibotWebBLEAPI.isConnected) {
                return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                    LotibotWebBLEAPI.getBatteryLvl();
                    await sleep_ms(1500);
                    resolve(new Sk.builtin.int_(LotibotWebBLEAPI.batteryLevel));
                }));
            } else {
                throw new Sk.builtin.NotImplementedError("getBatteryLevel function is not yet implemented");
            }
        });
    });

    return tts;
};