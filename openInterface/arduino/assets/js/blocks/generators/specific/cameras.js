/**
 * @fileoverview Cameras generators for Arduino.
 */

// HuskyLens

Blockly.Arduino.CAMERAS_INIT_HUSKYLENS = function () {
    Blockly.Arduino.addInclude('HUSKYLENS', INCLUDE_HUSKYLENS);
    Blockly.Arduino.addDeclaration('huskylens', 'HUSKYLENS huskylens;');
    Blockly.Arduino.addFunction('huskyLens_begin', FUNCTIONS_ARDUINO.DEF_HUSKYLENS_BEGIN);
    Blockly.Arduino.addSetup('huskyLens_begin', "huskyLens_begin();");
};

Blockly.Arduino.cameras_huskylens_setMode = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    const mode = block.getFieldValue("MODE");
    switch (mode) {
        case 'FACE_RECOGNITION':
            return `huskylens.writeAlgorithm(ALGORITHM_FACE_RECOGNITION);` + NEWLINE;
        case 'OBJECT_TRACKING':
            return `huskylens.writeAlgorithm(ALGORITHM_OBJECT_TRACKING);` + NEWLINE;
        case 'OBJECT_RECOGNITION':
            return `huskylens.writeAlgorithm(ALGORITHM_OBJECT_RECOGNITION);` + NEWLINE;
        case 'LINE_TRACKING':
            return `huskylens.writeAlgorithm(ALGORITHM_LINE_TRACKING);` + NEWLINE;
        case 'COLOR_RECOGNITION':
            return `huskylens.writeAlgorithm(ALGORITHM_COLOR_RECOGNITION);` + NEWLINE;
        case 'TAG_RECOGNITION':
            return `huskylens.writeAlgorithm(ALGORITHM_TAG_RECOGNITION);` + NEWLINE;
        case 'OBJECT_CLASSIFICATION':
            return `huskylens.writeAlgorithm(ALGORITHM_OBJECT_CLASSIFICATION);` + NEWLINE;
    }
    return '';
};

Blockly.Arduino.cameras_huskylens_setText = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    const x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_NONE) || "0";
    const y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_NONE) || "0";
    const text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_NONE) || "";
    return `huskylens.customText(${text}, ${x}, ${y});` + NEWLINE;
};

Blockly.Arduino.cameras_huskylens_clearScreen = function () {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    return `huskylens.clearCustomText();` + NEWLINE;
};

Blockly.Arduino.cameras_huskylens_learnID = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "1";
    return `huskylens.writeLearn(${id});` + NEWLINE;
};

Blockly.Arduino.cameras_huskylens_customName = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "1";
    const name = Blockly.Arduino.valueToCode(block, "NAME", Blockly.Arduino.ORDER_NONE) || "";
    return `huskylens.setCustomName(${name}, ${id});` + NEWLINE;
};

Blockly.Arduino.cameras_huskylens_forgetIDs = function () {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    return `huskylens.writeForget();` + NEWLINE;
};

Blockly.Arduino.cameras_huskylens_getData = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    Blockly.Arduino.SETUP_HUSKYLENS_REQUESTS();
    Blockly.Arduino.addFunction('huskylensReadAndStore', FUNCTIONS_ARDUINO.DEF_HUSKYLENS_READ_AND_STORE);
    switch (block.getFieldValue("TYPE")) {
        case "ARROWS":
            return 'readAndStore("arrows");' + NEWLINE;
        case "BLOCKS":
        default:
            return 'readAndStore("blocks");' + NEWLINE;
    }
};

Blockly.Arduino.SETUP_HUSKYLENS_REQUESTS = function () {
    const huskylensBlockStruct = `
struct Block {
  int xCenter;
  int yCenter;
  int xOrigin;
  int yOrigin;
  int width;
  int height;
  int id;
};`;
    const huskylensArrowsStruct = `
struct Arrow {
  int xOrigin;
  int yOrigin;
  int xTarget;
  int yTarget;
  int id;
};`;
    Blockly.Arduino.addDefine('huskylensMaxBlocksAndArrows', "#define MAX_BLOCKS_AND_ARROWS 20");
    Blockly.Arduino.addDeclaration('huskylensBlockStruct', huskylensBlockStruct);
    Blockly.Arduino.addDeclaration('huskylensArrowsStruct', huskylensArrowsStruct);
    Blockly.Arduino.addVariable('huskylensBlocksArray', 'Block blocks[MAX_BLOCKS_AND_ARROWS];');
    Blockly.Arduino.addVariable('huskylensArrowsArray', 'Arrow arrows[MAX_BLOCKS_AND_ARROWS];');
    Blockly.Arduino.addVariable('huskylensResultArray', 'int resultArray[MAX_BLOCKS_AND_ARROWS];');
    Blockly.Arduino.addFunction('huskylensReadAndStore', FUNCTIONS_ARDUINO.DEF_HUSKYLENS_READ_AND_STORE);
    Blockly.Arduino.addFunction('huskylensGetData', FUNCTIONS_ARDUINO.DEF_HUSKYLENS_GET_DATA);
};

Blockly.Arduino.cameras_huskylens_requestBlocksData = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    Blockly.Arduino.SETUP_HUSKYLENS_REQUESTS();
    switch (block.getFieldValue("DATA")) {
        case 'ID':
            return ['getData("blocks", "ids")', Blockly.Arduino.ORDER_ATOMIC];
        case 'X':
            return ['getData("blocks", "xOrigin")', Blockly.Arduino.ORDER_ATOMIC];
        case 'Y':
            return ['getData("blocks", "yOrigin")', Blockly.Arduino.ORDER_ATOMIC];
        case 'WIDTH':
            return ['getData("blocks", "width")', Blockly.Arduino.ORDER_ATOMIC];
        case 'HEIGHT':
            return ['getData("blocks", "height")', Blockly.Arduino.ORDER_ATOMIC];
        default:
            return ['resultArray', Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino.cameras_huskylens_requestArrowsData = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    Blockly.Arduino.SETUP_HUSKYLENS_REQUESTS();
    switch (block.getFieldValue("DATA")) {
        case 'ID':
            return ['getData("arrows", "ids")', Blockly.Arduino.ORDER_ATOMIC];
        case 'X1':
            return ['getData("arrows", "xOrigin")', Blockly.Arduino.ORDER_ATOMIC];
        case 'Y1':
            return ['getData("arrows", "yOrigin")', Blockly.Arduino.ORDER_ATOMIC];
        case 'X2':
            return ['getData("arrows", "xTarget")', Blockly.Arduino.ORDER_ATOMIC];
        case 'Y2':
            return ['getData("arrows", "yTarget")', Blockly.Arduino.ORDER_ATOMIC];
        default:
            return ['resultArray', Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino.cameras_huskylens_requestBlockXY = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    Blockly.Arduino.SETUP_HUSKYLENS_REQUESTS();
    switch (block.getFieldValue("DATA")) {
        case 'ID':
            return ['getData("blocks", "ids")[0]', Blockly.Arduino.ORDER_ATOMIC];
        case 'X':
            return ['getData("blocks", "xOrigin")[0]', Blockly.Arduino.ORDER_ATOMIC];
        case 'Y':
            return ['getData("blocks", "yOrigin")[0]', Blockly.Arduino.ORDER_ATOMIC];
        case 'WIDTH':
            return ['getData("blocks", "width")[0]', Blockly.Arduino.ORDER_ATOMIC];
        case 'HEIGHT':
            return ['getData("blocks", "height")[0]', Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino.cameras_huskylens_getNumberOfDetectedElements = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    switch (block.getFieldValue("TYPE")) {
        case "ARROWS":
            return [`huskylens.countArrows()`, Blockly.Arduino.ORDER_ATOMIC];
        case "BLOCKS":
        default:
            return [`huskylens.countBlocks()`, Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino.cameras_huskylens_getDataByID = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    const type = block.getFieldValue("TYPE");
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "1";
    switch (type) {
        case "ARROWS":
            return [`huskylens.requestArrows(${id})`, Blockly.Arduino.ORDER_ATOMIC];
        case "BLOCKS":
        default:
            return [`huskylens.requestBlocks(${id})`, Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino.cameras_huskylens_checkID = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "1";
    switch(block.getFieldValue("TYPE")) {
        case "ARROWS":
            return [`isIdDetected("arrows", ${id})`, Blockly.Arduino.ORDER_ATOMIC];
        case "BLOCKS":
        default:
            return [`isIdDetected("blocks", ${id})`, Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino.cameras_huskylens_getLineDirection = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    Blockly.Arduino.addFunction('huskylensLineDirection', FUNCTIONS_ARDUINO.DEF_HUSKYLENS_LINE_DIRECTION);
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "1";
    const direction = block.getFieldValue("DIRECTION");
    return [`line_direction(${id}) == "${direction}"`, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.cameras_huskylens_saveModel = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    const index = Blockly.Arduino.valueToCode(block, "INDEX", Blockly.Arduino.ORDER_NONE) || "0";
    return `huskylens.saveModelToSDCard(${index});` + NEWLINE;
};

Blockly.Arduino.cameras_huskylens_loadModel = function (block) {
    Blockly.Arduino.CAMERAS_INIT_HUSKYLENS();
    const index = Blockly.Arduino.valueToCode(block, "INDEX", Blockly.Arduino.ORDER_NONE) || "0";
    return `huskylens.loadModelFromSDCard(${index});` + NEWLINE;
};

// WIO Lite

Blockly.Arduino.wio_get_class_data = function () {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('wio_i2c_addr', "#define WIO_ADDR 32");
    Blockly.Arduino.addDefine('wio_data_length', "#define WIO_DATA_LENGTH 10");
    Blockly.Arduino.addSetup('wio_i2c', "Wire.begin();");
    Blockly.Arduino.addFunction('wio_get_class_data', FUNCTIONS_ARDUINO.DEF_READ_WIO_DATA);
    return [`wio_get_class_data()`, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.wio_get_class_data_by_id = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('wio_i2c_addr', "#define WIO_ADDR 32");
    Blockly.Arduino.addDefine('wio_data_length', "#define WIO_DATA_LENGTH 10");
    Blockly.Arduino.addFunction('wio_get_class_data', FUNCTIONS_ARDUINO.DEF_READ_WIO_DATA);
    Blockly.Arduino.addFunction('wio_get_class_data_at', FUNCTIONS_ARDUINO.DEF_WIO_GET_CLASS_DATA_AT);
    Blockly.Arduino.addSetup('wio_i2c', "Wire.begin();");
    const id = Blockly.Arduino.valueToCode(block, "ID", Blockly.Arduino.ORDER_NONE) || "0";
    return [`wio_get_class_data_at(${id})`, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.wio_get_class_max_id = function () {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('wio_i2c_addr', "#define WIO_ADDR 32");
    Blockly.Arduino.addDefine('wio_data_length', "#define WIO_DATA_LENGTH 10");
    Blockly.Arduino.addFunction('wio_get_class_data', FUNCTIONS_ARDUINO.DEF_READ_WIO_DATA);
    Blockly.Arduino.addFunction('wio_get_class_data_max', FUNCTIONS_ARDUINO.DEF_WIO_GET_CLASS_DATA_MAX);
    Blockly.Arduino.addSetup('wio_i2c', "Wire.begin();");
    return ["wio_get_class_data_max()", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.wio_get_status = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('wio_i2c_addr', "#define WIO_ADDR 32");
    Blockly.Arduino.addDefine('wio_data_length', "#define WIO_DATA_LENGTH 10");
    Blockly.Arduino.addFunction('wio_get_info', FUNCTIONS_ARDUINO.DEF_WIO_GET_INFO);
    Blockly.Arduino.addSetup('wio_i2c', "Wire.begin();");
    const data = block.getFieldValue("DATA");
    return [`wio_get_info("${data}")`, Blockly.Arduino.ORDER_ATOMIC];
};