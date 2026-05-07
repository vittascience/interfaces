/**
 * Database of defaut blocks in Eliobot toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            /** Eliobot default blocks */

            // display 
            "display_controlBuiltInLED": this.Set.colour_picker('#ff0000'),
            "display_eyes_color": this.Set.colour_picker('#ff0000'),
            "display_eyes_emotion": this.Set.colour_picker('#ff0000'),
            // io - time
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><block type='logic_compare'>" + this.Set.field("OP", "EQ") + this.Set.number("B", 1) + "</block></value>",            // io - external modules
            "io_getGroveColoredButton": this.Set.field("PIN", "p25"),
            "io_setGroveColoredButton": this.Set.state(),
            "io_getGroveThumbJoystick": this.Set.field("PIN_Y", "p34"),
            // io - pins
            "io_writeDigitalPin": this.Set.state(),
            "io_writeAnalogPin": this.Set.number("VALUE", 255),
            "io_writePwm": this.Set.number("VALUE", PWM_MAX_DUTY),
            "io_setPwm": this.Set.number("FREQUENCY", 10),
            "io_getVoltage": this.Set.number("VALUE", 255),
            // communication
            "communication_serialWrite": '<mutation newlines="false"></mutation>' + this.Set.text('TEXT', "{hello}"),
            "communication_graphSerialWrite": "<mutation items='1'></mutation>"
                + "<value name='ADD0'><block type='communication_graphSerialWrite_datasFormat'><field name='NAME'>{data1}</field></block></value>",
            // sensors
            'sensors_line_set_sensitivity': this.Set.number("SENSITIVITY", 15000),
            // actuators - motors
            "robot_setSpeed": this.Set.number("SPEED", 50),
            "robot_rotate_degrees": this.Set.number("ANGLE", 90),
            "robot_move_one_step": this.Set.number("STEP", 1),
            "robot_set_square_size": this.Set.number("SIZE", 20),
            "robot_waiting": this.Set.number("TIME", 1),
            // actuators - buzzer
            "actuators_playnote": this.Set.number("TIME", 1),
            "actuators_setvolume": this.Set.number("VOLUME", 50),
            "actuators_frequency": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 1),
            // backpack - display
            "backpack_display_oled_text": this.Set.text('TEXT', "{hello}"),
            "backpack_display_matrix_logo_picker": this.Set.colour_picker('#ff0000'),
            "backpack_display_matrix_scroll_text": this.Set.text('TEXT', "{hello}") + this.Set.colour_picker('#ff0000'),
            // backpack - sensors
            "backpack_sensor_bme280_set_sea_level_pressure": this.Set.number("PRESSURE", 1013.25),
            // backpack - actuators
            "backpack_actuators_servo_motor_angle": this.Set.number("ANGLE", 90),
            "backpack_actuators_servo_motor_speed": this.Set.number("SPEED", 100),
            "backpack_actuators_grove_buzzer": this.Set.number("FREQUENCY", 440) + this.Set.number("VOLUME", 50),
            // network - wifi
            "network_wifi_connect": this.Set.text('SSID', "SSID") + this.Set.text('PASSWORD', "P@ssw0rd"),
            "network_wifi_open_access_point": this.Set.text('SSID', "SSID") + this.Set.text('PASSWORD', "P@ssw0rd"),
            "network_wifi_define_host_name": this.Set.text('NAME', "Eliobot"),
            "network_wifi_define_antenna_power": this.Set.number("POWER", 8.5),
            // network - html
            "network_html_create_page": this.Set.text('TEXT', "Titre de la page"),
            "network_html_create_button": this.Set.text('TEXT', "nom_du_bouton") + this.Set.colour_picker('#ff0000'),
            "network_html_create_title_tag": this.Set.text('TITLE', "titre"),
            "network_html_create_paragraph": this.Set.text('TEXT', "texte"),
            "network_html_display_value":  this.Set.number("VALUE", 0) + this.Set.text('NAME', "nom"),

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