/**
 * @fileoverview Logic generators for Python interfaces.
 */

Blockly.Python.controls_if = function (block) {
  let n = 0;
  let code = "", branchCode;
  if (Blockly.Python.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
  }
  do {
    const conditionCode = Blockly.Python.valueToCode(block, "IF" + n, Blockly.Python.ORDER_NONE) || "False";
    branchCode = Blockly.Python.statementToCode(block, "DO" + n) || Blockly.Python.PASS;
    if (Blockly.Python.STATEMENT_SUFFIX) {
      branchCode = Blockly.Python.prefixLines(
        Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
        Blockly.Python.INDENT) + branchCode;
    }
    code += (n == 0 ? "if " : "elif ") + conditionCode + ":" + NEWLINE + branchCode;
    ++n;
  } while (block.getInput("IF" + n));

  if (block.getInput("ELSE") || Blockly.Python.STATEMENT_SUFFIX) {
    branchCode = Blockly.Python.statementToCode(block, "ELSE") || Blockly.Python.PASS;
    if (Blockly.Python.STATEMENT_SUFFIX) {
      branchCode = Blockly.Python.prefixLines(
        Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
        Blockly.Python.INDENT) + branchCode;
    }
    code += "else:" + NEWLINE + branchCode;
  }
  return code;
};

Blockly.Python.logic_compare = function (block) {
  const OPERATORS = {
    "EQ": "==",
    "NEQ": "!=",
    "LT": "<",
    "LTE": "<=",
    "GT": ">",
    "GTE": ">=",
    "IS": "is",
    "ISNOT": "is not",
    "IN": "in",
    "NOTIN": "not in"
  };
  const operator = OPERATORS[block.getFieldValue("OP")],
    order = Blockly.Python.ORDER_RELATIONAL,
    argument0 = Blockly.Python.valueToCode(block, "A", order) || "0",
    argument1 = Blockly.Python.valueToCode(block, "B", order) || "0";
  return [argument0 + " " + operator + " " + argument1, order];
};

Blockly.Python.logic_compare_2 = function (block) {
  const OPERATORS = {
    "EQ": "==",
    "NEQ": "!=",
    "LT": "<",
    "LTE": "<=",
    "GT": ">",
    "GTE": ">=",
    "IS": "is",
    "ISNOT": "is not",
    "IN": "in",
    "NOTIN": "not in"
  };
  const operator1 = OPERATORS[block.getFieldValue("OP0")],
    operator2 = OPERATORS[block.getFieldValue("OP1")],
    order = Blockly.Python.ORDER_RELATIONAL,
    argument0 = Blockly.Python.valueToCode(block, "A", order) || "0",
    argument1 = Blockly.Python.valueToCode(block, "B", order) || "0",
    argument2 = Blockly.Python.valueToCode(block, "C", order) || "0";
  return [argument0 + " " + operator1 + " " + argument1 + " " + operator2 + " " + argument2, order];
};

Blockly.Python.logic_operation = function (block) {
  const operator = (block.getFieldValue("OP") == "AND") ? "and" : "or",
    order = (operator == "and") ? Blockly.Python.ORDER_LOGICAL_AND : Blockly.Python.ORDER_LOGICAL_OR;
  let argument0 = Blockly.Python.valueToCode(block, "A", order),
    argument1 = Blockly.Python.valueToCode(block, "B", order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = "False";
    argument1 = "False";
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == "and") ? "True" : "False";
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  return [argument0 + " " + operator + " " + argument1, order];
};

Blockly.Python.logic_boolean = function (block) {
  return [block.getFieldValue("BOOL") == "TRUE" ? "True" : "False", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.logic_negate = function (block) {
  const argument0 = Blockly.Python.valueToCode(block, "BOOL", Blockly.Python.ORDER_LOGICAL_NOT) || "True";
  return ["not " + argument0, Blockly.Python.ORDER_LOGICAL_NOT];
};

Blockly.Python.logic_null = function () {
  return ["None", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.logic_ternary = function (block) {
  const value_if = Blockly.Python.valueToCode(block, "IF", Blockly.Python.ORDER_CONDITIONAL) || "False";
  const value_then = Blockly.Python.valueToCode(block, "THEN", Blockly.Python.ORDER_CONDITIONAL) || "None";
  const value_else = Blockly.Python.valueToCode(block, "ELSE", Blockly.Python.ORDER_CONDITIONAL) || "None";
  return [value_then + " if " + value_if + " else " + value_else, Blockly.Python.ORDER_CONDITIONAL];
};

Blockly.Python.logic_assert = function (block) {
  const argument0 = Blockly.Python.valueToCode(block, "BOOL", Blockly.Python.ORDER_LOGICAL_NOT) || "False";
  const argument1 = Blockly.Python.valueToCode(block, "THEN", Blockly.Python.ORDER_CONDITIONAL) || "None";
  return "assert " + argument0 + ", " + argument1;
};