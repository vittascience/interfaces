/**
 * Database of defaut blocks in Raspberry Pi toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {

            // display - Galaxia/RGB
            "display_galaxia_led_set_colors": this.Set.number("RED", 100) + this.Set.number("GREEN", 100) + this.Set.number("BLUE"),
            "display_galaxia_led_set_red": this.Set.number("RED", 100),
            "display_galaxia_led_set_green": this.Set.number("GREEN", 100),
            "display_galaxia_led_set_blue": this.Set.number("BLUE", 100),
            // display Galaxia/graphics
            "display_galaxia_plot_add_point": this.Set.number("POINT", 50),
            "display_galaxia_plot_set_y_scale": this.Set.number("MIN") + this.Set.number("MAX", 100),
            "display_galaxia_animate_function": this.Set.number("INTERVAL", 1) + this.Set.number("POINT", 50),

            /** esp32 default blocks */

            //display Galaxia Screen
            "display_galaxia_screen_set_text": this.Set.text('TEXT', 'Bonjour'),
            "display_galaxia_screen_set_text_value": this.Set.text('TEXT', 'text') + this.Set.number("VALUE"),
            // display - LCD
            "display_lcdSetText": this.Set.text('TEXT'),

            // display - OLED
            "display_addOledText": this.Set.number("X") + this.Set.number("Y") + this.Set.text("TEXT"),
            "display_setOledPixel": this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            "display_drawOledLine": this.Set.number("XA") + this.Set.number("YA", 32) + this.Set.number("XB", 128) + this.Set.number("YB", 32),
            "display_showOledIcon": this.Set.number("X") + this.Set.number("Y"),
            // display - LED
            "display_setGroveSocketLed": this.Set.state(),
            "display_setLEDintensity": this.Set.number("VALUE", 100),
            "display_setVariableColorLED": this.Set.number("VALUE", 100),
            "display_setNumberGrove4Digit": this.Set.field("DIO", "p3") + this.Set.number("N", READ_ANALOG_MAX_VALUE),
            "display_setClockGrove4Digit": this.Set.field("DIO", "p3"),
            "display_setLevelLedBar": this.Set.field("DCKI", "p3") + this.Set.number("VALUE", 3.14),
            "display_my9221_reverse": this.Set.field("DCKI", "p3") + this.Set.state(),
            // display - neopixel
            "display_controlNeopixelLed": this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B", 255),
            "display_controlColorNeopixelLed": this.Set.number("LED") + this.Set.colour_picker(),
            "display_neopixel_controlAllLedRGB": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_neopixel_controlAllLedPalette": this.Set.colour_picker(),
            // display - chainable LED RGB
            "display_defineChainableRGBLed": this.Set.field("DIN", "p3"),
            "display_setColorChainableRGBLed": this.Set.field("DIN", "p3") + this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_setPaletteColorChainableRGBLed": this.Set.field("DIN", "p3") + this.Set.number("LED") + this.Set.colour_picker(),
            "display_setColorAllChainableRGBLed": this.Set.field("DIN", "p3") + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_setPaletteAllChainableRGBLed": this.Set.field("DIN", "p3") + this.Set.colour_picker(),
            "display_resetAllChainableRGBLed": this.Set.field("DIN", "p3"),

            // pi camera
            "sensors_rpi_camera_take_video": this.Set.number("DURATION", 5),

            // SenseHat
            "sensehat_display_set_pixel": this.Set.number("X") + this.Set.number("Y") + this.Set.number("RED", 255) + this.Set.number("GREEN") + this.Set.number("BLUE"),
            "sensehat_display_set_pixel_palette": this.Set.number("X") + this.Set.number("Y") + this.Set.colour_picker(),
            "sensehat_display_set_pixels_image": this.Set.field("IMAGE", 'question_mark') + this.Set.colour_picker('#009900', "FOREGROUND_COLOR") + this.Set.colour_picker('#ffffff', "BACKGROUND_COLOR"),
            "sensehat_display_get_pixel": this.Set.number("X") + this.Set.number("Y"),
            "sensehat_show_leds_image": this.Set.colour_picker('#009900'),
            "sensehat_display_clear_with_color": this.Set.colour_picker('#009900'),
            "sensehat_display_show_message": this.Set.text('MESSAGE', 'Bonjour!') + this.Set.number("SPEED", 0.1) + this.Set.colour_picker('#009900') + this.Set.colour_picker('#ffffff', "BACKGROUND_COLOR"),
            "sensehat_display_show_letter": this.Set.text('LETTER', 'A') + this.Set.colour_picker('#009900') + this.Set.colour_picker('#ffffff', "BACKGROUND_COLOR"),
            // io - galaxia
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><block type='logic_compare'>" + this.Set.field("OP", "EQ") + this.Set.number("B", 1) + "</block></value>",
            // io - external modules
            "io_getGroveColoredButton": this.Set.field("PIN", "p3"),
            "io_setGroveColoredButton": this.Set.state(),
            "io_getGroveThumbJoystick": this.Set.field("PIN_Y", "p7"),
            // io - pins
            "io_writeDigitalPin": this.Set.state(),
            "io_writeAnalogPin": this.Set.number("VALUE", 255),
            "io_writePwm": this.Set.number("VALUE", READ_ANALOG_MAX_VALUE),
            "io_setPwm": this.Set.number("FREQUENCY", 10),
            "io_getVoltage": this.Set.number("VALUE", 255),
            "io_rotaryEncoder": this.Set.field("CLK", 'p7') + this.Set.field("DT", "p6"),

            // communication - radio
            "communication_radioSendString": this.Set.text('STR', "{radioMessage}"),
            "communication_radioSendNumber": this.Set.number("N", 1),
            "communication_radioSendValue": this.Set.text('NAME', "pi") + this.Set.number("VALUE", 3.14),
            "communication_radioConfig": this.Set.number("CANAL", 7) + this.Set.number("POWER", 6) + this.Set.number("LEN", 32) + this.Set.number("GROUP"),

            //communication - internal
            "communication_StartBT": this.Set.text('NAME', "ESP32_Vittascience"),
            "communication_SendBT": this.Set.text('DATA'),
            "communication_FizziqBT": this.Set.number('VALUE', 25),
            // communication - console
            "communication_serialWrite": '<mutation newlines="false"></mutation>' + this.Set.text('TEXT', "{hello}"),
            "communication_graphSerialWrite": "<value name='ADD0'><block type='communication_graphSerialWrite_datasFormat'><field name='NAME'>{data1}</field></block></value>"
                + "<mutation items='1'></mutation>",
            "communication_playComputerFrequency": this.Set.number("FREQUENCY", 440),
            // communication - logging
            "communication_writeOpenLogSd": this.Set.field("RX", "p1") + "<value name='DATA'><block type='text_join'>"
                + this.Set.text("ADD0", '{data1}') + this.Set.text("ADD1", ';') + this.Set.text("ADD2", '{data2}')
                + "<mutation items='3'></mutation></block></value>",
            // communication - bluetooth
            "communication_sendBluetoothData": this.Set.field("RX", "p25") + this.Set.text("DATA"),
            "communication_onBluetoothDataReceived": this.Set.field("RX", "p1"),
            // communication - tracking modules
            "communication_gps_getNMEA": this.Set.field("RX", "p1"),
            "communication_gps_getGGAInformations": this.Set.field("RX", "p1"),
            "communication_clockRTC_setHour": this.Set.number("HOUR", 8) + this.Set.number("MIN", 40) + this.Set.number("SEC", 10),
            // communication - uart
            "communication_serialInit": this.Set.field("RX", "p1"),
            "communication_uart_writeData": this.Set.text("DATA"),
            "communication_uart_readData": "<mutation size='false'></mutation>",
            // sensors
            "sensors_getGroveHighTemperature": this.Set.field("A1", "p7"),
            "sensors_SCD30_forcedCalibration": this.Set.number("DEFAULT", 420),
            // actuators - motors
            "actuators_setServoAngle": this.Set.number("ANGLE", 90),
            "actuators_continuousServo_setSpeed": this.Set.number("SPEED", 100),
            "actuators_setMotorPower": this.Set.number("POWER", PWM_MAX_DUTY),
            "actuators_setVibrationMotorState": this.Set.state(),
            "actuators_setGroveRelayState": this.Set.state(),
            // actuators - buzzer/speaker
            "actuators_music_playNotes":
                `<mutation items='3'></mutation>
                <value name='ADD0'><block type='actuators_music_note'><field name='NOTE'>d</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD1'><block type='actuators_music_note'><field name='NOTE'>f#</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD2'><block type='actuators_music_note'><field name='NOTE'>g</field><field name='OCTAVE'>4</field></block></value>`,
            "actuators_music_playFrequency": this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 500),
            // network - wifi
            // Pi Name
            "network_get_pi_name": this.Set.text("PINAME", "pi"),

            /** Python default blocks */

            // logic
            "controls_if": "<value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>",
            "controls_if-else": "<value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>"
                + "<mutation else='1'></mutation>",
            "logic_compare-eq": this.Set.field("OP", 'EQ') + this.Set.number("B", 1),
            "logic_compare-gte": this.Set.field("OP", 'GTE') + this.Set.number("B", 1),
            "logic_compare-lte": this.Set.field("OP", 'LTE') + this.Set.number("B", 1),
            "logic_operation-and": this.Set.field("OP", 'AND'),
            "logic_operation-or": this.Set.field("OP", 'OR'),
            // loop
            "controls_repeat": this.Set.number("TIMES", 10),
            "controls_for": this.Set.number("FROM", 1) + this.Set.number("TO", 10) + this.Set.number("BY", 1),
            // math
            "math_number": this.Set.field("NUM", 42),
            "math_arithmetic-add": this.Set.field("OP", 'ADD') + this.Set.number("B", 1),
            "math_arithmetic-minus": this.Set.field("OP", 'MINUS') + this.Set.number("B", 1),
            "math_arithmetic-multiply": this.Set.field("OP", 'MULTIPLY') + this.Set.number("B", 1),
            "math_arithmetic-divide": this.Set.field("OP", 'DIVIDE') + this.Set.number("B", 1),
            "math_single": this.Set.number("NUM", 9),
            "math_trig": this.Set.number("NUM", 45),
            "math_number_property": this.Set.number("NUMBER_TO_CHECK", 9),
            "math_map": this.Set.number("VALUE", 512) + this.Set.number("MIN1") + this.Set.number("MAX1", READ_ANALOG_MAX_VALUE) + this.Set.number("MIN2") + this.Set.number("MAX2", 100),
            "math_round": this.Set.number("NUM", 3.1),
            "math_modulo": this.Set.number("DIVIDEND", 64) + this.Set.number("DIVISOR", 10),
            "math_constrain": this.Set.number("LOW", 1) + this.Set.number("HIGH", 100),
            "math_random_int": this.Set.number("FROM", 1) + this.Set.number("TO", 100),
            "math_atan2": this.Set.number("X", 1) + this.Set.number("Y", 1),
            // text
            "text_comment": this.Set.field("TEXT", '{comment}'),
            "text_newline": this.Set.number('N', 1),
            "text_append": this.Set.text('TEXT'),
            "text_split": this.Set.text('VALUE') + this.Set.text('SEP', ';'),
            "text_length": this.Set.text('VALUE', 'abc'),
            "text_indexOf": this.Set.variable("VALUE", '{textVariable}') + this.Set.text('VALUE', 'abc'),
            "text_charAt": this.Set.variable("VALUE", '{textVariable}'),
            "text_getSubstring": this.Set.variable("STRING", '{textVariable}'),
            "text_changeCase": this.Set.text('TEXT', 'abc'),
            "text_trim": this.Set.text('TEXT', 'abc'),
            "text_count": this.Set.text('SUB', 'bon') + this.Set.text('TEXT', 'bonbon'),
            "text_replace": this.Set.text('FROM', 'a') + this.Set.text('TO', 'b') + this.Set.text('TEXT', 'abc'),
            "text_reverse": this.Set.text('TEXT', 'abc'),
            "text_count_characters": this.Set.text('TEXT', 'P@ssw0rd'),
            "text_random_string": this.Set.number('LENGTH', 6),
            // list
            "lists_create_with-0": '<mutation items="0"></mutation>',
            "lists_repeat": this.Set.number("NUM", 5),
            "lists_indexOf": this.Set.variable("LIST", '{listVariable}'),
            "lists_getIndex": this.Set.variable("VALUE", '{listVariable}'),
            "lists_append": this.Set.variable("LIST", '{listVariable}'),
            "lists_setIndex": this.Set.variable("LIST", '{listVariable}'),
            "lists_getSublist": this.Set.variable("LIST", '{listVariable}'),
            "lists_split": this.Set.text('DELIM', ',')
        }
    }
};