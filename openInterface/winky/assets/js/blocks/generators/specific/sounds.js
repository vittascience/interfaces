/**
 * @fileoverview Sensors generators for Winky.
 */

Blockly.Python.sounds_setVolume = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const volume = Blockly.Python.valueToCode(block, "VOLUME", Blockly.Python.ORDER_NONE) || "0";
    if (isNaN(volume)){
        return `winky.set_volume(map(${volume}, 0, 100, 0, 255), 3))` + NEWLINE;
    }
    return `winky.set_volume(${Math.round((volume / 100) * 255)})` + NEWLINE;
};

Blockly.Python.sounds_playSound = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addImport('winky_sounds', IMPORT_WINKY_SOUNDS);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    let sound = block.getFieldValue("SOUND") || "Amused01";
    sound = sound.split(',');
    if (sound.length > 1) {
        sound = sound[Math.floor(Math.random() * sound.length)];
    } else {
        sound = sound[0];
    }
    return `winky.set_play_sound(SoundPreset.${sound})` + NEWLINE;
};