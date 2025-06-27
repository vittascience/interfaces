/**
 * @fileoverview Robots generators for CyberPi.
 */

// mbot2 - motors

Blockly.Python.robots_mbot2_move = function (block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const direction = block.getFieldValue("DIR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "";
    return "mbot2." + direction + "(" + speed + (duration ? "," + duration : "") + ")" + NEWLINE;
};

Blockly.Python.robots_mbot2_move_by = function (block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const direction = block.getFieldValue("DIR") == "-1" ? "-" : "";
    let distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "0";
    const distanceBlockType = block.getInput("DISTANCE").connection.targetBlock().type;
    const unit = block.getFieldValue("UNIT");
    if (distanceBlockType == 'math_arithmetic' && (direction == "-" || unit == "INCHS")) distance = "(" + distance + ")";
    switch (unit) {
        case "INCHS":
            return "mbot2.straight(" + direction + distance + " * 2.54)" + NEWLINE;
        case "CM":
        default:
            return "mbot2.straight(" + direction + distance + ")" + NEWLINE;
    }
};

Blockly.Python.robots_mbot2_turn = function (block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const direction = block.getFieldValue("DIR") == "-1" ? "-" : "";
    let angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const angleBlockType = block.getInput("ANGLE").connection.targetBlock().type;
    if (angleBlockType == 'math_arithmetic' && direction == "-") angle = "(" + angle + ")";
    return "mbot2.turn(" + direction + angle + ")" + NEWLINE;
};

Blockly.Python.robots_mbot2_control_motor = function (block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const motor = block.getFieldValue("MOTOR");
    let direction = block.getFieldValue("DIR");
    if (motor == 'EM2') {
        direction = direction == '-1' ? '1' : '-1';
    }
    direction = direction == "-1" ? "-" : "";
    let value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const valueBlockType = block.getInput("VALUE").connection.targetBlock().type;
    const unit = block.getFieldValue("UNIT");
    if (valueBlockType == 'math_arithmetic' && direction == "-") value = "(" + value + ")";
    switch (unit) {
        case "SPEED":
            return "mbot2.EM_set_speed(" + direction + value + ", \'" + motor + "\')" + NEWLINE;
        case "POWER":
            return "mbot2.EM_set_power(" + direction + value + ", \'" + motor + "\')" + NEWLINE;
        default:
            throw Error("Unhandled option (robots_mbot2_control_motor)");
    }
};

Blockly.Python.robots_mbot2_turn_motor = function (block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    Blockly.Python.addImport('math', IMPORT_MATH);
    const motor = block.getFieldValue("MOTOR");
    const direction = block.getFieldValue("DIR") == "-1" ? "-" : "";
    let angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const angleBlockType = block.getInput("SPEED").connection.targetBlock().type;
    if (angleBlockType == 'math_arithmetic' && direction == "-") angle = "(" + angle + ")";
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    return "mbot2.EM_turn(" + direction + angle + ", math.fabs(" + speed + "), \'" + motor + "\')" + NEWLINE;
};

Blockly.Python.robots_mbot2_stop_motor = function (block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const motor = block.getFieldValue("MOTOR");
    return "mbot2.EM_stop(\'" + motor + "\')" + NEWLINE;
};

Blockly.Python.robots_mbot2_get_motor_encoding = function (block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const motor = block.getFieldValue("MOTOR");
    const type = block.getFieldValue("TYPE")
    switch (type) {
        case "SPEED":
            return ["mbot2.EM_get_speed(\'" + motor + "\')", Blockly.Python.ORDER_ATOMIC];
        case "POWER":
            return ["mbot2.EM_get_power(\'" + motor + "\')", Blockly.Python.ORDER_ATOMIC];
        case "ANGLE":
            return ["mbot2.EM_get_angle(\'" + motor + "\')", Blockly.Python.ORDER_ATOMIC]
        default:
            throw Error("Unhandled option (robots_mbot2_get_motor_encoding)");
    }
};

Blockly.Python.robots_mbot2_reset_motor_angular_position = function (block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const motor = block.getFieldValue("MOTOR");
    return "mbot2.EM_reset_angle(\'" + motor + "\')" + NEWLINE;
};

Blockly.Python.robots_mbot2_control_motor_locking = function (block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const motor = block.getFieldValue("MOTOR");
    const state = block.getFieldValue("STATE");
    return "mbot2.EM_lock(" + state + ", \'" + motor + "\')" + NEWLINE;
};

// Ultrasonic sensors

Blockly.Python.robots_mbot2_ultrasonic_getDistance = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('ultrasonic-port' + sensor, "# Ultrasonic on PORT_" + sensor);
    return ["mbuild.ultrasonic2.get(" + sensor + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_mbot2_ultrasonic_setBrightness = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    const brightness = Blockly.Python.valueToCode(block, "BRIGHTNESS", Blockly.Python.ORDER_NONE) || "0";
    return "mbuild.ultrasonic2.set_bri(" + brightness + ", " + id + ", " + sensor + ")" + NEWLINE;
};

Blockly.Python.robots_mbot2_ultrasonic_getBrightness = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    return ["mbuild.ultrasonic2.get_bri(" + id + ", " + sensor + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_mbot2_ultrasonic_stopLED = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "0";
    return "mbuild.ultrasonic2.set_bri(0, " + id + ", " + sensor + ")" + NEWLINE;
};

Blockly.Python.robots_mbot2_ultrasonic_playLED = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    const emotion = block.getFieldValue("EMOTION");
    return "mbuild.ultrasonic2.play(\'" + emotion + "\', " + sensor + ")" + NEWLINE;
};

// Quad RGB sensors

Blockly.Python.sensors_mbuild_quad_RGB_detection_L1_R1_is = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const mode = block.getFieldValue("MODE");
    const result = block.getFieldValue("RESULT");
    return ["mbuild.quad_rgb_sensor.get_" + mode + "_sta(\'middle\', " + sensor + ") == " + result, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_mbuild_quad_RGB_get_detection_L1_R1 = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const mode = block.getFieldValue("MODE");
    return ["mbuild.quad_rgb_sensor.get_" + mode + "_sta(\'middle\', " + sensor + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_mbuild_quad_RGB_detection_is = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const mode = block.getFieldValue("MODE");
    const result = block.getFieldValue("RESULT");
    return ["mbuild.quad_rgb_sensor.get_" + mode + "_sta(\'all\', " + sensor + ") == " + result, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_mbuild_quad_RGB_get_detection = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const mode = block.getFieldValue("MODE");
    return ["mbuild.quad_rgb_sensor.get_" + mode + "_sta(\'all\', " + sensor + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_mbuild_quad_RGB_is_color_detected = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const probe = block.getFieldValue("PROBE");
    const mode = block.getFieldValue("MODE");
    if (mode == "background" || mode == "line") {
        return ["mbuild.quad_rgb_sensor.is_" + mode + "(\'" + probe + "\', " + sensor + ")", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["mbuild.quad_rgb_sensor.is_color(\'" + mode + "\', \'" + probe + "\', " + sensor + ")", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_mbuild_quad_RGB_get_probe_data = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const probe = block.getFieldValue("PROBE");
    const data = block.getFieldValue("DATA");
    return ["mbuild.quad_rgb_sensor.get_" + data + "(\'" + probe + "\', " + sensor + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_mbuild_quad_RGB_get_offset_track = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    return ["mbuild.quad_rgb_sensor.get_offset_track(" + sensor + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_mbuild_quad_RGB_define_color = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const color = block.getFieldValue("COLOR");
    return "mbuild.quad_rgb_sensor.set_led_color(\'" + color + "\', " + sensor + ")" + NEWLINE;
};

Blockly.Python.sensors_mbuild_quad_RGB_set_color_list = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const color = block.getFieldValue("COLOR");
    return "mbuild.quad_rgb_sensor.set_led(\'" + color + "\', " + sensor + ")" + NEWLINE;
};

Blockly.Python.sensors_mbuild_quad_RGB_set_color_RGB = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const red = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC) || "0";
    const green = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_ATOMIC) || "0";
    const blue = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_ATOMIC) || "0";
    if (block.getInput("TOLERANCE")) {
        const tolerance = Blockly.Python.valueToCode(block, "TOLERANCE", Blockly.Python.ORDER_ATOMIC) || "0";
        return "mbuild.quad_rgb_sensor.set_custom_color(" + red + ", " + green + ", " + blue + ", " + tolerance + ", " + sensor + ")" + NEWLINE;
    } else {
        return "mbuild.quad_rgb_sensor.set_custom_color(" + red + ", " + green + ", " + blue + ", 50, " + sensor + ")" + NEWLINE;
    }
};

Blockly.Python.sensors_mbuild_quad_RGB_set_color_palette = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    Blockly.Python.addPowerOn('quad_rgb_sensor' + sensor + '-simu', "# Line Finder on PORT_" + sensor);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    if (block.getInput("TOLERANCE")) {
        const tolerance = Blockly.Python.valueToCode(block, "TOLERANCE", Blockly.Python.ORDER_ATOMIC) || "0";
        return "mbuild.quad_rgb_sensor.set_custom_color(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ", " + tolerance + ", " + sensor + ")" + NEWLINE;
    } else {
        return "mbuild.quad_rgb_sensor.set_custom_color(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ", 50, " + sensor + ")" + NEWLINE;
    }
};

Blockly.Python.sensors_mbuild_quad_RGB_close_led = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    return "mbuild.quad_rgb_sensor.close_led(" + sensor + ")" + NEWLINE;
};

Blockly.Python.sensors_mbuild_quad_RGB_calibrate = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const sensor = block.getFieldValue("SENSOR");
    return "mbuild.quad_rgb_sensor.adjust(" + sensor + ")" + NEWLINE;
};

Blockly.Python.sensors_mbuild_quad_RGB_color_mode = function (block) {
    Blockly.Python.addImport('mbuild', IMPORT_MBUILD);
    const mode = block.getFieldValue("MODE");
    return "mbuild.quad_rgb_sensor.color_mode(\'" + mode + "\')" + NEWLINE;
};