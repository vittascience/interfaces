import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

// in this case "key" is the key of the keyword of the I2C class assigned to i2c
utils.prototypeBlocks['i2c'] = function (identifier, key, parent) {
    const Python2Blocks = window.Python2Blocks;
    let classElement = null;
    if (parent.children[0].children[0] && parent.children[0].children[0].text !== "undefined") {
        classElement = parent.children[0].children[0].text;
    } else {
        return null;
    };
    const checkClasses = Python2Blocks._classes[classElement];
    let keywordArgs = null
    for (const arg of key.children) {
        if (arg.type === 'argument_list') {
            keywordArgs = utils.getArgumentList(arg.children);
        }
    }
    let scl = null;
    let sda = null;
    for (const keywordArg of keywordArgs) {
        if (keywordArg.type === 'keyword_argument') {
            const keyword = keywordArg.children[0].text;
            if (keyword === 'scl') {
                let pinSCL = keywordArg.children[2];
                for (const pin of pinSCL.children) {
                    
                    if (pin.type === 'argument_list') {
                        const pinNumber = utils.getArgumentList(pin.children);
                        scl = pinNumber[0];
                    }
                }
                
            } else if (keyword === 'sda') {
                let pinSDA = keywordArg.children[2];
                for (const pin of pinSDA.children) {
                    if (pin.type === 'argument_list') {
                        const pinNumber = utils.getArgumentList(pin.children);
                        sda = pinNumber[0];
                    }
                }
            }
        }
    }

    if (scl && sda) {
        // store this value if we need to access it later (e.g. in the case of the LCD1602 class)
        checkClasses.i2c = {scl: scl, sda: sda};
        return {
            type: 'define_i2c_declaration',
            fields: {},
            values: {
                SCL: null,
                SDA: null
            },
            mutation: null,
            statementsNode: {SCL: scl, SDA: sda},
            statements: null,
        }
    } else {
        return null;
    };
};