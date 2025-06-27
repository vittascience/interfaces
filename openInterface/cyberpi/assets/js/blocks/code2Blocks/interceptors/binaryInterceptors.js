import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

function checkQuadRgbDetectionPattern(left, operator, right, mode) {

    if (right.type !== 'integer') return null;
    
    let args = [];
    for (const child of left.children) {
        if (child.type === 'argument_list') {
            args = utils.getArgumentList(child.children);
            break;
        }
    }
    

    if (args.length !== 2) return null;

    const detectionType = args[0];
    if (detectionType.type !== 'string') return null;
    
    const detectionTypeValue = utils.extractString(detectionType).text;
    if (!['middle', 'all'].includes(detectionTypeValue)) return null;
    
    const sensor = args[1];
    if (sensor.type !== 'integer') return null;
    
    const sensorNumber = sensor.text;
    const validSensors = ['1', '2', '3', '4', '5', '6', '7', '8'];
    if (!validSensors.includes(sensorNumber)) return null;
    
    const resultValue = right.text;
    let validResults = [];
    
    if (detectionTypeValue === 'middle') {
        validResults = ['0', '1', '2', '3'];
    } else if (detectionTypeValue === 'all') {
        validResults = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
    }
    
    if (!validResults.includes(resultValue)) return null;
    
    if (detectionTypeValue === 'middle') {
        return {
            type: 'sensors_mbuild_quad_RGB_detection_L1_R1_is',
            fields: {
                SENSOR: sensorNumber,
                MODE: mode,
                RESULT: resultValue
            },
            values: {},
            mutations: null,
            statementsNode: {},
            statement: null,
        };
    } else { // 'all'
        return {
            type: 'sensors_mbuild_quad_RGB_detection_is',
            fields: {
                SENSOR: sensorNumber,
                MODE: mode,
                RESULT: resultValue
            },
            values: {},
            mutations: null,
            statementsNode: {},
            statement: null,
        };
    }
}

const rgbModes = ['line', 'ground', 'white', 'red', 'yellow', 'green', 'cyan', 'blue', 'purple', 'black', 'custom'];
for (const mode of rgbModes) {
    utils.binaryInterceptors[`mbuild.quad_rgb_sensor.get_${mode}_sta_EQ`] = function(left, operator, right) {
        return checkQuadRgbDetectionPattern(left, operator, right, mode);
    };
}