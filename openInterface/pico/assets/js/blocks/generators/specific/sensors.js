/**
 * @fileoverview Sensors generators for Raspberry Pi Pico.
 */

// Gas sensors

Blockly.Python.sensors_getSgp30Gas = function (block) {
    Blockly.Python.addImport('esp32_sgp30', IMPORT_ESP32_SGP30);
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('sgp30', "sgp30 = SGP30(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + ")))");
    switch (block.getFieldValue("GAS")) {
        case "CO2":
            return ["sgp30.co2_equivalent()", Blockly.Python.ORDER_ATOMIC];
        case "TVOC":
            return ["sgp30.total_organic_compound()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getMultichannelGas = function (block) {
    Blockly.Python.addImport('esp32_gas', IMPORT_ESP32_GAS);
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('multichannel_gas', "multichannel = GAS(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + ")))");
    return ["multichannel.calc_gas(multichannel." + block.getFieldValue("GAS") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getMultichannelGasV2 = function (block) {
    Blockly.Python.addImport('esp32_gas_gmxxx', IMPORT_ESP32_GAS_GMXXX);
    Blockly.Python.addInit('esp32_gas_gmxxx', "multichannel_v2 = GAS_GMXXX(0x08)");
    return ["multichannel_v2.calcVol(multichannel_v2.measure_" + block.getFieldValue("GAS") + "())", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getO2gas = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Dioxygen Sensor');
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_PICO.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('readO2', FUNCTIONS_PICO.DEF_O2SENSOR_READ);
    return ["readO2(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

// SCD30 SENSOR _ READ CO2/TEMP/HUM BLOCK
Blockly.Python.sensors_SCD30_readData = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('esp32_scd30', IMPORT_ESP32_SCD30);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addInit('scd30_data', "scd30_data = [0, 0, 0]");
    Blockly.Python.addInit('t_scd', "t_scd = utime.ticks_ms()");
    Blockly.Python.addFunction('scd30_read', FUNCTIONS_PICO.DEF_SCD30_READ);
    Blockly.Python.addInit('scd30', "scd30 = SCD30(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + ")))");
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
    const pin = block.getFieldValue("PIN");
    const co2ppm = Blockly.Python.valueToCode(block, "DEFAULT", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('esp32_scd30', IMPORT_ESP32_SCD30);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('scd30', "scd30 = SCD30(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + ")))");
    Blockly.Python.addFunction('scd30_calibrateSensor', FUNCTIONS_PICO.DEF_SCD30_CALIBRATE);
    return "scd30_calibrateSensor(" + co2ppm + ")";
};

Blockly.Python.sensors_getAirQualityValue = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Air Quality Sensor');
    return [pinName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getParticulateMatter = function (block) {
    Blockly.Python.addImport('hm330x', IMPORT_ESP32_HM330X);
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('hm330x', "hm330x = HM330X(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + ")))");
    return ["hm330x.getData(" + block.getFieldValue("TYPE") + ")", Blockly.Python.ORDER_ATOMIC];
};

// Climate sensors

Blockly.Python.sensors_getBmp280Data = function (block) {
    const addr = block.getFieldValue("ADDR");
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('bmp280', IMPORT_ESP32_BMP280);
    Blockly.Python.addInit('bmp280', "bmp280 = BMP280(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + "), addr=" + addr + "))");
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

Blockly.Python.sensors_getGroveMoisture = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Moisture Sensor');
    return [pinName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTemperature = function (block) {
    Blockly.Python.addImport('math', IMPORT_MATH);
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Temperature Sensor');
    Blockly.Python.addFunction('getGroveTemperature', FUNCTIONS_PICO.DEF_GROVE_GET_TEMP);
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
    Blockly.Python.addConstant('thmc_table', FUNCTIONS_PICO.DEF_GROVE_HIGHTEMP_THMC_TABLE);
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_PICO.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('K_VtoT', FUNCTIONS_PICO.DEF_GROVE_HIGHTEMP_KVTOT);
    Blockly.Python.addFunction('getRoomTemp', FUNCTIONS_PICO.DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP);
    Blockly.Python.addFunction('getThmcTemp', FUNCTIONS_PICO.DEF_GROVE_HIGHTEMP_GET_THMC_TEMP);
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

Blockly.Python.sensors_DHT11ReadData = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinNumber = pin.replace('p', '');
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DHT11 Sensor');
    Blockly.Python.addImport('dht', IMPORT_DHT);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('dht11_' + pinNumber, "dht11_" + pinNumber + " = dht.DHT11(" + pinName + ")");
    Blockly.Python.addFunction('dht_getMeasure', FUNCTIONS_PICO.DEF_DHT_GET_MEASURE);
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
    Blockly.Python.addFunction('dht_getMeasure', FUNCTIONS_PICO.DEF_DHT_GET_MEASURE);
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
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('th02', "th02 = TH02(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + ")))");
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

Blockly.Python.sensors_SHT31readData = function (block) {
    let data = block.getFieldValue("DATA");
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('esp32_sht31', IMPORT_ESP32_SHT31);
    Blockly.Python.addInit('sht31', "sht31 = SHT31(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + ")))");
    switch (data) {
        case "TEMP":
            var code;
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

Blockly.Python.sensors_DS18B20_getTemperature = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DS18X20 Sensor');
    const objName = 'ds18b20_' + pinName;
    Blockly.Python.addImport('esp32_ds18b20', IMPORT_ESP32_DS18B20);
    Blockly.Python.addImport('onewire', IMPORT_ONEWIRE);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('ds18b20_measure', FUNCTIONS_PICO.DEF_DS18B20_MEASURE);
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
    return [pinName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getRainGauge = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Rain Sensor');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getAnemometer = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Anemometer');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

// Sound & Light sensors

Blockly.Python.sensors_getGroveLight = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Light Sensor');
    return [pinName + ".read_u16()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getSi1145Light = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('esp32_si1145', IMPORT_ESP32_SI1145);
    Blockly.Python.addInit('si1145', "si1145 = SI1145(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + ")))");
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
    Blockly.Python.addFunction("getUVindex", FUNCTIONS_PICO.DEF_GROVE_GET_UV_INDEX);
    return ["getUVindex(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_colorSensor_getData = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('color_sensor', IMPORT_ESP32_COLOR_SENSOR);
    Blockly.Python.addInit('color_sensor', "colorSensor = TCS34725(i2c=I2C(0, scl=Pin(" + JSON.parse(pin).scl + "), sda=Pin(" + JSON.parse(pin).sda + ")))");
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
            Blockly.Python.addFunction('grove_getUltrasonicData', FUNCTIONS_PICO.DEF_GROVE_ULTRASONIC);
            Blockly.Python.addInit('ultrasonic_grove_' + pin.match(/\d+/g)[0], '# Ultrasonic on p' + pin.match(/\d+/g)[0]);
            return ["grove_getUltrasonicData(" + pin.match(/\d+/g)[0] + ", data='" + data + "')", Blockly.Python.ORDER_ATOMIC];
        case "HC-SR04":
            const pinTRIG = block.getFieldValue("TRIG");
            const pinECHO = block.getFieldValue("ECHO");
            const pinName_TRIG = Blockly.Python.Generators.digital_write(pinTRIG, 'Ultrasonic TRIG');
            const pinName_ECHO = Blockly.Python.Generators.digital_read(pinECHO, 'Ultrasonic ECHO');
            Blockly.Python.addFunction('hcsr04_getUltrasonicData', FUNCTIONS_PICO.DEF_HCSR04_ULTRASONIC);
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