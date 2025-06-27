/**
 * @fileoverview Display blocks for Loti-bot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "display_set_LEDs_RGB",
        "message0": "%{BKY_DISPLAY_SET_LEDS_RGB_TITLE}",
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
        "tooltip": "%{BKY_DISPLAY_SET_LEDS_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_LEDs_palette",
        "message0": "%{BKY_DISPLAY_SET_LEDS_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOUR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_LEDS_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_LED_RGB",
        "message0": "%{BKY_DISPLAY_SET_LED_RGB_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "L_R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "L_G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "L_B",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "R_R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "R_G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "R_B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_LED_RGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_LED_palette",
        "message0": "%{BKY_DISPLAY_SET_LED_PALETTE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOUR_LEFT",
            "check": "Colour"
        }, {
            "type": "input_value",
            "name": "COLOUR_RIGHT",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_LED_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_headlights",
        "message0": "%{BKY_DISPLAY_SET_HEADLIGHTS_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PWM",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_HEADLIGHTS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_set_headlight",
        "message0": "%{BKY_DISPLAY_SET_HEADLIGHT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PWM_LEFT",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "PWM_RIGHT",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_HEADLIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)