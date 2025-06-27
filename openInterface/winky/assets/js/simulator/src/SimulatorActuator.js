const $builtinmodule = function () {

    const SimulatorActuator = {};

    const simulator = window.Simulator3D;

    // reset led pattern
    simulator.savedPattern = {
        1: EYE_PRESET['Amused'][0],
        2: EYE_PRESET['Amused'][1]
    };

    const sounds = {
        0: "Aie01",
        1: "Aie02",
        2: "Aie03",
        3: "Alarm01",
        4: "Amused01",
        5: "Angry03",
        6: "Angry04",
        7: "Angry05",
        8: "Boom02",
        9: "Boom03",
        10: "Bored06",
        11: "Bored07",
        12: "Bored09",
        13: "Happy01",
        14: "Happy03",
        15: "Happy04",
        16: "Humhum01",
        17: "Humhum02",
        18: "Humhum03",
        19: "Inlove01",
        20: "Inlove03",
        21: "Inlove04",
        22: "Neutral01",
        23: "Neutral02",
        24: "Neutral03",
        25: "Question01",
        26: "Question02",
        27: "Radar01",
        28: "Sad02",
        29: "Sad08",
        30: "Sad09",
        31: "Scared01",
        32: "Scared02",
        33: "Scared03",
        34: "Sleep01",
        35: "Sleep02",
        36: "Surprise02",
        37: "Surprise03",
        38: "Surprise04",
        39: "Tac",
        40: "Thoughtful01",
        41: "Thoughtful02",
        42: "Tic",
        43: "Tictac",
        44: "Tired01",
        45: "Waterdrop01",
        46: "Waterdrop02",
        47: "Waterdrop03",
        48: "Woohoo01",
        49: "Woohoo02",
        50: "Woohoo03",
        51: "Yeah01",
        52: "Yeah02",
        53: "Yeah03"
    };

    const emotions = {
        0: "Off",
        1: "NeutralBlink",
        2: "Amused",
        3: "Angry",
        4: "Big",
        5: "Bored",
        6: "Sad",
        7: "Happy",
        8: "Tired",
        9: "Sleep",
        10: "InLove",
        11: "Question",
        12: "Hot",
        13: "Cold",
        14: "WinkRight",
        15: "WinkLeft",
        16: "Close",
        17: "RadarStart",
        18: "RadarLoop",
        19: "ArrowDown",
        20: "ArrowUp",
        21: "ArrowRight",
        22: "ArrowLeft"
    };

    SimulatorActuator.SimulatorActuator = new Sk.misceval.buildClass(SimulatorActuator, function ($gbl, $loc) {

        const convertToBinaryList = function (intList) {
            return intList.map(number => {
                let binaryStr = number.toString(2);
                // Ajoute des zéros au début pour obtenir une longueur de 8 caractères
                while (binaryStr.length < 8) {
                    binaryStr = '0' + binaryStr;
                }
                return binaryStr;
            });
        };

        SimulatorActuator__init__ = function (self) {
            console.log('SimulatorActuator init');
        };

        $loc.__init__ = new Sk.builtin.func(SimulatorActuator__init__);

        $loc._SIM_set_neck_position = new Sk.builtin.func((self, angle) => {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await simulator.moveBody(true, Sk.ffi.remapToJs(angle));
                resolve(Sk.builtin.none());
            }));
        });

        $loc._SIM_set_neck_rotate = new Sk.builtin.func((self, angle, speed) => {
            const speedOptions = [1, 2, 3];
            let speedArg = Sk.ffi.remapToJs(speed);
            if (speedArg === 0) {
                speedArg = speedOptions[Math.floor(Math.random() * speedOptions.length)];
            } else {
                speedArg = speedOptions[speedArg];
            }
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await simulator.moveBody(false, Sk.ffi.remapToJs(angle), 7 - speedArg);
                resolve(Sk.builtin.none());
            }));
        });

        $loc._SIM_set_ear_right_position = new Sk.builtin.func((self, angle) => {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await simulator.moveEars('right', Sk.ffi.remapToJs(angle));
                resolve(Sk.builtin.none());
            }));
        });

        $loc._SIM_set_ear_left_position = new Sk.builtin.func((self, angle) => {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await simulator.moveEars('left', Sk.ffi.remapToJs(angle));
                resolve(Sk.builtin.none());
            }));
        });

        $loc._SIM_set_ear_duplicate_position = new Sk.builtin.func((self, angle) => {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await simulator.moveEars('both', Sk.ffi.remapToJs(angle));
                resolve(Sk.builtin.none());
            }));
        });

        $loc._SIM_set_ear_random_position = new Sk.builtin.func((self, angle) => {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await simulator.moveEars('random', Sk.ffi.remapToJs(angle));
                resolve(Sk.builtin.none());
            }));
        });

        $loc._SIM_set_display_pattern = new Sk.builtin.func((self, pattern, option) => {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await simulator.set_display_pattern(convertToBinaryList(Sk.ffi.remapToJs(pattern)), Sk.ffi.remapToJs(option), convertToBinaryList(Sk.ffi.remapToJs(pattern)));
                resolve(Sk.builtin.none());
            }));
        });

        const sim_set_display_preset = function (self, delay, option, first_preset, second_preset) {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                let pattern_left = EYE_PRESET[emotions[Sk.ffi.remapToJs(first_preset)]];
                let pattern_right = EYE_PRESET[emotions[Sk.ffi.remapToJs(second_preset)]];
                if (option > 3 && option < 9) {
                    pattern_left = EYE_PRESET_PATTERN[emotions[Sk.ffi.remapToJs(first_preset)]][0];
                    pattern_right = EYE_PRESET_PATTERN[emotions[Sk.ffi.remapToJs(first_preset)]][1];
                }
                // await sleep_ms(500); // to simulate the sending and execution of the command on the robot
                await simulator.set_display_preset(pattern_left, pattern_right, Sk.ffi.remapToJs(option));
                resolve(Sk.builtin.none());
            }));
        }
        sim_set_display_preset.co_varnames = ['self', 'delay', 'option', 'first_preset', 'second_preset'];
        $loc._SIM_set_display_preset = new Sk.builtin.func(sim_set_display_preset);

        $loc._SIM_set_display_text = new Sk.builtin.func((self, text, direction, speed) => {
            const directionOption = {
                0: 'right',
                1: 'left'
            };
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                await simulator.set_display_text(Sk.ffi.remapToJs(text).toUpperCase(), directionOption[Sk.ffi.remapToJs(direction)], speed.v);
                resolve(Sk.builtin.none());
            }));
        });

        $loc._SIM_set_display_number = new Sk.builtin.func((self, number) => {
            return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
                const numberToString = Sk.ffi.remapToJs(number).toString();
                if (numberToString.length > 4) {
                    UIManager.showErrorMessage("error-message", "WinkyException" + ": " + "\'" + numberToString + "\' Vous ne pouvez pas afficher plus de 4 chiffres.");
                    return Sk.builtin.bool(false);
                }
                await simulator.set_display_number(numberToString);
                resolve(Sk.builtin.none());
            }));
        });

        $loc._SIM_set_play_sound = new Sk.builtin.func((self, sound) => {
            const soundName = sounds[Sk.ffi.remapToJs(sound)];
            const soundPATH = `/openInterface/winky/assets/media/simulator/sounds/s_${soundName.toLowerCase()}.mp3`;
            if (!Simulator.Mosaic.specific.soundPlaying) {
                const audio = new Audio(soundPATH);
                if (typeof self.volume === 'undefined') {
                    self.volume = 0.5;
                }
                audio.volume = (self.volume / 255).toFixed(2);
                audio.addEventListener('ended', function () {
                    // avoid playing sound too often in onEvent loop for example
                    setTimeout(() => {
                        Simulator.Mosaic.specific.soundPlaying = false;
                    }, 1000);
                });
                Simulator.Mosaic.specific.soundPlaying = true;
                audio.play();
            }
            return Sk.builtin.bool(true);
        });

        $loc._SIM_set_volume = new Sk.builtin.func((self, lvl) => {
            self.volume = Sk.ffi.remapToJs(lvl);
            if (self.volume < 0) self.volume = 0;
            if (self.volume > 255) self.volume = 255;
            return Sk.builtin.bool(true);
        });

    }, "SimulatorActuator");

    return SimulatorActuator;
};