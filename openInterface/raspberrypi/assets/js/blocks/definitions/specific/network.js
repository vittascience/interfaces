/**
 * @fileoverview Wifi blocks for Raspberry Pi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // Block Pi name
    {
        "type": "network_get_pi_name",
        "message0": "%{BKY_NETWORK_GET_PI_NAME_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "PINAME",
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "network_blocks",
        "tooltip": "%{BKY_NETWORK_GET_PI_NAME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)
