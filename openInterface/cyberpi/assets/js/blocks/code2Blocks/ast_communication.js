import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';


const musicNotes = ['261.63', '277.18', '293.66', '311.13', '329.63', '349.23', '369.99', '392.0', '415.30', '440.0', '466.16', '493.88'];

utils.prototypeBlocks['music_note_cyberpi'] = function (type, fields, values, mutations, statementsNode, statement) {
	let note = null;
	let customNote = false;
	let stop = false;

	if (statementsNode.length > 0) {
		if (statementsNode[0].type === 'string') {
			const string = utils.extractString(statementsNode[0]);
			const matchNote = string.text.match(/@music:(\d+\.?\d*)\|/);
			const matchStop = string.text.match(/@music:stop/);
			if (matchNote) {
				const noteString = matchNote[1]; // Capture du groupe 1 contenant la note
				if (musicNotes.includes(noteString)) {
					note = noteString;
				}
			} else if (matchStop) {
				stop = true;
			}
		} else if (statementsNode[0].type === 'binary_operator') {
			for (const node of statementsNode[0].children) {
				if (node.type === 'binary_operator') {
					for (const childBinary of node.children) {
						if (childBinary.type === 'call') {
							for (const child of childBinary.children) {
								if (child.type === 'argument_list') {
									const args = utils.getArgumentList(child.children);
									if (args.length > 0) {
										note = args[0];
									}
									customNote = true;
								}
							}
						}
					}
				}
			}
		}
	}
	if (!customNote) {
		if (stop) {
			return {
				type: 'communication_stopComputerMusic',
				fields: null,
				mutations: null,
				values: null,
				statementsNode: null,
				statements: null,
			};
		}
		return {
			type: 'communication_playComputerMusic',
			fields: {
				NOTE: note || '293.66',
			},
			mutations: null,
			values: null,
			statementsNode: null,
			statements: null,
		};
	} else {
		return {
			type: 'communication_playComputerFrequency',
			fields: null,
			mutations: null,
			values: {
				FREQUENCY: null,
			},
			statementsNode: { FREQUENCY: note },
			statements: null,
		};
	}
};
