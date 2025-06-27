/**
 * @fileoverview Lists generators for Python interfaces.
 */

// If any new block imports any library, add that library name here.
Blockly.Python.addReservedWords("math,random");

Blockly.Python.math_number = function (block) {
  let code = Number(block.getFieldValue("NUM"));
  let order;
  if (code == Infinity) {
    code = "float('inf')";
    order = Blockly.Python.ORDER_FUNCTION_CALL;
  } else if (code == -Infinity) {
    code = "-float('inf')";
    order = Blockly.Python.ORDER_UNARY_SIGN;
  } else {
    order = code < 0 ? Blockly.Python.ORDER_UNARY_SIGN : Blockly.Python.ORDER_ATOMIC;
  }
  return [code, order];
};

Blockly.Python.math_arithmetic = function (block) {
  // Basic arithmetic operators, and power.
  const OPERATORS = {
    "ADD": [" + ", Blockly.Python.ORDER_ADDITIVE],
    "MINUS": [" - ", Blockly.Python.ORDER_ADDITIVE],
    "MULTIPLY": [" * ", Blockly.Python.ORDER_MULTIPLICATIVE],
    "DIVIDE": [" / ", Blockly.Python.ORDER_MULTIPLICATIVE],
    "POWER": [" ** ", Blockly.Python.ORDER_EXPONENTIATION]
  };
  const tuple = OPERATORS[block.getFieldValue("OP")];
  const operator = tuple[0];
  const order = tuple[1];
  const argument0 = Blockly.Python.valueToCode(block, "A", order) || "0";
  const argument1 = Blockly.Python.valueToCode(block, "B", order) || "0";
  return [argument0 + operator + argument1, order];
  // In case of "DIVIDE", division between integers returns different results
  // in Python 2 and 3. However, is not an issue since Blockly does not
  // guarantee identical results in all languages.  To do otherwise would
  // require every operator to be wrapped in a function call.  This would kill
  // legibility of the generated code.
};

Blockly.Python.math_single = function (block) {
  // Math operators with single operand.
  const operator = block.getFieldValue("OP");
  let code;
  let arg;
  if (operator == "NEG") {
    // Negation is a special case given its different operator precedence.
    code = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_UNARY_SIGN) || "0";
    return ["-" + code, Blockly.Python.ORDER_UNARY_SIGN];
  }
  Blockly.Python.addImport('math', IMPORT_MATH);
  if (operator == "SIN" || operator == "COS" || operator == "TAN") {
    arg = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
  } else {
    arg = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_NONE) || "0";
  }
  // First, handle cases which generate values that don"t need parentheses
  // wrapping the code.
  switch (operator) {
    case "ABS":
      code = "math.fabs(" + arg + ")";
      break;
    case "ROOT":
      code = "math.sqrt(" + arg + ")";
      break;
    case "LN":
      code = "math.log(" + arg + ")";
      break;
    case "LOG10":
      if (INTERFACE_NAME == 'TI-83') {
        code = "math.log(" + arg + ")/math.log(10)";
      } else {
        code = "math.log10(" + arg + ")";
      }
      break;
    case "EXP":
      code = "math.exp(" + arg + ")";
      break;
    case "POW10":
      code = "math.pow(10," + arg + ")";
      break;
    case "ROUND":
      code = "round(" + arg + ")";
      break;
    case "ROUNDUP":
      code = "math.ceil(" + arg + ")";
      break;
    case "ROUNDDOWN":
      code = "math.floor(" + arg + ")";
      break;
    case "SIN":
      code = "math.sin(" + arg + " / 180.0 * math.pi)";
      break;
    case "COS":
      code = "math.cos(" + arg + " / 180.0 * math.pi)";
      break;
    case "TAN":
      code = "math.tan(" + arg + " / 180.0 * math.pi)";
      break;
  }
  if (code) {
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case "ASIN":
      code = "math.asin(" + arg + ") / math.pi * 180";
      break;
    case "ACOS":
      code = "math.acos(" + arg + ") / math.pi * 180";
      break;
    case "ATAN":
      code = "math.atan(" + arg + ") / math.pi * 180";
      break;
    default:
      throw Error("Unknown math operator: " + operator);
  }
  return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python.math_constant = function (block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  const CONSTANTS = {
    "PI": ["math.pi", Blockly.Python.ORDER_MEMBER],
    "E": ["math.e", Blockly.Python.ORDER_MEMBER],
    "GOLDEN_RATIO": ["(1 + math.sqrt(5)) / 2", Blockly.Python.ORDER_MULTIPLICATIVE],
    "SQRT2": ["math.sqrt(2)", Blockly.Python.ORDER_MEMBER],
    "SQRT1_2": ["math.sqrt(1.0 / 2)", Blockly.Python.ORDER_MEMBER],
    "INFINITY": ["float(\"inf\")", Blockly.Python.ORDER_ATOMIC]
  };
  const constant = block.getFieldValue("CONSTANT");
  if (constant != "INFINITY") {
    Blockly.Python.addImport('math', IMPORT_MATH);
  }
  return CONSTANTS[constant];
};

Blockly.Python.math_number_property = function (block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  const number_to_check = Blockly.Python.valueToCode(block, "NUMBER_TO_CHECK", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
  const dropdown_property = block.getFieldValue("PROPERTY");
  let code;
  if (dropdown_property == "PRIME") {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addFunction('func_isPrime', FUNCTIONS.DEF_MATH_IS_PRIME)
    code = "math_isPrime(" + number_to_check + ")";
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  }
  switch (dropdown_property) {
    case "EVEN":
      code = number_to_check + " % 2 == 0";
      break;
    case "ODD":
      code = number_to_check + " % 2 == 1";
      break;
    case "WHOLE":
      code = number_to_check + " % 1 == 0";
      break;
    case "POSITIVE":
      code = number_to_check + " > 0";
      break;
    case "NEGATIVE":
      code = number_to_check + " < 0";
      break;
    case "DIVISIBLE_BY":
      var divisor = Blockly.Python.valueToCode(block, "DIVISOR", Blockly.Python.ORDER_MULTIPLICATIVE);
      // If "divisor" is some code that evals to 0, Python will raise an error.
      if (!divisor || divisor == "0") {
        return ["False", Blockly.Python.ORDER_ATOMIC];
      }
      code = number_to_check + " % " + divisor + " == 0";
      break;
  }
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

// Rounding functions have a single operand.
Blockly.Python.math_round = Blockly.Python.math_single;

Blockly.Python.math_round_ndigits = function (block) {
  const digits = Blockly.Python.valueToCode(block, "DIGITS", Blockly.Python.ORDER_NONE) || "0";
  const number = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_NONE) || "0";
  if (digits === "0") {
    return ["round(" + number + ")", Blockly.Python.ORDER_NONE];
  } else {
    return ["round(" + number + ", " + Math.round(digits) + ")", Blockly.Python.ORDER_NONE];
  }
};

// Trigonometry functions have a single operand.
Blockly.Python.math_trig = Blockly.Python.math_single;

Blockly.Python.math_map = function (block) {
  Blockly.Python.addFunction('map', FUNCTIONS.DEF_PYTHON_MAP);
  const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ADDITIVE) || "0";
  const min1 = Blockly.Python.valueToCode(block, "MIN1", Blockly.Python.ORDER_ADDITIVE) || "0";
  const max1 = Blockly.Python.valueToCode(block, "MAX1", Blockly.Python.ORDER_ADDITIVE) || "0";
  const min2 = Blockly.Python.valueToCode(block, "MIN2", Blockly.Python.ORDER_ADDITIVE) || "0";
  const max2 = Blockly.Python.valueToCode(block, "MAX2", Blockly.Python.ORDER_ADDITIVE) || "0";
  return ["map(" + value + ", " + min1 + ", " + max1 + ", " + min2 + ", " + max2 + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.math_modulo = function (block) {
  const argument0 = Blockly.Python.valueToCode(block, "DIVIDEND", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
  const argument1 = Blockly.Python.valueToCode(block, "DIVISOR", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
  return [argument0 + " % " + argument1, Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python.math_constrain = function (block) {
  const argument0 = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
  const argument1 = Blockly.Python.valueToCode(block, "LOW", Blockly.Python.ORDER_NONE) || "0";
  const argument2 = Blockly.Python.valueToCode(block, "HIGH", Blockly.Python.ORDER_NONE) || "float(\"inf\")";
  return ["min(max(" + argument0 + ", " + argument1 + "), " + argument2 + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.math_random_int = function (block) {
  Blockly.Python.addImport('random', IMPORT_RANDOM);
  const argument0 = Blockly.Python.valueToCode(block, "FROM", Blockly.Python.ORDER_NONE) || "0";
  const argument1 = Blockly.Python.valueToCode(block, "TO", Blockly.Python.ORDER_NONE) || "0";
  return ["random.randint(" + argument0 + ", " + argument1 + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.math_random_float = function () {
  Blockly.Python.addImport('random', IMPORT_RANDOM);
  return ["random.random()", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.math_atan2 = function (block) {
  Blockly.Python.addImport('math', IMPORT_MATH);
  const argument0 = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
  const argument1 = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
  return ["math.atan2(" + argument1 + ", " + argument0 + ") / math.pi * 180", Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python.math_min_max = function (block) {
  let code;
  const op = block.getFieldValue("OP") || "MIN";
  const elements = new Array(block.itemCount_);

  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "0";
  }

  switch (op) {
    case "MIN":
      code = "min(" + elements + ")"
      break;
    case "MAX":
      code = "max(" + elements + ")"
  }
  return [code, Blockly.Python.ORDER_NONE];
};


// Not displayed block

Blockly.Python.math_trig_rad = function (block) {
  // Math operators with single operand.
  const operator = block.getFieldValue("OP");
  let code;
  let arg;
  Blockly.Python.addImport('math', IMPORT_MATH);
  if (operator == "SIN" || operator == "COS" || operator == "TAN") {
    arg = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_MULTIPLICATIVE) || "0";
  } else {
    arg = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_NONE) || "0";
  }
  // First, handle cases which generate values that don"t need parentheses
  // wrapping the code.
  switch (operator) {
    case "SIN":
      code = "math.sin(" + arg + ")";
      break;
    case "COS":
      code = "math.cos(" + arg + ")";
      break;
    case "TAN":
      code = "math.tan(" + arg + ")";
      break;
  }
  if (code) {
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case "ASIN":
      code = "math.asin(" + arg + ")";
      break;
    case "ACOS":
      code = "math.acos(" + arg + ")";
      break;
    case "ATAN":
      code = "math.atan(" + arg + ")";
      break;
    default:
      throw Error("Unknown math operator: " + operator);
  }
  return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python.math_atan2_rad = function (block) {
  Blockly.Python.addImport('math', IMPORT_MATH);
  const argument0 = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
  const argument1 = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
  return ["math.atan2(" + argument1 + ", " + argument0 + ")", Blockly.Python.ORDER_MULTIPLICATIVE];
};
