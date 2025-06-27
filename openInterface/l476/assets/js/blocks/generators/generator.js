Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0];
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pinName, "# " + codeFlag + " on " + pinName);
  }
  Blockly.Python.addInit(pin + '_IN', pinName.toLowerCase() + " = machine.Pin(" + pin + ", machine.Pin.IN)");
  return pinName.toLowerCase();
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0];
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pinName, "# " + codeFlag + " on " + pinName);
  }
  Blockly.Python.addInit(pinName + '_ADC', pinName.toLowerCase() + " = pyb.ADC(" + pin + ")");
  return pinName.toLowerCase();
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0];
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pinName, "# " + codeFlag + " on " + pinName);
  }
  Blockly.Python.addInit(pin + '_OUT', pinName.toLowerCase() + " = machine.Pin(" + pin + ", machine.Pin.OUT)");
  return pinName.toLowerCase();
};

Blockly.Python.Generators.pwm = function (pin, codeFlag, freq = 100, pull = 'OUT_PP') {
  const pins = Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0];
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pinName, "# " + codeFlag + " on " + pinName);
  }
  const pinNumbers = pin.match(/TIM([0-9]{1,})_CH([0-9]{1,})/);
  Blockly.Python.addInit(pinName + '_OUT', pinName.toLowerCase() + " = pyb.Pin('" + pinName + "', pyb.Pin." + pull + ")");
  Blockly.Python.addInit('tim' + pinName.replace('D', ''), "tim_" + pinName.toLowerCase() + " = pyb.Timer(" + pinNumbers[1] + ", freq=" + freq + ")");
  Blockly.Python.addInit('pwm' + pinName.replace('D', ''), "pwm_" + pinName.toLowerCase() + " = tim_" + pinName.toLowerCase() + ".channel(" + pinNumbers[2] + ", pyb.Timer.PWM, pin=" + pinName.toLowerCase() + ")");
  return pinName.toLowerCase();
};
