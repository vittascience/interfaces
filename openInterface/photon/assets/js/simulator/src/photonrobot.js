// photonrobot module for Photon

const $builtinmodule = function () {

    const photonrobot = {};

    (() => {
        // Création des éléments nécessaires
        const batteryContainer = document.createElement('div');
        batteryContainer.classList.add('battery-container');

        const battery = document.createElement('div');
        battery.classList.add('battery');

        const batteryLevel = document.createElement('div');
        batteryLevel.classList.add('battery-level');
        batteryLevel.id = 'batteryLevel';

        const batteryTip = document.createElement('div');
        batteryTip.classList.add('battery-tip');

        // Ajout de batteryLevel dans battery
        battery.appendChild(batteryLevel);

        // Ajout de battery et batteryTip dans batteryContainer
        batteryContainer.appendChild(batteryTip);
        batteryContainer.appendChild(battery);

        // Ajout du batteryContainer à l'élément ayant pour ID 'photon-battery'
        const photonBattery = document.querySelector('#photon-battery > div.module-body.body-input');
        if (photonBattery) {
            photonBattery.appendChild(batteryContainer);
            const module = Simulator.getModuleByKey("photon-battery");
            Simulator.setAnimator(module, module.id, '50');
        }
    })();

    photonrobot.Color = new Sk.misceval.buildClass(photonrobot, function ($gbl, $loc) {
        $loc.lightblue = 1;  // lightblue = 1
        $loc.yellow = 2;        // yellow = 2
        $loc.red = 3;              // red = 3
        $loc.lightgreen = 4; // lightgreen = 4
        $loc.turquoise = 5;  // turquoise = 5
        $loc.darkgreen = 6;  // darkgreen = 6
        $loc.blue = 7;            // blue = 7
        $loc.purple = 8;        // purple = 8
        $loc.orange = 9;        // orange = 9
        $loc.pink = 10;            // pink = 10
        $loc.white = 11;          // white = 11
        $loc.black = 12;          // black = 12
    });

    photonrobot.ColorMode = new Sk.misceval.buildClass(photonrobot, function ($gbl, $loc) {
        $loc.eyes = 1; // eyes
        $loc.ears = 2; // ears
        $loc.both = 3; // both
    });

    photonrobot.Sound = new Sk.misceval.buildClass(photonrobot, function ($gbl, $loc) {
        $loc.cow = 36;
        $loc.dog = 37;
        $loc.boar = 31;
        $loc.chick = 33;
        $loc.frog = 40;
        $loc.sheep = 73;
        $loc.cuckoo = 80;
        $loc.wolf = 72;
        $loc.chicken = 34;
        $loc.donkey = 39;
        $loc.owl = 43;
        $loc.goat = 41;
        $loc.rooster = 35;
        $loc.angry_dog = 38;
        $loc.pig = 44;
        $loc.cat = 32;
        $loc.horse = 42;

        $loc.yahoo = 61;
        $loc.aaa = 27;
        $loc.approval = 29;
        $loc.be_be_be = 54;
        $loc.change_decision = 57;
        $loc.yuck = 60;
        $loc.laughing_mad = 64;
        $loc.nice = 65;
        $loc.ooo = 66;
        $loc.angry = 28;
        $loc.fear = 59;
        $loc.sad = 68;
        $loc.sigh = 56;
        $loc.disagreement = 58;
        $loc.pplplplplp = 67;
        $loc.wow = 70;
        $loc.bleah = 55;
        $loc.laughing = 63;
        $loc.positive_surprise = 69;
        $loc.woooow = 71;
        $loc.jupiyeah = 62;
        $loc.awesome = 30;

        $loc.siren_ambulance = 50;
        $loc.siren_fire_brigade = 51;
        $loc.siren_police = 52;
    });

    photonrobot.SpecialBehaviors = new Sk.misceval.buildClass(photonrobot, function ($gbl, $loc) {
        $loc.boo = 1;
        $loc.shh = 2;
        $loc.cold = 3;
        $loc.fart = 4;
        $loc.hic = 5;
        $loc.sneeze = 6;
    });

    photonrobot.photon = new Sk.misceval.buildClass(photonrobot, function ($gbl, $loc) {

        const change_color_simu = function (color, mode) {
            const photon = document.getElementById("board-viewer").contentDocument;
            const eyes = photon.querySelector('#eyes');
            const ears = photon.querySelector('#ears');
            switch (mode) {
                case 1:
                    eyes.children[0].style.fill = color;
                    eyes.children[1].style.fill = color;
                    break;
                case 2:
                    ears.children[2].style.fill = color;
                    ears.children[3].style.fill = color;
                    break;
                default:
                    eyes.children[0].style.fill = color;
                    eyes.children[1].style.fill = color;
                    ears.children[2].style.fill = color;
                    ears.children[3].style.fill = color;
            }
        };

        const change_color_ble = function (color, mode) {
            switch (mode) {
                case 1:
                    PhotonWebBLEAPI.setEyesColor(color[0], color[1], color[2], 0x02);
                    break;
                case 2:
                    PhotonWebBLEAPI.setEarsColor(color[0], color[1], color[2], 0x02);
                    break;
                default:
                    PhotonWebBLEAPI.setEyesAndEarsColor(color[0], color[1], color[2], 0x02);
            }
        };

        const change_color = function (color, mode) {
            const colorMapping = {
                1: 'rgb(173, 216, 230)',  // lightblue
                2: 'rgb(255, 255, 0)',    // yellow
                3: 'rgb(255, 0, 0)',      // red
                4: 'rgb(144, 238, 144)',  // lightgreen
                5: 'rgb(64, 224, 208)',   // turquoise
                6: 'rgb(0, 100, 0)',      // darkgreen
                7: 'rgb(0, 0, 255)',      // blue
                8: 'rgb(128, 0, 128)',    // purple
                9: 'rgb(255, 165, 0)',    // orange
                10: 'rgb(255, 192, 203)', // pink
                11: 'rgb(255, 255, 255)', // white
                12: 'rgb(0, 0, 0)'        // black
            };
            const _color = colorMapping[Sk.ffi.remapToJs(color)];
            const _mode = Sk.ffi.remapToJs(mode);
            if (PhotonWebBLEAPI.isConnected) {
                change_color_ble(_color, _mode);
            } else {
                change_color_simu(_color, _mode);
            }
        };
        $loc.change_color = new Sk.builtin.func(change_color);

        const change_color_rgb = function (r, g, b, mode) {
            const rgb = [Sk.ffi.remapToJs(r), Sk.ffi.remapToJs(g), Sk.ffi.remapToJs(b)];
            const _mode = Sk.ffi.remapToJs(mode);
            if (PhotonWebBLEAPI.isConnected) {
                change_color_ble(rgb, _mode);
            } else {
                change_color_simu(`rgb(${rgb.join(',')})`, _mode);
            }
        };
        $loc.change_color_rgb = new Sk.builtin.func(change_color_rgb);

        const make_sound = function (sound) {
            const _sound = Sk.ffi.remapToJs(sound);
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.playSound(_sound, 0x02);
            } else {

            }
        };
        $loc.make_sound = new Sk.builtin.func(make_sound);

        const special_behavior = function (sound) {
            const _sound = Sk.ffi.remapToJs(sound);
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.triggerSpecialBehavior(_sound, 0x02);
            } else {

            }
        };
        $loc.special_behavior = new Sk.builtin.func(special_behavior);

        const setMotor = function (motorSide, speed, direction) {
            $('#photon-motor' + motorSide + '_value').html(speed);
            if (direction !== 'stop') {
                $('.photon-motor' + motorSide).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
            } else {
                $('.photon-motor' + motorSide).css('animation', 'none');
            }
        };

        const setMotors = function (left_speed, left_direction, right_speed, right_direction) {
            setMotor('Left', left_speed, left_direction);
            setMotor('Right', right_speed, right_direction);
        };

        const convertSpeed = function (speed) {
            // Assurer que la valeur est dans la plage 0 à 100
            if (speed <= 0) return 100;
            if (speed >= 100) return 0;

            // Transformation de 0-100 vers 99-0 (99 => min, 0 => max)
            return 99 - (speed / 100) * 99;
        };

        const go_forward = function (distance, speed) {
            const _distance = Sk.ffi.remapToJs(distance);
            let _speed = Sk.ffi.remapToJs(speed);
            if (_speed < 0) {
                _speed = 0;
            }
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.go(_distance, _speed + 100); // speed (0-99 backward, 100 - stop, 101-200 forward)
            } else {
                setMotors(_speed, 'forward', _speed, 'forward');
                return new Sk.misceval.promiseToSuspension(new Promise((resolve) => {
                    let robotPos = RobotSimulator.getCurrentRobotPosition();
                    let x_pos = roundFloat(robotPos.x * CanvasUtils.getScaleFactor(RobotSimulator.robot.AXIS_UNIT)).toFixed(2);
                    let y_pos = roundFloat(robotPos.y * CanvasUtils.getScaleFactor(RobotSimulator.robot.AXIS_UNIT)).toFixed(2);
                    const targetPos = {
                        x1: parseInt(x_pos) + _distance,
                        y1: parseInt(y_pos) + _distance,
                        x2: parseInt(x_pos) - _distance,
                        y2: parseInt(y_pos) - _distance
                    };
                    const go_forward_interval = setInterval(() => {
                        robotPos = RobotSimulator.getCurrentRobotPosition();
                        x_pos = roundFloat(robotPos.x * CanvasUtils.getScaleFactor(RobotSimulator.robot.AXIS_UNIT)).toFixed(2);
                        y_pos = roundFloat(robotPos.y * CanvasUtils.getScaleFactor(RobotSimulator.robot.AXIS_UNIT)).toFixed(2);
                        if (x_pos >= targetPos.x1 || y_pos >= targetPos.y1 || x_pos <= targetPos.x2 || y_pos <= targetPos.y2) {
                            setMotors(0, 'stop', 0, 'stop');
                            resolve(clearInterval(go_forward_interval))
                        }
                    }, 100);
                }));
            }
        };
        $loc.go_forward = new Sk.builtin.func(go_forward);

        const go_backward = function (distance, speed) {
            const _distance = Sk.ffi.remapToJs(distance);
            const _speed = Sk.ffi.remapToJs(speed);
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.go(_distance, convertSpeed(_speed));
            } else {
                setMotors(_speed, 'backward', _speed, 'backward');
                return new Sk.misceval.promiseToSuspension(new Promise((resolve) => {
                    let robotPos = RobotSimulator.getCurrentRobotPosition();
                    let x_pos = roundFloat(robotPos.x * CanvasUtils.getScaleFactor(RobotSimulator.robot.AXIS_UNIT)).toFixed(2);
                    let y_pos = roundFloat(robotPos.y * CanvasUtils.getScaleFactor(RobotSimulator.robot.AXIS_UNIT)).toFixed(2);
                    const targetPos = {
                        x1: parseInt(x_pos) + _distance,
                        y1: parseInt(y_pos) + _distance,
                        x2: parseInt(x_pos) - _distance,
                        y2: parseInt(y_pos) - _distance
                    };
                    const go_forward_interval = setInterval(() => {
                        robotPos = RobotSimulator.getCurrentRobotPosition();
                        x_pos = roundFloat(robotPos.x * CanvasUtils.getScaleFactor(RobotSimulator.robot.AXIS_UNIT)).toFixed(2);
                        y_pos = roundFloat(robotPos.y * CanvasUtils.getScaleFactor(RobotSimulator.robot.AXIS_UNIT)).toFixed(2);
                        if (x_pos >= targetPos.x1 || y_pos >= targetPos.y1 || x_pos <= targetPos.x2 || y_pos <= targetPos.y2) {
                            setMotors(0, 'stop', 0, 'stop');
                            resolve(clearInterval(go_forward_interval))
                        }
                    }, 100);
                }));
            }
        };
        $loc.go_backward = new Sk.builtin.func(go_backward);

        const go_forward_infinity = function (speed) {
            let _speed = Sk.ffi.remapToJs(speed);
            if (_speed < 0) {
                _speed = 0;
            }
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.driveForever(_speed + 100); // speed (0-99 backward, 100 - stop, 101-200 forward)
            } else {
                setMotors(_speed, 'forward', _speed, 'forward');
            }
        };
        $loc.go_forward_infinity = new Sk.builtin.func(go_forward_infinity);

        const go_backward_infinity = function (speed) {
            const _speed = Sk.ffi.remapToJs(speed);
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.driveForever(convertSpeed(_speed));
            } else {
                setMotors(_speed, 'backward', _speed, 'backward');
            }
        };
        $loc.go_backward_infinity = new Sk.builtin.func(go_backward_infinity);

        const rotate_left_infinity = function (speed) {
            const _speed = Sk.ffi.remapToJs(speed);
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.driveForever(_speed, 0x00);
            } else {
                setMotors(_speed, 'backward', _speed, 'forward');
            }
        };
        $loc.rotate_left_infinity = new Sk.builtin.func(rotate_left_infinity);

        const rotate_right_infinity = function (speed) {
            const _speed = Sk.ffi.remapToJs(speed);
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.driveForever(_speed, 0x01);
            } else {
                setMotors(_speed, 'forward', _speed, 'backward');
            }
        };
        $loc.rotate_right_infinity = new Sk.builtin.func(rotate_right_infinity);

        const rotate_left = function (angle, speed) {
            let _speed = Sk.ffi.remapToJs(speed);
            let _angle = Sk.ffi.remapToJs(angle);
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.rotateToAngle(convertSpeed(_speed), _angle);
            } else {
                setMotors(_speed, 'backward', _speed, 'forward');
                return new Sk.misceval.promiseToSuspension(new Promise(async (resolve) => {
                    const targetAngle = RobotSimulator.robot.angle - _angle;
                    console.log("Target :" + targetAngle);
                    const rotate_left_interval = setInterval(() => {
                        if (RobotSimulator.robot.angle + targetAngle * 0.02 <= targetAngle) {
                            RobotSimulator.robot.angle = targetAngle;
                            console.log("Current :" + RobotSimulator.robot.angle)
                            setMotors(0, 'stop', 0, 'stop');
                            resolve(clearInterval(rotate_left_interval))
                        }
                    }, 10);
                }));
            }
        };
        $loc.rotate_left = new Sk.builtin.func(rotate_left);

        const rotate_right = function (angle, speed) {
            let _speed = Sk.ffi.remapToJs(speed);
            let _angle = Sk.ffi.remapToJs(angle);
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.rotateToAngle(_speed + 100, _angle);
            } else {
                setMotors(_speed, 'forward', _speed, 'backward');
                return new Sk.misceval.promiseToSuspension(new Promise(async (resolve) => {
                    const targetAngle = RobotSimulator.robot.angle + _angle;
                    console.log("Target :" + targetAngle);
                    const rotate_right_interval = setInterval(() => {
                        if (RobotSimulator.robot.angle + targetAngle * 0.02 >= targetAngle) {
                            RobotSimulator.robot.angle = targetAngle;
                            console.log("Current :" + RobotSimulator.robot.angle)
                            setMotors(0, 'stop', 0, 'stop');
                            resolve(clearInterval(rotate_right_interval))
                        }
                    }, 10);
                }));
            }
        };
        $loc.rotate_right = new Sk.builtin.func(rotate_right);

        const stop = function () {
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.stopRobot();
            } else {
                setMotors(0, 'stop', 0, 'stop');
            }
        };
        $loc.stop = new Sk.builtin.func(stop);

        const follow_line = function () {
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.startLineFollower();
            } else {
                throw new Sk.builtin.ImportError('photon.follow_line() is not implemented yet');
            }
        };
        $loc.follow_line = new Sk.builtin.func(follow_line);

        const get_distance_from_obstacle = function () {
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.requestSensorData();
                if (PhotonWebBLEAPI.requestSensorsData == null) {
                    return Simulator.replay();
                }
                return new Sk.builtin.int_(PhotonWebBLEAPI.requestSensorsData.distance);
            } else {
                return new Sk.builtin.int_(parseInt($('#photon-distance_value_d').text()));
            }
        };
        $loc.get_distance_from_obstacle = new Sk.builtin.func(get_distance_from_obstacle);

        const get_light = function () {
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.requestSensorData();
                if (PhotonWebBLEAPI.requestSensorsData == null) {
                    return Simulator.replay();
                }
                return new Sk.builtin.bool(PhotonWebBLEAPI.requestSensorsData.sensors.light);
            } else {
                return new Sk.builtin.bool(Simulator.getSliderValue(`photon-light`, '_v'));
            }
        };
        $loc.get_light = new Sk.builtin.func(get_light);

        const get_battery = function () {
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.requestSensorData();
                if (PhotonWebBLEAPI.requestSensorsData == null) {
                    return Simulator.replay();
                }
                return new Sk.builtin.int_(PhotonWebBLEAPI.requestSensorsData.batteryStatus);
            } else {
                return new Sk.builtin.int_(Simulator.getSliderValue(`photon-battery`, '_v'));

            }
        };
        $loc.get_battery = new Sk.builtin.func(get_battery);

        const get_line_sensors = function () {
            let lineFR = new Sk.builtin.bool($("#photon-line-sensor2_value_v").html() == "OFF" ? 0 : 1); // Front Right
            let lineFC = new Sk.builtin.bool(false); // Front Center
            let lineFL = new Sk.builtin.bool($("#photon-line-sensor1_value_v").html() == "OFF" ? 0 : 1); // Front Left
            let lineR = new Sk.builtin.bool(false); // Rear
            if (PhotonWebBLEAPI.isConnected) {
                PhotonWebBLEAPI.requestSensorData();
                if (PhotonWebBLEAPI.requestSensorsData == null) {
                    return Simulator.replay();
                }
                lineFR = new Sk.builtin.bool(parseInt(PhotonWebBLEAPI.requestSensorsData.sensors.lineFR)); // Front Right
                lineFC = new Sk.builtin.bool(parseInt(PhotonWebBLEAPI.requestSensorsData.sensors.lineFC)); // Front Center
                lineFL = new Sk.builtin.bool(parseInt(PhotonWebBLEAPI.requestSensorsData.sensors.lineFL)); // Front Left
                lineR = new Sk.builtin.bool(parseInt(PhotonWebBLEAPI.requestSensorsData.sensors.lineR)); // Rear
                return new Sk.builtin.list([lineFR, lineFC, lineFL, lineR]);
            }
            return new Sk.builtin.list([lineFR, lineFC, lineFL, lineR]);
        };
        $loc.get_line_sensors = new Sk.builtin.func(get_line_sensors);
    });

    return photonrobot;
};