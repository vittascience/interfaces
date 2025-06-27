/**
 * @fileoverview Communication blocks for CyberPi.
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
    },

    // BLOCK GRAPH _ SERIAL WRITE
    {
        "type": "communication_graphSerialWrite",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_WRITEGRAPH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
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

    // BLOCK COMPUTER MUSIC _ PLAY NOTE
    {
        "type": "communication_playComputerMusic",
        "message0": "%{BKY_COMMUNICATION_COMPUTER_PLAYNOTE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "NOTE",
            "options": [
                ["%{BKY_NOTE_C}", "261.63"],
                ["%{BKY_NOTE_C_SHARP}", "277.18"],
                ["%{BKY_NOTE_D}", "293.66"],
                ["%{BKY_NOTE_D_SHARP}", "311.13"],
                ["%{BKY_NOTE_E}", "329.63"],
                ["%{BKY_NOTE_F}", "349.23"],
                ["%{BKY_NOTE_F_SHARP}", "369.99"],
                ["%{BKY_NOTE_G}", "392.0"],
                ["%{BKY_NOTE_G_SHARP}", "415.3"],
                ["%{BKY_NOTE_A}", "440.0"],
                ["%{BKY_NOTE_A_SHARP}", "466.16"],
                ["%{BKY_NOTE_B}", "493.88"]
            ]
        }],
        "nextStatement": null,
        "previousStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_COMMUNICATION_COMPUTER_PLAYNOTE_TOOLTIP}",
    },

    // BLOCK COMPUTER MUSIC _ SET FREQUENCY
    {
        "type": "communication_playComputerFrequency",
        "message0": "%{BKY_COMMUNICATION_COMPUTER_SETFREQUENCY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_COMMUNICATION_COMPUTER_SETFREQUENCY_TOOLTIP}",
    },

    // BLOCK COMPUTER MUSIC _ STOP MUSIC
    {
        "type": "communication_stopComputerMusic",
        "message0": "%{BKY_COMMUNICATION_COMPUTER_STOPMUSIC_TITLE}",
        "nextStatement": null,
        "previousStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_COMMUNICATION_COMPUTER_STOPMUSIC_TOOLTIP}",
    }

]); // END JSON EXTRACT (Do not delete this comment.)