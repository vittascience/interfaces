/**
 * @fileoverview Sensors generators for Arduino.
 */

// SGP30 SENSOR _ CO2/TVOC BLOCK
Blockly.Arduino.sensors_getSgp30Gas = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('sgp30', INCLUDE_ADAFRUIT_SGP30);
    Blockly.Arduino.addDeclaration('sgp30', "Adafruit_SGP30 sgp30;");
    Blockly.Arduino.addSetup('sgp30', FUNCTIONS_ARDUINO.SETUP_SGP30_CHECK);
    switch (block.getFieldValue("GAS")) {
        case "CO2":
            Blockly.Arduino.addFunction('sgp30_readCO2', FUNCTIONS_ARDUINO.DEF_SGP30_GET_CO2);
            return ['sgp30_readCO2()', Blockly.Arduino.ORDER_ATOMIC];
        case "TVOC":
            Blockly.Arduino.addFunction('sgp30_readTVOC', FUNCTIONS_ARDUINO.DEF_SGP30_GET_TVOC);
            return ['sgp30_readTVOC()', Blockly.Arduino.ORDER_ATOMIC];
    }
};

// MULTICHANNEL GAS SENSOR _ READ GAS BLOCK
Blockly.Arduino.sensors_getMultichannelGas = function (block) {
    Blockly.Arduino.addInclude('multichannel_gas', INCLUDE_MULTICHANNEL_GAS_SENSOR);
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('multichannel_gas', "#define MULTICHANNEL_I2C_ADDR   0x04");
    Blockly.Arduino.addSetup('multichannel_gas_begin', "gas.begin(MULTICHANNEL_I2C_ADDR);");
    Blockly.Arduino.addSetup('multichannel_gas_power', "gas.powerOn();");
    return ["gas.measure_" + block.getFieldValue("GAS") + "()", Blockly.Arduino.ORDER_ATOMIC];
};

// MULTICHANNEL GAS SENSOR _ READ GAS BLOCK
Blockly.Arduino.sensors_getMultichannelGasV2 = function (block) {
    Blockly.Arduino.addInclude('multichannel_gas_v2', INCLUDE_MULTICHANNEL_GAS_GMXXX);
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('multichannel_gas_v2', "#define MULTICHANNEL_I2C_ADDR_V2   0x08");
    Blockly.Arduino.addDeclaration('multichannel_gas_v2', "GAS_GMXXX<TwoWire> multichannel_v2;");
    Blockly.Arduino.addSetup('multichannel_gas_begin', "multichannel_v2.begin(Wire, MULTICHANNEL_I2C_ADDR_V2);");
    switch (block.getFieldValue("GAS")) {
        case "CO":
            return ["multichannel_v2.getGM702B()", Blockly.Arduino.ORDER_ATOMIC];
        case "NO2":
            return ["multichannel_v2.getGM102B()", Blockly.Arduino.ORDER_ATOMIC];
        case "C2H5OH":
            return ["multichannel_v2.getGM302B()", Blockly.Arduino.ORDER_ATOMIC];
        case "VOC":
            return ["multichannel_v2.getGM502B()", Blockly.Arduino.ORDER_ATOMIC];
    }
};

// O2 GAS SENSOR _ READ O2 BLOCK
Blockly.Arduino.sensors_getO2gas = function (block) {
    const pinConstant = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Dioxygen Sensor");
    Blockly.Arduino.addDeclaration('dioxygen', FUNCTIONS_ARDUINO.DECLARE_O2_GAS);
    Blockly.Arduino.addFunction("o2Sensor_readData", FUNCTIONS_ARDUINO.DEF_O2_SENSOR_GET_DATA);
    return ["o2Sensor_readData(" + pinConstant + ", " + block.getFieldValue("DATA") + ")", Blockly.Arduino.ORDER_ATOMIC];
};

// SCD30 SENSOR _ READ CO2/TEMP/HUM BLOCK
Blockly.Arduino.sensors_SCD30_readData = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('scd30', INCLUDE_SCD30);
    Blockly.Arduino.addCodeVariable('t_scd', "float t_scd;");
    Blockly.Arduino.addCodeVariable('scd30_co2', "float scd30_co2 = 0;");
    Blockly.Arduino.addCodeVariable('scd30_t', "float scd30_t = 0;");
    Blockly.Arduino.addCodeVariable('scd30_h', "float scd30_h = 0;");
    Blockly.Arduino.addFunction('scd30_read', FUNCTIONS_ARDUINO.DEF_SCD30_READ);
    Blockly.Arduino.addSetup('setup_wire', "Wire.begin();");
    Blockly.Arduino.addSetup('scd30', "scd30.initialize();");
    Blockly.Arduino.addSetup('t_scd', "t_scd = millis();");
    switch (block.getFieldValue("DATA")) {
        case "CO2":
            return ["scd30_read(0)", Blockly.Arduino.ORDER_ATOMIC];
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
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        case "HUM":
            return ["scd30_read(2)", Blockly.Arduino.ORDER_ATOMIC];
    }
};

// SCD30 SENSOR _ CALIBRATION BLOCK
Blockly.Arduino.sensors_SCD30_forcedCalibration = function (block) {
    const co2ppm = Blockly.Arduino.valueToCode(block, "DEFAULT", Blockly.Arduino.ORDER_ATOMIC) || "0";
    Blockly.Arduino.Generators.setupSerialConnection();
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('scd30', INCLUDE_SCD30);
    Blockly.Arduino.addFunction('scd30_calibrateSensor', FUNCTIONS_ARDUINO.DEF_SCD30_CALIBRATE);
    Blockly.Arduino.addSetup('setup_wire', "Wire.begin();");
    Blockly.Arduino.addSetup('scd30', "scd30.initialize();");
    return "scd30_calibrateSensor(" + co2ppm + ");" + NEWLINE;
};

// MQ135 SENSOR _ CO2 BLOCK
Blockly.Arduino.sensors_getMq135gas = function (block) {
    const pinConstant = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "MQ135");
    const ctes = "#define ATM_CO2_CALIBRATOR" + TAB + "412 //ppm" + NEWLINE + "#define RESISTANCE_ZERO  1352 //kOhm";
    Blockly.Arduino.addDefine('mq135', ctes);
    switch (block.getFieldValue("DATA")) {
        case "CO2":
            Blockly.Arduino.addFunction("mq135_readCO2", FUNCTIONS_ARDUINO.DEF_MQ135_GET_CONCENTRATION);
            return ["mq135_readCO2(" + pinConstant + ")", Blockly.Arduino.ORDER_ATOMIC]
        case "R0":
            Blockly.Arduino.addFunction("mq135_sensorResistance", FUNCTIONS_ARDUINO.DEF_MQ135_GET_RZERO_CALIBRATOR);
            return ["mq135_getResistance(" + pinConstant + ")", Blockly.Arduino.ORDER_ATOMIC]
    }
};

// AIR QUALITY SENSOR _ READ AIR QUALITY VALUE
Blockly.Arduino.sensors_getAirQualityValue = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const pin = block.getFieldValue("PIN");
    const pinConstant = Blockly.Arduino.Generators.analog_read(pin, "Air Quality Sensor");
    const objName = 'airQuality_' + pin;
    Blockly.Arduino.addInclude('air_quality', INCLUDE_AIR_QUALITY_SENSOR);
    Blockly.Arduino.addDeclaration(objName, "AirQualitySensor " + objName + "(" + pinConstant + ");");
    Blockly.Arduino.addFunction('airQuality_setup', FUNCTIONS_ARDUINO.DEF_AIR_QUALITY_SETUP);
    Blockly.Arduino.addSetup(objName, "airQuality_setup(&" + objName + ", " + pinConstant + ");");
    return [objName + ".getValue()", Blockly.Arduino.ORDER_ATOMIC];
};

// AIR QUALITY SENSOR _ ON AIR QUALITY INDEX (0 to 3) ... DO
Blockly.Arduino.sensors_onAirQualityIndexAs = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const pin = block.getFieldValue("PIN");
    const pinConstant = Blockly.Arduino.Generators.analog_read(pin, "Air Quality Sensor");
    const objName = 'airQuality_' + pin;
    Blockly.Arduino.addInclude('air_quality', INCLUDE_AIR_QUALITY_SENSOR);
    Blockly.Arduino.addDeclaration(objName, "AirQualitySensor " + objName + "(" + pinConstant + ");");
    Blockly.Arduino.addFunction('airQuality_setup', FUNCTIONS_ARDUINO.DEF_AIR_QUALITY_SETUP);
    Blockly.Arduino.addSetup(objName, "airQuality_setup(&" + objName + ", " + pinConstant + ");");
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    return "if (airQuality_" + pin + ".slope() == AirQualitySensor::" + block.getFieldValue("INDEX") + ") {" + NEWLINE + branchCode + "}" + NEWLINE;
};

// DUST SENSOR _ READ CONCENTRATION BLOCK
Blockly.Arduino.sensors_getDustConcentration = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const pin = block.getFieldValue("PIN");
    const pinConstant = Blockly.Arduino.Generators.pulseIn(pin, "Dust Sensor");
    Blockly.Arduino.addDefine('sampletime', "#define SAMPLETIME_MS   30000 //ms");
    Blockly.Arduino.addCodeVariable('t_dust', "float t_dust = 0;");
    Blockly.Arduino.addFunction('dustSensor_readParticulate', FUNCTIONS_ARDUINO.DEF_DUST_GET_PARTICULATE_DATA);
    block.workspace.createVariable('t_dust');
    Blockly.Arduino.addSetup('t_dust', "t_dust = millis();");
    return ["dustSensor_readParticulate(" + pinConstant + ", " + block.getFieldValue("DATA") + ")", Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE LASER SENSOR (HM3301) - GET PARTICLE AMOUNT
// http://wiki.seeedstudio.com/Grove-Laser_PM2.5_Sensor-HM3301/
Blockly.Arduino.sensors_getParticulateMatter = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('hm330x', INCLUDE_SEEED_HM330X);
    Blockly.Arduino.addDeclaration('hm330x', "HM330X hm330x;");
    Blockly.Arduino.addCodeVariable('buf', "uint8_t buf[30];");
    Blockly.Arduino.addCodeVariable('measure', "uint16_t measure;");
    Blockly.Arduino.addFunction('hm330x_parse_result', FUNCTIONS_ARDUINO.DEF_HM330X_PARSE_RESULT);
    Blockly.Arduino.addFunction('hm330x_measure', FUNCTIONS_ARDUINO.DEF_HM330X_GET_MEASURE);
    Blockly.Arduino.addSetup('hm330x', FUNCTIONS_ARDUINO.SETUP_HM330X_CHECK);
    return ["hm330x_measure(" + block.getFieldValue("TYPE") + ")", Blockly.Arduino.ORDER_ATOMIC];
};

// MHZ19 SENSOR _ GET CO2 AND TEMPERATURE BLOCK
Blockly.Arduino.sensors_getMhz19Data = function (block) {
    const pinTX = block.getFieldValue("TX");
    const pinRX = block.getFieldValue("RX");
    Blockly.Arduino.addInclude('software_serial', INCLUDE_SOFTWARE_SERIAL);
    Blockly.Arduino.addDeclaration('mhz19', "SoftwareSerial mhz19(" + pinTX + ", " + pinRX + ");" + NEWLINE + "const uint8_t cmd_get_mhz19[] = {0xff, 0x01, 0x86, 0x00, 0x00,0x00, 0x00, 0x00, 0x79};")
    Blockly.Arduino.addCodeVariable('mhz19', "int mhz19_temperature;" + NEWLINE + "int mhz19_CO2PPM;");
    Blockly.Arduino.addFunction('mhz19_dataReceived', FUNCTIONS_ARDUINO.DEF_MHZ19_DATARECEIVE);
    Blockly.Arduino.addSetup('mhz19', "mhz19.begin(9600);" + NEWLINE + "delay(2000);");
    switch (block.getFieldValue("DATA")) {
        case "CO2":
            Blockly.Arduino.addFunction('mhz19_readCO2', FUNCTIONS_ARDUINO.DEF_MHZ19_GETCO2);
            return ["mhz19_readCO2()", Blockly.Arduino.ORDER_ATOMIC];
        case "TEMP":
            Blockly.Arduino.addFunction('mhz19_readTemperature', FUNCTIONS_ARDUINO.DEF_MHZ19_GETTEMP);
            var code = "mhz19_readTemperature()";
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
            return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
};

// BMP280 SENSOR _ READ TEMPERATURE/RESSURE/ALTITUDE BLOCK
Blockly.Arduino.sensors_getBmp280Data = function (block) {
    const addr = block.getFieldValue("ADDR");
    Blockly.Arduino.Generators.setupSerialConnection();
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('bmp280', INCLUDE_ADAFRUIT_BMP280);
    Blockly.Arduino.addDefine('bmp280', "#define BMP280_I2C_ADDR" + TAB + addr);
    Blockly.Arduino.addDeclaration('bmp280', "Adafruit_BMP280 bmp280;");
    Blockly.Arduino.addCodeVariable('bmp280', "float h0;");
    Blockly.Arduino.addSetup('bmp280', FUNCTIONS_ARDUINO.SETUP_BMP280_CHECK);
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            var code = "bmp280.readTemperature()";
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
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        case "PRESS":
            return ['bmp280.readPressure()', Blockly.Arduino.ORDER_ATOMIC];
        case "ALT":
            Blockly.Arduino.addSetup('setup_bmp280_altitude', "delay(500);" + NEWLINE + "h0 = bmp280.readAltitude(1013.25);");
            return ['bmp280.readAltitude()-h0', Blockly.Arduino.ORDER_ATOMIC];
    }
};

// DPS310 SENSOR _ READ TEMPERATURE/RESSURE BLOCK
Blockly.Arduino.sensors_getDps310Data = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    Blockly.Arduino.addInclude('spi', INCLUDE_SPI);
    Blockly.Arduino.addInclude('dps310', INCLUDE_DPS310);
    Blockly.Arduino.addDeclaration('dps310', "Dps310 Dps310PressureSensor = Dps310();");
    Blockly.Arduino.addFunction('dps310_setup', FUNCTIONS_ARDUINO.DEF_GROVE_DPS310_SETUP);
    Blockly.Arduino.addFunction('dps310_readData', FUNCTIONS_ARDUINO.DEF_GROVE_DPS310_GETDATA);
    Blockly.Arduino.addSetup('dps310', "while(!dps310_setup()) {}");
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            var code = "dps310_readData(32, 0)";
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
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        case "PRESS":
            return ['dps310_readData(32, 1)', Blockly.Arduino.ORDER_ATOMIC];
        default:
            throw Error("sensors_getDps310Data: option '" + block.getFieldValue("DATA") + "' is not an option");
    }
};

// GROVE MOISTURE SENSOR _ READ VALUE BLOCK ON PIN A BLOCK
// http://wiki.seeedstudio.com/Grove-Moisture_Sensor/
Blockly.Arduino.sensors_getGroveMoisture = function (block) {
    const pinConstant = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Moisture Sensor");
    return ["getAnalogMean(" + pinConstant + ", 5)", Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE TEMPERATURE SENSOR _ READ VALUE BLOCK ON PIN A BLOCK
// http://wiki.seeedstudio.com/Grove-Temperature_Sensor/
Blockly.Arduino.sensors_getGroveTemperature = function (block) {
    const pinConstant = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Temperature Sensor");
    Blockly.Arduino.addFunction('getGroveTemperature', FUNCTIONS_ARDUINO.DEF_GROVE_GET_TEMP);
    let code;
    switch (block.getFieldValue("UNIT")) {
        case "FAHRENHEIT":
            code = "getGroveTemperature(" + pinConstant + ", 1)";
            break;
        case "KELVIN":
            code = "getGroveTemperature(" + pinConstant + ", 2)";
            break;
        default:
            code = "getGroveTemperature(" + pinConstant + ", 0)";
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};

// GROVE TEMPERATURE SENSOR _ READ HIGH TEMPERATURE 
// http://wiki.seeedstudio.com/Grove-High_Temperature_Sensor/
Blockly.Arduino.sensors_getGroveHighTemperature = function (block) {
    const pinA0 = block.getFieldValue("A0");
    const pinA1 = block.getFieldValue("A1");
    const pinConstantA0 = Blockly.Arduino.Generators.analog_read(pinA0, "High Temperature thmc", false);
    const pinConstantA1 = Blockly.Arduino.Generators.analog_read(pinA1, "High Temperature room", false);
    const objName = "ht_" + pinA0;
    Blockly.Arduino.addInclude('high_temp', INCLUDE_HIGH_TEMP);
    Blockly.Arduino.addDeclaration('high_temp_' + pinA0, "HighTemp " + objName + "(" + pinConstantA1 + ", " + pinConstantA0 + ");");
    Blockly.Arduino.addSetup(objName, objName + ".begin();");
    let code = objName + ".getThmc()";
    switch (block.getFieldValue("UNIT")) {
        case "FAHRENHEIT":
            code += "*9/5 + 32";
            break;
        case "KELVIN":
            code += " + 273.15";
            break;
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};

// DHT 11/22 SENSOR _ READ HUMIDITY BLOCK
Blockly.Arduino.sensors_dhtReadData = function (block) {
    const pin = block.getFieldValue("PIN");
    const sensor = block.getFieldValue("SENSOR");
    const pinConstant = Blockly.Arduino.Generators.digital_read(pin, "DHT" + sensor + " Sensor");
    const objName = "dht" + sensor + "_" + pin;
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('dht', INCLUDE_DHT);
    Blockly.Arduino.addSetup(objName, objName + ".begin();");
    switch (sensor) {
        case "11":
            Blockly.Arduino.addDeclaration(objName, "DHT " + objName + "(" + pinConstant + ", DHT11);");
            break;
        case "22":
            Blockly.Arduino.addDeclaration(objName, "DHT " + objName + "(" + pinConstant + ", DHT22);");
            break;
    }
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            let code = objName + ".readTemperature()";
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
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        case "HUM":
            switch (sensor) {
                case "11":
                    return ["dht11_" + pin + ".readHumidity()", Blockly.Arduino.ORDER_ATOMIC];
                case "22":
                    return ["dht22_" + pin + ".readHumidity()", Blockly.Arduino.ORDER_ATOMIC];
            }

    }
};

// THO2 SENSOR _ READ TEMP/HUMIDITY BLOCK (I2C)
Blockly.Arduino.sensors_TH02readData = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('arduino', INCLUDE_ARDUINO);
    Blockly.Arduino.addInclude('th02_dev', INCLUDE_TH02_DEV);
    Blockly.Arduino.addSetup('th02', "TH02.begin();");
    let data = block.getFieldValue("DATA");
    switch (data) {
        case "TEMP":
            var code = "TH02.ReadTemperature()";
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
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        case "HUM":
            return ["TH02.ReadHumidity()", Blockly.Arduino.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for th02 sensor :'" + data + "'")
    }
};

// SHT31 SENSOR _ READ TEMP/HUMIDITY BLOCK (I2C)
Blockly.Arduino.sensors_SHT31readData = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('sht31', INCLUDE_SHT31);
    Blockly.Arduino.addDeclaration('sht31', "SHT31 sht31 = SHT31();");
    Blockly.Arduino.addSetup('sht31', "sht31.begin();");
    let data = block.getFieldValue("DATA");
    switch (data) {
        case "TEMP":
            var code = "sht31.getTemperature()";
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
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        case "HUM":
            return ["sht31.getHumidity()", Blockly.Arduino.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for sht31 sensor :'" + data + "'")
    }
};

// MPX5700AP SENSOR _ READ PRESSURE
//https://www.gotronic.fr/art-capteur-mpx5700ap-grove-110020248-30374.htm
Blockly.Arduino.sensors_mpx5700ap_getPressure = function (block) {
    Blockly.Arduino.addFunction('mpx5700_readPressure', FUNCTIONS_ARDUINO.DEF_MPX5700AP_GET_PRESSURE);
    return ["mpx5700_readPressure(" + block.getFieldValue("PIN") + ")", Blockly.Arduino.ORDER_ATOMIC]
};

// MAX6675 SENSOR _ READ TEMPERATURE BLOCK
Blockly.Arduino.sensors_getMax6675Temp = function (block) {
    var pinSO = block.getFieldValue("SO"),
        pinCS = block.getFieldValue("CS"),
        pinCLK = block.getFieldValue("CLK"),
        unit = block.getFieldValue("UNIT"),
        code;
    Blockly.Arduino.addInclude('max6675', INCLUDE_MAX6675);
    Blockly.Arduino.addDefine('max6675', "#define PIN_KTC_SO" + TAB + pinSO + NEWLINE + "#define PIN_KTC_CS" + TAB + pinCS + NEWLINE + "#define PIN_KTC_CLK" + TAB + pinCLK);
    Blockly.Arduino.addDeclaration('max6675', "MAX6675 ktc(PIN_KTC_CLK, PIN_KTC_CS, PIN_KTC_SO);");
    switch (unit) {
        case "CELSIUS":
            code = "ktc.readCelsius()";
            break;
        case "FAHRENHEIT":
            code = "ktc.readFahrenheit()";
            break;
        case "KELVIN":
            code = "ktc.readCelsius() + 273.15";
            break;
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};

// BME680 SENSOR _ READ TEMPERATURE/RESSURE/HUMIDITY/GAS BLOCK
Blockly.Arduino.sensors_getBme680Data = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('bme680', INCLUDE_SEEED_BME680);
    Blockly.Arduino.addDefine('bme680', "#define BME680_I2C_ADDR" + TAB + "uint8_t(0x76)");
    Blockly.Arduino.addDeclaration('bmp680', "Seeed_BME680 bme680(BME680_I2C_ADDR);");
    Blockly.Arduino.addFunction('bme680_measure', FUNCTIONS_ARDUINO.DEF_BME680_MEASURE);
    Blockly.Arduino.addSetup('bme680', "while (!bme680.init()) {" + NEWLINE + "  Serial.println(\"En attente du capteur BME680...\");" + NEWLINE + "  delay(1000);" + NEWLINE + "}");
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            Blockly.Arduino.addFunction('bme680_readTemperature', FUNCTIONS_ARDUINO.DEF_BME680_GET_TEMPERATURE);
            var code = "bme680_readTemperature()";
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
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        case "PRESS":
            Blockly.Arduino.addFunction('bme680_readPressure', FUNCTIONS_ARDUINO.DEF_BME680_GET_PRESSURE);
            return ["bme680_readPressure()", Blockly.Arduino.ORDER_ATOMIC];
        case "HUM":
            Blockly.Arduino.addFunction('bme680_readHumidity', FUNCTIONS_ARDUINO.DEF_BME680_GET_HUMIDITY);
            return ["bme680_readHumidity()", Blockly.Arduino.ORDER_ATOMIC];
        case "GAS":
            Blockly.Arduino.addFunction('bme680_readGas', FUNCTIONS_ARDUINO.DEF_BME680_GET_GAS);
            return ["bme680_readGas()", Blockly.Arduino.ORDER_ATOMIC];
    }
};

// GROVE ONE WIRE DS18B20 _ READ TEMPERATURE
Blockly.Arduino.sensors_ds18b20_getTemperature = function (block) {
    const pin = block.getFieldValue("PIN");
    let code = "ds18b20_readTemperature(&ds18b20_" + pin + ")";
    Blockly.Arduino.addInclude('one_wire', INCLUDE_ONE_WIRE);
    Blockly.Arduino.addDefine(pin, "#define PIN_DS18X20_SENSOR_" + pin + TAB + pin);
    Blockly.Arduino.addDeclaration('ds18b20_rcodes', FUNCTIONS_ARDUINO.DEF_DS18B20_ERRORS);
    Blockly.Arduino.addDeclaration('ds18b20_setup_' + pin, "OneWire ds18b20_" + pin + "(PIN_DS18X20_SENSOR_" + pin + ");");
    Blockly.Arduino.addFunction('ds18b20_measure', FUNCTIONS_ARDUINO.DEF_DS18B20_MEASURE);
    Blockly.Arduino.addFunction('ds18b20_readTemperature', FUNCTIONS_ARDUINO.DEF_DS18B20_GET_TEMPERATURE);
    switch (block.getFieldValue("UNIT")) {
        case "FAHRENHEIT":
            code += "*9/5 + 32";
            break;
        case "KELVIN":
            code += " + 273.15";
            break;
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE WATER SENSOR _ READ STATE
Blockly.Arduino.sensors_getGroveWaterAmount = function (block) {
    const pinConstant = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Water Sensor");
    return ["getAnalogMean(" + pinConstant + ", 5)", Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE WATER SENSOR I2C _ READ VALUE
Blockly.Arduino.sensors_getGroveWaterAmountI2C = function () {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addDefine('water_threshold', '#define WATER_THRESHOLD 100');
    Blockly.Arduino.addDefine('ATTINY1_HIGH_ADDR', '#define ATTINY1_HIGH_ADDR 0x78');
    Blockly.Arduino.addDefine('ATTINY2_LOW_ADDR', '#define ATTINY2_LOW_ADDR 0x77');
    Blockly.Arduino.addCodeVariable('water_low_data', 'uint8_t water_low_data[8] = {0};');
    Blockly.Arduino.addCodeVariable('water_high_data', 'uint8_t water_high_data[12] = {0};');
    Blockly.Arduino.addFunction('getHigh12SectionValue', FUNCTIONS_ARDUINO.DEF_WATER_GET_HIGH_12_VALUE);
    Blockly.Arduino.addFunction('getLow8SectionValue', FUNCTIONS_ARDUINO.DEF_WATER_GET_LOW_8_VALUE);
    Blockly.Arduino.addFunction('getWaterLevel', FUNCTIONS_ARDUINO.DEF_WATER_I2C_GET_LEVEL);
    Blockly.Arduino.addSetup('setup_wire', "Wire.begin();");
    return ["getWaterLevel()", Blockly.Arduino.ORDER_ATOMIC];
};

// READ RAIN GRLEX STATEMENT ON PIN D BLOCK
Blockly.Arduino.sensors_getRainGauge = function (block) {
    var pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('rain_gauge_module_' + pin, "#define PIN_RAIN_GAUGE_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_RAIN_GAUGE_' + pin + ', INPUT);');
    return ["digitalRead(PIN_RAIN_GAUGE_" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

// READ ANEMOMETER STATEMENT ON PIN D BLOCK
Blockly.Arduino.sensors_getAnemometer = function (block) {
    var pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('anemometer_module_' + pin, "#define PIN_ANEMOMETER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_ANEMOMETER_' + pin + ', INPUT);');
    return ["digitalRead(PIN_ANEMOMETER_" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

// GROVE LIGHT SENSOR _ READ VALUE ON PIN A BLOCK
Blockly.Arduino.sensors_getGroveLight = function (block) {
    const pinConstant = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Light Sensor");
    return ["getAnalogMean(" + pinConstant + ", 5)", Blockly.Arduino.ORDER_ATOMIC];
};

// SI1145 SENSOR _ READ LIGHT BLOCK
Blockly.Arduino.sensors_getSi1145Light = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('si1145', INCLUDE_ADAFRUIT_SI1145);
    Blockly.Arduino.addFunction('si1145_setup', FUNCTIONS_ARDUINO.DEF_SETUP_SI1145);
    Blockly.Arduino.addDeclaration('si1145', "Adafruit_SI1145 si1145 = Adafruit_SI1145();");
    Blockly.Arduino.addSetup('si1145', "si1145_setup();");
    switch (block.getFieldValue("LIGHT")) {
        case "UV":
            return ["si1145.readUV()", Blockly.Arduino.ORDER_ATOMIC];
        case "VIS":
            return ["si1145.readVisible()", Blockly.Arduino.ORDER_ATOMIC];
        case "IR":
            return ["si1145.readIR()", Blockly.Arduino.ORDER_ATOMIC];
    }
};

// GROVE UV SENSOR _ READ UV INDEX
//http://wiki.seeedstudio.com/Grove-UV_Sensor/
Blockly.Arduino.sensors_getUVindex = function (block) {
    const pinConstant = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "UV Sensor");
    Blockly.Arduino.addFunction('getUVindex', FUNCTIONS_ARDUINO.DEF_GET_UV_INDEX);
    return ["getUVindex(" + pinConstant + ")", Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE SOUND SENSOR _ READ VALUE BLOCK ON PIN A BLOCK
// http://wiki.seeedstudio.com/Grove-Sound_Sensor/
Blockly.Arduino.sensors_getGroveSound = function (block) {
    const pinConstant = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Sound Sensor");
    return ["getAnalogMean(" + pinConstant + ", 5)", Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE i2C COLOR SENSOR _ READ COLOR BLOCK
// http://wiki.seeedstudio.com/Grove-I2C_Color_Sensor/  
Blockly.Arduino.sensors_colorSensor_getData = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('color_sensor', INCLUDE_ADAFRUIT_TCS34725);
    Blockly.Arduino.addDeclaration('color_sensor', "Adafruit_TCS34725 colorSensor = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_24MS); //max = 20480");
    Blockly.Arduino.addFunction('colorSensor_setup', FUNCTIONS_ARDUINO.DEF_COLOR_SENSOR_SETUP);
    Blockly.Arduino.addFunction('colorSensor_getData', FUNCTIONS_ARDUINO.DEF_COLOR_SENSOR_GET_DATA);
    Blockly.Arduino.addSetup('color_sensor', "colorSensor_setup();");
    return ["colorSensor_getData(" + block.getFieldValue("DATA") + ")", Blockly.Arduino.ORDER_ATOMIC]
};

// GROVE i2C COLOR SENSOR _ ON COLOR DETECTED DO
// http://wiki.seeedstudio.com/Grove-I2C_Color_Sensor/  
Blockly.Arduino.sensors_colorSensor_onColorDetected = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('color_sensor', INCLUDE_ADAFRUIT_TCS34725);
    Blockly.Arduino.addDeclaration('color_sensor', "Adafruit_TCS34725 colorSensor = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_24MS); //max = 20480");
    Blockly.Arduino.addFunction('colorSensor_setup', FUNCTIONS_ARDUINO.DEF_COLOR_SENSOR_SETUP);
    Blockly.Arduino.addFunction('colorSensor_getData', FUNCTIONS_ARDUINO.DEF_COLOR_SENSOR_GET_DATA);
    Blockly.Arduino.addSetup('color_sensor', "colorSensor_setup();");
    var branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    switch (block.getFieldValue("COLOR")) {
        case "RED":
            return "if (colorSensor_getData(0)>colorSensor_getData(1) && colorSensor_getData(0)>colorSensor_getData(2)) {" + NEWLINE + branchCode + "}" + NEWLINE;
        case "GREEN":
            return "if (colorSensor_getData(1)>colorSensor_getData(2) && colorSensor_getData(1)>colorSensor_getData(0)) {" + NEWLINE + branchCode + "}" + NEWLINE;
        case "BLUE":
            return "if (colorSensor_getData(2)>colorSensor_getData(0) && colorSensor_getData(2)>colorSensor_getData(1)) {" + NEWLINE + branchCode + "}" + NEWLINE;
    }
};

// SNAPSHOT AND SAVE IN MICROSD BLOCK
Blockly.Arduino.sensors_cameraTakePicture = function (block) {
    Blockly.Arduino.Generators.setupSerialConnection();
    const pin_cs = block.getFieldValue("PIN_CS");
    const pin_rx = block.getFieldValue("RX");
    const pin_tx = block.getFieldValue("TX");
    Blockly.Arduino.addInclude('software_serial_2', INCLUDE_SOFTWARE_SERIAL_2);
    Blockly.Arduino.addInclude('adafruit_vc0706', INCLUDE_ADAFRUIT_VC0706);
    Blockly.Arduino.addInclude('sd', INCLUDE_SD);
    Blockly.Arduino.addInclude('spi', INCLUDE_SPI);
    Blockly.Arduino.addDeclaration('cameraconnection', "SoftwareSerial cameraconnection = SoftwareSerial(" + pin_tx + ", " + pin_rx + "); // RX,TX => CAM_TX,CAM_RX");
    Blockly.Arduino.addDeclaration('vc0706', "Adafruit_VC0706 cam = Adafruit_VC0706(&cameraconnection);");
    Blockly.Arduino.addSetup('sd', "sd_setupCard(" + pin_cs + ");");
    Blockly.Arduino.addSetup('camera_check', "while(!cam.begin()) {" + NEWLINE + TAB + "Serial.println(\"La camera n'est pas presente.\");" + NEWLINE + "}");
    Blockly.Arduino.addSetup('camera_setup', "cam.setImageSize(VC0706_640x480);");
    Blockly.Arduino.addFunction('sd_setupCard', FUNCTIONS_ARDUINO.DEF_SD_SPI_SETUP_CARD);
    Blockly.Arduino.addFunction("takePicture", FUNCTIONS_ARDUINO.DEF_TAKE_PICTURE);
    return "takePicture();" + NEWLINE;
};

// GROVE ULTRASONIC SENSOR _ GET DISTANCE
Blockly.Arduino.sensors_getGroveUltrasonicRanger = function (block) {
    switch (block.getFieldValue("SENSOR")) {
        case "GROVE":
            const pin = block.getFieldValue("PIN")
            const pinConstant = Blockly.Arduino.Generators.digital_read(pin, "ultrasonic");
            const objName = "ultrasonic_" + pin;
            Blockly.Arduino.addInclude('ultrasonic', INCLUDE_ULTRASONIC);
            Blockly.Arduino.addDeclaration(objName, "Ultrasonic " + objName + "(" + pinConstant + ");");
            switch (block.getFieldValue("DATA")) {
                case "DIST":
                    return [objName + ".MeasureInCentimeters()", Blockly.Arduino.ORDER_ATOMIC]
                case "TIME":
                    return [objName + ".MeasureInCentimeters()*29*2", Blockly.Arduino.ORDER_ATOMIC]
            }
        case "HC-SR04":
            const pinTRIG = block.getFieldValue("TRIG");
            const pinECHO = block.getFieldValue("ECHO");
            const pinName_TRIG = Blockly.Arduino.Generators.digital_write(pinTRIG, 'Ultrasonic TRIG');
            const pinName_ECHO = Blockly.Arduino.Generators.digital_read(pinECHO, 'Ultrasonic ECHO');
            Blockly.Arduino.addSetup('hcsr04', "pinMode(" + pinTRIG + ", OUTPUT);" + NEWLINE + "pinMode(" + pinECHO + ", INPUT);");
            Blockly.Arduino.addFunction('hcsr04_getUltrasonicData', FUNCTIONS_ARDUINO.DEF_HCSR04_GET_ULTRASONIC_DATA)
            switch (block.getFieldValue("DATA")) {
                case "DIST":
                    return ["hcsr04_getUltrasonicData(" + pinName_TRIG + ", " + pinName_ECHO + ", 0)", Blockly.Arduino.ORDER_ATOMIC]
                case "TIME":
                    return ["hcsr04_getUltrasonicData(" + pinName_TRIG + ", " + pinName_ECHO + ", 1)", Blockly.Arduino.ORDER_ATOMIC]
            }
        default:
            throw Error("sensors_getGroveUltrasonicRanger: option '" + block.getFieldValue("SENSOR") + "' is not an option");
    }
};

// GROVE GESTURE SENSOR _ GET TYPE
Blockly.Arduino.sensors_getGesture = function () {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('paj7620', INCLUDE_PAJ7620);
    Blockly.Arduino.addSetup('paj7620', "paj7620Init();");
    Blockly.Arduino.addFunction('getGestureType', FUNCTIONS_ARDUINO.DEF_GESTURE_GET);
    return ['getGestureType()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensors_onGestureTypeDetected = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('paj7620', INCLUDE_PAJ7620);
    Blockly.Arduino.addSetup('paj7620', "paj7620Init();");
    Blockly.Arduino.addFunction('getGestureType', FUNCTIONS_ARDUINO.DEF_GESTURE_GET);
    const branchCode = Blockly.Arduino.statementToCode(block, 'DO');
    return "if (getGestureType() == \"" + block.getFieldValue("GESTURE") + "\") {" + NEWLINE + branchCode + "}" + NEWLINE;
};

// GROVE LINE FINDER _ GET STATE
Blockly.Arduino.sensors_getGroveLineFinder = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('line_finder_module_' + pin, "#define PIN_LINE_FINDER_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_LINE_FINDER_' + pin + ', INPUT);');
    return ["digitalRead(PIN_LINE_FINDER_" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

// GROVE PIR MOTION _ GET STATE
Blockly.Arduino.sensors_getGroveMotion = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('motion_module_' + pin, "#define PIN_MOTION_SENSOR_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_MOTION_SENSOR_' + pin + ', INPUT);');
    return ["digitalRead(PIN_MOTION_SENSOR_" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

// GROVE PIEZO VIBRATION _ GET STATE
Blockly.Arduino.sensors_getPiezoVibration = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('vibration_module_' + pin, "#define PIN_VIBRATION_SENSOR_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_VIBRATION_SENSOR_' + pin + ', INPUT);');
    return ["digitalRead(PIN_VIBRATION_SENSOR_" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

// GROVE TILT DETECTOR _ GET STATE
Blockly.Arduino.sensors_getGroveTilt = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Arduino.addDefine('tilt_module_' + pin, "#define PIN_TILT_SENSOR_" + pin + TAB + pin);
    Blockly.Arduino.addSetup('pin_' + pin, 'pinMode(PIN_TILT_SENSOR_' + pin + ', INPUT);');
    return ["digitalRead(PIN_TILT_SENSOR_" + pin + ")", Blockly.Arduino.ORDER_ATOMIC]
};

// INA219 CURRENT SENSOR
Blockly.Arduino.sensors_getIna219Data = function (block) {
    Blockly.Arduino.addInclude('wire', INCLUDE_WIRE);
    Blockly.Arduino.addInclude('adafruit_ina219', INCLUDE_ADAFRUIT_INA219);
    Blockly.Arduino.addDeclaration('ina219', "Adafruit_INA219 ina219;");
    Blockly.Arduino.addSetup('ina219', 'ina219.begin();');
    switch (block.getFieldValue("DATA")) {
        case "0":
            return ["ina219.getBusVoltage_V()", Blockly.Arduino.ORDER_ATOMIC];
        case "1":
            return ["ina219.getShuntVoltage_mV()", Blockly.Arduino.ORDER_ATOMIC];
        case "2":
            return ["ina219.getBusVoltage_V() + (ina219.getShuntVoltage_mV()/1000)", Blockly.Arduino.ORDER_ATOMIC];
        case "3":
            return ["ina219.getCurrent_mA()", Blockly.Arduino.ORDER_ATOMIC];
        case "4":
            return ["ina219.getPower_mW()", Blockly.Arduino.ORDER_ATOMIC];
    }
};

// GROVE VOLTAGE DIVIDER
Blockly.Arduino.sensors_getVoltageDividerData = function (block) {
    const pin = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Voltage Divider", false);
    const divider = block.getFieldValue("DIVIDER");
    const unit = block.getFieldValue("UNIT");
    Blockly.Arduino.addFunction('get_voltage_divider_data', FUNCTIONS_ARDUINO.DEF_GET_VOLTAGE_DIVIDER_DATA);
    return [`getVoltageDividerData(${pin}, 1000, ${divider}, ${unit})`, Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE FORCE SENSOR (FSR402)
Blockly.Arduino.sensors_getFsr402Force = function (block) {
    const pin = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Force Sensor");
    return ["getAnalogMean(" + pin + ", 5)", Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE PULSE SENSOR
Blockly.Arduino.sensors_getPulse = function (block) {
    const pin = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Pulse Sensor");
    return ["getAnalogMean(" + pin + ", 5)", Blockly.Arduino.ORDER_ATOMIC];
};

// GROVE PULSE SENSOR
Blockly.Arduino.sensors_getPulseBpm = function (block) {
    const pin = Blockly.Arduino.Generators.analog_read(block.getFieldValue("PIN"), "Pulse Sensor", false);
    Blockly.Arduino.addDefine('pulse_sensor_samp_size', "#define samp_size 4");
    Blockly.Arduino.addDefine('pulse_sensor_threshold', "#define rise_threshold 5");
    Blockly.Arduino.addCodeVariable('pulse_sensor_float_variables', "float reads[samp_size], sum = 0, last, reader, start, first, second, third, before, bpm;");
    Blockly.Arduino.addCodeVariable('pulse_sensor_longInt_variables', "long int now, ptr = 0, last_beat;");
    Blockly.Arduino.addCodeVariable('pulse_sensor_bool_variables', "bool rising;");
    Blockly.Arduino.addCodeVariable('pulse_sensor_int_variables', "int rise_count, n;");
    Blockly.Arduino.addFunction('pulse_sensor_get_bpm', FUNCTIONS_ARDUINO.DEF_PULSE_SENSOR_GET_BPM);
    return ["getBPM(" + pin + ")", Blockly.Arduino.ORDER_ATOMIC];
};
