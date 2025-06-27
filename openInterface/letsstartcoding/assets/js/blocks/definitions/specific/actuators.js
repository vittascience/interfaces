/**
 * @fileoverview Actuators blocks for Arduino.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // GROVE BUZZER OR SPEAKER _ PLAY FREQUENCY JSON
    {
        "type": "actuators_tone",
        "message0": "%{BKY_ACTUATORS_TONE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        },
        {
            "type": "input_value",
            "name": "FREQUENCY",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "style": "actuators_blocks",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_TONE_TOOLTIP}"
    },

    // GROVE BUZZER OR SPEAKER _ STOP MUSIC JSON
    {
        "type": "actuators_noTone",
        "message0": "%{BKY_ACTUATORS_NOTONE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "actuators_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_NOTONE_TOOLTIP}"
    }

]); // END JSON EXTRACT (Do not delete this comment.)
