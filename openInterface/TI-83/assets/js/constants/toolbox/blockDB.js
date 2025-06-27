/**
 * Database of defaut blocks in TI-83 Premium CE toolbox.
 * There is only blocks which require defaut inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {

            /** Innovator Hub default blocks */
            // ti_draw
            "ti_draw_set_window": this.Set.number("WIDTH", 100) + this.Set.number("HEIGHT", 100),
            "ti_draw_draw_line": this.Set.number("X1", 0) + this.Set.number("Y1", 0) + this.Set.number("X2", 100) + this.Set.number("Y2", 100),
            "ti_draw_draw_circle": this.Set.number("X", 50) + this.Set.number("Y", 50) + this.Set.number("RADIUS", 50),
            "ti_draw_fill_circle": this.Set.number("X", 50) + this.Set.number("Y", 50) + this.Set.number("RADIUS", 50),
            "ti_draw_draw_rect": this.Set.number("X", 0) + this.Set.number("Y", 0) + this.Set.number("WIDTH", 100) + this.Set.number("HEIGHT", 100),
            "ti_draw_fill_rect": this.Set.number("X", 0) + this.Set.number("Y", 0) + this.Set.number("WIDTH", 100) + this.Set.number("HEIGHT", 100),
            'ti_draw_draw_text': this.Set.number("X", 150) + this.Set.number("Y", 100)+this.Set.text("TEXT", "Bonjour!"), 
            "ti_draw_set_color": this.Set.number("COLOR_RED", 255) + this.Set.number("COLOR_GREEN", 0) + this.Set.number("COLOR_BLUE", 0),
            // "ti_draw_set_pen": this.Set.text("THICKNESS", "small")+ this.Set.text("STYLE", "solid"),
            "ti_draw_plot_xy": this.Set.number("X", 150) + this.Set.number("Y", 80),
            "ti_system_store_list": this.Set.variable("LIST", '{listVariable}'),
            "ti_system_while_condition": '<value name="CONDITION"><shadow type="logic_negate"><value name="BOOL"><shadow type="ti_io_escape"></shadow></value></shadow></value>',
            "ti_system_if_condition": '<value name="CONDITION"><shadow type="ti_io_escape"></shadow></value>',
            "ti_system_disp_at": this.Set.text("TEXT", "texte") + this.Set.number("LINE", 4),
            "ti_system_disp_cursor": this.Set.state("hub_"),
            "ti_system_sleep": this.Set.number("TIME", 1),
            // ti - console
            "ti_io_print": this.Set.text("TEXT", "{hello}"),
            "ti_io_input_text": this.Set.text("TEXT", "{setText}"),
            "ti_io_input_number": this.Set.text("TEXT", "{setNumber}"),
            // ti - time
            "io_wait": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><shadow type='logic_compare'>" + this.Set.field("OP", 'EQ') + this.Set.number("B", 1) + "</shadow></value>",
            // ti - random
            "random_randint": this.Set.number("MIN") + this.Set.number("MAX", 10),
            "random_uniform": this.Set.number("MIN") + this.Set.number("MAX", 10),
            "random_randrange": this.Set.number("START") + this.Set.number("END", 10) + this.Set.number("STEP", 4),
            "random_choice": `<value name="SEQUENCE">
                    <block type="lists_create_with"><mutation items="4"></mutation>`
                        + this.Set.number("ADD0", 1, true) + this.Set.number("ADD1", 2, true) + this.Set.number("ADD2", 3, true) + this.Set.number("ADD3", 4, true) +
                    `</block>
                </value>`,
            // hub - built-in

            "devices_builtin_setLEDRGB": this.Set.number("R") + this.Set.number("G", 255) + this.Set.number("B"),
            "devices_builtin_setLEDRGBPalette": this.Set.colour_picker('#3366ff'),
            "devices_builtin_setRedLed": this.Set.state("hub_"),
            "devices_builtin_speaker_playNotes":
                '<mutation items="3"></mutation>'
                + '<value name="ADD0"><block type="devices_builtin_speaker_note">' + this.Set.field("NOTE", 'd') + this.Set.field("OCTAVE", '4')  + '</block></value>'
                + '<value name="ADD1"><block type="devices_builtin_speaker_note">' + this.Set.field("NOTE", 'f#') + this.Set.field("OCTAVE", '4')  + '</block></value>'
                + '<value name="ADD2"><block type="devices_builtin_speaker_note">' + this.Set.field("NOTE", 'g') + this.Set.field("OCTAVE", '4')  + '</block></value>',
            "devices_builtin_speaker_playFrequency": this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 0.5),
            // hub - grove outputs
            "devices_grove_setSocketLed": this.Set.state("hub_"),
            "devices_grove_setLEDintensity": this.Set.number("VALUE", 255),
            "devices_grove_setServoAngle":  this.Set.number("ANGLE", 90),
            "devices_grove_setRelayState": this.Set.state("hub_"),
            "devices_grove_setVibrationMotorState": this.Set.state("hub_"),
            "devices_grove_setVibrationMotorValue": this.Set.number("VALUE", 255),
            "devices_grove_setPowerState": this.Set.state("hub_"),
            "devices_grove_setPowerValue": this.Set.number("POWER", 100),
            // hub - pins
            "io_hub_writeDigitalPin": this.Set.state("hub_"),
            "io_hub_writeAnalogPin": this.Set.number("VALUE", 255),
            "io_hub_setPwm": this.Set.number("FREQ", 10) + this.Set.number("PERCENT", 50),
            // graphics - setting
            "ti_plotlib_window": this.Set.number("XMIN", -5) + this.Set.number("XMAX", 5) + this.Set.number("YMIN", -5) + this.Set.number("YMAX", 5),
            "ti_plotlib_auto_window":
                `<value name="XLIST">
                    <block type="lists_create_with"><mutation items="5"></mutation>`
                        + this.Set.number("ADD0", 0, true) + this.Set.number("ADD1", 0.5, true) + this.Set.number("ADD2", 1, true) + this.Set.number("ADD3", 1.5, true) + this.Set.number("ADD4", 2, true) +
                    `</block>
                </value>
                <value name="YLIST">
                    <block type="lists_create_with"><mutation items="5"></mutation>`
                        + this.Set.number("ADD0", 0, true) + this.Set.number("ADD1", 0.25, true) + this.Set.number("ADD2", 1, true) + this.Set.number("ADD3", 2.25, true) + this.Set.number("ADD4", 4, true) +
                    `</block>
                </value>`,
            "ti_plotlib_grid": this.Set.number("XSCL", 1) + this.Set.number("YSCL", 1),
            "ti_plotlib_labels": this.Set.text("XLABEL", "xaxis") + this.Set.number("XPOS", 6) + this.Set.text("YLABEL", "yaxis") + this.Set.number("YPOS", 1),
            "ti_plotlib_title": this.Set.text("TITLE", "titre du graphe"),
            // graphivcs - draw
            "ti_plotlib_define_color": this.Set.number("R", 34) + this.Set.number("G", 181) + this.Set.number("B", 115),
            "ti_plotlib_define_palette_color": this.Set.colour_picker('#22b573'),
            "ti_plotlib_scatter": 
                `<value name="X">
                    <block type="lists_create_with"><mutation items="5"></mutation>`
                        + this.Set.number("ADD0", 0, true) + this.Set.number("ADD1", 0.5, true) + this.Set.number("ADD2", 1, true) + this.Set.number("ADD3", 1.5, true) + this.Set.number("ADD4", 2, true) +
                    `</block>
                </value>
                <value name="Y">
                    <block type="lists_create_with"><mutation items="5"></mutation>`
                        + this.Set.number("ADD0", 0, true) + this.Set.number("ADD1", 0.25, true) + this.Set.number("ADD2", 1, true) + this.Set.number("ADD3", 2.25, true) + this.Set.number("ADD4", 4, true) +
                    `</block>
                </value>`,
            "ti_plotlib_plot":
                `<value name="X">
                    <block type="lists_create_with"><mutation items="5"></mutation>`
                        + this.Set.number("ADD0", 0, true) + this.Set.number("ADD1", 0.5, true) + this.Set.number("ADD2", 1, true) + this.Set.number("ADD3", 1.5, true) + this.Set.number("ADD4", 2, true) +
                    `</block>
                </value>
                <value name="Y">
                    <block type="lists_create_with">
                        <mutation items="5"></mutation>`
                        + this.Set.number("ADD0", 0, true) + this.Set.number("ADD1", 0.25, true) + this.Set.number("ADD2", 1, true) + this.Set.number("ADD3", 2.25, true) + this.Set.number("ADD4", 4, true) +
                    `</block>
                </value>`,
            "ti_plotlib_line": this.Set.number("XA", 1) + this.Set.number("YA", 1) + this.Set.number("XB", 1) + this.Set.number("YB", 3),
            "ti_plotlib_lin_reg": this.Set.field("POSITION", "center") + this.Set.field("LINE", 10),
            "ti_plotlib_text_at": this.Set.text("TEXT", "texte") + this.Set.number("LINE", 4),
            // rover - drive
            "robots_rover_setGo": this.Set.number("UNIT", 3) + this.Set.number("SPEED", 0.185),
            "robots_rover_setGoTime": this.Set.number("DURATION", 3) + this.Set.number("SPEED", 0.185),
            "robots_rover_turnTo": this.Set.number("ANGLE", 90),
            "robots_rover_controlMotor": this.Set.number("SPEED", 255) + this.Set.number("DURATION", 2),
            "robots_rover_moveToXY": this.Set.number("X", 5) + this.Set.number("Y", -2),
            "robots_rover_moveToPolar": this.Set.number("R", 2.8) + this.Set.number("THETA", 45),
            "robots_rover_stay": this.Set.number("DURATION", 3),
            // rover - outputs
            "robots_rover_setLEDRGB": this.Set.number("R") + this.Set.number("G", 255) + this.Set.number("B"),
            "robots_rover_setLEDRGBPalette": this.Set.colour_picker('#ff0000'),
            "robots_rover_blinkLEDRGB": this.Set.number("FREQ", 10) + this.Set.number("DURATION", 5),
            // microbit - commands
            "microbit_sleep": this.Set.number("TIME", 1000),
            "microbit_while_condition": '<value name="CONDITION"><shadow type="logic_negate"><value name="BOOL"><shadow type="microbit_escape"></shadow></value></shadow></value>',
            "microbit_store_list": this.Set.variable("LIST", '{listVariable}'),
            // microbit - screen
            'show_number': this.Set.number("VALUE"),
            'show_number-txt': this.Set.text("VALUE", "{hello}"),
            'show_string-num': this.Set.number("TEXT", 1024),
            'show_string': this.Set.text("TEXT", "{hello}"),
            'display_show_gauge': this.Set.number("VALUE", 255) + this.Set.number("MAX", 1023),
            "set_pixel": this.Set.number("X") + this.Set.number("Y") + this.Set.state(),
            "set_light_pixel": this.Set.number("X") + this.Set.number("Y") + this.Set.number("LIGHT", 4),
            "show_clock": this.Set.number("CLOCK", 1),
            // microbit - mb_music
            "actuators_music_playNotes":
                '<mutation items="3"></mutation>'
                + '<value name="ADD0"><block type="actuators_music_note">' + this.Set.field("NOTE", 'd') + this.Set.field("OCTAVE", '4')  + '</block></value>'
                + '<value name="ADD1"><block type="actuators_music_note">' + this.Set.field("NOTE", 'f#') + this.Set.field("OCTAVE", '4')  + '</block></value>'
                + '<value name="ADD2"><block type="actuators_music_note">' + this.Set.field("NOTE", 'g') + this.Set.field("OCTAVE", '4')  + '</block></value>',
            "actuators_music_playFrequency": this.Set.number("FREQUENCY", 440) + this.Set.number("DURATION", 500),
            "actuators_music_setTempo": this.Set.number("TICKS", 4) + this.Set.number("BPM", 120),
            "actuators_music_setVolume": this.Set.number("VOL", 255),
            // microbit - mb_mic
            "io_micro_setSoundThreshold": this.Set.number("THRESH", 255),
            // microbit - mb_radio
            "communication_radioSendString": this.Set.text("STR", "{radioMessage}"),
            "communication_radioSendNumber": this.Set.number("N", 1),
            "communication_radioSendValue": this.Set.text("NAME", "pi") + this.Set.number("VALUE", 3.14),
            "communication_radioConfig": this.Set.number("CANAL", 7) + this.Set.number("POWER", 6) + this.Set.number("LEN", 32) + this.Set.number("GROUP"),
            // microbit - neopixel
            "display_controlNeopixelLed": this.Set.number("LED") + this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B", 255),
            "display_controlColorNeopixelLed": this.Set.number("LED") + this.Set.colour_picker(),
            "display_neopixel_controlAllLedRGB": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "display_neopixel_controlAllLedPalette": this.Set.colour_picker(),
            "microbit_neopixel_color" : this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            // microbit - pins
            "io_writeDigitalPin": this.Set.state(),
            "io_writeAnalogPin": this.Set.number("VALUE", 1023),
            "io_setPwm": this.Set.number("PERIOD", 1000),
            // microbit - inputs
            "sensors_mpx5700ap_calibrate": this.Set.number("M", 1) + this.Set.number("B", 1),
            // microbit - outputs
            "display_setGroveSocketLed": this.Set.state(),
            "actuators_setServoAngle": this.Set.number("ANGLE", 90),
            "actuators_setMotorPower": this.Set.number("POWER", 100),
            "actuators_setGroveRelayState": this.Set.state(),
            // ce box
            "ce_box_defineBox": `<value name="LIST">
                    <block type="lists_create_with"><mutation items="5"></mutation>`
                        + this.Set.number("ADD0", 2, true) + this.Set.number("ADD1", 5, true) + this.Set.number("ADD2", 3, true) + this.Set.number("ADD3", 3, true) + this.Set.number("ADD4", 4, true) +
                    `</block>
                </value>`,
            "ce_box_title": this.Set.text("TITLE", "Densité de répartition"),
            "ce_chart_defineChart":
                `<value name="LIST">
                    <block type="lists_create_with"><mutation items="6"></mutation>`
                        + this.Set.chartData("ADD0", "A", 1) + this.Set.chartData("ADD1", "B", 4) + this.Set.chartData("ADD2", "C", 3) + this.Set.chartData("ADD3", "D", 5) + this.Set.chartData("ADD4", "E", 3) + this.Set.chartData("ADD5", "F", 2) +
                    `</block>
                </value>`,
            "ce_chart_dataChart": this.Set.text("LABEL", "A") + this.Set.number("VALUE", 1),
            "ce_chart_frequencies": this.Set.number("FREQ", 2),
            "ce_chart_title": this.Set.text("TITLE", "Histogramme"),
            "ce_quivr_drawLinePortion": this.Set.number("XA") + this.Set.number("YA") + this.Set.number("XB", 0.1) + this.Set.number("YB", 1),
            "ce_quivr_drawVector": '<mutation size="false"></mutation>' + this.Set.number("X") + this.Set.number("Y") + this.Set.number("DX", 3) + this.Set.number("DY", 2),
            // turtle - Move
            "turtle_move": this.Set.number("DISTANCE", 100),
            "turtle_turn": this.Set.number("ANGLE", 90),
            "turtle_goto": this.Set.number("X", 50) + this.Set.number("Y", 50),
            // turtle - Draw
            "turtle_fillcolor": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "turtle_fillcolorPalette": this.Set.colour_picker('#ff0000'),
            "turtle_dot": this.Set.number("DIAMETER", 10),
            "turtle_write": this.Set.text('TEXT', "Turtle"),
            // turtle - Pen
            "turtle_pencolor": this.Set.number("R", 255) + this.Set.number("G") + this.Set.number("B"),
            "turtle_pencolorPalette": this.Set.colour_picker('#ff0000'),
            "turtle_pensize": this.Set.number("SIZE", 1),
            // turtle - Settings
            "turtle_speed": this.Set.number("SPEED", 1),
            // turtle - State
            "turtle_setheading": this.Set.number("ANGLE", 0),
            // tello
            "tello_fly": this.Set.number("DISTANCE", 100),
            "tello_turn": this.Set.number("ANGLE", 180),
            "tello_flyInHeight": this.Set.number("DISTANCE", 100),
            "tello_flyDirection": this.Set.number("DISTANCE", 100),
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
            "math_single":  this.Set.number("NUM", 9),
            "math_trig":  this.Set.number("NUM", 45),
            "math_number_property":  this.Set.number("NUMBER_TO_CHECK", 9),
            "math_map":  this.Set.number("VALUE", 30) + this.Set.number("MIN1") + this.Set.number("MAX1", 255) + this.Set.number("MIN2") + this.Set.number("MAX2", 100),
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
            "lists_split": this.Set.text('DELIM' ,',')
        }
    }
};