/**
 * @fileoverview Python generators of the UNIHIKER M10 blocks (unihiker GUI and PinPong libraries).
 */

// Screen of the board (unihiker GUI)
Blockly.Python.unihikerGui = function () {
    Blockly.Python.addImport('gui', IMPORT_GUI);
    Blockly.Python.addInit('gui', 'gui = GUI()');
    return 'gui';
};

// Board, sensors and pins (PinPong): the board is started once
Blockly.Python.unihikerBoard = function () {
    Blockly.Python.addImport('pinpong_board', IMPORT_PINPONG_BOARD);
    Blockly.Python.addImport('pinpong_unihiker', IMPORT_PINPONG_UNIHIKER);
    Blockly.Python.addInit('pinpong_board', 'Board("UNIHIKER").begin()');
};

// Pin of the board in a mode, created at its first use
Blockly.Python.unihikerPin = function (pin, mode) {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addFunction('pin', FUNCTIONS_UNIHIKER.DEF_PIN);
    return 'pin(Pin.' + pin + ', Pin.' + mode + ')';
};

const unihikerValue = (block, name, fallback) => Blockly.Python.valueToCode(block, name, Blockly.Python.ORDER_NONE) || fallback;

// The variables of the program are global in the functions of the events (else an assignment makes them local)
Blockly.Python.unihikerGlobals = function (workspace) {
    const names = Blockly.Variables.allUsedVarModels(workspace).map(variable => Blockly.Python.nameDB_.getName(variable.getId(), Blockly.Names.NameType.VARIABLE));
    return names.length ? Blockly.Python.INDENT + 'global ' + names.join(', ') + NEWLINE : '';
};

// Function run by an event (button, touch button): defined after the setup, then given to the event
Blockly.Python.unihikerEvent = function (block, name, register) {
    const functionName = Blockly.Python.nameDB_.getDistinctName(name, Blockly.Names.NameType.PROCEDURE);
    const statements = Blockly.Python.unihikerGlobals(block.workspace) + (Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS);
    Blockly.Python.addFunction(functionName, 'def ' + functionName + '():' + NEWLINE + statements);
    Blockly.Python.addImport('threading', IMPORT_THREADING);
    Blockly.Python.addFunction('run_event', FUNCTIONS_UNIHIKER.DEF_RUN_EVENT);
    Blockly.Python.addEvent(functionName, register('run_event(' + functionName + ')'));
    return '';
};

// Display

Blockly.Python.display_unihiker_text = function (block) {
    Blockly.Python.unihikerGui();
    Blockly.Python.addFunction('screen_text', FUNCTIONS_UNIHIKER.DEF_SCREEN_TEXT);
    const number = unihikerValue(block, 'NUMBER', '1');
    const text = unihikerValue(block, 'TEXT', '""');
    const x = unihikerValue(block, 'X', '0');
    const y = unihikerValue(block, 'Y', '0');
    const size = unihikerValue(block, 'SIZE', '14');
    const color = unihikerValue(block, 'COLOR', '(0, 0, 0)');
    return 'screen_text(' + number + ', ' + text + ', ' + x + ', ' + y + ', ' + size + ', ' + color + ')' + NEWLINE;
};

Blockly.Python.display_unihiker_clear = function () {
    Blockly.Python.unihikerGui();
    Blockly.Python.addFunction('screen_clear', FUNCTIONS_UNIHIKER.DEF_SCREEN_CLEAR);
    return 'screen_clear()' + NEWLINE;
};

Blockly.Python.display_unihiker_rect = function (block) {
    Blockly.Python.unihikerGui();
    const args = ['x', 'y', 'w', 'h'].map(arg => arg + '=' + unihikerValue(block, arg.toUpperCase(), '0'));
    return 'gui.' + block.getFieldValue('FILL') + '_rect(' + args.join(', ') + ', color=' + unihikerValue(block, 'COLOR', '(0, 0, 0)') + ')' + NEWLINE;
};

Blockly.Python.display_unihiker_circle = function (block) {
    Blockly.Python.unihikerGui();
    const args = ['x', 'y', 'r'].map(arg => arg + '=' + unihikerValue(block, arg.toUpperCase(), '0'));
    return 'gui.' + block.getFieldValue('FILL') + '_circle(' + args.join(', ') + ', color=' + unihikerValue(block, 'COLOR', '(0, 0, 0)') + ')' + NEWLINE;
};

Blockly.Python.display_unihiker_line = function (block) {
    Blockly.Python.unihikerGui();
    const args = ['x0', 'y0', 'x1', 'y1'].map(arg => arg + '=' + unihikerValue(block, arg.toUpperCase(), '0'));
    return 'gui.draw_line(' + args.join(', ') + ', color=' + unihikerValue(block, 'COLOR', '(0, 0, 0)') + ')' + NEWLINE;
};

Blockly.Python.display_unihiker_qrcode = function (block) {
    Blockly.Python.unihikerGui();
    const size = unihikerValue(block, 'SIZE', '100');
    return 'gui.draw_qr_code(text=str(' + unihikerValue(block, 'TEXT', '""') + '), x=' + unihikerValue(block, 'X', '0') + ', y='
        + unihikerValue(block, 'Y', '0') + ', w=' + size + ')' + NEWLINE;
};

Blockly.Python.display_unihiker_on_touch_button = function (block) {
    Blockly.Python.unihikerGui();
    const text = JSON.stringify(block.getFieldValue('TEXT'));
    return Blockly.Python.unihikerEvent(block, 'on_touch_button', (name) => 'gui.add_button(text=' + text + ', x=' + block.getFieldValue('X')
        + ', y=' + block.getFieldValue('Y') + ', w=100, h=40, onclick=' + name + ')');
};

// Display - tic-tac-toe on the touch screen
Blockly.Python.unihikerTictactoe = function () {
    Blockly.Python.unihikerGui();
    Blockly.Python.addFunction('tictactoe', FUNCTIONS_UNIHIKER.DEF_TICTACTOE);
};

Blockly.Python.display_unihiker_tictactoe_new = function () {
    Blockly.Python.unihikerTictactoe();
    return 'tictactoe_new()' + NEWLINE;
};

Blockly.Python.display_unihiker_tictactoe_on_touch = function (block) {
    Blockly.Python.unihikerTictactoe();
    return Blockly.Python.unihikerEvent(block, 'on_tictactoe_touch', (name) => 'tictactoe_on_touch(' + name + ')');
};

Blockly.Python.display_unihiker_tictactoe_touched = function (block) {
    Blockly.Python.unihikerTictactoe();
    return ["tictactoe['touched'][" + block.getFieldValue('DATA') + ']', Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.display_unihiker_tictactoe_place = function (block) {
    Blockly.Python.unihikerTictactoe();
    return "tictactoe_place(" + unihikerValue(block, 'SYMBOL', "'X'") + ", " + unihikerValue(block, 'ROW', '1') + ', ' + unihikerValue(block, 'COLUMN', '1') + ')' + NEWLINE;
};

Blockly.Python.display_unihiker_tictactoe_is_empty = function (block) {
    Blockly.Python.unihikerTictactoe();
    return ['tictactoe_is_empty(' + unihikerValue(block, 'ROW', '1') + ', ' + unihikerValue(block, 'COLUMN', '1') + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.display_unihiker_tictactoe_state = function (block) {
    Blockly.Python.unihikerTictactoe();
    return ["tictactoe_state('" + block.getFieldValue('STATE') + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};

// Input/Output

Blockly.Python.io_unihiker_on_button = function (block) {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('threading', IMPORT_THREADING);
    Blockly.Python.addFunction('on_button', FUNCTIONS_UNIHIKER.DEF_ON_BUTTON);
    const button = block.getFieldValue('BUTTON');
    const functionName = Blockly.Python.nameDB_.getDistinctName('on_button_' + button, Blockly.Names.NameType.PROCEDURE);
    const statements = Blockly.Python.unihikerGlobals(block.workspace) + (Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS);
    Blockly.Python.addFunction(functionName, 'def ' + functionName + '():' + NEWLINE + statements);
    Blockly.Python.addEvent(functionName, 'on_button(button_' + button + ', ' + functionName + ')');
    return '';
};

Blockly.Python.io_unihiker_is_button_pressed = function (block) {
    Blockly.Python.unihikerBoard();
    return ['button_' + block.getFieldValue('BUTTON') + '.is_pressed() == 1', Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python.io_unihiker_digital_write = function (block) {
    const pin = Blockly.Python.unihikerPin(block.getFieldValue('PIN'), 'OUT');
    return pin + '.write_digital(int(' + unihikerValue(block, 'STATE', '0') + '))' + NEWLINE;
};

// HIGH / LOW of the digital pins
Blockly.Python.io_digital_signal = function (block) {
    return [block.getFieldValue("BOOL") === "HIGH" ? "1" : "0", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.io_unihiker_digital_read = function (block) {
    return [Blockly.Python.unihikerPin(block.getFieldValue('PIN'), 'IN') + '.read_digital()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.io_unihiker_analog_read = function (block) {
    return [Blockly.Python.unihikerPin(block.getFieldValue('PIN'), 'ANALOG') + '.read_analog()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.io_unihiker_pwm_write = function (block) {
    const pin = Blockly.Python.unihikerPin(block.getFieldValue('PIN'), 'PWM');
    return pin + '.write_analog(int(' + unihikerValue(block, 'VALUE', '0') + '))' + NEWLINE;
};

// Input/Output - Time

Blockly.Python.io_pause = function (block) {
    const duration = unihikerValue(block, "TIME", "0");
    Blockly.Python.addImport('time', IMPORT_TIME);
    switch (block.getFieldValue("UNIT")) {
        default:
        case "SEC":
            return "time.sleep(" + duration + ")" + NEWLINE;
        case "MILLI":
            return "time.sleep(" + duration + "/1e3)" + NEWLINE;
        case "MICRO":
            return "time.sleep(" + duration + "/1e6)" + NEWLINE;
    }
};

Blockly.Python.io_waitUntil = function (block) {
    const condition = Blockly.Python.valueToCode(block, "UNTIL", Blockly.Python.ORDER_ATOMIC) || "True";
    Blockly.Python.addImport('time', IMPORT_TIME);
    // short pauses: the screen and the events of the board go on meanwhile
    return "while not " + condition + ":" + NEWLINE + "  time.sleep(0.01)" + NEWLINE;
};

Blockly.Python.io_initChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('t0', "t0 = time.time()");
    block.workspace.getVariableMap().createVariable('t0');
    return "t0 = time.time()" + NEWLINE;
};

Blockly.Python.io_getChronometer = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('t0', "t0 = time.time()");
    block.workspace.getVariableMap().createVariable('t0');
    switch (block.getFieldValue("UNIT")) {
        case "SEC":
            return ["time.time() - t0", Blockly.Python.ORDER_ATOMIC];
        case "MILLI":
            return ["(time.time() - t0) * 1e3", Blockly.Python.ORDER_ATOMIC];
        case "MICRO":
            return ["(time.time() - t0) * 1e6", Blockly.Python.ORDER_ATOMIC];
    }
};

// Communication: console of the interface (output of the program)

Blockly.Python.communication_serialWrite = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || '""';
    const newlines = parseInt(block.getFieldValue("NEWLINES")) || 0;
    const value = Blockly.Constants.Utils.isInputTextBlock(block, "TEXT") ? text : "str(" + text + ")";
    return "print(" + value + (newlines ? ' + "' + "\\n".repeat(newlines) + '"' : "") + ")" + NEWLINE;
};

// Graph and music of the computer: lines read by the console of the interface (M10 and K10)
Blockly.Python.communication_graphSerialWrite = function (block) {
    let code = "print('@Graph:";
    for (let i = 0; i < block.itemCount_; i++) {
        const data = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE);
        if (data[data.length - 1] === '|') {
            const [name, value] = data.slice(0, -1).split(':');
            code += name + ":' + str(" + value + ") + '|";
        }
    }
    Blockly.Python.addImport('time', IMPORT_TIME);
    return code + "')" + NEWLINE + "time.sleep(0.05)" + NEWLINE;
};

Blockly.Python.communication_graphSerialWrite_datasFormat = function (block) {
    const name = block.getFieldValue("NAME") || '""';
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_ATOMIC);
    return [name + ":" + data + "|", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_playComputerMusic = function (block) {
    return "print('@music:" + block.getFieldValue("NOTE") + "|')" + NEWLINE;
};

Blockly.Python.communication_playComputerFrequency = function (block) {
    return "print('@music:' + str(" + (Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_ATOMIC) || '440') + ") + '|')" + NEWLINE;
};

Blockly.Python.communication_stopComputerMusic = function () {
    return "print('@music:stop|')" + NEWLINE;
};

// Message sent from the console (standard input of the program, given by the server of the board), read when it is there
Blockly.Python.communication_onSerialMessageReceived = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.Names.NameType.VARIABLE);
    Blockly.Python.addImport('sys', 'import sys');
    Blockly.Python.addImport('select', 'import select');
    return "if select.select([sys.stdin], [], [], 0)[0]:" + NEWLINE + "  " + dataVar + " = sys.stdin.readline().rstrip('\\n')" + NEWLINE + branchCode;
};

// Sensors

Blockly.Python.sensors_unihiker_light = function () {
    Blockly.Python.unihikerBoard();
    return ['light.read()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.sensors_unihiker_acceleration = function (block) {
    Blockly.Python.unihikerBoard();
    return ['accelerometer.get_' + block.getFieldValue('AXIS') + '()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.sensors_unihiker_gyroscope = function (block) {
    Blockly.Python.unihikerBoard();
    return ['gyroscope.get_' + block.getFieldValue('AXIS') + '()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.sensors_unihiker_sound_level = function () {
    Blockly.Python.addImport('audio', IMPORT_AUDIO);
    Blockly.Python.addInit('audio', 'audio = Audio()');
    return ['audio.sound_level()', Blockly.Python.ORDER_FUNCTION_CALL];
};

// Actuators

Blockly.Python.actuators_unihiker_buzzer_music = function (block) {
    Blockly.Python.unihikerBoard();
    return 'buzzer.play(buzzer.' + block.getFieldValue('MUSIC') + ', buzzer.' + block.getFieldValue('MODE') + ')' + NEWLINE;
};

Blockly.Python.actuators_unihiker_buzzer_pitch = function (block) {
    Blockly.Python.unihikerBoard();
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('threading', IMPORT_THREADING);
    Blockly.Python.addFunction('buzzer_note', FUNCTIONS_UNIHIKER.DEF_BUZZER_NOTE);
    return 'buzzer_note(' + unihikerValue(block, 'FREQUENCY', '440') + ', ' + block.getFieldValue('BEAT') + ')' + NEWLINE;
};

Blockly.Python.actuators_unihiker_buzzer_stop = function () {
    Blockly.Python.unihikerBoard();
    return 'buzzer.stop()' + NEWLINE;
};

Blockly.Python.actuators_unihiker_led = function (block) {
    // LED of the board on P25
    return Blockly.Python.unihikerPin('P25', 'OUT') + '.write_digital(' + block.getFieldValue('STATE') + ')' + NEWLINE;
};

// AI: vittaia blocks (as the Arduino UNO Q) with the image models of the Vittascience AI tool, run by the library
// vitta_ai.py (sent with the program, with the files of the model: see UnihikerCommunication.programFiles)

Blockly.Python.unihikerVittaAi = function () {
    Blockly.Python.addImport('vitta_ai', IMPORT_VITTA_AI);
};

Blockly.Python.vittaia_load_local_model = function () {
    Blockly.Python.unihikerVittaAi();
    return 'image_model = ImageModel("local")' + NEWLINE;
};

Blockly.Python.vittaia_load_model = function (block) {
    Blockly.Python.unihikerVittaAi();
    const link = Blockly.Python.valueToCode(block, "MODEL_URL", Blockly.Python.ORDER_NONE) || "''";
    return 'image_model = ImageModel(' + link + ')' + NEWLINE;
};

Blockly.Python.vittaia_load_model_default = function (block) {
    Blockly.Python.unihikerVittaAi();
    return 'image_model = ImageModel(' + JSON.stringify(block.getFieldValue("MODEL")) + ')' + NEWLINE;
};

Blockly.Python.vittaia_make_predictions_webcam = function () {
    Blockly.Python.unihikerVittaAi();
    return 'image_model.predict(camera_image())' + NEWLINE;
};

Blockly.Python.vittaia_make_predictions_from_url = function (block) {
    Blockly.Python.unihikerVittaAi();
    const url = Blockly.Python.valueToCode(block, "PICTURE_URL", Blockly.Python.ORDER_NONE) || "''";
    return 'image_model.predict(image_from_url(' + url + '))' + NEWLINE;
};

Blockly.Python.vittaia_get_highest_probability_class = function () {
    return ['image_model.class_predicted', Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.vittaia_get_confidence_rate = function () {
    return ['image_model.score', Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.vittaia_get_predictions = function () {
    return ['image_model.predictions()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.vittaia_detect_class = function (block) {
    const isDetected = block.getFieldValue("IS_DETECTED");
    const modelClass = Blockly.Python.valueToCode(block, "MODEL_CLASS", Blockly.Python.ORDER_NONE) || "''";
    const branch = Blockly.Python.addLoopTrap(Blockly.Python.statementToCode(block, "DO"), block) || Blockly.Python.PASS;
    return 'if image_model.class_predicted ' + isDetected + ' ' + modelClass + ':' + NEWLINE + branch;
};

Blockly.Python.vittaia_list_webcams = function () {
    Blockly.Python.unihikerVittaAi();
    return ['list_cameras()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.vittaia_init_webcam = function (block) {
    Blockly.Python.unihikerVittaAi();
    return 'use_camera(' + (Blockly.Python.valueToCode(block, "CAMERA", Blockly.Python.ORDER_NONE) || "0") + ')' + NEWLINE;
};

Blockly.Python.ai_unihiker_camera_rotate = function (block) {
    Blockly.Python.unihikerVittaAi();
    return 'rotate_camera(' + block.getFieldValue('ANGLE') + ')' + NEWLINE;
};

Blockly.Python.ai_unihiker_camera_stream = function (block) {
    Blockly.Python.unihikerGui();
    Blockly.Python.unihikerVittaAi();
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('threading', IMPORT_THREADING);
    Blockly.Python.addImport('pil_image', IMPORT_PIL_IMAGE);
    Blockly.Python.addFunction('camera_stream', FUNCTIONS_UNIHIKER.DEF_CAMERA_STREAM);
    // int() only for the expressions, not for the numbers
    const args = [['X', '0'], ['Y', '0'], ['W', '240'], ['H', '180']].map(([name, fallback]) => {
        const value = unihikerValue(block, name, fallback);
        return /^-?\d+$/.test(value) ? value : 'int(' + value + ')';
    });
    return 'camera_stream(' + args.join(', ') + ')' + NEWLINE;
};

