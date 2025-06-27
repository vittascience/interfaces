/**
 * @fileoverview Display blocks for Python.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // Block to print text in python shell.
    {
        "type": "display_print",
        "message0": "%{BKY_DISPLAY_PRINT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_PRINT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for asking user to set text value by shell.
    {
        "type": "display_input",
        "message0": "%{BKY_DISPLAY_INPUT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }],
        "output": "String",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_INPUT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Block for asking user to set number value by shell.
    {
        "type": "display_input_number",
        "message0": "%{BKY_DISPLAY_INPUT_NUMBER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }],
        "output": "Number",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_INPUT_NUMBER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK PAUSE
    {
        "type": "time_sleep",
        "message0": "%{BKY_TIME_SLEEP_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_TIME_SLEEP_SECOND}", "SEC"],
                ["%{BKY_TIME_SLEEP_MILLISECOND}", "MILLI"],
                ["%{BKY_TIME_SLEEP_MICROSECOND}", "MICRO"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_TIME_SLEEP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "time_time",
        "message0": "%{BKY_TIME_TIME_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_TIME_SLEEP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
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
        "style": "display_blocks",
        "tooltip": "%{BKY_TIME_WAIT_UNTIL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK INIT CHRONOMETER
    {
        "type": "time_initChronometer",
        "message0": "%{BKY_TIME_INITCHRONOMETER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_TIME_INITCHRONOMETER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET CHRONOMETER
    {
        "type": "time_getChronometer",
        "message0": "%{BKY_TIME_GETCHRONOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(s)", "SEC"],
                ["(ms)", "MILLI"],
                ["(µ)", "MICRO"]
            ]
        }],
        "output": "Number",
        "style": "display_blocks",
        "tooltip": "%{BKY_TIME_GETCHRONOMETER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET DATE
    {
        "type": "time_getDate",
        "message0": "%{BKY_TIME_GET_DATE_TITLE}",
        "output": "String",
        "style": "display_blocks",
        "tooltip": "%{BKY_TIME_GET_DATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)