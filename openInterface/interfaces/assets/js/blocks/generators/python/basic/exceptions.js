/**
 * @fileoverview Exception generators for Python.
 */

Blockly.Python.exception_raise = function (block) {
  const exc = Blockly.Python.valueToCode(block, 'EXC', Blockly.Python.ORDER_NONE) || '';
  return "raise " + exc + NEWLINE;
};

Blockly.Python.exception_exception = function (block) {
  const exc = Blockly.Python.valueToCode(block, 'EXC', Blockly.Python.ORDER_ATOMIC) || '';
  return ['Exception(' + exc + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.exception_type = function (block) {
  const type = block.getFieldValue("TYPE");
  return [type, Blockly.Python.ORDER_NONE];
};

Blockly.Python.exception_try = function (block) {
  let code = "try:" + NEWLINE, branchCode;
  code += (Blockly.Python.statementToCode(block, 'EXC') || Blockly.Python.PASS);
  let n = 1;
  while (block.getInput("EXCEPT" + n)) {
    const exceptCode = Blockly.Python.valueToCode(block, "EXCEPT" + n, Blockly.Python.ORDER_NONE) || "False";
    branchCode = Blockly.Python.statementToCode(block, "DO" + n) || Blockly.Python.PASS;
    code += "except " + exceptCode + ":" + NEWLINE + branchCode;
    ++n;
  }
  if (block.getInput("EXCEPTARG")) {
    branchCode = Blockly.Python.statementToCode(block, "EXCEPTARG") || Blockly.Python.PASS;
    code += "except:" + NEWLINE + branchCode;
  }
  return code;
};
