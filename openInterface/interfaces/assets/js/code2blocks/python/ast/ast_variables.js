import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks['str'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    return {
        type: 'variables_force_type',
        fields: {
            TYPE: 'str',
        },
        values: {
            VALUE: null,
        },
        mutations: {},
        statementsNode: {VALUE: statementsNode[0]},
        statement: null,
    }
};

utils.prototypeBlocks['int'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'variables_force_type',
        fields: {
            TYPE: 'int',
        },
        values: {
            VALUE: null,
        },
        mutations: {},
        statementsNode: {VALUE: statementsNode[0]},
        statement: null,
    }
}

utils.prototypeBlocks['float'] = function (type, fields, values, mutations, statementsNode, statement) {
    for (const child of statementsNode) {
        if (child.type === "string"){
            for (const childNode of child.children) {
                if (childNode.type === "string_content" && childNode.text === "inf"){
                    return {
                        type: 'math_constant',
                        fields: { CONSTANT: 'INFINITY' },
                        values: {},
                        mutations: null,
                        statementsNode: null,
                        statement: null,
                    };
                }
            }
            
        }
    }
    return {
        type: 'variables_force_type',
        fields: {
            TYPE: 'float',
        },
        values: {
            VALUE: null,
        },
        mutations: {},
        statementsNode: {VALUE: statementsNode[0]},
        statement: null,
    }
}

utils.prototypeBlocks['bool'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'variables_force_type',
        fields: {
            TYPE: 'bool',
        },
        values: {
            VALUE: null,
        },
        mutations: {},
        statementsNode: {VALUE: statementsNode[0]},
        statement: null,
    }
}

utils.prototypeBlocks['long'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'variables_force_type',
        fields: {
            TYPE: 'long',
        },
        values: {
            VALUE: null,
        },
        mutations: {},
        statementsNode: {VALUE: statementsNode[0]},
        statement: null,
    }
}

utils.prototypeBlocks['type'] = function (type, fields, values, mutations, statementsNode, statement) {

    const Python2Blocks = window.Python2Blocks

    const varID = Python2Blocks.getVariableID(statementsNode[0].text) || Python2Blocks.declareBlocklyVariable(statementsNode[0].text, null);

    return {
        type: 'variables_type_of',
        fields: { VAR: { name: 'VAR', id: varID, value: statementsNode[0].text } },
        values: null,
        mutations: {},
        statementsNode: null,
        statement: null,
    }
}
