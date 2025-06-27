/**
 * @fileoverview Actuators generators for CyberPi.
 */

// Audio

Blockly.Python.actuators_audio_play = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const sound = block.getFieldValue("SOUND");
    return "cyberpi.audio.play(\'" + sound + "\')" + NEWLINE; 
};

Blockly.Python.actuators_audio_play_tone = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    if (block.getInput("DURATION")) {
        const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
        return "cyberpi.audio.play_tone(" + frequency + ", " + duration + ")" + NEWLINE; 
    } else {
        return "cyberpi.audio.play_tone(" + frequency + ")" + NEWLINE; 
    }  
};

Blockly.Python.actuators_audio_play_note = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const note = Blockly.Python.valueToCode(block, "NOTE", Blockly.Python.ORDER_NONE) || "0";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.audio.play_music(" + note + ", " + duration + ")" + NEWLINE;
};

Blockly.Python.actuators_audio_play_drum = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const song = block.getFieldValue("SONG");
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.audio.play_drum(\'" + song + "\', " + duration + ")" + NEWLINE;
};

Blockly.Python.actuators_audio_start_recording = function () {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return "cyberpi.audio.record()" + NEWLINE; 
};

Blockly.Python.actuators_audio_stop_recording = function () {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return "cyberpi.audio.stop_record()" + NEWLINE; 
};

Blockly.Python.actuators_audio_play_recording = function () {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return "cyberpi.audio.play_record()" + NEWLINE; 
};

Blockly.Python.actuators_audio_add_tempo = function(block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const tempo_add = Blockly.Python.valueToCode(block, "TEMPO", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.audio.add_tempo(" + tempo_add + ")" + NEWLINE;
};

Blockly.Python.actuators_audio_set_tempo = function(block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const tempo = Blockly.Python.valueToCode(block, "TEMPO", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.audio.set_tempo(" + tempo + ")" + NEWLINE;
};

Blockly.Python.actuators_audio_get_tempo = function() {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return ["cyberpi.audio.get_tempo()", Blockly.Python.ORDER_NONE];
};

Blockly.Python.actuators_audio_add_volume = function(block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const volume_add = Blockly.Python.valueToCode(block, "VOLUME", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.audio.add_vol(" + volume_add + ")" + NEWLINE;
};

Blockly.Python.actuators_audio_set_volume = function(block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const volume = Blockly.Python.valueToCode(block, "VOLUME", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.audio.set_vol(" + volume + ")" + NEWLINE;
};

Blockly.Python.actuators_audio_get_volume = function() {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return ["cyberpi.audio.get_vol()", Blockly.Python.ORDER_NONE];
};

Blockly.Python.actuators_audio_stop = function() {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return "cyberpi.audio.stop()" + NEWLINE;
};

// mBot2 - Motors

Blockly.Python.mbot2_motors_set_power = function(block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const motor = block.getFieldValue("MOTOR");
    const power = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    return "mbot2.motor_set(" + power + ", \'" + motor + "\')" + NEWLINE;
};

Blockly.Python.mbot2_motors_add_power = function(block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const motor = block.getFieldValue("MOTOR");
    const power = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    return "mbot2.motor_add(" + power + ", \'" + motor + "\')" + NEWLINE;
};

Blockly.Python.mbot2_motors_get_power = function(block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const motor = block.getFieldValue("MOTOR");
    return ["mbot2.motor_get(\'" + motor + "\')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.mbot2_motors_stop = function(block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const motor = block.getFieldValue("MOTOR");
    return "mbot2.motor_stop(\'" + motor + "\')" + NEWLINE;
};

// mBot2 - servos

Blockly.Python.mbot2_servos_set_angle = function(block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const port = block.getFieldValue("PORT");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    if (port == 'all') {
        for (var i = 1; i<5; i++) {
            Blockly.Python.addInit('port-S' + i, "# Servo on S" + i);
        }
    } else {
        Blockly.Python.addInit('port-' + port, "# Servo on " + port);
    }
    return "mbot2.servo_set(" + angle + ", \'" + port + "\')" + NEWLINE;
};

Blockly.Python.mbot2_servos_add_angle = function(block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const port = block.getFieldValue("PORT");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addInit('port-' + port, "# Servo on " + port);
    return "mbot2.servo_add(" + angle + ", \'" + port + "\')" + NEWLINE;
};

Blockly.Python.mbot2_servos_get_angle = function(block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const port = block.getFieldValue("PORT");
    Blockly.Python.addInit('port-' + port, "# Servo on " + port);
    return ["mbot2.servo_get(\'" + port + "\')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.mbot2_servos_reset = function(block) {
    Blockly.Python.addImport('mbot2', IMPORT_MBOT2);
    const port = block.getFieldValue("PORT");
    Blockly.Python.addInit('port-' + port, "# Servo on " + port);
    return "mbot2.servo_set(0, \'" + port + "\')" + NEWLINE;
};