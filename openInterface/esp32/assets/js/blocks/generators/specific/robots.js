/**
 * @fileoverview Robots generators for ESP32.
 */

// Ilo robot

Blockly.Python.robots_setLedColor = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    return `ilo.set_led_color${color}` + NEWLINE;
};

Blockly.Python.robots_setLedColorRGB = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return `ilo.set_led_color(${r}, ${g}, ${b})` + NEWLINE;
};

Blockly.Python.robots_setLedShape = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const shape = block.getFieldValue('SHAPE');
    return `ilo.set_led_shape('${shape}')` + NEWLINE;
};

Blockly.Python.robots_setLedAnim = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const anim = block.getFieldValue('ANIM');
    return `ilo.set_led_anim('${anim}')` + NEWLINE;
};

Blockly.Python.robots_setLedSingle = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) | 0;
    const type = block.getFieldValue('TYPE');
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    return `ilo.set_led_single('${type}', ${id} , ${color.replace('(', '').replace(')', '')})` + NEWLINE;
};

Blockly.Python.robots_moveIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const dir = block.getFieldValue('DIR');
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || "0";
    return `ilo.move('${dir}', ${speed})` + NEWLINE;
};

Blockly.Python.robots_moveIloBySteps = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const dir = block.getFieldValue('DIR');
    const steps = Blockly.Python.valueToCode(block, 'STEPS', Blockly.Python.ORDER_NONE) || "0";
    const finish_state = block.getFieldValue("FINISH_STATE");
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('${dir}', ${steps}, True)` + NEWLINE;
    return `ilo.step('${dir}', ${steps})` + NEWLINE;
};

Blockly.Python.robots_rotateIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const dir = block.getFieldValue('DIR');
    const deg = Blockly.Python.valueToCode(block, 'DEG', Blockly.Python.ORDER_NONE) || "0";
    const finish_state = block.getFieldValue("FINISH_STATE");
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.rotation(${(dir === 'rot_clock' ? deg : -deg)}, True)` + NEWLINE;
    return `ilo.rotation(${(dir === 'rot_clock' ? deg : -deg)})` + NEWLINE;
};

Blockly.Python.robots_moveIloMotor = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const motor = block.getFieldValue('MOTOR');
    const dir = block.getFieldValue('DIR');
    const acc = 100;
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || "0";
    return `ilo.drive_single_motor_speed_${motor}(${acc}, ${dir === "rot_clock" ? speed : -speed})` + NEWLINE;
};

Blockly.Python.robots_setIloAcc = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');    
    const acc = Blockly.Python.valueToCode(block, 'ACC', Blockly.Python.ORDER_NONE) || "0";
    return `ilo.set_acc_motor(${acc})` + NEWLINE;
};

Blockly.Python.robots_setIloTempo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const tempo = Blockly.Python.valueToCode(block, 'TEMPO', Blockly.Python.ORDER_NONE) || "0";
    return `ilo.set_tempo_pos(${tempo})` + NEWLINE;
};

Blockly.Python.robots_getDistanceIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const dir = block.getFieldValue('DIR');
    return [`ilo.get_distance_${dir}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_lineDetectorIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor(True)');
    const side = block.getFieldValue('SIDE');
    return [`ilo.get_line_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_getLuminosityIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor(True)');
    const side = block.getFieldValue('SIDE');
    if (side === 'all')
        return [`ilo.get_color_clear()`, Blockly.Python.ORDER_ATOMIC];
    return [`ilo.get_color_clear_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_setLineDetectorThresholdIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor(True)');
    const threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_NONE) || "0";
    return `ilo.set_line_threshold_value(${threshold})` + NEWLINE;
};

Blockly.Python.robots_colorDetectorIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor(True)');
    const side = block.getFieldValue('SIDE');
    return [`ilo.get_color_rgb_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_colorDetectorRGBIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor(True)');
    const color = block.getFieldValue('COLOR');
    const side = block.getFieldValue('SIDE');
    return [`ilo.get_color_rgb_${side}()[${color}]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_moveOneSquareForwardIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const finish_state = block.getFieldValue("FINISH_STATE");
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('front', None, True)` + NEWLINE;
    return `ilo.step('front')` + NEWLINE;
};

Blockly.Python.robots_moveOneSquareBackwardIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const finish_state = block.getFieldValue("FINISH_STATE");
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('back', None, True)` + NEWLINE;
    return `ilo.step('back')` + NEWLINE;
};

Blockly.Python.robots_turnLeftIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const finish_state = block.getFieldValue("FINISH_STATE");
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('rot_trigo', None, True)` + NEWLINE;
    return `ilo.step('rot_trigo')` + NEWLINE;
};

Blockly.Python.robots_turnRightIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const finish_state = block.getFieldValue("FINISH_STATE");
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('rot_clock', None, True)` + NEWLINE;
    return `ilo.step('rot_clock')` + NEWLINE;
};
Blockly.Python.robots_stopRobotIlo = function () {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    return `ilo.stop()` + NEWLINE;
};

Blockly.Python.robots_getInternalSensors = function () {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const sensor = block.getFieldValue('SENSOR');
    return [`ilo.get_${sensor}()`, Blockly.Python.ORDER_ATOMIC];
};