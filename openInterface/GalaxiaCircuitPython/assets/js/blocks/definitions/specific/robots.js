/**
 * @fileoverview Robots blocks for Galaxia.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin Maqueen blocks */

    // BLOCK MAQUEEN ULTRASONIC RANGER
    {
        "type": "robots_getMaqueenUltrasonicRanger",
        "message0": "%{BKY_ROBOTS_MAQUEEN_ULTRASONICRANGER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DISTANCE}", "distance"],
                ["%{BKY_ROBOTS_MAQUEEN_ULTRASONIC_DURATION}", "duration"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_ULTRASONICRANGER_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN READ LINE FINDER
    {
        "type": "robots_readMaqueenPatrol",
        "message0": "%{BKY_ROBOTS_MAQUEEN_READPATROL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "pin14"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "pin13"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_READPATROL_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN CONTROL LED
    {
        "type": "robots_controlMaqueenLed",
        "message0": "%{BKY_ROBOTS_MAQUEEN_CONTROLLED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "1"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "0"]
            ]
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_CONTROLLED_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN CONTROL GO
    {
        "type": "robots_setMaqueenGo",
        "message0": "%{BKY_ROBOTS_MAQUEEN_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_GO_FORWARD}", "0x0"],
                ["%{BKY_ROBOTS_MAQUEEN_GO_REVERSE}", "0x1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_GO_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN CONTROL MOTOR
    {
        "type": "robots_controlMaqueenMotor",
        "message0": "%{BKY_ROBOTS_MAQUEEN_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "0x02"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "0x00"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "0x0"],
                ["↺", "0x1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_CONTROLMOTOR_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN STOP MOTORS
    {
        "type": "robots_stopMaqueenMotors",
        "message0": "%{BKY_ROBOTS_MAQUEEN_STOPMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "0x02"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "0x00"],
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT&LEFT}", "both"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_STOPMOTORS_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN SET SERVO ANGLE
    {
        "type": "robots_setMaqueenServoAngle",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETSERVOANGLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SERVO",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_S1}", "0x14"],
                ["%{BKY_ROBOTS_MAQUEEN_S2}", "0x15"],
                ["%{BKY_ROBOTS_MAQUEEN_SERVO_BOTH}", "both"]
            ]
        }, {
            "type": "input_value",
            "name": "ANGLE",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETSERVOANGLE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN SET NEOPIXEL
    {
        "type": "robots_setMaqueenNeopixel",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETNEOPIXEL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["les 4 LED", "all"]
            ]
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
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETNEOPIXEL_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN SET NEOPIXEL PALETTE
    {
        "type": "robots_setMaqueenNeopixelPalette",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["les 4 LED", "all"]
            ]
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETPALETTECOLOR_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN RAINBOW
    {
        "type": "robots_setMaqueenRainbow",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETRAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETRAINBOW_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN SET BUZZER
    {
        "type": "robots_setMaqueenBuzzer",
        "message0": "%{BKY_ROBOTS_MAQUEEN_SETBUZZER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_SETBUZZER_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN PLAY MUSIC
    {
        "type": "robots_playMaqueenMusic",
        "message0": "%{BKY_ROBOTS_MAQUEEN_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Gamme", "GAMME"],
                ["Star Wars", "SW"],
                ["R2D2", "R2D2"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_PLAYMUSIC_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN ON REMOTE CONTROL COMMAND RECEIVED
    {
        "type": "robots_maqueen_onRemoteCommandReceived",
        "message0": "%{BKY_ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
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
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
        "extensions": [
            "block_buttons_plus_minus",
            "robots_maqueen_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_maqueen_onRemoteCommandReceived_mutator",
    },

    // BLOCK MAQUEEN ON REMOTE CONTROL COMMAND RECEIVED - C AR MP3 GRAY REMOTE
    {
        "type": "robots_maqueen_onRemoteCommandReceived_car_mp3_gray",
        "message0": "%{BKY_ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_TITLE}",
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
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
        "extensions": [
            "block_buttons_plus_minus",
            "robots_maqueen_onRemoteCommandReceived_init"
        ],
        "mutator": "robots_maqueen_onRemoteCommandReceived_mutator",
      },

    // BLOCK MAQUEEN DECODE IR RECEIVER
    {
        "type": "robots_decodeMaqueenIRreceiver",
        "message0": "%{BKY_ROBOTS_MAQUEEN_DECODEIRRECEIVER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_DECODEIRRECEIVER_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MAQUEEN GET IR CODE
    {
        "type": "robots_getMaqueenIRcode",
        "message0": "%{BKY_ROBOTS_MAQUEEN_GETIRCODE_TITLE}",
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_MAQUEEN_GETIRCODE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    /* Begin CODO blocks */

    // BLOCK CODO CONTROL GO
    {
        "type": "robots_setCodoGo",
        "message0": "%{BKY_ROBOTS_CODO_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CODO_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_CODO_GO_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CODO_GO_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK CODO TURN ROBOT
    {
        "type": "robots_setCodoTurn",
        "message0": "%{BKY_ROBOTS_CODO_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_CODO_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CODO_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CODO_TURN_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK CODO STOP ROBOT
    {
        "type": "robots_setCodoStop",
        "message0": "%{BKY_ROBOTS_CODO_STOP_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CODO_STOP_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK CODO CONTROL MOTOR
    {
        "type": "robots_controlCodoMotors",
        "message0": "%{BKY_ROBOTS_CODO_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_CODO_MOTOR_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_CODO_MOTOR_LEFT}", "LEFT"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "CLOCKWISE"],
                ["↺", "ANTICLOCKWISE"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_CODO_CONTROLMOTOR_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    /* Begin BUGGY blocks */

    // BLOCK BUGGY CONTROL GO
    {
        "type": "robots_setBuggyGo",
        "message0": "%{BKY_ROBOTS_BUGGY_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_BUGGY_GO_FORWARD}", "FORWARD"],
                ["%{BKY_ROBOTS_BUGGY_GO_BACKWARD}", "BACKWARD"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BUGGY_GO_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BUGGY TURN ROBOT
    {
        "type": "robots_setBuggyTurn",
        "message0": "%{BKY_ROBOTS_BUGGY_TURN_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_BUGGY_TURN_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_BUGGY_TURN_LEFT}", "LEFT"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BUGGY_TURN_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BUGGY STOP ROBOT
    {
        "type": "robots_setBuggyStop",
        "message0": "%{BKY_ROBOTS_BUGGY_STOP_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BUGGY_STOP_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BUGGY CONTROL MOTOR
    {
        "type": "robots_controlBuggyMotors",
        "message0": "%{BKY_ROBOTS_BUGGY_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_BUGGY_MOTOR_RIGHT}", "RIGHT"],
                ["%{BKY_ROBOTS_BUGGY_MOTOR_LEFT}", "LEFT"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "CLOCKWISE"],
                ["↺", "ANTICLOCKWISE"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BUGGY_CONTROLMOTOR_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    /* Begin Bit:Bot blocks definitions */

    // BLOCK BITBOT READ LIGHT SENSOR
    {
        "type": "robots_readBitBotLightSensor",
        "message0": "%{BKY_ROBOTS_BITBOT_READLIGHTSENSOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "RL",
            "options": [
                ["%{BKY_ROBOTS_MAQUEEN_RIGHT}", "1"],
                ["%{BKY_ROBOTS_MAQUEEN_LEFT}", "0"]
            ]
        }],
        "output": "Number",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_READLIGHTSENSOR_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BITBOT CONTROL MOTOR GO
    {
        "type": "robots_setBitbotGo",
        "message0": "%{BKY_ROBOTS_BITBOT_GO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_ROBOTS_BITBOT_GO_FORWARD}", "0"],
                ["%{BKY_ROBOTS_BITBOT_GO_REVERSE}", "1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_GO_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BITBOT CONTROL MOTOR
    {
        "type": "robots_controlBitBotMotor",
        "message0": "%{BKY_ROBOTS_BITBOT_CONTROLMOTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_BITBOT_RIGHT}", "pin1/pin12"],
                ["%{BKY_ROBOTS_BITBOT_LEFT}", "pin0/pin8"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["↻", "0"],
                ["↺", "1"]
            ]
        }, {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_CONTROLMOTOR_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BITBOT STOP MOTORS
    {
        "type": "robots_stopBitBotMotors",
        "message0": "%{BKY_ROBOTS_BITBOT_STOPMOTORS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOTOR",
            "options": [
                ["%{BKY_ROBOTS_BITBOT_RIGHT}", "pin1/pin12"],
                ["%{BKY_ROBOTS_BITBOT_LEFT}", "pin0/pin8"],
                ["%{BKY_ROBOTS_BITBOT_RIGHT&LEFT}", "all"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_STOPMOTORS_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BITBOT SET NEOPIXEL PALETTE
    {
        "type": "robots_setBitBotNeopixelPalette",
        "message0": "%{BKY_ROBOTS_BITBOT_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_SETPALETTECOLOR_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BITBOT SET NEOPIXEL
    {
        "type": "robots_setBitBotNeopixel",
        "message0": "%{BKY_ROBOTS_BITBOT_SETNEOPIXEL_TITLE}",
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
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_SETNEOPIXEL_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BITBOT RAINBOW
    {
        "type": "robots_setBitBotRainbow",
        "message0": "%{BKY_ROBOTS_BITBOT_SETRAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_SETRAINBOW_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK BITBOT READ LINE FINDER
    {
        "type": "robots_readBitBotPatrol",
        "message0": "%{BKY_ROBOTS_BITBOT_READPATROL_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["%{BKY_ROBOTS_BITBOT_RIGHT}", "pin5"],
                ["%{BKY_ROBOTS_BITBOT_LEFT}", "pin11"]
            ]
        }],
        "output": "Boolean",
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_BITBOT_READPATROL_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    /* Begin Gamepad blocks definitions */

    // BLOCK GAMEPAD CONTROL LED
    {
        "type": "robots_setGamepadLED",
        "message0": "%{BKY_ROBOTS_GAMEPAD_CONTROLLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_CONTROLLED_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK GAMEPAD CONTROL LED
    {
        "type": "robots_setGamepadMotorVibration",
        "message0": "%{BKY_ROBOTS_GAMEPAD_SETMOTORVIBRATION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_SETMOTORVIBRATION_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK GAMEPAD SET BUZZER
    {
        "type": "robots_setGamepadBuzzerFreq",
        "message0": "%{BKY_ROBOTS_GAMEPAD_SETBUZZERFREQ_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_SETBUZZERFREQ_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK GAMEPAD PLAY MUSIC
    {
        "type": "robots_playGamepadMusic",
        "message0": "%{BKY_ROBOTS_GAMEPAD_PLAYMUSIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MUSIC",
            "options": [
                ["Gamme", "GAMME"],
                ["Star Wars", "SW"],
                ["R2D2", "R2D2"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_PLAYMUSIC_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    //BLOCK GAMEPAD ON BUTTON EVENT
    {
        "type": "robots_onGamepadButtonEvent",
        "message0": "%{BKY_ROBOTS_GAMEPAD_ONBUTTONEVENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [
                ["X", "pin1"],
                ["Y", "pin2"],
                ["UP", "pin8"],
                ["DOWN", "pin13"],
                ["LEFT", "pin14"],
                ["RIGHT", "pin15"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_ROBOTS_GAMEPAD_PRESSED}", "PRESSED"],
                ["%{BKY_ROBOTS_GAMEPAD_RELEASED}", "RELEASED"],
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "robots_blocks",
        "tooltip": "%{BKY_ROBOTS_GAMEPAD_ONBUTTONEVENT_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Robots = Object.create(null);

/**
 * Remote control typed Basic black.
 * @this {Array<Array<string>>}
 */
Blockly.Constants.Robots.NEC_BASIC_BLACK_REMOTE_BUTTONS = [
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
Blockly.Constants.Robots.NEC_CAR_MP3_REMOTE_BUTTONS = [
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
 * Performs final setup of 'robots_maqueen_onRemoteCommandReceived' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Robots.ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_INIT_EXTENSION = function() {
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    this.dropdownFieldsValue = new Array();
    if (this.type == "robots_maqueen_onRemoteCommandReceived_car_mp3_gray") {
      this.remoteButtonDropdown = Blockly.Constants.Robots.NEC_CAR_MP3_REMOTE_BUTTONS;
      this.thenHeadTitle = 'ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_CAR_MP3_GRAY_DETECTED_THEN';
    } else {
      this.remoteButtonDropdown = Blockly.Constants.Robots.NEC_BASIC_BLACK_REMOTE_BUTTONS;
      this.thenHeadTitle = 'ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_DETECTED_THEN';
    }
    this.getInput('IF0')
        .appendField(new Blockly.FieldDropdown(this.remoteButtonDropdown), 'COMMAND0')
        .appendField(Blockly.Msg[this.thenHeadTitle]);
    this.update_(this.updateShape_);
};

/**
 * Mixin for mutator functions in the 'robots_maqueen_onRemoteCommandReceived_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Robots.ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_MUTATOR_MIXIN = {
  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
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
  domToMutation: function(xmlElement) {
    if (!xmlElement) return;
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.rebuildShape_();
  },
  // Store pointers to any connected child blocks.
  storeConnections_: function(arg) {
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
  restoreConnections_: function() {
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(this.statementConnections_[i], this, 'DO' + i);
    }
    if (this.getInput('ELSE')) {
      Blockly.Mutator.reconnect(this.elseStatementConnection_, this, 'ELSE');
    }
  },
  addElse_: function() {
    this.storeConnections_();
    var update = function() {
      this.elseCount_++;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  removeElse_: function() {
    this.storeConnections_();
    var update = function() {
      this.elseCount_--;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  addElseIf_: function() {
    this.storeConnections_();
    var update = function() {
      this.elseifCount_++;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  removeElseIf_: function(arg) {
    this.storeConnections_(arg);
    var update = function() {
      this.elseifCount_--;
    };
    this.update_(update);
    this.restoreConnections_();
  },
  update_: function(update) {
    return Blockly.Constants.Utils.UPDATE_BLOCK_MUTATOR_MIXIN(this, update);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
  updateShape_: function() {
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
      var removeElseIf = function(arg) {
        return function() {
          that.removeElseIf_(arg);
        };
      }(i);
      this.appendDummyInput('ELSEIF' + i)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF)
        .appendField(new Blockly.FieldDropdown(this.remoteButtonDropdown), 'COMMAND' + i)
        .appendField(Blockly.Msg.ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_RECEIVED_THEN);
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
    var addElseIf = function() {
      return function() {
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
  rebuildShape_: function() {
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
  reconnectChildBlocks_: function(statementConnections,
    elseStatementConnection) {
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
  },
  saveDropdownFields_: function() {
    this.dropdownFieldsValue = new Array();
    for (var i = 1; i <= this.elseifCount_-1; i++) {
      this.dropdownFieldsValue.push(this.getFieldValue('COMMAND' + i))
    }
  },
  restoreDropdownFields_: function() {
    for (var i = 1; i <= this.elseifCount_-1; i++) {
      if (this.dropdownFieldsValue[i-1] !== null) {
        this.getField('COMMAND' + i).setValue(this.dropdownFieldsValue[i-1]);
      }
    }
  }
};

// Initialization extensions
Blockly.Extensions.register('robots_maqueen_onRemoteCommandReceived_init',
  Blockly.Constants.Robots.ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator("robots_maqueen_onRemoteCommandReceived_mutator",
  Blockly.Constants.Robots.ROBOTS_MAQUEEN_REMOTECONTROL_ONCOMMANDRECEIVED_MUTATOR_MIXIN);
