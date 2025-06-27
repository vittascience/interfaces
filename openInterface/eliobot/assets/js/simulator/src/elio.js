var $builtinmodule = function () {

    const elio = {};

    elio.__name__ = new Sk.builtin.str("elio");

    elio.ir_sensors = {
        0: 'Left',
        1: 'Front',
        2: 'Right',
        3: 'Back'
    };

    elio.motors = {
        motorLeft: ['forward', 0],
        motorRight: ['forward', 0],
    };

    elio.OBSTACLE_DETECTION = 50; //mm

    elio.getObstacle = new Sk.builtin.func(function (direction) {
        return new Sk.builtin.bool((Simulator.getSliderValue('eliobot-ir' + elio.ir_sensors[direction.v]) <= elio.OBSTACLE_DETECTION ? true : false));
    });

    const setMotors = function (direction, speed) {
        switch (direction) {
            case 'right':
                elio.motors.motorLeft[0] = 'forward';
                elio.motors.motorRight[0] = 'backward';
                break;
            case 'left':
                elio.motors.motorLeft[0] = 'backward';
                elio.motors.motorRight[0] = 'forward';
                break;
            default:
                elio.motors.motorLeft[0] = direction;
                elio.motors.motorRight[0] = direction;
                break;
        }
        elio.motors.motorLeft[1] = speed;
        elio.motors.motorRight[1] = speed;
        $('#mb-eliobot-motorLeft_value').html(elio.motors.motorLeft[1]);
        $('#mb-eliobot-motorRight_value').html(elio.motors.motorRight[1]);
        if (speed !== 0) {
            $('.mb-eliobot-motorLeft').css('animation', 'rotation-' + elio.motors.motorLeft[0] + ' ' + (60 / (Math.abs(elio.motors.motorLeft[1]) / 255 * 133)) + 's infinite linear');
            $('.mb-eliobot-motorRight').css('animation', 'rotation-' + elio.motors.motorRight[0] + ' ' + (60 / (Math.abs(elio.motors.motorRight[1]) / 255 * 133)) + 's infinite linear');
        } else {
            $('.mb-eliobot-motorLeft').css('animation', 'none');
            $('.mb-eliobot-motorRight').css('animation', 'none');
        }
    };

    const setMotor = function (motor, direction, speed) {
        switch (motor) {
            case 'right':
                elio.motors.motorRight[0] = direction;
                elio.motors.motorRight[1] = speed;
                $('#mb-eliobot-motorRight_value').html(elio.motors.motorRight[1]);
                if (speed !== 0) {
                    $('.mb-eliobot-motorRight').css('animation', 'rotation-' + elio.motors.motorRight[0] + ' ' + (60 / (Math.abs(elio.motors.motorRight[1]) / 255 * 133)) + 's infinite linear');
                } else {
                    $('.mb-eliobot-motorRight').css('animation', 'none');
                }
                break;
            case 'left':
                elio.motors.motorLeft[0] = direction;
                elio.motors.motorLeft[1] = speed;
                $('#mb-eliobot-motorLeft_value').html(elio.motors.motorLeft[1]);
                if (speed !== 0) {
                    $('.mb-eliobot-motorLeft').css('animation', 'rotation-' + elio.motors.motorLeft[0] + ' ' + (60 / (Math.abs(elio.motors.motorLeft[1]) / 255 * 133)) + 's infinite linear');
                } else {
                    $('.mb-eliobot-motorLeft').css('animation', 'none');
                }
                break;
        }
    };

    const moveForward = function (speed) {
        const elioSpeed = Sk.ffi.remapToJs(speed);
        setMotors('forward', elioSpeed);
        return Sk.builtin.none();
    };
    moveForward.co_varnames = ['speed'];
    moveForward.$defaults = [new Sk.builtin.int_(100)];
    elio.moveForward = new Sk.builtin.func(moveForward);

    const moveBackward = function (speed) {
        const elioSpeed = Sk.ffi.remapToJs(speed);
        setMotors('backward', elioSpeed);
        return Sk.builtin.none();
    };
    moveBackward.co_varnames = ['speed'];
    moveBackward.$defaults = [new Sk.builtin.int_(100)];
    elio.moveBackward = new Sk.builtin.func(moveBackward);

    const turnLeft = function (speed) {
        const elioSpeed = Sk.ffi.remapToJs(speed);
        setMotors('left', elioSpeed);
        return Sk.builtin.none();
    };
    turnLeft.co_varnames = ['speed'];
    turnLeft.$defaults = [new Sk.builtin.int_(100)];
    elio.turnLeft = new Sk.builtin.func(turnLeft);

    const turnRight = function (speed) {
        const elioSpeed = Sk.ffi.remapToJs(speed);
        setMotors('right', elioSpeed);
        return Sk.builtin.none();
    };
    turnRight.co_varnames = ['speed'];
    turnRight.$defaults = [new Sk.builtin.int_(100)];
    elio.turnRight = new Sk.builtin.func(turnRight);

    elio.motorStop = new Sk.builtin.func(function () {
        setMotors('forward', 0);
    });

    const spinLeftWheelForward = function (speed) {
        const elioSpeed = Sk.ffi.remapToJs(speed);
        setMotor('left', 'forward', elioSpeed);
        return Sk.builtin.none();
    };
    spinLeftWheelForward.co_varnames = ['speed'];
    spinLeftWheelForward.$defaults = [new Sk.builtin.int_(100)];
    elio.spinLeftWheelForward = new Sk.builtin.func(spinLeftWheelForward);

    const spinLeftWheelBackward = function (speed) {
        const elioSpeed = Sk.ffi.remapToJs(speed);
        setMotor('left', 'backward', elioSpeed);
        return Sk.builtin.none();
    };
    spinLeftWheelBackward.co_varnames = ['speed'];
    spinLeftWheelBackward.$defaults = [new Sk.builtin.int_(100)];
    elio.spinLeftWheelBackward = new Sk.builtin.func(spinLeftWheelBackward);

    const spinRightWheelForward = function (speed) {
        const elioSpeed = Sk.ffi.remapToJs(speed);
        setMotor('right', 'forward', elioSpeed);
        return Sk.builtin.none();
    };
    spinRightWheelForward.co_varnames = ['speed'];
    spinRightWheelForward.$defaults = [new Sk.builtin.int_(100)];
    elio.spinRightWheelForward = new Sk.builtin.func(spinRightWheelForward);

    const spinRightWheelBackward = function (speed) {
        const elioSpeed = Sk.ffi.remapToJs(speed);
        setMotor('right', 'backward', elioSpeed);
        return Sk.builtin.none();
    };
    spinRightWheelBackward.co_varnames = ['speed'];
    spinRightWheelBackward.$defaults = [new Sk.builtin.int_(100)];
    elio.spinRightWheelBackward = new Sk.builtin.func(spinRightWheelBackward);

    const moveOneStep = function (speed) {
        const elioSpeed = Sk.ffi.remapToJs(speed);
        return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
            setMotors('forward', elioSpeed);
            await sleep_ms(1000);
            setMotors('forward', 0);
            resolve(Sk.builtin.none());
        }));
    };
    moveOneStep.co_varnames = ['speed'];
    moveOneStep.$defaults = [new Sk.builtin.int_(100)];
    elio.moveOneStep = new Sk.builtin.func(moveOneStep);

    const stopMusic = function (self) {
        if (self._data.osc) {
            self._data.osc.stop();
            delete self._data.osc;
        }
        const module = Simulator.getModuleByKey('eliobot-buzzer');
        Simulator.setAnimator(module, module.id, 0);
    };

    const startOscillator = function (self, freq) {
        const volume = self._data.audioCtx.createGain();
        volume.connect(self._data.audioCtx.destination);
        volume.gain.value = elioBuzzer._data.volume / 100;
        self._data.osc = self._data.audioCtx.createOscillator();
        self._data.osc.type = 'sine';
        self._data.osc.frequency.value = freq;
        self._data.osc.connect(volume);
        self._data.osc.start();
    };

    const elioBuzzer = {
        _data: {
            volume: 1,
            audioCtx: null
        }
    };

    const playFrequency = function (frequency, duration, volume) {
        elioBuzzer._data.volume = Sk.ffi.remapToJs(volume);
        if (elioBuzzer._data.volume < 0) elioBuzzer._data.volume = 0;
        if (elioBuzzer._data.volume > 100) elioBuzzer._data.volume = 100;
        if (duration === undefined) {
            duration = 1000;
        } else {
            duration = 1000 * duration.v;
        }
        return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
            if (!elioBuzzer._data.audioCtx) {
                elioBuzzer._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                Simulator.audioContext = elioBuzzer._data.audioCtx;
            }
            if (elioBuzzer._data.osc) {
                stopMusic(elioBuzzer, module);
            }
            const module = Simulator.getModuleByKey('eliobot-buzzer');
            Simulator.setAnimator(module, module.id, frequency.v);
            startOscillator(elioBuzzer, frequency.v);
            if (duration > 0) {
                await sleep_ms(duration + 50);
                stopMusic(elioBuzzer);
                resolve();
            }
            if (Simulator.stop_flag) {
                stopMusic(elioBuzzer);
                resolve();
            }
        }));
    };
    playFrequency.co_varnames = ['frequency', 'duration', 'volume'];
    playFrequency.$defaults = [new Sk.builtin.int_(440), new Sk.builtin.int_(1), new Sk.builtin.int_(50)];
    elio.playFrequency = new Sk.builtin.func(playFrequency);

    elio.playNote = new Sk.builtin.func(function (note, duration, notes_frequencies, volume) {
        const currentNote = Sk.ffi.remapToJs(note);
        const currentNotesFrequencies = Sk.ffi.remapToJs(notes_frequencies);
        const frequency = currentNotesFrequencies[currentNote];
        elioBuzzer._data.volume = Sk.ffi.remapToJs(volume);
        if (elioBuzzer._data.volume < 0) elioBuzzer._data.volume = 0;
        if (elioBuzzer._data.volume > 100) elioBuzzer._data.volume = 100;
        let currentDuration = Sk.ffi.remapToJs(duration);
        if (currentDuration === undefined) {
            currentDuration = 1000;
        } else {
            currentDuration = 1000 * currentDuration;
        }
        return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
            if (!elioBuzzer._data.audioCtx) {
                elioBuzzer._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                Simulator.audioContext = elioBuzzer._data.audioCtx;
            }
            if (elioBuzzer._data.osc) {
                stopMusic(elioBuzzer, module);
            }
            const module = Simulator.getModuleByKey('eliobot-buzzer');
            Simulator.setAnimator(module, module.id, frequency);
            startOscillator(elioBuzzer, frequency);
            if (duration > 0) {
                await sleep_ms(currentDuration + 50);
                stopMusic(elioBuzzer);
                resolve();
            }
            if (Simulator.stop_flag) {
                stopMusic(elioBuzzer);
                resolve();
            }
        }));
    });

    //elio.getLine = new Sk.builtin.func(function (line_pos) {});

    elio.getLineSensor = new Sk.builtin.func(function (line_pos) {
        switch (Sk.ffi.remapToJs(line_pos)) {
            case 0:
                return new Sk.builtin.bool(Simulator.getSliderValue("elio-finderLeft", "_v"));
            case 1:
                return new Sk.builtin.bool(Simulator.getSliderValue("elio-finderMiddleLeft", "_v"));
            case 2:
                return new Sk.builtin.bool(Simulator.getSliderValue("elio-finderMiddle", "_v"));
            case 3:
                return new Sk.builtin.bool(Simulator.getSliderValue("elio-finderMiddleRight", "_v"));
            case 4:
                return new Sk.builtin.bool(Simulator.getSliderValue("elio-finderRight", "_v"));
        }
    });

    return elio;
};