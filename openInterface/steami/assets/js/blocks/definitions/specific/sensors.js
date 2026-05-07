
/**
 * @fileoverview STeaMi sensors blocks
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK STEAMI - APDS9960 - READ AMBIENT LIGHT/PROXIMITY/GESTURE
    {
        "type": "sensors_steami_apds9960_readData",
        "message0": "%{BKY_SENSORS_STEAMI_APDS9960_READ_DATA_TITLE}",
         "args0": [
            {
                "type": "field_dropdown",
                "name": "DATA_TYPE",
                "options": [
                    ["%{BKY_SENSORS_STEAMI_APDS9960_AMBIENTLIGHT}", "ambientLight"],
                    ["%{BKY_SENSORS_STEAMI_APDS9960_PROXIMITY}", "proximity"],
                    ["%{BKY_SENSORS_STEAMI_APDS9960_GESTURE}", "gesture"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_STEAMI_APDS9960_READ_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK STEAMI - HTS221 - READ DATA
    {
        "type": "sensors_steami_hts221_readData",
        "message0": "%{BKY_SENSORS_STEAMI_HTS221_READDATA_TITLE}",
        "output": "Number",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DATA_TYPE",
                "options": [
                    ["%{BKY_SENSORS_STEAMI_HTS221_TEMPERATURE}", "temperature"],
                    ["%{BKY_SENSORS_STEAMI_HTS221_HUMIDITY}", "humidity"]
                ]
            }
        ],
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_STEAMI_HTS221_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK STEAMI - VL53L1X - READ
    {
        "type": "sensors_steami_vl53l1x_read",
        "message0": "%{BKY_SENSORS_STEAMI_VL53L1X_READ_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "UNIT",
                "options": [
                    ["mm", "Millimeter"],
                    ["cm", "Centimeter"],
                    ["m", "Meter"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_STEAMI_VL53L1X_READ_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }


]); // END JSON EXTRACT (Do not delete this comment.)