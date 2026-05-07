function getSpecificCompleterTrees() {
    const DOC_URL_GALAXIA = "https://galaxia-micropy-doc.thingz.co/en/latest/autoapi/";
    const tree = {};
    const typeTree = {};

    typeTree["Pin@machine"] = [
        { value: "P0", description: "Pin P0 value: 3", returns: "int" },
        { value: "P1", description: "Pin P1 value: 2", returns: "int" },
        { value: "P2", description: "Pin P2 value: 1", returns: "int" },
        { value: "P3", description: "Pin P3 value: 16", returns: "int" },
        { value: "P4", description: "Pin P4 value: 18", returns: "int" },
        { value: "P5", description: "Pin P5 value: 45", returns: "int" },
        { value: "P6", description: "Pin P6 value: 6", returns: "int" },
        { value: "P7", description: "Pin P7 value: 7", returns: "int" },
        { value: "P8", description: "Pin P8 value: 21", returns: "int" },
        { value: "P9", description: "Pin P9 value: 42", returns: "int" },
        { value: "P10", description: "Pin P10 value: 17", returns: "int" },
        { value: "P11", description: "Pin P11 value: 43", returns: "int" },
        { value: "P13", description: "Pin P13 value: 34", returns: "int" },
        { value: "P14", description: "Pin P10 value: 35", returns: "int" },
        { value: "P15", description: "Pin P11 value: 36", returns: "int" },
        { value: "P16", description: "Pin P13 value: 15", returns: "int" },
        { value: "P19", description: "Pin P10 value: 13", returns: "int" },
        { value: "P20", description: "Pin P11 value: 14", returns: "int" }
    ];

    // thingz (Galaxia)
    tree.thingz = [
        { title: "button_a", value: "button_a", meta: "thingz", description: "GALAXIA_THINGZ_BUTTON_A", returns: "Button", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.button_a" },
        { title: "button_b", value: "button_b", meta: "thingz", description: "GALAXIA_THINGZ_BUTTON_B", returns: "Button", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.button_b" },
        { title: "touch_n", value: "touch_n", meta: "thingz", description: "GALAXIA_THINGZ_TOUCH_N", returns: "ButtonTouch", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.touch_n" },
        { title: "touch_s", value: "touch_s", meta: "thingz", description: "GALAXIA_THINGZ_TOUCH_S", returns: "ButtonTouch", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.touch_s" },
        { title: "touch_e", value: "touch_e", meta: "thingz", description: "GALAXIA_THINGZ_TOUCH_E", returns: "ButtonTouch", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.touch_e" },
        { title: "touch_w", value: "touch_w", meta: "thingz", description: "GALAXIA_THINGZ_TOUCH_W", returns: "ButtonTouch", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.touch_w" },
        { value: "led", meta: "thingz", description: "GALAXIA_THINGZ_LED", returns: "Led", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.led" },
        { value: "accelerometer", meta: "thingz", description: "GALAXIA_THINGZ_ACCELEROMETER", returns: "Accel", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.accelerometer" },
        { value: "compass", meta: "thingz", description: "GALAXIA_THINGZ_COMPASS", returns: "Compass", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.compass" },
        { value: "sound", meta: "thingz", description: "GALAXIA_THINGZ_SOUND", returns: "Sound", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.sound" },
        { value: "radio", meta: "thingz", description: "GALAXIA_THINGZ_RADIO", returns: "Radio", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.radio" },
        { value: "display", meta: "thingz", description: "GALAXIA_THINGZ_DISPLAY", returns: "Display", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.display" },
        { value: "log", meta: "thingz", description: "GALAXIA_THINGZ_LOG", returns: "Log", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.log" },
        { title: "temperature()", value: "temperature", meta: "-- <function>", snippet: "temperature()", description: "GALAXIA_THINGZ_TEMPERATURE", returns: "int", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.temperature" },
        { title: "set_temperature_offset(offset)", value: "set_temperature_offset", meta: "-- <function>", snippet: "set_temperature_offset(${1:})", description: "GALAXIA_THINGZ_SET_TEMPERATURE_OFFSET", docUrl: DOC_URL_GALAXIA + "thingz/index.html#thingz.set_temperature_offset" },
        { value: "__name__", meta: "thingz", description: "GALAXIA_THINGZ_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/index.html#module-thingz" },
        {
            value: "thingz_accel", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_accel", content: [
                { value: "Accel", meta: "thingz_accel", description: "GALAXIA_ACCEL_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#thingz.thingz_accel.Accel", kind: "class" },
                { value: "Accel()", title: "Accel()", meta: "constructor", description: "GALAXIA_ACCEL_CONSTRUCTOR", snippet: "Accel()", returns: "Accel", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#thingz.thingz_accel.Accel" },
                { value: "Compass", meta: "thingz_accel", description: "GALAXIA_COMPASS_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#thingz.thingz_accel.Compass", kind: "class" },
                { value: "Compass()", title: "Compass()", meta: "constructor", description: "GALAXIA_COMPASS_CONSTRUCTOR", snippet: "Compass()", returns: "Compass", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#thingz.thingz_accel.Compass" },
                { value: "__name__", meta: "thingz_accel", description: "GALAXIA_THINGZ_ACCEL_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_accel" }
            ]
        },
        {
            value: "thingz_button", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_button", content: [
                { value: "Button", meta: "thingz_button", description: "GALAXIA_BUTTON_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_button/index.html#thingz.thingz_button.Button", kind: "class" },
                { value: "Button()", title: "Button()", meta: "constructor", description: "GALAXIA_BUTTON_CONSTRUCTOR", snippet: "Button()", returns: "Button", docUrl: DOC_URL_GALAXIA + "thingz/thingz_button/index.html#thingz.thingz_button.Button" },
                { value: "__name__", meta: "thingz_button", description: "GALAXIA_THINGZ_BUTTON_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_button/index.html#module-thingz.thingz_button" }
            ]
        },
        {
            value: "thingz_button_touch", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_button_touch", content: [
                { value: "ButtonTouch", meta: "thingz_button_touch", description: "GALAXIA_BUTTONTOUCH_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_button_touch/index.html#thingz.thingz_button_touch.ButtonTouch", kind: "class" },
                { value: "ButtonTouch()", title: "ButtonTouch()", meta: "constructor", description: "GALAXIA_BUTTONTOUCH_CONSTRUCTOR", snippet: "ButtonTouch()", returns: "ButtonTouch", docUrl: DOC_URL_GALAXIA + "thingz/thingz_button_touch/index.html#thingz.thingz_button_touch.ButtonTouch" },
                { value: "__name__", meta: "thingz_button_touch", description: "GALAXIA_THINGZ_BUTTON_TOUCH_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_button_touch/index.html#module-thingz.thingz_button_touch" }
            ]
        },
        {
            value: "thingz_led", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_led", content: [
                { value: "Led", meta: "thingz_led", description: "GALAXIA_LED_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_led/index.html#thingz.thingz_led.Led", kind: "class" },
                { value: "Led()", title: "Led()", meta: "constructor", description: "GALAXIA_LED_CONSTRUCTOR", snippet: "Led()", returns: "Led", docUrl: DOC_URL_GALAXIA + "thingz/thingz_led/index.html#thingz.thingz_led.Led" },
                { value: "__name__", meta: "thingz_led", description: "GALAXIA_THINGZ_LED_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_led/index.html#module-thingz.thingz_led" }
            ]
        },
        {
            value: "thingz_log", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_log", content: [
                { value: "Log", meta: "thingz_log", description: "GALAXIA_LOG_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_log/index.html#thingz.thingz_log.Log", kind: "class" },
                { value: "Log()", title: "Log()", meta: "constructor", description: "GALAXIA_LOG_CONSTRUCTOR", snippet: "Log()", returns: "Log", docUrl: DOC_URL_GALAXIA + "thingz/thingz_log/index.html#thingz.thingz_log.Log" },
                { value: "__name__", meta: "thingz_log", description: "GALAXIA_THINGZ_LOG_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_log/index.html#module-thingz.thingz_log" }
            ]
        },
        {
            value: "thingz_radio", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_radio", content: [
                { value: "Radio", meta: "thingz_radio", description: "GALAXIA_RADIO_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_radio/index.html#thingz.thingz_radio.Radio", kind: "class" },
                { value: "Radio()", title: "Radio()", meta: "constructor", description: "GALAXIA_RADIO_CONSTRUCTOR", snippet: "Radio()", returns: "Radio", docUrl: DOC_URL_GALAXIA + "thingz/thingz_radio/index.html#thingz.thingz_radio.Radio" },
                { value: "__name__", meta: "thingz_radio", description: "GALAXIA_THINGZ_RADIO_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_radio/index.html#module-thingz.thingz_radio" }
            ]
        },
        {
            value: "thingz_sound", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_sound", content: [
                { value: "Sound", meta: "thingz_sound", description: "GALAXIA_SOUND_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_sound/index.html#thingz.thingz_sound.Sound", kind: "class" },
                { value: "Sound()", title: "Sound()", meta: "constructor", description: "GALAXIA_SOUND_CONSTRUCTOR", snippet: "Sound()", returns: "Sound", docUrl: DOC_URL_GALAXIA + "thingz/thingz_sound/index.html#thingz.thingz_sound.Sound" },
                { value: "__name__", meta: "thingz_sound", description: "GALAXIA_THINGZ_SOUND_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_sound/index.html#module-thingz.thingz_sound" }
            ]
        },
        {
            value: "thingz_display", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_display", content: [
                { value: "Display", meta: "thingz_display", description: "GALAXIA_DISPLAY_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/index.html#thingz.thingz_display.Display", kind: "class" },
                { value: "Display()", title: "Display()", meta: "constructor", description: "GALAXIA_DISPLAY_CONSTRUCTOR", snippet: "Display()", returns: "Display", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/index.html#thingz.thingz_display.Display" },
                { value: "__name__", meta: "thingz_display", description: "GALAXIA_THINGZ_DISPLAY_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/index.html#module-thingz.thingz_display" }
            ]
        },
        {
            value: "thingz_display_Console", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_display_Console", content: [
                { value: "Console", meta: "thingz_display_Console", description: "GALAXIA_CONSOLE_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Console/index.html#thingz.thingz_display.Console.Console", kind: "class" },
                { value: "Console()", title: "Console()", meta: "constructor", description: "GALAXIA_CONSOLE_CONSTRUCTOR", snippet: "Console()", returns: "Console", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Console/index.html#thingz.thingz_display.Console.Console" },
                { value: "__name__", meta: "thingz_display_Console", description: "GALAXIA_THINGZ_DISPLAY_CONSOLE_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Console/index.html#module-thingz.thingz_display.Console" }
            ]
        },
        {
            value: "thingz_display_Plot", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_display_Plot", content: [
                { value: "Plot", meta: "thingz_display_Plot", description: "GALAXIA_PLOT_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Plot/index.html#thingz.thingz_display.Plot.Plot", kind: "class" },
                { value: "Plot()", title: "Plot()", meta: "constructor", description: "GALAXIA_PLOT_CONSTRUCTOR", snippet: "Plot()", returns: "Plot", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Plot/index.html#thingz.thingz_display.Plot.Plot" },
                { value: "__name__", meta: "thingz_display_Plot", description: "GALAXIA_THINGZ_DISPLAY_PLOT_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Plot/index.html#module-thingz.thingz_display.Plot" }
            ]
        },
        {
            value: "thingz_display_Raw", meta: "thingz", docUrl: DOC_URL_GALAXIA + "thingz/thingz_accel/index.html#module-thingz.thingz_display_Raw", content: [
                { value: "Raw", meta: "thingz_display_Raw", description: "GALAXIA_RAW_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Raw/index.html#thingz.thingz_display.Raw.Raw", kind: "class" },
                { value: "Raw()", title: "Raw()", meta: "constructor", description: "GALAXIA_RAW_CONSTRUCTOR", snippet: "Raw()", returns: "Raw", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Raw/index.html#thingz.thingz_display.Raw.Raw" },
                { value: "Img", meta: "thingz_display_Raw", description: "GALAXIA_IMG_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Raw/index.html#thingz.thingz_display.Raw.Img", kind: "class" },
                { value: "Img()", title: "Img(x, y, path, white_replacement)", meta: "constructor", description: "GALAXIA_IMG_CONSTRUCTOR", snippet: "Img(${1:})", returns: "Img", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Raw/index.html#thingz.thingz_display.Raw.Img" },
                { value: "Rect", meta: "thingz_display_Raw", description: "GALAXIA_RECT_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Raw/index.html#thingz.thingz_display.Raw.Rect", kind: "class" },
                { value: "Rect()", title: "Rect(x, y, width, height, color)", meta: "constructor", description: "GALAXIA_RECT_CONSTRUCTOR", snippet: "Rect(${1:})", returns: "Rect", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Raw/index.html#thingz.thingz_display.Raw.Rect" },
                { value: "Text", meta: "thingz_display_Raw", description: "GALAXIA_TEXT_CLASS", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Raw/index.html#thingz.thingz_display.Raw.Text", kind: "class" },
                { value: "Text()", title: "Text(x, y, text, color)", meta: "constructor", description: "GALAXIA_TEXT_CONSTRUCTOR", snippet: "Text(${1:})", returns: "Text", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Raw/index.html#thingz.thingz_display.Raw.Text" },
                { value: "__name__", meta: "thingz_display_Raw", description: "GALAXIA_THINGZ_DISPLAY_RAW_MODULE", docUrl: DOC_URL_GALAXIA + "thingz/thingz_display/Raw/index.html#module-thingz.thingz_display.Raw" }
            ]
        }
    ];

    // --- type trees
    typeTree.Button = [
        { title: "is_pressed()", value: "is_pressed", meta: "-- <function>", snippet: "is_pressed()", description: "GALAXIA_BUTTON_IS_PRESSED", returns: "bool" },
        { title: "was_pressed()", value: "was_pressed", meta: "-- <function>", snippet: "was_pressed()", description: "GALAXIA_BUTTON_WAS_PRESSED", returns: "bool" },
        { title: "get_presses()", value: "get_presses", meta: "-- <function>", snippet: "get_presses()", description: "GALAXIA_BUTTON_GET_PRESSES", returns: "int" },
        { title: "on_pressed(callback)", value: "on_pressed", meta: "-- <function>", snippet: "on_pressed(${1:})", description: "GALAXIA_BUTTON_ON_PRESSED" }
    ];

    typeTree.ButtonTouch = [
        { title: "is_touched()", value: "is_touched", meta: "-- <function>", snippet: "is_touched()", description: "GALAXIA_BUTTONTOUCH_IS_TOUCHED", returns: "bool" },
        { title: "was_touched()", value: "was_touched", meta: "-- <function>", snippet: "was_touched()", description: "GALAXIA_BUTTONTOUCH_WAS_TOUCHED", returns: "bool" },
        { title: "get_touches()", value: "get_touches", meta: "-- <function>", snippet: "get_touches()", description: "GALAXIA_BUTTONTOUCH_GET_TOUCHES", returns: "int" },
        { title: "on_touched(callback)", value: "on_touched", meta: "-- <function>", snippet: "on_touched(${1:})", description: "GALAXIA_BUTTONTOUCH_ON_TOUCHED" }
    ];

    typeTree.Accel = [
        { title: "get_x()", value: "get_x", meta: "-- <function>", snippet: "get_x()", description: "GALAXIA_ACCEL_GET_X", returns: "float" },
        { title: "get_y()", value: "get_y", meta: "-- <function>", snippet: "get_y()", description: "GALAXIA_ACCEL_GET_Y", returns: "float" },
        { title: "get_z()", value: "get_z", meta: "-- <function>", snippet: "get_z()", description: "GALAXIA_ACCEL_GET_Z", returns: "float" },
        { title: "get_values()", value: "get_values", meta: "-- <function>", snippet: "get_values()", description: "GALAXIA_ACCEL_GET_VALUES", returns: "list" },
        { title: "current_gesture()", value: "current_gesture", meta: "-- <function>", snippet: "current_gesture()", description: "GALAXIA_ACCEL_CURRENT_GESTURE", returns: "str" },
        { title: "is_gesture(gesture)", value: "is_gesture", meta: "-- <function>", snippet: "is_gesture(${1:})", description: "GALAXIA_ACCEL_IS_GESTURE", returns: "bool" },
        { title: "was_gesture(gesture)", value: "was_gesture", meta: "-- <function>", snippet: "was_gesture(${1:})", description: "GALAXIA_ACCEL_WAS_GESTURE", returns: "bool" },
        { title: "get_gestures()", value: "get_gestures", meta: "-- <function>", snippet: "get_gestures()", description: "GALAXIA_ACCEL_GET_GESTURES", returns: "list" },
        { title: "on_gesture(gesture, callback)", value: "on_gesture", meta: "-- <function>", snippet: "on_gesture(${1:})", description: "GALAXIA_ACCEL_ON_GESTURE" }
    ];

    typeTree.Compass = [
        { title: "get_x()", value: "get_x", meta: "-- <function>", snippet: "get_x()", description: "GALAXIA_COMPASS_GET_X", returns: "float" },
        { title: "get_y()", value: "get_y", meta: "-- <function>", snippet: "get_y()", description: "GALAXIA_COMPASS_GET_Y", returns: "float" },
        { title: "get_values()", value: "get_values", meta: "-- <function>", snippet: "get_values()", description: "GALAXIA_COMPASS_GET_VALUES", returns: "list" },
        { title: "heading()", value: "heading", meta: "-- <function>", snippet: "heading()", description: "GALAXIA_COMPASS_HEADING", returns: "float" },
        { title: "calibrate(calibration_time, nb_of_samples)", value: "calibrate", meta: "-- <function>", snippet: "calibrate(${1:})", description: "GALAXIA_COMPASS_CALIBRATE" }
    ];

    typeTree.Led = [
        { title: "set_colors(red, green, blue)", value: "set_colors", meta: "-- <function>", snippet: "set_colors(${1:})", description: "GALAXIA_LED_SET_COLORS" },
        { title: "set_red(red)", value: "set_red", meta: "-- <function>", snippet: "set_red(${1:})", description: "GALAXIA_LED_SET_RED" },
        { title: "set_green(green)", value: "set_green", meta: "-- <function>", snippet: "set_green(${1:})", description: "GALAXIA_LED_SET_GREEN" },
        { title: "set_blue(blue)", value: "set_blue", meta: "-- <function>", snippet: "set_blue(${1:})", description: "GALAXIA_LED_SET_BLUE" },
        { title: "get_red()", value: "get_red", meta: "-- <function>", snippet: "get_red()", description: "GALAXIA_LED_GET_RED", returns: "int" },
        { title: "get_green()", value: "get_green", meta: "-- <function>", snippet: "get_green()", description: "GALAXIA_LED_GET_GREEN", returns: "int" },
        { title: "get_blue()", value: "get_blue", meta: "-- <function>", snippet: "get_blue()", description: "GALAXIA_LED_GET_BLUE", returns: "int" },
        { title: "read_light_level()", value: "read_light_level", meta: "-- <function>", snippet: "read_light_level()", description: "GALAXIA_LED_READ_LIGHT_LEVEL", returns: "int" }
    ];

    typeTree.Log = [
        { title: "add(data)", value: "add", meta: "-- <function>", snippet: "add(${1:})", description: "GALAXIA_LOG_ADD" },
        { title: "delete()", value: "delete", meta: "-- <function>", snippet: "delete()", description: "GALAXIA_LOG_DELETE" },
        { title: "set_columns(data)", value: "set_columns", meta: "-- <function>", snippet: "set_columns(${1:})", description: "GALAXIA_LOG_SET_COLUMNS" }
    ];

    typeTree.Radio = [
        { title: "send(data)", value: "send", meta: "-- <function>", snippet: "send(${1:})", description: "GALAXIA_RADIO_SEND" },
        { title: "receive()", value: "receive", meta: "-- <function>", snippet: "receive()", description: "GALAXIA_RADIO_RECEIVE", returns: "str" },
        { title: "set_chanel(channel)", value: "set_chanel", meta: "-- <function>", snippet: "set_chanel(${1:})", description: "GALAXIA_RADIO_SET_CHANEL" },
        { title: "get_channel()", value: "get_channel", meta: "-- <function>", snippet: "get_channel()", description: "GALAXIA_RADIO_GET_CHANNEL", returns: "int" },
        { title: "get_mac()", value: "get_mac", meta: "-- <function>", snippet: "get_mac()", description: "GALAXIA_RADIO_GET_MAC", returns: "bytes" }
    ];

    typeTree.Sound = [
        { title: "play(on, freq)", value: "play", meta: "-- <function>", snippet: "play(${1:})", description: "GALAXIA_SOUND_PLAY" },
        { title: "set_frequency(freq)", value: "set_frequency", meta: "-- <function>", snippet: "set_frequency(${1:})", description: "GALAXIA_SOUND_SET_FREQUENCY" },
        { title: "set_volume(volume)", value: "set_volume", meta: "-- <function>", snippet: "set_volume(${1:})", description: "GALAXIA_SOUND_SET_VOLUME" },
        { title: "play_sample(filename)", value: "play_sample", meta: "-- <function>", snippet: "play_sample(${1:})", description: "GALAXIA_SOUND_PLAY_SAMPLE" }
    ];

    typeTree.Display = [
        { title: "plot", value: "plot", meta: "Display", description: "GALAXIA_DISPLAY_PLOT", returns: "Plot" },
        { title: "console", value: "console", meta: "Display", description: "GALAXIA_DISPLAY_CONSOLE", returns: "Console" },
        { title: "raw", value: "raw", meta: "Display", description: "GALAXIA_DISPLAY_RAW", returns: "Raw" }
    ];

    typeTree.Console = [
        { title: "show()", value: "show", meta: "-- <function>", snippet: "show()", description: "GALAXIA_CONSOLE_SHOW" }
    ];

    typeTree.Plot = [
        { title: "show()", value: "show", meta: "-- <function>", snippet: "show()", description: "GALAXIA_PLOT_SHOW" },
        { title: "add_point(value)", value: "add_point", meta: "-- <function>", snippet: "add_point(${1:})", description: "GALAXIA_PLOT_ADD_POINT" },
        { title: "set_y_scale(min, max)", value: "set_y_scale", meta: "-- <function>", snippet: "set_y_scale(${1:})", description: "GALAXIA_PLOT_SET_Y_SCALE" },
        { title: "set_animate_function(func, interval)", value: "set_animate_function", meta: "-- <function>", snippet: "set_animate_function(${1:})", description: "GALAXIA_PLOT_SET_ANIMATE_FUNCTION" }
    ];

    typeTree.Raw = [
        { title: "show()", value: "show", meta: "-- <function>", snippet: "show()", description: "GALAXIA_RAW_SHOW" },
        { title: "print(x, y, txt)", value: "print", meta: "-- <function>", snippet: "print(${1:})", description: "GALAXIA_RAW_PRINT" },
        { title: "print_bmp(x, y, path)", value: "print_bmp", meta: "-- <function>", snippet: "print_bmp(${1:})", description: "GALAXIA_RAW_PRINT_BMP" }
    ];

    typeTree.Img = [
        { title: "show(show)", value: "show", meta: "-- <function>", snippet: "show(${1:})", description: "GALAXIA_IMG_SHOW" },
        { title: "x(pos)", value: "x", meta: "-- <function>", snippet: "x(${1:})", description: "GALAXIA_IMG_X" },
        { title: "y(pos)", value: "y", meta: "-- <function>", snippet: "y(${1:})", description: "GALAXIA_IMG_Y" },
        { title: "white_replacement_color(color)", value: "white_replacement_color", meta: "-- <function>", snippet: "white_replacement_color(${1:})", description: "GALAXIA_IMG_WHITE_REPLACEMENT_COLOR" },
        { title: "get_show()", value: "get_show", meta: "-- <function>", snippet: "get_show()", description: "GALAXIA_IMG_GET_SHOW", returns: "bool" },
        { title: "get_x()", value: "get_x", meta: "-- <function>", snippet: "get_x()", description: "GALAXIA_IMG_GET_X", returns: "int" },
        { title: "get_y()", value: "get_y", meta: "-- <function>", snippet: "get_y()", description: "GALAXIA_IMG_GET_Y", returns: "int" },
        { title: "get_width()", value: "get_width", meta: "-- <function>", snippet: "get_width()", description: "GALAXIA_IMG_GET_WIDTH", returns: "int" },
        { title: "get_height()", value: "get_height", meta: "-- <function>", snippet: "get_height()", description: "GALAXIA_IMG_GET_HEIGHT", returns: "int" },
        { title: "get_white_replacement()", value: "get_white_replacement", meta: "-- <function>", snippet: "get_white_replacement()", description: "GALAXIA_IMG_GET_WHITE_REPLACEMENT", returns: "int" }
    ];

    typeTree.Rect = [
        { title: "show(show)", value: "show", meta: "-- <function>", snippet: "show(${1:})", description: "GALAXIA_RECT_SHOW" },
        { title: "x(pos)", value: "x", meta: "-- <function>", snippet: "x(${1:})", description: "GALAXIA_RECT_X" },
        { title: "y(pos)", value: "y", meta: "-- <function>", snippet: "y(${1:})", description: "GALAXIA_RECT_Y" },
        { title: "color(color)", value: "color", meta: "-- <function>", snippet: "color(${1:})", description: "GALAXIA_RECT_COLOR" },
        { title: "get_show()", value: "get_show", meta: "-- <function>", snippet: "get_show()", description: "GALAXIA_RECT_GET_SHOW", returns: "bool" },
        { title: "get_x()", value: "get_x", meta: "-- <function>", snippet: "get_x()", description: "GALAXIA_RECT_GET_X", returns: "int" },
        { title: "get_y()", value: "get_y", meta: "-- <function>", snippet: "get_y()", description: "GALAXIA_RECT_GET_Y", returns: "int" },
        { title: "get_width()", value: "get_width", meta: "-- <function>", snippet: "get_width()", description: "GALAXIA_RECT_GET_WIDTH", returns: "int" },
        { title: "get_height()", value: "get_height", meta: "-- <function>", snippet: "get_height()", description: "GALAXIA_RECT_GET_HEIGHT", returns: "int" },
        { title: "get_color()", value: "get_color", meta: "-- <function>", snippet: "get_color()", description: "GALAXIA_RECT_GET_COLOR", returns: "int" }
    ];

    typeTree.Text = [
        { title: "show(show)", value: "show", meta: "-- <function>", snippet: "show(${1:})", description: "GALAXIA_TEXT_SHOW" },
        { title: "x(pos)", value: "x", meta: "-- <function>", snippet: "x(${1:})", description: "GALAXIA_TEXT_X" },
        { title: "y(pos)", value: "y", meta: "-- <function>", snippet: "y(${1:})", description: "GALAXIA_TEXT_Y" },
        { title: "set_text(text)", value: "set_text", meta: "-- <function>", snippet: "set_text(${1:})", description: "GALAXIA_TEXT_SET_TEXT" },
        { title: "get_show()", value: "get_show", meta: "-- <function>", snippet: "get_show()", description: "GALAXIA_TEXT_GET_SHOW", returns: "bool" },
        { title: "get_x()", value: "get_x", meta: "-- <function>", snippet: "get_x()", description: "GALAXIA_TEXT_GET_X", returns: "int" },
        { title: "get_y()", value: "get_y", meta: "-- <function>", snippet: "get_y()", description: "GALAXIA_TEXT_GET_Y", returns: "int" },
        { title: "get_width()", value: "get_width", meta: "-- <function>", snippet: "get_width()", description: "GALAXIA_TEXT_GET_WIDTH", returns: "int" },
        { title: "get_height()", value: "get_height", meta: "-- <function>", snippet: "get_height()", description: "GALAXIA_TEXT_GET_HEIGHT", returns: "int" },
        { title: "get_color()", value: "get_color", meta: "-- <function>", snippet: "get_color()", description: "GALAXIA_TEXT_GET_COLOR", returns: "int" },
        { title: "get_text()", value: "get_text", meta: "-- <function>", snippet: "get_text()", description: "GALAXIA_TEXT_GET_TEXT", returns: "int" }
    ];

    return { tree, typeTree };
};
