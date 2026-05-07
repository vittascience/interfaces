/**
 * @fileoverview Sensors blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Begin board sensors blocks*/

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

    // BLOCK IS COMPASS CALIBRATED
    {
        "type": "sensors_isCompassCalibrated",
        "message0": "%{BKY_SENSORS_ISCOMPASSCALIBRATED_TITLE}",
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_ISCOMPASSCALIBRATED_TOOLTIP}",
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

    /* Begin Enviro:bit blocks */

    // ENVIRO:BIT _ TCS3472 _ GET RGB
    {
        "type": "sensors_envirobit_tcs3472_getRGB",
        "message0": "%{BKY_SENSORS_TCS3472_GETRGB_TITLE}",
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
        "tooltip": "%{BKY_SENSORS_TCS3472_GETRGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // ENVIRO:BIT _ TCS3472 _ GET BRIGHTNESS
    {
        "type": "sensors_envirobit_tcs3472_getBrightness",
        "message0": "%{BKY_SENSORS_TCS3472_GETBRIGHTNESS_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_TCS3472_GETBRIGHTNESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // ENVIRO:BIT _ TCS3472 _ SET LED
    {
        "type": "sensors_envirobit_tcs3472_setLED",
        "message0": "%{BKY_SENSORS_TCS3472_SETLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_TCS3472_SETLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // ENVIRO:BIT _ BME280 _ GET DATA
    {
        "type": "sensors_envirobit_bme280_getData",
        "message0": "%{BKY_SENSORS_ENVIROBIT_BME280_GETDATA_TITLE}",
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
        "tooltip": "%{BKY_SENSORS_ENVIROBIT_BME280_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // ENVIRO:BIT _ MICRO _ GET SOUND LEVEL
    {
        "type": "sensors_envirobit_getSoundLevel",
        "message0": "%{BKY_SENSORS_ENVIRO_BIT_GETSOUNDLEVEL_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_ENVIRO_BIT_GETSOUNDLEVEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // ENVIRO:BIT _ MICRO _ WAIT FOR 1 OR 2 CLAPS
    {
        "type": "sensors_envirobit_waitForClaps",
        "message0": "%{BKY_SENSORS_ENVIRO_BIT_WAIT_CLAP_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "CLAPS",
            "options": [
                ["1", "1"],
                ["2", "2"]
            ]
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_ENVIRO_BIT_WAIT_CLAP_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /** Begin weather:bit blocks */

    // WEATHER:BIT _ BME280 _ GET DATA
    {
        "type": "sensors_weatherbit_bme280_getData",
        "message0": "%{BKY_SENSORS_WEATHERBIT_BME280_GETDATA_TITLE}",
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
        "tooltip": "%{BKY_SENSORS_WEATHERBIT_BME280_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // WEATHER:BIT _ ANEMOMETER _ GET SPEED
    {
        "type": "sensors_weatherbit_anemometer_getSpeed",
        "message0": "%{BKY_SENSORS_WEATHERBIT_ANEMOMETER_GET_SPEED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["%{BKY_SENSORS_UNIT_M_S}", "M_S"],
                ["%{BKY_SENSORS_UNIT_KM_H}", "KM_H"],
                ["%{BKY_SENSORS_UNIT_INCH_S}", "INCH_S"],
                ["%{BKY_SENSORS_UNIT_KNOT}", "KNOT"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_WEATHERBIT_ANEMOMETER_GET_SPEED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // WEATHER:BIT _ WEATHERCOCK _ GET DIRECTION
    {
        "type": "sensors_weatherbit_weathercock_getDirection",
        "message0": "%{BKY_SENSORS_WEATHERBIT_WEATHERCOCK_GET_DIRECTION_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_WEATHERBIT_WEATHERCOCK_GET_DIRECTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // WEATHER:BIT _ RAIN GAUGE _ GET DUMPS
    {
        "type": "sensors_weatherbit_rainGauge_getDumps",
        "message0": "%{BKY_SENSORS_WEATHERBIT_RAIN_GAUGE_GET_DUMPS_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_WEATHERBIT_RAIN_GAUGE_GET_DUMPS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // WEATHER:BIT - SOIL MOISTURE SENSOR
    {
        "type": "sensors_weatherbit_getSoilMoisture",
        "message0": "%{BKY_SENSORS_WEATHERBIT_GETSOILMOISTURE_TITLE}",
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_WEATHERBIT_GETSOILMOISTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Begin Kitronik environmental blocks */

    // KITRONIK _ BME280 _ GET DATA
    {
        "type": "sensors_kitronik_bme280_getData",
        "message0": "%{BKY_SENSORS_KITRONIK_BME280_GETDATA_TITLE}",
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
        "tooltip": "%{BKY_SENSORS_KITRONIK_BME280_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    {
        "type": "sensors_kitronik_klimate_bme280_getData",
        "message0": "%{BKY_SENSORS_KITRONIK_KLIMATE_BME280_GETDATA_TITLE}",
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
        "tooltip": "%{BKY_SENSORS_KITRONIK_KLIMATE_BME280_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    /* Begin gas sensors blocks */

    /* Begin climate sensors blocks*/

    // BME280 _ GET DATA
    {
        "type": "sensors_bme280_getData",
        "message0": "%{BKY_SENSORS_BME280_GETDATA_TITLE}",
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
        "tooltip": "%{BKY_SENSORS_BME280_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // BLOCK GROVE CAPACITIVE MOISTURE SENSOR
    {
        "type": "sensors_getGroveCapacitiveMoisture",
        "message0": "%{BKY_SENSORS_GETGROVECAPACITIVEMOISTURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GETGROVECAPACITIVEMOISTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // BLOCK GROVE DHT 11/22 SENSORS _ READ DATA
    {
        "type": "sensors_dhtReadData",
        "message0": "%{BKY_SENSORS_DHT_READDATA_TITLE}",
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
        }, {
            "type": "field_grid_dropdown",
            "name": "BOARD",
            "options": [
                ["micro:bit v1", "v1"],
                ["micro:bit v2", "v2"]
            ]
        }],
        "output": "Number",
        "inputsInline": true,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_DHT_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ],
        "mutator": "sensors_temperature_mutator"
    },

    // BLOCK GROVE MPX5700AP - GET PRESSURE
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
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // BLOCK GROVE MPX5700AP - CALIBRATE PRESSURE SENSOR
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

    /* Begin sound & light sensors blocks*/

    // GROVE I2C COLOR SENSOR V3 _ GET DATA JSON
    {
        "type": "sensors_colorSensorV3_getData",
        "message0": "%{BKY_SENSORS_GROVECOLORV3_GETDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                // ["%{BKY_COLOR_LEVEL_RAW_RED}", "raw_red"],
                // ["%{BKY_COLOR_LEVEL_RAW_GREEN}", "raw_green"],
                // ["%{BKY_COLOR_LEVEL_RAW_BLUE}", "raw_blue"],
                ["%{BKY_COLOR_LEVEL_RED}", "red"],
                ["%{BKY_COLOR_LEVEL_GREEN}", "green"],
                ["%{BKY_COLOR_LEVEL_BLUE}", "blue"],
                ["%{BKY_COLOR_LEVEL_WHITE}", "white"],
                ["%{BKY_COLOR_LEVEL_TEMP}", "cct"],
                ["%{BKY_COLOR_HUE}", "hue"],
                ["%{BKY_COLOR_SATURATION}", "sat"],
                ["%{BKY_COLOR_VALUE}", "val"],
                ["%{BKY_COLOR_NAME}", "name"],
            ]
        }],
        "output": null,
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GROVECOLORV3_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
        "mutator": "sensors_colorSensorV3_getData_output_mutator"
    },

    /* Begin distance & movement sensors blocks*/

    // ST VL53L0X SENSOR _ GET DISTANCE
    {
        "type": "sensors_VL53L0X_getRangeMillimeters",
        "message0": "%{BKY_SENSORS_VL53L0X_GETRANGEMILLIMETERS_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "UNIT",
                "options": [
                    ["mm", "Millimeter"],
                    ["cm", "Centimeter"],
                    ["m", "Meter"]
                ]
            }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_VL53L0X_GETRANGEMILLIMETERS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
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

    // BLOCK GROVE MINI PIR MOTION SENSOR _ GET STATE
    {
        "type": "sensors_getMiniPirGroveMotion",
        "message0": "%{BKY_SENSORS_GET_MINIPIR_GROVEMOTION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Boolean",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_MINIPIR_GROVEMOTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
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
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // BLOCK GROVE EAR CLIP _ GET HEART RATE
    {
        "type": "sensors_getEarClipHeartRate",
        "message0": "%{BKY_SENSORS_GET_EAR_CLIP_HEART_RATE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "output": "Number",
        "style": "sensors_blocks",
        "tooltip": "%{BKY_SENSORS_GET_EAR-CLIP_HEART_RATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

    // Other sensors

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
            "block_init_helpurl",
            "pins_management_global"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Utils.DEFINE_OUTPUT_TYPE_BY_DROPDOWN(
    "sensors_colorSensorV3_getData",
    'DATA',
    function (option) {
        switch (option) {
            default:
            case "red":
            case "green":
            case "blue":
            case "white":
            case "cct":
            case "hue":
            case "sat":
            case "val":
                this.setOutput(true, "Number");
                break;
            case "name":
                this.setOutput(true, "String");
                break;
        }
    }
);
