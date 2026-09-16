Blockly.Arduino.Generators = Object.create(null);

Blockly.Arduino.Generators.setupSerialConnection = function () {
    Blockly.Arduino.addFunction('serial_setupConnection', FUNCTIONS_ARDUINO.DEF_SETUP_SERIAL_CONNECTION)
    const baud = document.getElementById("baud");
    Blockly.Arduino.addSetup('setup_serial', "serial_setupConnection(" + (baud !== null ? baud.value : 9600) + ");");
};

Blockly.Arduino.Generators.digital_read = function (pin, codeFlag) {
    const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
    const pinName = pins.find(p => p[1] == pin)[0];
    if (codeFlag) {
        const constantName = "PIN_" + codeFlag.toUpperCase().replace(/ /g, '_') + '_' + pin;
        Blockly.Arduino.addDefine(pinName + '-' + codeFlag, "#define " + constantName + TAB + pin);
        Blockly.Arduino.addSetup(pinName + '-' + codeFlag, "pinMode(" + constantName + ", INPUT);");
        return constantName;
    } else {
        Blockly.Arduino.addSetup(pinName, "pinMode(" + pin + ", INPUT);");
        return pin;
    }
};

Blockly.Arduino.Generators.digital_write = function (pin, codeFlag) {
    const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
    const pinName = pins.find(p => p[1] == pin)[0];
    if (codeFlag) {
        const constantName = "PIN_" + codeFlag.toUpperCase().replace(/ /g, '_') + '_' + pin;
        Blockly.Arduino.addDefine(pinName + '-' + codeFlag, "#define " + constantName + TAB + pin);
        Blockly.Arduino.addSetup(pinName + '-' + codeFlag, "pinMode(" + constantName + ", OUTPUT);");
        return constantName;
    } else {
        Blockly.Arduino.addSetup(pinName, "pinMode(" + pin + ", OUTPUT);");
        return pin;
    }
};

Blockly.Arduino.Generators.analog_read = function (pin, codeFlag, addingAnalogMean = true) {
    const pins = Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()];
    const pinName = pins.find(p => p[1] == pin)[0];
    if (addingAnalogMean) {
        Blockly.Arduino.addFunction('getAnalogMean', FUNCTIONS_ARDUINO.DEF_GET_ANALOG_MEAN);
    }
    if (codeFlag) {
        const constantName = "PIN_" + codeFlag.toUpperCase().replace(/ /g, '_') + '_' + pin;
        Blockly.Arduino.addDefine(pinName + '-' + codeFlag, "#define " + constantName + TAB + pinName);
        Blockly.Arduino.addSetup(pinName + '-' + codeFlag, "pinMode(" + constantName + ", INPUT);");
        return constantName;
    } else {
        Blockly.Arduino.addSetup(pinName, "pinMode(" + pin + ", OUTPUT);");
        return pin;
    }
};

Blockly.Arduino.Generators.pwm = function (pin, codeFlag) {
    const pins = Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()];
    const pinName = pins.find(p => p[1] == pin)[0];
    if (codeFlag) {
        const constantName = "PIN_" + codeFlag.toUpperCase().replace(/ /g, '_') + '_' + pin;
        Blockly.Arduino.addDefine(pinName + '-' + codeFlag, "#define " + constantName + TAB + pin);
        Blockly.Arduino.addSetup(pinName + '-' + codeFlag, "pinMode(" + constantName + ", OUTPUT);");
        return constantName;
    } else {
        Blockly.Arduino.addSetup(pinName, "pinMode(" + pin + ", OUTPUT);");
        return pin;
    }
};

Blockly.Arduino.Generators.pulseIn = function (pin, codeFlag = 'Pulse In') {
    const pins = Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()];
    const pinName = pins.find(p => p[1] == pin)[0];
    const constantName = "PIN_" + codeFlag.toUpperCase().replace(/ /g, '_') + '_' + pin;
    Blockly.Arduino.addDefine(pinName, "#define " + constantName + TAB + pin);
    return constantName;
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