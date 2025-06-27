/**
 * Database of defaut blocks in CyberPi toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            /** esp32 default blocks */

            // display - LEDs
            "cyberpi_led_on_all_RGB": this.Set.number("R") + this.Set.number("G", 255) + this.Set.number("B"),
            "cyberpi_led_on_all_palette": this.Set.colour_picker('#ff0000'),
            "cyberpi_led_on_RGB": this.Set.number("ID", 1) + this.Set.number("R") + this.Set.number("G", 255) + this.Set.number("B"),
            "cyberpi_led_on_palette": this.Set.number("ID", 1) + this.Set.colour_picker('#22b573'),
            "cyberpi_led_move": this.Set.number("STEP", 1),
            "cyberpi_led_set_brightness": this.Set.number("BRIGHTNESS", 100),
            // display - console
            "cyberpi_console_print": this.Set.text("TEXT", "{hello_cyberpi}"),
            // display - text
            "cyberpi_display_show_label": this.Set.text("TEXT", "{label}"),
            "cyberpi_display_show_label_xy": this.Set.text("TEXT", "{label}") + this.Set.number("X") + this.Set.number("Y"),
            // display - graphics
            'cyberpi_linechart_add': this.Set.number("DATA", 20),
            'cyberpi_linechart_set_step': this.Set.number("STEP", 2),
            'cyberpi_barchart_add': this.Set.number("DATA", 20),
            'cyberpi_table_add': this.Set.number("DATA", 20) + this.Set.number("X", 1) + this.Set.number("Y", 1),
            'cyberpi_chart_map': this.Set.number("VALUE", 10) + this.Set.number("MIN", -50) + this.Set.number("MAX", 50),
            'cyberpi_chart_set_brush': this.Set.number("R") + this.Set.number("G", 255) + this.Set.number("B"),
            "cyberpi_chart_set_brush_palette": this.Set.colour_picker('#22b573'),
            // io - time
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><block type='logic_compare'>" + this.Set.field("OP", "EQ") + this.Set.number("B", 1) + "</block></value>",            // io - events
            "io_cyberpi_broadcast": '<field name="MESSAGE">nom_de_l_événement</field>',
            "io_event_receive": '<field name="MESSAGE">nom_de_l_événement</field>',
            // io - pins
            "io_writeDigitalPin": this.Set.state(),
            // "io_writeAnalogPin": this.Set.number("VALUE", 255),
            "io_writePwm": this.Set.number("VALUE", PWM_MAX_DUTY),
            "io_setPwm": this.Set.number("FREQUENCY", 10),
            "io_getVoltage": this.Set.number("VALUE", 255),
            // communication - console
            "communication_serialWrite": this.Set.text('TEXT', "{hello}")
                + '<mutation newlines="false"></mutation>',
            "communication_graphSerialWrite": "<value name='ADD0'><block type='communication_graphSerialWrite_datasFormat'><field name='NAME'>{data1}</field></block></value>"
                + "<mutation items='1'></mutation>",
            "communication_playComputerFrequency": this.Set.number("FREQUENCY", 440),
            // actuators - audio
            "actuators_audio_play_tone": this.Set.number("FREQUENCY", 440)
                + '<mutation duration="false"></mutation>',
            "actuators_audio_play_note": this.Set.number("NOTE", 69) + this.Set.number("DURATION", 0.25),
            "actuators_audio_play_drum": this.Set.number("DURATION", 0.25),
            "actuators_audio_add_tempo": this.Set.number("TEMPO", 20),
            "actuators_audio_set_tempo": this.Set.number("TEMPO", 100),
            "actuators_audio_add_volume": this.Set.number("VOLUME", 20),
            "actuators_audio_set_volume": this.Set.number("VOLUME", 50),
            "mbot2_motors_set_power": this.Set.number("POWER", 50),
            "mbot2_motors_add_power": this.Set.number("POWER", 15),
            "mbot2_servos_set_angle": this.Set.number("ANGLE", 90),
            "mbot2_servos_add_angle": this.Set.number("ANGLE", 45),
            // robots - motors
            "robots_mbot2_move": this.Set.number("SPEED", 50)
                + '<mutation duration="false"></mutation>',
            "robots_mbot2_move_by": this.Set.number("DISTANCE", 100),
            "robots_mbot2_turn": this.Set.number("ANGLE", 90),
            "robots_mbot2_control_motor": this.Set.number("VALUE", 50),
            "robots_mbot2_turn_motor": this.Set.number("ANGLE", 180) + this.Set.number("SPEED", 50),
            // robots - ultrasonic sensor
            "robots_mbot2_ultrasonic_setBrightness": this.Set.number("ID", 1) + this.Set.number("BRIGHTNESS", 50),
            "robots_mbot2_ultrasonic_getBrightness": this.Set.number("ID", 1),
            "robots_mbot2_ultrasonic_stopLED": this.Set.number("ID", 1),
            // robots - quad RGB sensor
            "sensors_mbuild_quad_RGB_set_color_RGB": this.Set.number("R") + this.Set.number("G", 255) + this.Set.number("B")
                + '<mutation tolerance="false"></mutation>',
            "sensors_mbuild_quad_RGB_set_color_palette": this.Set.colour_picker('#ff0000')
                + '<mutation tolerance="false"></mutation>',
            // network - wifi
            "cyberpi_wifi_connect": this.Set.text("SSID") + this.Set.text("PASSWORD"),
            // network - LAN
            "cyberpi_wifi_broadcast_set": this.Set.text("MESSAGE_NAME", "nom_du_message"),
            "cyberpi_wifi_broadcast_get": this.Set.text("MESSAGE_NAME", "nom_du_message"),

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