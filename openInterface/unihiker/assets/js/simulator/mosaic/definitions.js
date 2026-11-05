// Simulator of the UNIHIKER M10: board image with its screen (canvas 240 x 320 of the unihiker GUI), buttons A and B,
// LED (P25), buzzer, sensors of the board (sliders) and modules on the pins.

Simulator.Mosaic.BOARD_HEADER =
    `<object id="board-viewer" type="image/svg+xml" role="img" aria-labelledby="title-board"></object>
<canvas class="canvas-unihiker-screen${IS_UNIHIKER_K10 ? ' canvas-unihiker-k10' : ''}" width="240" height="320"></canvas>`;

Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin) => ({ name: 'P' + pin, id: pin });

Simulator.Mosaic.externalLibraries = {
    'src/lib/time.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    'src/lib/threading.js': Simulator.PATH_LIB + 'threading.js',
    'src/lib/unihiker.js': Simulator.PATH_LIB + 'unihiker.js',
    'src/lib/pinpong/__init__.js': Simulator.PATH_LIB + 'pinpong/__init__.js',
    'src/lib/pinpong/board.js': Simulator.PATH_LIB + 'pinpong/board.js',
    'src/lib/pinpong/extension/__init__.js': Simulator.PATH_LIB + 'pinpong/extension/__init__.js',
    'src/lib/pinpong/extension/unihiker.js': Simulator.PATH_LIB + 'pinpong/extension/unihiker.js',
    // UNIHIKER K10 (MicroPython)
    'src/lib/unihiker_k10.js': Simulator.PATH_LIB + 'unihiker_k10.js',
    'src/lib/machine.js': Simulator.PATH_LIB + 'machine.js',
    'src/lib/select.js': Simulator.PATH_LIB + 'select.js',
    'src/lib/vitta_ai.py': Simulator.PATH_LIB + 'vitta_ai.py',
    'src/lib/PIL/__init__.py': Simulator.PATH_LIB + 'PIL/__init__.py',
    'src/lib/PIL/Image.py': Simulator.PATH_LIB + 'PIL/Image.py',
    'src/lib/ai.py': Simulator.PATH_LIB + 'k10_board.py',
    'src/lib/k10_base.py': Simulator.PATH_LIB + 'k10_board.py',
    'src/lib/neopixel.js': Simulator.PATH_LIB_COMMON + 'micropython/neopixel.js',
    // libraries of the modules (sent to the board, PinPong drivers): simulated libraries reading the modules of the
    // mosaic (src/modules), simulated libraries of the ESP32, else a library without module (values 0)
    'src/lib/unihiker_sim.js': Simulator.PATH_LIB + 'unihiker_sim.js',
    'src/lib/module_libraries.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/esp32_bme280.py': Simulator.PATH_LIB + 'modules/esp32_bme280.py',
    'src/lib/esp32_bmp280.py': Simulator.PATH_LIB + 'modules/esp32_bmp280.py',
    'src/lib/esp32_colorSensor.py': Simulator.PATH_LIB + 'modules/esp32_colorSensor.py',
    'src/lib/esp32_ds1307.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/esp32_paj7620.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/esp32_pca9685.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/esp32_pcf85063tp.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/esp32_sht31.py': Simulator.PATH_LIB + 'modules/esp32_sht31.py',
    'src/lib/esp32_ssd1306.py': Simulator.PATH_LIB + 'modules/esp32_ssd1306.py',
    'src/lib/sim_esp32_ssd1306.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_ssd1306.js',
    'src/lib/pinpong/libs/__init__.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/pinpong/libs/dfrobot_bme280.py': Simulator.PATH_LIB + 'modules/dfrobot_bme280.py',
    'src/lib/pinpong/libs/dfrobot_bmp280.py': Simulator.PATH_LIB + 'modules/dfrobot_bmp280.py',
    'src/lib/pinpong/libs/dfrobot_ds1307.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/pinpong/libs/dfrobot_paj7620u2.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/pinpong/libs/dfrobot_sht31.py': Simulator.PATH_LIB + 'modules/dfrobot_sht31.py',
    'src/lib/pinpong/libs/dfrobot_ssd1306.py': Simulator.PATH_LIB + 'modules/dfrobot_ssd1306.py',
    'src/lib/pinpong/libs/dfrobot_tcs34725.py': Simulator.PATH_LIB + 'modules/dfrobot_tcs34725.py',
    'src/lib/pinpong/libs/dfrobot_vl53l0.py': Simulator.PATH_LIB + 'modules/dfrobot_vl53l0.py',
    'src/lib/pinpong/libs/lcd1602.py': Simulator.PATH_LIB + 'modules/lcd1602.py',
    'src/lib/pinpong/libs/microbit_motor.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/stm32_vl53l0x.py': Simulator.PATH_LIB + 'modules/stm32_vl53l0x.py',
    'src/lib/unihiker_dfr0548.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_fingerprint.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_gas.py': Simulator.PATH_LIB + 'modules/unihiker_gas.py',
    'src/lib/unihiker_gas_gmxxx.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_hm330x.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_hm330x.js',
    'src/lib/unihiker_hp206c.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_ht16k33.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_ht16k33matrix.js': Simulator.PATH_LIB_COMMON + 'esp32/HT16K33/ht16k33matrix.js',
    'src/lib/unihiker_lcd_i2c.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_lcd_i2c.js',
    'src/lib/unihiker_mfrc522.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_my9221.py': Simulator.PATH_LIB + 'modules/unihiker_my9221.py',
    'src/lib/unihiker_pcf85063tp.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_rekabit.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_rfid_reader.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_rgb_led_matrix.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_scd30.py': Simulator.PATH_LIB + 'modules/unihiker_scd30.py',
    'src/lib/unihiker_sgp30.py': Simulator.PATH_LIB + 'modules/unihiker_sgp30.py',
    'src/lib/unihiker_si1145.py': Simulator.PATH_LIB + 'modules/unihiker_si1145.py',
    'src/lib/unihiker_si1151.py': Simulator.PATH_LIB + 'modules/unihiker_si1145.py',
    'src/lib/unihiker_stepper.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_th02.py': Simulator.PATH_LIB + 'modules/unihiker_th02.py',
    'src/lib/unihiker_tm1637.py': Simulator.PATH_LIB + 'modules/unihiker_tm1637.py',
    'src/lib/unihiker_veml6040.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/unihiker_water_level.py': Simulator.PATH_LIB + 'module_libraries.py',
    'src/lib/esp32_tm1637.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_tm1637.js',
    'src/lib/esp32_my9221.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_my9221.js',
    'src/lib/esp32_lcd_i2c.js': Simulator.PATH_LIB_COMMON + 'esp32/grove/esp32_lcd_i2c.js',
    'src/lib/ht16k33.js': Simulator.PATH_LIB_COMMON + 'esp32/HT16K33/ht16k33.js',
};

// Buttons A and B of the board image (state and GUI events), touch buttons of the screen
Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById('board-viewer').contentDocument;
    const unihikerBoard = Simulator.Mosaic.specific.unihikerBoard;
    for (const name of ['a', 'b']) {
        const button = board && board.getElementById('button_' + name.toUpperCase());
        if (!button) continue;
        const press = function (event) {
            event.preventDefault();
            unihikerBoard.buttons[name] = true;
            button.style.fill = '#5d6168';
            unihikerBoard.call(unihikerBoard.onClick[name]);
        };
        const release = function () {
            unihikerBoard.buttons[name] = false;
            button.style.fill = '';
        };
        button.addEventListener('mousedown', press);
        button.addEventListener('touchstart', press);
        button.addEventListener('mouseup', release);
        button.addEventListener('mouseleave', release);
        button.addEventListener('touchend', release);
    }
    const canvas = document.querySelector('.canvas-unihiker-screen');
    if (canvas) {
        canvas.addEventListener('click', function (event) {
            const rect = canvas.getBoundingClientRect();
            Simulator.Mosaic.specific.unihikerScreen.touch((event.clientX - rect.left) * 240 / rect.width, (event.clientY - rect.top) * 320 / rect.height);
        });
    }
};

Simulator.Mosaic.addSpecificSkulptFunctions = function () { };

// Pins used by the program: pin(Pin.P21, Pin.ANALOG)... (blocks of the interface), Pin(Pin.P21, Pin.ANALOG) in code.
// P25 is the LED of the board.
Simulator.Mosaic.groveRegex = {
    "read-digital": /(pin|Pin)\(Pin\.P([0-9]{1,2}), Pin\.IN\)|k10_pin\(([0-9]{1,2})\)\.read_digital/g,
    "read-analog": /(pin|Pin)\(Pin\.P([0-9]{1,2}), Pin\.ANALOG\)|k10_pin\(([0-9]{1,2})\)\.read_analog/g,
    "write-digital": /(pin|Pin)\(Pin\.P(?!25\b)([0-9]{1,2}), Pin\.OUT\)|k10_pin\(([0-9]{1,2})\)\.write_digital/g,
    "pwm": /(pin|Pin)\(Pin\.P([0-9]{1,2}), Pin\.PWM\)|k10_pin\(([0-9]{1,2})\)\.write_analog/g,
    // modules of the shared catalogue (groveModules.js), code of the M10 (PinPong) and of the K10 (MicroPython)
    // I2C modules
    "lcdGrove": /LCD1602(_I2C)?\(/g,
    "oled": /SSD1306_I2C\(/g,
    "LEDMatrix": /HT16K33Matrix\(/g,
    "RGBLEDMatrix": /GroveTwoRGBLedMatrix\(/g,
    "sgp30": /SGP30\(/g,
    "multichannel": /\bGAS\(/g,
    "scd30-co2": /scd30_read\(0\)/g,
    "scd30-temp": /scd30_read\(1\)/g,
    "scd30-hum": /scd30_read\(2\)/g,
    "hm330x": /HM330X\(/g,
    "bmp280-temp": /bmp280\.(temp_c|temperature)\(\)/g,
    "bmp280-press": /bmp280\.(pressure_p|pressure|altitude)\(\)/g,
    "bmp280-alt": /bmp280\.(pressure_p|pressure|altitude)\(\)/g,
    "bme280-temp": /bme280\.(temp_c\(\)|temperature\b)/g,
    "bme280-hum": /bme280\.humidity\b/g,
    "bme280-press": /bme280\.(press_pa\(\)|pressure\b)/g,
    "bme280-alt": /bme280\.(cal_altitudu|altitude)\(\)/g,
    "sht31-temp": /SHT31\(/g,
    "sht31-hum": /SHT31\(/g,
    "th02-temp": /TH02\(/g,
    "th02-hum": /TH02\(/g,
    "si1145": /SI1145\(/g,
    "colorSensor": /TCS34725\(/g,
    "vl53l0x": /VL53L0X?\(/g,
    // modules of a pin (the first number of the code found is the pin)
    "dht11-temp": /dht11\(Pin\.P[0-9]{1,2}\)\.temp_c|dht_read\([0-9]{1,2}, 0\)/g,
    "dht11-hum": /dht11\(Pin\.P[0-9]{1,2}\)\.humidity|dht_read\([0-9]{1,2}, 1\)/g,
    "ultrasonic": /getUltrasonicData\((Pin\.P)?[0-9]{1,2}/g,
    "servo": /servo\(Pin\.P[0-9]{1,2}\)\.write_angle|servo_angle\([0-9]{1,2}, (?!90 \+)/g,
    "continuousServo": /setServoSpeed\(Pin\.P[0-9]{1,2}|servo_angle\([0-9]{1,2}, 90 \+/g,
    "neopixel": /neopixel\(Pin\.P[0-9]{1,2}, [0-9]+\)|neopixel_strip\([0-9]{1,2}, [0-9]+\)/g,
    "tm1637": /TM1637\(clk=(Pin\.P)?[0-9]{1,2}/g,
    "ledBar": /MY9221\(di=(Pin\.P)?[0-9]{1,2}/g,
    "stepper-motor": /StepperMotor\((Pin\.P)?[0-9]{1,2}/g,
};

// pin of the modules of a pin: number after "Pin.P", "(" or "=" (dht11(Pin.P1), dht_read(1, 0), TM1637(clk=0)...), not the
// first number of the code (dht11, TM1637)
for (const id of ['dht11-temp', 'dht11-hum', 'ultrasonic', 'servo', 'continuousServo', 'neopixel', 'tm1637', 'ledBar', 'stepper-motor']) {
    const definition = Simulator.Mosaic.grove?.definitions.find(definition => definition.id === id);
    if (definition) definition.extractPin = (str) => str.match(/(?:Pin\.P|[(=])([0-9]{1,2})/)[1];
}

Simulator.Mosaic.specific = {
    // continuous servomotor (groveModules.js): speed in % from the angle (90 degrees: stop)
    calculs: {
        getServoSpeed: (angle) => angle == 90 ? 0 : (angle / 90 - 1) * 100,
    },

    // Pin.P0 (PinPong, M10) or k10_pin(0) (K10)
    extractPin: {
        'read-digital': (str) => str.match(/Pin\.P([0-9]{1,2})|k10_pin\(([0-9]{1,2})\)/).slice(1).find(Boolean),
        'read-analog': (str) => str.match(/Pin\.P([0-9]{1,2})|k10_pin\(([0-9]{1,2})\)/).slice(1).find(Boolean),
        'write-digital': (str) => str.match(/Pin\.P([0-9]{1,2})|k10_pin\(([0-9]{1,2})\)/).slice(1).find(Boolean),
        'pwm': (str) => str.match(/Pin\.P([0-9]{1,2})|k10_pin\(([0-9]{1,2})\)/).slice(1).find(Boolean),
    },

    // Screen of the board: objects of the unihiker GUI, drawn again at each change
    unihikerScreen: {
        objects: [],
        start: function () {
            this.objects = [];
            const canvas = document.querySelector('.canvas-unihiker-screen');
            if (canvas) canvas.style.display = 'block';
            this.draw();
        },
        add: function (shape) {
            this.objects.push(shape);
            this.draw();
            return shape;
        },
        remove: function (shape) {
            this.objects = this.objects.filter(object => object !== shape);
            this.draw();
        },
        clear: function () {
            this.objects = [];
            this.draw();
        },
        colour: function (value, fallback) {
            if (Array.isArray(value)) return 'rgb(' + value.join(',') + ')';
            return value === undefined || value === null ? fallback : String(value);
        },
        // position of the top left corner of a box of the given size, from its origin (top_left, center, bottom_right...)
        corner: function (shape, w, h, origin) {
            origin = origin || 'top_left';
            let x = shape.x || 0, y = shape.y || 0;
            if (/center|^top$|^bottom$/.test(origin) && !/left|right/.test(origin)) x -= w / 2;
            if (/right/.test(origin)) x -= w;
            if (/center|^left$|^right$/.test(origin) && !/top|bottom/.test(origin)) y -= h / 2;
            if (/bottom/.test(origin)) y -= h;
            return [x, y];
        },
        draw: function () {
            const canvas = document.querySelector('.canvas-unihiker-screen');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 240, 320);
            for (const shape of this.objects) {
                ctx.save();
                this.drawShape(ctx, shape);
                ctx.restore();
            }
        },
        drawShape: function (ctx, shape) {
            const color = this.colour(shape.color, '#000000');
            ctx.fillStyle = this.colour(shape.fill, color);
            ctx.strokeStyle = color;
            ctx.lineWidth = shape.width || 1;
            switch (shape.type) {
                case 'draw_text':
                case 'draw_digit': {
                    const size = shape.font_size || 14;
                    ctx.font = size + 'px sans-serif';
                    ctx.fillStyle = color;
                    ctx.textBaseline = 'top';
                    const lines = String(shape.text === undefined ? '' : shape.text).split('\n');
                    const w = Math.max(...lines.map(line => ctx.measureText(line).width));
                    const [x, y] = this.corner(shape, w, lines.length * size * 1.2, shape.origin);
                    lines.forEach((line, i) => ctx.fillText(line, x, y + i * size * 1.2));
                    break;
                }
                case 'draw_rect':
                case 'fill_rect':
                case 'draw_round_rect':
                case 'fill_round_rect': {
                    const [x, y] = this.corner(shape, shape.w || 0, shape.h || 0, shape.origin);
                    ctx.beginPath();
                    ctx.roundRect(x, y, shape.w || 0, shape.h || 0, /round/.test(shape.type) ? (shape.r || 0) : 0);
                    shape.type.startsWith('fill') ? ctx.fill() : ctx.stroke();
                    break;
                }
                case 'draw_circle':
                case 'fill_circle':
                case 'draw_point':
                    ctx.beginPath();
                    ctx.arc(shape.x || 0, shape.y || 0, shape.type === 'draw_point' ? 1 : (shape.r || 0), 0, 2 * Math.PI);
                    shape.type === 'draw_circle' ? ctx.stroke() : (ctx.fillStyle = shape.type === 'draw_point' ? color : ctx.fillStyle, ctx.fill());
                    break;
                case 'draw_line':
                    ctx.beginPath();
                    ctx.moveTo(shape.x0 || 0, shape.y0 || 0);
                    ctx.lineTo(shape.x1 || 0, shape.y1 || 0);
                    ctx.stroke();
                    break;
                case 'draw_qr_code': {
                    // look of a QR code: pattern made from the text (not readable)
                    const size = shape.w || 100, cells = 21, cell = size / cells;
                    const [x, y] = this.corner(shape, size, size, shape.origin);
                    let hash = 0;
                    for (const char of String(shape.text || '')) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(x, y, size, size);
                    ctx.fillStyle = '#000000';
                    for (let i = 0; i < cells; i++) {
                        for (let j = 0; j < cells; j++) {
                            const finder = [[0, 0], [14, 0], [0, 14]].some(([fi, fj]) => i >= fi && i < fi + 7 && j >= fj && j < fj + 7);
                            const ring = finder && [[0, 0], [14, 0], [0, 14]].some(([fi, fj]) => (i - fi === 0 || i - fi === 6 || j - fj === 0 || j - fj === 6 || (i - fi >= 2 && i - fi <= 4 && j - fj >= 2 && j - fj <= 4)) && i >= fi && i < fi + 7 && j >= fj && j < fj + 7);
                            hash = (hash * 1103515245 + 12345) >>> 0;
                            if (finder ? ring : (hash >> 16) % 2) ctx.fillRect(x + i * cell, y + j * cell, cell, cell);
                        }
                    }
                    break;
                }
                case 'add_button': {
                    const w = shape.w || 100, h = shape.h || 40;
                    const [x, y] = this.corner(shape, w, h, shape.origin);
                    ctx.fillStyle = shape.pressed ? '#c9ccd4' : '#e8e9ec';
                    ctx.strokeStyle = '#8a8f99';
                    ctx.beginPath();
                    ctx.roundRect(x, y, w, h, 6);
                    ctx.fill();
                    ctx.stroke();
                    ctx.fillStyle = '#000000';
                    ctx.font = '14px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(String(shape.text || ''), x + w / 2, y + h / 2);
                    break;
                }
            }
        },
        // touch of the screen: touch buttons, then objects with onclick
        touch: function (px, py) {
            for (const shape of [...this.objects].reverse()) {
                if (!shape.onclick) continue;
                const w = shape.w || (shape.type === 'add_button' ? 100 : 0), h = shape.h || (shape.type === 'add_button' ? 40 : 0);
                const [x, y] = this.corner(shape, w, h, shape.origin);
                if (px >= x && px <= x + w && py >= y && py <= y + h) {
                    shape.pressed = true;
                    this.draw();
                    setTimeout(() => { shape.pressed = false; this.draw(); }, 150);
                    Simulator.Mosaic.specific.unihikerBoard.call(shape.onclick);
                    return;
                }
            }
        },
    },

    // Buttons A and B, LED and events of the board
    unihikerBoard: {
        buttons: { a: false, b: false },
        onClick: { a: null, b: null },
        // a Python function called by an event runs like a thread of the program
        call: function (callback) {
            if (!callback || Simulator.isStopped) return;
            Sk.misceval.callsimAsync({ "Sk.debug": Simulator.doStep }, callback).catch(Simulator.handleError);
        },
        setLed: function (value) {
            const board = document.getElementById('board-viewer')?.contentDocument;
            const led = board && board.getElementById('led');
            if (led) {
                led.style.fill = value ? '#3fa9f5' : '';
                led.style.filter = value ? 'drop-shadow(0 0 6px #3fa9f5)' : '';
            }
        },
    },

    // Buzzer of the board (Web Audio): notes of a duration in s, looped or not
    unihikerBuzzer: {
        audio: null,
        oscillator: null,
        timer: null,
        play: function (frequencies, duration, loop = false) {
            this.stop();
            this.audio = this.audio || new (window.AudioContext || window.webkitAudioContext)();
            if (this.audio.state === 'suspended') this.audio.resume();
            const gain = this.audio.createGain();
            gain.gain.value = 0.1;
            gain.connect(this.audio.destination);
            this.oscillator = this.audio.createOscillator();
            this.oscillator.type = 'square';
            this.oscillator.connect(gain);
            let index = 0;
            const next = () => {
                if (index >= frequencies.length) {
                    if (!loop) return this.stop();
                    index = 0;
                }
                this.oscillator.frequency.value = frequencies[index++];
                this.timer = setTimeout(next, duration * 1000);
            };
            this.oscillator.start();
            next();
        },
        stop: function () {
            clearTimeout(this.timer);
            if (this.oscillator) {
                try {
                    this.oscillator.stop();
                } catch (e) { }
                this.oscillator = null;
            }
        },
    },

    // end of the program: buzzer, LED and buttons
    onStop: function () {
        this.unihikerBuzzer.stop();
        this.unihikerBoard.setLed(0);
        if (this.k10Leds) this.k10Leds.clear();
        this.unihikerBoard.onClick = { a: null, b: null };
    },

    createSliders: function () {
        $('#unihiker-light_slider').slider({ min: 0, max: 4095, value: 2000 });
        $('#unihiker-sound_slider').slider({ min: 0, max: 100, value: 20 });
        $('#unihiker-accelerometer_slider_x, #unihiker-accelerometer_slider_y').slider({ min: -2000, max: 2000, value: 0 });
        $('#unihiker-accelerometer_slider_z').slider({ min: -2000, max: 2000, value: -1000 });
        $('#unihiker-gyroscope_slider_x, #unihiker-gyroscope_slider_y, #unihiker-gyroscope_slider_z').slider({ min: -500, max: 500, value: 0 });
        $('#unihiker-climate_slider_temp').slider({ min: -20, max: 60, value: 22 });
        $('#unihiker-climate_slider_hum').slider({ min: 0, max: 100, value: 50 });
        // modules of the catalogue without slider settings in groveModules.js (as the other interfaces)
        $('#vl53l0x_slider').slider({ min: 50, max: 8200, value: 500 });
    },

    definitions: [
        {
            regex: /light\.read(_and_average|)\(/g,
            id: "unihiker-light",
            title: "Luminosité",
            pin: 'UNIHIKER',
            type: 'input',
            listeners: [{ default: 2000, unit: '', color: "#f9d142", suffix: "" }],
            class: 'light',
            picture: "Luminosité.png",
            pictureAnimation: "Luminosité-animation.png",
            animate: function (Animator) {
                Animator.opacity(0, 4095);
            }
        },
        {
            regex: /accelerometer\.get_|acce\.read_/g,
            id: "unihiker-accelerometer",
            title: "Accéléromètre (mg) : ",
            pin: 'UNIHIKER',
            type: 'input',
            listeners: [
                { suffix: "_x", default: 0, unit: 'mg', color: "#ff4d6a", title: "Axe x" },
                { suffix: "_y", default: 0, unit: 'mg', color: "#f9d142", title: "Axe y" },
                { suffix: "_z", default: -1000, unit: 'mg', color: "#1a6da8", title: "Axe z" }
            ],
            picture: "Accelérateur.svg",
            pictureAnimation: "Accelérateur-animation.png",
            animate: function (Animator) {
                Animator.rotate(-2000, 2000);
            }
        },
        {
            regex: /temp_humi\.read_/g,
            id: "unihiker-climate",
            title: "Température et humidité : ",
            pin: 'UNIHIKER',
            type: 'input',
            listeners: [
                { suffix: "_temp", default: 22, unit: '°C', color: "#ff4d6a", title: "Température" },
                { suffix: "_hum", default: 50, unit: '%', color: "#1a6da8", title: "Humidité" }
            ],
            picture: "Humidité.png",
            pictureAnimation: "Humidité-animation.png",
            animate: function (Animator) { }
        },
        {
            regex: /gyroscope\.get_/g,
            id: "unihiker-gyroscope",
            title: "Gyroscope (°/s) : ",
            pin: 'UNIHIKER',
            type: 'input',
            listeners: [
                { suffix: "_x", default: 0, unit: '°/s', color: "#ff4d6a", title: "Axe x" },
                { suffix: "_y", default: 0, unit: '°/s', color: "#f9d142", title: "Axe y" },
                { suffix: "_z", default: 0, unit: '°/s', color: "#1a6da8", title: "Axe z" }
            ],
            picture: "gyroscope.png",
            pictureAnimation: "gyroscope.png",
            animate: function (Animator) { }
        },
        {
            regex: /\.sound_level\(\)/g,
            id: "unihiker-sound",
            title: "Niveau sonore",
            pin: 'UNIHIKER',
            type: 'input',
            listeners: [{ default: 20, unit: '', color: "#9966ff", suffix: "" }],
            class: 'gauge',
            picture: "Capteur de son-micro.png",
            pictureAnimation: "Capteur de son-animation.png",
            animate: function (Animator) {
                Animator.gauge();
            }
        }
    ]
};
