/**
 * @fileoverview Communication generators for Raspberry PI.
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

// Blockly.Python.communication_graphSerialWrite = function (block) {
//     var c = [];
//     let code = "print('@Graph:";
//     for (var d = 1; d < block.itemCount_ + 1; d++) {
//         c = Blockly.Python.valueToCode(block, "ADD" + (d - 1), Blockly.Python.ORDER_NONE);
//         if (c[c.length - 1] === '|') {
//             c = c.substr(0, c.length - 1);
//             let data = c.split(':');
//             code += data[0] + ":' + str(" + data[1] + ") + '|";
//         }
//     }
//     code += "')" + NEWLINE + "utime.sleep_ms(50)" + NEWLINE;
//     Blockly.Python.addImport('utime', IMPORT_UTIME);
//     return code;
// };

// Blockly.Python.communication_graphSerialWrite_datasFormat = function (block) {
//     var name = block.getFieldValue("NAME");
//     var data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_ATOMIC);
//     if (name == "") name = '""';
//     if (!isNaN(data)) {
//         data = data.toString();
//     }
//     let syntax = name + ":" + data + "|";
//     return [syntax.toString(), Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.communication_playComputerMusic = function (block) {
//     let note = block.getFieldValue("NOTE");
//     return "print('@music:" + note + "|')" + NEWLINE;
// };

// Blockly.Python.communication_playComputerFrequency = function (block) {
//     let frequency = Blockly.Python.valueToCode(block, "FREQUENCY", Blockly.Python.ORDER_ATOMIC);
//     return "print('@music:' + str(" + frequency + ") + '|')" + NEWLINE;
// };

// Blockly.Python.communication_stopComputerMusic = function () {
//     return "print('@music:stop|')" + NEWLINE;
// };

// // Data logging

// Blockly.Python.communication_writeOpenLogSd = function (block) {
//     const pinTX = block.getFieldValue("TX");
//     const pinRX = block.getFieldValue("RX");
//     const baudrate = block.getFieldValue("BAUD");
//     const pinTX_Number = pinTX.replace('p', '');
//     const pinRX_Number = pinRX.replace('p', '');
//     const uartName = "openlog_" + pinTX_Number;
//     const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
//     Blockly.Python.addInit('openlog_' + pinTX_Number, '# Lecteur SD TX on ' + pinTX);
//     Blockly.Python.addInit('openlog_' + pinRX_Number, '# Lecteur SD RX on ' + pinRX);
//     Blockly.Python.addInit('openlog_uart_' + pinTX.replace('p', ''), uartName + " = UART(1, baudrate=" + baudrate + ", tx=" + pinTX_Number + ", rx=" + pinRX_Number + ")");
//     if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
//         return uartName + ".write(" + data + " + '\\n')" + NEWLINE;
//     } else {
//         return uartName + ".write(str(" + data + ") + '\\n')" + NEWLINE;
//     }
// };

// // Bluetooth

// Blockly.Python.communication_sendBluetoothData = function (block) {
//     const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
//     if (Blockly.Constants.Utils.isInputTextBlock(block, "DATA")) {
//         Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + block.getFieldValue("RX").replace('p', '') + ", rx=" + block.getFieldValue("TX").replace('p', '') + ")");
//         return "uart_1.write(" + data + ")" + NEWLINE;
//     } else {
//         Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + block.getFieldValue("RX").replace('p', '') + ", rx=" + block.getFieldValue("TX").replace('p', '') + ")");
//         return "uart_1.write(str(" + data + "))" + NEWLINE;
//     }
// };

// Blockly.Python.communication_onBluetoothDataReceived = function (block) {
//     const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
//     const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
//     const pinTX = block.getFieldValue("TX");
//     const pinRX = block.getFieldValue("RX");
//     const pinTX_Number = pinTX.replace('p', '');
//     const pinRX_Number = pinRX.replace('p', '');
//     const uartName = "openlog_" + pinTX_Number;
//     Blockly.Python.addInit('uart_1', "uart_1 = UART(1, baudrate=9600,  tx=" + pinRX_Number + ", rx=" + pinTX_Number + ")");
//     return "if " + uartName + ".any():" + NEWLINE + "  " + dataVar + " = " + uartName + ".read()" + NEWLINE + branchCode;
// };

// // Tracking modules

// Blockly.Python.communication_gps_getNMEA = function (block) {
//     Blockly.Python.addInit('gpsInfos', "gpsInfos = {}");
//     Blockly.Python.addInit('gpsInfos[\'nmea\']', "gpsInfos['nmea'] = None");
//     block.workspace.createVariable('gpsInfos');
//     Blockly.Python.addInit('gpsBuffer', "gpsBuffer = \"\"");
//     block.workspace.createVariable('gpsBuffer');
//     Blockly.Python.addInit('gpsInfos', "GPS on pin ");
//     Blockly.Python.addInit('uart_2', 'uart_2 = UART(2, baudrate=9600, tx=' + block.getFieldValue("RX").replace('p', '') + ', rx=' + block.getFieldValue("TX").replace('p', '') + ')');
//     Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_GALAXIA.DEF_GPS_READ_NMEA);
//     return ["gps_readNMEA(uart_2, True)", Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.communication_gps_getGGAInformations = function (block) {
//     const info = block.getFieldValue("INFO");
//     Blockly.Python.addInit('gps_module', "# GPS on UART 2");
//     Blockly.Python.addInit('gpsInfos', "gpsInfos = {}");
//     Blockly.Python.addInit('gpsInfos[\'nmea\']', "gpsInfos['nmea'] = None");
//     block.workspace.createVariable('gpsInfos');
//     Blockly.Python.addInit('gpsBuffer', "gpsBuffer = \"\"");
//     block.workspace.createVariable('gpsBuffer');
//     Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_GALAXIA.DEF_GPS_READ_NMEA);
//     Blockly.Python.addFunction('gps_GGA_getInformation', FUNCTIONS_GALAXIA.DEF_GPS_GET_GGA_INFORMATIONS);
//     Blockly.Python.addInit('uart_2', 'uart_2 = UART(2, baudrate=9600, tx=' + block.getFieldValue("RX").replace('p', '') + ', rx=' + block.getFieldValue("TX").replace('p', '') + ')');
//     return ["gps_GGA_getInformation(uart_2, '" + info + "')", Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.communication_clockRTC_setDate = function (block) {
//     const date = block.getFieldValue("DATE").split("-");
//     const module = block.getFieldValue("MODULE");
//     switch (module) {
//         case "PCF85063TP":
//             Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
//             Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x51)");
//             Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
//             return "clock_hp.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_hp.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
//         case "DS1307":
//             Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
//             Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x68)");
//             Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
//             return "clock_v1.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ")" + NEWLINE + "clock_v1.fillDayOfWeek('" + block.getFieldValue("DAY") + "')" + NEWLINE;
//     }
// };

// Blockly.Python.communication_clockRTC_setHour = function (block) {
//     const hour = Blockly.Python.valueToCode(block, "HOUR", Blockly.Python.ORDER_ATOMIC);
//     const minute = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_ATOMIC);
//     const second = Blockly.Python.valueToCode(block, "SEC", Blockly.Python.ORDER_ATOMIC);
//     const module = block.getFieldValue("MODULE");
//     switch (module) {
//         case "PCF85063TP":
//             Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
//             Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x51)");
//             Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
//             return "clock_hp.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
//         case "DS1307":
//             Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
//             Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x68)");
//             Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
//             return "clock_v1.fillByHMS(" + hour + ", " + minute + ", " + second + ")" + NEWLINE;
//     }
// };

// Blockly.Python.communication_clockRTC_readTime = function (block) {
//     const module = block.getFieldValue("MODULE");
//     const data = block.getFieldValue("DATA");
//     switch (module) {
//         case "PCF85063TP":
//             Blockly.Python.addImport('esp32_pcf85063tp', IMPORT_ESP32_PCF85063TP);
//             Blockly.Python.addInit('clock_rtc_hp', "clock_hp = RTC_HP(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x51)");
//             Blockly.Python.addPowerOn('clock_rtc_hp', "clock_hp.reset()");
//             if (data == "ALL") {
//                 return ["clock_hp.readTime()", Blockly.Python.ORDER_ATOMIC];
//             } else {
//                 return ["clock_hp.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
//             }
//         case "DS1307":
//             Blockly.Python.addImport('esp32_ds1307', IMPORT_ESP32_DS1307);
//             Blockly.Python.addInit('clock_rtc_v1', "clock_v1 = DS1307(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=0x68)");
//             Blockly.Python.addPowerOn('clock_rtc_v1', "clock_v1.reset()");
//             if (data == "ALL") {
//                 return ["clock_v1.readTime()", Blockly.Python.ORDER_ATOMIC];
//             } else {
//                 return ["clock_v1.readTime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
//             }
//     }
// };

// // UART

// Blockly.Python.communication_serialInit = function (block) {
//     const pinTX = block.getFieldValue("TX").replace('p', '');
//     const pinRX = block.getFieldValue("RX").replace('p', '');
//     const uartName = "uart";
//     return uartName + " = UART(baudrate=" + block.getFieldValue("BAUD") + ", tx=" + pinRX + ", rx=" + pinTX + ")" + NEWLINE;
// };

// Blockly.Python.communication_uart_writeData = function (block) {
//     const uartName = "uart";
//     const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "''";
//     if (!Blockly.Constants.Utils.isInputTextBlock(block, "DATA") && data !== "''") {
//         return uartName + ".write(str(" + data + ")" + ")" + NEWLINE;
//     } else {
//         return uartName + ".write(" + data + ")" + NEWLINE;
//     }
// };

// Blockly.Python.communication_uart_isDataAvailable = function (block) {
//     const uartName = "uart";
//     return [uartName + ".any()", Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.communication_uart_readData = function (block) {
//     const uartName = "uart";
//     const dataSize = Blockly.Python.valueToCode(block, "SIZE", Blockly.Python.ORDER_NONE) || "";
//     return [uartName + ".read(" + dataSize + ")", Blockly.Python.ORDER_ATOMIC];
// };