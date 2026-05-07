/**
 * @fileoverview Sensors generators for Eliobot.
 */

const addLineSensorDefs = function () {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('digitalio', IMPORT_DIGITALIO);
    Blockly.Python.addImport('analogio', IMPORT_ANALOGIO);
    Blockly.Python.addImport('pwmio', IMPORT_PWMIO);
    Blockly.Python.addInit('vBatt_pin', 'vBatt_pin = analogio.AnalogIn(board.BATTERY)');
    Blockly.Python.addInit('lineCmd', 'lineCmd = digitalio.DigitalInOut(board.IO33)' + NEWLINE + 'lineCmd.direction = digitalio.Direction.OUTPUT');
    Blockly.Python.addInit('lineInput', 'lineInput = [analogio.AnalogIn(pin) for pin in (board.IO10, board.IO11, board.IO12, board.IO13, board.IO14)]');
    Blockly.Python.addInit('motor_pins', 'AIN1 = pwmio.PWMOut(board.IO36)' + NEWLINE + 'AIN2 = pwmio.PWMOut(board.IO38)' + NEWLINE + 'BIN1 = pwmio.PWMOut(board.IO35)' + NEWLINE + 'BIN2 = pwmio.PWMOut(board.IO37)');
    Blockly.Python.addInit('motors', 'motors = Motors(AIN1, AIN2, BIN1, BIN2, vBatt_pin)');
    Blockly.Python.addInit('lineSensor', 'lineSensor = LineSensor(lineInput, lineCmd, motors)');
};

Blockly.Python.sensors_read_obstacle = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('analogio', IMPORT_ANALOGIO);
    Blockly.Python.addInit('obstacleInput', 'obstacleInput = [analogio.AnalogIn(pin) for pin in (board.IO4, board.IO5, board.IO6, board.IO7)]');
    Blockly.Python.addInit('obstacleSensor', 'obstacleSensor = ObstacleSensor(obstacleInput)');
    const direction = block.getFieldValue('DIRECTION');
    return [`obstacleSensor.get_obstacle(${direction})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_line_follow = function () {
    addLineSensorDefs();
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('json', IMPORT_JSON);
    Blockly.Python.addInit('LED', '# Built in Neopixel declaration ' + NEWLINE + 'pixels = neopixel.NeoPixel(board.NEOPIXEL, 1, brightness=0.2, auto_write=False, pixel_order=neopixel.GRB)');
    Blockly.Python.addInit('seuil', 'try:' + NEWLINE +  TAB + 'with open("config.json", "r") as f:' + NEWLINE +  Blockly.Python.INDENT + TAB + 'calibration = json.load(f)' + NEWLINE +  TAB + 'seuil = calibration["line_threshold"]' + NEWLINE +  'except:' + NEWLINE +  TAB + 'seuil = 15000');
    Blockly.Python.addInit('speed', 'speed = 100');

    const code = 'if lineSensor.get_line(2) < seuil:' + NEWLINE +
        TAB + 'pixels.fill((51, 255, 51))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'motors.move_forward(speed)' + NEWLINE +
        'elif lineSensor.get_line(0) < seuil:' + NEWLINE +
        TAB + 'motors.motor_stop()' + NEWLINE +
        TAB + 'pixels.fill((255, 255, 0))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'motors.spin_right_wheel_forward(speed)' + NEWLINE +
        TAB + 'time.sleep(0.1)' + NEWLINE +
        'elif lineSensor.get_line(4) < seuil:' + NEWLINE +
        TAB + 'motors.motor_stop()' + NEWLINE +
        TAB + 'pixels.fill((204, 51, 204))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'motors.spin_left_wheel_forward(speed)' + NEWLINE +
        'elif lineSensor.get_line(1) < seuil:' + NEWLINE +
        TAB + 'motors.motor_stop()' + NEWLINE +
        TAB + 'pixels.fill((255, 255, 0))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'motors.spin_right_wheel_forward(speed)' + NEWLINE +
        'elif lineSensor.get_line(3) < seuil:' + NEWLINE +
        TAB + 'motors.motor_stop()' + NEWLINE +
        TAB + 'pixels.fill((204, 51, 204))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'motors.spin_left_wheel_forward(speed)' + NEWLINE +
        TAB + 'time.sleep(0.1)' + NEWLINE +
        'else:' + NEWLINE +
        TAB + 'motors.motor_stop()' + NEWLINE +
        TAB + 'pixels.fill((255, 0, 0))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE;
    return code;
};

Blockly.Python.sensors_line_set_sensitivity = function (block) {
    const sensitivity = Blockly.Python.valueToCode(block, 'SENSITIVITY', Blockly.Python.ORDER_NONE) || '15000';
    return `seuil = ${sensitivity}` + NEWLINE;
};

Blockly.Python.sensors_line_is_present = function (block) {
    addLineSensorDefs();
    Blockly.Python.addInit('seuil', 'seuil = 15000');
    return [`lineSensor.get_line(${block.getFieldValue('SENSORCHOICE')}) < seuil`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_line_sensor_value = function (block) {
    addLineSensorDefs();
    return [`lineSensor.get_line(${block.getFieldValue('SENSORCHOICE')})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_auto_line_calibration = function() {
    addLineSensorDefs();
    Blockly.Python.addImport('json', IMPORT_JSON);
    let code = 'lineSensor.calibrate_line_sensors()' + NEWLINE;
    code += 'try:' + NEWLINE +  TAB + 'with open("config.json", "r") as f:' + NEWLINE +  Blockly.Python.INDENT + TAB + 'calibration = json.load(f)' + NEWLINE +  TAB + 'seuil = calibration["line_threshold"]' + NEWLINE +  'except:' + NEWLINE +  TAB + 'seuil = 15000' + NEWLINE;
    return code;
};