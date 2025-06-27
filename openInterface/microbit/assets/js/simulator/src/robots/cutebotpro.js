// micro:bit - cutebotpro module

function $builtinmodule(name) {
    const cutebotpro = {};
    var modules = Object.create(null);
    return Sk.misceval.chain(
        Sk.importModule("neopixel", false, true),
        (neopixel) => {
            modules.neopixel = neopixel.$d;
        },
        () => cutebotpro_mod(cutebotpro, modules)
    );
};

function cutebotpro_mod(cutebotpro, modules) {

    cutebotpro.__name__ = new Sk.builtin.str("cutebotpro");

    const neopixel = modules.neopixel;

    var CBP = function ($gbl, $loc) {

        // pin mode
        $loc.I2C_ADDRESS = new Sk.builtin.int_(0x10);
        $loc.BUF = new Sk.builtin.bytes([0x99, 0, 0, 0, 0, 0, 0x88]);

        $loc.MOTOR_LEFT = new Sk.builtin.int_(0x01);
        $loc.MOTOR_RIGHT = new Sk.builtin.int_(0x02);
        $loc.MOTOR_BOTH = new Sk.builtin.int_(0x03);

        $loc.LED_LEFT = new Sk.builtin.int_(0x01);
        $loc.LED_RIGHT = new Sk.builtin.int_(0x02);
        $loc.LED_BOTH = new Sk.builtin.int_(0x03);

        $loc.CM_PER_SEC = new Sk.builtin.str('cm_s');
        $loc.INCH_PER_SEC = new Sk.builtin.str('inch_s');

        $loc.DIRECTION_RETREAT = new Sk.builtin.int_(0);
        $loc.DIRECTION_ADVANCE = new Sk.builtin.int_(1);

        $loc.TURN_LEFT = new Sk.builtin.int_(0);
        $loc.TURN_RIGHT = new Sk.builtin.int_(1);
        $loc.TURN_LEFT_AT = new Sk.builtin.int_(2);
        $loc.TURN_RIGHT_AT = new Sk.builtin.int_(3);

        $loc.SERVO_TYPE_0_180 = new Sk.builtin.int_(1);
        $loc.SERVO_TYPE_0_270 = new Sk.builtin.int_(2);
        $loc.SERVO_TYPE_0_360 = new Sk.builtin.int_(3);

        $loc.WHEELS_CENTRE_RADIUS = new Sk.builtin.float_(RobotSimulator.robot.WHEELS_CENTER_RADIUS);

        const PulseCounter = {
            'Left': {
                isCounting: false,
                t0: 0,
                speed: 0,
                pulses: 0,
            },
            'Right': {
                isCounting: false,
                t0: 0,
                speed: 0,
                pulses: 0,
            },
            reset: function (wheel) {
                this[wheel].isCounting = false;
                this[wheel].speed = 0;
                this[wheel].t0 = 0;
            },
            start: function (wheel, speed) {
                this[wheel].isCounting = true;
                this[wheel].speed = speed;
                this[wheel].t0 = Date.now();
            },
            measure: function (wheel) {
                const delay = (Date.now() - this[wheel].t0) / 1000; // seconds elapsed
                this[wheel].pulses += Math.floor(this[wheel].speed * delay * 4);
            },
            manage: function (wheel, speed) {
                if (this[wheel].isCounting) {
                    this.measure(wheel);
                }
                if (speed !== 0) {
                    this.start(wheel, speed);
                } else {
                    this.reset(wheel);
                }
            },
            init: function (wheel) {
                this[wheel].pulses = 0;
                this.reset(wheel);
            }
        };

        CBP__init__ = function (self) {
            self.fourWayStateValue = 0;
            self.pulseCntL = 0;
            self.pulseCntR = 0;
            self.squareSize = 10;
            self.squareUnit = 'cm';
            version = $loc.readVersion.func_code().v;
            self.version = version.split('.')[0];
            self.neopx = new neopixel.NeoPixel();
            self.neopx.tp$init([Sk.globals.pin15, new Sk.builtin.int_(2)]);
            Sk.builtins.print.tp$call(["Cutebot Pro version: " + version]);
        };

        CBP__init__.co_varnames = ['self'];
        CBP__init__.$defaults = [];

        $loc.__init__ = new Sk.builtin.func(CBP__init__);

        $loc.readVersion = new Sk.builtin.func(function (self) {
            return new Sk.builtin.str('V1.0.1');
        });

        const setMotorRPM = function (motor, rpm, direction) {
            PulseCounter.manage(motor, rpm * 360 / 60); // speed in deg.s-1
            const speed_cm_s = RobotSimulator.convertRPMtoSpeedMS(rpm) * 100; // to cm.s-1
            $('#mb-cutebotpro-motor' + motor + '_value').html(Math.round(speed_cm_s * 10) / 10 + ' cm/s');
            if (direction != 'stop') {
                $('.mb-cutebotpro-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / rpm) + 's infinite linear');
            } else {
                $('.mb-cutebotpro-motor' + motor).css('animation', 'none');
            }
        };

        const setMotorSpeedPercent = function (motor, speed, direction) {
            const rpm = speed / 100 * RobotSimulator.robot.MAX_SPEED;
            setMotorRPM(motor, rpm, direction);
        };

        RobotSimulator.robot.setMotorsInModules = function (speedL, speedR) {
            setMotorSpeedPercent('Left', Math.abs(speedL), speedL > 0 ? 'forward' : 'backward');
            setMotorSpeedPercent('Right', Math.abs(speedR), speedR > 0 ? 'forward' : 'backward');
        };

        $loc.pwmCruiseControlMotor = new Sk.builtin.func(function (self, motor, speed) {
            const direction = (speed.v > 0 ? "forward" : "backward");
            speed = Math.abs(speed.v);
            if (motor.v === $loc.MOTOR_LEFT.v) {
                setMotorSpeedPercent('Left', speed, direction);
            } else if (motor.v == $loc.MOTOR_RIGHT.v) {
                setMotorSpeedPercent('Right', speed, direction);
            } else if (motor.v == $loc.MOTOR_BOTH.v) {
                setMotorSpeedPercent('Left', speed, direction);
                setMotorSpeedPercent('Right', speed, direction);
            }
            return new Sk.builtin.none();
        });

        CBP_runFullSpeed = function (self, direction) {
            if (direction.v == $loc.DIRECTION_RETREAT.v) {
                setMotorSpeedPercent('Left', 100, 'backward');
                setMotorSpeedPercent('Right', 100, 'backward');
            } else {
                setMotorSpeedPercent('Left', 100, 'forward');
                setMotorSpeedPercent('Right', 100, 'forward');
            }
            return new Sk.builtin.none();
        };

        CBP_runFullSpeed.co_varnames = ['self', 'direction'];
        CBP_runFullSpeed.$defaults = [$loc.DIRECTION_ADVANCE];

        $loc.runFullSpeed = new Sk.builtin.func(CBP_runFullSpeed);

        CBP_stopImmediately = function (self, motor) {
            if (motor.v === $loc.MOTOR_LEFT.v) {
                setMotorRPM('Left', 0, 'stop');
            } else if (motor.v == $loc.MOTOR_RIGHT.v) {
                setMotorRPM('Right', 0, 'stop');
            } else if (motor.v == $loc.MOTOR_BOTH.v) {
                setMotorRPM('Left', 0, 'stop');
                setMotorRPM('Right', 0, 'stop');
            }
            return new Sk.builtin.none();
        };

        CBP_stopImmediately.co_varnames = ['self', 'motor'];
        CBP_stopImmediately.$defaults = [$loc.MOTOR_BOTH];

        $loc.stopImmediately = new Sk.builtin.func(CBP_stopImmediately);

        CBP_readSpeed = function (self, motor, unit) {
            speed = 0
            if (motor.v === $loc.MOTOR_LEFT.v) {
                speed = parseInt($('#mb-cutebotpro-motorLeft_value').html());
            } else if (motor.v == $loc.MOTOR_RIGHT.v) {
                speed = parseInt($('#mb-cutebotpro-motorRight_value').html());
            }
            if (unit.v == $loc.INCH_PER_SEC.v) {
                speed /= 2.54;
            }
            return new Sk.builtin.float_(speed);
        };

        CBP_readSpeed.co_varnames = ['self', 'motor', 'unit'];
        CBP_readSpeed.$defaults = [$loc.CM_PER_SEC];

        $loc.readSpeed = new Sk.builtin.func(CBP_readSpeed);

        $loc.readPulses = new Sk.builtin.func(function (self) {
            PulseCounter.measure('Left');
            self.pulseCntL = PulseCounter['Left'].pulses;
            PulseCounter.measure('Right');
            self.pulseCntR = PulseCounter['Right'].pulses;
            return new Sk.builtin.none();
        });

        $loc.readWheelPulses = new Sk.builtin.func(function (self, motor) {
            $loc.readPulses.tp$call([self]);
            if (motor.v === $loc.MOTOR_LEFT.v) {
                return new Sk.builtin.int_(self.pulseCntL);
            } else if (motor.v == $loc.MOTOR_RIGHT.v) {
                return new Sk.builtin.int_(self.pulseCntR);
            }
            return new Sk.builtin.none();
        });

        CBP_readAngularDistance = function (self, motor, unit) {
            const distance = (x) => Math.floor(x / 4 + 0.5);
            $loc.readPulses.tp$call([self]);
            if (motor.v == $loc.MOTOR_LEFT.v) {
                return new Sk.builtin.float_(distance(self.pulseCntL));
            } else if (motor.v == $loc.MOTOR_RIGHT.v) {
                return new Sk.builtin.float_(distance(self.pulseCntR));
            }
        };

        CBP_readAngularDistance.co_varnames = ['self', 'motor', 'unit'];
        CBP_readAngularDistance.$defaults = [new Sk.builtin.str('deg')];

        $loc.readAngularDistance = new Sk.builtin.func(CBP_readAngularDistance);

        $loc.clearWheelTurn = new Sk.builtin.func(function (self, motor) {
            if (motor.v === $loc.MOTOR_LEFT.v) {
                PulseCounter.init('Left');
            } else if (motor.v == $loc.MOTOR_RIGHT.v) {
                PulseCounter.init('Right');
            } else if (motor.v == $loc.MOTOR_BOTH.v) {
                PulseCounter.init('Left');
                PulseCounter.init('Right');
            }
            return new Sk.builtin.none();
        });

        const setColorHL = (i, color) => {
            const mod = Simulator.getModuleByKey("mb-cutebotpro-" + i + "RGBLed");
            Simulator.setAnimator(mod, mod.id, color);
        };

        $loc.controlHeadlights = new Sk.builtin.func(function (self, led, rgb) {
            if (led.v === $loc.LED_LEFT.v) {
                setColorHL('Left', rgb.v);
            } else if (led.v == $loc.LED_RIGHT.v) {
                setColorHL('Right', rgb.v);
            } else if (led.v == $loc.LED_BOTH.v) {
                setColorHL('Left', rgb.v);
                setColorHL('Right', rgb.v);
            }
            return new Sk.builtin.none();
        });

        $loc.controlHeadlightsHex = new Sk.builtin.func(function (self, led, colour) {
            if (led.v === $loc.LED_LEFT.v) {
                setColorHL('Left', colour.v);
            } else if (led.v == $loc.LED_RIGHT.v) {
                setColorHL('Right',);
            } else if (led.v == $loc.LED_BOTH.v) {
                setColorHL('Left', colour.v);
                setColorHL('Right', colour.v);
            }
            return new Sk.builtin.none();
        });

        $loc.turnOffHeadlights = new Sk.builtin.func(function (self) {
            setColorHL('Left', [0, 0, 0]);
            setColorHL('Right', [0, 0, 0]);
            return new Sk.builtin.none();
        });

        $loc.setNeopixelColor = new Sk.builtin.func(function (self, led, color) {
            const np = Object.getPrototypeOf(self.neopx);
            const setColor = (i) => np.__setitem__.tp$call([self.neopx, new Sk.builtin.int_(i), color]);
            if (led.v === $loc.LED_LEFT.v) {
                setColor(0);
            } else if (led.v == $loc.LED_RIGHT.v) {
                setColor(1);
            } else if (led.v == $loc.LED_BOTH.v) {
                setColor(0);
                setColor(1);
            }
            np.show.tp$call([self.neopx]);
            return Sk.builtin.none();
        });

        $loc.getLineTrackerStates = new Sk.builtin.func(function (self) {
            const lineFinder = ['Right', 'CenterRight', 'CenterLeft', 'Left'];
            const bitStates = lineFinder.map(sensor => Simulator.getSliderValue("mb-cutebotpro-finder" + sensor, "_v") > 0x7f ? 1 : 0);
            return new Sk.builtin.int_(parseInt(bitStates.join(''), 2));
        });

        $loc.isLineTrackerState = new Sk.builtin.func(function (self, state) {
            return new Sk.builtin.bool($loc.getLineTrackerStates.tp$call([self]).v == state.v);
        });

        CBP_getLineOffset = function (self, unit) {
            // throw new Sk.builtin.NotImplementedError("<b>CutebotPro.getLineOffset</b> is not yet implemented");
            // const lineFinder = ['Right', 'CenterRight', 'CenterLeft', 'Left'];
            // const grayValues = lineFinder.map(sensor => Simulator.getSliderValue("mb-cutebotpro-finder" + sensor, "_v"));
            // // TO DO: find correlation measure value with grayscales
            // offset = - (measure - 3000) / 1000
            // if (unit.v == 'inch') {
            //     offset /= 2.54;
            // }
            const lineFinder = ['Right', 'CenterRight', 'CenterLeft', 'Left'];
            const positions = { Right: 3, CenterRight: 1, CenterLeft: -1, Left: -3 };

            const grayValues = lineFinder.map(s =>
                Simulator.getSliderValue("mb-cutebotpro-finder" + s, "_v")
            );

            const intensities = grayValues.map(v => v);

            let num = 0, den = 0;
            lineFinder.forEach((s, i) => {
                num += intensities[i] * positions[s];
                den += intensities[i];
            });
            let offset = (den > 0 ? num / den : 0);

            if (unit.v === 'inch') offset /= 2.54;

            return new Sk.builtin.float_(roundFloat(offset, 2));
        };


        CBP_getLineOffset.co_varnames = ['self', 'unit'];
        CBP_getLineOffset.$defaults = [new Sk.builtin.str('cm')];

        $loc.getLineOffset = new Sk.builtin.func(CBP_getLineOffset);

        $loc.isSensorTrackingLine = new Sk.builtin.func(function (self, sensor) {
            return new Sk.builtin.bool($loc.getLineTrackerStates.tp$call([self]).v & (1 << (sensor.v - 1)) > 0);
        });

        $loc.getGrayscaleTrackingValue = new Sk.builtin.func(function (self, sensor) {
            const lineFinder = ['Right', 'CenterRight', 'CenterLeft', 'Left'];
            const grayscale = Simulator.getSliderValue("mb-cutebotpro-finder" + lineFinder[sensor.v - 1], "_v");
            return new Sk.builtin.int_(grayscale);
        });

        CBP_readUltrasonic = function (self, unit) {
            const duration = Simulator.getSliderValue("mb-cutebotpro-ultrasonic", "_t");
            let distance = Simulator.Mosaic.grove.calculs.getDistance(duration);
            if (unit.v == 'inch') {
                distance /= 2.54;
            }
            return new Sk.builtin.float_(roundFloat(distance, 1));
        };

        CBP_readUltrasonic.co_varnames = ['self', 'unit'];
        CBP_readUltrasonic.$defaults = [new Sk.builtin.str('cm')];

        $loc.readUltrasonic = new Sk.builtin.func(CBP_readUltrasonic);

        CBP_cruiseControl = function (self, speedL, speedR, unit) {
            let MAX_SPEED_CM_S = 60;
            if (unit.v == $loc.INCH_PER_SEC.v) {
                speedL.v *= 2.54;
                speedR.v *= 2.54;
            }
            const control = (speed) => {
                let dir = 0;
                if (speed < 0) {
                    speed = -speed
                    dir = 'backward';
                } else if (speed == 0) {
                    dir = 'stop';
                } else {
                    dir = 'forward';
                }
                if (speed > MAX_SPEED_CM_S) {
                    speed = MAX_SPEED_CM_S;
                }
                return [RobotSimulator.convertSpeedMStoRPM(speed / 100), dir];
            };
            const cmdLeft = control(speedL.v);
            const cmdRight = control(speedR.v);
            setMotorRPM('Left', cmdLeft[0], cmdLeft[1]);
            setMotorRPM('Right', cmdRight[0], cmdRight[1]);
            return Sk.builtin.none();
        };

        CBP_cruiseControl.co_varnames = ['self', 'speedL', 'speedR', 'unit'];
        CBP_cruiseControl.$defaults = [$loc.CM_PER_SEC];

        $loc.cruiseControl = new Sk.builtin.func(CBP_cruiseControl);

        CBP_turnWithRadius = function (self, side, radius, speed, unit = 'cm') {
            if (unit.v == 'inch') {
                radius.v *= 2.54;
                speed.v *= 2.54;
            }
            speed_offset = $loc.WHEELS_CENTRE_RADIUS.v / radius.v;
            speed_low = new Sk.builtin.float_(speed.v * (1 - speed_offset));
            speed_high = new Sk.builtin.float_(speed.v * (1 + speed_offset));
            if (side.v == 'to_left') {
                $loc.cruiseControl.tp$call([self, speed_low, speed_high, $loc.CM_PER_SEC]);
            } else if (side.v == 'to_right') {
                $loc.cruiseControl.tp$call([self, speed_high, speed_low, $loc.CM_PER_SEC]);
            }
            return Sk.builtin.none();
        }

        CBP_turnWithRadius.co_varnames = ['self', 'side', 'radius', 'speed', 'unit'];
        CBP_turnWithRadius.$defaults = [new Sk.builtin.str('cm')];

        $loc.turnWithRadius = new Sk.builtin.func(CBP_turnWithRadius);

        CBP_runDistance = function (self, direction, distance, unit, wait) {
            $loc.pwmCruiseControlMotor.tp$call([self, $loc.MOTOR_BOTH, new Sk.builtin.int_(0)]);
            if (unit.v == 'inch') {
                distance.v *= 2.54;
            }
            // TO DO : check this in real
            if (distance.v > 3) {
                distance.v -= Math.floor(distance.v / 50) + 1;
            }
            // ??
            const rpm = 100;
            const movementDuration = (distance.v * 1e-2) / RobotSimulator.convertRPMtoSpeedMS(rpm);
            const startPosition = Object.assign({}, RobotSimulator.robot.rotationCenter);
            setMotorRPM('Left', rpm, direction.v == $loc.DIRECTION_ADVANCE.v ? 'forward' : 'backward');
            setMotorRPM('Right', rpm, direction.v == $loc.DIRECTION_ADVANCE.v ? 'forward' : 'backward');
            return RobotSimulator.delayOnMovement(Math.abs(movementDuration * 1000), () => {
                RobotSimulator.robot.rotationCenter = RobotSimulator.getPositionByDistance(startPosition, distance.v);
            }, wait.v);
        };

        CBP_runDistance.co_varnames = ['self', 'direction', 'distance', 'unit', 'wait'];
        CBP_runDistance.$defaults = [new Sk.builtin.str('cm'), new Sk.builtin.bool(true)];

        $loc.runDistance = new Sk.builtin.func(CBP_runDistance);

        CBP_turnWheel = function (self, wheel, angle, unit, wait) {
            tempAngle = angle.v;
            $loc.pwmCruiseControlMotor.tp$call([self, $loc.MOTOR_BOTH, new Sk.builtin.int_(0)]);
            if (unit.v == 'tr') {
                tempAngle *= 360;
            }
            const rpm = 100;
            if (wheel.v == $loc.MOTOR_LEFT.v) {
                setMotorRPM('Left', rpm, angle.v > 0 ? 'forward' : 'backward');
            } else if (wheel.v == $loc.MOTOR_RIGHT.v) {
                setMotorRPM('Right', rpm, angle.v > 0 ? 'forward' : 'backward');
            } else {
                setMotorRPM('Left', rpm, angle.v > 0 ? 'forward' : 'backward');
                setMotorRPM('Right', rpm, angle.v > 0 ? 'forward' : 'backward');
            }
            const distance_cm = RobotSimulator.robot.WHEELS_DIAMETER / 2 * degToRad(Math.abs(tempAngle));
            const movementDuration = distance_cm * 1e-2 / RobotSimulator.convertRPMtoSpeedMS(rpm);
            return RobotSimulator.delayOnMovement(Math.abs(movementDuration * 1000), () => { }, wait.v);
        };

        CBP_turnWheel.co_varnames = ['self', 'wheel', 'angle', 'unit', 'wait'];
        CBP_turnWheel.$defaults = [new Sk.builtin.str('deg'), new Sk.builtin.bool(true)];

        $loc.turnWheel = new Sk.builtin.func(CBP_turnWheel);

        CBP_turnWithAngle = function (self, direction, angle, wait) {
            let tempAngle = 0;
            let motor = 0;
            $loc.pwmCruiseControlMotor.tp$call([self, $loc.MOTOR_BOTH, new Sk.builtin.int_(0)]);
            Simulator.sleep_ms(100);
            const rpm = 100;
            if (direction.v == $loc.TURN_LEFT.v) {
                setMotorRPM('Left', 0, 'stop');
                setMotorRPM('Right', rpm, 'forward');
            } else if (direction.v == $loc.TURN_RIGHT.v) {
                setMotorRPM('Left', rpm, 'forward');
                setMotorRPM('Right', 0, 'stop');
            } else {
                motor = $loc.MOTOR_BOTH.v;
                tempAngle += 4
            }
            const movementDuration = (2 * RobotSimulator.robot.WHEELS_CENTER_RADIUS * 1e-2 * degToRad(angle.v)) / RobotSimulator.convertRPMtoSpeedMS(rpm);
            const startAngle = RobotSimulator.robot.angle;
            return RobotSimulator.delayOnMovement(Math.abs(movementDuration * 1000), () => {
                RobotSimulator.robot.angle = startAngle + angle.v;
            }, wait.v);
        };

        CBP_turnWithAngle.co_varnames = ['self', 'direction', 'angle', 'wait'];
        CBP_turnWithAngle.$defaults = [new Sk.builtin.bool(true)];

        $loc.turnWithAngle = new Sk.builtin.func(CBP_turnWithAngle);

        $loc._waitingEndOfMoving = new Sk.builtin.func(function (self, direction, angle) {
            throw new Sk.builtin.NotImplementedError("<b>CutebotPro._waitingEndOfMoving</b> is not yet implemented");
            Simulator.sleep_ms(100); //MakeCode setting: 1000 ?
            while (true) {
                const getSpeed = (side) => $loc.readSpeed.tp$call([self, $loc['MOTOR_' + side]]).v;
                if (getSpeed('LEFT') == 0 && getSpeed('RIGHT') == 0) {
                    Simulator.sleep_ms(100); //MakeCode setting: 1000 ?
                    if (getSpeed('LEFT') == 0 && getSpeed('RIGHT') == 0) {
                        break;
                    }
                }
            }
            return Sk.builtin.none();
        });

        CBP_setSquare = function (self, size, unit) {
            self.squareSize = size.v;
            self.squareUnit = unit.v;
            return Sk.builtin.none();
        };

        CBP_setSquare.co_varnames = ['self', 'size', 'unit'];
        CBP_setSquare.$defaults = [new Sk.builtin.str('cm')];

        $loc.setSquare = new Sk.builtin.func(CBP_setSquare);

        CBP_runSquare = function (self, n, direction, wait) {
            $loc.runDistance.tp$call([self, direction, new Sk.builtin.int_(self.squareSize * n.v), new Sk.builtin.str(self.squareUnit), wait]);
        };

        CBP_runSquare.co_varnames = ['self', 'n', 'direction', 'wait'];
        CBP_runSquare.$defaults = [new Sk.builtin.bool(true)];

        $loc.runSquare = new Sk.builtin.func(CBP_runSquare);

        CBP_controlServo = function (self, servo, angle, type) {
            if (type.v == $loc.SERVO_TYPE_0_270.v) {
                angle = $loc._map.tp$call([self, angle, 0, 270, 0, 180]).v;
            }
            if (type.v == $loc.SERVO_TYPE_0_360.v) {
                angle = $loc._map.tp$call([self, angle, 0, 360, 0, 180]).v;
            }
            const mod = Simulator.getModuleByKey('mb-cutebotpro-servo' + servo.v);
            Simulator.setAnimator(mod, mod.id, angle.v);
            return Sk.builtin.none();
        };

        CBP_controlServo.co_varnames = ['self', 'index', 'angle', 'type'];
        CBP_controlServo.$defaults = [$loc.SERVO_TYPE_0_180];

        $loc.controlServo = new Sk.builtin.func(CBP_controlServo);

        $loc.controlContinuousServo = new Sk.builtin.func(function (self, servo, speed) {
            throw new Sk.builtin.NotImplementedError("<b>CutebotPro.controlContinuousServo</b> is not yet implemented");
            speed = $loc._map.tp$call([self, speed, -100, 100, 0, 180]).v;
            const mod = Simulator.getModuleByKey('mb-cutebotpro-continuousServo' + servo.v);
            Simulator.setAnimator(mod, mod.id, speed.v);
            return Sk.builtin.none();
        });

        $loc._map = new Sk.builtin.func(function (self, number, in_min, in_max, out_min, out_max) {
            if (number.v > in_max.v) {
                number.v = in_max.v;
            } else if (number.v < in_min.v) {
                number.v = in_min.v;
            }
            return new Sk.builtin.float(out_min.v + ((out_max.v - out_min.v) / (in_max.v - in_min.v)) * (number.v - in_min.v));
        });

    };

    cutebotpro.CBP = new Sk.misceval.buildClass(cutebotpro, CBP, "CBP", []);

    return cutebotpro;
};