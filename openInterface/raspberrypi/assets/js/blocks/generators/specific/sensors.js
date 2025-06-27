/**
 * @fileoverview Sensors generators for Esp32.
 */

// //Galaxia Sensors
// Blockly.Python.sensors_getAcceleration = function (block) {
// 	let axis = block.getFieldValue('AXIS');
// 	if (axis !== 'strength') {
// 		return ['accelerometer.get_' + axis + '()', Blockly.Python.ORDER_ATOMIC];
// 	} else {
// 		Blockly.Python.addImport('math', IMPORT_MATH);
// 		return ['math.sqrt(accelerometer.get_x()**2 + accelerometer.get_y()**2 + accelerometer.get_z()**2)', Blockly.Python.ORDER_ATOMIC];
// 	}
// };

// Blockly.Python.io_onMovement = function (block) {
// 	var branchCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
// 	return "if accelerometer.current_gesture() == '" + block.getFieldValue('MOV') + "' :" + NEWLINE + branchCode;
// };

// Blockly.Python.sensors_getLight = function () {
// 	return ['led.read_light_level()', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_calibrateCompass = function () {
// 	return 'compass.calibrate()' + NEWLINE;
// };

// Blockly.Python.sensors_getCompass = function () {
// 	return ['compass.heading()', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getTemperature = function (block) {
// 	var code = 'internal_temperature()';
// 	switch (block.getFieldValue('UNIT')) {
// 		case 'FAHRENHEIT':
// 			code += '*9/5 + 32';
// 			break;
// 		case 'KELVIN':
// 			code += ' + 273.15';
// 			break;
// 	}
// 	return [code, Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getRotation = function (block) {
// 	Blockly.Python.addImport('math', IMPORT_MATH);
// 	if (block.getFieldValue('AXIS') === 'pitch') {
// 		return ['math.atan2(accelerometer.get_y(), -accelerometer.get_z()) * 180.0/math.pi', Blockly.Python.ORDER_ATOMIC];
// 	} else {
// 		return ['math.atan2(accelerometer.get_x(), math.sqrt(accelerometer.get_y()**2 + accelerometer.get_z()**2)) * 180.0/math.pi', Blockly.Python.ORDER_ATOMIC];
// 	}
// };

// Blockly.Python.sensors_getMagneticForce = function (block) {
// 	var option = block.getFieldValue('AXIS');
// 	if (option == 'NORM') {
// 		Blockly.Python.addImport('math', IMPORT_MATH);
// 		return ['math.sqrt((compass.get_x() ** 2 + compass.get_y() ** 2) + compass.get_z() ** 2)', Blockly.Python.ORDER_ATOMIC];
// 	} else {
// 		return ['compass.get_' + option + '()', Blockly.Python.ORDER_ATOMIC];
// 	}
// };

// // Esp32 board sensors

// Blockly.Python.sensors_readHallSensor = function () {
// 	Blockly.Python.addImport('esp32', IMPORT_ESP32);
// 	return ['esp32.hall_sensor()', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_readProcessorTemperature = function (block) {
// 	Blockly.Python.addImport('esp32', IMPORT_ESP32);
// 	let code = '';
// 	switch (block.getFieldValue('UNIT')) {
// 		case 'CELSIUS':
// 			code += '(esp32.raw_temperature()-32)*5/9';
// 			break;
// 		case 'KELVIN':
// 			code += '(esp32.raw_temperature()-32)*5/9 + 273.15';
// 			break;
// 		case 'FAHRENHEIT':
// 			code += 'esp32.raw_temperature()';
// 			break;
// 		default:
// 			code += 'esp32.raw_temperature()';
// 			break;
// 	}
// 	return [code, Blockly.Python.ORDER_ATOMIC];
// };

// // Climate sensors

// Blockly.Python.sensors_linky = function (block) {
// 	Blockly.Python.addImport('esp32_linky', IMPORT_ESP32_LINKY);
// 	const pin = block.getFieldValue('PIN');
// 	Blockly.Python.addInit('linky_' + pin.replace('p', ''), '# Linky on ' + pin);
// 	Blockly.Python.addInit('linky', `linky = Linky(${pin.replace('p', '')}, unit=True)`);
// 	const mode = block.getFieldValue('ADDR');
// 	return [`linky.get_data("${mode}")`, Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getBmp280Data = function (block) {
// 	const addr = block.getFieldValue('ADDR');
// 	Blockly.Python.addImport('bmp280', IMPORT_ESP32_BMP280);
// 	Blockly.Python.addInit('bmp280', 'bmp280 = BMP280(i2c=I2C(scl=Pin(13), sda=Pin(14)), addr=' + addr + ')');
// 	Blockly.Python.addPowerOn('bmp280', 'bmp280.set_default_measure()');
// 	switch (block.getFieldValue('DATA')) {
// 		case 'TEMP':
// 			var code = 'bmp280.temperature()';
// 			if (block.getInput('TEMP_UNIT')) {
// 				switch (block.getFieldValue('UNIT')) {
// 					case 'FAHRENHEIT':
// 						code += '*9/5 + 32';
// 						break;
// 					case 'KELVIN':
// 						code += ' + 273.15';
// 						break;
// 				}
// 			}
// 			return [code, Blockly.Python.ORDER_ATOMIC];
// 		case 'PRESS':
// 			return ['bmp280.pressure()', Blockly.Python.ORDER_ATOMIC];
// 		case 'ALT':
// 			return ['bmp280.altitude()', Blockly.Python.ORDER_ATOMIC];
// 	}
// };

// // Gas sensors

// Blockly.Python.sensors_getSgp30Gas = function (block) {
// 	Blockly.Python.addImport('esp32_sgp30', IMPORT_ESP32_SGP30);
// 	Blockly.Python.addInit('sgp30', 'sgp30 = SGP30(i2c=I2C(scl=Pin(13), sda=Pin(14)))');
// 	switch (block.getFieldValue('GAS')) {
// 		case 'CO2':
// 			return ['sgp30.co2_equivalent()', Blockly.Python.ORDER_ATOMIC];
// 		case 'TVOC':
// 			return ['sgp30.total_organic_compound()', Blockly.Python.ORDER_ATOMIC];
// 	}
// };

// Blockly.Python.sensors_getO2gas = function (block) {
// 	const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue('PIN'), 'Dioxygen Sensor');
// 	Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_GALAXIA.DEF_GET_ANALOG_MEAN);
// 	Blockly.Python.addFunction('readO2', FUNCTIONS_GALAXIA.DEF_O2SENSOR_READ);
// 	return ['readO2(' + pinName + ')', Blockly.Python.ORDER_ATOMIC];
// };

// // SCD30 SENSOR _ READ CO2/TEMP/HUM BLOCK
// Blockly.Python.sensors_SCD30_readData = function (block) {
// 	Blockly.Python.addImport('esp32_scd30', IMPORT_ESP32_SCD30);
// 	Blockly.Python.addImport('utime', IMPORT_UTIME);
// 	Blockly.Python.addImport('math', IMPORT_MATH);
// 	Blockly.Python.addInit('scd30_data', 'scd30_data = [0, 0, 0]');
// 	Blockly.Python.addInit('t_scd', 't_scd = utime.ticks_ms()');
// 	Blockly.Python.addFunction('scd30_read', FUNCTIONS_GALAXIA.DEF_SCD30_READ);
// 	Blockly.Python.addInit('scd30', 'scd30 = SCD30(i2c=I2C(scl=Pin(13), sda=Pin(14)))');
// 	switch (block.getFieldValue('DATA')) {
// 		case 'CO2':
// 			return ['scd30_read(0)', Blockly.Python.ORDER_ATOMIC];
// 		case 'TEMP':
// 			var code = 'scd30_read(1)';
// 			if (block.getInput('TEMP_UNIT')) {
// 				switch (block.getFieldValue('UNIT')) {
// 					case 'FAHRENHEIT':
// 						code += '*9/5 + 32';
// 						break;
// 					case 'KELVIN':
// 						code += ' + 273.15';
// 						break;
// 				}
// 			}
// 			return [code, Blockly.Python.ORDER_ATOMIC];
// 		case 'HUM':
// 			return ['scd30_read(2)', Blockly.Python.ORDER_ATOMIC];
// 	}
// };

// //SCD30 SENSOR FORCE RECALIBRATION
// Blockly.Python.sensors_SCD30_forcedCalibration = function (block) {
// 	const co2ppm = Blockly.Python.valueToCode(block, 'DEFAULT', Blockly.Python.ORDER_NONE) || '0';
// 	Blockly.Python.addImport('esp32_scd30', IMPORT_ESP32_SCD30);
// 	Blockly.Python.addImport('utime', IMPORT_UTIME);
// 	Blockly.Python.addInit('scd30', 'scd30 = SCD30(i2c=I2C(scl=Pin(13), sda=Pin(14)))');
// 	Blockly.Python.addFunction('scd30_calibrateSensor', FUNCTIONS_GALAXIA.DEF_SCD30_CALIBRATE);
// 	return 'scd30.set_forced_recalibration(' + co2ppm + ')';
// };
// Blockly.Python.sensors_getMultichannelGas = function (block) {
// 	Blockly.Python.addImport('esp32_gas', IMPORT_ESP32_GAS);
// 	Blockly.Python.addInit('multichannel_gas', 'multichannel = GAS(i2c=I2C(scl=Pin(13), sda=Pin(14)))');
// 	return ['multichannel.calc_gas(multichannel.' + block.getFieldValue('GAS') + ')', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getAirQualityValue = function (block) {
// 	const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue('PIN'), 'Air Quality Sensor');
// 	return [pinName + '.read()', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getParticulateMatter = function (block) {
// 	Blockly.Python.addImport('hm330x', IMPORT_ESP32_HM330X);
// 	Blockly.Python.addInit('hm330x', 'hm330x = HM330X(i2c=I2C(scl=Pin(13), sda=Pin(14)))');
// 	return ['hm330x.getData(' + block.getFieldValue('TYPE') + ')', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_DHT11ReadData = function (block) {
// 	const pin = block.getFieldValue('PIN');
// 	const pinNumber = pin.replace('pin', '');
// 	const pinName = Blockly.Python.Generators.digital_read(pin, 'DHT11 Sensor');
// 	Blockly.Python.addImport('dht', IMPORT_DHT);
// 	Blockly.Python.addImport('utime', IMPORT_UTIME);
// 	Blockly.Python.addInit('dht11_' + pinNumber, 'dht11_' + pinNumber + ' = dht.DHT11(' + pinName + ')');
// 	Blockly.Python.addFunction('dht_getMeasure', FUNCTIONS_GALAXIA.DEF_DHT_GET_MEASURE);
// 	switch (block.getFieldValue('DATA')) {
// 		case 'TEMP':
// 			const unit = block.getFieldValue('UNIT') || 'celsius';
// 			return ['dht_getMeasure(dht11_' + pinNumber + ", 't', unit='" + unit.toLowerCase() + "')", Blockly.Python.ORDER_ATOMIC];
// 		case 'HUM':
// 			return ['dht_getMeasure(dht11_' + pinNumber + ", 'h')", Blockly.Python.ORDER_ATOMIC];
// 	}
// };

// Blockly.Python.sensors_DHT22ReadData = function (block) {
// 	const pin = block.getFieldValue('PIN');
// 	const pinNumber = pin.replace('p', '');
// 	const pinName = Blockly.Python.Generators.digital_read(pin, 'DHT22 Sensor');
// 	Blockly.Python.addImport('dht', IMPORT_DHT);
// 	Blockly.Python.addImport('utime', IMPORT_UTIME);
// 	Blockly.Python.addInit('dht22_' + pinNumber, 'dht22_' + pinNumber + ' = dht.DHT22(' + pinName + ')');
// 	Blockly.Python.addFunction('dht_getMeasure', FUNCTIONS_GALAXIA.DEF_DHT_GET_MEASURE);
// 	switch (block.getFieldValue('DATA')) {
// 		case 'TEMP':
// 			const unit = block.getFieldValue('UNIT') || 'celsius';
// 			return ['dht_getMeasure(dht22_' + pinNumber + ", 't', unit='" + unit.toLowerCase() + "')", Blockly.Python.ORDER_ATOMIC];
// 		case 'HUM':
// 			return ['dht_getMeasure(dht22_' + pinNumber + ", 'h')", Blockly.Python.ORDER_ATOMIC];
// 	}
// };

// Blockly.Python.sensors_TH02readData = function (block) {
// 	Blockly.Python.addImport('esp32_th02', IMPORT_ESP32_TH02);
// 	Blockly.Python.addInit('th02', 'th02 = TH02(i2c=I2C(scl=Pin(13), sda=Pin(14)))');
// 	let data = block.getFieldValue('DATA');
// 	switch (data) {
// 		case 'TEMP':
// 			var code = 'th02.get_temperature()';
// 			if (block.getInput('TEMP_UNIT')) {
// 				switch (block.getFieldValue('UNIT')) {
// 					case 'FAHRENHEIT':
// 						code += '*9/5 + 32';
// 						break;
// 					case 'KELVIN':
// 						code += ' + 273.15';
// 						break;
// 				}
// 			}
// 			return [code, Blockly.Python.ORDER_ATOMIC];
// 		case 'HUM':
// 			return ['th02.get_humidity()', Blockly.Python.ORDER_ATOMIC];
// 		default:
// 			throw Error("Unhandled data option for th02 sensor :'" + data + "'");
// 	}
// };





// Blockly.Python.sensors_getGroveHighTemperature = function (block) {
// 	const pinA0Name = Blockly.Python.Generators.analog_read(block.getFieldValue('A0'), 'High Temperature thmc');
// 	const pinA1Name = Blockly.Python.Generators.analog_read(block.getFieldValue('A1'), 'High Temperature room');
// 	Blockly.Python.addImport('math', IMPORT_MATH);
// 	Blockly.Python.addConstant('thmc_table', FUNCTIONS_GALAXIA.DEF_GROVE_HIGHTEMP_THMC_TABLE);
// 	Blockly.Python.addFunction('getAnalogMean', FUNCTIONS_GALAXIA.DEF_GET_ANALOG_MEAN);
// 	Blockly.Python.addFunction('K_VtoT', FUNCTIONS_GALAXIA.DEF_GROVE_HIGHTEMP_KVTOT);
// 	Blockly.Python.addFunction('getRoomTemp', FUNCTIONS_GALAXIA.DEF_GROVE_HIGHTEMP_GET_ROOM_TEMP);
// 	Blockly.Python.addFunction('getThmcTemp', FUNCTIONS_GALAXIA.DEF_GROVE_HIGHTEMP_GET_THMC_TEMP);
// 	Blockly.Python.addPowerOn('highTemp_tempRoom_' + pinA0Name, 'tempRoom_' + pinA0Name + ' = getRoomTemp(' + pinA1Name + ')');
// 	let code = 'getThmcTemp(' + pinA0Name + ', tempRoom_' + pinA0Name + ')';
// 	switch (block.getFieldValue('UNIT')) {
// 		case 'FAHRENHEIT':
// 			code += '*9/5 + 32';
// 			break;
// 		case 'KELVIN':
// 			code += ' + 273.15';
// 			break;
// 	}
// 	return [code, Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_SHT31readData = function (block) {
// 	const data = block.getFieldValue('DATA');
// 	Blockly.Python.addImport('esp32_sht31', IMPORT_ESP32_SHT31);
// 	Blockly.Python.addInit('sht31', 'sht31 = SHT31(i2c=I2C(scl=Pin(13), sda=Pin(14)))');
// 	switch (data) {
// 		case 'TEMP':
// 			var code;
// 			code = 'sht31.get_temp_humi()[0]';
// 			if (block.getInput('TEMP_UNIT')) {
// 				switch (block.getFieldValue('UNIT')) {
// 					case 'FAHRENHEIT':
// 						code += '*9/5 + 32';
// 						break;
// 					case 'KELVIN':
// 						code += ' + 273.15';
// 						break;
// 				}
// 			}
// 			return [code, Blockly.Python.ORDER_ATOMIC];
// 		case 'HUM':
// 			return ['sht31.get_temp_humi()[1]', Blockly.Python.ORDER_ATOMIC];
// 		default:
// 			throw Error("Unhandled data option for sht31 sensor :'" + data + "'");
// 	}
// };

// Blockly.Python.sensors_DS18B20_getTemperature = function (block) {
// 	const pin = block.getFieldValue('PIN');
// 	const objName = 'ds18b20_' + pin.replace('p', '');
// 	Blockly.Python.addImport('esp32_ds18b20', IMPORT_ESP32_DS18B20);
// 	Blockly.Python.addImport('onewire', IMPORT_ONEWIRE);
// 	Blockly.Python.addImport('utime', IMPORT_UTIME);
// 	Blockly.Python.addFunction('ds18b20_measure', FUNCTIONS_GALAXIA.DEF_DS18B20_MEASURE);
// 	Blockly.Python.addInit(objName, objName + ' = DS18X20(onewire.OneWire(Pin(' + pin.replace('p', '') + ')))');
// 	const objRoms = objName + '_roms';
// 	Blockly.Python.addPowerOn(objRoms, objRoms + ' = ' + objName + '.scan()');
// 	Blockly.Python.addPowerOn(objName + '_print', "print('[DS18B20_INFO - " + pin + "]: roms = ' + str(" + objRoms + '))');
// 	let code = 'ds18b20_measure(' + objName + ', ' + objRoms + '[0])';
// 	if (block.getInput('TEMP_UNIT')) {
// 		switch (block.getFieldValue('UNIT')) {
// 			case 'FAHRENHEIT':
// 				code += '*9/5 + 32';
// 				break;
// 			case 'KELVIN':
// 				code += ' + 273.15';
// 				break;
// 		}
// 	}
// 	return [code, Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getGroveWaterAmount = function (block) {
// 	const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue('PIN'), 'Water Sensor');
// 	return [pinName + '.read()', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getRainGauge = function (block) {
// 	const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue('PIN'), 'Rain Gauge');
// 	return [pinName + '.value()', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getAnemometer = function (block) {
// 	const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue('PIN'), 'Anemometer');
// 	return [pinName + '.value()', Blockly.Python.ORDER_ATOMIC];
// };



// Blockly.Python.sensors_getSi1145Light = function (block) {
// 	Blockly.Python.addImport('esp32_si1145', IMPORT_ESP32_SI1145);
// 	Blockly.Python.addInit('si1145', 'si1145 = SI1145(i2c=I2C(scl=Pin(13), sda=Pin(14)))');
// 	switch (block.getFieldValue('LIGHT')) {
// 		case 'UV':
// 			return ['si1145.read_uv()', Blockly.Python.ORDER_ATOMIC];
// 		case 'VIS':
// 			return ['si1145.read_visible()', Blockly.Python.ORDER_ATOMIC];
// 		case 'IR':
// 			return ['si1145.read_ir()', Blockly.Python.ORDER_ATOMIC];
// 	}
// };

// Blockly.Python.sensors_getUVindex = function (block) {
// 	const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue('PIN'), 'UV Sensor');
// 	Blockly.Python.addImport('utime', IMPORT_UTIME);
// 	Blockly.Python.addFunction('getUVindex', FUNCTIONS_GALAXIA.DEF_GROVE_GET_UV_INDEX);
// 	return ['getUVindex(' + pinName + ')', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_colorSensor_getData = function (block) {
// 	Blockly.Python.addImport('color_sensor', IMPORT_ESP32_COLOR_SENSOR);
// 	Blockly.Python.addInit('color_sensor', 'colorSensor = TCS34725(i2c=I2C(scl=Pin(13), sda=Pin(14)))');
// 	return ['colorSensor.html_rgb()[' + block.getFieldValue('DATA') + ']', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getGroveSound = function (block) {
// 	const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue('PIN'), 'Sound Sensor');
// 	return [pinName + '.read()', Blockly.Python.ORDER_ATOMIC];
// };

// // Distance & Movement sensors



// Blockly.Python.sensors_getGroveLineFinder = function (block) {
// 	const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue('PIN'), 'Line Finder');
// 	return [pinName + '.value()', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getGroveMotion = function (block) {
// 	const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue('PIN'), 'Motion Sensor');
// 	return [pinName + '.value()', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getPiezoVibration = function (block) {
// 	const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue('PIN'), 'Vibration Sensor');
// 	return [pinName + '.value()', Blockly.Python.ORDER_ATOMIC];
// };

// Blockly.Python.sensors_getGroveTilt = function (block) {
// 	const pinName = Blockly.Python.Generators.digital_read(block.getFieldValue('PIN'), 'Tilt Sensor');
// 	return [pinName + '.value()', Blockly.Python.ORDER_ATOMIC];
// };

// Raspberry
Blockly.Python.sensors_getGroveUltrasonicRanger = function (block) {
	const pin = block.getFieldValue('PIN');
    Blockly.Python.addImport('ultrasonic_ranger', IMPORT_ULTRASONIC_RANGER);
	// Blockly.Python.addFunction('grove_getUltrasonicData', FUNCTIONS_GALAXIA.DEF_GROVE_ULTRASONIC);

	Blockly.Python.addInit('ultrasonic_grove_' + pin, '# Ultrasonic on ' + pin);
    Blockly.Python.addInit('sonar', `sonar = GroveUltrasonicRanger(${pin})`); 
	return ['sonar.get_distance()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveTemperature = function (block) {
	Blockly.Python.addImport('math', IMPORT_MATH);
	Blockly.Python.addImport('ADC', IMPORT_ADC);
	const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue('PIN'), 'Temperature Sensor');
	const unit = block.getFieldValue('UNIT') || 'celsius';
	// Blockly.Python.addInit('grove_temp_' + pinName, '# Temperature Sensor on slot'+ pinName);
	// Blockly.Python.addInit('ADC', `adc = ADC(${pinName})`);
	Blockly.Python.addFunction('grove_getTemperature', FUNCTIONS_RASPBERRY.DEF_GROVE_GET_TEMP);
	return [`getGroveTemperature(adc_${pinName}, unit="` + unit.toLowerCase() + '")', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_getGroveMoisture = function (block) {
	Blockly.Python.addImport('ADC', IMPORT_ADC);
	const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue('PIN'), 'Moisture Sensor');
	// Blockly.Python.addInit('grove_moist_' + pinName, '# Moisture Sensor on slot'+ pinName);
	// Blockly.Python.addInit('ADC', `adc = ADC(${pinName})`);
	return [`adc_${pinName}.read_analog()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensors_DHT11ReadData = function (block) {
	const pin = block.getFieldValue('PIN');
	// const pinNumber = pin.replace('pin', '');
	Blockly.Python.addImport('dht', IMPORT_DHT);
	Blockly.Python.addImport('time', IMPORT_TIME);
	// Blockly.Python.addPowerOn('dht11_' + pin, "# DHT11 Sensor on " + pin);
	Blockly.Python.addInit('dht_' + pin, 'dht_' + pin + ' = DHT("11", ' + pin + ')');
	Blockly.Python.addFunction('dht_getMeasure', FUNCTIONS_RASPBERRY.DEF_DHT_GET_MEASURE);
	switch (block.getFieldValue('DATA')) {
		case 'TEMP':
			const unit = block.getFieldValue('UNIT') || 'celsius';
			return ['dht_getMeasure(dht_' + pin + ", 't', unit='" + unit.toLowerCase() + "')", Blockly.Python.ORDER_ATOMIC];
		case 'HUM':
			return ['dht_getMeasure(dht_' + pin + ", 'h')", Blockly.Python.ORDER_ATOMIC];
	}
};

// // Sound & Light sensors

Blockly.Python.sensors_getGroveLight = function (block) {
	Blockly.Python.addImport('ADC', IMPORT_ADC);
	const pinName = Blockly.Python.Generators.analog_read(block.getFieldValue('PIN'), 'Light Sensor');
	// Blockly.Python.addInit('grove_light_' + pinName, '# Light Sensor on slot'+ pinName);
	// Blockly.Python.addInit(`ADC_${pinName}`, `adc_${pinName} = ADC(${pinName})`);
	return [`adc_${pinName}.read()`, Blockly.Python.ORDER_ATOMIC];
};

// rpi camera
Blockly.Python.sensors_rpi_camera_take_picture = function (block) {
	Blockly.Python.addImport('picamera', IMPORT_RPI_CAMERA);
	Blockly.Python.addImport('time', IMPORT_TIME);
	Blockly.Python.addInit('camera', 'picam = Camera()');
	return `picam.get_frame()`;
};

Blockly.Python.sensors_rpi_camera_take_video = function (block) {
	Blockly.Python.addImport('picamera', IMPORT_RPI_CAMERA);
	Blockly.Python.addImport('time', IMPORT_TIME);
	Blockly.Python.addInit('camera', 'picam = Camera()');
	const duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || '0';
	return `picam.get_record(${duration}) ${NEWLINE}`;
};
