/**
 * @fileoverview Time generators for Nao.
 */



Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "time_pause",
        "message0": "%{BKY_TIME_WAIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_TIME_WAIT_SECOND}", "SECOND"],
                ["%{BKY_TIME_WAIT_MILLISECOND}", "MILLI"],
                ["%{BKY_TIME_WAIT_MICROSECOND}", "MICRO"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TIME_WAIT_TOOLTIP}",
    },

    // BLOCK WAIT UNTIL JSON
    {
        "type": "time_waitUntil",
        "message0": "%{BKY_TIME_WAIT_UNTIL_TITLE}",
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
        "tooltip": "%{BKY_TIME_WAIT_UNTIL_TOOLTIP}",
    }
]);