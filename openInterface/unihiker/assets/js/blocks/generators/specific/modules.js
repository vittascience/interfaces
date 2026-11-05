/**
 * @fileoverview Python generators of the module blocks on the UNIHIKER M10 (blocks of the micro:bit and ESP32 modules,
 * same edge connector as the micro:bit): PinPong objects and drivers of the board, else the libraries of assets/lib
 * (from the ESP32 and micro:bit ones) sent with the program.
 */

// Pin of a module in a mode: pin(Pin.P0, Pin.IN)... (read by the simulator)
const modulePin = (block, name, mode) => Blockly.Python.unihikerPin(block.getFieldValue(name), mode);

// Pin number of PinPong (Pin.P0...), for the PinPong objects of a pin (Servo, NeoPixel, Tone, DHT11...)
Blockly.Python.unihikerPinNumber = function (pin) {
    Blockly.Python.unihikerBoard();
    return 'Pin.' + pin;
};
const modulePinNumber = (block, name) => Blockly.Python.unihikerPinNumber(block.getFieldValue(name));

const moduleValue = (block, name, fallback = '0') => Blockly.Python.valueToCode(block, name, Blockly.Python.ORDER_NONE) || fallback;

const moduleText = (block, name) => {
    const text = moduleValue(block, name, "''");
    return Blockly.Constants.Utils.isInputTextBlock(block, name) ? text : 'str(' + text + ')';
};

// Temperature in the unit of the block (UNIT field when the TEMP_UNIT input is shown)
const moduleTemperature = (block, code) => {
    if (block.getInput("TEMP_UNIT")) {
        switch (block.getFieldValue("UNIT")) {
            case "FAHRENHEIT":
                return [code + "*9/5 + 32", Blockly.Python.ORDER_ADDITIVE];
            case "KELVIN":
                return [code + " + 273.15", Blockly.Python.ORDER_ADDITIVE];
        }
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// I2C bus of the edge connector (P19 SCL, P20 SDA)
Blockly.Python.unihikerI2C = function () {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_i2c', IMPORT_PINPONG_I2C);
    Blockly.Python.addInit('i2c', 'i2c = I2C()');
    return 'i2c';
};

// Serial port of the board (fixed pins: the RX and TX menus of the micro:bit blocks aren't used)
Blockly.Python.unihikerUart = function () {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_uart', IMPORT_PINPONG_UART);
    Blockly.Python.addInit('uart', 'uart = UART()' + NEWLINE + 'uart.init(baud_rate=9600)');
    Blockly.Python.addFunction('uart_write', FUNCTIONS_UNIHIKER_MODULES.DEF_UART_WRITE);
    Blockly.Python.addFunction('uart_read', FUNCTIONS_UNIHIKER_MODULES.DEF_UART_READ);
    return 'uart';
};

// Library of assets/lib (driver without PinPong driver on the board)
Blockly.Python.unihikerLibrary = function (name, code) {
    Blockly.Python.addImport(name, code);
};

// Pin modules: digital input
for (const [type, comment] of [
    ['io_getGroveButton', 'Simple Button'], ['io_getGroveSwitch', 'Switch Button'], ['io_getMagneticSwitch', 'Magnetic Switch'],
    ['io_getGroveTactile', 'Touch Button'], ['io_getGroveColoredButton', 'Colored Button'], ['sensors_getRainGauge', 'Rain Gauge'],
    ['sensors_getAnemometer', 'Anemometer'], ['sensors_getGroveLineFinder', 'Line Finder'], ['sensors_getGroveTilt', 'Tilt Sensor'],
    ['sensors_getGroveMotion', 'PIR Motion Sensor'], ['sensors_getMiniPirGroveMotion', 'Mini PIR Motion Sensor'],
    ['sensors_getPiezoVibration', 'Vibration Sensor']
]) {
    Blockly.Python[type] = function (block) {
        Blockly.Python.addInit(type + '_' + block.getFieldValue("PIN"), '# ' + comment + ' on ' + block.getFieldValue("PIN"));
        return [modulePin(block, "PIN", 'IN') + '.read_digital()', Blockly.Python.ORDER_ATOMIC];
    };
}

// Pin modules: analog input (0 to 4095)
for (const [type, comment] of [
    ['io_getGroveRotaryAngle', 'Potentiometer'], ['io_getGroveSlidePotentiometer', 'Potentiometer'], ['sensors_getAirQualityValue', 'Air Quality Sensor'],
    ['sensors_getGroveMoisture', 'Moisture Sensor'], ['sensors_getGroveCapacitiveMoisture', 'Capacitive Moisture Sensor'],
    ['sensors_getGroveWaterAmount', 'Water Sensor'], ['sensors_getGroveLight', 'Light Sensor'], ['sensors_getGroveSound', 'Sound Sensor'],
    ['sensors_getFsr402Force', 'Force Sensor'], ['sensors_getEmgDetector', 'EMG Detector']
]) {
    Blockly.Python[type] = function (block) {
        Blockly.Python.addInit(type + '_' + block.getFieldValue("PIN"), '# ' + comment + ' on ' + block.getFieldValue("PIN"));
        return [modulePin(block, "PIN", 'ANALOG') + '.read_analog()', Blockly.Python.ORDER_ATOMIC];
    };
}

// Pin modules: digital output
for (const [type, comment] of [
    ['display_setGroveSocketLed', 'LED Module'], ['io_setGroveColoredButton', 'Colored Button'], ['actuators_setVibrationMotorState', 'Vibration Motor'],
    ['actuators_setGroveRelayState', 'Relay'], ['actuators_setElectromagnetState', 'Electromagnet'], ['actuators_setWaterAtomizerState', 'Water Atomizer']
]) {
    Blockly.Python[type] = function (block) {
        Blockly.Python.addInit(type + '_' + block.getFieldValue("PIN"), '# ' + comment + ' on ' + block.getFieldValue("PIN"));
        return modulePin(block, "PIN", 'OUT') + '.write_digital(' + moduleValue(block, "STATE") + ')' + NEWLINE;
    };
}

// Display - LED

Blockly.Python.display_setLEDintensity = function (block) {
    return modulePin(block, "PIN", 'PWM') + '.write_analog(' + moduleValue(block, "VALUE") + ')' + NEWLINE;
};

Blockly.Python.display_setVariableColorLED = function (block) {
    return modulePin(block, "PIN", 'PWM') + '.write_analog(int(1023 * (1 - ' + moduleValue(block, "VALUE") + ' / 100)))' + NEWLINE;
};

// Kitronik traffic light (P0, P1, P2) and Lamp:bit (light on P0, luminosity on P1)
Blockly.Python.display_setTrafficLight = function (block) {
    const pin = block.getFieldValue("PIN").replace(/^pin/, 'P');
    return Blockly.Python.unihikerPin(pin, 'OUT') + '.write_digital(' + moduleValue(block, "STATE") + ')' + NEWLINE;
};

Blockly.Python.display_setLampBitLight = function (block) {
    return Blockly.Python.unihikerPin('P0', 'OUT') + '.write_digital(' + moduleValue(block, "STATE") + ')' + NEWLINE;
};

Blockly.Python.sensors_getLampBitLuminosity = function () {
    return [Blockly.Python.unihikerPin('P1', 'ANALOG') + '.read_analog()', Blockly.Python.ORDER_ATOMIC];
};

// Display - Neopixel (PinPong NeoPixel): the number of LEDs is the one of the definition block of the pin
Blockly.Python.unihikerNeopixel = function (block, pinNumber, count) {
    Blockly.Python.addImport('pinpong_neopixel', IMPORT_PINPONG_NEOPIXEL);
    Blockly.Python.addFunction('neopixel', FUNCTIONS_UNIHIKER_MODULES.DEF_NEOPIXEL);
    if (count === undefined) {
        const definition = block.workspace.getBlocksByType('display_defineNeopixel').find(b => b.isEnabled() && 'Pin.' + b.getFieldValue("PIN") === pinNumber);
        count = definition ? definition.getFieldValue("N") : '30';
    }
    Blockly.Python.addPowerOn('neopixel_' + pinNumber, '# Neopixel on ' + pinNumber + NEWLINE + 'neopixel(' + pinNumber + ', ' + count + ')');
    return 'neopixel(' + pinNumber + ')';
};

Blockly.Python.display_defineNeopixel = function (block) {
    Blockly.Python.unihikerNeopixel(block, modulePinNumber(block, "PIN"), block.getFieldValue("N"));
    return '';
};

const neopixelColour = (block) => {
    const colour = moduleValue(block, "COLOR", '(0, 0, 0)');
    return /^\(.*\)$/.test(colour) ? colour : 'tuple(' + colour + ')';
};

// Neopixel blocks of a pin (PIN field) or of the Kitronik ZIP Halo (60 LEDs on P8)
const neopixelGenerators = (strip) => ({
    led: function (block) {
        const rgb = '(' + ['R', 'G', 'B'].map(c => moduleValue(block, c)).join(', ') + ')';
        return strip(block) + '[' + moduleValue(block, "LED") + '] = ' + rgb + NEWLINE;
    },
    colourLed: function (block) {
        return strip(block) + '[' + moduleValue(block, "LED") + '] = ' + neopixelColour(block) + NEWLINE;
    },
    allRGB: function (block) {
        Blockly.Python.addFunction('neopixel_fill', FUNCTIONS_UNIHIKER_MODULES.DEF_NEOPIXEL_FILL);
        const rgb = '(' + ['R', 'G', 'B'].map(c => moduleValue(block, c)).join(', ') + ')';
        return 'neopixel_fill(' + strip(block) + ', ' + rgb + ')' + NEWLINE;
    },
    allColour: function (block) {
        Blockly.Python.addFunction('neopixel_fill', FUNCTIONS_UNIHIKER_MODULES.DEF_NEOPIXEL_FILL);
        return 'neopixel_fill(' + strip(block) + ', ' + neopixelColour(block) + ')' + NEWLINE;
    },
    rainbow: function (block) {
        Blockly.Python.addImport('time', IMPORT_TIME);
        Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_UNIHIKER_MODULES.DEF_NEOPIXEL_RAINBOW);
        return 'neopixel_rainbow(' + strip(block) + ')' + NEWLINE;
    }
});

const pinNeopixel = neopixelGenerators((block) => Blockly.Python.unihikerNeopixel(block, modulePinNumber(block, "PIN")));
Blockly.Python.display_controlNeopixelLed = pinNeopixel.led;
Blockly.Python.display_controlColorNeopixelLed = pinNeopixel.colourLed;
Blockly.Python.display_neopixel_controlAllLedRGB = pinNeopixel.allRGB;
Blockly.Python.display_neopixel_controlAllLedPalette = pinNeopixel.allColour;
Blockly.Python.display_rainbowNeopixel = pinNeopixel.rainbow;

const zipHalo = neopixelGenerators((block) => {
    Blockly.Python.unihikerBoard();
    return Blockly.Python.unihikerNeopixel(block, 'Pin.P8', '60');
});
Blockly.Python.display_controlZipHaloLed = zipHalo.led;
Blockly.Python.display_controlColorZipHaloLed = zipHalo.colourLed;
Blockly.Python.display_ZipHaloLed_controlAllLedRGB = zipHalo.allRGB;
Blockly.Python.display_ZipHaloLed_controlAllLedPalette = zipHalo.allColour;
Blockly.Python.display_ZipHaloLed_rainbow = zipHalo.rainbow;

// Display - 4 digits (TM1637) and LED bar (MY9221): libraries of the ESP32, pins driven by PinPong
const tm1637 = (block) => {
    const clk = modulePinNumber(block, "CLK");
    const dio = modulePinNumber(block, "DIO");
    const name = 'tm1637_' + block.getFieldValue("CLK");
    Blockly.Python.unihikerLibrary('unihiker_tm1637', IMPORT_UNIHIKER_TM1637);
    Blockly.Python.addInit(name, '# 4 Digit Display CLK/DIO on ' + block.getFieldValue("CLK") + '/' + block.getFieldValue("DIO") + NEWLINE
        + name + ' = TM1637(clk=' + clk + ', dio=' + dio + ')');
    return name;
};

Blockly.Python.display_setNumberGrove4Digit = function (block) {
    const name = tm1637(block);
    const n = moduleValue(block, "N");
    return name + (block.getFieldValue("SHOW") === 'TEMP' ? '.temperature(int(' : '.number(int(') + n + '))' + NEWLINE;
};

Blockly.Python.display_setClockGrove4Digit = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('getCurrentTime', FUNCTIONS_UNIHIKER_MODULES.DEF_GET_CURRENT_TIME);
    return tm1637(block) + '.clock(getCurrentTime())' + NEWLINE;
};

const my9221 = (block) => {
    const name = 'my9221_' + block.getFieldValue("DI");
    Blockly.Python.unihikerLibrary('unihiker_my9221', IMPORT_UNIHIKER_MY9221);
    Blockly.Python.addInit(name, '# LED Bar DI/DCKI on ' + block.getFieldValue("DI") + '/' + block.getFieldValue("DCKI") + NEWLINE
        + name + ' = MY9221(di=' + modulePinNumber(block, "DI") + ', dcki=' + modulePinNumber(block, "DCKI") + ', reverse=False)');
    return name;
};

Blockly.Python.display_setLevelLedBar = function (block) {
    return my9221(block) + '.level(' + moduleValue(block, "VALUE") + ')' + NEWLINE;
};

Blockly.Python.display_my9221_reverse = function (block) {
    return my9221(block) + '.reverse(' + moduleValue(block, "STATE") + ')' + NEWLINE;
};

// Display - LCD: Grove LCD 16x2 at 0x3E (library of the micro:bit), PCF8574 LCD at 0x27 or 0x3F (PinPong driver)
const lcd = (block) => {
    const addr = block.getFieldValue("ADDR") || '0x3e';
    if (addr === '0x3e') {
        Blockly.Python.unihikerLibrary('unihiker_lcd_i2c', IMPORT_UNIHIKER_LCD_I2C);
        Blockly.Python.addInit('lcd1602', 'lcd = LCD1602(' + Blockly.Python.unihikerI2C() + ')');
        return 'lcd';
    }
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_lcd1602', IMPORT_PINPONG_LCD1602);
    Blockly.Python.addInit('lcd8574_' + addr, 'lcd8574_' + addr + ' = LCD1602_I2C(i2c_addr=' + addr + ')');
    return 'lcd8574_' + addr;
};

Blockly.Python.display_lcdSetText = function (block) {
    const name = lcd(block);
    const text = moduleText(block, "TEXT");
    const col = block.getFieldValue("POS");
    const line = block.getFieldValue("LINE");
    if (name === 'lcd') {
        return 'lcd.setCursor(' + col + ', ' + line + ')' + NEWLINE + 'lcd.writeTxt(' + text + ')' + NEWLINE;
    }
    return name + '.set_cursor(' + col + ', ' + line + ')' + NEWLINE + name + '.print(' + text + ')' + NEWLINE;
};

Blockly.Python.display_lcdClear = function (block) {
    return lcd(block) + '.clear()' + NEWLINE;
};

// Display - OLED 128 x 64 at 0x3C (PinPong driver): grid of 64 x 32 points (2 x 2 pixels) and 12 x 4 characters as on
// the micro:bit
Blockly.Python.unihikerOled = function () {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_ssd1306', IMPORT_PINPONG_SSD1306);
    Blockly.Python.addInit('oled', 'oled = SSD1306_I2C(width=128, height=64)');
    return 'oled';
};

Blockly.Python.display_addOledText = function (block) {
    Blockly.Python.unihikerOled();
    Blockly.Python.addFunction('oled_addText', FUNCTIONS_UNIHIKER_MODULES.DEF_OLED_ADD_TEXT);
    return 'oled_addText(' + moduleValue(block, "X") + ', ' + moduleValue(block, "Y") + ', ' + moduleText(block, "TEXT") + ')' + NEWLINE;
};

Blockly.Python.display_setOledPixel = function (block) {
    Blockly.Python.unihikerOled();
    const x = moduleValue(block, "X");
    const y = moduleValue(block, "Y");
    return 'oled.fill_rect(' + x + ' * 2, ' + y + ' * 2, 2, 2, ' + moduleValue(block, "STATE") + ')' + NEWLINE + 'oled.show()' + NEWLINE;
};

Blockly.Python.display_showOledIcon = function (block) {
    Blockly.Python.unihikerOled();
    Blockly.Python.addFunction('oled_drawIcon', FUNCTIONS_UNIHIKER_MODULES.DEF_OLED_STAMPS);
    const icon = block.getFieldValue("ICON") || 'NO';
    return "oled_drawIcon(" + moduleValue(block, "X") + ', ' + moduleValue(block, "Y") + ", '" + icon + "', " + moduleValue(block, "STATE") + ')' + NEWLINE;
};

Blockly.Python.display_clearOledScreen = function () {
    Blockly.Python.unihikerOled();
    return 'oled.fill(0)' + NEWLINE + 'oled.show()' + NEWLINE;
};

// Display - LED matrices: HT16K33 8x8 (library of the ESP32), Grove RGB matrix (library of the micro:bit)
const ht16k33Matrix = () => {
    Blockly.Python.unihikerLibrary('unihiker_ht16k33matrix', IMPORT_UNIHIKER_HT16K33_MATRIX);
    Blockly.Python.addInit('HT16K33Matrix', 'ht16k33matrix = HT16K33Matrix(i2c=' + Blockly.Python.unihikerI2C() + ')');
    return 'ht16k33matrix';
};

Blockly.Python.display_led_matrix_DrawBitmap = function (block) {
    const matrix = block.getField("LEDS_MATRIX").getText().split(',');
    const icon = 'b"' + matrix.map(row => '\\x' + parseInt(row, 2).toString(16).toUpperCase().padStart(2, '0')).join('') + '"';
    const name = ht16k33Matrix();
    return name + '.set_icon(' + icon + ')' + NEWLINE + name + '.draw()' + NEWLINE;
};

Blockly.Python.display_led_matrix_clear = function () {
    const name = ht16k33Matrix();
    return name + '.clear()' + NEWLINE + name + '.draw()' + NEWLINE;
};

const rgbMatrix = () => {
    Blockly.Python.unihikerLibrary('unihiker_rgb_led_matrix', IMPORT_UNIHIKER_RGB_LED_MATRIX);
    Blockly.Python.addInit('RGBmatrix', 'RGBmatrix = GroveTwoRGBLedMatrix(' + Blockly.Python.unihikerI2C() + ')');
    return 'RGBmatrix';
};

Blockly.Python.display_rgb_led_matrix_DrawBitmap = function (block) {
    const colours = block.getField("RGB_LEDS_MATRIX").getText().split(',').map(c => Blockly.Constants.COLOURS[c]);
    // columns of the field, from the last row (same order as the micro:bit generator)
    const rows = [];
    for (let i = 0; i < 8; i++) {
        rows.push(colours.filter((c, j) => j % 8 === i));
    }
    rows.reverse();
    const frame = rows.map((row, i) => rows.map(r => r[i]));
    const duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_NONE);
    return rgbMatrix() + '.displayFrames([' + frame.join(',') + '], ' + (duration ? duration + ', False' : '1000, True') + ', 1)' + NEWLINE;
};

Blockly.Python.display_rgb_led_matrix_stopDisplay = function () {
    return rgbMatrix() + '.stopDisplay()' + NEWLINE;
};

// Inputs

Blockly.Python.io_getGroveThumbJoystick = function (block) {
    const axis = block.getFieldValue("AXIS") === 'Y' ? 'PIN_Y' : 'PIN_X';
    return [modulePin(block, axis, 'ANALOG') + '.read_analog()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getKeypadNumber = function () {
    Blockly.Python.unihikerUart();
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('getKeypadNumber', FUNCTIONS_UNIHIKER_MODULES.DEF_KEYPAD_GET_NUMBER);
    return ['getKeypadNumber()', Blockly.Python.ORDER_ATOMIC];
};

// Fingerprint sensor on the serial port (library of the micro:bit)
const fingerprint = () => {
    Blockly.Python.unihikerLibrary('unihiker_fingerprint', IMPORT_UNIHIKER_FINGERPRINT);
    Blockly.Python.addInit('grove-fingerprint', 'fingerprint.init(' + Blockly.Python.unihikerUart() + ')');
};

Blockly.Python.io_fingerprint_register = function (block) {
    fingerprint();
    return 'fingerprint.register(' + moduleValue(block, "ID", '1') + ')' + NEWLINE;
};

Blockly.Python.io_fingerprint_verify = function () {
    fingerprint();
    return ['fingerprint.verify() >= 0', Blockly.Python.ORDER_RELATIONAL];
};

// Communication - serial port of the board

Blockly.Python.communication_serialInit = function (block) {
    return Blockly.Python.unihikerUart() + '.init(baud_rate=' + block.getFieldValue("BAUD") + ')' + NEWLINE;
};

Blockly.Python.communication_serialRedirectUSB = function () {
    // the console of the program is already the USB one
    return '';
};

Blockly.Python.communication_uart_writeData = function (block) {
    Blockly.Python.unihikerUart();
    return 'uart_write(' + moduleValue(block, "DATA", "''") + ')' + NEWLINE;
};

Blockly.Python.communication_uart_readData = function () {
    Blockly.Python.unihikerUart();
    return ['uart_read()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_uart_readLineData = function () {
    Blockly.Python.unihikerUart();
    return ['bytes(uart.readline())', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_uart_isDataAvailable = function () {
    return [Blockly.Python.unihikerUart() + '.any()', Blockly.Python.ORDER_ATOMIC];
};

// Bluetooth HC-05 and HM-10 on the serial port
const bluetoothSend = function (block) {
    Blockly.Python.unihikerUart();
    return 'uart_write(' + moduleValue(block, "DATA", "''") + ')' + NEWLINE;
};

const bluetoothReceive = (decode) => function (block) {
    Blockly.Python.unihikerUart();
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return 'if uart.any():' + NEWLINE + TAB + dataVar + ' = uart_read()' + (decode ? '.decode()' : '') + NEWLINE + branchCode;
};

Blockly.Python.communication_hc05_sendBluetoothData = bluetoothSend;
Blockly.Python.communication_hc05_onBluetoothDataReceived = bluetoothReceive(false);
Blockly.Python.communication_hm10_sendBluetoothData = bluetoothSend;
Blockly.Python.communication_hm10_onBluetoothDataReceived = bluetoothReceive(true);

const hm10Command = () => {
    Blockly.Python.unihikerUart();
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('hm10_bluetooth_sendCommandAT', FUNCTIONS_UNIHIKER_MODULES.DEF_HM10_BLUETOOTH_SEND_COMMAND_AT);
};

Blockly.Python.communication_hm10_setATCommand = function (block) {
    hm10Command();
    return 'hm10_bluetooth_sendCommandAT("' + block.getFieldValue("COMMAND") + '", str(' + moduleValue(block, "VALUE", "''") + '))' + NEWLINE;
};

Blockly.Python.communication_hm10_getATCommand = function (block) {
    hm10Command();
    return ['hm10_bluetooth_sendCommandAT("' + block.getFieldValue("COMMAND") + '")', Blockly.Python.ORDER_ATOMIC];
};

// GPS on the serial port
const gps = () => {
    Blockly.Python.unihikerUart();
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('gps_module', '# GPS on UART' + NEWLINE + "gpsInfos = {'nmea': None}" + NEWLINE + 'gpsBuffer = ""');
    Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_UNIHIKER_MODULES.DEF_GPS_READ_NMEA);
};

Blockly.Python.communication_gps_getNMEA = function () {
    gps();
    return ['gps_readNMEA(True)', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_gps_getGGAInformations = function (block) {
    gps();
    Blockly.Python.addFunction('gps_GGA_getInformation', FUNCTIONS_UNIHIKER_MODULES.DEF_GPS_GET_GGA_INFORMATIONS);
    return ["gps_GGA_getInformation('" + block.getFieldValue("INFO") + "')", Blockly.Python.ORDER_ATOMIC];
};

// RFID: MFRC522 on SPI (library of the ESP32), Grove 125 kHz reader on the serial port (library of the micro:bit)
Blockly.Python.communication_mfrc522_getCardID = function (block) {
    Blockly.Python.unihikerLibrary('unihiker_mfrc522', IMPORT_UNIHIKER_MFRC522);
    Blockly.Python.addInit('rfid_rc522', '# RFID-MFRC522 on SPI' + NEWLINE + 'rfid_rc522 = MFRC522(cs=' + modulePinNumber(block, "NSS") + ')');
    Blockly.Python.addFunction('rc522_readTagUid', FUNCTIONS_UNIHIKER_MODULES.DEF_RC522_READ_TAG_UID);
    return ['rc522_readTagUid()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_rfid_getCardID = function () {
    Blockly.Python.unihikerLibrary('unihiker_rfid_reader', IMPORT_UNIHIKER_RFID_READER);
    return ['rfid_reader.rfid_read(' + Blockly.Python.unihikerUart() + ')', Blockly.Python.ORDER_ATOMIC];
};

// Real time clocks: DS1307 (PinPong driver), PCF85063TP (library of the ESP32)
const rtc = (block) => {
    if (block.getFieldValue("MODULE") === 'PCF85063TP') {
        Blockly.Python.unihikerLibrary('unihiker_pcf85063tp', IMPORT_UNIHIKER_PCF85063TP);
        Blockly.Python.addInit('clock_rtc_hp', 'clock_hp = RTC_HP(' + Blockly.Python.unihikerI2C() + ', addr=0x51)');
        return 'clock_hp';
    }
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_ds1307', IMPORT_PINPONG_DS1307);
    Blockly.Python.addInit('clock_rtc_v1', 'clock_v1 = DS1307()');
    Blockly.Python.addFunction('ds1307', FUNCTIONS_UNIHIKER_MODULES.DEF_DS1307);
    return 'clock_v1';
};

Blockly.Python.communication_clockRTC_setDate = function (block) {
    const date = block.getFieldValue("DATE").split("-").map(n => parseInt(n));
    const day = block.getFieldValue("DAY");
    if (rtc(block) === 'clock_hp') {
        return 'clock_hp.fillByYMD(' + date.join(', ') + ')' + NEWLINE + "clock_hp.fillDayOfWeek('" + day + "')" + NEWLINE;
    }
    return 'ds1307_setDate(' + date.join(', ') + ", '" + day + "')" + NEWLINE;
};

Blockly.Python.communication_clockRTC_setHour = function (block) {
    const time = ['HOUR', 'MIN', 'SEC'].map(name => moduleValue(block, name)).join(', ');
    return (rtc(block) === 'clock_hp' ? 'clock_hp.fillByHMS(' : 'ds1307_setHour(') + time + ')' + NEWLINE;
};

Blockly.Python.communication_clockRTC_readTime = function (block) {
    const data = block.getFieldValue("DATA");
    const code = rtc(block) === 'clock_hp' ? 'clock_hp.readTime()' : 'ds1307_readTime()';
    return [data === 'ALL' ? code : code + '[' + data + ']', Blockly.Python.ORDER_ATOMIC];
};

// Communication - I2C bus of the edge connector (P19 SCL, P20 SDA)

Blockly.Python.communication_i2c_init = function () {
    Blockly.Python.unihikerI2C();
    // fixed pins and frequency on the board
    return '';
};

Blockly.Python.communication_i2c_scan = function () {
    return [Blockly.Python.unihikerI2C() + '.scan()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_i2c_read = function (block) {
    return ['bytes(' + Blockly.Python.unihikerI2C() + '.readfrom(' + moduleValue(block, "ADDR", 'None') + ', ' + moduleValue(block, "N") + '))', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_i2c_write = function (block) {
    return Blockly.Python.unihikerI2C() + '.writeto(' + moduleValue(block, "ADDR", 'None') + ', list(bytes(' + moduleValue(block, "BUF", '[]') + ')))' + NEWLINE;
};

// Sensors - gas (libraries of the ESP32)

Blockly.Python.sensors_getSgp30Gas = function (block) {
    Blockly.Python.unihikerLibrary('unihiker_sgp30', IMPORT_UNIHIKER_SGP30);
    Blockly.Python.addInit('sgp30', 'sgp30 = SGP30(i2c=' + Blockly.Python.unihikerI2C() + ')');
    // methods of the library (as on the ESP32)
    return [block.getFieldValue("GAS") === 'TVOC' ? 'sgp30.total_organic_compound()' : 'sgp30.co2_equivalent()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getMultichannelGas = function (block) {
    Blockly.Python.unihikerLibrary('unihiker_gas', IMPORT_UNIHIKER_GAS);
    Blockly.Python.addInit('multichannel', 'multichannel = GAS(i2c=' + Blockly.Python.unihikerI2C() + ')' + NEWLINE + 'multichannel.power_on()');
    // gas constant of the library (as on the ESP32)
    return ['multichannel.calc_gas(multichannel.' + block.getFieldValue("GAS") + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getMultichannelGasV2 = function (block) {
    Blockly.Python.unihikerLibrary('unihiker_gas_gmxxx', IMPORT_UNIHIKER_GAS_GMXXX);
    Blockly.Python.addInit('gas_gmxxx', 'multichannel_v2 = GAS_GMXXX(' + Blockly.Python.unihikerI2C() + ', 0x08)');
    return ['multichannel_v2.calcVol(multichannel_v2.measure_' + block.getFieldValue("GAS") + '())', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getO2gas = function (block) {
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_UNIHIKER_MODULES.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('readO2', FUNCTIONS_UNIHIKER_MODULES.DEF_O2SENSOR_READ);
    return ['readO2(' + modulePin(block, "PIN", 'ANALOG') + ')', Blockly.Python.ORDER_ATOMIC];
};

const scd30 = () => {
    Blockly.Python.unihikerLibrary('unihiker_scd30', IMPORT_UNIHIKER_SCD30);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('scd30', 'scd30 = SCD30(i2c=' + Blockly.Python.unihikerI2C() + ')');
};

Blockly.Python.sensors_SCD30_readData = function (block) {
    scd30();
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addInit('scd30_data', 'scd30_data = [0, 0, 0]' + NEWLINE + 't_scd = 0');
    Blockly.Python.addFunction('scd30_read', FUNCTIONS_UNIHIKER_MODULES.DEF_SCD30_READ);
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            return moduleTemperature(block, 'scd30_read(1)');
        case "HUM":
            return ['scd30_read(2)', Blockly.Python.ORDER_ATOMIC];
        default:
            return ['scd30_read(0)', Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_SCD30_forcedCalibration = function (block) {
    scd30();
    Blockly.Python.addFunction('scd30_calibrateSensor', FUNCTIONS_UNIHIKER_MODULES.DEF_SCD30_CALIBRATE);
    return 'scd30_calibrateSensor(' + moduleValue(block, "DEFAULT") + ')' + NEWLINE;
};

Blockly.Python.sensors_getParticulateMatter = function (block) {
    Blockly.Python.unihikerLibrary('unihiker_hm330x', IMPORT_UNIHIKER_HM330X);
    Blockly.Python.addInit('hm330x', 'hm3301 = HM330X(i2c=' + Blockly.Python.unihikerI2C() + ')');
    return ['hm3301.getData(' + block.getFieldValue("TYPE") + ')', Blockly.Python.ORDER_ATOMIC];
};

// Sensors - weather

// BME280 at 0x76 (Grove, Enviro:bit, Weather:bit, Kitronik): PinPong driver
const bme280 = (block) => {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_bme280', IMPORT_PINPONG_BME280);
    Blockly.Python.addInit('bme280', 'bme280 = BME280(i2c_addr=0x76)' + NEWLINE + 'bme280.begin()');
    switch (block.getFieldValue("DATA")) {
        case "HUM":
            return ['bme280.humidity()', Blockly.Python.ORDER_ATOMIC];
        case "PRESS":
            return ['bme280.press_pa() / 100', Blockly.Python.ORDER_MULTIPLICATIVE];
        case "ALT":
            return ['bme280.cal_altitudu()', Blockly.Python.ORDER_ATOMIC];
        default:
            return moduleTemperature(block, 'bme280.temp_c()');
    }
};

Blockly.Python.sensors_bme280_getData = bme280;
Blockly.Python.sensors_envirobit_bme280_getData = bme280;
Blockly.Python.sensors_weatherbit_bme280_getData = bme280;
Blockly.Python.sensors_kitronik_bme280_getData = bme280;
Blockly.Python.sensors_kitronik_klimate_bme280_getData = bme280;

Blockly.Python.sensors_getBmp280Data = function (block) {
    const addr = block.getFieldValue("ADDR");
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_bmp280', IMPORT_PINPONG_BMP280);
    Blockly.Python.addInit('bmp280', 'bmp280 = BMP280(i2c_addr=' + addr + ')' + NEWLINE + 'bmp280.begin()');
    switch (block.getFieldValue("DATA")) {
        case "PRESS":
            return ['bmp280.pressure_p()', Blockly.Python.ORDER_ATOMIC];
        case "ALT":
            return ['44330 * (1 - (bmp280.pressure_p() / 101325) ** (1 / 5.255))', Blockly.Python.ORDER_MULTIPLICATIVE];
        default:
            return moduleTemperature(block, 'bmp280.temp_c()');
    }
};

Blockly.Python.sensors_dhtReadData = function (block) {
    Blockly.Python.addImport('pinpong_dht11', IMPORT_PINPONG_DHT11);
    Blockly.Python.addFunction('dht11', FUNCTIONS_UNIHIKER_MODULES.DEF_DHT11);
    const sensor = 'dht11(' + modulePinNumber(block, "PIN") + ')';
    return block.getFieldValue("DATA") === 'HUM' ? [sensor + '.humidity()', Blockly.Python.ORDER_ATOMIC] : moduleTemperature(block, sensor + '.temp_c()');
};

Blockly.Python.sensors_TH02readData = function (block) {
    Blockly.Python.unihikerLibrary('unihiker_th02', IMPORT_UNIHIKER_TH02);
    Blockly.Python.addInit('th02', 'th02 = TH02(i2c=' + Blockly.Python.unihikerI2C() + ')');
    return block.getFieldValue("DATA") === 'HUM' ? ['th02.get_humidity()', Blockly.Python.ORDER_ATOMIC] : moduleTemperature(block, 'th02.get_temperature()');
};

// SHT31 (0x44) and SHT35 (0x45): PinPong driver of the SHT3x sensors
const sht3x = (name, addr) => function (block) {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_sht31', IMPORT_PINPONG_SHT31);
    Blockly.Python.addInit(name, name + ' = SHT31(i2c_addr=' + addr + ')' + NEWLINE + name + '.begin()');
    return block.getFieldValue("DATA") === 'HUM' ? [name + '.humidity()', Blockly.Python.ORDER_ATOMIC] : moduleTemperature(block, name + '.temp_c()');
};

Blockly.Python.sensors_SHT31readData = sht3x('sht31', '0x44');
Blockly.Python.sensors_SHT35readData = sht3x('sht35', '0x45');

Blockly.Python.sensors_barometerReadData = function (block) {
    Blockly.Python.unihikerLibrary('unihiker_hp206c', IMPORT_UNIHIKER_HP206C);
    Blockly.Python.addInit('hp206c', 'hp206c = HP206C(i2c=' + Blockly.Python.unihikerI2C() + ')');
    switch (block.getFieldValue("DATA")) {
        case "PRESS":
            return ["hp206c.get_measurement('pressure')", Blockly.Python.ORDER_ATOMIC];
        case "ALT":
            return ["hp206c.get_measurement('altitude')", Blockly.Python.ORDER_ATOMIC];
        default:
            return moduleTemperature(block, "hp206c.get_measurement('temp_celsius')");
    }
};

Blockly.Python.sensors_mpx5700ap_getPressure = function (block) {
    Blockly.Python.addFunction('mpx5700_readPressure', FUNCTIONS_UNIHIKER_MODULES.DEF_MPX5700AP_GET_PRESSURE);
    return ['mpx5700_readPressure(' + modulePin(block, "PIN", 'ANALOG') + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTemperature = function (block) {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addFunction('getGroveTemperature', FUNCTIONS_UNIHIKER_MODULES.DEF_GROVE_GET_TEMP);
    const unit = { FAHRENHEIT: ", unit='fahrenheit'", KELVIN: ", unit='kelvin'" }[block.getFieldValue("UNIT")] || '';
    return ['getGroveTemperature(' + modulePin(block, "PIN", 'ANALOG') + unit + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveHighTemperature = function (block) {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addConstant('thmc_table', FUNCTIONS_UNIHIKER_MODULES.DEF_GROVE_HIGHTEMP_THMC_TABLE);
    Blockly.Python.addFunction('getThmcTemp', FUNCTIONS_UNIHIKER_MODULES.DEF_GROVE_HIGHTEMP_GET_THMC_TEMP);
    Blockly.Python.addFunction('getRoomTemp', FUNCTIONS_UNIHIKER_MODULES.DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP);
    Blockly.Python.addFunction('K_VtoT', FUNCTIONS_UNIHIKER_MODULES.DEF_GROVE_HIGHTEMP_KVTOT);
    const room = 'tempRoom_' + block.getFieldValue("A0");
    Blockly.Python.addPowerOn('highTemp_' + room, room + ' = getRoomTemp(' + modulePin(block, "A1", 'ANALOG') + ')');
    const code = 'getThmcTemp(' + modulePin(block, "A0", 'ANALOG') + ', ' + room + ')';
    switch (block.getFieldValue("UNIT")) {
        case "FAHRENHEIT":
            return [code + "*9/5 + 32", Blockly.Python.ORDER_ADDITIVE];
        case "KELVIN":
            return [code + " + 273.15", Blockly.Python.ORDER_ADDITIVE];
        default:
            return [code, Blockly.Python.ORDER_ATOMIC];
    }
};

// Sensors - light and sound

Blockly.Python.sensors_getSunlightData = function (block) {
    const version = block.getFieldValue("VERSION") === 'SI1151' ? 'SI1151' : 'SI1145';
    const name = version.toLowerCase();
    Blockly.Python.unihikerLibrary('unihiker_' + name, version === 'SI1151' ? IMPORT_UNIHIKER_SI1151 : IMPORT_UNIHIKER_SI1145);
    Blockly.Python.addInit(name, name + ' = ' + version + '(i2c=' + Blockly.Python.unihikerI2C() + ')');
    // methods of the SI1145 and SI1151 libraries
    const method = { UV: '.read_uv()', IR: '.read_ir()' }[block.getFieldValue("LIGHT")] || '.read_visible()';
    return [name + method, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getUVindex = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('getUVindex', FUNCTIONS_UNIHIKER_MODULES.DEF_GROVE_GET_UV_INDEX);
    return ['getUVindex(' + modulePin(block, "PIN", 'ANALOG') + ')', Blockly.Python.ORDER_ATOMIC];
};

// TCS3472 / TCS34725 color sensor (Grove, Enviro:bit with its LEDs on P8): PinPong driver
const tcs34725 = () => {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_tcs34725', IMPORT_PINPONG_TCS34725);
    Blockly.Python.addInit('tcs3472', 'tcs3472 = TCS34725()' + NEWLINE + 'tcs3472.begin()');
    Blockly.Python.addFunction('tcs3472_rgb', FUNCTIONS_UNIHIKER_MODULES.DEF_TCS3472);
};

Blockly.Python.sensors_colorSensor_getData = function (block) {
    tcs34725();
    return ['tcs3472_rgb()[' + block.getFieldValue("DATA") + ']', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_envirobit_tcs3472_getRGB = Blockly.Python.sensors_colorSensor_getData;

Blockly.Python.sensors_envirobit_tcs3472_getBrightness = function () {
    tcs34725();
    return ['int(tcs3472.get_rgbc()[3] / 65.535)', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_envirobit_tcs3472_setLED = function (block) {
    return Blockly.Python.unihikerPin('P8', 'OUT') + '.write_digital(' + moduleValue(block, "STATE") + ')' + NEWLINE;
};

Blockly.Python.sensors_colorSensorV3_getData = function (block) {
    Blockly.Python.unihikerLibrary('unihiker_veml6040', IMPORT_UNIHIKER_VEML6040);
    Blockly.Python.addInit('veml6040', 'veml6040 = VEML6040(' + Blockly.Python.unihikerI2C() + ')');
    const data = block.getFieldValue("DATA");
    switch (data) {
        case "hue":
        case "sat":
        case "val":
            return ["veml6040.readHSV()['" + data + "']", Blockly.Python.ORDER_ATOMIC];
        case "name":
            return ['veml6040.classifyHue()', Blockly.Python.ORDER_ATOMIC];
        default:
            return ["veml6040.readRGB()['" + data + "']", Blockly.Python.ORDER_ATOMIC];
    }
};

// Enviro:bit microphone on P2
const envirobitSound = () => {
    Blockly.Python.addConstant('ENVIROBIT_SOUND_OFFSET', 'ENVIROBIT_SOUND_OFFSET = 580');
    Blockly.Python.unihikerPin('P2', 'ANALOG');
    Blockly.Python.addFunction('envirobit_readSound', FUNCTIONS_UNIHIKER_MODULES.DEF_ENVIROBIT_READ_SOUND);
};

Blockly.Python.sensors_envirobit_getSoundLevel = function () {
    envirobitSound();
    return ['envirobit_readSound()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_envirobit_waitForClaps = function (block) {
    envirobitSound();
    Blockly.Python.addImport('time', IMPORT_TIME);
    const duration = moduleValue(block, "DURATION", '1');
    if (block.getFieldValue("CLAPS") === '2') {
        Blockly.Python.addFunction('envirobit_waitForDoubleClap', FUNCTIONS_UNIHIKER_MODULES.ENVIROBIT_WAIT_FOR_DOUBLE_CLAP);
        return ['envirobit_waitForDoubleClap(timeout=' + duration + '*1000)', Blockly.Python.ORDER_ATOMIC];
    }
    Blockly.Python.addFunction('envirobit_waitForClap', FUNCTIONS_UNIHIKER_MODULES.ENVIROBIT_WAIT_FOR_CLAP);
    return ['envirobit_waitForClap(timeout=' + duration + '*1000)', Blockly.Python.ORDER_ATOMIC];
};

// Weather:bit: anemometer on P8, wind vane on P1, rain gauge on P2, soil moisture on P0
const pulseIn = () => {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('pulseIn', FUNCTIONS_UNIHIKER_MODULES.DEF_IO_PULSE_IN);
};

Blockly.Python.sensors_weatherbit_anemometer_getSpeed = function (block) {
    pulseIn();
    Blockly.Python.addFunction('anemometer_getWindSpeed', FUNCTIONS_UNIHIKER_MODULES.DEF_ANEMOMETER_GET_WIND_SPEED);
    const unit = { KNOT: 'knot', KM_H: 'km/h', INCH_S: 'inch/s' }[block.getFieldValue("UNIT")] || 'm/s';
    return ['anemometer_getWindSpeed(' + Blockly.Python.unihikerPin('P8', 'PULL_UP') + ", unit='" + unit + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_weatherbit_weathercock_getDirection = function () {
    Blockly.Python.addFunction('weathercock_getDirection', FUNCTIONS_UNIHIKER_MODULES.DEF_WEATHERCOCK_GET_DIRECTION);
    return ['weathercock_getDirection(' + Blockly.Python.unihikerPin('P1', 'ANALOG') + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_weatherbit_rainGauge_getDumps = function () {
    pulseIn();
    Blockly.Python.addConstant('RAIN_HEIGHT_RATIO', 'RAIN_HEIGHT_RATIO = 0.2794');
    Blockly.Python.addInit('rainGauge_dumps', 'rainGauge_dumps = 0');
    Blockly.Python.addFunction('rainGauge_getDumps', FUNCTIONS_UNIHIKER_MODULES.DEF_RAIN_GAUGE_GET_DUMPS);
    return ['rainGauge_getDumps(' + Blockly.Python.unihikerPin('P2', 'PULL_UP') + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_weatherbit_getSoilMoisture = function () {
    return [Blockly.Python.unihikerPin('P0', 'ANALOG') + '.read_analog()', Blockly.Python.ORDER_ATOMIC];
};

// Sensors - distance and movement

Blockly.Python.sensors_getGroveUltrasonicRanger = function (block) {
    const grove = block.getFieldValue("SENSOR") !== 'HC-SR04';
    const trig = modulePinNumber(block, grove ? "PIN" : "TRIG");
    const echo = modulePinNumber(block, grove ? "PIN" : "ECHO");
    Blockly.Python.addImport('pinpong_sr04', IMPORT_PINPONG_SR04);
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_UNIHIKER_MODULES.DEF_ULTRASONIC);
    const data = block.getFieldValue("DATA") === 'TIME' ? 'duration' : 'distance';
    return ['getUltrasonicData(' + trig + ', ' + echo + ", '" + data + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_VL53L0X_getRangeMillimeters = function (block) {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_vl53l0', IMPORT_PINPONG_VL53L0);
    Blockly.Python.addInit('vl53l0x', 'vl53l0x = VL53L0()' + NEWLINE + 'vl53l0x.begin()');
    const divider = { Centimeter: ' / 10', Meter: ' / 1000' }[block.getFieldValue("UNIT")] || '';
    return ['vl53l0x.get_distance_mm()' + divider, divider ? Blockly.Python.ORDER_MULTIPLICATIVE : Blockly.Python.ORDER_ATOMIC];
};

// PAJ7620 gesture sensor: PinPong driver
const gesture = () => {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_paj7620', IMPORT_PINPONG_PAJ7620);
    Blockly.Python.addInit('gesture', 'gesture = PAJ7620U2()');
    Blockly.Python.addFunction('readGesture', FUNCTIONS_UNIHIKER_MODULES.DEF_GESTURE);
};

Blockly.Python.sensors_getGesture = function () {
    gesture();
    return ['readGesture()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_onGestureTypeDetected = function (block) {
    gesture();
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if readGesture() == '" + block.getFieldValue("GESTURE") + "':" + NEWLINE + branchCode;
};

// Sensors - others

Blockly.Python.sensors_getGroveButton = function (block) {
    const code = modulePin(block, "PIN", 'IN') + '.read_digital()';
    return block.getFieldValue("TYPE") === 'VOLT' ? [code + '*3.3', Blockly.Python.ORDER_MULTIPLICATIVE] : [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getEarClipHeartRate = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('read_heart_rate', FUNCTIONS_UNIHIKER_MODULES.DEF_READ_HEART_RATE);
    return ['read_heart_rate(' + modulePin(block, "PIN", 'PULL_UP') + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getWaterLevel = function () {
    Blockly.Python.unihikerLibrary('unihiker_water_level', IMPORT_UNIHIKER_WATER_LEVEL);
    return ['water_level.measurePercentLevel(' + Blockly.Python.unihikerI2C() + ')', Blockly.Python.ORDER_ATOMIC];
};

// Actuators - servomotors (PinPong Servo) and motors

const servo = (pinNumber) => {
    Blockly.Python.addImport('pinpong_servo', IMPORT_PINPONG_SERVO);
    Blockly.Python.addFunction('servo', FUNCTIONS_UNIHIKER_MODULES.DEF_SERVO);
    return 'servo(' + pinNumber + ')';
};

Blockly.Python.actuators_setServoAngle = function (block) {
    return servo(modulePinNumber(block, "PIN")) + '.write_angle(' + moduleValue(block, "ANGLE") + ')' + NEWLINE;
};

Blockly.Python.actuators_continuousServo_setSpeed = function (block) {
    servo(modulePinNumber(block, "PIN"));
    Blockly.Python.addFunction('setServoSpeed', FUNCTIONS_UNIHIKER_MODULES.DEF_SERVO_SET_SPEED);
    return 'setServoSpeed(' + modulePinNumber(block, "PIN") + ', ' + block.getFieldValue("DIR") + ', ' + moduleValue(block, "SPEED") + ')' + NEWLINE;
};

Blockly.Python.actuators_setFanPower = function (block) {
    return modulePin(block, "PIN", 'PWM') + '.write_analog(' + moduleValue(block, "POWER") + ')' + NEWLINE;
};

Blockly.Python.actuators_mosfet_setState = function (block) {
    return modulePin(block, "PIN", 'PWM') + '.write_analog(1023 if ' + moduleValue(block, "STATE") + ' else 0)' + NEWLINE;
};

Blockly.Python.actuators_mosfet_setPercentValue = function (block) {
    return modulePin(block, "PIN", 'PWM') + '.write_analog(int(1023 * ' + moduleValue(block, "VALUE") + ' / 100))' + NEWLINE;
};

// ULN2003 stepper motor (library of the micro:bit, pins driven by PinPong)
Blockly.Python.actuators_stepperMotor_uln2003driver_init = function (block) {
    const pins = ['IN1', 'IN2', 'IN3', 'IN4'].map(name => modulePinNumber(block, name)).join(', ');
    Blockly.Python.unihikerLibrary('unihiker_stepper', IMPORT_UNIHIKER_STEPPER);
    Blockly.Python.addInit('StepperMotor' + block.getFieldValue("MOTOR"), 'motor' + block.getFieldValue("MOTOR") + ' = StepperMotor(' + pins + ')');
    return '';
};

Blockly.Python.actuators_stepperMotor_uln2003driver_moveSteps = function (block) {
    const motor = 'motor' + block.getFieldValue("MOTOR");
    const move = block.getFieldValue("DIR") === '-1' ? '.moveAntiClockwise(' : '.moveClockwise(';
    return motor + move + moduleValue(block, "STEPS") + ', ' + motor + '.' + block.getFieldValue("UNIT") + ')' + NEWLINE;
};

Blockly.Python.actuators_stepperMotor_uln2003driver_setDelay = function (block) {
    return 'motor' + block.getFieldValue("MOTOR") + '.setDelay(' + moduleValue(block, "DELAY") + ')' + NEWLINE;
};

// Kitronik: motor driver board (P8/P12 and P0/P16), servo board (PCA9685 at 0x6A, PinPong driver), buzzer of the
// Klip motor on P12
Blockly.Python.actuators_kitronik_controlMotor = function (block) {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addFunction('pin', FUNCTIONS_UNIHIKER.DEF_PIN);
    Blockly.Python.addFunction('kitronik_motors', FUNCTIONS_UNIHIKER_MODULES.DEF_KITRONIK_CONTROL_MOTOR);
    const args = ', ' + block.getFieldValue("DIR") + ', ' + moduleValue(block, "SPEED") + ')' + NEWLINE;
    const motor = block.getFieldValue("MOTOR");
    return motor === 'BOTH' ? 'kitronik_controlMotor(1' + args + 'kitronik_controlMotor(2' + args : 'kitronik_controlMotor(' + motor + args;
};

Blockly.Python.actuators_kitronik_stopMotor = function (block) {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addFunction('pin', FUNCTIONS_UNIHIKER.DEF_PIN);
    Blockly.Python.addFunction('kitronik_motors', FUNCTIONS_UNIHIKER_MODULES.DEF_KITRONIK_CONTROL_MOTOR);
    const motor = block.getFieldValue("MOTOR");
    return motor === 'BOTH' ? 'kitronik_stopMotor(1)' + NEWLINE + 'kitronik_stopMotor(2)' + NEWLINE : 'kitronik_stopMotor(' + motor + ')' + NEWLINE;
};

Blockly.Python.actuators_kitronikShield_setServoAngle = function (block) {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('pinpong_pca9685', IMPORT_PINPONG_PCA9685);
    Blockly.Python.addInit('kitronik-servoBoard', 'servoBoard = PCA9685(i2c_addr=0x6A)' + NEWLINE + 'servoBoard.set_freq(50)');
    Blockly.Python.addFunction('kitronik_servoWrite', FUNCTIONS_UNIHIKER_MODULES.DEF_KITRONIK_SERVO);
    return 'kitronik_servoWrite(' + moduleValue(block, "SERVO", '1') + ', ' + moduleValue(block, "ANGLE") + ')' + NEWLINE;
};

// Buzzer of a pin (PinPong Tone, PWM pins only)
const tone = (pinName, frequency, duration) => {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('pinpong_tone', IMPORT_PINPONG_TONE);
    Blockly.Python.addFunction('tone', FUNCTIONS_UNIHIKER_MODULES.DEF_TONE);
    return 'tone(Pin.' + pinName + ', ' + frequency + ', ' + duration + ')' + NEWLINE;
};

Blockly.Python.actuators_kitronik_playFrequency = function (block) {
    return tone('P12', moduleValue(block, "FREQUENCY"), moduleValue(block, "DURATION"));
};

// Access:bit: barrier servomotor on P0, buzzer on P1
Blockly.Python.actuators_controlAccessBitBarrier = function (block) {
    Blockly.Python.unihikerBoard();
    return servo('Pin.P0') + '.write_angle(' + (block.getFieldValue("ACTION") === 'RAISE' ? 0 : 65) + ')' + NEWLINE;
};

Blockly.Python.actuators_controlAccessBitBuzzer = function (block) {
    return tone('P1', 440, moduleValue(block, "VALUE"));
};

// Reka:bit (library of the micro:bit, I2C at 0x08)
const rekabit = () => {
    Blockly.Python.unihikerLibrary('unihiker_rekabit', IMPORT_UNIHIKER_REKABIT);
    Blockly.Python.addInit('rekabit', 'rekabit.init(' + Blockly.Python.unihikerI2C() + ')');
};

Blockly.Python.actuators_rekabit_runMotor = function (block) {
    rekabit();
    return 'rekabit.run_motor(rekabit.Motor_' + block.getFieldValue("MOTOR") + ', rekabit.Direction_' + block.getFieldValue("DIR") + ', ' + moduleValue(block, "SPEED") + ')' + NEWLINE;
};

Blockly.Python.actuators_rekabit_setServoPosition = function (block) {
    rekabit();
    return 'rekabit.sets_servo_position(rekabit.Servo_' + block.getFieldValue("SERVO") + ', ' + moduleValue(block, "ANGLE") + ')' + NEWLINE;
};

// DFRobot micro:Driver DFR0548 (library of the micro:bit: the PinPong driver has no 28BYJ-48 stepper)
const dfr0548 = () => {
    Blockly.Python.unihikerLibrary('unihiker_dfr0548', IMPORT_UNIHIKER_DFR0548);
    Blockly.Python.addInit('dfr0548', 'dfr0548.init(' + Blockly.Python.unihikerI2C() + ')');
};

Blockly.Python.actuators_dfr0548_setServoAngle = function (block) {
    dfr0548();
    return 'dfr0548.servo(' + block.getFieldValue("SERVO") + ', ' + moduleValue(block, "ANGLE") + ')' + NEWLINE;
};

Blockly.Python.actuators_dfr0548_runMotor = function (block) {
    dfr0548();
    return 'dfr0548.motor_run(' + block.getFieldValue("MOTOR") + ', ' + block.getFieldValue("DIR") + ', ' + moduleValue(block, "SPEED") + ')' + NEWLINE;
};

Blockly.Python.actuators_dfr0548_stopMotor = function (block) {
    dfr0548();
    const motor = block.getFieldValue("MOTOR");
    return (motor === 'ALL' ? 'dfr0548.stop_all()' : 'dfr0548.motor_stop(' + motor + ')') + NEWLINE;
};

Blockly.Python.actuators_dfr0548_stepper = function (block) {
    dfr0548();
    return 'dfr0548.stepper(' + block.getFieldValue("TYPE") + ', ' + block.getFieldValue("STEPPER") + ', ' + block.getFieldValue("DIR") + ', ' + moduleValue(block, "DEGREES") + ')' + NEWLINE;
};

Blockly.Python.actuators_dfr0548_stepperDual = function (block) {
    dfr0548();
    return 'dfr0548.stepper_dual(' + block.getFieldValue("TYPE") + ', ' + block.getFieldValue("DIR1") + ', ' + moduleValue(block, "DEGREES1") + ', '
        + block.getFieldValue("DIR2") + ', ' + moduleValue(block, "DEGREES2") + ')' + NEWLINE;
};
