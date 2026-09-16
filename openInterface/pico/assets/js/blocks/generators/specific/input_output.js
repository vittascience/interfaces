/**
 * @fileoverview Input/Output generators for Raspberry Pi Pico.
 */

// Time

Blockly.Python.io_pause = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    const unit = block.getFieldValue("UNIT");
    Blockly.Python.addImport("utime", IMPORT_UTIME);
    switch (unit) {
        case "SEC":
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
    // 02/26 - Redo the following line => We need to declare t0 to avoid using io_initChronometer
    Blockly.Python.addConstant('chronometer', "t0 = utime.ticks_ms()");
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
    return ["HIGH" == block.getFieldValue("BOOL") ? 1 : 0, Blockly.Python.ORDER_ATOMIC];
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

Blockly.Python.io_setPwm = function (block) {
    const frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Mosfet', 1000);
    return pinName + ".freq(" + frequency + ")" + NEWLINE + pinName + ".duty_u16(32768)" + NEWLINE;
};

Blockly.Python.io_writePwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    return pinName + '.duty_u16(int(' + value + '))' + NEWLINE
};

Blockly.Python.io_stopPwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.pwm(pin);
    return "if " + pinName + " is not None: " + NEWLINE 
        + "  " + pinName + ".deinit()" + NEWLINE;
};

Blockly.Python.io_readPulseIn = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"));
    return ["time_pulse_us(" + pinName + ", " + state + ", 100000)", Blockly.Python.ORDER_ATOMIC];
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
    const pinXName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN_X"));
    const pinYName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN_Y"));
    Blockly.Python.addInit('joystick_' + pinXName + '_codeFlag', "# Joystick X/Y on " + pinXName + '/' + pinYName);
    switch(axis) {
        case "X":
            return [pinXName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
        case "Y":
            return [pinYName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
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