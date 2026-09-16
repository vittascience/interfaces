/**
 * @fileoverview Bridges python generators for Arduino Q.
 */

Blockly.Python.bridges_provide = function (block) {
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "None";
    const func = Blockly.Python.valueToCode(block, "FUNCTION", Blockly.Python.ORDER_NONE) || "None";
    return "Bridge.provide(" + id + ", " + func + ")" + NEWLINE;
};

Blockly.Python.bridges_call = function (block) {
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "None";
    const elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "None";
    }
    if (block.itemCount_ > 0) {
        return "Bridge.call(" + id + ", " + elements.join(',') + ")" + NEWLINE;
    } else {
        return "Bridge.call(" + id + ")" + NEWLINE;
    }
};

Blockly.Python.py_procedures_defreturn = Blockly.Python.procedures_defreturn;
Blockly.Python.py_procedures_defnoreturn = Blockly.Python.procedures_defnoreturn;