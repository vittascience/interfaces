/**
 * @fileoverview Loops generators for Arduino.
 */

Blockly.Arduino.controls_repeat = function (block) {
    var n = Blockly.Arduino.valueToCode(block, "TIMES", Blockly.Arduino.ORDER_ADDITIVE) || "0",
        statement = Blockly.Arduino.statementToCode(block, "DO"),
        statements = Blockly.Arduino.addLoopTrap(statement, block.id),
        code = "",
        itName = Blockly.Arduino.nameDB_.getDistinctName("count", Blockly.Variables.NAME_TYPE),
        times = n;
    n.match(/^\w+$/) || Blockly.isNumber(n) || (times = Blockly.Arduino.nameDB_.getDistinctName("repeat_end", Blockly.Variables.NAME_TYPE), code += "int " + times + " = " + n + ";" + NEWLINE);
    return code + ("for (int " + itName + " = 0; " + itName + " < " + times + "; " + itName + "++) {" + NEWLINE + statements + "}" + NEWLINE)
};

Blockly.Arduino.controls_whileUntil = function(block) {
  var until = block.getFieldValue('MODE') == 'UNTIL',
      bool = Blockly.Arduino.valueToCode(block, 'BOOL', until ? Blockly.Arduino.ORDER_LOGICAL_OR : Blockly.Arduino.ORDER_NONE) || 'false',
      branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  if (until) {
    if (!bool.match(/^\w+$/)) {
      bool = '(' + bool + ')';
    }
    bool = '!' + bool;
  }
  return 'while (' + bool + ') {' + NEWLINE + branch + '}' + NEWLINE;
};

Blockly.Arduino.controls_for = function(block) {
  var variable0 = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE),
      start = Blockly.Arduino.valueToCode(block, 'FROM', Blockly.Arduino.ORDER_ASSIGNMENT) || '0',
      end = Blockly.Arduino.valueToCode(block, 'TO', Blockly.Arduino.ORDER_ASSIGNMENT) || '0',
      increment = Blockly.Arduino.valueToCode(block, 'BY', Blockly.Arduino.ORDER_ASSIGNMENT) || '1',
      branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var code;
  if (Blockly.isNumber(start) && Blockly.isNumber(end) && Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(start) <= parseFloat(end);
    code = 'for (' + variable0 + ' = ' + start + '; ' + variable0 + (up ? ' <= ' : ' >= ') + end + '; ' + variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {' + NEWLINE + branch + '}' + NEWLINE;
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = start;
    if (!start.match(/^\w+$/) && !Blockly.isNumber(start)) {
      var startVar = Blockly.Arduino.nameDB_.getDistinctName(variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'int ' + startVar + ' = ' + start + ';' + NEWLINE;
    }
    var endVar = end;
    if (!end.match(/^\w+$/) && !Blockly.isNumber(end)) {
      var endVar = Blockly.Arduino.nameDB_.getDistinctName(variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'int ' + endVar + ' = ' + end + ';' + NEWLINE;
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.Arduino.nameDB_.getDistinctName(variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'int ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';' + NEWLINE;
    } else {
      code += 'abs(' + increment + ');' + NEWLINE;
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {' + NEWLINE;
    code += Blockly.Arduino.INDENT + incVar + ' = -' + incVar + ';' + NEWLINE;
    code += '}' + NEWLINE;
    code += 'for (' + variable0 + ' = ' + startVar + ';' + NEWLINE + '     ' + incVar + ' >= 0 ? ' +
            variable0 + ' <= ' + endVar + ' : ' + variable0 + ' >= ' + endVar + ';' + NEWLINE +
            '     ' + variable0 + ' += ' + incVar + ') {' + NEWLINE + branch + '}' + NEWLINE;
  }
  return code;
};

Blockly.Arduino.controls_flow_statements = function (block) {
    switch (block.getFieldValue("FLOW")) {
        case "BREAK":
            return "break;" + NEWLINE;
        case "CONTINUE":
            return "continue;" + NEWLINE;
    }
    throw "Unknown flow statement.";
};