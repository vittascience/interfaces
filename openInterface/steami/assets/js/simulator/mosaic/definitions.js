Simulator.Mosaic.BOARD_HEADER =
    `<object id="board-viewer" type="image/svg+xml"></object>
<canvas class="canvas-steami-screen" width='128' height='128'></canvas>`;

Simulator.Mosaic.pin_regex = /P[0-9]{1,2}/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    return {
        name: pin,
        id: pin
    };
};

Simulator.Mosaic.externalLibraries = {
    // python common libraries
    'src/lib/framebuf.py': Simulator.PATH_LIB_COMMON + 'micropython/framebuf.py',
    // js common libraries
    'src/lib/os.js': Simulator.PATH_LIB_COMMON + 'micropython/os.js',
    'src/lib/uos.js': Simulator.PATH_LIB_COMMON + 'micropython/os.js',
    'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/neopixel.js': Simulator.PATH_LIB_COMMON + 'micropython/neopixel.js',
    'src/lib/gc.js': Simulator.PATH_LIB_COMMON + 'micropython/gc.js',
    'src/lib/onewire.js': Simulator.PATH_LIB_COMMON + 'micropython/onewire.js',
    'src/lib/dht.js': Simulator.PATH_LIB_COMMON + 'stm32/micropython/dht.js',
    // js specific board libraries
    'src/lib/machine.js': Simulator.PATH_LIB.replace('steami', 'wb55') + 'micropython/machine.js',
    'src/lib/pyb.js': Simulator.PATH_LIB.replace('steami', 'wb55') + 'micropython/pyb.js',
    'src/lib/bluetooth.js': Simulator.PATH_LIB.replace('steami', 'wb55') + 'micropython/bluetooth.js',
    'src/lib/ubluetooth.js': Simulator.PATH_LIB.replace('steami', 'wb55') + 'micropython/bluetooth.js',
    'src/lib/stm32_ble_uart.js': Simulator.PATH_LIB.replace('steami', 'wb55') + 'bluetooth/stm32_ble_uart.js',
    'src/lib/dht.js': Simulator.PATH_LIB_COMMON + 'stm32/micropython/dht.js',
    // js grove libraries
    'src/lib/stm32_lcd_i2c.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_lcd_i2c.js',
    'src/lib/stm32_tm1637.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_tm1637.js',
    'src/lib/stm32_vl53l0x.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_vl53l0x.js',
    'src/lib/stm32_dht.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_dht.js',
    'src/lib/stm32_sgp30.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_sgp30.js',
    'src/lib/stm32_scd30.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_scd30.js',
    'src/lib/stm32_hm330x.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_hm330x.js',
    'src/lib/stm32_bmp280.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_bmp280.js',
    'src/lib/stm32_gas.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_gas.js',
    'src/lib/stm32_si1145.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_si1145.js',
    'src/lib/stm32_chainableLED.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_chainableLED.js',
    'src/lib/stm32_ssd1306.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_ssd1306.js',
    'src/lib/stm32_rgb_led_matrix.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_rgb_led_matrix.js',
    'src/lib/stm32_my9221.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_my9221.js',
    'src/lib/stm32_driverAT.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_driverAT.js',
    'src/lib/stm32_LoRa.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_LoRa.js',
    'src/lib/stm32_ds18x20.js': Simulator.PATH_LIB_COMMON + 'stm32/grove/stm32_ds18x20.js',
    // js HT16K33 libraries
    'src/lib/stm32_ht16k33.js': Simulator.PATH_LIB_COMMON + 'stm32/HT16K33/stm32_ht16k33.js',
    'src/lib/stm32_ht16k33matrix.js': Simulator.PATH_LIB_COMMON + 'stm32/HT16K33/stm32_ht16k33matrix.js',
    // js infrared libraries
    'src/lib/stm32_ir_receiver.js': Simulator.PATH_LIB_COMMON + 'stm32/infrared/stm32_ir_receiver.js',
    'src/lib/stm32_nec.js': Simulator.PATH_LIB_COMMON + 'stm32/infrared/stm32_nec.js',
    // js steami libraries
    'src/lib/ssd1327.js': Simulator.PATH_LIB + 'steami/ssd1327.js',
    'src/lib/HTS221.js': Simulator.PATH_LIB + 'steami/HTS221.js',
    'src/lib/vl53l1x.js': Simulator.PATH_LIB + 'steami/vl53l1x.js',
    'src/lib/mcp23009e/__init__.js': Simulator.PATH_LIB + 'steami/mcp23009e/__init__.js',
    'src/lib/mcp23009e/const/__init__.js': Simulator.PATH_LIB + 'steami/mcp23009e/const/__init__.js',
    'src/lib/apds9960/__init__.js': Simulator.PATH_LIB + 'steami/apds9960/__init__.js',
    'src/lib/apds9960/const/__init__.js': Simulator.PATH_LIB + 'steami/apds9960/const/__init__.js',
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    if (board !== null) {
        const up = 'translate(0px, -3px)',
            down = 'translate(0px, 0px)';

        const playButtonAnimation = function (id, animation) {
            var button = board.querySelector("#" + id);
            if (button !== null) {
                button.style.transform = animation;
            }
        };
        const buttons_id = ['a', 'b', 'menu'];
        for (const id of buttons_id) {
            let button = board.querySelector("#button-" + id);
            if (button != null) {
                button.addEventListener("mousedown", function () {
                    playButtonAnimation('ellipse_top-' + id, down);
                    $('#steami-' + id + '-button_slider').slider('value', 1);
                });
                button.addEventListener("mouseup", function () {
                    playButtonAnimation('ellipse_top-' + id, up);
                    $('#steami-' + id + '-button_slider').slider('value', 0);
                });
                button.addEventListener("touchstart", function () {
                    playButtonAnimation('ellipse_top-' + id, down);
                    $('#steami-' + id + '-button_slider').slider('value', 1);
                });
                button.addEventListener("touchend", function () {
                    playButtonAnimation('ellipse_top-' + id, up);
                    $('#steami-' + id + '-button_slider').slider('value', 0);
                });
            }
        }

    }
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () {

    // ultrasonic

    Sk.builtins.grove_getUltrasonicData = function (Pin, data, timeout_us) {
        Sk.builtin.pyCheckArgsLen("grove_getUltrasonicData", arguments.length, 1, 3);
        Sk.builtin.pyCheckType("data", "string", Sk.builtin.checkString(data));
        Sk.builtin.pyCheckType("timeout_us", "integer", Sk.builtin.checkInt(timeout_us));
        const duration = $('#ultrasonic_' + Pin.pin + '_slider_d').slider('option', 'value');
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
            if (trig.pin == echo.pin) {
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

// STM32
Simulator.Mosaic.groveRegex = {
    // digital readers
    "read-digital": /(pyb.|machine.|)Pin\(\'(P[0-9]{1,2})\',( |)(pyb.|machine.|)Pin.IN(?!, id=.*)(,|\))/gi,
    // analog readers
    "read-analog": /(pyb.|)ADC\(\'(A[0-9]{1,2})\'\)/gi,
    // digital writers
    "write-digital": /(pyb.|machine.|)Pin\(\'(P[0-9]{1,2})\',( |)(pyb.|machine.|)Pin.OUT(?!, id=.*)(,|\))/gi,
    // pwm
    "pwm": /(pyb.|machine.|)Pin\(\'(P[0-9]{1,2})\',( |)(pyb.|machine.|)Pin.OUT_PP(,|\))/gi,
    // I2C modules
    "lcdGrove": /(.|)LCD1602\(/gi,
    "oled": /(.|)SSD1306_I2C\(./gi,
    "sgp30": /(.|)SGP30\(/gi,
    "multichannel": /(.|)GAS\(/gi,
    "scd30-co2": /scd30_read\(0\)/gi,
    "scd30-temp": /scd30_read\(1\)/gi,
    "scd30-hum": /scd30_read\(2\)/gi,
    "multichannelV2": /(.|)GAS_GMXXX\(/gi,
    "hm330x": /(.|)HM330X\(/g,
    "bmp280-temp": /bmp280\.temperature\(\)/gi,
    "bmp280-press": /bmp280\.(pressure|altitude)\(\)/gi,
    "bmp280-alt": /bmp280\.(pressure|altitude)\(\)/gi,
    "si1145": /(.|)SI1145\(/gi,
    "vl53l0x": /(.|)VL53L0X\(/gi,
    "LEDMatrix": /(.|)HT16K33Matrix\(/gi,
    "RGBLEDMatrix": /(.|)GroveTwoRGBLedMatrix\(/gi,
    // Pins on module - inputs
    "gps": /Pin\('(P[0-9]{1,2})',( |)(mode=|)(machine.|pyb.|)Pin.IN, id="gps"/gi,
    // Pins on module - outputs
    "openlog": /Pin\('(P[0-9]{1,2})',( |)(mode=|)(machine.|pyb.|)Pin.IN, id="openlog"/gi,
    "RGBLed": /CHAINABLE_LED_COUNT_((A|D|)[0-9]{1,2})( |)=/gi,
    "LoRa": /(from stm32_LoRa)/gi
};


Simulator.Mosaic.specific = {

    extractPin: {
        'pwm': (str) => str.split(',')[0].split('Pin(')[1].replace(/'/gi, "")
    },

    setLed: function (state, selector, specificClass) {
        const board = document.getElementById("board-viewer").contentDocument;
        if (board != null) {
            let led = board.querySelector("#" + selector + " path"),
                border = board.querySelector("#" + selector + " rect");
            if (led != null && border != null) {
                if (state) {
                    led.classList.add(specificClass);
                    border.classList.add(specificClass);
                } else {
                    led.classList.remove(specificClass);
                    border.classList.remove(specificClass);
                }
            }
        }
    },

    createSliders: function () {
        // Grove sliders
        $('#vl53l0x_slider,' +
            '#vl53l1x_slider').slider({
                min: 50,
                max: 8200,
                value: 500
            });
        $('#colorSensor_slider_r,' +
            '#colorSensor_slider_g,' +
            '#colorSensor_slider_b').slider({
                min: 0,
                max: 255,
                value: 0
            });
        $('#steami-a-button_slider,' +
            '#steami-b-button_slider,' +
            '#steami-menu-button_slider,' +
            '#steami-up-button_slider,' +
            '#steami-down-button_slider,' +
            '#steami-left-button_slider,' +
            '#steami-right-button_slider').slider({
                min: 0,
                max: 1,
                value: 0
            });

        $('#hts221-temp_slider').slider({
            min: -40,
            max: 120,
            value: 20,
            step: 0.01
        });

        $('#hts221-hum_slider').slider({
            min: 0,
            max: 100,
            value: 50,
            step: 0.01
        });
    },

    calculs: {
        getServoAngle(duty) {
            return (duty / PWM_MAX_DUTY * 100 - 3) * 180 / (12.5 - 3) - 90;
        },
        getServoSpeed(duty) {
            const GAP = -10;
            if (duty == 0) {
                return 0;
            }
            return 100 * ((duty / PWM_MAX_DUTY * 100 - 3) * 2 / (12.5 - 3) - 2 + GAP / 90);
        }
    },

    definitions: [
        // STM32 modules
        {
            regex: /LED\(3\)/gi,
            id: "stm32-led1",
            title: "LED Bleue",
            pin: 'STeaMi',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.led();
                Simulator.Mosaic.specific.setLed(Animator.value, "LED_BLUE", "cls-12");
            }
        },
        {
            regex: /LED\(2\)/gi,
            id: "stm32-led2",
            title: "LED Verte",
            pin: 'STeaMi',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.led();
                Simulator.Mosaic.specific.setLed(Animator.value, "LED_GREEN", "cls-9");
            }
        },
        {
            regex: /LED\(1\)/gi,
            id: "stm32-led3",
            title: "LED Rouge",
            pin: 'STeaMi',
            type: 'output',
            value: 0,
            picture: "LED.png",
            pictureAnimation: "LED-animation.png",
            animate: function (Animator) {
                Animator.led();
                Simulator.Mosaic.specific.setLed(Animator.value, "LED_RED", "cls-17");
            }
        },
        {
            regex: /.(RTC|datetime)\(/gi,
            id: "rtc",
            title: "Horloge",
            pin: 'STM32',
            type: 'output',
            value: "",
            picture: null
        },
        {
            regex: /Pin\('(D[0-9]{1,2})',( |)(mode=|)(machine.|pyb.|)Pin.IN,( |)id="bluetooth"/gi,
            id: "bluetooth",
            title: "Bluetooth",
            pin: 'UART',
            codeFlag: 'Bluetooth',
            type: 'output',
            value: "",
            picture: ""
        },
        {
            regex: /pyb\.Pin\(\'A_BUTTON\'\)/,
            id: "steami-a-button",
            title: "Bouton A",
            pin: 'STeaMi',
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
            regex: /pyb\.Pin\(\'B_BUTTON\'\)/,
            id: "steami-b-button",
            title: "Bouton B",
            pin: 'STeaMi',
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
            regex: /pyb\.Pin\(\'MENU_BUTTON\'\)/,
            id: "steami-menu-button",
            title: "Bouton Menu",
            pin: 'STeaMi',
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
            regex: /readSteamiButton\(\'UP_BUTTON\'\)/,
            id: "steami-up-button",
            title: "Bouton Haut",
            pin: 'STeaMi',
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
        }

        ,
        {
            regex: /readSteamiButton\(\'DOWN_BUTTON\'\)/,
            id: "steami-down-button",
            title: "Bouton Bas",
            pin: 'STeaMi',
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
            regex: /readSteamiButton\(\'LEFT_BUTTON\'\)/,
            id: "steami-left-button",
            title: "Bouton Gauche",
            pin: 'STeaMi',
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
            regex: /readSteamiButton\(\'RIGHT_BUTTON\'\)/,
            id: "steami-right-button",
            title: "Bouton Droit",
            pin: 'STeaMi',
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
            regex: /hts\.temperature\(\)/gi,
            id: "hts221-temp",
            title: "HTS221 - Température",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 20,
                unit: '°C',
                color: "#f8a10f"
            }],
            multiple: ['hts221-hum'],
            class: 'gauge',
            picture: "Temperature-Pression-Altitude.png",
            pictureAnimation: "Temperature-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        },
        {
            regex: /hts\.humidity\(\)/gi,
            id: "hts221-hum",
            title: "HTS221 - Humidité",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                suffix: "",
                default: 50,
                unit: '%',
                color: "#1a6da8",
            }],
            multiple: ['hts221-temp'],
            class: 'cloud',
            picture: "CO2-COV.png",
            pictureAnimation: "cloud-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 100);
            }
        },
        {
            regex: /vl53l1x\.read\(\)/gi,
            id: "vl53l1x",
            title: "VL53L1X - Distance",
            pin: 'I2C',
            type: 'input',
            listeners: [{
                default: 500,
                unit: 'mm',
                color: "#f9d142 ",
                suffix: "",
                title: ""
            }],
            class: 'ultrasonic',
            picture: "Ultrason.png",
            pictureAnimation: "Ultrason-animation.png",
            animate: function (Animator) {
                Animator.opacity(30, 1000);
            }
        },
    ]
};
