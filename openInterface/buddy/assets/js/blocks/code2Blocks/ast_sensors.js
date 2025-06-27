import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['enableSensorsModule'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const checkClass = utils.python2Blocks._classes[identifier];
	if (!checkClass) return null;

    return 'enableSensorsModule';
}


utils.prototypeBlocks['on_us_detect_obstacle'] = function (type, identifier, values, mutations, statementsNode, statement) {

    let state = 'True';
    let distance = '100';
    let side = 'Left';
    let doStatement = null;

    if (statementsNode && statementsNode[0]) {
        if (statementsNode[0].type === 'true' || statementsNode[0].type === 'false') {
            state = statementsNode[0].type === 'true' ? 'True' : 'False';
        }
    }

    if (statementsNode && statementsNode[1]) {
        if (statementsNode[1].type === 'integer') {
            statementsNode[1].text = Number(statementsNode[1].text) / 10;
        }
        distance = statementsNode[1];
    }
    
    if (statementsNode && statementsNode[2]) {
        if (statementsNode[2].type === 'string') {
            side = utils.extractString(statementsNode[2]).text;
        } else {
            side = 'Left';
        }
    }

    for (const child of statementsNode) {
        if (child.type === 'block') {
            doStatement = child;
        }
    }


    return {
        type: 'sensors_USdetectObstacle_simple',
        fields: { STATE: state === 'True' ? 'is' : 'isnt', DIRECTION: side },
        values: {
            DISTANCE: null,
        },
        mutations: null,
        statementsNode: { DISTANCE: distance },
        statements: doStatement !== null ? {DO: doStatement} : null,
    }

}

utils.prototypeBlocks['on_tf_detect_obstacle'] = function (type, identifier, values, mutations, statementsNode, statement) {

    let state = 'True';
    let distance = '100';
    let side = 'Left';
    let doStatement = null;
    if (statementsNode && statementsNode[0]) {
        if (statementsNode[0].type === 'true' || statementsNode[0].type === 'false') {
            state = statementsNode[0].type === 'true' ? 'True' : 'False';
        }
    }

    if (statementsNode && statementsNode[1]) {
        if (statementsNode[1].type === 'integer') {
            statementsNode[1].text = Number(statementsNode[1].text) / 10;
        }
        distance = statementsNode[1];
    }
    
    if (statementsNode && statementsNode[2]) {
        if (statementsNode[2].type === 'string') {
            side = utils.extractString(statementsNode[2]).text;
        } else {
            side = 'Left';
        }
    }

    for (const child of statementsNode) {
        if (child.type === 'block') {
            doStatement = child;
        }
    }

    return {
        type: 'sensors_ToFdetectObstacle_simple',
        fields: { STATE: state === 'True' ? 'is' : 'isnt', DIRECTION: side },
        values: {
            DISTANCE: null,
        },
        mutations: null,
        statementsNode: { DISTANCE: distance },
        statements: doStatement !== null ? {DO: doStatement} : null,
    }
}

utils.prototypeBlocks['get_distance_us'] = function (type, identifier, values, mutations, statementsNode, statement) {

    let side = 'Left';

    if (statementsNode && statementsNode[0]) {
        if (statementsNode[0].type === 'string') {
            side = utils.extractString(statementsNode[0]).text;
        } else {
            side = 'Left';
        }
    } else {
        side = 'Left';
    }

    return {
        type: 'sensors_getDistance',
        fields: { DIRECTION: side },
        values: null,
        mutation: null,
        statementsNode: null,
    }
}


utils.prototypeBlocks['get_distance_tf'] = function (type, identifier, values, mutations, statementsNode, statement) {

    let side = 'FrontLeft';

    if (statementsNode && statementsNode[0]) {
        if (statementsNode[0].type === 'string') {
            side = utils.extractString(statementsNode[0]).text;
        } else {
            side = 'FrontLeft';
        }
    } else {
        side = 'FrontLeft';
    }

    return {
        type: 'sensors_getLight',
        fields: { DIRECTION: side },
        values: null,
        mutation: null,
        statementsNode: null,
    }
}