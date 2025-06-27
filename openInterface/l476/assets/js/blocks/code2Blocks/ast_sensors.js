import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


utils.prototypeBlocks['grove_getUltrasonicData'] = function (type, fields, values, mutations, statementsNode, statement) {
	let pin = null;
	let data = null;

	for (const child of statementsNode) {
		if (child.type === 'identifier') {
			// pin = child.text;
            pin = `'${utils.python2Blocks._classes[child.text].pin}'`;
		} else if (child.type === 'keyword_argument') {
			let identifier = null;
			for (const children of child.children) {
				if (children.type === 'identifier' && identifier === null) {
					if (children.text === 'data') {
						identifier = 'data';
					}
				} else if (children.type === 'string' && identifier !== null) {
					const stringContent = utils.extractString(children);
					data = ['distance', 'duration'].includes(stringContent.text) ? (stringContent.text === 'distance' ? 'DIST' : 'TIME') : 'DIST';
				}
			}
		} else if (child.type === 'string') {
            pin = `'${utils.extractString(child).text}'`;
        }
	}

	return {
		type: 'sensors_getGroveUltrasonicRanger',
		fields: { SENSOR: 'GROVE', DATA: data || 'DIST', PIN: pin || 'D2' },
		values: null,
		mutations: { pin: true },
		statementsNode: null,
		statements: null,
	};
};