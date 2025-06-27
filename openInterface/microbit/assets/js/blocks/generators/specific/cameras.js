/**
 * @fileoverview Cameras generators for Micro:bit.
 */

// HuskyLens

Blockly.Python.cameras_huskylens_setMode = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const mode = block.getFieldValue("MODE");
    switch (mode) {
        case 'FACE_RECOGNITION':
            return `huskylens.face_recognition_mode()` + NEWLINE;
        case 'OBJECT_TRACKING':
            return `huskylens.object_tracking_mode()` + NEWLINE;
        case 'OBJECT_RECOGNITION':
            return `huskylens.object_recognition_mode()` + NEWLINE;
        case 'LINE_TRACKING':
            return `huskylens.line_tracking_mode()` + NEWLINE;
        case 'COLOR_RECOGNITION':
            return `huskylens.color_recognition_mode()` + NEWLINE;
        case 'TAG_RECOGNITION':
            return `huskylens.tag_recognition_mode()` + NEWLINE;
        case 'OBJECT_CLASSIFICATION':
            return `huskylens.object_classification_mode()` + NEWLINE;
    }
    return '' + NEWLINE;
};

Blockly.Python.cameras_huskylens_getData = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const type = block.getFieldValue("TYPE");
    const varName = type === 'BLOCKS' ? 'huskyLensBlocksData' : 'huskyLensArrowsData';
    block.workspace.createVariable(varName);
    return `${varName} = huskylens.command_request_${type.toLowerCase()}()` + NEWLINE;
};

Blockly.Python.cameras_huskylens_requestBlocksData = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const data = block.getFieldValue("DATA");
    const varName = 'huskyLensBlocksData';
    if (data === 'ALL') {
        return [varName, Blockly.Python.ORDER_ATOMIC];
    } else {
        Blockly.Python.addFunction('def_huskylens_extract_blocks_data', FUNCTIONS_MICROBIT.DEF_HUSKYLENS_EXTRACT_BLOCKS_DATA);
        return [`extract_blocks_data(${varName}, '${data}')`, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.cameras_huskylens_requestArrowsData = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const data = block.getFieldValue("DATA");
    const varName = 'huskyLensArrowsData';
    if (data === 'ALL') {
        return [varName, Blockly.Python.ORDER_ATOMIC];
    } else {
        Blockly.Python.addFunction('def_huskylens_extract_arrows_data', FUNCTIONS_MICROBIT.DEF_HUSKYLENS_EXTRACT_ARROWS_DATA);
        return [`extract_arrows_data(${varName}, '${data}')`, Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.cameras_huskylens_requestBlockXY = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const data = block.getFieldValue("DATA");
    const varName = 'huskyLensBlocksData';
    Blockly.Python.addFunction('def_huskylens_extract_blocks_data', FUNCTIONS_MICROBIT.DEF_HUSKYLENS_EXTRACT_BLOCKS_DATA);
    return [`extract_blocks_data(${varName}, '${data}')[0]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cameras_huskylens_getNumberOfDetectedElements = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const type = block.getFieldValue("TYPE");
    const varName = type === 'BLOCKS' ? 'huskyLensBlocksData' : 'huskyLensArrowsData';
    return [`len(${varName})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cameras_huskylens_checkID = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    Blockly.Python.addFunction('def_huskylens_extract_data', FUNCTIONS_MICROBIT.DEF_HUSKLENS_ID_PRESENT);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    const type = block.getFieldValue("TYPE");
    const varName = type === 'BLOCKS' ? 'huskyLensBlocksData' : 'huskyLensArrowsData';
    return [`id_present(${varName}, ${id})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cameras_huskylens_getLineDirection = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    Blockly.Python.addFunction('def_huskylens_line_direction', FUNCTIONS_MICROBIT.DEF_HUSKYLENS_LINE_DIRECTION);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    const direction = block.getFieldValue("DIRECTION");
    return [`line_direction(huskyLensArrowsData, ${id}) == "${direction}"`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cameras_huskylens_setText = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "";
    return `huskylens.command_request_custom_text(str(${text}), ${x}, ${y})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_customName = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "";
    return `huskylens.command_request_custom_name(${id}, ${name})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_clearScreen = function () {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    return `huskylens.command_request_clear_text()` + NEWLINE;
};

Blockly.Python.cameras_huskylens_saveModel = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_NONE) || "0";
    return `huskylens.command_request_save_model_to_SD_card(${index})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_loadModel = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_NONE) || "0";
    return `huskylens.command_request_load_model_from_SD_card(${index})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_learnID = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    return `huskylens.command_request_learn_once(${id})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_forgetIDs = function () {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    return `huskylens.command_request_forget()` + NEWLINE;
};

// Wio Lite

Blockly.Python.wio_get_class_data = function () {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('wio_get_class_data', FUNCTIONS_MICROBIT.DEF_WIO_GET_CLASS_DATA);
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 32");
    return [`wio_get_class_data()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.wio_get_class_data_by_id = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('wio_get_class_data', FUNCTIONS_MICROBIT.DEF_WIO_GET_CLASS_DATA);
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 32");
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    return [`wio_get_class_data(${id})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.wio_get_class_max_id = function () {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('wio_get_class_data', FUNCTIONS_MICROBIT.DEF_WIO_GET_CLASS_DATA);
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 32");
    return ["wio_get_class_data(\"max\")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.wio_get_status = function (block) {
    const data = block.getFieldValue("DATA");
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 32");
    Blockly.Python.addFunction('wio_get_info', FUNCTIONS_MICROBIT.DEF_WIO_GET_INFO)
    return [`wio_get_info("${data}")`, Blockly.Python.ORDER_ATOMIC];
};