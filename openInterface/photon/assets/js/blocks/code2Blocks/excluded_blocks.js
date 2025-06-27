/**
 * @fileoverview excluded_blocks.js. The main function "retreive_all_blocks()" is called during the Python2Blocks initialization async initParser() after the interface is completely loaded.
 * @author: Nixoals (Nicolas G.)
 */
// array to be filled with all the blocks that are not in the authorized blocks
const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation

const AUTHORIZED_BLOCKS_DISPLAY = [
    'display_change_color',
    'display_change_color_rgb',
    'display_change_color_rgb_palette',
    'colour_picker',
];

const AUTHORIZED_BLOCKS_SENSORS = [
    
];

const AUTHORIZED_BLOCKS_IO = [
    "io_pause",
    'io_waitUntil',
    "io_initChronometer",
    "io_initChronometer_simple",
    "io_getChronometer",
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
    'actuators_go',
    'actuators_go_infinity',
    'actuators_rotate',
    'actuators_rotate_infinity',
    'actuators_stop',
    'actuators_follow_line',

];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    "communication_serialWrite",
    "communication_graphSerialWrite",
    "communication_graphSerialWrite_datasFormat",
]

const AUTHORIZED_BLOCKS_SOUND = [
    'sound_animal',
    'sound_emotion',
    'sound_special',
    'sound_behavior',
];

/**
 * List of all authorized blocks (concatenation of all the authorized blocks by category)
*/
const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION, ...AUTHORIZED_BLOCKS_SOUND];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];


