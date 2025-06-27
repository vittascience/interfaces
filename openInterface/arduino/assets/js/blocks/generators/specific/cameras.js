/**
 * @fileoverview Cameras generators for Arduino.
 */

Blockly.Arduino.wio_get_class_data = function () {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('wio_i2c_addr', "#define WIO_ADDR 32");
    Blockly.Arduino.addDefine('wio_data_length', "#define WIO_DATA_LENGTH 10");
    Blockly.Arduino.addSetup('wio_i2c', "Wire.begin();");
    Blockly.Arduino.addFunction('wio_get_class_data', FUNCTIONS_ARDUINO.DEF_READ_WIO_DATA);
    return [`wio_get_class_data()`, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.wio_get_class_data_by_id = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('wio_i2c_addr', "#define WIO_ADDR 32");
    Blockly.Arduino.addDefine('wio_data_length', "#define WIO_DATA_LENGTH 10");
    Blockly.Arduino.addFunction('wio_get_class_data', FUNCTIONS_ARDUINO.DEF_READ_WIO_DATA);
    Blockly.Arduino.addFunction('wio_get_class_data_at', FUNCTIONS_ARDUINO.DEF_WIO_GET_CLASS_DATA_AT);
    Blockly.Arduino.addSetup('wio_i2c', "Wire.begin();");
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "0";
    return [`wio_get_class_data_at(${id})`, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.wio_get_class_max_id = function () {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('wio_i2c_addr', "#define WIO_ADDR 32");
    Blockly.Arduino.addDefine('wio_data_length', "#define WIO_DATA_LENGTH 10");
    Blockly.Arduino.addFunction('wio_get_class_data', FUNCTIONS_ARDUINO.DEF_READ_WIO_DATA);
    Blockly.Arduino.addFunction('wio_get_class_data_max', FUNCTIONS_ARDUINO.DEF_WIO_GET_CLASS_DATA_MAX);
    Blockly.Arduino.addSetup('wio_i2c', "Wire.begin();");
    return ["wio_get_class_data_max()", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.wio_get_status = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('wio_i2c_addr', "#define WIO_ADDR 32");
    Blockly.Arduino.addDefine('wio_data_length', "#define WIO_DATA_LENGTH 10");
    Blockly.Arduino.addFunction('wio_get_info', FUNCTIONS_ARDUINO.DEF_WIO_GET_INFO);
    Blockly.Arduino.addSetup('wio_i2c', "Wire.begin();");
    const data = block.getFieldValue("DATA");
    return [`wio_get_info("${data}")`, Blockly.Arduino.ORDER_ATOMIC];
};