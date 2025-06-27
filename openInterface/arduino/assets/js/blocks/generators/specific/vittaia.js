/**
 * @fileoverview Vittaia generators for Microbit.
 */

// AI Sensors

Blockly.Arduino.vittaia_load_local_model = function () {
    Blockly.Arduino.addInclude('vittaia', INCLUDE_AI);
    Blockly.Arduino.addSetup('model', 'model = new Model("local");');
    return '';
};

Blockly.Arduino.vittaia_load_cloud_model = function (block) {
    Blockly.Arduino.addInclude('vittaia', INCLUDE_AI);
    const modelId = Blockly.Arduino.valueToCode(block, 'MODEL_ID', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addSetup('model', `model = new Model(${modelId});`);
    return '';
};

Blockly.Arduino.vittaia_make_prediction = function (block) {
    Blockly.Arduino.addInclude('vittaia', INCLUDE_AI);
    Blockly.Arduino.addSetup('model', 'model = new Model();');
    const windowSize = block.getFieldValue('WINDOW_SIZE');
    return `model->predict(${windowSize || 0.2});${NEWLINE}`;
};

Blockly.Arduino.vittaia_get_highest_probability_class = function () {
    Blockly.Arduino.addInclude('vittaia', INCLUDE_AI);
    Blockly.Arduino.addSetup('model', 'model = new Model();');
    return ['model->detect_class()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.vittaia_detect_class = function (block) {
    Blockly.Arduino.addInclude('vittaia', INCLUDE_AI);
    Blockly.Arduino.addSetup('model', 'model = new Model();');
    const modelClass = Blockly.Arduino.valueToCode(block, 'MODEL_CLASS', Blockly.Arduino.ORDER_ATOMIC);
    const isDetected = block.getFieldValue('IS_DETECTED');
    const branch = Blockly.Arduino.statementToCode(block, 'DO');
    const code = `if (model->detect_class() ${isDetected} ${modelClass}){\n${branch}}${NEWLINE}`;
    return code;
};