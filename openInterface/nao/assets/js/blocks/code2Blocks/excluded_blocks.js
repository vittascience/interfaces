/**
 * @fileoverview excluded_blocks.js. The main function "retreive_all_blocks()" is called during the Python2Blocks initialization async initParser() after the interface is completely loaded.
 * @author: Nixoals (Nicolas G.)
 */
// array to be filled with all the blocks that are not in the authorized blocks
const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation

const AUTHORIZED_BLOCKS_DISPLAY = [
    'display_fade',
    'display_fadeRGB',
    'display_fadeRGB_palette',
    'display_fadeRGB_colorName',
    'display_fadeFaceRGB',
    'display_fadeFaceRGB_palette',
    'display_randomEyes',
    'display_rotateEyes',
    'display_rasta',
    'display_setIntensity',
    'display_off',
    'display_on',
    'display_reset',
    'colour_picker'
];

const AUTHORIZED_BLOCKS_SENSORS = [
    'sensors_tactilTouched',
    'sensors_handTouched',
    'sensors_bumperPressed',
    'sensors_sonarDetection',
    'sensors_getBatteryCharge'
];

const AUTHORIZED_BLOCKS_IO = [
    "time_pause",
    'time_waitUntil',
];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    "communication_textToSpeech_say",
    "communication_asr_setLanguage",
    "communication_asr_setVocabulary",
    "communication_asr_startRecognition",
    "communication_asr_stopRecognition",
    "communication_asr_getLastWord_callback_decorated",
];

const AUTHORIZED_BLOCKS_MOVEMENTS = [
    'movements_poseMode',
    'movements_moveTo',
    'movements_rotate',
    'movements_hand',
    'movements_goToPosture',
    'movements_setAnglesArmes',
];

const AUTHORIZED_BLOCKS_SOUND = [
];

/**
 * List of all authorized blocks (concatenation of all the authorized blocks by category)
*/
const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_COMMUNICATION, ...AUTHORIZED_BLOCKS_MOVEMENTS];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];


