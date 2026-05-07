/**
 * @fileoverview Communication generators for Eliobot.
 */

// Serial connection

Blockly.Python.communication_serialWrite = function (block) {
    const text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "\"\"";
    let newlines = block.getFieldValue("NEWLINES");
    if (newlines !== null) newlines = parseInt(newlines);
    if (newlines === 0 || newlines === null || newlines === undefined) {
        if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
            return "print(" + text + ")" + NEWLINE;
        } else {
            return "print(str(" + text + "))" + NEWLINE;
        }
    } else {
        if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
            return "print(" + text + " + \"" + "\\n".repeat(newlines) + "\")" + NEWLINE;
        } else {
            return "print(str(" + text + ") + \"" + "\\n".repeat(newlines) + "\")" + NEWLINE;
        }
    }
};

Blockly.Python.communication_graphSerialWrite = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    var c = [];
    let code = "print('@Graph:";
    for (var d = 1; d < block.itemCount_ + 1; d++) {
        c = Blockly.Python.valueToCode(block, "ADD" + (d - 1), Blockly.Python.ORDER_NONE);
        if (c[c.length - 1] === '|') {
            c = c.substring(0, c.length - 1);
            let data = c.split(':');
            code += data[0] + ":' + str(" + data[1] + ") + '|";
        }
    }
    code += "')" + NEWLINE + "time.sleep(50)" + NEWLINE;
    return code;
};

Blockly.Python.communication_graphSerialWrite_datasFormat = function (block) {
    var name = block.getFieldValue("NAME");
    var data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_ATOMIC);
    if (name == "") name = '""';
    if (!isNaN(data)) {
        data = data.toString();
    }
    let syntax = name + ":" + data + "|";
    return [syntax.toString(), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_ir_remote_read = function(block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('pulseio', IMPORT_PULSEIO);
    Blockly.Python.addInit('ir_receivers','ir_receivers = [pulseio.PulseIn(board.IO5, maxlen=200, idle_state=True), pulseio.PulseIn(board.IO7, maxlen=200, idle_state=True)]');
    Blockly.Python.addInit('decoders', 'decoders = [IRRemote(ir_receivers[0]), IRRemote(ir_receivers[1])]');
    Blockly.Python.addInit('irUsed', 'irUsed = 0');
    const direction = block.getFieldValue('DIRECTION');
    return `irUsed = ${direction}` + NEWLINE + `read_signal = decoders[irUsed].decode_signal()` + NEWLINE;
};

Blockly.Python.communication_ir_remote = function(block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('pulseio', IMPORT_PULSEIO);
    const button = block.getFieldValue('IR_REMOTE_BUTTON');
    const statement = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
    return `if read_signal == IRRemote.signals['signal_${button}'] :` + NEWLINE + statement;
};

Blockly.Python.communication_ir_remote_boolean = function(block) {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('pulseio', IMPORT_PULSEIO);
    const button = block.getFieldValue('IR_REMOTE_BUTTON');
    return [`read_signal == IRRemote.signals['signal_${button}']`, Blockly.Python.ORDER_ATOMIC];
};