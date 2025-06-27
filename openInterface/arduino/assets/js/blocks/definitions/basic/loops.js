/**
 * @fileoverview Loop blocks for Blockly.
 */
Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // Block for repeat n times (external number).
  {
    "type": "controls_repeat",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}",
    "extensions": [
      "block_init_color"
    ]
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
    "extensions": ["controls_whileUntil_tooltip"],
    "extensions": [
      "block_init_color"
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
      "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_,
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "TO",
      "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_,
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "BY",
      "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_,
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
      "controls_for_tooltip",
      "field_variable_type_getter"
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
  }
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
  LOOP_TYPES: [
    'forever',
    'controls_repeat',
    'controls_forEach',
    'controls_for',
    'controls_whileUntil'
  ],

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
      if (Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.LOOP_TYPES
        .indexOf(block.type) != -1) {
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
    if (Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN
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

// Tooltip extensions
Blockly.Extensions.register('controls_for_tooltip',
  Blockly.Extensions.buildTooltipWithFieldText(
    '%{BKY_CONTROLS_FOR_TOOLTIP}', 'VAR'));

Blockly.Extensions.register('controls_forEach_tooltip',
  Blockly.Extensions.buildTooltipWithFieldText(
    '%{BKY_CONTROLS_FOREACH_TOOLTIP}', 'VAR'));

Blockly.Extensions.register('controls_whileUntil_tooltip',
  Blockly.Extensions.buildTooltipForDropdown(
    'MODE', Blockly.Constants.Loops.WHILE_UNTIL_TOOLTIPS));

Blockly.Extensions.register('controls_flow_tooltip',
  Blockly.Extensions.buildTooltipForDropdown(
    'FLOW', Blockly.Constants.Loops.BREAK_CONTINUE_TOOLTIPS));

// Mixin functions
Blockly.Extensions.registerMixin('contextMenu_newGetVariableBlock',
  Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN);

Blockly.Extensions.registerMixin('controls_flow_in_loop_check',
  Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN);

