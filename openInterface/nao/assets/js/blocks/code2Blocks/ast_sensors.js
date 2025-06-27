import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const createBlock = (type, fields) => {
    return {
        type: type,
        fields: fields,
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

const tactilSensorsSide = ['Front', 'Middle', 'Rear'];
tactilSensorsSide.forEach(side => {
    utils.prototypeBlocks[`sensors_service.${side}TactilTouched`] = () =>
        createBlock('sensors_tactilTouched', { SENSOR_SIDE: side });
});

const handSensorSides = ['Left', 'Right', 'Back'];
const sides = ['Left', 'Right'];

handSensorSides.forEach(handSensorSide => {
    sides.forEach(handSide => {
        utils.prototypeBlocks[`sensors_service.Hand${handSide}${handSensorSide}Touched`] = () =>
            createBlock('sensors_handTouched', { SENSOR_SIDE: handSensorSide, HAND_SIDE: handSide });
    });
});

sides.forEach(bumperSide => {
    utils.prototypeBlocks[`sensors_service.${bumperSide}BumperPressed`] = () =>
        createBlock('sensors_bumperPressed', { SENSOR_SIDE: bumperSide });
});

const sonarDetections = ['Detected', 'NothingDetected'];
sonarDetections.forEach(sonarDetection => {
    sides.forEach(sonarSide => {
        utils.prototypeBlocks[`sensors_service.Sonar${sonarSide}${sonarDetection}`] = () =>
            createBlock('sensors_sonarDetection', { IS_DETECTED: sonarDetection, SENSOR_SIDE: sonarSide });
    });
});

utils.prototypeBlocks[`sensors_service.getBatteryCharge`] = () =>
    createBlock('sensors_getBatteryCharge', {});