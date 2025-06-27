Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase().split(' ')[0];
  Blockly.Python.addImport('machine', IMPORT_MACHINE);
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_IN', pinName + " = machine.Pin(" + pin.replace('p', '') + ", machine.Pin.IN)");
  return pinName;
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase().split(' ')[0];
  Blockly.Python.addImport('machine', IMPORT_MACHINE);
  Blockly.Python.addFunction('pinADC', FUNCTIONS_CYBERPY.DEF_PIN_ADC);
  if (codeFlag) {
    Blockly.Python.addPowerOn(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addPowerOn(pin + '_ADC', pinName + " = pinADC(" + pin.replace('p', '') + ")");
  return pinName;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase().split(' ')[0];
  Blockly.Python.addImport('machine', IMPORT_MACHINE);
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pinName + " = machine.Pin(" + pin.replace('p', '') + ", machine.Pin.OUT)");
  return pinName;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag, freq = 50) {
  const pins = Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase().split(' ')[0];
  Blockly.Python.addImport('machine', IMPORT_MACHINE);
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pinName + " = machine.PWM(machine.Pin(" + pin.replace('p', '') + "), freq=" + freq + ", duty=0)");
  return pinName;
};