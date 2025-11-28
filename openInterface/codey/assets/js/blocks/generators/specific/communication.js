/**
 * @fileoverview Communication generators for Codey.
 */

Blockly.Python.communication_irReceive = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ['ir.receive()', Blockly.Python.ORDER_NONE];
};

Blockly.Python.communication_irReceiveRemoteCode = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ['ir.receive_remote_code()', Blockly.Python.ORDER_NONE];
};

Blockly.Python.communication_irSend = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "'Hello'";
    return `ir.send(${data})` + NEWLINE;
};

Blockly.Python.communication_irStartLearning = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return "ir.start_learning()" + NEWLINE;
};

Blockly.Python.communication_irStopLearning = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return "ir.stop_learning()" + NEWLINE;
};

Blockly.Python.communication_irSaveLearnedResult = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_NONE) || "'Hello'";
    return `ir.save_learned_result(${index})` + NEWLINE;
};

Blockly.Python.communication_irSendLearnedResult = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_NONE) || "'Hello'";
    return `ir.send_learned_result(${index})` + NEWLINE;
};

Blockly.Python.communication_irLearn = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "'Hello'";
    return `ir.learn(${time})` + NEWLINE;
};