/**
 * @fileoverview Sensors blocks for mBot.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // BLOCK MAKEBLOCK ULTRASONIC RANGER
    {
        "type": "robots_makeBlock_getUltrasonicRanger",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["cm", "Cm"],
                ["inch", "Inch"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "inputsInline": true,
        "output": "Decimal",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_ULTRASONICRANGER_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK LINE FINDER
    {
        "type": "robots_makeBlock_getLineState",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_READLINEFINDER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["%{BKY_ROBOTS_MAKEBLOCK_LEFT_1}", "Sensor1"],
                ["%{BKY_ROBOTS_MAKEBLOCK_RIGHT_2}", "Sensor2"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_READLINEFINDER_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK PIR MOTION SENSOR
    {
        "type": "robots_makeBlock_getPIRMotionState",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_READPIRSENSOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "output": "Boolean",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_READPIRSENSOR_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK TEMPERATURE WATERPROOF
    {
        "type": "robots_makeBlock_getWaterproofTemperature",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "SLOT",
            "options": Blockly.Constants.Pins.MBOT_SLOT
        }],
        "output": "Decimal",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_WATERPROOFTEMPERATURE_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK LIGHT SENSOR
    {
        "type": "robots_makeBlock_getLight",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETLIGHT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_ANALOG_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETLIGHT_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK COLOR SENSOR
    {
        "type": "robots_makeBlock_getColor",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETCOLOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_ROBOTS_MAKEBLOCK_COLOR}", "0"],
                ["%{BKY_ROBOTS_MAKEBLOCK_RED}", "1"],
                ["%{BKY_ROBOTS_MAKEBLOCK_GREEN}", "2"],
                ["%{BKY_ROBOTS_MAKEBLOCK_BLUE}", "3"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETCOLOR_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK SOUND SENSOR
    {
        "type": "robots_makeBlock_getSound",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETSOUND_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_ANALOG_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETSOUND_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK GAS SENSOR
    {
        "type": "robots_makeBlock_MQ2_getGas",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETGAS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_ROBOTS_MAKEBLOCK_GAS_DIGITAL}", "Digital"],
                ["%{BKY_ROBOTS_MAKEBLOCK_GAS_ANALOG}", "Analog"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_ANALOG_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETGAS_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK FLAME SENSOR
    {
        "type": "robots_makeBlock_getFlame",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETFLAME_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_ROBOTS_MAKEBLOCK_FLAME_DIGITAL}", "Digital"],
                ["%{BKY_ROBOTS_MAKEBLOCK_FLAME_ANALOG}", "Analog"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETFLAME_TOOLTIP}",
    },

    // BLOCK MAKEBLOCK COMPASS
    {
        "type": "robots_makeBlock_getCompassData",
        "message0": "%{BKY_ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_ROBOTS_MAKEBLOCK_COMPASS_X}", "X"],
                ["%{BKY_ROBOTS_MAKEBLOCK_COMPASS_Y}", "Y"],
                ["%{BKY_ROBOTS_MAKEBLOCK_COMPASS_Z}", "Z"],
                ["%{BKY_ROBOTS_MAKEBLOCK_COMPASS_ANGLE}", "ANGLE"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PORT",
            "options": Blockly.Constants.Pins.MBOT_DIGITAL_PINS
        }],
        "output": "Number",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
        "tooltip": "%{BKY_ROBOTS_MAKEBLOCK_GETCOMPASSDATA_TOOLTIP}",
    }

]); // END JSON EXTRACT (Do not delete this comment.)
