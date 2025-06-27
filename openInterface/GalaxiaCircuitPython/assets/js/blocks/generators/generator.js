Blockly.Python.Generators = Object.create(null);

/** Code generator common to the 4 pin blocks */
Blockly.Python.Generators.definePin = function (pin, codeFlag) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addConstant('deinit_Pins', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GALAXIA_PINS_DEINIT);
    Blockly.Python.addConstant('Pins', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_PINS_INIT);
    if (codeFlag) {
        Blockly.Python.addInit(pin, "# " + codeFlag + " on " + pin);
    }
    Blockly.Python.addPowerOn(pin, "Pins[str(board." + pin + ")] = None");
    return 'board.' + pin;
};


Blockly.Python.Generators.digital_read = function (pin, codeFlag) {
    const pinName = Blockly.Python.Generators.definePin(pin, codeFlag);
    Blockly.Python.addImport('digitalio', IMPORT_DIGITALIO);
    Blockly.Python.addFunction('configure_pin', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CONFIGURE_PIN);
    Blockly.Python.addFunction('digital_read', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_DIGITAL_READ);
    return pinName;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag) {
    const pinName = Blockly.Python.Generators.definePin(pin, codeFlag);
    Blockly.Python.addImport('digitalio', IMPORT_DIGITALIO);
    Blockly.Python.addFunction('configure_pin', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CONFIGURE_PIN);
    Blockly.Python.addFunction('digital_write', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_DIGITAL_WRITE);
    return pinName;
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag) {
    const pinName = Blockly.Python.Generators.definePin(pin, codeFlag);
    Blockly.Python.addImport('analogio', IMPORT_ANALOGIO);
    Blockly.Python.addFunction('configure_pin', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CONFIGURE_PIN);
    Blockly.Python.addFunction('analog_read', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_ANALOG_READ);
    return pinName;
};

Blockly.Python.Generators.analog_write = function (pin, codeFlag) {
    const pinName = Blockly.Python.Generators.definePin(pin, codeFlag);
    Blockly.Python.addImport('analogio', IMPORT_ANALOGIO);
    Blockly.Python.addFunction('configure_pin', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_CONFIGURE_PIN);
    Blockly.Python.addFunction('analog_write', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_ANALOG_WRITE);
    return pinName;
};

Blockly.Python.Generators.pulse_in = function (pin, codeFlag) {
    const pinName = Blockly.Python.Generators.definePin(pin, codeFlag);
    Blockly.Python.addImport('pulseio', IMPORT_PULSEIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('prepare_pin_pulse', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_PREPARE_PIN_PULSE);
    Blockly.Python.addFunction('pulse_in', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_PULSE_IN);
    return pinName;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag) {
    const pinName = Blockly.Python.Generators.definePin(pin, codeFlag);
    Blockly.Python.addImport('pwmio', IMPORT_PWMIO);
    Blockly.Python.addFunction('set_pwm', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_SET_PWM);
    return pinName;
};