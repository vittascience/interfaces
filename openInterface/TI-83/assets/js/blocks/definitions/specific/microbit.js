/**
 * @fileoverview Micro:bit blocks for TI-83 Premium CE.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /** Micro:bit basic functions */

    // BLOCK MICROBIT - SLEEP
    {
        "type": "microbit_sleep",
        "message0": "%{BKY_MICROBIT_SLEEP_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_MICROBIT_SLEEP_MILLISECOND}", "MILLI"],
                ["%{BKY_MICROBIT_SLEEP_MICROSECOND}", "MICRO"],
                ["%{BKY_MICROBIT_SLEEP_SECOND}", "SECOND"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_SLEEP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MICROBIT - WHILE NOT ESCAPE
    {
        "type": "microbit_while_condition",
        "message0": "%{BKY_MICROBIT_WHILE_CONDITION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "CONDITION",
            "check": "Boolean"
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_WHILE_CONDITION_TOOLTIP}"
    },

    // BLOCK MICROBIT - ESCAPE
    {
        "type": "microbit_escape",
        "message0": "%{BKY_MICROBIT_ESCAPE_TITLE}",
        "output": "Boolean",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_ESCAPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MICROBIT - DISP CLR
    {
        "type": "microbit_disp_clr",
        "message0": "%{BKY_MICROBIT_DISP_CLR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_DISP_CLR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MICROBIT - STORE LIST
    {
        "type": "microbit_store_list",
        "message0": "%{BKY_MICROBIT_STORE_LIST_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LIST",
            "check": "Array"
        }, {
            "type": "field_grid_dropdown",
            "name": "INDEX",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_STORE_LIST_TOOLTIP}"
    },

    // BLOCK MICROBIT - GET TEMPERATURE
    {
        "type": "sensors_getTemperature",
        "message0": "%{BKY_MICROBIT_TEMPERATURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(°C)", "CELSIUS"],
                ["(°F)", "FAHRENHEIT"],
                ["(K)", "KELVIN"]
            ]
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_TEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Micro:bit screen blocks */

    //BLOCK SHOW LEDS
    {
        "type": "show_leds",
        "message0": "%{BKY_SHOW_LEDS_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "extensions": [
            "block_init_helpurl",
            "show_leds_screen_init"
        ]
    },

    //BLOCK SHOW NUMBER
    {
        "type": "show_number",
        "message0": "%{BKY_SHOW_NUMBER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK SHOW STRING
    {
        "type": "show_string",
        "message0": "%{BKY_SHOW_STRING_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK SHOW ICON
    {
        "type": "show_icon",
        "message0": "%{BKY_SHOW_ICON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ICON",
            "options": [
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/heart.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HEART"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/happy.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HAPPY"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/sad.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SAD"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/yes.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "YES"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/no.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "NO"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/man.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "STICKFIGURE"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/pitchfork.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "PITCHFORK"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/umbrella.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "UMBRELLA"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/skull.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SKULL"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/chessboard.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "CHESSBOARD"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/butterfly.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "BUTTERFLY"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK SHOW CLOCK ICON
    {
        "type": "show_clock",
        "message0": "%{BKY_SHOW_CLOCK_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "CLOCK",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK SHOW ARROW ICON
    {
        "type": "show_arrow",
        "message0": "%{BKY_SHOW_ARROW_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ARROW",
            "options": [
                ["Nord", "N"],
                ["Nord-Est", "NE"],
                ["Est", "E"],
                ["Sud-Est", "SE"],
                ["Sud", "S"],
                ["Sud-Ouest", "SW"],
                ["Ouest", "W"],
                ["Nord-Ouest", "NW"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_SHOW_ARROW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SHOW GAUGE
    {
        "type": "display_show_gauge",
        "message0": "%{BKY_SHOW_GAUGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MAX",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_SHOW_GAUGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK SCREEN CLEAR
    {
        "type": "clear",
        "message0": "%{BKY_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
    },

    // BLOCK SET PIXEL
    {
        "type": "set_pixel",
        "message0": "%{BKY_SET_PIXEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_SET_PIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET LIGHT PIXEL
    {
        "type": "set_light_pixel",
        "message0": "%{BKY_SET_LIGHT_PIXEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "LIGHT",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_SET_LIGHT_PIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET LIGHT
    {
        "type": "sensors_getLight",
        "message0": "%{BKY_SENSORS_GETLIGHT_TITLE}",
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_SENSORS_GETLIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Micro:bit music blocks */

    // MUSIC LIBRARY _ PLAY MUSIC
    {
        "type": "actuators_music_playMusic",
        "message0": "%{BKY_MICROBIT_MUSIC_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Pirates des Caraïbes", "CARRIBEAN_PIRATES"],
                ["Gamme", "GAMME"],
                ["Star Wars", "SW"],
                ["R2D2", "R2D2"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_MUSIC_PLAYMUSIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // MUSIC LIBRARY _ PLAY SONG
    {
        "type": "actuators_music_playSong",
        "message0": "%{BKY_MICROBIT_MUSIC_PLAYSONG_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SONG",
            "options": [
                ["Beethoven - Dadadadum", "DADADADUM"],
                ["Joplin - Entertainer", "ENTERTAINER"],
                ["Bach - Prelude", "PRELUDE"],
                ["Beethoven - Ode to Joy", "ODE"],
                ["Ringtone", "RINGTONE"],
                ["Funk", "FUNK"],
                ["Blues", "BLUES"],
                ["Happy Birthday", "BIRTHDAY"],
                ["Wagner - Wedding", "WEDDING"],
                ["Chopin - Funeral March", "FUNERAL"],
                ["Wawawawaa", "WAWAWAWAA"],
                ["Jump Up", "JUMP_UP"],
                ["Jump down", "JUMP_DOWN"],
                ["Power Up", "POWER_UP"],
                ["Power Down", "POWER_DOWN"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_MUSIC_PLAYSONG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // MUSIC LIBRARY _ PLAY NOTES
    {
        "type": "actuators_music_playNotes",
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_MUSIC_PLAYNOTES_TOOLTIP}",
        "extensions": [
            "block_buttons_plus_minus"
        ],
        "mutator": "actuators_play_notes_mutator"
    },

    // MUSIC LIBRARY _ NOTE DEFINITION
    {
        "type": "actuators_music_note",
        "message0": "%{BKY_MICROBIT_MUSIC_NOTE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "NOTE",
            "options": [
                ["%{BKY_NOTE_C}", "c"],
                ["%{BKY_NOTE_C_SHARP}", "c#"],
                ["%{BKY_NOTE_D}", "d"],
                ["%{BKY_NOTE_D_SHARP}", "d#"],
                ["%{BKY_NOTE_E}", "e"],
                ["%{BKY_NOTE_F}", "f"],
                ["%{BKY_NOTE_F_SHARP}", "f#"],
                ["%{BKY_NOTE_G}", "g"],
                ["%{BKY_NOTE_G_SHARP}", "g#"],
                ["%{BKY_NOTE_A}", "a"],
                ["%{BKY_NOTE_A_SHARP}", "a#"],
                ["%{BKY_NOTE_B}", "b"],
                ["%{BKY_MUSIC_SILENCE}", "r"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "OCTAVE",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DURATION",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
            ]
        }],
        "output": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_MICROBIT_MUSIC_NOTE_TOOLTIP}",
    },

    // MUSIC LIBRARY _ PLAY FREQUENCY
    {
        "type": "actuators_music_playFrequency",
        "message0": "%{BKY_MICROBIT_MUSIC_PLAYFREQUENCY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_MUSIC_PLAYFREQUENCY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // MUSIC LIBRARY _ SET TEMPO
    {
        "type": "actuators_music_setTempo",
        "message0": "%{BKY_MICROBIT_MUSIC_SETTEMPO_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TICKS",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "BPM",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_MUSIC_SETTEMPO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // MICROBIT _ SET VOLUME
    {
        "type": "actuators_music_setVolume",
        "message0": "%{BKY_MICROBIT_MUSIC_SETVOLUME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOL",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_MUSIC_SETVOLUME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin micro:bit audio blocks */

    // AUDIO LIBRARY _ PLAY MUSIC
    {
        "type": "microbit_audio_play",
        "message0": "%{BKY_MICROBIT_AUDIO_PLAY_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SONG",
            "options": [
                ["Giggle", "GIGGLE"],
                ["Happy", "HAPPY"],
                ["Hello", "HELLO"],
                ["Mysterious", "MYSTERIOUS"],
                ["Sad", "SAD"],
                ["Slide", "SLIDE"],
                ["Soaring", "SOARING"],
                ["Spring", "SPRING"],
                ["Twinkle", "TWINKLE"],
                ["Yawn", "YAWN"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_AUDIO_PLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // AUDIO LIBRARY _ STOP MUSIC
    {
        "type": "microbit_audio_stop",
        "message0": "%{BKY_MICROBIT_AUDIO_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_AUDIO_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin micro:bit microphone blocks */

    {
        "type": "io_micro_onSoundDetected",
        "message0": "%{BKY_IO_MICRO_ONSOUNDDETECTED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_MICRO_LOUD}", "LOUD"],
                ["%{BKY_IO_MICRO_QUIET}", "QUIET"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_IO_MICRO_IS}", "IS"],
                ["%{BKY_IO_MICRO_WAS}", "WAS"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MICRO_ONSOUNDDETECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MICROPHONE _ GET CURRENT SOUND
    {
        "type": "io_micro_getCurrentSound",
        "message0": "%{BKY_IO_MICRO_GETCURRENTSOUND_TITLE}",
        "output": "String",
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MICRO_GETCURRENTSOUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK IS BUTTON PRESSED
    {
        "type": "io_micro_soundDetected",
        "message0": "%{BKY_IO_MICRO_SOUNDDETECTED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_MICRO_LOUD}", "LOUD"],
                ["%{BKY_IO_MICRO_QUIET}", "QUIET"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_IO_MICRO_IS}", "IS"],
                ["%{BKY_IO_MICRO_WAS}", "WAS"]
            ]
        }],
        "output": "Boolean",
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MICRO_SOUNDDETECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MICROPHONE _ GET SOUND LEVEL
    {
        "type": "io_micro_getSoundLevel",
        "message0": "%{BKY_IO_MICRO_GETSOUNDLEVEL_TITLE}",
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MICRO_GETSOUNDLEVEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MICROPHONE _ ON LOUD/QUIET SOUND WAS
    {
        "type": "io_micro_setSoundThreshold",
        "message0": "%{BKY_IO_MICRO_SETSOUNDTHRESHOLD_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_MICRO_LOUD}", "LOUD"],
                ["%{BKY_IO_MICRO_QUIET}", "QUIET"]
            ]
        }, {
            "type": "input_value",
            "name": "THRESH",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MICRO_SETSOUNDTHRESHOLD_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MICROHONE _ GET (LOUD/QUIET) CONSTANT
    {
        "type": "io_micro_soundCondition",
        "message0": "%{BKY_IO_MICRO_SOUNDCONDITION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_MICRO_LOUD}", "LOUD"],
                ["%{BKY_IO_MICRO_QUIET}", "QUIET"]
            ]
        }],
        "output": "String",
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MICRO_SOUNDCONDITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Micro:bit button blocks */

    // BLOCK BUTTONS - ON BUTTON PRESSED
    {
        "type": "io_onButtonPressed",
        "message0": "%{BKY_IO_ONBUTTONPRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["A+B", "a+b"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_IO_ISPRESSED}", "IS"],
                ["%{BKY_IO_WASPRESSED}", "WAS"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_ONBUTTONPRESSED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BUTTONS - IS BUTTON PRESSED
    {
        "type": "io_isButtonPressed",
        "message0": "%{BKY_IO_ISBUTTONPRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"],
                ["A+B", "a+b"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_IO_ISPRESSED}", "IS"],
                ["%{BKY_IO_WASPRESSED}", "WAS"],
            ]
        }],
        "output": "Boolean",
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_ISBUTTONPRESSED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BUTTONS - GET PRESSES 
    {
        "type": "io_buttons_getPresses",
        "message0": "%{BKY_IO_BUTTONS_GET_PRESSES_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["A", "a"],
                ["B", "b"]
            ]
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_BUTTONS_GET_PRESSES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK BUTTONS - IS PIN TOUCHED
    {
        "type": "io_isLogoTouched",
        "message0": "%{BKY_IO_IS_LOGO_TOUCHED_TITLE}",
        "output": "Boolean",
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_IS_LOGO_TOUCHED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin micro:bit board sensors blocks*/

    // BLOCK ACCELEROMETER - GET BY AXIS
    {
        "type": "microbit_accelerometer_getByAxis",
        "message0": "%{BKY_MICROBIT_ACCELEROMETER_GET_BY_AXIS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["x", "x"],
                ["y", "y"],
                ["z", "z"]
            ]
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_ACCELEROMETER_GET_BY_AXIS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ACCELEROMETER - GET VALUES
    {
        "type": "microbit_accelerometer_getValues",
        "message0": "%{BKY_MICROBIT_ACCELEROMETER_GET_VALUES_TITLE}",
        "output": "Array",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_ACCELEROMETER_GET_VALUES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ACCELEROMETER - GET MAGNITUDE
    {
        "type": "microbit_accelerometer_getMagnitude",
        "message0": "%{BKY_MICROBIT_ACCELEROMETER_GET_MAGNITUDE_TITLE}",
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_ACCELEROMETER_GET_MAGNITUDE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET ROTATION
    {
        "type": "microbit_accelerometer_getRotation",
        "message0": "%{BKY_MICROBIT_ACCELEROMETER_GET_ROTATION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_MICROBIT_ACCELEROMETER_GET_ROTATION_PITCH}", "pitch"],
                ["%{BKY_MICROBIT_ACCELEROMETER_GET_ROTATION_ROLL}", "roll"]
            ]
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_ACCELEROMETER_GET_ROTATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK COMPASS - HEADING
    {
        "type": "microbit_compass_heading",
        "message0": "%{BKY_MICROBIT_COMPASS_HEADING_TITLE}",
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_COMPASS_HEADING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK COMPASS - GET MAGNETIC STRENGTH BY AXIS
    {
        "type": "microbit_compass_getMagneticStrengthByAxis",
        "message0": "%{BKY_MICROBIT_COMPASS_GET_MAGNETIC_STRENGTH_BY_AXIS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["x", "x"],
                ["y", "y"],
                ["z", "z"]
            ]
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_COMPASS_GET_MAGNETIC_STRENGTH_BY_AXIS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK COMPASS - IS CALIBRATED
    {
        "type": "microbit_compass_isCalibrated",
        "message0": "%{BKY_MICROBIT_COMPASS_IS_CALIBRATED_TITLE}",
        "output": "Boolean",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_COMPASS_IS_CALIBRATED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK COMPASS - GET FIELD STRENGTH
    {
        "type": "microbit_compass_getFieldStrength",
        "message0": "%{BKY_MICROBIT_COMPASS_GET_FIELD_STRENGTH_TITLE}",
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_COMPASS_GET_FIELD_STRENGTH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK COMPASS - CALIBRATE
    {
        "type": "microbit_compass_calibrate",
        "message0": "%{BKY_MICROBIT_COMPASS_CALIBRATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ACTION",
            "options": [
                ["%{BKY_MICROBIT_COMPASS_CALIBRATE}", "CALIBRATE"],
                ["%{BKY_MICROBIT_COMPASS_CLEAR_CALIBRATION}", "CLEAR"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_COMPASS_CALIBRATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ACCELEROMETER - GET CURRENT GESTURE
    {
        "type": "microbit_accelerometer_getCurrentGesture",
        "message0": "%{BKY_MICROBIT_ACCELEROMETER_GET_CURRENT_GESTURE_TITLE}",
        "output": "String",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_ACCELEROMETER_GET_CURRENT_GESTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ACCELEROMETER - ON GESTURE TYPE
    {
        "type": "microbit_accelerometer_onGestureType",
        "message0": "%{BKY_MICROBIT_ACCELEROMETER_ON_GESTURE_TYPE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "GESTURE",
            "options": [
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_UP}", "up"], //logo up
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_DOWN}", "down"], //logo down
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_LEFT}", "left"], //tilt left
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_RIGHT}", "right"], //tilt right
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_FACE_UP}", "face up"], //screen up
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_FACE_DOWN}", "face down"], //screen down
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_SHAKE}", "shake"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_IS}", "IS"],
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_WAS}", "WAS"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_ACCELEROMETER_ON_GESTURE_TYPE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ACCELEROMETER - GET CURRENT GESTURE
    {
        "type": "microbit_accelerometer_isGesture",
        "message0": "%{BKY_MICROBIT_ACCELEROMETER_IS_GESTURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "GESTURE",
            "options": [
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_UP}", "up"], //logo up
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_DOWN}", "down"], //logo down
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_LEFT}", "left"], //tilt left
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_RIGHT}", "right"], //tilt right
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_FACE_UP}", "face up"], //screen up
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_FACE_DOWN}", "face down"], //screen down
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_TYPE_SHAKE}", "shake"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_IS}", "IS"],
                ["%{BKY_MICROBIT_ACCELEROMETER_GESTURE_WAS}", "WAS"]
            ]
        }],
        "output": "Boolean",
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_ACCELEROMETER_IS_GESTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

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
        "style": "mb_blocks",
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
        "style": "mb_blocks",
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
        "style": "mb_blocks",
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
        "style": "mb_blocks",
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
        "style": "mb_blocks",
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
        "style": "mb_blocks",
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
        "style": "mb_blocks",
        "tooltip": "%{BKY_COMMUNICATION_RADIO_CONFIG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin Neopixel blocks */

    // BLOCK NEOPIXEL _ DEFINE NEOPIXEL
    {
        "type": "display_defineNeopixel",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TITLE}",
        "args0": [{
            "type": "field_slider",
            "name": "N",
            "value": 20,
            "min": 1,
            "max": 1000
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED
    {
        "type": "display_controlNeopixelLed",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_LEDCONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "display_controlColorNeopixelLed",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "display_neopixel_controlAllLedRGB",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "display_neopixel_controlAllLedPalette",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RAINBOW NEOPIXEL
    {
        "type": "display_rainbowNeopixel",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_RAINBOW_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_RAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SWITCH OFF NEOPIXEL
    {
        "type": "microbit_neopixel_switchOff",
        "message0": "%{BKY_MICROBIT_NEOPIXEL_SWITCH_OFF_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_NEOPIXEL_SWITCH_OFF_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "microbit_neopixel_color",
        "message0": "%{BKY_MICROBIT_NEOPIXEL_COLOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "R",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "G",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "B",
                "check": "Number"
            },

            {
                "type": "field_grid_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.MICROBIT_PINS
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_NEOPIXEL_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /*Begin control pins blocks*/

    // BLOCK ON/OFF BOOLEAN
    {
        "type": "io_digital_signal",
        "message0": "%{BKY_IO_MB_DIGITALSIGNAL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BOOL",
            "options": [
                ["%{BKY_IO_MB_DIGITALSIGNAL_HIGH}", "HIGH"],
                ["%{BKY_IO_MB_DIGITALSIGNAL_LOW}", "LOW"]
            ]
        }],
        "output": "Boolean",
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MB_DIGITALSIGNAL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK READ DIGITAL PIN
    {
        "type": "io_readDigitalPin",
        "message0": "%{BKY_IO_MB_READDIGITALPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "style": "mb_blocks",
        "output": "Boolean",
        "tooltip": "%{BKY_IO_MB_READDIGITALPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WRITE DIGITAL PIN
    {
        "type": "io_writeDigitalPin",
        "message0": "%{BKY_IO_MB_WRITEDIGITALPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MB_WRITEDIGITALPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK READ ANALOG PIN
    {
        "type": "io_readAnalogPin",
        "message0": "%{BKY_IO_MB_READANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MB_READANALOGPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK WRITE ANALOG 
    {
        "type": "io_writeAnalogPin",
        "message0": "%{BKY_IO_MB_WRITEANALOGPIN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MB_WRITEANALOGPIN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET PWM
    {
        "type": "io_setPwm",
        "message0": "%{BKY_IO_MB_SETPWM_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "PERIOD",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(ms)", "MS"],
                ["(μs)", "US"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_IO_MB_SETPWM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Micro:bit - Inputs

    // GROVE SHT31 SENSOR _ READ DATA (I2C)
    {
        "type": "sensors_SHT31readData",
        "message0": "%{BKY_SENSORS_SHT31_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
                ["%{BKY_SENSORS_HUMIDITY}", "HUM"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "mb_blocks",
        "tooltip": "%{BKY_SENSORS_SHT31_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // BLOCK GROVE TEMPERATURE SENSOR
    {
        "type": "sensors_getGroveTemperature",
        "message0": "%{BKY_SENSORS_GETGROVETEMPERATURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(°C)", "CELSIUS"],
                ["(°F)", "FAHRENHEIT"],
                ["(K)", "KELVIN"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVETEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE MOISTURE SENSOR
    {
        "type": "sensors_getGroveMoisture",
        "message0": "%{BKY_SENSORS_GETGROVEMOISTURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEMOISTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE LIGHT SENSOR JSON
    {
        "type": "sensors_getGroveLight",
        "message0": "%{BKY_SENSORS_GETGROVELIGHT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVELIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // TI Grove - Read pressure
    {
        "type": "sensors_mpx5700ap_getPressure",
        "message0": "%{BKY_SENSORS_MPX5700AP_GETPRESSURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_ANALOG_READ_PINS
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_SENSORS_MPX5700AP_GETPRESSURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // TI Grove - Calibrate pressure sensor
    {
        "type": "sensors_mpx5700ap_calibrate",
        "message0": "%{BKY_SENSORS_MPX5700AP_CALIBRATE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "M",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_SENSORS_MPX5700AP_CALIBRATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE  ULTRASONIC SENSOR _ GET DISTANCE
    {
        "type": "sensors_getGroveUltrasonicRanger",
        "message0": "%{BKY_SENSORS_GETGROVEULTRASONIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["Grove", "GROVE"],
                ["HC-SR04", "HC-SR04"]
            ],
        }, {
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_ULTRASONIC_DISTANCE}", "DIST"],
                ["%{BKY_SENSORS_ULTRASONIC_DURATION}", "TIME"]
            ],
        }],
        "output": "Number",
        "style": "mb_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEULTRASONIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_ultrasonic_mutator"
    },

    // GROVE BME280 SENSOR _ READ
    {
        "type": "microbit_grove_read_bme280",
        "message0": "%{BKY_MICROBIT_GROVE_READ_BME280_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_MICROBIT_GROVE_READ_BME280_TEMP}", "TEMP"],
                ["%{BKY_MICROBIT_GROVE_READ_BME280_PRESS}", "PRESS"],
                ["%{BKY_MICROBIT_GROVE_READ_BME280_HUM}", "HUM"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "mb_blocks",
        "tooltip": "%{BKY_MICROBIT_GROVE_READ_BME280_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // Micro:bit - Outputs

    // GROVE LED MODULE _ WRITE DIGITAL JSON
    {
        "type": "display_setGroveSocketLed",
        "message0": "%{BKY_DISPLAY_SETGROVELED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_DISPLAY_SETGROVELED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // MOTOR _ SET UP POWER 
    {
        "type": "actuators_setMotorPower",
        "message0": "%{BKY_ACTUATORS_MOTOR_SETPOWER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "POWER",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_ACTUATORS_MOTOR_SETPOWER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE RELAY _ WRITE DIGITAL
    {
        "type": "actuators_setGroveRelayState",
        "message0": "%{BKY_ACTUATORS_GROVERELAY_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_ACTUATORS_GROVERELAY_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // SERVOMOTEUR _ SET POSITION
    {
        "type": "actuators_setServoAngle",
        "message0": "%{BKY_ACTUATORS_SERVO_SETANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "mb_blocks",
        "tooltip": "%{BKY_ACTUATORS_SERVO_SETANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]);

Blockly.Constants.Microbit = Object.create(null);

/**
 * Performs setup of 'show_leds' block for screen checkboxes display.
 * @this {Blockly.Block}
 */
Blockly.Constants.Microbit.DISPLAY_SHOW_LEDS_INIT_EXTENSION = function () {
    for (var row = 0; row < 5; row++) {
        let rowBoxes = this.appendDummyInput("ROW" + row);
        for (var column = 0; column < 5; column++) {
            const box = new Blockly.FieldCheckboxColor(0, { 'height': 28, 'width': 24 });
            rowBoxes.appendField(box, "LED" + row + "" + column);
        }
    }
};

/**
 * Mixin for mutator functions in the 'actuators_play_notes_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Microbit.ACTUATORS_PLAY_NOTES_MUTATOR_MIXIN = {
    /**
     * Create XML to represent number of data inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the data inputs.
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
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
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
        this.restoreValueConnections_();
        // Add shadow block
        if (this.itemCount_ > 1) {
            // Find shadow type
            var firstInput = this.getInput('ADD' + 0);
            if (firstInput && firstInput.connection.targetConnection) {
                // Create a new shadow DOM with the same type as the first input
                // but with an empty default value
                var newInput = this.getInput('ADD' + (this.itemCount_ - 1));
                var shadowInputDom = firstInput.connection.getShadowDom();
                if (shadowInputDom) {
                    var shadowDom = Blockly.utils.xml.createElement('shadow');
                    var shadowInputType = shadowInputDom.getAttribute('type');
                    shadowDom.setAttribute('type', shadowInputType);
                    if (shadowDom) {
                        shadowDom.setAttribute('id', Blockly.utils.genUid());
                        newInput.connection.setShadowDom(shadowDom);
                        newInput.connection.respawnShadow_();
                    }
                }
            }
        }
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
        top.appendField(Blockly.Msg['MICROBIT_MUSIC_PLAYNOTES_TITLE']);
        top.appendField(new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", add, false));
        if (this.itemCount_ > 1) {
            top.appendField(new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, this.buttonSize, this.buttonSize, "*", remove, false));
        }
        for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i);
        }
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
    }
};

/**
 * Performs final setup of ultrasonic block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Microbit.SENSORS_ULTRASONIC_INIT_EXTENSION = function () {
    var dropdown = this.getField("SENSOR");
    dropdown.setValidator(function (value) {
        var newSensor = (value == "GROVE");
        if (newSensor != this.isGrove_) {
            var block = this.getSourceBlock();
            block.updateField_(newSensor);
        }
    });
    var isGroveInital = (this.getFieldValue("SENSOR") == "GROVE");
    this.updateField_(isGroveInital);
};

/**
 * Mixin for mutator functions in the 'sensors_ultrasonic_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Microbit.SENSORS_ULTRASONIC_MUTATOR_MIXIN = {
    /**
     * Create XML to represent whether there is an 'pin' dropdown field.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('pin', !!this.isGrove_);
        return container;
    },
    /**
     * Parse XML to restore the 'temp' dropdown field.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        var isGrove = (xmlElement.getAttribute('pin') != 'false');
        this.updateField_(isGrove);
    },
    /**
     * Create or delete temperature unit field_dropdown.
     * @param {boolean} isGrove True if the dropdown should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function (isGrove) {
        // Destroy 'TRIG' and 'ECHO' field.
        if (this.getInput("HC_PINS")) {
            this.removeInput("HC_PINS");
        }
        // Destroy 'PIN' field.
        if (this.getInput("GROVE_PIN")) {
            this.removeInput("GROVE_PIN");
        }
        if (isGrove) {
            this.setInputsInline(true);
            // Create either a value 'PIN' dropdown field.
            this.appendDummyInput("GROVE_PIN")
                .appendField(Blockly.Msg["SENSORS_ULTRASONIC_1PIN"])
                .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.MICROBIT_PINS), "PIN");
        } else {
            this.setInputsInline(false);
            // Create either value 'TRIG' & 'ECHO' dropdown fields.
            this.appendDummyInput("HC_PINS")
                .appendField(Blockly.Msg["SENSORS_ULTRASONIC_2PINS"])
                .appendField("TRIG")
                .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.MICROBIT_PINS), "TRIG")
                .appendField("ECHO")
                .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.MICROBIT_PINS), "ECHO");
        }
        this.isGrove_ = isGrove;
    }
};

Blockly.Extensions.registerMutator('sensors_ultrasonic_mutator',
    Blockly.Constants.Microbit.SENSORS_ULTRASONIC_MUTATOR_MIXIN,
    Blockly.Constants.Microbit.SENSORS_ULTRASONIC_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('actuators_play_notes_mutator',
    Blockly.Constants.Microbit.ACTUATORS_PLAY_NOTES_MUTATOR_MIXIN);

// Initialization extensions
Blockly.Extensions.register("show_leds_screen_init",
    Blockly.Constants.Microbit.DISPLAY_SHOW_LEDS_INIT_EXTENSION);