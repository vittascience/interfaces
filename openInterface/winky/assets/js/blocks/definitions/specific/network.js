/**
 * @fileoverview Network blocks for Winky.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "network_connectWinky",
        "message0": "%{BKY_NETWORK_CONNECT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_CONNECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)