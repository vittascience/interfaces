Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.GALAXIA_PINS;
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  if (codeFlag){
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_IN', pinName + " = Pin(" + pin.replace('p', '') + ", Pin.IN)");
  return pinName;
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS;
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  Blockly.Python.addFunction('pinADC', FUNCTIONS_GALAXIA.DEF_PIN_ADC);
  if (codeFlag){
    Blockly.Python.addPowerOn(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addPowerOn(pin + '_ADC', pinName + " = pinADC(" + pin.replace('p', '') + ")");
  return pinName;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.GALAXIA_PINS;
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  if (codeFlag){
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pinName + " = Pin(" + pin.replace('p', '') + ", Pin.OUT)");
  return pinName;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag, freq = 50, duty = 0) {
  const pins = Blockly.Constants.Pins.GALAXIA_PINS;
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[1].toLowerCase();
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin + '_codeFlag', "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pinName + " = PWM(Pin(" + pin.replace('p', '') + "), freq=" + freq + ", duty=" + duty + ")");
  return pinName;
};

