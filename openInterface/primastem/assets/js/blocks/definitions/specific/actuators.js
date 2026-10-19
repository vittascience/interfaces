/**
 * @fileoverview Actuators blocks for primaSTEM.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "actuators_move_forward",
        "message0": "%{BKY_ACTUATORS_MOVE_FORWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_FORWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_move_backward",
        "message0": "%{BKY_ACTUATORS_MOVE_BACKWARD_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_BACKWARD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_move_forward_distance",
        "message0": "%{BKY_ACTUATORS_MOVE_FORWARD_DISTANCE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_FORWARD_DISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_move_backward_distance",
        "message0": "%{BKY_ACTUATORS_MOVE_BACKWARD_DISTANCE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_BACKWARD_DISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_turnLeft",
        "message0": "%{BKY_ACTUATORS_TURN_LEFT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_TURN_LEFT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_turnRight",
        "message0": "%{BKY_ACTUATORS_TURN_RIGHT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_TURN_RIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_play_sound",
        "message0": "%{BKY_ACTUATORS_PLAY_SOUND_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_PLAY_SOUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)