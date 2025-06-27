/**
 * Database of defaut blocks in Python toolbox.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            // display
            "display_print": this.Set.text("TEXT", '{hello}'),
            "display_input": this.Set.text("TEXT", '{setText}'),
            "display_input_number": this.Set.text("TEXT", '{setNumber}'),
            // display - time
            "time_sleep": this.Set.number("TIME", 1),
            "time_waitUntil": this.Set.valueInput("UNTIL", '<shadow type="logic_compare"><field name="OP">EQ</field>' + this.Set.number("B", 1) + '</shadow>'),
            // turtle
            "turtle_direction": this.Set.number("DISTANCE", 50),
            "turtle_turn": this.Set.number("DISTANCE", 90),
            "turtle_goto": this.Set.number("X", 50) + this.Set.number("Y", 50),
            "turtle_circle": this.Set.number("RADIUS", 50),
            "turtle_arc": this.Set.number("RADIUS", 50) + this.Set.number("ANGLE", 90),
            "turtle_write": this.Set.text("TYPE", '{hello}') + this.Set.number("VALUE", 14),
            "turtle_colour": this.Set.colour_picker('#2cb573') + this.Set.number("WIDTH", 5),
            "turtle_fill": this.Set.colour_picker('#2cb573'),
            "turtle_speed": this.Set.number("VALUE", 10),
            "turtle_screen_setup": this.Set.number("WIDTH", 400) + this.Set.number("HEIGHT", 400),
            "turtle_screen_color": this.Set.colour_picker('#2cb573'),

            // matplotlib
            "graph_matplotlib_setLabel": this.Set.text("TITLE_LABEL") + this.Set.text("X_LABEL") + this.Set.text("Y_LABEL"),
            "graph_matplotlib_text": this.Set.number("X") + this.Set.number("Y") + this.Set.text("TEXT"),
            "graph_matplotlib_plot": this.Set.valueInput("X", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100) + '</shadow>')
                + this.Set.valueInput("Y", '<shadow type="numpy_trig"><field name="OP">SIN</field>' + this.Set.valueInput("NUM", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100) + '</shadow>') + '</shadow>'),
            "graph_matplotlib_scatter": this.Set.valueInput("X", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100) + '</shadow>')
                + this.Set.valueInput("Y", '<shadow type="numpy_trig"><field name="OP">SIN</field>' + this.Set.valueInput("NUM", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100) + '</shadow>') + '</shadow>'),
            "graph_matplotlib_bar": this.Set.valueInput("LEFT", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 100) + this.Set.number("N", 50) + '</shadow>')
                + this.Set.valueInput("HEIGHT", '<shadow type="numpy_trig"><field name="OP">SIN</field>' + this.Set.valueInput("NUM", '<shadow type="numpy_linspace">' + this.Set.number("MIN") + this.Set.number("MAX", 50) + this.Set.number("N", 250) + '</shadow>') + '</shadow>'),
            // numpy
            "numpy_linspace": this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("N", 100),
            "numpy_arange": this.Set.number("MIN") + this.Set.number("MAX", 10) + this.Set.number("STEP", 1),
            "numpy_table_with_shape": this.Set.number("COL", 2) + this.Set.number("ROW", 4) + this.Set.number("VALUE"),
            "numpy_create_table_with": '<mutation items="3"></mutation>' + this.Set.number("ADD0") + this.Set.number("ADD1", 1) + this.Set.number("ADD2", 2),
            "numpy_square_matrix": '<mutation dim="3"></mutation>',
            "numpy_getElement_matrix": this.Set.number("I") + this.Set.number("J"),
            "numpy_getElement_list": this.Set.number("I"),
            //vittaia
            "vittaia_load_model": this.Set.text("MODEL_URL", '{modelPath}'),
            "vittaia_make_predictions_file": '<mutation picture=""></mutation>',
            "vittaia_detect_class": '<field name="IS_DETECTED">==</field>' + this.Set.text("MODEL_CLASS"),
            "vittaia_init_webcam": this.Set.number("CAMERA"),
            "vittaia_load_sound_model": this.Set.text("MODEL_URL", '{modelSoundPath}'),
            "vittaia_load_discussion": this.Set.text("MODEL_URL", '{modelPath}'),
            "vittaia_set_randomness": this.Set.number("TEMPERATURE", 50),
            "vittaia_load_posture_model": this.Set.text("MODEL_URL", '{modelPosturePath}'),

            // logic
            "controls_if": "<value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>",
            "controls_if-else": "<mutation else='1'></mutation><value name='IF0'><block type='logic_compare'>" + this.Set.number("B", 1) + "</block></value>",
            "logic_compare-eq": this.Set.field("OP", 'EQ') + this.Set.number("B", 1),
            "logic_compare-gte": this.Set.field("OP", 'GTE') + this.Set.number("B", 1),
            "logic_compare-lte": this.Set.field("OP", 'LTE') + this.Set.number("B", 1),
            "logic_compare-is": this.Set.field("OP", 'IS') + this.Set.number("B", 1),
            "logic_compare-isnot": this.Set.field("OP", 'ISNOT') + this.Set.number("B", 1),
            "logic_compare-in": this.Set.field("OP", 'IN') + this.Set.number("B", 1),
            "logic_compare-notin": this.Set.field("OP", 'NOTIN') + this.Set.number("B", 1),
            "logic_compare_2": this.Set.field("OP0", 'LTE') + this.Set.field("OP1", 'LTE') + this.Set.number("A", 1) + this.Set.number("C", 5),
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
            "math_map": this.Set.number("VALUE", 512) + this.Set.number("MIN1") + this.Set.number("MAX1", 1023) + this.Set.number("MIN2") + this.Set.number("MAX2", 255),
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