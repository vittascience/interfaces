Blockly.defineBlocksWithJsonArray([
    {
        "type": "preproc_include",
        "message0": "#include %1 %2",
        "args0": [
            {
                "type": "field_input",
                "name": "LIBRARY",
                "text": 'Library name',
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [
                        "Library",
                        "system"
                    ],
                    [
                        "Local file",
                        "local"
                    ]
                ]
            }
        ],
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },

    {
        "type": "preproc_define",
        "message0": "#define %1 %2",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "NAME"
            },
            {
                "type": "field_input",
                "name": "VALUE",
                "text": "VALUE"
            }
        ],
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);

Blockly.Arduino.preproc_include = function(block) {
    let library = block.getFieldValue('LIBRARY');
    let type = block.getFieldValue('TYPE');
    let code = '';
    if (type === 'system') {
        code = '#include <' + library + '>\n';
    } else if (type === 'local') {
        code = '#include "' + library + '"\n';
    }
    Blockly.Arduino.addInclude(code, code)
    return '';
}

Blockly.Arduino.preproc_define = function(block) {
    let name = block.getFieldValue('NAME');
    let value = block.getFieldValue('VALUE');
    let code = '#define ' + name + ' ' + value + '\n';
    Blockly.Arduino.addDefine(code, code)
    return '';
}