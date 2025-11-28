import '/openInterface/codey/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/codey/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/codey/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/codey/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks
import '/openInterface/codey/assets/js/blocks/code2Blocks/ast_robot.js'; // robot blocks

const LIB_IMPORT = {
    // Micropython libraries
    IMPORT_UTIME: "import utime",
    IMPORT_MATH: "import math",
    IMPORT_RANDOM: "import random",   
    // Codey libraries
    IMPORT_CODEY: "import codey"
};

const EXCLUDED_COMMENTS = [];

const SPECIFIC_INIT = {
    time_sleep_count: 0,
}

const CLASS_METHODS = {};

const MICROPYTHON_CLASSES = {};

export default { LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES, SPECIFIC_INIT };