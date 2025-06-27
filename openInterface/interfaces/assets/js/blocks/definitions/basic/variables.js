/**
 * @fileoverview Variable blocks for Blockly.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // Block for variable getter.
  {
    "type": "variables_get",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      }
    ],
    "output": null,
    "style": "variable_blocks",
    "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
    "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
    "extensions": [
      "contextMenu_variableSetterGetter"
    ]
  },

  // Block for variable setter.
  {
    "type": "variables_set",
    "message0": "%{BKY_VARIABLES_SET}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_blocks",
    "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
    "extensions": [
      "contextMenu_variableSetterGetter",
    ]
  },

  {
    "type": "variables_set_tuple",
    "message0": "affecter la valeur %1 à",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_blocks",
    "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
    "mutator": "variable_set_tuple_mutator",
    "extensions": [
      "block_buttons_plus_minus"
    ]
  },

  // Block for adding to a variable in place.
  {
    "type": "variables_increment",
    "message0": "%{BKY_VARIABLES_INCREMENT_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      },
      {
        "type": "input_value",
        "name": "DELTA",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_blocks",
    "helpUrl": "%{BKY_VARIABLES_INCREMENT_HELPURL}"
  },

  // Block for forcing a variable to an other type
  {
    "type": "variables_force_type",
    "message0": "%{BKY_VARIABLES_FORCE_TYPE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "field_grid_dropdown",
        "name": "TYPE",
        "options": [
          ["%{BKY_VARIABLES_FORCE_TYPE_INTEGER}", "int"],
          ["%{BKY_VARIABLES_FORCE_TYPE_FLOAT}", "float"],
          ["%{BKY_VARIABLES_FORCE_TYPE_TEXT}", "str"],
          ["%{BKY_VARIABLES_FORCE_TYPE_BOOLEAN}", "bool"],
          ["%{BKY_VARIABLES_FORCE_TYPE_LONG}", "long"]
        ]
      }
    ],
    "output": null,
    "inputsInline": true,
    "style": "variable_blocks",
    "tooltip": "%{BKY_VARIABLES_FORCE_TYPE_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_FORCE_TYPE_HELPURL}",
    "extensions": ["variables_force_type_get_type"]
  },

  // Block for adding to a variable in place.
  {
    "type": "variables_type_of",
    "message0": "%{BKY_VARIABLES_TYPEOF_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      }
    ],
    "output": null,
    "style": "variable_blocks",
    "tooltip": "%{BKY_VARIABLES_TYPEOF_TOOLTIP}"
  },

  // Block for adding to a variable in place.
  {
    "type": "variables_tuple",
    "message0": "%{BKY_VARIABLES_TUPLE_TITLE}",
    "output": null,
    "style": "variable_blocks",
    "extensions": [
      "block_buttons_plus_minus"
    ],
    "mutator": "variable_tuple_mutator",
    "tooltip": "%{BKY_VARIABLES_TUPLE_TOOLTIP}"
  },

  // Block for global variable.
  {
    "type": "variables_global",
    "message0": "%{BKY_VARIABLES_GLOBAL}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_blocks",
    "tooltip": "%{BKY_VARIABLES_GLOBAL_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_GLOBAL_HELPURL}",
  }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Variables = Object.create(null);

/**
 * Mixin to add context menu items to create getter/setter blocks for this
 * setter/getter.
 * Used by blocks 'variables_set' and 'variables_get'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this {Blockly.Block}
   */
  customContextMenu: function (options) {
    if (!this.isInFlyout) {
      // Getter blocks have the option to create a setter block, and vice versa.
      if (this.type == 'variables_get') {
        var opposite_type = 'variables_set';
        var contextMenuMsg = Blockly.Msg['VARIABLES_GET_CREATE_SET'];
      } else {
        var opposite_type = 'variables_get';
        var contextMenuMsg = Blockly.Msg['VARIABLES_SET_CREATE_GET'];
      }
      var option = {
        enabled: this.workspace.remainingCapacity() > 0
      };
      var name = this.getField('VAR').getText();
      option.text = contextMenuMsg.replace('%1', name);
      var xmlField = Blockly.utils.xml.createElement('field');
      xmlField.setAttribute('name', 'VAR');
      xmlField.appendChild(Blockly.utils.xml.createTextNode(name));
      var xmlBlock = Blockly.utils.xml.createElement('block');
      xmlBlock.setAttribute('type', opposite_type);
      xmlBlock.appendChild(xmlField);
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
      // Getter blocks have the option to rename or delete that variable.
    } else {
      if (this.type == 'variables_get' || this.type == 'variables_get_reporter') {
        var renameOption = {
          text: Blockly.Msg.RENAME_VARIABLE,
          enabled: true,
          callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
        };
        var name = this.getField('VAR').getText();
        var deleteOption = {
          text: Blockly.Msg.DELETE_VARIABLE.replace('%1', name),
          enabled: true,
          callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
        };
        options.unshift(renameOption);
        options.unshift(deleteOption);
      }
    }
  }
};

/**
 * Callback for rename variable dropdown menu option associated with a
 * variable getter block.
 * @param {!Blockly.Block} block The block with the variable to rename.
 * @return {!function()} A function that renames the variable.
 */
Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY = function (block) {
  return function () {
    var workspace = block.workspace;
    var variable = block.getField('VAR').getVariable();
    Blockly.Variables.renameVariable(workspace, variable);
  };
};

/**
 * Callback for delete variable dropdown menu option associated with a
 * variable getter block.
 * @param {!Blockly.Block} block The block with the variable to delete.
 * @return {!function()} A function that deletes the variable.
 */
Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY = function (block) {
  return function () {
    var workspace = block.workspace;
    var variable = block.getField('VAR').getVariable();
    workspace.deleteVariableById(variable.getId());
    workspace.refreshToolboxSelection();
  };
};

Blockly.Constants.Variables.VARIABLES_FORCE_TYPE_GET_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} variables_force_type
   */
  getBlockType: function () {
    var type = this.getFieldValue("TYPE");
    switch (type) {
      case "int":
        return Blockly.Types.NUMBER;
      case "float":
        return Blockly.Types.NUMBER;
      case "str":
        return Blockly.Types.TEXT;
      case "bool":
        return Blockly.Types.BOOLEAN;
      case "long":
        return Blockly.Types.NUMBER;
      default:
        return Blockly.Types.NUMBER;
    }
  }
};

Blockly.Constants.Variables.VARIABLES_SET_TUPLE_MUTATOR_MIXIN = {
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
      this.valueConnections_.push(this.getInput('ITEM' + i).connection.targetConnection);
    }
  },
  restoreConnections_: function () {
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ITEM' + i);
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
    if (this.itemCount_ > 0) {
      // Find shadow type
      var firstInput = this.getInput('ITEM' + 0);
      if (firstInput && firstInput.connection.targetConnection) {
        // Create a new shadow DOM with the same type as the first input
        // but with an empty default value
        var newInput = this.getInput('ITEM' + (this.itemCount_ - 1));
        var shadowInputDom = firstInput.connection.getShadowDom();
        if (shadowInputDom) {
          var shadowDom = Blockly.utils.xml.createElement('shadow');
          shadowDom.setAttribute('type', "field_variable");
          var shadowDomField = Blockly.utils.xml.createElement('field');

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
    this.itemCount_ = this.itemCount_ || 1;

    // Remove all inputs
    if (this.getInput('TOP')) this.removeInput('TOP');
    var i = 0;
    while (this.getInput('ITEM' + i)) {
      this.removeInput('ITEM' + i);
      i++;
    }
    // Update inputs
    var top = this.appendDummyInput('TOP');
    if (this.itemCount_ > 0) {
      top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
      top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
      for (var i = 0; i < this.itemCount_; i++) {
        this.appendValueInput('ITEM' + i);
      }
    }
    // Case of empty list
    else {
      top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
    }
    /* Switch to vertical list when the list is too long */
    var showHorizontalList = this.itemCount_ <= 5;
    this.setInputsInline(showHorizontalList);
    this.setOutputShape(showHorizontalList ?
      Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
  }
}

Blockly.Constants.Variables.VARIABLES_TUPLE_MUTATOR_MIXIN = {
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
      this.valueConnections_.push(this.getInput('ITEM' + i).connection.targetConnection);
    }
  },
  restoreConnections_: function () {
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ITEM' + i);
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
    if (this.itemCount_ > 0) {
      // Find shadow type
      var firstInput = this.getInput('ITEM' + 0);
      if (firstInput && firstInput.connection.targetConnection) {
        // Create a new shadow DOM with the same type as the first input
        // but with an empty default value
        var newInput = this.getInput('ITEM' + (this.itemCount_ - 1));
        var shadowInputDom = firstInput.connection.getShadowDom();
        if (shadowInputDom) {
          var shadowDom = Blockly.utils.xml.createElement('shadow');
          shadowDom.setAttribute('type',);
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
    this.itemCount_ = this.itemCount_ || 1;

    // Remove all inputs
    if (this.getInput('TOP')) this.removeInput('TOP');
    var i = 0;
    while (this.getInput('ITEM' + i)) {
      this.removeInput('ITEM' + i);
      i++;
    }
    // Update inputs
    var top = this.appendDummyInput('TOP');
    if (this.itemCount_ > 0) {
      top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
      top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
      for (var i = 0; i < this.itemCount_; i++) {
        this.appendValueInput('ITEM' + i);
      }
    }
    // Case of empty list
    else {
      top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
    }
    /* Switch to vertical list when the list is too long */
    var showHorizontalList = this.itemCount_ <= 5;
    this.setInputsInline(showHorizontalList);
    this.setOutputShape(showHorizontalList ?
      Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
  }
}

// Mixin functions
Blockly.Extensions.registerMixin('contextMenu_variableSetterGetter',
  Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);

Blockly.Extensions.registerMixin("variables_force_type_get_type",
  Blockly.Constants.Variables.VARIABLES_FORCE_TYPE_GET_TYPE);

Blockly.Extensions.registerMutator('variable_set_tuple_mutator',
  Blockly.Constants.Variables.VARIABLES_SET_TUPLE_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('variable_tuple_mutator',
  Blockly.Constants.Variables.VARIABLES_TUPLE_MUTATOR_MIXIN);
