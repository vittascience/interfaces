/**
 * @fileoverview Communication generators for Nao.
 */

// Blockly.Python.communication_animatedSpeech_say = function (block) {
//     Blockly.Python.addImport('asr_service', IMPORT_ASR_SERVICE);
//     const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "";
//     return `asr_service.say(${text})` + NEWLINE;
// };

Blockly.Python.communication_textToSpeech_say = function (block) {
    Blockly.Python.addImport('tts', IMPORT_TTS);
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "";
    return `tts.say(${text})` + NEWLINE;
};

Blockly.Python.communication_asr_setLanguage = function (block) {
    Blockly.Python.addImport('asr_service', IMPORT_ASR_SERVICE);
    const language = block.getFieldValue("LANGUAGE");
    return `asr.setLanguage("${language}")` + NEWLINE;
};

Blockly.Python.communication_asr_setVocabulary = function (block) {
    Blockly.Python.addImport('asr_service', IMPORT_ASR_SERVICE);
    const vocabulary = Blockly.Python.valueToCode(block, "VOCABULARY", Blockly.Python.ORDER_NONE) || [""];
    return `asr.setVocabulary(${vocabulary})` + NEWLINE;
}

Blockly.Python.communication_asr_startRecognition = function (block) {
    Blockly.Python.addImport('asr_service', IMPORT_ASR_SERVICE);
    return `asr.startRecognition(on_speech_recognized)` + NEWLINE;
}

Blockly.Python.communication_asr_stopRecognition = function (block) {
    Blockly.Python.addImport('asr_service', IMPORT_ASR_SERVICE);
    return `asr.stopRecognition()` + NEWLINE;
}

Blockly.Python.communication_asr_getLastWord_callback_decorated = function (block) {
    Blockly.Python.addImport('asr_service', IMPORT_ASR_SERVICE);
    const statement = Blockly.Python.statementToCode(block, "DO") || `${Blockly.Python.INDENT}pass${NEWLINE}`;
    const variable = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const functionCallback = `def on_speech_recognized(${variable}):${NEWLINE}${statement}` + NEWLINE;
    Blockly.Python.addFunction('on_speech_recognized', functionCallback);
    return '';
}