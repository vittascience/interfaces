/**
 * @fileoverview Actuators blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // STEPPER MOTOR 28BYJ-48 WITH ULN2003 DRIVER INIT
    {
        "type": "actuators_stepperMotor_uln2003driver_init",
        "message0": "%{BKY_ACTUATORS_STEPPERMOTOR_ULN2003_INIT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "IN1",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "IN2",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "IN3",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "IN4",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_ACTUATORS_STEPPERMOTOR_ULN2003_INIT_TOOLTIP}"
    },
    {
        "type": "actuators_stepperMotor_uln2003driver_moveSteps",
        "message0": "%{BKY_ACTUATORS_STEPPERMOTOR_ULN2003_MOVE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        }, {
            "type": "input_value",
            "name": "STEPS",
            "check": "Number"
        },
        {
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_ACTUATORS_STEPPERMOTOR_ULN2003_MOVE_STEPS}", "STEPS"],
                ["%{BKY_ACTUATORS_STEPPERMOTOR_ULN2003_MOVE_ROTATIONS}", "ROTATIONS"]
            ]
        },
        {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "1"],
                ["↺", "-1"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_STEPPERMOTOR_ULN2003_MOVE_TOOLTIP}",
    },
    {
        "type": "actuators_stepperMotor_uln2003driver_setDelay",
        "message0": "%{BKY_ACTUATORS_STEPPERMOTOR_ULN2003_SET_DELAY_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["A", "A"],
                ["B", "B"]
            ]
        }, {
            "type": "input_value",
            "name": "DELAY",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_STEPPERMOTOR_ULN2003_SET_DELAY_TOOLTIP}",
    },

    /* Kitronik */

    // ACCESS:BIT CONTROL BARRIER
    {
        "type": "actuators_controlAccessBitBarrier",
        "message0": "%{BKY_ACTUATORS_ACCESSBIT_CONTROLBARRIER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ACTION",
            "options": [
                ["%{BKY_ACTUATORS_ACCESSBIT_CONTROLBARRIER_RAISE}", "RAISE"],
                ["%{BKY_ACTUATORS_ACCESSBIT_CONTROLBARRIER_LOWER}", "LOWER"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_ACCESSBIT_CONTROLBARRIER_TOOLTIP}",
    },

    // ACCESS:BIT CONTROL BUZZER
    {
        "type": "actuators_controlAccessBitBuzzer",
        "message0": "%{BKY_ACTUATORS_ACCESSBIT_CONTROLBUZZER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_ACCESSBIT_CONTROLBUZZER_TOOLTIP}",
    },

    // BLOCK KITRONIK CONTROL MOTOR
    {
        "type": "actuators_kitronik_controlMotor",
        "message0": "%{BKY_ACTUATORS_KITRONIK_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["%{BKY_ACTUATORS_KITRONIK_MOTOR_BOTH}", "BOTH"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "1"],
                ["↺", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_CONTROLMOTOR_TOOLTIP}",
    },

    // BLOCK KITRONIK STOP MOTOR
    {
        "type": "actuators_kitronik_stopMotor",
        "message0": "%{BKY_ACTUATORS_KITRONIK_STOPMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["%{BKY_ACTUATORS_KITRONIK_MOTOR_BOTH}", "BOTH"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_STOPMOTOR_TOOLTIP}",
    },

    // KITRONIK 16-SERVOS _ SET POSITION
    {
        "type": "actuators_kitronikShield_setServoAngle",
        "message0": "%{BKY_ACTUATORS_KITRONIK_SERVO_SETANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SERVO",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_SERVO_SETANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ]
    },

    // KITRONIK ENVIRONMENTAL _ PLAY FREQUENCY
    {
        "type": "actuators_kitronik_playFrequency",
        "message0": "%{BKY_ACTUATORS_KITRONIK_PLAY_FREQUENCY_TITLE}",
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
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_KITRONIK_PLAY_FREQUENCY_TOOLTIP}",
    },

    /** Begin microbit audio blocks */

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
            "block_init_helpurl",
            "block_init_color"
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
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    /* Begin Music blocks */

    // MUSIC LIBRARY _ PLAY SONG
    {
        "type": "actuators_music_playSong",
        "message0": "%{BKY_ACTUATORS_MUSIC_PLAYSONG_TITLE}",
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
        }, {
            "type": "field_grid_dropdown",
            "name": "LOOP",
            "options": [
                ["%{BKY_ACTUATORS_MUSIC_PLAYSONG_ONCE}", "ONCE"],
                ["%{BKY_ACTUATORS_MUSIC_PLAYSONG_LOOP}", "LOOP"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_PLAYSONG_TOOLTIP}",
    },

    // MICROBIT _ SET VOLUME
    {
        "type": "actuators_music_setVolume",
        "message0": "%{BKY_ACTUATORS_MUSIC_SETVOLUME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOL",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_SETVOLUME_TOOLTIP}",
    },

    // MUSIC LIBRARY _ SET TEMPO
    {
        "type": "actuators_music_setTempo",
        "message0": "%{BKY_ACTUATORS_MUSIC_SETTEMPO_TITLE}",
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
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_SETTEMPO_TOOLTIP}",
    },

    // MUSIC LIBRARY _ GET TEMPO
    {
        "type": "actuators_music_getTempo",
        "message0": "%{BKY_ACTUATORS_MUSIC_GETTEMPO_TITLE}",
        "output": "Array",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_GETTEMPO_TOOLTIP}",
    },

    // SPEECH LIBRARY _ SAY SOMETHING
    {
        "type": "actuators_speech_saySomething",
        "message0": "%{BKY_ACTUATORS_SPEECH_SAYSOMETHING_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "PITCH",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_SPEECH_SAYSOMETHING_TOOLTIP}",
    }

]); // END JSON EXTRACT (Do not delete this comment.)
