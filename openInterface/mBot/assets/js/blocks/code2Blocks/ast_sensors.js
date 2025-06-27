import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';

// arduino
utils.prototypeBlocks['sgp30_readCO2'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getSgp30Gas',
		fields: { GAS: 'CO2' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

utils.prototypeBlocks['sgp30_readTVOC'] = function (type, fields, values, mutations, statementsNode, statement) {
	return {
		type: 'sensors_getSgp30Gas',
		fields: { GAS: 'TVOC' },
		values: {},
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};

// mBot

const lineSensors = ['1', '2'];
const sensorPorts = ['1', '2', '3', '4'];
for (const lineSensor of lineSensors) {
	for (const sensorPort of sensorPorts) {
		utils.prototypeBlocks[`lineFinder_${lineSensor}.readSensor${sensorPort}()`] = function (type, fields, values, mutations, statementsNode, statement) {
			return {
				type: 'robots_makeBlock_getLineState',
				fields: { SENSOR: `Sensor${lineSensor}`, PORT: `PORT_${sensorPort}` },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		};
	}
}

const ultrasonicDistance = ['Cm', 'Inch'];
for (const distance of ultrasonicDistance) {
	for (const sensorPort of sensorPorts) {
		utils.prototypeBlocks[`ultrasonic_${sensorPort}.distance${distance}`] = function (type, fields, values, mutations, statementsNode, statement) {
			return {
				type: 'robots_makeBlock_getUltrasonicRanger',
				fields: { PORT: `PORT_${sensorPort}`, UNIT: distance },
				values: {},
				mutations: null,
				statementsNode: null,
				statement: null,
			};
		};
	}
}

for (let i = 1; i <= 4; i++) {
    utils.prototypeBlocks[`PIRSensor_${i}.isHumanDetected`] = function (type, fields, values, mutations, statementsNode, statement) {
        return {
            type: 'robots_makeBlock_getPIRMotionState',
            fields: { PORT: `PORT_${i}` },
            values: {},
            mutations: null,
            statementsNode: null,
            statement: null,
        };
    }
}

const headingValues = ['X', 'Y', 'Z'];
for (let i = 1; i <= 4; i++) {
    for (const heading of headingValues) {
        utils.prototypeBlocks[`compass_${i}.getHeading${heading}`] = function (type, fields, values, mutations, statementsNode, statement) {
            return {
                type: 'robots_makeBlock_getCompassData',
                fields: { PORT: `PORT_${i}`, AXIS: heading },
                values: {},
                mutations: null,
                statementsNode: null,
                statement: null,
            };
        }
    }
    utils.prototypeBlocks[`compass_${i}.getAngle`] = function (type, fields, values, mutations, statementsNode, statement) {
        return {
            type: 'robots_makeBlock_getCompassData',
            fields: { PORT: `PORT_${i}`, AXIS: "ANGLE" },
            values: {},
            mutations: null,
            statementsNode: null,
            statement: null,
        };
    }
}

for (let i = 1; i <= 2; i++) {
    utils.prototypeBlocks[`lightSensor_${i}.read`] = function (type, fields, values, mutations, statementsNode, statement) {
        return {
            type: 'robots_makeBlock_getLight',
            fields: { PORT: `PORT_${i}` },
            values: {},
            mutations: null,
            statementsNode: null,
            statement: null,
        };
    }
}

for (let i = 1; i <= 4; i++) {
    utils.prototypeBlocks[`colorSensor_${i}.SensorInit`] = function (type, fields, values, mutations, statementsNode, statement) {
        return "null"
    }

    utils.prototypeBlocks[`colorSensor_${i}.Returnresult`] = function (type, fields, values, mutations, statementsNode, statement) {
        return {
            type: 'robots_makeBlock_getColor',
            fields: { PORT: `PORT_${i}`, DATA: "0" },
            values: null,
            mutations: null,
            statementsNode: null,
            statement: null,
        }
    }
}

utils.prototypeBlocks['colorSensor_getData'] = function (type, fields, values, mutations, statementsNode, statement) {
    let sensor = null;
    let result = null

    if (statementsNode[0]) {
        for (const child of statementsNode) {
            if (child.type === 'pointer_expression' && sensor === null) {
                const portValue = child.children[1]?.text;
                if (portValue) {
                    sensor = portValue.split('_')[1];
                }
            } else if (child.type === 'number_literal' && result === null) {
                result = child.text;
            }
        }
    }

    return {
        type: 'robots_makeBlock_getColor',
        fields: { PORT: `PORT_${sensor}`, DATA: result || "0" },
        values: null,
        mutations: null,
        statementsNode: null,
        statement: null,
    }

}

for (let i = 1; i <= 2; i++) {
    utils.prototypeBlocks[`soundSensor_${i}.strength`] = function (type, fields, values, mutations, statementsNode, statement) {
        return {
            type: 'robots_makeBlock_getSound',
            fields: { PORT: `PORT_${i}` },
            values: {},
            mutations: null,
            statementsNode: null,
            statement: null,
        };
    }
}

for (let i = 1; i <= 2; i++) {
    const typeValue = ["Digital", "Analog"];
    for (const typeSensor of typeValue) {
        utils.prototypeBlocks[`gasSensor_${i}.read${typeSensor}`] = function (type, fields, values, mutations, statementsNode, statement) {
            return {
                type: 'robots_makeBlock_MQ2_getGas',
                fields: { PORT: `PORT_${i}`, TYPE: typeSensor },
                values: null,
                mutations: null,
                statementsNode: null,
                statement: null,
            };
        }
    }
}

for (let i = 1; i <= 4; i++) {
    const typeValue = ["Digital", "Analog"];
    for (const typeSensor of typeValue) {
        utils.prototypeBlocks[`flameSensor_${i}.read${typeSensor}`] = function (type, fields, values, mutations, statementsNode, statement) {
            return {
                type: 'robots_makeBlock_getFlame',
                fields: { PORT: `PORT_${i}`, TYPE: typeSensor },
                values: null,
                mutations: null,
                statementsNode: null,
                statement: null,
            };
        }
    }
}

for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 2; j++) {
        utils.prototypeBlocks[`ds18b20Sensor_${i}_${j}.temperature`] = function (type, fields, values, mutations, statementsNode, statement) {
            return {
                type: 'robots_makeBlock_getWaterproofTemperature',
                fields: { PORT: `PORT_${i}`, SLOT: j },
                values: null,
                mutations: null,
                statementsNode: null,
                statement: null,
            };
        }
    }
}