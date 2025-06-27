/**
 * @fileoverview Input/Output blocks for Arduino.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // Block for adding comment in code
    {
        "type": "text_comment",
        "message0": "%{BKY_TEXT_COMMENT_TITLE}",
        "args0": [
            {
                "type": "field_input",
                "name": "TEXT"
            }
        ],
        "style": "comment_block",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_TEXT_COMMENT_TOOLTIP}"
    },

    /* Begin Arduino io blocks */

    // ARDUINO PAUSE JSON
    {
        "type": "io_wait",
        "message0": "%{BKY_IO_WAIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "style": "io_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_IO_WAIT_TOOLTIP}",
    },

    /* Begin pins blocks */

    {
        "type": "io_digitalPin",
        "message0": "%1",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "io_blocks",
        "output": "Number"
    },

    {
        "type": "io_analogPin",
        "message0": "%1",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "style": "io_blocks",
        "output": "Number"
    },

    {
        "type": "io_pinMode",
        "message0": "%{BKY_IO_PINMODE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "MODE",
            "options": [
                ["OUTPUT", "OUTPUT"],
                ["INPUT", "INPUT"],
                ["INPUT_PULLUP", "INPUT_PULLUP"]
            ]
        }],
        "style": "io_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_PINMODE_TOOLTIP}"
    },

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
        "style": "io_blocks",
        "output": "Boolean",
        "tooltip": "%{BKY_IO_DIGITAL_SIGNAL_TOOLTIP}"
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
        "style": "io_blocks",
        "output": "Boolean",
        "tooltip": "%{BKY_IO_READDIGITALPIN_TOOLTIP}"
    },

    // BLOCK WRITE DIGITAL PIN
    {
        "type": "io_writeDigitalPin",
        "message0": "%{BKY_IO_WRITEDIGITALPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "style": "io_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_WRITEDIGITALPIN_TOOLTIP}"
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
        "style": "io_blocks",
        "tooltip": "%{BKY_IO_READANALOGPIN_TOOLTIP}"
    },

    // BLOCK WRITE ANALOG 
    {
        "type": "io_writeAnalogPin",
        "message0": "%{BKY_IO_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "style": "io_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_WRITEANALOGPIN_TOOLTIP}"
    }

]); // END JSON EXTRACT (Do not delete this comment.)