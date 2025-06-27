/**
 * @fileoverview Communication generators for Raspberry Pi Pico.
 */

// Internal Bluetooth

Blockly.Python.communication_StartBT = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('ble_uart', IMPORT_ESP32_BLE_UART);
    Blockly.Python.addImport('bluetooth', IMPORT_BLUETOOTH);
    Blockly.Python.addInit('ble', 'ble = bluetooth.BLE()');
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "''";
    return "uart = UART_BLE(ble, name=" + name + ")" + NEWLINE + "utime.sleep_ms(2500)" + NEWLINE;
};

Blockly.Python.communication_SendBT = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    return 'utime.sleep_ms(1000)' + NEWLINE 
        + "try:" + NEWLINE
        + "  uart.write(" + data + ")" + NEWLINE
        + "except:" + NEWLINE
        + "  print('Raspberry Pi Pico not connected to any device')" + NEWLINE;
};

Blockly.Python.communication_BLE_ReadData = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read().decode().strip()" + NEWLINE + branchCode;
};

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
    code += "')" + NEWLINE + "utime.sleep_ms(50)" + NEWLINE;
    Blockly.Python.addImport('utime', IMPORT_UTIME);
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
    const note = block.getFieldValue("NOTE");
    return "print('@music:" + note + "|')" + NEWLINE;
};

Blockly.Python.communication_playComputerFrequency = function (block) {
    const frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_ATOMIC);
    return "print('@music:' + str(" + frequency + ") + '|')" + NEWLINE;
};

Blockly.Python.communication_stopComputerMusic = function () {
    return "print('@music:stop|')" + NEWLINE;
};

Blockly.Python.communication_onSerialDataReceived = function (block) {
    Blockly.Python.addInit('serial_receive', "# Serial Receive used ");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read()" + NEWLINE + branchCode;
};

// Raspberry Pi Pico radio

Blockly.Python.communication_radioSendString = function (block) {
    Blockly.Python.addImport('radio', IMPORT_RADIO);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const str = Blockly.Python.valueToCode(block, "STR", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "STR")) {
        return "radio.send(" + str + ")" + NEWLINE;
    } else {
        return "radio.send(str(" + str + "))" + NEWLINE;
    }
};

Blockly.Python.communication_radioSendNumber = function (block) {
    Blockly.Python.addImport('radio', IMPORT_RADIO);
    Blockly.Python.addFunction('radio_send', FUNCTIONS_PICO.DEF_COM_RADIO_SEND);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    return "radio_send(" + n + ")" + NEWLINE;
};

Blockly.Python.communication_radioSendValue = function (block) {
    Blockly.Python.addImport('radio', IMPORT_RADIO);
    Blockly.Python.addFunction('radio_sendValue', FUNCTIONS_PICO.DEF_COM_RADIO_SEND_VALUE);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_NONE) || "''";
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "0";
    return "radio_sendValue(" + name + ", " + value + ")" + NEWLINE;
};

Blockly.Python.communication_onRadioDataReceived = function (block) {
    Blockly.Python.addImport('radio', IMPORT_RADIO);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return dataVar + " = radio.receive()" + NEWLINE + "if " + dataVar + ":" + NEWLINE + branchCode;
};

Blockly.Python.communication_onRadioNumberReceived = function (block) {
    Blockly.Python.addImport('radio', IMPORT_RADIO);
    Blockly.Python.addFunction('radio_receiveData', FUNCTIONS_PICO.DEF_COM_RADIO_RECEIVE_DATA);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return dataVar + " = radio_receiveData()" + NEWLINE + "if " + dataVar + " is not None:" + NEWLINE + branchCode;
};

Blockly.Python.communication_onRadioValueReceived = function (block) {
    Blockly.Python.addImport('radio', IMPORT_RADIO);
    Blockly.Python.addFunction('radio_receiveValue', FUNCTIONS_PICO.DEF_COM_RADIO_RECEIVE_VALUE);
    Blockly.Python.addPowerOn('radio', "radio.on()");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const nameVar = Blockly.Python.nameDB_.getName(block.getFieldValue("NAME"), Blockly.VARIABLE_CATEGORY_NAME) || "''";
    const valueVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VALUE"), Blockly.VARIABLE_CATEGORY_NAME) || "''";
    return nameVar + ", " + valueVar + " = radio_receiveValue()" + NEWLINE + "if " + nameVar + " is not None and " + valueVar + " is not None:" + NEWLINE + branchCode;
};

Blockly.Python.communication_radioConfig = function (block) {
    Blockly.Python.addImport('radio', IMPORT_RADIO);
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

// Bluetooth

Blockly.Python.communication_sendBluetoothData = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "uart.write(" + data + ")" + NEWLINE;
    } else {
        return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "uart.write(str(" + data + "))" + NEWLINE;
    }
};

Blockly.Python.communication_onBluetoothDataReceived = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read()" + NEWLINE + branchCode;
};

Blockly.Python.communication_HM10_sendBluetoothData = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "uart.write(" + data + ")" + NEWLINE;
    } else {
        return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "uart.write(str(" + data + "))" + NEWLINE;
    }
};

Blockly.Python.communication_HM10_onBluetoothDataReceived = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "if uart.any():" + NEWLINE + "  " + dataVar + " = str(uart.read())[2:-1]" + NEWLINE + branchCode;
};

// Tracking modules

Blockly.Python.communication_gps_getNMEA = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Python.addInit('gps_module', "# GPS on UART");
    Blockly.Python.addInit('gpsInfos', "gpsInfos = {}");
    Blockly.Python.addInit('gpsInfos[\'nmea\']', "gpsInfos['nmea'] = None");
    block.workspace.createVariable('gpsInfos');
    Blockly.Python.addInit('gpsBuffer', "gpsBuffer = \"\"");
    block.workspace.createVariable('gpsBuffer');
    Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_PICO.DEF_GPS_READ_NMEA);
    return ["gps_readNMEA(" + pinRX + ", " + pinTX + ", True)", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_gps_getGGAInformations = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const info = block.getFieldValue("INFO");
    Blockly.Python.addInit('gps_module', "# GPS on UART");
    Blockly.Python.addInit('gpsInfos', "gpsInfos = {}");
    Blockly.Python.addInit('gpsInfos[\'nmea\']', "gpsInfos['nmea'] = None");
    block.workspace.createVariable('gpsInfos');
    Blockly.Python.addInit('gpsBuffer', "gpsBuffer = \"\"");
    block.workspace.createVariable('gpsBuffer');
    Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_PICO.DEF_GPS_READ_NMEA);
    Blockly.Python.addFunction('gps_GGA_getInformation', FUNCTIONS_PICO.DEF_GPS_GET_GGA_INFORMATIONS);
    return ["gps_GGA_getInformation(" + pinRX + ", " + pinTX + ", '" + info + "')", Blockly.Python.ORDER_ATOMIC];
};

// 05/22 The 2 following blocks removed from toolbox. We keep the block cause of user projects.

Blockly.Python.communication_onGPSDataReceived = function (block) {
    Blockly.Python.addInit('gps_module', "# GPS on UART");
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "uart.init(baudrate=9600, bits=8, parity=None, stop=1, tx=" + pinTX + ", rx=" + pinRX + ")" + NEWLINE + "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read()" + NEWLINE + branchCode;
};

Blockly.Python.communication_analyzeGPSInfo = function (block) {
    Blockly.Python.addFunction('gps_getInformation', FUNCTIONS_PICO.DEF_COM_GPS_READ);
    Blockly.Python.addFunction('gps_getTime', FUNCTIONS_PICO.DEF_COM_GPS_GET_CLOCK);
    Blockly.Python.addFunction('gps_getPosition', FUNCTIONS_PICO.DEF_COM_GPS_GET_POS);
    const dataVar = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_MEMBER) || "''";
    return ["gps_getInformations(" + dataVar + ", info=" + block.getFieldValue("INFO") + ")", Blockly.Python.ORDER_ATOMIC];
};

// End of 2 blocks.

Blockly.Python.communication_clockRTC_setDate = function (block) {
    const date = block.getFieldValue("DATE").split("-");
    const module = block.getFieldValue("MODULE");
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('pcf85063tp', IMPORT_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_hp.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('ds1307', IMPORT_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            return "clock_v1.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_v1.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
    }
};

Blockly.Python.communication_clockRTC_setHour = function (block) {
    const hour = Blockly.Python.valueToCode(block, "HOUR", Blockly.Python.ORDER_ATOMIC);
    const minute = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_ATOMIC);
    const second = Blockly.Python.valueToCode(block, "SEC", Blockly.Python.ORDER_ATOMIC);
    const module = block.getFieldValue("MODULE");
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('pcf85063tp', IMPORT_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('ds1307', IMPORT_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            return "clock_v1.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
    }

};

Blockly.Python.communication_clockRTC_readTime = function (block) {
    const module = block.getFieldValue("MODULE");
    const data = block.getFieldValue("DATA");
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('pcf85063tp', IMPORT_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            if (data == "ALL") {
                return ["clock_hp.readTime()", Blockly.Python.ORDER_ATOMIC];
            } else {
                return ["clock_hp.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
            }
        case "DS1307":
            Blockly.Python.addImport('ds1307', IMPORT_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            if (data == "ALL") {
                return ["clock_v1.readTime()", Blockly.Python.ORDER_ATOMIC];
            } else {
                return ["clock_v1.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
            }
    }
};

// UART

Blockly.Python.communication_serialInit = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    return "uart.init(baudrate=" + block.getFieldValue("BAUD") + ", bits=8, parity=None, stop=1, tx=" + pinRX + ", rx=" + pinTX + ")" + NEWLINE;
};

Blockly.Python.communication_serialRedirectUSB = function () {
    return "uart.init(baudrate=115200, bits=8, parity=None, stop=1)" + NEWLINE;
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
    return ["uart.read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_uart_isDataAvailable = function () {
    return ["uart.any()", Blockly.Python.ORDER_ATOMIC];
};