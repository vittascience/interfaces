const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "basic",
        "name": "%{BKY_CATEGORY_BASIC}",
        "style": "basic_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-cube"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "cpp",
        "name": "Arduino",
        "style": "cpp_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "python",
        "name": "Python",
        "style": "python_category",
        "cssConfig": {
            "icon": "icon_blockly fa-brands fa-python"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "html",
        "name": "HTML",
        "style": "html_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-code"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "style",
        "name": "Style",
        "name": "%{BKY_CATEGORY_STYLE}",
        "style": "style_category",
        "cssConfig": {
            "icon": "icon_blockly fa-solid fa-sheet-plastic"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "javascript",
        "name": "Javascript",
        "style": "javascript_category",
        "cssConfig": {
            "icon": "icon_blockly fa-brands fa-js"
        },
        "contents": []
    }
];


const TOOLBOX_VITTASCIENCE_SUBCATEGORIES = {
    "basic": [
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
            'style': 'lists_category',
            'cssConfig': {
                'icon': 'icon_blockly fas fa-list'
            },
            'contents': []
        },
    ],
    "cpp": [
        {
            'kind': 'category',
            'toolboxitemid': 'cpp_display',
            'name': '%{BKY_CATEGORY_DISPLAY}',
            'style': 'cpp_display_category',
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
            'contents': [],
            "onlyBoards": "uno"
        },
        {
            "kind": "category",
            "toolboxitemid": "ia",
            "name": "%{BKY_CATEGORY_IA_CAMERAS}",
            "style": "ia_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-brain"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "cpp_bridges",
            "name": "%{BKY_CATEGORY_BRIDGES}",
            "style": "bridges_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-bridge"
            },
            "contents": []
        },
        {
            'kind': 'category',
            'toolboxitemid': 'cpp_procedures',
            'name': '%{BKY_CATEGORY_PROCEDURES}',
            'custom': 'PROCEDURE_CPP',
            'style': 'cpp_category',
            'cssConfig': {
                'icon': 'icon_blockly svgIcon'
            },
            "contents": []
        }
    ],
    "python": [
        {
            "kind": "category",
            "toolboxitemid": "py_display",
            "name": "%{BKY_CATEGORY_DISPLAY}",
            "style": "py_display_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-desktop"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "graph",
            "name": "%{BKY_CATEGORY_GRAPHICS}",
            "style": "graph_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-chart-line"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "numpy",
            "name": "%{BKY_CATEGORY_NUMPY}",
            "style": "numpy_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-table"
            },
            "contents": []
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
            "toolboxitemid": "bricks",
            "name": "%{BKY_CATEGORY_BRICKS}",
            "style": "bricks_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-cubes"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "py_bridges",
            "name": "%{BKY_CATEGORY_BRIDGES}",
            "style": "bridges_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-bridge"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "dictionaries",
            "name": "%{BKY_CATEGORY_DICTIONARIES}",
            "style": "dictionaries_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-book"
            },
            "contents": []
        },
        {
            'kind': 'category',
            'toolboxitemid': 'py_procedures',
            'name': '%{BKY_CATEGORY_PROCEDURES}',
            'custom': 'PROCEDURE_PY',
            'style': 'python_category',
            'cssConfig': {
                'icon': 'icon_blockly svgIcon'
            }
        },
        {
            'kind': 'category',
            'toolboxitemid': 'exception',
            'name': '%{BKY_CATEGORY_EXCEPTION}',
            'style': 'exception_category',
            'cssConfig': {
                'icon': 'icon_blockly fa fa-circle-exclamation'
            },
            "contents": []
        }
    ],
    "html": [
        {
            "kind": "category",
            "toolboxitemid": "html_structure",
            "name": "%{BKY_HTML_CATEGORY_STRUCTURE}",
            "style": "html_structure_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_attributes",
            "name": "%{BKY_HTML_CATEGORY_ATTRIBUTES}",
            "style": "html_attributes_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_text",
            "name": "%{BKY_HTML_CATEGORY_TEXTS}",
            "style": "html_text_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_tables",
            "name": "%{BKY_HTML_CATEGORY_TABLES}",
            "style": "html_tables_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_lists",
            "name": "%{BKY_HTML_CATEGORY_LISTS}",
            "style": "html_lists_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_forms",
            "name": "%{BKY_HTML_CATEGORY_FORMS}",
            "style": "html_forms_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "html_medias",
            "name": "%{BKY_HTML_CATEGORY_MEDIAS}",
            "style": "html_medias_category",
            "contents": []
        }
    ],
    "style": [
        {
            "kind": "category",
            "toolboxitemid": "css_structure",
            "name": "%{BKY_CSS_CATEGORY_STRUCTURE}",
            "style": "html_structure_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_text",
            "name": "%{BKY_CSS_CATEGORY_TEXTS}",
            "style": "html_text_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_display",
            "name": "%{BKY_CSS_CATEGORY_DISPLAY}",
            "style": "css_display_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_dimensions",
            "name": "%{BKY_CSS_CATEGORY_DIMENSIONS}",
            "style": "css_dimensions_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_colors",
            "name": "%{BKY_CSS_CATEGORY_COLORS}",
            "style": "css_colors_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_backgrounds",
            "name": "%{BKY_CSS_CATEGORY_BACKGROUNDS}",
            "style": "css_backgrounds_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_borders",
            "name": "%{BKY_CSS_CATEGORY_BORDERS}",
            "style": "css_borders_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_miscellaneous",
            "name": "%{BKY_CSS_CATEGORY_MISCELLANOUS}",
            "style": "css_miscellaneous_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "css_transitions",
            "name": "%{BKY_CSS_CATEGORY_TRANSITIONS}",
            "style": "css_transitions_category",
            "contents": []
        }
    ],
    "javascript": [
        {
            "kind": "category",
            "toolboxitemid": "js_loops",
            "name": "%{BKY_JS_CATEGORY_LOOPS}",
            "style": "js_loops_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_math",
            "name": "%{BKY_JS_CATEGORY_MATH}",
            "style": "js_math_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_colors",
            "name": "%{BKY_JS_CATEGORY_COLORS}",
            "style": "css_colors_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_dom",
            "name": "%{BKY_JS_CATEGORY_DOM}",
            "style": "js_dom_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_socket",
            "name": "%{BKY_JS_CATEGORY_SOCKET}",
            "style": "js_socket_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_variables",
            "name": "%{BKY_JS_CATEGORY_VARIABLES}",
            "style": "js_variables_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_functions",
            "name": "%{BKY_JS_CATEGORY_FUNCTIONS}",
            "style": "js_functions_category",
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "js_advancedjs",
            "name": "%{BKY_JS_CATEGORY_ADVANCEDJS}",
            "style": "js_advancedjs_category",
            "contents": []
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT = {
    "basic": [
        {
            "subCategoryId": 'logic',
            "contents": [
                {
                    "blocks": [
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
            ]
        },
        {
            "subCategoryId": 'loops',
            "contents": [
                {
                    "blocks": [
                        'controls_repeat',
                        'controls_whileUntil',
                        'controls_for',
                        'controls_flow_statements'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'math',
            "contents": [
                {
                    "blocks": [
                        'math_number',
                        'math_arithmetic-add',
                        'math_single',
                        'math_trig',
                        'math_constant',
                        'math_number_property',
                        'math_map',
                        'math_round',
                        'math_modulo',
                        'math_round_ndigits',
                        'math_constrain',
                        'math_random_int',
                        'math_random_float',
                        'math_atan2'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'text',
            "contents": [
                {
                    "blocks": [
                        'text_comment',
                        'text',
                        'text_join',
                        'text_newline',
                        'text_append',
                        'text_length',
                        'text_isEmpty',
                        'text_includesSubstr',
                        'text_indexOf',
                        'text_charAt',
                        'text_getSubstring',
                        'text_count_characters',
                        'text_trim',
                        'text_changeCase',
                        'text_count',
                        'text_reverse',
                        'text_replace',
                        'text_random_string',
                        'bi_string_return'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'variables',
            "contents": 'customized'
        },
        {
            "subCategoryId": 'lists',
            "contents": [
                {
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
                        'lists_sort',
                        'bi_index'
                    ]
                }
            ]
        }
    ],
    "cpp": [
        {
            "subCategoryId": 'cpp_display',
            "contents": [
                {
                    'label': 'Arduino',
                    "blocks": [
                        'io_control_arduino_led',
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_BUILTIN_LED_MATRIX}",
                    "blocks": [
                        'display_builtinMatrix_drawBitmap',
                        'display_builtinMatrix_drawString',
                        'display_builtinMatrix_showNumber',
                        'display_builtinMatrix_setPixel',
                        'display_builtinMatrix_clearScreen'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_DISPLAYS_LCD}',
                    "blocks": [
                        'display_lcdRGBSetText',
                        'display_lcdRGBClear',
                        'display_setDisplay',
                        'display_lcdRGBSetColor',
                        'display_lcdRGBSetPaletteColor'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_NEOPIXEL}',
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
                    'label': '%{BKY_SUBCATEGORY_DISPLAYS_OLED}',
                    "blocks": [
                        'display_addOledText',
                        'display_oledScreen_drawIcon',
                        'display_oledScreen_drawBitmapLogo',
                        'display_clearOledScreen'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_LED}',
                    "blocks": [
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
                    "blocks": [
                        'display_defineChainableRGBLed',
                        'display_setColorChainableRGBLed',
                        'display_setPaletteColorChainableRGBLed',
                        'display_setColorAllChainableRGBLed',
                        'display_setPaletteAllChainableRGBLed'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'io',
            "contents": [
                {
                    'label': '%{BKY_SUBCATEGORY_TIME}',
                    "blocks": [
                        'io_wait',
                        'io_waitUntil',
                        'io_initChronometer',
                        'io_getChronometer'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}',
                    "blocks": [
                        'io_getGroveButton',
                        'io_getReversedButton',
                        'io_getGroveSwitch',
                        'io_getGroveTactile',
                        'io_getGroveRotaryAngle',
                        'io_getGroveSlidePotentiometer',
                        'io_getGroveEncoderValue',
                        'io_getKeypadNumber',
                        'io_getGroveThumbJoystick'
                    ]
                },
                {
                    'label': 'MP3',
                    'blocks': [
                        'io_groveMp3_init',
                        'io_groveMp3_play_pause',
                        'io_groveMp3_next',
                        'io_groveMp3_playSDSong',
                        'io_groveMp3_playSDDirectorySong',
                        'io_groveMp3_KT403A_playSongSpecify',
                        'io_groveMp3_getVolume',
                        'io_groveMp3_setVolume',
                        'io_groveMp3_changePlayingMode'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_PINS}',
                    "blocks": [
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
                        'io_attachInterrupt',
                        'io_detachInterrupt',
                        'io_setPinMode'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'communication',
            "contents": [
                {
                    'label': '%{BKY_SUBCATEGORY_SERIAL_CONNECTION}',
                    "blocks": [
                        'communication_serialWrite',
                        'communication_NumberSerialWrite',
                        'communication_onSerialDataReceived',
                        'communication_graphSerialWrite',
                        'communication_playComputerMusic',
                        'communication_playComputerFrequency',
                        'communication_stopComputerMusic'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_DATA_LOGGING}',
                    "blocks": [
                        'communication_writeOpenLogSd',
                        'communication_SDWriteDataSPI'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_EXTERNAL_BLUETOOTH}',
                    'blocks': [
                        'communication_groveSerialBluetooth_setATCommand',
                        'communication_groveSerialBluetooth_getATCommand',
                        'communication_sendSerialBluetoothData',
                        'communication_onSerialBluetoothDataReceived',
                        'communication_hc05_setATCommand',
                        'communication_hc05_getATCommand',
                        'communication_hc05_changeBaudrateTransmission',
                        'communication_hc05_sendBluetoothData',
                        'communication_hc05_onBluetoothDataReceived',
                        'communication_hm10_setATCommand',
                        'communication_hm10_getATCommand',
                        'communication_hm10_sendBluetoothData',
                        'communication_hm10_onBluetoothDataReceived'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_WIRELESS_COMMUNICATION}',
                    'blocks': [
                        'communication_sendRadioNRF24Data',
                        'communication_onRadioNRF24_dataReceived',
                        'communication_sendRadio433mhzData',
                        'communication_onRadio433mhzDataReceived'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_IR_COMMUNICATION}',
                    'blocks': [
                        'communication_ir_sendNECCommand',
                        'communication_ir_sendFrame',
                        'communication_onIRDataReceived',
                        'communication_ir_getProtocoleParam',
                        'communication_onRemoteCommandReceived',
                        'communication_onRemoteCommandReceived_car_mp3_gray'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_TRACKING_MODULES}',
                    "blocks": [
                        'communication_rfid_getCardID',
                        'communication_onGPSDataReceived',
                        'communication_clockRTC_setDate',
                        'communication_clockRTC_setHour',
                        'communication_clockRTC_readTime'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'sensors',
            "contents": [
                {
                    'label': '%{BKY_SUBCATEGORY_SENSORS_GAS}',
                    "blocks": [
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
                    "blocks": [
                        'sensors_getBmp280Data',
                        'sensors_bme280_getData',
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
                    "blocks": [
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
                    "blocks": [
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
                    'label': '%{BKY_SUBCATEGORY_SENSORS_HEALTH}',
                    "blocks": [
                        'sensors_getPulse',
                        'sensors_getPulseBpm',
                        'sensors_mlx90614_readObjectTemperature',
                        'sensors_getEarClipHeartRate',
                        'sensors_dfrobot_max30102_takeMeasure',
                        'sensors_dfrobot_max30102_getData'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_SENSORS_OTHER}',
                    "blocks": [
                        'sensors_getIna219Data',
                        'sensors_getVoltageDividerData',
                        'sensors_getFsr402Force'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'actuators',
            "contents": [
                {
                    'label': '%{BKY_SUBCATEGORY_SERVOMOTORS}',
                    "blocks": [
                        'actuators_setServoAngle',
                        'actuators_continuousServo_setSpeed',
                        'actuators_servo_detach'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_I2C_MOTOR_DRIVER}',
                    "blocks": [
                        'actuators_DCMotor_setSpeed',
                        'actuators_DCMotor_stop',
                        'actuators_stepperMotor_run',
                        'actuators_DCMotor_setSpeed',
                        'actuators_DCMotor_stop'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_MINI_I2C_MOTOR_DRIVER}',
                    "blocks": [
                        'actuators_MiniDriver_DCMotor_drive',
                        'actuators_MiniDriver_DCMotor_stop'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_ARDUINO_SHILED_MOTOR}',
                    "blocks": [
                        'actuators_MC33926MotorShield_setSpeed',
                        'actuators_MC33926MotorShield_getCurrent'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_MOSFET}',
                    "blocks": [
                        'actuators_mosfet_setState',
                        'actuators_mosfet_setPercentValue'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_ACTUATORS_OTHER}',
                    "blocks": [
                        'actuators_setGroveRelayState',
                        'actuators_SPDTRelay_defineNCNO',
                        'actuators_SPDTRelay_controlState',
                        'actuators_setVibrationMotorState',
                        'actuators_setWaterAtomizerState',
                        'actuators_setElectromagnetState'
                    ]
                },
                {
                    'label': '%{BKY_SUBCATEGORY_MUSIC}',
                    "blocks": [
                        'actuators_controlGroveBuzzerState',
                        'actuators_playNoteGroveBuzzer',
                        'actuators_playNoteDurationGroveBuzzer',
                        'actuators_tone',
                        'actuators_toneDuration',
                        'actuators_noTone',
                        'actuators_playMusicGroveBuzzer'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'ia',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_HUSKYLENS}",
                    "blocks": [
                        'cameras_huskylens_setMode',
                        'cameras_huskylens_setText',
                        'cameras_huskylens_clearScreen',
                        'cameras_huskylens_learnID',
                        'cameras_huskylens_customName',
                        'cameras_huskylens_forgetIDs',
                        'cameras_huskylens_getData',
                        'cameras_huskylens_requestBlocksData',
                        'cameras_huskylens_requestArrowsData',
                        'cameras_huskylens_requestBlockXY',
                        'cameras_huskylens_getNumberOfDetectedElements',
                        'cameras_huskylens_getDataByID',
                        'cameras_huskylens_checkID',
                        'cameras_huskylens_getLineDirection',
                        'cameras_huskylens_saveModel',
                        'cameras_huskylens_loadModel'
                    ]
                },
                {
                    "label": "Wio Lite AI",
                    "blocks": [
                        'wio_get_class_data',
                        'wio_get_class_data_by_id',
                        'wio_get_class_max_id',
                        'wio_get_status'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'cpp_bridges',
            "contents": [
                {
                    "blocks": [
                        'bridges_provide',
                        'bridges_call'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'cpp_procedures',
            "contents": 'customized'
        },
    ],
    "python": [
        {
            "subCategoryId": 'py_display',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_CONSOLE}",
                    "blocks": [
                        'display_print',
                        'display_input',
                        'display_input_number'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_TIME}",
                    "blocks": [
                        'time_sleep',
                        'time_time',
                        'time_waitUntil',
                        'time_initChronometer',
                        'time_getChronometer',
                        'time_getDate'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'graph',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_MATPLOTLIB}",
                    "blocks": [
                        'graph_matplotlib_setLabel',
                        'graph_matplotlib_grid',
                        'graph_matplotlib_text',
                        'graph_matplotlib_plot',
                        'graph_matplotlib_scatter',
                        'graph_matplotlib_bar'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'numpy',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_ARRAYS_MATRIX}",
                    "blocks": [
                        'numpy_linspace',
                        'numpy_arange',
                        'numpy_table_with_shape',
                        'numpy_create_table_with',
                        'numpy_square_matrix'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_OPERATIONS}",
                    "blocks": [
                        'numpy_getSizeShape',
                        'numpy_getElement_matrix',
                        'numpy_getElement_list',
                        'numpy_single',
                        'numpy_trig'
                    ]
                }
            ]
        },
        {
            "subCategoryId": "vittaia",
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_VITTAIA_IMAGE}",
                    "blocks": [
                        'vittaia_load_model',
                        'vittaia_load_local_model',
                        'vittaia_load_model_default',
                        'vittaia_make_predictions_webcam',
                        'vittaia_make_predictions_file',
                        'vittaia_make_predictions_from_url',
                        'vittaia_get_highest_probability_class',
                        'vittaia_get_confidence_rate',
                        'vittaia_get_predictions',
                        'vittaia_detect_class',
                        'vittaia_list_webcams',
                        'vittaia_init_webcam'
                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_VITTAIA_POSTURE}",
                    "blocks": [
                        'vittaia_load_posture_model',
                        'vittaia_init_posture_webcam',
                        'vittaia_make_posture_predictions',
                        'vittaia_list_posture_webcams'

                    ]
                },
                {
                    "label": "%{BKY_SUBCATEGORY_VITTAIA_TEXT}",
                    "blocks": [
                        'vittaia_load_discussion',
                        'vittaia_set_randomness',
                        'vittaia_set_model_ia',
                        'vittaia_model_text_predict',
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'py_bridges',
            "contents": [
                {
                    "blocks": [
                        'bridges_provide',
                        'bridges_call'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'bricks',
            "contents": [
                {
                    "blocks": [
                        'bricks_app_run'
                    ]
                },
                {
                    "label": "WebUI",
                    "blocks": [
                        'bricks_webui_send_message',
                        'bricks_webui_on_message'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'dictionaries',
            "contents": [
                {
                    "blocks": [
                        'dictionaries_create_empty',
                        'dictionaries_create_with',
                        'dictionaries_length',
                        'dictionaries_get_item',
                        'dictionaries_update_item',
                        'dictionaries_include',
                        'dictionaries_delete_tuple',
                        'dictionaries_clear',
                        'dictionaries_add_tuple',
                        'dictionaries_loop'
                    ]
                }
            ]
        },
        {
            "subCategoryId": 'py_procedures',
            "contents": 'customized'
        },
        {
            "subCategoryId": 'exception',
            "contents": [
                {
                    "blocks": [
                        'exception_raise',
                        'exception_exception',
                        'exception_type',
                        'exception_try'
                    ]
                }
            ]
        },
    ],
    "html": [
        {
            "subCategoryId": 'html_structure',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_STRUCTURE}",
                "blocks": [
                    "html_page",
                    "head",
                    "meta_unknown",
                    "script_tag",
                    "metaviewport",
                    "title",
                    "body",
                    "headertag",
                    "footertag",
                    "divider",
                    "button",
                    "linebreak",
                    "hline"
                ]
            }]
        },
        {
            "subCategoryId": 'html_attributes',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_ATTRIBUTES}",
                "blocks": [
                    "args",
                    "class",
                    "id",
                    "emptyarg"
                ]
            }]
        },
        {
            "subCategoryId": 'html_text',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_TEXTS}",
                "blocks": [
                    "htmlcomment",
                    "emptytext",
                    "span",
                    "paragraph",
                    "header",
                    "link"
                ]
            }]
        },
        {
            "subCategoryId": 'html_tables',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_TABLES}",
                "blocks": [
                    "table",
                    "emptytable",
                    "tablerow",
                    "tableheading",
                    "tabledata"
                ]
            }]
        },
        {
            "subCategoryId": 'html_lists',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_LISTS}",
                "blocks": [
                    "unorderedlist",
                    "orderedlist",
                    "listitem"
                ]
            }]
        },
        {
            "subCategoryId": 'html_forms',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_FORMS}",
                "blocks": [
                    "form",
                    "input",
                    "label"
                ]
            }]
        },
        {
            "subCategoryId": 'html_medias',
            "contents": [{
                "label": "%{BKY_HTML_CATEGORY_MEDIAS}",
                "blocks": [
                    "image",
                    "audio",
                    "video"
                ]
            }]
        }
    ],
    "style": [
        {
            "subCategoryId": 'css_structure',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_STRUCTURE}",
                "blocks": [
                    "style",
                    "cssitem",
                    "othercss",
                    "cssevents",
                    "cssnot",
                    "csscomment"
                ]
            }]
        },
        {
            "subCategoryId": 'css_text',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_TEXTS}",
                "blocks": [
                    "fontfamily",
                    "fontsize",
                    "fontweight",
                    "colornew",
                    "colordropdown",
                    "textshadownew",
                    "texttransform",
                    "textalign",
                    "letterspacing"
                ]
            }]
        },
        {
            "subCategoryId": 'css_display',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_DISPLAY}",
                "blocks": [
                    "display",
                    "margin",
                    "padding",
                    "overflow",
                    "float",
                    "verticalalign"
                ]
            }]
        },
        {
            "subCategoryId": 'css_dimensions',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_DIMENSIONS}",
                "blocks": [
                    "width",
                    "height"
                ]
            }]
        },
        {
            "subCategoryId": 'css_colors',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_COLORS}",
                "blocks": [
                    "color_picker",
                    "hex_picker",
                    "rgba_picker"
                ]
            }]
        },
        {
            "subCategoryId": 'css_backgrounds',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_BACKGROUNDS}",
                "blocks": [
                    "bgcolornew",
                    "bgimage",
                    "bgposition",
                    "bgrepeat",
                    "bgsize"
                ]
            }]
        },
        {
            "subCategoryId": 'css_borders',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_BORDERS}",
                "blocks": [
                    "bordernew",
                    "borderedge",
                    "bordercol",
                    "borderrad"
                ]
            }]
        },
        {
            "subCategoryId": 'css_miscellaneous',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_MISCELLANOUS}",
                "blocks": [
                    "cursor",
                    "boxshadownew"
                ]
            }]
        },
        {
            "subCategoryId": 'css_transitions',
            "contents": [{
                "label": "%{BKY_CSS_CATEGORY_TRANSITIONS}",
                "blocks": [
                    "transition",
                    "transitiontimingdropdown",
                    "transitiontimingbezier"
                ]
            }]
        }
    ],
    "javascript": [
        {
            "subCategoryId": 'js_loops',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_LOOPS}",
                "blocks": [
                    "bi_throw",
                    "bi_yield",
                    "bi_yield_return"
                ]
            }]
        },
        {
            "subCategoryId": 'js_math',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_MATH}",
                "blocks": [
                    "bi_parenthesis",
                    "bi_unary",
                    "bi_unary_return",
                    "bi_unary_postfix",
                    "bi_unary_postfix_return",
                    "bi_math_arithmetic",
                ]
            }]
        },
        {
            "subCategoryId": 'js_colors',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_COLORS}",
                "blocks": [
                    "colour_picker",
                    "colour_random",
                    "colour_rgb",
                    "colour_blend"
                ]
            }]
        },
        {
            "subCategoryId": 'js_dom',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_DOM}",
                "blocks": [
                    "getelementbyid",
                    "getelementsbyclassname",
                    "getelementsbytagname",
                    "addeventlistener",
                    "addeventlistenerOnLoad",
                    "editattribut"
                ]
            }]
        },
        {
            "subCategoryId": 'js_socket',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_SOCKET}",
                "blocks": [
                    "socket_emit_message",
                    "socket_on_message_receive"
                ]
            }]
        },
        {
            "subCategoryId": 'js_variables',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_VARIABLES}",
                "blocks": [
                    "bi_var",
                    "bi_var_name",
                    "bi_assignment",
                    "bi_assignment_return",
                    "bi_field",
                    "bi_field_return"
                ]
            }]
        },
        {
            "subCategoryId": 'js_functions',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_FUNCTIONS}",
                "blocks": [
                    "bi_function",
                    "bi_call_editable",
                    "bi_call_editable_return",
                    "bi_direct_call_editable",
                    "bi_direct_call_editable_return",
                    "bi_return",
                    "bi_spread"
                ]
            }]
        },
        {
            "subCategoryId": 'js_advancedjs',
            "contents": [{
                "label": "%{BKY_JS_CATEGORY_ADVANCEDJS}",
                "blocks": [
                    "bi_try_catch",
                    "bi_catch",
                    "bi_export",
                    "bi_import",
                    "bi_import_as",
                    "bi_comment"
                ]
            }]
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;