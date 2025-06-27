/**
 * @fileoverview Sensors blocks for Raspberry Pi Pico.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin gas sensors blocks */

    // BLOCK GROVE SGP30 SENSOR _ GET GAS (I2C)
    {
        "type": "sensors_getSgp30Gas",
        "message0": "%{BKY_SENSORS_SGP30_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "GAS",
            "options": [
                ["%{BKY_SENSORS_SGP30_CO2}", "CO2"],
                ["%{BKY_SENSORS_SGP30_TVOC}", "TVOC"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_SGP30_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE MULTICHANNEL GAS SENSOR _ GET GAS (I2C)
    {
        "type": "sensors_getMultichannelGas",
        "message0": "%{BKY_SENSORS_MULTICHANNEL_GETGAS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "GAS",
            "options": [
                ["%{BKY_GAS_CO}", "CO"],
                ["%{BKY_GAS_NO2}", "NO2"],
                ["%{BKY_GAS_NH3}", "NH3"],
                ["%{BKY_GAS_C3H8}", "C3H8"],
                ["%{BKY_GAS_C4H10}", "C4H10"],
                ["%{BKY_GAS_CH4}", "CH4"],
                ["%{BKY_GAS_H2}", "H2"],
                ["%{BKY_GAS_C2H5OH}", "C2H5OH"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_MULTICHANNEL_GETGAS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE MULTICHANNEL GAS V2 SENSOR _ READ GAS JSON
    {
        "type": "sensors_getMultichannelGasV2",
        "message0": "%{BKY_SENSORS_MULTICHANNELV2_GETGAS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "GAS",
            "options": [
                ["%{BKY_GAS_NO2}", "NO2"],
                ["%{BKY_GAS_CO}", "CO"],
                ["%{BKY_GAS_C2H5OH}", "C2H5OH"],
                ["%{BKY_GAS_VOC}", "VOC"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_MULTICHANNELV2_GETGAS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE O2 GAS SENSOR _ GET CONCENTRATION
    {
        "type": "sensors_getO2gas",
        "message0": "%{BKY_SENSORS_O2_GAS_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_O2_GAS_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE SCD30 SENSOR _ GET GAS / TEMP / HUMIDITY
    {
        "type": "sensors_SCD30_readData",
        "message0": "%{BKY_SENSORS_SCD30_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_SCD30_CO2}", "CO2"],
                ["%{BKY_SENSORS_SCD30_TEMP}", "TEMP"],
                ["%{BKY_SENSORS_SCD30_HUM}", "HUM"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_SCD30_READDATA_TOOLTIP}",
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
            "name": "DEFAULT"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_SCD30_FORCED_CALIBRATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // AIR QUALITY SENSOR _ READ AIR QUALITY VALUE
    {
        "type": "sensors_getAirQualityValue",
        "message0": "%{BKY_SENSORS_AIR_QUALITY_GETVALUE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_AIR_QUALITY_GETVALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE HM330X _ GET PARTICULE MATTER (I2C)
    {
        "type": "sensors_getParticulateMatter",
        "message0": "%{BKY_SENSORS_HM330X_GETPARTICULE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_SENSORS_HM330X_ATM_PM1}", "3"],
                ["%{BKY_SENSORS_HM330X_ATM_PM2_5}", "4"],
                ["%{BKY_SENSORS_HM330X_ATM_PM10}", "5"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_HM330X_GETPARTICULE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin climate sensors blocks*/

    // GROVE BMP280 SENSOR _ READ DATA (I2C)
    {
        "type": "sensors_getBmp280Data",
        "message0": "%{BKY_SENSORS_BMP280_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ADDR",
            "options": [
                ["0x76", "0x76"],
                ["0x77 (Grove)", "0x77"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_BMP280_TEMP}", "TEMP"],
                ["%{BKY_SENSORS_BMP280_PRESS}", "PRESS"],
                ["%{BKY_SENSORS_BMP280_ALT}", "ALT"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_BMP280_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // BLOCK GROVE MOISTURE SENSOR
    {
        "type": "sensors_getGroveMoisture",
        "message0": "%{BKY_SENSORS_GETGROVEMOISTURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEMOISTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE TEMPERATURE SENSOR
    {
        "type": "sensors_getGroveTemperature",
        "message0": "%{BKY_SENSORS_GETGROVETEMPERATURE_TITLE}",
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
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVETEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE HIGH TEMPERATURE 
    {
        "type": "sensors_getGroveHighTemperature",
        "message0": "%{BKY_SENSORS_GETGROVEHIGHTEMP_TITLE}",
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
            "name": "A0",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "A1",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEHIGHTEMP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
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
            "block_init_helpurl"
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
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // GROVE TH02 SENSOR _ READ DATA (I2C)
    {
        "type": "sensors_TH02readData",
        "message0": "%{BKY_SENSORS_TH02_READDATA_TITLE}",
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
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_TH02_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // GROVE SHT31 SENSOR _ READ DATA (I2C)
    {
        "type": "sensors_SHT31readData",
        "message0": "%{BKY_SENSORS_SHT31_READDATA_TITLE}",
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
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_SHT31_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
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
            "block_init_helpurl"
        ]
    },

    // TI Grove - Read pressure
    {
        "type": "sensors_mpx5700ap_getPressure",
        "message0": "%{BKY_SENSORS_MPX5700AP_GETPRESSURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_MPX5700AP_GETPRESSURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // TI Grove - Calibrate pressure sensor
    {
        "type": "sensors_mpx5700ap_calibrate",
        "message0": "%{BKY_SENSORS_MPX5700AP_CALIBRATE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "M",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_MPX5700AP_CALIBRATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE WATER SENSOR
    {
        "type": "sensors_getGroveWaterAmount",
        "message0": "%{BKY_SENSORS_GETGROVEWATER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEWATER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //  BLOCK RAIN GAUGE _ GET STATE
    {
        "type": "sensors_getRainGauge",
        "message0": "%{BKY_SENSORS_GETRAINGAUGE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETRAINGAUGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //  BLOCK ANEMOMETER _ GET STATE
    {
        "type": "sensors_getAnemometer",
        "message0": "%{BKY_SENSORS_GETANEMOMETER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETANEMOMETER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin sound & light sensors blocks*/

    // BLOCK GROVE LIGHT SENSOR JSON
    {
        "type": "sensors_getGroveLight",
        "message0": "%{BKY_SENSORS_GETGROVELIGHT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVELIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE SI1145 SENSOR _ READ LIGHT (I2C)
    {
        "type": "sensors_getSi1145Light",
        "message0": "%{BKY_SENSORS_SI1145_GETLIGHT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LIGHT",
            "options": [
                ["%{BKY_SENSORS_SI1145_UV}", "UV"],
                ["%{BKY_SENSORS_SI1145_VISIBLE}", "VIS"],
                ["%{BKY_SENSORS_SI1145_IR}", "IR"],
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_SI1145_GETLIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE UV SENSOR _ GET INDEX
    {
        "type": "sensors_getUVindex",
        "message0": "%{BKY_SENSORS_GETUVINDEX_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETUVINDEX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE SOUND SENSOR
    {
        "type": "sensors_getGroveSound",
        "message0": "%{BKY_SENSORS_GETGROVESOUND_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVESOUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE I2C COLOR SENSOR _ GET DATA JSON
    {
        "type": "sensors_colorSensor_getData",
        "message0": "%{BKY_SENSORS_GROVECOLOR_GETDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_COLOR_LEVEL_RED}", "0"],
                ["%{BKY_COLOR_LEVEL_GREEN}", "1"],
                ["%{BKY_COLOR_LEVEL_BLUE}", "2"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GROVECOLOR_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin distance & movement sensors blocks*/

    // GROVE  ULTRASONIC SENSOR _ GET DISTANCE
    {
        "type": "sensors_getGroveUltrasonicRanger",
        "message0": "%{BKY_SENSORS_GETGROVEULTRASONIC_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["Grove", "GROVE"],
                ["HC-SR04", "HC-SR04"]
            ],
        }, {
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_ULTRASONIC_DISTANCE}", "DIST"],
                ["%{BKY_SENSORS_ULTRASONIC_DURATION}", "TIME"]
            ],
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEULTRASONIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_ultrasonic_mutator"
    },

    // BLOCK GROVE GESTURE SENSOR (I2C) _ GET GESTURE
    {
        "type": "sensors_getGesture",
        "message0": "%{BKY_SENSORS_GETGESTURE_TITLE}",
        "output": "String",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGESTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE GESTURE SENSOR (I2C) _ ON GESTURE ... DO
    {
        "type": "sensors_onGestureTypeDetected",
        "message0": "%{BKY_SENSORS_ONGESTUREDETECTED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "GESTURE",
            "options": [
                ["%{BKY_SENSORS_GESTURE_RIGHT}", "right"],
                ["%{BKY_SENSORS_GESTURE_LEFT}", "left"],
                ["%{BKY_SENSORS_GESTURE_UP}", "up"],
                ["%{BKY_SENSORS_GESTURE_DOWN}", "down"],
                ["%{BKY_SENSORS_GESTURE_FORWARD}", "forward"],
                ["%{BKY_SENSORS_GESTURE_BACKWARD}", "backward"],
                ["%{BKY_SENSORS_GESTURE_CLOCKWISE}", "clockwise"],
                ["%{BKY_SENSORS_GESTURE_ANTICLOCKWISE}", "anticlockwise"],
                ["%{BKY_SENSORS_GESTURE_WAVE}", "wave"]
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
        "tooltip": "%{BKY_SENSORS_ONGESTUREDETECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE LINE FINDER _ GET STATE
    {
        "type": "sensors_getGroveLineFinder",
        "message0": "%{BKY_SENSORS_GETGROVELINEFINDER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVELINEFINDER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE TILT MODULE _ GET STATE
    {
        "type": "sensors_getGroveTilt",
        "message0": "%{BKY_SENSORS_GETGROVETILT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVETILT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE PIR MOTION SENSOR _ GET STATE
    {
        "type": "sensors_getGroveMotion",
        "message0": "%{BKY_SENSORS_GETGROVEMOTION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEMOTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE PIEZO VIBRATION SENSOR _ GET STATE
    {
        "type": "sensors_getPiezoVibration",
        "message0": "%{BKY_SENSORS_GETPIEZOVIBRATION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETPIEZOVIBRATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE SIMPLE BUTTON _ READ DIGITAL 
    {
        "type": "sensors_getGroveButton",
        "message0": "%{BKY_SENSORS_GETGROVEBUTTON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "TYPE",
            "options": [
                ["%{BKY_SENSORS_GETGROVEBUTTON_VOLTAGE}", "VOLT"],
                ["%{BKY_SENSORS_GETGROVEBUTTON_STATE}", "STATE"],
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVEBUTTON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Sensors = Object.create(null);

/**
 * Performs final setup of ultrasonic block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Sensors.SENSORS_ULTRASONIC_INIT_EXTENSION = function () {
    var dropdown = this.getField("SENSOR");
    dropdown.setValidator(function (value) {
        var newSensor = (value == "GROVE");
        if (newSensor != this.isGrove_) {
            var block = this.getSourceBlock();
            block.updateField_(newSensor);
        }
    });
    var isGroveInital = (this.getFieldValue("SENSOR") == "GROVE");
    this.updateField_(isGroveInital);
};

/**
 * Mixin for mutator functions in the 'sensors_ultrasonic_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Sensors.SENSORS_ULTRASONIC_MUTATOR_MIXIN = {
    /**
     * Create XML to represent whether there is an 'pin' dropdown field.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('pin', !!this.isGrove_);
        return container;
    },
    /**
     * Parse XML to restore the 'temp' dropdown field.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        var isGrove = (xmlElement.getAttribute('pin') != 'false');
        this.updateField_(isGrove);
    },
    /**
     * Create or delete temperature unit field_dropdown.
     * @param {boolean} isGrove True if the dropdown should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function (isGrove) {
        // Destroy 'TRIG' and 'ECHO' field.
        if (this.getInput("HC_PINS")) {
            this.removeInput("HC_PINS");
        }
        // Destroy 'PIN' field.
        if (this.getInput("GROVE_PIN")) {
            this.removeInput("GROVE_PIN");
        }
        if (isGrove) {
            this.setInputsInline(true);
            // Create either a value 'PIN' dropdown field.
            this.appendDummyInput("GROVE_PIN")
                .appendField(Blockly.Msg["SENSORS_ULTRASONIC_1PIN"])
                .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]), "PIN");
        } else {
            this.setInputsInline(false);
            // Create either value 'TRIG' & 'ECHO' dropdown fields.
            this.appendDummyInput("HC_PINS")
                .appendField(Blockly.Msg["SENSORS_ULTRASONIC_2PINS"])
                .appendField("TRIG")
                .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]), "TRIG")
                .appendField("ECHO")
                .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]), "ECHO");
        }
        this.isGrove_ = isGrove;
    }
};

Blockly.Extensions.registerMutator('sensors_ultrasonic_mutator',
    Blockly.Constants.Sensors.SENSORS_ULTRASONIC_MUTATOR_MIXIN,
    Blockly.Constants.Sensors.SENSORS_ULTRASONIC_INIT_EXTENSION);