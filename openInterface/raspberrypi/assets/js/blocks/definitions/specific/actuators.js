/**
 * @fileoverview Actuators blocks for Raspberrypi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    // Raspberry pi
    // GROVE BUZZER OR SPEAKER _ PLAY FREQUENCY
    {
        "type": "actuators_music_playFrequency",
        "message0": "%{BKY_ACTUATORS_MUSIC_PLAY_FREQUENCY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_PLAY_FREQUENCY_TOOLTIP}",
    },

]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Actuators = Object.create(null);

/**
 * Mixin for mutator functions in the 'actuators_play_notes_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Actuators.ACTUATORS_PLAY_NOTES_MUTATOR_MIXIN = {
    /**
     * Create XML to represent number of data inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the data inputs.
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
        top.appendField(Blockly.Msg['ACTUATORS_MUSIC_PLAY_NOTES_TITLE']);
        top.appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.GALAXIA_PINS), "PIN");
        top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
        if (this.itemCount_ > 1) {
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
        }
        for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i);
        }
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
    }
};

// Mutator
Blockly.Extensions.registerMutator('actuators_play_notes_mutator',
    Blockly.Constants.Actuators.ACTUATORS_PLAY_NOTES_MUTATOR_MIXIN);