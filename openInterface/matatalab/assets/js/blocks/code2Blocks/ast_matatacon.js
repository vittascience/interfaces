import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

// 12 colour fields: not learned from the generator (see learnedTranslations.js)
utils.prototypeBlocks['set_ring_leds'] = function (type, identifier, values, mutations, statementsNode) {
	const colors = statementsNode?.[0]?.type === 'list' ? statementsNode[0].children.filter((child) => child.type === 'string').map((child) => child.text.replace(/["']/g, '')) : [];
	const isLiteral = identifier === 'matatalab' && colors.length === 12 && colors.every((color) => /^#[0-9a-f]{6}$/i.test(color))
		&& statementsNode[0].children.every((child) => ['string', '[', ']', ','].includes(child.type));
	if (!isLiteral) return null;
	return {
		type: 'matatacon_setRingLeds',
		fields: Object.fromEntries(colors.map((color, i) => ['LED' + (i + 1), color])),
		values: null,
		mutations: null,
		statementsNode: null,
		statement: null,
	};
};
