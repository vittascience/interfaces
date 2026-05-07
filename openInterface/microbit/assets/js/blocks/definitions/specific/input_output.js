/**
 * @fileoverview Input/Output blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin micro:bit blocks*/

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
                ["A+B", "a+b"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_ISPRESSED}", "is_"],
                ["%{BKY_IO_WASPRESSED}", "was_"],
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

    // BLOCK ON PIN PRESSED
    {
        "type": "io_onPinPressed",
        "message0": "%{BKY_IO_ONPINTOUCHED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_TOUCH_PINS
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
        "tooltip": "%{BKY_IO_ONPINTOUCHED_TOOLTIP}",
    },

    // BLOCK ON MOUVEMENT
    {
        "type": "io_onMovement",
        "message0": "%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOV",
            "options": [
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_SHAKE}", "shake"],
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_UP}", "up"], //logo up
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_DOWN}", "down"], //logo down
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_FACE_UP}", "face up"], //screen up
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_FACE_DOWN}", "face down"], //screen down
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_LEFT}", "left"], //tilt left
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_RIGHT}", "right"], //tilt right
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_FREEFALL}", "freefall"],
                ["3g", "3g"],
                ["6g", "6g"],
                ["8g", "8g"]
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
        "tooltip": "%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_TOOLTIP}",
    },

    // BLOCK BUTTONS - IS BUTTON PRESSED
    {
        "type": "io_isButtonPressed",
        "message0": "%{BKY_IO_ISBUTTONPRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["A+B", "a+b"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_ISPRESSED}", "is_"],
                ["%{BKY_IO_WASPRESSED}", "was_"],
            ]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ISBUTTONPRESSED_TOOLTIP}",
    },

    // BLOCK BUTTONS - IS PIN TOUCHED
    {
        "type": "io_isPinPressed",
        "message0": "%{BKY_IO_ISPINTOUCHED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_TOUCH_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ISPINTOUCHED_TOOLTIP}",
    },

    // BLOCK BUTTONS - GET PRESSES 
    {
        "type": "io_buttons_getPresses",
        "message0": "%{BKY_IO_BUTTONS_GET_PRESSES_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"]
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_BUTTONS_GET_PRESSES_TOOLTIP}",
    },

    // BLOCK RUN EVERY
    {
        "type": "io_runEvery",
        "message0": "%{BKY_IO_RUN_EVERY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "H",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "S",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MS",
            "check": "Number"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_RUN_EVERY_TOOLTIP}",
    },

    {
        "type": "io_microbit_reset",
        "message0": "%{BKY_IO_MICROBIT_RESET_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_MICROBIT_RESET_TOOLTIP}",
    },

    /*Begin microphone module blocks */

    // BLOCK MICROPHONE _ ON SOUND DETECTED
    {
        "type": "io_micro_onSoundDetected",
        "message0": "%{BKY_IO_MICRO_ONSOUNDDETECTED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_MICRO_LOUD}", "LOUD"],
                ["%{BKY_IO_MICRO_QUIET}", "QUIET"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_IO_MICRO_IS}", "IS"],
                ["%{BKY_IO_MICRO_WAS}", "WAS"]
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
        "tooltip": "%{BKY_IO_MICRO_ONSOUNDDETECTED_TOOLTIP}",
    },

    // BLOCK MICROPHONE _ GET CURRENT SOUND
    {
        "type": "io_micro_getCurrentSound",
        "message0": "%{BKY_IO_MICRO_GETCURRENTSOUND_TITLE}",
        "output": "String",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_MICRO_GETCURRENTSOUND_TOOLTIP}",
    },

    // BLOCK MICROPHONE _  WAS SOUND DETECTED
    {
        "type": "io_micro_wasSoundDetected",
        "message0": "%{BKY_IO_MICRO_WASSOUNDDETECTED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_MICRO_LOUD}", "LOUD"],
                ["%{BKY_IO_MICRO_QUIET}", "QUIET"]
            ]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_MICRO_WASSOUNDDETECTED_TOOLTIP}",
    },

    // BLOCK MICROPHONE _ GET SOUND LEVEL
    {
        "type": "io_micro_getSoundLevel",
        "message0": "%{BKY_IO_MICRO_GETSOUNDLEVEL_TITLE}",
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_MICRO_GETSOUNDLEVEL_TOOLTIP}",
    },

    // BLOCK MICROPHONE _ GET HISTORY SOUND
    {
        "type": "io_micro_getHistorySounds",
        "message0": "%{BKY_IO_MICRO_GETHISTORYSOUND_TITLE}",
        "output": "Array",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_MICRO_GETHISTORYSOUND_TOOLTIP}",
    },

    // BLOCK MICROPHONE _ ON LOUD/QUIET SOUND WAS
    {
        "type": "io_micro_setSoundThreshold",
        "message0": "%{BKY_IO_MICRO_SETSOUNDTHRESHOLD_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_MICRO_LOUD}", "LOUD"],
                ["%{BKY_IO_MICRO_QUIET}", "QUIET"]
            ]
        }, {
            "type": "input_value",
            "name": "THRESH",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_MICRO_SETSOUNDTHRESHOLD_TOOLTIP}",
    },

    // BLOCK MICROHONE _ GET (LOUD/QUIET) CONSTANT
    {
        "type": "io_micro_soundCondition",
        "message0": "%{BKY_IO_MICRO_SOUNDCONDITION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_MICRO_LOUD}", "LOUD"],
                ["%{BKY_IO_MICRO_QUIET}", "QUIET"]
            ]
        }],
        "output": "String",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_MICRO_SOUNDCONDITION_TOOLTIP}",
    },

    /*Begin external module blocks*/

    // BLOCK GROVE KEYPAD _ GET NUMBER
    {
        "type": "io_getKeypadNumber",
        "message0": "%{BKY_IO_GROVEKEYPAD_GETNUMBER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "String",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_GROVEKEYPAD_GETNUMBER_TOOLTIP}",
    },

    /*Begin control pins blocks*/

    // BLOCK WRITE ANALOG 
    {
        "type": "io_writeAnalogPin",
        "message0": "%{BKY_IO_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_WRITEANALOGPIN_TOOLTIP}",
    },

    // BLOCK SET PWM
    {
        "type": "io_setPwm",
        "message0": "%{BKY_IO_SETPWM_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PERIOD",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(ms)", "MS"],
                ["(μs)", "US"]
            ]
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
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_SETPWM_TOOLTIP}",
    },

    // BLOCK PULSE IN HIGH/LOW 
    {
        "type": "io_readPulseIn",
        "message0": "%{BKY_IO_READPULSEIN_TITLE}",
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
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_READPULSEIN_TOOLTIP}",
    },
    // BLOCK SET PULL PIN UP/DOWN/NONE 
    {
        "type": "io_setPull",
        "message0": "%{BKY_IO_SET_PULL_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
            },
            {
                "type": "field_grid_dropdown",
                "name": "STATE",
                "options": [
                    ["%{BKY_IO_SET_PULL_UP}", "PULL_UP"],
                    ["%{BKY_IO_SET_PULL_DOWN}", "PULL_DOWN"],
                    ["%{BKY_IO_SET_NO_PULL}", "NO_PULL"]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_SET_PULL_TOOLTIP}"
    },
    {
        "type": "io_exec",
        "message0": "%{BKY_IO_EXEC_TITLE}",
        "args0": [
        {
            "type": "input_value",
            "name": "CODE",
            "check": "String"
        }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_EXEC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)