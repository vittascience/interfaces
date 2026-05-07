const TOOLBOX_SCRATCH_CATEGORIES = [
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
        "toolboxitemid": "tello",
        "name": "Tello",
        "style": "tello_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "ia",
        "name": "%{BKY_CATEGORY_VITTAIA}",
        "style": "ia_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-brain"
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

const TOOLBOX_SCRATCH_SUBCATEGORIES = {
    "robots": [
        {
            "kind": "category",
            "toolboxitemid": "motors",
            "name": "%{BKY_SUBCATEGORY_MOTORS}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-cog"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "cutebot",
            "name": "%{BKY_SUBCATEGORY_CUTEBOT}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "cutebotpro",
            "name": "%{BKY_SUBCATEGORY_CUTEBOT_PRO}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "maqueen",
            "name": "%{BKY_SUBCATEGORY_MAQUEEN}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "maqueen-plus",
            "name": "%{BKY_SUBCATEGORY_MAQUEEN_PLUS}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "bitcar",
            "name": "%{BKY_SUBCATEGORY_BITCAR}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "kitrobot",
            "name": "%{BKY_SUBCATEGORY_KITROBOT}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "codo",
            "name": "%{BKY_SUBCATEGORY_CODO}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "oobybot",
            "name": "%{BKY_SUBCATEGORY_OOBYBOT}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "buggy",
            "name": "%{BKY_SUBCATEGORY_BUGGY}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "bitbot",
            "name": "%{BKY_SUBCATEGORY_BITBOT}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "gamepad",
            "name": "%{BKY_SUBCATEGORY_GAMEPAD}",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "uhandbit",
            "name": "uHandbit",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "wukong",
            "name": "WuKong",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "superbit",
            "name": "Building:bit Super",
            "style": "robots_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-robot"
            },
            "contents": []
        }
    ],
    "ia": [
        {
            "kind": "category",
            "toolboxitemid": "vittaia",
            "name": "%{BKY_SUBCATEGORY_SENSOR_DATA}",
            "style": "ia_category",
            "cssConfig": {
                "icon": "icon_blockly svgIcon"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "cameras",
            "name": "%{BKY_SUBCATEGORY_CAMERAS}",
            "style": "ia_category",
            "cssConfig": {
                "icon": "icon_blockly fa-solid fa-camera"
            },
            "contents": []
        }
    ]
};

const TOOLBOX_SCRATCH_CONTENT = {
    "display": [
        {
            "label": "%{BKY_SUBCATEGORY_MICROBIT}",
            "blocks": [
                'show_number',
                'show_number-txt',
                'show_string-num',
                'show_string',
                'show_icon',
                'show_leds',
                'display_show_gauge',
                'display_plot_bar_graph',
                'set_pixel',
                'get_pixelState',
                'toggle_pixelState',
                'set_light_pixel',
                'set_brightness',
                'show_clock',
                'show_arrow',
                'clear'
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
                "display_defineNeopixel",
                "display_controlColorNeopixelLed",
                "display_controlNeopixelLed",
                "display_neopixel_controlAllLedPalette",
                "display_neopixel_controlAllLedRGB",
                "display_rainbowNeopixel"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ZIP_HALO}",
            "blocks": [
                "display_controlColorZipHaloLed",
                "display_controlZipHaloLed",
                "display_ZipHaloLed_controlAllLedPalette",
                "display_ZipHaloLed_controlAllLedRGB",
                "display_ZipHaloLed_rainbow"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_OLED}",
            "blocks": [
                'display_addOledText',
                'display_setOledPixel',
                'display_showOledIcon',
                'display_clearOledScreen',
                'display_morpionNewGame',
                'display_morpionMoveCursor',
                'display_morpionSetPlayerFigure',
                'display_morpionIsEndGame'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_LED}",
            "blocks": [
                "display_setGroveSocketLed",
                "display_setLEDintensity",
                "display_setVariableColorLED",
                "display_setNumberGrove4Digit",
                "display_setClockGrove4Digit",
                "display_setLevelLedBar",
                "display_my9221_reverse",
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_KITRONIK}",
            "blocks": [
                "display_setTrafficLight",
                "display_setLampBitLight",
                "sensors_getLampBitLuminosity"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_LED_MATRIX}",
            "blocks": [
                'display_led_matrix_DrawBitmap',
                'display_led_matrix_clear'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DISPLAYS_RGB_LED_MATRIX}",
            "blocks": [
                'display_rgb_led_matrix_DrawBitmap',
                'display_rgb_led_matrix_stopDisplay'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_GAMES}",
            "blocks": [
                "display_games_createSprite",
                "display_games_deleteSprite",
                "display_games_isSpriteDeleted",
                "display_games_moveSprite",
                "display_games_getSpritePosition",
                "display_games_changeScore",
                "display_games_getScore",
                "display_games_stopGame",
                "display_games_isEndGame",
                "display_games_restartGame",
            ]
        }
    ],
    "sound": [
        {
            "label": "%{BKY_SUBCATEGORY_AUDIO} (V2)",
            "blocks": [
                'microbit_audio_play',
                'microbit_audio_stop'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MUSIC} (V2)",
            "blocks": [
                'actuators_playMusicGroveBuzzer',
                'actuators_music_playSong',
                'actuators_music_playNotes',
                'actuators_music_playFrequency',
                'actuators_music_stop',
                'actuators_music_setVolume',
                'actuators_music_setTempo',
                'actuators_kitronik_playFrequency'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SPEECH} (V2)",
            "blocks": [
                'actuators_speech_saySomething'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MICROPHONE} (V2)",
            "blocks": [
                "io_micro_onSoundDetected",
                "io_micro_getCurrentSound",
                "io_micro_wasSoundDetected",
                "io_micro_getSoundLevel",
                "io_micro_getHistorySounds",
                "io_micro_setSoundThreshold",
                "io_micro_soundCondition"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_COMPUTER}",
            "blocks": [
                'communication_playComputerMusic',
                'communication_playComputerFrequency',
                'communication_stopComputerMusic'
            ]
        }
    ],
    "control": [
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                'io_pause',
                'io_waitUntil',
                'io_runEvery',
                'io_initChronometer',
                'io_getChronometer'
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
        },
        {
            "label": "%{BKY_SUBCATEGORY_EXEC}",
            "blocks": [
                'io_exec'
            ]
        }
    ],
    "communication": [
        {
            "label": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "blocks": [
                'communication_serialWrite',
                'communication_graphSerialWrite',
                'communication_onSerialMessageReceived',
                'communication_onSerialDataReceived'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_INTEGRATED_RADIO}",
            "blocks": [
                'communication_radioSendString',
                'communication_radioSendNumber',
                'communication_radioSendValue',
                'communication_onRadioDataReceived',
                'communication_onRadioNumberReceived',
                'communication_onRadioValueReceived',
                'communication_radioConfig'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_DATA_LOGGING}",
            "blocks": [
                'communication_writeOpenLogSd'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_EXTERNAL_BLUETOOTH}",
            "blocks": [
                'communication_hc05_sendBluetoothData',
                'communication_hc05_onBluetoothDataReceived',
                'communication_HM10_sendBluetoothData',
                'communication_HM10_onBluetoothDataReceived',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TRACKING_MODULES}",
            "blocks": [
                'communication_gps_getNMEA',
                'communication_gps_getGGAInformations',
                // 'communication_onGPSDataReceived',
                // 'communication_analyzeGPSInfo',
                'communication_clockRTC_setDate',
                'communication_clockRTC_setHour',
                'communication_clockRTC_readTime'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_UART}",
            "blocks": [
                'communication_serialInit',
                'communication_serialRedirectUSB',
                'communication_uart_writeData',
                'communication_uart_isDataAvailable',
                'communication_uart_readData'
            ]
        }
    ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_MICROBIT}",
            "blocks": [
                'io_onButtonPressed',
                'io_onPinPressed',
                'io_onMovement',
                'io_isButtonPressed',
                'io_isPinPressed',
                'io_buttons_getPresses',
                "sensors_getLight",
                "sensors_getTemperature",
                "sensors_getAcceleration",
                "sensors_getRotation",
                "sensors_getCompass",
                "sensors_calibrateCompass",
                "sensors_isCompassCalibrated",
                "sensors_getMagneticForce"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}",
            "blocks": [
                "io_getGroveButton",
                "io_getGroveSwitch",
                "io_getGroveTactile",
                "io_getGroveRotaryAngle",
                "io_getGroveSlidePotentiometer",
                "io_getGroveColoredButton",
                "io_setGroveColoredButton",
                "io_getKeypadNumber",
                "io_getGroveThumbJoystick"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_PINS}",
            "blocks": [
                'io_digital_signal',
                'io_readDigitalPin',
                'io_writeDigitalPin',
                'io_readAnalogPin',
                'io_writeAnalogPin',
                'io_setPwm',
                'io_readPulseIn',
                'io_setPull'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_ENVIRO_BIT}",
            "blocks": [
                "sensors_envirobit_tcs3472_getRGB",
                "sensors_envirobit_tcs3472_getBrightness",
                "sensors_envirobit_tcs3472_setLED",
                "sensors_envirobit_bme280_getData",
                "sensors_envirobit_getSoundLevel",
                "sensors_envirobit_waitForClaps"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_WEATHER_BIT}",
            "blocks": [
                "sensors_weatherbit_bme280_getData",
                "sensors_weatherbit_anemometer_getSpeed",
                "sensors_weatherbit_weathercock_getDirection",
                "sensors_weatherbit_rainGauge_getDumps",
                "sensors_weatherbit_getSoilMoisture"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_KITRONIK_ENVIRONMENTAL}",
            "blocks": [
                'sensors_kitronik_bme280_getData',
                'sensors_kitronik_klimate_bme280_getData'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_GAS}",
            "blocks": [
                "sensors_getSgp30Gas",
                "sensors_getMultichannelGas",
                "sensors_getMultichannelGasV2",
                "sensors_getO2gas",
                "sensors_SCD30_readData",
                "sensors_SCD30_forcedCalibration",
                "sensors_getAirQualityValue",
                "sensors_getParticulateMatter"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_CLIMATE}",
            "blocks": [
                "sensors_getBmp280Data",
                "sensors_bme280_getData",
                "sensors_getGroveMoisture",
                "sensors_getGroveCapacitiveMoisture",
                "sensors_getGroveTemperature",
                "sensors_getGroveHighTemperature",
                "sensors_barometerReadData",
                "sensors_dhtReadData",
                "sensors_TH02readData",
                "sensors_SHT31readData",
                "sensors_SHT35readData",
                "sensors_mpx5700ap_getPressure",
                // "sensors_mpx5700ap_calibrate",
                "sensors_getGroveWaterAmount",
                "sensors_getRainGauge",
                "sensors_getAnemometer"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_SOUNDLIGHT}",
            "blocks": [
                "sensors_getGroveLight",
                "sensors_getSunlightData",
                "sensors_getUVindex",
                "sensors_colorSensor_getData",
                "sensors_colorSensorV3_getData",
                "sensors_getGroveSound"
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
            "blocks": [
                "sensors_getGroveUltrasonicRanger",
                "sensors_VL53L0X_getRangeMillimeters",
                "sensors_getGesture",
                "sensors_onGestureTypeDetected",
                "sensors_getGroveLineFinder",
                "sensors_getGroveTilt",
                "sensors_getMiniPirGroveMotion",
                "sensors_getGroveMotion",
                "sensors_getPiezoVibration",
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_OTHER}",
            "blocks": [
                'sensors_getGroveButton',
                'sensors_getEarClipHeartRate',
                'sensors_getEmgDetector',
                'sensors_getFsr402Force',
                'sensors_getWaterLevel'
            ]
        }
    ],
    "robots": [
        {
            "subCategoryId": 'motors',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_MOTORS}",
                "blocks": [
                    'actuators_setServoAngle',
                    'actuators_continuousServo_setSpeed',
                    'actuators_stepperMotor_uln2003driver_init',
                    'actuators_stepperMotor_uln2003driver_moveSteps',
                    'actuators_stepperMotor_uln2003driver_setDelay',
                    'actuators_setFanPower',
                    'actuators_setVibrationMotorState',
                    'actuators_setGroveRelayState',
                    'actuators_mosfet_setState',
                    'actuators_mosfet_setPercentValue',
                    'actuators_setElectromagnetState',
                    'actuators_setWaterAtomizerState'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_KITRONIK}",
                "blocks": [
                    'actuators_controlAccessBitBarrier',
                    'actuators_controlAccessBitBuzzer',
                    'actuators_kitronik_controlMotor',
                    'actuators_kitronik_stopMotor',
                    'actuators_kitronikShield_setServoAngle'
                ]
            }]
        },
        {
            "subCategoryId": 'cutebot',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_DETECTION}",
                "blocks": [
                    'robots_getCutebotUltrasonicRanger',
                    'robots_readCutebotPatrol',
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_MOVING}",
                "blocks": [
                    'robots_setCutebotGo',
                    'robots_setCutebotTurn',
                    'robots_controlCutebotMotors',
                    'robots_setCutebotStop',
                    'robots_moveCutebotOneSquareForward',
                    'robots_moveCutebotOneSquareBackward',
                    'robots_turnCutebotLeft',
                    'robots_turnCutebotRight'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_CONTROL}",
                "blocks": [
                    'robots_setCutebotBuzzer',
                    'robots_playCutebotMusic',
                    'robots_setCutebotServoAngle'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_RGB_LED}",
                "blocks": [
                    'robots_blinkCutebotRobot',
                    'robots_controlCutebotRGBLedPalette',
                    'robots_controlCutebotRGBLed',
                    'robots_setCutebotNeopixelPalette',
                    'robots_setCutebotNeopixel'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_REMOTE_CONTROL}",
                "blocks": [
                    'robots_cutebot_onRemoteCommandReceived',
                    'robots_cutebot_onRemoteCommandReceived_car_mp3_gray',
                    'robots_decodeCutebotIRreceiver',
                    'robots_getCutebotIRcode'
                ]
            }]
        },
        {
            "subCategoryId": 'cutebotpro',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_DETECTION}",
                "blocks": [
                    'robots_CutebotPro_getUltrasonicDistance',
                    'robots_CutebotPro_getLineState',
                    'robots_CutebotPro_isSpecificState',
                    'robots_CutebotPro_getLineOffset',
                    'robots_CutebotPro_isSensorAboveLine',
                    'robots_getGrayscaleTrackingValue',
                    'robots_CutebotPro_readVersion'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_MOVING}",
                "blocks": [
                    'robots_CutebotPro_setGo',
                    'robots_CutebotPro_turn',
                    'robots_CutebotPro_stop',
                    'robots_CutebotPro_controlMotors',
                    'robots_CutebotPro_getMotorSpeed',
                    'robots_CutebotPro_getAngularDistance',
                    'robots_CutebotPro_initializeAngularDistance'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_RGB_LED}",
                "blocks": [
                    'robots_CutebotPro_controlHeadlightsPalette',
                    'robots_CutebotPro_controlHeadlights',
                    'robots_CutebotPro_switchOffHeadlights',
                    'robots_CutebotPro_setNeopixelPalette',
                    'robots_CutebotPro_setNeopixel',
                    'robots_CutebotPro_switchOffNeopixel'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_PID}",
                "blocks": [
                    'robots_CutebotPro_runWithSpeed',
                    'robots_CutebotPro_setMotorsSpeed',
                    'robots_CutebotPro_runWithRadius',
                    'robots_CutebotPro_runDistance',
                    'robots_CutebotPro_turnWithAngle',
                    'robots_CutebotPro_defineSquare',
                    'robots_CutebotPro_runSquare',
                    'robots_CutebotPro_placeWithAngle',
                    'robots_CutebotPro_turnWheel'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_SERVOMOTORS}",
                "blocks": [
                    'robots_CutebotPro_setServoAngle',
                    'robots_CutebotPro_setServoSpeed'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_MOTOR_PORT}",
                "blocks": [
                    'robots_CutebotPro_setExtendedMotorSpeed',
                    'robots_CutebotPro_stopExtendedMotor'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_REMOTE_CONTROL}",
                "blocks": [
                    'robots_CutebotPro_onRemoteCommandReceived',
                    'robots_CutebotPro_onRemoteCommandReceived_car_mp3_gray',
                    'robots_CutebotPro_decodeIRreceiver',
                    'robots_CutebotPro_getIRcode'
                ]
            }]
        },
        {
            "subCategoryId": 'maqueen',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_DETECTION}",
                "blocks": [
                    'robots_getMaqueenUltrasonicRanger',
                    'robots_readMaqueenPatrol',
                    'robots_maqueenV5_readPatrol',
                    'robots_maqueenV5_batteryLevel'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_MOVING}",
                "blocks": [
                    'robots_setMaqueenGo',
                    'robots_rotateMaqueen',
                    'robots_controlMaqueenMotor',
                    'robots_stopMaqueenMotors',
                    'robots_moveOneSquareForward',
                    'robots_moveOneSquareBackward',
                    'robots_turnLeft',
                    'robots_turnRight',
                    'robots_stopRobot'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_CONTROL}",
                "blocks": [
                    'robots_controlMaqueenLed',
                    'robots_setMaqueenBuzzer',
                    'robots_playMaqueenMusic',
                    'robots_setMaqueenServoAngle',
                    'robots_maqueenV5_patrolling'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_RGB_LED}",
                "blocks": [
                    'robots_blinkRobot',
                    'robots_setMaqueenNeopixelPalette',
                    'robots_setMaqueenNeopixel',
                    'robots_setMaqueenRainbow'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_REMOTE_CONTROL}",
                "blocks": [
                    'robots_maqueen_onRemoteCommandReceived',
                    'robots_maqueen_onRemoteCommandReceived_car_mp3_gray',
                    'robots_decodeMaqueenIRreceiver',
                    'robots_getMaqueenIRcode'
                ]
            }]
        },
        {
            "subCategoryId": 'maqueen-plus',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_DETECTION}",
                "blocks": [
                    'robots_getMaqueenPlusUltrasonicRangerTrigEcho',
                    'robots_getMaqueenPlusV2UltrasonicRanger',
                    'robots_readMaqueenPlusPatrol',
                    'robots_maqueenPlusV3_readLightIntensity'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_MOVING}",
                "blocks": [
                    'robots_setMaqueenPlusGo',
                    'robots_rotateMaqueenPlus',
                    'robots_controlMaqueenPlusMotor',
                    'robots_stopMaqueenPlusMotors'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_CONTROL}",
                "blocks": [
                    'robots_controlMaqueenPlusLed',
                    'robots_maqueenPlusV3_setRGBLed',
                    'robots_setMaqueenPlusBuzzer',
                    'robots_setMaqueenPlusServoAngle'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_RGB_LED} (V2 & V3)",
                "blocks": [
                    'robots_maqueenPlusBlinkRobot',
                    'robots_setMaqueenPlusNeopixelPalette',
                    'robots_setMaqueenPlusNeopixel',
                    'robots_setMaqueenPlusRainbow'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_REMOTE_CONTROL}",
                "blocks": [
                    'robots_maqueenPlus_onRemoteCommandReceived',
                    'robots_maqueenPlus_onRemoteCommandReceived_car_mp3_gray',
                    'robots_decodeMaqueenPlusIRreceiver',
                    'robots_getMaqueenPlusIRcode'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_LINE_FINDER} (V3)",
                "blocks": [
                    'robots_maqueenPlusV3_setPatrolSpeed',
                    'robots_maqueenPlusV3_setIntersectionRunMode',
                    'robots_maqueenPlusV3_setLeftOrRightIntersectionRunMode',
                    'robots_maqueenPlusV3_setPatrollingState',
                    'robots_maqueenPlusV3_intersectionDetected',
                    'robots_maqueenPlusV3_intersectionDetectedIs'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_PID} (V3)",
                "blocks": [
                    'robots_maqueenPlusV3_runDistance',
                    'robots_maqueenPlusV3_turnWithAngle',
                    'robots_maqueenPlusV3_readRealTimeSpeed',
                    'robots_maqueenPlusV3_stopPID'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_LIDAR} (V3)",
                "blocks": [
                    'robots_maqueenPlusV3_lidar_configMatrix',
                    'robots_maqueenPlusV3_lidar_getData',
                    'robots_maqueenPlusV3_lidar_getFixedPoint',
                    'robots_maqueenPlusV3_lidar_configAvoidance',
                    'robots_maqueenPlusV3_lidar_isSignalActivated',
                    'robots_maqueenPlusV3_lidar_dirToFollow',
                    'robots_maqueenPlusV3_lidar_isDirToFollow',
                    'robots_maqueenPlusV3_lidar_getObstacleDistance'
                ]
            }]
        },
        {
            "subCategoryId": 'bitcar',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_DETECTION}",
                "blocks": [
                    'robots_getBitCarUltrasonicRanger',
                    'robots_readBitCarPatrol'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_MOVING}",
                "blocks": [
                    'robots_setBitCarGo',
                    'robots_rotateBitCar',
                    'robots_controlBitCarMotor',
                    'robots_stopBitCarMotors'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_CONTROL}",
                "blocks": [
                    'robots_setBitCarBuzzer'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_RGB_LED}",
                "blocks": [
                    'robots_setBitCarNeopixelPalette',
                    'robots_setBitCarNeopixel',
                    'robots_setBitCarRainbow'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_REMOTE_CONTROL}",
                "blocks": [
                    'robots_bitcar_onRemoteCommandReceived',
                    'robots_bitcar_onRemoteCommandReceived_car_mp3_gray',
                    'robots_decodeBitCarIRreceiver',
                    'robots_getBitCarIRcode'
                ]
            }]
        },
        {
            "subCategoryId": 'kitrobot',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_DETECTION}",
                "blocks": [
                    'robots_getKitrobotUltrasonicRanger',
                    'robots_readKitrobotPatrol'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_MOVING}",
                "blocks": [
                    'robots_setKitrobotGo',
                    'robots_rotateKitrobot',
                    'robots_controlKitrobotMotor',
                    'robots_stopKitrobotMotors',
                    'robots_kitrobotMoveOneSquareForward',
                    'robots_kitrobotMoveOneSquareBackward',
                    'robots_kitrobotTurnLeft',
                    'robots_kitrobotTurnRight',
                    'robots_kitrobotStopRobot'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_CONTROL}",
                "blocks": [
                    'robots_setKitrobotBuzzer'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_RGB_LED}",
                "blocks": [
                    'robots_kitrobotBlinkRobot',
                    'robots_setKitrobotNeopixelPalette',
                    'robots_setKitrobotNeopixel',
                    'robots_setKitrobotRainbow'
                ]
            }]
        },
        {
            "subCategoryId": 'codo',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_CODO}",
                "blocks": [
                    'robots_setCodoGo',
                    'robots_setCodoTurn',
                    'robots_setCodoStop',
                    'robots_controlCodoMotors'
                ]
            }]
        },
        {
            "subCategoryId": 'oobybot',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_OOBYBOT}",
                "blocks": [
                    'robots_controlOobybotLed',
                    'robots_setOobybotGo',
                    'robots_setOobybotTurn',
                    'robots_setOobybotStop',
                    'robots_controlOobybotMotors'
                ]
            }]
        },
        {
            "subCategoryId": 'buggy',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_BUGGY}",
                "blocks": [
                    'robots_setBuggyGo',
                    'robots_setBuggyTurn',
                    'robots_setBuggyStop',
                    'robots_controlBuggyMotors'
                ]
            }]
        },
        {
            "subCategoryId": 'bitbot',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_BITBOT}",
                "blocks": [
                    'robots_readBitBotLightSensor',
                    'robots_readBitBotPatrol',
                    'robots_setBitbotGo',
                    'robots_controlBitBotMotor',
                    'robots_stopBitBotMotors',
                    'robots_setBitBotNeopixelPalette',
                    'robots_setBitBotNeopixel',
                    'robots_setBitBotRainbow'
                ]
            }]
        },
        {
            "subCategoryId": 'gamepad',
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_GAMEPAD}",
                "blocks": [
                    'robots_onBitPlayerButtonEvent',
                    'robots_getBitPlayerJoystick',
                    'robots_onGamepadV4ButtonEvent',
                    'robots_getGamepadV4Joystick',
                    'robots_setGamepadV4LEDMotor',
                    'robots_onGamepadButtonEvent',
                    'robots_setGamepadLED',
                    'robots_setGamepadMotorVibration',
                    'robots_setGamepadBuzzerFreq',
                    'robots_playGamepadMusic'
                ]
            }]
        },
        {
            "subCategoryId": "uhandbit",
            "contents": [{
                "label": "uHandbit",
                "blocks": [
                    "robots_uhandbit_controlServo",
                    "robots_uhandbit_colorSensor_read_rgb",
                    "robots_uhandbit_colorSensor_get_color",
                    "robots_uhandbit_ultrasonic_get_distance",
                    "robots_uhandbit_setNeopixelPalette",
                    "robots_uhandbit_setNeopixel",
                    "robots_uhandbit_setNeopixelRainbow"
                ]
            }]
        },
        {
            "subCategoryId": "wukong",
            "contents": [{
                "label": "WuKong",
                "blocks": [
                    'robots_wukong_setLightMode',
                    'robots_wukong_setLightIntensity',
                    'robots_wukong_controlMotors',
                    'robots_wukong_stopMotors',
                    'robots_wukong_setServoAngle',
                    'robots_wukong_setServoSpeed'
                ]
            }, {
                "label": "Mecanum",
                "blocks": [
                ]
            }]
        },
        {
            "subCategoryId": "superbit",
            "contents": [{
                "label": "%{BKY_SUBCATEGORY_SUPERBIT_BASIC}",
                "blocks": [
                    'robots_buildingBit_setNeopixel',
                    'robots_buildingBit_setNeopixelPalette',
                    'robots_buildingBit_setServoAngle',
                    'robots_buildingBit_controlMotors',
                    'robots_buildingBit_stopMotors',
                    'robots_buildingBit_controlStepperMotors'
                ]
            }, {
                "label": "%{BKY_SUBCATEGORY_SUPERBIT_SENSORS}",
                "blocks": [
                    'robots_buildingBit_getUltrasonicDistance',
                    'robots_buildingBit_getPotentiometerValue',
                    'robots_buildingBit_getLightLevel',
                    'robots_buildingBit_isObstacleDetected',
                    'robots_buildingBit_getPIRstate',
                    'robots_buildingBit_dht11_redData',
                    'robots_buildingBit_getColor',
                    'robots_buildingBitonJoystickDir'
                ]
            }]
        }
    ],
    "tello": [
        {
            "label": "%{BKY_SUBCATEGORY_TELLO}",
            "blocks": [
                'drone_init',
                'tello_takeoff',
                'tello_land',
                'tello_emergency',
                'tello_stop',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TELLO_SEND_COMMAND}",
            "blocks": [
                'tello_flip',
                'tello_move_up_down',
                'tello_move',
                'tello_rectangle_form',
                "tello_square_form",
                'tello_rotate',
                'tello_go',
                'tello_stream_on',
                'tello_stream_off',


            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_TELLO_READ}",
            "blocks": [
                'tello_speed',
                "tello_battery",
                "tello_flight_time",
            ]
        },
    ],
    "ia": [
        {
            "subCategoryId": 'vittaia',
            "contents": [
                {
                    "label": "%{BKY_SUBCATEGORY_VITTAIA_SENSOR_DATA}",
                    "blocks": [
                        'vittaia_load_local_model',
                        'vittaia_load_cloud_model',
                        'vittaia_make_prediction',
                        'vittaia_get_highest_probability_class',
                        'vittaia_detect_class',
                    ]
                },
            ]
        },
        {
            "subCategoryId": 'cameras',
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
            'math_atan2',
            "math_RSA_generate_keys",
            "math_RSA_cipher_message",
            "math_RSA_decipher_message"
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
