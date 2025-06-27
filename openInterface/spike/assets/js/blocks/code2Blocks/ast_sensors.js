import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const authorizedPorts = ['A', 'B'];

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

	return { method, subMethod };
};


utils.prototypeBlocks['color_sensor.color'] = function (type, fields, values, mutations, statementsNode, statement, parent) {
    let port = 'A';

    if (statementsNode && statementsNode.length === 1) {
        if (statementsNode[0].type === 'attribute') {
            const { method, subMethod } = getAttributeIdentifier(statementsNode[0]);
            if (method === 'port' && authorizedPorts.includes(subMethod)) {
                port = subMethod;
            }
        }
    }

    return {
        type: 'sensors_color',
        fields: { PORT: port },
        values: null,
        mutations: null,
        statementsNode: null,
        statements: null,
    };
};

