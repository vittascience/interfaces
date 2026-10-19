/**
* @fileoverview Communication blocks for STeaMi.
*/

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "communication_log_setLabel",
        "message0": "%{BKY_COMMUNICATION_LOG_SETLABEL_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_LOG_SETLABEL_TOOLTIP}",
        "style": "communication_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_log_init_extension"
        ],
        "mutator": "communication_log_setLabel_mutator"
    },
    {
        "type": "communication_log_addData",
        "message0": "%{BKY_COMMUNICATION_LOG_ADDDATA_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_LOG_ADDDATA_TOOLTIP}",
        "style": "communication_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_log_init_extension"
        ],
        "mutator": "communication_log_addData_mutator"
    },
    {
        "type": "communication_log_deleteLogs",
        "message0": "%{BKY_COMMUNICATION_LOG_DELETE_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LOG_DELETE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Communication ??= Object.create(null);

/**
 * Performs final setup of 'communication_log_setLabel' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_LOG_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
    this.updateShape_();
};

Blockly.Extensions.register('communication_log_init_extension',
    Blockly.Constants.Communication.COMMUNICATION_LOG_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'communication_log_setLabel_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_LOG_SETLABEL_MUTATOR_MIXIN = {
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
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
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
            this.valueConnections_[i]?.reconnect(this, 'ADD' + i);
        }
    },
    addItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_++;
        };
        this.update_(update);
        // Add text block
        if (this.itemCount_ > 1) {
            const dataBlockName = "text";
            if (Blockly.Blocks[dataBlockName]) {
                const newBlock = Blockly.utils.xml.createElement('block');
                newBlock.setAttribute('type', dataBlockName);
                if (newBlock) {
                    const id = Blockly.utils.idGenerator.genUid();
                    newBlock.setAttribute('id', id);
                    Blockly.Xml.domToBlock(newBlock, this.workspace);
                    const block = this.workspace.getBlockById(id);
                    block.setFieldValue("Label" + this.itemCount_, "TEXT");
                    this.valueConnections_.push(block.outputConnection);
                }
            }
        }
        this.restoreValueConnections_();
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
        if (this.getInput('TOP')) {
            this.removeInput('TOP');
        }

        var i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }

        // Ajouter d'abord les labels
        if (this.itemCount_ > 0) {
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i);
            }

            // Puis les boutons
            var top = this.appendDummyInput('TOP');

            top.appendField(
                new Blockly.FieldImage(
                    this.ADD_IMAGE_DATAURI,
                    this.buttonSize,
                    this.buttonSize,
                    "*",
                    add,
                    false
                )
            );

            if (this.itemCount_ > 1) {
                top.appendField(
                    new Blockly.FieldImage(
                        this.REMOVE_IMAGE_DATAURI,
                        this.buttonSize,
                        this.buttonSize,
                        "*",
                        remove,
                        false
                    )
                );
            }
        }

        /* Switch to vertical list when the list is too long */
        var showHorizontalList = this.itemCount_ <= 2;

        this.setInputsInline(showHorizontalList);
        this.setOutputShape(
            showHorizontalList
                ? Blockly.OUTPUT_SHAPE_ROUND
                : Blockly.OUTPUT_SHAPE_SQUARE
        );
    }
};

Blockly.Extensions.registerMutator('communication_log_setLabel_mutator',
    Blockly.Constants.Communication.COMMUNICATION_LOG_SETLABEL_MUTATOR_MIXIN);

/**
 * Mixin for mutator functions in the 'communication_log_addData_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_LOG_ADDDATA_MUTATOR_MIXIN = {
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
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
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
            this.valueConnections_[i]?.reconnect(this, 'ADD' + i);
        }
    },
    addItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_++;
        };
        this.update_(update);
        // Add text block
        if (this.itemCount_ > 1) {
            const dataBlockName = "text";
            if (Blockly.Blocks[dataBlockName]) {
                const newBlock = Blockly.utils.xml.createElement('block');
                newBlock.setAttribute('type', dataBlockName);
                if (newBlock) {
                    const id = Blockly.utils.idGenerator.genUid();
                    newBlock.setAttribute('id', id);
                    Blockly.Xml.domToBlock(newBlock, this.workspace);
                    const block = this.workspace.getBlockById(id);
                    block.setFieldValue("Data" + this.itemCount_, "TEXT");
                    this.valueConnections_.push(block.outputConnection);
                }
            }
        }
        this.restoreValueConnections_();
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
        if (this.getInput('TOP')) {
            this.removeInput('TOP');
        }

        var i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }

        // Ajouter d'abord les labels
        if (this.itemCount_ > 0) {
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i);
            }

            // Puis les boutons
            var top = this.appendDummyInput('TOP');

            top.appendField(
                new Blockly.FieldImage(
                    this.ADD_IMAGE_DATAURI,
                    this.buttonSize,
                    this.buttonSize,
                    "*",
                    add,
                    false
                )
            );

            if (this.itemCount_ > 1) {
                top.appendField(
                    new Blockly.FieldImage(
                        this.REMOVE_IMAGE_DATAURI,
                        this.buttonSize,
                        this.buttonSize,
                        "*",
                        remove,
                        false
                    )
                );
            }
        }

        /* Switch to vertical list when the list is too long */
        var showHorizontalList = this.itemCount_ <= 2;

        this.setInputsInline(showHorizontalList);
        this.setOutputShape(
            showHorizontalList
                ? Blockly.OUTPUT_SHAPE_ROUND
                : Blockly.OUTPUT_SHAPE_SQUARE
        );
    }
};

Blockly.Extensions.registerMutator('communication_log_addData_mutator',
    Blockly.Constants.Communication.COMMUNICATION_LOG_ADDDATA_MUTATOR_MIXIN);