/**
 * @fileoverview Robots blocks for mBot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // CONTROL ARDUINO LED  
    {
        "type": "mCore_control_LED",
        "message0": "%{BKY_MCORE_CONTROL_BUILTIN_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_MCORE_CONTROL_BUILTIN_LED_TOOLTIP}",
    },

    // BLOCK MBOT SET RGB LED
    {
        "type": "robots_setmBotRgbLed",
        "message0": "%{BKY_ROBOTS_MBOT_SETRGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "G",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "B",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_MBOT_RIGHT_F}", "1"],
                ["%{BKY_ROBOTS_MBOT_LEFT_F}", "2"],
                ["%{BKY_ROBOTS_MBOT_RIGHT&LEFT_F}", "0"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_SETRGBLED_TOOLTIP}",
    },

    // BLOCK MBOT SET PALETTE RGB LED
    {
        "type": "robots_setmBotPaletteRgbLed",
        "message0": "%{BKY_ROBOTS_MBOT_SETPALETTERGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_MBOT_RIGHT_F}", "1"],
                ["%{BKY_ROBOTS_MBOT_LEFT_F}", "2"],
                ["%{BKY_ROBOTS_MBOT_RIGHT&LEFT_F}", "0"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_SETPALETTERGBLED_TOOLTIP}",
    },

    // BLOCK MBOT SET BUZZER
    {
        "type": "robots_setmBotBuzzer",
        "message0": "%{BKY_ROBOTS_MBOT_SETBUZZER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "TIME",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_SETBUZZER_TOOLTIP}",
    },

    // BLOCK MBOT PLAY MUSIC
    {
        "type": "robots_playmBotMusic",
        "message0": "%{BKY_ROBOTS_MBOT_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Gamme", "0"],
                ["Star Wars", "1"],
                ["R2D2", "2"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_PLAYMUSIC_TOOLTIP}",
    },

    // BLOCK MBOT LIGHT SENSOR
    {
        "type": "robots_getmBotSensorLight",
        "message0": "%{BKY_ROBOTS_MBOT_GETLIGHT_TITLE}",
        "output": "Decimal",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_GETLIGHT_TOOLTIP}",
    },

    // BLOCK MBOT BOARD BUTTON
    {
        "type": "robots_getmBotButtonState",
        "message0": "%{BKY_ROBOTS_MBOT_GETBUTTONSTATE_TITLE}",
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_GETBUTTONSTATE_TOOLTIP}",
    },

    // BLOCK MBOT REMOTE CONTROL BUTTON
    {
        "type": "robots_getmBotRemoteControlButton",
        "message0": "%{BKY_ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "69"],
                ["B", "70"],
                ["C", "71"],
                ["D", "68"],
                ["E", "67"],
                ["F", "13"],
                ["↑", "64"],
                ["↓", "25"],
                ["←", "7"],
                ["→", "9"],
                ["setting", "21"],
                ["R0", "22"],
                ["R1", "12"],
                ["R2", "24"],
                ["R3", "94"],
                ["R4", "8"],
                ["R5", "28"],
                ["R6", "90"],
                ["R7", "66"],
                ["R8", "82"],
                ["R9", "74"]
            ]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_GETREMOTECONTROLBUTTON_TOOLTIP}",
    },

    // BLOCK MBOT SEND IR STRING
    {
        "type": "robots_sendmBotIrMessage",
        "message0": "%{BKY_ROBOTS_MBOT_SENDIRMESSAGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": ["String", "Number", "Decimal", "Boolean"]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_SENDIRMESSAGE_TOOLTIP}",
    }

]); // END JSON EXTRACT (Do not delete this comment.)