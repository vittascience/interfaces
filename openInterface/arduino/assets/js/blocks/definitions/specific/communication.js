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

  // BLOCK NUMBER SERIAL WRITE
  {
    "type": "communication_NumberSerialWrite",
    "message0": "%{BKY_COMMUNICATION_SERIAL_WRITE_NUMBER_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "NUMBER",
      "check": ["Number", "Short Number", "Large Number", "Uint8_t", "Uint16_t", "Uint32_t"]
    }, {
      "type": "field_grid_dropdown",
      "name": "TYPE",
      "options": [
        ["HEX", "HEX"],
        ["DEC", "DEC"]
      ]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_SERIAL_WRITE_NUMBER_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "number_serial_write_on_change"
    ]
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
      "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_.concat(
        Blockly.Constants.Types.Arduino.BOOLEAN.compatibleTypes_
      )
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
        ["9600", "9600"],
        ["57600", "57600"],
        ["115200", "115200"],
        ["4800", "4800"]
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
    "message0": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_SENDDATA_TITLE}",
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
    "tooltip": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_SENDDATA_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "pins_management_rxtx"
    ]
  },

  //BLOCK ON BLUETOOTH DATA RECEIVED
  {
    "type": "communication_onSerialBluetoothDataReceived",
    "message0": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_ONDATARECEIVED_TITLE}",
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
    "tooltip": "%{BKY_COMMUNICATION_GROVE_BLUETOOTH_ONDATARECEIVED_TOOLTIP}",
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

  // GROVE IR EMITTER _ SEND NEC COMMAND
  {
    "type": "communication_ir_sendNECCommand",
    "message0": "%{BKY_COMMUNICATION_IR_SENDNECCOMMAND_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "CMD",
      "check": "Number"
    }, {
      "type": "input_value",
      "name": "ADDR",
      "check": "Number"
    }, {
      "type": "field_grid_dropdown",
      "name": "PIN",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_IR_SENDNECCOMMAND_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global",
      "block_buttons_plus_minus",
      "communication_ir_sendNECCommand_extension"
    ],
    "mutator": "communication_ir_sendNECCommand_mutator"
  },

  // GROVE IR EMITTER _ SEND FRAME
  {
    "type": "communication_ir_sendFrame",
    "message0": "%{BKY_COMMUNICATION_IR_SENDFRAME_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "FRAME",
      "check": "Array"
    }, {
      "type": "field_grid_dropdown",
      "name": "FREQ",
      "options": [
        ["38", "38"],
        ["36", "36"],
        ["40", "36"],
        ["56", "56"]
      ]
    }, {
      "type": "field_grid_dropdown",
      "name": "PIN",
      "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_IR_SENDFRAME_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
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

  // IR RECEIVER _ GET FRAME PARAM
  {
    "type": "communication_ir_getProtocoleParam",
    "message0": "%{BKY_COMMUNICATION_IR_GET_PROTOCOL_PARAM_TITLE}",
    "args0": [{
      "type": "field_grid_dropdown",
      "name": "PARAM",
      "options": [
        ["%{BKY_IR_RECEIVER_CMD}", "CMD"],
        ["%{BKY_IR_RECEIVER_ADDR}", "ADDR"]
      ]
    }],
    "output": "Uint16_t",
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_IR_GET_PROTOCOL_PARAM_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "pins_management_global"
    ]
  },

  // REMOTE CONTROL MODULE _ ON IR COMMAND RECEIVED
  {
    "type": "communication_onRemoteCommandReceived",
    "message0": "%{BKY_COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
    "args0": [{
      "type": "input_dummy",
      "name": "IF0"
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO0"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_buttons_plus_minus",
      "communication_onRemoteCommandReceived_init"
    ],
    "mutator": "communication_onRemoteCommandReceived_mutator",
  },

  // REMOTE CONTROL MODULE _ ON IR COMMAND RECEIVED - C AR MP3 GRAY REMOTE
  {
    "type": "communication_onRemoteCommandReceived_car_mp3_gray",
    "message0": "%{BKY_COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_TITLE}",
    "args0": [{
      "type": "input_dummy",
      "name": "IF0"
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO0"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "communication_blocks",
    "tooltip": "%{BKY_COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_TOOLTIP}",
    "extensions": [
      "block_init_helpurl",
      "block_buttons_plus_minus",
      "communication_onRemoteCommandReceived_init"
    ],
    "mutator": "communication_onRemoteCommandReceived_mutator",
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

/**
* Performs final setup of 'network_client_sendData' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Communication.COMMUNICATION_IR_SEND_NEC_INIT_EXTENSION = function () {
  this.repeat_ = false;
  this.update_(this.updateField_);
};

Blockly.Extensions.register("communication_ir_sendNECCommand_extension",
  Blockly.Constants.Communication.COMMUNICATION_IR_SEND_NEC_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'network_client_sendData' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_IR_SEND_NEC_MUTATOR_MIXIN =
  Blockly.Constants.Utils.addOptionMutatorMixin('repeat', 'COMMUNICATION_IR_SEND_NEC_REPEAT', 'input', 1);

Blockly.Extensions.registerMutator('communication_ir_sendNECCommand_mutator',
  Blockly.Constants.Communication.COMMUNICATION_IR_SEND_NEC_MUTATOR_MIXIN);

/**
 * Trunc whenever float number is number input in blocks 'communication_NumberSerialWrite'
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Communication.COMMUNICATION_NUMBER_SERIAL_WRITE_ON_CHANGE_MIXIN = {
  /**
   * Called whenever anything on the workspace changes.
   * Prevent mismatched types.
   * @this {Blockly.Block} logic_ternary
   */
  onchange: function () {
    const target = this.getInputTargetBlock('NUMBER');
    if (!target) return;

    if (target.type === 'math_number') {
      const field = target.getField('NUM');
      if (!field) return;

      const value = Number(field.getValue());
      const truncated = Math.trunc(value);

      if (value !== truncated) {
        field.setValue(truncated);
      }
    }
  }
};

Blockly.Extensions.registerMixin('number_serial_write_on_change',
  Blockly.Constants.Communication.COMMUNICATION_NUMBER_SERIAL_WRITE_ON_CHANGE_MIXIN);

/**
 * Remote control typed Basic black.
 * @this {Array<Array<string>>}
 */
Blockly.Constants.Communication.NEC_BASIC_BLACK_REMOTE_BUTTONS = [
  ["%{BKY_REMOTE_NEC_BUTTON}" + "1", "1"],
  ["%{BKY_REMOTE_NEC_BUTTON}" + "2", "2"],
  ["%{BKY_REMOTE_NEC_BUTTON}" + "3", "3"],
  ["%{BKY_REMOTE_NEC_BUTTON}" + "4", "4"],
  ["%{BKY_REMOTE_NEC_BUTTON}" + "5", "5"],
  ["%{BKY_REMOTE_NEC_BUTTON}" + "6", "6"],
  ["%{BKY_REMOTE_NEC_BUTTON}" + "7", "7"],
  ["%{BKY_REMOTE_NEC_BUTTON}" + "8", "8"],
  ["%{BKY_REMOTE_NEC_BUTTON}" + "9", "9"],
  ["%{BKY_REMOTE_NEC_BUTTON}" + "0 (10+)", "0"],
  ["%{BKY_REMOTE_NEC_BUTTON_UP} (PREV)", "up"],
  ["%{BKY_REMOTE_NEC_BUTTON_DOWN} (NEXT)", "down"],
  ["%{BKY_REMOTE_NEC_BUTTON_LEFT} (CH-)", "left"],
  ["%{BKY_REMOTE_NEC_BUTTON_RIGHT} (CH+)", "right"],
  ["ENTER/SAVE", "ENTER/SAVE"],
  ["%{BKY_REMOTE_NEC_BUTTON_BACK}", "back"],
  ["VOL-", "VOL-"],
  ["VOL+", "VOL+"],
  ["PLAY/PAUSE", "PLAY/PAUSE"],
  ["SETUP", "SETUP"],
  ["STOP/MODE", "STOP/MODE"]
];

/**
 * Remote control typed C ar mp3 gray.
 * @this {Array<Array<string>>}
 */
Blockly.Constants.Communication.NEC_CAR_MP3_REMOTE_BUTTONS = [
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
  ["CH-", "CH-"],
  ["CH", "CH"],
  ["CH+", "CH+"],
  ["PREV", "PREV"],
  ["NEXT", "NEXT"],
  ["PLAY/PAUSE", "PLAY/PAUSE"],
  ["VOL-", "VOL-"],
  ["VOL+", "VOL+"],
  ["EQ", "EQ"],
  ["100+", "100+"],
  ["200+", "200+"]
];

/**
* Performs final setup of 'communication_onRemoteCommandReceived' blocks 
* @this {Blockly.Block}
*/
Blockly.Constants.Communication.COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_INIT_EXTENSION = function () {
  this.elseifCount_ = 0;
  this.elseCount_ = 0;
  this.dropdownFieldsValue = new Array();
  if (this.type.includes("_onRemoteCommandReceived_car_mp3_gray")) {
    this.remoteButtonDropdown = Blockly.Constants.Communication.NEC_CAR_MP3_REMOTE_BUTTONS;
    this.thenHeadTitle = 'COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_DETECTED_THEN';
  } else {
    this.remoteButtonDropdown = Blockly.Constants.Communication.NEC_BASIC_BLACK_REMOTE_BUTTONS;
    this.thenHeadTitle = 'COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_BLACK_NEC_DETECTED_THEN';
  }
  this.getInput('IF0')
    .appendField(new Blockly.FieldDropdown(this.remoteButtonDropdown), 'COMMAND0')
    .appendField(Blockly.Msg[this.thenHeadTitle]);
  this.update_(this.updateShape_);
};

Blockly.Extensions.register("communication_onRemoteCommandReceived_init",
  Blockly.Constants.Communication.COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'communication_onRemoteCommandReceived_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_MUTATOR_MIXIN = {
  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function () {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = Blockly.utils.xml.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    if (!xmlElement) return;
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.rebuildShape_();
  },
  // Store pointers to any connected child blocks.
  storeConnections_: function (arg) {
    if (!arg) arg = 0;
    this.statementConnections_ = [null];
    this.elseStatementConnection_ = null;
    for (var i = 1; i <= this.elseifCount_; i++) {
      if (arg != i) {
        this.statementConnections_.push(this.getInput('DO' + i)
          .connection.targetConnection);
      }
    }
    if (this.getInput('ELSE')) {
      this.elseStatementConnection_ = this.getInput('ELSE')
        .connection.targetConnection;
    }
  },
  // Restore pointers to any connected child blocks.
  restoreConnections_: function () {
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(this.statementConnections_[i], this, 'DO' + i);
    }
    if (this.getInput('ELSE')) {
      Blockly.Mutator.reconnect(this.elseStatementConnection_, this, 'ELSE');
    }
  },
  addElse_: function () {
    this.storeConnections_();
    var update = function () {
      this.elseCount_++;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  removeElse_: function () {
    this.storeConnections_();
    var update = function () {
      this.elseCount_--;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  addElseIf_: function () {
    this.storeConnections_();
    var update = function () {
      this.elseifCount_++;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  removeElseIf_: function (arg) {
    this.storeConnections_(arg);
    var update = function () {
      this.elseifCount_--;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  update_: function (update) {
    return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
  updateShape_: function () {
    this.saveDropdownFields_();
    // Delete everything.
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
      this.removeInput('ELSETITLE');
      this.removeInput('ELSEBUTTONS');
    }
    var i = 1;
    while (this.getInput('ELSEIF' + i)) {
      this.removeInput('ELSEIF' + i);
      this.removeInput('IFTITLE' + i);
      this.removeInput('IFBUTTONS' + i);
      this.removeInput('DO' + i);
      i++;
    }
    var that = this;
    // Rebuild block.
    for (var i = 1; i <= this.elseifCount_; i++) {
      var removeElseIf = function (arg) {
        return function () {
          that.removeElseIf_(arg);
        };
      }(i);
      this.appendDummyInput('ELSEIF' + i)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF)
        .appendField(new Blockly.FieldDropdown(this.remoteButtonDropdown), 'COMMAND' + i)
        .appendField(Blockly.Msg.COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_RECEIVED_THEN);
      this.appendDummyInput('IFTITLE' + i)
      this.appendDummyInput('IFBUTTONS' + i)
        .appendField(
          new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
            this.buttonSize, "*", removeElseIf, false))
        .setAlign(Blockly.ALIGN_RIGHT);
      this.appendStatementInput('DO' + i)
    }
    if (this.elseCount_) {
      this.appendDummyInput('ELSETITLE')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
      this.appendDummyInput('ELSEBUTTONS')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(
          new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize,
            this.buttonSize, "*", that.removeElse_.bind(that), false));
      this.appendStatementInput('ELSE')
    }
    if (this.getInput('ADDBUTTON')) this.removeInput('ADDBUTTON');
    var that = this;
    var addElseIf = function () {
      return function () {
        if (that.elseCount_ == 0) {
          that.addElse_();
        } else {
          if (!that.elseifCount_) that.elseifCount_ = 0;
          that.addElseIf_();
        }
      };
    }();
    this.appendDummyInput('ADDBUTTON')
      .appendField(
        new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize,
          this.buttonSize, "*", addElseIf, false));
    this.restoreDropdownFields_();
  },
  /**
   * Reconstructs the block with all child blocks attached.
   */
  rebuildShape_: function () {
    var statementConnections = [null];
    var elseStatementConnection = null;
    if (this.getInput('ELSE')) {
      elseStatementConnection = this.getInput('ELSE')
        .connection.targetConnection;
    }
    var i = 1;
    while (this.getInput('ELSEIF' + i)) {
      var inputDo = this.getInput('DO' + i);
      statementConnections.push(inputDo.connection.targetConnection);
      i++;
    }
    this.updateShape_();
    this.reconnectChildBlocks_(statementConnections,
      elseStatementConnection);
  },
  /**
   * Reconnects child blocks.
   * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
   * statement connections for do input.
   * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
   * connection for else input.
   */
  reconnectChildBlocks_: function (statementConnections,
    elseStatementConnection) {
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
  },
  saveDropdownFields_: function () {
    this.dropdownFieldsValue = new Array();
    for (var i = 1; i <= this.elseifCount_ - 1; i++) {
      this.dropdownFieldsValue.push(this.getFieldValue('COMMAND' + i))
    }
  },
  restoreDropdownFields_: function () {
    for (var i = 1; i <= this.elseifCount_ - 1; i++) {
      if (this.dropdownFieldsValue[i - 1] !== null) {
        this.getField('COMMAND' + i).setValue(this.dropdownFieldsValue[i - 1]);
      }
    }
  }
};

Blockly.Extensions.registerMutator("communication_onRemoteCommandReceived_mutator",
  Blockly.Constants.Communication.COMMUNICATION_REMOTECONTROL_ONCOMMANDRECEIVED_MUTATOR_MIXIN);