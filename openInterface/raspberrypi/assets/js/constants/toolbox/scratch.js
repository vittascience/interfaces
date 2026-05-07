const TOOLBOX_SCRATCH_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "sound",
        "name": "%{BKY_CATEGORY_SOUND}",
        "style": "sound_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-music"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "control",
        "name": "%{BKY_CATEGORY_CONTROL}",
        "style": "control_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-code-branch"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "communication",
        "name": "%{BKY_CATEGORY_COMMUNICATION}",
        "style": "communication_category",
        "cssConfig": {
            "icon": "icon_blockly far fa-comment-dots"
        },
        "contents": []
    },
    // {
    //     "kind": "category",
    //     "toolboxitemid": "network",
    //     "name": "%{BKY_CATEGORY_NETWORK}",
    //     "style": "network_category",
    //     "cssConfig": {
    //         "icon": "icon_blockly fas fa-wifi"
    //     },
    //     "contents": []
    // },
    {
        "kind": "category",
        "toolboxitemid": "display",
        "name": "%{BKY_CATEGORY_APPEARANCE}",
        "style": "display_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "sensors",
        "name": "%{BKY_CATEGORY_SENSORS}",
        "style": "sensors_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-plug"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "actuators",
        "name": "%{BKY_CATEGORY_ACTUATORS}",
        "style": "actuators_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-fan"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "robots",
        "name": "%{BKY_CATEGORY_ROBOTS}",
        "style": "robots_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-robot"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "math",
        "name": "%{BKY_CATEGORY_OPERATORS}",
        "style": "math_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-calculator"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "text",
        "name": "%{BKY_CATEGORY_TEXT}",
        "style": "text_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-font"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "variables",
        "name": "%{BKY_CATEGORY_VARIABLES}",
        "custom": "VARIABLE",
        "style": "variable_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-cog"
        }
    },
    {
        "kind": "category",
        "toolboxitemid": "lists",
        "name": "%{BKY_CATEGORY_LISTS}",
        "style": "lists_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-list"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "procedures",
        "name": "%{BKY_CATEGORY_PROCEDURES}",
        "custom": "PROCEDURE",
        "style": "procedure_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        }
    },
    {
        "kind": "category",
        "toolboxitemid": "exception",
        "name": "%{BKY_CATEGORY_EXCEPTION}",
        "style": "exception_category",
        "cssConfig": {
            "icon": "icon_blockly fa fa-circle-exclamation"
        },
        "contents": []
    }
];

const TOOLBOX_SCRATCH_CONTENT = {
    "display": [
        {
            "label": "%{BKY_SUBCATEGORY_SENSEHAT_MATRIX}",
            "blocks": [
                "sensehat_display_set_pixel",
                "sensehat_display_set_pixel_palette",
                'sensehat_display_set_pixels_image',
                'sensehat_display_get_pixel',
                'sensehat_display_get_pixels',
                'sensehat_show_leds_image',
                'sensehat_display_clear',
                'sensehat_display_clear_with_color',
                'sensehat_display_show_message',
                'sensehat_display_show_letter',
                // "sensehat_display_set_pixel_palette",
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_LCD}",
            "blocks": [
                'display_lcdSetText',
                'display_lcdClear'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_NEOPIXEL}",
            "blocks": [
                'display_defineNeopixel',
                'display_controlNeopixelLed',
                'display_controlColorNeopixelLed',
                'display_neopixel_controlAllLedRGB',
                'display_neopixel_controlAllLedPalette',
                'display_rainbowNeopixel'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LED}",
            "blocks": [
                'display_setGroveSocketLed',
                'display_setLEDintensity',
                'display_setVariableColorLED',
                'display_setNumberGrove4Digit',
                'display_setClockGrove4Digit'
            ]
        },
    ],
    "sound": [
        {
            "label": "%{BKY_SUBCATEGORY_MUSIC}",
            "blocks": [
                'actuators_playMusicGroveBuzzer',
                'actuators_music_playNotes',
                'actuators_music_note',
                'actuators_music_playFrequency',
                'actuators_music_stop',
            ]
        }
    ],
    "control": [
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                'io_pause',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer',
                'io_datetime_ymd_hms'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LOOPS}",
            "blocks": [
                'scratch_forever',
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
                'controls_forEach',
                'controls_flow_statements'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LOGIC}",
            "blocks": [
                'controls_if',
                'controls_if-else',
                'logic_ternary'
            ]
        }
    ],
    "communication": [
        {
            "label": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "blocks": [
                'communication_serialWrite',
                'communication_graphSerialWrite',
                'communication_graphSerialWrite_datasFormat'
            ]
        },
    ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_CAMERAS}",
            "blocks": [
                'sensors_rpi_camera_takePicture',
                'sensors_rpi_camera_takeVideo',
                'sensors_rpi_camera_changeSize',
                'sensors_usb_camera_takePicture',
                'sensors_usb_camera_takeVideo',
                'sensors_usb_camera_changeSize',
                'sensors_cv2_camera_savePicture',
                'sensors_camera_showPictureInVittascience-img',
                'sensors_camera_showPictureInVittascience-filename',
                'sensors_camera_showVideoInVittascience'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSEHAT_SENSORS}",
            "blocks": [
                'sensehat_getSenseHatHumidity',
                'sensehat_getSenseHatTemperature',
                'sensehat_getTemperatureFrom',
                'sensehat_getSenseHatPressure',
                'sensehat_set_imu_config',
                'sensehat_imu_get_orientation',
                'sensehat_imu_get_compass',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSEHAT_JOYSTICK}",
            "blocks": [
                'sensehat_wait_for_event',
                'sensehat_get_event_action_direction',
                'sensehat_get_event_joystick',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_PINS}",
            "blocks": [
                'io_digital_signal',
                'io_readDigitalPin',
                'io_writeDigitalPin',
                'io_writePwm',
                'io_setPwm',
                'io_stopPwm'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_GAS}",
            "blocks": [
                'sensors_getSgp30Gas',
                'sensors_SCD30_readData',
                //'sensors_getParticulateMatter'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_CLIMATE}",
            "blocks": [
                'sensors_getBmp280Data',
                'sensors_DHT11ReadData',
                'sensors_DHT22ReadData',
                'sensors_SHT31readData',
                'sensors_DS18B20_getTemperature',
                'sensors_getRainGauge',
                'sensors_getAnemometer'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_SOUNDLIGHT}",
            "blocks": [
                'sensors_getSunlightData',
                'sensors_colorSensorV2_getData'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
            "blocks": [
                'sensors_getGroveUltrasonicRanger',
                'sensors_getGesture',
                'sensors_onGestureTypeDetected',
                'sensors_getGroveLineFinder',
                'sensors_getGroveMotion',
                'sensors_getGroveTilt',
                'sensors_getPiezoVibration'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}",
            "blocks": [
                'io_getGroveButton',
                'io_getGroveSwitch',
                'io_getMagneticSwitch',
                'io_getGroveTactile',
                'io_getGroveColoredButton',
                'io_setGroveColoredButton'
            ]
        },
    ],
    "actuators": [
        {
            "label": "%{BKY_SUBCATEGORY_MOTORS}",
            "blocks": [
                'actuators_setServoAngle',
                'actuators_continuousServo_setSpeed',
                'actuators_setMotorPower',
                'actuators_setVibrationMotorState',
                'actuators_setGroveRelayState'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MOSFET}",
            "blocks": [
                'actuators_mosfet_setState',
                'actuators_mosfet_setPercentValue',
                'actuators_mosfet_setFrequency'
            ]
        }
    ],
    "robots": [
        {
            "label": "Yahboom G1 Tank - " + "%{BKY_SUBCATEGORY_CONTROL}",
            "blocks": [
                'robots_yahboom_g1tank_setLedColor',
                'robots_yahboom_g1tank_setLedColor_RGB',
                'robots_yahboom_g1tank_setLedColor_Palette',
                'robots_yahboom_g1tank_setLEDServoAngle'
            ]
        },
        {
            "label": "Yahboom G1 Tank - " + "%{BKY_SUBCATEGORY_DETECTION}",
            "blocks": [
                'robots_yahboom_g1tank_getUltrasonicRanger',
                'robots_yahboom_g1tank_getLineFinderState',
                'robots_yahboom_g1tank_waitKEY'
            ]
        },
        {
            "label": "Yahboom G1 Tank - " + "%{BKY_SUBCATEGORY_MOVING}",
            "blocks": [
                'robots_yahboom_g1tank_setGo',
                'robots_yahboom_g1tank_stop',
                'robots_yahboom_g1tank_turn',
                'robots_yahboom_g1tank_spin',
                'robots_yahboom_g1tank_controlMotors'
            ]
        },
        {
            "label": "Yahboom G1 Tank - " + "%{BKY_SUBCATEGORY_CAMERA}",
            "blocks": [
                'robots_yahboom_g1tank_setCameraPanAngle',
                'robots_yahboom_g1tank_setCameraTiltAngle'
            ]
        },
        {
            'label': "%{BKY_MESSAGE_ROBOTS_USB_CAMERA}",
            'message': true
        }
    ],
    "math": [{
        "blocks": [
            'math_number',
            'math_arithmetic-add',
            'math_arithmetic-minus',
            'math_arithmetic-multiply',
            'math_arithmetic-divide',
            'logic_compare-gte',
            'logic_compare-lte',
            'logic_compare-eq',
            'logic_operation-and',
            'logic_operation-or',
            'logic_negate',
            'logic_boolean',
            'logic_null',
            'math_random_int',
            'math_single',
            'math_trig',
            'math_constant',
            'math_number_property',
            'math_map',
            'math_round',
            'math_round_ndigits',
            'math_modulo',
            'math_constrain',
            'math_random_float',
            'math_atan2'
        ]
    }
    ],
    "text": [
        {
            "blocks": [
                'text_comment',
                'text',
                'text_join',
                'text_newline',
                'text_append',
                'text_split',
                'text_length',
                'text_isEmpty',
                'text_includesSubstr',
                'text_indexOf',
                'text_charAt',
                'text_getSubstring',
                'text_count_characters',
                'text_changeCase',
                'text_trim',
                'text_count',
                'text_replace',
                'text_reverse',
                'text_random_string'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ENCRYPTION}",
            "blocks": [
                'text_caesar_cipher',
                'text_caesar_cipher_brute_force'
            ],
        }
    ],
    "variables": "customized",
    "lists": [{
        "blocks": [
            'lists_create_with-0',
            'lists_create_with',
            'lists_repeat',
            'lists_length',
            'lists_isEmpty',
            'math_on_list',
            'lists_reverse',
            'lists_shuffle',
            'lists_indexOf',
            'lists_getIndex',
            'lists_append',
            'lists_setIndex',
            'lists_getSublist',
            'lists_split',
            'lists_sort'
        ]
    }
    ],
    "procedures": "customized",
    "exception": [{
        "blocks": [
            'exception_raise',
            'exception_exception',
            'exception_type',
            'exception_try'
        ]
    }]
};

const TOOLBOX_SCRATCH_CONTENT_SIMPLE = TOOLBOX_SCRATCH_CONTENT;
