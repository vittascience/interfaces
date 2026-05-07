/**
 * @fileoverview Input/Output generators for Raspberry pi.
 */

// IO - Time

Blockly.Python.io_pause = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('time', IMPORT_TIME);
    switch (block.getFieldValue("UNIT")) {
        default:
        case "SEC":
            return "time.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "time.sleep(" + duration + "/1e3)" + NEWLINE;
        case "MICRO":
            return "time.sleep(" + duration + "/1e6)" + NEWLINE;
    }
};

Blockly.Python.io_waitUntil = function (block) {
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC) || "True";;
    return "while not " + condition + ":" + NEWLINE + "  pass" + NEWLINE;
};

Blockly.Python.io_initChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('t0', "t0 = time.time()");
    block.workspace.createVariable('t0');
    return "t0 = time.time()" + NEWLINE;
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('t0', "t0 = time.time()");
    block.workspace.createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["time.time() - t0", Blockly.Python.ORDER_ATOMIC];
        case "MILLI":
            return ["(time.time() - t0) * 1e3", Blockly.Python.ORDER_ATOMIC];
        case "MICRO":
            return ["(time.time() - t0) * 1e6", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.io_datetime_ymd_hms = function (block) {
    Blockly.Python.addImport('datetime', IMPORT_DATETIME);
    return ['f"{datetime.now().strftime(\'%Y%m%d_%H%M%S\')}"', Blockly.Python.ORDER_ATOMIC];
};

// IO - Sense HAT - Joystick

Blockly.Python.sensehat_wait_for_event = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    return `event = sense.stick.wait_for_event()`+ NEWLINE;
};

Blockly.Python.sensehat_get_event_action_direction = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    const event = block.getFieldValue('EVENT_TYPE');
    return [`event.${event}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_get_event_joystick = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    Blockly.Python.addFunction('senseHat_getEventsJoystick', FUNCTIONS_RASPBERRY.SENSE_HAT_GET_EVENT_JOYSTICK);
    return `senseHat_getEventsJoystick()` + NEWLINE;
};

// IO - Pins

Blockly.Python.io_digital_signal = function (block) {
    return ["GPIO." + block.getFieldValue("BOOL"), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_readDigitalPin = function (block) {
    Blockly.Python.addImport('RPi.GPIO', IMPORT_GPIO);
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"));
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeDigitalPin = function (block) {
    Blockly.Python.addImport('RPi.GPIO', IMPORT_GPIO);
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"));
    return "GPIO.output(" + pinName + ", " + state + ")" + NEWLINE;
};

Blockly.Python.io_writePwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm(pin);
    return pwmName + ".ChangeFrequency(5000)" + NEWLINE + pwmName + ".ChangeDutyCycle(" + value + ")" + NEWLINE;
};

Blockly.Python.io_setPwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const pwmName = Blockly.Python.Generators.pwm(pin);
    return pwmName + ".ChangeFrequency(" + freq + ")" + NEWLINE + pwmName + ".ChangeDutyCycle(50)" + NEWLINE;
};

Blockly.Python.io_stopPwm = function (block) {
    const pin = block.getFieldValue("PIN") || Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()][0][1];
    const pwmName = Blockly.Python.Generators.pwm(pin);
    return pwmName + ".stop()" + NEWLINE;
};

// External modules

Blockly.Python.io_getGroveButton = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Simple Button');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveSwitch = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Switch Button');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getMagneticSwitch = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Magnetic Switch');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveTactile = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Touch Button');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_getGroveColoredButton = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Colored Button / read');
    return ["GPIO.input(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_setGroveColoredButton = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Colored Button W');
    return "GPIO.output(" + pinName + ", " + state + ")" + NEWLINE;
};