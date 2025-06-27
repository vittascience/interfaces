import utils from '/openInterface/interfaces/assets/js/code2blocks/cpp/utils/utils.js';

utils.prototypeBlocks['Serial.available()_string'] = function (type, fields, values, mutations, statementsNode, statement) {
	let stringVar = null;

	const assignmentVar = utils.returnFirstExpression(statementsNode.children, 'assignment_expression');

	if (assignmentVar !== null) {
		stringVar = assignmentVar.children[0]?.text || null;
	}

	if (stringVar === null) {
		stringVar = 'serialData';
	}

	const varID = utils.cpp2Blocks.getVariableID(stringVar) || utils.cpp2Blocks.declareBlocklyVariable(stringVar, null);

	const removeBracketNodes = statementsNode.children.filter((node) => node.type !== '{' && node.type !== '}');
	const doStatement = removeBracketNodes.length > 1 ? removeBracketNodes.slice(1) : [];
	return {
		type: 'communication_onSerialDataReceived',
		fields: { VAR: { name: 'VAR', id: varID, value: stringVar } },
		values: null,
		mutations: null,
		statements: { DO: { type: 'compound_statement', children: doStatement } },
		statementsNode: null,
	};
};

const musicNotes = ['261.63', '277.18', '293.66', '311.13', '329.63', '349.23', '369.99', '392.0', '415.30', '440.0', '466.16', '493.88'];

utils.prototypeBlocks['music_note_mBot'] = function (noteString) {
	let note = null;
	let customNote = false;
	let stop = false;

	const matchNote = noteString.match(/@music:(\d+\.?\d*)\|/);
	const matchStop = noteString.match(/@music:stop/);
	if (matchNote) {
		const noteString = matchNote[1]; // Capture du groupe 1 contenant la note
        note = noteString;
		if (!musicNotes.includes(noteString)) {
            customNote = true;
		} 
	} else if (matchStop) {
		stop = true;
	}
    if (customNote){
        return {
            type: 'communication_playComputerFrequency',
            fields: null,
            values: { FREQUENCY: null },
            mutations: null,
            statementsNode: {FREQUENCY :{ type: 'number_literal', text: note || '293.66', children: [] }},
			statement: null,
        }
    }
	if (stop) {
		return {
			type: 'communication_stopComputerMusic',
			fields: null,
			values: null,
			mutations: null,
			statementsNode: null,
			statement: null,
		};
	}
	return {
		type: 'communication_playComputerMusic',
		fields: { NOTE: note || '293.66'},
		values: null,
		mutations: null,
		statementsNode: { FREQUENCY: note},
		statement: null,
	};
};
