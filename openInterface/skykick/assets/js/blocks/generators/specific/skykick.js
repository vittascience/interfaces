/**
 * @fileoverview SkyKick Evo generators.
 */

Blockly.Python.skykick_takeoff = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    return `skykick.takeoff()` + NEWLINE;
};

Blockly.Python.skykick_land = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    return `skykick.land()` + NEWLINE;
};

Blockly.Python.skykick_stop = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    return `skykick.stop()` + NEWLINE;
};

Blockly.Python.skykick_clear_bias = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    return `skykick.clear_bias()` + NEWLINE;
};

Blockly.Python.skykick_clear_trim = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    return `skykick.clear_trim()` + NEWLINE;
};

Blockly.Python.skykick_set_headless = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const toggle = block.getFieldValue("TOGGLE");
    return `skykick.set_headless("${toggle}")` + NEWLINE;
};

Blockly.Python.skykick_set_trim = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const roll = Blockly.Python.valueToCode(block, "ROLL", Blockly.Python.ORDER_NONE) || 0;
    const pitch = Blockly.Python.valueToCode(block, "PITCH", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.set_trim(${roll}, ${pitch})` + NEWLINE;
};

Blockly.Python.skykick_trim_step = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const variation = block.getFieldValue("VARIATION");
    return `skykick.trim_step("${variation}")` + NEWLINE;
};

Blockly.Python.skykick_set_axis = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const quad = block.getFieldValue("QUAD");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.set_axis(${quad}, ${value})` + NEWLINE;
};

Blockly.Python.skykick_move_axis = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const quad = block.getFieldValue("QUAD");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || 0;
    const delay = Blockly.Python.valueToCode(block, "DELAY", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.move_axis(${quad}, ${value}, ${delay})` + NEWLINE;
};

Blockly.Python.skykick_set_quad = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const roll = Blockly.Python.valueToCode(block, "ROLL", Blockly.Python.ORDER_NONE) || 0;
    const pitch = Blockly.Python.valueToCode(block, "PITCH", Blockly.Python.ORDER_NONE) || 0;
    const yaw = Blockly.Python.valueToCode(block, "YAW", Blockly.Python.ORDER_NONE) || 0;
    const throttle = Blockly.Python.valueToCode(block, "THROTTLE", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.set_quad(${roll}, ${pitch}, ${yaw}, ${throttle})` + NEWLINE;
};

Blockly.Python.skykick_move_quad = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const roll = Blockly.Python.valueToCode(block, "ROLL", Blockly.Python.ORDER_NONE) || 0;
    const pitch = Blockly.Python.valueToCode(block, "PITCH", Blockly.Python.ORDER_NONE) || 0;
    const yaw = Blockly.Python.valueToCode(block, "YAW", Blockly.Python.ORDER_NONE) || 0;
    const throttle = Blockly.Python.valueToCode(block, "THROTTLE", Blockly.Python.ORDER_NONE) || 0;
    const delay = Blockly.Python.valueToCode(block, "DELAY", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.move_quad(${roll}, ${pitch}, ${yaw}, ${throttle}, ${delay})` + NEWLINE;
};

Blockly.Python.skykick_go = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const direction = block.getFieldValue("DIRECTION");
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || 0;
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.go("${direction}", ${distance}, ${speed})` + NEWLINE;
};

Blockly.Python.skykick_turn = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const directionyaw = block.getFieldValue("DIRECTIONYAW");
    const degreeyaw = Blockly.Python.valueToCode(block, "DEGREEYAW", Blockly.Python.ORDER_NONE) || 0;
    const speedyaw = Blockly.Python.valueToCode(block, "SPEEDYAW", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.turn("${directionyaw}", ${degreeyaw}, ${speedyaw})` + NEWLINE;
};

Blockly.Python.skykick_go_xyz = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const directionpitch = block.getFieldValue("DIRECTIONPITCH");
    const distancepitch = Blockly.Python.valueToCode(block, "DISTANCEPITCH", Blockly.Python.ORDER_NONE) || 0;
    const directionroll = block.getFieldValue("DIRECTIONROLL");
    const distanceroll = Blockly.Python.valueToCode(block, "DISTANCEROLL", Blockly.Python.ORDER_NONE) || 0;
    const directionthrottle = block.getFieldValue("DIRECTIONTHROTTLE");
    const distancethrottle = Blockly.Python.valueToCode(block, "DISTANCETHROTTLE", Blockly.Python.ORDER_NONE) || 0;
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.go_xyz("${directionpitch}", ${distancepitch}, "${directionroll}", ${distanceroll}, "${directionthrottle}", ${distancethrottle}, ${speed})` + NEWLINE;
};

Blockly.Python.skykick_go_xyz_turn = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const directionpitch = block.getFieldValue("DIRECTIONPITCH");
    const distancepitch = Blockly.Python.valueToCode(block, "DISTANCEPITCH", Blockly.Python.ORDER_NONE) || 0;
    const directionroll = block.getFieldValue("DIRECTIONROLL");
    const distanceroll = Blockly.Python.valueToCode(block, "DISTANCEROLL", Blockly.Python.ORDER_NONE) || 0;
    const directionthrottle = block.getFieldValue("DIRECTIONTHROTTLE");
    const distancethrottle = Blockly.Python.valueToCode(block, "DISTANCETHROTTLE", Blockly.Python.ORDER_NONE) || 0;
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0;
    const directionyaw = block.getFieldValue("DIRECTIONYAW");
    const degreeyaw = Blockly.Python.valueToCode(block, "DEGREEYAW", Blockly.Python.ORDER_NONE) || 0;
    const speedyaw = Blockly.Python.valueToCode(block, "SPEEDYAW", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.go_xyz_turn("${directionpitch}", ${distancepitch}, "${directionroll}", ${distanceroll}, "${directionthrottle}", ${distancethrottle}, ${speed}, "${directionyaw}", ${degreeyaw}, ${speedyaw})` + NEWLINE;
};

Blockly.Python.skykick_led_off = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    return `skykick.led_off()` + NEWLINE;
};

Blockly.Python.skykick_led_rgb = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || 0;
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || 0;
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || 0;
    const mode = block.getFieldValue("MODE");
    const interval = Blockly.Python.valueToCode(block, "INTERVAL", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.led_rgb(${r}, ${g}, ${b}, ${mode}, ${interval})` + NEWLINE;
};

Blockly.Python.skykick_led_color = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const color = block.getFieldValue("COLOR");
    const mode = block.getFieldValue("MODE");
    const interval = Blockly.Python.valueToCode(block, "INTERVAL", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.led_color("${color}", ${mode}, ${interval})` + NEWLINE;
};

Blockly.Python.skykick_led_preset = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const color = block.getFieldValue("COLOR");
    const brightness = block.getFieldValue("BRIGHTNESS");
    return `skykick.led_preset("${color}", ${brightness})` + NEWLINE;
};

Blockly.Python.skykick_buzzer_stop = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    return `skykick.buzzer_stop()` + NEWLINE;
};

Blockly.Python.skykick_play_note = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const octave = block.getFieldValue("OCTAVE");
    const note = block.getFieldValue("NOTE");
    const delay = Blockly.Python.valueToCode(block, "DELAY", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.play_note(${octave}, "${note}", ${delay})` + NEWLINE;
};

Blockly.Python.skykick_play_hz = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const hertz = Blockly.Python.valueToCode(block, "HERTZ", Blockly.Python.ORDER_NONE) || 0;
    const delay = Blockly.Python.valueToCode(block, "DELAY", Blockly.Python.ORDER_NONE) || 0;
    return `skykick.play_hz(${hertz}, ${delay})` + NEWLINE;
};

Blockly.Python.skykick_attitude = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const attitude = block.getFieldValue("ATTITUDE");
    return [`skykick.attitude("${attitude}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.skykick_sensor = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const sensor = block.getFieldValue("SENSOR");
    return [`skykick.sensor("${sensor}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.skykick_height = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const sensor = block.getFieldValue("SENSOR");
    return [`skykick.height("${sensor}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.skykick_position = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const position = block.getFieldValue("POSITION");
    return [`skykick.position("${position}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.skykick_state = function (block) {
    Blockly.Python.addImport('skykick', IMPORT_SKYKICK);
    const value = block.getFieldValue("VALUE");
    return [`skykick.state("${value}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

