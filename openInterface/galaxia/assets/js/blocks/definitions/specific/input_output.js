/**
 * @fileoverview Input/Output blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    //Galaxia Specific Blocks
    //Button A & B
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

    // BLOCK ON BUTTON EVENT
    {
        "type": "io_onButtonEvent",
        "message0": "%{BKY_IO_ONBUTTONEVENT_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO",
        }],
        "tooltip": "%{BKY_IO_ONBUTTONEVENT_TOOLTIP}",
        "extensions": [
      "block_init_helpurl",
            "block_init_color",
            "disable_duplicates"
        ],
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

    // BLOCK TOUCH-SENSITIVE BUTTON - IF TOUCHED
    {
        "type": "io_ifTouchSensitiveButtonTouched",
        "message0": "%{BKY_IO_IFTOUCHSENSITIVEBUTTONTOUCHED_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "BUTTON",
            "options": [
                ["%{BKY_IO_TOUCH_UP}", "n"],
                ["%{BKY_IO_TOUCH_DOWN}", "s"],
                ["%{BKY_IO_TOUCH_RIGHT}", "e"],
                ["%{BKY_IO_TOUCH_LEFT}", "w"],
            ]
        }, {
            "type": "field_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_ISPRESSED}", "is_"],
                ["%{BKY_IO_WASPRESSED}", "was_"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO",
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_IFTOUCHSENSITIVEBUTTONTOUCHED_TOOLTIP}"
    },

    // BLOCK TOUCH-SENSITIVE BUTTON - IS TOUCHED
    {
        "type": "io_isTouchSensitiveButtonTouched",
        "message0": "%{BKY_IO_ISTOUCHSENSITIVEBUTTONTOUCHED_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "BUTTON",
            "options": [
                ["%{BKY_IO_TOUCH_UP}", "n"],
                ["%{BKY_IO_TOUCH_DOWN}", "s"],
                ["%{BKY_IO_TOUCH_RIGHT}", "e"],
                ["%{BKY_IO_TOUCH_LEFT}", "w"],
            ]
        }, {
            "type": "field_dropdown",
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
        "tooltip": "%{BKY_IO_ISTOUCHSENSITIVEBUTTONTOUCHED_TOOLTIP}"
    },

    // BLOCK TOUCH-SENSITIVE BUTTON - ON EVENT
    {
        "type": "io_onTouchSensitiveButtonEvent",
        "message0": "%{BKY_IO_ONTOUCHSENSITIVEBUTTONEVENT_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "BUTTON",
            "options": [
                ["%{BKY_IO_TOUCH_UP}", "n"],
                ["%{BKY_IO_TOUCH_DOWN}", "s"],
                ["%{BKY_IO_TOUCH_RIGHT}", "e"],
                ["%{BKY_IO_TOUCH_LEFT}", "w"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO",
        }],
        "tooltip": "%{BKY_IO_ONTOUCHSENSITIVEBUTTONEVENT_TOOLTIP}",
        "extensions": [
      "block_init_helpurl",
            "block_init_color",
            "disable_duplicates"
        ],
    },

    // BLOCK TOUCH-SENSITIVE BUTTON - GET TOUCHES 
    {
        "type": "io_TouchSensitiveButton_getTouches",
        "message0": "%{BKY_IO_TOUCHSENSITIVEBUTTON_GET_TOUCHES_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "BUTTON",
            "options": [
                ["%{BKY_IO_TOUCH_UP}", "n"],
                ["%{BKY_IO_TOUCH_DOWN}", "s"],
                ["%{BKY_IO_TOUCH_RIGHT}", "e"],
                ["%{BKY_IO_TOUCH_LEFT}", "w"],
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_TOUCHSENSITIVEBUTTON_GET_TOUCHES_TOOLTIP}",
    },

    // BLOCK ON PIN PRESSED
    {
        "type": "io_onPinPressed",
        "message0": "%{BKY_IO_ONPINTOUCHED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_TOUCH_PINS
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

    // BLOCK BUTTONS - IS PIN TOUCHED
    {
        "type": "io_isPinPressed",
        "message0": "%{BKY_IO_ISPINTOUCHED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_TOUCH_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ISPINTOUCHED_TOOLTIP}",
    },

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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
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
            "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_READANALOGPIN_TOOLTIP}",
    },

    // BLOCK WRITE PWM PIN
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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
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
    //         "block_init_helpurl"
    //         "block_init_color"
    //     ]
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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
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
                ["511", "511"],
                ["1023", "1023"],
                ["2047", "2047"],
                ["4095", "4095"],
                ["8191", "8191"]
            ]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETVOLTAGE_TOOLTIP}",
    },

    /*Begin external module blocks*/

    // BLOCK GROVE SWITCH BUTTON _ READ DIGITAL
    {
        "type": "io_getGroveSwitch",
        "message0": "%{BKY_IO_GETGROVESWITCH_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVESWITCH_TOOLTIP}",
    },

    // BLOCK GROVE SIMPLE BUTTON _ READ DIGITAL
    {
        "type": "io_getGroveButton",
        "message0": "%{BKY_IO_GETGROVEBUTTON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVEBUTTON_TOOLTIP}",
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
            "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN_Y",
            "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GROVEJOYSTICK_GETAXIS_TOOLTIP}",
    },

    //Block GROVE ROTARY Encoder
    {
        "type": "io_rotaryEncoder",
        "message0": "%{BKY_IO_ROTARYENCODER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "CLK",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DT",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "output": 'Number',
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ROTARYENCODER_TOOLTIP}",
    },


    // BLOCK GROVE TACTILE _ READ DIGITAL
    {
        "type": "io_getGroveTactile",
        "message0": "%{BKY_IO_GETGROVETACTILE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVETACTILE_TOOLTIP}",
    },

    // BLOCK GROVE ROTARY POTENTIOMETER _ READ ANALOG
    {
        "type": "io_getGroveRotaryAngle",
        "message0": "%{BKY_IO_GETGROVEROTARYANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVEROTARYANGLE_TOOLTIP}",
    },

    // BLOCK GROVE SLIDE POTENTIOMETER _ READ ANALOG
    {
        "type": "io_getGroveSlidePotentiometer",
        "message0": "%{BKY_IO_GETGROVESLIDEPOTENTIOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETGROVESLIDEPOTENTIOMETER_TOOLTIP}",
    },

    // BLOCK GROVE COLORED BUTTON _ READ DIGITAL
    {
        "type": "io_getGroveColoredButton",
        "message0": "%{BKY_IO_GROVECOLOREDBUTTON_GET_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
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

]); // END JSON EXTRACT (Do not delete this comment.)