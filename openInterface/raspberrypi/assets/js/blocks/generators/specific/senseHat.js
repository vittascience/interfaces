/**
 * @fileoverview SenseHat generators for Raspberry pi.
 */

Blockly.Python.sensehat_getSenseHatHumidity = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    Blockly.Python.addInit('sense_hat_humidity', 'humidity = sense.get_humidity()')
    return [`humidity`, Blockly.Python.ORDER_ATOMIC];

};

Blockly.Python.sensehat_getTemperatureFrom = function (block) {
    const unit = block.getFieldValue('UNIT');
    const sensor = block.getFieldValue('SENSOR');
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    Blockly.Python.addFunction('senseHat_getTemperatureFrom', FUNCTIONS_SENSEHAT.SENSE_HAT_TEMPERATURE_FROM);
    return [`senseHat_getTemperatureFrom("${sensor}", "${unit}")`, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.sensehat_getSenseHatTemperature = function (block) {
    const unit = block.getFieldValue('UNIT');
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    Blockly.Python.addFunction('senseHat_getTemperature', FUNCTIONS_SENSEHAT.SENSE_HAT_TEMPERATURE);
    return [`senseHat_getTemperature("${unit}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_getSenseHatPressure = function (block) {
    const unit = block.getFieldValue('UNIT');
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()');
    Blockly.Python.addFunction('senseHat_getPressure', FUNCTIONS_SENSEHAT.SENSE_HAT_PRESSURE);
    return [`senseHat_getPressure("${unit}")`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_display_set_pixels_image = function (block) {
    const image = block.getFieldValue('IMAGE');
    const foreGroudColor = Blockly.Python.valueToCode(block, "FOREGROUND_COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    const backGroudColor = Blockly.Python.valueToCode(block, 'BACKGROUND_COLOR', Blockly.Python.ORDER_NONE) || "[0,0,0]";
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    Blockly.Python.addInit('foreGroudColor', `X = [${foreGroudColor.replace('(','').replace(')','')}]`);
    Blockly.Python.addInit('backGroudColor', `O = [${backGroudColor.replace('(','').replace(')','')}]\n`);
    let code = ""
    switch (image) {
        case 'question_mark':
            Blockly.Python.addInit('sense_hat_image', `question_mark = ${SENSEHAT_LED_IMAGE.question_mark}`)
            code = `sense.set_pixels(question_mark)\n`;
            break;
        case 'heart':
            Blockly.Python.addInit('sense_hat_image', `heart = ${SENSEHAT_LED_IMAGE.heart}`)
            code = `sense.set_pixels(heart)\n`;
            break;
        case 'smile':
            Blockly.Python.addInit('sense_hat_image', `smile = ${SENSEHAT_LED_IMAGE.smile}`)
            code = `sense.set_pixels(smile)\n`;
            break;
        case 'house':
            Blockly.Python.addInit('sense_hat_image', `house = ${SENSEHAT_LED_IMAGE.house}`)
            code = `sense.set_pixels(house)\n`;
            break;
        case 'sad':
            Blockly.Python.addInit('sense_hat_image', `sad = ${SENSEHAT_LED_IMAGE.sad}`)
            code = `sense.set_pixels(sad)\n`;
            break;
    };
    return code;
}

Blockly.Python.sensehat_display_set_pixel = function (block) {
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    const red = Blockly.Python.valueToCode(block, "RED", Blockly.Python.ORDER_NONE) || 0;
    const green = Blockly.Python.valueToCode(block, "GREEN", Blockly.Python.ORDER_NONE) || 0;
    const blue = Blockly.Python.valueToCode(block, "BLUE", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    // Blockly.Python.addInit('color', `color = ${red, green, blue}`);
    return `sense.set_pixel(${x}, ${y}, ${red}, ${green}, ${blue})\n`;
};

Blockly.Python.sensehat_display_set_pixel_palette = function (block) {
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    // Blockly.Python.addInit('color', `color = ${color.replace('(','').replace(')','')}`);
    return `sense.set_pixel(${x}, ${y}, ${color.replace('(','').replace(')','')})\n`;
};

Blockly.Python.sensehat_display_get_pixel = function (block) {
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return [`sense.get_pixel(${x}, ${y})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_display_get_pixels = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return [`sense.get_pixels()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_show_leds_image = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    let color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || [0,0,0];
    color = color.replace(/\(|\)/g, '').split(',').map(Number);
    Blockly.Python.addInit('X', `X = ${[color]}`);
    Blockly.Python.addInit('O', `O = [0,0,0]`);
    // const parsedColor = color.replace('(','').replace(')','');
    let image = [];
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var label = "LED" + row + "" + column;
            // console.log(block.getFieldValue(label, Blockly.Python.ORDER_MEMBER));
            image.push(block.getFieldValue(label, Blockly.Python.ORDER_MEMBER) === 'TRUE' ? "X" : "O");
        }
        // image += (row < 4) ? ":" : "";
    }

    // console.log(image);

    Blockly.Python.addInit('image', `image = [${image}]`);

    return 'sense.set_pixels(image)\n'

};


Blockly.Python.sensehat_display_get_pixel = function (block) {
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return [`sense.get_pixel(${x}, ${y})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_display_get_pixels = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return [`sense.get_pixels()`, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.sensehat_display_clear = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return 'sense.clear()\n';
};

Blockly.Python.sensehat_display_clear_with_color = function (block) {
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return `sense.clear(${color.replace('(','').replace(')','')})\n`;
};

Blockly.Python.sensehat_display_show_message = function (block) {
    const message = Blockly.Python.valueToCode(block, "MESSAGE", Blockly.Python.ORDER_NONE) || "bonjour!";
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    const backgroundColor = Blockly.Python.valueToCode(block, "BACKGROUND_COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || 1;
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return `sense.show_message(${message}, ${speed}, [${color.replace('(','').replace(')','')}], [${backgroundColor.replace('(','').replace(')','')}])\n`;
};

Blockly.Python.sensehat_display_show_letter = function (block) {
    let letter = Blockly.Python.valueToCode(block, "LETTER", Blockly.Python.ORDER_NONE) || "\"\"";
    const color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    const backgroundColor = Blockly.Python.valueToCode(block, "BACKGROUND_COLOR", Blockly.Python.ORDER_NONE) || "[0,0,0]";
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    console.log (`sense.show_letter(${letter}, [${color.replace('(','').replace(')','')}], [${backgroundColor.replace('(','').replace(')','')}])\n`)
    return `sense.show_letter(${letter}, [${color.replace('(','').replace(')','')}], [${backgroundColor.replace('(','').replace(')','')}])\n`;
};

// IO 

Blockly.Python.sensehat_wait_for_event = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return `event = sense.stick.wait_for_event()`+ NEWLINE;
};

Blockly.Python.sensehat_get_event_action_direction = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    const event = block.getFieldValue('EVENT_TYPE');
    return [`event.${event}`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensehat_get_event_joystick = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    Blockly.Python.addFunction('senseHat_getEventsJoystick', FUNCTIONS_SENSEHAT.SENSE_HAT_GET_EVENT_JOYSTICK);
    return `senseHat_getEventsJoystick()`;
};


// IMU (sensehat_set_imu_config)

Blockly.Python.sensehat_set_imu_config = function (block) {
    const gyro = block.getFieldValue('IMU_CONFIG_GYRO');
    const accel = block.getFieldValue('IMU_CONFIG_ACCEL');
    const compass = block.getFieldValue('IMU_CONFIG_COMPASS');
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return `sense.set_imu_config(${gyro}, ${accel}, ${compass})\n`;
};

Blockly.Python.sensehat_imu_get_orientation = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    const orientation = block.getFieldValue('ORIENTATION');
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return [`sense.get_orientation_${orientation}()`, Blockly.Python.ORDER_ATOMIC];
};

// Blockly.Python.sensehat_imu_get_orientation_degrees = function (block) {
//     Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
//     Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
//     return [`sense.get_orientation_degrees()`, Blockly.Python.ORDER_ATOMIC];
// };

Blockly.Python.sensehat_imu_get_compass = function (block) {
    Blockly.Python.addImport('sense_hat_all', IMPORT_SENSE_HAT_ALL);
    Blockly.Python.addInit('sense_hat_all', 'sense = SenseHat()\n');
    return [`sense.get_compass()`, Blockly.Python.ORDER_ATOMIC];
};