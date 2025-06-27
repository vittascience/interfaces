/**
 * @fileoverview Input/Output blocks for mBot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin Arduino io blocks */

    // ARDUINO PAUSE JSON
    {
        "type": "io_wait",
        "message0": "%{BKY_IO_WAIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_IO_WAIT_SECOND}", "SECOND"],
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

    // BLOCK GET CHRONOMETER
    {
        "type": "io_getChronometer",
        "message0": "%{BKY_IO_GETCHRONOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(s)", "1000.0"],
                ["(ms)", "1.0"]
            ]
        }],
        "output": "Decimal",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_GETCHRONOMETER_TOOLTIP}",
    },

    /* Begin external modules blocks */

    // BLOCK MAKEBLOCK SWITCH BUTTON (end of run)
    {
        "type": "robots_makeBlock_getSwitchState",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "SLOT",
            "options": Blockly.Constants.Pins.MBOT_SLOT
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETSWITCHSTATE_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK JOYSTICK
    {
        "type": "robots_makeBlock_getJoystickAxis",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ['x', 'X'],
                ['y', 'Y']
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_ANALOG_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETJOYSTICKAXIS_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK POTENTIOMETER
    {
        "type": "robots_makeBlock_getPotentiometer",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_ANALOG_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETPOTENTIOMETER_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK 4 BUTTONS
    {
        "type": "robots_makeBlock_getPressedButton",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_ANALOG_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETPRESSEDBUTTON_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK TOUCH SENSOR
    {
        "type": "robots_makeBlock_getTouchSensorState",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_READTOUCHSENSOR_TOOLTIP}",
    },

    /* Begin pins blocks */

    // BLOCK HIGH/LOW BOOLEAN
    {
        "type": "io_digital_signal",
        "message0": "%{BKY_IO_DIGITAL_SIGNAL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
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

    // READ DIGITAL PIN JSON 
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
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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

    // BLOCK READ ANALOG 
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

    // BLOCK WRITE ANALOG 
    {
        "type": "io_writeAnalogPin",
        "message0": "%{BKY_IO_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
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

    // BLOCK SET PWM SIGNAL 
    {
        "type": "io_setPwm",
        "message0": "%{BKY_IO_SETPWM_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
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
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_READPULSEIN_TOOLTIP}",
    },

    // SET EVENT ON PIN 2/3 - attachInterrupt()  
    {
        "type": "io_attachInterrupt",
        "message0": "%{BKY_IO_ATTACH_INTERRUPT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "EDGE",
            "options": [
                ["%{BKY_IO_RISING_EDGE}", "RISING"],
                ["%{BKY_IO_FALLING_EDGE}", "FALLING"],
                ["%{BKY_IO_BOTH_EDGE}", "CHANGE"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["D2", "2"],
                ["D3", "3"]
            ]
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
        "tooltip": "%{BKY_IO_ATTACH_INTERRUPT_TOOLTIP}",
    }

]); // END JSON EXTRACT (Do not delete this comment.)
