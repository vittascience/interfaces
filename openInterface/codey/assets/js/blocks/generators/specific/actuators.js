/**
 * @fileoverview Actuators generators for Codey.
 */

Blockly.Python.actuators_audio_play_melody = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const melody = block.getFieldValue("MELODY");
    return `speaker.play_melody('${melody}')` + NEWLINE;
};

Blockly.Python.actuators_audio_play_melody_until_done = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const melody = block.getFieldValue("MELODY");
    return `speaker.play_melody_until_done('${melody}')` + NEWLINE;
};

Blockly.Python.actuators_audio_play_note = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const note = Blockly.Python.valueToCode(block, "NOTE", Blockly.Python.ORDER_NONE) || "0";
    if (block.getInput("DURATION")) {
        const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
        return `speaker.play_note(${note}, ${duration})` + NEWLINE;
    }
    return `speaker.play_note(${note})` + NEWLINE;
};

Blockly.Python.actuators_audio_play_tone = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "0";
    if (block.getInput("DURATION")) {
        const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
        return `speaker.play_tone(${frequency}, ${duration})` + NEWLINE;
    }
    return `speaker.play_tone(${frequency})` + NEWLINE;
};

Blockly.Python.actuators_audio_rest = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0";
    return `speaker.rest(${duration})` + NEWLINE;
};

Blockly.Python.actuators_audio_stop_sounds = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return "speaker.stop_sounds()" + NEWLINE;
};

Blockly.Python.actuators_audio_set_volume = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const volume = Blockly.Python.valueToCode(block, "VOLUME", Blockly.Python.ORDER_NONE) || "0";
    return `speaker.volume = ${volume}` + NEWLINE;
};

Blockly.Python.actuators_audio_get_volume = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ["speaker.volume", Blockly.Python.ORDER_NONE];
};

Blockly.Python.actuators_audio_set_tempo = function (block) {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    const tempo = Blockly.Python.valueToCode(block, "TEMPO", Blockly.Python.ORDER_NONE) || "'120'";
    return `speaker.tempo = ${tempo}` + NEWLINE;
};

Blockly.Python.actuators_audio_get_tempo = function () {
    Blockly.Python.addImport('codey', IMPORT_CODEY);
    return ["speaker.tempo", Blockly.Python.ORDER_NONE];
};