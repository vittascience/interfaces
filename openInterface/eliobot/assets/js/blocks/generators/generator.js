Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag = 'Digital Read') {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  Blockly.Python.addInit(pin + '_IN', pinName + " = Pin(" + pin.replace('p', '') + ", Pin.IN)");
  return pinName;
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag = 'Analog Read') {
  const pins = Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  Blockly.Python.addFunction('pinADC', DEF_PIN_ADC);
  Blockly.Python.addPowerOn(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  Blockly.Python.addPowerOn(pin + '_ADC', pinName + " = pinADC(" + pin.replace('p', '') + ")");
  return pinName;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag = 'Digital Write') {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  Blockly.Python.addInit(pin + '_OUT', pinName + " = Pin(" + pin.replace('p', '') + ", Pin.OUT)");
  return pinName;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag = 'PWM', freq = 50) {
  const pins = Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  Blockly.Python.addInit(pin + '_OUT', pinName + " = PWM(Pin(" + pin.replace('p', '') + "), freq=" + freq + ", duty=0)");
  return pinName;
};

