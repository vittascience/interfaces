/**
 * @fileoverview Display blocks for primaSTEM.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "display_setLed",
        "message0": "%{BKY_DISPLAY_SETLED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_DISPLAY_RIGHT_LED}", "r"],
                ["%{BKY_DISPLAY_LEFT_LED}", "l"],
                ["%{BKY_DISPLAY_BOTH_LED}", "b"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                ["%{BKY_DISPLAY_COLOR_RED}", "red"],
                ["%{BKY_DISPLAY_COLOR_GREEN}", "green"],
                ["%{BKY_DISPLAY_COLOR_BLUE}", "blue"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SETLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)