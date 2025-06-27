/**
 * @fileoverview mCore generators for mBot.
 */

// Blue LED

// BUILTIN LED _ CONTROL STATE
Blockly.Arduino.mCore_control_LED = function (block) {
    Blockly.Arduino.addSetup('pin13', "pinMode(13, OUTPUT);", !1);
    const state = Blockly.Arduino.valueToCode(block, "STATE", Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    return "digitalWrite(13, " + state + ");" + NEWLINE;
};

// MBOT - SET RGB LED
Blockly.Arduino.robots_setmBotRgbLed = function (block) {
    Blockly.Arduino.addDeclaration('init_mbot_rgb', "MeRGBLed rgbled_board(7, 2);");
    var r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_NONE) || 0;
    var g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_NONE) || 0;
    var b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_NONE) || 0;
    if (r > 255) r = 255;
    if (r < 0) r = 0;
    if (g > 255) g = 255;
    if (g < 0) g = 0;
    if (b > 255) b = 255;
    if (b < 0) b = 0;
    let code = "rgbled_board.setColor(" + block.getFieldValue("LED") + ", " + r + ", " + g + ", " + b + ");" + NEWLINE
        + "rgbled_board.show();" + NEWLINE;
    return code;
};

// MBOT - SET PALETTE RGB LED
Blockly.Arduino.robots_setmBotPaletteRgbLed = function (block) {
    Blockly.Arduino.addDeclaration('init_mbot_rgb', "MeRGBLed rgbled_board(7, 2);");
    let colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "0, 0, 0";
    return "rgbled_board.setColor(" + block.getFieldValue("LED") + ", " + colour + ");" + NEWLINE + "rgbled_board.show();" + NEWLINE;
};

// MBOT - SET BUZZER FREQUENCY
Blockly.Arduino.robots_setmBotBuzzer = function (block) {
    Blockly.Arduino.addDeclaration('init_mbot_buzzer', "MeBuzzer buzzer;");
    let freq = Blockly.Arduino.valueToCode(block, "FREQUENCY", Blockly.Arduino.ORDER_NONE) || "0";
    let time = Blockly.Arduino.valueToCode(block, "TIME", Blockly.Arduino.ORDER_NONE) || "0";
    return "buzzer.tone(" + freq + ", " + time + ");" + NEWLINE;
};

// MBOT - SET BUZZER MUSIC
Blockly.Arduino.robots_playmBotMusic = function (block) {
    Blockly.Arduino.addDeclaration('init_mbot_buzzer', "MeBuzzer buzzer;");
    switch (block.getFieldValue("MUSIC")) {
        case "0":
            Blockly.Arduino.addFunction('func_music_G', FUNCTIONS_MBOT.DEF_MBOT_BUZZER_GAMME);
            return "BuzzerGamme();" + NEWLINE;
        case "1":
            Blockly.Arduino.addFunction('func_music_SW', FUNCTIONS_MBOT.DEF_MBOT_BUZZER_STARWARS);
            return "BuzzerStarWars();" + NEWLINE;
        case "2":
            Blockly.Arduino.addFunction('func_music_R2D2', FUNCTIONS_MBOT.DEF_MBOT_BUZZER_R2D2);
            return "BuzzerR2D2();" + NEWLINE;
        default:
            throw Error("Unhandled option (lists_getSublist)");
    }
};

// MBOT - GET LIGHT
Blockly.Arduino.robots_getmBotSensorLight = function () {
    Blockly.Arduino.addDeclaration('lightSensor_board', "MeLightSensor lightSensor_board(6);");
    return ["lightSensor_board.read()", Blockly.Arduino.ORDER_ATOMIC]
};

// MBOT - GET BUTTON STATE
Blockly.Arduino.robots_getmBotButtonState = function () {
    Blockly.Arduino.addSetup('setup_button', "pinMode(A7,INPUT);");
    Blockly.Arduino.addFunction('func_button', FUNCTIONS_MBOT.DEF_BUTON_PRESSED);
    return ["buttonPressed()", Blockly.Arduino.ORDER_ATOMIC]
    // return ["analogRead(A7)>10?false:true", Blockly.Arduino.ORDER_ATOMIC]
};

// MBOT - GET REMOTE CONTROL BUTTON
Blockly.Arduino.robots_getmBotRemoteControlButton = function (block) {
    Blockly.Arduino.addDeclaration('declare_ir_module', "MeIR ir;");
    Blockly.Arduino.addSetup('setup_ir_transmission', "ir.begin();");
    return ["ir.keyPressed(" + block.getFieldValue("BUTTON") + ")", Blockly.Arduino.ORDER_ATOMIC]
};

// MBOT - SEND STRING BY IR
Blockly.Arduino.robots_sendmBotIrMessage = function (block) {
    Blockly.Arduino.addDeclaration('declare_ir_module', "MeIR ir;");
    let text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addSetup('setup_ir_transmission', "ir.begin();");
    return "ir.sendString(" + text + ");" + NEWLINE;
};