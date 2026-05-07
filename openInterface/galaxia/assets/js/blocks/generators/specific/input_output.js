/**
 * @fileoverview Input/Output generators for Esp32.
 */

// Galaxia Specific

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


// ESP32

//Rotary Encoder

Blockly.Python.io_rotaryEncoder = function (block) {
    const clk = block.getFieldValue("CLK");
    const dt = block.getFieldValue("DT");
    Blockly.Python.addImport('esp32_rotary', IMPORT_ESP32_ROTARY);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('rotaryEncoder_'+clk, "# Rotary Encoder on " + clk);
    Blockly.Python.addInit('r', 'r = RotaryIRQ(pin_num_clk='+clk.replace('p','')+', pin_num_dt='+dt.replace('p','')+', min_val=0, max_val=5, reverse=False, range_mode=RotaryIRQ.RANGE_WRAP)');
    return ['r.value()', Blockly.Python.ORDER_ATOMIC];
}

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
    return "t0 = utime.ticks_ms()" + NEWLINE;
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
    return ["HIGH" == block.getFieldValue("BOOL") ? '1' : '0', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_readDigitalPin = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"));
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeDigitalPin = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"));
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    return "writeDigital(" + pinName + ", " + state + ")" + NEWLINE;
};

Blockly.Python.io_readAnalogPin = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"));
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writePwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    Blockly.Python.addFunction('writePWM', FUNCTIONS_GALAXIA.DEF_WRITE_WPM);
    return "writePWM(" + pinName + ", " + value + ")" + NEWLINE;
};

Blockly.Python.io_setPwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.pwm(pin);
    Blockly.Python.addFunction('writePWM', FUNCTIONS_GALAXIA.DEF_WRITE_WPM);
    return "writePWM(" + pinName + ", 512, " + freq + ")" + NEWLINE;
};

Blockly.Python.io_stopPwm = function (block) {
    const pin = block.getFieldValue("PIN") || Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    const pinName = Blockly.Python.Generators.pwm(pin);
    return "try:" + NEWLINE + "  __PWM[str(" + pinName + ")].deinit()" + NEWLINE + "except: pass" + NEWLINE;
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
    const pinXName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN_X"));
    const pinYName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN_Y"));
    Blockly.Python.addInit('joystick_' + pinXName + '_codeFlag', "# Joystick X/Y on " + pinXName + '/' + pinYName);
    switch(axis) {
        case "X":
            return [pinXName + ".read()", Blockly.Python.ORDER_ATOMIC];
        case "Y":
            return [pinYName + ".read()", Blockly.Python.ORDER_ATOMIC];
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
    Blockly.Python.addFunction('writeDigital', FUNCTIONS_GALAXIA.DEF_WRITE_DIGITAL);
    return "writeDigital(" + pinName + ", " + state + ")" + NEWLINE;
};
