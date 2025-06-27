/**
 * @fileoverview Sensors blocks for Esp32.
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

    /* Begin ESP32-CAM blocks */

    // BLOCK GET CAPTURED DATA OF CAM
    {
        "type": "esp32Cam_getCaptureData",
        "message0": "%{BKY_ESP32_CAM_GET_CAPTURED_DATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BASE",
            "options": [
                ["base64", "BASE64"],
                ["base16", "BASE16"]
            ]
        }],
        "output": "Array",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_ESP32_CAM_GET_CAPTURED_DATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET IMAGE SIZE
    {
        "type": "esp32Cam_setImageSize",
        "message0": "%{BKY_ESP32_CAM_SET_IMAGE_SIZE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "FRAMESIZE",
            "options": [
                ["640 x 480", "VGA"],
                ["96 x 96", "96X96"],
                ["160 x 120", "QQVGA"],
                ["176 x 144", "QCIF"],
                ["240 x 176", "HQVGA"],
                ["240 x 240", "240X240"],
                ["320 x 240", "QVGA"],
                ["400 x 296", "CIF"],
                ["480 x 320", "HVGA"],
                ["800 x 600", "SVGA"],
                ["1024 x 768", "XGA"],
                ["1280 x 720", "HD"],
                ["1280 x 1024", "SXGA"],
                ["1600 x 1200", "UXGA"],
                ["1920 x 1080", "FHD"],
                ["720 x 1280", "P_HD"],
                ["864 x 1536", "P_3MP"],
                ["2048 x 1536", "QXGA"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_ESP32_CAM_SET_IMAGE_SIZE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONTROL ESP32-CAM FLASH LED  
    {
        "type": "esp32Cam_controlFlashLED",
        "message0": "%{BKY_ESP32_CAM_CONTROL_FLASH_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_ESP32_CAM_CONTROL_FLASH_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONTROL ESP32-CAM SDCARD - SAVE PIC 
    {
        "type": "esp32Cam_SDcard_savePic",
        "message0": "%{BKY_ESP32_CAM_SDCARD_SAVE_PIC_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA",
            "check": "Array"
        }, {
            "type": "field_grid_dropdown",
            "name": "BASE",
            "options": [
                ["base64", "BASE64"],
                ["base16", "BASE16"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_ESP32_CAM_SDCARD_SAVE_PIC_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // CONTROL ESP32-CAM SDCARD - SAVE DATA 
    {
        "type": "esp32Cam_SDcard_saveData",
        "message0": "%{BKY_ESP32_CAM_SDCARD_SAVE_DATA_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DATA",
            "check": "String"
        }, {
            "type": "input_value",
            "name": "FILENAME",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_ESP32_CAM_SDCARD_SAVE_DATA_TOOLTIP}",
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
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_SGP30_READDATA_TOOLTIP}",
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

    // HM330X SENSOR _ DETECT PARTICULE MATTER JSON
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
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_HM330X_GETPARTICULE_TOOLTIP}",
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

    // GROVE SHT35 SENSOR _ READ DATA (I2C)
    {
        "type": "sensors_SHT35readData",
        "message0": "%{BKY_SENSORS_SHT35_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
                ["%{BKY_SENSORS_HUMIDITY}", "HUM"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_SHT35_READDATA_TOOLTIP}",
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

    // BLOCK GROVE WATER SENSOR
    {
        "type": "sensors_getGroveWaterAmount",
        "message0": "%{BKY_SENSORS_GETGROVEWATER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
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

    // GROVE BAROMETER (HIGH-ACCURACY) SENSOR _ READ DATA (I2C)
    {
        "type": "sensors_barometerReadData",
        "message0": "%{BKY_SENSORS_BAROMETER_READDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
                ["%{BKY_SENSORS_PRESSURE}", "PRESS"],
                ["%{BKY_SENSORS_ALTITUDE}", "ALT"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_BAROMETER_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
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

    // I2C GY-521 SENSOR _ GET DATA JSON
    {
        "type": "sensors_gy521_getData",
        "message0": "%{BKY_SENSORS_GY521_GETDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_SENSORS_GY521_ACC}", "ACC"],
                ["%{BKY_SENSORS_GY521_GYR}", "GYR"],
                ["%{BKY_SENSORS_GY521_TEMP}", "TEMP"]
            ]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GY521_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_gy521_mutator"
    },

    // Other sensors

    // GROVE FSR402 SENSOR _ GET FORCE
    {
        "type": "sensors_getFsr402Force",
        "message0": "%{BKY_SENSORS_FSR402_GETFORCE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_FSR402_GETFORCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE VOLTAGE DIVIDER SENSOR 
    {
        "type": "sensors_getVoltageDividerData",
        "message0": "%{BKY_SENSORS_VOLTAGE_DIVIDER_GETDATA_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "DIVIDER",
                "options": [
                    ["3", "3"],
                    ["10", "10"]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
            }
        ],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_VOLTAGE_DIVIDER_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE EMG DETECTOR
    {
        "type": "sensors_getEmgDetector",
        "message0": "%{BKY_SENSORS_EMG_DETECTOR_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_EMG_DETECTOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //  GET ANALOG DISSOLVED OXYGEN PROBE 
    {
        "type": "sensors_getDissolvedOxygenProbe",
        "message0": "%{BKY_SENSORS_GET_DISSOLVED_OXYGEN_PROBE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_DISSOLVED_OXYGEN_PROBE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE WATER LEVEL SENSOR
    {
        "type": "sensors_getWaterLevel",
        "message0": "%{BKY_SENSORS_GET_WATER_LEVEL_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_WATER_LEVEL_TOOLTIP}",
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


/**
* Performs final setup of gy521 blocks.
* @this {Blockly.Block}
*/
Blockly.Constants.Utils.SENSORS_GY521_INIT_EXTENSION = function () {
    this.TEMPERATURE_UNIT = [
        ["(°C)", 'CELSIUS'],
        ["(°F)", 'FAHRENHEIT'],
        ["(K)", 'KELVIN']
    ];
    this.AXIS_UNIT = [
        ["x", 'x'],
        ["y", 'y'],
        ["z", 'z']
    ];
    const dropdown = this.getField("DATA");
    dropdown.setValidator(function (value) {
        const newTemp = (value == "TEMP");
        if (newTemp != this.isTemp_) {
            this.getSourceBlock().updateField_(newTemp);
        }
    });
    this.updateField_(this.getFieldValue("DATA") == "TEMP");
};

/**
 * Mixin for mutator functions in the 'sensors_gy521_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Utils.SENSORS_GY521_MUTATOR_MIXIN = {
    /**
     * Create XML to represent whether there is an 'temp' dropdown field.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        // container.setAttribute('temp', this.isTemp_);
        return container;
    },
    domToMutation: function (xmlElement) {},
    /**
     * Create or delete temperature unit field_dropdown.
     * @param {boolean} isTemp True if the dropdown should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateField_: function (isTemp) {
        // Destroy old 'UNIT' field.
        if (this.getInput("UNIT")) {
            this.removeInput("UNIT");
        }
        if (this.getInput("AXIS")) {
            this.removeInput("AXIS");
        }
        // Create either a value 'TEMP' dropdown field.
        this.setInputsInline(true);
        if (isTemp) {
            this.appendDummyInput("UNIT")
                .appendField(Blockly.Msg["SENSORS_TEMPERATURE_IN"])
                .appendField(new Blockly.FieldDropdown(this.TEMPERATURE_UNIT), "UNIT");
        } else {
            this.appendDummyInput("AXIS")
            .appendField(Blockly.Msg["SENSORS_GY521_AXIS"])
            .appendField(new Blockly.FieldDropdown(this.AXIS_UNIT), "AXIS");
        }
        this.isTemp_ = isTemp;
    }
};

Blockly.Extensions.registerMutator('sensors_gy521_mutator',
    Blockly.Constants.Utils.SENSORS_GY521_MUTATOR_MIXIN,
    Blockly.Constants.Utils.SENSORS_GY521_INIT_EXTENSION);