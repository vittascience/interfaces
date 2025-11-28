/**
 * Database of defaut blocks in Codey toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            // display 
            "display_showRGB": this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B", 255),
            "display_setRed": this.Set.number("R", 255),
            "display_setGreen": this.Set.number("G", 255),
            "display_setBlue": this.Set.number("B", 255),
            "display_show": this.Set.text('TEXT', "{hello}"),
            "display_setPixel": this.Set.number("X", 0) + this.Set.number("Y", 0) + this.Set.state(),
            "display_getPixel": this.Set.number("X", 0) + this.Set.number("Y", 0),
            "display_togglePixel": this.Set.number("X", 0) + this.Set.number("Y", 0),

            // io - time
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><block type='logic_compare'>" + this.Set.field("OP", "EQ") + this.Set.number("B", 1) + "</block></value>",            // io - events

            // communication
            "communication_irSend": this.Set.text("DATA", "{hello}"),
            "communication_irSaveLearnedResult": this.Set.number("INDEX", 0),
            "communication_irSendLearnedResult": this.Set.number("INDEX", 0),
            "communication_irLearn": this.Set.number("TIME", 1),

            // actuators
            "actuators_audio_play_note": this.Set.text("NOTE", "A3")
                + '<mutation duration="false"></mutation>',
            "actuators_audio_play_tone": this.Set.number("FREQUENCY", 440)
                + '<mutation duration="false"></mutation>',
            "actuators_audio_rest": this.Set.number("DURATION", 1),
            "actuators_audio_set_volume": this.Set.number("VOLUME", 50),
            "actuators_audio_set_tempo": this.Set.number("TEMPO", 60),

            // robots
            "robots_move": this.Set.number("SPEED", 50),
            "robots_drive": this.Set.number("LEFT_SPEED", 50) + this.Set.number("RIGHT_SPEED", 50),
            "robots_turnByDegree": this.Set.number("DEGREES", 90),

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