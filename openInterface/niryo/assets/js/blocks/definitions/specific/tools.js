/**
 * @fileoverview Movements blocks for Niryo Ned2.
 */


Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        'type': 'tool_open_gripper',
        'message0': '%{BKY_TOOL_OPEN_GRIPPER_TITLE}',
        "args0": [
            {
                "type": "field_dropdown",
                'name': 'SPEED',
                'options': [
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_1}', '100'],
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_2}', '250'],
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_3}', '300'],
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_4}', '400'],
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_5}', '500'],
                ]
            }
        ],
        'previousStatement': null,
        'nextStatement': null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        'tooltip': '%{BKY_TOOL_OPEN_GRIPPER_TOOLTIP}',

    },
    {
        'type': 'tool_close_gripper',
        'message0': '%{BKY_TOOL_CLOSE_GRIPPER_TITLE}',
        "args0": [
            {
                "type": "field_dropdown",
                'name': 'SPEED',
                'options': [
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_1}', '100'],
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_2}', '250'],
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_3}', '300'],
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_4}', '400'],
                    ['%{BKY_TOOL_OPEN_GRIPPER_SPEED_5}', '500'],
                ]
            }
        ],
        'previousStatement': null,
        'nextStatement': null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        'tooltip': '%{BKY_TOOL_CLOSE_GRIPPER_TOOLTIP}',

    },
]);