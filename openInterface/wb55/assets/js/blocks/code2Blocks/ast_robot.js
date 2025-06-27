import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks['AlphaBot_v2'] = function (node, identifier, values, mutations, statementsNode, statement) {
    
    Blockly.Python.addInit('alphabot', 'alphabot = AlphaBot_v2()');
    return 'alphaBot';
};

const irSensors = ['IR1', 'IR2', 'IR3', 'IR4', 'IR5'];
utils.prototypeBlocks['isSensorAboveLine'] = function (type, identifier, values, mutations, statementsNode, statement) {
    
    if (statementsNode.length < 2) return null

    let varName = null;
    if (statementsNode[0].type === 'identifier') {
        varName = statementsNode[0].text;
    }
    
    const checkClasses = utils.python2Blocks._classes[varName];
    if (!checkClasses) {
        return null;
    }

    let sensor = null;
    if (statementsNode[1].type === 'string') {
        sensor = irSensors.includes(utils.extractString(statementsNode[1]).text) ? utils.extractString(statementsNode[1]).text : "IR1";
    }

    let blackLimit = null;
    if (typeof statementsNode[2] !== "undefined" && statementsNode[2].type === 'keyword_argument') {
        if (statementsNode[2].children[0].type === 'identifier' && statementsNode[2].children[0].text === 'blackLimit') {
            blackLimit = statementsNode[2].children[2];
        }
    }
    if (blackLimit === null) {
        return {
            type: 'robots_alphabot_lineFinder_isSensorAboveLine',
            fields: { SENSOR: `'${sensor}'` },
            values: null,
            mutations: {limit: false},
            statementsNode: null,
            statements: null,
        }
    } else {
        return {
            type: 'robots_alphabot_lineFinder_isSensorAboveLine',
            fields: { SENSOR: `'${sensor}'` },
            values: { LIMIT: null },
            mutations: {limit: true},
            statementsNode: { LIMIT: blackLimit },
            statements: null,
        }
    }
    
};

utils.prototypeBlocks['setMotorRight'] = function (method, identifier, values, mutations, statementsNode) {
        
    const checkClasses = utils.python2Blocks._classes[identifier];
    if (!checkClasses) {
        return null;
    }
    if (statementsNode.length !== 1) return null

    let stop = false;
    let speed = null;
    let reverse = false;
    if (statementsNode[0].type === "unary_operator") {
        reverse = true;
        speed = statementsNode[0].children[1];
    } else {
        if (statementsNode[0].type === "integer" && statementsNode[0].text === "0") {
            stop = true;
        }
        speed = statementsNode[0];
    }
    if (stop) {
        return {
            type: 'robots_alphabot_stopMotors',
            fields: {MOTOR: "RIGHT"},
            values: null,
            mutations: null,
            statementsNode: null,
            statements: null,
        }
    } else {
        return {
            type: 'robots_alphabot_controlMotor',
            fields: { MOTOR: "RIGHT", DIR: reverse ? "ANTICLOCKWISE" : "CLOCKWISE" },
            values: { SPEED: null },
            mutations: null,
            statementsNode: { SPEED: speed },
            statements: null,
        }

    }
    
}

utils.prototypeBlocks['setMotorLeft'] = function (method, identifier, values, mutations, statementsNode) {
            
    const checkClasses = utils.python2Blocks._classes[identifier];
    if (!checkClasses) {
        return null;
    }
    if (statementsNode.length !== 1) return null
    let stop = false;
    let speed = null;
    let reverse = false;
    if (statementsNode[0].type === "unary_operator") {
        reverse = true;
        speed = statementsNode[0].children[1];
    } else {
        if (statementsNode[0].type === "integer" && statementsNode[0].text === "0") {
            stop = true;
        }
        speed = statementsNode[0];
    }
    if (stop) {
        return {
            type: 'robots_alphabot_stopMotors',
            fields: {MOTOR: "LEFT"},
            values: null,
            mutations: null,
            statementsNode: null,
            statements: null,
        }
    } else {

        return {
            type: 'robots_alphabot_controlMotor',
            fields: { MOTOR: "LEFT", DIR: reverse ? "ANTICLOCKWISE" : "CLOCKWISE" },
            values: { SPEED: null },
            mutations: null,
            statementsNode: { SPEED: speed },
            statements: null,
        }
    }
};

utils.prototypeBlocks['moveForward'] = function (method, identifier, values, mutations, statementsNode) {
        
    const checkClasses = utils.python2Blocks._classes[identifier];
    if (!checkClasses) {
        return null;
    }
    if (statementsNode.length !== 1) return null
    
    let speed = statementsNode[0];
    

    return {
        type: 'robots_alphabot_setGo',
        fields: { DIR: "FORWARD" },
        values: { SPEED: null },
        mutations: null,
        statementsNode: { SPEED: speed },
        statements: null,
    }
} 

utils.prototypeBlocks['moveBackward'] = function (method, identifier, values, mutations, statementsNode) {
            
    const checkClasses = utils.python2Blocks._classes[identifier];
    if (!checkClasses) {
        return null;
    }
    if (statementsNode.length !== 1) return null
    
    let speed = statementsNode[0];
    
    return {
        type: 'robots_alphabot_setGo',
        fields: { DIR: "BACKWARD" },
        values: { SPEED: null },
        mutations: null,
        statementsNode: { SPEED: speed },
        statements: null,
    }
};

utils.prototypeBlocks['TRSensors_readLine'] = function (method, identifier, values, mutations, statementsNode) {
    const checkClasses = utils.python2Blocks._classes[identifier];
    if (!checkClasses) {
        return null;
    }

    const sensor = typeof statementsNode[0]!== "undefined" && statementsNode[0].type === "integer" ? statementsNode[0].text : 1;
    

    return {
        type: 'robots_alphabot_lineFinder_readSensors',
        fields: { SENSOR: sensor === "0" ? 'ALL' : sensor },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};


utils.prototypeBlocks['SSD1306_I2C'] = function (node, identifier, values, mutations, statementsNode, statement) {
    // TODO
    // need to check all args and add them to the class in python2Blocks._classes object
    return 'SSD1306_I2C';
}

utils.prototypeBlocks['text'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const checkClasses = utils.python2Blocks._classes[identifier];
    if (!checkClasses) {
        return null;
    }
    
    let text = statementsNode[0] || {type: 'string', text: ''};
    let x = statementsNode[1] || {type: 'integer', text: '0'};
    let y = statementsNode[2] || {type: 'integer', text: '0'};


    return {
        type: "robots_alphabot_oled_addText",
        fields: {},
        values :{
            TEXT: null,
            X: null,
            Y: null,
        },
        mutations: null,
        statementsNode: {
            TEXT: text,
            X: x,
            Y: y,
        },
        
    }
    
}

utils.prototypeBlocks['fill'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const checkClasses = utils.python2Blocks._classes[identifier];
    if (!checkClasses) {
        return null;
    }
    
    if (statementsNode[0].type === 'integer') {
        if (statementsNode[0].text === '0') {
            return {
                type: "robots_alphabot_oled_clearScreen",
                fields: {},
                values: null,
                mutations: null,
                statementsNode: null,
                statements: null,
            }
        }
    }
}

utils.prototypeBlocks['show'] = function (node, identifier, values, mutations, statementsNode, statement) {
    const checkClasses = utils.python2Blocks._classes[identifier];
    if (!checkClasses) {
        return null;
    }

    return 'show';
}