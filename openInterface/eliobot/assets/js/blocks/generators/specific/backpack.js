/**
 * @fileoverview Backpack generators for Eliobot.
 */

// Backpack - Display

Blockly.Python.backpack_display_oled_text = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addImport('adafruit_ssd1306', 'import adafruit_ssd1306');
    Blockly.Python.addImport('ssd1306_display', 'display = adafruit_ssd1306.SSD1306_I2C(128, 64, busio.I2C(board.IO9, board.IO8))');
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const row = block.getFieldValue('ROW');
    const y_position = (parseInt(row) - 1) * 10; // Each row is 10 pixels high
    const line_height = 10;
    let code = `display.fill_rect(0, ${y_position}, 128, ${line_height}, 0)` + NEWLINE;
    code += `display.text(${text}, 0, ${y_position}, 1)` + NEWLINE;
    code += 'display.show()' + NEWLINE;
    return code;
};

Blockly.Python.backpack_display_oled_clear = function () {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addImport('adafruit_ssd1306', 'import adafruit_ssd1306');
    Blockly.Python.addImport('ssd1306_display', 'display = adafruit_ssd1306.SSD1306_I2C(128, 64, busio.I2C(board.IO9, board.IO8))');
    let code = `display.fill(0)` + NEWLINE;
    code += 'display.show()' + NEWLINE;
    return code;
};

const hexToRgbTuple = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `(${r}, ${g}, ${b})`;
};

Blockly.Python.backpack_display_matrix_color_picker = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('matrix', IMPORT_MATRIX);
    Blockly.Python.addInit('matrix', 'matrix = MatrixLED(board.IO2)');

    const colors = [];
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const color = block.getFieldValue(`COLOUR_${row}_${col}`);
            colors.push(hexToRgbTuple(color));
        }
    }

    let code = 'led_colors = [' + NEWLINE;
    colors.forEach((color) => { code += `  ${color},` + NEWLINE; });
    code += ']' + NEWLINE;
    code += 'matrix.set_matrix_colors(led_colors)' + NEWLINE;
    return code;
};

Blockly.Python.backpack_display_clear_matrix = function () {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('matrix', IMPORT_MATRIX);
    Blockly.Python.addInit('matrix', 'matrix = MatrixLED(board.IO2)');
    return 'matrix.clear_matrix()' + NEWLINE;
};

Blockly.Python.backpack_display_matrix_logo_picker = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('matrix', IMPORT_MATRIX);
    Blockly.Python.addInit('matrix', 'matrix = MatrixLED(board.IO2)');
    const logoType = block.getFieldValue('LOGO_TYPE');
    const logoColour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    return `matrix.set_matrix_logo(matrix.${logoType}, (${logoColour[0]}, ${logoColour[1]}, ${logoColour[2]}))` + NEWLINE
};

Blockly.Python.backpack_display_matrix_scroll_text = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('matrix', IMPORT_MATRIX);
    Blockly.Python.addInit('matrix', 'matrix = MatrixLED(board.IO2)');
    const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    return `matrix.scroll_matrix_text(${text},  (${colour[0]}, ${colour[1]}, ${colour[2]}))` + NEWLINE;
};

// Backpack - Sensors

Blockly.Python.backpack_sensor_dht11 = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('adafruit_dht', IMPORT_ADAFRUIT_DHT);
    Blockly.Python.addInit('dht_sensor', 'dht_sensor = adafruit_dht.DHT11(board.IO15)');
    const sensorType = block.getFieldValue('SENSOR_TYPE');
    return [`dht_sensor.${sensorType}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.backpack_sensor_bme280 = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addImport('adafruit_bme280', IMPORT_ADAFRUIT_BME280);
    Blockly.Python.addInit('bme280_sensor', 'bme_sensor = adafruit_bme280.Adafruit_BME280_I2C(busio.I2C(board.IO9, board.IO8), address=0x76)');
    const sensorType = block.getFieldValue('SENSOR_TYPE');
    return [`bme_sensor.${sensorType}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.backpack_sensor_bme280_set_sea_level_pressure = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addImport('adafruit_bme280', IMPORT_ADAFRUIT_BME280);
    Blockly.Python.addInit('bme280_sensor', 'bme_sensor = adafruit_bme280.Adafruit_BME280_I2C(busio.I2C(board.IO9, board.IO8), address=0x76)');
    const pressure = Blockly.Python.valueToCode(block, 'PRESSURE', Blockly.Python.ORDER_ATOMIC);
    return `bme_sensor.sea_level_pressure = ${pressure}` + NEWLINE;
};

Blockly.Python.backpack_sensor_hcsr04_getDistance = function () {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('digitalio', IMPORT_DIGITALIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('pulseio', IMPORT_PULSEIO);
    Blockly.Python.addInit('define_trigger', `trigger = digitalio.DigitalInOut(board.IO15)` + NEWLINE + `trigger.direction = Direction.OUTPUT` + NEWLINE + `trigger.value = False`);
    Blockly.Python.addInit('define_echo', `echo = pulseio.PulseIn(board.IO16)` + NEWLINE + `echo.pause()` + NEWLINE + `echo.clear()`);
    Blockly.Python.addInit('define_distance_function', FUNCTIONS_ELIOBOT.DEF_MEASURE_DISTANCE);
    return [`measure_distance()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.backpack_sensor_getLight = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('analogio', IMPORT_ANALOGIO);
    const pin = block.getFieldValue('PIN');
    Blockly.Python.addInit('light_sensor_on_io' + pin, `# Light Sensor on IO${pin}`)
    Blockly.Python.addInit('define_light_sensor' + pin, `light_sensorIO${pin} = analogio.AnalogIn(board.IO${pin})`);
    return [`light_sensorIO${pin}.value`, Blockly.Python.ORDER_ATOMIC];
};

// Backpack - IO

Blockly.Python.backpack_io_button_state = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('digitalio', IMPORT_DIGITALIO);
    const state = block.getFieldValue('STATE') || '';
    const pin = block.getFieldValue('PIN');
    Blockly.Python.addInit('button_on_io' + pin, `# Button on IO${pin}`)
    Blockly.Python.addInit('define_button_' + pin, `buttonIO${pin} = digitalio.DigitalInOut(board.IO${pin})` + NEWLINE + `buttonIO${pin}.direction = digitalio.Direction.INPUT`);
    return [`buttonIO${pin}.value == ${state}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.backpack_io_knob_value = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('analogio', IMPORT_ANALOGIO);
    const pin = block.getFieldValue('PIN');
    Blockly.Python.addInit('potentiometer_on_io' + pin, `# Potentiometer on IO${pin}`)
    Blockly.Python.addInit('define_potentiometer_' + pin, `potIO${pin} = analogio.AnalogIn(board.IO${pin})`);
    return [`(potIO${pin}.value / 52368) * 100`, Blockly.Python.ORDER_ATOMIC];
};

// Backpack - Actuators 

Blockly.Python.backpack_actuators_servo_motor_angle = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('pwmio', IMPORT_PWMIO);
    const pin = block.getFieldValue('PIN');
    let servoPin;
    switch (pin) {
        case '1':
        case '5':
            servoPin = 'IO15';
            break;
        case '2':
            servoPin = 'IO16';
            break;
        case '3':
        case '4':
            servoPin = 'IO2';
            break;
    }
    Blockly.Python.addInit(`servo_${servoPin}`, `# Servo on ${servoPin}`);
    Blockly.Python.addInit(`define_pwm_${pin}`, `pwm_${pin} = pwmio.PWMOut(board.${servoPin}, frequency=50)`);

    const angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);
    const constrainedAngle = Math.min(180, Math.max(0, angle));
    const min_pulse = 750;
    const max_pulse = 2750;
    const duty_cycle = `int(((${constrainedAngle} / 180.0) * (${max_pulse} - ${min_pulse}) + ${min_pulse}) * pwm_${pin}.frequency * 65535 / 1000000)`;
    return `pwm_${pin}.duty_cycle = ${duty_cycle}` + NEWLINE;
};

Blockly.Python.backpack_actuators_servo_motor_speed = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('pwmio', IMPORT_PWMIO);
    const pin = block.getFieldValue('PIN');
    let servoPin;
    switch (pin) {
        case '1':
        case '5':
            servoPin = 'board.IO15';
            break;
        case '2':
            servoPin = 'board.IO16';
            break;
        case '3':
        case '4':
            servoPin = 'board.IO2';
            break;
    }

    Blockly.Python.addInit(`define_pwm_${pin}`, `pwm_${pin} = pwmio.PWMOut(${servoPin}, frequency=50, duty_cycle=0)`);

    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC);
    const direction = block.getFieldValue('DIRECTION');
    let constrainedSpeed = `(${speed} / 100) * (65535 - 3277) + 3277`;

    if (direction === '1') {
        constrainedSpeed = `65535 - ${constrainedSpeed}`;
    }

    return `pwm_${pin}.duty_cycle = int(${constrainedSpeed})` + NEWLINE;
};

Blockly.Python.backpack_actuators_grove_buzzer = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('pwmio', IMPORT_PWMIO);
    const pin = block.getFieldValue('PIN');
    Blockly.Python.addInit(`define_buzzer_${pin}`, `grove_buzzer_${pin} = pwmio.PWMOut(board.IO${pin}, frequency=440, duty_cycle=0)`);
    let volume = Blockly.Python.valueToCode(block, 'VOLUME', Blockly.Python.ORDER_ATOMIC);
    let frequency = Blockly.Python.valueToCode(block, 'FREQUENCY', Blockly.Python.ORDER_ATOMIC);
    volume = `min(100, max(0, ${volume}))`;
    const duty_cycle = `(int(65535 * (${volume} / 100)))`;
    let code = `grove_buzzer_${pin}.frequency = ${frequency}` + NEWLINE;
    code += `grove_buzzer_${pin}.duty_cycle = ${duty_cycle}` + NEWLINE;
    return code;
};