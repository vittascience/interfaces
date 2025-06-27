/**
 * @fileoverview Actuators blocks for Winky.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "actuators_setNeckPosition",
        "message0": "%{BKY_ACTUATORS_SET_NECK_POSITION_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_NECK_POSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_setNeckRotate",
        "message0": "%{BKY_ACTUATORS_SET_NECK_ROTATE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "SPEED",
                "options": [
                    // ["%{BKY_ACTUATORS_SET_NECK_ROTATE_SLOW}", "1"],
                    ["%{BKY_ACTUATORS_SET_NECK_ROTATE_NORMAL}", "2"],
                    // ["%{BKY_ACTUATORS_SET_NECK_ROTATE_HIGHT}", "3"],
                    // ["%{BKY_ACTUATORS_SET_NECK_ROTATE_RANDOM}", "0"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_NECK_ROTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_setEarsPosition",
        "message0": "%{BKY_ACTUATORS_SET_EARS_POSITION_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EARS",
                "options": [
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_LEFT}", "left"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_RIGHT}", "right"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_BOTH}", "duplicate"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_RANDOM}", "random"]
                ]
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_EARS_POSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_setEarsRear",
        "message0": "%{BKY_ACTUATORS_SET_EARS_REAR_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EARS",
                "options": [
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_LEFT}", "left"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_RIGHT}", "right"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_BOTH}", "duplicate"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_RANDOM}", "random"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_EARS_REAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_setEarsDown",
        "message0": "%{BKY_ACTUATORS_SET_EARS_DOWN_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EARS",
                "options": [
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_LEFT}", "left"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_RIGHT}", "right"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_BOTH}", "duplicate"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_EARS_DOWN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_setEarsStanding",
        "message0": "%{BKY_ACTUATORS_SET_EARS_STANDING_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "EARS",
                "options": [
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_LEFT}", "left"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_RIGHT}", "right"],
                    ["%{BKY_ACTUATORS_SET_EARS_POSITION_BOTH}", "duplicate"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_SET_EARS_STANDING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)