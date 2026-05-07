/**
 * @fileoverview Communication generators for Esp32.
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
    var c = [];
    let code = "print('@Graph:";
    for (var d = 1; d < block.itemCount_ + 1; d++) {
        c = Blockly.Python.valueToCode(block, "ADD" + (d - 1), Blockly.Python.ORDER_NONE);
        if (c[c.length - 1] === '|') {
            c = c.substr(0, c.length - 1);
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

Blockly.Python.communication_onSerialMessageReceived = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    Blockly.Python.addImport('sys', IMPORT_SYS);
    Blockly.Python.addImport('uselect', IMPORT_USELECT);
    Blockly.Python.addFunction('serial_readMessage', FUNCTIONS_GALAXIA.DEF_SERIAL_READMESSAGE);
    Blockly.Python.addInit('poll', "poll = uselect.poll()" + NEWLINE + "poll.register(sys.stdin, uselect.POLLIN)");
    return "if poll.poll(0):" + NEWLINE + "  " + dataVar + " = serial_readMessage()" + NEWLINE + branchCode;
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

// log

Blockly.Python.communication_log_delete = function (block) {
    return "log.delete()" + NEWLINE;
};

Blockly.Python.communication_log_setLabel = function (block) {
    const labelArray = [];
    for (let i = 1; i < block.itemCount_ + 1; i++) {
        const label = Blockly.Python.valueToCode(block, "ADD" + (i - 1), Blockly.Python.ORDER_NONE);
        labelArray.push(label);
    }
    return `log.set_columns([${labelArray.join(",")}])` + NEWLINE;
};

Blockly.Python.communication_log_addData = function (block) {
    const labelDataArray = [];
    for (let i = 1; i < block.itemCount_ + 1; i++) {
        const label = Blockly.Python.valueToCode(block, "ADD" + (i - 1), Blockly.Python.ORDER_NONE);
        labelDataArray.push(label);
    }
    return `log.add([${labelDataArray}])` + NEWLINE;
};

Blockly.Python.communication_log_data = function (block) {
    const label = Blockly.Python.valueToCode(block, "LABEL", Blockly.Python.ORDER_NONE) || "''";
    const value = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "";
    return [`(${label}, ${value})`, Blockly.Python.ORDER_ATOMIC];
};

// radio

Blockly.Python.communication_radioSendString = function (block) {
    const str = Blockly.Python.valueToCode(block, "STR", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "STR")) {
        return "radio.send(" + str + ")" + NEWLINE;
    } else {
        return "radio.send(str(" + str + "))" + NEWLINE;
    }
};

Blockly.Python.communication_radioSendNumber = function (block) {
    Blockly.Python.addFunction('radio_send', FUNCTIONS_GALAXIA.DEF_COM_RADIO_SEND);
    const n = Blockly.Python.valueToCode(block, "N", Blockly.Python.ORDER_NONE) || "0";
    return "radio_send(" + n + ")" + NEWLINE;
};

Blockly.Python.communication_radioSendValue = function (block) {
    Blockly.Python.addFunction('radio_sendValue', FUNCTIONS_GALAXIA.DEF_COM_RADIO_SEND_VALUE);
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
    Blockly.Python.addFunction('radio_receiveData', FUNCTIONS_GALAXIA.DEF_COM_RADIO_RECEIVE_DATA);
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return dataVar + " = radio_receiveData()" + NEWLINE + "if " + dataVar + " is not None:" + NEWLINE + branchCode;
};

Blockly.Python.communication_onRadioValueReceived = function (block) {
    Blockly.Python.addFunction('radio_receiveValue', FUNCTIONS_GALAXIA.DEF_COM_RADIO_RECEIVE_VALUE);
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
    const pinTX_Number = pinTX.replace('p', '');
    const pinRX_Number = pinRX.replace('p', '');
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addInit('Lecteur SD', '# Lecteur SD on UART1');
    Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=" + baudrate + ", tx=" + pinTX_Number + ", rx=" + pinRX_Number + ")");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return "uart_1.write(" + data + " + '\\n')" + NEWLINE;
    } else {
        return "uart_1.write(str(" + data + ") + '\\n')" + NEWLINE;
    }
};

Blockly.Python.communication_esp32_FS_saveData = function (block) {
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "None";
    const filename = Blockly.Python.valueToCode(block, "FILENAME", Blockly.Python.ORDER_NONE) || "";
    let extension = Blockly.Python.valueToCode(block, "EXTENSION", Blockly.Python.ORDER_NONE) || ""
    if (block.getInput("EXTENSION") && extension) {
        extension = ", extension = " + extension;
    }
    Blockly.Python.addImport('os', IMPORT_OS);
    Blockly.Python.addFunction('SDCard_writeFile', FUNCTIONS_GALAXIA.DEF_SD_CARD_WRITE_FILE);
    return "SDCard_writeFile(" + data + ", filename = " + filename + extension + ")" + NEWLINE;
};

// External Bluetooth

Blockly.Python.communication_groveSerialBluetooth_setATCommand = function (block) {
    const command = block.getFieldValue("COMMAND");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC);
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('Grove Serial Bluetooth', '# Grove Serial Bluetooth on UART1');
    Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + pinRX.replace('p', '') + ", rx=" + pinTX.replace('p', '') + ")");
    Blockly.Python.addFunction('grove_bluetooth_sendCommandAT', FUNCTIONS_GALAXIA.DEF_GROVE_BLUETOOTH_SEND_COMMAND_AT);
    return "grove_bluetooth_sendCommandAT(uart_1, \"" + command + "\", " + value + ")" + NEWLINE;
};

Blockly.Python.communication_groveSerialBluetooth_getATCommand = function (block) {
    const command = block.getFieldValue("COMMAND");
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('Grove Serial Bluetooth', '# Grove Serial Bluetooth on UART1');
    Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + pinRX.replace('p', '') + ", rx=" + pinTX.replace('p', '') + ")");
    Blockly.Python.addFunction('grove_bluetooth_sendCommandAT', FUNCTIONS_GALAXIA.DEF_GROVE_BLUETOOTH_SEND_COMMAND_AT);
    return ["grove_bluetooth_sendCommandAT(uart_1, \"" + command + "\")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_sendSerialBluetoothData = function (block) {
    const data = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC);
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Python.addInit('Grove Serial Bluetooth', '# Grove Serial Bluetooth on UART1');
    Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + pinRX.replace('p', '') + ", rx=" + pinTX.replace('p', '') + ")");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "TEXT")) {
        return "uart_1.write(" + data + ")" + NEWLINE;
    } else {
        return "uart_1.write(str(" + data + "))" + NEWLINE;
    }
};

Blockly.Python.communication_onSerialBluetoothDataReceived = function (block) {
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const branchCode = Blockly.Python.statementToCode(block, 'DO');
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('Grove Serial Bluetooth', '# Grove Serial Bluetooth on UART1');
    Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + pinRX.replace('p', '') + ", rx=" + pinTX.replace('p', '') + ")");
    return "if uart_1.any():" + NEWLINE
        + TAB + dataVar + " = uart_1.read().decode('utf-8')" + NEWLINE
        + TAB + "utime.sleep_ms(10)" + NEWLINE
        + TAB + "while uart_1.any():" + NEWLINE
        + TAB + TAB + dataVar + " += uart_1.read().decode('utf-8')" + NEWLINE + branchCode + NEWLINE;
};

Blockly.Python.communication_hc05_sendBluetoothData = function (block) {
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Python.addInit('Bluetooth HC05', '# Bluetooth HC05 on UART1');
    Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + pinRX.replace('p', '') + ", rx=" + pinTX.replace('p', '') + ")");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return "uart_1.write(" + data + ")" + NEWLINE;
    } else {
        return "uart_1.write(str(" + data + "))" + NEWLINE;
    }
};

Blockly.Python.communication_hc05_onBluetoothDataReceived = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('Bluetooth HC05', '# Bluetooth HC05 on UART1');
    Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + pinRX.replace('p', '') + ", rx=" + pinTX.replace('p', '') + ")");
    return "if uart_1.any():" + NEWLINE
        + TAB + dataVar + " = uart_1.read().decode('utf-8')" + NEWLINE
        + TAB + "utime.sleep_ms(10)" + NEWLINE
        + TAB + "while uart_1.any():" + NEWLINE
        + TAB + TAB + dataVar + " += uart_1.read().decode('utf-8')" + NEWLINE + branchCode + NEWLINE;
};

// infrared

Blockly.Python.communication_irEmit = function (block) {
    const pinName = Blockly.Python.Generators.pwm(block.getFieldValue("PIN"), 'IR', 38000, 0);
    const value = block.getFieldValue("ACTIVATION");
    Blockly.Python.addFunction('writePWM', FUNCTIONS_GALAXIA.DEF_WRITE_WPM);
    return "writePWM(" + pinName + ", " + value + ")" + NEWLINE;
};

Blockly.Python.communication_onInfraredDataReceived = function (block) {
    const protocol = block.getFieldValue("PROTOCOL");
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    const pin = block.getFieldValue("PIN");
    const pin_Number = pin.replace('p', '');
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('gc', IMPORT_GC);
    Blockly.Python.addImport('nec_remote', IMPORT_NEC_REMOTE);
    Blockly.Python.addInit('r_value', `${dataVar} = None`);
    Blockly.Python.addInit('pin', "pin = Pin(" + pin_Number + ", Pin.IN)" + NEWLINE);
    Blockly.Python.addInit('ir_rx_callback', `def callback(data, addr, ctrl):${NEWLINE}  global ${dataVar}${NEWLINE}  ${dataVar} = hex(data)${NEWLINE}`);
    Blockly.Python.addInit('ir_rx', `ir_rx = ${protocol}(pin, callback)`);
    return `if ${dataVar} == ${data}:` + NEWLINE + branchCode + "utime.sleep_ms(50)" + NEWLINE + "gc.collect()" + NEWLINE + dataVar + " = None" + NEWLINE;
};

// Tracking modules

Blockly.Python.communication_rfid_getCardID = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('RFID-125kHZ', "# RFID-125kHZ on UART 1");
    Blockly.Python.addInit('uart_1', 'uart_1 = UART(1, baudrate=9600, tx=' + pinRX.replace('p', '') + ', rx=' + pinTX.replace('p', '') + ')');
    Blockly.Python.addFunction('rfid_readTagUID', FUNCTIONS_GALAXIA.DEF_RFID_READ_TAG_UID);
    return ["rfid_readTagUID(uart_1)", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_rfid_convertData = function (block) {
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "None";
    const dataType = block.getFieldValue("TYPE");
    switch (dataType) {
        case "INT":
            return ["int(" + data + ", 16)", Blockly.Python.ORDER_ATOMIC];
        case "HEX":
            return [data + ".decode().lower()", Blockly.Python.ORDER_ATOMIC];
        default:
        case "LIST":
            return ["list(" + data + ")", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.communication_mfrc522_getCardID = function (block) {
    const pinCS = block.getFieldValue("NSS").replace('p', '');
    Blockly.Python.addImport('esp32_mfrc522', IMPORT_ESP32_MFRC522);
    Blockly.Python.addInit('RFID-MFRC522', "# RFID-MFRC522 on SPI 2");
    const spiName = Blockly.Python.Generators.spi("2");
    const moduleName = 'rfid_rc522_2';
    Blockly.Python.addInit(moduleName, moduleName + " = MFRC522(" + spiName + ", cs = Pin(" + pinCS + "))");
    Blockly.Python.addFunction('rc522_readTagUid', FUNCTIONS_GALAXIA.DEF_RC522_READ_TAG_UID);
    return ["rc522_readTagUid(" + moduleName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.COMMUNICATION_INIT_GPS = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('GPS-uart_1', "# GPS on UART 1");
    block.workspace.createVariable('gpsInfos');
    Blockly.Python.addInit('gpsInfos', "gpsInfos = {\n  'nmea': None,\n  'buffer': ''\n}");
    const pinTX = block.getFieldValue("TX").replace('p', '');
    const pinRX = block.getFieldValue("RX").replace('p', '');
    Blockly.Python.addInit('uart_1', 'uart_1 = UART(1, baudrate=9600, tx=' + pinRX + ', rx=' + pinTX + ')');
    Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_GALAXIA.DEF_GPS_READ_NMEA);
    return 'uart_1';
};

Blockly.Python.communication_gps_getNMEA = function (block) {
    const uartName = Blockly.Python.COMMUNICATION_INIT_GPS(block);
    return [`gps_readNMEA(${uartName}, True)`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_gps_getGGAInformations = function (block) {
    const uartName = Blockly.Python.COMMUNICATION_INIT_GPS(block);
    const info = block.getFieldValue("INFO");
    Blockly.Python.addFunction('gps_GGA_getInformation', FUNCTIONS_GALAXIA.DEF_GPS_GET_GGA_INFORMATIONS);
    return [`gps_GGA_getInformation(${uartName}, '${info}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_clockRTC_setDate = function (block) {
    const date = block.getFieldValue("DATE").split("-");
    const module = block.getFieldValue("MODULE");
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_hp.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x68)");
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
            Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            return "clock_v1.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
    }
};

Blockly.Python.communication_clockRTC_readTime = function (block) {
    const module = block.getFieldValue("MODULE");
    const data = block.getFieldValue("DATA");
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            if (data == "ALL") {
                return ["clock_hp.readTime()", Blockly.Python.ORDER_ATOMIC];
            } else {
                return ["clock_hp.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
            }
        case "DS1307":
            Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x68)");
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
    const pinTX = block.getFieldValue("TX").replace('p', '');
    const pinRX = block.getFieldValue("RX").replace('p', '');
    const uartName = "uart_" + block.getFieldValue("UART");
    return uartName + " = UART(" + block.getFieldValue("UART") + ", baudrate=" + block.getFieldValue("BAUD") + ", tx=" + pinRX + ", rx=" + pinTX + ")" + NEWLINE;
};

Blockly.Python.communication_uart_writeData = function (block) {
    const uartName = "uart_" + block.getFieldValue("UART");
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    if (!Blockly.Constants.Utils.isInputTextBlock(block, "DATA") && data !== "''") {
        return uartName + ".write(str(" + data + ")" + ")" + NEWLINE;
    } else {
        return uartName + ".write(" + data + ")" + NEWLINE;
    }
};

Blockly.Python.communication_uart_isDataAvailable = function (block) {
    const uartName = "uart_" + block.getFieldValue("UART");
    return [uartName + ".any()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_uart_readData = function (block) {
    const uartName = "uart_" + block.getFieldValue("UART");
    const dataSize = Blockly.Python.valueToCode(block, "SIZE", Blockly.Python.ORDER_NONE) || "";
    return [uartName + ".read(" + dataSize + ")", Blockly.Python.ORDER_ATOMIC];
};