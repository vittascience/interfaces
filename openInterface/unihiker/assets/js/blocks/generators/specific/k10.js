/**
 * @fileoverview Python generators of the UNIHIKER K10 (ESP32-S3, MicroPython of DFRobot, library unihiker_k10): they
 * replace the M10 ones when the K10 is selected (the page is loaded again when the board changes).
 */

if (IS_UNIHIKER_K10) {
    const K10 = {
        // Colours of the blocks ((r, g, b), '#rrggbb' or 0xrrggbb) as the 0xrrggbb integers of unihiker_k10
        DEF_COLOUR: `def k10_colour(colour):
  if isinstance(colour, (tuple, list)):
    return (int(colour[0]) << 16) | (int(colour[1]) << 8) | int(colour[2])
  if isinstance(colour, str):
    return int(colour.lstrip('#'), 16)
  return int(colour)`,
        // The texts kept by number are drawn again at each change: the previous one is covered by the background.
        // ponytail: width estimated from the font size, the exact one isn't given by unihiker_k10
        DEF_SCREEN_TEXT: `screen_texts = {}

def screen_text(number, text, x, y, size, colour):
  text = str(text)
  if number in screen_texts:
    old = screen_texts[number]
    screen.draw_rect(x=old[0], y=old[1], w=old[2], h=old[3], bcolor=0xFFFFFF, fcolor=0xFFFFFF)
  screen_texts[number] = (x, y, len(text) * size, size + 4)
  screen.draw_text(text=text, x=x, y=y, font_size=size, color=k10_colour(colour))
  screen.show_draw()`,
        DEF_SCREEN_CLEAR: `def screen_clear():
  screen.show_bg(color=0xFFFFFF)
  screen.show_draw()
  if 'screen_texts' in globals():
    screen_texts.clear()`,
        // Pins of the edge connector: P0 and P1 on the ESP32-S3 (analog, PWM), the others on the I/O expander (digital)
        DEF_PIN: `k10_pins = {}

def k10_pin(number):
  if number not in k10_pins:
    k10_pins[number] = pin(number)
  return k10_pins[number]`,
        // RGB LEDs of the board: 0, 1, 2 or -1 for all of them
        DEF_RGB: `def k10_rgb(number, colour):
  if number < 0:
    for i in range(3):
      rgb.write(num=i, color=k10_colour(colour))
  else:
    rgb.write(num=number, color=k10_colour(colour))`,
        // NeoPixel strip on P0 or P1 (pins of the ESP32-S3)
        DEF_NEOPIXEL: `neopixel_strips = {}
neopixel_counts = {}

def neopixel_strip(number, n):
  if number not in neopixel_strips:
    neopixel_strips[number] = NeoPixel(Pin(pins_remap_k10[number]), n)
    neopixel_counts[id(neopixel_strips[number])] = n
  return neopixel_strips[number]

def neopixel_fill(strip, colour):
  for i in range(neopixel_counts[id(strip)]):
    strip[i] = tuple(colour)
  strip.write()`,
        DEF_NEOPIXEL_RAINBOW: `def neopixel_rainbow(strip):
  n = neopixel_counts[id(strip)]
  for step in range(256):
    for i in range(n):
      h = (i * 256 // n + step) & 255
      if h < 85:
        strip[i] = (255 - h * 3, h * 3, 0)
      elif h < 170:
        h -= 85
        strip[i] = (0, 255 - h * 3, h * 3)
      else:
        h -= 170
        strip[i] = (h * 3, 0, 255 - h * 3)
    strip.write()
    time.sleep(0.01)`,
        // Servo on P0 or P1: PWM at 50 Hz, pulse of 0.5 ms (0°) to 2.5 ms (180°) (the servo of unihiker_k10 refuses 50 Hz)
        DEF_SERVO: `servos = {}

def servo_angle(number, angle):
  if number not in servos:
    servos[number] = PWM(Pin(pins_remap_k10[number]), freq=50)
  angle = max(0, min(180, angle))
  servos[number].duty_u16(int((500 + angle * 2000 / 180) * 65535 / 20000))`,
        DEF_DHT: `dht_sensors = {}

def dht_read(number, index):
  if number not in dht_sensors:
    dht_sensors[number] = dht(number)
  return dht_sensors[number].read()[index]`,
        DEF_ULTRASONIC: `ultrasonic_sensors = {}

def getUltrasonicData(trig, echo, data='distance'):
  if (trig, echo) not in ultrasonic_sensors:
    ultrasonic_sensors[(trig, echo)] = ultrasonic(trig=trig, echo=echo)
  distance = ultrasonic_sensors[(trig, echo)].distance()
  if not distance or distance <= 0:
    return -1
  return distance if data == 'distance' else distance * 2 / 34300`,
        DEF_SHUFFLE: `def shuffle(items):
  for i in range(len(items) - 1, 0, -1):
    j = random.randint(0, i)
    items[i], items[j] = items[j], items[i]`,
        DEF_SERIAL_READ_MESSAGE: `def serial_readMessage(n=32):
  buf = sys.stdin.read(1)
  for i in range(n - 1):
    if not poll.poll(0):
      break
    buf += sys.stdin.read(1)
  return buf`,
        DEF_UART_WRITE: `def uart_write(data):
  uart.write(str(data))`,
        DEF_UART_READ: `def uart_read():
  count = uart.any()
  return uart.read(count) if count else None`,
        DEF_TCS3472_RGB: `def tcs3472_rgb():
  r, g, b, c = tcs3472.read(True)
  return tuple(int(x * 255 / c) for x in (r, g, b)) if c else (0, 0, 0)`,
        DEF_READ_GESTURE: `GESTURES = {1: 'forward', 2: 'backward', 3: 'right', 4: 'left', 5: 'up', 6: 'down', 7: 'clockwise', 8: 'anticlockwise', 9: 'wave'}
def readGesture():
  return GESTURES.get(gesture.gesture(), '')`,
        DEF_TONE: `def tone(number, frequency, duration):
  buzzer = PWM(Pin(pins_remap_k10[number]), freq=int(frequency), duty_u16=32768)
  time.sleep(duration)
  buzzer.deinit()`,
        DEF_K10_AI: `k10_ai_data = {}

def k10_ai_update():
  global k10_ai_data
  screen.show_camera_img(ai.camera_capture())
  if ai.is_ai_data_updated():
    k10_ai_data = ai.get_ai_data() or {}`,
        DEF_MQTT_MESSAGE: `mqtt_topics = []

def mqtt_message(topic):
  if topic not in mqtt_topics:
    mqtt_topics.append(topic)
    mqttclient.received(topic=topic, callback=lambda: None)
  return mqttclient.message(topic=topic) or ''`,
        INIT_SCREEN: `screen.init(dir=2)
screen.show_bg(color=0xFFFFFF)
screen.show_draw()`,
        INIT_SPEAKER: `speaker.reinit()`,
        INIT_POLL: `poll = select.poll()
poll.register(sys.stdin, select.POLLIN)`,
        INIT_UART: `uart = UART(1, baudrate=9600, rx=pins_remap_k10[0], tx=pins_remap_k10[1])`,
        INIT_WIFI: `wifi = WiFi()`,
        INIT_MQTT: `mqttclient = MqttClient()`,
        INIT_BUTTON_A: `button_a = button(button.a)
button_a.event_pressed = lambda: None
button_a.event_released = lambda: None`,
        INIT_BUTTON_B: `button_b = button(button.b)
button_b.event_pressed = lambda: None
button_b.event_released = lambda: None`
    };

    // code generated by the blocks, recognized by the translation of the code to blocks
    window.FUNCTIONS_UNIHIKER_K10 = K10;

    const value = (block, name, fallback) => Blockly.Python.valueToCode(block, name, Blockly.Python.ORDER_NONE) || fallback;
    const k10Import = (name) => Blockly.Python.addImport('k10_' + name, 'from unihiker_k10 import ' + name);
    const colour = (block, name = 'COLOR') => {
        Blockly.Python.addFunction('k10_colour', K10.DEF_COLOUR);
        return value(block, name, '(0, 0, 0)');
    };
    // Number of a pin of the blocks (P0...)
    const pinNumber = (block, name = 'PIN') => block.getFieldValue(name).replace('P', '');

    // Screen (240 x 320, white background as on the M10): drawn, then shown
    const k10Screen = function () {
        k10Import('screen');
        Blockly.Python.addInit('k10_screen', K10.INIT_SCREEN);
        return 'screen';
    };
    const draw = (code) => code + NEWLINE + 'screen.show_draw()' + NEWLINE;

    Blockly.Python.display_unihiker_text = function (block) {
        k10Screen();
        Blockly.Python.addFunction('k10_colour', K10.DEF_COLOUR);
        Blockly.Python.addFunction('screen_text', K10.DEF_SCREEN_TEXT);
        return 'screen_text(' + [value(block, 'NUMBER', '1'), value(block, 'TEXT', '""'), value(block, 'X', '0'), value(block, 'Y', '0'),
            value(block, 'SIZE', '14'), colour(block)].join(', ') + ')' + NEWLINE;
    };

    Blockly.Python.display_unihiker_clear = function () {
        k10Screen();
        Blockly.Python.addFunction('screen_clear', K10.DEF_SCREEN_CLEAR);
        return 'screen_clear()' + NEWLINE;
    };

    // Outline: border colour, filled: border and inside colour
    const shapeColours = (block) => {
        const c = 'k10_colour(' + colour(block) + ')';
        return block.getFieldValue('FILL') === 'fill' ? 'bcolor=' + c + ', fcolor=' + c : 'bcolor=' + c;
    };

    Blockly.Python.display_unihiker_rect = function (block) {
        k10Screen();
        const args = ['x', 'y', 'w', 'h'].map(arg => arg + '=' + value(block, arg.toUpperCase(), '0'));
        return draw('screen.draw_rect(' + args.join(', ') + ', ' + shapeColours(block) + ')');
    };

    Blockly.Python.display_unihiker_circle = function (block) {
        k10Screen();
        const args = ['x', 'y', 'r'].map(arg => arg + '=' + value(block, arg.toUpperCase(), '0'));
        return draw('screen.draw_circle(' + args.join(', ') + ', ' + shapeColours(block) + ')');
    };

    Blockly.Python.display_unihiker_line = function (block) {
        k10Screen();
        const args = ['x0', 'y0', 'x1', 'y1'].map(arg => arg + '=' + value(block, arg.toUpperCase(), '0'));
        return draw('screen.draw_line(' + args.join(', ') + ', color=k10_colour(' + colour(block) + '))');
    };

    // RGB LEDs of the board
    Blockly.Python.display_k10_rgb = function (block) {
        k10Import('rgb');
        Blockly.Python.addFunction('k10_rgb', K10.DEF_RGB);
        return 'k10_rgb(' + block.getFieldValue('LED') + ', ' + colour(block) + ')' + NEWLINE;
    };

    Blockly.Python.display_k10_rgb_off = function () {
        k10Import('rgb');
        return 'rgb.clear()' + NEWLINE;
    };

    // Buttons A and B: unihiker_k10 calls the function at each press
    const k10Button = function (name) {
        k10Import('button');
        // unihiker_k10 calls event_pressed and event_released of each button at each press (error without them)
        Blockly.Python.addInit('k10_button_' + name, K10['INIT_BUTTON_' + name.toUpperCase()]);
        return 'button_' + name;
    };

    Blockly.Python.io_unihiker_on_button = function (block) {
        const name = block.getFieldValue('BUTTON');
        const button = k10Button(name);
        const functionName = Blockly.Python.nameDB_.getDistinctName('on_button_' + name, Blockly.Names.NameType.PROCEDURE);
        const statements = Blockly.Python.unihikerGlobals(block.workspace) + (Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS);
        Blockly.Python.addFunction(functionName, 'def ' + functionName + '():' + NEWLINE + statements);
        Blockly.Python.addEvent(functionName, button + '.event_pressed = ' + functionName);
        return '';
    };

    Blockly.Python.io_unihiker_is_button_pressed = function (block) {
        return [k10Button(block.getFieldValue('BUTTON')) + '.status() == 1', Blockly.Python.ORDER_RELATIONAL];
    };

    // Pins
    const k10Pin = function (block) {
        k10Import('pin');
        Blockly.Python.addFunction('k10_pin', K10.DEF_PIN);
        return 'k10_pin(' + pinNumber(block) + ')';
    };

    Blockly.Python.io_unihiker_digital_write = function (block) {
        return k10Pin(block) + '.write_digital(int(' + value(block, 'STATE', '0') + '))' + NEWLINE;
    };

    Blockly.Python.io_unihiker_digital_read = function (block) {
        return [k10Pin(block) + '.read_digital()', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.io_unihiker_analog_read = function (block) {
        return [k10Pin(block) + '.read_analog()', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.io_unihiker_pwm_write = function (block) {
        return k10Pin(block) + '.write_analog(value=int(' + value(block, 'VALUE', '0') + '))' + NEWLINE;
    };

    // Sensors of the board
    Blockly.Python.sensors_unihiker_light = function () {
        k10Import('light');
        return ['light.read()', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    // Acceleration in g, as on the M10 (unihiker_k10 gives mg)
    Blockly.Python.sensors_unihiker_acceleration = function (block) {
        k10Import('acce');
        const axis = block.getFieldValue('AXIS');
        return ['acce.read_' + axis + '() / 1000', Blockly.Python.ORDER_MULTIPLICATIVE];
    };

    Blockly.Python.sensors_k10_temp_humi = function (block) {
        k10Import('temp_humi');
        return [block.getFieldValue('DATA') === 'HUM' ? 'temp_humi.read_humi()' : 'temp_humi.read_temp()', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    // Speaker: its I2S is started once (unihiker_k10 doesn't start it at import)
    const k10Speaker = function () {
        k10Import('speaker');
        Blockly.Python.addInit('k10_speaker', K10.INIT_SPEAKER);
    };

    Blockly.Python.actuators_unihiker_buzzer_music = function (block) {
        k10Speaker();
        return "speaker.play_tone_music('" + block.getFieldValue('MUSIC') + "')" + NEWLINE;
    };

    // Beats of the block (1 = 0.5 s at 120 bpm): beats of unihiker_k10 in eighths
    Blockly.Python.actuators_unihiker_buzzer_pitch = function (block) {
        k10Speaker();
        return 'speaker.play_tone(int(' + value(block, 'FREQUENCY', '440') + '), ' + (parseFloat(block.getFieldValue('BEAT')) * 8) + ')' + NEWLINE;
    };

    Blockly.Python.actuators_unihiker_buzzer_stop = function () {
        k10Speaker();
        return 'speaker.stop_music()' + NEWLINE;
    };

    // Modules: servo, NeoPixel, DHT and ultrasonic sensor drivers of unihiker_k10
    Blockly.Python.actuators_setServoAngle = function (block) {
        Blockly.Python.addImport('k10_machine_pwm', 'from machine import Pin, PWM');
        k10Import('pins_remap_k10');
        Blockly.Python.addFunction('servo_angle', K10.DEF_SERVO);
        return 'servo_angle(' + pinNumber(block) + ', ' + value(block, 'ANGLE', '0') + ')' + NEWLINE;
    };

    const neopixel = function (block) {
        Blockly.Python.addImport('k10_neopixel', 'from neopixel import NeoPixel');
        Blockly.Python.addImport('k10_machine_pwm', 'from machine import Pin, PWM');
        k10Import('pins_remap_k10');
        Blockly.Python.addFunction('neopixel_strip', K10.DEF_NEOPIXEL);
        const number = pinNumber(block);
        const definition = block.type === 'display_defineNeopixel' ? block
            : block.workspace.getBlocksByType('display_defineNeopixel').find(b => b.isEnabled() && pinNumber(b) === number);
        const strip = 'neopixel_' + number;
        Blockly.Python.addPowerOn(strip, strip + ' = neopixel_strip(' + number + ', ' + (definition ? definition.getFieldValue('N') : '30') + ')');
        return strip;
    };
    const rgbOf = (block) => '(' + ['R', 'G', 'B'].map(c => value(block, c, '0')).join(', ') + ')';

    Blockly.Python.display_defineNeopixel = function (block) {
        neopixel(block);
        return '';
    };
    Blockly.Python.display_controlNeopixelLed = function (block) {
        const strip = neopixel(block);
        return strip + '[' + value(block, 'LED', '0') + '] = ' + rgbOf(block) + NEWLINE + strip + '.write()' + NEWLINE;
    };
    Blockly.Python.display_controlColorNeopixelLed = function (block) {
        const strip = neopixel(block);
        return strip + '[' + value(block, 'LED', '0') + '] = tuple(' + value(block, 'COLOR', '(0, 0, 0)') + ')' + NEWLINE + strip + '.write()' + NEWLINE;
    };
    Blockly.Python.display_neopixel_controlAllLedRGB = function (block) {
        return 'neopixel_fill(' + neopixel(block) + ', ' + rgbOf(block) + ')' + NEWLINE;
    };
    Blockly.Python.display_neopixel_controlAllLedPalette = function (block) {
        return 'neopixel_fill(' + neopixel(block) + ', ' + value(block, 'COLOR', '(0, 0, 0)') + ')' + NEWLINE;
    };
    Blockly.Python.display_rainbowNeopixel = function (block) {
        Blockly.Python.addImport('time', IMPORT_TIME);
        Blockly.Python.addFunction('neopixel_rainbow', K10.DEF_NEOPIXEL_RAINBOW);
        return 'neopixel_rainbow(' + neopixel(block) + ')' + NEWLINE;
    };

    Blockly.Python.sensors_dhtReadData = function (block) {
        k10Import('dht');
        Blockly.Python.addFunction('dht_read', K10.DEF_DHT);
        const sensor = 'dht_read(' + pinNumber(block) + ', ';
        return block.getFieldValue("DATA") === 'HUM' ? [sensor + '1)', Blockly.Python.ORDER_FUNCTION_CALL] : moduleTemperature(block, sensor + '0)');
    };

    Blockly.Python.sensors_getGroveUltrasonicRanger = function (block) {
        const grove = block.getFieldValue("SENSOR") !== 'HC-SR04';
        k10Import('ultrasonic');
        Blockly.Python.addFunction('getUltrasonicData', K10.DEF_ULTRASONIC);
        const data = block.getFieldValue("DATA") === 'TIME' ? 'duration' : 'distance';
        return ['getUltrasonicData(' + pinNumber(block, grove ? "PIN" : "TRIG") + ', ' + pinNumber(block, grove ? "PIN" : "ECHO") + ", '" + data + "')", Blockly.Python.ORDER_FUNCTION_CALL];
    };

    // MicroPython: no slice with a step, no random.shuffle
    Blockly.Python.text_reverse = function (block) {
        const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
        return ["''.join(reversed(" + text + "))", Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.lists_shuffle = function (block) {
        Blockly.Python.addImport('random', IMPORT_RANDOM);
        Blockly.Python.addFunction('shuffle', K10.DEF_SHUFFLE);
        return 'shuffle(' + (Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]") + ')' + NEWLINE;
    };

    // Serial connection: message sent from the console (stdin of MicroPython), read when it is there
    Blockly.Python.communication_onSerialMessageReceived = function (block) {
        const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
        const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Names.NameType.VARIABLE);
        Blockly.Python.addImport('sys', 'import sys');
        Blockly.Python.addImport('select', 'import select');
        Blockly.Python.addInit('poll', K10.INIT_POLL);
        Blockly.Python.addFunction('serial_readMessage', K10.DEF_SERIAL_READ_MESSAGE);
        return "if poll.poll(0):" + NEWLINE + "  " + dataVar + " = serial_readMessage()" + NEWLINE + branchCode;
    };


    // Modules of the edge connector (blocks of the M10, blocks/generators/specific/modules.js): pins of unihiker_k10,
    // I2C bus of the board (P19 SCL, P20 SDA), UART on P0 and P1, drivers of the ESP32 sent with the program
    Blockly.Python.unihikerBoard = function () { };

    Blockly.Python.unihikerPin = function (pin) {
        k10Import('pin');
        Blockly.Python.addFunction('k10_pin', K10.DEF_PIN);
        return 'k10_pin(' + pin.replace('P', '') + ')';
    };

    Blockly.Python.unihikerPinNumber = (pin) => pin.replace('P', '');

    Blockly.Python.unihikerI2C = function () {
        k10Import('k10_i2c');
        return 'k10_i2c';
    };

    // UART of the ESP32-S3: RX on P0, TX on P1
    Blockly.Python.unihikerUart = function () {
        Blockly.Python.addImport('k10_machine_uart', 'from machine import UART');
        k10Import('pins_remap_k10');
        Blockly.Python.addInit('uart', K10.INIT_UART);
        Blockly.Python.addFunction('uart_write', K10.DEF_UART_WRITE);
        Blockly.Python.addFunction('uart_read', K10.DEF_UART_READ);
        return 'uart';
    };

    Blockly.Python.communication_serialInit = function (block) {
        return Blockly.Python.unihikerUart() + '.init(baudrate=' + block.getFieldValue("BAUD") + ')' + NEWLINE;
    };

    const i2cModule = (name, importCode, init) => {
        const i2c = Blockly.Python.unihikerI2C();
        Blockly.Python.addImport('k10_' + name, importCode);
        Blockly.Python.addInit(name, init(i2c));
    };

    // OLED SSD1306 at 0x3C (ESP32 driver, same framebuf methods as the PinPong one)
    Blockly.Python.unihikerOled = function () {
        i2cModule('oled', 'from esp32_ssd1306 import SSD1306_I2C', (i2c) => 'oled = SSD1306_I2C(128, 64, ' + i2c + ')');
        return 'oled';
    };

    // Real time clocks: DS1307 and PCF85063TP drivers of the ESP32 (same methods)
    const rtc = (block) => {
        if (block.getFieldValue("MODULE") === 'PCF85063TP') {
            i2cModule('clock', 'from esp32_pcf85063tp import RTC_HP', (i2c) => 'clock = RTC_HP(i2c=' + i2c + ', addr=0x51)');
        } else {
            i2cModule('clock', 'from esp32_ds1307 import DS1307', (i2c) => 'clock = DS1307(i2c=' + i2c + ', addr=0x68)' + NEWLINE + 'clock.startClock()');
        }
        return 'clock';
    };
    Blockly.Python.communication_clockRTC_setDate = function (block) {
        const date = block.getFieldValue("DATE").split("-").map(n => parseInt(n));
        return rtc(block) + '.fillByYMD(' + date.join(', ') + ')' + NEWLINE + "clock.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
    };
    Blockly.Python.communication_clockRTC_setHour = function (block) {
        return rtc(block) + '.fillByHMS(' + ['HOUR', 'MIN', 'SEC'].map(name => value(block, name, '0')).join(', ') + ')' + NEWLINE;
    };
    Blockly.Python.communication_clockRTC_readTime = function (block) {
        const data = block.getFieldValue("DATA");
        return [rtc(block) + '.readTime()' + (data === 'ALL' ? '' : '[' + data + ']'), Blockly.Python.ORDER_ATOMIC];
    };

    // Weather sensors
    const bme280 = function (block) {
        i2cModule('bme280', 'from esp32_bme280 import BME280', (i2c) => 'bme280 = BME280(i2c=' + i2c + ', address=0x76)');
        switch (block.getFieldValue("DATA")) {
            case "HUM":
                return ['bme280.humidity', Blockly.Python.ORDER_MEMBER];
            case "PRESS":
                return ['bme280.pressure / 100', Blockly.Python.ORDER_MULTIPLICATIVE];
            case "ALT":
                return ['bme280.altitude()', Blockly.Python.ORDER_FUNCTION_CALL];
            default:
                return moduleTemperature(block, 'bme280.temperature');
        }
    };
    for (const type of ['sensors_bme280_getData', 'sensors_envirobit_bme280_getData', 'sensors_weatherbit_bme280_getData', 'sensors_kitronik_bme280_getData',
        'sensors_kitronik_klimate_bme280_getData']) {
        Blockly.Python[type] = bme280;
    }

    Blockly.Python.sensors_getBmp280Data = function (block) {
        i2cModule('bmp280', 'from esp32_bmp280 import BMP280', (i2c) => 'bmp280 = BMP280(i2c=' + i2c + ', addr=' + block.getFieldValue("ADDR") + ')');
        switch (block.getFieldValue("DATA")) {
            case "PRESS":
                return ['bmp280.pressure()', Blockly.Python.ORDER_FUNCTION_CALL];
            case "ALT":
                return ['bmp280.altitude()', Blockly.Python.ORDER_FUNCTION_CALL];
            default:
                return moduleTemperature(block, 'bmp280.temperature()');
        }
    };

    // SHT31 (0x44) and SHT35 (0x45)
    const sht3x = (name, addr) => function (block) {
        i2cModule(name, 'from esp32_sht31 import SHT31', (i2c) => name + ' = SHT31(' + i2c + ', addr=' + addr + ')');
        return block.getFieldValue("DATA") === 'HUM' ? [name + '.get_temp_humi()[1]', Blockly.Python.ORDER_MEMBER] : moduleTemperature(block, name + '.get_temp_humi()[0]');
    };
    Blockly.Python.sensors_SHT31readData = sht3x('sht31', '0x44');
    Blockly.Python.sensors_SHT35readData = sht3x('sht35', '0x45');

    // TCS34725 color sensor: red, green and blue from 0 to 255 (relative to the clear light), as on the micro:bit
    const tcs34725 = function () {
        i2cModule('tcs3472', 'from esp32_colorSensor import TCS34725', (i2c) => 'tcs3472 = TCS34725(' + i2c + ', addr=0x29)');
        Blockly.Python.addFunction('tcs3472_rgb', K10.DEF_TCS3472_RGB);
    };
    Blockly.Python.sensors_colorSensor_getData = function (block) {
        tcs34725();
        return ['tcs3472_rgb()[' + block.getFieldValue("DATA") + ']', Blockly.Python.ORDER_MEMBER];
    };
    Blockly.Python.sensors_envirobit_tcs3472_getRGB = Blockly.Python.sensors_colorSensor_getData;
    Blockly.Python.sensors_envirobit_tcs3472_getBrightness = function () {
        tcs34725();
        return ['int(tcs3472.read(True)[3] / 65.535)', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.sensors_VL53L0X_getRangeMillimeters = function (block) {
        i2cModule('vl53l0x', 'from stm32_vl53l0x import VL53L0X', (i2c) => 'vl53l0x = VL53L0X(' + i2c + ')');
        const divider = { Centimeter: ' / 10', Meter: ' / 1000' }[block.getFieldValue("UNIT")] || '';
        return ['vl53l0x.getRangeMillimeters()' + divider, divider ? Blockly.Python.ORDER_MULTIPLICATIVE : Blockly.Python.ORDER_FUNCTION_CALL];
    };

    // PAJ7620 gesture sensor: names of the M10 blocks
    const gesture = function () {
        i2cModule('gesture', 'from esp32_paj7620 import PAJ7620', (i2c) => 'gesture = PAJ7620(' + i2c + ')');
        Blockly.Python.addFunction('readGesture', K10.DEF_READ_GESTURE);
    };
    Blockly.Python.sensors_getGesture = function () {
        gesture();
        return ['readGesture()', Blockly.Python.ORDER_FUNCTION_CALL];
    };
    Blockly.Python.sensors_onGestureTypeDetected = function (block) {
        gesture();
        return "if readGesture() == '" + block.getFieldValue("GESTURE") + "':" + NEWLINE + (Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS);
    };

    // Servomotors (PWM at 50 Hz on P0 or P1) and buzzers (PWM on P0 or P1)
    const k10Servo = function () {
        Blockly.Python.addImport('k10_machine_pwm', 'from machine import Pin, PWM');
        k10Import('pins_remap_k10');
        Blockly.Python.addFunction('servo_angle', K10.DEF_SERVO);
    };
    Blockly.Python.actuators_continuousServo_setSpeed = function (block) {
        k10Servo();
        // 90 degrees: stop, 0 or 180 degrees: full speed in one direction
        return 'servo_angle(' + pinNumber(block) + ', 90 + ' + block.getFieldValue("DIR") + ' * ' + value(block, "SPEED", '0') + ' * 0.9)' + NEWLINE;
    };
    // Access:bit: barrier servomotor on P0, buzzer on P1
    Blockly.Python.actuators_controlAccessBitBarrier = function (block) {
        k10Servo();
        return 'servo_angle(0, ' + (block.getFieldValue("ACTION") === 'RAISE' ? 0 : 65) + ')' + NEWLINE;
    };
    Blockly.Python.actuators_controlAccessBitBuzzer = function (block) {
        Blockly.Python.addImport('k10_machine_pwm', 'from machine import Pin, PWM');
        Blockly.Python.addImport('time', IMPORT_TIME);
        k10Import('pins_remap_k10');
        Blockly.Python.addFunction('tone', K10.DEF_TONE);
        return 'tone(1, 440, ' + value(block, "VALUE", '1') + ')' + NEWLINE;
    };

    // Kitronik servo board: PCA9685 at 0x6A on the I2C bus of the board (P19, P20)
    Blockly.Python.actuators_kitronikShield_setServoAngle = function (block) {
        Blockly.Python.addImport('k10_pca9685', 'from esp32_pca9685 import PCA9685Driver');
        k10Import('pins_remap_k10');
        Blockly.Python.addInit('kitronik-servoBoard', 'servoBoard = PCA9685Driver(i2c_periph_addr=0x6A, scl_pin=pins_remap_k10[19], sda_pin=pins_remap_k10[20])' + NEWLINE + 'servoBoard.set_pwm_frequency(50)');
        return 'servoBoard.servo_set_angle(' + value(block, "SERVO", '1') + ' - 1, ' + value(block, "ANGLE", '0') + ')' + NEWLINE;
    };

    // MicroPython: bytes for the I2C and UART buffers, None when no line was received
    Blockly.Python.communication_i2c_write = function (block) {
        return Blockly.Python.unihikerI2C() + '.writeto(' + value(block, "ADDR", 'None') + ', bytes(' + value(block, "BUF", '[]') + '))' + NEWLINE;
    };

    Blockly.Python.communication_uart_readLineData = function () {
        Blockly.Python.unihikerUart();
        return ["(uart.readline() or b'')", Blockly.Python.ORDER_ATOMIC];
    };

    // AI of the board: the camera image is shown on the screen and analysed (module ai of the firmware). The firmware
    // can't run the AI and the Wi-Fi at the same time.
    const k10Ai = function () {
        Blockly.Python.addImport('k10_ai', 'import ai');
        k10Screen();
        Blockly.Python.addFunction('k10_ai', K10.DEF_K10_AI);
    };

    Blockly.Python.ai_k10_start = function (block) {
        k10Ai();
        return 'ai.init_ai()' + NEWLINE + 'ai.camera_start()' + NEWLINE + 'ai.' + block.getFieldValue('MODE') + '()' + NEWLINE;
    };

    Blockly.Python.ai_k10_update = function () {
        k10Ai();
        return 'k10_ai_update()' + NEWLINE;
    };

    Blockly.Python.ai_k10_qrcode = function () {
        k10Ai();
        return ["str(k10_ai_data.get('code_data') or '')", Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.ai_k10_detected = function (block) {
        k10Ai();
        return ["bool(k10_ai_data.get('" + block.getFieldValue('OBJECT') + "'))", Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.ai_k10_face = function (block) {
        k10Ai();
        return 'ai.' + block.getFieldValue('ACTION') + '()' + NEWLINE;
    };

    Blockly.Python.ai_k10_face_id = function () {
        k10Ai();
        return ["(k10_ai_data.get('face_detect') or {}).get('face_id', -1)", Blockly.Python.ORDER_FUNCTION_CALL];
    };

    // Wi-Fi and MQTT (k10_base of the firmware)
    const k10Wifi = function () {
        Blockly.Python.addImport('k10_wifi', 'from k10_base import WiFi, MqttClient');
        Blockly.Python.addInit('k10_wifi', K10.INIT_WIFI);
    };

    Blockly.Python.communication_k10_wifi_connect = function (block) {
        k10Wifi();
        return 'wifi.connect(ssid=str(' + value(block, 'SSID', "''") + '), psd=str(' + value(block, 'PASSWORD', "''") + '), timeout=20000)' + NEWLINE;
    };

    Blockly.Python.communication_k10_wifi_connected = function () {
        k10Wifi();
        return ['bool(wifi.status())', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    const k10Mqtt = function () {
        k10Wifi();
        Blockly.Python.addInit('k10_mqtt', K10.INIT_MQTT);
    };

    Blockly.Python.communication_k10_mqtt_connect = function (block) {
        k10Mqtt();
        return 'mqttclient.connect(server=str(' + value(block, 'SERVER', "''") + '), port=int(' + value(block, 'PORT', '1883') + "), client_id='', user=str("
            + value(block, 'USER', "''") + '), psd=str(' + value(block, 'PASSWORD', "''") + '))' + NEWLINE;
    };

    Blockly.Python.communication_k10_mqtt_publish = function (block) {
        k10Mqtt();
        return 'mqttclient.publish(topic=str(' + value(block, 'TOPIC', "''") + '), content=str(' + value(block, 'MESSAGE', "''") + '))' + NEWLINE;
    };

    // last message of a topic: the topic is subscribed at its first reading
    Blockly.Python.communication_k10_mqtt_message = function (block) {
        k10Mqtt();
        Blockly.Python.addFunction('mqtt_message', K10.DEF_MQTT_MESSAGE);
        return ['mqtt_message(str(' + value(block, 'TOPIC', "''") + '))', Blockly.Python.ORDER_FUNCTION_CALL];
    };
}
