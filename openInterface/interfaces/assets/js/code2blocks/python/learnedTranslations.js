/**
 * @fileoverview learnedTranslations.js
 * Reverse translation learned from the blocks generators, for the blocks without a hand written translation.
 *
 * For each block, the generator is run with markers in the value inputs (variables "vittaReverseInputN"), markers in
 * the statement inputs ("vittaReverseStatementN = 0"), markers in the free fields (number, text, colour) and every
 * option of the dropdown fields (a dropdown changing the code in several places gives a template per option). The generated code gives a template
 * (a regular expression) that recognizes the code of the block, the options of its fields and the code of its inputs.
 * The imports, constants and initializations added by the block are remembered to be ignored during the translation.
 *
 * The templates are used when the hand written translation gives a generic block (call expression), or first when the
 * initializations of the block (ex: """ Maqueen robot """) are in the program. The blocks generating several
 * statements are recognized before the statements are translated one by one.
 */

// markers end with "_": "vittaReverseInput1_" is not the start of "vittaReverseInput10_"
const INPUT_MARKER = 'vittaReverseInput';
const STATEMENT_MARKER = 'vittaReverseStatement';
const TEXT_MARKER = 'vittaReverseText';
const VARIABLE_MARKER = 'vittaReverseVar';
// "global" declaration of the variables used in a body (ex: Thymio events): any "global" line, or none
const GLOBAL_MARKER = 'vittaReverseGlobal';
const NUMBER_MARKER = 7531;
const COLOUR_MARKER = { hex: '#0a141e', rgb: '10,20,30' };
// Generic blocks given by the translation when no specific block is found.
const GENERIC_BLOCKS = /^(call_expression.*|comment_docstrings|text_comment|untranslatable_.*)$/;
// Limit of renderings for a block (one per option of each dropdown field).
const MAX_RENDERINGS = 600;
// Limit of templates for a block (a dropdown changing the code in several places gives a template per option).
const MAX_TEMPLATES = 64;
// Limit of option combinations of the dropdowns changing the initializations only (ex: TX/RX pins of the same UART).
const MAX_COMBINATIONS = 1000;
// Length of the literal start of a template recognizing a specific code (ex: "ifuart.any():", not "if" + input).
const SPECIFIC_HEAD = 8;

// Code compared without spaces and tabs (generators and users do not indent the same way inside a statement).
const normalize = (text) => text.replace(/[ \t]+/g, '').replace(/\n+/g, '\n').trim();
// Generators of the languages: stores of the initializations added by the blocks, and statements of a parsed code.
export const PYTHON = {
	generator: () => Blockly.Python,
	definitions: ['imports_', 'constants_', 'inits_', 'powers_', 'classes_'],
	// functions added by the blocks (ex: "@onevent def tap():" of the Thymio events)
	functions: ['codeFunctions_', 'powersEvents_'],
	// initializations of the blocks generating no code of their own (ex: NAO story: "story = dynamic_story1")
	setup: ['inits_'],
	statements: (parse, code) => parse(code).children,
	comment: /^(#|""")/,
};
export const ARDUINO = {
	generator: () => Blockly.Arduino,
	definitions: ['includes_', 'definitions_', 'declarations_', 'variables_', 'codeVariables_', 'codeSetup_', 'powers_'],
	// initializations generated in the setup function
	setup: ['codeSetup_', 'powers_'],
	// types of the variables declared by the blocks (cppTypes of cppCode2Blocks.js)
	declarationTypes: ['int', 'char', 'float', 'boolean', 'short', 'long', 'String'],
	// statements of a function body (C++ statements are not allowed out of a function); values end with ";"
	statements: (parse, code) => {
		const body = parse(`void vittaReverse() {\n${/[;}]\s*$/.test(code) ? code : code + ';'}\n}`).children[0]?.children.find((child) => child.type === 'compound_statement');
		return (body?.children || []).filter((child) => !['{', '}'].includes(child.type));
	},
	comment: /^\/\//,
};

// lines of the initializations, and the C++ lines with a final comment split in two nodes ("x = 1; // comment")
const splitComment = (line) => {
	const index = line.indexOf('//');
	return index > 0 && (line.slice(0, index).split('"').length % 2) === 1 ? [line.slice(0, index), line.slice(index)] : [];
};
const definitionLines = (definitions) => definitions.flatMap((definition) => definition.split('\n')).map(normalize).filter(Boolean)
	.flatMap((line) => [line, ...splitComment(line)]);
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default class LearnedTranslations {
	/**
	 * @param {object} parser - tree-sitter parser of the Python2Blocks instance
	 * @param {function} toJson - converts a tree-sitter node to the json nodes used by the translation
	 * @param {function} variableId - id of a variable of the translated program (declared if needed)
	 * @param {object} language - PYTHON or ARDUINO
	 */
	constructor(parser, toJson, variableId = null, language = PYTHON) {
		this.parser = parser;
		this.toJson = toJson;
		this.language = language;
		this.generator = language.generator();
		this.variableId = variableId;
		this.templates = [];
		this.definitions = new Set();
		this.programLines = new Set();
		this.programText = '';
		// initializations of the learned blocks recognized in the program (previous pass of the translation): only
		// these are ignored, the block generates them again
		this.activeDefinitions = new Set();
		this.recognizedDefinitions = new Set();
		this.renderedDefinitions = new Map();
	}

	/**
	 * Start of a translation pass: the initializations of the blocks recognized by the previous pass are ignored.
	 */
	beginPass() {
		for (const line of this.recognizedDefinitions) this.activeDefinitions.add(line);
		this.recognizedDefinitions = new Set();
	}

	/**
	 * Code being translated: when several templates recognize the same code (ex: buzzer of several robots), the
	 * template whose initializations are in the program is chosen.
	 * @param {string} code
	 */
	setProgram(code) {
		this.programLines = new Set(code.split('\n').map(normalize).filter(Boolean));
		this.programText = normalize(code);
		this.activeDefinitions = new Set();
		this.recognizedDefinitions = new Set();
	}

	/**
	 * True if the initialization is in the program (a line, or a function of several lines).
	 */
	inProgram(definition) {
		return definition.includes('\n') ? this.programText.includes(definition) : this.programLines.has(definition);
	}

	isGeneric(result) {
		// generic block, or block of another interface (ex: microcontroller block for the Python print function)
		return result === undefined || (result && typeof result === 'object' && (GENERIC_BLOCKS.test(result.type) || !Blockly.Blocks[result.type]));
	}

	/**
	 * Learn the templates of the given block types.
	 * @param {Array<string>} types
	 * @param {Array<string>} translatedTypes - blocks with a hand written translation: their initializations are not
	 *     ignored during the translation
	 * @returns {Array<string>} types translated by a template
	 */
	learn(types, translatedTypes = []) {
		const workspace = new Blockly.Workspace();
		const learned = [];
		const time = Date.now();
		// blocks with a hand written translation: learned too, used only when that translation gives a generic block
		const translated = new Set(translatedTypes);
		for (const type of [...new Set([...types, ...translatedTypes])]) {
			try {
				const templates = this.learnBlock(workspace, type);
				// blocks with an optional field added by their mutator (Blockly.Constants.Utils.addOptionMutatorMixin)
				workspace.clear();
				if (templates.length && typeof workspace.newBlock(type).addOptions_ === 'function') {
					workspace.clear();
					templates.push(...this.learnBlock(workspace, type, {}, true));
				}
				// with text blocks in the text inputs, when the code differs
				workspace.clear();
				const textBlock = workspace.newBlock(type);
				if (templates.length && textBlock.inputList.some((input) => input.type === Blockly.inputs.inputTypes.VALUE && (!input.connection.getCheck() || input.connection.getCheck().includes('String')))) {
					workspace.clear();
					const known = new Set(templates.map((template) => String(template.regex)));
					templates.push(...this.learnBlock(workspace, type, {}, false, true).filter((template) => !known.has(String(template.regex))));
				}
				if (templates.length) {
					for (const template of templates) template.translated = translated.has(type);
					this.templates.push(...templates);
					if (!translated.has(type)) learned.push(type);
				}
			} catch (error) {
				// generator not usable outside of a program: the block keeps locking the editor
			}
			workspace.clear();
		}
		for (const type of translatedTypes) {
			try {
				// initializations of every option of the dropdowns (ex: "pinMode(5, OUTPUT);" for each pin)
				const block = workspace.newBlock(type);
				const renders = [this.render(block)];
				for (const field of block.inputList.flatMap((input) => input.fieldRow)) {
					if (!(field instanceof Blockly.FieldDropdown) || !field.name) continue;
					const initial = field.getValue();
					for (const [, option] of field.getOptions(false)) {
						if (typeof option !== 'string') continue;
						field.setValue(option);
						renders.push(this.render(block));
					}
					field.setValue(initial);
				}
				for (const { definitions, functions } of renders) {
					for (const definition of [...definitions, ...functions]) {
						// docstrings and comments only mark the code of the blocks: always ignored
						const lines = [definition, ...definition.split('\n')].map(normalize).filter((line) => !this.language.comment.test(line));
						for (const line of lines) this.definitions.delete(line);
					}
				}
			} catch (error) {
				// block without generator outside of a program
			}
			workspace.clear();
		}
		workspace.dispose();
		// The generators state is reset by the next generation of the program.
		console.debug(`[Code2Blocks] ${learned.length}/${types.length} reverse translations learned (and ${this.templates.filter((template) => template.translated).length} templates of hand written translations) in ${Date.now() - time}ms`);
		return learned;
	}

	rawCode(block) {
		this.generator.init(block.workspace);
		// Some generators log their own warnings on marker inputs (e.g. esp32 network eval()s them).
		const warn = console.warn;
		console.warn = () => { };
		try {
			const code = this.generator.blockToCode(block, true);
			return (Array.isArray(code) ? code[0] : code) || '';
		} finally {
			console.warn = warn;
		}
	}

	render(block) {
		let code = this.rawCode(block);
		const strings = (stores) => stores.flatMap((store) => Object.values(store || {})).filter((definition) => typeof definition === 'string');
		let definitions = strings(this.language.definitions.map((store) => this.generator[store]));
		// functions added by the block: ignored as a whole (a line of a function may be a statement of the program)
		let functions = strings((this.language.functions || ['codeFunctions_']).map((store) => this.generator[store]));
		// block generating only a function holding its statements (ex: "def mqtt_onMessageReceived_cb(topic, msg):")
		if (!code.trim()) {
			const callback = functions.find((definition) => definition.includes(STATEMENT_MARKER));
			if (callback) {
				code = callback;
				functions = functions.filter((definition) => definition !== callback);
			}
		}
		// block generating only statements of the setup function (ex: "mp3.begin(115200);")
		if (!code.trim() && this.language.setup) {
			const setup = strings(this.language.setup.map((store) => this.generator[store]));
			// comments of the initializations (ex: "# UART bus 1 ..."): ignored like the other initializations
			const comment = (line) => this.language.comment.test(line.trim());
			const lines = setup.flatMap((definition) => definition.split('\n')).filter((line) => line.trim());
			if (lines.some((line) => !comment(line))) {
				code = lines.filter((line) => !comment(line)).join('\n');
				definitions = [...definitions.filter((definition) => !setup.includes(definition)), ...lines.filter(comment)];
			}
		}
		return { code: normalize(code), source: code, definitions, functions };
	}

	/**
	 * Templates of a block.
	 * @param {Blockly.Workspace} workspace
	 * @param {string} type
	 * @param {object} fixedFields - dropdown fields with a fixed option (one template per option)
	 * @param {boolean} withOption - with the optional field of the option mutator
	 * @returns {Array<object>}
	 */
	learnBlock(workspace, type, fixedFields = {}, withOption = false, textInputs = false) {
		const block = workspace.newBlock(type);
		if (withOption) block.addOptions_();
		const mutationDom = withOption ? block.mutationToDom() : null;
		const mutations = mutationDom ? Object.fromEntries([...mutationDom.attributes].map((attribute) => [attribute.name, attribute.value])) : null;
		const kind = block.outputConnection ? 'value' : 'statement';
		const inputs = [];
		const dropdowns = [];
		const freeFields = [];
		for (const input of block.inputList) {
			if (input.type === Blockly.inputs.inputTypes.VALUE && input.name && input.connection.getCheck()?.includes('Colour') && Blockly.Blocks['colour_picker']) {
				// colour input: colour block with the marker colour (the generator may compute the code of the colour)
				const colour = workspace.newBlock('colour_picker');
				colour.setFieldValue(COLOUR_MARKER.hex, 'COLOUR');
				input.connection.connect(colour.outputConnection);
				if (!input.connection.isConnected()) return [];
				freeFields.push({ name: input.name, kind: 'colourInput', marker: null });
			} else if (textInputs && input.type === Blockly.inputs.inputTypes.VALUE && input.name && (!input.connection.getCheck() || input.connection.getCheck().includes('String'))) {
				// text block in the input: some generators write a text differently (ex: "lcd.writeTxt('Hello')" but
				// "lcd.writeTxt(str(x))")
				const marker = INPUT_MARKER + inputs.length + "_";
				const text = workspace.newBlock('text');
				text.setFieldValue(marker, 'TEXT');
				input.connection.connect(text.outputConnection);
				if (!input.connection.isConnected()) return [];
				inputs.push({ name: input.name, marker, text: true });
			} else if (input.type === Blockly.inputs.inputTypes.VALUE && input.name) {
				const marker = INPUT_MARKER + inputs.length + "_";
				const variable = workspace.getVariableMap().getVariable(marker) || workspace.getVariableMap().createVariable(marker);
				const getter = workspace.newBlock('variables_get');
				getter.setFieldValue(variable.getId(), 'VAR');
				input.connection.connect(getter.outputConnection);
				if (!input.connection.isConnected()) return [];
				inputs.push({ name: input.name, marker });
			} else if (input.type === Blockly.inputs.inputTypes.STATEMENT && input.name) {
				// "vittaReverseStatementN = 0" in the statement input
				const marker = STATEMENT_MARKER + inputs.length;
				const variable = workspace.getVariableMap().getVariable(marker) || workspace.getVariableMap().createVariable(marker);
				const setter = workspace.newBlock('variables_set');
				setter.setFieldValue(variable.getId(), 'VAR');
				const value = workspace.newBlock('math_number');
				setter.getInput('VALUE').connection.connect(value.outputConnection);
				input.connection.connect(setter.previousConnection);
				if (!input.connection.isConnected()) return [];
				// marker as generated by the language (ex: "vittaReverseStatement0 = 0" or "vittaReverseStatement0 = 0;")
				inputs.push({ name: input.name, marker: normalize(this.rawCode(setter)), statement: true });
			}
			for (const field of input.fieldRow) {
				if (!field.name || !field.EDITABLE) continue;
				if (field instanceof Blockly.FieldVariable) {
					// variable fields are serialized by their name containing "VAR" (Python2Blocks.createBlocklyBlockXml)
					if (!/VAR/.test(field.name)) return [];
					const marker = VARIABLE_MARKER + freeFields.length + "_";
					const variable = workspace.getVariableMap().getVariable(marker) || workspace.getVariableMap().createVariable(marker);
					field.setValue(variable.getId());
					freeFields.push({ name: field.name, kind: 'variable', marker });
				} else if (fixedFields[field.name] !== undefined) {
					field.setValue(fixedFields[field.name]);
				} else if (field instanceof Blockly.FieldDropdown) {
					const options = field.getOptions(false).map((option) => option[1]).filter((value) => typeof value === 'string');
					dropdowns.push({ name: field.name, options, default: field.getValue() });
				} else if (field instanceof Blockly.FieldCheckbox) {
					dropdowns.push({ name: field.name, options: ['TRUE', 'FALSE'], default: field.getValue() });
				} else if (Blockly.FieldColour && field instanceof Blockly.FieldColour) {
					field.setValue(COLOUR_MARKER.hex);
					if (field.getValue() === COLOUR_MARKER.hex) freeFields.push({ name: field.name, kind: 'colour', marker: COLOUR_MARKER.rgb });
				} else if (field instanceof Blockly.FieldNumber) {
					field.setValue(NUMBER_MARKER);
					if (Number(field.getValue()) === NUMBER_MARKER) freeFields.push({ name: field.name, kind: 'number', marker: String(NUMBER_MARKER) });
				} else if (field instanceof Blockly.FieldTextInput) {
					const marker = TEXT_MARKER + freeFields.length + "_";
					field.setValue(marker);
					if (field.getValue() === marker) freeFields.push({ name: field.name, kind: 'text', marker });
				}
			}
		}

		const base = this.render(block);
		// text inputs: the quoted text is the code of the input
		for (const input of inputs.filter((candidate) => candidate.text)) {
			const quoted = [`'${input.marker}'`, `"${input.marker}"`].find((candidate) => base.code.includes(candidate));
			if (!quoted) return [];
			input.marker = quoted;
		}
		// colour inputs: hexadecimal ("#0a141e") or components ("(10, 20, 30)") in the code
		for (const free of freeFields.filter((field) => field.kind === 'colourInput')) {
			if (base.code.toLowerCase().includes(COLOUR_MARKER.hex.slice(1))) {
				free.marker = COLOUR_MARKER.hex.slice(1);
				free.hex = true;
			} else if (base.code.includes(COLOUR_MARKER.rgb)) {
				free.marker = COLOUR_MARKER.rgb;
			} else {
				return [];
			}
		}
		base.code = base.code.replace(/^global[^\n]*vittaReverse[^\n]*\n/gm, GLOBAL_MARKER);
		// code without letters nor specific number out of the inputs and free fields (ex: variable name only, "{x: y}"):
		// would recognize any code. A formula is specific (ex: "x*(3.6/1023)")
		const literal = [...inputs, ...freeFields].reduce((code, marker) => code.split(marker.marker).join(''), base.code);
		if (!base.code || !(/[a-zA-Z]/.test(literal) || (/\d/.test(literal) && literal.length >= SPECIFIC_HEAD))) return [];

		// A dropdown changing the code around an input or in several places: one template per option.
		const split = (dropdown) => {
			if (!dropdown || Object.keys(fixedFields).length >= 2) return [];
			const templates = dropdown.options.flatMap((option) => this.learnBlock(workspace, type, { ...fixedFields, [dropdown.name]: option }, withOption, textInputs));
			return templates.length <= MAX_TEMPLATES ? templates : [];
		};

		// Spans of the base code that depend on the fields and inputs.
		const spans = [];
		// dropdowns changing the initializations only (ex: DIO pin of a CLK/DIO display): option found in the program
		const definitionDropdowns = [];
		const optionLines = new Set();
		let renderings = 1;
		// dropdowns with the same options (ex: colour of each LED of a matrix): code of each option known from the first one
		const optionCodes = new Map();
		for (const dropdown of dropdowns) {
			const known = optionCodes.get(dropdown.options.join('|'));
			const knownSpan = known && this.knownDropdownSpan(block, dropdown, known, base.code);
			if (knownSpan) {
				renderings += 2;
				if (renderings > MAX_RENDERINGS) return [];
				spans.push(knownSpan);
				continue;
			}
			renderings += dropdown.options.length;
			if (renderings > MAX_RENDERINGS) return [];
			const renders = dropdown.options.map((option) => {
				block.setFieldValue(option, dropdown.name);
				return this.render(block);
			});
			block.setFieldValue(dropdown.default, dropdown.name);
			const lines = renders.map((render) => definitionLines(render.definitions));
			for (const options of lines) {
				for (const line of options) optionLines.add(line);
			}
			const codes = renders.map((render) => render.code);
			if (codes.every((code) => code === codes[0])) {
				if (lines.some((options) => options.join('\n') !== lines[0].join('\n'))) definitionDropdowns.push(dropdown);
				continue;
			}
			let prefix = 0;
			while (codes.every((code) => prefix < code.length && code[prefix] === codes[0][prefix])) prefix++;
			let suffix = 0;
			while (codes.every((code) => suffix < code.length - prefix && code[code.length - 1 - suffix] === codes[0][codes[0].length - 1 - suffix])) suffix++;
			const variants = new Map();
			dropdown.options.forEach((option, i) => {
				const variant = codes[i].slice(prefix, codes[i].length - suffix);
				if (!variants.has(variant)) variants.set(variant, option);
			});
			optionCodes.set(dropdown.options.join('|'), new Map(dropdown.options.map((option, i) => [option, codes[i].slice(prefix, codes[i].length - suffix)])));
			const defaultVariant = [...variants].find(([, option]) => option === dropdown.default)?.[0];
			if ([...variants.keys()].some((variant) => inputs.some((input) => variant.includes(input.marker)) || freeFields.some((free) => variant.includes(free.marker)))
				|| defaultVariant === undefined || base.code.slice(prefix, base.code.length - suffix) !== defaultVariant) {
				return split(dropdown);
			}
			spans.push({ start: prefix, end: base.code.length - suffix, field: dropdown.name, variants });
		}
		for (const free of freeFields) {
			let start = base.code.indexOf(free.marker);
			while (start !== -1) {
				spans.push({ start, end: start + free.marker.length, free });
				start = base.code.indexOf(free.marker, start + 1);
			}
		}
		for (const input of inputs) {
			let start = base.code.indexOf(input.marker);
			while (start !== -1) {
				spans.push({ start, end: start + input.marker.length, input });
				start = base.code.indexOf(input.marker, start + 1);
			}
		}
		spans.sort((a, b) => a.start - b.start);
		for (let i = 1; i < spans.length; i++) {
			if (spans[i].start < spans[i - 1].end) {
				const dropdown = dropdowns.find((candidate) => candidate.name === (spans[i].field || spans[i - 1].field));
				return split(dropdown);
			}
		}

		// Regular expression of the code.
		let pattern = '^';
		let position = 0;
		const groups = [];
		const capturedInputs = new Set();
		const capturedFields = new Set();
		spans.forEach((span, i) => {
			pattern += escapeRegex(base.code.slice(position, span.start));
			position = span.end;
			const group = `g${i}`;
			if (span.field) {
				const variants = [...span.variants.keys()].sort((a, b) => b.length - a.length);
				pattern += `(?<${group}>${variants.map(escapeRegex).join('|')})`;
				groups.push({ group, field: span.field, variants: span.variants });
			} else if (span.free && capturedFields.has(span.free.name)) {
				pattern += `\\k<f_${span.free.name}>`;
			} else if (span.free) {
				const expressions = { number: '-?[0-9.]+', text: '.*?', colour: '[0-9]+,[0-9]+,[0-9]+', variable: '[A-Za-z_][A-Za-z0-9_]*', colourInput: span.free.hex ? '[0-9a-fA-F]{6}' : '[0-9]+,[0-9]+,[0-9]+' };
				capturedFields.add(span.free.name);
				pattern += `(?<f_${span.free.name}>${expressions[span.free.kind]})`;
				groups.push({ group: `f_${span.free.name}`, free: span.free });
			} else if (capturedInputs.has(span.input.name)) {
				pattern += `\\k<i_${span.input.name}>`;
			} else {
				capturedInputs.add(span.input.name);
				// statements: the body may be empty (C++ "{\n}")
				if (span.input.statement && pattern.endsWith('\n')) pattern = pattern.slice(0, -1) + '\\n?';
				pattern += span.input.statement ? `(?<i_${span.input.name}>.*?)` : `(?<i_${span.input.name}>.+?)`;
				groups.push({ group: `i_${span.input.name}`, input: span.input.name, statement: span.input.statement });
			}
		});
		pattern += escapeRegex(base.code.slice(position)) + '$';
		pattern = pattern.split(GLOBAL_MARKER).join('(?:global[^\\n]*\\n)?');

		const template = {
			type,
			kind,
			regex: new RegExp(pattern, 's'),
			// literal start of the code, to quickly skip the templates that can not match
			head: base.code.slice(0, spans.length ? spans[0].start : base.code.length).slice(0, 16),
			groups,
			fixedFields,
			mutations,
			lines: 1,
			definitions: [...definitionLines(base.definitions), ...base.functions.map(normalize)],
			definitionDropdowns,
			// length of the code out of the inputs and free fields (options of the dropdowns are fixed code): the most
			// specific template is chosen (ex: "int(x/100.0*1023)" before "int(x*1023)")
			literal: base.code.length - spans.filter((span) => !span.field).reduce((length, span) => length + span.end - span.start, 0),
		};

		// The template must recognize the parsed code of the block.
		const statements = this.language.statements((code) => this.toJson(this.parser.parse(code).rootNode), this.render(block).source)
			.filter((child) => child.type !== 'comment');
		template.lines = kind === 'value' ? 1 : statements.length;
		if (!template.lines || !this.matchNodes(template, kind === 'value' ? [statements[0].children[0]] : statements)) return [];

		for (const definition of base.definitions) {
			this.definitions.add(normalize(definition));
		}
		for (const line of template.definitions) this.definitions.add(line);
		for (const line of optionLines) this.definitions.add(line);
		return [template];
	}

	/**
	 * Span of a dropdown whose options have the code of another dropdown (option => code): located with two options.
	 * @returns {object|null}
	 */
	knownDropdownSpan(block, dropdown, codeOf, baseCode) {
		const other = dropdown.options.find((option) => codeOf.get(option) !== codeOf.get(dropdown.default));
		const defaultCode = codeOf.get(dropdown.default);
		if (other === undefined || defaultCode === undefined) return null;
		block.setFieldValue(other, dropdown.name);
		const otherCode = this.render(block).code;
		block.setFieldValue(dropdown.default, dropdown.name);
		// first difference with the default code, then the default option code around it
		let first = 0;
		while (first < baseCode.length && baseCode[first] === otherCode[first]) first++;
		for (let start = Math.max(0, first - defaultCode.length); start <= first; start++) {
			const end = start + defaultCode.length;
			if (baseCode.slice(start, end) === defaultCode && otherCode.slice(start, start + codeOf.get(other).length) === codeOf.get(other)
				&& baseCode.slice(end) === otherCode.slice(start + codeOf.get(other).length)) {
				const variants = new Map();
				for (const option of dropdown.options) {
					if (!variants.has(codeOf.get(option))) variants.set(codeOf.get(option), option);
				}
				return { start, end, field: dropdown.name, variants };
			}
		}
		return null;
	}

	/**
	 * Block of the template recognized in the nodes, or null.
	 */
	matchNodes(template, nodes) {
		// synthetic nodes of the translation have no text
		if (!nodes.length || nodes.some((node) => typeof node?.text !== 'string')) return null;
		const text = nodes.map((node) => normalize(node.text)).join('\n');
		if (!text.startsWith(template.head)) return null;
		const match = template.regex.exec(text);
		if (!match) return null;
		const block = { type: template.type, fields: { ...template.fixedFields }, values: {}, mutations: template.mutations, statementsNode: {}, statements: null };
		for (const group of template.groups) {
			const value = match.groups[group.group];
			if (group.field) {
				block.fields[group.field] = group.variants.get(value);
			} else if (group.free) {
				if (group.free.kind === 'variable') {
					// variable resolved by Python2Blocks (id of the variable of the workspace)
					block.fields[group.free.name] = { variable: value };
				} else if (group.free.kind === 'colourInput') {
					const hex = group.free.hex ? value.toLowerCase() : value.split(',').map((component) => Number(component).toString(16).padStart(2, '0')).join('');
					block.values[group.free.name] = null;
					block.statementsNode[group.free.name] = { type: 'learned_block', block: { type: 'colour_picker', fields: { COLOUR: '#' + hex }, values: {}, mutations: null, statementsNode: null, statement: null } };
				} else if (group.free.kind === 'colour') {
					block.fields[group.free.name] = '#' + value.split(',').map((component) => Number(component).toString(16).padStart(2, '0')).join('');
				} else {
					block.fields[group.free.name] = value;
				}
			} else if (group.statement) {
				// body of the statement input (empty, or "pass" in Python)
				block.statements = block.statements || {};
				if (value === '' || value === 'pass') continue;
				const bodyNode = this.findBody(nodes, value);
				if (!bodyNode) return null;
				block.statements[group.input] = bodyNode;
			} else {
				const inputNode = this.findNode(nodes, value);
				if (!inputNode) return null;
				block.values[group.input] = null;
				block.statementsNode[group.input] = inputNode;
			}
		}
		return block;
	}

	/**
	 * Statements of a body (Python "block", C++ "compound_statement"), or its last statements (ex: body of
	 * "if uart.any(): data = uart.read() ..." after the read of the data).
	 */
	findBody(nodes, text) {
		for (const node of nodes) {
			if (['block', 'compound_statement'].includes(node.type) && node.children) {
				const statements = node.children.filter((child) => !['{', '}'].includes(child.type));
				for (let i = 0; i < statements.length; i++) {
					const children = statements.slice(i);
					if (children.map((child) => normalize(child.text)).join('\n') === text) {
						return i === 0 ? node : { ...node, text: children.map((child) => child.text).join('\n'), children, start: children[0].start };
					}
				}
			}
			const found = this.findBody(node.children || [], text);
			if (found) return found;
		}
		return null;
	}

	findNode(nodes, text, type = null) {
		for (const node of nodes) {
			if ((!type || node.type === type) && normalize(node.text) === text) return node;
			const found = this.findNode(node.children || [], text, type);
			if (found) return found;
		}
		return null;
	}

	/**
	 * True if the text of the node is recognized by a template (the translation may modify the nodes: the learned
	 * translation is then done on a copy).
	 */
	recognizes(node, kind) {
		if (typeof node?.text !== 'string') return false;
		const text = normalize(node.text);
		return this.templates.some((template) => template.kind === kind && template.lines === 1 && text.startsWith(template.head) && template.regex.test(text));
	}

	isDefinition(node) {
		if (typeof node.text !== 'string') return false;
		const text = normalize(node.text);
		// initializations rendered by the blocks recognized in the program
		return this.activeDefinitions.has(text);
	}

	/**
	 * Block of a single statement or expression recognized by a template.
	 * @param {object} node
	 * @param {string} kind - 'statement' or 'value'
	 * @param {boolean} literalOnly - only the templates without field nor input
	 * @param {boolean} inProgramOnly - only the templates whose initializations are in the program
	 * @param {boolean} specificOnly - only the templates starting with a specific code
	 */
	match(node, kind, literalOnly = false, inProgramOnly = false, specificOnly = false) {
		// templates of the blocks with a hand written translation: fallback of a generic translation only
		const templates = this.templates.filter((template) => template.kind === kind && template.lines === 1 && !(literalOnly && template.groups.length)
			&& !(template.translated && (literalOnly || inProgramOnly || specificOnly))
			&& !(specificOnly && template.head.length < SPECIFIC_HEAD && template.literal < SPECIFIC_HEAD));
		return this.bestMatch(templates, [node], inProgramOnly ? 1 : 0);
	}

	/**
	 * Block of the template recognizing the nodes whose initializations are the most present in the program.
	 * @param {number} minScore - minimum number of initializations of the block in the program
	 */
	bestMatch(templates, nodes, minScore = 0) {
		let best = null;
		let bestDefinitions = null;
		let bestScore = minScore - 1;
		let bestLiteral = -1;
		for (const template of templates) {
			if (nodes.length !== template.lines) continue;
			const block = this.matchNodes(template, nodes);
			if (!block) continue;
			// initializations of the learned block only (not generated by the blocks with a hand written translation)
			const definitions = this.blockDefinitions(template, block);
			const score = definitions.filter((line) => this.definitions.has(line) && this.inProgram(line)).length;
			if (score >= minScore && (score > bestScore || (score === bestScore && template.literal > bestLiteral))) {
				best = block;
				bestDefinitions = definitions;
				bestScore = score;
				bestLiteral = template.literal;
			}
		}
		if (bestDefinitions) {
			for (const line of bestDefinitions) this.recognizedDefinitions.add(line);
			for (const [name, value] of Object.entries(best.fields)) {
				if (value?.variable && this.variableId) best.fields[name] = { name, id: this.variableId(value.variable), value: value.variable };
			}
		}
		return best;
	}

	/**
	 * Initializations generated by the recognized block. The dropdowns changing the initializations only take the
	 * option whose initializations are in the program.
	 */
	blockDefinitions(template, block) {
		const score = (fields) => this.renderDefinitions(template, fields).filter((line) => this.inProgram(line)).length;
		const combinations = (dropdowns) => dropdowns.reduce((count, dropdown) => count * dropdown.options.length, 1);
		// best options of the dropdowns, tried together
		const improve = (dropdowns) => {
			let best = { ...block.fields };
			let bestScore = score(best);
			const tryOptions = (fields, index) => {
				if (index === dropdowns.length) {
					const fieldsScore = score(fields);
					if (fieldsScore > bestScore) {
						best = fields;
						bestScore = fieldsScore;
					}
					return;
				}
				for (const option of dropdowns[index].options) tryOptions({ ...fields, [dropdowns[index].name]: option }, index + 1);
			};
			tryOptions(block.fields, 0);
			Object.assign(block.fields, best);
		};
		const dropdowns = template.definitionDropdowns;
		if (combinations(dropdowns) <= MAX_COMBINATIONS) {
			improve(dropdowns);
		} else {
			// one dropdown after the other, then the pairs (ex: TX/RX pins on the same line)
			for (const dropdown of dropdowns) improve([dropdown]);
			for (let i = 0; i < dropdowns.length; i++) {
				for (let j = i + 1; j < dropdowns.length; j++) {
					if (combinations([dropdowns[i], dropdowns[j]]) <= MAX_COMBINATIONS) improve([dropdowns[i], dropdowns[j]]);
				}
			}
		}
		return this.renderDefinitions(template, block.fields);
	}

	/**
	 * Block recognized by a hand written translation: its initializations are ignored by the next pass of the
	 * translation (generated again by the block).
	 * @param {string} type
	 * @param {object} fields
	 */
	recognize(type, fields = {}) {
		const template = this.templates.find((candidate) => candidate.type === type);
		if (!template) return;
		for (const line of this.renderDefinitions(template, fields)) this.recognizedDefinitions.add(line);
	}

	/**
	 * Initializations (lines and whole definitions) generated by the block of the template with the given fields.
	 */
	renderDefinitions(template, fields) {
		const key = template.type + JSON.stringify(template.mutations) + JSON.stringify(fields);
		if (!this.renderedDefinitions.has(key)) {
			this.workspace = this.workspace || new Blockly.Workspace();
			let lines = [];
			try {
				const block = this.workspace.newBlock(template.type);
				if (template.mutations) block.addOptions_();
				// statement in the statement inputs: some generators generate nothing for an empty body (ex: interrupt)
				const marker = this.workspace.getVariableMap().getVariable(STATEMENT_MARKER) || this.workspace.getVariableMap().createVariable(STATEMENT_MARKER);
				for (const input of block.inputList) {
					if (input.type !== Blockly.inputs.inputTypes.STATEMENT || !input.connection) continue;
					const setter = this.workspace.newBlock('variables_set');
					setter.setFieldValue(marker.getId(), 'VAR');
					input.connection.connect(setter.previousConnection);
				}
				for (const [name, value] of Object.entries(fields)) {
					try {
						if (value?.variable) {
							const variable = this.workspace.getVariableMap().getVariable(value.variable) || this.workspace.getVariableMap().createVariable(value.variable);
							block.setFieldValue(variable.getId(), name);
							continue;
						}
						block.setFieldValue(value, name);
					} catch (error) {
						// value of another option of the field
					}
				}
				const { code, definitions, functions } = this.render(block);
				// the code of the block itself is not an initialization (ex: function of a callback block with an empty body),
				// an initialization looking like the block with other fields is one (ex: "cv2_frame_size = (640, 480)")
				const own = new Set(code.split('\n').map(normalize));
				lines = [...[...definitionLines(definitions), ...definitions.map(normalize)].filter((line) => !own.has(line)),
					...functions.map(normalize).filter((line) => !template.regex.test(line))];
			} catch (error) {
				// generator not usable outside of a program
			}
			this.workspace.clear();
			this.renderedDefinitions.set(key, lines);
		}
		return this.renderedDefinitions.get(key);
	}

	/**
	 * Replace the consecutive statements generated by a block by a node holding the block.
	 * @param {Array<object>} nodes
	 * @returns {Array<object>}
	 */
	mergeStatements(nodes) {
		const multiLine = this.templates.filter((template) => template.kind === 'statement' && template.lines > 1 && !template.translated);
		if (!multiLine.length) return nodes;
		const isComment = (node) => node?.type === 'comment';
		const merged = [];
		for (let i = 0; i < nodes.length; i++) {
			let block = null;
			let statements = [];
			let next = i + 1;
			if (!isComment(nodes[i])) {
				for (const lines of [...new Set(multiLine.map((template) => template.lines))].sort((a, b) => b - a)) {
					// statements of the block, with the comments between them (ex: "# Chainable LED CIN on D2")
					statements = [];
					next = i;
					while (statements.length < lines && next < nodes.length) {
						if (!isComment(nodes[next])) statements.push(nodes[next]);
						next++;
					}
					if (statements.length < lines) continue;
					// before the hand written translations: only the blocks whose initializations are in the program (if any)
					const candidates = multiLine.filter((template) => template.lines === lines);
					block = this.bestMatch(candidates.filter((template) => template.definitions.some((line) => this.definitions.has(line))), statements, 1)
						|| this.bestMatch(candidates.filter((template) => !template.definitions.some((line) => this.definitions.has(line))), statements);
					if (block) break;
				}
			}
			if (block) {
				merged.push({ type: 'learned_block', block, text: statements.map((node) => node.text).join('\n'), children: statements, start: statements[0].start, end: statements[statements.length - 1].end });
				i = next - 1;
			} else {
				merged.push(nodes[i]);
			}
		}
		return merged;
	}
}
