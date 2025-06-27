Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    return {
        name: parseInt(pin) > 25 ? 'A' + (parseInt(pin) - 26) : 'GP' + pin,
        id: pin
    };
};

Simulator.Mosaic.getCurrentRobot = function () {
    const kitronik_regExp = Robots['Kitronik'].CODE_REGEXP;
    const current_robot = Simulator.code.match(/""" ([a-zA-Z]+) """/g);
    if (current_robot?.length > 1) {
        return 'error';
    } else if (Simulator.code.match(kitronik_regExp)) {
        return 'Kitronik';
    } else {
        return null;
    }
};

Simulator.Mosaic.externalLibraries = {
    // js specific board libraries
    'src/lib/machine.js': Simulator.PATH_LIB + 'micropython/machine.js',
    'src/lib/bluetooth.js': Simulator.PATH_LIB + 'micropython/bluetooth.js',
    'src/lib/esp32_ble_uart.js': Simulator.PATH_LIB + 'micropython/esp32_ble_uart.js',
    'src/lib/V05.js': Simulator.PATH_LIB + 'ilo/V05.js',
    'src/lib/PicoAutonomousRobotics.js': Simulator.PATH_LIB + 'kitronik/PicoAutonomousRobotics.js',
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
        if (typeof trig !== 'undefined' && typeof echo !== 'undefined') {
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

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    const up = 'translate(0px, 0px)',
        down = 'translate(0px, 7px)';
    if (board !== null) {
        const resetBtn = board.querySelector("#button");
        resetBtn.addEventListener("mousedown", function () {
            board.querySelector("#button_off").style.transform = down;
        });
        resetBtn.addEventListener("mouseup", function () {
            board.querySelector("#button_off").style.transform = up;
            Simulator.replay();
        });
        resetBtn.addEventListener("touchstart", function () {
            board.querySelector("#button_off").style.transform = down;
        });
        resetBtn.addEventListener("touchend", function () {
            board.querySelector("#button_off").style.transform = up;
            Simulator.replay();
        });
    }
};

Simulator.Mosaic.specific = {

    SERVER_REGEXP: /(import vitta_server|from vitta_server import (\*|SERVER))/,

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
            const led = board.querySelector("#led_off");
            if (led !== null) {
                if (state) {
                    led.style.fill = "lime";
                    led.style.filter = "blur(6px)";
                } else {
                    led.style.fill = "#b2aa92";
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
        $('.mod_colorVariableLed_r').slider('value', 127);

        $('#kitro-finderLeft_slider_v,' +
            '#kitro-finderRight_slider_v,' +
            '#kitro-finderCentral_slider_v').slider({
                min: 0,
                max: 1,
                value: 0
            });

        $('.mod_kitro-hcsr04-front_t,' +
            '.mod_kitro-hcsr04-front_d,' +
            '.mod_kitro-hcsr04-back_t,' +
            '.mod_kitro-hcsr04-back_d').slider({
                min: 88,
                max: 14575,
                value: 1166,
                step: 0.1
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
            regex: /Builtin LED on p(25|0)/,
            id: "pico-builtin-led",
            title: "LED intégrée",
            pin: 'pin n° ',
            pins: 'digital',
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
            regex: /""" Kitronik """/gi,
            id: "kitro-motorLeft",
            title: "Moteur Gauche",
            pin: "Kitronik",
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /""" Kitronik """/gi,
            id: "kitro-motorRight",
            title: "Moteur Droit",
            pin: "Kitronik",
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /(getDistance|getDuration)\("f"\)/gi,
            id: "kitro-hcsr04-front",
            title: "HC-SR04: ",
            pin: 'Capteur avant',
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
            regex: /(getDistance|getDuration)\("r"\)/gi,
            id: "kitro-hcsr04-back",
            title: "HC-SR04: ",
            pin: 'Capteur arrière',
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
            regex: /setLED\(0, \(([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\)\)/gi,
            id: "kitro-FrontLeftRGBLed",
            title: "LED RGB (avant gauche)",
            pin: 'Kitronik',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            regex: /setLED\(1, \(([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\)\)/gi,
            id: "kitro-FrontRightRGBLed",
            title: "LED RGB (avant gauche)",
            pin: 'Kitronik',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            regex: /setLED\(2, \(([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\)\)/gi,
            id: "kitro-BackRightRGBLed",
            title: "LED RGB (arrière droite)",
            pin: 'Kitronik',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            regex: /setLED\(3, \(([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5]), ([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\)\)/gi,
            id: "kitro-BackLeftRGBLed",
            title: "LED RGB (arrière gauche)",
            pin: 'Kitronik',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            regex: /kitro_lineFinder\("r"\)/gi,
            id: "kitro-finderRight",
            title: "cap. Ligne noire (Droit)",
            pin: 'Kitronik',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /kitro_lineFinder\("l"\)/gi,
            id: "kitro-finderLeft",
            title: "cap. Ligne noire (Gauche)",
            pin: 'Kitronik',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /kitro_lineFinder\("c"\)/gi,
            id: "kitro-finderCentral",
            title: "cap. Ligne noire (Central)",
            pin: 'Kitronik',
            type: 'input',
            class: 'finder',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#000000",
                suffix: "_v"
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('digital');
            }
        },
        {
            regex: /import bluetooth/gi,
            id: "pico-bluetooth",
            title: "Bluetooth",
            pin: '',
            type: 'output',
            value: '',
            pictureAnimation: 'Ultrason-animation.png',
            animate: function (Animator) {
                document.querySelector(Animator.valueId).innerHTML = Animator.value;
            }
        },

    ]
}