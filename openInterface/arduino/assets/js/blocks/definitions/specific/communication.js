/**
 * @fileoverview Communication blocks for Arduino.
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
    "tooltip": "%{BKY_COMMUNICATION_PRINT_DATAS_TOOLTIP}"
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
    "tooltip": "%{BKY_COMMUNICATION_COMPUTER_PLAYNOTE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
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
    "tooltip": "%{BKY_COMMUNICATION_COMPUTER_SETFREQUENCY_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // STOP COMPUTER MUSIC
  {
    "type": "communication_stopComputerMusic",
    "message0": "%{BKY_COMMUNICATION_COMPUTER_STOPMUSIC_TITLE}",
    "nextStatement": null,
    "previousStatement": null,
    "tooltip": "%{BKY_COMMUNICATION_COMPUTER_STOPMUSIC_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_init_color"
    ]
  },

  // BLOCK WRITE ON OPENLOG SD CARD
  {
    "type": "communication_writeOpenLogSd",
    "message0": "%{BKY_COMMUNICATION_OPENLOG_WRITE_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "BAUD",
      "options": [
        ["4800", "4800"],
        ["9600", "9600"],
        ["57600", "57600"],
        ["115200", "115200"]
      ]
    }],
    "message1": "%{BKY_COMMUNICATION_OPENLOG_WRITE_TITLE_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "message2": "%{BKY_COMMUNICATION_OPENLOG_WRITE_TITLE_DATA}",
    "args2": [{
      "type": "input_value",
      "name": "DATA",
      "check": ["String"]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_OPENLOG_WRITE_TOOLTIP}",
    "extensions": [
      "pins_management_global",
      "pins_management_rxtx",
    ]
  },

  // WRITE DATA SD CARD JSON
  {
    "type": "communication_SDWriteDataSPI",
    "message0": "%{BKY_COMMUNICATION_SDSPI_WRITE_TITLE}",
    "args0": [{
      "type": "input_dummy"
    }, {
      "type": "field_grid_dropdown",
      "name": "CS",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "input_dummy"
    }, {
      "type": "input_value",
      "name": "DATA",
      "check": ["String"]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_SDSPI_WRITE_TOOLTIP}",
    "extensions": [
      "pins_management_global",
    ]
  },

  // GROVE SERIAL BLUETOOTH _ MODULE SETTINGS JSON
  {
    "type": "communication_setSerialBluetooth",
    "message0": "%{BKY_COMMUNICATION_BLUETOOTH_SETTINGS_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "NAME",
      "check": ["String"]
    }, {
      "type": "input_value",
      "name": "MODE",
      "check": ["String"]
    }, {
      "type": "input_value",
      "name": "PIN",
      "check": ["String"]
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_BLUETOOTH_SETTINGS_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx"
    ]
  },

  // GROVE SERIAL BLUETOOTH _ SET AT COMMAND
  {
    "type": "communication_groveSerialBluetooth_setATCommand",
    "message0": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_SET_AT_COMMAND_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "COMMAND",
      "options": [
        ["AT+NAME", "AT+NAME"],
        ["AT+PIN", "AT+PIN"],
        ["AT+ROLE", "AT+ROLE"],
        ["AT+BAUD", "AT+BAUD"]
      ]
    }, {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_SET_AT_COMMAND_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // GROVE SERIAL BLUETOOTH _ GET AT COMMAND
  {
    "type": "communication_groveSerialBluetooth_getATCommand",
    "message0": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_GET_AT_COMMAND_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "COMMAND",
      "options": [
        ["AT+HELP", "AT+HELP?"],
        ["AT+NAME", "AT+NAME?"],
        ["AT+PIN", "AT+PIN?"],
        ["AT+BAUD", "AT+BAUD?"],
        ["AT+ROLE", "AT+ROLE?"],
        ["AT+VERSION", "AT+VERSION?"],
        ["AT+TEMP", "AT+TEMP?"],
        ["AT+ADDR", "AT+ADDR?"],
        ["AT+UART", "AT+UART?"],
        ["AT+CHK", "AT+CHK?"],
        ["AT+STOP", "AT+STOP?"],
        ["AT+RADD", "AT+RADD?"]
      ]
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "output": "String",
    "inputsInline": true,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_GET_AT_COMMAND_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // GROVE SERIAL BLUETOOTH _ SEND DATA JSON
  {
    "type": "communication_sendSerialBluetoothData",
    "message0": "%{BKY_COMMUNICATION_BLUETOOTH_SENDDATA_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TEXT",
      "check": ["String", "Number", "Decimal", "Boolean"]
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_BLUETOOTH_SENDDATA_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx"
    ]
  },

  //BLOCK ON BLUETOOTH DATA RECEIVED
  {
    "type": "communication_onSerialBluetoothDataReceived",
    "message0": "%{BKY_COMMUNICATION_BLUETOOTH_ONDATARECEIVED_TITLE}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "bluetoothData"
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "message2": "%{BKY_COMMUNICATION_THEN}",
    "message3": "%1",
    "args3": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_BLUETOOTH_ONDATARECEIVED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "field_variable_type_getter",
      "pins_management_global",
      "pins_management_rxtx"
    ]
  },

  // HC05 BLUETOOTH _ GET AT COMMAND
  {
    "type": "communication_hc05_getATCommand",
    "message0": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_GET_AT_COMMAND_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "COMMAND",
      "options": [
        ["AT+HELP", "AT+HELP"],
        ["AT+NAME", "AT+NAME?"],
        ["AT+PSWD", "AT+PSWD?"],
        ["AT+ADDR", "AT+ADDR?"],
        ["AT+ROLE", "AT+ROLE?"],
        ["AT+CMODE", "AT+CMODE?"],
        ["AT+VERSION", "AT+VERSION?"],
        ["AT+UART", "AT+UART?"]
      ]
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "output": "String",
    "inputsInline": true,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_GET_AT_COMMAND_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // HC05 BLUETOOTH _ SET AT COMMAND
  {
    "type": "communication_hc05_setATCommand",
    "message0": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_SET_AT_COMMAND_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "COMMAND",
      "options": [
        ["AT+NAME", "AT+NAME"],
        ["AT+PSWD", "AT+PSWD"],
        ["AT+ROLE", "AT+ROLE"],
        ["AT+UART", "AT+UART"],
        ["AT+CMODE", "AT+CMODE"]
      ]
    }, {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_SET_AT_COMMAND_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // HC05 BLUETOOTH - CHANGE BAUDRATE TRANSMISSION
  {
    "type": "communication_hc05_changeBaudrateTransmission",
    "message0": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_CHANGEBAUDRATE_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "BAUD",
      "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_CHANGEBAUDRATE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "bt_tooltip_helper"
    ]
  },

  // HC05 BLUETOOTH _ SEND DATA JSON
  {
    "type": "communication_hc05_sendBluetoothData",
    "message0": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_SENDDATA_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TEXT",
      "check": ["String", "Number", "Decimal", "Boolean"]
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_SENDDATA_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // HC05 BLUETOOTH _ ON DATA RECEIVED
  {
    "type": "communication_hc05_onBluetoothDataReceived",
    "message0": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_ONDATARECEIVED_TITLE}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "HC05Data"
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "message2": "%{BKY_COMMUNICATION_THEN}",
    "message3": "%1",
    "args3": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_HC05_BLUETOOTH_ONDATARECEIVED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "field_variable_type_getter",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // HM10 BLUETOOTH _ SET AT COMMAND
  {
    "type": "communication_hm10_setATCommand",
    "message0": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_SET_AT_COMMAND_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "COMMAND",
      "options": [
        ["AT+NAME", "AT+NAME"],
        ["AT+PIN", "AT+PIN"],
        ["AT+ROLE", "AT+ROLE"],
        ["AT+BAUD", "AT+BAUD"]
      ]
    }, {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_SET_AT_COMMAND_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // HM10 BLUETOOTH _ GET AT COMMAND
  {
    "type": "communication_hm10_getATCommand",
    "message0": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_GET_AT_COMMAND_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "COMMAND",
      "options": [
        ["AT+HELP", "AT+HELP"],
        ["AT+NAME", "AT+NAME"],
        ["AT+PIN", "AT+PIN"],
        ["AT+BAUD", "AT+BAUD"],
        ["AT+ROLE", "AT+ROLE"],
        ["AT+VERSION", "AT+VERSION"],
        ["AT+ADDR", "AT+ADDR"],
        ["AT+UUID", "AT+UUID"],
        ["AT+CHAR", "AT+CHAR"],
        ["AT+PARI", "AT+PARI"],
        ["AT+STOP", "AT+STOP"],
        ["AT+PWRM", "AT+PWRM"],
        ["AT+POWE", "AT+POWE"]
      ]
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "output": "String",
    "inputsInline": true,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_GET_AT_COMMAND_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // HM10 SERIAL BLUETOOTH _ SEND DATA JSON
  {
    "type": "communication_hm10_sendBluetoothData",
    "message0": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_SENDDATA_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TEXT",
      "check": ["String", "Number", "Decimal", "Boolean"]
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_SENDDATA_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // HM10 SERIAL BLUETOOTH _ ON DATA RECEIVED
  {
    "type": "communication_hm10_onBluetoothDataReceived",
    "message0": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_ONDATARECEIVED_TITLE}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "HM10Data"
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "message2": "%{BKY_COMMUNICATION_THEN}",
    "message3": "%1",
    "args3": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_ONDATARECEIVED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "field_variable_type_getter",
      "pins_management_global",
      "pins_management_rxtx",
      "bt_tooltip_helper"
    ]
  },

  // nRF24L01 RADIO MODULE _ SEND RADIO DATA JSON
  {
    "type": "communication_sendRadioNRF24Data",
    "message0": "%{BKY_COMMUNICATION_RADIONRF24_SENDDATA_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "ADDRESS",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"]
      ]
    }, {
      "type": "input_value",
      "name": "CANAL",
      "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
    }, {
      "type": "field_grid_dropdown",
      "name": "CE",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "CSN",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "input_value",
      "name": "DATA",
      "check": ["String", "Number", "Decimal", "Boolean"]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_RADIONRF24_SENDDATA_TOOLTIP}",
    "helpUrl": "https://vittascience.com/tutorial/19",
    "extensions": [
      "pins_management_global"
    ]
  },

  //nRF24L01 RADIO MODULE _ GET RADIO DATA JSON
  {
    "type": "communication_onRadioNRF24_dataReceived",
    "message0": "%{BKY_COMMUNICATION_RADIONRF24_DATARECEIVER_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "ADDRESS",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"]
      ]
    }, {
      "type": "input_value",
      "name": "CANAL",
      "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
    }, {
      "type": "field_grid_dropdown",
      "name": "CE",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "CSN",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_variable",
      "name": "VAR",
      "variable": "radioNRFData"
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_RADIONRF24_DATARECEIVER_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "field_variable_type_getter",
      "pins_management_global"
    ]
  },

  // GROVE 433MHZ RF MODULE _ TRANSMITTER JSON
  {
    "type": "communication_sendRadio433mhzData",
    "message0": "%{BKY_COMMUNICATION_GROVE_433MHZ_TRANSMITTER}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "PIN",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "input_value",
      "name": "DATA",
      "check": ["String", "Number", "Decimal", "Boolean"]
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_GROVE_433MHZ_TRANSMITTER_TOOLTIP}",
    "helpUrl": "https://vittascience.com/tutorial/19",
    "extensions": [
      "pins_management_global"
    ]
  },

  // GROVE 433MHZ RF MODULE _ RECEIVER JSON
  {
    "type": "communication_onRadio433mhzDataReceived",
    "message0": "%{BKY_COMMUNICATION_GROVE_433MHZ_RECEIVER}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "PIN",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_variable",
      "name": "VAR",
      "variable": "simpleRFmessage"
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_GROVE_433MHZ_RECEIVER_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "field_variable_type_getter",
      "pins_management_global"
    ]
  },

  // IR RECEIVER _ ON IR MSG RECEIVED
  {
    "type": "communication_onIRDataReceived",
    "message0": "%{BKY_COMMUNICATION_IRRECEIVER_ONDATARECEIVED_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "PIN",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_variable",
      "name": "VAR",
      "variable": "IRdata"
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_IRRECEIVER_ONDATARECEIVED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "field_variable_type_getter",
      "pins_management_global"
    ]
  },

  // REMOTE CONTROL MODULE _ ON IR COMMAND RECEIVED
  {
    "type": "communication_onRemoteCommandReceived",
    "message0": "%{BKY_COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "COMMAND",
      "options": [
        ["%{BKY_REMOTE_NEC_BUTTON}" + "1", "1"],
        ["%{BKY_REMOTE_NEC_BUTTON}" + "2", "2"],
        ["%{BKY_REMOTE_NEC_BUTTON}" + "3", "3"],
        ["%{BKY_REMOTE_NEC_BUTTON}" + "4", "4"],
        ["%{BKY_REMOTE_NEC_BUTTON}" + "5", "5"],
        ["%{BKY_REMOTE_NEC_BUTTON}" + "6", "6"],
        ["%{BKY_REMOTE_NEC_BUTTON}" + "7", "7"],
        ["%{BKY_REMOTE_NEC_BUTTON}" + "8", "8"],
        ["%{BKY_REMOTE_NEC_BUTTON}" + "9", "9"],
        ["%{BKY_REMOTE_NEC_BUTTON}" + "0", "0"],
        ["%{BKY_REMOTE_NEC_BUTTON_UP} (PREV)", "up"],
        ["%{BKY_REMOTE_NEC_BUTTON_DOWN} (NEXT)", "down"],
        ["%{BKY_REMOTE_NEC_BUTTON_LEFT} (CH-)", "left"],
        ["%{BKY_REMOTE_NEC_BUTTON_RIGHT} (CH+)", "right"],
        ["ENTER/SAVE", "ENTER/SAVE"],
        ["%{BKY_REMOTE_NEC_BUTTON_BACK}", "Back"],
        ["VOL-", "VOL-"],
        ["VOL+", "VOL+"],
        ["PLAY/PAUSE", "PLAY/PAUSE"],
        ["SETUP", "SETUP"],
        ["STOP/MODE", "STOP/MODE"]
      ]
    }, {
      "type": "input_value",
      "name": "DATA",
      "check": "String"
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ],
  },

  // GROVE GPS MODULE _ ON GPS DATA AVAILABLE
  {
    "type": "communication_onGPSDataReceived",
    "message0": "%{BKY_COMMUNICATION_GPS_ONDATARECEIVED_TITLE}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "gpsData"
    }],
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "message2": "%{BKY_COMMUNICATION_THEN}",
    "message3": "%1",
    "args3": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_GPS_ONDATARECEIVED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "field_variable_type_getter",
      "pins_management_global",
      "pins_management_rxtx"
    ]
  },

  // GROVE RFID READER _ GET STRING CARD ID
  {
    "type": "communication_rfid_getCardID",
    "message0": "%{BKY_COMMUNICATION_RFID_GETSTRINGCARDID_TITLE}",
    "message1": "%{BKY_COMMUNICATION_RX_TX_PINS}",
    "args1": [{
      "type": "field_grid_dropdown",
      "name": "RX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }, {
      "type": "field_grid_dropdown",
      "name": "TX",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "inputsInline": true,
    "output": "String",
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_RFID_GETSTRINGCARDID_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx"
    ]
  },

  // GROVE RTC SET DAY
  {
    "type": "communication_clockRTC_setDate",
    "message0": "%{BKY_COMMUNICATION_GROVERTC_SETDATE_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MODULE",
      "options": [
        ["%{BKY_COMMUNICATION_RTC_MODULE_DS1307}", "DS1307"],
        ["%{BKY_COMMUNICATION_RTC_MODULE_PCF85063TP}", "PCF85063TP"]
      ]
    }, {
      "type": "field_dropdown",
      "name": "DAY",
      "options": [
        ["%{BKY_DAY_MONDAY}", "MON"],
        ["%{BKY_DAY_TUESDAY}", "TUE"],
        ["%{BKY_DAY_WEDNESDAY}", "WED"],
        ["%{BKY_DAY_THURSDAY}", "THU"],
        ["%{BKY_DAY_FRIDAY}", "FRI"],
        ["%{BKY_DAY_SATURDAY}", "SAT"],
        ["%{BKY_DAY_SUNDAY}", "SUN"]
      ]
    }, {
      "type": "field_date",
      "name": "DATE",
      "date": "2021-07-06"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_GROVERTC_SETDATE_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // GROVE RTC SET HOUR
  {
    "type": "communication_clockRTC_setHour",
    "message0": "%{BKY_COMMUNICATION_GROVERTC_SETHOUR_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MODULE",
      "options": [
        ["%{BKY_COMMUNICATION_RTC_MODULE_DS1307}", "DS1307"],
        ["%{BKY_COMMUNICATION_RTC_MODULE_PCF85063TP}", "PCF85063TP"]
      ]
    }, {
      "type": "input_value",
      "name": "HOUR",
      "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
    }, {
      "type": "input_value",
      "name": "MIN",
      "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
    }, {
      "type": "input_value",
      "name": "SEC",
      "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_GROVERTC_SETHOUR_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  },

  // GROVE RTC READ
  {
    "type": "communication_clockRTC_readTime",
    "message0": "%{BKY_COMMUNICATION_GROVERTC_READTIME_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "MODULE",
      "options": [
        ["%{BKY_COMMUNICATION_RTC_MODULE_DS1307}", "DS1307"],
        ["%{BKY_COMMUNICATION_RTC_MODULE_PCF85063TP}", "PCF85063TP"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "DATA",
      "options": [
        ["%{BKY_CLOCK_MONTH_DAY}", "0"],
        ["%{BKY_CLOCK_MONTH}", "1"],
        ["%{BKY_CLOCK_YEAR}", "2"],
        ["%{BKY_CLOCK_HOUR}", "3"],
        ["%{BKY_CLOCK_MINUTE}", "4"],
        ["%{BKY_CLOCK_SECOND}", "5"],
        ["%{BKY_CLOCK_WEEK_DAY}", "6"]
      ]
    }],
    "output": "Number",
    "inputsInline": true,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_GROVERTC_READTIME_TOOLTIP}",
    "extensions": [
      "block_init_helpurl"
    ]
  }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Communication = Object.create(null);

/**
 * Performs final setup of HC05 & HM10 blocks by define tooltip.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.BT_INIT_EXTENSION = function () {
  const tooltip = this.getTooltip();
  const board = Blockly.Constants.getSelectedBoard();
  switch (board) {
    case BOARD_ARDUINO_UNO_R4_WIFI:
      this.setTooltip(tooltip + NEWLINE + Blockly.Msg['COMMUNICATION_BLUETOOTH_HELPER_R4']);
      break;
    default:
  }
};

Blockly.Extensions.register('bt_tooltip_helper',
  Blockly.Constants.Communication.BT_INIT_EXTENSION);