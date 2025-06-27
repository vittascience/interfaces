Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /pin[0-9]{1,2}/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    return {
        name: pin.replace("pin", 'P'),
        id: pin.replace("pin", '')
    };
};

Simulator.Mosaic.getCurrentRobot = function () {
    const current_robot = Simulator.code.match(/""" ([a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*) (robot|drone) """/gi);
    
    if (current_robot?.length > 1) {
        return 'error';
    }
    const robotNames = Object.keys(Robots);
    const robotRegex = robotNames.map((name) => Robots[name].CODE_REGEXP);
    for (var i = 0; i < robotRegex.length; i++) {
        if (Simulator.code.match(robotRegex[i])) {
            return robotNames[i];
        }
    }

    return null;
};

Simulator.Mosaic.externalLibraries = {
    // python libraries
    'src/lib/game.py': Simulator.PATH_LIB_PY + 'microbit/game.py',
    // specific board libraries
    // py
    'src/lib/microbit_run_every.py': Simulator.PATH_LIB + 'micropython/run_every.py',
    'src/lib/bar_graph.py': Simulator.PATH_LIB_PY + 'microbit/bar_graph.py',
    // js
    'src/lib/microbit.js': Simulator.PATH_LIB + 'micropython/microbit.js',
    'src/lib/machine.js': Simulator.PATH_LIB + 'micropython/machine.js',
    'src/lib/log.js': Simulator.PATH_LIB + 'micropython/log.js',
    'src/lib/time.js': Simulator.PATH_LIB + 'micropython/time.js',
    'src/lib/utime.js': Simulator.PATH_LIB + 'micropython/time.js',
    'src/lib/neopixel.js': Simulator.PATH_LIB + 'micropython/neopixel.js',
    'src/lib/radio.js': Simulator.PATH_LIB + 'micropython/radio.js',
    'src/lib/music.js': Simulator.PATH_LIB + 'micropython/music.js',
    // grove libraries
    // py
    'src/lib/scd30.py': Simulator.PATH_LIB + 'grove/simu_scd30.py',
    'src/lib/sgp30.py': Simulator.PATH_LIB + 'grove/simu_sgp30.py',
    'src/lib/bmp280.py': Simulator.PATH_LIB + 'grove/simu_bmp280.py',
    'src/lib/multichannel_gas.py': Simulator.PATH_LIB + 'grove/simu_multichannel_gas.py',
    'src/lib/dht11.py': Simulator.PATH_LIB + 'grove/simu_dht11.py',
    'src/lib/dht11_v2.py': Simulator.PATH_LIB + 'grove/simu_dht11.py',
    'src/lib/edgeModel.py': Simulator.PATH_LIB + 'ai/edgeModel.py',
    'src/lib/edgeModelP0-P1.py': Simulator.PATH_LIB + 'ai/edgeModelP0-P1.py',
    'src/lib/edgeModelP0.py': Simulator.PATH_LIB + 'ai/edgeModelP0.py',
    'src/lib/edgeModelP1.py': Simulator.PATH_LIB + 'ai/edgeModelP1.py',
    // js
    'src/lib/lcd_i2c.js': Simulator.PATH_LIB + 'grove/lcd_i2c.js',
    'src/lib/hm330x.js': Simulator.PATH_LIB + 'grove/hm330x.js',
    'src/lib/si1145.js': Simulator.PATH_LIB + 'grove/si1145.js',
    'src/lib/tm1637.js': Simulator.PATH_LIB + 'grove/tm1637.js',
    'src/lib/my9221.js': Simulator.PATH_LIB + 'grove/my9221.js',
    'src/lib/gas_gmxxx.js': Simulator.PATH_LIB + 'grove/gas_gmxxx.js',
    'src/lib/ht16k33.js': Simulator.PATH_LIB + 'grove/ht16k33.js',
    'src/lib/ht16k33matrix.js': Simulator.PATH_LIB + 'grove/ht16k33matrix.js',
    'src/lib/rgb_led_matrix.js': Simulator.PATH_LIB + 'grove/rgb_led_matrix.js',
    'src/lib/bme280.js': Simulator.PATH_LIB + 'envirobit/bme280.js',
    'src/lib/tcs3472.js': Simulator.PATH_LIB + 'envirobit/tcs3472.js',
    // robots libraries
    // py
    'src/lib/cutebotpro.js': Simulator.PATH_LIB + 'robots/cutebotpro.js',
    // js
    'src/lib/tello.js': Simulator.PATH_LIB + 'micropython/tello.js',
    'src/lib/cutebot.js': Simulator.PATH_LIB + 'robots/cutebot.js',
    'src/lib/maqueenplusv1.js': Simulator.PATH_LIB + 'robots/maqueenplusv1.js',
    'src/lib/maqueenplusv2.js': Simulator.PATH_LIB + 'robots/maqueenplusv2.js',
    'src/lib/HuskyLens.js': Simulator.PATH_LIB + 'grove/HuskyLens.js',
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    if (!board) return;

    const playButtonAnimation = (id, animation) => {
        const svgButtons = {
            'a_button': 'ellipse_top',
            'b_button': 'ellipse_top-2'
        };
        const button = board.querySelector("#" + svgButtons[id]);
        if (button) {
            button.style.transform = animation;
        }
    };

    const playPinAnimation = (id, animation) => {
        if (!id.includes('p')) {
            id = id.replace('_', 'p') + '-2';
        }
        const button = board.querySelector("#" + id);
        if (button) {
            button.classList.toggle('click_anim', animation);
        }
    };

    function makeElementAccessible(element, onPress, onRelease, customTabIndex = 0) {
        if (!element) return;

        const id = element.getAttribute("id") || "";
        if (!id.startsWith("_")) {
            element.setAttribute("tabindex", customTabIndex);
            element.setAttribute("role", "button");
            element.setAttribute("aria-pressed", "false");
            element.style.cursor = "pointer";
        }

        element.addEventListener("mousedown", () => {
            onPress();
            element.setAttribute("aria-pressed", "true");
        });

        element.addEventListener("mouseup", () => {
            onRelease();
            element.setAttribute("aria-pressed", "false");
        });

        element.addEventListener("touchstart", () => {
            onPress();
            element.setAttribute("aria-pressed", "true");
        });

        element.addEventListener("touchend", () => {
            onRelease();
            element.setAttribute("aria-pressed", "false");
        });

        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                onPress();
                element.setAttribute("aria-pressed", "true");
                e.preventDefault();
            }
        });

        element.addEventListener("keyup", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                onRelease();
                element.setAttribute("aria-pressed", "false");
                e.preventDefault();
            }
        });
    }

    // === Micro:bit Buttons A & B ===

    const buttons = ['a_button', 'b_button'];
    const up = 'translate(0px, 0px)';
    const down = 'translate(0px, 7px)';

    buttons.forEach((buttonId,index) => {
        const button = board.querySelector("#" + buttonId);
        if (!button) return;
        const letter = buttonId[0]; // 'a' or 'b'

        makeElementAccessible(
            button,
            () => {
                playButtonAnimation(buttonId, down);
                Simulator.setSliderValue('mb-button-' + letter, 1);
            },
            () => {
                playButtonAnimation(buttonId, up);
                Simulator.setSliderValue('mb-button-' + letter, 0);
            },
            index+2
        );
    });

    // === Micro:bit Logo ===

    const logo = board.querySelector("#microbit_logo");
    if (logo) {
        makeElementAccessible(
            logo,
            () => {
                logo.classList.add('logo_anim');
                Simulator.setSliderValue('mb-pin-logo', 1);
            },
            () => {
                logo.classList.remove('logo_anim');
                Simulator.setSliderValue('mb-pin-logo', 0);
            },
            1
        );
    }

    // === Micro:bit Pins ===

    const pins = ['p0-2', '_0', 'p1-2', '_1', 'p2-2', '_2'];
    pins.forEach((pinId, index) => {
        const pin = board.querySelector("#" + pinId);
        if (!pin) return;

        const pinIndex = pinId.match(/\d/g)?.[0];

        makeElementAccessible(
            pin,
            () => {
                playPinAnimation(pin.id, true);
                Simulator.setSliderValue('mb-pin-' + pinIndex, 1);
            },
            () => {
                playPinAnimation(pin.id, false);
                Simulator.setSliderValue('mb-pin-' + pinIndex, 0);
            },
            index+4
        );
    });

    // === Keyboard Shortcuts (A/B) ===

    $("body").on("keydown keyup", function (e) {
        if (!Simulator.isOpen) return;

        const isDown = e.type === 'keydown';
        const isUp = e.type === 'keyup';

        if (e.key === 'a' || e.key === 'A') {
            playButtonAnimation('a_button', isDown ? down : up);
            Simulator.setSliderValue('mb-button-a', isDown ? 1 : 0);
        } else if (e.key === 'b' || e.key === 'B') {
            playButtonAnimation('b_button', isDown ? down : up);
            Simulator.setSliderValue('mb-button-b', isDown ? 1 : 0);
        }
    });
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () {

    Sk.builtins.getUltrasonicData = function (trig, echo, data, timeout_us) {
        if (trig !== undefined && echo !== undefined) {
            $("#read-digital_" + echo.name).hide();
            Sk.builtin.pyCheckArgsLen("getUltrasonicData", arguments.length, 2, 4);
            Sk.builtin.pyCheckType("data", "string", Sk.builtin.checkString(data));
            Sk.builtin.pyCheckType("timeout_us", "integer", Sk.builtin.checkInt(timeout_us));
            const pins = Blockly.Constants.Pins.MICROBIT_PINS;
            const component = Simulator.pinList.find((component) => component.pin == trig.name);
            if (component !== undefined) {
                if (trig.name !== echo.name) {
                    $('#' + component.id).find(".subtitle-module").html(pins.find(p => p[1] == 'pin' + trig.name)[0] + ' / ' + pins.find(p => p[1] == 'pin' + echo.name)[0]);
                } else {
                    if (component.id.includes('hcsr04')) {
                        throw new Sk.builtin.AttributeError('[HCSR04] trig and echo cannot be on same pin (P' + trig.name + ')');
                    }
                }
                const duration = $('#' + component.id + '_slider_d').slider('option', 'value');
                if (data.v == 'distance') {
                    return new Sk.builtin.float_(Simulator.Mosaic.grove.calculs.getDistance(duration));
                } else if (data.v == 'duration') {
                    return new Sk.builtin.float_(duration);
                } else {
                    throw new Sk.builtin.ValueError("Data option '" + data.v + "' is not valid");
                }
            }
        } else {
            throw new Sk.builtin.ValueError("Pin '" + trig.name + "' or '" + echo.name + "' is not valid");
        }
    };
    Sk.builtins.getUltrasonicData.co_varnames = ['trig', 'echo', 'data', 'timeout_us'];
    Sk.builtins.getUltrasonicData.$defaults = [new Sk.builtin.str('distance'), new Sk.builtin.int_(30000)];

    Sk.builtins.read_heart_rate = new Sk.builtin.func(function (pin) {
        return new Sk.misceval.promiseToSuspension(new Promise(
            async (resolve) => {
                const value = Simulator.getSliderValue(`groveEarClip_${pin.name}`);
                await sleep_ms(15000);
                resolve(new Sk.builtin.int_(value));
            })
        );
    });

    // simu

    Sk.builtins.simulator_setModuleI2CAddress = new Sk.builtin.func(function (id, addr) {
        $("#" + id.v).find(".subtitle-module").html('I2C (0x' + (addr.v < 10 ? '0' : '') + addr.v.toString(16) + ')');
    });

    Sk.builtins.simulator_getSliderValue = new Sk.builtin.func(function (id, type) {
        const value = $('#' + id.v).slider('option', 'value');
        if (type.v == 'int') {
            if (typeof value === 'number') return new Sk.builtin.int_(value);
            return new Sk.builtin.int_(0);
        } else if (type.v == 'float') {
            if (typeof value === 'number') return new Sk.builtin.float_(value);
            return new Sk.builtin.float_(0.0);
        }
    });

    Sk.builtins.simulator_getPinValue = new Sk.builtin.func(function (pin) {
        return new Sk.builtin.int_(pin.name);
    });

    Sk.builtins.simulator_runEvery = new Sk.builtin.func(function (process, days, h, min, s, ms) {
        Sk.builtin.pyCheckType("process", "callable", Sk.builtin.checkCallable(process));
        Sk.builtin.pyCheckType("days", "integer", Sk.builtin.checkInt(days));
        Sk.builtin.pyCheckType("h", "integer", Sk.builtin.checkInt(h));
        Sk.builtin.pyCheckType("min", "integer", Sk.builtin.checkInt(min));
        Sk.builtin.pyCheckType("s", "integer", Sk.builtin.checkInt(s));
        Sk.builtin.pyCheckType("ms", "integer", Sk.builtin.checkInt(ms));

        const timeout = ms.v + 1000 * (s.v + 60 * (min.v + 60 * (h.v + 24 * days.v)));

        if (Simulator.intervals[process.$qualname]) {
            clearInterval(Simulator.intervals[process.$qualname]);
        }
        Simulator.intervals[process.$qualname] = setInterval(function () {
            if (Simulator.stop_flag || Sk.execLimit == 0) {
                clearInterval(Simulator.intervals[process.$qualname]);
            }
            Sk.misceval.asyncToPromise(function () {
                return Sk.misceval.callsimOrSuspendArray(process, []);
            })
                .then(function () { }, Simulator.handleError);
        }, timeout);
    });

    // pitch

    Sk.builtins.pitch = function (pin, frequency, duration) {
        const current_robot = Simulator.Mosaic.getCurrentRobot();
        let module = Simulator.getModuleByKey(`mb-buzzer`);
        let id = module.id;
        if (['Cutebot', 'Maqueen', 'MaqueenPlusV1', 'MaqueenPlusV2'].includes(current_robot)) {
            module = Simulator.getModuleByKey(`mb-${current_robot.toLowerCase()}-buzzer`);
        } else if (!Simulator.code.match(module.regex)) {
            module = Simulator.getModuleByKey('buzzer');
            id = module.id + "_" + pin.name;
        }
        const stopMusic = function (self) {
            self._data.osc.stop();
            delete self._data.osc;
            Simulator.setAnimator(module, id, 0);
        };
        const startOscillator = function (self, freq) {
            const volume = self._data.audioCtx.createGain();
            volume.connect(self._data.audioCtx.destination);
            volume.gain.value = self._data.volume;
            self._data.osc = self._data.audioCtx.createOscillator();
            self._data.osc.type = 'sine';
            self._data.osc.frequency.value = freq;
            self._data.osc.connect(volume);
            self._data.osc.start();
        };
        let self = {
            _data: {
                volume: 1,
                audioCtx: null
            }
        };

        if (duration === undefined) {
            duration = 1000;
        } else {
            duration = duration.v;
        }
        return Simulator.runAsync(function (resolve, reject) {
            if (!self._data.audioCtx) {
                self._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                Simulator.audioContext = self._data.audioCtx;
            }
            if (self._data.osc) {
                stopMusic(self);
            }
            Simulator.setAnimator(module, id, frequency.v);

            startOscillator(self, frequency.v);

            if (duration > 0) {
                setTimeout(function () {
                    stopMusic(self);
                    resolve();
                }, duration);
            }
            if (Simulator.stop_flag) {
                stopMusic(self);
                resolve();
            }
        });
    };
};

Simulator.Mosaic.groveRegex = {
    "write-digital": /pin([0-9]{1,2}).write_digital\(/g,
    "read-digital": /pin([0-9]{1,2}).read_digital\(\)/gi,
    'write-analog': /pin([0-9]{1,2}).write_analog\(/gi,
    "read-analog": /pin([0-9]{1,2}).read_analog\(\)/gi,
    // I2C modules
    "sgp30": /(.|)SGP30\(/gi,
    "multichannel": /(.|)GAS\(/gi,
    "scd30-co2": /scd30_read\(0\)/gi,
    "scd30-temp": /scd30_read\(1\)/gi,
    "scd30-hum": /scd30_read\(2\)/gi,
    "bmp280-temp": /(.|)BMP280\(/gi,
    "bmp280-press": /(.|)BMP280\(/gi,
    "bmp280-alt": /(.|)BMP280\(/gi,
    "si1145": /(.|)SI1145\(/gi,
    "hm330x": /(.|)HM330X\(/g,
    "bme280-temp": /bme280\.temperature\(\)/gi,
    "bme280-hum": /bme280\.humidity\(\)/gi,
    "bme280-press": /bme280\.(pressure|altitude)\(\)/gi,
    "bme280-alt": /bme280\.(pressure|altitude)\(\)/gi,
    "lcdGrove": /(.|)LCD1602\(/gi,
    "LEDMatrix": /(.|)HT16K33Matrix\(/gi,
    "RGBLEDMatrix": /(.|)GroveTwoRGBLedMatrix\(/gi,
    "oled": /oled./gi,
    "multichannelV2": /multichannel_v2\.measure_/gi,
    // Pins on module - inputs
    "gps": /# GPS on UART/gi,
    // Pins on module - outputs
    "openlog": /# Lecteur SD on pin([0-9]{1,2})/gi,
};

Simulator.Mosaic.specific = {
    extract: (str) => str.split('.')[0],
    extractPin: {
        'write-digital': (str) => Simulator.Mosaic.specific.extract(str),
        'read-digital': (str) => Simulator.Mosaic.specific.extract(str),
        'write-analog': (str) => Simulator.Mosaic.specific.extract(str),
        'read-analog': (str) => Simulator.Mosaic.specific.extract(str),
        'pwm': (str) => Simulator.Mosaic.specific.extract(str)
    },
    gesture: {
        ACCELEROMETER_GESTURES: ['shake', 'up', 'down', 'left', 'right', 'face up', 'face down', 'freefall', '3g', '6g', '8g'],
        history: null,
        init: function () {
            this.history = new Array();
        },
        resetOtherGestures: function (gesture) {
            this.history.push(gesture);
            for (var i = 0; i < this.ACCELEROMETER_GESTURES.length; i++) {
                const g = this.ACCELEROMETER_GESTURES[i];
                if (gesture !== g) {
                    $('#mb-gesture-' + g.replace(/ /g, '') + '_slider').slider('value', 0);
                }
            }
        },
        getCurrentGesture: function () {
            for (var i = 0; i < this.ACCELEROMETER_GESTURES.length; i++) {
                const g = this.ACCELEROMETER_GESTURES[i];
                const state = $('#mb-gesture-' + g.replace(/ /g, '') + '_slider').slider('option', 'value');
                if (state == 1) {
                    return g;
                }
            }
            return null;
        }
    },
    // need to be implemented properly for microbit
    tello: {
        ONE_ANGLE_DURATION: 11,
        ONE_CM_DURATION: 55,
        storedMovements: [],
        isRunning: false,
        angleInterval: null,
        unitInterval: null,
        altInterval: null,
        isConnected: false,
        isBusy: false,
        startRunning: function () {
            // console.log("[TELLO] startRunning()");
            if (this.isConnected) {
                if (!this.isRunning) {
                    this.isRunning = true;
                    try {
                        this.runMotors();
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
        },
        showTelloError: function (error, exception, type) {
            UIManager.showErrorMessage("error-message", type + ": " + error);
            Simulator.pause();
        },

        stopRunning: function () {
            // console.log("[TELLO] stopRunning()");
            if (this.isRunning) {
                this.isRunning = false;
                RobotSimulator.isForRotation = false;
            }
        },
        runMotors: function () {
            // console.log("[TELLO] runMotors()");
            RobotSimulator.isForRotation = true;
            if (this.storedMovements.length > 0) {
                RobotSimulator.isForRotation = false;
                if ((this.storedMovements[0][0] == "forward" || this.storedMovements[0][0] == "backward") && this.storedMovements[0][1] != 0) {
                    this.moveCommand();
                } else if (this.storedMovements[0][0] == "fly_right" || this.storedMovements[0][0] == "fly_left") {
                    this.moveCommand();
                } else if (this.storedMovements[0][0] == "right" || this.storedMovements[0][0] == "left") {
                    this.turnCommand();
                } else if (this.storedMovements[0][0] == "flip_f" || this.storedMovements[0][0] == "flip_b" || this.storedMovements[0][0] == "flip_r" || this.storedMovements[0][0] == "flip_l") {
                    this.flipCommand();
                } else if ((this.storedMovements[0][0] == "up" || this.storedMovements[0][0] == "down") && this.storedMovements[0][1] != 0) {
                    this.altitudeCommand();
                } else if (this.storedMovements[0][0] == "land") {
                    this.altitudeCommand();
                } else {
                    this.stopRunning();
                }
            } else {
                this.stopMotors();
            }
        },
        flipCommand: function () {
            // console.log("[TELLO] flipCommand()");
            this.isBusy = true;
            const dir = this.storedMovements[0][0];
            var _this = this;
            RobotSimulator.robot.DIRECTION = dir;
            RobotSimulator.robot.altitudeIsChanging = false;

            this.unitInterval = setInterval(() => {
                RobotSimulator.isFlipping = true;
                RobotSimulator.ctx.scale(1, 1)
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1
                } else {
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.unitInterval);
                        RobotSimulator.isFlipping = false;
                        RobotSimulator.flipProgress = 0;
                        _this.storedMovements.shift();
                        _this.isBusy = false;
                        _this.runMotors();
                    }
                } else {
                    clearInterval(_this.unitInterval);
                }
            }, 40); // 40ms is the duration of a flip of a single frame update (30° increment)

        },
        moveCommand: function () {
            // console.log("[TELLO] moveCommand()");
            this.isBusy = true;
            console.log('robot moving')
            const dir = this.storedMovements[0][0];
            var _this = this;
            RobotSimulator.robot.DIRECTION = dir;
            RobotSimulator.robot.altitudeIsChanging = false;
            this.unitInterval = setInterval(() => {
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1
                } else {
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.unitInterval);
                        _this.storedMovements.shift();
                        _this.runMotors();
                        _this.isBusy = false;
                    }
                } else {
                    clearInterval(_this.unitInterval);
                    _this.isBusy = false;

                }
            }, _this.ONE_CM_DURATION * RobotSimulator.robot.DEFAULT_SPEED_M_S / RobotSimulator.robot.speed_meter_s);

        },
        turnCommand: function () {
            // console.log("[TELLO] turnCommand()");
            this.isBusy = true;
            const dir = this.storedMovements[0][0];
            var _this = this;
            RobotSimulator.robot.DIRECTION = dir;
            RobotSimulator.robot.altitudeIsChanging = false;
            this.angleInterval = setInterval(function () {
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1;
                    RobotSimulator.robot.angle = RobotSimulator.robot.angle + (dir == "left" ? -1 : 1);
                } else {
                    RobotSimulator.robot.angle = RobotSimulator.robot.angle + (dir == "left" ? -1 : 1);
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.angleInterval);
                        _this.storedMovements.shift();
                        _this.isBusy = false;
                        _this.runMotors();
                    }
                } else {
                    clearInterval(_this.angleInterval);
                }
            }, _this.ONE_ANGLE_DURATION);
        },
        altitudeCommand: function () {
            // console.log("[TELLO] altitudeCommand()");
            this.isBusy = true;
            const dir = this.storedMovements[0][0];
            var _this = this;
            RobotSimulator.robot.DIRECTION = dir;
            RobotSimulator.robot.altitudeIsChanging = true;
            if (dir == "land")
                _this.storedMovements[0][1] = parseInt($('#tello-altitude_value_d').html());

            this.altInterval = setInterval(() => {
                if (_this.storedMovements[0][1] >= 1) {
                    _this.storedMovements[0][1] -= 1;
                    RobotSimulator.robot.changeAltitude(dir, 1);
                } else {
                    _this.storedMovements[0][1] = 0;
                }
                if (_this.isRunning) {
                    if (_this.storedMovements[0][1] === 0) {
                        clearInterval(_this.altInterval);
                        _this.storedMovements.shift();
                        RobotSimulator.robot.altitudeIsChanging = false;
                        _this.isBusy = false;
                        _this.runMotors();
                    }
                } else {
                    clearInterval(_this.altInterval);
                }
            }, _this.ONE_CM_DURATION * RobotSimulator.robot.DEFAULT_SPEED_M_S / RobotSimulator.robot.speed_meter_s);
        },
        stopMotors: function () {
            clearInterval(this.angleInterval);
            clearInterval(this.unitInterval);
            clearInterval(this.altInterval);
            this.stopRunning();
        }
    },
    logTable: {
        headers: [],
        rows: [],
        pageCode: "",

        openLog: function () {
            const container = document.querySelector(".module-img-group");
            const image = container.querySelector(".mb-log_base");
            const download = document.createElement('button');
            download.textContent = "open LOG";
            download.classList.add("button-download-log");
            download.addEventListener('click', function () {
                const header = Simulator.Mosaic.specific.logTable.headers;
                const rows = Simulator.Mosaic.specific.logTable.rows;

                pseudoModal.openModal('modal-microbit-logdata');
                const modalLogContent = document.getElementById("modal-microbit-logdata-body");
                modalLogContent.innerHTML = "";
                const buttonWrapper = document.getElementById('modal-microbit-logdata-buttons');
                buttonWrapper.innerHTML = "";

                const downloadButton = document.createElement('button');
                downloadButton.textContent = "Download";
                buttonWrapper.appendChild(downloadButton);
                downloadButton.addEventListener('click', function () {
                    Simulator.Mosaic.specific.logTable.downloadCSV();
                });

                const copyButton = document.createElement('button');
                copyButton.textContent = "Copy";
                buttonWrapper.appendChild(copyButton);
                copyButton.addEventListener('click', function () {
                    Simulator.Mosaic.specific.logTable.copyCSV();
                });

                const table = document.createElement('table');
                table.classList.add("log-data-table");
                const tableContent = `
                ${header.map(header => `<td>${header}</td>`).join("")}
                ${rows.map(row => `<tr>${row.split(",").map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
                `;
                table.innerHTML = tableContent;
                modalLogContent.appendChild(table);
            });
            container.insertBefore(download, image);
        },

        downloadCSV: function () {
            let csv = '';
            Simulator.Mosaic.specific.logTable.headers.forEach(function (header) {
                csv += header + ';';
            });
            csv += '\n';
            this.rows.forEach(function (row) {
                const cells = row.split(',');
                cells.forEach(function (cell) {
                    csv += cell + ';';
                });
                csv += '\n';
            });
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'microbit-log.csv';
            hiddenElement.click();
        },
        copyCSV: function () {
            let csv = '';
            this.headers.forEach(function (header) {
                csv += header + ';';
            });
            csv += '\n';
            this.rows.forEach(function (row) {
                const cells = row.split(',');
                cells.forEach(function (cell) {
                    csv += cell + ';';
                });
                csv += '\n';
            });
            const el = document.createElement('textarea');
            el.value = csv;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },
    },

    createSliders: function () {
        $('#mb-thermometer_slider').slider({
            min: 0,
            max: 100,
            value: 20
        });
        $('#mb-light_slider,' +
            '#mb-micro_slider,' +
            '#tcs3472-light_slider').slider({
                min: 0,
                max: 255,
                value: 55
            });
        $('#mb-compassMag_slider_x').slider({
            min: -6000,
            max: 60000,
            value: 15000
        });
        $('#mb-compassMag_slider_y').slider({
            min: -66000,
            max: 33000,
            value: 3000
        });
        $('#mb-compassMag_slider_z').slider({
            min: -93000,
            max: 5200,
            value: -8000
        });
        $('#mb-compassMag_slider_strength').slider({
            min: 0,
            max: 12,
        });
        $('#mb-compassDir_slider').slider({
            min: 0,
            max: 360,
            value: 90
        });
        $('#mb-accelerometer_slider_x,' +
            '#mb-accelerometer_slider_y,' +
            '#mb-accelerometer_slider_z').slider({
                min: -2000,
                max: 2000,
                value: 0
            });
        $('#mb-accelerometer-pitch_slider,' +
            '#mb-accelerometer-roll_slider').slider({
                min: -90,
                max: 90,
                value: 0
            });
        $('#mb-button-a_slider,' +
            '#mb-button-b_slider,' +
            '#mb-button-ab_slider,' +
            '#mb-pin-logo_slider,' +
            '#mb-pin-0_slider,' +
            '#mb-pin-1_slider,' +
            '#mb-pin-2_slider,' +
            '#mb-gesture-shake_slider,' +
            '#mb-gesture-up_slider,' +
            '#mb-gesture-down_slider,' +
            '#mb-gesture-left_slider,' +
            '#mb-gesture-right_slider,' +
            '#mb-gesture-faceup_slider,' +
            '#mb-gesture-facedown_slider,' +
            '#mb-gesture-freefall_slider,' +
            '#mb-gesture-3g_slider,' +
            '#mb-gesture-6g_slider,' +
            '#mb-gesture-8g_slider,' +
            '#mb-bitplayer-a_slider,' +
            '#mb-bitplayer-b_slider,' +
            '#mb-bitplayer-c_slider,' +
            '#mb-bitplayer-d_slider,' +
            '#mb-bitplayer-l_slider,' +
            '#mb-bitplayer-r_slider,' +
            '#mb-gamepad-v4-c_slider,' +
            '#mb-gamepad-v4-d_slider,' +
            '#mb-gamepad-v4-e_slider,' +
            '#mb-gamepad-v4-f_slider,' +
            '#mb-gamepad-v4-z_slider,' +
            '#mb-gamepad-X_slider,' +
            '#mb-gamepad-Y_slider,' +
            '#mb-gamepad-up_slider,' +
            '#mb-gamepad-down_slider,' +
            '#mb-gamepad-left_slider,' +
            '#mb-gamepad-right_slider,' +
            '#mb-maqueen-finderLeft_slider_v,' +
            '#mb-maqueen-finderRight_slider_v,' +
            '#mb-kitrobot-finderLeft_slider_v,' +
            '#mb-kitrobot-finderRight_slider_v,' +
            '#mb-bitcar-finderLeft_slider_v,' +
            '#mb-bitcar-finderRight_slider_v,' +
            '#mb-cutebot-finderLeft_slider_v,' +
            '#mb-cutebot-finderRight_slider_v,' +
            '#mb-maqueenplus-finderLeftRear_slider_v,' +
            '#mb-maqueenplus-finderLeft_slider_v,' +
            '#mb-maqueenplus-finderMiddleLeft_slider_v,' +
            '#mb-maqueenplus-finderMiddle_slider_v,' +
            '#mb-maqueenplus-finderMiddleRight_slider_v,' +
            '#mb-maqueenplus-finderRight_slider_v,' +
            '#mb-maqueenplus-finderRightRear_slider_v').slider({
                min: 0,
                max: 1,
                value: 0
            });

        $('.mod_tcs3472-rgb_r,' +
            '.mod_tcs3472-rgb_g,' +
            '.mod_tcs3472-rgb_b,' +
            '#mb-cutebotpro-finderLeft_slider_v,' +
            '#mb-cutebotpro-finderCenterLeft_slider_v,' +
            '#mb-cutebotpro-finderRight_slider_v,' +
            '#mb-cutebotpro-finderCenterRight_slider_v').slider({
                min: 0,
                max: 0xFF,
                value: 0
            });

            $('.mod_mb-cutebotpro-ultrasonic_t,' +
                '.mod_mb-cutebotpro-ultrasonic_d').slider({
                    min: 88,
                    max: 14575,
                    value: 1166,
                    step: 0.1
                });
    },

    calculs: {
        getServoAngle(duty) {
            return (duty / PWM_MAX_DUTY * 100 - 2.5) * 180 / (12.5 - 2.5);
        },
        getServoSpeed(duty) {
            const speed_ms = duty * 20 / PWM_MAX_DUTY;
            return (speed_ms - 1.5) * 100 * 2;
        }
    },

    buttons: {
        "a": 0,
        "b": 0
    },

    definitions: [

        /* Microbit modules */
        {
            regex: /log\.add_log\(/g,
            id: "mb-log",
            title: "Log",
            pin: 'micro:bit',
            type: 'output',
            value: "",
            picture: "Log.png",
            pictureAnimation: "Log-animation.png",
            animate: function (Animator) {
            }
        },
        {
            regex: /display\.read_light_level\(\)/g,
            id: "mb-light",
            title: "Capteur de luminosité",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: 55,
                unit: '',
                color: "#f9d142 ",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 255);
            }
        },
        {
            regex: /(?<!\.)temperature\(\)/,
            id: "mb-thermometer",
            title: "Capteur de température",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: 20,
                unit: '°C',
                color: "#f8a10f",
                suffix: "",
            }],
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            regex: /accelerometer\.get_[xyz]\(\)/,
            id: "mb-accelerometer",
            title: "Accéléromètre : ",
            pin: 'micro:bit',
            type: 'input',
            color: "#22b573",
            listeners: [{
                suffix: "_x",
                default: 0,
                unit: 'm/s2',
                color: "#ff4d6a",
                title: "Axe x"
            }, {
                suffix: "_y",
                default: 0,
                unit: 'm/s2',
                color: "#f9d142",
                title: "Axe y"
            }, {
                suffix: "_z",
                default: 0,
                unit: 'm/s2',
                color: "#1a6da8",
                title: "Axe z"
            }],
            picture: "Accélerateur.png",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-2000, 2000);
                const values = {
                    "x": parseInt($("#mb-accelerometer_slider_x").slider('option', 'value')),
                    "y": parseInt($("#mb-accelerometer_slider_y").slider('option', 'value')),
                    "z": parseInt($("#mb-accelerometer_slider_z").slider('option', 'value'))
                };
                const pitch = Math.atan2(values["y"], -values["z"]) * 180 / Math.PI;
                $("#mb-accelerometer-pitch_value").html(roundFloat(pitch, 1) + " °");
                $("#mb-accelerometer-pitch_anim").css('transform', "rotateX(-60deg) rotateZ(-15deg) rotate3d(1, 0, 0, " + -pitch + "deg)");
                const roll = Math.atan2(values["x"], Math.sqrt(values["y"] ** 2 + values["z"] ** 2)) * 180 / Math.PI;
                $("#mb-accelerometer-roll_value").html(roundFloat(roll, 1) + " °");
                $("#mb-accelerometer-roll_anim").css('transform', "rotateX(-60deg) rotateZ(-15deg) rotate3d(0, 1, 0, " + -roll + "deg)");
            }
        },
        {
            regex: /accelerometer\.get_[yz]\(\)/,
            id: "mb-accelerometer-pitch",
            title: "Accéleromètre - Tangage",
            pin: 'micro:bit',
            type: 'output',
            value: "0 °",
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png"
        },
        {
            regex: /accelerometer\.get_[xyz]\(\)/,
            id: "mb-accelerometer-roll",
            title: "Accéleromètre - Roulis",
            pin: 'micro:bit',
            type: 'output',
            value: "0 °",
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
        },
        {
            regex: /compass\.heading\(\)/,
            id: "mb-compassDir",
            title: "Boussole",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 90,
                unit: '°',
                color: "#448ae5",
                title: "Direction"
            }],
            picture: "Boussole.png",
            pictureAnimation: "Boussole-animation.png",
            animate: function (Animator) {
                Animator.rotate(0, 360, text = Animator.value, degree = 360);
            }
        },
        {
            regex: /compass\.get_[xyz]\(\)/,
            id: "mb-compassMag",
            title: "Boussole : ",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                suffix: "_x",
                default: 15000,
                unit: 'µT',
                color: "#ff4d6a",
                title: "Champ Mag. x"
            }, {
                suffix: "_y",
                default: 3000,
                unit: 'µT',
                color: "#f9d142",
                title: "Champ Mag. y"
            }, {
                suffix: "_z",
                default: -8000,
                unit: 'µT',
                color: "#1a6da8",
                title: "Champ Mag. z"
            }
            ],
            picture: "Champ-magnetique.png",
            animate: function (Animator) {
                $(Animator.valueId).text(roundFloat(Animator.value / 1000, 1)); // convert nT in µT
            }
        },
        {
            regex: /# Traffic Light/gi,
            id: "mb-trafficLight",
            title: "Panneau de signalisation",
            pin: 'P0 P1 P2',
            ledDiv: [
                "mb-trafficLight-red",
                "mb-trafficLight-orange",
                "mb-trafficLight-green"
            ],
            type: 'output',
            value: "",
            picture: "feu-tricolore.png"
        },
        {
            regex: /button_a.(is|was)_pressed\(\)/,
            id: "mb-button-a",
            title: "Bouton A",
            codeFlag: "Button A",
            pin: 'micro:bit',
            type: 'input',
            releaser: true,
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            animate: function (Animator) {
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.buttons["a"] = 1;
                }
                Animator.button(Animator.value);
            }
        },
        {
            regex: /button_b.(is|was)_pressed\(\)/,
            id: "mb-button-b",
            title: "Bouton B",
            pin: 'micro:bit',
            type: 'input',
            releaser: true,
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            animate: function (Animator) {
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.buttons["b"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /(button_a.(is|was)_pressed\(\)\s*and\s*button_b.(is|was)_pressed\(\))|(button_b.(is|was)_pressed\(\)\s*and\s*button_a.(is|was)_pressed\(\))/,
            id: "mb-button-ab",
            title: "Bouton A+B",
            pin: 'micro:bit',
            type: 'input',
            releaser: true,
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            animate: function (Animator) {
                Animator.button();
                $('#mb-button-a_slider').slider("option", "value", Animator.value);
                $('#mb-button-b_slider').slider("option", "value", Animator.value);
            }
        },
        {
            regex: /pin_logo\.is_touched\(\)/,
            id: "mb-pin-logo",
            title: "Logo",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /pin0\.is_touched\(\)/,
            id: "mb-pin-0",
            title: "P0",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /pin1\.is_touched\(\)/,
            id: "mb-pin-1",
            title: "P1",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /pin2\.is_touched\(\)/,
            id: "mb-pin-2",
            title: "P2",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]shake['"]/,
            id: "mb-gesture-shake",
            title: "Secouer",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "shake",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-shake_value").html("ON");
                    $("#mb-gesture-shake_anim").addClass('mb-gesture-shake_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('shake');
                } else {
                    $("#mb-gesture-shake_value").html("OFF");
                    $("#mb-gesture-shake_anim").removeClass('mb-gesture-shake_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]up['"]/,
            id: "mb-gesture-up",
            title: "Logo vers le haut",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "logo en haut",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-up_value").html("ON");
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('up');
                } else {
                    $("#mb-gesture-up_value").html("OFF");
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]down['"]/,
            id: "mb-gesture-down",
            title: "Logo vers le bas",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "logo en bas",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-down_value").html("ON");
                    $("#mb-gesture-down_anim").addClass('mb-gesture-down_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('down');
                } else {
                    $("#mb-gesture-down_value").html("OFF");
                    $("#mb-gesture-down_anim").removeClass('mb-gesture-down_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]face up['"]/,
            id: "mb-gesture-faceup",
            title: "Écran vers le haut",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "écran en haut",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-faceup_value").html("ON");
                    $("#mb-gesture-faceup_anim").addClass('mb-gesture-faceup_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('face up');
                } else {
                    $("#mb-gesture-faceup_value").html("OFF");
                    $("#mb-gesture-faceup_anim").removeClass('mb-gesture-faceup_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]face down['"]/,
            id: "mb-gesture-facedown",
            title: "Écran vers le bas",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "écran en bas",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-facedown_value").html("ON");
                    $("#mb-gesture-facedown_anim").addClass('mb-gesture-facedown_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('face down');
                } else {
                    $("#mb-gesture-facedown_value").html("OFF");
                    $("#mb-gesture-facedown_anim").removeClass('mb-gesture-facedown_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]left['"]/,
            id: "mb-gesture-left",
            title: "Tourner à gauche",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "pencher à gauche",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-left_value").html("ON");
                    $("#mb-gesture-left_anim").addClass('mb-gesture-left_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('left');
                } else {
                    $("#mb-gesture-left_value").html("OFF");
                    $("#mb-gesture-left_anim").removeClass('mb-gesture-left_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]right['"]/,
            id: "mb-gesture-right",
            title: "Tourner à droite",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "pencher à droite",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-right_value").html("ON");
                    $("#mb-gesture-right_anim").addClass('mb-gesture-right_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('right');
                } else {
                    $("#mb-gesture-right_value").html("OFF");
                    $("#mb-gesture-right_anim").removeClass('mb-gesture-right_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]freefall['"]/,
            id: "mb-gesture-freefall",
            title: "Chute libre",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "chute libre",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-freefall_value").html("ON");
                    $("#mb-gesture-freefall_anim").addClass('mb-gesture-freefall_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('freefall');
                } else {
                    $("#mb-gesture-freefall_value").html("OFF");
                    $("#mb-gesture-freefall_anim").removeClass('mb-gesture-freefall_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]3g['"]/,
            id: "mb-gesture-3g",
            title: "3g",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "3g",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-3g_value").html("ON");
                    $("#mb-gesture-3g_anim").addClass('mb-gesture-3g_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('3g');
                } else {
                    $("#mb-gesture-3g_value").html("OFF");
                    $("#mb-gesture-3g_anim").removeClass('mb-gesture-3g_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]6g['"]/,
            id: "mb-gesture-6g",
            title: "6g",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "6g",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-6g_value").html("ON");
                    $("#mb-gesture-6g_anim").addClass('mb-gesture-6g_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('6g');
                } else {
                    $("#mb-gesture-6g_value").html("OFF");
                    $("#mb-gesture-6g_anim").removeClass('mb-gesture-6g_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]8g['"]/,
            id: "mb-gesture-8g",
            title: "8g",
            pin: 'micro:bit',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "8g",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "Carte-microbit.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#mb-gesture-8g_value").html("ON");
                    $("#mb-gesture-8g_anim").addClass('mb-gesture-8g_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('8g');
                } else {
                    $("#mb-gesture-8g_value").html("OFF");
                    $("#mb-gesture-8g_anim").removeClass('mb-gesture-8g_active');
                }
            }
        },
        {
            regex: /microphone\.(set_threshold|sound_level|current_event|was_event|is_event|get_events)\(/gi,
            id: "mb-micro",
            title: "Microphone",
            pin: 'micro:bit v2',
            type: 'input',
            listeners: [{
                default: "0 (NONE)",
                unit: '',
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                if (Animator.value >= 128) {
                    $(Animator.valueId).text(Animator.value + ' (LOUD)');
                    $(Animator.animId).css("filter", 'hue-rotate(310deg)')
                } else if (Animator.value <= 128) {
                    $(Animator.valueId).text(Animator.value + ' (QUIET)');
                    $(Animator.animId).css("filter", 'hue-rotate(15deg)')
                } else if (Animatior.value == 0) {
                    $(Animator.valueId).text(Animator.value + ' (NONE)');
                }
                $(Animator.animId).css('opacity', Animator.value / 255);
            }
        },
        {
            regex: /# Buzzer on pin_speaker/gi,
            id: "mb-buzzer",
            title: "Buzzer",
            pin: 'micro:bit v2',
            type: 'output',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        // Robots - Maqueen
        {
            regex: /maqueen\.setServomotor\(0x14/gi,
            id: "mb-maqueen-servo1",
            title: "Servo 1",
            pin: 'Maqueen (I2C: 0x14)',
            type: 'output',
            class: 'servo',
            value: 90,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png"
        },
        {
            regex: /maqueen\.setServomotor\(0x15/gi,
            id: "mb-maqueen-servo2",
            title: "Servo 2",
            class: 'servo',
            pin: 'Maqueen (I2C: 0x15)',
            type: 'output',
            value: 90,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png"
        },
        {
            regex: /maqueen\.setMotor\((0|0x00)(| ),/gi,
            id: "mb-maqueen-motorLeft",
            title: "Moteur Gauche",
            pin: 'Maqueen (I2C: 0x00)',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /maqueen\.setMotor\((2|0x02)(| ),/gi,
            id: "mb-maqueen-motorRight",
            title: "Moteur Droit",
            pin: 'Maqueen (I2C: 0x02)',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /maqueen\.readLine\(pin13\)/gi,
            id: "mb-maqueen-finderLeft",
            title: "cap. Ligne noire (Gauche)",
            pin: 'Maqueen (P13)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /maqueen\.readLine\(pin14\)/gi,
            id: "mb-maqueen-finderRight",
            title: "cap. Ligne noire (Droit)",
            pin: 'Maqueen (P14)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            codeFlag: "Maqueen Buzzer",
            id: "mb-maqueen-buzzer",
            title: "Buzzer",
            pin: 'Maqueen (P0)',
            type: 'output',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        // Robots - Cutebot
        {
            regex: /cutebot\.set_servo_1_angle\(.+\)/gi,
            id: "mb-cutebot-servo1",
            title: "Servo 1",
            pin: 'Cutebot',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /cutebot\.set_servo_2_angle\(.+\)/gi,
            id: "mb-cutebot-servo2",
            title: "Servo 2",
            pin: 'Cutebot',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /cutebot\.(_set_motor_speed\(cutebot.MOTOR_LEFT,.+\)|set_motors_speed\(.+,.+\))/gi,
            id: "mb-cutebot-motorLeft",
            title: "Moteur Gauche",
            pin: 'Cutebot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /cutebot\.(_set_motor_speed\(cutebot.MOTOR_RIGHT,.+\)|set_motors_speed\(.+,.+\))/gi,
            id: "mb-cutebot-motorRight",
            title: "Moteur Droit",
            pin: 'Cutebot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /cutebot\.has_left_track\(\)/gi,
            id: "mb-cutebot-finderLeft",
            title: "cap. Ligne noire (Gauche)",
            pin: 'Cutebot',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /cutebot\.has_right_track\(\)/gi,
            id: "mb-cutebot-finderRight",
            title: "cap. Ligne noire (Droit)",
            pin: 'Cutebot',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /cutebot\.set_right_rgb_led\(.+\)/gi,
            id: "mb-cutebot-RightRGBLed",
            title: "LED RGB (droite)",
            pin: 'Cutebot',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            regex: /cutebot\.set_left_rgb_led\(.+\)/gi,
            id: "mb-cutebot-LeftRGBLed",
            title: "LED RGB (gauche)",
            pin: 'Cutebot',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            codeFlag: "Cutebot Buzzer",
            id: "mb-cutebot-buzzer",
            title: "Buzzer",
            pin: 'Cutebot (P0)',
            type: 'output',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        // Robots - Cutebot Pro
        {
            regex: /CutebotPro\.(pwmCruiseControlMotor|fullSpeedAhead|fullAstern|stopImmediately|readSpeed|cruiseControl|turnWithRadius|runDistance|turnWheel|turnWithAngle|runSquare)\(/gi,
            id: "mb-cutebotpro-motorLeft",
            title: "Moteur Gauche",
            pin: 'Cutebot Pro (0x10)',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /CutebotPro\.(pwmCruiseControlMotor|fullSpeedAhead|fullAstern|stopImmediately|readSpeed|cruiseControl|turnWithRadius|runDistance|turnWheel|turnWithAngle|runSquare)\(/gi,
            id: "mb-cutebotpro-motorRight",
            title: "Moteur Droit",
            pin: 'Cutebot Pro (0x10)',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /CutebotPro\.(controlHeadlights|controlHeadlightsHex|turnOffHeadlights)\(/gi,
            id: "mb-cutebotpro-LeftRGBLed",
            title: "LED RGB (gauche)",
            pin: 'Cutebot Pro (0x10)',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            regex: /CutebotPro\.(controlHeadlights|controlHeadlightsHex|turnOffHeadlights)\(/gi,
            id: "mb-cutebotpro-RightRGBLed",
            title: "LED RGB (droite)",
            pin: 'Cutebot Pro (0x10)',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            regex: /CutebotPro\.setNeopixelColor\(/gi,
            id: "neopixel_15",
            title: "Neopixel",
            codeFlag: "Neopixel",
            pin: 'Cutebot Pro (P15)',
            pins: 'digital',
            type: 'output',
            value: "",
        },
        {
            regex: /CutebotPro\.readUltrasonic\(/gi,
            id: "mb-cutebotpro-ultrasonic",
            title: "Télémètre: ",
            pin: 'Cutebot Pro (P8/P12)',
            pins: 'digital',
            type: 'input',
            listeners: [{
                default: 20,
                unit: 'cm',
                color: "#f9d142 ",
                suffix: "_d",
                title: "Distance"
            }, {
                suffix: "_t",
                default: 1166,
                unit: 'μs',
                color: "#f9d142",
                title: "Durée"
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.opacity(14575, 0, text = value);
                const t = Animator.value;
                Animator.updateListeners({
                    "_d": roundFloat(Simulator.Mosaic.grove.calculs.getDistance(t), 1),
                    "_t": t
                }, callbackAnim);
            }
        },
        {
            regex: /CutebotPro\.(getLineTrackerStates|isLineTrackerState|getLineOffset|isSensorTrackingLine|getGrayscaleTrackingValue)\(/gi,
            id: "mb-cutebotpro-finderLeft",
            title: "cap. Ligne noire (Gauche)",
            pin: 'Cutebot Pro (0x10)',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 0,
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value > 0x7f);
            }
        },
        {
            regex: /CutebotPro\.(getLineTrackerStates|isLineTrackerState|getLineOffset|isSensorTrackingLine|getGrayscaleTrackingValue)\(/gi,
            id: "mb-cutebotpro-finderCenterLeft",
            title: "cap. Ligne noire (Centre Gauche)",
            pin: 'Cutebot Pro (0x10)',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 0,
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value > 0x7f);
            }
        },
        {
            regex: /CutebotPro\.(getLineTrackerStates|isLineTrackerState|getLineOffset|isSensorTrackingLine|getGrayscaleTrackingValue)\(/gi,
            id: "mb-cutebotpro-finderCenterRight",
            title: "cap. Ligne noire (Centre Droit)",
            pin: 'Cutebot Pro (0x10)',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 0,
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value > 0x7f);
            }
        },
        {
            regex: /CutebotPro\.(getLineTrackerStates|isLineTrackerState|getLineOffset|isSensorTrackingLine|getGrayscaleTrackingValue)\(/gi,
            id: "mb-cutebotpro-finderRight",
            title: "cap. Ligne noire (Droit)",
            pin: 'Cutebot Pro (0x10)',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 0,
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value > 0x7f);
            }
        },
        {
            regex: /CutebotPro\.controlServo\(1/gi,
            id: "mb-cutebotpro-servo1",
            title: "Servo 1",
            pin: 'Cutebot Pro (0x10)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /CutebotPro\.controlServo\(2/gi,
            id: "mb-cutebotpro-servo2",
            title: "Servo 2",
            pin: 'Cutebot Pro (0x10)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /CutebotPro\.controlServo\(3/gi,
            id: "mb-cutebotpro-servo3",
            title: "Servo 3",
            pin: 'Cutebot Pro (0x10)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /CutebotPro\.controlServo\(4/gi,
            id: "mb-cutebotpro-servo4",
            title: "Servo 4",
            pin: 'Cutebot Pro (0x10)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        // Robots - MaqueenPlus
        {
            regex: /maqueenplusv(1|2)/gi,
            id: "mb-maqueenplus-motorLeft",
            title: "Moteur Gauche",
            pin: 'MaqueenPlus',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /maqueenplusv(1|2)/gi,
            id: "mb-maqueenplus-motorRight",
            title: "Moteur Droit",
            pin: 'MaqueenPlus',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /maqueenplusv(1|2)\.sensor_on_line\(("L1"|0)\)/gi,
            id: "mb-maqueenplus-finderLeftRear",
            title: "cap. Ligne noire (Arrière gauche)",
            pin: 'MaqueenPlus',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /maqueenplusv(1|2)\.sensor_on_line\(("L2"|1\))/gi,
            id: "mb-maqueenplus-finderLeft",
            title: "cap. Ligne noire (Gauche)",
            pin: 'MaqueenPlus',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /maqueenplusv2\.sensor_on_line\(2\)/gi,
            id: "mb-maqueenplus-finderMiddle",
            title: "cap. Ligne noire (Milieu)",
            pin: 'MaqueenPlus',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /maqueenplusv1\.sensor_on_line\("L3"\)/gi,
            id: "mb-maqueenplus-finderMiddleLeft",
            title: "cap. Ligne noire (Milieu Gauche)",
            pin: 'MaqueenPlus',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /maqueenplusv1\.sensor_on_line\("R3"\)/gi,
            id: "mb-maqueenplus-finderMiddleRight",
            title: "cap. Ligne noire (Milieu Droit)",
            pin: 'MaqueenPlus',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /maqueenplusv(1|2)\.sensor_on_line\(("R2"|3)\)/gi,
            id: "mb-maqueenplus-finderRight",
            title: "cap. Ligne noire (Droit)",
            pin: 'MaqueenPlus',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /maqueenplusv(1|2)\.sensor_on_line\(("R1"|4)\)/gi,
            id: "mb-maqueenplus-finderRightRear",
            title: "cap. Ligne noire (Arrière droit)",
            pin: 'MaqueenPlus',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /maqueenplusv1\.set_servo_angle\(maqueenplusv1\.S1/gi,
            id: "mb-maqueenplus-v1-servo1",
            title: "Servo 1",
            pin: 'MaqueenPlus V1 (0x14)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /maqueenplusv1\.set_servo_angle\(maqueenplusv1\.S2/gi,
            id: "mb-maqueenplus-v1-servo2",
            title: "Servo 2",
            pin: 'MaqueenPlus V1 (0x15)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /maqueenplusv1\.set_servo_angle\(maqueenplusv1\.S3/gi,
            id: "mb-maqueenplus-v1-servo3",
            title: "Servo 3",
            pin: 'MaqueenPlus V1 (0x16)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /maqueenplusv2\.set_servo_angle\(pin0/gi,
            id: "mb-maqueenplus-v2-servo-p0",
            title: "Servo 1",
            pin: 'MaqueenPlus V2 (P0)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /maqueenplusv2\.set_servo_angle\(pin1/gi,
            id: "mb-maqueenplus-v2-servo-p1",
            title: "Servo 2",
            pin: 'MaqueenPlus V2 (P1)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /maqueenplusv2\.set_servo_angle\(pin2/gi,
            id: "mb-maqueenplus-v2-servo-p2",
            title: "Servo 3",
            pin: 'MaqueenPlus V2 (P2)',
            type: 'output',
            class: 'servo',
            value: null,
            picture: "Servo.png",
            pictureAnimation: "Servo-animation.png",
            animate: function (Animator) {
                $(Animator.valueId).html(Math.round(Animator.value) + " °");
                $(Animator.animId).css("transform", "rotate(" + Animator.value + "deg)");
            }
        },
        {
            regex: /maqueenplusv(1|2)\.headlights\((1|-1)/gi,
            id: "mb-maqueenplus-rightLed",
            title: "LED Rouge (droite)",
            pin: 'MaqueenPlus',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            regex: /maqueenplusv(1|2)\.headlights\((0|-1)/gi,
            id: "mb-maqueenplus-leftLed",
            title: "LED Rouge (gauche)",
            pin: 'MaqueenPlus',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            codeFlag: "MaqueenPlus Buzzer",
            id: "mb-maqueenplus-buzzer",
            title: "Buzzer",
            pin: 'MaqueenPlus',
            type: 'output',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        // Robots - Kitrobot
        {
            regex: /kitrobot\.setServoSpeed\(pin0/gi,
            id: "mb-kitrobot-motorLeft",
            title: "Moteur Gauche",
            pin: 'Kitrobot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /kitrobot\.setServoSpeed\(pin1/gi,
            id: "mb-kitrobot-motorRight",
            title: "Moteur Droit",
            pin: 'Kitrobot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /kitrobot\.readLine\(pin2\)/gi,
            id: "mb-kitrobot-finderLeft",
            title: "cap. Ligne noire (Gauche)",
            pin: 'Kitrobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /kitrobot\.readLine\(pin15\)/gi,
            id: "mb-kitrobot-finderRight",
            title: "cap. Ligne noire (Droit)",
            pin: 'Kitrobot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        // Robots - Codo
        {
            regex: /codo.controlLeftMotor\(/gi,
            id: "mb-codo-motorLeft",
            title: "Moteur Gauche",
            pin: 'Codo',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /codo.controlRightMotor\(/gi,
            id: "mb-codo-motorRight",
            title: "Moteur Droit",
            pin: 'Codo',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        // Robots - Oobybot
        {
            regex: /oobybot.controlMotors\(pin2/gi,
            id: "mb-oobybot-motorLeft",
            title: "Moteur Gauche",
            pin: 'Oobybot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /oobybot.controlMotors\(pin1/gi,
            id: "mb-oobybot-motorRight",
            title: "Moteur Droit",
            pin: 'Oobybot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        // Robots - Buggy
        {
            regex: /buggy.setLeftMotorSpeed\(/gi,
            id: "mb-buggy-motorLeft",
            title: "Moteur Gauche",
            pin: 'Buggy',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /buggy.setRightMotorSpeed\(/gi,
            id: "mb-buggy-motorRight",
            title: "Moteur Droit",
            pin: 'Buggy',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        // Robots - Bitbot
        {
            regex: /bitbot.setMotorLeft/gi,
            id: "mb-bitbot-motorLeft",
            title: "Moteur Gauche",
            pin: 'bit:bot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /bitbot.setMotorRight/gi,
            id: "mb-bitbot-motorRight",
            title: "Moteur Droit",
            pin: 'bit:bot',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        // Robots - BitCar
        {
            regex: /bitcar\.setBitCarServoSpeed\(pin13, pin14/gi,
            id: "mb-bitcar-motorLeft",
            title: "Moteur Gauche",
            pin: 'BitCar',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /bitcar\.setBitCarServoSpeed\(pin15, pin16/gi,
            id: "mb-bitcar-motorRight",
            title: "Moteur Droit",
            pin: 'BitCar',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /bitcar\.readLine\(pin1\)/gi,
            id: "mb-bitcar-finderLeft",
            title: "cap. Ligne noire (Gauche)",
            pin: 'BitCar',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /bitcar\.readLine\(pin2\)/gi,
            id: "mb-bitcar-finderRight",
            title: "cap. Ligne noire (Droit)",
            pin: 'BitCar',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        // BitCar
        {
            regex: /bitplayer_in\.getButton_A/gi,
            id: "mb-bitplayer-a",
            title: "Touche A",
            pin: 'BitPlayer (P5)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Blue.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /bitplayer_in\.getButton_B/gi,
            id: "mb-bitplayer-b",
            title: "Touche B",
            pin: 'BitPlayer (P11)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Blue.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /bitplayer_in\.getButton_C/gi,
            id: "mb-bitplayer-c",
            title: "Touche C",
            pin: 'BitPlayer (P13)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Blue.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /bitplayer_in\.getButton_C/gi,
            id: "mb-bitplayer-c",
            title: "Touche C",
            pin: 'BitPlayer (P13)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Blue.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /bitplayer_in\.getButton_D/gi,
            id: "mb-bitplayer-d",
            title: "Touche D",
            pin: 'BitPlayer (P14)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Blue.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /bitplayer_in\.getButton_L/gi,
            id: "mb-bitplayer-l",
            title: "Touche L",
            pin: 'BitPlayer (P15)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /bitplayer_in\.getButton_R/gi,
            id: "mb-bitplayer-r",
            title: "Touche R",
            pin: 'BitPlayer (P16)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        // Gamepad v4
        {
            regex: /gamepad_v4_in\.getButton_C/gi,
            id: "mb-gamepad-v4-c",
            title: "Touche C",
            pin: 'Gamepad v4 (P13)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Green.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_v4_in\.getButton_D/gi,
            id: "mb-gamepad-v4-d",
            title: "Touche D",
            pin: 'Gamepad v4 (P14)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Yellow.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_v4_in\.getButton_E/gi,
            id: "mb-gamepad-v4-e",
            title: "Touche E",
            pin: 'Gamepad v4 (P15)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_v4_in\.getButton_F/gi,
            id: "mb-gamepad-v4-f",
            title: "Touche F",
            pin: 'Gamepad v4 (P16)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Blue.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_v4_in\.getButton_Z/gi,
            id: "mb-gamepad-v4-f",
            title: "Touche Z",
            pin: 'Gamepad v4 (P16)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_v4_out\.setLEDandVibration/gi,
            id: "mb-gamepad-v4-led",
            title: "LED",
            pin: 'Gamepad (P12)',
            type: 'output',
            value: "OFF",
            picture: "LED.png",
            pictureAnimation: "LED-animation.png"
        },
        {
            regex: /gamepad_v4_out\.setLEDandVibration/gi,
            id: "mb-gamepad-v4-vibration",
            title: "Vibrations",
            pin: 'Gamepad (P12)',
            type: 'output',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
        },
        // Gamepad
        {
            regex: /gamepad_in.getButton_X/gi,
            id: "mb-gamepad-X",
            title: "Touche X",
            pin: 'Gamepad (P1)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#f2d200",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Yellow.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_Y/,
            id: "mb-gamepad-Y",
            title: "Touche Y",
            pin: 'Gamepad (P2)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#2d80e1",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Blue.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_UP/,
            id: "mb-gamepad-up",
            title: "Touche Haut",
            pin: 'Gamepad (P8)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#fd3813",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_DOWN/,
            id: "mb-gamepad-down",
            title: "Touche Bas",
            pin: 'Gamepad (P3)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#fd3813",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_LEFT/,
            id: "mb-gamepad-left",
            title: "Touche Gauche",
            pin: 'Gamepad (P14)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#fd3813",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_in.getButton_RIGHT/,
            id: "mb-gamepad-right",
            title: "Touche Droite",
            pin: 'Gamepad (P15)',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#fd3813",
                title: "",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation-Red.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /gamepad_out.setLED/gi,
            id: "mb-gamepad-led",
            title: "LED",
            pin: 'Gamepad (P16)',
            type: 'output',
            value: "OFF",
            picture: "LED.png",
            pictureAnimation: "LED-animation.png"
        },
        {
            regex: /gamepad_out.setVibration/gi,
            id: "mb-gamepad-vibration",
            title: "Vibrations",
            pin: 'Gamepad (P12)',
            type: 'output',
            value: "OFF",
            picture: "LED.png",
            pictureAnimation: "LED-animation.png"
        },

        /* Tello */
        {
            regex: /(tello)/gi,
            id: "tello-altitude",
            title: "Altitude",
            pin: "Tello",
            type: 'input',
            listeners: [{
                default: 0,
                unit: 'cm',
                color: "#f9d142 ",
                suffix: "_d",
                title: "Altitude"
            }],
            picture: "Tello_altitude.png",
            pictureAnimation: "Tello_altitude_line.png"
        },

        /* Enviro:bit modules */
        {
            regex: /tcs3472\.set/g,
            id: "tcs3472-led",
            title: "LED",
            pin: 'enviro:bit',
            type: 'output',
            value: "OFF",
            picture: "LED.png",
            pictureAnimation: "LED-animation.png"
        },
        {
            regex: /tcs3472\.brightness\(\)/g,
            id: "tcs3472-light",
            title: "Capteur de luminosité",
            pin: 'enviro:bit',
            type: 'input',
            listeners: [{
                default: 55,
                unit: '',
                color: "#f9d142 ",
                suffix: ""
            }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 255);
            }
        },
        {
            regex: /tcs3472\.rgb\(\)/,
            id: "tcs3472-rgb",
            title: "Niveau de : ",
            pin: 'enviro:bit',
            type: 'input',
            color: "#22b573",
            listeners: [{
                suffix: "_r",
                default: 0,
                unit: '',
                color: "#ff4d6a",
                title: "rouge"
            }, {
                suffix: "_g",
                default: 0,
                unit: '',
                color: "#22b573",
                title: "vert"
            }, {
                suffix: "_b",
                default: 0,
                unit: '',
                color: "#1a6da8",
                title: "bleu"
            }],
            picture: "TCS3472-LED.svg",
            animate: function (Animator) {
                const values = {
                    "r": parseInt($("#tcs3472-rgb_slider_r").slider('option', 'value')),
                    "g": parseInt($("#tcs3472-rgb_slider_g").slider('option', 'value')),
                    "b": parseInt($("#tcs3472-rgb_slider_b").slider('option', 'value'))
                };
                $("#tcs3472-rgb_value_r").html(values['r']);
                $("#tcs3472-rgb_value_g").html(values['g']);
                $("#tcs3472-rgb_value_b").html(values['b']);
                $("#tcs3472-rgb .tcs3472-circle-in").attr("fill", "rgb(" + values['r'] + "," + values['g'] + "," + values['b'] + ")");
            }
        },

        {
            regex: /HuskyLensLibrary/g,
            id: "huskylens",
            title: "HuskyLens",
            pin: 'I2C',
            type: 'output',
            value: 'ON',
            picture: "husky.png",
        }

    ]
};