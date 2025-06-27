/**
 * @fileoverview Input/Output generators for Galaxia.
 */

// Galaxia - Time

Blockly.Python.io_pause = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    const unit = block.getFieldValue("UNIT");
    Blockly.Python.addImport("time", IMPORT_TIME);
    switch (unit) {
        case "SECOND":
            return "time.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "time.sleep(" + duration + "/1000)" + NEWLINE;
        case "MICRO":
            return "time.sleep(" + duration + "/1000000)" + NEWLINE;
        default:
            return "time.sleep(" + duration + ")" + NEWLINE;
    }
};

Blockly.Python.io_waitUntil = function (block) {
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC) || "True";;
    return "while not " + condition + ":" + NEWLINE + "  pass" + NEWLINE;
};

Blockly.Python.io_initChronometer = function (block) {
    Blockly.Python.addConstant('chronometer', "t0 = time.monotonic_ns()");
    block.workspace.createVariable('t0');
    return "t0 = time.monotonic_ns()" + NEWLINE;
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addConstant('chronometer', "t0 = time.monotonic_ns()");
    block.workspace.createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["(time.monotonic_ns()-t0)/1000000000", Blockly.Python.ORDER_ATOMIC];
        case "MS":
            return ["(time.monotonic_ns()-t0)/1000000", Blockly.Python.ORDER_ATOMIC];
        case "US":
            return ["(time.monotonic_ns()-t0)/1000", Blockly.Python.ORDER_ATOMIC];
        case "NS":
            return ["(time.monotonic_ns()-t0)", Blockly.Python.ORDER_ATOMIC];
    }
};

// Galaxia - A & B buttons

Blockly.Python.io_onButtonPressed = function (block) {
    const button = block.getFieldValue("BUTTON");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    if (button === "a" || button === "b") {
        return "if button_" + button + "." + block.getFieldValue("STATE") + "pressed():" + NEWLINE + branchCode;
    } else {
        return "if button_a." + block.getFieldValue("STATE") + "pressed() and button_b." + block.getFieldValue("STATE") + "pressed():" + NEWLINE + branchCode;
    }
};

Blockly.Python.io_isButtonPressed = function (block) {
    const button = block.getFieldValue("BUTTON");
    const state = block.getFieldValue("STATE");
    let code;
    if (button === "a" || button === "b") {
        code = "button_" + button + "." + state + "pressed()";
    } else {
        code = "button_a." + state + "pressed() and button_b." + state + "pressed()";
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_onButtonEvent = function (block) {
    const button = block.getFieldValue("BUTTON");
    const callbackName = "on_pressed_" + button;
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const globalVar = Blockly.Python.getUsedGlobalVarInBlock(block, branchCode)
    const defEvent = "def " + callbackName + "(button):" + NEWLINE + globalVar + branchCode + NEWLINE;
    const callEvent = "button_" + button + ".on_button_pressed(" + callbackName + ")";
    Blockly.Python.addFunction("%" + callbackName, defEvent);
    Blockly.Python.addPowerOn("%" + callbackName, callEvent);
    return "";
};

Blockly.Python.io_buttons_getPresses = function (block) {
    const button = block.getFieldValue("BUTTON");
    return ["button_" + button + ".get_presses()", Blockly.Python.ORDER_ATOMIC];
};

// Galaxia - Touch buttons

Blockly.Python.io_isTouchSensitiveButtonTouched = function (block) {
    const button = block.getFieldValue("BUTTON");
    const state = block.getFieldValue("STATE");
    return ["touch_" + button + "." + state + "touched()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_ifTouchSensitiveButtonTouched = function (block) {
    const button = block.getFieldValue("BUTTON");
    const state = block.getFieldValue("STATE");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if touch_" + button + "." + state + "touched():" + NEWLINE + branchCode;
};

Blockly.Python.io_onTouchSensitiveButtonEvent = function (block) {
    const button = block.getFieldValue("BUTTON");
    const callbackName = "on_touch_" + button;
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const globalVar = Blockly.Python.getUsedGlobalVarInBlock(block, branchCode);
    const defEvent = "def " + callbackName + "(button):" + NEWLINE + globalVar + branchCode + NEWLINE;
    const callEvent = "touch_" + button + ".on_touch_touched(" + callbackName + ")";
    Blockly.Python.addFunction("%" + callbackName, defEvent);
    Blockly.Python.addPowerOn("%" + callbackName, callEvent);
    return "";
};

Blockly.Python.io_TouchSensitiveButton_getTouches = function (block) {
    const button = block.getFieldValue("BUTTON");
    return ["touch_" + button + ".get_touches()", Blockly.Python.ORDER_ATOMIC];
};

// Galaxia - P0, P1, P2

Blockly.Python.io_onPinPressed = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if " + block.getFieldValue("PIN") + ".is_touched():" + NEWLINE + branchCode;
};

Blockly.Python.io_isPinPressed = function (block) {
    return [block.getFieldValue("PIN") + ".is_touched()", Blockly.Python.ORDER_ATOMIC];
};

// External modules

Blockly.Python.io_getKeypadNumber = function (block) {
    Blockly.Python.addInit('init_one_uart_module', "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + block.getFieldValue("RX") + ", rx=" + block.getFieldValue("TX") + ")");
    Blockly.Python.addFunction('getKeypadNumber', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_KEYPAD_GET_NUMBER);
    return ["getKeypadNumber()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveThumbJoystick = function (block) {
    const axis = block.getFieldValue("AXIS");
    switch (axis) {
        case "X":
            return [block.getFieldValue("PIN_X") + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
        case "Y":
            return [block.getFieldValue("PIN_Y") + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled axis option for Joystick module:'" + axis + "'");
    }
};

Blockly.Python.io_getGroveColoredButton = function (block) {
    const pinSIG2 = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Colored Button / read');
    return ["digital_read(" + pinSIG2 + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_setGroveColoredButton = function (block) {
    const pinSIG1 = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Colored Button / write');
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return "digital_write(" + pinSIG1 + ", " + state + ")" + NEWLINE;
};

Blockly.Python.io_getGroveSlidePotentiometer = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Potentiometer');
    return ["analog_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveRotaryAngle = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Potentiometer');
    return ["analog_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveTactile = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Touch Button');
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveButton = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Button');
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveSwitch = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Switch Button');
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

// Pins

Blockly.Python.io_digital_signal = function (block) {
    return ["HIGH" == block.getFieldValue("BOOL") ? 1 : 0, Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.io_readDigitalPin = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"));
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeDigitalPin = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pin = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"));
    return "digital_write(" + pin + ", " + state + ")" + NEWLINE;
};

Blockly.Python.io_readAnalogPin = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"));
    return ["analog_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeAnalogPin = function (block) {
    const pin = Blockly.Python.Generators.analog_write(block.getFieldValue("PIN"));
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return pin.replace('P', 'pin') + "write_analog(" + value + ")" + NEWLINE;
};

Blockly.Python.io_writePwm = function (block) {
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"));
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return "set_pwm(" + pinName + ", duty = " + value + ", freq=10000)" + NEWLINE;
};

Blockly.Python.io_setPwm = function (block) {
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"));
    return "set_pwm(" + pinName + ", freq = " + freq + ")" + NEWLINE;
};

Blockly.Python.io_stopPwm = function (block) {
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"));
    Blockly.Python.addFunction('stop_pwm', FUNCTIONS_GALAXIACIRCUITPYTHON.STOP_PWM);
    return "stop_pwm(" + pinName + ")" + NEWLINE;
};

Blockly.Python.io_preparePulseIn = function (block) {
    const pin = Blockly.Python.Generators.pulse_in(block.getFieldValue("PIN"));
    return "pulse_" + block.getFieldValue("PIN") + " = prepare_pulse_in(" + pin + ")" + NEWLINE;
};

Blockly.Python.io_readPulseIn = function (block) {
    Blockly.Python.Generators.pulse_in(block.getFieldValue("PIN"));
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return ["pulse_in(pulse_" + block.getFieldValue("PIN") + ", " + state + ")", Blockly.Python.ORDER_ATOMIC];
};