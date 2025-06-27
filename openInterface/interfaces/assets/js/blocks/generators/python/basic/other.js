/**
 * @fileoverview Other blocks generator for Python.
 * These blocks ar not in the interface
 */

Blockly.Python.ast_Raw = function(block) {
  return block.getFieldValue('TEXT') + NEWLINE;
};

Blockly.Python.ast_AttributeFull = function (block) {
  const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
  const attr = block.getFieldValue('ATTR');
  return [value + "." + attr, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.ast_Attribute = function (block) {
  const value = Blockly.Python.variableDB_.getName(block.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
  const attr = block.getFieldValue('ATTR');
  return [value + "." + attr, Blockly.Python.ORDER_MEMBER];
};
