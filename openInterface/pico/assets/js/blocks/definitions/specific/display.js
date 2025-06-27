/**
 * @fileoverview Display blocks for Raspberry Pi Pico.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT


    // PICO BUILT-IN LED
    {
        "type": "display_controlPicoLed",
        "message0": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

     // PICO W BUILT-IN LED
     {
        "type": "display_controlPicoWLed",
        "message0": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_W_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "STATE",
            "check": "Boolean"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CONTROL_BUILTIN_LED_W_TOOLTIP}",
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
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
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
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
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
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
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.I2C[Blockly.Constants.getSelectedBoard()]
        }],
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIO",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIO",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DCKI",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DCKI",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }, {
            "type": "field_grid_dropdown",
            "name": "DIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_CHAINABLE_RESETALLRGBLED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
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
    },

    /* Start games blocks */

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

// Initialization extensions
Blockly.Extensions.register("show_leds_screen_init",
    Blockly.Constants.Display.DISPLAY_SHOW_LEDS_INIT_EXTENSION);

Blockly.Extensions.register("show_string_extension",
    Blockly.Constants.Display.DISPLAY_SHOW_STRING_INIT_EXTENSION);

// Mutators
Blockly.Extensions.registerMutator('show_string_mutator',
    Blockly.Constants.Display.DISPLAY_SHOW_STRING_MUTATOR_MIXIN);