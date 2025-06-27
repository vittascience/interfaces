const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "mCore",
        "name": "%{BKY_CATEGORY_MCORE}",
        "style": "mCore_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-robot"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "display",
        "name": "%{BKY_CATEGORY_DISPLAY}",
        "style": "display_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "io",
        "name": "%{BKY_CATEGORY_IO}",
        "style": "io_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-exchange-alt"
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
        "toolboxitemid": "actuators",
        "name": "%{BKY_CATEGORY_ACTUATORS}",
        "style": "actuators_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-fan"
        },
        "contents": []
    },
    {
        "kind": "sep",
        "id": "sep1",
    },
    {
        "kind": "category",
        "toolboxitemid": "logic",
        "name": "%{BKY_CATEGORY_LOGIC}",
        "style": "logic_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-code-branch"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "loops",
        "name": "%{BKY_CATEGORY_LOOPS}",
        "style": "loops_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-redo-alt"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "math",
        "name": "%{BKY_CATEGORY_MATH}",
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
        "style": "list_category",
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
    }
];

const TOOLBOX_VITTASCIENCE_CONTENT = {
    "mCore": [
        {
            "label": "%{BKY_SUBCATEGORY_MCORE_LED}",
            "blocks": [
                'mCore_control_LED'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MCORE_RGB_LED}",
            "blocks": [
                'robots_setmBotRgbLed',
                'robots_setmBotPaletteRgbLed'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MCORE_SENSORS}",
            "blocks": [
                'robots_getmBotSensorLight',
                'robots_getmBotButtonState'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MCORE_BUZZER}",
            "blocks": [
                'robots_setmBotBuzzer',
                'robots_playmBotMusic'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MCORE_INFRARED}",
            "blocks": [
                'robots_getmBotRemoteControlButton',
                'robots_sendmBotIrMessage'
            ]
        },
    ],
    "display": [
        {
            "label": "%{BKY_SUBCATEGORY_LED_MATRIX}",
            "blocks": [
                'robots_makeBlock_matrixDrawBitmap',
                'robots_makeBlock_matrixDrawString',
                'robots_makeBlock_matrixShowNumber',
                'robots_makeBlock_matrixShowClock'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_RGB_LED}",
            "blocks": [
                'robots_makeBlock_setRgbLed',
                'robots_makeBlock_setPaletteRgbLed',
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_NEOPIXEL}",
            "blocks": [
                'robots_makeBlock_defineNeopixel',
                'robots_makeBlock_controlNeopixelLed',
                'robots_makeBlock_controlNeopixelPaletteLed',
                'robots_makeBlock_neopixel_controlAllLedRGB',
                'robots_makeBlock_neopixel_controlAllLedPalette',
                'robots_makeBlock_rainbowNeopixel'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_4DIGITS_DISPLAY}",
            "blocks": [
                'robots_makeBlock_set4DigitNumber'
            ]
        }
    ],
    "io": [
        {
            "label": "%{BKY_SUBCATEGORY_TIME}",
            "blocks": [
                'io_wait',
                'io_waitUntil',
                'io_initChronometer',
                'io_getChronometer'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_EXTERNAL_INPUTS}",
            "blocks": [
                'robots_makeBlock_getSwitchState',
                'robots_makeBlock_getJoystickAxis',
                'robots_makeBlock_getPotentiometer',
                'robots_makeBlock_getPressedButton',
                'robots_makeBlock_getTouchSensorState'
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
                'io_attachInterrupt'
            ]
        }
    ],
    "communication": [
        {
            "label": "%{BKY_SUBCATEGORY_SERIAL_CONNECTION}",
            "blocks": [
                'communication_serialWrite',
                'communication_onSerialDataReceived',
                'communication_graphSerialWrite',
                'communication_playComputerMusic',
                'communication_playComputerFrequency',
                'communication_stopComputerMusic'
            ]
        }
    ],
    "sensors": [
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_DISTANCEMOVEMENT}",
            "blocks": [
                'robots_makeBlock_getUltrasonicRanger',
                'robots_makeBlock_getLineState',
                'robots_makeBlock_getPIRMotionState',
                'robots_makeBlock_getCompassData'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_SOUNDLIGHT}",
            "blocks": [
                'robots_makeBlock_getLight',
                'robots_makeBlock_getColor',
                'robots_makeBlock_getSound'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_GAS}",
            "blocks": [
                'robots_makeBlock_MQ2_getGas',
                'robots_makeBlock_getFlame'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SENSORS_CLIMATE}",
            "blocks": [
                'robots_makeBlock_getWaterproofTemperature',
            ]
        }
    ],
    "actuators": [
        {
            "label": "%{BKY_SUBCATEGORY_MBOT_MOTORS}",
            "blocks": [
                'robots_setmBotGo',
                'robots_controlmBotMotor',
                'robots_stopmBotMotors'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_SERVOMOTOR}",
            "blocks": [
                'robots_makeBlock_setServoAngle'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MINI_FAN}",
            "blocks": [
                'robots_makeBlock_controlMiniFan'
            ]
        }
    ],
    "logic": [
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
    ],
    "loops": [
        {
            "blocks": [
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
                'controls_flow_statements'
            ]
        }
    ],
    "math": [
        {
            "blocks": [
                'math_number',
                'math_arithmetic-add',
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
    "text": [
        {
            "blocks": [
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
    "variables": "customized",
    "lists": [
        {
            "blocks": [
                'lists_create_with-0',
                'lists_create_with',
                'lists_repeat',
                'lists_length',
                'lists_getIndex',
            ]
        }
    ],
    "procedures": "customized",
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;