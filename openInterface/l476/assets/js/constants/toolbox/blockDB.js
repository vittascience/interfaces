/**
 * Database of defaut blocks in L476 toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {

            /** l476 default blocks */

            // display - l476
            "display_l476_controlColorLed": this.Set.state(),
            // display - LCD
            "display_lcdSetText": this.Set.text('TEXT'),
            "display_lcdSetColor": this.Set.number("R") + this.Set.number("G", 255) + this.Set.number("B"),
            "display_lcdSetColorPalette": this.Set.colour_picker('#22b573'),
            // display - OLED
            "display_addOledText": this.Set.number("X") + this.Set.number("Y") + this.Set.text("TEXT"),
            "display_setOledPixel": this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            "display_drawOledLine": this.Set.number("XA") + this.Set.number("YA", 32) + this.Set.number("XB", 128) + this.Set.number("YB", 32),
            // display - LED matrix
            "display_rgb_led_matrix_DrawBitmap": '<mutation duration="false"></mutation>',
            // display - LED
            "display_setGroveSocketLed": this.Set.state(),
            "display_setLEDintensity": this.Set.number("VALUE", 100),
            "display_setVariableColorLED": this.Set.number("VALUE", 100),
            "display_setNumberGrove4Digit": this.Set.field("DIO", "'D3'") + this.Set.number("N", 1024),
            "display_setClockGrove4Digit": this.Set.field("DIO", "'D3'"),
            "display_setLevelLedBar": this.Set.field("DCKI", "'D3'") + this.Set.number("VALUE", 3.14),
            "display_my9221_reverse": this.Set.field("DCKI", "'D3'") + this.Set.state(),
            // display - neopixel
            "display_defineNeopixel": this.Set.number("N", 20) + this.Set.field("PIN", "pin0"),
            "display_controlNeopixelLed": this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B", 255),
            "display_controlColorNeopixelLed": this.Set.number("LED") + this.Set.colour_picker(),
            "display_neopixel_controlAllLedRGB": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_neopixel_controlAllLedPalette": this.Set.colour_picker(),
            // display - chainable RGB LED
            "display_defineChainableRGBLed": this.Set.field("DIN", "'D3'"),
            "display_setColorChainableRGBLed": this.Set.field("DIN", "'D3'") + this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_setPaletteColorChainableRGBLed": this.Set.field("DIN", "'D3'") + this.Set.number("LED") + this.Set.colour_picker(),
            "display_setColorAllChainableRGBLed": this.Set.field("DIN", "'D3'") + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_setPaletteAllChainableRGBLed": this.Set.field("DIN", "'D3'") + this.Set.colour_picker(),
            "display_resetAllChainableRGBLed": this.Set.field("DIN", "'D3'"),
            // io - l476
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><shadow type='logic_compare'>" + this.Set.field("OP", 'EQ') + this.Set.number("B", 1) + "</shadow></value>",
            // io - external modules
            "io_getGroveColoredButton": this.Set.field("PIN", "'D3'"),
            "io_setGroveColoredButton": this.Set.state(),
            "io_getGroveThumbJoystick": this.Set.field("PIN_Y", "'A1'"),
            // io - pins
            "io_writeDigitalPin": this.Set.state(),
            "io_writePwm": this.Set.number("VALUE", 50),
            "io_setPwm": this.Set.number("FREQUENCY", 10),
            "io_getVoltage": this.Set.number("VALUE", 1023),
            // sensors
            "sensors_getGroveHighTemperature": this.Set.field("A1", "'A1'"),
            // communication - serial connection
            "communication_serialWrite": '<mutation newlines="false"></mutation>' + this.Set.text('TEXT', "{hello}"),
            "communication_graphSerialWrite": "<mutation items='1'></mutation>"
                + "<value name='ADD0'><block type='communication_graphSerialWrite_datasFormat'><field name='NAME'>{data1}</field></block></value>",
            "communication_playComputerFrequency": this.Set.number("FREQUENCY", 440),
            "communication_FizziqBT": this.Set.number('VALUE', 25),
            // communication - tracking modules
            "communication_l476_RTC_setTime": this.Set.number("HOUR", 8) + this.Set.number("MIN", 40) + this.Set.number("SEC", 10),
            // communication - NFC
            "communication_M24SR64_nfc_writeTag": this.Set.text('TEXT', "{hello}"),
            // communication - UART
            "communication_uartInit": this.Set.number("BAUD", 9600),
            "communication_uartWrite": this.Set.text("TEXT", "{hello}"),
            // communication - LoRa
            "communication_loraInit": this.Set.text("APPEUI", "01 01 01 01 01 01 01 02") + this.Set.text("APPKEY", "2B 7E 15 16 28 AE D2 A6 AB F7 15 88 09 CF 4F 3C") + '<mutation devaddr="false"></mutation>',
            // sensors - gas
            "sensors_SCD30_forcedCalibration": this.Set.number('DEFAULT', 420),
            // actuators - motors
            "actuators_setServoAngle": this.Set.number("ANGLE", 90),
            "actuators_continuousServo_setSpeed": this.Set.number("SPEED", 100),
            "actuators_setMotorPower": this.Set.number("POWER", 100),
            "actuators_setVibrationMotorState": this.Set.state(),
            "actuators_setGroveRelayState": this.Set.state(),
            // actuators - MOSFET
            "actuators_mosfet_setState": '<mutation pull="false"></mutation>' + this.Set.state(),
            "actuators_mosfet_setPercentValue": '<mutation pull="false"></mutation>' + this.Set.number("VALUE", 100),
            "actuators_mosfet_setFrequency": '<mutation pull="false"></mutation>' + this.Set.number("FREQUENCY", 10),
            // actuators - buzzer/speaker
            "actuators_music_playNotes":
                `<mutation items='3'></mutation>
                <value name='ADD0'><block type='actuators_music_note'><field name='NOTE'>d</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD1'><block type='actuators_music_note'><field name='NOTE'>f#</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD2'><block type='actuators_music_note'><field name='NOTE'>g</field><field name='OCTAVE'>4</field></block></value>`,
            "actuators_music_playFrequency": this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 500),
            // robots - donutbot
            "robots_donutbot_setGo": this.Set.number("SPEED", 50),
            "robots_donutbot_controlMotor": this.Set.number("SPEED", 50),
            "robots_donutbot_turnTo": this.Set.number("SPEED", 50),
            "robots_donutbot_turnToAngle": this.Set.number("ANGLE", 90) + this.Set.number("SPEED", 50),
            "robots_donutbot_neopixel_setColor": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "robots_donutbot_neopixel_setPaletteColor": this.Set.colour_picker('#22b573'),
            "robots_donutbot_blinkRobot": this.Set.colour_picker('#ff0000'),
            "robots_donutbot_BLE_SendData": this.Set.text("DATA"),
            "robots_donutbot_lineDetectorThreshold": this.Set.number("THRESHOLD", 50),
            // robots - alphabot
            "robots_alphabot_lineFinder_getSensorAboveLine": "<mutation limit='false'></mutation>",
            "robots_alphabot_lineFinder_isSensorAboveLine": "<mutation limit='false'></mutation>",
            "robots_alphabot_setGo": this.Set.number("SPEED", 50),
            "robots_alphabot_controlMotor": this.Set.number("SPEED", 50),
            "robots_alphabot_turnTo": this.Set.number("SPEED", 50),
            "robots_alphabot_oled_addText": this.Set.number("X") + this.Set.number("Y") + this.Set.text("TEXT"),
            "robots_alphabot_neopixel_setColor": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "robots_alphabot_neopixel_setPaletteColor": this.Set.colour_picker('#22b573'),
            "robots_alphabot_buzzer_playFrequency": this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 500),
            "robots_alphabot_buzzer_controlState": this.Set.state(),
            // camera - Wio Lite
            "wio_get_class_data_by_id": this.Set.number("ID", 1),

            /** Python default blocks */

            // logic
            "controls_if": "<value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>",
            "controls_if-else": "<mutation else='1'></mutation><value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>",
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
            "math_map": this.Set.number("VALUE", 2048) + this.Set.number("MIN1") + this.Set.number("MAX1", 4095) + this.Set.number("MIN2") + this.Set.number("MAX2", 1023),
            "math_round": this.Set.number("NUM", 3.1),
            "math_round_ndigits": this.Set.number("NUM", 3.1) + this.Set.number("DIGITS", 2),
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
