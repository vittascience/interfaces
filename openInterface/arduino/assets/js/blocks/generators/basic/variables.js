/**
 * @fileoverview Variables generators for Arduino.
 */

Blockly.Arduino.variables_get = function (block) {
    const varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    return [varName, Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.variables_set = function (block) {
    let value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ASSIGNMENT) || "NULL";
    // case we declare a list in order to have the ITEM TYPE and the LENGHT OF LIST
    const connection = block.inputList[0].connection;
    const child = typeof connection !== 'undefined' ? connection.targetBlock() : null;
    if (child) {
        if (child.type == 'lists_create_with' || child.type == 'lists_repeat') {
            var listSize = "";
            if (child.type == 'lists_create_with') {
                listSize = child.itemCount_;
                // case empty list, we create default empty list of type int 
                if (listSize == 0) return "int" + " " + Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + " = " + value + ";" + NEWLINE;
                if (['on_start', 'scratch_on_start'].includes(block.getRootBlock().type)) {
                    const code = Blockly.Arduino.getArduinoType_(child.getBlockType()) + " " + Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + "[" + listSize + "]" + " = " + value + ";"
                    Blockly.Arduino.addDeclaration(code, code);
                    return '';
                }
            }
            if (child.type == 'lists_repeat') {
                listSize = Blockly.Arduino.valueToCode(child, "NUM", Blockly.Arduino.ORDER_ATOMIC) || "0";
            }
            return Blockly.Arduino.getArduinoType_(child.getBlockType()) + " " + Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + "[" + listSize + "]" + " = " + value + ";" + NEWLINE;
        }
    }
    // case we are not declaring a list
    return Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + " = " + value + ";" + NEWLINE;
};

Blockly.Arduino.variables_increment = function (block) {
    const increment = Blockly.Arduino.valueToCode(block, "DELTA", Blockly.Arduino.ORDER_ADDITIVE) || "0";
    return Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + " += " + increment + ";" + NEWLINE;
};

Blockly.Arduino.variables_force_type = function (block) {
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ASSIGNMENT) || "0";
    const type = block.getFieldValue("TYPE");
    const arduinoType = Blockly.Arduino.getArduinoType_(Blockly.Types[type]);
    if (type == "TEXT") {
        return [arduinoType + "(" + value + ")", Blockly.Arduino.ORDER_ATOMIC];
    } else {
        return ["(" + arduinoType + ")" + value, Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino.variables_type_of = function (block) {
    const varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.addDefine('define_variable_types', FUNCTIONS_ARDUINO.DEFINE_VARIABLE_TYPE);
    return ["String(TYPE_NAME(" + varName + "))", Blockly.Arduino.ORDER_ATOMIC]
};