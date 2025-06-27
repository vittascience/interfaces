/**
 * @fileoverview Text blocks for Blockly.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // Block for adding comment in code
  {
    "type": "text_comment",
    "style": "comment_block",
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
        "text": ""
      }
    ],
    "output": "String",
    "style": "text_blocks",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
    "extensions": ["text_quotes"]
  },

  // Block for joining text items
  {
    "type": "text_join",
    "output": "String",
    "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
    "style": "text_blocks",
    "helpUrl": "%{BKY_TEXT_JOIN_HELPURL}",
    "tooltip": "%{BKY_TEXT_JOIN_TOOLTIP}",
    "extensions": [
      "block_buttons_plus_minus", 
      "text_join_init"
    ],
    "mutator": "text_join_mutator"
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
      "text_append_tooltip",
      "field_variable_type_getter"
    ]
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
    "previousStatement": null,
    "nextStatement": null,
    "style": "text_blocks",
    "tooltip": "%{BKY_TEXT_CHANGECASE_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_CHANGECASE_HELPURL}"
  }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Text = Object.create(null);

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
  quoteField_: function(fieldName) {
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
  newQuote_: function(open) {
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
 * Wraps TEXT field with images of double quote characters.
 * @this {Blockly.Block}
 */
Blockly.Constants.Text.TEXT_QUOTES_EXTENSION = function() {
  this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
  this.quoteField_('TEXT');
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
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function(containerBlock) {
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
  storeValueConnections_: function() {
    this.valueConnections_ = [];
    for (var i = 0; i < this.itemCount_; i++) {
      this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
    }
  },
  restoreValueConnections_: function() {
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
    }
  },
  addItem_: function() {
    this.storeValueConnections_();
    var update = function() {
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
  removeItem_: function() {
    this.storeValueConnections_();
    var update = function() {
      this.itemCount_--;
    };
    this.update_(update);
    this.restoreValueConnections_();
  },
  update_: function(update) {
    return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function() {
    var that = this;
    var remove = function() {
      that.removeItem_();
    };
    var add = function() {
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
 * Performs final setup of a 'text_join' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Text.TEXT_JOIN_INIT_EXTENSION = function() {
  this.itemCount_ = 3;
  this.updateShape_();
};

// Extensions
Blockly.Extensions.register('text_quotes',
  Blockly.Constants.Text.TEXT_QUOTES_EXTENSION);

Blockly.Extensions.register('text_join_init',
  Blockly.Constants.Text.TEXT_JOIN_INIT_EXTENSION);

Blockly.Extensions.register('text_append_tooltip',
  Blockly.Extensions.buildTooltipWithFieldText(
    '%{BKY_TEXT_APPEND_TOOLTIP}', 'VAR'));

// Mutators
Blockly.Extensions.registerMutator('text_join_mutator',
  Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN);