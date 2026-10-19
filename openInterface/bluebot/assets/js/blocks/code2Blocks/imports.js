import '/openInterface/bluebot/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/bluebot/assets/js/blocks/code2Blocks/ast_actuators.js'; // actuators blocks

const LIB_IMPORT = {
    IMPORT_UTIME: "import utime",
    IMPORT_BLUEBOT: "from tts import bluebot",
};


const EXCLUDED_COMMENTS = [] 

const CLASS_METHODS = {
    "bluebot":{
        "call": { astCallBack: "define_bluebot", argsNode: ''}
    }
};

const MICROPYTHON_CLASSES = {
};



// assignments translated by utils.prototypeBlocks (ex: chronometer "t0 = utime.ticks_ms()")
const RESERVED_WORDS = ['t0'];

export default {LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES, RESERVED_WORDS};


