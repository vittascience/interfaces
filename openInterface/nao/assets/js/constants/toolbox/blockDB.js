/**
 * Database of defaut blocks in NAOtoolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            // Display
            "display_fade": this.Set.number("INTENSITY", 50) + this.Set.number("DURATION", 1),
            "display_fadeRGB": this.Set.number("R", 0) + this.Set.number("G", 100) + this.Set.number("B", 0) + this.Set.number("DURATION", 1),
            "display_fadeRGB_palette": this.Set.colour_picker('#3333FF') + this.Set.number("DURATION", 1),
            "display_fadeRGB_colorName": this.Set.number("DURATION", 1),
            "display_fadeFaceRGB": this.Set.number("ID", 0) + this.Set.number("R", 0) + this.Set.number("G", 100) + this.Set.number("B", 0) + this.Set.number("DURATION", 1),
            "display_fadeFaceRGB_palette": this.Set.number("ID", 0) + this.Set.colour_picker('#3333FF') + this.Set.number("DURATION", 1),

            "display_setIntensity": this.Set.number("INTENSITY", 50),
            "display_randomEyes": this.Set.number("DURATION", 1),
            "display_rasta": this.Set.number("DURATION", 1),
            "display_rotateEyes": this.Set.colour_picker('#3333FF') + this.Set.number("TIME_FOR_ROTATION", 1) + this.Set.number("DURATION", 2),

            // Communication
            "communication_animatedSpeech_say": this.Set.text('TEXT', "{hello}"),
            "communication_textToSpeech_say": this.Set.text('TEXT', "{hello}"),
            "communication_asr_setVocabulary": "<value name='VOCABULARY'><block type='lists_create_with'>"+ '<mutation items="2"></mutation><value name="ADD0">'+ '<shadow type="text">'+ this.Set.field("TEXT", 'oui') +'</shadow></value><value name="ADD1">><shadow type="text">'+ this.Set.field("TEXT", 'non') +'</shadow></value></block></value>',
            // time
            "time_pause": this.Set.number("TIME", 1),
            "time_waitUntil": "<value name='UNTIL'><shadow type='logic_compare'>" + this.Set.field("OP", 'EQ') + this.Set.number("B", 1) + "</shadow></value>",
            
            // Movements
            "movements_moveTo": this.Set.number("DISTANCE", 50),
            "movements_rotate": this.Set.number("ANGLE", 90),
            "movements_moveToXY": this.Set.number("X", 0) + this.Set.number("Y", 0) + this.Set.number("THETA", 0),
            "movements_goToPosture": this.Set.number("SPEED", 50),
            "movements_angleInterpolationWithSpeed_1": this.Set.number("ANGLE", 0) + this.Set.number("SPEED", 50),
            "movements_angleInterpolationWithSpeed_2": this.Set.number("ANGLE", 0) + this.Set.number("SPEED", 50),
            "movements_angleInterpolationWithSpeed_3": this.Set.number("ANGLE", 0) + this.Set.number("SPEED", 50),
            "movements_angleInterpolationWithSpeed_4": this.Set.number("ANGLE", 0) + this.Set.number("SPEED", 50),
            "movements_angleInterpolationWithSpeed_5": this.Set.number("ANGLE", 0) + this.Set.number("SPEED", 50),
            "movements_setAnglesArmes_radians": this.Set.number("HEAD_YAW", 0) + this.Set.number("HEAD_PITCH", 0) + this.Set.number("L_SHOULDER_PITCH", 0) + this.Set.number("L_SHOULDER_ROLL", 0) + this.Set.number("L_ELBOW_ROLL", -0.04) + this.Set.number("L_ELBOW_YAW", 0) + this.Set.number("L_WRIST_YAW", 0) + this.Set.number("L_HAND", 0) + this.Set.number("R_SHOULDER_PITCH", 0) + this.Set.number("R_SHOULDER_ROLL", 0) + this.Set.number("R_ELBOW_YAW", 0) + this.Set.number("R_ELBOW_ROLL", 0.04) + this.Set.number("R_WRIST_YAW", 0) + this.Set.number("R_HAND", 0),
            "movements_setAnglesArmes_degres": this.Set.number("HEAD_YAW", 0) + this.Set.number("HEAD_PITCH", 0) + this.Set.number("L_SHOULDER_PITCH", 0) + this.Set.number("L_SHOULDER_ROLL", 0) + this.Set.number("L_ELBOW_ROLL", -2) + this.Set.number("L_ELBOW_YAW", 0) + this.Set.number("L_WRIST_YAW", 0) + this.Set.number("L_HAND", 0) + this.Set.number("R_SHOULDER_PITCH", 0) + this.Set.number("R_SHOULDER_ROLL", 0) + this.Set.number("R_ELBOW_YAW", 0) + this.Set.number("R_ELBOW_ROLL", 2) + this.Set.number("R_WRIST_YAW", 0) + this.Set.number("R_HAND", 0),

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
            "math_map": this.Set.number("VALUE", 512) + this.Set.number("MIN1") + this.Set.number("MAX1", 1024) + this.Set.number("MIN2") + this.Set.number("MAX2", 100),
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