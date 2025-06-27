/**
 * @fileoverview Loops blocks for Blockly.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // Block for repeat n times (external number).
  {
    "type": "controls_repeat",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check": "Number"
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "extensions": [
      "block_init_color"
    ],
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  },

  // Block for 'do while/until' loop.
  {
    "type": "controls_whileUntil",
    "message0": "%1 %2",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MODE",
      "options": [
        ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}", "WHILE"],
        ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}", "UNTIL"]
      ]
    },
    {
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
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}",
    "extensions": [
      "block_init_color",
      "controls_whileUntil_tooltip"
    ]
  },

  // Block for 'for' loop.
  {
    "type": "controls_for",
    "message0": "%{BKY_CONTROLS_FOR_TITLE}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": null
    },
    {
      "type": "input_value",
      "name": "FROM",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "TO",
      "check": "Number",
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
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "%{BKY_CONTROLS_FOR_HELPURL}",
    "extensions": [
      "block_init_color",
      "contextMenu_newGetVariableBlock",
      "controls_for_tooltip"
    ]
  },

  // Block for 'for each' loop.
  {
    "type": "controls_forEach",
    "message0": "%{BKY_CONTROLS_FOREACH_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": null
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "%{BKY_CONTROLS_FOREACH_HELPURL}",
    "extensions": [
      "block_init_color",
      "contextMenu_newGetVariableBlock",
      "controls_forEach_tooltip"
    ]
  },

  // Block for flow statements: continue, break.
  {
    "type": "controls_flow_statements",
    "message0": "%1",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "FLOW",
      "options": [
        ["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK}", "BREAK"],
        ["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE}", "CONTINUE"]
      ]
    }],
    "previousStatement": null,
    "helpUrl": "%{BKY_CONTROLS_FLOW_STATEMENTS_HELPURL}",
    "extensions": [
      "block_init_color",
      "controls_flow_tooltip",
      "controls_flow_in_loop_check"
    ]
  },

  // Block for flow statements: pass.
  {
    "type": "controls_pass_statements",
    "message0": "%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_PASS_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "style": "loops_blocks",
    "tooltip": "%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_PASS_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_PASS_HELPURL}",
  },

  // Block for comp List : [ a for a in range(10)]
  {
    "type": "controls_ListComp",
    "message0": "%{BKY_CONTROLS_LISTCOMP_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "EXPR",
      "variable": null
    },
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": null
    },
    {
      "type": "input_value",
      "name": "LIST",
      "check": "Array"
    }],
    "output": "Array",
    "style": "loops_blocks",
    "tooltip": "%{BKY_CONTROLS_LISTCOMP_TOOLTIP}",
    "extensions": [
      "block_buttons_plus_minus",
      "controls_ListComp_init_extension"
    ],
    "mutator": "controls_ListComp_mutator"
  },

  // Block range
  {
    "type": "controls_range",
    "message0": "%1",
    "args0": [{
      "type": "input_value",
      "name": "END"
    }],
    "inputsInline": true,
    "output": "Array",
    "style": "loops_blocks",
    "tooltip": "%{BKY_CONTROLS_RANGE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_buttons_plus_minus",
      "controls_range_init_extension"
    ],
    "mutator": "controls_range_mutator"
  },


]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Loops = Object.create(null);

/**
 * Tooltips for the 'controls_whileUntil' block, keyed by MODE value.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Loops.WHILE_UNTIL_TOOLTIPS = {
  'WHILE': '%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE}',
  'UNTIL': '%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL}'
};

/**
 * Tooltips for the 'controls_flow_statements' block, keyed by FLOW value.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Loops.BREAK_CONTINUE_TOOLTIPS = {
  'BREAK': '%{BKY_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK}',
  'CONTINUE': '%{BKY_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE}'
};

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

/**
 * This mixin adds a check to make sure the 'controls_flow_statements' block
 * is contained in a loop. Otherwise a warning is added to the block.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN = {
  /**
   * List of block types that are loops and thus do not need warnings.
   * To add a new loop type add this to your code:
   * Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.LOOP_TYPES.push('custom_loop');
   */
  LOOP_TYPES: Blockly.Constants.LOOP_TYPES,

  /**
   * Don't automatically add STATEMENT_PREFIX and STATEMENT_SUFFIX to generated
   * code. These will be handled manually in this block's generators.
   */
  suppressPrefixSuffix: true,

  /**
   * Is the given block enclosed (at any level) by a loop?
   * @param {!Blockly.Block} block Current block.
   * @return {Blockly.Block} The nearest surrounding loop, or null if none.
   */
  getSurroundLoop: function (block) {
    // Is the block nested in a loop?
    do {
      if (Blockly.Constants.LOOP_TYPES.indexOf(block.type) != -1) {
        return block;
      }
      block = block.getSurroundParent();
    } while (block);
    return null;
  },

  /**
   * Called whenever anything on the workspace changes.
   * Add warning if this flow block is not nested inside a loop.
   * @param {!Blockly.Events.Abstract} _e Change event.
   * @this {Blockly.Block}
   */
  onchange: function (_e) {
    if (!this.workspace.isDragging || this.workspace.isDragging()) {
      return; // Don't change state at the start of a drag.
    }
    if (typeof Blockly.Wiki !== 'undefined' || Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN
      .getSurroundLoop(this)) {
      this.setWarningText(null);
      if (!this.isInFlyout) {
        this.setEnabled(true);
      }
    } else {
      this.setWarningText(Blockly.Msg['CONTROLS_FLOW_STATEMENTS_WARNING']);
      if (!this.isInFlyout && !this.getInheritedDisabled()) {
        this.setEnabled(false);
      }
    }
  }
};


/**
 * Performs setup of 'control_range' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Loops.CONTROLS_RANGE_MUTATOR_INIT_EXTENSION = function () {
  this.itemCount_ = 1;
  this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'control_range' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Loops.CONTROLS_RANGE_MUTATOR_MIXIN = {
  /**
   * Create XML to represent number of data inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the data inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  storeConnections_: function () {
    this.itemBlock_ = [];
    if (this.itemCount_ > 0) {
      this.itemBlock_.push(this.getInput('END').connection.targetConnection);
    }
    if (this.itemCount_ > 1) {
      this.itemBlock_.push(this.getInput('START').connection.targetConnection);
    }
    if (this.itemCount_ > 2) {
      this.itemBlock_.push(this.getInput('STEP').connection.targetConnection);
    }
  },
  restoreConnections_: function () {
    if (this.itemCount_ > 0 && this.itemBlock_.length > 1)
      Blockly.Mutator.reconnect(this.itemBlock_[0], this, 'END');
    if (this.itemCount_ > 1 && this.itemBlock_.length > 1)
      Blockly.Mutator.reconnect(this.itemBlock_[1], this, 'START');
    if (this.itemCount_ > 2 && this.itemBlock_.length > 2)
      Blockly.Mutator.reconnect(this.itemBlock_[2], this, 'STEP');
  },
  addItem_: function () {
    this.storeConnections_();
    const update = function () {
      this.itemCount_++;
    };
    this.update_(update);
    this.updateShape_();
    this.restoreConnections_();
  },
  removeItem_: function () {
    this.storeConnections_();
    const update = function () {
      this.itemCount_--;
    };
    this.update_(update);
    this.updateShape_();
    this.restoreConnections_();
  },
  update_: function (update) {
    return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function () {
    const that = this;
    // delete everything
    if (this.getInput('BUTTONS'))
      this.removeInput('BUTTONS')
    if (this.getInput('BUTTONSbis'))
      this.removeInput('BUTTONSbis')

    if (this.itemCount_ > 0) {
      this.removeInput('END');
    }
    if (this.getInput('START')) {
      this.removeInput('START');
    }
    if (this.getInput('STEP')) {
      this.removeInput('STEP');
    }

    // rebuild
    if (this.itemCount_ > 0)
      this.appendValueInput('END').setCheck('Number').appendField("%{BKY_CONTROLS_RANGE_TITLE_1}");
    if (this.itemCount_ > 1)
      this.appendValueInput('START').setCheck('Number').appendField("%{BKY_CONTROLS_RANGE_TITLE_2}");
    if (this.itemCount_ > 2)
      this.appendValueInput('STEP').setCheck('Number').appendField("%{BKY_CONTROLS_RANGE_TITLE_3}");

    // Bouton
    if (this.itemCount_ > 1)
      this.appendDummyInput('BUTTONSbis')
        .appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", that.removeItem_.bind(that), false));

    if (this.itemCount_ < 3)
      this.appendDummyInput('BUTTONS')
        .appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", that.addItem_.bind(that), false));

  },
};

/**
 * Performs setup of 'Control_range' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Loops.CONTROLS_LISTCOMP_INIT_EXTENSION = function () {
  this.itemCount_ = 1;
  this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'control_range' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Loops.CONTROLS_LISTCOMP_MUTATOR_MIXIN = {
  /**
   * Create XML to represent number of data inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the data inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  storeConnections_: function () {
    this.itemBlock_ = [];
    for (let i = 1; i < this.itemCount_; i++) {
      this.itemBlock_.push(this.getInput('ITEM' + i).connection.targetConnection);
    }
  },
  restoreConnections_: function () {
    for (let i = 1; i < this.itemCount_; i++)
      Blockly.Mutator.reconnect(this.itemBlock_[i - 1], this, 'ITEM' + i);
  },
  addItem_: function () {
    this.storeConnections_();
    const update = function () {
      this.itemCount_++;
    };
    this.update_(update);
    this.updateShape_();
    this.restoreConnections_();
  },
  removeItem_: function () {
    this.storeConnections_();
    const update = function () {
      this.itemCount_--;
    };
    this.update_(update);
    this.updateShape_();
    this.restoreConnections_();
  },
  update_: function (update) {
    return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function () {
    const that = this;
    // delete everything
    if (this.getInput('BUTTONS'))
      this.removeInput('BUTTONS')
    if (this.getInput('BUTTONSbis'))
      this.removeInput('BUTTONSbis')

    for (let i = 1; i < this.itemCount_ + 1 && this.getInput('ITEM' + i); i++) {
      this.removeInput('ITEM' + i);
    }

    // rebuild
    for (let i = 1; i < this.itemCount_; i++) {
      this.appendValueInput('ITEM' + i).setCheck('Boolean').appendField("if ");
    }

    // Bouton
    if (this.itemCount_ > 1)
      this.appendDummyInput('BUTTONSbis')
        .appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", that.removeItem_.bind(that), false));

    this.appendDummyInput('BUTTONS')
      .appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", that.addItem_.bind(that), false));
  },
};

// Tooltip extensions
Blockly.Extensions.register('controls_whileUntil_tooltip',
  Blockly.Extensions.buildTooltipForDropdown(
    'MODE', Blockly.Constants.Loops.WHILE_UNTIL_TOOLTIPS));

Blockly.Extensions.register('controls_flow_tooltip',
  Blockly.Extensions.buildTooltipForDropdown(
    'FLOW', Blockly.Constants.Loops.BREAK_CONTINUE_TOOLTIPS));

Blockly.Extensions.register('controls_for_tooltip',
  Blockly.Extensions.buildTooltipWithFieldText(
    '%{BKY_CONTROLS_FOR_TOOLTIP}', 'VAR'));

Blockly.Extensions.register('controls_forEach_tooltip',
  Blockly.Extensions.buildTooltipWithFieldText(
    '%{BKY_CONTROLS_FOREACH_TOOLTIP}', 'VAR'));

Blockly.Extensions.register('controls_range_init_extension',
  Blockly.Constants.Loops.CONTROLS_RANGE_MUTATOR_INIT_EXTENSION);

Blockly.Extensions.register('controls_ListComp_init_extension',
  Blockly.Constants.Loops.CONTROLS_LISTCOMP_INIT_EXTENSION);

// Mixin functions
Blockly.Extensions.registerMixin('contextMenu_newGetVariableBlock',
  Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN);

Blockly.Extensions.registerMixin('controls_flow_in_loop_check',
  Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN);

Blockly.Extensions.registerMutator('controls_range_mutator',
  Blockly.Constants.Loops.CONTROLS_RANGE_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('controls_ListComp_mutator',
  Blockly.Constants.Loops.CONTROLS_LISTCOMP_MUTATOR_MIXIN);