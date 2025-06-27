/**
 * @fileoverview Actuators generators for Buddy.
 */

Blockly.Python.actuators_buddySay = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const direction = block.getFieldValue("DIRECTION");
    const angle  = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE);
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return 'buddy.buddySay' + direction + '(' + speed + ',' + angle + ',RspCallback,'+ lock + ')' + NEWLINE;
};

Blockly.Python.actuators_buddySayStraight = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const direction = block.getFieldValue("DIRECTION");
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return 'buddy.buddySay' + direction + 'Straight(' + speed + ',RspCallback,' + lock + ')' + NEWLINE;
};

Blockly.Python.actuators_stopMove = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const direction = block.getFieldValue("DIRECTION");
    return 'buddy.buddyStop' + direction + 'Move(RspCallback)' + NEWLINE;
};

Blockly.Python.actuators_getPosition = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const direction = block.getFieldValue("DIRECTION");
    return ['buddy.get' + direction + 'Position()', Blockly.Python.ORDER_ATOMIC];
};
/*
Blockly.Python.actuators_wheelRotate = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    var code = "buddy.enableWheels(1,1,RspCallback)"
    Blockly.Python.addInit('enableWheels' + (speed >= 0 ? "Left" : "Right"), code);
    return 'buddy.WheelRotate(' + speed + ',RspCallback)' + NEWLINE;
};
*/
Blockly.Python.actuators_rotateBuddy = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return 'buddy.rotateBuddy(' + speed + ',RspCallback,' + lock + ')' + NEWLINE;
};

Blockly.Python.actuators_rotateBuddyWithAngle = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const angle  = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "";
    return 'buddy.rotateBuddy(' + speed  + ',RspCallback,' + lock + ',' + angle + ')' + NEWLINE;
};

Blockly.Python.actuators_emergencyStopMotors = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    return 'buddy.emergencyStopMotors(RspCallback)' + NEWLINE;
};

Blockly.Python.actuators_moveBuddy = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return 'buddy.moveBuddy(' + speed + ',RspCallback,' + lock + ')' + NEWLINE;
};

Blockly.Python.actuators_moveBuddyWithDistance  = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const distance  = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "";
    return 'buddy.moveBuddy(' + speed + ',RspCallback,' + lock + ',' + distance/100 + ')' + NEWLINE;
};