/**
 * @fileoverview Modulino blocks for Arduino (Arduino Plug and Make Kit, Arduino_Modulino library).
 * The modules are plugged on the Qwiic connector of the UNO R4 WiFi, also used by the arduinoq interface (UNO Q).
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // MODULINO BUTTONS _ IS BUTTON PRESSED
    {
        "type": "modulino_buttons_isPressed",
        "message0": "%{BKY_MODULINO_BUTTONS_ISPRESSED_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "BUTTON",
            "options": [["A", "0"], ["B", "1"], ["C", "2"]]
        }],
        "output": "Boolean",
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_BUTTONS_ISPRESSED_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO BUTTONS _ SET LEDS
    {
        "type": "modulino_buttons_setLeds",
        "message0": "%{BKY_MODULINO_BUTTONS_SETLEDS_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "LED_A",
            "options": [["%{BKY_MODULINO_ON}", "true"], ["%{BKY_MODULINO_OFF}", "false"]]
        }, {
            "type": "field_grid_dropdown",
            "name": "LED_B",
            "options": [["%{BKY_MODULINO_ON}", "true"], ["%{BKY_MODULINO_OFF}", "false"]]
        }, {
            "type": "field_grid_dropdown",
            "name": "LED_C",
            "options": [["%{BKY_MODULINO_ON}", "true"], ["%{BKY_MODULINO_OFF}", "false"]]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_BUTTONS_SETLEDS_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO BUZZER _ PLAY A FREQUENCY
    {
        "type": "modulino_buzzer_tone",
        "message0": "%{BKY_MODULINO_BUZZER_TONE_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "FREQUENCY",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "DURATION",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_BUZZER_TONE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO BUZZER _ STOP
    {
        "type": "modulino_buzzer_noTone",
        "message0": "%{BKY_MODULINO_BUZZER_NOTONE_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_BUZZER_NOTONE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO PIXELS _ SET LED COLOR
    {
        "type": "modulino_pixels_setColor",
        "message0": "%{BKY_MODULINO_PIXELS_SETCOLOR_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "COLOR",
            "check": "Colour"
        }, {
            "type": "input_value",
            "name": "BRIGHTNESS",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_PIXELS_SETCOLOR_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO PIXELS _ SET LED RGB COLOUR
    {
        "type": "modulino_pixels_setRGB",
        "message0": "%{BKY_MODULINO_PIXELS_SETRGB_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "LED",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "R",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "G",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "B",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }, {
            "type": "input_value",
            "name": "BRIGHTNESS",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_PIXELS_SETRGB_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO PIXELS _ CLEAR ALL LEDS
    {
        "type": "modulino_pixels_clear",
        "message0": "%{BKY_MODULINO_PIXELS_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_PIXELS_CLEAR_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO KNOB _ GET POSITION
    {
        "type": "modulino_knob_get",
        "message0": "%{BKY_MODULINO_KNOB_GET_TITLE}",
        "output": "Number",
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_KNOB_GET_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO KNOB _ IS PRESSED
    {
        "type": "modulino_knob_isPressed",
        "message0": "%{BKY_MODULINO_KNOB_ISPRESSED_TITLE}",
        "output": "Boolean",
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_KNOB_ISPRESSED_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO KNOB _ SET POSITION
    {
        "type": "modulino_knob_set",
        "message0": "%{BKY_MODULINO_KNOB_SET_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": Blockly.Constants.Types.NUMBER.compatibleTypes_
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_KNOB_SET_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO DISTANCE _ GET DISTANCE (cm / mm)
    {
        "type": "modulino_distance_get",
        "message0": "%{BKY_MODULINO_DISTANCE_GET_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "UNIT",
            "options": [
                ["(cm)", "CM"],
                ["(mm)", "MM"]
            ]
        }],
        "output": "Decimal",
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_DISTANCE_GET_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO MOVEMENT _ GET ACCELERATION (g)
    {
        "type": "modulino_movement_getAcceleration",
        "message0": "%{BKY_MODULINO_MOVEMENT_ACCELERATION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [["x", "X"], ["y", "Y"], ["z", "Z"]]
        }],
        "output": "Decimal",
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_MOVEMENT_ACCELERATION_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO MOVEMENT _ GET ROTATION SPEED (°/s)
    {
        "type": "modulino_movement_getRotation",
        "message0": "%{BKY_MODULINO_MOVEMENT_ROTATION_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "AXIS",
            "options": [
                ["%{BKY_MODULINO_MOVEMENT_ROLL}", "Roll"],
                ["%{BKY_MODULINO_MOVEMENT_PITCH}", "Pitch"],
                ["%{BKY_MODULINO_MOVEMENT_YAW}", "Yaw"]
            ]
        }],
        "output": "Decimal",
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_MOVEMENT_ROTATION_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    // MODULINO THERMO _ GET TEMPERATURE / HUMIDITY
    {
        "type": "modulino_thermo_getData",
        "message0": "%{BKY_MODULINO_THERMO_GETDATA_TITLE}",
        "args0": [{
            "type": "field_grid_dropdown",
            "name": "DATA",
            "options": [
                ["%{BKY_MODULINO_THERMO_TEMPERATURE}", "Temperature"],
                ["%{BKY_MODULINO_THERMO_HUMIDITY}", "Humidity"]
            ]
        }],
        "output": "Decimal",
        "style": "modulino_blocks",
        "tooltip": "%{BKY_MODULINO_THERMO_GETDATA_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    }

]); // END JSON EXTRACT (Do not delete this comment.)
