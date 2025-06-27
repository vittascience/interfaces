/**
 * @fileoverview Input/Output generators for CyberPi.
 */

// Time

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

// Buttons

Blockly.Python.io_controller_onButtonPressed = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const button = block.getFieldValue("BUTTON");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if cyberpi.controller.is_press(\'" + button + "\'):" + NEWLINE + branchCode;
};

Blockly.Python.io_controller_isButtonPressed = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const button = block.getFieldValue("BUTTON");
    return ["cyberpi.controller.is_press(\'" + button + "\')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_controller_get_count = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const button = block.getFieldValue("BUTTON");
    return ["cyberpi.controller.get_count(\'" + button + "\')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_controller_reset_count = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const button = block.getFieldValue("BUTTON");
    return "cyberpi.controller.reset_count(\'" + button + "\')" + NEWLINE;
};

// Events

Blockly.Python.io_event_start = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    Blockly.Python.addImport('event', IMPORT_EVENT);
    Blockly.Python.addEvent('on_start', "@event.start" + NEWLINE + "def on_start():" + NEWLINE + branchCode);
    return "";
};

Blockly.Python.io_event_is_press = function (block) {
    const button = block.getFieldValue("BUTTON");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    Blockly.Python.addImport('event', IMPORT_EVENT);
    Blockly.Python.addEvent('on_button_pressed_' + button, "@event.is_press(\'" + button + "\')" + NEWLINE + "def on_button_pressed():" + NEWLINE + branchCode);
    return "";
};

Blockly.Python.io_cyberpi_broadcast = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const message = block.getFieldValue("MESSAGE");
    return "cyberpi.broadcast(\'" + message + "\')" + NEWLINE;
};

Blockly.Python.io_event_receive = function (block) {
    const message = block.getFieldValue("MESSAGE");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    Blockly.Python.addImport('event', IMPORT_EVENT);
    Blockly.Python.addEvent('on_receive_' + message.trim(), "@event.receive(\'" + message + "\')" + NEWLINE + "def on_receive():" + NEWLINE + branchCode);
    return "";
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
        return 'try:' + NEWLINE 
            + '  ' + (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE 
            + 'except:' + NEWLINE 
            + '  ' + (state == '1' ? pinName + ".duty(1023)" : pinName + ".duty(0)") + NEWLINE;
    } else {
        return 'try:' + NEWLINE 
        + '  ' + pinName + '.value(' + state + ')' + NEWLINE 
        + 'except:' + NEWLINE 
        + '  ' + pinName + '.duty(int(' + state + ')*1023)' + NEWLINE;
    }
};

// Blockly.Python.io_readAnalogPin = function (block) {
//     const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"));
//     return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
// };

Blockly.Python.io_writePwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    return 'try:' + NEWLINE 
        + '  ' + pinName + '.duty(int(' + value + '))' + NEWLINE 
        + 'except:' + NEWLINE 
        + '  ' + pinName + " = PWM(Pin(" + pin.replace('p', '') + "), freq=5000, duty=int(" + value + "))" + NEWLINE;
};

// Blockly.Python.io_writeAnalogPin = function (block) {
//     const pin = block.getFieldValue("PIN") || Blockly.Constants.Pins.DAC[Blockly.Constants.getSelectedBoard()][0][1];
//     const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
//     Blockly.Python.addInit(pin + '_DAC', pin + " = DAC(Pin(" + pin.replace('p', '') + "))");
//     return pin + ".write(int(" + value + "))" + NEWLINE;
// };

Blockly.Python.io_setPwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    return "try:" + NEWLINE 
        + "  " + pinName + ".freq(" + freq + ")" + NEWLINE 
        + "  " + pinName + ".duty(512)" + NEWLINE 
        + "  " + pinName + ".init()" + NEWLINE 
        + "except:" + NEWLINE 
        + "  " + pinName + " = PWM(Pin(" + pin.replace('p', '') + "), freq=" + freq + ", duty=512)" + NEWLINE;
};

Blockly.Python.io_stopPwm = function (block) {
    const pin = block.getFieldValue("PIN") || Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()][0][1];
    const pinName = Blockly.Python.Generators.pwm(pin);
    return "if " + pinName + " is not None: " + NEWLINE 
        + "  " + pinName + ".deinit()" + NEWLINE;
};

Blockly.Python.io_getVoltage = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const resolution = block.getFieldValue("RESOLUTION");
    return [value + "*(3.6/" + resolution + ")", Blockly.Python.ORDER_ATOMIC];
};