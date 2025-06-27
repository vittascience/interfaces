import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['color_picker'] = function (hexColor) {
    return {
        type: 'colour_picker',
        fields: { COLOUR: hexColor },
        values: {},
        mutations: null,
        statementsNode: null,
        statement: null
    };
};

utils.prototypeBlocks['leds_service.fade'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const namesAvailable = ["AllLeds", "BrainLeds", "EarLeds", "FaceLeds", "ChestLeds", "FeetLeds"];
    let name = namesAvailable[0];
    let intensity = null, duration = null;

    for (const child of statementsNode) {
        if (child.type === 'string') {
            name = utils.extractString(child).text;
        } else if (child.type === 'integer' && intensity === null) {
            intensity = child;
        } else if (child.type === 'integer' && intensity !== null) {
            duration = child;
        }
    }

    return {
        type: 'display_fade',
        fields: {
            NAME: namesAvailable.includes(name) ? name : namesAvailable[0]
        },
        values: {
            INTENSITY: null,
            DURATION: null
        },
        mutations: null,
        statementsNode: {
            INTENSITY: intensity || { type: 'integer', text: '0', children: [] },
            DURATION: duration || { type: 'integer', text: '1', children: [] }
        },
        statement: null
    };
};


utils.prototypeBlocks['leds_service.fadeRGB'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const namesAvailable = ["AllLeds", "BrainLeds", "FaceLeds", "ChestLeds", "FeetLeds"];
    const colorsAvailable = ["white", "red", "green", "blue", "yellow", "magenta", "cyan"];
    const args = statementsNode.map(child => 
        child.type === 'string' ? utils.extractString(child).text : child
    );

    let name = namesAvailable[0];
    if (args.length > 0) {
        name = args[0];
    }

    let r = null, g = null, b = null, duration = null;
    switch (args.length) {
        case 3:
            let color = args[1];
            duration = args[2];
            return {
                type: 'display_fadeRGB_colorName',
                fields: {
                    NAME: namesAvailable.includes(name) ? name : namesAvailable[0],
                    COLOR: colorsAvailable.includes(color) ? color : colorsAvailable[0]
                },
                values: {
                    DURATION: null
                },
                mutations: null,
                statementsNode: {
                    DURATION: duration || { type: 'integer', text: '1', children: [] }
                },
                statement: null
            };
        case 5:
            r = args[1];
            g = args[2];
            b = args[3];
            duration = args[4];
            const convertRGB = utils.convertRBGtoHex([r, g, b].map(item => {
                return {
                    ...item,
                    text: parseInt(item.text) / 100 * 255
                };
            }));
            if (convertRGB !== null) {
                return {
                    type: 'display_fadeRGB_palette',
                    fields: {
                        NAME: namesAvailable.includes(name) ? name : namesAvailable[0]
                    },
                    values: {
                        COLOR: null,
                        DURATION: null
                    },
                    mutations: null,
                    statementsNode: {
                        COLOR: {
                            type: 'bypass',
                            block: 'color_picker',
                            text: convertRGB
                        },
                        DURATION: duration || { type: 'integer', text: '1', children: [] }
                    },
                    statement: null
                };
            }
    }
    if (args.length === 6 && ['FaceLedRight', 'FaceLedLeft', 'FaceLedLeft&Right'].includes(name)) {
        const side = name.replace('FaceLed', '');
        r = args[1];
        g = args[2];
        b = args[3];
        duration = args[4];
        const id = args[5];
        const convertRGB = utils.convertRBGtoHex([r, g, b].map(item => {
            return {
                ...item,
                text: parseInt(item.text) / 100 * 255
            };
        }));
        if (convertRGB !== null) {
            return {
                type: 'display_fadeFaceRGB_palette',
                fields: {
                    SIDE: side
                },
                values: {
                    ID: null,
                    COLOR: null,
                    DURATION: null
                },
                mutations: null,
                statementsNode: {
                    ID: id,
                    COLOR: {
                        type: 'bypass',
                        block: 'color_picker',
                        text: convertRGB
                    },
                    DURATION: duration || { type: 'integer', text: '1', children: [] }
                },
                statement: null
            };
        }
        return {
            type: 'display_fadeFaceRGB',
            fields: {
                SIDE: side
            },
            values: {
                ID: null,
                R: null,
                G: null,
                B: null,
                DURATION: null
            },
            mutations: null,
            statementsNode: {
                ID: id,
                R: r || { type: 'integer', text: '0', children: [] },
                G: g || { type: 'integer', text: '0', children: [] },
                B: b || { type: 'integer', text: '0', children: [] },
                DURATION: duration || { type: 'integer', text: '1', children: [] }
            },
            statement: null
        };
    }
    return {
        type: 'display_fadeRGB',
        fields: {
            NAME: namesAvailable.includes(name) ? name : namesAvailable[0]
        },
        values: {
            R: null,
            G: null,
            B: null,
            DURATION: null
        },
        mutations: null,
        statementsNode: {
            R: r || { type: 'integer', text: '0', children: [] },
            G: g || { type: 'integer', text: '0', children: [] },
            B: b || { type: 'integer', text: '0', children: [] },
            DURATION: duration || { type: 'integer', text: '1', children: [] }
        },
        statement: null
    };
};

const ledsAnimations = ['randomEyes', 'rasta'];
ledsAnimations.forEach(animation => {
    utils.prototypeBlocks[`leds_service.${animation}`] = function (type, identifier, values, mutations, statementsNode, statement) {
        let duration = null;

        for (const child of statementsNode) {
            if (child.type === 'integer' && duration === null) {
                duration = child;
            }
        }

        return {
            type: `display_${animation}`,
            fields: {},
            values: {
                DURATION: null
            },
            mutations: null,
            statementsNode: {
                DURATION: duration || { type: 'integer', text: '1', children: [] }
            },
            statement: null
        };
    };
});

utils.prototypeBlocks[`leds_service.setIntensity`] = function (type, identifier, values, mutations, statementsNode, statement) {
    const namesAvailable = ["AllLeds", "BrainLeds", "EarLeds", "FaceLeds", "ChestLeds", "FeetLeds"];
    const args = [];

    for (const child of statementsNode) {
        if (child.type === 'string') {
            args.push(utils.extractString(child).text);
        } else if (child.type === 'integer' || child.type === 'float') {
            args.push(child);
        }
    }

    let name = namesAvailable[0];
    let intensity = null;
    if (args.length === 2) {
        name = args[0];
        intensity = args[1];
        intensity.text = `${parseFloat(intensity.text) * 100}`;
    }

    return {
        type: `display_setIntensity`,
        fields: {
            NAME: namesAvailable.includes(name) ? name : namesAvailable[0]
        },
        values: {
            INTENSITY: null
        },
        mutations: null,
        statementsNode: {
            INTENSITY: intensity || { type: 'integer', text: '1', children: [] }
        },
        statement: null
    };
};

const ledsUtils = ['on', 'off', 'reset'];
ledsUtils.forEach(util => {
    utils.prototypeBlocks[`leds_service.${util}`] = function (type, identifier, values, mutations, statementsNode, statement) {
        const namesAvailable = ["AllLeds", "BrainLeds", "EarLeds", "FaceLeds", "ChestLeds", "FeetLeds"];
        let name = null;
        for (const child of statementsNode) {
            if (child.type === 'string' && name === null) {
                name = utils.extractString(child).text;
            }
        }

        return {
            type: `display_${util}`,
            fields: {
                NAME: namesAvailable.includes(name) ? name : namesAvailable[0]
            },
            values: {},
            mutations: null,
            statementsNode: {},
            statement: null
        };
    };
});

utils.prototypeBlocks[`leds_service.rotateEyes`] = function (type, identifier, values, mutations, statementsNode, statement) {
    const args = [];
    for (const child of statementsNode) {
        if (child.type === 'string') {
            args.push({
                type: 'string',
                text: utils.extractString(child).text
            });
        } else {
            args.push(child);
        }
    }

    let color = null, timeForRotation = null, duration = null;
    if (args.length > 0 && args[0].type === 'string') {
        color = args[0].text;
    }
    if (args.length > 1 && (args[1].type === 'integer' || args[1].type === 'float')) {
        timeForRotation = args[1];
    }
    if (args.length > 2 && (args[2].type === 'integer' || args[2].type === 'float')) {
        duration = args[2];
    }

    return {
        type: `display_rotateEyes`,
        fields: {},
        values: {
            COLOR: null,
            TIME_FOR_ROTATION: null,
            DURATION: null
        },
        mutations: null,
        statementsNode: {
            COLOR: {
                type: 'bypass',
                block: 'color_picker',
                text: color || '#3333FF'
            },
            TIME_FOR_ROTATION: timeForRotation || { type: 'integer', text: '1', children: [] },
            DURATION: duration || { type: 'integer', text: '1', children: [] }

        },
        statement: null
    };
};