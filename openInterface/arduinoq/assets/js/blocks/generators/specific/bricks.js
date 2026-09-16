/**
 * @fileoverview Bricks python generators for Arduino Q.
 */

Blockly.Python.bricks_app_run = function (block) {
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    const user_loop = block.getInput('USER_LOOP');
    if (user_loop) {
        const userFunction = Blockly.Python.valueToCode(block, "USER_LOOP", Blockly.Python.ORDER_NONE);
        if (userFunction) {
            return `App.run(user_loop=${userFunction})` + NEWLINE;
        }
    }
    return `App.run()` + NEWLINE;
};

Blockly.Python.bricks_webui_send_message = function (block) {
    Blockly.Python.addImport("app_bricks.web_ui", IMPORT_BRICK_WEBUI);
    Blockly.Python.addPowerOn('WebUI', "ui = WebUI()");
    const id = block.getFieldValue("ID");
    const message = Blockly.Python.valueToCode(block, "MESSAGE", Blockly.Python.ORDER_NONE) || "None";
    return "ui.send_message('" + id + "', " + message + ")" + NEWLINE;
};

Blockly.Python.bricks_webui_on_message = function (block) {
    Blockly.Python.addImport("app_bricks.web_ui", IMPORT_BRICK_WEBUI);
    Blockly.Python.addPowerOn('WebUI', "ui = WebUI()");
    const id = block.getFieldValue("ID");
    const branchCode = Blockly.Python.statementToCode(block, 'DO');
    const funcName = "onUiMessage_" + id;
    Blockly.Python.addFunction(funcName, "def " + funcName + "():" + NEWLINE + (branchCode ? branchCode : "  pass"));
    Blockly.Python.addPowerOn(funcName, "ui.on_message('" + id + "', " + funcName + ")");
    return "";
};