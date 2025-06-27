/**
 * @fileoverview Communication generators for Galaxia.
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

Blockly.Python.communication_onSerialDataReceived = function (block) {
    Blockly.Python.addInit('serial_receive', "# Serial Receive used ");
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    var dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read()" + NEWLINE + branchCode;
};

Blockly.Python.communication_uart_writeData = function (block) {
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return "uart.write(" + data + ")" + NEWLINE;
    } else {
        return "uart.write(str(" + data + ")" + ")" + NEWLINE;
    }
};

Blockly.Python.communication_uart_readData = function () {
    return ["uart.read()",Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.communication_uart_isDataAvailable = function () {
    return ["uart.any()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_graphSerialWrite = function (block) {
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
    code += "')" + NEWLINE + "sleep(50)" + NEWLINE;
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

Blockly.Python.communication_playComputerMusic = function (block) {
    let note = block.getFieldValue("NOTE");
    return "print('@music:" + note + "|')" + NEWLINE;
};

Blockly.Python.communication_playComputerFrequency = function (block) {
    let frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_ATOMIC);
    return "print('@music:' + str(" + frequency + ") + '|')" + NEWLINE;
};

Blockly.Python.communication_stopComputerMusic = function () {
    return "print('@music:stop|')" + NEWLINE;
};

Blockly.Python.communication_serialInit = function (block) {
    let pinTX = block.getFieldValue("TX");
    let pinRX = block.getFieldValue("RX");
    return "uart.init(baudrate=" + block.getFieldValue("BAUD") + ", bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE;
};

Blockly.Python.communication_serialRedirectUSB = function () {
    return "uart.init(baudrate=115200, bits=8, parity=None, stop=1)" + NEWLINE;
};

// Galaxia radio

Blockly.Python.communication_radioSendString = function (block) {
    const str = Blockly.Python.valueToCode(block, "STR", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "STR")) {
        return "radio.send(" + str + ")" + NEWLINE;
    } else {
        return "radio.send(str(" + str + "))" + NEWLINE;
    }
};

Blockly.Python.communication_radioSendNumber = function (block) {
    Blockly.Python.addFunction('radio_send', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_COM_RADIO_SEND);
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    return "radio_send(" + n + ")" + NEWLINE;
};

Blockly.Python.communication_radioSendValue = function (block) {
    Blockly.Python.addFunction('radio_sendValue', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_COM_RADIO_SEND_VALUE);
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "''";
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return "radio_sendValue(" + name + ", " + value + ")" + NEWLINE;

};

Blockly.Python.communication_onRadioDataReceived = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return dataVar + " = radio.receive()" + NEWLINE + "if " + dataVar + ":" + NEWLINE + branchCode;
};

Blockly.Python.communication_onRadioNumberReceived = function (block) {
    Blockly.Python.addFunction('radio_receiveData', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_COM_RADIO_RECEIVE_DATA);
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return dataVar + " = radio_receiveData()" + NEWLINE + "if " + dataVar + " is not None:" + NEWLINE + branchCode;
};

Blockly.Python.communication_onRadioValueReceived = function (block) {
    Blockly.Python.addFunction('radio_receiveValue', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_COM_RADIO_RECEIVE_VALUE);
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const nameVar = Blockly.Python.nameDB_.getName(block.getFieldValue("NAME"), Blockly.VARIABLE_CATEGORY_NAME) || "''";
    const valueVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VALUE"), Blockly.VARIABLE_CATEGORY_NAME) || "''";
    return nameVar + ", " + valueVar + " = radio_receiveValue()" + NEWLINE + "if " + nameVar + " is not None and " + valueVar + " is not None:" + NEWLINE + branchCode;
};

Blockly.Python.communication_radioConfig = function (block) {
    var canal = Blockly.Python.valueToCode(block, "CANAL", Blockly.Python.ORDER_NONE) || "0";
    if (canal > 83) canal = 83;
    if (canal < 0) canal = 0;
    var power = Blockly.Python.valueToCode(block, "POWER", Blockly.Python.ORDER_NONE) || "0";
    if (power > 7) power = 7;
    if (power < 0) power = 0;
    var len = Blockly.Python.valueToCode(block, "LEN", Blockly.Python.ORDER_NONE) || "0";
    if (len > 251) len = 251;
    if (len < 0) len = 0;
    var group = Blockly.Python.valueToCode(block, "GROUP", Blockly.Python.ORDER_NONE) || "0";
    if (group > 255) group = 255;
    if (group < 0) group = 0;
    return "radio.config(channel = " + canal + ", power = " + power + ", length = " + len + ", group=" + group + ")" + NEWLINE;
};

// Data logging

Blockly.Python.communication_writeOpenLogSd = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const baudrate = block.getFieldValue("BAUD");
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addInit('sd_module_' + block.getFieldValue("TX"), "# Lecteur SD on " + block.getFieldValue("TX"));
    return "uart.init(baudrate=" + baudrate + ", bits=8, parity=None, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "uart.write(" + data + " + '\\n')" + NEWLINE;
};

// Wireless transmission

Blockly.Python.communication_sendBluetoothData = function (block) {
    let pinTX = block.getFieldValue("TX");
    let pinRX = block.getFieldValue("RX");
    var data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "uart.write(" + data + ")" + NEWLINE;
    } else {
        return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "uart.write(str(" + data + "))" + NEWLINE;
    }
};

Blockly.Python.communication_onBluetoothDataReceived = function (block) {
    let pinTX = block.getFieldValue("TX");
    let pinRX = block.getFieldValue("RX");
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    var dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read()" + NEWLINE + branchCode;
};

Blockly.Python.communication_HM10_sendBluetoothData = function (block) {
    let pinTX = block.getFieldValue("TX");
    let pinRX = block.getFieldValue("RX");
    var data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "uart.write(" + data + ")" + NEWLINE;
    } else {
        return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "uart.write(str(" + data + "))" + NEWLINE;
    }
};

Blockly.Python.communication_HM10_onBluetoothDataReceived = function (block) {
    let pinTX = block.getFieldValue("TX");
    let pinRX = block.getFieldValue("RX");
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    var dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "if uart.any():" + NEWLINE + "  " + dataVar + " = str(uart.read())[2:-1]" + NEWLINE + branchCode;
};

// Tracking modules

Blockly.Python.communication_onGPSDataReceived = function (block) {
    Blockly.Python.addInit('gps_module', "# GPS on UART");
    let pinTX = block.getFieldValue("TX");
    let pinRX = block.getFieldValue("RX");
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    var dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read()" + NEWLINE + branchCode;
};

Blockly.Python.communication_analyzeGPSInfo = function (block) {
    Blockly.Python.addFunction('gps_getInformation', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GPS_GET_GGA_INFORMATIONS);
    Blockly.Python.addFunction('gps_getTime', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_COM_GPS_GET_CLOCK);
    Blockly.Python.addFunction('gps_getPosition', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_COM_GPS_GET_POS);
    var dataVar = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_MEMBER) || "''";
    return ["gps_getInformations(" + dataVar + ", info=" + block.getFieldValue("INFO") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_clockRTC_setDate = function (block) {
    const date = block.getFieldValue("DATE").split("-");
    const module = block.getFieldValue("MODULE");
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('galaxia_pcf85063tp', IMPORT_GALAXIA_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=i2c, addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_hp.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('galaxia_ds1307', IMPORT_GALAXIA_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=i2c, addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            return "clock_v1.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_v1.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
    }
};

Blockly.Python.communication_clockRTC_setHour = function (block) {
    const hour = Blockly.Python.valueToCode(block, "HOUR", Blockly.Python.ORDER_ATOMIC);
    const minute = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_ATOMIC);
    const second = Blockly.Python.valueToCode(block, "SEC", Blockly.Python.ORDER_ATOMIC);
    const module = block.getFieldValue("MODULE");
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('galaxia_pcf85063tp', IMPORT_GALAXIA_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=i2c, addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('galaxia_ds1307', IMPORT_GALAXIA_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=i2c, addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            return "clock_v1.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
    }

};

Blockly.Python.communication_clockRTC_readTime = function (block) {
    const module = block.getFieldValue("MODULE");
    const data = block.getFieldValue("DATA");
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('galaxia_pcf85063tp', IMPORT_GALAXIA_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=i2c, addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            if (data == "ALL") {
                return ["clock_hp.readTime()", Blockly.Python.ORDER_ATOMIC];
            } else {
                return ["clock_hp.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
            }
        case "DS1307":
            Blockly.Python.addImport('galaxia_ds1307', IMPORT_GALAXIA_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=i2c, addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            if (data == "ALL") {
                return ["clock_v1.readTime()", Blockly.Python.ORDER_ATOMIC];
            } else {
                return ["clock_v1.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
            }
    }
};