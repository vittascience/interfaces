
Blockly.defineBlocksWithJsonArray([
    {
        "type": "define_pin",
        "message0": "pin %1",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
            }
        ],
        "output": null,
        "tooltip": "",
        "helpUrl": "",
        "extensions": [
            "block_init_color"
        ]
    }
]);

Blockly.Arduino.define_pin = function (block) {
    let pin = block.getFieldValue('PIN');
    console.log('PIN', pin);
    return [pin, Blockly.Arduino.ORDER_ATOMIC];
};