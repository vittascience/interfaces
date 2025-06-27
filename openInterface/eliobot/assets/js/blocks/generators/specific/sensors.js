/**
 * @fileoverview Sensors generators for Esp32.
 */

// Esp32 board sensors

Blockly.Python.sensors_read_obstacle = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    const position = block.getFieldValue('DIRECTION');
    return ['elio.getObstacle(' + position + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_dht11_temperature = function () {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('import_adafruit_dht', IMPORT_ADAFRUIT_DHT);
    Blockly.Python.addInit('DHT11', 'sensor = adafruit_dht.DHT11(board.IO15)');
    return ['elio.getTemperature(sensor)', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_dht11_humidity = function () {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('import_adafruit_dht', IMPORT_ADAFRUIT_DHT);
    Blockly.Python.addInit('DHT11', 'sensor = adafruit_dht.DHT11(board.IO15)');
    return ['elio.getHumidity(sensor)', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_line_follow = function () {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('time', IMPORT_TIME);

    Blockly.Python.addInit('seuil', 'seuil = 15000');
    Blockly.Python.addInit('speed', 'speed = 100');
    Blockly.Python.addInit('LED', '# Built in Neopixel declaration \npixels = neopixel.NeoPixel(NEOPIXEL, 1, brightness=0.2, auto_write=False, pixel_order=neopixel.GRB)');

    const code = 'if elio.getLine(2) < seuil:' + NEWLINE +
        TAB + 'pixels.fill((51, 255, 51))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'elio.moveForward(speed)' + NEWLINE +
        'elif elio.getLine(0) < seuil:' + NEWLINE +
        TAB + 'elio.motorStop()' + NEWLINE +
        TAB + 'pixels.fill((255, 255, 0))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'elio.spinRightWheelForward(speed)' + NEWLINE +
        TAB + 'time.sleep(0.1)' + NEWLINE +
        'elif elio.getLine(1) < seuil:' + NEWLINE +
        TAB + 'elio.motorStop()' + NEWLINE +
        TAB + 'pixels.fill((255, 255, 0))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'elio.spinRightWheelForward(speed)' + NEWLINE +
        'elif elio.getLine(3) < seuil:' + NEWLINE +
        TAB + 'elio.motorStop()' + NEWLINE +
        TAB + 'pixels.fill((204, 51, 204))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'elio.spinLeftWheelForward(speed)' + NEWLINE +
        'elif elio.getLine(4) < seuil:' + NEWLINE +
        TAB + 'elio.motorStop()' + NEWLINE +
        TAB + 'pixels.fill((204, 51, 204))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE +
        TAB + 'elio.spinLeftWheelForward(speed)' + NEWLINE +
        TAB + 'time.sleep(0.1)' + NEWLINE +
        'else:' + NEWLINE +
        TAB + 'elio.motorStop()' + NEWLINE +
        TAB + 'pixels.fill((255, 0, 0))' + NEWLINE +
        TAB + 'pixels.show()' + NEWLINE;
    return code;
};

Blockly.Python.sensors_line_set_sensitivity = function (block) {
    const sensitivity = Blockly.Python.valueToCode(block, 'SENSITIVITY', Blockly.Python.ORDER_NONE) || '15000';
    return `seuil = ${sensitivity}` + NEWLINE;
};

Blockly.Python.sensors_line_is_present = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addInit('seuil', 'seuil = 15000');
    let sensorChoice = block.getFieldValue('SENSORCHOICE');
    switch (sensorChoice) {
        case 'right':
            sensorChoice = 4;
            break;
        case 'middleright':
            sensorChoice = 3;
            break;
        case 'middle':
            sensorChoice = 2;
            break;
        case 'middleleft':
            sensorChoice = 1;
            break;
        case 'left':
            sensorChoice = 0;
            break;
    }
    return ['elio.getLine(' + sensorChoice + ') < seuil', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_line_sensor_value = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    let sensorChoice = block.getFieldValue('SENSORCHOICE');
    switch (sensorChoice) {
        case 'right':
            sensorChoice = 4;
            break;
        case 'middleright':
            sensorChoice = 3;
            break;
        case 'middle':
            sensorChoice = 2;
            break;
        case 'middleleft':
            sensorChoice = 1;
            break;
        case 'left':
            sensorChoice = 0;
            break;
    }
    return ['elio.getLine(' + sensorChoice + ')', Blockly.Python.ORDER_ATOMIC]
};