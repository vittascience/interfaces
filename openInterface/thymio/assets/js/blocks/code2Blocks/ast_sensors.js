import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks["prox_horizontal"] = function (left, right, operator){
    let sensor;
    let value = null;

    let treeshold = null;

    for (const child of left.children) {
        if (child.type === 'integer') {
            sensor = child.text;
        }
    }

    if (typeof sensor === 'undefined') {
        sensor = "0";
    }

    
    if (right.type === 'integer') {
        value = right.text;
    } else {
        value = 1000;
    }
    

    operator = operator || '>';

    treeshold = Number(value) <= 1000 && operator === '<' ? "< 1000" : "> 2000";

    return {
        type: 'sensors_read_obstacle',
        fields: { DIRECTION: sensor || "0", OPERATOR: treeshold },
        values: null,
        mutation: null,
        statementsNode: null,
        statements: null,
    }
}

utils.prototypeBlocks["prox_ground_delta"] = function (left, right, operator){
    let sensor;
    let value = null;

    let treeshold = null;

    for (const child of left.children) {
        if (child.type === 'integer') {
            sensor = child.text;
        }
    }

    if (typeof sensor === 'undefined') {
        sensor = "0";
    }

    
    if (right.type === 'integer') {
        value = right.text;
    } else {
        value = 400;
    }
    

    operator = operator || '>';

    treeshold = Number(value) <= 400 && operator === '<' ? "nothing" : "something";
    return {
        type: 'sensors_get_line',
        fields: { DIRECTION: sensor || "0", VALUE: treeshold },
        values: null,
        mutation: null,
        statementsNode: null,
        statements: null,
    }
}