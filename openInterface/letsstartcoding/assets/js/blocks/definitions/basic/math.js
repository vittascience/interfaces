/**
 * @fileoverview Math blocks for Blockly.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // Block for numeric value.
  {
    "type": "math_number",
    "message0": "%1",
    "args0": [
      {
        "type": "field_number",
        "name": "NUM",
        "value": 0
      }
    ],
    "output": null,
    "helpUrl": "%{BKY_MATH_NUMBER_HELPURL}",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_NUMBER_TOOLTIP}",
    "extensions": ["math_number_get_type"]
  },

  // Block for basic arithmetic operator.
  {
    "type": "math_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
      },
      {
        "type": "field_grid_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
      }
    ],
    "output": null,
    "inputsInline": true,
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": ["math_arithmetic_get_type", "math_op_tooltip"]
  },

  // Block for random integer between [X] and [Y].
  {
    "type": "math_random_int",
    "message0": "%{BKY_LSC_MATH_RANDOM_INT_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "FROM",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      },
      {
        "type": "input_value",
        "name": "TO",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      }
    ],
    "output": "Number",
    "inputsInline": true,
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_RANDOM_INT_HELPURL}"
  }
  
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Math = Object.create(null);

/**
 * Mapping of math block OP value to tooltip message for blocks
 * math_arithmetic, math_simple, and math_trig.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Math.TOOLTIPS_BY_OP = {
  // math_arithmetic
  'ADD': '%{BKY_MATH_ARITHMETIC_TOOLTIP_ADD}',
  'MINUS': '%{BKY_MATH_ARITHMETIC_TOOLTIP_MINUS}',
  'MULTIPLY': '%{BKY_MATH_ARITHMETIC_TOOLTIP_MULTIPLY}',
  'DIVIDE': '%{BKY_MATH_ARITHMETIC_TOOLTIP_DIVIDE}',
  'POWER': '%{BKY_MATH_ARITHMETIC_TOOLTIP_POWER}',

  // math_simple
  'ROOT': '%{BKY_MATH_SINGLE_TOOLTIP_ROOT}',
  'ABS': '%{BKY_MATH_SINGLE_TOOLTIP_ABS}',
  'NEG': '%{BKY_MATH_SINGLE_TOOLTIP_NEG}',
  'LN': '%{BKY_MATH_SINGLE_TOOLTIP_LN}',
  'LOG10': '%{BKY_MATH_SINGLE_TOOLTIP_LOG10}',
  'EXP': '%{BKY_MATH_SINGLE_TOOLTIP_EXP}',
  'POW10': '%{BKY_MATH_SINGLE_TOOLTIP_POW10}',

  // math_trig
  'SIN': '%{BKY_MATH_TRIG_TOOLTIP_SIN}',
  'COS': '%{BKY_MATH_TRIG_TOOLTIP_COS}',
  'TAN': '%{BKY_MATH_TRIG_TOOLTIP_TAN}',
  'ASIN': '%{BKY_MATH_TRIG_TOOLTIP_ASIN}',
  'ACOS': '%{BKY_MATH_TRIG_TOOLTIP_ACOS}',
  'ATAN': '%{BKY_MATH_TRIG_TOOLTIP_ATAN}',

};

/**
 * VITTAWARNING - added for getting type of block 'math_number' and 'math_arithmetic'
 */

Blockly.Constants.Math.MATH_NUMBER_GET_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} math_number
   */
  getBlockType: function() {
    let value = this.getFieldValue("NUM");
    return Blockly.Types.identifyNumber(value)
  }
};

Blockly.Constants.Math.MATH_ARITHMETIC_GET_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} math_number
   */
  getBlockType: function() {
    let operation = this.getFieldValue("OP");
    let a = this.getInput("A").connection.targetBlock();
    let b = this.getInput("B").connection.targetBlock();
    if (a && b) {
      var a_type = Blockly.Types.getChildBlockType(a);
      var b_type = Blockly.Types.getChildBlockType(b);
    }
    if (operation == 'ADD' || operation == 'MINUS' || operation == 'MULTIPLY' || operation == 'POWER') {
      if (a_type && b_type) {
        if (a_type == Blockly.Types.NUMBER && b_type == Blockly.Types.NUMBER) {
          return Blockly.Types.NUMBER;
        }
      }
    }
    return Blockly.Types.DECIMAL;
  }
};

/**
 * END VITTAWARNING
 */

// Extensions
Blockly.Extensions.register('math_op_tooltip',
  Blockly.Extensions.buildTooltipForDropdown(
    'OP', Blockly.Constants.Math.TOOLTIPS_BY_OP));

// Mixin functions
Blockly.Extensions.registerMixin("math_number_get_type",
  Blockly.Constants.Math.MATH_NUMBER_GET_TYPE);

Blockly.Extensions.registerMixin("math_arithmetic_get_type",
  Blockly.Constants.Math.MATH_ARITHMETIC_GET_TYPE);