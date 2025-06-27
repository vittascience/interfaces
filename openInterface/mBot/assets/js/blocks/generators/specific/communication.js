/**
 * @fileoverview Communication generators for mBot.
 */

Blockly.Arduino.communication_serialBegin = function (block) {
    const baudrate = Blockly.Arduino.valueToCode(block, "SPEED", Blockly.Arduino.ORDER_ATOMIC) || '9600';
    return "Serial.begin(" + baudrate + ");" + NEWLINE;
};

Blockly.Arduino.communication_serialWrite_simple = function (block) {
    const text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC) || "\"\"";
    return "Serial.println(String(" + text + "));" + NEWLINE;
};

Blockly.Arduino.communication_serialWrite = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC) || "\"\"";;
    let newlines = block.getFieldValue("NEWLINES");
    if (newlines !== null) {
        newlines = parseInt(newlines);
        if (newlines === 0) {
            if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
                return "Serial.print(" + text + ");" + NEWLINE;
            } else {
                return "Serial.print(String(" + text + "));" + NEWLINE;
            }
        } else {
            if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
                if (newlines === 1) {
                    return "Serial.println(" + text + ");" + NEWLINE;
                } else {
                    return "Serial.println(String(" + text + ") + \"" + "\\n".repeat(newlines - 1) + "\");" + NEWLINE;
                }
            } else {
                if (newlines === 1) {
                    return "Serial.println(String(" + text + "));" + NEWLINE;
                } else {
                    return "Serial.println(String(" + text + ") + \"" + "\\n".repeat(newlines - 1) + "\");" + NEWLINE;
                }
            }
        }
    } else {
        if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
            return "Serial.println(" + text + ");" + NEWLINE;
        } else {
            return "Serial.println(String(" + text + "));" + NEWLINE;
        }
    }
};

Blockly.Arduino.communication_onSerialDataReceived = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    var dtaVar = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    let branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    return "if (Serial.available()) {" + NEWLINE + TAB + dtaVar + " = Serial.readString();" + NEWLINE + branchCode + "}" + NEWLINE;
};

Blockly.Arduino.communication_graphSerialWrite = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    if (block.itemCount_ === 0) return '';
    var c, b = [];
    b[0] = "Serial.print(\"@Graph:\");\n";
    for (var d = 1; d < block.itemCount_ + 1; d++) {
        c = Blockly.Arduino.valueToCode(block, "ADD" + (d - 1), Blockly.Arduino.ORDER_NONE);
        if (c[c.length - 1] === '|') {
            c = c.substring(0, c.length - 1);
            let data = c.split(/:(.+)/);
            if (isNaN(data[1])) {
                if (data[1] == "NULL") { data[1] = "\"\""; }
                b[d] = "Serial.print(\"" + data[0] + ":\");\nSerial.print(" + data[1] + ");\nSerial.print(\"|\");\n";
            } else
                b[d] = "Serial.print(\"" + c + "|\");\n";
        } else if (!isNaN(c) && c !== '') {
            b[d] = "Serial.print(\"" + c + "|\");\n";
        } else {
            b[d] = "Serial.print(" + c + ");\nSerial.print(\"|\");\n";
        }
    }
    b[d + 1] = "Serial.print(\"\\n\");" + NEWLINE + "delay(50);" + NEWLINE;
    b = b.join('');
    return b;
};

Blockly.Arduino.communication_graphSerialWrite_datasFormat = function (block) {
    var name = block.getFieldValue("NAME");
    var data = Blockly.Arduino.valueToCode(block, "DATA", Blockly.Arduino.ORDER_ATOMIC) || 'NULL';
    if (name == "") name = '""';
    if (!isNaN(data)) {
        data = data.toString();
    }
    let code = name + ":" + data + "|";
    return [code.toString(), Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.communication_playComputerMusic = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    let note = block.getFieldValue("NOTE");
    return "Serial.println(\"@music:" + note + "|\");" + NEWLINE;
};

Blockly.Arduino.communication_playComputerFrequency = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    let frequency = Blockly.Arduino.valueToCode(block, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC);
    return "Serial.println(\"@music:" + frequency + "|\");" + NEWLINE;
};

Blockly.Arduino.communication_stopComputerMusic = function () {
    Blockly.Arduino.Generators.setupSerialConnection();
    return "Serial.println(\"@music:stop|\");" + NEWLINE;
};
