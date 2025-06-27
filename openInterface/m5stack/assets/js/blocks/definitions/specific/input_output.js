/**
 * @fileoverview Input/Output blocks for M5Stack.
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

    /** Begin io M5Stack blocks */

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

    // BLOCK ON BUTTON PRESSED
    {
        "type": "io_m5stack_onButtonPressedEvent",
        "message0": "%{BKY_IO_M5STACK_ON_BUTTON_PRESSED_EVENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "A"],
                ["B", "B"],
                ["C", "C"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_WAS_PRESSED}", "WAS_PRESS"],
                ["%{BKY_IO_WAS_RELEASED}", "WAS_REL"],
                ["%{BKY_IO_WAS_LONG_PRESSED}", "WAS_LONG_PRESS"],
                ["%{BKY_IO_WAS_DOUBLE_PRESSED}", "WAS_DOUBLE_PRESS"]
            ]
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
        "tooltip": "%{BKY_IO_M5STACK_ON_BUTTON_PRESSED_EVENT_TOOLTIP}",
    },

    // BLOCK BUTTONS - GET BUTTON STATE
    {
        "type": "io_m5stack_getButtonState",
        "message0": "%{BKY_IO_M5STACK_GET_BUTTON_STATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "A"],
                ["B", "B"],
                ["C", "C"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_IS_PRESSED}", "PRESSED"],
                ["%{BKY_IO_IS_RELEASED}", "RELEASED"],
            ]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_M5STACK_GET_BUTTON_STATE_TOOLTIP}",
    },

    // BLOCK M5STACK - BATTERY IS CHARGING
    {
        "type": "io_m5stack_isCharging",
        "message0": "%{BKY_IO_M5STACK_IS_CHARGING_TITLE}",
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_M5STACK_IS_CHARGING_TOOLTIP}",
    },

    // BLOCK M5STACK - BATTERY IS CHARGE FULL
    {
        "type": "io_m5stack_isChargeFull",
        "message0": "%{BKY_IO_M5STACK_IS_CHARGE_FULL_TITLE}",
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_M5STACK_IS_CHARGE_FULL_TOOLTIP}",
    },

    // BLOCK M5STACK - SET CHARGE
    {
        "type": "io_m5stack_setCharge",
        "message0": "%{BKY_IO_M5STACK_SET_CHARGE_TITLE}",
        "args0": [{
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
        "tooltip": "%{BKY_IO_M5STACK_SET_CHARGE_TOOLTIP}",
    },

    // BLOCK M5STACK - GET BATTERY LEVEL
    {
        "type": "io_m5stack_getBatteryLevel",
        "message0": "%{BKY_IO_M5STACK_GET_BATTERY_LEVEL_TITLE}",
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_M5STACK_GET_BATTERY_LEVEL_TOOLTIP}",
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

    // BLOCK READ ANALOG PIN
    {
        "type": "io_readAnalogPin",
        "message0": "%{BKY_IO_READANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_READANALOGPIN_TOOLTIP}",
    },

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

    // BLOCK WRITE ANALOG PIN
    {
        "type": "io_writeAnalogPin",
        "message0": "%{BKY_IO_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.DAC[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
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

    /*Begin external module blocks*/

    // BLOCK GROVE SWITCH BUTTON _ READ DIGITAL
    {
        "type": "io_getGroveSwitch",
        "message0": "%{BKY_IO_GETGROVESWITCH_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN_Y",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GROVEJOYSTICK_GETAXIS_TOOLTIP}",
    },

    // BLOCK GROVE TACTILE _ READ DIGITAL
    {
        "type": "io_getGroveTactile",
        "message0": "%{BKY_IO_GETGROVETACTILE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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