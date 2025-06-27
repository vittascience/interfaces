/**
 * @fileoverview Sensors generators for Winky.
 */

Blockly.Python.sensors_getGyroDirection = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const axis = block.getFieldValue('AXIS') || '';
    return [`winky.get_gyro_${axis}_direction()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGyroAngle = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const axis = block.getFieldValue('AXIS') || '';
    return [`winky.get_gyro_${axis}_angle()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getProximityDetection = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const distance = block.getFieldValue('DISTANCE') || '0';
    return [`winky.get_proximity_detection() == ${distance}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGestureDetection = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const movement = block.getFieldValue('MOVEMENT') || '0';
    return [`winky.get_gesture_detection() == ${movement}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getTouchBtn = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const button = block.getFieldValue('BUTTON') || 'blue';
    const state = block.getFieldValue('STATE') || '';
    return [`winky.get_touch_${button}${state}()`, Blockly.Python.ORDER_ATOMIC];
};