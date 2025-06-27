/**
 * @fileoverview Sensors generators for Galaxia.
 */

// Micro:bit board sensors

Blockly.Python.sensors_getAcceleration = function (block) {
    let axis = block.getFieldValue("AXIS");
    if (axis !== "strength") {
        return ["accelerometer.get_" + axis + "()", Blockly.Python.ORDER_ATOMIC];
    } else {
        Blockly.Python.addImport('math', IMPORT_MATH);
        return ["math.sqrt(accelerometer.get_x()**2 + accelerometer.get_y()**2 + accelerometer.get_z()**2)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.io_onMovement = function (block) {
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if accelerometer.current_gesture() == '" + block.getFieldValue("MOV") + "' :" + NEWLINE + branchCode;
};

Blockly.Python.sensors_getLight = function () {
    return ["led.read_light_level()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_calibrateCompass = function () {
    return "compass.calibrate()" + NEWLINE;
};

Blockly.Python.sensors_getCompass = function () {
    return ["compass.heading()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getTemperature = function (block) {
    var code = "temperature()";
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

Blockly.Python.sensors_getRotation = function (block) {
    Blockly.Python.addImport('math', IMPORT_MATH);
    if (block.getFieldValue("AXIS") === "pitch") {
        return ["math.atan2(accelerometer.get_y(), -accelerometer.get_z()) * 180.0/math.pi", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["math.atan2(accelerometer.get_x(), math.sqrt(accelerometer.get_y()**2 + accelerometer.get_z()**2)) * 180.0/math.pi", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getMagneticForce = function (block) {
    var option = block.getFieldValue("AXIS");
    if (option == "NORM") {
        Blockly.Python.addImport('math', IMPORT_MATH);
        return ["math.sqrt((compass.get_x() ** 2 + compass.get_y() ** 2) + compass.get_z() ** 2)", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["compass.get_" + option + "()", Blockly.Python.ORDER_ATOMIC];
    }
};

// Enviro:bit

// Blockly.Python.sensors_envirobit_tcs3472_getRGB = function (block) {
//     Blockly.Python.addImport('tcs3472', IMPORT_TCS3472);
//     Blockly.Python.addInit('tcs3472', "tcs3472 = TCS3472(pin8)");
//     return ["tcs3472.rgb()[" + block.getFieldValue("DATA") + "]", Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_envirobit_tcs3472_getBrightness = function (block) {
//     Blockly.Python.addImport('tcs3472', IMPORT_TCS3472);
//     Blockly.Python.addInit('tcs3472', "tcs3472 = TCS3472(pin8)");
//     return ["tcs3472.brightness()", Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_envirobit_tcs3472_setLED = function (block) {
//     Blockly.Python.addImport('tcs3472', IMPORT_TCS3472);
//     Blockly.Python.addInit('tcs3472', "tcs3472 = TCS3472(pin8)");
//     const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
//     return "tcs3472.set_leds(" + state + ")" + NEWLINE;
// };

// Blockly.Python.sensors_envirobit_bme280_getData = function (block) {
//     Blockly.Python.addImport('board', IMPORT_BOARD);
//     Blockly.Python.addImport('busio', IMPORT_BUSIO);
//     Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
//     Blockly.Python.addImport('galaxia_bme280', IMPORT_GALAXIA_BME280);
//     Blockly.Python.addImport('time', IMPORT_TIME);
//     Blockly.Python.addInit('bme280_data', "bme280_data = [0, 0, 0]");
//     Blockly.Python.addInit('t_bme', "t_bme = time.monotonic()");
//     Blockly.Python.addFunction('bme280_read', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_BME280_READ);
//     Blockly.Python.addInit('bme280', "bme280 = BME280(i2c=i2c, addr=0x76)");
//     switch (block.getFieldValue("DATA")) {
//         case "TEMP":
//             var code = "bme280_read(0)";
//             if (block.getInput("TEMP_UNIT")) {
//                 switch (block.getFieldValue("UNIT")) {
//                     case "FAHRENHEIT":
//                         code += "*9/5 + 32";
//                         break;
//                     case "KELVIN":
//                         code += " + 273.15";
//                         break;
//                 }
//             }
//             return [code, Blockly.Python.ORDER_ATOMIC];
//         case "HUM":
//             return ["bme280_read(1)", Blockly.Python.ORDER_ATOMIC];
//         case "PRESS":
//             return ["bme280_read(2)", Blockly.Python.ORDER_ATOMIC];
//         case "ALT":
//             return ["bme280_read(3)", Blockly.Python.ORDER_ATOMIC];
//     }
// };

Blockly.Python.sensors_envirobit_getSoundLevel = function () {
    Blockly.Python.addConstant('ENVIROBIT_SOUND_OFFSET', "ENVIROBIT_SOUND_OFFSET = 580");
    Blockly.Python.addFunction('envirobit_readSound', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_ENVIROBIT_READ_SOUND);
    return ["envirobit_readSound()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_envirobit_waitForClaps = function (block) {
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addConstant('ENVIROBIT_SOUND_OFFSET', "ENVIROBIT_SOUND_OFFSET = 580");
    Blockly.Python.addFunction('envirobit_readSound', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_ENVIROBIT_READ_SOUND);
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE);
    switch(block.getFieldValue("CLAPS")) {
        case "2":
            Blockly.Python.addFunction('envirobit_waitForDoubleClap', FUNCTIONS_GALAXIACIRCUITPYTHON.ENVIROBIT_WAIT_FOR_DOUBLE_CLAP);
            return ["envirobit_waitForDoubleClap(timeout=" + duration + "*1000)", Blockly.Python.ORDER_ATOMIC];
        case "1":
        default:
            Blockly.Python.addFunction('envirobit_waitForClap', FUNCTIONS_GALAXIACIRCUITPYTHON.ENVIROBIT_WAIT_FOR_CLAP);
            return ["envirobit_waitForClap(timeout=" + duration + "*1000)", Blockly.Python.ORDER_ATOMIC];
    }
};

// Gas sensors

Blockly.Python.sensors_getSgp30Gas = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addImport('galaxia_sgp30', IMPORT_GALAXIA_SGP30);
    Blockly.Python.addInit('sgp30', "sgp30 = SGP30(i2c=i2c)");
    switch (block.getFieldValue("GAS")) {
        case "CO2":
            return ["sgp30.co2_equivalent()", Blockly.Python.ORDER_ATOMIC];
        case "TVOC":
            return ["sgp30.total_organic_compound()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getMultichannelGas = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addImport('galaxia_multichannel_gas', IMPORT_GALAXIA_MULTICHANNEL_GAS);
    Blockly.Python.addInit('multichannel', "multichannel = GAS()");
    Blockly.Python.addPowerOn('multichannel', "multichannel.power_on()");
    return ["multichannel.calc_gas(" + block.getFieldValue("GAS") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getMultichannelGasV2 = function (block) {
    Blockly.Python.addImport('galaxia_gas_gmxxx', IMPORT_GALAXIA_GAS_GMXXX);
    Blockly.Python.addInit('gas_gmxxx', "multichannel_v2 = GAS_GMXXX(0x08)");
    return ["multichannel_v2.calcVol(multichannel_v2.measure_" + block.getFieldValue("GAS") + "())", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getO2gas = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Dioxygen Sensor');
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('readO2', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_O2SENSOR_READ);
    return ["readO2(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

// SCD30 SENSOR _ READ CO2/TEMP/HUM BLOCK
Blockly.Python.sensors_SCD30_readData = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addImport('galaxia_scd30', IMPORT_GALAXIA_SCD30);
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addInit('scd30_data', "scd30_data = [0, 0, 0]");
    Blockly.Python.addInit('t_scd', "t_scd = time.monotonic()");
    Blockly.Python.addFunction('scd30_read', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_SCD30_READ);
    Blockly.Python.addInit('scd30', "scd30 = SCD30(i2c=i2c, addr=0x61)");
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

Blockly.Python.sensors_SCD30_forcedCalibration = function (block) {
    const co2ppm = Blockly.Python.valueToCode(block, "DEFAULT", Blockly.Python.ORDER_NONE) || "0";
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addImport('galaxia_scd30', IMPORT_GALAXIA_SCD30);
    Blockly.Python.addInit('scd30', "scd30 = SCD30(i2c=i2c, addr=0x61)");
    Blockly.Python.addFunction('scd30_calibrateSensor', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_SCD30_CALIBRATE);
    return "scd30_calibrateSensor(" + co2ppm + ")" + NEWLINE;
};
Blockly.Python.sensors_getAirQualityValue = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Air Quality Sensor');
    return ["analog_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getParticulateMatter = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addImport('galaxia_hm330x', IMPORT_GALAXIA_HM330X);
    Blockly.Python.addInit('hm330x', "hm3301 = HM330X(i2c=i2c, addr=0x40)");
    return ["hm3301.getData(" + block.getFieldValue("TYPE") + ")", Blockly.Python.ORDER_ATOMIC];
};

// Climate sensors

Blockly.Python.sensors_getBmp280Data = function (block) {
    const addr = block.getFieldValue("ADDR");
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addImport('galaxia_bmp280', IMPORT_GALAXIA_BMP280);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addInit('bmp280', "bmp280 = BMP280(i2c=i2c, addr=" + addr + ")");
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
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Moisture Sensor');
    return ["analog_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTemperature = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Temperature Sensor');
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('getGroveTemperature', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GROVE_GET_TEMP);
    let code;
    switch (block.getFieldValue("UNIT")) {
        case "CELSIUS":
            code = "getGroveTemperature(" + pin + ")";
            break;
        case "FAHRENHEIT":
            code = "getGroveTemperature(" + pin + ", unit='fahrenheit')";
            break;
        case "KELVIN":
            code = "getGroveTemperature(" + pin + ", unit='kelvin')";
            break;
    }
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveHighTemperature = function (block) {
    const pinA0 = Blockly.Python.Generators.analog_read(block.getFieldValue("A0"), 'High Temperature Sensor');
    const pinA1 = Blockly.Python.Generators.analog_read(block.getFieldValue("A1"), 'High Temperature Sensor');
    const pinA0Number = pinA0.replace('pin', '');
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addConstant('thmc_table', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GROVE_HIGHTEMP_THMC_TABLE);
    Blockly.Python.addFunction('getThmcTemp', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GROVE_HIGHTEMP_GET_THMC_TEMP);
    Blockly.Python.addFunction('getRoomTemp', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP);
    Blockly.Python.addFunction('K_VtoT', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GROVE_HIGHTEMP_KVTOT);
    Blockly.Python.addPowerOn('highTemp_tempRoom_' + pinA0Number, "tempRoom_" + pinA0Number + " = getRoomTemp(" + pinA1 + ")");
    var code = "getThmcTemp(" + pinA0 + ", tempRoom_" + pinA0Number + ")";
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

Blockly.Python.sensors_dhtReadData = function (block) {
    const pin = block.getFieldValue("PIN");
    const sensor = block.getFieldValue("SENSOR");
    const sensorObj = "dht" + sensor + '_' + pin;
    if (sensor == "22") {
        Blockly.Python.addImport('adafruit_dht' + sensor, IMPORT_ADAFRUIT_DHT22);
    } else {
        Blockly.Python.addImport('adafruit_dht' + sensor, IMPORT_ADAFRUIT_DHT11);
    }
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addInit(sensorObj, sensorObj + " = DHT" + sensor + "(board." + pin + ")");
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            let code = sensorObj + ".temperature";
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
            return [sensorObj + ".humidity", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_TH02readData = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addImport('galaxia_th02', IMPORT_GALAXIA_TH02);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addInit('th02', "th02 = TH02(i2c=i2c, addr=0x40)");
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
            return ["th02.get_humidity", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for th02 sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_SHT31readData = function (block) {
    const data = block.getFieldValue("DATA");
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addImport('galaxia_sht31', IMPORT_GALAXIA_SHT31);
    Blockly.Python.addInit('sht31', "sht31 = SHT31(i2c=i2c, addr=0x44)");
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

Blockly.Python.sensors_mpx5700ap_getPressure = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Pressure Sensor');
    Blockly.Python.addFunction('mpx5700_readPressure', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_MPX5700AP_GET_PRESSURE);
    return ["mpx5700_readPressure(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_mpx5700ap_calibrate = function (block) {
    let m = Blockly.Python.valueToCode(block, "M", Blockly.Python.ORDER_NONE) || "0";
    let b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "";
};

Blockly.Python.sensors_getGroveWaterAmount = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Water Sensor');
    return ["analog_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getRainGauge = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Rain Gauge');
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getAnemometer = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Anemometer');
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

// Sound & Light sensors

Blockly.Python.sensors_getGroveLight = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Light Sensor');
    return ["analog_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getSi1145Light = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addImport('galaxia_si1145', IMPORT_GALAXIA_SI1145);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addInit('si1145', "si1145 = SI1145(i2c=i2c, addr=0x60)");
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
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'UV Sensor');
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addFunction("getUVindex", FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GROVE_GET_UV_INDEX);
    return ["getUVindex(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_colorSensor_getData = function (block) {
    Blockly.Python.addImport('board', IMPORT_BOARD);
    Blockly.Python.addImport('busio', IMPORT_BUSIO);
    Blockly.Python.addImport('galaxia_colorSensor', IMPORT_GALAXIA_COLOR_SENSOR);
    Blockly.Python.addConstant('i2c', FUNCTIONS_GALAXIACIRCUITPYTHON.GALAXIA_I2C_INIT);
    Blockly.Python.addInit('colorSensor', "colorSensor = TCS34725(i2c=i2c, addr=0x29)");
    return ["colorSensor.html_rgb()[" + block.getFieldValue("DATA") + "]", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveSound = function (block) {
    const pin = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Sound Sensor');
    return ["analog_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

// Distance & Movement sensors

// Blockly.Python.sensors_getGroveUltrasonicRanger = function (block) {
//     let pinTRIG;
//     let pinECHO;
//     switch (block.getFieldValue("SENSOR")) {
//         case "GROVE":
//             pinTRIG = block.getFieldValue("PIN");
//             Blockly.Python.addInit(pinTRIG, "# Ultrasonic on " + pinTRIG);
//             pinECHO = pinTRIG;
//             break;
//         case "HC-SR04":
//             pinTRIG = block.getFieldValue("TRIG"), 'Ultrasonic TRIG';
//             pinECHO = block.getFieldValue("ECHO"), 'Ultrasonic ECHO';
//             Blockly.Python.addInit(pinTRIG, "# Ultrasonic TRIG on " + pinTRIG);
//             Blockly.Python.addInit(pinECHO, "# Ultrasonic ECHO on " + pinECHO);
//             break;
//     }
//     const sensorObj = 'ultrasonic_' + pinTRIG;
//     Blockly.Python.addImport('board', IMPORT_BOARD);
//     Blockly.Python.addImport('adafruit_hcsr04', IMPORT_ADAFRUIT_HCSR04);
//     Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_GROVE_ULTRASONIC);
//     Blockly.Python.addInit(sensorObj + '_deinit', "try: " + NEWLINE + "  " + sensorObj + ".deinit()" + NEWLINE + "except: pass");
//     Blockly.Python.addInit(sensorObj, sensorObj + " = HCSR04(trigger_pin=board." + pinTRIG + ", echo_pin=board." + pinECHO + ")");
//     switch (block.getFieldValue("DATA")) {
//         case "DIST":
//             return ["getUltrasonicData(" + sensorObj + ", data='distance')", Blockly.Python.ORDER_ATOMIC];
//         case "TIME":
//             return ["getUltrasonicData(" + sensorObj + ", data='duration')", Blockly.Python.ORDER_ATOMIC];
//     }
// };

Blockly.Python.sensors_getGroveUltrasonicRanger = function (block) {
    let pinTRIG;
    let pinECHO;
    switch (block.getFieldValue("SENSOR")) {
        case "GROVE":
            pinTRIG = Blockly.Python.Generators.digital_write(block.getFieldValue("PIN"), 'Ultrasonic');
            pinECHO = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Ultrasonic');
            break;
        case "HC-SR04":
            pinTRIG = Blockly.Python.Generators.digital_write(block.getFieldValue("TRIG"), 'Ultrasonic TRIG');
            pinECHO = Blockly.Python.Generators.pulse_in(block.getFieldValue("ECHO"), 'Ultrasonic ECHO');
            break;
    }
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_GALAXIACIRCUITPYTHON.DEF_HCSR04_ULTRASONIC);
    switch (block.getFieldValue("DATA")) {
        case "DIST":
            return ["getUltrasonicData(" + pinTRIG + ", " + pinECHO + ", data='distance')", Blockly.Python.ORDER_ATOMIC];
        case "TIME":
            return ["getUltrasonicData(" + pinTRIG + ", " + pinECHO + ", data='duration')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getGesture = function () {
    Blockly.Python.addImport('gesture', IMPORT_GESTURE);
    Blockly.Python.addInit('gesture', "gesture = GESTURE()");
    return ["gesture.readGesture()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_onGestureTypeDetected = function (block) {
    Blockly.Python.addImport('gesture', IMPORT_GESTURE);
    Blockly.Python.addInit('gesture', "gesture = GESTURE()");
    var branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if gesture.readGesture() == '" + block.getFieldValue("GESTURE") + "':" + NEWLINE + branchCode;
};

Blockly.Python.sensors_getGroveLineFinder = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Line Finder');
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTilt = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Tilt Sensor');
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveMotion = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Motion Sensor');
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getPiezoVibration = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Vibration Sensor');
    return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

// Other sensors

Blockly.Python.sensors_getGroveButton = function (block) {
    const pin = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Button');
    switch (this.getFieldValue("TYPE")) {
        case "VOLT":
            return ["digital_read(" + pin + ")*3.3", Blockly.Python.ORDER_ATOMIC];
        case "STATE":
            return ["digital_read(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
    }
};