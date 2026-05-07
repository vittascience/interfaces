/**
 * @fileoverview Display generators for Eliobot.
 */

// Définition du code du bloc LED RGB
Blockly.Python.display_controlBuiltInLED = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('LED', '# Built in Neopixel declaration' + NEWLINE + 'pixels = neopixel.NeoPixel(board.NEOPIXEL, 1, brightness=0.2, auto_write=False, pixel_order=neopixel.GRB)');
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    code = 'pixels.fill((' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + '))' + NEWLINE + 'pixels.show()';
    return code + NEWLINE;
};

Blockly.Python.display_controlBuiltInLEDOff = function () {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('neopixel', IMPORT_NEOPIXEL);
    Blockly.Python.addInit('LED', '# Built in Neopixel declaration \npixels = neopixel.NeoPixel(NEOPIXEL, 1, brightness=0.2, auto_write=False, pixel_order=neopixel.GRB)');
    const code = 'pixels.fill((0, 0, 0))\npixels.show()\n';
    return code + NEWLINE;
};

// Eyes

const EYE_MATRIX_PORT = 'board.IO2';

Blockly.Python.display_eyes_color = function (block) {
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];
    const eyesSide = block.getFieldValue('EYE_SIDE');
    const side =
        eyesSide === 'BOTH' ? '' : `_${eyesSide.toLowerCase()}`;
    if (eyesSide === 'BOTH') {
        return `eye_color_right = (${r}, ${g}, ${b})\neye_color_left = (${r}, ${g}, ${b})\n`;
    }
    return `eye_color${side} = (${r}, ${g}, ${b})` + NEWLINE;
};

Blockly.Python.display_eyes_emotion = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('define_eye_matrix', `eyes_matrix = EyesMatrix(${EYE_MATRIX_PORT})`);
    const emotion = block.getFieldValue('EMOTION');
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];
    const emotionMapping = {
        'TIRED': 'emotionTired',
        'HAPPY': 'emotionHappy',
        'DIZZY': 'emotionDizzy',
        'CONFUSED': 'emotionConfused',
        'NEUTRAL': 'emotionNeutral',
        'MUSIC': 'emotionMusic',
        'LOVE': 'emotionLove',
        'KO': 'emotionKO',
        'AMAZED': 'emotionAmazed',
        'SAD': 'emotionSad',
        'ANGRY': 'emotionAngry',
        'THRILLED': 'emotionThrilled',
        'RIGHT_ARROW': 'arrowRight',
        'LEFT_ARROW': 'arrowLeft',
        'DOWN_ARROW': 'arrowDown',
        'UP_ARROW': 'arrowUp',
    };
    return `eyes_matrix.set_matrix_logo(eyes_matrix.${emotionMapping[emotion]}, (${r}, ${g}, ${b}))` + NEWLINE;
};

Blockly.Python.display_eyes_matrix = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('define_eye_matrix', `eyes_matrix = EyesMatrix(${EYE_MATRIX_PORT})`);

    const hexToRgbTuple = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `(${r}, ${g}, ${b})`;
    };

    let matrixRight = [];
    let matrixLeft = [];
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const rightColor = block.getFieldValue(`RIGHT_EYE_${row}_${col}`);
            const leftColor = block.getFieldValue(`LEFT_EYE_${row}_${col}`);
            matrixRight.push(hexToRgbTuple(rightColor));
            matrixLeft.push(hexToRgbTuple(leftColor));
        }
    }
    return `eye_matrix_right = [${matrixRight.join(', ')}]` + NEWLINE +
        `eye_matrix_left = [${matrixLeft.join(', ')}]` + NEWLINE +
        `eye_matrix_final = eye_matrix_right + eye_matrix_left` + NEWLINE +
        `eyes_matrix.set_matrix_colors(eye_matrix_final)` + NEWLINE;
};

Blockly.Python.display_eyes_matrix_unicolor = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('define_eye_matrix', `eyes_matrix = EyesMatrix(${EYE_MATRIX_PORT})`);
    Blockly.Python.addInit('define_eye_color', 'eye_color_right = (152,115,172)\neye_color_left = (152,115,172)');

    let eyeColorRight = 'eye_color_right';
    let eyeColorLeft = 'eye_color_left';

    let rightEyeMatrix = [];
    let leftEyeMatrix = [];
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const rightEye = block.getFieldValue(`RIGHT_EYE_${row}_${col}`);
            const leftEye = block.getFieldValue(`LEFT_EYE_${row}_${col}`);
            if (rightEye && rightEye.toLowerCase() === 'true') {
                rightEyeMatrix.push(eyeColorRight);
            } else {
                rightEyeMatrix.push('(0, 0, 0)');
            }
            if (leftEye && leftEye.toLowerCase() === 'true') {
                leftEyeMatrix.push(eyeColorLeft);
            } else {
                leftEyeMatrix.push('(0, 0, 0)');
            }
        }
    }
    return (
        `eye_matrix_right = [${rightEyeMatrix.join(', ')}]\n` +
        `eye_matrix_left = [${leftEyeMatrix.join(', ')}]\n` +
        `eye_matrix_final = eye_matrix_right + eye_matrix_left\n` +
        `eyes_matrix.set_matrix_colors(eye_matrix_final)\n`
    );
};