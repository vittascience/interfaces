Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  //const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_IN', pin + " = Pin(" + pin.replace('p', '') + ", Pin.IN)");
  return pin;
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  //const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  Blockly.Python.addFunction('pinADC', FUNCTIONS_ESP32.DEF_PIN_ADC);
  if (codeFlag) {
    Blockly.Python.addPowerOn(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addPowerOn(pin + '_ADC', pin + " = pinADC(" + pin.replace('p', '') + ")");
  return pin;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  //const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pin + " = Pin(" + pin.replace('p', '') + ", Pin.OUT)");
  return pin;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag, freq = 50, duty = 0) {
  const pins = Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  //const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pin + " = PWM(Pin(" + pin.replace('p', '') + "), freq=" + freq + ", duty=" + duty + ")");
  return pin;
};