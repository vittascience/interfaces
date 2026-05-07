/**
 * @fileoverview Input/Output blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

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

    // BLOCK WRITE DAC PIN
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
    }

]); // END JSON EXTRACT (Do not delete this comment.)