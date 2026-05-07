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
    Blockly.Python.addFunction('serial_readMessage', FUNCTIONS_ESP32.DEF_SERIAL_READMESSAGE);
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
        + "  print('ESP32 not connected to any device')" + NEWLINE;
};

Blockly.Python.communication_BLE_ReadData = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read().decode().strip()" + NEWLINE + branchCode;
};

Blockly.Python.communication_BLE_AppInventorReadData = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read().decode().strip()[:-1]" + NEWLINE + branchCode;
};

Blockly.Python.communication_FizziqBT = function (block) {
    Blockly.Python.addImport('esp32_ble', IMPORT_ESP32_BLE);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('UUID-UART', "UUID_UART = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E'");
    Blockly.Python.addInit('UUID-TX', "UUID_TX = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'");
    Blockly.Python.addInit('UUID-RX', "UUID_RX = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E'"); //TX AND RX ARE INVERTED 
    Blockly.Python.addInit('fizziq_init', "uart = BlueUart('ESP32_Vittascience', UUID_UART, UUID_TX, UUID_RX)");
    const value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || "''";
    let dataToSend;
    let measure;
    switch (block.getFieldValue("DATA")) {
        case 'TEMP':
            dataToSend = 'tempToSend';
            measure = 'Temperature';
            break;
        case 'HUM':
            dataToSend = 'humToSend';
            measure = 'Moisture';
            break;
        case 'VOLTAGE':
            dataToSend = 'voltageToSend';
            measure = 'Voltage';
            break;
        case 'WEIGHT':
            dataToSend = 'weightToSend';
            measure = 'Weight';
            break;
        case 'PRESSURE':
            dataToSend = 'pressureToSend';
            measure = 'Pressure';
            break;
        case 'CONCENTRATION':
            dataToSend = 'concentrationToSend';
            measure = 'Concentration';
            break;
        case 'MAGFIELD':
            dataToSend = 'magneticToSend';
            measure = 'Magnetic field';
            break;
        case 'BRIGHTNESS':
            dataToSend = 'brightnessToSend';
            measure = 'Brightness';
            break;
        case 'ACCELERATION':
            dataToSend = 'accelerationToSend';
            measure = 'Acceleration';
            break;
        case 'COMPASS':
            dataToSend = 'compassToSend';
            measure = 'Compass';
            break;
    }
    return dataToSend + "=" + value + NEWLINE
        + "utime.sleep_ms(1000)" + NEWLINE
        + "try:" + NEWLINE
        + "  uart.write('" + measure + " : ' + str(" + dataToSend + ") + '\\n')" + NEWLINE
        + "  utime.sleep_ms(555)" + NEWLINE + "except:" + NEWLINE
        + "  print('ESP32 not connected to any device')" + NEWLINE;
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
    Blockly.Python.addFunction('SDCard_writeFile', FUNCTIONS_ESP32.DEF_SD_CARD_WRITE_FILE);
    return "SDCard_writeFile(" + data + ", filename = " + filename + extension + ")" + NEWLINE;
};

// External Bluetooth

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
    Blockly.Python.addInit('Bluetooth HC05', '# Bluetooth HC05 on UART1');
    Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + pinRX.replace('p', '') + ", rx=" + pinTX.replace('p', '') + ")");
    return "if uart_1.any():" + NEWLINE + "  " + dataVar + " = uart_1.read()" + NEWLINE + branchCode;
};

// IR Receiver
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
    return `if ${dataVar} == ${data}:` + NEWLINE + branchCode + "utime.sleep_ms(150)" + NEWLINE + "gc.collect()" + NEWLINE + dataVar + " = None" + NEWLINE;
};

// Tracking modules

Blockly.Python.communication_rfid_getCardID = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('RFID-125kHZ', "# RFID-125kHZ on UART 2");
    Blockly.Python.addInit('uart_2', 'uart_2 = UART(2, baudrate=9600, tx=' + pinRX.replace('p', '') + ', rx=' + pinTX.replace('p', '') + ')');
    Blockly.Python.addFunction('rfid_readTagUID', FUNCTIONS_ESP32.DEF_RFID_READ_TAG_UID);
    return ["rfid_readTagUID(uart_2)", Blockly.Python.ORDER_ATOMIC];
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

Blockly.Python.COMMUNICATION_INIT_GPS = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('GPS-uart_2', "# GPS on UART 2");
    block.workspace.createVariable('gpsInfos');
    Blockly.Python.addInit('gpsInfos', "gpsInfos = {\n  'nmea': None,\n  'buffer': ''\n}");
    Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_ESP32.DEF_GPS_READ_NMEA);
    const pinTX = block.getFieldValue("TX").replace('p', '');
    const pinRX = block.getFieldValue("RX").replace('p', '');
    Blockly.Python.addInit('uart_2', 'uart_2 = UART(2, baudrate=9600, tx=' + pinRX + ', rx=' + pinTX + ')');
    return 'uart_2';
};

Blockly.Python.communication_gps_getNMEA = function (block) {
    const uartName = Blockly.Python.COMMUNICATION_INIT_GPS(block);
    return [`gps_readNMEA(${uartName}, True)`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_gps_getGGAInformations = function (block) {
    const uartName = Blockly.Python.COMMUNICATION_INIT_GPS(block);
    const info = block.getFieldValue("INFO");
    Blockly.Python.addFunction('gps_GGA_getInformation', FUNCTIONS_ESP32.DEF_GPS_GET_GGA_INFORMATIONS);
    return [`gps_GGA_getInformation(${uartName}, '${info}')`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_clockRTC_setDate = function (block) {
    const i2c = Blockly.Python.Generators.default_I2C();
    const date = block.getFieldValue("DATE").split("-");
    const module = block.getFieldValue("MODULE");
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=" + i2c + ", addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_hp.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=" + i2c + ", addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            return "clock_v1.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_v1.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
    }
};

Blockly.Python.communication_clockRTC_setHour = function (block) {
    const i2c = Blockly.Python.Generators.default_I2C();
    const hour = Blockly.Python.valueToCode(block, "HOUR", Blockly.Python.ORDER_ATOMIC);
    const minute = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_ATOMIC);
    const second = Blockly.Python.valueToCode(block, "SEC", Blockly.Python.ORDER_ATOMIC);
    const module = block.getFieldValue("MODULE");
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=" + i2c + ", addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=" + i2c + ", addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            return "clock_v1.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
    }
};

Blockly.Python.communication_clockRTC_readTime = function (block) {
    const i2c = Blockly.Python.Generators.default_I2C();
    const module = block.getFieldValue("MODULE");
    const data = block.getFieldValue("DATA");
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=" + i2c + ", addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            if (data == "ALL") {
                return ["clock_hp.readTime()", Blockly.Python.ORDER_ATOMIC];
            } else {
                return ["clock_hp.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
            }
        case "DS1307":
            Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=" + i2c + ", addr=0x68)");
            Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
            if (data == "ALL") {
                return ["clock_v1.readTime()", Blockly.Python.ORDER_ATOMIC];
            } else {
                return ["clock_v1.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
            }
    }
};

Blockly.Python.communication_mfrc522_getCardID = function (block) {
    const spi = block.getFieldValue("SPI");
    const pinCS = block.getFieldValue("NSS").replace('p', '');
    Blockly.Python.addImport('esp32_mfrc522', IMPORT_ESP32_MFRC522);
    Blockly.Python.addInit('RFID-MFRC522', "# RFID-MFRC522 on SPI " + spi);
    const spiName = Blockly.Python.Generators.spi(spi);
    const moduleName = 'rfid_rc522_' + spi;
    Blockly.Python.addInit(moduleName, moduleName + " = MFRC522(" + spiName + ", cs = Pin(" + pinCS + "))");
    Blockly.Python.addFunction('rc522_readTagUid', FUNCTIONS_ESP32.DEF_RC522_READ_TAG_UID);
    return ["rc522_readTagUid(" + moduleName + ")", Blockly.Python.ORDER_ATOMIC];
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