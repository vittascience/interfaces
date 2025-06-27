/**
 * @fileoverview Display blocks for Galaxia.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Start Galaxia RGB LED blocks */

    // BLOCK SET GALAXIA LED COLORS
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
        "helpUrl": VITTASCIENCE_SITE,
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
        "helpUrl": VITTASCIENCE_SITE,
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
        "helpUrl": VITTASCIENCE_SITE,
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
        "helpUrl": VITTASCIENCE_SITE,
    },

    // BLOCK GET GALAXIA LED RED INTENSITY
    {
        "type": "display_galaxia_led_get_red",
        "message0": "%{BKY_DISPLAY_GALAXIA_LED_GET_RED_TITLE}",
        "output": "Number",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_LED_GET_RED_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    // BLOCK GET GALAXIA LED GREEN INTENSITY
    {
        "type": "display_galaxia_led_get_green",
        "message0": "%{BKY_DISPLAY_GALAXIA_LED_GET_GREEN_TITLE}",
        "output": "Number",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_LED_GET_GREEN_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
    },

    // BLOCK GET GALAXIA LED BLUE INTENSITY
    {
        "type": "display_galaxia_led_get_blue",
        "message0": "%{BKY_DISPLAY_GALAXIA_LED_GET_BLUE_TITLE}",
        "output": "Number",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_LED_GET_BLUE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
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
            ],
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GALAXIA_SET_MODE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE,
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
        "helpUrl": VITTASCIENCE_SITE,
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
        "helpUrl": VITTASCIENCE_SITE,
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
        "helpUrl": VITTASCIENCE_SITE,
        "extensions": [
            "disable_duplicates"
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
        "helpUrl": VITTASCIENCE_SITE
    },

    // GROVE I2C LCD1602 RGB MODULE _ CLEAR SCREEN JSON
    {
        "type": "display_lcdClear",
        "message0": "%{BKY_DISPLAY_LCD_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_CLEAR_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/heart.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HEART"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/happy.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HAPPY"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/sad.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SAD"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/yes.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "YES"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/no.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "NO"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/man.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "STICKFIGURE"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/pitchfork.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "PITCHFORK"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/umbrella.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "UMBRELLA"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/skull.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SKULL"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/chessboard.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "CHESSBOARD"],
                [{
                    'src': _PATH + '/galaxia/assets/media/blocks_icons/butterfly.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "BUTTERFLY"]
            ]
        }, {
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
        "tooltip": "%{BKY_DISPLAY_OLED_DRAWICON_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK NEOPIXEL _ DEFINE NEOPIXEL
    {
        "type": "display_defineNeopixel",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TITLE}",
        "args0": [{
            "type": "field_slider",
            "name": "N",
            "value": 20,
            "min": 1,
            "max": 1000
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
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
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK SET TRAFFIC LIGHT
    {
        "type": "display_setTrafficLight",
        "message0": "%{BKY_DISPLAY_TRAFFICLIGHT_SETLED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": [
                ["%{BKY_DISPLAY_TRAFFICLIGHT_RED}", "pin0"],
                ["%{BKY_DISPLAY_TRAFFICLIGHT_ORANGE}", "pin1"],
                ["%{BKY_DISPLAY_TRAFFICLIGHT_GREEN}", "pin2"]
            ]
        }, {
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_TRAFFICLIGHT_SETLED_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    /* Start morpion blocks */

    // BLOCK MORPION NEW GAME
    {
        "type": "display_morpionNewGame",
        "message0": "%{BKY_DISPLAY_MORPION_NEWGAME_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_MORPION_NEWGAME_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MORPION MOVE CURSOR
    {
        "type": "display_morpionMoveCursor",
        "message0": "%{BKY_DISPLAY_MORPION_MOVECURSOR_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_MORPION_MOVECURSOR_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MORPION SET CROSSES/CIRCLE
    {
        "type": "display_morpionSetPlayerFigure",
        "message0": "%{BKY_DISPLAY_MORPION_SETPLAYERFIGURE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "FIGURE",
            "options": [
                ["%{BKY_DISPLAY_MORPION_CROSS}", "X"],
                ["%{BKY_DISPLAY_MORPION_CIRCLE}", "O"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_MORPION_SETPLAYERFIGURE_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    },

    // BLOCK MORPION IS END GAME
    {
        "type": "display_morpionIsEndGame",
        "message0": "%{BKY_DISPLAY_MORPION_ISENDGAME_TITLE}",
        "inputsInline": true,
        "output": "Boolean",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_MORPION_ISENDGAME_TOOLTIP}",
        "helpUrl": VITTASCIENCE_SITE
    }

]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Display = Object.create(null);