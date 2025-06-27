import '/openInterface/buddy/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/buddy/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/buddy/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/buddy/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks
import '/openInterface/buddy/assets/js/blocks/code2Blocks/ast_voice.js'; // voice blocks

const LIB_IMPORT = {
    // Micropython libraries
    IMPORT_UTIME: "import utime",
    IMPORT_MATH: "import math",
    IMPORT_RANDOM: "import random",
    IMPORT_MACHINE: "import machine",

    // Buddy libraries
    IMPORT_BUDDY_SDK: "from sdk import BuddySDK",

    // AI libraries
    IMPORT_VITTAIA: "import vittaia as via"   
};


const EXCLUDED_COMMENTS = [] 

const CLASS_METHODS = {
    'BuddySDK':{
        "call": {astCallBack: "BuddySDK", argsNode:""}
    }
};

const MICROPYTHON_CLASSES = {
};

const RESERVED_WORDS = [
    "RspCallback",
]



export default {LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES, RESERVED_WORDS};


