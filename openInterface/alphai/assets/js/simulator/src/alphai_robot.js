// alphai_robot module

const $builtinmodule = function (name) {

    const alphai_robot = {};
    alphai_robot.__name__ = new Sk.builtin.str("alphai_robot");

    alphai_robot._data = {
        volume: 1,
        audioCtx: null
    };

    RobotSimulator.robot.camera.setResolution(160, 120);

    const setMotor = function (motorSide, speed, direction) {
        $('#alphai-motor' + motorSide + '_value').html(speed + '%');
        if (direction != 'stop') {
            $('.alphai-motor' + motorSide).css('animation', 'rotation-' + direction + ' ' + (60 / (speed / 100 * RobotSimulator.robot.MAX_SPEED)) + 's infinite linear');
        } else {
            $('.alphai-motor' + motorSide).css('animation', 'none');
        }
    };

    const stopMusic = function (module, id) {
        if (alphai_robot._data.osc) {
            alphai_robot._data.osc.stop();
            delete alphai_robot._data.osc;
        }
    };

    const startOscillator = function (freq) {
        const volume = alphai_robot._data.audioCtx.createGain();
        volume.connect(alphai_robot._data.audioCtx.destination);
        volume.gain.value = alphai_robot._data.volume;
        alphai_robot._data.osc = alphai_robot._data.audioCtx.createOscillator();
        alphai_robot._data.osc.type = 'sine';
        alphai_robot._data.osc.frequency.value = freq;
        alphai_robot._data.osc.connect(volume);
        alphai_robot._data.osc.start();
    };

    alphai_robot.print_message = new Sk.builtin.func(function (message) {
        InterfaceMonitor.writeConsole("🤖 " + Sk.ffi.remapToJs(message), "neutral");
        return new Sk.builtin.none();
    });

    alphai_robot.stop = new Sk.builtin.func(function () {
        setMotor('Left', 0, 'stop');
        setMotor('Right', 0, 'stop');
        return new Sk.builtin.none();
    });

    alphai_robot.set_motor = new Sk.builtin.func(function (speedLeft, speedRight) {
        const directionLeft = (speedLeft.v > 0 ? "forward" : "backward");
        const directionRight = (speedRight.v > 0 ? "forward" : "backward");
        setMotor('Left', Math.abs(speedLeft.v), directionLeft);
        setMotor('Right', Math.abs(speedRight.v), directionRight);
        return new Sk.builtin.none();
    });

    alphai_robot.get_distance = new Sk.builtin.func(function () {
        const t = Simulator.getSliderValue("alphai-ultrasonic", "_t");
        return new Sk.builtin.int_(roundFloat(Simulator.Mosaic.specific.calculs.getDistance(t), 1));
    });

    alphai_robot.get_infra_red = new Sk.builtin.func(function () {
        const sensor_values = [
            Simulator.getSliderValue("alphai-trsensor1"),
            Simulator.getSliderValue("alphai-trsensor2"),
            Simulator.getSliderValue("alphai-trsensor3"),
            Simulator.getSliderValue("alphai-trsensor4"),
            Simulator.getSliderValue("alphai-trsensor5")
        ];
        return Sk.ffi.remapToPy(sensor_values);
    });

    alphai_robot.get_blockade = new Sk.builtin.func(function () {
        return new Sk.builtin.bool(RobotSimulator.checkingCanvasRobotCollisions() || RobotSimulator.checkObstacleCollisions());
    });

    alphai_robot.set_camera = new Sk.builtin.func(function (value) {
        $('#alphai-camera_value').html(Sk.ffi.remapToJs(value));
        const resolutionMatch = Sk.ffi.remapToJs(value).match(/(\d+)\s*[x,]\s*(\d+)/i);
        if (resolutionMatch && RobotSimulator.robot.camera) {
            const width = parseInt(resolutionMatch[1]);
            const height = parseInt(resolutionMatch[2]);
            RobotSimulator.robot.camera.setResolution(width, height);
        } else {
            console.warn("Resolution format not recognized. Use 'WIDTHxHEIGHT' or 'WIDTH, HEIGHT'.");
        }
        return new Sk.builtin.none();
    });

    alphai_robot.get_camera = new Sk.builtin.func(function () {
        const data = RobotSimulator.robot.camera.getCameraData();
        return Sk.ffi.remapToPy(data);
    });

    alphai_robot.set_leds = new Sk.builtin.func(function (r, g, b) {
        const r_ = Math.max(0, Math.min(255, Sk.ffi.remapToJs(r)));
        const g_ = Math.max(0, Math.min(255, Sk.ffi.remapToJs(g)));
        const b_ = Math.max(0, Math.min(255, Sk.ffi.remapToJs(b)));
        $("#alphai-leds .circle-in").attr("fill", "rgb(" + r_ + "," + g_ + "," + b_ + ")");
        $("#alphai-leds_value").html("R: " + r_ + "<br>G: " + g_ + "<br>B: " + b_);
        return new Sk.builtin.none();
    });

    alphai_robot.set_buzzer = new Sk.builtin.func(function (state) {
        const module = Simulator.getModuleByKey(`alphai-buzzer`);
        const id = module.id;
        const defaultFrequency = 440;
        const _state = Sk.ffi.remapToJs(state);

        return Simulator.runAsync(function (resolve, reject) {
            if (_state) {
                if (!alphai_robot._data.audioCtx) {
                    alphai_robot._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    Simulator.audioContext = alphai_robot._data.audioCtx;
                }
                if (!alphai_robot._data.osc) {
                    Simulator.setAnimator(module, id, defaultFrequency);
                    startOscillator(defaultFrequency);
                }
            } else {
                stopMusic();
                Simulator.setAnimator(module, id, 0);
            }

            if (Simulator.stop_flag) {
                stopMusic();
                Simulator.setAnimator(module, id, 0);

            }
            resolve();
        });
    });

    return alphai_robot;
};