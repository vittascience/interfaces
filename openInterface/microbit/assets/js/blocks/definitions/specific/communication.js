/**
 * @fileoverview Communication blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /*Begin micro:bit radio blocks*/

    // BLOCK RADIO SEND STRING
    {
        "type": "communication_radioSendString",
        "message0": "%{BKY_COMMUNICATION_RADIO_SENDSTRING_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STR",
            "check": "String"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_SENDSTRING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RADIO SEND NUMBER
    {
        "type": "communication_radioSendNumber",
        "message0": "%{BKY_COMMUNICATION_RADIO_SEND_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "N",
            "check": ["Number", "Boolean"]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_SEND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RADIO SEND VALUE
    {
        "type": "communication_radioSendValue",
        "message0": "%{BKY_COMMUNICATION_RADIO_SENDVALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "NAME",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "VALUE"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_SENDVALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK ON RADIO DATA RECEIVED
    {
        "type": "communication_onRadioDataReceived",
        "message0": "%{BKY_COMMUNICATION_RADIO_ONSTRINGRECEIVED_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "stringData"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_ONSTRINGRECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK ON RADIO DATA RECEIVED
    {
        "type": "communication_onRadioNumberReceived",
        "message0": "%{BKY_COMMUNICATION_RADIO_ONNUMBERRECEIVED_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "numberData"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_ONNUMBERRECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK ON RADIO DATA RECEIVED
    {
        "type": "communication_onRadioValueReceived",
        "message0": "%{BKY_COMMUNICATION_RADIO_ONVALUERECEIVED_TITLE}",
        "args0": [{
            "type": "field_variable",
            "name": "NAME",
            "variable": "name"
        }, {
            "type": "field_variable",
            "name": "VALUE",
            "variable": "value"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_ONVALUERECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RADIO CONFIGURATION
    {
        "type": "communication_radioConfig",
        "message0": "%{BKY_COMMUNICATION_RADIO_CONFIG_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "CANAL",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "POWER",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "LEN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "GROUP",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_CONFIG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

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

    // BLOCK ON SERIAL DATA AVAILABLE _ READ DATA 
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
            "block_init_helpurl"
        ]
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
    },

    //BLOCK SERIAL REDIRECT USB
    {
        "type": "communication_serialRedirectUSB",
        "message0": "%{BKY_COMMUNICATION_SERIAL_REDIRECTTOUSB_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_SERIAL_REDIRECTTOUSB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK SERIAL INIT
    {
        "type": "communication_serialInit",
        "message0": "%{BKY_COMMUNICATION_SERIAL_INIT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BAUD",
            "options": [
                ["9600", "9600"],
                ["14400", "14400"],
                ["19200", "19200"],
                ["28800", "28800"],
                ["38400", "38400"],
                ["57600", "57600"],
                ["115200", "115200"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_SERIAL_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK UART WRITE
    {
        "type": "communication_uart_writeData",
        "message0": "%{BKY_COMMUNICATION_UART_WRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_UART_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK DATA AVAILABLE UART
    {
        "type": "communication_uart_isDataAvailable",
        "message0": "%{BKY_COMMUNICATION_UART_DATA_AVAILABLE_TITLE}",
        "style": "communication_blocks",
        "output": "Boolean",
        "tooltip": "%{BKY_COMMUNICATION_UART_DATA_AVAILABLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK UART READ
    {
        "type": "communication_uart_readData",
        "message0": "%{BKY_COMMUNICATION_UART_READ_TITLE}",
        "style": "communication_blocks",
        "output": "String",
        "tooltip": "%{BKY_COMMUNICATION_UART_READ_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /*Begin data logging blocks*/

    // BLOCK WRITE ON OPENLOG SD CARD
    {
        "type": "communication_writeOpenLogSd",
        "message0": "%{BKY_COMMUNICATION_OPENLOG_WRITE_TITLE}",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "field_grid_dropdown",
            "name": "BAUD",
            "options": [
                ["4800", "4800"],
                ["9600", "9600"],
                ["57600", "57600"],
                ["115200", "115200"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
        "tooltip": "%{BKY_COMMUNICATION_OPENLOG_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /*Begin wireless communication blocks*/

    // BLOCK HC05 SERIAL BLUETOOTH _ SEND DATA
    {
        "type": "communication_sendBluetoothData",
        "message0": "%{BKY_COMMUNICATION_BLUETOOTH_SENDDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "input_value",
            "name": "DATA",
            "check": ["String", "Number", "Boolean"]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_BLUETOOTH_SENDDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK HC05 SERIAL BLUETOOTH _ ON DATA RECEIVED
    {
        "type": "communication_onBluetoothDataReceived",
        "message0": "%{BKY_COMMUNICATION_BLUETOOTH_ONDATARECEIVED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_variable",
            "name": "VAR",
            "variable": "bluetoothData"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_BLUETOOTH_ONDATARECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK HC05 SERIAL BLUETOOTH _ SEND DATA
    {
        "type": "communication_HM10_sendBluetoothData",
        "message0": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_SENDDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "input_value",
            "name": "DATA",
            "check": ["String", "Number", "Boolean"]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_SENDDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK HC05 SERIAL BLUETOOTH _ ON DATA RECEIVED
    {
        "type": "communication_HM10_onBluetoothDataReceived",
        "message0": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_ONDATARECEIVED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_variable",
            "name": "VAR",
            "variable": "HM10Data"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_ONDATARECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /*Begin tracking modules blocks*/

    // BLOCK GROVE GPS _ GET NMEA FRAME
    {
        "type": "communication_gps_getNMEA",
        "message0": "%{BKY_COMMUNICATION_GPS_GET_NMEA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "output": "Array",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GPS_GET_NMEA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE GPS _ GET GGA INFORMATIONS
    {
        "type": "communication_gps_getGGAInformations",
        "message0": "%{BKY_COMMUNICATION_GPS_GGA_GETINFORMATIONS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "INFO",
            "options": [
                ["%{BKY_COMMUNICATION_GPS_INFO_TYPE}", "type"],
                ["%{BKY_COMMUNICATION_GPS_INFO_CLOCK}", "clock"],
                ["%{BKY_COMMUNICATION_GPS_INFO_LATITUDE}", "latitude"],
                ["%{BKY_COMMUNICATION_GPS_INFO_LONGITUDE}", "longitude"],
                ["%{BKY_COMMUNICATION_GPS_INFO_SATELLITE}", "satellite"],
                ["%{BKY_COMMUNICATION_GPS_INFO_ALTITUDE}", "altitude"]
            ]
        }],
        "output": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GPS_GGA_GETINFORMATIONS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "communication_gps_getGGAInformations_get_type"
        ]
    },

    // 05/22 The 2 following blocks removed from toolbox. We keep the block cause of user projects.

    // BLOCK GROVE GPS _ ON GPS DATA AVAILABLE
    {
        "type": "communication_onGPSDataReceived",
        "message0": "%{BKY_COMMUNICATION_GPS_ONDATARECEIVED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "RX",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_variable",
            "name": "VAR",
            "variable": "gpsData"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GPS_ONDATARECEIVED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK GET GPS INFORMATIONS
    {
        "type": "communication_analyzeGPSInfo",
        "message0": "%{BKY_COMMUNICATION_GPS_GETINFORMATIONS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "INFO",
            "options": [
                ["%{BKY_COMMUNICATION_GPS_INFO_CLOCK}", "1"],
                ["%{BKY_COMMUNICATION_GPS_INFO_LATITUDE}", "2"],
                ["%{BKY_COMMUNICATION_GPS_INFO_LONGITUDE}", "4"],
                ["%{BKY_COMMUNICATION_GPS_INFO_SATELLITE}", "7"],
                ["%{BKY_COMMUNICATION_GPS_INFO_ALTITUDE}", "9"],
                ["%{BKY_COMMUNICATION_GPS_INFO_ALL_FRAME}", "0"]
            ]
        }, {
            "type": "input_value",
            "name": "DATA"
        }],
        "output": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GPS_GETINFORMATIONS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE RTC _ SET DATE
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

    // GROVE RTC _ SET HOUR
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
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MIN",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "SEC",
            "check": "Number"
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

    // GROVE RTC _ GET TIME
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
                ["%{BKY_CLOCK_ALL_DATA}", "ALL"],
                ["%{BKY_CLOCK_YEAR}", "0"],
                ["%{BKY_CLOCK_MONTH}", "1"],
                ["%{BKY_CLOCK_MONTH_DAY}", "2"],
                ["%{BKY_CLOCK_WEEK_DAY}", "3"],
                ["%{BKY_CLOCK_HOUR}", "4"],
                ["%{BKY_CLOCK_MINUTE}", "5"],
                ["%{BKY_CLOCK_SECOND}", "6"]
            ]
        }],
        "output": "Array",
        "inputsInline": true,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_GROVERTC_READTIME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // LOG BLOCKS
    {
        "type": "communication_log_deleteLogs",
        "message0": "%{BKY_COMMUNICATION_LOG_DELETE_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LOG_DELETE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "communication_log_serial",
        "message0": "%{BKY_COMMUNICATION_LOG_SERIAL_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LOG_SERIAL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // set labels
    {
        "type": "communication_log_setLabel",
        "message0": "%{BKY_COMMUNICATION_LOG_SETLABEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TIMESTAMP",
            "options": [
                ["MILISECONDS", "MILLISECONDS"],
                ["%{BKY_COMMUNICATION_LOG_SETLABEL_TIMESTAMP_SECONDS}", "SECONDS"],
                ["%{BKY_COMMUNICATION_LOG_SETLABEL_TIMESTAMP_MINUTES}", "MINUTES"],
                ["%{BKY_COMMUNICATION_LOG_SETLABEL_TIMESTAMP_HOURS}", "HOURS"],
                ["%{BKY_COMMUNICATION_LOG_SETLABEL_TIMESTAMP_DAYS}", "DAYS"],
                ["%{BKY_COMMUNICATION_LOG_SETLABEL_TIMESTAMP_NONE}", "None"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_LOG_SETLABEL_TOOLTIP}",
        "style": "communication_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_log_init_extension"
        ],
        "mutator": "communication_log_setLabel_mutator"
    },

    // add data to log
    {
        "type": "communication_log_addData",
        "message0": "%{BKY_COMMUNICATION_LOG_ADDDATA_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_LOG_ADDDATA_TOOLTIP}",
        "style": "communication_blocks",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_log_init_extension"
        ],
        "mutator": "communication_log_addData_mutator"
    },
    {
        "type": "communication_log_data",
        "message0": "%{BKY_COMMUNICATION_LOG_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LABEL",
        },
        {
            "type": "input_value",
            "name": "DATA",
            "check": "Number"
        }],
        "inputsInline": true,
        "output": "Number",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LOG_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    }
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.communication = Object.create(null);

/**
 * Performs final setup of 'communication_log_setLabel' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.communication.COMMUNICATION_LOG_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
    this.updateShape_();
};

Blockly.Extensions.register('communication_log_init_extension',
    Blockly.Constants.communication.COMMUNICATION_LOG_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'communication_log_setLabel_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.communication.COMMUNICATION_LOG_SETLABEL_MUTATOR_MIXIN = {
    /**
      * Create XML to represent number of text inputs.
      * @return {!Element} XML storage element.
      * @this {Blockly.Block}
      */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the text inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
    },
    storeValueConnections_: function () {
        this.valueConnections_ = [];
        for (var i = 0; i < this.itemCount_; i++) {
            this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
        }
    },
    restoreValueConnections_: function () {
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
        }
    },
    addItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_++;
        };
        this.update_(update);
        // Add text block
        if (this.itemCount_ > 1) {
            const dataBlockName = "text";
            if (Blockly.Blocks[dataBlockName]) {
                const newBlock = Blockly.utils.xml.createElement('block');
                newBlock.setAttribute('type', dataBlockName);
                if (newBlock) {
                    const id = Blockly.utils.genUid();
                    newBlock.setAttribute('id', id);
                    Blockly.Xml.domToBlock(newBlock, this.workspace);
                    const block = this.workspace.getBlockById(id);
                    block.setFieldValue("Label" + this.itemCount_, "TEXT");
                    this.valueConnections_.push(block.outputConnection);
                }
            }
        }
        this.restoreValueConnections_();
    },
    removeItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_--;
        };
        this.update_(update);
        this.restoreValueConnections_();
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function () {
        var that = this;
        var remove = function () {
            that.removeItem_();
        };
        var add = function () {
            that.addItem_();
        };
        // Remove all inputs
        if (this.getInput('TOP')) this.removeInput('TOP');
        var i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Update inputs
        var top = this.appendDummyInput('TOP');
        if (this.itemCount_ > 0) {
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
            if (this.itemCount_ > 1) {
                top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
            }
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i);
            }
        }
        /* Switch to vertical list when the list is too long */
        var showHorizontalList = this.itemCount_ <= 2;
        this.setInputsInline(showHorizontalList);
        this.setOutputShape(showHorizontalList ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
    }
};

Blockly.Extensions.registerMutator('communication_log_setLabel_mutator',
    Blockly.Constants.communication.COMMUNICATION_LOG_SETLABEL_MUTATOR_MIXIN);


/**
 * Mixin for mutator functions in the 'communication_log_addData_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.communication.COMMUNICATION_LOG_ADDDATA_MUTATOR_MIXIN = {
    /**
      * Create XML to represent number of text inputs.
      * @return {!Element} XML storage element.
      * @this {Blockly.Block}
      */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the text inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
    },
    storeValueConnections_: function () {
        this.valueConnections_ = [];
        for (var i = 0; i < this.itemCount_; i++) {
            this.valueConnections_.push(this.getInput('ADD' + i).connection.targetConnection);
        }
    },
    restoreValueConnections_: function () {
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'ADD' + i);
        }
    },
    addItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_++;
        };
        this.update_(update);
        // Add text block
        if (this.itemCount_ > 1) {
            const dataBlockName = "communication_log_data";
            if (Blockly.Blocks[dataBlockName]) {
                const newBlock = Blockly.utils.xml.createElement('block');
                newBlock.setAttribute('type', dataBlockName);
                if (newBlock) {
                    const id = Blockly.utils.genUid();
                    newBlock.setAttribute('id', id);
                    newBlock.appendChild(this.addShadowBlock_('LABEL', 'text', 'TEXT', 'Label' + this.itemCount_));
                    newBlock.appendChild(this.addShadowBlock_('DATA', 'math_number', 'NUM', 0));
                    Blockly.Xml.domToBlock(newBlock, this.workspace);
                    const block = this.workspace.getBlockById(id);
                    this.valueConnections_.push(block.outputConnection);
                }
            }
        }
        this.restoreValueConnections_();
    },
    removeItem_: function () {
        this.storeValueConnections_();
        var update = function () {
            this.itemCount_--;
        };
        this.update_(update);
        this.restoreValueConnections_();
    },
    update_: function (update) {
        return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function () {
        var that = this;
        var remove = function () {
            that.removeItem_();
        };
        var add = function () {
            that.addItem_();
        };
        // Remove all inputs
        if (this.getInput('TOP')) this.removeInput('TOP');
        var i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Update inputs
        var top = this.appendDummyInput('TOP');
        if (this.itemCount_ > 0) {
            top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
            if (this.itemCount_ > 1) {
                top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
            }
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i);
            }
        }
        /* Switch to vertical list when the list is too long */
        var showHorizontalList = this.itemCount_ <= 2;
        this.setInputsInline(showHorizontalList);
        this.setOutputShape(showHorizontalList ? Blockly.OUTPUT_SHAPE_ROUND : Blockly.OUTPUT_SHAPE_SQUARE);
    },
    addShadowBlock_(valueName, type, fieldName, content) {
        const value = Blockly.utils.xml.createElement('value');
        value.setAttribute('name', valueName);
        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', type);
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', fieldName);
        field.textContent = content;
        shadowBlock.appendChild(field);
        value.appendChild(shadowBlock);
        return value;
    }
};

Blockly.Extensions.registerMutator('communication_log_addData_mutator',
    Blockly.Constants.communication.COMMUNICATION_LOG_ADDDATA_MUTATOR_MIXIN);