/**
 * @fileoverview Lists generators for Python interfaces.
 */

Blockly.Python.lists_create_with = function(block) {
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "None";
  }
  return ["[" + elements.join(", ") + "]", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.lists_repeat = function(block) {
  var item = Blockly.Python.valueToCode(block, "ITEM", Blockly.Python.ORDER_NONE) || "None";
  var times = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
  return ["[" + item + "] * " + times, Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python.lists_length = function(block) {
  var list = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "[]";
  return ["len(" + list + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.math_on_list = function(block) {
  var func = block.getFieldValue("OP"),
      list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]",
      code;
  switch (func) {
    case "SUM":
      code = "sum(" + list + ")";
      break;
    case "MIN":
      code = "min(" + list + ")";
      break;
    case "MAX":
      code = "max(" + list + ")";
      break;
    case "AVERAGE":
      Blockly.Python.addFunction('math_mean', FUNCTIONS.DEF_MATH_MEAN);
      code = "math_mean(" + list + ")";
      break;
    case "MEDIAN":
      Blockly.Python.addFunction('math_median', FUNCTIONS.DEF_MATH_MEDIAN);
      code = "math_median(" + list + ")";
      break;
    case "MODE":
      Blockly.Python.addFunction('math_modes', FUNCTIONS.DEF_MATH_MODES);
      code = "math_modes(" + list + ")";
      break;
    case "STD_DEV":
      Blockly.Python.addImport('math', IMPORT_MATH);
      Blockly.Python.addFunction('math_standard_deviation', FUNCTIONS.DEF_MATH_STANDARD_DEVIATION);
      code = "math_standard_deviation(" + list + ")";
      break;
    case "RANDOM":
      Blockly.Python.addImport('random', IMPORT_RANDOM);
      code = "random.choice(" + list + ")";
      break;
    default:
      throw Error("Unknown operator: " + func);
  }
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.lists_isEmpty = function(block) {
  var list = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "[]";
  return ["not len(" + list + ")", Blockly.Python.ORDER_LOGICAL_NOT];
};

Blockly.Python.lists_indexOf = function(block) {
  const list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]";
  const item = Blockly.Python.valueToCode(block, "FIND", Blockly.Python.ORDER_NONE) || "''";
  if (block.getFieldValue("END") == "FIRST") {
    return [list + ".index(" + item + ")", Blockly.Python.ORDER_FUNCTION_CALL];
  }
    return ["(len(" + list + ") - " + list + "[::-1].index(" + item + ") - 1)", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.lists_getIndex = function(block) {
  var mode = block.getFieldValue("MODE") || "GET",
      where = block.getFieldValue("WHERE") || "FROM_START",
      listOrder = (where == "RANDOM") ? Blockly.Python.ORDER_NONE : Blockly.Python.ORDER_MEMBER,
      list = Blockly.Python.valueToCode(block, "VALUE", listOrder) || "[]";

  switch (where) {
    case "FIRST":
      if (mode == "GET") {
        var code = list + "[0]";
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == "GET_REMOVE") {
        var code = list + ".pop(0)";
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == "REMOVE") {
        return list + ".pop(0)" + NEWLINE;
      }
      break;
    case "LAST":
      if (mode == "GET") {
        var code = list + "[-1]";
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == "GET_REMOVE") {
        var code = list + ".pop()";
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == "REMOVE") {
        return list + ".pop()" + NEWLINE;
      }
      break;
    case "FROM_START":
      var at = Blockly.Python.getAdjustedInt(block, "AT");
      if (mode == "GET") {
        var code = list + "[" + at + "]";
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == "GET_REMOVE") {
        var code = list + ".pop(" + at + ")";
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == "REMOVE") {
        return list + ".pop(" + at + ")" + NEWLINE;
      }
      break;
    case"FROM_END":
      var at = Blockly.Python.getAdjustedInt(block, "AT", 1, true);
      if (mode == "GET") {
        var code = list + "[" + at + "]";
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == "GET_REMOVE") {
        var code = list + ".pop(" + at + ")";
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == "REMOVE") {
        return list + ".pop(" + at + ")" + NEWLINE;
      }
      break;
    case "RANDOM":
      Blockly.Python.addImport('random', IMPORT_RANDOM);
      if (mode == "GET") {
        code = "random.choice(" + list + ")";
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else {
        Blockly.Python.addFunction('lists_remove_random_item', FUNCTIONS.DEF_LISTS_REMOVE_RANDOM_ITEM);
        code = "lists_remove_random_item(" + list + ")";
        if (mode == "GET_REMOVE") {
          return [code, Blockly.Python.ORDER_FUNCTION_CALL];
        } else if (mode == "REMOVE") {
          return code + NEWLINE;
        }
      }
      break;
  }
  throw Error("Unhandled combination (lists_getIndex).");
};

Blockly.Python.lists_append = function(block) {
  var list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_MEMBER) || "[]",
      value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "None";
  return list + ".append(" + value + ")" + NEWLINE;
};

Blockly.Python.lists_setIndex = function(block) {
  var list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_MEMBER) || "[]",
      mode = block.getFieldValue("MODE") || "SET",
      where = block.getFieldValue("WHERE") || "FROM_START",
      value = Blockly.Python.valueToCode(block, "TO", Blockly.Python.ORDER_NONE) || "None";
  function cacheList() {
    if (list.match(/^\w+$/)) {
      return "";
    }
    var listVar = Blockly.Python.nameDB_.getDistinctName('tmp_list', Blockly.VARIABLE_CATEGORY_NAME);
    var code = listVar + " = " + list + NEWLINE;
    list = listVar;
    return code;
  }
  switch (where) {
    case "FIRST":
      if (mode == "SET") {
        return list + "[0] = " + value + NEWLINE;
      } else if (mode == "INSERT") {
        return list + ".insert(0, " + value + ")" + NEWLINE;
      }
      break;
    case "LAST":
        if (mode == "SET") {
          return list + "[-1] = " + value + NEWLINE;
        } else if (mode == "INSERT") {
          return list + ".append(" + value + ")" + NEWLINE;
        }
      break;
    case "FROM_START":
      var at = Blockly.Python.getAdjustedInt(block, "AT");
        if (mode == "SET") {
          return list + "[" + at + "] = " + value + NEWLINE;
        } else if (mode == "INSERT") {
          return list + ".insert(" + at + ", " + value + ")" + NEWLINE;
        }
      break;
    case "FROM_END":
      var at = Blockly.Python.getAdjustedInt(block, "AT", 1, true);
        if (mode == "SET") {
          return list + "[" + at + "] = " + value + NEWLINE;
        } else if (mode == "INSERT") {
          return list + ".insert(" + at + ", " + value + ")" + NEWLINE;
        }
      break;
    case "RANDOM":
        Blockly.Python.addImport('random', IMPORT_RANDOM);
        var code = cacheList();
        var xVar = Blockly.Python.nameDB_.getDistinctName('tmp_x', Blockly.VARIABLE_CATEGORY_NAME);
        code += xVar + " = int(random.random() * len(" + list + "))" + NEWLINE;
        if (mode == "SET") {
          code += list + "[" + xVar + "] = " + value + NEWLINE;
          return code;
        } else if (mode == "INSERT") {
          code += list + ".insert(" + xVar + ", " + value + ")" + NEWLINE;
          return code;
        }
      break;
  }
  throw Error("Unhandled combination (lists_setIndex).");
};

Blockly.Python.lists_getSublist = function(block) {
  var list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_MEMBER) || "[]";
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
    default:ORDER_ATOMIC
      throw Error("Unhandled option (lists_getSublist)");
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
      throw Error("Unhandled option (lists_getSublist)");
  }
  return [list + "[" + at1 + ":" + at2 + "]", Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.lists_sort = function(block) {
  var list = (Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]");
  var type = block.getFieldValue("TYPE");
  var reverse = block.getFieldValue("DIRECTION") === "1" ? "False" : "True";
  Blockly.Python.addFunction('lists_sort', FUNCTIONS.DEF_LISTS_SORT);
  return ["lists_sort(" + list + ", '" + type + "', " + reverse + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.lists_split = function(block) {
  var mode = block.getFieldValue("MODE");
  if (mode == "SPLIT") {
    var value_input = Blockly.Python.valueToCode(block, "INPUT", Blockly.Python.ORDER_MEMBER) || "''",
        value_delim = Blockly.Python.valueToCode(block, "DELIM", Blockly.Python.ORDER_NONE),
        code = value_input + ".split(" + value_delim + ")";
  } else if (mode == "JOIN") {
    var value_input = Blockly.Python.valueToCode(block, "INPUT", Blockly.Python.ORDER_NONE) || "[]",
        value_delim = Blockly.Python.valueToCode(block, "DELIM", Blockly.Python.ORDER_MEMBER) || "''",
        code = value_delim + ".join(" + value_input + ")";
  } else {
    throw Error("Unknown mode: " + mode);
  }
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.lists_reverse = function(block) {
  var list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]";
  return ["list(reversed(" + list + "))", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.lists_shuffle = function(block) {
  var list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]";
  Blockly.Python.addImport('random', IMPORT_RANDOM);
  return `random.shuffle(${list})${NEWLINE}`;
};