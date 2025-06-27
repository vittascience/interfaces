/**
 * @fileoverview Display blocks for Winky.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT 
    {
        "type": "display_preset",
        "message0": "%{BKY_DISPLAY_PRESET_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PRESET",
                "options": [
                    ['%{BKY_DISPLAY_PRESET_AMUSED}', 'Amused'],
                    ['%{BKY_DISPLAY_PRESET_ANGRY}', 'Angry'],
                    ['%{BKY_DISPLAY_PRESET_BIG}', 'Big'],
                    ['%{BKY_DISPLAY_PRESET_BORED}', 'Bored'],
                    ['%{BKY_DISPLAY_PRESET_SAD}', 'Sad'],
                    ['%{BKY_DISPLAY_PRESET_HAPPY}', 'Happy'],
                    ['%{BKY_DISPLAY_PRESET_TIRED}', 'Tired'],
                    ['%{BKY_DISPLAY_PRESET_SLEEP}', 'Sleep'],
                    ['%{BKY_DISPLAY_PRESET_INLOVE}', 'InLove'],
                    ['%{BKY_DISPLAY_PRESET_QUESTION}', 'Question'],
                    ['%{BKY_DISPLAY_PRESET_HOT}', 'Hot'],
                    ['%{BKY_DISPLAY_PRESET_COLD}', 'Cold']
                ]
            },
            {
                "type": "field_dropdown",
                "name": "EYES",
                "options": [
                    ['%{BKY_DISPLAY_PRESET_BOTH}', "0"],
                    ['%{BKY_DISPLAY_PRESET_LEFT}', "1"],
                    ['%{BKY_DISPLAY_PRESET_RIGHT}', "2"],
                    ['%{BKY_DISPLAY_PRESET_RANDOM}', "3"],
                    ['%{BKY_DISPLAY_PRESET_HORIZONTAL}', "4"],
                    ['%{BKY_DISPLAY_PRESET_VERTICAL}', "5"],
                    ['%{BKY_DISPLAY_PRESET_ROTATION_90}', "6"],
                    ['%{BKY_DISPLAY_PRESET_ROTATION_180}', "7"],
                    ['%{BKY_DISPLAY_PRESET_ROTATION_270}', "8"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_PRESET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_presetEachEye",
        "message0": "%{BKY_DISPLAY_PRESET_EACH_EYE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PRESET_RIGHT",
                "options": [
                    ['%{BKY_DISPLAY_PRESET_AMUSED}', 'Amused'],
                    ['%{BKY_DISPLAY_PRESET_ANGRY}', 'Angry'],
                    ['%{BKY_DISPLAY_PRESET_BIG}', 'Big'],
                    ['%{BKY_DISPLAY_PRESET_BORED}', 'Bored'],
                    ['%{BKY_DISPLAY_PRESET_SAD}', 'Sad'],
                    ['%{BKY_DISPLAY_PRESET_HAPPY}', 'Happy'],
                    ['%{BKY_DISPLAY_PRESET_TIRED}', 'Tired'],
                    ['%{BKY_DISPLAY_PRESET_SLEEP}', 'Sleep'],
                    ['%{BKY_DISPLAY_PRESET_INLOVE}', 'InLove'],
                    ['%{BKY_DISPLAY_PRESET_QUESTION}', 'Question'],
                    ['%{BKY_DISPLAY_PRESET_HOT}', 'Hot'],
                    ['%{BKY_DISPLAY_PRESET_COLD}', 'Cold']
                ]
            },
            {
                "type": "field_dropdown",
                "name": "PRESET_LEFT",
                "options": [
                    ['%{BKY_DISPLAY_PRESET_AMUSED}', 'Amused'],
                    ['%{BKY_DISPLAY_PRESET_ANGRY}', 'Angry'],
                    ['%{BKY_DISPLAY_PRESET_BIG}', 'Big'],
                    ['%{BKY_DISPLAY_PRESET_BORED}', 'Bored'],
                    ['%{BKY_DISPLAY_PRESET_SAD}', 'Sad'],
                    ['%{BKY_DISPLAY_PRESET_HAPPY}', 'Happy'],
                    ['%{BKY_DISPLAY_PRESET_TIRED}', 'Tired'],
                    ['%{BKY_DISPLAY_PRESET_SLEEP}', 'Sleep'],
                    ['%{BKY_DISPLAY_PRESET_INLOVE}', 'InLove'],
                    ['%{BKY_DISPLAY_PRESET_QUESTION}', 'Question'],
                    ['%{BKY_DISPLAY_PRESET_HOT}', 'Hot'],
                    ['%{BKY_DISPLAY_PRESET_COLD}', 'Cold']
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_PRESET_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_number",
        "message0": "%{BKY_DISPLAY_NUMBER_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NUMBER",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NUMBER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_text",
        "message0": "%{BKY_DISPLAY_TEXT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT"
            },
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ['%{BKY_DISPLAY_TEXT_RIGHT}', "0"],
                    ['%{BKY_DISPLAY_TEXT_LEFT}', "1"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "TRANSITION",
                "options": [
                    ['%{BKY_DISPLAY_TEXT_REPLACEMENT_1S}', "0"],
                    ['%{BKY_DISPLAY_TEXT_REPLACEMENT_800MS}', "1"],
                    ['%{BKY_DISPLAY_TEXT_REPLACEMENT_500MS}', "2"],
                    ['%{BKY_DISPLAY_TEXT_REPLACEMENT_200MS}', "3"],
                    ['%{BKY_DISPLAY_TEXT_SCROLL_500MS}', "4"],
                    ['%{BKY_DISPLAY_TEXT_SCROLL_400MS}', "5"],
                    ['%{BKY_DISPLAY_TEXT_SCROLL_300MS}', "6"],
                    ['%{BKY_DISPLAY_TEXT_SCROLL_200MS}', "7"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_pattern",
        "message0": "%{BKY_DISPLAY_PATTERN_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EYES",
                "options": [
                    ['%{BKY_DISPLAY_PRESET_BOTH}', "0"],
                    ['%{BKY_DISPLAY_PRESET_LEFT}', "1"],
                    ['%{BKY_DISPLAY_PRESET_RIGHT}', "2"],
                    ['%{BKY_DISPLAY_PRESET_RANDOM}', "3"],
                    ['%{BKY_DISPLAY_PRESET_HORIZONTAL}', "4"],
                    ['%{BKY_DISPLAY_PRESET_VERTICAL}', "5"],
                    ['%{BKY_DISPLAY_PRESET_ROTATION_90}', "6"],
                    ['%{BKY_DISPLAY_PRESET_ROTATION_180}', "7"],
                    ['%{BKY_DISPLAY_PRESET_ROTATION_270}', "8"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_PATTERN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "show_leds_screen_init"
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
        ],
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Display = Object.create(null);

/**
 * Performs setup of 'show_leds' block for screen checkboxes display.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION = function () {
    for (let row = 0; row < 8; row++) {
        let rowBoxes = this.appendDummyInput("ROW" + row);
        for (let column = 0; column < 8; column++) {
            const box = new Blockly.FieldCheckboxColor(0, { 'color': '#5BD3FF', 'height': 20, 'width': 25 });
            rowBoxes.appendField(box, "LED" + row + "" + column);
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("show_leds_screen_init",
    Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION);
