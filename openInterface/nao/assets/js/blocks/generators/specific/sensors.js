/**
 * @fileoverview Sensors generators for Nao.
 */

Blockly.Python.sensors_tactilTouched = function (block) {
    Blockly.Python.addImport('sensors_service', IMPORT_SENSORS_SERVICE);
    const sensorSide = block.getFieldValue("SENSOR_SIDE");
    return [`sensors_service.${sensorSide}TactilTouched()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_handTouched = function (block) {
    Blockly.Python.addImport('sensors_service', IMPORT_SENSORS_SERVICE);
    const sensorSide = block.getFieldValue("SENSOR_SIDE");
    const handSide = block.getFieldValue("HAND_SIDE");
    return [`sensors_service.Hand${handSide}${sensorSide}Touched()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_bumperPressed = function (block) {
    Blockly.Python.addImport('sensors_service', IMPORT_SENSORS_SERVICE);
    const sensorSide = block.getFieldValue("SENSOR_SIDE");
    return [`sensors_service.${sensorSide}BumperPressed()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_sonarDetection = function (block) {
    Blockly.Python.addImport('sonar_service', IMPORT_SONAR_SERVICE);
    const sensorSide = block.getFieldValue("SENSOR_SIDE");
    const isDetected = block.getFieldValue("IS_DETECTED");
    return [`sonar_service.Sonar${sensorSide}${isDetected}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getBatteryCharge = function () {
    Blockly.Python.addImport('sensors_service', IMPORT_SENSORS_SERVICE);
    return [`sensors_service.getBatteryCharge()`, Blockly.Python.ORDER_ATOMIC];
};
