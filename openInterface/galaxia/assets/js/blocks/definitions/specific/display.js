/**
 * @fileoverview Display blocks for Thingz-Galaxia.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Start Galaxia Screen blocks */

    // BLOCK GALAXIA SCREEN SET TEXT
    {
        "type": "display_galaxia_screen_set_text",
        "message0": "%{BKY_DISPLAY_GALAXIA_SCREEN_SET_TEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SCREEN_SET_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK GALAXIA SCREEN SET TEXT WITH VALUE
    {
        "type": "display_galaxia_screen_set_text_value",
        "message0": "%{BKY_DISPLAY_GALAXIA_SCREEN_SET_TEXT_VALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
        },
        {
            "type": "input_value",
            "name": "VALUE",
            "check": "Number",
        },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SCREEN_SET_TEXT_VALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK GALAXIA SCREEN CLEAR
    {
        "type": "display_galaxia_screen_clear",
        "message0": "%{BKY_DISPLAY_GALAXIA_SCREEN_CLEAR_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SCREEN_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    /* Start Galaxia RGB LED blocks */

    // BLOCK GALAXIA SET RGB LED COLORS
    {
        "type": "display_galaxia_led_set_colors_rgb",
        "message0": "%{BKY_DISPLAY_GALAXIA_SET_LED_COLORS_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "RED",
            "check": "Number",
        }, {
            "type": "input_value",
            "name": "GREEN",
            "check": "Number",
        }, {
            "type": "input_value",
            "name": "BLUE",
            "check": "Number",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SET_LED_COLORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK GALAXIA SET PALETTE LED COLOR
    {
        "type": "display_galaxia_led_set_colors_palette",
        "message0": "%{BKY_DISPLAY_GALAXIA_SET_LED_COLORS_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SET_LED_COLORS_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SET GALAXIA LED SPECIFIC COLOR
    {
        "type": "display_galaxia_led_set_color",
        "message0": "%{BKY_DISPLAY_GALAXIA_LED_CONTROL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                ["%{BKY_COLOUR_RED}", "RED"],
                ["%{BKY_COLOUR_GREEN}", "GREEN"],
                ["%{BKY_COLOUR_BLUE}", "BLUE"]
            ]
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": "Number",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_LED_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK GET GALAXIA LED SPECIFIC COLOR
    {
        "type": "display_galaxia_led_get_color",
        "message0": "%{BKY_DISPLAY_GALAXIA_LED_GET_VALUE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                ["%{BKY_COLOUR_RED}", "RED"],
                ["%{BKY_COLOUR_GREEN}", "GREEN"],
                ["%{BKY_COLOUR_BLUE}", "BLUE"]
            ]
        }],
        "output": "Number",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_LED_GET_VALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    /* Start graphics blocks */

    //BLOCK DISPLAY SET MODE
    {
        "type": "display_galaxia_set_mode",
        "message0": "%{BKY_DISPLAY_GALAXIA_SET_MODE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MODE",
            "options": [
                ["%{BKY_DISPLAY_GALAXIA_SET_MODE_PLOT}", "plot.show"],
                ["%{BKY_DISPLAY_GALAXIA_SET_MODE_CONSOLE}", "console.show"],
                ["%{BKY_DISPLAY_GALAXIA_SET_MODE_GRAPHICS}", "raw.show"],
            ],
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SET_MODE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK PLOT ADD POINT
    {
        "type": "display_galaxia_plot_add_point",
        "message0": "%{BKY_DISPLAY_GALAXIA_PLOT_ADD_POINT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "POINT",
                "check": "Number",
            }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_PLOT_ADD_POINT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK PLOT SET Y SCALE
    {
        "type": "display_galaxia_plot_set_y_scale",
        "message0": "%{BKY_DISPLAY_GALAXIA_PLOT_SET_Y_SCALE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MIN",
            "check": "Number",
        }, {
            "type": "input_value",
            "name": "MAX",
            "check": "Number",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_PLOT_SET_Y_SCALE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK DISPLAY ANIMATE FUNCTION
    {
        "type": "display_galaxia_animate_function",
        "message0": "%{BKY_DISPLAY_GALAXIA_ANIMATE_FUNCTION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "INTERVAL",
            "check": "Number",
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO",
        }],
        "message2": "%{BKY_DISPLAY_GALAXIA_ANIMATE_FUNCTION_NEW_POINT}",
        "args2": [{
            "type": "input_value",
            "align": "right",
            "name": "POINT",
        }],
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_ANIMATE_FUNCTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "disable_duplicates"
        ],
    },
    {
        "type": "display_galaxia_raw_print",
        "message0": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
        }, {
            "type": "input_value",
            "name": "X",
        }, {
            "type": "input_value",
            "name": "Y",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "display_galaxia_raw_text",
        "message0": "%{BKY_DISPLAY_GALAXIA_RAW_TEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
        }, {
            "type": "input_value",
            "name": "X",
        }, {
            "type": "input_value",
            "name": "Y",
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_RAW_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "display_galaxia_raw_rect",
        "message0": "%{BKY_DISPLAY_GALAXIA_RAW_RECT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
        }, {
            "type": "input_value",
            "name": "Y",
        }, {
            "type": "input_value",
            "name": "W",
        }, {
            "type": "input_value",
            "name": "H",
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_RAW_RECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "display_galaxia_raw_print_img",
        "message0": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_IMG_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "IMAGE",
        }, {
            "type": "input_value",
            "name": "X",
        }, {
            "type": "input_value",
            "name": "Y",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_IMG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "display_galaxia_raw_print_custom_img",
        "message0": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_IMG_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "IMAGE",
            "options": Blockly.Constants.GALAXIA_DISPLAY_IMAGES,
        }, {
            "type": "input_value",
            "name": "X",
        }, {
            "type": "input_value",
            "name": "Y",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_IMG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    }

]); // END JSON EXTRACT (Do not delete this comment.)