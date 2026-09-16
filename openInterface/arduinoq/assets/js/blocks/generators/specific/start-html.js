/**
 * @fileoverview Start blocks for Arduino Q HTML.
 */

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
  const code = `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vittascience - Q App</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="icon" type="image/png" href="img/favicon.png">
${statements_content}
</head>\n\n`;
  return code;
};