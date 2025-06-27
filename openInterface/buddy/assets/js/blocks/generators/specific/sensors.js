/**
 * @fileoverview Sensors generators for Buddy.
 */

 Blockly.Python.sensors_USdetectObstacle = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const direction = block.getFieldValue("DIRECTION");
    const state = block.getFieldValue("STATE");
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addFunction('onUSdetectObstacle', FUNCTIONS_BUDDY.ON_US_DETECT_OBSTACLE);
    Blockly.Python.forEver_ += `if on_us_detect_obstacle(${state === "is" ? "True": "False"}, ${distance*10}, "${direction}"):${NEWLINE}${branchCode}`
    return "";
};

// Blockly.Python.sensors_USdetectObstacle = function (block) {
//     Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
//     Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
//     Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
//     Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
//     const direction = block.getFieldValue("DIRECTION");
//     const state = block.getFieldValue("STATE");
//     const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
//     const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
//     Blockly.Python.forEver_ += 'if' + (state === "is" ? ' ' : ' not ') + 'buddy.USSensors().'+ direction +'US().getDistance() <= ' + distance*10 + ':' + NEWLINE + branchCode;
//     return '';
// };

Blockly.Python.sensors_USdetectObstacle_simple = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const direction = block.getFieldValue("DIRECTION");
    const state = block.getFieldValue("STATE");
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addFunction('onUSdetectObstacle', FUNCTIONS_BUDDY.ON_US_DETECT_OBSTACLE);

    // Blockly.Python.forEver_ += 'if' + (state === "is" ? ' ' : ' not ') + 'buddy.USSensors().'+ direction +'US().getDistance() <= ' + distance*10 + ':' + NEWLINE + branchCode;
    return `if on_us_detect_obstacle(${state === "is" ? "True": "False"}, ${distance*10}, "${direction}"):${NEWLINE}${branchCode}`;
};

Blockly.Python.sensors_getDistance = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const direction = block.getFieldValue("DIRECTION");
    Blockly.Python.addFunction('onUSdetectObstacle', FUNCTIONS_BUDDY.GET_DISTANCE_US);
    return [`get_distance_us("${direction}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_ToFdetectObstacle = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const direction = block.getFieldValue("DIRECTION");
    const state = block.getFieldValue("STATE");
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addFunction('onTFdetectObstacle', FUNCTIONS_BUDDY.ON_TF_DETECT_OBSTACLE);
    Blockly.Python.forEver_ += `if on_tf_detect_obstacle(${state === "is" ? "True": "False"}, ${distance*10}, "${direction}"):${NEWLINE}${branchCode}`
    return '';
};

Blockly.Python.sensors_ToFdetectObstacle_simple = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const direction = block.getFieldValue("DIRECTION");
    const state = block.getFieldValue("STATE");
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE);
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addFunction('onUSdetectObstacle', FUNCTIONS_BUDDY.ON_TF_DETECT_OBSTACLE);
    // Blockly.Python.forEver_ += 'if' + (state === "is" ? ' ' : ' not ') + 'buddy.TofSensors().'+ direction +'().getDistance() <= ' + distance*10 + ':' + NEWLINE + branchCode;
    return `if on_tf_detect_obstacle(${state === "is" ? "True": "False"}, ${distance*10}, "${direction}"):${NEWLINE}${branchCode}`;
};

Blockly.Python.sensors_getLight = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const direction = block.getFieldValue("DIRECTION");
    Blockly.Python.addFunction('getLight', FUNCTIONS_BUDDY.GET_DISTANCE_TF);
    return [`get_distance_tf("${direction}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_onBodyTouchSensorsTouched = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const direction = block.getFieldValue("DIRECTION");
    const state = block.getFieldValue("STATE");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    if (state === "is_touched")
        Blockly.Python.forEver_ += 'if buddy.BodyTouchSensors().' + direction  +'().isTouched():' + NEWLINE + branchCode;
    else
        Blockly.Python.forEver_ += 'if not buddy.BodyTouchSensors().' + direction  +'().isTouched():' + NEWLINE + branchCode;
    return '';
};

Blockly.Python.sensors_onHeadTouchSensorsTouched= function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const direction = block.getFieldValue("DIRECTION");
    const state = block.getFieldValue("STATE");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    let code = "";
    if (state === "is_touched")
        code = 'if buddy.HeadTouchSensors().' + direction  +'().isTouched():'+ NEWLINE + branchCode;
    else
        code = 'if not buddy.HeadTouchSensors().' + direction  +'().isTouched():' + NEWLINE + branchCode;    
    Blockly.Python.forEver_ += code;
    return '';
};

Blockly.Python.sensors_headTouchSensors = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const direction = block.getFieldValue("DIRECTION");
    return ['buddy.HeadTouchSensors().' + direction  +'().isTouched()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_bodyTouchSensors = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const direction = block.getFieldValue("DIRECTION");
    return ['buddy.BodyTouchSensors().' + direction  +'().isTouched()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_onFaceTouchSensorsTouched = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const direction = block.getFieldValue("DIRECTION");
    const state = block.getFieldValue("STATE");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addInit(direction + "listener", "buddy.addFaceTouchListener('" + direction + "')");
    if (state === "is_touched")
        Blockly.Python.forEver_ += "if buddy.getFaceTouch('" + direction + "'):" + NEWLINE + branchCode;
    else
        Blockly.Python.forEver_ += "if not buddy.getFaceTouch('" + direction + "'):" + NEWLINE + branchCode;
    return '';
};

Blockly.Python.sensors_faceTouchSensors = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const direction = block.getFieldValue("DIRECTION");
    Blockly.Python.addInit(direction + "listener", "buddy.addFaceTouchListener('" + direction + "')");
    return ["buddy.getFaceTouch('" + direction + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getBatteryLevel = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    return ['buddy.Battery().getBatteryLevel()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_isCharging = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    return ['buddy.Battery().isCharging()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getAmbiantSound = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    return ['buddy.Microphone().getAmbiantSound()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getSoundLocalisation = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    return ['buddy.Microphone().getSoundLocalisation()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getTriggerScore = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    return ['buddy.Microphone().getTriggerScore()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getBodyAcc = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const axis = block.getFieldValue("AXIS");
    return ['buddy.BodyIMU().getAcc' + axis + '()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getBodyGyr = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const axis = block.getFieldValue("AXIS");
    return ['buddy.BodyIMU().getGyr' + axis + '()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getHeadAcc = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const axis = block.getFieldValue("AXIS");
    return ['buddy.HeadIMU().getAcc' + axis + '()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getHeadGyr = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    Blockly.Python.addInit('enableSensorsModule', 'buddy.enableSensorsModule(True, RspCallback)');
    const axis = block.getFieldValue("AXIS");
    return ['buddy.HeadIMU().getGyr' + axis + '()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_colorDetect = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    return ['buddy.ColorDetect()', Blockly.Python.ORDER_ATOMIC];
};