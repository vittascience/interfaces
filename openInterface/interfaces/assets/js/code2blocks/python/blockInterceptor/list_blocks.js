import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.interceptors['array_length'] = function (varName) {

    console.log('VarName', varName);
    return {
        type: 'lists_length',
        fields: {},
        values: { LIST: null },
        mutations: null,
        statementsNode: { LIST: { type: 'identifier', text: varName } },
        statement: null,
    };
};

utils.interceptors['list_repeat'] = function (left, right) {
    
    let listElement = null;
    let repeatElement = null;
    if (left.type === 'list') {
        listElement = left.children[1];
        repeatElement = right;
    } else if (right.type === 'list') {
        listElement = right.children[1];
        repeatElement = left;
    }
    

    return {
        type: 'lists_repeat',
        fields: {},
        values: { ITEM: null, NUM: null },
        mutations: null,
        statementsNode: { ITEM: listElement, NUM: repeatElement },
        statement: null,
    };
}