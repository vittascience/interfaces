Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[1].toLowerCase();
  Blockly.Python.addImport('machine', IMPORT_MACHINE);
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin + '_codeFlag', "# " + codeFlag + " on " +  pin.replace('p', ''));
  }
  Blockly.Python.addInit(pin + '_IN', pinName + " = Pin(" + pin.replace('p', '') + ", Pin.IN)");
  return pinName;
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[1].toLowerCase();
  Blockly.Python.addImport('machine', IMPORT_MACHINE);
  Blockly.Python.addFunction('pinADC', FUNCTIONS_M5STACK.DEF_PIN_ADC);
  if (codeFlag) {
    Blockly.Python.addPowerOn(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " +  pin.replace('p', ''));
  }
  Blockly.Python.addPowerOn(pin + '_ADC', pinName + " = pinADC(" + pin.replace('p', '') + ")");
  return pinName;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[1].toLowerCase();
  Blockly.Python.addImport('machine', IMPORT_MACHINE);
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin + '_codeFlag', "# " + codeFlag + " on " + pin.replace('p', ''));
  }
  Blockly.Python.addInit(pin + '_OUT', pinName + " = Pin(" + pin.replace('p', '') + ", Pin.OUT)");
  return pinName;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag, freq = 50, duty = 0) {
  const pins = Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[1].toLowerCase();
  Blockly.Python.addImport('machine', IMPORT_MACHINE);
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin + '_codeFlag', "# " + codeFlag + " on " + pin.replace('p', ''));
  }
  Blockly.Python.addInit(pin + '_OUT', pinName + " = PWM(Pin(" + pin.replace('p', '') + "), freq=" + freq + ", duty=" + duty + ")");
  return pinName;
};

