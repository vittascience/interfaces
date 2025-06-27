Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

  // Block for creating a list with items
  {
    "type": "lists_create_with",
    "output": "Array",
    "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_CREATE_WITH_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_CREATE_WITH_HELPURL}",
    "extensions": [
      "block_buttons_plus_minus",
      "lists_create_with_init"
    ],
    "mutator": "lists_create_with_mutator"
  },

  // Block for creating a list with one element repeated.
  {
    "type": "lists_repeat",
    "message0": "%{BKY_LISTS_REPEAT_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "ITEM"
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Array",
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_REPEAT_HELPURL}"
  },

  // Block for getting the list length
  {
    "type": "lists_length",
    "message0": "%{BKY_LISTS_LENGTH_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": ["String", "Array"]
      }
    ],
    "output": "Number",
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_LENGTH_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_LENGTH_HELPURL}"
  },

  // Block for appending value in a list
  {
    "type": "lists_append",
    "message0": "%{BKY_LISTS_APPEND_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": ["String", "Array"]
      },
      {
        "type": "input_value",
        "name": "VALUE",
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_APPEND_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_APPEND_HELPURL}"
  },

  // Block for evaluating a list of numbers to return sum, average, min, max,
  // etc.  Some functions also work on text (min, max, mode, median).
  {
    "type": "math_on_list",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ONLIST_OPERATOR_SUM}", "SUM"],
          ["%{BKY_MATH_ONLIST_OPERATOR_MIN}", "MIN"],
          ["%{BKY_MATH_ONLIST_OPERATOR_MAX}", "MAX"],
          ["%{BKY_MATH_ONLIST_OPERATOR_AVERAGE}", "AVERAGE"],
          ["%{BKY_MATH_ONLIST_OPERATOR_MEDIAN}", "MEDIAN"],
          ["%{BKY_MATH_ONLIST_OPERATOR_MODE}", "MODE"],
          ["%{BKY_MATH_ONLIST_OPERATOR_STD_DEV}", "STD_DEV"],
          ["%{BKY_MATH_ONLIST_OPERATOR_RANDOM}", "RANDOM"]
        ]
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": "Number",
    "style": "list_blocks",
    "helpUrl": "%{BKY_MATH_ONLIST_HELPURL}",
    "mutator": "math_modes_of_list_mutator",
    "extensions": ["lists_op_tooltip"]
  },

  // Block for checking if a list is empty
  {
    "type": "lists_isEmpty",
    "message0": "%{BKY_LISTS_ISEMPTY_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": ["String", "Array"]
      }
    ],
    "output": "Boolean",
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_ISEMPTY_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_ISEMPTY_HELPURL}"
  },

  // Block for reversing a list.
  {
    "type": "lists_reverse",
    "message0": "%{BKY_LISTS_REVERSE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": "Array",
    "inputsInline": true,
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_REVERSE_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_REVERSE_HELPURL}"
  },
  // Block for shuffling a list.
  {
    "type": "lists_shuffle",
    "message0": "%{BKY_LISTS_SHUFFLE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_SHUFFLE_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_SHUFFLE_HELPURL}"
  },

  // Block for sorting list in different order
  {
    "type": "lists_sort",
    "message0": "%{BKY_LISTS_SORT_TITLE}",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "TYPE",
        "options": [
          ["%{BKY_LISTS_SORT_TYPE_NUMERIC}", "NUMERIC"],
          ["%{BKY_LISTS_SORT_TYPE_TEXT}", "TEXT"],
          ["%{BKY_LISTS_SORT_TYPE_IGNORECASE}", "IGNORE_CASE"]
        ]
      },
      {
        "type": "field_grid_dropdown",
        "name": "DIRECTION",
        "options": [
          ["%{BKY_LISTS_SORT_ORDER_ASCENDING}", "1"],
          ["%{BKY_LISTS_SORT_ORDER_DESCENDING}", "-1"]
        ]
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": "Array",
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_SORT_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_SORT_HELPURL}"
  }

]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['lists_indexOf'] = {
  /**
   * Block for finding an item in the list.
   * @this {Blockly.Block}
   */
  init: function () {
    var OPERATORS = [
      [Blockly.Msg['LISTS_INDEX_OF_FIRST'], 'FIRST'],
      [Blockly.Msg['LISTS_INDEX_OF_LAST'], 'LAST']
    ];
    this.setHelpUrl(Blockly.Msg['LISTS_INDEX_OF_HELPURL']);
    this.setStyle('list_blocks');
    this.setOutput(true, 'Number');
    this.appendValueInput('LIST')
      .setCheck('Array')
      .appendField(Blockly.Msg['LISTS_INDEX_OF_INPUT_IN_LIST']);
    this.appendValueInput('FIND')
      .appendField(new Blockly.FieldDropdown(OPERATORS), 'END');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return Blockly.Msg['LISTS_INDEX_OF_TOOLTIP'].replace('%1',
        thisBlock.workspace.options.oneBasedIndex ? '0' : '-1');
    });
  }
};

Blockly.Blocks['lists_getIndex'] = {
  /**
   * Block for getting element at index.
   * @this {Blockly.Block}
   */
  init: function () {
    var MODE =
      [
        [Blockly.Msg['LISTS_GET_INDEX_GET'], 'GET'],
        [Blockly.Msg['LISTS_GET_INDEX_GET_REMOVE'], 'GET_REMOVE'],
        [Blockly.Msg['LISTS_GET_INDEX_REMOVE'], 'REMOVE']
      ];
    this.WHERE_OPTIONS =
      [
        [Blockly.Msg['LISTS_GET_INDEX_FROM_START'], 'FROM_START'],
        [Blockly.Msg['LISTS_GET_INDEX_FROM_END'], 'FROM_END'],
        [Blockly.Msg['LISTS_GET_INDEX_FIRST'], 'FIRST'],
        [Blockly.Msg['LISTS_GET_INDEX_LAST'], 'LAST'],
        [Blockly.Msg['LISTS_GET_INDEX_RANDOM'], 'RANDOM']
      ];
    this.setHelpUrl(Blockly.Msg['LISTS_GET_INDEX_HELPURL']);
    this.setStyle('list_blocks');
    var modeMenu = new Blockly.FieldDropdown(MODE, function (value) {
      var isStatement = (value == 'REMOVE');
      this.getSourceBlock().updateStatement_(isStatement);
    });
    this.appendValueInput('VALUE')
      .setCheck('Array')
      .appendField(Blockly.Msg['LISTS_GET_INDEX_INPUT_IN_LIST']);
    this.appendDummyInput()
      .appendField(modeMenu, 'MODE')
      .appendField('', 'SPACE');
    this.appendDummyInput('AT');
    if (Blockly.Msg['LISTS_GET_INDEX_TAIL']) {
      this.appendDummyInput('TAIL')
        .appendField(Blockly.Msg['LISTS_GET_INDEX_TAIL']);
    }
    this.setInputsInline(true);
    this.setOutput(true);
    this.updateAt_(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('MODE');
      var where = thisBlock.getFieldValue('WHERE');
      var tooltip = '';
      switch (mode + ' ' + where) {
        case 'GET FROM_START':
        case 'GET FROM_END':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_FROM'];
          break;
        case 'GET FIRST':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_FIRST'];
          break;
        case 'GET LAST':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_LAST'];
          break;
        case 'GET RANDOM':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_RANDOM'];
          break;
        case 'GET_REMOVE FROM_START':
        case 'GET_REMOVE FROM_END':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM'];
          break;
        case 'GET_REMOVE FIRST':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST'];
          break;
        case 'GET_REMOVE LAST':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST'];
          break;
        case 'GET_REMOVE RANDOM':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM'];
          break;
        case 'REMOVE FROM_START':
        case 'REMOVE FROM_END':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM'];
          break;
        case 'REMOVE FIRST':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST'];
          break;
        case 'REMOVE LAST':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST'];
          break;
        case 'REMOVE RANDOM':
          tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM'];
          break;
      }
      if (where == 'FROM_START' || where == 'FROM_END') {
        var msg = (where == 'FROM_START') ?
          Blockly.Msg['LISTS_INDEX_FROM_START_TOOLTIP'] :
          Blockly.Msg['LISTS_INDEX_FROM_END_TOOLTIP'];
        tooltip += '  ' + msg.replace('%1',
          thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
      }
      return tooltip;
    });
  },
  /**
   * Create XML to represent whether the block is a statement or a value.
   * Also represent whether there is an 'AT' input.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    var isStatement = !this.outputConnection;
    container.setAttribute('statement', isStatement);
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    container.setAttribute('at', isAt);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' input.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    // Note: Until January 2013 this block did not have mutations,
    // so 'statement' defaults to false and 'at' defaults to true.
    var isStatement = (xmlElement.getAttribute('statement') == 'true');
    this.updateStatement_(isStatement);
    var isAt = (xmlElement.getAttribute('at') != 'false');
    this.updateAt_(isAt);
  },
  /**
   * Switch between a value block and a statement block.
   * @param {boolean} newStatement True if the block should be a statement.
   *     False if the block should be a value.
   * @private
   * @this {Blockly.Block}
   */
  updateStatement_: function (newStatement) {
    var oldStatement = !this.outputConnection;
    if (newStatement != oldStatement) {
      this.unplug(true, true);
      if (newStatement) {
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
      } else {
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true);
      }
    }
  },
  /**
   * Create or delete an input for the numeric index.
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this {Blockly.Block}
   */
  updateAt_: function (isAt) {
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT');
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck('Number');
      if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
        this.appendDummyInput('ORDINAL')
          .appendField(Blockly.Msg['ORDINAL_NUMBER_SUFFIX']);
      }
    } else {
      this.appendDummyInput('AT');
    }
    var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (value) {
      var newAt = (value == 'FROM_START') || (value == 'FROM_END');
      // The 'isAt' variable is available due to this function being a closure.
      if (newAt != isAt) {
        var block = this.getSourceBlock();
        block.updateAt_(newAt);
        // This menu has been destroyed and replaced.  Update the replacement.
        block.setFieldValue(value, 'WHERE');
        return null;
      }
      return undefined;
    });
    this.getInput('AT').appendField(menu, 'WHERE');
    if (Blockly.Msg['LISTS_GET_INDEX_TAIL']) {
      this.moveInputBefore('TAIL', null);
    }
    /**
     * WAITING GOOGLE ISSUE (dropdown colour)
     */
    this.setStyle("list_blocks");
    /**
     * END
     */
  }
};

Blockly.Blocks['lists_setIndex'] = {
  /**
   * Block for setting the element at index.
   * @this {Blockly.Block}
   */
  init: function () {
    var MODE =
      [
        [Blockly.Msg['LISTS_SET_INDEX_SET'], 'SET'],
        [Blockly.Msg['LISTS_SET_INDEX_INSERT'], 'INSERT']
      ];
    this.WHERE_OPTIONS =
      [
        [Blockly.Msg['LISTS_GET_INDEX_FROM_START'], 'FROM_START'],
        [Blockly.Msg['LISTS_GET_INDEX_FROM_END'], 'FROM_END'],
        [Blockly.Msg['LISTS_GET_INDEX_FIRST'], 'FIRST'],
        [Blockly.Msg['LISTS_GET_INDEX_LAST'], 'LAST'],
        [Blockly.Msg['LISTS_GET_INDEX_RANDOM'], 'RANDOM']
      ];
    this.setHelpUrl(Blockly.Msg['LISTS_SET_INDEX_HELPURL']);
    this.setStyle('list_blocks');
    this.appendValueInput('LIST')
      .setCheck('Array')
      .appendField(Blockly.Msg['LISTS_SET_INDEX_INPUT_IN_LIST']);
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(MODE), 'MODE')
      .appendField('', 'SPACE');
    this.appendDummyInput('AT');
    this.appendValueInput('TO')
      .appendField(Blockly.Msg['LISTS_SET_INDEX_INPUT_TO']);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg['LISTS_SET_INDEX_TOOLTIP']);
    this.updateAt_(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('MODE');
      var where = thisBlock.getFieldValue('WHERE');
      var tooltip = '';
      switch (mode + ' ' + where) {
        case 'SET FROM_START':
        case 'SET FROM_END':
          tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_FROM'];
          break;
        case 'SET FIRST':
          tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_FIRST'];
          break;
        case 'SET LAST':
          tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_LAST'];
          break;
        case 'SET RANDOM':
          tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_RANDOM'];
          break;
        case 'INSERT FROM_START':
        case 'INSERT FROM_END':
          tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_FROM'];
          break;
        case 'INSERT FIRST':
          tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST'];
          break;
        case 'INSERT LAST':
          tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_LAST'];
          break;
        case 'INSERT RANDOM':
          tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM'];
          break;
      }
      if (where == 'FROM_START' || where == 'FROM_END') {
        tooltip += '  ' + Blockly.Msg['LISTS_INDEX_FROM_START_TOOLTIP']
          .replace('%1',
            thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
      }
      return tooltip;
    });
  },
  /**
   * Create XML to represent whether there is an 'AT' input.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    container.setAttribute('at', isAt);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' input.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    // Note: Until January 2013 this block did not have mutations,
    // so 'at' defaults to true.
    var isAt = (xmlElement.getAttribute('at') != 'false');
    this.updateAt_(isAt);
  },
  /**
   * Create or delete an input for the numeric index.
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this {Blockly.Block}
   */
  updateAt_: function (isAt) {
    // Destroy old 'AT' and 'ORDINAL' input.
    this.removeInput('AT');
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck('Number');
      if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
        this.appendDummyInput('ORDINAL')
          .appendField(Blockly.Msg['ORDINAL_NUMBER_SUFFIX']);
      }
    } else {
      this.appendDummyInput('AT');
    }
    var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (value) {
      var newAt = (value == 'FROM_START') || (value == 'FROM_END');
      // The 'isAt' variable is available due to this function being a closure.
      if (newAt != isAt) {
        var block = this.getSourceBlock();
        block.updateAt_(newAt);
        // This menu has been destroyed and replaced.  Update the replacement.
        block.setFieldValue(value, 'WHERE');
        return null;
      }
      return undefined;
    });
    this.moveInputBefore('AT', 'TO');
    if (this.getInput('ORDINAL')) {
      this.moveInputBefore('ORDINAL', 'TO');
    }

    this.getInput('AT').appendField(menu, 'WHERE');
  }
};

Blockly.Blocks['lists_getSublist'] = {
  /**
   * Block for getting sublist.
   * @this {Blockly.Block}
   */
  init: function () {
    this['WHERE_OPTIONS_1'] =
      [
        [Blockly.Msg['LISTS_GET_SUBLIST_START_FROM_START'], 'FROM_START'],
        [Blockly.Msg['LISTS_GET_SUBLIST_START_FROM_END'], 'FROM_END'],
        [Blockly.Msg['LISTS_GET_SUBLIST_START_FIRST'], 'FIRST']
      ];
    this['WHERE_OPTIONS_2'] =
      [
        [Blockly.Msg['LISTS_GET_SUBLIST_END_FROM_START'], 'FROM_START'],
        [Blockly.Msg['LISTS_GET_SUBLIST_END_FROM_END'], 'FROM_END'],
        [Blockly.Msg['LISTS_GET_SUBLIST_END_LAST'], 'LAST']
      ];
    this.setHelpUrl(Blockly.Msg['LISTS_GET_SUBLIST_HELPURL']);
    this.setStyle('list_blocks');
    this.appendValueInput('LIST')
      .setCheck('Array')
      .appendField(Blockly.Msg['LISTS_GET_SUBLIST_INPUT_IN_LIST']);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    if (Blockly.Msg['LISTS_GET_SUBLIST_TAIL']) {
      this.appendDummyInput('TAIL')
        .appendField(Blockly.Msg['LISTS_GET_SUBLIST_TAIL']);
    }
    this.setInputsInline(true);
    this.setOutput(true, 'Array');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg['LISTS_GET_SUBLIST_TOOLTIP']);
  },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
    container.setAttribute('at1', isAt1);
    var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    container.setAttribute('at2', isAt2);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    var isAt1 = (xmlElement.getAttribute('at1') == 'true');
    var isAt2 = (xmlElement.getAttribute('at2') == 'true');
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
  },
  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independent of each other.
   * @param {number} n Specify first or second input (1 or 2).
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this {Blockly.Block}
   */
  updateAt_: function (n, isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT' + n).setCheck('Number');
      if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
        this.appendDummyInput('ORDINAL' + n)
          .appendField(Blockly.Msg['ORDINAL_NUMBER_SUFFIX']);
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
      function (value) {
        var newAt = (value == 'FROM_START') || (value == 'FROM_END');
        // The 'isAt' variable is available due to this function being a
        // closure.
        if (newAt != isAt) {
          var block = this.getSourceBlock();
          block.updateAt_(n, newAt);
          // This menu has been destroyed and replaced.
          // Update the replacement.
          block.setFieldValue(value, 'WHERE' + n);
          return null;
        }
      });
    this.getInput('AT' + n)
      .appendField(menu, 'WHERE' + n);
    if (n == 1) {
      this.moveInputBefore('AT1', 'AT2');
      if (this.getInput('ORDINAL1')) {
        this.moveInputBefore('ORDINAL1', 'AT2');
      }
    }
    if (Blockly.Msg['LISTS_GET_SUBLIST_TAIL']) {
      this.moveInputBefore('TAIL', null);
    }
  }
};

Blockly.Blocks['lists_split'] = {
  /**
   * Block for splitting text into a list, or joining a list into text.
   * @this {Blockly.Block}
   */
  init: function () {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    var dropdown = new Blockly.FieldDropdown(
      [
        [Blockly.Msg['LISTS_SPLIT_LIST_FROM_TEXT'], 'SPLIT'],
        [Blockly.Msg['LISTS_SPLIT_TEXT_FROM_LIST'], 'JOIN']
      ],
      function (newMode) {
        thisBlock.updateType_(newMode);
      });
    this.setHelpUrl(Blockly.Msg['LISTS_SPLIT_HELPURL']);
    this.setStyle('list_blocks');
    this.appendValueInput('INPUT')
      .setCheck('String')
      .appendField(dropdown, 'MODE');
    this.appendValueInput('DELIM')
      .setCheck('String')
      .appendField(Blockly.Msg['LISTS_SPLIT_WITH_DELIMITER']);
    this.setInputsInline(true);
    this.setOutput(true, 'Array');
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('MODE');
      if (mode == 'SPLIT') {
        return Blockly.Msg['LISTS_SPLIT_TOOLTIP_SPLIT'];
      } else if (mode == 'JOIN') {
        return Blockly.Msg['LISTS_SPLIT_TOOLTIP_JOIN'];
      }
      throw Error('Unknown mode: ' + mode);
    });
  },
  /**
   * Modify this block to have the correct input and output types.
   * @param {string} newMode Either 'SPLIT' or 'JOIN'.
   * @private
   * @this {Blockly.Block}
   */
  updateType_: function (newMode) {
    var mode = this.getFieldValue('MODE');
    if (mode != newMode) {
      var inputConnection = this.getInput('INPUT').connection;
      inputConnection.setShadowDom(null);
      var inputBlock = inputConnection.targetBlock();
      if (inputBlock) {
        inputConnection.disconnect();
        if (inputBlock.isShadow()) {
          inputBlock.dispose();
        } else {
          this.bumpNeighbours();
        }
      }
    }
    if (newMode == 'SPLIT') {
      this.outputConnection.setCheck('Array');
      this.getInput('INPUT').setCheck('String');
    } else {
      this.outputConnection.setCheck('String');
      this.getInput('INPUT').setCheck('Array');
    }
  },
  /**
   * Create XML to represent the input and output types.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('mode', this.getFieldValue('MODE'));
    return container;
  },
  /**
   * Parse XML to restore the input and output types.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.updateType_(xmlElement.getAttribute('mode'));
  }
};

Blockly.Constants.Lists = Object.create(null);

/**
 * Performs final setup of 'lists_create_with' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Lists.LISTS_CREATE_WITH_INIT_EXTENSION = function () {
  this.itemCount_ = 3;
  this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'lists_create_with_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Lists.LISTS_CREATE_WITH_MUTATOR_MIXIN = {
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Store pointers to any connected child blocks.
   */
  storeConnections_: function () {
    this.valueConnections_ = [];
    for (var i = 0; i < this.itemCount_; i++) {
      this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
    }
  },
  restoreConnections_: function () {
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
    }
  },
  addItem_: function () {
    this.storeConnections_();
    var update = function () {
      this.itemCount_++;
    };
    this.update_(update);
    this.restoreConnections_();
    // Add shadow block
    if (this.itemCount_ > 1) {
      // Find shadow type
      var firstInput = this.getInput('ADD' + 0);
      if (firstInput && firstInput.connection.targetConnection) {
        // Create a new shadow DOM with the same type as the first input
        // but with an empty default value
        var newInput = this.getInput('ADD' + (this.itemCount_ - 1));
        var shadowInputDom = firstInput.connection.getShadowDom();
        if (shadowInputDom) {
          var shadowDom = Blockly.utils.xml.createElement('shadow');
          var shadowInputType = shadowInputDom.getAttribute('type');
          shadowDom.setAttribute('type', shadowInputType);
          var shadowDomField = Blockly.utils.xml.createElement('field');
          shadowDomField.setAttribute('name', 'NUM');
          shadowDom.appendChild(shadowDomField);
          if (shadowDom) {
            shadowDom.setAttribute('id', Blockly.utils.genUid());
            newInput.connection.setShadowDom(shadowDom);
            newInput.connection.respawnShadow_();
          }
        }
      }
    }
  },
  removeItem_: function () {
    this.storeConnections_();
    var update = function () {
      this.itemCount_--;
    };
    this.update_(update);
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
    var that = this;
    var remove = function () {
      that.removeItem_();
    };
    var add = function () {
      that.addItem_();
    };
    // Remove all inputs
    if (this.getInput('TOP')) this.removeInput('TOP');
    var i = 0;
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
    // Update inputs
    var top = this.appendDummyInput('TOP');
    if (this.itemCount_ > 0) {
      top.appendField(Blockly.Msg['LISTS_CREATE_WITH_INPUT_WITH']);
      top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
      top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
      for (var i = 0; i < this.itemCount_; i++) {
        this.appendValueInput('ADD' + i);
      }
    }
    // Case of empty list
    else {
      top.appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
      top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
    }
    /* Switch to vertical list when the list is too long */
    var showHorizontalList = this.itemCount_ <= 5;
    this.setInputsInline(showHorizontalList);
    this.setOutputShape(showHorizontalList ?
      Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
  }
};

/**
 * Mixin with mutator methods to support alternate output based if the
 * 'math_on_list' block uses the 'MODE' operation.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Lists.LIST_MODES_MUTATOR_MIXIN = {
  /**
   * Modify this block to have the correct output type.
   * @param {string} newOp Either 'MODE' or some op than returns a number.
   * @private
   * @this {Blockly.Block}
   */
  updateType_: function (newOp) {
    if (newOp == 'MODE') {
      this.outputConnection.setCheck('Array');
    } else {
      this.outputConnection.setCheck('Number');
    }
  },
  /**
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('op', this.getFieldValue('OP'));
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.updateType_(xmlElement.getAttribute('op'));
  }
};

/**
 * Extension to 'math_on_list' blocks that allows support of
 * modes operation (outputs a list of numbers).
 * @this {Blockly.Block}
 * @package
 */
Blockly.Constants.Lists.LIST_MODES_MUTATOR_EXTENSION = function () {
  this.getField('OP').setValidator(function (newOp) {
    this.updateType_(newOp);
  }.bind(this));
};

/**
 * Mapping of lists operations to tooltip message for
 * block math_on_lists.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Lists.TOOLTIPS_BY_OP = {
  'SUM': '%{BKY_MATH_ONLIST_TOOLTIP_SUM}',
  'MIN': '%{BKY_MATH_ONLIST_TOOLTIP_MIN}',
  'MAX': '%{BKY_MATH_ONLIST_TOOLTIP_MAX}',
  'AVERAGE': '%{BKY_MATH_ONLIST_TOOLTIP_AVERAGE}',
  'MEDIAN': '%{BKY_MATH_ONLIST_TOOLTIP_MEDIAN}',
  'MODE': '%{BKY_MATH_ONLIST_TOOLTIP_MODE}',
  'STD_DEV': '%{BKY_MATH_ONLIST_TOOLTIP_STD_DEV}',
  'RANDOM': '%{BKY_MATH_ONLIST_TOOLTIP_RANDOM}'
};

// Extensions
Blockly.Extensions.register("lists_create_with_init",
  Blockly.Constants.Lists.LISTS_CREATE_WITH_INIT_EXTENSION);

Blockly.Extensions.register('lists_op_tooltip',
  Blockly.Extensions.buildTooltipForDropdown(
    'OP', Blockly.Constants.Lists.TOOLTIPS_BY_OP));

// Mutator
Blockly.Extensions.registerMutator('lists_create_with_mutator',
  Blockly.Constants.Lists.LISTS_CREATE_WITH_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('math_modes_of_list_mutator',
  Blockly.Constants.Lists.LIST_MODES_MUTATOR_MIXIN,
  Blockly.Constants.Lists.LIST_MODES_MUTATOR_EXTENSION);

