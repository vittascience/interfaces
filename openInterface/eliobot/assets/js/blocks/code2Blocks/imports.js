import '/openInterface/eliobot/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/eliobot/assets/js/blocks/code2Blocks/ast_display.js'; // display blocks
import '/openInterface/eliobot/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks
import '/openInterface/eliobot/assets/js/blocks/code2Blocks/ast_sensors.js'; // sensors blocks

const LIB_IMPORT = {
    // Micropython libraries
    IMPORT_TIME: "import time",
    IMPORT_MATH: "import math",
    IMPORT_RANDOM: "import random",
    IMPORT_NEOPIXEL: "import neopixel",

    // CircuitPython libraries
    IMPORT_BOARD: "from board import *",
    IMPORT_DIGITALIO: "from digitalio import DigitalInOut, Direction, Pull",
    IMPORT_ANALOGIO: "from analogio import AnalogIn",

    // Elio libraries
    IMPORT_ELIO: "import elio",
    IMPORT_ADAFRUIT_DHT: "import adafruit_dht"
};


const EXCLUDED_COMMENTS = ["Built in Neopixel declaration"] 

const CLASS_METHODS = {
    "neopixel": {
        "call": { astCallBack: "set_builtin_led", argsNode: ''}
    },
};

const MICROPYTHON_CLASSES = {
};



export default {LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES};


