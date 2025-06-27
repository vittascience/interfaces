Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" type="image/svg+xml"></object><div id="main-py">main.py<span></span></div><span id="galaxia_screen-value" class="galaxia_screen-value_text"></span><canvas class="canvas-galaxia-screen" width='160' height='128'></canvas>`;


Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
    const pins = Blockly.Constants.Pins.GALAXIA_PINS;
    const pinName = pins.find(p => p[1] == 'p' + pin);
    return {
        name: pinName ? pinName[0] : null,
        id: pin.replace("pin", '')
    };
};

Simulator.Mosaic.externalLibraries = {
    // python libraries
    'src/lib/vitta_server.py': '/openInterface/interfaces/assets/lib/esp32-mpy/wifi/vitta_server.py',
    'src/lib/vitta_client.py': '/openInterface/interfaces/assets/lib/esp32-mpy/wifi/vitta_client.py',
    // js board specific libraries
    'src/lib/machine.js': Simulator.PATH_LIB + 'micropython/machine.js',
    // 'src/lib/galaxiaUi.js': Simulator.PATH_LIB + 'galaxia/galaxiaUi.js',
    'src/lib/thingz.js': Simulator.PATH_LIB + 'galaxia/thingz.js',
    'src/lib/esp32_rotary.js': Simulator.PATH_LIB + 'grove/esp32_rotary.js',
    'src/lib/esp32_linky.js': Simulator.PATH_LIB + 'micropython/esp32_linky.js',
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
    'src/lib/esp32_lcd_i2c.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_lcd_i2c.js',
    'src/lib/esp32_chainableLED.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_chainableLED.js',
    'src/lib/esp32_my9221.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_my9221.js',
    'src/lib/esp32_ds18b20.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_ds18b20.js',
};

// Specific to galaxia board buttons
Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    if (board != null) {

        const playButtonAnimation = function (id, animation) {
            const button = board.querySelector("#" + id + '_on');
            if (button !== null) {
                button.style.transform = animation;
            }
        };

        const buttons = ['button_A', 'button_B', 'button_systeme'],
            up = 'translate(0px, 0px)',
            down = 'translate(0px, 7px)';
        for (let i = 0; i < buttons.length; i++) {
            const button = board.querySelector("#" + buttons[i]);
            if (button !== null) {
                button.addEventListener("mousedown", function () {
                    playButtonAnimation(this.id, down);
                });
                button.addEventListener("mouseup", function () {
                    playButtonAnimation(this.id, up);
                    if (this.id === 'button_systeme')
                        Simulator.replay();
                });
                button.addEventListener("touchstart", function () {
                    playButtonAnimation(this.id, down);
                });
                button.addEventListener("touchend", function () {
                    playButtonAnimation(this.id, up);
                    if (this.id === 'button_systeme')
                        Simulator.replay();
                });
            }
        }

        const touchButtons = ['P0', 'P1', 'P2', 'joystick_up', 'joystick_down', 'joystick_left', 'joystick_right'];
        for (let i = 0; i < touchButtons.length; i++) {
            const touchButton = board.querySelector("#" + touchButtons[i]);
            if (touchButton !== null) {
                touchButton.addEventListener("mousedown", function () {
                    this.classList.add('cls-1');
                });
                touchButton.addEventListener("mouseup", function () {
                    this.classList.remove('cls-1');
                });
                touchButton.addEventListener("touchstart", function () {
                    this.classList.add('cls-1');
                });
                touchButton.addEventListener("touchend", function () {
                    this.classList.remove('cls-1');
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
            const pins = Blockly.Constants.Pins.GALAXIA_PINS;
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
    "scd30-co2": /scd30_read\(0\)/gi,
    "scd30-temp": /scd30_read\(1\)/gi,
    "scd30-hum": /scd30_read\(2\)/gi,
    "hm330x": /(.|)HM330X\(/g,
    "bmp280-temp": /bmp280\.temperature\(\)/gi,
    "bmp280-press": /bmp280\.(pressure|altitude)\(\)/gi,
    "bmp280-alt": /bmp280\.(pressure|altitude)\(\)/gi,
    "si1145": /(.|)SI1145\(/gi,
    "vl53l0x": /(.|)VL53L0X\(/gi,
    "th02-hum": /(.|)TH02\(/gi,
    "th02-temp": /(.|)TH02\(/gi,
    "sht31-hum": /(.|)SHT31\(/gi,
    "sht31-temp": /(.|)SHT31\(/gi,

    // Pins on module - inputs
    "gps": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.IN, id="gps"/gi,
    // Pins on module - outputs
    "openlog": /Lecteur SD TX on p([0-9]{1,2})/gi,
    "RGBLed": /CHAINABLE_LED_COUNT_((A|D|)[0-9]{1,2})( |)=/gi,
    // "Buzzer": /(machine.|)Pin\(([0-9]{1,2}),( |)(mode=|)(machine.|)Pin.OUT, id="buzzer"/gi
};

Simulator.Mosaic.specific = {
    extract: (str, func) => str.split(func + '(')[1].split(',')[0].replace(')', ''),
    extractPin: {
        'write-digital': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
        'read-digital': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
        'write-analog': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
        'read-analog': (str) => str.includes('pinADC') ? str.split('pinADC(')[1].replace(')', '') : Simulator.Mosaic.specific.extract(str, 'Pin'),
        'pwm': (str) => Simulator.Mosaic.specific.extract(str, 'Pin'),
    },

    galaxiaUi: {
        shell: GALAXIA_SHELL_START,
        animateInterval: null,
        terminalMode: true,
        plotMode: false,
        graphicMode: false,
        yScale: 1,
        graph: {
            xmin: -10,
            xmax: 10,
            ymin: -6.56,
            ymax: 6.56,
        },
        init: function () {},
        reset: function () {},
        ctx: null,
        showError: function (error, exception, type) {
            UIManager.showErrorMessage("error-message", type + ": " + error);
            this.addLinesToScreen(type + ": " + exception);
            this.addEndOfExecution();
            this.clearScreen(false);
            Simulator.pause();
        },
        addLinesToScreen: function (text) {
            const galaxia_screen = document.getElementById('galaxia_screen-value');
            const tab_shell = galaxia_screen.innerHTML.split('<br>');

            const tab_new = this._getLinesToAdd(text);
            let tab_shell_new;
            if (tab_shell[tab_shell.length - 1] === "") {
                delete tab_shell[tab_shell.length - 1]
                tab_shell_new = tab_shell.concat(tab_new);
            } else {
                tab_shell_new = tab_shell.concat(tab_new);
            }
            if (tab_shell_new.length > 8) {
                galaxia_screen.innerHTML = tab_shell_new.slice(tab_shell_new.length - 8).join('<br>');
            } else {
                galaxia_screen.innerHTML = tab_shell_new.join('<br>');
            }
        },
        addEndOfExecution: function () {
            const galaxia_screen = document.getElementById('galaxia_screen-value');
            const tab_shell = galaxia_screen.innerHTML.split('<br>');
            if (tab_shell.length > 10) {
                galaxia_screen.innerHTML = tab_shell.slice(tab_shell.length - 10).join('<br>') + "<br>>>> <br>";
            } else {
                galaxia_screen.innerHTML += "<br>>>> <br>";
            }
        },
        _getLinesToAdd: function (text) {
            const LINE_LEN = 20;
            const text_lines = text.split('\n');
            let statck_new = [];
            for (var k = 0; k < text_lines.length; k++) {
                const item = text_lines[k];
                if (item.length > LINE_LEN) {
                    let n = Math.ceil(item.length / LINE_LEN);
                    for (var j = 0; j < Math.floor(n); j++) {
                        statck_new[j + k] = item.slice(j * LINE_LEN, (j + 1) * LINE_LEN);
                    }
                } else {
                    if (item.length != 0) {
                        statck_new.push(item);
                    }
                }
            }
            return statck_new;
        },

        initPlot: function(){
            const canvas = document.querySelector('.canvas-galaxia-screen');
            this.ctx = canvas.getContext('2d');
            this.ctx.fillStyle = '#000000';
            this.ctx.strokeStyle = 'black';
            this.ctx.fillRect(0, 0, 160, 128);
            this.ctx.save();
            this.plotMode = true;
            this.graphicMode = false;
        },

        initGraphic: function () {
            const canvas = document.querySelector('.canvas-galaxia-screen');
            this.ctx = canvas.getContext('2d');
            this.ctx.fillStyle = '#000000';
            this.ctx.strokeStyle = 'black';
            this.ctx.fillRect(0, 0, 160, 128);
            this.ctx.save();
            this.plotMode = false;
            this.graphicMode = true;
        },

        addPointToGraph: function (old_X, old_Y, x, y) {
            if (this.plotMode) {
                this.ctx.strokeStyle = 'white';
                this.ctx.beginPath();
                this.ctx.moveTo(old_X, old_Y);
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
            }
        },
        clearScreen: function () {
            this.graphicMode = false;
        },
    },
    logTable: {
        headers: [],
        rows: [],

        openLog: function () {
            const container = document.querySelector(".galaxia-log_module .module-img-group");
            const image = container.querySelector(".galaxia-log_base");
            const download = document.createElement('button');
            download.textContent = "Download";
            download.classList.add("button-download-log");
            download.addEventListener('click', function () {
                Simulator.Mosaic.specific.logTable.downloadCSV();
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
            hiddenElement.download = 'data.csv';
            hiddenElement.click();
        },
    },


    SERVER_REGEXP: /(import vitta_server|from vitta_server import (\*|SERVER))/,
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
                    $('#galaxia-gesture-' + g.replace(/ /g, '') + '_slider').slider('value', 0);
                }
            }
        },
        getCurrentGesture: function () {
            for (var i = 0; i < this.ACCELEROMETER_GESTURES.length; i++) {
                const g = this.ACCELEROMETER_GESTURES[i];
                const state = $('#galaxia-gesture-' + g.replace(/ /g, '') + '_slider').slider('option', 'value');
                if (state == 1) {
                    return g;
                }
            }
            return null;
        }
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

    buttons: {
        "a": 0,
        "b": 0,
        "up": 0,
        "down": 0,
        "left": 0,
        "right": 0,
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
        // dht slider

        // Grove sliders
        $('#colorSensor_slider_r,' +
            '#colorSensor_slider_g,' +
            '#colorSensor_slider_b').slider({
                min: 0,
                max: 255,
                value: 0
            });

        //galaxia sliders
        $('#galaxia-temp_slider').slider({
            min: 0,
            max: 100,
            value: 30
        });
        $('.mod_linky_PAPP,' + '.mod_linky_HCHC,' + '.mod_linky_HCHP').slider({
            min: 0,
            max: 2000,
            value: 500
        });


        $('#galaxia-light_slider,' +
            '#galaxia_slider').slider({
                min: 0,
                max: WRITE_ANALOG_MAX_VALUE,
                value: 55
            });
        $('#galaxia-compassMag_slider_x').slider({
            min: -6000,
            max: 60000,
            value: 15000
        });
        $('#galaxia-compassMag_slider_y').slider({
            min: -66000,
            max: 33000,
            value: 3000
        });
        $('#galaxia-compassMag_slider_z').slider({
            min: -93000,
            max: 5200,
            value: -8000
        });
        $('#galaxia-compassMag_slider_strength').slider({
            min: 0,
            max: 12,
        });
        $('#galaxia-compassDir_slider').slider({
            min: 0,
            max: 360,
            value: 90
        });
        $('#galaxia-accelerometer_slider_x,' +
            '#galaxia-accelerometer_slider_y,' +
            '#galaxia-accelerometer_slider_z').slider({
                min: -2000,
                max: 2000,
                value: 0
            });
        $('#galaxia-accelerometer-pitch_slider,' +
            '#galaxia-accelerometer-roll_slider').slider({
                min: -90,
                max: 90,
                value: 0
            });
        $('#galaxia-button-a_slider,' +
            '#galaxia-button-b_slider,' +
            '#galaxia-pad-up_slider,' +
            '#galaxia-pad-down_slider,' +
            '#galaxia-pad-left_slider,' +
            '#galaxia-pad-right_slider,' +
            '#galaxia-gesture-shake_slider,' +
            '#galaxia-gesture-shake_slider,' +
            '#galaxia-gesture-up_slider,' +
            '#galaxia-gesture-down_slider,' +
            '#galaxia-gesture-left_slider,' +
            '#galaxia-gesture-right_slider,' +
            '#galaxia-gesture-faceup_slider,' +
            '#galaxia-gesture-facedown_slider,' +
            '#galaxia-gesture-freefall_slider,' +
            '#galaxia-gesture-3g_slider,' +
            '#galaxia-gesture-6g_slider,' +
            '#galaxia-gesture-8g_slider').slider({
                min: 0,
                max: 1,
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
        /* Galaxia modules */
        /* Microbit modules */
        {
            regex: /led\.(set_colors|set_red|set_blue|set_green)/g,
            id: "RGBLed",
            title: "LED RGB",
            pin: 'Galaxia',
            pins: 'digital',
            type: 'output',
            value: [0, 0, 0],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                const [r, g, b] = Animator.value;
                $(Animator.animId).css('background', "rgb(" + r + "," + g + "," + b + ")");
            }
        },
        {
            regex: /led\.read_light_level\(\)/g,
            id: "galaxia-light",
            title: "Capteur de luminosité",
            pin: 'Galaxia',
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
                Animator.opacity(0, WRITE_ANALOG_MAX_VALUE);
            }
        },
        {
            regex: /temperature\(\)/,
            id: "galaxia-temp",
            title: "Capteur de température",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: 30,
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
            // regex: /linky\.get_data\(/,
            id: "linky",
            title: "Capteur linky",
            pin: 'pin n°',
            pins: 'analog',
            type: 'input',
            codeFlag: 'Linky',
            listeners: [{
                default: 500,
                unit: 'Wh',
                color: "#f8a10f",
                suffix: "_PAPP",
                title: "PAPP"
            },
            {
                default: 500,
                unit: 'Wh',
                color: "#f8a10f",
                suffix: "_HCHC",
                title: "HCHC"
            },
            {
                default: 500,
                unit: 'Wh',
                color: "#f8a10f",
                suffix: "_HCHP",
                title: "HCHP"
            }
            ],
            class: 'gauge',
            picture: "Relais.png",
            pictureAnimation: "Relais-animation.png",
            animate: function (Animator) {
                Animator.gauge();
                $(Animator.animId).css({ "z-index": 100, "height": "27px", "width": "13px", "margin-top": "11px", "margin-left": "2px" });
            }
        },
        {
            regex: /accelerometer\.get_[xyz]\(\)/,
            id: "galaxia-accelerometer",
            title: "Accéléromètre : ",
            pin: 'Galaxia',
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
                    "x": parseInt($("#galaxia-accelerometer_slider_x").slider('option', 'value')),
                    "y": parseInt($("#galaxia-accelerometer_slider_y").slider('option', 'value')),
                    "z": parseInt($("#galaxia-accelerometer_slider_z").slider('option', 'value'))
                };
                const pitch = Math.atan2(values["y"], -values["z"]) * 180 / Math.PI;
                $("#galaxia-accelerometer-pitch_value").html(roundFloat(pitch, 1) + " °");
                $("#galaxia-accelerometer-pitch_anim").css('transform', "rotateX(-60deg) rotateZ(-15deg) rotate3d(1, 0, 0, " + -pitch + "deg)");
                // const roll = Math.atan2(values["x"], Math.sqrt(values["y"] ** 2 + values["z"] ** 2)) * 180 / Math.PI;
                const roll = Math.atan2(values["x"], -values["y"]) * 180 / Math.PI;
                $("#galaxia-accelerometer-roll_value").html(roundFloat(roll, 1) + " °");
                $("#galaxia-accelerometer-roll_anim").css('transform', "rotateX(-60deg) rotateZ(-15deg) rotate3d(0, 1, 0, " + -roll + "deg)");
            }
        },
        {
            regex: /accelerometer\.get_[yz]\(\)/,
            id: "galaxia-accelerometer-pitch",
            title: "Accéleromètre - Tangage",
            pin: 'Galaxia',
            type: 'output',
            value: "0 °",
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png"
        },
        {
            regex: /accelerometer\.get_[xyz]\(\)/,
            id: "galaxia-accelerometer-roll",
            title: "Accéleromètre - Roulis",
            pin: 'Galaxia',
            type: 'output',
            value: "0 °",
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
        },
        {
            regex: /compass\.heading\(\)/,
            id: "galaxia-compassDir",
            title: "Boussole",
            pin: 'Galaxia',
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
            regex: /compass\.get_x\(\)/,
            id: "galaxia-compassMag",
            title: "Boussole : ",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                suffix: "_x",
                default: 15000,
                unit: 'µT',
                color: "#ff4d6a",
                title: "Champ Mag. x"
            }
            ],
            picture: "Champ-magnetique.png",
            animate: function (Animator) {
                $(Animator.valueId).text(roundFloat(Animator.value / 1000, 1)); // convert nT in µT
            }
        },
        {
            regex: /compass\.get_y\(\)/,
            id: "galaxia-compassMag",
            title: "Boussole : ",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                suffix: "_y",
                default: 3000,
                unit: 'µT',
                color: "#f9d142",
                title: "Champ Mag. y"
            }
            ],
            picture: "Champ-magnetique.png",
            animate: function (Animator) {
                $(Animator.valueId).text(roundFloat(Animator.value / 1000, 1)); // convert nT in µT
            }
        },
        {
            regex: /compass\.get_z\(\)/,
            id: "galaxia-compassMag",
            title: "Boussole : ",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
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
            regex: /button_a.(is|was)_pressed/,
            id: "galaxia-button-a",
            title: "Bouton A",
            pin: 'Galaxia',
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
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.buttons["a"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /button_b.(is|was)_pressed/,
            id: "galaxia-button-b",
            title: "Bouton B",
            pin: 'Galaxia',
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
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.buttons["b"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /touch_n.(is|was)_touch/,
            id: "galaxia-pad-up",
            title: "Touche HAUT",
            pin: 'Galaxia',
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
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.buttons["up"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /touch_s.(is|was)_touch/,
            id: "galaxia-pad-down",
            title: "Touche BAS",
            pin: 'Galaxia',
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
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.buttons["down"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /touch_e.(is|was)_touch/,
            id: "galaxia-pad-right",
            title: "Touche DROITE",
            pin: 'Galaxia',
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
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.buttons["right"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /touch_w.(is|was)_touch/,
            id: "galaxia-pad-left",
            title: "Touche GAUCHE",
            pin: 'Galaxia',
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
                if (Animator.value === 1) {
                    Simulator.Mosaic.specific.buttons["left"] = 1;
                }
                Animator.button();
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]shake['"]/,
            id: "galaxia-gesture-shake",
            title: "Secouer",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "shake",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-shake_value").html("ON");
                    $("#galaxia-gesture-shake_anim").addClass('galaxia-gesture-shake_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('shake');
                } else {
                    $("#galaxia-gesture-shake_value").html("OFF");
                    $("#galaxia-gesture-shake_anim").removeClass('galaxia-gesture-shake_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]up['"]/,
            id: "galaxia-gesture-up",
            title: "Logo vers le haut",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "logo en haut",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-up_value").html("ON");
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('up');
                } else {
                    $("#galaxia-gesture-up_value").html("OFF");
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]down['"]/,
            id: "galaxia-gesture-down",
            title: "Logo vers le bas",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                title: "logo en bas",
                color: "#1a6da8",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-down_value").html("ON");
                    $("#galaxia-gesture-down_anim").addClass('galaxia-gesture-down_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('down');
                } else {
                    $("#galaxia-gesture-down_value").html("OFF");
                    $("#galaxia-gesture-down_anim").removeClass('galaxia-gesture-down_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]face up['"]/,
            id: "galaxia-gesture-faceup",
            title: "Écran vers le haut",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "écran en haut",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-faceup_value").html("ON");
                    $("#galaxia-gesture-faceup_anim").addClass('galaxia-gesture-faceup_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('face up');
                } else {
                    $("#galaxia-gesture-faceup_value").html("OFF");
                    $("#galaxia-gesture-faceup_anim").removeClass('galaxia-gesture-faceup_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]face down['"]/,
            id: "galaxia-gesture-facedown",
            title: "Écran vers le bas",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "écran en bas",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-facedown_value").html("ON");
                    $("#galaxia-gesture-facedown_anim").addClass('galaxia-gesture-facedown_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('face down');
                } else {
                    $("#galaxia-gesture-facedown_value").html("OFF");
                    $("#galaxia-gesture-facedown_anim").removeClass('galaxia-gesture-facedown_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]left['"]/,
            id: "galaxia-gesture-left",
            title: "Tourner à gauche",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "pencher à gauche",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-left_value").html("ON");
                    $("#galaxia-gesture-left_anim").addClass('galaxia-gesture-left_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('left');
                } else {
                    $("#galaxia-gesture-left_value").html("OFF");
                    $("#galaxia-gesture-left_anim").removeClass('galaxia-gesture-left_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]right['"]/,
            id: "galaxia-gesture-right",
            title: "Tourner à droite",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "pencher à droite",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-right_value").html("ON");
                    $("#galaxia-gesture-right_anim").addClass('galaxia-gesture-right_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('right');
                } else {
                    $("#galaxia-gesture-right_value").html("OFF");
                    $("#galaxia-gesture-right_anim").removeClass('galaxia-gesture-right_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]freefall['"]/,
            id: "galaxia-gesture-freefall",
            title: "Chute libre",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "chute libre",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-freefall_value").html("ON");
                    $("#galaxia-gesture-freefall_anim").addClass('galaxia-gesture-freefall_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('freefall');
                } else {
                    $("#galaxia-gesture-freefall_value").html("OFF");
                    $("#galaxia-gesture-freefall_anim").removeClass('galaxia-gesture-freefall_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]3g['"]/,
            id: "galaxia-gesture-3g",
            title: "3g",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "3g",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-3g_value").html("ON");
                    $("#galaxia-gesture-3g_anim").addClass('galaxia-gesture-3g_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('3g');
                } else {
                    $("#galaxia-gesture-3g_value").html("OFF");
                    $("#galaxia-gesture-3g_anim").removeClass('galaxia-gesture-3g_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]6g['"]/,
            id: "galaxia-gesture-6g",
            title: "6g",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "6g",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-6g_value").html("ON");
                    $("#galaxia-gesture-6g_anim").addClass('galaxia-gesture-6g_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('6g');
                } else {
                    $("#galaxia-gesture-6g_value").html("OFF");
                    $("#galaxia-gesture-6g_anim").removeClass('galaxia-gesture-6g_active');
                }
            }
        },
        {
            regex: /accelerometer\.current_gesture\(\)( ){0,2}==( ){0,2}['"]8g['"]/,
            id: "galaxia-gesture-8g",
            title: "8g",
            pin: 'Galaxia',
            type: 'input',
            listeners: [{
                default: "OFF",
                unit: '',
                color: "#1a6da8",
                title: "8g",
                suffix: ""
            }],
            picture: "Transparent.png",
            pictureAnimation: "galaxia_board.png",
            animate: function (Animator) {
                if (Animator.value == 1) {
                    $("#galaxia-gesture-8g_value").html("ON");
                    $("#galaxia-gesture-8g_anim").addClass('galaxia-gesture-8g_active');
                    Simulator.Mosaic.specific.gesture.resetOtherGestures('8g');
                } else {
                    $("#galaxia-gesture-8g_value").html("OFF");
                    $("#galaxia-gesture-8g_anim").removeClass('galaxia-gesture-8g_active');
                }
            }
        },
        {
            regex: /microphone.(current_sound|was_sound|sound_level)\(/gi,
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
                $(Animator.animId).css('opacity', Animator.value / WRITE_ANALOG_MAX_VALUE);
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
            regex: /log\.(delete|add|set_columns)\(/g,
            id: "galaxia-log",
            title: "Log",
            pin: 'Galaxia',
            type: 'output',
            value: "",
            picture: "Log.png",
            pictureAnimation: "Log-animation.png",
            animate: function (Animator) {
            }
        },
    ]
}