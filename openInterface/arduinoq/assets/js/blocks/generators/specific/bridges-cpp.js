/**
 * @fileoverview Bridges cpp generators for Arduino Q.
 */

Blockly.Arduino.bridges_provide = function (block) {
    Blockly.Arduino.addInclude('Arduino_RouterBridge', INCLUDE_ARDUINO_ROUTER_BRIDGE);
    Blockly.Arduino.addSetup('bridge_begin', "Bridge.begin();");
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "NULL";
    // A procedure call block plugged here must give the function itself, not its result
    const target = block.getInputTargetBlock("FUNCTION");
    const func = target && target.getProcedureCall
        ? Blockly.Arduino.nameDB_.getName(target.getProcedureCall(), Blockly.PROCEDURE_CATEGORY_NAME)
        : Blockly.Arduino.valueToCode(block, "FUNCTION", Blockly.Arduino.ORDER_NONE) || "NULL";
    return "Bridge.provide(" + id + ", " + func + ");" + NEWLINE;
};

Blockly.Arduino.bridges_call = function (block) {
    Blockly.Arduino.addInclude('Arduino_RouterBridge', INCLUDE_ARDUINO_ROUTER_BRIDGE);
    Blockly.Arduino.addSetup('bridge_begin', "Bridge.begin();");
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "NULL";
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

Blockly.Arduino.bridges_call_return = function (block) {
    Blockly.Arduino.addInclude('Arduino_RouterBridge', INCLUDE_ARDUINO_ROUTER_BRIDGE);
    Blockly.Arduino.addSetup('bridge_begin', "Bridge.begin();");
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "NULL";
    const type = block.getFieldValue("TYPE");
    const args = [id];
    for (let i = 0; i < block.itemCount_; i++) {
        args.push(Blockly.Arduino.valueToCode(block, "ADD" + i, Blockly.Arduino.ORDER_NONE) || "NULL");
    }
    // Immediately invoked lambda: Bridge.call() only gives its result through .result(var)
    const code = "([&]() { " + type + " bridgeResult{}; Bridge.call(" + args.join(', ') + ").result(bridgeResult); return bridgeResult; })()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.cpp_procedures_defreturn = Blockly.Arduino.procedures_defreturn;
Blockly.Arduino.cpp_procedures_defnoreturn = Blockly.Arduino.procedures_defnoreturn;