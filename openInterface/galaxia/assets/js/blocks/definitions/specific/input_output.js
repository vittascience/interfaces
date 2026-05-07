/**
 * @fileoverview Input/Output blocks for Thingz-Galaxia.
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
            "options": Blockly.Constants.Pins.touch[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.touch[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_ISPINTOUCHED_TOOLTIP}",
    },

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

    /*Begin control pins blocks*/

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

    //Block GROVE ROTARY Encoder
    {
        "type": "io_rotaryEncoder",
        "message0": "%{BKY_IO_ROTARYENCODER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "CLK",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DT",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": 'Number',
        "tooltip": "%{BKY_IO_ROTARYENCODER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)