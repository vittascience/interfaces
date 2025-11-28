/**
 * @fileoverview Inputs/Outputs generators for Arduino.
 */

Blockly.Arduino.io_wait = function (block) {
    const wait = Blockly.Arduino.valueToCode(block, "TIME", Blockly.Arduino.ORDER_ATOMIC);
    const unit = block.getFieldValue("UNIT");
    switch (unit) {
        case "SECOND":
            return "delay(1000*" + wait + ");" + NEWLINE;
        case "MILLI":
            return "delay(" + wait + ");" + NEWLINE;
        case "MICRO":
            return "delayMicroseconds(" + wait + ");" + NEWLINE;
        default:
            throw Error("Unhandled delay option: " + unit);
    }
};

Blockly.Arduino.io_waitUntil = function (block) {
    const condition = Blockly.Arduino.valueToCode(block, "UNTIL", Blockly.Arduino.ORDER_ATOMIC);
    return "while (!" + condition + " ) {}" + NEWLINE;
};

Blockly.Arduino.io_initChronometer = function (block) {
    Blockly.Arduino.addDeclaration('declaration_init_chrono', "float t0 = 0;");
    block.workspace.createVariable('t0');
    return "t0 = millis();" + NEWLINE;
};

Blockly.Arduino.io_getChronometer = function (block) {
    Blockly.Arduino.addDeclaration('declaration_init_chrono', "float t0 = 0;");
    block.workspace.createVariable('t0');
    return ["(millis()-t0)/" + block.getFieldValue("UNIT"), Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_getChronometer_simple = function (block) {
    return ["millis()", Blockly.Arduino.ORDER_ATOMIC]
};

// GROVE KEYPAD _ READ VALUE BLOCK ON PIN A BLOCK
//http://wiki.seeedstudio.com/Grove-12-Channel-Capacitive-Touch-Keypad-ATtiny1616-/
Blockly.Arduino.io_getKeypadNumber = function (block) {
    const pinRX = block.getFieldValue("RX");
    const pinTX = block.getFieldValue("TX");
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addDeclaration('init_keypad', "SoftwareSerial keypad(" + pinTX + ", " + pinRX + ");");
    Blockly.Arduino.addFunction('func_get_keypad', FUNCTIONS_ARDUINO.DEF_KEYPAD_GETNUMBER);
    Blockly.Arduino.addSetup('setup_keypad', "keypad.begin(9600);");
    return ["getKeypadNumber()", Blockly.Arduino.ORDER_ATOMIC]
};

// GROVE THUMB JOYSTICK _ READ VALUE BLOCK ON PIN A BLOCK
// http://wiki.seeedstudio.com/Grove-Thumb_Joystick/ 
Blockly.Arduino.io_getGroveThumbJoystick = function (block) {
    const axis = block.getFieldValue("AXIS");
    switch (axis) {
        case "X":
            const pinConstantX = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN_X"), 'Joystick X_Axis');
            return ["analogRead(" + pinConstantX + ")", Blockly.Arduino.ORDER_ATOMIC];
        case "Y":
            const pinConstantY = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN_Y"), 'Joystick Y_Axis');
            return ["analogRead(" + pinConstantY + ")", Blockly.Arduino.ORDER_ATOMIC];
        default:
            throw Error("Unhandled axis option for Joystick module:'" + axis + "'");
    }
};

// READ ANALOG POTENTIOMETER ON PIN A BLOCK
// http://wiki.seeedstudio.com/Grove-Slide_Potentiometer/
Blockly.Arduino.io_getGroveSlidePotentiometer = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinConstant = Blockly.Arduino.Generators.analog_read(pin, "Potentiometer", false);
    return ["analogRead(" + pinConstant + ")", Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE ROTARY ANGLE SENSOR _ READ VALUE BLOCK ON PIN A BLOCK
// http://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/
Blockly.Arduino.io_getGroveRotaryAngle = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinConstant = Blockly.Arduino.Generators.analog_read(pin, "Potentiometer", false);
    return ["analogRead(" + pinConstant + ")", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_getGroveEncoderValue = function () {
    const pin = "2"; // Grove Encoder is only supported on pin D2 due to interrupt requirements
    const objName = 'encoder_' + pin;
    Blockly.Arduino.addInclude('encoder', INCLUDE_GROVE_ENCODER);
    Blockly.Arduino.addDeclaration(objName, "GroveEncoder " + objName + "(" + pin + ", NULL);");
    return [objName + ".getValue()", Blockly.Arduino.ORDER_ATOMIC];
};

// READ TACTILE STATEMENT ON PIN D BLOCK
Blockly.Arduino.io_getGroveTactile = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinConstant = Blockly.Arduino.Generators.digital_read(pin, "Touch Button");
    return ["digitalRead(" + pinConstant + ")", Blockly.Arduino.ORDER_ATOMIC];
};

// READ PUSH BUTTON STATEMENT ON PIN D BLOCK
Blockly.Arduino.io_getGroveButton = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinConstant = Blockly.Arduino.Generators.digital_read(pin, "Simple Button");
    return ["digitalRead(" + pinConstant + ")", Blockly.Arduino.ORDER_ATOMIC];
};

// READ REVERSED BUTTON STATEMENT ON PIN D BLOCK
Blockly.Arduino.io_getReversedButton = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinConstant = Blockly.Arduino.Generators.digital_read(pin, "Simple Button Reversed");
    return ["!digitalRead(" + pinConstant + ")", Blockly.Arduino.ORDER_ATOMIC];
};

// READ SWITCH STATEMENT VALUE ON PIN D BLOCK
Blockly.Arduino.io_getGroveSwitch = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinConstant = Blockly.Arduino.Generators.digital_read(pin, "Switch Button");
    return ["digitalRead(" + pinConstant + ")", Blockly.Arduino.ORDER_ATOMIC];
};

// Pins

Blockly.Arduino.io_led_builtin = function (block) {
    return ["LED_BUILTIN", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_digital_signal = function (block) {
    return [block.getFieldValue("STATE"), Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_readDigitalPin = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', INPUT);');
    return ["digitalRead(" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_readDigitalPin_input = function (block) {
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    return ["digitalRead(" + value + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_writeDigitalPin = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return "digitalWrite(" + pin + ", " + state + ");" + NEWLINE;
};

Blockly.Arduino.io_writeDigitalPin_input = function (block) {
    const pin = Blockly.Arduino.valueToCode(block, "PIN", Blockly.Arduino.ORDER_ATOMIC) || '0';
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return "digitalWrite(" + pin + ", " + state + ");" + NEWLINE;
};

Blockly.Arduino.io_readAnalogPin = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', INPUT);');
    return ["analogRead(" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_readAnalogPin_input = function (block) {
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    return ["analogRead(" + value + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_writeAnalogPin = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return "analogWrite(" + pin + ", " + value + ");" + NEWLINE;
};

Blockly.Arduino.io_writeAnalogPin_input = function (block) {
    const pin = Blockly.Arduino.valueToCode(block, "PIN", Blockly.Arduino.ORDER_ATOMIC) || '0';
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return "analogWrite(" + pin + ", " + value + ");" + NEWLINE;
};

Blockly.Arduino.io_setPwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const cycle = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    const value = Math.round(cycle * 255 / 100);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return isNaN(value) ? "analogWrite(" + pin + ", " + cycle + ");" + NEWLINE : "analogWrite(" + pin + ", " + value + ");" + NEWLINE;
};

Blockly.Arduino.io_readPulseIn = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'HIGH';
    return ["pulseIn(" + pin + ", " + state + ")", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_attachInterrupt = function (block) {
    const pin = block.getFieldValue("PIN");
    const edge = block.getFieldValue("EDGE");
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    const funcName = "onEvent_pin" + pin;
    Blockly.Arduino.addFunction(funcName, "void " + funcName + "() {" + NEWLINE + branchCode + "}");
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', INPUT_PULLUP);');
    Blockly.Arduino.addSetup('interrupt_' + pin, "attachInterrupt(digitalPinToInterrupt(" + pin + "), " + funcName + ", " + edge + ");");
    return "";
};

// io - mp3
Blockly.Arduino.io_groveMp3_init = function (block) {
    const VERSIONS = {
        'V2': 'KT403A',
        'V3': 'WT2003S',
        'V4': 'WT2605C'
    };
    const pinRX = block.getFieldValue("RX");
    const pinTX = block.getFieldValue("TX");
    const version = block.getFieldValue("VERSION");
    Blockly.Arduino.addInclude('SeeedGroveMP3', INCLUDE_SEEED_GROVE_MP3);
    const boardId = Blockly.Constants.getSelectedBoard() || BOARD_DEFAULT;
    let comSerial = '';
    const mp3 = `Mp3Player_${version}`;
    if (boardId == BOARD_ARDUINO_UNO_R4_WIFI) {
        comSerial = 'Serial1';
        Blockly.Arduino.addDeclaration(mp3, `${VERSIONS[version]}<HardwareSerial> ${mp3};`);
    } else {
        comSerial = `Serial_MP3_${version}`;
        const pinRX_v = `PIN_MP3_${version}_RX`;
        const pinTX_v = `PIN_MP3_${version}_TX`;
        Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
        Blockly.Arduino.addDefine(pinRX_v, `#define ${pinRX_v}` + TAB + pinRX + " // RX on module");
        Blockly.Arduino.addDefine(pinTX_v, `#define ${pinTX_v}` + TAB + pinTX + " // TX on module");
        Blockly.Arduino.addDeclaration(comSerial, `SoftwareSerial ${comSerial}(${pinTX_v}, ${pinRX_v}); // RX, TX -> inversion des broches`);
        Blockly.Arduino.addDeclaration(mp3, `${VERSIONS[version]}<SoftwareSerial> ${mp3};`);
    }
    if (version == 'V3') {
        Blockly.Arduino.addCodeVariable('spi_flash_songs', "uint32_t spi_flash_songs = 0;");
        Blockly.Arduino.addCodeVariable('sd_songs', "uint32_t sd_songs = 0;");
        Blockly.Arduino.addCodeVariable('workdisk', "WT2003S_STORAGE workdisk = WT2003S_SD;");
        Blockly.Arduino.addCodeVariable('Play_history', FUNCTIONS_ARDUINO.DECLARE_STRUCT_MP3_PLAY_HISTORY);
        Blockly.Arduino.addFunction('readSongName', FUNCTIONS_ARDUINO.DEF_MP3_READ_SONG_NAME);
        Blockly.Arduino.addFunction('getAllSong', FUNCTIONS_ARDUINO.DEF_MP3_GET_ALL_SONG);
        Blockly.Arduino.addSetup(comSerial + '_begin', `${comSerial}.begin(9600);`);
        Blockly.Arduino.addSetup(`${mp3}_init`, `${mp3}.init(${comSerial});`);
        Blockly.Arduino.addSetup('setup_songs', 'getAllSong();');
    } else if (version == 'V4') {
        Blockly.Arduino.addSetup(comSerial + '_begin', `${comSerial}.begin(115200);`);
        Blockly.Arduino.addSetup(`${mp3}_init`, `${mp3}.init(${comSerial});`);
    }
    return "";
};

Blockly.Arduino.io_groveMp3_play_pause = function (block) {
    const version = block.getFieldValue("VERSION");
    const mp3 = `Mp3Player_${version}`;
    return `${mp3}.pause_or_play();` + NEWLINE;
};

Blockly.Arduino.io_groveMp3_next = function (block) {
    const version = block.getFieldValue("VERSION");
    const mp3 = `Mp3Player_${version}`;
    const dir = block.getFieldValue("DIRECTION");
    if (dir == 'PREVIOUS') {
        return `${mp3}.previous();` + NEWLINE;
    } else {
        return `${mp3}.next();` + NEWLINE;
    }
};

Blockly.Arduino.io_groveMp3_getVolume = function (block) {
    const version = block.getFieldValue("VERSION");
    const mp3 = `Mp3Player_${version}`;
    return [`${mp3}.getVolume()`, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_groveMp3_setVolume = function (block) {
    const volume = Blockly.Arduino.valueToCode(block, "VOLUME", Blockly.Arduino.ORDER_ATOMIC) || '0';
    const version = block.getFieldValue("VERSION");
    const mp3 = `Mp3Player_${version}`;
    return `${mp3}.volume(${volume});` + NEWLINE;
};

Blockly.Arduino.io_groveMp3_playSDSong = function (block) {
    const name = Blockly.Arduino.valueToCode(block, "NAME", Blockly.Arduino.ORDER_ATOMIC) || '';
    const version = block.getFieldValue("VERSION");
    const mp3 = `Mp3Player_${version}`;
    return `${mp3}.playSDSong(${name});` + NEWLINE;
};

Blockly.Arduino.io_groveMp3_playSDDirectorySong = function (block) {
    const directory = Blockly.Arduino.valueToCode(block, "DIRECTORY", Blockly.Arduino.ORDER_ATOMIC) || '';
    const index = Blockly.Arduino.valueToCode(block, "INDEX", Blockly.Arduino.ORDER_ATOMIC) || '';
    const version = block.getFieldValue("VERSION");
    const mp3 = `Mp3Player_${version}`;
    return `${mp3}.playSDDirectorySong(${directory}, ${index});` + NEWLINE;
};

Blockly.Arduino.io_groveMp3_changePlayingMode = function (block) {
    const VERSIONS = {
        'V2': 'KT403A',
        'V3': 'WT2003S',
        'V4': 'WT2605C'
    };
    const mode = block.getFieldValue('PLAY_MODE');
    const version = block.getFieldValue("VERSION");
    const mp3 = `Mp3Player_${version}`;
    if (version == 'V2') {
        if (mode == 'CYCLE') {
            return `${mp3}.loop(1);` + NEWLINE;
        } else if (mode == 'SINGLE_CYCLE') {
            return `${mp3}.repeat(1);` + NEWLINE;
        }
    } else {
        return `${mp3}.playMode(${VERSIONS[version]}_${mode});` + NEWLINE;
    }
};