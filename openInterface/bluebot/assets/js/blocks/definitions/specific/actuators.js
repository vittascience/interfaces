/**
 * @fileoverview Actuators blocks for Blue-bot.
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
        "type": "actuators_turnLeft",
        "message0": "%{BKY_ACTUATORS_TURN_LEFT_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "ANGLE",
                "options": [
                    ["45°", "45"],
                    ["90°", "90"],
                    ["135°", "135"]
                ]
            }
        ],
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
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "ANGLE",
                "options": [
                    ["45°", "45"],
                    ["90°", "90"],
                    ["135°", "135"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_TURN_RIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)