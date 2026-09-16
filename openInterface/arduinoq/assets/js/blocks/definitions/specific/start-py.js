/**
 * @fileoverview Start blocks for Arduino Q python.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // BLOCK START
    {
        "type": "py_on_start",
        "message0": "%{BKY_PY_ON_START_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "python_category",
        "tooltip": "%{BKY_PY_ON_START_TOOLTIP}",
        "extensions": [
            "disable_duplicates"
        ]
    },

    // BLOCK FOREVER
    {
        "type": "py_forever",
        "message0": "%{BKY_PY_FOREVER_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "python_category",
        "tooltip": "%{BKY_PY_FOREVER_TOOLTIP}"
    },

    // BLOCK START
    {
        "type": "py_scratch_on_start",
        "message0": "%{BKY_PY_ON_START_TITLE}",
        "nextStatement": null,
        "style": "python_category",
        "tooltip": "%{BKY_PY_ON_START_TOOLTIP}",
        "extensions": [
            "disable_duplicates"
        ]
    },

    // BLOCK FOREVER
    {
        "type": "py_scratch_forever",
        "message0": "%{BKY_FOREVER_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "python_category",
        "tooltip": "%{BKY_FOREVER_TOOLTIP}"
    }

]);  // END JSON EXTRACT (Do not delete this comment.)
