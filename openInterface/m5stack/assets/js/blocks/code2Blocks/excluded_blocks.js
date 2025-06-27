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
    "display_galaxia_led_set_colors",
    "display_galaxia_led_set_red",
    "display_galaxia_led_set_green",
    "display_galaxia_led_set_blue",
    "display_galaxia_set_mode",
    "display_galaxia_plot_add_point",
    "display_galaxia_plot_set_y_scale",
];

const AUTHORIZED_BLOCKS_SENSORS = [
    // "sensors_getLight",
    // "sensors_getTemperature",
    // "sensors_getAcceleration",
    // "sensors_getCompass",
    // "sensors_getMagneticForce",
    // "sensors_calibrateCompass",
    "sensors_getMultichannelGas",
    "sensors_getSgp30Gas",
    "sensors_SHT31readData", // a little bit tricky due to the subscript method on this call


];

const AUTHORIZED_BLOCKS_IO = [
    "io_pause",
    "io_waitUntil",
    "io_initChronometer",
    "io_initChronometer_simple",
    "io_getChronometer",
    "io_digital_signal",
    "io_writeDigitalPin",
    "io_onButtonPressed",
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
    "actuators_setServoAngle",
];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    "communication_serialWrite",
    "communication_graphSerialWrite",
    "communication_graphSerialWrite_datasFormat",
    "communication_writeSd",
]

const AUTHORIZED_BLOCKS_SCREEN = [
    "screen_M5Title_define",
    "screen_M5Title_setFgColor",
    "screen_M5Title_setBgColor",
    "screen_M5Title_setTitle",
    "screen_M5Title_controlDisplay",
    "screen_M5TextBox_define",
    "screen_M5TextBox_setText",
];

/**
 * List of all authorized blocks (concatenation of all the authorized blocks by category)
*/
const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION, ...AUTHORIZED_BLOCKS_SCREEN];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];



