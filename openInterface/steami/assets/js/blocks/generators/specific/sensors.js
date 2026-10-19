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
            Blockly.Python.addInit('steami_apds9960_enable_light_sensor', 'apds.enable_light_sensor()');
            return ['apds.ambient_light()', Blockly.Python.ORDER_ATOMIC];
        case "proximity":
            Blockly.Python.addInit('steami_apds9960_set_proximity_int_low_threshold', 'apds.set_proximity_int_low_threshold(50)')
            Blockly.Python.addInit('steami_apds9960_enable_proximity_sensor', 'apds.enable_proximity_sensor()');
            return ['apds.proximity()', Blockly.Python.ORDER_ATOMIC];
        case "gesture":
            Blockly.Python.addImport('apds9960_const', 'from apds9960.const import *');
            Blockly.Python.addInit('steami_apds9960_gesture_dirs', 'dirs = {APDS9960_DIR_NONE: "none", APDS9960_DIR_LEFT: "left", APDS9960_DIR_RIGHT: "right", APDS9960_DIR_UP: "up", APDS9960_DIR_DOWN: "down", APDS9960_DIR_NEAR: "near", APDS9960_DIR_FAR: "far"}');
            Blockly.Python.addInit('steami_apds9960_set_proximity_int_low_threshold', 'apds.set_proximity_int_low_threshold(50)')
            Blockly.Python.addInit('steami_apds9960_enable_gesture_sensor', 'apds.enable_gesture_sensor()');
            return ['dirs.get(apds.gesture(), "unknown")', Blockly.Python.ORDER_ATOMIC];
    }
};

// HTS221 sensor

Blockly.Python.sensors_steami_hts221_readData = function (block) {
    const dataType = block.getFieldValue("DATA_TYPE");
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('hts221', IMPORT_STEAMI_HTS221);
    Blockly.Python.addInit('steami_hts221', 'hts = HTS221(machine.I2C(1))');
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
};

// STEAMI - BQ27441 - READ DATA

Blockly.Python.sensors_steami_bq27441_readData = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('bq27441', IMPORT_BQ27441);
    Blockly.Python.addInit('steami_bq27441', 'bq = BQ27441(machine.I2C(1))');
    const dataType = block.getFieldValue("DATA_TYPE");
    return [`bq.${dataType}()`, Blockly.Python.ORDER_ATOMIC];
};

// STEAMI - WSEN_HIDS - READ DATA
Blockly.Python.sensors_steami_wsen_hids_readData = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('wsen_hids', IMPORT_WSEN_HIDS);
    Blockly.Python.addInit('steami_wsen_hids', 'hids = WSEN_HIDS(machine.I2C(1))');
    const dataType = block.getFieldValue("DATA_TYPE");
    return [`hids.read_one_shot()[${dataType}]`, Blockly.Python.ORDER_ATOMIC];
};

// STEAMI - WSEN_PADS - READ DATA
Blockly.Python.sensors_steami_wsen_pads_readData = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('wsen_pads', IMPORT_WSEN_PADS);
    Blockly.Python.addInit('steami_wsen_pads', 'pads = WSEN_PADS(machine.I2C(1))');
    const dataType = block.getFieldValue("DATA_TYPE");
    return [`pads.read()[${dataType}]`, Blockly.Python.ORDER_ATOMIC];
};

// STEAMI - LIS2MDL - READ DATA
Blockly.Python.sensors_steami_lis2mdl_readData = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('lis2mdl', IMPORT_STEAMI_LIS2MDL);
    Blockly.Python.addInit('steami_lis2mdl', 'lis2mdl = LIS2MDL(machine.I2C(1))');
    const dataType = block.getFieldValue("DATA_TYPE");
    if (dataType == 3) {
        return [`lis2mdl.temperature()`, Blockly.Python.ORDER_ATOMIC];
    }
    return [`lis2mdl.magnetic_field_ut()[${dataType}]`, Blockly.Python.ORDER_ATOMIC];
};

// STEAMI - ISM330DL - READ DATA
Blockly.Python.sensors_steami_ism330dl_readData = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('ism330dl', IMPORT_ISM330DL);
    Blockly.Python.addInit('steami_ism330dl', 'ism330dl = ISM330DL(machine.I2C(1))');
    let dataType = block.getFieldValue("DATA_TYPE");
    if (dataType == "temp") {
        return [`ism330dl.temperature()`, Blockly.Python.ORDER_ATOMIC];
    }
    dataType = dataType.split("-");
    return [`ism330dl.${dataType[0]}()[${dataType[1]}]`, Blockly.Python.ORDER_ATOMIC];
};