/**
 * @fileoverview Display generators for mBot.
 */

// MAKEBLOCK - LED MATRIX DISPLAY TEXT
Blockly.Arduino.robots_makeBlock_matrixDrawString = function (block) {
    const text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC);
    const x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC);
    const y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC);
    const port = block.getFieldValue("PORT");
    const objName = "ledMatrix_" + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// LED Matrix on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeLEDMatrix " + objName + "(" + port + ");");
    Blockly.Arduino.addSetup(objName + "-brightness", objName + ".setBrightness(8); //Maximum brightness");
    Blockly.Arduino.addSetup(objName + "-colorIndex", objName + ".setColorIndex(1);");
    const c = block.inputList[0].connection.targetBlock();
    if (c && (c.type != 'text')) {
            if (c.type == 'text_join') {
                return objName + ".drawStr(" + x + ", " + y + ", " + text + ".c_str());" + NEWLINE;
            }
            return objName + ".drawStr(" + x + ", " + y + ", String(" + text + ").c_str());" + NEWLINE;
    }
    return objName + ".drawStr(" + x + ", " + y + ", " + text + ");" + NEWLINE;
};

// MAKEBLOCK - LED MATRIX DISPLAY NUMBER
Blockly.Arduino.robots_makeBlock_matrixShowNumber = function (block) {
    const number = Blockly.Arduino.valueToCode(block, "N", Blockly.Arduino.ORDER_ATOMIC);
    const port = block.getFieldValue("PORT");
    const objName = "ledMatrix_" + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// LED Matrix on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeLEDMatrix " + objName + "(" + port + ");");
    Blockly.Arduino.addSetup(objName + "-brightness", objName + ".setBrightness(8); //Maximum brightness");
    Blockly.Arduino.addSetup(objName + "-colorIndex", objName + ".setColorIndex(1);");
    return objName + ".showNum(" + number + ");" + NEWLINE;
};

// MAKEBLOCK - LED MATRIX DISPLAY CLOCK
Blockly.Arduino.robots_makeBlock_matrixShowClock = function (block) {
    const h = Blockly.Arduino.valueToCode(block, "HOUR", Blockly.Arduino.ORDER_ATOMIC);
    const m = Blockly.Arduino.valueToCode(block, "MIN", Blockly.Arduino.ORDER_ATOMIC);
    const port = block.getFieldValue("PORT");
    const objName = "ledMatrix_" + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// LED Matrix on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeLEDMatrix " + objName + "(" + port + ");");
    Blockly.Arduino.addSetup(objName + "-brightness", objName + ".setBrightness(8); //Maximum brightness");
    Blockly.Arduino.addSetup(objName + "-colorIndex", objName + ".setColorIndex(1);");
    return objName + ".showClock(" + h + ", " + m + ", true);" + NEWLINE;
};

// MAKEBLOCK - LED MATRIX DRAW BITMAP
Blockly.Arduino.robots_makeBlock_matrixDrawBitmap = function (block) {
    //const draw = block.getFieldValue("DRAW");
    const x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC);
    const y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC);
    const port = block.getFieldValue("PORT");
    const objName = "ledMatrix_" + port.replace('PORT_', '');
    
    Blockly.Arduino.addDeclaration(objName + '-simu', "// LED Matrix on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeLEDMatrix " + objName + "(" + port + ");");
    Blockly.Arduino.addSetup(objName + "-brightness", objName + ".setBrightness(8); //Maximum brightness");
    Blockly.Arduino.addSetup(objName + "-colorIndex", objName + ".setColorIndex(1);");
    Blockly.Arduino.addDeclaration('declare_matrix_buffer' , "uint8_t drawBuffer[16];" + NEWLINE + "uint8_t *drawTemp;");
    
    let code = "drawTemp = ";
    let binary_img = block.getField("LEDS_MATRIX_BUTTON")['altText_'].split(','); 
    //convert binary img to hex   
    if (binary_img.length != 0) {
        code += "new uint8_t[16] {";
        for (var i = 0; i < binary_img.length; i++) {
            code += "0x" ;
            let hex = parseInt(binary_img[i], 2).toString(16);
            code += (( hex.length > 1) ? hex : "0" + hex );
            if ((i+1) < binary_img.length) code += ",";
        }
        code += "};" + NEWLINE;
    } else {
        code += "new uint8_t[16] {};" + NEWLINE;
    }
    code += "memcpy(drawBuffer, drawTemp, 16);" + NEWLINE + "free(drawTemp);" + NEWLINE +
          objName + ".drawBitmap(" + x + ", " + y + ", 16, drawBuffer);" + NEWLINE;
    return code;
};

// MAKEBLOCK - DEFINE NEOPIXEL
Blockly.Arduino.robots_makeBlock_defineNeopixel = function (block) {
    const slot = block.getFieldValue("SLOT");
    const port = block.getFieldValue("PORT");
    const portNum = port.substr(port.length-1);
    const led = block.getFieldValue("N");
    const objName = "neopixel_" + portNum + "_" + slot;
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Neopixel on " + port + " SLOT_" + slot);
    Blockly.Arduino.addDeclaration('init_makeBlock_npx_' + portNum + slot, "MeRGBLed " + objName + "(" + port + ", " + slot + ", " + led + ");");
    return "";
};

// MAKEBLOCK - CONTROL NEOPIXEL LED
Blockly.Arduino.robots_makeBlock_controlNeopixelLed = function (block) {
    const slot = block.getFieldValue("SLOT");
    const port = block.getFieldValue("PORT");
    const portNum = port.substr(port.length-1);
    const objName = "neopixel_" + portNum + "_" + slot;
    const led = Blockly.Arduino.valueToCode(block, "LED", Blockly.Arduino.ORDER_NONE) || "0";
    const r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_NONE) || "0";
    const g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_NONE) || "0";
    const b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_NONE) || "0";
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Neopixel on " + port + " SLOT_" + slot);
    Blockly.Arduino.addDeclaration(objName,"MeRGBLed " + objName + "(" + port + ", " + slot + ", 30);");
    return objName + ".setColor(" + led + ", " + r + ", " + g + ", " + b + ");" + NEWLINE 
             + objName + ".show();" + NEWLINE;
};

// MAKEBLOCK - CONTROL NEOPIXEL LED
Blockly.Arduino.robots_makeBlock_controlNeopixelPaletteLed = function (block) {
    const slot = block.getFieldValue("SLOT");
    const port = block.getFieldValue("PORT");
    const portNum = port.substr(port.length-1);
    const objName = "neopixel_" + portNum + "_" + slot;
    const led = Blockly.Arduino.valueToCode(block, "LED", Blockly.Arduino.ORDER_NONE) || "0";
    const colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "0, 0, 0";
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Neopixel on " + port + " SLOT_" + slot);
    Blockly.Arduino.addDeclaration(objName, "MeRGBLed " + objName + "(" + port + ", " + slot + ", 30);");
    return objName + ".setColor(" + led + ", " + colour + ");" + NEWLINE 
             + objName + ".show();" + NEWLINE;
};

Blockly.Arduino.robots_makeBlock_neopixel_controlAllLedRGB = function (block) {
    const r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_NONE) || "0";
    const g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_NONE) || "0";
    const b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_NONE) || "0";
    const slot = block.getFieldValue("SLOT");
    const port = block.getFieldValue("PORT");
    const portNum = port.substr(port.length-1);
    const objName = "neopixel_" + portNum + "_" + slot;
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Neopixel on " + port + " SLOT_" + slot);
    Blockly.Arduino.addDeclaration(objName, "MeRGBLed " + objName + "(" + port + ", " + slot + ", 30);");
    Blockly.Arduino.addFunction('neopixel_showAllLed', FUNCTIONS_MBOT.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(&" + objName + ", 30, " + r + "," + g + ", " + b + ");" + NEWLINE;
};

// MAKEBLOCK - NEOPIXEL - ALL PALETTE
Blockly.Arduino.robots_makeBlock_neopixel_controlAllLedPalette = function (block) {
    const colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "(0,0,0)";
    const colourList = colour.match(/([0-9]{1,3})/g);
    const slot = block.getFieldValue("SLOT");
    const port = block.getFieldValue("PORT");
    const portNum = port.substr(port.length-1);
    const objName = "neopixel_" + portNum + "_" + slot;
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Neopixel on " + port + " SLOT_" + slot);
    Blockly.Arduino.addDeclaration(objName, "MeRGBLed " + objName + "(" + port + ", " + slot + ", 30);");
    Blockly.Arduino.addFunction('neopixel_showAllLed', FUNCTIONS_MBOT.DEF_NEOPIXEL_SHOW_ALL_LED);
    return "neopixel_showAllLed(&" + objName + ", 30, " + colourList[0] + ", " + colourList[1] + ", " + colourList[2] + ");" + NEWLINE;
};

// MAKEBLOCK - NEOPIXEL - SET RAINBOW
Blockly.Arduino.robots_makeBlock_rainbowNeopixel = function (block) {
    const slot = block.getFieldValue("SLOT");
    const port = block.getFieldValue("PORT");
    const portNum = port.substr(port.length-1);
    const objName = "neopixel_" + portNum + "_" + slot;
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Neopixel on " + port + " SLOT_" + slot);
    Blockly.Arduino.addDeclaration(objName, "MeRGBLed " + objName + "(" + port + ", " + slot + ", 30);");
    Blockly.Arduino.addFunction('neopixel_showAllLed', FUNCTIONS_MBOT.DEF_NEOPIXEL_SHOW_ALL_LED);
    Blockly.Arduino.addFunction('neopixel_rainbow', FUNCTIONS_MBOT.DEF_NEOPIXEL_RAINBOW);
    return "neopixel_rainbow(&" + objName + ", 30);" + NEWLINE;
};

// MAKEBLOCK - RGB LED CONTROL
Blockly.Arduino.robots_makeBlock_setRgbLed = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = "rgbled_" + port.replace('PORT_', '');
    const ledIndex = block.getFieldValue("LED");
    const r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_NONE) || "0";
    const g = Blockly.Arduino.valueToCode(block, "G", Blockly.Arduino.ORDER_NONE) || "0";
    const b = Blockly.Arduino.valueToCode(block, "B", Blockly.Arduino.ORDER_NONE) || "0";
    Blockly.Arduino.addDeclaration(objName + '-simu', "// RGB LED on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeRGBLed " + objName + "(" + port + ", 4);");
    return objName + ".setColor(" + ledIndex + ", " + r + ", " + g + ", " + b + ");" + NEWLINE 
        + objName + ".show();" + NEWLINE;
};

// MAKEBLOCK - PALETTE RGB LED CONTROL
Blockly.Arduino.robots_makeBlock_setPaletteRgbLed = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = "rgbled_" + port.replace('PORT_', '');
    const ledIndex = block.getFieldValue("LED");
    const colour = Blockly.Arduino.valueToCode(block, "COLOR", Blockly.Arduino.ORDER_NONE) || "0, 0, 0";
    Blockly.Arduino.addDeclaration(objName + '-simu', "// RGB LED on " + port);
    Blockly.Arduino.addDeclaration(objName, "MeRGBLed " + objName + "(" + port + ", 4);");
    return objName + ".setColor(" + ledIndex + ", " + colour + ");" + NEWLINE 
        + objName + ".show();" + NEWLINE;
};

// MAKEBLOCK - SET 4-DIGIT DISPLAY NUMBER
Blockly.Arduino.robots_makeBlock_set4DigitNumber = function (block) {
    const port = block.getFieldValue("PORT");
    const objName = "display4digit_" + port.replace('PORT_', '');
    Blockly.Arduino.addDeclaration(objName + '-simu', "// Me7SegmentDisplay on " + port);
    Blockly.Arduino.addDeclaration(objName, "Me7SegmentDisplay " + objName + "(" + port + ");");
    Blockly.Arduino.addSetup("init_makeBlock_4digit_" + port, objName + ".init();");
    Blockly.Arduino.addSetup("set_4digit_brightness_"+ port, objName + ".set(BRIGHTNESS_7); //Maximum brightness");
    let valeur = Blockly.Arduino.valueToCode(block, "N", Blockly.Arduino.ORDER_ATOMIC);
    if (valeur < -999) valeur = -999;
    if (valeur > 9999) valeur = 9999;
    return objName + ".display(" + valeur + ");" + NEWLINE;
};