/**
 * @fileoverview Loops generators for Python interfaces.
 */

Blockly.Python.controls_repeat = function (block) {
  let repeats = Blockly.Python.valueToCode(block, "TIMES", Blockly.Python.ORDER_NONE) || "0";
  if (Blockly.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = "int(" + repeats + ")";
  }
  let branch = Blockly.Python.statementToCode(block, "DO");
  branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
  const loopVar = Blockly.Python.nameDB_.getDistinctName("count", Blockly.VARIABLE_CATEGORY_NAME);
  const code = "for " + loopVar + " in range(" + repeats + "):" + NEWLINE + branch;
  return code;
};

Blockly.Python.controls_whileUntil = function (block) {
  const until = block.getFieldValue("MODE") == "UNTIL";
  let argument0 = Blockly.Python.valueToCode(block, "BOOL", until ? Blockly.Python.ORDER_LOGICAL_NOT : Blockly.Python.ORDER_NONE) || "False",
    branch = Blockly.Python.statementToCode(block, "DO");
  branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
  if (until) {
    argument0 = "not " + argument0;
  }
  return "while " + argument0 + ":" + NEWLINE + branch;
};

Blockly.Python.controls_for = function (block) {
  const variable0 = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME),
    argument0 = Blockly.Python.valueToCode(block, "FROM", Blockly.Python.ORDER_NONE) || "0",
    argument1 = Blockly.Python.valueToCode(block, "TO", Blockly.Python.ORDER_NONE) || "0",
    increment = Blockly.Python.valueToCode(block, "BY", Blockly.Python.ORDER_NONE) || "1";
  let branch = Blockly.Python.statementToCode(block, "DO");
  branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
  return "for " + variable0 + " in range(" + argument0 + ", " + argument1 + ", " + increment + "):" + NEWLINE + branch;
};

Blockly.Python.controls_forEach = function (block) {
  // For each loop.
  const variable0 = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
  const argument0 = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_RELATIONAL) || "[]";
  let branch = Blockly.Python.statementToCode(block, "DO");
  branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
  return "for " + variable0 + " in " + argument0 + ":" + NEWLINE + branch;
};

Blockly.Python.controls_flow_statements = function (block) {
  let xfix = "";
  if (Blockly.Python.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    xfix += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
  }
  if (Blockly.Python.STATEMENT_SUFFIX) {
    // Inject any statement suffix here since the regular one at the end
    // will not get executed if the break/continue is triggered.
    xfix += Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block);
  }
  if (Blockly.Python.STATEMENT_PREFIX) {
    const loop = Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(block);
    if (loop && !loop.suppressPrefixSuffix) {
      // Inject loop"s statement prefix here since the regular one at the end
      // of the loop will not get executed if "continue" is triggered.
      // In the case of "break", a prefix is needed due to the loop"s suffix.
      xfix += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, loop);
    }
  }
  switch (block.getFieldValue("FLOW")) {
    case "BREAK":
      return xfix + "break" + NEWLINE;
    case "CONTINUE":
      return xfix + "continue" + NEWLINE;
  }
  throw Error("Unknown flow statement.");
};

Blockly.Python.controls_pass_statements = function () {
  return "pass" + NEWLINE;
};

Blockly.Python.controls_ListComp = function (block) {
  const variable = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME),
    expr = Blockly.Python.valueToCode(block, "EXPR", Blockly.Python.ORDER_NONE) || "0",
    list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || '[]';

  let i = 1;
  let condition = "";
  while (block.getInput("ITEM" + i)) {
    let item = Blockly.Python.valueToCode(block, "ITEM" + i, Blockly.Python.ORDER_NONE) || "True";
    condition += " if " + item;
    i += 1;
  }

  return ["[" + expr + " for " + variable + " in " + list + condition + "]", Blockly.Python.ORDER_NONE];
}

Blockly.Python.controls_range = function (block) {
  let step, start, end;
  if (block.getInput("STEP")) {
    step = Blockly.Python.valueToCode(block, "STEP", Blockly.Python.ORDER_NONE) || "1";
    start = Blockly.Python.valueToCode(block, "START", Blockly.Python.ORDER_NONE) || "0";
    end = Blockly.Python.valueToCode(block, "END", Blockly.Python.ORDER_NONE) || "0";
    return ["range(" + start + ", " + end + ", " + step + ")", Blockly.Python.ORDER_NONE];
  } else if (block.getInput("START")) {
    start = Blockly.Python.valueToCode(block, "START", Blockly.Python.ORDER_NONE) || "0";
    end = Blockly.Python.valueToCode(block, "END", Blockly.Python.ORDER_NONE) || "0";
    return ["range(" + start + ", " + end + ")", Blockly.Python.ORDER_NONE];
  } else {
    end = Blockly.Python.valueToCode(block, "END", Blockly.Python.ORDER_NONE) || "0";
    return ["range(" + end + ")", Blockly.Python.ORDER_NONE];
  }
}