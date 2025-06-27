/**
 * @fileoverview Actuators generators for Winky.
 */

Blockly.Python.actuators_setNeckPosition = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    return `winky.set_neck_position(${angle})` + NEWLINE;
};

Blockly.Python.actuators_setNeckRotate = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const speed = block.getFieldValue('SPEED') || '2';
    return `winky.set_neck_rotate(${angle}, ${speed})` + NEWLINE;
};

Blockly.Python.actuators_setEarsPosition = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const ears = block.getFieldValue('EARS') || 'duplicate';
    return `winky.set_ear_${ears}_position(${angle})` + NEWLINE;
};

Blockly.Python.actuators_setEarsRear = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const ears = block.getFieldValue('EARS') || 'duplicate';
    switch (ears) {
        case 'left':
            return `winky.set_ear_left_position(0)` + NEWLINE;
        case 'right':
            return `winky.set_ear_right_position(0)` + NEWLINE;
        case 'duplicate':
            Blockly.Python.addFunction('setEarsPreset', FUNCTIONS_WINKY.DEF_WINKY_SET_EARS_PRESET);
            return `setEarsPreset()` + NEWLINE;
        case 'random':
            return `winky.set_ear_random_position(0)` + NEWLINE;
    }
};

Blockly.Python.actuators_setEarsDown = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const ears = block.getFieldValue('EARS') || 'duplicate';
    switch (ears) {
        case 'left':
            return `winky.set_ear_left_position(-90)` + NEWLINE;
        case 'right':
            return `winky.set_ear_right_position(90)` + NEWLINE;
        case 'duplicate':
            Blockly.Python.addFunction('setEarsPreset', FUNCTIONS_WINKY.DEF_WINKY_SET_EARS_PRESET);
            return `setEarsPreset("DOWN")` + NEWLINE;
    }
};

Blockly.Python.actuators_setEarsStanding = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const ears = block.getFieldValue('EARS') || 'duplicate';
    switch (ears) {
        case 'left':
            return `winky.set_ear_left_position(90)` + NEWLINE;
        case 'right':
            return `winky.set_ear_right_position(-90)` + NEWLINE;
        case 'duplicate':
            Blockly.Python.addFunction('setEarsPreset', FUNCTIONS_WINKY.DEF_WINKY_SET_EARS_PRESET);
            return `setEarsPreset("STANDING")` + NEWLINE;
    }
};