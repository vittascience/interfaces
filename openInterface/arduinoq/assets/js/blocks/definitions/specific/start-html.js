/**
 * @fileoverview Start blocks for Arduino Q HTML.
 */

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
        "type": "html_page",
        "message0": '[HTML] Page web %1 %2',
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_statement",
            "name": "CONTENT",
            "check": "html"
        }],
        "colour": "#ff9403",
        "tooltip": "HTML tag"
    },
]);