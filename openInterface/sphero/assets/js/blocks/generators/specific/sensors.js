/**
 * @fileoverview Sensors generators for Sphero
 */

Blockly.Python.sensors_pitch = function () {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    return [`sm.get_pitch()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_roll = function () {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    return [`sm.get_roll()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_yaw = function () {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    return [`sm.get_yaw()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_accelerometer = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const axis = block.getFieldValue("AXIS");
    if (axis !== "strength") {
        return [`sm.get_accelerometer_${axis}()`, Blockly.Python.ORDER_ATOMIC];
    } else {
        Blockly.Python.addImport('math', IMPORT_MATH);
        return ["math.sqrt(sm.get_accelerometer_x()**2 + sm.get_accelerometer_y()**2 + sm.get_accelerometer_z()**2)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_gyroscope = function (block) {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    const axis = block.getFieldValue("AXIS");
    return [`sm.get_gyroscope_${axis}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_isFallDetected = function () {
    Blockly.Python.addImport('sphero', IMPORT_SPHERO);
    Blockly.Python.addInit('sphero_mini_init', 'sm = sphero_mini()');
    return [`sm.get_fall_detection()`, Blockly.Python.ORDER_ATOMIC];
};