/**
 * @fileoverview Display blocks for Esp32.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Start Galaxia RGB LED blocks */

    // BLOCK SET GALAXIA LED COLORS
    {
        "type": "display_galaxia_screen_set_text",
        "message0": "%{BKY_DISPLAY_GALAXIA_SCREEN_SET_TEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SCREEN_SET_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "display_galaxia_screen_set_text_value",
        "message0": "%{BKY_DISPLAY_GALAXIA_SCREEN_SET_TEXT_VALUE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
        },
        {
            "type": "input_value",
            "name": "VALUE",
            "check": "Number",
        },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SCREEN_SET_TEXT_VALUE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "display_galaxia_led_set_colors",
        "message0": "%{BKY_DISPLAY_GALAXIA_SET_LED_COLORS_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "RED",
            "check": "Number",
        }, {
            "type": "input_value",
            "name": "GREEN",
            "check": "Number",
        }, {
            "type": "input_value",
            "name": "BLUE",
            "check": "Number",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SET_LED_COLORS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SET GALAXIA LED RED INTENSITY
    {
        "type": "display_galaxia_led_set_red",
        "message0": "%{BKY_DISPLAY_GALAXIA_LED_RED_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "RED",
            "check": "Number",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_LED_RED_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SET GALAXIA LED GREEN INTENSITY
    {
        "type": "display_galaxia_led_set_green",
        "message0": "%{BKY_DISPLAY_GALAXIA_LED_GREEN_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "GREEN",
            "check": "Number",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_LED_GREEN_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK SET GALAXIA LED BLUE INTENSITY
    {
        "type": "display_galaxia_led_set_blue",
        "message0": "%{BKY_DISPLAY_GALAXIA_LED_BLUE_CONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "BLUE",
            "check": "Number",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_LED_BLUE_CONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    /* Start graphics blocks */

    //BLOCK DISPLAY SET MODE
    {
        "type": "display_galaxia_set_mode",
        "message0": "%{BKY_DISPLAY_GALAXIA_SET_MODE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "MODE",
            "options": [
                ["%{BKY_DISPLAY_GALAXIA_SET_MODE_PLOT}", "plot.show"],
                ["%{BKY_DISPLAY_GALAXIA_SET_MODE_CONSOLE}", "console.show"],
                ["%{BKY_DISPLAY_GALAXIA_SET_MODE_GRAPHICS}", "raw.show"],
            ],
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SET_MODE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK PLOT ADD POINT
    {
        "type": "display_galaxia_plot_add_point",
        "message0": "%{BKY_DISPLAY_GALAXIA_PLOT_ADD_POINT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "POINT",
                "check": "Number",
            }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_PLOT_ADD_POINT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK PLOT SET Y SCALE
    {
        "type": "display_galaxia_plot_set_y_scale",
        "message0": "%{BKY_DISPLAY_GALAXIA_PLOT_SET_Y_SCALE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "MIN",
            "check": "Number",
        }, {
            "type": "input_value",
            "name": "MAX",
            "check": "Number",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_PLOT_SET_Y_SCALE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK DISPLAY ANIMATE FUNCTION
    {
        "type": "display_galaxia_animate_function",
        "message0": "%{BKY_DISPLAY_GALAXIA_ANIMATE_FUNCTION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "INTERVAL",
            "check": "Number",
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO",
        }],
        "message2": "%{BKY_DISPLAY_GALAXIA_ANIMATE_FUNCTION_NEW_POINT}",
        "args2": [{
            "type": "input_value",
            "align": "right",
            "name": "POINT",
        }],
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_ANIMATE_FUNCTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "disable_duplicates"
        ],
    },
    {
        "type": "display_galaxia_raw_print",
        "message0": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
        },{
            "type": "input_value",
            "name": "X",
        }, {
            "type": "input_value",
            "name": "Y",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    {
        "type": "display_galaxia_raw_text",
        "message0": "%{BKY_DISPLAY_GALAXIA_RAW_TEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
        }, {
            "type": "input_value",
            "name": "X",
        }, {
            "type": "input_value",
            "name": "Y",
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_RAW_TEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "display_galaxia_raw_print_img",
        "message0": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_IMG_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "IMAGE",
        }
        , {
            "type": "input_value",
            "name": "X",
        }, {
            "type": "input_value",
            "name": "Y",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_RAW_PRINT_IMG_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    {
        "type": "display_galaxia_raw_rect",
        "message0": "%{BKY_DISPLAY_GALAXIA_RAW_RECT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
        }, {
            "type": "input_value",
            "name": "Y",
        }, {
            "type": "input_value",
            "name": "W",
        }, {
            "type": "input_value",
            "name": "H",
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_RAW_RECT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },
    

    /* Start external screens blocks */

    // GROVE I2C LCD1602 RGB MODULE _ SET TEXT JSON
    {
        "type": "display_lcdSetText",
        "message0": "%{BKY_DISPLAY_LCD_SETTEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "field_grid_dropdown",
            "name": "LINE",
            "options": [
                ["0", "0"],
                ["1", "1"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "POS",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
                ["9", "9"],
                ["10", "10"],
                ["11", "11"],
                ["12", "12"],
                ["13", "13"],
                ["14", "14"],
                ["15", "15"],
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_SETTEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE I2C LCD1602 RGB MODULE _ CLEAR SCREEN JSON
    {
        "type": "display_lcdClear",
        "message0": "%{BKY_DISPLAY_LCD_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED ADD TEXT
    {
        "type": "display_addOledText",
        "message0": "%{BKY_DISPLAY_OLED_ADDTEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_ADDTEXT_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED SET PIXEL
    {
        "type": "display_setOledPixel",
        "message0": "%{BKY_DISPLAY_OLED_SETPIXEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_SETPIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED DRAW LINE
    {
        "type": "display_drawOledLine",
        "message0": "%{BKY_DISPLAY_OLED_DRAWLINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "XA",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YA",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "XB",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "YB",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_DRAWLINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED SHOW ICON
    {
        "type": "display_showOledIcon",
        "message0": "%{BKY_DISPLAY_OLED_DRAWICON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ICON",
            "options": [
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/heart.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HEART"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/happy.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HAPPY"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/sad.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SAD"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/yes.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "YES"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/no.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "NO"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/man.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "MAN"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/fork.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "FORK"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/umbrella.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "UMBRELLA"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/skull.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SKULL"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/grid.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "GRID"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/butterfly.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "BUTTERFLY"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/sword.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SWORD"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/wine.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "WINE"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/lock.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "LOCK"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/net.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "NET"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/battery1.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "BATTERY1"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/battery2.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "BATTERY2"],
                [{
                    'src': _PATH + '/arduino/assets/media/blocks_icons/battery3.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "BATTERY3"]
            ]
        }, {
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_DRAWICON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED CLEAR DISPLAY
    {
        "type": "display_clearOledScreen",
        "message0": "%{BKY_DISPLAY_OLED_CLEARSCREEN_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_CLEARSCREEN_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK OLED SET BACKGROUND
    {
        "type": "display_setOledBackground",
        "message0": "%{BKY_DISPLAY_OLED_SETBACKGROUND_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BACKGROUND",
            "options": [
                ["%{BKY_DISPLAY_OLED_WHITE}", "1"],
                ["%{BKY_DISPLAY_OLED_BLACK}", "0"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_SETBACKGROUND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Start led module blocks */

    // GROVE LED MODULE _ WRITE DIGITAL JSON
    {
        "type": "display_setGroveSocketLed",
        "message0": "%{BKY_DISPLAY_SETGROVELED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SETGROVELED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // LED MODULE _ WRITE ANALOG PWM
    {
        "type": "display_setLEDintensity",
        "message0": "%{BKY_DISPLAY_SETLEDINTENSITY_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SETLEDINTENSITY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // LED MODULE _ SET VARIABLE COLOR
    {
        "type": "display_setVariableColorLED",
        "message0": "%{BKY_DISPLAY_SET_VARIABLE_COLOR_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SET_VARIABLE_COLOR_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK NEOPIXEL _ DEFINE NEOPIXEL
    {
        "type": "display_defineNeopixel",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "N",
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED
    {
        "type": "display_controlNeopixelLed",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_LEDCONTROL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "display_controlColorNeopixelLed",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL ALL NEOPIXEL LED WITH COLOR
    {
        "type": "display_neopixel_controlAllLedRGB",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDRGB_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDRGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "display_neopixel_controlAllLedPalette",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETALLLEDCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RAINBOW NEOPIXEL
    {
        "type": "display_rainbowNeopixel",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_RAINBOW_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_RAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET NUMBER GROVE 4DIGIT
    {
        "type": "display_setNumberGrove4Digit",
        "message0": "%{BKY_DISPLAY_4DIGIT_SETNUMBER_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "SHOW",
            "options": [
                ["%{BKY_DISPLAY_4DIGIT_NUMBER}", "NUM"],
                ["%{BKY_DISPLAY_4DIGIT_TEMPERATURE}", "TEMP"]
            ]
        }, {
            "type": "input_value",
            "name": "N",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "CLK",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIO",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_4DIGIT_SETNUMBER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GROVE 4DIGIT SET CLOCK
    {
        "type": "display_setClockGrove4Digit",
        "message0": "%{BKY_DISPLAY_4DIGIT_SETCLOCK_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "CLK",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIO",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_4DIGIT_SETCLOCK_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE LED BAR MODULE _  DISPLAY JSON
    {
        "type": "display_setLevelLedBar",
        "message0": "%{BKY_DISPLAY_MY9221_SET_LEVEL_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "DI",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DCKI",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_MY9221_SET_LEVEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE LED BAR MODULE _  REVERSE JSON
    {
        "type": "display_my9221_reverse",
        "message0": "%{BKY_DISPLAY_MY9221_REVERSE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }, {
            "type": "field_grid_dropdown",
            "name": "DI",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DCKI",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_MY9221_REVERSE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE CHAINABLE LED RGB MODULE _ DEFINE MODULE
    {
        "type": "display_defineChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLERGBLED_DEFINE_TITLE}",
        "args0": [{
            "type": "field_slider",
            "name": "N",
            "value": 1,
            "min": 1,
            "max": 100
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLERGBLED_DEFINE_TOOLTIP}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE CHAINABLE LED RGB MODULE _ SET COLOR
    {
        "type": "display_setColorChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_RGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_RGBLED_TOOLTIP}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE CHAINABLE LED RGB MODULE _ SET PALETTE COLOR
    {
        "type": "display_setPaletteColorChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_PALETTERGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_PALETTERGBLED_TOOLTIP}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE ALL CHAINABLE LED RGB MODULE _ SET COLOR
    {
        "type": "display_setColorAllChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_ALLRGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "G",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_ALLRGBLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE ALL CHAINABLE LED RGB MODULE _ SET PALETTE COLOR
    {
        "type": "display_setPaletteAllChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_PALETTEALLRGBLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_PALETTEALLRGBLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE ALL CHAINABLE LED RGB MODULE _ RESET
    {
        "type": "display_resetAllChainableRGBLed",
        "message0": "%{BKY_DISPLAY_CHAINABLE_RESETALLRGBLED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "CIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.GALAXIA_PINS
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_RESETALLRGBLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)