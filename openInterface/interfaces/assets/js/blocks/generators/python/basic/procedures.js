/**
 * @fileoverview Procedures generators for Python interfaces.
 */

// add Globals for Thymio (may need to complete the list of variables or specific methods)
Blockly.Python.regexVarGlobals_ = /(motor_left_target|motor_right_target|prox_ground_delta|prox_horizontal)/g;

/**
 * Define Global variables for Thymio
 * @param {string} code Generated branch code.
 * @return {string} global variables for Thymio.
 * */
const getGlobals = (code) => {
  const globals = [];
  const detectVar = code.match(Blockly.Python.regexVarGlobals_);
	const regexGlobals = new RegExp('\\b(' + Blockly.Python.variables_.join('|') + ')\\b', 'g');
	const detectGlobalVar = code.match(regexGlobals);
	if (detectVar) {
		globals.push(...detectVar.filter((item, index) => detectVar.indexOf(item) === index));
	}
	// console.log(Blockly.Python.variables_);
	if (detectGlobalVar && Blockly.Python.variables_.length > 0) {
		globals.push(...detectGlobalVar.filter((item, index) => detectGlobalVar.indexOf(item) === index));
	}
  if (globals.length > 0) {
    return '  global ' + globals.join(', ')+ NEWLINE;
  } else {
    return null;
  };
};

Blockly.Python.procedures_defreturn = function (block) {
  var funcName = Blockly.Python.nameDB_.getName(block.getFieldValue("NAME"), Blockly.PROCEDURE_CATEGORY_NAME),
    xfix1 = "";
  if (Blockly.Python.STATEMENT_PREFIX) {
    xfix1 += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
  }
  if (Blockly.Python.STATEMENT_SUFFIX) {
    xfix1 += Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block);
  }
  if (xfix1) {
    xfix1 = Blockly.Python.prefixLines(xfix1, Blockly.Python.INDENT);
  }
  var loopTrap = "";
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    loopTrap = Blockly.Python.prefixLines(
      Blockly.Python.injectId(Blockly.Python.INFINITE_LOOP_TRAP, block),
      Blockly.Python.INDENT);
  }
  
  let branch = Blockly.Python.statementToCode(block, "STACK")
  
   // get globals for Thymio custom functions
  if (INTERFACE_NAME === "thymio") {
    const globalsVariables = getGlobals(branch);
    if (globalsVariables !== null) {
      branch = globalsVariables + branch;
    }
  }

  var returnValue = Blockly.Python.valueToCode(block, "RETURN", Blockly.Python.ORDER_NONE) || "",
    xfix2 = "";
  if (branch && returnValue) {
    xfix2 = xfix1;
  }
  if (block.type == "procedures_defreturn") {
    if (returnValue) {
      returnValue = Blockly.Python.INDENT + "return " + returnValue + NEWLINE;
    } else {
      returnValue = Blockly.Python.INDENT + "return " + NEWLINE;
    }
  } else if (!branch) {
    branch = Blockly.Python.PASS;
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Python.nameDB_.getName(block.arguments_[i], Blockly.VARIABLE_CATEGORY_NAME);
  }
  var code = "def " + funcName + "(" + args.join(", ") + "):" + NEWLINE + xfix1 + loopTrap + branch + xfix2 + returnValue;
  code = Blockly.Python.scrub_(block, code);
  Blockly.Python.userFunctions_["%" + funcName] = code;
  return null;
};

Blockly.Python.procedures_defnoreturn = Blockly.Python.procedures_defreturn;

Blockly.Python.procedures_callreturn = function (block) {
  var funcName = Blockly.Python.nameDB_.getName(block.getFieldValue("NAME"), Blockly.PROCEDURE_CATEGORY_NAME),
    args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Python.valueToCode(block, "ARG" + i, Blockly.Python.ORDER_NONE) || "None";
  }
  return [funcName + "(" + args.join(", ") + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.procedures_callnoreturn = function (block) {
  var tuple = Blockly.Python.procedures_callreturn(block);
  return tuple[0] + NEWLINE;
};

Blockly.Python.procedures_ifreturn = function (block) {
  var condition = Blockly.Python.valueToCode(block, "CONDITION", Blockly.Python.ORDER_NONE) || "False",
    code = "if " + condition + ":" + NEWLINE;
  if (Blockly.Python.STATEMENT_SUFFIX) {
    code += Blockly.Python.prefixLines(
      Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
      Blockly.Python.INDENT);
  }
  if (block.hasReturnValue_) {
    var value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "None";
    code += Blockly.Python.INDENT + "return " + value + NEWLINE;
  } else {
    code += Blockly.Python.INDENT + "return" + NEWLINE;
  }
  return code;
};

Blockly.Python.procedures_simple_return = function(block) {
  const returnValue = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '';
  return 'return ' + returnValue + NEWLINE;
};
