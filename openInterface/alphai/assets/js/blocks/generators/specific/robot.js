/**
 * @fileoverview Robot generators for AlphAI.
 */

// Communication

Blockly.Python.robot_printMessage = function (block) {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    const message = Blockly.Python.valueToCode(block, "MESSAGE", Blockly.Python.ORDER_NONE) || "''";
    return "print_message(" + message + ")" + NEWLINE;
};

// Actuators

Blockly.Python.robot_setDirection = function (block) {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    const direction = block.getFieldValue("DIRECTION");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "";
    switch (direction) {
        case "forward":
            return `set_motor(${speed}, ${speed}${duration ? `, ${duration}` : ""})` + NEWLINE;
        case "backward":
            return `set_motor(-${speed}, -${speed}${duration ? `, ${duration}` : ""})` + NEWLINE;
        case "left":
            return `set_motor(-${speed}, ${speed}${duration ? `, ${duration}` : ""})` + NEWLINE;
        case "right":
            return `set_motor(${speed}, -${speed}${duration ? `, ${duration}` : ""})` + NEWLINE;
    }
};

Blockly.Python.robot_setMotor = function (block) {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    const speedLeft = Blockly.Python.valueToCode(block, "MOTOR_LEFT", Blockly.Python.ORDER_NONE) || "0";
    const speedRight = Blockly.Python.valueToCode(block, "MOTOR_RIGHT", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "";
    return `set_motor(${speedLeft}, ${speedRight}${duration ? `, ${duration}` : ""})` + NEWLINE;
};

Blockly.Python.robot_stop = function () {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    return "stop()" + NEWLINE;
};

Blockly.Python.robot_setBuzzer = function (block) {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    Blockly.Python.addImport('time', IMPORT_TIME);
    const state = block.getFieldValue("STATE");
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "";
    if (duration) {
        return "set_buzzer(True)" + NEWLINE + "time.sleep(" + duration + ")" + NEWLINE + "set_buzzer(False)" + NEWLINE;
    }
    return "set_buzzer(" + state + ")" + NEWLINE;
};

// Sensors

Blockly.Python.robot_isBlocked = function () {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    return ["get_blockade()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robot_getDistance = function () {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    return ["get_distance()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robot_getInfraRed = function (block) {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    const sensor = block.getFieldValue("SENSOR");
    switch (sensor) {
        case "ALL":
            return ["get_infra_red()", Blockly.Python.ORDER_ATOMIC];
        default:
            return [`get_infra_red()[${sensor}]`, Blockly.Python.ORDER_ATOMIC];
    }
};

// Camera

Blockly.Python.robot_setCamera = function (block) {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    const resolution = block.getFieldValue("RESOLUTION");
    return "set_camera('" + resolution + "')" + NEWLINE;
};

Blockly.Python.robot_getCamera = function () {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    return ["get_camera()", Blockly.Python.ORDER_ATOMIC];
};

// Display

Blockly.Python.robot_setLedsRGB = function (block) {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return `set_leds(${r}, ${g}, ${b})` + NEWLINE;
};

Blockly.Python.robot_setLedsPalette = function (block) {
    Blockly.Python.addImport('alphai', IMPORT_ALPHAI);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    return "set_leds(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};