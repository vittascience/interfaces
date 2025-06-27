/**
 * @fileoverview Sensors blocks for Raspberry pi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    
    //Galaxia Specific Blocks
    // BLOCK GET ACCELERATION
    // {
    //     "type": "sensors_getAcceleration",
    //     "message0": "%{BKY_SENSORS_GETACCELERATION_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "AXIS",
    //         "options": [
    //             ["x", "x"],
    //             ["y", "y"],
    //             ["z", "z"],
    //             ["strength", "strength"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETACCELERATION_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK ON MOUVEMENT
    // {
    //     "type": "io_onMovement",
    //     "message0": "%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "MOV",
    //         "options": [
    //             ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_SHAKE}", "shake"],
    //             ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_UP}", "up"], //logo up
    //             ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_DOWN}", "down"], //logo down
    //             ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_FACE_UP}", "face up"], //screen up
    //             ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_FACE_DOWN}", "face down"], //screen down
    //             ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_LEFT}", "left"], //tilt left
    //             ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_RIGHT}", "right"], //tilt right
    //             ["%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_FREEFALL}", "freefall"],
    //             ["3g", "3g"],
    //             ["6g", "6g"],
    //             ["8g", "8g"]
    //         ]
    //     }],
    //     "message1": "%1",
    //     "args1": [{
    //         "type": "input_statement",
    //         "name": "DO"
    //     }],
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_ACCELEROMETER_ON_MOVEMENT_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GET LIGHT
    // {
    //     "type": "sensors_getLight",
    //     "message0": "%{BKY_SENSORS_GETLIGHT_TITLE}",
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETLIGHT_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK CALIBRATE COMPASS
    // {
    //     "type": "sensors_calibrateCompass",
    //     "message0": "%{BKY_SENSORS_CALIBRATECOMPASS_TITLE}",
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_CALIBRATECOMPASS_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GET COMPASS
    // {
    //     "type": "sensors_getCompass",
    //     "message0": "%{BKY_SENSORS_GETCOMPASS_TITLE}",
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETCOMPASS_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GET TEMPERATURE
    // {
    //     "type": "sensors_getTemperature",
    //     "message0": "%{BKY_SENSORS_GETTEMPERATURE_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "UNIT",
    //         "options": [
    //             ["(°C)", "CELSIUS"],
    //             ["(°F)", "FAHRENHEIT"],
    //             ["(K)", "KELVIN"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETTEMPERATURE_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GET ROTATION
    // {
    //     "type": "sensors_getRotation",
    //     "message0": "%{BKY_SENSORS_GETROTATION_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "AXIS",
    //         "options": [
    //             ["%{BKY_SENSORS_GETROTATION_PITCH}", "pitch"],
    //             ["%{BKY_SENSORS_GETROTATION_ROLL}", "roll"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETROTATION_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GET MAGNETIC FORCE
    // {
    //     "type": "sensors_getMagneticForce",
    //     "message0": "%{BKY_SENSORS_GETMAGNETICFORCE_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "AXIS",
    //         "options": [
    //             ["x", "x"],
    //             ["y", "y"],
    //             ["z", "z"],
    //             ["strength", "NORM"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETMAGNETICFORCE_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },
    // // GROVE BMP280 SENSOR _ READ DATA (I2C)
    // //Linky sensor
    // {
    //     "type": "sensors_linky",
    //     "message0": "%{BKY_SENSORS_LINKY_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "ADDR",
    //         "options": [
    //             ["%{BKY_SENSORS_LINKY_PAPP}", "PAPP"],
    //             ["%{BKY_SENSORS_LINKY_HCHC}", "HCHC"],
    //             ["%{BKY_SENSORS_LINKY_HCHP}", "HCHP"],
    //         ]
    //     },
    //     {
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_PINS,
    //     }],
    //     "output": "String",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_LINKY_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },
    // {
    //     "type": "sensors_getBmp280Data",
    //     "message0": "%{BKY_SENSORS_BMP280_READDATA_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "ADDR",
    //         "options": [
    //             ["0x76", "0x76"],
    //             ["0x77 (Grove)", "0x77"]
    //         ]
    //     }, {
    //         "type": "field_grid_dropdown",
    //         "name": "DATA",
    //         "options": [
    //             ["%{BKY_SENSORS_BMP280_TEMP}", "TEMP"],
    //             ["%{BKY_SENSORS_BMP280_PRESS}", "PRESS"],
    //             ["%{BKY_SENSORS_BMP280_ALT}", "ALT"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "inputsInline": true,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_BMP280_READDATA_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    //     "mutator": "sensors_temperature_mutator"
    // },

    // // BLOCK GROVE SGP30 SENSOR _ GET GAS (I2C)
    // {
    //     "type": "sensors_getSgp30Gas",
    //     "message0": "%{BKY_SENSORS_SGP30_READDATA_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "GAS",
    //         "options": [
    //             ["%{BKY_SENSORS_SGP30_CO2}", "CO2"],
    //             ["%{BKY_SENSORS_SGP30_TVOC}", "TVOC"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_SGP30_READDATA_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // GROVE O2 GAS SENSOR _ GET CONCENTRATION
    // {
    //     "type": "sensors_getO2gas",
    //     "message0": "%{BKY_SENSORS_O2_GAS_READDATA_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_O2_GAS_READDATA_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // GROVE SCD30 SENSOR _ GET GAS / TEMP / HUMIDITY
    // {
    //     "type": "sensors_SCD30_readData",
    //     "message0": "%{BKY_SENSORS_SCD30_READDATA_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "DATA",
    //         "options": [
    //             ["%{BKY_SENSORS_SCD30_CO2}", "CO2"],
    //             ["%{BKY_SENSORS_SCD30_TEMP}", "TEMP"],
    //             ["%{BKY_SENSORS_SCD30_HUM}", "HUM"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "inputsInline": true,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_SCD30_READDATA_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    //     "mutator": "sensors_temperature_mutator"
    // },

    // // GROVE SCD30 SENSOR _ FORCE RECALIBRATION
    // {
    //     "type": "sensors_SCD30_forcedCalibration",
    //     "message0": "%{BKY_SENSORS_SCD30_FORCED_CALIBRATION_TITLE}",
    //     "args0": [{
    //         "type": "input_value",
    //         "name": "DEFAULT",
    //         "check": "Number"
    //     }],
    //     "inputsInline": true,
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_SCD30_FORCED_CALIBRATION_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    // },

    // // GROVE MULTICHANNEL GAS SENSOR _ GET GAS (I2C)
    // {
    //     "type": "sensors_getMultichannelGas",
    //     "message0": "%{BKY_SENSORS_MULTICHANNEL_GETGAS_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "GAS",
    //         "options": [
    //             ["%{BKY_GAS_CO}", "CO"],
    //             ["%{BKY_GAS_NO2}", "NO2"],
    //             ["%{BKY_GAS_NH3}", "NH3"],
    //             ["%{BKY_GAS_C3H8}", "C3H8"],
    //             ["%{BKY_GAS_C4H10}", "C4H10"],
    //             ["%{BKY_GAS_CH4}", "CH4"],
    //             ["%{BKY_GAS_H2}", "H2"],
    //             ["%{BKY_GAS_C2H5OH}", "C2H5OH"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_MULTICHANNEL_GETGAS_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // AIR QUALITY SENSOR _ READ AIR QUALITY VALUE
    // {
    //     "type": "sensors_getAirQualityValue",
    //     "message0": "%{BKY_SENSORS_AIR_QUALITY_GETVALUE_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_AIR_QUALITY_GETVALUE_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // HM330X SENSOR _ DETECT PARTICULE MATTER JSON
    // {
    //     "type": "sensors_getParticulateMatter",
    //     "message0": "%{BKY_SENSORS_HM330X_GETPARTICULE_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "TYPE",
    //         "options": [
    //             ["%{BKY_SENSORS_HM330X_ATM_PM1}", "3"],
    //             ["%{BKY_SENSORS_HM330X_ATM_PM2_5}", "4"],
    //             ["%{BKY_SENSORS_HM330X_ATM_PM10}", "5"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_HM330X_GETPARTICULE_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    

    // // BLOCK GROVE DHT 22 SENSOR _ READ DATA
    // {
    //     "type": "sensors_DHT22ReadData",
    //     "message0": "%{BKY_SENSORS_DHT22_READDATA_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "DATA",
    //         "options": [
    //             ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
    //             ["%{BKY_SENSORS_HUMIDITY}", "HUM"]
    //         ]
    //     }, {
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_PINS
    //     }],
    //     "output": "Number",
    //     "inputsInline": true,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_DHT22_READDATA_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    //     "mutator": "sensors_temperature_mutator"
    // },

    // // GROVE TH02 SENSOR _ READ DATA (I2C)
    // {
    //     "type": "sensors_TH02readData",
    //     "message0": "%{BKY_SENSORS_TH02_READDATA_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "DATA",
    //         "options": [
    //             ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
    //             ["%{BKY_SENSORS_HUMIDITY}", "HUM"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "inputsInline": true,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_TH02_READDATA_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    //     "mutator": "sensors_temperature_mutator"
    // },

    // // BLOCK GROVE PIEZO VIBRATION SENSOR _ GET STATE
    // {
    //     "type": "sensors_getPiezoVibration",
    //     "message0": "%{BKY_SENSORS_GETPIEZOVIBRATION_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_PINS
    //     }],
    //     "output": "Boolean",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETPIEZOVIBRATION_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GROVE TILT MODULE _ GET STATE
    // {
    //     "type": "sensors_getGroveTilt",
    //     "message0": "%{BKY_SENSORS_GETGROVETILT_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_PINS
    //     }],
    //     "output": "Boolean",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVETILT_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    

    

    // // GROVE HIGH TEMPERATURE 
    // {
    //     "type": "sensors_getGroveHighTemperature",
    //     "message0": "%{BKY_SENSORS_GETGROVEHIGHTEMP_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "UNIT",
    //         "options": [
    //             ["(°C)", "CELSIUS"],
    //             ["(°F)", "FAHRENHEIT"],
    //             ["(K)", "KELVIN"]
    //         ]
    //     }, {
    //         "type": "field_grid_dropdown",
    //         "name": "A0",
    //         "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
    //     }, {
    //         "type": "field_grid_dropdown",
    //         "name": "A1",
    //         "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVEHIGHTEMP_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // GROVE SHT31 SENSOR _ READ DATA (I2C)
    // {
    //     "type": "sensors_SHT31readData",
    //     "message0": "%{BKY_SENSORS_SHT31_READDATA_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "DATA",
    //         "options": [
    //             ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
    //             ["%{BKY_SENSORS_HUMIDITY}", "HUM"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "inputsInline": true,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_SHT31_READDATA_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    //     "mutator": "sensors_temperature_mutator"
    // },

    // // BLOCK DS18B20 - GET TEMPERATURE SENSOR
    // {
    //     "type": "sensors_DS18B20_getTemperature",
    //     "message0": "%{BKY_SENSORS_DS18B20_GETTEMPERATURE_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "UNIT",
    //         "options": [
    //             ["(°C)", "CELSIUS"],
    //             ["(°F)", "FAHRENHEIT"],
    //             ["(K)", "KELVIN"]
    //         ]
    //     }, {
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_PINS
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_DS18B20_GETTEMPERATURE_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GROVE WATER SENSOR
    // {
    //     "type": "sensors_getGroveWaterAmount",
    //     "message0": "%{BKY_SENSORS_GETGROVEWATER_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVEWATER_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // //  BLOCK RAIN GAUGE _ GET STATE
    // {
    //     "type": "sensors_getRainGauge",
    //     "message0": "%{BKY_SENSORS_GETRAINGAUGE_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_PINS
    //     }],
    //     "output": "Boolean",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETRAINGAUGE_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // //  BLOCK ANEMOMETER _ GET STATE
    // {
    //     "type": "sensors_getAnemometer",
    //     "message0": "%{BKY_SENSORS_GETANEMOMETER_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_PINS
    //     }],
    //     "output": "Boolean",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETANEMOMETER_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // /* Begin sound & light sensors blocks*/

   

    // // BLOCK GROVE SI1145 SENSOR _ READ LIGHT (I2C)
    // {
    //     "type": "sensors_getSi1145Light",
    //     "message0": "%{BKY_SENSORS_SI1145_GETLIGHT_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "LIGHT",
    //         "options": [
    //             ["%{BKY_SENSORS_SI1145_UV}", "UV"],
    //             ["%{BKY_SENSORS_SI1145_VISIBLE}", "VIS"],
    //             ["%{BKY_SENSORS_SI1145_IR}", "IR"],
    //         ]
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_SI1145_GETLIGHT_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GROVE UV SENSOR _ GET INDEX
    // {
    //     "type": "sensors_getUVindex",
    //     "message0": "%{BKY_SENSORS_GETUVINDEX_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETUVINDEX_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GROVE SOUND SENSOR
    // {
    //     "type": "sensors_getGroveSound",
    //     "message0": "%{BKY_SENSORS_GETGROVESOUND_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_ANALOG_READ_PINS
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVESOUND_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // GROVE I2C COLOR SENSOR _ GET DATA JSON
    // {
    //     "type": "sensors_colorSensor_getData",
    //     "message0": "%{BKY_SENSORS_GROVECOLOR_GETDATA_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "DATA",
    //         "options": [
    //             ["%{BKY_COLOR_LEVEL_RED}", "0"],
    //             ["%{BKY_COLOR_LEVEL_GREEN}", "1"],
    //             ["%{BKY_COLOR_LEVEL_BLUE}", "2"]
    //         ]
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GROVECOLOR_GETDATA_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },
    // /* Begin distance & movement sensors blocks*/

    // // GROVE  ULTRASONIC SENSOR _ GET DISTANCE
    

    // // BLOCK GROVE LINE FINDER _ GET STATE
    // {
    //     "type": "sensors_getGroveLineFinder",
    //     "message0": "%{BKY_SENSORS_GETGROVELINEFINDER_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_PINS
    //     }],
    //     "output": "Boolean",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVELINEFINDER_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GROVE PIR MOTION SENSOR _ GET STATE
    // {
    //     "type": "sensors_getGroveMotion",
    //     "message0": "%{BKY_SENSORS_GETGROVEMOTION_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.GALAXIA_PINS
    //     }],
    //     "output": "Boolean",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVEMOTION_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // Raspberry Pi blocs

    // {
    //     "type": "sensors_getGroveUltrasonicRanger",
    //     "message0": "%{BKY_SENSORS_GETGROVEULTRASONIC_TITLE}",
    //     "args0": [
    //     {
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.digital
    //     },
    //     ],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVEULTRASONIC_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    //     // "mutator": "sensors_ultrasonic_mutator"
    // },

    // // BLOCK GROVE TEMPERATURE SENSOR
    // {
    //     "type": "sensors_getGroveTemperature",
    //     "message0": "%{BKY_SENSORS_GETGROVETEMPERATURE_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "UNIT",
    //         "options": [
    //             ["(°C)", "CELSIUS"],
    //             ["(°F)", "FAHRENHEIT"],
    //             ["(K)", "KELVIN"]
    //         ]
    //     }, {
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.analog_read
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVETEMPERATURE_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GROVE MOISTURE SENSOR
    // {
    //     "type": "sensors_getGroveMoisture",
    //     "message0": "%{BKY_SENSORS_GETGROVEMOISTURE_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.analog_read
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVEMOISTURE_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },

    // // BLOCK GROVE DHT 11 SENSOR _ READ DATA
    // {
    //     "type": "sensors_DHT11ReadData",
    //     "message0": "%{BKY_SENSORS_DHT11_READDATA_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "DATA",
    //         "options": [
    //             ["%{BKY_SENSORS_TEMPERATURE}", "TEMP"],
    //             ["%{BKY_SENSORS_HUMIDITY}", "HUM"]
    //         ]
    //     }, {
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.PWM
            
    //     }],
    //     "output": "Number",
    //     "inputsInline": true,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_DHT11_READDATA_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    //     "mutator": "sensors_temperature_mutator"
    // },

    //  // BLOCK GROVE LIGHT SENSOR JSON
    // {
    //     "type": "sensors_getGroveLight",
    //     "message0": "%{BKY_SENSORS_GETGROVELIGHT_TITLE}",
    //     "args0": [{
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.analog_read
    //     }],
    //     "output": "Number",
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_GETGROVELIGHT_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE
    // },
    // {
    //     "type": "sensors_rpi_camera_take_picture",
    //     "message0": "%{BKY_SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE}",
    //     "inputsInline": true,
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    // },
    // {
    //     "type": "sensors_rpi_camera_take_video",
    //     "message0": "%{BKY_SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE}",
    //     "args0": [{
    //         "type": "input_value",
    //         "name": "DURATION",
    //         "check": "Number",
    //     }],
    //     "inputsInline": true,
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "style": "sensors_blocks",
    //     "tooltip": "%{BKY_SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP}",
    //     "helpUrl": VITTASCIENCE_SITE,
    // },


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
// Blockly.Constants.Sensors.SENSORS_ULTRASONIC_MUTATOR_MIXIN = {
//     /**
//      * Create XML to represent whether there is an 'pin' dropdown field.
//      * @return {!Element} XML storage element.
//      * @this {Blockly.Block}
//      */
//     mutationToDom: function () {
//         var container = Blockly.utils.xml.createElement('mutation');
//         container.setAttribute('pin', !!this.isGrove_);
//         return container;
//     },
//     /**
//      * Parse XML to restore the 'temp' dropdown field.
//      * @param {!Element} xmlElement XML storage element.
//      * @this {Blockly.Block}
//      */
//     domToMutation: function (xmlElement) {
//         var isGrove = (xmlElement.getAttribute('pin') != 'false');
//         this.updateField_(isGrove);
//     },
//     /**
//      * Create or delete temperature unit field_dropdown.
//      * @param {boolean} isGrove True if the dropdown should exist.
//      * @private
//      * @this {Blockly.Block}
//      */
//     updateField_: function (isGrove) {
//         // Destroy 'TRIG' and 'ECHO' field.
//         if (this.getInput("HC_PINS")) {
//             this.removeInput("HC_PINS");
//         }
//         // Destroy 'PIN' field.
//         if (this.getInput("GROVE_PIN")) {
//             this.removeInput("GROVE_PIN");
//         }
//         if (isGrove) {
//             this.setInputsInline(true);
//             // Create either a value 'PIN' dropdown field.
//             this.appendDummyInput("GROVE_PIN")
//                 .appendField(Blockly.Msg["SENSORS_ULTRASONIC_1PIN"])
//                 .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.GALAXIA_PINS), "PIN");
//         } else {
//             this.setInputsInline(false);
//             // Create either value 'TRIG' & 'ECHO' dropdown fields.
//             this.appendDummyInput("HC_PINS")
//                 .appendField(Blockly.Msg["SENSORS_ULTRASONIC_2PINS"])
//                 .appendField("TRIG")
//                 .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.GALAXIA_PINS), "TRIG")
//                 .appendField("ECHO")
//                 .appendField(new Blockly.FieldDropdown(Blockly.Constants.Pins.GALAXIA_PINS), "ECHO");
//         }
//         this.isGrove_ = isGrove;
//     }
// };

// Blockly.Extensions.registerMutator('sensors_ultrasonic_mutator',
//     Blockly.Constants.Sensors.SENSORS_ULTRASONIC_MUTATOR_MIXIN,
//     Blockly.Constants.Sensors.SENSORS_ULTRASONIC_INIT_EXTENSION);