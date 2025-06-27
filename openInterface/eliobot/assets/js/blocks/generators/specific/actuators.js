/**
 * @fileoverview Actuators generators for Esp32.
 */

Blockly.Python.robot_move = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || '100';
    const direction = block.getFieldValue('DIRECTION') || 'forward';
    switch (direction) {
        case 'forward':
            return `elio.moveForward(${speed})` + NEWLINE;
        case 'backward':
            return `elio.moveBackward(${speed})` + NEWLINE;
    }
};

Blockly.Python.robot_rotate = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || '100';
    const direction = block.getFieldValue('DIRECTION') || 'left';
    let code = '';
    switch (direction) {
        case 'left':
            code += `elio.turnLeft(${speed})` + NEWLINE;
            break;
        case 'right':
            code += `elio.turnRight(${speed})` + NEWLINE;
            break;
    }
    // code += `time.sleep(0.33)` + NEWLINE;
    // code += `elio.motorStop()` + NEWLINE;
    return code;
};

Blockly.Python.robot_rotate_forever = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || '100';
    const time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_NONE) || "1",
        unit = block.getFieldValue('UNIT') || 's',
        direction = block.getFieldValue('DIRECTION') || 'left';
    let code = '';
    switch (direction) {
        case 'left':
            code += `elio.turnLeft(${speed})` + NEWLINE;
            break;
        case 'right':
            code += `elio.turnRight(${speed})` + NEWLINE;
            break;
    }
    if (unit === "ms") {
        code += 'time.sleep(' + (time / 1000) + ')' + NEWLINE;
    } else {
        code += 'time.sleep(' + time + ')' + NEWLINE;
    }
    code += `elio.motorStop()` + NEWLINE;
    return code;
};

Blockly.Python.robot_stop = function () {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    return `elio.motorStop()` + NEWLINE;
};

Blockly.Python.robot_setSpeed = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE) || '50';
    if (speed < 0) speed = 0;
    if (speed > 100) speed = 100;
    return `speed = ${speed}` + NEWLINE;
};

Blockly.Python.robot_rotate_degrees = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('speed', 'speed = 100');
    const angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_NONE) || '1';
    const direction = block.getFieldValue('DIRECTION');
    let code = '';
    if (angle >= 0) {
        switch (direction) {
            case 'right':
                code += 'elio.turnRight(speed)' + NEWLINE;
                break;
            case 'left':
                code += 'elio.turnLeft(speed)' + NEWLINE;
                break;
        }
    } else {
        code += '';
        angle = -angle;
    }
    const sleepDuration = angle / 180.0 * 0.95; // 1.57 seconds for 90-degree rotation
    code += 'time.sleep(' + sleepDuration + ')' + NEWLINE;
    code += 'elio.motorStop()' + NEWLINE;
    return code;
};

Blockly.Python.robot_spinOneWheel = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || '100';
    const wheel = block.getFieldValue('WHEEL');
    const direction = block.getFieldValue('DIRECTION');
    let code = '';
    if (wheel === 'left') {
        if (direction === 'forward') {
            code = `elio.spinLeftWheelForward(${speed})` + NEWLINE;
        } else if (direction === 'backward') {
            code = `elio.spinLeftWheelBackward(${speed})` + NEWLINE;
        }
    } else if (wheel === 'right') {
        if (direction === 'forward') {
            code = `elio.spinRightWheelForward(${speed})` + NEWLINE;
        } else if (direction === 'backward') {
            code = `elio.spinRightWheelBackward(${speed})` + NEWLINE;
        }
    }
    return code;
};

Blockly.Python.robot_moveOneStep = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_NONE) || '100';
    const number_cases = Blockly.Python.valueToCode(block, 'STEP', Blockly.Python.ORDER_NONE) || '1';
    let code = 'for i in range(' + number_cases + '):' + NEWLINE;
    code += TAB + `elio.moveOneStep(${speed})` + NEWLINE;
    return code;
};

Blockly.Python.actuators_frequency = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('volume', 'volume = 50');
    const frequency = Blockly.Python.valueToCode(block, 'FREQUENCY', Blockly.Python.ORDER_NONE) || '440';
    let time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE) || '1';
    const unit = block.getFieldValue('UNIT'); // Get the selected time type (seconds or milliseconds)
    // Check if the time type is milliseconds and convert to seconds if true
    if (unit === "ms") {
        time = time / 1000; // Convert milliseconds to seconds
    }
    return 'frequency = ' + frequency + '\nelio.playFrequency(frequency, ' + time + ', volume)' + NEWLINE;
};

Blockly.Python.actuators_playnote = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('volume', 'volume = 50');
    const note = block.getFieldValue('NOTE');
    const unit = block.getFieldValue('UNIT');
    let time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE) || '1';
    let code = '';
    if (unit === 'ms') {
        time /= 1000;
    }

    switch (note) {
        case 'do':
            code = 'elio.playFrequency(261.63,' + time + ', volume)';
            break;
        case 're':
            code = 'elio.playFrequency(293.66,' + time + ', volume )';
            break;
        case 'mi':
            code = 'elio.playFrequency(329.63,' + time + ', volume )';
            break;
        case 'fa':
            code = 'elio.playFrequency(349.23,' + time + ', volume )';
            break;
        case 'sol':
            code = 'elio.playFrequency(392.00,' + time + ', volume )';
            break;
        case 'la':
            code = 'elio.playFrequency(440.00,' + time + ', volume )';
            break;
        case 'si':
            code = 'elio.playFrequency(493.88,' + time + ', volume )';
            break;
        case 'do2':
            code = 'elio.playFrequency(523.25,' + time + ', volume )';
            break;
    }
    return code + NEWLINE;
};

Blockly.Python.actuators_setvolume = function (block) {
    const volume = Blockly.Python.valueToCode(block, 'VOLUME', Blockly.Python.ORDER_NONE) || '50';
    return 'volume = ' + volume + NEWLINE;
};

Blockly.Python.actuators_playmusic = function (block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('volume', 'volume = 50');
    let code = '';
    const music = block.getFieldValue('MUSIC');
    switch (music) {
        case 'totallyspies':
            code = 'NOTES_FREQUENCIES = {\n  \'C\': 554,\n  \'E\': 659,\n  \'B\': 494,}\n\n';
            code += 'totally_spies_melody = [\n (\'E\', 0.086), (\'C\', 0.065), (\'C\', 0.451), (\'B\', 0.086), (\'C\', 0.027), (\'E\', 0.109),]\n\n';
            code += 'for note, duration in totally_spies_melody:\n  elio.playNote(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n';
            break;
        case 'starwars':
            code = 'NOTES_FREQUENCIES = {\n \'B\': 740,\n \'C\': 987.8,\n \'D\': 1480,\n \'E\': 1318.4,\n \'F\': 1244.4,\n \'G\': 1108.8,\n \'H\': 1975.6,\n}\n';
            code += 'StarWars_melody = [\n(\'B\', 0.1667),(\'B\', 0.1667),(\'B\', 0.1667),(\'C\', 1),(\'D\', 1),(\'E\', 0.1667),(\'F\', 0.1667),(\'G\', 0.1667),(\'H\', 1),(\'D\', 0.5),\n(\'E\', 0.1667),(\'F\', 0.1667),(\'G\', 0.1667),(\'H\', 1),(\'D\', 0.5),(\'E\', 0.1667),\n(\'F\', 0.1667),(\'E\', 0.1667),(\'G\', 1),(\'B\', 0.1667),(\'B\', 0.1667),(\'B\', 0.1667),(\'C\', 1),(\'D\', 1),(\'E\', 0.1667),(\'F\', 0.1667),(\'G\', 0.1667),(\'H\', 1),(\'D\', 0.5),\n(\'E\', 0.1667),(\'F\', 0.1667),(\'G\', 0.1667),(\'H\', 1),(\'D\', 0.5),(\'E\', 0.1667),(\'F\', 0.1667),(\'E\', 0.1667),(\'G\', 0.6667),]\n\n';
            code += 'for note, duration in StarWars_melody:\n  elio.playNote(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
            break;
        case 'piratesdescaraibes':
            code = 'NOTES_FREQUENCIES = {\n     \'B\': 1174.8,\n     \'C\': 1318.4,\n     \'D\': 1396.8,\n     \'E\': 1568,\n     \'F\': 1760,\n     \'G\': 1046.4,\n     \'A\': 0.1,\n   }\n\n';
            code += 'Pirate_des_caraibes_melody = [\n(\'B\', 0.15),(\'C\', 0.15),(\'D\', 0.6),(\'E\', 0.15),(\'F\', 0.15),(\'E\', 0.3),(\'D\', 0.3),(\'C\', 0.3),(\'D\', 0.3),(\'E\', 0.3),\n(\'F\', 0.3),(\'E\', 0.3),(\'A\', 0.3),(\'D\', 0.15),(\'E\', 0.15),(\'F\', 0.3),\n(\'A\', 0.3),(\'E\', 0.15),(\'D\', 0.15),(\'C\', 0.3),(\'D\', 0.3),(\'C\', 0.3),(\'B\', 0.3),(\'A\', 0.3),(\'C\', 0.15),(\'G\', 0.15),(\'B\', 0.3),(\'A\', 0.15),(\'A\', 0.3),\n(\'B\', 0.15),(\'C\', 0.15),(\'D\', 0.3),(\'A\', 0.3),(\'C\', 0.15),(\'D\', 0.15),(\'E\', 0.3),(\'D\', 0.3),(\'E\', 0.3),]\n\n';
            code += 'for note, duration in Pirate_des_caraibes_melody:\n  elio.playNote(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
            break;
        case 'pinkpanthere':
            code = 'NOTES_FREQUENCIES = {\n  \'A\': 0.1,\n  \'B\': 622.2,\n  \'C\': 659.2,\n  \'D\': 740,\n  \'E\': 784,\n  \'F\': 1046.4,\n  \'G\': 987.8,\n  \'H\': 880,\n  \'I\': 587.4,\n  \'J\': 932.4,\n }\n\n';
            code += 'melody = [\n    ' +
                '(\'B\', 0.1875),' +
                '(\'C\', 0.1875),' +
                '(\'A\', 0.75),' +
                '(\'D\', 0.1875),' +
                '(\'E\', 0.1875),' +
                '(\'A\', 0.75),' +
                '(\'B\', 0.1875),' +
                '(\'C\', 0.1875),' +
                '(\'A\', 0.0938),' +
                '(\'D\', 0.1875),' +
                '(\'E\', 0.1875),' +
                '(\'A\', 0.0938),' +
                '(\'F\', 0.1875),' +
                '(\'G\', 0.1875),' +
                '(\'A\', 0.0938),' +
                '(\'B\', 0.1875),' +
                '(\'C\', 0.1875),' +
                '(\'A\', 0.0938),' +
                '(\'G\', 0.1875),' +
                '(\'J\', 0.75),' +
                '(\'A\', 0.75),' +
                '(\'H\', 0.0938),' +
                '(\'E\', 0.0938),' +
                '(\'C\', 0.0938),' +
                '(\'I\', 0.0938),' +
                '(\'C\', 0.75),' +
                '\n]\n\n';
            code += 'for note, duration in melody:\n  elio.playNote(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
            break;
        case 'simpsons':
            code = 'NOTES_FREQUENCIES = {\n  \'A\': 1046.4,\n  \'B\': 1318.4,\n  \'C\': 1480,\n  \'D\': 1760,\n  \'E\': 1568,\n  \'F\': 880,\n  \'G\': 740,\n  \'H\': 784,\n  \'I\': 932,\n  \'J\': 0.1,\n  }\n\n';
            code += 'melody = [\n(\'A\', 0.5625),(\'B\', 0.375),(\'C\', 0.375),(\'D\', 0.1875),(\'E\', 0.5625),(\'B\', 0.375),(\'A\', 0.375),(\'F\', 0.1875),(\'G\', 0.1875),(\'G\', 0.1875),(\'G\', 0.1875),(\'H\', 0.75),(\'J\', 0.1875),(\'J\', 0.1875),(\'G\', 0.1875),(\'G\', 0.1875),(\'G\', 0.1875),(\'H\', 0.1875),(\'I\', 0.5625),(\'A\', 0.1875),(\'A\', 0.1875),(\'A\', 0.1875),(\'A\', 0.375),\n]\n\n';
            code += 'for note, duration in melody:\n  elio.playNote(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
            break;
        case 'police':
            code = 'NOTES_FREQUENCIES = {\n\'A\': 698.4,\n\'B\': 880.0,\n}\n\n';
            code += 'melody = [\n(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5), \n]\n\n';
            code += 'for note, duration in melody:\n  elio.playNote(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
            break;
    }
    return code;
};