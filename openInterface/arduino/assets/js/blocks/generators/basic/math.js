/**
 * @fileoverview Math generators for Arduino.
 */

Blockly.Arduino.math_number = function (block) {
    let code = parseFloat(block.getFieldValue('NUM'));
    if (code == Infinity) {
        code = 'INFINITY';
    } else if (code == -Infinity) {
        code = '-INFINITY';
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.math_arithmetic = function (block) {
    const OPERATORS = {
        'ADD': [' + ', Blockly.Arduino.ORDER_ADDITIVE],
        'MINUS': [' - ', Blockly.Arduino.ORDER_ADDITIVE],
        'MULTIPLY': [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
        'POWER': [null, Blockly.Arduino.ORDER_NONE]  // Handle power separately.
    };
    const tuple = OPERATORS[block.getFieldValue('OP')],
        operator = tuple[0],
        order = tuple[1],
        inputA = Blockly.Arduino.valueToCode(block, 'A', order) || '0',
        inputB = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
    let code = null;
    // Power in C++ requires a special case since it has no operator.
    if (!operator) {
        code = 'Math.pow(' + inputA + ', ' + inputB + ')';
        return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    }
    return [inputA + operator + inputB, order];
};

Blockly.Arduino.math_single = function (block) {
    const operator = block.getFieldValue('OP');
    let code,
        arg;
    if (operator == 'NEG') {
        // Negation is a special case given its different operator precedents.
        arg = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_UNARY_PREFIX) || '0';
        if (arg[0] == '-') {
            // --3 is not legal in C++ in this context.
            arg = ' ' + arg;
        }
        code = '-' + arg;
        return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
    }
    if (operator == 'ABS' || operator.substring(0, 5) == 'ROUND') {
        arg = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
    } else if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
        arg = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    } else {
        arg = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_NONE) || '0';
    }
    // First, handle cases which generate values that don't need parentheses.
    switch (operator) {
        case 'ABS':
            code = 'abs(' + arg + ')';
            break;
        case 'ROOT':
            code = 'sqrt(' + arg + ')';
            break;
        case 'LN':
            code = 'log(' + arg + ')';
            break;
        case 'EXP':
            code = 'exp(' + arg + ')';
            break;
        case 'POW10':
            code = 'pow(10,' + arg + ')';
            break;
        case 'ROUND':
            code = 'round(' + arg + ')';
            break;
        case 'ROUNDUP':
            code = 'ceil(' + arg + ')';
            break;
        case 'ROUNDDOWN':
            code = 'floor(' + arg + ')';
            break;
        case 'SIN':
            code = 'sin(' + arg + './ 180 * M_PI)';
            break;
        case 'COS':
            code = 'cos(' + arg + './ 180 * M_PI)';
            break;
        case 'TAN':
            code = 'tan(' + arg + './ 180 * M_PI)';
            break;
    }
    if (code) {
        return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    }
    // Second, handle cases which generate values that may need parentheses.
    switch (operator) {
        case 'LOG10':
            code = 'log(' + arg + ') / log(10)';
            break;
        case 'ASIN':
            code = 'asin(' + arg + ') / M_PI * 180';
            break;
        case 'ACOS':
            code = 'acos(' + arg + ') / M_PI * 180';
            break;
        case 'ATAN':
            code = 'atan(' + arg + ') / M_PI * 180';
            break;
        default:
            throw 'Unknown math operator: ' + operator;
    }
    return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

Blockly.Arduino.math_constant = function (block) {
    const CONSTANTS = {
        'PI': ['M_PI', Blockly.Arduino.ORDER_UNARY_POSTFIX],
        'E': ['M_E', Blockly.Arduino.ORDER_UNARY_POSTFIX],
        'GOLDEN_RATIO': ['(1 + sqrt(5)) / 2', Blockly.Arduino.ORDER_MULTIPLICATIVE],
        'SQRT2': ['M_SQRT2', Blockly.Arduino.ORDER_UNARY_POSTFIX],
        'SQRT1_2': ['M_SQRT1_2', Blockly.Arduino.ORDER_UNARY_POSTFIX],
        'INFINITY': ['INFINITY', Blockly.Arduino.ORDER_ATOMIC]
    };
    return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Blockly.Arduino.math_number_property = function (block) {
    const number_to_check = Blockly.Arduino.valueToCode(block, 'NUMBER_TO_CHECK', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    const dropdown_property = block.getFieldValue('PROPERTY');
    let code;
    if (dropdown_property == 'PRIME') {
        Blockly.Arduino.addFunction('mathIsPrime', FUNCTIONS_ARDUINO.DEF_MATH_IS_PRIME);
        Blockly.Arduino.addInclude('math', INCLUDE_MATH);
        return ['mathIsPrime(' + number_to_check + ')', Blockly.Arduino.ORDER_UNARY_POSTFIX];
    }
    switch (dropdown_property) {
        case 'EVEN':
            code = number_to_check + ' % 2 == 0';
            break;
        case 'ODD':
            code = number_to_check + ' % 2 == 1';
            break;
        case 'WHOLE':
            Blockly.Arduino.addInclude('math', INCLUDE_MATH);
            code = '(floor(' + number_to_check + ') == ' + number_to_check + ')';
            break;
        case 'POSITIVE':
            code = number_to_check + ' > 0';
            break;
        case 'NEGATIVE':
            code = number_to_check + ' < 0';
            break;
        case 'DIVISIBLE_BY':
            const divisor = Blockly.Arduino.valueToCode(block, 'DIVISOR', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
            code = number_to_check + ' % ' + divisor + ' == 0';
            break;
    }
    return [code, Blockly.Arduino.ORDER_EQUALITY];
};

Blockly.Arduino.math_map = function (block) {
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0',
        min1 = Blockly.Arduino.valueToCode(block, "MIN1", Blockly.Arduino.ORDER_ATOMIC) || '0',
        max1 = Blockly.Arduino.valueToCode(block, "MAX1", Blockly.Arduino.ORDER_ATOMIC) || '0',
        min2 = Blockly.Arduino.valueToCode(block, "MIN2", Blockly.Arduino.ORDER_ATOMIC) || '0',
        max2 = Blockly.Arduino.valueToCode(block, "MAX2", Blockly.Arduino.ORDER_ATOMIC) || '0';
    return ["map(" + value + ", " + min1 + ", " + max1 + ", " + min2 + ", " + max2 + ")", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.math_round = Blockly.Arduino.math_single;

Blockly.Arduino.math_trig = Blockly.Arduino.math_single;

Blockly.Arduino.math_modulo = function (block) {
    const dividend = Blockly.Arduino.valueToCode(block, 'DIVIDEND', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    const divisor = Blockly.Arduino.valueToCode(block, 'DIVISOR', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    return [dividend + ' % ' + divisor, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

Blockly.Arduino.math_constrain = function (block) {
    const value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || '0',
        min = Blockly.Arduino.valueToCode(block, 'LOW', Blockly.Arduino.ORDER_NONE) || '0',
        max = Blockly.Arduino.valueToCode(block, 'HIGH', Blockly.Arduino.ORDER_NONE) || '0';
    let code = '(' + value + ' < ' + min + ' ? ' + min + ' : ( ' + value +
        ' > ' + max + ' ? ' + max + ' : ' + value + '))';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.math_random_int = function(block) {
    const min = Blockly.Arduino.valueToCode(block, 'FROM', Blockly.Arduino.ORDER_NONE) || '0';
    const max = Blockly.Arduino.valueToCode(block, 'TO', Blockly.Arduino.ORDER_NONE) || '0';
    return ['random(' + min + ', ' + max + ')', Blockly.Arduino.ORDER_UNARY_POSTFIX];
  };
  
  Blockly.Arduino.math_random_float = function () {
    return ["(rand()/(float)RAND_MAX)", Blockly.Arduino.ORDER_UNARY_POSTFIX]
  };

Blockly.Arduino.math_atan2 = function (block) {
    const x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_NONE) || '0',
        y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_NONE) || '0';
    return ["atan2(" + x + ", " + y + ")", Blockly.Arduino.ORDER_MULTIPLICATIVE];
};