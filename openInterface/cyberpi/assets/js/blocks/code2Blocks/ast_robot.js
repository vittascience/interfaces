import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

// ========== MOTOR MOVEMENT BLOCKS ==========

utils.prototypeBlocks['mbot2.forward'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let speedValue = null;
    let durationValue = null;
    let hasDuration = false;

    if (statementsNode && statementsNode.length > 0) {
        speedValue = statementsNode[0];
        if (statementsNode.length > 1) {
            durationValue = statementsNode[1];
            hasDuration = true;
        }
    }

    const blockDef = {
        type: 'robots_mbot2_move',
        fields: { DIR: "forward" },
        values: { SPEED: null },
        mutations: { duration: hasDuration },
        statementsNode: { SPEED: speedValue ? speedValue : { type: 'integer', text: '50' } },
        statement: null,
    };

    if (hasDuration) {
        blockDef.values.DURATION = null;
        blockDef.statementsNode.DURATION = durationValue;
    }

    return blockDef;
};

utils.prototypeBlocks['mbot2.backward'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let speedValue = null;
    let durationValue = null;
    let hasDuration = false;

    if (statementsNode && statementsNode.length > 0) {
        speedValue = statementsNode[0];
        if (statementsNode.length > 1) {
            durationValue = statementsNode[1];
            hasDuration = true;
        }
    }

    const blockDef = {
        type: 'robots_mbot2_move',
        fields: { DIR: "backward" },
        values: { SPEED: null },
        mutations: { duration: hasDuration },
        statementsNode: { SPEED: speedValue ? speedValue : { type: 'integer', text: '50' } },
        statement: null,
    };

    if (hasDuration) {
        blockDef.values.DURATION = null;
        blockDef.statementsNode.DURATION = durationValue;
    }

    return blockDef;
};

utils.prototypeBlocks['mbot2.straight'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let direction = "1";
    let distance = { type: 'integer', text: '10' };
    let unit = "CM";

    if (statementsNode && statementsNode.length > 0) {
        const firstArg = statementsNode[0];
        
        if (firstArg.type === 'unary_operator' && firstArg.children && firstArg.children[0].text === '-') {
            direction = "-1";
            distance = firstArg.children[1] || distance;
        } else if (firstArg.type === 'binary_operator' && firstArg.text.includes('* 2.54')) {
            direction = "1";
            unit = "INCHS";
            distance = firstArg.children[0] || distance;
        } else {
            distance = firstArg;
        }
    }

    return {
        type: 'robots_mbot2_move_by',
        fields: { DIR: direction, UNIT: unit },
        values: { DISTANCE: null },
        mutations: null,
        statementsNode: { DISTANCE: distance },
        statement: null,
    };
};

// Turn
utils.prototypeBlocks['mbot2.turn'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let direction = "1";
    let angleValue = null;

    if (statementsNode && statementsNode.length > 0) {
        const firstArg = statementsNode[0];
        
        if (firstArg.type === "unary_operator" && firstArg.children && firstArg.children[0].text === "-") {
            angleValue = firstArg.children[1];
            direction = "-1";
        } else {
            angleValue = firstArg;
        }
    }

    return {
        type: 'robots_mbot2_turn',
        fields: { DIR: direction },
        values: { ANGLE: null },
        mutations: null,
        statementsNode: { ANGLE: angleValue ? angleValue : { type: 'integer', text: '90' } },
        statement: null,
    };
};

// ========== MOTOR CONTROL BLOCKS ==========

utils.prototypeBlocks['mbot2.EM_set_speed'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let direction = "1";
    let motor = 'EM1';
    let speedValue = null;
    
    if (statementsNode && statementsNode.length > 0) {
        const firstArg = statementsNode[0];
        
        if (firstArg.type === "unary_operator" && firstArg.children && firstArg.children[0].text === "-") {
            speedValue = firstArg.children[1];
            direction = "-1";
        } else {
            speedValue = firstArg;
        }
        
        if (statementsNode[1] && statementsNode[1].type === 'string') {
            const stringValue = utils.extractString(statementsNode[1]);
            const possibleValues = ['EM1', 'EM2', 'ALL'];
            if (possibleValues.includes(stringValue.text)) {
                motor = stringValue.text;
            }
        }
    }

    return {
        type: 'robots_mbot2_control_motor',
        fields: { MOTOR: motor, DIR: direction, UNIT: "SPEED" },
        values: { VALUE: null },
        mutations: null,
        statementsNode: { VALUE: speedValue ? speedValue : { type: 'integer', text: '50' } },
        statement: null,
    };
};

utils.prototypeBlocks['mbot2.EM_set_power'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let direction = "1";
    let motor = 'EM1';
    let powerValue = null;
    
    if (statementsNode && statementsNode.length > 0) {
        const firstArg = statementsNode[0];
        
        if (firstArg.type === "unary_operator" && firstArg.children && firstArg.children[0].text === "-") {
            powerValue = firstArg.children[1];
            direction = "-1";
        } else {
            powerValue = firstArg;
        }
        
        if (statementsNode[1] && statementsNode[1].type === 'string') {
            const stringValue = utils.extractString(statementsNode[1]);
            const possibleValues = ['EM1', 'EM2', 'ALL'];
            if (possibleValues.includes(stringValue.text)) {
                motor = stringValue.text;
            }
        }
    }

    return {
        type: 'robots_mbot2_control_motor',
        fields: { MOTOR: motor, DIR: direction, UNIT: "POWER" },
        values: { VALUE: null },
        mutations: null,
        statementsNode: { VALUE: powerValue ? powerValue : { type: 'integer', text: '50' } },
        statement: null,
    };
};

utils.prototypeBlocks['mbot2.EM_turn'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let direction = "1";
    let motor = 'EM1';
    let angleValue = null;
    let speedValue = null;
    
    if (statementsNode && statementsNode.length >= 2) {
        const firstArg = statementsNode[0];
        

        if (firstArg.type === "unary_operator" && firstArg.children && firstArg.children[0].text === "-") {
            angleValue = firstArg.children[1];
            direction = "-1";
        } else {
            angleValue = firstArg;
        }
        
        speedValue = statementsNode[1];
        if (speedValue.type === 'call' && speedValue.children && speedValue.children[0].text === 'math.fabs') {
            for (const child of speedValue.children) {
                if (child.type === 'argument_list') {
                    const args = utils.getArgumentList(child.children);
                    if (args.length > 0) {
                        speedValue = args[0];
                    }
                }
            }
        }
        
        if (statementsNode[2] && statementsNode[2].type === 'string') {
            const stringValue = utils.extractString(statementsNode[2]);
            const possibleValues = ['EM1', 'EM2', 'ALL'];
            if (possibleValues.includes(stringValue.text)) {
                motor = stringValue.text;
            }
        }
    }

    return {
        type: 'robots_mbot2_turn_motor',
        fields: { MOTOR: motor, DIR: direction },
        values: { ANGLE: null, SPEED: null },
        mutations: null,
        statementsNode: { 
            ANGLE: angleValue ? angleValue : { type: 'integer', text: '90' },
            SPEED: speedValue ? speedValue : { type: 'integer', text: '50' }
        },
        statement: null,
    };
};

utils.prototypeBlocks['mbot2.EM_stop'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let motor = 'ALL';
    const possibleValues = ['EM1', 'EM2', 'ALL'];
    
    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'string') {
        const stringValue = utils.extractString(statementsNode[0]);
        if (possibleValues.includes(stringValue.text)) {
            motor = stringValue.text;
        }
    }

    return {
        type: 'robots_mbot2_stop_motor',
        fields: { MOTOR: motor },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};


utils.prototypeBlocks['mbot2.EM_get_speed'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let motor = 'EM1';
    const possibleValues = ['EM1', 'EM2'];
    
    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'string') {
        const stringValue = utils.extractString(statementsNode[0]);
        if (possibleValues.includes(stringValue.text)) {
            motor = stringValue.text;
        }
    }

    return {
        type: 'robots_mbot2_get_motor_encoding',
        fields: { TYPE: 'SPEED', MOTOR: motor },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['mbot2.EM_get_power'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let motor = 'EM1';
    const possibleValues = ['EM1', 'EM2'];
    
    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'string') {
        const stringValue = utils.extractString(statementsNode[0]);
        if (possibleValues.includes(stringValue.text)) {
            motor = stringValue.text;
        }
    }

    return {
        type: 'robots_mbot2_get_motor_encoding',
        fields: { TYPE: 'POWER', MOTOR: motor },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['mbot2.EM_get_angle'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let motor = 'EM1';
    const possibleValues = ['EM1', 'EM2'];
    
    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'string') {
        const stringValue = utils.extractString(statementsNode[0]);
        if (possibleValues.includes(stringValue.text)) {
            motor = stringValue.text;
        }
    }

    return {
        type: 'robots_mbot2_get_motor_encoding',
        fields: { TYPE: 'ANGLE', MOTOR: motor },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};


utils.prototypeBlocks['mbot2.EM_reset_angle'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let motor = 'ALL';
    const possibleValues = ['EM1', 'EM2', 'ALL'];
    
    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'string') {
        const stringValue = utils.extractString(statementsNode[0]);
        if (possibleValues.includes(stringValue.text)) {
            motor = stringValue.text;
        }
    }

    return {
        type: 'robots_mbot2_reset_motor_angular_position',
        fields: { MOTOR: motor },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['mbot2.EM_lock'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let state = '1';
    let motor = 'ALL';
    const possibleMotors = ['EM1', 'EM2', 'ALL'];
    
    if (statementsNode && statementsNode.length > 0) {
        if (statementsNode[0].type === 'integer') {
            state = ['0', '1'].includes(statementsNode[0].text) ? statementsNode[0].text : '1';
        }
        
        if (statementsNode[1] && statementsNode[1].type === 'string') {
            const stringValue = utils.extractString(statementsNode[1]);
            if (possibleMotors.includes(stringValue.text)) {
                motor = stringValue.text;
            }
        }
    }

    return {
        type: 'robots_mbot2_control_motor_locking',
        fields: { MOTOR: motor, STATE: state },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

// ========== ULTRASONIC SENSOR BLOCKS ==========

utils.prototypeBlocks['mbuild.ultrasonic2.get'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let sensor = "1";
    const sensorField = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'integer') {
        const value = statementsNode[0].text;
        if (sensorField.includes(value)) {
            sensor = value;
        }
    }

    return {
        type: 'robots_mbot2_ultrasonic_getDistance',
        fields: { SENSOR: sensor },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['mbuild.ultrasonic2.set_bri'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let sensor = "1";
    let brightness = { type: 'integer', text: '50' };
    let id = { type: 'integer', text: '0' };
    const sensorField = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length >= 3) {
        brightness = statementsNode[0] || brightness;
        id = statementsNode[1] || id;
        
        if (statementsNode[2].type === 'integer' && sensorField.includes(statementsNode[2].text)) {
            sensor = statementsNode[2].text;
        }
        
        if (statementsNode[0].type === 'integer' && statementsNode[0].text === '0') {
            return {
                type: 'robots_mbot2_ultrasonic_stopLED',
                fields: { SENSOR: sensor },
                values: { ID: null },
                mutations: null,
                statementsNode: { ID: id },
                statement: null,
            };
        }
    }

    return {
        type: 'robots_mbot2_ultrasonic_setBrightness',
        fields: { SENSOR: sensor },
        values: { ID: null, BRIGHTNESS: null },
        mutations: null,
        statementsNode: { ID: id, BRIGHTNESS: brightness },
        statement: null,
    };
};

utils.prototypeBlocks['mbuild.ultrasonic2.get_bri'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let sensor = "1";
    let id = { type: 'integer', text: '0' };
    const sensorField = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length >= 2) {
        id = statementsNode[0] || id;
        
        if (statementsNode[1].type === 'integer' && sensorField.includes(statementsNode[1].text)) {
            sensor = statementsNode[1].text;
        }
    }

    return {
        type: 'robots_mbot2_ultrasonic_getBrightness',
        fields: { SENSOR: sensor },
        values: { ID: null },
        mutations: null,
        statementsNode: { ID: id },
        statement: null,
    };
};

utils.prototypeBlocks['mbuild.ultrasonic2.play'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let sensor = "1";
    let emotion = 'happy';
    const sensorField = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const validEmotions = ['sleepy', 'happy', 'dizzy', 'wink', 'thinking'];

    if (statementsNode && statementsNode.length >= 2) {
        if (statementsNode[0].type === 'string') {
            const emotionValue = utils.extractString(statementsNode[0]).text;
            if (validEmotions.includes(emotionValue)) {
                emotion = emotionValue;
            }
        }
        
        if (statementsNode[1].type === 'integer' && sensorField.includes(statementsNode[1].text)) {
            sensor = statementsNode[1].text;
        }
    }

    return {
        type: 'robots_mbot2_ultrasonic_playLED',
        fields: { SENSOR: sensor, EMOTION: emotion },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};


const modes = ['line', 'ground', 'white', 'red', 'yellow', 'green', 'cyan', 'blue', 'purple', 'black', 'custom'];
for (const m of modes) {
    utils.prototypeBlocks[`mbuild.quad_rgb_sensor.get_${m}_sta`] = function (type, identifier, values, mutations, statementsNode, statement) {
        if (!statementsNode || statementsNode.length < 2) {
            return null; 
        }
        
        const modeType = statementsNode[0];
        const sensor = statementsNode[1];
        
        if (modeType.type !== 'string' || sensor.type !== 'integer') {
            return null;
        }
        
        const modeValue = utils.extractString(modeType).text;
        
        if (modeValue === 'middle') {
            return {
                type: 'sensors_mbuild_quad_RGB_get_detection_L1_R1',
                fields: { SENSOR: sensor.text, MODE: m },
                values: {},
                mutations: null,
                statementsNode: {},
                statement: null,
            };
        } else if (modeValue === 'all') {
            return {
                type: 'sensors_mbuild_quad_RGB_get_detection',
                fields: { SENSOR: sensor.text, MODE: m },
                values: {},
                mutations: null,
                statementsNode: {},
                statement: null,
            };
        }
        
        return null;
    };
}

const sensorModes = ["line", "background"];
for (const s of sensorModes) {
    utils.prototypeBlocks[`mbuild.quad_rgb_sensor.is_${s}`] = function (type, identifier, values, mutations, statementsNode, statement) {
        let probe = "L1";
        let sensor = "1";
        const sensorField = ["R1", "R2", "L1", "L2"];
        const validSensors = ["1", "2", "3", "4", "5", "6", "7", "8"];

        if (!statementsNode || statementsNode.length < 2) {
            return null;
        }
        
        if (statementsNode[0].type === 'string') {
            const stringProbe = utils.extractString(statementsNode[0]);
            probe = sensorField.includes(stringProbe.text) ? stringProbe.text : "L1";
        }
        
        if (statementsNode[1].type === 'integer') {
            sensor = validSensors.includes(statementsNode[1].text) ? statementsNode[1].text : "1";
        }

        return {
            type: 'sensors_mbuild_quad_RGB_is_color_detected',
            fields: { SENSOR: sensor, PROBE: probe, MODE: s === 'background' ? 'ground' : s },
            values: {},
            mutations: null,
            statementsNode: {},
            statement: null,
        };
    };
}

utils.prototypeBlocks['mbuild.quad_rgb_sensor.is_color'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let mode = 'red';
    let probe = 'L1';
    let sensor = '1';
    const validModes = ['white', 'red', 'yellow', 'green', 'cyan', 'blue', 'purple', 'black', 'custom'];
    const sensorField = ["R1", "R2", "L1", "L2"];
    const validSensors = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length >= 3) {

        if (statementsNode[0].type === 'string') {
            const modeValue = utils.extractString(statementsNode[0]).text;
            if (validModes.includes(modeValue)) {
                mode = modeValue;
            }
        }
        
        if (statementsNode[1].type === 'string') {
            const probeValue = utils.extractString(statementsNode[1]).text;
            if (sensorField.includes(probeValue)) {
                probe = probeValue;
            }
        }
        
        if (statementsNode[2].type === 'integer') {
            sensor = validSensors.includes(statementsNode[2].text) ? statementsNode[2].text : "1";
        }
    }

    return {
        type: 'sensors_mbuild_quad_RGB_is_color_detected',
        fields: { SENSOR: sensor, PROBE: probe, MODE: mode },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};


const dataTypes = ['red', 'green', 'blue', 'gray', 'light', 'color_sta'];
for (const dataType of dataTypes) {
    utils.prototypeBlocks[`mbuild.quad_rgb_sensor.get_${dataType}`] = function (type, identifier, values, mutations, statementsNode, statement) {
        let probe = 'L1';
        let sensor = '1';
        const sensorField = ["R1", "R2", "L1", "L2"];
        const validSensors = ["1", "2", "3", "4", "5", "6", "7", "8"];

        if (statementsNode && statementsNode.length >= 2) {
            if (statementsNode[0].type === 'string') {
                const probeValue = utils.extractString(statementsNode[0]).text;
                if (sensorField.includes(probeValue)) {
                    probe = probeValue;
                }
            }
            
            if (statementsNode[1].type === 'integer') {
                sensor = validSensors.includes(statementsNode[1].text) ? statementsNode[1].text : "1";
            }
        }

        return {
            type: 'sensors_mbuild_quad_RGB_get_probe_data',
            fields: { SENSOR: sensor, DATA: dataType, PROBE: probe },
            values: {},
            mutations: null,
            statementsNode: {},
            statement: null,
        };
    };
}

utils.prototypeBlocks['mbuild.quad_rgb_sensor.get_offset_track'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let sensor = '1';
    const validSensors = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'integer') {
        sensor = validSensors.includes(statementsNode[0].text) ? statementsNode[0].text : "1";
    }

    return {
        type: 'sensors_mbuild_quad_RGB_get_offset_track',
        fields: { SENSOR: sensor },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['mbuild.quad_rgb_sensor.set_led_color'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let color = 'red';
    let sensor = '1';
    const validColors = ['red', 'green', 'blue'];
    const validSensors = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length >= 2) {
        if (statementsNode[0].type === 'string') {
            const colorValue = utils.extractString(statementsNode[0]).text;
            if (validColors.includes(colorValue)) {
                color = colorValue;
            }
        }
        
        if (statementsNode[1].type === 'integer') {
            sensor = validSensors.includes(statementsNode[1].text) ? statementsNode[1].text : "1";
        }
    }

    return {
        type: 'sensors_mbuild_quad_RGB_define_color',
        fields: { SENSOR: sensor, COLOR: color },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['mbuild.quad_rgb_sensor.set_led'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let color = 'white';
    let sensor = '1';
    const validColors = ['white', 'purple', 'black', 'red', 'yellow', 'green', 'cyan', 'blue'];
    const validSensors = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length >= 2) {
        if (statementsNode[0].type === 'string') {
            const colorValue = utils.extractString(statementsNode[0]).text;
            if (validColors.includes(colorValue)) {
                color = colorValue;
            }
        }
        
        if (statementsNode[1].type === 'integer') {
            sensor = validSensors.includes(statementsNode[1].text) ? statementsNode[1].text : "1";
        }
    }

    return {
        type: 'sensors_mbuild_quad_RGB_set_color_list',
        fields: { SENSOR: sensor, COLOR: color },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['mbuild.quad_rgb_sensor.set_custom_color'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let sensor = '1';
    let r = { type: 'integer', text: '255' };
    let g = { type: 'integer', text: '0' };
    let b = { type: 'integer', text: '0' };
    let tolerance = { type: 'integer', text: '50' };
    let hasTolerance = false;
    const validSensors = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length >= 4) {
        r = statementsNode[0] || r;
        g = statementsNode[1] || g;
        b = statementsNode[2] || b;
        
        if (statementsNode.length >= 5) {
            tolerance = statementsNode[3] || tolerance;
            hasTolerance = true;
            
            if (statementsNode[4].type === 'integer') {
                sensor = validSensors.includes(statementsNode[4].text) ? statementsNode[4].text : "1";
            }
        } else if (statementsNode[3].type === 'integer') {
            const fourthArg = statementsNode[3];
            if (validSensors.includes(fourthArg.text)) {
                sensor = fourthArg.text;
                tolerance = { type: 'integer', text: '50' };
            } else {
                tolerance = fourthArg;
                hasTolerance = true;
            }
        }
    }

    const blockDef = {
        type: 'sensors_mbuild_quad_RGB_set_color_RGB',
        fields: { SENSOR: sensor },
        values: { R: null, G: null, B: null },
        mutations: { tolerance: hasTolerance },
        statementsNode: { R: r, G: g, B: b },
        statement: null,
    };

    if (hasTolerance) {
        blockDef.values.TOLERANCE = null;
        blockDef.statementsNode.TOLERANCE = tolerance;
    }

    return blockDef;
};

utils.prototypeBlocks['mbuild.quad_rgb_sensor.close_led'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let sensor = '1';
    const validSensors = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'integer') {
        sensor = validSensors.includes(statementsNode[0].text) ? statementsNode[0].text : "1";
    }

    return {
        type: 'sensors_mbuild_quad_RGB_close_led',
        fields: { SENSOR: sensor },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['mbuild.quad_rgb_sensor.adjust'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let sensor = '1';
    const validSensors = ["1", "2", "3", "4", "5", "6", "7", "8"];

    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'integer') {
        sensor = validSensors.includes(statementsNode[0].text) ? statementsNode[0].text : "1";
    }

    return {
        type: 'sensors_mbuild_quad_RGB_calibrate',
        fields: { SENSOR: sensor },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['mbuild.quad_rgb_sensor.color_mode'] = function (type, identifier, values, mutations, statementsNode, statement) {
    let mode = 'standard';
    const validModes = ['standard', 'enhance'];

    if (statementsNode && statementsNode.length > 0 && statementsNode[0].type === 'string') {
        const modeValue = utils.extractString(statementsNode[0]).text;
        if (validModes.includes(modeValue)) {
            mode = modeValue;
        }
    }

    return {
        type: 'sensors_mbuild_quad_RGB_color_mode',
        fields: { MODE: mode },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

