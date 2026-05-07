// Eliobot - elio module

const $builtinmodule = function () {

    const elio = {};

    elio.__name__ = new Sk.builtin.str("elio");

    // ─────────────────────────────────────────────
    //  MOTORS
    // ─────────────────────────────────────────────
    elio.Motors = new Sk.misceval.buildClass(elio, function ($gbl, $loc) {

        $loc.motors = {
            motorLeft: ['forward', 0],
            motorRight: ['forward', 0],
        };

        const setMotors = function (direction, speed) {
            switch (direction) {
                case 'right':
                    $loc.motors.motorLeft[0] = 'forward';
                    $loc.motors.motorRight[0] = 'backward';
                    break;
                case 'left':
                    $loc.motors.motorLeft[0] = 'backward';
                    $loc.motors.motorRight[0] = 'forward';
                    break;
                default:
                    $loc.motors.motorLeft[0] = direction;
                    $loc.motors.motorRight[0] = direction;
                    break;
            }
            $loc.motors.motorLeft[1] = speed;
            $loc.motors.motorRight[1] = speed;
            $('#eliobot-motorLeft_value').html($loc.motors.motorLeft[1] + "%");
            $('#eliobot-motorRight_value').html($loc.motors.motorRight[1] + "%");
            if (speed !== 0) {
                const rpmL = 60 / (Math.abs($loc.motors.motorLeft[1]) / 255 * 133);
                const rpmR = 60 / (Math.abs($loc.motors.motorRight[1]) / 255 * 133);
                $('.eliobot-motorLeft').css('animation', 'rotation-' + $loc.motors.motorLeft[0] + ' ' + rpmL + 's infinite linear');
                $('.eliobot-motorRight').css('animation', 'rotation-' + $loc.motors.motorRight[0] + ' ' + rpmR + 's infinite linear');
            } else {
                $('.eliobot-motorLeft').css('animation', 'none');
                $('.eliobot-motorRight').css('animation', 'none');
            }
        };
        RobotSimulator.robot.setMotorsInModules = setMotors;

        const setMotor = function (motor, direction, speed) {
            switch (motor) {
                case 'right':
                    $loc.motors.motorRight[0] = direction;
                    $loc.motors.motorRight[1] = speed;
                    $('#eliobot-motorRight_value').html($loc.motors.motorRight[1] + "%");
                    if (speed !== 0) {
                        $('.eliobot-motorRight').css('animation', 'rotation-' + $loc.motors.motorRight[0] + ' ' + (60 / (Math.abs($loc.motors.motorRight[1]) / 255 * 133)) + 's infinite linear');
                    } else {
                        $('.eliobot-motorRight').css('animation', 'none');
                    }
                    break;
                case 'left':
                    $loc.motors.motorLeft[0] = direction;
                    $loc.motors.motorLeft[1] = speed;
                    $('#eliobot-motorLeft_value').html($loc.motors.motorLeft[1] + "%");
                    if (speed !== 0) {
                        $('.eliobot-motorLeft').css('animation', 'rotation-' + $loc.motors.motorLeft[0] + ' ' + (60 / (Math.abs($loc.motors.motorLeft[1]) / 255 * 133)) + 's infinite linear');
                    } else {
                        $('.eliobot-motorLeft').css('animation', 'none');
                    }
                    break;
            }
        };

        // ── __init__ ──────────────────────────────
        $loc.__init__ = new Sk.builtin.func(function (self, AIN1_pin, AIN2_pin, BIN1_pin, BIN2_pin, vBatt_pin) {
            self.AIN1 = Sk.ffi.remapToJs(AIN1_pin);
            self.AIN2 = Sk.ffi.remapToJs(AIN2_pin);
            self.BIN1 = Sk.ffi.remapToJs(BIN1_pin);
            self.BIN2 = Sk.ffi.remapToJs(BIN2_pin);
            self.vBatt = Sk.ffi.remapToJs(vBatt_pin);
        });

        // ── set_speed  ────────────────────
        $loc.set_speed = new Sk.builtin.func(function (speed) {
            return new Sk.builtin.int_(Sk.ffi.remapToJs(speed));
        });

        // ── move_forward ──────────────────────────
        const moveForward = function (self, speed) {
            setMotors('forward', Sk.ffi.remapToJs(speed));
            return Sk.builtin.none();
        };
        moveForward.co_varnames = ['self', 'speed'];
        moveForward.$defaults = [new Sk.builtin.int_(100)];
        $loc.move_forward = new Sk.builtin.func(moveForward);

        // ── move_backward ─────────────────────────
        const moveBackward = function (self, speed) {
            setMotors('backward', Sk.ffi.remapToJs(speed));
            return Sk.builtin.none();
        };
        moveBackward.co_varnames = ['self', 'speed'];
        moveBackward.$defaults = [new Sk.builtin.int_(100)];
        $loc.move_backward = new Sk.builtin.func(moveBackward);

        // ── turn_left ─────────────────────────────
        const turnLeft = function (self, speed) {
            setMotors('left', Sk.ffi.remapToJs(speed));
            return Sk.builtin.none();
        };
        turnLeft.co_varnames = ['self', 'speed'];
        turnLeft.$defaults = [new Sk.builtin.int_(100)];
        $loc.turn_left = new Sk.builtin.func(turnLeft);

        // ── turn_right ────────────────────────────
        const turnRight = function (self, speed) {
            setMotors('right', Sk.ffi.remapToJs(speed));
            return Sk.builtin.none();
        };
        turnRight.co_varnames = ['self', 'speed'];
        turnRight.$defaults = [new Sk.builtin.int_(100)];
        $loc.turn_right = new Sk.builtin.func(turnRight);

        // ── motor_stop ─────────────────────────────
        $loc.motor_stop = new Sk.builtin.func(function () {
            setMotors('forward', 0);
        });

        // ── slow_stop ─────────────────────────────
        $loc.slow_stop = new Sk.builtin.func(function () {
            setMotors('forward', 0);
        });

        // ── spin_left_wheel_forward ───────────────
        const spinLeftWheelForward = function (self, speed) {
            setMotor('left', 'forward', Sk.ffi.remapToJs(speed));
            return Sk.builtin.none();
        };
        spinLeftWheelForward.co_varnames = ['self', 'speed'];
        spinLeftWheelForward.$defaults = [new Sk.builtin.int_(100)];
        $loc.spin_left_wheel_forward = new Sk.builtin.func(spinLeftWheelForward);

        // ── spin_left_wheel_backward ──────────────
        const spinLeftWheelBackward = function (self, speed) {
            setMotor('left', 'backward', Sk.ffi.remapToJs(speed));
            return Sk.builtin.none();
        };
        spinLeftWheelBackward.co_varnames = ['self', 'speed'];
        spinLeftWheelBackward.$defaults = [new Sk.builtin.int_(100)];
        $loc.spin_left_wheel_backward = new Sk.builtin.func(spinLeftWheelBackward);

        // ── spin_right_wheel_forward ──────────────
        const spinRightWheelForward = function (self, speed) {
            setMotor('right', 'forward', Sk.ffi.remapToJs(speed));
            return Sk.builtin.none();
        };
        spinRightWheelForward.co_varnames = ['self', 'speed'];
        spinRightWheelForward.$defaults = [new Sk.builtin.int_(100)];
        $loc.spin_right_wheel_forward = new Sk.builtin.func(spinRightWheelForward);

        // ── spin_right_wheel_backward ─────────────
        const spinRightWheelBackward = function (self, speed) {
            setMotor('right', 'backward', Sk.ffi.remapToJs(speed));
            return Sk.builtin.none();
        };
        spinRightWheelBackward.co_varnames = ['self', 'speed'];
        spinRightWheelBackward.$defaults = [new Sk.builtin.int_(100)];
        $loc.spin_right_wheel_backward = new Sk.builtin.func(spinRightWheelBackward);

        // ── move_one_step ─────────────────────────
        const moveOneStep = function (self, direction, distance) {
            const dir_ = Sk.ffi.remapToJs(direction);
            const dist_ = Sk.ffi.remapToJs(distance);
            setMotors(dir_, 100)
            const rpm = RobotSimulator.robot.MAX_SPEED;
            const movementDuration = (dist_ * 1e-2) / RobotSimulator.convertRPMtoSpeedMS(rpm);
            const startPosition = Object.assign({}, RobotSimulator.robot.rotationCenter);
            return RobotSimulator.delayOnMovement(Math.abs(2.5 * movementDuration * 1000), () => {
                RobotSimulator.robot.rotationCenter = RobotSimulator.getPositionByDistance(startPosition, dist_);
            });
        };
        moveOneStep.co_varnames = ['self', 'direction', 'distance'];
        moveOneStep.$defaults = [new Sk.builtin.str('forward'), new Sk.builtin.int_(20)];
        $loc.move_one_step = new Sk.builtin.func(moveOneStep);

        // ── turn_one_step ─────────────────────────
        const turnOneStep = function (self, direction, angle) {
            const dir_ = Sk.ffi.remapToJs(direction);
            const angle_ = Sk.ffi.remapToJs(angle);
            const rpm = RobotSimulator.robot.MAX_SPEED;
            const angularDistance = RobotSimulator.robot.WHEELS_CENTER_RADIUS * 1e-2 * degToRad(Math.abs(angle_));
            const movementDuration = angularDistance / RobotSimulator.convertRPMtoSpeedMS(rpm);
            const startAngle = RobotSimulator.robot.angle;
            setMotors(dir_, 100);
            return RobotSimulator.delayOnMovement(Math.abs(2.5 * movementDuration * 1000), () => {
                if (dir_ === 'right') {
                    RobotSimulator.robot.angle = startAngle + angle_;
                } else {
                    RobotSimulator.robot.angle = startAngle - angle_;
                }
            }, true);
        };
        turnOneStep.co_varnames = ['self', 'direction', 'angle'];
        turnOneStep.$defaults = [new Sk.builtin.str('left'), new Sk.builtin.int_(90)];
        $loc.turn_one_step = new Sk.builtin.func(turnOneStep);

    }, 'Motors', []);

    // ─────────────────────────────────────────────
    //  BUZZER
    // ─────────────────────────────────────────────
    elio.Buzzer = new Sk.misceval.buildClass(elio, function ($gbl, $loc) {

        $loc.__init__ = new Sk.builtin.func(function (self, pwmio) {
            self.pwmio_ = Sk.ffi.remapToJs(pwmio);
        });

        // ── internal audio state ──────────────────
        const elioBuzzer = {
            _data: { volume: 50, audioCtx: null, osc: null }
        };

        const stopMusic = function () {
            if (elioBuzzer._data.osc) {
                elioBuzzer._data.osc.stop();
                elioBuzzer._data.osc = null;
            }
            const module = Simulator.getModuleByKey('eliobot-buzzer');
            if (module) Simulator.setAnimator(module, module.id, 0);
        };

        const startOscillator = function (freq) {
            const vol = elioBuzzer._data.audioCtx.createGain();
            vol.connect(elioBuzzer._data.audioCtx.destination);
            vol.gain.value = elioBuzzer._data.volume / 100;
            elioBuzzer._data.osc = elioBuzzer._data.audioCtx.createOscillator();
            elioBuzzer._data.osc.type = 'sine';
            elioBuzzer._data.osc.frequency.value = freq;
            elioBuzzer._data.osc.connect(vol);
            elioBuzzer._data.osc.start();
        };

        const ensureAudioCtx = function () {
            if (!elioBuzzer._data.audioCtx) {
                elioBuzzer._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                Simulator.audioContext = elioBuzzer._data.audioCtx;
            }
        };

        // ── play_tone ─────────────────────────────
        const playTone = function (self, frequency, duration, volume) {
            const freq_ = Sk.ffi.remapToJs(frequency);
            const dur_ = (duration !== undefined && duration !== Sk.builtin.none())
                ? Sk.ffi.remapToJs(duration) : 1;
            elioBuzzer._data.volume = (volume !== undefined && volume !== Sk.builtin.none())
                ? Sk.ffi.remapToJs(volume) : 50;
            if (elioBuzzer._data.volume < 0) elioBuzzer._data.volume = 0;
            if (elioBuzzer._data.volume > 100) elioBuzzer._data.volume = 100;

            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                if (elioBuzzer._data.osc) stopMusic();
                const module = Simulator.getModuleByKey('eliobot-buzzer');
                if (module) Simulator.setAnimator(module, module.id, freq_);
                startOscillator(freq_);
                await sleep_ms(dur_ * 1000 + 50);
                stopMusic();
                resolve(Sk.builtin.none());
            }));
        };
        playTone.co_varnames = ['self', 'frequency', 'duration', 'volume'];
        playTone.$defaults = [new Sk.builtin.int_(440), new Sk.builtin.int_(1), new Sk.builtin.int_(50)];
        $loc.play_tone = new Sk.builtin.func(playTone);

        // ── play_note ─────────────────────────────
        $loc.play_note = new Sk.builtin.func(function (self, note, duration, notes_frequencies, volume) {
            const currentNote = Sk.ffi.remapToJs(note);
            const currentNotesFrequencies = Sk.ffi.remapToJs(notes_frequencies);
            const frequency = currentNotesFrequencies[currentNote];
            elioBuzzer._data.volume = Sk.ffi.remapToJs(volume);
            if (elioBuzzer._data.volume < 0) elioBuzzer._data.volume = 0;
            if (elioBuzzer._data.volume > 100) elioBuzzer._data.volume = 100;
            let dur_ = Sk.ffi.remapToJs(duration);
            if (dur_ === undefined) dur_ = 1;

            // frequency 0.1 means rest (silence)
            if (frequency === 0.1) {
                return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                    await sleep_ms(dur_ * 1000);
                    resolve(Sk.builtin.none());
                }));
            }

            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                if (elioBuzzer._data.osc) stopMusic();
                const module = Simulator.getModuleByKey('eliobot-buzzer');
                if (module) Simulator.setAnimator(module, module.id, frequency);
                startOscillator(frequency);
                await sleep_ms(dur_ * 1000 + 50);
                stopMusic();
                resolve(Sk.builtin.none());
            }));
        });

        // ── sweep helper (internal, async) ────────
        // Mirrors Buzzer.sweep(start, end, dur, steps, pause)
        const sweep_async = async function (start, end, dur, steps, pause) {
            const step_dur = dur / steps;
            const step_freq = (end - start) / steps;
            for (let i = 0; i < steps; i++) {
                ensureAudioCtx();
                if (elioBuzzer._data.osc) stopMusic();
                startOscillator(start + step_freq * i);
                await sleep_ms(step_dur * 1000 + 50);
                stopMusic();
                await sleep_ms(pause * 1000);
            }
        };

        const makeSweep = function (start, end, dur, steps, pause) {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await sweep_async(start, end, dur, steps, pause);
                resolve(Sk.builtin.none());
            }));
        };

        // ── sound effects ─────────────────────────
        // Each mirrors the corresponding Python method.

        $loc.sound_jump = new Sk.builtin.func(function () {
            return makeSweep(600, 1300, 0.2, 12, 0.01);
        });

        $loc.sound_laser = new Sk.builtin.func(function () {
            return makeSweep(1600, 300, 0.15, 10, 0.01);
        });

        $loc.sound_question = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                const tones = [[900, 0.1], [1100, 0.05], [700, 0.15]];
                for (const [f, d] of tones) {
                    if (elioBuzzer._data.osc) stopMusic();
                    startOscillator(f);
                    await sleep_ms(d * 1000 + 50);
                    stopMusic();
                }
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_error = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                for (const [f, d] of [[300, 0.2], [250, 0.2]]) {
                    if (elioBuzzer._data.osc) stopMusic();
                    startOscillator(f);
                    await sleep_ms(d * 1000 + 50);
                    stopMusic();
                }
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_explosion = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                for (let i = 0; i < 18; i++) {
                    const f = 1200 - i * 60 + (Math.random() * 60 - 30);
                    if (elioBuzzer._data.osc) stopMusic();
                    startOscillator(f);
                    await sleep_ms(15 + 50);
                    stopMusic();
                }
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_land = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await sweep_async(1000, 400, 0.3, 15, 0.01);
                ensureAudioCtx();
                startOscillator(200);
                await sleep_ms(0.1 * 1000 + 50);
                stopMusic();
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_happy = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                for (const [f, d] of [[1000, 0.05], [1300, 0.05], [1600, 0.1], [1300, 0.05], [1700, 0.2]]) {
                    if (elioBuzzer._data.osc) stopMusic();
                    startOscillator(f);
                    await sleep_ms(d * 1000 + 50);
                    stopMusic();
                }
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_win = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                for (const [f, d] of [[1000, 0.1], [1300, 0.1], [1700, 0.15], [2000, 0.2]]) {
                    if (elioBuzzer._data.osc) stopMusic();
                    startOscillator(f);
                    await sleep_ms(d * 1000 + 50);
                    stopMusic();
                }
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_alert = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                for (let i = 0; i < 6; i++) {
                    const f = (i % 2 === 0) ? 1800 : 1400;
                    if (elioBuzzer._data.osc) stopMusic();
                    startOscillator(f);
                    await sleep_ms(0.05 * 1000 + 50);
                    stopMusic();
                }
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_hello = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await sweep_async(900, 1200, 0.15, 5, 0.01);
                ensureAudioCtx();
                startOscillator(1100);
                await sleep_ms(0.1 * 1000 + 50);
                stopMusic();
                await sweep_async(1200, 800, 0.15, 5, 0.01);
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_startup = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await sweep_async(500, 1500, 0.3, 12, 0.01);
                ensureAudioCtx();
                for (const [f, d] of [[1800, 0.1], [1500, 0.1]]) {
                    startOscillator(f);
                    await sleep_ms(d * 1000 + 50);
                    stopMusic();
                }
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_bump = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                for (const [f, d] of [[800, 0.05], [500, 0.05], [300, 0.15]]) {
                    if (elioBuzzer._data.osc) stopMusic();
                    startOscillator(f);
                    await sleep_ms(d * 1000 + 50);
                    stopMusic();
                }
                resolve(Sk.builtin.none());
            }));
        });

        $loc.sound_blink = new Sk.builtin.func(function () {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                ensureAudioCtx();
                for (const [f, d] of [[1000, 0.03], [1300, 0.03], [1600, 0.05]]) {
                    if (elioBuzzer._data.osc) stopMusic();
                    startOscillator(f);
                    await sleep_ms(d * 1000 + 50);
                    stopMusic();
                }
                resolve(Sk.builtin.none());
            }));
        });

    }, 'Buzzer', []);

    // ─────────────────────────────────────────────
    //  OBSTACLE SENSOR
    // ─────────────────────────────────────────────
    elio.ObstacleSensor = new Sk.misceval.buildClass(elio, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self) { });

        $loc.OBSTACLE_DETECTION = 50; // mm

        // get_obstacle mirrors get_obstacle(obstacle_pos) → bool (value < 10000)
        $loc.get_obstacle = new Sk.builtin.func(function (obstacle_pos) {
            const pos = Sk.ffi.remapToJs(obstacle_pos);
            const irMap = { 0: 'Left', 1: 'Front', 2: 'Right', 3: 'Back' };
            const key = 'eliobot-ir' + (irMap[pos] || irMap[1]);
            return new Sk.builtin.bool(Simulator.getSliderValue(key) <= $loc.OBSTACLE_DETECTION);
        });

    }, 'ObstacleSensor', []);

    // ─────────────────────────────────────────────
    //  LINE SENSOR
    // ─────────────────────────────────────────────
    elio.LineSensor = new Sk.misceval.buildClass(elio, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self) { });

        $loc.get_line = new Sk.builtin.func(function (self, line_pos) {
            switch (Sk.ffi.remapToJs(line_pos)) {
                case 0: return new Sk.builtin.int_(Simulator.getSliderValue('elio-finderLeft'));
                case 1: return new Sk.builtin.int_(Simulator.getSliderValue('elio-finderMiddleLeft'));
                case 2: return new Sk.builtin.int_(Simulator.getSliderValue('elio-finderMiddle'));
                case 3: return new Sk.builtin.int_(Simulator.getSliderValue('elio-finderMiddleRight'));
                case 4: return new Sk.builtin.int_(Simulator.getSliderValue('elio-finderRight'));
            }
        });

        $loc.calibrate_line_sensors = new Sk.builtin.func(function () {
            return new Sk.builtin.none();
        });

    }, 'LineSensor', []);

    // ─────────────────────────────────────────────
    //  WIFI CONNECTIVITY
    // ─────────────────────────────────────────────
    elio.WiFiConnectivity = new Sk.misceval.buildClass(elio, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self) { });

        // connect_to_wifi
        $loc.connect_to_wifi = new Sk.builtin.func(function (ssid, password, webpassword) {
            throw new Sk.builtin.NotImplementedError("<b>WiFiConnectivity.connect_to_wifi()</b> is not yet implemented");
        });

        // disconnect_from_wifi
        $loc.disconnect_from_wifi = new Sk.builtin.func(function () {
            throw new Sk.builtin.NotImplementedError("<b>WiFiConnectivity.disconnect_from_wifi()</b> is not yet implemented");
        });

        // set_access_point
        $loc.set_access_point = new Sk.builtin.func(function (ssid, password) {
            throw new Sk.builtin.NotImplementedError("<b>WiFiConnectivity.set_access_point()</b> is not yet implemented");
        });

        // scan_wifi_networks
        $loc.scan_wifi_networks = new Sk.builtin.func(function () {
            throw new Sk.builtin.NotImplementedError("<b>WiFiConnectivity.scan_wifi_networks()</b> is not yet implemented");
        });

    }, 'WiFiConnectivity', []);

    // ─────────────────────────────────────────────
    //  IR REMOTE
    // ─────────────────────────────────────────────
    elio.IRRemote = new Sk.misceval.buildClass(elio, function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self) { });

        const signals = {
            'signal_1': [0, 255, 162, 93],
            'signal_2': [0, 255, 98, 157],
            'signal_3': [0, 255, 226, 29],
            'signal_4': [0, 255, 34, 221],
            'signal_5': [0, 255, 2, 253],
            'signal_6': [0, 255, 194, 61],
            'signal_7': [0, 255, 224, 31],
            'signal_8': [0, 255, 168, 87],
            'signal_9': [0, 255, 144, 111],
            'signal_0': [0, 255, 152, 103],
            'signal_st': [0, 255, 104, 151],
            'signal_ht': [0, 255, 176, 79],
            'signal_up': [0, 255, 24, 231],
            'signal_left': [0, 255, 16, 239],
            'signal_right': [0, 255, 90, 165],
            'signal_down': [0, 255, 74, 181],
            'signal_ok': [0, 255, 56, 199],
        };

        // IR sensor direction map (used by ObstacleSensor too)
        $loc.ir_sensors = Sk.ffi.remapToPy({
            0: 'Left',
            1: 'Front',
            2: 'Right',
            3: 'Back'
        });

        // Mirrors IRRemote.signals class attribute
        $loc.signals = Sk.ffi.remapToPy(signals);

        // decode_signal — returns the pending IR code from simulator, or None
        $loc.decode_signal = new Sk.builtin.func(function (self) {
            const modules = Simulator.getMosaicModules();
            for (let i = 0; i < modules.length; i++) {
                if (modules[i].id.includes('ir-remote') && Simulator.getSliderValue(modules[i].id) == 1) {
                    return new Sk.ffi.remapToPy(signals[modules[i].id.replace('elio-ir-remote-', '').replace('-', '_')])
                }
            }
            return Sk.builtin.none();
        });

    }, 'IRRemote', []);

    // ─────────────────────────────────────────────
    //  EYES MATRIX
    // ─────────────────────────────────────────────
    elio.EyesMatrix = new Sk.misceval.buildClass(elio, function ($gbl, $loc) {
        const addMatrixToDom = function (moduleID) {
            let html = '<div class="led-grid">',
                row = '<div class="led-row">';
            row += '<div class="led"></div>';

            for (let led = 0; led < 64; led++) {
                if ((led + 1) % 8 == 0) {
                    html += row + "</div>";
                    row = '<div class="led-row">';
                }
                row += '<div class="led"></div>';
            }
            html += "</div>";
            $('#' + moduleID + '_value').html(html);
        };

        $loc.__init__ = new Sk.builtin.func(function (self, pin, brightness) {
            addMatrixToDom('right-eye');
            addMatrixToDom('left-eye');
            self._matrix = new Array(128).fill(null).map(() => [0, 0, 0]);
        });

        // ── helpers ───────────────────────────────
        const renderMatrix = function (self) {
            const eyes = [
                { id: 'right-eye', offset: 0 },
                { id: 'left-eye', offset: 64 }
            ];

            eyes.forEach(function (eye) {
                const leds = $('#' + eye.id + '_value .led');
                for (let i = 0; i < 64; i++) {
                    const pixel = self._matrix[eye.offset + i];
                    if (!pixel) continue;
                    const [r, g, b] = Array.isArray(pixel) ? pixel : [pixel[0], pixel[1], pixel[2]];
                    const isOn = r > 0 || g > 0 || b > 0;

                    // Transposition : le hardware indexe par colonne
                    const domIndex = (i % 8) * 8 + Math.floor(i / 8);

                    $(leds[domIndex]).css(
                        'background-color',
                        isOn ? `rgb(${r},${g},${b})` : ''
                    );
                }
            });
        };

        const setPixel = function (self, idx, color) {
            if (idx >= 0 && idx < 128) {
                self._matrix[idx] = color;
            }
        };

        // ── set_matrix_colors ─────────────────────
        $loc.set_matrix_colors = new Sk.builtin.func(function (self, led_colors) {
            const colors = Sk.ffi.remapToJs(led_colors);
            colors.forEach(function (c, i) {
                if (i < 128) self._matrix[i] = Array.isArray(c) ? c : [c[0], c[1], c[2]];
            });
            renderMatrix(self);
            return Sk.builtin.none();
        });

        // ── clear_matrix ──────────────────────────
        $loc.clear_matrix = new Sk.builtin.func(function (self) {
            self._matrix = new Array(128).fill(null).map(() => [0, 0, 0]);
            renderMatrix(self);
            return Sk.builtin.none();
        });

        // ── set_matrix_logo ───────────────────────
        $loc.set_matrix_logo = new Sk.builtin.func(function (self, logo, color) {
            // logo peut être un tableau JS natif (attribut de classe) ou une liste Skulpt
            let logoJs;
            if (Array.isArray(logo)) {
                logoJs = logo; // déjà un tableau JS natif
            } else {
                logoJs = Sk.ffi.remapToJs(logo); // liste Python → JS
            }

            // color peut être un tuple Python ou un tableau JS
            let colorJs;
            if (Array.isArray(color)) {
                colorJs = color;
            } else {
                colorJs = Sk.ffi.remapToJs(color);
            }

            logoJs.forEach(function (led, i) {
                if (i < 128) self._matrix[i] = led ? colorJs : [0, 0, 0];
            });
            renderMatrix(self);
            return Sk.builtin.none();
        });

        // ── scroll_matrix_text_both_eyes ──────────
        $loc.scroll_matrix_text_both_eyes = new Sk.builtin.func(function (self, text, color, speed) {
            const text_ = Sk.ffi.remapToJs(text);
            const color_ = Sk.ffi.remapToJs(color);
            const speed_ = (speed !== undefined && speed !== Sk.builtin.none())
                ? Sk.ffi.remapToJs(speed) : 0.1;

            const CHARACTER = getCharacterMap();
            const char_width = 5, char_height = 5;
            const left_cols = 8, gap = 5, right_cols = 8;
            const matrix_width = left_cols + gap + right_cols; // 21
            const matrix_height = 8, top_margin = 1, space = 1;

            const total = text_.length * (char_width + space) + matrix_width;
            const extended = new Array(total).fill(0);

            for (let i = 0; i < text_.length; i++) {
                const ch = text_[i];
                if (CHARACTER[ch]) {
                    for (let r = 0; r < char_height; r++) {
                        for (let c = 0; c < char_width; c++) {
                            if (CHARACTER[ch][r][c] === 1) {
                                const col_idx = i * (char_width + space) + c + matrix_width;
                                extended[col_idx] |= (1 << (top_margin + r));
                            }
                        }
                    }
                }
            }

            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                for (let offset = 0; offset < extended.length; offset++) {
                    if (Simulator.stop_flag) break;
                    self._matrix = new Array(128).fill(null).map(() => [0, 0, 0]);
                    for (let row = 0; row < matrix_height; row++) {
                        for (let col = 0; col < matrix_width; col++) {
                            let idx;
                            if (col < left_cols) {
                                idx = row * 8 + col;
                            } else if (col >= left_cols + gap) {
                                idx = 64 + row * 8 + (col - left_cols - gap);
                            } else {
                                idx = null;
                            }
                            const char_col = col + offset;
                            const on = char_col < extended.length && (extended[char_col] & (1 << row));
                            if (idx !== null && idx < 128) {
                                self._matrix[idx] = on ? color_ : [0, 0, 0];
                            }
                        }
                    }
                    renderMatrix(self);
                    await sleep_ms(speed_ * 1000);
                }
                resolve(Sk.builtin.none());
            }));
        });

        // ── scroll_matrix_text_eye ────────────────
        $loc.scroll_matrix_text_eye = new Sk.builtin.func(function (self, text, color, eye, speed) {
            const text_ = Sk.ffi.remapToJs(text);
            const color_ = Sk.ffi.remapToJs(color);
            let eye_ = (eye !== undefined && eye !== Sk.builtin.none())
                ? Sk.ffi.remapToJs(eye) : 0;
            const speed_ = (speed !== undefined && speed !== Sk.builtin.none())
                ? Sk.ffi.remapToJs(speed) : 0.1;

            if (typeof eye_ === 'string') {
                eye_ = eye_.toLowerCase().startsWith('l') ? 1 : 0;
            }

            const CHARACTER = getCharacterMap();
            const char_width = 5, char_height = 5;
            const matrix_width = 8, matrix_height = 8;
            const top_margin = 1, space = 1;

            const total = text_.length * (char_width + space) + matrix_width;
            const extended = new Array(total).fill(0);

            for (let i = 0; i < text_.length; i++) {
                const ch = text_[i];
                if (CHARACTER[ch]) {
                    for (let r = 0; r < char_height; r++) {
                        for (let c = 0; c < char_width; c++) {
                            if (CHARACTER[ch][r][c] === 1) {
                                const col_idx = i * (char_width + space) + c + matrix_width;
                                extended[col_idx] |= (1 << (top_margin + r));
                            }
                        }
                    }
                }
            }

            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                for (let offset = 0; offset < extended.length; offset++) {
                    if (Simulator.stop_flag) break;
                    for (let row = 0; row < matrix_height; row++) {
                        for (let col = 0; col < matrix_width; col++) {
                            const idx = (eye_ === 1 ? 64 : 0) + row * matrix_width + col;
                            const char_col = col + offset;
                            const on = char_col < extended.length && (extended[char_col] & (1 << row));
                            if (idx < 128) self._matrix[idx] = on ? color_ : [0, 0, 0];
                        }
                    }
                    renderMatrix(self);
                    await sleep_ms(speed_ * 1000);
                }
                resolve(Sk.builtin.none());
            }));
        });

        // ── Pre-defined logos / emotions ──────────
        $loc.arrowRight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $loc.arrowLeft = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $loc.arrowUp = [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $loc.arrowDown = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0];
        $loc.emotionDizzy = [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0];
        $loc.emotionConfused = [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
        $loc.emotionNeutral = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0];
        $loc.emotionThrilled = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0];
        $loc.emotionTired = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $loc.emotionAmazed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
        $loc.emotionMusic = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $loc.emotionLove = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0];
        $loc.emotionKO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $loc.emotionHappy = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $loc.emotionSad = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0];
        $loc.emotionAngry = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0];

    }, 'EyesMatrix', []);

    // ─────────────────────────────────────────────
    //  CHARACTER MAP (shared between scroll methods)
    // ─────────────────────────────────────────────
    function getCharacterMap() {
        return {
            'A': [[0, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 1, 1, 1, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0]],
            'a': [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 1, 1]],
            'B': [[1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 1, 1, 0, 0]],
            'b': [[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 1, 1, 0, 0]],
            'C': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 1, 1, 0]],
            'c': [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 1, 1, 0]],
            'D': [[1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [1, 1, 1, 0, 0]],
            'd': [[0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 1, 0]],
            'E': [[1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 1, 1, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0]],
            'e': [[0, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [0, 1, 1, 1, 0]],
            'F': [[1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 1, 1, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
            'f': [[0, 0, 1, 1, 0], [0, 1, 0, 0, 0], [1, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0]],
            'G': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 1, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 1, 0]],
            'g': [[0, 1, 1, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 0, 0]],
            'H': [[1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [1, 1, 1, 1, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0]],
            'h': [[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0]],
            'I': [[1, 1, 1, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [1, 1, 1, 0, 0]],
            'i': [[0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0]],
            'J': [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 0, 1, 0, 0], [0, 1, 1, 0, 0]],
            'j': [[0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0]],
            'K': [[1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [1, 1, 0, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0]],
            'k': [[1, 0, 0, 0, 0], [1, 0, 1, 0, 0], [1, 1, 0, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0]],
            'L': [[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0]],
            'l': [[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [1, 1, 1, 0, 0]],
            'M': [[1, 0, 0, 0, 1], [1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
            'm': [[0, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
            'N': [[1, 0, 0, 0, 1], [1, 1, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 1, 1], [1, 0, 0, 0, 1]],
            'n': [[0, 0, 0, 0, 0], [1, 1, 1, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0]],
            'O': [[0, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0]],
            'o': [[0, 0, 0, 0, 0], [0, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0]],
            'P': [[1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 1, 1, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
            'p': [[0, 0, 0, 0, 0], [1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 1, 1, 0, 0], [1, 0, 0, 0, 0]],
            'Q': [[0, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [0, 1, 1, 1, 0]],
            'q': [[0, 0, 0, 0, 0], [0, 1, 1, 0, 0], [1, 0, 0, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 1, 0]],
            'R': [[1, 1, 1, 0, 0], [1, 0, 0, 1, 0], [1, 1, 1, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0]],
            'r': [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
            'S': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 0], [0, 1, 1, 0, 0], [0, 0, 0, 1, 0], [1, 1, 1, 0, 0]],
            's': [[0, 0, 0, 0, 0], [0, 0, 1, 1, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [1, 1, 0, 0, 0]],
            'T': [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
            't': [[0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 0, 1, 1, 1]],
            'U': [[1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0]],
            'u': [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 1, 0]],
            'V': [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
            'v': [[0, 0, 0, 0, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
            'W': [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 1, 0, 1, 1], [1, 0, 0, 0, 1]],
            'w': [[0, 0, 0, 0, 0], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 1, 0, 1, 1], [0, 1, 0, 0, 1]],
            'X': [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]],
            'x': [[0, 0, 0, 0, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0], [0, 1, 1, 0, 0], [1, 0, 0, 1, 0]],
            'Y': [[1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
            'y': [[0, 0, 0, 0, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 0, 0, 0]],
            'Z': [[1, 1, 1, 1, 0], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 1, 1, 1, 0]],
            'z': [[0, 0, 0, 0, 0], [1, 1, 1, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 1, 1, 1, 0]],
            ' ': [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
            '?': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [0, 0, 1, 1, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]],
            '!': [[0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 0, 0, 0]],
            ',': [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0]],
            '.': [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 0]],
            '0': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 1, 1], [1, 0, 1, 0, 1], [0, 1, 1, 1, 0]],
            '1': [[0, 0, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
            '2': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 1, 1, 1, 1]],
            '3': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [0, 0, 1, 1, 0], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
            '4': [[0, 0, 0, 1, 0], [0, 0, 1, 1, 0], [0, 1, 0, 1, 0], [1, 1, 1, 1, 1], [0, 0, 0, 1, 0]],
            '5': [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [0, 0, 0, 0, 1], [1, 1, 1, 1, 0]],
            '6': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
            '7': [[1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0]],
            '8': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
            '9': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [0, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
            '-': [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
            '_': [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0]],
            '/': [[0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0]],
            '\\': [[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]],
            '(': [[0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0]],
            ')': [[0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0]],
            '[': [[0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0]],
            ']': [[0, 1, 1, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 1, 0]],
            '@': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 1, 1, 1], [1, 0, 1, 0, 1], [0, 1, 1, 1, 0]],
            '#': [[0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [1, 1, 1, 1, 1], [0, 1, 0, 1, 0], [1, 1, 1, 1, 1]],
            '$': [[0, 1, 1, 1, 1], [1, 0, 1, 0, 0], [0, 1, 1, 1, 0], [0, 0, 1, 0, 1], [1, 1, 1, 1, 0]],
            '=': [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1]],
            '+': [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]],
            '*': [[0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0]],
            '^': [[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
            '&': [[0, 0, 1, 1, 0], [0, 1, 0, 0, 1], [0, 0, 1, 1, 0], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0]],
            '%': [[1, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 1]],
            '|': [[0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0]],
            ':': [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]],
            ';': [[0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0]],
            "'": [[0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
        };
    }

    return elio;
};