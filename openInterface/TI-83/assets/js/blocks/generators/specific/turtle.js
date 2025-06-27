/**
 * @fileoverview Turtle generators for TI-83 Premium CE.
 */

// Move

Blockly.Python.turtle_move = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "0";
    const dir = block.getFieldValue("DIR");
    let code;
    switch (dir) {
        case "FORWARD":
            code = "t.forward(" + distance + ")" + NEWLINE;
            break;
        case "BACKWARD":
            code = "t.backward(" + distance + ")" + NEWLINE;
            break;
        default:
            throw Error("Unknown direction: " + dir);
    }
    return code;
};

Blockly.Python.turtle_turn = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    const dir = block.getFieldValue("DIR");
    let code;
    switch (dir) {
        case "LEFT":
            code = "t.left(" + angle + ")" + NEWLINE;
            break;
        case "RIGHT":
            code = "t.right(" + angle + ")" + NEWLINE;
            break;
        default:
            throw Error("Unknown direction: " + dir);
    }
    return code;
};

Blockly.Python.turtle_goto = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "0";
    return "t.goto(" + x + "," + y + ")" + NEWLINE;
};

Blockly.Python.turtle_done = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.done()" + NEWLINE;
};

// Draw

Blockly.Python.turtle_fillcolor = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "t.fillcolor(" + r + "," + g + "," + b + ")" + NEWLINE;
};

Blockly.Python.turtle_fillcolorPalette = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0, 0, 0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    return "t.fillcolor(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.turtle_setFill = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const fill = block.getFieldValue("FILL");
    let code;
    switch (fill) {
        case "BEGIN":
            code = "t.begin_fill()" + NEWLINE;
            break;
        case "END":
            code = "t.end_fill()" + NEWLINE;
            break;
        default:
            throw Error("Unknown fill: " + fill);
    }
    return code;
};

Blockly.Python.turtle_write = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    return "t.write(" + text + ")" + NEWLINE;
};

Blockly.Python.turtle_dot = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const diameter = Blockly.Python.valueToCode(block, "DIAMETER", Blockly.Python.ORDER_NONE) || "1";
    return "t.dot(" + diameter + ")" + NEWLINE;
};

// Pen

Blockly.Python.turtle_controlPen = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const pen = block.getFieldValue("STATE");
    let code;
    switch (pen) {
        case "UP":
            code = "t.penup()" + NEWLINE;
            break;
        case "DOWN":
            code = "t.pendown()" + NEWLINE;
            break;
        default:
            throw Error("Unknown pen state: " + pen);
    }
    return code;
};

Blockly.Python.turtle_pencolor = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const r = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || "0";
    const g = Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "t.pencolor(" + r + "," + g + "," + b + ")" + NEWLINE;
};

Blockly.Python.turtle_pencolorPalette = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const colour = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "(0, 0, 0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    return "t.pencolor(" + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ")" + NEWLINE;
};

Blockly.Python.turtle_pensize = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const size = Blockly.Python.valueToCode(block, "SIZE", Blockly.Python.ORDER_NONE) || "1";
    return "t.pensize(" + size + ")" + NEWLINE;
};

// Settings

Blockly.Python.turtle_clear = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.clear()" + NEWLINE;
};

Blockly.Python.turtle_controlTurtle = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const state = block.getFieldValue("STATE");
    let code;
    switch (state) {
        case "SHOW":
            code = "t.showturtle()" + NEWLINE;
            break;
        case "HIDE":
            code = "t.hideturtle()" + NEWLINE;
            break;
        default:
            throw Error("Unknown turtle state: " + state);
    }
    return code;
};

Blockly.Python.turtle_hidegrid = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.hidegrid()" + NEWLINE;
};

Blockly.Python.turtle_speed = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "0";
    return "t.speed(" + speed + ")" + NEWLINE;
};

// Turtle - State

Blockly.Python.turtle_home = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.home()" + NEWLINE;
};

Blockly.Python.turtle_setheading = function (block) {
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.setheading(" + angle + ")" + NEWLINE;
};

Blockly.Python.turtle_getCoordinates = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    const axis = block.getFieldValue("AXIS");
    let code;
    switch (axis) {
        case "X":
            code = "t.xcor()";
            break;
        case "Y":
            code = "t.ycor()";
            break;
        default:
            throw Error("Unknown axis: " + state);
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.turtle_heading = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return ["t.heading()", Blockly.Python.ORDER_ATOMIC];
};
