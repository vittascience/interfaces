import '/openInterface/spike/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/spike/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/spike/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/spike/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks

const LIB_IMPORT = {
    // Micropython libraries
    IMPORT_UTIME: "import utime",
    IMPORT_MATH: "import math",
    IMPORT_RANDOM: "import random",
    IMPORT_UJSON: "import ujson",
    IMPORT_GC: "import gc",
    IMPORT_SYS: "import sys",
    IMPORT_OS: "import os",
    IMPORT_RE: "import re",
    IMPORT_BINASCII: "import binascii",
    IMPORT_USTRUCT: "import ustruct",

    // Lego Spike libraries
    IMPORT_PORT: "from hub import port",
    IMPORT_MOTOR: "import motor",
    IMPORT_COLOR: "import color",
    IMPORT_COLOR_MATRIX: "import color_matrix",
    IMPORT_COLOR_SENSOR: "import color_sensor"
};


const EXCLUDED_COMMENTS = [] 

const CLASS_METHODS = {
};

const MICROPYTHON_CLASSES = {
};



export default {LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES};


