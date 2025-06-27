/**
 * @fileoverview Sensors generators for Esp32.
 */

// Esp32 board sensors

Blockly.Python.sensors_readHallSensor = function () {
    Blockly.Python.addImport('esp32', IMPORT_ESP32);
    return ["esp32.hall_sensor()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_readProcessorTemperature = function (block) {
    Blockly.Python.addImport('esp32', IMPORT_ESP32);
    let code = "";
    switch (block.getFieldValue("UNIT")) {
        case "CELSIUS":
            code += "(esp32.raw_temperature()-32)*5/9";
            break;
        case "KELVIN":
            code += "(esp32.raw_temperature()-32)*5/9 + 273.15";
            break;
        case "FAHRENHEIT":
            code += "esp32.raw_temperature()";
            break;
        default:
            code += "esp32.raw_temperature()";
            break;
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// ESP32-CAM

Blockly.Python.esp32Cam_getCaptureData = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('camera', IMPORT_CAMERA);
    Blockly.Python.addImport('binascii', IMPORT_BINASCII);
    Blockly.Python.addConstant('display_resolutions', FUNCTIONS_ESP32.CONSTANT_ESP32_CAM_DISPLAY_RESOLUTIONS);
    Blockly.Python.addInit('cameraStatus', 'cameraStatus = False');
    Blockly.Python.addFunction('ESP32CAM_initialize', FUNCTIONS_ESP32.DEF_ESP32_CAM_INITIALIZE);
    Blockly.Python.addFunction('ESP32CAM_capture', FUNCTIONS_ESP32.DEF_ESP32_CAM_CAPTURE);
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
    Blockly.Python.addConstant('cam_framesize', "CAM_FRAMESIZE = DISPLAY_RESOLUTIONS.index([i for i in DISPLAY_RESOLUTIONS if '" + framesize + "' in i][0]) + 1");
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

// Climate sensors

Blockly.Python.sensors_getBmp280Data = function (block) {
    const addr = block.getFieldValue("ADDR");
    Blockly.Python.addImport('bmp280', IMPORT_ESP32_BMP280);
    Blockly.Python.addInit('bmp280', "bmp280 = BMP280(i2c=I2C(scl=Pin(22), sda=Pin(21)), addr=" + addr + ")");
    Blockly.Python.addPowerOn('bmp280', "bmp280.set_default_measure()");
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            var code = "bmp280.temperature()";
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ATOMIC];
        case "PRESS":
            return ["bmp280.pressure()", Blockly.Python.ORDER_ATOMIC];
        case "ALT":
            return ["bmp280.altitude()", Blockly.Python.ORDER_ATOMIC];
    }
};

// Gas sensors

Blockly.Python.sensors_getSgp30Gas = function (block) {
    Blockly.Python.addImport('esp32_sgp30', IMPORT_ESP32_SGP30);
    Blockly.Python.addInit('sgp30', "sgp30 = SGP30(i2c=I2C(scl=Pin(22), sda=Pin(21)))");
    switch (block.getFieldValue("GAS")) {
        case "CO2":
            return ["sgp30.co2_equivalent()", Blockly.Python.ORDER_ATOMIC];
        case "TVOC":
            return ["sgp30.total_organic_compound()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getO2gas = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Dioxygen Sensor');
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_ESP32.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('readO2', FUNCTIONS_ESP32.DEF_O2SENSOR_READ);
    return ["readO2(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

// SCD30 SENSOR _ READ CO2/TEMP/HUM BLOCK
Blockly.Python.sensors_SCD30_readData = function (block) {
    Blockly.Python.addImport('esp32_scd30', IMPORT_ESP32_SCD30);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addInit('scd30_data', "scd30_data = [0, 0, 0]");
    Blockly.Python.addInit('t_scd', "t_scd = utime.ticks_ms()");
    Blockly.Python.addFunction('scd30_read', FUNCTIONS_ESP32.DEF_SCD30_READ);
    Blockly.Python.addInit('scd30', "scd30 = SCD30(i2c=I2C(scl=Pin(22), sda=Pin(21)))");
    switch (block.getFieldValue("DATA")) {
        case "CO2":
            return ["scd30_read(0)", Blockly.Python.ORDER_ATOMIC];
        case "TEMP":
            var code = "scd30_read(1)";
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ATOMIC];
        case "HUM":
            return ["scd30_read(2)", Blockly.Python.ORDER_ATOMIC];
    }
};

//SCD30 SENSOR FORCE RECALIBRATION
Blockly.Python.sensors_SCD30_forcedCalibration = function (block) {
    const co2ppm = Blockly.Python.valueToCode(block, "DEFAULT", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('esp32_scd30', IMPORT_ESP32_SCD30);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('scd30', "scd30 = SCD30(i2c=I2C(scl=Pin(22), sda=Pin(21)))");
    Blockly.Python.addFunction('scd30_calibrateSensor', FUNCTIONS_ESP32.DEF_SCD30_CALIBRATE);
    return "scd30_calibrateSensor(" + co2ppm + ")" + NEWLINE;
}
Blockly.Python.sensors_getMultichannelGas = function (block) {
    Blockly.Python.addImport('esp32_gas', IMPORT_ESP32_GAS);
    Blockly.Python.addInit('multichannel_gas', "multichannel = GAS(i2c=I2C(scl=Pin(22), sda=Pin(21)))");
    return ["multichannel.calc_gas(multichannel." + block.getFieldValue("GAS") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getMultichannelGasV2 = function (block) {
    Blockly.Python.addImport('esp32_gas_gmxxx', IMPORT_ESP32_GAS_GMXXX);
    Blockly.Python.addInit('esp32_gas_gmxxx', "multichannel_v2 = GAS_GMXXX(0x08)");
    return ["multichannel_v2.calcVol(multichannel_v2.measure_" + block.getFieldValue("GAS") + "())", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getAirQualityValue = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Air Quality Sensor');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getParticulateMatter = function (block) {
    Blockly.Python.addImport('hm330x', IMPORT_ESP32_HM330X);
    Blockly.Python.addInit('hm330x', "hm330x = HM330X(i2c=I2C(scl=Pin(22), sda=Pin(21)))");
    return ["hm330x.getData(" + block.getFieldValue("TYPE") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_DHT11ReadData = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinNumber = pin.replace('p', '');
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DHT11 Sensor');
    Blockly.Python.addImport('dht', IMPORT_DHT);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('dht11_' + pinNumber, "dht11_" + pinNumber + " = dht.DHT11(" + pinName + ")");
    Blockly.Python.addFunction('dht_getMeasure', FUNCTIONS_ESP32.DEF_DHT_GET_MEASURE);
    switch (block.getFieldValue('DATA')) {
        case 'TEMP':
            const unit = block.getFieldValue("UNIT") || "celsius";
            return ["dht_getMeasure(dht11_" + pinNumber + ", 't', unit='" + unit.toLowerCase() + "')", Blockly.Python.ORDER_ATOMIC];
        case 'HUM':
            return ["dht_getMeasure(dht11_" + pinNumber + ", 'h')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_DHT22ReadData = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinNumber = pin.replace('p', '');
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DHT22 Sensor');
    Blockly.Python.addImport('dht', IMPORT_DHT);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('dht22_' + pinNumber, "dht22_" + pinNumber + " = dht.DHT22(" + pinName + ")");
    Blockly.Python.addFunction('dht_getMeasure', FUNCTIONS_ESP32.DEF_DHT_GET_MEASURE);
    switch (block.getFieldValue('DATA')) {
        case 'TEMP':
            const unit = block.getFieldValue("UNIT") || "celsius";
            return ["dht_getMeasure(dht22_" + pinNumber + ", 't', unit='" + unit.toLowerCase() + "')", Blockly.Python.ORDER_ATOMIC];
        case 'HUM':
            return ["dht_getMeasure(dht22_" + pinNumber + ", 'h')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_TH02readData = function (block) {
    Blockly.Python.addImport('esp32_th02', IMPORT_ESP32_TH02);
    Blockly.Python.addInit('th02', 'th02 = TH02(i2c=I2C(scl=Pin(22), sda=Pin(21)))');
    let data = block.getFieldValue("DATA");
    switch (data) {
        case "TEMP":
            var code = "th02.get_temperature()";
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ATOMIC];
        case "HUM":
            return ["th02.get_humidity()", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for th02 sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_getGroveMoisture = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Moisture Sensor');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTemperature = function (block) {
    Blockly.Python.addImport('math', IMPORT_MATH);
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Temperature Sensor');
    Blockly.Python.addFunction('getGroveTemperature', FUNCTIONS_ESP32.DEF_GROVE_GET_TEMP);
    let code;
    switch (block.getFieldValue("UNIT")) {
        case "CELSIUS":
            code = "getGroveTemperature(" + pinName + ")";
            break;
        case "FAHRENHEIT":
            code = "getGroveTemperature(" + pinName + ", unit='fahrenheit')";
            break;
        case "KELVIN":
            code = "getGroveTemperature(" + pinName + ", unit='kelvin')";
            break;
    }
    return [code, Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.sensors_getGroveHighTemperature = function (block) {
    const pinA0Name = Blockly.Python.Generators.analog_read(block.getFieldValue("A0"), 'High Temperature thmc');
    const pinA1Name = Blockly.Python.Generators.analog_read(block.getFieldValue("A1"), 'High Temperature room');
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addConstant('thmc_table', FUNCTIONS_ESP32.DEF_GROVE_HIGHTEMP_THMC_TABLE);
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_ESP32.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('K_VtoT', FUNCTIONS_ESP32.DEF_GROVE_HIGHTEMP_KVTOT);
    Blockly.Python.addFunction('getRoomTemp', FUNCTIONS_ESP32.DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP);
    Blockly.Python.addFunction('getThmcTemp', FUNCTIONS_ESP32.DEF_GROVE_HIGHTEMP_GET_THMC_TEMP);
    Blockly.Python.addPowerOn('highTemp_tempRoom_' + pinA0Name, "tempRoom_" + pinA0Name + " = getRoomTemp(" + pinA1Name + ")");
    let code = "getThmcTemp(" + pinA0Name + ", tempRoom_" + pinA0Name + ")";
    switch (block.getFieldValue("UNIT")) {
        case "FAHRENHEIT":
            code += "*9/5 + 32";
            break;
        case "KELVIN":
            code += " + 273.15";
            break;
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_SHT31readData = function (block) {
    Blockly.Python.addImport('esp32_sht31', IMPORT_ESP32_SHT31);
    Blockly.Python.addInit('sht31', 'sht31 = SHT31(i2c=I2C(scl=Pin(22), sda=Pin(21)))');
    const data = block.getFieldValue("DATA");
    switch (data) {
        case "TEMP":
            let code;
            code = "sht31.get_temp_humi()[0]";
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        code += "*9/5 + 32";
                        break;
                    case "KELVIN":
                        code += " + 273.15";
                        break;
                }
            }
            return [code, Blockly.Python.ORDER_ATOMIC];
        case "HUM":
            return ["sht31.get_temp_humi()[1]", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for sht31 sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_SHT35readData = function (block) {
    Blockly.Python.addImport('esp32_sht35', IMPORT_ESP32_SHT35);
    Blockly.Python.addInit('sht35', 'sht35 = SHT35(i2c=I2C(scl=Pin(22), sda=Pin(21)))');
    const data = block.getFieldValue("DATA");
    switch (data) {
        case "TEMP":
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        return ["sht35.get_measurement('temp_fahrenheit')", Blockly.Python.ORDER_ATOMIC];
                    case "KELVIN":
                        return ["sht35.get_measurement('temp_celsius') + 273.15", Blockly.Python.ORDER_ATOMIC];
                    default:
                        return ["sht35.get_measurement('temp_celsius')", Blockly.Python.ORDER_ATOMIC];
                }
            }
        case "HUM":
            return ["sht35.get_measurement('humidity')", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for sht35 sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_DS18B20_getTemperature = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DS18X20 Sensor');
    const objName = 'ds18b20_' + pinName;
    Blockly.Python.addImport('esp32_ds18b20', IMPORT_ESP32_DS18B20);
    Blockly.Python.addImport('onewire', IMPORT_ONEWIRE);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('ds18b20_measure', FUNCTIONS_ESP32.DEF_DS18B20_MEASURE);
    Blockly.Python.addInit(objName, objName + " = DS18X20(onewire.OneWire(" + pinName + "))");
    const objRoms = objName + '_roms';
    Blockly.Python.addPowerOn(objRoms, objRoms + " = " + objName + ".scan()");
    Blockly.Python.addPowerOn(objName + '_print', "print('[DS18B20_INFO - " + pin + "]: roms = ' + str(" + objRoms + "))");
    let code = "ds18b20_measure(" + objName + ", " + objRoms + ")";
    if (block.getInput("TEMP_UNIT")) {
        switch (block.getFieldValue("UNIT")) {
            case "FAHRENHEIT":
                code += "*9/5 + 32";
                break;
            case "KELVIN":
                code += " + 273.15";
                break;
        }
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveWaterAmount = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Water Sensor');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getRainGauge = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Rain Sensor');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getAnemometer = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Anemometer');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_barometerReadData = function (block) {
    Blockly.Python.addImport('esp32_hp206c', IMPORT_ESP32_HP206C);
    Blockly.Python.addInit('hp206c', 'hp206c = HP206C(i2c=I2C(scl=Pin(22), sda=Pin(21)))');
    const data = block.getFieldValue("DATA");
    switch (data) {
        case "TEMP":
            if (block.getInput("TEMP_UNIT")) {
                switch (block.getFieldValue("UNIT")) {
                    case "FAHRENHEIT":
                        return ["hp206c.get_measurement('temp_fahrenheit')", Blockly.Python.ORDER_ATOMIC];
                    case "KELVIN":
                        return ["hp206c.get_measurement('temp_celsius') + 273.15", Blockly.Python.ORDER_ATOMIC];
                    default:
                        return ["hp206c.get_measurement('temp_celsius')", Blockly.Python.ORDER_ATOMIC];
                }
            }
        case "PRESS":
            return ["hp206c.get_measurement('pressure')", Blockly.Python.ORDER_ATOMIC];
        case "ALT":
            return ["hp206c.get_measurement('altitude')", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for sht35 sensor :'" + data + "'")
    }
};

// Sound & Light sensors

Blockly.Python.sensors_getGroveLight = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Light Sensor');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getSi1145Light = function (block) {
    Blockly.Python.addImport('esp32_si1145', IMPORT_ESP32_SI1145);
    Blockly.Python.addInit('si1145', "si1145 = SI1145(i2c=I2C(scl=Pin(22), sda=Pin(21)))");
    switch (block.getFieldValue("LIGHT")) {
        case "UV":
            return ["si1145.read_uv()", Blockly.Python.ORDER_ATOMIC];
        case "VIS":
            return ["si1145.read_visible()", Blockly.Python.ORDER_ATOMIC];
        case "IR":
            return ["si1145.read_ir()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getUVindex = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'UV Sensor');
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction("getUVindex", FUNCTIONS_ESP32.DEF_GROVE_GET_UV_INDEX);
    return ["getUVindex(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_colorSensor_getData = function (block) {
    Blockly.Python.addImport('color_sensor', IMPORT_ESP32_COLOR_SENSOR);
    Blockly.Python.addInit('color_sensor', "colorSensor = TCS34725(i2c=I2C(scl=Pin(22), sda=Pin(21)))");
    return ["colorSensor.html_rgb()[" + block.getFieldValue("DATA") + "]", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveSound = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Sound Sensor');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

// Distance & Movement sensors

Blockly.Python.sensors_getGroveUltrasonicRanger = function (block) {
    let data = "";
    switch (block.getFieldValue("DATA")) {
        case "DIST":
            data = "distance";
            break;
        case "TIME":
            data = "duration";
            break;
    }
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    switch (block.getFieldValue("SENSOR")) {
        case "GROVE":
            const pin = block.getFieldValue("PIN");
            Blockly.Python.addFunction('grove_getUltrasonicData', FUNCTIONS_ESP32.DEF_GROVE_ULTRASONIC);
            Blockly.Python.addInit('ultrasonic_grove_' + pin.replace('p', ''), '# Ultrasonic on ' + pin);
            return ["grove_getUltrasonicData(" + pin.replace('p', '') + ", data='" + data + "')", Blockly.Python.ORDER_ATOMIC];
        case "HC-SR04":
            const pinTRIG = block.getFieldValue("TRIG");
            const pinECHO = block.getFieldValue("ECHO");
            const pinName_TRIG = Blockly.Python.Generators.digital_write(pinTRIG, 'Ultrasonic TRIG');
            const pinName_ECHO = Blockly.Python.Generators.digital_read(pinECHO, 'Ultrasonic ECHO');
            Blockly.Python.addFunction('hcsr04_getUltrasonicData', FUNCTIONS_ESP32.DEF_HCSR04_ULTRASONIC);
            return ["hcsr04_getUltrasonicData(" + pinName_TRIG + ", " + pinName_ECHO + ", data='" + data + "')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getGroveLineFinder = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Line Finder');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveMotion = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Motion Sensor');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getPiezoVibration = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Vibration Sensor');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTilt = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Tilt Sensor');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_gy521_getData = function (block) {
    Blockly.Python.addImport('esp32_mpu6050', IMPORT_ESP32_MPU6050);
    Blockly.Python.addInit('mpu6050', "mpu = MPU6050()");
    const value = block.getFieldValue("AXIS") == null ? block.getFieldValue("UNIT") : block.getFieldValue("AXIS");
    switch (block.getFieldValue("DATA")) {
        case 'ACC':
            return [`mpu.read_accel_data()['${value}']`, Blockly.Python.ORDER_ATOMIC];
        case 'GYR':
            return [`mpu.read_gyro_data()['${value}']`, Blockly.Python.ORDER_ATOMIC];
        case 'TEMP':
            switch (value) {
                case 'CELSIUS':
                    return [`mpu.read_temperature()`, Blockly.Python.ORDER_ATOMIC];
                case 'FAHRENHEIT':
                    return [`(mpu.read_temperature() * 9/5) + 32`, Blockly.Python.ORDER_ATOMIC];
                case 'KELVIN':
                    return [`mpu.read_temperature() + 273,15`, Blockly.Python.ORDER_ATOMIC];
            }
    }
};

// Other sensors

Blockly.Python.sensors_getFsr402Force = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Force Sensor');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getVoltageDividerData = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Voltage Divider');
    return ["round(" + pinName + ".read(), 1)", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getEmgDetector = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'EMG Detector');
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getDissolvedOxygenProbe = function (block) {
    Blockly.Python.addImport('esp32-dissolved-oxygen-probe', IMPORT_ESP32_DISSOLVED_OXYGEN_PROBE);
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"));
    Blockly.Python.addPowerOn('dissolved-oxygen-probe', `probe = DISSOLVED_OXYGEN_PROBE(${pinName})`);
    return ["probe.getValue()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getWaterLevel = function () {
    Blockly.Python.addImport('water-level-sensor', IMPORT_WATER_LEVEL_SENSOR);
    return ["waterLevelSensor.check_water_level()", Blockly.Python.ORDER_ATOMIC];
};