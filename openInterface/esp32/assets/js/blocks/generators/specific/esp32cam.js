/**
 * @fileoverview ESP32-CAM generators for Esp32.
 */

// ESP32-CAM

Blockly.Python.esp32Cam_getCaptureData = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('camera', IMPORT_CAMERA);
    Blockly.Python.addImport('binascii', IMPORT_BINASCII);
    Blockly.Python.addConstant('display_resolutions', FUNCTIONS_ESP32.CONSTANT_ESP32_CAM_DISPLAY_RESOLUTIONS);
    Blockly.Python.addConstant('cam_framesize', "CAM_FRAMESIZE = DISPLAY_RESOLUTIONS.index([i for i in DISPLAY_RESOLUTIONS if 'VGA' in i][0])");
    Blockly.Python.addFunction('ESP32CAM_initialize', FUNCTIONS_ESP32.DEF_ESP32_CAM_INITIALIZE);
    Blockly.Python.addFunction('ESP32CAM_capture', FUNCTIONS_ESP32.DEF_ESP32_CAM_CAPTURE);
    Blockly.Python.addInit('camera', 'cam = None');
    switch (block.getFieldValue("BASE")) {
        case "BASE16":
            return ["ESP32CAM_capture(False)", Blockly.Python.ORDER_ATOMIC];
        case "BASE64":
        default:
            return ["ESP32CAM_capture(True)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.esp32Cam_setImageSize = function (block) {
    Blockly.Python.addImport('camera', IMPORT_CAMERA);
    Blockly.Python.addConstant('display_resolutions', FUNCTIONS_ESP32.CONSTANT_ESP32_CAM_DISPLAY_RESOLUTIONS);
    const framesize = block.getFieldValue("FRAMESIZE");
    Blockly.Python.addConstant('cam_framesize', "CAM_FRAMESIZE = DISPLAY_RESOLUTIONS.index([i for i in DISPLAY_RESOLUTIONS if '" + framesize + "' in i][0])");
    return "";
};

Blockly.Python.esp32Cam_controlFlashLED = function (block) {
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    const pinName = "p4";
    Blockly.Python.addInit('write-digital_p4', "# Builtin LED on " + pinName);
    Blockly.Python.addInit(pinName + '_OUT', pinName + " = Pin(4, Pin.OUT)");
    const inputBlock = block.getInput("STATE").connection.targetBlock();
    if (inputBlock && (inputBlock.type == "io_digital_signal")) {
        return 'try:' + NEWLINE
            + '  ' + (state == '1' ? pinName + ".on()" : pinName + ".off()") + NEWLINE
            + 'except:' + NEWLINE
            + '  ' + (state == '1' ? pinName + ".duty(1023)" : pinName + ".duty(0)") + NEWLINE;
    } else {
        return 'try:' + NEWLINE
            + '  ' + pinName + '.value(' + state + ')' + NEWLINE
            + 'except:' + NEWLINE
            + '  ' + pinName + '.duty(int(' + state + ')*1023)' + NEWLINE;
    }
};

Blockly.Python.esp32Cam_SDcard_savePic = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('os', IMPORT_OS);
    Blockly.Python.addImport('sdcard', IMPORT_SDCARD);
    let pic = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "None";
    switch (block.getFieldValue("BASE")) {
        case "BASE16":
            break;
        case "BASE64":
        default:
            Blockly.Python.addImport('binascii', IMPORT_BINASCII);
            pic = "binascii.a2b_base64(" + pic + ")";
    }
    Blockly.Python.addInit('spi', "spi = SPI(1, 1000000, sck=Pin(14), mosi=Pin(15), miso=Pin(2))");
    Blockly.Python.addInit('sd_init', "sd = sdcard.SDCard(spi, Pin(13))");
    Blockly.Python.addInit('rtc', "rtc = RTC()");
    Blockly.Python.addFunction('SDCard_writeFile', FUNCTIONS_ESP32.DEF_SD_CARD_WRITE_FILE);
    Blockly.Python.addPowerOn('sd_mount', FUNCTIONS_ESP32.INIT_OS_MOUNT);
    const date = new Date();
    const timeSetting = "#Warning, the clock is recovered by browser when ESP32 is flashed." + NEWLINE +
        "#If ESP32 is powered off, time will not flow." + NEWLINE +
        "rtc.datetime((" + date.getFullYear() + ", " + (date.getMonth() + 1) + ", " + date.getDate() +
        ", " + date.getDay() + ", " + date.getHours() + ", " + date.getMinutes() + ", " + date.getSeconds() + ", 0))";
    Blockly.Python.addPowerOn('esp32_setTime', timeSetting);
    return "SDCard_writeFile(" + pic + ", filename='esp32-cam', date=True, extension='jpg', sd = True)" + NEWLINE;
};

Blockly.Python.esp32Cam_SDcard_saveData = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('os', IMPORT_OS);
    Blockly.Python.addImport('sdcard', IMPORT_SDCARD);
    const data = Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) || "None";
    const filename = Blockly.Python.valueToCode(block, "FILENAME", Blockly.Python.ORDER_NONE) || "";
    Blockly.Python.addInit('spi', "spi = SPI(1, 1000000, sck=Pin(14), mosi=Pin(15), miso=Pin(2))");
    Blockly.Python.addInit('sd_init', "sd = sdcard.SDCard(spi, Pin(13))");
    Blockly.Python.addFunction('SDCard_writeFile', FUNCTIONS_ESP32.DEF_SD_CARD_WRITE_FILE);
    Blockly.Python.addPowerOn('sd_mount', FUNCTIONS_ESP32.INIT_OS_MOUNT);
    return "SDCard_writeFile(" + data + ", filename = " + filename + ", sd = True)" + NEWLINE;
};