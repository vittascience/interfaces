import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['moveForward'] = function(type, fields, values, mutations, statementsNode, statement, parent){
    let distance = {type: "integer", text: "10"}
    const speedType = ["SLOW", "MEDIUM", "FAST"]
    let speed = "FAST"
    if (statementsNode.length >= 1){
        if (statementsNode[0].type === "integer"){
            distance = statementsNode[0]
            distance.text = Number(distance.text)/10
        } else if (statementsNode[0].type === "identifier"){
            distance = statementsNode[0]
        }
        if (statementsNode.length >= 2 && statementsNode[1].type === "string"){
            speed = speedType.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "FAST"
        }
    }

    return {
        type: 'actuators_set_motors',
        fields: {
            DIRECTION: "Forward",
            SPEED: speed
        },
        values: {
            DISTANCE: null
        },
        mutations: null,
        statementsNode: { DISTANCE: distance },
        statement: null,
    };
}

utils.prototypeBlocks['moveBackward'] = function(type, fields, values, mutations, statementsNode, statement, parent){
    let distance = {type: "integer", text: "10"}
    const speedType = ["SLOW", "MEDIUM", "FAST"]
    let speed = "FAST"
    if (statementsNode.length >= 1){
        if (statementsNode[0].type === "integer"){
            distance = statementsNode[0]
            distance.text = Number(distance.text)/10
        } else if (statementsNode[0].type === "identifier"){
            distance = statementsNode[0]
        }
        if (statementsNode.length >= 2 && statementsNode[1].type === "string"){
            speed = speedType.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "FAST"
        }
    }

    return {
        type: 'actuators_set_motors',
        fields: {
            DIRECTION: "Backward",
            SPEED: speed
        },
        values: {
            DISTANCE: null
        },
        mutations: null,
        statementsNode: { DISTANCE: distance },
        statement: null,
    };
};


utils.prototypeBlocks['turnRight'] = function(type, fields, values, mutations, statementsNode, statement, parent){
    let angle = {type: "integer", text: "90"}
    const speedType = ["SLOW", "MEDIUM", "FAST"]
    let speed = "FAST"
    if (statementsNode.length >= 1){
        if (statementsNode[0].type === "integer"){
            angle = statementsNode[0]
        } else if (statementsNode[0].type === "identifier"){
            angle = statementsNode[0]
        }
        if (statementsNode.length >= 2 && statementsNode[1].type === "string"){
            speed = speedType.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "FAST"
        }
    }

    return {
        type: 'actuators_rotate_with_angle',
        fields: {
            DIRECTION: "Right",
            SPEED: speed
        },
        values: {
            ANGLE: null
        },
        mutations: null,
        statementsNode: { ANGLE: angle },
        statement: null,
    };
}

utils.prototypeBlocks['turnLeft'] = function(type, fields, values, mutations, statementsNode, statement, parent){
    let angle = {type: "integer", text: "90"}
    const speedType = ["SLOW", "MEDIUM", "FAST"]
    let speed = "FAST"
    if (statementsNode.length >= 1){
        if (statementsNode[0].type === "integer"){
            angle = statementsNode[0]
        } else if (statementsNode[0].type === "identifier"){
            angle = statementsNode[0]
        }
        if (statementsNode.length >= 2 && statementsNode[1].type === "string"){
            speed = speedType.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "FAST"
        }
    }

    return {
        type: 'actuators_rotate_with_angle',
        fields: {
            DIRECTION: "Left",
            SPEED: speed
        },
        values: {
            ANGLE: null
        },
        mutations: null,
        statementsNode: { ANGLE: angle },
        statement: null,
    };
};

utils.prototypeBlocks['drawSquare'] = function(type, fields, values, mutations, statementsNode, statement, parent){
    let side = {type: "integer", text: "10"}
    
    if (statementsNode.length > 0){
        if (statementsNode[0].type === "integer"){
            side = statementsNode[0]
            side.text = Number(side.text)/10
        } else {
            side = statementsNode[0]
        }
        side = statementsNode[0]

    }

    return {
        type: 'actuators_draw_square',
        fields: {},
        values: {
            DISTANCE: null
        },
        mutations: null,
        statementsNode: { DISTANCE: side },
        statement: null,
    };
};

utils.prototypeBlocks['stop'] = function(type, fields, values, mutations, statementsNode, statement, parent){
    return {
        type: 'actuators_stop',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
};

utils.prototypeBlocks['playSound'] = function(type, fields, values, mutations, statementsNode, statement, parent){
    let soundValue = "1"

    if (statementsNode.length > 0){
        if (statementsNode[0].type === "integer"){
            soundValue = statementsNode[0].text < 1 || statementsNode[0].text > 20 ? "1" : statementsNode[0].text
        }
    }
    return {
        type: 'actuators_play_sound',
        fields: {SOUND: soundValue},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    };
}