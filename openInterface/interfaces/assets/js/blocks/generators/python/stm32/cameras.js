/**
 * @fileoverview Cameras generators for STM32.
 */

Blockly.Python.wio_make_prediction = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addInit('wio_i2c', "wio = machine.I2C(1)");
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 32");
    return "wio.writeto(wio_addr, bytearray([2]))" + NEWLINE;
};

Blockly.Python.wio_get_class_data = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('wio_get_class_data', FUNCTIONS.DEF_WIO_GET_CLASS_DATA)
    Blockly.Python.addInit('wio_i2c', "wio = machine.I2C(1)");
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 32");
    return [`wio_get_class_data()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.wio_get_class_data_by_id = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('wio_get_class_data', FUNCTIONS.DEF_WIO_GET_CLASS_DATA)
    Blockly.Python.addInit('wio_i2c', "wio = machine.I2C(1)");
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 32");
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    return [`wio_get_class_data(${id})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.wio_get_class_max_id = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('wio_get_class_data', FUNCTIONS.DEF_WIO_GET_CLASS_DATA)
    Blockly.Python.addInit('wio_i2c', "wio = machine.I2C(1)");
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 32");
    return ["wio_get_class_data(\"max\")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.wio_get_status = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    const data = block.getFieldValue("DATA");
    Blockly.Python.addInit('wio_i2c', "wio = machine.I2C(1)");
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 32");
    Blockly.Python.addFunction('wio_get_info', FUNCTIONS.DEF_WIO_GET_INFO)
    return [`wio_get_info("${data}")`, Blockly.Python.ORDER_ATOMIC];
};