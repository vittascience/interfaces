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

Blockly.Python.cameras_huskylens_setText = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "";
    return `huskylens.command_request_custom_text(str(${text}), ${x}, ${y})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_clearScreen = function () {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    return `huskylens.command_request_clear_text()` + NEWLINE;
};

Blockly.Python.cameras_huskylens_learnID = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    return `huskylens.command_request_learn_once(${id})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_customName = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "";
    return `huskylens.command_request_custom_name(${id}, ${name})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_forgetIDs = function () {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    return `huskylens.command_request_forget()` + NEWLINE;
};

Blockly.Python.cameras_huskylens_getData = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const type = block.getFieldValue("TYPE");
    switch (type) {
        case "ARROWS":
            block.workspace.getVariableMap().createVariable('huskyLensArrowsData');
            return `huskyLensArrowsData = huskylens.command_request_arrows()` + NEWLINE;
        case "BLOCKS":
        default:
            block.workspace.getVariableMap().createVariable('huskyLensBlocksData');
            return `huskyLensBlocksData = huskylens.command_request_blocks()` + NEWLINE;
    }
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

Blockly.Python.cameras_huskylens_getDataByID = function (block) {
    Blockly.Python.addImport('huskyLens', IMPORT_HUSKYLENS);
    Blockly.Python.addInit('huskylens-init', 'huskylens = HuskyLensLibrary()');
    const type = block.getFieldValue("TYPE");
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    switch (type) {
        case "ARROWS":
            return [`huskylens.command_request_arrows_by_id(${id})`, Blockly.Python.ORDER_ATOMIC];
        case "BLOCKS":
        default:
            return [`huskylens.command_request_blocks_by_id(${id})`, Blockly.Python.ORDER_ATOMIC];
    }
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

// HuskyLens V2

const HUSKYLENS_V2_ALGORITHM_IDS = {
    face: 1,
    object: 2,
    tracking: 3,
    color: 4,
    classification: 5,
    self_learning_classification: 6,
    instance_segmentation: 7,
    hand: 8,
    gesture: 8,
    pose: 9,
    license_plate: 10,
    ocr: 11,
    line: 12,
    emotion: 13,
    gaze: 14,
    face_orientation: 15,
    tag: 16,
    barcode: 17,
    qr: 18,
    fall: 19,
    depth: 20,
    auto_drive_1: 21,
    auto_drive_2: 22
};

const addHuskyLensV2 = function () {
    Blockly.Python.addImport('huskylens_v2', IMPORT_HUSKYLENSV2);
    Blockly.Python.addInit('huskylens-v2-init', 'huskylens2 = HuskyLensV2()');
    Blockly.Python.addInit('huskylens-v2-begin', 'huskylens2.initI2c()');
};

Blockly.Python.cameras_huskylens_v2_initMode = function (block) {
    addHuskyLensV2();
    const mode = block.getFieldValue("MODE") || "face";
    const modeId = Object.prototype.hasOwnProperty.call(HUSKYLENS_V2_ALGORITHM_IDS, mode)
        ? HUSKYLENS_V2_ALGORITHM_IDS[mode]
        : Number(mode);
    return `huskylens2.initMode(${Number.isInteger(modeId) ? modeId : 1})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_readBox = function (block) {
    addHuskyLensV2();
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    const data = block.getFieldValue("DATA") || "";
    return [`huskylens2.readBox(${id}, "${data}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cameras_huskylens_v2_readArrow = function (block) {
    addHuskyLensV2();
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    const data = block.getFieldValue("DATA") || "";
    return [`huskylens2.readArrow(${id}, "${data}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cameras_huskylens_v2_readId = function () {
    addHuskyLensV2();
    return ["huskylens2.readId()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cameras_huskylens_v2_count = function (block) {
    addHuskyLensV2();
    const type = block.getFieldValue("TYPE") || "BOX";
    return [`huskylens2.count("${type}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cameras_huskylens_v2_isAppear = function (block) {
    addHuskyLensV2();
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    const type = block.getFieldValue("TYPE") || "BOX";
    return [`huskylens2.isAppear(${id}, "${type}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cameras_huskylens_v2_writeLearn1 = function () {
    addHuskyLensV2();
    return "huskylens2.writeLearn1()" + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_learnedId = function () {
    addHuskyLensV2();
    return ["huskylens2.learned_id", Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.cameras_huskylens_v2_forgetLearn = function () {
    addHuskyLensV2();
    return "huskylens2.forgetLearn()" + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_writeName = function (block) {
    addHuskyLensV2();
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "''";
    return `huskylens2.writeName(${id}, ${name})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_writeOSD = function (block) {
    addHuskyLensV2();
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "''";
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const fontSize = block.getFieldValue("FONT_SIZE") || "24";
    const color = block.getFieldValue("COLOR") || "16777215";
    return `huskylens2.writeOSD(${name}, ${x}, ${y}, ${fontSize}, ${color})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_clearOSD = function () {
    addHuskyLensV2();
    return "huskylens2.clearOSD()" + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_saveModelToTFCard = function (block) {
    addHuskyLensV2();
    const command = JSON.stringify(block.getFieldValue("COMMAND") || "SAVE");
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "0";
    return `huskylens2.saveModelToTFCard(${command}, ${data})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_initCustomMode = function (block) {
    addHuskyLensV2();
    const rawId = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "128";
    const id = `max(128, min(255, int(${rawId})))`;
    return `huskylens2.initMode(${id})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_drawRect = function (block) {
    addHuskyLensV2();
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_NONE) || "1";
    const height = Blockly.Python.valueToCode(block, "HEIGHT", Blockly.Python.ORDER_NONE) || "1";
    const color = block.getFieldValue("COLOR") || "16777215";
    const lineWidth = Blockly.Python.valueToCode(block, "LINE_WIDTH", Blockly.Python.ORDER_NONE) || "1";
    return `huskylens2.drawRect(${x}, ${y}, ${width}, ${height}, ${color}, ${lineWidth})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_clearRect = function () {
    addHuskyLensV2();
    return "huskylens2.clearRect()" + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_drawUniqueRect = function (block) {
    addHuskyLensV2();
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_NONE) || "1";
    const height = Blockly.Python.valueToCode(block, "HEIGHT", Blockly.Python.ORDER_NONE) || "1";
    const color = block.getFieldValue("COLOR") || "16777215";
    const lineWidth = Blockly.Python.valueToCode(block, "LINE_WIDTH", Blockly.Python.ORDER_NONE) || "1";
    return `huskylens2.drawUniqueRect(${x}, ${y}, ${width}, ${height}, ${color}, ${lineWidth})` + NEWLINE;
};

Blockly.Python.cameras_huskylens_v2_takePhoto = function (block) {
    addHuskyLensV2();
    return `huskylens2.takePhoto(${block.getFieldValue("RESOLUTION") || "0"})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_takeScreenshot = function () { addHuskyLensV2(); return "huskylens2.takeScreenshot()" + NEWLINE; };
Blockly.Python.cameras_huskylens_v2_playMusic = function (block) {
    addHuskyLensV2();
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "''";
    const volume = Blockly.Python.valueToCode(block, "VOLUME", Blockly.Python.ORDER_NONE) || "100";
    return `huskylens2.playMusic(${name}, ${volume})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_startRecording = function (block) {
    addHuskyLensV2();
    const resolution = block.getFieldValue("RESOLUTION") || "0";
    const media = block.getFieldValue("MEDIA") || "3";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    const filename = Blockly.Python.valueToCode(block, "FILENAME", Blockly.Python.ORDER_NONE) || "''";
    return `huskylens2.startRecording(${resolution}, ${media}, ${duration}, ${filename})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_stopRecording = function (block) {
    addHuskyLensV2();
    return `huskylens2.stopRecording(${block.getFieldValue("MEDIA") || "3"})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_learnBlock = function (block) {
    addHuskyLensV2();
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_NONE) || "1";
    const height = Blockly.Python.valueToCode(block, "HEIGHT", Blockly.Python.ORDER_NONE) || "1";
    return `huskylens2.learnBlock(${x}, ${y}, ${width}, ${height})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_saveKnowledge = function (block) {
    addHuskyLensV2();
    const bank = Blockly.Python.valueToCode(block, "BANK", Blockly.Python.ORDER_NONE) || "0";
    return `huskylens2.saveKnowledge(${bank})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_loadKnowledge = function (block) {
    addHuskyLensV2();
    const bank = Blockly.Python.valueToCode(block, "BANK", Blockly.Python.ORDER_NONE) || "0";
    return `huskylens2.loadKnowledge(${bank})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_setMultiAlgorithm = function (block) {
    addHuskyLensV2();
    const a = ["ALGO0", "ALGO1", "ALGO2"].map(n => Blockly.Python.valueToCode(block, n, Blockly.Python.ORDER_NONE) || "0");
    return `huskylens2.setMultiAlgorithm(${a.join(", ")})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_setMultiAlgorithmRatio = function (block) {
    addHuskyLensV2();
    const a = ["RATIO0", "RATIO1", "RATIO2"].map(n => Blockly.Python.valueToCode(block, n, Blockly.Python.ORDER_NONE) || "0");
    return `huskylens2.setMultiAlgorithmRatio(${a.join(", ")})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_getAlgoParam = function (block) {
    addHuskyLensV2();
    const key = Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) || "''";
    const valueType = JSON.stringify(block.getFieldValue("VALUE_TYPE") || "string");
    const algo = Blockly.Python.valueToCode(block, "ALGO", Blockly.Python.ORDER_NONE) || "0";
    return [`huskylens2.getAlgoParam(${key}, ${valueType}, ${algo})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_setAlgoParam = function (block) {
    addHuskyLensV2();
    const key = Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) || "''";
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const valueType = JSON.stringify(block.getFieldValue("VALUE_TYPE") || "string");
    const algo = Blockly.Python.valueToCode(block, "ALGO", Blockly.Python.ORDER_NONE) || "0";
    return `huskylens2.setAlgoParam(${key}, ${value}, ${valueType}, ${algo})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_updateAlgoParams = function (block) {
    addHuskyLensV2();
    const algo = Blockly.Python.valueToCode(block, "ALGO", Blockly.Python.ORDER_NONE) || "0";
    return `huskylens2.updateAlgoParams(${algo})` + NEWLINE;
};
Blockly.Python.cameras_huskylens_v2_exit = function () { addHuskyLensV2(); return "huskylens2.exit()" + NEWLINE; };
Blockly.Python.cameras_huskylens_v2_getResultByIndex = function (block) {
    addHuskyLensV2();
    const index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_NONE) || "0";
    const type = JSON.stringify(block.getFieldValue("TYPE") || "BOX");
    const data = JSON.stringify(block.getFieldValue("DATA") || "id");
    return [`huskylens2.getResultByIndex(${index}, ${type}, ${data})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getResultById = function (block) {
    addHuskyLensV2();
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    const type = JSON.stringify(block.getFieldValue("TYPE") || "BOX");
    const data = JSON.stringify(block.getFieldValue("DATA") || "id");
    return [`huskylens2.getResultById(${id}, ${type}, ${data})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getCenterResult = function (block) {
    addHuskyLensV2();
    const type = JSON.stringify(block.getFieldValue("TYPE") || "BOX");
    const data = JSON.stringify(block.getFieldValue("DATA") || "id");
    return [`huskylens2.getCenterResult(${type}, ${data})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getLargestResult = function (block) {
    addHuskyLensV2();
    const type = JSON.stringify(block.getFieldValue("TYPE") || "BOX");
    const data = JSON.stringify(block.getFieldValue("DATA") || "id");
    return [`huskylens2.getLargestResult(${type}, ${data})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getNearestResult = function (block) {
    addHuskyLensV2();
    const type = JSON.stringify(block.getFieldValue("TYPE") || "BOX");
    const data = JSON.stringify(block.getFieldValue("DATA") || "id");
    return [`huskylens2.getNearestResult(${type}, ${data})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getBranchCount = function () {
    addHuskyLensV2();
    return ["huskylens2.getBranchCount()", Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getBranchByIndex = function (block) {
    addHuskyLensV2();
    const index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_NONE) || "0";
    const data = JSON.stringify(block.getFieldValue("DATA") || "angle");
    return [`huskylens2.getBranchByIndex(${index}, ${data})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getKeypoint = function (block) {
    addHuskyLensV2();
    const index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_NONE) || "0";
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    const axis = JSON.stringify(block.getFieldValue("AXIS") || "x");
    const type = JSON.stringify(block.getFieldValue("TYPE") || "hand");
    return [`huskylens2.getKeypoint(${index}, ${axis}, ${type}, ${id})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getFaceOrientation = function (block) {
    addHuskyLensV2();
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    const axis = JSON.stringify(block.getFieldValue("AXIS") || "pitch");
    return [`huskylens2.getFaceOrientation(${axis}, ${id})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getVisibleId = function (block) {
    addHuskyLensV2();
    const index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_NONE) || "0";
    const type = JSON.stringify(block.getFieldValue("TYPE") || "BOX");
    return [`huskylens2.getVisibleId(${index}, ${type})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_getVisibleIdCount = function () {
    addHuskyLensV2();
    return ["huskylens2.getVisibleIdCount()", Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.cameras_huskylens_v2_countById = function (block) {
    addHuskyLensV2();
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    const type = JSON.stringify(block.getFieldValue("TYPE") || "BOX");
    return [`huskylens2.countById(${id}, ${type})`, Blockly.Python.ORDER_ATOMIC];
};
// Wio Lite

Blockly.Python.wio_get_class_data = function () {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('wio_get_class_data', FUNCTIONS_MICROBIT.DEF_WIO_GET_CLASS_DATA);
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 0x20");
    return [`wio_get_class_data()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.wio_get_class_data_by_id = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('wio_get_class_data', FUNCTIONS_MICROBIT.DEF_WIO_GET_CLASS_DATA);
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 0x20");
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    return [`wio_get_class_data(${id})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.wio_get_class_max_id = function () {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('wio_get_class_data', FUNCTIONS_MICROBIT.DEF_WIO_GET_CLASS_DATA);
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 0x20");
    return ["wio_get_class_data(\"max\")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.wio_get_status = function (block) {
    const data = block.getFieldValue("DATA");
    Blockly.Python.addInit('wio_i2c_addr', "wio_addr = 0x20");
    Blockly.Python.addFunction('wio_get_info', FUNCTIONS_MICROBIT.DEF_WIO_GET_INFO)
    return [`wio_get_info("${data}")`, Blockly.Python.ORDER_ATOMIC];
};
