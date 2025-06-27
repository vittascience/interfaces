/**
 * @fileoverview Procedures blocks for Blockly.
 */

Blockly.defineBlocksWithJsonArray([

  //block to define function without return
  {
    "type": "procedures_defnoreturn",
    "message0": "%{BKY_PROCEDURES_DEFNORETURN_TITLE} %1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": null
      },
      {
        "type": "input_dummy",
        "name": "TOP"
      },
    ],
    "message1": "%{BKY_PROCEDURES_DEFNORETURN_DO} %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "STACK"
      }
    ],
    "style": "procedure_blocks",
    "helpUrl": "%{BKY_PROCEDURES_DEFNORETURN_HELPURL}",
    "tooltip": "%{BKY_PROCEDURES_DEFNORETURN_TOOLTIP}",
    "extensions": [
      "block_buttons_plus_minus",
      "procedure_def_init",
      "get_procedure_def_no_return",
      "procedure_context_menu",
      "procedure_rename",
      "procedure_vars",
      "procedure_display_renamed"
    ],
    "mutator": "procedure_def_mutator"
  },

  // block to define function with return
  {
    "type": "procedures_defreturn",
    "message0": "%{BKY_PROCEDURES_DEFRETURN_TITLE} %1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": null
      },
      {
        "type": "input_dummy",
        "name": "TOP"
      },
    ],
    "message1": "%{BKY_PROCEDURES_DEFRETURN_DO} %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "STACK"
      }
    ],
    "message2": "%{BKY_PROCEDURES_DEFRETURN_RETURN} %1",
    "args2": [
      {
        "type": "input_value",
        "align": "right",
        "name": "RETURN"
      }
    ],
    "style": "procedure_blocks",
    "helpUrl": "%{BKY_PROCEDURES_DEFRETURN_HELPURL}",
    "tooltip": "%{BKY_PROCEDURES_DEFRETURN_TOOLTIP}",
    "extensions": [
      "block_buttons_plus_minus",
      "procedure_def_init",
      "get_procedure_def_return",
      "procedure_context_menu",
      "procedure_rename",
      "procedure_vars",
      "procedure_display_renamed",
      "procedure_def_return_get_type"
    ],
    "mutator": "procedure_def_mutator"
  },

  // to complete the block with blockly messages
  {
    "type": "procedures_simple_return",
    // "message0": "%{BKY_PROCEDURES_SIMPLE_RETURN}",
    "message0": "return %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "procedure_blocks",
    // "tooltip": "%{BKY_PROCEDURES_SIMPLE_RETURN_TOOLTIP}",
    "tooltip": "return",
    // "helpUrl": "%{BKY_PROCEDURES_SIMPLE_RETURN_HELPURL}"
    "helpUrl": "return"
  },

]);

Blockly.Blocks['procedures_callnoreturn'] = {
  /**
   * Block for calling a procedure with no return value.
   * @this {Blockly.Block}
   */
  init: function () {
    this.appendDummyInput('TOPROW')
      .appendField(this.id, 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle('procedure_blocks');
    // Tooltip is set in renameProcedure.
    this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL']);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    this.previousEnabledState_ = true;
  },

  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this {Blockly.Block}
   */
  getProcedureCall: function () {
    // The NAME field is guaranteed to exist, null will never be returned.
    return /** @type {string} */ (this.getFieldValue('NAME'));
  },
  /**
   * Notification that a procedure is renaming.
   * If the name matches this block's procedure, rename it.
   * @param {string} oldName Previous name of procedure.
   * @param {string} newName Renamed procedure.
   * @this {Blockly.Block}
   */
  renameProcedure: function (oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      var baseMsg = this.outputConnection ?
        Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP'] :
        Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
      this.setTooltip(baseMsg.replace('%1', newName));
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array.<string>} paramIds IDs of params (consistent for each
   *     parameter through the life of a mutator, regardless of param renaming),
   *     e.g. ['piua', 'f8b_', 'oi.o'].
   * @private
   * @this {Blockly.Block}
   */
  setProcedureParameters_: function (paramNames, paramIds) {
    // Data structures:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkIds_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
      this.workspace);
    var mutatorOpen = defBlock && defBlock.mutator &&
      defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      return;
    }
    // Test arguments (arrays of strings) for changes. '\n' is not a valid
    // argument name character, so it is a valid delimiter here.
    if (paramNames.join('\n') == this.arguments_.join('\n')) {
      // No change.
      this.quarkIds_ = paramIds;
      return;
    }
    if (paramIds.length != paramNames.length) {
      throw RangeError('paramNames and paramIds must be the same length.');
    }
    this.setCollapsed(false);
    if (!this.quarkIds_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      this.quarkIds_ = [];
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var i = 0; i < this.arguments_.length; i++) {
      var input = this.getInput('ARG' + i);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkIds_[i]] = connection;
        if (mutatorOpen && connection &&
          paramIds.indexOf(this.quarkIds_[i]) == -1) {
          // This connection should no longer be attached to this block.
          connection.disconnect();
          connection.getSourceBlock().bumpNeighbours();
        }
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    // And rebuild the argument model list.
    this.argumentVarModels_ = [];
    for (var i = 0; i < this.arguments_.length; i++) {
      var variable = Blockly.Variables.getOrCreateVariablePackage(
        this.workspace, null, this.arguments_[i], '');
      this.argumentVarModels_.push(variable);
    }

    this.updateShape_();
    this.quarkIds_ = paramIds;
    // Reconnect any child blocks.
    if (this.quarkIds_) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var quarkId = this.quarkIds_[i];
        if (quarkId in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkId];
          if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkId];
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function () {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField(Blockly.Msg['PROCEDURES_CALL_BEFORE_PARAMS'], 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('name', this.getProcedureCall());
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = Blockly.utils.xml.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.renameProcedure(this.getProcedureCall(), name);
    var args = [];
    var paramIds = [];
    for (var i = 0, childNode;
      (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        args.push(childNode.getAttribute('name'));
        paramIds.push(childNode.getAttribute('paramId'));
      }
    }
    this.setProcedureParameters_(args, paramIds);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<!Blockly.VariableModel>} List of variable models.
   * @this {Blockly.Block}
   */
  getVarModels: function () {
    return this.argumentVarModels_;
  },
  /**
   * Procedure calls cannot exist without the corresponding procedure
   * definition.  Enforce this link whenever an event is fired.
   * @param {!Blockly.Events.Abstract} event Change event.
   * @this {Blockly.Block}
   */
  onchange: function (event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (!event.recordUndo) {
      // Events not generated by user. Skip handling.
      return;
    }
    if (event.type == Blockly.Events.BLOCK_CREATE &&
      event.ids.indexOf(this.id) != -1) {
      // Look for the case where a procedure call was created (usually through
      // paste) and there is no matching definition.  In this case, create
      // an empty definition block with the correct signature.
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (def && (def.type != this.defType_ ||
        JSON.stringify(def.arguments_) != JSON.stringify(this.arguments_))) {
        // The signatures don't match.
        def = null;
      }
      if (!def) {
        Blockly.Events.setGroup(event.group);
        /**
         * Create matching definition block.
         * <xml xmlns="https://developers.google.com/blockly/xml">
         *   <block type="procedures_defreturn" x="10" y="20">
         *     <mutation name="test">
         *       <arg name="x"></arg>
         *     </mutation>
         *     <field name="NAME">test</field>
         *   </block>
         * </xml>
         */
        var xml = Blockly.utils.xml.createElement('xml');
        var block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', this.defType_);
        var xy = this.getRelativeToSurfaceXY();
        var x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
        var y = xy.y + Blockly.SNAP_RADIUS * 2;
        block.setAttribute('x', x);
        block.setAttribute('y', y);
        var mutation = this.mutationToDom();
        block.appendChild(mutation);
        var field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NAME');
        field.appendChild(Blockly.utils.xml.createTextNode(
          this.getProcedureCall()));
        block.appendChild(field);
        xml.appendChild(block);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.BLOCK_DELETE) {
      // Look for the case where a procedure definition has been deleted,
      // leaving this block (a procedure call) orphaned.  In this case, delete
      // the orphan.
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (!def) {
        Blockly.Events.setGroup(event.group);
        this.dispose(true);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type == Blockly.Events.CHANGE && event.element == 'disabled') {
      var name = this.getProcedureCall();
      var def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (def && def.id == event.blockId) {
        // in most cases the old group should be ''
        var oldGroup = Blockly.Events.getGroup();
        if (oldGroup) {
          // This should only be possible programatically and may indicate a problem
          // with event grouping. If you see this message please investigate. If the
          // use ends up being valid we may need to reorder events in the undo stack.
          console.log('Saw an existing group while responding to a definition change');
        }
        Blockly.Events.setGroup(event.group);
        if (event.newValue) {
          this.previousEnabledState_ = this.isEnabled();
          this.setEnabled(false);
        } else {
          this.setEnabled(this.previousEnabledState_);
        }
        Blockly.Events.setGroup(oldGroup);
      }
    }
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this {Blockly.Block}
   */
  customContextMenu: function (options) {
    if (!this.workspace.isMovable()) {
      // If we center on the block and the workspace isn't movable we could
      // loose blocks at the edges of the workspace.
      return;
    }

    var option = {
      enabled: true
    };
    option.text = Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'];
    var name = this.getProcedureCall();
    var workspace = this.workspace;
    option.callback = function () {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      if (def) {
        workspace.centerOnBlock(def.id);
        def.select();
      }
    };
    options.push(option);
  },
  defType_: 'procedures_defnoreturn'
};

Blockly.Blocks['procedures_callreturn'] = {
  /**
   * Block for calling a procedure with a return value.
   * @this {Blockly.Block}
   */
  init: function () {
    this.appendDummyInput('TOPROW')
      .appendField('', 'NAME');
    this.setOutput(true);
    this.setStyle('procedure_blocks');
    // Tooltip is set in domToMutation.
    this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLRETURN_HELPURL']);
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    this.previousEnabledState_ = true;
  },

  /**
   * VITTAWARNING _ added for getting type of block 'procedures_callreturn'
   */

  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block}
   */
  getBlockType: function () {
    var blocks = Blockly.StaticTyping.getAllStatementsOrdered(this.workspace);
    for (var i = 0; i < blocks.length; i++) {
      // searching if procedure call block correspond to procedure definition block
      if (blocks[i].type == "procedures_defreturn") {
        // if their names are same
        if (blocks[i].getFieldValue('NAME') == this.getFieldValue('NAME')) {
          return blocks[i].getReturnType();
        }
      }
    }
    return Blockly.Types.CHILD_BLOCK_MISSING;
  },

  /**
   * END VITTAWARNING
   */

  getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
  renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
  setProcedureParameters_: Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters_,
  updateShape_: Blockly.Blocks['procedures_callnoreturn'].updateShape_,
  mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
  getVarModels: Blockly.Blocks['procedures_callnoreturn'].getVarModels,
  onchange: Blockly.Blocks['procedures_callnoreturn'].onchange,
  customContextMenu: Blockly.Blocks['procedures_callnoreturn'].customContextMenu,
  defType_: 'procedures_defreturn'
};

Blockly.Blocks['procedures_ifreturn'] = {
  /**
   * Block for conditionally returning a value from a procedure.
   * @this {Blockly.Block}
   */
  init: function () {
    this.appendValueInput('CONDITION')
      .setCheck('Boolean')
      .appendField(Blockly.Msg['PROCEDURES_IFRETURN_TITLE']);
    this.appendValueInput('VALUE')
      .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle('procedure_blocks');
    this.setTooltip(Blockly.Msg['PROCEDURES_IFRETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_IFRETURN_HELPURL']);
    this.hasReturnValue_ = true;
  },
  /**
   * Create XML to represent whether this block has a return value.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('value', Number(this.hasReturnValue_));
    return container;
  },
  /**
   * Parse XML to restore whether this block has a return value.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    var value = xmlElement.getAttribute('value');
    this.hasReturnValue_ = (value == 1);
    if (!this.hasReturnValue_) {
      this.removeInput('VALUE');
      this.appendDummyInput('VALUE')
        .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
    }
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
    var legal = false;
    // Is the block nested in a procedure?
    var block = this;
    do {
      if (this.FUNCTION_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      // If needed, toggle whether this block has a return value.
      if (block.type == 'procedures_defnoreturn' && this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendDummyInput('VALUE')
          .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
        this.hasReturnValue_ = false;
      } else if (block.type == 'procedures_defreturn' &&
        !this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendValueInput('VALUE')
          .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
        this.hasReturnValue_ = true;
      }
      this.setWarningText(null);
      if (!this.isInFlyout) {
        this.setEnabled(true);
      }
    } else {
      this.setWarningText(Blockly.Msg['PROCEDURES_IFRETURN_WARNING']);
      if (!this.isInFlyout && !this.getInheritedDisabled()) {
        this.setEnabled(false);
      }
    }
  },
  /**
   * List of block types that are functions and thus do not need warnings.
   * To add a new function type add this to your code:
   * Blockly.Blocks['procedures_ifreturn'].FUNCTION_TYPES.push('custom_func');
   */
  FUNCTION_TYPES: ['procedures_defnoreturn', 'procedures_defreturn']
};

Blockly.Constants.Procedures = Object.create(null);

// Inserting field image plus at the top of block
Blockly.Constants.Procedures.PROCEDURE_DEF_INIT_EXTENSION = function () {
  var that = this;
  var addArg = function () {
    return function () {
      that.plus();
    };
  }();
  this.getInput('TOP')
    .appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
      this.buttonSize, this.buttonSize, "*", addArg, false));
};

Blockly.Constants.Procedures.PROCEDURE_GET_DEF_NO_RETURN_MIXIN = {
  getProcedureDef: function () {
    return [this.getFieldValue('NAME'), this.arguments_, false, this.argsTypes_];
  },
  callType_: 'procedures_callnoreturn'
};

Blockly.Constants.Procedures.PROCEDURE_GET_DEF_RETURN_MIXIN = {
  getProcedureDef: function () {
    return [this.getFieldValue('NAME'), this.arguments_, true, this.argsTypes_];
  },
  callType_: 'procedures_callreturn'
};

Blockly.Constants.Procedures.PROCEDURE_CONTEXT_MENU_MIXIN = {
  customContextMenu: function (options) {
    if (this.isInFlyout) {
      return;
    }
    // Add option to create caller.
    var option = {
      enabled: true
    };
    var name = this.getFieldValue('NAME');
    option.text = Blockly.Msg['PROCEDURES_CREATE_DO'].replace('%1', name);
    var xmlMutation = Blockly.utils.xml.createElement('mutation');
    xmlMutation.setAttribute('name', name);
    for (var i = 0; i < this.arguments_.length; i++) {
      var xmlArg = Blockly.utils.xml.createElement('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = Blockly.utils.xml.createElement('block');
    xmlBlock.setAttribute('type', this.callType_);
    xmlBlock.appendChild(xmlMutation);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (var i = 0; i < this.argumentVarModels_.length; i++) {
        var argOption = {
          enabled: true
        };
        var argVar = this.argumentVarModels_[i];
        argOption.text = Blockly.Msg['VARIABLES_SET_CREATE_GET']
          .replace('%1', argVar.name);

        var argXmlField = Blockly.Variables.generateVariableFieldDom(argVar);
        var argXmlBlock = Blockly.utils.xml.createElement('block');
        argXmlBlock.setAttribute('type', 'variables_get');
        argXmlBlock.appendChild(argXmlField);
        argOption.callback = Blockly.ContextMenu.callbackFactory(this, argXmlBlock);
        options.push(argOption);
      }
    }
  }
};

Blockly.Constants.Procedures.PROCEDURE_DISPLAY_RENAMED = {
  displayRenamedVar_: function (oldName, newName) {
    var index = this.arguments_.indexOf(newName);
    var id = this.paramIds_[index];
    this.setFieldValue(newName, id);
  }
};

/**
 * VITTAWARNING _ added for getting type of 'procedures_defreturn'
 */

Blockly.Constants.Procedures.PROCEDURE_DEF_RETURN_GET_TYPE = {
  /**
   * @return {Blockly.Type} type
   * @this {Blockly.Block} procedures_defreturn
   */
  getReturnType: function () {
    var typeCheck = Blockly.Types.NULL;
    if (this.childBlocks_) {
      var returnIndex = this.inputList.length - 1;
      var child = this.inputList[returnIndex].connection.targetBlock();
      // Case input 'RETURN' has child, else return 'void'
      if (child) {
        // Case it is not a recursive function, else return 'void'
        if (!this.isRecursiveFunction()) {
          typeCheck = Blockly.Types.getChildBlockType(child);
        }
      }
    }
    return typeCheck;
  },
  /**
   * The block 'procedures_def_return' is looking for its name in its child blocks
   * @return {boolean} recursiveFunction
   * @this {Blockly.Block} procedures_defreturn
   */
  isRecursiveFunction: function () {
    var currentFuncName = this.getProcedureDef()[0],
      childFuncName,
      recursiveFunction = false,
      parent = this,
      search = true,
      i = 0;
    while (search || i < 10) {
      //console.log("searching same function ?  " + search);
      //console.log("length of child:  " + parent.childBlocks_.length);
      if (parent.childBlocks_.length != 0) {
        parent.childBlocks_.forEach(child => {
          if (child.type == 'procedures_callreturn') {
            childFuncName = child.inputList[0].fieldRow[0].value_;
            if (currentFuncName == childFuncName) {
              recursiveFunction = true;
              search = false;
            }
          }
          parent = child;
        });
      } else search = false;
      i++;
    }
    //console.log("recursive user function ?  " + recursiveFunction);
    return recursiveFunction;
  }
};

/**
 * END VITTAWARNING
 */

Blockly.Constants.Procedures.PROCEDURE_RENAME_EXTENSION = function () {
  this.getField('NAME').setValidator(Blockly.Procedures.rename);
};

Blockly.Constants.Procedures.PROCEDURE_VARS_MIXIN_EXTENSION = function () {
  var mixin = {
    getVars: function () {
      return this.arguments_;
    },
    getVarModels: function () {
      return this.argumentVarModels_;
    },
    renameVarById: function (oldId, newId) {
      var index = this.paramIds_.indexOf(oldId);
      if (index == -1) {
        return;
      }
      var oldName = this.workspace.getVariableById(oldId).name;
      var newVar = this.workspace.getVariableById(newId);
      var newName = newVar.name;
      this.arguments_[index] = newName;
      this.argumentVarModels_[index] = newVar;
      this.displayRenamedVar_(oldName, newName);
      Blockly.Procedures.mutateCallers(this);
    },
    updateVarName: function (variable) {
      var id = variable.getId();
      var index = this.paramIds_.indexOf(id);
      if (index == -1) {
        return;
      }
      var oldName = this.arguments_[index];
      var newName = variable.name;
      this.arguments_[index] = newName;
      this.displayRenamedVar_(oldName, newName);
    },
    /**
     * VITTAWARNING _ added for setting or getting argument types of function
     */
    setArgsType: function (varTypeDict) {
      this.argsTypes_ = [];
      for (var j = 0; j < this.arguments_.length; j++) {
        var typeName = this.getFieldValue('TYPES_' + this.paramIds_[j]);
        var type = Blockly.Types[typeName];
        this.argsTypes_[this.arguments_[j]] = type;
        varTypeDict[this.arguments_[j]] = type;
      }
    },
    getVarTypes: function () {
      var funcVarAndTypes = [];
      for (var arg in this.argsTypes_) {
        var varAndType = [];
        varAndType.push(arg);
        varAndType.push(this.argsTypes_[arg]);
        funcVarAndTypes.push(varAndType);
      }
      return funcVarAndTypes;
    },
    /**
     * END VITTAWARNING
     */
  };
  this.mixin(mixin, true);
};

Blockly.Constants.Procedures.PROCEDURE_DEF_MUTATOR_MIXIN = {
  arguments_: [],
  paramIds_: [],
  argumentVarModels_: [],
  argsTypes_: [],
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('name', this.getFieldValue('NAME'));
    for (var i = 0; i < this.argumentVarModels_.length; i++) {
      var parameter = Blockly.utils.xml.createElement('arg');
      var argModel = this.argumentVarModels_[i];
      parameter.setAttribute('name', argModel.name);
      parameter.setAttribute('varid', argModel.getId());
      parameter.setAttribute('paramId', this.paramIds_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * @param {String} xmlElement
   */
  domToMutation: function (xmlElement) {
    this.targetArgs_ = [];
    this.targetIds_ = [];
    this.paramIds_ = [];
    this.arguments_ = [];
    this.argumentVarModels_ = [];

    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() != 'arg') {
        continue;
      }
      var varName = childNode.getAttribute('name');
      var paramId = childNode.getAttribute('paramId');
      this.targetArgs_.push(varName);
      this.targetIds_.push(paramId);
    }
    var count = this.targetArgs_.length;
    for (var i = 0; i < count; i++) {
      this.addParam_(this.targetArgs_[i], this.targetIds_[i]);
    }
    Blockly.Procedures.mutateCallers(this);
  },
  /**
   * @param {String} option_name
   * @param {String} option_id
   */
  addParam_: function (opt_name, opt_id, type = false) {
    if (!this.arguments_.length) {
      this.appendDummyInput('WITH')
        .appendField(new Blockly.FieldLabel(
          Blockly.Msg['PROCEDURES_BEFORE_PARAMS']), 'WITH',);
      this.moveInputBefore('WITH', 'STACK');
    }
    var name = opt_name || Blockly.Variables.generateUniqueNameFromOptions(
      Blockly.Procedures.DEFAULT_ARG, this.arguments_);
    var id = opt_id || Blockly.utils.genUid();
    var that = this;
    var removeArg = function () {
      return function () {
        that.minus(id);
      };
    }();
    var field = new Blockly.FieldTextInput(name, this.validator_);
    field.onFinishEditing_ = this.onFinish.bind(field);
    this.appendDummyInput(id)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
        this.buttonSize, this.buttonSize, "*", removeArg, false))
      .appendField('var:')
      .appendField(field, id)
      .appendField(' as ')
      .appendField(new Blockly.FieldDropdown(Blockly.Types.getValidTypeArray()), 'TYPES_' + id);
    this.getField('TYPES_' + id).setValue(type ? type : 'NUMBER');
    this.moveInputBefore(id, 'STACK');
    this.arguments_.push(name);
    this.paramIds_.push(id);
    this.argumentVarModels_.push(Blockly.Variables.getOrCreateVariablePackage(
      this.workspace, id, name, ''));
  },
  plus: function () {
    var update = function () {
      this.addParam_();
    };
    this.update_(update);
    Blockly.Procedures.mutateCallers(this);
  },
  /**
   * @param {String} id
   */
  minus: function (id) {
    var update = function () {
      var name = this.getFieldValue(id);
      var index = this.arguments_.indexOf(name);
      this.arguments_.splice(index, 1);
      this.paramIds_.splice(index, 1);
      this.argumentVarModels_.splice(index, 1);
      delete this.argsTypes_[name];
      this.removeInput(id);
      if (!this.arguments_.length) {
        this.removeInput('WITH');
      }
    };
    this.update_(update);
    Blockly.Procedures.mutateCallers(this);
  },
  /**
   * @param {Function} update
   */
  update_: function (update) {
    return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
  },
  /**
   * @param {String} newName
   */
  validator_: function (newName) {
    var sourceBlock = this.getSourceBlock();
    newName = newName.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
    if (!newName) {
      return null;
    }
    for (var i = 0, input; input = sourceBlock.inputList[i]; i++) {
      for (var j = 0, field; field = input.fieldRow[j]; j++) {
        if (field.name == this.name) {
          continue;
        }
        if (field.getValue() == newName) {
          return null;
        }
      }
    }
    var index = sourceBlock.paramIds_.indexOf(this.name);
    sourceBlock.arguments_[index] = newName;
    var variable = sourceBlock.workspace.getVariableById(newName);
    if (variable && variable.name != newName) {
      sourceBlock.workspace.renameVariableById(newName);
      Blockly.Procedures.mutateCallers(sourceBlock);
    }
  },

  /**
   * Must be bound to the text input field!
   * @this {Blockly.FieldTextInput}
   */
  onFinish: function (finalName) {
    var sourceBlock = this.getSourceBlock();
    var index = sourceBlock.paramIds_.indexOf(this.name);
    sourceBlock.arguments_[index] = finalName;
    var arg = sourceBlock.workspace.getVariableById(this.name);
    if (arg != null) sourceBlock.workspace.renameVariableById(this.name, finalName);
    Blockly.Procedures.mutateCallers(sourceBlock);
  }
};

// Initialization extensions
Blockly.Extensions.register('procedure_def_init',
  Blockly.Constants.Procedures.PROCEDURE_DEF_INIT_EXTENSION);

Blockly.Extensions.register('procedure_rename',
  Blockly.Constants.Procedures.PROCEDURE_RENAME_EXTENSION);

Blockly.Extensions.register('procedure_vars',
  Blockly.Constants.Procedures.PROCEDURE_VARS_MIXIN_EXTENSION);

// Functions mixin
Blockly.Extensions.registerMixin('procedure_display_renamed',
  Blockly.Constants.Procedures.PROCEDURE_DISPLAY_RENAMED);

Blockly.Extensions.registerMixin('get_procedure_def_no_return',
  Blockly.Constants.Procedures.PROCEDURE_GET_DEF_NO_RETURN_MIXIN);

Blockly.Extensions.registerMixin('get_procedure_def_return',
  Blockly.Constants.Procedures.PROCEDURE_GET_DEF_RETURN_MIXIN);

Blockly.Extensions.registerMixin("procedure_def_return_get_type",
  Blockly.Constants.Procedures.PROCEDURE_DEF_RETURN_GET_TYPE);

Blockly.Extensions.registerMixin('procedure_context_menu',
  Blockly.Constants.Procedures.PROCEDURE_CONTEXT_MENU_MIXIN);

// Mutator
Blockly.Extensions.registerMutator('procedure_def_mutator',
  Blockly.Constants.Procedures.PROCEDURE_DEF_MUTATOR_MIXIN);