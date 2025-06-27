/**
 * @fileoverview CE blocks for TI-83 Premium CE.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin ce_box blocks*/

    // BOX - Define box
    {
        "type": "ce_box_defineBox",
        "message0": "%{BKY_CE_BOX_DEFINE_BOX_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "LIST",
            "check": "Array"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ce_blocks",
        "tooltip": "%{BKY_CE_BOX_DEFINE_BOX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BOX - set title
    {
        "type": "ce_box_title",
        "message0": "%{BKY_CE_BOX_TITLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TITLE",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ce_blocks",
        "tooltip": "%{BKY_CE_BOX_TITLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BOX - show
    {
        "type": "ce_box_show",
        "message0": "%{BKY_CE_BOX_SHOW_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "ce_blocks",
        "tooltip": "%{BKY_CE_BOX_SHOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin ce_chart blocks */

    // CHART - Define chart
    {
        "type": "ce_chart_defineChart",
        "message0": "%{BKY_CE_CHART_DEFINE_CHART_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_value",
            "name": "LIST",
            "check": "Array"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ce_blocks",
        "tooltip": "%{BKY_CE_CHART_DEFINE_CHART_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CHART - Data
    {
        "type": "ce_chart_dataChart",
        "message0": "%{BKY_CE_CHART_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LABEL",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "output": "Array",
        "style": "ce_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CHART - set title
    {
        "type": "ce_chart_title",
        "message0": "%{BKY_CE_CHART_TITLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TITLE",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ce_blocks",
        "tooltip": "%{BKY_CE_CHART_TITLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CHART - set frequencies
    {
        "type": "ce_chart_frequencies",
        "message0": "%{BKY_CE_CHART_FREQUENCIES_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQ",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ce_blocks",
        "tooltip": "%{BKY_CE_CHART_FREQUENCIES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CHART - show
    {
        "type": "ce_chart_show",
        "message0": "%{BKY_CE_CHART_SHOW_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "ce_blocks",
        "tooltip": "%{BKY_CE_CHART_SHOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CHART - draw line portion
    {
        "type": "ce_quivr_drawLinePortion",
        "message0": "%{BKY_CE_QUIVR_ADD_LINE_PORTION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "XA",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YA",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "XB",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YB",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                ["%{BKY_COLOUR_BLACK}", "blk"],
                ["%{BKY_COLOUR_RED}", "r"],
                ["%{BKY_COLOUR_GREEN}", "g"],
                ["%{BKY_COLOUR_BLUE}", "b"],
                ["%{BKY_COLOUR_CYAN}", "c"],
                ["%{BKY_COLOUR_FUCHSIA}", "m"],
                ["%{BKY_COLOUR_YELLOW}", "y"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ce_blocks",
        "tooltip": "%{BKY_CE_QUIVR_ADD_LINE_PORTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CHART - draw vector
    {
        "type": "ce_quivr_drawVector",
        "message0": "%{BKY_CE_QUIVR_ADD_VECTOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DX",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DY",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                ["%{BKY_COLOUR_BLACK}", "blk"],
                ["%{BKY_COLOUR_RED}", "r"],
                ["%{BKY_COLOUR_GREEN}", "g"],
                ["%{BKY_COLOUR_BLUE}", "b"],
                ["%{BKY_COLOUR_CYAN}", "c"],
                ["%{BKY_COLOUR_FUCHSIA}", "m"],
                ["%{BKY_COLOUR_YELLOW}", "y"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ce_blocks",
        "tooltip": "%{BKY_CE_QUIVR_ADD_VECTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "ce_quivr_drawVector_init_extension"
        ],
        "mutator": "ce_quivr_drawVector_mutator"
    }

]);

Blockly.Constants.Ce = Object.create(null);

/**
* Performs final setup of 'ce_quivr_drawVector' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Ce.CE_QUIVR_ADD_VECTOR_INIT_EXTENSION = function () {
    this.option_ = false;
    this.update_(this.updateField_);
};

Blockly.Constants.Ce.CE_QUIVR_ADD_VECTOR_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('size', 'CE_QUIVR_ADD_VECTOR_SIZE', 'input', 0.5);

// Initialization extensions
Blockly.Extensions.register("ce_quivr_drawVector_init_extension",
    Blockly.Constants.Ce.CE_QUIVR_ADD_VECTOR_INIT_EXTENSION);

// Mutators
Blockly.Extensions.registerMutator('ce_quivr_drawVector_mutator',
    Blockly.Constants.Ce.CE_QUIVR_ADD_VECTOR_MUTATOR_MIXIN);