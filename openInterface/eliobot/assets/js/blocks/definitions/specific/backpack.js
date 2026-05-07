/**
 * @fileoverview Backpack blocks for Eliobot.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    // Backpack - Display
    {
        "type": "backpack_display_oled_text",
        "message0": "%{BKY_BACKPACK_DISPLAY_OLED_TEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
        }, {
            "type": "field_grid_dropdown",
            "name": "ROW",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_DISPLAY_OLED_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "backpack_display_oled_clear",
        "message0": "%{BKY_BACKPACK_DISPLAY_OLED_CLEAR_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_DISPLAY_OLED_ADDTEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "backpack_display_matrix_color_picker",
        "message0": "%{BKY_BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_DISPLAY_MATRIX_COLOR_PICKER_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks#matrice-de-led",
        "extensions": [
            "backpack_display_matrix_color_picker_init"
        ]
    },
    {
        "type": "backpack_display_clear_matrix",
        "message0": "%{BKY_BACKPACK_DISPLAY_CLEAR_MATRIX_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_DISPLAY_CLEAR_MATRIX_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks#matrice-de-led"
    },
    {
        "type": "backpack_display_matrix_logo_picker",
        "message0": "%{BKY_BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LOGO_TYPE",
                "options": Blockly.Constants.Utils.BlockOptions.getEliobotBackpackLedMatrixIcons()
            },
            {
                "type": "input_value",
                "name": "COLOR",
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_DISPLAY_MATRIX_LOGO_PICKER_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks#matrice-de-led"
    },
    {
        "type": "backpack_display_matrix_scroll_text",
        "message0": "%{BKY_BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT"
            },
            {
                "type": "input_value",
                "name": "COLOR",
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_DISPLAY_MATRIX_SCROLL_TEXT_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks#matrice-de-led"
    },

    // Backpack - Sensors
    {
        "type": "backpack_sensor_dht11",
        "message0": "%{BKY_BACKPACK_DHT11_SENSOR_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "SENSOR_TYPE",
            "options": [
                ["%{BKY_SENSOR_TEMPERATURE}", "temperature"],
                ["%{BKY_SENSOR_HUMIDITY}", "humidity"]
            ]
        }],
        "output": "Number",
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_DHT11_SENSOR_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks#capteur-dht11"
    },
    {
        "type": "backpack_sensor_bme280",
        "message0": "%{BKY_BACKPACK_BME280_SENSOR_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SENSOR_TYPE",
                "options": [
                    ["%{BKY_SENSOR_TEMPERATURE}", "temperature"],
                    ["%{BKY_SENSOR_HUMIDITY}", "humidity"],
                    ["%{BKY_SENSOR_PRESSURE}", "pressure"],
                    ["%{BKY_SENSOR_ALTITUDE}", "altitude"]
                ]
            }
        ],
        "output": "Number",
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_BME280_SENSOR_TOOLTIP}"
    },
    {
        "type": "backpack_sensor_bme280_set_sea_level_pressure",
        "message0": "%{BKY_BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "PRESSURE",
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_BME280_SENSOR_SET_SEA_LEVEL_PRESSURE_TOOLTIP}"
    },
    {
        "type": "backpack_sensor_hcsr04_getDistance",
        "message0": "%{BKY_BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TITLE}",
        "output": "Number",
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_SENSORS_HCSR04_GET_DISTANCE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
        ]
    },
    {
        "type": "backpack_sensor_getLight",
        "message0": "%{BKY_BACKPACK_SENSORS_GETLIGHT_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
            }],
        "output": "Number",
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_SENSORS_GETLIGHT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // Backpack - io
    {
        "type": "sequential_buttons",
        "message0": "%{BKY_SEQUENTIAL_BUTTONS}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_SEQUENTIAL_BUTTONS_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks#tortue-de-boutons"
    },
    {
        "type": "backpack_io_button_state",
        "message0": "%{BKY_BACKPACK_IO_BUTTON_STATE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    ["%{BKY_BACKPACK_IO_BUTTON_STATE_PRESSED}", "True"],
                    ["%{BKY_BACKPACK_IO_BUTTON_STATE_NOT_PRESSED}", "False"]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
            }
        ],
        "output": "Boolean",
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_IO_BUTTON_STATE_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks/grove-backpack#button-v12-et-touch-v11"
    },
    {
        "type": "backpack_io_knob_value",
        "message0": "%{BKY_BACKPACK_IO_KNOB_VALUE_TITLE}",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]
            }
        ],
        "output": "Number",
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_IO_KNOB_VALUE_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks/grove-backpack#rotary-sensor-angle-v12"
    },

    // Backpack - Actuators
    {
        "type": "backpack_actuators_servo_motor_angle",
        "message0": "%{BKY_BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ANGLE",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_ACTUATORS_SERVO_MOTOR_ANGLE_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks#servomoteur"
    },
    {
        "type": "backpack_actuators_servo_motor_speed",
        "message0": "%{BKY_BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number"
            },
            {
                "type": "field_grid_dropdown",
                "name": "DIR",
                "options": [
                    ["↺", "1"],
                    ["↻", "-1"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_ACTUATORS_SERVO_MOTOR_SPEED_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks#servomoteur-continu"
    },
    {
        "type": "backpack_actuators_grove_buzzer",
        "message0": "%{BKY_BACKPACK_ACTUATORS_GROVE_BUZZER_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "FREQUENCY",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "VOLUME",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": Blockly.Constants.Pins.analog_read[Blockly.Constants.getSelectedBoard()]

            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "backpack_blocks",
        "tooltip": "%{BKY_BACKPACK_ACTUATORS_GROVE_BUZZER_TOOLTIP}",
        "helpUrl": "https://docs.eliobot.com/docs/elioblocs/blocs/backpacks/grove-backpack#buzzer-v12"
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Backpack = Object.create(null);

/**
 * Performs setup of 'display_eyes_matrix' block for screen checkboxes display.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.BACKPACK_DISPLAY_MATRIX_COLOR_INIT_EXTENSION = function () {
    for (let row = 0; row < 5; row++) {
        const rowBoxes = this.appendDummyInput("ROW" + row);
        for (let col = 0; col < 5; col++) {
            const box = new Blockly.FieldColourCustom('#000000');
            rowBoxes.appendField(box, `COLOUR_${row}_${col}`);
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("backpack_display_matrix_color_picker_init",
    Blockly.Constants.Display.BACKPACK_DISPLAY_MATRIX_COLOR_INIT_EXTENSION);