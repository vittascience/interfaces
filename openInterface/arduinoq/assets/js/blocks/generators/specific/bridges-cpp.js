/**
 * @fileoverview Bridges cpp generators for Arduino Q.
 */

Blockly.Arduino.bridges_provide = function (block) {
    Blockly.Arduino.addInclude('Arduino_RouterBridge', INCLUDE_ARDUINO_ROUTER_BRIDGE);
    Blockly.Arduino.addSetup('bridge_begin', "Bridge.begin();");
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "NULL";
    const func = Blockly.Python.valueToCode(block, "FUNCTION", Blockly.Python.ORDER_NONE) || "NULL";
    return "Bridge.provide(" + id + ", " + func + ");" + NEWLINE;
};

Blockly.Arduino.bridges_call = function (block) {
    Blockly.Arduino.addInclude('Arduino_RouterBridge', INCLUDE_ARDUINO_ROUTER_BRIDGE);
    Blockly.Arduino.addSetup('bridge_begin', "Bridge.begin();");
    const id = Blockly.PytArduinohon.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "NULL";
    const elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Arduino.valueToCode(block, "ADD" + i, Blockly.Arduino.ORDER_NONE) || "NULL";
    }
    if (block.itemCount_ > 0) {
        return "Bridge.call(" + id + ", " + elements.join(',') + ");" + NEWLINE;
    } else {
        return "Bridge.call(" + id + ");" + NEWLINE;
    }
};

Blockly.Arduino.cpp_procedures_defreturn = Blockly.Arduino.procedures_defreturn;
Blockly.Arduino.cpp_procedures_defnoreturn = Blockly.Arduino.procedures_defnoreturn;