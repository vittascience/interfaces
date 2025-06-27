/**
 * Database of defaut blocks in Buddy toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            //sensors
            'sensors_USdetectObstacle': this.Set.number("DISTANCE", 10),
            'sensors_ToFdetectObstacle': this.Set.number("DISTANCE", 10) + this.Set.field("DIRECTION", "FrontMiddle"),
            //actuators
            'actuators_buddySay': this.Set.number("SPEED", 10) + this.Set.number("ANGLE", 30),
            'actuators_buddySayStraight': this.Set.number("SPEED", 10) + this.Set.field("LOCK", "False"),
            'actuators_rotateBuddyWithAngle': this.Set.number("ANGLE", 90) + this.Set.number("SPEED", 30),
            'actuators_rotateBuddy': this.Set.number("SPEED", 30) + this.Set.field("LOCK", "False"),
            'actuators_moveBuddyWithDistance': this.Set.number("DISTANCE", 10) + this.Set.number("SPEED", 0.1),
            'actuators_moveBuddy': this.Set.number("SPEED", 0.1) + this.Set.field("LOCK", "False"),
            //display
            'display_blinkLed': this.Set.colour_picker('#22b573') + this.Set.number("PERIOD", 1000),
            'display_blinkAllLed': this.Set.colour_picker('#22b573') + this.Set.number("PERIOD", 1000),
            'display_updateAllLed': this.Set.colour_picker('#22b573'),
            'display_updateLedColor': this.Set.colour_picker('#22b573'),
            'display_fadeAllLed': this.Set.colour_picker('#22b573') + this.Set.number("PERIOD", 1000),
            'display_updateAllLedWithPattern': this.Set.colour_picker('#22b573') + this.Set.number("PERIOD", 1000) + this.Set.number("STEP", 10),
            'display_setMood': this.Set.field("EXPRESSION", "NEUTRAL") + '<mutation speed="false"></mutation>',
            'display_setFacialExpression': this.Set.field("EXPRESSION", "NEUTRAL") + '<mutation speed="false"></mutation>',
            'display_setFacePositivity': this.Set.number("POSITIVITY", 50),
            'display_setFaceEnergy': this.Set.number("ENERGY", 50),
            'display_playFacialEvent': '<mutation speed="false"></mutation>',
            'display_playFacialRelativeEvent': this.Set.number("SPEED", 50),
            'display_lookAtXY': this.Set.number("X", 640) + this.Set.number("Y", 400),
            //vision
            'vi_startSpeaking': this.Set.text("TEXT", "Bonjour") + this.Set.field("EXPRESSION", "SPEAK_HAPPY"),
            'vi_setSpeakerVolume': this.Set.number("VOLUME", 100),
            'vi_setSpeakerSpeed': this.Set.number("SPEED", 100),
            'vi_setSpeakerPitch': this.Set.number("PITCH", 100),
            'vision_detectFaces': '<mutation thres="false"></mutation>',
            'vision_detectPerson': '<mutation thres="false"></mutation>',
            'vision_setMotionThres': this.Set.number("THRES", 0.8),
            'vision_motionDetectWithThres': this.Set.number("THRES", 0.8),
            'vision_startVisualTracking': '<mutation thres="false"></mutation>',
            // io
            "io_pause": this.Set.number("TIME", 1),
            "io_waitUntil": "<value name='UNTIL'><shadow type='logic_compare'>" + this.Set.field("OP", 'EQ') + this.Set.number("B", 1) + "</shadow></value>",
            // ai
            "vittaia_load_model": this.Set.text('MODEL_URL', 'https://fr.vittascience.com/ia/model/644237cc1072c/'),
            "vittaia_detect_class": this.Set.text('MODEL_CLASS'),
            "vittaia_init_webcam": this.Set.number('CAMERA', 0),

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
            // list
            "lists_create_with-0": '<mutation items="0"></mutation>',
            "lists_repeat": this.Set.number("NUM", 5),
            "lists_indexOf": this.Set.variable("LIST", '{listVariable}'),
            "lists_getIndex": this.Set.variable("VALUE", '{listVariable}'),
            "lists_append": this.Set.variable("LIST", '{listVariable}'),
            "lists_setIndex": this.Set.variable("LIST", '{listVariable}'),
            "lists_getSublist": this.Set.variable("LIST", '{listVariable}'),
            "lists_split": this.Set.text('DELIM', ','),
        }
    }
};
