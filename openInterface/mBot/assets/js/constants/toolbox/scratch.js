const TOOLBOX_SCRATCH_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "looks",
        "name": "%{BKY_CATEGORY_LOOKS}",
        "style": "looks_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "action",
        "name": "%{BKY_CATEGORY_ACTION}",
        "style": "action_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-fan"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "sensing",
        "name": "%{BKY_CATEGORY_SENSING}",
        "style": "sensing_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-plug"
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

const TOOLBOX_SCRATCH_CONTENT = {
    "looks": [
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
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_4DIGITS_DISPLAY}",
            "blocks": [
                'robots_makeBlock_set4DigitNumber'
            ]
        }
    ],
    "action": [
        {
            "label": "%{BKY_SUBCATEGORY_MBOT_MOTORS}",
            "blocks": [
                'robots_setmBotGo',
                'robots_controlmBotMotor',
                'robots_stopmBotMotors'
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
    "sensing": [
        {
            "label": "%{BKY_SUBCATEGORY_MCORE_SENSORS}",
            "blocks": [
                'robots_getmBotSensorLight',
                'robots_getmBotButtonState'
            ]
        },
        {
            "label": "%{BKY_SUBCATEGORY_MCORE_INFRARED}",
            "blocks": [
                'robots_getmBotRemoteControlButton',
                'robots_sendmBotIrMessage'
            ]
        },
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
            ]
        }
    ],
    "control": [
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
            "label": "%{BKY_SUBCATEGORY_LOOPS}",
            "blocks": [
                'controls_repeat',
                'controls_whileUntil',
                'controls_for',
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
    "math": [
        {
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
                'math_modulo',
                'math_constrain',
                'math_random_float',
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

const TOOLBOX_SCRATCH_CONTENT_SIMPLE = TOOLBOX_SCRATCH_CONTENT;
