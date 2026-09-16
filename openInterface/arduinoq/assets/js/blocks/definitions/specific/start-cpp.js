/**
 * @fileoverview Start blocks for Arduino Q cpp.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // BLOCK START
    {
        "type": "cpp_on_start",
        "message0": "%{BKY_CPP_ON_START_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "cpp_category",
        "tooltip": "%{BKY_CPP_ON_START_TOOLTIP}",
        "extensions": [
            "disable_duplicates"
        ]
    },

    // BLOCK FOREVER
    {
        "type": "cpp_forever",
        "message0": "%{BKY_CPP_FOREVER_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "cpp_category",
        "tooltip": "%{BKY_CPP_FOREVER_TOOLTIP}"
    },

    // BLOCK START
    {
        "type": "cpp_scratch_on_start",
        "message0": "%{BKY_CPP_ON_START_TITLE}",
        "nextStatement": null,
        "style": "cpp_category",
        "tooltip": "%{BKY_CPP_ON_START_TOOLTIP}",
        "extensions": [
            "disable_duplicates"
        ]
    },

    // BLOCK FOREVER
    {
        "type": "cpp_scratch_forever",
        "message0": "%{BKY_CPP_FOREVER_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "style": "cpp_category",
        "tooltip": "%{BKY_CPP_FOREVER_TOOLTIP}"
    }

]);  // END JSON EXTRACT (Do not delete this comment.)
