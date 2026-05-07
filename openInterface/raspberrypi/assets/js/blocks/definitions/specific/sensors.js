/**
 * @fileoverview Sensors blocks for Raspberry Pi.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /** Begin cameras blocks */

    {
        "type": "sensors_rpi_camera_takePicture",
        "message0": "%{BKY_SENSORS_RPI_CAMERA_TAKE_PICTURE_TITLE}",
        "output": "Array",
        "tooltip": "%{BKY_SENSORS_RPI_CAMERA_TAKE_PICTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_rpi_camera_takeVideo",
        "message0": "%{BKY_SENSORS_RPI_CAMERA_TAKE_VIDEO_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "FILENAME",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSORS_RPI_CAMERA_TAKE_VIDEO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_rpi_camera_changeSize",
        "message0": "%{BKY_SENSORS_RPI_CAMERA_CHANGE_SIZE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "FRAMESIZE",
            "options": [
                ["1280 x 720 (HD)", "(1280, 720)"],
                ["640 x 480 (VGA)", "(640, 480)"],
                ["96 x 96", "(96, 96)"],
                ["160 x 120 (QQVGA)", "(160, 120)"],
                ["176 x 144 (QCIF)", "(176, 144)"],
                ["240 x 176 (HQVGA)", "(240, 176)"],
                ["240 x 240", "(240, 240)"],
                ["320 x 240 (QVGA)", "(320, 240)"],
                ["400 x 296 (CIF)", "(400, 296)"],
                ["480 x 320 (HVGA)", "(480, 320)"],
                ["800 x 600 (SVGA)", "(800, 600)"],
                ["1024 x 768 (XGA)", "(1024, 768)"],
                ["1280 x 1024 (SXGA)", "(1280, 1024)"],
                ["1600 x 1200 (UXGA)", "(1600, 1200)"],
                ["1920 x 1080 (FHD)", "(1920, 1080)"],
                ["720 x 1280 (P_HD)", "(720, 1280)"],
                ["864 x 1536 (P_3MP)", "(864, 1536)"],
                ["2048 x 1536 (QXGA)", "(2048, 1536)"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSORS_RPI_CAMERA_CHANGE_SIZE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_usb_camera_takePicture",
        "message0": "%{BKY_SENSORS_USB_CAMERA_TAKE_PICTURE_TITLE}",
        "output": "Array",
        "tooltip": "%{BKY_SENSORS_USB_CAMERA_TAKE_PICTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_usb_camera_takeVideo",
        "message0": "%{BKY_SENSORS_USB_CAMERA_TAKE_VIDEO_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "FILENAME",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSORS_USB_CAMERA_TAKE_VIDEO_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_usb_camera_changeSize",
        "message0": "%{BKY_SENSORS_USB_CAMERA_CHANGE_SIZE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "FRAMESIZE",
            "options": [
                ["1280 x 720 (HD)", "(1280, 720)"],
                ["640 x 480 (VGA)", "(640, 480)"],
                ["96 x 96", "(96, 96)"],
                ["160 x 120 (QQVGA)", "(160, 120)"],
                ["176 x 144 (QCIF)", "(176, 144)"],
                ["240 x 176 (HQVGA)", "(240, 176)"],
                ["240 x 240", "(240, 240)"],
                ["320 x 240 (QVGA)", "(320, 240)"],
                ["400 x 296 (CIF)", "(400, 296)"],
                ["480 x 320 (HVGA)", "(480, 320)"],
                ["800 x 600 (SVGA)", "(800, 600)"],
                ["1024 x 768 (XGA)", "(1024, 768)"],
                ["1280 x 1024 (SXGA)", "(1280, 1024)"],
                ["1600 x 1200 (UXGA)", "(1600, 1200)"],
                ["1920 x 1080 (FHD)", "(1920, 1080)"],
                ["720 x 1280 (P_HD)", "(720, 1280)"],
                ["864 x 1536 (P_3MP)", "(864, 1536)"],
                ["2048 x 1536 (QXGA)", "(2048, 1536)"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSORS_USB_CAMERA_CHANGE_SIZE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_cv2_camera_savePicture",
        "message0": "%{BKY_SENSORS_CV2_CAMERA_SAVE_PICTURE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "IMG",
            "check": "Array"
        }, {
            "type": "input_value",
            "name": "FILENAME",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSORS_CV2_CAMERA_SAVE_PICTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_camera_showPictureInVittascience",
        "message0": "%{BKY_SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "IMG",
            "check": ["Array", "String"]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSORS_CAMERA_SHOW_PICTURE_IN_VITTASCIENCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_camera_showVideoInVittascience",
        "message0": "%{BKY_SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FILENAME",
            "check": "String"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSORS_CAMERA_SHOW_VIDEO_IN_VITTASCIENCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_camera_getPictureFiles",
        "message0": "%{BKY_SENSORS_CAMERA_GET_PICTURE_FILES_TITLE}",
        "output": "Array",
        "tooltip": "%{BKY_SENSORS_CAMERA_GET_PICTURE_FILES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    {
        "type": "sensors_camera_getVideoFiles",
        "message0": "%{BKY_SENSORS_CAMERA_GET_VIDEO_FILES_TITLE}",
        "output": "Array",
        "tooltip": "%{BKY_SENSORS_CAMERA_GET_VIDEO_FILES_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    /** Begin Sense HAT sensors */

    // temperature
    {
        "type": "sensehat_getSenseHatTemperature",
        "message0": "%{BKY_SENSE_HAT_GET_TEMPERATURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(°C)", "celsius"],
                ["(°F)", "fahrenheit"],
                ["(K)", "kelvin"]
            ]
        }],
        "output": "Number",
        "tooltip": "%{BKY_SENSE_HAT_GET_TEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },
    // humidity
    {
        "type": "sensehat_getSenseHatHumidity",
        "message0": "%{BKY_SENSE_HAT_GET_HUMIDITY_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSE_HAT_GET_HUMIDITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    // TEMPERATURE FROM HUMIDITY or PRESSURE SENSOR
    {
        "type": "sensehat_getTemperatureFrom",
        "message0": "%{BKY_SENSE_HAT_GET_TEMPERATURE_FROM_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(°C)", "celsius"],
                ["(°F)", "fahrenheit"],
                ["(K)", "kelvin"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "SENSOR",
            "options": [
                ["%{BKY_SENSORS_HUMIDITY}", "humidity"],
                ["%{BKY_SENSE_HAT_GET_TEMPERATURE_PRESSURE}", "pressure"]
            ]
        }],
        "output": "Number",
        "tooltip": "%{BKY_SENSE_HAT_GET_TEMPERATURE_FROM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    // PRESSURE
    {
        "type": "sensehat_getSenseHatPressure",
        "message0": "%{BKY_SENSE_HAT_GET_PRESSURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(mbar)", "mbar"],
                ["(bar)", "bar"],
                ["(hPa)", "hectopascal"],
                ["(mmHg)", "mmhg"],
                ["(psi)", "psi"]
            ]
        }],
        "output": "Number",
        "tooltip": "%{BKY_SENSE_HAT_GET_PRESSURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    // IMU (inertial measurement unit)
    {
        "type": "sensehat_set_imu_config",
        "message0": "%{BKY_SENSE_HAT_SET_IMU_CONFIG_TITLE}",
        "args0": [{
            'type': 'field_grid_dropdown',
            'name': 'IMU_CONFIG_GYRO',
            'options': [
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_ON}', 'True'],
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_OFF}', 'False'],
            ]
        }, {
            "type": "input_dummy"
        }, {
            'type': 'field_grid_dropdown',
            'name': 'IMU_CONFIG_ACCEL',
            'options': [
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_ON}', 'True'],
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_OFF}', 'False'],
            ]
        }, {
            "type": "input_dummy"
        }, {
            'type': 'field_grid_dropdown',
            'name': 'IMU_CONFIG_COMPASS',
            'options': [
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_ON}', 'True'],
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_OFF}', 'False'],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSE_HAT_SET_IMU_CONFIG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },
    // get_orientation_radians
    {
        "type": "sensehat_imu_get_orientation",
        "message0": "%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_TITLE}",
        "args0": [{
            'type': 'field_grid_dropdown',
            'name': 'ORIENTATION',
            'options': [
                ['%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_RADIANS}', 'radians'],
                ['%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_DEGREES}', 'degrees'],
            ]
        }],
        "output": "Array",
        "tooltip": "%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },
    // get_orientation_degrees
    // {
    //     "type": "sensehat_imu_get_orientation_degrees",
    //     "message0": "%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_TITLE}",
    //     "output": "Array",
    //     "tooltip": "%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TOOLTIP}",
    // },
    // compass
    {
        "type": "sensehat_imu_get_compass",
        "message0": "%{BKY_SENSE_HAT_IMU_GET_COMPASS_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSE_HAT_IMU_GET_COMPASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ],
    },

    /** Begin Climate sensors blocks */

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
        "tooltip": "%{BKY_SENSORS_DHT11_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
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
        "tooltip": "%{BKY_SENSORS_DHT22_READDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
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
            "options": [
                ["GPIO4 (GPCLK0)", "4"], // board: 7
            ]
        }],
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_DS18B20_GETTEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color",
            "pins_management_global"
        ]
    },

    /** Begin Sound & Light sensors blocks */

    // GROVE I2C COLOR SENSOR _ GET DATA JSON
    {
        "type": "sensors_colorSensorV2_getData",
        "message0": "%{BKY_SENSORS_GROVECOLORV2_GETDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_COLOR_LEVEL_RED}", "red"],
                ["%{BKY_COLOR_LEVEL_GREEN}", "green"],
                ["%{BKY_COLOR_LEVEL_BLUE}", "blue"]
            ]
        }],
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GROVECOLORV2_GETDATA_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

    /** Begin Distance & Movements sensors blocks */

    // BLOCK GROVE GESTURE SENSOR (I2C) _ GET GESTURE
    {
        "type": "sensors_getGesture",
        "message0": "%{BKY_SENSORS_GETGESTURE_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_GETGESTURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
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
                ["%{BKY_SENSORS_GESTURE_WAVE}", "wave"],
                ["%{BKY_SENSORS_GESTURE_NOTHING}", "nothing"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_SENSORS_ONGESTUREDETECTED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_init_color"
        ]
    },

]); // END JSON EXTRACT (Do not delete this comment.)
