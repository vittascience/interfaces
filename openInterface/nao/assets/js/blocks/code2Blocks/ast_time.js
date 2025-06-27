import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const createTimePauseBlock = (unit, identifier, statementsNode) => {
	const checkImport = utils.checkImport(identifier);
	if (checkImport && identifier === 'time') {
		return {
			type: 'time_pause',
			fields: { UNIT: unit },
			values: {
				TIME: null,
			},
			mutations: null,
			statementsNode: { TIME: statementsNode[0] || { type: 'integer', text: '0', children: [] } },
			statements: null,
		};
	}
	return null;
};

utils.prototypeBlocks['sleep'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return createTimePauseBlock('SECOND', identifier, statementsNode);
};

utils.prototypeBlocks['sleep_ms'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return createTimePauseBlock('MILLI', identifier, statementsNode);
};

utils.prototypeBlocks['sleep_us'] = function (type, identifier, values, mutations, statementsNode, statement) {
	return createTimePauseBlock('MICRO', identifier, statementsNode);
};