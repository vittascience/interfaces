/**
 * @fileoverview Input/Output blocks for M5Stack.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin ESP32 blocks*/

    // BLOCK INIT CHRONOMETER
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
            "block_init_color",
            "pins_management_global"
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