/**
 * @fileoverview Math generators for Arduino.
 */

Blockly.Arduino.math_number = function (block) {
  var code = parseFloat(block.getFieldValue('NUM'));
  if (code == Infinity) {
    code = 'INFINITY';
  } else if (code == -Infinity) {
    code = '-INFINITY';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.math_arithmetic = function (block) {
  var OPERATORS = {
    'ADD': [' + ', Blockly.Arduino.ORDER_ADDITIVE],
    'MINUS': [' - ', Blockly.Arduino.ORDER_ADDITIVE],
    'MULTIPLY': [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    'DIVIDE': [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    'POWER': [null, Blockly.Arduino.ORDER_NONE]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')],
    operator = tuple[0],
    order = tuple[1],
    inputA = Blockly.Arduino.valueToCode(block, 'A', order) || '0',
    inputB = Blockly.Arduino.valueToCode(block, 'B', order) || '0',
    code;
  // Power in C++ requires a special case since it has no operator.
  if (!operator) {
    code = 'Math.pow(' + inputA + ', ' + inputB + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
  return [inputA + operator + inputB, order];
};

Blockly.Arduino.math_random_int = function (block) {
  const min = Blockly.Arduino.valueToCode(block, 'FROM', Blockly.Arduino.ORDER_NONE) || '0';
  const max = Blockly.Arduino.valueToCode(block, 'TO', Blockly.Arduino.ORDER_NONE) || '0';
  return ['random(' + min + ', ' + max + ')', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};