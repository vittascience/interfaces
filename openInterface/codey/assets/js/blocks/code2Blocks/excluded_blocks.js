/**
 * @fileoverview excluded_blocks.js. The main function "retreive_all_blocks()" is called during the Python2Blocks initialization async initParser() after the interface is completely loaded.
 * @author: Nixoals (Nicolas G.)
 */
// array to be filled with all the blocks that are not in the authorized blocks
const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation

const AUTHORIZED_BLOCKS_DISPLAY = [];

const AUTHORIZED_BLOCKS_SENSORS = [];

const AUTHORIZED_BLOCKS_IO = [
    "io_initChronometer",
    "io_initChronometer_simple",
    "io_getChronometer",
    "io_pause",
    "io_waitUntil",
    "io_digital_signal",
];

const AUTHORIZED_BLOCKS_ACTUATORS = [];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    "communication_serialWrite",
    "communication_graphSerialWrite",
    "communication_graphSerialWrite_datasFormat",
]

const AUTHORIZED_BLOCKS_ROBOT = [];

/**
 * List of all authorized blocks (concatenation of all the authorized blocks by category)
*/
const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION, ...AUTHORIZED_BLOCKS_ROBOT];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];