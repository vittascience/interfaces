/**
 * @fileoverview Input/Output blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin micro:bit blocks*/

    // MICRO:BIT PAUSE JSON
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
                ["%{BKY_IO_WAIT_SECOND}", "SECOND"],
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

    // BLOCK RESET CHRONOMETER
    {
        "type": "io_resetChronometer",
        "message0": "%{BKY_IO_RESETCHRONOMETER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_RESETCHRONOMETER_TOOLTIP}",
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "output": "String",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GROVEKEYPAD_GETNUMBER_TOOLTIP}",
    },

    // BLOCK GROVE THUMB JOYSTICK _ GET POSITION
    {
        "type": "io_getGroveThumbJoystick",
        "message0": "%{BKY_IO_GROVEJOYSTICK_GETAXIS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["X", "X"],
                ["Y", "Y"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN_X",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN_Y",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GROVEJOYSTICK_GETAXIS_TOOLTIP}",
    },

    // BLOCK GROVE COLORED BUTTON _ READ DIGITAL
    {
        "type": "io_getGroveColoredButton",
        "message0": "%{BKY_IO_GROVECOLOREDBUTTON_GET_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GROVECOLOREDBUTTON_GET_TOOLTIP}",
    },

    // BLOCK GROVE COLORED BUTTON _ WRITE DIGITAL
    {
        "type": "io_setGroveColoredButton",
        "message0": "%{BKY_IO_GROVECOLOREDBUTTON_SETLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GROVECOLOREDBUTTON_SETLED_TOOLTIP}",
    },

    // BLOCK GROVE SLIDE POTENTIOMETER _ READ ANALOG
    {
        "type": "io_getGroveSlidePotentiometer",
        "message0": "%{BKY_IO_GETGROVESLIDEPOTENTIOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVESLIDEPOTENTIOMETER_TOOLTIP}",
    },

    // BLOCK GROVE ROTARY POTENTIOMETER _ READ ANALOG
    {
        "type": "io_getGroveRotaryAngle",
        "message0": "%{BKY_IO_GETGROVEROTARYANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVEROTARYANGLE_TOOLTIP}",
    },

    // BLOCK GROVE TACTILE BUTTON _ READ DIGITAL
    {
        "type": "io_getGroveTactile",
        "message0": "%{BKY_IO_GETGROVETACTILE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVETACTILE_TOOLTIP}",
    },

    // BLOCK GROVE SIMPLE BUTTON _ READ DIGITAL 
    {
        "type": "io_getGroveButton",
        "message0": "%{BKY_IO_GETGROVEBUTTON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVEBUTTON_TOOLTIP}",
    },

    // BLOCK GROVE SWITCH BUTTON _ READ DIGITAL
    {
        "type": "io_getGroveSwitch",
        "message0": "%{BKY_IO_GETGROVESWITCH_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVESWITCH_TOOLTIP}",
    },

    // BLOCK GROVE MAGNETIC SWITCH BUTTON _ READ DIGITAL
    {
        "type": "io_getMagneticSwitch",
        "message0": "%{BKY_IO_GETMAGNETICSWITCH_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETMAGNETICSWITCH_TOOLTIP}",
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
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

    // BLOCK READ ANALOG PIN
    {
        "type": "io_readAnalogPin",
        "message0": "%{BKY_IO_READANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_READANALOGPIN_TOOLTIP}",
    },

    // BLOCK WRITE ANALOG 
    {
        "type": "io_writeAnalogPin",
        "message0": "%{BKY_IO_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "block_init_color"
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
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
                "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_SET_PULL_TOOLTIP}"
    }
]); // END JSON EXTRACT (Do not delete this comment.)