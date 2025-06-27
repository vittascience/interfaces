Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /(D|A|d|a)[0-9]{1,2}/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    return {
        name: pin.toUpperCase(),
        id: pin.toUpperCase()
    };
};

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/neopixel.js': Simulator.PATH_LIB_COMMON + 'micropython/neopixel.js',
    'src/lib/gc.js': Simulator.PATH_LIB_COMMON + 'micropython/gc.js',
    'src/lib/onewire.js': Simulator.PATH_LIB_COMMON + 'micropython/onewire.js',
    // js specific board libraries
    'src/lib/machine.js': Simulator.PATH_LIB + 'micropython/machine.js',
    'src/lib/pyb.js': Simulator.PATH_LIB + 'micropython/pyb.js',
    'src/lib/dht.js': Simulator.PATH_LIB + 'micropython/dht.js',
    'src/lib/stm32_alphabot_v2.js': Simulator.PATH_LIB + 'alphabot/stm32_alphabot_v2.js',
    'src/lib/bluetooth.js': Simulator.PATH_LIB + 'micropython/bluetooth.js',
    'src/lib/ubluetooth.js': Simulator.PATH_LIB + 'micropython/bluetooth.js',
    'src/lib/stm32_ble_uart.js': Simulator.PATH_LIB + 'bluetooth/stm32_ble_uart.js',
    // js grove libraries
    'src/lib/stm32_lcd_i2c.js': Simulator.PATH_LIB + 'grove/stm32_lcd_i2c.js',
    'src/lib/stm32_tm1637.js': Simulator.PATH_LIB + 'grove/stm32_tm1637.js',
    'src/lib/stm32_vl53l0x.js': Simulator.PATH_LIB + 'grove/stm32_vl53l0x.js',
    'src/lib/stm32_dht.js': Simulator.PATH_LIB + 'grove/stm32_dht.js',
    'src/lib/stm32_sgp30.js': Simulator.PATH_LIB + 'grove/stm32_sgp30.js',
    'src/lib/stm32_scd30.js': Simulator.PATH_LIB + 'grove/stm32_scd30.js',
    'src/lib/stm32_hm330x.js': Simulator.PATH_LIB + 'grove/stm32_hm330x.js',
    'src/lib/stm32_bmp280.js': Simulator.PATH_LIB + 'grove/stm32_bmp280.js',
    'src/lib/stm32_gas.js': Simulator.PATH_LIB + 'grove/stm32_gas.js',
    'src/lib/stm32_si1145.js': Simulator.PATH_LIB + 'grove/stm32_si1145.js',
    'src/lib/stm32_chainableLED.js': Simulator.PATH_LIB + 'grove/stm32_chainableLED.js',
    'src/lib/stm32_ssd1306.js': Simulator.PATH_LIB + 'grove/stm32_ssd1306.js',
    'src/lib/stm32_rgb_led_matrix.js': Simulator.PATH_LIB + 'grove/stm32_rgb_led_matrix.js',
    'src/lib/stm32_my9221.js': Simulator.PATH_LIB + 'grove/stm32_my9221.js',
    'src/lib/stm32_driverAT.js': Simulator.PATH_LIB + 'grove/stm32_driverAT.js',
    'src/lib/stm32_LoRa.js': Simulator.PATH_LIB + 'grove/stm32_LoRa.js',
    'src/lib/stm32_ds18x20.js': Simulator.PATH_LIB + 'grove/stm32_ds18x20.js',
    // js HT16K33 libraries
    'src/lib/stm32_ht16k33.js': Simulator.PATH_LIB + 'HT16K33/stm32_ht16k33.js',
    'src/lib/stm32_ht16k33matrix.js': Simulator.PATH_LIB + 'HT16K33/stm32_ht16k33matrix.js',
    // js infrared libraries
    'src/lib/stm32_ir_receiver.js': Simulator.PATH_LIB + 'infrared/stm32_ir_receiver.js',
    'src/lib/stm32_nec.js': Simulator.PATH_LIB + 'infrared/stm32_nec.js',
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    if (board !== null) {
        const up = 'translate(0px, -3px)',
            down = 'translate(0px, 0px)';

        const playButtonAnimation = function (id, animation) {
            var button = board.querySelector("#" + id.replace('_BTN', ''));
            if (button !== null) {
                button.style.transform = animation;
            }
        };

        // STM32 switches SW1, SW2 , SW3 & SW4
        for (let i = 1; i < 5; i++) {
            let button = board.querySelector("#SW" + i + "_BTN");
            if (button != null) {
                button.addEventListener("mousedown", function () {
                    playButtonAnimation(this.id, down);
                    $('#stm32-' + this.id.split('_')[0].toLowerCase() + '_slider').slider('value', 1);

                });
                button.addEventListener("mouseup", function () {
                    playButtonAnimation(this.id, up);
                    if (this.id === 'SW4_BTN') {
                        Simulator.replay();
                    } else {
                        $('#stm32-' + this.id.split('_')[0].toLowerCase() + '_slider').slider('value', 0);
                    }
                });
                button.addEventListener("touchstart", function () {
                    playButtonAnimation(this.id, down);
                    $('#stm32-' + this.id.split('_')[0].toLowerCase() + '_slider').slider('value', 1);
                });
                button.addEventListener("touchend", function () {
                    playButtonAnimation(this.id, up);
                    if (this.id === 'SW4_BTN') {
                        Simulator.replay();
                    } else {
                        $('#stm32-' + this.id.split('_')[0].toLowerCase() + '_slider').slider('value', 0);
                    }
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

// STM32
Simulator.Mosaic.groveRegex = {
    // digital readers
    "read-digital": /(pyb.|machine.|)Pin\(\'(D[0-9]{1,2})\',( |)(pyb.|machine.|)Pin.IN(?!, id=.*)(,|\))/gi,
    // analog readers
    "read-analog": /(pyb.|)ADC\(\'(A[0-9]{1,2})\'\)/gi,
    // digital writers
    "write-digital": /(pyb.|machine.|)Pin\(\'(D[0-9]{1,2})\',( |)(pyb.|machine.|)Pin.OUT(?!, id=.*)(,|\))/gi,
    // pwm
    "pwm": /(pyb.|machine.|)Pin\(\'(D[0-9]{1,2})\',( |)(pyb.|machine.|)Pin.OUT_PP(,|\))/gi,
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
    "gps": /Pin\('(D[0-9]{1,2})',( |)(mode=|)(machine.|pyb.|)Pin.IN, id="gps"/gi,
    // Pins on module - outputs
    "openlog": /Pin\('(D[0-9]{1,2})',( |)(mode=|)(machine.|pyb.|)Pin.IN, id="openlog"/gi,
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
        // Specific sliders
        // !Slider base : ultrasonic round-trip duration (in ms) _t
        $('#alphabot-ultrasonic_slider_t,' +
            '#alphabot-ultrasonic_slider_d').slider({
                min: 88,
                max: 14575,
                value: 1166
            });
        $('#alphabot-trsensor1_slider,' +
            '#alphabot-trsensor2_slider,' +
            '#alphabot-trsensor3_slider,' +
            '#alphabot-trsensor4_slider,' +
            '#alphabot-trsensor5_slider').slider({
                min: 30,
                max: 1000,
                value: 500,
                step: 0.1
            });
        // Grove sliders
        $('#vl53l0x_slider').slider({
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
        $('#stm32-sw1_slider,' +
            '#stm32-sw2_slider,' +
            '#stm32-sw3_slider').slider({
                min: 0,
                max: 1,
                value: 0
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
            pin: 'STM32',
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
            pin: 'STM32',
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
            pin: 'STM32',
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
            regex: /pyb\.Pin\(\'SW1\'\)/,
            id: "stm32-sw1",
            title: "Bouton SW1",
            pin: 'STM32',
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
            regex: /pyb\.Pin\(\'SW2\'\)/,
            id: "stm32-sw2",
            title: "Bouton SW2",
            pin: 'STM32',
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
            regex: /pyb\.Pin\(\'SW3\'\)/,
            id: "stm32-sw3",
            title: "Bouton SW3",
            pin: 'STM32',
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
            regex: /.(RTC|datetime)\(/gi,
            id: "rtc",
            title: "Horloge",
            pin: 'STM32',
            type: 'output',
            value: "",
            picture: null
        },
        {
            regex: /AlphaBot_v2\(/gi,
            id: "alphabot-motorLeft",
            title: "Moteur Gauche",
            pin: 'AlphaBot2-Ar',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /AlphaBot_v2\(/gi,
            id: "alphabot-motorRight",
            title: "Moteur Droit",
            pin: 'AlphaBot2-Ar',
            type: 'output',
            value: "",
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /(.*)\.readUltrasonicDistance\(\)/gi,
            id: "alphabot-ultrasonic",
            title: "Télémètre: ",
            pin: 'AlphaBot2-Ar',
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
            class: "ultrasonic",
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
            regex: /(.).(TRSensors_calibrate|calibrateLineFinder|TRSensors_readLine)\(/gi,
            id: "alphabot-trsensor1",
            title: "Capteur de ligne noire 1",
            pin: 'AlphaBot2-Ar',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },
        {
            regex: /(.).(TRSensors_calibrate|calibrateLineFinder|TRSensors_readLine)\(/gi,
            id: "alphabot-trsensor2",
            title: "Capteur de ligne noire 2",
            pin: 'AlphaBot2-Ar',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },
        {
            regex: /(.).(TRSensors_calibrate|calibrateLineFinder|TRSensors_readLine)\(/gi,
            id: "alphabot-trsensor3",
            title: "Capteur de ligne noire 3",
            pin: 'AlphaBot2-Ar',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },
        {
            regex: /(.).(TRSensors_calibrate|calibrateLineFinder|TRSensors_readLine)\(/gi,
            id: "alphabot-trsensor4",
            title: "Capteur de ligne noire 4",
            pin: 'AlphaBot2-Ar',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
        },
        {
            regex: /(.).(TRSensors_calibrate|calibrateLineFinder|TRSensors_readLine)\(/gi,
            id: "alphabot-trsensor5",
            title: "Capteur de ligne noire 5",
            pin: 'AlphaBot2-Ar',
            type: 'input',
            listeners: [{
                default: 500,
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            picture: "Capteur-ligne-line.png",
            pictureAnimation: "Capteur-ligne-anim.png",
            animate: function (Animator) {
                Animator.translation('analog', Animator.value < 300);
            }
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
        }
    ]
};
