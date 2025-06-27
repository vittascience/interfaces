/**
 * Database of defaut blocks in Thymio toolbox.
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

            // display 
            "display_controlBuiltInLED": this.Set.colour_picker('#ff0000'),
            "display_RGBLed_setColor": this.Set.number("RED", 32) + this.Set.number("GREEN", 0) + this.Set.number("BLUE", 0),
            "display_RGBLed_setColorPalette": this.Set.colour_picker(),
            "display_circleLed_turnOn": this.Set.number("FRONT", 32) + this.Set.number("FRONT_RIGHT", 32) + this.Set.number("RIGHT", 32) + this.Set.number("BACK_RIGHT", 32) + this.Set.number("BACK", 32) + this.Set.number("BACK_LEFT", 32) + this.Set.number("LEFT", 32) + this.Set.number("FRONT_LEFT", 32),
            "display_proximityLed_turnOn": this.Set.number("FRONT_LEFT", 32) + this.Set.number("FRONT_LEFT_CENTRAL", 32) + this.Set.number("FRONT_CENTRAL_LEFT", 32) + this.Set.number("FRONT_CENTRAL_RIGHT", 32) + this.Set.number("FRONT_RIGHT_CENTRAL", 32) + this.Set.number("FRONT_RIGHT", 32) + this.Set.number("BACK_RIGHT", 32) + this.Set.number("BACK_LEFT", 32),
            "display_groundSensorLed_turnOn": this.Set.number("LEFT", 32) + this.Set.number("RIGHT", 32),
            "display_ledButtons_turnOn": this.Set.number("FRONT", 32) + this.Set.number("RIGHT", 32) + this.Set.number("LEFT", 32) + this.Set.number("BACK", 32),
            "display_temperatureLed_turnOn": this.Set.number("RED", 32) + this.Set.number("BLUE", 32),
            "display_rc_sound_SensorLed_turnOn": this.Set.number('VALUE', 32),
            "display_timer_flash_led": this.Set.colour_picker() + this.Set.number("TIME", 1),
            // io
            "io_timer_ms": this.Set.number("TIME", 1000),
            // io - sounds
            "io_sound_mic_threshold": this.Set.number("THRESHOLD", 40),
            // io - esp32
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
            
            // actuators - motors
            "robot_rotate_forever": this.Set.number("VALUE", 125),
            "robot_move": this.Set.number("VALUE", 125),
            "robot_rotate_clock": this.Set.number("VALUE", 125),
            "robot_change_single_motor_speed": this.Set.number("VALUE", 125),
            // actuators - sound
            "sound_play_sound_freq": this.Set.number("FREQ", 440) + this.Set.number("DURATION", 10),

            /** Python default blocks */

            // logic
            // "controls_if": "<value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>", // to keep just in case
            "controls_if": "<value name='IF0'></value>",
            // "controls_if-else": "<value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>" // to keep just in case
            "controls_if-else": "<value name='IF0'></value>"
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
            "math_single":  this.Set.number("NUM", 9),
            "math_trig":  this.Set.number("NUM", 45),
            "math_number_property":  this.Set.number("NUMBER_TO_CHECK", 9),
            "math_map":  this.Set.number("VALUE", 512) + this.Set.number("MIN1") + this.Set.number("MAX1", 1023) + this.Set.number("MIN2") + this.Set.number("MAX2", 100),
            "math_round": this.Set.number("NUM", 3.1) ,
            "math_modulo": this.Set.number("DIVIDEND", 64)  + this.Set.number("DIVISOR", 10) ,
            "math_constrain": this.Set.number("LOW", 1) + this.Set.number("HIGH", 100),
            "math_random_int": this.Set.number("FROM", 1) + this.Set.number("TO", 100),
            "math_atan2": this.Set.number("X", 1) + this.Set.number("Y", 1),
            // text
            "text_comment": this.Set.field("TEXT", '{comment}'),
            "text_newline": this.Set.number('N', 1),
            "text_append": this.Set.text('TEXT'),
            "text_split": this.Set.text('VALUE') + this.Set.text('SEP' ,';'),
            "text_length": this.Set.text('VALUE', 'abc'),
            "text_indexOf": this.Set.variable("VALUE", '{textVariable}') + this.Set.text('VALUE', 'abc'),
            "text_charAt": this.Set.variable("VALUE", '{textVariable}'),
            "text_getSubstring": this.Set.variable("STRING", '{textVariable}'),
            "text_changeCase": this.Set.text('TEXT', 'abc'),
            "text_trim": this.Set.text('TEXT', 'abc'),
            "text_count": this.Set.text('SUB', 'bon') + this.Set.text('TEXT', 'bonbon'),
            "text_replace": this.Set.text('FROM', 'a') + this.Set.text('TO', 'b') + this.Set.text('TEXT', 'abc'),
            "text_reverse": this.Set.text('TEXT', 'abc'),
            // list
            "lists_create_with-0": '<mutation items="0"></mutation>',
            "lists_repeat": this.Set.number("NUM", 5),
            "lists_indexOf": this.Set.variable("LIST", '{listVariable}'),
            "lists_getIndex": this.Set.variable("VALUE", '{listVariable}'),
            "lists_append": this.Set.variable("LIST", '{listVariable}'),
            "lists_setIndex": this.Set.variable("LIST", '{listVariable}'),
            "lists_getSublist": this.Set.variable("LIST", '{listVariable}'),
            "lists_split": this.Set.text('DELIM' ,',')
        }
    }
};