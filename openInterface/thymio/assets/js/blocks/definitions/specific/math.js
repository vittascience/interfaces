/**
 * @fileoverview Math blocks for Thymio.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "math_thymio_copy",
        "message0": "%{BKY_MATH_THYMIO_COPY_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
        ],
        // "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_COPY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "math_thymio_add",
        "message0": "%{BKY_MATH_THYMIO_ADD_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}",
                "check": "Number"
            },
            {
                "type": "field_variable",
                "name": "VAR2",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME2}",
                "check": "Number"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}",
                "check": "Number"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_ADD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "math_thymio_subtract",
        "message0": "%{BKY_MATH_THYMIO_SUBTRACT_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}"
            },
            {
                "type": "field_variable",
                "name": "VAR2",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME2}"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_SUBTRACT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "math_thymio_multiply",
        "message0": "%{BKY_MATH_THYMIO_MULTIPLY_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}"
            },
            {
                "type": "field_variable",
                "name": "VAR2",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME2}"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_MULTIPLY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "math_thymio_divide",
        "message0": "%{BKY_MATH_THYMIO_DIVIDE_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}"
            },
            {
                "type": "field_variable",
                "name": "VAR2",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME2}"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_DIVIDE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": 'math_thymio_min',
        "message0": "%{BKY_MATH_THYMIO_MIN_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}"
            },
            {
                "type": "field_variable",
                "name": "VAR2",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME2}"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_MIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "math_thymio_max",
        "message0": "%{BKY_MATH_THYMIO_MAX_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}"
            },
            {
                "type": "field_variable",
                "name": "VAR2",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME2}"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_MAX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "math_thymio_random",
        "message0": "%{BKY_MATH_THYMIO_RANDOM_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_RANDOM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "math_thymio_sin",
        "message0": "%{BKY_MATH_THYMIO_SIN_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_SIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "math_thymio_cos",
        "message0": "%{BKY_MATH_THYMIO_COS_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_COS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //sqrt
    {
        "type": "math_thymio_sqrt",
        "message0": "%{BKY_MATH_THYMIO_SQRT_TITLE}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR1",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME1}"
            },
            {
                "type": "field_variable",
                "name": "RESULT",
                "variable": "%{BKY_MATH_THYMIO_RESULT_DEFAULT_NAME}"
            },
            
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "math_blocks",
        "tooltip": "%{BKY_MATH_THYMIO_SQRT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]);// END JSON EXTRACT (Do not delete this comment.)