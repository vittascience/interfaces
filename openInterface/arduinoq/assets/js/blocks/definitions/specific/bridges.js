/**
 * @fileoverview Bridges blocks for Arduino Q cpp.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
        "type": "bridges_provide",
        "message0": "%{BKY_Q_BRIDGES_PROVIDE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FUNCTION",
            "check": "Function"
        }, {
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "bridges_blocks",
        "tooltip": "%{BKY_Q_BRIDGES_PROVIDE_TOOLTIP}"
    },
    {
        "type": "bridges_call",
        "message0": "%{BKY_Q_BRIDGES_CALL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "bridges_blocks",
        "tooltip": "%{BKY_Q_BRIDGES_CALL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "bridges_call_init"
        ],
        "mutator": "bridges_call_mutator"
    }
]);

Blockly.Constants.Bridges = Object.create(null);

/**
 * Performs final setup of 'bridges_call' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Bridges.BRIDGES_CALL_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
    this.updateShape_();
};

Blockly.Extensions.register("bridges_call_init",
    Blockly.Constants.Bridges.BRIDGES_CALL_INIT_EXTENSION);

/**
* Mixin for mutator functions in the 'bridges_call_mutator' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Bridges.BRIDGES_CALL_MUTATOR_MIXIN = {
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
            top.appendField(Blockly.Msg['Q_BRIDGES_CALL_WITH_ARGUMENTS']);
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i);
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
};

Blockly.Extensions.registerMutator('bridges_call_mutator',
    Blockly.Constants.Bridges.BRIDGES_CALL_MUTATOR_MIXIN);

Blockly.Blocks['cpp_procedures_defnoreturn'] = Blockly.Blocks['procedures_defnoreturn'];
Blockly.Blocks['py_procedures_defnoreturn'] = Blockly.Blocks['procedures_defnoreturn'];

Blockly.Blocks['cpp_procedures_defreturn'] = Blockly.Blocks['procedures_defreturn'];
Blockly.Blocks['py_procedures_defreturn'] = Blockly.Blocks['procedures_defreturn'];
