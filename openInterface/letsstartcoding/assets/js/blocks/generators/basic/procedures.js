/**
 * @fileoverview Procedures generators for Arduino.
 */


Blockly.Arduino.procedures_defreturn = function(block) {
  var funcName = Blockly.Arduino.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    branch = Blockly.Arduino.prefixLines(Blockly.Arduino.STATEMENT_PREFIX.replace(/%1/g, '\'' + block.id + '\''), Blockly.Arduino.INDENT) + branch;
  }
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';' + NEWLINE;
  }
  var funcArgs = block.getVarTypes();
  var funcArgsCode = [];
  for (var i = 0; i < funcArgs.length; i++) {
      var varName = funcArgs[i][0];
      var varType = funcArgs[i][1];
      funcArgsCode.push(Blockly.Arduino.getArduinoType_(varType) + " " + varName);        
  }
  var code;
  if (block.getReturnType) {
      code = Blockly.Arduino.getArduinoType_(block.getReturnType()) + " " + funcName + "(" + funcArgsCode.join(", ") + ") {" + NEWLINE + branch + returnValue + "}";
  }
  else {
      code = "void " + funcName + "(" + funcArgsCode.join(", ") + ") {" + NEWLINE + branch + returnValue + "}";
  }
  code = Blockly.Arduino.scrub_(block, code);
  Blockly.Arduino.userFunctions_[funcName] = code;
  return null;
};

Blockly.Arduino.procedures_defnoreturn = Blockly.Arduino.procedures_defreturn;

Blockly.Arduino.procedures_callreturn = function(block) {
  var funcName = Blockly.Arduino.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Arduino.valueToCode(block, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || 'NULL';
  }
  return [funcName + '(' + args.join(', ') + ')', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.procedures_callnoreturn = function(block) {
  var funcName = Blockly.Arduino.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Arduino.valueToCode(block, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || 'NULL';
  }
  return funcName + '(' + args.join(', ') + ');' + NEWLINE;
};

Blockly.Arduino.procedures_ifreturn = function(block) {
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {' + NEWLINE;
  if (block.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || 'NULL';
    code += '  return ' + value + ';' + NEWLINE;
  } else {
    code += '  return;' + NEWLINE;
  }
  code += '}' + NEWLINE;
  return code;
};
