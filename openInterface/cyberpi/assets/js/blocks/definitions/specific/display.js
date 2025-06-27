/**
 * @fileoverview Display blocks for CyberPi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* RGB LED blocks definition */

    // BUILTIN LEDs ALL _ SET RGB LED
    {
        "type": "cyberpi_led_on_all_RGB",
        "message0": "%{BKY_CYBERPI_LED_ON_ALL_RGB_TITLE}",
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
        "style": "display_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_LED_ON_ALL_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN LEDs ALL _ SET PALETTE RGB LED
    {
        "type": "cyberpi_led_on_all_palette",
        "message0": "%{BKY_CYBERPI_LED_ON_ALL_RGB_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "style": "display_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_LED_ON_ALL_RGB_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN LEDs _ SET RGB LED
    {
        "type": "cyberpi_led_on_RGB",
        "message0": "%{BKY_CYBERPI_LED_ON_RGB_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }, {
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
        "style": "display_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_LED_ON_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN LEDs _ SET PALETTE RGB LED
    {
        "type": "cyberpi_led_on_palette",
        "message0": "%{BKY_CYBERPI_LED_ON_RGB_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "style": "display_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_LED_ON_RGB_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN LEDs _ PLAY ANIMATION
    {
        "type": "cyberpi_led_play",
        "message0": "%{BKY_CYBERPI_LED_PLAY_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ANIMATION",
            "options": [
                ["%{BKY_CYBERPI_ANIMATION_RAINBOW}", "rainbow"],
                ["%{BKY_CYBERPI_ANIMATION_SPOONDRIFT}", "spoondrift"],
                ["%{BKY_CYBERPI_ANIMATION_METEOR_BLUE}", "meteor_blue"],
                ["%{BKY_CYBERPI_ANIMATION_METEOR_GREEN}", "meteor_green"],
                ["%{BKY_CYBERPI_ANIMATION_FLASH_RED}", "flash_red"],
                ["%{BKY_CYBERPI_ANIMATION_FLASH_ORANGE}", "flash_orange"],
                ["%{BKY_CYBERPI_ANIMATION_FIREFLY}", "firefly"]
            ]
        }],
        "style": "display_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_LED_PLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN LEDs _ MOVE BY STEP
    {
        "type": "cyberpi_led_move",
        "message0": "%{BKY_CYBERPI_LED_MOVE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STEP",
            "check": "Number"
        }],
        "style": "display_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_LED_MOVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN LEDs _ SET BRIGHTNESS
    {
        "type": "cyberpi_led_set_brightness",
        "message0": "%{BKY_CYBERPI_LED_SET_BRIGHTNESS_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "BRIGHTNESS",
            "check": "Number"
        }],
        "style": "display_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_LED_SET_BRIGHTNESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN LEDs _ GET BRIGHTNESS
    {
        "type": "cyberpi_led_get_brightness",
        "message0": "%{BKY_CYBERPI_LED_GET_BRIGHTNESS_TITLE}",
        "style": "display_blocks",
        "output": "Number",
        "tooltip": "%{BKY_CYBERPI_LED_GET_BRIGHTNESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Console blocks definition */

    // BUILTIN DISPLAY _ CONSOLE PRINT
    {
        "type": "cyberpi_console_print",
        "message0": "%{BKY_CYBERPI_CONSOLE_PRINT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_CYBERPI_CONSOLE_PRINT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_serialWrite_init_extension"
        ],
        "mutator": "communication_serialWrite_mutator"
    },

    // BUILTIN DISPLAY _ CONSOLE SET FONT
    {
        "type": "cyberpi_console_set_font",
        "message0": "%{BKY_CYBERPI_CONSOLE_SET_FONT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "FONTSIZE",
            "options": [
                ["12", "12"],
                ["16", "16"],
                ["24", "24"],
                ["32", "32"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_CYBERPI_CONSOLE_SET_FONT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Text blocks definition */

    // BUILTIN DISPLAY _ SHOW LABEL POSITION
    {
        "type": "cyberpi_display_show_label",
        "message0": "%{BKY_CYBERPI_DISPLAY_SHOW_LABEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "field_grid_dropdown",
            "name": "FONTSIZE",
            "options": [
                ["16", "16"],
                ["24", "24"],
                ["32", "32"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "POSITION",
            "options": [
                ["%{BKY_CYBERPI_POSITION_TOP_MID}", "top_mid"],
                ["%{BKY_CYBERPI_POSITION_TOP_LEFT}", "top_left"],
                ["%{BKY_CYBERPI_POSITION_TOP_RIGHT}", "top_right"],
                ["%{BKY_CYBERPI_POSITION_CENTER}", "center"],
                ["%{BKY_CYBERPI_POSITION_MID_LEFT}", "mid_left"],
                ["%{BKY_CYBERPI_POSITION_MID_RIGHT}", "mid_right"],
                ["%{BKY_CYBERPI_POSITION_BOTTOM_MID}", "bottom_mid"],
                ["%{BKY_CYBERPI_POSITION_BOTTOM_LEFT}", "bottom_left"],
                ["%{BKY_CYBERPI_POSITION_BOTTOM_RIGHT}", "bottom_right"]
            ]
        }],
        "style": "display_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_DISPLAY_SHOW_LABEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN DISPLAY _ SHOW LABEL X Y
    {
        "type": "cyberpi_display_show_label_xy",
        "message0": "%{BKY_CYBERPI_DISPLAY_SHOW_LABEL_XY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "field_grid_dropdown",
            "name": "FONTSIZE",
            "options": [
                ["16", "16"],
                ["24", "24"],
                ["32", "32"]
            ]
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "style": "display_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_DISPLAY_SHOW_LABEL_XY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Text blocks definition */

    // BUILTIN DISPLAY _ LINECHART ADD
    {
        "type": "cyberpi_linechart_add",
        "message0": "%{BKY_CYBERPI_LINECHART_ADD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "style": "display_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_LINECHART_ADD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN DISPLAY _ LINECHART SET STEP
    {
        "type": "cyberpi_linechart_set_step",
        "message0": "%{BKY_CYBERPI_LINECHART_SET_STEP_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STEP"
        }],
        "style": "display_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_LINECHART_SET_STEP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN DISPLAY _ BARCHART ADD
    {
        "type": "cyberpi_barchart_add",
        "message0": "%{BKY_CYBERPI_BARCHART_ADD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "style": "display_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_BARCHART_ADD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    // BUILTIN DISPLAY _ TABLE ADD
    {
        "type": "cyberpi_table_add",
        "message0": "%{BKY_CYBERPI_TABLE_ADD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "style": "display_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_TABLE_ADD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN DISPLAY _ LINECHART MAP
    {
        "type": "cyberpi_chart_map",
        "message0": "%{BKY_CYBERPI_CHART_MAP_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE"
        }, {
            "type": "input_value",
            "name": "MIN"
        }, {
            "type": "input_value",
            "name": "MAX"
        }],
        "output": "Number",
        "style": "display_blocks",
        "inputsInline": true,
        "tooltip": "%{BKY_CYBERPI_CHART_MAP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN DISPLAY _ CHART SET BRUSH
    {
        "type": "cyberpi_chart_set_brush",
        "message0": "%{BKY_CYBERPI_CHART_SET_BRUSH_TITLE}",
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
        "style": "display_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_CHART_SET_BRUSH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BUILTIN DISPLAY _ CHART SET BRUSH PALETTE
    {
        "type": "cyberpi_chart_set_brush_palette",
        "message0": "%{BKY_CYBERPI_CHART_SET_BRUSH_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "style": "display_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_CYBERPI_CHART_SET_BRUSH_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)