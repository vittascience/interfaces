/**
 * @fileoverview MatataCon controller generators for Matatalab.
 */

Blockly.Python.matatacon_isButton = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const button = block.getFieldValue("BUTTON");
    return [`matatalab.is_button("${button}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_isGesture = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const gesture = block.getFieldValue("GESTURE");
    return [`matatalab.is_gesture("${gesture}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_isColor = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const color = block.getFieldValue("COLOR");
    return [`matatalab.is_color("${color}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_isSound = function () {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    return [`matatalab.is_sound()`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_isObstacle = function () {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    return [`matatalab.is_obstacle()`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_isLight = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const state = block.getFieldValue("STATE");
    return [`matatalab.is_light("${state}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_getBrightness = function () {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    return [`matatalab.get_brightness()`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_getColor = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const channel = block.getFieldValue("CHANNEL");
    return [`matatalab.get_color("${channel}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_getAngle = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const angle = block.getFieldValue("ANGLE");
    return [`matatalab.get_angle("${angle}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_getAcceleration = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const axis = block.getFieldValue("AXIS");
    return [`matatalab.get_acceleration("${axis}")`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_getShaking = function () {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    return [`matatalab.get_shaking()`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_setRingColor = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const color = block.getFieldValue("COLOR");
    const level = Blockly.Python.valueToCode(block, "LEVEL", Blockly.Python.ORDER_NONE) || "6";
    return `matatalab.set_ring_color(${led}, "${color}", ${level})` + NEWLINE;
};

Blockly.Python.matatacon_setRing = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0, 0, 0)";
    return `matatalab.set_ring(${led}, ${color})` + NEWLINE;
};

Blockly.Python.matatacon_setRingLeds = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const leds = Array.from({ length: 12 }, (_, i) => `"${block.getFieldValue("LED" + (i + 1))}"`);
    return `matatalab.set_ring_leds([${leds.join(", ")}])` + NEWLINE;
};

Blockly.Python.matatacon_ringAnimation = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const animation = block.getFieldValue("ANIMATION");
    return `matatalab.ring_animation("${animation}")` + NEWLINE;
};

Blockly.Python.matatacon_clearRing = function () {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    return `matatalab.ring_off()` + NEWLINE;
};

Blockly.Python.matatacon_sendMessage = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const message = Blockly.Python.valueToCode(block, "MESSAGE", Blockly.Python.ORDER_NONE) || "1";
    return `matatalab.send_message(${message})` + NEWLINE;
};

Blockly.Python.matatacon_isMessage = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const message = Blockly.Python.valueToCode(block, "MESSAGE", Blockly.Python.ORDER_NONE) || "1";
    return [`matatalab.is_message(${message})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.matatacon_getMessage = function () {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    return [`matatalab.get_message()`, Blockly.Python.ORDER_FUNCTION_CALL];
};
