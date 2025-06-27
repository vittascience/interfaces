/**
 * @fileoverview excluded_blocks.js. The main function "retreive_all_blocks()" is called during the Python2Blocks initialization async initParser() after the interface is completely loaded.
 * @author: Nixoals (Nicolas G.)
 */
// array to be filled with all the blocks that are not in the authorized blocks
const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation

const AUTHORIZED_BLOCKS_DISPLAY = [
    'display_set_main_LED_RGB',
    'display_set_main_LED_RGB_palette',
    'display_set_main_LED_RGB_fade',
    'display_set_main_LED_RGB_blink',
    'display_set_back_LED_intensity'
];

const AUTHORIZED_BLOCKS_SENSORS = [
    'sensors_pitch',
    'sensors_roll',
    'sensors_yaw',
    'sensors_accelerometer',
    'sensors_gyroscope',
    'sensors_isFallDetected'
];

const AUTHORIZED_BLOCKS_IO = [
    "io_pause",
    'io_waitUntil',
    "io_initChronometer",
    "io_initChronometer_simple",
    "io_getChronometer",
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
    'actuators_set_motors',
    'actuators_set_motors_with_timeout',
    'actuators_set_heading',
    'actuators_set_motors_with_heading',
    'actuators_rotate',
    'actuators_rotate_with_timeout',
    'actuators_set_motor',
    'actuators_stop',
    'actuators_reset_heading'

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

