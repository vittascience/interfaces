// STM32 - stm32_alphabot_v2 module

function $builtinmodule(name) {
    const stm32_alphabot_v2 = {};
    const import_modules = Object.create(null);
    return Sk.misceval.chain(
        Sk.builtin.__import__('pyb', Sk.globals),
        (pyb_mod) => {
            import_modules.pyb = pyb_mod.$d;
        },
        () => stm32_alphabot_v2_mod(stm32_alphabot_v2, import_modules)
    );
};

function stm32_alphabot_v2_mod(stm32_alphabot_v2, import_modules) {
    const pyb = import_modules.pyb;
    stm32_alphabot_v2.ALPHABOT_V2_PIN_IR = new Sk.builtin.str('D6');

    const AlphaBot_v2 = function ($gbl, $loc) {

        const MAX_SPEED = 200;

        const AlphaBot_v2__init__ = function (self) {
            self.leftDir = 'forward';
            self.rightDir = 'forward';
            setMotor('Left', self.leftDir, 0);
            setMotor('Right', self.rightDir, 0);
        };

        $loc.__init__ = new Sk.builtin.func(AlphaBot_v2__init__);

        $loc.pin_IR = new pyb.Pin();
        $loc.pin_IR.tp$init([stm32_alphabot_v2.ALPHABOT_V2_PIN_IR, pyb.Pin.prototype.IN]);

        $loc.i2c = new Sk.builtin.str("machine.I2C(1)");

        const speedError = function (speed) {
            if (speed > 100 || speed < 0) {
                UIManager.showErrorMessage("error-message", 'La vitesse des moteurs doit être comprise entre 0 et 100');
                return true;
            } else {
                if (!$("error-message").prevObject[0].all['error-message'].innerHTML) {
                    UIManager.resetMessage("error-message");
                }
                return false;
            }
        };

        const setMotor = function (motor, dir, speed) {
            $('#alphabot-motor' + motor + '_value').html(roundFloat(speed, 1) + " %");
            if (speed != 0) {
                $('.alphabot-motor' + motor).css('animation', 'rotation-' + dir + ' ' + (60 / Math.abs(speed / 100 * MAX_SPEED)) + 's infinite linear');
            } else {
                $('.alphabot-motor' + motor).css('animation', 'none');
            }
        };

        RobotSimulator.robot.setMotorsInModules = function (speedL, speedR) {
            setMotor('Left', speedL > 0 ? 'forward' : 'backward', Math.abs(speedL));
            setMotor('Right', speedL > 0 ? 'forward' : 'backward', Math.abs(speedR));
        };

        $loc.setPWMA = new Sk.builtin.func(function (self, value) {
            if (!speedError(value.v)) {
                setMotor('Left', self.leftDir, value.v);
            }
        });

        $loc.setPWMB = new Sk.builtin.func(function (self, value) {
            if (!speedError(value.v)) {
                setMotor('Right', self.rightDir, value.v);
            }
        });

        const setMotorLeft = function (self, speed) {
            Sk.builtin.pyCheckArgsLen("setMotorLeft", arguments.length, 1, 2);
            if (speed.v >= 0 && speed.v <= 100) {
                self.leftDir = 'forward';
                setMotor('Left', self.leftDir, speed.v);
            } else {
                self.leftDir = 'backward';
                setMotor('Left', self.leftDir, -speed.v);
            }
        };

        setMotorLeft.co_varnames = ['self', 'speed'];
        setMotorLeft.$defaults = [new Sk.builtin.float_(0)];

        $loc.setMotorLeft = new Sk.builtin.func(setMotorLeft);

        const setMotorRight = function (self, speed) {
            Sk.builtin.pyCheckArgsLen("setMotorRight", arguments.length, 1, 2);
            if (speed.v >= 0 && speed.v <= 100) {
                self.rightDir = 'forward';
                setMotor('Right', self.rightDir, speed.v);
            } else {
                self.rightDir = 'backward';
                setMotor('Right', self.rightDir, -speed.v);
            }
        };

        setMotorRight.co_varnames = ['self', 'speed'];
        setMotorRight.$defaults = [new Sk.builtin.float_(0)];

        $loc.setMotorRight = new Sk.builtin.func(setMotorRight);

        $loc.stop = new Sk.builtin.func(function (self) {
            setMotorLeft(self, new Sk.builtin.int_(0));
            setMotorRight(self, new Sk.builtin.int_(0));
        });

        const moveForward = function (self, speed, duration_ms) {
            setMotorLeft(self, speed);
            setMotorRight(self, speed);
            if (Sk.builtin.checkNone(duration_ms)) {
                return RobotSimulator.delayOnMovement(duration_ms.v);
            }
        };
        $loc.moveForward = new Sk.builtin.func(moveForward);

        const moveBackward = function (self, speed, duration_ms) {
            setMotorLeft(self, new Sk.builtin.int_(-speed.v));
            setMotorRight(self, new Sk.builtin.int_(-speed.v));
            if (Sk.builtin.checkNone(duration_ms)) {
                return RobotSimulator.delayOnMovement(duration_ms.v);
            }
        };
        $loc.moveBackward = new Sk.builtin.func(moveBackward);

        const turnLeft = function (self, speed, duration_ms) {
            setMotorLeft(self, new Sk.builtin.int_(-speed.v));
            setMotorRight(self, speed);
            if (Sk.builtin.checkNone(duration_ms)) {
                return RobotSimulator.delayOnMovement(duration_ms.v);
            }
        };
        $loc.turnLeft = new Sk.builtin.func(turnLeft);

        const turnRight = function (self, speed, duration_ms) {
            setMotorLeft(self, speed);
            setMotorRight(self, new Sk.builtin.int_(-speed.v));
            if (Sk.builtin.checkNone(duration_ms)) {
                return RobotSimulator.delayOnMovement(duration_ms.v);
            }
        };
        $loc.turnRight = new Sk.builtin.func(turnRight);

        const TRSensors_calibrate = function (self) { };
        $loc.TRSensors_calibrate = new Sk.builtin.func(TRSensors_calibrate);

        $loc.calibrateLineFinder = new Sk.builtin.func(function (self) {
            InterfaceMonitor.writeConsole("[Alpha_INFO]: TR sensors calibration ...")
            for (let i = 0; i < 100; i++) {
                if (i < 25 || i >= 75) {
                    turnRight(self, new Sk.builtin.int_(20), new Sk.builtin.int_(50))
                    moveForward(self, new Sk.builtin.int_(20), new Sk.builtin.int_(50))
                } else {
                    turnLeft(self, new Sk.builtin.int_(20), new Sk.builtin.int_(50))
                    moveForward(self, new Sk.builtin.int_(20), new Sk.builtin.int_(50))
                }
                // TODO: calibration
                TRSensors_calibrate(self);
            }
            setMotorLeft(self, new Sk.builtin.int_(0));
            setMotorRight(self, new Sk.builtin.int_(0));
            InterfaceMonitor.writeConsole("Calibration done.");
        });

        const TRSensors_readLine = function (self, sensor) {
            const sensor_values = [
                $("#alphabot-trsensor1_slider").slider('option', 'value'),
                $("#alphabot-trsensor2_slider").slider('option', 'value'),
                $("#alphabot-trsensor3_slider").slider('option', 'value'),
                $("#alphabot-trsensor4_slider").slider('option', 'value'),
                $("#alphabot-trsensor5_slider").slider('option', 'value')
            ];
            if (sensor.v == 0) {
                return Sk.ffi.remapToPy(sensor_values);
            } else {
                return Sk.ffi.remapToPy(sensor_values[sensor.v - 1]);
            }
        };

        TRSensors_readLine.co_varnames = ['self', 'sensor'];
        TRSensors_readLine.$defaults = [new Sk.builtin.int_(0)];

        $loc.TRSensors_readLine = new Sk.builtin.func(TRSensors_readLine);

        const readUltrasonicDistance = function (self, length, timeout_us) {
            let sum = 0;
            let len = 15;
            if (length !== undefined) {
                len = length.v;
            }
            for (let i = 0; i < len; i++) {
                sum += parseInt($('#alphabot-ultrasonic_slider_d').slider('option', 'value'));
            }
            const t = sum / len;
            return new Sk.builtin.int_(roundFloat(Simulator.Mosaic.grove.calculs.getDistance(t), 1));
        };

        readUltrasonicDistance.co_varnames = ['self', 'length', 'timeout_us'];
        readUltrasonicDistance.$defaults = [Sk.builtin.none(), new Sk.builtin.int_(15), new Sk.builtin.int_(30000)];
        readUltrasonicDistance.co_numargs = 3;

        $loc.readUltrasonicDistance = new Sk.builtin.func(readUltrasonicDistance);

        $loc.controlBuzzer = new Sk.builtin.func(function (self, state) { });

        $loc.getJoystickValue = new Sk.builtin.func(function (self) {
            return Sk.builtin.none();
        });

        $loc.readInfrared = new Sk.builtin.func(function (self) { });

        $loc._pcf8574_write = new Sk.builtin.func(function (self, data) { });

        $loc._pcf8574_read = new Sk.builtin.func(function (self) { });

        $loc.getOLEDaddr = new Sk.builtin.func(function (self) { });
    };

    stm32_alphabot_v2.AlphaBot_v2 = new Sk.misceval.buildClass(stm32_alphabot_v2, AlphaBot_v2, "AlphaBot_v2", []);

    return stm32_alphabot_v2;
}
