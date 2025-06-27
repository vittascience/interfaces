/**
 * @fileoverview Display generators for Buddy.
 */

Blockly.Python.vision_startCamera = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    const lock = block.getFieldValue("LOCK");
    return 'buddy.startCamera(0,VisionCbk,' + lock + ')' + NEWLINE;
};

Blockly.Python.vision_stopCamera = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    const lock = block.getFieldValue("LOCK");
    return 'buddy.stopCamera(0,VisionCbk,'+ lock + ')' + NEWLINE;
};

Blockly.Python.vision_detectArucoMarkers = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    return ['buddy.detectArucoMarkers()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vision_detectFaces = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    const thres = Blockly.Python.valueToCode(block, 'THRES', Blockly.Python.ORDER_NONE) || "";
    if(thres != "")
        return ['buddy.detectFaces(' + thres + ')', Blockly.Python.ORDER_ATOMIC];
    else
        return ['buddy.detectFaces()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vision_ifPersonDetected = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    const thres = Blockly.Python.valueToCode(block, 'THRES', Blockly.Python.ORDER_NONE) || "";
    const state = block.getFieldValue("STATE");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.forEver_ += "if buddy.detectPerson(" + (thres != "" ? thres : '' )+ ")['quantity']" + (state === "is" ? ' > ' : ' == ' ) + '0:' + NEWLINE + branchCode;
    return '';
};

Blockly.Python.vision_ifPersonDetectedInArea = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    Blockly.Python.addFunction('area_detection', FUNCTIONS_BUDDY.DEF_AREA_DETECTION);
    const area = block.getFieldValue("AREA");
    const state = block.getFieldValue("STATE");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.forEver_ += "if" + (state === "is" ? ' ' : ' not ' ) + "area_detection(buddy.detectPerson()) == '" + area + "' :" + NEWLINE + branchCode;
    return '';
};

Blockly.Python.vision_detectPerson = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    const thres = Blockly.Python.valueToCode(block, 'THRES', Blockly.Python.ORDER_NONE) || "";
    if(thres != "")
        return ['buddy.detectPerson(' + thres + ')', Blockly.Python.ORDER_ATOMIC];
    else
        return ['buddy.detectPerson()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vision_startMotionDetection = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    return 'buddy.startMotionDetection()' + NEWLINE;
};

Blockly.Python.vision_stopMotionDetection = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    return 'buddy.stopMotionDetection()' + NEWLINE;
};

Blockly.Python.vision_motionDetect = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    return ['buddy.motionDetect()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vision_setMotionThres = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    const thres  = Blockly.Python.valueToCode(block, "THRES", Blockly.Python.ORDER_NONE);
    return 'buddy.setMotionThres(' + thres + ')' + NEWLINE;
};

Blockly.Python.vision_motionDetectWithThres = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    const thres  = Blockly.Python.valueToCode(block, "THRES", Blockly.Python.ORDER_NONE);
    return ['buddy.motionDetectWithThres(' + thres + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vision_getMotionDetection = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    return ['buddy.getMotionDetection()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vision_startVisualTracking = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    const thres  = Blockly.Python.valueToCode(block, "THRES", Blockly.Python.ORDER_NONE) || "";
    if(thres != "")
        return 'buddy.startVisualTracking(' + thres + ')' + NEWLINE;
    else
        return 'buddy.startVisualTracking()' + NEWLINE;
};

Blockly.Python.vision_stopVisualTracking = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    return 'buddy.stopVisualTracking()' + NEWLINE;
};

Blockly.Python.vision_getTracking = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    return ['buddy.getTracking()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vision_getGrandAngleFrame = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    return 'buddy.getGrandAngleFrame()';
};

Blockly.Python.vision_getCVResultFrame = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    Blockly.Python.addInit('START_CAMERA','buddy.startCamera(0,VisionCbk,True)');
    return 'buddy.getCVResultFrame()';
};