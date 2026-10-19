
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
    },

    // BLOCK STEAMI - BQ27441 - READ DATA
    {
        "type": "sensors_steami_bq27441_readData",
        "message0": "%{BKY_SENSORS_STEAMI_BQ27441_READDATA_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DATA_TYPE",
                "options": [
                    ["%{BKY_SENSORS_STEAMI_BQ27441_SOC}", "state_of_charge"],
                    ["%{BKY_SENSORS_STEAMI_BQ27441_VOLTAGE}", "voltage_mv"],
                    ["%{BKY_SENSORS_STEAMI_BQ27441_CURRENT}", "current_average"],
                    ["%{BKY_SENSORS_STEAMI_BQ27441_FULL_CAPACITY}", "capacity_full"],
                    ["%{BKY_SENSORS_STEAMI_BQ27441_REMAINING_CAPACITY}", "capacity_remaining"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_STEAMI_BQ27441_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // STEAMI - WSEN_HIDS - READ DATA
    {
        "type": "sensors_steami_wsen_hids_readData",
        "message0": "%{BKY_SENSORS_STEAMI_WSEN_HIDS_READDATA_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DATA_TYPE",
                "options": [
                    ["%{BKY_SENSORS_STEAMI_WSEN_HIDS_HUMIDITY}", "0"],
                    ["%{BKY_SENSORS_STEAMI_WSEN_HIDS_TEMPERATURE}", "1"],
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_STEAMI_WSEN_HIDS_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // STEAMI - WSEN_PADS - READ DATA
    {
        "type": "sensors_steami_wsen_pads_readData",
        "message0": "%{BKY_SENSORS_STEAMI_WSEN_PADS_READDATA_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DATA_TYPE",
                "options": [
                    ["%{BKY_SENSORS_STEAMI_WSEN_PADS_PRESSURE}", "0"],
                    ["%{BKY_SENSORS_STEAMI_WSEN_PADS_TEMPERATURE}", "1"],
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_STEAMI_WSEN_PADS_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // STEAMI - LIS2MDL - READ DATA
    {
        "type": "sensors_steami_lis2mdl_readData",
        "message0": "%{BKY_SENSORS_STEAMI_LIS2MDL_READDATA_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DATA_TYPE",
                "options": [
                    ["%{BKY_SENSORS_STEAMI_LIS2MDL_MAG_X}", "0"],
                    ["%{BKY_SENSORS_STEAMI_LIS2MDL_MAG_Y}", "1"],
                    ["%{BKY_SENSORS_STEAMI_LIS2MDL_MAG_Z}", "2"],
                    ["%{BKY_SENSORS_STEAMI_LIS2MDL_TEMP}", "3"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_STEAMI_LIS2MDL_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // STEAMI - ISM330DL - READ DATA
    {
        "type": "sensors_steami_ism330dl_readData",
        "message0": "%{BKY_SENSORS_STEAMI_ISM330DL_READDATA_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DATA_TYPE",
                "options": [
                    ["%{BKY_SENSORS_STEAMI_ISM330DL_ACCELERATION_X}", "acceleration_g-0"],
                    ["%{BKY_SENSORS_STEAMI_ISM330DL_ACCELERATION_Y}", "acceleration_g-1"],
                    ["%{BKY_SENSORS_STEAMI_ISM330DL_ACCELERATION_Z}", "acceleration_g-2"],
                    ["%{BKY_SENSORS_STEAMI_ISM330DL_GYROSCOPE_X}", "gyroscope_dps-0"],
                    ["%{BKY_SENSORS_STEAMI_ISM330DL_GYROSCOPE_Y}", "gyroscope_dps-1"],
                    ["%{BKY_SENSORS_STEAMI_ISM330DL_GYROSCOPE_Z}", "gyroscope_dps-2"],
                    ["%{BKY_SENSORS_STEAMI_ISM330DL_TEMPERATURE}", "temp"]
                ]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_STEAMI_ISM330DL_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)