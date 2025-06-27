/**
 * @fileoverview Input/Output blocks for Arduino.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin Arduino io blocks */

    // ARDUINO PAUSE JSON
    {
        "type": "io_wait",
        "message0": "%{BKY_IO_WAIT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_IO_WAIT_SECOND}", "SECOND"],
                ["%{BKY_IO_WAIT_MILLISECOND}", "MILLI"],
                ["%{BKY_IO_WAIT_MICROSECOND}", "MICRO"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_WAIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK WAIT UNTIL
    {
        "type": "io_waitUntil",
        "message0": "%{BKY_IO_WAIT_UNTIL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "UNTIL",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_WAIT_UNTIL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK INIT CHRONOMETER
    {
        "type": "io_getChronometer_simple",
        "message0": "%{BKY_IO_GETCHRONOMETER_SIMPLE_TITLE}",
        "output": "Decimal",
        "tooltip": "%{BKY_IO_GETCHRONOMETER_SIMPLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "io_initChronometer",
        "message0": "%{BKY_IO_INITCHRONOMETER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_INITCHRONOMETER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK GET CHRONOMETER
    {
        "type": "io_getChronometer",
        "message0": "%{BKY_IO_GETCHRONOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(s)", "1000.0"],
                ["(ms)", "1.0"]
            ]
        }],
        "output": "Decimal",
        "tooltip": "%{BKY_IO_GETCHRONOMETER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    /* Begin external modules blocks */

    // BLOCK GET KEYPAD NUMBER
    {
        "type": "io_getKeypadNumber",
        "message0": "%{BKY_IO_GROVEKEYPAD_GETNUMBER_TITLE}",
        "args0": [{
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
        "tooltip": "%{BKY_IO_GROVEKEYPAD_GETNUMBER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK GROVE THUMB JOYSTICK _ GET POSITION
    {
        "type": "io_getGroveThumbJoystick",
        "message0": "%{BKY_IO_GROVEJOYSTICK_GETAXIS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["X", "X"],
                ["Y", "Y"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN_X",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN_Y",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "tooltip": "%{BKY_IO_GROVEJOYSTICK_GETAXIS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // READ ANALOG POTENTIOMETER
    {
        "type": "io_getGroveSlidePotentiometer",
        "message0": "%{BKY_IO_GETGROVESLIDEPOTENTIOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "tooltip": "%{BKY_IO_GETGROVESLIDEPOTENTIOMETER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE ROTARY ANGLE _ GET VALUE
    {
        "type": "io_getGroveRotaryAngle",
        "message0": "%{BKY_IO_GETGROVEROTARYANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "tooltip": "%{BKY_IO_GETGROVEROTARYANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE TACTILE BUTTON _ READ DIGITAL
    {
        "type": "io_getGroveTactile",
        "message0": "%{BKY_IO_GETGROVETACTILE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "tooltip": "%{BKY_IO_GETGROVETACTILE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE SIMPLE BUTTON _ READ DIGITAL 
    {
        "type": "io_getGroveButton",
        "message0": "%{BKY_IO_GETGROVEBUTTON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "tooltip": "%{BKY_IO_GETGROVEBUTTON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE SWITCH BUTTON _ READ DIGITAL
    {
        "type": "io_getGroveSwitch",
        "message0": "%{BKY_IO_GETGROVESWITCH_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "tooltip": "%{BKY_IO_GETGROVESWITCH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE MP3 3.0 _ INIT
    {
        "type": "io_groveMp3_init",
        "message0": "%{BKY_IO_GROVEMP3_INIT_TITLE}",
        "args0": [{
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
        "inputsInline": true,
        "tooltip": "%{BKY_IO_GROVEMP3_INIT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE MP3 3.0 _ PLAY/PAUSE
    {
        "type": "io_groveMp3_play_pause",
        "message0": "%{BKY_IO_GROVEMP3_PLAY_PAUSE_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_GROVEMP3_PLAY_PAUSE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE MP3 3.0 _ PLAY SD SONG
    {
        "type": "io_groveMp3_playSDSong",
        "message0": "%{BKY_IO_GROVEMP3_PLAY_SD_SONG_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "NAME"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_GROVEMP3_PLAY_SD_SONG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE MP3 3.0 _ PLAY_SD_DIRECTORY_SONG
    {
        "type": "io_groveMp3_playSDDirectorySong",
        "message0": "%{BKY_IO_GROVEMP3_PLAY_SD_DIRECTORY_SONG_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DIRECTORY"
        }, {
            "type": "input_value",
            "name": "INDEX",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_GROVEMP3_PLAY_SD_DIRECTORY_SONG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE MP3 3.0 _ NEXT
    {
        "type": "io_groveMp3_next",
        "message0": "%{BKY_IO_GROVEMP3_NEXT_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_GROVEMP3_NEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE MP3 3.0 _ GET VOLUME
    {
        "type": "io_groveMp3_getVolume",
        "message0": "%{BKY_IO_GROVEMP3_GET_VOLUME_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_IO_GROVEMP3_GET_VOLUME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE MP3 3.0 _ SET VOLUME
    {
        "type": "io_groveMp3_setVolume",
        "message0": "%{BKY_IO_GROVEMP3_SET_VOLUME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOLUME",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_GROVEMP3_SET_VOLUME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    /* Begin pins blocks */

    // BLOCK HIGH/LOW BOOLEAN LED_BUILTIN
    {
        "type": "io_led_builtin",
        "message0": "%{BKY_IO_LED_BUILTIN_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_IO_LED_BUILTIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "io_digital_signal",
        "message0": "%{BKY_IO_DIGITAL_SIGNAL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_DIGITAL_SIGNAL_HIGH}", "HIGH"],
                ["%{BKY_IO_DIGITAL_SIGNAL_LOW}", "LOW"]
            ]
        }],
        "output": "Boolean",
        "tooltip": "%{BKY_IO_DIGITAL_SIGNAL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // READ DIGITAL PIN JSON 
    {
        "type": "io_readDigitalPin",
        "message0": "%{BKY_IO_READDIGITALPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "tooltip": "%{BKY_IO_READDIGITALPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "io_readDigitalPin_input",
        "message0": "%{BKY_IO_READDIGITALPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
        }],
        "output": "Boolean",
        "tooltip": "%{BKY_IO_READDIGITALPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK WRITE DIGITAL PIN
    {
        "type": "io_writeDigitalPin",
        "message0": "%{BKY_IO_WRITEDIGITALPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_WRITEDIGITALPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "io_writeDigitalPin_input",
        "message0": "%{BKY_IO_WRITEDIGITALPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PIN",
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_WRITEDIGITALPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK READ ANALOG 
    {
        "type": "io_readAnalogPin",
        "message0": "%{BKY_IO_READANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "tooltip": "%{BKY_IO_READANALOGPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "io_readAnalogPin_input",
        "message0": "%{BKY_IO_READANALOGPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
        }],
        "output": "Number",
        "tooltip": "%{BKY_IO_READANALOGPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK WRITE ANALOG 
    {
        "type": "io_writeAnalogPin",
        "message0": "%{BKY_IO_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_WRITEANALOGPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },
    {
        "type": "io_writeAnalogPin_input",
        "message0": "%{BKY_IO_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PIN",
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_WRITEANALOGPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK SET PWM SIGNAL 
    {
        "type": "io_setPwm",
        "message0": "%{BKY_IO_SETPWM_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "tooltip": "%{BKY_IO_SETPWM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // BLOCK PULSE IN HIGH/LOW 
    {
        "type": "io_readPulseIn",
        "message0": "%{BKY_IO_READPULSEIN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "output": "Number",
        "tooltip": "%{BKY_IO_READPULSEIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // SET EVENT ON PIN 2/3 - attachInterrupt()  
    {
        "type": "io_attachInterrupt",
        "message0": "%{BKY_IO_ATTACH_INTERRUPT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "EDGE",
            "options": [
                ["%{BKY_IO_RISING_EDGE}", "RISING"],
                ["%{BKY_IO_FALLING_EDGE}", "FALLING"],
                ["%{BKY_IO_BOTH_EDGE}", "CHANGE"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["D2", "2"],
                ["D3", "3"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "inputsInline": true,
        "tooltip": "%{BKY_IO_ATTACH_INTERRUPT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)