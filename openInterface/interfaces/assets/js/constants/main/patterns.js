const REG_PROJECT_NAME = /^[a-z0-9A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ&#\"\'\(\)!?,:°.\* _\-]{1,50}$/;
const REG_BLANK_LINES = /^\s*$(?:\r\n?|\n)/gm;

const PYTHON_PARSER_TAG = '&/vitta-blocks-code'