/**
 * @fileoverview Dictionaries blocks for Python.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

  // Block for creating an empty dict
  {
    "type": "dictionaries_create_empty",
    "message0": "%{BKY_DICTIONARIES_CREATE_EMPTY_TITLE}",
    "output": "Dictionary",
    "inputsInline": true,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_CREATE_EMPTY_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  // Block for creating an full dict
  {
    "type": "dictionaries_create_with",
    "message0": "%{BKY_DICTIONARIES_CREATE_WITH_TITLE}",
    "output": "Dictionary",
    "inputsInline": true,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_CREATE_EMPTY_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_buttons_plus_minus",
      "dictionaries_create_with_init"
    ],
    "mutator": "dictionaries_create_with_mutator"
  },
  {
    "type": "dictionaries_from_list",
    "message0": "%{BKY_DICTIONARIES_FROM_LIST_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": "Dictionary",
    "inputsInline": true,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_FROM_LIST_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  {
    "type": "dictionaries_length",
    "message0": "%{BKY_DICTIONARIES_LENGTH_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dictionary"
      }
    ],
    "output": "Number",
    "inputsInline": true,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_LENGTH_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  {
    "type": "dictionaries_get_item",
    "message0": "%{BKY_DICTIONARIES_GET_ITEM_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dictionary"
      },
      {
        "type": "input_value",
        "name": "KEY"
      }
    ],
    "output": "Item",
    "inputsInline": true,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_GET_ITEM_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  {
    "type": "dictionaries_update_item",
    "message0": "%{BKY_DICTIONARIES_UPDATE_ITEM_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dictionary"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "input_value",
        "name": "KEY"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_GET_ITEM_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  {
    "type": "dictionaries_include",
    "message0": "%{BKY_DICTIONARIES_INCLUDE_TITLE}",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "ITEM",
        "options": [
          ["%{BKY_DICTIONARIES_INCLUDE_KEY}", "KEY"],
          ["%{BKY_DICTIONARIES_INCLUDE_VALUE}", "VALUE"],
        ]
      },
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "field_grid_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_DICTIONARIES_INCLUDE_IN}", "IN"],
          ["%{BKY_DICTIONARIES_INCLUDE_NOT}", "NOT"],
        ]
      },
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dictionary"
      }
    ],
    "output": "Boolean",
    "inputsInline": true,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_INCLUDE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  {
    "type": "dictionaries_add_tuple",
    "message0": "%{BKY_DICTIONARIES_ADD_TUPLE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dictionary"
      },
      {
        "type": "input_value",
        "name": "KEY"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_ADD_TUPLE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  {
    "type": "dictionaries_delete_tuple",
    "message0": "%{BKY_DICTIONARIES_DELETE_TUPLE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dictionary"
      },
      {
        "type": "input_value",
        "name": "KEY"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_DELETE_TUPLE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  {
    "type": "dictionaries_clear",
    "message0": "%{BKY_DICTIONARIES_CLEAR_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_CLEAR_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  {
    "type": "dictionaries_loop",
    "message0": "%{BKY_DICTIONARIES_LOOP_TITLE}",
    "args0": [
      {
        "type": "field_grid_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_DICTIONARIES_LOOP_KEY}", "KEY"],
          ["%{BKY_DICTIONARIES_LOOP_VALUE}", "VALUE"],
          ["%{BKY_DICTIONARIES_LOOP_TUPLE}", "TUPLE"]
        ]
      },
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": null
      },
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dictionary"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "dictionaries_blocks",
    "tooltip": "%{BKY_DICTIONARIES_LOOP_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  }
]);

Blockly.Constants.DICTIONARIES = Object.create(null);

/**
 * Performs final setup of 'dictionaries_create_with' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.DICTIONARIES.DICTIONARIES_CREATE_WITH_INIT_EXTENSION = function () {
  this.itemCount_ = 1;
  this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'dictionaries_create_with_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.DICTIONARIES.DICTIONARIES_CREATE_WITH_MUTATOR_MIXIN = {
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
      this.valueConnections_.push(this.getInput('KEY' + i).connection.targetConnection);
      this.valueConnections_.push(this.getInput('VAL' + i).connection.targetConnection);
    }
  },
  restoreConnections_: function () {
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(this.valueConnections_[2 * i], this, 'KEY' + i);
      Blockly.Mutator.reconnect(this.valueConnections_[2 * i + 1], this, 'VAL' + i);
    }
  },
  addItem_: function () {
    this.storeConnections_();
    var update = function () {
      this.itemCount_++;
    };
    this.update_(update);
    this.updateShape_();
    this.restoreConnections_();
  },
  removeItem_: function () {
    this.storeConnections_();
    var update = function () {
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
    var that = this;
    // Remove all inputs
    let i = 0;
    while (this.getInput('KEY' + i)) {
      this.removeInput('KEY' + i);
      this.removeInput('VAL' + i);
      i++;
    }
    if (this.getInput('BUTTONS'))
      this.removeInput('BUTTONS')
    if (this.getInput('BUTTONSbis'))
      this.removeInput('BUTTONSbis')

    // Update inputs
    for (let i = 0; i < this.itemCount_; i++) {
      this.appendValueInput('KEY' + i).appendField("Key");
      this.appendValueInput('VAL' + i).appendField("Val");
    }
    if (this.itemCount_ > 1)
      this.appendDummyInput('BUTTONSbis')
        .appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", that.removeItem_.bind(that), false));

    this.appendDummyInput('BUTTONS')
      .appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", that.addItem_.bind(that), false));

    /* Switch to vertical list when the list is too long */
    var showHorizontalList = this.itemCount_ <= 3;
    this.setInputsInline(showHorizontalList);
    this.setOutputShape(showHorizontalList ?
      Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
  }
};

// Extensions
Blockly.Extensions.register("dictionaries_create_with_init",
  Blockly.Constants.DICTIONARIES.DICTIONARIES_CREATE_WITH_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('dictionaries_create_with_mutator',
  Blockly.Constants.DICTIONARIES.DICTIONARIES_CREATE_WITH_MUTATOR_MIXIN);