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

// Web terminal of the board on /console (next to the page of the program): SSH session with the user and password of the board
Blockly.Python.bricks_webui_console = function () {
    const labels = {};
    for (const key of ["TITLE", "USER", "PASSWORD", "ENTER", "WRONG", "LOGS", "CLOSED"]) {
        labels[key.toLowerCase()] = Blockly.Msg["BRICKS_WEBUI_CONSOLE_PAGE_" + key];
    }
    Blockly.Python.addImport("app_bricks.web_ui", IMPORT_BRICK_WEBUI);
    Blockly.Python.addImport("threading", "import threading");
    Blockly.Python.addPowerOn('WebUI', "ui = WebUI()");
    Blockly.Python.addFunction('web_terminal_start', FUNCTIONS_ARDUINO_Q.py.DEF_WEB_TERMINAL);
    Blockly.Python.addPowerOn('web_terminal', "web_terminal_start(" + JSON.stringify(labels) + ")");
    return "";
};

Blockly.Python.bricks_webui_on_message = function (block) {
    Blockly.Python.addImport("app_bricks.web_ui", IMPORT_BRICK_WEBUI);
    Blockly.Python.addPowerOn('WebUI', "ui = WebUI()");
    const id = block.getFieldValue("ID");
    const branchCode = Blockly.Python.statementToCode(block, 'DO');
    const funcName = "onUiMessage_" + id;
    // WebUI calls the handler with the client session id and the message data
    Blockly.Python.addFunction(funcName, "def " + funcName + "(sid, data):" + NEWLINE + (branchCode ? branchCode : "  pass"));
    Blockly.Python.addPowerOn(funcName, "ui.on_message('" + id + "', " + funcName + ")");
    return "";
};

/**
 * Function called by a brick event ("when..." blocks): its statements, with the program variables as globals.
 * @param {Blockly.Block} block
 * @param {string} funcName
 * @returns {string} Python function
 */
Blockly.Python.BRICKS_HANDLER = function (block, funcName) {
    const branch = Blockly.Python.statementToCode(block, 'DO');
    const globals = branch && typeof getGlobals === 'function' ? getGlobals(branch) : null;
    return "def " + funcName + "():" + NEWLINE + (globals || "") + (branch || "  pass" + NEWLINE);
};

// CAMERA of the bricks below: image settings (camera mounted sideways...), photos

Blockly.Python.BRICKS_CAMERA = function () {
    Blockly.Python.addImport('numpy', IMPORT_NUMPY_NP);
    Blockly.Python.addImport('app_peripherals.camera', IMPORT_CAMERA);
    Blockly.Python.addImport('app_utils.image', IMPORT_CAMERA_IMAGE);
    Blockly.Python.addFunction('camera', FUNCTIONS_ARDUINO_Q.py.DEF_CAMERA);
};

Blockly.Python.BRICKS_CAMERA_PHOTO = function () {
    Blockly.Python.BRICKS_CAMERA();
    Blockly.Python.addFunction('camera_photo', FUNCTIONS_ARDUINO_Q.py.DEF_CAMERA_PHOTO);
};

Blockly.Python.bricks_camera_rotation = function (block) {
    Blockly.Python.BRICKS_CAMERA();
    return "set_camera_rotation(" + block.getFieldValue("ANGLE") + ")" + NEWLINE;
};

Blockly.Python.bricks_camera_flip = function (block) {
    Blockly.Python.BRICKS_CAMERA();
    return "set_camera_flip('" + block.getFieldValue("FLIP") + "')" + NEWLINE;
};

Blockly.Python.bricks_camera_image = function (block) {
    const brightness = Blockly.Python.valueToCode(block, "BRIGHTNESS", Blockly.Python.ORDER_NONE) || "0";
    const contrast = Blockly.Python.valueToCode(block, "CONTRAST", Blockly.Python.ORDER_NONE) || "100";
    Blockly.Python.BRICKS_CAMERA();
    return "set_camera_image(" + brightness + ", " + contrast + ")" + NEWLINE;
};

Blockly.Python.bricks_camera_colors = function (block) {
    Blockly.Python.BRICKS_CAMERA();
    return "set_camera_colors(" + (block.getFieldValue("COLORS") === "GREY" ? "True" : "False") + ")" + NEWLINE;
};

Blockly.Python.bricks_camera_save_photo = function (block) {
    const file = Blockly.Python.valueToCode(block, "FILE", Blockly.Python.ORDER_NONE) || "'photo.jpg'";
    Blockly.Python.BRICKS_CAMERA_PHOTO();
    return "save_camera_photo(" + file + ")" + NEWLINE;
};

Blockly.Python.bricks_camera_save_photo_folder = function (block) {
    const folder = Blockly.Python.valueToCode(block, "FOLDER", Blockly.Python.ORDER_NONE) || "'photos'";
    Blockly.Python.BRICKS_CAMERA_PHOTO();
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addFunction('stopmotion_folder', FUNCTIONS_ARDUINO_Q.py.DEF_STOPMOTION_FOLDER);
    Blockly.Python.addFunction('save_camera_photo_in_folder', FUNCTIONS_ARDUINO_Q.py.DEF_SAVE_CAMERA_PHOTO_IN_FOLDER);
    return "save_camera_photo_in_folder(" + folder + ")" + NEWLINE;
};

Blockly.Python.bricks_camera_make_stopmotion = function (block) {
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "'film'";
    const folder = Blockly.Python.valueToCode(block, "FOLDER", Blockly.Python.ORDER_NONE) || "'photos'";
    const fps = Blockly.Python.valueToCode(block, "FPS", Blockly.Python.ORDER_NONE) || "10";
    Blockly.Python.addImport('pathlib.Path', IMPORT_PATHLIB);
    Blockly.Python.addFunction('stopmotion_folder', FUNCTIONS_ARDUINO_Q.py.DEF_STOPMOTION_FOLDER);
    Blockly.Python.addFunction('make_stopmotion', FUNCTIONS_ARDUINO_Q.py.DEF_MAKE_STOPMOTION);
    return "make_stopmotion(" + name + ", " + folder + ", " + fps + ", '" + block.getFieldValue("FORMAT") + "')" + NEWLINE;
};

// CAMERA CODE DETECTION: QR codes and barcodes of the camera plugged into the board

Blockly.Python.BRICKS_CODE_DETECTION = function () {
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    Blockly.Python.BRICKS_CAMERA();
    Blockly.Python.addImport('app_bricks.camera_code_detection', IMPORT_BRICK_CODE_DETECTION);
    Blockly.Python.addFunction('code_detection', FUNCTIONS_ARDUINO_Q.py.DEF_CODE_DETECTION);
    Blockly.Python.addPowerOn('code_detection_start', "code_detection_start()");
};

Blockly.Python.bricks_code_on_read = function (block) {
    Blockly.Python.BRICKS_CODE_DETECTION();
    Blockly.Python.addFunction('on_code_read', Blockly.Python.BRICKS_HANDLER(block, 'on_code_read'));
    Blockly.Python.addPowerOn('on_code_read', "code_handlers.append(on_code_read)");
    return "";
};

Blockly.Python.bricks_code_last = function () {
    Blockly.Python.BRICKS_CODE_DETECTION();
    return ["last_code", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.bricks_code_last_type = function () {
    Blockly.Python.BRICKS_CODE_DETECTION();
    return ["last_code_type", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.bricks_code_kinds = function (block) {
    Blockly.Python.BRICKS_CODE_DETECTION();
    return "set_code_kinds('" + block.getFieldValue("KINDS") + "')" + NEWLINE;
};

// VIDEO OBJECT DETECTION: objects seen by the camera plugged into the board (pre-trained model)

Blockly.Python.BRICKS_OBJECT_DETECTION = function () {
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    Blockly.Python.BRICKS_CAMERA();
    Blockly.Python.addImport('app_bricks.video_objectdetection', IMPORT_BRICK_OBJECT_DETECTION);
    Blockly.Python.addFunction('object_detection', FUNCTIONS_ARDUINO_Q.py.DEF_OBJECT_DETECTION);
    Blockly.Python.addPowerOn('object_detection_start', "object_detection_start()");
};

Blockly.Python.bricks_object_on_detect = function (block) {
    const object = block.getFieldValue("OBJECT");
    const funcName = "on_object_" + object.replace(/\W/g, "_");
    Blockly.Python.BRICKS_OBJECT_DETECTION();
    Blockly.Python.addFunction(funcName, Blockly.Python.BRICKS_HANDLER(block, funcName));
    Blockly.Python.addPowerOn(funcName, "object_handlers.setdefault('" + object + "', []).append(" + funcName + ")");
    return "";
};

Blockly.Python.bricks_object_count = function (block) {
    Blockly.Python.BRICKS_OBJECT_DETECTION();
    return ["count_objects('" + block.getFieldValue("OBJECT") + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.bricks_object_confidence = function (block) {
    Blockly.Python.BRICKS_OBJECT_DETECTION();
    return ["object_confidence('" + block.getFieldValue("OBJECT") + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.bricks_object_list = function () {
    Blockly.Python.BRICKS_OBJECT_DETECTION();
    return ["objects_list()", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.bricks_object_threshold = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "50";
    Blockly.Python.BRICKS_OBJECT_DETECTION();
    return "object_set_confidence(" + value + ")" + NEWLINE;
};

Blockly.Python.bricks_object_position = function (block) {
    Blockly.Python.BRICKS_OBJECT_DETECTION();
    return ["object_position('" + block.getFieldValue("OBJECT") + "', '" + block.getFieldValue("MEASURE") + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};

// TELEGRAM BOT

Blockly.Python.BRICKS_TELEGRAM = function () {
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    Blockly.Python.addImport('app_bricks.telegram_bot', IMPORT_BRICK_TELEGRAM);
    Blockly.Python.addFunction('telegram', FUNCTIONS_ARDUINO_Q.py.DEF_TELEGRAM);
};

Blockly.Python.bricks_telegram_start = function (block) {
    const token = Blockly.Python.valueToCode(block, "TOKEN", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.BRICKS_TELEGRAM();
    return "telegram_start(" + token + ")" + NEWLINE;
};

Blockly.Python.bricks_telegram_on_message = function (block) {
    Blockly.Python.BRICKS_TELEGRAM();
    Blockly.Python.addFunction('on_telegram_message', Blockly.Python.BRICKS_HANDLER(block, 'on_telegram_message'));
    Blockly.Python.addPowerOn('on_telegram_message', "telegram_handlers.append(on_telegram_message)");
    return "";
};

Blockly.Python.bricks_telegram_on_command = function (block) {
    const command = block.getFieldValue("COMMAND").replace(/^\//, "").replace(/\W/g, "_").toLowerCase() || "start";
    const funcName = "on_telegram_command_" + command;
    Blockly.Python.BRICKS_TELEGRAM();
    Blockly.Python.addFunction(funcName, Blockly.Python.BRICKS_HANDLER(block, funcName));
    Blockly.Python.addPowerOn(funcName, "telegram_commands.setdefault('" + command + "', []).append(" + funcName + ")");
    return "";
};

Blockly.Python.bricks_telegram_message_text = function () {
    Blockly.Python.BRICKS_TELEGRAM();
    return ["telegram_text", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.bricks_telegram_chat_id = function () {
    Blockly.Python.BRICKS_TELEGRAM();
    return ["telegram_chat", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.bricks_telegram_reply = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.BRICKS_TELEGRAM();
    return "telegram_send(" + text + ")" + NEWLINE;
};

Blockly.Python.bricks_telegram_send = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const chat = Blockly.Python.valueToCode(block, "CHAT", Blockly.Python.ORDER_NONE) || "None";
    Blockly.Python.BRICKS_TELEGRAM();
    return "telegram_send(" + text + ", " + chat + ")" + NEWLINE;
};

Blockly.Python.bricks_telegram_send_photo = function (block) {
    const caption = Blockly.Python.valueToCode(block, "CAPTION", Blockly.Python.ORDER_NONE) || "''";
    const chat = Blockly.Python.valueToCode(block, "CHAT", Blockly.Python.ORDER_NONE) || "None";
    Blockly.Python.BRICKS_TELEGRAM();
    Blockly.Python.BRICKS_CAMERA_PHOTO();
    return "telegram_send_photo(" + caption + ", " + chat + ")" + NEWLINE;
};

// KEYWORD SPOTTING: "Hey Arduino" heard by the microphone plugged into the board

Blockly.Python.bricks_keyword_on_heard = function (block) {
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    Blockly.Python.addImport('app_bricks.keyword_spotting', IMPORT_BRICK_KEYWORD_SPOTTING);
    Blockly.Python.addFunction('keyword_spotting', FUNCTIONS_ARDUINO_Q.py.DEF_KEYWORD_SPOTTING);
    Blockly.Python.addFunction('on_keyword_heard', Blockly.Python.BRICKS_HANDLER(block, 'on_keyword_heard'));
    Blockly.Python.addPowerOn('on_keyword_heard', "keyword_handlers.append(on_keyword_heard)");
    Blockly.Python.addPowerOn('keyword_start', "keyword_start()");
    return "";
};

// LARGE LANGUAGE MODEL run on the board

Blockly.Python.BRICKS_LLM = function () {
    Blockly.Python.addImport('app_bricks.llm', IMPORT_BRICK_LLM);
    Blockly.Python.addFunction('local_llm', FUNCTIONS_ARDUINO_Q.py.DEF_LOCAL_LLM);
};

Blockly.Python.bricks_llm_ask = function (block) {
    const question = Blockly.Python.valueToCode(block, "QUESTION", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.BRICKS_LLM();
    return ["local_llm_ask(" + question + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.bricks_llm_personality = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.BRICKS_LLM();
    return "local_llm_set(personality=" + text + ")" + NEWLINE;
};

// The model is also written in app.yaml by the uploader (UnoQuploader.buildAppFiles), to be prepared by App Lab
Blockly.Python.bricks_llm_model = function (block) {
    Blockly.Python.BRICKS_LLM();
    return "local_llm_set(model='" + block.getFieldValue("MODEL") + "')" + NEWLINE;
};

// Tool of the model: Python function described by its docstring, that the model can decide to call (tools of the
// LLM brick). Its result is given back to the model.
Blockly.Python.bricks_llm_tool = function (block) {
    const funcName = "tool_" + (Blockly.Python.LLM_TOOL_PARAMS(block.getFieldValue("NAME").replace(/,/g, " "))[0] || "action");
    const description = block.getFieldValue("DESCRIPTION").replace(/\\/g, "").replace(/"/g, "'");
    // Parameters given by the model (texts), read in the tool with the block "tool parameter ..."
    const params = Blockly.Python.LLM_TOOL_PARAMS(block.getFieldValue("PARAMS"));
    const result = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_NONE) || "'OK'";
    const branch = Blockly.Python.statementToCode(block, 'DO');
    // The program variables are globals, except the parameters (a parameter can't be global too)
    let globals = (branch && typeof getGlobals === 'function' ? getGlobals(branch) : null) || "";
    const globalNames = globals.replace(/^\s*global\s+/, "").trim().split(/,\s*/).filter(name => name && !params.includes(name));
    globals = globalNames.length ? "  global " + globalNames.join(", ") + NEWLINE : "";
    Blockly.Python.BRICKS_LLM();
    Blockly.Python.addFunction(funcName, "def " + funcName + "(" + params.map(name => name + ": str").join(", ") + ") -> str:" + NEWLINE +
        '  """' + description + '"""' + NEWLINE + globals + branch + "  return str(" + result + ")" + NEWLINE);
    Blockly.Python.addPowerOn(funcName, "local_llm_tools.append(" + funcName + ")");
    return "";
};

// Python names of the parameters of a tool: "pièce, niveau" -> ["piece", "niveau"]
Blockly.Python.LLM_TOOL_PARAMS = function (text) {
    return String(text || "").split(",").map(name => name.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\W/g, "_").replace(/^(\d)/, "_$1")).filter(Boolean);
};

Blockly.Python.bricks_llm_tool_param = function (block) {
    return [Blockly.Python.LLM_TOOL_PARAMS(block.getFieldValue("NAME"))[0] || "None", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.bricks_llm_choose = function (block) {
    const actions = Blockly.Python.valueToCode(block, "ACTIONS", Blockly.Python.ORDER_NONE) || "[]";
    const sentence = Blockly.Python.valueToCode(block, "SENTENCE", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.BRICKS_LLM();
    return ["local_llm_choose(" + actions + ", " + sentence + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.bricks_llm_options = function (block) {
    const creativity = Blockly.Python.valueToCode(block, "CREATIVITY", Blockly.Python.ORDER_NONE) || "70";
    const length = Blockly.Python.valueToCode(block, "LENGTH", Blockly.Python.ORDER_NONE) || "512";
    Blockly.Python.BRICKS_LLM();
    return "local_llm_set(creativity=" + creativity + ", max_tokens=" + length + ")" + NEWLINE;
};

Blockly.Python.bricks_llm_stream = function (block) {
    Blockly.Python.BRICKS_LLM();
    return "local_llm_set(stream=" + (block.getFieldValue("STREAM") === "ON" ? "True" : "False") + ")" + NEWLINE;
};

Blockly.Python.bricks_llm_memory = function (block) {
    Blockly.Python.BRICKS_LLM();
    return "local_llm_set(memory=" + (block.getFieldValue("MEMORY") === "ON" ? "True" : "False") + ")" + NEWLINE;
};

Blockly.Python.bricks_llm_clear = function () {
    Blockly.Python.BRICKS_LLM();
    return "local_llm_clear()" + NEWLINE;
};

// MQTT

Blockly.Python.BRICKS_MQTT = function () {
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    Blockly.Python.addImport('app_bricks.mqtt', IMPORT_BRICK_MQTT);
    Blockly.Python.addFunction('mqtt', FUNCTIONS_ARDUINO_Q.py.DEF_MQTT);
};

Blockly.Python.bricks_mqtt_connect = function (block) {
    const server = Blockly.Python.valueToCode(block, "SERVER", Blockly.Python.ORDER_NONE) || "'test.mosquitto.org'";
    const port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_NONE) || "1883";
    const user = Blockly.Python.valueToCode(block, "USER", Blockly.Python.ORDER_NONE) || "''";
    const password = Blockly.Python.valueToCode(block, "PASSWORD", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.BRICKS_MQTT();
    return "mqtt_connect(" + server + ", " + port + ", " + user + ", " + password + ")" + NEWLINE;
};

Blockly.Python.bricks_mqtt_publish = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const topic = Blockly.Python.valueToCode(block, "TOPIC", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.BRICKS_MQTT();
    return "mqtt_publish(" + text + ", " + topic + ")" + NEWLINE;
};

Blockly.Python.bricks_mqtt_on_message = function (block) {
    const topic = block.getFieldValue("TOPIC").replace(/'/g, "");
    const funcName = "on_mqtt_" + topic.replace(/\W/g, "_");
    Blockly.Python.BRICKS_MQTT();
    Blockly.Python.addFunction(funcName, Blockly.Python.BRICKS_HANDLER(block, funcName));
    Blockly.Python.addPowerOn(funcName, "mqtt_handlers.setdefault('" + topic + "', []).append(" + funcName + ")");
    return "";
};

Blockly.Python.bricks_mqtt_message = function () {
    Blockly.Python.BRICKS_MQTT();
    return ["mqtt_message", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.bricks_mqtt_topic = function () {
    Blockly.Python.BRICKS_MQTT();
    return ["mqtt_topic", Blockly.Python.ORDER_ATOMIC];
};

// ARDUINO CLOUD

Blockly.Python.BRICKS_ARDUINO_CLOUD = function () {
    Blockly.Python.addImport("arduino.app_utils", IMPORT_ARDUINO_APP_UTILS);
    Blockly.Python.addImport('app_bricks.arduino_cloud', IMPORT_BRICK_ARDUINO_CLOUD);
    Blockly.Python.addFunction('arduino_cloud', FUNCTIONS_ARDUINO_Q.py.DEF_ARDUINO_CLOUD);
};

Blockly.Python.bricks_cloud_set = function (block) {
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.BRICKS_ARDUINO_CLOUD();
    return "cloud_set('" + block.getFieldValue("NAME").replace(/\W/g, "_") + "', " + value + ")" + NEWLINE;
};

Blockly.Python.bricks_cloud_get = function (block) {
    Blockly.Python.BRICKS_ARDUINO_CLOUD();
    return ["cloud_get('" + block.getFieldValue("NAME").replace(/\W/g, "_") + "')", Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.bricks_cloud_on_change = function (block) {
    const name = block.getFieldValue("NAME").replace(/\W/g, "_");
    const funcName = "on_cloud_" + name;
    Blockly.Python.BRICKS_ARDUINO_CLOUD();
    Blockly.Python.addFunction(funcName, Blockly.Python.BRICKS_HANDLER(block, funcName));
    Blockly.Python.addPowerOn(funcName, "cloud_handlers.setdefault('" + name + "', []).append(" + funcName + ")\ncloud_variable('" + name + "')");
    return "";
};

// WEB PAGE: video of the camera of the board, served by the WebUI brick on /camera (MJPEG, see
// MultiCodeManager.workspaceToMultiCode), with the image settings of the camera blocks
Blockly.JavaScript.html_camera_video = function (block) {
    const width = block.getFieldValue('WIDTH');
    const height = block.getFieldValue('HEIGHT');
    const modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
    return '<img src="/camera" width="' + width + '" height="' + height + '" alt="Camera"' +
        (modifier ? ' ' + modifier.trim() : '') + '>\n';
};

// WEB PAGE: chat with the local AI of the board. Questions sent to the Python program by the WebUI brick
// ("vitta_llm_chat"), answer received piece by piece ("vitta_llm_chunk", then "vitta_llm_done"); the Python side is
// added by MultiCodeManager.workspaceToMultiCode
Blockly.JavaScript.html_llm_chat = function (block) {
    const width = block.getFieldValue('WIDTH');
    const height = block.getFieldValue('HEIGHT');
    const modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
    const placeholder = JSON.stringify(Blockly.Msg['HTML_LLM_CHAT_PLACEHOLDER']);
    return '<div style="width:' + width + 'px;max-width:100%;height:' + height + 'px;display:flex;flex-direction:column;border:1px solid #ccc;border-radius:8px;font-family:sans-serif"' +
        (modifier ? ' ' + modifier.trim() : '') + '>\n' +
        '  <div style="flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:6px"></div>\n' +
        '  <form style="display:flex;gap:6px;padding:8px;border-top:1px solid #ccc">\n' +
        '    <input style="flex:1;padding:6px" autocomplete="off">\n' +
        '    <button>' + Blockly.Msg['HTML_LLM_CHAT_SEND'] + '</button>\n' +
        '  </form>\n' +
        '</div>\n' +
        '<script>\n' +
        '(() => {\n' +
        '  const box = document.currentScript.previousElementSibling;\n' +
        '  const [messages, form] = box.children;\n' +
        '  const input = form.querySelector("input");\n' +
        '  const button = form.querySelector("button");\n' +
        '  input.placeholder = ' + placeholder + ';\n' +
        // Socket.IO connection of the head block, else its own (page without head block)
        '  const connection = typeof socket !== "undefined" ? Promise.resolve(socket) : new Promise(resolve => {\n' +
        '    const script = document.createElement("script");\n' +
        '    script.src = "libs/socket.io.min.js";\n' +
        '    script.onload = () => resolve(io());\n' +
        '    document.head.appendChild(script);\n' +
        '  });\n' +
        '  let answer = null;\n' +
        '  const bubble = (text, mine) => {\n' +
        '    const div = document.createElement("div");\n' +
        '    div.textContent = text;\n' +
        '    div.style.cssText = "padding:6px 10px;border-radius:10px;max-width:80%;white-space:pre-wrap;" +\n' +
        '      (mine ? "align-self:flex-end;background:#d7f0f3" : "align-self:flex-start;background:#eee");\n' +
        '    messages.appendChild(div);\n' +
        '    messages.scrollTop = messages.scrollHeight;\n' +
        '    return div;\n' +
        '  };\n' +
        '  form.addEventListener("submit", event => {\n' +
        '    event.preventDefault();\n' +
        '    if (!input.value.trim() || answer) return;\n' +
        '    bubble(input.value, true);\n' +
        '    const question = input.value;\n' +
        '    connection.then(socket => socket.emit("vitta_llm_chat", question));\n' +
        '    answer = bubble("…", false);\n' +
        '    answer.dataset.empty = "1";\n' +
        '    input.value = "";\n' +
        '    button.disabled = true;\n' +
        '  });\n' +
        '  connection.then(socket => {\n' +
        '    socket.on("vitta_llm_chunk", chunk => {\n' +
        '      if (!answer) return;\n' +
        '      if (answer.dataset.empty) { answer.textContent = ""; delete answer.dataset.empty; }\n' +
        '      answer.textContent += chunk;\n' +
        '      messages.scrollTop = messages.scrollHeight;\n' +
        '    });\n' +
        '    socket.on("vitta_llm_done", () => { answer = null; button.disabled = false; input.focus(); });\n' +
        '  });\n' +
        '})();\n' +
        '</script>\n';
};

// WEB PAGE: video of the object detection (camera of the board with the boxes and names of the objects). The model
// runner of the Video Object Detection brick serves it on port 4912 of the board (page /embed), like the App Lab
// examples. Shown once the runner answers: it starts with the app, after the page.
Blockly.JavaScript.html_object_detection_video = function (block) {
    const width = block.getFieldValue('WIDTH');
    const height = block.getFieldValue('HEIGHT');
    const modifier = Blockly.JavaScript.statementToCode(block, 'modifier', Blockly.JavaScript.ORDER_ATOMIC);
    return '<iframe width="' + width + '" height="' + height + '" frameborder="0" title="Object detection"' +
        (modifier ? ' ' + modifier.trim() : '') + '></iframe>\n' +
        '<script>\n' +
        '(() => {\n' +
        '  const frame = document.currentScript.previousElementSibling;\n' +
        '  const url = "http://" + location.hostname + ":4912/embed";\n' +
        '  const show = () => fetch(url, { mode: "no-cors" })\n' +
        '    .then(() => { frame.src = url; })\n' +
        '    .catch(() => setTimeout(show, 2000));\n' +
        '  show();\n' +
        '})();\n' +
        '</script>\n';
};
