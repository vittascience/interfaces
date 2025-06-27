/**
 * @fileoverview Logic blocks for Blockly.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // Block for if/elseif/else condition.
  {
    "type": "controls_if",
    "message0": "%{BKY_CONTROLS_IF_MSG_IF}",
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
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
    "extensions": [
      "block_init_color",
      "block_buttons_plus_minus",
      "controls_if_init",
      "controls_if_tooltip"
    ],
    "mutator": "controls_if_mutator"
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
    "inputsInline": true,
    "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
    "extensions": [
      "block_init_color",
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
    "inputsInline": true,
    "helpUrl": "%{BKY_LOGIC_OPERATION_HELPURL}",
    "extensions": [
      "block_init_color",
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
    "tooltip": "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_BOOLEAN_HELPURL}",
    "extensions": [
      "block_init_color"
    ]
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
    "tooltip": "%{BKY_LOGIC_NEGATE_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_NEGATE_HELPURL}",
    "extensions": [
      "block_init_color"
    ]
  },

  // Block for null data type.
  {
    "type": "logic_null",
    "message0": "%{BKY_LOGIC_NULL_TITLE}",
    "output": "Null",
    "tooltip": "%{BKY_LOGIC_NULL_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_NULL_HELPURL}",
    "extensions": [
      "block_init_color"
    ]
  },

  // Block for ternary operator.
  {
    "type": "logic_ternary",
    "message0": "%{BKY_LOGIC_TERNARY_CONDITION} %1",
    "args0": [
      {
        "type": "input_value",
        "name": "IF",
        "check": "Boolean"
      }
    ],
    "message1": "%{BKY_LOGIC_TERNARY_IF_TRUE} %1",
    "args1": [
      {
        "type": "input_value",
        "name": "THEN"
      }
    ],
    "message2": "%{BKY_LOGIC_TERNARY_IF_FALSE} %1",
    "args2": [
      {
        "type": "input_value",
        "name": "ELSE"
      }
    ],
    "output": null,
    "tooltip": "%{BKY_LOGIC_TERNARY_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_TERNARY_HELPURL}",
    "extensions": [
      "block_init_color",
      "logic_ternary_on_change",
      "logic_ternary_get_type"
    ]
  }

]); // END JSON EXTRACT (Do not delete this comment.)

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
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
      this.appendDummyInput('IFTITLE' + i)
      this.appendDummyInput('IFBUTTONS' + i)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN)
        .appendField(
          new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
            this.buttonSize, "*", removeElseIf, false))
        .setAlign(Blockly.ALIGN_RIGHT);
      this.appendStatementInput('DO' + i)
    }
    if (this.elseCount_) {
      this.appendDummyInput('ELSETITLE')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
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
 * Adds type coordination between output then and output else.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Logic.LOGIC_TERNARY_ON_CHANGE_MIXIN = {
  /**
   * Called whenever anything on the workspace changes.
   * Prevent mismatched types.
   * @this {Blockly.Block} logic_ternary
   */
  onchange: function () {
    var blockA = this.getInputTargetBlock('THEN');
    var blockB = this.getInputTargetBlock('ELSE');
    // Check if return types are different and display warning
    this.setWarningType(blockA, blockB);
  },
  /**
   * Called whenever anything on the workspace changes.
   * Set warning text in case types of input THEN and ELSE are different.
   * @param {Blockly.Block} inputThen
   * @param {Blockly.Block} inputElse
   * @this {Blockly.Block} logic_ternary
   */
  setWarningType: function (inputThen, inputElse) {
    return Blockly.Constants.Logic.SET_WARNING_WHEN_INPUTS_COMPARING(
      this, inputThen, inputElse, Blockly.Msg["LOGIC_TERNARY_WARNING"]);
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

/**
 * VITAWARNING _ added for getting type of 'logic_ternary' return
 */

Blockly.Constants.Logic.LOGIC_TERNARY_GET_BLOCK_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} logic_ternary
   */
  getBlockType: function () {
    var child_iftrue = this.inputList[1].connection.targetBlock();
    var child_iffalse = this.inputList[2].connection.targetBlock();
    if (child_iftrue && child_iffalse) {
      return Blockly.Types.getChildBlockType(child_iftrue);
    }
    return Blockly.Types.CHILD_BLOCK_MISSING;
  }
};

/**
 * END VITTAWARNING
 */

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

Blockly.Extensions.registerMixin('logic_ternary_on_change',
  Blockly.Constants.Logic.LOGIC_TERNARY_ON_CHANGE_MIXIN);

Blockly.Extensions.registerMixin("logic_ternary_get_type",
  Blockly.Constants.Logic.LOGIC_TERNARY_GET_BLOCK_TYPE);

// Mutator
Blockly.Extensions.registerMutator("controls_if_mutator",
  Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN);
