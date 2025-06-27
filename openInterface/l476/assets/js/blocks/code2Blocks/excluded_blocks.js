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
    "display_controlBuiltInLED",
    "display_l476_controlColorLed",
    "display_led_matrix_DrawBitmap",
    "display_rgb_led_matrix_DrawBitmap",
    "display_lcdSetText",
    "display_lcdClear",
];

const AUTHORIZED_BLOCKS_SENSORS = [
    "sensors_getGroveUltrasonicRanger",

];

const AUTHORIZED_BLOCKS_IO = [
    "io_pause",
    "io_waitUntil",
    "io_initChronometer",
    "io_initChronometer_simple",
    "io_getChronometer",
    "io_digital_signal",
    "io_writeDigitalPin",
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    "communication_serialWrite",
    "communication_graphSerialWrite",
    "communication_graphSerialWrite_datasFormat",
]

const AUTHORIZED_BLOCKS_ROBOT = [
    "robots_alphabot_lineFinder_isSensorAboveLine",
    "robots_alphabot_controlMotor",
    "robots_alphabot_setGo",
    "robots_alphabot_stopMotors",
    "robots_alphabot_oled_addText",
    "robots_alphabot_oled_clearScreen",
    "robots_alphabot_lineFinder_readSensors",
];

/**
 * List of all authorized blocks (concatenation of all the authorized blocks by category)
*/
const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION, ...AUTHORIZED_BLOCKS_ROBOT];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];
