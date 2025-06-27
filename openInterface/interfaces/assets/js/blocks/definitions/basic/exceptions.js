/**
 * @fileoverview Exception blocks for Python.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // Raise block.
  {
    "type": "exception_raise",
    "message0": "raise %1",
    "args0": [{
      "type": "input_value",
      "name": "EXC"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "exception_blocks",
    "tooltip": "%{BKY_EXCEPTION_RAISE_TOOLTIP}",
  },

  // Exception block
  {
    "type": "exception_exception",
    "message0": "Exception %1",
    "args0": [{
      "type": "input_value",
      "name": "EXC",
    }],
    "output": "String",
    "style": "exception_blocks",
    "tooltip": "%{BKY_EXCEPTION_EXCEPTION_TOOLTIP}",
  },

  {
    "type": "exception_type",
    "message0": "%1",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "TYPE",
      "options": [
        ["AssertionError", "AssertionError"],
        ["AttributeError", "AttributeError"],
        ["EOFError", "EOFError"],
        ["FloatingPointError", "FloatingPointError"],
        ["GeneratorExit", "GeneratorExit"],
        ["ImportError", "ImportError"],
        ["IndexError", "IndexError"],
        ["KeyError", "KeyError"],
        ["KeyboardInterrupt", "KeyboardInterrupt"],
        ["MemoryError", "MemoryError"],
        ["NameError", "NameError"],
        ["NotImplementedError", "NotImplementedError"],
        ["OSError", "OSError"],
        ["OverflowError", "OverflowError"],
        ["ReferenceError", "ReferenceError"],
        ["RuntimeError", "RuntimeError"],
        ["StopIteration", "StopIteration"],
        ["SyntaxError", "SyntaxError"],
        ["IndentationError", "IndentationError"],
        ["TabError", "TabError"],
        ["SystemError", "SystemError"],
        ["SystemExit", "SystemExit"],
        ["TypeError", "TypeError"],
        ["UnboundLocalError", "UnboundLocalError"],
        ["UnicodeError", "UnicodeError"],
        ["UnicodeEncodeError", "UnicodeEncodeError"],
        ["UnicodeDecodeError", "UnicodeDecodeError"],
        ["UnicodeTranslateError", "UnicodeTranslateError"],
        ["ValueError", "ValueError"],
        ["ZeroDivisionError", "ZeroDivisionError"]
      ],
    }],
    "output": "ErrorType",
    "inputsInline": true,
    "style": "exception_blocks",
    "tooltip": "%{BKY_EXCEPTION_TYPE_TOOLTIP}",
  },

  // Try Except block
  {
    "type": "exception_try",
    "message0": "try",
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "EXC",
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "exception_blocks",
    "extensions": [
      "block_buttons_plus_minus",
      "controls_except_init",
    ],
    "mutator": "exception_try_mutator",
    "tooltip": "%{BKY_EXCEPTION_TRY_TOOLTIP}",
  },

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Exception = Object.create(null); 
/**
 * Performs final setup of 'controls_if' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Exception.CONTROLS_except_INIT_EXTENSION = function () {
  this.exceptArgCount_ = 0;
  this.elseCount_ = 1;
  this.updateShape_();
};

/**
 * Mixin for mutator functions in the 'exception_try_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */

Blockly.Constants.Exception.EXCEPTION_TRY_MUTATOR_MIXIN = {
  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function () {
    if (!this.exceptArgCount_ && !this.elseCount_) {
      return null;
    }
    var container = Blockly.utils.xml.createElement('mutation');
    if (this.exceptArgCount_) {
      container.setAttribute('except', this.exceptArgCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('exceptarg', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    if (!xmlElement) return;
    this.exceptArgCount_ = parseInt(xmlElement.getAttribute('except'), 10) || 0;
    this.elseCount_ = parseInt(xmlElement.getAttribute('exceptarg'), 10) || 1;
    this.rebuildShape_();
  },
  // Store pointers to any connected child blocks.
  storeConnections_: function (arg) {
    if (!arg) arg = 0;
    this.valueConnections_ = [null];
    this.statementConnections_ = [null];
    this.elseStatementConnection_ = null;
    for (var i = 1; i <= this.exceptArgCount_; i++) {
      if (arg != i) {
        this.valueConnections_.push(this.getInput('EXCEPT' + i)
          .connection.targetConnection);
        this.statementConnections_.push(this.getInput('DO' + i)
          .connection.targetConnection);
      }
    }
    if (this.getInput('EXCEPTARG')) {
      this.elseStatementConnection_ = this.getInput('EXCEPTARG')
        .connection.targetConnection;
    }
  },
  // Restore pointers to any connected child blocks.
  restoreConnections_: function () {
    for (var i = 1; i <= this.exceptArgCount_; i++) {
      Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'EXCEPT' + i);
      Blockly.Mutator.reconnect(this.statementConnections_[i], this, 'DO' + i);
    }
    if (this.getInput('EXCEPTARG')) {
      Blockly.Mutator.reconnect(this.elseStatementConnection_, this, 'EXCEPTARG');
    }
  },
  addExceptArg_: function () {
    this.storeConnections_();
    var update = function () {
      this.elseCount_++;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  removeExceptArg_: function () {
    this.storeConnections_();
    var update = function () {
      this.elseCount_--;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  addExcept_: function () {
    this.storeConnections_();
    var update = function () {
      this.exceptArgCount_++;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  removeExcept_: function (arg) {
    this.storeConnections_(arg);
    var update = function () {
      this.exceptArgCount_--;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  update_: function (update) {
    return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
  updateShape_: function () {
    var that = this;
    // Delete everything.
    if (this.getInput('EXCEPTARG')) {
      this.removeInput('EXCEPTARG');
      this.removeInput('EXCEPTARGTITLE');
      this.removeInput('EXCEPTARGBUTTONS');
    }
    var i = 1;
    while (this.getInput('EXCEPT' + i)) {
      this.removeInput('EXCEPT' + i);
      this.removeInput('EXCEPTTITLE' + i);
      this.removeInput('EXCEPTBUTTONS' + i);
      this.removeInput('DO' + i);
      i++;
    }
    // Rebuild block.
    for (var i = 1; i <= this.exceptArgCount_; i++) {
      var removeElseIf = function (arg) {
        return function () {
          that.removeExcept_(arg);
        };
      }(i);
      this.appendValueInput('EXCEPT' + i)
        .setCheck('ErrorType')
        .appendField("except");
      this.appendDummyInput('EXCEPTTITLE' + i)
      this.appendDummyInput('EXCEPTBUTTONS' + i)
        .appendField(
          new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
            this.buttonSize, "*", removeElseIf, false))
        .setAlign(Blockly.ALIGN_RIGHT);
      this.appendStatementInput('DO' + i);
    }
    if (this.elseCount_) {
      this.appendDummyInput('EXCEPTARGTITLE')
        .appendField("except");
      this.appendDummyInput('EXCEPTARGBUTTONS')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(
          new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
            this.buttonSize, "*", that.removeExceptArg_.bind(that), false));
      this.appendStatementInput('EXCEPTARG');
    }
    if (this.getInput('ADDBUTTON')) this.removeInput('ADDBUTTON');
    var that = this;
    var addElseIf = function () {
      return function () {
        if (that.elseCount_ == 0) {
          that.addExceptArg_();
        } else {
          if (!that.exceptArgCount_) that.exceptArgCount_ = 0;
          that.addExcept_();
        }
      };
    }();
    this.appendDummyInput('ADDBUTTON')
      .appendField(
        new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize,
          this.buttonSize, "*", addElseIf, false));
  },
  /**
   * Reconstructs the block with all child blocks attached.
   */
  rebuildShape_: function () {
    var valueConnections = [null];
    var statementConnections = [null];
    var elseStatementConnection = null;

    if (this.getInput('EXCEPTARG')) {
      elseStatementConnection = this.getInput('EXCEPTARG')
        .connection.targetConnection;
    }
    var i = 1;
    while (this.getInput('EXCEPT' + i)) {
      var inputIf = this.getInput('EXCEPT' + i);
      var inputDo = this.getInput('DO' + i);
      valueConnections.push(inputIf.connection.targetConnection);
      statementConnections.push(inputDo.connection.targetConnection);
      i++;
    }
    this.updateShape_();
    this.reconnectChildBlocks_(valueConnections, statementConnections,
      elseStatementConnection);
  },
  /**
   * Reconnects child blocks.
   * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
   * connectsions for if input.
   * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
   * statement connections for do input.
   * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
   * connection for else input.
   */
  reconnectChildBlocks_: function (valueConnections, statementConnections,
    elseStatementConnection) {
    for (var i = 1; i <= this.exceptArgCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'EXCEPT' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'EXCEPTARG');
  }
};


// Initialization extensions
Blockly.Extensions.register('controls_except_init',
  Blockly.Constants.Exception.CONTROLS_except_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator("exception_try_mutator",
  Blockly.Constants.Exception.EXCEPTION_TRY_MUTATOR_MIXIN)