import '/openInterface/photon/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/photon/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/photon/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/photon/assets/js/blocks/code2Blocks/ast_sound.js'; // sounds blocks
import '/openInterface/photon/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks

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

    // Photon Robot libraries
    IMPORT_PHOTON: "from photonrobot import photon",
    IMPORT_COLOR: "from photonrobot import Color",
    IMPORT_COLOR_MODE: "from photonrobot import ColorMode",
    IMPORT_SOUND: "from photonrobot import Sound",
    IMPORT_SPECIAL_BEHAVIORS: "from photonrobot import SpecialBehaviors"
};


const EXCLUDED_COMMENTS = [] 

const CLASS_METHODS = {
};

const MICROPYTHON_CLASSES = {
};



export default {LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES};


