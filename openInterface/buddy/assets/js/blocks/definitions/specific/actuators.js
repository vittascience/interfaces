/**
 * @fileoverview Actuators blocks for Buddy.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "actuators_buddySay",
        "message0": "%{BKY_ACTUATORS_BUDDY_SAY_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_ACTUATORS_BUDDY_SAY_YES}", "Yes"],
                    ["%{BKY_ACTUATORS_BUDDY_SAY_NO}", "No"],
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
            },
            {
                "type": "field_grid_dropdown",
                "name": "LOCK",
                "options": [
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "True"],
                    [{
                        'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                        'width': 12,
                        'height': 12,
                        'alt': 'Lock'
                    }, "False"],
                ]
            }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_BUDDY_SAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "actuators_buddySayStraight",
        "message0": "%{BKY_ACTUATORS_BUDDY_SAY_STRAIGHT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_BUDDY_SAY_YES}", "Yes"],
                ["%{BKY_ACTUATORS_BUDDY_SAY_NO}", "No"],
            ]
        },
        {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "LOCK",
            "options": [
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "True"],
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "False"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_BUDDY_SAY_STRAIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "actuators_stopMove",
        "message0": "%{BKY_ACTUATORS_STOP_MOVE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_STOP_YES_MOVE}", "Yes"],
                ["%{BKY_ACTUATORS_STOP_NO_MOVE}", "No"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_STOP_MOVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_getPosition",
        "message0": "%{BKY_ACTUATORS_GET_POSITION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIRECTION",
            "options": [
                ["%{BKY_ACTUATORS_GET_POSITION_YES}", "Yes"],
                ["%{BKY_ACTUATORS_GET_POSITION_NO}", "No"],
            ]
        }],
        "output": "Number",
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_GET_POSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "actuators_rotateBuddy",
        "message0": "%{BKY_ACTUATORS_ROTATE_BUDDY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "LOCK",
            "options": [
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "True"],
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "False"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_ROTATE_BUDDY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "actuators_rotateBuddyWithAngle",
        "message0": "%{BKY_ACTUATORS_ROTATE_BUDDY_WITH_ANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "LOCK",
            "options": [
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "True"],
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "False"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_ROTATE_BUDDY_WITH_ANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "actuators_emergencyStopMotors",
        "message0": "%{BKY_ACTUATORS_EMERGENCY_STOP_MOTORS_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_EMERGENCY_STOP_MOTORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "actuators_moveBuddy",
        "message0": "%{BKY_ACTUATORS_MOVE_BUDDY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "LOCK",
            "options": [
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "True"],
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "False"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_BUDDY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
    {
        "type": "actuators_moveBuddyWithDistance",
        "message0": "%{BKY_ACTUATORS_MOVE_BUDDY_WITH_DISTANCE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
        },
        {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "LOCK",
            "options": [
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "True"],
                [{
                    'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                    'width': 12,
                    'height': 12,
                    'alt': 'Lock'
                }, "False"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "actuators_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOVE_BUDDY_WITH_DISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "lock_tooltip"
        ]
    },
]); // END JSON EXTRACT (Do not delete this comment.)