/**
 * @fileoverview Input/Output blocks for CyberPi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin ESP32 blocks*/

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
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_INITCHRONOMETER_TOOLTIP}",
    },
    {
        "type": "io_initChronometer_simple",
        "message0": "%{BKY_IO_INITCHRONOMETER_TITLE}",
        "style": "io_blocks",
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
                ["(µ)", "MICRO"]
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETCHRONOMETER_TOOLTIP}",
    },

    /* Begin button blocks */

    // IO CONTROLLER - ON BUTTON PRESSED
    {
        "type": "io_controller_onButtonPressed",
        "message0": "%{BKY_IO_CONTROLLER_ON_BUTTON_PRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["Joystick UP", "up"],
                ["Joystick DOWN", "down"],
                ["Joystick LEFT", "left"],
                ["Joystick RIGHT", "right"],
                ["Joystick MID", "middle"],
                ["any Joystick", "any_direction"],
                ["any A or B", "any_button"],
                ["any", "any"]
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
        "tooltip": "%{BKY_IO_CONTROLLER_ON_BUTTON_PRESSED_TOOLTIP}",
    },

    // IO CONTROLLER - IS BUTTON PRESSED
    {
        "type": "io_controller_isButtonPressed",
        "message0": "%{BKY_IO_CONTROLLER_IS_BUTTON_PRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["Joystick UP", "up"],
                ["Joystick DOWN", "down"],
                ["Joystick LEFT", "left"],
                ["Joystick RIGHT", "right"],
                ["Joystick MID", "middle"],
                ["any Joystick", "any_direction"],
                ["any A or B", "any_button"],
                ["any", "any"]
            ]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_CONTROLLER_IS_BUTTON_PRESSED_TOOLTIP}",
    },

    // IO CONTROLLER - BUTTONS GET COUNT 
    {
        "type": "io_controller_get_count",
        "message0": "%{BKY_IO_CONTROLLER_BUTTONS_GET_COUNT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["Joystick UP", "up"],
                ["Joystick DOWN", "down"],
                ["Joystick LEFT", "left"],
                ["Joystick RIGHT", "right"],
                ["Joystick MID", "middle"],
                ["any Joystick", "any_direction"],
                ["any A or B", "any_button"],
                ["any", "any"]
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_CONTROLLER_BUTTONS_GET_COUNT_TOOLTIP}",
    },

    // IO CONTROLLER - BUTTONS RESET COUNT 
    {
        "type": "io_controller_reset_count",
        "message0": "%{BKY_IO_CONTROLLER_BUTTONS_RESET_COUNT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["Joystick UP", "up"],
                ["Joystick DOWN", "down"],
                ["Joystick LEFT", "left"],
                ["Joystick RIGHT", "right"],
                ["Joystick MID", "middle"],
                ["any Joystick", "any_direction"],
                ["any A or B", "any_button"],
                ["any", "any"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_CONTROLLER_BUTTONS_RESET_COUNT_TOOLTIP}",
    },

    /* Begin Events blocks */

    // EVENTS - ON START
    {
        "type": "io_event_start",
        "message0": "%{BKY_IO_EVENT_START_TITLE}",
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "tooltip": "%{BKY_IO_EVENT_START_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "disable_duplicates"
        ]
    },

    // EVENTS - ON BUTTON PRESSED
    {
        "type": "io_event_is_press",
        "message0": "%{BKY_IO_EVENT_IS_PRESS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["Joystick UP", "up"],
                ["Joystick DOWN", "down"],
                ["Joystick LEFT", "left"],
                ["Joystick RIGHT", "right"],
                ["Joystick MID", "middle"],
                ["any Joystick", "any_direction"],
                ["any A or B", "any_button"],
                ["any", "any"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "tooltip": "%{BKY_IO_EVENT_IS_PRESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "disable_duplicates"
        ]
    },

    // EVENTS - CYBERPI BROADCAST
    {
        "type": "io_cyberpi_broadcast",
        "message0": "%{BKY_IO_CYBERPI_BROADCAST_TITLE}",
        "args0": [{
            "type": "field_input",
            "name": "MESSAGE"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_CYBERPI_BROADCAST_TOOLTIP}",
    },

    // EVENTS - MESSAGE RECEIVED
    {
        "type": "io_event_receive",
        "message0": "%{BKY_IO_EVENT_RECEIVE_TITLE}",
        "args0": [{
            "type": "field_input",
            "name": "MESSAGE"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_EVENT_RECEIVE_TOOLTIP}",
    },

    /*Begin control pins blocks*/

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

    // BLOCK READ DIGITAL PIN
    {
        "type": "io_readDigitalPin",
        "message0": "%{BKY_IO_READDIGITALPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "output": "Boolean",
        "tooltip": "%{BKY_IO_READDIGITALPIN_TOOLTIP}",
    },

    // BLOCK WRITE DIGITAL PIN
    {
        "type": "io_writeDigitalPin",
        "message0": "%{BKY_IO_WRITEDIGITALPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WRITEDIGITALPIN_TOOLTIP}",
    },

    // // BLOCK READ ANALOG PIN
    // {
    //     "type": "io_readAnalogPin",
    //     "message0": "%{BKY_IO_READANALOGPIN_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
    //     }],
    //     "output": "Number",
    //     "tooltip": "%{BKY_IO_READANALOGPIN_TOOLTIP}",
    //     "extensions": [
    //          "block_init_helpurl",
    //         "block_init_color"
    //     ],
    // },

    // BLOCK WRITE ANALOG PIN
    {
        "type": "io_writePwm",
        "message0": "%{BKY_IO_WRITEPWMPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WRITEPWMPIN_TOOLTIP}",
    },

    // // BLOCK WRITE ANALOG PIN
    // {
    //     "type": "io_writeAnalogPin",
    //     "message0": "%{BKY_IO_WRITEANALOGPIN_TITLE}",
    //     "args0": [{
    //         "type": "input_value",
    //         "name": "VALUE",
    //         "check": "Number"
    //     }, {
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.DAC[Blockly.Constants.getSelectedBoard()]
    //     }],
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "inputsInline": true,
    //     "tooltip": "%{BKY_IO_WRITEANALOGPIN_TOOLTIP}",
    //     "extensions": [
    //         "block_init_helpurl",
    //         "block_init_color"
    //     ],
    // },

    // BLOCK SET PWM
    {
        "type": "io_setPwm",
        "message0": "%{BKY_IO_SETPWM_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_SETPWM_TOOLTIP}",
    },

    // BLOCK STOP PWM
    {
        "type": "io_stopPwm",
        "message0": "%{BKY_IO_STOPPWM_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_STOPPWM_TOOLTIP}",
    },

    // BLOCK CONVERT TO VOLTAGE
    {
        "type": "io_getVoltage",
        "message0": "%{BKY_IO_GETVOLTAGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "RESOLUTION",
            "options": [
                ["1023", "1023"],
                ["4095", "4095"],
                ["511", "511"],
                ["2047", "2047"]
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETVOLTAGE_TOOLTIP}",
    },

]); // END JSON EXTRACT (Do not delete this comment.)