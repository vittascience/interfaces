/**
 * @fileoverview Communication blocks for Lego Spike.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin serial transmission blocks*/

    // BLOCK SERIAL WRITE 
    {
        "type": "communication_serialWrite",
        "message0": "%{BKY_COMMUNICATION_SERIAL_WRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_SERIAL_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "block_buttons_plus_minus",
            "communication_serialWrite_init_extension"
        ],
        "mutator": "communication_serialWrite_mutator"
    }

]); // END JSON EXTRACT (Do not delete this comment.)