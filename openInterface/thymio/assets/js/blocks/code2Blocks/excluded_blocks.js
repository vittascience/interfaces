/**
 * @fileoverview excluded_blocks.js. The main function "retreive_all_blocks()" is called during the Python2Blocks initialization async initParser() after the interface is completely loaded.
 * @author: Nixoals (Nicolas G.)
 */
// array to be filled with all the blocks that are not in the authorized blocks
const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation 

const AUTHORIZED_BLOCKS_DISPLAY = [
    "display_RGBLed_setColor",
    "display_RGBLed_setColorPalette",
    "colour_picker",
];

const AUTHORIZED_BLOCKS_SENSORS = [
    "sensors_read_obstacle",
    "sensors_get_line",
];

const AUTHORIZED_BLOCKS_IO = [
    "io_timer_ms",
    "io_onButtonPressed_event",
    "io_onProximityLine_event",
    "io_onProximity_event",
    "io_onTimer_event",
    
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
    "robot_stop",
    "robot_move",
    "robot_rotate_clock",
    "robot_rotate_forever",
    "robot_change_single_motor_speed",
    "robot_stop_single_motor",
    "sound_play_sound",
    "sound_play_sound_freq",
   
];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    
]

/**
 * List of all authorized blocks (concatenation of all the authorized blocks by category)
*/
const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];

