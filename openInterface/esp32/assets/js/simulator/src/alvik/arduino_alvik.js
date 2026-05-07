// Arduino Nano Esp32 - arduino_alvik module

const $builtinmodule = function () {

    const arduino_alvik = {};

    arduino_alvik.ArduinoAlvik = new Sk.misceval.buildClass(arduino_alvik, function ($gbl, $loc) {

        const setMotor = function (motorSide, speed, direction, unit = 'rpm') {
            $('#alvik-motor' + motorSide + '_value').html(speed + ' ' + unit);
            const speedRPM = Simulator.Mosaic.specific.calculs.convertToRPM(speed, unit);
            if (speedRPM != 0) {
                $('.alvik-motor' + motorSide).css('animation', 'rotation-' + direction + ' ' + (60 / (speedRPM / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
            } else {
                $('.alvik-motor' + motorSide).css('animation', 'none');
            }
        };

        const setMotors = function (speed_L, speed_R, unit = 'rpm') {
            const direction_m1 = (speed_L > 0 ? "forward" : "backward");
            const direction_m2 = (speed_R > 0 ? "forward" : "backward");
            setMotor('Left', Math.abs(speed_L), direction_m1, unit);
            setMotor('Right', Math.abs(speed_R), direction_m2, unit);
        };

        const convertSpeed = function (value, fromUnit, toUnit) {
            let valueInRpm = Simulator.Mosaic.specific.calculs.convertToRPM(value, fromUnit);
            console.log(toUnit)
            switch (toUnit) {
                case 'rpm':
                    return valueInRpm;
                case 'deg/s':
                    return valueInRpm * 6;
                case 'rad/s':
                    return valueInRpm * (2 * Math.PI / 60);
                case 'tours/s':
                    return valueInRpm / 60;
                default:
                    throw new Error(`Unité non supportée: ${toUnit}`);
            }
        };

        const convertDistance = function (distance, unit = 'mm') {
            if (typeof distance !== 'number' || isNaN(distance)) {
                return -1;
            }

            switch (unit) {
                case 'm':
                    return (distance / 1000).toFixed(2);
                case 'cm':
                    return (distance / 10).toFixed(2);
                case 'inch':
                    return (distance / 25.4).toFixed(2);
                case 'mm':
                    return distance;
            }
        };

        RobotSimulator.robot.setMotorsInModules = setMotors;

        const degToRad = function (deg) {
            return deg * (Math.PI / 180);
        };

        const radToDeg = function (rad) {
            return rad * (180 / Math.PI);
        };

        ArduinoAlvik__init__ = function (self) {
            setMotor('Left', 0);
            setMotor('Right', 0);
            self.colorSensor_r = $('#alvik-ColorSensor_slider_r');
            self.colorSensor_g = $('#alvik-ColorSensor_slider_g');
            self.colorSensor_b = $('#alvik-ColorSensor_slider_b');
        };

        ArduinoAlvik__init__.co_varnames = ['self'];
        $loc.__init__ = new Sk.builtin.func(ArduinoAlvik__init__);

        $loc.begin = new Sk.builtin.func(function (self) {
            return new Sk.builtin.none();
        });

        $loc.set_wheels_speed = new Sk.builtin.func(function (self, leftSpeed, rightSpeed, unit) {
            const leftSpeed_ = Sk.ffi.remapToJs(leftSpeed);
            const rightSpeed_ = Sk.ffi.remapToJs(rightSpeed);
            const unit_ = Sk.ffi.remapToJs(unit);
            setMotors(leftSpeed_, rightSpeed_, unit_);
            return new Sk.builtin.none();
        });

        const turn = function (angle, speed, unit) {
            const rpm = speed / 100 * RobotSimulator.robot.MAX_SPEED;
            const angularDistance = RobotSimulator.robot.WHEELS_CENTER_RADIUS * 1e-2 * degToRad(Math.abs(angle));
            const movementDuration = angularDistance / RobotSimulator.convertRPMtoSpeedMS(rpm);
            const startAngle = RobotSimulator.robot.angle;

            // Déterminer la direction des moteurs en fonction de l'angle
            if (angle > 0) {
                // Rotation vers la droite (moteur gauche avance, moteur droit recule)
                setMotors(speed, -speed, unit);
            } else {
                // Rotation vers la gauche (moteur gauche recule, moteur droit avance)
                setMotors(-speed, speed, unit);
            }

            return RobotSimulator.delayOnMovement(movementDuration * 1000, () => {
                RobotSimulator.robot.angle = startAngle + angle;
            }, true);
        };

        $loc.rotate = new Sk.builtin.func(function (self, angle, unit) {
            const angle_ = Sk.ffi.remapToJs(angle);
            const unit_ = Sk.ffi.remapToJs(unit);
            const speed_ = RobotSimulator.robot.MAX_SPEED / 2;

            let finalAngle = angle_;
            switch (unit_) {
                case 'rad':
                    finalAngle = radToDeg(angle_);
                    break;
                case 'perc':
                    finalAngle = angle_ * 360 / 100;
                    break;
                case 'rev':
                    finalAngle = angle_ * 360;
                    break;
            }

            return turn(finalAngle, speed_, 'rpm');
        });

        const moveDistance = function (distance, speed, unit) {
            const rpm = speed / 100 * RobotSimulator.robot.MAX_SPEED;

            // Convertir la distance en mètres
            let distanceMeters;
            switch (unit) {
                case 'mm':
                    distanceMeters = distance / 1000;
                    break;
                case 'cm':
                    distanceMeters = distance / 100;
                    break;
                case 'inch':
                    distanceMeters = distance * 0.0254;
                    break;
                case 'm':
                default:
                    distanceMeters = distance;
                    break;
            }

            const movementDuration = Math.abs(distanceMeters) / RobotSimulator.convertRPMtoSpeedMS(rpm);
            const startPosition = Object.assign({}, RobotSimulator.robot.rotationCenter);

            // Déterminer la direction en fonction de la distance
            const direction = distance >= 0 ? 1 : -1;
            setMotors(direction * speed, direction * speed, 'rpm');

            return RobotSimulator.delayOnMovement(movementDuration * 1000, () => {
                RobotSimulator.robot.rotationCenter = RobotSimulator.getPositionByDistance(startPosition, distanceMeters * 100); // Convertir en cm pour la fonction
            }, true);
        };

        $loc.move = new Sk.builtin.func(function (self, distance, unit) {
            const distance_ = Sk.ffi.remapToJs(distance);
            const unit_ = Sk.ffi.remapToJs(unit);
            const speed_ = RobotSimulator.robot.MAX_SPEED / 2;
            return moveDistance(distance_, speed_, unit_);
        });

        $loc.stop = new Sk.builtin.func(function () {
            setMotor('Left', 0);
            setMotor('Right', 0);
            return new Sk.builtin.none();
        });

        $loc.get_wheels_speed = new Sk.builtin.func(function (self, unit) {
            const unit_ = Sk.ffi.remapToJs(unit);
            const leftSpeed = parseInt(($("#alvik-motorLeft_value").html().split(' ')[0] || "0"));
            const leftSpeedUnit = ($("#alvik-motorLeft_value").html().split(' ')[1] || "rpm");
            const rightSpeed = parseInt(($("#alvik-motorRight_value").html().split(' ')[0] || "0"));
            const rightSpeedUnit = ($("#alvik-motorRight_value").html().split(' ')[1] || "rpm");
            return new Sk.builtin.list([convertSpeed(leftSpeed, leftSpeedUnit, unit_), convertSpeed(rightSpeed, rightSpeedUnit, unit_)]);
        });

        $loc.set_builtin_led = new Sk.builtin.func(function (self, state) {
            const state_ = Sk.ffi.remapToJs(state);
            const mod = Simulator.getModuleByKey("alvik-builtin-led")
            Simulator.setAnimator(mod, mod.id, state_);
            return new Sk.builtin.none();
        });

        $loc.set_illuminator = new Sk.builtin.func(function (self, state) {
            const state_ = Sk.ffi.remapToJs(state);
            const mod = Simulator.getModuleByKey("alvik-illuminator-led")
            Simulator.setAnimator(mod, mod.id, state_);
            return new Sk.builtin.none();
        });

        $loc.get_distance = new Sk.builtin.func(function (self, unit) {
            const unit_ = Sk.ffi.remapToJs(unit);
            const leftSensor = convertDistance(Simulator.getSliderValue("alvik-distanceLeft"), unit_) || 0;
            const centerLeftSensor = convertDistance(Simulator.getSliderValue("alvik-distanceCenterLeft"), unit_) || 0;
            const centerSensor = convertDistance(Simulator.getSliderValue("alvik-distanceCenter"), unit_) || 0;
            const centerRightSensor = convertDistance(Simulator.getSliderValue("alvik-distanceCenterRight"), unit_) || 0;
            const rightSensor = convertDistance(Simulator.getSliderValue("alvik-distanceRight"), unit_) || 0;
            return new Sk.builtin.list([leftSensor, centerLeftSensor, centerSensor, centerRightSensor, rightSensor]); // TODO
        });

        $loc.get_line_sensors = new Sk.builtin.func(function (self) {
            const leftSensor = Simulator.getSliderValue("alvik-lineLeft", "_v") || 0;
            const centerSensor = Simulator.getSliderValue("alvik-lineCenter", "_v") || 0;
            const rightSensor = Simulator.getSliderValue("alvik-lineRight", "_v") || 0;
            return new Sk.builtin.list([leftSensor, centerSensor, rightSensor]);
        });

        /**
         * Converts normalized rgb to hsv
         * @param {number} r - Red component (0-255)
         * @param {number} g - Green component (0-255)
         * @param {number} b - Blue component (0-255)
         * @returns {number[]} [h, s, v] array
         * source : https://github.com/arduino/arduino-alvik-mpy/blob/main/arduino_alvik/arduino_alvik.py
         */
        $loc.rgb2hsv = new Sk.builtin.func(function (self, r_, g_, b_) {
            const r = Sk.ffi.remapToJs(r_) / 255;
            const g = Sk.ffi.remapToJs(g_) / 255;
            const b = Sk.ffi.remapToJs(b_) / 255;

            const min_ = Math.min(r, g, b);
            const max_ = Math.max(r, g, b);

            const v = max_;
            const delta = max_ - min_;

            if (delta < 0.00001) {
                const h = 0;
                const s = 0;
                return new Sk.builtin.list([h, s, v]);
            }

            let s;
            if (max_ > 0) {
                s = delta / max_;
            } else {
                s = 0;
                const h = null;
                return [h, s, v];
            }

            let h;
            if (r >= max_) {
                h = (g - b) / delta;  // color is between yellow and magenta
            } else if (g >= max_) {
                h = 2.0 + (b - r) / delta;
            } else {
                h = 4.0 + (r - g) / delta;
            }

            h *= 60.0;
            if (h < 0) {
                h += 360.0;
            }

            return new Sk.builtin.list([h, s, v]);
        });

        /**
         * Returns the color label corresponding to the given normalized HSV color input
         * @param {number} h - Hue (0-360)
         * @param {number} s - Saturation (0-1)
         * @param {number} v - Value (0-1)
         * @returns {string} Color label
         */
        $loc.hsv2label = new Sk.builtin.func(function (self, h_, s_, v_) {
            const h = Sk.ffi.remapToJs(h_);
            const s = Sk.ffi.remapToJs(s_);
            const v = Sk.ffi.remapToJs(v_);

            if (h === null || s === null || v === null) {
                return new Sk.builtin.none();
            }

            let label;

            if (s < 0.1) {
                if (v < 0.05) {
                    label = 'BLACK';
                } else if (v < 0.15) {
                    label = 'GREY';
                } else if (v < 0.8) {
                    label = 'LIGHT GREY';
                } else {
                    label = 'WHITE';
                }
            } else {
                if (v > 0.1) {
                    if (20 <= h && h < 90) {
                        label = 'YELLOW';
                    } else if (90 <= h && h < 140) {
                        label = 'LIGHT GREEN';
                    } else if (140 <= h && h < 170) {
                        label = 'GREEN';
                    } else if (170 <= h && h < 210) {
                        label = 'LIGHT BLUE';
                    } else if (210 <= h && h < 250) {
                        label = 'BLUE';
                    } else if (250 <= h && h < 280) {
                        label = 'VIOLET';
                    } else {  // h<20 or h>=280 is more problematic
                        if (v < 0.5 && s < 0.45) {
                            label = 'BROWN';
                        } else {
                            if (v > 0.77) {
                                label = 'ORANGE';
                            } else {
                                label = 'RED';
                            }
                        }
                    }
                } else {
                    label = 'BLACK';
                }
            }
            return new Sk.builtin.str(label);
        });

        $loc.brake = new Sk.builtin.func(function (self) {
            setMotor('Left', 0);
            setMotor('Right', 0);
            return new Sk.builtin.none();
        });

        // TO DO
        $loc.set_wheels_position = new Sk.builtin.func(function (self, position_left, position_right, unit) {
            const position_left_ = Sk.ffi.remapToJs(position_left);
            const position_right_ = Sk.ffi.remapToJs(position_right);
            const unit_ = Sk.ffi.remapToJs(unit);
            throw new Sk.builtin.AttributeError('alvik.set_wheels_position() is not implemented yet');

        });

        // TO DO
        $loc.get_wheels_position = new Sk.builtin.func(function (self, unit) {
            const unit_ = Sk.ffi.remapToJs(unit);
            throw new Sk.builtin.AttributeError('alvik.get_wheels_position() is not implemented yet');
        });

        // TO DO 
        $loc.get_drive_speed = new Sk.builtin.func(function (self, linear_unit, angular_unit) {
            const linear_unit_ = Sk.ffi.remapToJs(linear_unit);
            const angular_unit_ = Sk.ffi.remapToJs(angular_unit);
            throw new Sk.builtin.AttributeError('alvik.get_drive_speed() is not implemented yet');
        });

        // TO DO 
        $loc.set_servo_positions = new Sk.builtin.func(function (self, servoa_angle, servob_angle) {
            const servoa_angle_ = Sk.ffi.remapToJs(servoa_angle);
            const servob_angle_ = Sk.ffi.remapToJs(servob_angle);
            const servoa_mod = Simulator.getModuleByKey("alvik-servoA");
            const servob_mod = Simulator.getModuleByKey("alvik-servoB");
            Simulator.setAnimator(servoa_mod, servoa_mod.id, servoa_angle_);
            Simulator.setAnimator(servob_mod, servob_mod.id, servob_angle_);
            return new Sk.builtin.none();
        });

        // TO DO 
        $loc.get_orientation = new Sk.builtin.func(function (self) {
            throw new Sk.builtin.AttributeError('alvik.get_orientation() is not implemented yet');
        });

        // TO DO 
        $loc.get_acceleration = new Sk.builtin.func(function (self) {
            throw new Sk.builtin.AttributeError('alvik.get_acceleration() is not implemented yet');
        });

        // TO DO 
        $loc.get_gyros = new Sk.builtin.func(function (self) {
            throw new Sk.builtin.AttributeError('alvik.get_gyros() is not implemented yet');
        });

        $loc.get_touch_up = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(Simulator.getSliderValue("alvik-touchUp"));
        });

        $loc.get_touch_down = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(Simulator.getSliderValue("alvik-touchDown"));
        });

        $loc.get_touch_left = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(Simulator.getSliderValue("alvik-touchLeft"));
        });

        $loc.get_touch_right = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(Simulator.getSliderValue("alvik-touchRight"));
        });

        $loc.get_touch_ok = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(Simulator.getSliderValue("alvik-touchOk"));
        });

        $loc.get_touch_cancel = new Sk.builtin.func(function (self) {
            return new Sk.builtin.bool(Simulator.getSliderValue("alvik-touchCancel"));
        });

        $loc.get_touch_any = new Sk.builtin.func(function (self) {
            const touchRight = Simulator.getSliderValue("alvik-touchRight");
            const touchLeft = Simulator.getSliderValue("alvik-touchLeft");
            const touchDown = Simulator.getSliderValue("alvik-touchDown");
            const touchUp = Simulator.getSliderValue("alvik-touchUp");
            const touchOk = Simulator.getSliderValue("alvik-touchOk");
            const touchCancel = Simulator.getSliderValue("alvik-touchCancel");
            if (touchRight || touchLeft || touchDown || touchUp || touchOk || touchCancel) {
                return new Sk.builtin.bool(true);
            }
            return new Sk.builtin.bool(false);
        });

        $loc.get_color = new Sk.builtin.func(function (self, mode) {
            const mode_ = Sk.ffi.remapToJs(mode);
            const r = parseInt(self.colorSensor_r.slider('option', 'value'));
            const g = parseInt(self.colorSensor_g.slider('option', 'value'));
            const b = parseInt(self.colorSensor_b.slider('option', 'value'));
            if (mode_ == 'rgb') {
                return new Sk.builtin.tuple([parseFloat((r/255).toFixed(7)), parseFloat((g/255).toFixed(7)), parseFloat((b/255).toFixed(7))]);
            } else if (mode_ == 'hsv') {
                const { h, s, v } = rgbToHsv(r, g, b);
                console.log(h, s, v)
                return new Sk.builtin.tuple([Sk.ffi.remapToPy(parseFloat(h.toFixed(7))), Sk.ffi.remapToPy(parseFloat(s.toFixed(7))), Sk.ffi.remapToPy(parseFloat(v.toFixed(7)))]);
            }
            throw new Sk.builtin.AssertionError('alvik.get_color(mode) has no mode option : ' + mode_);
        });

        $loc.get_color_raw = new Sk.builtin.func(function (self) {
            const r = parseInt(self.colorSensor_r.slider('option', 'value'));
            const g = parseInt(self.colorSensor_g.slider('option', 'value'));
            const b = parseInt(self.colorSensor_b.slider('option', 'value'));
            return new Sk.builtin.tuple([Sk.ffi.remapToPy(r) * 4, Sk.ffi.remapToPy(g) * 4, Sk.ffi.remapToPy(b) * 4]);
        });

        // TO DO 
        $loc.get_battery_charge = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(100);
            //throw new Sk.builtin.AttributeError('alvik.get_battery_charge() is not implemented yet');
        });

        // TO DO 
        $loc.color_calibration = new Sk.builtin.func(function (self, color) {
            const color_ = Sk.ffi.remapToJs(color);
            //throw new Sk.builtin.AttributeError('alvik.color_calibration() is not implemented yet');
        });
    }, "ArduinoAlvik");


    return arduino_alvik;
};
