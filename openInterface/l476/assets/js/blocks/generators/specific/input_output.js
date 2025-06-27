/**
 * @fileoverview Input/Output generators for STM32.
 */

// STM32

Blockly.Python.io_pause = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return "utime.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "utime.sleep_ms(" + duration + ")" + NEWLINE;
        case "MICRO":
            return "utime.sleep_us(" + duration + ")" + NEWLINE;
        default:
            return "sleep(" + duration + ")" + NEWLINE;
    }
};

Blockly.Python.io_waitUntil = function (block) {
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC) || "True";;
    return "while not " + condition + ":" + NEWLINE + "  pass" + NEWLINE;
};

Blockly.Python.io_initChronometer = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
    block.workspace.createVariable('t0');
    return "" + NEWLINE;
};

Blockly.Python.io_initChronometer_simple = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    return ["time.ticks_ms()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    // Remove the following line to avoid duplicated constant definition with python traduction
    // Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
    block.workspace.createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["utime.ticks_diff(utime.ticks_ms(), t0)/1e3", Blockly.Python.ORDER_ATOMIC];
        case "MILLI":
            return ["utime.ticks_diff(utime.ticks_ms(), t0)", Blockly.Python.ORDER_ATOMIC];
        case "MICRO":
            return ["utime.ticks_diff(utime.ticks_ms(), t0)/1e-3", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.io_smt32_onSwitchButtonState = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addInit('button_1', "button_b1 = pyb.Pin('PC13')");
    Blockly.Python.addInit('button_b1_init', "button_b1.init(pyb.Pin.IN, pyb.Pin.PULL_UP, af=-1)");
    switch (block.getFieldValue("STATE")) {
        case "PRESSED":
            return "if not button_b1.value():" + NEWLINE + branchCode;
        case "RELEASED":
            return "if button_b1.value():" + NEWLINE + branchCode;
    }
};

Blockly.Python.io_smt32_getSwitchState = function () {
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addInit('button_b1', "button_b1 = pyb.Pin('PC13')");
    Blockly.Python.addInit('button_b1_init', "button_b1.init(pyb.Pin.IN, pyb.Pin.PULL_UP, af=-1)");
    return ["button_b1.value()", Blockly.Python.ORDER_ATOMIC];
};

// Pins

Blockly.Python.io_digital_signal = function (block) {
    return ["HIGH" == block.getFieldValue("BOOL") ? '1' : '0', Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.io_readDigitalPin = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"));
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeDigitalPin = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"));
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && (inputBlock.type == "io_digital_signal")) {
        return (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE;
    } else {
        return pinName + '.value(' + state + ')' + NEWLINE;
    }
};

Blockly.Python.io_readAnalogPin = function (block) {
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"));
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writePwm = function (block) {
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    const pin = block.getFieldValue("PIN");
    var value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    if (value < 0) {
        value = 0;
    }
    else if (value >= 256) {
        value = 255;
    }
    return NEWLINE
        + 'pwm_' + pinName + '.pulse_width(int(' + value + '))' + NEWLINE;
};

// Blockly.Python.io_writeAnalogPin = function (block) {
//     const pin = block.getFieldValue("PIN") || Blockly.Constants.Pins.DAC[Blockly.Constants.getSelectedBoard()][0][1];
//     const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
//     Blockly.Python.addInit(pin + '_DAC', pin + " = DAC(Pin(" + pin.replace('p', '') + "))");
//     return pin + ".write(int(" + value + "))" + NEWLINE;
// };

Blockly.Python.io_setPwm = function (block) {
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    const pin = block.getFieldValue("PIN");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    return NEWLINE
        + 'tim_' + pinName + ".freq(" + freq + ")" + NEWLINE
        + 'pwm_' + pinName + ".pulse_width(128)" + NEWLINE;
};

Blockly.Python.io_stopPwm = function (block) {
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    const pin = block.getFieldValue("PIN") || Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()][0][1];
    const pinName = Blockly.Python.Generators.pwm(pin);
    return "pwm_" + pinName + ".pulse_width_percent(0)" + NEWLINE;
};


Blockly.Python.io_getVoltage = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return [value + "/" + block.getFieldValue("BITS") + "*3.3", Blockly.Python.ORDER_ATOMIC]
};

// External modules

Blockly.Python.io_getGroveSwitch = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Switch Button');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveButton = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Simple Button');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveThumbJoystick = function (block) {
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    const axis = block.getFieldValue("AXIS");
    switch (axis) {
        case "X":
            const pinXName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN_X"), 'Joystick X-Axis');
            return [pinXName + ".read()", Blockly.Python.ORDER_ATOMIC];
        case "Y":
            const pinYName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN_Y"), 'Joystick Y-Axis');
            return [pinYName + ".read()", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled axis option for Joystick module:'" + axis + "'");
    }
};

Blockly.Python.io_getGroveTactile = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Touch Button');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveRotaryAngle = function (block) {
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Potentiometer');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveSlidePotentiometer = function (block) {
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Potentiometer');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveColoredButton = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Colored Button / read');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_setGroveColoredButton = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Colored Button W');
    return 'try:' + NEWLINE
        + '  ' + (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE
        + 'except:' + NEWLINE
        + '  ' + (state == '1' ? pinName + ".value(1)" : pinName + ".value(0)") + NEWLINE;
};

Blockly.Python.io_getKeypadNumber = function (block) {
    const moduleName = 'keypad';
    const busUart = block.getFieldValue("UART");
    switch (busUart) {
        case "1":
            Blockly.Python.addInit('RX_TX', '#UART bus 1 connected on RX D14 and TX D2')
            break;
        case "2":
            Blockly.Python.addInit('RX_TX', '#UART bus 2 connected on RX D0 and TX D1')
            break;
    }
    Blockly.Python.addInit('init_one_uart_module', moduleName + " = machine.UART(" + busUart + ", baudrate=9600)");
    Blockly.Python.addFunction('getKeypadNumber', FUNCTIONS_L476.DEF_KEYPAD_GET_NUMBER);
    return ["getKeypadNumber(" + moduleName + ")", Blockly.Python.ORDER_ATOMIC];
};
