/**
 * Database of defaut blocks in mBot toolbox.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            // mCore - blue LED
            "mCore_control_LED": this.Set.state(),
            // mCore - RGB LED
            "robots_setmBotRgbLed": this.Set.number("R", 255) + this.Set.number("G", 255) + this.Set.number("B", 255),
            "robots_setmBotPaletteRgbLed": this.Set.colour_picker(),
            // mCore - buzzer
            "robots_setmBotBuzzer": this.Set.number("FREQUENCY", 440) + this.Set.number("TIME", 450),
            // mCore - infrared
            "robots_sendmBotIrMessage": this.Set.text("TEXT"),
            // display - LED matrix
            "robots_makeBlock_matrixDrawString": this.Set.text("TEXT") + this.Set.number("X") + this.Set.number("Y", 6),
            "robots_makeBlock_matrixShowNumber": this.Set.number("N", 255),
            "robots_makeBlock_matrixShowClock": this.Set.number("HOUR", 15) + this.Set.number("MIN", 20),
            "robots_makeBlock_matrixDrawBitmap": this.Set.number("X") + this.Set.number("Y"),
            // display - RGB lED
            "robots_makeBlock_setRgbLed": this.Set.number("R", 100) + this.Set.number("G", 195) + this.Set.number("B", 221),
            "robots_makeBlock_setPaletteRgbLed": this.Set.colour_picker('#64c3dd'),
            // display - neopixel
            "robots_makeBlock_controlNeopixelLed": this.Set.number("LED", 1) + this.Set.number("R", 100) + this.Set.number("G", 195) + this.Set.number("B", 221),
            "robots_makeBlock_controlNeopixelPaletteLed": this.Set.number("LED", 1) + this.Set.colour_picker('#64c3dd'),
            "robots_makeBlock_neopixel_controlAllLedRGB": this.Set.number("R", 100) + this.Set.number("G", 195) + this.Set.number("B", 221),
            "robots_makeBlock_neopixel_controlAllLedPalette": this.Set.colour_picker('#64c3dd'),
            // display - 4 digits
            "robots_makeBlock_set4DigitNumber": this.Set.number("N", 1024),
            // io - Time
            "io_wait": this.Set.number("TIME", 1),
            "io_waitUntil": '<value name="UNTIL"><shadow type="logic_compare"><field name="OP">EQ</field>' + this.Set.number("B", 1) + '</shadow></value>',
            // io - pins
            "io_readDigitalPin": this.Set.field("PIN", '4'),
            "io_writeDigitalPin": this.Set.field("PIN", '5') + this.Set.state(),
            "io_writeAnalogPin": this.Set.field("PIN", '5') + this.Set.number("VALUE", 255),
            "io_setPwm": this.Set.field("PIN", '5') + this.Set.number("VALUE", 50),
            "io_readPulseIn": this.Set.field("PIN", '4') + this.Set.state(),
            // sensors - distance & movement
            "robots_makeBlock_getUltrasonicRanger": this.Set.field("PORT", 'PORT_3'),
            "robots_makeBlock_getLineState": this.Set.field("PORT", 'PORT_2'),
            "robots_makeBlock_getPIRMotionState": this.Set.field("PORT", 'PORT_2'),
            // actuators - mBot - motors
            "robots_setmBotGo": this.Set.number("SPEED", 50),
            "robots_controlmBotMotor": this.Set.number("SPEED", 50),
            // actuators - servomotor
            "robots_makeBlock_setServoAngle": this.Set.number("ANGLE", 90),
            // communication - serial connection
            "communication_serialWrite": '<mutation newlines="false"></mutation>' + this.Set.text("TEXT", '{hello}'),
            "communication_graphSerialWrite": '<mutation items="1"></mutation>'
                + '<value name="ADD0"><block type="communication_graphSerialWrite_datasFormat"><field name="NAME">{data1}</field></block></value>',
            "communication_playComputerFrequency": this.Set.number("FREQUENCY", 440),
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
            "math_number_property": this.Set.number("NUMBER_TO_CHECK", 2),
            "math_map": this.Set.number("VALUE", 512) + this.Set.number("MIN1") + this.Set.number("MAX1", 1023) + this.Set.number("MIN2") + this.Set.number("MAX2", 255),
            "math_round": this.Set.number("NUM", 3.1),
            "math_modulo": this.Set.number("DIVIDEND", 64) + this.Set.number("DIVISOR", 10),
            "math_constrain": this.Set.number("LOW", 1) + this.Set.number("HIGH", 100),
            "math_random_int": this.Set.number("FROM", 1) + this.Set.number("TO", 100),
            "math_atan2": this.Set.number("X", 1) + this.Set.number("Y", 1),
            // text
            "text_comment": this.Set.field("TEXT", '{comment}'),
            "text_append": this.Set.text('TEXT'),
            "text_length": this.Set.text('VALUE', 'abc'),
            "text_changeCase": this.Set.variable("TEXT", 'abc'),
            // TODO: check if the blocks need to be add on Arduino
            /*
            "text_newline": this.Set.number('N', 1),
            "text_split": this.Set.text('VALUE') + this.Set.text('SEP' ,';'),
            "text_indexOf": this.Set.variable("VALUE", '{textVariable}') + this.Set.text('VALUE', 'abc'),
            "text_charAt": this.Set.variable("VALUE", '{textVariable}'),
            "text_getSubstring": this.Set.variable("STRING", '{textVariable}'),
            "text_trim": this.Set.text('TEXT', 'abc'),
            "text_count": this.Set.text('SUB', 'bon') + this.Set.text('TEXT', 'bonbon'),
            "text_replace": this.Set.text('FROM', 'a') + this.Set.text('TO', 'b') + this.Set.text('TEXT', 'abc'),
            "text_reverse": this.Set.text('TEXT', 'abc'),
            */
            // list
            "lists_create_with-0": '<mutation items="0"></mutation>',
            "lists_repeat": this.Set.number("NUM", 5),
            "lists_length": this.Set.variable("LIST", '{listVariable}'),
            "lists_getIndex": this.Set.variable("LIST", '{listVariable}') + this.Set.number("AT"),
            // TODO: check if the blocks need to be add on Arduino
            /*
            "lists_indexOf": this.Set.variable("LIST", '{listVariable}'),
            "lists_append": this.Set.variable("LIST", '{listVariable}'),
            "lists_setIndex": this.Set.variable("LIST", '{listVariable}'),
            "lists_getSublist": this.Set.variable("LIST", '{listVariable}'),
            "lists_split": this.Set.text('DELIM' ,',')
            */
        }
    }
};