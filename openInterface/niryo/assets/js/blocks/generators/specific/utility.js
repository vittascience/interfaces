

Blockly.Python.utility_wait = function (block) {
    var seconds = block.getFieldValue('SECONDS');
    Blockly.Python.addImport('import time\n', IMPORT_TIME);
    var code = 'time.sleep(' + seconds + ')\n';
    return code;
};

Blockly.Python.utility_break_point = function (block) {
    Blockly.Python.niryo_initialization();
    return 'niryo_robot.break_point()\n';
};

Blockly.Python.utility_comment = function (block) {
    var commentText = block.getFieldValue('COMMENT_TEXT');
    return '# ' + commentText + '\n';
};