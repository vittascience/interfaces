/**
 * @fileoverview Start blocks for Blue-bot.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // BLOCK START
    {
        "type": "on_start",
        "message0": "%{BKY_ON_START_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "loops_blocks",
        "tooltip": "%{BKY_ON_START_TOOLTIP}"
    },

    // BLOCK FOREVER
    {
        "type": "forever",
        "message0": "%{BKY_FOREVER_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "loops_blocks",
        "tooltip": "%{BKY_FOREVER_TOOLTIP}"
    },

    // BLOCK START
    {
        "type": "scratch_on_start",
        "message0": "%{BKY_ON_START_TITLE}",
        "nextStatement": null,
        "style": "control_blocks",
        "tooltip": "%{BKY_ON_START_TOOLTIP}"
    },

    // BLOCK FOREVER
    {
        "type": "scratch_forever",
        "message0": "%{BKY_FOREVER_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "control_blocks",
        "tooltip": "%{BKY_FOREVER_TOOLTIP}"
    }

]);  // END JSON EXTRACT (Do not delete this comment.)
