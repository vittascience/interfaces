/**
 * @fileoverview Sensors generators for Micro:bit.
 */

// Micro:bit board sensors

Blockly.Python.sensors_getAcceleration = function (block) {
    const axis = block.getFieldValue("AXIS");
    if (axis !== "strength") {
        return ["accelerometer.get_" + axis + "()", Blockly.Python.ORDER_ATOMIC];
    } else {
        Blockly.Python.addImport('math', IMPORT_MATH);
        return ["math.sqrt(accelerometer.get_x()**2 + accelerometer.get_y()**2 + accelerometer.get_z()**2)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getLight = function () {
    return ["display.read_light_level()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_calibrateCompass = function () {
    return "compass.calibrate()" + NEWLINE;
};

Blockly.Python.sensors_getCompass = function () {
    return ["compass.heading()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_isCompassCalibrated = function () {
    return ["compass.is_calibrated()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getTemperature = function (block) {
    let code = "temperature()";
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
    const option = block.getFieldValue("AXIS");
    if (option == "NORM") {
        Blockly.Python.addImport('math', IMPORT_MATH);
        return ["math.sqrt((compass.get_x() ** 2 + compass.get_y() ** 2) + compass.get_z() ** 2)", Blockly.Python.ORDER_ATOMIC];
    } else {
        return ["compass.get_" + option + "()", Blockly.Python.ORDER_ATOMIC];
    }
};

// Enviro:bit

Blockly.Python.sensors_envirobit_tcs3472_getRGB = function (block) {
    Blockly.Python.addImport('tcs3472', IMPORT_TCS3472);
    Blockly.Python.addInit('tcs3472', "tcs3472 = TCS3472(pin8)");
    return ["tcs3472.rgb()[" + block.getFieldValue("DATA") + "]", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_envirobit_tcs3472_getBrightness = function (block) {
    Blockly.Python.addImport('tcs3472', IMPORT_TCS3472);
    Blockly.Python.addInit('tcs3472', "tcs3472 = TCS3472(pin8)");
    return ["tcs3472.brightness()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_envirobit_tcs3472_setLED = function (block) {
    Blockly.Python.addImport('tcs3472', IMPORT_TCS3472);
    Blockly.Python.addInit('tcs3472', "tcs3472 = TCS3472(pin8)");
    const state = Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || "0";
    return "tcs3472.set_leds(" + state + ")" + NEWLINE;
};

Blockly.Python.sensors_envirobit_bme280_getData = function (block) {
    Blockly.Python.addImport('bme280', IMPORT_BME280);
    Blockly.Python.addInit('bme280', "bme280 = BME280()");
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            let code = "bme280.temperature()";
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
            return ["bme280.humidity()", Blockly.Python.ORDER_ATOMIC];
        case "PRESS":
            return ["bme280.pressure()", Blockly.Python.ORDER_ATOMIC];
        case "ALT":
            return ["bme280.altitude()", Blockly.Python.ORDER_ATOMIC];
        default:
            return ["bme280.temperature()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_envirobit_getSoundLevel = function () {
    Blockly.Python.addConstant('ENVIROBIT_SOUND_OFFSET', "ENVIROBIT_SOUND_OFFSET = 580");
    Blockly.Python.addFunction('envirobit_readSound', FUNCTIONS_MICROBIT.DEF_ENVIROBIT_READ_SOUND);
    return ["envirobit_readSound()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_envirobit_waitForClaps = function (block) {
    Blockly.Python.addConstant('ENVIROBIT_SOUND_OFFSET', "ENVIROBIT_SOUND_OFFSET = 580");
    Blockly.Python.addFunction('envirobit_readSound', FUNCTIONS_MICROBIT.DEF_ENVIROBIT_READ_SOUND);
    const duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE);
    switch (block.getFieldValue("CLAPS")) {
        case "2":
            Blockly.Python.addFunction('envirobit_waitForDoubleClap', FUNCTIONS_MICROBIT.ENVIROBIT_WAIT_FOR_DOUBLE_CLAP);
            return ["envirobit_waitForDoubleClap(timeout=" + duration + "*1000)", Blockly.Python.ORDER_ATOMIC];
        case "1":
        default:
            Blockly.Python.addFunction('envirobit_waitForClap', FUNCTIONS_MICROBIT.ENVIROBIT_WAIT_FOR_CLAP);
            return ["envirobit_waitForClap(timeout=" + duration + "*1000)", Blockly.Python.ORDER_ATOMIC];
    }
};

// Weather:bit

Blockly.Python.sensors_weatherbit_bme280_getData = Blockly.Python.sensors_envirobit_bme280_getData;

Blockly.Python.sensors_weatherbit_anemometer_getSpeed = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('pulseIn', FUNCTIONS_MICROBIT.DEF_IO_PULSE_IN);
    Blockly.Python.addFunction('anemometer_getWindSpeed', FUNCTIONS_MICROBIT.DEF_ANEMOMETER_GET_WIND_SPEED);
    Blockly.Python.addPowerOn("pin8_pull", "pin8.set_pull(pin8.PULL_UP)");
    switch (block.getFieldValue("UNIT")) {
        case "KNOT":
            return ["anemometer_getWindSpeed(pin8, unit='knot')", Blockly.Python.ORDER_ATOMIC];
        case "KM_H":
            return ["anemometer_getWindSpeed(pin8, unit='km/h')", Blockly.Python.ORDER_ATOMIC];
        case "INCH_S":
            return ["anemometer_getWindSpeed(pin8, unit='inch/s')", Blockly.Python.ORDER_ATOMIC];
        case "M_S":
        default:
            return ["anemometer_getWindSpeed(pin8, unit='m/s')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_weatherbit_weathercock_getDirection = function () {
    Blockly.Python.addFunction('weathercock_getDirection', FUNCTIONS_MICROBIT.DEF_WEATHERCOCK_GET_DIRECTION);
    return ["weathercock_getDirection(pin1)", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_weatherbit_rainGauge_getDumps = function (block) {
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addConstant('RAIN_HEIGHT_RATIO', "RAIN_HEIGHT_RATIO = 0.2794");
    Blockly.Python.addInit('rainGauge_dumps', "rainGauge_dumps = 0");
    Blockly.Python.addFunction('pulseIn', FUNCTIONS_MICROBIT.DEF_IO_PULSE_IN);
    Blockly.Python.addFunction('rainGauge_getDumps', FUNCTIONS_MICROBIT.DEF_RAIN_GAUGE_GET_DUMPS);
    Blockly.Python.addPowerOn("pin2_pull", "pin2.set_pull(pin2.PULL_UP)");
    return ["rainGauge_getDumps(pin2)", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_weatherbit_getSoilMoisture = function () {
    Blockly.Python.addInit('moisture_module_pin0', "# Soil Moisture Sensor on pin0");
    return ["pin0.read_analog()", Blockly.Python.ORDER_ATOMIC];
};

// Kitronik

Blockly.Python.sensors_kitronik_bme280_getData = function (block) {
    Blockly.Python.addImport('bme280', IMPORT_BME280);
    Blockly.Python.addInit('bme280', "bme280 = BME280()");
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            let code = "bme280.temperature()";
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
            return ["bme280.humidity()", Blockly.Python.ORDER_ATOMIC];
        case "PRESS":
            return ["bme280.pressure()", Blockly.Python.ORDER_ATOMIC];
        case "ALT":
            return ["bme280.altitude()", Blockly.Python.ORDER_ATOMIC];
        default:
            return ["bme280.temperature()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_kitronik_klimate_bme280_getData = Blockly.Python.sensors_kitronik_bme280_getData;


Blockly.Python.sensors_getLampBitLuminosity = function (block) {
    return ["pin1.read_analog()", Blockly.Python.ORDER_ATOMIC]
}

// Gas sensors

Blockly.Python.sensors_getSgp30Gas = function (block) {
    Blockly.Python.addImport('sgp30', IMPORT_SGP30);
    Blockly.Python.addInit('sgp30', "sgp30 = SGP30()");
    switch (block.getFieldValue("GAS")) {
        case "CO2":
            return ["sgp30.eCO2()", Blockly.Python.ORDER_ATOMIC];
        case "TVOC":
            return ["sgp30.TVOC()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getMultichannelGas = function (block) {
    Blockly.Python.addImport('multichannel', IMPORT_MULTICHANNELGAS);
    Blockly.Python.addInit('multichannel', "multichannel = GAS()");
    Blockly.Python.addPowerOn('multichannels', "multichannel.power_on()");
    return ["multichannel.get_gas(" + block.getFieldValue("GAS") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getMultichannelGasV2 = function (block) {
    Blockly.Python.addImport('gas_gmxxx', IMPORT_GAS_GMXXX);
    Blockly.Python.addInit('gas_gmxxx', "multichannel_v2 = GAS_GMXXX(0x08)");
    return ["multichannel_v2.calcVol(multichannel_v2.measure_" + block.getFieldValue("GAS") + "())", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getO2gas = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('dioxygen_module_' + pin, "# Dioxygen Sensor on " + pin);
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_MICROBIT.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('readO2', FUNCTIONS_MICROBIT.DEF_O2SENSOR_READ);
    return ["readO2(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

// SCD30 SENSOR _ READ CO2/TEMP/HUM BLOCK
Blockly.Python.sensors_SCD30_readData = function (block) {
    Blockly.Python.addImport('scd30', IMPORT_SCD30);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addFunction('scd30_read', FUNCTIONS_MICROBIT.DEF_SCD30_READ);
    Blockly.Python.addInit('scd30_data', "scd30_data = [0, 0, 0]");
    Blockly.Python.addInit('t_scd', "t_scd = running_time()");
    Blockly.Python.addInit('scd30', "scd30 = SCD30(0x61)");
    switch (block.getFieldValue("DATA")) {
        case "CO2":
            return ["scd30_read(0)", Blockly.Python.ORDER_ATOMIC];
        case "TEMP":
            let code = "scd30_read(1)";
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
    Blockly.Python.addImport('scd30', IMPORT_SCD30);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('scd30', "scd30 = SCD30(0x61)");
    Blockly.Python.addFunction('scd30_calibrateSensor', FUNCTIONS_MICROBIT.DEF_SCD30_CALIBRATE);
    return "scd30_calibrateSensor(" + co2ppm + ")" + NEWLINE;
};
Blockly.Python.sensors_getAirQualityValue = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('air_quality_module_' + pin, "# Air Quality Sensor on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getParticulateMatter = function (block) {
    Blockly.Python.addImport('hm330x', IMPORT_HM330X);
    Blockly.Python.addInit('hm330x', "hm3301 = HM330X()");
    return ["hm3301.getData(" + block.getFieldValue("TYPE") + ")", Blockly.Python.ORDER_ATOMIC];
};

// Climate sensors

Blockly.Python.sensors_getBmp280Data = function (block) {
    const addr = block.getFieldValue("ADDR");
    Blockly.Python.addImport('bmp280', IMPORT_BMP280);
    Blockly.Python.addInit('bmp280', "bmp280 = BMP280(" + addr + ")");
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            let code = "bmp280.Temperature()";
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
            return ["bmp280.Pressure()", Blockly.Python.ORDER_ATOMIC];
        case "ALT":
            return ["bmp280.Altitude()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_bme280_getData = Blockly.Python.sensors_envirobit_bme280_getData;

Blockly.Python.sensors_getGroveMoisture = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('moisture_module_' + pin, "# Moisture Sensor on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveCapacitiveMoisture = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('capacitive_moisture_module_' + pin, "# Capacitive Moisture Sensor on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTemperature = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addInit('grove_temperature_module_' + pin, "# Temperature Sensor on " + pin);
    Blockly.Python.addFunction('getGroveTemperature', FUNCTIONS_MICROBIT.DEF_GROVE_GET_TEMP);
    let code = '';
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
    const pinA0 = block.getFieldValue("A0");
    const pinA1 = block.getFieldValue("A1");
    const pinA0Number = pinA0.replace('pin', '');
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addConstant('thmc_table', FUNCTIONS_MICROBIT.DEF_GROVE_HIGHTEMP_THMC_TABLE);
    Blockly.Python.addInit('high_temp_module_' + pinA0, "# High Temperature thmc on " + pinA0);
    Blockly.Python.addInit('high_temp_module_' + pinA1, "# High Temperature room on " + pinA1);
    Blockly.Python.addFunction('getThmcTemp', FUNCTIONS_MICROBIT.DEF_GROVE_HIGHTEMP_GET_THMC_TEMP);
    Blockly.Python.addFunction('getRoomTemp', FUNCTIONS_MICROBIT.DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP);
    Blockly.Python.addFunction('K_VtoT', FUNCTIONS_MICROBIT.DEF_GROVE_HIGHTEMP_KVTOT);
    Blockly.Python.addPowerOn('highTemp_tempRoom_' + pinA0Number, "tempRoom_" + pinA0Number + " = getRoomTemp(" + pinA1 + ")");
    let code = "getThmcTemp(" + pinA0 + ", tempRoom_" + pinA0Number + ")";
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
    const pinNumber = pin.replace('pin', '');
    if (block.getFieldValue("BOARD") == "v2") {
        Blockly.Python.addImport('dht11_v2', IMPORT_DHT11_V2);
    } else {
        Blockly.Python.addImport('dht11', IMPORT_DHT11);
    }
    Blockly.Python.addInit('dht11_' + pin, "# DHT11 Sensor on " + pin);
    Blockly.Python.addInit('dht11_' + pinNumber, "dht11_" + pinNumber + " = DHT11(" + pin + ")");
    switch (block.getFieldValue("DATA")) {
        case "TEMP":
            let code = "dht11_" + pinNumber + ".getData(d=1)";
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
            return ["dht11_" + pinNumber + ".getData(d=2)", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_TH02readData = function (block) {
    Blockly.Python.addImport('th02', IMPORT_TH02);
    Blockly.Python.addInit('th02', 'th02 = TH02()');
    const data = block.getFieldValue("DATA");
    switch (data) {
        case "TEMP":
            let code = "th02.ReadTemperature()";
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
            return ["th02.ReadHumidity", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for th02 sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_SHT31readData = function (block) {
    Blockly.Python.addImport('sht31', IMPORT_SHT31);
    Blockly.Python.addInit('sht31', 'sht31 = SHT31()');
    const data = block.getFieldValue("DATA");
    switch (data) {
        case "TEMP":
            let code;
            code = "sht31.get_temp_humi(data='t')";
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
            return ["sht31.get_temp_humi(data='h')", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for sht31 sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_SHT35readData = function (block) {
    Blockly.Python.addImport('sht35', IMPORT_SHT35);
    Blockly.Python.addInit('sht35', 'sht35 = SHT35()');
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

Blockly.Python.sensors_barometerReadData = function (block) {
    Blockly.Python.addImport('hp206c', IMPORT_HP206C);
    Blockly.Python.addInit('hp206c', 'hp206c = HP206C()');
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
            throw Error("Unhandled data option for barometer sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_mpx5700ap_getPressure = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('mpx5700_module_' + pin, "# MPX5700 on " + pin);
    Blockly.Python.addFunction('mpx5700_readPressure', FUNCTIONS_MICROBIT.DEF_MPX5700AP_GET_PRESSURE);
    return ["mpx5700_readPressure(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_mpx5700ap_calibrate = function (block) {
    const m = Blockly.Python.valueToCode(block, "M", Blockly.Python.ORDER_NONE) || "0";
    const b = Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "0";
    return "";
};

Blockly.Python.sensors_getGroveWaterAmount = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('water_module_' + pin, "# Water Sensor on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getRainGauge = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('rain_module_' + pin, "# Rain Gauge on " + pin);
    return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getAnemometer = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('wind_module_' + pin, "# Anemometer on " + pin);
    return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

// Sound & Light sensors

Blockly.Python.sensors_getGroveLight = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('light_module_' + pin, "# Light Sensor on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getSi1145Light = function (block) {
    Blockly.Python.addImport('si1145', IMPORT_SI1145);
    Blockly.Python.addInit('si1145', "si1145 = SI1145()");
    switch (block.getFieldValue("LIGHT")) {
        case "UV":
            return ["si1145.readUV()", Blockly.Python.ORDER_ATOMIC];
        case "VIS":
            return ["si1145.readVisible()", Blockly.Python.ORDER_ATOMIC];
        case "IR":
            return ["si1145.readIR()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getUVindex = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('uv_module_' + pin, "# UV Sensor on " + pin);
    Blockly.Python.addFunction("getUVindex", FUNCTIONS_MICROBIT.DEF_GROVE_GET_UV_INDEX);
    return ["getUVindex(" + pin + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_colorSensor_getData = function (block) {
    Blockly.Python.addImport('tcs3472', IMPORT_TCS3472);
    Blockly.Python.addInit('tcs3472', "tcs3472 = TCS3472(pin8)");
    return ["tcs3472.rgb()[" + block.getFieldValue("DATA") + "]", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveSound = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('sound_module_' + pin, "# Sound Sensor on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

// Distance & Movement sensors

Blockly.Python.sensors_getGroveUltrasonicRanger = function (block) {
    let pinTRIG;
    let pinECHO;
    switch (block.getFieldValue("SENSOR")) {
        case "GROVE":
            pinTRIG = block.getFieldValue("PIN");
            pinECHO = block.getFieldValue("PIN");
            Blockly.Python.addInit(pinTRIG, "# Ultrasonic on " + pinTRIG);
            break;
        case "HC-SR04":
            pinTRIG = block.getFieldValue("TRIG");
            pinECHO = block.getFieldValue("ECHO");
            Blockly.Python.addInit(pinTRIG, "# Ultrasonic TRIG on " + pinTRIG);
            Blockly.Python.addInit(pinECHO, "# Ultrasonic ECHO on " + pinECHO);
            break;
    }
    Blockly.Python.addImport('machine_pulse', IMPORT_MACHINE_PULSE_MS);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction('getUltrasonicData', FUNCTIONS_MICROBIT.DEF_GROVE_ULTRASONIC);
    let code = "";
    switch (block.getFieldValue("DATA")) {
        case "DIST":
            code = "distance";
            break;
        case "TIME":
            code = "duration";
            break;
    }
    return ["getUltrasonicData(" + pinTRIG + ", " + pinECHO + ", '" + code + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_VL53L0X_getRangeMillimeters = function (block) {
    Blockly.Python.addImport('vl53l0x', IMPORT_VL53L0X);
    Blockly.Python.addInit('vl53l0x', "vl53l0x = VL53L0X()");
    var code = 'vl53l0x.getRangeMillimeters()';
    switch (block.getFieldValue("UNIT")) {
        case "Millimeter":
            return [code, Blockly.Python.ORDER_ATOMIC];
        case "Centimeter":
            code += "/10";
            return [code, Blockly.Python.ORDER_ATOMIC];
        case "Meter":
            code += "/1000";
            return [code, Blockly.Python.ORDER_ATOMIC];
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
    const branchCode = Blockly.Python.statementToCode(block, "DO") || Blockly.Python.PASS;
    return "if gesture.readGesture() == '" + block.getFieldValue("GESTURE") + "':" + NEWLINE + branchCode;
};

Blockly.Python.sensors_getGroveLineFinder = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('line_finder_module_' + pin, "# Line Finder on " + pin);
    return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTilt = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('tilt_module_' + pin, "# Tilt Sensor on " + pin);
    return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveMotion = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('motion_module_' + pin, "# PIR Motion Sensor on " + pin);
    return [pin + ".read_analog() > 500", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getPiezoVibration = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('vibration_module_' + pin, "# Vibration Sensor on " + pin);
    return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
};

// Other sensors

Blockly.Python.sensors_getGroveButton = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('button_module_' + pin, "# Simple Button on " + pin);
    switch (this.getFieldValue("TYPE")) {
        case "VOLT":
            return [pin + ".read_digital()*3.3", Blockly.Python.ORDER_ATOMIC];
        case "STATE":
            return [pin + ".read_digital()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_getEarClipHeartRate = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addImport('time', IMPORT_TIME);
    Blockly.Python.addInit('ear_clip_module_' + pin, "# Ear Clip on " + pin);
    Blockly.Python.addFunction('def_read_heart_rate', FUNCTIONS_MICROBIT.DEF_READ_HEART_RATE);
    return [`read_heart_rate(${pin})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getFsr402Force = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('fsr402_force_module_' + pin, "# Force Sensor on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getEmgDetector = function (block) {
    const pin = block.getFieldValue("PIN");
    Blockly.Python.addInit('emg_detector_module_' + pin, "# EMG Detector on " + pin);
    return [pin + ".read_analog()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_SHT31readData = function (block) {
    Blockly.Python.addImport('sht31', IMPORT_SHT31);
    Blockly.Python.addInit('sht31', 'sht31 = SHT31()');
    const data = block.getFieldValue("DATA");
    switch (data) {
        case "TEMP":
            let code;
            code = "sht31.get_temp_humi(data='t')";
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
            return ["sht31.get_temp_humi(data='h')", Blockly.Python.ORDER_ATOMIC];
        default:
            throw Error("Unhandled data option for sht31 sensor :'" + data + "'")
    }
};

Blockly.Python.sensors_getWaterLevel = function () {
    Blockly.Python.addImport('water-level-sensor', IMPORT_WATER_LEVEL_SENSOR);
    return ["waterLevelSensor.check_water_level()", Blockly.Python.ORDER_ATOMIC];
};