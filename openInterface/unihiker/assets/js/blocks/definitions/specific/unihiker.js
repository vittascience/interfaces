/**
 * @fileoverview Blocks of the UNIHIKER M10 board: touch screen (unihiker GUI), buttons, pins and sensors (PinPong),
 * buzzer and LED.
 */

// Shared parts of the block definitions
const UNIHIKER_EXTENSIONS = ["block_init_helpurl", "block_init_color"];
const unihikerNumber = (name) => ({ "type": "input_value", "name": name, "check": "Number" });
const unihikerPins = (list) => ({ "type": "field_dropdown", "name": "PIN", "options": list.map(pin => [pin, pin]) });

// The pins are in blocks/definitions/blockly_constants.js

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    /** Display: touch screen (240 x 320) */

    {
        "type": "display_unihiker_text",
        "message0": "%{BKY_DISPLAY_UNIHIKER_TEXT_TITLE}",
        "args0": [unihikerNumber("NUMBER"), { "type": "input_value", "name": "TEXT" }, unihikerNumber("X"), unihikerNumber("Y"), unihikerNumber("SIZE"),
            { "type": "input_value", "name": "COLOR", "check": "Colour" }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_TEXT_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_k10_rgb",
        "message0": "%{BKY_DISPLAY_K10_RGB_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "LED", "options": [["%{BKY_DISPLAY_K10_RGB_ALL}", "-1"], ["0", "0"], ["1", "1"], ["2", "2"]] },
            { "type": "input_value", "name": "COLOR", "check": "Colour" }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_K10_RGB_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_k10_rgb_off",
        "message0": "%{BKY_DISPLAY_K10_RGB_OFF_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_K10_RGB_OFF_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_clear",
        "message0": "%{BKY_DISPLAY_UNIHIKER_CLEAR_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_CLEAR_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_rect",
        "message0": "%{BKY_DISPLAY_UNIHIKER_RECT_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "FILL", "options": [["%{BKY_DISPLAY_UNIHIKER_FILLED}", "fill"], ["%{BKY_DISPLAY_UNIHIKER_OUTLINE}", "draw"]] },
            unihikerNumber("X"), unihikerNumber("Y"), unihikerNumber("W"), unihikerNumber("H"), { "type": "input_value", "name": "COLOR", "check": "Colour" }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_RECT_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_circle",
        "message0": "%{BKY_DISPLAY_UNIHIKER_CIRCLE_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "FILL", "options": [["%{BKY_DISPLAY_UNIHIKER_FILLED}", "fill"], ["%{BKY_DISPLAY_UNIHIKER_OUTLINE}", "draw"]] },
            unihikerNumber("X"), unihikerNumber("Y"), unihikerNumber("R"), { "type": "input_value", "name": "COLOR", "check": "Colour" }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_CIRCLE_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_line",
        "message0": "%{BKY_DISPLAY_UNIHIKER_LINE_TITLE}",
        "args0": [unihikerNumber("X0"), unihikerNumber("Y0"), unihikerNumber("X1"), unihikerNumber("Y1"), { "type": "input_value", "name": "COLOR", "check": "Colour" }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_LINE_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_qrcode",
        "message0": "%{BKY_DISPLAY_UNIHIKER_QRCODE_TITLE}",
        "args0": [{ "type": "input_value", "name": "TEXT" }, unihikerNumber("X"), unihikerNumber("Y"), unihikerNumber("SIZE")],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_QRCODE_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_on_touch_button",
        "message0": "%{BKY_DISPLAY_UNIHIKER_ON_TOUCH_BUTTON_TITLE}",
        "args0": [{ "type": "field_input", "name": "TEXT", "text": "OK" },
            { "type": "field_number", "name": "X", "value": 70 }, { "type": "field_number", "name": "Y", "value": 140 }],
        "message1": "%1",
        "args1": [{ "type": "input_statement", "name": "DO" }],
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_ON_TOUCH_BUTTON_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },

    /** Display: tic-tac-toe on the touch screen (rows and columns from 1 to 3) */

    {
        "type": "display_unihiker_tictactoe_new",
        "message0": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_NEW_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_NEW_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_tictactoe_on_touch",
        "message0": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_ON_TOUCH_TITLE}",
        "message1": "%1",
        "args1": [{ "type": "input_statement", "name": "DO" }],
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_ON_TOUCH_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_tictactoe_touched",
        "message0": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_TOUCHED_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "DATA",
            "options": [["%{BKY_DISPLAY_UNIHIKER_TICTACTOE_ROW}", "0"], ["%{BKY_DISPLAY_UNIHIKER_TICTACTOE_COLUMN}", "1"]]
        }],
        "output": "Number",
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_TOUCHED_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_tictactoe_place",
        "message0": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_PLACE_TITLE}",
        "args0": [{ "type": "input_value", "name": "SYMBOL", "check": "String" }, unihikerNumber("ROW"), unihikerNumber("COLUMN")],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_PLACE_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_tictactoe_is_empty",
        "message0": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_IS_EMPTY_TITLE}",
        "args0": [unihikerNumber("ROW"), unihikerNumber("COLUMN")],
        "inputsInline": true,
        "output": "Boolean",
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_IS_EMPTY_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "display_unihiker_tictactoe_state",
        "message0": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_STATE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "STATE",
            "options": [["%{BKY_DISPLAY_UNIHIKER_TICTACTOE_WON_X}", "X"], ["%{BKY_DISPLAY_UNIHIKER_TICTACTOE_WON_O}", "O"],
                ["%{BKY_DISPLAY_UNIHIKER_TICTACTOE_DRAW}", "DRAW"], ["%{BKY_DISPLAY_UNIHIKER_TICTACTOE_OVER}", "OVER"]]
        }],
        "output": "Boolean",
        "tooltip": "%{BKY_DISPLAY_UNIHIKER_TICTACTOE_STATE_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },

    /** Input/Output: buttons A and B, pins */

    {
        "type": "io_unihiker_on_button",
        "message0": "%{BKY_IO_UNIHIKER_ON_BUTTON_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "BUTTON", "options": [["A", "a"], ["B", "b"]] }],
        "message1": "%1",
        "args1": [{ "type": "input_statement", "name": "DO" }],
        "tooltip": "%{BKY_IO_UNIHIKER_ON_BUTTON_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "io_unihiker_is_button_pressed",
        "message0": "%{BKY_IO_UNIHIKER_IS_BUTTON_PRESSED_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "BUTTON", "options": [["A", "a"], ["B", "b"]] }],
        "output": "Boolean",
        "tooltip": "%{BKY_IO_UNIHIKER_IS_BUTTON_PRESSED_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "io_unihiker_digital_write",
        "message0": "%{BKY_IO_UNIHIKER_DIGITAL_WRITE_TITLE}",
        "args0": [unihikerPins(UNIHIKER_DIGITAL_PINS), { "type": "input_value", "name": "STATE" }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_UNIHIKER_DIGITAL_WRITE_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "io_unihiker_digital_read",
        "message0": "%{BKY_IO_UNIHIKER_DIGITAL_READ_TITLE}",
        "args0": [unihikerPins(UNIHIKER_DIGITAL_PINS)],
        "output": "Number",
        "tooltip": "%{BKY_IO_UNIHIKER_DIGITAL_READ_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "io_unihiker_analog_read",
        "message0": "%{BKY_IO_UNIHIKER_ANALOG_READ_TITLE}",
        "args0": [unihikerPins(UNIHIKER_ANALOG_PINS)],
        "output": "Number",
        "tooltip": "%{BKY_IO_UNIHIKER_ANALOG_READ_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "io_unihiker_pwm_write",
        "message0": "%{BKY_IO_UNIHIKER_PWM_WRITE_TITLE}",
        "args0": [unihikerPins(UNIHIKER_PWM_PINS), unihikerNumber("VALUE")],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_IO_UNIHIKER_PWM_WRITE_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },

    /** Sensors of the board */

    {
        "type": "sensors_k10_temp_humi",
        "message0": "%{BKY_SENSORS_K10_TEMP_HUMI_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "DATA", "options": [["%{BKY_SENSORS_K10_TEMPERATURE}", "TEMP"], ["%{BKY_SENSORS_K10_HUMIDITY}", "HUM"]] }],
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_K10_TEMP_HUMI_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "sensors_unihiker_light",
        "message0": "%{BKY_SENSORS_UNIHIKER_LIGHT_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_UNIHIKER_LIGHT_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "sensors_unihiker_acceleration",
        "message0": "%{BKY_SENSORS_UNIHIKER_ACCELERATION_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "AXIS", "options": [["x", "x"], ["y", "y"], ["z", "z"], ["%{BKY_SENSORS_UNIHIKER_STRENGTH}", "strength"]] }],
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_UNIHIKER_ACCELERATION_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "sensors_unihiker_gyroscope",
        "message0": "%{BKY_SENSORS_UNIHIKER_GYROSCOPE_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "AXIS", "options": [["x", "x"], ["y", "y"], ["z", "z"]] }],
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_UNIHIKER_GYROSCOPE_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "sensors_unihiker_sound_level",
        "message0": "%{BKY_SENSORS_UNIHIKER_SOUND_LEVEL_TITLE}",
        "output": "Number",
        "tooltip": "%{BKY_SENSORS_UNIHIKER_SOUND_LEVEL_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },

    /** Actuators: buzzer and LED of the board */

    {
        "type": "actuators_unihiker_buzzer_music",
        "message0": "%{BKY_ACTUATORS_UNIHIKER_BUZZER_MUSIC_TITLE}",
        "args0": [{
            "type": "field_dropdown", "name": "MUSIC", "options": [
                ["Dadadadum", "DADADADUM"], ["Entertainer", "ENTERTAINER"], ["Prelude", "PRELUDE"], ["Ode", "ODE"], ["Nyan", "NYAN"],
                ["Ringtone", "RINGTONE"], ["Funk", "FUNK"], ["Blues", "BLUES"], ["Birthday", "BIRTHDAY"], ["Wedding", "WEDDING"],
                ["Funeral", "FUNERAL"], ["Punchline", "PUNCHLINE"], ["Baddy", "BADDY"], ["Chase", "CHASE"], ["Ba ding", "BA_DING"],
                ["Wawawawaa", "WAWAWAWAA"], ["Jump up", "JUMP_UP"], ["Jump down", "JUMP_DOWN"], ["Power up", "POWER_UP"], ["Power down", "POWER_DOWN"]]
        }, {
            "type": "field_dropdown", "name": "MODE", "options": [
                ["%{BKY_ACTUATORS_UNIHIKER_BUZZER_ONCE}", "Once"], ["%{BKY_ACTUATORS_UNIHIKER_BUZZER_ONCE_BACKGROUND}", "OnceInBackground"],
                ["%{BKY_ACTUATORS_UNIHIKER_BUZZER_FOREVER_BACKGROUND}", "ForeverInBackground"]]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_UNIHIKER_BUZZER_MUSIC_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "actuators_unihiker_buzzer_pitch",
        "message0": "%{BKY_ACTUATORS_UNIHIKER_BUZZER_PITCH_TITLE}",
        "args0": [unihikerNumber("FREQUENCY"), {
            "type": "field_dropdown", "name": "BEAT", "options": [
                ["1/4", "0.25"], ["1/2", "0.5"], ["3/4", "0.75"], ["1", "1"], ["3/2", "1.5"], ["2", "2"], ["3", "3"], ["4", "4"]]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_UNIHIKER_BUZZER_PITCH_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "actuators_unihiker_buzzer_stop",
        "message0": "%{BKY_ACTUATORS_UNIHIKER_BUZZER_STOP_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_UNIHIKER_BUZZER_STOP_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "actuators_unihiker_led",
        "message0": "%{BKY_ACTUATORS_UNIHIKER_LED_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "STATE", "options": [["%{BKY_ACTUATORS_UNIHIKER_ON}", "1"], ["%{BKY_ACTUATORS_UNIHIKER_OFF}", "0"]] }],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_ACTUATORS_UNIHIKER_LED_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    }
,

    /** AI: camera image on the screen (the AI blocks are the vittaia blocks of python/.../vittaia.js) */

    {
        "type": "ai_unihiker_camera_stream",
        "message0": "%{BKY_AI_UNIHIKER_CAMERA_STREAM_TITLE}",
        "args0": [Blockly.Constants.Utils.ADD_ICON('image'), unihikerNumber("X"), unihikerNumber("Y"), unihikerNumber("W"), unihikerNumber("H")],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_AI_UNIHIKER_CAMERA_STREAM_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    {
        "type": "ai_unihiker_camera_rotate",
        "message0": "%{BKY_AI_UNIHIKER_CAMERA_ROTATE_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "ANGLE",
            "options": [["90°", "90"], ["180°", "180"], ["270°", "270"], ["0°", "0"]]
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_AI_UNIHIKER_CAMERA_ROTATE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    }
,

    /** UNIHIKER K10: AI of the board (camera) */

    {
        "type": "ai_k10_start",
        "message0": "%{BKY_AI_K10_START_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "MODE", "options": [["%{BKY_AI_K10_QRCODE}", "code_scanner"], ["%{BKY_AI_K10_FACES}", "face_recognize_start"],
            ["%{BKY_AI_K10_CATS}", "cat_detect"], ["%{BKY_AI_K10_MOTION}", "move_detect"]] }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_AI_K10_START_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "ai_k10_update",
        "message0": "%{BKY_AI_K10_UPDATE_TITLE}",
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_AI_K10_UPDATE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "ai_k10_qrcode",
        "message0": "%{BKY_AI_K10_QRCODE_TITLE}",
        "output": "String",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_AI_K10_QRCODE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "ai_k10_detected",
        "message0": "%{BKY_AI_K10_DETECTED_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "OBJECT", "options": [["%{BKY_AI_K10_FACE}", "face_flag"], ["%{BKY_AI_K10_CAT}", "cat_flag"],
            ["%{BKY_AI_K10_MOVE}", "move_flag"]] }],
        "output": "Boolean",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_AI_K10_DETECTED_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "ai_k10_face",
        "message0": "%{BKY_AI_K10_FACE_TITLE}",
        "args0": [{ "type": "field_dropdown", "name": "ACTION", "options": [["%{BKY_AI_K10_FACE_REGISTER}", "register_face"], ["%{BKY_AI_K10_FACE_RECOGNIZE}", "recognize_face"]] }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_AI_K10_FACE_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },
    {
        "type": "ai_k10_face_id",
        "message0": "%{BKY_AI_K10_FACE_ID_TITLE}",
        "output": "Number",
        "style": "vittaia_blocks",
        "tooltip": "%{BKY_AI_K10_FACE_ID_TOOLTIP}",
        "extensions": ["block_init_helpurl"]
    },

    /** UNIHIKER K10: Wi-Fi and MQTT */

    {
        "type": "communication_k10_wifi_connect",
        "message0": "%{BKY_COMMUNICATION_K10_WIFI_CONNECT_TITLE}",
        "args0": [{ "type": "input_value", "name": "SSID" }, { "type": "input_value", "name": "PASSWORD" }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_K10_WIFI_CONNECT_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "communication_k10_wifi_connected",
        "message0": "%{BKY_COMMUNICATION_K10_WIFI_CONNECTED_TITLE}",
        "output": "Boolean",
        "tooltip": "%{BKY_COMMUNICATION_K10_WIFI_CONNECTED_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "communication_k10_mqtt_connect",
        "message0": "%{BKY_COMMUNICATION_K10_MQTT_CONNECT_TITLE}",
        "args0": [{ "type": "input_value", "name": "SERVER" }, unihikerNumber("PORT"), { "type": "input_value", "name": "USER" }, { "type": "input_value", "name": "PASSWORD" }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_K10_MQTT_CONNECT_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "communication_k10_mqtt_publish",
        "message0": "%{BKY_COMMUNICATION_K10_MQTT_PUBLISH_TITLE}",
        "args0": [{ "type": "input_value", "name": "MESSAGE" }, { "type": "input_value", "name": "TOPIC" }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "%{BKY_COMMUNICATION_K10_MQTT_PUBLISH_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    },
    {
        "type": "communication_k10_mqtt_message",
        "message0": "%{BKY_COMMUNICATION_K10_MQTT_MESSAGE_TITLE}",
        "args0": [{ "type": "input_value", "name": "TOPIC" }],
        "output": "String",
        "tooltip": "%{BKY_COMMUNICATION_K10_MQTT_MESSAGE_TOOLTIP}",
        "extensions": UNIHIKER_EXTENSIONS
    }
]); // END JSON EXTRACT (Do not delete this comment.)
