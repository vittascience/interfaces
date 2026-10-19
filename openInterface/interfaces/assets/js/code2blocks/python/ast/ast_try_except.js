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
    // "except ErrorType:" clauses (EXCEPTn/DOn) and the bare "except:" clause (EXCEPTARG)
    const tryBlock = {
        type: 'exception_try',
        fields: {},
        values: {},
        mutations: { except: 0, exceptarg: 0 },
        statementsNode: {},
        statements: { EXC: { type: 'pass', text: 'pass', children: [] } },
    };

    for (const child of node.children) {
        if (child.type === 'block') {
            tryBlock.statements['EXC'] = child;
        } else if (child.type === 'except_clause') {
            const errorType = child.children.find((childExcept) => childExcept.type === 'identifier');
            const body = child.children.find((childExcept) => childExcept.type === 'block');
            // other clauses ("except Error as e", "except (A, B)"): not handled
            if (child.children.some((childExcept) => childExcept.type === 'as_pattern' || childExcept.type === 'tuple')) return null;
            if (errorType) {
                if (!errorTable.includes(errorType.text)) return null;
                tryBlock.mutations.except++;
                tryBlock.values[`EXCEPT${tryBlock.mutations.except}`] = null;
                tryBlock.statementsNode[`EXCEPT${tryBlock.mutations.except}`] = { type: 'bypass', block: 'exception_type', text: errorType.text };
                tryBlock.statements[`DO${tryBlock.mutations.except}`] = body;
            } else {
                tryBlock.mutations.exceptarg = 1;
                tryBlock.statements['EXCEPTARG'] = body;
            }
        } else if (child.type === 'else_clause' || child.type === 'finally_clause') {
            return null;
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
