Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    const pins = Blockly.Constants.Pins[mod.pins][Blockly.Constants.getSelectedBoard()];
    const pinName = pins.find(p => p[1] == 'p' + pin);
    return {
        name: pinName ? pinName[0] : null,
        id: pin
    };
};

Simulator.Mosaic.getCurrentRobot3D = function () {
    const ilo_regExp = Robots3D['Ilo'].CODE_REGEXP;
    const current_robot = Simulator.code.match(/""" ([a-zA-Z]+) """/g);
    if (current_robot?.length > 1) {
        return 'error';
    } else if (Simulator.code.match(ilo_regExp)) {
        return 'Ilo';
    } else {
        const boardToggled = document.getElementById('simulator-board-toggler')
        if (boardToggled.classList.contains('closed')){
            Simulator.toggleBoardDisplay();
        } 
        return null;
    }
};

Simulator.Mosaic.externalLibraries = {
    // python libraries
    'src/lib/vitta_server.py': '/openInterface/interfaces/assets/lib/esp32-mpy/wifi/vitta_server.py',
    'src/lib/vitta_client.py': '/openInterface/interfaces/assets/lib/esp32-mpy/wifi/vitta_client.py',
    // js board specific libraries
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
    // js robots libraries
    'src/lib/V011.js': Simulator.PATH_LIB + 'ilo/V011.js',
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
        // ESP32 Reset button
        const resetBtn = board.querySelector("#reset_button"),
            up = 'translate(0px, 0px)',
            down = 'translate(0px, 5px)';
        if (resetBtn !== null) {
            const playAnimation = function (animation) {
                const button = board.querySelector("#button_off");
                if (button !== null) {
                    button.style.transform = animation;
                }
            };
            resetBtn.addEventListener("mousedown", function () {
                playAnimation(down);
            });
            resetBtn.addEventListener("mouseup", function () {
                playAnimation(up);
                Simulator.replay();
            });
            resetBtn.addEventListener("touchstart", function () {
                playAnimation(down);
            });
            resetBtn.addEventListener("touchend", function () {
                playAnimation(up);
                Simulator.replay();
            });
        }
    }
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () {

    // ultrasonic

    Sk.builtins.grove_getUltrasonicData = function (pinNumber, data, timeout_us) {
        Sk.builtin.pyCheckArgsLen("grove_getUltrasonicData", arguments.length, 1, 3);
        Sk.builtin.pyCheckType("data", "string", Sk.builtin.checkString(data));
        Sk.builtin.pyCheckType("timeout_us", "integer", Sk.builtin.checkInt(timeout_us));
        const duration = $('#ultrasonic_' + pinNumber.v + '_slider_d').slider('option', 'value')
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
                Simulator.setAnimator(module, module.id + "_" + Pin.pin, 0);
            }
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
    "read-digital": /(^(?!.*ADC\()| )(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.IN(?!, id=.*)(,|\))/gi,
    // analog readers
    "read-analog": /(pinADC\(([0-9]{1,2})|(machine.|)ADC\((machine.|)Pin\(([0-9]{1,2})\),)\)/g,
    // digital writers
    "write-digital": /(^(?!.*ADC\()| )(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.OUT(?!, id=.*)/gi,
    // analog writers
    "write-analog": /(machine.|)DAC\((machine.|)Pin\(([0-9]{1,2})(?!, bits=.*)\)/gi,
    // pwm
    "pwm": /(machine.|)PWM\((machine.|)Pin\([0-9]{1,2}/gi,
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
    "gps": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.IN, id="gps"/gi,
    // Pins on module - outputs
    "openlog": /Lecteur SD TX on p([0-9]{1,2})/gi,
    "RGBLed": /CHAINABLE_LED_COUNT_((A|D|)[0-9]{1,2})( |)=/gi,
};

Simulator.Mosaic.specific = {

    SERVER_REGEXP: /(import vitta_server|from vitta_server import (\*|SERVER))/,

    iloRobotSpecific: {
        needRotation: false,
    },

    extract: (str, func) => str.split(func + '(')[1].split(',')[0].replace(')', ''),
    extractPin: {
        'write-digital': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
        'read-digital': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
        'write-analog': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
        'read-analog': (str) => str.includes('pinADC') ? Simulator.Mosaic.specific.extract(str, 'pinADC') : Simulator.Mosaic.specific.extract(str, 'Pin'),
        'pwm': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
    },

    setLed: function (state) {
        const board = document.getElementById("board-viewer").contentDocument;
        if (board !== null) {
            const led = (Simulator.board.name.includes('Wemos') ? board.querySelector("#LED_P2 .cls-11") : board.querySelector("#led_l_on .cls-36"));
            if (led !== null) {
                if (state) {
                    led.style.fill = "red";
                    led.style.filter = "blur(6px)";
                } else {
                    led.style.fill = "";
                }
            }
        }
    },

    createSliders: function () {
        // Esp32 sliders
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
        // Grove sliders
        $('#colorSensor_slider_r,' +
            '#colorSensor_slider_g,' +
            '#colorSensor_slider_b').slider({
                min: 0,
                max: 255,
                value: 0
            });


        $('#ilo-distanceLeft_slider,' +
            '#ilo-distanceRight_slider,' +
            '#ilo-distanceFront_slider,' +
            '#ilo-distanceBack_slider').slider({
                min: 0,
                max: 1300,
                value: 0
            });

        $('#ilo-finderRight_slider_v,' +
            '#ilo-finderLeft_slider_v,' +
            '#ilo-finderMiddle_slider_v').slider({
                min: 0,
                max: 1,
                value: 0
            });

        $('#ilo-ColorSensor_slider_r,' +
            '#ilo-ColorSensor_slider_g,' +
            '#ilo-ColorSensor_slider_b').slider({
                min: 0,
                max: 255,
                value: 0
            });
    },

    calculs: {
        getServoAngle(duty) {
            return (duty / PWM_MAX_DUTY * 100 - 2.5) * 180 / (12.5 - 2.5);
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
        /* Esp32 modules */
        {
            regex: /Builtin LED on p2/,
            id: "esp32-builtin-led",
            title: "LED intégrée",
            pin: 'pin n° ',
            pins: 'digital',
            builtin: 'ESP32',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.led();
                Simulator.Mosaic.specific.setLed(Animator.value);
            }
        },
        {
            regex: /esp32\.hall_sensor\(\)/,
            id: "esp32-hallMag",
            title: "Capteur à effet Hall ",
            pin: 'ESP32',
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
            pin: 'ESP32',
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
            regex: /ilo\.(step|move|drive_single_motor_speed_front_left)\(/gi,
            id: "ilo-motorFrontLeft",
            title: "Moteur Avant Gauche",
            pin: "Ilo",
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /ilo\.(step|move|drive_single_motor_speed_front_right)\(/gi,
            id: "ilo-motorFrontRight",
            title: "Moteur Avant Droit",
            pin: "Ilo",
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /ilo\.(step|move|drive_single_motor_speed_back_left)\(/gi,
            id: "ilo-motorBackLeft",
            title: "Moteur Arrière Gauche",
            pin: "Ilo",
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /ilo\.(step|move|drive_single_motor_speed_back_right)\(/gi,
            id: "ilo-motorBackRight",
            title: "Moteur Arrière Droit",
            pin: "Ilo",
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /ilo\.get_distance_Right\(\)/gi,
            id: "ilo-distanceRight",
            title: "Time Of Flight - Distance (mm)",
            pin: 'Capteur droit',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },
        {
            regex: /ilo\.get_distance_left\(\)/gi,
            id: "ilo-distanceLeft",
            title: "Time Of Flight - Distance (mm)",
            pin: 'Capteur gauche',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },
        {
            regex: /ilo\.get_distance_front\(\)/gi,
            id: "ilo-distanceFront",
            title: "Time Of Flight - Distance (mm)",
            pin: 'Capteur avant',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },
        {
            regex: /ilo\.get_distance_back\(\)/gi,
            id: "ilo-distanceBack",
            title: "Time Of Flight - Distance (mm)",
            pin: 'Capteur arrière',
            type: 'input',
            listeners: [{
                default: 0,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 1300);
            }
        },
        {
            regex: /ilo\.get_line_left\(\)/gi,
            id: "ilo-finderLeft",
            title: "Capteur de ligne noire gauche",
            pin: 'Ilo robot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 'OFF',
                unit: '',
                color: "#f9d142",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /ilo\.get_line_right\(\)/gi,
            id: "ilo-finderRight",
            title: "Capteur de ligne noire droit",
            pin: 'Ilo robot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 'OFF',
                unit: '',
                color: "#f9d142",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /ilo\.get_line_middle\(\)/gi,
            id: "ilo-finderMiddle",
            title: "Capteur de ligne noire central",
            pin: 'Ilo robot',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: 'OFF',
                unit: '',
                color: "#f9d142",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /ilo\.get_color_rgb_(center|right|left)\(\)/gi,
            id: "ilo-ColorSensor",
            title: "Capteur de couleurs : ",
            pin: "Ilo robot",
            type: 'input',
            codeFlag: 'Color Sensor',
            listeners: [{
                suffix: "_r",
                default: 255,
                unit: '',
                color: "#dc3545",
                title: "R"
            }, {
                suffix: "_g",
                default: 0,
                unit: '',
                color: "#22b573",
                title: "G"
            }, {
                suffix: "_b",
                default: 0,
                unit: '',
                color: "#3fa9f5",
                title: "B"
            }
            ],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                const r = $(Animator.sliderId.replace(/_(g|b)/, '_r')).slider('option', 'value');
                const g = $(Animator.sliderId.replace(/_(b|r)/, '_g')).slider('option', 'value');
                const b = $(Animator.sliderId.replace(/_(r|g)/, '_b')).slider('option', 'value');
                $(Animator.animId).css('background-color', `rgb(${r}, ${g}, ${b})`);
                $(Animator.valueId).html(Animator.value);
            }
        }
    ]
}