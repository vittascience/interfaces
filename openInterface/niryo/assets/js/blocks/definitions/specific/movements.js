/**
 * @fileoverview Movements blocks for Niryo Ned2.
 */


Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "niryo_joints",
        "message0": "%{BKY_NIRYO_JOINTS_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "JOINT_1",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "JOINT_2",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "JOINT_3",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "JOINT_4",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "JOINT_5",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "JOINT_6",
                "check": "Number"
            },
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "movement_inputs_blocks",
        "tooltip": "%{BKY_NIRYO_JOINTS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "niryo_move_joints",
        "message0": "%{BKY_NIRYO_MOVE_JOINTS_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "JOINTS",
                "check": null
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_NIRYO_MOVE_JOINTS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // pose 
    {
        'type': 'niryo_sleep_pose',
        'message0': '%{BKY_NIRYO_SLEEP_POSE_TITLE}',
        'previousStatement': null,
        'nextStatement': null,
        'style': 'movement_blocks',
        'tooltip': '%{BKY_NIRYO_SLEEP_POSE_TOOLTIP}',
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "niryo_pose",
        "message0": "%{BKY_NIRYO_POSE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Z",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "ROLL",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "PITCH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "YAW",
                "check": "Number"
            },
        ],
        "output": "Number",
        "inputsInline": true,
        "style": "movement_inputs_blocks",
        "tooltip": "%{BKY_NIRYO_POSE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "niryo_move_pose",
        "message0": "%{BKY_NIRYO_MOVE_POSE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        '%{BKY_NIRYO_MOVE_POSE_TYPE_STANDARD}',
                        "_pose"
                    ],
                    [
                        '%{BKY_NIRYO_MOVE_POSE_TYPE_LINEAR}',
                        "_linear_pose"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "POSE",
                "check": null
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_NIRYO_MOVE_POSE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // shift pose
    {
        "type": "niryo_shift_pose",
        "message0": "%{BKY_NIRYO_SHIFT_POSE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        '%{BKY_NIRYO_MOVE_POSE_TYPE_STANDARD}',
                        "_pose"
                    ],
                    [
                        '%{BKY_NIRYO_MOVE_POSE_TYPE_LINEAR}',
                        "_linear_pose"
                    ]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "AXIS",
                "options": [
                    [
                        '%{BKY_NIRYO_SHIFT_POSE_AXIS_X}',
                        "AXIS_X"
                    ],
                    [
                        '%{BKY_NIRYO_SHIFT_POSE_AXIS_Y}',
                        "AXIS_Y"
                    ],
                    [
                        '%{BKY_NIRYO_SHIFT_POSE_AXIS_Z}',
                        "AXIS_Z"
                    ],
                    [
                        '%{BKY_NIRYO_SHIFT_POSE_ROT_ROLL}',
                        "ROT_ROLL"
                    ],
                    [
                        '%{BKY_NIRYO_SHIFT_POSE_ROT_PITCH}',
                        "ROT_PITCH"
                    ],
                    [
                        '%{BKY_NIRYO_SHIFT_POSE_ROT_YAW}',
                        "ROT_YAW"
                    ]
                ],
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "movement_blocks",
        "tooltip": "%{BKY_NIRYO_SHIFT_POSE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]);