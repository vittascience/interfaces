/**
 * @fileoverview Display blocks for Codey.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // Onboard RGB LED

    // BLOCK LED SHOW [R,G,B]
    {
        "type": "display_showRGB",
        "message0": "%{BKY_DISPLAY_SHOWRGB_TITLE}",
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
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_DISPLAY_SHOWRGB_TOOLTIP}",
    },

    // BLOCK SET RED
    {
        "type": "display_setRed",
        "message0": "%{BKY_DISPLAY_SETRED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_DISPLAY_SETRED_TOOLTIP}",
    },

    // BLOCK SET GREEN
    {
        "type": "display_setGreen",
        "message0": "%{BKY_DISPLAY_SETGREEN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_DISPLAY_SETGREEN_TOOLTIP}",
    },

    // BLOCK SET BLUE
    {
        "type": "display_setBlue",
        "message0": "%{BKY_DISPLAY_SETBLUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_DISPLAY_SETBLUE_TOOLTIP}",
    },

    // BLOCK LED OFF
    {
        "type": "display_off",
        "message0": "%{BKY_DISPLAY_OFF_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_DISPLAY_OFF_TOOLTIP}",
    },

    // Face Panel

    // BLOCK DISPLAY SHOW_IMAGE => TO DO

    // BLOCK DISPLAY SHOW
    {
        type: "display_show",
        message0: "%{BKY_DISPLAY_SHOW_TITLE}",
        args0: [{
            type: "input_value",
            name: "TEXT",
        }],
        previousStatement: null,
        nextStatement: null,
        extensions: [
            "block_init_helpurl",
            "block_init_color"
        ],
        tooltip: "%{BKY_DISPLAY_SHOW_TOOLTIP}",
    },

    // BLOCK DISPLAY SET PIXEL 

    {
        type: "display_setPixel",
        message0: "%{BKY_DISPLAY_SETPIXEL_TITLE}",
        args0: [{
            type: "input_value",
            name: "X",
        }, {
            type: "input_value",
            name: "Y",
        }, {
            type: "input_value",
            name: "STATE",
            check: "Boolean"
        }],
        "inputsInline": true,
        previousStatement: null,
        nextStatement: null,
        extensions: [
            "block_init_helpurl",
            "block_init_color"
        ],
        tooltip: "%{BKY_DISPLAY_SETPIXEL_TOOLTIP}",
    },

    // BLOCK GET PIXEL
    {
        type: "display_getPixel",
        message0: "%{BKY_DISPLAY_GETPIXEL_TITLE}",
        args0: [{
            type: "input_value",
            name: "X",
        }, {
            type: "input_value",
            name: "Y",
        }],
        inputsInline: true,
        output: "Boolean",
        extensions: [
            "block_init_helpurl",
            "block_init_color"
        ],
        tooltip: "%{BKY_DISPLAY_GETPIXEL_TOOLTIP}",
    },

    // BLOCK TOGGLE PIXEL
    {
        type: "display_togglePixel",
        message0: "%{BKY_DISPLAY_TOGGLEPIXEL_TITLE}",
        args0: [{
            type: "input_value",
            name: "X",
        }, {
            type: "input_value",
            name: "Y",
        }],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        extensions: [
            "block_init_helpurl",
            "block_init_color"
        ],
        tooltip: "%{BKY_DISPLAY_TOGGLEPIXEL_TOOLTIP}",
    },

    //BLOCK DISPLAY CLEAR
    {
        type: "display_clear",
        message0: "%{BKY_DISPLAY_CLEAR_TITLE}",
        previousStatement: null,
        nextStatement: null,
        extensions: [
            "block_init_helpurl",
            "block_init_color"
        ],
        tooltip: "%{BKY_DISPLAY_CLEAR_TOOLTIP}",
    }

]); // END JSON EXTRACT (Do not delete this comment.)