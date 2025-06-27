import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['timer_period'] = function (timer, value) {
    let timerElement = 0;
    let timerValue = { type: 'integer', text: "1000" };

    for (const child of timer.children) {
        if (child.type === 'integer') {
            timerElement = child.text;
        }
    }

    timerValue = value || timerValue;

    return {
        type: 'io_timer_ms',
        fields: { TIMER: timerElement },
        values: { TIME: null },
        mutation: null,
        statementsNode: { TIME: timerValue },
        statements: null,
    }
}

const buttonsEvents = ['button_center', 'button_left', 'button_right', 'button_backward', 'button_forward'];
for (const event of buttonsEvents) {
	utils.prototypeBlocks[`@onevent_${event}`] = function (decorator, functionDef, functionBlock) {
		return {
			type: 'io_onButtonPressed_event',
			fields: { BUTTON: functionDef.text },
			values: null,
			mutation: null,
			statementsNode: null,
			statements: { DO: functionBlock },
		};
	};
};

utils.prototypeBlocks['@onevent_prox'] = function (decorator, functionDef, functionBlock) {
	let proxEventObject = [];
    
    let globals = null;
	let proxSensor = null;
    let proxValue = null;
    let operator = null;
    let value = null;
    let treeshold = null;
    const operators = ['<', '>', '==', '!=', '<=', '>='];
    let blockStatement = null;
    let fields = null;
    
	for (const child of functionBlock.children) {
		if (child.type === 'if_statement') {
			for (const ifChild of child.children) {
				if (ifChild.type === 'comparison_operator') {
                    for (const operatorChild of ifChild.children) {
                        if (operatorChild.type === 'subscript') {
                            for (const subscriptChild of operatorChild.children) {
                                if (subscriptChild.type === 'identifier' && subscriptChild.text === 'prox_horizontal') {
                                    proxSensor = "io_onProximity_event";
                                } else if (subscriptChild.type === 'identifier' && subscriptChild.text === 'prox_ground_delta') {
                                    proxSensor = "io_onProximityLine_event";
                                } else if (subscriptChild.type === 'integer'){
                                    proxValue = subscriptChild.text;
                                }
                            }
                        } else if (operators.includes(operatorChild.type)) {
                            operator = operatorChild.text;
                        }
                    }
                } else if (ifChild.type === 'block') {
                    blockStatement = ifChild;
                }
			};
            if (proxSensor === "io_onProximity_event") {
                treeshold = value < 1000 && operator === '<' ? "< 1000" : "> 2000";
                fields = { PROXIMITY: proxValue, OPERATOR: treeshold};
            } else if (proxSensor === "io_onProximityLine_event") {
                treeshold = value < 400 && operator === '<' ? "black" : "white";
                fields = { DIRECTION: proxValue, VALUE: treeshold}
            }
            proxEventObject.push({
                type: proxSensor,
                fields: fields,
                values: null,
                mutation: null,
                statementsNode: null,
                statements: { DO: blockStatement },
            });
		};
	};

    const python2Blocks = utils.python2Blocks;

    // the trick is to return the last element of the array. Others element will be added to the xml directly
    for (let i = 0; i < proxEventObject.length; i++) {
        if (i === proxEventObject.length - 1) {
            return proxEventObject[i];
        } else {
            // node, blockType.type, blockType.fields, blockType.values, blockType.mutations, blockType.statementsNode, blockType.element, blockType.statements
            const xml = python2Blocks.createBlocklyBlockXml(null, proxEventObject[i].type, proxEventObject[i].fields, proxEventObject[i].values, proxEventObject[i].mutation, proxEventObject[i].statementsNode, proxEventObject[i].element, proxEventObject[i].statements);
            python2Blocks.xml.append(xml);
        }
    }
};

utils.prototypeBlocks['@onevent_timer0'] = function (decorator, functionDef, functionBlock) {
    return {
        type: 'io_onTimer_event',
        fields: { TIMER: 0 },
        values: null,
        mutation: null,
        statementsNode: null,
        statements: { DO: functionBlock },
    };
};

utils.prototypeBlocks['@onevent_timer1'] = function (decorator, functionDef, functionBlock) {
    return {
        type: 'io_onTimer_event',
        fields: { TIMER: 1 },
        values: null,
        mutation: null,
        statementsNode: null,
        statements: { DO: functionBlock },
    };
};
