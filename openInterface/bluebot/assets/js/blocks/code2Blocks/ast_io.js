import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

utils.prototypeBlocks['sleep'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const checkImport = utils.checkImport(identifier);
	if (checkImport && identifier === 'utime') {
		return {
			type: 'io_pause',
			fields: { UNIT: 'SECOND' },
			values: {
				TIME: null,
			},
			mutations: null,
			statementsNode: { TIME: statementsNode[0] },
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['sleep_ms'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const checkImport = utils.checkImport(identifier);
	if (checkImport && identifier === 'utime') {
		return {
			type: 'io_pause',
			fields: { UNIT: 'MILLI' },
			values: {
				TIME: null,
			},
			mutations: null,
			statementsNode: { TIME: statementsNode[0] },
			statements: null,
		};
	} else {
		return null;
	}
};

utils.prototypeBlocks['sleep_us'] = function (type, identifier, values, mutations, statementsNode, statement) {
	const checkImport = utils.checkImport(identifier);
	if (checkImport && identifier === 'utime') {
		return {
			type: 'io_pause',
			fields: { UNIT: 'MICRO' },
			values: {
				TIME: null,
			},
			mutations: null,
			statementsNode: { TIME: statementsNode[0] },
			statements: null,
		};
	} else {
		return null;
	}
};





