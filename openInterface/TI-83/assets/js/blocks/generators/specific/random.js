/**
 * @fileoverview Random generators for TI-83 Premium CE.
 */

Blockly.Python.random_random = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return ["random.random()", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.random_randint = function (block) {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    const min = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_NONE) || "0";
    const max = Blockly.Python.valueToCode(block, "MAX", Blockly.Python.ORDER_NONE) || "0";
    return ["random.randint(" + min + ", " + max + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.random_uniform = function (block) {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    const min = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_NONE) || "0";
    const max = Blockly.Python.valueToCode(block, "MAX", Blockly.Python.ORDER_NONE) || "0";
    return ["random.uniform(" + min + ", " + max + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.random_randrange = function (block) {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    const start = Blockly.Python.valueToCode(block, "START", Blockly.Python.ORDER_NONE) || "0";
    const end = Blockly.Python.valueToCode(block, "END", Blockly.Python.ORDER_NONE) || "0";
    const step = Blockly.Python.valueToCode(block, "STEP", Blockly.Python.ORDER_NONE) || "0";
    return ["random.randrange(" + start + ", " + end + ", " + step + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.random_choice = function (block) {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    const sequence = Blockly.Python.valueToCode(block, "SEQUENCE", Blockly.Python.ORDER_NONE) || "[]";
    return ["random.choice(" + sequence + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.random_seed = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return ["random.seed()", Blockly.Python.ORDER_FUNCTION_CALL];
};