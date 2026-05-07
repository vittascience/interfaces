/**
 * @fileoverview Sensors blocks for Thingz-Galaxia.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    //Galaxia Specific Blocks
    // BLOCK GET ACCELERATION
    {
        "type": "sensors_getAcceleration",
        "message0": "%{BKY_SENSORS_GETACCELERATION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["strength", "strength"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETACCELERATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK ON MOUVEMENT
    {
        "type": "io_onMovement",
        "message0": "%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "MOV",
            "options": [
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_SHAKE}", "shake"],
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_UP}", "up"], //logo up
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_DOWN}", "down"], //logo down
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_FACE_UP}", "face up"], //screen up
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_FACE_DOWN}", "face down"], //screen down
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_LEFT}", "left"], //tilt left
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_RIGHT}", "right"], //tilt right
                ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_FREEFALL}", "freefall"],
                ["3g", "3g"],
                ["6g", "6g"],
                ["8g", "8g"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET LIGHT
    {
        "type": "sensors_getLight",
        "message0": "%{BKY_SENSORS_GETLIGHT_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETLIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CALIBRATE COMPASS
    {
        "type": "sensors_calibrateCompass",
        "message0": "%{BKY_SENSORS_CALIBRATECOMPASS_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_CALIBRATECOMPASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET COMPASS
    {
        "type": "sensors_getCompass",
        "message0": "%{BKY_SENSORS_GETCOMPASS_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETCOMPASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET TEMPERATURE
    {
        "type": "sensors_getTemperature",
        "message0": "%{BKY_SENSORS_GETTEMPERATURE_TITLE}",
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
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETTEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET ROTATION
    {
        "type": "sensors_getRotation",
        "message0": "%{BKY_SENSORS_GETROTATION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_SENSORS_GETROTATION_PITCH}", "pitch"],
                ["%{BKY_SENSORS_GETROTATION_ROLL}", "roll"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETROTATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET MAGNETIC FORCE
    {
        "type": "sensors_getMagneticForce",
        "message0": "%{BKY_SENSORS_GETMAGNETICFORCE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["strength", "NORM"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETMAGNETICFORCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET MAGNETIC FORCE
    {
        "type": "sensors_linky",
        "message0": "%{BKY_SENSORS_LINKY_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ADDR",
            "options": [
                ["%{BKY_SENSORS_LINKY_PAPP}", "PAPP"],
                ["%{BKY_SENSORS_LINKY_HCHC}", "HCHC"],
                ["%{BKY_SENSORS_LINKY_HCHP}", "HCHP"],
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()],
        }],
        "output": "String",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_LINKY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // BLOCK GROVE DHT 11 SENSOR _ READ DATA
    {
        "type": "sensors_DHT11ReadData",
        "message0": "%{BKY_SENSORS_DHT11_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
                ["%{BKY_SENSORS_HUMIDITY}", "HUM"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_DHT11_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // BLOCK GROVE DHT 22 SENSOR _ READ DATA
    {
        "type": "sensors_DHT22ReadData",
        "message0": "%{BKY_SENSORS_DHT22_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
                ["%{BKY_SENSORS_HUMIDITY}", "HUM"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_DHT22_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // BLOCK DS18B20 - GET TEMPERATURE SENSOR
    {
        "type": "sensors_DS18B20_getTemperature",
        "message0": "%{BKY_SENSORS_DS18B20_GETTEMPERATURE_TITLE}",
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_DS18B20_GETTEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)
