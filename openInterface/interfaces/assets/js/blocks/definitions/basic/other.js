/**
 * @fileoverview Other blocks for Blockly.
 * These blocks are not in the interface
 */
Blockly.defineBlocksWithJsonArray([
  // bloc to define raw block (use in ast)
  {
    "type": "ast_Raw",
    "message0": "%{BKY_OTHER_AST_RAW} %1 %2",
    "args0": [{
      "type": "input_dummy"
    }, {
      "type": "field_multilinetext",
      "name": "TEXT",
      "value": ''
    }],
    "style": 'comment_block',
    "previousStatement": null,
    "nextStatement": null
  },

  {
    "type": "ast_AttributeFull",
    "lastDummyAlign0": "RIGHT",
    "message0": "%1 . %2",
    "args0": [
        {
          "type": "input_value",
          "name": "VALUE"
        },
        {
          "type": "field_input",
          "name": "ATTR",
          "text": "default"
        }
    ],
    "inputsInline": true,
    "output": null,
  },

  {
    "type": "ast_Attribute",
    "message0": "%1 . %2",
    "args0": [
        {
          "type": "field_variable",
          "name": "VALUE",
          "variable": "variable"
        },
        {
          "type": "field_input",
          "name": "ATTR",
          "text": "attribute"
        }
    ],
    "inputsInline": true,
    "output": null,
  },

])
