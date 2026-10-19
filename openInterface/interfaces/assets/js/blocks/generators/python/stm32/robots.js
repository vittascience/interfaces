/**
 * @fileoverview Robots generators for STM32.
 */

// DONUTBOT
Blockly.Python.robots_donutbot_getUltrasonicRange = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const unit = block.getFieldValue("UNIT");
    return [`donutbot_get_distance('ultrasonic', '${unit}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_readDistance = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const unit = block.getFieldValue("UNIT");
    return [`donutbot_get_distance('tof',  '${unit}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_lineDetector = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    const side = block.getFieldValue('SIDE');
    return [`donutbot_get_line('${side}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_lineDetectorFunction = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    Blockly.Python.addFunction('donutbot_line_following', FUNCTIONS_L476.DEF_DONUTBOT_LINE_FOLLOWING);
    return `donutbot_line_following()` + NEWLINE;
};

Blockly.Python.robots_donutbot_lineDetectorThreshold = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    const threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_NONE) || "0";
    return `donutbot_set_treshold_value(${threshold})` + NEWLINE;
};

Blockly.Python.robots_donutbot_colorDetector = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const side = block.getFieldValue('SIDE');
    return [`donutbot_get_color_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_colorDetector_average = function () {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return [`donutbot_get_color()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_colorDetector_name = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addInit('donutbot-sensor-lights', 'donutbot_set_led_captor(True)');
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const side = block.getFieldValue('SIDE');
    return [`donutbot_get_color_name_${side}()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_setGo = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const speed = Math.max(0, Math.min(100, Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0));
    switch (block.getFieldValue("DIR")) {
        case "FORWARD":
            return "donutbot_move_forward(" + Math.round((speed / 100) * 7000) + ")" + NEWLINE;
        case "REVERSE":
            return "donutbot_move_backward(" + Math.round((speed / 100) * 7000) + ")" + NEWLINE;
    }
};

Blockly.Python.robots_donutbot_turnTo = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const speed = Math.max(0, Math.min(100, Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0));
    switch (block.getFieldValue("MOTOR")) {
        case "RIGHT":
            return "donutbot_rot_clock(" + Math.round((speed / 100) * 7000) + ")" + NEWLINE;
        case "LEFT":
            return "donutbot_rot_trigo(" + Math.round((speed / 100) * 7000) + ")" + NEWLINE;
    }
};

Blockly.Python.robots_donutbot_controlMotor = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const motor = block.getFieldValue("MOTOR");
    const direction = block.getFieldValue("DIR");
    const speed = Math.max(0, Math.min(100, Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0));
    if (motor == "2") { // RIGHT
        if (direction == "-1") {
            return `donutbot_controlMotor(${motor}, ${Math.round((speed / 100) * 7000)})` + NEWLINE;
        }
        return `donutbot_controlMotor(${motor}, ${-1 * Math.round((speed / 100) * 7000)})` + NEWLINE;
    }
    return `donutbot_controlMotor(${motor}, ${direction * Math.round((speed / 100) * 7000)})` + NEWLINE;
};

Blockly.Python.robots_donutbot_turnToAngle = function (block) {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const direction = block.getFieldValue("DIR");
    const angle = Math.max(0, Math.min(360, Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || 0));
    const speed = Math.max(0, Math.min(100, Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 0));
    return `donutbot_turnAngle(${angle * direction}, ${Math.round((speed / 100) * 7000)})` + NEWLINE;
};

Blockly.Python.robots_donutbot_moveOneSquareForward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return "donutbot_moveWithSquare(1, 'forward', 1400)" + NEWLINE;
};

Blockly.Python.robots_donutbot_moveOneSquareBackward = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return "donutbot_moveWithSquare(1, 'backward', 1400)" + NEWLINE;
};

Blockly.Python.robots_donutbot_turnLeft = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return "donutbot_turnAngle(-90, 1400)" + NEWLINE;
};

Blockly.Python.robots_donutbot_turnRight = function () {
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return "donutbot_turnAngle(90, 1400)" + NEWLINE;
};

Blockly.Python.robots_donutbot_stopMotors = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return `donutbot_pause(${block.getFieldValue("MOTOR")})` + NEWLINE;
};

Blockly.Python.robots_donutbot_releaseMotors = function (block) {
    Blockly.Python.addImport('stm32_donutbot', IMPORT_STM32_DONUTBOT);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    return `donutbot_stop(${block.getFieldValue("MOTOR")})` + NEWLINE;
};

Blockly.Python.robots_donutbot_neopixel_setColor = function (block) {
    const pinName = Blockly.Python.Generators.digital_write("'D12'", 'Neopixel');
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot_neopixel', `npDonutbot = neopixel.NeoPixel(${pinName}, 8)`);

    const r = Math.max(0, Math.min(255, Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || 0));
    const g = Math.max(0, Math.min(255, Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || 0));
    const b = Math.max(0, Math.min(255, Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || 0));

    if (block.getFieldValue("LED") === "all") {
        Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_L476.DEF_NEOPIXEL_SHOW_ALL_LED);
        return `neopixel_showAllLed(npDonutbot, 8, ${r}, ${g}, ${b})` + NEWLINE;
    } else {
        const ledIndex = block.getFieldValue("LED");
        return `npDonutbot[${ledIndex}] = (${r}, ${g}, ${b})` + NEWLINE + `npDonutbot.write()` + NEWLINE;
    }
};

Blockly.Python.robots_donutbot_neopixel_setPaletteColor = function (block) {
    const pinName = Blockly.Python.Generators.digital_write("'D12'", 'Neopixel');
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('donutbot_neopixel', `npDonutbot = neopixel.NeoPixel(${pinName}, 8)`);
    const led = block.getFieldValue("LED");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    if (led === "all") {
        Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_L476.DEF_NEOPIXEL_SHOW_ALL_LED);
        return `neopixel_showAllLed(npDonutbot, 8, ${colour.slice(1, -1)})` + NEWLINE;
    } else {
        return `npDonutbot[${led}] = ${colour}` + NEWLINE + `npDonutbot.write()` + NEWLINE;
    }
};

Blockly.Python.robots_donutbot_blinkRobot = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const pinName = Blockly.Python.Generators.digital_write("'D12'", 'Neopixel');
    Blockly.Python.addInit('donutbot_neopixel', `npDonutbot = neopixel.NeoPixel(${pinName}, 8)`);
    Blockly.Python.addFunction('donutbot_blinkRobot', FUNCTIONS_L476.DEF_DONUTBOT_BLINK_ROBOT);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    return `donutbot_blinkRobot(${colour.replace('(', '').replace(')', '')})` + NEWLINE;
};

Blockly.Python.robots_donutbot_neopixel_setRainbow = function () {
    const pinName = Blockly.Python.Generators.digital_write("'D12'", 'Neopixel');
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('donutbot_neopixel', `npDonutbot = neopixel.NeoPixel(${pinName}, 8)`);
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_L476.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_L476.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(npDonutbot, 8)" + NEWLINE;
};

Blockly.Python.robots_donutbot_buttons_onPressed = function (block) {
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Simple Button');
    return [`${pinName}.value() == ${block.getFieldValue("STATE")}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.robots_donutbot_BLE_SendData = function (block) {
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('ble_uart', 'uart_1 = machine.UART(1, baudrate=9600)');
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "";
    return "if uart_1:" + NEWLINE + "  " + `uart_1.write(str(${data}) + '\\n')` + NEWLINE;
};

Blockly.Python.robots_donutbot_BLE_ReadData = function (block) {
    Blockly.Python.addConstant('donutbot-robot', "\"\"\" DonutBot robot \"\"\"");
    Blockly.Python.addInit('ble_uart', 'uart_1 = machine.UART(1, baudrate=9600)');
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "if uart_1.any():" + NEWLINE + "  " + dataVar + " = uart_1.read().decode().strip()" + NEWLINE + branchCode;
};