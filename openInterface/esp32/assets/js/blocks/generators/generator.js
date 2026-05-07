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

Blockly.Python.Generators.default_I2C = function () {
  const board = Blockly.Constants.getSelectedBoard();
  if (board == BOARD_NANO_ESP32) {
    return "SoftI2C(scl=Pin(12), sda=Pin(11))";
  } else {
    return "I2C(scl=Pin(22), sda=Pin(21))";
  }
};

Blockly.Python.Generators.spi = function (id) {
  const spiName = 'spi_' + id;
  const spi = {
    "1": "SPI(1, baudrate=100000, polarity=0, phase=0, sck=Pin(14, Pin.OUT), miso=Pin(12), mosi=Pin(13, Pin.OUT))",
    "2": "SPI(2, baudrate=100000, polarity=0, phase=0, sck=Pin(18, Pin.OUT), miso=Pin(19), mosi=Pin(23, Pin.OUT))"
  };
  Blockly.Python.addInit(spiName, spiName + " = " + spi[id]);
  return spiName;
};