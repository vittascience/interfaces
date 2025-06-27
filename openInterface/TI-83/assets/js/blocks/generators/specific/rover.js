/**
 * @fileoverview Rover generators for TI-83 Premium CE.
 */

// Rover - Drive

Blockly.Python.robots_rover_setGo = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    const unit = Blockly.Python.valueToCode(block, "UNIT", Blockly.Python.ORDER_NONE) || "0";
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("DIR")) {
        case "FORWARD":
            return "rv.forward(" + unit + ", 'units', " + speed + ")" + NEWLINE;
        case "BACKWARD":
            return "rv.backward(" + unit + ", 'units', " + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_rover_setGoTime = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    const unit = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("DIR")) {
        case "FORWARD":
            return "rv.forward_time(" + unit + ", " + speed + ")" + NEWLINE;
        case "BACKWARD":
            return "rv.backward_time(" + unit + ", " + speed + ")" + NEWLINE;
    }
};

Blockly.Python.robots_rover_turnTo = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    switch (block.getFieldValue("DIRECTION")) {
        case "LEFT":
            return "rv.left(" + angle + ")" + NEWLINE;
        case "RIGHT":
            return "rv.right(" + angle + ")" + NEWLINE;
    }
};

Blockly.Python.robots_rover_controlMotor = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    let speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    if (speed > 255) speed = 255;
    if (speed < 0) speed = 0;
    let dir = "";
    let motor = "";
    switch (block.getFieldValue("MOTOR")) {
        case "RIGHT":
            motor = "right";
            if (block.getFieldValue("DIR") == "ANTICLOCKWISE") {
                dir = "-";
            }
            break;
        case "LEFT":
            motor = "left";
            if (block.getFieldValue("DIR") == "CLOCKWISE") {
                dir = "-";
            }
            break;
    }
    return "rv.motor_" + motor + "(" + dir + speed + ", " + duration + ")" + NEWLINE;
};

Blockly.Python.robots_rover_moveToXY = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    return "rv.to_xy(" + x + ", " + y + ")" + NEWLINE;
};

Blockly.Python.robots_rover_moveToPolar = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const theta = Blockly.Python.valueToCode(block, "THETA", Blockly.Python.ORDER_NONE) || "0";
    return "rv.to_polar(" + r + ", " + theta + ")" + NEWLINE;
};

Blockly.Python.robots_rover_stop = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.stop()" + NEWLINE;
};

Blockly.Python.robots_rover_resume = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.resume()" + NEWLINE;
};

Blockly.Python.robots_rover_stay = function (block) {
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.stay(" + duration + ")" + NEWLINE
};

// Rover - Inputs

Blockly.Python.robots_rover_getUltrasonicRange = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return ["rv.ranger_measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_rover_getColorLevel = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return ["rv." + block.getFieldValue("COLOR") + "_measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_rover_getColor = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return ["rv.color_measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_rover_getAngularSpeed = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return ["rv.gyro_measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_rover_getRobotAngle = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return ["rv.encoders_gyro_measurement()[2]", Blockly.Python.ORDER_ATOMIC];
};

// Rover - Outputs

Blockly.Python.robots_rover_setLEDRGB = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    var r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    var g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    var b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "rv.color_rgb(" + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.robots_rover_setLEDRGBPalette = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    let colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    let colourList = colour.match(/([0-9]{1,3})/g);
    return "rv.color_rgb(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.robots_rover_blinkLEDRGB = function (block) {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    const frequency = Blockly.Python.valueToCode(block, "FREQ", Blockly.Python.ORDER_NONE);
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE);
    return "rv.color_blink(" + frequency + ", " + duration + ")" + NEWLINE;
};

Blockly.Python.robots_rover_stopLEDRGB = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.color_off()" + NEWLINE;
};
