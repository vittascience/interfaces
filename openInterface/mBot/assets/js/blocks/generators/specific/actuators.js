/**
 * @fileoverview Actuators generators for mBot.
 */

// MBOT - GO FORWARD/REVERSE
Blockly.Arduino.robots_setmBotGo = function (block) {
    Blockly.Arduino.addFunction('mBot_setMotorLeft', FUNCTIONS_MBOT.DEF_MBOT_SET_MOTOR_LEFT);
    Blockly.Arduino.addFunction('mBot_setMotorRight', FUNCTIONS_MBOT.DEF_MBOT_SET_MOTOR_RIGHT);
    Blockly.Arduino.addDeclaration('motor_L', "MeDCMotor motor_L(9);");
    Blockly.Arduino.addDeclaration('motor_R', "MeDCMotor motor_R(10);");
    const speed = Blockly.Arduino.valueToCode(block, "SPEED", Blockly.Arduino.ORDER_NONE) || 0;
    const dir = block.getFieldValue("DIR");
    return "mBot_setMotorRight(" + dir + ", " + speed + ");" + NEWLINE 
        + "mBot_setMotorLeft(" + dir + ", " + speed + ");" + NEWLINE;
};

// MBOT - CONTROL MOTOR SPEED
Blockly.Arduino.robots_controlmBotMotor = function (block) {
    const speed = Blockly.Arduino.valueToCode(block, "SPEED", Blockly.Arduino.ORDER_NONE) || 0;
    const dir = block.getFieldValue("DIR");
    Blockly.Arduino.addFunction('mBot_setMotorLeft', FUNCTIONS_MBOT.DEF_MBOT_SET_MOTOR_LEFT);
    Blockly.Arduino.addFunction('mBot_setMotorRight', FUNCTIONS_MBOT.DEF_MBOT_SET_MOTOR_RIGHT);
    Blockly.Arduino.addDeclaration('motor_L', "MeDCMotor motor_L(9);");
    Blockly.Arduino.addDeclaration('motor_R', "MeDCMotor motor_R(10);");
    switch (block.getFieldValue("MOTOR")) {
        case "right":
            return "mBot_setMotorRight(" + dir + ", " + speed + ");" + NEWLINE;
        case "left":
            return "mBot_setMotorLeft(" + dir + ", " + speed + ");" + NEWLINE;
    }
};

// MBOT - STOP MOTORS
Blockly.Arduino.robots_stopmBotMotors = function (block) {
    Blockly.Arduino.addFunction('mBot_setMotorLeft', FUNCTIONS_MBOT.DEF_MBOT_SET_MOTOR_LEFT);
    Blockly.Arduino.addFunction('mBot_setMotorRight', FUNCTIONS_MBOT.DEF_MBOT_SET_MOTOR_RIGHT);
    Blockly.Arduino.addDeclaration('motor_L', "MeDCMotor motor_L(9);");
    Blockly.Arduino.addDeclaration('motor_R', "MeDCMotor motor_R(10);");
    if (block.getFieldValue('MOTOR') == "all") {
        return "mBot_setMotorRight(0, 0);" + NEWLINE + "mBot_setMotorLeft(0, 0);" + NEWLINE;
    } else {
        switch (block.getFieldValue("MOTOR")) {
            case "right":
                return "mBot_setMotorRight(0, 0);" + NEWLINE
            case "left":
                return "mBot_setMotorLeft(0, 0);" + NEWLINE
        }
    }
};

// MAKEBLOCK _ SET SERVO ANGLE
Blockly.Arduino.robots_makeBlock_setServoAngle = function (block) {
    const slot = block.getFieldValue("SLOT");
    const port = block.getFieldValue("PORT");
    const portNum = port.substr(port.length - 1);
    const objName = "servo_" + portNum + "_" + slot;
    const value = Blockly.Arduino.valueToCode(block, "ANGLE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.addInclude('servo', INCLUDE_SERVO);
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Servo on " + port + " SLOT_" + slot);
    Blockly.Arduino.addDeclaration(objName, "Servo " + objName + ";");
    Blockly.Arduino.addDeclaration(objName + '-port', "MePort port_" + portNum + "(" + port + ");");
    Blockly.Arduino.addSetup(objName, objName + ".attach(port_" + portNum + ".pin" + slot + "());");
    return objName + ".write(" + value + ");" + NEWLINE;
};

// MAKEBLOCK _ CONTROL MINI FAN
Blockly.Arduino.robots_makeBlock_controlMiniFan = function (block) {
    const port = block.getFieldValue("PORT");
    Blockly.Arduino.addDeclaration(port, "MePort miniFan(" + port + ");");
    Blockly.Arduino.addFunction('miniFan_run', FUNCTIONS_MBOT.DEF_MAKEBLOCK_RUN_MINI_FAN);
    return "miniFan_run(" + port + ", " + block.getFieldValue("DIR") + ");" + NEWLINE;
};