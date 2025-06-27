/**
 * @fileoverview Actuators blocks for Galaxia.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_SERVO_SETANGLE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // CONTINUOUS SERVOMOTEUR _ SET SPEED JSON
    {
        "type": "actuators_continuousServo_setSpeed",
        "message0": "%{BKY_ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_CONTINUOUS_SERVO_SETSPEED_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MOTOR_SETPOWER_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_GROVERELAY_CONTROL_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // GROVE VIBRATION MOTOR _ WRITE DIGITAL
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
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_GROVEVIBRATIONMOTOR_CONTROL_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    /* Begin micropython Music blocks */

    // GROVE BUZZER OR SPEAKER _ PLAY MUSIC
    {
        "type": "actuators_playMusicGroveBuzzer",
        "message0": "%{BKY_ACTUATORS_MUSIC_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Pirates des Caraïbes", "CARRIBEAN_PIRATES"],
                ["Gamme", "GAMME"],
                ["Star Wars", "SW"],
                ["R2D2", "R2D2"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_color"
        ],
        "tooltip": "%{BKY_ACTUATORS_MUSIC_PLAYMUSIC_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    }

]); // END JSON EXTRACT (Do not delete this comment.)
