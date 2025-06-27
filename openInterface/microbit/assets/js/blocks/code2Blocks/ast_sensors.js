import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

// luminosity
utils.prototypeBlocks['display.read_light_level'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getLight',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// temperature
utils.prototypeBlocks['temperature'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getTemperature',
		fields: { UNIT: 'CELSIUS' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// accelerometer
utils.prototypeBlocks['accelerometer.get_x'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getAcceleration',
		fields: { AXIS: 'x' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['accelerometer.get_y'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getAcceleration',
		fields: { AXIS: 'x' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['accelerometer.get_z'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getAcceleration',
		fields: { AXIS: 'z' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// compass
utils.prototypeBlocks['compass.heading'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getCompass',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['compass.get_x'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getMagneticForce',
		fields: { AXIS: 'x' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['compass.get_y'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getMagneticForce',
		fields: { AXIS: 'y' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['compass.get_z'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getMagneticForce',
		fields: { AXIS: 'z' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['compass.is_calibrated'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_isCompassCalibrated',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['compass.calibrate'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_calibrateCompass',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// Envirobit
// TCS3472

utils.prototypeBlocks['TCS3472'] = function (node, identifier) {
	const pin = utils.getArgumentList(node.children[1].children)[0];
	if (pin.text !== 'pin8') return null;

	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;

	classe.pin = pin.text;

	return 'TCS3472';
};

utils.prototypeBlocks['tcs3472.brightness'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_envirobit_tcs3472_getBrightness',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// subscript methode to tcs3472.rgb() 0=> red, 1=> green, 2=> blue
utils.prototypeBlocks['tcs3472.rgb()'] = function (identifier, index) {
	let color = '0';

	if (index.text === '1') color = '1';
	if (index.text === '2') color = '2';

	return {
		type: 'sensors_envirobit_tcs3472_getRGB',
		fields: { DATA: color },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['tcs3472.set_leds'] = function (type, fields, values, mutations, statementsNode, statement) {
	let state = { type: 'bypass', block: 'io_digital_signal', text: '1' };

	if (statementsNode.length > 0) {
		if (statementsNode[0].type === 'integer' && statementsNode[0].text === '0') {
			state = { type: 'bypass', block: 'io_digital_signal', text: statementsNode[0].text };
		}
	}

	return {
		type: 'sensors_envirobit_tcs3472_setLED',
		fields: null,
		values: { STATE: null },
		mutations: null,
		statementsNode: { STATE: state },
		statements: null,
	};
};

// BME280
utils.prototypeBlocks['BME280'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;

	return 'BME280';
};

utils.prototypeBlocks['bme280.temperature'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_envirobit_bme280_getData',
		fields: { UNIT: 'CELSIUS', DATA: 'TEMP' },
		values: null,
		mutations: { temp: 'true' },
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['bme280.humidity'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_envirobit_bme280_getData',
		fields: { DATA: 'HUM' },
		values: null,
		mutations: { temp: 'false' },
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['bme280.pressure'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_envirobit_bme280_getData',
		fields: { DATA: 'PRESS' },
		values: null,
		mutations: { temp: 'false' },
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['bme280.altitude'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_envirobit_bme280_getData',
		fields: { DATA: 'ALT' },
		values: null,
		mutations: { temp: 'false' },
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['envirobit_readSound'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_envirobit_getSoundLevel',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['envirobit_waitForClap'] = function (type, fields, values, mutations, statementsNode, statement) {
	let duration = { type: 'integer', text: '1', children: [] };
	const { key, value } = utils.extractKeyWordArgument(statementsNode[0]);
	if (key !== null && key.text === 'timeout' && value !== null) {
		if (value.type === 'binary_operator') {
			if ((value.children[0].type === 'integer' || value.children[0].type === 'float') && (value.children[1] === 'integer' || value.children[1] === 'float')) {
				duration.text = (Number(value.children[0].text) * Number(value.children[1].text)) / 1000;
			} else if (value.children[0].type === 'identifier') {
				duration = value.children[0];
			}
		}
	}
	return {
		type: 'sensors_envirobit_waitForClaps',
		fields: { CLAPS: '1' },
		values: { DURATION: null },
		mutations: null,
		statementsNode: { DURATION: duration },
		statements: null,
	};
};

utils.prototypeBlocks['envirobit_waitForDoubleClap'] = function (type, fields, values, mutations, statementsNode, statement) {
	let duration = { type: 'integer', text: '1', children: [] };
	const { key, value } = utils.extractKeyWordArgument(statementsNode[0]);
	if (key !== null && key.text === 'timeout' && value !== null) {
		if (value.type === 'binary_operator') {
			if ((value.children[0].type === 'integer' || value.children[0].type === 'float') && (value.children[1] === 'integer' || value.children[1] === 'float')) {
				duration.text = (Number(value.children[0].text) * Number(value.children[1].text)) / 1000;
			} else if (value.children[0].type === 'identifier') {
				duration = value.children[0];
			}
		}
	}
	return {
		type: 'sensors_envirobit_waitForClaps',
		fields: { CLAPS: '2' },
		values: { DURATION: null },
		mutations: null,
		statementsNode: { DURATION: duration },
		statements: null,
	};
};

// weatherbit
utils.prototypeBlocks['anemometer_getWindSpeed'] = function (type, fields, values, mutations, statementsNode, statement) {
	let unit = 'M_S';
	let pin = null;

	if (statementsNode.length > 0) {
		pin = statementsNode[0];
		for (const arg of statementsNode) {
			if (arg.type === 'keyword_argument' && arg.children[0].text === 'unit') {
				let unitValueNode = arg.children[2];
				if (unitValueNode.type === 'string') {
					let unitValue = unitValueNode.text.replace(/['"]/g, '');
					const unitMapping = {
						'm/s': 'M_S',
						'km/h': 'KM_H',
						'inch/s': 'INCH_S',
						knot: 'KNOT',
					};
					unit = unitMapping[unitValue] || 'M_S';
				}
				break;
			}
		}
	}

	return {
		type: 'sensors_weatherbit_anemometer_getSpeed',
		fields: { UNIT: unit },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['weathercock_getDirection'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_weatherbit_weathercock_getDirection',
		fields: null,
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['SGP30'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'SGP30';
	return 'SGP30';
};

utils.prototypeBlocks['sgp30.eCO2'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getSgp30Gas',
		fields: { GAS: 'CO2' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['sgp30.TVOC'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getSgp30Gas',
		fields: { GAS: 'TVOC' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// Multichannel Gas Sensor
utils.prototypeBlocks['GAS'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'GAS';
	return 'GAS';
};

utils.prototypeBlocks['power_on'] = function (type, fields, values, mutations, statementsNode, statement) {
	return 'null';
};

utils.prototypeBlocks['multichannel.get_gas'] = function (type, fields, values, mutations, statementsNode, statement) {
	let gas = '0'; // CO par défaut
	const gasMapping = { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7' };

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'integer') {
		const gasValue = statementsNode[0].text;
		if (gasMapping[gasValue]) {
			gas = gasValue;
		}
	}

	return {
		type: 'sensors_getMultichannelGas',
		fields: { GAS: gas },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// Multichannel Gas V2
utils.prototypeBlocks['GAS_GMXXX'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'GAS_GMXXX';
	return 'GAS_GMXXX';
};

utils.prototypeBlocks['multichannel_v2.calcVol'] = function (type, fields, values, mutations, statementsNode, statement) {
	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'call') {
		const measureCall = statementsNode[0];
		for (const child of measureCall.children) {
			if (child.type === 'attribute') {
				const methodName = child.text;
				if (methodName.includes('measure_NO2')) {
					return {
						type: 'sensors_getMultichannelGasV2',
						fields: { GAS: 'NO2' },
						values: null,
						mutations: null,
						statementsNode: null,
						statements: null,
					};
				} else if (methodName.includes('measure_CO')) {
					return {
						type: 'sensors_getMultichannelGasV2',
						fields: { GAS: 'CO' },
						values: null,
						mutations: null,
						statementsNode: null,
						statements: null,
					};
				} else if (methodName.includes('measure_C2H5OH')) {
					return {
						type: 'sensors_getMultichannelGasV2',
						fields: { GAS: 'C2H5OH' },
						values: null,
						mutations: null,
						statementsNode: null,
						statements: null,
					};
				} else if (methodName.includes('measure_VOC')) {
					return {
						type: 'sensors_getMultichannelGasV2',
						fields: { GAS: 'VOC' },
						values: null,
						mutations: null,
						statementsNode: null,
						statements: null,
					};
				}
			}
		}
	}
	return null;
};

// Fonctions de lecture O2 (avec pin)
utils.prototypeBlocks['readO2'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin0';
	const validPins = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4', 'pin10'];

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'identifier') {
		const pinValue = statementsNode[0].text;
		if (validPins.includes(pinValue)) {
			pin = pinValue;
		}
	}

	return {
		type: 'sensors_getO2gas',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// SCD30 Sensor
utils.prototypeBlocks['SCD30'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'SCD30';
	return 'SCD30';
};

utils.prototypeBlocks['scd30_data'] = function () {
	return 'null';
};

utils.prototypeBlocks['t_scd'] = function () {
	return 'null';
};

utils.prototypeBlocks['scd30_read'] = function (type, fields, values, mutations, statementsNode, statement) {
	let dataType = 'CO2';

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'integer') {
		const index = statementsNode[0].text;
		switch (index) {
			case '0':
				dataType = 'CO2';
				break;
			case '1':
				dataType = 'TEMP';
				break;
			case '2':
				dataType = 'HUM';
				break;
		}
	}

	return {
		type: 'sensors_SCD30_readData',
		fields: { DATA: dataType },
		values: {},
		mutations: { temp: dataType === 'TEMP' ? 'true' : 'false' },
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['scd30_calibrateSensor'] = function (type, fields, values, mutations, statementsNode, statement) {
	const defaultValue = { type: 'integer', text: '400' };
	const valueArg = statementsNode && statementsNode[0] ? statementsNode[0] : defaultValue;

	return {
		type: 'sensors_SCD30_forcedCalibration',
		fields: {},
		values: { DEFAULT: null },
		mutations: null,
		statementsNode: { DEFAULT: valueArg },
		statements: null,
	};
};

utils.prototypeBlocks['#AirQualitySensoron'] = function (pin, statementsNode, parent) {
	return {
		type: 'sensors_getAirQualityValue',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// HM330X Particulate Matter
utils.prototypeBlocks['HM330X'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'HM330X';
	return 'HM330X';
};

utils.prototypeBlocks['hm3301.getData'] = function (type, fields, values, mutations, statementsNode, statement) {
	let particleType = '3'; // PM1 par défaut
	const typeMapping = { 3: '3', 4: '4', 5: '5' };

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'integer') {
		const typeValue = statementsNode[0].text;
		if (typeMapping[typeValue]) {
			particleType = typeValue;
		}
	}

	return {
		type: 'sensors_getParticulateMatter',
		fields: { TYPE: particleType },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// ========== CAPTEURS CLIMAT ==========

// BMP280 Sensor
utils.prototypeBlocks['BMP280'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	// Extraire l'adresse I2C si spécifiée
	let addr = '0x76';
	if (node.children && node.children[1] && node.children[1].type === 'argument_list') {
		const args = utils.getArgumentList(node.children[1].children);
		if (args.length > 0 && args[0].type === 'integer') {
			addr = '0x' + parseInt(args[0].text).toString(16);
		}
	}

	classe.sensor = 'BMP280';
	classe.addr = addr;
	return 'BMP280';
};

utils.prototypeBlocks['bmp280.Temperature'] = function (type, fields, values, mutations, statementsNode, statement) {
	const classe = utils.python2Blocks._classes['bmp280'];
	if (!classe || classe.sensor !== 'BMP280') return null;

	return {
		type: 'sensors_getBmp280Data',
		fields: { ADDR: classe.addr, DATA: 'TEMP' },
		values: {},
		mutations: { temp: 'true' },
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['bmp280.Pressure'] = function (type, fields, values, mutations, statementsNode, statement) {
	const classe = utils.python2Blocks._classes['bmp280'];
	if (!classe || classe.sensor !== 'BMP280') return null;
	return {
		type: 'sensors_getBmp280Data',
		fields: { ADDR: classe.addr, DATA: 'PRESS' },
		values: {},
		mutations: { temp: 'false' },
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['bmp280.Altitude'] = function (type, fields, values, mutations, statementsNode, statement) {
	const classe = utils.python2Blocks._classes['bmp280'];
	if (!classe || classe.sensor !== 'BMP280') return null;
	return {
		type: 'sensors_getBmp280Data',
		fields: { ADDR: classe.addr, DATA: 'ALT' },
		values: {},
		mutations: { temp: 'false' },
		statementsNode: {},
		statements: null,
	};
};

// Moisture Grove sensor
utils.prototypeBlocks['#MoistureSensoron'] = function (pin, statementsNode, parent) {
	return {
		type: 'sensors_getGroveMoisture',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// Capacitif Moisture Grove sensor
utils.prototypeBlocks['#CapacitiveMoistureSensoron'] = function (pin, statementsNode, parent) {
	return {
		type: 'sensors_getGroveCapacitiveMoisture',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// Fonctions Grove avec pins
utils.prototypeBlocks['getGroveTemperature'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin0';
	let unit = 'CELSIUS';
	const validPins = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4', 'pin10'];

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'identifier') {
		const pinValue = statementsNode[0].text;
		if (validPins.includes(pinValue)) {
			pin = pinValue;
		}
	}

	// Vérifier les arguments nommés pour l'unité
	if (statementsNode) {
		for (const arg of statementsNode) {
			if (arg.type === 'keyword_argument') {
				const { key, value } = utils.extractKeyWordArgument(arg);
				if (key && key.text === 'unit' && value && value.type === 'string') {
					const unitValue = utils.extractString(value).text;
					switch (unitValue) {
						case 'fahrenheit':
							unit = 'FAHRENHEIT';
							break;
						case 'kelvin':
							unit = 'KELVIN';
							break;
						default:
							unit = 'CELSIUS';
							break;
					}
				}
			}
		}
	}

	return {
		type: 'sensors_getGroveTemperature',
		fields: { UNIT: unit, PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// first part of the getThmcTemp function
const tempRoomArray = ['0', '1', '2', '3', '4', '10'];
for (const i of tempRoomArray) {
	utils.prototypeBlocks[`tempRoom_${i}`] = function (node) {
		const classe = utils.python2Blocks._classes;
		classe['getThmcTemp'] = {};
		let pin = 'pin0';
		if (node.type === 'call') {
			for (const child of node.children) {
				if (child.type === 'argument_list') {
					const args = utils.getArgumentList(child.children);
					if (args.length > 0 && args[0].type === 'identifier') {
						pin = args[0].text;
						const validPins = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4', 'pin10'];
						if (!validPins.includes(pin)) {
							continue;
						}
					} else {
						continue;
					}
				}
			}
		}

		classe['getThmcTemp'].pin = pin;
		return 'null';
	};
}

utils.prototypeBlocks['Var_VtoT_K'] = function () {
	return 'null';
};

utils.prototypeBlocks['getThmcTemp'] = function (type, fields, values, mutations, statementsNode, statement) {
	const classe = utils.python2Blocks._classes['getThmcTemp'];
	if (!classe) return null;
	const pinRoomTemp = classe.pin || 'pin0';

	let pin = 'pin0';

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'identifier') {
		const pinValue = statementsNode[0].text;
		const validPins = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4', 'pin10'];
		if (validPins.includes(pinValue)) {
			pin = pinValue;
		}
	}

	return {
		type: 'sensors_getGroveHighTemperature',
		fields: { A1: pinRoomTemp, A0: pin, UNIT: 'CELSIUS' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// hp206c
utils.prototypeBlocks['HP206C'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;

	classe.sensor = 'HP206C';
	return 'HP206C';
};

// hp206c prototype blocks
utils.prototypeBlocks['HP206C'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;

	classe.sensor = 'HP206C';
	return 'HP206C';
};

utils.prototypeBlocks['hp206c.get_measurement'] = function (type, fields, values, mutations, statementsNode, statement) {
	if (!statementsNode || statementsNode.length === 0) {
		return null;
	}

	const measurementType = statementsNode[0];
	let dataType = 'TEMP';
	let tempUnit = null;

	if (measurementType.type === 'string') {
		const measurementValue = measurementType.text.replace(/['"]/g, '');

		switch (measurementValue) {
			case 'temp_celsius':
				dataType = 'TEMP';
				break;
			case 'temp_fahrenheit':
				dataType = 'TEMP';
				tempUnit = 'FAHRENHEIT';
				break;
			case 'pressure':
				dataType = 'PRESS';
				break;
			case 'altitude':
				dataType = 'ALT';
				break;
			default:
				dataType = 'TEMP';
		}
	}

	const barometerBlock = {
		type: 'sensors_barometerReadData',
		fields: {
			DATA: dataType,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};

	if (dataType === 'TEMP' && tempUnit) {
		barometerBlock.mutations = { temp_unit: true };
		barometerBlock.fields.UNIT = tempUnit;
	}

	return barometerBlock;
};

// DHT11 Sensors
utils.prototypeBlocks['DHT11'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;

	// Extraire le pin
	let pin = 'pin0';
	if (node.children && node.children[1] && node.children[1].type === 'argument_list') {
		const args = utils.getArgumentList(node.children[1].children);
		if (args.length > 0 && args[0].type === 'identifier') {
			pin = args[0].text;
		}
	}

	classe.sensor = 'DHT11';
	classe.pin = pin;
	return 'DHT11';
};

// Méthode getData pour DHT11 (avec pattern dht11_X.getData(d=1 ou d=2))
utils.prototypeBlocks['getData'] = function (dataType, instanceName, parentNode, mutations, statementsNode, statement, parent) {
	const dhtInstance = utils.python2Blocks._classes[instanceName];
	if (!dhtInstance || dhtInstance.sensor !== 'DHT11') return null;

	// Déterminer le type de données en fonction du paramètre d
	let dataField = 'TEMP'; // valeur par défaut
	let boardVersion = 'v1'; // valeur par défaut

	if (statementsNode && statementsNode.length > 0) {
		// Chercher l'argument d= dans les paramètres
		for (const arg of statementsNode) {
			if (arg.type === 'keyword_argument') {
				const keyValue = utils.extractKeyWordArgument(arg);
				if (keyValue.key && keyValue.key.text === 'd') {
					if (keyValue.value.text === '1') {
						dataField = 'TEMP';
					} else if (keyValue.value.text === '2') {
						dataField = 'HUM';
					}
				}
			}
		}
	}

	if (utils.python2Blocks._importFullNames.has('dht11_v2.DHT11')) {
		boardVersion = 'v2';
	}

	const dhtBlock = {
		type: 'sensors_dhtReadData',
		fields: {
			DATA: dataField,
			PIN: dhtInstance.pin,
			BOARD: boardVersion,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};

	// Gérer les conversions de température si c'est dans une expression
	if (parent && parent.type === 'binary_operator' && dataField === 'TEMP') {
		const tempUnit = detectTemperatureUnit(parent);
		if (tempUnit) {
			dhtBlock.mutations = { temp_unit: true };
			dhtBlock.fields.UNIT = tempUnit;
		}
	}

	return dhtBlock;
};

// TH02, SHT31, SHT35 sensors (I2C, sans pin)
utils.prototypeBlocks['TH02'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'TH02';
	return 'TH02';
};

utils.prototypeBlocks['th02.ReadTemperature'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_TH02readData',
		fields: { DATA: 'TEMP' },
		values: {},
		mutations: { temp: 'true' },
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['th02.ReadHumidity'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_TH02readData',
		fields: { DATA: 'HUM' },
		values: {},
		mutations: { temp: 'false' },
		statementsNode: {},
		statements: null,
	};
};

// SHT31
utils.prototypeBlocks['SHT31'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'SHT31';
	return 'SHT31';
};

utils.prototypeBlocks['sht31.get_temp_humi'] = function (type, fields, values, mutations, statementsNode, statement) {
	let data = 'TEMP';

	// Vérifier les arguments nommés
	if (statementsNode) {
		for (const arg of statementsNode) {
			if (arg.type === 'keyword_argument') {
				const { key, value } = utils.extractKeyWordArgument(arg);
				if (key && key.text === 'data' && value && value.type === 'string') {
					const dataValue = utils.extractString(value).text;
					data = dataValue === 'h' ? 'HUM' : 'TEMP';
				}
			}
		}
	}

	return {
		type: 'sensors_SHT31readData',
		fields: { DATA: data },
		values: {},
		mutations: { temp: data === 'TEMP' ? 'true' : 'false' },
		statementsNode: {},
		statements: null,
	};
};

// SHT35
utils.prototypeBlocks['SHT35'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'SHT35';
	return 'SHT35';
};

utils.prototypeBlocks['sht35.get_measurement'] = function (type, fields, values, mutations, statementsNode, statement) {
	let data = 'TEMP';
	let tempUnit = 'CELSIUS';
	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
		const measurementType = utils.extractString(statementsNode[0]).text;
		switch (measurementType) {
			case 'temp_celsius':
				data = 'TEMP';
				tempUnit = 'CELSIUS';
				break;
			case 'temp_fahrenheit':
				data = 'TEMP';
				tempUnit = 'FAHRENHEIT';
				break;
			case 'humidity':
				data = 'HUM';
				break;
		}
	}

	return {
		type: 'sensors_SHT35readData',
		fields: { DATA: data, UNIT: tempUnit },
		values: {},
		mutations: { temp: data === 'TEMP' ? 'true' : 'false' },
		statementsNode: {},
		statements: null,
	};
};

utils.prototypeBlocks['mpx5700_readPressure'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin0';
	const validPins = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4', 'pin10'];
	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'identifier') {
		const pinValue = statementsNode[0].text;
		if (validPins.includes(pinValue)) {
			pin = pinValue;
		}
	}
	return {
		type: 'sensors_mpx5700ap_getPressure',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#WaterSensoron'] = function (pin, statementsNode, parent) {
	let pinValue = pin;
	if (pinValue) {
		const validPins = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4', 'pin10'];
		if (!validPins.includes(pinValue)) {
			pinValue = 'pin0'; // valeur par défaut si le pin n'est pas valide
		}
	}
	return {
		type: 'sensors_getGroveWaterAmount',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#RainGaugeon'] = function (pin, statementsNode, parent) {
	if (pin) {
		const validPins = ['pin0', 'pin1', 'pin2', 'pin8', 'pin9', 'pin12', 'pin13', 'pin14', 'pin15', 'pin16', 'pin19', 'pin20', 'pin_speaker'];
		if (!validPins.includes(pin)) {
			pinValue = 'pin0'; // valeur par défaut si le pin n'est pas valide
		}
	}
	return {
		type: 'sensors_getRainGauge',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#Anemometeron'] = function (pin, statementsNode, parent) {
	let pinValue = pin;
	if (pinValue) {
		pinValue = statementsNode[0].text;
		const validPins = ['pin0', 'pin1', 'pin2', 'pin8', 'pin9', 'pin12', 'pin13', 'pin14', 'pin15', 'pin16', 'pin19', 'pin20', 'pin_speaker'];
		if (!validPins.includes(pinValue)) {
			pinValue = 'pin0'; // valeur par défaut si le pin n'est pas valide
		}
	}
	return {
		type: 'sensors_getAnemometer',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// ========== CAPTEURS LUMIÈRE ET SON ==========

utils.prototypeBlocks['#LightSensoron'] = function (pin, statementsNode, parent) {
	let pinValue = pin;
	if (pinValue) {
		const validPins = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4', 'pin10'];
		if (!validPins.includes(pinValue)) {
			pinValue = 'pin0'; // valeur par défaut si le pin n'est pas valide
		}
	}
	return {
		type: 'sensors_getGroveLight',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// SI1145 Light Sensor
utils.prototypeBlocks['SI1145'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'SI1145';
	return 'SI1145';
};

utils.prototypeBlocks['si1145.readUV'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getSi1145Light',
		fields: { LIGHT: 'UV' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['si1145.readVisible'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getSi1145Light',
		fields: { LIGHT: 'VIS' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['si1145.readIR'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getSi1145Light',
		fields: { LIGHT: 'IR' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// Fonctions utilitaires avec pins
utils.prototypeBlocks['getUVindex'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin0';
	const validPins = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4', 'pin10'];

	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'identifier') {
		const pinValue = statementsNode[0].text;
		if (validPins.includes(pinValue)) {
			pin = pinValue;
		}
	}

	return {
		type: 'sensors_getUVindex',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#SoundSensoron'] = function (pin, statementsNode, parent) {
	let pinValue = pin;
	if (pinValue) {
		const validPins = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4', 'pin10'];
		if (!validPins.includes(pinValue)) {
			pinValue = 'pin0'; // valeur par défaut si le pin n'est pas valide
		}
	}
	return {
		type: 'sensors_getGroveSound',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// ========== CAPTEURS DISTANCE ET MOUVEMENT ==========
// Capteur ultrasonique Grove/HC-SR04
utils.prototypeBlocks['getUltrasonicData'] = function (type, fields, values, mutations, statementsNode, statement) {
	if (!statementsNode || statementsNode.length < 3) {
		return null;
	}

	const pinTRIG = statementsNode[0];
	const pinECHO = statementsNode[1];
	const dataType = statementsNode[2];

	// Déterminer le type de capteur
	let sensorType = 'GROVE';
	if (pinTRIG.text !== pinECHO.text) {
		// Si TRIG et ECHO sont différents, c'est HC-SR04
		sensorType = 'HC-SR04';
	}

	// Déterminer le type de données
	let dataField = 'DIST'; // valeur par défaut
	if (dataType.type === 'string') {
		const dataValue = dataType.text.replace(/['"]/g, '');
		switch (dataValue) {
			case 'distance':
				dataField = 'DIST';
				break;
			case 'duration':
				dataField = 'TIME';
				break;
		}
	}

	const ultrasonicBlock = {
		type: 'sensors_getGroveUltrasonicRanger',
		fields: {
			SENSOR: sensorType,
			DATA: dataField,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};

	// Ajouter les champs de pin selon le type de capteur
	if (sensorType === 'GROVE') {
		ultrasonicBlock.fields.PIN = pinTRIG.text;
	} else if (sensorType === 'HC-SR04') {
		ultrasonicBlock.fields.TRIG = pinTRIG.text;
		ultrasonicBlock.fields.ECHO = pinECHO.text;
	}

	return ultrasonicBlock;
};

// VL53L0X Distance Sensor
utils.prototypeBlocks['VL53L0X'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;
	classe.sensor = 'VL53L0X';
	return 'VL53L0X';
};

utils.prototypeBlocks['vl53l0x.getRangeMillimeters'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_VL53L0X_getRangeMillimeters',
		fields: { UNIT: 'Millimeter' },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['GESTURE'] = function (node, identifier) {
	const classe = utils.python2Blocks._classes[identifier];
	if (!classe) return null;

	classe.sensor = 'GESTURE';
	return 'GESTURE';
};


utils.prototypeBlocks['readGesture'] = function (methodName, instanceName, parentNode, mutations, statementsNode, statement, parent) {
	const gestureInstance = utils.python2Blocks._classes[instanceName];
	if (!gestureInstance || gestureInstance.sensor !== 'GESTURE') return null;

	return {
		type: 'sensors_getGesture',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: {},
		statement: null,
	};
};

// Pattern: if gesture.readGesture() == 'right':
utils.prototypeBlocks["gesture.readGesture()=='right'_string"] = function (conditionNode, fields, values, mutations, doStatement, statement, parent) {
	return createGestureConditionBlock('right', doStatement);
};

utils.prototypeBlocks["gesture.readGesture()=='left'_string"] = function (conditionNode, fields, values, mutations, doStatement, statement, parent) {
	return createGestureConditionBlock('left', doStatement);
};

utils.prototypeBlocks["gesture.readGesture()=='up'_string"] = function (conditionNode, fields, values, mutations, doStatement, statement, parent) {
	return createGestureConditionBlock('up', doStatement);
};

utils.prototypeBlocks["gesture.readGesture()=='down'_string"] = function (conditionNode, fields, values, mutations, doStatement, statement, parent) {
	return createGestureConditionBlock('down', doStatement);
};

utils.prototypeBlocks["gesture.readGesture()=='forward'_string"] = function (conditionNode, fields, values, mutations, doStatement, statement, parent) {
	return createGestureConditionBlock('forward', doStatement);
};

utils.prototypeBlocks["gesture.readGesture()=='backward'_string"] = function (conditionNode, fields, values, mutations, doStatement, statement, parent) {
	return createGestureConditionBlock('backward', doStatement);
};

utils.prototypeBlocks["gesture.readGesture()=='clockwise'_string"] = function (conditionNode, fields, values, mutations, doStatement, statement, parent) {
	return createGestureConditionBlock('clockwise', doStatement);
};

utils.prototypeBlocks["gesture.readGesture()=='anticlockwise'_string"] = function (conditionNode, fields, values, mutations, doStatement, statement, parent) {
	return createGestureConditionBlock('anticlockwise', doStatement);
};

utils.prototypeBlocks["gesture.readGesture()=='wave'_string"] = function (conditionNode, fields, values, mutations, doStatement, statement, parent) {
	return createGestureConditionBlock('wave', doStatement);
};


function createGestureConditionBlock(gestureType, doStatement) {
	return {
		type: 'sensors_onGestureTypeDetected',
		fields: {
			GESTURE: gestureType,
		},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: {
			DO: doStatement,
		},
	};
}

utils.prototypeBlocks['gesture_condition_generic'] = function (conditionNode, doStatement) {
	const gestureType = extractGestureTypeFromCondition(conditionNode);
	if (gestureType) {
		return createGestureConditionBlock(gestureType, doStatement);
	}
	return null;
};


// ========== CAPTEURS GROVE ==========

// GROVE LINE FINDER - détecte pin.read_digital()
utils.prototypeBlocks['#LineFinderon'] = function (pin, statementsNode, parent) {
	let pinValue = extractPinValue(pin, statementsNode);
	return {
		type: 'sensors_getGroveLineFinder',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#VibrationSensoron'] = function (pin, statementsNode, parent) {
	let pinValue = extractPinValue(pin, statementsNode);
	return {
		type: 'sensors_getPiezoVibration',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// GROVE TILT MODULE - détecte pin.read_digital()
utils.prototypeBlocks['#TiltSensoron'] = function (pin, statementsNode, parent) {
	let pinValue = extractPinValue(pin, statementsNode);
	return {
		type: 'sensors_getGroveTilt',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// GROVE PIR MOTION SENSOR - détecte pin.read_analog() > 500
utils.prototypeBlocks['#PIRMotionSensoron'] = function (pin, statementsNode, parent) {
	let pinValue = extractPinValue(pin, statementsNode);
	return {
		type: 'sensors_getGroveMotion',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// GROVE PIEZO VIBRATION SENSOR - détecte pin.read_digital()
utils.prototypeBlocks['#PiezoVibrationon'] = function (pin, statementsNode, parent) {
	let pinValue = extractPinValue(pin, statementsNode);
	return {
		type: 'sensors_getPiezoVibration',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// GROVE SIMPLE BUTTON - détecte pin.read_digital() ou pin.read_digital()*3.3
utils.prototypeBlocks['#SimpleButtonon'] = function (pin, statementsNode, parent) {
	let pinValue = extractPinValue(pin, statementsNode);
	let buttonType = 'STATE'; // valeur par défaut
	
	// Détecter si c'est une lecture de voltage (*3.3)
	if (parent && parent.type === 'binary_operator' && 
		parent.children[1].text === '*' && 
		parent.children[2].text === '3.3') {
		buttonType = 'VOLT';
	}
	
	return {
		type: 'sensors_getGroveButton',
		fields: { 
			PIN: pinValue,
			TYPE: buttonType
		},
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

// EAR CLIP HEART RATE SENSOR - détecte read_heart_rate(pin)
utils.prototypeBlocks['#EarClipHeartRateon'] = function (pin, statementsNode, parent) {
	let pinValue = extractPinValue(pin, statementsNode);
	return {
		type: 'sensors_getEarClipHeartRate',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
};

utils.prototypeBlocks['#EMGDetectoron'] = function (pin, statementsNode, parent) {
	let pinValue = extractPinValue(pin, statementsNode);
	return {
		type: 'sensors_getEmgDetector',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
}

utils.prototypeBlocks['#ForceSensoron'] = function (pin, statementsNode, parent) {

	return {
		type: 'sensors_getFsr402Force',
		fields: { PIN: pinValue },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
}

// Fonction helper pour extraire et valider la valeur du pin
function extractPinValue(pin, statementsNode) {
	let pinValue = pin;
	
	if (statementsNode && statementsNode.length > 0) {
		pinValue = statementsNode[0].text;
	}
	
	// Validation des pins pour micro:bit
	const validPins = ['pin0', 'pin1', 'pin2', 'pin8', 'pin9', 'pin12', 'pin13', 'pin14', 'pin15', 'pin16', 'pin19', 'pin20', 'pin_speaker'];
	if (!validPins.includes(pinValue)) {
		pinValue = 'pin0'; // valeur par défaut si le pin n'est pas valide
	}
	
	return pinValue;
}

utils.prototypeBlocks['read_heart_rate'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = 'pin0';
	if (statementsNode && statementsNode[0] && statementsNode[0].type === 'identifier') {
		const pinValue = statementsNode[0].text;
		const validPins = ['pin0', 'pin1', 'pin2', 'pin8', 'pin9', 'pin12', 'pin13', 'pin14', 'pin15', 'pin16', 'pin19', 'pin20', 'pin_speaker'];
		if (validPins.includes(pinValue)) {
			pin = pinValue;
		}
	}
	return {
		type: 'sensors_getEarClipHeartRate',
		fields: { PIN: pin },
		values: null,
		mutations: null,
		statementsNode: null,
		statements: null,
	};
}

utils.prototypeBlocks['waterLevelSensor.check_water_level'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getWaterLevel',
		fields: {},
		values: {},
		mutations: null,
		statementsNode: {},
		statements: null,
	}
}