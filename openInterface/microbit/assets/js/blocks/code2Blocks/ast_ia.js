import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const iaBlock = (type, fields = {}, inputs = {}) => ({
	type,
	fields,
	values: Object.fromEntries(Object.keys(inputs).map((name) => [name, null])),
	mutations: null,
	statementsNode: inputs,
	statements: null,
});

// ==============================================
// VITTAIA
// ==============================================

// "model = Model("local")", "model = Model(URL)" or "model = Model()" (initialization added by the other blocks)
utils.prototypeBlocks['model'] = function (right) {
	if (!right.text.startsWith('Model(')) return null;
	const args = utils.getArgumentList(right.children.find((child) => child.type === 'argument_list').children);
	if (!args.length) return '';
	if (args[0].type === 'string' && utils.extractString(args[0]).text === 'local') return iaBlock('vittaia_load_local_model');
	return iaBlock('vittaia_load_cloud_model', {}, { MODEL_URL: args[0] });
};
utils.prototypeBlocks['model.predict'] = function () {
	return iaBlock('vittaia_make_prediction');
};
// "if model.detect_class() == CLASS:" stays an "if" block with this block in the condition (same code)
utils.prototypeBlocks['model.detect_class'] = function () {
	return iaBlock('vittaia_get_highest_probability_class');
};

// ==============================================
// HUSKYLENS
// ==============================================

utils.prototypeBlocks['HuskyLensLibrary'] = function () {
	return 'null';
};

const HUSKYLENS_MODES = {
	face_recognition_mode: 'FACE_RECOGNITION',
	object_tracking_mode: 'OBJECT_TRACKING',
	object_recognition_mode: 'OBJECT_RECOGNITION',
	line_tracking_mode: 'LINE_TRACKING',
	color_recognition_mode: 'COLOR_RECOGNITION',
	tag_recognition_mode: 'TAG_RECOGNITION',
	object_classification_mode: 'OBJECT_CLASSIFICATION',
};
for (const [method, mode] of Object.entries(HUSKYLENS_MODES)) {
	utils.prototypeBlocks[`huskylens.${method}`] = function () {
		return iaBlock('cameras_huskylens_setMode', { MODE: mode });
	};
}

// "huskylens.command_request_custom_text(str(TEXT), X, Y)"
utils.prototypeBlocks['huskylens.command_request_custom_text'] = function (type, fields, values, mutations, statementsNode) {
	let text = statementsNode[0];
	if (text?.type === 'call' && text.children[0]?.text === 'str') {
		text = utils.getArgumentList(text.children[1].children)[0];
	}
	return iaBlock('cameras_huskylens_setText', {}, { TEXT: text, X: statementsNode[1], Y: statementsNode[2] });
};
utils.prototypeBlocks['huskylens.command_request_clear_text'] = function () {
	return iaBlock('cameras_huskylens_clearScreen');
};
utils.prototypeBlocks['huskylens.command_request_learn_once'] = function (type, fields, values, mutations, statementsNode) {
	return iaBlock('cameras_huskylens_learnID', {}, { ID: statementsNode[0] });
};
utils.prototypeBlocks['huskylens.command_request_custom_name'] = function (type, fields, values, mutations, statementsNode) {
	return iaBlock('cameras_huskylens_customName', {}, { ID: statementsNode[0], NAME: statementsNode[1] });
};
utils.prototypeBlocks['huskylens.command_request_forget'] = function () {
	return iaBlock('cameras_huskylens_forgetIDs');
};
utils.prototypeBlocks['huskylens.command_request_save_model_to_SD_card'] = function (type, fields, values, mutations, statementsNode) {
	return iaBlock('cameras_huskylens_saveModel', {}, { INDEX: statementsNode[0] });
};
utils.prototypeBlocks['huskylens.command_request_load_model_from_SD_card'] = function (type, fields, values, mutations, statementsNode) {
	return iaBlock('cameras_huskylens_loadModel', {}, { INDEX: statementsNode[0] });
};

for (const [dataType, variable, request] of [['BLOCKS', 'huskyLensBlocksData', 'blocks'], ['ARROWS', 'huskyLensArrowsData', 'arrows']]) {
	// "huskyLensBlocksData = huskylens.command_request_blocks()"
	utils.prototypeBlocks[variable] = function (right) {
		if (right.text !== `huskylens.command_request_${request}()`) return null;
		return iaBlock('cameras_huskylens_getData', { TYPE: dataType });
	};
	utils.prototypeBlocks[`huskylens.command_request_${request}_by_id`] = function (type, fields, values, mutations, statementsNode) {
		return iaBlock('cameras_huskylens_getDataByID', { TYPE: dataType }, { ID: statementsNode[0] });
	};
}

// "extract_blocks_data(huskyLensBlocksData, 'ID')" and "extract_arrows_data(huskyLensArrowsData, 'X1')"
utils.prototypeBlocks['extract_blocks_data'] = function (type, fields, values, mutations, statementsNode) {
	return iaBlock('cameras_huskylens_requestBlocksData', { DATA: utils.extractString(statementsNode[1]).text });
};
utils.prototypeBlocks['extract_arrows_data'] = function (type, fields, values, mutations, statementsNode) {
	return iaBlock('cameras_huskylens_requestArrowsData', { DATA: utils.extractString(statementsNode[1]).text });
};
// "extract_blocks_data(huskyLensBlocksData, 'X')[0]"
for (const data of ['X', 'Y', 'WIDTH', 'HEIGHT']) {
	utils.prototypeBlocks[`extract_blocks_data(huskyLensBlocksData, '${data}')`] = function (identifier, index) {
		if (index?.text !== '0') return null;
		return iaBlock('cameras_huskylens_requestBlockXY', { DATA: data });
	};
}

// "len(huskyLensBlocksData)": number of detected elements, other lengths stay list blocks
const listLength = utils.prototypeBlocks['len'];
utils.prototypeBlocks['len'] = function (type, fields, values, mutations, statementsNode, ...args) {
	const dataTypes = { huskyLensBlocksData: 'BLOCKS', huskyLensArrowsData: 'ARROWS' };
	if (statementsNode?.length === 1 && dataTypes[statementsNode[0].text]) {
		return iaBlock('cameras_huskylens_getNumberOfDetectedElements', { TYPE: dataTypes[statementsNode[0].text] });
	}
	return listLength(type, fields, values, mutations, statementsNode, ...args);
};

// "id_present(huskyLensBlocksData, ID)"
utils.prototypeBlocks['id_present'] = function (type, fields, values, mutations, statementsNode) {
	return iaBlock('cameras_huskylens_checkID', { TYPE: statementsNode[0]?.text === 'huskyLensArrowsData' ? 'ARROWS' : 'BLOCKS' }, { ID: statementsNode[1] });
};

// "line_direction(huskyLensArrowsData, ID) == "STRAIGHT""
utils.binaryInterceptors['line_direction_EQ'] = function (left, operator, right) {
	if (right.type !== 'string') return null;
	const args = utils.getArgumentList(left.children.find((child) => child.type === 'argument_list').children);
	return iaBlock('cameras_huskylens_getLineDirection', { DIRECTION: utils.extractString(right).text }, { ID: args[1] });
};

// ==============================================
// WIO LITE AI
// ==============================================

// "wio_get_class_data()", "wio_get_class_data(ID)" or "wio_get_class_data("max")"
utils.prototypeBlocks['wio_get_class_data'] = function (type, fields, values, mutations, statementsNode) {
	if (!statementsNode.length) return iaBlock('wio_get_class_data');
	if (statementsNode[0].type === 'string' && utils.extractString(statementsNode[0]).text === 'max') return iaBlock('wio_get_class_max_id');
	return iaBlock('wio_get_class_data_by_id', {}, { ID: statementsNode[0] });
};
utils.prototypeBlocks['wio_get_info'] = function (type, fields, values, mutations, statementsNode) {
	return iaBlock('wio_get_status', { DATA: utils.extractString(statementsNode[0]).text });
};
