/**
 * @fileoverview Display blocks for Eliobot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT 
    {
        "type": "display_controlBuiltInLED",
        "message0": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_controlBuiltInLEDOff",
        "message0": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_OFF_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_OFF_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_eyes_color",
        "message0": "%{BKY_DISPLAY_EYES_COLOR_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EYE_SIDE",
                "options": [
                    ["%{BKY_DISPLAY_EYES_COLOR_LEFT}", "LEFT"],
                    ["%{BKY_DISPLAY_EYES_COLOR_RIGHT}", "RIGHT"],
                    ["%{BKY_DISPLAY_EYES_COLOR_BOTH}", "BOTH"]
                ]
            },
            {
                "type": "input_value",
                "name": "COLOR",
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_EYES_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_eyes_emotion",
        "message0": "%{BKY_DISPLAY_EYES_EMOTION_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EMOTION",
                "options": [
                    ["%{BKY_DISPLAY_EYES_EMOTION_TIRED}", 'TIRED'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_HAPPY}", 'HAPPY'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_DIZZY}", 'DIZZY'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_CONFUSED}", 'CONFUSED'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_NEUTRAL}", 'NEUTRAL'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_THRILLED}", 'THRILLED'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_MUSIC}", 'MUSIC'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_LOVE}", 'LOVE'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_KO}", 'KO'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_AMAZED}", 'AMAZED'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_SAD}", 'SAD'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_ANGRY}", 'ANGRY'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_RIGHT_ARROW}", 'RIGHT_ARROW'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_LEFT_ARROW}", 'LEFT_ARROW'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_DOWN_ARROW}", 'DOWN_ARROW'],
                    ["%{BKY_DISPLAY_EYES_EMOTION_UP_ARROW}", 'UP_ARROW']
                ]
            },
            {
                "type": "input_value",
                "name": "COLOR",
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_EYES_EMOTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "display_eyes_matrix_unicolor",
        "message0": "%{BKY_DISPLAY_EYES_MATRIX_UNICOLOR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_EYES_MATRIX_UNICOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "display_eyes_matrix_unicolor_init"
        ]
    },
    {
        "type": "display_eyes_matrix",
        "message0": "%{BKY_DISPLAY_EYES_MATRIX_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_EYES_MATRIX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "display_eyes_matrix_init"
        ]
    },
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Display = Object.create(null);


/**
 * Performs setup of 'display_eyes_matrix_unicolor' block for screen checkboxes display.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_EYES_MATRIX_UNICOLOR_INIT_EXTENSION = function () {
    this.appendDummyInput('TITLES_ROW')
        .appendField(Blockly.Msg['DISPLAY_LEFT_EYE'])
        .appendField(' '.repeat(35 - Blockly.Msg['DISPLAY_RIGHT_EYE'].length))
        .appendField(Blockly.Msg['DISPLAY_RIGHT_EYE'])
        .setAlign(Blockly.ALIGN_CENTRE);

    for (let row = 0; row < 8; row++) {
        const rowBoxes = this.appendDummyInput("ROW" + row);

        for (let column = 0; column < 8; column++) {
            const box = new Blockly.FieldCheckboxColor(0, {
                'color': '#ffffff',
                'height': 24,
                'width': 24,
                'reverseColors': true,
                'margin': 6
            });
            rowBoxes.appendField(box, "LEFT_EYE_" + row + "_" + column);
        }

        rowBoxes.appendField(new Blockly.FieldLabel("  "));

        for (let column = 0; column < 8; column++) {
            const box = new Blockly.FieldCheckboxColor(0, {
                'color': '#ffffff',
                'height': 24,
                'width': 24,
                'reverseColors': true,
                'margin': 6
            });
            rowBoxes.appendField(box, "RIGHT_EYE_" + row + "_" + column);
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("display_eyes_matrix_unicolor_init",
    Blockly.Constants.Display.DISPLAY_EYES_MATRIX_UNICOLOR_INIT_EXTENSION);

/**
 * Performs setup of 'display_eyes_matrix' block for screen checkboxes display.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_EYES_MATRIX_INIT_EXTENSION = function () {
    this.appendDummyInput('TITLES_ROW')
        .appendField(Blockly.Msg['DISPLAY_LEFT_EYE'])
        .appendField(' '.repeat(35 - Blockly.Msg['DISPLAY_RIGHT_EYE'].length))
        .appendField(Blockly.Msg['DISPLAY_RIGHT_EYE'])
        .setAlign(Blockly.ALIGN_CENTRE);

    for (let row = 0; row < 8; row++) {
        const rowBoxes = this.appendDummyInput("ROW" + row);

        for (let col = 0; col < 8; col++) {
            const box = new Blockly.FieldColourCustom('#000000');
            rowBoxes.appendField(box, `LEFT_EYE_${row}_${col}`);
        }

        rowBoxes.appendField(new Blockly.FieldLabel("  "));

        for (let col = 0; col < 8; col++) {
            const box = new Blockly.FieldColourCustom('#000000');
            rowBoxes.appendField(box, `RIGHT_EYE_${row}_${col}`);
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("display_eyes_matrix_init",
    Blockly.Constants.Display.DISPLAY_EYES_MATRIX_INIT_EXTENSION);