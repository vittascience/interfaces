/**
 * @fileoverview Actuators blocks for Loti-bot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "actuators_set_motors",
        "message0": "%{BKY_ACTUATORS_SET_MOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_GO_FORWARD}", "Forward"],
                ["%{BKY_ACTUATORS_GO_BACKWARD}", "Backward"]
            ]
        }, {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "SPEED",
            "options": [
                ["%{BKY_ACTUATORS_SLOW}", "SLOW"],
                ["%{BKY_ACTUATORS_MEDIUM}", "MEDIUM"],
                ["%{BKY_ACTUATORS_FAST}", "FAST"]
            ]
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
        "type": "actuators_draw_square",
        "message0": "%{BKY_ACTUATORS_DRAW_SQUARE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_DRAW_SQUARE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_rotate_with_angle",
        "message0": "%{BKY_ACTUATORS_ROTATE_WITH_ANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["↻", "Right"],
                ["↺", "Left"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "SPEED",
            "options": [
                ["%{BKY_ACTUATORS_SLOW}", "SLOW"],
                ["%{BKY_ACTUATORS_MEDIUM}", "MEDIUM"],
                ["%{BKY_ACTUATORS_FAST}", "FAST"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_ROTATE_WITH_ANGLE_TOOLTIP}",
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
        "type": "actuators_play_sound",
        "message0": "%{BKY_ACTUATORS_PLAY_SOUND_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SOUND",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
                ["9", "9"],
                ["10", "10"],
                ["11", "11"],
                ["12", "12"],
                ["13", "13"],
                ["14", "14"],
                ["15", "15"],
                ["16", "16"],
                ["17", "17"],
                ["18", "18"],
                ["19", "19"],
                ["20", "20"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_PLAY_SOUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)