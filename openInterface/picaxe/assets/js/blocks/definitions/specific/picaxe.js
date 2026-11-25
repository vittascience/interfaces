/**
 * @fileoverview Blocks of the PICAXE interface (BASIC generated from the Blockly.Python generator object).
 */

// no function with return value, no typed/global variable in PICAXE BASIC: the procedures and variables flyouts are built from Blockly.Blocks
['procedures_defreturn', 'procedures_ifreturn', 'procedures_simple_return', 'procedures_functionReference', 'procedures_lambda',
  'variables_global', 'variables_force_type', 'variables_type_of']
  .forEach(type => delete Blockly.Blocks[type]);

// on/off sensors: the warm-up note only when the PIR module is selected
Blockly.Extensions.register('picaxe_digital_sensor_tooltip', function () {
    this.setTooltip(() => Blockly.Msg['AUTOPROG_DIGITAL_SENSOR_TOOLTIP']
        + (this.getFieldValue('MODULE') === 'PIR' ? ' ' + Blockly.Msg['AUTOPROG_PIR_TOOLTIP'] : ''));
});

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    {
        "type": "io_picaxe_digital_write",
        "message0": "%{BKY_IO_PICAXE_DIGITAL_WRITE_TITLE}",
        "args0": [picaxePins('outputs'), {
            "type": "field_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_IO_PICAXE_STATE_HIGH}", "HIGH"],
                ["%{BKY_IO_PICAXE_STATE_LOW}", "LOW"],
                ["%{BKY_IO_PICAXE_STATE_TOGGLE}", "TOGGLE"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_PICAXE_DIGITAL_WRITE_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "io_picaxe_digital_read",
        "message0": "%{BKY_IO_PICAXE_DIGITAL_READ_TITLE}",
        "args0": [picaxePins('inputs')],
        "output": "Number",
        "tooltip": "%{BKY_IO_PICAXE_DIGITAL_READ_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "io_picaxe_analog_read",
        "message0": "%{BKY_IO_PICAXE_ANALOG_READ_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "RES",
            "options": [
                ["%{BKY_IO_PICAXE_ANALOG_READ_8BITS}", "readadc"],
                ["%{BKY_IO_PICAXE_ANALOG_READ_10BITS}", "readadc10"]
            ]
        }, picaxePins('analogs'), {
            "type": "field_variable",
            "name": "VAR",
            "variable": "valeur"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_PICAXE_ANALOG_READ_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "io_picaxe_pause",
        "message0": "%{BKY_IO_PICAXE_PAUSE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_PICAXE_PAUSE_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "communication_picaxe_sertxd",
        "message0": "%{BKY_COMMUNICATION_PICAXE_SERTXD_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_PICAXE_SERTXD_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "actuators_picaxe_servo",
        "inputsInline": true,
        "message0": "%{BKY_ACTUATORS_PICAXE_SERVO_TITLE}",
        "args0": [picaxePins('servos'), {
            "type": "input_value",
            "name": "POS",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_PICAXE_SERVO_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "actuators_picaxe_sound",
        "inputsInline": true,
        "message0": "%{BKY_ACTUATORS_PICAXE_SOUND_TITLE}",
        "args0": [picaxePins('outputs'), {
            "type": "input_value",
            "name": "NOTE",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_PICAXE_SOUND_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },

    {
        "type": "autoprog_digital_sensor",
        "message0": "%{BKY_AUTOPROG_DIGITAL_SENSOR_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MODULE",
            "options": [
                ["%{BKY_AUTOPROG_DIGITAL_PUSH_BUTTON}", "PUSH_BUTTON"],
                ["%{BKY_AUTOPROG_DIGITAL_ROLLER_SWITCH}", "ROLLER_SWITCH"],
                ["%{BKY_AUTOPROG_DIGITAL_MINI_SWITCH}", "MINI_SWITCH"],
                ["%{BKY_AUTOPROG_DIGITAL_REED}", "REED"],
                ["%{BKY_AUTOPROG_DIGITAL_TILT}", "TILT"],
                ["%{BKY_AUTOPROG_DIGITAL_DRY_CONTACT}", "DRY_CONTACT"],
                ["%{BKY_AUTOPROG_DIGITAL_PIR}", "PIR"],
                ["%{BKY_AUTOPROG_DIGITAL_LINE}", "LINE"],
                ["%{BKY_AUTOPROG_DIGITAL_CURRENT}", "CURRENT"]
            ]
        }, picaxePins('inputs')],
        "output": "Boolean",
        "extensions": ["block_init_helpurl", "block_init_color", "picaxe_digital_sensor_tooltip"]
    },
    {
        "type": "autoprog_analog_sensor",
        "message0": "%{BKY_AUTOPROG_ANALOG_SENSOR_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MODULE",
            "options": [
                ["%{BKY_AUTOPROG_ANALOG_POT}", "POT"],
                ["%{BKY_AUTOPROG_ANALOG_LIGHT}", "LIGHT"],
                ["%{BKY_AUTOPROG_ANALOG_TEMP}", "TEMP"],
                ["%{BKY_AUTOPROG_ANALOG_TEMP_C}", "TEMP_C"],
                ["%{BKY_AUTOPROG_ANALOG_HUMIDITY}", "HUMIDITY"],
                ["%{BKY_AUTOPROG_ANALOG_FORCE}", "FORCE"],
                ["%{BKY_AUTOPROG_ANALOG_CURRENT}", "CURRENT"]
            ]
        }, picaxePins('analogs'), {
            "type": "field_variable",
            "name": "VAR",
            "variable": "valeur"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_AUTOPROG_ANALOG_SENSOR_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "autoprog_servo",
        "inputsInline": true,
        "message0": "%{BKY_ACTUATORS_PICAXE_SERVO_TITLE}",
        "args0": [picaxePins('servos'), {
            "type": "input_value",
            "name": "POS",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_PICAXE_SERVO_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "autoprog_buzzer",
        "inputsInline": true,
        "message0": "%{BKY_ACTUATORS_PICAXE_SOUND_TITLE}",
        "args0": [picaxePins('outputs'), {
            "type": "input_value",
            "name": "NOTE",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_PICAXE_SOUND_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "autoprog_output",
        "message0": "%{BKY_AUTOPROG_OUTPUT_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_AUTOPROG_STATE_ON}", "HIGH"],
                ["%{BKY_AUTOPROG_STATE_OFF}", "LOW"],
                ["%{BKY_AUTOPROG_STATE_TOGGLE}", "TOGGLE"]
            ]
        }, {
            "type": "field_dropdown",
            "name": "MODULE",
            "options": [
                ["%{BKY_AUTOPROG_OUTPUT_LED}", "LED"],
                ["%{BKY_AUTOPROG_OUTPUT_LIGHTING}", "LIGHTING"],
                ["%{BKY_AUTOPROG_OUTPUT_RELAY}", "RELAY"],
                ["%{BKY_AUTOPROG_OUTPUT_MAGNET}", "MAGNET"],
                ["%{BKY_AUTOPROG_OUTPUT_POWER}", "POWER"]
            ]
        }, picaxePins('outputs')],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_AUTOPROG_OUTPUT_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "grove_digital_sensor",
        "message0": "%{BKY_GROVE_DIGITAL_SENSOR_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MODULE",
            "options": [
                ["%{BKY_GROVE_DIGITAL_BUTTON}", "BUTTON"],
                ["%{BKY_GROVE_DIGITAL_SWITCH}", "SWITCH"],
                ["%{BKY_GROVE_DIGITAL_TOUCH}", "TOUCH"],
                ["%{BKY_GROVE_DIGITAL_MAGNETIC}", "MAGNETIC"],
                ["%{BKY_GROVE_DIGITAL_TILT}", "TILT"],
                ["%{BKY_GROVE_DIGITAL_PIR}", "PIR"],
                ["%{BKY_GROVE_DIGITAL_LINE}", "LINE"],
                ["%{BKY_GROVE_DIGITAL_VIBRATION}", "VIBRATION"]
            ]
        }, picaxePins('inputs')],
        "output": "Boolean",
        "extensions": ["block_init_helpurl", "block_init_color", "picaxe_digital_sensor_tooltip"]
    },
    {
        "type": "grove_analog_sensor",
        "message0": "%{BKY_GROVE_ANALOG_SENSOR_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MODULE",
            "options": [
                ["%{BKY_GROVE_ANALOG_ROTARY}", "ROTARY"],
                ["%{BKY_GROVE_ANALOG_SLIDE}", "SLIDE"],
                ["%{BKY_GROVE_ANALOG_LIGHT}", "LIGHT"],
                ["%{BKY_GROVE_ANALOG_SOUND}", "SOUND"],
                ["%{BKY_GROVE_ANALOG_MOISTURE}", "MOISTURE"],
                ["%{BKY_GROVE_ANALOG_WATER}", "WATER"],
                ["%{BKY_GROVE_ANALOG_TEMP}", "TEMP"],
                ["%{BKY_GROVE_ANALOG_NTC_C}", "NTC_C"]
            ]
        }, picaxePins('analogs'), {
            "type": "field_variable",
            "name": "VAR",
            "variable": "valeur"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_AUTOPROG_ANALOG_SENSOR_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "grove_output",
        "message0": "%{BKY_GROVE_OUTPUT_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_AUTOPROG_STATE_ON}", "HIGH"],
                ["%{BKY_AUTOPROG_STATE_OFF}", "LOW"],
                ["%{BKY_AUTOPROG_STATE_TOGGLE}", "TOGGLE"]
            ]
        }, {
            "type": "field_dropdown",
            "name": "MODULE",
            "options": [
                ["%{BKY_GROVE_OUTPUT_LED}", "LED"],
                ["%{BKY_GROVE_OUTPUT_RELAY}", "RELAY"],
                ["%{BKY_GROVE_OUTPUT_VIBRATION}", "VIBRATION"],
                ["%{BKY_GROVE_OUTPUT_MOSFET}", "MOSFET"],
                ["%{BKY_GROVE_OUTPUT_ELECTROMAGNET}", "ELECTROMAGNET"],
                ["%{BKY_GROVE_OUTPUT_FAN}", "FAN"]
            ]
        }, picaxePins('outputs')],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_AUTOPROG_OUTPUT_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "grove_servo",
        "inputsInline": true,
        "message0": "%{BKY_GROVE_SERVO_TITLE}",
        "args0": [picaxePins('servos'), {
            "type": "input_value",
            "name": "POS",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_GROVE_SERVO_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "grove_buzzer",
        "inputsInline": true,
        "message0": "%{BKY_GROVE_BUZZER_TITLE}",
        "args0": [picaxePins('outputs'), {
            "type": "input_value",
            "name": "NOTE",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_GROVE_BUZZER_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "grove_lcd_print",
        "message0": "%{BKY_GROVE_LCD_PRINT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "field_dropdown",
            "name": "LINE",
            "options": [["1", "0"], ["2", "1"]]
        }, {
            "type": "field_number",
            "name": "POS",
            "value": 0,
            "min": 0,
            "max": 15,
            "precision": 1
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_GROVE_LCD_PRINT_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    },
    {
        "type": "grove_lcd_clear",
        "message0": "%{BKY_GROVE_LCD_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_GROVE_LCD_CLEAR_TOOLTIP}",
        "extensions": ["block_init_helpurl", "block_init_color"]
    }
]); // END JSON EXTRACT (Do not delete this comment.)
