Blockly.Python.Generators = Object.create(null);

Blockly.Python.Generators.digital_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];;
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase().split(' ')[0];
  if (codeFlag){
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_IN', pinName + " = Pin(" + pin.replace('p', '') + ", Pin.IN)");
  return pinName;
};

Blockly.Python.Generators.analog_read = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase().split(' ')[0];
  Blockly.Python.addFunction('pinADC', FUNCTIONS_GALAXIA.DEF_PIN_ADC);
  if (codeFlag){
    Blockly.Python.addPowerOn(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addPowerOn(pin + '_ADC', pinName + " = pinADC(" + pin.replace('p', '') + ")");
  return pinName;
};

Blockly.Python.Generators.digital_write = function (pin, codeFlag) {
  const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase().split(' ')[0];
  Blockly.Python.addInit("__PWM", "__PWM = {}");
  if (codeFlag){
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pinName + " = Pin(" + pin.replace('p', '') + ", Pin.OUT)");
  return pinName;
};

Blockly.Python.Generators.pwm = function (pin, codeFlag, freq = 50, duty = 0) {
  const pins = Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()];
  pin = pin || pins[0][1];
  const pinName = pins.find(p => p[1] == pin)[0].toLowerCase().split(' ')[0];
  Blockly.Python.addInit("__PWM", "__PWM = {}");
  if (codeFlag){
    Blockly.Python.addInit(codeFlag.trim() + '_' + pin, "# " + codeFlag + " on " + pin);
  }
  Blockly.Python.addInit(pin + '_OUT', pinName + " = Pin(" + pin.replace('p', '') + ", Pin.OUT)");
  const pwmName = "__PWM[str(" + pinName + ")]";
  Blockly.Python.addPowerOn(pin + '_PWM', pwmName + " = PWM(" + pinName + ", freq=" + freq + ", duty=" + duty + ")");
  return pinName;
};

Blockly.Python.Generators.spi = function (id) {
  const spiName = 'spi_' + id;
  const spi = {
    //"1": "SPI(1, baudrate=100000, polarity=0, phase=0, sck=Pin(14, Pin.OUT), miso=Pin(12), mosi=Pin(13, Pin.OUT))", // SPI(1) host already in use ...
    "2": "SPI(2, baudrate=100000, polarity=0, phase=0, sck=Pin(34, Pin.OUT), miso=Pin(35), mosi=Pin(36, Pin.OUT))"
  };
  Blockly.Python.addInit(spiName, spiName + " = " + spi[id]);
  return spiName;
};

