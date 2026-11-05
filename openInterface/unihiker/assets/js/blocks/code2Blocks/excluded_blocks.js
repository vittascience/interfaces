/**
 * @fileoverview excluded_blocks.js. The main function "retreive_all_blocks()" is called during the Python2Blocks initialization async initParser() after the interface is completely loaded.
 */
// array to be filled with all the blocks that are not in the authorized blocks
const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// The blocks without hand written translation are translated by the templates learned from their generators
// (interfaces/assets/js/code2blocks/python/learnedTranslations.js): checked for this interface, they do not lock the editor.
const LEARNED_REVERSE_TRANSLATION = true;

/**
 * List of all authorized blocks (no hand written translation on this interface)
*/
const AUTHORIZED_BLOCKS = [];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];
