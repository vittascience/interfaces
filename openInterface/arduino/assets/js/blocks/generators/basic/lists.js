/**
 * @fileoverview Lists generators for Arduino.
 */

Blockly.Arduino.lists_create_with = function (block) {
    for (var b = Array(block.itemCount_), c = 0; c < block.itemCount_; c++) {
        b[c] = Blockly.Arduino.valueToCode(block, "ADD" + c, Blockly.Arduino.ORDER_NONE) || "0";
    }
    return ["{" + b.join(", ") + "}", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.lists_repeat = function (block) {
    var item = Blockly.Arduino.valueToCode(block, "ITEM", Blockly.Arduino.ORDER_ATOMIC) || "NULL";
    var num = Blockly.Arduino.valueToCode(block, "NUM", Blockly.Arduino.ORDER_ATOMIC) || "0";
    if (num < 1) num = 1;
    var code = "";
    for (var i = 0; i < num; i++) {
        if (i == num - 1) code += item;
        else code += item + ", ";
    }
    return ["{" + code + "}", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.lists_length = function (block) {
    var list = Blockly.Arduino.valueToCode(block, "LIST", Blockly.Arduino.ORDER_ATOMIC) || "NULL";
    return ["sizeof(" + list + ")/sizeof(" + list + "[0])", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.lists_getIndex = function (block) {
    var where = block.getFieldValue("WHERE") || "FROM_START",
        order = "RANDOM" == where ? Blockly.Arduino.ORDER_NONE : Blockly.Arduino.ORDER_ATOMIC,
        list = Blockly.Arduino.valueToCode(block, "LIST", order) || "{}",
        index;
    switch (where) {
        case "FIRST":
            return [list + "[0]", Blockly.Arduino.ORDER_ATOMIC];
        case "LAST":
            return [list + "[-1]", Blockly.Arduino.ORDER_ATOMIC];
        case "FROM_START":
            index = Blockly.Arduino.valueToCode(block, "AT", Blockly.Arduino.ORDER_NONE);
            return [list + "[" + index + "]", Blockly.Arduino.ORDER_ATOMIC];
        case "FROM_END":
            index = Blockly.Arduino.valueToCode(block, "AT", Blockly.Arduino.ORDER_NONE);
            return [list + "[-" + index + "]", Blockly.Arduino.ORDER_ATOMIC];
        case "RANDOM":
            return [list + "[random(0, sizeof(" + list + ")/sizeof(" + list + "[0]))]", Blockly.Arduino.ORDER_ATOMIC];
        default:
            throw Error("Unhandled combination (lists_getIndex).");
    }
};

Blockly.Arduino.lists_isEmpty = Blockly.Arduino.noGeneratorCodeInline;
Blockly.Arduino.lists_indexOf = Blockly.Arduino.noGeneratorCodeInline;
Blockly.Arduino.lists_setIndex = Blockly.Arduino.noGeneratorCodeLine;