import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['define_file'] = function (node, identifier, values, mutations, statementsNode, statement) {
    const Python2Blocks = window.Python2Blocks;
    const classVariable = utils.python2Blocks._classes[identifier];
    if (classVariable === undefined) return null;
    let nodeArgz = null;

    for (const child of node.children) {
        if (child.type === "argument_list") {
            nodeArgz = utils.getArgumentList(child.children);
        }
    }
    classVariable.fileName = nodeArgz[0] || "";
    classVariable.mode = nodeArgz[1].text || "a";
    return ""
};

utils.prototypeBlocks['write'] = function (method, identifier, values, mutations, statementsNode, statement) {
    const classVariable = utils.python2Blocks._classes[identifier];
    if (classVariable === "undefined") return null;
    let filePath = null
    if (classVariable.fileName !== 'undefined') {
        filePath = classVariable.fileName;
    } else {
        filePath = { type: 'string', text: '/sd/data.txt' };
    }
    return {
        type: 'communication_writeSd',
        fields: {},
        values: {
            PATH: null,
            DATA: null,
        },
        mutations: null,
        statementsNode: {PATH: filePath , DATA: statementsNode[0]},
    }
}

utils.prototypeBlocks['close'] = function (method, identifier, values, mutations, statementsNode, statement) {
    const classVariable = utils.python2Blocks._classes[identifier];
    if (classVariable === "undefined") return null;
    return "untracked";
}