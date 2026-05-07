Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag) {
  Blockly.Python.addImport('RPi.GPIO', IMPORT_GPIO);
  Blockly.Python.addInit('setupGPIO', 'GPIO.setmode(GPIO.BCM)');
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].split(' ')[0].toLowerCase();
  Blockly.Python.addInit(pinName, pinName + ' = ' + pin)
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_IN',  "GPIO.setup(" + pinName + ", GPIO.IN)");
  return pinName;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag) {
  Blockly.Python.addImport('RPi.GPIO', IMPORT_GPIO);
  Blockly.Python.addInit('setupGPIO', 'GPIO.setmode(GPIO.BCM)');
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].split(' ')[0].toLowerCase();
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pinName, pinName + ' = ' + pin);
  Blockly.Python.addInit(pin + '_OUT',  "GPIO.setup(" + pinName + ", GPIO.OUT)");
  return pinName;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag, freq = 50, duty = 0) {
  Blockly.Python.addImport('RPi.GPIO', IMPORT_GPIO);
  Blockly.Python.addInit('setupGPIO', 'GPIO.setmode(GPIO.BCM)');
  const pins = Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].split(' ')[0].toLowerCase();
  if (codeFlag) {
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pinName, pinName + ' = ' + pin);
  Blockly.Python.addInit(pin + '_OUT',  "GPIO.setup(" + pinName + ", GPIO.OUT)");
  const pwmName = "pwm_" + pinName;
  Blockly.Python.addPowerOn(pwmName, pwmName + " = GPIO.PWM(" + pinName + ", " + freq + ")");
  Blockly.Python.addPowerOn(pwmName + "_start", pwmName + ".start(" + duty + ")");
  return pwmName;
};
