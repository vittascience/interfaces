const TOOLBOX_SCRATCH_CATEGORIES = [
    {
        'kind': 'category',
        'toolboxitemid': 'display',
        'name': '%{BKY_CATEGORY_APPEARANCE}',
        'style': 'display_category',
        'cssConfig': {
            'icon': 'icon_blockly svgIcon'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'sound',
        'name': '%{BKY_CATEGORY_SOUND}',
        'style': 'sound_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-music'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'control',
        'name': '%{BKY_CATEGORY_CONTROL}',
        'style': 'control_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-code-branch'
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
        'toolboxitemid': 'robots',
        'name': '%{BKY_CATEGORY_ROBOTS}',
        'style': 'robots_category',
        'cssConfig': {
            'icon': 'icon_blockly fas fa-robot'
        },
        'contents': []
    },
    {
        'kind': 'category',
        'toolboxitemid': 'math',
        'name': '%{BKY_CATEGORY_OPERATORS}',
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

const TOOLBOX_SCRATCH_CONTENT = {
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
    'sound': [
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
        },
        {
            'label': '%{BKY_SUBCATEGORY_COMPUTER}',
            'blocks': [
                'communication_playComputerMusic',
                'communication_playComputerFrequency',
                'communication_stopComputerMusic',
            ]
        }
    ],
    'control': [
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            'blocks': [
                'io_wait',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_LOOPS}',
            'blocks': [
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
                'controls_flow_statements'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_LOGIC}',
            'blocks': [
                'controls_if',
                'controls_if-else',
                'logic_ternary'
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
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_DATA_LOGGING}',
            'blocks': [
                'communication_writeOpenLogSd',
                'communication_SDWriteDataSPI',
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
                'communication_onRemoteCommandReceived',
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_TRACKING_MODULES}',
            'blocks': [
                'communication_rfid_getCardID',
                'communication_onGPSDataReceived',
                'communication_clockRTC_setDate',
                'communication_clockRTC_setHour',
                'communication_clockRTC_readTime',
            ]
        }
    ],
    'sensors': [
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
                'io_writeDigitalPin',
                'io_readAnalogPin',
                'io_writeAnalogPin',
                'io_setPwm',
                'io_readPulseIn',
                'io_attachInterrupt',
            ]
        },
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
                'sensors_getPiezoVibration',
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
    'robots': [
        {
            'label': '%{BKY_SUBCATEGORY_MOTORS}',
            'blocks': [
                'actuators_setServoAngle',
                'actuators_continuousServo_setSpeed',
                'actuators_servo_detach',
                'actuators_DCMotor_setSpeed',
                'actuators_DCMotor_stop',
                'actuators_stepperMotor_run',
                'actuators_MiniDriver_DCMotor_drive',
                'actuators_MiniDriver_DCMotor_stop',
                'actuators_MC33926MotorShield_setSpeed',
                'actuators_MC33926MotorShield_getCurrent',
                'actuators_setVibrationMotorState',
                'actuators_setGroveRelayState',
                'actuators_mosfet_setState',
                'actuators_mosfet_setPercentValue'
            ]
        },
        {
            'label': '%{BKY_SUBCATEGORY_ACTUATORS_OTHER}',
            'blocks': [
                'actuators_setWaterAtomizerState',
                'actuators_setElectromagnetState'
            ]
        },
        {
            'label': 'Pour programmer le robot mBot, veuillez passer sur la nouvelle interface pour mBot dans la rubrique \'Programmer\'',
            'message': true
        }
    ],
    'math': [
        {
            'blocks': [
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
                'math_random_float',
                'math_map',
                'math_round',
                'math_constant',
                'math_single',
                'math_modulo',
                'math_constrain',
                'math_trig',
                'math_atan2',
                'math_number_property',
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
                'lists_create_with-0',
                'lists_create_with',
                'lists_repeat',
                'lists_length',
                'lists_getIndex',
            ]
        }
    ],
    'procedures': 'customized',
};

const TOOLBOX_SCRATCH_CONTENT_SIMPLE = TOOLBOX_SCRATCH_CONTENT;
