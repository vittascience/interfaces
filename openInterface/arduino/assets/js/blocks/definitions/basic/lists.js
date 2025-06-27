/**
 * @fileoverview List blocks for Blockly.
 */
Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // Block for creating a list with items
  {
    "type": "lists_create_with",
    "output": "Array",
    "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
    "style": "list_blocks",
    "helpUrl": "%{BKY_LISTS_CREATE_WITH_HELPURL}",
    "tooltip": "%{BKY_LISTS_CREATE_WITH_TOOLTIP}",
    "extensions": [
      "block_buttons_plus_minus",
      "lists_create_with_init",
      "lists_create_with_get_type"
    ],
    "mutator": "lists_create_with_mutator"
  },

  // Block for creating a list with one element repeated.
  {
    "type": "lists_repeat",
    "message0": "%{BKY_LISTS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "ITEM"
    },
    {
      "type": "input_value",
      "name": "NUM",
      "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
    }
    ],
    "output": "Array",
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_REPEAT_HELPURL}",
    "extensions": ["lists_repeat_get_type"]
  },

  // Block for getting list length
  {
    "type": "lists_length",
    "message0": "%{BKY_LISTS_LENGTH_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "LIST",
      "check": ["String", "Array"]
    }],
    "output": "Number",
    "style": "list_blocks",
    "tooltip": "%{BKY_LISTS_LENGTH_TOOLTIP}",
    "helpUrl": "%{BKY_LISTS_LENGTH_HELPURL}"
  },

  // // Block for setting list items
  // {
  //   "type": "lists_setIndex",
  //   "message0": "%{BKY_LISTS_SET_INDEX_TITLE}",
  //   "args0": [{
  //     "type": "input_value",
  //     "name": "LIST",
  //     "check": ["String", "Array"]
  //   }],
  //   "output": "Number",
  //   "style": "list_blocks",
  //   "tooltip": "%{BKY_LISTS_LENGTH_TOOLTIP}",
  //   "helpUrl": "%{BKY_LISTS_LENGTH_HELPURL}"
  // }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['lists_getIndex'] = {
  init: function () {
    this.WHERE_OPTIONS = [
      [Blockly.Msg['LISTS_GET_INDEX_FROM_START'], 'FROM_START'],
      [Blockly.Msg['LISTS_GET_INDEX_FROM_END'], 'FROM_END'],
      [Blockly.Msg['LISTS_GET_INDEX_FIRST'], 'FIRST'],
      [Blockly.Msg['LISTS_GET_INDEX_LAST'], 'LAST'],
      [Blockly.Msg['LISTS_GET_INDEX_RANDOM'], 'RANDOM']
    ];
    this.setStyle('list_blocks');
    this.appendValueInput("LIST").setCheck('Array').appendField(Blockly.Msg['LISTS_GET_INDEX_INPUT_IN_LIST']);
    this.appendDummyInput().appendField(Blockly.Msg['LISTS_GET_INDEX_GET']);
    this.appendDummyInput('AT');
    this.setInputsInline(true);
    this.setOutput(true);
    this.updateAt_(true);
    var thisBlock = this;
    this.setTooltip(function () {
      switch (thisBlock.getFieldValue('WHERE')) {
        case 'FROM_START':
          return Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_FROM'];
        case 'FROM_END':
          return Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_FROM_END'];
        case 'FIRST':
          return Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_FIRST'];
        case 'LAST':
          return Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_LAST'];
        case 'RANDOM':
          return Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_RANDOM'];
      }
      return ""
    });
  },
  /**
   * Create XML to represent whether the block is a statement or a value.
   * Also represent whether there is an 'AT' input.
   * @return {Element} XML storage element.
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
    /**
     * WAITING GOOGLE ISSUE (dropdown colour)
     */
    this.setStyle("list_blocks");
    /**
     * END
     */
  },
  /**
   * Get type of the input list
   * @public
   * @return {Blockly.Type} type
   * @this {Blockly.Block} lists_getIndex
   */
  getBlockType: function () {
    let varList = this.getInput('LIST').connection.targetBlock();
    if (varList) {
      return Blockly.Types.getChildBlockType(varList);
    }
    return Blockly.Types.CHILD_BLOCK_MISSING;
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

// Blockly.Blocks['lists_setIndex'] = {
//   /**
//    * Block for setting the element at index.
//    * @this {Blockly.Block}
//    */
//   init: function() {
//     var MODE =
//         [
//           [Blockly.Msg['LISTS_SET_INDEX_SET'], 'SET'],
//           [Blockly.Msg['LISTS_SET_INDEX_INSERT'], 'INSERT']
//         ];
//     this.WHERE_OPTIONS =
//         [
//           [Blockly.Msg['LISTS_GET_INDEX_FROM_START'], 'FROM_START'],
//           [Blockly.Msg['LISTS_GET_INDEX_FROM_END'], 'FROM_END'],
//           [Blockly.Msg['LISTS_GET_INDEX_FIRST'], 'FIRST'],
//           [Blockly.Msg['LISTS_GET_INDEX_LAST'], 'LAST'],
//           [Blockly.Msg['LISTS_GET_INDEX_RANDOM'], 'RANDOM']
//         ];
//     this.setHelpUrl(Blockly.Msg['LISTS_SET_INDEX_HELPURL']);
//     this.setStyle('list_blocks');
//     this.appendValueInput('LIST')
//         .setCheck('Array')
//         .appendField(Blockly.Msg['LISTS_SET_INDEX_INPUT_IN_LIST']);
//     this.appendDummyInput()
//         .appendField(new Blockly.FieldDropdown(MODE), 'MODE')
//         .appendField('', 'SPACE');
//     this.appendDummyInput('AT');
//     this.appendValueInput('TO')
//         .appendField(Blockly.Msg['LISTS_SET_INDEX_INPUT_TO']);
//     this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setTooltip(Blockly.Msg['LISTS_SET_INDEX_TOOLTIP']);
//     this.updateAt_(true);
//     // Assign 'this' to a variable for use in the tooltip closure below.
//     var thisBlock = this;
//     this.setTooltip(function() {
//       //var mode = thisBlock.getFieldValue('MODE');
//       var where = thisBlock.getFieldValue('WHERE');
//       var tooltip = '';
//       switch ('SER ' + where) {
//         case 'SET FROM_START':
//         case 'SET FROM_END':
//           tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_FROM'];
//           break;
//         case 'SET FIRST':
//           tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_FIRST'];
//           break;
//         case 'SET LAST':
//           tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_LAST'];
//           break;
//         case 'SET RANDOM':
//           tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_RANDOM'];
//           break;
//         // case 'INSERT FROM_START':
//         // case 'INSERT FROM_END':
//         //   tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_FROM'];
//         //   break;
//         // case 'INSERT FIRST':
//         //   tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST'];
//         //   break;
//         // case 'INSERT LAST':
//         //   tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_LAST'];
//         //   break;
//         // case 'INSERT RANDOM':
//         //   tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM'];
//         //   break;
//       }
//       if (where == 'FROM_START' || where == 'FROM_END') {
//         tooltip += '  ' + Blockly.Msg['LISTS_INDEX_FROM_START_TOOLTIP']
//             .replace('%1',
//                 thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
//       }
//       return tooltip;
//     });
//   },
//   /**
//    * Create XML to represent whether there is an 'AT' input.
//    * @return {!Element} XML storage element.
//    * @this {Blockly.Block}
//    */
//   mutationToDom: function() {
//     var container = Blockly.utils.xml.createElement('mutation');
//     var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
//     container.setAttribute('at', isAt);
//     return container;
//   },
//   /**
//    * Parse XML to restore the 'AT' input.
//    * @param {!Element} xmlElement XML storage element.
//    * @this {Blockly.Block}
//    */
//   domToMutation: function(xmlElement) {
//     // Note: Until January 2013 this block did not have mutations,
//     // so 'at' defaults to true.
//     var isAt = (xmlElement.getAttribute('at') != 'false');
//     this.updateAt_(isAt);
//   },
//   /**
//    * Create or delete an input for the numeric index.
//    * @param {boolean} isAt True if the input should exist.
//    * @private
//    * @this {Blockly.Block}
//    */
//   updateAt_: function(isAt) {
//     // Destroy old 'AT' and 'ORDINAL' input.
//     this.removeInput('AT');
//     this.removeInput('ORDINAL', true);
//     // Create either a value 'AT' input or a dummy input.
//     if (isAt) {
//       this.appendValueInput('AT').setCheck('Number');
//       if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
//         this.appendDummyInput('ORDINAL')
//             .appendField(Blockly.Msg['ORDINAL_NUMBER_SUFFIX']);
//       }
//     } else {
//       this.appendDummyInput('AT');
//     }
//     var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(value) {
//       var newAt = (value == 'FROM_START') || (value == 'FROM_END');
//       // The 'isAt' variable is available due to this function being a closure.
//       if (newAt != isAt) {
//         var block = this.getSourceBlock();
//         block.updateAt_(newAt);
//         // This menu has been destroyed and replaced.  Update the replacement.
//         block.setFieldValue(value, 'WHERE');
//         return null;
//       }
//       return undefined;
//     });
//     this.moveInputBefore('AT', 'TO');
//     if (this.getInput('ORDINAL')) {
//       this.moveInputBefore('ORDINAL', 'TO');
//     }

//     this.getInput('AT').appendField(menu, 'WHERE');
//   }
// };

/**
 * VITTAWARNING - added for getting type of block creating a list
 */

Blockly.Constants.Lists.LISTS_CREATE_WITH_GET_BLOCK_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} lists_create_with
   */
  getBlockType: function () {
    const input = this.getInput("ADD0");
    // Get type of first input item
    return typeof input !== 'undefined' && input !== null ? Blockly.Types.getChildBlockType(input.connection.targetBlock()) : Blockly.Types.CHILD_BLOCK_MISSING;
  }
};

Blockly.Constants.Lists.LISTS_REPEAT_GET_BLOCK_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} lists_repeat
   */
  getBlockType: function () {
    var itemBlock = this.getInput("ITEM").connection.targetBlock();
    if (itemBlock) {
      return Blockly.Types.getChildBlockType(itemBlock);
    }
    return Blockly.Types.CHILD_BLOCK_MISSING
  }
};

/**
 * END VITTAWARNING
 */

// LIST SET INDEX

// /**
//  * Performs final setup of 'lists_setIndex' blocks.
//  * @this {Blockly.Block}
//  */
// Blockly.Constants.Lists.LISTS_SET_INDEX_INIT_EXTENSION = function() {
//     this.WHERE_OPTIONS = [
//       [Blockly.Msg['LISTS_GET_INDEX_FROM_START'], 'FROM_START'],
//       [Blockly.Msg['LISTS_GET_INDEX_FROM_END'], 'FROM_END'],
//       [Blockly.Msg['LISTS_GET_INDEX_FIRST'], 'FIRST'],
//       [Blockly.Msg['LISTS_GET_INDEX_LAST'], 'LAST'],
//       [Blockly.Msg['LISTS_GET_INDEX_RANDOM'], 'RANDOM']
//     ];
//     var dropdown = this.getField("DATA");
//     dropdown.setValidator(function(value) {
//       var newTemp = (value == "TEMP");
//       if (newTemp != this.isTemp_) {
//         var block = this.getSourceBlock();
//         block.updateField_(newTemp);
//       }
//     });
//     var isTempInital = (this.getFieldValue("DATA") == "TEMP");
//     this.updateField_(isTempInital);
// };

// Initialization extensions
Blockly.Extensions.register("lists_create_with_init",
  Blockly.Constants.Lists.LISTS_CREATE_WITH_INIT_EXTENSION);

// Mixin functions  
Blockly.Extensions.registerMixin("lists_create_with_get_type",
  Blockly.Constants.Lists.LISTS_CREATE_WITH_GET_BLOCK_TYPE);

Blockly.Extensions.registerMixin("lists_repeat_get_type",
  Blockly.Constants.Lists.LISTS_REPEAT_GET_BLOCK_TYPE);

// Mutator
Blockly.Extensions.registerMutator('lists_create_with_mutator',
  Blockly.Constants.Lists.LISTS_CREATE_WITH_MUTATOR_MIXIN);

