/**
 * @fileoverview Common Input/Output blocks.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin time blocks*/

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
                ["%{BKY_IO_WAIT_MICROSECOND}", "MICRO"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WAIT_TOOLTIP}"
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

    /*Begin external inputs blocks*/

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
            "block_init_color",
            "pins_management_global"
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_GETMAGNETICSWITCH_TOOLTIP}",
    },

    // BLOCK GROVE TACTILE BUTTON _ READ DIGITAL
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
            "block_init_color",
            "pins_management_global"
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
            "options": Blockly.Constants.Pins.analog_read?.[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
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
            "options": Blockly.Constants.Pins.analog_read?.[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
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
            "block_init_color",
            "pins_management_global"
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
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_GROVECOLOREDBUTTON_SETLED_TOOLTIP}",
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
            "options": Blockly.Constants.Pins.analog_read?.[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN_Y",
            "options": Blockly.Constants.Pins.analog_read?.[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_GROVEJOYSTICK_GETAXIS_TOOLTIP}",
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
            "block_init_color",
            "pins_management_global"
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
            "block_init_color",
            "pins_management_global"
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
            "options": Blockly.Constants.Pins.analog_read?.[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_READANALOGPIN_TOOLTIP}",
    },

    // BLOCK WRITE PWM DUTY
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
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_WRITEPWMPIN_TOOLTIP}",
    },

    // BLOCK SET PWM FREQUENCY
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
            "block_init_color",
            "pins_management_global"
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
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_IO_STOPPWM_TOOLTIP}",
    },

]); // END JSON EXTRACT (Do not delete this comment.)