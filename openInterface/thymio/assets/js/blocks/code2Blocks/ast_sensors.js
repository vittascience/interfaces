import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


// "prox_horizontal[n]" (subscript: proximity value) or "prox_horizontal[n] > 2000" / "< 1000" (comparison: obstacle)
utils.prototypeBlocks["prox_horizontal"] = function (left, right, operator) {
    // subscript: called with the identifier and the index
    if (left.type === 'identifier') {
        if (right?.type !== 'integer' || Number(right.text) > 6) return null;
        return {
            type: 'sensors_get_proximity',
            fields: { DIRECTION: right.text },
            values: null,
            mutations: null,
            statementsNode: null,
            statements: null,
        };
    }
    const sensor = left.children.find((child) => child.type === 'integer')?.text;
    // only the comparisons of the obstacle block, the others are generic comparisons
    const threshold = { '>2000': '> 2000', '<1000': '< 1000' }[`${operator}${right?.text}`];
    if (sensor === undefined || !threshold) return null;
    return {
        type: 'sensors_read_obstacle',
        fields: { DIRECTION: sensor, OPERATOR: threshold },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
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