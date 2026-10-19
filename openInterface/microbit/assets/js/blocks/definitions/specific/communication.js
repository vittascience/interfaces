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

    // BLOCK ON RADIO DATA RECEIVED
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

    // BLOCK ON RADIO DATA RECEIVED
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

    // BLOCK ON RADIO DATA RECEIVED
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

    // BLOCK RADIO GET NEXT MESSAGE
    {
        "type": "communication_radioReceiveFull",
        "message0": "%{BKY_COMMUNICATION_RADIO_RECEIVE_FULL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_COMMUNICATION_RADIO_NEXT_MESSAGE}", "msg"],
                ["%{BKY_COMMUNICATION_RADIO_RSSI}", "rssi"],
                ["%{BKY_COMMUNICATION_RADIO_TIMESTAMP}", "timestamp"],
            ]
        }],
        "inputsInline": true,
        "output": "Number",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_RECEIVE_FULL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin Log blocks */

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
        }, {
            "type": "input_value",
            "name": "DATA",
            "check": "Number"
        }],
        "inputsInline": true,
        "output": "Number",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_LOG_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    /*Begin wireless communication blocks*/

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
        }, {
            "type": "field_grid_dropdown",
            "name": "TXD",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "RXD",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_SET_AT_COMMAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
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
        }, {
            "type": "field_grid_dropdown",
            "name": "TXD",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "RXD",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "String",
        "inputsInline": true,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_GET_AT_COMMAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // BLOCK HM10 SERIAL BLUETOOTH _ SEND DATA
    {
        "type": "communication_hm10_sendBluetoothData",
        "message0": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_SENDDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TXD",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "RXD",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // BLOCK HM10 SERIAL BLUETOOTH _ ON DATA RECEIVED
    {
        "type": "communication_hm10_onBluetoothDataReceived",
        "message0": "%{BKY_COMMUNICATION_HM10_BLUETOOTH_ONDATARECEIVED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TXD",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "RXD",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    /*Begin serial transmission blocks*/

    // BLOCK ON SERIAL DATA AVAILABLE _ READ DATA AND DO
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

    /* Begin Tracking modules */

    // GROVE RFID READER - GET CARD ID
    {
        "type": "communication_rfid_getCardID",
        "message0": "%{BKY_COMMUNICATION_RFID_GETCARDID_TITLE}",
        "args0": [{
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
        "tooltip": "%{BKY_COMMUNICATION_RFID_GETCARDID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // RC522 SPI READER _ GET STRING CARD ID
    {
        "type": "communication_mfrc522_getCardID",
        "message0": "%{BKY_COMMUNICATION_MFRC522_GETSTRINGCARDID_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "NSS",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "output": "String",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_MFRC522_GETSTRINGCARDID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /*Begin UART blocks*/

    // BLOCK SERIAL INIT
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "TX",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_SERIAL_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SERIAL REDIRECT USB
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

    // BLOCK UART WRITE
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

    // BLOCK UART READ
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

    // BLOCK UART READLINE
    {
        "type": "communication_uart_readLineData",
        "message0": "%{BKY_COMMUNICATION_UART_READLINE_TITLE}",
        "style": "communication_blocks",
        "output": "String",
        "tooltip": "%{BKY_COMMUNICATION_UART_READLINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin IC blocks */

    // BLOCK I2C INIT
    {
        "type": "communication_i2c_init",
        "message0": "%{BKY_COMMUNICATION_I2C_INIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQ",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "SDA",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "SCL",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_I2C_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK VOICE RECOGNITION _ SET VOLUME
    {
        "type": "communication_voiceRecognition_setVolume",
        "message0": "%{BKY_COMMUNICATION_VOICERECOGNITION_SET_VOLUME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOLUME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_VOICERECOGNITION_SET_VOLUME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK VOICE RECOGNITION _ GET COMMAND ID
    {
        "type": "communication_voiceRecognition_getCMDID",
        "message0": "%{BKY_COMMUNICATION_VOICERECOGNITION_GET_CMDID_TITLE}",
        "output": "Number",
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_VOICERECOGNITION_GET_CMDID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK VOICE RECOGNITION _ ON FIXED COMMAND
    {
        "type": "communication_voiceRecognition_onCommand",
        "message0": "%{BKY_COMMUNICATION_VOICERECOGNITION_ON_COMMAND_TITLE}",
        "args0": [{
            "type": "field_search_dropdown",
            "name": "ID",
            "columns": 2,
            // phrases à prononcer en anglais (module SEN0539-EN), donc non traduites
            "options": [
                ["Go forward (22)", "22"],
                ["Retreat (23)", "23"],
                ["Park a car (24)", "24"],
                ["Turn left ninety degrees (25)", "25"],
                ["Turn left forty-five degrees (26)", "26"],
                ["Turn left thirty degrees (27)", "27"],
                ["Turn right ninety degrees (28)", "28"],
                ["Turn right forty-five degrees (29)", "29"],
                ["Turn right thirty degrees (30)", "30"],
                ["Shift down a gear (31)", "31"],
                ["Line tracking mode (32)", "32"],
                ["Light tracking mode (33)", "33"],
                ["Bluetooth mode (34)", "34"],
                ["Obstacle avoidance mode (35)", "35"],
                ["Face recognition (36)", "36"],
                ["Object tracking (37)", "37"],
                ["Object recognition (38)", "38"],
                ["Line tracking (39)", "39"],
                ["Color recognition (40)", "40"],
                ["Tag recognition (41)", "41"],
                ["Object sorting (42)", "42"],
                ["Qr code recognition (43)", "43"],
                ["General settings (44)", "44"],
                ["Clear screen (45)", "45"],
                ["Learn once (46)", "46"],
                ["Forget (47)", "47"],
                ["Load model (48)", "48"],
                ["Save model (49)", "49"],
                ["Take photos and save them (50)", "50"],
                ["Save and return (51)", "51"],
                ["Display number zero (52)", "52"],
                ["Display number one (53)", "53"],
                ["Display number two (54)", "54"],
                ["Display number three (55)", "55"],
                ["Display number four (56)", "56"],
                ["Display number five (57)", "57"],
                ["Display number six (58)", "58"],
                ["Display number seven (59)", "59"],
                ["Display number eight (60)", "60"],
                ["Display number nine (61)", "61"],
                ["Display smiley face (62)", "62"],
                ["Display crying face (63)", "63"],
                ["Display heart (64)", "64"],
                ["Turn off dot matrix (65)", "65"],
                ["Read current posture (66)", "66"],
                ["Read ambient light (67)", "67"],
                ["Read compass (68)", "68"],
                ["Read temperature (69)", "69"],
                ["Read acceleration (70)", "70"],
                ["Reading sound intensity (71)", "71"],
                ["Calibrate electronic gyroscope (72)", "72"],
                ["Turn on the camera (73)", "73"],
                ["Turn off the camera (74)", "74"],
                ["Turn on the fan (75)", "75"],
                ["Turn off the fan (76)", "76"],
                ["Turn fan speed to gear one (77)", "77"],
                ["Turn fan speed to gear two (78)", "78"],
                ["Turn fan speed to gear three (79)", "79"],
                ["Start oscillating (80)", "80"],
                ["Stop oscillating (81)", "81"],
                ["Reset (82)", "82"],
                ["Set servo to ten degrees (83)", "83"],
                ["Set servo to thirty degrees (84)", "84"],
                ["Set servo to forty-five degrees (85)", "85"],
                ["Set servo to sixty degrees (86)", "86"],
                ["Set servo to ninety degrees (87)", "87"],
                ["Turn on the buzzer (88)", "88"],
                ["Turn off the buzzer (89)", "89"],
                ["Turn on the speaker (90)", "90"],
                ["Turn off the speaker (91)", "91"],
                ["Play music (92)", "92"],
                ["Stop playing (93)", "93"],
                ["The last track (94)", "94"],
                ["The next track (95)", "95"],
                ["Repeat this track (96)", "96"],
                ["Volume up (97)", "97"],
                ["Volume down (98)", "98"],
                ["Change volume to maximum (99)", "99"],
                ["Change volume to minimum (100)", "100"],
                ["Change volume to medium (101)", "101"],
                ["Play poem (102)", "102"],
                ["Turn on the light (103)", "103"],
                ["Turn off the light (104)", "104"],
                ["Brighten the light (105)", "105"],
                ["Dim the light (106)", "106"],
                ["Adjust brightness to maximum (107)", "107"],
                ["Adjust brightness to minimum (108)", "108"],
                ["Increase color temperature (109)", "109"],
                ["Decrease color temperature (110)", "110"],
                ["Adjust color temperature to maximum (111)", "111"],
                ["Adjust color temperature to minimum (112)", "112"],
                ["Daylight mode (113)", "113"],
                ["Moonlight mode (114)", "114"],
                ["Color mode (115)", "115"],
                ["Set to red (116)", "116"],
                ["Set to orange (117)", "117"],
                ["Set to yellow (118)", "118"],
                ["Set to green (119)", "119"],
                ["Set to cyan (120)", "120"],
                ["Set to blue (121)", "121"],
                ["Set to purple (122)", "122"],
                ["Set to white (123)", "123"],
                ["Turn on ac (124)", "124"],
                ["Turn off ac (125)", "125"],
                ["Increase temperature (126)", "126"],
                ["Decrease temperature (127)", "127"],
                ["Cool mode (128)", "128"],
                ["Heat mode (129)", "129"],
                ["Auto mode (130)", "130"],
                ["Dry mode (131)", "131"],
                ["Fan mode (132)", "132"],
                ["Enable blowing up and down (133)", "133"],
                ["Disable blowing up and down (134)", "134"],
                ["Enable blowing right and left (135)", "135"],
                ["Disable blowing right and left (136)", "136"],
                ["Open the window (137)", "137"],
                ["Close the window (138)", "138"],
                ["Open curtain (139)", "139"],
                ["Close curtain (140)", "140"],
                ["Open the door (141)", "141"],
                ["Close the door (142)", "142"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_VOICERECOGNITION_ON_COMMAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK VOICE RECOGNITION _ PLAY BY COMMAND ID
    {
        "type": "communication_voiceRecognition_playByCMDID",
        "message0": "%{BKY_COMMUNICATION_VOICERECOGNITION_PLAY_BY_CMDID_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_VOICERECOGNITION_PLAY_BY_CMDID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK I2C SCAN
    {
        "type": "communication_i2c_scan",
        "message0": "%{BKY_COMMUNICATION_I2C_SCAN_TITLE}",
        "style": "communication_blocks",
        "output": "Array",
        "tooltip": "%{BKY_COMMUNICATION_I2C_SCAN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK I2C READ
    {
        "type": "communication_i2c_read",
        "message0": "%{BKY_COMMUNICATION_I2C_READ_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ADDR",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "N",
            "check": "Number"
        }],
        "style": "communication_blocks",
        "output": "Array",
        "tooltip": "%{BKY_COMMUNICATION_I2C_READ_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_i2c_repeat_extension"
        ],
        "mutator": "communication_i2c_repeat_mutator"
    },

    // BLOCK I2C WRITE
    {
        "type": "communication_i2c_write",
        "message0": "%{BKY_COMMUNICATION_I2C_WRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ADDR",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "BUF",
            "check": "Array"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "communication_blocks",
        "tooltip": "%{BKY_COMMUNICATION_I2C_WRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "communication_i2c_repeat_extension"
        ],
        "mutator": "communication_i2c_repeat_mutator"
    },
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Communication ??= Object.create(null);

/**
 * Performs final setup of 'communication_log_setLabel' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_LOG_INIT_EXTENSION = function () {
    this.itemCount_ = 1;
    this.updateShape_();
};

Blockly.Extensions.register('communication_log_init_extension',
    Blockly.Constants.Communication.COMMUNICATION_LOG_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'communication_log_setLabel_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_LOG_SETLABEL_MUTATOR_MIXIN = {
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
            this.valueConnections_[i]?.reconnect(this, 'ADD' + i);
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
                    const id = Blockly.utils.idGenerator.genUid();
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
    Blockly.Constants.Communication.COMMUNICATION_LOG_SETLABEL_MUTATOR_MIXIN);


/**
 * Mixin for mutator functions in the 'communication_log_addData_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_LOG_ADDDATA_MUTATOR_MIXIN = {
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
            this.valueConnections_[i]?.reconnect(this, 'ADD' + i);
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
                    const id = Blockly.utils.idGenerator.genUid();
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
    Blockly.Constants.Communication.COMMUNICATION_LOG_ADDDATA_MUTATOR_MIXIN);


/**
 * Performs final setup of 'communication_i2c' blocks.
 * @this {Blockly.Block}
 */
Blockly.Constants.Communication.COMMUNICATION_I2C_REPEAT_INIT_EXTENSION = function () {
    this.option_ = false;
    this.update_(this.updateField_);
};

Blockly.Extensions.register("communication_i2c_repeat_extension",
    Blockly.Constants.Communication.COMMUNICATION_I2C_REPEAT_INIT_EXTENSION);

/**
 * Mixin for mutator functions in the 'communication_i2c' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Communication.COMMUNICATION_I2C_REPEAT_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('repeat', 'COMMUNICATION_I2C_REPEAT', 'input', false);

Blockly.Extensions.registerMutator('communication_i2c_repeat_mutator',
    Blockly.Constants.Communication.COMMUNICATION_I2C_REPEAT_MUTATOR_MIXIN);