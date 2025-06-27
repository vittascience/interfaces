/**
 * @fileoverview Utility blocks for Niryo Ned2.
 */


Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "utility_wait",
        "message0": "%{BKY_UTILITY_WAIT_TITLE}",
        "args0": [
            {
                "type": "field_number",
                "name": "SECONDS",
                "check": "Number",
                "value": 1
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_UTILITY_WAIT_TOOLTIP}",
    },
    {
        "type": "utility_break_point",
        "message0": "%{BKY_UTILITY_BREAK_POINT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_UTILITY_BREAK_POINT_TOOLTIP}",
    },
    // comment block
    {
        'type': 'utility_comment',
        'message0': '%{BKY_UTILITY_COMMENT_TITLE}',
        'args0': [
            {
                'type': 'field_input',
                'name': 'COMMENT_TEXT',
                'text': ''
            }
        ],
        'previousStatement': null,
        'nextStatement': null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        'tooltip': '%{BKY_UTILITY_COMMENT_TOOLTIP}',
    }
]);