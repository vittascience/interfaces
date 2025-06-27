/**
 * @fileoverview Sensors generators for STM32.
 */

Blockly.Python.sensors_DHT11ReadData = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DHT11 Sensor');
    Blockly.Python.addImport('stm32_dht11', IMPORT_STM32_DHT11);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('dht11_' + pinName, "dht11_" + pinName + " = DHT11(" + pinName + ")");
    Blockly.Python.addFunction('dht_getMeasure', FUNCTIONS_WB55.DEF_DHT_GET_MEASURE);
    switch (block.getFieldValue('DATA')) {
        case 'TEMP':
            const unit = block.getFieldValue("UNIT") || "celsius";
            return ["dht_getMeasure(dht11_" + pinName + ", 't', unit='" + unit.toLowerCase() + "')", Blockly.Python.ORDER_ATOMIC];
        case 'HUM':
            return ["dht_getMeasure(dht11_" + pinName + ", 'h')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_DHT22ReadData = function (block) {
    const pin = block.getFieldValue("PIN");
    const pinName = Blockly.Python.Generators.digital_read(pin, 'DHT22 Sensor');
    Blockly.Python.addImport('stm32_dht22', IMPORT_STM32_DHT22);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addInit('dht22_' + pinName, "dht22_" + pinName + " = DHT22(" + pinName + ")");
    Blockly.Python.addFunction('dht_getMeasure', FUNCTIONS_WB55.DEF_DHT_GET_MEASURE);
    switch (block.getFieldValue('DATA')) {
        case 'TEMP':
            const unit = block.getFieldValue("UNIT") || "celsius";
            return ["dht_getMeasure(dht22_" + pinName + ", 't', unit='" + unit.toLowerCase() + "')", Blockly.Python.ORDER_ATOMIC];
        case 'HUM':
            return ["dht_getMeasure(dht22_" + pinName + ", 'h')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_VL53L0X_getRangeMillimeters = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_vl53l0x', IMPORT_STM32_VL53L0X);
    Blockly.Python.addInit('vl53l0x', "vl53l0x = VL53L0X(i2c=machine.I2C(1))");
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

Blockly.Python.sensors_getGroveMoisture = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Moisture Sensor');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveLight = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Light Sensor');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getPiezoVibration = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Vibration Sensor');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTilt = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Tilt Sensor');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getRainGauge = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Rain Sensor');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getAnemometer = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Anemometer');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveLineFinder = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Line Finder');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveMotion = function (block) {
    const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue("PIN"), 'Motion Sensor');
    return [pinName + ".value()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getO2gas = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Dioxygen Sensor');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_WB55.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('readO2', FUNCTIONS_WB55.DEF_O2SENSOR_READ);
    return ["readO2(" + pinName + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getAirQualityValue = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Air Quality Sensor');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTemperature = function (block) {
    Blockly.Python.addImport('math', IMPORT_MATH);
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Temperature Sensor');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addFunction('getGroveTemperature', FUNCTIONS_WB55.DEF_GROVE_GET_TEMP);
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
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveHighTemperature = function (block) {
    const pinA0Name = Blockly.Python.Generators.analog_read(block.getFieldValue("A0"), 'High Temperature thmc');
    const pinA1Name = Blockly.Python.Generators.analog_read(block.getFieldValue("A1"), 'High Temperature room');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addConstant('thmc_table', FUNCTIONS_WB55.DEF_GROVE_HIGHTEMP_THMC_TABLE);
    Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_WB55.DEF_GET_ANALOG_MEAN);
    Blockly.Python.addFunction('K_VtoT', FUNCTIONS_WB55.DEF_GROVE_HIGHTEMP_KVTOT);
    Blockly.Python.addFunction('getRoomTemp', FUNCTIONS_WB55.DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP);
    Blockly.Python.addFunction('getThmcTemp', FUNCTIONS_WB55.DEF_GROVE_HIGHTEMP_GET_THMC_TEMP);
    Blockly.Python.addPowerOn('highTemp_' + pinA0Name, "tempRoom_" + pinA0Name + " = getRoomTemp(" + pinA1Name + ")");
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

Blockly.Python.sensors_getGroveWaterAmount = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Water Sensor');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getUVindex = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'UV Sensor');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addFunction("getUVindex", FUNCTIONS_WB55.DEF_GROVE_GET_UV_INDEX);
    return ["getUVindex(" + pinName + ")", Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.sensors_getGroveSound = function (block) {
    const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue("PIN"), 'Sound Sensor');
    Blockly.Python.addImport('pyb', IMPORT_PYB);
    return [pinName + ".read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getBmp280Data = function (block) {
    const addr = block.getFieldValue("ADDR");
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('bmp280', IMPORT_STM32_BMP280);
    Blockly.Python.addInit('bmp280', "bmp280 = BMP280(i2c=machine.I2C(1), addr=" + addr + ")");
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

Blockly.Python.sensors_getSgp30Gas = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_sgp30', IMPORT_STM32_SGP30);
    Blockly.Python.addInit('sgp30', "sgp30 = SGP30(i2c=machine.I2C(1))");
    switch (block.getFieldValue("GAS")) {
        case "CO2":
            return ["sgp30.co2_equivalent()", Blockly.Python.ORDER_ATOMIC];
        case "TVOC":
            return ["sgp30.total_organic_compound()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_SCD30_readData = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addImport('stm32_scd30', IMPORT_STM32_SCD30);
    Blockly.Python.addInit('scd30_data', "scd30_data = [0, 0, 0]");
    Blockly.Python.addInit('t_scd', "t_scd = utime.ticks_ms()");
    Blockly.Python.addFunction('scd30_read', FUNCTIONS_WB55.DEF_SCD30_READ);
    Blockly.Python.addInit('scd30', "scd30 = SCD30(i2c=machine.I2C(1))");
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
    const co2ppm = Blockly.Python.valueToCode(block, "DEFAULT", Blockly.Python.ORDER_ATOMIC) || "0";
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('stm32_scd30', IMPORT_STM32_SCD30);
    Blockly.Python.addFunction('scd30_calibrateSensor', FUNCTIONS_WB55.DEF_SCD30_CALIBRATE);
    return "scd30_calibrateSensor(" + co2ppm + ")" + NEWLINE;
};

Blockly.Python.sensors_getMultichannelGas = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_gas', IMPORT_STM32_GAS);
    Blockly.Python.addInit('multichannel_gas', "multichannel = GAS(i2c=machine.I2C(1))");
    return ["multichannel.calc_gas(multichannel." + block.getFieldValue("GAS") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getParticulateMatter = function (block) {
    Blockly.Python.addImport('hm330x', IMPORT_STM32_HM330X);
    Blockly.Python.addInit('hm330x', "hm330x = HM330X(i2c=machine.I2C(1))");
    return ["hm330x.getData(" + block.getFieldValue("TYPE") + ")", Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.sensors_TH02readData = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_th02', IMPORT_STM32_TH02);
    Blockly.Python.addInit('th02', 'th02 = TH02(i2c=machine.I2C(1))');
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
    const data = block.getFieldValue("DATA");
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm32_sht31', IMPORT_STM32_SHT31);
    Blockly.Python.addInit('sht31', 'sht31 = SHT31(i2c=machine.I2C(1))');
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
    const objName = 'ds18x20_' + pinName;
    const objRoms = objName + '_roms';
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    Blockly.Python.addImport('onewire', IMPORT_ONEWIRE);
    Blockly.Python.addImport('stm32_ds18x20', IMPORT_STM32_DS18X20);
    Blockly.Python.addInit(objName, objName + " = DS18X20(onewire.OneWire(" + pinName + "))");
    Blockly.Python.addFunction('ds18x20_measure', FUNCTIONS_WB55.DEF_DS18B20_MEASURE);
    Blockly.Python.addPowerOn(objRoms, objRoms + " = " + objName + ".scan()");
    Blockly.Python.addPowerOn(objName + '_print', "print(\"[DS18X20_INFO - " + pin + "]: roms = \" + str(" + objRoms + "))");
    let code = "ds18x20_measure(" + objName + ", " + objRoms + ")";
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

Blockly.Python.sensors_getSi1145Light = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('stm_si1145', IMPORT_STM32_SI1145);
    Blockly.Python.addInit('si1145', "si1145 = SI1145(i2c=machine.I2C(1))");
    switch (block.getFieldValue("LIGHT")) {
        case "UV":
            return ["si1145.read_uv()", Blockly.Python.ORDER_ATOMIC];
        case "VIS":
            return ["si1145.read_visible()", Blockly.Python.ORDER_ATOMIC];
        case "IR":
            return ["si1145.read_ir()", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_colorSensor_getData = function (block) {
    Blockly.Python.addImport('stm32_colorSensor', IMPORT_STM32_COLOR_SENSOR);
    Blockly.Python.addInit('color_sensor', "colorSensor = TCS34725(i2c=machine.I2C(1))");
    return ["colorSensor.html_rgb()[" + block.getFieldValue("DATA") + "]", Blockly.Python.ORDER_ATOMIC];
};

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
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('utime', IMPORT_UTIME);
    switch (block.getFieldValue("SENSOR")) {
        case "GROVE":
            const pin = block.getFieldValue("PIN");
            const pinName = Blockly.Python.Generators.digital_write(pin, 'Ultrasonic');
            Blockly.Python.addFunction('grove_getUltrasonicData', FUNCTIONS_WB55.DEF_GROVE_ULTRASONIC);
            return ["grove_getUltrasonicData(" + pinName + ", data='" + data + "')", Blockly.Python.ORDER_ATOMIC];
        case "HC-SR04":
            const pinTRIG = block.getFieldValue("TRIG");
            const pinECHO = block.getFieldValue("ECHO");
            const pinName_TRIG = Blockly.Python.Generators.digital_write(pinTRIG, 'Ultrasonic TRIG');
            const pinName_ECHO = Blockly.Python.Generators.digital_read(pinECHO, 'Ultrasonic ECHO');
            Blockly.Python.addFunction('hcsr04_getUltrasonicData', FUNCTIONS_WB55.DEF_HCSR04_ULTRASONIC);
            return ["hcsr04_getUltrasonicData(" + pinName_TRIG + ", " + pinName_ECHO + ", data='" + data + "')", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python.sensors_accelerometerIntegrated_LIS2DW12 = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('LIS2DW12', IMPORT_LIS2DW12);
    Blockly.Python.addInit('accelerometer', 'accelerometer = LIS2DW12.LIS2DW12(machine.I2C(1))');
    const axis = block.getFieldValue("AXIS");
    return ["accelerometer." + axis + "()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_inclinometerIntegrated_LIS2DW12 = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('LIS2DW12', IMPORT_LIS2DW12);
    Blockly.Python.addImport('math', IMPORT_MATH);
    Blockly.Python.addInit('internal_i2c', 'i2c = machine.I2C(1)');
    Blockly.Python.addInit('accelerometer', 'accelerometer = LIS2DW12.LIS2DW12(i2c)');
    Blockly.Python.addFunction('internal_tilt_measure', FUNCTIONS_WB55.DEF_INCLINOMETER_INTEGRATED_LIS2DW12);
    const axis = block.getFieldValue("AXIS");
    return ["inclinometer_integrated_LIS2DW12(accelerometer, '" + axis + "')", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_accelerometerIntegrated_LSM6DSO = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('LSM6DSO', IMPORT_LSM6DSO);
    Blockly.Python.addInit('internal_i2c', 'i2c = machine.I2C(1)');
    Blockly.Python.addInit('inertial_sensor', 'inertial_sensor = LSM6DSO.LSM6DSO(i2c)');
    const axis = block.getFieldValue("AXIS");
    return ["inertial_sensor." + axis + "()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_gyroscopeIntegrated_LSM6DSO = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('LSM6DSO', IMPORT_LSM6DSO);
    Blockly.Python.addInit('internal_i2c', 'i2c = machine.I2C(1)');
    Blockly.Python.addInit('inertial_sensor', 'inertial_sensor = LSM6DSO.LSM6DSO(i2c)');
    var axis = block.getFieldValue("AXIS") || "";
    return ["inertial_sensor." + axis + "()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_magnetoscopeIntegrated_LIS2MDL = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('LIS2MDL', IMPORT_LIS2MDL);
    Blockly.Python.addInit('internal_i2c', 'i2c = machine.I2C(1)');
    Blockly.Python.addInit('magnetometer', 'magnetometer = LIS2MDL.LIS2MDL(i2c)');
    Blockly.Python.addPowerOn('get_measures', 'magnetometer.get()');
    var axis = block.getFieldValue("AXIS") || "";
    return ["magnetometer." + axis + "()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_thermometerIntegrated_LPS22HH = function (block) {
    Blockly.Python.addImport('machine', IMPORT_MACHINE);
    Blockly.Python.addImport('LPS22', IMPORT_LPS22);
    Blockly.Python.addInit('internal_i2c', 'i2c = machine.I2C(1)');
    Blockly.Python.addInit('thermometer', 'thermometer = LPS22.LPS22(i2c)');
    return ["thermometer.temperature()", Blockly.Python.ORDER_ATOMIC];
}
