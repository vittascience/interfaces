/**
 * @fileoverview Actuators blocks for Thingz-Galaxia.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK KITRONIK CONTROL MOTOR
    {
        "type": "actuators_kitronik_controlMotor",
        "message0": "%{BKY_ACTUATORS_KITRONIK_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["%{BKY_ACTUATORS_KITRONIK_MOTOR_BOTH}", "BOTH"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "1"],
                ["↺", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_CONTROLMOTOR_TOOLTIP}",
    },

    // BLOCK KITRONIK STOP MOTOR
    {
        "type": "actuators_kitronik_stopMotor",
        "message0": "%{BKY_ACTUATORS_KITRONIK_STOPMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["%{BKY_ACTUATORS_KITRONIK_MOTOR_BOTH}", "BOTH"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_STOPMOTOR_TOOLTIP}",
    },

    // KITRONIK 16-SERVOS _ SET POSITION
    {
        "type": "actuators_kitronikShield_setServoAngle",
        "message0": "%{BKY_ACTUATORS_KITRONIK_SERVO_SETANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SERVO",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_SERVO_SETANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)
