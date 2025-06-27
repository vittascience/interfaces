/**
 * @fileoverview Vittaia blocks for Microbit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // AI SENSORS
    {
        "type": "vittaia_load_local_model",
        "message0": "%{BKY_VITTAIA_LOAD_LOCAL_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sensor'),
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_LOCAL_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_load_cloud_model",
        "message0": "%{BKY_VITTAIA_LOAD_CLOUD_MODEL_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sensor'),
            {
                "type": "input_value",
                "name": "MODEL_ID",
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_LOAD_CLOUD_MODEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_make_prediction",
        "message0": "%{BKY_VITTAIA_MAKE_PREDICTION_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sensor'),
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_MAKE_PREDICTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "vittaia_timewindow_init_extension"
        ],
        "mutator": "vittaia_timewindow_read_mutator"
    },
    {
        "type": "vittaia_get_highest_probability_class",
        "message0": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sensor'),
        ],
        "output": "String",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "vittaia_detect_class",
        "message0": "%{BKY_VITTAIA_DETECT_CLASS_TITLE}",
        "args0": [
            Blockly.Constants.Utils.ICON_IA('sensor'),
           {
                "type": "input_value",
                "name": "MODEL_CLASS"
            },
            {
                "type": "field_grid_dropdown",
                "name": "IS_DETECTED",
                "options": [
                    ["%{BKY_VITTAIA_IS}", "=="],
                    ["%{BKY_VITTAIA_ISNOT}", "!="]
                ]
            }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_VITTAIA_DETECT_CLASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Vittaia = Object.create(null);

/**
 * Performs final setup of a 'vittaia_make_prediction' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Vittaia.VITTAIA_TIMEWINDOW_INIT_EXTENSION = function () {
    // Initialiser size_ à false pour que le mutator soit fermé par défaut
    this.size_ = false;
    this.updateField_();
};

/**
 * Mixin for mutator functions in the 'vittaia_timewindow_read_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Vittaia.VITTAIA_TIMEWINDOW_MUTATOR_MIXIN = {
    /**
     * Create XML to represent input.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('size', this.size_);
        // Stocke la valeur window_size uniquement si elle existe
        if (this.getField('WINDOW_SIZE')) {
            container.setAttribute('window_size', this.getFieldValue('WINDOW_SIZE'));
        } else {
            // Valeur par défaut si WINDOW_SIZE n'existe pas encore
            container.setAttribute('window_size', '0.2');
        }
        return container;
    },
    /**
     * Parse XML to restore the input.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.size_ = (xmlElement.getAttribute('size') != 'false');
        // Stocker la valeur window_size pour une utilisation ultérieure
        var windowSize = xmlElement.getAttribute('window_size');
        if (windowSize) {
            this.window_size_ = windowSize;
        }
        this.updateField_();
    },
    addOptions_: function () {
        if (!this.getInput("SIZE_FIELD")) {
            this.size_ = true;
            this.updateField_();
        }
    },
    removeOptions_: function () {
        if (this.getInput("SIZE_FIELD")) {
            this.size_ = false;
            this.updateField_();
        }
    },
    /**
     * Modify this block to have the correct input.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function () {
        var that = this;
        var remove = function () {
            that.removeOptions_();
        };
        var add = function () {
            that.addOptions_();
        };
        if (this.getInput('TOP')) {
            this.removeInput('TOP');
        }
        var top = this.appendDummyInput('TOP');
        if (this.size_) {
            if (!this.getInput("SIZE_FIELD")) {
                // Récupérer la valeur sauvegardée ou utiliser la valeur par défaut
                var savedValue = '0.2';
                if (this.getField('WINDOW_SIZE')) {
                    savedValue = this.getFieldValue('WINDOW_SIZE');
                } else if (this.window_size_) {
                    savedValue = this.window_size_;
                }
                
                // Utiliser un field_number pour créer un slider
                this.appendDummyInput("SIZE_FIELD")
                    .appendField(Blockly.Msg['VITTAIA_MAKE_PREDICTION_TIME_WINDOW'])
                    .appendField(new Blockly.FieldNumber(
                        savedValue,
                        0.1,  // min
                        1.2,  // max
                        0.1,  // precision
                    ), 'WINDOW_SIZE')
                    .appendField("(s)");
            }
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", remove, false));
        } else {
            if (this.getInput('SIZE_FIELD')) {
                // Sauvegarder la valeur actuelle avant de supprimer le champ
                if (this.getField('WINDOW_SIZE')) {
                    this.window_size_ = this.getFieldValue('WINDOW_SIZE');
                }
                this.removeInput("SIZE_FIELD");
            }
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI,
                this.buttonSize, this.buttonSize, "*", add, false));
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("vittaia_timewindow_init_extension",
    Blockly.Constants.Vittaia.VITTAIA_TIMEWINDOW_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('vittaia_timewindow_read_mutator',
    Blockly.Constants.Vittaia.VITTAIA_TIMEWINDOW_MUTATOR_MIXIN);