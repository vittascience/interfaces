/**
 * @fileoverview Actuators blocks for Matatalab.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "actuators_move",
        "message0": "%{BKY_ACTUATORS_MOVE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DIR",
                "options": [
                    ["%{BKY_MATATALAB_DIR_FORWARD}", "forward"],
                    ["%{BKY_MATATALAB_DIR_BACKWARD}", "backward"]
                ]
            },
            {
                "type": "input_value",
                "name": "STEPS",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_move_cm",
        "message0": "%{BKY_ACTUATORS_MOVE_CM_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "DISTANCE",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_CM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_turn",
        "message0": "%{BKY_ACTUATORS_TURN_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DIR",
                "options": [
                    ["%{BKY_MATATALAB_DIR_LEFT}", "left"],
                    ["%{BKY_MATATALAB_DIR_RIGHT}", "right"]
                ]
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_TURN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_setGear",
        "message0": "%{BKY_ACTUATORS_SET_GEAR_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "WHEEL",
                "options": [
                    ["%{BKY_MATATALAB_WHEEL_BOTH}", "both"],
                    ["%{BKY_MATATALAB_WHEEL_LEFT}", "left"],
                    ["%{BKY_MATATALAB_WHEEL_RIGHT}", "right"]
                ]
            },
            {
                "type": "input_value",
                "name": "GEAR",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_GEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_setSpeed",
        "message0": "%{BKY_ACTUATORS_SET_SPEED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RIGHT",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_stop",
        "message0": "%{BKY_ACTUATORS_STOP_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "WHEEL",
                "options": [
                    ["%{BKY_MATATALAB_WHEEL_BOTH}", "both"],
                    ["%{BKY_MATATALAB_WHEEL_LEFT}", "left"],
                    ["%{BKY_MATATALAB_WHEEL_RIGHT}", "right"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_dance",
        "message0": "%{BKY_ACTUATORS_DANCE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_DANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_action",
        "message0": "%{BKY_ACTUATORS_ACTION_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ID",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_ACTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
