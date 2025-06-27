/**
 * @fileoverview Turtle generators for Python.
 */

Blockly.Python.turtle_direction = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const dir = block.getFieldValue("DIR");
    let distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "None";
    let code;
    if (distance > 200) distance = 200;
    switch (dir) {
        case "FORWARD":
            code = "turtle.forward(" + distance + ")" + NEWLINE;
            break;
        case "BACKWARD":
            code = "turtle.backward(" + distance + ")" + NEWLINE;
            break;
        default:
            throw Error("Unknown direction: " + dir);
    }
    return code;
};

Blockly.Python.turtle_turn = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const dir = block.getFieldValue("DIR");
    let distance = Blockly.Python.valueToCode(block, "DISTANCE", Blockly.Python.ORDER_NONE) || "None";
    let code;
    if (distance > 200) distance = 200;
    switch (dir) {
        case "RIGHT":
            code = "turtle.right(" + distance + ")" + NEWLINE;
            break;
        case "LEFT":
            code = "turtle.left(" + distance + ")" + NEWLINE;
            break;
        default:
            throw Error("Unknown direction: " + dir);
    }
    return code;
};

Blockly.Python.turtle_goto = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "None";
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || "None";
    return "turtle.goto(" + x + "," + y + ")" + NEWLINE;
};

Blockly.Python.turtle_circle = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const radius = Blockly.Python.valueToCode(block, "RADIUS", Blockly.Python.ORDER_NONE) || "None";
    return "turtle.circle(" + radius + ")" + NEWLINE;
};

Blockly.Python.turtle_arc = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const radius = Blockly.Python.valueToCode(block, "RADIUS", Blockly.Python.ORDER_NONE) || "None";
    const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "None";
    return "turtle.circle(" + radius + "," + angle + ")" + NEWLINE;
};

Blockly.Python.turtle_write = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const size = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "None";
    const word = Blockly.Python.valueToCode(block, "TYPE", Blockly.Python.ORDER_NONE) || "None";
    return "turtle.write(" + word + ", None, None, \"" + size + "pt normal\")" + NEWLINE;
};

Blockly.Python.turtle_shape = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    return "turtle.shape(\"" + block.getFieldValue("TYPE") + "\")" + NEWLINE;
};

Blockly.Python.turtle_colour = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const turtleColor = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "white";
    const width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_NONE) || "None";
    return "turtle.color('#%02x%02x%02x' % " + turtleColor + ")" + NEWLINE + "turtle.width(" + width + ")" + NEWLINE;
};

Blockly.Python.turtle_fill = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const fillColor = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "white";
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const res = branchCode.split(NEWLINE);
    let finalres = "";
    for (var i = 0; i < res.length; i++) {
        finalres += res[i].substr(2) + NEWLINE;
    }
    return "turtle.fillcolor('#%02x%02x%02x' % " + fillColor + ")" + NEWLINE + "turtle.begin_fill()" + NEWLINE + finalres.substr(0, finalres.length - 1) + "turtle.end_fill()" + NEWLINE;
};

Blockly.Python.turtle_pen = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const pen = block.getFieldValue("PEN");
    let code;
    switch (pen) {
        case "UP":
            code = "turtle.penup()" + NEWLINE;
            break;
        case "DOWN":
            code = "turtle.pendown()" + NEWLINE;
            break;
        default:
            throw Error("Unknown pen function: " + pen);
    }
    return code;
};

Blockly.Python.turtle_visibility = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const visible = block.getFieldValue("VISIBILITY");
    let code;
    switch (visible) {
        case "SHOW":
            code = "turtle.showturtle()" + NEWLINE;
            break;
        case "HIDE":
            code = "turtle.hideturtle()" + NEWLINE;
            break;
        default:
            throw Error("Unknown turtle visibility: " + visible);
    }
    return code
};

Blockly.Python.turtle_stamp = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    return "turtle.stamp()" + NEWLINE;
};

Blockly.Python.turtle_speed = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const speed = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "None";
    return "turtle.speed(" + speed + ")" + NEWLINE;
};

Blockly.Python.turtle_reset = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    return "turtle.reset()" + NEWLINE;
};

Blockly.Python.turtle_screen_setup = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle_screen', 'sc = turtle.Screen()');
    const width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_NONE) || "None";
    const height = Blockly.Python.valueToCode(block, "HEIGHT", Blockly.Python.ORDER_NONE) || "None";
    return `sc.setup(${width}, ${height})` + NEWLINE;
};

Blockly.Python.turtle_screen_color = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle_screen', 'sc = turtle.Screen()');
    const turtleColor = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "white";
    const rgbValues = turtleColor.match(/\d+/g).map(Number);
    return `sc.bgcolor("#${rgbValues.map(val => val.toString(16).padStart(2, '0')).join('')}")` + NEWLINE;
};

// not displayed block
Blockly.Python.turtle_color = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const fillColor = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "white";
    return "turtle.color('#%02x%02x%02x' % " + fillColor + ")" + NEWLINE
}

Blockly.Python.turtle_width = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_NONE) || "None";
    return "turtle.width(" + width + ")" + NEWLINE
}

Blockly.Python.turtle_fillcolor = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    const fillColor = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE) || "white";
    return "turtle.fillcolor('#%02x%02x%02x' % " + fillColor + ")" + NEWLINE
}

Blockly.Python.turtle_fillbegin = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    return "turtle.begin_fill()" + NEWLINE
}


Blockly.Python.turtle_fillend = function (block) {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    return "turtle.end_fill()" + NEWLINE
}