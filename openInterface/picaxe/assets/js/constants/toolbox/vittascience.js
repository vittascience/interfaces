const TOOLBOX_VITTASCIENCE_CATEGORIES = [
    {
        "kind": "category",
        "toolboxitemid": "autoprog",
        "name": "%{BKY_CATEGORY_AUTOPROG}",
        "style": "autoprog_category",
        "cssConfig": {
            "icon": "icon_blockly fas fa-puzzle-piece"
        },
        "contents": []
    },
    {
        "kind": "category",
        "toolboxitemid": "grove",
        "name": "%{BKY_CATEGORY_GROVE}",
        "style": "grove_category",
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
            "icon": "icon_blockly fas fa-comment-dots"
        },
        "contents": []
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
        "toolboxitemid": "procedures",
        "name": "%{BKY_CATEGORY_PROCEDURES}",
        "custom": "PROCEDURE",
        "style": "procedure_category",
        "cssConfig": {
            "icon": "icon_blockly svgIcon"
        }
    }
];

const TOOLBOX_VITTASCIENCE_SUBCATEGORIES = {
    "grove": [
        {
            "kind": "category",
            "toolboxitemid": "grove_digital",
            "name": "%{BKY_AUTOPROG_LABEL_DIGITAL}",
            "style": "grove_digital_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-toggle-on"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "grove_analog",
            "name": "%{BKY_AUTOPROG_LABEL_ANALOG}",
            "style": "grove_analog_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-sliders-h"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "grove_outputs",
            "name": "%{BKY_AUTOPROG_LABEL_OUTPUTS}",
            "style": "grove_outputs_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-lightbulb"
            },
            "contents": []
        },
        {
            "kind": "category",
            "toolboxitemid": "grove_screens",
            "name": "%{BKY_SUBCATEGORY_SCREENS}",
            "style": "grove_screens_category",
            "cssConfig": {
                "icon": "icon_blockly fas fa-display"
            },
            "contents": []
        }
    ]
};

const TOOLBOX_VITTASCIENCE_CONTENT = {
    "autoprog": [
        { "label": "%{BKY_AUTOPROG_LABEL_DIGITAL}", "blocks": ['autoprog_digital_sensor-push_button', 'autoprog_digital_sensor-roller_switch', 'autoprog_digital_sensor-mini_switch', 'autoprog_digital_sensor-reed', 'autoprog_digital_sensor-tilt', 'autoprog_digital_sensor-dry_contact', 'autoprog_digital_sensor-pir', 'autoprog_digital_sensor-line', 'autoprog_digital_sensor-current'] },
        { "label": "%{BKY_AUTOPROG_LABEL_ANALOG}", "blocks": ['autoprog_analog_sensor-pot', 'autoprog_analog_sensor-light', 'autoprog_analog_sensor-temp', 'autoprog_analog_sensor-temp_c', 'autoprog_analog_sensor-humidity', 'autoprog_analog_sensor-force', 'autoprog_analog_sensor-current'] },
        { "label": "%{BKY_AUTOPROG_LABEL_OUTPUTS}", "blocks": ['autoprog_output-led', 'autoprog_output-lighting', 'autoprog_output-relay', 'autoprog_output-magnet', 'autoprog_output-power', 'autoprog_servo', 'autoprog_buzzer'] }
    ],
    "grove": [
        { "subCategoryId": "grove_digital", "contents": [{ "blocks": ['grove_digital_sensor-button', 'grove_digital_sensor-switch', 'grove_digital_sensor-touch', 'grove_digital_sensor-magnetic', 'grove_digital_sensor-tilt', 'grove_digital_sensor-pir', 'grove_digital_sensor-line', 'grove_digital_sensor-vibration'] }] },
        { "subCategoryId": "grove_analog", "contents": [{ "blocks": ['grove_analog_sensor-rotary', 'grove_analog_sensor-slide', 'grove_analog_sensor-light', 'grove_analog_sensor-sound', 'grove_analog_sensor-moisture', 'grove_analog_sensor-water', 'grove_analog_sensor-temp', 'grove_analog_sensor-ntc_c'] }] },
        { "subCategoryId": "grove_outputs", "contents": [{ "blocks": ['grove_output-led', 'grove_output-relay', 'grove_output-vibration', 'grove_output-mosfet', 'grove_output-electromagnet', 'grove_output-fan', 'grove_servo', 'grove_buzzer'] }] },
        { "subCategoryId": "grove_screens", "contents": [{ "blocks": ['grove_lcd_print', 'grove_lcd_print-number', 'grove_lcd_clear'] }] }
    ],
    "io": [{
        "blocks": [
            'io_picaxe_digital_write',
            'io_picaxe_digital_read',
            'io_picaxe_analog_read',
            'io_picaxe_pause'
        ]
    }],
    "communication": [{
        "blocks": [
            'communication_picaxe_sertxd',
            'text'
        ]
    }],
    "logic": [{
        "blocks": [
            'controls_if',
            'controls_if-else',
            'logic_compare-eq',
            'logic_compare-gte',
            'logic_compare-lte',
            'logic_operation-and',
            'logic_operation-or'
        ]
    }],
    "loops": [{
        "blocks": [
            'forever',
            'controls_repeat',
            'controls_whileUntil',
            'controls_for'
        ]
    }],
    "math": [{
        "blocks": [
            'math_number',
            'math_arithmetic-add',
            'math_arithmetic-minus',
            'math_arithmetic-multiply',
            'math_arithmetic-divide'
        ]
    }],
    "variables": "customized",
    "procedures": "customized"
};

const TOOLBOX_VITTASCIENCE_CONTENT_SIMPLE = TOOLBOX_VITTASCIENCE_CONTENT;
