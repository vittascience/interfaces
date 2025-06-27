/**
 * @fileoverview Screen generators for M5Stack.
 */

// Screen

Blockly.Python.screen_setBackgroundColorPalette = function (block) {
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0, 0, 0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    const add0 = (index) => (parseInt(colourList[index]) < 10 ? '0' : "");
    const addColor = (index) => parseInt(colourList[index]).toString(16);
    const colorHex = "0x" + add0(0) + addColor(0) + add0(1) + addColor(1) + add0(2) + addColor(2);
    return "setScreenColor(" + colorHex + ")" + NEWLINE;
};

Blockly.Python.screen_setBackgroundColorRGB = function (block) {
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    const add0 = (color) => (parseInt(color) < 10 ? '0' : "");
    const addColor = (color) => parseInt(color).toString(16);
    const colorHex = "0x" + add0(r) + addColor(r) + add0(g) + addColor(g) + add0(b) + addColor(b);
    return "setScreenColor(" + colorHex + ")" + NEWLINE;
};

// Drawing

// Common utils - color getter function
Blockly.Python.getInputColor = function (block, name) {
    let colorCode;
    const inputBlock = block.getInput(name).connection.targetBlock();
    if (inputBlock && inputBlock.type == 'colour_rgb') {
        const c = Blockly.Python.valueToCode(block, name, Blockly.Python.ORDER_NONE);
        colorCode = "int(" + c + '.replace("#", "0x"))';
    } else if (inputBlock && inputBlock.type == 'colour_picker') {
        const colour = Blockly.Python.valueToCode(block, name, Blockly.Python.ORDER_NONE);
        const colourList = colour.match(/([0-9]{1,3})/g);
        const add0 = (index) => (parseInt(colourList[index]) < 10 ? '0' : "");
        const addColor = (index) => parseInt(colourList[index]).toString(16);
        colorCode = "0x" + add0(0) + addColor(0) + add0(1) + addColor(1) + add0(2) + addColor(2);
    } else {
        colorCode = "0x00";
    }
    return colorCode;
};

// Common utils - id getter function
Blockly.Python.getInputId = function (block) {
    let idCode = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "'0'";
    if (!Blockly.Constants.Utils.isInputTextBlock(block, "ID") && idCode !== '0') {
        idCode = 'str(' + idCode + ')';
    }
    return idCode;
};

// Screen - draw title

Blockly.Python.screen_M5Title_define = function (block) {
    const id = Blockly.Python.getInputId(block);
    const title = Blockly.Python.valueToCode(block, "TITLE", Blockly.Python.ORDER_NONE) || "''";
    const position = Blockly.Python.valueToCode(block, "POSITION", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Title", "M5Objects['Title'] = {}");
    return 'M5Objects["Title"][' + id + '] = M5Title(title = ' + title + ', fgcolor = 0xf0f0f0, bgcolor = 0x22b573, x = ' + position + ')' + NEWLINE;
};

Blockly.Python.screen_M5Title_setFgColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const fgcolor = Blockly.Python.getInputColor(block, "FGCOLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Title", "M5Objects['Title'] = {}");
    return 'M5Objects["Title"][' + id + '].setFgColor(' + fgcolor + ')' + NEWLINE;
};

Blockly.Python.screen_M5Title_setBgColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const bgcolor = Blockly.Python.getInputColor(block, "BGCOLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Title", "M5Objects['Title'] = {}");
    return 'M5Objects["Title"][' + id + '].setBgColor(' + bgcolor + ')' + NEWLINE;
};

Blockly.Python.screen_M5Title_setTitle = function (block) {
    const id = Blockly.Python.getInputId(block);
    const title = Blockly.Python.valueToCode(block, "TITLE", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Title", "M5Objects['Title'] = {}");
    return 'M5Objects["Title"][' + id + '].setTitle(' + title + ')' + NEWLINE;
};

Blockly.Python.screen_M5Title_controlDisplay = function (block) {
    const id = Blockly.Python.getInputId(block);
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "False";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Title", "M5Objects['Title'] = {}");
    return 'M5Objects["Title"][' + id + '].show() if (' + state + ') else M5Objects["Title"][' + id + '].hide()' + NEWLINE;
};

// Screen - draw label

Blockly.Python.screen_M5TextBox_define = function (block) {
    const id = Blockly.Python.getInputId(block);
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_TextBox", "M5Objects['TextBox'] = {}");
    return 'M5Objects["TextBox"][' + id + '] = M5TextBox(' + x + ', ' + y + ', ' + text + ', lcd.FONT_Comic, 0x22b573, rotate = 0)' + NEWLINE;
};

Blockly.Python.screen_M5TextBox_setColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const color = Blockly.Python.getInputColor(block, "COLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_TextBox", "M5Objects['TextBox'] = {}");
    return 'M5Objects["TextBox"][' + id + '].setColor(' + color + ')' + NEWLINE;
};

Blockly.Python.screen_M5TextBox_setPosition = function (block) {
    const id = Blockly.Python.getInputId(block);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_TextBox", "M5Objects['TextBox'] = {}");
    return 'M5Objects["TextBox"][' + id + '].setPosition(' + x + ', ' + y + ')' + NEWLINE;
};

Blockly.Python.screen_M5TextBox_setFont = function (block) {
    const id = Blockly.Python.getInputId(block);
    const font = block.getFieldValue("FONT");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_TextBox", "M5Objects['TextBox'] = {}");
    return 'M5Objects["TextBox"][' + id + '].setFont(lcd.' + font + ')' + NEWLINE;
};

Blockly.Python.screen_M5TextBox_setText = function (block) {
    const id = Blockly.Python.getInputId(block);
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_TextBox", "M5Objects['TextBox'] = {}");
    return 'M5Objects["TextBox"][' + id + '].setText(' + text + ')' + NEWLINE;
};

Blockly.Python.screen_M5TextBox_setRotate = function (block) {
    const id = Blockly.Python.getInputId(block);
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_TextBox", "M5Objects['TextBox'] = {}");
    return 'M5Objects["TextBox"][' + id + '].setRotate(' + angle + ')' + NEWLINE;
};

Blockly.Python.screen_M5TextBox_controlDisplay = function (block) {
    const id = Blockly.Python.getInputId(block);
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "False";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_TextBox", "M5Objects['TextBox'] = {}");
    return 'M5Objects["TextBox"][' + id + '].show() if (' + state + ') else M5Objects["TextBox"][' + id + '].hide()' + NEWLINE;
};

// Screen - draw rectangle

Blockly.Python.screen_M5Rect_define = function (block) {
    const id = Blockly.Python.getInputId(block);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Rect", "M5Objects['Rect'] = {}");
    return 'M5Objects["Rect"][' + id + '] = M5Rect(' + x + ', ' + y + ', 30, 30, 0x000000, 0xf0f0f0)' + NEWLINE;
};

Blockly.Python.screen_M5Rect_setSize = function (block) {
    const id = Blockly.Python.getInputId(block);
    const width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_NONE) || "0";
    const height = Blockly.Python.valueToCode(block, "HEIGHT", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Rect", "M5Objects['Rect'] = {}");
    return 'M5Objects["Rect"][' + id + '].setSize(' + width + ', ' + height + ')' + NEWLINE;
};

Blockly.Python.screen_M5Rect_setBgColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const fill_color = Blockly.Python.getInputColor(block, "FILL_COLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Rect", "M5Objects['Rect'] = {}");
    return 'M5Objects["Rect"][' + id + '].setBgColor(' + fill_color + ')' + NEWLINE;
};

Blockly.Python.screen_M5Rect_setBorderColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const border_color = Blockly.Python.getInputColor(block, "BORDER_COLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Rect", "M5Objects['Rect'] = {}");
    return 'M5Objects["Rect"][' + id + '].setBorderColor(' + border_color + ')' + NEWLINE;
};

Blockly.Python.screen_M5Rect_setPosition = function (block) {
    const id = Blockly.Python.getInputId(block);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Rect", "M5Objects['Rect'] = {}");
    return 'M5Objects["Rect"][' + id + '].setPosition(' + x + ', ' + y + ')' + NEWLINE;
};

Blockly.Python.screen_M5Rect_controlDisplay = function (block) {
    const id = Blockly.Python.getInputId(block);
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "False";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Rect", "M5Objects['Rect'] = {}");
    return 'M5Objects["Rect"][' + id + '].show() if (' + state + ') else M5Objects["Rect"][' + id + '].hide()' + NEWLINE;
};

// Screen - draw circle

Blockly.Python.screen_M5Circle_define = function (block) {
    const id = Blockly.Python.getInputId(block);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Circle", "M5Objects['Circle'] = {}");
    return 'M5Objects["Circle"][' + id + '] = M5Circle(' + x + ', ' + y + ', 15, 0xfff4d0, 0x22b573)' + NEWLINE;
};

Blockly.Python.screen_M5Circle_setSize = function (block) {
    const id = Blockly.Python.getInputId(block);
    const radius = Blockly.Python.valueToCode(block, "RADIUS", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Circle", "M5Objects['Circle'] = {}");
    return 'M5Objects["Circle"][' + id + '].setSize(' + radius + ')' + NEWLINE;
};

Blockly.Python.screen_M5Circle_setBgColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const fill_color = Blockly.Python.getInputColor(block, "FILL_COLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Circle", "M5Objects['Circle'] = {}");
    return 'M5Objects["Circle"][' + id + '].setBgColor(' + fill_color + ')' + NEWLINE;
};

Blockly.Python.screen_M5Circle_setBorderColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const border_color = Blockly.Python.getInputColor(block, "BORDER_COLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Circle", "M5Objects['Circle'] = {}");
    return 'M5Objects["Circle"][' + id + '].setBorderColor(' + border_color + ')' + NEWLINE;
};

Blockly.Python.screen_M5Circle_setPosition = function (block) {
    const id = Blockly.Python.getInputId(block);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Circle", "M5Objects['Circle'] = {}");
    return 'M5Objects["Circle"][' + id + '].setPosition(' + x + ', ' + y + ')' + NEWLINE;
};

Blockly.Python.screen_M5Circle_controlDisplay = function (block) {
    const id = Blockly.Python.getInputId(block);
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "False";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Circle", "M5Objects['Circle'] = {}");
    return 'M5Objects["Circle"][' + id + '].show() if (' + state + ') else M5Objects["Circle"][' + id + '].hide()' + NEWLINE;
};

// Screen - draw triangle

Blockly.Python.screen_M5Triangle_define = function (block) {
    const id = Blockly.Python.getInputId(block);
    const x1 = Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_NONE) || "0";
    const y1 = Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_NONE) || "0";
    const x2 = Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_NONE) || "0";
    const y2 = Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_NONE) || "0";
    const x3 = Blockly.Python.valueToCode(block, "X3", Blockly.Python.ORDER_NONE) || "0";
    const y3 = Blockly.Python.valueToCode(block, "Y3", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Triangle", "M5Objects['Triangle'] = {}");
    return 'M5Objects["Triangle"][' + id + '] = M5Triangle(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + x3 + ', ' + y3 + ', 0x000000, 0xf0f0f0)' + NEWLINE;
};

Blockly.Python.screen_M5Triangle_setSize = function (block) {
    const id = Blockly.Python.getInputId(block);
    const x1 = Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_NONE) || "0";
    const y1 = Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_NONE) || "0";
    const x2 = Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_NONE) || "0";
    const y2 = Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_NONE) || "0";
    const x3 = Blockly.Python.valueToCode(block, "X3", Blockly.Python.ORDER_NONE) || "0";
    const y3 = Blockly.Python.valueToCode(block, "Y3", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Triangle", "M5Objects['Triangle'] = {}");
    return 'M5Objects["Triangle"][' + id + '].setSize(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + x3 + ', ' + y3 + ')' + NEWLINE;
};

Blockly.Python.screen_M5Triangle_setBgColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const fill_color = Blockly.Python.getInputColor(block, "FILL_COLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Triangle", "M5Objects['Triangle'] = {}");
    return 'M5Objects["Triangle"][' + id + '].setBgColor(' + fill_color + ')' + NEWLINE;
};

Blockly.Python.screen_M5Triangle_setBorderColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const border_color = Blockly.Python.getInputColor(block, "BORDER_COLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Triangle", "M5Objects['Triangle'] = {}");
    return 'M5Objects["Triangle"][' + id + '].setBorderColor(' + border_color + ')' + NEWLINE;
};

Blockly.Python.screen_M5Triangle_controlDisplay = function (block) {
    const id = Blockly.Python.getInputId(block);
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "False";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Triangle", "M5Objects['Triangle'] = {}");
    return 'M5Objects["Triangle"][' + id + '].show() if (' + state + ') else M5Objects["Triangle"][' + id + '].hide()' + NEWLINE;
};

// Screen - draw line

Blockly.Python.screen_M5Line_define = function (block) {
    const id = Blockly.Python.getInputId(block);
    const x1 = Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_NONE) || "0";
    const y1 = Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_NONE) || "0";
    const x2 = Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_NONE) || "0";
    const y2 = Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_NONE) || "0";
    const type = block.getFieldValue("TYPE");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Line", "M5Objects['Line'] = {}");
    return 'M5Objects["Line"][' + id + '] = M5Line(M5Line.' + type + ", " + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', 0xf0f0f0)' + NEWLINE;
};

Blockly.Python.screen_M5Line_setSize = function (block) {
    const id = Blockly.Python.getInputId(block);
    const x1 = Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_NONE) || "0";
    const y1 = Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_NONE) || "0";
    const x2 = Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_NONE) || "0";
    const y2 = Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Line", "M5Objects['Line'] = {}");
    return 'M5Objects["Line"][' + id + '].setSize(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ')' + NEWLINE;
};

Blockly.Python.screen_M5Line_setColor = function (block) {
    const id = Blockly.Python.getInputId(block);
    const color = Blockly.Python.getInputColor(block, "COLOR");
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Line", "M5Objects['Line'] = {}");
    return 'M5Objects["Line"][' + id + '].setColor(' + color + ')' + NEWLINE;
};

Blockly.Python.screen_M5Line_controlDisplay = function (block) {
    const id = Blockly.Python.getInputId(block);
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "False";
    Blockly.Python.addPowerOn("M5Objects", "M5Objects = {}");
    Blockly.Python.addPowerOn("M5Objects_Line", "M5Objects['Line'] = {}");
    return 'M5Objects["Line"][' + id + '].show() if (' + state + ') else M5Objects["Line"][' + id + '].hide()' + NEWLINE;
};