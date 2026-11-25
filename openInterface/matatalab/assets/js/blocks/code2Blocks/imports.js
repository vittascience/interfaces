import '/openInterface/matatalab/assets/js/blocks/code2Blocks/ast_io.js'; // io blocks
import '/openInterface/matatalab/assets/js/blocks/code2Blocks/ast_matatacon.js'; // MatataCon blocks

const LIB_IMPORT = {
    IMPORT_UTIME: "import utime",
    IMPORT_MATATALAB: "import matatalab",
};

const EXCLUDED_COMMENTS = [] 

const CLASS_METHODS = {};

const MICROPYTHON_CLASSES = {};

// assignments translated by utils.prototypeBlocks (ex: chronometer "t0 = utime.ticks_ms()")
const RESERVED_WORDS = ['t0'];

export default {LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES, RESERVED_WORDS};