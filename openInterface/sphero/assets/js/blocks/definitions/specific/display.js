/**
 * @fileoverview Display blocks for Sphero.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "display_set_main_LED_RGB",
        "message0": "%{BKY_DISPLAY_SET_MAIN_LED_RGB_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_MAIN_LED_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_main_LED_RGB_palette",
        "message0": "%{BKY_DISPLAY_SET_MAIN_LED_RGB_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOUR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_MAIN_LED_RGB_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_main_LED_RGB_fade",
        "message0": "%{BKY_DISPLAY_SET_MAIN_LED_RGB_FADE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FROM",
            "check": "Colour"
        },
        {
            "type": "input_value",
            "name": "TO",
            "check": "Colour"
        },
        {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_MAIN_LED_RGB_FADE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_main_LED_RGB_blink",
        "message0": "%{BKY_DISPLAY_SET_MAIN_LED_RGB_BLINK_TITLE}",
        "args0": [
        {
            "type": "input_value",
            "name": "COLOUR",
            "check": "Colour"
        },
        {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "COUNTER",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_MAIN_LED_RGB_BLINK_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_back_LED_intensity",
        "message0": "%{BKY_DISPLAY_SET_BACK_LED_INTENSITY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "INTENSITY",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_BACK_LED_INTENSITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)