/**
 * @fileoverview Start blocks for Arduino Q HTML.
 */

// Blockly declares `var x, y;` for every variable of the workspace (C++ and Python ones included) in front of
// the generated code, i.e. as text before <!DOCTYPE html>. The page scripts don't need it: drop it.
const initJavaScriptGenerator = Blockly.JavaScript.init;
Blockly.JavaScript.init = function (workspace) {
    initJavaScriptGenerator.call(this, workspace);
    delete this.definitions_.variables;
};

Blockly.JavaScript.html_page = function (block) {
    const statements_content = Blockly.JavaScript.statementToCode(block, 'CONTENT');
    let lng = 'en';
    if (getCookie('lng').length > 0) {
        lng = getCookie('lng');
    }
    const code = `<!-- SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)
SPDX-License-Identifier: MPL-2.0 -->

<!DOCTYPE html>
<html lang="${lng}">
${statements_content}
</html>\n`;
    return code;
};

Blockly.JavaScript.head = function (block) {
  const statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  // Socket.IO connection to the app WebUI brick (same origin, port 7000), used by the socket blocks
  const usesSocket = ['socket_emit_message', 'socket_on_message_receive'].some(type => block.workspace.getBlocksByType(type, false).length > 0);
  const socketCode = usesSocket ? `  <script src="libs/socket.io.min.js"></script>\n  <script>const socket = io();</script>\n` : '';
  const code = `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vittascience - Q App</title>
  <link rel="icon" type="image/png" href="img/favicon.png">
${socketCode}${statements_content}
</head>\n\n`;
  return code;
};