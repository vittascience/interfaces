/**
 * @fileoverview Text generators for mBot.
 */

Blockly.Arduino.text_comment = function () {
  return "//" + this.getFieldValue("TEXT") + NEWLINE || "" + NEWLINE;
};

Blockly.Arduino.text = function(block) {
  return [Blockly.Arduino.quote_(block.getFieldValue('TEXT')), Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_join = function(block) {
  if (block.itemCount_ == 0) {
    return ['""', Blockly.Arduino.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    var txt = Blockly.Arduino.valueToCode(block, 'ADD0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '""';
    return ['String(' + txt + ')', Blockly.Arduino.ORDER_UNARY_POSTFIX];
  } else {
    var argument;
    var code = [];
    for (var n = 0; n < block.itemCount_; n++) {
      argument = Blockly.Arduino.valueToCode(block, 'ADD' + n, Blockly.Arduino.ORDER_NONE);
      if (argument == '') {
        code[n] = '""';
      } else {
        code[n] = 'String(' + argument + ')';
      }
    }
    return [code.join(' + '), Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
};

Blockly.Arduino.text_append = function(block) {
  var varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var txt = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_UNARY_POSTFIX);
  if (txt == '') {
    txt = '""';
  } else {
    txt = 'String(' + txt + ')';
  }
  return varName + ' += ' + txt + ';' + NEWLINE;
};

Blockly.Arduino.text_length = function(block) {
  var txt = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '""';
  return ['String(' + txt + ').length()', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_isEmpty = function(block) {
  Blockly.Arduino.addFunction('isStringEmpty', FUNCTIONS_MBOT.DEF_TEXT_IS_STRING_EMPTY);
  var txt = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX);
  if (txt == '') {
    txt = '""';
  } else {
    txt = 'String(' + txt + ')';
  }
  return ['isStringEmpty(' + txt + ')', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_changeCase = function (block) {
  const text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_NONE);
  const maj = block.getFieldValue("CASE");
  switch (maj) {
    case "UPPERCASE":
      return `${text}.toUpperCase()` + NEWLINE;
    case "LOWERCASE":
      return `${text}.toLowerCase()` + NEWLINE;
    case "TITLECASE":
      Blockly.Arduino.addFunction('toTitleCase', FUNCTIONS_ARDUINO.DEF_TEXT_TO_TITLE_CASE);
      return `toTitleCase(${text})` + NEWLINE;
  }
};
