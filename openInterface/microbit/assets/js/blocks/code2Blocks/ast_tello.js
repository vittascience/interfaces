import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

const telloBlock = (type, fields = {}, inputs = {}) => ({
	type,
	fields,
	values: Object.fromEntries(Object.keys(inputs).map((name) => [name, null])),
	mutations: null,
	statementsNode: inputs,
	statements: null,
});

// "drone = Tello(TX, RX, SSID)" then "drone.drone_init()"
let droneSettings = null;
utils.prototypeBlocks['drone'] = function (right) {
	if (!right.text.startsWith('Tello(')) return '';
	const args = utils.getArgumentList(right.children.find((child) => child.type === 'argument_list').children);
	droneSettings = { TX: args[0]?.text, RX: args[1]?.text, SSID: args[2] };
	return '';
};
utils.prototypeBlocks['drone.drone_init'] = function () {
	const { TX, RX, SSID } = droneSettings || {};
	return telloBlock('drone_init', { TX: TX || 'pin14', RX: RX || 'pin0' }, { SSID: SSID || { type: 'string', text: "''" } });
};

const SIMPLE_COMMANDS = {
	takeoff: 'tello_takeoff',
	land: 'tello_land',
	emergency: 'tello_emergency',
	stop: 'tello_stop',
	streamon: 'tello_stream_on',
	streamoff: 'tello_stream_off',
	'speed?': 'tello_speed',
	'battery?': 'tello_battery',
	'time?': 'tello_flight_time',
};
// Commands with a value: "drone.send_cmd("up "+ str(100))"
const VALUE_COMMANDS = {
	up: ['tello_move_up_down', 'ALTITUDE'],
	down: ['tello_move_up_down', 'ALTITUDE'],
	right: ['tello_move', 'DISTANCE'],
	left: ['tello_move', 'DISTANCE'],
	forward: ['tello_move', 'DISTANCE'],
	back: ['tello_move', 'DISTANCE'],
	cw: ['tello_rotate', 'ANGLE'],
	ccw: ['tello_rotate', 'ANGLE'],
};

utils.prototypeBlocks['drone.send_cmd'] = function (type, fields, values, mutations, statementsNode) {
	const command = statementsNode[0];
	if (command?.type === 'string') {
		const text = utils.extractString(command).text;
		if (SIMPLE_COMMANDS[text]) return telloBlock(SIMPLE_COMMANDS[text]);
		if (text.startsWith('flip ')) return telloBlock('tello_flip', { FLIP: text.replace('flip ', '') });
	} else if (command?.type === 'binary_operator' && command.children[0].type === 'string') {
		const direction = utils.extractString(command.children[0]).text.trim();
		let value = command.children[2];
		if (value?.type === 'call' && value.children[0]?.text === 'str') {
			value = utils.getArgumentList(value.children[1].children)[0];
		}
		if (VALUE_COMMANDS[direction]) {
			const [blockType, input] = VALUE_COMMANDS[direction];
			return telloBlock(blockType, { DIRECTION: direction }, { [input]: value });
		}
	}
	return null;
};

utils.prototypeBlocks['tello_draw_rectangle'] = function (type, fields, values, mutations, statementsNode) {
	return telloBlock('tello_rectangle_form', {}, { LENGTH: statementsNode[0], WIDTH: statementsNode[1] });
};
utils.prototypeBlocks['tello_draw_square'] = function (type, fields, values, mutations, statementsNode) {
	return telloBlock('tello_square_form', {}, { LENGTH: statementsNode[0] });
};
utils.prototypeBlocks['get_pos'] = function (type, fields, values, mutations, statementsNode) {
	return telloBlock('tello_go', {}, { DISTANCE: statementsNode[0], SPEED: statementsNode[1] });
};
