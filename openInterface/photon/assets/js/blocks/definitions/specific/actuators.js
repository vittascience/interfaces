/**
 * @fileoverview Actuators blocks for Photon.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "actuators_go",
        "message0": "%{BKY_ACTUATORS_GO_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_FORWARD}", "forward"],
                ["%{BKY_ACTUATORS_BACKWARD}", "backward"]
            ]
        }, {
            "type": "input_value",
            "name": "DISTANCE",
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
        "tooltip": "%{BKY_ACTUATORS_GO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_rotate",
        "message0": "%{BKY_ACTUATORS_ROTATE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_LEFT}", "left"],
                ["%{BKY_ACTUATORS_RIGHT}", "right"]
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
        "tooltip": "%{BKY_ACTUATORS_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_go_infinity",
        "message0": "%{BKY_ACTUATORS_GO_INFINITY_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_FORWARD}", "forward"],
                ["%{BKY_ACTUATORS_BACKWARD}", "backward"]
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
        "tooltip": "%{BKY_ACTUATORS_GO_INFINITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_rotate_infinity",
        "message0": "%{BKY_ACTUATORS_ROTATE_INFINITY_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_LEFT}", "left"],
                ["%{BKY_ACTUATORS_RIGHT}", "right"]
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
        "tooltip": "%{BKY_ACTUATORS_ROTATE_INFINITY_TOOLTIP}",
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
        "type": "actuators_follow_line",
        "message0": "%{BKY_ACTUATORS_FOLLOW_LINE_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_FOLLOW_LINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)