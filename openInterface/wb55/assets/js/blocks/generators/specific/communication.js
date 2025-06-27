/**
 * @fileoverview Communication generators for STM32.
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

// Bluetooth

Blockly.Python.communication_ble_STSensorApp_send = function (block) {
    const UUID_HELP = "# Pour les UUID et les codes, on se réfère à la documentation du SDK Blue-ST disponible ici :" + NEWLINE
        + "# https://www.st.com/resource/en/user_manual/dm00550659-getting-started-with-the-bluest-protocol-and-sdk-stmicroelectronics.pdf.";
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('bluetooth', IMPORT_BLUETOOTH);
    Blockly.Python.addImport('stm32_ble_sensor', IMPORT_STM32_BLE_SENSOR);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('ustruct', IMPORT_USTRUCT);
    Blockly.Python.addConstant('UUID_HELP', UUID_HELP);
    let code = "";
    let feature_mask = "_FEATURE_MASK = const(";
    let services = "_SERVICES = (";
    let register_services_func = "def ble_registerServices(device):" + NEWLINE + "  ((" + NEWLINE;
    for (var s = 1; s < block.itemCount_ + 1; s++) {
        const serviceValue = Blockly.Python.valueToCode(block, "ADD" + (s - 1), Blockly.Python.ORDER_NONE) || "{}";
        const service = JSON.parse(serviceValue);
        if (service.id) {
            const currentService = Blockly.Constants.ST_BLE_SENSOR_SERVICES[service.id];
            const service_uuid = '_' + service.id + "_UUID";
            if (!Blockly.Python.constants_[service_uuid]) {
                let dataCode = "ble_sensor_data = ustruct.pack(\'" + currentService.fmt + "\', ";
                for (var i = 0; i < service.data.length; i++) {
                    dataCode += currentService.adapt(service.data[i])
                    if (!(i == service.data.length - 1)) {
                        dataCode += ", ";
                    }
                }
                dataCode += ")";
                Blockly.Python.addConstant(service_uuid, service_uuid + " = (bluetooth.UUID('" + currentService.uuid + "'), bluetooth.FLAG_NOTIFY)");
                services += service_uuid + ", ";
                feature_mask += "2**" + currentService.feature_mask_bit;
                const service_handle = "_" + service.id.toLowerCase() + "_handle";
                register_services_func += "    device." + service_handle + ", " + NEWLINE;
                if (s < block.itemCount_) {
                    feature_mask += " + ";
                }
                code += dataCode + NEWLINE;
                code += "ble_device_send(ble_sensor, ble_sensor." + service_handle + ", ble_sensor_data"
                    + ", \'" + currentService.fmt + "\'"
                    + ", title=\"" + currentService.title + "\")" + NEWLINE;
            }
        }
    }
    services += ")";
    feature_mask += ")";
    register_services_func += "  ),) = device._ble.gatts_register_services((device._ST_APP_SERVICE, ))";
    Blockly.Python.addConstant('_SERVICES', services);
    Blockly.Python.addConstant('_FEATURE_MASK', feature_mask);
    Blockly.Python.addFunction('ble_registerServices', register_services_func);
    Blockly.Python.addFunction('ble_device_send', FUNCTIONS_WB55.DEF_BLE_DEVICE_SEND);
    Blockly.Python.addInit('ble', 'ble = bluetooth.BLE()');
    Blockly.Python.addInit('ble_sensor', 'ble_sensor = BLESensor(ble, services=_SERVICES, mask=_FEATURE_MASK)');
    Blockly.Python.addPowerOn('ble_sensor_init_service', "ble_sensor.init_service(ble_registerServices)");
    if (block.itemCount_ > 0) {
        return code;
    } else {
        return code + NEWLINE;
    }
};

Blockly.Python.communication_ble_STSensorApp_service = function (block) {
    const service = block.getFieldValue("SERVICE");
    let data = new Array();
    for (var i = 0; i < 10; i++) {
        if (block.getInput('DATA' + i)) {
            data.push(Blockly.Python.valueToCode(block, "DATA" + i, Blockly.Python.ORDER_ATOMIC) || "0");
        } else {
            break;
        }
    }
    return [JSON.stringify({ "id": service, "data": data }), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_BLE_SendData = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('bluetooth', IMPORT_BLUETOOTH);
    Blockly.Python.addImport('ble_uart', IMPORT_STM32_BLE_UART);
    Blockly.Python.addInit('ble', 'ble = bluetooth.BLE()');
    Blockly.Python.addInit('ble_uart', 'uart = UART_BLE(ble)');
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "0";
    return "utime.sleep_ms(1000)" + NEWLINE + "uart.write(str(" + data + ") + '\\n')" + NEWLINE;
};

Blockly.Python.communication_BLE_ReadData = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('bluetooth', IMPORT_BLUETOOTH);
    Blockly.Python.addImport('ble_uart', IMPORT_STM32_BLE_UART);
    Blockly.Python.addInit('ble', 'ble = bluetooth.BLE()');
    Blockly.Python.addInit('ble_uart', 'uart = UART_BLE(ble)');
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    const dataVar = Blockly.Python.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
    return "if uart.any():" + NEWLINE + "  " + dataVar + " = uart.read().decode().strip()" + NEWLINE + branchCode;
};

Blockly.Python.communication_FizziqBT = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_ble', IMPORT_STM32_BLE);
    Blockly.Python.addInit('UUID-UART', "UUID_UART = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E'");
    Blockly.Python.addInit('UUID-TX', "UUID_TX = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'");
    Blockly.Python.addInit('UUID-RX', "UUID_RX = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E'"); //TX AND RX ARE INVERTED 
    Blockly.Python.addInit('fizziq_init', "uart = BlueUart('WB55_Fizziq', UUID_UART, UUID_TX, UUID_RX)");
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
        + "  utime.sleep_ms(555)" + NEWLINE
        + "except:" + NEWLINE
        + "  print('ESP32 not connected to any device')" + NEWLINE;
};

// RTC (integrated)

Blockly.Python.communication_stm32_RTC_setTime = function (block) {
    const date = block.getFieldValue("DATE").split("-");
    const hour = Blockly.Python.valueToCode(block, "HOUR", Blockly.Python.ORDER_ATOMIC);
    const minute = Blockly.Python.valueToCode(block, "MIN", Blockly.Python.ORDER_ATOMIC);
    const second = Blockly.Python.valueToCode(block, "SEC", Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addInit('clock', "clock = machine.RTC()");
    return "clock.datetime((" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ", "
        + block.getFieldValue("DAY") + ", " + hour + ", " + minute + ", " + second + ", 0))" + NEWLINE;

};

Blockly.Python.communication_stm32_RTC_readTime = function (block) {
    const data = block.getFieldValue("DATA");
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addInit('clock', "clock = machine.RTC()");
    if (data == "ALL") {
        return ["clock.datetime()", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["clock.datetime()[" + data + "]", Blockly.Python.ORDER_ATOMIC];
    }
};

// GPS

Blockly.Python.communication_gps_getNMEA = function (block) {
    const numPort = block.getFieldValue("UART");
    const objName = 'uart_' + numPort;
    switch (numPort) {
        case "1":
            Blockly.Python.addInit(objName, '# GPS on UART 1 connected on RX D2<-TX and TX D14->RX');
            break;
        case "2":
            Blockly.Python.addInit(objName, '# GPS on UART 2 connected on RX D1<-TX and TX D0->RX');
            break;
    }    
    Blockly.Python.addInit(objName + '_init', objName + " = machine.UART(" + numPort + ", baudrate = 9600)");
    Blockly.Python.addInit('gpsInfos', "gpsInfos = {}");
    Blockly.Python.addInit('gpsInfos[\'nmea\']', "gpsInfos['nmea'] = None");
    block.workspace.createVariable('gpsInfos');
    Blockly.Python.addInit('gpsBuffer', "gpsBuffer = \"\"");
    block.workspace.createVariable('gpsBuffer');
    Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_WB55.DEF_GPS_READ_NMEA);
    return ["gps_readNMEA(" + objName + ", True)", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_gps_getGGAInformations = function (block) {
    const numPort = block.getFieldValue("UART");
    const info = block.getFieldValue("INFO");
    const objName = 'uart_' + numPort;
    switch (numPort) {
        case "1":
            Blockly.Python.addInit(objName, '# GPS on UART 1 connected on RX D2<-TX and TX D14->RX');
            break;
        case "2":
            Blockly.Python.addInit(objName, '# GPS on UART 2 connected on RX D1<-TX and TX D0->RX');
            break;
    }    
    Blockly.Python.addInit(objName + '_init', objName + " = machine.UART(" + numPort + ", baudrate = 9600)");
    Blockly.Python.addInit('gpsInfos', "gpsInfos = {}");
    Blockly.Python.addInit('gpsInfos[\'nmea\']', "gpsInfos['nmea'] = None");
    block.workspace.createVariable('gpsInfos');
    Blockly.Python.addInit('gpsBuffer', "gpsBuffer = \"\"");
    block.workspace.createVariable('gpsBuffer');
    Blockly.Python.addFunction('gps_readNMEA', FUNCTIONS_WB55.DEF_GPS_READ_NMEA);
    Blockly.Python.addFunction('gps_GGA_getInformation', FUNCTIONS_WB55.DEF_GPS_GET_GGA_INFORMATIONS);
    return ["gps_GGA_getInformation(" + objName + ", '" + info + "')", Blockly.Python.ORDER_ATOMIC];
};


// NFC Grove

Blockly.Python.communication_M24SR64_nfc_readTag = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_nfc', IMPORT_STM32_M24SR64);
    Blockly.Python.addInit('STM32_NFC', "tag = NFCTag(machine.I2C(1))");
    return ["tag.readNDEFFile()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communication_M24SR64_nfc_writeTag = function (block) {
    var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_nfc', IMPORT_STM32_M24SR64);
    Blockly.Python.addInit('STM32_NFC', "tag = NFCTag(machine.I2C(1))");
    return "tag.writeNDEFFile(" + text + ")" + NEWLINE;
};

Blockly.Python.communication_M24SR64_nfc_eraseTag = function () {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_nfc', IMPORT_STM32_M24SR64);
    Blockly.Python.addInit('STM32_NFC', "tag = NFCTag(machine.I2C(1))");
    return "tag.eraseNDEFFile()" + NEWLINE;
};

// UART

Blockly.Python.communication_uartInit = function (block) {
    const numPort = block.getFieldValue("UART");
    const baudrate = Blockly.Python.valueToCode(block, "BAUD", Blockly.Python.ORDER_NONE) || "9600";
    switch (numPort) {
        case "1":
            Blockly.Python.addInit('uart_1', '#UART bus 1 connected on RX D14 and TX D2');
            break;
        case "2":
            Blockly.Python.addInit('uart_2', '#UART bus 2 connected on RX D0 and TX D1');
            break;
    }
    Blockly.Python.addInit('uart_' + numPort + '_init', 'uart_' + numPort + " = machine.UART(" + numPort + ", baudrate = " + baudrate + ")");
    return "";
};

Blockly.Python.communication_uartWrite = function (block) {
    const numPort = block.getFieldValue("UART");
    const data = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) || "''";
    return "uart_" + numPort + ".write(" + data + ")" + NEWLINE;
};

//LoRa
Blockly.Python.communication_loraInit = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_LoRa', IMPORT_STM32_LORA);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    
    var  appEui = Blockly.Python.valueToCode(block, "APPEUI", Blockly.Python.ORDER_NONE).replace(/\s/g,'').replaceAll("'",""),
        appKey = Blockly.Python.valueToCode(block, "APPKEY", Blockly.Python.ORDER_NONE).replace(/\s/g,'').replaceAll("'","");
        devAddr = Blockly.Python.valueToCode(block, "DEVADDR", Blockly.Python.ORDER_NONE).replace(/\s/g,'').replaceAll("'","");
    
    if (devAddr.length == 0)
        devAddr = "2440007C";

    for (let i = 0 ; i < appEui.length ; i+=3 )
        appEui = appEui.slice(0,2+i) + " " + appEui.slice(2+i);
    for (let i = 0 ; i < appKey.length ; i+=3 )
        appKey = appKey.slice(0,2+i) + " " + appKey.slice(2+i);
    for (let i = 0 ; i < devAddr.length ; i+=3 )
        devAddr = devAddr.slice(0,2+i) + " " + devAddr.slice(2+i);
    
    Blockly.Python.addConstant('STM32_LORA_INIT_VAR', "# LoRa network identify");
    Blockly.Python.addConstant('STM32_LORA_DEVADDR', "devAddr = '" + devAddr.replace(/^\s+|\s+$/gm,'') + "'");
    Blockly.Python.addConstant('STM32_LORA_APPEUI', "appEui  = '" + appEui.replace(/^\s+|\s+$/gm,'') + "'");
    Blockly.Python.addConstant('STM32_LORA_APPKEY', "appKey  = '"+ appKey.replace(/^\s+|\s+$/gm,'')  + "'\n");
    
    Blockly.Python.addConstant('STM32_LORA_INIT_DELAY', "# Delays settings for application");
    Blockly.Python.addConstant('STM32_LORA_INIT_DELAY_REBOOT',"DelayRebootLostConnection = 300  # In minute");
    Blockly.Python.addConstant('STM32_LORA_INIT_DELAY_TRYJOIN',"DelayTryJoin = 10  # In second\nMaxTryJoin = int((DelayRebootLostConnection * 60) / DelayTryJoin)");
    Blockly.Python.addConstant('STM32_LORA_INIT_DELAY_SEND',"DelaySend = 30  # In second\nMaxTrySend = int((DelayRebootLostConnection * 60) / DelaySend)");

    Blockly.Python.addConstant('DataReceived', FUNCTIONS_WB55.DEF_DATA_RECEIVED);
    Blockly.Python.addFunction('PrintLoRaParameters', FUNCTIONS_WB55.DEF_PRINT_LORA_PARAMETERS);
    Blockly.Python.addFunction('JoinNetwork', FUNCTIONS_WB55.DEF_JOIN_NETWORK);

    Blockly.Python.addInit('STM32_LORA_INIT', "# Initialize LoRa module\nloRa = LoRa(9600, 4, DataReceiveCallback = DataReceived)");

    Blockly.Python.addInit('STM32_LORA_IDENTIFY', "# Set identify for LoRa network\nstatus = loRa.setIdentify(DevAddr = devAddr,AppEui  = appEui,AppKey  = appKey)");

    let code = "PrintLoRaParameters()" + NEWLINE;
    code += "JoinNetwork()" + NEWLINE;
    
    return code;
};

Blockly.Python.communication_loraSend = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_LoRa', IMPORT_STM32_LORA);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('int_to_int16', FUNCTIONS_WB55.DEF_INT_TO_INT16);
    Blockly.Python.addFunction('SendData', FUNCTIONS_WB55.DEF_SEND_DATA);

    var data = "[",
        data_type = "[";
    for (let i = 0; i < block.itemCount_; i++ ) {
        let item = Blockly.Python.valueToCode(block, "ADD" + i, Blockly.Python.ORDER_NONE);
        if (item.trim() !== '') {
            data += item;
            let children =  block.getInput("ADD" + i).connection.targetBlock(),
                children_type = children.type;
            if (Blockly.Constants.LoRa.ENCODE[children_type] != undefined ) {
                if(typeof Blockly.Constants.LoRa.ENCODE[children_type] !== 'string') {
                    let dropdown_value = '';
                    if(children_type.includes('accelerometer') || children_type.includes('gyroscope') || children_type.includes('magnetoscope') || children_type.includes('inclinometer'))
                        dropdown_value = children.getFieldValue("AXIS");
                    else if (children_type.includes('Gas'))
                        dropdown_value = children.getFieldValue("GAS");
                    else if (children_type.includes('SCD30') || children_type.includes('color'))
                        dropdown_value = children.getFieldValue("DATA");
                    else if (children_type.includes('ParticulateMatter'))
                        dropdown_value = children.getFieldValue("TYPE");
                    else if (children_type.includes('Light'))
                        dropdown_value = children.getFieldValue("LIGHT");
                    data_type += Blockly.Constants.LoRa.ENCODE[children_type][dropdown_value];
                } else {
                    data_type += Blockly.Constants.LoRa.ENCODE[children_type];
                }
            } else {
                data_type += '0x00';
            }
            data += ",";
            data_type += ","
        }
    }
    if (data[data.length-1] === "," && data_type[data_type.length-1] === ",") {
        data = data.slice(0, -1) + "]";
        data_type = data_type.slice(0, -1) + "]";
    } else {
        data +=  "]";
        data_type += "]";
    }

    let code = "data = " + data + NEWLINE;
    code += "data_type = " + data_type + NEWLINE;
    code += "sendData(data,data_type)" + NEWLINE;
    return code;
};