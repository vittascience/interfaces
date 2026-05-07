
/**
 * @fileoverview STeaMi display blocks
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Start external screens blocks */

    // BLOCK STEAMI - OLED ADD TEXT
    {
        "type": "display_steami_addOledText",
        "message0": "%{BKY_DISPLAY_STEAMI_OLED_ADDTEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_STEAMI_OLED_ADDTEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK STEAMI OLED - SET PIXEL
    {
        "type": "display_steami_setOledPixel",
        "message0": "%{BKY_DISPLAY_STEAMI_OLED_SETPIXEL_TITLE}",
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
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_STEAMI_OLED_SETPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK STEAMI OLED - DRAW LINE
    {
        "type": "display_steami_drawOledLine",
        "message0": "%{BKY_DISPLAY_STEAMI_OLED_DRAWLINE_TITLE}",
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
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_STEAMI_OLED_DRAWLINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK STEAMI OLED - SHOW ICON
    {
        "type": "display_steami_showOledIcon",
        "message0": "%{BKY_DISPLAY_STEAMI_OLED_DRAWICON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ICON",
            "options": Blockly.Constants.Utils.BlockOptions.getOledIcons()
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_STEAMI_OLED_DRAWICON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED SET BACKGROUND
    {
        "type": "display_steami_setOledBackground",
        "message0": "%{BKY_DISPLAY_STEAMI_OLED_SETBACKGROUND_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BACKGROUND",
            "options": [
                ["%{BKY_DISPLAY_STEAMI_OLED_WHITE}", "1"],
                ["%{BKY_DISPLAY_STEAMI_OLED_BLACK}", "0"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_STEAMI_OLED_SETBACKGROUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK STEAMI OLED - CLEAR DISPLAY
    {
        "type": "display_steami_clearOledScreen",
        "message0": "%{BKY_DISPLAY_STEAMI_OLED_CLEARSCREEN_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_STEAMI_OLED_CLEARSCREEN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)