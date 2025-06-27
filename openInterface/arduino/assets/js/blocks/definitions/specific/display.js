/**
 * @fileoverview Display blocks for Arduino.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // CONTROL ARDUINO LED  
    {
        "type": "io_control_arduino_led",
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

    // I2C LCD1602 MODULE _ SET TEXT JSON
    {
        "type": "display_lcdRGBSetText",
        "message0": "%{BKY_DISPLAY_LCD_SETTEXT_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ADDR",
            "options": [
                ["0x3e (Grove)", "0x3e"],
                ["0x3f", "0x3f"],
                ["0x27", "0x27"]
            ]
        }, {
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
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_SETTEXT_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // I2C LCD1602 MODULE _ CLEAR SCREEN JSON
    {
        "type": "display_lcdRGBClear",
        "message0": "%{BKY_DISPLAY_LCD_CLEAR_TITLE}",
        "style": "display_blocks",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ADDR",
            "options": [
                ["0x3e (Grove)", "0x3e"],
                ["0x3f", "0x3f"],
                ["0x27", "0x27"]
            ]
        }],
        "tooltip": "%{BKY_DISPLAY_LCD_CLEAR_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // I2C LCD1602 MODULE _ SET DISPLAY JSON
    {
        "type": "display_setDisplay",
        "message0": "%{BKY_DISPLAY_LCD_SET_DISPLAY_TITLE}",
        "style": "display_blocks",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "ADDR",
            "options": [
                ["0x3e (Grove)", "0x3e"],
                ["0x3f", "0x3f"],
                ["0x27", "0x27"]
            ]
        }, {
            "type": "field_grid_dropdown",
            "name": "STATE",
            "options": [
                ["%{BKY_DISPLAY_LCD_SET_DISPLAY_ON}", "ON"],
                ["%{BKY_DISPLAY_LCD_SET_DISPLAY_OFF}", "OFF"]
            ]
        }],
        "tooltip": "%{BKY_DISPLAY_LCD_SET_DISPLAY_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE I2C LCD1602 RGB MODULE _ SET RGB JSON
    {
        "type": "display_lcdRGBSetColor",
        "message0": "%{BKY_DISPLAY_LCD_SETRGBCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "R",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "G",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "B",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }],
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_SETRGBCOLOR_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE I2C LCD1602 RGB MODULE _ SET RGB PALETTE JSON
    {
        "type": "display_lcdRGBSetPaletteColor",
        "message0": "%{BKY_DISPLAY_LCD_SETPALETTERGBCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_LCD_SETPALETTERGBCOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK OLED ADD TEXT
    {
        "type": "display_addOledText",
        "message0": "%{BKY_DISPLAY_OLED_ADDTEXT_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEXT",
            "check": ["String", "Number", "Decimal", "Boolean"]
        }, {
            "type": "input_value",
            "name": "X",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "Y",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
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

    // BLOCK OLED DRAW ICON AS CHARACTER
    {
        "type": "display_oledScreen_drawIcon",
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
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "Y",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
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

    // BLOCK OLED DRAW BITMAP LOGO
    {
        "type": "display_oledScreen_drawBitmapLogo",
        "message0": "%{BKY_DISPLAY_OLED_DRAWBITMAPLOGO_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LOGO",
            "options": [
                ["%{BKY_LOGO_VITTASCIENCE}", "vittascienceLogo"],
                ["%{BKY_LOGO_ARDUINO}", "arduinoLogo"],
                ["%{BKY_LOGO_SEEED}", "seeedLogo"],
                ["%{BKY_LOGO_MICROBIT}", "microbitLogo"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_OLED_DRAWBITMAPLOGO_TOOLTIP}",
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
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_SETGROVELED_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
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
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
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

    // LED MODULE _ WRITE ANALOG PWM
    {
        "type": "display_setVariableColorLED",
        "message0": "%{BKY_DISPLAY_SET_VARIABLE_COLOR_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.PWM[Blockly.Constants.getSelectedBoard()]
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
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "R",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "G",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "B",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
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
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
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
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "G",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "B",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
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

    // BLOCK MAKEBLOCK _ DEFINE NEOPIXEL
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
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_DEFINE_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
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
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "R",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "G",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "B",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_LEDCONTROL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
    },

    // BLOCK CONTROL NEOPIXEL LED WITH COLOR
    {
        "type": "display_controlColorNeopixelLed",
        "message0": "%{BKY_DISPLAY_NEOPIXEL_SETPALETTECOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "field_grid_dropdown",
            "name": "PIN",
            "options": Blockly.Constants.Pins.digital[Blockly.Constants.getSelectedBoard()]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_SETPALETTECOLOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ],
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
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_NEOPIXEL_RAINBOW_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE 4 DIGIT DISPLAY _ SET NUMBER JSON
    {
        "type": "display_setNumberGrove4Digit",
        "message0": "%{BKY_DISPLAY_4DIGIT_SETNUMBER_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "N",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
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
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_4DIGIT_SETNUMBER_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
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

    // GROVE 4 DIGIT DISPLAY _ SET TEMPERATURE JSON
    {
        "type": "display_setTemperatureGrove4Digit",
        "message0": "%{BKY_DISPLAY_4DIGIT_SETTEMP_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "TEMP",
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
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
        "style": "display_blocks",
        "tooltip": "%{BKY_DISPLAY_4DIGIT_SETTEMP_TOOLTIP}",
        "previousStatement": null,
        "nextStatement": null,
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
            "check": Blockly.Constants.Types.Arduino.DECIMAL.compatibleTypes_
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

    // GROVE LED BAR MODULE _  DISPLAY JSON
    {
        "type": "display_setGreenToRedLedBar",
        "message0": "%{BKY_DISPLAY_MY9221_SET_GREEN_TO_RED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "COLOR",
            "options": [
                ["%{BKY_DISPLAY_MY9221_RED_TO_GREEN}", "0"],
                ["%{BKY_DISPLAY_MY9221_GREEN_TO_RED}", "1"]
            ]
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
        "tooltip": "%{BKY_DISPLAY_MY9221_SET_GREEN_TO_RED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },

    // GROVE LED BAR MODULE _  DISPLAY JSON
    {
        "type": "display_setLedLedBar",
        "message0": "%{BKY_DISPLAY_MY9221_SET_LED_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.Arduino.NUMBER.compatibleTypes_
        }, {
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
        "tooltip": "%{BKY_DISPLAY_MY9221_SET_LED_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)