/**
 * Database of default blocks in the PICAXE toolbox.
 * There is only the blocks which require default inputs.
 */

const TOOLBOXES_BLOCKS_CONTENT = {
    /**
     * Get the xml block database.
     * @returns {Object}
     */
    get: function () {
        return {
            /** PICAXE default blocks */

            // AutoProg modules
            "autoprog_digital_sensor-push_button": this.Set.field("MODULE", "PUSH_BUTTON") + this.Set.field("PIN", "C.5"),
            "autoprog_digital_sensor-roller_switch": this.Set.field("MODULE", "ROLLER_SWITCH") + this.Set.field("PIN", "C.2"),
            "autoprog_digital_sensor-mini_switch": this.Set.field("MODULE", "MINI_SWITCH") + this.Set.field("PIN", "C.2"),
            "autoprog_digital_sensor-reed": this.Set.field("MODULE", "REED") + this.Set.field("PIN", "C.0"),
            "autoprog_digital_sensor-tilt": this.Set.field("MODULE", "TILT") + this.Set.field("PIN", "C.0"),
            "autoprog_digital_sensor-dry_contact": this.Set.field("MODULE", "DRY_CONTACT") + this.Set.field("PIN", "C.0"),
            "autoprog_digital_sensor-pir": this.Set.field("MODULE", "PIR") + this.Set.field("PIN", "C.0"),
            "autoprog_digital_sensor-line": this.Set.field("MODULE", "LINE") + this.Set.field("PIN", "C.0"),
            "autoprog_digital_sensor-current": this.Set.field("MODULE", "CURRENT") + this.Set.field("PIN", "C.0"),
            "autoprog_analog_sensor-pot": this.Set.field("MODULE", "POT") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "potentiometre"),
            "autoprog_analog_sensor-light": this.Set.field("MODULE", "LIGHT") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "lumiere"),
            "autoprog_analog_sensor-temp": this.Set.field("MODULE", "TEMP") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "temperature"),
            "autoprog_analog_sensor-temp_c": this.Set.field("MODULE", "TEMP_C") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "temperature"),
            "autoprog_analog_sensor-humidity": this.Set.field("MODULE", "HUMIDITY") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "humidite"),
            "autoprog_analog_sensor-force": this.Set.field("MODULE", "FORCE") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "force"),
            "autoprog_analog_sensor-current": this.Set.field("MODULE", "CURRENT") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "courant"),
            "autoprog_output-led": this.Set.field("MODULE", "LED") + this.Set.field("PIN", "B.2") + this.Set.field("STATE", "HIGH"),
            "autoprog_output-lighting": this.Set.field("MODULE", "LIGHTING") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "autoprog_output-relay": this.Set.field("MODULE", "RELAY") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "autoprog_output-magnet": this.Set.field("MODULE", "MAGNET") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "autoprog_output-power": this.Set.field("MODULE", "POWER") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "autoprog_servo": this.Set.field("PIN", "B.0") + this.Set.number("POS", 150),
            "autoprog_buzzer": this.Set.field("PIN", "B.0") + this.Set.number("NOTE", 100) + this.Set.number("DURATION", 50),

            // Grove modules
            "grove_digital_sensor-button": this.Set.field("MODULE", "BUTTON") + this.Set.field("PIN", "C.0"),
            "grove_digital_sensor-switch": this.Set.field("MODULE", "SWITCH") + this.Set.field("PIN", "C.0"),
            "grove_digital_sensor-touch": this.Set.field("MODULE", "TOUCH") + this.Set.field("PIN", "C.0"),
            "grove_digital_sensor-magnetic": this.Set.field("MODULE", "MAGNETIC") + this.Set.field("PIN", "C.0"),
            "grove_digital_sensor-tilt": this.Set.field("MODULE", "TILT") + this.Set.field("PIN", "C.0"),
            "grove_digital_sensor-pir": this.Set.field("MODULE", "PIR") + this.Set.field("PIN", "C.0"),
            "grove_digital_sensor-line": this.Set.field("MODULE", "LINE") + this.Set.field("PIN", "C.0"),
            "grove_digital_sensor-vibration": this.Set.field("MODULE", "VIBRATION") + this.Set.field("PIN", "C.0"),
            "grove_analog_sensor-rotary": this.Set.field("MODULE", "ROTARY") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "potentiometre"),
            "grove_analog_sensor-slide": this.Set.field("MODULE", "SLIDE") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "potentiometre"),
            "grove_analog_sensor-light": this.Set.field("MODULE", "LIGHT") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "lumiere"),
            "grove_analog_sensor-sound": this.Set.field("MODULE", "SOUND") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "son"),
            "grove_analog_sensor-moisture": this.Set.field("MODULE", "MOISTURE") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "humidite"),
            "grove_analog_sensor-water": this.Set.field("MODULE", "WATER") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "humidite"),
            "grove_analog_sensor-temp": this.Set.field("MODULE", "TEMP") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "temperature"),
            "grove_analog_sensor-ntc_c": this.Set.field("MODULE", "NTC_C") + this.Set.field("PIN", "A.0") + this.Set.field("VAR", "temperature"),
            "grove_output-led": this.Set.field("MODULE", "LED") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "grove_output-relay": this.Set.field("MODULE", "RELAY") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "grove_output-vibration": this.Set.field("MODULE", "VIBRATION") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "grove_output-mosfet": this.Set.field("MODULE", "MOSFET") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "grove_output-electromagnet": this.Set.field("MODULE", "ELECTROMAGNET") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "grove_output-fan": this.Set.field("MODULE", "FAN") + this.Set.field("PIN", "B.0") + this.Set.field("STATE", "HIGH"),
            "grove_servo": this.Set.field("PIN", "B.0") + this.Set.number("POS", 150),
            "grove_buzzer": this.Set.field("PIN", "B.0") + this.Set.number("NOTE", 100) + this.Set.number("DURATION", 50),
            "grove_lcd_print": this.Set.text("TEXT", "Bonjour") + this.Set.field("LINE", "0") + this.Set.field("POS", 0),
            "grove_lcd_print-number": this.Set.number("TEXT", 42) + this.Set.field("LINE", "1") + this.Set.field("POS", 0),

            // io
            "io_picaxe_pause": this.Set.number("TIME", 500),
            // communication
            "communication_picaxe_sertxd": this.Set.number("VALUE", 0),

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
            "math_arithmetic-divide": this.Set.field("OP", 'DIVIDE') + this.Set.number("B", 1)
        }
    }
};
