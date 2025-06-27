/**
 * @fileoverview Devices generators for TI-83 Premium CE.
 */

// Hub Built-in devices

Blockly.Python.devices_builtin_getLight = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('brightns', IMPORT_BRIGHTNS);
    return ["brightns.measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.devices_builtin_setRedLed = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('light', IMPORT_LIGHT);
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && ["io_hub_digital_signal", "io_digital_signal", "logic_boolean"].includes(inputBlock.type)) {
        return ((state == '1' || state == 'True') ? "light.on()" : "light.off()") + NEWLINE;
    } else {
        return "if " + state + ":" + NEWLINE + "  light.on()" + NEWLINE
            + "else:" + NEWLINE + "  light.off()" + NEWLINE;
    }
};

Blockly.Python.devices_builtin_playMusicBuzzer = function (block) {
    const music = block.getFieldValue("MUSIC");
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('sound', IMPORT_SOUND);
    switch (music) {
        case "CARRIBEAN_PIRATES":
            Blockly.Python.addFunction('BuzzerCarribeanPirates', FUNCTIONS_TI_83.DEF_BUZZER_CARRIBEAN_PIRATES);
            return "BuzzerCarribeanPirates(sound.tone, time_factor=1/1000)" + NEWLINE;
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_TI_83.DEF_BUZZER_GAMME);
            return "BuzzerGamme(sound.tone, time_factor=1/1000)" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_TI_83.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(sound.tone, time_factor=1/10)" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_TI_83.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(sound.tone, time_factor=1/125)" + NEWLINE;
        default:
            throw Error("Unhandled music option: " + music);
    }
};

Blockly.Python.devices_builtin_speaker_playNotes = function (block) {
    var notes = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        notes[i] = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "None";
    }
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('sound', IMPORT_SOUND);
    Blockly.Python.addFunction('buzzer_playNotes', FUNCTIONS_TI_83.DEF_BUZZER_PLAY_NOTES);
    return "buzzer_playNotes(sound.tone, [" + notes.join(", ") + "])" + NEWLINE;
};

Blockly.Python.devices_builtin_speaker_note = function (block) {
    var note = block.getFieldValue("NOTE");
    var octave = block.getFieldValue("OCTAVE");
    if (octave == "4") octave = "";
    var duration = ":" + block.getFieldValue("DURATION");
    if (duration == ":1") duration = "";
    return ["'" + note + octave + duration + "'", Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.devices_builtin_speaker_playFrequency = function (block) {
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const duration_s = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('sound', IMPORT_SOUND);
    return "sound.tone(" + freq + ", " + duration_s + ")" + NEWLINE;
};

Blockly.Python.devices_builtin_setLEDRGB = function (block) {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('color', IMPORT_COLOR);
    var r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    var g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    var b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "color.rgb(" + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.devices_builtin_setLEDRGBPalette = function (block) {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('color', IMPORT_COLOR);
    let colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    let colourList = colour.match(/([0-9]{1,3})/g);
    return "color.rgb(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.devices_builtin_blinkLEDRGB = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('color', IMPORT_COLOR);
    return "color.blink()" + NEWLINE;
};

// External Grove Inputs

Blockly.Python.devices_grove_getPotentiometer = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Potentiometer', "potentiometer");
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('potentio_all', IMPORT_POTENTIO_ALL);
    return [pinName + ".measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.devices_grove_getUltrasonicRange = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Ultrasonic', "ranger");
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('ranger_all', IMPORT_RANGER_ALL);
    return [pinName + ".measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.devices_grove_getMoisture = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Moisture', "moisture");
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('moisture_all', IMPORT_MOISTURE_ALL);
    return [pinName + ".measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.devices_grove_getTemperature = function (block) {
    var code;
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Temperatue', "temperature");
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('temperat_all', IMPORT_TEMPERAT_ALL);
    code = pinName + ".measurement()";
    switch (block.getFieldValue("UNIT")) {
        case "FAHRENHEIT":
            code += "*9/5 + 32";
            break;
        case "KELVIN":
            code += " + 273.15";
            break;
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.devices_grove_dhtReadData = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'DHT11', "dht");
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('dht_all', IMPORT_DHT_ALL);
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            var code = pinName + ".temp_measurement()";
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ATOMIC];
        case "HUM":
            return [pinName + ".humidity_measurement()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.devices_grove_getLoudness = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Loudness Sensor', "loudness");
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('loudness_all', IMPORT_LOUDNESS_ALL);
    return [pinName + ".measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.devices_grove_getLight = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Light Sensor', "light_lvl");
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('lightlvl_all', IMPORT_LIGHTLVL_ALL);
    return [pinName + ".measurement()", Blockly.Python.ORDER_ATOMIC];
};

// External Grove Outputs

Blockly.Python.devices_grove_setSocketLed = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'LED Module', "led");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('led_all', IMPORT_LED_ALL);
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && ["io_hub_digital_signal", "io_digital_signal", "logic_boolean"].includes(inputBlock.type)) {
        return ((state == '1' || state == 'True') ? pinName + ".on()" : pinName + ".off()") + NEWLINE;
    } else {
        return "if " + state + ":" + NEWLINE + "  " + pinName + ".on()" + NEWLINE
            + "else:" + NEWLINE + "  " + pinName + ".off()" + NEWLINE;
    }
};

Blockly.Python.devices_grove_setLEDintensity = function (block) {
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'LED Module', "analog_out");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('analogout_all', IMPORT_ANALOGOUT_ALL);
    return pinName + ".set(" + value + ")" + NEWLINE;
};

Blockly.Python.devices_grove_setServoAngle = function (block) {
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), "Servo", "servo");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('servo_all', IMPORT_SERVO_ALL);
    Blockly.Python.addFunction('servo_setAngle', FUNCTIONS_TI_83.DEF_HUB_SERVO_SET_ANGLE);
    return "servo_setAngle(" + pinName + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.devices_grove_setRelayState = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Grove Relay', "relay");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('relay_all', IMPORT_RELAY_ALL);
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && ["io_hub_digital_signal", "io_digital_signal", "logic_boolean"].includes(inputBlock.type)) {
        return ((state == '1' || state == 'True') ? pinName + ".on()" : pinName + ".off()") + NEWLINE;
    } else {
        return "if " + state + ":" + NEWLINE + "  " + pinName + ".on()" + NEWLINE
            + "else:" + NEWLINE + "  " + pinName + ".off()" + NEWLINE;
    }
};

Blockly.Python.devices_grove_setVibrationMotorState = function (block) {
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Vibration Motor', "vibration_motor");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('vibmotor_all', IMPORT_VIBMOTOR_ALL);
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && ["io_hub_digital_signal", "io_digital_signal", "logic_boolean"].includes(inputBlock.type)) {
        return ((state == '1' || state == 'True') ? pinName + ".on()" : pinName + ".off()") + NEWLINE;
    } else {
        return "if " + state + ":" + NEWLINE + "  " + pinName + ".on()" + NEWLINE
            + "else:" + NEWLINE + "  " + pinName + ".off()" + NEWLINE;
    }
};

Blockly.Python.devices_grove_setVibrationMotorValue = function (block) {
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Vibration Motor', "vibration_motor");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('vibmotor_all', IMPORT_VIBMOTOR_ALL);
    return pinName + ".set(" + value + ")" + NEWLINE;
};

Blockly.Python.devices_grove_setPowerState = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Motor', "power");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('power_all', IMPORT_POWER_ALL);
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && ["io_hub_digital_signal", "io_digital_signal", "logic_boolean"].includes(inputBlock.type)) {
        return ((state == '1' || state == 'True') ? pinName + ".on()" : pinName + ".off()") + NEWLINE;
    } else {
        return "if " + state + ":" + NEWLINE + "  " + pinName + ".on()" + NEWLINE
            + "else:" + NEWLINE + "  " + pinName + ".off()" + NEWLINE;
    }
};

Blockly.Python.devices_grove_setPowerValue = function (block) {
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'Motor', "power");
    const value = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('power_all', IMPORT_POWER_ALL);
    return pinName + ".set(" + value + ")" + NEWLINE;
};


// Pins

Blockly.Python.io_hub_digital_signal = function (block) {
    return ["HIGH" == block.getFieldValue("BOOL") ? 1 : 0, Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.io_hub_readDigitalPin = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), null, "digital");
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('digital_all', IMPORT_DIGITAL_ALL);
    return [pinName + ".measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_hub_writeDigitalPin = function (block) {
    const pinName = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), null, "digital");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('digital_all', IMPORT_DIGITAL_ALL);
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && ["io_hub_digital_signal", "io_digital_signal", "logic_boolean"].includes(inputBlock.type)) {
        return ((state == '1' || state == 'True') ? pinName + ".on()" : pinName + ".off()") + NEWLINE;
    } else {
        return pinName + ".set(" + state + ")" + NEWLINE;
    }
};

Blockly.Python.io_hub_readAnalogPin = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"));
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('analogin_all', IMPORT_ANALOGIN_ALL);
    return [pinName + ".measurement()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_hub_writeAnalogPin = function (block) {
    const pinName = Blockly.Python.Generators.analog_write(block.getFieldValue("PIN"));
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('analogout_all', IMPORT_ANALOGOUT_ALL);
    return pinName + ".set(" + value + ")" + NEWLINE;
};

Blockly.Python.io_hub_setPwm = function (block) {
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), null, "squarewave");
    const frequency = Blockly.Python.valueToCode(block, "FREQ", Blockly.Python.ORDER_NONE) || "0";
    const percent = Blockly.Python.valueToCode(block, "PERCENT", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    Blockly.Python.addImport('squarevw_all', IMPORT_SQUAREWV_ALL);
    return pinName + ".set(" + frequency + ", " + percent + ")" + NEWLINE;
};
