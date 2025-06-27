/**
 * @fileoverview Micro:bit generators for TI-83 Premium CE.
 */

// Micro:bit - Commandes
Blockly.Python.microbit_sleep = function (block) {
    const duration = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "0";
    const unit = block.getFieldValue("UNIT");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    switch (unit) {
        case "SECOND":
            return "sleep(" + duration + "*1e3)" + NEWLINE;
        case "MILLI":
            return "sleep(" + duration + ")" + NEWLINE;
        case "MICRO":
            return "sleep(" + duration + "/1e3)" + NEWLINE;
        default:
            return "sleep(" + duration + ")" + NEWLINE;
    }
};

Blockly.Python.microbit_while_condition = function (block) {
    const statements = Blockly.Python.addLoopTrap(Blockly.Python.statementToCode(block, "DO"), block.id) || Blockly.Python.PASS;
    const condition = Blockly.Python.valueToCode(block, "CONDITION", Blockly.Python.ORDER_NONE) || "False";
    return "while " + condition + ":" + NEWLINE + statements;
};

Blockly.Python.microbit_escape = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return ["escape()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.microbit_disp_clr = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "disp_clr()" + NEWLINE;
};

Blockly.Python.microbit_store_list = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    const list = Blockly.Python.valueToCode(block, "LIST", Blockly.Python.ORDER_NONE) || "[]";
    const index = block.getFieldValue("INDEX");
    return "store_list(\"" + index + "\", " + list + ")" + NEWLINE;
};

Blockly.Python.sensors_getTemperature = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    var code = "temperature()";
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

// Micro:bit - display

Blockly.Python.show_leds = function (block) {
    const BRIGHTNESS = 9;
    let image = "";
    for (var row = 0; row < 5; row++) {
        for (var column = 0; column < 5; column++) {
            var label = "LED" + row + "" + column;
            image += (block.getFieldValue(label, Blockly.Python.ORDER_MEMBER) === "TRUE") ? BRIGHTNESS : "0";
        }
        image += (row < 4) ? ":" : "";
    }
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "led_image = Image('" + image + "')" + NEWLINE + "display.show(led_image)" + NEWLINE;
};

Blockly.Python.show_number = function (block) {
    const number = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "display.show(" + number + ", delay=200, wait=True)" + NEWLINE;
};

Blockly.Python.show_string = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "display.scroll(" + text + ", delay=200, wait=True)" + NEWLINE;
    } else {
        return "display.scroll(str(" + text + "), delay=200, wait=True)" + NEWLINE;
    }
};

Blockly.Python.show_icon = function (block) {
    const icon = block.getFieldValue("ICON") || "NO";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "display.show(\"Image." + icon + "\", delay=400, wait=True)" + NEWLINE;
};

Blockly.Python.show_clock = function (block) {
    const hour = Blockly.Python.valueToCode(block, "CLOCK", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    Blockly.Python.addFunction('showClock', FUNCTIONS_TI_83.DEF_TI_MICROBIT_SHOW_CLOCK);
    return "showClock(" + hour + ")" + NEWLINE;
};

Blockly.Python.show_arrow = function (block) {
    const dir = block.getFieldValue("ARROW") || "NO";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "display.show(\"Image.ARROW_" + dir + "\", delay=400, wait=True)" + NEWLINE;
};

Blockly.Python.display_show_gauge = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    const max = Blockly.Python.valueToCode(block, "MAX", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    Blockly.Python.addFunction('plotBarGraph', FUNCTIONS_TI_83.DEF_MICROBIT_LED_GAUGE);
    return "plotBarGraph(" + value + ", " + max + ")" + NEWLINE;
};

Blockly.Python.clear = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "display.clear()" + NEWLINE;
};

Blockly.Python.set_pixel = function (block) {
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    if (x < 0) x = 0;
    if (x > 5) x = 5;
    if (y < 0) y = 0;
    if (y > 5) y = 5;
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "display.set_pixel(" + x + ", " + y + ", 9 if " + state + " else 0)" + NEWLINE;
};

Blockly.Python.set_light_pixel = function (block) {
    let x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    let y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    const light = Blockly.Python.valueToCode(block, "LIGHT", Blockly.Python.ORDER_NONE) || "0";
    if (x < 0) x = 0;
    if (x > 5) x = 5;
    if (y < 0) y = 0;
    if (y > 5) y = 5;
    if (light < 0) light = 0;
    if (light > 9) light = 9;
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "display.set_pixel(" + x + ', ' + y + ', ' + light + ')' + NEWLINE;
};

Blockly.Python.sensors_getLight = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return ["display.read_light_level()", Blockly.Python.ORDER_ATOMIC];
};

// Micro:bit - music

Blockly.Python.actuators_music_playMusic = function (block) {
    const music = block.getFieldValue("MUSIC");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    switch (music) {
        case "CARRIBEAN_PIRATES":
            Blockly.Python.addFunction('BuzzerCarribeanPirates', FUNCTIONS_TI_83.DEF_BUZZER_CARRIBEAN_PIRATES);
            return "BuzzerCarribeanPirates(music.pitch)" + NEWLINE;
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_TI_83.DEF_BUZZER_GAMME);
            return "BuzzerGamme(music.pitch)" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_TI_83.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(music.pitch)" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_TI_83.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(music.pitch)" + NEWLINE;
        default:
            throw Error("Unhandled music option: " + music);
    }
};

Blockly.Python.actuators_music_playSong = function (block) {
    const song = block.getFieldValue("SONG");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "music.play(\'music." + song + "\')" + NEWLINE;
};

Blockly.Python.actuators_music_playNotes = function (block) {
    var notes = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        notes[i] = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "None";
    }
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "music.play([" + notes.join(", ") + "])" + NEWLINE;
};

Blockly.Python.actuators_music_note = function (block) {
    const note = block.getFieldValue("NOTE");
    var octave = block.getFieldValue("OCTAVE");
    if (octave == "4") octave = "";
    var duration = ":" + block.getFieldValue("DURATION");
    if (duration == ":1") duration = "";
    return ["'" + note + octave + duration + "'", Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.actuators_music_playFrequency = function (block) {
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "music.pitch(" + freq + ", " + duration + ")" + NEWLINE;
};

Blockly.Python.actuators_music_setTempo = function (block) {
    const ticks = Blockly.Python.valueToCode(block, "TICKS", Blockly.Python.ORDER_NONE) || "0";
    const bpm = Blockly.Python.valueToCode(block, "BPM", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "music.set_tempo(" + ticks + ", " + bpm + ")" + NEWLINE;
};

Blockly.Python.actuators_music_setVolume = function (block) {
    const volume = Blockly.Python.valueToCode(block, "VOL", Blockly.Python.ORDER_NONE);
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "music.set_volume(" + volume + ")" + NEWLINE;
};

// Micro:bit - audio

Blockly.Python.microbit_audio_play = function (block) {
    const song = block.getFieldValue("SONG");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "audio.play(\"Sound." + song + "\")" + NEWLINE;
};

Blockly.Python.microbit_audio_stop = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "audio.stop()" + NEWLINE;
};

// Micro:bit - microphone

// Microphone module

Blockly.Python.io_micro_onSoundDetected = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const state = block.getFieldValue("STATE");
    const type = block.getFieldValue("TYPE");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    switch (type) {
        case "IS":
            return "if microphone.is_event(SoundEvent." + state + "):" + NEWLINE + branchCode;
        case "WAS":
            return "if microphone.was_event(SoundEvent." + state + "):" + NEWLINE + branchCode;
        default:
            throw Error("Unhandled type option for microphone sensor :'" + type + "'")
    }
};

Blockly.Python.io_micro_getCurrentSound = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return ["microphone.current_event()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_micro_soundDetected = function (block) {
    const state = block.getFieldValue("STATE");
    const type = block.getFieldValue("TYPE");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    switch (type) {
        case "IS":
            return ["microphone.is_event(SoundEvent." + state + ")", Blockly.Python.ORDER_ATOMIC];
        case "WAS":
            return ["microphone.was_event(SoundEvent." + state + ")", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled type option for microphone sensor :'" + type + "'")
    }
};

Blockly.Python.io_micro_getSoundLevel = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return ["microphone.sound_level()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_micro_setSoundThreshold = function (block) {
    const state = block.getFieldValue("STATE");
    const threshold = Blockly.Python.valueToCode(block, "THRESH", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return "microphone.set_threshold(SoundEvent." + state + ", " + threshold + ")" + NEWLINE;
};

Blockly.Python.io_micro_soundCondition = function (block) {
    const state = block.getFieldValue("STATE");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return ["SoundEvent." + state, Blockly.Python.ORDER_ATOMIC];
};

// Micro:bit - buttons

Blockly.Python.io_onButtonPressed = function (block) {
    const button = block.getFieldValue("BUTTON");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const type = block.getFieldValue("TYPE").toLowerCase();
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    if (button === "a" || button === "b") {
        return "if button_" + button + "." + type + "_pressed():" + NEWLINE + branchCode;
    } else {
        return "if button_a." + type + "_pressed() and button_b." + type + "_pressed():" + NEWLINE + branchCode;
    }
};

Blockly.Python.io_isButtonPressed = function (block) {
    const button = block.getFieldValue("BUTTON");
    const type = block.getFieldValue("TYPE").toLowerCase();
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    if (button === "a" || button === "b") {
        return ["button_" + button + "." + type + "_pressed()", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["button_a." + type + "_pressed() and button_b." + type + "_pressed()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.io_buttons_getPresses = function (block) {
    const button = block.getFieldValue("BUTTON");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    return ["button_" + button + ".get_presses()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_isLogoTouched = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    return ["pin_logo.is_touched()", Blockly.Python.ORDER_ATOMIC];
};

// Micro:bit - sensors and gestures

Blockly.Python.microbit_accelerometer_getByAxis = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    const axis = block.getFieldValue("AXIS");
    return ["accelerometer.get_" + axis + "()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.microbit_accelerometer_getValues = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return ["accelerometer.get_values()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.microbit_accelerometer_getMagnitude = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return ["accelerometer.get_magnitude()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.microbit_accelerometer_getRotation = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    Blockly.Python.addImport('math', IMPORT_MATH);
    if (block.getFieldValue("AXIS") === "pitch") {
        return ["math.atan2(accelerometer.get_y(), -accelerometer.get_z()) * 180.0/math.pi", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["math.atan2(accelerometer.get_x(), math.sqrt(accelerometer.get_y()**2 + accelerometer.get_z()**2)) * 180.0/math.pi", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.microbit_compass_heading = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return ["compass.heading()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.microbit_compass_getMagneticStrengthByAxis = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    const option = block.getFieldValue("AXIS");
    return ["compass.get_" + option + "()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.microbit_compass_isCalibrated = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return ["compass.is_calibrated()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.microbit_compass_getFieldStrength = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return ["compass.get_field_strength()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.microbit_compass_calibrate = function (block) {
    const action = block.getFieldValue("ACTION");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    switch (action) {
        case "CALIBRATE":
            return "compass.calibrate()" + NEWLINE;
        case "CLEAR":
            return "compass.clearCalibration()" + NEWLINE;
        default:
            throw Error("Unhandled action option for compass :'" + action + "'")
    }
};

Blockly.Python.microbit_accelerometer_getCurrentGesture = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return ["accelerometer.current_gesture()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.microbit_accelerometer_onGestureType = function (block) {
    const type = block.getFieldValue("TYPE").toLowerCase();
    const gesture = block.getFieldValue("GESTURE");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "if accelerometer." + type + "_gesture(\"" + gesture + "\"):" + NEWLINE + branchCode;
};

Blockly.Python.microbit_accelerometer_isGesture = function (block) {
    const type = block.getFieldValue("TYPE").toLowerCase();
    const gesture = block.getFieldValue("GESTURE");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return ["accelerometer." + type + "_gesture(\"" + gesture + "\")", Blockly.Python.ORDER_ATOMIC];
};

// Micro:bit - radio

Blockly.Python.communication_radioSendString = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const str = Blockly.Python.valueToCode(block, "STR", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "STR")) {
        return "radio.send(" + str + ")" + NEWLINE;
    } else {
        return "radio.send(str(" + str + "))" + NEWLINE;
    }
};

Blockly.Python.communication_radioSendNumber = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    Blockly.Python.addFunction('radio_send', FUNCTIONS_TI_83.DEF_COM_RADIO_SEND);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    return "radio_send(" + n + ")" + NEWLINE;
};

Blockly.Python.communication_radioSendValue = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    Blockly.Python.addFunction('radio_sendValue', FUNCTIONS_TI_83.DEF_COM_RADIO_SEND_VALUE);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "''";
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return "radio_sendValue(" + name + ", " + value + ")" + NEWLINE;
};

Blockly.Python.communication_onRadioDataReceived = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return dataVar + " = radio.receive()" + NEWLINE + "if " + dataVar + ":" + NEWLINE + branchCode;
};

Blockly.Python.communication_onRadioNumberReceived = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    Blockly.Python.addFunction('radio_receiveData', FUNCTIONS_TI_83.DEF_COM_RADIO_RECEIVE_DATA);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return dataVar + " = radio_receiveData()" + NEWLINE + "if " + dataVar + " is not None:" + NEWLINE + branchCode;
};

Blockly.Python.communication_onRadioValueReceived = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    Blockly.Python.addFunction('radio_receiveValue', FUNCTIONS_TI_83.DEF_COM_RADIO_RECEIVE_VALUE);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const nameVar = Blockly.Python.nameDB_.getName(block.getFieldValue("NAME"), Blockly.VARIABLE_CATEGORY_NAME) || "''";
    const valueVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VALUE"), Blockly.VARIABLE_CATEGORY_NAME) || "''";
    return nameVar + ", " + valueVar + " = radio_receiveValue()" + NEWLINE + "if " + nameVar + " is not None and " + valueVar + " is not None:" + NEWLINE + branchCode;
};

Blockly.Python.communication_radioConfig = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    var canal = Blockly.Python.valueToCode(block, "CANAL", Blockly.Python.ORDER_NONE) || "0";
    if (canal > 83) canal = 83;
    if (canal < 0) canal = 0;
    var power = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    if (power > 7) power = 7;
    if (power < 0) power = 0;
    var len = Blockly.Python.valueToCode(block, "LEN", Blockly.Python.ORDER_NONE) || "0";
    if (len > 251) len = 251;
    if (len < 0) len = 0;
    var group = Blockly.Python.valueToCode(block, "GROUP", Blockly.Python.ORDER_NONE) || "0";
    if (group > 255) group = 255;
    if (group < 0) group = 0;
    return "radio.config(channel = " + canal + ", power = " + power + ", length = " + len + ", group=" + group + ")" + NEWLINE;
};

// Micro:bit - pins

Blockly.Python.io_digital_signal = function (block) {
    return ["HIGH" == block.getFieldValue("BOOL") ? 1 : 0, Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.io_readDigitalPin = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    return [block.getFieldValue("PIN") + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeDigitalPin = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    return block.getFieldValue("PIN") + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.io_readAnalogPin = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    return [block.getFieldValue("PIN") + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_writeAnalogPin = function (block) {
    var value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    if (value < 0) value = 0;
    if (value > 1023) value = 1023;
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    return block.getFieldValue("PIN") + ".write_analog(" + value + ")" + NEWLINE;
};

Blockly.Python.io_setPwm = function (block) {
    let period = Blockly.Python.valueToCode(block, "PERIOD", Blockly.Python.ORDER_NONE) || "0";
    let pin = block.getFieldValue("PIN");
    let unit = block.getFieldValue("UNIT");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    switch (unit) {
        case "MS":
            if (period * 1000 < 256) period = 256;
            return pin + ".set_analog_period(" + period + ")" + NEWLINE;
        case "US":
            if (period < 256) period = 256;
            return pin + ".set_analog_period(" + period + "/1000)" + NEWLINE;
    }
};

// Micro:bit - sensors

Blockly.Python.sensors_SHT31readData = function (block) {
    const data = block.getFieldValue("DATA");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addFunction('grove_read_sht_sensor', FUNCTIONS_TI_83.DEF_TI_SHT_READDATA);
    switch (data) {
        case "TEMP":
            var code = "grove_read_sht_sensor(data='t')";
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
            return ["grove_read_sht_sensor(data='h')", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for sht31 sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_mpx5700ap_getPressure = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    return ["grove.read_pressure(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_mpx5700ap_calibrate = function (block) {
    const m = Blockly.Python.valueToCode(block, "M", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "grove.calibrate_pressure(" + m + ", " + b + ")" + NEWLINE;
};

Blockly.Python.sensors_getGroveMoisture = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    return ["grove.read_moisture(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveLight = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    return ["grove.read_lightlevel(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTemperature = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    let code = "grove.read_temperature(" + pin + ")";
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

Blockly.Python.sensors_getGroveUltrasonicRanger = function (block) {
    let pin;
    switch (block.getFieldValue("SENSOR")) {
        case "GROVE":
            pin = block.getFieldValue("PIN");
            break;
        case "HC-SR04":
            pin = block.getFieldValue("TRIG");
            break;
    }
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    switch (block.getFieldValue("DATA")) {
        case "TIME":
            return ["grove.read_ranger_time(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
        case "DIST":
            return ["grove.read_ranger_cm(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.microbit_grove_read_bme280 = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addFunction('grove_read_bme280_sensor', FUNCTIONS_TI_83.DEF_TI_BME280_READDATA);
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            var code = "grove_read_bme280_sensor(data='t')";
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
        case "PRESS":
            return ["grove_read_bme280_sensor(data='p')", Blockly.Python.ORDER_ATOMIC];
        case "HUM":
            return ["grove_read_bme280_sensor(data='h')", Blockly.Python.ORDER_ATOMIC];
    }
};

// Micro:bit - Neopixel

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Add neopixel init code.
 * @param {int} numPin
 * @param {int} ledCount
 */
Blockly.Python.neopixel_codeInitialization = function (pin, ledCount) {
    const numPin = pin.substr(3);
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_neopx', IMPORT_MB_NEOPX);
    Blockly.Python.addConstant('led_count_' + numPin, NEOPIXEL_LED_COUNT + numPin + " = " + ledCount);
    Blockly.Python.addInit('neopixel_' + pin, "# Neopixel on " + pin);
    Blockly.Python.addInit('neopixel_' + numPin, "np_" + numPin + " = " + "NeoPixel(" + pin + ", " + NEOPIXEL_LED_COUNT + numPin + ")");
};

/**
 * This is not a block generator, it's util function used in all neopixel blocks.
 * Check if neopixel is already defined on given pin.
 * @return {bool} alreadyDefined
 */
Blockly.Python.neopixel_checkDefinedBlock = function (block, pin) {
    const defineBlocks = block.workspace.getBlocksByType('display_defineNeopixel');
    let alreadyDefined = false;
    for (var block in defineBlocks) {
        const fieldDropdownPin = defineBlocks[block].getField('PIN');
        const selectedOption = fieldDropdownPin.selectedOption_[1];
        if (selectedOption == pin && !defineBlocks[block].disabled) {
            alreadyDefined = true;
        }
    }
    return alreadyDefined;
};

Blockly.Python.display_defineNeopixel = function (block) {
    const ledCount = block.getFieldValue("N");
    const pin = block.getFieldValue("PIN");
    Blockly.Python.neopixel_codeInitialization(pin, ledCount);
    return "";
};

Blockly.Python.display_controlNeopixelLed = function (block) {
    const pin = block.getFieldValue("PIN");
    const led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(pin, "30");
    }
    return "np_" + pin.substr(3) + "[" + led + "] = (" + r + ", " + g + ", " + b + ")" + NEWLINE + "np_" + pin.substr(3) + ".show()" + NEWLINE;
};

Blockly.Python.display_controlColorNeopixelLed = function (block) {
    const pin = block.getFieldValue("PIN");
    const ledIndex = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE) || "0";
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    Blockly.Python.neopixel_codeInitialization(pin, "30");
    return "np_" + pin.substr(3) + "[" + ledIndex + "] = " + colour + NEWLINE + "np_" + pin.substr(3) + ".show()" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedRGB = function (block) {
    const pin = block.getFieldValue("PIN");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_TI_83.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ", " + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.display_neopixel_controlAllLedPalette = function (block) {
    const pin = block.getFieldValue("PIN");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_TI_83.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ", " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.display_rainbowNeopixel = function (block) {
    const pin = block.getFieldValue("PIN");
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(pin, "30");
    }
    Blockly.Python.addFunction('neopixel_showAllLed', FUNCTIONS_TI_83.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Python.addFunction('neopixel_rainbow', FUNCTIONS_TI_83.DEF_TI_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(np_" + pin.substr(3) + ", " + NEOPIXEL_LED_COUNT + pin.substr(3) + ")" + NEWLINE;
};

Blockly.Python.microbit_neopixel_switchOff = function (block) {
    const pin = block.getFieldValue("PIN");
    if (!Blockly.Python.neopixel_checkDefinedBlock(block, pin)) {
        Blockly.Python.neopixel_codeInitialization(pin, "30");
    }
    return "np_" + pin.substr(3) + ".clear()" + NEWLINE;
};

Blockly.Python.microbit_neopixel_color = function (block) {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_neopx', IMPORT_MB_NEOPX);
    const pin = block.getFieldValue("PIN");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return `color = Color('${pin}')` + NEWLINE + `color.rgb(${r}, ${g}, ${b})` + NEWLINE;
}

// Micro:bit - output

Blockly.Python.display_setGroveSocketLed = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    Blockly.Python.addInit('ledModule_' + pin, "# LED Module on " + pin);
    return pin + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.actuators_setServoAngle = function (block) {
    const pin = block.getFieldValue("PIN");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    Blockly.Python.addFunction('ti_set_servo', FUNCTIONS_TI_83.DEF_TI_SERVO_SET_ANGLE);
    return "ti_set_servo(" + pin + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.actuators_setMotorPower = function (block) {
    const pin = block.getFieldValue("PIN");
    const power = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    return "grove.power(" + pin + ", " + power + ")" + NEWLINE;
};

Blockly.Python.actuators_setGroveRelayState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    Blockly.Python.addImport('mb_pins', IMPORT_MB_PINS);
    return "grove.relay(" + pin + ", " + state + ")" + NEWLINE;
};
