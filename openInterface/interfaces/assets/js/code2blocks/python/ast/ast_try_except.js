import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const errorTable = [
	'AssertionError',
	'AttributeError',
	'EOFError',
	'FloatingPointError',
	'GeneratorExit',
	'ImportError',
	'IndexError',
	'KeyError',
	'KeyboardInterrupt',
	'MemoryError',
	'NameError',
	'NotImplementedError',
	'OSError',
	'OverflowError',
	'ReferenceError',
	'RuntimeError',
	'StopIteration',
	'SyntaxError',
	'IndentationError',
	'TabError',
	'SystemError',
	'SystemExit',
	'TypeError',
	'UnboundLocalError',
	'UnicodeError',
	'UnicodeEncodeError',
	'UnicodeDecodeError',
	'UnicodeTranslateError',
	'ValueError',
	'ZeroDivisionError',
];


utils.prototypeBlocks['try_statement'] = function (node, parent) {

    const tryBlock = {
        type: 'exception_try',
        fields: {},
        values: {},
        mutations: {except: 0},
        statementsNode: {},
        statements: {EXC: {type: 'pass', text: 'pass', children: []}},
    };

    for (const child of node.children) {
        if (child.type === 'block') {
            tryBlock.statements['EXC'] = child;
        } else if (child.type === 'except_clause') {
            for (const childExcept of child.children) {
                if (childExcept.type === 'identifier') {
                    if (errorTable.includes(childExcept.text)) {
                        
                        tryBlock.values[`EXCEPT${tryBlock.mutations.except+1}`] = null;
                        tryBlock.statementsNode[`EXCEPT${tryBlock.mutations.except+1}`] = {type:"bypass", block: "exception_type", text: childExcept.text};
                        
                    }
                } else if (childExcept.type === 'block') {
                    tryBlock.mutations.except++;
                    tryBlock.statements[`DO${tryBlock.mutations.except}`] = childExcept;
                    
                }
            }
        }
    }

    return tryBlock;
}

utils.prototypeBlocks['exception_type'] = function (node, parent) {
    return {
        type: 'exception_type',
        fields: {TYPE: node},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null,
    }
}

utils.prototypeBlocks['raise_statement'] = function (error, parent) {
    let checkIfException = null;

    if (error.type === 'identifier') {
        if (errorTable.includes(error.text)) {
            checkIfException = {type: 'bypass', block: 'exception_type', text: error.text};
        }
    } else if (error.type === 'call') {
        checkIfException = error;
    }


    return {
        type: 'exception_raise',
        fields: {},
        values: {EXC: null},
        mutations: null,
        statementsNode: {EXC: checkIfException || null},
        statement: null,
    };
}

utils.prototypeBlocks['Exception'] = function (type, fields, values, mutations, statementsNode, statement) {
    return {
        type: 'exception_exception',
        fields: {},
        values: {EXC: null},
        mutations: null,
        statementsNode: {EXC: statementsNode[0] || {type: 'string', text: ''}},
        statement: null,
    }
}
