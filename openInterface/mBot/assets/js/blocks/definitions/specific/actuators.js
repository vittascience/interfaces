/**
 * @fileoverview Actuators blocks for mBot.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    /** mBot motors blocks */

    // BLOCK MBOT CONTROL MOTOR GO
    {
        "type": "robots_setmBotGo",
        "message0": "%{BKY_ROBOTS_MBOT_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_MBOT_GO_FORWARD}", "1"],
                ["%{BKY_ROBOTS_MBOT_GO_REVERSE}", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_GO_TOOLTIP}",
    },

    // BLOCK MBOT CONTROL MOTOR
    {
        "type": "robots_controlmBotMotor",
        "message0": "%{BKY_ROBOTS_MBOT_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_MBOT_RIGHT}", "right"],
                ["%{BKY_ROBOTS_MBOT_LEFT}", "left"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_MBOT_GO_FORWARD}", "1"],
                ["%{BKY_ROBOTS_MBOT_GO_REVERSE}", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_CONTROLMOTOR_TOOLTIP}",
    },

    // BLOCK MBOT STOP MOTORS
    {
        "type": "robots_stopmBotMotors",
        "message0": "%{BKY_ROBOTS_MBOT_STOPMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_MBOT_RIGHT}", "right"],
                ["%{BKY_ROBOTS_MBOT_LEFT}", "left"],
                ["%{BKY_ROBOTS_MBOT_RIGHT&LEFT}", "all"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MBOT_STOPMOTORS_TOOLTIP}",
    },

    /* Servomotor */

    //BLOCK MAKEBLOCK _ CONTROL SERVOMOTOR
    {
        "type": "robots_makeBlock_setServoAngle",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_SETSERVOANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": ["Number", "Decimal"]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "SLOT",
            "options": Blockly.Constants.Pins.MBOT_SLOT
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_SETSERVOANGLE_TOOLTIP}",
    },

    /** mini fan */

    //BLOCK MAKEBLOCK _ CONTROL MINI FAN
    {
        "type": "robots_makeBlock_controlMiniFan",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_MAKEBLOCK_CLOCKWISE}", "1"],
                ["%{BKY_ROBOTS_MAKEBLOCK_ANTICLOCKWISE}", "-1"],
                ["%{BKY_ROBOTS_MAKEBLOCK_STOP}", "0"],
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_CONTROLMINIFAN_TOOLTIP}",
    }

]); // END JSON EXTRACT (Do not delete this comment.)
