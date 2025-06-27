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
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes
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
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes
      }
    ],
    "output": null,
    "inputsInline": true,
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": [
      "math_arithmetic_get_type",
      "math_op_tooltip"
    ]
  },

  // Block for advanced math operators with single operand.
  {
    "type": "math_single",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_SINGLE_OP_ROOT}", 'ROOT'],
          ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", 'ABS'],
          ['-', 'NEG'],
          ['ln', 'LN'],
          ['log10', 'LOG10'],
          ['e^', 'EXP'],
          ['10^', 'POW10']
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes
      }
    ],
    "output": "Decimal",
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_SINGLE_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },

  // Block for trigonometry operators.
  {
    "type": "math_trig",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_TRIG_SIN}", "SIN"],
          ["%{BKY_MATH_TRIG_COS}", "COS"],
          ["%{BKY_MATH_TRIG_TAN}", "TAN"],
          ["%{BKY_MATH_TRIG_ASIN}", "ASIN"],
          ["%{BKY_MATH_TRIG_ACOS}", "ACOS"],
          ["%{BKY_MATH_TRIG_ATAN}", "ATAN"]
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      }
    ],
    "output": "Decimal",
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_TRIG_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },

  // Block for constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  {
    "type": "math_constant",
    "message0": "%1",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "CONSTANT",
        "options": [
          ["\u03c0", "PI"],
          ["e", "E"],
          ["\u03c6", "GOLDEN_RATIO"],
          ["sqrt(2)", "SQRT2"],
          ["sqrt(\u00bd)", "SQRT1_2"],
          ["\u221e", "INFINITY"]
        ]
      }
    ],
    "output": "Decimal",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_CONSTANT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_CONSTANT_HELPURL}"
  },

  // Block for checking if a number is even, odd, prime, whole, positive,
  // negative or if it is divisible by certain number.
  {
    "type": "math_number_property",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "NUMBER_TO_CHECK",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      },
      {
        "type": "field_grid_dropdown",
        "name": "PROPERTY",
        "options": [
          ["%{BKY_MATH_IS_EVEN}", "EVEN"],
          ["%{BKY_MATH_IS_ODD}", "ODD"],
          ["%{BKY_MATH_IS_PRIME}", "PRIME"],
          ["%{BKY_MATH_IS_WHOLE}", "WHOLE"],
          ["%{BKY_MATH_IS_POSITIVE}", "POSITIVE"],
          ["%{BKY_MATH_IS_NEGATIVE}", "NEGATIVE"],
          ["%{BKY_MATH_IS_DIVISIBLE_BY}", "DIVISIBLE_BY"]
        ]
      }
    ],
    "output": "Boolean",
    "inputsInline": true,
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_IS_TOOLTIP}",
    "mutator": "math_is_divisibleby_mutator"
  },

  // Block for mapping number.
  {
    "type": "math_map",
    "message0": "%{BKY_MATH_MAP_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes
      },
      {
        "type": "input_value",
        "name": "MIN1",
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes
      },
      {
        "type": "input_value",
        "name": "MAX1",
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes
      },
      {
        "type": "input_value",
        "name": "MIN2",
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes
      },
      {
        "type": "input_value",
        "name": "MAX2",
        "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes
      }
    ],
    "output": "Decimal",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_MAP_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // Block for rounding functions.
  {
    "type": "math_round",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ROUND_OPERATOR_ROUND}", "ROUND"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}", "ROUNDUP"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}", "ROUNDDOWN"]
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      }
    ],
    "output": "Number",
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_ROUND_HELPURL}",
    "tooltip": "%{BKY_MATH_ROUND_TOOLTIP}"
  },

  // Block for remainder of a division.
  {
    "type": "math_modulo",
    "message0": "%{BKY_MATH_MODULO_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DIVIDEND",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      },
      {
        "type": "input_value",
        "name": "DIVISOR",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      }
    ],
    "output": "Number",
    "inputsInline": true,
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_MODULO_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_MODULO_HELPURL}"
  },

  // Block for constraining a number between two limits.
  {
    "type": "math_constrain",
    "message0": "%{BKY_MATH_CONSTRAIN_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      },
      {
        "type": "input_value",
        "name": "LOW",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      },
      {
        "type": "input_value",
        "name": "HIGH",
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
      }
    ],
    "output": "Number",
    "inputsInline": true,
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_CONSTRAIN_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_CONSTRAIN_HELPURL}"
  },

  // Block for random integer between [X] and [Y].
  {
    "type": "math_random_int",
    "message0": "%{BKY_MATH_RANDOM_INT_TITLE}",
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
  },

  // Block for random float between [X] and [Y].
  {
    "type": "math_random_float",
    "message0": "%{BKY_MATH_RANDOM_FLOAT_TITLE_RANDOM}",
    "output": "Decimal",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_RANDOM_FLOAT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_RANDOM_FLOAT_HELPURL}"
  },

  // Block for calculating atan2 of [X] and [Y].
  {
    "type": "math_atan2",
    "message0": "%{BKY_MATH_ATAN2_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "X",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "Y",
        "check": "Number"
      }
    ],
    "output": "Number",
    "inputsInline": true,
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_ATAN2_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_ATAN2_HELPURL}"
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
 * Mixin for mutator functions in the 'math_is_divisibleby_mutator'
 * extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Math.IS_DIVISIBLEBY_MUTATOR_MIXIN = {
  /**
   * Create XML to represent whether the 'divisorInput' should be present.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    var divisorInput = (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY');
    container.setAttribute('divisor_input', divisorInput);
    return container;
  },
  /**
   * Parse XML to restore the 'divisorInput'.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
    this.updateShape_(divisorInput);
  },
  /**
   * Modify this block to have (or not have) an input for 'is divisible by'.
   * @param {boolean} divisorInput True if this block has a divisor input.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function (divisorInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('DIVISOR');
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput('DIVISOR')
          .setCheck('Number');
      }
    } else if (inputExists) {
      this.removeInput('DIVISOR');
    }
  }
};

/**
 * 'math_is_divisibleby_mutator' extension to the 'math_property' block that
 * can update the block shape (add/remove divisor input) based on whether
 * property is "divisible by".
 * @this {Blockly.Block}
 * @package
 */
Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION = function () {
  this.getField('PROPERTY').setValidator(function (option) {
    var divisorInput = (option == 'DIVISIBLE_BY');
    this.getSourceBlock().updateShape_(divisorInput);
  });
};

/**
 * VITTAWARNING - added for getting type of block 'math_number' and 'math_arithmetic'
 */

Blockly.Constants.Math.MATH_NUMBER_GET_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} math_number
   */
  getBlockType: function () {
    let value = this.getFieldValue("NUM");
    return Blockly.Types.identifyNumber(value)
  }
};

Blockly.Constants.Math.MATH_ARITHMETIC_GET_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} math_number
   */
  getBlockType: function () {
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

// Mutators
Blockly.Extensions.registerMutator('math_is_divisibleby_mutator',
  Blockly.Constants.Math.IS_DIVISIBLEBY_MUTATOR_MIXIN,
  Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION);
