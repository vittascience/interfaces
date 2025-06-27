import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const animalSounds = ['dog', 'cow', 'boar', 'chick', 'frog', 'sheep', 'cuckoo', 'wolf', 'chicken', 'donkey', 'owl', 'goat', 'rooster', 'angry_dog', 'pig', 'cat', 'horse'];
const emotionSounds = ['yahoo', 'aaa', 'approval', 'be_be_be', 'change_decision', 'yuck', 'laughing_mad', 'nice', 'ooo', 'anger', 'fear', 'sad', 'sigh', 'disagreement', 'pplplplplp', 'wow', 'bleah', 'laughing', 'positive_surprise','woooow', 'jupiyeah', 'awesome'];
const specialSound = ['siren_fire_brigade', 'siren_police', 'siren_ambulance', 'random'];
const behaviorSounds = ['boo', 'random', 'shh', 'cold', 'fart', 'hic', 'sneeze'];


const getAttributeIdentifier = (node) => {
    let method = null;
    let subMethod = null;
    for (const child of node.children) {
        if (child.type === 'identifier' && method === null) {
            method = child.text;
        } else if (child.type === 'identifier' && method !== null) {
            subMethod = child.text;
        }
    }

    return {method, subMethod};
}

utils.prototypeBlocks['photon.make_sound'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let sound = 'dog';

    if (statementsNode && statementsNode.length === 1) {
        if (statementsNode[0].type === 'attribute') {
            const {method, subMethod} = getAttributeIdentifier(statementsNode[0]);
            if (method === 'Sound') {
                sound = subMethod;
            }
        }
    }
    console.log(sound);
    
    if (animalSounds.includes(sound)) {
        return {
            type: 'sound_animal',
            fields: { ANIMAL: sound },
            values: null,
            mutations: null,
            statementsNode: null,
            statements: null,
        };
    } else if (emotionSounds.includes(sound)) {
        return {
            type: 'sound_emotion',
            fields: { EMOTION: sound },
            values: null,
            mutations: null,
            statementsNode: null,
            statements: null,
        };
    } else if (specialSound.includes(sound)) {
        return {
            type: 'sound_special',
            fields: { SPECIAL: sound },
            values: null,
            mutations: null,
            statementsNode: null,
            statements: null,
        };
    } else {
        return {
            type: 'sound_special',
            fields: { SPECIAL: 'random' },
            values: null,
            mutations: null,
            statementsNode: null,
            statements: null,

        }
    }

};

utils.prototypeBlocks['photon.special_behavior'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let behavior = 'boo';

    if (statementsNode && statementsNode.length === 1) {
        if (statementsNode[0].type === 'attribute') {
            const {method, subMethod} = getAttributeIdentifier(statementsNode[0]);
            if (method === 'SpecialBehaviors') {
                behavior = subMethod;
            }
        }
    }

    if (behaviorSounds.includes(behavior)) {
        return {
            type: 'sound_behavior',
            fields: { BEHAVIOR: behavior },
            values: null,
            mutations: null,
            statementsNode: null,
            statements: null,
        };
    } else {
        return {
            type: 'sound_behavior',
            fields: { BEHAVIOR: 'random' },
            values: null,
            mutations: null,
            statementsNode: null,
            statements: null,
        };
    }
};    