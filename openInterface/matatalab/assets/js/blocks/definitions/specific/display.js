/**
 * @fileoverview Display blocks for Matatalab.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "display_setEyesColor",
        "message0": "%{BKY_DISPLAY_SET_EYES_COLOR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "EYE",
                "options": [
                    ["%{BKY_MATATALAB_EYE_BOTH}", "both"],
                    ["%{BKY_MATATALAB_EYE_LEFT}", "left"],
                    ["%{BKY_MATATALAB_EYE_RIGHT}", "right"]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "COLOR",
                "options": [
                    ["%{BKY_MATATALAB_COLOR_WHITE}", "white"],
                    ["%{BKY_MATATALAB_COLOR_RED}", "red"],
                    ["%{BKY_MATATALAB_COLOR_YELLOW}", "yellow"],
                    ["%{BKY_MATATALAB_COLOR_GREEN}", "green"],
                    ["%{BKY_MATATALAB_COLOR_BLUE}", "blue"],
                    ["%{BKY_MATATALAB_COLOR_PURPLE}", "purple"],
                    ["%{BKY_MATATALAB_COLOR_BLACK}", "black"]
                ]
            },
            {
                "type": "input_value",
                "name": "LEVEL",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_EYES_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_setEyes",
        "message0": "%{BKY_DISPLAY_SET_EYES_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "EYE",
                "options": [
                    ["%{BKY_MATATALAB_EYE_BOTH}", "both"],
                    ["%{BKY_MATATALAB_EYE_LEFT}", "left"],
                    ["%{BKY_MATATALAB_EYE_RIGHT}", "right"]
                ]
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_EYES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_clearEyes",
        "message0": "%{BKY_DISPLAY_CLEAR_EYES_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CLEAR_EYES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
