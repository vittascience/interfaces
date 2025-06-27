/**
 * @fileoverview Display generators for Buddy.
 */

 
Blockly.Python.display_startCamera = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    return 'buddy.startCamera(0,VisionCbk)' + NEWLINE;
};

Blockly.Python.display_stopCamera = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('VisionCbk', 'VisionCbk = ""');
    return 'buddy.stopCamera(0,VisionCbk)' + NEWLINE;
};

Blockly.Python.display_blinkLed = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const position = block.getFieldValue("POSITION");
    const period  = Blockly.Python.valueToCode(block, "PERIOD", Blockly.Python.ORDER_NONE);
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    
    return "buddy.blinkLed(" + position + ",'#" + r + g + b + "'," + period + ",RspCallback," + lock + ")" + NEWLINE;
};

Blockly.Python.display_blinkAllLed = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const period  = Blockly.Python.valueToCode(block, "PERIOD", Blockly.Python.ORDER_NONE);
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    
    return "buddy.blinkAllLed('#" + r + g + b + "'," + period + ",RspCallback," + lock + ")" + NEWLINE;
};

Blockly.Python.display_updateAllLed = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    
    return "buddy.updateAllLed('#" + r + g + b + "', RspCallback," + lock + ")" + NEWLINE;
};

Blockly.Python.display_fadeAllLed = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const period  = Blockly.Python.valueToCode(block, "PERIOD", Blockly.Python.ORDER_NONE);
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    
    return "buddy.fadeAllLed('#" + r + g + b + "'," + period + ",RspCallback," + lock + ")" + NEWLINE;
};

Blockly.Python.display_updateLedColor = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const position = block.getFieldValue("POSITION");
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    
    return "buddy.updateLedColor(" + position + ",'#" + r + g + b + "', RspCallback," + lock + ")" + NEWLINE;
};

Blockly.Python.display_updateAllLedWithPattern = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const rgb = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE).substr(1).split(")")[0].split(",");
    const pattern = block.getFieldValue("PATTERN");
    const period  = Blockly.Python.valueToCode(block, "PERIOD", Blockly.Python.ORDER_NONE);
    const step  = Blockly.Python.valueToCode(block, "STEP", Blockly.Python.ORDER_NONE);
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    
    return "buddy.updateAllLedWithPattern('#" + r + g + b + "'," + pattern + ", " + period + ", " + step + ", RspCallback," + lock + ")" + NEWLINE;
};

Blockly.Python.display_stopAllLed = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    return 'buddy.stopAllLed(RspCallback,' + lock + ')' + NEWLINE;
};

Blockly.Python.display_stopLed = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const position = block.getFieldValue("POSITION");
    return 'buddy.stop' + position + 'Led(RspCallback,' + lock +')' + NEWLINE;
};

Blockly.Python.display_setFacialExpression = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const lock = block.getFieldValue("LOCK");
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    const expression = block.getFieldValue("EXPRESSION");
    if(speed == "")
        return "buddy.setFacialExpression('" + expression + "'," + lock + ")" + NEWLINE;
    else
        return "buddy.setFacialExpression('" + expression + "',"  + lock + ","+ speed + ")" + NEWLINE;
};

Blockly.Python.display_setMood = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "";
    const expression = block.getFieldValue("EXPRESSION");
    if(speed == "")
        return "buddy.setMood('" + expression + "',RspCallback," + lock + ")" + NEWLINE;
    else
        return "buddy.setMood('" + expression + "',RspCallback," + lock + "," + speed + ")" + NEWLINE;
};


Blockly.Python.display_playFacialEvent = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const lock = block.getFieldValue("LOCK");
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE) || "";
    const expression = block.getFieldValue("EXPRESSION");
    if(speed == "")
        return "buddy.playFacialEvent('" + expression + "'," + lock + ")" + NEWLINE;
    else
        return "buddy.playFacialEvent('" + expression + "'," + lock + "," + speed + ")" + NEWLINE;
};

Blockly.Python.display_setLabialExpression = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const expression = block.getFieldValue("EXPRESSION");
    return "buddy.setLabialExpression('" + expression + "')" + NEWLINE;
};

Blockly.Python.display_setFacePositivity = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const posivity = Blockly.Python.valueToCode(block, "POSITIVITY", Blockly.Python.ORDER_NONE);
    return "buddy.setFacePositivity(" + posivity/100 + ")" + NEWLINE;
};

Blockly.Python.display_setFaceEnergy = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const energy = Blockly.Python.valueToCode(block, "ENERGY", Blockly.Python.ORDER_NONE);
    return "buddy.setFaceEnergy(" + energy/100 + ")" + NEWLINE;
};

Blockly.Python.display_playFacialRelativeEvent = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return "buddy.playFacialRelativeEvent(" + speed + ")" + NEWLINE;
};

Blockly.Python.display_lookAtXY = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE);
    const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE);
    const animation = block.getFieldValue("ANIMATION");
    return "buddy.lookAtXY(" + x + "," + y + "," + animation + ")" + NEWLINE;
};

Blockly.Python.display_lookAt = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    const direction = block.getFieldValue("DIRECTION");
    const animation = block.getFieldValue("ANIMATION");
    return "buddy.lookAtXY('" + direction + "'," + animation + ")" + NEWLINE;
};