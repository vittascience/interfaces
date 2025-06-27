/**
 * @fileoverview Process blocks for Raspberry Pi Pico.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // BLOCK START CORE1
    {
        "type": "process_on_start_core1",
        "message0": "%{BKY_PROCESS_ON_START_CORE1_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "style": "process_blocks",
        "tooltip": "%{BKY_PROCESS_ON_START_CORE1_TOOLTIP}"
    },

    // BLOCK FOREVER CORE1
    {
        "type": "process_forever_core1",
        "message0": "%{BKY_PROCESS_FOREVER_CORE1_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_FOREVER_TOOLTIP}",
        "style": "process_blocks",
    },
    // BLOCK EXIT CORE1
    {
        "type": "process_exit_core1",
        "message0": "%{BKY_PROCESS_EXIT_CORE1_TITLE}",
        "previousStatement": null,
        "style": "process_blocks",
        "tooltip": "%{BKY_PROCESS_EXIT_CORE1_TOOLTIP}"
    },
    // BLOCK GLOBAL VAR
    {
        "type": "process_global_var",
        "message0": "%{BKY_PROCESS_GLOBAL_VAR_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "globalVar"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_PROCESS_GLOBAL_VAR_TOOLTIP}",
        "style": "process_blocks",
    }
]);