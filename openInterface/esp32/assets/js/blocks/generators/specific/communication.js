/**
 * @fileoverview Communication generators for Esp32.
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
    Blockly.Python.addInit('fizziq_init', "uart = BlueUart('ESP32_Fizziq', UUID_UART, UUID_TX, UUID_RX)");
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

// Data logging

Blockly.Python.communication_writeOpenLogSd = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const baudrate = block.getFieldValue("BAUD");
    const pinTX_Number = pinTX.replace('p', '');
    const pinRX_Number = pinRX.replace('p', '');
    const uartName = "openlog_" + pinTX_Number;
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addInit('openlog_' + pinTX_Number, '# Lecteur SD TX on ' + pinTX);
    Blockly.Python.addInit('openlog_' + pinRX_Number, '# Lecteur SD RX on ' + pinRX);
    Blockly.Python.addInit('openlog_uart_' + pinTX.replace('p', ''), uartName + " = UART(1, baudrate=" + baudrate + ", tx=" + pinTX_Number + ", rx=" + pinRX_Number + ")");
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        return uartName + ".write(" + data + " + '\\n')" + NEWLINE;
    } else {
        return uartName + ".write(str(" + data + ") + '\\n')" + NEWLINE;
    }
};

Blockly.Python.communication_esp32_FS_saveData = function (block) {
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "None";
    const filename = Blockly.Python.valueToCode(block, "FILENAME", Blockly.Python.ORDER_NONE) || "";
    let extension = Blockly.Python.valueToCode(block, "EXTENSION", Blockly.Python.ORDER_NONE) || ""
    if (block.getInput("EXTENSION") && extension) {
        extension = ", extension = " + extension;
    }
    Blockly.Python.addFunction('SDCard_writeFile', FUNCTIONS_ESP32.DEF_SD_CARD_WRITE_FILE);
    return "SDCard_writeFile(" + data + ", filename = " + filename + extension + ")" + NEWLINE;
};

// Bluetooth

Blockly.Python.communication_sendBluetoothData = function (block) {
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
    if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
        Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + block.getFieldValue("RX").replace('p', '') + ", rx=" + block.getFieldValue("TX").replace('p', '') + ")");
        return "uart_1.write(" + data + ")" + NEWLINE;
    } else {
        Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + block.getFieldValue("RX").replace('p', '') + ", rx=" + block.getFieldValue("TX").replace('p', '') + ")");
        return "uart_1.write(str(" + data + "))" + NEWLINE;
    }
};

Blockly.Python.communication_onBluetoothDataReceived = function (block) {
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const pinTX_Number = pinTX.replace('p', '');
    const pinRX_Number = pinRX.replace('p', '');
    const uartName = "openlog_" + pinTX_Number;
    Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + pinRX_Number + ", rx=" + pinTX_Number + ")");
    return "if " + uartName + ".any():" + NEWLINE + "  " + dataVar + " = " + uartName + ".read()" + NEWLINE + branchCode;
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

Blockly.Python.communication_gps_getNMEA = function (block) {
    Blockly.Python.addInit('gpsInfos', "gpsInfos = {}");
    Blockly.Python.addInit('gpsInfos[\'nmea\']', "gpsInfos['nmea'] = None");
    block.workspace.createVariable('gpsInfos');
    Blockly.Python.addInit('gpsBuffer', "gpsBuffer = \"\"");
    block.workspace.createVariable('gpsBuffer');
    Blockly.Python.addInit('gpsInfos', "GPS on pin ");
    Blockly.Python.addInit('uart_2', 'uart_2 = UART(2, baudrate=9600, tx=' + block.getFieldValue("RX").replace('p', '') + ', rx=' + block.getFieldValue("TX").replace('p', '') + ')');
    Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_ESP32.DEF_GPS_READ_NMEA);
    return ["gps_readNMEA(uart_2, True)", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_gps_getGGAInformations = function (block) {
    const info = block.getFieldValue("INFO");
    Blockly.Python.addInit('gps_module', "# GPS on UART 2");
    Blockly.Python.addInit('gpsInfos', "gpsInfos = {}");
    Blockly.Python.addInit('gpsInfos[\'nmea\']', "gpsInfos['nmea'] = None");
    block.workspace.createVariable('gpsInfos');
    Blockly.Python.addInit('gpsBuffer', "gpsBuffer = \"\"");
    block.workspace.createVariable('gpsBuffer');
    Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_ESP32.DEF_GPS_READ_NMEA);
    Blockly.Python.addFunction('gps_GGA_getInformation', FUNCTIONS_ESP32.DEF_GPS_GET_GGA_INFORMATIONS);
    Blockly.Python.addInit('uart_2', 'uart_2 = UART(2, baudrate=9600, tx=' + block.getFieldValue("RX").replace('p', '') + ', rx=' + block.getFieldValue("TX").replace('p', '') + ')');
    return ["gps_GGA_getInformation(uart_2, '" + info + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_clockRTC_setDate = function (block) {
    const date = block.getFieldValue("DATE").split("-");
    const module = block.getFieldValue("MODULE");
    switch (module) {
        case "PCF85063TP":
            Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=I2C(scl=Pin(22), sda=Pin(21)), addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_hp.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=I2C(scl=Pin(22), sda=Pin(21)), addr=0x68)");
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
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=I2C(scl=Pin(22), sda=Pin(21)), addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            return "clock_hp.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
        case "DS1307":
            Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=I2C(scl=Pin(22), sda=Pin(21)), addr=0x68)");
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
            Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=I2C(scl=Pin(22), sda=Pin(21)), addr=0x51)");
            Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
            if (data == "ALL") {
                return ["clock_hp.readTime()", Blockly.Python.ORDER_ATOMIC];
            } else {
                return ["clock_hp.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
            }
        case "DS1307":
            Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
            Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=I2C(scl=Pin(22), sda=Pin(21)), addr=0x68)");
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