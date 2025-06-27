/**
 * @fileoverview Actuators blocks for Arduino.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // SERVOMOTEUR _ SET POSITION JSON
    {
        "type": "actuators_setServoAngle",
        "message0": "%{BKY_ACTUATORS_SERVO_SETANGLE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ANGLE",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_SERVO_SETANGLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // CONTINUOUS SERVOMOTEUR _ SET SPEED JSON
    {
        "type": "actuators_continuousServo_setSpeed",
        "message0": "%{BKY_ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPEED",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↺", "1"],
                ["↻", "-1"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // SERVOMOTEUR _ STOP JSON
    {
        "type": "actuators_servo_detach",
        "message0": "%{BKY_ACTUATORS_SERVO_DETACH_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_SERVO_DETACH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // I2C MOTOR DRIVER _ SET SPEED JSON
    {
        "type": "actuators_DCMotor_setSpeed",
        "message0": "%{BKY_ACTUATORS_DCMOTOR_SETSPEED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "MOTOR1"],
                ["2", "MOTOR2"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↺", "1"],
                ["↻", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_DCMOTOR_SETSPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // I2C MOTOR DRIVER _ STOP MOTOR JSON
    {
        "type": "actuators_DCMotor_stop",
        "message0": "%{BKY_ACTUATORS_DCMOTOR_STOP_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "MOTOR1"],
                ["2", "MOTOR2"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_DCMOTOR_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // I2C MOTOR DRIVER _ SET STEPPER MOTOR JSON
    {
        "type": "actuators_stepperMotor_run",
        "message0": "%{BKY_ACTUATORS_STEPPERMOTOR_RUN_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STEP",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↺", "1"],
                ["↻", "-1"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_STEPPERMOTOR_RUN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // MINI I2C MOTOR DRIVER _ SET SPEED JSON
    {
        "type": "actuators_MiniDriver_DCMotor_drive",
        "message0": "%{BKY_ACTUATORS_MINI_I2C_MOTOR_DRIVER_DRIVE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "MOTOR1"],
                ["2", "MOTOR2"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↺", "1"],
                ["↻", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_MINI_I2C_MOTOR_DRIVER_DRIVE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // MINI I2C MOTOR DRIVER _ STOP MOTOR JSON
    {
        "type": "actuators_MiniDriver_DCMotor_stop",
        "message0": "%{BKY_ACTUATORS_MINI_I2C_MOTOR_DRIVER_STOP_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "MOTOR1"],
                ["2", "MOTOR2"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_MINI_I2C_MOTOR_DRIVER_STOP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // MC33926 MOTOR SHIELD _ SET SPEED JSON
    {
        "type": "actuators_MC33926MotorShield_setSpeed",
        "message0": "%{BKY_ACTUATORS_MC33926_MOTOR_SHIELD_SETSPEED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "MOTOR1"],
                ["2", "MOTOR2"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↺", "1"],
                ["↻", "-1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_MC33926_MOTOR_SHIELD_SETSPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // MC33926 MOTOR SHIELD _ GET CURRENT JSON
    {
        "type": "actuators_MC33926MotorShield_getCurrent",
        "message0": "%{BKY_ACTUATORS_MC33926_MOTOR_SHIELD_GETCURRENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["1", "MOTOR1"],
                ["2", "MOTOR2"]
            ]
        }],
        "output": "Decimal",
        "tooltip": "%{BKY_ACTUATORS_MC33926_MOTOR_SHIELD_GETCURRENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE VIBRATION MOTOR _ WRITE DIGITAL JSON
    {
        "type": "actuators_setVibrationMotorState",
        "message0": "%{BKY_ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TITLE}",
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
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE RELAY _ WRITE DIGITAL JSON
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVERELAY_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    //Grove MOSFET - ANALOG WRITE STATE
    {
        "type": "actuators_mosfet_setState",
        "message0": "%{BKY_ACTUATORS_MOSFET_SETSTATE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_MOSFET_SETSTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    //Grove MOSFET - ANALOG WRITE VALUE
    {
        "type": "actuators_mosfet_setPercentValue",
        "message0": "%{BKY_ACTUATORS_MOSFET_SETPERCENTVALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_MOSFET_SETPERCENTVALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE BUZZER OR SPEAKER _ WRITE DIGITAL JSON
    {
        "type": "actuators_controlGroveBuzzerState",
        "message0": "%{BKY_ACTUATORS_GROVEBUZZER_CONTROLSTATE_TITLE}",
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
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVEBUZZER_CONTROLSTATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE BUZZER OR SPEAKER _ PLAY NOTE JSON
    {
        "type": "actuators_playNoteGroveBuzzer",
        "message0": "%{BKY_ACTUATORS_GROVEBUZZER_PLAYNOTE_TITLE}",
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVEBUZZER_PLAYNOTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE BUZZER OR SPEAKER _ PLAY NOTE DURATION JSON
    {
        "type": "actuators_playNoteDurationGroveBuzzer",
        "message0": "%{BKY_ACTUATORS_GROVEBUZZER_PLAYNOTEDURATION_TITLE}",
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
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVEBUZZER_PLAYNOTEDURATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE BUZZER OR SPEAKER _ PLAY FREQUENCY JSON
    {
        "type": "actuators_tone",
        "message0": "%{BKY_ACTUATORS_TONE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_TONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE BUZZER OR SPEAKER _ PLAY FREQUENCY JSON
    {
        "type": "actuators_toneDuration",
        "message0": "%{BKY_ACTUATORS_TONE_DURATION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_TONE_DURATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE BUZZER OR SPEAKER _ STOP MUSIC JSON
    {
        "type": "actuators_noTone",
        "message0": "%{BKY_ACTUATORS_NOTONE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_NOTONE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE BUZZER OR SPEAKER _ PLAY MUSIC JSON
    {
        "type": "actuators_playMusicGroveBuzzer",
        "message0": "%{BKY_ACTUATORS_GROVEBUZZER_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Gamme", "0"],
                ["Star Wars", "1"],
                ["R2D2", "2"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVEBUZZER_PLAYMUSIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE WATER ATOMIZER _ WRITE DIGITAL JSON
    {
        "type": "actuators_setWaterAtomizerState",
        "message0": "%{BKY_ACTUATORS_GROVEWATERATOMIZATION_CONTROL_TITLE}",
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
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVEWATERATOMIZATION_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // GROVE ELECTROMAGNET _ WRITE DIGITAL JSON
    {
        "type": "actuators_setElectromagnetState",
        "message0": "%{BKY_ACTUATORS_GROVEELECTROMAGNET_CONTROL_TITLE}",
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
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_GROVEELECTROMAGNET_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)