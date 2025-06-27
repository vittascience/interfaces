/**
 * @fileoverview Actuators blocks for Sphero.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "actuators_set_motors",
        "message0": "%{BKY_ACTUATORS_SET_MOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_GO_FORWARD}", "forward"],
                ["%{BKY_ACTUATORS_GO_BACKWARD}", "backward"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_MOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_set_motors_with_timeout",
        "message0": "%{BKY_ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_GO_FORWARD}", "forward"],
                ["%{BKY_ACTUATORS_GO_BACKWARD}", "backward"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "TIMEOUT",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_MOTORS_WITH_TIMEOUT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_set_heading",
        "message0": "%{BKY_ACTUATORS_SET_HEADING_TITLE}",
        "args0": [ {
            "type": "input_value",
            "name": "HEADING",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_HEADING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_set_motors_with_heading",
        "message0": "%{BKY_ACTUATORS_SET_MOTORS_WITH_HEADING_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_GO_FORWARD}", "forward"],
                ["%{BKY_ACTUATORS_GO_BACKWARD}", "backward"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "HEADING",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_MOTORS_WITH_HEADING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_rotate",
        "message0": "%{BKY_ACTUATORS_ROTATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["↻", "right"],
                ["↺", "left"]
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
        "tooltip": "%{BKY_ACTUATORS_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_rotate_with_timeout",
        "message0": "%{BKY_ACTUATORS_ROTATE_WITH_TIMEOUT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["↻", "right"],
                ["↺", "left"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "TIMEOUT",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_ROTATE_WITH_TIMEOUT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_set_motor",
        "message0": "%{BKY_ACTUATORS_SET_MOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ACTUATORS_MOTOR_RIGHT}", "right"],
                ["%{BKY_ACTUATORS_MOTOR_LEFT}", "left"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["↻", "right"],
                ["↺", "left"]
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
        "tooltip": "%{BKY_ACTUATORS_SET_MOTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_stop",
        "message0": "%{BKY_ACTUATORS_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_reset_heading",
        "message0": "%{BKY_ACTUATORS_RESET_HEADING_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_RESET_HEADING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
]); // END JSON EXTRACT (Do not delete this comment.)