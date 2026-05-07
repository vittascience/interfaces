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
    const cycles = Blockly.Python.valueToCode(block, "CYCLES", Blockly.Python.ORDER_NONE) || "0";
    return `ilo.set_led_anim('${anim}', ${cycles})` + NEWLINE;
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
    Blockly.Python.addPowerOn('ilo-robot-display-led', 'display_led = True');
    const dir = block.getFieldValue('DIR');
    const steps = Blockly.Python.valueToCode(block, 'STEPS', Blockly.Python.ORDER_NONE) || "0";
    const finish_state = block.getFieldValue("FINISH_STATE") || 'TRUE';
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('${dir}', ${steps}, True, display_led)` + NEWLINE;
    return `ilo.step('${dir}', ${steps}, False, display_led)` + NEWLINE;
};

Blockly.Python.robots_rotateIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addPowerOn('ilo-robot-display-led', 'display_led = True');
    const dir = block.getFieldValue('DIR');
    const deg = Blockly.Python.valueToCode(block, 'DEG', Blockly.Python.ORDER_NONE) || "0";
    const finish_state = block.getFieldValue("FINISH_STATE") || 'TRUE';
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.rotation(${(dir === 'rot_clock' ? deg : -deg)}, True, display_led)` + NEWLINE;
    return `ilo.rotation(${(dir === 'rot_clock' ? deg : -deg)}, False, display_led)` + NEWLINE;
};

Blockly.Python.robots_moveIloMotor = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const motor = block.getFieldValue('MOTOR');
    const dir = block.getFieldValue('DIR');
    const acc = 100;
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || "0";
    return `ilo.drive_single_motor_speed_${motor}(${acc}, ${dir === "rot_clock" ? -speed : speed})` + NEWLINE;
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
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor()');
    const side = block.getFieldValue('SIDE');
    return [`ilo.get_line_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_getLuminosityIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor()');
    const side = block.getFieldValue('SIDE');
    if (side === 'all')
        return [`ilo.get_color_clear()`, Blockly.Python.ORDER_ATOMIC];
    return [`ilo.get_color_clear_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_setLineDetectorThresholdIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor()');
    const threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_NONE) || "0";
    return `ilo.set_line_threshold_value(${threshold})` + NEWLINE;
};

// TO BE REMOVED

Blockly.Python.robots_colorDetectorIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor()');
    const side = block.getFieldValue('SIDE');
    return [`ilo.get_color_rgb_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_colorDetectorRGBIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor()');
    const color = block.getFieldValue('COLOR');
    const side = block.getFieldValue('SIDE');
    return [`ilo.get_color_rgb_${side}()[${color}]`, Blockly.Python.ORDER_ATOMIC];
};

// END TO BE REMOVED

Blockly.Python.robots_getColorRawIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor()');
    const color = block.getFieldValue('COLOR');
    return [`ilo.get_raw_color_rgb()[${color}]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_getColorCardIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addInit('ilo-robot-sensor-lights', 'ilo.set_led_captor()');
    const color = block.getFieldValue('COLOR');
    return [`ilo.get_color_card('${color}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_moveOneSquareForwardIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addPowerOn('ilo-robot-display-led', 'display_led = True');
    const finish_state = block.getFieldValue("FINISH_STATE") || 'TRUE';
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('front', 1, True, display_led)` + NEWLINE;
    return `ilo.step('front', 1, False, display_led)` + NEWLINE;
};

Blockly.Python.robots_moveOneSquareBackwardIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addPowerOn('ilo-robot-display-led', 'display_led = True');
    const finish_state = block.getFieldValue("FINISH_STATE") || 'TRUE';
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('back', 1, True, display_led)` + NEWLINE;
    return `ilo.step('back', 1, False, display_led)` + NEWLINE;
};

Blockly.Python.robots_turnLeftIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addPowerOn('ilo-robot-display-led', 'display_led = True');
    const finish_state = block.getFieldValue("FINISH_STATE") || 'TRUE';
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('rot_trigo', 1, True, display_led)` + NEWLINE;
    return `ilo.step('rot_trigo', 1, False, display_led)` + NEWLINE;
};

Blockly.Python.robots_turnRightIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    Blockly.Python.addPowerOn('ilo-robot-display-led', 'display_led = True');
    const finish_state = block.getFieldValue("FINISH_STATE") || 'TRUE';
    if (finish_state !== null && finish_state === 'TRUE')
        return `ilo.step('rot_clock', 1, True, display_led)` + NEWLINE;
    return `ilo.step('rot_clock', 1, False, display_led)` + NEWLINE;
};
Blockly.Python.robots_stopRobotIlo = function () {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    return `ilo.stop()` + NEWLINE;
};

Blockly.Python.robots_getInternalSensors = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const sensor = block.getFieldValue('SENSOR');
    return [`ilo.get_${sensor}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_displayLedAnimationStateIlo = function (block) {
    Blockly.Python.addImport('ilo-import', IMPORT_ILO);
    Blockly.Python.addConstant('ilo-robot', '""" Ilo robot """');
    const state = block.getFieldValue('STATE');
    return `display_led = ${state}` + NEWLINE;
}

// Alvik robot

// MOTORS
Blockly.Python.initialize_alvik = function () {
    Blockly.Python.addConstant('alvik-robot', "\"\"\" Alvik robot \"\"\"");
    Blockly.Python.addImport('alvik', IMPORT_ALVIK);
    Blockly.Python.addInit('alvik', "alvik = ArduinoAlvik()");
    Blockly.Python.addPowerOn('alvik', "alvik.begin()");
};

Blockly.Python.robots_alvik_rotate = function (block) {
    Blockly.Python.initialize_alvik();
    const angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC) || '0';
    const unit = block.getFieldValue('UNIT');
    return `alvik.rotate(${angle}, '${unit}')` + NEWLINE;
};

Blockly.Python.robots_alvik_move = function (block) {
    Blockly.Python.initialize_alvik();
    const distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC) || '0';
    const unit = block.getFieldValue('UNIT');
    return `alvik.move(${distance}, '${unit}')` + NEWLINE;
};

Blockly.Python.robots_alvik_set_wheels_speed = function (block) {
    Blockly.Python.initialize_alvik();
    const leftSpeed = Blockly.Python.valueToCode(block, 'LEFT_SPEED', Blockly.Python.ORDER_ATOMIC) || '0';
    const rightSpeed = Blockly.Python.valueToCode(block, 'RIGHT_SPEED', Blockly.Python.ORDER_ATOMIC) || '0';
    const unit = block.getFieldValue('UNIT');
    return `alvik.set_wheels_speed(${leftSpeed}, ${rightSpeed}, '${unit}')` + NEWLINE;
};

Blockly.Python.robots_alvik_set_wheels_position = function (block) {
    Blockly.Python.initialize_alvik();
    const leftAngle = Blockly.Python.valueToCode(block, 'LEFT_ANGLE', Blockly.Python.ORDER_ATOMIC) || '0';
    const rightAngle = Blockly.Python.valueToCode(block, 'RIGHT_ANGLE', Blockly.Python.ORDER_ATOMIC) || '0';
    const unit = block.getFieldValue('UNIT');
    return `alvik.set_wheels_position(${leftAngle}, ${rightAngle}, '${unit}')` + NEWLINE;
};

Blockly.Python.robots_alvik_drive = function (block) {
    Blockly.Python.initialize_alvik();
    const linearVelocity = Blockly.Python.valueToCode(block, 'LINEAR_VELOCITY', Blockly.Python.ORDER_ATOMIC) || '0';
    const angularVelocity = Blockly.Python.valueToCode(block, 'ANGULAR_VELOCITY', Blockly.Python.ORDER_ATOMIC) || '0';
    const linearUnit = block.getFieldValue('LINEAR_UNIT');
    const angularUnit = block.getFieldValue('ANGULAR_UNIT');
    return `alvik.drive(${linearVelocity}, ${angularVelocity}, '${linearUnit}', '${angularUnit}')` + NEWLINE;
};

Blockly.Python.robots_alvik_stop = function () {
    Blockly.Python.initialize_alvik();
    return 'alvik.stop()' + NEWLINE;
};

Blockly.Python.robots_alvik_brake = function () {
    Blockly.Python.initialize_alvik();
    return 'alvik.brake()' + NEWLINE;
};

Blockly.Python.robots_alvik_get_wheels_speed = function (block) {
    Blockly.Python.initialize_alvik();
    const unit = block.getFieldValue('UNIT');
    return [`alvik.get_wheels_speed('${unit}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_wheels_position = function (block) {
    Blockly.Python.initialize_alvik();
    const unit = block.getFieldValue('UNIT');
    return [`alvik.get_wheels_position('${unit}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_drive_speed = function (block) {
    Blockly.Python.initialize_alvik();
    const linearUnit = block.getFieldValue('LINEAR_UNIT');
    const angularUnit = block.getFieldValue('ANGULAR_UNIT');
    return [`alvik.get_drive_speed('${linearUnit}', '${angularUnit}')`, Blockly.Python.ORDER_ATOMIC];
};

// SERVOS
Blockly.Python.robots_alvik_set_servo_positions = function (block) {
    Blockly.Python.initialize_alvik();
    const servoa_angle = Blockly.Python.valueToCode(block, 'SERVOA_ANGLE', Blockly.Python.ORDER_ATOMIC) || '0';
    const servob_angle = Blockly.Python.valueToCode(block, 'SERVOB_ANGLE', Blockly.Python.ORDER_ATOMIC) || '0';
    return `alvik.set_servo_positions(${servoa_angle}, ${servob_angle})` + NEWLINE;
};

// LEDS
Blockly.Python.robots_alvik_set_builtin_led = function (block) {
    Blockly.Python.initialize_alvik();
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return `alvik.set_builtin_led(${state})` + NEWLINE;
};

Blockly.Python.robots_alvik_set_illuminator = function (block) {
    Blockly.Python.initialize_alvik();
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return `alvik.set_illuminator(${state})` + NEWLINE;
};

// SENSORS
Blockly.Python.robots_alvik_get_distance = function (block) {
    Blockly.Python.initialize_alvik();
    const unit = block.getFieldValue('UNIT');
    const sensor = block.getFieldValue('SENSOR');
    return [`alvik.get_distance('${unit}')[${sensor}]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_line_sensors = function (block) {
    Blockly.Python.initialize_alvik();
    const sensor = block.getFieldValue('SENSOR');
    return [`alvik.get_line_sensors()[${sensor}]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_orientation = function (block) {
    Blockly.Python.initialize_alvik();
    const orientation = block.getFieldValue('ORIENTATION');
    return [`alvik.get_orientation()[${orientation}]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_acceleration = function (block) {
    Blockly.Python.initialize_alvik();
    const axis = block.getFieldValue('AXIS');
    return [`alvik.get_acceleration()[${axis}]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_gyros = function (block) {
    Blockly.Python.initialize_alvik();
    const axis = block.getFieldValue('AXIS');
    return [`alvik.get_gyros()[${axis}]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_battery_charge = function (block) {
    Blockly.Python.initialize_alvik();
    return [`alvik.get_battery_charge()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_touch_button = function (block) {
    Blockly.Python.initialize_alvik();
    const button = block.getFieldValue('BUTTON');
    return [`alvik.get_touch_${button.toLowerCase()}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_color = function (block) {
    Blockly.Python.initialize_alvik();
    const colorFormat = block.getFieldValue('COLOR_FORMAT');
    return [`alvik.get_color('${colorFormat}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_get_color_raw = function (block) {
    Blockly.Python.initialize_alvik();
    const color = block.getFieldValue('COLOR');
    return [`alvik.get_color_raw()[${color}]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_color_calibration = function (block) {
    Blockly.Python.initialize_alvik();
    const background = block.getFieldValue('BACKGROUND');
    return `alvik.color_calibration('${background}')` + NEWLINE;
};

Blockly.Python.robots_alvik_rgb2hsv = function (block) {
    Blockly.Python.initialize_alvik();
    const r = Blockly.Python.valueToCode(block, 'R', Blockly.Python.ORDER_ATOMIC) || '0';
    const g = Blockly.Python.valueToCode(block, 'G', Blockly.Python.ORDER_ATOMIC) || '0';
    const b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC) || '0';
    return [`alvik.rgb2hsv(${r}, ${g}, ${b})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_alvik_hsv2label = function (block) {
    Blockly.Python.initialize_alvik();
    const h = Blockly.Python.valueToCode(block, 'H', Blockly.Python.ORDER_ATOMIC) || '0';
    const s = Blockly.Python.valueToCode(block, 'S', Blockly.Python.ORDER_ATOMIC) || '0';
    const v = Blockly.Python.valueToCode(block, 'V', Blockly.Python.ORDER_ATOMIC) || '0';
    return [`alvik.hsv2label(${h}, ${s}, ${v})`, Blockly.Python.ORDER_ATOMIC];
};
