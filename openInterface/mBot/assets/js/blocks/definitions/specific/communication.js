/**
 * @fileoverview Communication blocks for mBot.
 */
Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

  // BLOCK COM SERIAL WRITE
  {
    "type": "communication_serialBegin",
    "message0": "%{BKY_COMMUNICATION_SERIAL_BEGIN_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "SPEED",
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_SERIAL_BEGIN_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
  {
    "type": "communication_serialWrite_simple",
    "message0": "%{BKY_COMMUNICATION_SERIAL_WRITE_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TEXT"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_SERIAL_WRITE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },
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

  // BLOCK COM SERIAL ON DATA AVAILABLE | READ 
  {
    "type": "communication_onSerialDataReceived",
    "message0": "%{BKY_COMMUNICATION_SERIAL_ONDATARECEIVED_TITLE}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "serialData"
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_SERIAL_ONDATARECEIVED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "field_variable_type_getter"
    ]
  },

  // BLOCK GRAPH SERIAL WRITE
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

  // BLOCK GRAPH DATA FORMAT
  {
    "type": "communication_graphSerialWrite_datasFormat",
    "message0": "%{BKY_COMMUNICATION_PRINT_DATAS_TITLE}",
    "args0": [{
      "type": "field_input",
      "name": "NAME"
    }, {
      "type": "input_value",
      "name": "DATA",
      "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
    }],
    "output": "Number",
    "inputsInline": true,
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ],
    "tooltip": "%{BKY_COMMUNICATION_PRINT_DATAS_TOOLTIP}",
  },

  // PLAY COMPUTER NOTE
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

  // PLAY COMPUTER FREQUENCY
  {
    "type": "communication_playComputerFrequency",
    "message0": "%{BKY_COMMUNICATION_COMPUTER_SETFREQUENCY_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "FREQUENCY",
      "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
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

  // STOP COMPUTER MUSIC
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