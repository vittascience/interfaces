/**
 * @fileoverview Text generators for Python interfaces.
 */

Blockly.Python.text_comment = function () {
  return "#" + this.getFieldValue("TEXT") + NEWLINE || "" + NEWLINE;
};

Blockly.Python.text = function (block) {
  const text = Blockly.Python.quote_(block.getFieldValue("TEXT"));
  return [text, Blockly.Python.ORDER_ATOMIC];
};

/**
 * Enclose the provided value in "str(...)" function.
 * Leave string literals alone.
 * @param {string} value Code evaluating to a value.
 * @return {string} Code evaluating to a string.
 * @private
 */
Blockly.Python.text.forceString_ = function (value) {
  if (Blockly.Python.text.forceString_.strRegExp.test(value)) {
    return value;
  }
  return "str(" + value + ")";
};

/**
 * Regular expression to detect a single-quoted string literal.
 */
Blockly.Python.text.forceString_.strRegExp = /^\s*'([^']|\\')*'\s*$/;

Blockly.Python.text_join = function (block) {
  switch (block.itemCount_) {
    case 0:
      return ["''", Blockly.Python.ORDER_ATOMIC];
    case 1:
      const element = Blockly.Python.valueToCode(block, "ADD0", Blockly.Python.ORDER_NONE) || "''";
      return [Blockly.Python.text.forceString_(element), Blockly.Python.ORDER_FUNCTION_CALL];
    case 2:
      const element0 = Blockly.Python.valueToCode(block, "ADD0", Blockly.Python.ORDER_NONE) || "''",
        element1 = Blockly.Python.valueToCode(block, "ADD1", Blockly.Python.ORDER_NONE) || "''";
      return [Blockly.Python.text.forceString_(element0) + " + " + Blockly.Python.text.forceString_(element1), Blockly.Python.ORDER_ADDITIVE];
    default:
      let format = ".format(";
      let firstItem = true;
      for (var i = 0; i < block.itemCount_; i++) {
        const input = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "''";
        if (!firstItem) {
          format += ", " + input;
        } else {
          format += input;
          firstItem = false;
        }
      }
      return ["('{}' * " + block.itemCount_ + ")" + format + ")", Blockly.Python.ORDER_FUNCTION_CALL];
  }
};

// only for new python to blocks
Blockly.Python.text_join_simple = function (block) {
  switch (block.itemCount_) {
    case 0:
      return ["''", Blockly.Python.ORDER_ATOMIC];
    case 1:
      const element = Blockly.Python.valueToCode(block, "ADD0", Blockly.Python.ORDER_NONE) || "''";
      return [Blockly.Python.text.forceString_(element), Blockly.Python.ORDER_FUNCTION_CALL];
    case 2:
      const element0 = Blockly.Python.valueToCode(block, "ADD0", Blockly.Python.ORDER_NONE) || "''",
        element1 = Blockly.Python.valueToCode(block, "ADD1", Blockly.Python.ORDER_NONE) || "''";
      return [Blockly.Python.text.forceString_(element0) + " + " + Blockly.Python.text.forceString_(element1), Blockly.Python.ORDER_ADDITIVE];
    default:
      let finalString = [];
      for (var i = 0; i < block.itemCount_; i++) {
        const input = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "''";
        finalString.push(`str(${input})`);
        
      }
      return [`${finalString.join(' + ')}`, Blockly.Python.ORDER_FUNCTION_CALL];
  }
};

Blockly.Python.text_newline = function (block) {
  const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
  return [`"${"\\n".repeat(n)}"`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_append = function (block) {
  const varName = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME),
    value = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
  return varName + " = str(" + varName + ") + " + Blockly.Python.text.forceString_(value) + NEWLINE;
};

Blockly.Python.text_split = function (block) {
  const text = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''",
    separator = Blockly.Python.valueToCode(block, "SEP", Blockly.Python.ORDER_NONE) || "''";
  return ["str(" + text + ").split(" + separator + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.text_length = function (block) {
  const text = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
  return ["len(" + text + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.text_isEmpty = function (block) {
  const text = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
  return ["not len(" + text + ")", Blockly.Python.ORDER_LOGICAL_NOT];
};

Blockly.Python.text_indexOf = function (block) {
  const operator = block.getFieldValue("END") == "FIRST" ? "find" : "rfind",
    substring = Blockly.Python.valueToCode(block, "FIND", Blockly.Python.ORDER_NONE) || "''",
    text = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_MEMBER) || "''",
    code = text + "." + operator + "(" + substring + ")";
  if (block.workspace.options.oneBasedIndex) {
    return [code, Blockly.Python.ORDER_ADDITIVE];
  }
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.text_charAt = function (block) {
  const where = block.getFieldValue("WHERE") || "FROM_START",
    text = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_MEMBER) || "''";
  switch (where) {
    case "FIRST":
      return [text + "[0]", Blockly.Python.ORDER_MEMBER];
    case "LAST":
      return [text + "[-1]", Blockly.Python.ORDER_MEMBER];
    case "FROM_START":
      var at = Blockly.Python.getAdjustedInt(block, "AT");
      return [text + "[" + at + "]", Blockly.Python.ORDER_MEMBER];
    case "FROM_END":
      var at = Blockly.Python.getAdjustedInt(block, "AT", 1, true);
      return [text + "[" + at + "]", Blockly.Python.ORDER_MEMBER];
    case "RANDOM":
      Blockly.Python.addImport('random', IMPORT_RANDOM);
      Blockly.Python.addFunction('random_letter', FUNCTIONS.DEF_TEXT_RANDOM_LETTER);
      return ["random_letter(" + text + ")", Blockly.Python.ORDER_FUNCTION_CALL];
  }
  throw Error("Unhandled option (text_charAt).");
};

Blockly.Python.text_getSubstring = function (block) {
  const text = Blockly.Python.valueToCode(block, "STRING", Blockly.Python.ORDER_MEMBER) || "''";
  switch (block.getFieldValue("WHERE1")) {
    case "FROM_START":
      var at1 = Blockly.Python.getAdjustedInt(block, "AT1");
      if (at1 == "0") {
        at1 = "";
      }
      break;
    case "FROM_END":
      var at1 = Blockly.Python.getAdjustedInt(block, "AT1", 1, true);
      break;
    case "FIRST":
      var at1 = "";
      break;
    default:
      throw Error("Unhandled option (text_getSubstring)");
  }
  switch (block.getFieldValue("WHERE2")) {
    case "FROM_START":
      var at2 = Blockly.Python.getAdjustedInt(block, "AT2", 1);
      break;
    case "FROM_END":
      var at2 = Blockly.Python.getAdjustedInt(block, "AT2", 0, true);
      if (!Blockly.isNumber(String(at2))) {
        Blockly.Python.addImport('sys', IMPORT_SYS);
        at2 += " or sys.maxsize";
      } else if (at2 == "0") {
        at2 = "";
      }
      break;
    case "LAST":
      var at2 = "";
      break;
    default:
      throw Error("Unhandled option (text_getSubstring)");
  }
  return [text + "[" + at1 + ":" + at2 + "]", Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.text_changeCase = function (block) {
  const OPERATORS = {
    "UPPERCASE": ".upper()",
    "LOWERCASE": ".lower()",
    "TITLECASE": ".title()"
  };
  const operator = OPERATORS[block.getFieldValue("CASE")],
    text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''";
  return [text + operator, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.text_trim = function (block) {
  const OPERATORS = {
    "LEFT": ".lstrip()",
    "RIGHT": ".rstrip()",
    "BOTH": ".strip()"
  };
  const operator = OPERATORS[block.getFieldValue("MODE")],
    text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''";
  return [text + operator, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.text_count = function (block) {
  const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''",
    sub = Blockly.Python.valueToCode(block, "SUB", Blockly.Python.ORDER_NONE) || "''";
  return [text + ".count(" + sub + ")", Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.text_replace = function (block) {
  const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''",
    from = Blockly.Python.valueToCode(block, "FROM", Blockly.Python.ORDER_NONE) || "''",
    to = Blockly.Python.valueToCode(block, "TO", Blockly.Python.ORDER_NONE) || "''";
  return [text + ".replace(" + from + ", " + to + ")", Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.text_reverse = function (block) {
  const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''";
  return [text + "[::-1]", Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.text_count_characters = function (block) {
  const charType = block.getFieldValue("TYPE");
  const password = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_MEMBER) || "''";
  Blockly.Python.addFunction('count_chars', FUNCTIONS.DEF_TEXT_COUNT_CHARACTERS)
  return [`count_chars("${charType}",${password})`, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.text_random_string = function (block) {
  const length = Blockly.Python.valueToCode(block, "LENGTH", Blockly.Python.ORDER_MEMBER) || "0";
  Blockly.Python.addImport('random', IMPORT_RANDOM);
  Blockly.Python.addFunction('random_string', FUNCTIONS.DEF_TEXT_RANDOM_STRING)
  return [`random_string(${length})`, Blockly.Python.ORDER_MEMBER];
};