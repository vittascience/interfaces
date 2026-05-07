/**
 * @fileoverview Actuators generators for Eliobot.
 */

const addMotorDefs = function () {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('pwmio', IMPORT_PWMIO);
    Blockly.Python.addImport('analogio', IMPORT_ANALOGIO);
    Blockly.Python.addInit('vBatt_pin', 'vBatt_pin = analogio.AnalogIn(board.BATTERY)');
    Blockly.Python.addInit('motor_pins',
        'AIN1 = pwmio.PWMOut(board.IO36)' + NEWLINE +
        'AIN2 = pwmio.PWMOut(board.IO38)' + NEWLINE +
        'BIN1 = pwmio.PWMOut(board.IO35)' + NEWLINE +
        'BIN2 = pwmio.PWMOut(board.IO37)');
    Blockly.Python.addInit('motors', 'motors = Motors(AIN1, AIN2, BIN1, BIN2, vBatt_pin)');
}

Blockly.Python.robot_move = function (block) {
    addMotorDefs();
    Blockly.Python.addInit('speed', 'speed = 100');
    const direction = block.getFieldValue('DIRECTION') || 'forward';
    switch (direction) {
        case 'forward':
            return `motors.move_forward(speed)` + NEWLINE;
        case 'backward':
            return `motors.move_backward(speed)` + NEWLINE;
    }
};

Blockly.Python.robot_rotate = function (block) {
    addMotorDefs();
    Blockly.Python.addInit('speed', 'speed = 100');
    const direction = block.getFieldValue('DIRECTION') || 'left';
    let code = '';
    switch (direction) {
        case 'left':
            code += `motors.turn_left(speed)` + NEWLINE;
            break;
        case 'right':
            code += `motors.turn_right(speed)` + NEWLINE;
            break;
    }
    return code;
};

Blockly.Python.robot_rotate_forever = function (block) {
    addMotorDefs();
    Blockly.Python.addInit('speed', 'speed = 100');
    const direction = block.getFieldValue('DIRECTION') || 'left';
    return `motors.turn_${direction}(speed)` + NEWLINE;
};

Blockly.Python.robot_stop = function () {
    addMotorDefs();
    return `motors.motor_stop()` + NEWLINE;
};

Blockly.Python.robot_setSpeed = function (block) {
    addMotorDefs();
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE) || '50';
    if (speed < 0) speed = 0;
    if (speed > 100) speed = 100;
    return `speed = ${speed}` + NEWLINE;
};

Blockly.Python.robot_rotate_degrees = function (block) {
    addMotorDefs();
    const angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_NONE) || '1';
    const direction = block.getFieldValue('DIRECTION');
    switch (direction) {
        case 'left':
            return `motors.turn_one_step("left", ${angle})` + NEWLINE;
        case 'right':
            return `motors.turn_one_step("right", ${angle})` + NEWLINE;
    }
};

Blockly.Python.robot_spin_one_wheel = function (block) {
    addMotorDefs();
    Blockly.Python.addInit('speed', 'speed = 100');
    const wheel = block.getFieldValue('WHEEL');
    const direction = block.getFieldValue('DIRECTION');
    if (wheel === 'left') {
        if (direction === 'forward') {
            return `motors.spin_left_wheel_forward(speed)` + NEWLINE;
        } else if (direction === 'backward') {
            return `motors.spin_left_wheel_backward(speed)` + NEWLINE;
        }
    } else if (wheel === 'right') {
        if (direction === 'forward') {
            return `motors.spin_right_wheel_forward(speed)` + NEWLINE;
        } else if (direction === 'backward') {
            return `motors.spin_right_wheel_backward(speed)` + NEWLINE;
        }
    }
};

Blockly.Python.robot_move_one_step = function (block) {
    addMotorDefs();
    Blockly.Python.addInit('distance', 'distance = 20');
    const direction = block.getFieldValue('DIRECTION');
    const step = Blockly.Python.valueToCode(block, 'STEP', Blockly.Python.ORDER_NONE) || '1';
    let code = 'for i in range(' + step + '):' + NEWLINE;
    code += TAB + `motors.move_one_step("${direction}", distance)` + NEWLINE;
    return code;
};

Blockly.Python.robot_turn90 = function (block) {
    addMotorDefs();
    const direction = block.getFieldValue('DIRECTION');
    return `motors.turn_one_step("${direction}", 90)` + NEWLINE;
};

Blockly.Python.robot_set_square_size = function (block) {
    addMotorDefs();
    const size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_NONE) || '20';
    return `distance = ${size}` + NEWLINE;
};

Blockly.Python.robot_waiting = function (block) {
    addMotorDefs();
    const time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE) || '1';
    const unit = block.getFieldValue('UNIT');
    return (unit === 'ms' ? `time.sleep(${time}/1000)` : `time.sleep(${time})`) + NEWLINE + 'motors.motor_stop()' + NEWLINE;
};

const addBuzzerDefs = function () {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('pwmio', IMPORT_PWMIO);
    Blockly.Python.addInit('buzzer', 'buzzer = Buzzer(pwmio.PWMOut(board.IO17, variable_frequency=True))');
    Blockly.Python.addInit('volume', 'volume = 100');
};

Blockly.Python.actuators_frequency = function (block) {
    addBuzzerDefs();
    const frequency = Blockly.Python.valueToCode(block, 'FREQUENCY', Blockly.Python.ORDER_NONE) || '440';
    const time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE) || '1';
    const unit = block.getFieldValue('UNIT'); 
    return 'buzzer.play_tone(' + frequency + ', ' + (unit === 'ms' ? time / 1000 : time) + ', volume)' + NEWLINE;
};

Blockly.Python.actuators_playnote = function (block) {
    addBuzzerDefs();
    const note = block.getFieldValue('NOTE');
    const unit = block.getFieldValue('UNIT');
    const time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE) || '1';
    return 'buzzer.play_tone(' + note + ', ' + (unit === 'ms' ? time / 1000 : time) + ', volume)' + NEWLINE;
};

Blockly.Python.actuators_setvolume = function (block) {
    const volume = Blockly.Python.valueToCode(block, 'VOLUME', Blockly.Python.ORDER_NONE) || '50';
    return 'volume = ' + volume + NEWLINE;
};

Blockly.Python.actuators_playmusic = function (block) {
    addBuzzerDefs();
    let code = '';
    const music = block.getFieldValue('MUSIC');
    switch (music) {
        case 'totallyspies':
            code = 'NOTES_FREQUENCIES = {\n  \'C\': 554,\n  \'E\': 659,\n  \'B\': 494,}\n\n';
            code += 'totally_spies_melody = [\n (\'E\', 0.086), (\'C\', 0.065), (\'C\', 0.451), (\'B\', 0.086), (\'C\', 0.027), (\'E\', 0.109),]\n\n';
            code += 'for note, duration in totally_spies_melody:\n  buzzer.play_note(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n';
            break;
        case 'starwars':
            code = 'NOTES_FREQUENCIES = {\n \'B\': 740,\n \'C\': 987.8,\n \'D\': 1480,\n \'E\': 1318.4,\n \'F\': 1244.4,\n \'G\': 1108.8,\n \'H\': 1975.6,\n}\n';
            code += 'StarWars_melody = [\n(\'B\', 0.1667),(\'B\', 0.1667),(\'B\', 0.1667),(\'C\', 1),(\'D\', 1),(\'E\', 0.1667),(\'F\', 0.1667),(\'G\', 0.1667),(\'H\', 1),(\'D\', 0.5),\n(\'E\', 0.1667),(\'F\', 0.1667),(\'G\', 0.1667),(\'H\', 1),(\'D\', 0.5),(\'E\', 0.1667),\n(\'F\', 0.1667),(\'E\', 0.1667),(\'G\', 1),(\'B\', 0.1667),(\'B\', 0.1667),(\'B\', 0.1667),(\'C\', 1),(\'D\', 1),(\'E\', 0.1667),(\'F\', 0.1667),(\'G\', 0.1667),(\'H\', 1),(\'D\', 0.5),\n(\'E\', 0.1667),(\'F\', 0.1667),(\'G\', 0.1667),(\'H\', 1),(\'D\', 0.5),(\'E\', 0.1667),(\'F\', 0.1667),(\'E\', 0.1667),(\'G\', 0.6667),]\n\n';
            code += 'for note, duration in StarWars_melody:\n  buzzer.play_note(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
            break;
        case 'piratesdescaraibes':
            code = 'NOTES_FREQUENCIES = {\n     \'B\': 1174.8,\n     \'C\': 1318.4,\n     \'D\': 1396.8,\n     \'E\': 1568,\n     \'F\': 1760,\n     \'G\': 1046.4,\n     \'A\': 0.1,\n   }\n\n';
            code += 'Pirate_des_caraibes_melody = [\n(\'B\', 0.15),(\'C\', 0.15),(\'D\', 0.6),(\'E\', 0.15),(\'F\', 0.15),(\'E\', 0.3),(\'D\', 0.3),(\'C\', 0.3),(\'D\', 0.3),(\'E\', 0.3),\n(\'F\', 0.3),(\'E\', 0.3),(\'A\', 0.3),(\'D\', 0.15),(\'E\', 0.15),(\'F\', 0.3),\n(\'A\', 0.3),(\'E\', 0.15),(\'D\', 0.15),(\'C\', 0.3),(\'D\', 0.3),(\'C\', 0.3),(\'B\', 0.3),(\'A\', 0.3),(\'C\', 0.15),(\'G\', 0.15),(\'B\', 0.3),(\'A\', 0.15),(\'A\', 0.3),\n(\'B\', 0.15),(\'C\', 0.15),(\'D\', 0.3),(\'A\', 0.3),(\'C\', 0.15),(\'D\', 0.15),(\'E\', 0.3),(\'D\', 0.3),(\'E\', 0.3),]\n\n';
            code += 'for note, duration in Pirate_des_caraibes_melody:\n  buzzer.play_note(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
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
            code += 'for note, duration in melody:\n  buzzer.play_note(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
            break;
        case 'simpsons':
            code = 'NOTES_FREQUENCIES = {\n  \'A\': 1046.4,\n  \'B\': 1318.4,\n  \'C\': 1480,\n  \'D\': 1760,\n  \'E\': 1568,\n  \'F\': 880,\n  \'G\': 740,\n  \'H\': 784,\n  \'I\': 932,\n  \'J\': 0.1,\n  }\n\n';
            code += 'melody = [\n(\'A\', 0.5625),(\'B\', 0.375),(\'C\', 0.375),(\'D\', 0.1875),(\'E\', 0.5625),(\'B\', 0.375),(\'A\', 0.375),(\'F\', 0.1875),(\'G\', 0.1875),(\'G\', 0.1875),(\'G\', 0.1875),(\'H\', 0.75),(\'J\', 0.1875),(\'J\', 0.1875),(\'G\', 0.1875),(\'G\', 0.1875),(\'G\', 0.1875),(\'H\', 0.1875),(\'I\', 0.5625),(\'A\', 0.1875),(\'A\', 0.1875),(\'A\', 0.1875),(\'A\', 0.375),\n]\n\n';
            code += 'for note, duration in melody:\n  buzzer.play_note(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
            break;
        case 'police':
            code = 'NOTES_FREQUENCIES = {\n\'A\': 698.4,\n\'B\': 880.0,\n}\n\n';
            code += 'melody = [\n(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5),(\'A\', 0.5),(\'B\', 0.5), \n]\n\n';
            code += 'for note, duration in melody:\n  buzzer.play_note(note, duration, NOTES_FREQUENCIES, volume)\n  time.sleep(0.05)\n\n';
            break;
    }
    return code;
};

Blockly.Python.actuators_play_sound = function (block) {
    addBuzzerDefs();
    const sound = block.getFieldValue('SOUND');
    return 'buzzer.' + sound + '()' + NEWLINE;
};