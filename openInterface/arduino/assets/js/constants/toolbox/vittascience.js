const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        'kind': 'category',
        'toolboxitemid': 'display',
        'name': '%{BKY_CATEGORY_DISPLAY}',
        'style': 'display_category',
        'cssConfig': {
            'icon': 'icon_blockly svgIcon'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'io',
        'name': '%{BKY_CATEGORY_IO}',
        'style': 'io_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-exchange-alt'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'communication',
        'name': '%{BKY_CATEGORY_COMMUNICATION}',
        'style': 'communication_category',
        'cssConfig': {
            'icon': 'icon_blockly far fa-comment-dots'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'sensors',
        'name': '%{BKY_CATEGORY_SENSORS}',
        'style': 'sensors_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-plug'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'actuators',
        'name': '%{BKY_CATEGORY_ACTUATORS}',
        'style': 'actuators_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-fan'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'robots',
        'name': '%{BKY_CATEGORY_ROBOTS}',
        'style': 'robots_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-robot'
        },
        'contents': []
    },
    {
        "kind": "category",
        "toolboxitemid": "vittaia",
        "name": "%{BKY_CATEGORY_VITTAIA}",
        "style": "vittaia_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-brain"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "cameras",
        "name": "%{BKY_CATEGORY_AI_CAMERAS}",
        "style": "cameras_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-camera"
        },
        "contents": []
    },
    {
        'kind': 'sep',
        'id': 'sep1',
    },
    {
        'kind': 'category',
        'toolboxitemid': 'logic',
        'name': '%{BKY_CATEGORY_LOGIC}',
        'style': 'logic_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-code-branch'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'loops',
        'name': '%{BKY_CATEGORY_LOOPS}',
        'style': 'loops_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-redo-alt'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'math',
        'name': '%{BKY_CATEGORY_MATH}',
        'style': 'math_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-calculator'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'text',
        'name': '%{BKY_CATEGORY_TEXT}',
        'style': 'text_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-font'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'variables',
        'name': '%{BKY_CATEGORY_VARIABLES}',
        'custom': 'VARIABLE',
        'style': 'variable_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-cog'
        }
    },
    {
        'kind': 'category',
        'toolboxitemid': 'lists',
        'name': '%{BKY_CATEGORY_LISTS}',
        'style': 'list_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-list'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'procedures',
        'name': '%{BKY_CATEGORY_PROCEDURES}',
        'custom': 'PROCEDURE',
        'style': 'procedure_category',
        'cssConfig': {
            'icon': 'icon_blockly svgIcon'
        }
    }
];

const TOOLBOX_VITTASCIENCE_CONTENT = {
    'display': [
        {
            'label': 'Arduino',
            'blocks': [
                'io_control_arduino_led',
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_DISPLAYS_LCD}',
            'blocks': [
                'display_lcdRGBSetText',
                'display_lcdRGBClear',
                'display_setDisplay',
                'display_lcdRGBSetColor',
                'display_lcdRGBSetPaletteColor'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_NEOPIXEL}',
            'blocks': [
                'display_defineNeopixel',
                'display_controlNeopixelLed',
                'display_controlColorNeopixelLed',
                'display_neopixel_controlAllLedRGB',
                'display_neopixel_controlAllLedPalette',
                'display_rainbowNeopixel'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_DISPLAYS_OLED}',
            'blocks': [
                'display_addOledText',
                'display_oledScreen_drawIcon',
                'display_oledScreen_drawBitmapLogo',
                'display_clearOledScreen'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_LED}',
            'blocks': [
                'display_setGroveSocketLed',
                'display_setLEDintensity',
                'display_setVariableColorLED',
                'display_setNumberGrove4Digit',
                'display_setClockGrove4Digit',
                "display_setTemperatureGrove4Digit",
                'display_setLevelLedBar',
                "display_setGreenToRedLedBar",
                "display_setLedLedBar"
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_CHAINABLE_LED_RGB}',
            'blocks': [
                'display_defineChainableRGBLed',
                'display_setColorChainableRGBLed',
                'display_setPaletteColorChainableRGBLed',
                'display_setColorAllChainableRGBLed',
                'display_setPaletteAllChainableRGBLed'
            ]
        }
    ],
    'io': [
        {
            'label': '%{BKY_SUBCATEGORY_ARDUINO}',
            'blocks': [
                'io_wait',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}',
            'blocks': [
                'io_getGroveButton',
                'io_getGroveSwitch',
                'io_getGroveTactile',
                'io_getGroveRotaryAngle',
                'io_getGroveSlidePotentiometer',
                'io_getKeypadNumber',
                'io_getGroveThumbJoystick',
                'io_groveMp3_init',
                'io_groveMp3_play_pause',
                'io_groveMp3_next',
                'io_groveMp3_playSDSong',
                'io_groveMp3_playSDDirectorySong',
                'io_groveMp3_getVolume',
                'io_groveMp3_setVolume'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_PINS}',
            'blocks': [
                'io_digital_signal',
                'io_readDigitalPin',
                'io_readDigitalPin_input',
                'io_writeDigitalPin',
                'io_writeDigitalPin_input',
                'io_readAnalogPin',
                'io_readAnalogPin_input',
                'io_writeAnalogPin',
                'io_writeAnalogPin_input',
                'io_setPwm',
                'io_readPulseIn',
                'io_attachInterrupt'
            ]
        }
    ],
    'communication': [
        {
            'label': '%{BKY_SUBCATEGORY_SERIAL_CONNECTION}',
            'blocks': [
                'communication_serialWrite',
                'communication_onSerialDataReceived',
                'communication_graphSerialWrite',
                'communication_playComputerMusic',
                'communication_playComputerFrequency',
                'communication_stopComputerMusic'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_DATA_LOGGING}',
            'blocks': [
                'communication_writeOpenLogSd',
                'communication_SDWriteDataSPI'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_WIRELESS_COMMUNICATION}',
            'blocks': [
                'communication_setSerialBluetooth',
                'communication_sendSerialBluetoothData',
                'communication_onSerialBluetoothDataReceived',
                'communication_hm10_sendBluetoothData',
                'communication_hm10_onBluetoothDataReceived',
                'communication_sendRadioNRF24Data',
                'communication_onRadioNRF24_dataReceived',
                'communication_sendRadio433mhzData',
                'communication_onRadio433mhzDataReceived',
                'communication_onIRDataReceived',
                'communication_onRemoteCommandReceived'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_TRACKING_MODULES}',
            'blocks': [
                'communication_rfid_getCardID',
                'communication_onGPSDataReceived',
                'communication_clockRTC_setDate',
                'communication_clockRTC_setHour',
                'communication_clockRTC_readTime'
            ]
        }
    ],
    'sensors': [
        {
            'label': '%{BKY_SUBCATEGORY_SENSORS_GAS}',
            'blocks': [
                'sensors_getSgp30Gas',
                'sensors_getMultichannelGas',
                'sensors_getMultichannelGasV2',
                'sensors_getO2gas',
                'sensors_SCD30_readData',
                'sensors_SCD30_forcedCalibration',
                'sensors_getMq135gas',
                'sensors_getAirQualityValue',
                'sensors_onAirQualityIndexAs',
                'sensors_getDustConcentration',
                'sensors_getParticulateMatter',
                'sensors_getMhz19Data'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_SENSORS_CLIMATE}',
            'blocks': [
                'sensors_getBmp280Data',
                'sensors_getDps310Data',
                'sensors_getGroveMoisture',
                'sensors_getGroveTemperature',
                'sensors_getGroveHighTemperature',
                'sensors_ds18b20_getTemperature',
                'sensors_getMax6675Temp',
                'sensors_dhtReadData',
                'sensors_TH02readData',
                'sensors_SHT31readData',
                'sensors_mpx5700ap_getPressure',
                'sensors_getBme680Data',
                'sensors_getGroveWaterAmount',
                'sensors_getGroveWaterAmountI2C',
                'sensors_getRainGauge',
                'sensors_getAnemometer'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_SENSORS_SOUNDLIGHT}',
            'blocks': [
                'sensors_getGroveLight',
                'sensors_getSi1145Light',
                'sensors_getUVindex',
                'sensors_colorSensor_getData',
                'sensors_colorSensor_onColorDetected',
                'sensors_cameraTakePicture',
                'sensors_getGroveSound'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}',
            'blocks': [
                'sensors_getGroveUltrasonicRanger',
                'sensors_getGesture',
                'sensors_onGestureTypeDetected',
                'sensors_getGroveLineFinder',
                'sensors_getGroveTilt',
                'sensors_getGroveMotion',
                'sensors_getPiezoVibration'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_SENSORS_OTHER}',
            'blocks': [
                'sensors_getIna219Data',
                'sensors_getVoltageDividerData',
                'sensors_getFsr402Force',
                'sensors_getPulse',
                'sensors_getPulseBpm'
            ]
        }
    ],
    'actuators': [
        {
            'label': '%{BKY_SUBCATEGORY_SERVOMOTORS}',
            'blocks': [
                'actuators_setServoAngle',
                'actuators_continuousServo_setSpeed',
                'actuators_servo_detach'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_I2C_MOTOR_DRIVER}',
            'blocks': [
                'actuators_DCMotor_setSpeed',
                'actuators_DCMotor_stop',
                'actuators_stepperMotor_run',
                'actuators_DCMotor_setSpeed',
                'actuators_DCMotor_stop'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_MINI_I2C_MOTOR_DRIVER}',
            'blocks': [
                'actuators_MiniDriver_DCMotor_drive',
                'actuators_MiniDriver_DCMotor_stop'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_ARDUINO_SHILED_MOTOR}',
            'blocks': [
                'actuators_MC33926MotorShield_setSpeed',
                'actuators_MC33926MotorShield_getCurrent'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_MOSFET}',
            'blocks': [
                'actuators_mosfet_setState',
                'actuators_mosfet_setPercentValue'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_ACTUATORS_OTHER}',
            'blocks': [
                'actuators_setGroveRelayState',
                'actuators_setVibrationMotorState',
                'actuators_setWaterAtomizerState',
                'actuators_setElectromagnetState'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_MUSIC}',
            'blocks': [
                'actuators_controlGroveBuzzerState',
                'actuators_playNoteGroveBuzzer',
                'actuators_playNoteDurationGroveBuzzer',
                'actuators_tone',
                'actuators_toneDuration',
                'actuators_noTone',
                'actuators_playMusicGroveBuzzer'
            ]
        }
    ],
    'robots': [
        {
            'label': 'Pour programmer le robot mBot, veuillez passer sur la nouvelle interface pour mBot dans la rubrique \'Programmer\'',
            'message': true
        }
    ],
    "vittaia": [
        {
            "label": "%{BKY_SUBCATEGORY_VITTAIA_MICROCONTROLLER}",
            "blocks": [
                // 'vittaia_load_model',
                'vittaia_load_local_model',
                'vittaia_load_cloud_model',
                'vittaia_make_prediction',
                'vittaia_get_highest_probability_class',
                'vittaia_detect_class',
            ]
        },
    ],
    "cameras": [
        {
            "label": "Wio Lite AI",
            "blocks": [
                'wio_get_class_data_by_id',
                'wio_get_class_max_id',
                'wio_get_status',
                'wio_get_class_data'
            ]
        }
    ],
    'logic': [
        {
            'blocks': [
                'controls_if',
                'controls_if-else',
                'logic_compare-eq',
                'logic_operation-and',
                'logic_negate',
                'logic_boolean',
                'logic_null',
                'logic_ternary'
            ]
        }
    ],
    'loops': [
        {
            'blocks': [
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
                'controls_flow_statements'
            ]
        }
    ],
    'math': [
        {
            'blocks': [
                'math_number',
                'math_arithmetic-add',
                'math_single',
                'math_trig',
                'math_constant',
                'math_number_property',
                'math_map',
                'math_round',
                'math_modulo',
                'math_constrain',
                'math_random_int',
                'math_random_float',
                'math_atan2'
            ]
        }
    ],
    'text': [
        {
            'blocks': [
                'text_comment',
                'text',
                'text_join',
                'text_append',
                'text_length',
                'text_isEmpty',
                'text_changeCase',
            ]
        }
    ],
    'variables': 'customized',
    'lists': [
        {
            'blocks': [
                'lists_create_with',
                'lists_repeat',
                'lists_length',
                'lists_getIndex',
            ]
        }
    ],
    'procedures': 'customized'
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;