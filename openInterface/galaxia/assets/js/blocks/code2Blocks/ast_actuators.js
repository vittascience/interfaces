import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks['setServoAngle'] = function (type, fields, values, mutations, statementsNode, statement) {
    const pin = statementsNode[0].text;
    const checkClasses = utils.python2Blocks._classes[pin];
    if (checkClasses) {
        const angleValue = statementsNode[1] || { type: 'integer', text: '90' };
        const pin = checkClasses.pin? "p" + checkClasses.pin : "p0";
        return {
            type: 'actuators_setServoAngle',
            fields: { PIN: pin },
            values: { ANGLE: null },
            mutations: null,
            statementsNode: { ANGLE: angleValue },
            statements: null,
        };
    } else {
        return '';
    }
};    