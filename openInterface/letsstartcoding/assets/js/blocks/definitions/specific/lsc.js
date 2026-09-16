/**
 * @fileoverview Blocks for Lets Start Coding.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK START
    {
        "type": "on_start",
        "message0": "%{BKY_LSC_ON_START_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "nextStatement": null,
        "tooltip": "%{BKY_ON_START_TOOLTIP}",
        "style": "loops_blocks",
    },

    // BLOCK FOREVER
    {
        "type": "forever",
        "message0": "%{BKY_LSC_FOREVER_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "tooltip": "%{BKY_FOREVER_TOOLTIP}",
        "style": "loops_blocks",
    },

    // BLOCK START
    {
        "type": "scratch_on_start",
        "message0": "%{BKY_LSC_ON_START_TITLE}",
        "nextStatement": null,
        "style": "control_blocks",
        "tooltip": "%{BKY_ON_START_TOOLTIP}"
    },

    // BLOCK FOREVER
    {
        "type": "scratch_forever",
        "message0": "%{BKY_LSC_FOREVER_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "style": "control_blocks",
        "tooltip": "%{BKY_FOREVER_TOOLTIP}"
    },

    // Block for adding comment in code
    {
        "type": "text_comment",
        "message0": "%{BKY_TEXT_COMMENT_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "TEXT"
            }
        ],
        "style": "comment_block",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_TEXT_COMMENT_TOOLTIP}"
    },

    /* Begin Arduino io blocks */

    // ARDUINO PAUSE JSON
    {
        "type": "io_wait",
        "message0": "%{BKY_IO_WAIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": Blockly.Constants.Types.DECIMAL.compatibleTypes_
        }],
        "style": "io_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WAIT_TOOLTIP}",
    },

    /* Begin pins blocks */

    {
        "type": "io_digitalPin",
        "message0": "%1",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "io_blocks",
        "output": "Number"
    },

    {
        "type": "io_analogPin",
        "message0": "%1",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "io_blocks",
        "output": "Number"
    },

    {
        "type": "io_pinMode",
        "message0": "%{BKY_IO_PINMODE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "MODE",
            "options": [
                ["OUTPUT", "OUTPUT"],
                ["INPUT", "INPUT"],
                ["INPUT_PULLUP", "INPUT_PULLUP"]
            ]
        }],
        "style": "io_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_PINMODE_TOOLTIP}"
    },

    // BLOCK HIGH/LOW BOOLEAN
    {
        "type": "io_digital_signal",
        "message0": "%{BKY_IO_DIGITAL_SIGNAL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_DIGITAL_SIGNAL_HIGH}", "HIGH"],
                ["%{BKY_IO_DIGITAL_SIGNAL_LOW}", "LOW"]
            ]
        }],
        "style": "io_blocks",
        "output": "Boolean",
        "tooltip": "%{BKY_IO_DIGITAL_SIGNAL_TOOLTIP}"
    },

    // READ DIGITAL PIN JSON 
    {
        "type": "io_readDigitalPin",
        "message0": "%{BKY_IO_READDIGITALPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "io_blocks",
        "output": "Boolean",
        "tooltip": "%{BKY_IO_READDIGITALPIN_TOOLTIP}"
    },

    // BLOCK WRITE DIGITAL PIN
    {
        "type": "io_writeDigitalPin",
        "message0": "%{BKY_IO_WRITEDIGITALPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "style": "io_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_WRITEDIGITALPIN_TOOLTIP}"
    },

    // BLOCK READ ANALOG 
    {
        "type": "io_readAnalogPin",
        "message0": "%{BKY_IO_READANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "io_blocks",
        "tooltip": "%{BKY_IO_READANALOGPIN_TOOLTIP}"
    },

    // BLOCK WRITE ANALOG 
    {
        "type": "io_writeAnalogPin",
        "message0": "%{BKY_IO_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.DECIMAL.compatibleTypes_
        }],
        "style": "io_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_WRITEANALOGPIN_TOOLTIP}"
    },

    // GROVE BUZZER OR SPEAKER _ PLAY FREQUENCY JSON
    {
        "type": "actuators_tone",
        "message0": "%{BKY_ACTUATORS_TONE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        },
        {
            "type": "input_value",
            "name": "FREQUENCY",
            "check": Blockly.Constants.Types.DECIMAL.compatibleTypes_
        }],
        "style": "actuators_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_TONE_TOOLTIP}"
    },

    // GROVE BUZZER OR SPEAKER _ STOP MUSIC JSON
    {
        "type": "actuators_noTone",
        "message0": "%{BKY_ACTUATORS_NOTONE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "actuators_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_NOTONE_TOOLTIP}"
    },

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
                "check": Blockly.Constants.Types.DECIMAL.compatibleTypes_
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
                "check": Blockly.Constants.Types.DECIMAL.compatibleTypes_
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
                "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
            },
            {
                "type": "input_value",
                "name": "TO",
                "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
            }
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
        "helpUrl": "%{BKY_MATH_RANDOM_INT_HELPURL}"
    },

    // Block for 'do while/until' loop.
    {
        "type": "controls_whileUntil",
        "message0": "while(%1);",
        "args0": [{
            "type": "input_value",
            "name": "BOOL",
            "check": "Boolean"
        }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "loops_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}"
    },

    // Block for 'for' loop.
    {
        "type": "controls_for",
        "message0": "%{BKY_LSC_CONTROLS_FOR_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": null
        },
        {
            "type": "input_value",
            "name": "FROM",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_,
            "align": "RIGHT"
        },
        {
            "type": "input_value",
            "name": "TO",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_,
            "align": "RIGHT"
        },
        {
            "type": "input_value",
            "name": "BY",
            "check": "Number",
            "align": "RIGHT"
        }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "loops_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": "%{BKY_CONTROLS_FOR_HELPURL}",
        "extensions": [
            "contextMenu_newGetVariableBlock",
            "controls_for_tooltip",
            "field_variable_type_getter"
        ]
    },

    // Block for if/elseif/else condition.
    {
        "type": "controls_if",
        "message0": "%{BKY_LSC_CONTROLS_IF_MSG_IF}",
        "args0": [
            {
                "type": "input_value",
                "name": "IF0",
                "check": "Boolean"
            }
        ],
        "message1": "%1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO0"
            }
        ],
        "style": "logic_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
        "extensions": [
            "block_buttons_plus_minus",
            "controls_if_init",
            "controls_if_tooltip"
        ],
        "mutator": "controls_if_mutator",
    },

    // Block for comparison operator.
    {
        "type": "logic_compare",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "A"
            },
            {
                "type": "field_grid_dropdown",
                "name": "OP",
                "options": [
                    ["=", "EQ"],
                    ["\u2260", "NEQ"],
                    ["\u200F<", "LT"],
                    ["\u200F\u2264", "LTE"],
                    ["\u200F>", "GT"],
                    ["\u200F\u2265", "GTE"]
                ]
            },
            {
                "type": "input_value",
                "name": "B"
            }
        ],
        "output": "Boolean",
        "style": "logic_blocks",
        "inputsInline": true,
        "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
        "extensions": [
            "logic_compare_on_change",
            "logic_op_tooltip"
        ]
    },

    // Block for logical operations: 'and', 'or'.
    {
        "type": "logic_operation",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "A",
                "check": "Boolean"
            },
            {
                "type": "field_grid_dropdown",
                "name": "OP",
                "options": [
                    ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
                    ["%{BKY_LOGIC_OPERATION_OR}", "OR"]
                ]
            },
            {
                "type": "input_value",
                "name": "B",
                "check": "Boolean"
            }
        ],
        "output": "Boolean",
        "style": "logic_blocks",
        "inputsInline": true,
        "helpUrl": "%{BKY_LOGIC_OPERATION_HELPURL}",
        "extensions": [
            "logic_op_tooltip"
        ]
    },

    // Block for boolean data type: true and false.
    {
        "type": "logic_boolean",
        "message0": "%1",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "BOOL",
                "options": [
                    ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
                    ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]
                ]
            }
        ],
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
        "helpUrl": "%{BKY_LOGIC_BOOLEAN_HELPURL}"
    },

    // Block for negation.
    {
        "type": "logic_negate",
        "message0": "%{BKY_LOGIC_NEGATE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "BOOL",
                "check": "Boolean"
            }
        ],
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "%{BKY_LOGIC_NEGATE_TOOLTIP}",
        "helpUrl": "%{BKY_LOGIC_NEGATE_HELPURL}"
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

Blockly.Constants.Logic = Object.create(null);

/**
 * Performs final setup of 'controls_if' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Logic.CONTROLS_IF_INIT_EXTENSION = function () {
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    this.updateShape_();
    Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION.call(this);
};

/**
 * Mixin for mutator functions in the 'controls_if_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN = {
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = Blockly.utils.xml.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        if (!xmlElement) return;
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        this.rebuildShape_();
    },
    // Store pointers to any connected child blocks.
    storeConnections_: function (arg) {
        if (!arg) arg = 0;
        this.valueConnections_ = [null];
        this.statementConnections_ = [null];
        this.elseStatementConnection_ = null;
        for (var i = 1; i <= this.elseifCount_; i++) {
            if (arg != i) {
                this.valueConnections_.push(this.getInput('IF' + i)
                    .connection.targetConnection);
                this.statementConnections_.push(this.getInput('DO' + i)
                    .connection.targetConnection);
            }
        }
        if (this.getInput('ELSE')) {
            this.elseStatementConnection_ = this.getInput('ELSE')
                .connection.targetConnection;
        }
    },
    // Restore pointers to any connected child blocks.
    restoreConnections_: function () {
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'IF' + i);
            Blockly.Mutator.reconnect(this.statementConnections_[i], this, 'DO' + i);
        }
        if (this.getInput('ELSE')) {
            Blockly.Mutator.reconnect(this.elseStatementConnection_, this, 'ELSE');
        }
    },
    addElse_: function () {
        this.storeConnections_();
        var update = function () {
            this.elseCount_++;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    removeElse_: function () {
        this.storeConnections_();
        var update = function () {
            this.elseCount_--;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    addElseIf_: function () {
        this.storeConnections_();
        var update = function () {
            this.elseifCount_++;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    removeElseIf_: function (arg) {
        this.storeConnections_(arg);
        var update = function () {
            this.elseifCount_--;
        };
        this.update_(update);
        this.restoreConnections_();
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function () {
        var that = this;
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
            this.removeInput('ELSETITLE');
            this.removeInput('ELSEBUTTONS');
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            this.removeInput('IFTITLE' + i);
            this.removeInput('IFBUTTONS' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            var removeElseIf = function (arg) {
                return function () {
                    that.removeElseIf_(arg);
                };
            }(i);
            this.appendValueInput('IF' + i)
                .setCheck('Boolean')
                .appendField("} else if (");
            this.appendDummyInput('IFTITLE' + i)
            this.appendDummyInput('IFBUTTONS' + i)
                .appendField(") {")
                .appendField(
                    new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
                        this.buttonSize, "*", removeElseIf, false))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendStatementInput('DO' + i)
        }
        if (this.elseCount_) {
            this.appendDummyInput('ELSETITLE')
                .appendField("} else {");
            this.appendDummyInput('ELSEBUTTONS')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(
                    new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
                        this.buttonSize, "*", that.removeElse_.bind(that), false));
            this.appendStatementInput('ELSE')
        }
        if (this.getInput('ADDBUTTON')) this.removeInput('ADDBUTTON');
        var that = this;
        var addElseIf = function () {
            return function () {
                if (that.elseCount_ == 0) {
                    that.addElse_();
                } else {
                    if (!that.elseifCount_) that.elseifCount_ = 0;
                    that.addElseIf_();
                }
            };
        }();
        this.appendDummyInput('ADDBUTTON')
            .appendField(
                new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize,
                    this.buttonSize, "*", addElseIf, false));
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function () {
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;

        if (this.getInput('ELSE')) {
            elseStatementConnection = this.getInput('ELSE')
                .connection.targetConnection;
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            var inputIf = this.getInput('IF' + i);
            var inputDo = this.getInput('DO' + i);
            valueConnections.push(inputIf.connection.targetConnection);
            statementConnections.push(inputDo.connection.targetConnection);
            i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, statementConnections,
            elseStatementConnection);
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function (valueConnections, statementConnections,
        elseStatementConnection) {
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    }
};

/**
 * "controls_if" extension function. Adds mutator, shape updating methods,
 * and dynamic tooltip to "controls_if" blocks.
 * @this {Blockly.Block}
 * @package
 */
Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION = function () {
    this.setTooltip(function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return Blockly.Msg['CONTROLS_IF_TOOLTIP_1'];
        } else if (!this.elseifCount_ && this.elseCount_) {
            return Blockly.Msg['CONTROLS_IF_TOOLTIP_2'];
        } else if (this.elseifCount_ && !this.elseCount_) {
            return Blockly.Msg['CONTROLS_IF_TOOLTIP_3'];
        } else if (this.elseifCount_ && this.elseCount_) {
            return Blockly.Msg['CONTROLS_IF_TOOLTIP_4'];
        }
        return '';
    }.bind(this));
};

/**
 * Tooltip text, keyed by block OP value. Used by 'logic_compare' and
 * logic_operation blocks.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Logic.TOOLTIPS_BY_OP = {
    // logic_compare
    'EQ': '%{BKY_LOGIC_COMPARE_TOOLTIP_EQ}',
    'NEQ': '%{BKY_LOGIC_COMPARE_TOOLTIP_NEQ}',
    'LT': '%{BKY_LOGIC_COMPARE_TOOLTIP_LT}',
    'LTE': '%{BKY_LOGIC_COMPARE_TOOLTIP_LTE}',
    'GT': '%{BKY_LOGIC_COMPARE_TOOLTIP_GT}',
    'GTE': '%{BKY_LOGIC_COMPARE_TOOLTIP_GTE}',
    // logic_operation
    'AND': '%{BKY_LOGIC_OPERATION_TOOLTIP_AND}',
    'OR': '%{BKY_LOGIC_OPERATION_TOOLTIP_OR}'
};

/**
 * Adds dynamic type validation for the left and right sides of 
 * a 'logic_compare' block.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Logic.LOGIC_COMPARE_ON_CHANGE_MIXIN = {
    /**
     * Called whenever anything on the workspace changes.
     * Prevent mismatched types from being compared.
     * @this {Blockly.Block} logic_compare
     */
    onchange: function () {
        var blockA = this.getInputTargetBlock('A');
        var blockB = this.getInputTargetBlock('B');
        // Check if types are different and display warning
        this.setWarningType(blockA, blockB);
    },
    /**
     * Called whenever anything on the workspace changes.
     * Set warning text in case types of input A and B are different.
     * @param {Blockly.Block} inputA
     * @param {Blockly.Block} inputB
     * @this {Blockly.Block} logic_compare
     */
    setWarningType: function (inputA, inputB) {
        return Blockly.Constants.Logic.SET_WARNING_WHEN_INPUTS_COMPARING(
            this, inputA, inputB, Blockly.Msg["LOGIC_COMPARE_WARNING"])
    }
};

/**
 * Compare type of input A and input B. Set warning text in case they are different.
 * @param {Blockly.Block} block
 * @param {Blockly.Block} inputA
 * @param {Blockly.Block} inputB
 * @param {Blockly.Block} warningText
 */
Blockly.Constants.Logic.SET_WARNING_WHEN_INPUTS_COMPARING = function (block, inputA, inputB, warningText) {
    if (inputA && inputB) {
        var warningLabel = 'typeCompare',
            typeA = Blockly.Types.getChildBlockType(inputA),
            typeB = Blockly.Types.getChildBlockType(inputB);
        if (Blockly.Arduino) {
            var variables = Blockly.Arduino.StaticTyping.collectVarsWithTypes(block.workspace);
            if (inputA.type == 'variables_get' && typeA == Blockly.Types.NULL) {
                var varId = inputA.getField('VAR').getVariable().getId();
                typeA = variables[varId];
            }
            if (inputB.type == 'variables_get' && typeB == Blockly.Types.NULL) {
                var varId = inputB.getField('VAR').getVariable().getId();
                typeB = variables[varId];
            }
            // Case type of input A and input B are different, display warning
            if (typeA != typeB) {
                if ((typeA.typeId == 'Decimal' && typeB.typeId == 'Number') || (typeA.typeId == 'Number' && typeB.typeId == 'Decimal')) {
                    block.setWarningText(null, warningLabel);
                } else {
                    warningText = warningText.replace('%1', typeA.typeId);
                    warningText = warningText.replace('%2', typeB.typeId);
                    block.setWarningText(warningText, warningLabel);
                }
                // Case types are same, remove warning
            } else if (typeA == typeB) {
                block.setWarningText(null, warningLabel);
            }
        }
        // Case child blocks are missing
    } else {
        block.setWarningText(null, warningLabel);
    }
};

// Initialization extensions
Blockly.Extensions.register('controls_if_init',
    Blockly.Constants.Logic.CONTROLS_IF_INIT_EXTENSION);

Blockly.Extensions.register('controls_if_tooltip',
    Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION);

Blockly.Extensions.register('logic_op_tooltip',
    Blockly.Extensions.buildTooltipForDropdown(
        'OP', Blockly.Constants.Logic.TOOLTIPS_BY_OP));

// Mixin functions
Blockly.Extensions.registerMixin('logic_compare_on_change',
    Blockly.Constants.Logic.LOGIC_COMPARE_ON_CHANGE_MIXIN);

// Mutator
Blockly.Extensions.registerMutator("controls_if_mutator",
    Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN);

Blockly.Constants.Loops = Object.create(null);

/**
 * Mixin to add a context menu item to create a 'variables_get' block.
 * Used by blocks 'controls_for' and 'controls_forEach'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN = {
    /**
     * Add context menu option to create getter block for the loop's variable.
     * (customContextMenu support limited to web BlockSvg.)
     * @param {!Array} options List of menu options to add to.
     * @this {Blockly.Block}
     */
    customContextMenu: function (options) {
        if (this.isInFlyout) {
            return;
        }
        var variable = this.getField('VAR').getVariable();
        var varName = variable.name;
        if (!this.isCollapsed() && varName != null) {
            var option = {
                enabled: true
            };
            option.text =
                Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace('%1', varName);
            var xmlField = Blockly.Variables.generateVariableFieldDom(variable);
            var xmlBlock = Blockly.utils.xml.createElement('block');
            xmlBlock.setAttribute('type', 'variables_get');
            xmlBlock.appendChild(xmlField);
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
        }
    }
};

// Tooltip extensions
Blockly.Extensions.register('controls_for_tooltip',
    Blockly.Extensions.buildTooltipWithFieldText(
        '%{BKY_CONTROLS_FOR_TOOLTIP}', 'VAR'));

// Mixin functions
Blockly.Extensions.registerMixin('contextMenu_newGetVariableBlock',
    Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN);