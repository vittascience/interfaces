import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['loadReadSpeaker'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const checkClass = utils.python2Blocks._classes[identifier];
    if (!checkClass) return null;
    return 'loadReadSpeaker';
};

const speaKEmotions = ["SPEAK_HAPPY", "SPEAK_ANGRY", "NO_FACE", "NEUTRAL"]
utils.prototypeBlocks['startSpeaking'] = function (type, identifier, values, mutations, statementsNode, statement) {
    
    const checkClass = utils.python2Blocks._classes[identifier];
    if (!checkClass) return null;
    
    const getStatementValue = (index, defaultValue, typeRequired) => {
        if (statementsNode && statementsNode[index]) {
            if (typeRequired === "string" && statementsNode[index].type === 'string') {
                return utils.extractString(statementsNode[index]);
            } else if (statementsNode[index].type === 'string') {
                return utils.extractString(statementsNode[index]);
            }
        }
        return statementsNode && statementsNode[index] ? statementsNode[index] : { type: 'string', value: defaultValue };
    };

    let text = getStatementValue(0, 'Bonjour', 'any');
    let emotion = getStatementValue(1, 'SPEAK_HAPPY', 'string');

    let waiting = 'True';
    if (statementsNode && statementsNode[2]) {
        if (statementsNode[2].type === 'true' || statementsNode[2].type === 'false') {
            waiting = statementsNode[2].type === 'true' ? 'True' : 'False';
        }
    }

    return {
        type: "vi_startSpeaking",
        fields: { EXPRESSION: emotion.text, LOCK: waiting },
        values: {
            TEXT: null,
        },
        mutations: null,
        statementsNode: { TEXT: text },
        statements: null,
    }
};