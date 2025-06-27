/**
 * @fileoverview Random blocks for Blockly.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    {
        "type": "random_random",
        "message0": "%{BKY_RANDOM_RANDOM_TITLE}",
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_RANDOM_RANDOM_TOOLTIP}",
    },

    {
        "type": "random_randint",
        "message0": "%{BKY_RANDOM_RANDINT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MAX",
            "check": "Number"
        }],
        "output": "Number",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_RANDOM_RANDINT_TOOLTIP}",
    },

    {
        "type": "random_uniform",
        "message0": "%{BKY_RANDOM_UNIFORM_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MAX",
            "check": "Number"
        }],
        "output": "Number",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_RANDOM_UNIFORM_TOOLTIP}",
    },

    {
        "type": "random_randrange",
        "message0": "%{BKY_RANDOM_RANDRANGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "START",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "END",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "STEP",
            "check": "Number"
        }],
        "output": "Number",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_RANDOM_RANDRANGE_TOOLTIP}",
    },

    {
        "type": "random_choice",
        "message0": "%{BKY_RANDOM_CHOICE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SEQUENCE",
            "check": "Array"
        }],
        "output": "Number",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_RANDOM_CHOICE_TOOLTIP}",
    },

    {
        "type": "random_seed",
        "message0": "%{BKY_RANDOM_SEED_TITLE}",
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_RANDOM_SEED_TOOLTIP}",
    }
]);