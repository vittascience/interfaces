/**
 * @fileoverview Vocal interactions generators for Buddy.
 */

Blockly.Python.vi_startSpeaking = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    Blockly.Python.addInit('RspCallback', 'RspCallback = ""');
    const lock = block.getFieldValue("LOCK");
    const iText = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    const IExpression  = block.getFieldValue("EXPRESSION");
    return "buddy.startSpeaking("+ iText + ",'" + IExpression + "',RspCallback," + lock + ")" + NEWLINE;
};

Blockly.Python.vi_stopSpeaking = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    return "buddy.stopSpeaking()" + NEWLINE;
};

Blockly.Python.vi_isSpeaking = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    return ["buddy.isSpeaking()",Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vi_setSpeakerVoice = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    const voice = block.getFieldValue("VOICE");
    return "buddy.setSpeakerVoice('" + voice + "')" + NEWLINE;
};

Blockly.Python.vi_setSpeakerVolume = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    const volume  = Blockly.Python.valueToCode(block, "VOLUME", Blockly.Python.ORDER_NONE);
    return "buddy.setSpeakerVolume(" + volume + ")" + NEWLINE;
};

Blockly.Python.vi_getSpeakerVolume = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    return ["buddy.getSpeakerVolume()",Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vi_setSpeakerSpeed = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    const speed  = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return "buddy.setSpeakerSpeed(" + speed + ")" + NEWLINE;
};

Blockly.Python.vi_getSpeakerSpeed = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    return ["buddy.getSpeakerSpeed()",Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.vi_setSpeakerPitch = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    const pitch  = Blockly.Python.valueToCode(block, "PITCH", Blockly.Python.ORDER_NONE);
    return "buddy.setSpeakerPitch (" + pitch + ")" + NEWLINE;
};

Blockly.Python.vi_getSpeakerPitch = function (block) {
    Blockly.Python.addImport('buddySDK', IMPORT_BUDDY_SDK);
    Blockly.Python.addInit('buddy', 'buddy = BuddySDK()');
    Blockly.Python.addInit('LoadReadSpeaker', 'buddy.loadReadSpeaker()');
    return ["buddy.getSpeakerPitch()",Blockly.Python.ORDER_ATOMIC];
};