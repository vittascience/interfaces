Simulator.Mosaic.BOARD_HEADER = `
<object id="board-viewer" class="mt-3"></object>
<canvas class="canvas-m5ui-screen"></canvas>`;

Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    const pins = Blockly.Constants.Pins[mod.pins][Blockly.Constants.getSelectedBoard()];
    const pinName = pins.find(p => p[1] == 'p' + pin);
    return {
        name: pinName ? pinName[0] : null,
        id: pin
    };
};

Simulator.Mosaic.externalLibraries = {
    // python libraries
    'src/lib/vitta_server.py': '/openInterface/interfaces/assets/lib/esp32-mpy/wifi/vitta_server.py',
    'src/lib/vitta_client.py': '/openInterface/interfaces/assets/lib/esp32-mpy/wifi/vitta_client.py',
    // js board specific libraries
    'src/lib/m5stack.js': Simulator.PATH_LIB + 'm5stack/m5stack.js',
    'src/lib/m5ui.js': Simulator.PATH_LIB + 'm5stack/m5ui.js',
    'src/lib/uiflow.js': Simulator.PATH_LIB + 'm5stack/uiflow.js',
    'src/lib/machine.js': Simulator.PATH_LIB + 'micropython/machine.js',
    // js common mpy libraries
    'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/ujson.js': Simulator.PATH_LIB_COMMON + 'micropython/json.js',
    'src/lib/json.js': Simulator.PATH_LIB_COMMON + 'micropython/json.js',
    'src/lib/gc.js': Simulator.PATH_LIB_COMMON + 'micropython/gc.js',
    'src/lib/neopixel.js': Simulator.PATH_LIB_COMMON + 'micropython/neopixel.js',
    'src/lib/dht.js': Simulator.PATH_LIB_COMMON + 'micropython/dht.js',
    'src/lib/onewire.js': Simulator.PATH_LIB_COMMON + 'micropython/onewire.js',
    // js common esp32 libraries
    'src/lib/esp32.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/esp32.js',
    'src/lib/esp.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/esp.js',
    'src/lib/urequests.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/requests.js',
    'src/lib/requests.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/requests.js',
    'src/lib/socket.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/socket.js',
    'src/lib/usocket.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/socket.js',
    'src/lib/network.js': Simulator.PATH_LIB_COMMON + 'esp32/micropython/network.js',
    // js common grove libraries
    'src/lib/esp32_sht31.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_sht31.js',
    'src/lib/esp32_si1145.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_si1145.js',
    'src/lib/esp32_tm1637.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_tm1637.js',
    'src/lib/esp32_th02.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_th02.js',
    'src/lib/esp32_scd30.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_scd30.js',
    'src/lib/esp32_hm330x.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_hm330x.js',
    'src/lib/esp32_ssd1306.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_ssd1306.js',
    'src/lib/esp32_sgp30.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_sgp30.js',
    'src/lib/esp32_bmp280.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_bmp280.js',
    'src/lib/esp32_gas.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_gas.js',
    'src/lib/esp32_gas_gmxxx.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_gas_gmxxx.js',
    'src/lib/esp32_lcd_i2c.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_lcd_i2c.js',
    'src/lib/esp32_chainableLED.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_chainableLED.js',
    'src/lib/esp32_my9221.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_my9221.js',
    'src/lib/esp32_ds18b20.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_ds18b20.js',
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    if (board !== null) {
        const up = 'translate(0px, 0px)',
            down = 'translate(0px, 9px)';

        const playButtonAnimation = function (id, animation) {
            const button = board.querySelector("#" + id.replace('_BTN', ''));
            if (button !== null) {
                button.style.transform = animation;
            }
        };

        // M5Stack switches A,B,C
        const buttons = ['A', 'B', 'C']
        for (let i = 0; i < buttons.length; i++) {
            const button = board.querySelector("#" + buttons[i] + "_BTN");
            if (button !== null) {
                button.addEventListener("mousedown", function () {
                    playButtonAnimation(this.id, down);
                });
                button.addEventListener("mouseup", function () {
                    playButtonAnimation(this.id, up);
                    if (this.id === 'SW4_BTN') {
                        Simulator.replay();
                    }
                });
                button.addEventListener("touchstart", function () {
                    playButtonAnimation(this.id, down);
                });
                button.addEventListener("touchend", function () {
                    playButtonAnimation(this.id, up);
                    if (this.id === 'SW4_BTN') {
                        Simulator.replay();
                    }
                });
            }
        }
    }
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () {

    // ultrasonic

    Sk.builtins.grove_getUltrasonicData = function (pinNumber, data, timeout_us) {
        Sk.builtin.pyCheckArgsLen("grove_getUltrasonicData", arguments.length, 1, 3);
        Sk.builtin.pyCheckType("data", "string", Sk.builtin.checkString(data));
        Sk.builtin.pyCheckType("timeout_us", "integer", Sk.builtin.checkInt(timeout_us));
        const duration = $('#ultrasonic_' + pinNumber.v + '_slider_d').slider('option', 'value');
        if (data.v == 'distance') {
            return new Sk.builtin.float_(roundFloat(Simulator.Mosaic.grove.calculs.getDistance(duration), 2));
        } else if (data.v == 'duration') {
            return new Sk.builtin.float_(duration);
        } else {
            throw new Sk.builtin.ValueError("Data option '" + data.v + "' is not valid");
        }
    };
    Sk.builtins.grove_getUltrasonicData.co_varnames = ['pinNumber', 'data', 'timeout_us'];
    Sk.builtins.grove_getUltrasonicData.$defaults = [new Sk.builtin.str('distance'), new Sk.builtin.int_(30000)];

    Sk.builtins.hcsr04_getUltrasonicData = function (trig, echo, data, timeout_us) {
        if (trig !== undefined && echo !== undefined) {
            $("#read-digital_" + echo.pin).hide();
            Sk.builtin.pyCheckArgsLen("hcsr04_getUltrasonicData", arguments.length, 2, 4);
            Sk.builtin.pyCheckType("data", "string", Sk.builtin.checkString(data));
            Sk.builtin.pyCheckType("timeout_us", "integer", Sk.builtin.checkInt(timeout_us));
            const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
            const id = '#hcsr04_' + trig.pin;
            if (trig.pin !== echo.pin) {
                $(id).find(".subtitle-module").html(pins.find(p => p[1] == 'p' + trig.pin)[0] + ' / ' + pins.find(p => p[1] == 'p' + echo.pin)[0]);
            } else {
                throw new Sk.builtin.AttributeError('[HCSR04] trig and echo cannot be on same pin (' + pins.find(p => p[1] == 'p' + trig.pin)[0] + ')');
            }
            const duration = $(id + '_slider_d').slider('option', 'value');
            if (data.v == 'distance') {
                return new Sk.builtin.float_(roundFloat(Simulator.Mosaic.grove.calculs.getDistance(duration), 2));
            } else if (data.v == 'duration') {
                return new Sk.builtin.float_(roundFloat(duration, 1));
            } else {
                throw new Sk.builtin.ValueError("Data option '" + data.v + "' is not valid");
            }
        } else {
            throw new Sk.builtin.ValueError("Pin '" + trig.pin + "' or '" + echo.pin + "' is not valid");
        }
    };
    Sk.builtins.hcsr04_getUltrasonicData.co_varnames = ['trig', 'echo', 'data', 'timeout_us'];
    Sk.builtins.hcsr04_getUltrasonicData.$defaults = [new Sk.builtin.str('distance'), new Sk.builtin.int_(30000)];

    // pitch

    Sk.builtins.pitch = function (Pin, frequency, duration) {
        const module = Simulator.getModuleByKey('buzzer');
        const stopMusic = function (self) {
            if (self._data.osc) {
                self._data.osc.stop();
                delete self._data.osc;
            }
            Simulator.setAnimator(module, module.id + "_" + Pin.pin, 0);
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
        return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve) {
            if (!self._data.audioCtx) {
                self._data.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                Simulator.audioContext = self._data.audioCtx;
            }
            if (self._data.osc) {
                stopMusic(self);
            }
            Simulator.setAnimator(module, module.id + "_" + Pin.pin, frequency.v);

            startOscillator(self, frequency.v);
            if (duration > 0) {
                await sleep_ms(duration + 50);
                stopMusic(self);
                resolve();
            }
            if (Simulator.stop_flag) {
                stopMusic(self);
                resolve();
            }
        }));
    };
};

Simulator.Mosaic.groveRegex = {
    // digital readers
    "read-digital": /(^(?!.*ADC\()| )Pin\(([0-9]{1,2}),( |)(mode=|)Pin.IN(?!, id=.*)(,|\))/gi,
    // analog readers
    "read-analog": /(pinADC\(([0-9]{1,2})|ADC\(Pin\(([0-9]{1,2})\),)\)/g,
    // digital writers
    "write-digital": /(^(?!.*ADC\()| )Pin\(([0-9]{1,2}),( |)(mode=|)Pin.OUT(?!, id=.*)/gi,
    // analog writers
    "write-analog": /DAC\(Pin\(([0-9]{1,2})(?!, bits=.*)\)/gi,
    // pwm
    "pwm": /PWM\(Pin\([0-9]{1,2}/gi,
    // I2C modules
    "lcdGrove": /(.|)LCD1602\(/gi,
    "oled": /SSD1306_I2C\(./gi,
    "sgp30": /(.|)SGP30\(/gi,
    "multichannel": /(.|)GAS\(/gi,
    "multichannelV2": /(.|)GAS_GMXXX\(/gi,
    "scd30-co2": /scd30_read\(0\)/gi,
    "scd30-temp": /scd30_read\(1\)/gi,
    "scd30-hum": /scd30_read\(2\)/gi,
    "hm330x": /(.|)HM330X\(/g,
    "bmp280-temp": /bmp280\.temperature\(\)/gi,
    "bmp280-press": /bmp280\.(pressure|altitude)\(\)/gi,
    "bmp280-alt": /bmp280\.(pressure|altitude)\(\)/gi,
    "si1145": /(.|)SI1145\(/gi,
    "vl53l0x": /(.|)VL53L0X\(/gi,
    "sht31-temp": /(.|)SHT31\(/gi,
    "sht31-hum": /(.|)SHT31\(/gi,
    "th02-temp": /(.|)TH02\(/gi,
    "th02-hum": /(.|)TH02\(/gi,
    // Pins on module - inputs
    "gps": /Pin\(([0-9]{1,2}),( |)(mode=|)Pin.IN, id="gps"/gi,
    // Pins on module - outputs
    "openlog": /Lecteur SD TX on p([0-9]{1,2})/gi,
    "RGBLed": /CHAINABLE_LED_COUNT_((A|D|)[0-9]{1,2})( |)=/gi,
};

Simulator.Mosaic.specific = {

    m5ui: {
        DEFAULT_COLOR: 0x222222,
        ctx: null,
        screenObjects: null,
        backgroundColor: null,
        THICKNESS: 1.5,
        init: function () {
            this.canvas = document.querySelector('.canvas-m5ui-screen');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = 320;
            this.canvas.height = 240;
            this.backgroundColor = this.DEFAULT_COLOR;
            this.clear();
            this.screenObjects = new Array();
        },
        reset: function () {
            this.clear();
            this.screenObjects = new Array();
        },
        update: function () {
            this.ctx.fillStyle = '#' + this.backgroundColor.toString(16);
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < this.screenObjects.length; i++) {
                this.drawer[this.screenObjects[i].type](this, this.screenObjects[i]);
            }
        },
        clear: function () {
            this.ctx.fillStyle = 'black';
            this.ctx.strokeStyle = 'black';
            this.ctx.fillStyle = '#' + this.DEFAULT_COLOR.toString(16);
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        },
        addText: function (text, x, y, letter_spacing = 1, fontsize = 14, font = 'Arial') {
            this.canvas.style.letterSpacing = letter_spacing + 'px';
            this.ctx.font = fontsize + 'px ' + font;
            this.ctx.fillText(text, x, y);
        },
        drawLine: function (from_x, to_x, from_y, to_y) {
            this.ctx.beginPath();
            this.ctx.moveTo(from_x, from_y);
            this.ctx.lineTo(to_x, to_y);
            this.ctx.stroke();
        },
        changeColor: function (color) {
            this.ctx.strokeStyle = '#' + color.toString(16);
            this.ctx.fillStyle = '#' + color.toString(16);
        },
        drawer: {
            "M5Title": function (_this, M5Title) {
                if (M5Title.state) {
                    _this.ctx.fillStyle = _this._getHexColor(M5Title.bgcolor);
                    _this.ctx.fillRect(0, 0, _this.canvas.width, 20);
                    _this.changeColor(M5Title.fgcolor);
                    _this.addText(M5Title.title, M5Title.x, 16, 1.1);
                }
            },
            "M5TextBox": function (_this, M5TextBox) {
                if (M5TextBox.state) {
                    _this.changeColor(M5TextBox.color);
                    _this.addText(M5TextBox.text, M5TextBox.x, M5TextBox.y + 20, 1, 24, 'Comic Sans MS');
                    if (M5TextBox.rotate !== 0) {
                        UIManager.showWarningMessage("warning-message", "Function setRotate() on M5TextBox is not yet implemented in the simulator.");
                    }
                }
            },
            "M5Rect": function (_this, M5Rect) {
                if (M5Rect.state) {
                    _this.ctx.beginPath();
                    _this.ctx.moveTo(M5Rect.x, M5Rect.y);
                    _this.ctx.lineTo(M5Rect.x + M5Rect.width, M5Rect.y);
                    _this.ctx.lineTo(M5Rect.x + M5Rect.width, M5Rect.y + M5Rect.height);
                    _this.ctx.lineTo(M5Rect.x, M5Rect.y + M5Rect.height);
                    _this.ctx.lineTo(M5Rect.x, M5Rect.y);
                    _this.ctx.fillStyle = _this._getHexColor(M5Rect.fillcolor);
                    _this.ctx.fill();
                    _this.ctx.lineWidth = _this.THICKNESS;
                    _this.ctx.strokeStyle = _this._getHexColor(M5Rect.bordercolor);
                    _this.ctx.stroke();
                }
            },
            "M5Circle": function (_this, M5Circle) {
                if (M5Circle.state) {
                    _this.ctx.beginPath();
                    _this.ctx.arc(M5Circle.x, M5Circle.y, M5Circle.radius, 0, 2 * Math.PI, false);
                    _this.ctx.fillStyle = _this._getHexColor(M5Circle.fillcolor);
                    _this.ctx.fill();
                    _this.ctx.lineWidth = _this.THICKNESS;
                    _this.ctx.strokeStyle = _this._getHexColor(M5Circle.bordercolor);
                    _this.ctx.stroke();
                }
            },
            "M5Triangle": function (_this, M5Triangle) {
                if (M5Triangle.state) {
                    _this.ctx.beginPath();
                    _this.ctx.moveTo(M5Triangle.x1, M5Triangle.y1);
                    _this.ctx.lineTo(M5Triangle.x2, M5Triangle.y2);
                    _this.ctx.lineTo(M5Triangle.x3, M5Triangle.y3);
                    _this.ctx.lineTo(M5Triangle.x1, M5Triangle.y1);
                    _this.ctx.fillStyle = _this._getHexColor(M5Triangle.fillcolor);
                    _this.ctx.fill();
                    _this.ctx.lineWidth = _this.THICKNESS;
                    _this.ctx.strokeStyle = _this._getHexColor(M5Triangle.bordercolor);
                    _this.ctx.stroke();
                }
            },
            "M5Line": function (_this, M5Line) {
                if (M5Line.state) {
                    _this.ctx.beginPath();
                    _this.ctx.moveTo(M5Line.x1, M5Line.y1);
                    _this.ctx.lineTo(M5Line.x2, M5Line.y2);
                    _this.ctx.lineWidth = _this.THICKNESS;
                    _this.ctx.strokeStyle = _this._getHexColor(M5Line.fillcolor);
                    _this.ctx.stroke();
                }
            }
        },
        _getHexColor: function (color) {
            return color ? '#' + color.toString(16) : "#000000";
        }
    },

    SERVER_REGEXP: /(import vitta_server|from vitta_server import (\*|SERVER))/,

    extract: (str, func = 'Pin') => str.split(func + '(')[1].split(',')[0].replace(')', ''),
    extractPin: {
        'write-digital': (str) => Simulator.Mosaic.specific.extract(str),
        'read-digital': (str) => Simulator.Mosaic.specific.extract(str),
        'write-analog': (str) => Simulator.Mosaic.specific.extract(str),
        'read-analog': (str) => str.includes('pinADC') ? Simulator.Mosaic.specific.extract(str, 'pinADC') : Simulator.Mosaic.specific.extract(str),
        'pwm': (str) => Simulator.Mosaic.specific.extract(str),
    },

    createSliders: function () {
        // M5Stack sliders
        // !Slider base : Fahreinheit value
        $('#esp32-rawTemp_slider_cel,' +
            '#esp32-rawTemp_slider_fah,' +
            '#esp32-rawTemp_slider_kel').slider({
                min: 0,
                max: 150,
                value: 150 / 2,
                step: 1
            });
        $('#esp32-hallMag_slider').slider({
            min: -READ_ANALOG_MAX_VALUE,
            max: READ_ANALOG_MAX_VALUE,
            value: 0
        });
        $('#m5stack-button-a_slider,' +
            '#m5stack-button-b_slider,' +
            '#m5stack-button-c_slider').slider({
                min: 0,
                max: 1,
                value: 0
            });
        // Grove sliders
        $('#colorSensor_slider_r,' +
            '#colorSensor_slider_g,' +
            '#colorSensor_slider_b').slider({
                min: 0,
                max: 255,
                value: 55
            });
        $('#gps_slider_alt').slider({
            min: 0,
            max: 1000,
            value: 35,
            step: 0.1
        });
        $('#gps_slider_lat').slider({
            min: -90,
            max: 90,
            step: 0.0001,
            value: 48.87
        });
        $('#gps_slider_lon').slider({
            min: -180,
            max: 180,
            step: 0.0001,
            value: 2.29
        });
        $('#m5-gps_slider_lat').slider({
            min: -90,
            max: 90,
            step: 0.0001,
            value: 48.87
        });
        $('#m5-gps_slider_lon').slider({
            min: -180,
            max: 180,
            step: 0.0001,
            value: 2.29
        });
    },

    calculs: {
        getServoAngle(duty) {
            return (duty / PWM_MAX_DUTY * 100 - 2.5) * 180 / (12.5 - 2.5)
        },
        getServoSpeed(duty) {
            const GAP = 14;
            if (duty >= (90 - GAP)) {
                return ((duty + GAP) / 90 - 1) * 100;
            } else if (duty < (90 - GAP)) {
                return - ((duty + GAP) / 90 - 1) * 100;
            }
        }
    },

    definitions: [
        {
            regex: /esp32\.hall_sensor\(\)/,
            id: "esp32-hallMag",
            title: "Capteur à effet Hall ",
            pin: 'M5Stack',
            listeners: [{
                suffix: "",
                unit: 'µT',
                color: "#ff4d6a",
                title: "Champ magnétique"
            }],
            type: 'input',
            picture: "Champ-magnetique.png",
            animate: function (Animator) {
                Animator.rotate(-READ_ANALOG_MAX_VALUE, READ_ANALOG_MAX_VALUE);
            }
        },
        {
            regex: /esp32\.raw_temperature\(\)/,
            id: "esp32-rawTemp",
            title: "Temp. du processeur ",
            pin: 'M5Stack',
            listeners: [{
                suffix: "_cel",
                unit: '°C',
                color: "#f8a10f",
                title: "(°C)"
            }, {
                suffix: "_fah",
                unit: '°F',
                color: "#ff4d6a",
                title: "(°F)"
            }, {
                suffix: "_kel",
                unit: 'K',
                color: "#ff4d6a",
                title: "(K)"
            }],
            type: 'input',
            class: 'gauge',
            picture: "Temperature_pression_altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                const callbackAnim = (value) => Animator.gauge(value);
                const t_fah = Animator.value;
                Animator.updateListeners({
                    "_cel": roundFloat((t_fah - 32) * 5 / 9, 1),
                    "_kel": roundFloat((t_fah - 32) * 5 / 9 + 273.15, 1),
                    "_fah": roundFloat(t_fah, 1)
                }, callbackAnim);
            }
        },
        {
            regex: /btnA./,
            id: "m5stack-button-a",
            title: "Bouton A",
            pin: 'M5Stack',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            events: {
                'pressed': () => {
                    console.log("Nothing press.")
                },
                'released': () => {
                    console.log("Nothing rel.")
                },
            },
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
                if (Animator.value == 1) {
                    Simulator.getModuleByKey('m5stack-button-a').events.pressed();
                } else {
                    Simulator.getModuleByKey('m5stack-button-a').events.released();
                }

            }
        },
        {
            regex: /btnB./,
            id: "m5stack-button-b",
            title: "Bouton B",
            pin: 'M5Stack',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            events: {
                'pressed': () => {
                    console.log("Nothing press.")
                },
                'released': () => {
                    console.log("Nothing rel.")
                },
            },
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /btnC./,
            id: "m5stack-button-c",
            title: "Bouton C",
            pin: 'M5Stack',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "",
                suffix: ""
            }],
            events: {
                'pressed': () => {
                    console.log("Nothing press.")
                },
                'released': () => {
                    console.log("Nothing rel.")
                },
            },
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();
            }
        },
        {
            regex: /Pin\(([0-9]{1,2}),( |)(mode=|)Pin.IN, id="bluetooth"/gi,
            id: "bluetooth",
            title: "Bluetooth",
            pin: 'UART',
            codeFlag: 'Bluetooth',
            type: 'output',
            value: "",
            picture: ""
        },
        {
            regex: /Pin\(([0-9]{1,2}),( |)(mode=|)Pin.OUT, id="buzzer"/gi,
            id: "buzzer",
            title: "Buzzer",
            pin: 'pin n° ',
            pins: 'digital',
            type: 'output',
            codeFlag: 'Buzzer',
            value: 0,
            picture: "Buzzer.png",
            pictureAnimation: "Buzzer-animation.png",
            animate: function (Animator) {
                const value = Animator.value ? Math.round(Animator.value) + " Hz" : "OFF";
                Animator.opacity(0, 1, text = value)
            }
        },
        {
            regex: /get_gps_frame\(\)/gi,
            id: "m5-gps",
            title: "Module GPS : ",
            pin: 'UART',
            type: 'input',
            listeners: [{
                suffix: "_lat",
                default: 48.8738,
                unit: '°',
                color: "#f9d142",
                title: "Latitude"
            }, {
                suffix: "_lon",
                default: 2.3528,
                unit: '°',
                color: "#ff4d6a",
                title: "Longitude"
            }],
            picture: "GPS.png",
            pictureAnimation: "GPS-animation.png",
            modalButton: {
                icon: "fas fa-map",
                click: function () {
                    pseudoModal.openModal('modal-gpsmap');
                    initializeMap();
                }
            },
            animate: function (Animator) {
                $(Animator.valueId).html(Animator.value);
            }
        },
        {
            regex: /gps_readNMEA\((.+)\)/gi,
            id: "gps",
            title: "GPS : ",
            pin: 'UART',
            codeFlag: 'GPS',
            type: 'input',
            listeners: [{
                suffix: "_lat",
                default: 48.8738,
                unit: '°',
                color: "#f9d142",
                title: "Latitude"
            }, {
                suffix: "_lon",
                default: 2.3528,
                unit: '°',
                color: "#ff4d6a",
                title: "Longitude"
            }, {
                suffix: "_alt",
                default: 35,
                unit: 'm',
                color: "#1a6da8",
                title: "Altitude"
            }],
            picture: "GPS.png",
            pictureAnimation: "GPS-animation.png",
            modalButton: {
                icon: "fas fa-map",
                click: function () {
                    pseudoModal.openModal('modal-gpsmap');
                    initializeMap();
                }
            },
            animate: function (Animator) {
                if (Animator.sliderId.indexOf("_alt") > -1) {
                    $(Animator.animId).css('bottom', (Animator.value * 10 / 225 + 19) + 'px');
                }
                $(Animator.valueId).html(Animator.value);
            }
        }
    ]
}