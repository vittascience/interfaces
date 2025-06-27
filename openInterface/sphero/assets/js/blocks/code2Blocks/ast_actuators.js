import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const directions = ["forward", "backward", "right", "left"];

utils.prototypeBlocks['sm_move'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let direction = "forward";
    let speed = {type: "integer", text: "125"};

    if (statementsNode.length >1){
        speed = statementsNode[0]

        if (statementsNode[1].type === "string"){
            direction = directions.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "forward";
        }
    } else if (statementsNode.length === 1){
        if (statementsNode[0].type === "integer" || statementsNode[0].type === "identifier"){
            speed = statementsNode[0]
        }
    }

    return {
        type: 'actuators_set_motors',
        fields: { DIRECTION: direction },
        values: { SPEED: null },
        mutations: null,
        statementsNode: { SPEED: speed },
        statement: null,
    };

};

utils.prototypeBlocks['sm_move_step'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let direction = "forward";
    let speed = {type: "integer", text: "125"};
    let timeout = {type: "integer", text: "1"};

    if (statementsNode.length > 2){
        speed = statementsNode[0]
        timeout = statementsNode[2]

        if (statementsNode[1].type === "string"){
            direction = directions.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "forward";
        }
    } else if (statementsNode.length === 2){
        if (statementsNode[0].type === "integer" || statementsNode[0].type === "identifier"){
            speed = statementsNode[0]
        }

        if (statementsNode[1].type === "integer" || statementsNode[1].type === "identifier"){
            timeout = statementsNode[1]
        }
    }

    return {
        type: 'actuators_set_motors_with_timeout',
        fields: { DIRECTION: direction },
        values: { SPEED: null, TIMEOUT: null },
        mutations: null,
        statementsNode: { SPEED: speed, TIMEOUT: timeout },
        statement: null,
    };
}

utils.prototypeBlocks['setHeading'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let heading = {type: "integer", text: "0"};

    if (statementsNode.length === 1){
        if (statementsNode[0].type === "integer" || statementsNode[0].type === "identifier"){
            heading = statementsNode[0]
        }
    }

    return {
        type: 'actuators_set_heading',
        fields: {},
        values: { HEADING: null },
        mutations: null,
        statementsNode: { HEADING: heading },
        statement: null,
    };
}

utils.prototypeBlocks['roll'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let heading = {type: "integer", text: "0"};
    let speed = null;
    let direction = "forward";
    if (statementsNode.length > 1){
        if (statementsNode[0].type === "integer" || statementsNode[0].type === "identifier"){
            speed = statementsNode[0]
        } else if (statementsNode[0].type === "unary_operator" && speed === null){
            speed = statementsNode[0].children[1]
            direction = "backward"
        } else if (statementsNode[1].type === "unary_operator"){
            speed = statementsNode[1].children[1]
        }
        heading = statementsNode[1]
    }

    if (speed === null){
        speed = {type: "integer", text: "125"};
    }


    return {
        type: 'actuators_set_motors_with_heading',
        fields: { DIRECTION: direction },
        values: { SPEED: null, HEADING: null },
        mutations: null,
        statementsNode: { SPEED: speed, HEADING: heading },
        statement: null,
    };
}

utils.prototypeBlocks['sm_rotate'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let direction = "right";
    let speed = {type: "integer", text: "125"};

    if (statementsNode.length >1){
        speed = statementsNode[0]

        if (statementsNode[1].type === "string"){
            direction = directions.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "right";
        }
    } else if (statementsNode.length === 1){
        if (statementsNode[0].type === "integer" || statementsNode[0].type === "identifier"){
            speed = statementsNode[0]
        }
    }

    return {
        type: 'actuators_rotate',
        fields: { DIRECTION: direction },
        values: { SPEED: null },
        mutations: null,
        statementsNode: { SPEED: speed },
        statement: null,
    };
};

utils.prototypeBlocks['sm_rotate_step'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let direction = "right";
    let speed = {type: "integer", text: "125"};
    let timeout = {type: "integer", text: "1"};

    if (statementsNode.length > 2){
        speed = statementsNode[0]
        timeout = statementsNode[2]

        if (statementsNode[1].type === "string"){
            direction = directions.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "right";
        }
    } else if (statementsNode.length === 2){
        if (statementsNode[0].type === "integer" || statementsNode[0].type === "identifier"){
            speed = statementsNode[0]
        }

        if (statementsNode[1].type === "integer" || statementsNode[1].type === "identifier"){
            timeout = statementsNode[1]
        }
    }

    return {
        type: 'actuators_rotate_with_timeout',
        fields: { DIRECTION: direction },
        values: { SPEED: null, TIMEOUT: null },
        mutations: null,
        statementsNode: { SPEED: speed, TIMEOUT: timeout },
        statement: null,
    };
}

utils.prototypeBlocks['resetHeading'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'actuators_reset_heading',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null,
    };
};

utils.prototypeBlocks['raw_motor'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let turnOff = false;
    if (statementsNode.length === 4){
        if (statementsNode[0].type === "integer" && statementsNode[0].text === "0" && statementsNode[2].type === "integer" && statementsNode[2].text === "0" && statementsNode[1].type === "none" && statementsNode[3].type === "none"){
            turnOff = true;
        } else {
            turnOff = false;
        }
    }

    if (turnOff){
        return {
            type: 'actuators_stop',
            fields: {},
            values: {},
            mutations: null,
            statementsNode: null,
            statement: null,
        };
    } else {
        return null;
    }
}

utils.prototypeBlocks['sm_turn'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let direction = "right";
    let speed = {type: "integer", text: "125"};
    let motor = "right";

    if (statementsNode.length > 2){
        speed = statementsNode[0]

        if (statementsNode[1].type === "string"){
            motor = directions.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "right";
        }

        if (statementsNode[2].type === "string"){
            direction = directions.includes(utils.extractString(statementsNode[2]).text) ? utils.extractString(statementsNode[2]).text : "right";
        }

    } else if (statementsNode.length === 1){
        if (statementsNode[0].type === "integer" || statementsNode[0].type === "identifier"){
            speed = statementsNode[0]
        }
    }

    return {
        type: 'actuators_set_motor',
        fields: { DIRECTION: direction, MOTOR: motor },
        values: { SPEED: null },
        mutations: null,
        statementsNode: { SPEED: speed },
        statement: null,
    };
}


