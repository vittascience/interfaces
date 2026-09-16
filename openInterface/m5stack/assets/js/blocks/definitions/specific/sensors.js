/**
 * @fileoverview Sensors blocks for M5stack.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin board sensors blocks*/

    // BLOCK READ HALL SENSOR
    {
        "type": "sensors_readHallSensor",
        "message0": "%{BKY_SENSORS_READ_HALL_SENSOR_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_READ_HALL_SENSOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK READ MICROPROCESSOR TEMP
    {
        "type": "sensors_readProcessorTemperature",
        "message0": "%{BKY_SENSORS_READ_PROCESSOR_TEMP_TITLE}",
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
        "tooltip": "%{BKY_SENSORS_READ_PROCESSOR_TEMP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin climate sensors blocks*/

    // BME280 SENSOR _ GET DATA
    {
        "type": "sensors_getBme280Data",
        "message0": "%{BKY_SENSORS_BME280_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_BME280_TEMP}", "TEMP"],
                ["%{BKY_SENSORS_BME280_HUM}", "HUM"],
                ["%{BKY_SENSORS_BME280_PRESS}", "PRESS"],
                ["%{BKY_SENSORS_BME280_ALT}", "ALT"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_BME280_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // GROVE SCD30 SENSOR _ FORCE RECALIBRATION
    {
        "type": "sensors_SCD30_forcedCalibration",
        "message0": "%{BKY_SENSORS_SCD30_FORCED_CALIBRATION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DEFAULT",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_SCD30_FORCED_CALIBRATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
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
    },

]); // END JSON EXTRACT (Do not delete this comment.)
