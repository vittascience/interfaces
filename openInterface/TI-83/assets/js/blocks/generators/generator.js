Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag, func = "digital") {
  const pinName = pin.toLowerCase().replace(' ', '');
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pinName, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pinName + '_IN', pinName + " = " + func + "(\"" + pin + "\")");
  return pinName;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag, func = "digital") {
  const pinName = pin.toLowerCase().replace(' ', '');
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pinName, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pinName + '_OUT', pinName + " = " + func + "(\"" + pin + "\")");
  return pinName;
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag, func = "analog_in") {
  const pinName = pin.toLowerCase().replace(' ', '');
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pinName, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pinName + '_IN', pinName + " = " + func + "(\"" + pin + "\")");
  return pinName;
};

Blockly.Python.Generators.analog_write = function (pin, codeFlag, func = "analog_out") {
  const pinName = pin.toLowerCase().replace(' ', '');
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pinName, "# " + codeFlag + " on " + pin);
  }
  if (Blockly.Python.inits_[pinName + '_OUT']) {
    Blockly.Python.inits_[pinName + '_OUT'] = pinName + " = " + func + "(\"" + pin + "\")";
  } else {
    Blockly.Python.addInit(pinName + '_OUT', pinName + " = " + func + "(\"" + pin + "\")");
  }
  return pinName;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag, func = "squarewave") {
  const pinName = pin.toLowerCase().replace(' ', '');
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pinName, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pinName + '_OUT', pinName + " = " + func + "(\"" + pin + "\")");
  return pinName;
};
