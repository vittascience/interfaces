/**
 * @fileoverview Input/Output blocks for Codey.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK ON/OFF BOOLEAN
    {
        "type": "io_digital_signal",
        "message0": "%{BKY_IO_DIGITAL_SIGNAL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BOOL",
            "options": [
                ["%{BKY_IO_DIGITAL_SIGNAL_HIGH}", "HIGH"],
                ["%{BKY_IO_DIGITAL_SIGNAL_LOW}", "LOW"]
            ]
        }],
        "output": "Boolean",
         "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_DIGITAL_SIGNAL_TOOLTIP}",
    },

    /*Begin Codey blocks*/

    // BLOCK PAUSE
    {
        "type": "io_pause",
        "message0": "%{BKY_IO_WAIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_IO_WAIT_SECOND}", "SEC"],
                ["%{BKY_IO_WAIT_MILLISECOND}", "MILLI"],
                ["%{BKY_IO_WAIT_MICROSECOND}", "MICRO"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WAIT_TOOLTIP}",
    },

    // BLOCK WAIT UNTIL
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
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_INITCHRONOMETER_TOOLTIP}",
    },
    {
        "type": "io_initChronometer_simple",
        "message0": "%{BKY_IO_INITCHRONOMETER_TITLE}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "output": "Number",
        "tooltip": "%{BKY_IO_INITCHRONOMETER_TOOLTIP}",
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
                ["(ms)", "MILLI"],
                ["(µs)", "MICRO"]
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETCHRONOMETER_TOOLTIP}",
    },

    // BLOCK ON BUTTON PRESSED
    {
        "type": "io_onButtonPressed",
        "message0": "%{BKY_IO_ONBUTTONPRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["C", "c"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ONBUTTONPRESSED_TOOLTIP}",
    },

    // BLOCK BUTTON STATE
    {
        "type": "io_button_state",
        "message0": "%{BKY_IO_BUTTON_STATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["C", "c"]
            ]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_BUTTON_STATE_TOOLTIP}",
    },

    // BLOCK POTENTIOMETER IO GET VALUE
    {
        "type": "io_potentiometer_get_value",
        "message0": "%{BKY_IO_POTENTIOMETER_GET_VALUE_TITLE}",
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_POTENTIOMETER_GET_VALUE_TOOLTIP}"
    },

]); // END JSON EXTRACT (Do not delete this comment.)