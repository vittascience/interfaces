/**
 * @fileoverview Sensors blocks for CyberPi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin board sensors blocks*/

    // BLOCK READ HALL SENSOR
    {
        "type": "sensors_esp32_hall_sensor",
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
        "type": "sensors_esp32_raw_temperature",
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

    // CYBERPI - GET BRIGHTNESS
    {
        "type": "sensors_cyberpi_get_bri",
        "message0": "%{BKY_SENSORS_CYBERPI_GET_BRIGHTNESS_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_CYBERPI_GET_BRIGHTNESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    // CYBERPI - GET LOUDNESS
    {
        "type": "sensors_cyberpi_get_loudness",
        "message0": "%{BKY_SENSORS_CYBERPI_GET_LOUDNESS_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_CYBERPI_GET_LOUDNESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)