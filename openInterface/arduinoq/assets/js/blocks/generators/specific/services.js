/**
 * @fileoverview Python generators of the Linux part of the Arduino UNO Q: sound, web (HTTP, weather) and data logging.
 * The functions are in FUNCTIONS_ARDUINO_Q.py (constants/generators/functions.js).
 */

// SOUND

Blockly.Python.py_sound_say_computer = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addFunction('say_on_computer', FUNCTIONS_ARDUINO_Q.py.DEF_SAY_ON_COMPUTER);
    return "say_on_computer(" + text + ")" + NEWLINE;
};

Blockly.Python.py_sound_say_board = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.PY_SOUND_PLAYER();
    Blockly.Python.addInit('piper_voices', 'piper_voices = {}');
    Blockly.Python.addFunction('say_on_board', FUNCTIONS_ARDUINO_Q.py.DEF_SAY_ON_BOARD);
    return "say_on_board(" + text + ", '" + block.getFieldValue("VOICE") + "')" + NEWLINE;
};

Blockly.Python.py_sound_listen_board = function (block) {
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "3";
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addInit('vosk_models', 'vosk_models = {}');
    Blockly.Python.addFunction('listen_on_board', FUNCTIONS_ARDUINO_Q.py.DEF_LISTEN_ON_BOARD);
    return ["listen_on_board(" + duration + ", '" + block.getFieldValue("LANGUAGE") + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.py_sound_frequency_computer = function (block) {
    const frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_NONE) || "440";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "1";
    Blockly.Python.addFunction('play_frequency_on_computer', FUNCTIONS_ARDUINO_Q.py.DEF_PLAY_FREQUENCY_ON_COMPUTER);
    return "play_frequency_on_computer(" + frequency + ", " + duration + ")" + NEWLINE;
};

// Sound of the board: Sound Generator brick of Arduino App Lab (USB headset or speaker, jack of a USB-C adapter)
Blockly.Python.PY_SOUND_PLAYER = function () {
    Blockly.Python.addImport('app_bricks.sound_generator', IMPORT_BRICK_SOUND_GENERATOR);
    Blockly.Python.addInit('sound_player', "sound_player = SoundGenerator()");
};

Blockly.Python.py_sound_note_board = function (block) {
    const note = block.getFieldValue("NOTE");
    const octave = Blockly.Python.valueToCode(block, "OCTAVE", Blockly.Python.ORDER_NONE) || "4";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "0.5";
    Blockly.Python.PY_SOUND_PLAYER();
    // Note names of the brick: "C4", "F#5"... and "REST" for a silence
    const name = note === "REST" ? "'REST'" : "'" + note + "' + str(int(" + octave + "))";
    return "sound_player.play_tone(" + name + ", " + duration + ", block=True)" + NEWLINE;
};

Blockly.Python.py_sound_abc_board = function (block) {
    const abc = Blockly.Python.valueToCode(block, "ABC", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.PY_SOUND_PLAYER();
    // "\\n" typed in a text block separates the ABC lines (headers T:, Q:, K:...)
    return "sound_player.play_abc(str(" + abc + ").replace('\\\\n', '\\n'), block=True)" + NEWLINE;
};

Blockly.Python.py_sound_chord_board = function (block) {
    const notes = Blockly.Python.valueToCode(block, "NOTES", Blockly.Python.ORDER_NONE) || "'C4 E4 G4'";
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE) || "1";
    Blockly.Python.PY_SOUND_PLAYER();
    Blockly.Python.addFunction('play_chord_on_board', FUNCTIONS_ARDUINO_Q.py.DEF_SOUND_CHORD);
    return "play_chord_on_board(" + notes + ", " + duration + ")" + NEWLINE;
};

Blockly.Python.py_sound_volume_board = function (block) {
    const volume = Blockly.Python.valueToCode(block, "VOLUME", Blockly.Python.ORDER_NONE) || "100";
    Blockly.Python.PY_SOUND_PLAYER();
    return "sound_player.set_master_volume(" + volume + " / 100)" + NEWLINE;
};

Blockly.Python.py_sound_waveform_board = function (block) {
    Blockly.Python.PY_SOUND_PLAYER();
    return "sound_player.set_wave_form('" + block.getFieldValue("WAVE") + "')" + NEWLINE;
};

Blockly.Python.py_sound_effect_board = function (block) {
    const effect = block.getFieldValue("EFFECT");
    Blockly.Python.PY_SOUND_PLAYER();
    return "sound_player.set_effects(" + (effect === "none" ? "[]" : "[SoundEffect." + effect + "()]") + ")" + NEWLINE;
};

// HTTP

Blockly.Python.py_http_get_text = function (block) {
    const url = Blockly.Python.valueToCode(block, "URL", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addFunction('http_get_text', FUNCTIONS_ARDUINO_Q.py.DEF_HTTP_GET_TEXT);
    return ["http_get_text(" + url + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.py_http_get_json = function (block) {
    const url = Blockly.Python.valueToCode(block, "URL", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addFunction('http_get_json', FUNCTIONS_ARDUINO_Q.py.DEF_HTTP_GET_JSON);
    return ["http_get_json(" + url + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.py_http_post_json = function (block) {
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "{}";
    const url = Blockly.Python.valueToCode(block, "URL", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addFunction('http_post_json', FUNCTIONS_ARDUINO_Q.py.DEF_HTTP_POST_JSON);
    return "http_post_json(" + url + ", " + data + ")" + NEWLINE;
};

Blockly.Python.py_weather_get = function (block) {
    const city = Blockly.Python.valueToCode(block, "CITY", Blockly.Python.ORDER_NONE) || "'Paris'";
    Blockly.Python.addFunction('get_weather', FUNCTIONS_ARDUINO_Q.py.DEF_GET_WEATHER);
    return ["get_weather(" + city + ", '" + block.getFieldValue("MEASURE") + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.py_weather_forecast_is = function (block) {
    const city = Blockly.Python.valueToCode(block, "CITY", Blockly.Python.ORDER_NONE) || "'Paris'";
    const days = Blockly.Python.valueToCode(block, "DAYS", Blockly.Python.ORDER_NONE) || "1";
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    Blockly.Python.addImport('app_bricks.weather_forecast', IMPORT_BRICK_WEATHER_FORECAST);
    Blockly.Python.addFunction('weather_forecast', FUNCTIONS_ARDUINO_Q.py.DEF_WEATHER_FORECAST);
    return ["weather_forecast_is(" + city + ", " + days + ", '" + block.getFieldValue("WEATHER") + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.py_weather_forecast_temperature = function (block) {
    const city = Blockly.Python.valueToCode(block, "CITY", Blockly.Python.ORDER_NONE) || "'Paris'";
    const days = Blockly.Python.valueToCode(block, "DAYS", Blockly.Python.ORDER_NONE) || "1";
    Blockly.Python.addFunction('get_weather', FUNCTIONS_ARDUINO_Q.py.DEF_GET_WEATHER);
    return ["get_weather_forecast(" + city + ", '" + block.getFieldValue("MEASURE") + "', " + days + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

// DATA LOGGING

Blockly.Python.PY_DATALOG_FILE = function (block) {
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addFunction('datalog_file', FUNCTIONS_ARDUINO_Q.py.DEF_DATALOG_FILE);
    return Blockly.Python.valueToCode(block, "FILE", Blockly.Python.ORDER_NONE) || "'donnees.csv'";
};

Blockly.Python.py_datalog_set_columns = function (block) {
    const file = Blockly.Python.PY_DATALOG_FILE(block);
    const columns = Blockly.Python.valueToCode(block, "COLUMNS", Blockly.Python.ORDER_NONE) || "[]";
    Blockly.Python.addFunction('datalog_set_columns', FUNCTIONS_ARDUINO_Q.py.DEF_DATALOG_SET_COLUMNS);
    return "datalog_set_columns(" + file + ", " + columns + ")" + NEWLINE;
};

Blockly.Python.py_datalog_add_line = function (block) {
    const file = Blockly.Python.PY_DATALOG_FILE(block);
    const values = Blockly.Python.valueToCode(block, "VALUES", Blockly.Python.ORDER_NONE) || "[]";
    Blockly.Python.addFunction('datalog_add_line', FUNCTIONS_ARDUINO_Q.py.DEF_DATALOG_ADD_LINE);
    return "datalog_add_line(" + file + ", " + values + ")" + NEWLINE;
};

Blockly.Python.py_datalog_clear = function (block) {
    const file = Blockly.Python.PY_DATALOG_FILE(block);
    Blockly.Python.addFunction('datalog_clear', FUNCTIONS_ARDUINO_Q.py.DEF_DATALOG_CLEAR);
    return "datalog_clear(" + file + ")" + NEWLINE;
};
