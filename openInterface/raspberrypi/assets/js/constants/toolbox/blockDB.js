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
            /** raspberry pi default blocks */

            // display - SenseHat - matrix
            "sensehat_display_set_pixel": this.Set.number("X") + this.Set.number("Y") + this.Set.number("RED", 255) + this.Set.number("GREEN") + this.Set.number("BLUE"),
            "sensehat_display_set_pixel_palette": this.Set.number("X") + this.Set.number("Y") + this.Set.colour_picker(),
            "sensehat_display_set_pixels_image": this.Set.field("IMAGE", 'question_mark') + this.Set.colour_picker('#009900', "FOREGROUND_COLOR") + this.Set.colour_picker('#ffffff', "BACKGROUND_COLOR"),
            "sensehat_display_get_pixel": this.Set.number("X") + this.Set.number("Y"),
            "sensehat_show_leds_image": this.Set.colour_picker('#009900'),
            "sensehat_display_clear_with_color": this.Set.colour_picker('#009900'),
            "sensehat_display_show_message": this.Set.text('MESSAGE', 'Bonjour!') + this.Set.number("SPEED", 0.1) + this.Set.colour_picker('#009900') + this.Set.colour_picker('#ffffff', "BACKGROUND_COLOR"),
            "sensehat_display_show_letter": this.Set.text('LETTER', 'A') + this.Set.colour_picker('#009900') + this.Set.colour_picker('#ffffff', "BACKGROUND_COLOR"),
            // display - LCD
            "display_lcdSetText": this.Set.text('TEXT'),
            // display - neopixel
            "display_controlNeopixelLed": this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_controlColorNeopixelLed": this.Set.number("LED") + this.Set.colour_picker(),
            "display_neopixel_controlAllLedRGB": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_neopixel_controlAllLedPalette": this.Set.colour_picker(),
            // display - LED
            "display_setGroveSocketLed": this.Set.state(),
            "display_setLEDintensity": this.Set.number("VALUE", 100),
            "display_setVariableColorLED": this.Set.number("VALUE", 100),
            "display_setNumberGrove4Digit": this.Set.number("N", 1024),

            // io - time
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><block type='logic_compare'>" + this.Set.field("OP", "EQ") + this.Set.number("B", 1) + "</block></value>",
            // io - pins
            "io_writeDigitalPin": this.Set.state(),
            "io_writePwm": this.Set.number("VALUE", PWM_MAX_DUTY),
            "io_setPwm": this.Set.number("FREQUENCY", 10),
            // io - external inputs
            "io_setGroveColoredButton": this.Set.state(),

            // communication - serial
            "communication_serialWrite": '<mutation newlines="false"></mutation>' + this.Set.text('TEXT', "{hello}"),
            "communication_graphSerialWrite": "<value name='ADD0'><block type='communication_graphSerialWrite_datasFormat'><field name='NAME'>{data1}</field></block></value>"
                + "<mutation items='1'></mutation>",

            // sensors - cameras
            "sensors_rpi_camera_takeVideo": this.Set.number("DURATION", 5)
                + '<value name="FILENAME"><block type="text_join"><mutation items="2"></mutation>' + this.Set.text("ADD0", 'video_') + '<value name="ADD1"><block type="io_datetime_ymd_hms"></block></value></block></value>',
            "sensors_usb_camera_takeVideo": this.Set.number("DURATION", 5)
                + '<value name="FILENAME"><block type="text_join"><mutation items="2"></mutation>' + this.Set.text("ADD0", 'video_') + '<value name="ADD1"><block type="io_datetime_ymd_hms"></block></value></block></value>',
            "sensors_cv2_camera_savePicture": this.Set.variable("IMG", 'picture')
                + '<value name="FILENAME"><block type="text_join"><mutation items="2"></mutation>' + this.Set.text("ADD0", 'photo_') + '<value name="ADD1"><block type="io_datetime_ymd_hms"></block></value></block></value>',
            "sensors_camera_showPictureInVittascience-img": this.Set.variable("IMG", 'picture'),
            "sensors_camera_showPictureInVittascience-filename": '<value name="IMG"><block type="text_join"><mutation items="2"></mutation>' + this.Set.text("ADD0", 'photo_') + '<value name="ADD1"><block type="io_datetime_ymd_hms"></block></value></block></value>',
            "sensors_camera_showVideoInVittascience": '<value name="FILENAME"><block type="text_join"><mutation items="2"></mutation>' + this.Set.text("ADD0", 'video_') + '<value name="ADD1"><block type="io_datetime_ymd_hms"></block></value></block></value>',

            // actuators - motors
            "actuators_setServoAngle": this.Set.number("ANGLE", 90),
            "actuators_continuousServo_setSpeed": this.Set.number("SPEED", 100),
            "actuators_setMotorPower": this.Set.number("POWER", 100),
            "actuators_setVibrationMotorState": this.Set.state(),
            "actuators_setGroveRelayState": this.Set.state(),
            // actuators - MOSFET
            "actuators_mosfet_setState": this.Set.state(),
            "actuators_mosfet_setPercentValue": this.Set.number("VALUE", 100),
            "actuators_mosfet_setFrequency": this.Set.number("FREQUENCY", 10),
            // actuators - music
            "actuators_music_playNotes":
                `<mutation items='3'></mutation>
                <value name='ADD0'><block type='actuators_music_note'><field name='NOTE'>d</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD1'><block type='actuators_music_note'><field name='NOTE'>f#</field><field name='OCTAVE'>4</field></block></value>
                <value name='ADD2'><block type='actuators_music_note'><field name='NOTE'>g</field><field name='OCTAVE'>4</field></block></value>`,
            "actuators_music_playFrequency": this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 500),

            // network - wifi
            "network_get_pi_name": this.Set.text("PINAME", "pi"),

            // robots - yahboom g1 tank
            "robots_yahboom_g1tank_setLedColor": this.Set.state(),
            "robots_yahboom_g1tank_setLedColor_RGB": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "robots_yahboom_g1tank_setLedColor_Palette": this.Set.colour_picker('#009900'),
            "robots_yahboom_g1tank_setLEDServoAngle": this.Set.number("ANGLE", 90),
            "robots_yahboom_g1tank_setGo": this.Set.number("SPEED", 20),
            "robots_yahboom_g1tank_turn": this.Set.number("SPEED", 20),
            "robots_yahboom_g1tank_spin": this.Set.number("SPEED", 20),
            "robots_yahboom_g1tank_controlMotors": this.Set.number("SPEED", 20),
            "robots_yahboom_g1tank_setCameraPanAngle": this.Set.number("ANGLE", 90),
            "robots_yahboom_g1tank_setCameraTiltAngle": this.Set.number("ANGLE", 30),

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
            "math_map": this.Set.number("VALUE", 512) + this.Set.number("MIN1") + this.Set.number("MAX1", 1023) + this.Set.number("MIN2") + this.Set.number("MAX2", 100),
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
            "text_includesSubstr": this.Set.variable("VALUE", '{textVariable}') + this.Set.text('FIND', 'abc'),
            "text_indexOf": this.Set.variable("VALUE", '{textVariable}') + this.Set.text('FIND', 'abc'),
            "text_charAt": this.Set.variable("VALUE", '{textVariable}'),
            "text_getSubstring": this.Set.variable("STRING", '{textVariable}'),
            "text_count_characters": this.Set.text('TEXT', 'P@ssw0rd'),
            "text_changeCase": this.Set.text('TEXT', 'abc'),
            "text_trim": this.Set.text('TEXT', 'abc'),
            "text_count": this.Set.text('SUB', 'bon') + this.Set.text('TEXT', 'bonbon'),
            "text_replace": this.Set.text('FROM', 'a') + this.Set.text('TO', 'b') + this.Set.text('TEXT', 'abc'),
            "text_reverse": this.Set.text('TEXT', 'abc'),
            "text_random_string": this.Set.number('LENGTH', 6),
            "text_caesar_cipher": this.Set.text('TEXT', '{hello}') + this.Set.number('SHIFT', 3),
            "text_caesar_cipher_brute_force": this.Set.text('TEXT', 'Erqmrxu hw elhqyhqxh vxu Ylwwdvflhqfh'),
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