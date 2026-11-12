/**
 * @fileoverview Input/Output blocks for Lego Spike.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK PAUSE
    {
        "type": "io_pause",
        "message0": "%{BKY_IO_WAIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_IO_WAIT_SECOND}", "SEC"],
                ["%{BKY_IO_WAIT_MILLISECOND}", "MILLI"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WAIT_TOOLTIP}",
    },

    // BLOCK WAIT UNTIL JSON
    {
        "type": "io_waitUntil",
        "message0": "%{BKY_IO_WAIT_UNTIL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "UNTIL",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WAIT_UNTIL_TOOLTIP}",
    }

]); // END JSON EXTRACT (Do not delete this comment.)