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

Blockly.Arduino.Generators.DEFINE_VARIABLE_TYPE =
`// Generic catch-all implementation.
template <typename T_ty> struct TypeInfo {static const char* name;};
template <typename T_ty> const char* TypeInfo<T_ty>::name = "unknown";
// Handy macro to make defining stuff easier.
#define MAKE_TYPE_INFO(type) template <> const char* TypeInfo<type>::name = #type;
// Type-specific implementations.
MAKE_TYPE_INFO(char)
MAKE_TYPE_INFO(String)
MAKE_TYPE_INFO(boolean)
MAKE_TYPE_INFO(short)
MAKE_TYPE_INFO(int)
MAKE_TYPE_INFO(long)
MAKE_TYPE_INFO(float)
// Handy macro to make querying stuff easier.
#define TYPE_NAME(var) TypeInfo<typeof(var)>::name`;