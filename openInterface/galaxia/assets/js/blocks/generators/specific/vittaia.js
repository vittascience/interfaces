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
    const modelId = Blockly.Python.valueToCode(block, 'MODEL_ID', Blockly.Python.ORDER_ATOMIC);
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