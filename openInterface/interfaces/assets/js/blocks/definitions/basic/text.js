/**
 * @fileoverview Text blocks for Blockly.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

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
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "comment_block",
    "tooltip": "%{BKY_TEXT_COMMENT_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // Block for text value
  {
    "type": "text",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
        "text": null
      }
    ],
    "output": "String",
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "extensions": [
      "text_quotes"
    ]
  },

  // Block for joining text items
  {
    "type": "text_join",
    "output": "String",
    "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_JOIN_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_JOIN_HELPURL}",
    "extensions": [
      "block_buttons_plus_minus",
      "text_join_init"
    ],
    "mutator": "text_join_mutator"
  },

  {
    "type": "text_join_simple",
    "output": "String",
    "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_JOIN_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_JOIN_HELPURL}",
    "extensions": [
      "block_buttons_plus_minus",
      "text_join_init"
    ],
    "mutator": "text_join_mutator"
  },

  // Block for adding newlines in text
  {
    "type": "text_newline",
    "message0": "%{BKY_TEXT_NEWLINE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "N",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "String",
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_NEWLINE_TOOLTIP}"
  },

  // Block for appending text to 
  {
    "type": "text_append",
    "message0": "%{BKY_TEXT_APPEND_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_TEXT_APPEND_VARIABLE}"
      },
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "text_blocks",
    "extensions": [
      "text_append_tooltip"
    ]
  },

  // Block for splitting text in a list by a character or string
  {
    "type": "text_split",
    "message0": "%{BKY_TEXT_SPLIT_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": 'String'
      },
      {
        "type": "input_value",
        "name": "SEP",
        "check": 'String'
      }
    ],
    "inputsInline": true,
    "output": 'Array',
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_SPLIT_TOOLTIP}"
  },

  // Block for getting length of text input
  {
    "type": "text_length",
    "message0": "%{BKY_TEXT_LENGTH_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": ['String', 'Array']
      }
    ],
    "output": 'Number',
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_LENGTH_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_LENGTH_HELPURL}"
  },

  // Block for checking if input text is empty
  {
    "type": "text_isEmpty",
    "message0": "%{BKY_TEXT_ISEMPTY_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": ['String', 'Array']
      }
    ],
    "output": 'Boolean',
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_ISEMPTY_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_ISEMPTY_HELPURL}"
  },

  // Block for getting index of input text in another text
  {
    "type": "text_indexOf",
    "message0": "%{BKY_TEXT_INDEXOF_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      },
      {
        "type": "field_grid_dropdown",
        "name": "END",
        "options": [
          ["%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}", "FIRST"],
          ["%{BKY_TEXT_INDEXOF_OPERATOR_LAST}", "LAST"]
        ]
      },
      {
        "type": "input_value",
        "name": "FIND",
        "check": "String"
      }
    ],
    "output": "Number",
    "inputsInline": true,
    "style": "text_blocks",
    "helpUrl": "%{BKY_TEXT_INDEXOF_HELPURL}",
    "extensions": [
      "text_indexOf_tooltip"
    ]
  },

  // Block for trimming spaces
  {
    "type": "text_trim",
    "message0": "%{BKY_TEXT_TRIM_TITLE}",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "MODE",
        "options": [
          ["%{BKY_TEXT_TRIM_OPERATOR_BOTH}", 'BOTH'],
          ["%{BKY_TEXT_TRIM_OPERATOR_LEFT}", 'LEFT'],
          ["%{BKY_TEXT_TRIM_OPERATOR_RIGHT}", 'RIGHT']
        ]
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "String",
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_TRIM_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_TRIM_HELPURL}"
  },

  // Block for changing capitalization of a string
  {
    "type": "text_changeCase",
    "message0": "%{BKY_TEXT_CHANGECASE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "field_grid_dropdown",
        "name": "CASE",
        "options": [
          ["%{BKY_TEXT_CHANGECASE_OPERATOR_UPPERCASE}", 'UPPERCASE'],
          ["%{BKY_TEXT_CHANGECASE_OPERATOR_LOWERCASE}", 'LOWERCASE'],
          ["%{BKY_TEXT_CHANGECASE_OPERATOR_TITLECASE}", 'TITLECASE']
        ]
      }
    ],
    "output": "String",
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_CHANGECASE_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_CHANGECASE_HELPURL}"
  },

  // Block for getting character at specified index
  {
    "type": "text_charAt",
    "message0": "%{BKY_TEXT_CHARAT_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      },
      {
        "type": "field_grid_dropdown",
        "name": "WHERE",
        "options": [
          ["%{BKY_TEXT_CHARAT_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_CHARAT_FROM_END}", "FROM_END"],
          ["%{BKY_TEXT_CHARAT_FIRST}", "FIRST"],
          ["%{BKY_TEXT_CHARAT_LAST}", "LAST"],
          ["%{BKY_TEXT_CHARAT_RANDOM}", "RANDOM"]
        ]
      }
    ],
    "output": "String",
    "inputsInline": true,
    "style": "text_blocks",
    "helpUrl": "%{BKY_TEXT_CHARAT_HELPURL}",
    "mutator": "text_charAt_mutator"
  },

  // Block for counting occurence of subtext in text
  {
    "type": "text_count",
    "message0": "%{BKY_TEXT_COUNT_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "SUB",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "Number",
    "inputsInline": true,
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_COUNT_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_COUNT_HELPURL}"
  },

  // Block for reversing a string
  {
    "type": "text_reverse",
    "message0": "%{BKY_TEXT_REVERSE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "String",
    "inputsInline": true,
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_REVERSE_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_REVERSE_HELPURL}"
  },

  // Block for replacing substring in another string
  {
    "type": "text_replace",
    "message0": "%{BKY_TEXT_REPLACE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "FROM",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "TO",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "String",
    "inputsInline": true,
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_REPLACE_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_REPLACE_HELPURL}"
  },

  {
    "type": "text_count_characters",
    "message0": "%{BKY_TEXT_COUNT_CHARACTERS_TITLE}",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "TYPE",
        "options": [
          ["%{BKY_TEXT_COUNT_CHARACTERS_UPPER}", "UPPER"],
          ["%{BKY_TEXT_COUNT_CHARACTERS_LOWER}", "LOWER"],
          ["%{BKY_TEXT_COUNT_CHARACTERS_DIGITS}", "DIGITS"],
          ["%{BKY_TEXT_COUNT_CHARACTERS_SPECIAL}", "SPECIAL"]
        ]
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "Number",
    "inputsInline": true,
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_COUNT_CHARACTERS_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  {
    "type": "text_random_string",
    "message0": "%{BKY_TEXT_RANDOM_STRING_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "LENGTH",
      "check": "Number"
    }],
    "output": "String",
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_RANDOM_STRING_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['text_getSubstring'] = {
  /**
   * Block for getting substring.
   * @this {Blockly.Block}
   */
  init: function () {
    this['WHERE_OPTIONS_1'] = [
      [Blockly.Msg['TEXT_GET_SUBSTRING_START_FROM_START'], 'FROM_START'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_START_FROM_END'], 'FROM_END'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_START_FIRST'], 'FIRST']
    ];
    this['WHERE_OPTIONS_2'] = [
      [Blockly.Msg['TEXT_GET_SUBSTRING_END_FROM_START'], 'FROM_START'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_END_FROM_END'], 'FROM_END'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_END_LAST'], 'LAST']
    ];
    this.setHelpUrl(Blockly.Msg['TEXT_GET_SUBSTRING_HELPURL']);
    this.setStyle('text_blocks');
    this.appendValueInput('STRING')
      .setCheck('String')
      .appendField(Blockly.Msg['TEXT_GET_SUBSTRING_INPUT_IN_TEXT']);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    if (Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']) {
      this.appendDummyInput('TAIL')
        .appendField(Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']);
    }
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg['TEXT_GET_SUBSTRING_TOOLTIP']);
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
    // Move tail, if present, to end of block.
    if (n == 2 && Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
        .appendField(Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']);
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
        return undefined;
      });

    this.getInput('AT' + n)
      .appendField(menu, 'WHERE' + n);
    /**
     * WAITING GOOGLE ISSUE (dropdown colour)
     */
    this.setStyle("text_blocks");
    /**
     * END
     */
    if (n == 1) {
      this.moveInputBefore('AT1', 'AT2');
      if (this.getInput('ORDINAL1')) {
        this.moveInputBefore('ORDINAL1', 'AT2');
      }
    }
  }
};

Blockly.Constants.Text = Object.create(null);

/**
 * Wraps TEXT field with images of double quote characters.
 * @this {Blockly.Block}
 */
Blockly.Constants.Text.TEXT_QUOTES_EXTENSION = function () {
  this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
  this.quoteField_('TEXT');
};

/**
 * @mixin
 * @package
 * @readonly
 */
Blockly.Constants.Text.QUOTE_IMAGE_MIXIN = {
  /**
   * Image data URI of an LTR opening double quote (same as RTL closing double quote).
   * @readonly
   */
  QUOTE_IMAGE_LEFT_DATAURI:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
    'n0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY' +
    '1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1' +
    'HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMf' +
    'z9AylsaRRgGzvZAAAAAElFTkSuQmCC',
  /**
   * Image data URI of an LTR closing double quote (same as RTL opening double quote).
   * @readonly
   */
  QUOTE_IMAGE_RIGHT_DATAURI:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
    'qUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhg' +
    'gONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvB' +
    'O3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5Aos' +
    'lLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==',
  /**
   * Pixel width of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   * @readonly
   */
  QUOTE_IMAGE_WIDTH: 12,
  /**
   * Pixel height of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   * @readonly
   */
  QUOTE_IMAGE_HEIGHT: 12,
  /**
   * Inserts appropriate quote images before and after the named field.
   * @param {string} fieldName The name of the field to wrap with quotes.
   * @this {Blockly.Block}
   */
  quoteField_: function (fieldName) {
    for (var i = 0, input; (input = this.inputList[i]); i++) {
      for (var j = 0, field; (field = input.fieldRow[j]); j++) {
        if (fieldName == field.name) {
          input.insertFieldAt(j, this.newQuote_(true));
          input.insertFieldAt(j + 2, this.newQuote_(false));
          return;
        }
      }
    }
    console.warn('field named "' + fieldName + '" not found in ' + this.toDevString());
  },
  /**
   * A helper function that generates a FieldImage of an opening or
   * closing double quote. The selected quote will be adapted for RTL blocks.
   * @param {boolean} open If the image should be open quote (“ in LTR).
   *                       Otherwise, a closing quote is used (” in LTR).
   * @return {!Blockly.FieldImage} The new field.
   * @this {Blockly.Block}
   */
  newQuote_: function (open) {
    var isLeft = this.RTL ? !open : open;
    var dataUri = isLeft ?
      this.QUOTE_IMAGE_LEFT_DATAURI :
      this.QUOTE_IMAGE_RIGHT_DATAURI;
    return new Blockly.FieldImage(
      dataUri,
      this.QUOTE_IMAGE_WIDTH,
      this.QUOTE_IMAGE_HEIGHT,
      isLeft ? '\u201C' : '\u201D');
  }
};

/**
 * Performs final setup of a 'text_join' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Text.TEXT_JOIN_INIT_EXTENSION = function () {
  this.itemCount_ = 3;
  this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'text_join_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN = {
  /**
   * Create XML to represent number of text inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the text inputs.
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
  saveConnections: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
    }
  },
  storeValueConnections_: function () {
    this.valueConnections_ = [];
    for (var i = 0; i < this.itemCount_; i++) {
      this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
    }
  },
  restoreValueConnections_: function () {
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
    }
  },
  addItem_: function () {
    this.storeValueConnections_();
    var update = function () {
      this.itemCount_++;
    };
    this.update_(update);
    this.restoreValueConnections_();
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
    this.storeValueConnections_();
    var update = function () {
      this.itemCount_--;
    };
    this.update_(update);
    this.restoreValueConnections_();
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
      top.appendField(Blockly.Msg['TEXT_JOIN_TITLE_CREATEWITH']);
      top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
      if (this.itemCount_ > 1) {
        top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
      }
      for (var i = 0; i < this.itemCount_; i++) {
        this.appendValueInput('ADD' + i);
      }
    }
    /* Switch to vertical list when the list is too long */
    var showHorizontalList = this.itemCount_ <= 5;
    this.setInputsInline(showHorizontalList);
    this.setOutputShape(showHorizontalList ?
      Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
  }
};

/**
 * Update the tooltip of 'text_indexOf' block to reference the variable.
 * @this {Blockly.Block}
 */
Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION = function () {
  this.setTooltip(function () {
    return Blockly.Msg['TEXT_INDEXOF_TOOLTIP'].replace('%1', '-1');
  });
};

/**
 * Mixin for mutator functions in the 'text_charAt_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN = {
  /**
   * Create XML to represent whether there is an 'AT' input.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('at', !!this.isAt_);
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
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT', true);
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck('Number');
      if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
        this.appendDummyInput('ORDINAL')
          .appendField(Blockly.Msg['ORDINAL_NUMBER_SUFFIX']);
      }
    }
    if (Blockly.Msg['TEXT_CHARAT_TAIL']) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
        .appendField(Blockly.Msg['TEXT_CHARAT_TAIL']);
    }
    this.isAt_ = isAt;
  }
};

/**
 * Does the initial mutator update of 'text_charAt' and adds the tooltip
 * @this {Blockly.Block}
 */
Blockly.Constants.Text.TEXT_CHARAT_EXTENSION = function () {
  var dropdown = this.getField('WHERE');
  dropdown.setValidator(function (value) {
    var newAt = (value == 'FROM_START') || (value == 'FROM_END');
    if (newAt != this.isAt_) {
      var block = this.getSourceBlock();
      block.updateAt_(newAt);
    }
  });
  this.updateAt_(true);
  // Assign 'this' to a variable for use in the tooltip closure below.
  var thisBlock = this;
  this.setTooltip(function () {
    var where = thisBlock.getFieldValue('WHERE');
    var tooltip = Blockly.Msg['TEXT_CHARAT_TOOLTIP'];
    if (where == 'FROM_START' || where == 'FROM_END') {
      var msg = (where == 'FROM_START') ?
        Blockly.Msg['LISTS_INDEX_FROM_START_TOOLTIP'] :
        Blockly.Msg['LISTS_INDEX_FROM_END_TOOLTIP'];
      if (msg) {
        tooltip += '  ' + msg.replace('%1',
          thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
      }
    }
    return tooltip;
  });
};

// Extensions
Blockly.Extensions.register('text_quotes',
  Blockly.Constants.Text.TEXT_QUOTES_EXTENSION);

Blockly.Extensions.register('text_join_init',
  Blockly.Constants.Text.TEXT_JOIN_INIT_EXTENSION);

Blockly.Extensions.register('text_append_tooltip',
  Blockly.Extensions.buildTooltipWithFieldText(
    '%{BKY_TEXT_APPEND_TOOLTIP}', 'VAR'));

Blockly.Extensions.register('text_indexOf_tooltip',
  Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION);

// Mutators
Blockly.Extensions.registerMutator('text_join_mutator',
  Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('text_charAt_mutator',
  Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN,
  Blockly.Constants.Text.TEXT_CHARAT_EXTENSION);
