/**
 * @fileoverview Sound generators for Photon.
 */

Blockly.Python.sound_animal = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    Blockly.Python.addImport('Sound', IMPORT_SOUND);
    const animal = block.getFieldValue("ANIMAL");
    return `photon.make_sound(Sound.${animal})` + NEWLINE;
};

Blockly.Python.sound_emotion = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    Blockly.Python.addImport('Sound', IMPORT_SOUND);
    const emotion = block.getFieldValue("EMOTION");
    return `photon.make_sound(Sound.${emotion})` + NEWLINE;
};

Blockly.Python.sound_special = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    Blockly.Python.addImport('Sound', IMPORT_SOUND);
    const emotion = block.getFieldValue("SPECIAL");
    return `photon.make_sound(Sound.${emotion})` + NEWLINE;
};

Blockly.Python.sound_behavior = function (block) {
    Blockly.Python.addImport('photon', IMPORT_PHOTON);
    Blockly.Python.addImport('SpecialBehaviors', IMPORT_SPECIAL_BEHAVIORS);
    const emotion = block.getFieldValue("BEHAVIOR");
    return `photon.special_behavior(SpecialBehaviors.${emotion})` + NEWLINE;
};