/**
 * @fileoverview Display blocks for M5Stack.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Start led module blocks */

    // BLOCK NEOPIXEL _ DEFINE NEOPIXEL
    {
        "type": "display_defineNeopixel",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TITLE}",
        "args0": [{
            "type": "field_slider",
            "name": "N",
            "value": 20,
            "min": 1,
            "max": 1000
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)