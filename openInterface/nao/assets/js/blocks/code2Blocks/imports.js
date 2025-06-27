import '/openInterface/nao/assets/js/blocks/code2Blocks/ast_time.js'; // time blocks
import '/openInterface/nao/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/nao/assets/js/blocks/code2Blocks/ast_movements.js'; // movements blocks
import '/openInterface/nao/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks
import '/openInterface/nao/assets/js/blocks/code2Blocks/ast_communication.js'; // communication blocks

const LIB_IMPORT = {
    // Micropython libraries
    IMPORT_TIME: "import time",
    IMPORT_MATH: "import math",
    IMPORT_RANDOM: "import random",
    IMPORT_UJSON: "import ujson",
    IMPORT_GC: "import gc",
    IMPORT_SYS: "import sys",
    IMPORT_OS: "import os",
    IMPORT_RE: "import re",
    IMPORT_BINASCII: "import binascii",
    IMPORT_USTRUCT: "import ustruct",

    // // Photon Robot libraries
    IMPORT_ASR_SERVICE: "import asr_service",
    IMPORT_TTS: "import tts",
    IMPORT_LEDS_SERVICE: "import leds_service",
    IMPORT_MOTION_SERVICE: "import motion_service",
    IMPORT_SENSORS_SERVICE: "import sensors_service",
};

const EXCLUDED_COMMENTS = [];

const CLASS_METHODS = {};

const MICROPYTHON_CLASSES = {};

export default { LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES };


