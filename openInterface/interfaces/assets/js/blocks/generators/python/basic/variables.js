/**
 * @fileoverview Variables generators for Python interfaces.
 */

Blockly.Python.variables_set = function (block) {
  const argument0 = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0",
    varName = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);

  // store the variable in the global variable list (ex for thymio onEvent or Micro:bit runEvery)
  if (!Blockly.Python.variables_.includes(varName)) {
    Blockly.Python.variables_.push(varName);
  }
  return varName + " = " + argument0 + NEWLINE;
};

Blockly.Python.variables_set_tuple = function (block) {
  const argument0 = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";

  const elements = new Array(block.itemCount_);

  for (let i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Python.valueToCode(block, "ITEM" + i, Blockly.Python.ORDER_NONE) || "0";
  }

  return '(' + elements + ')' + " = " + argument0 + NEWLINE;
};

Blockly.Python.variables_get = function (block) {
  const varName = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
  return [varName, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.variables_increment = function (block) {
  const increment = Blockly.Python.valueToCode(block, "DELTA", Blockly.Python.ORDER_ADDITIVE) || "0",
    varName = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
  return varName + " = " + varName + " + " + increment + NEWLINE;
};

Blockly.Python.variables_force_type = function (block) {
  const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_MEMBER) || "0",
    type = block.getFieldValue("TYPE")
  return [type + "(" + value + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.variables_type_of = function (block) {
  const varName = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
  return ["type(" + varName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.variables_tuple = function (block) {
  const elements = new Array(block.itemCount_);

  for (let i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Python.valueToCode(block, "ITEM" + i, Blockly.Python.ORDER_NONE) || "0";
  }

  return ['(' + elements + ')', Blockly.Python.ORDER_NONE];
};

Blockly.Python.variables_global = function (block) {
  const varName = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
  return `global ${varName}` + NEWLINE;
};