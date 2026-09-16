/**
 * @fileoverview Text generators for Arduino.
 */

Blockly.Arduino.text_comment = function () {
  return "//" + this.getFieldValue("TEXT") + NEWLINE || "" + NEWLINE;
};

Blockly.Arduino.text = function (block) {
  return [Blockly.Arduino.quote_(block.getFieldValue('TEXT')), Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_join = function (block) {
  if (block.itemCount_ == 0) {
    return ['""', Blockly.Arduino.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    const txt = Blockly.Arduino.valueToCode(block, 'ADD0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '""';
    return ['String(' + txt + ')', Blockly.Arduino.ORDER_UNARY_POSTFIX];
  } else {
    let argument;
    let code = [];
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

Blockly.Arduino.text_newline = function (block) {
  const n = Blockly.Arduino.valueToCode(block, "N", Blockly.Arduino.ORDER_NONE) || "0";
  return [`"${"\\n".repeat(n)}"`, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_append = function (block) {
  const varName = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  let text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_UNARY_POSTFIX);
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
    text = "String(" + text + ")";
  }
  return varName + ' += ' + text + ';' + NEWLINE;
};

Blockly.Arduino.text_split = function (block) {
  let text = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_NONE) || '""';
  let separator = Blockly.Arduino.valueToCode(block, "SEP", Blockly.Arduino.ORDER_NONE) || '""';
  Blockly.Arduino.addFunction("splitString", FUNCTIONS_ARDUINO.DEF_SPLIT_STRING);
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "VALUE")) {
    text = "String(" + text + ")";
  }
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "SEP")) {
    separator = "String(" + separator + ")";
  }
  return ["splitString(" + text + ", " + separator + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_length = function (block) {
  const text = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '""';
  return ['String(' + text + ').length()', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_isEmpty = function (block) {
  Blockly.Arduino.addFunction('isStringEmpty', FUNCTIONS_ARDUINO.DEF_TEXT_IS_STRING_EMPTY);
  let text = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "VALUE")) {
    text = "String(" + text + ")";
  }
  return ['isStringEmpty(' + text + ')', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_includesSubstr = function (block) {
  const text = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_NONE) || '""';
  let substring = Blockly.Arduino.valueToCode(block, "FIND", Blockly.Arduino.ORDER_NONE) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "FIND")) {
    substring = "String(" + substring + ")";
  }
  return [text + ".indexOf(" + substring + ") >= 0", Blockly.Arduino.ORDER_RELATIONAL];
};

Blockly.Arduino.text_indexOf = function (block) {
  const operator = block.getFieldValue("END") === "FIRST" ? "indexOf" : "lastIndexOf";
  const substring = Blockly.Arduino.valueToCode(block, "FIND", Blockly.Arduino.ORDER_NONE) || '""';
  const text = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_NONE) || '""';
  const code = "String(" + text + ")." + operator + "(" + substring + ")";
  if (block.workspace.options.oneBasedIndex) {
    return ["(" + code + " + 1)", Blockly.Arduino.ORDER_ADDITIVE];
  }
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_charAt = function (block) {
  const where = block.getFieldValue("WHERE") || "FROM_START";
  let text = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_NONE) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "VALUE")) {
    text = "String(" + text + ")";
  }
  switch (where) {
    case "FIRST":
      return [text + ".charAt(0)", Blockly.Arduino.ORDER_UNARY_POSTFIX];
    case "LAST":
      return [text + ".charAt(" + text + ".length() - 1)", Blockly.Arduino.ORDER_UNARY_POSTFIX];
    case "FROM_START":
      var at = Blockly.Arduino.getAdjustedInt(block, "AT");
      return [text + ".charAt(" + at + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
    case "FROM_END":
      var at = Blockly.Arduino.getAdjustedInt(block, "AT", 1, true);
      return [text + ".charAt(" + text + ".length() + " + at + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
    case "RANDOM":
      return [text + ".charAt(random(" + text + ".length()))", Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
  throw Error("Unhandled option (text_charAt).");
};

Blockly.Arduino.text_getSubstring = function (block) {
  let text = Blockly.Arduino.valueToCode(block, "STRING", Blockly.Arduino.ORDER_NONE) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "STRING")) {
    text = "String(" + text + ")";
  }
  let at1;
  let at2;
  switch (block.getFieldValue("WHERE1")) {
    case "FROM_START":
      at1 = Blockly.Arduino.getAdjustedInt(block, "AT1");
      break;
    case "FROM_END":
      at1 = text + ".length() - " + Blockly.Arduino.getAdjustedInt(block, "AT1", 1);
      break;
    case "FIRST":
      at1 = "0";
      break;
    default:
      throw Error("Unhandled option (text_getSubstring)");
  }
  switch (block.getFieldValue("WHERE2")) {
    case "FROM_START":
      at2 = Blockly.Arduino.getAdjustedInt(block, "AT2", 1);
      break;
    case "FROM_END":
      at2 = text + ".length() - " + Blockly.Arduino.getAdjustedInt(block, "AT2");
      break;
    case "LAST":
      at2 = text + ".length()";
      break;
    default:
      throw Error("Unhandled option (text_getSubstring)");
  }
  return [text + ".substring(" + at1 + ", " + at2 + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_count_characters = function (block) {
  Blockly.Arduino.addFunction("countChars", FUNCTIONS_ARDUINO.DEF_TEXT_COUNT_CHARACTERS);
  const charType = block.getFieldValue("TYPE");
  let text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_NONE) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
    text = "String(" + text + ")";
  }
  return ["countChars(" + text + ", \"" + charType + "\")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_trim = function (block) {
  Blockly.Arduino.addFunction("trimString", FUNCTIONS_ARDUINO.DEF_TRIM_STRING);
  const mode = block.getFieldValue("MODE");
  let text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_NONE) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
    text = "String(" + text + ")";
  }
  return ["trimString(" + text + ', "' + mode + '")', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_changeCase = function (block) {
  const mode = block.getFieldValue("CASE");
  let text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_NONE) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
    text = "String(" + text + ")";
  }
  switch (mode) {
    case "UPPERCASE":
      Blockly.Arduino.addFunction("toUpperCaseString", FUNCTIONS_ARDUINO.DEF_TEXT_TO_UPPER_CASE);
      return ["toUpperCaseString(" + text + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
    case "LOWERCASE":
      Blockly.Arduino.addFunction("toLowerCaseString", FUNCTIONS_ARDUINO.DEF_TEXT_TO_LOWER_CASE);
      return ["toLowerCaseString(" + text + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
    case "TITLECASE":
      Blockly.Arduino.addFunction("toTitleCase", FUNCTIONS_ARDUINO.DEF_TEXT_TO_TITLE_CASE);
      return ["toTitleCase(" + text + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
};

Blockly.Arduino.text_count = function (block) {
  Blockly.Arduino.addFunction("countString", FUNCTIONS_ARDUINO.DEF_COUNT_STRING);
  let text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_NONE) || '""';
  let sub = Blockly.Arduino.valueToCode(block, "SUB", Blockly.Arduino.ORDER_NONE) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
    text = "String(" + text + ")";
  }
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "SUB")) {
    sub = "String(" + sub + ")";
  }
  return ["countString(" + text + ", " + sub + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_reverse = function (block) {
  Blockly.Arduino.addFunction("reverseString", FUNCTIONS_ARDUINO.DEF_REVERSE_STRING);
  let text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_NONE) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
    text = "String(" + text + ")";
  }
  return ["reverseString(" + text + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_replace = function (block) {
  Blockly.Arduino.addFunction("replaceString", FUNCTIONS_ARDUINO.DEF_REPLACE_STRING);
  let text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_NONE) || '""';
  let from = Blockly.Arduino.valueToCode(block, "FROM", Blockly.Arduino.ORDER_NONE) || '""';
  let to = Blockly.Arduino.valueToCode(block, "TO", Blockly.Arduino.ORDER_NONE) || '""';
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
    text = "String(" + text + ")";
  }
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "FROM")) {
    from = "String(" + from + ")";
  }
  if (!Blockly.Constants.Utils.isInputTextBlock(block, "TO")) {
    to = "String(" + to + ")";
  }
  return ["replaceString(" + text + ", " + from + ", " + to + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.text_random_string = function (block) {
  Blockly.Arduino.addFunction("randomString", FUNCTIONS_ARDUINO.DEF_TEXT_RANDOM_STRING);
  const length = Blockly.Arduino.valueToCode(block, "LENGTH", Blockly.Arduino.ORDER_NONE) || "0";
  return ["randomString(" + length + ")", Blockly.Arduino.ORDER_UNARY_POSTFIX];
};
