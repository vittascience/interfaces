import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['setServoAngle'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let pinIdentifier = null;
    let angle = null;
    for (const child of statementsNode) {
        if (child.type === 'identifier' && pinIdentifier === null) {
            pinIdentifier = child.text;
        } else if ((child.type === 'identifier' || child.type === 'binary_operator') && pinIdentifier !== null) {
            angle = child;
        } else if (child.type === 'integer' && angle === null) {
            angle = child;
        }
    }
    
    const checkClass = window.Python2Blocks._classes[pinIdentifier];
    if (!checkClass) {
        return null;
    }


    return {
        type: 'actuators_setServoAngle',
        fields: { PIN: pinIdentifier },
        values: {
            ANGLE: null,
        },
        mutations: null,
        statementsNode: { ANGLE: angle },
        statements: null,
    };
    


};
