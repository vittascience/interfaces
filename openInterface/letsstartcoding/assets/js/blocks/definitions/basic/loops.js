/**
 * @fileoverview Loop blocks for Blockly.
 */
Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

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
  }

]); // END JSON EXTRACT (Do not delete this comment.)

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