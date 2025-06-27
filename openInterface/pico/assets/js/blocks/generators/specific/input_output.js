/**
 * @fileoverview Input/Output generators for Raspberry Pi Pico.
 */

// Time

Blockly.Python.io_pause = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    const unit = block.getFieldValue("UNIT");
    Blockly.Python.addImport("utime", IMPORT_UTIME);
    switch (unit) {
        case "SECOND":
            return "utime.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "utime.sleep_ms(" + duration + ")" + NEWLINE;
        case "MICRO":
            return "utime.sleep_us(" + duration + ")" + NEWLINE;
        default:
            return "utime.sleep_ms(" + duration + ")" + NEWLINE;
    }
};

Blockly.Python.io_waitUntil = function (block) {
    let condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC);
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

// Pins

Blockly.Python.io_digital_signal = function (block) {
    return ["HIGH" == block.getFieldValue("BOOL") ? 1 : 0, Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.io_readDigitalPin = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"));
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeDigitalPin = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"));
    return pinName + ".value(" + state + ")" + NEWLINE;
};

Blockly.Python.io_readAnalogPin = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"));
    return [pinName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeAnalogPin = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    return pinName + ".write(int(" + value + "))" + NEWLINE;
};

Blockly.Python.io_setPwm = function (block) {
    let period = Blockly.Python.valueToCode(block, "PERIOD", Blockly.Python.ORDER_NONE) || "0";
    let pin = block.getFieldValue("PIN");
    let unit = block.getFieldValue("UNIT");
    switch (unit) {
        case "MS":
            if (period * 1000 < 256) period = 256;
            return pin + ".set_analog_period(" + period + ")" + NEWLINE;
        case "US":
            if (period < 256) period = 256;
            return pin + ".set_analog_period_microseconds(" + period + ")" + NEWLINE;
    }
};

Blockly.Python.io_writePwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    return pinName + '.duty_u16(int(' + value + '))' + NEWLINE
};

Blockly.Python.io_readPulseIn = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('pulseIn', FUNCTIONS_PICO.DEF_IO_PULSE_IN);
    var state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return ["pulseIn(" + block.getFieldValue("PIN") + ", " + state + ")", Blockly.Python.ORDER_ATOMIC];
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
    const axis = block.getFieldValue("AXIS");
    switch (axis) {
        case "X":
            const pinXName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN_X"), 'Joystick X-Axis');
            return [pinXName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
        case "Y":
            const pinYName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN_Y"), 'Joystick Y-Axis');
            return [pinYName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled axis option for Joystick module:'" + axis + "'");
    }
};

Blockly.Python.io_getGroveTactile = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Touch Button');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveRotaryAngle = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Potentiometer');
    return [pinName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveSlidePotentiometer = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Potentiometer');
    return [pinName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveColoredButton = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Colored Button / read');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_setGroveColoredButton = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Colored Button W');
    return pinName + ".value(" + state + ")";
};