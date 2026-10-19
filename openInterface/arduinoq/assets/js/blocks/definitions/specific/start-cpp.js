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

    // BLOCK START + FOREVER (single block of new projects; the other start blocks are kept for existing projects)
    {
        "type": "cpp_on_start_forever",
        "message0": "%{BKY_CPP_ON_START_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "message2": "%{BKY_CPP_FOREVER_TITLE}",
        "message3": "%1",
        "args3": [{
            "type": "input_statement",
            "name": "LOOP"
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

// Common "repeat forever" loop, usable on the C++ and the Python threads (Base > Loops)
Blockly.defineBlocksWithJsonArray([{
    "type": "controls_forever",
    "message0": "%{BKY_CONTROLS_FOREVER_TITLE} %1 %2",
    "args0": [{
        "type": "input_dummy"
    }, {
        "type": "input_statement",
        "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "%{BKY_CONTROLS_FOREVER_TOOLTIP}",
    "extensions": [
        "block_init_color"
    ]
}]);
