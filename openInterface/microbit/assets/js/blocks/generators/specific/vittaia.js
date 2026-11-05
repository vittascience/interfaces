/**
 * @fileoverview Vittaia generators for Microbit.
 */

// AI Sensors

Blockly.Python.vittaia_load_local_model = function () {
    Blockly.Python.addImport('vittaia', IMPORT_AI);
    Blockly.Python.addInit('model', 'model = Model("local")');
    return '';
};

Blockly.Python.vittaia_load_cloud_model = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_AI);
    const modelId = Blockly.Python.valueToCode(block, 'MODEL_URL', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.addInit('model', `model = Model(${modelId})`);
    return '';
};

Blockly.Python.vittaia_make_prediction = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_AI);
    Blockly.Python.addInit('model', 'model = Model()');
    const windowSize = block.getFieldValue('WINDOW_SIZE');
    return `model.predict(${windowSize || 0.2})${NEWLINE}`;
};

Blockly.Python.vittaia_get_highest_probability_class = function () {
    Blockly.Python.addImport('vittaia', IMPORT_AI);
    Blockly.Python.addInit('model', 'model = Model()');
    return ['model.detect_class()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_detect_class = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_AI);
    Blockly.Python.addInit('model', 'model = Model()');
    const modelClass = Blockly.Python.valueToCode(block, 'MODEL_CLASS', Blockly.Python.ORDER_ATOMIC);
    const isDetected = block.getFieldValue('IS_DETECTED');
    let branch = Blockly.Python.statementToCode(block, 'DO');
    branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
    const code = `if model.detect_class() ${isDetected} ${modelClass}:\n${branch}${NEWLINE}`;
    return code;
};

// Voice recognition

// VOICE RECOGNITION _ SET VOLUME
Blockly.Python.ia_voiceRecognition_setVolume = function (block) {
    const volume = Blockly.Python.valueToCode(block, "VOLUME", Blockly.Python.ORDER_NONE) || "4";
    Blockly.Python.addImport('voiceRecognition', IMPORT_VOICE_RECOGNITION);
    return "voiceRecognition.setVolume(" + volume + ")" + NEWLINE;
};

// VOICE RECOGNITION _ GET COMMAND ID
Blockly.Python.ia_voiceRecognition_getCMDID = function (block) {
    Blockly.Python.addImport('voiceRecognition', IMPORT_VOICE_RECOGNITION);
    return ["voiceRecognition.getCMDID()", Blockly.Python.ORDER_ATOMIC];
};

// VOICE RECOGNITION _ ON FIXED COMMAND
Blockly.Python.ia_voiceRecognition_onCommand = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addImport('voiceRecognition', IMPORT_VOICE_RECOGNITION);
    return "if voiceRecognition.isCommand(" + block.getFieldValue("ID") + "):" + NEWLINE + branchCode;
};

// VOICE RECOGNITION _ PLAY BY COMMAND ID
Blockly.Python.ia_voiceRecognition_playByCMDID = function (block) {
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "22";
    Blockly.Python.addImport('voiceRecognition', IMPORT_VOICE_RECOGNITION);
    return "voiceRecognition.playByCMDID(" + id + ")" + NEWLINE;
};

// Legacy types (before move to IA category), kept for saved projects
['setVolume', 'getCMDID', 'onCommand', 'playByCMDID'].forEach(function (name) {
    Blockly.Python['communication_voiceRecognition_' + name] = Blockly.Python['ia_voiceRecognition_' + name];
});
