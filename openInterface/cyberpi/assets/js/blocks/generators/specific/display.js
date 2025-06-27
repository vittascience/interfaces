/**
 * @fileoverview Display generators for CyberPi.
 */

// RGB LEDs

Blockly.Python.cyberpi_led_on_all_RGB = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const red = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC) || "0";
    const green = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_ATOMIC) || "0";
    const blue = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_ATOMIC) || "0";
    return "cyberpi.led.on(" + red + ", " + green + ", " + blue + ")" + NEWLINE;
};

Blockly.Python.cyberpi_led_on_all_palette = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    return "cyberpi.led.on(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.cyberpi_led_on_RGB = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const red = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC) || "0";
    const green = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_ATOMIC) || "0";
    const blue = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_ATOMIC) || "0";
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "\'all\'";
    return "cyberpi.led.on(" + red + ", " + green + ", " + blue + ", id=" + id + ")" + NEWLINE;
};

Blockly.Python.cyberpi_led_on_palette = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    const id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_NONE) || "\'all\'";
    return "cyberpi.led.on(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ", id=" + id + ")" + NEWLINE;
};

Blockly.Python.cyberpi_led_play = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const animation = block.getFieldValue("ANIMATION");
    return "cyberpi.led.play(\'" + animation + "\')" + NEWLINE;
};

Blockly.Python.cyberpi_led_move = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const step = Blockly.Python.valueToCode(block, "STEP", Blockly.Python.ORDER_ATOMIC) || "0";
    return "cyberpi.led.move(" + step + ")" + NEWLINE;
};

Blockly.Python.cyberpi_led_set_brightness = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const brightness = Blockly.Python.valueToCode(block, "BRIGHTNESS", Blockly.Python.ORDER_ATOMIC) || "0";
    return "cyberpi.led.set_bri(" + brightness + ")" + NEWLINE;
};

Blockly.Python.cyberpi_led_get_brightness = function () {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    return ["cyberpi.led.get_bri()", Blockly.Python.ORDER_ATOMIC];
};

// Console

Blockly.Python.cyberpi_console_print = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "\"\"";
    let newlines = block.getFieldValue("NEWLINES");
    if (newlines !== null) newlines = parseInt(newlines);
    if (newlines === 0 || newlines === null || newlines === undefined) {
        if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
            return "cyberpi.console.print(" + text + ")" + NEWLINE;
        } else {
            return "cyberpi.console.print(str(" + text + "))" + NEWLINE;
        }
    } else {
        if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
            return "cyberpi.console.println(" + text + " + \"" + "\\n".repeat(newlines-1) + "\")" + NEWLINE;
        } else {
            return "cyberpi.console.println(str(" + text + ") + \"" + "\\n".repeat(newlines-1) + "\")" + NEWLINE;
        }
    }
};

Blockly.Python.cyberpi_console_set_font = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const fontsize = block.getFieldValue("FONTSIZE");
    return "cyberpi.console.set_font(" + fontsize + ")" + NEWLINE;
} 

// Text

Blockly.Python.cyberpi_display_show_label = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "\"\"";
    const fontsize = block.getFieldValue("FONTSIZE");;
    const position = block.getFieldValue("POSITION");
    return "cyberpi.display.show_label(" + text + ", " + fontsize + ", \'" + position + "\')" + NEWLINE; 
};

Blockly.Python.cyberpi_display_show_label_xy = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "\"\"";
    const fontsize = block.getFieldValue("FONTSIZE");
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.display.show_label(" + text + ", " + fontsize + ", " + x + "," + y + ")" + NEWLINE;
};

// Graphic

Blockly.Python.cyberpi_linechart_add = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.linechart.add(" + data + ")" + NEWLINE;
};

Blockly.Python.cyberpi_linechart_set_step = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const step = Blockly.Python.valueToCode(block, "STEP", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.linechart.set_step(" + step + ")" + NEWLINE;
};

Blockly.Python.cyberpi_barchart_add = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.barchart.add(" + data + ")" + NEWLINE;
};

Blockly.Python.cyberpi_table_add = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "0";
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    return "cyberpi.table.add(" + x + ", " + y + ", " + data + ")" + NEWLINE;
};

Blockly.Python.cyberpi_chart_map = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    Blockly.Python.addFunction('map', FUNCTIONS.DEF_PYTHON_MAP);
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ADDITIVE) || "0";
    const min1 = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_ADDITIVE) || "0";
    const max1 = Blockly.Python.valueToCode(block, "MAX", Blockly.Python.ORDER_ADDITIVE) || "0";
    return ["map(" + value + ", " + min1 + ", " + max1 + ", 0, 100)", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.cyberpi_chart_set_brush = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_ATOMIC) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_ATOMIC) || "0";
    return "cyberpi.display.set_brush(" + r + ", " + g + ", " + b + ")" + NEWLINE;
};

Blockly.Python.cyberpi_chart_set_brush_palette = function (block) {
    Blockly.Python.addImport('cyberpi', IMPORT_CYBERPI);
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    return "cyberpi.display.set_brush(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};
