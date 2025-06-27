/**
 * @fileoverview Display generators for Winky.
 */

Blockly.Python.display_preset = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addImport('winky_eyes', IMPORT_WINKY_EYES);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const eyes = block.getFieldValue('EYES') || '0';
    const preset = block.getFieldValue('PRESET') || 'Amused';
    return `winky.set_display_preset(option=${eyes}, first_preset=EyesPreset.${preset})` + NEWLINE;
};

Blockly.Python.display_pattern = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const eyes = block.getFieldValue('EYES') || '0';
    let image = "";
    // const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    // const output = [];
    for (let row = 0; row < 8; row++) {
        image += "0b";
        for (let column = 0; column < 8; column++) {
            let label = "LED" + row + "" + column;
            image += (block.getFieldValue(label, Blockly.Python.ORDER_MEMBER) === "TRUE") ? 1 : "0";
            // if (block.getFieldValue(label, Blockly.Python.ORDER_MEMBER) === "TRUE") {
            //     output.push(`"LED_${eyes == 2 ? 'R' : 'L'}_${row+1}${alphabet[column]}"`);
            // }
        }
        image += ",";
    }
    // console.log(output.join(','))
    return `winky.set_display_pattern(first_pattern=[${image.slice(0, -1)}], option=${eyes})` + NEWLINE;
};

Blockly.Python.display_presetEachEye = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addImport('winky_eyes', IMPORT_WINKY_EYES);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const right_eye = block.getFieldValue('PRESET_RIGHT') || 'Amused';
    const left_eye = block.getFieldValue('PRESET_LEFT') || 'Amused';
    return `winky.set_display_preset(option=9, first_preset=EyesPreset.${right_eye}, second_preset=EyesPreset.${left_eye})` + NEWLINE;
};

Blockly.Python.display_number = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const number = Blockly.Python.valueToCode(block, "NUMBER", Blockly.Python.ORDER_NONE);
    return `winky.set_display_number(${number})` + NEWLINE;
};

Blockly.Python.display_text = function (block) {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "";
    const direction = block.getFieldValue('DIRECTION') || '';
    const transition = block.getFieldValue('TRANSITION') || '';
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) { 
        return `winky.set_display_text(${text}, ${direction}, ${transition})` + NEWLINE;
    }
    return `winky.set_display_text(str(${text}), ${direction}, ${transition})` + NEWLINE;
};

Blockly.Python.display_clearEyes = function () {
    Blockly.Python.addImport('winky', IMPORT_WINKY);
    Blockly.Python.addInit('winkyObject', "winky = WinkyObject()");
    return `winky.set_display_pattern(first_pattern=[0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000], option=0)`;
};