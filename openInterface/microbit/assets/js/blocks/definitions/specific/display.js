/**
 * @fileoverview Display blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /* Start microbit screen blocks */

    //BLOCK SHOW LEDS
    {
        "type": "show_leds",
        "message0": "%{BKY_SHOW_LEDS_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SHOW_LEDS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "show_leds_screen_init"
        ]
    },

    //BLOCK SHOW NUMBER
    {
        "type": "show_number",
        "message0": "%{BKY_SHOW_NUMBER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SHOW_NUMBER_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK SHOW STRING
    {
        "type": "show_string",
        "message0": "%{BKY_SHOW_STRING_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SHOW_STRING_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "show_string_extension"
        ],
        "mutator": "show_string_mutator"
    },

    //BLOCK SHOW ICON
    {
        "type": "show_icon",
        "message0": "%{BKY_SHOW_ICON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ICON",
            "options": [
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/heart.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HEART"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/happy.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HAPPY"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/sad.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SAD"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/yes.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "YES"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/no.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "NO"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/man.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "STICKFIGURE"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/pitchfork.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "PITCHFORK"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/umbrella.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "UMBRELLA"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/skull.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SKULL"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/chessboard.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "CHESSBOARD"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/butterfly.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "BUTTERFLY"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SHOW_ICON_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // const defaultImages = ['HAPPY', 'SAD', 'CONFUSED', 'ANGRY', 'ASLEEP', 'SURPRISED', 'SILLY', 'FABULOUS', 'MEH', 'YES', 'NO', 'CLOCK12', 'CLOCK1', 'CLOCK2', 'CLOCK3', 'CLOCK4', 'CLOCK5', 'CLOCK6', 'CLOCK7', 'CLOCK8', 'CLOCK9', 'CLOCK10', 'CLOCK11', 'ARROW_N', 'TRIANGLE', 'TRIANGLE_LEFT', 'CHESSBOARD', 'DIAMOND', 'DIAMOND_SMALL', 'SQUARE', 'SQUARE_SMALL', 'RABBIT', 'COW', 'MUSIC_CROTCHET', 'MUSIC_QUAVER', 'MUSIC_QUAVERS', 'PITCHFORK', 'XMAS', 'PACMAN', 'TARGET', 'TSHIRT', 'ROLLERSKATE', 'DUCK', 'HOUSE', 'TORTOISE', 'BUTTERFLY', 'STICKFIGURE', 'GHOST', 'SWORD', 'GIRAFFE', 'SKULL', 'UMBRELLA', 'SNAKE'];

    {
        "type": "show_icon_simple",
        "message0": "%{BKY_SHOW_ICON_SIMPLE_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ICON",
            "options": [
                ["HEART", "HEART"],
                ["HEART_SMALL", "HEART_SMALL"],
                ["HAPPY", "HAPPY"],
                ["SMILE", "SMILE"],
                ["SAD", "SAD"],
                ["CONFUSED", "CONFUSED"],
                ["ANGRY", "ANGRY"],
                ["ASLEEP", "ASLEEP"],
                ["SURPRISED", "SURPRISED"],
                ["SILLY", "SILLY"],
                ["FABULOUS", "FABULOUS"],
                ["MEH", "MEH"],
                ["YES", "YES"],
                ["NO", "NO"],
                ["CLOCK12", "CLOCK12"],
                ["CLOCK11", "CLOCK11"],
                ["CLOCK10", "CLOCK10"],
                ["CLOCK9", "CLOCK9"],
                ["CLOCK8", "CLOCK8"],
                ["CLOCK7", "CLOCK7"],
                ["CLOCK6", "CLOCK6"],
                ["CLOCK5", "CLOCK5"],
                ["CLOCK4", "CLOCK4"],
                ["CLOCK3", "CLOCK3"],
                ["CLOCK2", "CLOCK2"],
                ["CLOCK1", "CLOCK1"],
                ["ARROW_N", "ARROW_N"],
                ["ARROW_NE", "ARROW_NE"],
                ["ARROW_E", "ARROW_E"],
                ["ARROW_SE", "ARROW_SE"],
                ["ARROW_S", "ARROW_S"],
                ["ARROW_SW", "ARROW_SW"],
                ["ARROW_W", "ARROW_W"],
                ["ARROW_NW", "ARROW_NW"],
                ["TRIANGLE", "TRIANGLE"],
                ["TRIANGLE_LEFT", "TRIANGLE_LEFT"],
                ["CHESSBOARD", "CHESSBOARD"],
                ["DIAMOND", "DIAMOND"],
                ["DIAMOND_SMALL", "DIAMOND_SMALL"],
                ["SQUARE", "SQUARE"],
                ["SQUARE_SMALL", "SQUARE_SMALL"],
                ["RABBIT", "RABBIT"],
                ["COW", "COW"],
                ["MUSIC_CROTCHET", "MUSIC_CROTCHET"],
                ["MUSIC_QUAVER", "MUSIC_QUAVER"],
                ["MUSIC_QUAVERS", "MUSIC_QUAVERS"],
                ["PITCHFORK", "PITCHFORK"],
                ["XMAS", "XMAS"],
                ["PACMAN", "PACMAN"],
                ["TARGET", "TARGET"],
                ["TSHIRT", "TSHIRT"],
                ["ROLLERSKATE", "ROLLERSKATE"],
                ["DUCK", "DUCK"],
                ["HOUSE", "HOUSE"],
                ["TORTOISE", "TORTOISE"],
                ["BUTTERFLY", "BUTTERFLY"],
                ["STICKFIGURE", "STICKFIGURE"],
                ["GHOST", "GHOST"],
                ["SWORD", "SWORD"],
                ["GIRAFFE", "GIRAFFE"],
                ["SKULL", "SKULL"],
                ["UMBRELLA", "UMBRELLA"],
                ["SNAKE", "SNAKE"]
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SHOW_ICON_SIMPLE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },


    //BLOCK SHOW CLOCK ICON
    {
        "type": "show_clock",
        "message0": "%{BKY_SHOW_CLOCK_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "CLOCK",
            "check": "Number"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SHOW_CLOCK_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK SHOW ARROW ICON
    {
        "type": "show_arrow",
        "message0": "%{BKY_SHOW_ARROW_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ARROW",
            "options": [
                ["Nord", "N"],
                ["Nord-Est", "NE"],
                ["Est", "E"],
                ["Sud-Est", "SE"],
                ["Sud", "S"],
                ["Sud-Ouest", "SW"],
                ["Ouest", "W"],
                ["Nord-Ouest", "NW"],
            ]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SHOW_ARROW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SHOW GAUGE
    {
        "type": "display_show_gauge",
        "message0": "%{BKY_SHOW_GAUGE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "MAX",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SHOW_GAUGE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK PLOT BAR GRAPH
    {
        "type": "display_plot_bar_graph",
        "message0": "%{BKY_PLOT_BAR_GRAPH_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_PLOT_BAR_GRAPH_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "plot_bar_graph_extension"
        ],
        "mutator": "plot_bar_graph_mutator"
    },

    // BLOCK SET PIXEL
    {
        "type": "set_pixel",
        "message0": "%{BKY_SET_PIXEL_TITLE}",
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
        "tooltip": "%{BKY_SET_PIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GET PIXEL STATE
    {
        "type": "get_pixelState",
        "message0": "%{BKY_GET_PIXEL_STATE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "inputsInline": true,
        "output": "Boolean",
        "style": "display_blocks",
        "tooltip": "%{BKY_GET_PIXEL_STATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK TOGGLE PIXEL
    {
        "type": "toggle_pixelState",
        "message0": "%{BKY_TOGGLE_PIXEL_STATE_TITLE}",
        "args0": [{
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
        "tooltip": "%{BKY_TOGGLE_PIXEL_STATE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET LIGHT PIXEL
    {
        "type": "set_light_pixel",
        "message0": "%{BKY_SET_LIGHT_PIXEL_TITLE}",
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
            "name": "LIGHT",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SET_LIGHT_PIXEL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET PIXELS BRIGHTNESS
    {
        "type": "set_brightness",
        "message0": "%{BKY_SET_BRIGHTNESS_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_SET_BRIGHTNESS_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    //BLOCK SCREEN CLEAR
    {
        "type": "clear",
        "message0": "%{BKY_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
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

    // BLOCK OLED SHOW ICON
    {
        "type": "display_showOledIcon",
        "message0": "%{BKY_DISPLAY_OLED_DRAWICON_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ICON",
            "options": [
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/heart.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HEART"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/happy.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "HAPPY"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/sad.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SAD"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/yes.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "YES"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/no.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "NO"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/man.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "STICKFIGURE"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/pitchfork.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "PITCHFORK"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/umbrella.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "UMBRELLA"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/skull.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "SKULL"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/chessboard.png',
                    'width': 32,
                    'height': 32,
                    'alt': 'Red'
                }, "CHESSBOARD"],
                [{
                    'src': _PATH + '/microbit/assets/media/blocks_icons/butterfly.png',
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "options": Blockly.Constants.Pins.MICROBIT_PWM_PINS
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
            "options": Blockly.Constants.Pins.MICROBIT_PWM_PINS
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
            "type": "field_slider",
            "name": "N",
            "value": 20,
            "min": 1,
            "max": 1000
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
    // {
    //     "type": "display_defineNeopixel",
    //     "message0": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TITLE}",
    //     "args0": [{
    //         "type": "input_value",
    //         "name": "N",
    //     }, {
    //         "type": "field_grid_dropdown",
    //         "name": "PIN",
    //         "options": Blockly.Constants.Pins.MICROBIT_PINS
    //     }],
    //     "inputsInline": true,
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "style": "display_blocks",
    //     "tooltip": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TOOLTIP}",
    //     "extensions": [
    //        "block_init_helpurl"
    //     ]
    // },

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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIO",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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

    // BLOCKS ZIP HALO LED KITRONIK
    {
        "type": "display_controlZipHaloLed",
        "message0": "%{BKY_DISPLAY_ZIP_HALO_LED_LEDCONTROL_TITLE}",
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
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_ZIP_HALO_LED_LEDCONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_controlColorZipHaloLed",
        "message0": "%{BKY_DISPLAY_ZIP_HALO_LED_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_ZIP_HALO_LED_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_ZipHaloLed_controlAllLedRGB",
        "message0": "%{BKY_DISPLAY_ZIP_HALO_LED_SETALLLEDRGB_TITLE}",
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
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_ZIP_HALO_LED_SETALLLEDRGB_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_ZipHaloLed_controlAllLedPalette",
        "message0": "%{BKY_DISPLAY_ZIP_HALO_LED_SETALLLEDCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_ZIP_HALO_LED_SETALLLEDCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    {
        "type": "display_ZipHaloLed_rainbow",
        "message0": "%{BKY_DISPLAY_ZIP_HALO_LED_RAINBOW_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_ZIP_HALO_LED_RAINBOW_TOOLTIP}",
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DIO",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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

    // GROVE LED BAR MODULE _  LEVEL JSON
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DCKI",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
            "options": Blockly.Constants.Pins.MICROBIT_PINS
        }, {
            "type": "field_grid_dropdown",
            "name": "DCKI",
            "options": Blockly.Constants.Pins.MICROBIT_PINS
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
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK SET STREET LIGHT
    {
        "type": "display_setLampBitLight",
        "message0": "%{BKY_DISPLAY_LAMPBIT_SETLED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LAMPBIT_SETLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK RGB LED MATRIX 8*8
    {
        "type": "display_rgb_led_matrix_DrawBitmap",
        "message0": "%{BKY_DISPLAY_RGB_LED_MATRIX_TITLE}",
        "args0": [
            {
                "type": "field_image",
                "name": "RGB_LEDS_MATRIX",
                "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtYXRyaXhfcmdiIiB3aWR0aD0iMjcyIiBoZWlnaHQ9IjI3MiIgdmlld0JveD0iMCAwIDI3MiAyNzIgIj48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMTA1IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIxMzkiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjE3MyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMjA3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIyNDEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjwvc3ZnPg==",
                "width": 40,
                "height": 40,
                "alt": "#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000,#ffffff,#ffffff,#ffffff,#000000,#000000,#ffffff,#ffffff,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#000000,#ffffff,#000000,#000000,#ffffff,#000000,#ffffff,#ffffff,#ffffff,#ffffff,#000000,#000000,#ffffff,#ffffff,#ffffff,#000000,#000000,#000000,#ffffff,#ffffff,#000000,#000000,#000000",
            },
            {
                "type": "field_input",
                "name": "HIDDEN_RGB_LEDS_MATRIX"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RGB_LED_MATRIX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "block_buttons_plus_minus",
            "show_rgb_leds_matrix",
            "display_led_matrix_duration_init_extension"
        ],
        "mutator": "display_led_matrix_duration_mutator",
    },

    {
        "type": "display_rgb_led_matrix_stopDisplay",
        "message0": "%{BKY_DISPLAY_RGB_LED_MATRIX_STOPDISPLAY_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_RGB_LED_MATRIX_STOPDISPLAY_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK MONOCHROME LED MATRIX 8*8
    {
        "type": "display_led_matrix_DrawBitmap",
        "message0": "%{BKY_DISPLAY_LED_MATRIX_TITLE}",
        "args0": [
            {
                "type": "field_image",
                "name": "LEDS_MATRIX",
                "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJtYXRyaXgiIHdpZHRoPSIyNzIiIGhlaWdodD0iMjcyIiB2aWV3Qm94PSIwIDAgMjcyIDI3MiAiPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIzIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIzNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjM3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMzciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSI3MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjcxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iNzEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMTA1IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIxMDUiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjEwNSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIxMzkiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjEzOSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMTM5IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjMiIHk9IjE3MyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzNyIgeT0iMTczIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjcxIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTA1IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTM5IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMTczIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjA3IiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMjQxIiB5PSIxNzMiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMyIgeT0iMjA3IiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjM3IiB5PSIyMDciIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZTYzNzM3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iNzEiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMDUiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxMzkiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIxNzMiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyMDciIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNlNjM3MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIyNDEiIHk9IjIwNyIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSIzIiB5PSIyNDEiIHJ4PSIxMiIgcnk9IjEyIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiLz48cmVjdCBmaWxsPSIjZjVmNWY1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iI0UwRTVFQiIgeD0iMzciIHk9IjI0MSIgcng9IjEyIiByeT0iMTIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIvPjxyZWN0IGZpbGw9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSIjRTBFNUVCIiB4PSI3MSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEwNSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2U2MzczNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjEzOSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjE3MyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjIwNyIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PHJlY3QgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNFMEU1RUIiIHg9IjI0MSIgeT0iMjQxIiByeD0iMTIiIHJ5PSIxMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+PC9zdmc+",
                "width": 40,
                "height": 40,
                "alt": '01111110,01000010,01111110,00000001,00000001,01111110,01000010,01111110',
            },
            {
                "type": "field_input",
                "name": "HIDDEN_MONO_LEDS_MATRIX"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_MATRIX_TOOLTIP}",
        "extensions": [
            "block_init_helpurl",
            "show_leds_matrix",
            "display_mono_led_matrix_init_extension"
        ]
    },

    {
        "type": "display_led_matrix_clear",
        "message0": "%{BKY_DISPLAY_LED_MATRIX_CLEAR_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LED_MATRIX_CLEAR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
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
        "extensions": [
            "block_init_helpurl"
        ]
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
        "extensions": [
            "block_init_helpurl"
        ]
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
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK MORPION IS END GAME
    {
        "type": "display_morpionIsEndGame",
        "message0": "%{BKY_DISPLAY_MORPION_ISENDGAME_TITLE}",
        "inputsInline": true,
        "output": "Boolean",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_MORPION_ISENDGAME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    /* Start games blocks */

    // BLOCK GAMES _ CREATE SPRITE
    {
        "type": "display_games_createSprite",
        "message0": "%{BKY_DISPLAY_GAMES_CREATESPRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "X",
            "check": "Number"
        }, {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
        }],
        "inputsInline": true,
        "output": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_CREATESPRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMES _ DELETE SPRITE
    {
        "type": "display_games_deleteSprite",
        "message0": "%{BKY_DISPLAY_GAMES_DELETESPRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPRITE"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_DELETESPRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMES _ IS SPRITE DELETED
    {
        "type": "display_games_isSpriteDeleted",
        "message0": "%{BKY_DISPLAY_GAMES_ISSPRITEDELETED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPRITE"
        }],
        "inputsInline": true,
        "output": "Boolean",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_ISSPRITEDELETED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMES _ MOVE SPRITE
    {
        "type": "display_games_moveSprite",
        "message0": "%{BKY_DISPLAY_GAMES_MOVESPRITE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPRITE"
        }, {
            "type": "input_value",
            "name": "STEP",
            "check": "Number"
        }, {
            "type": "field_grid_dropdown",
            "name": "DIR",
            "options": [
                ["%{BKY_DISPLAY_GAMES_LEFT}", "LEFT"],
                ["%{BKY_DISPLAY_GAMES_RIGHT}", "RIGHT"],
                ["%{BKY_DISPLAY_GAMES_UP}", "UP"],
                ["%{BKY_DISPLAY_GAMES_DOWN}", "DOWN"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_MOVESPRITE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMES _ SPRITE POSITION
    {
        "type": "display_games_getSpritePosition",
        "message0": "%{BKY_DISPLAY_GAMES_GETSPRITEPOSITION_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "SPRITE"
        }, {
            "type": "field_grid_dropdown",
            "name": "POS",
            "options": [
                ["x", "x"],
                ["y", "y"]
            ]
        }],
        "inputsInline": true,
        "output": "Number",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_GETSPRITEPOSITION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMES _ CHANGE SCORE
    {
        "type": "display_games_changeScore",
        "message0": "%{BKY_DISPLAY_GAMES_CHANGESCORE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "N",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_CHANGESCORE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMES _ GET SCORE
    {
        "type": "display_games_getScore",
        "message0": "%{BKY_DISPLAY_GAMES_GETSCORE_TITLE}",
        "inputsInline": true,
        "output": "Number",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_GETSCORE_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMES _ STOP GAME
    {
        "type": "display_games_stopGame",
        "message0": "%{BKY_DISPLAY_GAMES_STOPGAME_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_STOPGAME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMES _ IS END GAME ?
    {
        "type": "display_games_isEndGame",
        "message0": "%{BKY_DISPLAY_GAMES_ISENDGAME_TITLE}",
        "inputsInline": true,
        "output": "Boolean",
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_ISENDGAME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // BLOCK GAMES _ RESTART GAME
    {
        "type": "display_games_restartGame",
        "message0": "%{BKY_DISPLAY_GAMES_RESTARTGAME_TITLE}",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_GAMES_RESTARTGAME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Display = Object.create(null);

/**
 * Performs setup of 'show_leds' block for screen checkboxes display.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION = function () {
    for (var row = 0; row < 5; row++) {
        let rowBoxes = this.appendDummyInput("ROW" + row);
        for (var column = 0; column < 5; column++) {
            const box = new Blockly.FieldCheckboxColor(0, { 'height': 28, 'width': 24 });
            rowBoxes.appendField(box, "LED" + row + "" + column);
        }
    }
};

Blockly.Constants.Display.DISPLAY_MONO_LED_MATRIX_INIT_EXTENSION = function () {
    this.getField('HIDDEN_MONO_LEDS_MATRIX').setVisible(false);
    if (typeof Blockly.Wiki === 'undefined') {
        Main.getWorkSpace().addChangeListener(async function (e) {
            await new Promise(r => setTimeout(r, 1000)); //just to wait for the last event
            if (e.type === Blockly.Events.FINISHED_LOADING) {
                LedMatrixModalManager.updateImageMono();
            }
        });
    }
};

/**
 * Performs final setup of 'display_led_matrix' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_LED_MATRIX_DURATION_INIT_EXTENSION = function () {
    this.getField('HIDDEN_RGB_LEDS_MATRIX').setVisible(false);
    if (typeof Blockly.Wiki === 'undefined') {
        Main.getWorkSpace().addChangeListener(async function (e) {
            await new Promise(r => setTimeout(r, 1000));
            if (e.type === Blockly.Events.FINISHED_LOADING) {
                LedMatrixModalManager.updateImageRGB();
            }
        });
    }
    this.duration_ = false;
    this.update_(this.updateField_);
};

/**
 * Performs final setup of 'show_string' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_SHOW_STRING_INIT_EXTENSION = function () {
    this.option_ = false;
    this.update_(this.updateField_);
};

Blockly.Constants.Display.DISPLAY_SHOW_STRING_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('speed', 'DISPLAY_SHOW_STRING_DELAY', 'input', 150);


/**
 * Performs final setup of 'plot_graphe-bar' block.
 * @this {Blockly.Block}
 */
Blockly.Constants.Display.DISPLAY_PLOT_BAR_GRAPH_INIT_EXTENSION = function () {
    this.option_ = false;
    this.update_(this.updateField_);
};

Blockly.Constants.Display.DISPLAY_PLOT_BAR_GRAPH_MUTATOR_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('to', 'PLOT_BAR_GRAPH_TO', 'input', 0);

Blockly.Extensions.register("display_mono_led_matrix_init_extension",
    Blockly.Constants.Display.DISPLAY_MONO_LED_MATRIX_INIT_EXTENSION);

// Initialization extensions
Blockly.Extensions.register("show_leds_screen_init",
    Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION);

Blockly.Extensions.register("show_string_extension",
    Blockly.Constants.Display.DISPLAY_SHOW_STRING_INIT_EXTENSION);

Blockly.Extensions.register("plot_bar_graph_extension",
    Blockly.Constants.Display.DISPLAY_PLOT_BAR_GRAPH_INIT_EXTENSION);

// Mutators
Blockly.Extensions.registerMutator('show_string_mutator',
    Blockly.Constants.Display.DISPLAY_SHOW_STRING_MUTATOR_MIXIN);

Blockly.Extensions.registerMutator('plot_bar_graph_mutator',
    Blockly.Constants.Display.DISPLAY_PLOT_BAR_GRAPH_MUTATOR_MIXIN);

// RBG LED MATRIX
Blockly.Constants.Display.DISPLAY_LED_MATRIX_DURATION_MIXIN =
    Blockly.Constants.Utils.addOptionMutatorMixin('duration', 'DISPLAY_LED_MATRIX_DURATION', 'input', 1000, "DISPLAY_LED_MATRIX_DURATION_UNIT");


Blockly.Extensions.register("display_led_matrix_duration_init_extension",
    Blockly.Constants.Display.DISPLAY_LED_MATRIX_DURATION_INIT_EXTENSION);

Blockly.Extensions.register("show_rgb_leds_matrix", function () {
    // init matrix 8*8 rgb
    if (!LedMatrixModalManager.isSet(true) && typeof Blockly.Wiki === 'undefined')
        LedMatrixModalManager.init(8, 8, true);

    this.getField('RGB_LEDS_MATRIX').clickHandler_ = (() => {
        Blockly.Constants.RGB_LEDS_MATRIX_BLOCK = this.inputList[0].fieldRow[1];
        Blockly.Constants.HIDDEN_RGB_LEDS_MATRIX = this.getField("HIDDEN_RGB_LEDS_MATRIX");

        if (Blockly.Constants.HIDDEN_RGB_LEDS_MATRIX.getValue() == '')
            Blockly.Constants.HIDDEN_RGB_LEDS_MATRIX.setValue(this.getField("RGB_LEDS_MATRIX").getText());

        LedMatrixModalManager.load_matrix_from_block(true);
        LedMatrixModalManager.disp_modal();
        // saving the image in case of cancellation
        Blockly.Constants.RGB_LEDS_MATRIX = LedMatrixModalManager.get_matrix_dataset();
    });
});

Blockly.Extensions.register("show_leds_matrix", function () {
    // init matrix 8*8 mono
    if (!LedMatrixModalManager.isSet() && typeof Blockly.Wiki === 'undefined')
        LedMatrixModalManager.init(8, 8, false, "#e63737");

    this.getField('LEDS_MATRIX').clickHandler_ = (() => {
        Blockly.Constants.LEDS_MATRIX_BLOCK = this.inputList[0].fieldRow[1];
        Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX = this.getField("HIDDEN_MONO_LEDS_MATRIX");

        if (Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX.getValue() == '')
            Blockly.Constants.HIDDEN_MONO_LEDS_MATRIX.setValue(this.getField("LEDS_MATRIX").getText());

        LedMatrixModalManager.load_matrix_from_block();
        LedMatrixModalManager.disp_modal();
        // saving the image in case of cancellation
        Blockly.Constants.LEDS_MATRIX = LedMatrixModalManager.get_matrix_dataset();
    });
});

// Mutator
Blockly.Extensions.registerMutator('display_led_matrix_duration_mutator',
    Blockly.Constants.Display.DISPLAY_LED_MATRIX_DURATION_MIXIN);