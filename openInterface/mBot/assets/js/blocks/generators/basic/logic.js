/**
 * @fileoverview Logic generators for mBot.
 */

Blockly.Arduino.controls_if = function(block) {
  var n = 0,
      bool = Blockly.Arduino.valueToCode(block, 'IF' + n, Blockly.Arduino.ORDER_NONE) || 'false',
      branch = Blockly.Arduino.statementToCode(block, 'DO' + n),
      code = 'if (' + bool + ') {' + NEWLINE + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    bool = Blockly.Arduino.valueToCode(block, 'IF' + n, Blockly.Arduino.ORDER_NONE) || 'false';
    branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
    code += ' else if (' + bool + ') {' + NEWLINE + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.Arduino.statementToCode(block, 'ELSE');
    code += ' else {' + NEWLINE + branch + '}';
  }
  return code + NEWLINE;
};

Blockly.Arduino.logic_compare = function(block) {
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')],
      order = (operator == '==' || operator == '!=') ? Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL,
      inputA = Blockly.Arduino.valueToCode(block, 'A', order) || '0',
      inputB = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  return [inputA + ' ' + operator + ' ' + inputB, order];
};

Blockly.Arduino.logic_operation = function(block) {
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||',
      order = (operator == '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND : Blockly.Arduino.ORDER_LOGICAL_OR,
      inputA = Blockly.Arduino.valueToCode(block, 'A', order) || 'false',
      inputB = Blockly.Arduino.valueToCode(block, 'B', order) || 'false';
  if (!inputA && !inputB) {
    // If there are no arguments, then the return value is false.
    inputA = 'false';
    inputB = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!inputA) {
      inputA = defaultArgument;
    }
    if (!inputB) {
      inputB = defaultArgument;
    }
  }
  var code = inputA + ' ' + operator + ' ' + inputB;
  return [code, order];
};

Blockly.Arduino.logic_negate = function(block) {
  var bool = Blockly.Arduino.valueToCode(block, 'BOOL', Blockly.Arduino.ORDER_UNARY_PREFIX) || 'false';
  return ['!' + bool, Blockly.Arduino.ORDER_UNARY_PREFIX];
};

Blockly.Arduino.logic_boolean = function(block) {
  return [(block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.logic_null = function () {
  return ["NULL", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.logic_ternary = function(block) {
  var valueIf = Blockly.Arduino.valueToCode(block, 'IF', Blockly.Arduino.ORDER_CONDITIONAL) || 'false',
      valueThen = Blockly.Arduino.valueToCode(block, 'THEN', Blockly.Arduino.ORDER_CONDITIONAL) || 'NULL',
      valueElse = Blockly.Arduino.valueToCode(block, 'ELSE', Blockly.Arduino.ORDER_CONDITIONAL) || 'NULL';
  return [valueIf + ' ? ' + valueThen + ' : ' + valueElse, Blockly.Arduino.ORDER_CONDITIONAL];
};

