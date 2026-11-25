/**
 * @fileoverview Sound generators for Matatalab.
 */

Blockly.Python.sound_playNote = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const note = block.getFieldValue("NOTE");
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "500";
    return `matatalab.play_note("${note}", ${duration})` + NEWLINE;
};

Blockly.Python.sound_playMelody = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    return `matatalab.play_melody(${id})` + NEWLINE;
};

Blockly.Python.sound_playMusic = function (block) {
    Blockly.Python.addImport('matatalab', IMPORT_MATATALAB);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "1";
    return `matatalab.play_music(${id})` + NEWLINE;
};
