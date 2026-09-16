// Raspberry Pi - RPi.GPIO module

var $builtinmodule = function (name) {

    var GPIO = {};

    GPIO.__name__ = new Sk.builtin.str("RPi.GPIO");

    GPIO.__data = {
        mode: null,
        warnings: true,
        pins: {},
        pwms: {}
    };

    // Numbering modes - same values as RPi.GPIO
    GPIO.BOARD = new Sk.builtin.int_(10);
    GPIO.BCM = new Sk.builtin.int_(11);

    // Pin directions
    GPIO.OUT = new Sk.builtin.int_(0);
    GPIO.IN = new Sk.builtin.int_(1);

    // Pin values
    GPIO.LOW = new Sk.builtin.int_(0);
    GPIO.HIGH = new Sk.builtin.int_(1);

    // Pull up/down
    GPIO.PUD_OFF = new Sk.builtin.int_(20);
    GPIO.PUD_DOWN = new Sk.builtin.int_(21);
    GPIO.PUD_UP = new Sk.builtin.int_(22);

    // Edge detection
    GPIO.RISING = new Sk.builtin.int_(31);
    GPIO.FALLING = new Sk.builtin.int_(32);
    GPIO.BOTH = new Sk.builtin.int_(33);

    // RPi.GPIO version placeholder
    GPIO.VERSION = new Sk.builtin.str("0.7.1");
    GPIO.RPI_INFO = new Sk.builtin.dict([
        'P1_REVISION', 3,
        'REVISION', 'b03114',
        'TYPE', 'Pi 4 Model B',
        'MANUFACTURER', 'Sony UK',
        'PROCESSOR', 'BCM2711',
        'RAM', '4G'
    ].map(value => Sk.ffi.remapToPy(value)));
    GPIO.RPI_REVISION = new Sk.builtin.int_(3);

    const isNone = function (value) {
        return value === undefined || Sk.builtin.checkNone(value);
    };

    const toInt = function (value, name) {
        Sk.builtin.pyCheckType(name, "integer", Sk.builtin.checkInt(value));
        return Sk.ffi.remapToJs(value);
    };

    const toNumber = function (value, name) {
        const isNumber = Sk.builtin.checkInt(value) || Sk.builtin.checkFloat(value);
        Sk.builtin.pyCheckType(name, "integer or float", isNumber);
        return Sk.ffi.remapToJs(value);
    };

    const normalizeValue = function (value) {
        if (Sk.builtin.checkBool(value)) {
            return value.v ? 1 : 0;
        }
        if (Sk.builtin.checkInt(value)) {
            return value.v ? 1 : 0;
        }
        return value ? 1 : 0;
    };

    const isListOrTuple = function (value) {
        return value instanceof Sk.builtin.list || value instanceof Sk.builtin.tuple;
    };

    const pySeqToJsArray = function (value) {
        if (!isListOrTuple(value)) return null;
        return value.v.map(function (item) {
            if (Sk.builtin.checkInt(item)) return item.v;
            return Sk.ffi.remapToJs(item);
        });
    };

    const findComponentByPin = function (pin) {
        if (typeof Simulator !== "undefined" && Simulator.pinList) {
            return Simulator.pinList.find(function (component) {
                return component.pin == pin;
            });
        }
        return undefined;
    };

    const getPinId = function (pin) {
        const component = findComponentByPin(pin);
        if (component !== undefined) return component.id;
        return undefined;
    };

    const getModuleFromId = function (id) {
        if (!id) return;
        if (!Simulator.getModuleByKey) return undefined;
        return Simulator.getModuleByKey(id.split("_")[0]);
    };

    const setPull = function (pinState) {
        if (!Simulator.Components || !Simulator.Components.Button) return;
        if (!Simulator.Components.Button.setPull) return;
        if (pinState.id === undefined) return;
        switch (pinState.pull) {
            case GPIO.PUD_UP.v:
                Simulator.Components.Button.setPull(pinState.id, "up");
                break;
            case GPIO.PUD_DOWN.v:
                Simulator.Components.Button.setPull(pinState.id, "down");
                break;
            default:
                break;
        }
    };

    const writePinToSimulator = function (pinState, value) {
        const module = getModuleFromId(pinState.id);
        if (Robots['g1tank'].CODE_REGEXP == RobotSimulator.robot.CODE_REGEXP) {
            if (pinState.pin == 20) {
                Simulator.Mosaic.specific.g1tank.in1 = value;
            }
            if (pinState.pin == 21) {
                Simulator.Mosaic.specific.g1tank.in2 = value;
            }
            if (pinState.pin == 19) {
                Simulator.Mosaic.specific.g1tank.in3 = value;
            }
            if (pinState.pin == 26) {
                Simulator.Mosaic.specific.g1tank.in4 = value;
            }
        }
        if (pinState.id === undefined) return;
        if (module && module.type !== "input") {
            Simulator.setAnimator(module, pinState.id, value);
        }
    };

    const readPinFromSimulator = function (pinState) {
        if (typeof Simulator !== "undefined" && pinState.id !== undefined) {
            const slider = $("#" + pinState.id + "_slider");
            if (slider.length && slider.slider) {
                return parseInt(slider.slider("option", "value")) ? 1 : 0;
            }
        }
        return pinState.value || 0;
    };

    const ensureMode = function () {
        if (GPIO.__data.mode === null) {
            throw new Sk.builtin.RuntimeError("Please set pin numbering mode using GPIO.setmode(GPIO.BOARD) or GPIO.setmode(GPIO.BCM)");
        }
    };

    const ensurePinSetup = function (pin) {
        if (!GPIO.__data.pins[pin]) {
            throw new Sk.builtin.RuntimeError("You must setup() the GPIO channel first");
        }
    };

    const setupOnePin = function (pin, direction, pull, initial) {
        ensureMode();

        const id = getPinId(pin);
        GPIO.__data.pins[pin] = {
            pin: pin,
            id: id,
            direction: direction,
            pull: pull,
            value: isNone(initial) ? 0 : normalizeValue(initial),
            edge: null,
            callback: null,
            bouncetime: null,
            lastEvent: 0,
            eventDetected: false
        };

        setPull(GPIO.__data.pins[pin]);

        if (direction === GPIO.OUT.v && !isNone(initial)) {
            writePinToSimulator(GPIO.__data.pins[pin], GPIO.__data.pins[pin].value);
        }
    };

    const outputOnePin = function (pin, value) {
        ensureMode();
        ensurePinSetup(pin);

        const pinState = GPIO.__data.pins[pin];
        if (pinState.direction !== GPIO.OUT.v) {
            throw new Sk.builtin.RuntimeError("The GPIO channel has not been set up as an OUTPUT");
        }

        pinState.value = normalizeValue(value);
        writePinToSimulator(pinState, pinState.value);
    };

    const inputOnePin = function (pin) {
        ensureMode();
        ensurePinSetup(pin);

        const pinState = GPIO.__data.pins[pin];
        if (pinState.direction === GPIO.IN.v) {
            pinState.value = readPinFromSimulator(pinState);
        }
        return pinState.value || 0;
    };

    GPIO.setwarnings = new Sk.builtin.func(function (flag) {
        GPIO.__data.warnings = !!Sk.ffi.remapToJs(flag);
        return Sk.builtin.none();
    });

    GPIO.setmode = new Sk.builtin.func(function (mode) {
        Sk.builtin.pyCheckArgsLen("setmode", arguments.length, 1, 1);
        const m = toInt(mode, "mode");

        if (![GPIO.BOARD.v, GPIO.BCM.v].includes(m)) {
            throw new Sk.builtin.ValueError("An invalid mode was passed to setmode()");
        }

        if (GPIO.__data.mode !== null && GPIO.__data.mode !== m) {
            throw new Sk.builtin.ValueError("A different mode has already been set");
        }

        GPIO.__data.mode = m;
        return Sk.builtin.none();
    });

    GPIO.getmode = new Sk.builtin.func(function () {
        if (GPIO.__data.mode === null) return Sk.builtin.none();
        return new Sk.builtin.int_(GPIO.__data.mode);
    });

    const setup = function (channel, direction, pull_up_down = GPIO.PUD_OFF, initial = Sk.builtin.none()) {
        Sk.builtin.pyCheckArgsLen("setup", arguments.length, 2, 4);
        const directionValue = toInt(direction, "direction");
        const pullValue = isNone(pull_up_down) ? GPIO.PUD_OFF.v : toInt(pull_up_down, "pull_up_down");
        const pins = pySeqToJsArray(channel);

        if (pins !== null) {
            pins.forEach(pin => setupOnePin(pin, directionValue, pullValue, initial));
        } else {
            setupOnePin(toInt(channel, "channel"), directionValue, pullValue, initial);
        }

        return Sk.builtin.none();
    };

    setup.co_varnames = ["channel", "direction", "pull_up_down", "initial"];
    setup.$defaults = [GPIO.PUD_OFF, Sk.builtin.none()];

    GPIO.setup = new Sk.builtin.func(setup);

    GPIO.output = new Sk.builtin.func(function (channel, value) {
        Sk.builtin.pyCheckArgsLen("output", arguments.length, 2, 2);

        const pins = pySeqToJsArray(channel);
        const values = pySeqToJsArray(value);

        if (pins !== null) {
            pins.forEach(function (pin, index) {
                const v = values !== null ? values[index] : value;
                outputOnePin(pin, v);
            });
        } else {
            outputOnePin(toInt(channel, "channel"), value);
        }

        return Sk.builtin.none();
    });

    GPIO.input = new Sk.builtin.func(function (channel) {
        Sk.builtin.pyCheckArgsLen("input", arguments.length, 1, 1);
        return new Sk.builtin.int_(inputOnePin(toInt(channel, "channel")));
    });

    GPIO.cleanup = new Sk.builtin.func(function (channel) {
        if (channel === undefined || Sk.builtin.checkNone(channel)) {
            Object.keys(GPIO.__data.pins).forEach(function (pin) {
                const pinState = GPIO.__data.pins[pin];
                if (pinState.direction === GPIO.OUT.v) {
                    writePinToSimulator(pinState, 0);
                }
            });
            GPIO.__data.pins = {};
            GPIO.__data.pwms = {};
            GPIO.__data.mode = null;
            return Sk.builtin.none();
        }

        const pins = pySeqToJsArray(channel);
        if (pins !== null) {
            pins.forEach(function (pin) {
                if (GPIO.__data.pins[pin]) {
                    writePinToSimulator(GPIO.__data.pins[pin], 0);
                    delete GPIO.__data.pins[pin];
                }
            });
        } else {
            const pin = toInt(channel, "channel");
            if (GPIO.__data.pins[pin]) {
                writePinToSimulator(GPIO.__data.pins[pin], 0);
                delete GPIO.__data.pins[pin];
            }
        }

        return Sk.builtin.none();
    });

    GPIO.gpio_function = new Sk.builtin.func(function (channel) {
        Sk.builtin.pyCheckArgsLen("gpio_function", arguments.length, 1, 1);
        const pin = toInt(channel, "channel");
        if (!GPIO.__data.pins[pin]) return new Sk.builtin.int_(-1);
        return new Sk.builtin.int_(GPIO.__data.pins[pin].direction);
    });

    GPIO.add_event_detect = new Sk.builtin.func(function (channel, edge, callback, bouncetime) {
        Sk.builtin.pyCheckArgsLen("add_event_detect", arguments.length, 2, 4);
        const pin = toInt(channel, "channel");
        const edgeValue = toInt(edge, "edge");
        ensurePinSetup(pin);

        if (![GPIO.RISING.v, GPIO.FALLING.v, GPIO.BOTH.v].includes(edgeValue)) {
            throw new Sk.builtin.ValueError("The edge must be set to RISING, FALLING or BOTH");
        }

        GPIO.__data.pins[pin].edge = edgeValue;
        GPIO.__data.pins[pin].callback = isNone(callback) ? null : callback;
        GPIO.__data.pins[pin].bouncetime = isNone(bouncetime) ? null : bouncetime.v;
        GPIO.__data.pins[pin].eventDetected = false;

        return Sk.builtin.none();
    });

    GPIO.add_event_detect.co_varnames = ["channel", "edge", "callback", "bouncetime"];
    GPIO.add_event_detect.$defaults = [Sk.builtin.none(), Sk.builtin.none()];

    GPIO.remove_event_detect = new Sk.builtin.func(function (channel) {
        Sk.builtin.pyCheckArgsLen("remove_event_detect", arguments.length, 1, 1);
        const pin = toInt(channel, "channel");
        ensurePinSetup(pin);
        GPIO.__data.pins[pin].edge = null;
        GPIO.__data.pins[pin].callback = null;
        GPIO.__data.pins[pin].eventDetected = false;
        return Sk.builtin.none();
    });

    GPIO.event_detected = new Sk.builtin.func(function (channel) {
        Sk.builtin.pyCheckArgsLen("event_detected", arguments.length, 1, 1);
        const pin = toInt(channel, "channel");
        ensurePinSetup(pin);
        const detected = !!GPIO.__data.pins[pin].eventDetected;
        GPIO.__data.pins[pin].eventDetected = false;
        return new Sk.builtin.bool(detected);
    });

    GPIO.wait_for_edge = new Sk.builtin.func(function (channel, edge, bouncetime, timeout) {
        Sk.builtin.pyCheckArgsLen("wait_for_edge", arguments.length, 2, 4);
        const pin = toInt(channel, "channel");
        toInt(edge, "edge");
        ensurePinSetup(pin);

        // In Skulpt simulator, we cannot block waiting for a real hardware edge.
        // We return the channel immediately if the current input is HIGH, otherwise None.
        const value = inputOnePin(pin);
        if (value) return new Sk.builtin.int_(pin);
        return Sk.builtin.none();
    });

    GPIO.wait_for_edge.co_varnames = ["channel", "edge", "bouncetime", "timeout"];
    GPIO.wait_for_edge.$defaults = [Sk.builtin.none(), Sk.builtin.none()];

    GPIO.PWM = new Sk.misceval.buildClass(GPIO, function ($gbl, $loc) {

        const startPWM = function (self) {
            const pinState = GPIO.__data.pins[self.channel];
            if (!pinState || pinState.id === undefined) return;

            const module = getModuleFromId(pinState.id);
            if (typeof Simulator === "undefined" || module === undefined) return;

            if (Simulator.intervals && Simulator.intervals[pinState.id]) {
                clearInterval(Simulator.intervals[pinState.id]);
            }

            if (module.animate !== undefined) {
                if (self.channel == 16 || self.channel == 13) {
                    if (Robots['g1tank'].CODE_REGEXP == RobotSimulator.robot.CODE_REGEXP) {
                        Simulator.pinList.filter(item => item.pin == self.channel);
                        Simulator.update_pinList();
                        return Simulator.Mosaic.specific.g1tank.setMotorSpeedPercent(self.channel, self.dutyCycle);
                    }
                }
                Simulator.setAnimator(module, pinState.id, self.dutyCycle);
            } else {
                const valueNode = $("#" + pinState.id + "_value");
                const animNode = $("#" + pinState.id + "_anim");
                if (valueNode.length) valueNode.html(self.dutyCycle === 0 ? "OFF" : self.dutyCycle + "%");
                if (animNode.length) animNode.css("opacity", self.dutyCycle / 100);
            }
        };

        const PWM__init__ = function (self, channel, frequency) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 3);
            self.channel = toInt(channel, "channel");
            self.frequency = toInt(frequency, "frequency");
            self.dutyCycle = 0;
            self.started = false;

            ensurePinSetup(self.channel);
            if (GPIO.__data.pins[self.channel].direction !== GPIO.OUT.v) {
                throw new Sk.builtin.RuntimeError("You must setup() the GPIO channel as an output first");
            }
        };

        PWM__init__.co_varnames = ["self", "channel", "frequency"];
        $loc.__init__ = new Sk.builtin.func(PWM__init__);

        $loc.start = new Sk.builtin.func(function (self, dutyCycle) {
            Sk.builtin.pyCheckArgsLen("start", arguments.length, 2, 2);
            self.dutyCycle = toNumber(dutyCycle, "dutyCycle");
            self.started = true;
            startPWM(self);
            return Sk.builtin.none();
        });

        $loc.ChangeDutyCycle = new Sk.builtin.func(function (self, dutyCycle) {
            Sk.builtin.pyCheckArgsLen("ChangeDutyCycle", arguments.length, 2, 2);
            self.dutyCycle = toNumber(dutyCycle, "dutyCycle");
            if (self.started) startPWM(self);
            return Sk.builtin.none();
        });

        $loc.ChangeFrequency = new Sk.builtin.func(function (self, frequency) {
            Sk.builtin.pyCheckArgsLen("ChangeFrequency", arguments.length, 2, 2);
            self.frequency = toInt(frequency, "frequency");
            if (self.started) startPWM(self);
            return Sk.builtin.none();
        });

        $loc.stop = new Sk.builtin.func(function (self) {
            self.started = false;
            self.dutyCycle = 0;
            const pinState = GPIO.__data.pins[self.channel];
            if (pinState) writePinToSimulator(pinState, 0);
            return Sk.builtin.none();
        });

    });

    return GPIO;
};