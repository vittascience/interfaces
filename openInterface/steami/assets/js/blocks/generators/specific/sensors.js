/**
 * @fileoverview Sensors generators for STeaMi.
 */

// APDS9960 sensor

Blockly.Python.sensors_steami_apds9960_readData = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('apds9960', IMPORT_APDS9960);
    Blockly.Python.addInit('steami_apds9960', 'apds = APDS9960(machine.I2C(1))');
    const dataType = block.getFieldValue("DATA_TYPE");
    switch (dataType) {
        case "ambientLight":
            Blockly.Python.addInit('steami_apds9960_enableLightSensor', 'apds.enableLightSensor()');
            return ['apds.readAmbientLight()', Blockly.Python.ORDER_ATOMIC];
        case "proximity":
            Blockly.Python.addInit('steami_apds9960_setProximityIntLowThreshold', 'apds.setProximityIntLowThreshold(50)')
            Blockly.Python.addInit('steami_apds9960_enableProximitySensor', 'apds.enableProximitySensor()');
            return ['apds.readProximity()', Blockly.Python.ORDER_ATOMIC];
        case "gesture":
            Blockly.Python.addImport('apds9960_const', 'from apds9960.const import *');
            Blockly.Python.addInit('steami_apds9960_gesture_dirs', 'dirs = {APDS9960_DIR_NONE: "none", APDS9960_DIR_LEFT: "left", APDS9960_DIR_RIGHT: "right", APDS9960_DIR_UP: "up", APDS9960_DIR_DOWN: "down", APDS9960_DIR_NEAR: "near", APDS9960_DIR_FAR: "far"}');
            Blockly.Python.addInit('steami_apds9960_setProximityIntLowThreshold', 'apds.setProximityIntLowThreshold(50)')
            Blockly.Python.addInit('steami_apds9960_enableGestureSensor', 'apds.enableGestureSensor()');
            return ['dirs.get(apds.readGesture(), "unknown")', Blockly.Python.ORDER_ATOMIC];
    }
};

// HTS221 sensor

Blockly.Python.sensors_steami_hts221_readData = function (block) {
    const dataType = block.getFieldValue("DATA_TYPE");
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('hts221', IMPORT_HTS221);
    Blockly.Python.addInit('steami_hts221', 'hts = HTS221.HTS221(machine.I2C(1))');
    return [`hts.${dataType}()`, Blockly.Python.ORDER_ATOMIC];
};

// VL53L1X sensor

Blockly.Python.sensors_steami_vl53l1x_read = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('vl53l1x', IMPORT_VL53L1X);
    Blockly.Python.addInit('steami_vl53l1x', 'vl53l1x = VL53L1X(machine.I2C(1))');
    let code = 'vl53l1x.read()';
    switch (block.getFieldValue("UNIT")) {
        case "Millimeter":
            return [code, Blockly.Python.ORDER_ATOMIC];
        case "Centimeter":
            code += "/10";
            return [code, Blockly.Python.ORDER_ATOMIC];
        case "Meter":
            code += "/1000";
            return [code, Blockly.Python.ORDER_ATOMIC];
    }
}