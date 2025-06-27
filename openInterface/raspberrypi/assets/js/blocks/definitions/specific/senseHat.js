/**
 * @fileoverview Sensors blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    // SenseHat
    // temperature
    {
        "type": "sensehat_getSenseHatTemperature",
        "message0": "%{BKY_SENSE_HAT_GET_TEMPERATURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "UNIT",
            "options": [
                ["(°C)", "celsius"],
                ["(°F)", "fahrenheit"],
                ["(K)", "kelvin"]
            ]
        }],
        "output": "Number",
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_GET_TEMPERATURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // humidity
    {
        "type": "sensehat_getSenseHatHumidity",
        "message0": "%{BKY_SENSE_HAT_GET_HUMIDITY_TITLE}",
        "output": "Number",
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_GET_HUMIDITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // TEMPERATURE FROM HUMIDITY or PRESSURE SENSOR
    {
        "type": "sensehat_getTemperatureFrom",
        "message0": "%{BKY_SENSE_HAT_GET_TEMPERATURE_FROM_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "UNIT",
                "options": [
                    ["(°C)", "celsius"],
                    ["(°F)", "fahrenheit"],
                    ["(K)", "kelvin"]
                ]
            },
            {
                "type": "field_grid_dropdown",
                "name": "SENSOR",
                "options": [
                    ["%{BKY_SENSE_HAT_GET_TEMPERATURE_HUMIDITY}", "humidity"],
                    ["%{BKY_SENSE_HAT_GET_TEMPERATURE_PRESSURE}", "pressure"]
                ]
            },

        ],
        "output": "Number",
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_GET_TEMPERATURE_FROM_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // PRESSURE
    {
        "type": "sensehat_getSenseHatPressure",
        "message0": "%{BKY_SENSE_HAT_GET_PRESSURE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "UNIT",
                "options": [
                    ["(mbar)", "mbar"],
                    ["(bar)", "bar"],
                    ["(hPa)", "hectopascal"],
                    ["(mmHg)", "mmhg"],
                    ["(psi)", "psi"],

                ]
            }
        ],
        "output": "Number",
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_GET_PRESSURE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // Display
    {
        "type": "sensehat_display_set_pixel",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXEL_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RED",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "GREEN",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "BLUE",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensehat_display_set_pixel_palette",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXEL_PALETTE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensehat_display_set_pixels_image",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TITLE}",
        "args0": [
            {
                "type": "field_grid_dropdown",
                "name": "IMAGE",
                "options": [
                    [{
                        'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_question_mark.png',
                        'width': 42,
                        'height': 42,
                        'alt': 'Red'
                    }, "question_mark"],
                    [{
                        'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_heart.png',
                        'width': 42,
                        'height': 42,
                        'alt': 'Red'
                    }, "heart"],
                    [{
                        'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_smile.png',
                        'width': 42,
                        'height': 42,
                        'alt': 'Red'
                    }, 'smile'],
                    [{
                        'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_house.png',
                        'width': 42,
                        'height': 42,
                        'alt': 'Red'
                    }, 'house'],
                    [{
                        'src': '/openInterface/raspberrypi/assets/media/blocks_icons/image_sad.png',
                        'width': 42,
                        'height': 42,
                        'alt': 'Red'
                    }, 'sad'],


                ]
            },
            {
                "type": "input_value",
                "name": "FOREGROUND_COLOR",
                "check": "Colour"
            },
            {
                "type": "input_value",
                "name": "BACKGROUND_COLOR",
                "check": "Colour"
            }


        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_SET_PIXELS_IMAGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "sensehat_show_leds_image",
        "message0": "%{BKY_SENSE_HAT_DISAPLY_SHOW_LEDS_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_DISAPLY_SHOW_LEDS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "show_leds_screen_init"
        ]
    },

    {
        "type": "sensehat_display_get_pixel",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_GET_PIXEL_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "output": "Array",
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_GET_PIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "sensehat_display_get_pixels",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_GET_PIXELS_TITLE}",
        "output": "Array",
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_GET_PIXELS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // clear
    {
        "type": "sensehat_display_clear",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "sensehat_display_clear_with_color",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_CLEAR_WITH_COLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        'type': 'sensehat_display_show_message',
        'message0': '%{BKY_SENSE_HAT_DISPLAY_SHOW_MESSAGE_TITLE}',
        'args0': [
            {
                'type': 'input_value',
                'name': 'MESSAGE',
                'check': 'String'
            },
            {
                'type': 'input_value',
                'name': 'SPEED',
                'check': 'Number'
            },
            {
                'type': 'input_value',
                'name': 'COLOR',
                'check': 'Colour'
            },
            {
                'type': 'input_value',
                'name': 'BACKGROUND_COLOR',
                'check': 'Colour'
            }

        ],
        'previousStatement': null,
        'nextStatement': null,
        'style': 'senseHat_blocks',
        'tooltip': '%{BKY_SENSE_HAT_DISPLAY_SHOW_MESSAGE_TOOLTIP}',
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "sensehat_display_show_letter",
        "message0": "%{BKY_SENSE_HAT_DISPLAY_SHOW_LETTER_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "LETTER",
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour"
            },
            {
                "type": "input_value",
                "name": "BACKGROUND_COLOR",
                "check": "Colour"
            }

        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_DISPLAY_SHOW_LETTER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // input/output
    {
        "type": "sensehat_wait_for_event",
        "message0": "%{BKY_SENSE_HAT_WAIT_FOR_EVENT_TITLE}",
        // "output": "String",
        'previousStatement': null,
        'nextStatement': null,
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_WAIT_FOR_EVENT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "sensehat_get_event_action_direction",
        "message0": "%{BKY_SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TITLE}",
        "args0": [{
            'type': 'field_grid_dropdown',
            'name': 'EVENT_TYPE',
            'options': [
                ['%{BKY_SENSE_HAT_GET_EVENT_DIRECTION}', 'direction'],
                ['%{BKY_SENSE_HAT_GET_EVENT_ACTION}', 'action'],
            ]

        }],
        "output": "String",
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_GET_EVENT_ACTION_DIRECTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // get_event_joystick
    {
        'type': 'sensehat_get_event_joystick',
        'message0': '%{BKY_SENSE_HAT_GET_EVENT_JOYSTICK_TITLE}',
        // 'output': 'Array',
        'previousStatement': null,
        'nextStatement': null,
        'style': 'senseHat_blocks',
        'tooltip': '%{BKY_SENSE_HAT_GET_EVENT_JOYSTICK_TOOLTIP}',
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // IMU (inertial measurement unit)
    {
        "type": "sensehat_set_imu_config",
        "message0": "%{BKY_SENSE_HAT_SET_IMU_CONFIG_TITLE}",
        "args0": [{
            'type': 'field_grid_dropdown',
            'name': 'IMU_CONFIG_GYRO',
            'options': [
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_ON}', 'True'],
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_OFF}', 'False'],
            ]
        },
        {
            "type": "input_dummy"
        },
        {
            'type': 'field_grid_dropdown',
            'name': 'IMU_CONFIG_ACCEL',
            'options': [
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_ON}', 'True'],
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_OFF}', 'False'],
            ]
        },
        {
            "type": "input_dummy"
        },
        {
            'type': 'field_grid_dropdown',
            'name': 'IMU_CONFIG_COMPASS',
            'options': [
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_ON}', 'True'],
                ['%{BKY_SENSE_HAT_SET_IMU_CONFIG_OFF}', 'False'],
            ]

        }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_SET_IMU_CONFIG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // get_orientation_radians
    {
        "type": "sensehat_imu_get_orientation",
        "message0": "%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_TITLE}",
        "args0": [{
            'type': 'field_grid_dropdown',
            'name': 'ORIENTATION',
            'options': [
                ['%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_RADIANS}', 'radians'],
                ['%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_DEGREES}', 'degrees'],
            ]
        }
        ],
        "output": "Array",
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    // get_orientation_degrees
    // {
    //     "type": "sensehat_imu_get_orientation_degrees",
    //     "message0": "%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_TITLE}",
    //     "output": "Array",
    //     "style": "senseHat_blocks",
    //     "tooltip": "%{BKY_SENSE_HAT_IMU_GET_ORIENTATION_DEGREES_TOOLTIP}",
    // },
    // compass
    {
        "type": "sensehat_imu_get_compass",
        "message0": "%{BKY_SENSE_HAT_IMU_GET_COMPASS_TITLE}",
        "output": "Number",
        "style": "senseHat_blocks",
        "tooltip": "%{BKY_SENSE_HAT_IMU_GET_COMPASS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    }
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Display = Object.create(null);

/**
 * Performs setup of 'show_leds' block for screen checkboxes display.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION = function () {
    for (var row = 0; row < 8; row++) {
        let rowBoxes = this.appendDummyInput("ROW" + row);
        for (var column = 0; column < 8; column++) {
            const box = new Blockly.FieldCheckboxColor(0, { 'height': 28, 'width': 24 });
            rowBoxes.appendField(box, "LED" + row + "" + column);
        }
    }
};

// Initialization extensions
Blockly.Extensions.register("show_leds_screen_init",
    Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION);