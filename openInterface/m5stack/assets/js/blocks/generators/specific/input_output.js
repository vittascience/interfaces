/**
 * @fileoverview Input/Output generators for M5Stack.
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

// M5Stack

Blockly.Python.io_m5stack_onButtonPressedEvent = function (block) {
    const button = block.getFieldValue("BUTTON");
    const state = block.getFieldValue("STATE");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    let stateFunc = ''
    switch (state) {
        case "WAS_PRESS":
            stateFunc = "wasPressed";
            break;
        case "WAS_REL":
            stateFunc = "wasReleased";
            break;
        case "WAS_LONG_PRESS":
            stateFunc = "pressFor";
            break;
        case "WAS_DOUBLE_PRESS":
            stateFunc = "wasDoublePress";
            break;
        default:
            stateFunc = "wasPressed";
            break;
    }
    const funcName = "onEvent_Button" + button + '_' + stateFunc;
    const globalVar = Blockly.Python.getUsedGlobalVarInBlock(block, branchCode);
    Blockly.Python.addFunction(funcName, "def " + funcName + "():" + NEWLINE + globalVar + branchCode);
    if (stateFunc == "pressFor") {
        Blockly.Python.addPowerOn(funcName, 'btn' + button + '.pressFor(0.8, ' + funcName + ')');
    } else {
        Blockly.Python.addPowerOn(funcName, 'btn' + button + '.' + stateFunc + '(' + funcName + ')');
    }
    return "";
};

Blockly.Python.io_m5stack_getButtonState = function (block) {
    const button = block.getFieldValue("BUTTON");
    const state = block.getFieldValue("STATE");
    switch (state) {
        case "PRESSED":
            return ["btn" + button + ".isPressed()", Blockly.Python.ORDER_ATOMIC];
        case "RELEASED":
            return ["btn" + button + ".isReleased()", Blockly.Python.ORDER_ATOMIC];
        default:
            return ["btn" + button + ".isPressed()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.io_m5stack_isCharging = function () {
    return ["power.isCharging()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_m5stack_isChargeFull = function () {
    return ["power.isChargeFull()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_m5stack_setCharge = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return "power.io_m5stack_setCharge(" + state + ")";
};

Blockly.Python.io_m5stack_getBatteryLevel = function () {
    return ["power.getBatteryLevel()", Blockly.Python.ORDER_ATOMIC];
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

Blockly.Python.io_readAnalogPin = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"));
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writePwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    return 'try:' + NEWLINE
        + '  ' + pinName + '.duty(int(' + value + '))' + NEWLINE
        + 'except:' + NEWLINE
        + '  ' + pinName + " = PWM(Pin(" + pin.replace('p', '') + "), freq=5000, duty=int(" + value + "))" + NEWLINE;
};

Blockly.Python.io_writeAnalogPin = function (block) {
    const pin = block.getFieldValue("PIN") || Blockly.Constants.Pins.DAC[Blockly.Constants.getSelectedBoard()][0][1];
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit(pin + '_DAC', pin + " = DAC(Pin(" + pin.replace('p', '') + "))");
    return pin + ".write(int(" + value + "))" + NEWLINE;
};

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
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Potentiometer');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveSlidePotentiometer = function (block) {
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
        + '  ' + (state == '1' ? pinName + ".duty(1023)" : pinName + ".duty(0)") + NEWLINE;
};
