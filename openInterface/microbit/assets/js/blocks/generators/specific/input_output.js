/**
 * @fileoverview Input/Output generators for Micro:bit.
 */

// Micro:bit

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
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC) || "True";;
    return "while not " + condition + ":" + NEWLINE + "  pass" + NEWLINE;
};

Blockly.Python.io_initChronometer = function (block) {
    Blockly.Python.addConstant('chronometer', "t0 = 0");
    block.workspace.createVariable('t0');
    return "t0 = running_time()" + NEWLINE;
};

Blockly.Python.io_resetChronometer = function (block) {
    Blockly.Python.addConstant('chronometer', "t0 = 0");
    block.workspace.createVariable('t0');
    return "t0 = 0" + NEWLINE;
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addConstant('chronometer', "t0 = 0");
    block.workspace.createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["(running_time()-t0)/1000.0", Blockly.Python.ORDER_ATOMIC];
        case "MS":
            return ["(running_time()-t0)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.io_onButtonPressed = function (block) {
    const button = block.getFieldValue("BUTTON");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    if (button === "a" || button === "b") {
        return "if button_" + button + "." + block.getFieldValue("STATE") + "pressed():" + NEWLINE + branchCode;
    } else {
        return "if button_a." + block.getFieldValue("STATE") + "pressed() and button_b." + block.getFieldValue("STATE") + "pressed():" + NEWLINE + branchCode;
    }
};

Blockly.Python.io_onPinPressed = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if " + block.getFieldValue("PIN") + ".is_touched():" + NEWLINE + branchCode;
};

Blockly.Python.io_onMovement = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if accelerometer.current_gesture() == '" + block.getFieldValue("MOV") + "' :" + NEWLINE + branchCode;
};

Blockly.Python.io_isButtonPressed = function (block) {
    let code;
    const button = block.getFieldValue("BUTTON");
    const state = block.getFieldValue("STATE");
    if (button === "a" || button === "b") {
        code = "button_" + button + "." + state + "pressed()";
    } else {
        code = "button_a." + state + "pressed() and button_b." + state + "pressed()";
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_isPinPressed = function (block) {
    return [block.getFieldValue("PIN") + ".is_touched()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_buttons_getPresses = function (block) {
    const button = block.getFieldValue("BUTTON");
    return ["button_" + button + ".get_presses()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_runEvery = function (block) {
    const h = Blockly.Python.valueToCode(block, "H", Blockly.Python.ORDER_NONE) || "0";
    const min = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_NONE) || "0";
    const s = Blockly.Python.valueToCode(block, "S", Blockly.Python.ORDER_NONE) || "0";
    const ms = Blockly.Python.valueToCode(block, "MS", Blockly.Python.ORDER_NONE) || "0";
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    let run_every = "@run_every(";
    let prev_exists = false;
    const names = ['h', 'min', 's', 'ms'];
    const datas = [h, min, s, ms];
    for (var i = 0; i < datas.length; i++) {
        if (datas[i] != '0') {
            if (prev_exists) {
                run_every += ', ';
            }
            run_every += names[i] + '=' + datas[i];
            prev_exists = true;
        }
    }
    run_every += ')' + NEWLINE;
    const everyFunctions = Object.keys(Blockly.Python.powers_).filter((key) => /every_function_/.test(key));
    const funcName = "every_function_" + (everyFunctions.length + 1);
    Blockly.Python.addPowerOn(funcName, run_every + "def " + funcName + "():" + NEWLINE + branchCode);
    return "";
};

Blockly.Python.io_microbit_reset = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "reset()" + NEWLINE;
};

// Microphone module

Blockly.Python.io_micro_onSoundDetected = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const state = block.getFieldValue("STATE");
    const type = block.getFieldValue("TYPE");
    switch (type) {
        case "IS":
            return "if microphone.current_event() == SoundEvent." + state + ":" + NEWLINE + branchCode;
        case "WAS":
            return "if microphone.was_sound(SoundEvent." + state + "):" + NEWLINE + branchCode;
        default:
            throw Error("Unhandled type option for microphone sensor :'" + type + "'")
    }
};

Blockly.Python.io_micro_getCurrentSound = function () {
    return ["microphone.current_event()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_micro_wasSoundDetected = function (block) {
    const state = block.getFieldValue("STATE");
    return ["microphone.was_sound(SoundEvent." + state + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_micro_getSoundLevel = function () {
    return ["microphone.sound_level()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_micro_getHistorySounds = function () {
    return ["microphone.get_sounds()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_micro_setSoundThreshold = function (block) {
    const state = block.getFieldValue("STATE");
    const threshold = Blockly.Python.valueToCode(block, "THRESH", Blockly.Python.ORDER_NONE) || "0";
    return "microphone.set_threshold(SoundEvent." + state + ", " + threshold + ")" + NEWLINE;
};

Blockly.Python.io_micro_soundCondition = function (block) {
    const state = block.getFieldValue("STATE");
    return ["SoundEvent." + state, Blockly.Python.ORDER_ATOMIC];
};

// External modules

Blockly.Python.io_getKeypadNumber = function (block) {
    Blockly.Python.addInit('init_one_uart_module', "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + block.getFieldValue("RX") + ", rx=" + block.getFieldValue("TX") + ")");
    Blockly.Python.addFunction('getKeypadNumber', FUNCTIONS_MICROBIT.DEF_KEYPAD_GET_NUMBER);
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
    const pinSIG2 = block.getFieldValue("PIN");
    Blockly.Python.addInit('colored_button_module_' + pinSIG2, "# Colored Button / read on " + pinSIG2);
    return [pinSIG2 + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_setGroveColoredButton = function (block) {
    const pinSIG1 = block.getFieldValue("PIN");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('colored_button_module_' + pinSIG1, "# Colored Button / write on " + pinSIG1);
    return pinSIG1 + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.io_getGroveSlidePotentiometer = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('potentiometer_module_' + pin, "# Potentiometer on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveRotaryAngle = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('potentiometer_module_' + pin, "# Potentiometer on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveTactile = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('touch_module_' + pin, "# Touch Button on " + pin);
    return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveButton = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('button_module_' + pin, "# Simple Button on " + pin);
    return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveSwitch = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('switch_module_' + pin, "# Switch Button on " + pin);
    return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getMagneticSwitch = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('magnetic_switch_module_' + pin, "# Magnetic Switch on " + pin);
    return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

// Pins

Blockly.Python.io_digital_signal = function (block) {
    return ["HIGH" == block.getFieldValue("BOOL") ? 1 : 0, Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.io_readDigitalPin = function (block) {
    return [block.getFieldValue("PIN") + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeDigitalPin = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return block.getFieldValue("PIN") + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.io_readAnalogPin = function (block) {
    return [block.getFieldValue("PIN") + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeAnalogPin = function (block) {
    let value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    if (value < 0) value = 0;
    if (value > 1023) value = 1023;
    return block.getFieldValue("PIN") + ".write_analog(" + value + ")" + NEWLINE;
};

Blockly.Python.io_setPwm = function (block) {
    let period = Blockly.Python.valueToCode(block, "PERIOD", Blockly.Python.ORDER_NONE) || "0";
    const pin = block.getFieldValue("PIN");
    const unit = block.getFieldValue("UNIT");
    switch (unit) {
        case "MS":
            if (period * 1000 < 256) period = 256;
            return pin + ".set_analog_period(" + period + ")" + NEWLINE;
        case "US":
            if (period < 256) period = 256;
            return pin + ".set_analog_period_microseconds(" + period + ")" + NEWLINE;
    }
};

Blockly.Python.io_readPulseIn = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('pulseIn', FUNCTIONS_MICROBIT.DEF_IO_PULSE_IN);
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return ["pulseIn(" + block.getFieldValue("PIN") + ", " + state + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_setPull = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = block.getFieldValue("STATE");
    return `${pin}.set_pull(${pin}.${state})` + NEWLINE;
};