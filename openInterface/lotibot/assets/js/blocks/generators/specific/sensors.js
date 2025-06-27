/**
 * @fileoverview Sensors generators for Loti-bot.
 */

Blockly.Python.sensors_isStopped = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.isStopped()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_isMoving = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`not lotibot.isStopped()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_isCollisionDetected = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.isCollisionDetected()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_isFallDetected = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.isFallDetected()`, Blockly.Python.ORDER_ATOMIC];
};

//TO DO
Blockly.Python.sensors_isSpeakerWorking = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.isSpeakerWorking()`, Blockly.Python.ORDER_ATOMIC];
};

//TO DO
Blockly.Python.sensors_isHeadlightsWorking = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.isHeadlightsWorking()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getHeading = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.getHeading()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getDistance = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.getDistance()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getLightLevel = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.getLightLevel()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getSoundLevel = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.getSoundLevel()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getTemperature = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.getTemperature()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getBatteryLevel = function () {
    Blockly.Python.addImport('lotibot', IMPORT_LOTIBOT);
    Blockly.Python.addInit('lotibot_init', 'lotibot = lotibot()');
    return [`lotibot.getBatteryLevel()`, Blockly.Python.ORDER_ATOMIC];
};