/**
 * @fileoverview excluded_blocks.js. The main function "retreive_all_blocks()" is called during the Python2Blocks initialization async initParser() after the interface is completely loaded.
 * @author: Nixoals (Nicolas G.)
 */
// array to be filled with all the blocks that are not in the authorized blocks
const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation

const AUTHORIZED_BLOCKS_DISPLAY = [
    "display_defineNeopixel",
    "display_controlNeopixelLed",
    "display_controlColorNeopixelLed",
    "color_picker",
    // "display_controlBuiltInLED",
    "display_lcdSetText",
    "display_controlPicoLed",
    "display_controlPicoWLed",
];

const AUTHORIZED_BLOCKS_SENSORS = [
    "sensors_getGroveUltrasonicRanger",
    "sensors_getGroveTemperature",
];

const AUTHORIZED_BLOCKS_IO = [
    "io_pause",
    "io_waitUntil",
    "io_initChronometer",
    "io_initChronometer_simple",
    "io_getChronometer",
    "io_digital_signal",
    "io_writeDigitalPin",
    "io_readAnalogPin",
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
    "actuators_setServoAngle",
];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    "communication_serialWrite",
    "communication_graphSerialWrite",
    "communication_graphSerialWrite_datasFormat",
]

/**
 * List of all authorized blocks (concatenation of all the authorized blocks by category)
*/
const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];


