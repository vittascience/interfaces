const $builtinmodule = function () {

    const PicoAutonomousRobotics = {};

    PicoAutonomousRobotics.KitronikPicoRobotBuggy = new Sk.misceval.buildClass(PicoAutonomousRobotics, function ($gbl, $loc) {

        const MAX_SPEED = 100;
        const MIN_SPEED = 60;

        const isSet = function(element) {
            return (typeof element !== 'undefined' && element !== null);
        };

        const setMotor = function (motor, speed, dir = null) {
            const motorValue = document.querySelector(`#kitro-motor${motor}_value`);
            const kitroMotor = document.querySelector(`.kitro-motor${motor}`);
            if (!isSet(motorValue) || !isSet(kitroMotor)) return;
            motorValue.innerHTML = `${roundFloat(speed, 1)}%`;
            if (speed !== 0 && dir !== null) {
                kitroMotor.style.animation = `rotation-${dir} ${(60 / Math.abs(speed / 100 * MAX_SPEED))}s infinite linear`;
            } else {
                kitroMotor.style.animation = 'none';
            }
        };

        const setLED = function (selector, rgb) {
            const RGBLed = document.querySelector(selector);
            if (!isSet(RGBLed)) return;
            RGBLed.style.background = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        };

        PicoAutonomousRobotics__init__ = function (self) {
            self.unit = 'cm';
            self.LEDs = {
                0: [75, 75, 75],
                1: [75, 75, 75],
                2: [75, 75, 75],
                3: [75, 75, 75]
            };
            const board_toggler = document.getElementById('simulator-board-toggler');
            if (board_toggler !== null && !board_toggler.classList.contains('closed')) {
                Simulator.toggleBoardDisplay();
            }
            setMotor('Left', 0);
            setMotor('Right', 0);
        };
        $loc.__init__ = new Sk.builtin.func(PicoAutonomousRobotics__init__);

        $loc.motorOn = new Sk.builtin.func(function (self, motor, direction, speed) {
            if (Math.abs(speed.v) > MAX_SPEED || Math.abs(speed.v) < MIN_SPEED) {
                UIManager.showErrorMessage("error-message", `'${speed.v}' : La vitesse doit être comprise entre 70% et 100%`);
                return new Sk.builtin.none();
            }
            switch (motor.v) {
                case "l":
                    if (direction.v === "f") {
                        setMotor('Left', Math.abs(speed.v), "forward");
                    } else {
                        setMotor('Left', Math.abs(speed.v), "backward");
                    }
                    break;
                default:
                    if (direction.v === "f") {
                        setMotor('Right', Math.abs(speed.v), "forward");
                    } else {
                        setMotor('Right', Math.abs(speed.v), "backward");
                    }
                    break;
            }
            return new Sk.builtin.none();
        });

        $loc.motorOff = new Sk.builtin.func(function (self, motor) {
            (motor.v === "l" ? setMotor('Left', 0) : setMotor('Right', 0));
            return new Sk.builtin.none();
        });

        $loc.setMeasurementsTo = new Sk.builtin.func(function (self, unit) {
            self.unit = unit.v;
            return new Sk.builtin.none();
        });

        $loc.getDistance = new Sk.builtin.func(function (self, sensor) {
            const duration = $(`#kitro-hcsr04-${sensor.v === "f" ? 'front' : 'back'}_slider_d`).slider('option', 'value');
            return new Sk.builtin.float_(roundFloat(Simulator.Mosaic.grove.calculs.getDistance(duration), 2));
        });

        $loc.getDuration = new Sk.builtin.func(function (self, sensor) {
            const duration = $(`#kitro-hcsr04-${sensor.v === "f" ? 'front' : 'back'}_slider_d`).slider('option', 'value');
            return new Sk.builtin.float_(roundFloat(duration, 1));
        });

        $loc.setLED = new Sk.builtin.func(function (self, led, color) {
            self.LEDs[led.v] = Sk.ffi.remapToJs(color);
            return new Sk.builtin.none();
        });

        $loc.show = new Sk.builtin.func(function (self) {
            for (const key in Object.keys(self.LEDs)) {
                const rgb = self.LEDs[key];
                switch (key) {
                    case '0':
                        setLED('#kitro-FrontLeftRGBLed_anim', rgb);                        
                        break;
                    case '1':
                        setLED('#kitro-FrontRightRGBLed_anim', rgb);
                        break;
                    case '2':
                        setLED('#kitro-BackRightRGBLed_anim', rgb);
                        break;
                    case '3':
                        setLED('#kitro-BackLeftRGBLed_anim', rgb);
                        break;
                }
            }
            return new Sk.builtin.none();
        });

        $loc.getRawLFValue = new Sk.builtin.func(function (self, sensor) {
            switch (sensor.v) {
                case 'l':
                    return new Sk.builtin.int_(Simulator.getSliderValue("kitro-finderLeft", "_v") ? 25000 : 10000);
                case 'r':
                    return new Sk.builtin.int_(Simulator.getSliderValue("kitro-finderRight", "_v") ? 25000 : 10000);
                default:
                    return new Sk.builtin.int_(Simulator.getSliderValue("kitro-finderCentral", "_v") ? 25000 : 10000);
            }
        });

    }, "KitronikPicoRobotBuggy", [])

    return PicoAutonomousRobotics;
};
