/**
 * @fileoverview Input/Output blocks for TI-83 Premium CE.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /** ti_system blocks */

    // BLOCK TI SYSTEM - RECALL LIST
    {
        "type": "ti_system_recall_list",
        "message0": "%{BKY_TI_SYSTEM_RECALL_LIST_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "INDEX",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"]
            ]
        }],
        "output": "Array",
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_RECALL_LIST_TOOLTIP}"
    },

    // BLOCK TI SYSTEM - STORE LIST
    {
        "type": "ti_system_store_list",
        "message0": "%{BKY_TI_SYSTEM_STORE_LIST_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LIST",
            "check": "Array"
        }, {
            "type": "field_grid_dropdown",
            "name": "INDEX",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_STORE_LIST_TOOLTIP}"
    },

    // BLOCK TI SYSTEM - RECALL REGEQ
    {
        "type": "ti_system_recall_RegEQ",
        "message0": "%{BKY_TI_SYSTEM_RECALL_REGEQ_TITLE}",
        "output": "String",
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_RECALL_REGEQ_TOOLTIP}"
    },

    // BLOCK TI SYSTEM - WHILE CONDITION
    {
        "type": "ti_system_while_condition",
        "message0": "%{BKY_TI_SYSTEM_WHILE_CONDITION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "CONDITION",
            "check": "Boolean"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_WHILE_CONDITION_TOOLTIP}"
    },

    // BLOCK TI SYSTEM - IF CONDITION
    {
        "type": "ti_system_if_condition",
        "message0": "%{BKY_TI_SYSTEM_IF_CONDITION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "CONDITION",
            "check": "Boolean"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_IF_CONDITION_TOOLTIP}"
    },

    // BLOCK ESCAPE JSON
    {
        "type": "ti_io_escape",
        "message0": "%{BKY_TI_SYSTEM_ESCAPE_TITLE}",
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_ESCAPE_TOOLTIP}",
    },

    // BLOCK TI SYSTEM - DISP AT
    {
        "type": "ti_system_disp_at",
        "message0": "%{BKY_TI_SYSTEM_DISP_AT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "LINE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "ALIGN",
            "options": [
                ["%{BKY_TI_SYSTEM_DISP_AT_LEFT}", "left"],
                ["%{BKY_TI_SYSTEM_DISP_AT_CENTER}", "center"],
                ["%{BKY_TI_SYSTEM_DISP_AT_RIGHT}", "right"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_DISP_AT_TOOLTIP}",
    },

    // BLOCK TI SYSTEM - DISP CLR
    {
        "type": "ti_system_disp_clr",
        "message0": "%{BKY_TI_SYSTEM_DISP_CLR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_DISP_CLR_TOOLTIP}",
    },

    // BLOCK TI SYSTEM - DISP WAIT
    {
        "type": "ti_system_disp_wait",
        "message0": "%{BKY_TI_SYSTEM_DISP_WAIT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_DISP_WAIT_TOOLTIP}",
    },

    // BLOCK TI SYSTEM - DISP CURSOR
    {
        "type": "ti_system_disp_cursor",
        "message0": "%{BKY_TI_SYSTEM_DISP_CURSOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_DISP_CURSOR_TOOLTIP}",
    },

    // BLOCK TI SYSTEM - SLEEP (in seconds)
    {
        "type": "ti_system_sleep",
        "message0": "%{BKY_TI_SYSTEM_SLEEP_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_SECOND}", "SECOND"],
                ["%{BKY_MILLISECOND}", "MILLI"],
                ["%{BKY_MICROSECOND}", "MICRO"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_SLEEP_TOOLTIP}",
    },

    // BLOCK TI SYSTEM - WAIT KEY
    {
        "type": "ti_system_wait_key",
        "message0": "%{BKY_TI_SYSTEM_WAIT_KEY_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_WAIT_KEY_TOOLTIP}",
    },
    // BLOCK TI SYSTEM - WAIT KEY for value
    {
        "type": "ti_system_wait_key_value",
        "message0": "%{BKY_TI_SYSTEM_WAIT_KEY_TITLE}",
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_SYSTEM_WAIT_KEY_TOOLTIP}",
    },

    /*Begin time blocks*/

    // INNOVATOR HUB PAUSE JSON
    {
        "type": "io_wait",
        "message0": "%{BKY_IO_WAIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_IO_WAIT_SECOND}", "SECOND"],
                ["%{BKY_IO_WAIT_MILLISECOND}", "MILLI"],
                ["%{BKY_IO_WAIT_MICROSECOND}", "MICRO"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_WAIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
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
    },

    // BLOCK INIT CHRONOMETER
    {
        "type": "io_initChronometer",
        "message0": "%{BKY_IO_INITCHRONOMETER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_INITCHRONOMETER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK GET CHRONOMETER
    {
        "type": "io_getChronometer",
        "message0": "%{BKY_IO_GETCHRONOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(s)", "SEC"],
                ["(ms)", "MS"]
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETCHRONOMETER_TOOLTIP}",
    },

    /*Begin console blocks*/

    // Block - print text
    {
        "type": "ti_io_print",
        "message0": "%{BKY_TI_IO_PRINT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_TI_IO_PRINT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // Block - clear calculator shell text
    {
        "type": "ti_io_disp_clr",
        "message0": "%{BKY_TI_IO_CLEAR_SHELL_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_TI_IO_CLEAR_SHELL_TOOLTIP}",
    },

    // Block for asking user to set text value by shell.
    {
        "type": "ti_io_input_text",
        "message0": "%{BKY_TI_IO_INPUT_TEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }],
        "output": "String",
        "style": "io_blocks",
        "tooltip": "%{BKY_TI_IO_INPUT_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for asking user to set number value by shell.
    {
        "type": "ti_io_input_number",
        "message0": "%{BKY_TI_IO_INPUT_NUMBER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }],
        "output": "Number",
        "style": "io_blocks",
        "tooltip": "%{BKY_TI_IO_INPUT_NUMBER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
