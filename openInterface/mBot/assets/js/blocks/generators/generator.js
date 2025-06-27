Blockly.Arduino.Generators = Object.create(null);

Blockly.Arduino.Generators.setupSerialConnection = function () {
  Blockly.Arduino.addFunction('serial_setupConnection', FUNCTIONS_MBOT.DEF_SETUP_SERIAL_CONNECTION)
  const baud = document.getElementById("baud");
  Blockly.Arduino.addSetup('setup_serial', "serial_setupConnection(" + (baud !== null ? baud.value : 9600) + ");");
};

Blockly.Arduino.Generators.analog_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase();
  Blockly.Arduino.addFunction('pinADC', FUNCTIONS_MBOT.DEF_PIN_ADC);
  if (codeFlag) {
    Blockly.Arduino.addPowerOn(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Arduino.addPowerOn(pin + '_ADC', pinName + " = pinADC(" + pin.replace('p', '') + ")");
  return pinName;
};