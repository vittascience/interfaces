/**
 * @fileoverview Vittaia generators for Buddy.
 */

Blockly.Python.vittaia_load_local_model = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', 'modelImage = via.ModelImage()');
    return "modelImage.load_model('local')" + NEWLINE;
};

Blockly.Python.vittaia_load_model = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', 'modelImage = via.ModelImage()');
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    return "modelImage.load_model(" + model_url + ")" + NEWLINE;
};

Blockly.Python.vittaia_load_model_default = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', 'modelImage = via.ModelImage()');
    const model_url = block.getFieldValue("MODEL");
    return "modelImage.load_model('" + model_url + "')" + NEWLINE;
};

Blockly.Python.vittaia_make_predictions_webcam = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', 'modelImage = via.ModelImage()');
    Blockly.Python.addInit('webcam', 'webcam = via.Webcam()');
    Blockly.Python.addInit('select_camera', 'webcam.select_camera(0)');
    block.workspace.createVariable(MODEL_PREDICTIONS);
    return "webcam.display()" + NEWLINE + MODEL_PREDICTIONS + " = modelImage.predict(webcam.capture())" + NEWLINE
};

Blockly.Python.vittaia_get_highest_probability_class = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', 'modelImage = via.ModelImage()');
    Blockly.Python.addFunction('vittaia-get_best_probability', FUNCTIONS.DEF_VITTAIA_GET_BEST_PROBABILITY_CLASS);
    return ["get_best_probability_class(" + MODEL_PREDICTIONS + ", 'class')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_get_confidence_rate = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', 'modelImage = via.ModelImage()');
    Blockly.Python.addFunction('vittaia-get_best_probability', FUNCTIONS.DEF_VITTAIA_GET_BEST_PROBABILITY_CLASS);
    return ["get_best_probability_class(" + MODEL_PREDICTIONS + ", 'rate')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_get_predictions = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    block.workspace.createVariable(MODEL_PREDICTIONS);
    return [MODEL_PREDICTIONS, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_detect_class = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addFunction('vittaia-get_best_probability', FUNCTIONS.DEF_VITTAIA_GET_BEST_PROBABILITY_CLASS);
    const is_detected = block.getFieldValue("IS_DETECTED");
    const model_class = Blockly.Python.valueToCode(block, "MODEL_CLASS", Blockly.Python.ORDER_NONE) || "''";
    let branch = Blockly.Python.statementToCode(block, "DO");
    branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
    const code = `if get_best_probability_class(${MODEL_PREDICTIONS}, 'class') ${is_detected} ${model_class}:` + NEWLINE + branch;
    return code;
};

// AI Image - webcam

Blockly.Python.vittaia_list_webcams = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcam', 'webcam = via.Webcam()');
    return ["webcam.get_camera_list()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_init_webcam = function (block) {
    const index = Blockly.Python.valueToCode(block, "CAMERA", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcam', 'webcam = via.Webcam()');
    Blockly.Python.addInit(`select_camera_${index}`, 'webcam.select_camera(' + index + ')');
    Blockly.Python.addInit('webcam_display', 'webcam.display()');
    return "";
};