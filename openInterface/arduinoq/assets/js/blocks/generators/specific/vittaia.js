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
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_vittascience_model(" + model_url + ")" + NEWLINE;
};

// Model trained in the Vittascience AI tool of this browser: the uploader sends it to the board (buildAppFiles)
Blockly.Python.vittaia_load_local_model = function () {
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_local_model()" + NEWLINE;
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
    block.workspace.getVariableMap().createVariable('modelPredictionIndex');
    block.workspace.getVariableMap().createVariable('modelPredictionScore');
    block.workspace.getVariableMap().createVariable('modelPredictionOutput');
};

Blockly.Python.vittaia_make_predictions_webcam = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addImport('datetime', IMPORT_DATETIME);
    Blockly.Python.addImport('cv2', IMPORT_CV2);
    Blockly.Python.addImport('PIL.Image', IMPORT_PIL_IMAGE);
    Blockly.Python.addFunction('capture_webcam_image', FUNCTIONS_ARDUINO_Q.py.DEF_CAPTURE_WEBCAM_IMAGE);
    Blockly.Python.addInit('current_webcam_index', 'current_webcam_index = 0');
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "webcam_img = capture_webcam_image(output_dir=\"captures\", camera_index=current_webcam_index)" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_on_image(vittamodel.current_model_ID, webcam_img)" + NEWLINE
};

Blockly.Python.vittaia_make_predictions_pc_webcam = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addImport('PIL.Image', IMPORT_PIL_IMAGE);
    Blockly.Python.addFunction('capture_pc_webcam_image', FUNCTIONS_ARDUINO_Q.py.DEF_CAPTURE_PC_WEBCAM_IMAGE);
    Blockly.Python.addInit('pc_webcam_last_time', 'pc_webcam_last_time = None');
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "webcam_img = capture_pc_webcam_image()" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_on_image(vittamodel.current_model_ID, webcam_img)" + NEWLINE
};

Blockly.Python.vittaia_make_predictions_file = function (block) {
    const picture = block.getFieldValue("PICTURE") || "";
    Blockly.Python.addImport('PIL.Image', IMPORT_PIL_IMAGE);
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
    // Class name (as on the Python interface), set by the last prediction
    return ["vittamodel.current_label", Blockly.Python.ORDER_MEMBER];
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
    return `if vittamodel.current_label ${is_detected} ${model_class}:` + NEWLINE + branch;
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

// Result blocks of the posture and hand sub-categories: same code as the image ones
for (const kind of ['posture', 'hand', 'sound', 'sensor']) {
    for (const type of ['vittaia_get_highest_probability_class', 'vittaia_get_confidence_rate', 'vittaia_detect_class']) {
        Blockly.Python[`${type}_${kind}`] = Blockly.Python[type];
    }
}

// AI POSTURE
// The posture models of the Vittascience AI tool run on the board: PoseNet keypoints, then the model classifier
// (vitta_tf.VittaTF.predict_posture_on_image). The result blocks are the image ones (class, confidence...).

Blockly.Python.vittaia_load_posture_model = function (block) {
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_posture_model(" + model_url + ")" + NEWLINE;
};

// Posture model trained in the Vittascience AI tool of this browser: the uploader sends it to the board (buildAppFiles)
Blockly.Python.vittaia_load_local_posture_model = function () {
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_local_posture_model()" + NEWLINE;
};

Blockly.Python.vittaia_make_posture_predictions_webcam = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addImport('datetime', IMPORT_DATETIME);
    Blockly.Python.addImport('cv2', IMPORT_CV2);
    Blockly.Python.addImport('PIL.Image', IMPORT_PIL_IMAGE);
    Blockly.Python.addFunction('capture_webcam_image', FUNCTIONS_ARDUINO_Q.py.DEF_CAPTURE_WEBCAM_IMAGE);
    Blockly.Python.addInit('current_webcam_index', 'current_webcam_index = 0');
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "webcam_img = capture_webcam_image(output_dir=\"captures\", camera_index=current_webcam_index)" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_posture_on_image(vittamodel.current_model_ID, webcam_img)" + NEWLINE
};

Blockly.Python.vittaia_make_posture_predictions_pc_webcam = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addImport('PIL.Image', IMPORT_PIL_IMAGE);
    Blockly.Python.addFunction('capture_pc_webcam_image', FUNCTIONS_ARDUINO_Q.py.DEF_CAPTURE_PC_WEBCAM_IMAGE);
    Blockly.Python.addInit('pc_webcam_last_time', 'pc_webcam_last_time = None');
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "webcam_img = capture_pc_webcam_image()" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_posture_on_image(vittamodel.current_model_ID, webcam_img)" + NEWLINE
};

// AI HANDS
// The hand models of the Vittascience AI tool run on the board: MediaPipe hand keypoints, then the model classifier
// (vitta_tf.VittaTF.predict_hands_on_image). The result blocks are the image ones (class, confidence...).

Blockly.Python.vittaia_load_hand_model = function (block) {
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_hand_model(" + model_url + ")" + NEWLINE;
};

// Hand model trained in the Vittascience AI tool of this browser: the uploader sends it to the board (buildAppFiles)
Blockly.Python.vittaia_load_local_hand_model = function () {
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_local_hand_model()" + NEWLINE;
};

Blockly.Python.vittaia_make_hand_predictions_webcam = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addImport('datetime', IMPORT_DATETIME);
    Blockly.Python.addImport('cv2', IMPORT_CV2);
    Blockly.Python.addImport('PIL.Image', IMPORT_PIL_IMAGE);
    Blockly.Python.addFunction('capture_webcam_image', FUNCTIONS_ARDUINO_Q.py.DEF_CAPTURE_WEBCAM_IMAGE);
    Blockly.Python.addInit('current_webcam_index', 'current_webcam_index = 0');
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "webcam_img = capture_webcam_image(output_dir=\"captures\", camera_index=current_webcam_index)" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_hands_on_image(vittamodel.current_model_ID, webcam_img)" + NEWLINE
};

Blockly.Python.vittaia_make_hand_predictions_pc_webcam = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addImport('PIL.Image', IMPORT_PIL_IMAGE);
    Blockly.Python.addFunction('capture_pc_webcam_image', FUNCTIONS_ARDUINO_Q.py.DEF_CAPTURE_PC_WEBCAM_IMAGE);
    Blockly.Python.addInit('pc_webcam_last_time', 'pc_webcam_last_time = None');
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "webcam_img = capture_pc_webcam_image()" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_hands_on_image(vittamodel.current_model_ID, webcam_img)" + NEWLINE
};

// AI SOUND
// The sound models of the Vittascience AI tool run on the board: spectrogram of the last second of sound like the AI
// tool microphone, then the model (vitta_tf.VittaTF.predict_on_sound). The result blocks are the image ones.

Blockly.Python.vittaia_load_sound_model = function (block) {
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_sound_model(" + model_url + ")" + NEWLINE;
};

// Sound model trained in the Vittascience AI tool of this browser: the uploader sends it to the board (buildAppFiles)
Blockly.Python.vittaia_load_local_sound_model = function () {
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_local_sound_model()" + NEWLINE;
};

Blockly.Python.vittaia_make_sound_predictions_microphone = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addFunction('capture_microphone_sound', FUNCTIONS_ARDUINO_Q.py.DEF_CAPTURE_MICROPHONE_SOUND);
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "sound_samples, sound_rate = capture_microphone_sound()" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_on_sound(vittamodel.current_model_ID, sound_samples, sound_rate)" + NEWLINE
};

Blockly.Python.vittaia_make_sound_predictions_pc_microphone = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addFunction('capture_pc_microphone_sound', FUNCTIONS_ARDUINO_Q.py.DEF_CAPTURE_PC_MICROPHONE_SOUND);
    Blockly.Python.addInit('pc_microphone_last_time', 'pc_microphone_last_time = None');
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "sound_samples, sound_rate = capture_pc_microphone_sound()" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_on_sound(vittamodel.current_model_ID, sound_samples, sound_rate)" + NEWLINE
};

// AI SENSOR DATA
// The sensor models of the Vittascience AI tool run on the board: A0/A1 readings of the sketch (given through the
// Bridge, added to the sketch by MultiCodeManager), features like the AI tool, then the model
// (vitta_tf.VittaTF.predict_on_sensors). The result blocks are the image ones.

Blockly.Python.vittaia_load_sensor_model = function (block) {
    const model_url = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_sensor_model(" + model_url + ")" + NEWLINE;
};

// Sensor model trained in the Vittascience AI tool of this browser: the uploader sends it to the board (buildAppFiles)
Blockly.Python.vittaia_load_local_sensor_model = function () {
    Blockly.Python.addImport('vitta_tf.VittaTF', IMPORT_VITTA_TF);
    Blockly.Python.addInit('vittamodel', "vittamodel = VittaTF()");
    return "vittamodel.load_local_sensor_model()" + NEWLINE;
};

Blockly.Python.vittaia_make_sensor_predictions = function (block) {
    Blockly.Python.VITTAIA_DO_PREDICTION_CODE(block);
    return "sensor_values = vittamodel.read_sensors(vittamodel.current_model_ID)" + NEWLINE +
        "modelPredictionIndex, modelPredictionScore, modelPredictionOutput = vittamodel.predict_on_sensors(vittamodel.current_model_ID, sensor_values)" + NEWLINE
};

/*
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