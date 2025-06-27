/**
 * @fileoverview Communication generators for Arduino.
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
    const code = [];
    code[0] = 'Serial.print("@Graph:");' + NEWLINE;
    let blockItem = "";
    for (var itemCount = 1; itemCount < block.itemCount_ + 1; itemCount++) {
        blockItem = Blockly.Arduino.valueToCode(block, "ADD" + (itemCount - 1), Blockly.Arduino.ORDER_NONE);
        if (blockItem[blockItem.length - 1] === '|') {
            blockItem = blockItem.substring(0, blockItem.length - 1);
            let data = blockItem.split(/:(.+)/);
            if (isNaN(data[1])) {
                if (data[1] == "NULL") {
                    data[1] = '""';
                }
                code[itemCount] = 'Serial.print("' + data[0] + ':");' + NEWLINE + 'Serial.print(String(' + data[1] + '));' + NEWLINE + 'Serial.print("|");' + NEWLINE;
            } else {
                code[itemCount] = 'Serial.print(" + blockItem + "|");' + NEWLINE;
            }
        } else if (!isNaN(blockItem) && blockItem !== '') {
            code[itemCount] = 'Serial.print("' + blockItem + '|");' + NEWLINE;
        } else {
            code[itemCount] = 'Serial.print(' + blockItem + ');' + NEWLINE + 'Serial.print("|");' + NEWLINE;
        }
    }
    code[itemCount + 1] = 'Serial.print("\\n");' + NEWLINE + 'delay(50);' + NEWLINE;
    return code.join('');
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

Blockly.Arduino.communication_writeOpenLogSd = function (block) {
    const pinRX = block.getFieldValue("RX");
    const pinTX = block.getFieldValue("TX");
    const baudrate = block.getFieldValue("BAUD");
    const objName = 'OpenLog_' + pinRX;
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    const pinRXName = 'PIN_OPENLOG_RXI_' + pinTX;
    const pinTXName = 'PIN_OPENLOG_TX0_' + pinRX;
    Blockly.Arduino.addDefine(objName, "#define " + pinRXName + TAB + pinTX + NEWLINE + "#define " + pinTXName + TAB + pinRX);
    Blockly.Arduino.addDeclaration(objName, "SoftwareSerial " + objName + "(" + pinTXName + ", " + pinRXName + "); // RX, TX -> inversion des broches");
    Blockly.Arduino.addSetup(objName, objName + ".begin(" + baudrate + ");");
    var data = Blockly.Arduino.valueToCode(block, "DATA", Blockly.Arduino.ORDER_NONE) || "'datas error'";
    return objName + ".println(" + data + ");" + NEWLINE;
};

Blockly.Arduino.communication_SDWriteDataSPI = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const data = Blockly.Arduino.valueToCode(block, "DATA", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addInclude('sd', INCLUDE_SD);
    Blockly.Arduino.addInclude('spi', INCLUDE_SPI);
    let fileName = "\"log_";
    const d = new Date();
    const date = [d.getMonth() + 1, "_", d.getDate()];
    for (i in date) {
        fileName += date[i].toString();
    }
    fileName += ".txt\"";
    Blockly.Arduino.addDeclaration('fileName', "const char* fileName = " + fileName + ";");
    Blockly.Arduino.addDeclaration('dataFile', "File dataFile;");
    Blockly.Arduino.addFunction('sd_setupCard', FUNCTIONS_ARDUINO.DEF_SD_SPI_SETUP_CARD);
    Blockly.Arduino.addFunction('sd_writeData', FUNCTIONS_ARDUINO.DEF_SD_SPI_WRITE_DATA);
    Blockly.Arduino.addSetup('sd', "sd_setupCard(" + block.getFieldValue("CS") + ");");
    return "sd_writeData(" + data + ");" + NEWLINE;
};

//http://wiki.seeedstudio.com/Grove-Serial_Bluetooth/
Blockly.Arduino.communication_setSerialBluetooth = function (block) {
    const name = Blockly.Arduino.valueToCode(block, "NAME", Blockly.Arduino.ORDER_ATOMIC);
    const mode = Blockly.Arduino.valueToCode(block, "MODE", Blockly.Arduino.ORDER_ATOMIC);
    const pin = Blockly.Arduino.valueToCode(block, "PIN", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addDeclaration('serial_bt', "SoftwareSerial blueToothSerial(PIN_BT_RX, PIN_BT_TX);");
    Blockly.Arduino.addFunction('bluetooth_setupConnection', FUNCTIONS_ARDUINO.DEF_SETUP_BT_CONNECTION);
    Blockly.Arduino.addSetup('pin_RX', "pinMode(PIN_BT_RX, INPUT);");
    Blockly.Arduino.addSetup('pin_TX', "pinMode(PIN_BT_TX, OUTPUT);");
    Blockly.Arduino.addSetup('serial_bt_setup', "bluetooth_setupConnection(" + name + ", " + mode + ", " + pin + ");");
    return "";
};

Blockly.Arduino.communication_sendSerialBluetoothData = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const dta = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addDefine('serial_bt', "#define PIN_BT_RX" + TAB + pinRX + NEWLINE + "#define PIN_BT_TX" + TAB + pinTX);
    Blockly.Arduino.addDeclaration('serial_bt', "SoftwareSerial blueToothSerial(PIN_BT_RX, PIN_BT_TX);");
    Blockly.Arduino.addFunction('bluetooth_setupConnection', FUNCTIONS_ARDUINO.DEF_SETUP_BT_CONNECTION);
    Blockly.Arduino.addSetup('pin_RX', "pinMode(PIN_BT_RX, OUTPUT);");
    Blockly.Arduino.addSetup('pin_TX', "pinMode(PIN_BT_TX, INPUT);");
    Blockly.Arduino.addSetup('serial_bt_setup', 'bluetooth_setupConnection("VittaEmitter", "M", "0000");');
    return "blueToothSerial.print(String(" + dta + "));" + NEWLINE;
};

Blockly.Arduino.communication_onSerialBluetoothDataReceived = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const dtaVar = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addDefine('serial_bt', "#define PIN_BT_RX" + TAB + pinRX + NEWLINE + "#define PIN_BT_TX" + TAB + pinTX);
    Blockly.Arduino.addDeclaration('serial_bt', "SoftwareSerial blueToothSerial(PIN_BT_RX, PIN_BT_TX);");
    Blockly.Arduino.addSetup('pin_RX', "pinMode(PIN_BT_RX, OUTPUT);");
    Blockly.Arduino.addSetup('pin_TX', "pinMode(PIN_BT_TX, INPUT);");
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    return "if (blueToothSerial.available()) {" + NEWLINE + TAB + dtaVar + " = String(blueToothSerial.read());" + NEWLINE + branchCode + "}" + NEWLINE;
};

Blockly.Arduino.communication_hm10_sendBluetoothData = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const dta = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addDefine('hm10_bt', "#define PIN_HM10_RX" + TAB + pinRX + NEWLINE + "#define PIN_HM10_TX" + TAB + pinTX);
    Blockly.Arduino.addDeclaration('hm10_bt', "SoftwareSerial HM10(PIN_HM10_RX, PIN_HM10_TX);");
    Blockly.Arduino.addSetup('hm10_bt', "HM10.begin(9600);");
    return "HM10.print(String(" + dta + "));" + NEWLINE;
};

Blockly.Arduino.communication_hm10_onBluetoothDataReceived = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    const dtaVar = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addDefine('hm10_bt', "#define PIN_HM10_RX" + TAB + pinRX + NEWLINE + "#define PIN_HM10_TX" + TAB + pinTX);
    Blockly.Arduino.addDeclaration('hm10_bt', "SoftwareSerial HM10(PIN_HM10_RX, PIN_HM10_TX);");
    Blockly.Arduino.addSetup('hm10_bt', "HM10.begin(9600);");
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    return "HM10.listen();" + NEWLINE + "if (HM10.available() > 0) {" + NEWLINE + TAB + dtaVar + " = HM10.readString();" + NEWLINE + branchCode + "}" + NEWLINE;
};

//https://howtomechatronics.com/tutorials/arduino/arduino-wireless-communication-nrf24l01-tutorial/
Blockly.Arduino.communication_sendRadioNRF24Data = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const pinCE = block.getFieldValue("CE");
    const pinCSN = block.getFieldValue("CSN");
    const data = Blockly.Arduino.valueToCode(block, "DATA", Blockly.Arduino.ORDER_ATOMIC) || '""';
    const address = block.getFieldValue("ADDRESS");
    let channel = Blockly.Arduino.valueToCode(block, "CANAL", Blockly.Arduino.ORDER_ATOMIC) || "0";
    if (channel < 0) channel = 0;
    if (channel > 125) channel = 125;
    Blockly.Arduino.addInclude('spi', INCLUDE_SPI);
    Blockly.Arduino.addInclude('nrf24l01', INCLUDE_NRF24L01);
    Blockly.Arduino.addInclude('rf24', INCLUDE_RF24);
    Blockly.Arduino.addInclude('printf', INCLUDE_PRINTF);
    Blockly.Arduino.addDeclaration('rf24_address_' + address, "String address_" + address + " = \"0000" + address + "\";");
    Blockly.Arduino.addDeclaration('rf24_init', "RF24 radioNRF(" + pinCE + ", " + pinCSN + ");");
    Blockly.Arduino.addFunction('nrf24_init', FUNCTIONS_ARDUINO.DEF_RADIO_NRF24_INIT);
    Blockly.Arduino.addFunction('nrf24_sendData', FUNCTIONS_ARDUINO.DEF_RADIO_NRF24_SEND_DATA);
    Blockly.Arduino.addSetup('setup_nrf24', "nrf24_init(" + channel + ");");
    Blockly.Arduino.addSetup("setup_nrf_transmitter", "radioNRF.openWritingPipe((uint8_t *)address_" + address + ".c_str());");
    const dataBlock = block.getInput("DATA").connection.targetBlock(); // Careful if inputs order change, here we get the block message "", not the canal 115
    if (dataBlock && dataBlock.type != 'lists_create_with' && dataBlock.type != 'lists_repeat') {
        if (dataBlock.type == 'text') {
            return "nrf24_sendData(" + data + ");" + NEWLINE;
        }
        if (dataBlock.type == 'text_join') {
            return "nrf24_sendData(" + data.substring(1, data.length - 1) + ");" + NEWLINE;
        }
        return "nrf24_sendData(String(" + data + "));" + NEWLINE;
    }
};

//https://howtomechatronics.com/tutorials/arduino/arduino-wireless-communication-nrf24l01-tutorial/
Blockly.Arduino.communication_onRadioNRF24_dataReceived = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const pinCE = block.getFieldValue("CE");
    const pinCSN = block.getFieldValue("CSN");
    const address = block.getFieldValue("ADDRESS");
    let channel = Blockly.Arduino.valueToCode(block, "CANAL", Blockly.Arduino.ORDER_ATOMIC) || "0";
    if (channel < 0) channel = 0;
    if (channel > 125) channel = 125;
    Blockly.Arduino.addInclude('spi', INCLUDE_SPI);
    Blockly.Arduino.addInclude('nrf24l01', INCLUDE_NRF24L01);
    Blockly.Arduino.addInclude('rf24', INCLUDE_RF24);
    Blockly.Arduino.addInclude('printf', INCLUDE_PRINTF);
    Blockly.Arduino.addDeclaration('rf24_address_' + address, "String address_" + address + " = \"0000" + address + "\";");
    Blockly.Arduino.addDeclaration('rf24_init', "RF24 radioNRF(" + pinCE + ", " + pinCSN + ");");
    Blockly.Arduino.addFunction('nrf24_init', FUNCTIONS_ARDUINO.DEF_RADIO_NRF24_INIT);
    Blockly.Arduino.addVariable('receivedData', "char receivedData[32];");
    const dtaVar = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    Blockly.Arduino.addSetup('setup_nrf24', "nrf24_init(" + channel + ");");
    Blockly.Arduino.addSetup("setup_nrf_receiver", "radioNRF.openReadingPipe(1, (uint8_t *)address_" + address + ".c_str());");
    return "radioNRF.startListening();" + NEWLINE + "if (radioNRF.available()) {" + NEWLINE + "  radioNRF.read(&receivedData, sizeof(receivedData));" + NEWLINE + TAB + dtaVar + " = receivedData;" + NEWLINE + branchCode + "}" + NEWLINE;
};

//http://wiki.seeedstudio.com/Grove-433MHz_Simple_RF_Link_Kit/
Blockly.Arduino.communication_sendRadio433mhzData = function (block) {
    const pin = block.getFieldValue("PIN");
    const dta = Blockly.Arduino.valueToCode(block, "DATA", Blockly.Arduino.ORDER_ATOMIC);
    const setup = "vw_set_tx_pin(PIN_RF_TX);" + NEWLINE + "vw_setup(2000);  // in bits/s";
    Blockly.Arduino.addInclude('virtual_wire', INCLUDE_VIRTUAL_WIRE);
    Blockly.Arduino.addDefine('rf_pin_' + pin, "#define PIN_RF_TX" + TAB + pin);
    Blockly.Arduino.addSetup("radioRF433_emitter", setup);
    const c = block.inputList[0].connection.targetBlock();
    if (c) {
        if (c.type == 'text') {
            Blockly.Arduino.addVariable('radioBuffer', 'char* radioBuffer;');
            return "radioBuffer = " + dta + ";" + NEWLINE + "vw_send((uint8_t *)radioBuffer, strlen(radioBuffer));" + NEWLINE;
        }
        Blockly.Arduino.addVariable('strBuffer', 'String strBuffer;');
        if (c.type == 'text_join') {
            return "strBuffer = " + dta.substring(1, dta.length - 1) + ";" + NEWLINE + "vw_send((uint8_t *)strBuffer.c_str(), strBuffer.length()+1);" + NEWLINE;
        }
        return "strBuffer = String(" + dta + ");" + NEWLINE + "vw_send((uint8_t *)strBuffer.c_str(), strBuffer.length()+1);" + NEWLINE;
    }
    Blockly.Arduino.addVariable('radioBuffer', 'char *radioBuffer;');
    return "radioBuffer = NULL;" + NEWLINE + "vw_send((uint8_t *)radioBuffer, strlen(radioBuffer));" + NEWLINE;
};

//http://wiki.seeedstudio.com/Grove-433MHz_Simple_RF_Link_Kit/
Blockly.Arduino.communication_onRadio433mhzDataReceived = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const pin = block.getFieldValue("PIN");
    const dtaVar = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    Blockly.Arduino.addInclude('virtual_wire', INCLUDE_VIRTUAL_WIRE);
    Blockly.Arduino.addDefine('rf_pin_' + pin, "#define PIN_RF_RX   " + pin);
    Blockly.Arduino.addFunction('radioRF433_setupReceiver', FUNCTIONS_ARDUINO.SETUP_RADIO_433_RECEIVER);
    Blockly.Arduino.addSetup('radioRF433_receiver', "radioRF433_setupReceiver();");
    const code = "uint8_t buf[VW_MAX_MESSAGE_LEN];" + NEWLINE +
        "uint8_t buflen = VW_MAX_MESSAGE_LEN;" + NEWLINE +
        "if(vw_get_message(buf, &buflen)) {" + NEWLINE +
        TAB + dtaVar + " = \"\";" + NEWLINE +
        "  for(int i = 0; i < buflen; ++i) {" + NEWLINE +
        TAB + dtaVar + " += (char)buf[i];" + NEWLINE +
        "  }" + NEWLINE + branchCode +
        TAB + "for (int i=0; i<(" + dtaVar + ".length()+1); i++) buf[i]=NULL;" + NEWLINE +
        "}" + NEWLINE;
    return code;
};

Blockly.Arduino.communication_onIRDataReceived = function (block) {
    const dtaVar = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    Blockly.Arduino.addInclude('IRremote', INCLUDE_IR_REMOTE);
    Blockly.Arduino.addDefine('ir_receiver', "#define PIN_IR_RECEIVER" + TAB + block.getFieldValue("PIN"));
    Blockly.Arduino.addDeclaration('ir_receiver', "IRrecv IR_receiver(PIN_IR_RECEIVER);" + NEWLINE + "decode_results IRmsg;");
    Blockly.Arduino.addSetup("ir_receiver", "IR_receiver.enableIRIn();" + NEWLINE + "IR_receiver.blink13(true);");
    return "if (IR_receiver.decode(&IRmsg)) {" + NEWLINE + TAB + dtaVar + " = IRmsg.value;" + NEWLINE + branchCode + "  delay(50);" + NEWLINE + "  IR_receiver.resume();" + NEWLINE + "}" + NEWLINE;
};

Blockly.Arduino.communication_onRemoteCommandReceived = function (block) {
    const command = block.getFieldValue("COMMAND");
    const dtaVar = Blockly.Arduino.valueToCode(block, "DATA", Blockly.Arduino.ORDER_ATOMIC) || "NULL";
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    Blockly.Arduino.addFunction('remoteNEC_getButton', FUNCTIONS_ARDUINO.DEF_REMOTE_NEC_BASIC_BLACK_GET_BUTTON);
    return "if (remoteNEC_getButton(" + dtaVar + ") == \"" + command + "\") {" + NEWLINE + branchCode + "}" + NEWLINE;
};

//http://wiki.seeedstudio.com/Grove-125KHz_RFID_Reader/
Blockly.Arduino.communication_rfid_getCardID = function (block) {
    const pinRX = block.getFieldValue("RX");
    const pinTX = block.getFieldValue("TX");
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addDeclaration('rfid', "SoftwareSerial rfid(" + pinRX + ", " + pinTX + ");");
    Blockly.Arduino.addDeclaration('buffer', "unsigned char buffer[64];");
    Blockly.Arduino.addDeclaration('count', "int count = 0;");
    Blockly.Arduino.addFunction('clearBufferArray', FUNCTIONS_ARDUINO.DEF_CLEAR_BUFFER_ARRAY);
    Blockly.Arduino.addFunction('rfid_getStringCardID', FUNCTIONS_ARDUINO.DEF_RFID_GET_STRING_CARD_ID);
    Blockly.Arduino.addSetup('rfid', "rfid.begin(9600);");
    return ['rfid_getStringCardID()', Blockly.Arduino.ORDER_ATOMIC];
};

//http://wiki.seeedstudio.com/Grove-GPS/
Blockly.Arduino.communication_onGPSDataReceived = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const pinRX = block.getFieldValue("RX");
    const pinTX = block.getFieldValue("TX");
    const dtaVar = Blockly.Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addDeclaration('gps', "SoftwareSerial gpsSerial(" + pinRX + ", " + pinTX + ");");
    Blockly.Arduino.addVariable('buffer', 'char buffer[64];');
    Blockly.Arduino.addVariable('count', 'int count = 0;');
    Blockly.Arduino.addFunction('gps_setup', FUNCTIONS_ARDUINO.DEF_SETUP_GPS);
    Blockly.Arduino.addFunction('clearBufferArray', FUNCTIONS_ARDUINO.DEF_CLEAR_BUFFER_ARRAY);
    Blockly.Arduino.addFunction('gps_getBufferData', FUNCTIONS_ARDUINO.DEF_GPS_GET_DATA);
    Blockly.Arduino.addSetup('gps', "gps_setup();");
    return "if (gpsSerial.available()) {" + NEWLINE + TAB + dtaVar + " = gps_getBufferData();" + NEWLINE + branchCode + "}" + NEWLINE;
};

// GROVE RTC _ INIT SET DAY BLOCK
//http://wiki.seeedstudio.com/Grove-RTC/
Blockly.Arduino.communication_clockRTC_setDate = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    const date = block.getFieldValue("DATE").split("-");
    const module = block.getFieldValue("MODULE");
    switch (module) {
        case "PCF85063TP":
            Blockly.Arduino.addInclude('pcf85063tp', INCLUDE_PCF85063TP);
            Blockly.Arduino.addDeclaration('clock_rtc_hp', "PCD85063TP clock_hp;");
            Blockly.Arduino.addSetup('clock_rtc_hp', "clock_hp.begin();");
            Blockly.Arduino.addSetup('clock_rtc_hp_YMD', "clock_hp.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ");");
            Blockly.Arduino.addSetup('clock_rtc_hp_DOW', "clock_hp.fillDayOfWeek(" + block.getFieldValue("DAY") + ");");
            Blockly.Arduino.addPowerOn('clock_rtc_hp', "clock_hp.setTime();" + NEWLINE + "clock_hp.startClock();");
            return "";
        case "DS1307":
            Blockly.Arduino.addInclude('ds1307', INCLUDE_DS1307);
            Blockly.Arduino.addDeclaration('ds1307', "DS1307 clock;");
            Blockly.Arduino.addSetup('ds1307', "clock.begin();");
            Blockly.Arduino.addSetup('ds1307_YMD', "clock.fillByYMD(" + parseInt(date[0]) + ", " + parseInt(date[1]) + ", " + parseInt(date[2]) + ");");
            Blockly.Arduino.addSetup('ds1307_DOW', "clock.fillDayOfWeek(" + block.getFieldValue("DAY") + ");");
            Blockly.Arduino.addPowerOn('ds1307', "clock.setTime();" + NEWLINE + "clock.startClock();");
            return "";
    }
};

// GROVE RTC _ INIT SET HOUR BLOCK
//http://wiki.seeedstudio.com/Grove-RTC/
Blockly.Arduino.communication_clockRTC_setHour = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    const hour = Blockly.Arduino.valueToCode(block, "HOUR", Blockly.Arduino.ORDER_ATOMIC);
    const minute = Blockly.Arduino.valueToCode(block, "MIN", Blockly.Arduino.ORDER_ATOMIC);
    const second = Blockly.Arduino.valueToCode(block, "SEC", Blockly.Arduino.ORDER_ATOMIC);
    const module = block.getFieldValue("MODULE");
    switch (module) {
        case "PCF85063TP":
            Blockly.Arduino.addInclude('pcf85063tp', INCLUDE_PCF85063TP);
            Blockly.Arduino.addDeclaration('clock_rtc_hp', "PCD85063TP clock_hp;");
            Blockly.Arduino.addSetup('clock_rtc_hp', "clock_hp.begin();");
            Blockly.Arduino.addSetup('clock_rtc_hp_HMS', "clock_hp.fillByHMS(" + hour + "," + minute + "," + second + ");");
            Blockly.Arduino.addPowerOn('clock_rtc_hp', "clock_hp.setTime();" + NEWLINE + "clock_hp.startClock();");
            return "";
        case "DS1307":
            Blockly.Arduino.addInclude('ds1307', INCLUDE_DS1307);
            Blockly.Arduino.addDeclaration('ds1307', "DS1307 clock;");
            Blockly.Arduino.addSetup('ds1307', "clock.begin();");
            Blockly.Arduino.addSetup('ds1307_HMS', "clock.fillByHMS(" + hour + "," + minute + "," + second + ");");
            Blockly.Arduino.addPowerOn('ds1307', "clock.setTime();" + NEWLINE + "clock.startClock();");
            return "";
    }
};

// GROVE RTC _ READ TIME BLOCK
//http://wiki.seeedstudio.com/Grove-RTC/
Blockly.Arduino.communication_clockRTC_readTime = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    const select = block.getFieldValue("DATA");
    const module = block.getFieldValue("MODULE");
    switch (module) {
        case "PCF85063TP":
            Blockly.Arduino.addInclude('pcf85063tp', INCLUDE_PCF85063TP);
            Blockly.Arduino.addDeclaration('clock_rtc_hp', "PCD85063TP clock_hp;");
            Blockly.Arduino.addSetup('clock_rtc_hp', "clock_hp.begin();");
            Blockly.Arduino.addPowerOn('clock_rtc_hp', "clock_hp.startClock();");
            if (parseInt(select, 10) < 6) {
                Blockly.Arduino.addFunction('pcd85063tp_RTC_getTime', FUNCTIONS_ARDUINO.DEF_PCD85063TP_RTC_GET_TIME);
                return ["pcd85063tp_RTC_getTime(&clock_hp, " + select + ")", Blockly.Arduino.ORDER_ATOMIC];
            } else {
                Blockly.Arduino.addFunction('pcd85063tp_RTC_getDayName', FUNCTIONS_ARDUINO.DEF_PCD85063TP_RTC_GET_DAY_NAME);
                return ["pcd85063tp_RTC_getDayName(&clock_hp)", Blockly.Arduino.ORDER_ATOMIC];
            }
        case "DS1307":
            Blockly.Arduino.addInclude('ds1307', INCLUDE_DS1307);
            Blockly.Arduino.addDeclaration('ds1307', "DS1307 clock;");
            Blockly.Arduino.addSetup('ds1307', "clock.begin();");
            Blockly.Arduino.addPowerOn('ds1307', "clock.startClock();");
            if (parseInt(select, 10) < 6) {
                Blockly.Arduino.addFunction('ds1307_RTC_getTime', FUNCTIONS_ARDUINO.DEF_DS1307_RTC_GET_TIME);
                return ["ds1307_RTC_getTime(&clock, " + select + ")", Blockly.Arduino.ORDER_ATOMIC];
            } else {
                Blockly.Arduino.addFunction('ds1307_RTC_getDayName', FUNCTIONS_ARDUINO.DEF_RTC_GET_DAY_NAME);
                return ["ds1307_RTC_getDayName(&clock)", Blockly.Arduino.ORDER_ATOMIC];
            }
    }
};

/*
//http://duinoedu.com/store1/-bluetooth/293-hc05.html
Blockly.Arduino.vitta_grove_hc05 = function (block) {
    var pin = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC);
    let pin2 = eval(pin) + eval(1);
    Blockly.Arduino.addInclude('include_rgb_lcd', INCLUDE_RGB_LCD);
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addInclude('include_kd_class3', "#include <KD-CLASS-3.h>");
    Blockly.Arduino.addInclude('setup_bluetooth', "SoftwareSerial blueToothSerial_" + pin + "(" + pin + ", " + pin2 + ");");
    Blockly.Arduino.addInclude('define_hc05.h_3', "int blueToothReceiveData() {\n");
    Blockly.Arduino.addInclude('define_hc05.h_3', "if(blueToothSerial_"+pin+".available())return blueToothSerial_"+pin+".read();\n");
    Blockly.Arduino.addInclude('define_hc05.h_3', "else return 256;\n}");
    Blockly.Arduino.addDeclaration('init_rgb_lcd', "rgb_lcd lcdRgb;");
    Blockly.Arduino.addSetup("setup_print", "blueToothSerial_"+pin+".begin(9600);");
    Blockly.Arduino.addSetup("setup_rgb_lcd", "lcdRgb.begin(16, 2);");
    Blockly.Arduino.addSetup("setup_print", "lcdRgb.setCursor(0,0);");
    Blockly.Arduino.addSetup("setup_print", "lcdRgb.print(blueToothReceiveData());\n}");
        return ["_loop();", Blockly.Arduino.ORDER_ATOMIC] 
};
*/

/*
//http://wiki.seeedstudio.com/Grove-Infrared_Receiver/
Blockly.Arduino.vitta_grove_infrared_receiver = function (block) {
    var pin = Blockly.Arduino.valueToCode(block, "VALUE", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addInclude('define_hc05.h_8', "#include <IRSendRev.h>");
    Blockly.Arduino.addInclude('define_hc05.h', "#define BIT_LEN 0");
    Blockly.Arduino.addInclude('define_hc05.h_2', "#define BIT_START_H 1");
    Blockly.Arduino.addInclude('define_hc05.h_3', "#define BIT_START_L 2");
    Blockly.Arduino.addInclude('define_hc05.h_4', "#define BIT_DATA_H 3");
    Blockly.Arduino.addInclude('define_hc05.h_5', "#define BIT_DATA_L 4");
    Blockly.Arduino.addInclude('define_hc05.h_6', "#define BIT_DATA_LEN 5");
    Blockly.Arduino.addInclude('define_hc05.h_7', "#define BIT_DATA 6");
    Blockly.Arduino.addInclude('define_hc05.h_9', "const int pinRecv = 2;");
    let unit = block.getFieldValue("grove_infrared_receiver");
    Blockly.Arduino.addSetup("setup_print", "Serial.begin(115200);");
    Blockly.Arduino.addSetup("setup_print", "IR.Init(pinRecv);");
    Blockly.Arduino.addSetup("setup_print", "unsigned char dta[20];");
    var code = "if(IR.IsDta()){\n";
        code += "IR.Recv(dta);\n";
        code += "for(int i=0; i<dta[BIT_DATA_LEN]; i++)\n{\n";
        code += "Serial.print('0x');\n";
        code += "Serial.print(dta[i+BIT_DATA], HEX);\n}\n";
        code += "for(int i=0; i<dta[BIT_DATA_LEN]; i++)\n{\n";
        code += "Serial.print(dta[i+BIT_DATA], DEC);\n}\n";
        code += "Serial.println()\n}"
        return [code, Blockly.Arduino.ORDER_ATOMIC] 
};
*/
