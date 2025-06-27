/**
 * @fileoverview Inputs/Outputs generators for mBot.
 */

Blockly.Arduino.io_wait = function (block) {
    const wait = Blockly.Arduino.valueToCode(block, "TIME", Blockly.Arduino.ORDER_ATOMIC);
    const unit = block.getFieldValue("UNIT");
    switch (unit) {
        case "SECOND":
            return "delay(1000*" + wait + ");" + NEWLINE;
        case "MILLI":
            return "delay(" + wait + ");" + NEWLINE;
        case "MICRO":
            return "delayMicroseconds(" + wait + ");" + NEWLINE;
        default:
            throw Error("Unhandled delay option: " + unit);
    }
};

Blockly.Arduino.io_waitUntil = function (block) {
    const condition = Blockly.Arduino.valueToCode(block, "UNTIL", Blockly.Arduino.ORDER_ATOMIC);
    return "while (!" + condition + " ) {}" + NEWLINE;
};

Blockly.Arduino.io_initChronometer = function (block) {
    Blockly.Arduino.addDeclaration('declaration_init_chrono', "float t0 = 0;");
    block.workspace.createVariable('t0');
    return "t0 = millis();" + NEWLINE;
};

Blockly.Arduino.io_getChronometer = function (block) {
    Blockly.Arduino.addDeclaration('declaration_init_chrono', "float t0 = 0;");
    return ["(millis()-t0)/" + block.getFieldValue("UNIT"), Blockly.Arduino.ORDER_ATOMIC]
};

// External modules

// MAKEBLOCK - GET SWITCH STATE
Blockly.Arduino.robots_makeBlock_getSwitchState = function (block) {
    const port = block.getFieldValue("PORT");
    const slot = block.getFieldValue("SLOT");
    Blockly.Arduino.addDeclaration('init_makeBlock_switch_' + slot, "MeLimitSwitch switch_" + slot + "(" + port + ", " + slot + ");");
    return ["switch_" + slot + ".touched()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - GET JOYSTICK AXIS VALUE
Blockly.Arduino.robots_makeBlock_getJoystickAxis = function (block) {
    const port = block.getFieldValue("PORT");
    Blockly.Arduino.addDeclaration('init_makeBlock_joystick', "MeJoystick joystick{" + port + "};");
    switch(block.getFieldValue("AXIS")) {
        case "X":
            return ["joystick.readX()", Blockly.Arduino.ORDER_ATOMIC]
        case "Y":
            return ["joystick.readY()", Blockly.Arduino.ORDER_ATOMIC]
    }
};

// MAKEBLOCK - GET POTENTIOMETER VALUE
Blockly.Arduino.robots_makeBlock_getPotentiometer = function (block) {
    const port = block.getFieldValue("PORT");
    Blockly.Arduino.addDeclaration('init_makeBlock_potentiometer', "MePotentiometer potentiometer{" + port + "};");
    return ["potentiometer.read()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - GET 4 BUTTONS PRESSED
Blockly.Arduino.robots_makeBlock_getPressedButton = function (block) {
    const port = block.getFieldValue("PORT");
    Blockly.Arduino.addDeclaration('init_makeBlock_4buttons', "Me4Button buttons{" + port + "};");
    return ["buttons.pressed()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - GET STATE TOUCH SENSOR
Blockly.Arduino.robots_makeBlock_getTouchSensorState = function (block) {
    const port = block.getFieldValue("PORT");
    Blockly.Arduino.addDeclaration('init_makeBlock_touch', "MeTouchSensor touchButton{" + port + "};");
    return ["touchButton.touched()", Blockly.Arduino.ORDER_ATOMIC]
};

// Pins

Blockly.Arduino.io_digital_signal = function (block) {
    return [block.getFieldValue("STATE"), Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_readDigitalPin = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', INPUT);');
    return ["digitalRead(" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_writeDigitalPin = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return "digitalWrite(" + pin + ", " + state + ");" + NEWLINE;
};

Blockly.Arduino.io_readAnalogPin = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', INPUT);');
    return ["analogRead(" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.io_writeAnalogPin = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return "analogWrite(" + pin + ", " + value + ");" + NEWLINE;
};

Blockly.Arduino.io_setPwm = function (block) {
    const pin = block.getFieldValue("PIN");
    const cycle = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC) || '0';
    const value = Math.round(cycle * 255 / 100);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', OUTPUT);');
    return "analogWrite(" + pin + ", " + value + ");" + NEWLINE;
};

Blockly.Arduino.io_readPulseIn = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'HIGH';
    return ["pulseIn(" + pin + ", " + state + ")", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.io_attachInterrupt = function (block) {
    const pin = block.getFieldValue("PIN");
    const edge = block.getFieldValue("EDGE");
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    const funcName = "onEvent_pin" + pin;
    Blockly.Arduino.addFunction(funcName, "void " + funcName + "() {" + NEWLINE + branchCode + "}");
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(' + pin + ', INPUT_PULLUP);');
    Blockly.Arduino.addSetup('interrupt_' + pin, "attachInterrupt(digitalPinToInterrupt(" + pin + "), " + funcName + ", " + edge + ");");
    return "";
};