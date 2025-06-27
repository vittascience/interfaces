Blockly.Python.game_capital_init = function(block) {
    Blockly.Python.addImport('game_countries', IMPORT_GAME_COUNTRIES);
    Blockly.Python.addImport('asr', IMPORT_ASR_SERVICE);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction('game_capital_init', FUNCTIONS_NAO.GAME_CAPITAL_INIT);
    return 'game_capital_init()' + NEWLINE;
};

Blockly.Python.game_capital_get_random_country = function(block) {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    Blockly.Python.addImport('game_countries', IMPORT_GAME_COUNTRIES);
    Blockly.Python.addFunction('game_get_random_country', FUNCTIONS_NAO.GAME_GET_RANDOM_COUNTRY);
    return ['game_get_random_country()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.game_capital_play = function(block) {
    Blockly.Python.addImport('game_countries', IMPORT_GAME_COUNTRIES);
    Blockly.Python.addImport('asr', IMPORT_ASR_SERVICE);
    Blockly.Python.addImport('tts', IMPORT_TTS);
    const country = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Python.addFunction('game_play', FUNCTIONS_NAO.GAME_COUNTRY_PLAY);
    return `game_play(${country})` + NEWLINE;
};

Blockly.Python.game_capital_get_element_from_country = function(block) {
    const country = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const element = block.getFieldValue('ELEMENT');
    return [`countries[${country}]["${element}"]`, Blockly.Python.ORDER_ATOMIC];
};

// Sotry telling

Blockly.Python.game_dynamic_story_init = function(block) {
    const story = block.getFieldValue('STORY');
    let var_story = ""
    if (story === "story1"){
        Blockly.Python.addImport('game_dynamic_story1', IMPORT_GAME_DYNAMIC_STORY1);
        var_story = "dynamic_story1";
    } else if (story === "story2"){
        Blockly.Python.addImport('game_dynamic_story2', IMPORT_GAME_DYNAMIC_STORY2);
        var_story = "dynamic_story2";
    }
    Blockly.Python.addInit('chosen_story', "story = " + var_story);
    Blockly.Python.addInit('current_scene', 'current_scene = "start"');
    return "";
};

Blockly.Python.game_play_current_scene = function(block) {
    Blockly.Python.addImport('tts', IMPORT_TTS);
    Blockly.Python.addFunction('game_play_current_scene', FUNCTIONS_NAO.GAME_PLAY_CURRENT_SCENE);
    const current_scene = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return [`game_play_current_scene(${current_scene})`, Blockly.Python.ORDER_ATOMIC];
};


// Mental math

Blockly.Python.game_mental_math_init = function(block) {
    Blockly.Python.addImport('asr_service', IMPORT_ASR_SERVICE);
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    Blockly.Python.addImport('mental_math_numbers', IMPORT_GAME_MENTAL_MATH);
    Blockly.Python.addInit('result_mental_math', 'result = 0');
    Blockly.Python.addFunction('game_mental_math_init', FUNCTIONS_NAO.GAME_MENTAL_MATH_INIT);
    return 'game_mental_math_init()' + NEWLINE;
};

Blockly.Python.game_mental_math_play = function(block) {
    Blockly.Python.addImport('asr_service', IMPORT_ASR_SERVICE);
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    Blockly.Python.addImport('tts', IMPORT_TTS);
    Blockly.Python.addImport('mental_math_numbers', IMPORT_GAME_MENTAL_MATH);
    const result = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Python.addInit('result_mental_math', `${result} = 0`);
    const operation = block.getFieldValue('OPERATION');
    Blockly.Python.addFunction('game_mental_math_play', FUNCTIONS_NAO.GAME_MENTAL_MATH_PLAY);
    return `${result} = game_mental_math_play("${operation}")` + NEWLINE;
};

Blockly.Python.game_mental_math_get_number = function(block) {
    Blockly.Python.addImport('mental_math_numbers', IMPORT_GAME_MENTAL_MATH);
    const number = Blockly.Python.valueToCode(block, 'NUMBER', Blockly.Python.ORDER_NONE) || "0";
    return [`mental_math_numbers[${number}]`, Blockly.Python.ORDER_ATOMIC];
};

