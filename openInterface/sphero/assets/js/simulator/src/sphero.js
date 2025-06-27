// Sphero module

const $builtinmodule = function () {

    const sphero = {};

    sphero.sphero_mini = new Sk.misceval.buildClass(sphero, function ($gbl, $loc) {

        $loc.__init__ = new Sk.builtin.func(function (self) {
            self.heading = 0;
            self.DIR_FORWARD = 1;
            self.DIR_BACKWARD = 2;
        });

        const setMotor = function (motor, speed, direction) {
            $('#sphero-mini-motor' + motor + '_value').html(speed);
            if (speed !== 0) {
                $('.sphero-mini-motor' + motor).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 255 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
            } else {
                $('.sphero-mini-motor' + motor).css('animation', 'none');
            }
        };

        const roll_simu = function (self, speed, heading) {
            self.heading = heading;
            Robots['sphero_mini'].angle = heading;
            setMotor('Left', Math.abs(speed), speed > 0 ? 'forward' : 'backward');
            setMotor('Right', Math.abs(speed), speed > 0 ? 'forward' : 'backward');
        };

        $loc.setLEDColor = new Sk.builtin.func(function (self, r, g, b) {
            const red = Sk.ffi.remapToJs(r);
            const green = Sk.ffi.remapToJs(g);
            const blue = Sk.ffi.remapToJs(b);
            if (SpheroWebBLEAPI.isConnected) {
                SpheroWebBLEAPI.setLEDColor(red, green, blue);
            } else {
                const module = Simulator.getModuleByKey('sphero-mini-RGBLed');
                Simulator.setAnimator(module, 'sphero-mini-RGBLed', [red, green, blue]);
            }
        });

        $loc.setBackLEDIntensity = new Sk.builtin.func(function (self, intensity) {
            if (SpheroWebBLEAPI.isConnected) {
                SpheroWebBLEAPI.setBackLEDIntensity(intensity.v);
            } else {
                const module = Simulator.getModuleByKey('sphero-mini-BackLed');
                Simulator.setAnimator(module, 'sphero-mini-BackLed', intensity.v / 255);
            }
        });

        $loc.raw_motor = new Sk.builtin.func(function (self, left_speed, left_direction, right_speed, right_direction) {
            if (SpheroWebBLEAPI.isConnected) {
                SpheroWebBLEAPI.raw_motor(left_speed.v, left_direction.v, right_speed.v, right_direction.v);
            } else {
                const speed_L = left_direction.v == self.DIR_BACKWARD ? -left_speed.v : left_speed.v;
                const speed_R = right_direction.v == self.DIR_BACKWARD ? -right_speed.v : right_speed.v;
                if (speed_L !== null) {
                    setMotor('Left', Math.abs(speed_L), speed_L > 0 ? 'forward' : 'backward');
                }
                if (speed_R !== null) {
                    setMotor('Right', Math.abs(speed_R), speed_R > 0 ? 'forward' : 'backward');
                }
            }
        });

        $loc.roll = new Sk.builtin.func(function (self, speed, heading) {
            const _speed = Sk.ffi.remapToJs(speed);
            const _heading = Sk.ffi.remapToJs(heading);
            if (SpheroWebBLEAPI.isConnected) {
                SpheroWebBLEAPI.roll(_speed, _heading);
            } else {
                roll_simu(self, _speed, _heading);
            }
        });

        $loc.setHeading = new Sk.builtin.func(function (self, heading) {
            const _heading = Sk.ffi.remapToJs(heading);
            if (SpheroWebBLEAPI.isConnected) {
                SpheroWebBLEAPI.setHeading(_heading);
            } else {
                self.heading = _heading;
            }
        });

        $loc.get_fall_detection = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.bool(SpheroWebBLEAPI.collision);
            } else {
                return new Sk.builtin.bool(RobotSimulator.checkingCanvasRobotCollisions() || RobotSimulator.checkObstacleCollisions());
            }
        });

        $loc.get_pitch = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.float_(SpheroWebBLEAPI.get_pitch());
            } else {
                return new Sk.builtin.float_();
            }
        });

        $loc.get_roll = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.float_(SpheroWebBLEAPI.get_roll());
            } else {
                return new Sk.builtin.float_();
            }
        });

        $loc.get_yaw = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.float_(SpheroWebBLEAPI.get_yaw());
            } else {
                return new Sk.builtin.float_();
            }
        });

        $loc.get_accelerometer_x = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.float_(SpheroWebBLEAPI.get_accelerometer_x());
            } else {
                return new Sk.builtin.float_();
            }
        });

        $loc.get_accelerometer_y = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.float_(SpheroWebBLEAPI.get_accelerometer_y());
            } else {
                return new Sk.builtin.float_();
            }
        });

        $loc.get_accelerometer_z = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.float_(SpheroWebBLEAPI.get_accelerometer_z());
            } else {
                return new Sk.builtin.float_();
            }
        });

        $loc.get_gyroscope_x = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.float_(SpheroWebBLEAPI.get_gyroscope_x());
            } else {
                return new Sk.builtin.float_();
            }
        });

        $loc.get_gyroscope_y = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.float_(SpheroWebBLEAPI.get_gyroscope_y());
            } else {
                return new Sk.builtin.float_();
            }
        });

        $loc.get_gyroscope_z = new Sk.builtin.func(function (self) {
            if (SpheroWebBLEAPI.isConnected) {
                return new Sk.builtin.float_(SpheroWebBLEAPI.get_gyroscope_z());
            } else {
                return new Sk.builtin.float_();
            }
        });
    });

    return sphero;
};