/**
 * @fileoverview Actuators blocks for Lego Spike.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "actuators_startMotorContinuous",
        "message0": "%{BKY_ACTUATORS_START_MOTOR_CONTINUOUS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "forward"],
                ["↺", "backward"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_START_MOTOR_CONTINUOUS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_startMotorForTime",
        "message0": "%{BKY_ACTUATORS_START_MOTOR_FOR_TIME_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        },{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "forward"],
                ["↺", "backward"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_START_MOTOR_FOR_TIME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_moveMotorToPosition",
        "message0": "%{BKY_ACTUATORS_MOVE_MOTOR_TO_POSITION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_MOTOR_TO_POSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_moveMotorByDegrees",
        "message0": "%{BKY_ACTUATORS_MOVE_MOTORS_BY_DEGREES_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        },{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "forward"],
                ["↺", "backward"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_MOTORS_BY_DEGREES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_stopMotor",
        "message0": "%{BKY_ACTUATORS_STOP_MOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_STOP_MOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)