/**
 * @fileoverview Start generators for Arduino.
 */

Blockly.Arduino.on_start = function (block) {
    var stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.forever = function (block) {
    var stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.scratch_on_start = function (block) {
    let stack = "";
    let nextBlock = block.nextConnection.targetBlock()
    while (nextBlock !== null) {
        if (nextBlock.type !== 'scratch_forever') {
            let blockCode = Blockly.Arduino[nextBlock.type](nextBlock);
            if (blockCode !== undefined) {
                stack += Blockly.Arduino.indent(blockCode, 1)
            }
            nextBlock = nextBlock.nextConnection.targetBlock();
        } else {
            break;
        }
    }
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.scratch_forever = function (block) {
    var stack = Blockly.Arduino.statementToCode(block, "DO");
    Blockly.Arduino.activateBlocks(block, stack);
    return ""; // DO NOT CHANGE
};

Blockly.Arduino.activateBlocks = function (block, stack) {
    stack = Blockly.Arduino.addLoopTrap(stack, block.id);
    var splitted = stack.match(/[^\r\n]+/g);
    if (splitted != null) {
        splitted.forEach(element => {
            if (block.type === "on_start" || block.type === "scratch_on_start") {
                Blockly.Arduino.addUserSetup(Blockly.utils.genUid(), element);
            } else if (block.type === "forever" || block.type === "scratch_forever") {
                Blockly.Arduino.addUserLoop(Blockly.utils.genUid(), element);
            } else {
                throw Error('Statement "' + statement + '" is not defined. Unable to generate code in ' + block.type);
            }
        });
    }
};

/**
 * @fileoverview Inputs/Outputs generators for Arduino.
 */

Blockly.Arduino.text_comment = function () {
    return "//" + this.getFieldValue("TEXT") + NEWLINE || "" + NEWLINE;
};

Blockly.Arduino.io_wait = function (block) {
    const wait = Blockly.Arduino.valueToCode(block, "TIME", Blockly.Arduino.ORDER_ATOMIC);
    return "delay(" + wait + ");" + NEWLINE;
};

// Pins
Blockly.Arduino.io_digitalPin = function (block) {
    return [block.getFieldValue("PIN"), Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.io_analogPin = function (block) {
    return [block.getFieldValue("PIN"), Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.io_pinMode = function (block) {
    const pin = block.getFieldValue("PIN");
    const mode = block.getFieldValue("MODE");
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ',' + mode + ');');
    return "";
};

Blockly.Arduino.io_digital_signal = function (block) {
    return [block.getFieldValue("STATE"), Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_readDigitalPin = function (block) {
    const pin = block.getFieldValue("PIN");
    return ["digitalRead(" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_writeDigitalPin = function (block) {
    const pin = Blockly.Arduino.valueToCode(block, "PIN", Blockly.Arduino.ORDER_ATOMIC) || '0';
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    return "digitalWrite(" + pin + ", " + state + ");" + NEWLINE;
};

Blockly.Arduino.io_readAnalogPin = function (block) {
    const pin = block.getFieldValue("PIN");
    return ["analogRead(" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_writeAnalogPin = function (block) {
    const pin = Blockly.Arduino.valueToCode(block, "PIN", Blockly.Arduino.ORDER_ATOMIC) || '0';
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    return "analogWrite(" + pin + ", " + value + ");" + NEWLINE;
};

/**
 * @fileoverview Actuators generators for Arduino.
 */

// GROVE BUZZER _ PLAY FREQUENCY (TONE) BLOCK
Blockly.Arduino.actuators_tone = function (block) {
    const pin = block.getFieldValue("PIN");
    const frequency = Blockly.Arduino.valueToCode(block, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup("pin_" + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    return "tone(PIN_BUZZER_" + pin + ", " + frequency + ");" + NEWLINE;
};

// GROVE BUZZER _ STOP FREQUENCY (NOTONE) BLOCK
Blockly.Arduino.actuators_noTone = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('buzzer_module_' + pin, "#define PIN_BUZZER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup("pin_" + pin, "pinMode(PIN_BUZZER_" + pin + ", OUTPUT);");
    return "noTone(PIN_BUZZER_" + pin + ");" + NEWLINE;
};

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

/**
 * @fileoverview Logic generators for Arduino.
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

/**
 * @fileoverview Loops generators for Arduino.
 */

Blockly.Arduino.controls_whileUntil = function(block) {
  var bool = Blockly.Arduino.valueToCode(block, 'BOOL', Blockly.Arduino.ORDER_NONE) || 'false',
      branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
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