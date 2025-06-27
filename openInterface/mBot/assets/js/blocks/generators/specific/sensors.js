/**
 * @fileoverview Sensors generators for mBot.
 */

// MAKEBLOCK - GET ULTRASONIC RANGER
Blockly.Arduino.robots_makeBlock_getUltrasonicRanger = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = 'ultrasonic_' + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Ultrasonic on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeUltrasonicSensor " + objName + "(" + port + ");");
    return [objName + ".distance" + block.getFieldValue("UNIT") + "()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - GET LINE FINDER STATE
Blockly.Arduino.robots_makeBlock_getLineState = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = 'lineFinder_' + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Line Finder on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeLineFollower " + objName + "(" + port + ");");
    return ["!" + objName + ".read" + block.getFieldValue("SENSOR") + "()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - GET PIR MOTION STATE
Blockly.Arduino.robots_makeBlock_getPIRMotionState = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = 'PIRSensor_' + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Motion Sensor on " + port);
    Blockly.Arduino.addDeclaration(objName, "MePIRMotionSensor " + objName + "(" + port + ");");
    return [objName + ".isHumanDetected()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - READ COMPAS
Blockly.Arduino.robots_makeBlock_getCompassData = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = 'compass_' + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Compass on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeCompass " + objName + "(" + port + ");");
    switch(block.getFieldValue("AXIS")) {
        case "X": 
            return [objName + ".getHeadingX()", Blockly.Arduino.ORDER_ATOMIC]
        case "Y": 
            return [objName + ".getHeadingY()", Blockly.Arduino.ORDER_ATOMIC]
        case "Z": 
            return [objName + ".getHeadingZ()", Blockly.Arduino.ORDER_ATOMIC]
        case "ANGLE": 
            return [objName + ".getAngle()", Blockly.Arduino.ORDER_ATOMIC]
    }
};

// MAKEBLOCK - GET LIGHT
Blockly.Arduino.robots_makeBlock_getLight = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = 'lightSensor_' + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Light Sensor on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeLightSensor " + objName + "(" + port + ");");
    return [objName + ".read()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - READ COLOR
Blockly.Arduino.robots_makeBlock_getColor = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = 'colorSensor_' + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Color Sensor on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeColorSensor " + objName + "(" + port + ");");
    Blockly.Arduino.addSetup(objName, objName + ".SensorInit();");
    if (block.getFieldValue("DATA") == "0") {
        return [objName + ".Returnresult()", Blockly.Arduino.ORDER_ATOMIC]
    } else {
        Blockly.Arduino.addFunction('colorSensor_getData', FUNCTIONS_MBOT.DEF_MAKEBLOCK_COLOR_SENSOR_GET_COLOR);
        return ["colorSensor_getData(&" + objName + ", " + block.getFieldValue("DATA") + ")", Blockly.Arduino.ORDER_ATOMIC]
    }
};

// MAKEBLOCK - GET SOUND
Blockly.Arduino.robots_makeBlock_getSound = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = 'soundSensor_' + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Sound Sensor on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeSoundSensor " + objName + "(" + port + ");");
    return [objName + ".strength()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - READ GAS INFORMATION
Blockly.Arduino.robots_makeBlock_MQ2_getGas = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = 'gasSensor_' + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// MQ2 Sensor on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeGasSensor " + objName + "(" + port + ");");
    return [objName + ".read" + block.getFieldValue("TYPE") + "()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - READ FLAME INFORMATION
Blockly.Arduino.robots_makeBlock_getFlame = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = 'flameSensor_' + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Flame Sensor on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeFlameSensor " + objName + "(" + port + ");");
    return [objName + ".read" + block.getFieldValue("TYPE") + "()", Blockly.Arduino.ORDER_ATOMIC]
};

// MAKEBLOCK - GET WATERPROOF TEMPERATURE
Blockly.Arduino.robots_makeBlock_getWaterproofTemperature = function (block) {
    const port = block.getFieldValue("PORT");
    const slot = block.getFieldValue("SLOT");
    const objName = 'ds18b20Sensor_' + port.replace('PORT_', '') + '_' + slot;
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Waterproof Sensor on " + port + ' SLOT_' + slot);
    Blockly.Arduino.addDeclaration(objName, "MeTemperature " + objName + "(" + port + ", " + slot + ");");
    return [objName + ".temperature()", Blockly.Arduino.ORDER_ATOMIC]
};