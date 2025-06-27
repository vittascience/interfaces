/**
 * @fileoverview Actuators generators for Sphero.
 */

Blockly.Python.actuators_set_motors = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const direction = block.getFieldValue('DIRECTION');
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    Blockly.Python.addFunction('sm_move', FUNCTIONS_SPHERO.DEF_SM_MOVE);
    return `sm_move(${speed}, '${direction}')` + NEWLINE;
};

Blockly.Python.actuators_set_motors_with_timeout = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const direction = block.getFieldValue('DIRECTION');
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const timeout = Blockly.Python.valueToCode(block, "TIMEOUT", Blockly.Python.ORDER_NONE);
    Blockly.Python.addFunction('sm_move_step', FUNCTIONS_SPHERO.DEF_SM_MOVE_STEP);
    return `sm_move_step(${speed}, '${direction}', ${timeout})` + NEWLINE;
};

Blockly.Python.actuators_set_heading = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const heading = Blockly.Python.valueToCode(block, "HEADING", Blockly.Python.ORDER_NONE);
    return `sm.setHeading(${heading})` + NEWLINE;
};

Blockly.Python.actuators_set_motors_with_heading = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const heading = Blockly.Python.valueToCode(block, "HEADING", Blockly.Python.ORDER_NONE);
    switch (block.getFieldValue('DIRECTION')) {
        case 'forward':
            return `sm.roll(${speed}, ${heading})` + NEWLINE;
        case 'backward':
            return `sm.roll(${-speed}, ${heading})` + NEWLINE;
    }
};

Blockly.Python.actuators_rotate = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    Blockly.Python.addFunction('sm_rotate', FUNCTIONS_SPHERO.DEF_SM_ROTATE);
    return `sm_rotate(${speed}, '${block.getFieldValue('DIRECTION')}')` + NEWLINE;
};

Blockly.Python.actuators_rotate_with_timeout = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const timeout = Blockly.Python.valueToCode(block, "TIMEOUT", Blockly.Python.ORDER_NONE);
    Blockly.Python.addFunction('sm_rotate_step', FUNCTIONS_SPHERO.DEF_SM_ROTATE_STEP);
    return `sm_rotate_step(${speed}, '${block.getFieldValue('DIRECTION')}', ${timeout})` + NEWLINE;
};

Blockly.Python.actuators_set_motor = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const direction = block.getFieldValue('DIRECTION');
    const motor = block.getFieldValue('MOTOR');
    Blockly.Python.addFunction('sm_turn', FUNCTIONS_SPHERO.DEF_SM_TURN);
    return `sm_turn(${speed}, '${motor}', '${direction}')` + NEWLINE;
};

Blockly.Python.actuators_stop = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');    
    return `sm.raw_motor(0, None, 0, None)` + NEWLINE;
};

Blockly.Python.actuators_reset_heading = function () {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    return `sm.resetHeading()` + NEWLINE;
};