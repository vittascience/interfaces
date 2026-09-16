/**
 * @fileoverview Vittaia generators for Arduino Q.
 */

// AI IMAGE

Blockly.Python.vittaia_load_model = function (block) {
    // Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    // Blockly.Python.addImport('urllib.parse', IMPORT_URLLIB_PARSE);
    // Blockly.Python.addImport('json', IMPORT_JSON);
    // Blockly.Python.addImport('re', IMPORT_RE);
    // Blockly.Python.addImport('requests', IMPORT_REQUESTS);
    //Blockly.Python.addInit('current_model_ID', 'current_model_ID = None');
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    //Blockly.Python.addFunction('download_file', FUNCTIONS_ARDUINO_Q.py.DEF_DOWNLOAD_FILE);
    //Blockly.Python.addFunction('load_vittascience_model', FUNCTIONS_ARDUINO_Q.py.DEF_LOAD_VITTASCIENCE_MODEL);
    return "vittamodel.load_vittascience_model(" + model_url + ")" + NEWLINE;
};

Blockly.Python.vittaia_load_model_default = function (block) {
    // Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    // Blockly.Python.addImport('urllib.parse', IMPORT_URLLIB_PARSE);
    // Blockly.Python.addImport('json', IMPORT_JSON);
    // Blockly.Python.addImport('re', IMPORT_RE);
    // Blockly.Python.addImport('requests', IMPORT_REQUESTS);
    //Blockly.Python.addInit('current_model_ID', 'current_model_ID = None');
    const model_url = block.getFieldValue("MODEL");
    //Blockly.Python.addFunction('download_file', FUNCTIONS_ARDUINO_Q.py.DEF_DOWNLOAD_FILE);
    //Blockly.Python.addFunction('load_vittascience_model', FUNCTIONS_ARDUINO_Q.py.DEF_LOAD_VITTASCIENCE_MODEL);
    return "vittamodel.load_vittascience_model('" + model_url + "')" + NEWLINE;
};

Blockly.Python.VITTAIA_DO_PREDICTION_CODE = function (block) {
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    block.workspace.createVariable('modelPredictionIndex');
    block.workspace.createVariable('modelPredictionScore');
    block.workspace.createVariable('modelPredictionOutput');
};

Blockly.Python.vittaia_make_predictions_webcam = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addImport('datetime', IMPORT_DATETIME);
    Blockly.Python.addImport('cv2', IMPORT_CV2);
    Blockly.Python.addFunction('capture_webcam_image', FUNCTIONS_ARDUINO_Q.py.DEF_CAPTURE_WEBCAM_IMAGE);
    Blockly.Python.addInit('current_webcam_index', 'current_webcam_index = 0');
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "webcam_img = capture_webcam_image(output_dir=\"captures\", camera_index=current_webcam_index)" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_on_image(vittamodel.current_model_ID, webcam_img)" + NEWLINE
};

Blockly.Python.vittaia_make_predictions_file = function (block) {
    const picture = block.getFieldValue("PICTURE") || "";
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    const filename = picture.replace(/'/g, '\\\'').replace(/"/g, '\\\"');
    Blockly.Python.unoq.addImage(filename, filename);
    return "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_on_image(vittamodel.current_model_ID, Image.open('" + filename + "'))" + NEWLINE;
};

Blockly.Python.vittaia_make_predictions_from_url = function (block) {
    const picture_url = Blockly.Python.valueToCode(block, "PICTURE_URL", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    //Blockly.Python.addFunction('download_file', FUNCTIONS_ARDUINO_Q.py.DEF_DOWNLOAD_FILE);
    //Blockly.Python.addFunction('predict_on_image_url', FUNCTIONS_ARDUINO_Q.py.DEF_PREDICT_ON_IMAGE_URL);
    return "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_on_image_url(vittamodel.current_model_ID, " + picture_url + ")" + NEWLINE;
};

// Blockly.Python.vittaia_make_predictions_file_standalone = function (block) {
//     const picture = block.getFieldValue("PICTURE") || "";
//     Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
//     const filename = picture.replace(/'/g, '\\\'').replace(/"/g, '\\\"');
//     Blockly.Python.unoq.addImage(filename, filename);
//     return ["vittamodel.predict_on_image(vittamodel.current_model_ID, Image.open('" + filename + "'))", Blockly.Python.ORDER_ATOMIC];
// };

Blockly.Python.vittaia_get_highest_probability_class = function () {
    return ["modelPredictionIndex", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_get_confidence_rate = function () {
    return ["modelPredictionScore", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_get_predictions = function (block) {
    return ["modelPredictionOutput", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vittaia_detect_class = function (block) {
    const is_detected = block.getFieldValue("IS_DETECTED");
    const model_class = Blockly.Python.valueToCode(block, "MODEL_CLASS", Blockly.Python.ORDER_NONE) || "''";
    let branch = Blockly.Python.statementToCode(block, "DO");
    branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
    return `if modelPredictionIndex ${is_detected} ${model_class}:` + NEWLINE + branch;
};

// Blockly.Python.vittaia_image_uploaded = function (block) {
//     Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
//     const picture = block.getFieldValue("PICTURE") || "";
//     return ["via.getUploadedImage('" + picture.replace(/'/g, '\\\'').replace(/"/g, '\\\"') + "')", Blockly.Python.ORDER_ATOMIC];
// };

// AI Image - webcam

Blockly.Python.vittaia_init_webcam = function (block) {
    const index = Blockly.Python.valueToCode(block, "CAMERA", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('current_webcam_index', 'current_webcam_index = 0');
    return "current_webcam_index = " + index;
};

// Blockly.Python.vittaia_webcam_capture = function () {
//     Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
//     Blockly.Python.addInit('webcam', 'webcam = via.Webcam()');
//     Blockly.Python.addInit('select_camera_0', 'webcam.select_camera(0)');
//     Blockly.Python.addInit('webcam_display', 'webcam.display()');
//     return ["webcam.capture()", Blockly.Python.ORDER_ATOMIC];
// };

Blockly.Python.vittaia_list_webcams = function () {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addFunction('get_camera_list', FUNCTIONS_ARDUINO_Q.py.DEF_GET_CAMERA_LIST);
    return ["get_camera_list()", Blockly.Python.ORDER_ATOMIC];
};

// Blockly.Python.vittaia_webcam_refresh = function () {
//     Blockly.Python.addImport('vittaia', IMPORT_VITTAIA);
//     Blockly.Python.addInit('webcam', 'webcam = via.Webcam()');
//     Blockly.Python.addInit('select_camera', 'webcam.select_camera(0)');
//     return 'webcam.display()' + NEWLINE;
// };

//AI POSTURE

/*
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

*/