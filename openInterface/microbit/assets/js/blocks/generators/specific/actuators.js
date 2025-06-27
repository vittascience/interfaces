/**
 * @fileoverview Actuators generators for Micro:bit.
 */

Blockly.Python.actuators_setServoAngle = function (block) {
    const pin = block.getFieldValue("PIN");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('servo_module_' + pin, "# Servo on " + pin);
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_MICROBIT.DEF_SERVO_SET_ANGLE);
    return "setServoAngle(" + pin + ", " + angle + ")" + NEWLINE;
};

Blockly.Python.actuators_continuousServo_setSpeed = function (block) {
    const pin = block.getFieldValue("PIN");
    const dir = block.getFieldValue("DIR");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    Blockly.Python.addFunction('setServoSpeed', FUNCTIONS_MICROBIT.DEF_SERVO_SET_SPEED);
    Blockly.Python.addInit('continuous_servo_module_' + block.getFieldValue("PIN"), "# Continuous Servo on " + block.getFieldValue("PIN"));
    return "setServoSpeed(" + pin + ", " + dir + ", " + speed + ")" + NEWLINE;
};

Blockly.Python.actuators_setMotorPower = function (block) {
    const pin = block.getFieldValue("PIN");
    const power = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('motor_module_' + pin, "# Motor on " + pin);
    return pin + ".write_analog(" + power + ")" + NEWLINE;
};

Blockly.Python.actuators_setFanPower = function (block) {
    const pin = block.getFieldValue("PIN");
    const power = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('motor_module_' + pin, "# Fan on " + pin);
    return pin + ".write_analog(" + power + ")" + NEWLINE;
};

Blockly.Python.actuators_setVibrationMotorState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('vibration_motor_module_' + pin, "# Vibration Motor on " + pin);
    return pin + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.actuators_setGroveRelayState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return pin + ".write_digital(" + state + ")" + NEWLINE;
};

// KITRONIK MOTOR DRIVER 

Blockly.Python.actuators_kitronik_controlMotor = function (block) {
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const motor = block.getFieldValue("MOTOR");
    const direction = block.getFieldValue('DIR');
    Blockly.Python.addFunction('kitronik_controlMotor', FUNCTIONS_MICROBIT.DEF_KITRONIK_CONTROL_MOTOR);
    if (motor === "BOTH") {
        return "kitronik_controlMotor(1, " + direction + ", " + speed + ")" + NEWLINE +
            "kitronik_controlMotor(2, " + direction + ", " + speed + ")" + NEWLINE;
    } else {
        return "kitronik_controlMotor(" + motor + ", " + direction + ", " + speed + ")" + NEWLINE
    }
};

Blockly.Python.actuators_kitronik_stopMotor = function (block) {
    const motor = block.getFieldValue("MOTOR");
    Blockly.Python.addFunction('kitronik_stopMotor', FUNCTIONS_MICROBIT.DEF_KITRONIK_STOP_MOTORS);
    if (motor === "BOTH") {
        return "kitronik_stopMotor(1)" + NEWLINE + "kitronik_stopMotor(2)" + NEWLINE;
    } else {
        return "kitronik_stopMotor(" + motor + ")" + NEWLINE;
    }
};

// MOSFET

Blockly.Python.actuators_mosfet_setState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || '0';
    Blockly.Python.addInit('mosfet_module_' + block.getFieldValue("PIN"), "# MOSFET on " + block.getFieldValue("PIN"));
    return pin + ".write_analog(1023 if " + state + " else  0)" + NEWLINE;
};

Blockly.Python.actuators_mosfet_setPercentValue = function (block) {
    const pin = block.getFieldValue("PIN");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || '0';
    Blockly.Python.addInit('mosfet_module_' + block.getFieldValue("PIN"), "# MOSFET on " + block.getFieldValue("PIN"));
    return pin + ".write_analog(1023*" + value + "/100)" + NEWLINE;
};

// KITRONIC TRAFFIC

Blockly.Python.actuators_controlAccessBitBarrier = function (block) {
    const action = block.getFieldValue("ACTION");
    const angle = action == "RAISE" ? 0 : 65
    Blockly.Python.addInit('servo_module_pin0', "# Servo on pin0");
    Blockly.Python.addFunction('setServoAngle', FUNCTIONS_MICROBIT.DEF_SERVO_SET_ANGLE);
    return `setServoAngle(pin0, ${angle})` + NEWLINE;

}

Blockly.Python.actuators_controlAccessBitBuzzer = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('music', IMPORT_MUSIC);
    Blockly.Python.addInit('buzzer_module_pin1', "# Buzzer on pin1");
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    return `music.pitch(440, duration=${value}, pin=pin1)` + NEWLINE;
}
// MUSIC

Blockly.Python.actuators_playMusicGroveBuzzer = function (block) {
    const pin = block.getFieldValue("PIN");
    const music = block.getFieldValue("MUSIC");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('buzzer_module_' + block.getFieldValue("PIN"), "# Buzzer on " + block.getFieldValue("PIN"));
    Blockly.Python.addFunction('pitch', FUNCTIONS_MICROBIT.DEF_BUZZER_PITCH);
    switch (music) {
        case "CARRIBEAN_PIRATES":
            Blockly.Python.addFunction('BuzzerCarribeanPirates', FUNCTIONS_MICROBIT.DEF_BUZZER_CARRIBEAN_PIRATES);
            return "BuzzerCarribeanPirates(" + pin + ")" + NEWLINE;
        case "GAMME":
            Blockly.Python.addFunction('BuzzerGamme', FUNCTIONS_MICROBIT.DEF_BUZZER_GAMME);
            return "BuzzerGamme(" + pin + ")" + NEWLINE;
        case "SW":
            Blockly.Python.addFunction('BuzzerStarWars', FUNCTIONS_MICROBIT.DEF_BUZZER_STAR_WARS);
            return "BuzzerStarWars(" + pin + ")" + NEWLINE;
        case "R2D2":
            Blockly.Python.addFunction('BuzzerR2D2', FUNCTIONS_MICROBIT.DEF_BUZZER_R2D2);
            return "BuzzerR2D2(" + pin + ")" + NEWLINE;
        default:
            throw Error("Unhandled music option: " + music);
    }
};

Blockly.Python.actuators_music_playSong = function (block) {
    const song = block.getFieldValue("SONG");
    const pin = block.getFieldValue("PIN");
    const loop = block.getFieldValue("LOOP");
    Blockly.Python.addInit('buzzer_module_' + pin, "# Buzzer on " + pin);
    let code;
    switch (loop) {
        case "ONCE":
            if (pin == 'pin_speaker') {
                code = "music.play(music." + song + ", loop=False)" + NEWLINE;
            } else {
                code = "music.play(music." + song + ", pin=" + pin + ", loop=False)" + NEWLINE;
            }
            break;
        case "LOOP":
            if (pin == 'pin_speaker') {
                code = "music.play(music." + song + ", loop=True)" + NEWLINE;
            } else {
                code = "music.play(music." + song + ", pin=" + pin + ", loop=True)" + NEWLINE;
            }
            break;
        default:
            throw Error("Unhandled loop option for music: " + loop);
    }
    Blockly.Python.addImport('music', IMPORT_MUSIC);
    return code;
};

Blockly.Python.actuators_music_playNotes = function (block) {
    Blockly.Python.addImport('music', IMPORT_MUSIC);
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('buzzer_module_' + pin, "# Buzzer on " + pin);
    let notes = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        notes[i] = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE) || "None";
    }
    if (pin == 'pin_speaker') {
        return "music.play([" + notes.join(", ") + "])" + NEWLINE;
    } else {
        return "music.play([" + notes.join(", ") + "], pin=" + pin + ")" + NEWLINE;
    }
};

Blockly.Python.actuators_music_note = function (block) {
    const note = block.getFieldValue("NOTE");
    let octave = block.getFieldValue("OCTAVE");
    if (octave == "4") octave = "";
    let duration = ":" + block.getFieldValue("DURATION");
    if (duration == ":1") duration = "";
    return ["'" + note + octave + duration + "'", Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.actuators_music_playFrequency = function (block) {
    Blockly.Python.addImport('music', IMPORT_MUSIC);
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('buzzer_module_' + pin, "# Buzzer on " + pin);
    if (pin == 'pin_speaker') {
        return "music.pitch(" + freq + ", duration=" + duration + ")" + NEWLINE;
    } else {
        return "music.pitch(" + freq + ", duration=" + duration + ", pin=" + pin + ")" + NEWLINE;
    }
};

Blockly.Python.actuators_kitronik_playFrequency = function (block) {
    Blockly.Python.addImport('music', IMPORT_MUSIC);
    const freq = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return "music.pitch(" + freq + ", duration=" + duration + ", pin=pin12)" + NEWLINE;
};

Blockly.Python.actuators_music_stop = function (block) {
    Blockly.Python.addImport('music', IMPORT_MUSIC);
    const pin = block.getFieldValue("PIN");
    if (pin == 'pin_speaker') {
        return "music.stop()" + NEWLINE;
    } else {
        return "music.stop(pin=" + pin + ")" + NEWLINE;
    }
};

Blockly.Python.actuators_music_setVolume = function (block) {
    const volume = Blockly.Python.valueToCode(block, "VOL", Blockly.Python.ORDER_NONE);
    return "set_volume(" + volume + ")" + NEWLINE;
};

Blockly.Python.actuators_music_setTempo = function (block) {
    const ticks = Blockly.Python.valueToCode(block, "TICKS", Blockly.Python.ORDER_NONE) || "0";
    const bpm = Blockly.Python.valueToCode(block, "BPM", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('music', IMPORT_MUSIC);
    return "music.set_tempo(ticks=" + ticks + ", bpm=" + bpm + ")" + NEWLINE;
};

Blockly.Python.actuators_music_getTempo = function () {
    Blockly.Python.addImport('music', IMPORT_MUSIC);
    return ["music.get_tempo()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.actuators_speech_saySomething = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    const pitch = Blockly.Python.valueToCode(block, "PITCH", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('speech', IMPORT_SPEECH);
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "speech.say(" + text + ", speed=" + speed + ", pitch=" + pitch + ")" + NEWLINE;
    } else {
        return "speech.say(str(" + text + "), speed=" + speed + ", pitch=" + pitch + ")" + NEWLINE;
    }
};

Blockly.Python.actuators_setElectromagnetState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('vibration_motor_module_' + pin, "# Electromagnet on " + pin);
    return pin + ".write_digital(" + state + ")" + NEWLINE;
};

Blockly.Python.actuators_setWaterAtomizerState = function (block) {
    const pin = block.getFieldValue("PIN");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('vibration_motor_module_' + pin, "# Water Atomizer on " + pin);
    return pin + ".write_digital(" + state + ")" + NEWLINE;
};