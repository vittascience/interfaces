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
      "contextMenu_variableSetterGetter",
      "variables_get_get_type"
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
      "variables_set_get_type"
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
        "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
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
          ["%{BKY_VARIABLES_FORCE_TYPE_CHAR}", "CHARACTER"],
          ["%{BKY_VARIABLES_FORCE_TYPE_TEXT}", "TEXT"],
          ["%{BKY_VARIABLES_FORCE_TYPE_BOOLEAN}", "BOOLEAN"],
          ["%{BKY_VARIABLES_FORCE_TYPE_INTEGER}", "NUMBER"],
          ["%{BKY_VARIABLES_FORCE_TYPE_FLOAT}", "DECIMAL"],
          ["%{BKY_VARIABLES_FORCE_TYPE_SHORT}", "SHORT_NUMBER"],
          ["%{BKY_VARIABLES_FORCE_TYPE_LONG}", "LARGE_NUMBER"]
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
    "output": "String",
    "style": "variable_blocks",
    "tooltip": "%{BKY_VARIABLES_TYPEOF_TOOLTIP}"
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
  customContextMenu: function(options) {
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
Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY = function(block) {
  return function() {
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
Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY = function(block) {
  return function() {
    var workspace = block.workspace;
    var variable = block.getField('VAR').getVariable();
    workspace.deleteVariableById(variable.getId());
    workspace.refreshToolboxSelection();
  };
};

/**
 * VITTAWARNING - added for getting type of variables blocks
 */

Blockly.Constants.Variables.VARIABLES_SET_GET_TYPE = {
  /**
   * @return {String} variable name
   * @this {Blockly.Block} variables_set
   */
  getVarName: function() {
    return this.workspace.getVariableById(this.getFieldValue('VAR')).name;
  },
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} variables_set
   */
  getVarType: function() {
    var child = this.inputList[0].connection.targetBlock(),
        typeCheck = Blockly.Types.CHILD_BLOCK_MISSING;
    //Case variables_set has a child and is not a a recursive variable
    if (child) {
      return Blockly.Types.getChildBlockType(child);
    }
    return typeCheck;
  }
};

Blockly.Constants.Variables.VARIABLES_GET_GET_TYPE = {
  /**
   * @return {String} variable name
   * @this {Blockly.Block} variables_get
   */
  getVarName: function() {
    return this.workspace.getVariableById(this.getFieldValue('VAR')).name;
  },
  /**
   * @return {Blockly.Type} typeCheck
   * @this {Blockly.Block} variables_get
   */
  getBlockType: function() {
    var typeCheck = Blockly.Types.CHILD_BLOCK_MISSING,
        varName = this.getVarName(),
        funcArg = Blockly.StaticTyping.getProcedureVarType(this.workspace, varName);
    if (funcArg) return funcArg;
    else {
      var blocks = Blockly.StaticTyping.getAllStatementsOrdered(this.workspace);
      var var_setters = [];
      for (var i = 0; i < blocks.length; i++) {
        var getVarType = blocks[i].getVarType;
        if (getVarType) {
          if (blocks[i].getVarName() == varName) {
            var_setters.push(blocks[i])
          }
        }
      }
      var blockDB = this.workspace.blockDB_;
      var var_getters = [];
      for (block in blockDB) {
        if (blockDB[block].type == 'variables_get') {
          if (blockDB[block].getVarName() == varName) {
            var_getters.push(blockDB[block])
          }
        }
      }
      var recursiveParentIdSetters = []
      for (var i = 0; i < var_getters.length; i++) {
        var recursiveParentId = this.isRecursiveVariable(var_getters[i]);
        recursiveParentIdSetters.push(recursiveParentId);
      }
      for (var i = 0; i < var_setters.length; i++) {
        // Go to next 'variable_set' block for getting type case is recursive variable
        for (var j = 0; j < recursiveParentIdSetters.length; j++) {
          if (var_setters[i] && var_setters[i].id == recursiveParentIdSetters[j]) {
            var_setters.splice(i, 1)
          }
        }
      }
      if (var_setters[0]) typeCheck = Blockly.Types.getChildBlockType(var_setters[0]);
    }
    return typeCheck;
  },
  /**
   * The block 'variables_get' is looking for its name in its parent blocks
   * @return {Blockly.Block{id}} IdParent
   * @this {Blockly.Block} variables_get
   */
  isRecursiveVariable: function(variableGetter) {
    var hasParent = true,
        parent = variableGetter.getParent(),
        IdParent = null;
    while (hasParent) {
      if(parent) {
        if (parent.type != 'variables_set') {
          if (parent.outputConnection) {
            parent = parent.getParent();
          } else hasParent = false;
        } else {
          if (parent.type == 'variables_set') {
            if (parent.getVarName() == variableGetter.getVarName()) {
              hasParent = false;
              IdParent = parent.id;
            } else hasParent = false; 
          } else hasParent = false;
        }
      } else hasParent = false;
    }
    return IdParent;
  }
};

Blockly.Constants.Variables.VARIABLES_FORCE_TYPE_GET_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} variables_force_type
   */
  getBlockType: function() {
    var type = this.getFieldValue("TYPE");
    return Blockly.Types[type]
  }
};

/**
 * END VITTAWARNING
 */

// Mixin functions
Blockly.Extensions.registerMixin('contextMenu_variableSetterGetter',
  Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);

Blockly.Extensions.registerMixin("variables_set_get_type",
  Blockly.Constants.Variables.VARIABLES_SET_GET_TYPE);

Blockly.Extensions.registerMixin("variables_get_get_type",
  Blockly.Constants.Variables.VARIABLES_GET_GET_TYPE);

Blockly.Extensions.registerMixin("variables_force_type_get_type",
  Blockly.Constants.Variables.VARIABLES_FORCE_TYPE_GET_TYPE);
