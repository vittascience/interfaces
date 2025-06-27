/**
 * @fileoverview Vittaia generators for Python.
 */

// AI IMAGE

Blockly.Python.vittaia_load_model = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', 'modelImage = via.ModelImage()');
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    return "modelImage.load_model(" + model_url + ")" + NEWLINE;
};

Blockly.Python.vittaia_load_local_model = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', 'modelImage = via.ModelImage()');
    return "modelImage.load_model('local')" + NEWLINE;
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

Blockly.Python.vittaia_make_predictions_file = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', 'modelImage = via.ModelImage()');
    const picture = block.getFieldValue("PICTURE") || "";
    block.workspace.createVariable(MODEL_PREDICTIONS);
    return MODEL_PREDICTIONS + " = modelImage.predict(via.getUploadedImage('" + picture.replace(/'/g, '\\\'').replace(/"/g, '\\\"') + "'))" + NEWLINE;
};

Blockly.Python.vittaia_make_predictions_file_standalone = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    const picture = block.getFieldValue("PICTURE") || "";
    return ["modelImage.predict(via.getUploadedImage('" + picture.replace(/'/g, '\\\'').replace(/"/g, '\\\"') + "'))", Blockly.Python.ORDER_ATOMIC];
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

Blockly.Python.vittaia_image_uploaded = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    const picture = block.getFieldValue("PICTURE") || "";
    return ["via.getUploadedImage('" + picture.replace(/'/g, '\\\'').replace(/"/g, '\\\"') + "')", Blockly.Python.ORDER_ATOMIC];
};

// AI Image - webcam

Blockly.Python.vittaia_init_webcam = function (block) {
    const index = Blockly.Python.valueToCode(block, "CAMERA", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcam', 'webcam = via.Webcam()');
    Blockly.Python.addInit(`select_camera_${index}`, 'webcam.select_camera(' + index + ')');
    Blockly.Python.addInit('webcam_display', 'webcam.display()');
    return "";
};

Blockly.Python.vittaia_webcam_capture = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcam', 'webcam = via.Webcam()');
    Blockly.Python.addInit('select_camera_0', 'webcam.select_camera(0)');
    Blockly.Python.addInit('webcam_display', 'webcam.display()');
    return ["webcam.capture()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_list_webcams = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcam', 'webcam = via.Webcam()');
    return ["webcam.get_camera_list()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_webcam_refresh = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcam', 'webcam = via.Webcam()');
    Blockly.Python.addInit('select_camera', 'webcam.select_camera(0)');
    return 'webcam.display()' + NEWLINE;
};

//AI POSTURE

Blockly.Python.vittaia_init_model_posture = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelPosture', '');
    return ["via.ModelPosture()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_load_posture_model = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelPosture', 'modelPosture = via.ModelPosture()');
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    return "modelPosture.load_model(" + model_url + ")" + NEWLINE;
};

Blockly.Python.vittaia_init_posture_webcam = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcamPosture', 'webcamPosture = via.WebcamPosture()');
    Blockly.Python.addInit('initWebcamPosture', 'webcamPosture.select_camera(0)');
    Blockly.Python.addInit('displayWebcamPosture', 'webcamPosture.display()');
    return "";
};

Blockly.Python.vittaia_make_posture_predictions = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelPosture', 'modelPosture = via.ModelPosture()');
    Blockly.Python.addInit('webcamPosture', 'webcamPosture = via.WebcamPosture()');
    Blockly.Python.addInit('snapshot', 'snapshot = webcamPosture.capture()');
    const code = "modelPosture.predict(snapshot)";
    return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.vittaia_list_posture_webcams = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcamPosture', 'webcamPosture = via.WebcamPosture()');
    const code = "webcamPosture.get_camera_list()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_init_webcam_posture = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcamPosture', '');
    return [`via.WebcamPosture()` + NEWLINE, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_select_webcam_posture = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    const index = Blockly.Python.valueToCode(block, "CAMERA", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('webcamPosture', 'webcamPosture = via.WebcamPosture()');
    return `webcamPosture.select_camera(${index})` + NEWLINE;
}

Blockly.Python.vittaia_refresh_webcam_posture = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcamPosture', 'webcamPosture = via.WebcamPosture()');
    return 'webcamPosture.display()' + NEWLINE;
};

Blockly.Python.vittaia_capture_webcam_posture = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcamPosture', 'webcamPosture = via.WebcamPosture()');
    return ["webcamPosture.capture()", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.vittaia_predict_webcam_posture = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelPosture', 'modelPosture = via.ModelPosture()');
    Blockly.Python.addInit('webcamPosture', 'webcamPosture = via.WebcamPosture()');
    const capture = Blockly.Python.valueToCode(block, "MODEL_PRE", Blockly.Python.ORDER_NONE) || "snapshot";
    return [`modelPosture.predict(${capture})`, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.vittaia_list_webcams_posture = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcamPosture', 'webcamPosture = via.WebcamPosture()');
    return ["webcamPosture.get_camera_list()", Blockly.Python.ORDER_ATOMIC];
}


// AI SOUND

Blockly.Python.vittaia_load_sound_model = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelSound', 'modelSound = via.ModelSound()');
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    return "modelSound.load_model(" + model_url + ")" + NEWLINE;
};

Blockly.Python.vittaia_init_microphone = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('micro', 'micro = via.Micro()');
    return "micro.play()" + NEWLINE;
};

Blockly.Python.vittaia_make_sound_predictions = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelSound', 'modelSound = via.ModelSound()');
    Blockly.Python.addInit('micro', 'micro = via.Micro()');
    return ["modelSound.listen()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_make_sound_predictions_standalone = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    return ["modelSound.listen()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_list_microphones = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('micro', 'micro = via.Micro()');
    return ["micro.get_micros_list()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_list_microphones_standalone = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    return ["micro.get_micros_list()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_init_micro_play = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    return "micro.play()" + NEWLINE;
}

Blockly.Python.vittaia_init_micro_var = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    return ["via.Micro()", Blockly.Python.ORDER_ATOMIC];
}

// AI TEXT

Blockly.Python.vittaia_init_discussion = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    return ["via.Discussion()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_init_text_ai = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    return ["via.TextAI()", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.vittaia_load_discussion = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('context', 'context= via.Discussion()');
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    return "context.load_discussion(" + model_url + ")" + NEWLINE;
};

Blockly.Python.vittaia_set_randomness = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('ai', 'ai = via.TextAI()');
    const temperature = Blockly.Python.valueToCode(block, "TEMPERATURE", Blockly.Python.ORDER_MEMBER) || "1";
    return `ai.set_randomness(${temperature})` + NEWLINE;
};

Blockly.Python.vittaia_set_randomness_standalone = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    const temperature = Blockly.Python.valueToCode(block, "TEMPERATURE", Blockly.Python.ORDER_MEMBER) || "1";
    return `ai.set_randomness(${temperature})` + NEWLINE;
};

Blockly.Python.vittaia_set_model_ia = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('ai', 'ai = via.TextAI()');
    const model = block.getFieldValue('MODEL');
    return `ai.set_model_ia("${model}")` + NEWLINE;
};

Blockly.Python.vittaia_set_model_ia_standalone = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    const model = block.getFieldValue('MODEL');
    return `ai.set_model_ia("${model}")` + NEWLINE;
};

Blockly.Python.vittaia_model_text_predict = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('ai', 'ai = via.TextAI()');
    const message = Blockly.Python.valueToCode(block, "MESSAGE", Blockly.Python.ORDER_MEMBER) || "''";
    return [`ai.predict(${message})`, Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.vittaia_model_text_predict_standalone = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    const message = Blockly.Python.valueToCode(block, "MESSAGE", Blockly.Python.ORDER_MEMBER) || "''";
    return [`ai.predict(${message})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_get_ai_message = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('ai', 'ai = via.TextAI()');
    return "print(ai.get_ai_message())" + NEWLINE;
};

// Not displayed blocks. AST Python <-> Blocks

Blockly.Python.vittaia_init_model = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('modelImage', '');
    return ["via.ModelImage()", Blockly.Python.ORDER_NONE];
};

Blockly.Python.vittaia_init_webcam_1 = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    Blockly.Python.addInit('webcam', '');
    return ["via.Webcam()", Blockly.Python.ORDER_NONE];
};

Blockly.Python.vittaia_init_webcam_2 = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit(`select_camera_${id}`, '');
    return `webcam.select_camera(${id})` + NEWLINE;
};

Blockly.Python.vittaia_init_webcam_3 = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    return 'webcam.display()' + NEWLINE;
};

Blockly.Python.vittaia_init_capture = function () {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    return ["webcam.capture()", Blockly.Python.ORDER_NONE];
};

Blockly.Python.vittaia_predict = function (block) {
    Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
    return ["modelImage.predict(webcam.display())", Blockly.Python.ORDER_NONE];
};

Blockly.Python.vittaia_get_best_probability_class = Blockly.Python.vittaia_get_highest_probability_class;

// init ModelSound
Blockly.Python.vittaia_init_model_sound = function () {
    Blockly.Python.addInit('modelSound', '');
    return ["via.ModelSound()", Blockly.Python.ORDER_NONE];
};

// init Micro
Blockly.Python.vittaia_init_micro = function () {
    Blockly.Python.addInit('micro', '');
    return ["via.Micro()", Blockly.Python.ORDER_NONE];
};