/**
 * @fileoverview Communication blocks for Eliobot.
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
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_SERIAL_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_serialWrite_init_extension"
        ],
        "mutator": "communication_serialWrite_mutator"
    },

    // BLOCK GRAPH _ SERIAL WRITE
    {
        "type": "communication_graphSerialWrite",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_WRITEGRAPH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_graphSerialWrite_init_extension"
        ],
        "mutator": "communication_graphSerialWrite_mutator"
    },

    // BLOCK GRAPH _ DATA FORMAT
    {
        "type": "communication_graphSerialWrite_datasFormat",
        "message0": "%{BKY_COMMUNICATION_PRINT_DATAS_TITLE}",
        "args0": [{
            "type": "field_input",
            "name": "NAME"
        }, {
            "type": "input_value",
            "name": "DATA"
        }],
        "output": "Number",
        "inputsInline": true,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_COMMUNICATION_PRINT_DATAS_TOOLTIP}",
    },
    {
        "type": "communication_ir_remote_read",
        "message0": "%{BKY_COMMUNICATION_IR_REMOTE_READ_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["%{BKY_COMMUNICATION_IR_REMOTE_READ_FORWARD}", "0"],
                    ["%{BKY_COMMUNICATION_IR_REMOTE_READ_BACKWARD}", "1"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IR_REMOTE_READ_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/inputs#choisir-le-capteur-pour-la-lecture"
    },
    {
        "type": "communication_ir_remote",
        "message0": "%{BKY_COMMUNICATION_IR_REMOTE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "IR_REMOTE_BUTTON",
                "options": [
                    ["↑", "up"],
                    ["↓", "down"],
                    ["←", "left"],
                    ["→", "right"],
                    ["OK", "ok"],
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["5", "5"],
                    ["6", "6"],
                    ["7", "7"],
                    ["8", "8"],
                    ["9", "9"],
                    ["0", "0"],
                    ["#", "ht"],
                    ["*", "st"]
                ]
            }
        ],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IR_REMOTE_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/inputs#lire-la-commande-de-la-t%C3%A9l%C3%A9commande-infrarouge"
    },
    {
        "type": "communication_ir_remote_boolean",
        "message0": "%{BKY_COMMUNICATION_IR_REMOTE_BOOLEAN_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "IR_REMOTE_BUTTON",
                "options": [
                    ["↑", "up"],
                    ["↓", "down"],
                    ["←", "left"],
                    ["→", "right"],
                    ["OK", "ok"],
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["5", "5"],
                    ["6", "6"],
                    ["7", "7"],
                    ["8", "8"],
                    ["9", "9"],
                    ["0", "0"],
                    ["#", "ht"],
                    ["*", "st"]
                ]
            }
        ],
        "output": "Boolean",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_IR_REMOTE_BOOLEAN_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/inputs#lire-la-commande-de-la-t%C3%A9l%C3%A9commande-infrarouge"
    }
]); // END JSON EXTRACT (Do not delete this comment.)